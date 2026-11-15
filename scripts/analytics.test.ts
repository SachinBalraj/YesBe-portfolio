/**
 * Consent-gating and duplicate-tag regression tests.
 *
 * The site previously bootstrapped GTM in <head> before any consent decision,
 * and the prerenderer captured the runtime-injected gtag/gtm script tags into
 * every static page. A visitor therefore loaded GTM twice, before opting in.
 *
 * Requires a completed `npm run build` (the tests inspect dist/ and drive it).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test, { after, before } from "node:test";
import { chromium, type Browser, type Page } from "playwright";
import { DIST, ROOT, startStaticServer, type TestServer } from "./static-server.ts";

const GTM_URL = /googletagmanager\.com\/gtm\.js/;
const GA_URL = /googletagmanager\.com\/gtag\/js/;

let browser: Browser;
let server: TestServer;

before(async () => {
  server = await startStaticServer();
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await server?.close();
});

function requests(page: Page, pattern: RegExp): string[] {
  const hits: string[] = [];
  page.on("request", (req) => {
    if (pattern.test(req.url())) hits.push(req.url());
  });
  return hits;
}

async function settle(page: Page): Promise<void> {
  await page.waitForTimeout(2200);
  await page.waitForLoadState("networkidle").catch(() => {});
}

test("no document bootstrap for GTM or gtag in the HTML source", () => {
  const html = readFileSync(join(ROOT, "index.html"), "utf8");
  assert.ok(!html.includes("googletagmanager.com/gtm.js"), "index.html must not load GTM");
  assert.ok(!html.includes("googletagmanager.com/gtag/js"), "index.html must not load gtag.js");
  assert.ok(!html.includes("gtm.start"), "index.html must not bootstrap dataLayer");
  assert.ok(!html.includes("GTM-PZ9KWVFH"), "the container ID belongs in the consent-gated loader only");
});

test("prerendered pages contain no runtime-injected GTM/gtag tags", () => {
  for (const path of ["index.html", "about/index.html", "contact/index.html", "sachin-balraj/index.html"]) {
    const html = readFileSync(join(DIST, path), "utf8");
    assert.ok(!html.includes("googletagmanager.com/gtm.js"), `${path} contains gtm.js`);
    assert.ok(!html.includes("googletagmanager.com/gtag/js"), `${path} contains gtag.js`);
    assert.ok(!/src="[^"]*googletagmanager/.test(html), `${path} references a Google Tag script`);
  }
});

test("no analytics requests are made before consent", async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const gtm = requests(page, GTM_URL);
  const ga = requests(page, GA_URL);

  await page.goto(`${server.origin}/`, { waitUntil: "domcontentloaded" });
  await settle(page);

  assert.deepEqual(gtm, [], "GTM must not load before the visitor consents");
  assert.deepEqual(ga, [], "gtag.js must not load before the visitor consents");
  assert.equal(await page.evaluate(() => window.__yesbeGtmLoaded ?? false), false);
  await context.close();
});

test("accepting all loads exactly one GTM container", async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const gtm = requests(page, GTM_URL);

  await page.goto(`${server.origin}/`, { waitUntil: "domcontentloaded" });
  const accept = page.getByRole("button", { name: /accept all/i });
  await accept.waitFor({ state: "visible", timeout: 15_000 });
  await accept.click();

  await page.waitForFunction(
    () => window.__yesbeGtmLoaded === true && document.querySelectorAll('script[src*="gtm.js"]').length > 0,
    undefined,
    { timeout: 15_000 },
  );
  await page.waitForTimeout(1200);

  assert.equal(gtm.length, 1, `GTM should be requested once, saw: ${JSON.stringify(gtm)}`);
  assert.equal(
    await page.evaluate(() => document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]').length),
    1,
    "exactly one GTM script element must exist",
  );
  assert.equal(
    await page.evaluate(() => (window.dataLayer ?? []).filter((e) => e && typeof e === "object" && "gtm.start" in e).length),
    1,
    "gtm.start must be pushed once",
  );
  await context.close();
});

test("essential-only consent never loads analytics", async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const gtm = requests(page, GTM_URL);

  await page.goto(`${server.origin}/`, { waitUntil: "domcontentloaded" });
  const essential = page.getByRole("button", { name: /essential only/i }).first();
  await essential.waitFor({ state: "visible", timeout: 15_000 });
  await essential.click();
  await settle(page);

  assert.deepEqual(gtm, [], "essential-only consent must not download GTM");
  assert.equal(await page.evaluate(() => window.__yesbeGtmLoaded ?? false), false);
  await context.close();
});

test("a stored grant loads GTM once on the next visit", async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(() => {
    localStorage.setItem("yesbe-cookie-consent", "all");
    localStorage.setItem(
      "yesbe-cookie-preferences",
      JSON.stringify({ essential: true, analytics: true, marketing: true }),
    );
  });
  const gtm = requests(page, GTM_URL);

  await page.goto(`${server.origin}/`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => window.__yesbeGtmLoaded === true, undefined, { timeout: 15_000 });
  await page.waitForTimeout(900);

  assert.equal(gtm.length, 1, `returning consent must load GTM once, saw ${JSON.stringify(gtm)}`);
  assert.equal(
    await page.getByRole("button", { name: /accept all/i }).count(),
    0,
    "the banner must not reappear after a stored choice",
  );
  await context.close();
});
