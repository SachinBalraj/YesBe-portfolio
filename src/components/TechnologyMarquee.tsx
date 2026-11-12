import type { ComponentType, SVGProps } from "react";
import { Cloud } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiTypescript, SiJavascript,
  SiDocker, SiKubernetes, SiGooglecloud, SiPostgresql, SiMongodb, SiRedis,
  SiGit, SiGithub, SiGraphql, SiFirebase,
} from "react-icons/si";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

interface TechItem {
  name: string;
  Icon: ComponentType<IconProps>;
}

const techStack: TechItem[] = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Python", Icon: SiPython },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Docker", Icon: SiDocker },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "AWS", Icon: Cloud },
  { name: "Azure", Icon: Cloud },
  { name: "Google Cloud", Icon: SiGooglecloud },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Redis", Icon: SiRedis },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "REST API", Icon: RestApiIcon },
  { name: "GraphQL", Icon: SiGraphql },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Power BI", Icon: PowerBiIcon },
];

function RestApiIcon(props: IconProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M8 8h8M8 12h6M8 16h4" />
    </svg>
  );
}

function PowerBiIcon(props: IconProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8.836 15.868a.74.74 0 0 1-.744.742.742.742 0 0 1-.743-.742V9.06a.742.742 0 0 1 .743-.743.74.74 0 0 1 .744.743v6.808zm3.82 2.93a.74.74 0 0 1-.744.742.742.742 0 0 1-.743-.742V6.257a.742.742 0 0 1 .743-.743.74.74 0 0 1 .744.743v12.541zm3.549-2.352a.742.742 0 0 1-1.486 0V8.617a.742.742 0 0 1 .743-.743.742.742 0 0 1 .743.743v7.829zM20.065 24H3.935A3.939 3.939 0 0 1 0 20.065V3.935A3.939 3.939 0 0 1 3.935 0h16.13A3.939 3.939 0 0 1 24 3.935v16.13A3.939 3.939 0 0 1 20.065 24zM3.935 1.487A2.45 2.45 0 0 0 1.487 3.935v16.13a2.45 2.45 0 0 0 2.448 2.448h16.13a2.45 2.45 0 0 0 2.448-2.448V3.935a2.45 2.45 0 0 0-2.448-2.448H3.935z" />
    </svg>
  );
}

export function TechnologyMarquee() {
  return (
    <section
      className="border-b border-border/70 bg-slate-50 py-10 lg:py-12"
      aria-label="Technologies we work with"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
          <div className="shrink-0 lg:w-64">
            <h2 className="text-lg font-semibold tracking-[-0.01em] text-navy">
              Technologies we work with
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Chosen per project — not a fixed stack.
            </p>
          </div>
          <ul className="flex flex-1 flex-wrap gap-x-7 gap-y-4">
            {techStack.map((tech) => (
              <li key={tech.name} className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                <tech.Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
