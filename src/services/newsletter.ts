import { ApiError, subscribeNewsletter as post } from "./enquiries";

export interface NewsletterSubscribePayload {
  email: string;
  source?: string;
  /** Honeypot. Must stay empty. */
  companyWebsite?: string;
}

export interface NewsletterSubscribeResult {
  success: boolean;
  message: string;
  code?: string;
}

/**
 * Thin adapter that preserves the `{ success, message }` shape the existing
 * components expect, while the actual request, error typing and parsing are
 * shared with the enquiry form via @/services/enquiries.
 */
export async function subscribeNewsletter(
  payload: NewsletterSubscribePayload,
): Promise<NewsletterSubscribeResult> {
  try {
    const result = await post(
      payload.email.trim(),
      payload.source ?? currentPath(),
      payload.companyWebsite ?? "",
    );
    return { success: true, message: result.message };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        ...(error.status === 429 ? { code: "rate_limited" } : {}),
      };
    }
    return {
      success: false,
      message: "Unable to connect to the subscription service. Please try again later.",
    };
  }
}

function currentPath(): string {
  return typeof window === "undefined" ? "/" : window.location.pathname;
}