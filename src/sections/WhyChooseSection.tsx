import {
  IndianRupee, Layers, Brain, Paintbrush, Lightbulb, Headphones,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: IndianRupee,
    title: "Transparent Quotes",
    description: "Scope-first proposals with no hidden costs. You approve the quotation before work begins.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Modular code and cloud-ready infrastructure that grows with your business.",
  },
  {
    icon: Brain,
    title: "AI Where It Matters",
    description: "AI integrated where it adds real value — chatbots, RAG systems, automation — not just buzzwords.",
  },
  {
    icon: Paintbrush,
    title: "Modern UI/UX",
    description: "Clean, responsive interfaces built with React and Tailwind. Designed to convert.",
  },
  {
    icon: Lightbulb,
    title: "Business-First Thinking",
    description: "Every feature maps to a real problem. Your investment delivers measurable returns.",
  },
  {
    icon: Headphones,
    title: "Post-Launch Support",
    description: "Maintenance, monitoring, and updates after deployment. Your project stays healthy.",
  },
];

export function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-label="Why choose YESBE"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why work with YESBE"
          description="A small, senior team focused on delivery — with clear scope, honest timelines and code you can build on."
        />

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:mt-12">
          {reasons.map((reason) => (
            <article key={reason.title} className="border-t border-border pt-5">
              <div className="mb-3 flex items-center gap-3">
                <reason.icon className="h-5 w-5 text-primary" strokeWidth={1.7} aria-hidden="true" />
                <h3 className="text-[15px] font-semibold text-navy">{reason.title}</h3>
              </div>
              <p className="text-[14px] leading-relaxed text-muted-foreground">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
