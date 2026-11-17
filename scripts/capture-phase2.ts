import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { ROOT, startStaticServer, type TestServer } from "./static-server.ts";

const OUT = join(ROOT, "docs/phase2");
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

interface Shot {
  name: string;
  path: string;
  fullPage?: boolean;
}

const desktopShots: Shot[] = [
  { name: "home-hero-desktop", path: "/" },
  { name: "home-full-desktop", path: "/", fullPage: true },
  { name: "services-hero-desktop", path: "/services" },
  { name: "services-full-desktop", path: "/services", fullPage: true },
  { name: "service-ai-hero-desktop", path: "/services/ai-solutions" },
  { name: "service-ai-full-desktop", path: "/services/ai-solutions", fullPage: true },
  { name: "service-erp-full-desktop", path: "/services/erp-systems", fullPage: true },
  { name: "service-consulting-full-desktop", path: "/services/it-consulting", fullPage: true },
];

const mobileShots: Shot[] = [
  { name: "home-hero-mobile", path: "/" },
  { name: "home-full-mobile", path: "/", fullPage: true },
  { name: "services-hero-mobile", path: "/services" },
  { name: "services-full-mobile", path: "/services", fullPage: true },
  { name: "service-ai-hero-mobile", path: "/services/ai-solutions" },
  { name: "service-ai-full-mobile", path: "/services/ai-solutions", fullPage: true },
];

async function load(page: Page, origin: string, path: string) {
  await page.goto(`${origin}${path}`, { waitUntil: "load", timeout: 45_000 });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight * 0.8, 480);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(
    () => [...document.images].every((img) => img.complete),
    undefined,
    { timeout: 15_000 },
  ).catch(() => {});
  await page.waitForTimeout(500);
}

async function capture(browser: Browser, origin: string, viewport: typeof DESKTOP, shots: Shot[]) {
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
  for (const shot of shots) {
    await load(page, origin, shot.path);
    await page.screenshot({
      path: join(OUT, `${shot.name}.png`),
      fullPage: shot.fullPage,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    });
  }
  await context.close();
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const server: TestServer = await startStaticServer();
  const browser = await chromium.launch();

  try {
    await capture(browser, server.origin, DESKTOP, desktopShots);
    await capture(browser, server.origin, MOBILE, mobileShots);
    console.log(`Phase 2 screenshots written to ${OUT}`);
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
