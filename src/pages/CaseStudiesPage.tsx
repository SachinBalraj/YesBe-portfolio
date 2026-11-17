import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Layers } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import { Eyebrow } from "@/components/system/Eyebrow";
import { Reveal } from "@/components/system/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { CaseStudy } from "@/data/caseStudies";
import {
  getProjectMeta,
  orderedCaseStudies,
  PROJECT_FILTERS,
  type ProjectFilter,
} from "@/data/phase3";
import { trackConsultationClick } from "@/utils/analytics";
import { localSrcSet } from "@/utils/images";
import { cn } from "@/utils/cn";

function StatusLine({ study, dark = false }: { study: CaseStudy; dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-[9.5px] font-semibold uppercase tracking-[0.13em]",
        dark ? "text-white/62" : "text-body/75",
      )}
    >
      <span className={dark ? "text-[#9fc0ff]" : "text-primary"}>{study.category}</span>
      <span aria-hidden="true">/</span>
      <span>{study.builtFor}</span>
      <span aria-hidden="true">/</span>
      <span>{study.label}</span>
    </div>
  );
}

function TechList({ study, dark = false }: { study: CaseStudy; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {study.technologies.slice(0, 5).map((tech) => (
        <span
          key={tech}
          className={cn(
            "border px-2 py-1 text-[9.5px] font-medium",
            dark ? "border-white/15 bg-white/[0.045] text-white/65" : "border-line bg-paper text-body",
          )}
        >
          {tech}
        </span>
      ))}
      {study.technologies.length > 5 && (
        <span className={cn("px-1 py-1 text-[9.5px]", dark ? "text-white/60" : "text-body/70")}>
          {`+${study.technologies.length - 5}`}
        </span>
      )}
    </div>
  );
}

function ProjectImage({
  study,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  study: CaseStudy;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("group relative overflow-hidden bg-[#071a3a]", className)}>
      <img
        src={study.image}
        srcSet={localSrcSet(study.image, [480, 800])}
        sizes={sizes}
        alt={`${study.title} — illustrative interface preview`}
        width={1200}
        height={760}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,19,46,0.72))] opacity-90"
      />
      <span className="absolute bottom-3 left-3 border border-white/20 bg-[#05132e]/60 px-2 py-1 text-[8.5px] font-semibold uppercase tracking-[0.13em] text-white/75 backdrop-blur-sm">
        Illustrative interface preview
      </span>
    </div>
  );
}

