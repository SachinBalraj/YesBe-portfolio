import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "../_lib/auth.js";
import { allowMethods, sendJson } from "../_lib/http.js";

/** GET /api/admin/session — used by the admin UI to decide what to render. */
export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!requireAdmin(req, res)) return;
  sendJson(res, 200, { ok: true, email: process.env.ADMIN_EMAIL });
}
