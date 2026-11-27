import { ApiError } from "./enquiries";

export const ADMIN_UNAUTHORIZED_EVENT = "yesbe:admin-unauthorized";

export interface FollowUpNote {
  id: string;
  text: string;
  createdAt: string;
}

export type EnquiryStatus =
  | "New"
  | "Contacted"
  | "In Discussion"
  | "Proposal Sent"
  | "In Progress"
  | "Converted"
  | "Rejected"
  | "Closed";

export type EnquiryCategory = "consultation" | "service" | "industry" | "project" | "other";

export const ENQUIRY_STATUSES: EnquiryStatus[] = [
  "New",
  "Contacted",
  "In Discussion",
  "Proposal Sent",
  "In Progress",
  "Converted",
  "Rejected",
  "Closed",
];

export const ENQUIRY_CATEGORIES: EnquiryCategory[] = [
  "consultation",
  "service",
  "industry",
  "project",
  "other",
];

const LEGACY_STATUS_LABELS: Record<string, EnquiryStatus> = {
  Won: "Converted",
};

export function resolveStatus(value: string): EnquiryStatus {
  if ((ENQUIRY_STATUSES as string[]).includes(value)) return value as EnquiryStatus;
  return LEGACY_STATUS_LABELS[value] ?? "New";
}

export interface EnquiryRecord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  service: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  businessChallenges: string;
  goals: string;
  formType: string;
  pageSource: string;
  sourceCategory: EnquiryCategory;
  industry?: string;
  archived?: boolean;
  status: EnquiryStatus | string;
  notes?: FollowUpNote[];
  createdAt: string;
  updatedAt: string;
}

export interface EnquirySummary {
  total: number;
  new: number;
  today: number;
  monthly: number;
  contacted: number;
  inProgress: number;
  converted: number;
  closed: number;
  subscribers: number;
  counts: Partial<Record<EnquiryStatus, number>> & Record<string, number>;
}

export type EnquirySort = "createdAt" | "name" | "status" | "service" | "updatedAt";

