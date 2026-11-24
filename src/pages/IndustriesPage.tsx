import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BadgeCheck, FileKey2, Landmark, Link2, ShieldCheck } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import { Eyebrow } from "@/components/system/Eyebrow";
import { Reveal } from "@/components/system/Reveal";
import { EditorialHeading } from "@/components/common/EditorialHeading";
import { SectionHeading } from "@/components/common/SectionHeading";
import { industries, type IndustryDetail } from "@/data/industries";
import { getIndustryProfile } from "@/data/phase3";
import { trackConsultationClick } from "@/utils/analytics";
import { localSrcSet } from "@/utils/images";
import { cn } from "@/utils/cn";

const prioritySlugs = ["healthcare", "education", "retail", "manufacturing", "logistics", "finance"];

const priorityIndustries = prioritySlugs
  .map((slug) => industries.find((industry) => industry.slug === slug))
  .filter((industry): industry is IndustryDetail => Boolean(industry));

const otherIndustries = industries.filter((industry) => !prioritySlugs.includes(industry.slug));

const BLOCKCHAIN_CARDS = [
  {
    title: "Financial services",
    description: "Support secure transaction records, audit trails, and controlled data sharing for sensitive financial workflows.",
    Icon: Landmark,
  },
  {
    title: "Supply chain traceability",
    description: "Improve visibility across multi-party supply chains with verifiable records for provenance, handoffs, and status events.",
    Icon: Link2,
  },
  {
    title: "Digital identity",
    description: "Enable privacy-aware identity and access workflows where verification and controlled disclosure are important.",
    Icon: FileKey2,
  },
  {
    title: "Secure record verification",
    description: "Create tamper-evident records for approvals, certificates, and business events that require trusted verification.",
    Icon: BadgeCheck,
  },
] as const;

