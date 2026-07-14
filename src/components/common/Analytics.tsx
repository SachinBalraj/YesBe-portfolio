import { useEffect } from "react";

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

export function Analytics() {
  useEffect(() => {
    if (!GA_ID || GA_ID === "G-XXXXXXXXXX") return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID, {
      send_page_view: false,
    });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
