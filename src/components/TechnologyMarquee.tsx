import type { ComponentType, SVGProps } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGit,
  SiGithub,
  SiGraphql,
  SiFirebase,
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
  { name: "AWS", Icon: AwsIcon },
  { name: "Azure", Icon: AzureIcon },
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

function AwsIcon(props: IconProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3.343 10.283q-.273 0-.492.158-.219.158-.219.44 0 .282.219.44.219.158.492.158.274 0 .493-.158.22-.158.22-.44 0-.282-.22-.44-.219-.158-.493-.158Zm2.262 0q-.273 0-.492.158-.22.158-.22.44 0 .282.22.44.219.158.492.158.274 0 .493-.158.22-.158.22-.44 0-.282-.22-.44-.219-.158-.493-.158ZM16.96 6.557l.808-1.377q.065-.11.027-.205-.038-.096-.164-.096h-1.406q-.082 0-.178.068-.096.069-.123.151l-.657 1.377q-.055.096-.027.164.027.069.178.069h1.312q.11 0 .164-.055.055-.055.096-.096Zm.755 12.729q-1.463.875-3.696 1.34-2.233.466-4.13.466-2.93 0-5.307-1.08-2.378-1.08-3.752-2.8-.11-.137-.027-.26.082-.123.233-.027 1.133.796 2.563 1.29 1.43.495 3.07.77 1.64.274 3.163.274 1.2 0 2.345-.137 1.145-.137 2.077-.384.096-.027.164.027.068.055.027.164-.178.383-.466.757ZM21.64 8.596q0 1.394-.438 2.928-.438 1.534-1.367 3.2-.93 1.667-2.14 3.01-1.211 1.344-2.378 2.2-.11.082-.22.041-.109-.041-.054-.178.655-1.668 1.012-2.99.356-1.32.562-2.427.205-1.108.205-1.89 0-.711-.192-1.25-.191-.54-.547-.885-.356-.356-.684-.52-.328-.164-.52-.274-.191-.11-.191-.26 0-.109.11-.205.11-.096.273-.096.274 0 .768.274.493.274.985.822.493.547.89 1.367.396.82.685 1.89.29 1.07.507 2.39.219 1.32.41 2.83.192 1.51.385 3.09.384-2.19 1.285-4.213.902-2.024 2.14-3.586 1.24-1.562 2.624-2.48 1.384-.917 2.48-1.145.11-.027.178.027.068.055.027.164-1.422 1.926-2.504 3.915-1.082 1.99-1.696 3.883-.615 1.895-.615 3.314 0 .67.164 1.14.165.47.466.74.301.273.657.384.356.11.658.11.301 0 .465-.027.164-.027.246-.027.11 0 .164.068.055.069.027.164-.137.383-.684.684-.548.302-1.394.302-.984 0-1.793-.383-.81-.384-1.313-1.102-.502-.72-.738-1.696-.233-.985-.233-2.083 0-1.215.274-2.593.274-1.377.82-2.718.548-1.34 1.258-2.42.71-1.08 1.47-1.628l.16-.12q.082-.083.083-.19-.027-.082-.137-.137-.356-.082-.835-.082-1.066 0-2.082.397-1.016.397-1.822 1.2-.807.807-1.326 1.983-.52 1.176-.794 2.62-.273 1.445-.273 3.058 0 1.035.246 1.876.246.84.739 1.43.493.589 1.175.916.684.328 1.463.328.876 0 1.613-.23.739-.233 1.203-.548.465-.315.589-.52.123-.205.164-.205.11.027.11.178 0 .738-.466 1.476-.465.739-1.394 1.23-.93.492-2.214.492-1.476 0-2.676-.52-1.2-.52-2.018-1.49-.82-.97-1.258-2.345-.438-1.376-.438-3.032 0-1.895.438-3.54.438-1.645 1.258-2.856.82-1.211 1.926-1.886 1.107-.675 2.4-.675 1.23 0 2.082.356.85.356 1.19.916.342.562.342 1.122ZM6.247 18.43q2.686 0 4.976-.793 2.29-.792 3.586-2.088.11-.11.082-.192-.027-.082-.164-.082h-1.148q-.109 0-.164.055-.527.547-1.558 1.054-1.03.507-2.415.807-1.385.301-2.81.301-1.64 0-2.997-.438-1.358-.438-2.11-1.176-.11-.11-.192-.082-.082.027-.055.164.41 1.258 1.45 2.194 1.04.936 2.538 1.503 1.5.566 3.2.673.342.014.684.014z" />
    </svg>
  );
}

