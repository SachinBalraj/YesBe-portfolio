import { Lightbulb, CheckCircle2 } from "lucide-react";
import type { Article } from "@/knowledge/types";

export function KeyTakeaways({ article }: { article: Article }) {
  if (!article.keyTakeaways.length) return null;
  return (
    <aside
      aria-label="Key takeaways"
      className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-[#eff6ff] to-white p-6"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#dbeafe] opacity-40 blur-[60px]" />
      <div className="relative flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white">
          <Lightbulb className="h-4 w-4" />
        </span>
        <h2 className="text-[15px] font-bold text-foreground">Key Takeaways</h2>
      </div>
      <ul className="relative mt-4 space-y-2.5">
        {article.keyTakeaways.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-[14px] leading-relaxed text-foreground/90">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
