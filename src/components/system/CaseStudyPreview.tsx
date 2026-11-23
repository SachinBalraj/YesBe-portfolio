import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { localSrcSet } from "@/utils/images";

interface CaseStudyPreviewProps {
  title: string;
  summary?: string;
  category?: string;
  href: string;
  image: { src: string; alt: string };
  tags?: string[];
  variant?: "feature" | "compact";
  className?: string;
}

export function CaseStudyPreview({ title, summary, category, href, image, tags, variant = "feature", className }: CaseStudyPreviewProps) {
  if (variant === "compact") {
    return (
      <article className={cn("group", className)}>
        <Link to={href} className="block overflow-hidden rounded-[18px] border border-[#E5E5EB] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#17154C]/20 hover:shadow-[0_16px_40px_rgba(23,21,76,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17154C] focus-visible:ring-offset-2 motion-reduce:transform-none">
          <div className="aspect-[16/10] overflow-hidden bg-[#071a3a]">
            <img src={image.src} srcSet={localSrcSet(image.src, [480, 800])} sizes="(min-width: 1024px) 33vw, 100vw" alt={image.alt} width={1200} height={760} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none" />
          </div>
          <div className="p-6">
            {category && <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#17154C]">{category}</p>}
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#101018]">{title}</h3>
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-[#454550] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#17154C] motion-reduce:transform-none" aria-hidden="true" />
            </div>
            {summary && <p className="mt-2 text-sm leading-relaxed text-[#454550]">{summary}</p>}
            {tags && tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => <li key={tag} className="rounded-full border border-[#D9D9E3] px-2.5 py-1 text-[11px] font-medium text-[#454550]">{tag}</li>)}
              </ul>
            )}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("group", className)}>
      <Link to={href} className="grid overflow-hidden rounded-[24px] border border-[#E5E5EB] bg-white shadow-[0_1px_2px_rgba(23,21,76,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#17154C]/20 hover:shadow-[0_20px_45px_rgba(23,21,76,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17154C] focus-visible:ring-offset-2 motion-reduce:transform-none lg:grid-cols-12">
        <div className="aspect-[16/10] overflow-hidden bg-[#071a3a] lg:col-span-7 lg:aspect-auto lg:h-full">
          <img src={image.src} srcSet={localSrcSet(image.src, [480, 800])} sizes="(min-width: 1024px) 58vw, 100vw" alt={image.alt} width={1400} height={875} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none" />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
          {category && <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#17154C]">{category}</p>}
          <h3 className="mt-3 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#101018]">{title}</h3>
          {summary && <p className="mt-4 text-base leading-7 text-[#454550]">{summary}</p>}
          {tags && tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => <li key={tag} className="rounded-full border border-[#D9D9E3] bg-[#F7F7FA] px-2.5 py-1 text-[11px] font-medium text-[#454550]">{tag}</li>)}
            </ul>
          )}
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#17154C]">
            View project
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
