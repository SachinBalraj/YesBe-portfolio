import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  MoveUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/system/Reveal";
import { ServiceVisual } from "@/components/phase2/ServiceVisual";
import { DeliveryRail } from "@/components/phase2/DeliveryRail";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import { FilmPlayer } from "@/components/phase2/FilmPlayer";
import { SYSTEMS_FILM } from "@/data/media";
import {
  BUSINESS_CHALLENGES,
  CORE_SERVICES,
  DELIVERY_STAGES,
  FEATURED_CASE_STUDY_SLUGS,
  HOME_ARTICLE_SLUGS,
  INDUSTRY_SPOTLIGHTS,
  PARTNERSHIP_POINTS,
} from "@/data/phase2";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import { getIndustryBySlug } from "@/data/industries";
import { articleBySlug } from "@/knowledge/articles";
import { imageAt, imageSrcSet } from "@/utils/images";
import { cn } from "@/utils/cn";

const companyAvifSet =
  "/images/company/yesbe-consultation-480.avif 480w, /images/company/yesbe-consultation-720.avif 720w, /images/company/yesbe-consultation-960.avif 960w, /images/company/yesbe-consultation-1280.avif 1280w";
const companyWebpSet =
  "/images/company/yesbe-consultation-480.webp 480w, /images/company/yesbe-consultation-720.webp 720w, /images/company/yesbe-consultation-960.webp 960w, /images/company/yesbe-consultation-1280.webp 1280w";
const companyJpgSet =
  "/images/company/yesbe-consultation-480.jpg 480w, /images/company/yesbe-consultation-720.jpg 720w, /images/company/yesbe-consultation-960.jpg 960w, /images/company/yesbe-consultation-1280.jpg 1280w";

const featuredProjects = FEATURED_CASE_STUDY_SLUGS.map((slug) => getCaseStudyBySlug(slug)).filter(
  (project): project is NonNullable<typeof project> => Boolean(project),
);

const industryItems = INDUSTRY_SPOTLIGHTS.map((spotlight) => {
  const industry = getIndustryBySlug(spotlight.slug);
  return industry ? { ...spotlight, ...industry } : null;
}).filter((industry): industry is NonNullable<typeof industry> => Boolean(industry));

const journalArticles = HOME_ARTICLE_SLUGS.map((slug) => articleBySlug(slug)).filter(
  (article): article is NonNullable<typeof article> => Boolean(article),
);

const CHALLENGE_WAVE_WIDTH = 1200;
const CHALLENGE_WAVE_HEIGHT = 280;
const CHALLENGE_DOTS = [
  { x: 120, y: 90 },
  { x: 360, y: 190 },
  { x: 600, y: 90 },
  { x: 840, y: 190 },
  { x: 1080, y: 90 },
] as const;
const CHALLENGE_WAVE_PATH =
  "M 40 140 C 80 140 80 90 120 90 C 240 90 240 190 360 190 C 480 190 480 90 600 90 C 720 90 720 190 840 190 C 960 190 960 90 1080 90 C 1120 90 1120 140 1160 140";
const CHALLENGE_IMAGES = [
  "/images/challenges/business-automation-glass.webp",
  "/images/challenges/erp-crm-glass.webp",
  "/images/challenges/web-experience-glass.webp",
  "/images/challenges/data-intelligence-glass.webp",
  "/images/challenges/ai-automation-glass.webp",
] as const;

function HomeSectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <SectionHeading
      eyebrow={eyebrow}
      title={title}
      description={description}
      action={action}
      tone={tone}
      className="mb-8 lg:mb-10"
    />
  );
}

