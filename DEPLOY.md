# Deployment runbook

Production path: **GitHub → Vercel (build + host) → Cloudflare (DNS + CDN + SSL)**.

---

## 1. Push to GitHub

```bash
git push origin main
```

Make sure the fork at https://github.com/MM24B032/octupielanding is up to date.

---

## 2. Vercel setup (one-time)

1. Go to https://vercel.com/new and sign in with GitHub.
2. **Import Git Repository** → select `MM24B032/octupielanding`.
3. Framework preset: **Next.js** (auto-detected). Leave Build & Output defaults:
   - Build command: `next build`
   - Output dir: `.next`
   - Install command: `npm install`
4. **Environment Variables** — add any you use (at minimum, for the waitlist):
   - `WAITLIST_WEBHOOK_URL` = your Google Apps Script webhook URL (see `docs/WAITLIST_SETUP.md`)
   - Scope: Production, Preview, Development
5. Click **Deploy**. First build should finish in ~1-2 min.
6. You get a `*.vercel.app` URL — verify the site loads and the waitlist form works.

### Ongoing deploys
- Every push to `main` → auto-deploys to production
- Every PR / other branch → auto-deploys to a unique preview URL

---

## 3. Add your custom domain in Vercel

1. In the Vercel project → **Settings → Domains**.
2. Add your domain (e.g. `octupie.com`) and also `www.octupie.com`.
3. Vercel will show one of two things:
   - **"Invalid Configuration"** with a list of DNS records it wants you to set — this is expected; we'll add them in Cloudflare next.
   - Instructions to either use Vercel's nameservers **or** add specific A/CNAME records.
4. **Do not change nameservers to Vercel's.** Keep Cloudflare as the DNS authority so you keep Cloudflare's CDN, WAF, and analytics. Use the A/CNAME record approach below.

---

## 4. Cloudflare setup

### 4a. Add the site to Cloudflare (if not already)

1. Cloudflare dashboard → **Add a site** → enter your domain.
2. Pick the **Free** plan — fine for this.
3. Cloudflare scans existing DNS and gives you **two nameservers**
   (e.g. `xxx.ns.cloudflare.com`, `yyy.ns.cloudflare.com`).
4. Go to the registrar where you bought the domain and change nameservers to those two. Propagation is usually minutes to a few hours.
5. Wait for Cloudflare to show the domain as **Active**.

### 4b. Point DNS at Vercel

In Cloudflare → your domain → **DNS → Records**, add:

| Type  | Name  | Content                 | Proxy status        | TTL  |
| ----- | ----- | ----------------------- | ------------------- | ---- |
| A     | `@`   | `76.76.21.21`           | **DNS only** (grey) | Auto |
| CNAME | `www` | `cname.vercel-dns.com.` | **DNS only** (grey) | Auto |

**Important:** Set proxy to **DNS only (grey cloud)**, not Proxied (orange), at least during initial setup. Two reasons:
- Vercel handles SSL termination itself and issues Let's Encrypt certs on its edge — orange-cloud proxying breaks the cert provisioning handshake.
- Orange-cloud + Vercel edge = double CDN, which can cause weird caching bugs.

You can flip to orange later if you want Cloudflare's WAF/bot protection in front, but then configure **Full (strict)** SSL and upload an origin cert — do that only after the site is stable.

### 4c. SSL/TLS settings

In Cloudflare → **SSL/TLS → Overview**:
- Mode: **Full (strict)** — Vercel has a valid cert, so this works.
- **Edge Certificates**: leave defaults; Cloudflare auto-issues a Universal SSL cert.

### 4d. Back in Vercel

Once DNS propagates (check with `dig octupie.com +short` — should return `76.76.21.21`):
1. Vercel → Settings → Domains — the red warnings should clear to green checkmarks.
2. Set your apex domain as the **Primary**, redirect `www` → apex (or vice versa, your call).

---

## 5. Verify

```bash
# DNS
dig octupie.com +short          # should be 76.76.21.21
dig www.octupie.com +short      # should resolve to a cname.vercel-dns.com chain

# HTTP
curl -I https://octupie.com     # HTTP/2 200, server: Vercel
```

Open the site in a browser, check:
- HTTPS lock icon
- Waitlist form submits and lands in your Google Sheet
- No console errors

---

## 6. Post-launch checklist (next phase)

- [ ] Submit sitemap to Google Search Console (verify ownership via DNS TXT in Cloudflare)
- [ ] Add `app/sitemap.ts` and `app/robots.ts`
- [ ] Verify OG tags + favicon show correctly (test with https://www.opengraph.xyz/)
- [ ] Lighthouse / PageSpeed audit
- [ ] Plan blog section (probably `app/blog/[slug]/page.tsx` with MDX)

---

## Rollback

Vercel keeps every deployment. To roll back:
1. Vercel → project → **Deployments**
2. Find the last known-good deployment
3. Click **⋯ → Promote to Production**

That's instant — no rebuild needed.
