import { useEffect } from "react";
import { getStoredConsent, getStoredPreferences } from "./CookieConsent";

const GA_ID = import.meta.env.VITE_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function loadGA() {
  if (!GA_ID || GA_ID === "G-XXXXXXXXXX") return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.id = "ga-script";
  document.head.appendChild(script);

  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, {
    send_page_view: false,
    cookie_flags: "SameSite=None;Secure",
  });
}

function removeGA() {
  const script = document.getElementById("ga-script");
  if (script) script.remove();
  if (window.dataLayer) window.dataLayer.length = 0;
}

export function Analytics() {
  useEffect(() => {
    const consent = getStoredConsent();
    const prefs = getStoredPreferences();

    if (consent === "all" || (consent && prefs.analytics)) {
      loadGA();
    }

    const handleConsent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.level === "all" || detail.preferences?.analytics) {
        loadGA();
      } else {
        removeGA();
      }
    };

    window.addEventListener("cookie-consent-updated", handleConsent);
    return () => {
      window.removeEventListener("cookie-consent-updated", handleConsent);
    };
  }, []);

  return null;
}
