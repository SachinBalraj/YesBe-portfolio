import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PageHeader } from "@/components/common/PageHeader";

const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));
const FAQSection = lazy(() => import("@/sections/FAQSection").then(m => ({ default: m.FAQSection })));

export function ContactPage() {
  useSEO({
    title: "Contact Us — Get a Free Consultation",
    description: "Contact YesBe for AI solutions, ERP systems, web development, and business consulting. Book a free consultation today.",
    canonical: "https://yesbe.com/contact",
  });

  return (
    <>
      <PageHeader
        badge="Contact Us"
        title="Get In"
        highlight="Touch"
        description="Ready to transform your business? Let's discuss your project and find the right solution together."
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
