import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Bot, BarChart3, Building2, ArrowRight, MessageCircle, Info,
  Globe, ShoppingCart, Briefcase, FileText, CheckCircle2, ChevronDown,
  Shield, Zap, Users, TrendingUp, Headphones, Scale, Clock, Phone,
  Target, Database, Layout, LineChart, Search, Share2, Megaphone, BrainCircuit,
  Workflow, Boxes, Receipt, UserCog, ContactRound, Lightbulb, Cpu, Mail,
  Check,
} from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import { fadeInUp, staggerContainer } from "@/animations";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */

interface PricingCard {
  name: string;
  description: string;
  price?: string;
  priceLabel?: string;
  timeline?: string;
  features: string[];
  popular?: boolean;
}

interface PricingSection {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  icon: LucideIcon;
  cards: PricingCard[];
  ctaLabel?: string;
}

/* ─── Pricing data ─── */

const sections: PricingSection[] = [
  {
    id: "website-development",
    badge: "Web Development",
    title: "Website Development",
    highlight: "Development",
    subtitle: "From landing pages to full e-commerce — built for speed, design, and conversions.",
    icon: Globe,
    cards: [
      {
        name: "Landing Page",
        description: "Single-page conversion-focused design with contact forms and SEO basics.",
        price: "₹4,999",
        priceLabel: "Starting From",
        timeline: "3–5 Days",
        features: [
          "Responsive single-page design",
          "Contact form integration",
          "Basic SEO setup",
          "Mobile-first layout",
          "Analytics integration",
        ],
      },
      {
        name: "Portfolio Website",
        description: "Showcase your work with a clean, professional multi-page portfolio site.",
        price: "₹9,999",
        priceLabel: "Starting From",
        timeline: "1–2 Weeks",
        features: [
          "Multi-page responsive design",
          "Project showcase gallery",
          "Service pages with details",
          "SEO-optimized structure",
          "Fast loading performance",
          "Social media integration",
        ],
      },
      {
        name: "Business Website",
        description: "Corporate website with service pages, lead capture, and content management.",
        price: "₹14,999",
        priceLabel: "Starting From",
        timeline: "2–3 Weeks",
        popular: true,
        features: [
          "5–10 responsive pages",
          "Lead generation forms",
          "Blog / news section",
          "CMS integration",
          "Schema markup & SEO",
          "Google Analytics setup",
          "Performance optimization",
        ],
      },
      {
        name: "E-Commerce Website",
        description: "Full online store with products, payments, inventory, and admin dashboard.",
        price: "₹24,999",
        priceLabel: "Starting From",
        timeline: "3–5 Weeks",
        features: [
          "Product catalog with categories",
          "Shopping cart & checkout",
          "Payment gateway integration",
          "Admin dashboard",
          "Inventory management",
          "Order tracking system",
          "Mobile-optimized store",
          "SEO for product pages",
        ],
      },
    ],
  },
  {
    id: "ai-automation",
    badge: "AI & Automation",
    title: "AI & Automation",
    highlight: "Intelligence",
    subtitle: "Custom AI solutions built around your business processes and data.",
    icon: Bot,
    cards: [
      {
        name: "AI Chatbots",
        description: "Intelligent chatbots that handle customer queries, support, and lead qualification 24/7.",
        priceLabel: "Custom Quote",
        timeline: "2–4 Weeks",
        features: [
          "Natural language understanding",
          "Multi-channel deployment",
          "Knowledge base integration",
          "Conversation analytics",
          "Human handoff support",
        ],
      },
      {
        name: "Business Automation",
        description: "Automate repetitive tasks — approvals, notifications, reports, and data entry.",
        priceLabel: "Custom Quote",
        timeline: "4–8 Weeks",
        popular: true,
        features: [
          "Visual workflow builder",
          "Multi-level approval chains",
          "Email & WhatsApp notifications",
          "Document generation",
          "Custom reporting",
          "API integrations",
        ],
      },
      {
        name: "AI Assistants",
        description: "RAG-powered assistants that answer questions from your internal documents and data.",
        priceLabel: "Custom Quote",
        timeline: "4–6 Weeks",
        features: [
          "RAG pipeline with source attribution",
          "PDF, Word, Confluence ingestion",
          "Conversation context awareness",
          "Admin document management",
          "Usage analytics & tracking",
          "Role-based access control",
        ],
      },
      {
        name: "Generative AI Solutions",
        description: "Custom generative AI tools for content, analysis, summarization, and more.",
        priceLabel: "Custom Quote",
        timeline: "4–8 Weeks",
        features: [
          "Custom model fine-tuning",
          "Domain-specific training",
          "API integration layer",
          "Content generation workflows",
          "Quality validation pipeline",
          "Scalable deployment",
        ],
      },
    ],
  },
  {
    id: "erp-systems",
    badge: "ERP & Business Systems",
    title: "ERP & Business Systems",
    highlight: "Systems",
    subtitle: "End-to-end business systems that connect your operations in one platform.",
    icon: Building2,
    cards: [
      {
        name: "ERP Implementation",
        description: "Complete enterprise resource planning — inventory, HR, billing, and reporting in one system.",
        priceLabel: "Custom Quote",
        timeline: "6–12 Weeks",
        popular: true,
        features: [
          "Modular architecture",
          "Real-time data flow",
          "Role-based access control",
          "Automated workflows",
          "Custom reporting dashboard",
          "Data migration support",
        ],
      },
      {
        name: "Inventory Management",
        description: "Track stock levels, orders, and supply chain with real-time visibility.",
        priceLabel: "Custom Quote",
        timeline: "3–6 Weeks",
        features: [
          "Real-time stock tracking",
          "Low stock alerts",
          "Supplier management",
          "Purchase order automation",
          "Barcode/QR scanning",
          "Inventory reports",
        ],
      },
      {
        name: "Billing System",
        description: "Automated invoicing, payment tracking, and financial reporting.",
        priceLabel: "Custom Quote",
        timeline: "3–5 Weeks",
        features: [
          "Invoice generation",
          "Payment tracking",
          "Tax calculation",
          "Financial reports",
          "Multi-currency support",
          "Recurring billing",
        ],
      },
      {
        name: "HR Management",
        description: "Employee records, attendance, payroll, and performance tracking.",
        priceLabel: "Custom Quote",
        timeline: "4–6 Weeks",
        features: [
          "Employee database",
          "Attendance tracking",
          "Payroll processing",
          "Leave management",
          "Performance reviews",
          "Document management",
        ],
      },
      {
        name: "CRM Development",
        description: "Manage leads, track sales pipelines, and build stronger customer relationships.",
        priceLabel: "Custom Quote",
        timeline: "4–8 Weeks",
        features: [
          "Lead management",
          "Sales pipeline tracking",
          "Contact history",
          "Automated follow-ups",
          "Sales analytics",
          "Email integration",
        ],
      },
    ],
  },
  {
    id: "data-analytics",
    badge: "Data Analytics",
    title: "Data Analytics",
    highlight: "Analytics",
    subtitle: "Turn raw data into clear, actionable business insights.",
    icon: BarChart3,
    cards: [
      {
        name: "Power BI Dashboard",
        description: "Interactive dashboards pulling from multiple data sources with real-time KPIs.",
        price: "₹9,999",
        priceLabel: "Starting From",
        timeline: "1–2 Weeks",
        features: [
          "Executive KPI dashboard",
          "Drill-down capability",
          "Automated data refresh",
          "Scheduled email reports",
          "Mobile-optimized views",
          "Role-based access",
        ],
      },
      {
        name: "Business Analytics",
        description: "Deep-dive analytics across sales, operations, and finance with predictive insights.",
        price: "₹14,999",
        priceLabel: "Starting From",
        timeline: "2–3 Weeks",
        popular: true,
        features: [
          "Multi-source data integration",
          "Custom DAX measures",
          "Anomaly detection & alerts",
          "Trend analysis & forecasting",
          "Custom report builder",
          "Data cleansing & modeling",
        ],
      },
      {
        name: "Data Visualization",
        description: "Beautiful, informative charts and visual reports for presentations and dashboards.",
        price: "₹9,999",
        priceLabel: "Starting From",
        timeline: "1–2 Weeks",
        features: [
          "Interactive chart design",
          "Storytelling with data",
          "Export to PDF/PPT",
          "Real-time data connections",
          "Custom color themes",
          "Embeddable visualizations",
        ],
      },
    ],
  },
  {
    id: "digital-marketing",
    badge: "Digital Marketing",
    title: "Digital Marketing",
    highlight: "Marketing",
    subtitle: "Search optimization and marketing strategies that drive qualified traffic and leads.",
    icon: Megaphone,
    cards: [
      {
        name: "SEO",
        description: "Technical SEO, on-page optimization, and content strategy for better search rankings.",
        price: "₹4,999/mo",
        priceLabel: "Starting From",
        timeline: "Ongoing",
        features: [
          "Technical SEO audit",
          "On-page optimization",
          "Content strategy",
          "Link building",
          "Monthly reporting",
          "Performance tracking",
        ],
      },
      {
        name: "GEO",
        description: "Generative Engine Optimization — make AI search engines recommend your business.",
        price: "₹5,999/mo",
        priceLabel: "Starting From",
        timeline: "Ongoing",
        popular: true,
        features: [
          "AI search optimization",
          "Content structuring for LLMs",
          "FAQ & schema optimization",
          "Brand mention strategy",
          "Authority building",
          "AI overview tracking",
        ],
      },
      {
        name: "AEO",
        description: "Answer Engine Optimization — rank for featured snippets, voice search, and zero-click.",
        price: "₹4,999/mo",
        priceLabel: "Starting From",
        timeline: "Ongoing",
        features: [
          "Featured snippet optimization",
          "Voice search structuring",
          "FAQ page optimization",
          "Knowledge panel setup",
          "Rich results markup",
          "Query intent mapping",
        ],
      },
      {
        name: "Social Media Marketing",
        description: "Strategic social media management, content creation, and audience growth.",
        price: "₹7,999/mo",
        priceLabel: "Starting From",
        timeline: "Ongoing",
        features: [
          "Content calendar planning",
          "Post creation & scheduling",
          "Community management",
          "Audience growth strategy",
          "Performance analytics",
          "Ad campaign management",
        ],
      },
    ],
  },
  {
    id: "consulting",
    badge: "Consulting",
    title: "Consulting",
    highlight: "Consulting",
    subtitle: "Expert guidance to make the right technology decisions for your business.",
    icon: Lightbulb,
    cards: [
      {
        name: "Technical Consultation",
        description: "Architecture reviews, technology selection, and technical strategy for your projects.",
        price: "₹999/hr",
        priceLabel: "",
        timeline: "On Demand",
        features: [
          "Technology assessment",
          "Architecture review",
          "Code quality audit",
          "Scalability planning",
          "Security evaluation",
        ],
      },
      {
        name: "Business Consultation",
        description: "Digital transformation strategy, process optimization, and growth planning.",
        price: "₹1,499/hr",
        priceLabel: "",
        timeline: "On Demand",
        popular: true,
        features: [
          "Digital transformation roadmap",
          "Process optimization",
          "Technology alignment",
          "Vendor evaluation",
          "ROI analysis",
          "Implementation planning",
        ],
      },
      {
        name: "Architecture Review",
        description: "Deep review of your system architecture, performance, and scalability posture.",
        priceLabel: "Custom Quote",
        timeline: "1–2 Weeks",
        features: [
          "System architecture audit",
          "Performance bottleneck analysis",
          "Scalability assessment",
          "Security vulnerability review",
          "Recommendation report",
        ],
      },
      {
        name: "Digital Transformation Consulting",
        description: "End-to-end digital transformation strategy for enterprises modernizing operations.",
        priceLabel: "Custom Quote",
        timeline: "4–8 Weeks",
        features: [
          "Current state assessment",
          "Transformation roadmap",
          "Technology selection",
          "Change management",
          "Implementation oversight",
          "Success metrics definition",
        ],
      },
    ],
  },
];

