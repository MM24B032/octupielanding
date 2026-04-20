# Project notes for Claude Code

Octupie marketing / waitlist landing page.

## Stack
- Next.js 16 App Router (Turbopack), React 19, TypeScript strict
- Tailwind CSS v4 with oklch tokens (`src/app/globals.css`)
- shadcn/ui primitives in `src/components/ui`
- Deployed on Vercel, DNS via Cloudflare

## Conventions
- Route handlers live under `src/app/api/*/route.ts`
- Utility imports use the `@/` alias (see `tsconfig.json` paths)
- Run `npm run check` before committing (lint + typecheck + build)

## Waitlist
`src/app/api/waitlist/route.ts` validates input and forwards to an HTTPS webhook.
Configure via `WAITLIST_WEBHOOK_URL` env var. Setup guide: `docs/WAITLIST_SETUP.md`.
