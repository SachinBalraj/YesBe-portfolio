import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, Clock } from "lucide-react";
import { articles } from "@/knowledge/articles";
import { formatDate } from "@/components/knowledge/share";
import { FOUNDER_AUTHOR_NAME } from "@/constants";

const card = "rounded-[20px] border border-white/40 bg-white p-6";

/**
 * Latest writing by the founder, newest first.
 *
 * Source of truth is the article frontmatter, so any article credited to
 * Sachin Balraj in content/articles/*.md is picked up here automatically and
 * the Article → founder page internal link stays in sync.
 */
const founderArticles = [...articles]
  .filter((a) => a.author === FOUNDER_AUTHOR_NAME)
  .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

const featured = founderArticles.slice(0, 6);

export function FounderInsightsSection() {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 lg:py-20"
      aria-labelledby="founder-latest-insights"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[6%] bottom-[6%] h-[320px] w-[320px] rounded-full bg-[#ede9fe] opacity-[0.07] blur-[120px]"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Insights
          </span>
          <h2
            id="founder-latest-insights"
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Latest{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
              Insights &amp; Articles
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Practical writing on AI, ERP, web technologies and search — written
            by {FOUNDER_AUTHOR_NAME} for the YESBE Technologies Knowledge
            Center.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((article) => (
            <motion.li key={article.slug} variants={fadeInUp}>
              <Link
                to={`/insights/article/${article.slug}`}
                className={`${card} group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]`}
              >
                <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/[0.06] px-3 py-1 text-[11px] font-semibold text-primary">
                  <BookOpen className="h-3 w-3" aria-hidden="true" />
                  {article.category}
                </span>
                <h3 className="text-base font-bold leading-snug text-foreground">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3 w-3 text-primary" aria-hidden="true" />
                    {formatDate(article.publishedDate)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-primary" aria-hidden="true" />
                    {article.readingTime} min read
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                  Read the article
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
          >
            Browse the Insights
            <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
