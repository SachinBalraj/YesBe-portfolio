import { motion } from "framer-motion";
import {
  TrendingUp, Clock, Cpu, BarChart3, IndianRupee, Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  { icon: TrendingUp, title: "Increase Sales", description: "Websites and stores that turn visitors into paying customers." },
  { icon: Clock, title: "Cut Manual Work", description: "Automate data entry, reports, and inventory updates." },
  { icon: Cpu, title: "Automate Processes", description: "Workflows that run 24/7 without human intervention." },
  { icon: BarChart3, title: "Better Reporting", description: "Real-time dashboards that show what's happening now." },
  { icon: IndianRupee, title: "Lower Costs", description: "Reduce staffing and overhead through smart automation." },
  { icon: Users, title: "Boost Engagement", description: "Chatbots, CRMs, and portals that keep customers connected." },
];

interface Result {
  service: string;
  outcomes: string[];
}

const scope: Result[] = [
  { service: "ERP System", outcomes: ["Centralise business records in one place", "Structured inventory tracking", "Consolidated financial reporting", "Standardised internal processes"] },
  { service: "AI Chatbot", outcomes: ["Round-the-clock query handling", "Consistent first-response answers", "Deflection of repetitive questions", "Escalation to human agents where needed"] },
  { service: "Business Website", outcomes: ["A clear online presence for your services", "Enquiry and contact capture", "Credible brand presentation", "Search-friendly page structure"] },
  { service: "Power BI Dashboard", outcomes: ["Refreshed reporting on connected data", "Reduced manual report preparation", "KPI visibility for stakeholders", "Drill-down into underlying records"] },
];

export function BusinessResultsSection() {
  return (
    <section
      id="business-results"
      className="relative overflow-hidden bg-gradient-to-b from-[#f8fbff] to-white py-12 lg:py-16"
      aria-label="What our technology solutions are built to deliver — sales, automation, reporting, cost and engagement improvements"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Benefits */}
        <div className="mb-12">
          <div className="mb-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
            >
              Business Benefits
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              What Solutions{" "}
              <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Are Built To Deliver</span>
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
              className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
            >
              Every engagement starts with a business problem. These are the outcomes each type of solution is designed for.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group card-glass rounded-[20px] p-6"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.06] transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                  <b.icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
                </div>
                <h3 className="mb-1.5 text-[16px] font-bold text-foreground">{b.title}</h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Results by service */}
        <div>
          <div className="mb-10 text-center">
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
            >
              Typical Scope by{" "}
              <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Service</span>
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {scope.map((r, i) => (
              <motion.div
                key={r.service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-glass rounded-[20px] p-5"
              >
                <h3 className="mb-3 text-[15px] font-bold text-primary">{r.service}</h3>
                <ul className="space-y-2">
                  {r.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]/40" />
                      {o}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