/* ─── Enterprise data ─── */

const enterpriseFeatures = [
  "Large-scale AI model deployment",
  "Enterprise ERP & CRM systems",
  "Cloud infrastructure & DevOps",
  "Custom enterprise software",
  "Data warehousing & analytics",
  "System integration & APIs",
  "Dedicated project team",
  "SLA-backed support",
];

const enterpriseActions = [
  { icon: FileText, label: "Request a Proposal" },
  { icon: Users, label: "Schedule a Consultation" },
  { icon: Phone, label: "Contact Sales" },
];

/* ─── Why Choose data ─── */

const whyChoose = [
  { icon: Shield, label: "Transparent Pricing", desc: "Clear, upfront costs with no surprises." },
  { icon: CheckCircle2, label: "No Hidden Charges", desc: "What we quote is what you pay." },
  { icon: Zap, label: "Agile Development", desc: "Iterative delivery with regular updates." },
  { icon: Headphones, label: "Dedicated Support", desc: "Post-launch support and maintenance." },
  { icon: TrendingUp, label: "Scalable Solutions", desc: "Built to grow with your business." },
  { icon: Target, label: "Business-Focused", desc: "Every feature tied to a business outcome." },
];

/* ─── FAQ data ─── */

const pricingFAQs = [
  {
    q: "Why are some services listed as Custom Quote?",
    a: "ERP systems, AI solutions, and automation platforms vary widely in scope. Custom quotes ensure you only pay for what your business actually needs — no inflated packages or unnecessary features.",
  },
  {
    q: "How long does a typical project take?",
    a: "Landing pages take 3–5 days. Business websites take 2–3 weeks. ERP and AI projects range from 4–12 weeks depending on complexity. Every proposal includes a detailed timeline.",
  },
  {
    q: "Can pricing change after the initial quote?",
    a: "Only if the project scope changes. We follow a transparent change request process — any additional work is quoted and approved before implementation begins.",
  },
  {
    q: "Do you offer maintenance and support?",
    a: "Yes. We offer monthly support plans covering bug fixes, updates, performance monitoring, and minor feature additions. Support plans start after project delivery.",
  },
  {
    q: "Can I upgrade or expand later?",
    a: "Absolutely. Our solutions are built to scale. You can add modules, features, and integrations as your business grows — without rebuilding from scratch.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We work with clients across time zones. Communication happens through email, Slack, WhatsApp, and scheduled video calls to keep everyone aligned.",
  },
];

