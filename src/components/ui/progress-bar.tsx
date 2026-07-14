import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/utils/cn";
import type { ProgressBarProps } from "@/types";

export function ProgressBar({
  value,
  max = 100,
  className,
  indicatorClassName,
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <ProgressPrimitive.Root
        className="relative h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full rounded-full bg-primary transition-all duration-700 ease-out",
            indicatorClassName
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}
