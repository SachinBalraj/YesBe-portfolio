import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import { cn } from "@/utils/cn";

export function ProjectArchitecture({ study }: { study: CaseStudy }) {
  return (
    <div className="relative overflow-hidden border border-line bg-paper p-3 sm:p-4">
      <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {study.techGroups.map((group, index) => (
          <div key={group.label} className="relative bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < study.techGroups.length - 1 && (
                <ArrowRight className="hidden size-3.5 text-line-strong lg:block" aria-hidden="true" />
              )}
            </div>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              {group.label}
            </p>
            <ul className="mt-3 space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-[11.5px] leading-5 text-body">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
        <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
        <p className="text-[10.5px] leading-5 text-body/80">
          Implementation layers recorded for this build. No production infrastructure or client
          environment is implied.
        </p>
      </div>
    </div>
  );
}

export function IndustryArchitecture({
  steps,
  accent,
}: {
  steps: { label: string; detail: string }[];
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden border border-white/12 bg-[#071833] p-4 sm:p-6">
      <div className="absolute -right-24 -top-24 size-64 rounded-full" style={{ background: `radial-gradient(circle, ${accent}22, transparent 68%)` }} aria-hidden="true" />
      <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.label} className="relative border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] font-semibold tracking-[0.14em]" style={{ color: accent }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden size-3.5 text-white/30 lg:block" aria-hidden="true" />
              )}
            </div>
            <p className="mt-3 text-[12px] font-semibold leading-5 text-white">{step.label}</p>
            <p className="mt-1.5 text-[10.5px] leading-5 text-white/68">{step.detail}</p>
          </div>
        ))}
      </div>
      <div className={cn("relative mt-4 flex items-center gap-2 border-t border-white/10 pt-3")}>
        <span className="size-1.5 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
        <p className="text-[10px] leading-5 text-white/62">
          Reference architecture for the industry workflow. Final scope depends on the systems
          already in place.
        </p>
      </div>
    </div>
  );
}
