import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Target,
  Waypoints,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import {
  getIndustrySeoDescription,
  getIndustrySeoTitle,
  SEO_DESCRIPTIONS,
  SEO_TITLES,
} from "@/constants/seoTitles";
import { getIndustryBySlug } from "@/data/industries";
import { getSolutionBySlug, type SolutionDetail } from "@/data/solutions";
import { caseStudies } from "@/data/caseStudies";
import { getIndustryProfile, getProjectMeta } from "@/data/phase3";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { JsonLd } from "@/components/common/JsonLd";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import { Reveal } from "@/components/system/Reveal";
import { IndustryArchitecture } from "@/components/phase3/ArchitectureDiagram";
import { trackConsultationClick } from "@/utils/analytics";
import { localSrcSet } from "@/utils/images";
import { cn } from "@/utils/cn";

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `industry-faq-panel-${index}`;
  const buttonId = `industry-faq-button-${index}`;

  return (
    <div className="border-t border-line">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="group flex w-full items-start justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        >
          <span className="text-[14px] font-semibold leading-6 tracking-[-0.01em] text-ink transition-colors group-hover:text-primary sm:text-[15px]">
            {question}
          </span>
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center border border-line text-body transition-colors group-hover:border-primary/30 group-hover:text-primary">
            <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="pb-6 pr-8">
        <p className="max-w-2xl text-[13px] leading-6 text-body">{answer}</p>
      </div>
    </div>
  );
}

