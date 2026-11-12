import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import { trackConsultationClick } from "@/utils/analytics";

const heroImage = "/yesbe.homepage.png";

/** Factual descriptions of what YESBE actually delivers — no credential claims. */
const capabilities = [
  "IT consulting",
  "Custom software",
  "ERP & web platforms",
  "AI & automation",
];

export function PremiumHero() {
  return (
    <section
      id="hero"
      aria-label="YESBE Technologies — IT consulting and software development"
      className="border-b border-border/70 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-[112px] pb-14 lg:pt-[136px] lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Left content */}
          <div className="max-w-xl">
            <p className="section-kicker">YESBE Technologies · {SITE_CONFIG.location}</p>

            <h1 className="mt-4 text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-[2.75rem] lg:text-[3.25rem]">
              Technology Solutions{" "}
              <br />
              Built for <span className="text-primary">Business Growth</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-[1.7] text-muted-foreground sm:text-[17px]">
              Websites, custom software, ERP, AI, automation and IT consulting — built around your
              business needs.
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
              {capabilities.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                onClick={() => trackConsultationClick("hero")}
                className="btn-primary group w-full sm:w-auto"
              >
                Discuss Your Project
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/services"
                onClick={() => trackConsultationClick("hero-services")}
                className="btn-secondary group w-full sm:w-auto"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="mt-6 text-[13px] text-muted-foreground">
              Mon – Sat, 9:00 AM – 8:00 PM IST
            </p>
          </div>

          {/* Right — hero image */}
          <div className="lg:justify-self-end">
            <img
              src={heroImage}
              alt="Business professionals collaborating around a laptop in an office"
              width={1536}
              height={1024}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="aspect-[3/2] w-full max-w-[560px] border border-border object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