function AzureIcon(props: IconProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5.483 21.548q-.38.086-.798.172-.418.086-.86.172-.443.086-.86.172-.418.086-.647.129l.323-.903 1.076-3.397q.024-.065.064-.163.042-.098.07-.163l.546-1.722q.27-.86.558-1.744.29-.884.546-1.739.258-.856.44-1.64.184-.787.296-1.455.112-.668.168-1.194.056-.527.056-.882 0-.27-.062-.482-.06-.212-.186-.34-.124-.126-.315-.158-.19-.03-.434-.03a8.2 8.2 0 0 0-.674.04q-.376.042-.718.094l.484-.968q.3-.608.68-1.16.382-.554.78-.968.398-.414.766-.67.368-.256.622-.278.254-.022.358.052.104.074.104.254 0 .184-.046.518-.044.334-.114.774-.07.44-.162.956-.092.516-.194 1.064-.102.548-.208 1.122-.104.574-.198 1.122-.094.548-.162 1.022-.07.474-.104.796-.034.322-.034.482 0 .192.044.344.044.15.148.252.104.1.27.164.168.064.402.064.374 0 .84-.06.468-.062 1.006-.168.54-.106 1.108-.258.57-.15 1.082-.338.512-.186.864-.384.352-.196.46-.386.11-.19.01-.34l.002.002q-.108-.166-.318-.282-.21-.116-.496-.18-.284-.064-.616-.078-.332-.014-.646.01-.314.024-.556.074l.322-.946q.242-.708.682-1.388.44-.68.954-1.242.514-.564.956-.942.442-.38.694-.554.252-.176.264-.264.012-.088-.122-.088-.28 0-.746.076-.466.076-1.05.226-.582.148-1.186.374-.604.226-1.11.522-.506.296-.784.654-.28.358-.254.614.002.002.002.002.026.24.2.418-.014-.002-.028-.002-.212 0-.524.08-.312.082-.688.232-.376.15-.774.388-.398.238-.776.534-.378.296-.672.638-.294.34-.44.66-.144.32-.144.548 0 .09.03.166.03.076.09.134.06.058.148.098.088.04.202.06.114.022.256.022.264 0 .634-.052.37-.05.808-.156.44-.104.936-.262.498-.156 1-.378.504-.22.94-.502.438-.28.74-.604.304-.324.388-.668.084-.344-.04-.6-.122-.256-.33-.42-.21-.164-.448-.25-.236-.086-.446-.086-.07 0-.124.004-.054.004-.098.014l.362-.858q.288-.686.696-1.308.408-.622.904-1.1.498-.48.958-.806.46-.326.766-.408.306-.082.392.034.086.116.03.388-.054.272-.178.672-.124.4-.29.916-.164.516-.33 1.118-.166.6-.292 1.246-.126.646-.164 1.278-.038.63.046 1.168.156.972.554 1.704.398.732.98 1.118.58.386 1.226.386.45 0 .86-.168.41-.168.706-.486.296-.318.452-.748.156-.43.156-.898 0-.616-.204-1.198-.204-.582-.57-1.04-.366-.458-.856-.658-.49-.2-.996-.2-.39 0-.702.086-.312.086-.518.212-.206.126-.306.24l.578-1.716q.068-.198.182-.456.114-.258.24-.544.128-.286.256-.572.128-.286.226-.544.1-.258.15-.424.05-.166.026-.238-.022-.072-.082-.072h-.004q-.1 0-.316.104-.214.104-.504.28-.29.176-.608.424-.318.248-.636.572-.316.324-.584.702-.268.378-.422.764-.152.386-.152.64 0 .088.026.166l-1.11 3.392q-.334 1.04-.714 2.252-.378 1.212-.776 2.454-.398 1.24-.778 2.352-.38 1.112-.656 1.918-.278.806-.322.968-.044.162.03.162.074 0 .282-.06.208-.06.486-.166.278-.106.58-.264.302-.158.57-.364.27-.206.412-.44.142-.236.142-.476 0-.272-.166-.534-.166-.262-.448-.386-.28-.124-.586-.124-.178 0-.346.052-.168.05-.312.132l.968-2.572q.214-.57.428-1.176.216-.606.418-1.238.204-.632.38-1.27.176-.638.296-1.26.12-.62.154-1.186.036-.566-.034-1.046-.07-.48-.252-.838-.182-.36-.48-.552-.296-.192-.674-.192-.392 0-.814.15-.422.148-.78.416-.356.266-.54.582-.182.314-.182.57 0 .096.026.17l-1.284 3.976q-.254.772-.546 1.738-.292.966-.59 1.962-.296.996-.566 1.844-.27.848-.436 1.392-.166.544-.146.726.02.18.148.18.128 0 .38-.068.252-.07.568-.176.316-.108.642-.258.326-.152.576-.336.252-.184.342-.378.09-.194.004-.338l.002-.002q-.09-.16-.278-.274-.186-.114-.436-.162-.25-.048-.476-.048-.138 0-.236.022l.242-.564q.28-.65.648-1.364.37-.714.726-1.372.356-.658.608-1.168.252-.51.3-.714.05-.204-.066-.204-.062 0-.222.084-.16.084-.368.226" />
    </svg>
  );
}

