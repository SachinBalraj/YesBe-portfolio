/**
 * Shared option labels for the consultation form and the admin dashboard.
 * Stored values stay as short codes (e.g. "ai", "under-25k") so existing
 * records and filters keep working; these maps are display-only.
 */

export const SERVICE_LABELS: Record<string, string> = {
  ai: "AI Solutions",
  web: "Website Development",
  erp: "ERP Solutions",
  powerbi: "Power BI Dashboard",
  analytics: "Data Analytics",
  cloud: "Cloud & DevOps",
  seo: "SEO / Digital Marketing",
  software: "Custom Software",
  consulting: "Business Consulting",
  other: "Other",
};

export const BUDGET_LABELS: Record<string, string> = {
  "under-25k": "Under ₹25,000",
  "25k-50k": "₹25,000 – ₹50,000",
  "50k-1l": "₹50,000 – ₹1 Lakh",
  "1l-5l": "₹1 Lakh – ₹5 Lakhs",
  "5l+": "₹5 Lakhs+",
  flexible: "Flexible / To be discussed",
};

export const TIMELINE_LABELS: Record<string, string> = {
  urgent: "Urgent (1–2 weeks)",
  "1month": "Within 1 month",
  "3months": "Within 3 months",
  "6months": "Within 6 months",
  flexible: "Flexible",
};

/** Returns the readable label for a stored code, or the code itself. */
export function optionLabel(value: string, options: Record<string, string>): string {
  if (!value) return "—";
  return options[value] ?? value;
}
