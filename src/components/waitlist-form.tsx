"use client";

import { useState } from "react";

type Variant = "inline" | "dialog";

export function WaitlistForm({
  variant = "inline",
  ctaLabel = "Join the waitlist",
  onDone,
}: {
  variant?: Variant;
  ctaLabel?: string;
  onDone?: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("err");
        setMessage(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage("You're on the list. We'll be in touch soon.");
      setName("");
      setEmail("");
      setTimeout(() => onDone?.(), 1200);
    } catch {
      setStatus("err");
      setMessage("Network error. Try again.");
    }
  }

  if (status === "ok") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex w-full items-center justify-center gap-2 rounded-full border border-[#4C61FF]/30 bg-[#4C61FF]/10 px-5 py-3 text-sm font-medium text-[#9BB2FF]"
      >
        <svg
          viewBox="0 0 20 20"
          aria-hidden
          className="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 10.5l4 4 8-9" />
        </svg>
        <span>{message || "You're on the list. We'll be in touch soon."}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={[
        "flex w-full flex-col gap-3",
        variant === "inline" ? "sm:flex-row sm:items-center" : "",
      ].join(" ")}
    >
      <input
        type="text"
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={status === "loading"}
        className="w-full flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-[#4C61FF] focus:bg-white/10"
      />
      <input
        type="email"
        required
        placeholder="you@creator.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        className="w-full flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-[#4C61FF] focus:bg-white/10"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#014CE3] px-6 py-3 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_8px_24px_rgba(1,76,227,0.45)] transition hover:bg-[#4C61FF] disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : ctaLabel}
        <span aria-hidden>→</span>
      </button>
      {status === "err" && message && (
        <p className="text-xs text-red-300 sm:basis-full sm:text-center">
          {message}
        </p>
      )}
    </form>
  );
}

export function WaitlistDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#040E22] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white"
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="font-heading text-2xl tracking-tight text-white">
          Join the Octupie waitlist
        </h3>
        <p className="mt-2 text-sm text-white/65">
          Leave your name and email. You&apos;ll be first to know when we launch
          plus get early-access perks.
        </p>
        <div className="mt-6">
          <WaitlistForm variant="dialog" onDone={onClose} />
        </div>
      </div>
    </div>
  );
}
