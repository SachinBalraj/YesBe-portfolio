import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
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
}

const industries: Industry[] = [
  { icon: Rocket, name: "Startups", description: "MVPs, scalable architecture, and fast prototyping to launch quickly." },
  { icon: Briefcase, name: "SMEs", description: "ERP, automation, and tools that compete with enterprise software." },
  { icon: Building2, name: "Large Enterprises", description: "System integration, legacy modernization, and custom AI tools." },
  { icon: Heart, name: "Healthcare", description: "Hospital systems, patient records, telemedicine, and compliance." },
  { icon: GraduationCap, name: "Education", description: "School ERP, student management, e-learning, and exam systems." },
  { icon: ShoppingBag, name: "Retail", description: "POS, inventory, e-commerce, and customer loyalty programs." },
  { icon: Factory, name: "Manufacturing", description: "Production planning, supply chain, and IoT automation." },
  { icon: Truck, name: "Logistics", description: "Fleet management, warehouse optimization, and live tracking." },
  { icon: Utensils, name: "Hospitality", description: "Restaurant, hotel, and guest experience platforms." },
  { icon: DollarSign, name: "Finance", description: "Dashboards, compliance automation, and transaction processing." },
  { icon: Home, name: "Real Estate", description: "Property management, CRM, and virtual tour platforms." },
];

export function IndustriesPage() {
  useSEO({
    title: "Industries We Serve — Healthcare, Education, Retail & More",
    description: "YesBe provides technology solutions for healthcare, education, retail, manufacturing, logistics, hospitality, finance, and real estate industries.",
    canonical: "https://yesbe.com/industries",
  });

  return (
    <>
      <PageHeader
        badge="Industries"
        title="Industries We"
        highlight="Serve"
        description="Custom tech solutions for healthcare, education, retail, manufacturing, and more."
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
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-[#1d4ed8]"
                >
                  Explore Solutions
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
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
