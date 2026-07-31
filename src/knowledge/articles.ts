import { parse } from "yaml";
import type { Article } from "./types";
import { categoryByName } from "./categories";
import { calculateReadingTime } from "@/utils/readingTime";

const rawModules = import.meta.glob(
  "../../content/articles/*.md",
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;

interface RawFrontmatter {
  title?: string;
  slug?: string;
  category?: string;
  contentType?: 'Article' | 'Guide' | 'Case Study';
  author?: string;
  authorRole?: string;
  authorImage?: string;
  authorBio?: string;
  authorSocials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  publishedDate?: string;
  updatedDate?: string;
  readingTime?: number | string;
  featuredImage?: string;
  excerpt?: string;
  tags?: string[];
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  popular?: boolean;
  featured?: boolean;
  keyTakeaways?: string[];
  faq?: { question: string; answer: string }[];
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseArticle(raw: string): Article | null {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const meta = parse(match[1]) as RawFrontmatter;
  const body = match[2].trim();
  const title = meta.title ?? "Untitled";
  const category = meta.category ?? "Business Tips";
  const categorySlug = toSlug(category);
  const slug = meta.slug ?? toSlug(title);

  // Automatic reading time and word count calculation
  const readingCalc = calculateReadingTime(body);
  const explicitReadingTime =
    typeof meta.readingTime === 'number'
      ? meta.readingTime
      : Number(String(meta.readingTime ?? '').replace(/[^\d]/g, ''));
  const readingTimeMinutes = explicitReadingTime > 0 ? explicitReadingTime : readingCalc.minutes;
  const readingTimeText = explicitReadingTime > 0 ? `${explicitReadingTime} min read` : readingCalc.text;

  let inferredContentType: 'Article' | 'Guide' | 'Case Study' = 'Article';
  if (meta.contentType) {
    inferredContentType = meta.contentType;
  } else if (slug.includes('guide') || slug.includes('how-to') || slug.includes('checklist') || title.toLowerCase().includes('guide')) {
    inferredContentType = 'Guide';
  } else if (slug.includes('case-study')) {
    inferredContentType = 'Case Study';
  }

  const defaultAuthor = meta.author ?? "Sachin Balraj";
  const defaultRole = meta.authorRole ?? (defaultAuthor.includes("Sachin") ? "Founder & CEO - YesBe" : "YesBe Technologies");

  return {
    title,
    slug,
    category,
    categorySlug: categoryByName(category)?.slug ?? categorySlug,
    contentType: inferredContentType,
    author: defaultAuthor,
    authorRole: defaultRole,
    authorImage: meta.authorImage ?? (defaultAuthor.includes("Sachin") ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80" : undefined),
    authorBio: meta.authorBio ?? (defaultAuthor.includes("Sachin") ? "Founder & Tech Architect at YesBe Technologies. Specializing in AI, ERP systems, cloud architecture, and enterprise digital transformation." : "Subject matter expert at YesBe Technologies writing on software engineering, AI, and business technology."),
    authorSocials: meta.authorSocials ?? {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:contact@yesbe.tech",
    },
    publishedDate: meta.publishedDate ?? "2026-07-31",
    updatedDate: meta.updatedDate ?? meta.publishedDate ?? "2026-08-05",
    readingTime: readingTimeMinutes,
    readingTimeText,
    wordCount: readingCalc.words,
    featuredImage:
      meta.featuredImage ??
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=900&fit=crop&q=80",
    excerpt: meta.excerpt ?? "",
    tags: meta.tags ?? [],
    seoTitle:
      meta.seoTitle ?? `${title} | Knowledge Center | YesBe Technologies`,
    metaDescription:
      meta.metaDescription ??
      `${title} — an expert guide from the YesBe Knowledge Center on ${category.toLowerCase()}.`,
    keywords: meta.keywords ?? [],
    popular: meta.popular ?? false,
    featured: meta.featured ?? false,
    keyTakeaways: meta.keyTakeaways ?? [],
    faq: meta.faq ?? [],
    body,
  };
}

export const articles: Article[] = Object.keys(rawModules)
  .sort()
  .map((key) => parseArticle(rawModules[key]))
  .filter((a): a is Article => a !== null);

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const articlesByCategory = (categorySlug: string) =>
  articles.filter((a) => a.categorySlug === categorySlug);

export const featuredArticle = (categorySlug?: string) => {
  const pool = categorySlug
    ? articlesByCategory(categorySlug)
    : articles;
  return (
    pool.find((a) => a.featured) ?? pool[0]
  );
};

export const latestArticles = (count = 9) =>
  [...articles].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate)).slice(0, count);

export const popularArticles = (count = 6) =>
  articles
    .filter((a) => a.popular)
    .slice(0, count)
    .concat(articles.filter((a) => !a.popular).slice(0, Math.max(0, count)));

export interface SearchOptions {
  categorySlug?: string;
  contentType?: string; // 'All' | 'Article' | 'Guide' | 'Case Study'
  dateFilter?: string;  // 'all' | 'month' | 'year'
  sortBy?: string;      // 'relevance' | 'newest' | 'oldest' | 'readingTime'
}

/**
 * Calculates a weighted match score for an article against a query string.
 */
export function calculateArticleScore(article: Article, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  let score = 0;
  const titleLower = article.title.toLowerCase();
  const excerptLower = article.excerpt.toLowerCase();
  const categoryLower = article.category.toLowerCase();
  const bodyLower = article.body.toLowerCase();
  const tagsLower = article.tags.map((t) => t.toLowerCase());
  const keywordsLower = article.keywords.map((k) => k.toLowerCase());

  // Exact title match gets maximum boost
  if (titleLower === q) score += 500;
  else if (titleLower.startsWith(q)) score += 300;
  else if (titleLower.includes(q)) score += 200;

  // Split query into terms
  const terms = q.split(/\s+/).filter((t) => t.length > 0);

  for (const term of terms) {
    if (titleLower.includes(term)) score += 100;
    if (keywordsLower.some((k) => k.includes(term))) score += 80;
    if (tagsLower.some((t) => t.toLowerCase().includes(term))) score += 60;
    if (categoryLower.includes(term)) score += 50;
    if (excerptLower.includes(term)) score += 30;
    if (bodyLower.includes(term)) score += 10;
  }

  return score;
}

export function searchArticles(query: string, categorySlug?: string): Article[] {
  return searchArticlesAdvanced(query, { categorySlug });
}

export function searchArticlesAdvanced(query: string, options: SearchOptions = {}): Article[] {
  const q = query.trim().toLowerCase();
  const { categorySlug, contentType, dateFilter, sortBy = 'relevance' } = options;

  const now = new Date('2026-07-31');

  let filtered = articles.filter((a) => {
    // Category filter
    if (categorySlug && categorySlug !== 'all' && a.categorySlug !== categorySlug) {
      return false;
    }

    // Content Type filter
    if (contentType && contentType !== 'All' && contentType !== 'all') {
      if (a.contentType.toLowerCase() !== contentType.toLowerCase()) {
        return false;
      }
    }

    // Date Filter
    if (dateFilter && dateFilter !== 'all') {
      const pubDate = new Date(a.publishedDate);
      if (dateFilter === 'month') {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        if (pubDate < oneMonthAgo) return false;
      } else if (dateFilter === 'year') {
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        if (pubDate < oneYearAgo) return false;
      }
    }

    // Text search query
    if (q) {
      const score = calculateArticleScore(a, q);
      return score > 0;
    }

    return true;
  });

  // Sorting
  if (q && (sortBy === 'relevance' || !sortBy)) {
    filtered.sort((a, b) => {
      const scoreB = calculateArticleScore(b, q);
      const scoreA = calculateArticleScore(a, q);
      if (scoreB !== scoreA) return scoreB - scoreA;
      return b.publishedDate.localeCompare(a.publishedDate);
    });
  } else if (sortBy === 'newest') {
    filtered.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
  } else if (sortBy === 'oldest') {
    filtered.sort((a, b) => a.publishedDate.localeCompare(b.publishedDate));
  } else if (sortBy === 'readingTime') {
    filtered.sort((a, b) => a.readingTime - b.readingTime);
  }

  return filtered;
}

export function getSearchSuggestions(query: string, limit = 5): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchArticlesAdvanced(q, { sortBy: 'relevance' }).slice(0, limit);
}

export function getRelatedArticles(article: Article, count = 3) {
  const sameCategory = articles.filter(
    (a) => a.slug !== article.slug && a.categorySlug === article.categorySlug,
  );
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }
  const others = articles
    .filter(
      (a) => a.slug !== article.slug && a.categorySlug !== article.categorySlug,
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, count - sameCategory.length);
  return [...sameCategory, ...others];
}

export function getAdjacentArticles(article: Article) {
  const sorted = [...articles].sort((a, b) =>
    b.publishedDate.localeCompare(a.publishedDate),
  );
  const index = sorted.findIndex((a) => a.slug === article.slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: sorted[index + 1] ?? null,
    next: sorted[index - 1] ?? null,
  };
}

export function getAllTags() {
  const counts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export function getCategoryArticleCount(slug: string) {
  return articlesByCategory(slug).length;
}
