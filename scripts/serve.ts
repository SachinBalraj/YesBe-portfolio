/**
 * Local full-stack server for development and testing.
 *
 * Serves the built SPA from dist/ with the same catch-all rewrite Vercel uses,
 * and mounts the real serverless handlers from api/ so the frontend and backend
 * can be exercised together without deploying.
 *
 * Usage:
 *   npm run build
 *   MONGODB_URI=... ADMIN_EMAIL=... ADMIN_PASSWORD=... SESSION_SECRET=... \
 *     npm run serve
 *
 * Then open http://localhost:3111 (UI) and http://localhost:3111/admin.
 */
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname;
const PORT = Number(process.env.PORT ?? 3111);

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

type Handler = (req: unknown, res: unknown) => unknown | Promise<unknown>;

const API_ROUTES: Array<[RegExp, () => Promise<Handler>]> = [
  [/^\/api\/enquiries$/, () => import("../api/enquiries.ts").then((m) => m.default)],
  [/^\/api\/newsletter\/subscribe$/, () => import("../api/newsletter/subscribe.ts").then((m) => m.default)],
  [/^\/api\/newsletter$/, () => import("../api/newsletter/index.ts").then((m) => m.default)],
  [/^\/api\/admin\/login$/, () => import("../api/admin/login.ts").then((m) => m.default)],
  [/^\/api\/admin\/logout$/, () => import("../api/admin/logout.ts").then((m) => m.default)],
  [/^\/api\/admin\/session$/, () => import("../api/admin/session.ts").then((m) => m.default)],
  [/^\/api\/admin\/enquiries$/, () => import("../api/admin/enquiries/index.ts").then((m) => m.default)],
  [/^\/api\/admin\/enquiries\/([^/]+)$/, () => import("../api/admin/enquiries/[id].ts").then((m) => m.default)],
];

function collectBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function makeRes(res: ServerResponse) {
  const v = res as ServerResponse & { status: (c: number) => ServerResponse; json: (b: unknown) => void };
  v.status = (code: number) => {
    res.statusCode = code;
    return v;
  };
  v.json = (body: unknown) => {
    const text = JSON.stringify(body);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(text);
  };
  return v;
}

async function serveApi(url: URL, req: IncomingMessage, res: ServerResponse): Promise<void> {
  const raw = await collectBody(req);
  const entry = API_ROUTES.find(([re]) => re.test(url.pathname));

  if (!entry) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: "Not found" }));
    return;
  }

  const handler = await entry[1]();
  // Mirror how Vercel populates req.query for a dynamic segment.
  const match = url.pathname.match(entry[0])!;
  const query: Record<string, string> = {};
  for (const [key, value] of url.searchParams) query[key] = value;
  if (match.length > 1) query.id = decodeURIComponent(match[1]!);

  await handler(
    {
      method: req.method,
      url: url.pathname,
      headers: req.headers,
      body: raw.length > 0 ? raw.toString("utf8") : undefined,
      query,
      cookies: Object.fromEntries(
        (req.headers.cookie ?? "")
          .split(";")
          .map((c) => c.trim().split("="))
          .filter((p) => p.length === 2) as string[],
      ),
    },
    makeRes(res),
  );
}

function serveStatic(url: URL, res: ServerResponse): void {
  // normalize() collapses ../ so a crafted path cannot escape dist/.
  const clean = normalize(url.pathname).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(DIST, clean);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(DIST, "index.html");
  }

  const ext = extname(filePath);
  const immutable = filePath.includes("/assets/");
  res.writeHead(200, {
    "Content-Type": MIME[ext] ?? "application/octet-stream",
    "Cache-Control": immutable ? "public, max-age=31536000, immutable" : "no-cache",
  });
  createReadStream(filePath).pipe(res);
}

createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);

  if (url.pathname.startsWith("/api/")) {
    serveApi(url, req, res).catch((err) => {
      console.error(`[serve] ${req.method} ${url.pathname} failed`, err);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: "Internal error" }));
      }
    });
    return;
  }

  if (url.pathname.startsWith("/admin")) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
  }
  serveStatic(url, res);
}).listen(PORT, () => {
  console.log(`  ➜  Local:   http://localhost:${PORT}/`);
  console.log(`  ➜  Admin:   http://localhost:${PORT}/admin`);
  if (!process.env.MONGODB_URI) {
    console.warn("\n  ⚠ MONGODB_URI is not set — submissions will return 503.\n");
  }
});