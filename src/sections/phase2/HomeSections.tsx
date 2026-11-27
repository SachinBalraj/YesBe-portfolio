import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent,
} from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/system/Reveal";
import { BUSINESS_CHALLENGES, PARTNERSHIP_POINTS } from "@/data/phase2";
import { cn } from "@/utils/cn";

const companyAvifSet =
  "/images/company/yesbe-consultation-480.avif 480w, /images/company/yesbe-consultation-720.avif 720w, /images/company/yesbe-consultation-960.avif 960w, /images/company/yesbe-consultation-1280.avif 1280w";
const companyWebpSet =
  "/images/company/yesbe-consultation-480.webp 480w, /images/company/yesbe-consultation-720.webp 720w, /images/company/yesbe-consultation-960.webp 960w, /images/company/yesbe-consultation-1280.webp 1280w";
const companyJpgSet =
  "/images/company/yesbe-consultation-480.jpg 480w, /images/company/yesbe-consultation-720.jpg 720w, /images/company/yesbe-consultation-960.jpg 960w, /images/company/yesbe-consultation-1280.jpg 1280w";

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

const CHALLENGE_TOOLTIPS = [
  { title: "Diagnose", description: "We understand your business challenges, existing processes, and technology requirements." },
  { title: "Architect", description: "We design the right technology architecture, workflows, and implementation roadmap." },
  { title: "Build", description: "We develop and integrate reliable software solutions tailored to your business." },
  { title: "Launch", description: "We test, deploy, and introduce your solution with a focus on smooth operations." },
  { title: "Improve", description: "We monitor performance, refine functionality, and support continuous improvement." },
] as const;


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

  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hoveredDot === null) return;
    const close = (event: MouseEvent | TouchEvent) => {
      if (waveRef.current?.contains(event.target as Node)) return;
      setHoveredDot(null);
    };
    const onEsc = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setHoveredDot(null);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
      document.removeEventListener("keydown", onEsc);
    };
  }, [hoveredDot]);

  if (!challenge) return null;

  const handleWaveKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
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
    } else if (event.key === "Escape") {
      setHoveredDot(null);
      (event.target as HTMLElement).blur();
      return;
    } else {
      return;
    }

    event.preventDefault();
    goTo(next);
    setHoveredDot(next);
    window.requestAnimationFrame(() => {
      document.getElementById(`challenge-dot-${next + 1}`)?.focus();
    });
  };

  const handleCarouselKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest("a,button,input,textarea,select")) return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
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
    <section id="challenges" className="bg-white pt-0 pb-11 lg:pt-0 lg:pb-[4.75rem]" aria-label="Business challenges">
      <div className="container-page">
        <Reveal>
          <h2 className="mb-6 max-w-3xl text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-[#17154C] sm:text-[2.125rem] lg:mb-8 lg:text-[3.25rem]">
            Complex Challenges. Smarter Solutions.
          </h2>
        </Reveal>

        <div className="mx-auto w-full max-w-[1120px]">
          <div
            ref={waveRef}
            className="relative overflow-visible"
            role="group"
            aria-label="Delivery process timeline"
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
                stroke="#10145C"
                strokeWidth={7}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {CHALLENGE_DOTS.map((dot, index) => {
              const tip = CHALLENGE_TOOLTIPS[index];
              if (!tip) return null;
              const selected = index === active;
              const open = hoveredDot === index;
              const tipId = `challenge-tooltip-${index + 1}`;

              return (
                <div
                  key={tip.title}
                  className="absolute z-20"
                  style={{
                    left: `${(dot.x / CHALLENGE_WAVE_WIDTH) * 100}%`,
                    top: `${(dot.y / CHALLENGE_WAVE_HEIGHT) * 100}%`,
                  }}
                  onMouseEnter={() => setHoveredDot(index)}
                  onMouseLeave={() => setHoveredDot(null)}
                >
                  <button
                    id={`challenge-dot-${index + 1}`}
                    type="button"
                    aria-label={`Step ${index + 1}: ${tip.title}`}
                    aria-describedby={open ? tipId : undefined}
                    aria-pressed={selected}
                    aria-controls={`challenge-detail-${index + 1}`}
                    onClick={() => {
                      goTo(index);
                      setHoveredDot((current) => (current === index ? null : index));
                    }}
                    onFocus={() => setHoveredDot(index)}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setHoveredDot(null);
                    }}
                    className="group flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10145C] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <span
                      className={cn(
                        "block size-5 rounded-full bg-[#10145C] transition-[transform,box-shadow] duration-200 ease-out motion-reduce:transition-none sm:size-6",
                        open || selected ? "scale-[1.15] ring-[3px] ring-[#10145C]/20" : "group-hover:scale-[1.15] group-hover:ring-[3px] group-hover:ring-[#10145C]/20",
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={tipId}
                    role="tooltip"
                    aria-hidden={!open}
                    className={cn(
                      "pointer-events-none absolute bottom-full z-30 mb-5 w-[min(260px,calc(100vw-2rem))] rounded-xl bg-[#10145C] px-4 py-3.5 text-left text-white shadow-[0_12px_28px_rgba(16,20,92,0.28)] transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
                      index === 0 ? "left-0 -translate-x-[12%]" : index === CHALLENGE_DOTS.length - 1 ? "right-0 left-auto translate-x-[12%]" : "left-1/2 -translate-x-1/2",
                      open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    )}
                  >
                    <p className="text-[13px] font-semibold leading-5 text-white">{String(index + 1).padStart(2, "0")} — {tip.title}</p>
                    <p className="mt-1.5 text-[12px] leading-5 text-white/90">{tip.description}</p>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute top-full border-[7px] border-transparent border-t-[#10145C]",
                        index === 0 ? "left-[18%]" : index === CHALLENGE_DOTS.length - 1 ? "right-[18%]" : "left-1/2 -translate-x-1/2",
                      )}
                    />
                  </div>
                </div>
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
          <h2 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[#17154C] sm:text-[2.35rem] lg:text-[2.75rem]">
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

function PartnershipSection() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16" aria-label="The YESBE partnership">
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <Reveal>
            <h2 className="max-w-xl text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#10145C] sm:text-[2.6rem] lg:text-[3rem]">
              A Technology Partner, Not Just a Vendor.
            </h2>
            <p className="mt-5 max-w-xl text-[17px] font-normal leading-[1.6] text-[#0B1F46] sm:text-[19px] lg:text-[21px]">
              The useful difference is not a larger team or a longer list of tools. It is how
              decisions are made, how scope is controlled and what happens when the project leaves
              the proposal stage. For secure, verifiable digital workflows, explore our <Link to="/services/blockchain" className="font-semibold text-[#10145C] underline decoration-[#10145C]/30 underline-offset-4 transition-colors hover:decoration-[#10145C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10145C] focus-visible:ring-offset-2">Blockchain &amp; Data Privacy</Link> capabilities.
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div className="overflow-hidden rounded-lg">
              <picture>
                <source type="image/avif" srcSet={companyAvifSet} sizes="(min-width: 1024px) 42vw, 100vw" />
                <source type="image/webp" srcSet={companyWebpSet} sizes="(min-width: 1024px) 42vw, 100vw" />
                <img
                  src="/images/company/yesbe-consultation-960.jpg"
                  srcSet={companyJpgSet}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  alt="Two professionals reviewing project requirements on a laptop"
                  width={1600}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </picture>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="mx-auto mt-10 max-w-[960px] lg:mt-12">
          <ol className="divide-y divide-[#D6DCE7] border-y border-[#D6DCE7]">
            {PARTNERSHIP_POINTS.map((point, index) => (
              <li key={point.title}>
                <div
                  tabIndex={0}
                  className={cn(
                    "group/row grid grid-cols-[auto_auto_1fr_auto] items-start gap-3 bg-[#FDFBF7] px-4 py-5 transition-colors duration-300 ease-out hover:bg-[#E8EEFF] focus-visible:bg-[#E8EEFF] focus-visible:outline-none motion-reduce:transition-none sm:gap-4 sm:px-5 sm:py-6",
                  )}
                >
                  <span className="pt-0.5 font-mono text-[13px] font-semibold tracking-[0.08em] text-[#17154C] sm:text-[14px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="w-px self-stretch bg-[#D6DCE7]" />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold leading-snug text-[#071B40] sm:text-[16px]">
                      {point.title}
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-6 text-[#243047] sm:text-[14px]">
                      {point.description}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="mt-0.5 size-4 shrink-0 text-[#155EEF]/55 transition-all duration-300 ease-out group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-[#155EEF] group-focus-visible/row:-translate-y-0.5 group-focus-visible/row:translate-x-0.5 group-focus-visible/row:text-[#155EEF] motion-reduce:transition-none sm:size-[18px]"
                    aria-hidden="true"
                  />
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

export function Phase2HomeSections() {
  return (
    <>
      <BusinessChallengesSection />
      <HowWeThinkSection />
      <PartnershipSection />
    </>
  );
}
