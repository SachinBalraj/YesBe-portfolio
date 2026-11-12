import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminSubject, checkCredentials, isAdminConfigured, setSessionCookie } from "../_lib/auth.js";
import {
  allowMethods,
  assertSameOrigin,
  clientIp,
  readJsonBody,
  sendError,
  sendJson,
} from "../_lib/http.js";
import { LOGIN_LIMIT, guard } from "../_lib/rateLimit.js";
import { cleanText } from "../_lib/validate.js";

/** POST /api/admin/login */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["POST"])) return;
  if (!assertSameOrigin(req, res)) return;

  if (!isAdminConfigured()) {
    sendError(res, 503, "Admin access is not configured");
    return;
  }

  const ip = clientIp(req);
  const limit = guard(`login:${ip}`, LOGIN_LIMIT.limit, LOGIN_LIMIT.windowMs);
  if (!limit.allowed) {
    res.setHeader("Retry-After", String(limit.retryAfterSeconds));
    sendError(res, 429, "Too many login attempts. Please try again later.");
    return;
  }

  const body = readJsonBody(req);
  if (!body.ok) {
    sendError(res, body.status, body.error);
    return;
  }

  const identifier = cleanText(body.data.username ?? body.data.email, 254);
  const password = typeof body.data.password === "string" ? body.data.password.slice(0, 512) : "";

  if (!identifier || !password) {
    sendError(res, 400, "Admin ID and password are required");
    return;
  }

  const ok = await checkCredentials(identifier, password);
  if (!ok) {
    // Same message for unknown admin ID and wrong password — no enumeration.
    sendError(res, 401, "Invalid admin ID or password");
    return;
  }

  const subject = adminSubject();
  setSessionCookie(res, subject);
  sendJson(res, 200, { ok: true, username: subject, email: subject });
}
