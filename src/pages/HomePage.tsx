import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PremiumHero } from "@/components/sections/PremiumHero";
import { MarqueeSection } from "@/sections/MarqueeSection";

const WhyChooseSection = lazy(() => import("@/sections/WhyChooseSection").then(m => ({ default: m.WhyChooseSection })));
const SolutionsSection = lazy(() => import("@/sections/SolutionsSection").then(m => ({ default: m.SolutionsSection })));
const IndustriesSection = lazy(() => import("@/sections/IndustriesSection").then(m => ({ default: m.IndustriesSection })));
const PortfolioSection = lazy(() => import("@/sections/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const TrustedBrandsSection = lazy(() => import("@/sections/TrustedBrandsSection").then(m => ({ default: m.TrustedBrandsSection })));
const BusinessResultsSection = lazy(() => import("@/sections/BusinessResultsSection").then(m => ({ default: m.BusinessResultsSection })));
const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));

export function HomePage() {
  useSEO({
    title: "AI, ERP, Web Development & Business Solutions | YesBe",
    description: "YesBe helps startups, SMEs, and enterprises build AI-powered software, ERP systems, Power BI dashboards, and modern web applications. From strategy to deployment.",
    canonical: "https://yesbe.com",
  });

  return (
    <>
      <PremiumHero />
      <MarqueeSection />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <WhyChooseSection />
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
        <TrustedBrandsSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <BusinessResultsSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
