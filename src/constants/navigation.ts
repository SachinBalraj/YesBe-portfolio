export interface NavigationLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavigationGroup {
  title: string;
  links: NavigationLink[];
}

/** Primary navigation, kept in the same order and with the same labels as the
 *  existing header so no indexed destination disappears. */
export const PRIMARY_NAV: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Articles", href: "/insights" },
];

/** Capability groups for the Solutions mega-menu. Every href already exists in
 *  the service catalogue; nothing is invented for navigation purposes. */
export const SOLUTION_GROUPS: NavigationGroup[] = [
  {
    title: "AI & automation",
    links: [
      { label: "AI Solutions", href: "/services/ai-solutions" },
      { label: "AI Chatbots", href: "/services/ai-chatbots" },
      { label: "Business Automation", href: "/services/business-automation" },
    ],
  },
  {
    title: "Software & platforms",
    links: [
      { label: "Custom Software", href: "/services/custom-software" },
      { label: "ERP Systems", href: "/services/erp-systems" },
      { label: "Web Applications", href: "/services/web-applications" },
      { label: "E-Commerce", href: "/services/ecommerce" },
      { label: "API Development", href: "/services/api-development" },
      { label: "Blockchain & Data Privacy", href: "/services/blockchain" },
    ],
  },
  {
    title: "Web & infrastructure",
    links: [
      { label: "Website Development", href: "/services/website-development" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
      { label: "Database Management", href: "/services/database-management" },
    ],
  },
  {
    title: "Data & growth",
    links: [
      { label: "Data Analytics", href: "/services/data-analytics" },
      { label: "Power BI Dashboards", href: "/services/power-bi-dashboards" },
      { label: "SEO", href: "/services/seo" },
      { label: "GEO", href: "/services/geo" },
      { label: "AEO", href: "/services/aeo" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
    ],
  },
];

export const INDUSTRY_LINKS: NavigationLink[] = [
  { label: "Startups", href: "/industries/startups" },
  { label: "SMEs", href: "/industries/smes" },
  { label: "Large Enterprises", href: "/industries/large-enterprises" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Education", href: "/industries/education" },
  { label: "Retail", href: "/industries/retail" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Logistics", href: "/industries/logistics" },
  { label: "Hospitality", href: "/industries/hospitality" },
  { label: "Finance", href: "/industries/finance" },
  { label: "Real Estate", href: "/industries/real-estate" },
];
