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
  Megaphone, MessageCircle, ArrowRight, Compass, Waypoints,
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
  { icon: Compass, name: "IT Consulting", description: "Audits and roadmaps before you spend more on the wrong thing.", slug: "it-consulting" },
  { icon: Waypoints, name: "Digital Transformation", description: "Phased, integration-first change that ships value from day one.", slug: "digital-transformation" },
];

export function ServicesPage() {
  useSEO({
    title: SEO_TITLES.services,
    description: SEO_DESCRIPTIONS.services,
    canonical: "https://www.yesbe.tech/services",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.services,
        description: SEO_DESCRIPTIONS.services,
        url: "https://www.yesbe.tech/services",
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "YESBE Technology Solutions",
        description: SEO_DESCRIPTIONS.services,
        url: "https://www.yesbe.tech/services",
        numberOfItems: services.length,
        itemListElement: services.map((service, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: service.name,
            description: service.description,
            url: `https://www.yesbe.tech/services/${service.slug}`,
            provider: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
          },
        })),
      }} />
      <PageHeader
        badge="Our Solutions"
        title="Technology"
        highlight="Solutions"
        description="AI tools, ERP systems, web development, and analytics — built for startups, SMEs, and enterprises."
        breadcrumbs={[{ label: "Services" }]}
        hideBreadcrumbNav
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Our Services</h2>
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
                className="group flex flex-col border border-border bg-white p-6 transition-colors hover:border-slate-300"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-primary/[0.06]">
                  <service.icon className="h-5 w-5 text-primary" strokeWidth={1.7} />
                </div>
                <h3 className="mb-2 text-[16px] font-semibold text-navy">{service.name}</h3>
                <p className="mb-5 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">{service.description}</p>
                <Link
                  to={`/services/${service.slug}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-[#1d4ed8]"
                >
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <TechStackSection />
        </div>
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <div className="contain-content">
          <ContactSection />
        </div>
      </Suspense>
    </>
  );
}
