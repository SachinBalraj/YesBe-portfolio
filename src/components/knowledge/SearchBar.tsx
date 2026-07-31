import { useState, useRef, useEffect, useMemo, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight, Clock, BookOpen, Command } from "lucide-react";
import { cn } from "@/utils/cn";
import { getSearchSuggestions } from "@/knowledge/articles";
import { addSearchHistory } from "./searchHistoryStore";
import { SearchModal } from "./SearchModal";

interface SearchBarProps {
  defaultValue?: string;
  size?: "sm" | "lg";
  className?: string;
  placeholder?: string;
  categoryFilter?: string;
  showModalShortcut?: boolean;
}

export function SearchBar({
  defaultValue = "",
  size = "lg",
  className,
  placeholder = "Search articles, guides, and insights...",
  categoryFilter,
  showModalShortcut = true,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isMac = useMemo(() => {
    return typeof window !== "undefined" && window.navigator.userAgent.toLowerCase().includes("mac");
  }, []);

  // Sync external defaultValue changes
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  // Click outside listener to dismiss live suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim() || !isFocused) return [];
    return getSearchSuggestions(query, 5);
  }, [query, isFocused]);

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const q = query.trim();
    setIsFocused(false);
    if (q) addSearchHistory(q);
    
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (categoryFilter) params.set("category", categoryFilter);
    const queryString = params.toString();
    navigate(queryString ? `/knowledge-center/search?${queryString}` : "/knowledge-center/search");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[selectedIndex];
      addSearchHistory(selected.title);
      setIsFocused(false);
      navigate(`/knowledge-center/article/${selected.slug}`);
    } else if (e.key === "Escape") {
      setIsFocused(false);
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
        <mark className="rounded-xs bg-primary/20 px-0.5 font-semibold text-primary">
          {text.slice(index, index + term.length)}
        </mark>
        {text.slice(index + term.length)}
      </>
    );
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form
        onSubmit={handleSubmit}
        role="search"
        className="relative flex items-center w-full"
      >
        <Search
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 transition-colors pointer-events-none",
            isFocused ? "text-primary" : "text-muted-foreground/70",
            size === "lg" ? "h-5 w-5" : "h-4 w-4"
          )}
          aria-hidden="true"
        />

        <input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
            setIsFocused(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search the Knowledge Center"
          className={cn(
            "w-full rounded-full border border-slate-200/90 bg-white text-foreground shadow-[0_2px_8px_rgba(37,99,235,0.04),0_8px_24px_rgba(37,99,235,0.03)] outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15 dark:border-slate-800 dark:bg-slate-900",
            size === "lg" ? "py-4 pl-12 pr-28 text-base" : "py-2.5 pl-10 pr-20 text-sm"
          )}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedIndex(-1);
              }}
              className="rounded-full p-1 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Clear query"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {showModalShortcut && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-muted-foreground shadow-2xs hover:bg-slate-100 hover:text-primary transition-all dark:border-slate-800 dark:bg-slate-800"
              title="Open Command Palette"
            >
              <Command className="h-3 w-3" />
              <span>{isMac ? "⌘ K" : "Ctrl K"}</span>
            </button>
          )}
        </div>
      </form>

      {/* Live Search Autocomplete Dropdown */}
      {isFocused && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900/95">
          <div className="p-3">
            <div className="mb-2 flex items-center justify-between px-3 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Suggestions ({suggestions.length})</span>
              <span>Press Enter to view all</span>
            </div>

            {suggestions.length > 0 ? (
              <div className="space-y-1">
                {suggestions.map((article, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={article.slug}
                      onClick={() => {
                        addSearchHistory(article.title);
                        setIsFocused(false);
                        navigate(`/knowledge-center/article/${article.slug}`);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "group flex items-center justify-between rounded-2xl p-3 cursor-pointer transition-all duration-150",
                        isSelected
                          ? "bg-primary/10 border border-primary/20 text-primary"
                          : "hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-primary/10 p-2 text-primary">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                            {highlightMatch(article.title, query)}
                          </h4>
                          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span className="font-medium text-primary">{article.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.readingTime} min read
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform",
                          isSelected ? "text-primary translate-x-1" : "text-muted-foreground/30"
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No matching articles found. Press Enter to view search page.
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-4 py-2 text-xs font-semibold text-primary dark:border-slate-800 dark:bg-slate-900/80">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="flex items-center gap-1.5 hover:underline"
            >
              See all results for “{query}”
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <span className="text-[10px] text-muted-foreground">Esc to close</span>
          </div>
        </div>
      )}

      {/* Global Command Palette Modal Overlay */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialQuery={query}
      />
    </div>
  );
}
