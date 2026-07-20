import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import logoImg from "@/assets/images/YBlogo.png";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "15+", label: "Technologies Mastered" },
];

const specializations = [
  "AI Solutions", "ERP Systems", "Power BI Dashboards", "Full Stack Web Development",
  "Cloud & DevOps", "Business Automation", "SEO / GEO / AEO", "RAG Implementation",
  "AI Chatbots", "Database Management", "Digital Marketing", "Business Consulting",
];

export function AboutSection() {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-16 lg:py-20"
      aria-label="About YesBe — AI, ERP, Web Development & Business Solutions in Salem, Tamil Nadu, India"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12 items-center"
        >
          {/* Left — Logo + Badge */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center lg:items-start gap-6"
          >
            <motion.button
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group relative inline-block cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-label="YesBe Company Logo — Go to homepage"
            >
              <div className="relative rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(37,99,235,0.08),0_1px_4px_rgba(0,0,0,0.04)] transition-shadow duration-300 group-hover:shadow-[0_8px_40px_rgba(37,99,235,0.14),0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#2563eb]/[0.06] to-[#60a5fa]/[0.04] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                <img
                  src={logoImg}
                  alt="YesBe Company Logo"
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="relative h-[180px] w-[180px] rounded-xl object-contain sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px] lg:h-[320px] lg:w-[320px] xl:h-[360px] xl:w-[360px]"
                />
              </div>
            </motion.button>

            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/10 bg-[#eff6ff] px-4 py-2 text-[13px] font-medium text-[#2563eb]"
            >
              <CheckCircle className="h-4 w-4" />
              Trusted AI & Business Solutions Company
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.div variants={fadeInUp}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                About YesBe
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="mb-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              About YesBe
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                YesBe builds AI tools, ERP systems, Power BI dashboards, web apps, and automation — for startups, SMEs, and enterprises. Based in Salem, Tamil Nadu, serving clients worldwide.
              </p>
              <p>
                Over 10 years of combined experience. 50+ projects delivered across education, healthcare, retail, restaurants, manufacturing, and finance. Our stack: React, Node.js, Python, MongoDB, PostgreSQL, AWS, Docker, OpenAI, LangChain, and Power BI.
              </p>
              <p>
                We work directly with business owners, CTOs, and founders — from requirements to deployment and ongoing support. The focus is always on solving real problems, not just writing code.
              </p>
            </motion.div>

            {/* Founder Card */}
            <motion.div variants={fadeInUp} className="mt-8 rounded-[20px] border border-white/40 bg-gradient-to-br from-[#f8fbff] to-[#eff6ff] p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Founder</p>
              <p className="text-lg font-bold text-foreground">Sachin Balraj</p>
              <p className="text-[13px] text-muted-foreground">Founder &amp; Chief Solution Architect</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb]/90 hover:shadow-md"
              >
                Discuss Your Project
              </a>
              <button
                onClick={() => {
                  navigate("/services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-label="View YesBe Services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                View Services
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats + Specializations Row */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <motion.div variants={fadeInUp}>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[20px] border border-white/40 bg-white p-6 text-center"
                  style={{ boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 4px 16px rgba(37,99,235,0.03)" }}
                >
                  <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="rounded-[20px] border border-white/40 bg-gradient-to-br from-[#f8fbff] to-[#eff6ff] p-6">
              <h3 className="mb-3 text-sm font-bold text-foreground">Core Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {specializations.map((s) => (
                  <span key={s} className="rounded-full bg-white border border-white/40 px-3 py-1 text-xs font-medium text-primary">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[20px] border border-white/40 bg-white p-5">
              <h3 className="mb-2 text-sm font-bold text-foreground">Business Focus</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                Education ERP, Hospital Management, Restaurant AI Ordering, Retail E-commerce, Corporate Analytics Dashboards, Startup MVP Development, and Enterprise Digital Transformation — serving clients in Salem, Tamil Nadu, India and worldwide.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
