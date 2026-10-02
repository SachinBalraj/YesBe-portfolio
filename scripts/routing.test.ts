/**
 * Guards the Soft 404 fix.
 *
 * The site was previously a pure client-rendered SPA behind a catch-all rewrite,
 * so every URL — including URLs that do not exist — returned HTTP 200 with the
 * same generic shell. Search engines were served a document identical to the one
 * for a random URL, which is what got /sachin-balraj classified as a Soft 404.
 *
 * These tests serve dist/ the way Vercel now does (real files first, no SPA
 * fallback, dist/404.html with a genuine 404 status) and assert the contract:
 * every advertised URL is a real page with its own content and canonical, and
 * everything else is a real 404.
 *
 * Requires a completed `npm run build`.
 */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { Server } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, dirname, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { PRERENDER_ONLY_ROUTES, publicRoutes, SITE_URL } from "./routes.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

let server: Server;
let origin: string;

/**
 * Mirrors Vercel's static behaviour now that the SPA catch-all rewrite is gone:
 * resolve a real file (directory -> index.html), otherwise 404 via 404.html.
 */
function resolveFile(pathname: string): { file: string; status: number } | null {
  const rel = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const base = join(DIST, rel);
  const candidates = pathname.endsWith("/")
    ? [join(base, "index.html")]
    : [base, join(base, "index.html"), `${base}.html`];

  for (const c of candidates) {
    if (existsSync(c) && statSync(c).isFile()) return { file: c, status: 200 };
  }
  const notFound = join(DIST, "404.html");
  if (existsSync(notFound)) return { file: notFound, status: 404 };
  return null;
}

