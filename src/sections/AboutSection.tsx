import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import logoImg from "@/assets/images/YBlogo.png";
import founderImage from "@/assets/images/founder-portrait.jpeg";

const focusAreas = [
  { value: "Consulting", label: "IT strategy, requirements and solution architecture" },
  { value: "Engineering", label: "Web apps, ERP systems, APIs and integrations" },
  { value: "AI & Automation", label: "RAG systems, chatbots and workflow automation" },
  { value: "Data & Analytics", label: "Dashboards, reporting and decision support" },
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
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-label="About YESBE Technologies — IT consulting, custom software development, AI and automation, and data analytics"
    >
      <div className="absolute inset-0 pointer-events-none">
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
              className="relative inline-block"
              aria-label="YESBE Technologies Company Logo — Go to homepage"
            >
              <div className="border border-border bg-white p-4 sm:p-6">
                <picture>
                  <source srcSet="/YBlogo.webp" type="image/webp" />
                  <img
                    src={logoImg}
                    alt="YESBE Technologies Company Logo"
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="relative h-[180px] w-[180px] object-contain sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px] lg:h-[320px] lg:w-[320px] xl:h-[360px] xl:w-[360px]"
                  />
                </picture>
              </div>
            </motion.button>

            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-primary"
            >
              <CheckCircle className="h-4 w-4" />
              IT Consulting & Software Development
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.p variants={fadeInUp} className="mb-3 text-[13px] font-semibold text-primary">
              About YESBE
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="mb-5 text-3xl font-bold tracking-[-0.02em] text-navy sm:text-4xl"
            >
              Technology partner for growing businesses
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                YESBE Technologies is an IT consulting and software development company. We design and build custom software, ERP systems, web applications, AI and automation tooling, and analytics dashboards.
              </p>
              <p>
                Our work spans education, healthcare, retail, restaurants, manufacturing and finance. The stack we build with includes React, Node.js, Python, MongoDB, PostgreSQL, AWS, Docker, OpenAI, LangChain, and Power BI.
              </p>
              <p>
                We work directly with business owners, CTOs and founders, from requirements through deployment and ongoing support. The focus is on solving real problems, not just writing code.
              </p>
            </motion.div>

            {/* Founder Card */}
            <motion.section
              variants={fadeInUp}
              aria-labelledby="about-founder-heading"
              className="mt-8 border border-border bg-slate-50 p-6"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <img
                  src={founderImage}
                  alt="Sachin Balraj, Founder of YESBE Technologies"
                  width={120}
                  height={120}
                  loading="lazy"
                  decoding="async"
                  className="h-[110px] w-[110px] rounded-circle object-cover object-center ring-1 ring-primary/10 sm:h-[120px] sm:w-[120px] md:h-[126px] md:w-[126px]"
                />
                <div className="min-w-0 flex-1">
                  <p className="mb-2 text-xs font-bold tracking-wide text-primary">
                    Founder
                  </p>
                  <h3 id="about-founder-heading" className="text-lg font-bold text-foreground">
                    <Link
                      to="/sachin-balraj"
                      className="rounded-sm transition-colors hover:text-primary"
                    >
                      Sachin Balraj
                    </Link>
                  </h3>
                  <p className="text-[13px] text-muted-foreground">
                    Founder, YESBE Technologies
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                    Sachin Balraj is the Founder of YESBE Technologies, leading the
                    company&apos;s technology and digital solution initiatives. He
                    also works as a Solution Architect at Springreen.
                  </p>
                  <Link
                    to="/sachin-balraj"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-all duration-200 hover:gap-2.5"
                  >
                    Read the founder profile
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.section>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
              >
                Discuss Your Project
              </Link>
              <button
                onClick={() => {
                  navigate("/services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-label="View YESBE Services"
                className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
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
              {focusAreas.map((area) => (
                <div
                  key={area.value}
                  className="border border-border bg-white p-6 text-center"
                >
                  <div className="text-xl font-extrabold text-primary">{area.value}</div>
                  <div className="mt-1.5 text-sm font-medium text-muted-foreground">{area.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="border border-border bg-slate-50 p-6">
              <h3 className="mb-3 text-sm font-bold text-foreground">Core Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {specializations.map((s) => (
                  <span key={s} className="rounded-none bg-white border border-border px-3 py-1 text-xs font-medium text-primary">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 border border-border bg-white p-5">
              <h3 className="mb-2 text-sm font-bold text-foreground">Business Focus</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                Education ERP, hospital management, restaurant ordering, retail e-commerce, corporate analytics dashboards, MVP development, and digital transformation — for businesses across India and beyond.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
