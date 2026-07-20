import { motion } from "framer-motion";
import {
  Brain, Globe, Boxes, BarChart3, Database, TrendingUp,
  Megaphone, Cloud, Workflow, Smartphone, Shield, Briefcase,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Card variant definitions — each card is unique ─── */

interface Accent {
  gradient: string;     // icon container gradient
  pillBg: string;       // feature pill background
  pillText: string;     // feature pill text color
  corner: string;       // subtle corner decoration color
  glow: string;         // hover glow color
}

const ACCENTS: Record<string, Accent> = {
  violet: {
    gradient: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
    pillBg: "#f5f3ff",
    pillText: "#7c3aed",
    corner: "#ede9fe",
    glow: "rgba(139, 92, 246, 0.12)",
  },
  blue: {
    gradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    pillBg: "#eff6ff",
    pillText: "#2563eb",
    corner: "#dbeafe",
    glow: "rgba(37, 99, 235, 0.12)",
  },
  amber: {
    gradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    pillBg: "#fffbeb",
    pillText: "#d97706",
    corner: "#fef3c7",
    glow: "rgba(245, 158, 11, 0.12)",
  },
  yellow: {
    gradient: "linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)",
    pillBg: "#fefce8",
    pillText: "#ca8a04",
    corner: "#fef9c3",
    glow: "rgba(202, 138, 4, 0.12)",
  },
  emerald: {
    gradient: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    pillBg: "#ecfdf5",
    pillText: "#059669",
    corner: "#d1fae5",
    glow: "rgba(5, 150, 105, 0.12)",
  },
  cyan: {
    gradient: "linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)",
    pillBg: "#ecfeff",
    pillText: "#0891b2",
    corner: "#cffafe",
    glow: "rgba(8, 145, 178, 0.12)",
  },
  rose: {
    gradient: "linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)",
    pillBg: "#fff1f2",
    pillText: "#e11d48",
    corner: "#ffe4e6",
    glow: "rgba(225, 29, 72, 0.12)",
  },
  sky: {
    gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
    pillBg: "#f0f9ff",
    pillText: "#0284c7",
    corner: "#e0f2fe",
    glow: "rgba(2, 132, 199, 0.12)",
  },
  orange: {
    gradient: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)",
    pillBg: "#fff7ed",
    pillText: "#ea580c",
    corner: "#ffedd5",
    glow: "rgba(234, 88, 12, 0.12)",
  },
  indigo: {
    gradient: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
    pillBg: "#eef2ff",
    pillText: "#4f46e5",
    corner: "#e0e7ff",
    glow: "rgba(79, 70, 229, 0.12)",
  },
  red: {
    gradient: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
    pillBg: "#fef2f2",
    pillText: "#dc2626",
    corner: "#fee2e2",
    glow: "rgba(220, 38, 38, 0.12)",
  },
  teal: {
    gradient: "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
    pillBg: "#f0fdfa",
    pillText: "#0d9488",
    corner: "#ccfbf1",
    glow: "rgba(13, 148, 136, 0.12)",
  },
};

/* ─── Card layout variants ─── */
type LayoutStyle = "standard" | "wide" | "tall" | "compact";

interface Solution {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  features: string[];
  layout: LayoutStyle;
}

const solutions: Solution[] = [
  {
    title: "AI Solutions",
    description: "Custom AI tools that automate decisions and surface insights from your data.",
    icon: Brain,
    accent: "violet",
    features: ["AI Chatbots", "RAG Systems", "LLM Integration", "AI Automation"],
    layout: "standard",
  },
  {
    title: "Website Development",
    description: "Fast, responsive websites built to convert visitors into customers.",
    icon: Globe,
    accent: "blue",
    features: ["Business Websites", "Corporate Portals", "E-commerce", "Landing Pages"],
    layout: "wide",
  },
  {
    title: "ERP Solutions",
    description: "Enterprise resource planning tailored to how your business actually works.",
    icon: Boxes,
    accent: "amber",
    features: ["School ERP", "Hospital ERP", "Inventory Mgmt", "Billing System"],
    layout: "standard",
  },
  {
    title: "Data Analytics & BI",
    description: "Turn raw data into dashboards and KPIs your team can act on.",
    icon: BarChart3,
    accent: "yellow",
    features: ["Power BI", "Dashboards", "KPI Reports", "Data Visualization"],
    layout: "tall",
  },
  {
    title: "Database Management",
    description: "Database design, optimization, and maintenance that scales with you.",
    icon: Database,
    accent: "emerald",
    features: ["MongoDB", "MySQL", "PostgreSQL", "Query Optimization"],
    layout: "compact",
  },
  {
    title: "SEO & Search",
    description: "Grow organic traffic through technical SEO, GEO, and AEO strategies.",
    icon: TrendingUp,
    accent: "cyan",
    features: ["Technical SEO", "GEO", "AEO", "Google Business Profile"],
    layout: "standard",
  },
  {
    title: "Digital Marketing",
    description: "Marketing campaigns that generate qualified leads and real revenue.",
    icon: Megaphone,
    accent: "rose",
    features: ["Social Media", "Lead Generation", "Email Campaigns", "Performance Ads"],
    layout: "wide",
  },
  {
    title: "Cloud & DevOps",
    description: "Cloud infrastructure and deployment pipelines that just work.",
    icon: Cloud,
    accent: "sky",
    features: ["AWS", "Azure", "Docker", "CI/CD Pipelines"],
    layout: "standard",
  },
  {
    title: "Business Automation",
    description: "Cut manual work with automated workflows and integrations.",
    icon: Workflow,
    accent: "orange",
    features: ["Workflow Automation", "API Integration", "CRM Setup", "Notifications"],
    layout: "tall",
  },
  {
    title: "Custom Software",
    description: "Applications built around your specific business processes.",
    icon: Smartphone,
    accent: "indigo",
    features: ["Admin Panels", "Internal Tools", "SaaS Apps", "Business Portals"],
    layout: "compact",
  },
  {
    title: "Cybersecurity",
    description: "Protect your data and systems with proper security practices.",
    icon: Shield,
    accent: "red",
    features: ["SSL & Encryption", "Security Audit", "Backup Systems", "Auth Controls"],
    layout: "standard",
  },
  {
    title: "Business Consulting",
    description: "Technology advisory that ties IT decisions to business outcomes.",
    icon: Briefcase,
    accent: "teal",
    features: ["Solution Architecture", "Tech Planning", "Digital Transform", "IT Advisory"],
    layout: "standard",
  },
];

