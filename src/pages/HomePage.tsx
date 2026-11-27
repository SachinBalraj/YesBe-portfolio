import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { CinematicHero } from "@/sections/phase2/CinematicHero";
import { CaseStudiesRail } from "@/sections/CaseStudiesRail";
import { Phase2HomeSections } from "@/sections/phase2/HomeSections";

const HOME_PREVIEW_IMAGE = "https://www.yesbe.tech/images/yesbe-home-preview-2026.jpg";
const HOME_PREVIEW_ALT =
  "YESBE Technologies homepage hero — We're a Future Builder; Your Next Big Idea Gets a yes with YesBe";

export function HomePage() {
  useSEO({
    title: SEO_TITLES.home,
    description: SEO_DESCRIPTIONS.home,
    canonical: "https://www.yesbe.tech",
    ogImage: HOME_PREVIEW_IMAGE,
    ogImageSecureUrl: HOME_PREVIEW_IMAGE,
    ogImageType: "image/jpeg",
    ogImageAlt: HOME_PREVIEW_ALT,
    ogImageWidth: "1200",
    ogImageHeight: "630",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.home,
        description: SEO_DESCRIPTIONS.home,
        url: "https://www.yesbe.tech",
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <CinematicHero />
      <CaseStudiesRail />
      <Phase2HomeSections />
    </>
  );
}
