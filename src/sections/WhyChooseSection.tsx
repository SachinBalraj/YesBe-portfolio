import { motion } from "framer-motion";
import {
  IndianRupee, Layers, Brain, Paintbrush, Lightbulb, Headphones,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description: "No hidden costs. Competitive rates for startups and enterprises alike.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Modular code and cloud-ready infrastructure that grows with your business.",
  },
  {
    icon: Brain,
    title: "AI Where It Matters",
    description: "AI integrated where it adds real value — chatbots, RAG systems, automation — not just buzzwords.",
  },
  {
    icon: Paintbrush,
    title: "Modern UI/UX",
    description: "Clean, responsive interfaces built with React and Tailwind. Designed to convert.",
  },
  {
    icon: Lightbulb,
    title: "Business-First Thinking",
    description: "Every feature maps to a real problem. Your investment delivers measurable returns.",
  },
  {
    icon: Headphones,
    title: "Post-Launch Support",
    description: "Maintenance, monitoring, and updates after deployment. Your project stays healthy.",
  },
];

export function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className="relative overflow-hidden bg-white py-12 lg:py-16"
      aria-label="Why choose YesBe — Affordable pricing, scalable architecture, AI-first solutions"
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
            Why Choose YesBe
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Why Work With{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">YesBe?</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group card-glass rounded-[20px] p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/[0.06] transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:rotate-3">
                <reason.icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="mb-2 text-[17px] font-bold text-foreground">{reason.title}</h3>
              <p className="text-[14px] leading-relaxed text-muted-foreground">{reason.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
