/**
 * Prerenders every public route to real static HTML after `vite build`.
 *
 * Why this exists
 * ---------------
 * The site is a client-rendered Vite SPA, so before this step `dist/` contained
 * exactly one HTML file. Every URL — including URLs that do not exist — was
 * served that same generic shell by the Vercel SPA rewrite, carrying the
 * homepage title and a canonical pointing at the homepage, with no <h1> and no
 * JSON-LD. Search engines were therefore served a document byte-identical to
 * the response for a random non-existent URL, which is precisely the shape of
 * a Soft 404.
 *
 * This script renders each route in Chromium and writes the finished DOM to
 * dist/<route>/index.html, so each URL is served its own title, canonical,
 * headings, body copy and structured data. It also renders the Not Found route
 * into dist/404.html, which Vercel serves with a genuine HTTP 404 status.
 *
 * The app boots with createRoot, so React re-renders over this markup on load;
 * the prerender is a delivery-layer fix, not a change to the runtime.
 *
 *   node --import tsx scripts/prerender.ts
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import type { Browser, BrowserContext, Page } from "playwright";
import { PRERENDER_ONLY_ROUTES, publicRoutes, SITE_URL } from "./routes.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const PORT = 4173;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const CONCURRENCY = 6;

/** The exact title the founder page is required to carry. */
const FOUNDER_TITLE = "Sachin Balraj | Founder of YESBE Technologies";

/**
 * Chromium needs a handful of shared libraries that a bare build image lacks
 * (libnspr4/libnss3 above all) — without them it exits with
 * "error while loading shared libraries" before rendering anything.
 *
 * `playwright install --with-deps` is no use here: it shells out to apt-get,
 * which does not exist on Vercel's Amazon Linux based image. Install the same
 * package set with whichever package manager the image actually provides.
 */
function installSystemDeps(): void {
  const PACKAGES = [
    "nspr", "nss", "atk", "at-spi2-atk", "cups-libs", "libdrm", "libxkbcommon",
    "libXcomposite", "libXdamage", "libXfixes", "libXrandr", "libX11-xcb",
    "mesa-libgbm", "pango", "cairo", "alsa-lib",
  ];

  for (const manager of ["dnf", "microdnf", "yum", "apt-get"]) {
    if (spawnSync("sh", ["-c", `command -v ${manager}`], { stdio: "ignore" }).status !== 0) continue;
    console.log(`prerender: installing Chromium system libraries via ${manager}…`);
    const res = spawnSync(manager, ["install", "-y", ...PACKAGES], { stdio: "inherit" });
    if (res.status === 0) return;
    console.warn(`prerender: \`${manager} install\` failed, trying the next package manager`);
  }
  console.warn("prerender: could not install Chromium system libraries");
}

/** Chromium is present on a developer machine but not on a fresh CI builder. */
function ensureBrowser(): void {
  if (existsSync(chromium.executablePath())) return;
  installSystemDeps();
  console.log("prerender: Chromium not found, installing…");
  const res = spawnSync("npx", ["playwright", "install", "chromium"], {
    stdio: "inherit",
    cwd: ROOT,
  });
  if (res.status !== 0) {
    throw new Error("prerender: could not install Chromium — static HTML cannot be generated.");
  }
}

