import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpenCheck, CalendarDays, Clock, Eye, RefreshCw } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { JsonLd } from "@/components/common/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { articleBySlug, getAdjacentArticles, getRelatedArticles } from "@/knowledge/articles";
import { getHeadings, Markdown, renderMarkdown } from "@/knowledge/markdown";
import { generateFAQs } from "@/utils/generateFAQ";
import {
  articleUrl,
  buildArticleSchema,
  buildFaqSchema,
  getArticleSeoDescription,
  getArticleSeoTitle,
  SITE_URL,
} from "@/knowledge/seo";
import { ReadingProgress } from "@/components/knowledge/ReadingProgress";
import { CategoryBadge } from "@/components/knowledge/CategoryBadge";
import { ShareButtons } from "@/components/knowledge/ShareButtons";
import { TableOfContents } from "@/components/knowledge/TableOfContents";
import { KeyTakeaways } from "@/components/knowledge/KeyTakeaways";
import { FAQSection } from "@/components/knowledge/FAQSection";
import { AuthorCard } from "@/components/knowledge/AuthorCard";
import { ContactCTA } from "@/components/knowledge/ContactCTA";
import { NewsletterSignup } from "@/components/knowledge/NewsletterSignup";
import { RelatedArticles } from "@/components/knowledge/RelatedArticles";
import { PrevNextArticle } from "@/components/knowledge/PrevNextArticle";
import { ArticleHeaderMetadata } from "@/components/knowledge/ArticleHeaderMetadata";
import { formatDate } from "@/components/knowledge/share";

export function ArticleDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const article = articleBySlug(slug);

  const headings = useMemo(
    () => (article ? getHeadings(renderMarkdown(article.body)) : []),
    [article],
  );
  const related = useMemo(() => (article ? getRelatedArticles(article, 3) : []), [article]);
  const adjacent = useMemo(() => (article ? getAdjacentArticles(article) : { prev: null, next: null }), [article]);
  const generatedFaqs = useMemo(
    () => (article ? generateFAQs(article.title, article.keywords) : []),
    [article],
  );
  const faqs = article?.faq?.length ? article.faq : generatedFaqs;

  useSEO({
    title: article ? getArticleSeoTitle(article) : "Article Not Found",
    description: article ? getArticleSeoDescription(article) : "This article could not be found.",
    canonical: article ? articleUrl(article.slug) : `${SITE_URL}/knowledge-center`,
    ogImage: article?.featuredImage,
    ogType: "article",
  });

  if (!article) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground">Article not found</h1>
        <p className="mt-3 text-muted-foreground">
          The article you're looking for may have been moved or removed.
        </p>
        <Link
          to="/knowledge-center"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Knowledge Center
        </Link>
      </div>
    );
  }

  const schemas: Record<string, unknown>[] = [
    buildArticleSchema(article),
  ];
  if (faqs.length) {
    schemas.push(buildFaqSchema(faqs));
  }

  return (
    <div className="bg-ice-gradient">
      <ReadingProgress />
      <JsonLd schema={schemas[0]} />
      {schemas.slice(1).map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}

      <div className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Knowledge Center", href: "/knowledge-center" },
            { label: article.category, href: `/knowledge-center/category/${article.categorySlug}` },
            { label: article.title },
          ]}
        />
      </div>

      <article>
        <header className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <CategoryBadge name={article.category} slug={article.categorySlug} />
            {article.popular && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700">
                Popular
              </span>
            )}
            {article.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
            {article.title}
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
            {article.excerpt}
          </p>

          <ArticleHeaderMetadata article={article} />

          <div className="mt-6">
            <ShareButtons article={article} />
          </div>

          <div className="relative mt-8 overflow-hidden rounded-3xl">
            <img
              src={article.featuredImage}
              alt={`${article.title} — YesBe Knowledge Center guide`}
              loading="lazy"
              decoding="async"
              width={1200}
              height={630}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-200/60" />
          </div>
        </header>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,720px)_300px] lg:items-start lg:justify-center">
            <div className="min-w-0">
              <div className="prose-yesbe">
                <Markdown markdown={article.body} />
              </div>

              <div className="mt-12 space-y-8">
                <KeyTakeaways article={article} />
              </div>

              <div className="mt-12">
                <FAQSection article={article} faq={faqs} />
              </div>

              <div className="mt-10 border-t border-slate-200/70 pt-8">
                <AuthorCard article={article} />
              </div>

              <div className="mt-8">
                <ShareButtons article={article} />
              </div>

              <div className="mt-10">
                <PrevNextArticle prev={adjacent.prev} next={adjacent.next} />
              </div>
            </div>

            <aside className="hidden lg:sticky lg:top-24 lg:block">
              <TableOfContents headings={headings} />
            </aside>
          </div>

          <div className="mt-16">
            <ContactCTA />
          </div>

          <div className="mt-16">
            <RelatedArticles articles={related} />
          </div>

          <div className="mt-16">
            <NewsletterSignup />
          </div>
        </div>
      </article>
    </div>
  );
}
