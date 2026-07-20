import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PageHeader } from "@/components/common/PageHeader";

const PricingSection = lazy(() => import("@/sections/PricingSection").then(m => ({ default: m.PricingSection })));
const FAQSection = lazy(() => import("@/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));

export function PricingPage() {
  useSEO({
    title: "Pricing — AI Solutions, Web Development & ERP",
    description: "View transparent pricing for AI solutions, website development, ERP systems, data analytics, and digital marketing services at YesBe.",
    canonical: "https://yesbe.com/pricing",
  });

  return (
    <>
      <PageHeader
        badge="Pricing"
        title="Transparent"
        highlight="Pricing"
        description="Clear pricing for AI solutions, web development, ERP systems, and consulting."
      />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
