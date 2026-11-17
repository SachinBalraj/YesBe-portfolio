import { ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "@/constants";
import { ButtonLink } from "@/components/system/ButtonLink";
import { Eyebrow } from "@/components/system/Eyebrow";
import { Reveal } from "@/components/system/Reveal";
import { trackConsultationClick, trackContactClick, trackPhoneClick } from "@/utils/analytics";
import { cn } from "@/utils/cn";

interface ClosingCtaProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

const steps = [
  ["01", "Share the problem", "A short call about what is not working, not a sales presentation."],
  ["02", "Get an honest read", "We tell you whether technology is the constraint, and what the first step should be."],
  ["03", "Choose the next move", "Leave with a clear recommendation for scope, sequence and the people involved."],
] as const;

function ctaLocation(): string {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "").replace(/\//g, "_");
  return path ? `phase2_cta_${path}` : "phase2_cta_home";
}

export function ClosingCta({
  eyebrow = "Start a conversation",
  title = "Bring us the problem. We will map the path.",
  description = "Talk to the people who would actually shape and deliver the work. We will help you separate what needs building from what needs changing.",
  className,
}: ClosingCtaProps) {
  return (
    <section className={cn("bg-paper py-10 sm:py-12 lg:py-14", className)} aria-label="Consultation">
      <div className="container-page">
        <Reveal className="relative overflow-hidden bg-[#05132e] text-white shadow-dark-panel">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid-dark opacity-45"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-44 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(49,108,255,0.28),transparent_65%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 left-1/3 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(31,78,216,0.2),transparent_68%)]"
          />

          <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-12 xl:p-14">
            <div>
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-[2.8rem] lg:text-[3.4rem]">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/65 sm:text-base">
                {description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  to="/contact"
                  onClick={() => trackConsultationClick(ctaLocation())}
                  variant="inverted"
                  withArrow
                  className="w-full sm:w-auto"
                >
                  Discuss Your Project
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${SITE_CONFIG.email}`}
                  onClick={() => trackContactClick(ctaLocation())}
                  variant="on-dark"
                  icon={<Mail className="size-4" aria-hidden="true" />}
                  iconPosition="start"
                  className="w-full sm:w-auto"
                >
                  Email YESBE
                </ButtonLink>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-[13px] text-white/55">
                <a
                  href={SITE_CONFIG.phoneHref}
                  onClick={() => trackPhoneClick(ctaLocation())}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="size-3.5" aria-hidden="true" />
                  {`+91 ${SITE_CONFIG.phone}`}
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  onClick={() => trackContactClick(`${ctaLocation()}_email`)}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="size-3.5" aria-hidden="true" />
                  {SITE_CONFIG.email}
                </a>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
                >
                  Review selected work
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="self-end border-t border-white/15 lg:border-l lg:border-t-0 lg:pl-10">
              <ol className="divide-y divide-white/10">
                {steps.map(([number, stepTitle, copy]) => (
                  <li key={number} className="grid grid-cols-[2.25rem_1fr] gap-4 py-5 first:pt-0 last:pb-0">
                    <span className="pt-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-[#8eb5ff]">
                      {number}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{stepTitle}</p>
                      <p className="mt-1.5 text-[13px] leading-6 text-white/55">{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
