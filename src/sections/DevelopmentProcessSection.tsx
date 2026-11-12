import {
  Search, FileText, Palette, Code, TestTube, Rocket, LifeBuoy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
}

const steps: Step[] = [
  { icon: Search, title: "Discovery", description: "Understand business goals, requirements, target audience and project scope.", duration: "1–2 days" },
  { icon: FileText, title: "Planning", description: "Prepare the roadmap, architecture, technology stack, milestones and delivery plan.", duration: "2–3 days" },
  { icon: Palette, title: "UI/UX Design", description: "Design interfaces, user flows and prototypes for client approval.", duration: "3–5 days" },
  { icon: Code, title: "Development", description: "Build frontend, backend, APIs, database and core features.", duration: "10–14 days" },
  { icon: TestTube, title: "Testing & QA", description: "Functional, responsive and security testing with performance checks.", duration: "2–3 days" },
  { icon: Rocket, title: "Deployment", description: "Deploy, configure domain, SSL, hosting, SEO, analytics and go live.", duration: "1–2 days" },
  { icon: LifeBuoy, title: "Support", description: "Post-launch monitoring, bug resolution and minor improvements.", duration: "30 days free" },
];

export function DevelopmentProcessSection() {
  return (
    <section id="process" className="bg-white py-16 sm:py-20 lg:py-24" aria-label="Development process">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How we work"
          description="A clear, structured process — from first call to post-launch support."
        />

        <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold tabular-nums text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <step.icon className="h-4 w-4 text-slate-400" strokeWidth={1.7} aria-hidden="true" />
              </div>
              <h3 className="mt-2 text-[15px] font-semibold text-navy">{step.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{step.description}</p>
              <p className="mt-2 text-[12px] font-medium text-slate-500">{step.duration}</p>
            </li>
          ))}
        </ol>

        <p className="mt-12 border border-border bg-slate-50 px-6 py-5 text-[14px] leading-relaxed text-muted-foreground">
          Most YESBE projects are designed, developed, tested and deployed within{" "}
          <span className="font-semibold text-navy">30 days</span>, depending on scope and client feedback timelines.
        </p>
      </div>
    </section>
  );
}
