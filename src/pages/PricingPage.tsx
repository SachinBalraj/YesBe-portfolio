import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHeader } from "@/components/common/PageHeader";

const PricingSection = lazy(() => import("@/sections/PricingSection").then(m => ({ default: m.PricingSection })));
const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));

export function PricingPage() {
  useSEO({
    title: SEO_TITLES.pricing,
    description: SEO_DESCRIPTIONS.pricing,
    canonical: "https://www.yesbe.tech/pricing",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.pricing,
        description: SEO_DESCRIPTIONS.pricing,
        url: "https://www.yesbe.tech/pricing",
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <PageHeader
        badge="Pricing"
        title="Transparent"
        highlight="Pricing"
        description="Affordable technology services for AI, ERP, web development, Power BI, SEO and automation — choose the plan that fits your business."
        breadcrumbs={[{ label: "Pricing" }]}
      />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <PricingSection />
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
