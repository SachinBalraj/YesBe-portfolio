import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import {
  ArrowRight,
  Bot,
  BarChart3,
  ExternalLink,
  Globe,
  Layers,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { FOUNDER_SAME_AS, SITE_CONFIG, TECH_STACK } from "@/constants";

const card = "rounded-[20px] border border-white/40 bg-white p-6";

/* ── Technical expertise ── */

const expertise: { title: string; description: string; Icon: LucideIcon }[] = [
  {
    title: "Software Architecture",
    description:
      "Structuring systems so they stay understandable, scalable and maintainable as requirements and teams grow.",
    Icon: Layers,
  },
  {
    title: "Artificial Intelligence",
    description:
      "AI assistants, chatbots, RAG pipelines and intelligent automation built on current LLM tooling.",
    Icon: Bot,
  },
  {
    title: "Web Technologies",
    description:
      "Responsive, accessible web platforms and applications with a focus on performance and search visibility.",
    Icon: Globe,
  },
  {
    title: "Data & Analytics",
    description:
      "Power BI dashboards, data modelling and reporting that turn operational data into decisions leadership can act on.",
    Icon: BarChart3,
  },
  {
    title: "Business Automation",
    description:
      "Replacing manual, repetitive process steps with dependable workflows and integrated systems.",
    Icon: Workflow,
  },
  {
    title: "Search & Discoverability",
    description:
      "Technical SEO, GEO and AEO so products and services are found through both classical and AI-assisted search.",
    Icon: TrendingUp,
  },
];

/* ── Connect ── */

const connectChannels = [
  {
    label: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    helper: "Email",
    Icon: Mail,
    external: false,
  },
  {
    label: `+91 ${SITE_CONFIG.phone}`,
    href: `tel:+${SITE_CONFIG.phone}`,
    helper: "Phone",
    Icon: Phone,
    external: false,
  },
  {
    label: "LinkedIn",
    href: FOUNDER_SAME_AS[0],
    helper: "Professional profile",
    Icon: FaLinkedin,
    external: true,
  },
];

export function FounderWorkSection() {
  const work = caseStudies.slice(0, 6);

  return (
    <>
      {/* ── Technical Expertise ── */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-16 lg:py-20"
        aria-labelledby="technical-expertise"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[8%] left-[5%] h-[340px] w-[340px] rounded-full bg-[#dbeafe] opacity-[0.10] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Capabilities
            </span>
            <h2
              id="technical-expertise"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Technical{" "}
              <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              The areas he works in directly, and the technologies those projects
              are built with.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {expertise.map(({ title, description, Icon }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className={`${card} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.10)]`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dbeafe] to-[#eff6ff]">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Technologies used across these engagements
            </h3>
            <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
              {TECH_STACK.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/40 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-foreground shadow-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Projects / Areas of Work ── */}
      <section
        className="relative overflow-hidden bg-white py-16 lg:py-20"
        aria-labelledby="projects-areas-of-work"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Portfolio
            </span>
            <h2
              id="projects-areas-of-work"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Projects &amp;{" "}
              <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
                Areas of Work
              </span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Delivered work spans education, healthcare, retail, hospitality,
              manufacturing and finance — from ERP systems and AI assistants to
              commerce platforms and analytics dashboards.
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {work.map((cs) => (
              <motion.li key={cs.slug} variants={fadeInUp}>
                <Link
                  to={`/case-studies/${cs.slug}`}
                  className={`${card} group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]`}
                >
                  <h3 className="text-base font-bold text-foreground">
                    {cs.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                    {cs.shortOverview}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                    Read the case study
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-center"
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
            >
              View all case studies
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Connect ── */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-[#f8fbff] to-white py-16 lg:py-20"
        aria-labelledby="connect-with-sachin-balraj"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.08] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Contact
            </span>
            <h2
              id="connect-with-sachin-balraj"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Contact &amp;{" "}
              <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
                Book a Consultation
              </span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              The fastest way to reach him is through the YESBE Technologies
              contact channels, which go directly to the founder.
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {connectChannels.map((c) => (
              <motion.li key={c.label} variants={fadeInUp}>
                <a
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex h-full items-center gap-4 rounded-[20px] border border-white/40 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dbeafe] to-[#eff6ff]">
                    <c.Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-foreground">
                      {c.label}
                    </span>
                    <span className="block text-[12px] text-muted-foreground">
                      {c.helper}
                    </span>
                  </span>
                  {c.external ? (
                    <ExternalLink
                      className="h-4 w-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="flex items-center justify-center gap-2 text-[13px] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Based in {SITE_CONFIG.location} · Working with businesses across India
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb]/90 hover:shadow-md"
            >
              Book a consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
