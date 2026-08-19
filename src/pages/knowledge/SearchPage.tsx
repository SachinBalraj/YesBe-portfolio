import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  SearchX,
  Sparkles,
  TrendingUp,
  Filter,
  X,
  ArrowRight,
  HelpCircle,
  Mail,
  Grid,
  Calendar,
  Layers,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import {
  searchArticlesAdvanced,
  getAllTags,
  getCategoryArticleCount,
} from "@/knowledge/articles";
import { KNOWLEDGE_CATEGORIES, categoryBySlug } from "@/knowledge/categories";
import { SITE_URL } from "@/knowledge/seo";
import { SearchBar } from "@/components/knowledge/SearchBar";
import { ArticleGrid } from "@/components/knowledge/ArticleGrid";
import { Pagination } from "@/components/knowledge/Pagination";
import { SearchHistory } from "@/components/knowledge/SearchHistory";
import { addSearchHistory } from "@/components/knowledge/searchHistoryStore";

const ARTICLES_PER_PAGE = 9;

const POPULAR_SEARCHES = [
  { name: "AI", query: "AI" },
  { name: "ERP", query: "ERP" },
  { name: "CRM", query: "CRM" },
  { name: "Website Development", query: "Website" },
  { name: "SEO", query: "SEO" },
  { name: "Power BI", query: "Power BI" },
  { name: "Automation", query: "Automation" },
];

const CONTENT_TYPES = ["All", "Articles", "Guides", "Case Studies"];

