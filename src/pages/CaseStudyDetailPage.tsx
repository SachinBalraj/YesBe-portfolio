import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Layers,
  Mail,
  Target,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import {
  getCaseStudySeoDescription,
  getCaseStudySeoTitle,
  SEO_DESCRIPTIONS,
  SEO_TITLES,
} from "@/constants/seoTitles";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { JsonLd } from "@/components/common/JsonLd";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ButtonLink } from "@/components/system/ButtonLink";
import { Eyebrow } from "@/components/system/Eyebrow";
import { Reveal } from "@/components/system/Reveal";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import { ProjectArchitecture } from "@/components/phase3/ArchitectureDiagram";
import { localSrcSet } from "@/utils/images";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";
import { trackConsultationClick, trackContactClick } from "@/utils/analytics";

const HERO_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='760' viewBox='0 0 1200 760'%3E%3Crect width='1200' height='760' fill='%23f8fafc'/%3E%3Cpath d='M500 360h200v50a10 10 0 01-10 10H510a10 10 0 01-10-10v-50z' fill='%23e2e8f0'/%3E%3Cpath d='M480 348a14 14 0 0114-14h212a14 14 0 0114 14v12H480v-12z' fill='%23cbd5e1'/%3E%3C/svg%3E";

const serviceNameToSlug: Record<string, string> = {
  "AI Solutions": "ai-solutions",
  "AI Chatbots": "ai-chatbots",
  "ERP Solutions": "erp-systems",
  "Education ERP": "erp-systems",
  "Website Development": "website-development",
  "Corporate Websites": "website-development",
  "Business Automation": "business-automation",
  "Workflow Automation": "business-automation",
  "Restaurant Automation": "business-automation",
  "QR Ordering Systems": "business-automation",
  "Data Analytics": "data-analytics",
  "Data Visualization": "data-analytics",
  "Business Intelligence": "power-bi-dashboards",
  "Power BI Dashboards": "power-bi-dashboards",
  "Database Management": "database-management",
  "Custom Software Development": "custom-software",
  "API Integration": "api-development",
  "SEO Optimization": "seo",
  "GEO Optimization": "geo",
  "AEO Optimization": "aeo",
  "Digital Marketing": "digital-marketing",
  "Lead Generation": "digital-marketing",
  "E-Commerce Development": "ecommerce",
  "Payment Integration": "ecommerce",
  "Library Management Systems": "custom-software",
  "RAG Implementation": "ai-solutions",
  "LangChain Development": "ai-solutions",
  "Real-time Applications": "web-applications",
  "React Development": "web-applications",
};

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `case-faq-panel-${index}`;
  const buttonId = `case-faq-button-${index}`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="group flex w-full items-start justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:py-6"
        >
          <span className="text-[14.5px] font-semibold leading-6 tracking-[-0.01em] text-ink transition-colors group-hover:text-primary sm:text-[15.5px]">
            {question}
          </span>
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center border border-line text-body transition-colors group-hover:border-primary/30 group-hover:text-primary">
            <ChevronDown
              className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="pb-6 pr-8">
        <p className="max-w-2xl text-[13.5px] leading-6 text-body">{answer}</p>
      </div>
    </div>
  );
}

