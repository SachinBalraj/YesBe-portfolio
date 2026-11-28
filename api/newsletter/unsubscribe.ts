import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Filter } from "mongodb";
import { requireAdmin } from "../_lib/auth.js";
import {
  ConfigError,
  ensureIndexes,
  subscribers,
  type SubscriberDoc,
} from "../_lib/db.js";
import {
  allowMethods,
  assertSameOrigin,
  readJsonBody,
  sendError,
  sendJson,
} from "../_lib/http.js";
import { toObjectId } from "../_lib/objectId.js";
import { cleanText, isValidEmail } from "../_lib/validate.js";

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["POST"])) return;
  if (!assertSameOrigin(req, res)) return;
  if (!requireAdmin(req, res)) return;

  const body = readJsonBody(req);
  if (body.ok === false) {
    sendError(res, body.status, body.error);
    return;
  }

  let filter: Filter<SubscriberDoc>;
  if (Object.prototype.hasOwnProperty.call(body.data, "id")) {
    const _id = toObjectId(body.data.id);
    if (!_id) {
      sendError(res, 400, "Invalid subscriber id");
      return;
    }
    filter = { _id };
  } else {
    const email = cleanText(body.data.email, 254).toLowerCase();
    if (!isValidEmail(email)) {
      sendError(res, 400, "Invalid subscriber email");
      return;
    }
    filter = { email };
  }

  try {
    await ensureIndexes();
    const item = await subscribers().findOneAndUpdate(
      filter,
      { $set: { status: "unsubscribed", unsubscribedAt: new Date() } },
      { returnDocument: "after" },
    );
    if (!item) {
      sendError(res, 404, "Subscriber not found");
      return;
    }
    sendJson(res, 200, { ok: true, item });
  } catch (err) {
    if (err instanceof ConfigError) {
      sendError(res, 503, "Database is not configured");
      return;
    }
    console.error("[api/newsletter/unsubscribe] failed", err);
    sendError(res, 500, "Unable to unsubscribe");
  }
}
