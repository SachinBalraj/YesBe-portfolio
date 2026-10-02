import type { Article, KnowledgeCategory } from "./types";
import {
  FOUNDER_AUTHOR_NAME,
  FOUNDER_PERSON_ID,
  FOUNDER_PROFILE_URL,
  ORGANIZATION_ID, ORGANIZATION_NAME,
} from "@/constants";

export const SITE_URL = "https://www.yesbe.tech";

export const articleUrl = (slug: string) =>
  `${SITE_URL}/insights/article/${slug}`;

export const categoryUrl = (slug: string) =>
  `${SITE_URL}/insights/category/${slug}`;

export const searchUrl = (q: string) =>
  `${SITE_URL}/insights/search?q=${encodeURIComponent(q)}`;

export function getArticleSeoTitle(article: Article) {
  return article.seoTitle
    ? article.seoTitle
    : `${article.title} | Insights | YESBE Technologies`;
}

export function getArticleSeoDescription(article: Article) {
  return article.metaDescription
    ? article.metaDescription
    : article.excerpt;
}

export function getCategorySeoTitle(category: KnowledgeCategory) {
  return `${category.name} Guides & Articles | YESBE Insights`;
}

export function getCategorySeoDescription(category: KnowledgeCategory) {
  return `${category.description} Read expert ${category.name.toLowerCase()} articles, guides, and insights from YESBE Technologies.`;
}

export function buildArticleSchema(article: Article) {
  const isFounder = article.author === FOUNDER_AUTHOR_NAME;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: getArticleSeoDescription(article),
    image: article.featuredImage,
    articleSection: article.category,
    timeRequired: `PT${article.readingTime}M`,
    wordCount: article.wordCount ?? Math.max(200, article.readingTime * 200),
    // Founder-authored articles reference the one canonical Person node from
    // /sachin-balraj via its @id, so Article → Person → Organization resolves
    // to a single entity instead of a fresh inline duplicate per article.
    //
    // Everything else is attributed to the Organization itself. Team bylines
    // ("YesBe Marketing Team", "YesBe CRM Team", …) are not verifiable people,
    // so declaring them as schema.org Person would invent identities. Attributing
    // to the real company keeps the authorship honest and concentrates authority
    // on the YESBE Technologies entity instead of spreading it across phantoms.
    author: isFounder
      ? {
          "@type": "Person",
          "@id": FOUNDER_PERSON_ID,
          name: article.author,
          url: FOUNDER_PROFILE_URL,
          jobTitle: article.authorRole,
          description: article.authorBio,
        }
      : {
          "@type": "Organization",
          "@id": ORGANIZATION_ID,
          // Must match the name on the Organization node itself: reusing the
          // byline here (e.g. "YesBe AI Team") would attach a second, conflicting
          // name to one @id, which invalidates the entity graph. The byline stays
          // visible in the page content; schema attributes to the real company.
          name: ORGANIZATION_NAME,
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/YBlogo.png` },
        },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: ORGANIZATION_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/YBlogo.png` },
    },
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl(article.slug),
    },
    keywords: [...article.tags, ...article.keywords].join(", "),
  };
}

export function buildFaqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
