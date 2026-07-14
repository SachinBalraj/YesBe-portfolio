import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations";

const stats = [
  { value: "10+", label: "Years Experience" },
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
      aria-label="About Sachin Balraj — AI Engineer, Solution Architect, Full Stack Developer, and Business Technology Consultant in Salem, Tamil Nadu, India"
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
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5F0FF] bg-[#eff6ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#2563eb]">
                About Me
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="mb-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl"
            >
              Who is Sachin Balraj?
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-4 text-[15px] leading-relaxed text-[#64748B]">
              <p>
                Sachin Balraj is an AI Engineer, Full Stack Developer, Solution Architect, and Business Technology Consultant based in Salem, Tamil Nadu, India. He specializes in building AI-powered software, enterprise resource planning (ERP) systems, Power BI dashboards, modern web applications, and business automation tools for startups, SMEs, and large enterprises.
              </p>
              <p>
                With over 10 years of experience in enterprise software development, Sachin has delivered 50+ projects across education, healthcare, retail, restaurants, manufacturing, and finance. His technical expertise spans React, Node.js, Python, MongoDB, PostgreSQL, AWS, Docker, OpenAI, LangChain, Power BI, and modern cloud infrastructure.
              </p>
              <p>
                Sachin's mission is to help businesses in Salem, Tamil Nadu, and worldwide automate operations, reduce manual work, improve reporting, and scale using AI and modern technology. He works directly with business owners, CTOs, and startup founders — providing end-to-end solutions from requirements gathering and architecture design to development, deployment, and ongoing support.
              </p>
              <p>
                Every solution Sachin builds is designed to solve a specific business problem. Whether it's a school that needs an ERP system, a restaurant that needs AI-powered ordering, or a corporate company that needs real-time analytics dashboards — the focus is always on delivering measurable business results, not just writing code.
              </p>
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
                className="inline-flex items-center gap-2 rounded-xl border border-[#E5F0FF] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all duration-200 hover:border-[#bfdbfe] hover:shadow-md"
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
                  className="rounded-[20px] border border-[#E5F0FF] bg-white p-6 text-center"
                  style={{ boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 4px 16px rgba(37,99,235,0.03)" }}
                >
                  <div className="text-3xl font-extrabold text-[#2563eb]">{stat.value}</div>
                  <div className="mt-1 text-sm font-medium text-[#64748B]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[20px] border border-[#E5F0FF] bg-gradient-to-br from-[#f8fbff] to-[#eff6ff] p-6">
              <h3 className="mb-3 text-sm font-bold text-[#0F172A]">Core Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {specializations.map((s) => (
                  <span key={s} className="rounded-full bg-white border border-[#E5F0FF] px-3 py-1 text-xs font-medium text-[#2563eb]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[20px] border border-[#E5F0FF] bg-white p-5">
              <h3 className="mb-2 text-sm font-bold text-[#0F172A]">Business Focus</h3>
              <p className="text-[13px] leading-relaxed text-[#64748B]">
                Education ERP, Hospital Management, Restaurant AI Ordering, Retail E-commerce, Corporate Analytics Dashboards, Startup MVP Development, and Enterprise Digital Transformation — serving clients in Salem, Tamil Nadu, India and worldwide.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
