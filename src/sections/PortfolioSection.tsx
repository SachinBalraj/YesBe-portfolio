import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/animations";

/* ─── GitHub Icon ─── */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ─── Project Data ─── */
interface CaseStudy {
  title: string;
  shortOverview: string;
  category: string;
  clientType: string;
  duration: string;
  status: "Completed" | "In Progress";
  image: string;
  technologies: string[];
  techGroups: { label: string; items: string[] }[];
  problem: string;
  solution: string;
  features: string[];
  businessResult: string[];
  challenge: string;
  futureEnhancements: string[];
  github?: string;
  live?: string;
}

const projects: CaseStudy[] = [
  {
    title: "Fashion Fusion",
    shortOverview:
      "A modern e-commerce platform enabling a clothing brand to launch online sales, manage inventory, and process orders — replacing manual WhatsApp-based selling.",
    category: "E-Commerce Platform",
    clientType: "Retail / Fashion Brand",
    duration: "4 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=450&fit=crop",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Stripe", "Tailwind CSS"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API"] },
      { label: "Database", items: ["MongoDB", "Mongoose ODM"] },
      { label: "Cloud", items: ["Vercel", "Render"] },
    ],
    problem:
      "A small clothing boutique relied entirely on WhatsApp orders and manual spreadsheets to track inventory. The owner spent hours each day confirming orders, updating stock counts, and chasing payments. With no online storefront, the business had zero reach beyond local customers and was losing sales to competitors with online presence.",
    solution:
      "Designed and developed a full-stack e-commerce platform with a product catalog, category filtering, shopping cart, secure checkout with Stripe integration, and a comprehensive admin dashboard. The admin panel provides real-time inventory tracking, order management, sales analytics, and customer insights — eliminating the need for manual spreadsheets entirely.",
    features: [
      "Responsive product catalog with search & filters",
      "Secure user authentication & profiles",
      "Shopping cart with persistent state",
      "Stripe payment integration",
      "Admin dashboard with sales analytics",
      "Real-time inventory management",
      "Order tracking & status updates",
      "Mobile-first responsive design",
    ],
    businessResult: [
      "Enabled 24/7 online sales without manual intervention",
      "Reduced order processing time from 15 minutes to under 2 minutes",
      "Expanded customer reach beyond local to nationwide",
      "Eliminated inventory discrepancies caused by manual tracking",
      "Increased monthly revenue by 40% within first quarter of launch",
    ],
    challenge:
      "The biggest challenge was building a real-time inventory sync system that prevents overselling when multiple customers purchase the same item simultaneously. Solved this using MongoDB transactions with optimistic locking, ensuring stock counts remain accurate even under concurrent access.",
    futureEnhancements: [
      "AI-powered product recommendations based on browsing history",
      "WhatsApp order notification integration",
      "Multi-vendor marketplace support",
      "Advanced coupon and loyalty program system",
    ],
    github: "#",
  },
  {
    title: "Restaurant QR Ordering System",
    shortOverview:
      "A QR code-based contactless ordering system that lets customers browse the menu, place orders from their phone, and notify the kitchen instantly — eliminating wait times.",
    category: "Restaurant Automation",
    clientType: "Restaurant / F&B",
    duration: "3 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=450&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "QR Code API", "Socket.io", "Express.js"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "Tailwind CSS", "Socket.io Client"] },
      { label: "Backend", items: ["Node.js", "Express.js", "WebSocket"] },
      { label: "Database", items: ["MongoDB"] },
      { label: "Integrations", items: ["QR Code API", "Real-time Notifications"] },
    ],
    problem:
      "During peak hours, the restaurant's waiters were overwhelmed taking orders manually. Customers waited 10–15 minutes just to place an order. Orders were frequently written down incorrectly, leading to wrong dishes being served. The kitchen had no real-time order queue, and the management had zero visibility into daily sales trends.",
    solution:
      "Built a QR-based ordering system where each table has a unique QR code. Customers scan the code, browse the full menu with images and descriptions, customize their orders, and submit directly to the kitchen queue. The kitchen display shows orders in real-time with timestamps and table numbers. An admin panel tracks all orders, peak hours, popular items, and daily revenue.",
    features: [
      "Unique QR code per table with instant menu access",
      "Full menu with images, descriptions & prices",
      "Customizable orders with special instructions",
      "Real-time kitchen order queue with notifications",
      "Table management & order tracking",
      "Admin dashboard with sales & analytics",
      "Automatic order confirmation receipts",
      "Mobile-optimized for customer phones",
    ],
    businessResult: [
      "Reduced average order placement time from 12 minutes to under 3 minutes",
      "Eliminated 95% of order errors caused by manual taking",
      "Increased table turnover rate by 30% during peak hours",
      "Reduced staffing needs by 2 waiters per shift",
      "Gained real-time visibility into daily sales and popular items",
    ],
    challenge:
      "Ensuring real-time order delivery to the kitchen without delays was critical. Implemented WebSocket connections with automatic reconnection logic and a fallback polling mechanism, so even if the connection drops briefly, the order still reaches the kitchen within seconds.",
    futureEnhancements: [
      "AI-based demand forecasting for inventory pre-ordering",
      "Customer loyalty program with visit tracking",
      "Integration with food delivery platforms",
      "Voice-based ordering for accessibility",
    ],
    github: "#",
  },
  {
    title: "Library Management System",
    shortOverview:
      "A digital library management platform that automates book inventory, member management, issue/return tracking, and reporting — replacing paper-based registers.",
    category: "Educational ERP",
    clientType: "Educational Institution",
    duration: "3 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=700&h=450&fit=crop",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Barcode API"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API"] },
      { label: "Database", items: ["MongoDB"] },
      { label: "Integrations", items: ["Barcode Scanning API", "Automated Fine Calculation"] },
    ],
    problem:
      "A college library with 10,000+ books tracked everything in paper registers. Librarians spent 30 minutes per transaction looking up books, recording issues, and calculating overdue fines. Students had no way to check book availability remotely. Lost books went undetected for months, and generating monthly reports required manually compiling data from multiple ledgers.",
    solution:
      "Developed a comprehensive digital library management system with a searchable book catalog, barcode-based issue/return, automated fine calculation, member management, and a reporting dashboard. Librarians can now process a transaction in under 30 seconds. Students can search the catalog online and reserve books. The admin dashboard provides real-time occupancy, overdue alerts, and acquisition reports.",
    features: [
      "Searchable book catalog with categories & availability",
      "Barcode scanning for quick issue/return",
      "Automated overdue fine calculation",
      "Member management with role-based access",
      "Book reservation & hold system",
      "Real-time availability tracking",
      "Monthly & annual report generation",
      "Overdue notification system",
    ],
    businessResult: [
      "Reduced transaction processing time from 5 minutes to 30 seconds",
      "Eliminated 90% of manual record-keeping work",
      "Improved book tracking accuracy to 99.5%",
      "Enabled students to check availability remotely, reducing empty trips",
      "Generated automated reports saving 8+ hours of monthly admin work",
    ],
    challenge:
      "Migrating 10,000+ existing book records from paper registers to the digital system was the biggest hurdle. Built a bulk CSV import tool with validation, duplicate detection, and category auto-mapping, allowing the entire catalog to be digitized in under 2 days instead of the estimated 2 weeks.",
    futureEnhancements: [
      "AI-powered book recommendation engine based on borrowing patterns",
      "Integration with university student information system",
      "Mobile app for students with barcode scanning",
      "Digital library card with QR code access",
    ],
    github: "#",
  },
  {
    title: "Power BI Business Dashboard",
    shortOverview:
      "Interactive executive dashboards consolidating data from multiple sources into real-time KPI tracking, sales analytics, and automated report generation.",
    category: "Business Analytics",
    clientType: "Corporate / SME",
    duration: "2 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=450&fit=crop",
    technologies: ["Power BI", "SQL", "DAX", "Excel", "Azure Data Factory"],
    techGroups: [
      { label: "Analytics", items: ["Power BI", "DAX", "Power Query"] },
      { label: "Data Layer", items: ["SQL Server", "Azure Data Factory"] },
      { label: "Sources", items: ["Excel", "CRM Export", "ERP Database"] },
      { label: "Deployment", items: ["Power BI Service", "Scheduled Refresh"] },
    ],
    problem:
      "The management team relied on weekly Excel reports compiled manually from 5 different data sources — CRM, ERP, accounting software, POS system, and Google Analytics. By the time the report reached decision-makers, the data was already 5–7 days old. Identifying sales trends, spotting underperforming products, and tracking team performance required hours of manual analysis.",
    solution:
      "Designed and deployed a suite of Power BI dashboards that connect directly to all data sources via Azure Data Factory pipelines. Built executive, sales, operations, and finance dashboards with drill-down capabilities, automated KPI tracking, anomaly detection, and scheduled email reports. Decision-makers now see real-time performance metrics updated every hour.",
    features: [
      "Executive KPI dashboard with drill-down capability",
      "Sales performance by region, product & team",
      "Automated anomaly detection & alerts",
      "Scheduled email report delivery",
      "Mobile-optimized dashboard views",
      "Real-time data refresh (hourly)",
      "Custom DAX measures for business-specific KPIs",
      "Role-based dashboard access",
    ],
    businessResult: [
      "Eliminated 40+ hours of monthly manual report compilation",
      "Reduced decision-making lag from 5 days to real-time",
      "Identified a 15% underperforming product line within first week",
      "Improved sales forecasting accuracy by 35%",
      "Enabled non-technical managers to explore data independently",
    ],
    challenge:
      "Data lived in 5 incompatible systems with inconsistent naming conventions and no shared keys. Built an Azure Data Factory ETL pipeline with data cleansing, standardization, and a unified data model, ensuring all sources merge seamlessly into a single source of truth.",
    futureEnhancements: [
      "Predictive analytics using Python integration in Power BI",
      "Natural language Q&A for non-technical users",
      "Embedded dashboards in the company intranet",
      "Automated Slack/Teams alerts for threshold breaches",
    ],
  },
  {
    title: "AI Chatbot with RAG",
    shortOverview:
      "An enterprise AI assistant powered by Retrieval-Augmented Generation that provides instant, accurate answers from internal company documents and knowledge bases.",
    category: "Artificial Intelligence",
    clientType: "Enterprise / Internal Tool",
    duration: "5 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&h=450&fit=crop",
    technologies: ["Python", "LangChain", "OpenAI", "Pinecone", "FastAPI", "React"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "Tailwind CSS"] },
      { label: "Backend", items: ["Python", "FastAPI", "LangChain"] },
      { label: "AI / ML", items: ["OpenAI GPT-4", "Embeddings", "RAG Pipeline"] },
      { label: "Database", items: ["Pinecone (Vector DB)", "MongoDB"] },
    ],
    problem:
      "An enterprise support team handled 200+ daily queries from employees across departments — HR policies, IT procedures, product documentation, and compliance guidelines. Answering required searching through 500+ PDF documents, Confluence pages, and shared drives. Average response time was 45 minutes, and new team members took months to become proficient.",
    solution:
      "Built a RAG-powered AI chatbot that ingests company documents, indexes them as vector embeddings in Pinecone, and uses GPT-4 with LangChain to retrieve and generate accurate, context-aware answers. The chatbot includes source attribution (linking back to the original document), conversation history, and an admin panel for document management and usage analytics.",
    features: [
      "Natural language query interface",
      "RAG pipeline with source attribution",
      "Supports PDF, Word, Confluence, and web page ingestion",
      "Conversation history & context awareness",
      "Admin panel for document management",
      "Usage analytics & query tracking",
      "Role-based access control",
      "API endpoint for third-party integration",
    ],
    businessResult: [
      "Reduced average query response time from 45 minutes to under 10 seconds",
      "Handled 80% of routine queries without human intervention",
      "Onboarded new team members 60% faster with instant knowledge access",
      "Saved an estimated 120+ support hours per month",
      "Improved answer accuracy to 94% with source-linked responses",
    ],
    challenge:
      "Ensuring the AI only answers from verified company documents and doesn't hallucinate was critical. Implemented a confidence threshold system — if the retrieved context similarity score falls below 0.75, the chatbot responds with 'I don't have enough information' rather than guessing. Also added source URLs so users can verify every answer.",
    futureEnhancements: [
      "Multi-language support for global teams",
      "Voice-based query interface",
      "Integration with Slack and Microsoft Teams",
      "Automated document freshness scoring and alerts",
    ],
    github: "#",
  },
];