async function startPreview(): Promise<void> {
  const preview = spawn(
    "npx",
    ["vite", "preview", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"],
    { cwd: ROOT, stdio: "ignore" },
  );

  const deadline = Date.now() + 60_000;
  for (;;) {
    try {
      const res = await fetch(`${ORIGIN}/`);
      if (res.ok) break;
    } catch {
      /* not up yet */
    }
    if (Date.now() > deadline) {
      preview.kill();
      throw new Error("prerender: `vite preview` did not start in time.");
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  return preview;
}

/** Scrolls the whole page so every whileInView section animates in before capture. */
const SETTLE = async (page: Page): Promise<void> => {
  await page.evaluate(async () => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    // Two passes: lazily mounted sections can grow the document as we scroll.
    for (let pass = 0; pass < 2; pass++) {
      const step = Math.max(400, Math.floor(window.innerHeight * 0.75));
      const total = document.body.scrollHeight;
      for (let y = 0; y <= total; y += step) {
        window.scrollTo(0, y);
        await sleep(90);
      }
      window.scrollTo(0, total);
      await sleep(350);
    }
    window.scrollTo(0, 0);
    await sleep(250);
    await (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
  });
  await page.waitForLoadState("load");
};

async function capture(page: Page, routePath: string): Promise<string> {
  await page.goto(`${ORIGIN}${routePath}`, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });
  // App gates first paint on requestIdleCallback, then lazy-loads sections.
  await page.waitForFunction(
    () => {
      const root = document.getElementById("root");
      return !!root && root.innerText.trim().length > 400;
    },
    { timeout: 60_000 },
  );
  await SETTLE(page);

  const html = await page.evaluate(() => document.documentElement.outerHTML);
  const doc = html.startsWith("<!DOCTYPE") || html.startsWith("<!doctype")
    ? html
    : `<!DOCTYPE html>\n${html}`;
  return makeOriginAgnostic(doc);
}

/**
 * `vite preview` serves assets under its own origin, so the captured DOM has
 * `http://127.0.0.1:4173/assets/...` baked into its preload/module links.
 * Those must become root-relative, or the deployed page would try to fetch
 * chunks from localhost — an HTTPS page loading HTTP sub-resources is blocked,
 * so every lazy chunk would fail.
 */
function makeOriginAgnostic(html: string): string {
  return html
    .split(ORIGIN)
    .join("")
    .split(`http://localhost:${PORT}`)
    .join("")
    .split(`http://127.0.0.1:${PORT}`)
    .join("");
}

/** No build-time or preview-time host may ever reach the deployed HTML. */
function assertNoLocalHosts(html: string, routePath: string): void {
  const found = [
    ...new Set(html.match(/https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?/g) ?? []),
  ];
  if (found.length) {
    throw new Error(`${routePath}: leaked local host(s) into HTML: ${found.join(", ")}`);
  }
}

function expectedCanonical(routePath: string): string {
  return routePath === "/" ? SITE_URL : `${SITE_URL}${routePath}`;
}

/**
 * Guards against shipping a soft 404 again: a page is only written if it
 * carries its own canonical, a heading and a meaningful amount of content.
 */
function validate(html: string, routePath: string): void {
  const canonical = expectedCanonical(routePath);
  assertNoLocalHosts(html, routePath);
  if (!html.includes(`rel="canonical" href="${canonical}"`)) {
    throw new Error(`canonical is not ${canonical}`);
  }
  if (!/<h1[\s>]/.test(html)) throw new Error("no <h1> in rendered HTML");
  if (html.length < 20_000) throw new Error(`suspiciously small render (${html.length}b)`);

  if (routePath === "/sachin-balraj") {
    if (!html.includes(`<title>${FOUNDER_TITLE}</title>`)) {
      throw new Error(`founder title must be exactly "${FOUNDER_TITLE}"`);
    }
    if (!html.includes('"@type":"Person"') && !html.includes('"@type": "Person"')) {
      throw new Error("founder page is missing Person schema");
    }
    if (!html.includes('"@type":"ProfilePage"') && !html.includes('"@type": "ProfilePage"')) {
      throw new Error("founder page is missing ProfilePage schema");
    }
    if (!html.includes("Springreen")) throw new Error("founder page lost the Springreen role");
    const h1s = html.match(/<h1[\s>]/g) ?? [];
    if (h1s.length !== 1) throw new Error(`founder page has ${h1s.length} <h1> elements, expected 1`);
  }
}

function writeRoute(routePath: string, html: string): void {
  const dir = routePath === "/" ? DIST : join(DIST, routePath.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

/** Renders the catch-all Not Found route into dist/404.html (served with a 404 status). */
async function writeNotFound(context: BrowserContext): Promise<void> {
  const page = await context.newPage();
  const html = await capture(page, "/prerender-not-found-probe");
  await page.close();

  if (!html.includes('name="robots" content="noindex')) {
    throw new Error("404 page must be noindex");
  }
  if (!html.includes('rel="canonical" href="' + SITE_URL + '"')) {
    throw new Error("404 page canonical must not point at the probe URL");
  }
  writeFileSync(join(DIST, "404.html"), html);
}

async function main(): Promise<void> {
  if (!existsSync(DIST)) throw new Error("dist/ not found — run `vite build` first.");
  ensureBrowser();

  const preview = await startPreview();
  let browser: Browser;
  try {
    browser = await chromium.launch();
  } catch (firstErr) {
    // The browser binary can be present while its shared libraries are not.
    console.warn(`prerender: launch failed (${(firstErr as Error).message.split("\n")[0]})`);
    installSystemDeps();
    try {
      browser = await chromium.launch();
    } catch (err) {
      preview.kill();
      throw new Error(
        `prerender: Chromium could not launch even after installing system libraries.\n` +
          `${(err as Error).message.split("\n")[0]}`,
      );
    }
  }
  const failures: string[] = [];

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      userAgent:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    });

    await writeNotFound(context);

    const routes = [
      ...publicRoutes().map((r) => r.path),
      ...PRERENDER_ONLY_ROUTES,
    ];
    let cursor = 0;
    let done = 0;

    const worker = async (): Promise<void> => {
      const page = await context.newPage();
      try {
        for (;;) {
          const i = cursor++;
          if (i >= routes.length) return;
          const path = routes[i];
          try {
            const html = await capture(page, path);
            validate(html, path);
            writeRoute(path, html);
          } catch (err) {
            failures.push(`${path}: ${(err as Error).message}`);
          }
          done++;
          if (done % 20 === 0) console.log(`prerender: ${done}/${routes.length}`);
        }
      } finally {
        await page.close();
      }
    };

    await Promise.all(
      Array.from({ length: CONCURRENCY }, () => worker()),
    );
  } finally {
    await browser.close();
    preview.kill();
  }

  if (failures.length) {
    console.error(`\nprerender failed for ${failures.length} route(s):`);
    for (const f of failures.slice(0, 15)) console.error(`  ✗ ${f}`);
    process.exit(1);
  }

  console.log(`prerender: wrote ${publicRoutes().length + PRERENDER_ONLY_ROUTES.length} routes + 404.html`);
}

await main();