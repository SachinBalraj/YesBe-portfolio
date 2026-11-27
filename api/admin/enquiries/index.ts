import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Filter } from "mongodb";
import {
  ConfigError,
  ENQUIRY_STATUSES,
  ensureIndexes,
  enquiries,
  resolveStoredStatus,
  serializeEnquiry,
  subscribers,
  type EnquiryStatus,
  type SubscriberDoc,
} from "../../_lib/db.js";
import { requireAdmin } from "../../_lib/auth.js";
import { allowMethods, sendError, sendJson } from "../../_lib/http.js";
import { parseAdminQuery } from "../../_lib/adminQuery.js";

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

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

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!requireAdmin(req, res)) return;

  const parsed = parseAdminQuery(req.query);
  if (!parsed.ok) {
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
      services: distinctServices.filter((s): s is string => typeof s === "string" && s.length > 0).sort(),
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
