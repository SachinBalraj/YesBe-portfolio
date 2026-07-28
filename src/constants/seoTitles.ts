export const SEO_TITLES = {
  home: "AI, ERP & Web Development Company | YesBe Technologies",
  about: "About YesBe Technologies | AI Digital Solutions Company",
  services: "Technology Services | AI ERP Web | YesBe Technologies",
  industries: "Industry Technology Solutions | YesBe Technologies",
  caseStudies: "Client Success Stories & Results | YesBe Technologies",
  knowledgeCenter: "Technology Blog & AI ERP Web Guides | YesBe Technologies",
  pricing: "Technology Services Pricing Plans | YesBe Technologies",
  contact: "Contact YesBe Technologies | Get a Free Consultation",
  privacyPolicy: "Privacy Policy & Data Protection | YesBe Technologies",
  termsAndConditions: "Terms & Conditions for Services | YesBe Technologies",
  refundPolicy: "Refund Policy & Cancellation Terms | YesBe Technologies",
  cookiePolicy: "Cookie Policy & Tracking Details | YesBe Technologies",
  disclaimer: "Legal Disclaimer & Service Notices | YesBe Technologies",
  notFound: "Page Not Found Error | Return Home | YesBe Technologies",
  solutionNotFound: "Solution Not Found | Services | YesBe Technologies",
  industryNotFound: "Industry Not Found | Solutions | YesBe Technologies",
  caseStudyNotFound: "Case Study Not Found | Results | YesBe Technologies",
} as const;

export const SOLUTION_SEO_TITLES: Record<string, string> = {
  "ai-solutions": "AI Development Company in India | YesBe Technologies",
  "ai-chatbots": "AI Chatbot Development Company | YesBe Technologies",
  "erp-systems": "ERP Software Development Company | YesBe Technologies",
  "website-development": "Custom Website Development Company | YesBe Technologies",
  "web-applications": "Custom Web Application Development | YesBe Technologies",
  ecommerce: "E-Commerce Website Development | YesBe Technologies",
  "business-automation": "Business Automation Solutions | YesBe Technologies",
  "data-analytics": "Data Analytics Consulting Services | YesBe Technologies",
  "power-bi-dashboards": "Power BI Dashboard Development | YesBe Technologies",
  "cloud-devops": "Cloud & DevOps Consulting Services | YesBe Technologies",
  "database-management": "Database Management Services India | YesBe Technologies",
  "api-development": "API Development & Integration | YesBe Technologies",
  seo: "SEO Services Company for Growth | YesBe Technologies",
  geo: "GEO Optimization for AI Search | YesBe Technologies",
  aeo: "AEO Services for Answer Engines | YesBe Technologies",
  "digital-marketing": "Digital Marketing Services Company | YesBe Technologies",
  "custom-software": "Custom Software Development Company | YesBe Technologies",
};

export const INDUSTRY_SEO_TITLES: Record<string, string> = {
  startups: "Startup Technology Solutions India | YesBe Technologies",
  smes: "SME Digital Transformation Solutions | YesBe Technologies",
  "large-enterprises": "Enterprise Technology Solutions | YesBe Technologies",
  healthcare: "Healthcare Technology Solutions | YesBe Technologies",
  education: "Education Technology Solutions | YesBe Technologies",
  retail: "Retail Business Technology Solutions | YesBe Technologies",
  manufacturing: "Manufacturing Technology Solutions | YesBe Technologies",
  logistics: "Logistics Technology Solutions | YesBe Technologies",
  hospitality: "Hospitality Technology Solutions | YesBe Technologies",
  finance: "Finance Business Technology Solutions | YesBe Technologies",
  "real-estate": "Real Estate Technology Solutions | YesBe Technologies",
};

export const CASE_STUDY_SEO_TITLES: Record<string, string> = {
  "fashion-fusion": "E-Commerce Platform Case Study | YesBe Technologies",
  "restaurant-qr-ordering": "QR Ordering System Case Study | YesBe Technologies",
  "library-management": "Library Management Case Study | YesBe Technologies",
  "business-portfolio": "Business Portfolio Website Case Study | YesBe Technologies",
  "ai-business-assistant": "AI Business Assistant Case Study | YesBe Technologies",
  "erp-management": "ERP Management System Case Study | YesBe Technologies",
  "powerbi-dashboard": "Power BI Dashboard Case Study | YesBe Technologies",
  "seo-digital-growth": "SEO Digital Growth Case Study | YesBe Technologies",
  "business-automation": "Automation Platform Case Study | YesBe Technologies",
};

export function getSolutionSeoTitle(slug: string, fallbackTitle: string) {
  return SOLUTION_SEO_TITLES[slug] ?? `${fallbackTitle} Services | YesBe Technologies`;
}

