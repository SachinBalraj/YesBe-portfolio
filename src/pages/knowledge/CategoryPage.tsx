import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Search,
  Sparkles,
  Layers,
  HelpCircle,
  Mail,
  Brain,
  LayoutDashboard,
  Users,
  BarChart3,
  LineChart,
  Database,
  Globe,
  MessageSquare,
  Megaphone,
  Workflow,
  Cloud,
  ShieldCheck,
  Rocket,
  Briefcase,
  Building2,
  Cpu,
  Filter,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { categoryBySlug, KNOWLEDGE_CATEGORIES } from "@/knowledge/categories";
import {
  articlesByCategory,
  getCategoryArticleCount,
  featuredArticle,
  calculateArticleScore,
} from "@/knowledge/articles";
import {
  buildFaqSchema,
  getCategorySeoDescription,
  getCategorySeoTitle,
  SITE_URL,
  categoryUrl,
} from "@/knowledge/seo";
import { CategoryNav } from "@/components/knowledge/CategoryNav";
import { ArticleGrid } from "@/components/knowledge/ArticleGrid";
import { Pagination } from "@/components/knowledge/Pagination";
import { trackConsultationClick } from "@/utils/analytics";
import { NewsletterSignup } from "@/components/knowledge/NewsletterSignup";
import { FeaturedArticle } from "@/components/knowledge/FeaturedArticle";
import { FAQSection } from "@/components/knowledge/FAQSection";

const ARTICLES_PER_PAGE = 9;

// Icon mapping for dynamic category rendering
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  LayoutDashboard,
  Users,
  BarChart3,
  LineChart,
  Database,
  Globe,
  Search,
  Sparkles,
  MessageSquare,
  Megaphone,
  Workflow,
  Cloud,
  ShieldCheck,
  Rocket,
  TrendingUp,
  Briefcase,
  Building2,
  Cpu,
};

