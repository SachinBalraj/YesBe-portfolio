import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Download,
  Sparkles,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import portraitImg from "@/assets/images/sachin.png";
import { SITE_CONFIG } from "@/constants";
import {
  fadeInUp,
  staggerContainer,
} from "@/animations";

const trustIndicators = [
  { icon: Zap, label: "AI-Powered" },
  { icon: Shield, label: "Enterprise-Grade" },
  { icon: Globe, label: "Global Delivery" },
];

export function PremiumHero() {
  return (
    <section
      id="hero"
      aria-label="Hero — YesBe, AI, ERP & Business Solutions"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-hero-glow" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[15%] h-[500px] w-[500px] rounded-full bg-primary/[0.05] blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -25, 20, 0],
          y: [0, 15, -25, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[15%] left-[10%] h-[400px] w-[400px] rounded-full bg-secondary/[0.06] blur-[100px]"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/[0.06]"
            style={{
              width: 4 + i * 2,
              height: 4 + i * 2,
              left: `${8 + i * 8}%`,
              top: `${12 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 6 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-[120px] pb-24 lg:pt-[140px] lg:pb-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-8 items-center">
          {/* ── Left Content ── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-xl"
          >
            <motion.div variants={fadeInUp}>
              <div className="lg:hidden inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                AI &bull; ERP &bull; Web Development &bull; Business Solutions
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-[64px] font-bold tracking-tight leading-[1.06]"
            >
              Build Smarter{" "}
              <span className="text-gradient">Digital Solutions</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-lg"
            >
              AI tools, ERP systems, Power BI dashboards, and modern web apps — built for startups, SMEs, and enterprises. Strategy to deployment, one team.
            </motion.p>

            {/* Trust indicators */}
            <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-4">
              {trustIndicators.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/[0.06]">
                    <item.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="relative z-10 inline-flex items-center gap-2 rounded-xl btn-premium px-6 py-3.5 text-sm font-semibold text-white"
              >
                Contact YesBe
                <ArrowRight className="h-4 w-4 shrink-0" />
              </a>
              <a
                href={SITE_CONFIG.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl btn-glass px-6 py-3.5 text-sm font-semibold text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-green-500" />
                Get a Free Quote
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl btn-glass px-6 py-3.5 text-sm font-semibold text-foreground"
              >
                <Download className="h-4 w-4 text-primary" />
                Book Consultation
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right — Portrait Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="h-80 w-80 rounded-full bg-primary/[0.08] blur-[80px]"
              />
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/60 p-3 backdrop-blur-xl"
                style={{
                  boxShadow: "0 8px 40px rgba(37,99,235,0.10), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                {/* Image */}
                <img
                  src={portraitImg}
                  alt="Sachin Balraj — Founder & Chief Solution Architect of YesBe"
                  width={420}
                  height={420}
                  fetchPriority="high"
                  decoding="async"
                  className="h-64 w-64 sm:h-80 sm:w-80 lg:h-[400px] lg:w-[400px] rounded-[24px] object-cover object-top"
                />

                {/* ── Top-right badge: Available for Projects ── */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-6 right-6"
                >
                  <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-3.5 py-1.5 shadow-lg backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <span className="text-[11px] font-semibold text-foreground">
                      Available for Projects
                    </span>
                  </div>
                </motion.div>

                {/* ── Bottom-left badge: Name & Titles ── */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute bottom-6 left-6"
                >
                  <div className="rounded-2xl border border-white/40 bg-white/70 px-5 py-3 shadow-lg backdrop-blur-md">
                    <p className="text-sm font-bold text-foreground leading-tight">Sachin Balraj</p>
                    <p className="text-[11px] font-medium text-primary leading-snug">Founder &amp; Chief Solution Architect</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
