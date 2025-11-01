## Repo-specific guidance for AI coding assistants

Purpose: help an AI become productive quickly in this Next.js + TypeScript portfolio repo.

- Project type: Next.js 14 (App Router), TypeScript, Tailwind CSS. Main folders: `app/`, `components/`, `lib/`, `public/`, `styles/`.
- Start/Build: uses pnpm. Common commands (from `package.json`):
  - `pnpm dev` — run dev server (localhost:3000)
  - `pnpm build` — production build
  - `pnpm start` — start built app
  - `pnpm lint` — runs `next lint`

- Path alias: `@/*` is configured in `tsconfig.json`. Use `@/` when referring to project files.

- App architecture and important files to read first:
  - `app/` — Next.js App Router pages, layouts and server API routes.
    - `app/api/contact/route.ts` — Contact form endpoint; uses Resend API and contains logging + validation logic. Good example of author-intended behavior for form submissions.
    - `app/api/test-email/route.ts` — Test endpoint for verifying Resend configuration.
  - `components/` — all UI pieces. Pay attention to:
    - `components/target-cursor.tsx` (custom cursor behavior)
    - `components/magic-bento.tsx` (interactive grid + hover/magnetism)
    - `components/contact-form.tsx` (client form, react-hook-form + zod)
    - `components/ui/` — shadcn/ui-style component wrappers used across the app.
  - `lib/email-templates.ts` — email templates used by API routes.
  - `tailwind.config.ts`, `app/globals.css` and `styles/globals.css` — styling and theme conventions (dark mode uses `class`).

- Conventions & patterns (discoverable):
  - App Router is used (server and client components). Many animation components are client-only — look for `"use client"` at the top of files.
  - Animations: GSAP and Framer Motion are used; changes to animation logic usually live in component files under `components/`.
  - UI primitives live in `components/ui/` and are reused across pages; follow existing prop names when creating new UI.
  - Environment variable: `RESEND_API_KEY` — API routes guard against missing keys (they return 503). Always mock or set this when running email-related features.
  - Tests / QA: `testsprite_tests/` contains test plans and artifacts. Use them as behavioral specs when modifying interactive features.

- Integration and external dependencies:
  - Resend (email) — see `app/api/contact/route.ts` and `app/api/test-email/route.ts` for usage patterns.
  - Vercel is the intended deployment target (README). Keep serverless-friendly patterns (no long-running processes in API routes).

- Helpful examples to reference when making changes:
  - To add a new API route, follow `app/api/contact/route.ts` structure (validate input, guard missing ENV, return NextResponse JSON).
  - To add a visual component with animation, copy patterns from `components/magic-bento.tsx` or `components/target-cursor.tsx`. Use `use client` and keep heavy DOM manipulation confined to client components.
  - For styling, follow tokens in `tailwind.config.ts` (colors, radius, animations) and include classes in components rather than separate CSS where possible.

- Safety for automated edits:
  - Do not add real API keys. If a change touches email flows, update logic to gracefully handle missing `RESEND_API_KEY` (the repo already does this).
  - Avoid altering user-visible copy unless asked; small UI tweaks are acceptable when accompanied by preview notes.

- Quick checklist for PRs by an AI assistant:
  1. Run `pnpm install` and `pnpm dev` locally to smoke-test changes.
 2. Run `pnpm build` if touching server code or ts types.
 3. Ensure no references to real secrets or private endpoints are added.
 4. Update `testsprite_tests/` plans if you change interactive behavior (add/modify test steps).

If anything above is unclear or you want the file to emphasize a different area (e.g., more testing or accessibility notes), tell me which parts to expand or any missing rules to include.
