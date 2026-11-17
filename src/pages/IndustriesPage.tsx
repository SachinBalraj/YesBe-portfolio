import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Layers, Waypoints } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import { Eyebrow } from "@/components/system/Eyebrow";
import { Reveal } from "@/components/system/Reveal";
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
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-0 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(31,78,216,0.28),transparent_66%)]"
        />
        <div className="container-page relative py-10 sm:py-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow tone="dark">Industry context</Eyebrow>
              <h1 className="mt-5 max-w-4xl text-[clamp(2.65rem,5.9vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
                Different Industries. Different Operating Realities.
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/68 sm:text-[17px] sm:leading-8">
                A hospital, a factory, a retailer and a finance team do not share the same workflow,
                controls or reporting needs. We design around the operating environment instead of
                forcing every business into the same template.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#priority-industries" className="btn-on-dark group w-full sm:w-auto">
                  Explore priority industries
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
                <Link
                  to="/contact"
                  onClick={() => trackConsultationClick("industries_hero")}
                  className="inline-flex min-h-[3.25rem] items-center justify-between gap-8 bg-white px-5 py-3 text-sm font-semibold text-[#05132e] transition-colors hover:bg-[#dce8ff] sm:min-w-56"
                >
                  Discuss your context
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 grid max-w-xl grid-cols-3 border-t border-white/10 pt-5">
                {[
                  ["Context", "Map the workflow"],
                  ["Architecture", "Design the system"],
                  ["Delivery", "Ship the useful release"],
                ].map(([term, detail], index) => (
                  <div key={term} className={cn("pr-4", index > 0 && "border-l border-white/10 pl-4")}>
                    <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#9fc0ff]">{term}</p>
                    <p className="mt-1.5 text-[10.5px] leading-5 text-white/65">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {priorityIndustries.map((industry, index) => {
                const profile = getIndustryProfile(industry);
                return (
                  <Link
                    key={industry.slug}
                    to={`/industries/${industry.slug}`}
                    className={cn(
                      "group relative overflow-hidden border border-white/12 bg-white/[0.04]",
                      index < 2 ? "aspect-[4/3]" : "aspect-[4/3]",
                    )}
                  >
                    <img
                      src={profile.visual.src}
                      srcSet={localSrcSet(profile.visual.src, [640, 960])}
                      sizes="(min-width: 1024px) 19vw, 50vw"
                      alt=""
                      width={1200}
                      height={900}
                      loading={index < 2 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                      className="size-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,19,46,0.88))]" />
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
                      <span className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/80">
                        {industry.title}
                      </span>
                      <ArrowUpRight className="size-3.5 text-white/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="priority-industries" className="section-py scroll-mt-24 bg-paper">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Priority industries"
              title="Six environments where system design changes the work."
              description="These pages frame typical operating constraints, the capabilities that address them and the architecture that connects the pieces. They do not claim a specific client history in each sector."
              className="mb-8 lg:mb-10"
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <IndustryCard industry={priorityIndustries[0]!} feature />
            {priorityIndustries.slice(1).map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="How the work changes"
                title="The industry sets the constraints. The system follows."
                description="We start with how information moves, who owns the next decision and where the operating risk sits. Technology is chosen after that, not before."
              />
              <Link to="/services" className="link-arrow mt-6">
                Explore service capabilities
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>

            <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
              {[
                ["01", "Operating model", "The people, handoffs and exceptions that make the current process work.", Waypoints],
                ["02", "System boundary", "What the new system owns, what it integrates with and what it leaves alone.", Layers],
                ["03", "Useful release", "The smallest change that improves a real decision, then the next increment.", Check],
              ].map(([number, title, detail, Icon]) => {
                const CardIcon = Icon as typeof Check;
                return (
                  <Reveal key={String(title)} className="bg-white p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <CardIcon className="size-4 text-primary" strokeWidth={1.7} aria-hidden="true" />
                      <span className="font-mono text-[10px] text-body/65">{String(number)}</span>
                    </div>
                    <h2 className="mt-6 text-[14px] font-semibold text-ink">{String(title)}</h2>
                    <p className="mt-2 text-[12px] leading-5 text-body">{String(detail)}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-py border-y border-line bg-paper-deep">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Other environments"
              title="Additional industry routes."
              description="Existing industry pages remain available for startups, SMEs, larger enterprises, hospitality and real estate."
              className="mb-8"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {otherIndustries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="Industry discussion"
        title="Start with the operating reality, not a product demo."
        description="Tell us how the work moves today, where information gets stuck and what the next decision needs to support."
      />
    </>
  );
}
