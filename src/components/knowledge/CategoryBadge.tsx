import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

interface CategoryBadgeProps {
  name: string;
  slug: string;
  className?: string;
  onClick?: () => void;
}

export function CategoryBadge({ name, slug, className, onClick }: CategoryBadgeProps) {
  return (
    <Link
      to={`/knowledge-center/category/${slug}`}
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full bg-primary/[0.06] px-3 py-1 text-[11px] font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white",
        className,
      )}
    >
      {name}
    </Link>
  );
}
