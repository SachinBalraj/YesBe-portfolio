import { useEffect } from "react";

interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogType?: string;
  /** Overrides only the og:/twitter: description. Defaults to `description`. */
  ogDescription?: string;
  noindex?: boolean;
}

const SITE_URL = "https://www.yesbe.tech";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const SITE_NAME = "YESBE Technologies";
const OG_LOCALE = "en_IN";

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

function removeMeta(attr: "name" | "property", value: string) {
  document
    .querySelector(attr === "name" ? `meta[name="${value}"]` : `meta[property="${value}"]`)
    ?.remove();
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
  ogImageWidth,
  ogImageHeight,
  ogType,
  ogDescription,
  noindex,
}: SEOData) {
  useEffect(() => {
    const url = canonical || SITE_URL;
    const image = ogImage || DEFAULT_OG_IMAGE;
    const socialDescription = ogDescription || description;

    document.title = title;

    setOrUpdateMeta("name", "description", description);

    setOrUpdateMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    setOrUpdateMeta("property", "og:title", title);
    setOrUpdateMeta("property", "og:description", socialDescription);
    setOrUpdateMeta("property", "og:url", url);
    setOrUpdateMeta("property", "og:image", image);
    setOrUpdateMeta("property", "og:image:type", "image/png");
    setOrUpdateMeta("property", "og:image:alt", title);
    // Only declare dimensions we actually know. The default social card is
    // 1200x630; page-specific images (founder portrait, article covers) have
    // their own ratios, so callers may pass exact dimensions or omit them.
    const width = ogImageWidth ?? (!ogImage ? "1200" : undefined);
    const height = ogImageHeight ?? (!ogImage ? "630" : undefined);
    if (width) setOrUpdateMeta("property", "og:image:width", width);
    else removeMeta("property", "og:image:width");
    if (height) setOrUpdateMeta("property", "og:image:height", height);
    else removeMeta("property", "og:image:height");
    setOrUpdateMeta("property", "og:site_name", SITE_NAME);
    setOrUpdateMeta("property", "og:locale", OG_LOCALE);
    setOrUpdateMeta("property", "og:type", ogType || "website");

    setOrUpdateMeta("name", "twitter:card", "summary_large_image");
    setOrUpdateMeta("name", "twitter:url", url);
    setOrUpdateMeta("name", "twitter:title", title);
    setOrUpdateMeta("name", "twitter:description", socialDescription);
    setOrUpdateMeta("name", "twitter:image", image);
    setOrUpdateMeta("name", "twitter:image:alt", title);

    setOrUpdateLink("canonical", url);
  }, [title, description, canonical, ogImage, ogImageWidth, ogImageHeight, ogType, ogDescription, noindex]);
}
