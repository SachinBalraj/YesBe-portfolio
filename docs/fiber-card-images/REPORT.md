# Premium Fiber-Optic Card Images — Report

## Status
- Implemented locally only.
- Not committed, pushed, merged, or deployed.
- Only the six homepage case-study card image areas and their image alt text were changed.
- No uploaded reference screenshots were found in the workspace or available uploads, so the written visual direction was used.
- No suitable image-generation tool was available; properly licensed Unsplash photographs were used instead.

## Scope Protection
Unchanged:
- Homepage hero, headline, copy, and background.
- Navbar, footer, page structure, typography.
- Card dimensions, titles, descriptions, technology tags, CTA labels, links, and destinations.
- Existing horizontal scroll behavior, sticky behavior, and reduced-motion behavior.
- Services, Case Studies, About Us, admin, API, forms, database integrations.
- SEO metadata and structured data.
- Existing `/images/projects/*.webp` case-study preview assets, so other pages that use them are unaffected.
- `src/styles/case-studies-rail.css` was not changed by this task.

## Image Mapping
| Card | Existing title | Composition | New image basename | Source photo |
| --- | --- | --- | --- | --- |
| 01 | Fashion Fusion E-Commerce Platform | Radiating Blue Fibers | `fashion-fusion-card.webp` | `WN0alo23Yhg` |
| 02 | ERP Management System | Flowing Data Lines | `erp-management-card.webp` | `eMoMpSKE8eE` |
| 03 | AI Business Assistant | Digital Wave | `ai-business-assistant-card.webp` | `9aNBy66LAvQ` |
| 04 | Restaurant QR Ordering System | Connected Intelligence | `restaurant-qr-ordering-card.webp` | `JyRTi3LoQnc` |
| 05 | Library Management System | Intelligent Networks | `library-management-card.webp` | `dOYVMySdXd0` |
| 06 | Custom Business Automation Platform | Future Technology | `business-automation-card.webp` | `ZDRX1TVix1Y` |

All six images are abstract blue/cyan fiber-optic or luminous light-trail compositions on deep navy/black backgrounds, with consistent high contrast, crisp detail, and a cinematic macro look. No people, buildings, dashboards, robots, floating cubes, unrelated stock subjects, text, watermarks, or logos are present in the selected sources or added during processing.

## New Image Files
Each image was exported at four 16:9 WebP widths.

- `public/images/case-rail/fashion-fusion-card.webp` and `-960/-640/-480`
- `public/images/case-rail/erp-management-card.webp` and `-960/-640/-480`
- `public/images/case-rail/ai-business-assistant-card.webp` and `-960/-640/-480`
- `public/images/case-rail/restaurant-qr-ordering-card.webp` and `-960/-640/-480`
- `public/images/case-rail/library-management-card.webp` and `-960/-640/-480`
- `public/images/case-rail/business-automation-card.webp` and `-960/-640/-480`

Full-size variants are 1600×900; responsive variants are 960×540, 640×360, and 480×270. Total `public/images/case-rail` size is approximately 872 KB.

## Sources and Licensing
All six source photographs are marked **Free to use under the Unsplash License**, not Unsplash+. The Unsplash License permits commercial use, modification, and redistribution without required attribution: https://unsplash.com/license.

| Composition | Unsplash photo | Photographer shown on Unsplash |
| --- | --- | --- |
| Radiating Blue Fibers | https://unsplash.com/photos/blue-fiber-optic-cables-are-radiating-outwards-WN0alo23Yhg | S A |
| Flowing Data Lines | https://unsplash.com/photos/blury-lights-illuminate-fiber-optic-cables-eMoMpSKE8eE | S A |
| Digital Wave | https://unsplash.com/photos/vibrant-blue-light-trails-on-a-black-background-9aNBy66LAvQ | Veli Batuhan Aytaç |
| Connected Intelligence | https://unsplash.com/photos/white-and-blue-light-on-dark-room-JyRTi3LoQnc | Denny Müller |
| Intelligent Networks | https://unsplash.com/photos/abstract-blue-light-streaks-on-a-dark-background-dOYVMySdXd0 | 灿雄 邱 |
| Future Technology | https://unsplash.com/photos/abstract-glowing-blue-and-cyan-light-on-a-dark-background-ZDRX1TVix1Y | Akif Waseem |

No images were AI-generated. Each final asset is a locally processed crop with a consistent blue/navy grade and edge vignette.

## Implementation
- Updated only `CARD_IMAGES` in `src/sections/CaseStudiesRail.tsx`.
- Replaced all 24 card WebP assets in `public/images/case-rail/`.
- Kept the existing `srcSet`, `sizes`, `width`, `height`, `loading`, `decoding`, card layout, and scroll behavior.
- Updated only the six image alt strings to describe the new abstract fiber-optic compositions.

## Verification
- `npm run build`: passed.
- `npm run lint`: passed with 9 pre-existing warnings.
- Case-rail browser verification: **56/56 checks passed**.
  - All six image paths load.
  - All images use 16:9 intrinsic ratios.
  - `srcset` contains 480w, 640w, 960w, and 1600w variants.
  - Alt text is present and descriptive.
  - Begin, mid, end, tablet, mobile, and reduced-motion layouts still pass.
- `npm run test:routing`: 13/13 passed.
- `npm run test:analytics`: 9/9 passed.
- `TEST_BASE_URL=http://127.0.0.1:3112 npm run test:browser:local`: 13/13 passed.
- `npm run test:seo`: 5/6 passed; the stale baseline still expects the old homepage H1.
- `npm run test:visual`: 3/7 passed; stale baselines reflect earlier hero/navbar/card redesigns.
- Home page Lighthouse:
  - Mobile: performance 79, accessibility 100, best practices 100, SEO 100; LCP 4.5s, CLS 0.
  - Desktop: performance 100, accessibility 100, best practices 100, SEO 100; LCP 0.1s, CLS 0.

## Screenshots
- All six cards in one grid: `docs/fiber-card-images/all-six-cards.png`
- Actual horizontal-rail begin view: `docs/fiber-card-images/desktop-begin.png`
- Actual horizontal-rail mid view: `docs/fiber-card-images/desktop-mid.png`
- Actual horizontal-rail end view: `docs/fiber-card-images/desktop-end.png`
- Machine-readable case-rail verification: `docs/case-studies-rail/verification.json`

## Changed Files
- `src/sections/CaseStudiesRail.tsx`
- `public/images/case-rail/*.webp` (24 files replaced)
- `docs/fiber-card-images/REPORT.md`
- `docs/fiber-card-images/all-six-cards.png`
- `docs/fiber-card-images/desktop-begin.png`
- `docs/fiber-card-images/desktop-mid.png`
- `docs/fiber-card-images/desktop-end.png`
- `docs/fiber-card-images/lighthouse-home-mobile.json`
- `docs/fiber-card-images/lighthouse-home-desktop.json`
- Regenerated existing verification artifacts:
  - `docs/case-studies-rail/desktop-begin.png`
  - `docs/case-studies-rail/desktop-50.png`
  - `docs/case-studies-rail/desktop-end.png`
  - `docs/case-studies-rail/tablet.png`
  - `docs/case-studies-rail/mobile.png`
  - `docs/case-studies-rail/reduced-motion-desktop.png`
  - `docs/case-studies-rail/verification.json`

## Remaining
- Visual approval is required. This session could not visually inspect image contents; screenshots are provided for review.
- No commit, push, merge, or deployment was performed.
