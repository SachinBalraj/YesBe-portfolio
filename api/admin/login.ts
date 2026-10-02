import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkCredentials, setSessionCookie } from "../_lib/auth.js";
import { allowMethods, clientIp, readJsonBody, sendError, sendJson } from "../_lib/http.js";
import { LOGIN_LIMIT, guard } from "../_lib/rateLimit.js";
import { cleanText } from "../_lib/validate.js";

/** POST /api/admin/login */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["POST"])) return;

  if (!process.env.ADMIN_EMAIL || !(process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_HASH)) {
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

  const email = cleanText(body.data.email, 254);
  const password = typeof body.data.password === "string" ? body.data.password.slice(0, 512) : "";

  if (!email || !password) {
    sendError(res, 400, "Email and password are required");
    return;
  }

  const ok = await checkCredentials(email, password);
  if (!ok) {
    // Same message for unknown email and wrong password — no user enumeration.
    sendError(res, 401, "Invalid email or password");
    return;
  }

  setSessionCookie(res, process.env.ADMIN_EMAIL);
  sendJson(res, 200, { ok: true, email: process.env.ADMIN_EMAIL });
}
