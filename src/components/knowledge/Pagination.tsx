import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function pageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const goTo = (target: number) => {
    if (target < 1 || target > totalPages) return;
    onPageChange(target);
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
    >
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageNumbers(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`dots-${i}`} className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => goTo(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition-all duration-200",
              p === page
                ? "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
                : "border border-slate-200 bg-white text-muted-foreground hover:border-primary/30 hover:text-primary",
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
