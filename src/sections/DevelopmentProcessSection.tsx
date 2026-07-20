import { motion } from "framer-motion";
import {
  Search, FileText, Palette, Code, TestTube, Rocket, LifeBuoy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Discovery",
    description: "Understand business goals, requirements, target audience, and project scope.",
    duration: "1–2 days",
  },
  {
    icon: FileText,
    title: "Planning",
    description: "Prepare project roadmap, architecture, technology stack, milestones, and delivery plan.",
    duration: "2–3 days",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Design modern interfaces, user experience flows, prototypes, and obtain client approval.",
    duration: "3–5 days",
  },
  {
    icon: Code,
    title: "Development",
    description: "Develop the complete solution including frontend, backend, APIs, database, and core features.",
    duration: "10–14 days",
  },
  {
    icon: TestTube,
    title: "Testing & QA",
    description: "Functional testing, responsive testing, security checks, bug fixes, and performance optimization.",
    duration: "2–3 days",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Deploy the application, configure domain, SSL, hosting, SEO settings, analytics, and production.",
    duration: "1–2 days",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    description: "Post-launch support, performance monitoring, bug resolution, and minor improvements.",
    duration: "30 days free",
  },
];

export function DevelopmentProcessSection() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-12 lg:py-16"
      aria-label="Development process — Discovery, Planning, Design, Development, Testing, Deployment, Support"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Our Development{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Process</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
          >
            A clear, structured process — from first call to post-launch support.
          </motion.p>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-7">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative text-center"
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/[0.06] border border-white/40">
                <step.icon className="h-6 w-6 text-primary" strokeWidth={1.8} />
              </div>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-primary/60">
                Step {i + 1}
              </div>
              <h3 className="mb-1.5 text-[15px] font-bold text-foreground">{step.title}</h3>
              <p className="mb-2 text-[13px] leading-relaxed text-muted-foreground">{step.description}</p>
              <span className="inline-block rounded-full bg-primary/[0.06] px-3 py-0.5 text-[11px] font-semibold text-primary">
                {step.duration}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/40 bg-gradient-to-br from-[#f8fbff] to-[#eff6ff] p-8">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa] px-5 py-2 text-sm font-bold text-white shadow-sm">
              ⚡ Typical Project Delivery Time
            </span>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Most YesBe projects are successfully designed, developed, tested, and deployed within{" "}
              <span className="font-semibold text-foreground">30 days</span>, depending on project scope and client feedback timelines.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
