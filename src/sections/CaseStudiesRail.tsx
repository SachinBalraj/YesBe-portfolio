import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { orderedCaseStudies } from "@/data/phase3";
import { localSrcSet } from "@/utils/images";
import "@/styles/case-studies-rail.css";

const CASE_STUDIES = orderedCaseStudies.slice(0, 6);
const HOVER_REVEAL_SLUGS = [
  "fashion-fusion",
  "erp-management",
  "ai-business-assistant",
  "restaurant-qr-ordering",
  "library-management",
  "business-automation",
];
const LIGHT_SWEEP_SLUGS = [
  "fashion-fusion",
  "erp-management",
  "ai-business-assistant",
  "restaurant-qr-ordering",
  "library-management",
  "business-automation",
];
const CARD_IMAGE_WIDTHS = [480, 640, 960];
const CARD_IMAGES: Record<string, { src: string; alt: string }> = {
  "fashion-fusion": {
    src: "/images/case-rail/fashion-fusion-card.webp",
    alt: "Radiating electric blue fiber-optic strands on a deep navy background",
  },
  "erp-management": {
    src: "/images/case-rail/erp-management-card.webp",
    alt: "Flowing luminous fiber-optic data lines across a dark blue field",
  },
  "ai-business-assistant": {
    src: "/images/case-rail/ai-business-assistant-card.webp",
    alt: "Cyan and electric blue light waves forming an abstract digital wave",
  },
  "restaurant-qr-ordering": {
    src: "/images/case-rail/restaurant-qr-ordering-card.webp",
    alt: "Interconnected white and blue optical fibers glowing in darkness",
  },
  "library-management": {
    src: "/images/case-rail/library-management-card.webp",
    alt: "Crisp blue light streaks flowing through a black background",
  },
  "business-automation": {
    src: "/images/case-rail/business-automation-card.webp",
    alt: "Futuristic cyan energy waves glowing against a deep navy background",
  },
};
const INTRODUCTION_CONTENT = [
  "YESBE Technologies empowers businesses to modernize ",
  <span key="technology" className="case-rail__intro-highlight">technology</span>,
  ", simplify ",
  <span key="operations" className="case-rail__intro-highlight">operations</span>,
  ", and reimagine ",
  <span key="experiences" className="case-rail__intro-highlight">digital experiences</span>,
  "—turning complex business challenges into smarter, scalable solutions.",
];

const DESKTOP_STICKY_MEDIA = "(min-width: 768px)";
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type CardStudy = (typeof CASE_STUDIES)[number];
type CardImage = { src: string; alt: string };

function CaseStudyCard({
  study,
  cardImage,
  revealOnHover,
}: {
  study: CardStudy;
  cardImage: CardImage;
  revealOnHover: boolean;
}) {
  const href = `/case-studies/${study.slug}`;
  const lightSweep = LIGHT_SWEEP_SLUGS.includes(study.slug);
  const cardClassName = [
    "case-rail__card",
    revealOnHover ? "case-rail__card--reveal" : "",
    lightSweep ? "case-rail__card--light-sweep" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const srcSet = localSrcSet(cardImage.src, CARD_IMAGE_WIDTHS);
  const imageElement = (
    <img
      src={cardImage.src}
      srcSet={srcSet ? `${srcSet}, ${cardImage.src} 1600w` : undefined}
      sizes="(min-width: 1200px) 30vw, (min-width: 768px) 46vw, 92vw"
      alt={cardImage.alt}
      width={1600}
      height={900}
      loading="lazy"
      decoding="async"
      className="case-rail__image"
    />
  );

  return (
    <article className={cardClassName}>
      <div className="case-rail__panel">
        <div className="case-rail__media">{imageElement}</div>
        <div className="case-rail__body">
          <div className="case-rail__meta">
            <span>{study.category}</span>
            <span>{study.label}</span>
          </div>
          <h3 className="case-rail__title">
            <Link to={href} className="case-rail__title-link">
              {study.title}
            </Link>
          </h3>
          {revealOnHover ? (
            <>
              <div className="case-rail__reveal-content">
                <p className="case-rail__description">{study.shortOverview}</p>
                <ul className="case-rail__tags" aria-label="Technologies">
                  {study.technologies.slice(0, 3).map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
              <Link to={href} className="case-rail__cta">
                Explore Case Study
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </>
          ) : (
            <>
              <p className="case-rail__description">{study.shortOverview}</p>
              <ul className="case-rail__tags" aria-label="Technologies">
                {study.technologies.slice(0, 3).map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <Link to={href} className="case-rail__cta">
                Explore Case Study
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function CaseStudiesRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !viewport || !track) return;

    const desktopMedia = window.matchMedia(DESKTOP_STICKY_MEDIA);
    const reducedMedia = window.matchMedia(REDUCED_MOTION_MEDIA);
    let frame = 0;
    let distance = 0;
    let maxTranslate = 0;

    const getStickyTop = () => {
      const raw = window.getComputedStyle(sticky).top;
      const parsed = Number.parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const applyProgress = () => {
      frame = 0;
      if (!desktopMedia.matches || reducedMedia.matches || distance <= 0) {
        track.style.transform = "translate3d(0, 0, 0)";
        return;
      }
      const stickyTop = getStickyTop();
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - stickyTop;
      const progress = clamp((window.scrollY - sectionTop) / distance, 0, 1);
      track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(applyProgress);
    };

    const measure = () => {
      if (!desktopMedia.matches || reducedMedia.matches) {
        distance = 0;
        maxTranslate = 0;
        section.style.removeProperty("--case-pin-distance");
        track.style.transform = "translate3d(0, 0, 0)";
        return;
      }
      const viewportWidth = viewport.clientWidth;
      const trackWidth = track.scrollWidth;
      maxTranslate = Math.max(trackWidth - viewportWidth, 0);
      distance = maxTranslate;
      if (maxTranslate > 0) {
        section.style.setProperty("--case-pin-distance", `${maxTranslate}px`);
      } else {
        section.style.removeProperty("--case-pin-distance");
      }
      requestUpdate();
    };

    const onResize = () => measure();

    measure();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => measure());
    ro.observe(viewport);
    ro.observe(track);
    ro.observe(sticky);

    viewport.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });

    const onMediaChange = () => measure();
    desktopMedia.addEventListener("change", onMediaChange);
    reducedMedia.addEventListener("change", onMediaChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", onResize);
      desktopMedia.removeEventListener("change", onMediaChange);
      reducedMedia.removeEventListener("change", onMediaChange);
      ro.disconnect();
      viewport.querySelectorAll("img").forEach((img) => img.removeEventListener("load", measure));
      section.style.removeProperty("--case-pin-distance");
      track.style.transform = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      aria-label="Selected work"
      className="case-rail"
    >
      <div ref={stickyRef} className="case-rail__sticky">
        <div className="container-page case-rail__inner">
          <div className="case-rail__intro">
            <p>{INTRODUCTION_CONTENT}</p>
          </div>
          <div className="case-rail__carousel">
            <div ref={viewportRef} className="case-rail__viewport">
              <div ref={trackRef} className="case-rail__track">
                {CASE_STUDIES.map((study) => {
                  const cardImage = CARD_IMAGES[study.slug];
                  return (
                    <CaseStudyCard
                      key={study.slug}
                      study={study}
                      cardImage={cardImage}
                      revealOnHover={HOVER_REVEAL_SLUGS.includes(study.slug)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