/* ─── Card component ─── */

function SolutionCard({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  const a = ACCENTS[solution.accent];
  const Icon = solution.icon;

  // Subtle masonry offsets: each row gets slightly different top padding
  const masonryOffsets = [0, 8, 4, 12, 6, 2, 10, 0, 8, 4, 12, 6];
  const mTop = masonryOffsets[index] ?? 0;

  // Unique corner decoration per card — position cycles through 4 corners
  const cornerPositions = [
    "top-0 right-0 rounded-bl-[40px]",
    "bottom-0 left-0 rounded-tr-[40px]",
    "top-0 left-0 rounded-br-[40px]",
    "bottom-0 right-0 rounded-tl-[40px]",
  ];
  const cornerPos = cornerPositions[index % 4];

  // Unique decorative shapes per card
  const decorations = [
    "absolute -top-3 -right-3 h-16 w-16 rounded-full opacity-[0.06]",
    "absolute -bottom-4 -left-4 h-20 w-20 rounded-full opacity-[0.05]",
    "absolute top-6 -right-2 h-10 w-10 rounded-full opacity-[0.07]",
    "absolute -top-2 left-8 h-12 w-12 rounded-full opacity-[0.05]",
  ];
  const decoClass = decorations[index % 4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      style={{ marginTop: mTop }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -12 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative h-full overflow-hidden rounded-[28px] border border-white/40 bg-white/60 p-8 backdrop-blur-sm transition-all duration-[400ms] ease-out"
        style={{
          boxShadow: "0 1px 2px rgba(0,0,0,0.02), 0 4px 16px rgba(37,99,235,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.boxShadow = "0 12px 40px rgba(37,99,235,0.12), 0 24px 64px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,0.8)";
          el.style.borderColor = "rgba(37,99,235,0.2)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.boxShadow = "0 1px 2px rgba(0,0,0,0.02), 0 4px 16px rgba(37,99,235,0.04), inset 0 1px 0 rgba(255,255,255,0.6)";
          el.style.borderColor = "rgba(255,255,255,0.4)";
        }}
      >
        {/* Corner decoration */}
        <div
          className={`absolute ${cornerPos} h-24 w-24 opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.08]`}
          style={{ background: a.gradient }}
        />

        {/* Floating decorative circle */}
        <div
          className={`${decoClass} transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.10]`}
          style={{ background: a.glow }}
        />

        {/* Icon */}
        <div className="relative mb-6">
          <motion.div
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: a.gradient }}
            whileHover={{ scale: 1.1, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon className="h-7 w-7" style={{ color: a.pillText }} strokeWidth={1.8} />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-[22px] font-bold leading-tight text-foreground tracking-tight">
          {solution.title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground">
          {solution.description}
        </p>

        {/* Feature pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {solution.features.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: a.pillBg,
                color: a.pillText,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {f}
            </span>
          ))}
        </div>

        {/* Learn More button */}
        <div className="mt-auto">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[14px] font-semibold transition-all duration-300 group/link"
            style={{ color: a.pillText }}
          >
            <span className="group-hover/link:mr-1 transition-all duration-300">Learn More</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main section ─── */

export function SolutionsSection() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-white py-12 lg:py-16" aria-label="Business Solutions — AI, ERP, Web Development, Power BI, Cloud, and Digital Transformation services">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial gradient base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#eaf6ff_0%,transparent_60%)]" />
        {/* Floating blur circles */}
        <div className="absolute top-[10%] left-[15%] h-[400px] w-[400px] rounded-full bg-[#dbeafe] opacity-[0.15] blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] h-[350px] w-[350px] rounded-full bg-[#ede9fe] opacity-[0.12] blur-[100px]" />
        <div className="absolute bottom-[10%] left-[40%] h-[300px] w-[300px] rounded-full bg-[#cffafe] opacity-[0.10] blur-[100px]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle, #2563eb 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 text-center lg:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
            What We Offer
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[56px]"
          >
            <span className="bg-gradient-to-r from-[#0f172a] via-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
              Business Solutions
            </span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Helping businesses automate, optimize, and scale using modern technology.
          </motion.p>
        </div>

        {/* Cards grid — 4 columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, i) => (
            <SolutionCard key={solution.title} solution={solution} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
