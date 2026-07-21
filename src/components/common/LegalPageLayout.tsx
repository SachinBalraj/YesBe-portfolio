import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/animations";
import { SITE_CONFIG } from "@/constants";

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white pt-[140px] pb-12 lg:pt-[160px] lg:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#eaf6ff_0%,transparent_60%)]" />
          <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[120px]" />
          <div className="absolute bottom-[15%] right-[8%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.06] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-3xl mx-auto"
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

            <motion.div variants={fadeInUp}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                {badge}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {title}{" "}
              <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">{highlight}</span>
            </motion.h1>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
            <motion.p variants={fadeInUp} className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
              {description}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last Updated: {lastUpdated}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Area */}
      <section className="relative bg-white py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr]">
            {/* Sidebar TOC (Desktop) */}
            <aside className="hidden lg:block" aria-label="Table of contents">
              <div className="sticky top-24">
                <nav className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    On This Page
                  </h4>
                  <ul className="space-y-1">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200 ${
                            activeSection === item.id
                              ? "bg-primary/[0.06] text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
                <div className="mt-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Legal Pages
                  </h4>
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
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8fafc] to-white py-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(37,99,235,0.04)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/[0.06]">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Need Clarification?
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Contact <span className="font-semibold text-primary">{SITE_CONFIG.name}</span> for any questions about our legal policies. We&apos;re here to help.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleNav("/contact")}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(37,99,235,0.25),0_8px_24px_rgba(37,99,235,0.12)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(37,99,235,0.35),0_16px_48px_rgba(37,99,235,0.15)] hover:-translate-y-0.5"
              >
                Contact YesBe
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-primary/20"
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
