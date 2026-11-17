import { cn } from "@/utils/cn";
import { SERVICE_VISUALS } from "@/data/media";
import type { ServiceVisualVariant } from "@/data/phase2";
import { localSrcSet } from "@/utils/images";

interface ServiceVisualProps {
  variant: ServiceVisualVariant;
  tone?: "light" | "dark";
  className?: string;
  compact?: boolean;
}

export function ServiceVisual({
  variant,
  tone = "light",
  className,
  compact = false,
}: ServiceVisualProps) {
  const visual = SERVICE_VISUALS[variant];
  const dark = tone === "dark";
  const srcSet = localSrcSet(visual.src, [640, 960, 1600]);

  return (
    <div
      className={cn(
        "group/visual relative isolate overflow-hidden",
        dark ? "bg-[#071833]" : "bg-[#07101f]",
        className,
      )}
      aria-hidden="true"
    >
      <img
        src={visual.src}
        srcSet={srcSet}
        sizes={
          compact
            ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            : "(min-width: 1024px) 50vw, 100vw"
        }
        alt=""
        loading="lazy"
        decoding="async"
        width={1600}
        height={1000}
        className={cn(
          "absolute inset-0 size-full object-cover object-[58%_50%] transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none",
          compact ? "min-h-36" : "min-h-56",
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,32,0.08),rgba(4,14,32,0.5))]" />
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          dark
            ? "bg-[radial-gradient(circle_at_75%_15%,rgba(73,132,255,0.14),transparent_50%)]"
            : "bg-[linear-gradient(90deg,rgba(4,14,32,0.34),transparent_48%)]",
        )}
      />
    </div>
  );
}
