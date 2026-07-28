import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHeader } from "@/components/common/PageHeader";
import { fadeInUp, staggerContainer } from "@/animations";
import {
  Rocket, Briefcase, Building2, Heart, GraduationCap,
  ShoppingBag, Factory, Truck, Utensils, DollarSign, Home,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const WhoIHelpSection = lazy(() =>
  import("@/sections/WhoIHelpSection").then((m) => ({ default: m.WhoIHelpSection }))
);
const ContactSection = lazy(() =>
  import("@/sections/ContactSection").then((m) => ({ default: m.ContactSection }))
);

interface Industry {
  icon: LucideIcon;
  name: string;
  description: string;
  slug: string;
}

const industries: Industry[] = [
  { icon: Rocket, name: "Startups", description: "MVPs, scalable architecture, and fast prototyping to launch quickly.", slug: "startups" },
  { icon: Briefcase, name: "SMEs", description: "ERP, automation, and tools that compete with enterprise software.", slug: "smes" },
  { icon: Building2, name: "Large Enterprises", description: "System integration, legacy modernization, and custom AI tools.", slug: "large-enterprises" },
  { icon: Heart, name: "Healthcare", description: "Hospital systems, patient records, telemedicine, and compliance.", slug: "healthcare" },
  { icon: GraduationCap, name: "Education", description: "School ERP, student management, e-learning, and exam systems.", slug: "education" },
  { icon: ShoppingBag, name: "Retail", description: "POS, inventory, e-commerce, and customer loyalty programs.", slug: "retail" },
  { icon: Factory, name: "Manufacturing", description: "Production planning, supply chain, and IoT automation.", slug: "manufacturing" },
  { icon: Truck, name: "Logistics", description: "Fleet management, warehouse optimization, and live tracking.", slug: "logistics" },
  { icon: Utensils, name: "Hospitality", description: "Restaurant, hotel, and guest experience platforms.", slug: "hospitality" },
  { icon: DollarSign, name: "Finance", description: "Dashboards, compliance automation, and transaction processing.", slug: "finance" },
  { icon: Home, name: "Real Estate", description: "Property management, CRM, and virtual tour platforms.", slug: "real-estate" },
];

export function IndustriesPage() {
  useSEO({
    title: SEO_TITLES.industries,
    description: SEO_DESCRIPTIONS.industries,
    canonical: "https://yebe.tech/industries",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.industries,
        description: SEO_DESCRIPTIONS.industries,
        url: "https://yebe.tech/industries",
        publisher: { "@type": "Organization", name: "YesBe", url: "https://yebe.tech" },
      }} />
      <PageHeader
        badge="Industries"
        title="Industries We"
        highlight="Serve"
        description="Custom tech solutions for healthcare, education, retail, manufacturing, and more."
        breadcrumbs={[{ label: "Industries" }]}
      />

      <section className="relative bg-white py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[8%] left-[10%] h-[400px] w-[400px] rounded-full bg-[#dbeafe] opacity-[0.06] blur-[120px]" />
          <div className="absolute bottom-[12%] right-[5%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.05] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {industries.map((industry) => (
              <motion.div
                key={industry.name}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="card-glass group flex flex-col rounded-2xl p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#60a5fa] text-white shadow-md shadow-blue-500/20">
                  <industry.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{industry.name}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">{industry.description}</p>
                <Link
                  to={`/industries/${industry.slug}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-[#1d4ed8]"
                >
                  Explore Solutions
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <WhoIHelpSection />
      </Suspense>
      <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
