import { cn } from "@/utils/cn";

interface EditorialHeadingProps {
  line1: string;
  line2: string;
  as?: "h1" | "h2";
  className?: string;
  variant?: "default" | "hero";
}

export function EditorialHeading({ line1, line2, as: Tag = "h1", className, variant = "default" }: EditorialHeadingProps) {
  const hero = variant === "hero";
  return (
    <Tag className={cn("text-left text-[#11114F]", className)}>
      <span
        className={cn(
          "block uppercase",
          hero
            ? "text-[clamp(2.75rem,7vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.035em]"
            : "text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.9] tracking-[0.04em]",
        )}
      >
        {line1}
      </span>
      <span
        className={cn(
          "block font-normal",
          hero
            ? "mt-[0.08em] text-[clamp(3.25rem,8.5vw,7.25rem)] leading-[1.05] tracking-[0.01em]"
            : "mt-1 pl-[0.9em] text-[clamp(4rem,12vw,8.5rem)] leading-[0.85] tracking-[0.01em] sm:pl-[1.1em]",
        )}
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        {line2}
      </span>
    </Tag>
  );
}