/* ─── Pricing Notice items ─── */

const noticeItems = [
  "Project Scope",
  "Features & Complexity",
  "Integrations Required",
  "Technology Stack",
  "Timeline & Deadlines",
  "Team Size",
  "Deployment Requirements",
];

/* ─── Subcomponents ─── */

function SectionBadge({ label }: { label: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
      {label}
    </motion.span>
  );
}

function SectionHeading({ title, highlight, subtitle }: { title: string; highlight: string; subtitle: string }) {
  const parts = title.split(highlight);
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl font-extrabold tracking-tight sm:text-4xl"
      >
        {parts[0]}
        <span className="text-gradient">{highlight}</span>
        {parts[1] || ""}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-primary to-accent"
      />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground"
      >
        {subtitle}
      </motion.p>
    </>
  );
}

function PricingCardComponent({ card, index }: { card: PricingCard; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`group relative flex flex-col overflow-hidden rounded-[20px] border bg-white transition-all duration-300 ${
        card.popular
          ? "border-primary/30 shadow-[0_4px_24px_rgba(37,99,235,0.10),0_16px_48px_rgba(0,0,0,0.05)]"
          : "border-white/40 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(37,99,235,0.03)]"
      } hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.10),0_16px_48px_rgba(0,0,0,0.05)]`}
    >
      {/* Popular badge */}
      {card.popular && (
        <div className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-3 py-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">Popular</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Name + price */}
        <div className="mb-4">
          <h4 className="text-lg font-bold text-foreground">{card.name}</h4>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
            {card.description}
          </p>
        </div>

        {/* Price */}
        <div className="mb-5">
          {card.price ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {card.priceLabel || "Starting From"}
              </p>
              <p className="mt-0.5 text-2xl font-extrabold text-primary">{card.price}</p>
            </>
          ) : (
            <p className="text-lg font-bold text-foreground">{card.priceLabel || "Custom Quote"}</p>
          )}
          {card.timeline && (
            <div className="mt-2 flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {card.timeline}
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="mb-6 flex-1 space-y-2">
          {card.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="text-[13px] text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
            card.popular
              ? "btn-premium text-white"
              : "border border-white/40 bg-white text-foreground shadow-sm hover:border-primary/30 hover:text-primary hover:shadow-md"
          }`}
        >
          Get Started
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

function PricingFAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/40 bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-[15px] font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <p className="text-[14px] leading-relaxed text-muted-foreground">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─── */

export function PricingSection() {
  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden bg-white pt-[140px] pb-12 lg:pt-[160px] lg:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#eaf6ff_0%,transparent_60%)]" />
          <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.06] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.span
              variants={fadeInUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Pricing
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[56px]"
            >
              Transparent{" "}
              <span className="text-gradient">Pricing</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-primary to-accent"
            />

            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              Flexible pricing tailored for startups, SMEs, and enterprises.
              Every solution is designed around your business goals.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <a
                href="#contact"
                className="group relative z-10 inline-flex min-w-[260px] shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full btn-premium px-8 py-[14px] text-[16px] font-semibold leading-[1.2] tracking-[0.2px] text-white"
                style={{ fontFeatureSettings: '"liga" 1, "calt" 1' }}
              >
                Book Free Consultation
                <ArrowRight className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full btn-glass px-7 py-3.5 text-[15px] font-semibold text-foreground"
              >
                Request Proposal
                <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PRICING SECTIONS ═══════════ */}
      {sections.map((section, sIdx) => (
        <section
          key={section.id}
          id={section.id}
          className={`relative overflow-hidden py-12 lg:py-16 ${
            sIdx % 2 === 0 ? "bg-white" : "bg-gradient-to-b from-white to-[#f8fbff]"
          }`}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-[20%] right-[5%] h-[300px] w-[300px] rounded-full bg-[#dbeafe] opacity-[0.06] blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-8 text-center lg:mb-10">
              <SectionBadge label={section.badge} />
              <SectionHeading
                title={section.title}
                highlight={section.highlight}
                subtitle={section.subtitle}
              />
            </div>

            {/* Cards grid */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-60px" }}
              className={`grid gap-5 ${
                section.cards.length <= 3
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : section.cards.length === 4
                    ? "sm:grid-cols-2 lg:grid-cols-4"
                    : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              }`}
            >
              {section.cards.map((card, i) => (
                <PricingCardComponent key={card.name} card={card} index={i} />
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* ═══════════ ENTERPRISE ═══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[20%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#2563eb] opacity-[0.08] blur-[150px]" />
          <div className="absolute bottom-[10%] right-[15%] h-[300px] w-[300px] rounded-full bg-[#60a5fa] opacity-[0.06] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#60a5fa]">
                <Building2 className="h-3.5 w-3.5" />
                Enterprise
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[44px]">
                Enterprise{" "}
                <span className="bg-gradient-to-r from-[#60a5fa] to-[#93c5fd] bg-clip-text text-transparent">
                  Solutions
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-gray-400">
                Large-scale AI, ERP, cloud, and enterprise software solutions are tailored to each
                organization&apos;s unique requirements. No cookie-cutter packages.
              </p>

              {/* Actions list */}
              <div className="mt-8 space-y-3">
                {enterpriseActions.map((action) => (
                  <div key={action.label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                      <action.icon className="h-4 w-4 text-[#60a5fa]" />
                    </div>
                    <span className="text-[14px] font-medium text-gray-300">{action.label}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_4px_24px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
                >
                  Request Proposal
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-7 py-3.5 text-[14px] font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/[0.1] hover:border-white/20"
                >
                  Book Enterprise Meeting
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.div>

            {/* Right — features grid */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {enterpriseFeatures.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.04] px-5 py-4 backdrop-blur"
                >
                  <Check className="h-4 w-4 shrink-0 text-[#60a5fa]" />
                  <span className="text-[13px] font-medium text-gray-300">{feat}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING NOTICE ═══════════ */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl overflow-hidden rounded-[24px] border border-white/40 bg-gradient-to-br from-muted to-primary/[0.04]"
            style={{
              boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 8px 32px rgba(37,99,235,0.03)",
            }}
          >
            <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-start sm:p-10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/[0.06]">
                <Info className="h-5 w-5 text-primary" strokeWidth={2} />
              </div>

              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-foreground">Pricing Notice</h3>
                <p className="mb-5 text-[15px] leading-relaxed text-muted-foreground">
                  Final pricing depends on your project&apos;s specific requirements:
                </p>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {noticeItems.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/[0.06] text-[10px] font-bold text-primary">
                        ✓
                      </span>
                      <span className="text-[14px] font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-[14px] leading-relaxed text-muted-foreground">
                  Every proposal is customized to meet your business goals. A detailed breakdown with milestones is shared after understanding your project.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE YESBE ═══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f8fbff] py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-[#dbeafe] opacity-[0.06] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div           className="mb-8 text-center lg:mb-10">
            <SectionBadge label="Why YesBe" />
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Why Choose{" "}
              <span className="text-gradient">YesBe</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {whyChoose.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                className="group flex items-start gap-4 rounded-[20px] border border-white/40 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/[0.06] transition-colors duration-300 group-hover:bg-primary/[0.1]">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-foreground">{item.label}</h4>
                  <p className="mt-1 text-[13px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center lg:mb-10">
            <SectionBadge label="FAQ" />
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Pricing{" "}
              <span className="text-gradient">Questions</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl space-y-3"
          >
            {pricingFAQs.map((faq) => (
              <PricingFAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fbff] to-white py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,#eaf6ff_0%,transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-white/40 bg-gradient-to-br from-white via-muted to-primary/[0.04] p-10 text-center sm:p-14"
            style={{
              boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 12px 40px rgba(37,99,235,0.06), 0 32px 80px rgba(0,0,0,0.02)",
            }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Let&apos;s Build Something{" "}
              <span className="text-gradient">Great Together</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto mb-10 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
            >
              Tell us about your project and we&apos;ll prepare a solution tailored to your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <a
                href="#contact"
                className="group relative z-10 inline-flex min-w-[260px] shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full btn-premium px-8 py-[14px] text-[16px] font-semibold leading-[1.2] tracking-[0.2px] text-white"
                style={{ fontFeatureSettings: '"liga" 1, "calt" 1' }}
              >
                Book Free Consultation
                <ArrowRight className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full btn-glass px-7 py-3.5 text-[15px] font-semibold text-foreground"
              >
                Request Proposal
                <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href={SITE_CONFIG.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full btn-glass px-7 py-3.5 text-[15px] font-semibold text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-[#25c06c]" />
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
