import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Filter } from "mongodb";
import { requireAdmin } from "../_lib/auth.js";
import { asString, escapeRegex } from "../_lib/adminQuery.js";
import { ConfigError, ensureIndexes, subscribers, type SubscriberDoc } from "../_lib/db.js";
import { allowMethods, assertSameOrigin, sendError, sendJson } from "../_lib/http.js";
import { toObjectId } from "../_lib/objectId.js";
import { cleanText } from "../_lib/validate.js";

const STATUS_VALUES = ["active", "unsubscribed", "all"] as const;
type StatusFilter = (typeof STATUS_VALUES)[number];

function statusFilter(status: StatusFilter): Filter<SubscriberDoc> {
  if (status === "active") return { status: { $ne: "unsubscribed" } };
  if (status === "unsubscribed") return { status: "unsubscribed" };
  return {};
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET", "DELETE"])) return;
  if (!assertSameOrigin(req, res)) return;
  if (!requireAdmin(req, res)) return;

  try {
    await ensureIndexes();
    const col = subscribers();

    if (req.method === "GET") {
      const statusRaw = asString(req.query.status) ?? "active";
      if (!STATUS_VALUES.includes(statusRaw as StatusFilter)) {
        sendError(res, 400, "Unknown subscriber status filter");
        return;
      }
      const status = statusRaw as StatusFilter;
      const filter = statusFilter(status);

      const search = asString(req.query.q);
      if (search) {
        const escaped = escapeRegex(cleanText(search, 80));
        filter.email = new RegExp(escaped, "i");
      }

      const limitRaw = Number(asString(req.query.limit) ?? "25");
      const limit = Number.isFinite(limitRaw)
        ? Math.min(Math.max(Math.trunc(limitRaw), 1), 100)
        : 25;
      const pageRaw = Number(asString(req.query.page) ?? "1");
      const page = Number.isFinite(pageRaw) ? Math.max(Math.trunc(pageRaw), 1) : 1;

      const [items, total, active, unsubscribed] = await Promise.all([
        col
          .find(filter)
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray(),
        col.countDocuments(filter),
        col.countDocuments(statusFilter("active")),
        col.countDocuments(statusFilter("unsubscribed")),
      ]);

      sendJson(res, 200, {
        ok: true,
        items,
        total,
        page,
        limit,
        pages: Math.max(1, Math.ceil(total / limit)),
        counts: { active, unsubscribed },
      });
      return;
    }

    const _id = toObjectId(req.query.id);
    if (!_id) {
      sendError(res, 400, "Invalid subscriber id");
      return;
    }
    const result = await col.deleteOne({ _id });
    if (result.deletedCount === 0) {
      sendError(res, 404, "Subscriber not found");
      return;
    }
    sendJson(res, 200, { ok: true, deletedId: _id.toHexString() });
  } catch (err) {
    if (err instanceof ConfigError) {
      sendError(res, 503, "Database is not configured");
      return;
    }
    console.error(`[api/newsletter] ${req.method} failed`, err);
    sendError(res, 500, "Unable to process newsletter request");
  }
}
