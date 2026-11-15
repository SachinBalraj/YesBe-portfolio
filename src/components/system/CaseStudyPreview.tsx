import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { MediaFrame, type FrameImage } from "./MediaFrame";

interface CaseStudyPreviewProps {
  title: string;
  summary?: string;
  category?: string;
  href: string;
  image: FrameImage;
  tags?: string[];
  variant?: "feature" | "compact";
  className?: string;
}

export function CaseStudyPreview({
  title,
  summary,
  category,
  href,
  image,
  tags,
  variant = "feature",
  className,
}: CaseStudyPreviewProps) {
  if (variant === "compact") {
    return (
      <article className={cn("group", className)}>
        <Link
          to={href}
          className="block overflow-hidden rounded-card border border-line bg-card transition-all duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-line-strong hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <MediaFrame
            image={image}
            ratio="aspect-[16/10]"
            className="rounded-none border-0 border-b border-line"
            mediaClassName="rounded-none border-0"
          />
          <div className="p-6">
            {category && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {category}
              </p>
            )}
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">{title}</h3>
              <ArrowUpRight
                className="mt-1 size-4 shrink-0 text-body transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </div>
            {summary && <p className="mt-2 text-sm leading-relaxed text-body">{summary}</p>}
            {tags && tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-pill border border-line px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("group", className)}>
      <Link
        to={href}
        className="grid overflow-hidden rounded-panel border border-line bg-card shadow-panel transition-all duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-line-strong hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:grid-cols-12"
      >
        <MediaFrame
          image={image}
          ratio="aspect-[16/10] lg:aspect-auto lg:h-full"
          className="h-full rounded-none border-0 border-b border-line lg:col-span-7 lg:border-b-0 lg:border-r"
          mediaClassName="h-full rounded-none border-0"
        />
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
          {category && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {category}
            </p>
          )}
          <h3 className="display-sm mt-3">{title}</h3>
          {summary && <p className="mt-4 text-base leading-7 text-body">{summary}</p>}
          {tags && tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-pill border border-line bg-paper px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Read the case study
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
