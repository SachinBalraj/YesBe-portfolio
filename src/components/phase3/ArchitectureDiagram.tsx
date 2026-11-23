import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import { cn } from "@/utils/cn";

function inferGroups(study: CaseStudy): { label: string; items: string[] }[] {
  const tech = study.technologies;
  const frontend = tech.filter((t) => /React|Next|TypeScript|Tailwind|Vite|Framer|CSS|HTML/i.test(t));
  const backend = tech.filter((t) => /Node|Express|Python|API|Socket|Redis|OpenAI|LangChain/i.test(t));
  const data = tech.filter((t) => /Mongo|Postgres|SQL|Power BI|DAX|Azure|Analytics|Search Console|SEMrush|Schema/i.test(t));
  const infra = tech.filter((t) => /Docker|Stripe|QR|Zapier|REST/i.test(t));
  const used = new Set([...frontend, ...backend, ...data, ...infra]);
  const other = tech.filter((t) => !used.has(t));
  const groups = [
    { label: "Interface", items: frontend },
    { label: "Application", items: backend.length ? backend : other.splice(0, Math.ceil(other.length / 2)) },
    { label: "Data & Insights", items: data },
    { label: "Integrations", items: infra.length ? infra : other },
  ].filter((g) => g.items.length > 0);
  return groups.length ? groups : [{ label: "Technology", items: tech }];
}

export function ProjectArchitecture({ study }: { study: CaseStudy }) {
  const groups = inferGroups(study);
  return (
    <div className="relative overflow-hidden border border-[#E5E5EB] bg-[#F7F7FA] p-3 sm:p-4">
      <div className="grid gap-px overflow-hidden border border-[#E5E5EB] bg-[#E5E5EB] sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group, index) => (
          <div key={group.label} className="relative bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#17154C]">{String(index + 1).padStart(2, "0")}</span>
              {index < groups.length - 1 && <ArrowRight className="hidden size-3.5 text-[#17154C]/30 lg:block" aria-hidden="true" />}
            </div>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#101018]">{group.label}</p>
            <ul className="mt-3 space-y-1.5">
              {group.items.map((item) => <li key={item} className="text-[11.5px] leading-5 text-[#454550]">{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-[#E5E5EB] pt-3">
        <span className="size-1.5 rounded-full bg-[#17154C]" aria-hidden="true" />
        <p className="text-[10.5px] leading-5 text-[#454550]/80">Technology layers shown for this project record. Final architecture depends on deployment and business requirements.</p>
      </div>
    </div>
  );
}

export function IndustryArchitecture({ steps, accent }: { steps: { label: string; detail: string }[]; accent: string }) {
  return (
    <div className="relative overflow-hidden border border-white/12 bg-[#071833] p-4 sm:p-6">
      <div className="absolute -right-24 -top-24 size-64 rounded-full" style={{ background: `radial-gradient(circle, ${accent}22, transparent 68%)` }} aria-hidden="true" />
      <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.label} className="relative border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] font-semibold tracking-[0.14em]" style={{ color: accent }}>{String(index + 1).padStart(2, "0")}</span>
              {index < steps.length - 1 && <ArrowRight className="hidden size-3.5 text-white/30 lg:block" aria-hidden="true" />}
            </div>
            <p className="mt-3 text-[12px] font-semibold leading-5 text-white">{step.label}</p>
            <p className="mt-1.5 text-[10.5px] leading-5 text-white/68">{step.detail}</p>
          </div>
        ))}
      </div>
      <div className={cn("relative mt-4 flex items-center gap-2 border-t border-white/10 pt-3")}>
        <span className="size-1.5 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
        <p className="text-[10px] leading-5 text-white/62">Reference architecture for the industry workflow. Final scope depends on the systems already in place.</p>
      </div>
    </div>
  );
}
