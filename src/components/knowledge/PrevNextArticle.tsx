import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Article } from "@/knowledge/types";

export function PrevNextArticle({ prev, next }: { prev: Article | null; next: Article | null }) {
  return (
    <nav aria-label="Previous and next article" className="grid gap-4 sm:grid-cols-2">
      {prev ? (
        <Link
          to={`/knowledge-center/article/${prev.slug}`}
          className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-200 hover:border-primary/25 hover:shadow-[0_8px_32px_rgba(37,99,235,0.08)]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Previous
            </span>
            <span className="mt-0.5 line-clamp-1 block text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
              {prev.title}
            </span>
            <span className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {prev.readingTime} min read
            </span>
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          to={`/knowledge-center/article/${next.slug}`}
          className="group flex items-center justify-end gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-right transition-all duration-200 hover:border-primary/25 hover:shadow-[0_8px_32px_rgba(37,99,235,0.08)]"
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Next
            </span>
            <span className="mt-0.5 line-clamp-1 block text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
              {next.title}
            </span>
            <span className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {next.readingTime} min read
            </span>
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
