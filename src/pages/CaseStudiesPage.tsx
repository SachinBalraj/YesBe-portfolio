import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PageHeader } from "@/components/common/PageHeader";

const PortfolioSection = lazy(() => import("@/sections/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const BusinessResultsSection = lazy(() => import("@/sections/BusinessResultsSection").then(m => ({ default: m.BusinessResultsSection })));
const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));

export function CaseStudiesPage() {
  useSEO({
    title: "Case Studies — AI, ERP & Web Development Projects",
    description: "See real-world case studies of AI, ERP, web development, and automation projects delivered by YesBe for startups, SMEs, and enterprises.",
    canonical: "https://yesbe.com/case-studies",
  });

  return (
    <>
      <PageHeader
        badge="Case Studies"
        title="Our"
        highlight="Case Studies"
        description="Real results from AI, ERP, web development, and automation projects."
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
