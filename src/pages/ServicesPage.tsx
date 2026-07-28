import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHeader } from "@/components/common/PageHeader";
import { fadeInUp, staggerContainer } from "@/animations";
import {
  Brain, Bot, LayoutDashboard, Globe, Code2, ShoppingBag,
  Workflow, BarChart3, Cloud, Database, Link2, Search,
  Megaphone, MessageCircle, ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TechStackSection = lazy(() =>
  import("@/sections/TechStackSection").then((m) => ({ default: m.TechStackSection }))
);
const ContactSection = lazy(() =>
  import("@/sections/ContactSection").then((m) => ({ default: m.ContactSection }))
);

interface Service {
  icon: LucideIcon;
  name: string;
  description: string;
  slug: string;
}

const services: Service[] = [
  { icon: Brain, name: "AI Solutions", description: "AI tools that automate decisions and surface insights from your data.", slug: "ai-solutions" },
  { icon: Bot, name: "AI Chatbots", description: "Chatbots for 24/7 support and lead generation.", slug: "ai-chatbots" },
  { icon: LayoutDashboard, name: "ERP Systems", description: "Enterprise resource planning built around your workflows.", slug: "erp-systems" },
  { icon: Globe, name: "Website Development", description: "Fast, responsive websites that convert.", slug: "website-development" },
  { icon: Code2, name: "Web Applications", description: "Full-stack apps tailored to your operations.", slug: "web-applications" },
  { icon: ShoppingBag, name: "E-Commerce", description: "Online stores with payment and inventory management.", slug: "ecommerce" },
  { icon: Workflow, name: "Business Automation", description: "Automate repetitive tasks and manual workflows.", slug: "business-automation" },
  { icon: BarChart3, name: "Data Analytics", description: "Turn raw data into business insights.", slug: "data-analytics" },
  { icon: BarChart3, name: "Power BI Dashboards", description: "Interactive dashboards and real-time reporting.", slug: "power-bi-dashboards" },
  { icon: Cloud, name: "Cloud & DevOps", description: "Cloud infrastructure and CI/CD pipelines.", slug: "cloud-devops" },
  { icon: Database, name: "Database Management", description: "Database design, migration, and optimization.", slug: "database-management" },
  { icon: Link2, name: "API Development", description: "RESTful and GraphQL APIs for your integrations.", slug: "api-development" },
  { icon: Search, name: "SEO", description: "Search optimization for organic visibility.", slug: "seo" },
  { icon: Megaphone, name: "GEO", description: "Optimize for AI-powered search engines.", slug: "geo" },
  { icon: MessageCircle, name: "AEO", description: "Optimize for featured snippets and voice search.", slug: "aeo" },
  { icon: Globe, name: "Digital Marketing", description: "Strategies that drive traffic and leads.", slug: "digital-marketing" },
  { icon: Code2, name: "Custom Software", description: "Software built from scratch for your business.", slug: "custom-software" },
];

export function ServicesPage() {
  useSEO({
    title: SEO_TITLES.services,
    description: SEO_DESCRIPTIONS.services,
    canonical: "https://yebe.tech/services",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.services,
        description: SEO_DESCRIPTIONS.services,
        url: "https://yebe.tech/services",
        publisher: { "@type": "Organization", name: "YesBe", url: "https://yebe.tech" },
      }} />
      <PageHeader
        badge="Our Solutions"
        title="Technology"
        highlight="Solutions"
        description="AI tools, ERP systems, web development, and analytics — built for startups, SMEs, and enterprises."
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="relative bg-white py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[5%] right-[10%] h-[400px] w-[400px] rounded-full bg-[#dbeafe] opacity-[0.06] blur-[120px]" />
          <div className="absolute bottom-[10%] left-[5%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div
                key={service.name}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="card-glass group flex flex-col rounded-2xl p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#60a5fa] text-white shadow-md shadow-blue-500/20">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{service.name}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <Link
                  to={`/solutions/${service.slug}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-[#1d4ed8]"
                >
                  Explore {service.name}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <TechStackSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
