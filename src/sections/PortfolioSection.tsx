import { useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { SectionHeading } from "@/components/common/SectionHeading";

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='450' viewBox='0 0 700 450'%3E%3Crect width='700' height='450' fill='%23f8fafc'/%3E%3Cpath d='M280 200h140v60a10 10 0 01-10 10H290a10 10 0 01-10-10v-60z' fill='%23e2e8f0'/%3E%3Cpath d='M260 190a12 12 0 0112-12h156a12 12 0 0112 12v10H260v-10z' fill='%23cbd5e1'/%3E%3C/svg%3E";

function ProjectCard({ project }: { project: CaseStudy }) {
  const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMG;
  }, []);

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-border bg-white transition-colors hover:border-slate-300">
      <Link to={`/case-studies/${project.slug}`} className="block overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} — illustrative image for a ${project.category} project`}
          loading="lazy"
          decoding="async"
          width={700}
          height={450}
          onError={handleImgError}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
          <span className="text-primary">{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.label}</span>
        </div>

        <h3 className="mt-2 text-[17px] font-semibold leading-snug text-navy">
          <Link to={`/case-studies/${project.slug}`} className="hover:text-primary">
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
          {project.shortOverview}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="border border-border bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-1 py-0.5 text-[11px] font-medium text-slate-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <Link
          to={`/case-studies/${project.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 py-1 text-[13px] font-semibold text-primary hover:text-[#1d4ed8]"
        >
          View project
          <ArrowUpRight className="h-3.5 w-3.5" />
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
        clearNavbar ? "pt-[112px] pb-16 sm:pt-[124px] lg:pt-[132px] lg:pb-20" : "py-16 sm:py-20 lg:py-24"
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
