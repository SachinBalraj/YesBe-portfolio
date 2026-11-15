/**
 * Capture the Phase 1 review set from a running preview server.
 *
 * Usage:
 *   npm run build
 *   npm run serve
 *   npx tsx scripts/capture-phase1.ts
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { ROOT } from "./static-server.ts";

const BASE = process.env.PREVIEW_URL ?? "http://localhost:3111";
const OUT = join(ROOT, "docs/phase1");

const desktopPages = [
  ["home-desktop", "/"],
  ["about-desktop", "/about"],
  ["services-desktop", "/services"],
  ["contact-desktop", "/contact"],
  ["insights-desktop", "/insights"],
  ["founder-desktop", "/sachin-balraj"],
] as const;

const mobilePages = [
  ["home-mobile", "/"],
  ["services-mobile", "/services"],
] as const;

async function ready(page: Page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () => [...document.images].every((img) => img.complete),
    undefined,
    { timeout: 15_000 },
  ).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

async function shot(page: Page, name: string) {
  await page.screenshot({
    path: join(OUT, `${name}.png`),
    animations: "disabled",
    caret: "hide",
    scale: "css",
  });
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser: Browser = await chromium.launch();

  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await desktop.addInitScript(() => {
    localStorage.setItem("yesbe-cookie-consent", "essential");
    localStorage.setItem(
      "yesbe-cookie-preferences",
      JSON.stringify({ essential: true, analytics: false, marketing: false }),
    );
  });
  const page = await desktop.newPage();

  for (const [name, path] of desktopPages) {
    await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 45_000 });
    await ready(page);
    await shot(page, name);
  }

  await page.goto(`${BASE}/`, { waitUntil: "load" });
  await ready(page);
  await page.getByRole("button", { name: "Solutions" }).click();
  await page.waitForTimeout(350);
  await shot(page, "solutions-mega-menu");
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "Industries" }).click();
  await page.waitForTimeout(350);
  await shot(page, "industries-mega-menu");
  await page.keyboard.press("Escape");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await shot(page, "home-footer-desktop");
  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await mobile.addInitScript(() => {
    localStorage.setItem("yesbe-cookie-consent", "essential");
    localStorage.setItem(
      "yesbe-cookie-preferences",
      JSON.stringify({ essential: true, analytics: false, marketing: false }),
    );
  });
  const mobilePage = await mobile.newPage();

  for (const [name, path] of mobilePages) {
    await mobilePage.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 45_000 });
    await ready(mobilePage);
    await shot(mobilePage, name);
  }

  await mobilePage.goto(`${BASE}/`, { waitUntil: "load" });
  await ready(mobilePage);
  await mobilePage.getByRole("button", { name: "Open menu" }).click();
  await mobilePage.waitForTimeout(400);
  await shot(mobilePage, "mobile-menu");

  await mobilePage.getByRole("button", { name: "Solutions" }).click();
  await mobilePage.waitForTimeout(400);
  await shot(mobilePage, "mobile-menu-solutions");
  await mobilePage.getByRole("dialog", { name: "Mobile navigation" }).getByRole("button", { name: "Close menu" }).click();
  await mobilePage.waitForTimeout(350);
  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(600);
  await shot(mobilePage, "home-footer-mobile");
  await mobile.close();

  await browser.close();
  console.log(`Phase 1 screenshots written to ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
