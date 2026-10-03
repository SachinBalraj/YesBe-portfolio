export const SEO_TITLES = {
  home: "IT Consulting & Software Development Company | YESBE Technologies",
  about: "About YESBE Technologies | IT Consulting & Software Development",
  founder: "Sachin Balraj | Founder of YESBE Technologies",
  services: "IT Consulting, Web, Software, ERP & AI Services | YESBE Technologies",
  industries: "Industry Technology Solutions | YESBE Technologies",
  caseStudies: "Technology Projects & Solutions | YESBE Technologies",
  insights: "Technology Blog & AI ERP Web Guides | YESBE Technologies",
  contact: "Contact YESBE Technologies | Get a Free Consultation",
  privacyPolicy: "Privacy Policy & Data Protection | YESBE Technologies",
  termsAndConditions: "Terms & Conditions for Services | YESBE Technologies",
  refundPolicy: "Refund Policy & Cancellation Terms | YESBE Technologies",
  cookiePolicy: "Cookie Policy & Tracking Details | YESBE Technologies",
  disclaimer: "Legal Disclaimer & Service Notices | YESBE Technologies",
  notFound: "Page Not Found Error | Return Home | YESBE Technologies",
  solutionNotFound: "Solution Not Found | Services | YESBE Technologies",
  industryNotFound: "Industry Not Found | Solutions | YESBE Technologies",
  caseStudyNotFound: "Project Not Found | YESBE Technologies",
} as const;

export const SOLUTION_SEO_TITLES: Record<string, string> = {
  "ai-solutions": "AI Development Company in India | YESBE Technologies",
  "ai-chatbots": "AI Chatbot Development Company | YESBE Technologies",
  "erp-systems": "ERP Software Development Company | YESBE Technologies",
  "website-development": "Custom Website Development Company | YESBE Technologies",
  "web-applications": "Custom Web Application Development | YESBE Technologies",
  ecommerce: "E-Commerce Website Development | YESBE Technologies",
  "business-automation": "Business Automation Solutions | YESBE Technologies",
  "data-analytics": "Data Analytics Consulting Services | YESBE Technologies",
  "power-bi-dashboards": "Power BI Dashboard Development | YESBE Technologies",
  "cloud-devops": "Cloud & DevOps Consulting Services | YESBE Technologies",
  "database-management": "Database Management Services India | YESBE Technologies",
  "api-development": "API Development & Integration | YESBE Technologies",
  seo: "SEO Services Company for Growth | YESBE Technologies",
  geo: "GEO Optimization for AI Search | YESBE Technologies",
  aeo: "AEO Services for Answer Engines | YESBE Technologies",
  "digital-marketing": "Digital Marketing Services Company | YESBE Technologies",
  "custom-software": "Custom Software Development Company | YESBE Technologies",
  "it-consulting": "IT Consulting Company & Technology Advisory | YESBE Technologies",
  "digital-transformation": "Digital Transformation Consulting Services | YESBE Technologies",
};

export const INDUSTRY_SEO_TITLES: Record<string, string> = {
  startups: "Startup Technology Solutions India | YESBE Technologies",
  smes: "SME Digital Transformation Solutions | YESBE Technologies",
  "large-enterprises": "Enterprise Technology Solutions | YESBE Technologies",
  healthcare: "Healthcare Technology Solutions | YESBE Technologies",
  education: "Education Technology Solutions | YESBE Technologies",
  retail: "Retail Business Technology Solutions | YESBE Technologies",
  manufacturing: "Manufacturing Technology Solutions | YESBE Technologies",
  logistics: "Logistics Technology Solutions | YESBE Technologies",
  hospitality: "Hospitality Technology Solutions | YESBE Technologies",
  finance: "Finance Business Technology Solutions | YESBE Technologies",
  "real-estate": "Real Estate Technology Solutions | YESBE Technologies",
};

export const CASE_STUDY_SEO_TITLES: Record<string, string> = {
  "fashion-fusion": "E-Commerce Platform Project | YESBE Technologies",
  "restaurant-qr-ordering": "QR Ordering System Project | YESBE Technologies",
  "library-management": "Library Management System Project | YESBE Technologies",
  "business-portfolio": "Business Website Project | YESBE Technologies",
  "ai-business-assistant": "AI Business Assistant Project | YESBE Technologies",
  "erp-management": "ERP Management System Project | YESBE Technologies",
  "powerbi-dashboard": "Power BI Dashboard Project | YESBE Technologies",
  "seo-digital-growth": "SEO & Digital Growth Project | YESBE Technologies",
  "business-automation": "Business Automation Platform Project | YESBE Technologies",
};

export function getSolutionSeoTitle(slug: string, fallbackTitle: string) {
  return SOLUTION_SEO_TITLES[slug] ?? `${fallbackTitle} Services | YESBE Technologies`;
}

