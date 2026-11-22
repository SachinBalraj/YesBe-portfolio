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

      <section className="relative isolate flex min-h-[680px] overflow-hidden bg-[#05132e] pt-[76px] text-white lg:min-h-[720px]">
        <picture className="absolute inset-0 -z-20">
          <source srcSet="/solutionsherosection.webp" type="image/webp" />
          <img
            src="/solutionsherosection.png"
            alt=""
            aria-hidden="true"
            width={1774}
            height={887}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[72%_center] max-md:object-[68%_center]"
          />
        </picture>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,19,46,0.88)_0%,rgba(5,19,46,0.72)_34%,rgba(5,19,46,0.30)_58%,rgba(5,19,46,0.08)_76%,rgba(5,19,46,0.18)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,19,46,0.10)_0%,rgba(5,19,46,0.00)_35%,rgba(5,19,46,0.16)_100%)]"
        />

        <div className="mx-auto flex w-full max-w-[1280px] items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-[650px]">
            <h1 className="text-left text-[34px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[56px]">
              <span className="block">OUR</span>
              <span className="block">SOLUTIONS</span>
            </h1>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Link
                to="/contact"
                onClick={() => trackConsultationClick("services_hero")}
                className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 bg-white px-7 text-[15px] font-semibold text-[#05132E] shadow-[0_10px_30px_rgba(5,19,46,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F4F8FF] hover:shadow-[0_14px_34px_rgba(5,19,46,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#05132E]"
              >
                Discuss Your Project
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a
                href="#directory"
                className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 border border-white/45 bg-[#05132E]/25 px-7 text-[15px] font-semibold text-white backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/75 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#05132E]"
              >
                Explore Our Solutions
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
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