function BlockchainPrivacySection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="blockchain-capability-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(120%_80%_at_50%_100%,rgba(21,93,252,0.12),rgba(255,255,255,0)_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#155DFC]/20 to-transparent" />
      <div className="container-page relative">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#155DFC]">TECHNOLOGY CAPABILITY</p>
            <h2 id="blockchain-capability-heading" className="mt-4 max-w-[14ch] text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#11124D]">
              Blockchain &amp; Data Privacy across industries
            </h2>
            <p className="mt-5 max-w-[42rem] text-[15px] leading-7 text-[#42526B] sm:text-[16px]">
              Blockchain is not an industry by itself; it is a technology capability that can support trusted records, controlled data sharing, and verifiable workflows across multiple sectors. We apply it where transparency, data integrity, and privacy-aware architecture create practical value.
            </p>
            <Link
              to="/services/blockchain"
              className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-[#155DFC] transition-colors duration-300 hover:text-[#0F4FD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155DFC] focus-visible:ring-offset-2"
            >
              Blockchain &amp; Data Privacy
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {BLOCKCHAIN_CARDS.map((item, index) => {
            const Icon = item.Icon;
            return (
              <Reveal key={item.title} delay={index * 50} className="h-full">
                <article className="flex h-full flex-col rounded-[20px] border border-[#DCE9FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FBFF_100%)] p-6 shadow-[0_8px_24px_rgba(17,18,77,0.03)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#155DFC]/25 hover:shadow-[0_16px_36px_rgba(21,93,252,0.08)] motion-reduce:transform-none motion-reduce:transition-none">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-[#DCE9FF] bg-white text-[#155DFC] shadow-[0_4px_14px_rgba(21,93,252,0.08)]">
                    <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[1.05rem] font-semibold leading-6 tracking-[-0.01em] text-[#11124D]">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-7 text-[#42526B]">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IndustryCard({ industry, feature = false }: { industry: IndustryDetail; feature?: boolean }) {
  const profile = getIndustryProfile(industry);
  const Icon = industry.icon;

  return (
    <Reveal className={cn(feature ? "lg:col-span-2 lg:row-span-2" : "", "h-full")}>
      <Link
        to={`/industries/${industry.slug}`}
        className={cn(
          "group relative flex h-full overflow-hidden border border-line bg-[#05132e] text-white transition-colors hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white",
          feature ? "min-h-[20rem] sm:min-h-[23rem]" : "min-h-[17rem]",
        )}
      >
        <img
          src={profile.visual.src}
          srcSet={localSrcSet(profile.visual.src, [640, 960])}
          sizes="(min-width: 1024px) 45vw, 100vw"
          alt={profile.visual.alt}
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,19,46,0.06)_20%,rgba(5,19,46,0.84)_72%,rgba(5,19,46,0.98))]" />
        <div className="relative flex w-full flex-col justify-end p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <span
              className="flex size-9 items-center justify-center border border-white/20 bg-[#05132e]/45 backdrop-blur-sm"
              style={{ color: profile.visual.accent }}
            >
              <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <span className={cn("font-mono text-[9px] tracking-[0.14em] text-white/60", feature && "hidden")}>
              {industry.category}
            </span>
            <ArrowUpRight className="size-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
          </div>
          <p className={cn("mt-5 text-[9.5px] font-semibold uppercase tracking-[0.14em]", feature ? "text-[#9fc0ff]" : "text-white/65")}>
            {industry.category}
          </p>
          <h2 className={cn("mt-2 font-semibold leading-[1.1] tracking-[-0.025em] text-white", feature ? "text-[1.65rem] sm:text-[2rem]" : "text-[1.25rem]")}>
            {industry.title}
          </h2>
          <p className={cn("mt-2.5 max-w-xl leading-5 text-white/62", feature ? "text-[12.5px]" : "line-clamp-2 text-[11.5px]")}>
            {profile.summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-[#9fc0ff]">
            Open the industry view
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function IndustriesPage() {
  useSEO({
    title: SEO_TITLES.industries,
    description: SEO_DESCRIPTIONS.industries,
    canonical: "https://www.yesbe.tech/industries",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.industries,
        description: SEO_DESCRIPTIONS.industries,
        url: "https://www.yesbe.tech/industries",
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <Breadcrumbs items={[{ label: "Industries" }]} schemaOnly />

      <section className="relative isolate overflow-hidden bg-[#05132e] pt-[76px] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/industryherosection.png')" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,19,46,0.18)_0%,rgba(5,19,46,0.28)_45%,rgba(5,19,46,0.5)_100%)]"
        />
        <div className="container-page relative flex min-h-[calc(75vh-76px)] max-h-[52rem] items-center justify-center py-16 sm:py-20 lg:min-h-[calc(82vh-76px)]">
          <div className="w-full max-w-5xl text-center">
            <div className="inline-block text-left">
              <EditorialHeading line1="OUR" line2="Industries" className="text-white" />
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:gap-5">
              <a
                href="#priority-industries"
                className="group inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 bg-[#11124D] px-7 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(17,18,77,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0C0D3A] hover:shadow-[0_14px_34px_rgba(17,18,77,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#05132e] sm:w-auto motion-reduce:transform-none motion-reduce:transition-none"
              >
                Explore Industries
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
              </a>
              <Link
                to="/contact"
                onClick={() => trackConsultationClick("industries_hero")}
                className="group inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 border border-white bg-transparent px-7 text-[15px] font-semibold text-white backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#05132e] sm:w-auto motion-reduce:transform-none motion-reduce:transition-none"
              >
                Book a Free Consultation
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="priority-industries" className="section-py scroll-mt-24 bg-paper">
        <div className="container-page">
          <Reveal>
            <h2 className="mb-8 text-left text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#15134F] sm:text-[3rem] lg:mb-10 lg:text-[3.5rem]">
              We design for
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {[
              {
                title: "Healthcare",
                href: "/industries/healthcare",
                image: getIndustryProfile(industries.find((i) => i.slug === "healthcare")!).visual.src,
                alt: "Healthcare industry",
                description: "Connect patient, scheduling, and operational systems to reduce administrative handoffs and improve visibility.",
              },
              {
                title: "Education",
                href: "/industries/education",
                image: getIndustryProfile(industries.find((i) => i.slug === "education")!).visual.src,
                alt: "Education industry",
                description: "Support learning, administration, and communication workflows with systems designed around real institutional operations.",
              },
              {
                title: "Retail",
                href: "/industries/retail",
                image: getIndustryProfile(industries.find((i) => i.slug === "retail")!).visual.src,
                alt: "Retail industry",
                description: "Unify inventory, sales, and customer operations to improve responsiveness and day-to-day decision making.",
              },
              {
                title: "Manufacturing",
                href: "/industries/manufacturing",
                image: getIndustryProfile(industries.find((i) => i.slug === "manufacturing")!).visual.src,
                alt: "Manufacturing industry",
                description: "Improve production visibility, process coordination, and operational reporting across plant and business systems.",
              },
              {
                title: "Logistics",
                href: "/industries/logistics",
                image: getIndustryProfile(industries.find((i) => i.slug === "logistics")!).visual.src,
                alt: "Logistics industry",
                description: "Strengthen dispatch, tracking, and coordination workflows with connected data and operational visibility.",
              },
              {
                title: "Finance",
                href: "/industries/finance",
                image: getIndustryProfile(industries.find((i) => i.slug === "finance")!).visual.src,
                alt: "Finance industry",
                description: "Support secure records, controls, and reporting workflows where accuracy, traceability, and governance matter.",
              },
              {
                title: "Blockchain & Privacy",
                href: "/services/blockchain",
                image: "/images/visuals/integration.webp",
                alt: "Blockchain and privacy technology",
                description: "Apply blockchain and privacy-focused architecture for verifiable records, controlled sharing, and trusted digital workflows.",
              },
              {
                title: "Hospitality",
                href: "/industries/hospitality",
                image: getIndustryProfile(industries.find((i) => i.slug === "hospitality")!).visual.src,
                alt: "Hospitality industry",
                description: "Improve guest, booking, and operational workflows with systems that support service quality and efficiency.",
              },
              {
                title: "Professional Services",
                href: "/industries/professional-services",
                image: "/images/visuals/transformation.webp",
                alt: "Professional services industry",
                description: "Streamline client delivery, documentation, and internal coordination with practical digital systems and workflows.",
              },
            ].map((card, index) => (
              <Reveal key={card.title} delay={index * 40} className="h-full">
                <Link
                  to={card.href}
                  className="group relative flex aspect-[3/4] h-full min-h-[360px] overflow-hidden rounded-[20px] border border-[#DCE5F2] bg-[#05132e] shadow-[0_8px_24px_rgba(11,31,70,0.06)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#1F4ED8]/35 hover:shadow-[0_20px_45px_rgba(23,21,76,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4ED8] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    width={900}
                    height={1200}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,19,46,0.08)_20%,rgba(5,19,46,0.32)_45%,rgba(5,19,46,0.82)_100%)] transition-opacity duration-300 group-hover:opacity-90 group-focus-visible:opacity-90" />
                  <div aria-hidden="true" className="absolute inset-0 bg-[#0B1F46]/0 transition-colors duration-300 group-hover:bg-[#0B1F46]/20 group-focus-visible:bg-[#0B1F46]/20" />

                  <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/20 bg-[#05132e]/30 text-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-white/35 group-hover:text-white group-focus-visible:border-white/35 group-focus-visible:text-white">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>

                  <div className="relative mt-auto flex w-full flex-col justify-end p-5 sm:p-6">
                    <h3 className="text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[1.75rem]">
                      {card.title}
                    </h3>
                    <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100 motion-reduce:max-h-none motion-reduce:opacity-100">
                      <p className="mt-3 max-w-[34ch] text-[13px] leading-6 text-white/78 sm:text-[14px]">
                        {card.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#9FC0FF]">
                        {(card as any).cta ?? "Explore Industry"}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BlockchainPrivacySection />

      <ClosingCta
        eyebrow="Industry discussion"
        title="Start with the operating reality, not a product demo."
        description="Tell us how the work moves today, where information gets stuck and what the next decision needs to support."
      />
    </>
  );
}
