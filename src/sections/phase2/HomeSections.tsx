import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type TransitionEvent,
} from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MoveUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/system/Reveal";
import { DeliveryRail } from "@/components/phase2/DeliveryRail";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import {
  BUSINESS_CHALLENGES,
  DELIVERY_STAGES,
  HOME_ARTICLE_SLUGS,
  INDUSTRY_SPOTLIGHTS,
  PARTNERSHIP_POINTS,
} from "@/data/phase2";
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
  const count = BUSINESS_CHALLENGES.length;
  const [trackIndex, setTrackIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const animatingRef = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const extended = [
    BUSINESS_CHALLENGES[count - 1],
    ...BUSINESS_CHALLENGES,
    BUSINESS_CHALLENGES[0],
  ].filter(Boolean) as typeof BUSINESS_CHALLENGES;

  const active = ((trackIndex - 1) % count + count) % count;
  const challenge = BUSINESS_CHALLENGES[active] ?? BUSINESS_CHALLENGES[0];
  if (!challenge) return null;

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clearUnlock = () => {
    if (unlockTimer.current) {
      clearTimeout(unlockTimer.current);
      unlockTimer.current = null;
    }
  };

  useEffect(() => () => clearUnlock(), []);

  const lockForAnimation = useCallback(() => {
    animatingRef.current = true;
    clearUnlock();
    unlockTimer.current = setTimeout(() => {
      animatingRef.current = false;
      unlockTimer.current = null;
    }, 560);
  }, []);

  const move = useCallback(
    (delta: number) => {
      if (animatingRef.current || delta === 0) return;
      if (prefersReducedMotion()) {
        setTransitionEnabled(false);
        setTrackIndex((i) => ((i - 1 + delta) % count + count) % count + 1);
        window.requestAnimationFrame(() => setTransitionEnabled(true));
        return;
      }
      lockForAnimation();
      setTransitionEnabled(true);
      setTrackIndex((i) => i + delta);
    },
    [count, lockForAnimation],
  );

  const goTo = useCallback(
    (index: number) => {
      if (animatingRef.current) return;
      const target = ((index % count) + count) % count;
      if (target === active) return;
      if (prefersReducedMotion()) {
        setTransitionEnabled(false);
        setTrackIndex(target + 1);
        window.requestAnimationFrame(() => setTransitionEnabled(true));
        return;
      }
      lockForAnimation();
      setTransitionEnabled(true);
      setTrackIndex(target + 1);
    },
    [active, count, lockForAnimation],
  );

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    clearUnlock();
    animatingRef.current = false;
    if (trackIndex === 0) {
      setTransitionEnabled(false);
      setTrackIndex(count);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setTransitionEnabled(true));
      });
    } else if (trackIndex === count + 1) {
      setTransitionEnabled(false);
      setTrackIndex(1);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setTransitionEnabled(true));
      });
    }
  };

  const handleWaveKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
    goTo(next);
    window.requestAnimationFrame(() => {
      document.getElementById(`challenge-dot-${next + 1}`)?.focus();
    });
  };

  const handleCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest("a,button,input,textarea,select")) return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!swipeStart.current) return;
    const dx = event.clientX - swipeStart.current.x;
    const dy = event.clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      move(dx < 0 ? 1 : -1);
    }
  };

  const scrollToCard = () => {
    const reducedMotion = prefersReducedMotion();
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
                  key={item.badge}
                  id={`challenge-dot-${index + 1}`}
                  type="button"
                  aria-label={`Select challenge ${index + 1}: ${item.badge}`}
                  aria-pressed={selected}
                  aria-controls={`challenge-detail-${index + 1}`}
                  onClick={() => goTo(index)}
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

        <div ref={cardRef} className="mx-auto mt-8 w-full max-w-[1120px] px-[56px] sm:px-[72px]">
          <div
            className="relative"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Challenge cards"
            onKeyDown={handleCarouselKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}
          >
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous challenge"
              className="absolute left-0 top-1/2 z-20 flex size-11 -translate-x-[calc(100%+12px)] -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-800 shadow-md backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07156F] focus-visible:ring-offset-2 sm:size-14 sm:-translate-x-[calc(100%+16px)]"
            >
              <ChevronLeft className="size-5 sm:size-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next challenge"
              className="absolute right-0 top-1/2 z-20 flex size-11 translate-x-[calc(100%+12px)] -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-800 shadow-md backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07156F] focus-visible:ring-offset-2 sm:size-14 sm:translate-x-[calc(100%+16px)]"
            >
              <ChevronRight className="size-5 sm:size-6" aria-hidden="true" />
            </button>

            <div
              id="challenge-detail-card"
              className="overflow-hidden rounded-[26px] border border-[#E5E7EB] bg-white"
            >
              <div
                className={cn(
                  "flex",
                  transitionEnabled &&
                    "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:duration-0",
                )}
                style={{ transform: `translateX(-${trackIndex * 100}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extended.map((item, index) => {
                  const isClone = index === 0 || index === count + 1;
                  const realIndex = isClone ? (index === 0 ? count - 1 : 0) : index - 1;
                  const selected = realIndex === active;
                  const hidden = isClone || !selected;

                  return (
                    <div
                      key={`${item.badge}-${index}`}
                      id={!isClone ? `challenge-detail-${realIndex + 1}` : undefined}
                      aria-hidden={hidden}
                      inert={hidden}
                      className="w-full min-w-full flex-none"
                    >
                      <div className="grid min-h-[520px] grid-cols-1 md:min-h-[560px] md:grid-cols-[48%_52%]">
                        <div className="order-2 flex flex-col bg-white p-6 sm:p-8 md:order-1 md:p-10 lg:p-12">
                          <span className="inline-flex w-fit rounded-[10px] bg-[#17145C] px-4 py-2 text-[15px] font-semibold leading-none text-white sm:text-[16px]">
                            {item.badge}
                          </span>
                          <h3 className="mt-6 max-w-[580px] text-left text-[clamp(32px,3vw,48px)] font-bold leading-[1.12] tracking-[-0.02em] text-[#11113F]">
                            {item.headline}
                          </h3>
                          <p className="mt-5 max-w-[580px] text-[18px] leading-[1.55] text-[#25253F] sm:text-[19px] lg:text-[21px]">
                            {item.description}
                          </p>
                          <Link
                            to={item.to}
                            tabIndex={selected ? 0 : -1}
                            className="group/cta mt-auto inline-flex w-full items-center justify-center gap-2 self-start rounded-[14px] bg-[linear-gradient(180deg,#414141_0%,#050505_100%)] px-[26px] py-[18px] text-[15px] font-semibold text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(5,5,5,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11113F] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:mt-10 sm:w-auto"
                          >
                            <span>{item.ctaLabel}</span>
                            <ArrowUpRight
                              className="size-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>

                        <div className="relative order-1 min-h-[280px] overflow-hidden bg-[#F5F5F7] sm:min-h-[360px] md:order-2 md:min-h-full md:rounded-r-[26px]">
                          <img
                            src={item.image}
                            alt=""
                            aria-hidden="true"
                            width={1200}
                            height={1200}
                            loading={realIndex === 0 || selected ? "eager" : "lazy"}
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

          <div className="mt-5 flex justify-center gap-2.5" role="group" aria-label="Challenge carousel pagination">
            {BUSINESS_CHALLENGES.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.badge}
                  type="button"
                  aria-label={`Go to slide ${index + 1}: ${item.badge}`}
                  aria-current={selected ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07156F] focus-visible:ring-offset-2 motion-reduce:transition-none",
                    selected ? "w-7 bg-[#11113F]" : "w-2.5 bg-[#C9CDD6] hover:bg-[#A7AEBB]",
                  )}
                />
              );
            })}
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {`Selected challenge ${active + 1} of ${BUSINESS_CHALLENGES.length}: ${challenge.badge}`}
        </p>
      </div>
    </section>
  );
}

function HowWeThinkSection() {
  const bodyClass =
    "text-[16px] leading-[1.8] sm:text-[17px] sm:leading-[1.85] lg:text-[18px]";

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20" aria-label="How we think">
      <div className="container-page">
        <div className="mx-auto max-w-[1040px]">
          <h2 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[#11113F] sm:text-[2.35rem] lg:text-[2.75rem]">
            How We Think
          </h2>
          <div className="how-we-think-content mt-6 space-y-5 text-[#101A40] sm:mt-7 sm:space-y-6">
            <p className={bodyClass}>
              At YESBE Technologies, we believe meaningful digital transformation begins with
              understanding the business, not simply introducing new technology. Every organization
              operates through a combination of people, processes, information, and systems. Our
              approach focuses on bringing these elements together to create technology solutions
              that are practical, reliable, and aligned with business objectives.
            </p>
            <p className={bodyClass}>
              <strong className="font-semibold">Simplifying complexity</strong> is central to how we
              approach technology challenges. Businesses often rely on disconnected applications,
              repetitive manual processes, and systems that struggle to support changing
              requirements. We identify these challenges and develop solutions that streamline
              operations, reduce unnecessary effort, and improve the way work gets done.
            </p>
            <p className={bodyClass}>
              <strong className="font-semibold">Integration plays an equally important role</strong>{" "}
              in building effective digital environments. Rather than treating software applications
              and business functions as isolated components, we focus on connecting platforms,
              workflows, and information. This enables organizations to improve collaboration,
              maintain consistent data, and make more informed decisions across departments.
            </p>
            <p className={bodyClass}>
              Our commitment extends beyond developing and delivering software. We emphasize{" "}
              <strong className="font-semibold">
                scalability, adaptability, and long-term business value
              </strong>
              , ensuring that technology investments remain relevant as organizations evolve. Whether
              through custom software development, enterprise applications, AI-driven automation, or
              digital transformation consulting, our objective is to help businesses build stronger
              technological foundations.
            </p>
            <p className={bodyClass}>
              At YESBE Technologies, we see technology as an enabler of progress. By combining
              strategic thinking, technical expertise, and a business-first approach, we help
              organizations move beyond operational limitations and create opportunities for
              sustainable growth.
            </p>
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
      <HowWeThinkSection />
      <IndustrySolutionsSection />
      <PartnershipSection />
      <DeliveryApproachSection />
      <JournalSection />
      <ClosingCta />
    </>
  );
}
