/**
 * Read-only quality audit for the built site in dist/.
 *
 *   node scripts/quality-audit.mjs seo
 *   node scripts/quality-audit.mjs responsive
 *
 * Serves dist/ with Vercel-like routing (prerendered pages, redirects, real 404)
 * and reports titles, canonicals, headings, console errors, broken images,
 * internal links and horizontal overflow. Writes /tmp/yesbe-quality.json.
 */
import http from "node:http";
import { readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import pathToRegexp from "path-to-regexp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const PORT = 4178;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const MODE = process.argv[2] || "seo";
const OUT = "/tmp/yesbe-quality.json";

const config = JSON.parse(readFileSync(join(ROOT, "vercel.json"), "utf8"));
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".webmanifest": "application/manifest+json",
  ".xml": "application/xml", ".txt": "text/plain", ".svg": "image/svg+xml",
  ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".avif": "image/avif",
};

function patternToRegex(source) {
  let re = source
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\\\(\.\*\\\)/g, "(.*)")
    .replace(/\\\((.*?)\\\)/g, "($1)")
    .replace(/:[A-Za-z0-9_]+\\\*/g, ".*")
    .replace(/:[A-Za-z0-9_]+/g, "[^/]+");
  return new RegExp("^" + re + "$");
}

function headersFor(pathname) {
  const out = {};
  for (const rule of config.headers || []) {
    let matches = false;
    try { matches = patternToRegex(rule.source).test(pathname); } catch { matches = false; }
    if (!matches) continue;
    for (const h of rule.headers) out[h.key] = h.value;
  }
  return out;
}

function redirectFor(pathname) {
  for (const r of config.redirects || []) {
    const keys = [];
    let re;
    try { re = pathToRegexp.pathToRegexp(r.source, keys); } catch { continue; }
    const m = re.exec(pathname);
    if (!m) continue;
    const params = {};
    keys.forEach((k, i) => { params[k.name] = m[i + 1]; });
    let dest;
    try { dest = pathToRegexp.compile(r.destination)(params); } catch { dest = r.destination; }
    return { dest, status: r.permanent ? 308 : 307 };
  }
  return null;
}

function send(res, status, body, type, extra = {}) {
  res.writeHead(status, { "content-type": type, ...extra });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, ORIGIN);
  const pathname = decodeURIComponent(url.pathname);
  if (pathname !== "/" && pathname.endsWith("/")) {
    send(res, 308, "", "text/plain", { location: pathname.replace(/\/+$/, "") + url.search });
    return;
  }
  const redirect = redirectFor(pathname);
  if (redirect) {
    send(res, redirect.status, "", "text/plain", { location: redirect.dest });
    return;
  }
  let file = join(DIST, pathname);
  if (existsSync(file) && statSync(file).isFile()) {
    send(res, 200, readFileSync(file), MIME[extname(file)] || "application/octet-stream", headersFor(pathname));
    return;
  }
  const page = join(DIST, pathname, "index.html");
  if (existsSync(page)) {
    send(res, 200, readFileSync(page), MIME[".html"], headersFor(pathname));
    return;
  }
  const notFound = join(DIST, "404.html");
  if (existsSync(notFound)) {
    send(res, 404, readFileSync(notFound), MIME[".html"], headersFor("/404"));
    return;
  }
  send(res, 404, "Not found", "text/plain");
});

async function listen() {
  await new Promise((r) => server.listen(PORT, "127.0.0.1", r));
}

function sitemapPaths() {
  const xml = readFileSync(join(ROOT, "public/sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const u = new URL(m[1]);
    return u.pathname === "/" ? "/" : u.pathname.replace(/\/$/, "");
  });
}

const SAMPLE = [
  "/", "/about", "/sachin-balraj", "/services", "/industries", "/case-studies",
  "/insights", "/insights/search", "/videos", "/contact", "/privacy-policy",
  "/admin", "/definitely-not-a-page",
];

function firstMatching(prefix) {
  return sitemapPaths().find((p) => p.startsWith(prefix)) || null;
}