const DATE_FILTERS = [
  { label: "All Time", value: "all" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

const SORT_OPTIONS = [
  { label: "Most Relevant", value: "relevance" },
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Reading Time", value: "readingTime" },
];

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = (searchParams.get("q") ?? "").trim();
  const categorySlug = searchParams.get("category") ?? "all";
  const contentType = searchParams.get("type") ?? "All";
  const dateFilter = searchParams.get("date") ?? "all";
  const sortBy = searchParams.get("sort") ?? "relevance";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Perform real-time advanced search query with filters
  const results = useMemo(() => {
    return searchArticlesAdvanced(q, {
      categorySlug,
      contentType,
      dateFilter,
      sortBy,
    });
  }, [q, categorySlug, contentType, dateFilter, sortBy]);

  const category = categoryBySlug(categorySlug);
  const suggestedTags = useMemo(
    () => getAllTags().slice(0, 8).map(([tag]) => tag),
    [],
  );

  const totalPages = Math.max(1, Math.ceil(results.length / ARTICLES_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagedResults = results.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );

  useEffect(() => {
    if (q) addSearchHistory(q);
  }, [q]);

  // SEO metadata optimization
  useSEO({
    title: q
      ? `Search: ${q} (${results.length} results) | YesBe Knowledge Center`
      : category
      ? `${category.name} Articles | YesBe Knowledge Center`
      : "Search Articles & Guides | YesBe Knowledge Center",
    description: category
      ? `Discover expert ${category.name} articles, tutorials, and case studies at YesBe.`
      : "Search articles, guides, and insights on AI, ERP, CRM, Websites, Power BI, SEO, and Business Tech.",
    canonical: q
      ? `${SITE_URL}/knowledge-center/search?q=${encodeURIComponent(q)}`
      : `${SITE_URL}/knowledge-center/search`,
    noindex: true, // Prevent indexing empty/filtered search parameter variations
  });

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "all" || value === "All" || value === "relevance") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    next.delete("page"); // Reset to page 1 on filter change
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const setPage = (p: number) => {
    const next = new URLSearchParams(searchParams);
    if (p <= 1) next.delete("page");
    else next.set("page", String(p));
    setSearchParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasActiveFilters =
    categorySlug !== "all" ||
    contentType !== "All" ||
    dateFilter !== "all" ||
    sortBy !== "relevance";

  return (
    <div className="bg-ice-gradient min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Knowledge Center", href: "/knowledge-center" },
            { label: "Search" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        {/* Search Header Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-primary shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5" />
            YesBe Intelligent Search
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Discover Articles, Guides & Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-2 text-sm text-muted-foreground"
          >
            Explore expert resources across AI, ERP, CRM, Web Development, SEO, Power BI, and Cloud Technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6"
          >
            <SearchBar defaultValue={q} size="lg" placeholder="Search articles, guides, and insights..." />
          </motion.div>
        </div>

        {/* Popular Searches Chips */}
        <div className="mx-auto mt-6 max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground mr-1">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              Popular Topics:
            </span>
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => updateParam("q", item.query)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                  q.toLowerCase() === item.query.toLowerCase()
                    ? "border-primary bg-primary text-white shadow-xs"
                    : "border-slate-200 bg-white/90 text-slate-700 hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Search History Pill Bar */}
        <div className="mx-auto mt-6 max-w-3xl">
          <SearchHistory onSelect={(queryStr) => updateParam("q", queryStr)} />
        </div>

        {/* Advanced Filter Bar Container */}
        <div className="mt-10 max-w-7xl mx-auto border-t border-slate-200/80 pt-8 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                {q ? (
                  <>
                    Search results for <span className="text-primary">“{q}”</span>
                  </>
                ) : (
                  "Knowledge Center Library"
                )}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Results Found: <span className="font-semibold text-foreground">{results.length} articles</span>
                {category && ` in ${category.name}`}
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-xs"
              >
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                Filters
              </button>
            </div>
          </div>

          {/* Desktop & Mobile Filters Controls */}
          <div className={`space-y-4 ${showFiltersMobile ? "block" : "hidden sm:block"}`}>
            {/* Category Pills Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => updateParam("category", "all")}
                className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  categorySlug === "all"
                    ? "bg-primary text-white shadow-xs"
                    : "border border-slate-200 bg-white text-muted-foreground hover:border-primary/30 hover:text-primary dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                All Categories
              </button>

              {KNOWLEDGE_CATEGORIES.filter((c) => getCategoryArticleCount(c.slug) > 0).map((cat) => {
                const count = getCategoryArticleCount(cat.slug);
                const isActive = categorySlug === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => updateParam("category", cat.slug)}
                    className={`shrink-0 flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-primary text-white shadow-xs"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-muted-foreground dark:bg-slate-800"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sub-Filters Row: Content Type, Date, Sort */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center gap-4">
                {/* Content Type Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-primary" />
                    Type:
                  </span>
                  <div className="flex items-center gap-1">
                    {CONTENT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateParam("type", type)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                          contentType.toLowerCase() === type.toLowerCase()
                            ? "bg-primary/10 font-bold text-primary"
                            : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Filter */}
                <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4 dark:border-slate-800">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    Date:
                  </span>
                  <select
                    value={dateFilter}
                    onChange={(e) => updateParam("date", e.target.value)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-foreground outline-none dark:border-slate-800 dark:bg-slate-800"
                  >
                    {DATE_FILTERS.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sort By Dropdown & Clear Filters */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <Filter className="h-3.5 w-3.5 text-primary" />
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => updateParam("sort", e.target.value)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-foreground outline-none dark:border-slate-800 dark:bg-slate-800"
                  >
                    {SORT_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Content Section */}
        <div className="mt-8">
          {pagedResults.length > 0 ? (
            <>
              <ArticleGrid articles={pagedResults} highlight={q} />
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
                className="mt-12"
              />
            </>
          ) : (
            /* NO RESULTS PAGE (Helpful Empty State) */
            <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <SearchX className="h-8 w-8" />
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground">
                No articles found
              </h3>

              {q && (
                <p className="mt-1 text-sm text-muted-foreground">
                  We couldn't find any results matching <span className="font-semibold text-foreground">“{q}”</span>.
                </p>
              )}

              {/* Suggestions Box */}
              <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left dark:bg-slate-800/60">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Try these helpful suggestions:
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Double check spelling or try using alternative keywords.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Explore popular topics like <strong className="text-foreground">AI, ERP, CRM, Power BI, SEO</strong>.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Broaden your search filters or reset all active category filters.
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Grid className="h-4 w-4" />
                  View All Articles
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-xs hover:border-primary/30 hover:text-primary transition-all dark:border-slate-800 dark:bg-slate-800"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  Contact YesBe
                </Link>
              </div>

              {/* Quick Topic Chips underneath Empty State */}
              <div className="mt-10 border-t border-slate-100 pt-6 dark:border-slate-800">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Explore Popular Knowledge Categories:</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {POPULAR_SEARCHES.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => updateParam("q", item.query)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-slate-800"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
