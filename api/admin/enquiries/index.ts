import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Filter } from "mongodb";
import {
  ConfigError,
  ENQUIRY_STATUSES,
  ensureIndexes,
  enquiries,
  resolveStoredStatus,
  statusFilterValues,
  subscribers,
  type EnquiryDoc,
  type EnquiryStatus,
} from "../../_lib/db.js";
import { requireAdmin } from "../../_lib/auth.js";
import { allowMethods, sendError, sendJson } from "../../_lib/http.js";
import { cleanText } from "../../_lib/validate.js";

const MAX_LIMIT = 100;

/** Escapes user input so it is treated as literal text inside a RegExp. */
function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function asString(value: unknown): string | undefined {
  if (Array.isArray(value)) return asString(value[0]);
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : undefined;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const SORT_FIELDS = ["createdAt", "name", "status", "service"] as const;
type SortField = (typeof SORT_FIELDS)[number];

function emptyCounts(): Record<EnquiryStatus, number> {
  return Object.fromEntries(ENQUIRY_STATUSES.map((s) => [s, 0])) as Record<EnquiryStatus, number>;
}

/** GET /api/admin/enquiries — admin only. Supports q, status, service, from, to, sort, dir, limit, page. */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!requireAdmin(req, res)) return;

  const q = req.query;
  const filter: Filter<EnquiryDoc> = {};

  const status = asString(q.status);
  if (status && status !== "all") {
    if (!(ENQUIRY_STATUSES as readonly string[]).includes(status)) {
      sendError(res, 400, "Unknown status filter");
      return;
    }
    // Canonical statuses include legacy stored values (e.g. "Won" counts as
    // Closed) so old records remain filterable without being rewritten.
    filter.status = { $in: statusFilterValues(status as EnquiryStatus) };
  }

  const service = asString(q.service);
  if (service && service !== "all") {
    // Exact match on the stored service value.
    filter.service = service;
  }

  const search = asString(q.q);
  if (search) {
    const rx = new RegExp(escapeRegex(cleanText(search, 80)), "i");
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { company: rx }];
  }

  const from = asString(q.from);
  const to = asString(q.to);
  if (from || to) {
    const range: { $gte?: Date; $lte?: Date } = {};
    if (from) {
      const d = new Date(from);
      if (Number.isNaN(d.getTime())) {
        sendError(res, 400, "Invalid 'from' date");
        return;
      }
      range.$gte = d;
    }
    if (to) {
      const d = new Date(to);
      if (Number.isNaN(d.getTime())) {
        sendError(res, 400, "Invalid 'to' date");
        return;
      }
      // Include the whole end day when a plain YYYY-MM-DD is supplied.
      if (/^\d{4}-\d{2}-\d{2}$/.test(to)) d.setUTCHours(23, 59, 59, 999);
      range.$lte = d;
    }
    filter.createdAt = range;
  }

  const sortRaw = (asString(q.sort) ?? "createdAt") as SortField;
  if (!SORT_FIELDS.includes(sortRaw)) {
    sendError(res, 400, "Invalid sort field");
    return;
  }
  const dirRaw = (asString(q.dir) ?? "desc").toLowerCase();
  if (dirRaw !== "asc" && dirRaw !== "desc") {
    sendError(res, 400, "Invalid sort direction");
    return;
  }
  const sortDirection = dirRaw === "asc" ? 1 : -1;
  // Always break ties by newest so pagination is stable.
  const sort: Record<string, 1 | -1> =
    sortRaw === "createdAt" ? { createdAt: sortDirection } : { [sortRaw]: sortDirection, createdAt: -1 };

  const limitRaw = Number(asString(q.limit) ?? "25");
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(Math.trunc(limitRaw), 1), MAX_LIMIT)
    : 25;
  const pageRaw = Number(asString(q.page) ?? "1");
  const page = Number.isFinite(pageRaw) ? Math.max(Math.trunc(pageRaw), 1) : 1;
  const skip = (page - 1) * limit;

  try {
    await ensureIndexes();
    const col = enquiries();

    const [items, total, statusCounts, summaryRows, summaryTotal, subscriberTotal, distinctServices] =
      await Promise.all([
        col.find(filter).sort(sort).skip(skip).limit(limit).toArray(),
        col.countDocuments(filter),
        col
          .aggregate<{ _id: string; count: number }>([
            { $match: filter },
            { $group: { _id: "$status", count: { $sum: 1 } } },
          ])
          .toArray(),
        col.aggregate<{ _id: string; count: number }>([
          { $group: { _id: "$status", count: { $sum: 1 } } },
        ]).toArray(),
        col.countDocuments({}),
        subscribers().countDocuments(),
        col.distinct("service"),
      ]);

    const counts = emptyCounts();
    for (const row of statusCounts) {
      counts[resolveStoredStatus(row._id)] += row.count;
    }

    // Dashboard summary is global: it must not change when the table is
    // searched or filtered. Unknown legacy values are bucketed by the same
    // resolver so the card totals always reconcile with the grand total.
    const summaryCounts = emptyCounts();
    for (const row of summaryRows) {
      summaryCounts[resolveStoredStatus(row._id)] += row.count;
    }

    sendJson(res, 200, {
      ok: true,
      items,
      total,
      page,
      limit,
      pages: Math.max(1, Math.ceil(total / limit)),
      counts,
      services: distinctServices.filter((s): s is string => typeof s === "string" && s.length > 0).sort(),
      sort: sortRaw,
      dir: dirRaw,
      summary: {
        total: summaryTotal,
        counts: summaryCounts,
        subscribers: subscriberTotal,
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
