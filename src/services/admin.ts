import { ApiError } from "./enquiries";

/**
 * Admin API client. Every request here is authorised server-side by the
 * httpOnly session cookie — there is no token in JS, so the frontend cannot
 * forge admin access. A 401 means the session expired and the UI must send the
 * operator back to the login screen.
 */

export interface FollowUpNote {
  id: string;
  text: string;
  createdAt: string;
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
  status: EnquiryStatus;
  notes?: FollowUpNote[];
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Closed";

export const ENQUIRY_STATUSES: EnquiryStatus[] = [
  "New",
  "Contacted",
  "In Progress",
  "Closed",
];

/**
 * Documents written by older versions keep their stored status. They are
 * displayed under the equivalent current pipeline value so no client data is
 * rewritten or lost.
 */
const LEGACY_STATUS_LABELS: Record<string, EnquiryStatus> = {
  "In Discussion": "In Progress",
  "Proposal Sent": "In Progress",
  Won: "Closed",
  Converted: "Closed",
};

export function resolveStatus(value: string): EnquiryStatus {
  if ((ENQUIRY_STATUSES as string[]).includes(value)) return value as EnquiryStatus;
  return LEGACY_STATUS_LABELS[value] ?? "New";
}

export interface SubscriberRecord {
  _id: string;
  email: string;
  source: string;
  createdAt: string;
}

export interface EnquirySummary {
  total: number;
  counts: Record<EnquiryStatus, number>;
  subscribers: number;
}

export interface EnquiryListResponse {
  ok: true;
  items: EnquiryRecord[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  counts: Partial<Record<EnquiryStatus, number>>;
  services: string[];
  sort: EnquirySort;
  dir: "asc" | "desc";
  summary: EnquirySummary;
}

export type EnquirySort = "createdAt" | "name" | "status" | "service";

export interface SubscriberListResponse {
  ok: true;
  items: SubscriberRecord[];
  total: number;
  page: number;
  limit: number;
  pages: number;
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
    throw new ApiError(data.error || "Request failed", response.status, data.fields ?? []);
  }
  return data as T;
}

function qs(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "" && value !== "all") search.set(key, String(value));
  }
  const str = search.toString();
  return str ? `?${str}` : "";
}

export function checkSession(): Promise<{ ok: true; email: string }> {
  return request("/api/admin/session");
}

export function login(email: string, password: string): Promise<{ ok: true; email: string }> {
  return request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logout(): Promise<{ ok: true }> {
  return request("/api/admin/logout", { method: "POST" });
}

export interface EnquiryQuery {
  q?: string;
  status?: string;
  service?: string;
  from?: string;
  to?: string;
  sort?: EnquirySort;
  dir?: "asc" | "desc";
  limit?: number;
  page?: number;
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

export function addEnquiryNote(
  id: string,
  note: string,
): Promise<{ ok: true; item: EnquiryRecord }> {
  return request(`/api/admin/enquiries/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ note }),
  });
}

export function deleteEnquiry(id: string): Promise<{ ok: true; deletedId: string }> {
  return request(`/api/admin/enquiries/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export function listSubscribers(
  q: string,
  page = 1,
  limit = 25,
): Promise<SubscriberListResponse> {
  return request(`/api/newsletter${qs({ q, page, limit })}`);
}

export function deleteSubscriber(id: string): Promise<{ ok: true; deletedId: string }> {
  return request(`/api/newsletter${qs({ id })}`, { method: "DELETE" });
}