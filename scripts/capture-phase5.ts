/**
 * Phase 5 final visual and behavioural evidence capture.
 *
 * Usage:
 *   npm run build
 *   npm run capture:phase5
 *
 * Writes full-page desktop/mobile screenshots and a machine-readable QA report
 * to docs/phase5/.
 */
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  chromium,
  type Browser,
  type BrowserContext,
  type Page,
} from "playwright";
import { ROOT, startStaticServer } from "./static-server.ts";

const OUT = join(ROOT, "docs/phase5");
const SHOT_DIR = join(OUT, "screenshots");

const ROUTES = [
  ["home", "/"],
  ["about", "/about"],
  ["services", "/services"],
  ["case-studies", "/case-studies"],
  ["case-study-detail", "/case-studies/fashion-fusion"],
  ["industries", "/industries"],
  ["industry-detail", "/industries/healthcare"],
  ["custom-software", "/services/custom-software"],
  ["erp", "/services/erp-systems"],
  ["ai", "/services/ai-solutions"],
  ["contact", "/contact"],
  ["founder", "/sachin-balraj"],
] as const;

interface QaResult {
  name: string;
  status: "PASS" | "FAIL";
  detail: string;
}

const results: QaResult[] = [];
const screenshots: string[] = [];

async function check(name: string, run: () => Promise<string> | string) {
  try {
    const detail = await run();
    results.push({ name, status: "PASS", detail });
  } catch (error) {
    results.push({ name, status: "FAIL", detail: error instanceof Error ? error.message : String(error) });
  }
}

async function addConsent(context: BrowserContext) {
  await context.addInitScript(() => {
    localStorage.setItem("yesbe-cookie-consent", "essential");
    localStorage.setItem(
      "yesbe-cookie-preferences",
      JSON.stringify({ essential: true, analytics: false, marketing: false }),
    );
  });
}

async function primeImages(page: Page) {
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight, 600);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 45));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () => [...document.images].every((image) => image.complete),
    undefined,
    { timeout: 15_000 },
  ).catch(() => {});
  await page.waitForTimeout(250);
}

