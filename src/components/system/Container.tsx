import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type ContainerSize = "page" | "editorial" | "narrow";
type ContainerTag = "div" | "section" | "header" | "footer" | "nav";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ContainerTag;
  size?: ContainerSize;
  children: ReactNode;
}

const sizes: Record<ContainerSize, string> = {
  page: "container-page",
  editorial: "container-editorial",
  narrow: "mx-auto w-full max-w-3xl px-5 sm:px-7",
};

export function Container({
  as: Tag = "div",
  size = "page",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag className={cn(sizes[size], className)} {...props}>
      {children}
    </Tag>
  );
}
