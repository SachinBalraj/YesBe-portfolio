import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Download,
  Sparkles,
} from "lucide-react";
import portraitImg from "@/assets/images/sachin.png";
import { SITE_CONFIG } from "@/constants";
import {
  fadeInUp,
  staggerContainer,
} from "@/animations";

export function PremiumHero() {
  return (
    <section
      id="hero"
      aria-label="Hero — Sachin Balraj, AI Engineer and Solution Architect"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute top-20 right-[15%] h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />
      <div className="absolute bottom-20 left-[10%] h-[400px] w-[400px] rounded-full bg-secondary/[0.06] blur-[100px]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/[0.07]"
            style={{
              width: 6 + i * 3,
              height: 6 + i * 3,
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Dotted pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-8 items-center">
          {/* ── Left Content ── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-xl"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                AI Engineer &bull; Solution Architect &bull; Business Consultant
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
            >
              Sachin Balraj — AI Engineer &amp; Solution Architect{" "}
              <span className="text-primary">Building Intelligent Business Solutions</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-lg"
            >
              I am Sachin Balraj, an AI Engineer and Solution Architect based in Salem, Tamil Nadu, India. I build AI-powered software, ERP systems, Power BI dashboards, and modern web applications for startups, SMEs, and enterprises. From strategy to deployment — I help businesses automate operations, reduce costs, and scale with technology.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-card hover:shadow-card-hover hover:border-primary/20 transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4 text-green-500" />
                WhatsApp
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-card hover:shadow-card-hover hover:border-primary/20 transition-all duration-200"
              >
                <Download className="h-4 w-4 text-primary" />
                Download Resume
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
            {/* Blue glow behind card */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="h-80 w-80 rounded-full bg-primary/[0.08] blur-[80px] animate-glow-pulse" />
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 p-3 shadow-[0_8px_40px_rgba(37,99,235,0.10),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl"
                style={{
                  boxShadow: "0 8px 40px rgba(37,99,235,0.10), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                {/* Image */}
                <img
                  src={portraitImg}
                  alt="Sachin Balraj - AI Engineer, Full Stack Developer and Solution Architect"
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
                  <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-3.5 py-1.5 shadow-lg backdrop-blur-md">
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
                  <div className="rounded-2xl border border-white/50 bg-white/80 px-5 py-3 shadow-lg backdrop-blur-md">
                    <p className="text-sm font-bold text-foreground leading-tight">Sachin Balraj</p>
                    <p className="text-[11px] font-medium text-primary leading-snug">AI Engineer</p>
                    <p className="text-[11px] font-medium text-primary/70 leading-snug">Solution Architect</p>
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