const RESPONSIVE_ROUTES = [
  ...SAMPLE,
  firstMatching("/services/"), firstMatching("/industries/"),
  firstMatching("/case-studies/"), firstMatching("/insights/article/"),
  firstMatching("/insights/category/"),
].filter(Boolean);

const WIDTHS = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

async function crawlSeo(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const routes = [...sitemapPaths(), "/insights/search", "/definitely-not-a-page"];
  const rows = [];
  const internalLinks = new Set();
  const externalLinks = new Set();
  const placeholders = new Set();

  for (const route of routes) {
    const consoleErrors = [];
    const pageErrors = [];
    const failed = [];
    const onConsole = (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 300)); };
    const onError = (e) => pageErrors.push(e.message.slice(0, 300));
    const onFailed = (r) => {
      const u = r.url();
      if (u.startsWith(ORIGIN) && !u.includes("/assets/")) failed.push(`${r.failure()?.errorText || "?"} ${u}`);
    };
    page.on("console", onConsole);
    page.on("pageerror", onError);
    page.on("requestfailed", onFailed);

    let status = 0;
    try {
      const response = await page.goto(ORIGIN + route, { waitUntil: "domcontentloaded", timeout: 30000 });
      status = response?.status() ?? 0;
      await page.waitForTimeout(600);

      // Lazy images only start loading once they approach the viewport, so a
      // top-of-page snapshot reports them as broken. Scroll through the page,
      // then briefly wait for any remaining image requests to settle.
      await page.evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const step = Math.max(500, Math.floor(window.innerHeight * 0.8));
        for (let y = 0; y <= document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await sleep(50);
        }
        window.scrollTo(0, 0);
        const pending = [...document.images].filter((img) => !img.complete);
        await Promise.race([
          Promise.all(pending.map((img) => new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          }))),
          sleep(3000),
        ]);
        await sleep(200);
      });

      const data = await page.evaluate(() => {
        const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
        const anchors = [...document.querySelectorAll("a[href]")].map((a) => ({
          href: a.getAttribute("href"),
          text: (a.textContent || "").trim().slice(0, 60),
        }));
        const imgs = [...document.images].map((img) => ({
          src: img.currentSrc || img.src,
          alt: img.getAttribute("alt"),
          w: img.naturalWidth,
          h: img.naturalHeight,
          complete: img.complete,
        }));
        return {
          title: document.title,
          description: meta('meta[name="description"]'),
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
          robots: meta('meta[name="robots"]'),
          lang: document.documentElement.lang,
          h1: [...document.querySelectorAll("h1")].map((h) => (h.textContent || "").trim().replace(/\s+/g, " ")),
          h2Count: document.querySelectorAll("h2").length,
          jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
          textLength: (document.getElementById("root")?.innerText || "").trim().length,
          anchors,
          brokenImages: imgs.filter((i) => i.src && i.complete && i.w === 0).map((i) => i.src),
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      });

      for (const a of data.anchors) {
        const href = a.href || "";
        if (!href || href === "#" || href.startsWith("javascript:")) { placeholders.add(`${route} -> ${href} (${a.text})`); continue; }
        if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
        try {
          const u = new URL(href, ORIGIN);
          if (u.origin === ORIGIN) internalLinks.add(u.pathname + u.search);
          else externalLinks.add(u.origin);
        } catch { /* ignore malformed */ }
      }
      rows.push({ route, status, ...data, consoleErrors, pageErrors, failed });
    } catch (e) {
      rows.push({ route, status, error: e.message, consoleErrors, pageErrors, failed });
    }
    page.off("console", onConsole);
    page.off("pageerror", onError);
    page.off("requestfailed", onFailed);
  }
  await context.close();

  const linkChecks = [];
  for (const href of [...internalLinks].sort()) {
    try {
      const res = await fetch(ORIGIN + href, { redirect: "follow" });
      const body = await res.text();
      linkChecks.push({ href, status: res.status, empty: body.trim().length < 500 });
    } catch (e) {
      linkChecks.push({ href, status: 0, error: e.message });
    }
  }

  return { mode: "seo", rows, linkChecks, externalLinks: [...externalLinks].sort(), placeholders: [...placeholders] };
}

