import { useMemo } from "react";

type HeroImagePreloadOptions = {
  href: string;
  srcSet?: string;
  sizes?: string;
  type?: string;
  media?: string;
};

export function useHeroImagePreload({ href, srcSet, sizes, type, media }: HeroImagePreloadOptions) {
  useMemo(() => {
    if (typeof document === "undefined") return;
    const links = [...document.querySelectorAll<HTMLLinkElement>('link[rel="preload"][as="image"]')];
    const alreadyPreloaded = links.some(
      (link) =>
        ((link.getAttribute("href") === href) ||
          (srcSet && link.getAttribute("imagesrcset") === srcSet)) &&
        (link.media || "") === (media || ""),
    );
    if (alreadyPreloaded) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    link.setAttribute("fetchpriority", "high");
    if (srcSet) link.setAttribute("imagesrcset", srcSet);
    if (sizes) link.setAttribute("imagesizes", sizes);
    if (type) link.type = type;
    if (media) link.media = media;
    link.dataset.heroPreload = "true";
    document.head.appendChild(link);
  }, [href, srcSet, sizes, type, media]);
}
