import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2, Clock, ArrowRight, ArrowLeft,
  ExternalLink, ChevronDown, Layers, Lightbulb, Target,
  TrendingUp, MessageCircle, Phone,
} from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PageHeader } from "@/components/common/PageHeader";
import { getCaseStudyBySlug, caseStudies, type CaseStudy } from "@/data/caseStudies";
import { fadeInUp, staggerContainer } from "@/animations";
import { ContactSection } from "@/sections/ContactSection";

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
      <h3 className="text-lg font-bold text-foreground">{children}</h3>
    </div>
  );
}

/* ─── Related Projects ─── */

function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const related = caseStudies
    .filter((cs) => cs.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const navigate = useNavigate();

  return (
    <div className="rounded-[24px] border border-white/40 bg-gradient-to-br from-[#f8fbff] to-[#eff6ff] p-8">
      <SectionHeading icon={Layers}>Related Case Studies</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((cs) => (
          <button
            key={cs.slug}
            onClick={() => {
              navigate(`/case-studies/${cs.slug}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group rounded-2xl border border-white/40 bg-white p-5 text-left transition-all duration-300 hover:border-primary/30 hover:shadow-md"
          >
            <span className="mb-2 inline-block rounded-full bg-primary/[0.06] px-3 py-1 text-[11px] font-semibold text-primary">
              {cs.category}
            </span>
            <h4 className="text-[14px] font-bold text-foreground group-hover:text-primary transition-colors">
              {cs.title}
            </h4>
            <p className="mt-1 text-[12px] text-muted-foreground line-clamp-2">
              {cs.shortOverview}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  useSEO({
    title: study ? `${study.title} — YesBe Case Study` : "Case Study — YesBe",
    description: study
      ? `${study.shortOverview} See how YesBe delivered ${study.category} solutions for ${study.clientType}.`
      : "Real-world case studies of AI, ERP, web development, and automation projects by YesBe.",
    canonical: study ? `https://yesbe.com/case-studies/${study.slug}` : "https://yesbe.com/case-studies",
  });

  if (!study) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Case Study Not Found</h1>
          <p className="mt-2 text-muted-foreground">The case study you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/case-studies")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
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
            <motion.button
              variants={fadeInUp}
              onClick={() => navigate("/case-studies")}
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              All Case Studies
            </motion.button>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-4">
              <span className="rounded-full bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                {study.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-[#2563eb]" />
                {study.clientType}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {study.duration}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {study.status}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
            >
              {study.title}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
            />

            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground"
            >
              {study.shortOverview}
            </motion.p>
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
              src={study.image}
              alt={`${study.title} — ${study.category} case study by YesBe`}
              width={1200}
              height={600}
              loading="eager"
              decoding="async"
              className="h-64 w-full object-cover sm:h-80 lg:h-[450px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
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
            className="grid gap-8 lg:grid-cols-3"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Project Overview */}
              <motion.div variants={fadeInUp}>
                <SectionHeading icon={Target}>Project Overview</SectionHeading>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {study.solution}
                </p>
              </motion.div>

              {/* Business Challenge */}
              <motion.div variants={fadeInUp}>
                <SectionHeading icon={Lightbulb}>Business Challenge</SectionHeading>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {study.problem}
                </p>
              </motion.div>

              {/* Proposed Solution */}
              <motion.div variants={fadeInUp}>
                <SectionHeading icon={Target}>Proposed Solution</SectionHeading>
                <p className="text-[15px] leading-relaxed text-muted-foreground mb-4">
                  {study.solution}
                </p>
                <div className="rounded-2xl border border-white/40 bg-muted/50 p-5">
                  <p className="text-[13px] font-semibold text-foreground mb-2">Technical Challenge</p>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">{study.challenge}</p>
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div variants={fadeInUp}>
                <SectionHeading icon={Layers}>Key Features</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {study.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span className="text-[14px] text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Development Process */}
              <motion.div variants={fadeInUp}>
                <SectionHeading icon={Target}>Development Process</SectionHeading>
                <ol className="space-y-3">
                  {study.developmentProcess.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/[0.06] text-[11px] font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-[14px] text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <motion.div
                variants={fadeInUp}
                className="rounded-[20px] border border-white/40 bg-white p-6"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(37,99,235,0.03)" }}
              >
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Technologies Used</h4>
                <div className="space-y-4">
                  {study.techGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-white/40 bg-muted px-2.5 py-1 text-[12px] font-medium text-primary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Business Results */}
              <motion.div
                variants={fadeInUp}
                className="rounded-[20px] border border-emerald-100 bg-emerald-50/50 p-6"
              >
                <SectionHeading icon={TrendingUp}>Business Results</SectionHeading>
                <ul className="space-y-2">
                  {study.businessResult.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-500">▸</span>
                      <span className="text-[13px] text-muted-foreground">{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Client Benefits */}
              <motion.div
                variants={fadeInUp}
                className="rounded-[20px] border border-white/40 bg-white p-6"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(37,99,235,0.03)" }}
              >
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">Client Benefits</h4>
                <ul className="space-y-2">
                  {study.clientBenefits.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span className="text-[13px] text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={fadeInUp}
                className="rounded-[20px] bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] p-6 text-white"
              >
                <h4 className="text-lg font-bold mb-2">Need a Similar Solution?</h4>
                <p className="text-[13px] text-white/80 mb-4">
                  Let's discuss your project and build something great together.
                </p>
                <button
                  onClick={() => {
                    navigate("/contact");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-[#2563eb] transition-all hover:bg-white/90 hover:shadow-md"
                >
                  Book Similar Project
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Future Enhancements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <SectionHeading icon={Lightbulb}>Future Enhancements</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {study.futureEnhancements.map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-white/40 bg-white px-4 py-2 text-[13px] font-medium text-primary"
                >
                  {e}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Related Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <SectionHeading icon={Layers}>Related Services</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {study.relatedServices.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-primary/[0.06] px-4 py-2 text-[13px] font-medium text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <SectionHeading icon={MessageCircle}>Frequently Asked Questions</SectionHeading>
            <div className="space-y-3">
              {study.faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </motion.div>

          {/* Related Projects */}
          <div className="mt-10">
            <RelatedProjects currentSlug={study.slug} />
          </div>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => {
                navigate("/case-studies");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Case Studies
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />
    </>
  );
}
