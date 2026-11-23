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
    <Tag className={cn("text-[#17154C]", className)}>
      <span
        className={cn(
          "block uppercase",
          hero
            ? "text-[clamp(3.5rem,8.5vw,6.25rem)] font-extrabold leading-[0.88] tracking-[-0.035em]"
            : "text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.9] tracking-[0.04em]",
        )}
      >
        {line1}
      </span>
      <span
        className={cn(
          "block font-normal",
          hero
            ? "-mt-[0.3em] pl-[0.78em] text-[clamp(5.25rem,10.5vw,8.25rem)] leading-[0.92] tracking-[0.01em] sm:pl-[0.92em]"
            : "mt-1 pl-[0.9em] text-[clamp(4rem,12vw,8.5rem)] leading-[0.85] tracking-[0.01em] sm:pl-[1.1em]",
        )}
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        {line2}
      </span>
    </Tag>
  );
}
