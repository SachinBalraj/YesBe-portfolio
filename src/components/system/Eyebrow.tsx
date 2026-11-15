import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface EyebrowProps {
  children: ReactNode;
  tone?: "light" | "dark";
  plain?: boolean;
  className?: string;
}

export function Eyebrow({ children, tone = "light", plain = false, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "eyebrow",
        plain && "eyebrow-plain",
        tone === "dark" && "text-cobalt-bright",
        className,
      )}
    >
      {children}
    </span>
  );
}
