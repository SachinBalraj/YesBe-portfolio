/**
 * Regression tests for the removal of the public pricing surface.
 *
 * These are static assertions over the source tree. They are intentionally
 * dependency-free (no browser, no database, no dev server) so the guarantees
 * here run in well under a second and cannot be affected by environment.
 *
 * Run: npm run test:pricing-removal
 */
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, existsSync } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const CONTENT = join(ROOT, "content");

function read(...parts: string[]): string {
  return readFileSync(join(ROOT, ...parts), "utf8");
}

/** Every file under `dir` matching `filter`. */
function walk(dir: string, filter: (p: string) => boolean): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full, filter));
    } else if (filter(full)) {
      out.push(full);
    }
  }
  return out;
}

const isSource = (p: string) => [".ts", ".tsx", ".css", ".md"].includes(extname(p));
const srcFiles = [...walk(SRC, isSource), ...walk(CONTENT, isSource)].map((p) => relative(ROOT, p));

/** A source file that mentions pricing, with the matching lines. */
function pricingMentions(pattern: RegExp): Array<[string, string[]]> {
  const hits: Array<[string, string[]]> = [];
  for (const file of srcFiles) {
    const lines = readFileSync(join(ROOT, file), "utf8").split("\n");
    const matched = lines
      .map((l, i) => [i + 1, l] as const)
      .filter(([, l]) => pattern.test(l));
    if (matched.length) hits.push([file, matched.map(([, l]) => l.trim())]);
  }
  return hits;
}

/* ── The pages are gone ──────────────────────────────────── */

test("pricing page and section files are deleted", () => {
  assert.equal(existsSync(join(SRC, "pages", "PricingPage.tsx")), false, "PricingPage.tsx must be deleted");
  assert.equal(existsSync(join(SRC, "sections", "PricingSection.tsx")), false, "PricingSection.tsx must be deleted");
});

/* ── The redirect exists in both places ───────────────────── */

test("/pricing permanently redirects to /services in vercel.json", () => {
  const vercel = JSON.parse(read("vercel.json")) as {
    redirects?: Array<{ source: string; destination: string; permanent?: boolean }>;
  };
  const rule = vercel.redirects?.find((r) => r.source === "/pricing");
  assert.ok(rule, "vercel.json must define a /pricing redirect");
  assert.equal(rule!.destination, "/services");
  assert.equal(rule!.permanent, true, "redirect must be permanent");
});

test("/pricing has an SPA fallback so it never 404s in dev or preview", () => {
  const app = read("src", "App.tsx");
  assert.match(
    app,
    /path="\/pricing"[^>]*element=\{<Navigate to="\/services" replace \/>\}/,
    "App.tsx must redirect /pricing client-side",
  );
  assert.doesNotMatch(app, /<PricingPage\s*\/>/, "the pricing route must not render PricingPage");
  assert.doesNotMatch(app, /import\("@\/pages\/PricingPage"\)/, "PricingPage must not be imported");
});

/* ── No pricing links in navigation ───────────────────────── */

test("navigation, footer and 404 contain no Pricing link", () => {
  for (const file of [
    "src/components/layout/Navbar.tsx",
    "src/components/layout/Footer.tsx",
    "src/pages/NotFound.tsx",
  ]) {
    const src = read(...file.split("/"));
    assert.doesNotMatch(src, /"\/pricing"/, `${file} must not link to /pricing`);
    assert.doesNotMatch(src, /label:\s*"Pricing"/, `${file} must not have a Pricing nav item`);
  }
});

test("no component links to /pricing", () => {
  const offenders: string[] = [];
  for (const file of srcFiles) {
    if (extname(file) !== ".tsx" && extname(file) !== ".ts") continue;
    const src = readFileSync(join(ROOT, file), "utf8");
    // Allow the App.tsx redirect route itself.
    if (file === "src/App.tsx") continue;
    if (/"\/pricing"|href="\/pricing"/.test(src)) offenders.push(file);
  }
  assert.deepEqual(offenders, [], `these files still link to /pricing: ${offenders.join(", ")}`);
});

