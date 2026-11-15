/**
 * Minimal static server for tests that only need the built `dist/` output.
 *
 * Mirrors the production file-resolution behaviour (directory -> index.html,
 * real 404 fallback) without starting the MongoDB-backed API or Vite preview.
 */
import { createServer } from "node:http";
import type { Server } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const DIST = join(ROOT, "dist");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolve(pathname: string): { file: string; status: number } | null {
  const rel = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const base = join(DIST, rel);
  const candidates = pathname.endsWith("/")
    ? [join(base, "index.html")]
    : [base, join(base, "index.html"), `${base}.html`];

  for (const file of candidates) {
    if (existsSync(file) && statSync(file).isFile()) return { file, status: 200 };
  }
  const notFound = join(DIST, "404.html");
  return existsSync(notFound) ? { file: notFound, status: 404 } : null;
}

export interface TestServer {
  origin: string;
  close: () => Promise<void>;
}

export async function startStaticServer(): Promise<TestServer> {
  if (!existsSync(DIST)) throw new Error("dist/ missing — run `npm run build` first");

  const server: Server = createServer((req, res) => {
    const pathname = (req.url ?? "/").split("?")[0] ?? "/";
    const hit = resolve(pathname);
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

  await new Promise<void>((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;

  return {
    origin: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise<void>((resolveClose, reject) =>
        server.close((err) => (err ? reject(err) : resolveClose())),
      ),
  };
}
