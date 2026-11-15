/**
 * SEO preservation baseline.
 *
 * Reads every prerendered document and compares its indexable metadata against
 * a checked-in baseline. This is the guard that a redesign or performance change
 * did not quietly alter titles, descriptions, canonicals, robots directives,
 * structured-data types, Open Graph tags, sitemap entries or redirects.
 *
 * Create/refresh the baseline deliberately:
 *   UPDATE_SEO_BASELINE=1 npm run test:seo
 *
 * Requires a completed `npm run build`.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import test, { before } from "node:test";
import { PRERENDER_ONLY_ROUTES, publicRoutes, SITE_URL } from "./routes.ts";
import { DIST, ROOT } from "./static-server.ts";

const BASELINE = join(ROOT, "tests/seo-baseline.json");
const UPDATE = process.env.UPDATE_SEO_BASELINE === "1";

interface PageMeta {
  title: string;
  description: string | null;
  canonical: string | null;
  robots: string | null;
  ogTitle: string | null;
  ogUrl: string | null;
  twitterCard: string | null;
  h1: string[];
  jsonLdCount: number;
  jsonLdTypes: string[];
}

interface Baseline {
  routes: Record<string, PageMeta>;
  sitemap: string[];
  redirects: Array<{ source: string; destination: string; permanent: boolean }>;
}

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function attr(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern);
  return match ? decode(match[1]!.trim()) : null;
}

function collectTypes(value: unknown, out: Set<string>): void {
  if (Array.isArray(value)) {
    for (const item of value) collectTypes(item, out);
    return;
  }
  if (!value || typeof value !== "object") return;
  const record = value as Record<string, unknown>;
  const type = record["@type"];
  if (typeof type === "string") out.add(type);
  if (Array.isArray(type)) for (const t of type) if (typeof t === "string") out.add(t);
  for (const [key, child] of Object.entries(record)) {
    if (key !== "@type") collectTypes(child, out);
  }
}

function pageMeta(html: string): PageMeta {
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => m[1]!,
  );
  const types = new Set<string>();
  let parsed = 0;
  for (const raw of jsonLd) {
    try {
      collectTypes(JSON.parse(raw.replace(/\\u003c/g, "<")), types);
      parsed++;
    } catch {
      /* Not every script is machine-parsed by this test; the count still counts it. */
    }
  }

  return {
    title: decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? ""),
    description: attr(html, /<meta name="description" content="([^"]*)"/),
    canonical: attr(html, /<link rel="canonical" href="([^"]*)"/),
    robots: attr(html, /<meta name="robots" content="([^"]*)"/),
    ogTitle: attr(html, /<meta property="og:title" content="([^"]*)"/),
    ogUrl: attr(html, /<meta property="og:url" content="([^"]*)"/),
    twitterCard: attr(html, /<meta name="twitter:card" content="([^"]*)"/),
    h1: [...html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)].map((m) =>
      decode(m[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
    ),
    jsonLdCount: jsonLd.length,
    jsonLdTypes: [...types].sort(),
  };
}

function expectedCanonical(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

function readSitemap(): string[] {
  const xml = readFileSync(join(ROOT, "public/sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
}

function readRedirects(): Baseline["redirects"] {
  const config = JSON.parse(readFileSync(join(ROOT, "vercel.json"), "utf8")) as {
    redirects?: Array<{ source: string; destination: string; permanent?: boolean }>;
  };
  return (config.redirects ?? []).map((r) => ({
    source: r.source,
    destination: r.destination,
    permanent: r.permanent === true,
  }));
}

function fileFor(path: string): string {
  return path === "/" ? join(DIST, "index.html") : join(DIST, path.replace(/^\//, ""), "index.html");
}

const pages = [...publicRoutes().map((r) => r.path), ...PRERENDER_ONLY_ROUTES];

const current: Baseline = {
  routes: {},
  sitemap: readSitemap(),
  redirects: readRedirects(),
};

before(() => {
  assert.ok(existsSync(DIST), "dist/ missing — run `npm run build` first");
  for (const path of pages) {
    const file = fileFor(path);
    assert.ok(existsSync(file), `missing prerendered document for ${path}`);
    current.routes[path] = pageMeta(readFileSync(file, "utf8"));
  }
  if (UPDATE) writeFileSync(BASELINE, `${JSON.stringify(current, null, 2)}\n`);
});

test("every advertised route keeps its own title, description, canonical and H1", () => {
  for (const path of pages) {
    const meta = current.routes[path];
    assert.ok(meta.title, `${path} has no title`);
    assert.ok(meta.description, `${path} has no meta description`);
    assert.equal(meta.canonical, expectedCanonical(path), `${path} canonical changed`);
    assert.equal(meta.h1.length, 1, `${path} must have exactly one H1, found ${meta.h1.length}`);
    assert.ok(meta.robots, `${path} has no robots directive`);
    assert.ok(meta.jsonLdCount > 0, `${path} has no JSON-LD`);
    assert.ok(meta.jsonLdTypes.length > 0, `${path} JSON-LD has no @type`);
    assert.ok(meta.ogTitle, `${path} has no og:title`);
    assert.ok(meta.twitterCard, `${path} has no twitter:card`);
  }
});

test("the noindex/search and 404 documents keep their robots directives", () => {
  assert.match(current.routes["/insights/search"]?.robots ?? "", /noindex/);
  const notFound = readFileSync(join(DIST, "404.html"), "utf8");
  assert.match(notFound, /<meta name="robots" content="noindex/);
});

test("sitemap entries and redirects are byte-for-byte preserved", () => {
  const baseline = JSON.parse(readFileSync(BASELINE, "utf8")) as Baseline;
  assert.deepEqual(current.sitemap, baseline.sitemap, "sitemap.xml entries changed");
  assert.deepEqual(current.redirects, baseline.redirects, "vercel.json redirects changed");
});

test("route metadata matches the checked-in SEO baseline", () => {
  const baseline = JSON.parse(readFileSync(BASELINE, "utf8")) as Baseline;
  assert.deepEqual(current.routes, baseline.routes, "indexable metadata changed");
});

test("baseline is complete", () => {
  assert.equal(Object.keys(current.routes).length, pages.length);
});

test("baseline file is present", () => {
  assert.ok(existsSync(BASELINE), "tests/seo-baseline.json missing — run UPDATE_SEO_BASELINE=1 npm run test:seo");
});
