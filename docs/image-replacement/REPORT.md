# Image replacement report

Date: 2026-11-18
Branch: `redesign/hybrid-premium`
Status: **LOCAL IMPLEMENTATION COMPLETE — AWAITING VISUAL APPROVAL**

No commit, push, merge or deployment was performed.

## Brief

No approved three-card reference image file was supplied or found. Work used the written style brief: realistic professional IT/business photography, modern offices, laptops, dashboards, data centres and operational environments, premium editorial quality, subtle navy grading, consistent framing and no exaggerated AI/illustration effects.

Design, layout, visible copy, routing, SEO, APIs, forms, the homepage hero background, video posters, real consultation photography, founder portrait and case-study interface previews were left unchanged. Only image files, five industry image-path mappings and image alt text were changed.

## Changes

- Replaced 10 generated service/capability visual families in `public/images/visuals/`.
- Replaced 6 generated core industry visual families in `public/images/industries/`.
- Added 5 distinct professional industry visual families for previously reused fallback cards: `startups`, `smes`, `large-enterprises`, `hospitality`, `real-estate`.
- Preserved existing filenames and dimensions:
  - Visuals: `1600x1000`, `960x600`, `640x400`.
  - Industries: `1200x900`, `960x720`, `640x480`.
- Updated fallback industry mappings from generated visuals/project previews to the new industry photos in `src/data/phase3.ts`.
- Updated image alt text only in `src/data/media.ts`, `src/data/phase3.ts` and `src/pages/AboutPage.tsx`; no visible page copy changed.

## Sources and licenses

All replacement photographs came from direct `https://images.unsplash.com/photo-...` URLs. Every URL returned HTTP 200 `image/jpeg` on 2026-11-18. They are free Unsplash License assets, not Unsplash+ assets. The Unsplash License permits commercial use, modification and redistribution without required attribution: https://unsplash.com/license.

Photographer names were not inferred where not verified; source photo IDs are recorded below.

### Service/capability visuals

| Local files | Source | Intended subject |
|---|---|---|
| `public/images/visuals/intelligence{,-960,-640}.webp` | `photo-1531746020798-e6953c6e8e04` | Support professional using technology for AI-assisted service |
| `public/images/visuals/enterprise{,-960,-640}.webp` | `photo-1551288049-bebda4e38f71` | Business dashboards and reports on a workstation |
| `public/images/visuals/web{,-960,-640}.webp` | `photo-1498050108023-c5249f4df085` | Developer building a web application |
| `public/images/visuals/cloud{,-960,-640}.webp` | `photo-1544197150-b99a580bb7a8` | Data centre infrastructure |
| `public/images/visuals/transformation{,-960,-640}.webp` | `photo-1556761175-4b46a572b786` | Business team planning digital change |
| `public/images/visuals/product{,-960,-640}.webp` | `photo-1518770660439-4636190af475` | Electronics/product engineering detail |
| `public/images/visuals/company{,-960,-640}.webp` | `photo-1552664730-d307ca884978` | Professional team collaboration |
| `public/images/visuals/automation{,-960,-640}.webp` | `photo-1454165804606-c3d57bc86b40` | Organised office workflow with operational figures |
| `public/images/visuals/analytics{,-960,-640}.webp` | `photo-1460925895917-afdab827c52f` | Analytics dashboards on screen |
| `public/images/visuals/integration{,-960,-640}.webp` | `photo-1551836022-d5d88e9218df` | Cross-functional business meeting |

### Industry visuals

| Local files | Source | Intended subject |
|---|---|---|
| `public/images/industries/healthcare{,-960,-640}.webp` | `photo-1576091160399-112ba8d25d1d` | Clinical/healthcare setting |
| `public/images/industries/education{,-960,-640}.webp` | `photo-1509062522246-3755977927d7` | Modern learning environment |
| `public/images/industries/retail{,-960,-640}.webp` | `photo-1441986300917-64674bd600d8` | Retail store environment |
| `public/images/industries/manufacturing{,-960,-640}.webp` | `photo-1504328345606-18bbc8c9d7d1` | Factory production machinery |
| `public/images/industries/logistics{,-960,-640}.webp` | `photo-1586528116311-ad8dd3c8310d` | Warehouse/logistics operations |
| `public/images/industries/finance{,-960,-640}.webp` | `photo-1554224155-6726b3ff858f` | Office desk with financial reports |
| `public/images/industries/startups{,-960,-640}.webp` | `photo-1467232004584-a241de8bcf5d` | Startup team working together |
| `public/images/industries/smes{,-960,-640}.webp` | `photo-1556761175-5973dc0f32e7` | Small business team meeting |
| `public/images/industries/large-enterprises{,-960,-640}.webp` | `photo-1486406146926-c627a92ad1ab` | Corporate office architecture |
| `public/images/industries/hospitality{,-960,-640}.webp` | `photo-1552566626-52f8b828add9` | Restaurant/hospitality interior |
| `public/images/industries/real-estate{,-960,-640}.webp` | `photo-1560518883-ce09059eeffa` | Residential property exterior |

## Visual review

Before screenshots are copied from the unchanged Phase 5 baseline because assets and code were identical before this task:

- `docs/image-replacement/screenshots/before/`
- `docs/image-replacement/screenshots/after/`

Both sets cover the same 12 routes at desktop and mobile widths: home, about, services, case studies, case-study detail, industries, industry detail, custom software, ERP, AI, contact and founder.

Review priority:

1. `about-desktop.webp` / `about-mobile.webp` — About hero and industries served cards.
2. `services-desktop.webp` / `services-mobile.webp` — service card imagery.
3. `industries-desktop.webp` / `industries-mobile.webp` — core and fallback industry cards.
4. `industry-detail-desktop.webp` / `industry-detail-mobile.webp` — industry hero image.
5. `home-desktop.webp` / `home-mobile.webp` — confirm hero background is unchanged.

## Validation

Passed:

- `npm run build`
- `npm run lint` — pass with 9 pre-existing warnings
- `npm run test:security` — 13/13
- `npm run test:routing` — 13/13
- `npm run test:seo` — 6/6
- `npm run test:analytics` — 9/9
- `npm run test:api` — 51/51
- `npm run test:pricing-removal` — 10/10
- `npm run test:browser:local` — 13/13
- Custom Playwright capture — 24 route views, all targeted images loaded, no responsive variant failures and no horizontal overflow; recorded in `docs/image-replacement/qa.json`

Expected non-pass:

- `npm run test:visual` — 6/7. `about-desktop` reports a 12.840% pixel change against the old visual baseline (limit 0.2%). This is expected because the About hero image was intentionally replaced. The visual baseline was not updated pending user approval; diff is at `tests/visual-diff/about-desktop.png`.

`npm run test:browser` requires an external `TEST_ADMIN_PASSWORD`; the local ephemeral-credential runner was used instead.

## Approval state

Awaiting user visual approval of the before/after screenshots. If changes are requested, adjust only image selection/crops and image metadata. If approved, update the visual baseline as a separate step. Do not commit, push, merge or deploy until explicitly instructed.
