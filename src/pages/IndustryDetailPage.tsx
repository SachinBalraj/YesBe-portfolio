import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useSEO } from "@/hooks/useSEO";
import { getIndustrySeoDescription, getIndustrySeoTitle, SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { getIndustryBySlug } from "@/data/industries";
import { getSolutionBySlug, type SolutionDetail } from "@/data/solutions";
import { fadeInUp, staggerContainer } from "@/animations";
import { ContactSection } from "@/sections/ContactSection";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { JsonLd } from "@/components/common/JsonLd";
import { trackConsultationClick } from "@/utils/analytics";

const HERO_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Crect width='1200' height='600' fill='%23f8fafc'/%3E%3Cpath d='M500 270h200v50a10 10 0 01-10 10H510a10 10 0 01-10-10v-50z' fill='%23e2e8f0'/%3E%3Cpath d='M480 258a14 14 0 0114-14h212a14 14 0 0114 14v12H480v-12z' fill='%23cbd5e1'/%3E%3C/svg%3E";
import {
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Check,
  Phone,
  MessageCircle,
  Layers,
  Target,
  Lightbulb,
  Rocket,
  Award,
  TrendingUp,
} from "lucide-react";

/* ─── FAQ Accordion ─── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/40 bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-[15px] font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-[14px] leading-relaxed text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Section Heading ─── */

function SectionHeading({ children, icon: Icon }: { children: React.ReactNode; icon?: typeof Target }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {Icon && <Icon className="h-4 w-4 text-primary" />}
      <h2 className="text-lg font-bold text-foreground">{children}</h2>
    </div>
  );
}

/* ─── Main Page ─── */

