const STORAGE_KEY = "yesbe-search-history";

export function getSearchHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string").slice(0, 8);
  } catch {
    return [];
  }
}

export function addSearchHistory(query: string) {
  const q = query.trim();
  if (!q) return;
  try {
    const next = [q, ...getSearchHistory().filter((item) => item !== q)].slice(0, 8);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function removeSearchHistory(query: string) {
  const q = query.trim();
  if (!q) return;
  try {
    const next = getSearchHistory().filter((item) => item.toLowerCase() !== q.toLowerCase());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function clearSearchHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
