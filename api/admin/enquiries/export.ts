import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "../../_lib/auth.js";
import { parseAdminQuery } from "../../_lib/adminQuery.js";
import { ConfigError, ensureIndexes, enquiries, serializeEnquiry } from "../../_lib/db.js";
import { allowMethods, sendError } from "../../_lib/http.js";
import { sendCsv } from "../../_lib/csv.js";

const EXPORT_MAX_LIMIT = 10000;

const HEADERS = [
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

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!requireAdmin(req, res)) return;

  const parsed = parseAdminQuery(req.query, EXPORT_MAX_LIMIT, EXPORT_MAX_LIMIT);
  if (!parsed.ok) {
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

    sendCsv(res, `yesbe-enquiries-${new Date().toISOString().slice(0, 10)}`, HEADERS, rows);
  } catch (err) {
    if (err instanceof ConfigError) {
      sendError(res, 503, "Database is not configured");
      return;
    }
    console.error("[api/admin/enquiries/export] failed", err);
    sendError(res, 500, "Unable to export enquiries");
  }
}
