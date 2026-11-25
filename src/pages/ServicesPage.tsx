import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useHeroImagePreload } from "@/hooks/useHeroImagePreload";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/system/Reveal";
import { EditorialHeading } from "@/components/common/EditorialHeading";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DeliveryRail } from "@/components/phase2/DeliveryRail";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import { CORE_SERVICES, DELIVERY_STAGES } from "@/data/phase2";
import { getSolutionBySlug, solutions } from "@/data/solutions";
import { trackConsultationClick } from "@/utils/analytics";

const DIRECTORY_SERVICE_SLUGS = [
  "blockchain",
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

const SOLUTIONS_HERO_SRC = "/images/hero/newsolutionherosection.webp";
const SOLUTIONS_HERO_MOBILE_SRC = "/images/hero/newsolutionherosection-960.webp";
const SOLUTIONS_HERO_MOBILE_SRCSET = [
  "/images/hero/newsolutionherosection-640.webp 640w",
  "/images/hero/newsolutionherosection-960.webp 960w",
].join(", ");
const SOLUTIONS_HERO_SRCSET = [
  "/images/hero/newsolutionherosection-640.webp 640w",
  "/images/hero/newsolutionherosection-960.webp 960w",
  "/images/hero/newsolutionherosection-1280.webp 1280w",
  SOLUTIONS_HERO_SRC + " 1774w",
].join(", ");
const SOLUTIONS_HERO_MOBILE_SIZES = "100vw";
const SOLUTIONS_HERO_SIZES = "(min-width: 1024px) 92vw, 100vw";
const SOLUTIONS_HERO_MOBILE_MEDIA = "(max-width: 767px)";
const SOLUTIONS_HERO_DESKTOP_MEDIA = "(min-width: 768px)";

export function ServicesPage() {
  useHeroImagePreload({
    href: SOLUTIONS_HERO_MOBILE_SRC,
    srcSet: SOLUTIONS_HERO_MOBILE_SRCSET,
    sizes: SOLUTIONS_HERO_MOBILE_SIZES,
    type: "image/webp",
    media: SOLUTIONS_HERO_MOBILE_MEDIA,
  });
  useHeroImagePreload({
    href: SOLUTIONS_HERO_SRC,
    srcSet: SOLUTIONS_HERO_SRCSET,
    sizes: SOLUTIONS_HERO_SIZES,
    type: "image/webp",
    media: SOLUTIONS_HERO_DESKTOP_MEDIA,
  });
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

      <section className="relative isolate flex min-h-[640px] overflow-hidden bg-white pt-[76px] text-[#11124D] sm:min-h-[680px] lg:min-h-[720px]">
        <div className="absolute inset-0 -z-20 bg-white" aria-hidden="true" />
        <picture className="contents">
          <source
            media={SOLUTIONS_HERO_MOBILE_MEDIA}
            type="image/webp"
            srcSet={SOLUTIONS_HERO_MOBILE_SRCSET}
            sizes={SOLUTIONS_HERO_MOBILE_SIZES}
          />
          <img
            src={SOLUTIONS_HERO_SRC}
            srcSet={SOLUTIONS_HERO_SRCSET}
            sizes={SOLUTIONS_HERO_SIZES}
            alt=""
            aria-hidden="true"
            width={1774}
            height={887}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-full object-cover object-[78%_center] sm:object-[74%_center] lg:w-[92%] lg:object-right"
          />
        </picture>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_34%,rgba(255,255,255,0.96)_44%,rgba(255,255,255,0.72)_56%,rgba(255,255,255,0.18)_72%,rgba(255,255,255,0)_88%)] max-sm:bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.96)_28%,rgba(255,255,255,0.72)_46%,rgba(255,255,255,0.16)_66%,rgba(255,255,255,0)_100%)]"
        />

        <div className="mx-auto flex w-full max-w-[1280px] items-center px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-[650px]">
            <div className="max-w-[720px]">
              <EditorialHeading line1="OUR" line2="Solutions" className="text-[#11124D]" />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Link
                to="/contact"
                onClick={() => trackConsultationClick("services_hero")}
                className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 bg-[#11124D] px-7 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(17,18,77,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0C0D3A] hover:shadow-[0_14px_34px_rgba(17,18,77,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11124D] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Discuss Your Project
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a
                href="#directory"
                className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 border border-[#11124D] bg-white/70 px-7 text-[15px] font-semibold text-[#11124D] backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#11124D]/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11124D] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {directoryServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} as="article" delay={index * 30} className="h-full">
                  <Link
                    to={`/services/${service.slug}`}
                    className="solutions-card-hover group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-xl border border-[#E5E5EB] p-7 shadow-[0_1px_2px_rgba(23,21,76,0.04)] transition-[transform,box-shadow,background-color,border-color] duration-[350ms] ease-out hover:border-[#11124D] focus-visible:border-[#11124D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11124D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F5FA] motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <span className="flex size-11 items-center justify-center rounded-lg bg-[var(--solutions-card-icon-bg)] text-[var(--solutions-card-fg)] transition-colors duration-[350ms] ease-out">
                        <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        className="size-5 shrink-0 text-[var(--solutions-card-fg)] transition-[transform,color] duration-[350ms] ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="relative z-10 mt-6 text-[1.25rem] font-bold leading-[1.25] tracking-[-0.02em] text-[var(--solutions-card-fg)] transition-colors duration-[350ms] ease-out">
                      {service.title}
                    </h3>
                    <p className="relative z-10 mt-3 text-[14px] leading-7 text-[var(--solutions-card-body)] transition-colors duration-[350ms] ease-out sm:text-[15px]">
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
