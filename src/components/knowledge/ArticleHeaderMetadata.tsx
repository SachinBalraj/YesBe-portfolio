import { motion } from "framer-motion";
import { Clock, Calendar, RefreshCw, User, FileText } from "lucide-react";
import type { Article } from "@/knowledge/types";
import { formatDate } from "./share";

interface ArticleHeaderMetadataProps {
  article: Article;
}

export function ArticleHeaderMetadata({ article }: ArticleHeaderMetadataProps) {
  const publishedFormatted = formatDate(article.publishedDate);
  const updatedFormatted = formatDate(article.updatedDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="mt-6 flex flex-col gap-3 text-xs font-medium text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center"
    >
      {/* 📖 Reading Time Pill */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1.5 text-slate-700 shadow-2xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 hover:border-primary/40 hover:text-primary transition-all">
        <Clock className="h-3.5 w-3.5 text-primary" />
        <span>{article.readingTimeText}</span>
        {article.wordCount && (
          <span className="text-[10px] text-muted-foreground">
            ({article.wordCount.toLocaleString()} words)
          </span>
        )}
      </span>

      {/* 📅 Published Date Pill */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1.5 text-slate-700 shadow-2xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <Calendar className="h-3.5 w-3.5 text-primary" />
        <span>Published {publishedFormatted}</span>
      </span>

      {/* 🔄 Updated Date Pill */}
      {article.updatedDate && article.updatedDate !== article.publishedDate && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1.5 text-slate-700 shadow-2xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <RefreshCw className="h-3.5 w-3.5 text-primary" />
          <span>Updated {updatedFormatted}</span>
        </span>
      )}

      {/* ✍️ Author Pill */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-primary font-semibold shadow-2xs">
        <User className="h-3.5 w-3.5" />
        <span>Written by {article.author}</span>
      </span>

      {/* Content Type Pill */}
      {article.contentType && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-100 px-3.5 py-1.5 text-slate-700 font-semibold dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span>{article.contentType}</span>
        </span>
      )}
    </motion.div>
  );
}
