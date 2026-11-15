/**
 * Baseline visual regression for the major public templates.
 *
 * Captures a deterministic above-the-fold screenshot at desktop and mobile
 * widths and compares it with the checked-in PNG in tests/visual-baseline/.
 * Animations are disabled, analytics consent is pre-seeded (so no banner) and
 * the viewport is fixed so a layout drift becomes a measurable pixel diff.
 *
 * Create/refresh baselines deliberately:
 *   UPDATE_VISUALS=1 npm run test:visual
 *
 * Requires a completed `npm run build`.
 */
import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import test, { after, before } from "node:test";
import { chromium, type Browser } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { ROOT, startStaticServer, type TestServer } from "./static-server.ts";

const BASELINE_DIR = join(ROOT, "tests/visual-baseline");
const DIFF_DIR = join(ROOT, "tests/visual-diff");
const UPDATE = process.env.UPDATE_VISUALS === "1";
const MAX_DIFF_RATIO = 0.002;

interface Shot {
  name: string;
  path: string;
  width: number;
  height: number;
  mobile?: boolean;
}

const SHOTS: Shot[] = [
  { name: "home-desktop", path: "/", width: 1440, height: 900 },
  { name: "home-mobile", path: "/", width: 390, height: 844, mobile: true },
  { name: "about-desktop", path: "/about", width: 1440, height: 900 },
  { name: "services-desktop", path: "/services", width: 1440, height: 900 },
  { name: "contact-desktop", path: "/contact", width: 1440, height: 900 },
  { name: "insights-desktop", path: "/insights", width: 1440, height: 900 },
  { name: "founder-desktop", path: "/sachin-balraj", width: 1440, height: 900 },
];

let browser: Browser;
let server: TestServer;

before(async () => {
  server = await startStaticServer();
  browser = await chromium.launch();
  mkdirSync(BASELINE_DIR, { recursive: true });
  mkdirSync(DIFF_DIR, { recursive: true });
});

after(async () => {
  await browser?.close();
  await server?.close();
});

async function capture(shot: Shot): Promise<Buffer> {
  const context = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 1,
    isMobile: shot.mobile ?? false,
    hasTouch: shot.mobile ?? false,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    localStorage.setItem("yesbe-cookie-consent", "essential");
    localStorage.setItem(
      "yesbe-cookie-preferences",
      JSON.stringify({ essential: true, analytics: false, marketing: false }),
    );
  });

  await page.goto(`${server.origin}${shot.path}`, { waitUntil: "load", timeout: 45_000 });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () => {
      const imgs = [...document.images].filter((img) => {
        const rect = img.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
      });
      return imgs.every((img) => img.complete);
    },
    undefined,
    { timeout: 15_000 },
  ).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const buffer = await page.screenshot({ animations: "disabled", caret: "hide", scale: "css" });
  await context.close();
  return buffer;
}

function compare(name: string, actual: Buffer): { ratio: number; diff: Buffer | null } {
  const baselinePath = join(BASELINE_DIR, `${name}.png`);
  if (UPDATE || !existsSync(baselinePath)) {
    writeFileSync(baselinePath, actual);
    return { ratio: 0, diff: null };
  }

  const expected = PNG.sync.read(readFileSync(baselinePath));
  const received = PNG.sync.read(actual);
  assert.equal(
    `${received.width}x${received.height}`,
    `${expected.width}x${expected.height}`,
    `${name}: screenshot dimensions changed`,
  );

  const diff = new PNG({ width: expected.width, height: expected.height });
  const changed = pixelmatch(expected.data, received.data, diff.data, expected.width, expected.height, {
    threshold: 0.1,
    includeAA: false,
  });
  const ratio = changed / (expected.width * expected.height);
  const diffPath = join(DIFF_DIR, `${name}.png`);
  if (ratio > MAX_DIFF_RATIO) writeFileSync(diffPath, PNG.sync.write(diff));

  return { ratio, diff: changed > 0 ? PNG.sync.write(diff) : null };
}

for (const shot of SHOTS) {
  test(`visual baseline: ${shot.name}`, async () => {
    const actual = await capture(shot);
    assert.ok(actual.byteLength > 5_000, `${shot.name}: screenshot looks blank`);

    const { ratio } = compare(shot.name, actual);
    assert.ok(
      ratio <= MAX_DIFF_RATIO || UPDATE,
      `${shot.name}: ${(ratio * 100).toFixed(3)}% of pixels changed ` +
        `(limit ${(MAX_DIFF_RATIO * 100).toFixed(1)}%). See tests/visual-diff/${shot.name}.png`,
    );
  });
}
