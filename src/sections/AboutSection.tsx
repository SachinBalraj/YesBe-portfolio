import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations";

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
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-24 lg:py-28"
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
          className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* Left — Professional Biography */}
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
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                View Services
              </a>
            </motion.div>
          </div>

          {/* Right — Stats + Specializations */}
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

            <div className="mt-6 rounded-[20px] border border-white/40 bg-gradient-to-br from-[#f8fbff] to-[#eff6ff] p-6">
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
