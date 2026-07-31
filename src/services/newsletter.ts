export interface NewsletterSubscribePayload {
  email: string;
  source?: string;
}

export interface NewsletterSubscribeResult {
  success: boolean;
  message: string;
  code?: string;
}

const API_ENDPOINT = import.meta.env.VITE_NEWSLETTER_API_URL || "/api/newsletter/subscribe";

export async function subscribeNewsletter(
  payload: NewsletterSubscribePayload,
): Promise<NewsletterSubscribeResult> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const json = await response.json().catch(() => null);
      if (response.status === 409) {
        return {
          success: false,
          message: json?.message || "You are already subscribed.",
          code: "already_subscribed",
        };
      }
      return {
        success: false,
        message: json?.message || "Something went wrong. Please try again.",
      };
    }

    const data = await response.json().catch(() => null);
    return {
      success: true,
      message: data?.message || "Thank you for subscribing!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        "Unable to connect to the subscription service. Please try again later.",
    };
  }
}
