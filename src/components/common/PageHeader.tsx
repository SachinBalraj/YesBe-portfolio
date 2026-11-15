import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/system/ButtonLink";
import { Eyebrow } from "@/components/system/Eyebrow";
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
  /** Page category, rendered as the editorial eyebrow. */
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
  badge,
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
      className={`relative overflow-hidden border-b border-line bg-paper ${
        compact
          ? "pt-[104px] pb-12 sm:pt-[112px] sm:pb-14 lg:pt-[120px] lg:pb-16"
          : "pt-[104px] pb-14 sm:pt-[116px] sm:pb-16 lg:pt-[128px] lg:pb-20"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid bg-cobalt-glow opacity-70"
      />
      <div className="container-page relative">
        <div className="max-w-4xl">
          {breadcrumbs && breadcrumbs.length > 0 && !showCrumbs && (
            <div className="sr-only">
              <Breadcrumbs items={breadcrumbs} schemaOnly />
            </div>
          )}
          {showCrumbs && (
            <div className="mb-7">
              <Breadcrumbs items={breadcrumbs!} />
            </div>
          )}

          {badge && (
            <Eyebrow className="mb-5">{badge}</Eyebrow>
          )}

          <h1 className="display-lg text-ink">
            {title}{" "}
            {highlight && <span className="text-primary">{highlight}</span>}
            {titleAfter && <span className="text-ink">{titleAfter}</span>}
          </h1>

          <p className="lead-editorial mt-6">{description}</p>

          {hasActions && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {primaryAction && (
                <ButtonLink
                  href={primaryAction.href}
                  onClick={primaryAction.onClick}
                  variant="primary"
                  className="w-full sm:w-auto"
                  withArrow
                >
                  {primaryAction.label}
                </ButtonLink>
              )}
              {secondaryAction && (
                <ButtonLink
                  href={secondaryAction.href}
                  onClick={secondaryAction.onClick}
                  variant="secondary"
                  className="w-full sm:w-auto"
                  icon={<ArrowUpRight className="size-4" aria-hidden="true" />}
                >
                  {secondaryAction.label}
                </ButtonLink>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
