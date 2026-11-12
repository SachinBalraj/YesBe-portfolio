import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

interface Guide {
  title: string;
  summary: string;
  content: string;
}

const guides: Guide[] = [
  {
    title: "What is ERP and why does your business need it?",
    summary: "ERP connects your core business processes — inventory, billing, HR, accounting — in one system.",
    content: "ERP software connects departments like sales, finance, inventory, and HR into a single platform. Instead of using separate spreadsheets or tools, everything is centralized. For schools, ERP manages student records and fees. For hospitals, it handles patient data and pharmacy. For retail, it tracks inventory and sales. Custom ERP solutions are built specifically for your business workflows, unlike generic off-the-shelf software.",
  },
  {
    title: "What is RAG implementation?",
    summary: "RAG combines AI language models with your own data to create accurate, context-aware assistants.",
    content: "Traditional AI chatbots give generic answers. RAG systems connect AI models like GPT to your company's documents, policies, and knowledge base. When a user asks a question, the system retrieves relevant information from your data first, then generates an accurate answer. Use cases include customer support bots, internal knowledge assistants, and research tools. RAG ensures AI answers are grounded in your actual business data.",
  },
  {
    title: "Why Power BI for business analytics?",
    summary: "Power BI turns raw data into interactive dashboards and visual insights.",
    content: "Most businesses have data spread across Excel sheets, databases, and third-party tools. Power BI connects all these sources into a single dashboard. You can see real-time sales, track KPIs, monitor inventory, and generate automated reports. Unlike spreadsheets, Power BI updates automatically and lets you drill down into details. Dashboards can be shared across teams and accessed on mobile devices.",
  },
  {
    title: "Benefits of AI automation for businesses",
    summary: "AI automation replaces repetitive tasks with systems that work 24/7 — reducing costs and errors.",
    content: "AI automation handles tasks like data entry, email responses, invoice processing, inventory reordering, and customer support. Unlike manual work, AI runs continuously without errors or fatigue. An AI chatbot handles hundreds of queries simultaneously. An AI inventory tool predicts demand and reorders stock before it runs out. The benefits: lower costs, faster processing, fewer errors, and the ability to scale without hiring more staff.",
  },
  {
    title: "SEO vs GEO vs AEO — what's the difference?",
    summary: "SEO optimizes for Google, GEO for AI search engines, and AEO for direct answers and voice search.",
    content: "SEO is about ranking higher on Google through keywords, backlinks, and technical optimization. GEO optimizes your content so AI chatbots like ChatGPT and Perplexity recommend your business. AEO structures your content to appear in featured snippets and voice assistants. All three work together: SEO drives organic traffic, GEO gets you recommended by AI, and AEO captures voice search positions.",
  },
];

function GuideAccordion({ guide, index }: { guide: Guide; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
        id={`guide-trigger-${index}`}
        aria-controls={`guide-panel-${index}`}
      >
        <span className="text-[15px] font-semibold text-navy transition-colors hover:text-primary">
          {guide.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`guide-panel-${index}`}
            role="region"
            aria-labelledby={`guide-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-2 text-[13.5px] font-medium leading-relaxed text-primary">
              {guide.summary}
            </p>
            <p className="pb-5 text-[13.5px] leading-relaxed text-muted-foreground">
              {guide.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MiniGuidesSection() {
  return (
    <section
      id="guides"
      className="border-y border-border/70 bg-slate-50 py-16 sm:py-20 lg:py-24"
      aria-label="Technology guides"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">
          <div>
            <SectionHeading
              title="Technology, explained"
              description="Plain-language explainers on the technology that powers modern businesses."
            />
            <Link
              to="/insights"
              className="mt-6 inline-flex items-center gap-2 py-1 text-[14px] font-semibold text-primary hover:text-[#1d4ed8]"
            >
              Read all insights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="border-t border-border">
            {guides.map((guide, i) => (
              <GuideAccordion key={guide.title} guide={guide} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
