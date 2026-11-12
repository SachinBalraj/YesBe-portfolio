import { Link } from "react-router-dom";
import {
  GraduationCap, HeartPulse, ShoppingBag, UtensilsCrossed,
  Factory, Landmark, Truck, Home, Rocket, Building2, Globe, ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

interface Industry {
  icon: LucideIcon;
  name: string;
  description: string;
  slug: string;
}

const industries: Industry[] = [
  { icon: GraduationCap, name: "Education", description: "School and college ERP, student management, result automation and e-learning.", slug: "education" },
  { icon: HeartPulse, name: "Healthcare", description: "Hospital management, patient records, scheduling and pharmacy tracking.", slug: "healthcare" },
  { icon: ShoppingBag, name: "Retail", description: "E-commerce, inventory management, POS systems and loyalty programs.", slug: "retail" },
  { icon: UtensilsCrossed, name: "Hospitality", description: "QR ordering, billing, kitchen displays and inventory forecasting.", slug: "hospitality" },
  { icon: Factory, name: "Manufacturing", description: "Production tracking, supply chain management and quality dashboards.", slug: "manufacturing" },
  { icon: Landmark, name: "Finance", description: "Financial dashboards, automated reporting and compliance tools.", slug: "finance" },
  { icon: Truck, name: "Logistics", description: "Fleet management, delivery tracking and route optimization.", slug: "logistics" },
  { icon: Home, name: "Real Estate", description: "Property platforms, CRM, lead management and virtual tours.", slug: "real-estate" },
  { icon: Rocket, name: "Startups", description: "MVP development, rapid prototyping and go-to-market support.", slug: "startups" },
  { icon: Building2, name: "SMEs", description: "Affordable websites, automation, dashboards and tech consulting.", slug: "smes" },
  { icon: Globe, name: "Large Enterprises", description: "Large-scale ERP, custom software, cloud and AI integration.", slug: "large-enterprises" },
];

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-label="Industries served"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Industries we serve"
          description="We adapt the same engineering discipline to the workflows, compliance needs and constraints of each sector."
          action={
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 py-1 text-[14px] font-semibold text-primary hover:text-[#1d4ed8]"
            >
              Explore industries
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className="group flex items-start gap-4 border-t border-border pt-5"
            >
              <industry.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.7} aria-hidden="true" />
              <div>
                <h3 className="text-[15px] font-semibold text-navy group-hover:text-primary">{industry.name}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
