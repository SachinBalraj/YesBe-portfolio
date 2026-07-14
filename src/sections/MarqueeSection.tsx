const MARQUEE_ITEMS = [
  "React",
  "Node.js",
  "MongoDB",
  "Power BI",
  "Python",
  "AWS",
  "Docker",
  "OpenAI",
  "LangChain",
  "ERP",
  "SEO",
  "GEO",
  "AEO",
];

function Dot({ className = "" }: { className?: string }) {
  return (
    <span className={`mx-2 inline-block h-1 w-1 rounded-full bg-[#2563eb]/25 ${className}`} />
  );
}

export function MarqueeSection() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="relative border-y border-[#E5F0FF]/60 bg-gradient-to-r from-white via-[#f8fbff] to-white py-6 overflow-hidden">
      {/* Left / right fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="relative flex items-center w-max animate-marquee">
        {items.map((tech, i) => (
          <div key={`${tech}-${i}`} className="flex items-center shrink-0">
            <span className="whitespace-nowrap text-[15px] font-semibold tracking-wide text-[#0F172A]/70 transition-colors duration-200 hover:text-[#2563eb]">
              {tech}
            </span>
            <Dot />
          </div>
        ))}
      </div>
    </section>
  );
}
