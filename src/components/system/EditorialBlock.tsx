import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface EditorialPoint {
  title: string;
  description?: string;
}

interface EditorialBlockProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  points?: EditorialPoint[];
  action?: ReactNode;
  media: ReactNode;
  mediaPosition?: "left" | "right";
  tone?: "light" | "dark";
  align?: "top" | "center";
  className?: string;
  id?: string;
}

export function EditorialBlock({
  eyebrow,
  title,
  description,
  points,
  action,
  media,
  mediaPosition = "right",
  tone = "light",
  align = "center",
  className,
  id,
}: EditorialBlockProps) {
  const mediaFirst = mediaPosition === "left";

  return (
    <div
      id={id}
      className={cn(
        "grid gap-10 lg:grid-cols-12 lg:gap-16",
        align === "center" ? "items-center" : "items-start",
        className,
      )}
    >
      <Reveal
        as="div"
        className={cn(
          "lg:col-span-5",
          mediaFirst ? "lg:order-2" : "lg:order-1",
        )}
      >
        {eyebrow && (
          <Eyebrow tone={tone} className="mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className={cn("display-md", tone === "dark" && "text-on-dark")}>{title}</h2>
        {description && (
          <p className={cn("lead-editorial mt-5", tone === "dark" && "body-on-dark")}>
            {description}
          </p>
        )}

        {points && points.length > 0 && (
          <ul className="mt-8 space-y-5">
            {points.map((point) => (
              <li key={point.title} className="border-t border-line pt-5">
                <h3
                  className={cn(
                    "text-base font-semibold tracking-[-0.01em]",
                    tone === "dark" ? "text-on-dark" : "text-ink",
                  )}
                >
                  {point.title}
                </h3>
                {point.description && (
                  <p className={cn("mt-1.5 text-sm leading-relaxed", tone === "dark" ? "body-on-dark" : "text-body")}>
                    {point.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}

        {action && <div className="mt-9">{action}</div>}
      </Reveal>

      <Reveal
        as="div"
        delay={80}
        className={cn(
          "lg:col-span-7",
          mediaFirst ? "lg:order-1" : "lg:order-2",
        )}
      >
        {media}
      </Reveal>
    </div>
  );
}
