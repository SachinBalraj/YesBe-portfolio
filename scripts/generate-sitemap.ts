/**
 * Generates public/sitemap.xml from the same sources the app routes from.
 *
 * The sitemap used to be hand-maintained, which is how URLs fall out of sync
 * with the routes that actually exist. Deriving it from the route definitions
 * means a new service or article appears automatically and a renamed route
 * cannot leave a stale entry behind.
 *
 *   node --experimental-strip-types scripts/generate-sitemap.ts
 */
import { writeFileSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SITE_URL = "https://www.yesbe.tech";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TODAY = new Date().toISOString().slice(0, 10);

interface Entry {
  path: string;
  priority: string;
  changefreq: string;
}

const entry = (
  path: string,
  priority: string,
  changefreq = "monthly",
): Entry => ({ path, priority, changefreq });

/** Slugs are read from the markdown filenames — the single source of truth. */
function articleSlugs(): string[] {
  const dir = join(ROOT, "content/articles");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Slugs declared in a src/data file, deduped and order-preserving. */
function dataSlugs(...files: string[]): string[] {
  const found: string[] = [];
  for (const file of files) {
    const src = readFileSyncSafe(join(ROOT, "src/data", file));
    for (const m of src.matchAll(/^\s+slug:\s*"([a-z0-9-]+)"/gm)) {
      if (!found.includes(m[1])) found.push(m[1]);
    }
  }
  return found;
}

/** Category slugs from src/knowledge/categories.ts. */
function categorySlugs(): string[] {
  const src = readFileSyncSafe(join(ROOT, "src/knowledge/categories.ts"));
  return [...new Set([...src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]))];
}

function caseStudySlugs(): string[] {
  const src = readFileSyncSafe(join(ROOT, "src/data/caseStudies.ts"));
  return [...src.matchAll(/^\s+slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1]);
}

function readFileSyncSafe(p: string): string {
  try {
    return readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

const urls: Entry[] = [
  // ── Core ──────────────────────────────────────────────────────
  entry("/", "1.0", "weekly"),
  entry("/services", "0.9", "weekly"),
  entry("/industries", "0.8", "monthly"),
  entry("/about", "0.7", "monthly"),
  entry("/sachin-balraj", "0.8", "monthly"),
  entry("/insights", "0.8", "weekly"),
  entry("/case-studies", "0.7", "monthly"),
  entry("/contact", "0.9", "monthly"),
  entry("/videos", "0.5", "monthly"),

  // ── Legal (indexable, low value) ──────────────────────────────
  entry("/privacy-policy", "0.3", "yearly"),
  entry("/terms-and-conditions", "0.3", "yearly"),
  entry("/refund-policy", "0.3", "yearly"),
  entry("/cookie-policy", "0.3", "yearly"),
  entry("/disclaimer", "0.3", "yearly"),

  // ── Services ──────────────────────────────────────────────────
  ...dataSlugs("solutions.ts", "solutions.new.ts").map((s) => entry(`/services/${s}`, "0.8")),

  // ── Industries ────────────────────────────────────────────────
  ...dataSlugs("industries.ts").map((s) => entry(`/industries/${s}`, "0.6")),

  // ── Case studies ──────────────────────────────────────────────
  ...caseStudySlugs().map((s) => entry(`/case-studies/${s}`, "0.6")),

  // ── Insight categories ────────────────────────────────────────
  ...categorySlugs().map((s) => entry(`/insights/category/${s}`, "0.5")),

  // ── Articles ──────────────────────────────────────────────────
  ...articleSlugs().map((s) => entry(`/insights/article/${s}`, "0.7", "weekly")),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(ROOT, "public/sitemap.xml"), xml);
console.log(`sitemap.xml written — ${urls.length} URLs`);