# octupie-landing

Marketing / waitlist site for Octupie. Built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui.

## Requirements

- Node.js `>=24` (see `.nvmrc`)
- npm `>=10`

## Local development

```bash
npm install
npm run dev
```

App runs at http://localhost:3000 (falls back to 3001 if 3000 is taken).

## Scripts

| Command            | Purpose                           |
| ------------------ | --------------------------------- |
| `npm run dev`      | Dev server (Turbopack)            |
| `npm run build`    | Production build                  |
| `npm run start`    | Serve the production build        |
| `npm run lint`     | ESLint                            |
| `npm run typecheck`| `tsc --noEmit`                    |
| `npm run check`    | lint + typecheck + build          |

## Environment variables

Copy `.env.example` → `.env.local` and fill in values as needed.

The waitlist API (`src/app/api/waitlist/route.ts`) forwards submissions to an HTTPS webhook.
See [`docs/WAITLIST_SETUP.md`](docs/WAITLIST_SETUP.md) for the Google Sheets setup.

## Project structure

```
src/
  app/              Next.js App Router (routes, layout, api)
  components/       React components + shadcn/ui primitives
  hooks/            Custom hooks
  lib/              Utilities
  types/            Shared TS types
public/             Static assets (images, videos, seo)
docs/               Project docs
```

## Deployment

Production is deployed to **Vercel**, fronted by **Cloudflare** for DNS + CDN.
See `DEPLOY.md` in the repo root for the full runbook.
