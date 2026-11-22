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

function StatusLine({ study }: { study: CaseStudy }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#17154C]/75">
      <span className="text-[#17154C]">{study.category}</span>
      <span aria-hidden="true">/</span>
      <span>{study.builtFor}</span>
      <span aria-hidden="true">/</span>
      <span>{study.label}</span>
    </div>
  );
}

function TechList({ study }: { study: CaseStudy }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {study.technologies.slice(0, 5).map((tech) => (
        <span
          key={tech}
          className="border border-[#17154C]/12 bg-[#F7F7FA] px-2 py-1 text-[10px] font-medium text-[#454550]"
        >
          {tech}
        </span>
      ))}
      {study.technologies.length > 5 && (
        <span className="px-1 py-1 text-[10px] text-[#454550]/80">
          {`+${study.technologies.length - 5}`}
        </span>
      )}
    </div>
  );
}

function ProjectRow({
  study,
  reverse = false,
  priority = false,
}: {
  study: CaseStudy;
  reverse?: boolean;
  priority?: boolean;
}) {
  return (
    <Reveal>
      <article className="grid items-stretch overflow-hidden rounded-2xl border border-[#E5E5EB] bg-white shadow-[0_1px_2px_rgba(23,21,76,0.04)] lg:grid-cols-[45%_55%]">
        <Link
          to={`/case-studies/${study.slug}`}
          className={cn(
            "group relative block overflow-hidden bg-[#071a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#17154C]",
            reverse && "lg:order-2",
          )}
          aria-label={`Open ${study.title}`}
        >
          <div className="aspect-[16/10] h-full min-h-[18rem] lg:min-h-[28rem]">
            <img
              src={study.image}
              srcSet={localSrcSet(study.image, [480, 800])}
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt={`${study.title} — illustrative interface preview`}
              width={1400}
              height={875}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,19,46,0.28))]"
          />
          <span className="absolute bottom-4 left-4 rounded-md border border-white/20 bg-[#05132e]/60 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/80 backdrop-blur-sm">
            Illustrative interface preview
          </span>
        </Link>

        <div className={cn("flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12", reverse && "lg:order-1")}>
          <StatusLine study={study} />
          <h3 className="mt-4 max-w-2xl text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.035em] text-[#101018] sm:text-[2rem]">
            <Link to={`/case-studies/${study.slug}`} className="transition-colors duration-200 hover:text-[#17154C]">
              {study.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#454550]">{study.shortOverview}</p>

          <div className="mt-6 grid gap-5 border-t border-[#E5E5EB] pt-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#17154C]">Business challenge</p>
              <p className="mt-2 text-[13px] leading-6 text-[#454550]">{study.problem}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#17154C]">Solution approach</p>
              <p className="mt-2 text-[13px] leading-6 text-[#454550]">{study.solution}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#17154C]">Capabilities</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {study.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-2 text-[12px] leading-5 text-[#454550]">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-[#17154C]" strokeWidth={2.5} aria-hidden="true" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#17154C]">Key features</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {study.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[12px] leading-5 text-[#454550]">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-[#17154C]" strokeWidth={2.5} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#17154C]">Technology</p>
            <div className="mt-2.5">
              <TechList study={study} />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-[#E5E5EB] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to={`/case-studies/${study.slug}`}
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#17154C] transition-colors duration-200 hover:text-[#0F1038]"
            >
              Review the record
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <span className="text-[11px] text-[#454550]/80">Outcome evidence: not published</span>
          </div>
        </div>
      </article>
    </Reveal>
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

      <section className="bg-white pt-[76px]">
        <div className="container-page py-10 sm:py-12 lg:py-14">
          <h1 className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#17154C] sm:text-[40px] lg:text-[52px]">
            Project Record
          </h1>
        </div>
      </section>

      <section id="featured-projects" className="section-py bg-[#F7F7FA] scroll-mt-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Featured work"
              title="Systems built around an operating constraint."
              description="The record shows what was designed, how it was structured and what the system can do. It does not attach a client name or a commercial result where none has been verified."
              className="mb-8 lg:mb-10"
            />
          </Reveal>

          <div className="space-y-6 lg:space-y-8">
            {featured.map((study, index) => (
              <ProjectRow key={study.slug} study={study} reverse={index % 2 === 1} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section id="project-record" className="section-py scroll-mt-24 border-y border-[#E5E5EB] bg-white">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Project index"
                title={filter === "All projects" ? "The full project record." : filter}
                description="Filter by the kind of system involved. Every entry remains a portfolio or demonstration record unless its status says otherwise."
              />
              <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#454550]/80" aria-live="polite">
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
                  "border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.11em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17154C]",
                  filter === category
                    ? "border-[#17154C] bg-[#17154C] text-white"
                    : "border-[#E5E5EB] bg-[#F7F7FA] text-[#454550] hover:border-[#17154C]/35 hover:text-[#17154C]",
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="mt-8 space-y-6 lg:space-y-8">
              {filtered.map((study, index) => (
                <ProjectRow key={study.slug} study={study} reverse={index % 2 === 1} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-[#E5E5EB] bg-[#F7F7FA] p-8 text-center">
              <p className="text-[13px] text-[#454550]">
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
