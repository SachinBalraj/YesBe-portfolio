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
  { icon: GraduationCap, name: "Education", description: "School and college ERP systems, student management, result automation, and digital learning platforms." },
  { icon: HeartPulse, name: "Healthcare", description: "Hospital management, patient records, appointment scheduling, and pharmacy inventory systems." },
  { icon: ShoppingBag, name: "Retail", description: "E-commerce platforms, inventory management, POS systems, and customer loyalty programs." },
  { icon: UtensilsCrossed, name: "Restaurants", description: "QR code ordering, AI-powered billing, kitchen display systems, and inventory forecasting." },
  { icon: Factory, name: "Manufacturing", description: "Production tracking, supply chain management, quality control dashboards, and ERP integration." },
  { icon: Landmark, name: "Finance", description: "Financial dashboards, automated reporting, compliance tools, and business analytics." },
  { icon: Building, name: "Construction", description: "Project management tools, material tracking, workforce management, and cost estimation software." },
  { icon: Truck, name: "Logistics", description: "Fleet management, delivery tracking, warehouse management, and route optimization." },
  { icon: Home, name: "Real Estate", description: "Property listing platforms, CRM systems, lead management, and virtual tour integrations." },
  { icon: Rocket, name: "Startups", description: "MVP development, rapid prototyping, scalable architecture, and go-to-market technology strategy." },
  { icon: Building2, name: "SMEs", description: "Affordable business websites, automation tools, data dashboards, and digital transformation consulting." },
  { icon: Globe, name: "Enterprises", description: "Large-scale ERP, custom software, cloud infrastructure, AI integration, and enterprise architecture." },
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
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5F0FF] bg-[#eff6ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#2563eb]"
          >
            Industries
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl"
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
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#64748B]"
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
              className="group rounded-[20px] border border-[#E5F0FF] bg-white p-5 transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.02), 0 4px 12px rgba(37,99,235,0.03)" }}
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff6ff] transition-all duration-300 group-hover:bg-[#dbeafe]">
                <industry.icon className="h-5 w-5 text-[#2563eb]" strokeWidth={1.8} />
              </div>
              <h3 className="mb-1.5 text-[15px] font-bold text-[#0F172A]">{industry.name}</h3>
              <p className="text-[13px] leading-relaxed text-[#64748B]">{industry.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
