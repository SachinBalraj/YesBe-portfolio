import type { Article, KnowledgeCategory } from "./types";

export const SITE_URL = "https://www.yesbe.tech";

export const articleUrl = (slug: string) =>
  `${SITE_URL}/knowledge-center/article/${slug}`;

export const categoryUrl = (slug: string) =>
  `${SITE_URL}/knowledge-center/category/${slug}`;

export const searchUrl = (q: string) =>
  `${SITE_URL}/knowledge-center/search?q=${encodeURIComponent(q)}`;

export function getArticleSeoTitle(article: Article) {
  return article.seoTitle
    ? article.seoTitle
    : `${article.title} | Knowledge Center | YesBe Technologies`;
}

export function getArticleSeoDescription(article: Article) {
  return article.metaDescription
    ? article.metaDescription
    : article.excerpt;
}

export function getCategorySeoTitle(category: KnowledgeCategory) {
  return `${category.name} Guides & Articles | YesBe Knowledge Center`;
}

export function getCategorySeoDescription(category: KnowledgeCategory) {
  return `${category.description} Read expert ${category.name.toLowerCase()} articles, guides, and insights from YesBe Technologies.`;
}

export function buildArticleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: getArticleSeoDescription(article),
    image: article.featuredImage,
    articleSection: article.category,
    timeRequired: `PT${article.readingTime}M`,
    wordCount: article.wordCount ?? Math.max(200, article.readingTime * 200),
    author: {
      "@type": "Person",
      name: article.author,
      jobTitle: article.authorRole,
      ...(article.authorImage ? { image: article.authorImage } : {}),
      ...(article.authorBio ? { description: article.authorBio } : {}),
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.yesbe.tech/#organization",
      name: "YesBe Technologies",
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
