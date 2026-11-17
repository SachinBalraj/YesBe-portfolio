import { useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { SectionHeading } from "@/components/common/SectionHeading";
import { cn } from "@/utils/cn";

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='450' viewBox='0 0 700 450'%3E%3Crect width='700' height='450' fill='%23f8fafc'/%3E%3Cpath d='M280 200h140v60a10 10 0 01-10 10H290a10 10 0 01-10-10v-60z' fill='%23e2e8f0'/%3E%3Cpath d='M260 190a12 12 0 0112-12h156a12 12 0 0112 12v10H260v-10z' fill='%23cbd5e1'/%3E%3C/svg%3E";

function ProjectCard({
  project,
  titleTag,
  feature = false,
  dark = false,
}: {
  project: CaseStudy;
  titleTag: "h2" | "h3";
  feature?: boolean;
  dark?: boolean;
}) {
  const Title = titleTag;
  const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMG;
  }, []);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden border transition-colors",
        dark
          ? "border-white/10 bg-[#05132e] text-white hover:border-white/25"
          : "border-line bg-white hover:border-line-strong",
      )}
    >
      <Link to={`/case-studies/${project.slug}`} className="block overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} — illustrative interface preview`}
          loading="lazy"
          decoding="async"
          width={1200}
          height={760}
          onError={handleImgError}
          className={cn(
            "w-full object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.025]",
            feature ? "aspect-[16/9]" : "aspect-[4/3]",
          )}
        />
      </Link>

      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", feature && "sm:p-7")}>
        <div
          className={cn(
            "flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
            dark ? "text-white/50" : "text-body/80",
          )}
        >
          <span className={dark ? "text-[#8eb5ff]" : "text-primary"}>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.label}</span>
        </div>

        <Title
          className={cn(
            "mt-3 font-semibold leading-[1.2] tracking-[-0.025em]",
            feature ? "text-[1.35rem] sm:text-[1.6rem]" : "text-[1.05rem]",
            dark ? "text-white" : "text-ink",
          )}
        >
          <Link
            to={`/case-studies/${project.slug}`}
            className={cn("transition-colors", dark ? "hover:text-[#9fc0ff]" : "hover:text-primary")}
          >
            {project.title}
          </Link>
        </Title>

        <p
          className={cn(
            "mt-2.5 flex-1 leading-6",
            feature ? "text-[13.5px]" : "text-[12.5px]",
            dark ? "text-white/58" : "text-body",
          )}
        >
          {project.shortOverview}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className={cn(
                "border px-2 py-0.5 text-[10px] font-medium",
                dark
                  ? "border-white/15 bg-white/[0.04] text-white/60"
                  : "border-line bg-paper text-body",
              )}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className={cn("px-1 py-0.5 text-[10px] font-medium", dark ? "text-white/55" : "text-body/80")}>
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <Link
          to={`/case-studies/${project.slug}`}
          className={cn(
            "mt-5 inline-flex items-center gap-1.5 py-1 text-[12px] font-semibold",
            dark ? "text-[#9fc0ff] hover:text-white" : "text-primary hover:text-[#173eb5]",
          )}
        >
          Review the project
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function PortfolioSection({
  asH1 = false,
  clearNavbar = false,
}: {
  /** Promote the section heading to the page H1 when it is the first content block. */
  asH1?: boolean;
  /** Add top clearance for the fixed navbar when this section starts the page. */
  clearNavbar?: boolean;
} = {}) {
  const heading = (
    <span>
      Selected technology <span className="text-primary">projects</span>
    </span>
  );

  return (
    <section
      id="projects"
      className={`border-y border-border/70 bg-slate-50 ${
        clearNavbar ? "pt-[112px] pb-16 sm:pt-[124px] lg:pt-[132px] lg:pb-20" : "py-12 sm:py-16 lg:py-20"
      }`}
      aria-label="Selected technology projects built by YESBE"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as={asH1 ? "h1" : "h2"}
          title={heading}
          description="Solutions we have designed and built. Each entry addresses a specific business problem."
          action={
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 py-1 text-[14px] font-semibold text-primary hover:text-[#1d4ed8]"
            >
              View all case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {caseStudies.map((project, index) => {
            const span =
              index === 0
                ? "sm:col-span-2 lg:col-span-7"
                : index === 1
                  ? "lg:col-span-5"
                  : index < 5
                    ? "lg:col-span-4"
                    : "lg:col-span-3";
            return (
              <div key={project.slug} className={span}>
                <ProjectCard
                  project={project}
                  titleTag={asH1 ? "h2" : "h3"}
                  feature={index === 0}
                  dark={index === 1}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
