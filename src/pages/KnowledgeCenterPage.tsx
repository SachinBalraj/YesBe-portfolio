import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHeader } from "@/components/common/PageHeader";

const KnowledgeCenterSection = lazy(() => import("@/sections/KnowledgeCenterSection").then(m => ({ default: m.KnowledgeCenterSection })));

export function KnowledgeCenterPage() {
  useSEO({
    title: SEO_TITLES.knowledgeCenter,
    description: SEO_DESCRIPTIONS.knowledgeCenter,
    canonical: "https://www.yesbe.tech/knowledge-center",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.knowledgeCenter,
        description: SEO_DESCRIPTIONS.knowledgeCenter,
        url: "https://www.yesbe.tech/knowledge-center",
        publisher: { "@type": "Organization", name: "YesBe", url: "https://www.yesbe.tech" },
      }} />
      <PageHeader
        badge="Knowledge Center"
        title="Knowledge"
        highlight="Center"
        description="Practical guides on AI, ERP, Power BI, SEO, and business technology."
        breadcrumbs={[{ label: "Knowledge Center" }]}
      />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <KnowledgeCenterSection />
      </Suspense>
    </>
  );
}
