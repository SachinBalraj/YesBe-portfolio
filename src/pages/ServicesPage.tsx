import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ClipboardList } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/system/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ServiceVisual } from "@/components/phase2/ServiceVisual";
import { DeliveryRail } from "@/components/phase2/DeliveryRail";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import {
  CORE_SERVICES,
  DELIVERY_STAGES,
  SERVICE_DIRECTORY_GROUPS,
} from "@/data/phase2";
import { getSolutionBySlug, solutions } from "@/data/solutions";
import { trackConsultationClick } from "@/utils/analytics";

const directory = SERVICE_DIRECTORY_GROUPS.map((group) => ({
  ...group,
  services: group.slugs
    .map((slug) => getSolutionBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service)),
}));

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

      <section className="section-py border-b border-line bg-paper" aria-label="Practice areas">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="Six practice areas, connected by the same delivery discipline."
              description="These are the primary ways engagements begin. Most projects combine at least two: a website with an integration, an ERP with reporting, or an AI workflow with a process redesign."
              className="mb-10 lg:mb-14"
            />
          </Reveal>

          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((service, index) => (
              <Reveal key={service.slug} as="article" delay={index * 40} className="h-full bg-white">
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                >
                  <ServiceVisual
                    variant={service.visual}
                    compact
                    className="h-36 border-b border-line"
                  />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex size-8 items-center justify-center border border-line bg-paper text-primary">
                        <service.icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-body/85">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-5 text-[1.1rem] font-semibold leading-[1.28] tracking-[-0.025em] text-ink transition-colors group-hover:text-primary">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-[13px] leading-6 text-body">{service.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-line pt-4">
                      {service.tags.map((tag) => (
                        <li key={tag} className="text-[10.5px] font-medium text-body/85">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto flex items-center justify-between gap-4 pt-6 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
                      Explore
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="directory" className="section-py bg-white" aria-label="Full service directory">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Service directory"
              title="Every capability, in one place."
              description={`${solutions.length} services across strategy, enterprise platforms, AI, data, web, cloud and growth. Every link below is an existing YESBE service page.`}
              action={
                <Link
                  to="/contact"
                  onClick={() => trackConsultationClick("services_directory_help")}
                  className="link-arrow"
                >
                  Not sure where to start?
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              }
              className="mb-10 lg:mb-12"
            />
          </Reveal>

          <div className="border-t border-line">
            {directory.map((group, groupIndex) => (
              <Reveal
                key={group.title}
                delay={groupIndex * 30}
                className="grid gap-6 border-b border-line py-8 lg:grid-cols-[0.3fr_0.7fr] lg:gap-12 lg:py-10"
              >
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-primary">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-[1.28rem] font-semibold tracking-[-0.025em] text-ink">
                    {group.title}
                  </h2>
                  <p className="mt-2 max-w-xs text-[12.5px] leading-5 text-body">{group.description}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {group.services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                              className="group flex min-h-32 flex-col border border-line bg-paper p-5 transition-all duration-300 hover:border-line-strong hover:bg-white hover:shadow-panel"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="flex size-8 items-center justify-center border border-line bg-white text-primary">
                            <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                          </span>
                          <ArrowUpRight className="size-4 text-body/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-[14px] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-primary">
                          {service.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-[12px] leading-5 text-body">
                          {service.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 flex flex-col justify-between gap-5 border border-line bg-paper p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center border border-line bg-white text-primary">
                <ClipboardList className="size-4.5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold text-ink">Not sure which service fits?</p>
                <p className="mt-1 text-[12.5px] leading-5 text-body">
                  Describe the problem and we will suggest the smallest useful starting point.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              onClick={() => trackConsultationClick("services_directory")}
              className="btn-primary shrink-0"
            >
              Ask YESBE
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-py border-y border-line bg-white" aria-label="Service delivery approach">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="How engagements run"
              title="A clear path from first conversation to operating system."
              description="The sequence is adapted to the service, but the principle does not change: each stage produces evidence for the next decision."
              className="mb-10 lg:mb-12"
            />
          </Reveal>
          <Reveal delay={60}>
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
