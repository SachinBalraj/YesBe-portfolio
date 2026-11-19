import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { CinematicHero } from "@/sections/phase2/CinematicHero";
import { CaseStudiesRail } from "@/sections/CaseStudiesRail";
import { Phase2HomeSections } from "@/sections/phase2/HomeSections";

export function HomePage() {
  useSEO({
    title: SEO_TITLES.home,
    description: SEO_DESCRIPTIONS.home,
    canonical: "https://www.yesbe.tech",
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
