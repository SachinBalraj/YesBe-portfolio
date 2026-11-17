import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Asterisk } from "lucide-react";
import { CAPABILITY_INDEX } from "@/data/phase2";
import { HERO_FILM } from "@/data/media";
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
  return (
    <section
      id="hero"
      aria-label="YESBE Technologies — technology that moves business forward"
      className="relative isolate overflow-hidden bg-[#05132e] pt-[76px] text-white"
    >
      <div className="absolute inset-0">
        <FilmPlayer
          {...HERO_FILM}
          autoPlay
          className="h-full w-full"
          videoClassName="object-cover object-[68%_50%]"
          controlClassName="bottom-20 right-5 sm:right-8"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,19,46,0.98)_0%,rgba(5,19,46,0.93)_40%,rgba(5,19,46,0.52)_74%,rgba(5,19,46,0.72)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,19,46,0.38)_0%,rgba(5,19,46,0.06)_34%,rgba(5,19,46,0.78)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-35" />
        <div className="pointer-events-none absolute inset-y-0 right-[8%] hidden w-px bg-white/10 lg:block" />
        <div className="pointer-events-none absolute right-[8%] top-0 hidden h-28 w-px bg-[#8eb5ff]/60 lg:block" />
      </div>

      <div className="container-page relative flex min-h-[40rem] flex-col justify-between py-8 sm:min-h-[42rem] sm:py-10 lg:min-h-[44rem] lg:py-12">
        <div className="grid flex-1 items-center gap-10 py-2 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-6">
          <div className="max-w-[46rem]">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a9c1ed]">
              <Asterisk className="size-3.5 text-[#8eb5ff]" aria-hidden="true" />
              YESBE Technologies
              <span className="h-px w-8 bg-white/20" aria-hidden="true" />
              India
            </div>

            <h1 className="mt-6 max-w-[44rem] text-[clamp(2.65rem,6.4vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white">
              {"Technology That Moves Business "}
              <span className="text-[#8eb5ff]">Forward.</span>
            </h1>

            <p className="mt-6 max-w-[38rem] text-[15px] leading-7 text-white/70 sm:text-[17px] sm:leading-8">
              IT consulting, custom software, AI, ERP, and automation designed around real business
              needs.
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

          <div className="hidden lg:block lg:justify-self-end">
            <div className="w-full max-w-[20rem] border border-white/14 bg-[#05132e]/55 p-1 backdrop-blur-md">
              <div className="border border-white/10">
                <p className="border-b border-white/10 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  How we create value
                </p>
                <ol className="divide-y divide-white/10">
                  {CAPABILITY_INDEX.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={item.label}
                        className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.035]"
                      >
                        <span className="font-mono text-[10px] tracking-[0.1em] text-white/32">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex size-8 items-center justify-center border border-white/12 text-[#8eb5ff] transition-colors group-hover:border-[#8eb5ff]/40">
                          <Icon className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13px] font-semibold text-white">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-white/45">
                            {item.detail}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
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