function RelatedProjectCard({ slug }: { slug: string }) {
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return null;
  const accent = getProjectMeta(study.slug).accent;

  return (
    <Link
      to={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-line bg-white transition-colors hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#071a3a]">
        <img
          src={study.image}
          srcSet={localSrcSet(study.image, [480, 800])}
          sizes="(min-width: 1024px) 30vw, 100vw"
          alt={`${study.title} — illustrative interface preview`}
          width={1200}
          height={760}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />
        <span className="absolute bottom-3 left-3 border border-white/20 bg-[#05132e]/60 px-2 py-1 text-[8.5px] font-semibold uppercase tracking-[0.12em] text-white/75 backdrop-blur-sm">
          {study.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.13em] text-primary">
          <span className="h-1.5 w-1.5" style={{ backgroundColor: accent }} aria-hidden="true" />
          {study.category}
        </p>
        <h3 className="mt-2 text-[15px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink transition-colors group-hover:text-primary">
          {study.title}
        </h3>
        <p className="mt-2 flex-1 text-[12px] leading-5 text-body">{study.shortOverview}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-primary">
          Review the project
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const industry = slug ? getIndustryBySlug(slug) : undefined;

  useSEO({
    title: industry ? getIndustrySeoTitle(industry.slug, industry.title) : SEO_TITLES.industryNotFound,
    description: industry ? getIndustrySeoDescription(industry.slug, industry.title) : SEO_DESCRIPTIONS.industryNotFound,
    canonical: industry ? `https://www.yesbe.tech/industries/${industry.slug}` : "https://www.yesbe.tech/industries",
  });

  if (!industry) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-paper px-6 pt-24">
        <div className="max-w-md text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-ink">Industry not found</h1>
          <p className="mt-3 text-sm leading-6 text-body">
            The industry page you are looking for does not exist or has moved.
          </p>
          <button type="button" onClick={() => navigate("/industries")} className="btn-primary mt-7">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to industries
          </button>
        </div>
      </div>
    );
  }

  const profile = getIndustryProfile(industry);
  const Icon = industry.icon;
  const relatedServices = profile.relatedServiceSlugs
    .map((serviceSlug) => getSolutionBySlug(serviceSlug))
    .filter((service): service is SolutionDetail => Boolean(service));
  const relatedProjects = profile.relatedProjectSlugs
    .map((projectSlug) => caseStudies.find((study) => study.slug === projectSlug))
    .filter((study): study is NonNullable<typeof study> => Boolean(study));

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${industry.title} — YESBE Technologies`,
        description: industry.description,
        url: `https://www.yesbe.tech/industries/${industry.slug}`,
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: industry.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />

      <section className="relative isolate overflow-hidden bg-[#05132e] pt-[76px] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 size-[38rem] rounded-full"
          style={{ background: `radial-gradient(circle, ${profile.visual.accent}2e, transparent 66%)` }}
        />
        <div className="container-page relative py-10 sm:py-14 lg:py-16">
          <Breadcrumbs
            items={[{ label: "Industries", href: "/industries" }, { label: industry.title }]}
            className="text-white/62 [&_[aria-current=page]]:text-white"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="flex size-10 items-center justify-center border border-white/20 bg-white/[0.05]"
                  style={{ color: profile.visual.accent }}
                >
                  <Icon className="size-4.5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9fc0ff]">
                  {industry.category}
                </span>
                <span className="h-px w-6 bg-white/20" aria-hidden="true" />
                <span className="text-[10px] font-medium text-white/60">Industry view</span>
              </div>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.65rem,5.9vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
                {industry.title}
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/68 sm:text-[17px] sm:leading-8">
                {profile.summary}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  onClick={() => trackConsultationClick("industry_hero")}
                  className="group inline-flex min-h-[3.25rem] items-center justify-between gap-8 bg-white px-5 py-3 text-sm font-semibold text-[#05132e] transition-colors hover:bg-[#dce8ff] sm:min-w-56"
                >
                  Discuss your context
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <a href="#industry-challenges" className="btn-on-dark group w-full sm:w-auto">
                  See the working view
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="border border-white/14 bg-white/[0.035] p-2">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#071a3a]">
                  <img
                    src={profile.visual.src}
                    srcSet={localSrcSet(profile.visual.src, [640, 960])}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    alt={profile.visual.alt}
                    width={1200}
                    height={900}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="size-full object-cover"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,19,46,0.76))]" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 border-t border-white/15 pt-3">
                    <div>
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/50">
                        Industry operating view
                      </p>
                      <p className="mt-1 text-[11.5px] font-medium text-white/85">{industry.category}</p>
                    </div>
                    <Waypoints className="size-4" style={{ color: profile.visual.accent }} aria-hidden="true" />
                  </div>
                </div>
              </div>
              <p className="mt-3 border-l border-white/15 pl-3 text-[10px] leading-5 text-white/60">
                Industry context and reference architecture, not a client deployment record.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="industry-challenges" className="section-py scroll-mt-24 bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Operating context"
                title="Where the work usually breaks down."
                description={profile.context}
              />
              <div className="mt-6 border border-line bg-paper p-4">
                <div className="flex items-center gap-3">
                  <Target className="size-4 text-primary" strokeWidth={1.7} aria-hidden="true" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Typical constraints, not client claims
                  </p>
                </div>
                <p className="mt-3 text-[11.5px] leading-5 text-body">
                  These are recurring patterns in the industry. A real engagement starts by testing
                  which of them actually apply to your operation.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {profile.constraints.map((constraint, index) => (
                <Reveal key={constraint} delay={index * 35} className="bg-white p-5 sm:p-6">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-[13px] leading-6 text-body">{constraint}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-py border-y border-line bg-paper">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Connected capabilities"
              title="What the system can cover."
              description="Capabilities are combined against the constraint, not sold as a fixed package. Select the services that fit the problem."
              className="mb-8 lg:mb-10"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industry.features.slice(0, 6).map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Reveal key={feature.title} delay={index * 35} className="border border-line bg-white p-5 sm:p-6">
                  <span className="flex size-9 items-center justify-center border border-line bg-paper text-primary">
                    <FeatureIcon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-[14px] font-semibold leading-5 text-ink">{feature.title}</h2>
                  <p className="mt-2 text-[12px] leading-5 text-body">{feature.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Technology applications"
                title="Where the system earns its place."
                description="Practical areas where technology can remove a handoff, shorten a lookup or make an exception visible."
              />
            </Reveal>
            <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {profile.applications.map((application, index) => (
                <Reveal key={application.title} delay={index * 35} className="bg-white p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <Layers className="size-4 text-primary" strokeWidth={1.7} aria-hidden="true" />
                    <span className="font-mono text-[10px] text-body/65">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="mt-5 text-[14px] font-semibold leading-5 text-ink">{application.title}</h2>
                  <p className="mt-2 text-[12px] leading-5 text-body">{application.description}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-10">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Reference architecture"
                title="How the pieces connect."
                description="A starting model for the industry workflow. The final boundary is agreed after reviewing existing systems, access rules and data quality."
              />
            </div>
            <IndustryArchitecture steps={profile.architecture} accent={profile.visual.accent} />
          </Reveal>
        </div>
      </section>

      <section className="section-py border-y border-line bg-paper">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Related work"
              title="Existing project records that apply."
              description="These are portfolio builds rather than industry client references. They show relevant system patterns, not a claimed sector history."
              action={
                <Link to="/case-studies" className="link-arrow">
                  View all projects
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              }
              className="mb-8"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((study) => (
              <RelatedProjectCard key={study.slug} slug={study.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Related services"
              title="Capabilities that carry the work."
              action={
                <Link to="/services" className="link-arrow">
                  All services
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              }
              className="mb-8"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Reveal key={service.slug} delay={index * 35} className="border border-line bg-paper p-5">
                  <div className="flex items-center justify-between gap-3">
                    <ServiceIcon className="size-4 text-primary" strokeWidth={1.7} aria-hidden="true" />
                    <ArrowUpRight className="size-3.5 text-body/55" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-[14px] font-semibold leading-5 text-ink">
                    <Link to={`/services/${service.slug}`} className="transition-colors hover:text-primary">
                      {service.title}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-2 text-[11.5px] leading-5 text-body">{service.description}</p>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                title="What is worth clarifying."
                description="These answers describe the working model. They are not a promise of a specific result or commercial outcome."
              />
            </Reveal>
            <Reveal delay={50}>
              <div className="border-b border-line">
                {industry.faq.map((faq, index) => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={index} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="Industry enquiry"
        title="Bring the operating problem into the conversation."
        description={`Tell us how ${industry.title.toLowerCase()} work moves today, which systems are already in place and what the next decision needs to support.`}
      />
    </>
  );
}
