import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Boxes,
  Brain,
  ClipboardCheck,
  Cloud,
  Code2,
  Compass,
  Database,
  Factory,
  Gauge,
  Globe,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers,
  Map,
  Megaphone,
  Network,
  RefreshCw,
  Rocket,
  Search,
  Shield,
  ShoppingBag,
  Target,
  Truck,
  Users,
  Waypoints,
  Workflow,
} from "lucide-react";

export type ServiceVisualVariant =
  | "intelligence"
  | "enterprise"
  | "web"
  | "cloud"
  | "transformation"
  | "product"
  | "company";

export interface CoreService {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  visual: ServiceVisualVariant;
}

export const CORE_SERVICES: CoreService[] = [
  {
    title: "AI & Intelligent Automation",
    slug: "ai-solutions",
    description:
      "Practical AI, document intelligence and automation that remove repeat work and make information easier to act on.",
    tags: ["AI assistants", "Workflow automation", "Applied ML"],
    icon: Brain,
    visual: "intelligence",
  },
  {
    title: "ERP & CRM Systems",
    slug: "erp-systems",
    description:
      "One operational system for finance, inventory, sales and customer records — shaped around how your teams actually work.",
    tags: ["ERP implementation", "CRM integration", "Operational reporting"],
    icon: Boxes,
    visual: "enterprise",
  },
  {
    title: "Website & Web Application Development",
    slug: "website-development",
    description:
      "Corporate sites, commerce and internal applications built for clarity, speed and the work people need to complete.",
    tags: ["Corporate sites", "E-commerce", "Web applications"],
    icon: Globe,
    visual: "web",
  },
  {
    title: "Cloud, Data & DevOps",
    slug: "cloud-devops",
    description:
      "Cloud infrastructure, integrations and analytics that keep systems available and decisions based on current data.",
    tags: ["Cloud migration", "DevOps", "Analytics"],
    icon: Cloud,
    visual: "cloud",
  },
  {
    title: "Digital Transformation & IT Consulting",
    slug: "it-consulting",
    description:
      "Independent diagnosis, a costed roadmap and phased change that integrates with the systems you already run.",
    tags: ["Technology audit", "Roadmap", "Phased delivery"],
    icon: Compass,
    visual: "transformation",
  },
  {
    title: "Custom Software & Product Engineering",
    slug: "custom-software",
    description:
      "Purpose-built platforms and tools for processes that generic software cannot fit without compromise.",
    tags: ["Product engineering", "Internal tools", "API integration"],
    icon: Code2,
    visual: "product",
  },
];

export const SERVICE_PILLAR_BY_SLUG: Record<string, ServiceVisualVariant> = {
  "ai-solutions": "intelligence",
  "ai-chatbots": "intelligence",
  "business-automation": "intelligence",
  "erp-systems": "enterprise",
  "website-development": "web",
  "web-applications": "web",
  ecommerce: "web",
  "cloud-devops": "cloud",
  "database-management": "cloud",
  "data-analytics": "cloud",
  "power-bi-dashboards": "cloud",
  "api-development": "cloud",
  "it-consulting": "transformation",
  "digital-transformation": "transformation",
  "custom-software": "product",
};

export interface ServiceDirectoryGroup {
  title: string;
  description: string;
  slugs: string[];
}

export const SERVICE_DIRECTORY_GROUPS: ServiceDirectoryGroup[] = [
  {
    title: "Strategy & advisory",
    description: "Establish the right sequence before committing to a build.",
    slugs: ["it-consulting", "digital-transformation", "business-automation"],
  },
  {
    title: "AI & data",
    description: "Turn operational data into useful automation, analysis and decisions.",
    slugs: ["ai-solutions", "ai-chatbots", "data-analytics", "power-bi-dashboards"],
  },
  {
    title: "Enterprise platforms",
    description: "Connect the systems that run the business and replace workarounds.",
    slugs: ["erp-systems", "custom-software", "web-applications", "api-development", "database-management"],
  },
  {
    title: "Web & commerce",
    description: "Build the public and customer-facing surfaces of the business.",
    slugs: ["website-development", "ecommerce"],
  },
  {
    title: "Cloud & reliability",
    description: "Make infrastructure, delivery and recovery deliberate rather than improvised.",
    slugs: ["cloud-devops"],
  },
  {
    title: "Growth & discoverability",
    description: "Help the right audience find, understand and choose the business.",
    slugs: ["seo", "geo", "aeo", "digital-marketing"],
  },
];