async function captureSet(browser: Browser, origin: string, mode: "desktop" | "mobile") {
  const context = await browser.newContext(
    mode === "desktop"
      ? { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }
      : { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, reducedMotion: "reduce" },
  );
  await addConsent(context);
  const page = await context.newPage();
  const overflow: string[] = [];
  const unapprovedRefs: string[] = [];

  for (const [name, route] of ROUTES) {
    await page.goto(`${origin}${route}`, { waitUntil: "load", timeout: 45_000 });
    await primeImages(page);
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasHeader: Boolean(document.querySelector("header")),
      canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
    }));
    if (metrics.scrollWidth > metrics.innerWidth + 1) overflow.push(`${name}: ${metrics.scrollWidth}px > ${metrics.innerWidth}px`);
    if (!metrics.hasHeader) overflow.push(`${name}: header missing`);

    const forbiddenRefs = await page.evaluate(() => {
      const html = document.documentElement.outerHTML;
      return ["/media/yesbe-hero", "/videos/yesbe-hero-film"].filter((needle) => html.includes(needle));
    });
    for (const ref of forbiddenRefs) unapprovedRefs.push(`${name}: ${ref}`);

    if (mode === "desktop" && name === "about") {
      const portraits = await page.locator('img[alt*="Sachin"], img[alt*="founder" i]').count();
      const cards = await page.locator('section[aria-label="What YESBE delivers"] a').count();
      results.push({
        name: "about_founder_content_removed",
        status: portraits === 0 ? "PASS" : "FAIL",
        detail: `${portraits} founder/portrait images on /about`,
      });
      results.push({
        name: "about_capability_card_count",
        status: cards === 6 ? "PASS" : "FAIL",
        detail: `${cards} interactive capability cards`,
      });
    }

    if (mode === "desktop" && name === "case-studies") {
      const filterCount = await page.getByRole("button", { name: "All projects", exact: true }).count();
      results.push({
        name: "single_project_filter_group",
        status: filterCount === 1 ? "PASS" : "FAIL",
        detail: `${filterCount} "All projects" filter buttons`,
      });
    }

    if (mode === "desktop" && name === "founder") {
      const canonicalOk = metrics.canonical.endsWith("/sachin-balraj");
      results.push({
        name: "founder_route_seo_preserved",
        status: canonicalOk ? "PASS" : "FAIL",
        detail: metrics.canonical || "canonical missing",
      });
    }

    if (mode === "desktop" && name === "services") {
      const responsive = await page.locator('img[srcset*="-640.webp"], img[srcset*="-960.webp"]').count();
      results.push({
        name: "responsive_visual_variants",
        status: responsive > 0 ? "PASS" : "FAIL",
        detail: `${responsive} images with local responsive variants`,
      });
    }

    const file = join(SHOT_DIR, `${name}-${mode}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: "disabled", caret: "hide", scale: "css" });
    screenshots.push(`docs/phase5/screenshots/${name}-${mode}.png`);
  }

  results.push({
    name: `no_horizontal_overflow_${mode}`,
    status: overflow.length === 0 ? "PASS" : "FAIL",
    detail: overflow.length === 0 ? "all 12 routes within viewport width" : overflow.join("; "),
  });

  if (mode === "desktop") {
    results.push({
      name: "no_unapproved_hero_media_refs",
      status: unapprovedRefs.length === 0 ? "PASS" : "FAIL",
      detail:
        unapprovedRefs.length === 0
          ? "no planned or procedural hero video references in production markup"
          : unapprovedRefs.join("; "),
    });
  }

  await context.close();
}

async function checkHeroStaticFallback(browser: Browser, origin: string) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  await addConsent(context);
  const page = await context.newPage();
  await page.goto(`${origin}/`, { waitUntil: "load", timeout: 45_000 });
  await primeImages(page);

  const fallback = page.locator('#hero img[src*="hero-film-poster"]').first();

  await check("hero_static_fallback_visible", async () => {
    assert.ok(await fallback.isVisible(), "static hero image is not visible");
    const attrs = await fallback.evaluate((element) => {
      const image = element as HTMLImageElement;
      return {
        loading: image.loading,
        fetchPriority: image.getAttribute("fetchpriority"),
        width: image.getAttribute("width"),
        height: image.getAttribute("height"),
      };
    });
    assert.equal(attrs.loading, "eager");
    assert.equal(attrs.fetchPriority, "high");
    assert.equal(attrs.width, "1600");
    assert.equal(attrs.height, "1000");
    return "eager, high-priority static hero image with fixed dimensions";
  });

  await check("hero_has_no_video_element", async () => {
    const count = await page.locator("#hero video, #hero source").count();
    assert.equal(count, 0, "unexpected video or source element in hero");
    return "no video or source elements in production hero markup";
  });

  await check("hero_fallback_responsive", async () => {
    const attrs = await fallback.evaluate((element) => {
      const image = element as HTMLImageElement;
      return {
        srcset: image.getAttribute("srcset") ?? "",
        sizes: image.getAttribute("sizes") ?? "",
      };
    });
    assert.match(attrs.srcset, /hero-film-poster-640\.webp 640w/);
    assert.match(attrs.srcset, /hero-film-poster-960\.webp 960w/);
    assert.match(attrs.srcset, /hero-film-poster\.webp 1600w/);
    assert.equal(attrs.sizes, "100vw");
    return "static fallback uses 640/960/1600 responsive variants";
  });

  await context.close();
}

async function checkMobileStaticFallback(browser: Browser, origin: string) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  await addConsent(context);
  const page = await context.newPage();
  await page.goto(`${origin}/`, { waitUntil: "load", timeout: 45_000 });
  await primeImages(page);

  await check("mobile_static_fallback_visible", async () => {
    const posterVisible = await page.locator('#hero img[src*="hero-film-poster"]').first().isVisible();
    const videoCount = await page.locator("#hero video").count();
    assert.ok(posterVisible && videoCount === 0, "expected static hero image and no video on mobile");
    return "static hero image visible with no video on mobile reduced motion";
  });

  await context.close();
}

async function main() {
  mkdirSync(SHOT_DIR, { recursive: true });
  const server = await startStaticServer();
  const browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });

  try {
    await captureSet(browser, server.origin, "desktop");
    await captureSet(browser, server.origin, "mobile");
    await checkHeroStaticFallback(browser, server.origin);
    await checkMobileStaticFallback(browser, server.origin);
  } finally {
    await browser.close();
    await server.close();
  }

  const report = {
    generatedAt: new Date().toISOString(),
    origin: server.origin,
    screenshots,
    checks: results,
  };
  writeFileSync(join(OUT, "qa.json"), `${JSON.stringify(report, null, 2)}\n`);

  const failed = results.filter((result) => result.status === "FAIL");
  console.log(`Phase 5 QA: ${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length > 0) {
    for (const result of failed) console.error(`FAIL ${result.name}: ${result.detail}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