async function crawlResponsive(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const rows = [];
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of RESPONSIVE_ROUTES) {
      const consoleErrors = [];
      const pageErrors = [];
      const onConsole = (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200)); };
      const onError = (e) => pageErrors.push(e.message.slice(0, 200));
      page.on("console", onConsole);
      page.on("pageerror", onError);
      try {
        await page.goto(ORIGIN + route, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(600);
        const data = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const offenders = [];
          if (document.documentElement.scrollWidth > vw + 1) {
            for (const el of document.querySelectorAll("body *")) {
              const r = el.getBoundingClientRect();
              const cs = getComputedStyle(el);
              if (r.width === 0 || cs.position === "fixed") continue;
              if (r.right > vw + 1) {
                offenders.push({
                  tag: el.tagName.toLowerCase(),
                  cls: String(el.className || "").slice(0, 90),
                  left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
                });
              }
              if (offenders.length >= 8) break;
            }
          }
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: vw,
            offenders,
            h1: document.querySelectorAll("h1").length,
          };
        });
        rows.push({ width, route, ...data, consoleErrors, pageErrors });
      } catch (e) {
        rows.push({ width, route, error: e.message, consoleErrors, pageErrors });
      }
      page.off("console", onConsole);
      page.off("pageerror", onError);
    }
    console.log(`responsive: ${width}px done`);
  }
  await context.close();
  return { mode: "responsive", rows };
}

await listen();
const browser = await chromium.launch();
let report;
try {
  report = MODE === "responsive" ? await crawlResponsive(browser) : await crawlSeo(browser);
} finally {
  await browser.close();
  server.close();
}
writeFileSync(OUT, JSON.stringify(report, null, 2));

if (report.mode === "seo") {
  const badStatus = report.rows.filter((r) => r.status !== (r.route === "/definitely-not-a-page" ? 404 : 200));
  const missingTitle = report.rows.filter((r) => !r.title);
  const h1Issues = report.rows.filter((r) => r.h1 && r.h1.length !== 1);
  const missingCanonical = report.rows.filter((r) => !r.canonical);
  const consoleIssue = report.rows.filter((r) => r.consoleErrors.length || r.pageErrors.length);
  const broken = report.rows.filter((r) => r.brokenImages?.length);
  const thin = report.rows.filter((r) => (r.textLength ?? 0) < 400);
  const badLinks = report.linkChecks.filter((l) => l.status !== 200 || l.empty);
  const overflow = report.rows.filter((r) => r.scrollWidth > r.clientWidth + 1);
  console.log(JSON.stringify({
    routes: report.rows.length,
    badStatus: badStatus.map((r) => [r.route, r.status]),
    missingTitle: missingTitle.length,
    h1Issues: h1Issues.map((r) => [r.route, r.h1]),
    missingCanonical: missingCanonical.map((r) => r.route),
    consoleIssue: consoleIssue.map((r) => [r.route, [...r.consoleErrors, ...r.pageErrors].slice(0, 2)]),
    brokenImages: broken.map((r) => [r.route, r.brokenImages.slice(0, 3)]),
    thinContent: thin.map((r) => [r.route, r.textLength]),
    internalLinks: report.linkChecks.length,
    badLinks: badLinks.slice(0, 30),
    placeholders: report.placeholders,
    overflowDesktop: overflow.map((r) => [r.route, r.scrollWidth, r.clientWidth]),
    externalOrigins: report.externalLinks,
  }, null, 2));
} else {
  const failures = report.rows.filter((r) => r.error || r.consoleErrors?.length || r.pageErrors?.length || r.scrollWidth > r.clientWidth + 1);
  console.log(JSON.stringify({
    checks: report.rows.length,
    failures: failures.map((r) => ({
      width: r.width, route: r.route, scrollWidth: r.scrollWidth, clientWidth: r.clientWidth,
      offenders: r.offenders, errors: [...(r.consoleErrors || []), ...(r.pageErrors || []), r.error].filter(Boolean).slice(0, 2),
    })),
  }, null, 2));
}