export interface EnquiryListResponse {
  ok: true;
  items: EnquiryRecord[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  counts: Partial<Record<EnquiryStatus, number>> & Record<string, number>;
  services: string[];
  sort: EnquirySort;
  dir: "asc" | "desc";
  summary: EnquirySummary;
}

export interface EnquiryQuery {
  q?: string;
  status?: string;
  service?: string;
  category?: string;
  from?: string;
  to?: string;
  archived?: "active" | "archived" | "all" | string;
  ids?: string[];
  sort?: EnquirySort | string;
  dir?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface SubscriberRecord {
  _id: string;
  email: string;
  source: string;
  status?: "active" | "unsubscribed" | string;
  createdAt: string;
  unsubscribedAt?: string;
}

export interface SubscriberCounts {
  active: number;
  unsubscribed: number;
}

export interface SubscriberListResponse {
  ok: true;
  items: SubscriberRecord[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  counts?: SubscriberCounts;
}

export interface ClientRecord {
  name: string;
  email: string;
  phone: string;
  company: string;
  enquiryCount: number;
  latestStatus: EnquiryStatus | string;
  latestCreatedAt: string;
  lastUpdatedAt: string;
  categories: EnquiryCategory[] | string[];
  services: string[];
}

export interface ClientListResponse {
  ok: true;
  items: ClientRecord[];
  total?: number;
  page?: number;
  limit?: number;
  pages?: number;
}

export interface AdminSettingsResponse {
  ok: true;
  settings: Record<string, unknown>;
  [key: string]: unknown;
}

function isUnauthorized(path: string, status: number) {
  if (status === 401 && path !== "/api/admin/login" && typeof window !== "undefined") {
    window.dispatchEvent(new Event(ADMIN_UNAUTHORIZED_EVENT));
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      ...init,
      credentials: "same-origin",
      headers: {
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiError("Could not reach the server. Please try again.", 0);
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    // handled below
  }
  const data = (payload ?? {}) as { ok?: boolean; error?: string; fields?: { field: string; message: string }[] };

  if (!response.ok || data.ok === false) {
    isUnauthorized(path, response.status);
    throw new ApiError(data.error || "Request failed", response.status, data.fields ?? []);
  }
  return data as T;
}

function qs(params: Record<string, string | number | boolean | string[] | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "" || value === "all") continue;
    if (Array.isArray(value)) {
      for (const entry of value) search.append(key, String(entry));
      continue;
    }
    search.set(key, String(value));
  }
  const str = search.toString();
  return str ? `?${str}` : "";
}

async function downloadCsv(path: string, fallbackName: string): Promise<void> {
  let response: Response;
  try {
    response = await fetch(path, { credentials: "same-origin" });
  } catch {
    throw new ApiError("Could not reach the server. Please try again.", 0);
  }
  if (!response.ok) {
    isUnauthorized(path, response.status);
    let message = "Request failed";
    try {
      const data = (await response.json()) as { error?: string };
      message = data.error || message;
    } catch {
      // ignore
    }
    throw new ApiError(message, response.status);
  }
  const blob = await response.blob();
  const disposition = response.headers.get("content-disposition") || "";
  const match = disposition.match(/filename="?([^";]+)"?/i);
  const filename = match?.[1] || fallbackName;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function formatDateIst(iso: string | undefined | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(d);
}

export function checkSession(): Promise<{ ok: true; username: string }> {
  return request("/api/admin/session");
}

export function login(username: string, password: string): Promise<{ ok: true; username: string }> {
  return request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function logout(): Promise<{ ok: true }> {
  return request("/api/admin/logout", { method: "POST" });
}

export function listEnquiries(query: EnquiryQuery): Promise<EnquiryListResponse> {
  return request(`/api/admin/enquiries${qs({ ...query })}`);
}

export function getEnquiry(id: string): Promise<{ ok: true; item: EnquiryRecord }> {
  return request(`/api/admin/enquiries/${encodeURIComponent(id)}`);
}

export function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus,
): Promise<{ ok: true; item: EnquiryRecord }> {
  return request(`/api/admin/enquiries/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function updateEnquiry(
  id: string,
  patch: { status?: EnquiryStatus; note?: string; archived?: boolean },
): Promise<{ ok: true; item: EnquiryRecord }> {
  return request(`/api/admin/enquiries/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export function addEnquiryNote(
  id: string,
  note: string,
): Promise<{ ok: true; item: EnquiryRecord }> {
  return updateEnquiry(id, { note });
}

export function archiveEnquiry(
  id: string,
  archived: boolean,
): Promise<{ ok: true; item: EnquiryRecord }> {
  return updateEnquiry(id, { archived });
}

export function deleteEnquiry(id: string): Promise<{ ok: true; deletedId: string }> {
  return request(`/api/admin/enquiries/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export function exportEnquiries(query: EnquiryQuery = {}): Promise<void> {
  return downloadCsv(`/api/admin/enquiries/export${qs({ ...query })}`, "enquiries.csv");
}

export function listClients(query: { q?: string; page?: number; limit?: number } = {}): Promise<ClientListResponse> {
  return request(`/api/admin/clients${qs({ ...query })}`);
}

export function getAdminSettings(): Promise<AdminSettingsResponse> {
  return request("/api/admin/settings");
}

export function listSubscribers(
  q = "",
  status: "active" | "unsubscribed" | "all" | string = "all",
  page = 1,
  limit = 25,
): Promise<SubscriberListResponse> {
  return request(`/api/newsletter${qs({ q, status, page, limit })}`);
}

export function unsubscribeSubscriber(id: string): Promise<{ ok: true; item?: SubscriberRecord }> {
  return request("/api/newsletter/unsubscribe", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}

export function deleteSubscriber(id: string): Promise<{ ok: true; deletedId: string }> {
  return request(`/api/newsletter${qs({ id })}`, { method: "DELETE" });
}

export function exportSubscribers(q = "", status: "active" | "unsubscribed" | "all" | string = "all"): Promise<void> {
  return downloadCsv(`/api/newsletter/export${qs({ q, status })}`, "newsletter-subscribers.csv");
}
