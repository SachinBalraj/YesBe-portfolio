import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ConfigError, ensureIndexes, subscribers } from "../_lib/db.ts";
import { allowMethods, clientIp, readJsonBody, sendError, sendJson } from "../_lib/http.ts";
import { SUBSCRIBE_LIMIT, guard } from "../_lib/rateLimit.ts";
import { validateSubscribe, ValidationError } from "../_lib/validate.ts";
import { MongoServerError } from "mongodb";

/**
 * POST /api/newsletter/subscribe — public. CREATE ONLY.
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["POST"])) return;

  const ip = clientIp(req);
  const limit = guard(`subscribe:${ip}`, SUBSCRIBE_LIMIT.limit, SUBSCRIBE_LIMIT.windowMs);
  if (!limit.allowed) {
    res.setHeader("Retry-After", String(limit.retryAfterSeconds));
    sendError(res, 429, "Too many attempts. Please try again later.");
    return;
  }

  const body = readJsonBody(req);
  if (!body.ok) {
    sendError(res, body.status, body.error);
    return;
  }

  let validated;
  try {
    validated = validateSubscribe(body.data);
  } catch (err) {
    if (err instanceof ValidationError) {
      sendJson(res, 422, { ok: false, error: err.message, fields: err.fields });
      return;
    }
    throw err;
  }

  if (validated.honeypotTripped) {
    sendJson(res, 202, { ok: true, message: "Thank you for subscribing!" });
    return;
  }

  try {
    await ensureIndexes();
    const result = await subscribers().updateOne(
      { email: validated.email },
      {
        $setOnInsert: {
          email: validated.email,
          source: validated.source,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );

    // upsertedCount === 0 means the address was already stored, so acknowledge
    // that instead of claiming a brand new subscription.
    if (result.upsertedCount === 0) {
      sendJson(res, 200, { ok: true, message: "You are already subscribed." });
      return;
    }
  } catch (err) {
    if (err instanceof ConfigError) {
      sendError(res, 503, "Subscriptions are temporarily unavailable. Please try again shortly.");
      return;
    }
    // 11000 = duplicate key, i.e. already subscribed. That is a success case.
    if (err instanceof MongoServerError && err.code === 11000) {
      sendJson(res, 200, { ok: true, message: "You are already subscribed." });
      return;
    }
    console.error("[api/newsletter/subscribe] write failed", err);
    sendError(res, 500, "Unable to subscribe right now. Please try again.");
    return;
  }

  sendJson(res, 201, { ok: true, message: "Thank you for subscribing!" });
}
