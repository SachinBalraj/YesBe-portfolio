import { motion } from "framer-motion";
import type { Article } from "@/knowledge/types";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
  highlight?: string;
  className?: string;
}

export function ArticleGrid({ articles, highlight, className }: ArticleGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className ?? ""}`}
    >
      {articles.map((article, i) => (
        <motion.div
          key={article.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <ArticleCard article={article} highlight={highlight} />
        </motion.div>
      ))}
    </div>
  );
}
