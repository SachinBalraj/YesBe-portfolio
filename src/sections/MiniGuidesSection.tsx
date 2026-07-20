import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";

interface Guide {
  title: string;
  summary: string;
  content: string;
}

const guides: Guide[] = [
  {
    title: "What is ERP and Why Does Your Business Need It?",
    summary: "ERP connects your core business processes — inventory, billing, HR, accounting — in one system.",
    content: "ERP software connects departments like sales, finance, inventory, and HR into a single platform. Instead of using separate spreadsheets or tools, everything is centralized. For schools, ERP manages student records and fees. For hospitals, it handles patient data and pharmacy. For retail, it tracks inventory and sales. Custom ERP solutions are built specifically for your business workflows, unlike generic off-the-shelf software.",
  },
  {
    title: "What is RAG Implementation?",
    summary: "RAG combines AI language models with your own data to create accurate, context-aware assistants.",
    content: "Traditional AI chatbots give generic answers. RAG systems connect AI models like GPT to your company's documents, policies, and knowledge base. When a user asks a question, the system retrieves relevant information from your data first, then generates an accurate answer. Use cases include customer support bots, internal knowledge assistants, and research tools. RAG ensures AI answers are grounded in your actual business data.",
  },
  {
    title: "Why Power BI for Business Analytics?",
    summary: "Power BI turns raw data into interactive dashboards and visual insights.",
    content: "Most businesses have data spread across Excel sheets, databases, and third-party tools. Power BI connects all these sources into a single dashboard. You can see real-time sales, track KPIs, monitor inventory, and generate automated reports. Unlike spreadsheets, Power BI updates automatically and lets you drill down into details. Dashboards can be shared across teams and accessed on mobile devices.",
  },
  {
    title: "Benefits of AI Automation for Businesses",
    summary: "AI automation replaces repetitive tasks with systems that work 24/7 — reducing costs and errors.",
    content: "AI automation handles tasks like data entry, email responses, invoice processing, inventory reordering, and customer support. Unlike manual work, AI runs continuously without errors or fatigue. An AI chatbot handles hundreds of queries simultaneously. An AI inventory tool predicts demand and reorders stock before it runs out. The benefits: lower costs, faster processing, fewer errors, and the ability to scale without hiring more staff.",
  },
  {
    title: "SEO vs GEO vs AEO — What's the Difference?",
    summary: "SEO optimizes for Google, GEO for AI search engines, and AEO for direct answers and voice search.",
    content: "SEO is about ranking higher on Google through keywords, backlinks, and technical optimization. GEO optimizes your content so AI chatbots like ChatGPT and Perplexity recommend your business. AEO structures your content to appear in featured snippets and voice assistants. All three work together: SEO drives organic traffic, GEO gets you recommended by AI, and AEO captures voice search positions.",
  },
];

function GuideAccordion({ guide, index }: { guide: Guide; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-white/40 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-semibold text-foreground transition-colors hover:text-primary">
          {guide.title}
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
            <p className="pb-2 text-[14px] font-medium text-primary leading-relaxed">
              {guide.summary}
            </p>
            <p className="pb-5 text-[14px] leading-relaxed text-muted-foreground">
              {guide.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function MiniGuidesSection() {
  return (
    <section
      id="guides"
      className="relative overflow-hidden bg-white py-24 lg:py-28"
      aria-label="Technology guides — What is ERP, What is RAG, Why Power BI, SEO vs GEO vs AEO"
    >
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Guides
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Technology{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Explained</span>
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
            Plain-language explainers on the tech that powers modern businesses.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-[24px] border border-white/40 bg-white"
          style={{ boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 8px 32px rgba(37,99,235,0.03)" }}
          role="list"
        >
          <div className="px-6 sm:px-8">
            {guides.map((guide, i) => (
              <GuideAccordion key={guide.title} guide={guide} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
