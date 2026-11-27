import { lazy, Suspense, useState, useEffect, useTransition, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate, useParams, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { BusinessSchema } from "@/components/common/BusinessSchema";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { isHydrationTargetPath } from "@/utils/hydration";
import { trackPageView } from "@/utils/analytics";
import { HomePage } from "@/pages/HomePage";
import { ServicesPage } from "@/pages/ServicesPage";
import { SolutionDetailPage } from "@/pages/SolutionDetailPage";
import { AboutPage } from "@/pages/AboutPage";
import { CaseStudiesPage } from "@/pages/CaseStudiesPage";
import { IndustriesPage } from "@/pages/IndustriesPage";
import { IndustryDetailPage } from "@/pages/IndustryDetailPage";

const CookieConsent = lazy(() =>
  import("@/components/common/CookieConsent").then((m) => ({ default: m.CookieConsent }))
);
const ScrollToTopButton = lazy(() =>
  import("@/components/common/ScrollToTopButton").then((m) => ({ default: m.ScrollToTopButton }))
);

const CaseStudyDetailPage = lazy(() =>
  import("@/pages/CaseStudyDetailPage").then((m) => ({ default: m.CaseStudyDetailPage }))
);
const FounderPage = lazy(() =>
  import("@/pages/FounderPage").then((m) => ({ default: m.FounderPage }))
);
const KnowledgeCenterPage = lazy(() =>
  import("@/pages/knowledge/KnowledgeCenterHome").then((m) => ({ default: m.KnowledgeCenterHome }))
);
const KnowledgeCategoryPage = lazy(() =>
  import("@/pages/knowledge/CategoryPage").then((m) => ({ default: m.CategoryPage }))
);
const KnowledgeArticlePage = lazy(() =>
  import("@/pages/knowledge/ArticleDetailPage").then((m) => ({ default: m.ArticleDetailPage }))
);
const KnowledgeSearchPage = lazy(() =>
  import("@/pages/knowledge/SearchPage").then((m) => ({ default: m.SearchPage }))
);
const VideoPage = lazy(() =>
  import("@/pages/VideoPage").then((m) => ({ default: m.VideoPage }))
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
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.NotFound }))
);

/* Admin area — kept out of the public Navbar/Footer shell */
const AdminLayout = lazy(() =>
  import("@/components/admin/AdminLayout").then((m) => ({ default: m.AdminLayout }))
);
const AdminDashboardPage = lazy(() =>
  import("@/pages/admin/AdminDashboardPage").then((m) => ({ default: m.AdminDashboardPage }))
);
const AdminEnquiriesPage = lazy(() =>
  import("@/pages/admin/AdminEnquiriesPage").then((m) => ({ default: m.AdminEnquiriesPage }))
);
const AdminEnquiryPage = lazy(() =>
  import("@/pages/admin/AdminEnquiryPage").then((m) => ({ default: m.AdminEnquiryPage }))
);
const AdminClientsPage = lazy(() =>
  import("@/pages/admin/AdminClientsPage").then((m) => ({ default: m.AdminClientsPage }))
);
const AdminNewsletterPage = lazy(() =>
  import("@/pages/admin/AdminNewsletterPage").then((m) => ({ default: m.AdminNewsletterPage }))
);
const AdminSettingsPage = lazy(() =>
  import("@/pages/admin/AdminSettingsPage").then((m) => ({ default: m.AdminSettingsPage }))
);

function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const id = window.setTimeout(() => {
      trackPageView(`${location.pathname}${location.search}`, document.title);
    }, 150);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  return null;
}

function PublicLayout() {
  const location = useLocation();
  const hydrateTarget = isHydrationTargetPath(location.pathname);
  const outlet = <Outlet />;

  return (
    <>
      <ScrollToTop />
      <BusinessSchema />
      <Navbar />
      <main id="main-content">
        {/* The fallback reserves a viewport so the footer never paints inside
            the first screen and then jumps down when a lazy route resolves.
            Hydration targets are eager and must not introduce a boundary. */}
        {hydrateTarget ? (
          outlet
        ) : (
          <Suspense fallback={<div className="min-h-[100svh]" aria-hidden="true" />}>
            {outlet}
          </Suspense>
        )}
      </main>
      <Footer />
    </>
  );
}

/**
 * Legacy URL forwards.
 *
 * Canonical service pages now live at /services/:slug and the insights hub at
 * /insights. These keep every previously indexed URL reachable inside the SPA
 * (dev, preview and any host without vercel.json) while the real permanent
 * redirects are served by vercel.json. They render nothing, forward on mount and
 * carry no metadata, so no duplicate page can ever be indexed.
 */
function LegacySolutionRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/services/${slug}`} replace />;
}

function LegacyArticleRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/insights/article/${slug}`} replace />;
}

function LegacyCategoryRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/insights/category/${slug}`} replace />;
}

function AppRoutes({ children }: { children: ReactNode }) {
  const location = useLocation();
  if (isHydrationTargetPath(location.pathname)) return <>{children}</>;

  return <Suspense fallback={<div className="h-96" aria-hidden="true" />}>{children}</Suspense>;
}

function App() {
  const [ready, setReady] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("prerender")) return;
    let cancelled = false;
    const cb = () => {
      if (!cancelled) startTransition(() => setReady(true));
    };

    const win = window as unknown as Record<string, unknown>;
    const rIC = win["requestIdleCallback"] as
      | ((cb: () => void, opts?: { timeout?: number }) => number)
      | undefined;
    const cIC = win["cancelIdleCallback"] as
      | ((id: number) => void)
      | undefined;

    if (typeof rIC === "function") {
      const id = rIC(cb, { timeout: 2000 });
      return () => {
        cancelled = true;
        cIC?.(id);
      };
    }

    const id = setTimeout(cb, 0);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, []);

  return (
    <BrowserRouter>
      <RouteAnalytics />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <ErrorBoundary>
        <ThemeProvider>

          <AppRoutes>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/sachin-balraj" element={<FounderPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<SolutionDetailPage />} />
                <Route path="/industries/:slug" element={<IndustryDetailPage />} />
                <Route path="/industries" element={<IndustriesPage />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/insights" element={<KnowledgeCenterPage />} />
                <Route path="/insights/category/:slug" element={<KnowledgeCategoryPage />} />
                <Route path="/insights/article/:slug" element={<KnowledgeArticlePage />} />
                <Route path="/insights/search" element={<KnowledgeSearchPage />} />
                <Route path="/insights/:slug" element={<KnowledgeCategoryPage />} />
                <Route path="/search" element={<Navigate to="/insights/search" replace />} />
                <Route path="/videos" element={<VideoPage />} />
                {/* Public pricing was retired in favour of a consultation-based
                    model. The permanent 308 is served by vercel.json; this client
                    route is the SPA/dev fallback so old links never 404. */}
                <Route path="/pricing" element={<Navigate to="/services" replace />} />
                {/* Canonical service URLs live under /services/:slug. /solutions
                    used to host them, so every old path is forwarded here and
                    vercel.json answers the equivalent permanent redirect. */}
                <Route path="/solutions" element={<Navigate to="/services" replace />} />
                <Route path="/solutions/:slug" element={<LegacySolutionRedirect />} />
                <Route path="/services/blockchain-data-privacy" element={<Navigate to="/services/blockchain" replace />} />
                {/* The insights hub was renamed from /knowledge-center to
                    /insights. Kept as client-side forwards so no indexed link
                    can 404; vercel.json serves the permanent redirect. */}
                <Route path="/knowledge-center" element={<Navigate to="/insights" replace />} />
                <Route path="/knowledge-center/search" element={<Navigate to="/insights/search" replace />} />
                <Route
                  path="/knowledge-center/article/:slug"
                  element={<LegacyArticleRedirect />}
                />
                <Route
                  path="/knowledge-center/category/:slug"
                  element={<LegacyCategoryRedirect />}
                />
                <Route path="/knowledge-center/:slug" element={<LegacyCategoryRedirect />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/refund-policy" element={<RefundPolicyPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="enquiries" element={<AdminEnquiriesPage />} />
                <Route path="consultations" element={<AdminEnquiriesPage category="consultation" />} />
                <Route path="service-enquiries" element={<AdminEnquiriesPage category="service" />} />
                <Route path="industry-enquiries" element={<AdminEnquiriesPage category="industry" />} />
                <Route path="project-enquiries" element={<AdminEnquiriesPage category="project" />} />
                <Route path="enquiries/:id" element={<AdminEnquiryPage />} />
                <Route path="clients" element={<AdminClientsPage />} />
                <Route path="newsletter" element={<AdminNewsletterPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>
            </Routes>
          </AppRoutes>
          {ready && (
            <Suspense fallback={null}>
              <CookieConsent />
              <ScrollToTopButton />
            </Suspense>
          )}
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
