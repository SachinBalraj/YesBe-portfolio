import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { ROOT, startStaticServer, type TestServer } from "./static-server.ts";

const OUT = join(ROOT, "docs/phase2.1");
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

interface Issue {
  page: string;
  viewport: string;
  issue: string;
}

interface VideoMetric {
  page: string;
  viewport: string;
  label: string;
  paused: boolean;
  currentTime: number;
  duration: number | null;
  readyState: number;
  preload: string;
  videoWidth: number;
  videoHeight: number;
  currentSrc: string;
  error: string | null;
}

const issues: Issue[] = [];
const videos: VideoMetric[] = [];

function record(page: string, viewport: string, issue: string) {
  issues.push({ page, viewport, issue });
}

async function prepare(context: BrowserContext, origin: string, path: string) {
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  await page.goto(`${origin}${path}`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2_000);
  return { page, errors };
}

async function collectMedia(page: Page, path: string, viewport: string) {
  const metrics = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLVideoElement>("video")].map((video) => ({
      label: video.getAttribute("aria-label") ?? "",
      paused: video.paused,
      currentTime: video.currentTime,
      duration: Number.isFinite(video.duration) ? video.duration : null,
      readyState: video.readyState,
      preload: video.preload,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      currentSrc: video.currentSrc,
      error: video.error ? `${video.error.code}: ${video.error.message}` : null,
    })),
  );
  for (const metric of metrics) videos.push({ page: path, viewport, ...metric });
  return metrics;
}

async function auditMedia(browser: Browser, origin: string) {
  const pages = ["/", "/about", "/services", "/case-studies", "/case-studies/fashion-fusion"] as const;
  const configs = [
    { name: "desktop", viewport: DESKTOP, reducedMotion: "no-preference" as const },
    { name: "mobile", viewport: MOBILE, reducedMotion: "no-preference" as const },
    { name: "desktop-reduced", viewport: DESKTOP, reducedMotion: "reduce" as const },
  ];

  for (const config of configs) {
    const context = await browser.newContext({
      viewport: config.viewport,
      deviceScaleFactor: 1,
      reducedMotion: config.reducedMotion,
      isMobile: config.viewport === MOBILE,
      hasTouch: config.viewport === MOBILE,
    });
    await context.addInitScript(() => {
      localStorage.setItem("yesbe-cookie-consent", "essential");
      localStorage.setItem(
        "yesbe-cookie-preferences",
        JSON.stringify({ essential: true, analytics: false, marketing: false }),
      );
    });

    for (const path of pages) {
      const { page, errors } = await prepare(context, origin, path);
      const metrics = await collectMedia(page, path, config.name);
      for (const error of errors) record(path, config.name, error);
      for (const metric of metrics) {
        if (metric.error) record(path, config.name, `video error: ${metric.error}`);
        if (metric.readyState >= 1 && (metric.videoWidth !== 1280 || metric.videoHeight !== 720)) {
          record(path, config.name, `video dimensions ${metric.videoWidth}x${metric.videoHeight}, expected 1280x720`);
        }
        if (metric.preload === "metadata" && metric.readyState < 1) {
          record(path, config.name, `metadata video readyState ${metric.readyState}, expected >= 1`);
        }
      }

      if (path === "/about") {
        const duplicates = await page.evaluate(() => {
          const sources = [...document.images]
            .filter((image) => image.closest("main") && image.getAttribute("src"))
            .map((image) => image.getAttribute("src") ?? "");
          return [...new Set(sources.filter((src, index) => sources.indexOf(src) !== index))];
        });
        if (duplicates.length) record(path, config.name, `reused image sources: ${duplicates.join(", ")}`);
      }

      if (config.name === "desktop" && path === "/") {
        const hero = metrics.find((metric) => metric.label.includes("connected systems"));
        if (!hero) record(path, config.name, "hero video was not rendered");
        else {
          if (hero.paused) record(path, config.name, `hero video did not autoplay: ${hero.label}`);
          if (hero.currentTime <= 0.05) record(path, config.name, `hero video made no progress: ${hero.label}`);
        }
      }

      if ((config.name === "mobile" || config.name === "desktop-reduced") && metrics.some((metric) => !metric.paused)) {
        record(path, config.name, "video autoplayed despite mobile/reduced-motion fallback");
      }

      if (config.name === "desktop" && path === "/about") {
        const play = page.getByRole("button", { name: /Play YESBE systems architecture film/ });
        if (!(await play.count())) record(path, config.name, "systems film play control missing");
        else {
          await play.first().click();
          await page.waitForTimeout(800);
          const systems = await page.evaluate(() => {
            const video = [...document.querySelectorAll<HTMLVideoElement>("video")].find((item) =>
              item.getAttribute("aria-label")?.includes("systems architecture"),
            );
            return video ? { paused: video.paused, currentTime: video.currentTime } : null;
          });
          if (!systems || systems.paused || systems.currentTime <= 0.05) {
            record(path, config.name, "systems film did not play after clicking its control");
          }
        }
      }

      await page.close();
    }
    await context.close();
  }
}

