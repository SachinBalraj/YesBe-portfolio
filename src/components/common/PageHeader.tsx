import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderAction {
  label: string;
  href: string;
  onClick?: () => void;
}

interface PageHeaderProps {
  /** Kept for backwards compatibility; the visual badge was retired. */
  badge?: string;
  title: string;
  highlight?: string;
  /**
   * Plain-text continuation of the H1, rendered after `title`/`highlight`
   * without the accent treatment.
   */
  titleAfter?: string;
  description: string;
  breadcrumbs?: Crumb[];
  /**
   * Emit the BreadcrumbList JSON-LD from `breadcrumbs` but drop the visible
   * trail.
   */
  hideBreadcrumbNav?: boolean;
  primaryAction?: PageHeaderAction;
  secondaryAction?: PageHeaderAction;
  /** Tighter vertical rhythm. */
  compact?: boolean;
}

export function PageHeader({
  title,
  highlight,
  titleAfter,
  description,
  breadcrumbs,
  hideBreadcrumbNav = false,
  primaryAction,
  secondaryAction,
  compact = false,
}: PageHeaderProps) {
  const hasActions = Boolean(primaryAction || secondaryAction);
  const showCrumbs = Boolean(breadcrumbs?.length) && !hideBreadcrumbNav;

  return (
    <section
      className={`border-b border-border/70 bg-white ${
        compact
          ? "pt-[104px] pb-10 sm:pt-[116px] sm:pb-12 lg:pt-[124px] lg:pb-14"
          : "pt-[104px] pb-12 sm:pt-[116px] sm:pb-14 lg:pt-[128px] lg:pb-16"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {breadcrumbs && breadcrumbs.length > 0 && !showCrumbs && (
            <div className="sr-only">
              <Breadcrumbs items={breadcrumbs} schemaOnly />
            </div>
          )}
          {showCrumbs && (
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbs!} />
            </div>
          )}

          <h1 className="text-3xl font-bold leading-[1.12] tracking-[-0.02em] text-navy sm:text-4xl lg:text-[2.75rem]">
            {title}{" "}
            {highlight && <span className="text-primary">{highlight}</span>}
            {titleAfter && <span className="text-navy">{titleAfter}</span>}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
            {description}
          </p>

          {hasActions && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {primaryAction && (
                <a
                  href={primaryAction.href}
                  onClick={primaryAction.onClick}
                  className="btn-primary group w-full sm:w-auto"
                >
                  {primaryAction.label}
                  <ArrowRight className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              )}
              {secondaryAction && (
                <a
                  href={secondaryAction.href}
                  onClick={secondaryAction.onClick}
                  className="btn-secondary group w-full sm:w-auto"
                >
                  {secondaryAction.label}
                  <ArrowRight className="h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
