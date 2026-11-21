import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/utils/cn";
import type { DeliveryStage } from "@/data/phase2";

interface DeliveryRailProps {
  stages: DeliveryStage[];
  className?: string;
}

export function DeliveryRail({ stages, className }: DeliveryRailProps) {
  const [active, setActive] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stage = stages[active] ?? stages[0];

  if (!stage) return null;

  const move = (next: number) => {
    const bounded = (next + stages.length) % stages.length;
    setActive(bounded);
    buttonRefs.current[bounded]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      move(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      move(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      move(0);
    } else if (event.key === "End") {
      event.preventDefault();
      move(stages.length - 1);
    }
  };

  const StageIcon = stage.icon;

  return (
    <div className={cn("", className)}>
      <div
        role="tablist"
        aria-label="Delivery stages"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {stages.map((item, index) => {
          const selected = index === active;
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`delivery-tab-${index}`}
              aria-selected={selected}
              aria-controls="delivery-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "group relative flex min-h-[220px] flex-col rounded-[12px] border p-6 text-left transition-[transform,box-shadow,border-color,background-color,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17154C] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none",
                selected
                  ? "border-[#17154C] bg-[#17154C] shadow-[0_12px_28px_rgba(23,21,76,0.18)]"
                  : "border-[#E5E5EB] bg-white shadow-[0_1px_2px_rgba(23,21,76,0.04)] hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(23,21,76,0.08)]",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cn(
                    "text-[2rem] font-bold leading-none tracking-[-0.04em]",
                    selected ? "text-white" : "text-[#17154C]",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight
                  className={cn(
                    "size-5 shrink-0 transition-transform duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none",
                    selected ? "text-white" : "text-[#17154C] group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                  )}
                  aria-hidden="true"
                />
              </div>

              <Icon
                className={cn("mt-5 size-6", selected ? "text-white" : "text-[#17154C]")}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span
                className={cn(
                  "mt-5 block text-[1.125rem] font-bold leading-[1.25] tracking-[-0.02em]",
                  selected ? "text-white" : "text-[#171717]",
                )}
              >
                {item.title}
              </span>
              <span
                className={cn(
                  "mt-3 block text-[14px] leading-6",
                  selected ? "text-[#E8E8F0]" : "text-[#171717]",
                )}
              >
                {item.summary}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="delivery-panel"
        role="tabpanel"
        aria-labelledby={`delivery-tab-${active}`}
        className="mt-6 rounded-[12px] border border-[#E5E5EB] bg-[#F7F7F9] p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#17154C]">
              {String(active + 1).padStart(2, "0")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-lg bg-[#17154C]/[0.08] text-[#17154C]">
                <StageIcon className="size-5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="text-[1.75rem] font-bold leading-[1.15] tracking-[-0.03em] text-[#17154C]">
                {stage.title}
              </h3>
            </div>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#171717] sm:text-[16px]">
              {stage.detail}
            </p>
          </div>

          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#17154C]">
              Typical Outputs
            </p>
            <ul className="mt-5 space-y-3">
              {stage.artefacts.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-[#171717]">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#17154C]/[0.08] text-[#17154C]">
                    <Check className="size-3.5" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
