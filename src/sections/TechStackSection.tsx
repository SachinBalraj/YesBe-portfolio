import { motion } from "framer-motion";

interface TechGroup {
  category: string;
  items: string[];
}

const techGroups: TechGroup[] = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "HTML5/CSS3"] },
  { category: "Backend", items: ["Node.js", "Express.js", "Python", "FastAPI", "Django", "REST APIs"] },
  { category: "Database", items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis"] },
  { category: "Cloud & DevOps", items: ["AWS", "Azure", "Docker", "CI/CD", "Linux", "Nginx"] },
  { category: "AI & ML", items: ["OpenAI API", "LangChain", "RAG Systems", "LLM Integration", "NLP", "Computer Vision"] },
  { category: "Analytics & BI", items: ["Power BI", "DAX", "SQL Analytics", "Python (Pandas)", "Data Visualization"] },
  { category: "ERP & Business", items: ["Custom ERP", "School ERP", "Hospital ERP", "Inventory Systems", "Billing Software"] },
  { category: "Marketing & SEO", items: ["Technical SEO", "GEO", "AEO", "Google Analytics", "Social Media", "Email Marketing"] },
];

export function TechStackSection() {
  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden bg-gradient-to-b from-[#f8fbff] to-white py-24 lg:py-28"
      aria-label="Technology stack — React, Node.js, Python, MongoDB, AWS, Power BI, OpenAI, and more"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Technology Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Technologies I{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Work With</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
          >
            Modern tools chosen for performance, scalability, and maintainability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-[20px] border border-white/40 bg-white p-5"
              style={{ boxShadow: "0 1px 3px rgba(37,99,235,0.03)" }}
            >
              <h3 className="mb-3 text-sm font-bold text-primary">{group.category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-primary/[0.06] px-3 py-1 text-[12px] font-medium text-foreground border border-white/40"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
