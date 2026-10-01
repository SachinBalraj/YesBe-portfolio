import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations";
import { Link } from "react-router-dom";
import { Building2, Compass, Lightbulb, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Shared section chrome (matches the rest of the site) ── */

function SectionHeader({
  id,
  eyebrow,
  title,
  highlight,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto mb-10 max-w-2xl text-center"
    >
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 id={id} className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}{" "}
        <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
          {highlight}
        </span>
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
      <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

const card =
  "rounded-[20px] border border-white/40 bg-white p-6";

/* ── Content ── */

const aboutParagraphs = [
  "The work sits at the point where architecture meets an actual business problem. Before anything is built, the priority is understanding how an organisation operates, where the friction is, and which parts of the process are genuinely worth automating.",
  "That approach shapes everything YESBE Technologies delivers — from ERP systems and internal tools to AI features, analytics dashboards and the web platforms customers actually use. The goal is dependable software that a team can maintain long after handover.",
  "Outside YESBE Technologies, that architectural practice continues as a Solution Architect at Springreen, working on enterprise systems where structure, reliability and integration matter.",
];

const founderResponsibilities: { title: string; description: string; Icon: LucideIcon }[] = [
  {
    title: "Technology Direction",
    description:
      "Sets the technical roadmap — stack choices, architecture patterns, and how new capability is introduced without destabilising what already works.",
    Icon: Compass,
  },
  {
    title: "Solution Delivery",
    description:
      "Works directly with clients from requirements through build, deployment and support, so solutions stay aligned with what the business actually needs.",
    Icon: Lightbulb,
  },
  {
    title: "Client Partnership",
    description:
      "Engages founders, CTOs and business owners as a single point of accountability across AI, ERP, web and analytics engagements.",
    Icon: User,
  },
];

const experience: {
  role: string;
  organisation: string;
  period: string;
  location: string;
  points: string[];
  current: boolean;
}[] = [
  {
    role: "Founder",
    organisation: "YESBE Technologies",
    period: "2024 — Present",
    location: "Salem, Tamil Nadu, India",
    current: true,
    points: [
      "Founded and lead YESBE Technologies, delivering AI, ERP, web and analytics work for startups, SMEs and enterprises.",
      "Own solution architecture end to end: scoping, system design, implementation, deployment and ongoing support.",
      "Practice covers AI solutions, ERP development, custom software, Power BI dashboards, business automation and cloud.",
    ],
  },
  {
    role: "Solution Architect",
    organisation: "Springreen",
    period: "Current",
    location: "India",
    current: true,
    points: [
      "Designs and reviews solution architecture for enterprise systems, with an emphasis on reliability, integration and maintainability.",
      "Bridges business requirements and engineering teams, translating operational needs into sound technical design.",
    ],
  },
];

/* ── Sections ── */

export function FounderBackgroundSection() {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 lg:py-20"
      aria-labelledby="about-sachin-balraj"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[5%] left-[5%] h-[320px] w-[320px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="about-sachin-balraj"
          eyebrow="Profile"
          title="About"
          highlight="Sachin Balraj"
          description="A short account of how he works and what he is focused on right now."
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl space-y-4"
        >
          {aboutParagraphs.map((p) => (
            <motion.p
              key={p.slice(0, 32)}
              variants={fadeInUp}
              className="text-[15px] leading-relaxed text-muted-foreground"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>

        {/* ── Founder of YESBE Technologies ── */}
        <div className="mt-16">
          <SectionHeader
            id="founder-of-yesbe"
            eyebrow="Company"
            title="Founder of"
            highlight="YESBE Technologies"
            description="YESBE Technologies was founded in 2024 and builds AI tools, ERP systems, Power BI dashboards, web applications and automation for organisations that need practical, maintainable software."
          />

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {founderResponsibilities.map(({ title, description, Icon }) => (
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
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:gap-3"
            >
              Read more about YESBE Technologies
              <Building2 className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* ── Professional Experience ── */}
        <div className="mt-16">
          <SectionHeader
            id="professional-experience"
            eyebrow="Career"
            title="Professional"
            highlight="Experience"
            description="Current professional roles, with the responsibilities that come with them."
          />

          <motion.ol
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-3xl space-y-6"
          >
            {experience.map((job) => (
              <motion.li
                key={job.organisation}
                variants={fadeInUp}
                className={`${card} border-l-4 border-l-primary`}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-lg font-bold text-foreground">
                    {job.role} — {job.organisation}
                  </h3>
                  {job.current && (
                    <span className="rounded-full bg-[#16a34a]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#16a34a]">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[13px] font-medium text-primary">
                  {job.period} · {job.location}
                </p>
                <ul className="mt-3 space-y-2">
                  {job.points.map((point) => (
                    <li
                      key={point.slice(0, 32)}
                      className="flex items-start gap-2 text-[13px] leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