export interface BusinessChallenge {
  title: string;
  description: string;
  change: string;
  signals: [string, string, string];
  icon: LucideIcon;
  link: { label: string; to: string };
}

export const BUSINESS_CHALLENGES: BusinessChallenge[] = [
  {
    title: "Growth is outrunning the operating model",
    description:
      "Work is increasing, but the systems around it were designed for a smaller company. Orders, approvals and reports still move through spreadsheets, inboxes and individual memory.",
    change:
      "Map the real workflow, remove duplicate handoffs and give each step a clear owner and visible status.",
    signals: ["Manual re-entry", "Approval delays", "Work held by individuals"],
    icon: Workflow,
    link: { label: "Explore business automation", to: "/services/business-automation" },
  },
  {
    title: "Systems do not speak to each other",
    description:
      "Finance, sales, operations and support each hold a partial version of the truth. Someone has to reconcile them before a decision can be made.",
    change:
      "Connect the systems you already run, define a shared data model and remove the reconciliation layer.",
    signals: ["Duplicate records", "Reconciliation work", "No shared status"],
    icon: Network,
    link: { label: "Explore ERP and integrations", to: "/services/erp-systems" },
  },
  {
    title: "The website is credible, but not useful",
    description:
      "The site explains what the business does, yet makes it difficult for a buyer to understand the next step, compare capabilities or start a useful conversation.",
    change:
      "Rebuild the content and interaction around buyer questions, clear service paths and a measurable next action.",
    signals: ["Unclear journeys", "Weak differentiation", "Low enquiry quality"],
    icon: Globe,
    link: { label: "Explore website development", to: "/services/website-development" },
  },
  {
    title: "The data exists, but decisions still wait",
    description:
      "Reports are assembled manually from several sources and arrive after the moment they were needed. Teams spend time formatting numbers instead of interpreting them.",
    change:
      "Create a dependable reporting layer with current data, agreed definitions and access for the people who act on it.",
    signals: ["Monthly reporting lag", "Conflicting numbers", "Spreadsheet dependency"],
    icon: BarChart3,
    link: { label: "Explore data and Power BI", to: "/services/data-analytics" },
  },
  {
    title: "AI feels urgent, but the use case is unclear",
    description:
      "There is pressure to adopt AI, but no shared view of where it would improve a real process, what data it needs or how the result will be evaluated.",
    change:
      "Start with one contained workflow, define the evidence of success and build a grounded system before expanding.",
    signals: ["Tool-led experiments", "Unclear ownership", "No evaluation plan"],
    icon: Brain,
    link: { label: "Explore AI solutions", to: "/services/ai-solutions" },
  },
];

export interface IndustrySpotlight {
  slug: string;
  focus: string;
  icon: LucideIcon;
}

export const INDUSTRY_SPOTLIGHTS: IndustrySpotlight[] = [
  { slug: "healthcare", focus: "Patient operations", icon: HeartPulse },
  { slug: "education", focus: "Student and institutional systems", icon: GraduationCap },
  { slug: "retail", focus: "Commerce and inventory", icon: ShoppingBag },
  { slug: "manufacturing", focus: "Production and quality", icon: Factory },
  { slug: "logistics", focus: "Fleet and delivery visibility", icon: Truck },
  { slug: "finance", focus: "Reporting and controls", icon: Landmark },
];

export const PARTNERSHIP_POINTS: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: "Senior people in the work",
    description:
      "You speak with the people who shape the solution and remain involved through delivery, not only during the sales conversation.",
    icon: Users,
  },
  {
    title: "Scope before spend",
    description:
      "We define the problem, constraints and first useful release before asking you to commit to a larger programme.",
    icon: Target,
  },
  {
    title: "Maintainable systems",
    description:
      "Documented architecture and code that another team can understand, operate and extend without reverse-engineering it first.",
    icon: Shield,
  },
  {
    title: "An honest handover",
    description:
      "Access, credentials, documentation and open decisions are transferred clearly. The system should not depend on our continued presence.",
    icon: ClipboardCheck,
  },
  {
    title: "Support beyond launch",
    description:
      "Launch is a monitored transition, not the point where the team disappears. We plan for fixes, adoption and the next iteration.",
    icon: Rocket,
  },
];

export interface DeliveryStage {
  title: string;
  summary: string;
  detail: string;
  artefacts: string[];
  icon: LucideIcon;
}

