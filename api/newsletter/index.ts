import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Filter } from "mongodb";
import { requireAdmin } from "../_lib/auth.js";
import { ConfigError, ensureIndexes, subscribers } from "../_lib/db.js";
import { allowMethods, sendError, sendJson } from "../_lib/http.js";
import { toObjectId } from "../_lib/objectId.js";

/**
 * /api/newsletter — admin only.
 *   GET    list subscribers, newest first, paginated, optional ?q=
 *   DELETE remove one subscriber by id
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET", "DELETE"])) return;
  if (!requireAdmin(req, res)) return;

  try {
    await ensureIndexes();
    const col = subscribers();

    if (req.method === "GET") {
      const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
      const filter: Filter<{ email: string }> = {};
      if (q) {
        // Reuse the same literal-match rule as the enquiry search.
        const escaped = q.slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        filter.email = new RegExp(escaped, "i");
      }

      const limitRaw = Number(typeof req.query.limit === "string" ? req.query.limit : "25");
      const limit = Number.isFinite(limitRaw)
        ? Math.min(Math.max(Math.trunc(limitRaw), 1), 100)
        : 25;
      const pageRaw = Number(typeof req.query.page === "string" ? req.query.page : "1");
      const page = Number.isFinite(pageRaw) ? Math.max(Math.trunc(pageRaw), 1) : 1;

      const [items, total] = await Promise.all([
        col
          .find(filter)
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray(),
        col.countDocuments(filter),
      ]);

      sendJson(res, 200, {
        ok: true,
        items,
        total,
        page,
        limit,
        pages: Math.max(1, Math.ceil(total / limit)),
      });
      return;
    }

    // DELETE
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
