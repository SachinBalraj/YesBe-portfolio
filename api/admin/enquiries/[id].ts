import { randomUUID } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { UpdateFilter } from "mongodb";
import { requireAdmin } from "../../_lib/auth.js";
import {
  ConfigError,
  ENQUIRY_STATUSES,
  ensureIndexes,
  enquiries,
  type EnquiryDoc,
  type EnquiryStatus,
} from "../../_lib/db.js";
import {
  allowMethods,
  assertSameOrigin,
  readJsonBody,
  sendError,
  sendJson,
} from "../../_lib/http.js";
import { toObjectId } from "../../_lib/objectId.js";
import { cleanMultiline } from "../../_lib/validate.js";

/**
 * /api/admin/enquiries/:id — admin only.
 *   GET     read one enquiry
 *   PATCH   update status only (the only mutable field)
 *   DELETE  remove permanently
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET", "PATCH", "DELETE"])) return;
  if (!assertSameOrigin(req, res)) return;
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

      const hasStatus = Object.hasOwn(body.data, "status");
      const hasNote = Object.hasOwn(body.data, "note");
      if (!hasStatus && !hasNote) {
        sendError(res, 422, "Provide a status or a follow-up note");
        return;
      }

      const now = new Date();
      const update: UpdateFilter<EnquiryDoc> = { $set: { updatedAt: now } };

      if (hasStatus) {
        const status = body.data.status;
        if (typeof status !== "string" || !(ENQUIRY_STATUSES as readonly string[]).includes(status)) {
          sendError(res, 422, "status must be one of: " + ENQUIRY_STATUSES.join(", "));
          return;
        }
        update.$set = { ...update.$set, status: status as EnquiryStatus };
      }

      if (hasNote) {
        const note = cleanMultiline(body.data.note, 2000);
        if (note.length === 0) {
          sendError(res, 422, "note must not be empty");
          return;
        }
        // Append-only: notes are never overwritten, so the follow-up history
        // is preserved. `id` lets the UI key/delete individual entries later.
        update.$push = { notes: { id: randomUUID(), text: note, createdAt: now } };
      }

      // Only `status`, appended notes and `updatedAt` are ever written; no
      // other field is reachable, so a client cannot modify the lead itself.
      const item = await col.findOneAndUpdate({ _id }, update, { returnDocument: "after" });
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
