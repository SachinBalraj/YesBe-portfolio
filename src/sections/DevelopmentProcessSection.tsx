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
    description: "Understanding your goals, users, and technical requirements.",
    duration: "1–2 days",
  },
  {
    icon: FileText,
    title: "Planning",
    description: "Roadmap, milestones, tech selection, and architecture design.",
    duration: "1–3 days",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Wireframes and mockups focused on experience and conversion.",
    duration: "3–7 days",
  },
  {
    icon: Code,
    title: "Development",
    description: "Clean, scalable code with demos at every milestone.",
    duration: "1–8 weeks",
  },
  {
    icon: TestTube,
    title: "Testing",
    description: "Functional testing, performance optimization, and cross-browser checks.",
    duration: "2–5 days",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Domain, SSL, monitoring, and search engine indexing.",
    duration: "1–2 days",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    description: "Maintenance, bug fixes, and feature updates after launch.",
    duration: "Ongoing",
  },
];

export function DevelopmentProcessSection() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-24 lg:py-28"
      aria-label="Development process — Discovery, Planning, Design, Development, Testing, Deployment, Support"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
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
      </div>
    </section>
  );
}
