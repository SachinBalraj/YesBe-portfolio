import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PageHeader } from "@/components/common/PageHeader";

const KnowledgeCenterSection = lazy(() => import("@/sections/KnowledgeCenterSection").then(m => ({ default: m.KnowledgeCenterSection })));

export function KnowledgeCenterPage() {
  useSEO({
    title: "Knowledge Center — AI, ERP, SEO & Technology Guides",
    description: "Free guides and articles on AI, ERP, Power BI, SEO, GEO, AEO, RAG, LangChain, cloud computing, and business automation.",
    canonical: "https://yesbe.com/knowledge-center",
  });

  return (
    <>
      <PageHeader
        badge="Knowledge Center"
        title="Knowledge"
        highlight="Center"
        description="Practical guides on AI, ERP, Power BI, SEO, and business technology."
      />
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <KnowledgeCenterSection />
      </Suspense>
    </>
  );
}
