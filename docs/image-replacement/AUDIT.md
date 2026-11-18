# Image replacement audit

Date: 2026-11-18
Scope: image-only replacement of unsuitable generated/abstract card imagery. No reference image file was supplied or found; the written style brief is the source of truth.

## Decision rules

- Replace generated glass/abstract/system visuals used in service, capability, industry and related cards.
- Replace generated industry-schema visuals used in industry cards and industry detail heroes.
- Keep the homepage hero background/fallback, video posters, real consultation photography, founder portrait, icons, logos, charts and case-study interface previews.
- Keep visible copy, layout, routing, SEO, APIs, forms and component structure unchanged. Only image files and image alt text are changed.
- Preserve existing file paths, filenames, dimensions and responsive variants so no layout or loading code needs to change.

## Active image inventory

| Area | Current source | Decision | Reason |
|---|---|---|---|
| Homepage hero background | `public/images/visuals/hero-film-poster*.webp` via `HERO_FALLBACK` | KEEP | Explicitly excluded; approved static fallback remains. |
| Homepage systems film poster | `public/images/visuals/systems-film-poster.webp` via `SYSTEMS_FILM` | KEEP | Poster for owned systems film, not a generated card. |
| Homepage partnership/company photo | `public/images/company/yesbe-consultation-*.{avif,jpg,webp}` | KEEP | Real consultation photograph. |
| Homepage featured/supporting work | `public/images/projects/*.webp` | KEEP | Functional illustrative project previews; replacing them would fabricate case-study evidence. |
| Homepage journal cards | Remote `images.unsplash.com` article images | KEEP | Real editorial photography, not abstract/generated service artwork; out of scope. |
| Services grid cards | `public/images/visuals/{intelligence,enterprise,web,cloud,transformation,product}.webp` | REPLACE | Generated glass/abstract visuals; written brief requires realistic IT/business photography. |
| Service detail hero/cards | `public/images/visuals/{intelligence,automation,enterprise,web,cloud,analytics,integration,transformation,product}.webp` | REPLACE | Same shared service visual set. |
| About hero | `public/images/visuals/company.webp` | REPLACE | Generated systems visual; replace with a professional collaboration photo while preserving the frame. |
| About deliverable cards | `public/images/visuals/{intelligence,enterprise,web,cloud,transformation,product}.webp` | REPLACE | Same shared service visual set. |
| About why-YESBE background | `public/images/visuals/hero-film-poster.webp` | KEEP | Shared approved hero still. |
| About systems film poster | `public/images/visuals/systems-film-poster.webp` | KEEP | Owned video poster. |
| Core industry cards/detail heroes | `public/images/industries/{healthcare,education,retail,manufacturing,logistics,finance}.webp` | REPLACE | Generated abstract sector schemas. |
| Other industry cards/detail heroes | `public/images/visuals/{product,enterprise,company,transformation}.webp`, `public/images/projects/{restaurant-qr-ordering,business-portfolio}.webp` | REPLACE | Reused/generated fallbacks in industry cards; replace with distinct sector photos. |
| About industries served cards | `public/images/industries/*.webp` via `INDUSTRY_VISUALS` | REPLACE | Same shared industry visual set. |
| Case-study grid/detail cards | `public/images/projects/*.webp` | KEEP | Functional illustrative previews; not service/industry photography. |
| Insights/article cards | Remote `images.unsplash.com` article images | KEEP | Existing editorial stock photography; not generated abstract artwork. |
| Founder route portrait | `src/assets/images/founder-portrait.jpeg` | KEEP | Real founder portrait. |

## Replacement plan

All replacement images will be downloaded from verified `images.unsplash.com` photo URLs and resized locally. The Unsplash License permits free commercial use, modification and redistribution without required attribution; source IDs are recorded in `docs/image-replacement/REPORT.md`. No Unsplash+ assets are used.

Existing responsive filenames and dimensions are retained:

- `public/images/visuals/{key}.webp` 1600x1000, `-960.webp` 960x600, `-640.webp` 640x400.
- `public/images/industries/{slug}.webp` 1200x900, `-960.webp` 960x720, `-640.webp` 640x480.
- New industry fallback files use the same `public/images/industries/{slug}.webp` naming and dimensions as the six core industries.

### Service/capability visuals

| File stem | Intended subject | Unsplash source ID |
|---|---|---|
| `intelligence` | Support professional using technology for AI-assisted service | `photo-1531746020798-e6953c6e8e04` |
| `enterprise` | Business dashboard/reporting on screen | `photo-1551288049-bebda4e38f71` |
| `web` | Developer building a web application | `photo-1498050108023-c5249f4df085` |
| `cloud` | Data centre infrastructure | `photo-1544197150-b99a580bb7a8` |
| `transformation` | Business team planning digital change | `photo-1556761175-4b46a572b786` |
| `product` | Electronics/product engineering detail | `photo-1518770660439-4636190af475` |
| `company` | Professional team collaboration | `photo-1552664730-d307ca884978` |
| `automation` | Organised office workflow with figures | `photo-1454165804606-c3d57bc86b40` |
| `analytics` | Analytics dashboards on screen | `photo-1460925895917-afdab827c52f` |
| `integration` | Cross-functional business meeting | `photo-1551836022-d5d88e9218df` |

### Industry visuals

| File stem | Intended subject | Unsplash source ID |
|---|---|---|
| `healthcare` | Clinical/healthcare setting | `photo-1576091160399-112ba8d25d1d` |
| `education` | Modern learning environment | `photo-1509062522246-3755977927d7` |
| `retail` | Retail store environment | `photo-1441986300917-64674bd600d8` |
| `manufacturing` | Factory production machinery | `photo-1504328345606-18bbc8c9d7d1` |
| `logistics` | Warehouse/logistics operations | `photo-1586528116311-ad8dd3c8310d` |
| `finance` | Office desk with financial reports | `photo-1554224155-6726b3ff858f` |
| `startups` | Startup team working together | `photo-1467232004584-a241de8bcf5d` |
| `smes` | Small business team meeting | `photo-1556761175-5973dc0f32e7` |
| `large-enterprises` | Corporate office architecture | `photo-1486406146926-c627a92ad1ab` |
| `hospitality` | Restaurant/hospitality interior | `photo-1552566626-52f8b828add9` |
| `real-estate` | Residential property exterior | `photo-1560518883-ce09059eeffa` |

## Verification before approval

- Compare before/after desktop and mobile screenshots for home, services, service detail, industries, industry detail and about.
- Confirm unchanged layout metrics, responsive image variants, lazy loading and no horizontal overflow.
- Run build, lint, Phase 0, browser and visual checks.
- Stop locally for visual approval. Do not commit, push, merge or deploy.
