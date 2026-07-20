import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is YesBe?",
    answer:
      "YesBe builds AI tools, ERP systems, Power BI dashboards, websites, and automation for startups, SMEs, and enterprises worldwide.",
  },
  {
    question: "What services does YesBe provide?",
    answer:
      "AI solutions, website development, ERP, Power BI dashboards, cloud & DevOps, SEO/GEO/AEO, database management, business automation, digital marketing, and tech consulting.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "Education, healthcare, retail, restaurants, manufacturing, finance, construction, logistics, real estate, startups, SMEs, and enterprises. Each gets a solution built for its specific workflows.",
  },
  {
    question: "Can you build ERP software?",
    answer:
      "Yes. School ERP, hospital ERP, inventory management, billing systems, and enterprise resource planning — each built for your specific business processes.",
  },
  {
    question: "How much does a business website cost?",
    answer:
      "Starting from ₹4,999 for landing pages up to ₹2,50,000+ for custom web apps. Pricing depends on features, integrations, and complexity. A detailed proposal is shared after understanding your project.",
  },
  {
    question: "What is RAG implementation?",
    answer:
      "RAG connects AI models to your business data — documents, policies, knowledge base — so the AI gives accurate, context-aware answers. Used for support bots, knowledge assistants, and document analysis.",
  },
  {
    question: "Can you develop AI chatbots?",
    answer:
      "Yes. Built with OpenAI, LangChain, and custom RAG pipelines. They handle support, lead qualification, internal queries, and product recommendations — trained on your business data.",
  },
  {
    question: "Do you provide Power BI dashboards?",
    answer:
      "Yes. Dashboards that consolidate multiple data sources into real-time, interactive reports — executive views, KPI tracking, automated reports, and anomaly detection.",
  },
  {
    question: "Do you build custom software?",
    answer:
      "Yes. Admin panels, internal tools, SaaS apps, business portals, and industry-specific solutions — built with React, Node.js, and Python for performance and maintainability.",
  },
  {
    question: "Can you automate business workflows?",
    answer:
      "Yes. Workflow automation, API integration, CRM setup, automated notifications, data sync, and AI-powered process optimization. The goal: eliminate repetitive manual tasks.",
  },
  {
    question: "Do you provide cloud deployment?",
    answer:
      "Yes. AWS and Azure deployment, Docker containerization, CI/CD pipelines, server configuration, SSL, and performance optimization — all with security and monitoring in mind.",
  },
  {
    question: "Do you optimize websites for SEO?",
    answer:
      "Yes. Technical SEO audits, on-page optimization, keyword research, content strategy, and performance improvements — combined with GEO and AEO for maximum visibility.",
  },
  {
    question: "What is GEO optimization?",
    answer:
      "GEO optimizes your website so AI search engines like ChatGPT, Gemini, and Perplexity recommend your business when users ask relevant questions.",
  },
  {
    question: "What is AEO optimization?",
    answer:
      "AEO structures your content to provide direct answers that appear in Google Featured Snippets, voice assistant responses, and AI summaries.",
  },
  {
    question: "Can you integrate AI into existing software?",
    answer:
      "Yes. Chatbots on websites, recommendation engines, AI-powered search, automated data processing, or natural language interfaces — integrated via APIs without rewriting the system.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Yes. MVP development, rapid prototyping, scalable architecture, and go-to-market strategy. Focus on building lean products quickly and iterating on real user feedback.",
  },
  {
    question: "Do you work with enterprises?",
    answer:
      "Yes. Large-scale ERP, custom software, cloud infrastructure, AI integration, BI dashboards, and ongoing consulting — delivered with documentation and milestone-based delivery.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "React, TypeScript, Tailwind CSS, Node.js, Python, FastAPI, MongoDB, PostgreSQL, MySQL, AWS, Azure, Docker, OpenAI, LangChain, RAG, Power BI, DAX, SEO, GEO, AEO.",
  },
  {
    question: "How can I contact you?",
    answer:
      "Email sachinbalraj01@gmail.com, call +91 9087795970, WhatsApp, LinkedIn, or use the form on this website. A proposal is typically shared within 24 hours.",
  },
  {
    question: "How long does development take?",
    answer:
      "Landing page: 3–5 days. Business website: 1–3 weeks. Web app: 2–8 weeks. ERP: 4–12 weeks. AI solutions: 2–6 weeks. A timeline with milestones is provided after discovery.",
  },
];

export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-24 lg:py-28"
      aria-label="Frequently Asked Questions — Services, pricing, technologies, and development process"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-[#dbeafe] opacity-[0.10] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
            FAQ
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
              Questions
            </span>
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
            Common questions about services, pricing, and the development process.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-[24px] border border-white/40 bg-white"
          style={{
            boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 8px 32px rgba(37,99,235,0.03)",
          }}
          role="list"
        >
          <div className="px-6 sm:px-8">
            {faqData.map((item, i) => (
              <FAQAccordion key={item.question} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.4) }}
      className="border-b border-white/40 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-semibold text-foreground transition-colors hover:text-primary">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
