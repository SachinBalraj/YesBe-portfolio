export type ServiceVisualKey =
  | "intelligence"
  | "enterprise"
  | "web"
  | "cloud"
  | "transformation"
  | "product"
  | "company"
  | "automation"
  | "analytics"
  | "integration";

export const SERVICE_VISUALS: Record<
  ServiceVisualKey,
  { src: string; alt: string; accent: string }
> = {
  intelligence: {
    src: "/images/visuals/intelligence.webp",
    alt: "Support professional working with AI-assisted customer technology",
    accent: "#7aa7ff",
  },
  enterprise: {
    src: "/images/visuals/enterprise.webp",
    alt: "Business dashboards and reports on a workstation",
    accent: "#8fb6ff",
  },
  web: {
    src: "/images/visuals/web.webp",
    alt: "Developer building a web application at a laptop",
    accent: "#a5b4fc",
  },
  cloud: {
    src: "/images/visuals/cloud.webp",
    alt: "Data centre infrastructure supporting cloud services",
    accent: "#7dd3fc",
  },
  transformation: {
    src: "/images/visuals/transformation.webp",
    alt: "Business team planning a digital transformation",
    accent: "#93c5fd",
  },
  product: {
    src: "/images/visuals/product.webp",
    alt: "Electronic components used in product engineering",
    accent: "#a7b8ff",
  },
  company: {
    src: "/images/visuals/company.webp",
    alt: "YESBE team collaborating around a table",
    accent: "#8fb6ff",
  },
  automation: {
    src: "/images/visuals/automation.webp",
    alt: "Organised office workflow with operational figures",
    accent: "#8ec5ff",
  },
  analytics: {
    src: "/images/visuals/analytics.webp",
    alt: "Analytics dashboards displayed on a workstation",
    accent: "#8fb6ff",
  },
  integration: {
    src: "/images/visuals/integration.webp",
    alt: "Cross-functional team discussing system integration",
    accent: "#9fc0ff",
  },
};

export const INDUSTRY_VISUALS: Record<string, { src: string; alt: string }> = {
  healthcare: {
    src: "/images/industries/healthcare.webp",
    alt: "Clinical healthcare setting supporting connected operations",
  },
  education: {
    src: "/images/industries/education.webp",
    alt: "Modern learning environment supporting education systems",
  },
  retail: {
    src: "/images/industries/retail.webp",
    alt: "Retail store environment supporting connected commerce",
  },
  manufacturing: {
    src: "/images/industries/manufacturing.webp",
    alt: "Factory production machinery supporting connected manufacturing",
  },
  logistics: {
    src: "/images/industries/logistics.webp",
    alt: "Warehouse operations supporting connected logistics",
  },
  finance: {
    src: "/images/industries/finance.webp",
    alt: "Office desk with financial reports supporting connected finance",
  },
};

export const PROJECT_PREVIEWS: Record<string, string> = {
  "fashion-fusion": "/images/projects/fashion-fusion.webp",
  "restaurant-qr-ordering": "/images/projects/restaurant-qr-ordering.webp",
  "library-management": "/images/projects/library-management.webp",
  "business-portfolio": "/images/projects/business-portfolio.webp",
  "ai-business-assistant": "/images/projects/ai-business-assistant.webp",
  "erp-management": "/images/projects/erp-management.webp",
  "powerbi-dashboard": "/images/projects/powerbi-dashboard.webp",
  "seo-digital-growth": "/images/projects/seo-digital-growth.webp",
  "business-automation": "/images/projects/business-automation.webp",
};

export const HERO_FALLBACK = {
  poster: "/images/visuals/hero-film-poster.webp",
  srcSet:
    "/images/visuals/hero-film-poster-640.webp 640w, /images/visuals/hero-film-poster-960.webp 960w, /images/visuals/hero-film-poster.webp 1600w",
  label: "YESBE connected systems still",
};

export const HERO_FILM_PLAN: {
  webm: string;
  mp4: string;
  poster: string;
  label: string;
  approved: boolean;
} = {
  webm: "/media/yesbe-hero.webm",
  mp4: "/media/yesbe-hero.mp4",
  poster: "/media/yesbe-hero-poster.webp",
  label: "YESBE connected systems film",
  approved: false,
};

export const SYSTEMS_FILM = {
  webm: "/videos/yesbe-systems-film.webm",
  mp4: "/videos/yesbe-systems-film.mp4",
  poster: "/images/visuals/systems-film-poster.webp",
  label: "YESBE systems architecture film",
};
