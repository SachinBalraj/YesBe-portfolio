import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";

const PricingSection = lazy(() => import("@/sections/PricingSection").then(m => ({ default: m.PricingSection })));
const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));

export function PricingPage() {
  useSEO({
    title: "Transparent Pricing — AI Solutions, ERP, Web Development, SEO & Consulting",
    description: "View transparent pricing for AI chatbots, business automation, ERP implementation, website development, Power BI dashboards, SEO, and consulting services at YesBe.",
    canonical: "https://yesbe.com/pricing",
  });

  return (
    <>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
