import { randomUUID } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Filter, UpdateFilter } from "mongodb";
import { requireAdmin } from "../../_lib/auth.js";
import { parseAdminQuery } from "../../_lib/adminQuery.js";
import { sendCsv } from "../../_lib/csv.js";
import {
  ConfigError,
  ENQUIRY_STATUSES,
  ensureIndexes,
  enquiries,
  resolveStoredStatus,
  serializeEnquiry,
  subscribers,
  type EnquiryDoc,
  type EnquiryStatus,
  type SubscriberDoc,
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

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const EXPORT_MAX_LIMIT = 10000;

const CSV_HEADERS = [
  "ID",
  "Name",
  "Email",
  "Phone",
  "Company",
  "Designation",
  "Service",
  "Industry",
  "Budget",
  "Timeline",
  "Project Description",
  "Business Challenges",
  "Goals",
  "Form Type",
  "Category",
  "Source Page",
  "Status",
  "Notes",
  "Archived",
  "Created At",
  "Updated At",
];

function decodeSegment(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function requestSegments(req: VercelRequest): string[] {
  const raw = req.query.segments ?? req.query.path;
  const fromQuery = Array.isArray(raw)
    ? raw
    : typeof raw === "string" && raw.length > 0
      ? [raw]
      : [];
  if (fromQuery.length > 0) {
    return fromQuery.map((value) => decodeSegment(String(value))).filter(Boolean);
  }

  const legacyId = req.query.id;
  if (typeof legacyId === "string" && legacyId.length > 0) return [decodeSegment(legacyId)];
  if (Array.isArray(legacyId) && legacyId.length > 0) return [decodeSegment(String(legacyId[0]))];

  const match = (req.url ?? "").match(/^\/api\/admin\/enquiries(?:\/(.+?))?(?:\?.*)?$/);
  return match?.[1]
    ? match[1].split("/").filter(Boolean).map(decodeSegment)
    : [];
}

function istStartOfDay(now: Date): Date {
  const shifted = new Date(now.getTime() + IST_OFFSET_MS);
  return new Date(
    Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate()) -
      IST_OFFSET_MS,
  );
}

function istStartOfMonth(now: Date): Date {
  const shifted = new Date(now.getTime() + IST_OFFSET_MS);
  return new Date(
    Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), 1) - IST_OFFSET_MS,
  );
}

function emptyCounts(): Record<EnquiryStatus, number> {
  return Object.fromEntries(ENQUIRY_STATUSES.map((s) => [s, 0])) as Record<EnquiryStatus, number>;
}

function statusCounts(rows: { _id: string; count: number }[]): Record<EnquiryStatus, number> {
  const counts = emptyCounts();
  for (const row of rows) {
    counts[resolveStoredStatus(String(row._id ?? "New"))] += row.count;
  }
  return counts;
}

async function listEnquiries(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!requireAdmin(req, res)) return;

  const parsed = parseAdminQuery(req.query);
  if (parsed.ok === false) {
    sendError(res, parsed.status, parsed.error);
    return;
  }

  try {
    await ensureIndexes();
    const col = enquiries();
    const now = new Date();
    const activeSubscribers: Filter<SubscriberDoc> = { status: { $ne: "unsubscribed" } };

    const [items, total, globalRows, summaryTotal, today, monthly, subscriberTotal, distinctServices] =
      await Promise.all([
        col
          .find(parsed.filter)
          .sort(parsed.sort)
          .skip(parsed.skip)
          .limit(parsed.limit)
          .toArray(),
        col.countDocuments(parsed.filter),
        col
          .aggregate<{ _id: string; count: number }>([
            { $group: { _id: "$status", count: { $sum: 1 } } },
          ])
          .toArray(),
        col.countDocuments({}),
        col.countDocuments({ createdAt: { $gte: istStartOfDay(now) } }),
        col.countDocuments({ createdAt: { $gte: istStartOfMonth(now) } }),
        subscribers().countDocuments(activeSubscribers),
        col.distinct("service"),
      ]);

    const counts = statusCounts(globalRows);

    sendJson(res, 200, {
      ok: true,
      items: items.map((item) => serializeEnquiry(item)),
      total,
      page: parsed.page,
      limit: parsed.limit,
      pages: Math.max(1, Math.ceil(total / parsed.limit)),
      counts,
      services: distinctServices
        .filter((s): s is string => typeof s === "string" && s.length > 0)
        .sort(),
      sort: parsed.sortField,
      dir: parsed.dir,
      summary: {
        total: summaryTotal,
        new: counts.New,
        today,
        monthly,
        contacted: counts.Contacted,
        inProgress: counts["In Progress"],
        converted: counts.Converted,
        closed: counts.Closed,
        subscribers: subscriberTotal,
        counts,
      },
    });
  } catch (err) {
    if (err instanceof ConfigError) {
      sendError(res, 503, "Database is not configured");
      return;
    }
    console.error("[api/admin/enquiries] list failed", err);
    sendError(res, 500, "Unable to load enquiries");
  }
}