/* ── No public price data anywhere ────────────────────────── */

test("no currency amounts are published in the UI", () => {
  /**
   * Deliberate exceptions, each justified:
   *
   * - ContactSection: the budget dropdown holds ranges a *prospect* picks to
   *   qualify their own enquiry. It is not a price YesBe publishes, and the
   *   enquiry form must not change.
   * - TermsAndConditions: states the contractual invoicing currency. This is a
   *   contract term, not a published price.
   * - The two articles: describe a retailer's own revenue lost to stockouts
   *   ("cost it ₹5 lakhs a year") as a project outcome. That is the client's
   *   business metric, not a figure from YesBe's price list.
   */
  const intentional = new Set([
    "src/sections/ContactSection.tsx",
    "src/pages/TermsAndConditionsPage.tsx",
    "content/articles/industry-insights-sme-digital.md",
    "content/articles/what-is-erp.md",
  ]);

  const offenders: string[] = [];
  for (const file of srcFiles) {
    if (intentional.has(file)) continue;
    const src = readFileSync(join(ROOT, file), "utf8");
    if (/₹|\bRs\.\s*\d|\bINR\s*\d/.test(src)) offenders.push(file);
  }
  assert.deepEqual(offenders, [], `public currency amounts remain in: ${offenders.join(", ")}`);
});

test("no package/plan pricing metadata survives", () => {
  const seo = read("src", "constants", "seoTitles.ts");
  assert.doesNotMatch(seo, /^\s*pricing:/m, "pricing SEO title/description must be removed");

  const sitemap = read("public", "sitemap.xml");
  assert.doesNotMatch(sitemap, /yesbe\.tech\/pricing/, "sitemap must not list /pricing");

  const analytics = read("src", "utils", "analytics.ts");
  assert.doesNotMatch(analytics, /pricing_click/, "the pricing_click analytics event must be removed");
});

test("consultation CTAs replace the removed pricing CTAs", () => {
  const navbar = read("src", "components", "layout", "Navbar.tsx");
  assert.match(navbar, /Book a Free Consultation/, "navbar must offer the consultation CTA");
  assert.doesNotMatch(navbar, /Book Free Consultation/, "CTA label must use the agreed wording");
});

/* ── Positioning ──────────────────────────────────────────── */

test("the site states it is consultation-based and publishes no price list", () => {
  const article = read("content", "articles", "website-development-cost-india.md");
  assert.match(
    article,
    /do not publish a public price list/,
    "the cost guide must position YesBe as consultation-based",
  );
  assert.doesNotMatch(article, /Rs\.\d/, "the cost guide must not publish rupee amounts");

  const faq = read("src", "sections", "FAQSection.tsx");
  assert.doesNotMatch(faq, /₹/, "FAQ must not publish rupee amounts");
});

test("every surviving 'pricing' mention is about the client's business or third parties", () => {
  // Each allowed occurrence, with the reason it stays.
  const allowed: Array<[RegExp, string]> = [
    [/\/pricing/, "the /pricing -> /services redirect route"],
    [/consultation-based|fixed price list/, "explicit consultation-based positioning copy"],
    [/keyword|^keywords:/, "SEO frontmatter keywords, used only for internal search scoring"],
    [/[Pp]ricing/, "references to the client's own product, inventory or service pricing"],
  ];

  const unexplained: string[] = [];
  for (const [file, lines] of pricingMentions(/pricing/i)) {
    for (const line of lines) {
      if (!allowed.some(([re]) => re.test(line))) unexplained.push(`${file}: ${line}`);
    }
  }
  assert.deepEqual(
    unexplained,
    [],
    `these pricing mentions are neither the redirect, positioning copy, SEO keywords, nor client/third-party pricing:\n${unexplained.join("\n")}`,
  );
});