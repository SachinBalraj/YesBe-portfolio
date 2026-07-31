import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import type { Heading } from "@/knowledge/types";

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );
    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white/80 p-5 backdrop-blur-sm",
        className,
      )}
    >
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-0.5">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn(
                "block rounded-lg px-3 py-1.5 text-[13px] leading-snug transition-all duration-200",
                activeId === heading.id
                  ? "bg-primary/[0.07] font-semibold text-primary"
                  : "text-muted-foreground hover:bg-slate-50 hover:text-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
