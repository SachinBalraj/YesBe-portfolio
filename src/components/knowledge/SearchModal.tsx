import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Clock, Sparkles, History, TrendingUp, BookOpen, Layers } from "lucide-react";
import { getSearchSuggestions } from "@/knowledge/articles";
import { KNOWLEDGE_CATEGORIES } from "@/knowledge/categories";
import { getSearchHistory, addSearchHistory, removeSearchHistory } from "./searchHistoryStore";
import type { Article } from "@/knowledge/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function SearchModal({ isOpen, onClose, initialQuery = "" }: SearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load history when modal opens
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getSearchHistory());
      setQuery(initialQuery);
      setSelectedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialQuery]);

  // Lock background scroll and restore focus to the trigger when closing.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if (previous && document.contains(previous)) previous.focus();
    };
  }, [isOpen]);

  // Keep keyboard focus inside the open dialog.
  useEffect(() => {
    if (!isOpen) return;
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleFocusTrap);
    return () => document.removeEventListener("keydown", handleFocusTrap);
  }, [isOpen]);

  // Handle global shortcut key (⌘ K or Ctrl K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
        // The navbar owns opening the dialog when it is closed.
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Get live suggestions
  const suggestions = useMemo(() => {
    return getSearchSuggestions(query, 6);
  }, [query]);

  // Combine items for keyboard navigation:
  // If query is present -> suggestions list
  // If query is empty -> recent searches + popular topics
  const popularTopics = ["AI", "ERP", "CRM", "Website Development", "SEO", "Power BI", "Automation"];

  const handleSearchSubmit = (qToSubmit?: string) => {
    const targetQuery = (qToSubmit ?? query).trim();
    if (targetQuery) {
      addSearchHistory(targetQuery);
      onClose();
      navigate(`/insights/search?q=${encodeURIComponent(targetQuery)}`);
    } else {
      onClose();
      navigate("/insights/search");
    }
  };

  const handleSelectArticle = (article: Article) => {
    addSearchHistory(article.title);
    onClose();
    navigate(`/insights/article/${article.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelectArticle(suggestions[selectedIndex]);
      } else {
        handleSearchSubmit();
      }
    }
  };

  const highlightMatch = (text: string, q: string) => {
    if (!q.trim()) return text;
    const term = q.trim();
    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <mark className="rounded-sm bg-primary/20 px-0.5 font-semibold text-primary">
          {text.slice(index, index + term.length)}
        </mark>
        {text.slice(index + term.length)}
      </>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60"
          />

          {/* Modal Card */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 id="search-dialog-title" className="sr-only">Search YESBE articles</h2>
            {/* Top Search Input Bar */}
            <div className="relative flex items-center border-b border-slate-200/80 px-5 py-4 dark:border-slate-800">
              <Search className="h-5 w-5 text-primary/70 shrink-0 mr-3" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search articles and guides..."
                aria-label="Search articles and guides"
                className="w-full bg-transparent text-base text-foreground placeholder-muted-foreground/70 outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="mr-2 rounded-none p-1 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-muted-foreground dark:bg-slate-800"
              >
                ESC
              </button>
            </div>

            {/* Results / Dropdown Content */}
            <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-5">
              {query.trim() ? (
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground tracking-wide px-2">
                    <span>Articles & Guides ({suggestions.length})</span>
                    <span>Use ↑↓ to navigate</span>
                  </div>

                  {suggestions.length > 0 ? (
                    <div className="space-y-1">
                      {suggestions.map((article, idx) => {
                        const isSelected = idx === selectedIndex;
                        return (
                          <button
                            key={article.slug}
                            type="button"
                            onClick={() => handleSelectArticle(article)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`group flex w-full items-start justify-between rounded-2xl p-3.5 text-left transition-all duration-150 ${
                              isSelected
                                ? "bg-primary/10 border border-primary/20 shadow-sm"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800/60"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 rounded-xl bg-primary/10 p-2 text-primary">
                                <BookOpen className="h-4 w-4" />
                              </div>
                              <div>
                                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                  {highlightMatch(article.title, query)}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                  {highlightMatch(article.excerpt, query)}
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                  <span className="inline-flex rounded-none bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-primary dark:bg-slate-800">
                                    {article.category}
                                  </span>
                                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    {article.readingTime} min read
                                  </span>
                                </div>
                              </div>
                            </div>
                            <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? "text-primary translate-x-1" : "text-muted-foreground/40"}`} />
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-sm text-muted-foreground">No matching articles for “{query}”</p>
                      <p className="mt-1 text-xs text-muted-foreground/70">Press Enter to view all results page</p>
                      <button
                        type="button"
                        onClick={() => handleSearchSubmit()}
                        className="mt-4 inline-flex items-center gap-2 rounded-none bg-primary px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-primary/90"
                      >
                        Search All Topics
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="mb-2.5 flex items-center justify-between text-xs font-semibold text-muted-foreground tracking-wide px-2">
                        <span className="flex items-center gap-1.5">
                          <History className="h-3.5 w-3.5 text-primary" />
                          Recent Searches
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 px-2">
                        {recentSearches.map((term) => (
                          <div
                            key={term}
                            className="group inline-flex items-center gap-1.5 rounded-none border border-slate-200 bg-slate-50 py-1.5 pl-3 pr-2 text-xs font-medium text-foreground transition-all hover:border-primary/30 hover:bg-white dark:border-slate-800 dark:bg-slate-800"
                          >
                            <button
                              type="button"
                              onClick={() => handleSearchSubmit(term)}
                              className="hover:text-primary"
                            >
                              {term}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                removeSearchHistory(term);
                                setRecentSearches(getSearchHistory());
                              }}
                              aria-label={`Remove ${term} from recent searches`}
                              className="rounded-none p-0.5 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Topics */}
                  <div>
                    <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground tracking-wide px-2">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-2 px-2">
                      {popularTopics.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => handleSearchSubmit(topic)}
                          className="rounded-none border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow dark:border-slate-800 dark:bg-slate-800"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Knowledge Categories */}
                  <div>
                    <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground tracking-wide px-2">
                      <Layers className="h-3.5 w-3.5 text-primary" />
                      Browse Categories
                    </div>
                    <div className="grid grid-cols-2 gap-2 px-2 sm:grid-cols-3">
                      {KNOWLEDGE_CATEGORIES.slice(0, 6).map((cat) => (
                        <button
                          key={cat.slug}
                          type="button"
                          onClick={() => {
                            onClose();
                            navigate(`/insights/category/${cat.slug}`);
                          }}
                          className="flex items-center justify-between rounded-xl border border-slate-200/70 p-3 text-left transition-all hover:border-primary/30 hover:bg-primary/5 dark:border-slate-800"
                        >
                          <span className="text-xs font-bold text-foreground">{cat.name}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Key Hints */}
            <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/80 px-5 py-3 text-[11px] text-muted-foreground dark:border-slate-800 dark:bg-slate-900/80">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="rounded-none border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    ↑↓
                  </kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded-none border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    ↵
                  </kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded-none border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    ESC
                  </kbd>
                  Close
                </span>
              </div>
              <span className="inline-flex items-center gap-1 font-semibold text-primary">
                <Sparkles className="h-3 w-3" />
                YESBE Search
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
