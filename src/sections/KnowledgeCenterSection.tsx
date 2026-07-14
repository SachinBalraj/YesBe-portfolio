import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Clock, ArrowRight, Share2, BookOpen, Tag,
  Cpu, Globe, BarChart3, Workflow, Brain, Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/animations";
import { SITE_CONFIG } from "@/constants";

/* ─── Article Data ─── */

interface Article {
  id: string;
  title: string;
  category: string;
  filter: string;
  readTime: string;
  icon: LucideIcon;
  description: string;
  featured?: boolean;
  lastUpdated: string;
  keywords: string[];
  content: {
    intro: string;
    problem: string;
    explanation: string;
    examples: string[];
    benefits: string[];
    bestPractices: string[];
    commonMistakes: string[];
    conclusion: string;
    cta: string;
  };
  toc: string[];
}

const articles: Article[] = [
  {
    id: "ai-for-business",
    title: "AI for Business",
    category: "Artificial Intelligence",
    filter: "AI",
    readTime: "6 min",
    icon: Brain,
    featured: true,
    description: "Discover how AI, automation, and intelligent assistants can reduce costs and improve business efficiency.",
    lastUpdated: "July 2026",
    keywords: ["AI for business", "artificial intelligence", "business automation", "AI chatbots", "machine learning"],
    toc: ["Introduction", "The Business Problem", "What AI Can Do for Businesses", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "Conclusion"],
    content: {
      intro: "Artificial Intelligence is no longer a futuristic concept reserved for tech giants. Today, AI tools are accessible to businesses of every size — from solo startups to multinational enterprises. The question is no longer whether AI can help your business, but how quickly you can adopt it to stay competitive.",
      problem: "Most businesses struggle with repetitive manual tasks, slow decision-making processes, and an overwhelming volume of data that goes unanalyzed. Customer support teams handle the same questions hundreds of times. Marketing teams spend hours drafting emails that could be generated in seconds. Finance teams manually reconcile data that an AI system could process in minutes. The cost of not using AI is measured not just in money, but in lost opportunities and competitive disadvantage.",
      explanation: "AI for business encompasses a range of technologies — natural language processing, machine learning, computer vision, and robotic process automation — that can be applied to specific business functions. An AI chatbot handles customer queries 24/7 without human intervention. An AI-powered analytics tool identifies sales trends before a human analyst would notice them. An AI automation system processes invoices, categorizes expenses, and flags anomalies automatically. The key is applying AI to problems where speed, accuracy, or scale matters more than human judgment.",
      examples: [
        "A retail store uses AI to predict demand and automatically reorder stock before items run out, reducing lost sales by 30%.",
        "A healthcare clinic deploys an AI chatbot to triage patient symptoms before appointments, reducing no-shows and improving doctor efficiency.",
        "A restaurant chain uses AI-powered analytics to optimize menu pricing based on ingredient costs, seasonality, and customer preferences.",
        "A financial firm automates compliance checking with AI, reducing audit preparation time from two weeks to two days.",
      ],
      benefits: [
        "Reduce operational costs by 20–40% through task automation",
        "Improve customer response times from hours to seconds",
        "Make data-driven decisions with real-time AI analytics",
        "Scale operations without proportionally increasing headcount",
        "Minimize human error in repetitive processes",
        "Gain competitive advantage through faster innovation cycles",
      ],
      bestPractices: [
        "Start with a single high-impact use case rather than trying to transform everything at once.",
        "Ensure your data is clean and well-structured before deploying AI — garbage in, garbage out.",
        "Set clear measurable goals: what does success look like? (e.g., reduce support tickets by 50%)",
        "Involve end-users early in the process to ensure adoption and identify edge cases.",
        "Plan for ongoing maintenance — AI models need retraining as business data evolves.",
      ],
      commonMistakes: [
        "Adopting AI without a clear business problem to solve — AI is a tool, not a strategy.",
        "Expecting AI to replace human judgment entirely — the best results come from human-AI collaboration.",
        "Ignoring data privacy and compliance requirements when deploying AI on customer data.",
        "Skipping the pilot phase and going straight to full-scale deployment.",
      ],
      conclusion: "AI is the most transformative business tool of this decade. Businesses that adopt AI strategically — focusing on specific problems with measurable outcomes — will outperform those that treat it as a buzzword. The starting point is simple: identify your most repetitive, time-consuming, or error-prone process, and explore how AI can improve it.",
      cta: "Ready to explore AI for your business? Let's discuss your use case and find the right solution.",
    },
  },
  {
    id: "what-is-erp",
    title: "What is ERP?",
    category: "Business Software",
    filter: "ERP",
    readTime: "5 min",
    icon: Building2,
    description: "Learn how ERP systems streamline operations, automate workflows, and improve productivity for businesses of all sizes.",
    lastUpdated: "July 2026",
    keywords: ["ERP", "enterprise resource planning", "business management software", "ERP system", "school ERP", "hospital ERP"],
    toc: ["Introduction", "The Business Problem", "What ERP Actually Does", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "Conclusion"],
    content: {
      intro: "Enterprise Resource Planning (ERP) is software that connects your core business processes — inventory, billing, HR, accounting, sales, and reporting — into a single unified system. Instead of juggling multiple spreadsheets, tools, and databases, an ERP gives you one source of truth for your entire business.",
      problem: "Without ERP, businesses rely on disconnected systems. The sales team uses one tool, accounting uses another, and inventory is tracked in a spreadsheet. Data gets duplicated, information falls through the cracks, and reporting requires hours of manual consolidation. A school might track student fees in one system and attendance in another. A hospital might manage patient records separately from pharmacy inventory. This fragmentation leads to errors, delays, and poor decision-making.",
      explanation: "An ERP system centralizes all business data into a single platform. When a sale is made, inventory updates automatically. When inventory reaches a threshold, purchase orders are generated. When a payment is received, accounting records are updated in real-time. Modules can be customized for specific industries — school ERP handles student records, fees, and timetable management. Hospital ERP manages patient records, appointments, pharmacy, and billing. Retail ERP tracks point-of-sale, inventory, and supplier management.",
      examples: [
        "A school with 2,000 students replaced five separate spreadsheets with a single ERP, reducing fee collection time from 3 days to 2 hours per month.",
        "A hospital reduced medication errors by 40% after implementing an ERP-connected pharmacy management module.",
        "A retail chain with 12 stores unified inventory management through ERP, eliminating stockouts that cost ₹5 lakhs annually.",
      ],
      benefits: [
        "Eliminate data silos and create a single source of truth",
        "Automate repetitive processes like invoicing and reordering",
        "Generate real-time reports without manual data compilation",
        "Reduce errors caused by duplicate data entry",
        "Improve cross-department collaboration and visibility",
        "Scale operations without adding administrative overhead",
      ],
      bestPractices: [
        "Map your existing workflows before implementing ERP to identify what needs to change.",
        "Start with core modules (inventory, billing, reporting) and expand gradually.",
        "Invest in training — an ERP is only as good as the people using it.",
        "Choose a customizable solution rather than forcing your business into generic software.",
      ],
      commonMistakes: [
        "Choosing a generic off-the-shelf ERP that doesn't fit your specific industry workflows.",
        "Attempting to migrate all data and processes simultaneously instead of phasing the rollout.",
        "Ignoring employee resistance and failing to provide adequate training.",
      ],
      conclusion: "ERP is not just software — it's a business transformation tool. The right ERP system eliminates inefficiency, reduces costs, and gives you the visibility to make smarter decisions. Whether you run a school, hospital, retail business, or enterprise, ERP is the foundation for scalable growth.",
      cta: "Need an ERP system tailored to your business? Let's design one that fits your exact workflows.",
    },
  },
  {
    id: "seo-vs-geo-vs-aeo",
    title: "SEO vs GEO vs AEO",
    category: "Digital Marketing",
    filter: "SEO",
    readTime: "7 min",
    icon: Globe,
    description: "Understand the differences between Search Engine Optimization, Generative Engine Optimization, and Answer Engine Optimization.",
    lastUpdated: "July 2026",
    keywords: ["SEO", "GEO", "AEO", "search engine optimization", "generative engine optimization", "answer engine optimization"],
    toc: ["Introduction", "The Business Problem", "Understanding SEO, GEO, and AEO", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "Conclusion"],
    content: {
      intro: "The way people find businesses online is evolving rapidly. Traditional SEO — optimizing for Google search rankings — is no longer the only game in town. Two new disciplines have emerged: GEO (Generative Engine Optimization) for AI search engines like ChatGPT and Perplexity, and AEO (Answer Engine Optimization) for featured snippets and voice assistants. Understanding all three is essential for maximum online visibility.",
      problem: "Most businesses invest solely in traditional SEO — keyword research, backlink building, and on-page optimization. But search behavior is shifting. Users now ask ChatGPT for recommendations instead of Googling. They ask Siri for nearby services instead of browsing search results. They rely on Google's AI Overviews instead of clicking through to websites. Businesses that only optimize for traditional search are losing visibility to competitors who optimize for AI and answer engines.",
      explanation: "SEO focuses on ranking higher in Google's organic results through technical optimization, content quality, backlinks, and keyword strategy. GEO optimizes your content so AI language models — ChatGPT, Gemini, Perplexity, Microsoft Copilot — recommend your business when users ask relevant questions. GEO requires structured, factual content with clear entity signals, FAQ schemas, and authoritative statements. AEO structures your content to provide direct, concise answers that appear in Google Featured Snippets, voice assistant responses, and AI summaries. AEO uses question-based headings, FAQ schemas, and concise factual paragraphs.",
      examples: [
        "A restaurant that optimized for GEO now appears when users ask ChatGPT 'best restaurants in Salem for dinner'.",
        "A law firm that implemented AEO strategies saw its FAQ content appear in Google's Featured Snippets, increasing organic traffic by 60%.",
        "An e-commerce store combining all three approaches — SEO, GEO, and AEO — achieved 3x more organic visibility within six months.",
      ],
      benefits: [
        "Capture traffic from traditional Google searches (SEO)",
        "Get recommended by AI chatbots when users ask relevant questions (GEO)",
        "Appear in voice assistant responses and featured snippets (AEO)",
        "Build authority and trust across all search platforms",
        "Future-proof your digital presence against evolving search behavior",
        "Reach customers at every stage of the buying journey",
      ],
      bestPractices: [
        "Create structured, factual content that directly answers common customer questions.",
        "Implement FAQ schema markup on your website for SEO and AEO benefits.",
        "Use clear entity signals — mention your business name, location, and services consistently.",
        "Write content that AI models can easily parse: clear headings, concise answers, authoritative tone.",
        "Monitor your visibility across Google, ChatGPT, and Perplexity to track GEO performance.",
      ],
      commonMistakes: [
        "Ignoring GEO entirely because 'SEO is enough' — AI search is growing rapidly.",
        "Writing content for robots instead of humans — both SEO and GEO reward quality content.",
        "Neglecting technical SEO fundamentals while focusing only on new trends.",
        "Creating thin content that doesn't provide real value — search engines and AI models both penalize this.",
      ],
      conclusion: "The future of online visibility is not SEO versus GEO versus AEO — it's all three working together. SEO drives traditional organic traffic. GEO gets you recommended by AI. AEO captures voice search and featured snippets. Businesses that master all three will dominate their market.",
      cta: "Want to optimize your visibility across Google, AI, and voice search? Let's build a comprehensive strategy.",
    },
  },
  {
    id: "power-bi-guide",
    title: "Power BI Guide",
    category: "Data Analytics",
    filter: "Power BI",
    readTime: "6 min",
    icon: BarChart3,
    description: "Learn how Power BI dashboards transform raw business data into actionable insights and executive reports.",
    lastUpdated: "July 2026",
    keywords: ["Power BI", "business intelligence", "data analytics", "dashboards", "data visualization", "KPI tracking"],
    toc: ["Introduction", "The Business Problem", "What Power BI Does", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "Conclusion"],
    content: {
      intro: "Power BI is Microsoft's business intelligence platform that transforms raw data from multiple sources into interactive dashboards, reports, and visual insights. It connects to Excel spreadsheets, SQL databases, cloud services, and APIs — consolidating everything into a single, real-time view of your business performance.",
      problem: "Most businesses have data scattered across multiple systems — Excel sheets for sales, a CRM for customer data, accounting software for finances, and Google Analytics for website performance. Generating a comprehensive report requires exporting data from each system, manually combining it in Excel, and creating charts that are outdated the moment they're shared. Decision-makers wait days or weeks for reports that should be available in real-time.",
      explanation: "Power BI connects to all your data sources and creates live dashboards that update automatically. A CEO can see real-time revenue, customer acquisition costs, and profit margins on a single screen. An operations manager can track inventory levels across all warehouses. A marketing team can monitor campaign performance by channel, region, and time period. The DAX formula language allows custom calculations specific to your business metrics. Power BI Service enables scheduled report delivery via email and mobile access.",
      examples: [
        "A manufacturing company consolidated 8 data sources into a single Power BI dashboard, reducing monthly reporting from 3 days to 15 minutes.",
        "A retail chain uses Power BI to track real-time sales across 20 stores, enabling same-day restocking decisions that reduced stockouts by 35%.",
        "A professional services firm built a project profitability dashboard that identified underperforming projects, improving margins by 18%.",
      ],
      benefits: [
        "Real-time visibility into business performance across all departments",
        "Automated report generation and email delivery — no manual work",
        "Interactive drill-down capabilities for root cause analysis",
        "Mobile access for decision-makers on the go",
        "Reduced dependency on IT teams for report generation",
        "Data-driven culture that improves decision-making speed and accuracy",
      ],
      bestPractices: [
        "Start with 3–5 key KPIs that directly impact business decisions before building comprehensive dashboards.",
        "Design for your audience — executives need high-level summaries, managers need drill-down capability.",
        "Use consistent color coding and naming conventions across all dashboards.",
        "Implement row-level security to ensure users only see data relevant to their role.",
        "Schedule regular data refreshes so dashboards always show current information.",
      ],
      commonMistakes: [
        "Building dashboards with too many visualizations — clutter reduces clarity and impact.",
        "Ignoring data quality — dashboards built on dirty data produce misleading insights.",
        "Focusing on fancy visuals instead of actionable insights that drive decisions.",
        "Not training users on how to interact with and interpret the dashboards.",
      ],
      conclusion: "Power BI is the fastest path from raw data to actionable business insights. Whether you're a CFO tracking financial performance, an operations manager monitoring supply chain efficiency, or a marketing director measuring campaign ROI, Power BI provides the real-time visibility you need to make smarter decisions faster.",
      cta: "Ready to turn your data into actionable insights? Let's design Power BI dashboards for your business.",
    },
  },
  {
    id: "rag-implementation",
    title: "RAG Implementation",
    category: "Artificial Intelligence",
    filter: "RAG",
    readTime: "8 min",
    icon: Cpu,
    description: "Explore how Retrieval-Augmented Generation improves chatbot accuracy using your organization's own knowledge base.",
    lastUpdated: "July 2026",
    keywords: ["RAG", "retrieval augmented generation", "AI chatbot", "knowledge base", "LangChain", "vector database"],
    toc: ["Introduction", "The Business Problem", "How RAG Works", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "Conclusion"],
    content: {
      intro: "Retrieval-Augmented Generation (RAG) is an AI architecture that connects large language models to your organization's own documents, policies, and knowledge base. Instead of giving generic AI answers, RAG systems retrieve relevant information from your data first, then generate accurate, context-aware responses grounded in your actual business content.",
      problem: "Standard AI chatbots give generic answers because they only know what they learned during training. When a customer asks about your specific product features, return policy, or technical specifications, a generic chatbot either guesses or says 'I don't know.' Internal teams waste hours searching through documents, Confluence pages, and shared drives to find answers that should be instantly accessible. New employees take months to become productive because institutional knowledge is scattered and hard to find.",
      explanation: "A RAG system works in three steps. First, your documents — PDFs, Word files, web pages, databases — are processed into vector embeddings and stored in a vector database like Pinecone or ChromaDB. Second, when a user asks a question, the system searches the vector database for the most relevant document chunks using semantic similarity. Third, those relevant chunks are passed to a language model like GPT-4 as context, which generates an accurate answer based specifically on your data. The result is an AI assistant that knows your business as well as your most experienced employee.",
      examples: [
        "An enterprise deployed a RAG chatbot that answers HR policy questions, reducing internal support tickets by 70% and saving 200 hours per month.",
        "A legal firm built a RAG system over 10,000 case documents, enabling lawyers to find relevant precedents in seconds instead of hours.",
        "A SaaS company created a RAG-powered support bot that handles 80% of customer queries without human intervention, with source-linked answers.",
        "A hospital implemented a RAG system for medical staff to instantly access treatment protocols and drug interaction guidelines.",
      ],
      benefits: [
        "Provide accurate, source-linked answers instead of AI hallucinations",
        "Reduce support workload by 60–80% with intelligent automation",
        "Enable 24/7 knowledge access for employees, customers, or partners",
        "Onboard new team members faster with instant institutional knowledge",
        "Maintain data privacy — RAG uses your data without sending it to external training sets",
        "Scale knowledge management without proportionally increasing support staff",
      ],
      bestPractices: [
        "Start with your most frequently asked questions and the documents that answer them.",
        "Implement a confidence threshold — if similarity is below 0.75, the system should say 'I don't know' rather than guess.",
        "Always include source attribution so users can verify answers against original documents.",
        "Regularly update your document index as policies, products, and information change.",
        "Test with real user queries to identify gaps in your knowledge base.",
      ],
      commonMistakes: [
        "Ingesting documents without cleaning or structuring them — messy input produces messy output.",
        "Not implementing source attribution — users won't trust answers they can't verify.",
        "Expecting RAG to work perfectly on day one — it needs iteration and fine-tuning.",
        "Ignoring document access controls — sensitive information should only be retrievable by authorized users.",
      ],
      conclusion: "RAG is the bridge between generic AI and a truly intelligent business assistant. By grounding AI responses in your actual business data, RAG systems provide accurate, trustworthy, and actionable answers that improve customer experience, employee productivity, and organizational knowledge management.",
      cta: "Want to build a RAG-powered AI assistant for your business? Let's design a solution that knows your organization inside out.",
    },
  },
  {
    id: "business-automation",
    title: "Business Automation",
    category: "Business Solutions",
    filter: "Automation",
    readTime: "5 min",
    icon: Workflow,
    description: "See how automation reduces manual work, increases productivity, and improves customer experience.",
    lastUpdated: "July 2026",
    keywords: ["business automation", "workflow automation", "process automation", "productivity", "efficiency"],
    toc: ["Introduction", "The Business Problem", "What Business Automation Includes", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "Conclusion"],
    content: {
      intro: "Business automation replaces repetitive manual tasks with intelligent systems that work 24/7 without errors or fatigue. From automated email responses and invoice processing to intelligent workflow routing and AI-powered decision-making, automation lets your team focus on high-value work while machines handle the routine.",
      problem: "Every business has processes that consume time but require little judgment — data entry, email follow-ups, invoice processing, appointment scheduling, report generation, inventory reordering. These tasks are essential but draining. They eat into productive hours, introduce human error, and create bottlenecks when key people are unavailable. A business with 10 employees spending 2 hours daily on manual data entry is losing 5,000 hours of productive work annually.",
      explanation: "Business automation encompasses several layers. Task automation handles individual repetitive actions — sending confirmation emails, updating spreadsheets, generating invoices. Workflow automation connects multiple tasks into a sequence — when a customer places an order, the system updates inventory, sends a confirmation, creates a shipping label, and notifies the warehouse. Intelligent automation uses AI to make decisions within workflows — routing customer queries to the right department, prioritizing urgent requests, or flagging anomalous transactions.",
      examples: [
        "An accounting firm automated invoice processing, reducing processing time from 45 minutes per invoice to 3 minutes with 99.5% accuracy.",
        "A clinic automated appointment scheduling and reminders, reducing no-shows by 45% and freeing up 10 hours of receptionist time weekly.",
        "An e-commerce business automated order fulfillment — from payment confirmation to shipping label generation — eliminating 3 full-time positions worth of manual work.",
        "A consulting firm automated weekly client reporting, saving 20 hours per month and delivering reports 2 days faster.",
      ],
      benefits: [
        "Reduce operational costs by eliminating manual labor for routine tasks",
        "Minimize human error in data entry, calculations, and processing",
        "Improve response times — automated systems respond in seconds, not hours",
        "Enable 24/7 operations without increasing staff",
        "Free up employees for strategic, creative, and high-value work",
        "Create consistent, auditable processes that scale with business growth",
      ],
      bestPractices: [
        "Map your current processes end-to-end before automating — you can't automate what you don't understand.",
        "Start with the highest-volume, most time-consuming processes for maximum ROI.",
        "Build in exception handling — automation should gracefully handle edge cases, not fail silently.",
        "Monitor automated processes regularly and optimize based on performance data.",
        "Involve the people who currently do the work — they know the edge cases and pain points best.",
      ],
      commonMistakes: [
        "Automating a broken process instead of fixing it first — automation amplifies inefficiency.",
        "Over-automating without human oversight — some decisions still need human judgment.",
        "Not testing edge cases — automation fails when it encounters unexpected scenarios.",
        "Ignoring change management — employees need training and context to trust automated systems.",
      ],
      conclusion: "Business automation is not about replacing humans — it's about amplifying human potential. By eliminating routine, repetitive tasks, automation frees your team to focus on strategy, creativity, and relationship-building. The businesses that automate strategically will operate faster, cheaper, and more accurately than those that don't.",
      cta: "Ready to automate your business processes? Let's identify the highest-impact opportunities and build intelligent workflows.",
    },
  },
];

