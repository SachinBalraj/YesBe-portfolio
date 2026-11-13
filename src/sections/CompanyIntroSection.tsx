import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

const facts = [
  { label: "Founded", value: "2024" },
  { label: "Focus", value: "Custom software, ERP, web platforms, AI and automation" },
  { label: "Engagements", value: "Project-based delivery and ongoing IT consulting" },
];

export function CompanyIntroSection() {
  return (
    <section id="about-yesbe" className="bg-white py-16 sm:py-20 lg:py-24" aria-label="About YESBE Technologies">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              title="A technology partner, not just a vendor"
              description="YESBE Technologies is an IT consulting and software development company based in Salem, Tamil Nadu. We design and build custom software, ERP systems, web applications, AI and automation tooling, and analytics dashboards."
            />

            <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.75] text-muted-foreground">
              We work with a small, senior team and keep scope explicit. That means honest timelines,
              maintainable code, and a clear handover — whether you are launching a first website or
              replacing spreadsheets with a proper system.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 py-1 text-[14px] font-semibold text-primary hover:text-[#1d4ed8]"
              >
                More about YESBE
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/sachin-balraj"
                className="inline-flex items-center gap-2 py-1 text-[14px] font-semibold text-primary hover:text-[#1d4ed8]"
              >
                Meet the founder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <dl className="divide-y divide-border border-y border-border">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[110px_1fr] gap-4 py-4 sm:grid-cols-[140px_1fr]">
                <dt className="text-[12px] font-medium tracking-[0.02em] text-slate-500">
                  {fact.label}
                </dt>
                <dd className="text-[13.5px] leading-relaxed text-navy">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
