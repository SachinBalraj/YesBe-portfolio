import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { orderedCaseStudies } from "@/data/phase3";
import { localSrcSet } from "@/utils/images";
import "@/styles/case-studies-rail.css";

const CASE_STUDIES = orderedCaseStudies.slice(0, 6);
const HEADER_OFFSET = 76;
const PIN_MULTIPLIER = 1.25;
const MIN_PIN_DISTANCE = 520;
const MAX_PIN_DISTANCE = 1100;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
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
      aria-labelledby="case-studies-heading"
      className="case-rail"
      style={sectionStyle}
    >
      <div className="case-rail__sticky">
        <div className="container-page case-rail__inner">
          <div className="case-rail__intro">
            <p className="eyebrow">Selected work</p>
            <h2 id="case-studies-heading">Technology in Action.</h2>
            <p>
              Explore how thoughtful technology solutions can simplify operations, connect systems,
              and create better digital experiences.
            </p>
          </div>
          <div ref={viewportRef} className="case-rail__viewport">
            <div ref={trackRef} className="case-rail__track">
              {CASE_STUDIES.map((study) => {
                const srcSet = localSrcSet(study.image, [480, 800]);
                return (
                  <article key={study.slug} className="case-rail__card">
                    <div className="case-rail__panel">
                      <div className="case-rail__media">
                        <img
                          src={study.image}
                          srcSet={srcSet ? `${srcSet}, ${study.image} 1200w` : undefined}
                          sizes="(min-width: 1200px) 23vw, (min-width: 768px) 46vw, 82vw"
                          alt={`${study.title} — illustrative interface preview`}
                          width={1200}
                          height={760}
                          loading="lazy"
                          decoding="async"
                          className="case-rail__image"
                        />
                      </div>
                      <div className="case-rail__body">
                        <div className="case-rail__meta">
                          <span>{study.category}</span>
                          <span>{study.label}</span>
                        </div>
                        <h3 className="case-rail__title">
                          <Link to={`/case-studies/${study.slug}`} className="case-rail__title-link">
                            {study.title}
                          </Link>
                        </h3>
                        <p className="case-rail__description">{study.shortOverview}</p>
                        <ul className="case-rail__tags" aria-label="Technologies">
                          {study.technologies.slice(0, 3).map((technology) => (
                            <li key={technology}>{technology}</li>
                          ))}
                        </ul>
                        <Link to={`/case-studies/${study.slug}`} className="case-rail__cta">
                          Explore Case Study
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
