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
    title: "Affordable Pricing",
    description: "Premium quality solutions at competitive rates. Transparent pricing with no hidden costs — designed to fit startup and enterprise budgets alike.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Every solution is built to grow with your business. Modular code, clean architecture, and cloud-ready infrastructure ensure long-term scalability.",
  },
  {
    icon: Brain,
    title: "AI-First Solutions",
    description: "From chatbots to RAG systems, AI is integrated into every project where it adds real business value — not as a buzzword, but as a practical tool.",
  },
  {
    icon: Paintbrush,
    title: "Modern UI/UX",
    description: "Clean, responsive, and accessible interfaces built with React, Tailwind CSS, and Framer Motion. Designed to build trust and drive conversions.",
  },
  {
    icon: Lightbulb,
    title: "Business Understanding",
    description: "Technology decisions are driven by business goals. Every feature is mapped to a real problem — ensuring your investment delivers measurable ROI.",
  },
  {
    icon: Headphones,
    title: "Post-Launch Support",
    description: "Ongoing maintenance, performance monitoring, feature updates, and technical support after deployment. Your project stays healthy long after launch.",
  },
];

export function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className="relative overflow-hidden bg-white py-24 lg:py-28"
      aria-label="Why choose Sachin Balraj — Affordable pricing, scalable architecture, AI-first solutions"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5F0FF] bg-[#eff6ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#2563eb]"
          >
            Why Choose Me
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl"
          >
            Why Work With{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Sachin Balraj?</span>
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
              className="rounded-[20px] border border-[#E5F0FF] bg-white p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 1px 3px rgba(37,99,235,0.03), 0 4px 16px rgba(37,99,235,0.02)" }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff6ff]">
                <reason.icon className="h-5 w-5 text-[#2563eb]" strokeWidth={1.8} />
              </div>
              <h3 className="mb-2 text-[17px] font-bold text-[#0F172A]">{reason.title}</h3>
              <p className="text-[14px] leading-relaxed text-[#64748B]">{reason.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
