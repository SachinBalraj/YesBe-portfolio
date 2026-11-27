import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Filter, WithId } from "mongodb";
import { requireAdmin } from "../_lib/auth.js";
import { asString, escapeRegex } from "../_lib/adminQuery.js";
import {
  ConfigError,
  ENQUIRY_CATEGORIES,
  ensureIndexes,
  enquiries,
  resolveEnquiryCategory,
  resolveStoredStatus,
  type EnquiryCategory,
  type EnquiryDoc,
  type EnquiryStatus,
} from "../_lib/db.js";
import { allowMethods, sendError, sendJson } from "../_lib/http.js";
import { cleanText } from "../_lib/validate.js";

const MAX_LIMIT = 100;
const FETCH_CAP = 10000;

interface ClientRecord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  enquiryCount: number;
  latestStatus: EnquiryStatus;
  latestCreatedAt: string;
  lastUpdatedAt: string;
  categories: EnquiryCategory[];
  services: string[];
}

function iso(value: unknown): string {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "" : d.toISOString();
  }
  return "";
}

function pick(docs: WithId<EnquiryDoc>[], field: "name" | "email" | "phone" | "company"): string {
  for (const doc of docs) {
    const value = doc[field];
    if (typeof value === "string" && value.trim().length > 0) return value;
  }
  return "";
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!requireAdmin(req, res)) return;

  const filter: Filter<EnquiryDoc> = { archived: { $ne: true } };
  const search = asString(req.query.q);
  if (search) {
    const rx = new RegExp(escapeRegex(cleanText(search, 80)), "i");
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { company: rx }];
  }

  const limitRaw = Number(asString(req.query.limit) ?? String(MAX_LIMIT));
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(Math.trunc(limitRaw), 1), MAX_LIMIT)
    : MAX_LIMIT;
  const pageRaw = Number(asString(req.query.page) ?? "1");
  const page = Number.isFinite(pageRaw) ? Math.max(Math.trunc(pageRaw), 1) : 1;

  try {
    await ensureIndexes();
    const docs = await enquiries()
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(FETCH_CAP)
      .toArray();

    const groups = new Map<string, WithId<EnquiryDoc>[]>();
    for (const doc of docs) {
      const key = doc.email?.trim().toLowerCase() || doc.phone?.trim() || doc._id.toHexString();
      const bucket = groups.get(key) ?? [];
      bucket.push(doc);
      groups.set(key, bucket);
    }

    const items: ClientRecord[] = [];
    for (const [key, bucket] of groups) {
      const latest = bucket[0]!;
      const found = new Set(bucket.map((doc) => resolveEnquiryCategory(doc)));
      let lastUpdated = 0;
      for (const doc of bucket) {
        const time = new Date(doc.updatedAt).getTime();
        if (Number.isFinite(time) && time > lastUpdated) lastUpdated = time;
      }

      items.push({
        _id: key,
        name: pick(bucket, "name"),
        email: pick(bucket, "email"),
        phone: pick(bucket, "phone"),
        company: pick(bucket, "company"),
        enquiryCount: bucket.length,
        latestStatus: resolveStoredStatus(String(latest.status ?? "New")),
        latestCreatedAt: iso(latest.createdAt),
        lastUpdatedAt: lastUpdated > 0 ? new Date(lastUpdated).toISOString() : iso(latest.updatedAt),
        categories: ENQUIRY_CATEGORIES.filter((category) => found.has(category)),
        services: [
          ...new Set(
            bucket
              .map((doc) => doc.service)
              .filter((service): service is string => typeof service === "string" && service.trim().length > 0),
          ),
        ],
      });
    }

    sendJson(res, 200, {
      ok: true,
      items: items.slice((page - 1) * limit, page * limit),
      total: items.length,
    });
  } catch (err) {
    if (err instanceof ConfigError) {
      sendError(res, 503, "Database is not configured");
      return;
    }
    console.error("[api/admin/clients] failed", err);
    sendError(res, 500, "Unable to load clients");
  }
}
