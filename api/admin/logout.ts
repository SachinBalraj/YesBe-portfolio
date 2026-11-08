import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clearSessionCookie } from "../_lib/auth.js";
import { allowMethods, assertSameOrigin, sendJson } from "../_lib/http.js";

/** POST /api/admin/logout — always clears the cookie, even if already invalid. */
export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (!allowMethods(req, res, ["POST"])) return;
  if (!assertSameOrigin(req, res)) return;
  clearSessionCookie(res);
  sendJson(res, 200, { ok: true });
}
