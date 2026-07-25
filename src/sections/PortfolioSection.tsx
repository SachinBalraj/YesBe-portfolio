import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/animations";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";

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
