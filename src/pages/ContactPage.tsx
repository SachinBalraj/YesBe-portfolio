import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHeader } from "@/components/common/PageHeader";

const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));
const FAQSection = lazy(() => import("@/sections/FAQSection").then(m => ({ default: m.FAQSection })));

export function ContactPage() {
  useSEO({
    title: SEO_TITLES.contact,
    description: SEO_DESCRIPTIONS.contact,
    canonical: "https://yebe.tech/contact",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.contact,
        description: SEO_DESCRIPTIONS.contact,
        url: "https://yebe.tech/contact",
        publisher: { "@type": "Organization", name: "YesBe", url: "https://yebe.tech" },
      }} />
      <PageHeader
        badge="Contact Us"
        title="Get In"
        highlight="Touch"
        description="Ready to transform your business? Let's discuss your project and find the right solution together."
        breadcrumbs={[{ label: "Contact" }]}
      />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <FAQSection />
      </Suspense>
    </>
  );
}
