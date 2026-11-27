import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "../_lib/auth.js";
import {
  ENQUIRY_CATEGORIES,
  ENQUIRY_FORM_TYPES,
  ENQUIRY_STATUSES,
} from "../_lib/db.js";
import { allowMethods, sendJson } from "../_lib/http.js";
import { ENQUIRY_LIMIT, LOGIN_LIMIT, SUBSCRIBE_LIMIT } from "../_lib/rateLimit.js";

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!requireAdmin(req, res)) return;

  sendJson(res, 200, {
    ok: true,
    settings: {
      adminEmail: process.env.ADMIN_EMAIL?.trim() || "yesbe.tech@gmail.com",
      timeZone: "Asia/Kolkata",
      sessionHours: 8,
      statuses: ENQUIRY_STATUSES,
      formTypes: ENQUIRY_FORM_TYPES,
      categories: ENQUIRY_CATEGORIES,
      submissionLimits: {
        enquiry: ENQUIRY_LIMIT.limit,
        newsletter: SUBSCRIBE_LIMIT.limit,
        login: LOGIN_LIMIT.limit,
      },
    },
  });
}
