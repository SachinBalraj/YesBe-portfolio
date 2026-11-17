import {
  getStoredPreferences,
  hasAnalyticsConsent,
  hasMarketingConsent,
  PREFS_KEY,
  STORAGE_KEY,
} from "@/components/common/consentStore";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    __yesbeGtmLoaded?: boolean;
  }
}

/**
 * Google Tag Manager container. GA4 is configured *inside* this container, so
 * there is deliberately no direct gtag.js loader anywhere in the app. Loading
 * gtag.js separately is what produced duplicate page views and double-counted
 * conversions, and a second GTM bootstrap also inflated every analytics hit.
 */
const GTM_ID = "GTM-PZ9KWVFH";

let listening = false;

function dataLayer(): unknown[] {
  window.dataLayer = window.dataLayer ?? [];
  return window.dataLayer;
}

function updateConsent(): void {
  const prefs = getStoredPreferences();
  dataLayer().push([
    "consent",
    "update",
    {
      analytics_storage: prefs.analytics ? "granted" : "denied",
      ad_storage: prefs.marketing ? "granted" : "denied",
      ad_user_data: prefs.marketing ? "granted" : "denied",
      ad_personalization: prefs.marketing ? "granted" : "denied",
    },
  ]);
}

/**
 * Loads the single GTM container, and only ever after analytics consent has
 * been granted. The `__yesbeGtmLoaded` flag makes the loader idempotent even
 * under React StrictMode, rapid consent toggles, or multiple tabs.
 */
function loadGtm(): void {
  if ((!hasAnalyticsConsent() && !hasMarketingConsent()) || window.__yesbeGtmLoaded) return;
  window.__yesbeGtmLoaded = true;

  const layer = dataLayer();
  window.gtag = (...args: unknown[]) => {
    layer.push(args);
  };
  updateConsent();
  layer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

function syncConsent(): void {
  if (hasAnalyticsConsent() || hasMarketingConsent()) {
    loadGtm();
  } else if (window.__yesbeGtmLoaded) {
    updateConsent();
  }
}

/**
 * Called once at boot. If consent was granted on a previous visit this starts
 * GTM immediately; otherwise it waits for the banner's consent event.
 */
export function initAnalytics(): void {
  if (listening) return;
  listening = true;

  loadGtm();

  window.addEventListener("cookie-consent-updated", syncConsent);
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY || event.key === PREFS_KEY) syncConsent();
  });
}

function push(event: string, params?: Record<string, string>): void {
  try {
    if (!hasAnalyticsConsent()) return;
    dataLayer().push({ event, ...params });
  } catch { /* tracking failures must never crash the app */ }
}

export function trackPageView(pagePath: string, pageTitle?: string) {
  push("page_view", { page_path: pagePath, page_title: pageTitle ?? document.title });
}

export function trackGenerateLead(
  location = "contact_form",
  params?: Record<string, string>,
) {
  push("generate_lead", { location, ...params });
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
