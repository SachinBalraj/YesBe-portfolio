import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Filter } from "mongodb";
import { requireAdmin } from "../_lib/auth.js";
import { asString, escapeRegex } from "../_lib/adminQuery.js";
import { ConfigError, ensureIndexes, subscribers, type SubscriberDoc } from "../_lib/db.js";
import { allowMethods, sendError } from "../_lib/http.js";
import { cleanText } from "../_lib/validate.js";
import { sendCsv } from "../_lib/csv.js";

const EXPORT_MAX_LIMIT = 10000;
const STATUS_VALUES = ["active", "unsubscribed", "all"] as const;
type StatusFilter = (typeof STATUS_VALUES)[number];

const HEADERS = ["ID", "Email", "Source", "Status", "Created At", "Unsubscribed At"];

function statusFilter(status: StatusFilter): Filter<SubscriberDoc> {
  if (status === "active") return { status: { $ne: "unsubscribed" } };
  if (status === "unsubscribed") return { status: "unsubscribed" };
  return {};
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!requireAdmin(req, res)) return;

  const statusRaw = asString(req.query.status) ?? "active";
  if (!STATUS_VALUES.includes(statusRaw as StatusFilter)) {
    sendError(res, 400, "Unknown subscriber status filter");
    return;
  }
  const filter = statusFilter(statusRaw as StatusFilter);

  const search = asString(req.query.q);
  if (search) {
    const escaped = escapeRegex(cleanText(search, 80));
    filter.email = new RegExp(escaped, "i");
  }

  const limitRaw = Number(asString(req.query.limit) ?? String(EXPORT_MAX_LIMIT));
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(Math.trunc(limitRaw), 1), EXPORT_MAX_LIMIT)
    : EXPORT_MAX_LIMIT;
  const pageRaw = Number(asString(req.query.page) ?? "1");
  const page = Number.isFinite(pageRaw) ? Math.max(Math.trunc(pageRaw), 1) : 1;

  try {
    await ensureIndexes();
    const items = await subscribers()
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const rows = items.map((item) => [
      item._id.toHexString(),
      item.email,
      item.source,
      item.status ?? "active",
      item.createdAt,
      item.unsubscribedAt ?? "",
    ]);

    sendCsv(res, `yesbe-subscribers-${new Date().toISOString().slice(0, 10)}`, HEADERS, rows);
  } catch (err) {
    if (err instanceof ConfigError) {
      sendError(res, 503, "Database is not configured");
      return;
    }
    console.error("[api/newsletter/export] failed", err);
    sendError(res, 500, "Unable to export subscribers");
  }
}