function FeaturedSpotlight({ study }: { study: CaseStudy }) {
  const accent = getProjectMeta(study.slug).accent;

  return (
    <Reveal>
      <article className="overflow-hidden border border-line bg-white">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          <Link
            to={`/case-studies/${study.slug}`}
            className="group relative block min-h-[22rem] overflow-hidden bg-[#071a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary lg:min-h-[36rem]"
          >
            <img
              src={study.image}
              srcSet={localSrcSet(study.image, [480, 800])}
              sizes="(min-width: 1024px) 55vw, 100vw"
              alt={`${study.title} — illustrative interface preview`}
              width={1200}
              height={760}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,19,46,0.9))]" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 border-t border-white/15 pt-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
                  Featured record / 01
                </p>
                <p className="mt-1.5 text-[13px] font-medium text-white">{study.builtFor}</p>
              </div>
              <span
                className="flex size-9 items-center justify-center border border-white/20"
                style={{ color: accent }}
                aria-hidden="true"
              >
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>

          <div className="flex flex-col p-5 sm:p-7 lg:p-9">
            <StatusLine study={study} />
            <h3 className="mt-4 max-w-xl text-[1.75rem] font-semibold leading-[1.06] tracking-[-0.04em] text-ink sm:text-[2.15rem]">
              <Link to={`/case-studies/${study.slug}`} className="transition-colors hover:text-primary">
                {study.title}
              </Link>
            </h3>
            <p className="mt-4 max-w-xl text-[13.5px] leading-6 text-body">{study.shortOverview}</p>

            <div className="mt-6 grid gap-5 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Business challenge
                </p>
                <p className="mt-2 line-clamp-4 text-[12px] leading-5 text-body">{study.problem}</p>
              </div>
              <div>
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Solution approach
                </p>
                <p className="mt-2 line-clamp-4 text-[12px] leading-5 text-body">{study.solution}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-body/70">
                Technology
              </p>
              <div className="mt-2.5">
                <TechList study={study} />
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to={`/case-studies/${study.slug}`}
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-primary transition-colors hover:text-[#173eb5]"
              >
                Read the full project record
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <span className="text-[10px] text-body/70">Outcome evidence: not published</span>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function WideProject({ study, dark = false }: { study: CaseStudy; dark?: boolean }) {
  return (
    <Link
      to={`/case-studies/${study.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
        dark
          ? "border-white/12 bg-[#05132e] text-white hover:border-white/25 focus-visible:ring-white"
          : "border-line bg-white hover:border-line-strong focus-visible:ring-primary",
      )}
    >
      <ProjectImage study={study} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <StatusLine study={study} dark={dark} />
        <h3
          className={cn(
            "mt-3 text-[1.18rem] font-semibold leading-[1.2] tracking-[-0.025em] transition-colors",
            dark ? "text-white group-hover:text-[#9fc0ff]" : "text-ink group-hover:text-primary",
          )}
        >
          {study.title}
        </h3>
        <p className={cn("mt-2.5 flex-1 text-[12.5px] leading-6", dark ? "text-white/60" : "text-body")}>
          {study.shortOverview}
        </p>
        <div className="mt-4">
          <TechList study={study} dark={dark} />
        </div>
        <span
          className={cn(
            "mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold",
            dark ? "text-[#9fc0ff]" : "text-primary",
          )}
        >
          Review the record
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

function AlternatingProject({ study, reverse = false }: { study: CaseStudy; reverse?: boolean }) {
  return (
    <Reveal>
      <article className="grid border border-line bg-white lg:grid-cols-2">
        <Link
          to={`/case-studies/${study.slug}`}
          className={cn("group block min-h-[16rem] overflow-hidden bg-[#071a3a] lg:min-h-[24rem]", reverse && "lg:order-2")}
          aria-label={`Open ${study.title}`}
        >
          <img
            src={study.image}
            srcSet={localSrcSet(study.image, [480, 800])}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={`${study.title} — illustrative interface preview`}
            width={1200}
            height={760}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </Link>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <StatusLine study={study} />
          <h3 className="mt-4 text-[1.55rem] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[1.8rem]">
            <Link to={`/case-studies/${study.slug}`} className="transition-colors hover:text-primary">
              {study.title}
            </Link>
          </h3>
          <p className="mt-4 text-[13px] leading-6 text-body">{study.shortOverview}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {study.capabilities.slice(0, 4).map((capability) => (
              <li key={capability} className="flex items-start gap-2 text-[11.5px] leading-5 text-body">
                <Check className="mt-0.5 size-3 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
                <span className="line-clamp-2">{capability}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <TechList study={study} />
          </div>
          <Link
            to={`/case-studies/${study.slug}`}
            className="mt-6 inline-flex items-center gap-2 self-start text-[12px] font-semibold text-primary transition-colors hover:text-[#173eb5]"
          >
            Explore the project
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectRecordCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group flex h-full flex-col border border-line bg-white transition-colors hover:border-line-strong">
      <Link to={`/case-studies/${study.slug}`} className="block overflow-hidden bg-[#071a3a]">
        <img
          src={study.image}
          srcSet={localSrcSet(study.image, [480, 800])}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          alt={`${study.title} — illustrative interface preview`}
          width={1200}
          height={760}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <StatusLine study={study} />
        <h3 className="mt-2.5 text-[15px] font-semibold leading-[1.28] tracking-[-0.02em] text-ink">
          <Link to={`/case-studies/${study.slug}`} className="transition-colors group-hover:text-primary">
            {study.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[12px] leading-5 text-body">{study.shortOverview}</p>
        <div className="mt-4">
          <TechList study={study} />
        </div>
        <Link
          to={`/case-studies/${study.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-primary"
        >
          Review the record
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function CaseStudiesPage() {
  const [filter, setFilter] = useState<ProjectFilter>("All projects");
  const featured = orderedCaseStudies.slice(0, 5);
  const filtered = useMemo(
    () =>
      filter === "All projects"
        ? orderedCaseStudies
        : orderedCaseStudies.filter((study) => getProjectMeta(study.slug).filters.includes(filter)),
    [filter],
  );

  useSEO({
    title: SEO_TITLES.caseStudies,
    description: SEO_DESCRIPTIONS.caseStudies,
    canonical: "https://www.yesbe.tech/case-studies",
  });

  const selectFilter = (next: ProjectFilter) => {
    setFilter(next);
    document.getElementById("project-record")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.caseStudies,
        description: SEO_DESCRIPTIONS.caseStudies,
        url: "https://www.yesbe.tech/case-studies",
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <Breadcrumbs items={[{ label: "Projects" }]} schemaOnly />

      <section className="relative isolate overflow-hidden bg-[#05132e] pt-[76px] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-12 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(31,78,216,0.3),transparent_66%)]"
        />
        <div className="container-page relative py-10 sm:py-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow tone="dark">Project record</Eyebrow>
              <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,5.8vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
                Technology Solutions Built for Real Business Challenges.
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/68 sm:text-[17px] sm:leading-8">
                Explore how software engineering, automation, enterprise systems, and digital
                experiences can address complex operational needs.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#featured-projects" className="btn-on-dark group w-full sm:w-auto">
                  Explore featured projects
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                </a>
                <Link
                  to="/contact"
                  onClick={() => trackConsultationClick("case_studies_hero")}
                  className="inline-flex min-h-[3.25rem] items-center justify-between gap-8 bg-white px-5 py-3 text-sm font-semibold text-[#05132e] transition-colors hover:bg-[#dce8ff] sm:min-w-56"
                >
                  Discuss a project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-2">
                {orderedCaseStudies.slice(0, 4).map((study, index) => (
                  <Link
                    key={study.slug}
                    to={`/case-studies/${study.slug}`}
                    className={cn(
                      "group relative overflow-hidden border border-white/12 bg-white/[0.04]",
                      index === 0 ? "col-span-2 aspect-[16/7]" : "aspect-[4/3]",
                    )}
                  >
                    <img
                      src={study.image}
                      srcSet={localSrcSet(study.image, [480, 800])}
                      sizes={index === 0 ? "(min-width: 1024px) 38vw, 100vw" : "(min-width: 1024px) 19vw, 50vw"}
                      alt=""
                      width={1200}
                      height={760}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                      className="size-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,19,46,0.88))]" />
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-white/75">
                        {study.category}
                      </span>
                      <ArrowUpRight className="size-3.5 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
              <p className="mt-3 border-l border-white/15 pl-3 text-[10px] leading-5 text-white/60">
                Portfolio builds and demonstration systems. Client names, logos and measured outcomes
                are not published without verifiable evidence.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6" aria-label="Project categories">
            {PROJECT_FILTERS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => selectFilter(category)}
                aria-pressed={filter === category}
                className={cn(
                  "border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.11em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                  filter === category
                    ? "border-white bg-white text-[#05132e]"
                    : "border-white/18 bg-white/[0.035] text-white/65 hover:border-white/40 hover:text-white",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-projects" className="section-py bg-paper scroll-mt-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Featured work"
              title="Systems built around an operating constraint."
              description="The record shows what was designed, how it was structured and what the system can do. It does not attach a client name or a commercial result where none has been verified."
              className="mb-8 lg:mb-10"
            />
          </Reveal>

          <FeaturedSpotlight study={featured[0]} />

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <WideProject study={featured[1]} />
            </Reveal>
            <Reveal delay={50} className="lg:col-span-5">
              <WideProject study={featured[2]} dark />
            </Reveal>
          </div>

          <div className="mt-4 space-y-4">
            <AlternatingProject study={featured[3]} />
            <AlternatingProject study={featured[4]} reverse />
          </div>
        </div>
      </section>

      <section id="project-record" className="section-py scroll-mt-24 border-y border-line bg-white">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Project index"
                title={filter === "All projects" ? "The full project record." : filter}
                description="Filter by the kind of system involved. Every entry remains a portfolio or demonstration record unless its status says otherwise."
              />
              <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.13em] text-body/70" aria-live="polite">
                {`${filtered.length} ${filtered.length === 1 ? "record" : "records"}`}
              </p>
            </div>
          </Reveal>

          <div className="mt-7 flex flex-wrap gap-2" aria-label="Filter projects">
            {PROJECT_FILTERS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={cn(
                  "border px-3 py-2 text-[9.5px] font-semibold uppercase tracking-[0.11em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  filter === category
                    ? "border-[#05132e] bg-[#05132e] text-white"
                    : "border-line bg-paper text-body hover:border-line-strong hover:text-ink",
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((study) => (
                <ProjectRecordCard key={study.slug} study={study} />
              ))}
            </div>
          ) : (
            <div className="mt-6 border border-line bg-paper p-8 text-center">
              <p className="text-[13px] text-body">
                No project records are currently filed under this category.
              </p>
            </div>
          )}

          <div className="mt-8 flex items-start gap-3 border border-line bg-paper p-4">
            <Layers className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.7} aria-hidden="true" />
            <p className="text-[11px] leading-5 text-body">
              Project records describe scope and architecture. They are not client testimonials,
              commercial references or measured business outcomes. Those are added only after written
              approval and verified evidence.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="Start with the constraint"
        title="Have a system problem worth solving properly?"
        description="Bring the workflow, the existing systems and the decision that needs to improve. We will help define the smallest useful path forward."
      />
    </>
  );
}