async function settle(page: Page, origin: string, path: string) {
  await page.goto(`${origin}${path}`, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight * 0.8, 480);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(
    () => [...document.images].every((image) => image.complete),
    undefined,
    { timeout: 15_000 },
  ).catch(() => {});
  await page.waitForTimeout(500);
}

async function capture(browser: Browser, origin: string) {
  const shots = [
    { name: "home-hero-desktop", path: "/", viewport: DESKTOP },
    { name: "home-full-desktop", path: "/", viewport: DESKTOP, fullPage: true },
    { name: "about-hero-desktop", path: "/about", viewport: DESKTOP },
    { name: "about-full-desktop", path: "/about", viewport: DESKTOP, fullPage: true },
    { name: "services-full-desktop", path: "/services", viewport: DESKTOP, fullPage: true },
    { name: "case-studies-full-desktop", path: "/case-studies", viewport: DESKTOP, fullPage: true },
    { name: "case-study-fashion-hero-desktop", path: "/case-studies/fashion-fusion", viewport: DESKTOP },
    { name: "case-study-fashion-full-desktop", path: "/case-studies/fashion-fusion", viewport: DESKTOP, fullPage: true },
    { name: "home-hero-mobile", path: "/", viewport: MOBILE },
    { name: "home-full-mobile", path: "/", viewport: MOBILE, fullPage: true },
    { name: "about-hero-mobile", path: "/about", viewport: MOBILE },
    { name: "about-full-mobile", path: "/about", viewport: MOBILE, fullPage: true },
    { name: "case-studies-full-mobile", path: "/case-studies", viewport: MOBILE, fullPage: true },
    { name: "case-study-fashion-full-mobile", path: "/case-studies/fashion-fusion", viewport: MOBILE, fullPage: true },
  ];

  const groups = [
    { viewport: DESKTOP, reducedMotion: "reduce" as const },
    { viewport: MOBILE, reducedMotion: "reduce" as const },
  ];

  for (const group of groups) {
    const context = await browser.newContext({
      viewport: group.viewport,
      deviceScaleFactor: 1,
      reducedMotion: group.reducedMotion,
      isMobile: group.viewport === MOBILE,
      hasTouch: group.viewport === MOBILE,
    });
    await context.addInitScript(() => {
      localStorage.setItem("yesbe-cookie-consent", "essential");
      localStorage.setItem(
        "yesbe-cookie-preferences",
        JSON.stringify({ essential: true, analytics: false, marketing: false }),
      );
    });
    const page = await context.newPage();
    for (const shot of shots.filter((item) => item.viewport === group.viewport)) {
      await settle(page, origin, shot.path);
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
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const server: TestServer = await startStaticServer();
  const browser = await chromium.launch();
  try {
    await auditMedia(browser, server.origin);
    await capture(browser, server.origin);
  } finally {
    await browser.close();
    await server.close();
  }

  writeFileSync(join(OUT, "metrics.json"), `${JSON.stringify({ videos, issues }, null, 2)}\n`);

  if (issues.length) {
    for (const issue of issues) console.log(`FAIL [${issue.page} @ ${issue.viewport}] ${issue.issue}`);
    process.exitCode = 1;
  } else {
    console.log(`Phase 2.1 audit passed. ${videos.length} video measurements, 14 screenshots.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
