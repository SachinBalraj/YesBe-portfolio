import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PremiumHero } from "@/components/sections/PremiumHero";

const TechnologyMarquee = lazy(() =>
  import("@/components/TechnologyMarquee").then((m) => ({ default: m.TechnologyMarquee }))
);
const CompanyIntroSection = lazy(() => import("@/sections/CompanyIntroSection").then(m => ({ default: m.CompanyIntroSection })));
const SolutionsSection = lazy(() => import("@/sections/SolutionsSection").then(m => ({ default: m.SolutionsSection })));
const IndustriesSection = lazy(() => import("@/sections/IndustriesSection").then(m => ({ default: m.IndustriesSection })));
const PortfolioSection = lazy(() => import("@/sections/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const DevelopmentProcessSection = lazy(() => import("@/sections/DevelopmentProcessSection").then(m => ({ default: m.DevelopmentProcessSection })));
const MiniGuidesSection = lazy(() => import("@/sections/MiniGuidesSection").then(m => ({ default: m.MiniGuidesSection })));
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
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <PremiumHero />
      <Suspense fallback={<div className="h-40" aria-hidden="true" />}>
        <TechnologyMarquee />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <CompanyIntroSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <SolutionsSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <IndustriesSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <DevelopmentProcessSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <MiniGuidesSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
