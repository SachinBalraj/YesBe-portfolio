import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/animations";
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
  badge: string;
  title: string;
  highlight?: string;
  /**
   * Plain-text continuation of the H1, rendered after `title`/`highlight`
   * without the gradient treatment. Used where the H1 needs to carry the
   * person's role as well as their name.
   */
  titleAfter?: string;
  description: string;
  breadcrumbs?: Crumb[];
  primaryAction?: PageHeaderAction;
  secondaryAction?: PageHeaderAction;
  /** Tighter vertical rhythm — opt-in so existing pages keep their current spacing. */
  compact?: boolean;
}

export function PageHeader({
  badge,
  title,
  highlight,
  titleAfter,
  description,
  breadcrumbs,
  primaryAction,
  secondaryAction,
  compact = false,
}: PageHeaderProps) {
  const hasActions = Boolean(primaryAction || secondaryAction);

  return (
    <section
      className={`relative overflow-hidden bg-white ${
        compact
          ? "pt-[112px] pb-10 sm:pt-[124px] sm:pb-12 lg:pt-[132px] lg:pb-14"
          : "pt-[140px] pb-16 lg:pt-[160px] lg:pb-20"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#eaf6ff_0%,transparent_60%)]" />
        <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-[15%] right-[8%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.06] blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-3xl mx-auto"
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.div variants={fadeInUp} className="text-left mb-6">
              <Breadcrumbs items={breadcrumbs} />
            </motion.div>
          )}
          <motion.div variants={fadeInUp} className="text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              {badge}
            </span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-center text-balance">
            {title}{" "}
            {highlight && <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">{highlight}</span>}
            {titleAfter && <>{titleAfter}</>}
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
          <motion.p variants={fadeInUp} className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground text-center">
            {description}
          </motion.p>
          {hasActions && (
            <motion.div
              variants={fadeInUp}
              className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              {primaryAction && (
                <a
                  href={primaryAction.href}
                  onClick={primaryAction.onClick}
                  className="group inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[#1d4ed8] px-7 py-[14px] text-[15px] font-semibold text-white shadow-[0_1px_4px_rgba(37,99,235,0.25),0_4px_16px_rgba(37,99,235,0.12)] transition-colors duration-300 hover:bg-[#1e40af] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:w-auto"
                >
                  {primaryAction.label}
                  <ArrowRight className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              )}
              {secondaryAction && (
                <a
                  href={secondaryAction.href}
                  onClick={secondaryAction.onClick}
                  className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-slate-200 bg-white px-7 py-[14px] text-[15px] font-semibold text-foreground shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-colors duration-300 hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  {secondaryAction.label}
                  <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