export function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const industry = slug ? getIndustryBySlug(slug) : undefined;
  const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = HERO_FALLBACK;
  }, []);

  useSEO({
    title: industry ? getIndustrySeoTitle(industry.slug, industry.title) : SEO_TITLES.industryNotFound,
    description: industry ? getIndustrySeoDescription(industry.slug, industry.title) : SEO_DESCRIPTIONS.industryNotFound,
    canonical: industry ? `https://www.yesbe.tech/industries/${industry.slug}` : "https://www.yesbe.tech/industries",
  });

  if (!industry) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Industry Not Found</h1>
          <p className="mt-2 text-muted-foreground">The industry page you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/industries")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Industries
          </button>
        </div>
      </div>
    );
  }

  const Icon = industry.icon;
  const relatedSolutionsData = industry.relatedSolutions
    .map((s) => getSolutionBySlug(s))
    .filter(Boolean) as SolutionDetail[];

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${industry.title} — YesBe Technologies`,
        description: industry.description,
        url: `https://www.yesbe.tech/industries/${industry.slug}`,
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: industry.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-[140px] pb-16 lg:pt-[160px] lg:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#eaf6ff_0%,transparent_60%)]" />
          <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp}>
              <Breadcrumbs items={[{ label: "Industries", href: "/industries" }, { label: industry.title }]} />
            </motion.div>

            {/* Icon + Category */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/[0.06]">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <span className="rounded-full bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                {industry.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
            >
              {industry.title}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
            />

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground"
            >
              {industry.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                onClick={() => { trackConsultationClick("industry_hero"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-premium inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                onClick={() => { trackConsultationClick("industry_hero"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-foreground"
              >
                Get Free Advice
                <MessageCircle className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl"
            style={{ boxShadow: "0 4px 24px rgba(37,99,235,0.08), 0 16px 64px rgba(0,0,0,0.06)" }}
          >
            <img
              src={industry.heroImage}
              alt={`${industry.title} — ${industry.category} industry solutions by YesBe Technologies`}
              width={1200}
              height={600}
              loading="eager"
              decoding="async"
              onError={handleImgError}
              className="h-64 w-full object-cover sm:h-80 lg:h-[450px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-12 lg:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[5%] h-[300px] w-[300px] rounded-full bg-[#dbeafe] opacity-[0.06] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-10 lg:grid-cols-2"
          >
            <motion.div variants={fadeInUp}>
              <SectionHeading icon={Target}>Industry Overview</SectionHeading>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {industry.overview}
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <SectionHeading icon={Lightbulb}>Why This Industry Needs Technology</SectionHeading>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {industry.whyNeeded}
              </p>
            </motion.div>
          </motion.div>

          {/* Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <SectionHeading icon={Target}>Key Challenges We Address</SectionHeading>
            <ol className="space-y-3">
              {industry.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/[0.06] text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-[14px] text-muted-foreground pt-0.5">{challenge}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <SectionHeading icon={Layers}>Key Features & Capabilities</SectionHeading>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {industry.features.map((feature, i) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="card-glass rounded-2xl p-6"
                >
                  <span className="mb-3 inline-flex items-center justify-center h-9 w-9 rounded-lg bg-primary/[0.06]">
                    <FeatureIcon className="h-4.5 w-4.5 text-primary" />
                  </span>
                  <h4 className="text-[15px] font-bold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <SectionHeading icon={TrendingUp}>Business Benefits</SectionHeading>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {industry.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-3 rounded-2xl border border-white/40 bg-white p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-3 w-3 text-emerald-600" />
                </span>
                <span className="text-[14px] text-muted-foreground">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <SectionHeading icon={Rocket}>Our Process</SectionHeading>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            {/* Connecting line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent hidden sm:block" />

            <div className="space-y-6">
              {industry.process.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-4"
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-white shadow-md">
                    {i + 1}
                  </span>
                  <div className="rounded-2xl border border-white/40 bg-white p-5 flex-1">
                    <h4 className="text-[15px] font-bold text-foreground mb-1">{step.step}</h4>
                    <p className="text-[14px] leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <SectionHeading icon={Layers}>Technologies We Use</SectionHeading>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {industry.technologies.map((tech, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-2xl border border-white/40 bg-white p-4"
              >
                <span className="inline-block rounded-full bg-primary/[0.06] px-3 py-1 text-[12px] font-semibold text-primary mb-2">
                  {tech.name}
                </span>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{tech.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose YesBe */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <SectionHeading icon={Award}>Why Choose YesBe</SectionHeading>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {industry.whyYesBe.map((adv, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-2xl border border-primary/10 bg-gradient-to-br from-[#f8fbff] to-[#eff6ff] p-6"
              >
                <h4 className="text-[15px] font-bold text-foreground mb-1">{adv.title}</h4>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{adv.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading icon={Target}>Case Study</SectionHeading>
            <div className="rounded-[20px] border border-white/40 bg-white p-6 sm:p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(37,99,235,0.03)" }}>
              <h4 className="text-[17px] font-bold text-foreground mb-2">{industry.caseStudy.title}</h4>
              <p className="text-[15px] leading-relaxed text-muted-foreground mb-4">{industry.caseStudy.outcome}</p>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/[0.06] px-4 py-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-[14px] font-semibold text-primary">{industry.caseStudy.metric}</span>
              </div>
              <div className="mt-5">
                <Link
                  to="/case-studies"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  View Full Case Studies
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <SectionHeading icon={MessageCircle}>Frequently Asked Questions</SectionHeading>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-3"
          >
            {industry.faq.map((faq, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related Solutions */}
      {relatedSolutionsData.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <SectionHeading icon={Layers}>Related Solutions</SectionHeading>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {relatedSolutionsData.map((rel: { slug: string; icon: typeof Rocket; category: string; title: string; description: string }) => (
                <motion.div key={rel.slug} variants={fadeInUp}>
                  <Link
                    to={`/solutions/${rel.slug}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="group block rounded-2xl border border-white/40 bg-white p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary/[0.06]">
                        <rel.icon className="h-4 w-4 text-primary" />
                      </span>
                      <span className="rounded-full bg-primary/[0.06] px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                        {rel.category}
                      </span>
                    </div>
                    <h4 className="text-[14px] font-bold text-foreground group-hover:text-primary transition-colors">
                      {rel.title}
                    </h4>
                    <p className="mt-1 text-[12px] text-muted-foreground line-clamp-2">
                      {rel.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-primary">
                      Explore Solution <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[24px] bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] p-8 sm:p-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to build your project?</h2>
            <p className="text-[15px] text-white/80 max-w-xl mx-auto mb-6">
              Let's discuss your goals and create a tailored solution for the {industry.title} industry.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                onClick={() => { trackConsultationClick("industry_final"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#2563eb] transition-all hover:bg-white/90 hover:shadow-md"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                onClick={() => { trackConsultationClick("industry_final"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
              >
                <Phone className="h-4 w-4" />
                Contact YesBe
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />
    </>
  );
}
