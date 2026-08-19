declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const fired = new Set<string>();

function push(event: string, params?: Record<string, string>) {
  if (fired.has(event)) return;
  fired.add(event);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function trackGenerateLead(location = "contact_form") {
  push("generate_lead", { location });
}

export function trackContactClick(location = "link") {
  push(`contact_click:${location}`, { event: "contact_click", location });
}

export function trackPhoneClick(location = "link") {
  push(`phone_click:${location}`, { event: "phone_click", location });
}

export function trackWhatsAppClick(location = "link") {
  push(`whatsapp_click:${location}`, { event: "whatsapp_click", location });
}

export function trackConsultationClick(location = "cta") {
  push(`consultation_click:${location}`, { event: "consultation_click", location });
}

export function trackPricingClick(plan?: string) {
  push(`pricing_click:${plan || "cta"}`, { event: "pricing_click", plan: plan || "" });
}
