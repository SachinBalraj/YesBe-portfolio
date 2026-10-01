import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHeader } from "@/components/common/PageHeader";
import {
  FOUNDER_PERSON,
  FOUNDER_PROFILE_URL,
} from "@/constants";

const FounderHeroSection = lazy(() =>
  import("@/sections/FounderHeroSection").then((m) => ({ default: m.FounderHeroSection }))
);
const FounderBackgroundSection = lazy(() =>
  import("@/sections/FounderBackgroundSection").then((m) => ({ default: m.FounderBackgroundSection }))
);
const FounderWorkSection = lazy(() =>
  import("@/sections/FounderWorkSection").then((m) => ({ default: m.FounderWorkSection }))
);

const OG_DESCRIPTION = "Official profile of Sachin Balraj, Founder of YESBE Technologies.";

export function FounderPage() {
  useSEO({
    title: SEO_TITLES.founder,
    description: SEO_DESCRIPTIONS.founder,
    canonical: FOUNDER_PROFILE_URL,
    ogType: "profile",
    ogDescription: OG_DESCRIPTION,
    // TODO(founder-photo): no professional founder image exists in the project
    // yet, so the site default social image is used. Replace with the founder's
    // real headshot asset once available.
    ogImage: "https://www.yesbe.tech/YBlogo.png",
  });

  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${FOUNDER_PROFILE_URL}#profile`,
          url: FOUNDER_PROFILE_URL,
          name: SEO_TITLES.founder,
          description: SEO_DESCRIPTIONS.founder,
          inLanguage: "en",
          isPartOf: { "@id": "https://www.yesbe.tech/#website" },
          mainEntity: FOUNDER_PERSON,
        }}
      />
      {/* The same Person, also emitted standalone so crawlers that do not walk
          into ProfilePage.mainEntity still resolve the entity. Identical @id
          and properties, so the two blocks merge rather than conflict. */}
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          ...FOUNDER_PERSON,
        }}
      />

      <PageHeader
        badge="Founder Profile"
        title="Sachin"
        highlight="Balraj"
        description="Founder of YESBE Technologies and Solution Architect at Springreen."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Sachin Balraj" }]}
      />

      <article aria-label="Profile of Sachin Balraj, Founder of YESBE Technologies">
        <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
          <div className="contain-content">
            <FounderHeroSection />
          </div>
        </Suspense>
        <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
          <div className="contain-content">
            <FounderBackgroundSection />
          </div>
        </Suspense>
        <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
          <div className="contain-content">
            <FounderWorkSection />
          </div>
        </Suspense>
      </article>
    </>
  );
}