export function getIndustrySeoTitle(slug: string, fallbackTitle: string) {
  return INDUSTRY_SEO_TITLES[slug] ?? `${fallbackTitle} Solutions | YesBe Technologies`;
}

export function getCaseStudySeoTitle(slug: string, fallbackTitle: string) {
  return CASE_STUDY_SEO_TITLES[slug] ?? `${fallbackTitle} Case Study | YesBe Technologies`;
}

export const SEO_DESCRIPTIONS = {
  home: "AI, ERP and web development services from YesBe Technologies help businesses build software, dashboards, cloud systems and automation that grows faster.",
  about: "About YesBe Technologies: learn our mission, founder expertise and approach to AI, ERP, cloud, software development and business automation for growth.",
  services: "Technology services from YesBe Technologies include AI development, ERP systems, Power BI dashboards, cloud, automation, SEO and custom software support.",
  industries: "Industry technology solutions by YesBe Technologies help healthcare, retail, education, manufacturing, logistics, finance and startups digitize faster.",
  caseStudies: "Client success stories from YesBe Technologies show measurable results from AI, ERP, automation, Power BI, SEO and custom software projects for growth.",
  knowledgeCenter: "Technology blog from YesBe Technologies with practical guides on AI, ERP, web development, SEO, cloud, Power BI and business automation for leaders today.",
  pricing: "Technology services pricing for AI, ERP, web development, Power BI, SEO and automation. Compare affordable YesBe Technologies plans for your business.",
  contact: "Contact YesBe Technologies for a free consultation on AI, ERP, web development, cloud, automation, SEO, Power BI and digital transformation projects today.",
  privacyPolicy: "Privacy Policy from YesBe Technologies explains how we collect, use, store and protect your personal data when you use our website and services safely.",
  termsAndConditions: "Terms and Conditions from YesBe Technologies explain website use, service agreements, payments, intellectual property and client responsibilities clearly.",
  refundPolicy: "Refund Policy from YesBe Technologies explains advance payments, cancellation terms, refund eligibility and project termination for services clearly today.",
  cookiePolicy: "Cookie Policy from YesBe Technologies explains how cookies, analytics and tracking technologies improve website performance and user experience safely.",
  disclaimer: "Legal Disclaimer from YesBe Technologies outlines service notices, pricing guidance, third-party tools, liability limits and content accuracy clearly.",
  notFound: "Page not found. Return to YesBe Technologies to explore AI, ERP, custom software, cloud, SEO, Power BI and automation services for business growth today.",
  solutionNotFound: "Solution not found. Explore YesBe Technologies services for AI, ERP, web development, Power BI, cloud, SEO and business automation support for growth.",
  industryNotFound: "Industry not found. Explore YesBe Technologies industry solutions for healthcare, retail, education, finance, logistics and manufacturing businesses today.",
  caseStudyNotFound: "Case study not found. Browse YesBe Technologies success stories in AI, ERP, Power BI, SEO, automation, ecommerce and custom software delivery today now.",
} as const;

export const SOLUTION_SEO_DESCRIPTIONS: Record<string, string> = {
  "ai-solutions": "AI development company YesBe Technologies builds intelligent automation, ML models, chatbots and predictive analytics that improve decisions and growth.",
  "ai-chatbots": "AI chatbot development by YesBe Technologies creates support bots, lead assistants and conversational systems that improve response times and sales today.",
  "erp-systems": "ERP software development from YesBe Technologies streamlines inventory, finance, HR, sales and operations with scalable business systems for growth today.",
  "website-development": "Custom website development by YesBe Technologies creates fast, secure, responsive business websites built for SEO, conversions and growth online today.",
  "web-applications": "Custom web application development from YesBe Technologies builds secure portals, dashboards, SaaS platforms and workflows for business teams online fast.",
  ecommerce: "E-Commerce website development by YesBe Technologies helps brands sell online with catalogs, payments, inventory, orders and scalable stores faster today.",
  "business-automation": "Business automation solutions from YesBe Technologies reduce manual work across approvals, CRM, HR, reports and operations with smart workflows for growth.",
  "data-analytics": "Data analytics consulting by YesBe Technologies turns raw business data into dashboards, KPI reports, forecasts and actionable decisions for growth today.",
  "power-bi-dashboards": "Power BI dashboard development by YesBe Technologies transforms data into real-time reports, interactive analytics and business insights for leaders today.",
  "cloud-devops": "Cloud and DevOps consulting from YesBe Technologies covers migration, CI/CD, Docker, AWS, Azure, monitoring, security and infrastructure support today.",
  "database-management": "Database management services from YesBe Technologies improve data design, migration, performance, backups, security and reliability for business apps.",
  "api-development": "API development and integration by YesBe Technologies connects apps, CRMs, ERPs, payments and data systems with secure scalable APIs for business teams.",
  seo: "SEO services company YesBe Technologies improves Google rankings, technical SEO, content strategy, traffic and lead generation for growing businesses.",
  geo: "GEO optimization from YesBe Technologies helps your content appear in AI search results, answer engines and generative discovery experiences online today.",
  aeo: "AEO services from YesBe Technologies optimize content for featured snippets, voice search and answer engines to capture high-intent users online today.",
  "digital-marketing": "Digital marketing services from YesBe Technologies combine SEO, social media, paid ads and content strategy to attract qualified leads and sales today.",
  "custom-software": "Custom software development by YesBe Technologies builds scalable business platforms, automation tools, portals, integrations and dashboards fast today.",
};

