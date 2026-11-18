import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import type { IndustryDetail } from "@/data/industries";

export const PROJECT_FILTERS = [
  "All projects",
  "E-commerce",
  "Enterprise Applications",
  "Automation",
  "AI & Analytics",
  "Web Applications",
  "Business Management Systems",
] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export interface ProjectMeta {
  filters: ProjectFilter[];
  accent: string;
  featured: number;
}

export const PROJECT_META: Record<string, ProjectMeta> = {
  "fashion-fusion": { filters: ["E-commerce", "Web Applications"], accent: "#7dd3fc", featured: 1 },
  "erp-management": {
    filters: ["Business Management Systems", "Enterprise Applications"],
    accent: "#8eb5ff",
    featured: 2,
  },
  "ai-business-assistant": {
    filters: ["AI & Analytics", "Enterprise Applications"],
    accent: "#a5b4fc",
    featured: 3,
  },
  "restaurant-qr-ordering": {
    filters: ["Automation", "Enterprise Applications"],
    accent: "#fbbf24",
    featured: 4,
  },
  "library-management": {
    filters: ["Enterprise Applications", "Business Management Systems"],
    accent: "#86efac",
    featured: 5,
  },
  "business-automation": {
    filters: ["Automation", "Enterprise Applications"],
    accent: "#67e8f9",
    featured: 6,
  },
  "powerbi-dashboard": { filters: ["AI & Analytics"], accent: "#c4b5fd", featured: 7 },
  "business-portfolio": { filters: ["Web Applications"], accent: "#f0abfc", featured: 8 },
  "seo-digital-growth": {
    filters: ["Web Applications", "AI & Analytics"],
    accent: "#fca5a5",
    featured: 9,
  },
};

export const orderedCaseStudies: CaseStudy[] = [...caseStudies].sort(
  (a, b) => getProjectMeta(a.slug).featured - getProjectMeta(b.slug).featured,
);

export function getProjectMeta(slug: string): ProjectMeta {
  return (
    PROJECT_META[slug] ?? {
      filters: ["Web Applications"],
      accent: "#8eb5ff",
      featured: 99,
    }
  );
}

export interface IndustryProfile {
  slug: string;
  summary: string;
  context: string;
  constraints: string[];
  applications: { title: string; description: string }[];
  architecture: { label: string; detail: string }[];
  relatedProjectSlugs: string[];
  relatedServiceSlugs: string[];
  visual: { src: string; alt: string; accent: string };
}

