import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PageHeader } from "@/components/common/PageHeader";

const AboutSection = lazy(() => import("@/sections/AboutSection").then(m => ({ default: m.AboutSection })));
const WhyChooseSection = lazy(() => import("@/sections/WhyChooseSection").then(m => ({ default: m.WhyChooseSection })));
const DevelopmentProcessSection = lazy(() => import("@/sections/DevelopmentProcessSection").then(m => ({ default: m.DevelopmentProcessSection })));
const SkillsSection = lazy(() => import("@/sections/SkillsSection").then(m => ({ default: m.SkillsSection })));
const TrustedBrandsSection = lazy(() => import("@/sections/TrustedBrandsSection").then(m => ({ default: m.TrustedBrandsSection })));
const ContactSection = lazy(() => import("@/sections/ContactSection").then(m => ({ default: m.ContactSection })));

export function AboutPage() {
  useSEO({
    title: "About YesBe — Company, Founder & Mission",
    description: "Learn about YesBe — a technology consulting company led by Sachin Balraj, specializing in AI, ERP, web development, and business automation.",
    canonical: "https://yesbe.com/about",
  });

  return (
    <>
      <PageHeader
        badge="About YesBe"
        title="About"
        highlight="YesBe"
        description="Our company, founder, mission, and technology expertise."
      />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <WhyChooseSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <DevelopmentProcessSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <TrustedBrandsSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