export const INDUSTRY_SEO_DESCRIPTIONS: Record<string, string> = {
  startups: "Startup technology solutions from YesBe Technologies help founders build MVPs, cloud architecture, prototypes and scalable products faster with confidence.",
  smes: "SME digital transformation solutions from YesBe Technologies streamline operations with ERP, automation, dashboards, websites and cloud tools for growth.",
  "large-enterprises": "Enterprise technology solutions from YesBe Technologies modernize legacy systems, integrate platforms and deploy AI, ERP and cloud securely at scale today.",
  healthcare: "Healthcare technology solutions from YesBe Technologies support patient systems, telemedicine, records, dashboards, automation and compliance needs today.",
  education: "Education technology solutions from YesBe Technologies deliver school ERP, e-learning, student portals, exam systems and analytics dashboards for growth.",
  retail: "Retail business technology solutions from YesBe Technologies connect POS, ecommerce, inventory, loyalty, analytics and automation for measurable growth.",
  manufacturing: "Manufacturing technology solutions from YesBe Technologies improve production planning, inventory, supply chain, IoT tracking and analytics for teams.",
  logistics: "Logistics technology solutions from YesBe Technologies optimize fleet tracking, route planning, warehouse workflows, dashboards and automation at scale.",
  hospitality: "Hospitality technology solutions from YesBe Technologies improve restaurant, hotel, QR ordering, booking, guest and operations management for growth today.",
  finance: "Finance business technology solutions from YesBe Technologies support dashboards, compliance workflows, reporting, automation and secure systems at scale.",
  "real-estate": "Real estate technology solutions from YesBe Technologies manage listings, CRMs, property portals, virtual tours, analytics and lead workflows for growth.",
};

export const CASE_STUDY_SEO_DESCRIPTIONS: Record<string, string> = {
  "fashion-fusion": "E-Commerce platform case study showing how YesBe Technologies improved online sales, inventory, checkout and order management for a fashion brand today.",
  "restaurant-qr-ordering": "QR ordering system case study showing how YesBe Technologies digitized restaurant menus, orders, kitchen workflows and customer experience for growth.",
  "library-management": "Library management case study showing how YesBe Technologies automated cataloging, borrowing, returns, reports and student access workflows securely now.",
  "business-portfolio": "Business portfolio website case study showing how YesBe Technologies improved brand trust, service visibility, SEO and inbound lead generation online.",
  "ai-business-assistant": "AI business assistant case study showing how YesBe Technologies used automation and intelligent workflows to improve decisions and productivity fast today.",
  "erp-management": "ERP management system case study showing how YesBe Technologies unified operations, inventory, finance, reporting and business workflows for growth today.",
  "powerbi-dashboard": "Power BI dashboard case study showing how YesBe Technologies converted sales data into real-time KPIs, reports and actionable business insights today.",
  "seo-digital-growth": "SEO digital growth case study showing how YesBe Technologies improved organic visibility, search rankings, traffic and qualified business leads today.",
  "business-automation": "Automation platform case study showing how YesBe Technologies reduced manual work, connected workflows and improved operational efficiency for growth.",
};

export function getSolutionSeoDescription(slug: string, fallbackTitle: string) {
  return SOLUTION_SEO_DESCRIPTIONS[slug] ?? `${fallbackTitle} services from YesBe Technologies help businesses plan, build and scale reliable digital systems with expert implementation support.`;
}

export function getIndustrySeoDescription(slug: string, fallbackTitle: string) {
  return INDUSTRY_SEO_DESCRIPTIONS[slug] ?? `${fallbackTitle} technology solutions from YesBe Technologies help organizations digitize operations, automate workflows and grow with modern systems.`;
}

export function getCaseStudySeoDescription(slug: string, fallbackTitle: string) {
  return CASE_STUDY_SEO_DESCRIPTIONS[slug] ?? `${fallbackTitle} case study from YesBe Technologies shows practical software, automation and analytics results delivered for business growth.`;
}