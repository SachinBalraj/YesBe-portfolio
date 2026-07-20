import { useEffect } from "react";

interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const SITE_NAME = "YesBe";
const DEFAULT_URL = "https://yesbe.com";

export function useSEO({ title, description, canonical, ogImage }: SEOData) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr?: string) => {
      let el = attr
        ? (document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement)
        : (document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement);
      if (!el) {
        el = document.createElement("meta");
        if (attr) el.setAttribute(attr, name);
        else el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", "property");
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", fullTitle);
    setMeta("og:description", "property");
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    setMeta("og:type", "property");
    document.querySelector('meta[property="og:type"]')?.setAttribute("content", "website");
    setMeta("og:url", "property");
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonical || DEFAULT_URL);
    if (ogImage) {
      setMeta("og:image", "property");
      document.querySelector('meta[property="og:image"]')?.setAttribute("content", ogImage);
    }

    setMeta("twitter:card", "name");
    document.querySelector('meta[name="twitter:card"]')?.setAttribute("content", "summary_large_image");
    setMeta("twitter:title", "name");
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", fullTitle);
    setMeta("twitter:description", "name");
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonical || DEFAULT_URL);
  }, [title, description, canonical, ogImage]);
}
