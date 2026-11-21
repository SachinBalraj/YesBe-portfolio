import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/system/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DeliveryRail } from "@/components/phase2/DeliveryRail";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import { CORE_SERVICES, DELIVERY_STAGES } from "@/data/phase2";
import { getSolutionBySlug, solutions } from "@/data/solutions";
import { trackConsultationClick } from "@/utils/analytics";

const DIRECTORY_SERVICE_SLUGS = [
  "it-consulting",
  "digital-transformation",
  "business-automation",
  "ai-solutions",
  "ai-chatbots",
  "data-analytics",
  "power-bi-dashboards",
  "erp-systems",
  "custom-software",
  "web-applications",
  "api-development",
  "database-management",
  "website-development",
  "ecommerce",
  "cloud-devops",
  "seo",
  "geo",
  "aeo",
  "digital-marketing",
] as const;

const directoryServices = DIRECTORY_SERVICE_SLUGS.map((slug) =>
  getSolutionBySlug(slug),
).filter((service): service is NonNullable<typeof service> => Boolean(service));

export function ServicesPage() {
  useSEO({
    title: SEO_TITLES.services,
    description: SEO_DESCRIPTIONS.services,
    canonical: "https://www.yesbe.tech/services",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.services,
        description: SEO_DESCRIPTIONS.services,
        url: "https://www.yesbe.tech/services",
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "YESBE Technology Solutions",
        description: SEO_DESCRIPTIONS.services,
        url: "https://www.yesbe.tech/services",
        numberOfItems: solutions.length,
        itemListElement: solutions.map((service, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: `https://www.yesbe.tech/services/${service.slug}`,
            provider: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
          },
        })),
      }} />

      <section className="relative isolate overflow-hidden bg-[#05132e] pt-[76px] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-10 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(31,78,216,0.24),transparent_66%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-[38%] bg-[linear-gradient(110deg,transparent,rgba(122,167,255,0.06))]"
        />
        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <Breadcrumbs
            items={[{ label: "Services" }]}
            className="text-white/50 [&_[aria-current=page]]:text-white"
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-16">
            <div>
              <span className="eyebrow text-[#8eb5ff]">Capabilities</span>
              <h1 className="mt-5 text-[clamp(2.9rem,6vw,5.1rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
                Technology Solutions
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/65 sm:text-[17px] sm:leading-8">
                AI tools, ERP systems, web development and analytics — built for startups, SMEs and
                enterprises. Explore the full capability set below, or start with the problem you
                need to solve.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  onClick={() => trackConsultationClick("services_hero")}
                  className="group inline-flex min-h-[3.25rem] items-center justify-between gap-8 bg-white px-5 py-3 text-sm font-semibold text-[#05132e] transition-colors hover:bg-[#dce8ff] sm:min-w-52"
                >
                  Discuss Your Project
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <a
                  href="#directory"
                  className="group inline-flex min-h-[3.25rem] items-center justify-between gap-8 border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/[0.06] sm:min-w-52"
                >
                  {`Browse ${solutions.length} services`}
                  <ArrowRight className="size-4 text-[#8eb5ff] transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="border border-white/14 bg-[#05132e]/50 p-1 backdrop-blur-sm">
              <div className="border border-white/10">
                <p className="border-b border-white/10 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Six practice areas
                </p>
                <ul className="divide-y divide-white/10">
                  {CORE_SERVICES.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <li key={service.slug}>
                        <Link
                          to={`/services/${service.slug}`}
                          className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-white/[0.035]"
                        >
                          <span className="font-mono text-[10px] tracking-[0.1em] text-white/30">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <Icon className="size-4 text-[#8eb5ff]" strokeWidth={1.7} aria-hidden="true" />
                          <span className="min-w-0 flex-1 text-[12.5px] font-medium text-white/80 group-hover:text-white">
                            {service.title}
                          </span>
                          <ArrowUpRight className="size-3.5 text-white/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8eb5ff]" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

            <section id="directory" className="bg-[#F5F5FA] py-16 sm:py-20 lg:py-24" aria-label="Service directory">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-[#17154C] sm:text-[2.75rem] lg:text-[3.25rem]">
                Our Solutions
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#171717] sm:text-[17px]">
                Explore our technology services designed to help businesses modernize operations, develop scalable software, automate processes, and accelerate digital growth.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {directoryServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} as="article" delay={index * 30} className="h-full">
                  <Link
                    to={`/services/${service.slug}`}
                    className="group flex h-full min-h-[280px] flex-col rounded-xl border border-[#E5E5EB] bg-white p-7 shadow-[0_1px_2px_rgba(23,21,76,0.04)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#17154C] hover:shadow-[0_12px_28px_rgba(23,21,76,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17154C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F5FA] motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-11 items-center justify-center rounded-lg bg-[#17154C]/[0.06] text-[#17154C]">
                        <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        className="size-5 shrink-0 text-[#17154C] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-6 text-[1.25rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#17154C]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-7 text-[#171717] sm:text-[15px]">
                      {service.description}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-16" aria-label="Service delivery approach">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-4xl">
              <h2 className="text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-[#17154C] sm:text-[2.75rem] lg:text-[3.25rem]">
                A clear path from first conversation to operating system.
              </h2>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#171717] sm:text-[17px]">
                The sequence is adapted to the service, but the principle does not change: each stage produces evidence for the next decision.
              </p>
            </div>
          </Reveal>
          <Reveal delay={60} className="mt-9">
            <DeliveryRail stages={DELIVERY_STAGES} />
          </Reveal>
        </div>
      </section>

      <ClosingCta
        eyebrow="Service enquiry"
        title="Tell us what needs to work better."
        description="We will review the requirement, ask the questions that change the shape of the work, and recommend a practical next step."
      />
    </>
  );
}
