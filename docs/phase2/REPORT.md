# Phase 2 — Homepage and Services Redesign

Status: **Ready for review. No commit, push, merge, or deploy performed.**

## Scope delivered

- Redesigned homepage with cinematic local-image hero, business challenges, six core services, featured work, industry spotlights, partnership positioning, delivery approach, articles, and final consultation CTA.
- Redesigned `/services` overview with capability hero, six practice areas, all 19 grouped service links, delivery rail, and distinct closing CTA.
- Redesigned all `/services/:slug` detail pages with premium hero, overview, challenges, capabilities, benefits, process, technology approach, representative scope, FAQ, related services/articles, and closing CTA.
- Preserved existing solution titles, canonical URLs, metadata, JSON-LD, internal links, forms, APIs, MongoDB, admin auth, analytics consent, and indexing behaviour.
- No clients, statistics, outcomes, testimonials, certifications, or partnerships were invented. Illustrative scope is explicitly labelled as illustrative.

## Key implementation notes

- Added Phase 2 data and components under `src/data/phase2.ts`, `src/components/phase2/`, and `src/sections/phase2/`.
- Service-detail heroes use original `ServiceVisual` SVG artwork instead of remote Unsplash imagery; article thumbnails continue using existing image helpers.
- Self-hosted Inter latin faces in `public/fonts/` and added `@font-face` declarations plus above-the-fold preloads.
- Scoped the homepage hero image preload to the homepage; non-home prerendered documents have it stripped.
- Fixed `scripts/serve.ts` to serve route-specific `dist/<route>/index.html` for directory routes.
- Prerender capture uses `?prerender=1` to exclude consent/scroll overlays from static markup.
- Hydration targets (`/`, `/services`, `/services/*`) now use `hydrateRoot` with eager target pages and no conflicting Suspense boundaries. Non-target routes continue using `createRoot`.
- Added hydration-safe reveal behaviour and deterministic visual IDs; fixed target-page text-node splits and scroll-state capture.
- Raised low-opacity text contrast on Phase 2 light surfaces to meet WCAG AA.

## Validation

- `npx tsc -b` — passed.
- `npm run lint` — 0 errors; only pre-existing warnings.
- `npm run build` — passed; 115 routes + `404.html` prerendered.
- Tests: API 51/51, security 13/13, routing 13/13, SEO 6/6, analytics 6/6, pricing-removal 10/10.
- Visual baselines: 7/7 passing after deliberate refresh of the redesigned homepage and services surfaces.
- Phase 2 audit: no horizontal overflow, header collisions, broken above-fold images, console/page errors, or missing required content at 390/768/1024/1440 widths.
- Hydration console check: `/`, `/services`, `/services/ai-solutions`, `/contact`, `/insights` load with no console or page errors.
- `npm run test:browser` not run: requires `TEST_ADMIN_PASSWORD`.

## Lighthouse (final production build)

| Route | Viewport | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | Mobile | 100 | 100 | 100 | 100 | 0.9 s | 0 | 40 ms |
| `/` | Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0 | 0 ms |
| `/services` | Mobile | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |
| `/services` | Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0 | 0 ms |
| `/services/ai-solutions` | Mobile | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |
| `/services/ai-solutions` | Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0 | 0 ms |

Raw scores: `lighthouse-summary.json` in this directory.

## Evidence

- 14 desktop/mobile screenshots in `docs/phase2/`.
- Audit and capture scripts: `scripts/audit-phase2.ts`, `scripts/capture-phase2.ts`.
- Visual diffs: `tests/visual-baseline/` (refreshed only for redesigned surfaces).

## Pending before production approval

- Human visual review of the captured screenshots.
- Approved Phase 2 video and new service photography, if required for production.
- Browser test run once `TEST_ADMIN_PASSWORD` is available.
- Final approval before commit/push/deploy.
