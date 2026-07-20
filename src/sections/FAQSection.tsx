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
      "YesBe is a technology solutions company specializing in AI-powered software, ERP systems, Power BI dashboards, websites, and business automation tools for startups, SMEs, and enterprises worldwide.",
  },
  {
    question: "What services does YesBe provide?",
    answer:
      "Services include AI & Intelligent Solutions, Full Stack Website Development, ERP Solutions, Power BI & Data Analytics Dashboards, Cloud Deployment & DevOps, SEO/GEO/AEO Optimization, Database Management, Business Automation, Digital Marketing, and Business Technology Consulting.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work across education (schools, colleges), healthcare (hospitals), retail, restaurants, manufacturing, finance, construction, logistics, real estate, startups, SMEs, and large enterprises. Each industry gets a tailored solution built for its specific workflows.",
  },
  {
    question: "Can you build ERP software?",
    answer:
      "Yes. Custom ERP solutions include School Management ERP, Hospital ERP, Inventory Management, Billing Systems, and enterprise resource planning tools. Each ERP is built specifically for the client's business processes rather than forcing them to adapt to generic software.",
  },
  {
    question: "How much does a business website cost?",
    answer:
      "Website development starts from ₹4,999 for landing pages up to ₹2,50,000+ for custom web applications. Pricing depends on features, integrations, timeline, and complexity. A detailed proposal with transparent milestones is shared after understanding the project requirements.",
  },
  {
    question: "What is RAG implementation?",
    answer:
      "RAG (Retrieval-Augmented Generation) connects AI language models to your business data — documents, policies, knowledge base — so the AI provides accurate, context-aware answers. It's used for customer support bots, internal knowledge assistants, and document analysis tools.",
  },
  {
    question: "Can you develop AI chatbots?",
    answer:
      "Yes. AI chatbots are built using OpenAI, LangChain, and custom RAG pipelines. They handle customer support, lead qualification, internal queries, and product recommendations. Each chatbot is trained on your specific business data for accurate, branded responses.",
  },
  {
    question: "Do you provide Power BI dashboards?",
    answer:
      "Yes. Power BI dashboards consolidate data from multiple sources into real-time, interactive reports. Services include executive dashboards, KPI tracking, automated report generation, anomaly detection, and predictive analytics using DAX, SQL, and Python.",
  },
  {
    question: "Do you build custom software?",
    answer:
      "Yes. Custom software includes admin panels, internal tools, SaaS applications, business portals, and industry-specific solutions. Each project is built with modern frameworks (React, Node.js, Python) for performance, scalability, and long-term maintainability.",
  },
  {
    question: "Can you automate business workflows?",
    answer:
      "Yes. Business automation covers workflow automation, API integration, CRM setup, automated notifications, data synchronization, and AI-powered process optimization. The goal is to eliminate repetitive manual tasks and reduce operational costs.",
  },
  {
    question: "Do you provide cloud deployment?",
    answer:
      "Yes. Cloud services include AWS and Azure deployment, Docker containerization, CI/CD pipeline setup, server configuration, SSL setup, and performance optimization. Every solution is deployed with security, scalability, and monitoring in mind.",
  },
  {
    question: "Do you optimize websites for SEO?",
    answer:
      "Yes. SEO services include technical SEO audits, on-page optimization, keyword research, content strategy, Google Business Profile optimization, and performance improvements. SEO is combined with GEO and AEO for maximum visibility across all search platforms.",
  },
  {
    question: "What is GEO optimization?",
    answer:
      "GEO (Generative Engine Optimization) optimizes your website so AI search engines like ChatGPT, Gemini, Perplexity, and Microsoft Copilot recommend your business when users ask relevant questions. It involves structured content, FAQ schemas, and answer-focused copy.",
  },
  {
    question: "What is AEO optimization?",
    answer:
      "AEO (Answer Engine Optimization) structures your content to provide direct, concise answers that appear in Google Featured Snippets, voice assistant responses, and AI summaries. It uses question-based headings, FAQ schemas, and clear factual content.",
  },
  {
    question: "Can you integrate AI into existing software?",
    answer:
      "Yes. AI can be integrated into existing applications — adding chatbots to websites, implementing recommendation engines, building AI-powered search, automating data processing, or adding natural language interfaces to existing tools. The integration is done via APIs without rewriting the entire system.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Yes. Startup services include MVP development, rapid prototyping, scalable architecture design, and go-to-market technology strategy. The focus is on building lean, validated products quickly — helping startups launch, test ideas, and iterate based on real user feedback.",
  },
  {
    question: "Do you work with enterprises?",
    answer:
      "Yes. Enterprise services include large-scale ERP implementations, custom software development, cloud infrastructure setup, AI integration, business intelligence dashboards, and ongoing technical consulting. Projects are delivered with proper documentation, code reviews, and milestone-based delivery.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Frontend: React, TypeScript, Tailwind CSS, Framer Motion. Backend: Node.js, Python, FastAPI. Database: MongoDB, PostgreSQL, MySQL. Cloud: AWS, Azure, Docker. AI: OpenAI, LangChain, RAG. Analytics: Power BI, DAX. Marketing: Technical SEO, GEO, AEO.",
  },
  {
    question: "How can I contact you?",
    answer:
      "Contact us via email at sachinbalraj01@gmail.com, phone at +91 9087795970, WhatsApp, LinkedIn, or the enquiry form on this website. A detailed proposal with transparent pricing is typically shared within 24 hours of the initial discussion.",
  },
  {
    question: "How long does development take?",
    answer:
      "Timeline depends on scope. A landing page takes 3–5 days. A business website takes 1–3 weeks. A custom web application takes 2–8 weeks. ERP systems take 4–12 weeks. AI solutions take 2–6 weeks. A detailed timeline with milestones is provided after the discovery phase.",
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
            Answers to common questions about services, pricing, technologies, and the development process.
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
