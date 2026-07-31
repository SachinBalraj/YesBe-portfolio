import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Tag } from "lucide-react";
import type { Article } from "@/knowledge/types";
import { CategoryBadge } from "./CategoryBadge";
import { formatDate } from "./share";

interface ArticleCardProps {
  article: Article;
  highlight?: string;
}

export const ArticleCard = memo(function ArticleCard({ article, highlight }: ArticleCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const handleImgError = useCallback(() => setImgFailed(true), []);

  const highlightText = (text: string) => {
    if (!highlight || !highlight.trim()) return text;
    const q = highlight.trim();
    const index = text.toLowerCase().indexOf(q.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <mark className="rounded-xs bg-primary/20 px-0.5 font-semibold text-primary">
          {text.slice(index, index + q.length)}
        </mark>
        {text.slice(index + q.length)}
      </>
    );
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(37,99,235,0.03),0_8px_24px_rgba(37,99,235,0.03)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_12px_36px_rgba(37,99,235,0.12),0_20px_60px_rgba(37,99,235,0.06)] dark:border-slate-800 dark:bg-slate-900"
    >
      <Link
        to={`/knowledge-center/article/${article.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View article: ${article.title}`}
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {!imgFailed ? (
          <img
            src={article.featuredImage}
            alt={`${article.title} — ${article.category} guide by YesBe Technologies`}
            loading="lazy"
            decoding="async"
            width={800}
            height={450}
            onError={handleImgError}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="h-full w-full bg-gradient-to-br from-[#eff6ff] via-white to-[#eaf6ff]"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Content Type Pill overlay */}
        <div className="absolute top-3 right-3 z-20">
          <span className="rounded-full bg-slate-900/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
            {article.contentType ?? "Article"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <CategoryBadge name={article.category} slug={article.categorySlug} className="pointer-events-none" />
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-muted-foreground dark:bg-slate-800">
            <Clock className="h-3 w-3 text-primary" />
            {article.readingTimeText}
          </span>
        </div>

        <h3 className="mb-2.5 text-lg font-bold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
          {highlightText(article.title)}
        </h3>

        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {highlightText(article.excerpt)}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5 pointer-events-none">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              >
                <Tag className="h-2.5 w-2.5 text-primary/70" />
                {highlightText(tag)}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-4 text-[11px] text-muted-foreground dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <User className="h-3.5 w-3.5 text-primary" />
            {article.author}
          </span>
          <span className="text-slate-500">{formatDate(article.publishedDate)}</span>
        </div>
      </div>

      <div className="pointer-events-none relative z-0 flex items-center justify-center gap-2 px-6 pb-6 pt-0">
        <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(37,99,235,0.25)] dark:bg-slate-800">
          View Article
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.article>
  );
});
