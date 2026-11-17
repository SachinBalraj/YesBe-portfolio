/**
 * Captures Phase 3 before/after evidence from the production build.
 *
 * Usage:
 *   npm run build
 *   node --import tsx scripts/capture-phase3.ts before
 *   node --import tsx scripts/capture-phase3.ts after
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { ROOT, startStaticServer, type TestServer } from "./static-server.ts";

const phase = process.argv[2] === "after" ? "after" : "before";
const OUT = join(ROOT, "docs/phase3/screenshots", phase);
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

interface Shot {
  name: string;
  path: string;
}

const pageShots: Shot[] = [
  { name: "case-studies-overview", path: "/case-studies" },
  { name: "case-study-fashion-fusion", path: "/case-studies/fashion-fusion" },
  { name: "case-study-erp-management", path: "/case-studies/erp-management" },
  { name: "case-study-library-management", path: "/case-studies/library-management" },
  { name: "industries-overview", path: "/industries" },
  { name: "industry-healthcare", path: "/industries/healthcare" },
  { name: "industry-retail", path: "/industries/retail" },
  { name: "industry-manufacturing", path: "/industries/manufacturing" },
  { name: "about", path: "/about" },
];

async function settle(page: Page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight * 0.8, 480);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 55));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(
    () => [...document.images].every((img) => img.complete),
    undefined,
    { timeout: 15_000 },
  ).catch(() => {});
  await page.waitForTimeout(450);
}

async function capturePages(
  browser: Browser,
  origin: string,
  viewport: typeof DESKTOP,
  suffix: string,
) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    isMobile: viewport === MOBILE,
    hasTouch: viewport === MOBILE,
  });
  await context.addInitScript(() => {
    localStorage.setItem("yesbe-cookie-consent", "essential");
    localStorage.setItem(
      "yesbe-cookie-preferences",
      JSON.stringify({ essential: true, analytics: false, marketing: false }),
    );
  });
  const page = await context.newPage();

  for (const shot of pageShots) {
    await page.goto(`${origin}${shot.path}`, { waitUntil: "load", timeout: 45_000 });
    await settle(page);
    await page.screenshot({
      path: join(OUT, `${shot.name}-${suffix}.png`),
      fullPage: true,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    });
  }

  await context.close();
}

async function captureNavigation(browser: Browser, origin: string) {
  {
    const context = await browser.newContext({
      viewport: DESKTOP,
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    await context.addInitScript(() => {
      localStorage.setItem("yesbe-cookie-consent", "essential");
    });
    const page = await context.newPage();
    await page.goto(`${origin}/`, { waitUntil: "load" });
    await settle(page);
    const trigger = page.getByRole("button", { name: /solutions/i }).first();
    if (await trigger.count()) {
      await trigger.click();
      await page.waitForTimeout(350);
    }
    await page.screenshot({
      path: join(OUT, "navigation-desktop-menu.png"),
      animations: "disabled",
      caret: "hide",
      scale: "css",
    });
    await context.close();
  }

  {
    const context = await browser.newContext({
      viewport: MOBILE,
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      isMobile: true,
      hasTouch: true,
    });
    await context.addInitScript(() => {
      localStorage.setItem("yesbe-cookie-consent", "essential");
    });
    const page = await context.newPage();
    await page.goto(`${origin}/`, { waitUntil: "load" });
    await settle(page);
    const trigger = page.getByRole("button", { name: /open menu|menu/i }).first();
    if (await trigger.count()) {
      await trigger.click();
      await page.waitForTimeout(450);
    }
    await page.screenshot({
      path: join(OUT, "navigation-mobile-menu.png"),
      animations: "disabled",
      caret: "hide",
      scale: "css",
    });
    await context.close();
  }
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const server: TestServer = await startStaticServer();
  const browser = await chromium.launch();

  try {
    await capturePages(browser, server.origin, DESKTOP, "desktop");
    await capturePages(browser, server.origin, MOBILE, "mobile");
    await captureNavigation(browser, server.origin);
    console.log(`Phase 3 ${phase} screenshots written to ${OUT}`);
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
