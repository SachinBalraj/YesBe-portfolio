export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Solutions", href: "#solutions" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const SITE_CONFIG = {
  name: "YesBe",
  title: "AI, ERP, Web Development & Business Solutions",
  description:
    "YesBe helps startups, SMEs, and enterprises with AI tools, ERP systems, web development, data analytics, cloud services, and search optimization.",
  email: "hello@yesbe.tech",
  phone: "9087795970",
  location: "Salem, Tamil Nadu, India",
  social: {
    linkedin: "https://www.linkedin.com/in/sachin-balraj-2b7650406",
    whatsapp: "https://wa.me/919087795970",
  },
} as const;

/* ────────────────────────────────────────────────────────────
   Founder entity — stable IDs shared by every schema that
   references Sachin Balraj, so search engines resolve the
   Person → Founder → YesBe Technologies relationship to a
   single node instead of several near-duplicates.
──────────────────────────────────────────────────────────── */

export const FOUNDER_PROFILE_URL = "https://www.yesbe.tech/sachin-balraj";
export const ORGANIZATION_ID = "https://www.yesbe.tech/#organization";
export const FOUNDER_PERSON_ID = `${FOUNDER_PROFILE_URL}#person`;

/**
 * Personal (not company) profiles already published in this project.
 * Only add a URL here when it verifiably belongs to the individual.
 */
export const FOUNDER_SAME_AS = [
  "https://www.linkedin.com/in/sachin-balraj-2b7650406",
  "https://github.com/sachinbalraj",
] as const;

/**
 * Founder role: YESBE Technologies. Employer role: Springreen, which has no
 * verified public URL in this project, so no url is asserted for it.
 */

export const FOUNDER_DESCRIPTION =
  "Sachin Balraj is the Founder of YESBE Technologies and a Solution Architect at Springreen. His work focuses on software architecture, artificial intelligence, web technologies and digital solutions designed to solve practical business challenges.";

/** The single canonical Person node. Reused — never duplicated inline. */
export const FOUNDER_PERSON = {
  "@type": "Person",
  "@id": FOUNDER_PERSON_ID,
  name: "Sachin Balraj",
  url: FOUNDER_PROFILE_URL,
  jobTitle: "Founder",
  description: FOUNDER_DESCRIPTION,
  worksFor: [
    { "@id": ORGANIZATION_ID },
    { "@type": "Organization", name: "Springreen" },
  ],
  sameAs: [...FOUNDER_SAME_AS],
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
    // References the shared FOUNDER_PERSON node so the founder is one entity,
    // not a second near-duplicate of the Person on /sachin-balraj.
    founder: { "@id": FOUNDER_PERSON_ID },
    email: "hello@yesbe.tech",
    telephone: "+919087795970",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salem",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    // Company-owned accounts only. The founder's personal profiles live on
    // FOUNDER_PERSON.sameAs so the two entities are not conflated.
    sameAs: [
      "https://www.instagram.com/yesbe.co",
      "https://www.facebook.com/yesbe.co",
      "https://x.com/yesbe_co",
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
