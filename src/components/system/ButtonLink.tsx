import type { MouseEventHandler, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "inverted" | "on-dark" | "link";
type ButtonSize = "sm" | "md" | "lg";
type ButtonIcon = ReactNode | null;

interface ButtonLinkProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
  iconPosition?: "start" | "end";
  withArrow?: boolean;
  external?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  ariaLabel?: string;
  title?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  inverted: "btn-inverted",
  "on-dark": "btn-on-dark",
  link: "btn-link",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "",
  lg: "min-h-14 px-7 py-4 text-base",
};

export function ButtonLink({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "end",
  withArrow = false,
  external = false,
  disabled = false,
  className,
  id,
  ariaLabel,
  title,
}: ButtonLinkProps) {
  const resolvedIcon =
    icon === undefined && withArrow ? (
      variant === "link" ? (
        <ArrowRight className="size-4" aria-hidden="true" />
      ) : (
        <ArrowUpRight className="size-4" aria-hidden="true" />
      )
    ) : (
      icon
    );

  const classes = cn(
    "group",
    variants[variant],
    variant !== "link" && sizes[size],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  const content = (
    <>
      {resolvedIcon && iconPosition === "start" && (
        <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">
          {resolvedIcon}
        </span>
      )}
      <span>{children}</span>
      {resolvedIcon && iconPosition === "end" && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          {resolvedIcon}
        </span>
      )}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} onClick={onClick} className={classes} id={id} aria-label={ariaLabel} title={title}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        id={id}
        aria-label={ariaLabel}
        title={title}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      id={id}
      aria-label={ariaLabel}
      title={title}
    >
      {content}
    </button>
  );
}
