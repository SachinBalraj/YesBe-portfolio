import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHeader } from "@/components/common/PageHeader";
import { ORGANIZATION_ID, FOUNDER_PERSON_ID } from "@/constants";

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
          // Same @id and @type as the global Organization node so the entity is
          // described once, consistently. Contact details are added here.
          "@type": "Organization",
          "@id": ORGANIZATION_ID,
          name: "YesBe Technologies",
          url: "https://www.yesbe.tech",
          logo: "https://www.yesbe.tech/YBlogo.png",
          email: "hello@yesbe.tech",
          telephone: "+919087795970",
          founder: { "@id": FOUNDER_PERSON_ID },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Salem",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
          // Company-owned accounts only — the founder's personal profiles are
          // declared on his own Person node, not on the organisation.
          sameAs: [
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
