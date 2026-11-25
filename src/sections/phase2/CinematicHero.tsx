import { Link } from "react-router-dom";
import { trackConsultationClick } from "@/utils/analytics";

const HERO_POSTER = "/images/hero/hero-poster.webp";

export function CinematicHero() {
  return (
    <section
      id="hero"
      aria-label="YESBE Technologies — future builder"
      className="relative isolate overflow-hidden bg-[#05132e] pt-[76px] text-white"
    >
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          aria-hidden="true"
        >
          <source src="/videoabout.mp4" type="video/mp4" />
        </video>
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden="true"
          width={1280}
          height={720}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 hidden h-full w-full object-cover object-center motion-reduce:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,24,0.28)_0%,rgba(3,10,24,0.12)_42%,transparent_72%)]"
        />
      </div>

      <div className="container-page relative flex min-h-[44rem] items-center py-12 sm:min-h-[46rem] lg:min-h-[calc(100svh-76px)] lg:py-16">
        <div className="max-w-[48rem]">
          <h1 className="text-[clamp(2.6rem,6.8vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.055em] text-white">
            We&apos;re a Future
            <br />
            Builder
          </h1>

          <div className="mt-8 flex items-stretch gap-4 sm:gap-5">
            <span aria-hidden="true" className="w-px shrink-0 self-stretch bg-white/80" />
            <p className="text-lg leading-8 text-white sm:text-xl sm:leading-9 lg:text-[1.7rem] lg:leading-[2.6rem]">
              <span className="block font-normal text-white">
                Your Next Big Idea Gets a <span className="font-normal text-white">yes</span>
              </span>
              <span className="block font-normal text-white">
                with <span className="font-bold text-[#35c9ff]">YesBe</span>
              </span>
            </p>
          </div>

          <Link
            to="/contact"
            onClick={() => trackConsultationClick("hero_phase2")}
            className="mt-9 inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-white px-7 text-[15px] font-semibold text-[#05132e] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:bg-[#e8f3ff] hover:shadow-[0_14px_36px_rgba(0,0,0,0.24)] motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none"
          >
            Let&apos;s Start →
          </Link>
        </div>
      </div>
    </section>
  );
}