export function getIndustrySeoTitle(slug: string, fallbackTitle: string) {
  return INDUSTRY_SEO_TITLES[slug] ?? `${fallbackTitle} Solutions | YESBE Technologies`;
}

export function getCaseStudySeoTitle(slug: string, fallbackTitle: string) {
  return CASE_STUDY_SEO_TITLES[slug] ?? `${fallbackTitle} | YESBE Technologies`;
}

export const SEO_DESCRIPTIONS = {
  home: "YESBE Technologies is an IT consulting and software development company. Web development, custom software, ERP, AI, automation and digital transformation.",
  about: "About YESBE Technologies: an IT consulting and software development company delivering web development, custom software, ERP, AI, automation and digital transformation.",
  founder: "Sachin Balraj is the Founder of YESBE Technologies and a Solution Architect at Springreen, working across software architecture, AI, web technologies, automation and practical digital solutions for businesses.",
  services: "Technology services from YESBE Technologies include IT consulting, web development, custom software, ERP systems, AI solutions, business automation, Power BI, cloud and SEO.",
  industries: "Industry technology solutions by YESBE Technologies help healthcare, retail, education, manufacturing, logistics, finance and startups digitize faster.",
  caseStudies: "Selected technology projects and solutions designed and built by YESBE Technologies across web, ERP, AI, automation, analytics and SEO.",
  insights: "Technology blog from YESBE Technologies with practical guides on AI, ERP, web development, SEO, cloud, Power BI and business automation for leaders today.",
  contact: "Contact YESBE Technologies for a free consultation on IT consulting, web development, custom software, ERP, AI, automation, SEO and digital transformation.",
  privacyPolicy: "Privacy Policy from YESBE Technologies explains how we collect, use, store and protect your personal data when you use our website and services safely.",
  termsAndConditions: "Terms and Conditions from YESBE Technologies explain website use, service agreements, payments, intellectual property and client responsibilities clearly.",
  refundPolicy: "Refund Policy from YESBE Technologies explains advance payments, cancellation terms, refund eligibility and project termination for services clearly today.",
  cookiePolicy: "Cookie Policy from YESBE Technologies explains how cookies, analytics and tracking technologies improve website performance and user experience safely.",
  disclaimer: "Legal Disclaimer from YESBE Technologies outlines service notices, quotation guidance, third-party tools, liability limits and content accuracy clearly.",
  notFound: "Page not found. Return to YESBE Technologies to explore IT consulting, web development, custom software, ERP, AI, automation and SEO services.",
  solutionNotFound: "Solution not found. Explore YESBE Technologies services for IT consulting, web development, custom software, ERP, AI and business automation support.",
  industryNotFound: "Industry not found. Explore YESBE Technologies industry solutions for healthcare, retail, education, finance, logistics and manufacturing businesses today.",
  caseStudyNotFound: "Project not found. Browse YESBE Technologies technology projects across web development, ERP, AI, automation, analytics and SEO.",
} as const;

export const SOLUTION_SEO_DESCRIPTIONS: Record<string, string> = {
  "ai-solutions": "AI development company YESBE Technologies builds intelligent automation, ML models, chatbots and predictive analytics that improve decisions and growth.",
  "ai-chatbots": "AI chatbot development by YESBE Technologies creates support bots, lead assistants and conversational systems that improve response times and sales today.",
  "erp-systems": "ERP software development from YESBE Technologies streamlines inventory, finance, HR, sales and operations with scalable business systems for growth today.",
  "website-development": "Custom website development by YESBE Technologies creates fast, secure, responsive business websites built for SEO, conversions and growth online today.",
  "web-applications": "Custom web application development from YESBE Technologies builds secure portals, dashboards, SaaS platforms and workflows for business teams online fast.",
  ecommerce: "E-Commerce website development by YESBE Technologies helps brands sell online with catalogs, payments, inventory, orders and scalable stores faster today.",
  "business-automation": "Business automation solutions from YESBE Technologies reduce manual work across approvals, CRM, HR, reports and operations with smart workflows for growth.",
  "data-analytics": "Data analytics consulting by YESBE Technologies turns raw business data into dashboards, KPI reports, forecasts and actionable decisions for growth today.",
  "power-bi-dashboards": "Power BI dashboard development by YESBE Technologies transforms data into real-time reports, interactive analytics and business insights for leaders today.",
  "cloud-devops": "Cloud and DevOps consulting from YESBE Technologies covers migration, CI/CD, Docker, AWS, Azure, monitoring, security and infrastructure support today.",
  "database-management": "Database management services from YESBE Technologies improve data design, migration, performance, backups, security and reliability for business apps.",
  "api-development": "API development and integration by YESBE Technologies connects apps, CRMs, ERPs, payments and data systems with secure scalable APIs for business teams.",
  seo: "SEO services company YESBE Technologies improves Google rankings, technical SEO, content strategy, traffic and lead generation for growing businesses.",
  geo: "GEO optimization from YESBE Technologies helps your content appear in AI search results, answer engines and generative discovery experiences online today.",
  aeo: "AEO services from YESBE Technologies optimize content for featured snippets, voice search and answer engines to capture high-intent users online today.",
  "digital-marketing": "Digital marketing services from YESBE Technologies combine SEO, social media, paid ads and content strategy to attract qualified leads and sales today.",
  "custom-software": "Custom software development by YESBE Technologies builds scalable business platforms, automation tools, portals, integrations and dashboards fast today.",
  "it-consulting": "IT consulting from YESBE Technologies audits your existing systems and produces a costed technology roadmap, so you invest in what actually moves your business.",
  "digital-transformation": "Digital transformation by YESBE Technologies digitises manual operations in phased, independently valuable steps that integrate with the systems you already run.",
};

