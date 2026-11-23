import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { getCaseStudySeoDescription, getCaseStudySeoTitle, SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { JsonLd } from "@/components/common/JsonLd";
import { Reveal } from "@/components/system/Reveal";
import { DetailFAQ } from "@/components/common/DetailFAQ";
import { DetailEnquiryCard } from "@/components/common/DetailEnquiryCard";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";
import { localSrcSet } from "@/utils/images";
import { trackConsultationClick } from "@/utils/analytics";

const HERO_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='760' viewBox='0 0 1200 760'%3E%3Crect width='1200' height='760' fill='%23f8fafc'/%3E%3Cpath d='M500 360h200v50a10 10 0 01-10 10H510a10 10 0 01-10-10v-50z' fill='%23e2e8f0'/%3E%3Cpath d='M480 348a14 14 0 0114-14h212a14 14 0 0114 14v12H480v-12z' fill='%23cbd5e1'/%3E%3C/svg%3E";

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;
  const related = study ? caseStudies.filter((s) => s.slug !== study.slug).slice(0, 3) : [];

  useSEO({
    title: study ? getCaseStudySeoTitle(study.slug, study.title) : SEO_TITLES.caseStudyNotFound,
    description: study ? getCaseStudySeoDescription(study.slug, study.title) : SEO_DESCRIPTIONS.caseStudyNotFound,
    canonical: study ? `https://www.yesbe.tech/case-studies/${study.slug}` : "https://www.yesbe.tech/case-studies",
  });

  if (!study) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-white px-6 pt-24">
        <div className="max-w-md text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17154C]">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#101018]">Project not found</h1>
          <p className="mt-3 text-sm leading-6 text-[#454550]">The project you are looking for does not exist or has moved.</p>
          <button type="button" onClick={() => navigate("/case-studies")} className="mt-7 inline-flex items-center gap-2 rounded-[12px] bg-[#17154C] px-5 py-3 text-sm font-semibold text-white">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${study.title} — YESBE Technologies`,
          description: study.shortOverview,
          url: `https://www.yesbe.tech/case-studies/${study.slug}`,
          publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: study.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />

      <section className="bg-white pb-10 pt-[calc(76px+2rem)] sm:pb-12 sm:pt-[calc(76px+2.5rem)] lg:pb-14">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Projects", href: "/case-studies" }, { label: study.title }]} />
          <Reveal className="mt-8 max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17154C]">{study.category}</p>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[#101018]">{study.title}</h1>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#454550] sm:text-[17px]">{study.shortOverview}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#D9D9E3] bg-[#F7F7FA] px-3 py-1.5 text-[11px] font-semibold text-[#17154C]">{study.label}</span>
              <span className="text-[12px] text-[#454550]">Project record / capability example</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F7F7FA] py-8 sm:py-10">
        <div className="container-page">
          <Reveal>
            <div className="overflow-hidden rounded-[24px] border border-[#E5E5EB] bg-[#071a3a] shadow-[0_20px_60px_rgba(23,21,76,0.08)]">
              <img
                src={study.image}
                srcSet={localSrcSet(study.image, [480, 800])}
                sizes="(min-width: 1280px) 1200px, 100vw"
                alt={study.imageAlt}
                width={1600}
                height={900}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={(e) => { e.currentTarget.removeAttribute('srcset'); e.currentTarget.src = HERO_FALLBACK; }}
                className="aspect-[16/8.5] w-full object-cover"
              />
            </div>
            <p className="mt-3 text-[11px] leading-5 text-[#454550]/80">
              {study.imageType === "screenshot" ? "Project interface preview." : "Conceptual project visual."} This record describes project scope and capabilities; it does not claim verified client outcomes unless separately documented.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
            <div className="space-y-12">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17154C]">Project Overview</p>
                <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#101018]">Overview</h2>
                <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#454550]">{study.overview}</p>
              </Reveal>

              <div className="grid gap-6 border-y border-[#E5E5EB] py-10 sm:grid-cols-2">
                <Reveal>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17154C]">Problem Addressed</p>
                  <p className="mt-4 text-[14px] leading-7 text-[#454550]">{study.problem}</p>
                </Reveal>
                <Reveal delay={60}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17154C]">Our Solution</p>
                  <p className="mt-4 text-[14px] leading-7 text-[#454550]">{study.solution}</p>
                </Reveal>
              </div>

              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17154C]">Key Features</p>
                <h2 className="mt-3 text-[clamp(1.7rem,2.8vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#101018]">Capabilities delivered in this build.</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {study.features.map((feature) => (
                    <div key={feature.title} className="rounded-[18px] border border-[#E5E5EB] bg-[#F7F7FA] p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#17154C]" aria-hidden="true" />
                        <div>
                          <h3 className="text-[14px] font-semibold text-[#101018]">{feature.title}</h3>
                          <p className="mt-2 text-[13px] leading-6 text-[#454550]">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17154C]">Technology Stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-[#D9D9E3] bg-white px-3 py-1.5 text-[12px] font-medium text-[#454550]">{tech}</span>
                  ))}
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-[20px] border border-[#17154C]/12 bg-[#F7F7FA] p-6 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17154C]">Project Outcome</p>
                  <p className="mt-4 text-[14px] leading-7 text-[#454550]">{study.outcome}</p>
                </div>
              </Reveal>
            </div>

            <aside className="space-y-4">
              <Reveal className="rounded-[20px] border border-[#E5E5EB] bg-[#F7F7FA] p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#17154C]">Project Details</p>
                <dl className="mt-4 space-y-4 text-[13px]">
                  <div className="border-t border-[#E5E5EB] pt-4 first:border-t-0 first:pt-0">
                    <dt className="text-[#454550]/75">Category</dt>
                    <dd className="mt-1 font-medium text-[#101018]">{study.category}</dd>
                  </div>
                  <div className="border-t border-[#E5E5EB] pt-4">
                    <dt className="text-[#454550]/75">Status</dt>
                    <dd className="mt-1 font-medium text-[#101018]">{study.label}</dd>
                  </div>
                  <div className="border-t border-[#E5E5EB] pt-4">
                    <dt className="text-[#454550]/75">Capabilities</dt>
                    <dd className="mt-1 font-medium text-[#101018]">{study.features.length} documented features</dd>
                  </div>
                </dl>
              </Reveal>
              <Reveal delay={60} className="rounded-[20px] bg-[#17154C] p-5 text-white sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">Need something similar?</p>
                <h3 className="mt-3 text-[1.2rem] font-semibold leading-[1.25] tracking-[-0.03em]">Let’s discuss your project requirements.</h3>
                <p className="mt-3 text-[13px] leading-6 text-white/72">Share your goals, workflow, and constraints. We’ll recommend a practical next step.</p>
                <Link
                  to="/contact"
                  onClick={() => trackConsultationClick("case_study_sidebar")}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-white px-4 py-3 text-[13px] font-semibold text-[#17154C] transition-colors hover:bg-[#F0F2FF]"
                >
                  Discuss Your Project <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <DetailFAQ
        faqs={study.faqs}
        title="Questions about this project type."
        description="Answers are based on the documented scope and common implementation considerations for similar systems."
      />

      <section className="bg-[#F7F7FA] py-10 sm:py-12">
        <div className="container-page">
          <DetailEnquiryCard
            subject={study.title}
            heading="Have a Similar Project in Mind?"
            support="Tell us about your business requirements, and we’ll help you plan the right digital solution."
            buttonLabel="Discuss Your Project"
          />
        </div>
      </section>

      <section className="border-t border-[#E5E5EB] bg-white py-12 sm:py-14">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17154C]">More Projects</p>
                <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#101018]">Explore related work.</h2>
              </div>
              <Link to="/case-studies" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#17154C] hover:text-[#0F1038]">
                View all projects <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Reveal key={item.slug}>
                <Link to={`/case-studies/${item.slug}`} className="group block overflow-hidden rounded-[18px] border border-[#E5E5EB] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(23,21,76,0.08)] motion-reduce:transform-none">
                  <div className="aspect-[16/10] overflow-hidden bg-[#071a3a]">
                    <img src={item.image} srcSet={localSrcSet(item.image, [480, 800])} sizes="(min-width: 768px) 33vw, 100vw" alt={item.imageAlt} width={1200} height={760} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none" />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#17154C]">{item.category}</p>
                    <h3 className="mt-2 text-[15px] font-semibold leading-[1.35] text-[#101018] group-hover:text-[#17154C]">{item.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
