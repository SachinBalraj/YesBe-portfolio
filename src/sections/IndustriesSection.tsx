import { motion } from "framer-motion";
import {
  GraduationCap, HeartPulse, ShoppingBag, UtensilsCrossed,
  Factory, Landmark, Building, Truck, Home, Rocket, Building2, Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Industry {
  icon: LucideIcon;
  name: string;
  description: string;
}

const industries: Industry[] = [
  { icon: GraduationCap, name: "Education", description: "School and college ERP, student management, result automation, and e-learning." },
  { icon: HeartPulse, name: "Healthcare", description: "Hospital management, patient records, scheduling, and pharmacy tracking." },
  { icon: ShoppingBag, name: "Retail", description: "E-commerce, inventory management, POS systems, and loyalty programs." },
  { icon: UtensilsCrossed, name: "Restaurants", description: "QR ordering, AI billing, kitchen displays, and inventory forecasting." },
  { icon: Factory, name: "Manufacturing", description: "Production tracking, supply chain management, and quality dashboards." },
  { icon: Landmark, name: "Finance", description: "Financial dashboards, automated reporting, and compliance tools." },
  { icon: Building, name: "Construction", description: "Project management, material tracking, and cost estimation tools." },
  { icon: Truck, name: "Logistics", description: "Fleet management, delivery tracking, and route optimization." },
  { icon: Home, name: "Real Estate", description: "Property platforms, CRM, lead management, and virtual tours." },
  { icon: Rocket, name: "Startups", description: "MVP development, rapid prototyping, and go-to-market strategy." },
  { icon: Building2, name: "SMEs", description: "Affordable websites, automation, dashboards, and tech consulting." },
  { icon: Globe, name: "Enterprises", description: "Large-scale ERP, custom software, cloud, and AI integration." },
  { icon: Landmark, name: "Government", description: "Portals, citizen services, e-governance, and compliance systems." },
];

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-white py-24 lg:py-28"
      aria-label="Industries served — Education, Healthcare, Retail, Manufacturing, Finance, and more"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,#eaf6ff_0%,transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center lg:mb-18">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Industries
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Industries We{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Serve</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground"
          >
            Custom technology solutions for every industry — from startups to enterprises.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry, i) => (
            <motion.article
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group card-glass rounded-[20px] p-5"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.06] transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                <industry.icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="mb-1.5 text-[15px] font-bold text-foreground">{industry.name}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{industry.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
