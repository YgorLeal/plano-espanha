# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Plano Espanha is a multilingual (pt/es/en) Next.js 14 site targeting Brazilians planning to move to Spain. It includes a cost-of-living calculator, a visa simulator, and a markdown-based blog. Deployed as a static export on Cloudflare Workers.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build (static export)
- `npm run pages:build` — static export build
- `npm run pages:deploy` — build + deploy to Cloudflare Workers
- `npm run new-post "Title"` — scaffold a new blog post in `content/blog/`

GitHub Actions:
- `.github/workflows/deploy.yml` deploys on every push to `main`
- requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets

No test runner or linter is configured.

## Architecture

**Routing & i18n:** All pages live under `src/app/[lang]/`. The Worker in `src/worker.ts` detects the browser locale and redirects bare paths to `/{pt|es|en}/...`. Dictionary JSON files in `src/dictionaries/{pt,es,en}.json` provide UI strings; loaded via `src/lib/i18n.ts` `getDictionary()`. Default locale is `pt`.

**Blog:** Markdown files in `content/blog/` with gray-matter frontmatter. Parsed at build time by `src/lib/blog.ts` using remark/remark-html. Blog posts are language-agnostic (single markdown file per post, not per locale).

**Calculator:** `src/app/[lang]/calculadora/page.tsx` with client-side `src/components/Calculator.tsx`. Cost data lives in `src/lib/costData.ts` (7 Spanish cities × 3 profiles: solo/couple/family, values in EUR/month).

**Visa Simulator:** `src/app/[lang]/simulador/page.tsx` — interactive questionnaire that recommends a visa type.

**Styling:** Tailwind CSS with a custom `brand` color palette defined in `tailwind.config.js`.

**Deployment:** Cloudflare Workers via wrangler. Next.js `output: "export"` with `trailingSlash: true` and `images.unoptimized: true` for CF compatibility.
