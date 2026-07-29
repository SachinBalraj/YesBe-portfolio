import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getStoredConsent, getStoredPreferences } from "./CookieConsent";

const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

let initialized = false;

function isGTMReady(): boolean {
  return !!(
    GTM_ID &&
    GTM_ID !== "GTM-XXXXXXXXXX" &&
    GTM_ID.startsWith("GTM-")
  );
}

function initGTM() {
  if (initialized || !isGTMReady()) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  script.id = "gtm-script";
  document.head.appendChild(script);

  const noscript = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
}

function removeGTM() {
  initialized = false;

  const script = document.getElementById("gtm-script");
  if (script) script.remove();

  const noscript = document.querySelector(
    "noscript iframe[src*='googletagmanager.com']"
  );
  if (noscript && noscript.parentElement) {
    noscript.parentElement.remove();
  }
}

function pushEvent(event: string, data?: Record<string, unknown>) {
  if (
    !import.meta.env.PROD ||
    !isGTMReady() ||
    !window.dataLayer
  )
    return;
  window.dataLayer.push({ event, ...data });
}

export function GTM() {
  const location = useLocation();
  const lastPath = useRef("");

  useEffect(() => {
    const consent = getStoredConsent();
    const prefs = getStoredPreferences();

    const shouldTrack = import.meta.env.PROD && isGTMReady();

    if (
      shouldTrack &&
      (consent === "all" || (consent && prefs.analytics))
    ) {
      initGTM();
    }

    const handleConsent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!import.meta.env.PROD || !isGTMReady()) return;
      if (
        detail.level === "all" ||
        detail.preferences?.analytics
      ) {
        initGTM();
        pushPageView();
      } else {
        removeGTM();
      }
    };

    window.addEventListener("cookie-consent-updated", handleConsent);
    return () => {
      window.removeEventListener(
        "cookie-consent-updated",
        handleConsent
      );
    };
  }, []);

  useEffect(() => {
    const path = location.pathname + location.search;
    if (path === lastPath.current) return;
    lastPath.current = path;

    if (!import.meta.env.PROD || !isGTMReady() || !initialized)
      return;

    const consent = getStoredConsent();
    const prefs = getStoredPreferences();
    if (consent !== "all" && (!consent || !prefs.analytics))
      return;

    pushPageView();
  }, [location]);

  return null;
}

/* ─── Helper functions ─── */

export function pushPageView() {
  pushEvent("page_view", {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function pushButtonClick(
  buttonName: string,
  label?: string
) {
  pushEvent("button_click", {
    button_name: buttonName,
    button_label: label || buttonName,
  });
}

export function pushFormSubmit(
  formData?: Record<string, string>
) {
  pushEvent("contact_form_submit", {
    form_type: formData?.type || "enquiry",
    ...formData,
  });
}

export function pushConsultationClick(
  consultationData?: Record<string, string>
) {
  pushEvent("consultation_booking", {
    consultation_type: consultationData?.type || "free",
    ...consultationData,
  });
}
