import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import type { Article } from "@/knowledge/types";
import { formatDate } from "./share";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;

  return (
    <section aria-label="Related articles" className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Keep Reading
        </h2>
        <Link
          to="/knowledge-center"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-secondary"
        >
          View all articles
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/knowledge-center/article/${article.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-200 hover:border-primary/25 hover:shadow-[0_8px_32px_rgba(37,99,235,0.08)]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
              <img
                src={article.featuredImage}
                alt={article.title}
                width={400}
                height={225}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-2 text-[14px] font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
              <span className="mt-auto flex flex-wrap items-center gap-2 pt-3 text-[11px] font-medium text-muted-foreground">
                <Clock className="h-3 w-3" />
                {article.readingTimeText} · {formatDate(article.publishedDate)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
