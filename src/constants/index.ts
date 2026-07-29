export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Solutions", href: "#solutions" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

export const SITE_CONFIG = {
  name: "YesBe",
  title: "AI, ERP, Web Development & Business Solutions",
  description:
    "YesBe helps startups, SMEs, and enterprises with AI tools, ERP systems, web development, data analytics, cloud services, and search optimization.",
  email: "sachinbalraj01@gmail.com",
  phone: "9087795970",
  location: "Salem, Tamil Nadu, India",
  social: {
    linkedin: "https://www.linkedin.com/in/sachin-balraj-2b7650406",
    whatsapp: "https://wa.me/919087795970",
  },
} as const;

export const BUSINESS_INFO = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.yesbe.tech/#organization",
    name: "YesBe Technologies",
    legalName: "YesBe Technologies",
    alternateName: "YesBe",
    url: "https://www.yesbe.tech",
    logo: "https://www.yesbe.tech/YBlogo.png",
    description:
      "YesBe Technologies provides AI Solutions, ERP Development, Website Development, Custom Software Development, Power BI Dashboards, Business Automation, Cloud Solutions, SEO, GEO, AEO, Digital Marketing, and Digital Transformation services.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Sachin Balraj",
      jobTitle: "Founder & Chief Solution Architect",
      url: "https://www.linkedin.com/in/sachin-balraj-2b7650406",
    },
    email: "hello@yesbe.tech",
    telephone: "+919087795970",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salem",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.linkedin.com/in/sachin-balraj-2b7650406",
      "https://github.com/sachinbalraj",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+919087795970",
        email: "hello@yesbe.tech",
        availableLanguage: ["English", "Tamil"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+919087795970",
        email: "hello@yesbe.tech",
        availableLanguage: ["English", "Tamil"],
      },
    ],
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.yesbe.tech/#website",
    name: "YesBe Technologies",
    alternateName: "YesBe",
    url: "https://www.yesbe.tech",
    description:
      "YesBe Technologies provides AI Solutions, ERP Development, Website Development, Custom Software Development, Power BI Dashboards, Business Automation, Cloud Solutions, SEO, GEO, AEO, Digital Marketing, and Digital Transformation services.",
    publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
    copyrightHolder: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
    inLanguage: "en",
    copyrightYear: "2026",
  },
};

export const TECH_STACK = [
  "React", "Node.js", "MongoDB", "Python", "Power BI",
  "OpenAI", "LangChain", "Docker", "AWS", "ERP",
  "SEO", "GEO", "AEO", "Data Analytics", "Business Automation",
] as const;