export async function exportEnquiries(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!requireAdmin(req, res)) return;

  const parsed = parseAdminQuery(req.query, EXPORT_MAX_LIMIT, EXPORT_MAX_LIMIT);
  if (parsed.ok === false) {
    sendError(res, parsed.status, parsed.error);
    return;
  }

  try {
    await ensureIndexes();
    const items = await enquiries()
      .find(parsed.filter)
      .sort(parsed.sort)
      .skip(parsed.skip)
      .limit(parsed.limit)
      .toArray();

    const rows = items.map((doc) => {
      const item = serializeEnquiry(doc);
      return [
        doc._id.toHexString(),
        item.name,
        item.email,
        item.phone,
        item.company,
        item.designation,
        item.service,
        item.industry ?? "",
        item.budget,
        item.timeline,
        item.projectDescription,
        item.businessChallenges,
        item.goals,
        item.formType,
        item.sourceCategory,
        item.pageSource,
        item.status,
        item.notes?.map((note) => note.text).join(" | ") ?? "",
        item.archived === true ? "yes" : "no",
        item.createdAt,
        item.updatedAt,
      ];
    });

    sendCsv(res, `yesbe-enquiries-${new Date().toISOString().slice(0, 10)}`, CSV_HEADERS, rows);
  } catch (err) {
    if (err instanceof ConfigError) {
      sendError(res, 503, "Database is not configured");
      return;
    }
    console.error("[api/admin/enquiries/export] failed", err);
    sendError(res, 500, "Unable to export enquiries");
  }
}

async function enquiryById(req: VercelRequest, res: VercelResponse, id: string): Promise<void> {
  if (!allowMethods(req, res, ["GET", "PATCH", "DELETE"])) return;
  if (!assertSameOrigin(req, res)) return;
  if (!requireAdmin(req, res)) return;

  const _id = toObjectId(id);
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
      sendJson(res, 200, { ok: true, item: serializeEnquiry(item) });
      return;
    }

    if (req.method === "PATCH") {
      const body = readJsonBody(req);
      if (body.ok === false) {
        sendError(res, body.status, body.error);
        return;
      }

      const hasStatus = Object.prototype.hasOwnProperty.call(body.data, "status");
      const hasNote = Object.prototype.hasOwnProperty.call(body.data, "note");
      const hasArchived = Object.prototype.hasOwnProperty.call(body.data, "archived");
      if (!hasStatus && !hasNote && !hasArchived) {
        sendError(res, 422, "Provide a status, a follow-up note, or an archive flag");
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

      if (hasArchived) {
        const archived = body.data.archived;
        if (typeof archived !== "boolean") {
          sendError(res, 422, "archived must be a boolean");
          return;
        }
        update.$set = { ...update.$set, archived };
      }

      if (hasNote) {
        const note = cleanMultiline(body.data.note, 2000);
        if (note.length === 0) {
          sendError(res, 422, "note must not be empty");
          return;
        }
        update.$push = { notes: { id: randomUUID(), text: note, createdAt: now } };
      }

      const item = await col.findOneAndUpdate({ _id }, update, { returnDocument: "after" });
      if (!item) {
        sendError(res, 404, "Enquiry not found");
        return;
      }
      sendJson(res, 200, { ok: true, item: serializeEnquiry(item as EnquiryDoc) });
      return;
    }

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
    sendError(res, 500, "Unable to process enquiry");
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const segments = requestSegments(req);

  if (segments.length === 0) {
    await listEnquiries(req, res);
    return;
  }

  if (segments.length === 1 && segments[0] === "export") {
    await exportEnquiries(req, res);
    return;
  }

  if (segments.length === 1 && segments[0]) {
    await enquiryById(req, res, segments[0]);
    return;
  }

  sendError(res, 404, "Not found");
}
