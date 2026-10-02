import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ConfigError, ensureIndexes, enquiries } from "./_lib/db.js";
import { allowMethods, clientIp, readJsonBody, sendError, sendJson } from "./_lib/http.js";
import { ENQUIRY_LIMIT, guard } from "./_lib/rateLimit.js";
import { validateEnquiry, ValidationError } from "./_lib/validate.js";

/**
 * POST /api/enquiries — public.
 *
 * CREATE ONLY. This endpoint can never read, list or modify enquiries. All
 * reads and mutations live under /api/admin/* behind requireAdmin().
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["POST"])) return;

  const ip = clientIp(req);

  const limit = guard(`enquiry:${ip}`, ENQUIRY_LIMIT.limit, ENQUIRY_LIMIT.windowMs);
  if (!limit.allowed) {
    res.setHeader("Retry-After", String(limit.retryAfterSeconds));
    sendError(
      res,
      429,
      "Too many submissions. Please try again later or call us directly.",
    );
    return;
  }

  const body = readJsonBody(req);
  if (!body.ok) {
    sendError(res, body.status, body.error);
    return;
  }

  let validated;
  try {
    validated = validateEnquiry(body.data);
  } catch (err) {
    if (err instanceof ValidationError) {
      sendJson(res, 422, { ok: false, error: err.message, fields: err.fields });
      return;
    }
    throw err;
  }

  // Honeypot tripped: behave exactly like success so a bot learns nothing,
  // but store nothing.
  if (validated.honeypotTripped) {
    sendJson(res, 202, {
      ok: true,
      message: "Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.",
    });
    return;
  }

  const now = new Date();
  try {
    await ensureIndexes();
    await enquiries().insertOne({
      ...validated.data,
      status: "New",
      createdAt: now,
      updatedAt: now,
    });
  } catch (err) {
    if (err instanceof ConfigError) {
      sendError(res, 503, "Enquiries are temporarily unavailable. Please try again shortly.");
      return;
    }
    // Never report success when the write did not happen.
    console.error("[api/enquiries] insert failed", err);
    sendError(res, 500, "Unable to submit your enquiry. Please try again.");
    return;
  }

  sendJson(res, 201, {
    ok: true,
    message: "Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.",
  });
}