export const INDUSTRY_SEO_DESCRIPTIONS: Record<string, string> = {
  startups: "Startup technology solutions from YESBE Technologies help founders build MVPs, cloud architecture, prototypes and scalable products faster with confidence.",
  smes: "SME digital transformation solutions from YESBE Technologies streamline operations with ERP, automation, dashboards, websites and cloud tools for growth.",
  "large-enterprises": "Enterprise technology solutions from YESBE Technologies modernize legacy systems, integrate platforms and deploy AI, ERP and cloud securely at scale today.",
  healthcare: "Healthcare technology solutions from YESBE Technologies support patient systems, telemedicine, records, dashboards, automation and compliance needs today.",
  education: "Education technology solutions from YESBE Technologies deliver school ERP, e-learning, student portals, exam systems and analytics dashboards for growth.",
  retail: "Retail business technology solutions from YESBE Technologies connect POS, ecommerce, inventory, loyalty, analytics and automation for measurable growth.",
  manufacturing: "Manufacturing technology solutions from YESBE Technologies improve production planning, inventory, supply chain, IoT tracking and analytics for teams.",
  logistics: "Logistics technology solutions from YESBE Technologies optimize fleet tracking, route planning, warehouse workflows, dashboards and automation at scale.",
  hospitality: "Hospitality technology solutions from YESBE Technologies improve restaurant, hotel, QR ordering, booking, guest and operations management for growth today.",
  finance: "Finance business technology solutions from YESBE Technologies support dashboards, compliance workflows, reporting, automation and secure systems at scale.",
  "real-estate": "Real estate technology solutions from YESBE Technologies manage listings, CRMs, property portals, virtual tours, analytics and lead workflows for growth.",
};

export const CASE_STUDY_SEO_DESCRIPTIONS: Record<string, string> = {
  "fashion-fusion": "E-commerce platform project by YESBE Technologies covering product catalogue, cart, checkout, inventory and order management for a retail brand.",
  "restaurant-qr-ordering": "QR ordering project by YESBE Technologies covering digital menus, table ordering, a real-time kitchen queue and a sales dashboard for restaurants.",
  "library-management": "Library management system project by YESBE Technologies covering catalogue search, barcode issue and return, fine calculation and reporting.",
  "business-portfolio": "Business website project by YESBE Technologies covering responsive pages, service detail pages, lead capture forms and technical SEO foundations.",
  "ai-business-assistant": "RAG-based AI assistant project by YESBE Technologies covering document ingestion, a vector index, source-linked answers and an admin panel for managing documents.",
  "erp-management": "Custom ERP project by YESBE Technologies covering inventory, employee records, billing, purchase orders, role-based access and reporting.",
  "powerbi-dashboard": "Power BI dashboard project by YESBE Technologies covering data modelling, DAX measures, ETL pipelines, scheduled refresh and role-based access.",
  "seo-digital-growth": "SEO project by YESBE Technologies covering technical audits, on-page optimisation, schema markup, content strategy and GEO and AEO structuring.",
  "business-automation": "Business automation project by YESBE Technologies covering a visual workflow builder, approval chains, notifications and reporting.",
};

export function getCaseStudySeoDescription(slug: string, fallbackTitle: string) {
  return CASE_STUDY_SEO_DESCRIPTIONS[slug] ?? `${fallbackTitle} project from YESBE Technologies showing the scope, architecture and features built for a business requirement.`;
}

export function getSolutionSeoDescription(slug: string, fallbackTitle: string) {
  return SOLUTION_SEO_DESCRIPTIONS[slug] ?? `${fallbackTitle} from YESBE Technologies — scope, approach, technology and typical project shape for teams evaluating this service.`;
}

export function getIndustrySeoDescription(slug: string, fallbackTitle: string) {
  return INDUSTRY_SEO_DESCRIPTIONS[slug] ?? `${fallbackTitle} technology solutions from YESBE Technologies help organizations digitize operations, automate workflows and grow with modern systems.`;
}

