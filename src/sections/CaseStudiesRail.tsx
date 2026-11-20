import { useEffect, useRef, useState, type CSSProperties } from "react";
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
const HEADER_OFFSET = 76;
const PIN_MULTIPLIER = 1.25;
const MIN_PIN_DISTANCE = 520;
const MAX_PIN_DISTANCE = 1100;

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
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const srcSet = localSrcSet(cardImage.src, CARD_IMAGE_WIDTHS);
  const revealed = revealOnHover && (hovered || focused || pinned);
  const href = `/case-studies/${study.slug}`;
  const detailsId = `case-card-details-${study.slug}`;
  const cardClassName = [
    "case-rail__card",
    revealOnHover ? "case-rail__card--reveal" : "",
    revealed ? "case-rail__card--revealed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const imageElement = (
    <img
      src={cardImage.src}
      srcSet={srcSet ? `${srcSet}, ${cardImage.src} 1600w` : undefined}
      sizes="(min-width: 1200px) 23vw, (min-width: 768px) 46vw, 82vw"
      alt={cardImage.alt}
      width={1600}
      height={900}
      loading="lazy"
      decoding="async"
      className="case-rail__image"
    />
  );

  return (
    <article
      className={cardClassName}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHovered(false);
      }}
      onFocus={(event) => {
        const target = event.target;
        if (
          target instanceof Element &&
          target.matches(":focus-visible") &&
          target.matches(".case-rail__title-link, .case-rail__cta")
        ) {
          setFocused(true);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="case-rail__panel">
        <div className="case-rail__media">{imageElement}</div>
        {revealOnHover ? (
          <button
            type="button"
            className="case-rail__reveal-control"
            aria-label={`${pinned ? "Hide" : "Show"} details for ${study.title}`}
            aria-expanded={revealed}
            aria-controls={detailsId}
            onClick={() => setPinned((value) => !value)}
          >
            {pinned ? "Hide" : "Details"}
          </button>
        ) : null}
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
              <div
                className="case-rail__reveal-content"
                id={detailsId}
                aria-hidden={!revealed}
              >
                <p className="case-rail__description">{study.shortOverview}</p>
                <ul className="case-rail__tags" aria-label="Technologies">
                  {study.technologies.slice(0, 3).map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
              <Link
                to={href}
                className="case-rail__cta"
                tabIndex={revealed ? undefined : -1}
                aria-hidden={!revealed}
              >
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinDistance, setPinDistance] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1200px) and (prefers-reduced-motion: no-preference)");
    const trackElement = trackRef.current;
    let frame = 0;
    let maxTranslate = 0;
    let distance = 0;

    const applyTransform = () => {
      frame = 0;
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section || !media.matches) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      const progress = clamp((window.scrollY - sectionTop) / Math.max(distance, 1), 0, 1);
      track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;
    };

    const requestTransform = () => {
      if (!frame) frame = requestAnimationFrame(applyTransform);
    };

    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;

      maxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      distance = clamp(maxTranslate * PIN_MULTIPLIER, MIN_PIN_DISTANCE, MAX_PIN_DISTANCE);
      setPinDistance(media.matches ? distance : 0);
      track.style.willChange = media.matches ? "transform" : "";
      requestTransform();
    };

    const sync = () => {
      const track = trackRef.current;
      if (!media.matches) {
        if (track) {
          track.style.transform = "";
          track.style.willChange = "";
        }
        setPinDistance(0);
        return;
      }
      measure();
    };

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => measure());

    sync();
    if (observer) {
      if (viewportRef.current) observer.observe(viewportRef.current);
      if (trackRef.current) observer.observe(trackRef.current);
    }
    media.addEventListener("change", sync);
    window.addEventListener("scroll", requestTransform, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      media.removeEventListener("change", sync);
      window.removeEventListener("scroll", requestTransform);
      window.removeEventListener("resize", measure);
      if (trackElement) {
        trackElement.style.transform = "";
        trackElement.style.willChange = "";
      }
    };
  }, []);

  const sectionStyle = {
    "--case-pin-distance": pinDistance ? `${pinDistance}px` : undefined,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      aria-label="Selected work"
      className="case-rail"
      style={sectionStyle}
    >
      <div className="case-rail__sticky">
        <div className="container-page case-rail__inner">
          <div className="case-rail__intro">
            <p>{INTRODUCTION_CONTENT}</p>
          </div>
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
    </section>
  );
}
