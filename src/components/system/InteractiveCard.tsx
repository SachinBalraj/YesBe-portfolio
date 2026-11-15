import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { MediaFrame, type FrameImage } from "./MediaFrame";

interface InteractiveCardProps {
  title: string;
  description?: string;
  href: string;
  eyebrow?: string;
  index?: number | string;
  icon?: ReactNode;
  image?: FrameImage;
  variant?: "light" | "outline" | "dark";
  className?: string;
}

export function InteractiveCard({
  title,
  description,
  href,
  eyebrow,
  index,
  icon,
  image,
  variant = "light",
  className,
}: InteractiveCardProps) {
  const isExternal = /^https?:\/\//.test(href);

  const content = (
    <>
      {image && (
        <MediaFrame
          image={image}
          ratio="aspect-[16/10]"
          className="rounded-none border-0 border-b border-line"
          mediaClassName="rounded-none border-0"
        />
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow && (
              <p
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-[0.14em]",
                  variant === "dark" ? "text-cobalt-bright" : "text-primary",
                )}
              >
                {eyebrow}
              </p>
            )}
            <h3
              className={cn(
                "mt-2 text-lg font-semibold tracking-[-0.02em]",
                variant === "dark" ? "text-on-dark" : "text-ink",
              )}
            >
              {title}
            </h3>
          </div>

          <span
            className="flex size-9 shrink-0 items-center justify-center border border-line text-ink transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white"
            aria-hidden="true"
          >
            {icon ?? <ArrowUpRight className="size-4" />}
          </span>
        </div>

        {description && (
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed",
              variant === "dark" ? "body-on-dark" : "text-body",
            )}
          >
            {description}
          </p>
        )}

        <div
          className={cn(
            "mt-auto flex items-center justify-between gap-4 pt-6 text-xs font-medium",
            variant === "dark" ? "text-cobalt-bright" : "text-primary",
          )}
        >
          <span>Explore</span>
          {index !== undefined && (
            <span className="font-mono tracking-[0.08em] opacity-60">
              {typeof index === "number" ? String(index + 1).padStart(2, "0") : index}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const classes = cn(
    "group flex h-full flex-col overflow-hidden rounded-card border transition-all duration-500 ease-[var(--ease-premium)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    variant === "light" && "border-line bg-card shadow-panel hover:-translate-y-1 hover:border-line-strong hover:shadow-lift",
    variant === "outline" && "border-line bg-transparent hover:-translate-y-1 hover:border-ink hover:bg-card",
    variant === "dark" && "surface-dark border-white/10 hover:-translate-y-1",
    className,
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={classes}>
      {content}
    </Link>
  );
}
