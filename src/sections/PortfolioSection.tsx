import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/animations";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";

/* ─── GitHub Icon ─── */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ─── Project Card ─── */

function ProjectCard({
  project,
}: {
  project: CaseStudy;
}) {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/case-studies/${project.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.article
      variants={fadeInUp}
      className="group h-full flex flex-col overflow-hidden rounded-2xl border border-white/40 bg-white transition-all duration-300 hover:border-primary/30"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(37,99,235,0.03)",
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 8px 24px rgba(37,99,235,0.10), 0 16px 48px rgba(0,0,0,0.05)",
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={goToDetail}>
        <img
          src={project.image}
          alt={`${project.title} — ${project.category} case study by YesBe`}
          loading="lazy"
          decoding="async"
          width={700}
          height={450}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-primary backdrop-blur-sm">
          {project.category}
        </span>

        {/* Status badge */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={goToDetail}>
          {project.title}
        </h3>

        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground flex-1">
          {project.shortOverview}
        </p>

        {/* Tech chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/40 bg-muted px-2 py-0.5 text-[11px] font-medium text-primary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-md border border-white/40 bg-muted px-2 py-0.5 text-[11px] font-medium text-[#94a3b8]">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Business impact mini */}
        <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/50 px-3 py-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
            Impact
          </span>
          <p className="mt-0.5 text-[12px] text-muted-foreground leading-snug">
            {project.businessResult[0]}
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={goToDetail}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb]/90 hover:shadow-md"
          >
            View Case Study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-white text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:text-foreground hover:shadow-md"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} Live Demo`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-white text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:text-foreground hover:shadow-md"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main Section ─── */

export function PortfolioSection() {
  return (
    <section
      id="projects"
      className="relative py-12 lg:py-16 bg-white overflow-hidden"
      aria-label="Featured Projects — Client case studies in e-commerce, restaurant automation, library management, analytics, and AI"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.06] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Case Studies
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Featured <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
          />
          <motion.p variants={fadeInUp} className="mt-5 text-[15px] text-muted-foreground leading-relaxed">
            Real projects, real results. Each one solved a specific business problem.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {caseStudies.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
