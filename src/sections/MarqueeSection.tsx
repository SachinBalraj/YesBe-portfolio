import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiDocker,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiRedis,
  SiGooglecloud,
  SiKubernetes,
  SiGit,
  SiGraphql,
  SiTailwindcss,
  SiHtml5,
  SiFigma,
  SiLangchain,
} from "react-icons/si";
import {
  TbBrandAws,
  TbBrandAzure,
  TbBrandCss3,
  TbBrandOpenai,
} from "react-icons/tb";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

interface TechItem {
  name: string;
  Icon: ComponentType<IconProps>;
  color: string;
}

const techStack: TechItem[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Power BI", Icon: PowerBiIcon, color: "#F2C811" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "AWS", Icon: TbBrandAws, color: "#FF9900" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "OpenAI", Icon: TbBrandOpenai, color: "#412991" },
  { name: "LangChain", Icon: SiLangchain, color: "#1C3C3C" },
  { name: "ERP", Icon: ErpIcon, color: "#6366F1" },
  { name: "SEO", Icon: SeoIcon, color: "#10B981" },
  { name: "GEO", Icon: GeoIcon, color: "#3B82F6" },
  { name: "AEO", Icon: AeoIcon, color: "#8B5CF6" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { name: "Express.js", Icon: SiExpress, color: "#000000" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "Redis", Icon: SiRedis, color: "#DC382D" },
  { name: "Azure", Icon: TbBrandAzure, color: "#0089D6" },
  { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4" },
  { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "REST API", Icon: RestApiIcon, color: "#2563EB" },
  { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: TbBrandCss3, color: "#1572B6" },
  { name: "Vercel", Icon: VercelIcon, color: "#000000" },
  { name: "Netlify", Icon: NetlifyIcon, color: "#00C7B7" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
];

function PowerBiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="3" width="7" height="18" rx="1.5" fill="#F2C811" />
      <rect x="11" y="3" width="4.5" height="12" rx="1.5" fill="#F2C811" opacity="0.75" />
      <rect x="17.5" y="3" width="4.5" height="8" rx="1.5" fill="#F2C811" opacity="0.5" />
    </svg>
  );
}

function ErpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.9" />
      <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.65" />
      <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.65" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function SeoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2.5" />
      <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10.5 7v3.5l2.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GeoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2c3 3 4.5 5.5 4.5 8s-1.5 5-4.5 8c-3-3-4.5-5.5-4.5-8s1.5-5 4.5-8z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="3.5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function AeoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
      <path d="M12 9v6M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RestApiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="5" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="8.5" y="14" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M6.5 10v2.5a1 1 0 001 1h9a1 1 0 001-1V10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 13.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function VercelIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L2 22h20L12 2z" />
    </svg>
  );
}

function NetlifyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 2h16l-3.5 7H8L4 2z" fill="currentColor" opacity="0.8" />
      <path d="M7.5 9L4 22h5.5l2-7H7.5z" fill="currentColor" />
      <path d="M16.5 9L13 22h5.5l2-7h-4z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

const GAP = 32;

export function MarqueeSection() {
  const items = [...techStack, ...techStack];

  return (
    <section
      className="relative border-y border-white/20 bg-gradient-to-r from-white via-[#f8fafc] to-white py-5 overflow-hidden"
      aria-label="Technology stack showcase — React, Node.js, Python, AWS, Docker, and more"
    >
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 sm:w-24 md:w-32" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 sm:w-24 md:w-32" />

      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ gap: `${GAP}px` }}
      >
        {items.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex shrink-0 items-center gap-2.5 rounded-full border border-white/50 bg-white/80 px-4 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-[0_2px_12px_rgba(37,99,235,0.10)] hover:scale-[1.05]"
          >
            <tech.Icon
              size={20}
              className="shrink-0 transition-colors duration-300 sm:hidden"
              style={{ color: tech.color }}
            />
            <tech.Icon
              size={24}
              className="hidden shrink-0 transition-colors duration-300 sm:block lg:hidden"
              style={{ color: tech.color }}
            />
            <tech.Icon
              size={28}
              className="hidden shrink-0 transition-colors duration-300 lg:block"
              style={{ color: tech.color }}
            />
            <span className="whitespace-nowrap text-[13px] font-semibold tracking-wide text-foreground/70 transition-colors duration-300 group-hover:text-foreground sm:text-[14px]">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
