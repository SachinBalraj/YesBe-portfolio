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
    canonical: "https://www.yesbe.tech/contact",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: SEO_TITLES.contact,
        description: SEO_DESCRIPTIONS.contact,
        url: "https://www.yesbe.tech/contact",
        mainEntity: {
          "@type": "ProfessionalService",
          "@id": "https://www.yesbe.tech/#organization",
          name: "YesBe Technologies",
          url: "https://www.yesbe.tech",
          email: "hello@yesbe.tech",
          telephone: "+919087795970",
          logo: "https://www.yesbe.tech/YBlogo.png",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Salem",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
          sameAs: [
            "https://www.linkedin.com/in/sachin-balraj-2b7650406",
            "https://github.com/sachinbalraj",
            "https://www.instagram.com/yesbe.co",
            "https://www.facebook.com/yesbe.co",
            "https://x.com/yesbe_co",
          ],
        },
      }} />
      <PageHeader
        badge="Contact Us"
        title="Get In"
        highlight="Touch"
        description="Ready to transform your business? Let's discuss your project and find the right solution together."
        breadcrumbs={[{ label: "Contact" }]}
      />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <ContactSection />
        </div>
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <FAQSection />
        </div>
      </Suspense>
    </>
  );
}
