import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getStoredConsent, getStoredPreferences } from "./consentStore";

/**
 * Google Analytics 4 Measurement ID
 * Set VITE_GA_MEASUREMENT_ID in your .env file:
 *   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function isGAReady(): boolean {
  return !!(MEASUREMENT_ID && MEASUREMENT_ID !== "G-XXXXXXXXXX" && MEASUREMENT_ID.startsWith("G-"));
}

function initGA() {
  if (initialized || !isGAReady()) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.id = "ga-script";
  document.head.appendChild(script);

  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
    cookie_flags: "SameSite=None;Secure",
  });
}

function removeGA() {
  initialized = false;
  const script = document.getElementById("ga-script");
  if (script) script.remove();
  if (window.dataLayer) window.dataLayer.length = 0;
}

function trackPageView(path: string) {
  if (!isGAReady() || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function Analytics() {
  const location = useLocation();
  const lastPath = useRef("");

  useEffect(() => {
    try {
      const consent = getStoredConsent();
      const prefs = getStoredPreferences();

      const shouldTrack = import.meta.env.PROD && isGAReady();

      if (shouldTrack && (consent === "all" || (consent && prefs.analytics))) {
        initGA();
      }

      const handleConsent = (e: Event) => {
        try {
          const detail = (e as CustomEvent).detail;
          if (!import.meta.env.PROD || !isGAReady()) return;
          if (detail.level === "all" || detail.preferences?.analytics) {
            initGA();
            trackPageView(location.pathname + location.search);
          } else {
            removeGA();
          }
        } catch { /* analytics failures must never crash the app */ }
      };

      window.addEventListener("cookie-consent-updated", handleConsent);
      return () => {
        window.removeEventListener("cookie-consent-updated", handleConsent);
      };
    } catch { /* analytics failures must never crash the app */ return undefined; }
  }, []);

  useEffect(() => {
    try {
      const path = location.pathname + location.search;
      if (path === lastPath.current) return;
      lastPath.current = path;

      if (!import.meta.env.PROD || !isGAReady() || !initialized) return;

      const consent = getStoredConsent();
      const prefs = getStoredPreferences();
      if (consent !== "all" && (!consent || !prefs.analytics)) return;

      trackPageView(path);
    } catch { /* analytics failures must never crash the app */ }
  }, [location]);

  return null;
}

/* ─── Helper functions ─── */

export function trackButtonClick(buttonName: string, label?: string) {
  try {
    if (!import.meta.env.PROD || !isGAReady() || !window.gtag) return;
    window.gtag("event", "button_click", {
      button_name: buttonName,
      button_label: label || buttonName,
    });
  } catch { /* tracking failures must never crash the app */ }
}

export function trackContactFormSubmit(formData?: Record<string, string>) {
  try {
    if (!import.meta.env.PROD || !isGAReady() || !window.gtag) return;
    window.gtag("event", "contact_form_submit", {
      form_type: formData?.type || "enquiry",
      ...formData,
    });
  } catch { /* tracking failures must never crash the app */ }
}

export function trackConsultationBooking(consultationData?: Record<string, string>) {
  try {
    if (!import.meta.env.PROD || !isGAReady() || !window.gtag) return;
    window.gtag("event", "consultation_booking", {
      consultation_type: consultationData?.type || "free",
      ...consultationData,
    });
  } catch { /* tracking failures must never crash the app */ }
}