export const INDUSTRY_PROFILES: Record<string, IndustryProfile> = {
  healthcare: {
    slug: "healthcare",
    summary:
      "Connected patient, scheduling and operational systems that reduce administrative handoffs without compromising access control.",
    context:
      "Patient information, appointments, billing and reporting are usually held in separate systems. Staff bridge the gaps by re-entering data, checking status by phone or reconciling records after the fact.",
    constraints: [
      "Appointment, patient and billing records sit in different tools",
      "Administrative handoffs depend on manual checks",
      "Operational reporting is assembled after the decision was needed",
      "Access, consent and audit requirements limit how systems can connect",
    ],
    applications: [
      {
        title: "Appointment and intake flow",
        description:
          "A clear path from enquiry to scheduled appointment, with the information each team needs visible at the right stage.",
      },
      {
        title: "Patient and administrative records",
        description:
          "A structured record for the non-clinical information that currently lives in spreadsheets, inboxes and notes.",
      },
      {
        title: "Billing and reconciliation",
        description:
          "A traceable link between a completed service, the billing entry and the exception that needs attention.",
      },
      {
        title: "Operational reporting",
        description:
          "Scheduled visibility of waiting lists, utilisation, exceptions and throughput, built from current records.",
      },
    ],
    architecture: [
      { label: "Intake & scheduling", detail: "Enquiry, appointment and patient-facing status" },
      { label: "Care administration", detail: "Non-clinical records, ownership and handoffs" },
      { label: "Integration layer", detail: "Controlled connections to existing systems" },
      { label: "Reporting & audit", detail: "Current operational views and traceable access" },
    ],
    relatedProjectSlugs: ["ai-business-assistant", "powerbi-dashboard", "business-automation"],
    relatedServiceSlugs: ["custom-software", "api-development", "data-analytics", "erp-systems"],
    visual: {
      src: "/images/industries/healthcare.webp",
      alt: "Clinical healthcare setting supporting connected operations",
      accent: "#7dd3fc",
    },
  },
  education: {
    slug: "education",
    summary:
      "Student, library and administrative workflows joined into a maintainable system that staff can operate without specialist help.",
    context:
      "Student records, library lending, course administration and reporting are often split across departmental tools and spreadsheets. Staff spend time reconciling the same information instead of supporting students.",
    constraints: [
      "Student and course records are duplicated across departments",
      "Library and resource availability is not visible in one place",
      "Reporting depends on manual exports at the end of a period",
      "Different roles need different access without extra administration",
    ],
    applications: [
      {
        title: "Student and course records",
        description:
          "A shared source for enrolment, course status and the administrative notes that support each student.",
      },
      {
        title: "Library and resource management",
        description:
          "Catalogue search, issue and return tracking, reservations and overdue handling in one workflow.",
      },
      {
        title: "Departmental reporting",
        description:
          "Recurring reports assembled from current records rather than exported and rebuilt each cycle.",
      },
      {
        title: "Role-based portals",
        description:
          "Appropriate views for administrators, teaching staff and students without maintaining separate systems.",
      },
    ],
    architecture: [
      { label: "Student intake", detail: "Enquiry, enrolment and record creation" },
      { label: "Academic operations", detail: "Courses, resources and departmental workflows" },
      { label: "Shared data layer", detail: "One record per student, course and resource" },
      { label: "Reporting & access", detail: "Role-based views and scheduled reporting" },
    ],
    relatedProjectSlugs: ["library-management", "powerbi-dashboard", "business-portfolio"],
    relatedServiceSlugs: ["erp-systems", "custom-software", "web-applications", "data-analytics"],
    visual: {
      src: "/images/industries/education.webp",
      alt: "Modern learning environment supporting education systems",
      accent: "#a5b4fc",
    },
  },
  retail: {
    slug: "retail",
    summary:
      "A connected catalogue, order and inventory model that gives retail teams one view of what is available, sold and owed.",
    context:
      "Catalogue, stock, orders and customer conversations are spread across marketplace tools, spreadsheets and messaging. The business cannot see availability or margin in one place, and staff re-enter the same order several times.",
    constraints: [
      "Product and stock data lives in several disconnected tools",
      "Orders arrive through channels that do not share a record",
      "Availability is checked manually before a customer is answered",
      "Sales reporting is rebuilt from exports rather than read live",
    ],
    applications: [
      {
        title: "Catalogue and stock",
        description:
          "One searchable product record with availability, pricing and the history behind each change.",
      },
      {
        title: "Order and fulfilment flow",
        description:
          "A structured path from order capture to dispatch, including exceptions and customer updates.",
      },
      {
        title: "Customer and enquiry records",
        description:
          "A shared view of the conversation, order and account rather than a thread in someone's inbox.",
      },
      {
        title: "Commercial reporting",
        description:
          "Current revenue, margin and product performance without closing the till and rebuilding a spreadsheet.",
      },
    ],
    architecture: [
      { label: "Storefront & channels", detail: "Catalogue, enquiry and order capture" },
      { label: "Commerce operations", detail: "Orders, fulfilment and customer records" },
      { label: "Inventory & payments", detail: "Stock movements and payment status" },
      { label: "Commercial reporting", detail: "Sales, margin and product performance" },
    ],
    relatedProjectSlugs: ["fashion-fusion", "business-automation", "powerbi-dashboard"],
    relatedServiceSlugs: ["ecommerce", "custom-software", "api-development", "data-analytics"],
    visual: {
      src: "/images/industries/retail.webp",
      alt: "Retail store environment supporting connected commerce",
      accent: "#f0abfc",
    },
  },
  manufacturing: {
    slug: "manufacturing",
    summary:
      "Production, inventory, purchasing and quality records connected into a planning view that reflects the current shop floor.",
    context:
      "Production, inventory, purchasing and quality records are often distributed across departments and legacy files. Planning depends on the latest version of a spreadsheet, and exceptions are found after the schedule has already moved.",
    constraints: [
      "Production and inventory status is not visible in one place",
      "Purchasing and supplier records sit outside the planning view",
      "Quality exceptions are recorded after the fact",
      "Legacy data has to be migrated without stopping operations",
    ],
    applications: [
      {
        title: "Production planning",
        description:
          "A current view of work orders, capacity and dependencies rather than a static schedule.",
      },
      {
        title: "Inventory and purchasing",
        description:
          "Stock positions, reorder points and supplier records linked to the work that needs them.",
      },
      {
        title: "Quality and exceptions",
        description:
          "A defined path for recording an exception, assigning ownership and closing the loop.",
      },
      {
        title: "Operational reporting",
        description:
          "Throughput, utilisation and exception trends assembled from operational records.",
      },
    ],
    architecture: [
      { label: "Sales & demand", detail: "Orders, forecasts and committed dates" },
      { label: "Production & stock", detail: "Work orders, inventory and supplier records" },
      { label: "Legacy integration", detail: "Controlled migration and system connections" },
      { label: "Planning & quality", detail: "Current capacity, exceptions and reporting" },
    ],
    relatedProjectSlugs: ["erp-management", "powerbi-dashboard", "business-automation"],
    relatedServiceSlugs: ["erp-systems", "custom-software", "api-development", "data-analytics"],
    visual: {
      src: "/images/industries/manufacturing.webp",
      alt: "Factory production machinery supporting connected manufacturing",
      accent: "#fbbf24",
    },
  },
  logistics: {
    slug: "logistics",
    summary:
      "Dispatch, delivery and billing records linked so customer updates come from current shipment status rather than a manual check.",
    context:
      "Dispatch, proof of delivery, stock and billing status are tracked in different places. Customer updates depend on someone checking each shipment, and exceptions surface only when a customer asks.",
    constraints: [
      "Dispatch and delivery status is spread across systems",
      "Customer updates require a manual lookup",
      "Proof of delivery is not linked to billing",
      "Exceptions are discovered after the promised window",
    ],
    applications: [
      {
        title: "Dispatch and route status",
        description:
          "A shared operational view of what is moving, what is delayed and who owns the next action.",
      },
      {
        title: "Proof of delivery",
        description:
          "A structured record attached to the shipment and available to the billing workflow.",
      },
      {
        title: "Customer status updates",
        description:
          "Updates generated from current shipment data rather than typed by an operations team.",
      },
      {
        title: "Billing reconciliation",
        description:
          "A traceable connection between delivered work, the invoice and any exception.",
      },
    ],
    architecture: [
      { label: "Order intake", detail: "Shipment request, customer and service level" },
      { label: "Dispatch & delivery", detail: "Routes, status and proof of delivery" },
      { label: "Billing & partners", detail: "Invoices, carrier and customer records" },
      { label: "Visibility & alerts", detail: "Status reporting and exception ownership" },
    ],
    relatedProjectSlugs: ["business-automation", "erp-management", "powerbi-dashboard"],
    relatedServiceSlugs: ["custom-software", "api-development", "data-analytics", "web-applications"],
    visual: {
      src: "/images/industries/logistics.webp",
      alt: "Warehouse operations supporting connected logistics",
      accent: "#67e8f9",
    },
  },
  finance: {
    slug: "finance",
    summary:
      "Reporting, reconciliation and approval workflows built on a traceable data model rather than a cycle of manual exports.",
    context:
      "Reporting and approvals depend on exports from several systems. Reconciliation and exception handling consume time before a decision can be made, and the final numbers are difficult to trace back to their source.",
    constraints: [
      "Figures are assembled from several unreconciled exports",
      "Approvals depend on email or individual availability",
      "Exceptions are found during reconciliation, not at entry",
      "Access and audit requirements limit how data can be shared",
    ],
    applications: [
      {
        title: "Financial reporting",
        description:
          "A consistent model for revenue, cost and operational measures with drill-down to source records.",
      },
      {
        title: "Reconciliation workflow",
        description:
          "A defined path for matching records, flagging exceptions and recording the resolution.",
      },
      {
        title: "Approvals and controls",
        description:
          "Approval chains with an audit trail rather than a decision buried in an inbox.",
      },
      {
        title: "Exception reporting",
        description:
          "Recurring visibility of unmatched items and unresolved controls for the people who own them.",
      },
    ],
    architecture: [
      { label: "Source systems", detail: "Accounting, operations and imported data" },
      { label: "Reconciliation", detail: "Matching rules, exceptions and ownership" },
      { label: "Controls & approvals", detail: "Defined authority and audit trail" },
      { label: "Reporting", detail: "Current figures with source-level traceability" },
    ],
    relatedProjectSlugs: ["powerbi-dashboard", "ai-business-assistant", "business-automation"],
    relatedServiceSlugs: ["data-analytics", "power-bi-dashboards", "custom-software", "ai-solutions"],
    visual: {
      src: "/images/industries/finance.webp",
      alt: "Office desk with financial reports supporting connected finance",
      accent: "#86efac",
    },
  },
};

