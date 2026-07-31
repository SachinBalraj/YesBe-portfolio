import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PremiumHero } from "@/components/sections/PremiumHero";
import { TechnologyMarquee } from "@/components/TechnologyMarquee";

const WhyChooseSection = lazy(() => import("@/sections/WhyChooseSection").then(m => ({ default: m.WhyChooseSection })));
const SolutionsSection = lazy(() => import("@/sections/SolutionsSection").then(m => ({ default: m.SolutionsSection })));
const IndustriesSection = lazy(() => import("@/sections/IndustriesSection").then(m => ({ default: m.IndustriesSection })));
const PortfolioSection = lazy(() => import("@/sections/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const BusinessResultsSection = lazy(() => import("@/sections/BusinessResultsSection").then(m => ({ default: m.BusinessResultsSection })));
const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));

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
        publisher: { "@type": "Organization", name: "YesBe", url: "https://www.yesbe.tech" },
      }} />
      <PremiumHero />
      <TechnologyMarquee />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <WhyChooseSection />
        </div>
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <SolutionsSection />
        </div>
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <IndustriesSection />
        </div>
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <PortfolioSection />
        </div>
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <BusinessResultsSection />
        </div>
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <ContactSection />
        </div>
      </Suspense>
    </>
  );
}
