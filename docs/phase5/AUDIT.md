# Phase 5 Pre-Implementation Audit

Date: 2026-11-17  
Branch: `redesign/hybrid-premium`  
Baseline: Phase 4 complete locally at `docs/phase4/REPORT.md`; no commit, push, merge, deploy or preview created.

This audit was completed before Phase 5 code edits. Status values are assigned before implementation.

## Tooling and asset evidence

- `ffmpeg`, `ffprobe`, `blender`, `convert` and `magick` are not installed on PATH.
- Python Pillow 11.3.0 is available.
- Playwright 1.63 is installed and its Chromium browser is already used by `scripts/generate-phase2-assets.mjs`.
- `public/videos/` contains four real video files:
  - `yesbe-hero-film.webm` / `.mp4`
  - `yesbe-systems-film.webm` / `.mp4`
- Those films are original, repo-generated procedural visual loops from `scripts/generate-phase2-assets.mjs`; they are not approved cinematic footage.
- `public/images/visuals/` contains seven glass-style service scenes plus poster variants at 640/960/full widths.
- Eight requested capability categories are not yet represented by eight distinct visual assets:
  - Artificial Intelligence
  - Custom Software Development
  - ERP & CRM
  - Business Automation
  - Cloud Infrastructure
  - Data Analytics
  - Digital Transformation
  - System Integration

## Prioritized genuine issues

### P0 — Homepage cinematic film asset is not approved

- Status: `BLOCKED — APPROVED MEDIA REQUIRED`
- `src/components/phase2/FilmPlayer.tsx` is a real HTML5 video component with poster fallback, muted loop, `playsInline`, reduced-motion gating, autoplay attempt and a pause/play button.
- The current source film is procedural, not approved cinema. CSS motion must not be substituted or described as a real video.
- No Downloads or unverified third-party media may be used. Planned relative locations are `public/media/yesbe-hero.webm`, `public/media/yesbe-hero.mp4` and `public/media/yesbe-hero-poster.webp`; they are not created or referenced in production markup until approved.
- Action: keep the component integration-ready, use the existing optimized static hero image as the temporary production fallback, and document the exact production brief.

### P0 — About Us founder content is already absent from the production route

- Status: `VERIFIED — NO CHANGE REQUIRED`
- `/about` is rendered by `src/pages/AboutPage.tsx`; it contains no founder biography card, portrait or founder-focused promotional section.
- `src/sections/AboutSection.tsx` still contains a legacy founder card, but `AboutSection` is not imported by any route/component.
- `/sachin-balraj` remains a dedicated route with its own SEO and schema; do not remove or neutralize it.
- Action: leave production route unchanged; do not delete unused legacy code unless required, to avoid unnecessary churn.

### P1 — Responsive visual variants exist but are not used in several high-impact locations

- Status: `PLANNED`
- `src/components/phase2/ServiceVisual.tsx:30-40` always requests `1600x1000` even though `-640` and `-960` variants exist for every visual.
- `src/pages/AboutPage.tsx:370-379` loads `company.webp` at full size in the About hero.
- `src/pages/AboutPage.tsx:483-490` loads `hero-film-poster.webp` at full size in a below-fold panel.
- Action: add `srcSet`/`sizes` using `localSrcSet()` and keep explicit `width`/`height` for zero CLS.

### P1 — Case Studies has duplicate filter UI and unconditional smooth scrolling

- Status: `PLANNED`
- `src/pages/CaseStudiesPage.tsx:432-449` renders a dark hero filter row.
- `src/pages/CaseStudiesPage.tsx:497-514` renders a second filter row for the project index.
- `selectFilter()` at `:341-344` always uses `behavior: "smooth"`, ignoring `prefers-reduced-motion: reduce`.
- Action: keep one canonical filter group in the project index; turn hero chips into anchors to `#project-record`; respect reduced motion; preserve filter state and record count.

### P1 — Capability visual system has only seven distinct scenes

- Status: `PLANNED`
- Existing visuals map cleanly to AI, ERP/CRM, web/custom software, cloud, transformation, product and company/system architecture.
- Business Automation, Data Analytics and System Integration currently reuse other scenes or lack a distinct asset.
- Action: generate one additional original glass-style `integration` scene locally with the existing deterministic renderer, export 640/960/1600 variants, inventory source/rights/format/dimensions, and map it to System Integration. Do not claim photoreal 3D or third-party assets.

### P2 — Homepage/About spacing and interaction polish are restricted by visual baselines

- Status: `PLANNED — LOW RISK ONLY`
- `scripts/visual.test.ts` and `tests/visual-baseline/` currently encode Phase 3 visuals for home/about/case studies/industries.
- Closing CTA uses generous `py-12 sm:py-16 lg:py-20` in `src/components/phase2/ClosingCta.tsx:35` and large inner padding at `:51`.
- Action: reduce only clearly excessive repeated gaps (CTA wrapper, duplicate page filters), avoid wholesale layout redesign, and refresh visual baselines only after intentional changes pass explicit review.

### P2 — Founder profile page has legacy loading and styling outliers

- Status: `DEFERRED`
- `src/pages/FounderPage.tsx:64-93` uses four lazy legacy sections and four `h-96` Suspense fallbacks; some child sections use legacy color classes.
- The request emphasizes preserving this page, not redesigning it, and it is outside the core Phase 5 checklist.
- Action: do not alter unless a blocking defect is found during route QA; document as deferred rather than silently changing.

## Requirements to verify after implementation

- Full-page desktop and mobile screenshots for homepage, About, Services, case studies, individual case study, industries, individual industry, custom software, ERP, AI, contact and founder profile.
- Playwright/DOM checks for: working video with pause/play, poster, mobile fallback, reduced motion, no headline/CTA overlap, navigation layering, card interactivity, responsive images, filter behavior, and no horizontal overflow.
- Full suites: `npm run lint`, typechecks, `npm run test:phase0`, `npm run test:api`, `npm run test:browser`, `npm run test:pricing-removal`, production build, audit and Lighthouse.
- Final report in `docs/phase5/REPORT.md` using `WORKING`, `BLOCKED — APPROVED MEDIA REQUIRED` and `NOT IMPLEMENTED` as applicable.
