import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface ShowcaseFeature {
  title: string;
  description?: string;
  icon?: ReactNode;
}

interface FeatureShowcaseProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  features: ShowcaseFeature[];
  media: ReactNode;
  action?: ReactNode;
  mediaPosition?: "left" | "right";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
}

export function FeatureShowcase({
  eyebrow,
  title,
  description,
  features,
  media,
  action,
  mediaPosition = "right",
  tone = "light",
  className,
  id,
}: FeatureShowcaseProps) {
  const mediaFirst = mediaPosition === "left";

  return (
    <div
      id={id}
      className={cn(
        "overflow-hidden rounded-panel border shadow-panel",
        tone === "dark" ? "surface-dark" : "border-line bg-card",
        className,
      )}
    >
      <div className="grid lg:grid-cols-12">
        <Reveal
          as="div"
          className={cn(
            "p-7 sm:p-10 lg:col-span-6 lg:p-14",
            mediaFirst ? "lg:order-2" : "lg:order-1",
          )}
        >
          {eyebrow && (
            <Eyebrow tone={tone} className="mb-5">
              {eyebrow}
            </Eyebrow>
          )}
          <h2 className={cn("display-sm", tone === "dark" && "text-on-dark")}>{title}</h2>
          {description && (
            <p className={cn("mt-4 text-base leading-7", tone === "dark" ? "body-on-dark" : "text-body")}>
              {description}
            </p>
          )}

          <ul className="mt-8 space-y-0">
            {features.map((feature, index) => (
              <li
                key={feature.title}
                className="grid grid-cols-[auto_1fr] gap-4 border-t border-line/80 py-5"
              >
                <span
                  className={cn(
                    "pt-0.5 font-mono text-[11px] font-medium tracking-[0.12em]",
                    tone === "dark" ? "text-cobalt-bright" : "text-primary",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    {feature.icon && <span className="text-primary">{feature.icon}</span>}
                    <h3
                      className={cn(
                        "text-sm font-semibold tracking-[-0.01em]",
                        tone === "dark" ? "text-on-dark" : "text-ink",
                      )}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  {feature.description && (
                    <p
                      className={cn(
                        "mt-1.5 text-sm leading-relaxed",
                        tone === "dark" ? "body-on-dark" : "text-body",
                      )}
                    >
                      {feature.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {action && <div className="mt-8">{action}</div>}
        </Reveal>

        <Reveal
          as="div"
          delay={80}
          className={cn(
            "relative min-h-[22rem] lg:col-span-6",
            mediaFirst ? "lg:order-1" : "lg:order-2",
          )}
        >
          {media}
        </Reveal>
      </div>
    </div>
  );
}