const allFilters = ["All", "AI", "ERP", "Analytics", "SEO", "Automation", "Power BI", "RAG"];
const popularTags = ["AI", "React", "Node.js", "ERP", "Power BI", "MongoDB", "Cloud", "Automation", "SEO", "GEO", "AEO", "RAG", "LangChain", "OpenAI"];

/* ─── Article Modal ─── */

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  const Icon = article.icon;

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title: article.title, text: article.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }, [article]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm px-4 py-8 sm:py-12"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative w-full max-w-3xl rounded-3xl border border-[#E5F0FF] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close + Share */}
        <div className="absolute top-5 right-5 z-10 flex gap-2">
          <button onClick={handleShare} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#64748B] shadow-sm backdrop-blur transition-colors hover:bg-[#f1f5f9] hover:text-[#2563eb]" aria-label="Share article">
            <Share2 className="h-4 w-4" />
          </button>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#64748B] shadow-sm backdrop-blur transition-colors hover:bg-[#f1f5f9] hover:text-[#0F172A]" aria-label="Close article">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Banner */}
        <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#2563eb] to-[#60a5fa]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="absolute bottom-6 left-6 right-16 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="inline-block rounded-full bg-white/20 px-3 py-0.5 text-[11px] font-semibold text-white backdrop-blur">{article.category}</span>
              <h3 className="mt-1 text-2xl font-bold text-white">{article.title}</h3>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
            <span>By <strong className="text-[#0F172A]">Sachin Balraj</strong></span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readTime} read</span>
            <span>Updated {article.lastUpdated}</span>
          </div>

          {/* TOC */}
          <div className="rounded-2xl border border-[#E5F0FF] bg-[#f8fbff] p-5">
            <h4 className="mb-3 text-sm font-bold text-[#0F172A]">Table of Contents</h4>
            <ul className="space-y-1.5">
              {article.toc.map((item, i) => (
                <li key={item} className="text-[13px] text-[#2563eb] cursor-pointer hover:underline">
                  {i + 1}. {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Content sections */}
          <ContentBlock heading="Introduction">{article.content.intro}</ContentBlock>
          <ContentBlock heading="The Business Problem">{article.content.problem}</ContentBlock>
          <ContentBlock heading="How It Works">{article.content.explanation}</ContentBlock>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#0F172A]">Real-World Examples</h4>
            <ul className="space-y-2">
              {article.content.examples.map((ex) => (
                <li key={ex} className="flex items-start gap-2 text-[14px] text-[#64748B] leading-relaxed">
                  <span className="mt-1 text-[#2563eb]">▸</span>{ex}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5F0FF] bg-[#f8fbff] p-5">
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#0F172A]">Key Benefits</h4>
            <ul className="space-y-2">
              {article.content.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[14px] text-[#64748B]">
                  <span className="mt-0.5 text-emerald-500">✓</span>{b}
                </li>
              ))}
            </ul>
          </div>

          <ContentBlock heading="Best Practices">{article.content.bestPractices.map((p, i) => `${i + 1}. ${p}`).join("\n\n")}</ContentBlock>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#0F172A]">Common Mistakes to Avoid</h4>
            <ul className="space-y-2">
              {article.content.commonMistakes.map((m) => (
                <li key={m} className="flex items-start gap-2 text-[14px] text-[#64748B] leading-relaxed">
                  <span className="mt-1 text-red-400">✕</span>{m}
                </li>
              ))}
            </ul>
          </div>

          <ContentBlock heading="Conclusion">{article.content.conclusion}</ContentBlock>

          {/* CTA */}
          <div className="rounded-2xl border border-[#2563eb]/20 bg-gradient-to-br from-[#eff6ff] to-white p-6 text-center">
            <p className="text-[15px] font-medium text-[#0F172A] mb-4">{article.content.cta}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#contact" onClick={onClose} className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#2563eb]/90 hover:shadow-md">
                Book Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[#E5F0FF] bg-white px-5 py-2.5 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:border-[#bfdbfe] hover:shadow-md">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Related */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-[#0F172A]">Related Articles</h4>
            <div className="flex flex-wrap gap-2">
              {articles.filter((a) => a.id !== article.id).slice(0, 3).map((a) => (
                <span key={a.id} className="rounded-full border border-[#E5F0FF] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#2563eb]">
                  {a.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContentBlock({ heading, children }: { heading: string; children: string }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#0F172A]">{heading}</h4>
      <p className="text-[15px] leading-relaxed text-[#64748B] whitespace-pre-line">{children}</p>
    </div>
  );
}

/* ─── Article Card ─── */

function ArticleCard({ article, onOpen }: { article: Article; onOpen: () => void }) {
  const Icon = article.icon;

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
      className="group flex flex-col overflow-hidden rounded-[22px] border border-[#E5F0FF] bg-white/80 backdrop-blur-sm transition-all duration-350 hover:border-[#2563eb]/40"
      style={{ boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 4px 16px rgba(37,99,235,0.03)" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.12), 0 16px 48px rgba(37,99,235,0.06)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(37,99,235,0.04), 0 4px 16px rgba(37,99,235,0.03)"; }}
    >
      <div className="flex-1 p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold text-[#2563eb]">
            <Icon className="h-3 w-3" />
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#64748B]">
            <Clock className="h-3 w-3" />{article.readTime}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-bold text-[#0F172A] group-hover:text-[#2563eb] transition-colors">{article.title}</h3>
        <p className="text-[13px] leading-relaxed text-[#64748B] flex-1">{article.description}</p>
      </div>
      <div className="px-6 pb-6">
        <button onClick={onOpen} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5F0FF] bg-[#f8fbff] px-4 py-2.5 text-[13px] font-semibold text-[#2563eb] transition-all duration-200 group-hover:border-[#2563eb]/30 group-hover:bg-[#2563eb] group-hover:text-white">
          Read Article
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}

/* ─── Main Section ─── */

export function KnowledgeCenterSection() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === "All" || a.filter === activeFilter || a.category.toLowerCase().includes(activeFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const featured = articles.find((a) => a.featured);

  return (
    <>
      <section
        id="knowledge"
        className="relative overflow-hidden bg-white py-24 lg:py-28"
        aria-label="Knowledge Center — Technology articles, AI guides, ERP explanations, and business strategy insights"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#eaf6ff_0%,transparent_60%)]" />
          <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[120px]" />
          <div className="absolute bottom-[15%] right-[8%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.06] blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-[#2563eb]/[0.03]" style={{ width: 5 + i * 2, height: 5 + i * 2, left: `${14 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }} animate={{ y: [0, -16, 0], opacity: [0.12, 0.3, 0.12] }} transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }} />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} className="text-center max-w-2xl mx-auto mb-12">
            <motion.div variants={fadeInUp}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5F0FF] bg-[#eff6ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#2563eb]">
                <BookOpen className="h-3.5 w-3.5" /> Knowledge Center
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
              Knowledge <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Center</span>
            </motion.h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
            <motion.p variants={fadeInUp} className="mt-5 text-[15px] leading-relaxed text-[#64748B]">
              Explore practical insights, AI innovations, business strategies, and technology guides to help businesses grow.
            </motion.p>
          </motion.div>

          {/* Search + Filters */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-10 max-w-2xl mx-auto">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
              <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E5F0FF] bg-white py-3 pl-11 pr-4 text-sm text-[#0F172A] outline-none transition-all duration-200 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10" aria-label="Search articles" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {allFilters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)} className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all duration-200 ${activeFilter === f ? "bg-[#2563eb] text-white shadow-sm" : "border border-[#E5F0FF] bg-white text-[#64748B] hover:border-[#2563eb]/30 hover:text-[#2563eb]"}`}>
                  {f}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Article */}
          {featured && activeFilter === "All" && !search && (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
              <div onClick={() => setSelectedArticle(featured)} className="group cursor-pointer overflow-hidden rounded-[22px] border border-[#2563eb]/20 bg-gradient-to-br from-[#eff6ff] to-white p-8 transition-all duration-350 hover:border-[#2563eb]/40 hover:shadow-lg sm:flex sm:items-center sm:gap-8">
                <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#60a5fa] sm:mb-0">
                  <featured.icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-[#2563eb]/10 px-3 py-0.5 text-[11px] font-bold text-[#2563eb]">Featured</span>
                    <span className="rounded-full bg-[#eff6ff] px-3 py-0.5 text-[11px] font-semibold text-[#64748B]">{featured.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#2563eb] transition-colors">{featured.title}</h3>
                  <p className="mt-1 text-[14px] text-[#64748B]">{featured.description}</p>
                </div>
                <ArrowRight className="hidden sm:block h-5 w-5 shrink-0 text-[#2563eb] transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </motion.div>
          )}

          {/* Article Grid */}
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} onOpen={() => setSelectedArticle(article)} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#64748B] text-[15px]">No articles found matching your search.</p>
            </div>
          )}

          {/* Popular Tags */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-center mb-10">
            <h3 className="mb-4 text-sm font-bold text-[#0F172A] flex items-center justify-center gap-2">
              <Tag className="h-4 w-4 text-[#2563eb]" /> Popular Topics
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {popularTags.map((t, i) => (
                <motion.span key={t} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.025 }} whileHover={{ y: -3, scale: 1.06 }} className="rounded-full border border-[#E5F0FF] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#0F172A] cursor-default transition-colors duration-200 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white">
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center rounded-[22px] border border-[#E5F0FF] bg-[#f8fbff] p-10">
            <h3 className="text-xl font-bold text-[#0F172A]">Still have questions?</h3>
            <p className="mt-2 text-[15px] text-[#64748B]">Let&apos;s discuss your project and build the right solution together.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb]/90 hover:shadow-md">
                Book Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[#E5F0FF] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all duration-200 hover:border-[#bfdbfe] hover:shadow-md">
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      </AnimatePresence>
    </>
  );
}
