import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  const lightSweep = LIGHT_SWEEP_SLUGS.includes(study.slug);
  const cardClassName = [
    "case-rail__card",
    revealOnHover ? "case-rail__card--reveal" : "",
    revealed ? "case-rail__card--revealed" : "",
    lightSweep ? "case-rail__card--light-sweep" : "",
  ]
    .filter(Boolean)
    .join(" ");

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
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateNav = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    setCanPrev(viewport.scrollLeft > 4);
    setCanNext(viewport.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    updateNav();
    viewport.addEventListener("scroll", updateNav, { passive: true });
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => updateNav());
    observer?.observe(viewport);
    if (viewport.firstElementChild) observer?.observe(viewport.firstElementChild);
    return () => {
      viewport.removeEventListener("scroll", updateNav);
      observer?.disconnect();
    };
  }, [updateNav]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const firstCard = viewport.querySelector<HTMLElement>(".case-rail__card");
    const gap = 24;
    const amount = firstCard ? firstCard.offsetWidth + gap : viewport.clientWidth;
    viewport.scrollBy({ left: direction * amount, behavior: "smooth" });
  }, []);

  return (
    <section
      id="selected-work"
      aria-label="Selected work"
      className="case-rail"
    >
      <div className="container-page case-rail__inner">
        <div className="case-rail__intro">
          <p>{INTRODUCTION_CONTENT}</p>
        </div>
        <div className="case-rail__carousel">
          <button
            type="button"
            className="case-rail__nav case-rail__nav--prev"
            aria-label="Previous projects"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <div ref={viewportRef} className="case-rail__viewport">
            <div className="case-rail__track">
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
          <button
            type="button"
            className="case-rail__nav case-rail__nav--next"
            aria-label="Next projects"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
