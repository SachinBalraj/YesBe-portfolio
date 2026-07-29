import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className={`mb-6 flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
        <Link to="/" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
          <Home className="h-3.5 w-3.5" />
          Home
        </Link>
        {items.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            {crumb.href ? (
              <Link to={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</Link>
            ) : (
              <span className="text-foreground font-medium">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
