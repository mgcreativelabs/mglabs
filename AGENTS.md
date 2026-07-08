<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MG Creative Labs — Agent Context

This file is for any AI coding agent (Claude, Cursor, Copilot, etc.) working
in this repo. Read it before making changes. If something here turns out to
be wrong, fix it in the same commit that proves it wrong — this file rots
fast if nobody updates it, and a stale AGENTS.md is worse than none.

## What this project actually is (as of 2026-07)

MG Creative Labs is an **AI Builder Platform**, not a course marketplace.
The site pivoted away from an earlier "multi-academy" structure (AI
Learning Hub / Coding Academy / Design Academy as separate paid tracks).
The current flagship offer is the **Launch Program** — a $500 done-with-you
AI product build — visible on the homepage (`src/app/page.tsx`) as the
"Flagship Offer." If you find docs, copy, or code that still describe
$9/mo Pro subscriptions, course certificates, or "academies" as the core
product, that's leftover language from before the pivot — flag it, don't
assume it's current.

**Two workflows live in this repo:**
1. The main marketing/product site (`src/app/*` outside `mg-ai/`) —
   landing pages, blog, prompt library, dashboard, auth.
2. **MG Labs AI** (`src/app/mg-ai/`) — a free, no-signup-required AI chat
   product. This is the actively developed surface as of this writing.

## Stack (verified from package.json — check it before trusting this list)

- Next.js 16.2.9, App Router, Turbopack
- React 19.2.4
- TypeScript, strict mode
- Tailwind CSS v4
- Supabase (`@supabase/ssr` 0.12, `@supabase/supabase-js` 2.108) — auth +
  Postgres, RLS-first (see `supabase/schema.sql` and
  `supabase/migrations/`)
- Zod 4 — schema validation where used
- Framer Motion 12 — page/section animations
- `zustand` is listed in package.json but **not currently used anywhere in
  src/** — don't assume there's a global store; component state and
  Supabase queries are how state is actually managed today. If you add
  real zustand usage, update this line.
- `react-syntax-highlighter` (PrismAsyncLight) — code block highlighting
  in MG Labs AI only

## Deployment workflow — no local dev environment

The owner works entirely through the **GitHub web editor**, with **Vercel
auto-deploying on every push to `main`**. There is no local machine running
`npm run dev` day to day. Practical implications:
- Changes need to be correct on push — there's no fast local iterate loop
  for the owner to catch mistakes before they hit production.
- Prefer smaller, verifiable diffs over large speculative rewrites.
- If you (the agent) have a sandboxed environment, use it to actually run
  `npm run build`, `tsc --noEmit`, and `eslint` before calling something
  done — don't rely on read-through review alone. This repo's build has
  caught real issues (unused-var lint-as-error, hydration mismatches,
  hook ordering) that would otherwise have shipped straight to prod.

## MG Labs AI (`src/app/mg-ai/`) — architecture

This is the most actively developed part of the codebase. Read
`src/lib/ai/types.ts` and `src/lib/ai/router.ts` first — they're short and
explain the whole provider abstraction.

- **Provider adapters** (`src/lib/ai/providers/{groq,gemini,mistral}.ts`)
  each implement `ChatAdapter`: a `chat()` method (full response) and an
  optional `chatStream()` (SSE token-by-token). The router
  (`src/lib/ai/router.ts`) looks up which adapter owns a given model id via
  `src/lib/data/ai-models.ts` — that file is the single source of truth
  for which models exist, which provider serves them, and their
  `supportsVision` / `supportsWebSearch` capability flags.
- **To add a new provider**: write an adapter implementing `ChatAdapter`,
  register it in `router.ts`'s `ADAPTERS` map, add its models to
  `ai-models.ts`. Nothing else needs to change — the API route and UI
  only ever deal in model ids.
- **Streaming**: `/api/chat/route.ts` always responds as SSE
  (`text/event-stream`), even for adapters whose `chatStream` just wraps
  a single non-streamed call under the hood (see the Groq adapter's
  special-case for `groq/compound`, whose web-search citations only come
  back on the non-streaming response shape).
- **Multimodal**: `ChatMessage.content` is `string | ChatContentPart[]`.
  Only build the array form when a message actually has image
  attachments — every text-only call site still just passes a string.
- **Persistence**: `chat_conversations` / `chat_messages` tables
  (migrations `003`, `004`) support both anonymous visitors (a
  client-generated `session_id` in localStorage — see
  `src/lib/hooks/useChatSession.ts`) and signed-in users, without
  requiring login, matching the page's "free, no account" promise. See
  `src/lib/hooks/useChatHistory.ts` for all reads/writes — the UI never
  talks to Supabase directly.
- **Known scope boundary**: PDF/DOCX/XLSX/PPTX text extraction is not
  implemented. Plain text/code files are read directly; images go to
  vision-capable models. Adding real document parsing needs a library
  (pdfjs, mammoth) with bundler/worker setup — don't half-implement it.

## Things that have been wrong before — check before assuming fixed

These were found and fixed in past sessions. They're listed here so a
future agent (or a regression) can check quickly rather than rediscover
them from scratch — not because they're still broken:
- OG/canonical URLs were hardcoded to a stale Vercel preview domain
  site-wide — now read `NEXT_PUBLIC_SITE_URL` with a live fallback (see
  `src/app/layout.tsx`).
- Blog posts inherited the generic site `<title>` instead of
  article-specific OG titles.
- Prompt Library claimed "1,200+ prompts" while rendering only 6 with no
  pagination.
- A duplicate category filter was rendering twice.
- Lesson 5 had a broken anchor link.

If you're touching any of these areas, verify the current behavior rather
than trusting this list — it reflects the last time someone checked, not
a live status board.

## Docs in this repo — trust level

- `README.md` and `STRATEGY.md` predate the AI Builder Platform pivot and
  contain stale product/pricing language (course tiers, "academies",
  $9/mo subscriptions) that doesn't match the live site. Don't treat them
  as current business truth — verify against `src/app/page.tsx` and
  `src/app/pricing/page.tsx` instead. Regenerating them is a content
  decision for the owner, not something to do silently as a side effect
  of an unrelated task.
- `DEPLOYMENT.md` — not verified in this pass; check before relying on it.
- This file (`AGENTS.md`) and `CLAUDE.md` (which just points here) are
  meant to stay accurate. If you change the architecture, update this
  file in the same change.
