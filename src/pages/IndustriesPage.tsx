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
    canonical: "https://www.yesbe.tech/industries",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: SEO_TITLES.industries,
        description: SEO_DESCRIPTIONS.industries,
        url: "https://www.yesbe.tech/industries",
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <PageHeader
        badge="Industries"
        title="Industries We"
        highlight="Serve"
        description="Custom tech solutions for healthcare, education, retail, manufacturing, and more."
        breadcrumbs={[{ label: "Industries" }]}
        hideBreadcrumbNav
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Industries We Serve</h2>
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
                className="group flex flex-col border border-border bg-white p-6 transition-colors hover:border-slate-300"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-primary/[0.06]">
                  <industry.icon className="h-5 w-5 text-primary" strokeWidth={1.7} />
                </div>
                <h3 className="mb-2 text-[16px] font-semibold text-navy">{industry.name}</h3>
                <p className="mb-5 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">{industry.description}</p>
                <Link
                  to={`/industries/${industry.slug}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-[#1d4ed8]"
                >
                  Explore solutions
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
