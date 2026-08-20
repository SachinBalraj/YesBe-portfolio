import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHeader } from "@/components/common/PageHeader";

const AboutSection = lazy(() => import("@/sections/AboutSection").then(m => ({ default: m.AboutSection })));
const WhyChooseSection = lazy(() => import("@/sections/WhyChooseSection").then(m => ({ default: m.WhyChooseSection })));
const DevelopmentProcessSection = lazy(() => import("@/sections/DevelopmentProcessSection").then(m => ({ default: m.DevelopmentProcessSection })));
const SkillsSection = lazy(() => import("@/sections/SkillsSection").then(m => ({ default: m.SkillsSection })));
const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));

export function AboutPage() {
  useSEO({
    title: SEO_TITLES.about,
    description: SEO_DESCRIPTIONS.about,
    canonical: "https://www.yesbe.tech/about",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: SEO_TITLES.about,
        description: SEO_DESCRIPTIONS.about,
        url: "https://www.yesbe.tech/about",
        about: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <PageHeader
        badge="About YesBe"
        title="About"
        highlight="YesBe"
        description="Our company, founder, mission, and technology expertise."
      />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <AboutSection />
        </div>
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <WhyChooseSection />
        </div>
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <DevelopmentProcessSection />
        </div>
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <SkillsSection />
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
