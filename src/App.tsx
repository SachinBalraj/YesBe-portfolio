import { lazy, Suspense, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ScrollToTopButton } from "@/components/common/ScrollToTopButton";
import { CursorGlow } from "@/components/common/CursorGlow";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { Analytics } from "@/components/common/Analytics";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PremiumHero } from "@/components/sections/PremiumHero";
import { MarqueeSection } from "@/sections/MarqueeSection";

const AboutSection = lazy(() =>
  import("@/sections/AboutSection").then((m) => ({ default: m.AboutSection }))
);
const SolutionsSection = lazy(() =>
  import("@/sections/SolutionsSection").then((m) => ({ default: m.SolutionsSection }))
);
const IndustriesSection = lazy(() =>
  import("@/sections/IndustriesSection").then((m) => ({ default: m.IndustriesSection }))
);
const PortfolioSection = lazy(() =>
  import("@/sections/PortfolioSection").then((m) => ({ default: m.PortfolioSection }))
);
const TrustedBrandsSection = lazy(() =>
  import("@/sections/TrustedBrandsSection").then((m) => ({ default: m.TrustedBrandsSection }))
);
const TechStackSection = lazy(() =>
  import("@/sections/TechStackSection").then((m) => ({ default: m.TechStackSection }))
);
const SkillsSection = lazy(() =>
  import("@/sections/SkillsSection").then((m) => ({ default: m.SkillsSection }))
);
const WhyChooseSection = lazy(() =>
  import("@/sections/WhyChooseSection").then((m) => ({ default: m.WhyChooseSection }))
);
const DevelopmentProcessSection = lazy(() =>
  import("@/sections/DevelopmentProcessSection").then((m) => ({ default: m.DevelopmentProcessSection }))
);
const WhoIHelpSection = lazy(() =>
  import("@/sections/WhoIHelpSection").then((m) => ({ default: m.WhoIHelpSection }))
);
const BusinessResultsSection = lazy(() =>
  import("@/sections/BusinessResultsSection").then((m) => ({ default: m.BusinessResultsSection }))
);
const PricingSection = lazy(() =>
  import("@/sections/PricingSection").then((m) => ({ default: m.PricingSection }))
);
const MiniGuidesSection = lazy(() =>
  import("@/sections/MiniGuidesSection").then((m) => ({ default: m.MiniGuidesSection }))
);
const KnowledgeCenterSection = lazy(() =>
  import("@/sections/KnowledgeCenterSection").then((m) => ({ default: m.KnowledgeCenterSection }))
);
const FAQSection = lazy(() =>
  import("@/sections/FAQSection").then((m) => ({ default: m.FAQSection }))
);
const ContactSection = lazy(() =>
  import("@/sections/ContactSection").then((m) => ({ default: m.ContactSection }))
);
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.NotFound }))
);

function SectionFallback() {
  return <div className="h-96" aria-hidden="true" />;
}

function HomePage() {
  return (
    <>
      <PremiumHero />
      <MarqueeSection />
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SolutionsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <IndustriesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TrustedBrandsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TechStackSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhyChooseSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <DevelopmentProcessSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhoIHelpSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BusinessResultsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MiniGuidesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <KnowledgeCenterSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const handleLoaded = useCallback(() => setLoading(false), []);

  return (
    <BrowserRouter>
      <Analytics />
      {loading && <LoadingScreen onComplete={handleLoaded} />}
      <ThemeProvider>
        <CursorGlow />
        <ScrollToTopButton />
        <Navbar />
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
