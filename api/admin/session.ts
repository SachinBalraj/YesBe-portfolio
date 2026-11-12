import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminSubject, requireAdmin } from "../_lib/auth.js";
import { allowMethods, sendJson } from "../_lib/http.js";

/** GET /api/admin/session — used by the admin UI to decide what to render. */
export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!requireAdmin(req, res)) return;
  sendJson(res, 200, { ok: true, username: adminSubject(), email: adminSubject() });
}
