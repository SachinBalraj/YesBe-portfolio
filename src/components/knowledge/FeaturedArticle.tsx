import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Star } from "lucide-react";
import type { Article } from "@/knowledge/types";
import { CategoryBadge } from "./CategoryBadge";
import { formatDate } from "./share";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative overflow-hidden rounded-[28px] border border-primary/15 bg-gradient-to-br from-[#eff6ff] via-white to-[#f8fbff] shadow-[0_1px_3px_rgba(37,99,235,0.05),0_8px_32px_rgba(37,99,235,0.06)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_16px_48px_rgba(37,99,235,0.12)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#dbeafe] opacity-30 blur-[100px]" />
      </div>

      <div className="relative grid lg:grid-cols-2">
        <Link
          to={`/knowledge-center/article/${article.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`Read featured article: ${article.title}`}
        />
        <div className="relative m-5 overflow-hidden rounded-2xl lg:m-6">
          <div className="aspect-[16/10] w-full lg:h-full">
            <img
              src={article.featuredImage}
              alt={`${article.title} — featured article by YesBe Technologies`}
              loading="lazy"
              decoding="async"
              width={800}
              height={500}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 lg:p-10 lg:pl-2">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_2px_8px_rgba(37,99,235,0.3)]">
              <Star className="h-3 w-3" />
              Featured
            </span>
            <CategoryBadge name={article.category} slug={article.categorySlug} className="pointer-events-none" />
          </div>

          <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary lg:text-3xl">
            {article.title}
          </h2>

          <p className="mb-5 line-clamp-3 text-[14px] leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {article.author}
            </span>
            <span>{formatDate(article.publishedDate)}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTime} min read
            </span>
          </div>

          <div className="pointer-events-none">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(37,99,235,0.25)] transition-all duration-300 group-hover:shadow-[0_8px_32px_rgba(37,99,235,0.35)]">
              Read the featured guide
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
