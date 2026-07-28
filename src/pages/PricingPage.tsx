import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const PricingSection = lazy(() => import("@/sections/PricingSection").then(m => ({ default: m.PricingSection })));
const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));

export function PricingPage() {
  useSEO({
    title: SEO_TITLES.pricing,
    description: SEO_DESCRIPTIONS.pricing,
    canonical: "https://yebe.tech/pricing",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.pricing,
        description: SEO_DESCRIPTIONS.pricing,
        url: "https://yebe.tech/pricing",
        publisher: { "@type": "Organization", name: "YesBe", url: "https://yebe.tech" },
      }} />
      <div className="pt-[140px] lg:pt-[160px] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Pricing" }]} />
        </div>
      </div>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
