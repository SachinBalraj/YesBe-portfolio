/**
 * Public enquiry API client.
 *
 * The form no longer opens WhatsApp: it POSTs to /api/enquiries and the
 * server responds only after the document is stored.
 */

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  designation?: string;
  service: string;
  budget?: string;
  timeline?: string;
  projectDescription: string;
  businessChallenges?: string;
  goals?: string;
  formType?: "contact" | "consultation" | "proposal" | "newsletter";
  pageSource?: string;
  /** Honeypot. Must stay empty. */
  company_website?: string;
}

export interface FieldError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly fields: FieldError[];

  constructor(message: string, status: number, fields: FieldError[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }

  /** Field name -> first message, for inline form errors. */
  get fieldMap(): Record<string, string> {
    const map: Record<string, string> = {};
    for (const f of this.fields) {
      if (!(f.field in map)) map[f.field] = f.message;
    }
    return map;
  }
}

/** Network-level failures, as opposed to an API error response. */
function networkError(): never {
  throw new ApiError(
    "Could not reach the server. Please check your connection and try again.",
    0,
  );
}

async function postJson<T>(url: string, body: unknown, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "same-origin",
      ...(signal ? { signal } : {}),
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    networkError();
  }

  return parse<T>(response);
}

async function parse<T>(response: Response): Promise<T> {
  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    // fall through — handled by the status check below
  }

  const data = (payload ?? {}) as {
    ok?: boolean;
    error?: string;
    message?: string;
    fields?: FieldError[];
  };

  if (!response.ok || data.ok === false) {
    throw new ApiError(
      data.error || "Something went wrong. Please try again.",
      response.status,
      Array.isArray(data.fields) ? data.fields : [],
    );
  }

  return data as T;
}

export interface SubmitResult {
  ok: true;
  message: string;
}

export function submitEnquiry(
  payload: EnquiryPayload,
  signal?: AbortSignal,
): Promise<SubmitResult> {
  return postJson<SubmitResult>("/api/enquiries", payload, signal);
}

export function subscribeNewsletter(
  email: string,
  source: string,
  companyWebsite = "",
  signal?: AbortSignal,
): Promise<SubmitResult> {
  return postJson<SubmitResult>(
    "/api/newsletter/subscribe",
    { email, source, company_website: companyWebsite },
    signal,
  );
}