function RestApiIcon(props: IconProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M8 8h8" />
      <path d="M8 12h6" />
      <path d="M8 16h4" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
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
  const doubled = [...techStack, ...techStack];

  return (
    <section
      className="relative overflow-hidden py-16 lg:py-20"
      style={{ background: "#F8FAFC" }}
      aria-label="Trusted Technologies We Build With"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Technology Stack
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Trusted Technologies <span className="text-primary">We Build With</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Modern technologies powering scalable AI, ERP, Cloud, Web, Mobile, and Enterprise solutions.
          </p>
        </div>
      </div>

      <div className="group relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F8FAFC] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-r from-transparent to-[#F8FAFC] sm:w-32" />

        <div className="marquee-track flex" style={{ animationDuration: "40s" }}>
          {doubled.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="marquee-item flex shrink-0 items-center gap-6 sm:gap-8"
            >
              <div className="group/card flex flex-col items-center gap-2.5">
                <div className="tech-icon-card flex items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-105 hover:shadow-xl">
                  <tech.Icon className="tech-icon text-[#475569] transition-colors duration-300 group-hover/card:text-primary" />
                </div>
                <span className="tech-label text-[11px] font-medium text-muted-foreground whitespace-nowrap transition-colors duration-300 group-hover/card:text-primary">
                  {tech.name}
                </span>
              </div>

              <span
                className="block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#2563EB" }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          width: max-content;
          animation: marquee-scroll 40s linear infinite;
          will-change: transform;
        }

        .group:hover .marquee-track {
          animation-play-state: paused;
        }

        .tech-icon-card {
          width: 70px;
          height: 70px;
        }

        .tech-icon {
          width: 1.75rem;
          height: 1.75rem;
        }

        .tech-label {
          font-size: 0.6875rem;
        }

        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        @media (max-width: 640px) {
          .tech-icon-card {
            width: 56px !important;
            height: 56px !important;
          }
          .tech-icon {
            width: 1.25rem !important;
            height: 1.25rem !important;
          }
          .marquee-track {
            gap: 1rem;
          }
          .marquee-item {
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .marquee-track {
            animation: none !important;
            will-change: auto !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
