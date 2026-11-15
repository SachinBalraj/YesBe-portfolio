import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { serializeJsonLd } from "@/utils/jsonLd";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
  /**
   * Emit only the BreadcrumbList JSON-LD and skip the visible breadcrumb
   * trail. Used where a page drops the breadcrumb UI but the structured
   * data is still valid and worth keeping for SEO.
   */
  schemaOnly?: boolean;
}

export function Breadcrumbs({ items, className = "", schemaOnly = false }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yesbe.tech/" },
      ...items.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.label,
        ...(crumb.href ? { item: `https://www.yesbe.tech${crumb.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      {!schemaOnly && (
        <nav
          aria-label="Breadcrumb"
          className={`flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-body ${className}`}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <Home className="size-3.5" aria-hidden="true" />
            Home
          </Link>
          {items.map((crumb, i) => {
            const isLast = i === items.length - 1;
            return (
              <span key={`${crumb.label}-${i}`} className="flex items-center gap-2.5">
                <ChevronRight className="size-3 text-muted-foreground/60" aria-hidden="true" />
                {crumb.href && !isLast ? (
                  <Link to={crumb.href} className="transition-colors hover:text-primary">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-ink" aria-current={isLast ? "page" : undefined}>
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      )}
    </>
  );
}
