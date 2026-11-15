import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/animations";
import { SITE_CONFIG } from "@/constants";
import { trackContactClick } from "@/utils/analytics";
import { serializeJsonLd } from "@/utils/jsonLd";
import { Eyebrow } from "@/components/system/Eyebrow";

interface TOCItem {
  id: string;
  label: string;
}

interface LegalPageLayoutProps {
  title: string;
  highlight: string;
  badge: string;
  description: string;
  lastUpdated: string;
  toc: TOCItem[];
  children: React.ReactNode;
  schema?: object;
  breadcrumb?: { label: string; href?: string }[];
}

export function LegalPageLayout({
  title,
  highlight,
  badge,
  description,
  lastUpdated,
  toc,
  children,
  schema,
  breadcrumb = [],
}: LegalPageLayoutProps) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    for (const item of toc) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [toc]);

  const handleNav = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      )}

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-line bg-paper pt-[112px] pb-12 lg:pt-[128px] lg:pb-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid bg-cobalt-glow opacity-70" />
        <div className="container-page relative">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-3xl"
          >
            {/* Breadcrumbs */}
            <motion.nav variants={fadeInUp} aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => handleNav("/")} className="transition-colors hover:text-primary">
                    Home
                  </button>
                </li>
                {breadcrumb.map((crumb, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                    {crumb.href ? (
                      <button onClick={() => handleNav(crumb.href!)} className="transition-colors hover:text-primary">
                        {crumb.label}
                      </button>
                    ) : (
                      <span className="text-foreground font-medium">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>

            <motion.div variants={fadeInUp} className="mb-5">
              <Eyebrow>{badge}</Eyebrow>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="display-lg text-ink">
              {title}{" "}
              <span className="text-primary">{highlight}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="lead-editorial mt-6">
              {description}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-5 flex items-center gap-2 text-sm text-body">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Last Updated: {lastUpdated}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Area */}
      <section className="relative bg-paper py-12 lg:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr]">
            {/* Sidebar TOC (Desktop) */}
            <aside className="hidden lg:block" aria-label="Table of contents">
              <div className="sticky top-24">
                <nav className="rounded-panel border border-line bg-card p-5 shadow-panel">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-body">
                    On This Page
                  </p>
                  <ul className="space-y-1">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block border-l px-3 py-2 text-[13px] font-medium transition-all duration-200 ${
                            activeSection === item.id
                              ? "border-primary bg-primary/[0.06] text-primary"
                              : "border-transparent text-body hover:bg-paper-deep hover:text-ink"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Related Legal Pages */}
                <div className="mt-4 rounded-panel border border-line bg-card p-5 shadow-panel">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-body">
                    Legal Pages
                  </p>
                  <ul className="space-y-1.5">
                    <li>
                      <button onClick={() => handleNav("/privacy-policy")} className="flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-primary">
                        <ArrowRight className="h-3 w-3" />
                        Privacy Policy
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNav("/terms-and-conditions")} className="flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-primary">
                        <ArrowRight className="h-3 w-3" />
                        Terms &amp; Conditions
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNav("/refund-policy")} className="flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-primary">
                        <ArrowRight className="h-3 w-3" />
                        Refund Policy
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNav("/cookie-policy")} className="flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-primary">
                        <ArrowRight className="h-3 w-3" />
                        Cookie Policy
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNav("/disclaimer")} className="flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-primary">
                        <ArrowRight className="h-3 w-3" />
                        Disclaimer
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <article className="prose-legal min-w-0">
              {children}
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-line bg-paper py-16 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid bg-cobalt-glow opacity-60" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-panel border border-line bg-card shadow-panel">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="display-sm text-ink">
              Need Clarification?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-body">
              Contact <span className="font-semibold text-primary">{SITE_CONFIG.name}</span> for any questions about our legal policies. We&apos;re here to help.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => handleNav("/contact")} className="btn-primary">
                Contact YESBE
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                onClick={() => trackContactClick("legal_page")}
                className="btn-secondary"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