const FALLBACK_VISUALS: Record<string, { src: string; alt: string; accent: string }> = {
  startups: {
    src: "/images/industries/startups.webp",
    alt: "Startup team working together",
    accent: "#c4b5fd",
  },
  smes: {
    src: "/images/industries/smes.webp",
    alt: "Small business team meeting",
    accent: "#93c5fd",
  },
  "large-enterprises": {
    src: "/images/industries/large-enterprises.webp",
    alt: "Corporate office architecture",
    accent: "#8eb5ff",
  },
  hospitality: {
    src: "/images/industries/hospitality.webp",
    alt: "Hospitality interior used for restaurant operations",
    accent: "#fca5a5",
  },
  "real-estate": {
    src: "/images/industries/real-estate.webp",
    alt: "Residential property exterior",
    accent: "#fcd34d",
  },
};

const FALLBACK_PROJECTS: Record<string, string[]> = {
  startups: ["ai-business-assistant", "business-portfolio", "business-automation"],
  smes: ["erp-management", "business-automation", "powerbi-dashboard"],
  "large-enterprises": ["erp-management", "ai-business-assistant", "business-automation"],
  hospitality: ["restaurant-qr-ordering", "business-automation", "powerbi-dashboard"],
  "real-estate": ["business-portfolio", "business-automation", "powerbi-dashboard"],
};

export function getIndustryProfile(industry: IndustryDetail): IndustryProfile {
  const existing = INDUSTRY_PROFILES[industry.slug];
  if (existing) return existing;

  const visual =
    FALLBACK_VISUALS[industry.slug] ?? {
      src: "/images/visuals/transformation.webp",
      alt: `${industry.title} systems transformation visual`,
      accent: "#8eb5ff",
    };

  return {
    slug: industry.slug,
    summary: industry.description,
    context: industry.description,
    constraints: industry.challenges.slice(0, 4),
    applications: industry.features.slice(0, 4).map((feature) => ({
      title: feature.title,
      description: feature.description,
    })),
    architecture: [
      { label: "Intake", detail: "Enquiry, request or customer entry point" },
      { label: "Core workflow", detail: "The operating process and its owners" },
      { label: "Data & systems", detail: "Shared records and system connections" },
      { label: "Visibility", detail: "Reporting, exceptions and next action" },
    ],
    relatedProjectSlugs: FALLBACK_PROJECTS[industry.slug] ?? ["business-automation"],
    relatedServiceSlugs: industry.relatedSolutions.slice(0, 4),
    visual,
  };
}
