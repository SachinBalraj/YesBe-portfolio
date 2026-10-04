import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const PortfolioSection = lazy(() => import("@/sections/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const BusinessResultsSection = lazy(() => import("@/sections/BusinessResultsSection").then(m => ({ default: m.BusinessResultsSection })));
const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));

export function CaseStudiesPage() {
  useSEO({
    title: SEO_TITLES.caseStudies,
    description: SEO_DESCRIPTIONS.caseStudies,
    canonical: "https://www.yesbe.tech/case-studies",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.caseStudies,
        description: SEO_DESCRIPTIONS.caseStudies,
        url: "https://www.yesbe.tech/case-studies",
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <Breadcrumbs items={[{ label: "Projects" }]} schemaOnly />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <PortfolioSection asH1 clearNavbar />
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