/* ─── Case Study Modal ─── */

function CaseStudyModal({
  project,
  onClose,
}: {
  project: CaseStudy;
  onClose: () => void;
}) {
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
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#64748B] shadow-sm backdrop-blur transition-colors hover:bg-[#f1f5f9] hover:text-[#0F172A]"
          aria-label="Close case study"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero image */}
        <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={`${project.title} case study`}
            width={700}
            height={450}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-5 left-6 right-16">
            <span className="mb-2 inline-block rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2563eb] backdrop-blur">
              {project.category}
            </span>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#2563eb]" />
              {project.clientType}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {project.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              {project.status}
            </span>
          </div>

          {/* Business Problem */}
          <div>
            <SectionHeading>Business Problem</SectionHeading>
            <p className="text-[15px] leading-relaxed text-[#64748B]">{project.problem}</p>
          </div>

          {/* My Solution */}
          <div>
            <SectionHeading>My Solution</SectionHeading>
            <p className="text-[15px] leading-relaxed text-[#64748B]">{project.solution}</p>
          </div>

          {/* Technology Stack */}
          <div>
            <SectionHeading>Technology Stack</SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.techGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F172A] mb-2">
                    {group.label}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item} className="text-[13px] text-[#64748B]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <SectionHeading>Key Features</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#2563eb]">✓</span>
                  <span className="text-[14px] text-[#64748B]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Result */}
          <div className="rounded-2xl border border-[#E5F0FF] bg-[#f8fbff] p-5">
            <SectionHeading>Business Result</SectionHeading>
            <ul className="space-y-2">
              {project.businessResult.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-500">▸</span>
                  <span className="text-[14px] text-[#64748B]">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div>
            <SectionHeading>Challenges &amp; Solutions</SectionHeading>
            <p className="text-[15px] leading-relaxed text-[#64748B]">{project.challenge}</p>
          </div>

          {/* Future Enhancements */}
          <div>
            <SectionHeading>Future Enhancements</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {project.futureEnhancements.map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-[#E5F0FF] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#2563eb]"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#E5F0FF] bg-white px-5 py-2.5 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:border-[#bfdbfe] hover:shadow-md"
              >
                <GithubIcon className="h-4 w-4" />
                View Source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#2563eb]/90 hover:shadow-md"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#0F172A]">
      {children}
    </h4>
  );
}

/* ─── Project Card ─── */

function ProjectCard({
  project,
  onOpen,
}: {
  project: CaseStudy;
  onOpen: () => void;
}) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group h-full flex flex-col overflow-hidden rounded-2xl border border-[#E5F0FF] bg-white transition-all duration-300 hover:border-[#bfdbfe]"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(37,99,235,0.03)",
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 8px 24px rgba(37,99,235,0.10), 0 16px 48px rgba(0,0,0,0.05)",
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} — ${project.category} case study by Sachin Balraj`}
          loading="lazy"
          decoding="async"
          width={700}
          height={450}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#2563eb] backdrop-blur-sm">
          {project.category}
        </span>

        {/* Status badge */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2563eb] transition-colors">
          {project.title}
        </h3>

        <p className="mt-2 text-[13px] leading-relaxed text-[#64748B] flex-1">
          {project.shortOverview}
        </p>

        {/* Tech chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[#E5F0FF] bg-[#f8fbff] px-2 py-0.5 text-[11px] font-medium text-[#2563eb]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-md border border-[#E5F0FF] bg-[#f8fbff] px-2 py-0.5 text-[11px] font-medium text-[#94a3b8]">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Business impact mini */}
        <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/50 px-3 py-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
            Impact
          </span>
          <p className="mt-0.5 text-[12px] text-[#64748B] leading-snug">
            {project.businessResult[0]}
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={onOpen}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb]/90 hover:shadow-md"
          >
            View Case Study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E5F0FF] bg-white text-[#64748B] shadow-sm transition-all hover:border-[#bfdbfe] hover:text-[#0F172A] hover:shadow-md"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} Live Demo`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E5F0FF] bg-white text-[#64748B] shadow-sm transition-all hover:border-[#bfdbfe] hover:text-[#0F172A] hover:shadow-md"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main Section ─── */

export function PortfolioSection() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  return (
    <>
      <section
        id="projects"
        className="relative py-20 lg:py-28 bg-white overflow-hidden"
        aria-label="Featured Projects — Client case studies in e-commerce, restaurant automation, library management, analytics, and AI"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[100px]" />
          <div className="absolute bottom-[10%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.06] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block rounded-full border border-[#E5F0FF] bg-[#eff6ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2563eb] mb-4">
                Case Studies
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
              Featured <span className="text-[#2563eb]">Projects</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
            />
            <motion.p variants={fadeInUp} className="mt-5 text-[15px] text-[#64748B] leading-relaxed">
              Real client solutions — each project solved a specific business problem with measurable outcomes.
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={() => setSelected(project)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