export const DELIVERY_STAGES: DeliveryStage[] = [
  {
    title: "Diagnose",
    summary: "Understand the work before proposing the technology.",
    detail:
      "We speak to the people doing the work, review the current systems and separate the visible symptom from the underlying constraint.",
    artefacts: ["Stakeholder interviews", "System and process map", "Prioritised problem statement"],
    icon: Search,
  },
  {
    title: "Architect",
    summary: "Turn the problem into a bounded, sequenced plan.",
    detail:
      "Scope, dependencies, architecture and success measures are agreed in writing. The first release is chosen because it is useful, not because it is easy to demo.",
    artefacts: ["Delivery scope", "Architecture decision", "Milestones and acceptance criteria"],
    icon: Map,
  },
  {
    title: "Build",
    summary: "Ship in visible increments with review built in.",
    detail:
      "Design and engineering move together in short cycles. Working software is reviewed against the actual workflow, so surprises are found while they are still inexpensive.",
    artefacts: ["Working increments", "Design system", "Test coverage and review notes"],
    icon: Code2,
  },
  {
    title: "Launch",
    summary: "Make the transition controlled and observable.",
    detail:
      "We prepare data migration, permissions, performance checks, monitoring and rollback plans. The people who use the system are prepared before go-live.",
    artefacts: ["Migration plan", "Launch checklist", "Monitoring and recovery plan"],
    icon: Rocket,
  },
  {
    title: "Improve",
    summary: "Use evidence from operation to decide what comes next.",
    detail:
      "After launch we review behaviour, support issues and operational signals. Improvements are prioritised against the business outcome, not a feature backlog.",
    artefacts: ["Support review", "Usage and performance review", "Next-stage roadmap"],
    icon: RefreshCw,
  },
];

export const HOME_ARTICLE_SLUGS = ["ai-for-business", "erp-vs-crm", "web-dev-tech-stack"] as const;

export const FEATURED_CASE_STUDY_SLUGS = ["fashion-fusion", "restaurant-qr-ordering", "library-management"] as const;

export const RELATED_ARTICLE_SLUGS: Record<string, [string, string]> = {
  "ai-solutions": ["ai-for-business", "rag-implementation"],
  "ai-chatbots": ["ai-chatbots-explained", "ai-chatbot-customer-support-use-cases"],
  "erp-systems": ["erp-vs-crm", "erp-software-growing-businesses"],
  "website-development": ["web-dev-tech-stack", "website-development-cost-india"],
  "web-applications": ["web-dev-tech-stack", "business-tips-scale"],
  ecommerce: ["ecommerce-case-study", "business-website-lead-generation"],
  "business-automation": ["business-automation", "automating-repetitive-office-work"],
  "data-analytics": ["data-analytics-strategy", "business-intelligence-guide"],
  "power-bi-dashboards": ["power-bi-guide", "power-bi-vs-excel"],
  "cloud-devops": ["cloud-computing", "cybersecurity-essentials"],
  "database-management": ["data-analytics-strategy", "cloud-computing"],
  "api-development": ["web-dev-tech-stack", "rag-implementation"],
  seo: ["seo-guide-2026", "how-to-rank-on-google"],
  geo: ["geo-optimization", "seo-guide-2026"],
  aeo: ["aeo-answer-engines", "seo-checklist"],
  "digital-marketing": ["digital-marketing-strategy", "business-website-lead-generation"],
  "custom-software": ["business-tips-scale", "startup-mvp-guide"],
  "it-consulting": ["local-business-digital-transformation-checklist", "technology-trends-2026"],
  "digital-transformation": ["local-business-digital-transformation-checklist", "erp-software-growing-businesses"],
};

export const CAPABILITY_INDEX = [
  { label: "Strategy", detail: "Diagnose", icon: Compass },
  { label: "Build", detail: "Design and engineer", icon: Layers },
  { label: "Intelligence", detail: "Automate and analyse", icon: Gauge },
  { label: "Scale", detail: "Run and improve", icon: Rocket },
] as const;

export const SERVICE_DIRECTORY_ICONS: Record<string, LucideIcon> = {
  "ai-solutions": Brain,
  "ai-chatbots": Brain,
  "erp-systems": Boxes,
  "website-development": Globe,
  "web-applications": Code2,
  ecommerce: ShoppingBag,
  "business-automation": Workflow,
  "data-analytics": BarChart3,
  "power-bi-dashboards": BarChart3,
  "cloud-devops": Cloud,
  "database-management": Database,
  "api-development": Waypoints,
  seo: Search,
  geo: Search,
  aeo: Search,
  "digital-marketing": Megaphone,
  "custom-software": Code2,
  "it-consulting": Compass,
  "digital-transformation": Waypoints,
};
