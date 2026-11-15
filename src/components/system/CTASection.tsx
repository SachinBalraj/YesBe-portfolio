import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { ButtonLink } from "./ButtonLink";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

interface CTAAction {
  label: string;
  to?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

interface CTASectionProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  primary?: CTAAction;
  secondary?: CTAAction;
  tone?: "dark" | "light";
  className?: string;
  id?: string;
}

export function CTASection({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  tone = "dark",
  className,
  id,
}: CTASectionProps) {
  const isDark = tone === "dark";

  return (
    <Section
      id={id}
      tone={isDark ? "navy" : "paper"}
      size="lg"
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          isDark ? "bg-grid-dark opacity-60" : "bg-grid bg-cobalt-glow opacity-70",
        )}
      />
      <Reveal className="relative mx-auto max-w-4xl text-center">
        {eyebrow && (
          <Eyebrow tone={isDark ? "dark" : "light"} className="mb-6 justify-center">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className={cn("display-lg", isDark ? "text-on-dark" : "text-ink")}>{title}</h2>
        {description && (
          <p className={cn("lead-editorial mx-auto mt-6", isDark ? "body-on-dark" : "text-body")}>
            {description}
          </p>
        )}
        {(primary || secondary) && (
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {primary && (
              <ButtonLink
                to={primary.to}
                href={primary.href}
                onClick={primary.onClick}
                variant={isDark ? "inverted" : "primary"}
                size="lg"
                withArrow
              >
                {primary.label}
              </ButtonLink>
            )}
            {secondary && (
              <ButtonLink
                to={secondary.to}
                href={secondary.href}
                onClick={secondary.onClick}
                variant={isDark ? "on-dark" : "secondary"}
                size="lg"
              >
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        )}
      </Reveal>
    </Section>
  );
}
