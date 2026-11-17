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
        className="relative grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 lg:grid-cols-5"
      >
        {stages.map((item, index) => {
          const selected = index === active;
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
                "group relative min-h-[7.25rem] bg-paper px-4 py-5 text-left transition-colors duration-300 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-5",
                selected ? "bg-white" : "hover:bg-white/70",
              )}
            >
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 origin-left bg-primary transition-transform duration-500",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
                aria-hidden="true"
              />
              <span className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "font-mono text-[10px] font-semibold tracking-[0.12em]",
                    selected ? "text-primary" : "text-body/85",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight
                  className={cn(
                    "size-3.5 transition-all duration-300",
                    selected
                      ? "translate-x-0 text-primary opacity-100"
                      : "-translate-x-1 text-body opacity-0 group-hover:translate-x-0 group-hover:opacity-60",
                  )}
                  aria-hidden="true"
                />
              </span>
              <span
                className={cn(
                  "mt-6 block text-sm font-semibold tracking-[-0.01em]",
                  selected ? "text-ink" : "text-ink-soft",
                )}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="delivery-panel"
        role="tabpanel"
        aria-labelledby={`delivery-tab-${active}`}
        className="grid border-x border-b border-line bg-white lg:grid-cols-[0.78fr_1.22fr]"
      >
        <div className="flex flex-col justify-between gap-8 border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div>
            <span className="inline-flex size-11 items-center justify-center border border-line bg-paper text-primary">
              <StageIcon className="size-5" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {`Stage ${String(active + 1).padStart(2, "0")}`}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-[1.75rem]">
              {stage.title}
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-body">{stage.summary}</p>
          </div>
          <div className="hidden items-center gap-3 text-[11px] font-medium uppercase tracking-[0.12em] text-body/85 lg:flex">
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            Select a stage to inspect the work
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <p className="max-w-2xl text-[15px] leading-7 text-body">{stage.detail}</p>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
            Typical outputs
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {stage.artefacts.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-6 text-body">
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center bg-primary/10 text-primary">
                  <Check className="size-2.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
