import { useEffect } from "react";

interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

const SITE_URL = "https://www.yesbe.tech";
const DEFAULT_OG_IMAGE = `${SITE_URL}/YBlogo.png`;
const SITE_NAME = "YesBe Technologies";
const OG_LOCALE = "en_US";

function setOrUpdateMeta(
  attr: "name" | "property",
  value: string,
  content: string,
) {
  const selector =
    attr === "name"
      ? `meta[name="${value}"]`
      : `meta[property="${value}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setOrUpdateLink(rel: string, href: string) {
  let el = document.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage,
  ogType,
  noindex,
}: SEOData) {
  useEffect(() => {
    const url = canonical || SITE_URL;
    const image = ogImage || DEFAULT_OG_IMAGE;

    document.title = title;

    setOrUpdateMeta("name", "description", description);

    setOrUpdateMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    setOrUpdateMeta("property", "og:title", title);
    setOrUpdateMeta("property", "og:description", description);
    setOrUpdateMeta("property", "og:url", url);
    setOrUpdateMeta("property", "og:image", image);
    setOrUpdateMeta("property", "og:image:width", "1200");
    setOrUpdateMeta("property", "og:image:height", "630");
    setOrUpdateMeta("property", "og:image:alt", title);
    setOrUpdateMeta("property", "og:site_name", SITE_NAME);
    setOrUpdateMeta("property", "og:locale", OG_LOCALE);
    setOrUpdateMeta("property", "og:type", ogType || "website");

    setOrUpdateMeta("name", "twitter:card", "summary_large_image");
    setOrUpdateMeta("name", "twitter:url", url);
    setOrUpdateMeta("name", "twitter:title", title);
    setOrUpdateMeta("name", "twitter:description", description);
    setOrUpdateMeta("name", "twitter:image", image);
    setOrUpdateMeta("name", "twitter:image:alt", title);
    setOrUpdateMeta("name", "twitter:creator", "@yesbe");

    setOrUpdateLink("canonical", url);
  }, [title, description, canonical, ogImage, ogType, noindex]);
}
