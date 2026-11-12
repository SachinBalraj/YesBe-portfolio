import {
  TrendingUp, Clock, Cpu, BarChart3, IndianRupee, Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

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
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-label="What our technology solutions are built to deliver"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What solutions are built to deliver"
          description="Every engagement starts with a business problem. These are the outcomes each type of solution is designed for."
        />

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="border-t border-border pt-5">
              <div className="mb-3 flex items-center gap-3">
                <b.icon className="h-5 w-5 text-primary" strokeWidth={1.7} aria-hidden="true" />
                <h3 className="text-[15px] font-semibold text-navy">{b.title}</h3>
              </div>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-12 lg:mt-20 lg:pt-14">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-navy sm:text-[1.75rem]">
            Typical scope by service
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {scope.map((r) => (
              <div key={r.service} className="border border-border bg-slate-50 p-5">
                <h3 className="mb-3 text-[14px] font-semibold text-navy">{r.service}</h3>
                <ul className="space-y-2">
                  {r.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-[13px] leading-relaxed text-muted-foreground">
                      <span className="mt-[7px] h-1 w-1 shrink-0 bg-primary" aria-hidden="true" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
