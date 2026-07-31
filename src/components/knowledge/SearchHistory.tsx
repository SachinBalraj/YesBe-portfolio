import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Trash2, X } from "lucide-react";
import { getSearchHistory, clearSearchHistory } from "./searchHistoryStore";

interface SearchHistoryProps {
  onSelect: (query: string) => void;
}

export function SearchHistory({ onSelect }: SearchHistoryProps) {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(getSearchHistory());
    const handle = () => setHistory(getSearchHistory());
    window.addEventListener("storage", handle);
    return () => window.removeEventListener("storage", handle);
  }, []);

  if (!history.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Recent searches
        </p>
        <button
          type="button"
          onClick={() => {
            clearSearchHistory();
            setHistory([]);
          }}
          className="inline-flex items-center gap-1 text-[12px] text-muted-foreground transition-colors hover:text-destructive"
        >
          <Trash2 className="h-3 w-3" />
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((query) => (
          <button
            key={query}
            type="button"
            onClick={() => onSelect(query)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-primary"
          >
            <Search className="h-3 w-3" />
            {query}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SearchSuggestion({
  query,
  onSelect,
  onRemove,
}: {
  query: string;
  onSelect: () => void;
  onRemove: () => void;
}) {
  return (
    <Link
      to={`/knowledge-center/search?q=${encodeURIComponent(query)}`}
      onClick={onSelect}
      className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-primary/[0.06]"
    >
      <span className="flex items-center gap-2">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        {query}
      </span>
      <button
        type="button"
        aria-label={`Remove ${query} from recent searches`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove();
        }}
        className="hidden h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-slate-100 group-hover:flex"
      >
        <X className="h-3 w-3" />
      </button>
    </Link>
  );
}
