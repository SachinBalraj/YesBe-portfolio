/**
 * The canonical list of public, indexable routes.
 *
 * This is the single source of truth shared by the sitemap generator and the
 * prerenderer. Both the XML sitemap and the generated static HTML are derived
 * from this list, so a route can never be indexed-but-empty (a soft 404) or
 * present in the sitemap without a real HTML file behind it.
 */
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const SITE_URL = "https://www.yesbe.tech";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export interface RouteEntry {
  path: string;
  priority: string;
  changefreq: string;
}

const entry = (
  path: string,
  priority: string,
  changefreq = "monthly",
): RouteEntry => ({ path, priority, changefreq });

function readFileSafe(p: string): string {
  try {
    return readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

/** Slugs are read from the markdown filenames — the source of truth. */
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
    const src = readFileSafe(join(ROOT, "src/data", file));
    for (const m of src.matchAll(/^\s+slug:\s*"([a-z0-9-]+)"/gm)) {
      if (!found.includes(m[1])) found.push(m[1]);
    }
  }
  return found;
}

function categorySlugs(): string[] {
  const src = readFileSafe(join(ROOT, "src/knowledge/categories.ts"));
  return [
    ...new Set([...src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1])),
  ];
}

function caseStudySlugs(): string[] {
  const src = readFileSafe(join(ROOT, "src/data/caseStudies.ts"));
  return [...new Set([...src.matchAll(/slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1]))];
}

/**
 * Every public route, in sitemap order. `/` is included.
 */
export function publicRoutes(): RouteEntry[] {
  return [
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
    ...dataSlugs("solutions.ts", "solutions.new.ts").map((s) =>
      entry(`/services/${s}`, "0.8"),
    ),

    // ── Industries ────────────────────────────────────────────────
    ...dataSlugs("industries.ts").map((s) => entry(`/industries/${s}`, "0.6")),

    // ── Case studies ──────────────────────────────────────────────
    ...caseStudySlugs().map((s) => entry(`/case-studies/${s}`, "0.6")),

    // ── Insight categories ────────────────────────────────────────
    ...categorySlugs().map((s) => entry(`/insights/category/${s}`, "0.5")),

    // ── Articles ──────────────────────────────────────────────────
    ...articleSlugs().map((s) => entry(`/insights/article/${s}`, "0.7", "weekly")),
  ];
}

/**
 * Real pages that are reachable but deliberately kept out of the sitemap.
 *
 * The insights search page renders a different result set per query string and
 * is marked noindex, so advertising a single canonical variant in the sitemap
 * would be wrong — but it still deserves a real HTML document instead of the
 * generic shell, otherwise a shared search URL could itself read as a soft 404.
 */
export const PRERENDER_ONLY_ROUTES: string[] = ["/insights/search"];