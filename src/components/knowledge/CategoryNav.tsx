import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { KNOWLEDGE_CATEGORIES } from "@/knowledge/categories";
import { cn } from "@/utils/cn";

interface CategoryNavProps {
  activeSlug?: string;
  className?: string;
  sticky?: boolean;
}

export function CategoryNav({ activeSlug, className, sticky = true }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollHeight - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "relative",
        sticky &&
          "sticky top-[56px] z-40 border-b border-slate-100 bg-white/85 backdrop-blur-xl",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll categories left"
            className={cn(
              "absolute -left-1 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-opacity md:flex",
              canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>

          <div
            ref={scrollRef}
            className="scrollbar-none flex items-center gap-2 overflow-x-auto py-4"
          >
            <Link
              to="/knowledge-center"
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200",
                !activeSlug
                  ? "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
                  : "border border-slate-200 bg-white text-muted-foreground hover:border-primary/30 hover:text-primary",
              )}
            >
              All Topics
            </Link>
            {KNOWLEDGE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/knowledge-center/category/${cat.slug}`}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200",
                  activeSlug === cat.slug
                    ? "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
                    : "border border-slate-200 bg-white text-muted-foreground hover:border-primary/30 hover:text-primary",
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll categories right"
            className={cn(
              "absolute -right-1 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-opacity md:flex",
              canScrollRight ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