before(async () => {
  assert.ok(existsSync(DIST), "dist/ missing — run `npm run build` first");
  server = createServer((req, res) => {
    const pathname = (req.url ?? "/").split("?")[0];
    const hit = resolveFile(pathname);
    if (!hit) {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Not Found");
      return;
    }
    res.writeHead(hit.status, {
      "content-type": MIME[extname(hit.file)] ?? "application/octet-stream",
      "cache-control": "no-cache",
    });
    res.end(readFileSync(hit.file));
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  const addr = server.address();
  origin = `http://127.0.0.1:${typeof addr === "object" && addr ? addr.port : 0}`;
});

after(() => server.close());

const get = (p: string) => fetch(`${origin}${p}`, { redirect: "manual" });

test("dist contains a prerendered document for the founder page", () => {
  const file = join(DIST, "sachin-balraj/index.html");
  assert.ok(existsSync(file), "dist/sachin-balraj/index.html missing — prerender did not run");
});

test("/sachin-balraj serves 200 with its own title, canonical and one H1", async () => {
  const res = await get("/sachin-balraj");
  assert.equal(res.status, 200);
  const html = await res.text();

  assert.ok(
    html.includes("<title>Sachin Balraj | Founder of YESBE Technologies</title>"),
    "founder page must carry its own title in the initial HTML",
  );
  assert.ok(
    html.includes('<link rel="canonical" href="https://www.yesbe.tech/sachin-balraj"'),
    "founder canonical must point at the founder page, not the homepage",
  );
  assert.equal(
    (html.match(/<h1[\s>]/g) ?? []).length,
    1,
    "founder page must have exactly one <h1>",
  );
});

test("/sachin-balraj initial HTML carries real content, not a shell", async () => {
  const html = await (await get("/sachin-balraj")).text();
  const body = html.slice(html.indexOf("<body"));
  const text = body
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  assert.ok(text.length > 2000, `founder page has only ${text.length} chars of body copy`);
  assert.ok(text.includes("Sachin Balraj"), "founder name must appear in the initial HTML");
  assert.ok(text.includes("Springreen"), "Springreen role must be preserved");
});

test("/sachin-balraj emits Person and ProfilePage schema", async () => {
  const html = await (await get("/sachin-balraj")).text();
  assert.ok(/"@type":"Person"/.test(html), "missing Person schema");
  assert.ok(/"@type":"ProfilePage"/.test(html), "missing ProfilePage schema");
});

test("unknown routes return a genuine 404, not a 200 shell", async () => {
  for (const path of [
    "/this-page-definitely-does-not-exist-928374",
    "/services/not-a-real-service",
    "/insights/article/not-a-real-article",
    "/insights/category/not-a-real-category",
    "/totally/made/up/path",
  ]) {
    const res = await get(path);
    assert.equal(res.status, 404, `${path} must return 404, got ${res.status}`);
    const html = await res.text();
    assert.ok(html.includes('name="robots" content="noindex'), "404 page must be noindex");
  }
});

test("the 404 document is distinct from every real page", async () => {
  const notFound = readFileSync(join(DIST, "404.html"), "utf8");
  const founder = readFileSync(join(DIST, "sachin-balraj/index.html"), "utf8");
  assert.notEqual(notFound, founder);
  assert.ok(!notFound.includes(SITE_URL + "/prerender-not-found-probe"));
});

test("every core route still returns 200", async () => {
  for (const path of ["/", "/services", "/industries", "/about", "/insights", "/case-studies", "/contact", "/videos"]) {
    assert.equal((await get(path)).status, 200, `${path} must return 200`);
  }
});

test("every sitemap URL is backed by a prerendered file with a matching canonical", async () => {
  const missing: string[] = [];
  const wrongCanonical: string[] = [];

  for (const { path } of publicRoutes()) {
    const dir = path === "/" ? DIST : join(DIST, path.replace(/^\//, ""));
    const file = join(dir, "index.html");
    if (!existsSync(file)) {
      missing.push(path);
      continue;
    }
    const expected = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
    if (!readFileSync(file, "utf8").includes(`rel="canonical" href="${expected}"`)) {
      wrongCanonical.push(path);
    }
  }

  assert.deepEqual(missing, [], "advertised URLs with no HTML file are soft 404s");
  assert.deepEqual(wrongCanonical, [], "pages whose canonical does not match their own URL");
});

test("sitemap and prerender stay in sync", () => {
  const xml = readFileSync(join(ROOT, "public/sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE_URL, ""));
  const routes = publicRoutes().map((r) => r.path);
  assert.deepEqual(locs, routes, "sitemap.xml and the prerendered route list have diverged");
});

test("vercel.json keeps no catch-all SPA rewrite", () => {
  const cfg = JSON.parse(readFileSync(join(ROOT, "vercel.json"), "utf8"));
  const rewrites: { source: string; destination: string }[] = cfg.rewrites ?? [];
  const offenders = rewrites.filter((r) => r.destination === "/index.html" && r.source !== "/admin/:path*");
  assert.deepEqual(
    offenders,
    [],
    "a broad rewrite back to /index.html would resurrect 200 responses for unknown URLs",
  );
});

test("no generated page leaks a build-time host into its HTML", () => {
  // `vite preview` serves assets under its own origin. If that origin is
  // captured into the prerendered markup, deployed pages try to load chunks
  // from localhost, which an HTTPS page cannot do at all.
  const offenders: string[] = [];
  for (const path of [...publicRoutes().map((r) => r.path), ...PRERENDER_ONLY_ROUTES]) {
    const dir = path === "/" ? DIST : join(DIST, path.replace(/^\//, ""));
    const file = join(dir, "index.html");
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    if (/https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?/.test(html)) offenders.push(path);
  }
  assert.deepEqual(offenders, [], "pages contain a localhost/127.0.0.1 asset URL");
});

test("first-party bundles are referenced root-relative, not via a host", () => {
  const html = readFileSync(join(DIST, "sachin-balraj/index.html"), "utf8");
  const srcs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  // Third-party tags (e.g. Google Tag Manager) are absolute by design.
  const firstParty = srcs.filter((s) => !s.startsWith("https://www.googletagmanager.com"));
  assert.ok(firstParty.length > 0, "founder page has no first-party script tags");
  for (const src of firstParty) {
    assert.ok(src.startsWith("/assets/"), `first-party asset URL is not root-relative: ${src}`);
  }
});

test("the founder URL is advertised in the sitemap and linked internally", () => {
  const xml = readFileSync(join(ROOT, "public/sitemap.xml"), "utf8");
  assert.ok(xml.includes(`${SITE_URL}/sachin-balraj`), "founder page missing from sitemap");

  const homepage = readFileSync(join(DIST, "index.html"), "utf8");
  const about = existsSync(join(DIST, "about/index.html"))
    ? readFileSync(join(DIST, "about/index.html"), "utf8")
    : "";
  assert.ok(
    homepage.includes('href="/sachin-balraj"') || about.includes('href="/sachin-balraj"'),
    "founder page has no internal link, so it cannot be discovered by crawling",
  );
});