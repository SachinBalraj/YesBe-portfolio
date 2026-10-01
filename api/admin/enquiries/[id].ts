import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "../../_lib/auth.ts";
import {
  ConfigError,
  ENQUIRY_STATUSES,
  ensureIndexes,
  enquiries,
  type EnquiryDoc,
  type EnquiryStatus,
} from "../../_lib/db.ts";
import { allowMethods, readJsonBody, sendError, sendJson } from "../../_lib/http.ts";
import { toObjectId } from "../../_lib/objectId.ts";

/**
 * /api/admin/enquiries/:id — admin only.
 *   GET     read one enquiry
 *   PATCH   update status only (the only mutable field)
 *   DELETE  remove permanently
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET", "PATCH", "DELETE"])) return;
  if (!requireAdmin(req, res)) return;

  const _id = toObjectId(req.query.id);
  if (!_id) {
    sendError(res, 400, "Invalid enquiry id");
    return;
  }

  try {
    await ensureIndexes();
    const col = enquiries();

    if (req.method === "GET") {
      const item = await col.findOne({ _id });
      if (!item) {
        sendError(res, 404, "Enquiry not found");
        return;
      }
      sendJson(res, 200, { ok: true, item });
      return;
    }

    if (req.method === "PATCH") {
      const body = readJsonBody(req);
      if (!body.ok) {
        sendError(res, body.status, body.error);
        return;
      }
      const status = body.data.status;
      if (typeof status !== "string" || !(ENQUIRY_STATUSES as readonly string[]).includes(status)) {
        sendError(res, 422, "status must be one of: " + ENQUIRY_STATUSES.join(", "));
        return;
      }

      // Only `status` and `updatedAt` are ever written; no other field is
      // reachable, so a client cannot modify the enquiry contents.
      const item = await col.findOneAndUpdate(
        { _id },
        { $set: { status: status as EnquiryStatus, updatedAt: new Date() } },
        { returnDocument: "after" },
      );
      if (!item) {
        sendError(res, 404, "Enquiry not found");
        return;
      }
      sendJson(res, 200, { ok: true, item: item as EnquiryDoc });
      return;
    }

    // DELETE
    const result = await col.deleteOne({ _id });
    if (result.deletedCount === 0) {
      sendError(res, 404, "Enquiry not found");
      return;
    }
    sendJson(res, 200, { ok: true, deletedId: _id.toHexString() });
  } catch (err) {
    if (err instanceof ConfigError) {
      sendError(res, 503, "Database is not configured");
      return;
    }
    console.error(`[api/admin/enquiries/:id] ${req.method} failed`, err);
    sendError(res, 500, `Unable to ${req.method === "DELETE" ? "delete" : "update"} enquiry`);
  }
}
