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
    alt: "Glass-like data modules connected by illuminated pathways",
    accent: "#7aa7ff",
  },
  enterprise: {
    src: "/images/visuals/enterprise.webp",
    alt: "Interconnected enterprise modules arranged around a central system",
    accent: "#8fb6ff",
  },
  web: {
    src: "/images/visuals/web.webp",
    alt: "Layered web interface panels rendered as glass structures",
    accent: "#a5b4fc",
  },
  cloud: {
    src: "/images/visuals/cloud.webp",
    alt: "Floating cloud infrastructure layers connected by data paths",
    accent: "#7dd3fc",
  },
  transformation: {
    src: "/images/visuals/transformation.webp",
    alt: "Fragmented systems resolving into a connected operating platform",
    accent: "#93c5fd",
  },
  product: {
    src: "/images/visuals/product.webp",
    alt: "Stacked product architecture layers built from glass modules",
    accent: "#a7b8ff",
  },
  company: {
    src: "/images/visuals/company.webp",
    alt: "Connected YESBE systems arranged as a unified operating structure",
    accent: "#8fb6ff",
  },
  automation: {
    src: "/images/visuals/automation.webp",
    alt: "Glass workflow stations linked by illuminated automation paths",
    accent: "#8ec5ff",
  },
  analytics: {
    src: "/images/visuals/analytics.webp",
    alt: "Glass analytics bars and a trend line rendered as connected modules",
    accent: "#8fb6ff",
  },
  integration: {
    src: "/images/visuals/integration.webp",
    alt: "Separate glass system islands connected through a single illuminated integration hub",
    accent: "#9fc0ff",
  },
};

export const INDUSTRY_VISUALS: Record<string, { src: string; alt: string }> = {
  healthcare: {
    src: "/images/industries/healthcare.webp",
    alt: "Connected healthcare operations visual",
  },
  education: {
    src: "/images/industries/education.webp",
    alt: "Layered education systems visual",
  },
  retail: {
    src: "/images/industries/retail.webp",
    alt: "Retail catalogue and inventory modules visual",
  },
  manufacturing: {
    src: "/images/industries/manufacturing.webp",
    alt: "Manufacturing production and quality pathways visual",
  },
  logistics: {
    src: "/images/industries/logistics.webp",
    alt: "Logistics network and delivery visibility visual",
  },
  finance: {
    src: "/images/industries/finance.webp",
    alt: "Finance reporting and controls visual",
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