function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const related = caseStudies.filter((study) => study.slug !== currentSlug).slice(0, 3);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {related.map((study) => (
        <Link
          key={study.slug}
          to={`/case-studies/${study.slug}`}
          className="group flex h-full flex-col overflow-hidden border border-line bg-white transition-colors hover:border-line-strong"
        >
          <div className="overflow-hidden bg-paper-deep">
            <img
              src={study.image}
              alt={`${study.title} — illustrative interface preview`}
              width={1200}
              height={760}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
              {study.category}
            </span>
            <h3 className="mt-2 text-[15px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink transition-colors group-hover:text-primary">
              {study.title}
            </h3>
            <span className="mt-auto flex items-center gap-1.5 pt-5 text-[11px] font-semibold text-body/85">
              Review the project
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line py-4 first:border-t-0 first:pt-0 last:pb-0">
      <dt className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-body/70">{label}</dt>
      <dd className="mt-1.5 text-[13px] font-medium leading-5 text-ink">{value}</dd>
    </div>
  );
}

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  useSEO({
    title: study ? getCaseStudySeoTitle(study.slug, study.title) : SEO_TITLES.caseStudyNotFound,
    description: study
      ? getCaseStudySeoDescription(study.slug, study.title)
      : SEO_DESCRIPTIONS.caseStudyNotFound,
    canonical: study
      ? `https://www.yesbe.tech/case-studies/${study.slug}`
      : "https://www.yesbe.tech/case-studies",
  });

  if (!study) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-paper px-6 pt-24">
        <div className="max-w-md text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-ink">Project not found</h1>
          <p className="mt-3 text-sm leading-6 text-body">
            The project you are looking for does not exist or has moved.
          </p>
          <button type="button" onClick={() => navigate("/case-studies")} className="btn-primary mt-7">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${study.title} — YESBE Technologies`,
        description: study.shortOverview,
        url: `https://www.yesbe.tech/case-studies/${study.slug}`,
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: study.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />

      <section className="relative isolate overflow-hidden bg-[#05132e] pt-[76px] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 top-8 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(31,78,216,0.26),transparent_66%)]"
        />
        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <Breadcrumbs
            items={[{ label: "Projects", href: "/case-studies" }, { label: study.title }]}
            className="text-white/50 [&_[aria-current=page]]:text-white"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8eb5ff]">
                  {study.category}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/58">
                  {study.label}
                </span>
                <span className="h-px w-6 bg-white/20" aria-hidden="true" />
                <span className="text-[10px] font-medium text-white/58">
                  Designed for {study.builtFor.toLowerCase()}
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-[clamp(2.45rem,5.2vw,4.55rem)] font-semibold leading-[1] tracking-[-0.052em] text-white">
                {study.title}
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/65 sm:text-[17px] sm:leading-8">
                {study.shortOverview}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  to="/contact"
                  onClick={() => trackConsultationClick("case_study_hero")}
                  variant="inverted"
                  withArrow
                  className="w-full sm:w-auto"
                >
                  Discuss a similar brief
                </ButtonLink>
                <a href="#project-detail" className="btn-on-dark group w-full sm:w-auto">
                  Read the project detail
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>

              <p className="mt-7 max-w-xl border-l border-white/15 pl-4 text-[11px] leading-5 text-white/58">
                Project preview is illustrative. It documents the scope and architecture described
                on this page; it is not a client screenshot or a measured outcome.
              </p>
            </div>

            <div className="relative border border-white/12 bg-white/[0.045] p-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#071a3a]">
                <img
                  src={study.image}
                  srcSet={localSrcSet(study.image, [480, 800])}
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  alt={`${study.title} — illustrative interface preview`}
                  width={1200}
                  height={760}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.src = HERO_FALLBACK;
                  }}
                  className="size-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,19,46,0.08)_48%,rgba(5,19,46,0.9))]"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 border-t border-white/15 pt-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                      Illustrative interface preview
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium text-white/90">{study.builtFor}</p>
                  </div>
                  <span className="flex size-8 items-center justify-center border border-white/15 text-[#8eb5ff]">
                    <Layers className="size-4" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-7 sm:grid-cols-4 sm:gap-0">
            <div className="sm:border-r sm:border-white/10 sm:pr-6">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/62">Category</dt>
              <dd className="mt-1.5 text-[12.5px] font-medium text-white/80">{study.category}</dd>
            </div>
            <div className="sm:border-r sm:border-white/10 sm:px-6">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/62">Designed for</dt>
              <dd className="mt-1.5 text-[12.5px] font-medium text-white/80">{study.builtFor}</dd>
            </div>
            <div className="sm:border-r sm:border-white/10 sm:px-6">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/62">Project status</dt>
              <dd className="mt-1.5 text-[12.5px] font-medium text-white/80">{study.label}</dd>
            </div>
            <div className="sm:pl-6">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/62">Stack</dt>
              <dd className="mt-1.5 text-[12.5px] font-medium text-white/80">
                {`${study.technologies.length} technologies`}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="project-detail" className="section-py bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16 xl:grid-cols-[1fr_22rem]">
            <div className="space-y-12 sm:space-y-14">
              <Reveal>
                <Eyebrow>The brief</Eyebrow>
                <h2 className="mt-5 text-[clamp(2rem,3.7vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-ink">
                  What the system needed to change.
                </h2>
                <div className="mt-7 grid gap-8 border-t border-line pt-7 sm:grid-cols-2 sm:gap-10">
                  <div>
                    <h3 className="flex items-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary">
                      <Target className="size-3.5" aria-hidden="true" />
                      The context
                    </h3>
                    <p className="mt-4 text-[14.5px] leading-7 text-body">{study.problem}</p>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary">
                      <Layers className="size-3.5" aria-hidden="true" />
                      The response
                    </h3>
                    <p className="mt-4 text-[14.5px] leading-7 text-body">{study.solution}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="relative overflow-hidden border border-line bg-paper p-6 sm:p-8">
                  <div aria-hidden="true" className="absolute right-0 top-0 size-32 bg-[radial-gradient(circle_at_top_right,rgba(49,108,255,0.12),transparent_70%)]" />
                  <div className="relative">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                      Technical constraint
                    </p>
                    <h2 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.03em] text-ink">
                      The part that had to be solved correctly.
                    </h2>
                    <p className="mt-4 max-w-2xl text-[14px] leading-7 text-body">{study.challenge}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <SectionHeading
                  eyebrow="Solution architecture"
                  title="How the implementation is layered."
                  description="The recorded stack, grouped by the role each layer plays in the system."
                  className="mb-6"
                />
                <ProjectArchitecture study={study} />
              </Reveal>

              <Reveal>
                <SectionHeading
                  eyebrow="Application surface"
                  title="What the interface has to make clear."
                  description="The preview is illustrative. Authentic application screenshots are not attached to this portfolio record."
                  className="mb-6"
                />
                <div className="overflow-hidden border border-line bg-[#071a3a]">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#05132e] px-4 py-2.5">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="size-1.5 rounded-full bg-white/25" />
                      <span className="size-1.5 rounded-full bg-white/25" />
                      <span className="size-1.5 rounded-full bg-white/25" />
                    </div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-white/62">
                      Illustrative interface preview
                    </p>
                  </div>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={study.image}
                      srcSet={localSrcSet(study.image, [480, 800])}
                      sizes="100vw"
                      alt={`${study.title} — illustrative interface preview`}
                      width={1200}
                      height={760}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                    {study.features.slice(0, 3).map((feature, index) => (
                      <div key={feature} className="bg-[#071833] p-4">
                        <p className="font-mono text-[9px] tracking-[0.12em] text-[#8eb5ff]">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-2 text-[11px] leading-5 text-white/65">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-line bg-white p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center border border-line bg-paper text-primary">
                      <Check className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                        Evidence status
                      </p>
                      <h2 className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-ink">
                        No measured client outcome is attached to this record.
                      </h2>
                      <p className="mt-2 max-w-2xl text-[12px] leading-6 text-body">
                        This is a {study.label.toLowerCase()} / demonstration system. Any future
                        result should be supported by written permission, a defined baseline and
                        measured evidence before it is published as a business outcome.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <SectionHeading
                  eyebrow="Scope"
                  title="What the build includes."
                  description="A concrete view of the system surface described in this record."
                  className="mb-7"
                />
                <ul className="grid gap-x-8 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
                  {study.features.map((feature, index) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-primary/15 bg-primary/[0.06] font-mono text-[9px] font-semibold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13.5px] leading-6 text-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <SectionHeading
                  eyebrow="Delivery"
                  title="How the work was sequenced."
                  description="The process follows dependency order: define the boundary, design the interaction, build the system, then verify it under real conditions."
                  className="mb-7"
                />
                <ol className="border-t border-line">
                  {study.developmentProcess.map((step, index) => (
                    <li
                      key={step}
                      className="grid grid-cols-[2.9rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[5rem_1fr] sm:gap-6 sm:py-6"
                    >
                      <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[13.5px] leading-6 text-body sm:text-[14px]">{step}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal>
                <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
                  <div>
                    <Eyebrow>What it does</Eyebrow>
                    <ul className="mt-5 space-y-3">
                      {study.capabilities.map((capability) => (
                        <li key={capability} className="flex items-start gap-3">
                          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center bg-primary/10 text-primary">
                            <Check className="size-2.5" strokeWidth={2.8} aria-hidden="true" />
                          </span>
                          <span className="text-[12.5px] leading-5 text-body">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Eyebrow>Problems addressed</Eyebrow>
                    <ul className="mt-5 space-y-3">
                      {study.businessValue.map((value) => (
                        <li key={value} className="flex items-start gap-3">
                          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center bg-primary/10 text-primary">
                            <Check className="size-2.5" strokeWidth={2.8} aria-hidden="true" />
                          </span>
                          <span className="text-[12.5px] leading-5 text-body">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <SectionHeading
                  eyebrow="Extending the system"
                  title="Possible next increments."
                  description="These are not commitments. They are the kind of extensions the current architecture could support if the need becomes real."
                  className="mb-6"
                />
                <ul className="flex flex-wrap gap-2">
                  {study.futureEnhancements.map((enhancement) => (
                    <li key={enhancement} className="border border-line bg-paper px-3 py-2 text-[11.5px] font-medium text-body">
                      {enhancement}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="space-y-4">
              <Reveal className="border border-line bg-paper p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Technologies used
                </p>
                <div className="mt-5">
                  {study.techGroups.map((group) => (
                    <div key={group.label} className="border-t border-line py-4 first:border-t-0 first:pt-0 last:pb-0">
                      <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-body/70">
                        {group.label}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span key={item} className="border border-line bg-white px-2 py-1 text-[10.5px] font-medium text-body">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={50} className="border border-line bg-white p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Project detail
                </p>
                <dl className="mt-4">
                  <DetailRow label="Project status" value={study.label} />
                  <DetailRow label="Designed for" value={study.builtFor} />
                  <DetailRow label="Category" value={study.category} />
                  <DetailRow label="Scope" value={`${study.features.length} defined capabilities`} />
                  <DetailRow label="Outcome evidence" value="Not published" />
                </dl>
              </Reveal>

              <Reveal delay={80} className="relative overflow-hidden bg-[#05132e] p-5 text-white shadow-dark-panel sm:p-6">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-35" />
                <div className="relative">
                  <Eyebrow tone="dark">Similar problem?</Eyebrow>
                  <h3 className="mt-4 text-[1.15rem] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
                    Bring the constraint, not a finished brief.
                  </h3>
                  <p className="mt-3 text-[12.5px] leading-6 text-white/65">
                    We will separate the symptom from the system issue and propose the smallest
                    useful first release.
                  </p>
                  <ButtonLink
                    to="/contact"
                    onClick={() => trackConsultationClick("case_study_sidebar")}
                    variant="on-dark"
                    withArrow
                    className="mt-5 w-full"
                  >
                    Discuss Your Project
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal delay={100} className="border border-line bg-white p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Related services
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {study.relatedServices.map((service) => {
                    const serviceSlug = serviceNameToSlug[service];
                    return (
                      <li key={service}>
                        {serviceSlug ? (
                          <Link
                            to={`/services/${serviceSlug}`}
                            className="inline-flex border border-line bg-paper px-2.5 py-1.5 text-[10.5px] font-medium text-body transition-colors hover:border-primary/30 hover:text-primary"
                          >
                            {service}
                          </Link>
                        ) : (
                          <span className="inline-flex border border-line bg-paper px-2.5 py-1.5 text-[10.5px] font-medium text-body">
                            {service}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-py border-y border-line bg-paper">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                title="What is worth clarifying."
                description="These answers describe the documented system, not a promised commercial result."
                action={
                  <Link
                    to="/contact"
                    onClick={() => trackContactClick("case_study_faq")}
                    className="link-arrow"
                  >
                    Ask a question
                    <Mail className="size-4" aria-hidden="true" />
                  </Link>
                }
              />
            </Reveal>
            <Reveal delay={60}>
              <div className="border-t border-line">
                {study.faqs.map((faq, index) => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={index} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="More projects"
              title="Other systems in the record."
              action={
                <Link to="/case-studies" className="link-arrow">
                  View all projects
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              }
              className="mb-8 lg:mb-10"
            />
          </Reveal>
          <Reveal delay={50}>
            <RelatedProjects currentSlug={study.slug} />
          </Reveal>
        </div>
      </section>

      <ClosingCta
        eyebrow="Project enquiry"
        title="Have a similar constraint to solve?"
        description={`Bring the context behind ${study.title.toLowerCase()}. We will review the requirement and recommend a practical place to start.`}
      />
    </>
  );
}
