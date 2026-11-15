import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Eyebrow } from "@/components/system/Eyebrow";

interface SectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  id?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  align = "left",
  action,
  tone = "light",
  className,
  id,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "items-start",
        action && "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <Eyebrow tone={tone} className="mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <Tag id={id} className={cn("section-title", tone === "dark" && "text-on-dark")}>
          {title}
        </Tag>
        {description && (
          <p className={cn("section-lead", tone === "dark" && "body-on-dark")}>{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