function BusinessChallengesSection() {
  const [active, setActive] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const challenge = BUSINESS_CHALLENGES[active] ?? BUSINESS_CHALLENGES[0];
  if (!challenge) return null;

  const handleWaveKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const count = BUSINESS_CHALLENGES.length;
    const focusedDot = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '[id^="challenge-dot-"]',
    );
    const current = focusedDot
      ? Number(focusedDot.id.replace("challenge-dot-", "")) - 1
      : active;
    let next = current;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (current + 1) % count;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (current - 1 + count) % count;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = count - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActive(next);
    window.requestAnimationFrame(() => {
      document.getElementById(`challenge-dot-${next + 1}`)?.focus();
    });
  };

  const scrollToCard = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section id="challenges" className="section-py bg-white" aria-label="Business challenges">
      <div className="container-page">
        <Reveal>
          <h2 className="mb-6 max-w-3xl text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-[#080B12] sm:text-[2.125rem] lg:mb-8 lg:text-[3.25rem]">
            Complex Challenges. Smarter Solutions.
          </h2>
        </Reveal>

        <div className="mx-auto w-full max-w-[1120px]">
          <div
            className="relative"
            role="group"
            aria-label="Choose a business challenge"
            onKeyDown={handleWaveKeyDown}
          >
            <svg
              viewBox={`0 0 ${CHALLENGE_WAVE_WIDTH} ${CHALLENGE_WAVE_HEIGHT}`}
              className="block h-auto w-full"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d={CHALLENGE_WAVE_PATH}
                fill="none"
                stroke="#07156F"
                strokeWidth={7}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {BUSINESS_CHALLENGES.map((item, index) => {
              const dot = CHALLENGE_DOTS[index];
              if (!dot) return null;
              const selected = index === active;

              return (
                <button
                  key={item.title}
                  id={`challenge-dot-${index + 1}`}
                  type="button"
                  aria-label={`Select challenge ${index + 1}: ${item.title}`}
                  aria-pressed={selected}
                  aria-controls={`challenge-detail-${index + 1}`}
                  onClick={() => setActive(index)}
                  style={{
                    left: `${(dot.x / CHALLENGE_WAVE_WIDTH) * 100}%`,
                    top: `${(dot.y / CHALLENGE_WAVE_HEIGHT) * 100}%`,
                  }}
                  className="group absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07156F] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <span
                    className={cn(
                      "block size-5 rounded-full bg-[#07156F] transition-shadow duration-300 motion-reduce:transition-none sm:size-6",
                      selected
                        ? "ring-2 ring-[#07156F]/35 ring-offset-4 ring-offset-white"
                        : "group-hover:ring-2 group-hover:ring-[#07156F]/20 group-hover:ring-offset-4 group-hover:ring-offset-white",
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={scrollToCard}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#07156F] px-7 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-[#0a247f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07156F] focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            View More
          </button>
        </div>

        <div
          ref={cardRef}
          id="challenge-detail-card"
          className="mx-auto mt-8 w-full max-w-[1120px]"
        >
          <div className="challenge-glass-shell relative overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white">
            <div className="grid">
              {BUSINESS_CHALLENGES.map((item, index) => {
                const selected = index === active;
                const Icon = item.icon;
                const category = item.link.label.replace(/^Explore\s+/i, "");

                return (
                  <div
                    key={item.title}
                    id={`challenge-detail-${index + 1}`}
                    aria-hidden={!selected}
                    inert={!selected}
                    className={cn(
                      "col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      selected
                        ? "z-10 translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-3 opacity-0",
                    )}
                  >
                    <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-[55%_45%] lg:min-h-[560px] lg:grid-cols-[48%_52%]">
                      <div className="flex flex-col">
                        <div className="flex items-start justify-between gap-6 border-b border-[#E5E7EB] px-6 py-5 sm:px-8">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#164DE5]">
                              {category}
                            </p>
                            <p className="mt-1.5 text-[13px] uppercase text-[#30343B]">
                              {`${String(index + 1).padStart(2, "0")} of ${String(BUSINESS_CHALLENGES.length).padStart(2, "0")}`}
                            </p>
                          </div>
                          <span className="flex size-11 items-center justify-center border border-[#E5E7EB] bg-white text-[#164DE5]">
                            <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                          <h3 className="max-w-md text-[1.65rem] font-bold leading-[1.12] tracking-[-0.035em] text-[#080B12] sm:text-[2rem]">
                            {item.title}
                          </h3>
                          <p className="mt-5 max-w-xl text-[14.5px] leading-7 text-[#30343B]">
                            {item.description}
                          </p>

                          <div className="mt-7 border-t border-[#E5E7EB] pt-6">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#080B12]">
                              How YESBE helps
                            </p>
                            <p className="mt-2.5 max-w-xl text-[14px] leading-6 text-[#30343B]">
                              {item.change}
                            </p>
                          </div>

                          <ul className="mt-6 flex flex-wrap gap-2">
                            {item.signals.map((signal) => (
                              <li
                                key={signal}
                                className="border border-[#E5E7EB] bg-[#FBFAF7] px-2.5 py-1 text-[10.5px] font-medium text-[#30343B]"
                              >
                                {signal}
                              </li>
                            ))}
                          </ul>

                          <Link to={item.link.to} className="link-arrow challenge-glass-cta mt-auto pt-7">
                            {item.link.label}
                            <ArrowRight className="size-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>

                      <div className="relative min-h-[280px] overflow-hidden bg-[#FBFAF7] md:min-h-full md:rounded-r-[21px]">
                        <img
                          src={CHALLENGE_IMAGES[index]}
                          alt=""
                          aria-hidden="true"
                          width={1200}
                          height={1200}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {`Selected challenge ${active + 1} of ${BUSINESS_CHALLENGES.length}: ${challenge.title}`}
        </p>
      </div>
    </section>
  );
}

function CoreServicesSection() {
  return (
    <section id="capabilities" className="section-py border-y border-line bg-white" aria-label="Core capabilities">
      <div className="container-page">
        <Reveal>
          <HomeSectionHeading
            eyebrow="Core capabilities"
            title="Six disciplines. One joined-up delivery model."
            description="Strategy, engineering, data and cloud decisions affect each other. We scope them together so the system you launch still makes sense when the next requirement arrives."
            action={
              <Link to="/services" className="link-arrow">
                View all services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            }
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CORE_SERVICES.map((service, index) => (
            <Reveal key={service.slug} as="article" delay={index * 45} className="h-full bg-white">
              <Link
                to={`/services/${service.slug}`}
                className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              >
                <ServiceVisual
                  variant={service.visual}
                  compact
                  className="h-40 border-b border-line transition-colors duration-500 group-hover:bg-[#f1f5fd] sm:h-44"
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
                  <h3 className="mt-5 text-[1.12rem] font-semibold leading-[1.28] tracking-[-0.025em] text-ink transition-colors group-hover:text-primary sm:text-[1.2rem]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-6 text-body">{service.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-line pt-4">
                    {service.tags.map((tag) => (
                      <li key={tag} className="text-[10.5px] font-medium text-body/85">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center justify-between gap-4 pt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                    Explore capability
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologyFilmSection() {
  const points = [
    ["01", "Systems mapped before screens", "Architecture, data and operating constraints are made visible before interface decisions."],
    ["02", "Interfaces tied to the workflow", "Every surface is designed around a real task, decision or handover."],
    ["03", "Evidence after launch", "Monitoring and support are planned as part of the system, not added afterwards."],
  ] as const;

  return (
    <section className="section-py border-y border-line bg-paper-deep" aria-label="Inside the systems">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-12">
          <Reveal>
            <span className="eyebrow">Inside the work</span>
            <h2 className="mt-5 max-w-xl text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-ink sm:text-[2.7rem] lg:text-[3rem]">
              Built as a system, not a collection of screens.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-body">
              The visible interface is only one layer. The work behind it connects data, permissions,
              integrations and the decisions people need to make each day.
            </p>
            <ol className="mt-7 border-t border-line">
              {points.map(([number, title, copy]) => (
                <li key={number} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-line py-4">
                  <span className="pt-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-primary">
                    {number}
                  </span>
                  <span>
                    <span className="block text-[13.5px] font-semibold text-ink">{title}</span>
                    <span className="mt-1 block text-[12.5px] leading-5 text-body">{copy}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link to="/services" className="link-arrow mt-6">
              Explore the capability set
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-line bg-[#05132e] p-1.5 shadow-panel">
              <FilmPlayer
                {...SYSTEMS_FILM}
                className="aspect-[16/10] w-full"
                videoClassName="object-cover"
              />
              <div className="flex items-center justify-between gap-4 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.13em] text-white/55">
                <span>Systems visual study</span>
                <span>Original YESBE composition</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkSection() {
  const feature = featuredProjects[0];
  const supporting = featuredProjects.slice(1, 3);
  if (!feature) return null;

  const featureSrc = imageAt(feature.image, 1200, 750);
  const featureSrcSet = imageSrcSet(feature.image, [640, 900, 1200], 1.6);

  return (
    <section className="section-py bg-paper" aria-label="Featured work">
      <div className="container-page">
        <Reveal>
          <HomeSectionHeading
            eyebrow="Selected work"
            title="Work that shows the thinking."
            description="Systems designed around a defined operational problem. Each entry documents the scope, architecture and intended capability without inventing client names or unverified outcomes."
            action={
              <Link to="/case-studies" className="link-arrow">
                View all projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            }
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <Reveal as="article" className="group flex h-full flex-col border border-line bg-white shadow-panel">
            <Link to={`/case-studies/${feature.slug}`} className="block overflow-hidden">
              <img
                src={featureSrc}
                srcSet={featureSrcSet}
                sizes="(min-width: 1024px) 58vw, 100vw"
                alt={`${feature.title} — illustrative interface preview`}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.025]"
              />
            </Link>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em]">
                <span className="border border-primary/20 bg-primary/[0.05] px-2.5 py-1 text-primary">
                  {feature.label}
                </span>
                <span className="text-body/85">{feature.category}</span>
              </div>
              <h3 className="mt-5 max-w-xl text-[1.65rem] font-semibold leading-[1.14] tracking-[-0.035em] text-ink sm:text-[2rem]">
                <Link to={`/case-studies/${feature.slug}`} className="transition-colors hover:text-primary">
                  {feature.title}
                </Link>
              </h3>
              <p className="mt-4 max-w-2xl text-[14.5px] leading-7 text-body">{feature.shortOverview}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {feature.technologies.slice(0, 5).map((technology) => (
                  <li
                    key={technology}
                    className="border border-line bg-paper px-2.5 py-1 text-[10.5px] font-medium text-body"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
              <Link to={`/case-studies/${feature.slug}`} className="link-arrow mt-auto pt-7">
                Review the project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {supporting.map((project, index) => (
              <Reveal
                key={project.slug}
                as="article"
                delay={80 + index * 60}
                className="group flex h-full flex-col border border-line bg-white"
              >
                <Link to={`/case-studies/${project.slug}`} className="block overflow-hidden">
                  <img
                    src={imageAt(project.image, 760, 430)}
                    srcSet={imageSrcSet(project.image, [480, 760, 960], 1.77)}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
                    alt={`${project.title} — illustrative interface preview`}
                    width={760}
                    height={430}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-primary">
                      {project.label}
                    </span>
                    <span className="text-[10.5px] text-body/85">{project.category}</span>
                  </div>
                  <h3 className="mt-3 text-[1.02rem] font-semibold leading-6 tracking-[-0.02em] text-ink">
                    <Link to={`/case-studies/${project.slug}`} className="transition-colors hover:text-primary">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[12.5px] leading-5 text-body">
                    {project.shortOverview}
                  </p>
                  <Link to={`/case-studies/${project.slug}`} className="link-arrow mt-auto pt-5">
                    View project
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustrySolutionsSection() {
  return (
    <section className="relative overflow-hidden bg-[#05132e] py-12 text-white sm:py-16 lg:py-20" aria-label="Industry solutions">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-25" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(31,78,216,0.22),transparent_66%)]"
      />
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow text-[#8eb5ff]">Industry context</span>
            <h2 className="mt-5 max-w-lg text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.7rem] lg:text-[3rem]">
              Technology shaped by the operating context.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-white/58">
              The same engineering discipline does not produce the same system in a hospital, a
              factory and a retail business. Constraints, compliance and daily workflows change
              what good looks like.
            </p>
            <Link
              to="/industries"
              className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-[#9fc0ff] transition-colors hover:text-white"
            >
              View all 11 industries
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="border-t border-white/15">
              {industryItems.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <Link
                    key={industry.slug}
                    to={`/industries/${industry.slug}`}
                    className="group grid grid-cols-[2rem_2.5rem_1fr_auto] items-start gap-3 border-b border-white/12 py-5 transition-colors hover:bg-white/[0.035] sm:grid-cols-[2.5rem_2.75rem_1fr_auto] sm:gap-4 sm:py-6"
                  >
                    <span className="pt-1 font-mono text-[10px] tracking-[0.12em] text-white/32">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-9 items-center justify-center border border-white/15 text-[#8eb5ff] transition-colors group-hover:border-[#8eb5ff]/45">
                      <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold text-white">{industry.title}</span>
                      <span className="mt-1 block max-w-xl text-[12.5px] leading-5 text-white/50">
                        {industry.description}
                      </span>
                      <span className="mt-2.5 inline-block text-[9.5px] font-semibold uppercase tracking-[0.13em] text-[#8eb5ff]/80">
                        {industry.focus}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="mt-2 size-4 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8eb5ff]"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PartnershipSection() {
  return (
    <section className="section-py bg-white" aria-label="The YESBE partnership">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative border border-line bg-paper p-2">
              <div className="overflow-hidden">
                <picture>
                  <source type="image/avif" srcSet={companyAvifSet} sizes="(min-width: 1024px) 44vw, 100vw" />
                  <source type="image/webp" srcSet={companyWebpSet} sizes="(min-width: 1024px) 44vw, 100vw" />
                  <img
                    src="/images/company/yesbe-consultation-960.jpg"
                    srcSet={companyJpgSet}
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    alt="Two professionals reviewing project requirements on a laptop"
                    width={1600}
                    height={1280}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[5/4] w-full object-cover"
                  />
                </picture>
              </div>
              <div className="absolute bottom-6 left-6 right-6 border border-white/20 bg-[#05132e]/88 p-4 text-white backdrop-blur-sm sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-xs sm:p-5">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#8eb5ff]">
                  Before the proposal
                </p>
                <p className="mt-2 text-[13px] font-medium leading-5 text-white/85">
                  We map the current workflow, constraints and decision points first.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <span className="eyebrow">The partnership</span>
            <h2 className="mt-5 max-w-2xl text-[2.15rem] font-semibold leading-[1.03] tracking-[-0.045em] text-ink sm:text-[2.8rem] lg:text-[3.25rem]">
              A Technology Partner, Not Just a Vendor.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-body">
              The useful difference is not a larger team or a longer list of tools. It is how
              decisions are made, how scope is controlled and what happens when the project leaves
              the proposal stage.
            </p>

            <ol className="mt-9 border-t border-line">
              {PARTNERSHIP_POINTS.map((point, index) => {
                const Icon = point.icon;
                return (
                  <li
                    key={point.title}
                    className="grid grid-cols-[2rem_2.4rem_1fr] gap-3 border-b border-line py-5 sm:grid-cols-[2.5rem_2.75rem_1fr] sm:gap-4 sm:py-6"
                  >
                    <span className="pt-1 font-mono text-[10px] font-semibold tracking-[0.12em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-9 items-center justify-center border border-line bg-paper text-primary">
                      <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold tracking-[-0.01em] text-ink">
                        {point.title}
                      </span>
                      <span className="mt-1.5 block max-w-xl text-[13.5px] leading-6 text-body">
                        {point.description}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/about" className="link-arrow">
                More about YESBE
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link to="/sachin-balraj" className="link-arrow">
                Meet the founder
                <MoveUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DeliveryApproachSection() {
  return (
    <section id="process" className="section-py border-y border-line bg-white" aria-label="Delivery approach">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-16">
          <Reveal>
            <span className="eyebrow">How we deliver</span>
            <h2 className="mt-5 max-w-xl text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-ink sm:text-[2.7rem] lg:text-[3rem]">
              A delivery model built for decisions, not theatre.
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="max-w-2xl text-[15px] leading-7 text-body">
              Every stage produces something you can inspect and decide on: a documented problem, a
              bounded scope, working software, a launch plan, or evidence for the next move. Select a
              stage to see what the work contains.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-10 lg:mt-14">
          <DeliveryRail stages={DELIVERY_STAGES} />
        </Reveal>

        <Reveal delay={120} className="mt-6 grid gap-4 border border-line bg-paper p-5 sm:grid-cols-3 sm:p-6">
          {[
            ["01", "Scope in writing"],
            ["02", "Visible progress"],
            ["03", "Controlled launch"],
          ].map(([number, label]) => (
            <div key={number} className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-primary">
                {number}
              </span>
              <span className="text-[12.5px] font-medium text-ink-soft">{label}</span>
              <Check className="ml-auto size-3.5 text-primary" strokeWidth={2} aria-hidden="true" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function JournalSection() {
  return (
    <section className="section-py bg-paper" aria-label="Featured articles">
      <div className="container-page">
        <Reveal>
          <HomeSectionHeading
            eyebrow="From the journal"
            title="Useful reading before the next decision."
            description="Plain-language guides on the technology, trade-offs and operating questions that sit behind most projects."
            action={
              <Link to="/insights" className="link-arrow">
                Read all articles
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            }
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {journalArticles.map((article, index) => (
            <Reveal
              key={article.slug}
              as="article"
              delay={index * 55}
              className="group flex h-full flex-col border border-line bg-white"
            >
              <Link
                to={`/insights/article/${article.slug}`}
                className="block overflow-hidden"
                aria-label={`Read ${article.title}`}
              >
                <img
                  src={imageAt(article.featuredImage, 720, 405)}
                  srcSet={imageSrcSet(article.featuredImage, [480, 720, 960], 1.77)}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
                  alt=""
                  width={720}
                  height={405}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.12em]">
                  <span className="text-primary">{article.category}</span>
                  <span className="inline-flex items-center gap-1.5 text-body/85">
                    <Clock3 className="size-3" aria-hidden="true" />
                    {article.readingTimeText}
                  </span>
                </div>
                <h3 className="mt-4 text-[1.12rem] font-semibold leading-[1.3] tracking-[-0.025em] text-ink">
                  <Link
                    to={`/insights/article/${article.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-body">{article.excerpt}</p>
                <Link
                  to={`/insights/article/${article.slug}`}
                  className="link-arrow mt-auto pt-6"
                >
                  Read the guide
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Phase2HomeSections() {
  return (
    <>
      <BusinessChallengesSection />
      <CoreServicesSection />
      <TechnologyFilmSection />
      <FeaturedWorkSection />
      <IndustrySolutionsSection />
      <PartnershipSection />
      <DeliveryApproachSection />
      <JournalSection />
      <ClosingCta />
    </>
  );
}
