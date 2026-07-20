import { motion } from "framer-motion";
import {
  Store, GraduationCap, HeartPulse, Building2, Factory,
  UtensilsCrossed, Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Client {
  icon: LucideIcon;
  title: string;
  description: string;
}

const clients: Client[] = [
  { icon: Store, title: "Small Businesses", description: "Websites, Google profiles, and automation to compete with bigger brands." },
  { icon: Rocket, title: "Startups", description: "MVPs, scalable architecture, and fast prototyping to validate ideas." },
  { icon: UtensilsCrossed, title: "Restaurants", description: "QR ordering, AI billing, kitchen displays, and inventory forecasting." },
  { icon: GraduationCap, title: "Schools & Colleges", description: "ERP for student management, attendance, exams, and fees." },
  { icon: HeartPulse, title: "Hospitals", description: "Patient management, scheduling, pharmacy tracking, and records." },
  { icon: Store, title: "Retail Stores", description: "E-commerce, POS, inventory management, and loyalty programs." },
  { icon: Building2, title: "Corporate Companies", description: "Dashboards, automation, ERP, and custom internal tools." },
  { icon: Factory, title: "Manufacturing", description: "Production tracking, supply chain, quality dashboards, and ERP." },
];

export function WhoIHelpSection() {
  return (
    <section
      id="who-i-help"
      className="relative overflow-hidden bg-white py-12 lg:py-16"
      aria-label="Who I help — Small businesses, startups, restaurants, schools, hospitals, retail, corporate, manufacturing"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            Who I Help
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Businesses I{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Work With</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clients.map((client, i) => (
            <motion.article
              key={client.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-[20px] border border-white/40 bg-white p-5 transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 1px 3px rgba(37,99,235,0.03)" }}
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.06]">
                <client.icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="mb-1.5 text-[15px] font-bold text-foreground">{client.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{client.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
