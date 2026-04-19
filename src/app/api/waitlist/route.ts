import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

// Runs on the Node.js runtime (needs fs). Vercel ok.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Entry = {
  name: string;
  email: string;
  createdAt: string;
  source: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Rate limit: in-memory sliding window, 5 requests / 60s per IP.
// Fine for a waitlist on a single serverless instance. Swap for an external
// store (Upstash Redis, Vercel KV) if you deploy to multi-region.
// ---------------------------------------------------------------------------
const WINDOW_MS = 60_000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  // Opportunistic cleanup so the map does not grow forever.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return arr.length > MAX_HITS;
}

function clientIp(req: NextRequest): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// ---------------------------------------------------------------------------
// Optional local file fallback. Useful for `npm run dev`, ignored in prod
// serverless where /tmp is ephemeral.
// ---------------------------------------------------------------------------
async function storeFilePath(): Promise<string> {
  const candidates = [
    process.env.WAITLIST_FILE,
    "/tmp/octupie-waitlist.json",
    path.join(process.cwd(), ".data", "waitlist.json"),
  ].filter(Boolean) as string[];
  for (const p of candidates) {
    try {
      await fs.mkdir(path.dirname(p), { recursive: true });
      await fs.access(path.dirname(p));
      return p;
    } catch {
      // try next
    }
  }
  return candidates[candidates.length - 1];
}

async function readAll(file: string): Promise<Entry[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Entry[]) : [];
  } catch {
    return [];
  }
}

async function appendEntry(entry: Entry): Promise<void> {
  try {
    const file = await storeFilePath();
    const all = await readAll(file);
    all.push(entry);
    await fs.writeFile(file, JSON.stringify(all, null, 2), "utf8");
  } catch {
    // ignore file-write errors; webhook is the source of truth in prod
  }
}

// ---------------------------------------------------------------------------
// Webhook forward. Sends a shaped payload to whatever URL is configured:
//   - Google Apps Script (Sheets)
//   - Zapier / Make / n8n
//   - Custom endpoint
// Includes a shared secret so random internet traffic cannot write to the
// sheet even if the webhook URL leaks.
// ---------------------------------------------------------------------------
async function forwardWebhook(entry: Entry): Promise<void> {
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhook) return;
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...entry,
        secret: process.env.WAITLIST_WEBHOOK_SECRET ?? "",
      }),
      // Cap so a slow Apps Script cannot hold the request open.
      signal: AbortSignal.timeout(5_000),
    });
  } catch {
    // Non-fatal. Local file still has the record.
  }
}

// ---------------------------------------------------------------------------
// POST /api/waitlist
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Please try again in a minute." },
        { status: 429 },
      );
    }

    const body = (await req.json().catch(() => ({}))) as {
      name?: string;
      email?: string;
      source?: string;
    };

    const name = (body.name ?? "").toString().trim().slice(0, 100);
    const email = (body.email ?? "").toString().trim().toLowerCase().slice(0, 200);
    const source = (body.source ?? "octupie.com").toString().trim().slice(0, 50);

    if (!name) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 },
      );
    }
    if (!emailRe.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email." },
        { status: 400 },
      );
    }

    const entry: Entry = {
      name,
      email,
      createdAt: new Date().toISOString(),
      source,
    };

    // Fire both in parallel. Webhook is the prod source of truth.
    await Promise.all([appendEntry(entry), forwardWebhook(entry)]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------------------------
// GET /api/waitlist - protected count only. Never returns emails.
// Requires header `x-admin-token` matching WAITLIST_ADMIN_TOKEN env var.
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  const token = process.env.WAITLIST_ADMIN_TOKEN;
  if (!token) {
    return NextResponse.json({ ok: false, error: "Not enabled." }, { status: 404 });
  }
  const provided = req.headers.get("x-admin-token");
  if (provided !== token) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const file = await storeFilePath();
  const all = await readAll(file);
  return NextResponse.json({ ok: true, count: all.length });
}
