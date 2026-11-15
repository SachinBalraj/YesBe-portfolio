import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Container } from "./Container";

type SectionTone = "paper" | "white" | "muted" | "navy" | "transparent";
type SectionSize = "sm" | "md" | "lg" | "none";

interface SectionProps {
  tone?: SectionTone;
  size?: SectionSize;
  container?: "page" | "editorial" | "narrow" | false;
  divider?: boolean;
  className?: string;
  innerClassName?: string;
  id?: string;
  ariaLabel?: string;
  children: ReactNode;
}

const tones: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  white: "bg-white text-ink",
  muted: "bg-paper-deep text-ink",
  navy: "bg-navy-deep text-white",
  transparent: "",
};

const paddings: Record<SectionSize, string> = {
  sm: "py-12 lg:py-16",
  md: "py-16 lg:py-24",
  lg: "py-20 lg:py-32",
  none: "",
};

export function Section({
  tone = "paper",
  size = "md",
  container = "page",
  divider = false,
  className,
  innerClassName,
  id,
  ariaLabel,
  children,
}: SectionProps) {
  const content = container === false ? children : (
    <Container size={container} className={innerClassName}>
      {children}
    </Container>
  );

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(tones[tone], paddings[size], divider && "border-y border-line", className)}
    >
      {content}
    </section>
  );
}
