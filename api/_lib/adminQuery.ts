import type { VercelRequest } from "@vercel/node";
import { ObjectId, type Filter } from "mongodb";
import {
  ENQUIRY_CATEGORIES,
  ENQUIRY_FORM_TYPES,
  ENQUIRY_STATUSES,
  statusFilterValues,
  type EnquiryCategory,
  type EnquiryDoc,
  type EnquiryStatus,
  type EnquiryFormType,
} from "./db.js";
import { cleanText } from "./validate.js";

export type ArchivedMode = "active" | "all" | "archived";
type SortField = "createdAt" | "name" | "status" | "service" | "updatedAt";

const SORT_FIELDS: readonly SortField[] = ["createdAt", "name", "status", "service", "updatedAt"];
const ARCHIVED_MODES: readonly ArchivedMode[] = ["active", "all", "archived"];
const SERVICE_SOURCE = /^\/services\//;
const INDUSTRY_SOURCE = /^\/industries\//;
const PROJECT_SOURCE = /^\/case-studies\//;
const ANY_CATEGORY_SOURCE = /^\/(services|industries|case-studies)\//;
const SERVICE_FORM_TYPES: EnquiryFormType[] = ["service", "ai-automation", "blockchain", "proposal"];

export interface AdminQuery {
  filter: Filter<EnquiryDoc>;
  sort: Record<string, 1 | -1>;
  sortField: SortField;
  dir: "asc" | "desc";
  limit: number;
  page: number;
  skip: number;
  status: EnquiryStatus | "all";
  category: EnquiryCategory | "all";
  archived: ArchivedMode;
  ids: string[];
}

export type AdminQueryResult =
  | ({ ok: true } & AdminQuery)
  | { ok: false; status: number; error: string };

export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function asString(value: unknown): string | undefined {
  if (Array.isArray(value)) return asString(value[0]);
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : undefined;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function idList(value: unknown): string[] {
  const raw = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : [];
  return raw
    .map((entry) => asString(entry))
    .filter((entry): entry is string => Boolean(entry));
}

function parseDate(value: string): Date | null {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const d = new Date(`${value}T00:00:00.000Z`);
    return Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== value ? null : d;
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function categoryExpression(category: EnquiryCategory): Filter<EnquiryDoc> {
  switch (category) {
    case "consultation":
      return {
        $or: [
          { formType: "consultation" },
          { formType: "contact", pageSource: { $not: ANY_CATEGORY_SOURCE } },
        ],
      };
    case "service":
      return {
        $or: [
          { formType: { $in: SERVICE_FORM_TYPES } },
          { formType: "contact", pageSource: SERVICE_SOURCE },
        ],
      };
    case "industry":
      return {
        $or: [
          { formType: "industry" },
          { formType: "contact", pageSource: INDUSTRY_SOURCE },
        ],
      };
    case "project":
      return {
        $or: [
          { formType: "project" },
          { formType: "contact", pageSource: PROJECT_SOURCE },
        ],
      };
    case "other":
      return {
        $or: [
          { formType: "newsletter" },
          {
            formType: {
              $nin: ENQUIRY_FORM_TYPES.filter((type) => type !== "newsletter"),
            },
          },
        ],
      };
  }
}

export function parseAdminQuery(
  query: VercelRequest["query"],
  maxLimit = 100,
  defaultLimit = 25,
): AdminQueryResult {
  const filter: Filter<EnquiryDoc> = {};
  const conditions: Filter<EnquiryDoc>[] = [];

  const statusRaw = asString(query.status) ?? "all";
  if (statusRaw !== "all") {
    if (!(ENQUIRY_STATUSES as readonly string[]).includes(statusRaw)) {
      return { ok: false, status: 400, error: "Unknown status filter" };
    }
    const status = statusRaw as EnquiryStatus;
    filter.status = { $in: statusFilterValues(status) };
  }

  const categoryRaw = asString(query.category) ?? "all";
  if (categoryRaw !== "all") {
    if (!(ENQUIRY_CATEGORIES as readonly string[]).includes(categoryRaw)) {
      return { ok: false, status: 400, error: "Unknown category filter" };
    }
    conditions.push(categoryExpression(categoryRaw as EnquiryCategory));
  }

  const ids = idList(query.ids);
  if (ids.length > 1000) {
    return { ok: false, status: 400, error: "Too many enquiry ids" };
  }
  if (ids.length > 0) {
    const objectIds: ObjectId[] = [];
    for (const id of ids) {
      if (!/^[a-f0-9]{24}$/i.test(id)) {
        return { ok: false, status: 400, error: "Invalid enquiry id" };
      }
      objectIds.push(new ObjectId(id));
    }
    conditions.push({ _id: { $in: objectIds } });
  }

  const service = asString(query.service);
  if (service && service !== "all") {
    filter.service = service;
  }

  const search = asString(query.q);
  if (search) {
    const rx = new RegExp(escapeRegex(cleanText(search, 80)), "i");
    conditions.push({ $or: [{ name: rx }, { email: rx }, { phone: rx }, { company: rx }] });
  }

  const from = asString(query.from);
  const to = asString(query.to);
  if (from || to) {
    const range: { $gte?: Date; $lte?: Date } = {};
    if (from) {
      const d = parseDate(from);
      if (!d) return { ok: false, status: 400, error: "Invalid 'from' date" };
      range.$gte = d;
    }
    if (to) {
      const d = parseDate(to);
      if (!d) return { ok: false, status: 400, error: "Invalid 'to' date" };
      if (/^\d{4}-\d{2}-\d{2}$/.test(to)) d.setUTCHours(23, 59, 59, 999);
      range.$lte = d;
    }
    filter.createdAt = range;
  }

  const archivedRaw = asString(query.archived) ?? "active";
  if (!ARCHIVED_MODES.includes(archivedRaw as ArchivedMode)) {
    return { ok: false, status: 400, error: "Unknown archived filter" };
  }
  const archived = archivedRaw as ArchivedMode;
  if (archived === "active") filter.archived = { $ne: true };
  if (archived === "archived") filter.archived = true;

  const sortRaw = asString(query.sort) ?? "createdAt";
  if (!SORT_FIELDS.includes(sortRaw as SortField)) {
    return { ok: false, status: 400, error: "Invalid sort field" };
  }
  const sortField = sortRaw as SortField;

  const dirRaw = (asString(query.dir) ?? "desc").toLowerCase();
  if (dirRaw !== "asc" && dirRaw !== "desc") {
    return { ok: false, status: 400, error: "Invalid sort direction" };
  }
  const direction = dirRaw === "asc" ? 1 : -1;
  const sort: Record<string, 1 | -1> =
    sortField === "createdAt"
      ? { createdAt: direction }
      : { [sortField]: direction, createdAt: -1 };

  const limitRaw = Number(asString(query.limit) ?? String(defaultLimit));
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(Math.trunc(limitRaw), 1), maxLimit)
    : defaultLimit;
  const pageRaw = Number(asString(query.page) ?? "1");
  const page = Number.isFinite(pageRaw) ? Math.max(Math.trunc(pageRaw), 1) : 1;

  if (conditions.length > 0) filter.$and = conditions;

  return {
    ok: true,
    filter,
    sort,
    sortField,
    dir: dirRaw,
    limit,
    page,
    skip: (page - 1) * limit,
    status: statusRaw === "all" ? "all" : (statusRaw as EnquiryStatus),
    category: categoryRaw === "all" ? "all" : (categoryRaw as EnquiryCategory),
    archived,
    ids,
  };
}
