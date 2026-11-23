import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { EditorialHeading } from "@/components/common/EditorialHeading";
import { Reveal } from "@/components/system/Reveal";
import { caseStudies } from "@/data/caseStudies";
import { trackConsultationClick } from "@/utils/analytics";
import { localSrcSet } from "@/utils/images";
import { cn } from "@/utils/cn";

const FILTERS = ["All Projects", "E-Commerce Platform", "Restaurant Technology", "Education Software", "Corporate Website", "AI & Automation", "Enterprise Software", "Data Analytics", "Digital Marketing", "Business Automation"] as const;
type Filter = (typeof FILTERS)[number];

export function CaseStudiesPage() {
  const [filter, setFilter] = useState<Filter>("All Projects");
  const filtered = useMemo(
    () => (filter === "All Projects" ? caseStudies : caseStudies.filter((s) => s.category === filter)),
    [filter],
  );

  useSEO({
    title: SEO_TITLES.caseStudies,
    description: SEO_DESCRIPTIONS.caseStudies,
    canonical: "https://www.yesbe.tech/case-studies",
  });

  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: SEO_TITLES.caseStudies,
          description: SEO_DESCRIPTIONS.caseStudies,
          url: "https://www.yesbe.tech/case-studies",
          publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
        }}
      />
      <Breadcrumbs items={[{ label: "Projects" }]} schemaOnly />

      <section className="border-b border-[#E5E5EB] bg-white pb-10 pt-[calc(76px+2rem)] sm:pb-12 sm:pt-[calc(76px+2.5rem)] lg:pb-14 lg:pt-[calc(76px+3rem)]">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8">
            <Reveal>
              <div>
                <EditorialHeading line1="FEATURED" line2="Projects" variant="hero" />
              </div>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#454550] sm:text-[16px]">
                A selection of digital platforms, systems, and workflows designed and built by YESBE. Each project record describes the scope, approach, and capabilities delivered.
              </p>
            </Reveal>
            <Reveal delay={60}>
              <Link
                to="/contact"
                onClick={() => trackConsultationClick("case_studies_hero")}
                className="group inline-flex h-[56px] items-center justify-between gap-4 rounded-[16px] bg-[#17154C] px-6 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_14px_32px_rgba(23,21,76,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17154C] focus-visible:ring-offset-2 motion-reduce:transform-none"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap gap-2" aria-label="Filter projects">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={cn(
                  "rounded-full border px-3.5 py-2 text-[11px] font-semibold tracking-[0.02em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17154C]",
                  filter === item
                    ? "border-[#17154C] bg-[#17154C] text-white"
                    : "border-[#D9D9E3] bg-white text-[#454550] hover:border-[#17154C]/35 hover:text-[#17154C]",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7FA] py-12 sm:py-14 lg:py-16">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((study, index) => (
              <Reveal key={study.slug} delay={index * 40}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E5E5EB] bg-white shadow-[0_1px_2px_rgba(23,21,76,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#17154C]/20 hover:shadow-[0_20px_45px_rgba(23,21,76,0.08)] motion-reduce:transform-none">
                  <Link to={`/case-studies/${study.slug}`} className="block overflow-hidden bg-[#071a3a]" aria-label={`Open ${study.title}`}>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={study.image}
                        srcSet={localSrcSet(study.image, [480, 800])}
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        alt={study.imageAlt}
                        width={1400}
                        height={875}
                        loading={index < 3 ? "eager" : "lazy"}
                        fetchPriority={index < 3 ? "high" : "auto"}
                        decoding="async"
                        className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#17154C]/75">
                      <span className="text-[#17154C]">{study.category}</span>
                      <span aria-hidden="true">/</span>
                      <span>{study.label}</span>
                    </div>
                    <h2 className="mt-4 text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.03em] text-[#101018]">
                      <Link to={`/case-studies/${study.slug}`} className="transition-colors hover:text-[#17154C]">
                        {study.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-[14px] leading-7 text-[#454550]">{study.shortOverview}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {study.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="border border-[#17154C]/12 bg-[#F7F7FA] px-2 py-1 text-[10px] font-medium text-[#454550]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 border-t border-[#E5E5EB] pt-5">
                      <Link
                        to={`/case-studies/${study.slug}`}
                        className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#17154C] transition-colors hover:text-[#0F1038]"
                      >
                        View Project
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E5EB] bg-white py-14 sm:py-16">
        <div className="container-page">
          <Reveal>
            <div className="rounded-[24px] border border-[#E5E5EB] bg-[#F7F7FA] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17154C]">Project Enquiry</p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[#101018]">
                  Have a similar project in mind?
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-[#454550]">
                  Share your requirements and we’ll help you define the right scope, technology approach, and next steps.
                </p>
              </div>
              <Link
                to="/contact"
                onClick={() => trackConsultationClick("case_studies_bottom_cta")}
                className="mt-6 inline-flex h-[52px] items-center justify-center gap-2 rounded-[14px] bg-[#17154C] px-6 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_14px_32px_rgba(23,21,76,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17154C] focus-visible:ring-offset-2 motion-reduce:transform-none lg:mt-0"
              >
                Discuss Your Project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
