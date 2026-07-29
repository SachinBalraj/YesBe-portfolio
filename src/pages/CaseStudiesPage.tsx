import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHeader } from "@/components/common/PageHeader";

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
        publisher: { "@type": "Organization", name: "YesBe", url: "https://www.yesbe.tech" },
      }} />
      <PageHeader
        badge="Case Studies"
        title="Our"
        highlight="Case Studies"
        description="Real results from AI, ERP, web development, and automation projects."
        breadcrumbs={[{ label: "Case Studies" }]}
      />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <PortfolioSection />
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
