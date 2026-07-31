import { useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SEO_TITLES, SEO_DESCRIPTIONS } from "@/constants/seoTitles";
import {
  featuredArticle,
  latestArticles,
  popularArticles,
  getCategoryArticleCount,
} from "@/knowledge/articles";
import { KNOWLEDGE_CATEGORIES } from "@/knowledge/categories";
import { buildBreadcrumbSchema, SITE_URL } from "@/knowledge/seo";
import { SearchBar } from "@/components/knowledge/SearchBar";
import { CategoryNav } from "@/components/knowledge/CategoryNav";
import { FeaturedArticle } from "@/components/knowledge/FeaturedArticle";
import { ArticleGrid } from "@/components/knowledge/ArticleGrid";
import { Pagination } from "@/components/knowledge/Pagination";
import { NewsletterSignup } from "@/components/knowledge/NewsletterSignup";

const ARTICLES_PER_PAGE = 9;

const POPULAR_SEARCH_TOPICS = [
  { label: "AI", query: "AI" },
  { label: "ERP", query: "ERP" },
  { label: "CRM", query: "CRM" },
  { label: "Website Development", query: "Website" },
  { label: "SEO", query: "SEO" },
  { label: "Power BI", query: "Power BI" },
  { label: "Automation", query: "Automation" },
];

export function KnowledgeCenterHome() {
  const navigate = useNavigate();
  useSEO({
    title: SEO_TITLES.knowledgeCenter,
    description: SEO_DESCRIPTIONS.knowledgeCenter,
    canonical: `${SITE_URL}/knowledge-center`,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const latest = useMemo(() => latestArticles(9999), []);
  const featured = useMemo(() => featuredArticle(), []);
  const popular = useMemo(() => popularArticles(6), []);

  const totalPages = Math.max(1, Math.ceil(latest.length / ARTICLES_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagedArticles = latest.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );

  const setPage = (p: number) => {
    const next = new URLSearchParams(searchParams);
    if (p <= 1) next.delete("page");
    else next.set("page", String(p));
    setSearchParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTopicClick = (query: string) => {
    navigate(`/knowledge-center/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="bg-ice-gradient">
      <JsonLd
        schema={{
          ...buildBreadcrumbSchema([{ name: "Knowledge Center", url: `${SITE_URL}/knowledge-center` }]),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Knowledge Center" }]} />
      </div>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white px-4 py-1.5 text-[12px] font-semibold text-primary shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              YesBe Knowledge Center
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              Business Technology,
              <br />
              <span className="text-gradient">Explained Simply.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]"
            >
              Expert, practical guides on AI, ERP, Power BI, web development, SEO, and
              growth — written for business leaders who need answers, not jargon.
            </motion.p>
          </div>

          {/* Homepage Main Search Component */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <SearchBar size="lg" placeholder="Search articles, guides, and insights..." />

            {/* Clickable Popular Searches Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                Popular:
              </span>
              {POPULAR_SEARCH_TOPICS.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => handleTopicClick(topic.query)}
                  className="rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-2xs transition-all duration-200 hover:border-primary/40 hover:text-primary hover:shadow-xs"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CategoryNav />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {featured && (
          <div className="pt-10">
            <FeaturedArticle article={featured} />
          </div>
        )}

        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Latest Articles
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fresh insights and expert guides from our team.
            </p>
          </div>

          <ArticleGrid articles={pagedArticles} />

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            className="mt-12"
          />
        </div>

        <div className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Popular Reads
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The guides our readers keep coming back to.
            </p>
          </div>
          <ArticleGrid articles={popular} />
        </div>

        <div className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Browse by Topic
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Nineteen focused categories covering business technology end to end.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {KNOWLEDGE_CATEGORIES.map((cat, i) => {
              const count = getCategoryArticleCount(cat.slug);
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                >
                  <Link
                    to={`/knowledge-center/category/${cat.slug}`}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_12px_40px_rgba(37,99,235,0.10)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <h3 className="text-[14px] font-bold text-foreground transition-colors group-hover:text-primary">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                    <span className="mt-3 inline-block text-[11px] font-bold uppercase tracking-wider text-primary">
                      {count} {count === 1 ? "article" : "articles"}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-16">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
