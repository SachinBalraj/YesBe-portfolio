import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ScrollToTopButton } from "@/components/common/ScrollToTopButton";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { CursorGlow } from "@/components/common/CursorGlow";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { Analytics } from "@/components/common/Analytics";
import { GTM } from "@/components/common/GTM";
import { CookieConsent } from "@/components/common/CookieConsent";
import { BusinessSchema } from "@/components/common/BusinessSchema";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage }))
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const ServicesPage = lazy(() =>
  import("@/pages/ServicesPage").then((m) => ({ default: m.ServicesPage }))
);
const IndustriesPage = lazy(() =>
  import("@/pages/IndustriesPage").then((m) => ({ default: m.IndustriesPage }))
);
const CaseStudiesPage = lazy(() =>
  import("@/pages/CaseStudiesPage").then((m) => ({ default: m.CaseStudiesPage }))
);
const CaseStudyDetailPage = lazy(() =>
  import("@/pages/CaseStudyDetailPage").then((m) => ({ default: m.CaseStudyDetailPage }))
);
const KnowledgeCenterPage = lazy(() =>
  import("@/pages/KnowledgeCenterPage").then((m) => ({ default: m.KnowledgeCenterPage }))
);
const PricingPage = lazy(() =>
  import("@/pages/PricingPage").then((m) => ({ default: m.PricingPage }))
);
const ContactPage = lazy(() =>
  import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import("@/pages/PrivacyPolicyPage").then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsAndConditionsPage = lazy(() =>
  import("@/pages/TermsAndConditionsPage").then((m) => ({ default: m.TermsAndConditionsPage }))
);
const RefundPolicyPage = lazy(() =>
  import("@/pages/RefundPolicyPage").then((m) => ({ default: m.RefundPolicyPage }))
);
const CookiePolicyPage = lazy(() =>
  import("@/pages/CookiePolicyPage").then((m) => ({ default: m.CookiePolicyPage }))
);
const DisclaimerPage = lazy(() =>
  import("@/pages/DisclaimerPage").then((m) => ({ default: m.DisclaimerPage }))
);
const SolutionDetailPage = lazy(() =>
  import("@/pages/SolutionDetailPage").then((m) => ({ default: m.SolutionDetailPage }))
);
const IndustryDetailPage = lazy(() =>
  import("@/pages/IndustryDetailPage").then((m) => ({ default: m.IndustryDetailPage }))
);
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.NotFound }))
);

function PageFallback() {
  return <div className="h-96" aria-hidden="true" />;
}

function App() {
  const [loading, setLoading] = useState(true);
  const handleLoaded = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Analytics />
      <GTM />
      {loading && <LoadingScreen onComplete={handleLoaded} />}
      <ErrorBoundary>
        <ThemeProvider>
          <CursorGlow />
          <CookieConsent />
          <BusinessSchema />
          <ScrollToTopButton />
          <Navbar />
          <main id="main-content">
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/industries/:slug" element={<IndustryDetailPage />} />
                <Route path="/industries" element={<IndustriesPage />} />
                <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/knowledge-center" element={<KnowledgeCenterPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/refund-policy" element={<RefundPolicyPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
