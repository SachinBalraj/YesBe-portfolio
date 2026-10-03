import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  Code2,
  Boxes,
  Sparkles,
} from "lucide-react";
import { trackConsultationClick } from "@/utils/analytics";

const logoImg = "/YBlogo.png";
const logoImgWebp = "/YBlogo.webp";

/** Factual descriptions of what YESBE actually delivers — no credential claims. */
const capabilities = [
  { icon: Compass, label: "IT Consulting" },
  { icon: Code2, label: "Custom Software" },
  { icon: Boxes, label: "ERP & Web" },
];

export function PremiumHero() {
  return (
    <section
      id="hero"
      aria-label="Hero — YESBE Technologies, IT consulting and software development company"
      className="min-h-screen flex items-center bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-[90px] pb-24 lg:pt-[110px] lg:pb-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-6 items-center">
          {/* ── Left Content ── */}
          <div className="max-w-xl">
            <div className="lg:hidden inline-flex max-w-full items-center gap-2 rounded-full border border-primary/10 bg-primary/[0.03] px-4 py-1.5 text-[12px] font-medium text-primary mb-8">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>IT Consulting &bull; Software &bull; AI &bull; Automation</span>
            </div>

            <h1 className="text-4xl sm:text-[44px] lg:text-[48px] font-extrabold tracking-[-0.02em] leading-[1.05] max-w-2xl">
              <span className="block text-[#111827]">Technology Solutions{" "}</span>
              <span className="block text-[#111827]">
                Built for <span className="text-[#2563EB]">Business Growth</span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[15px] sm:text-[16px] leading-[1.7] text-muted-foreground">
              Websites, custom software, ERP, AI, automation and IT consulting — built around your business needs.
            </p>

            {/* Capability indicators — factual descriptions of the services offered */}
            <div className="mt-7 flex flex-wrap gap-4">
              {capabilities.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/[0.06]">
                    <item.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={() => trackConsultationClick("hero")}
                className="relative z-10 inline-flex items-center gap-2 rounded-xl btn-premium px-6 py-3.5 text-[14px] font-semibold text-white"
              >
                Discuss Your Project
                <ArrowRight className="h-4 w-4 shrink-0" />
              </a>
              <Link
                to="/services"
                onClick={() => trackConsultationClick("hero-services")}
                className="inline-flex items-center gap-2 rounded-xl btn-glass px-6 py-3.5 text-[14px] font-semibold text-foreground"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>

          {/* ── Right — Logo ── */}
          <div className="flex justify-center lg:justify-end">
            <picture>
              <source srcSet={logoImgWebp} type="image/webp" />
              <img
                src={logoImg}
                alt="YESBE Technologies logo"
                width={400}
                height={400}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-60 w-60 sm:h-[320px] sm:w-[320px] lg:h-[400px] lg:w-[400px] object-contain"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
