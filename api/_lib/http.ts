import type { VercelRequest, VercelResponse } from "@vercel/node";

/** Hard ceiling on a submission body. The real form is ~2 KB. */
export const MAX_BODY_BYTES = 16 * 1024;

export function clientIp(req: VercelRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  const raw = Array.isArray(fwd) ? fwd[0] : fwd;
  if (raw) {
    const first = raw.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers["x-real-ip"];
  if (typeof real === "string" && real) return real;
  return "unknown";
}

export function sendJson(res: VercelResponse, status: number, body: unknown): void {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(status).json(body);
}

export function sendError(res: VercelResponse, status: number, message: string): void {
  sendJson(res, status, { ok: false, error: message });
}

/** Only the listed methods reach the handler; everything else gets 405. */
export function allowMethods(
  req: VercelRequest,
  res: VercelResponse,
  methods: string[],
): boolean {
  if (req.method && methods.includes(req.method)) return true;
  res.setHeader("Allow", methods.join(", "));
  sendError(res, 405, `Method ${req.method ?? "unknown"} not allowed`);
  return false;
}

/**
 * Reads and JSON-parses a request body with a size ceiling.
 * Rejects oversized bodies before they are buffered, and returns a plain
 * object so callers never receive an array or a prototype-polluted value.
 */
export function readJsonBody(
  req: VercelRequest,
): { ok: true; data: Record<string, unknown> } | { ok: false; status: number; error: string } {
  const declared = Number(req.headers["content-length"] ?? "0");
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: "Request body too large" };
  }

  if (typeof req.body === "string") {
    if (Buffer.byteLength(req.body, "utf8") > MAX_BODY_BYTES) {
      return { ok: false, status: 413, error: "Request body too large" };
    }
    try {
      const parsed: unknown = JSON.parse(req.body);
      if (!isPlainObject(parsed)) {
        return { ok: false, status: 400, error: "Request body must be a JSON object" };
      }
      return { ok: true, data: parsed };
    } catch {
      return { ok: false, status: 400, error: "Request body must be valid JSON" };
    }
  }

  if (isPlainObject(req.body)) {
    try {
      const serialized = Buffer.byteLength(JSON.stringify(req.body), "utf8");
      if (serialized > MAX_BODY_BYTES) {
        return { ok: false, status: 413, error: "Request body too large" };
      }
    } catch {
      return { ok: false, status: 400, error: "Request body could not be processed" };
    }
    return { ok: true, data: req.body };
  }

  return { ok: false, status: 400, error: "Request body must be valid JSON" };
}

const STATE_CHANGING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function headerValue(req: VercelRequest, name: string): string | null {
  const raw = req.headers[name];
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string" || value.trim() === "") return null;
  return value.trim();
}

/**
 * CSRF defence for state-changing requests.
 *
 * The session cookie is HttpOnly + SameSite=Strict, which already stops a
 * cross-site page from attaching it. This is the second layer: browsers send
 * an Origin header on cross-site form/fetch requests, so a mismatched (or
 * sandboxed "null") origin is rejected outright. Requests with no Origin and
 * no Referer are non-browser clients (curl, tests, server-to-server), which a
 * browser cannot be tricked into making, so they are allowed.
 *
 * Returns false after sending the error response.
 */
export function assertSameOrigin(req: VercelRequest, res: VercelResponse): boolean {
  if (!req.method || !STATE_CHANGING_METHODS.has(req.method)) return true;

  const origin = headerValue(req, "origin");
  if (origin === "null") {
    sendError(res, 403, "Cross-site request blocked");
    return false;
  }

  const source = origin ?? headerValue(req, "referer");
  if (!source) return true;

  let sourceHost: string;
  try {
    sourceHost = new URL(source).host.toLowerCase();
  } catch {
    sendError(res, 403, "Cross-site request blocked");
    return false;
  }

  const allowedHosts = new Set<string>();
  const forwardedHost = headerValue(req, "x-forwarded-host");
  if (forwardedHost) {
    for (const host of forwardedHost.split(",")) {
      if (host.trim()) allowedHosts.add(host.trim().toLowerCase());
    }
  }
  const host = headerValue(req, "host");
  if (host) allowedHosts.add(host.toLowerCase());

  // Optional explicit allowlist (e.g. a custom domain in front of Vercel).
  const configured = process.env.APP_ORIGIN;
  if (configured) {
    try {
      allowedHosts.add(new URL(configured).host.toLowerCase());
    } catch {
      // Ignore malformed configuration; the request-host check still applies.
    }
  }

  if (allowedHosts.size === 0 || !allowedHosts.has(sourceHost)) {
    sendError(res, 403, "Cross-site request blocked");
    return false;
  }

  return true;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  // `null` proto covers Object.create(null); JSON.parse yields Object.prototype.
  return proto === Object.prototype || proto === null;
}