export function CategoryPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [activeSubTopic, setActiveSubTopic] = useState("All");

  const category = categoryBySlug(slug);

  // Fetch articles belonging to this category
  const allCategoryArticles = useMemo(
    () => (category ? articlesByCategory(category.slug) : []),
    [category]
  );

  // Filter articles by category-specific search query AND selected sub-topic
  const filteredArticles = useMemo(() => {
    let pool = [...allCategoryArticles];

    // Sub-topic filter
    if (activeSubTopic && activeSubTopic !== "All") {
      const topicLower = activeSubTopic.toLowerCase();
      pool = pool.filter(
        (a) =>
          a.tags.some((t) => t.toLowerCase().includes(topicLower)) ||
          a.keywords.some((k) => k.toLowerCase().includes(topicLower)) ||
          a.title.toLowerCase().includes(topicLower) ||
          a.excerpt.toLowerCase().includes(topicLower)
      );
    }

    // Search query filter within category
    if (categorySearchQuery.trim()) {
      const q = categorySearchQuery.trim().toLowerCase();
      pool = pool.filter((a) => calculateArticleScore(a, q) > 0);
    }

    return pool;
  }, [allCategoryArticles, activeSubTopic, categorySearchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const featured = useMemo(() => featuredArticle(category?.slug), [category]);

  const popularCategoryArticles = useMemo(() => {
    return allCategoryArticles
      .filter((a) => a.popular || a.featured)
      .slice(0, 3);
  }, [allCategoryArticles]);

  const relatedCategories = useMemo(() => {
    if (!category) return [];
    return KNOWLEDGE_CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 6);
  }, [category]);

  useSEO({
    title: category ? (category.seoTitle ?? getCategorySeoTitle(category)) : "Category Not Found",
    description: category ? (category.metaDescription ?? getCategorySeoDescription(category)) : "Category not found.",
    canonical: category ? categoryUrl(category.slug) : `${SITE_URL}/knowledge-center`,
    ogType: "website",
  });

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <BookOpen className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Topic Category Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The requested category page “{slug}” could not be found in our Knowledge Center library.
        </p>
        <Link
          to="/knowledge-center"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Explore Knowledge Center
        </Link>
      </div>
    );
  }

  const CategoryIconComponent = (category.iconName && ICON_MAP[category.iconName]) || BookOpen;
  const articleCount = getCategoryArticleCount(category.slug);

  const setPage = (p: number) => {
    const next = new URLSearchParams(searchParams);
    if (p <= 1) next.delete("page");
    else next.set("page", String(p));
    setSearchParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-ice-gradient min-h-screen pb-24">
      {/* Schema: FAQ if present */}

      {category.faq && category.faq.length > 0 && (
        <JsonLd schema={buildFaqSchema(category.faq)} />
      )}

      {/* 1. Breadcrumb Navigation */}
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Knowledge Center", href: "/knowledge-center" },
            { label: category.name },
          ]}
        />
      </div>

      {/* 2. Category Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-4"
            >
              <Link
                to="/knowledge-center"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                All Topics
              </Link>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white/90 px-3 py-1 text-xs font-bold text-primary shadow-2xs">
                <CategoryIconComponent className="h-3.5 w-3.5" />
                {articleCount} {articleCount === 1 ? "Article" : "Articles"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              {category.name}{" "}
              <span className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] bg-clip-text text-transparent">
                Guides & Insights
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {category.description}
            </motion.p>

            {/* Hero Solution CTA Button */}
            {category.solutionCtaText && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <Link
                  to={category.solutionCtaHref ?? "/services"}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {category.solutionCtaText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Category Horizontal Navigation */}
      <CategoryNav activeSlug={category.slug} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* 3. Featured Article Section */}
        {featured && (
          <div className="mb-14">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Featured in {category.name}
              </span>
            </div>
            <FeaturedArticle article={featured} />
          </div>
        )}

        {/* 5 & 6. Category Sub-Topic Filters & Search within Category */}
        <div className="mb-10 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Category Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70 pointer-events-none" />
              <input
                type="text"
                value={categorySearchQuery}
                onChange={(e) => {
                  setCategorySearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={`Search ${category.name} articles...`}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-foreground outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-800"
              />
            </div>

            {/* Sub-Topic Pill Filters */}
            {category.subTopicFilters && category.subTopicFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1">
                  <Filter className="h-3.5 w-3.5 text-primary" />
                  Filter:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSubTopic("All");
                    setPage(1);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    activeSubTopic === "All"
                      ? "bg-primary text-white font-bold shadow-2xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  All Topics
                </button>
                {category.subTopicFilters.map((subTopic) => (
                  <button
                    key={subTopic}
                    type="button"
                    onClick={() => {
                      setActiveSubTopic(subTopic);
                      setPage(1);
                    }}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                      activeSubTopic === subTopic
                        ? "bg-primary text-white font-bold shadow-2xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {subTopic}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4. Article Grid (3-column desktop, 2-column tablet, 1-column mobile) */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {activeSubTopic !== "All"
                ? `${activeSubTopic} Articles`
                : `${category.name} Articles`}
            </h2>
            <span className="text-xs text-muted-foreground">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {pagedArticles.length > 0 ? (
            <>
              <ArticleGrid articles={pagedArticles} highlight={categorySearchQuery} />
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
                className="mt-12"
              />
            </>
          ) : (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <h3 className="mt-4 text-lg font-bold text-foreground">No articles match your filters</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Try clearing your search query or switching back to "All Topics".
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategorySearchQuery("");
                  setActiveSubTopic("All");
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* 7. Popular / Trending Articles Section within Category */}
        {popularCategoryArticles.length > 0 && (
          <div className="mt-16 border-t border-slate-200/80 pt-12 dark:border-slate-800">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Popular & Trending in {category.name}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  The guides our readers keep coming back to.
                </p>
              </div>
            </div>
            <ArticleGrid articles={popularCategoryArticles} />
          </div>
        )}

        {/* Category FAQ Section (If Defined) */}
        {category.faq && category.faq.length > 0 && (
          <div className="mt-16">
            <FAQSection faq={category.faq} />
          </div>
        )}

        {/* 8. Related Categories Section ("You may also explore") */}
        <div className="mt-16 border-t border-slate-200/80 pt-12 dark:border-slate-800">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              You May Also Explore:
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Discover related technology topics across the YesBe Knowledge Center.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {relatedCategories.map((relCat) => {
              const RelIcon = (relCat.iconName && ICON_MAP[relCat.iconName]) || BookOpen;
              const count = getCategoryArticleCount(relCat.slug);
              return (
                <Link
                  key={relCat.slug}
                  to={`/knowledge-center/${relCat.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                      <RelIcon className="h-4 w-4" />
                    </div>
                    <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      {relCat.name}
                    </h3>
                  </div>
                  <span className="mt-3 text-[10px] font-semibold text-muted-foreground">
                    {count} {count === 1 ? "article" : "articles"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 9. Newsletter Section */}
        <div className="mt-16">
          <NewsletterSignup />
        </div>

        {/* 10. Conversion CTA Section */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e1b4b] p-8 sm:p-12 text-white shadow-2xl relative">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-blue-300 backdrop-blur-md mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Technology Transformation
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Need Technology Solutions For Your Business?
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              YesBe helps businesses implement AI, ERP, automation, analytics, websites, and digital transformation solutions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                onClick={() => trackConsultationClick("knowledge_category")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all"
              >
                <Mail className="h-4 w-4" />
                Contact YesBe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
