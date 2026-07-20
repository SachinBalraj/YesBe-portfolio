import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code, Briefcase, Rocket, Target,
  Globe, Bot, Database, Cloud, BarChart3, TrendingUp,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─────────────── Animated Counter ─────────────── */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

/* ─────────────── Progress Ring ─────────────── */

function ProgressRing({ percent, size = 72, stroke = 5 }: { percent: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-foreground text-[13px] font-bold"
        style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
      >
        {percent}%
      </text>
    </svg>
  );
}

/* ─────────────── Data ─────────────── */

const stats = [
  { value: 20, suffix: "+", label: "Technologies", sub: "I work with", Icon: Code },
  { value: 15, suffix: "+", label: "Projects Completed", sub: "Successfully Delivered", Icon: Briefcase },
  { value: 8, suffix: "+", label: "Business Solutions", sub: "Built for Clients", Icon: Rocket },
  { value: 100, suffix: "%", label: "Client Focused", sub: "Quality & Satisfaction", Icon: Target },
];

interface SkillCard {
  title: string;
  icon: LucideIcon;
  description: string;
  percent: number;
  chips: string[];
  span?: string;
}

const skills: SkillCard[] = [
  {
    title: "Full Stack Development",
    icon: Globe,
    description: "End-to-end web apps with modern frontend and backend tech.",
    percent: 95,
    chips: ["React", "Next.js", "Node.js", "Express.js", "TypeScript"],
    span: "sm:col-span-2 lg:col-span-1",
  },
  {
    title: "AI Engineering",
    icon: Bot,
    description: "AI-powered tools, chatbots, RAG systems, and intelligent automation.",
    percent: 90,
    chips: ["Python", "OpenAI", "LangChain", "RAG", "AI Agents"],
  },
  {
    title: "Database Management",
    icon: Database,
    description: "Scalable database design for high-performance applications.",
    percent: 92,
    chips: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    description: "Cloud deployment and CI/CD pipelines that scale.",
    percent: 88,
    chips: ["AWS", "Docker", "GitHub", "CI/CD", "Vercel"],
  },
  {
    title: "Data Analytics & Power BI",
    icon: BarChart3,
    description: "Dashboards and reports that turn data into decisions.",
    percent: 87,
    chips: ["Power BI", "Excel", "SQL", "Data Modeling", "ETL"],
  },
  {
    title: "SEO \u00B7 GEO \u00B7 AEO & Growth",
    icon: TrendingUp,
    description: "Search optimization strategies that drive organic visibility.",
    percent: 85,
    chips: ["SEO", "GEO", "AEO", "Analytics", "Marketing"],
  },
];

const allChips = [
  "React", "TypeScript", "Node.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL",
  "Python", "Power BI", "OpenAI", "LangChain", "RAG", "Docker", "AWS", "GitHub",
  "Tailwind CSS", "Vite", "REST API", "JWT", "Firebase", "Redis",
];

const marqueeItems = [
  "React", "Node.js", "MongoDB", "Python", "Power BI", "AWS", "Docker",
  "OpenAI", "LangChain", "SEO", "GEO", "AEO", "Express.js", "GitHub",
  "Tailwind", "Vite",
];

/* ─────────────── Sub-components ─────────────── */

const cardBase =
  "relative flex flex-col rounded-[20px] border border-white/40 bg-white/80 backdrop-blur-sm p-6 transition-all duration-350 ease-out cursor-default";

const cardShadow = {
  boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 4px 16px rgba(37,99,235,0.03)",
};

function StatCard({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const { Icon } = stat;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="glass-card relative flex flex-col items-center rounded-[20px] border border-white/40 bg-white/70 p-6 text-center backdrop-blur-sm"
      style={{ ...cardShadow, transition: "box-shadow 0.35s ease, border-color 0.35s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.12), 0 16px 48px rgba(37,99,235,0.06)";
        e.currentTarget.style.borderColor = "rgba(37,99,235,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = cardShadow.boxShadow;
        e.currentTarget.style.borderColor = "#E5F0FF";
      }}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dbeafe] to-[#eff6ff]">
        <Icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
      </div>
      <div className="text-3xl font-extrabold text-foreground">
        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{stat.label}</div>
      <div className="text-[12px] text-muted-foreground">{stat.sub}</div>
    </motion.div>
  );
}

function SkillBentoCard({ skill, index }: { skill: SkillCard; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-12px) scale(1.03)`;
  }, []);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)";
  }, []);

  const Icon = skill.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)", scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`${cardBase} ${skill.span ?? ""} group`}
      style={{ ...cardShadow, transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,99,235,0.14), 0 24px 64px rgba(37,99,235,0.07)";
        e.currentTarget.style.borderColor = "rgba(37,99,235,0.4)";
      }}
    >
      {/* Icon + Ring row */}
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] transition-transform duration-350 group-hover:rotate-6">
          <Icon className="h-6 w-6 text-primary" strokeWidth={1.8} />
        </div>
        <ProgressRing percent={skill.percent} />
      </div>

      {/* Title + Description */}
      <h3 className="text-lg font-bold text-foreground">{skill.title}</h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{skill.description}</p>

      {/* Chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {skill.chips.map((c) => (
          <span
            key={c}
            className="rounded-full border border-white/40 bg-white px-3 py-1 text-[11px] font-semibold text-primary transition-all duration-200 hover:bg-[#2563eb] hover:text-white hover:-translate-y-0.5"
          >
            {c}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-all duration-200 group/link hover:gap-2.5"
      >
        Explore Skills
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
      </a>
    </motion.div>
  );
}

/* ─────────────── Main Section ─────────────── */

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-white py-12 lg:py-16"
      aria-label="Skills and Technologies — Full stack, AI, databases, cloud, analytics, and digital growth expertise"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#eaf6ff_0%,transparent_60%)]" />
        <div className="absolute top-[8%] left-[5%] h-[400px] w-[400px] rounded-full bg-[#dbeafe] opacity-[0.10] blur-[120px]" />
        <div className="absolute bottom-[15%] right-[8%] h-[350px] w-[350px] rounded-full bg-[#ede9fe] opacity-[0.08] blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#2563eb]/[0.03]"
            style={{ width: 6 + i * 3, height: 6 + i * 3, left: `${12 + i * 16}%`, top: `${18 + (i % 3) * 22}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.12, 0.3, 0.12] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
            Skills &amp; Technologies
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Skills &amp;{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Modern technologies, AI, cloud platforms, and automation — all under one roof.
          </p>
        </motion.div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {skills.map((s, i) => (
            <SkillBentoCard key={s.title} skill={s} index={i} />
          ))}
        </div>

        {/* ── Bottom: Floating Chips ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h3 className="text-xl font-bold text-foreground">Technologies We Work With</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto mb-8"
        >
          {allChips.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              whileHover={{ y: -4, scale: 1.08 }}
              className="rounded-full border border-white/40 bg-white px-4 py-2 text-[13px] font-semibold text-foreground shadow-sm transition-colors duration-200 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white cursor-default"
            >
              {c}
            </motion.span>
          ))}
        </motion.div>

        {/* ── Marquee ── */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="overflow-hidden rounded-2xl border border-white/40 bg-muted py-5">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
                <span key={`${t}-${i}`} className="mx-6 whitespace-nowrap text-[14px] font-semibold text-foreground/60 transition-colors duration-200 hover:text-primary">
                  {t}
                  <span className="ml-6 inline-block h-1 w-1 rounded-full bg-[#2563eb]/20 align-middle" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
