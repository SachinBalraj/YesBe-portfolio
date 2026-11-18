import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { SERVICE_VISUALS, type ServiceVisualKey } from "@/data/media";
import { localSrcSet } from "@/utils/images";
import "@/styles/scroll-services.css";

interface ServiceCard {
  number: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  imageKey: ServiceVisualKey;
  imageAlt: string;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    number: "01",
    title: "Smarter Technology. Stronger Business.",
    description: "Transform business challenges into practical digital strategies.",
    cta: "Explore IT Consulting",
    href: "/services/it-consulting",
    imageKey: "transformation",
    imageAlt: "Professional IT consultants collaborating with business leaders in a modern office",
  },
  {
    number: "02",
    title: "Your Business. Your Software. Your Way.",
    description: "Build tailored applications that grow with your business.",
    cta: "Explore Software Solutions",
    href: "/services/custom-software",
    imageKey: "product",
    imageAlt: "Software engineers developing applications on computer monitors",
  },
  {
    number: "03",
    title: "Automate the Routine. Accelerate Growth.",
    description: "Use AI and intelligent automation to simplify everyday operations.",
    cta: "Explore AI Solutions",
    href: "/services/ai-solutions",
    imageKey: "intelligence",
    imageAlt: "Technology specialist working with automation workflows or business analytics",
  },
  {
    number: "04",
    title: "One Connected Business. Endless Possibilities.",
    description: "Bring sales, inventory, finance and customer operations together.",
    cta: "Explore ERP & CRM",
    href: "/services/erp-systems",
    imageKey: "enterprise",
    imageAlt: "Business professional reviewing enterprise software dashboards",
  },
  {
    number: "05",
    title: "Digital Experiences That Drive Results.",
    description: "Create modern websites, e-commerce platforms and web applications.",
    cta: "Explore Web Development",
    href: "/services/website-development",
    imageKey: "web",
    imageAlt: "Professional web developer working on modern web applications",
  },
  {
    number: "06",
    title: "Connected Systems. Scalable Future.",
    description: "Connect applications, infrastructure and data for reliable operations.",
    cta: "Explore Cloud Solutions",
    href: "/services/cloud-devops",
    imageKey: "cloud",
    imageAlt: "IT infrastructure engineer in a professional data center or cloud operations environment",
  },
];

const HEADER_OFFSET = 76;
const PIN_MULTIPLIER = 1.35;
const MIN_PIN_DISTANCE = 600;
const MAX_PIN_DISTANCE = 1200;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ScrollDrivenServices() {
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

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const progress = clamp((window.scrollY - (sectionTop - HEADER_OFFSET)) / Math.max(distance, 1), 0, 1);
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

    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => measure());

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
    "--service-pin-distance": pinDistance ? `${pinDistance}px` : undefined,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="featured-services"
      aria-label="Featured technology services"
      className="service-rail bg-paper"
      style={sectionStyle}
    >
      <div className="service-rail__sticky">
        <div className="container-page flex h-full flex-col justify-center py-8">
          <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="mt-3 max-w-3xl text-[clamp(1.9rem,3.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
                Services built around how your business works.
              </h2>
            </div>
            <p className="section-lead max-w-md">
              From strategy and software to AI, ERP, web and cloud, every service is designed to
              work as part of one connected delivery model.
            </p>
          </div>

          <div ref={viewportRef} className="service-rail__viewport">
            <div ref={trackRef} className="service-rail__track">
              {SERVICE_CARDS.map((card) => {
                const visual = SERVICE_VISUALS[card.imageKey];
                const variants = localSrcSet(visual.src, [640, 960]);
                return (
                  <article key={card.href} className="service-rail__card">
                    <div className="service-rail__panel">
                      <div className="service-rail__media">
                        <img
                          src={visual.src}
                          srcSet={variants ? `${variants}, ${visual.src} 1600w` : undefined}
                          sizes="(min-width: 1200px) 24vw, (min-width: 768px) 46vw, 84vw"
                          alt={card.imageAlt}
                          width={1600}
                          height={1000}
                          loading="lazy"
                          decoding="async"
                          className="service-rail__image"
                        />
                      </div>
                      <div className="service-rail__body">
                        <span className="service-rail__number">{card.number}</span>
                        <h3 className="service-rail__title">
                          <Link to={card.href} className="service-rail__title-link">
                            {card.title}
                          </Link>
                        </h3>
                        <p className="service-rail__description">{card.description}</p>
                        <Link to={card.href} className="service-rail__cta">
                          {card.cta}
                          <span aria-hidden="true">→</span>
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
