import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Asterisk } from "lucide-react";
import { HERO_FILM_PLAN } from "@/data/media";
import { FilmPlayer } from "@/components/phase2/FilmPlayer";
import { trackConsultationClick } from "@/utils/analytics";

const capabilities = [
  "IT consulting",
  "Custom software",
  "ERP & CRM",
  "AI & automation",
  "Cloud & data",
];

export function CinematicHero() {
  const heroMedia = HERO_FILM_PLAN.approved ? (
    <FilmPlayer
      webm={HERO_FILM_PLAN.webm}
      mp4={HERO_FILM_PLAN.mp4}
      poster={HERO_FILM_PLAN.poster}
      label={HERO_FILM_PLAN.label}
      autoPlay
      className="h-full w-full"
      videoClassName="object-cover object-[68%_50%]"
      controlClassName="bottom-20 right-5 sm:right-8"
      showScrim={false}
    />
  ) : (
    <picture className="absolute inset-0">
      <source srcSet="/background.webp" type="image/webp" />
      <img
        src="/background.png"
        alt=""
        width={1744}
        height={902}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-[66%_50%] max-md:object-[18%_50%]"
      />
    </picture>
  );

  return (
    <section
      id="hero"
      aria-label="YESBE Technologies — technology that moves business forward"
      className="relative isolate overflow-hidden bg-[#05132e] pt-[76px] text-white"
    >
      <div className="absolute inset-0">
        {heroMedia}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,19,46,0.24)_0%,rgba(5,19,46,0.1)_38%,transparent_70%)]"
        />
      </div>

      <div className="container-page relative flex min-h-[40rem] flex-col justify-between py-8 sm:min-h-[42rem] sm:py-10 lg:min-h-[44rem] lg:py-12">
        <div className="grid flex-1 items-center gap-10 py-2 lg:grid-cols-1 lg:py-6">
          <div className="max-w-[46rem]">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a9c1ed]">
              <Asterisk className="size-3.5 text-[#8eb5ff]" aria-hidden="true" />
              YESBE Technologies
              <span className="h-px w-8 bg-white/20" aria-hidden="true" />
              India
            </div>

            <h1 className="mt-6 max-w-[44rem] text-[clamp(2.65rem,6.4vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white">
              {"Empowering Businesses with "}
              <span className="bg-gradient-to-r from-[#8eb5ff] to-[#35c9ff] bg-clip-text text-transparent">
                Technology.
              </span>
            </h1>

            <p className="mt-6 max-w-[38rem] text-[15px] leading-7 text-white/70 sm:text-[17px] sm:leading-8">
              We build smart, scalable, and secure digital solutions that help businesses grow,
              automate operations, and move forward with confidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                onClick={() => trackConsultationClick("hero_phase2")}
                className="group inline-flex min-h-[3.25rem] items-center justify-between gap-8 bg-white px-5 py-3 text-sm font-semibold text-[#05132e] transition-colors hover:bg-[#dce8ff] sm:min-w-56"
              >
                Discuss Your Project
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/services"
                onClick={() => trackConsultationClick("hero_phase2_services")}
                className="group inline-flex min-h-[3.25rem] items-center justify-between gap-8 border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/[0.06] sm:min-w-56"
              >
                Explore Our Services
                <ArrowRight
                  className="size-4 text-[#8eb5ff] transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4">
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="text-[11px] font-medium tracking-[0.04em] text-white/48 sm:text-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="flex items-end justify-between gap-6 border-t border-white/10 pt-5">
          <p className="max-w-xs text-[11px] leading-5 text-white/38">
            A practical technology partner for businesses that need the work to hold up after launch.
          </p>
          <a
            href="#challenges"
            className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white"
          >
            Scroll to explore
            <ArrowDown
              className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
