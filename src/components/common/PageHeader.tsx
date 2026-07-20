import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations";

interface PageHeaderProps {
  badge: string;
  title: string;
  highlight?: string;
  description: string;
}

export function PageHeader({ badge, title, highlight, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-[140px] pb-16 lg:pt-[160px] lg:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#eaf6ff_0%,transparent_60%)]" />
        <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-[15%] right-[8%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.06] blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              {badge}
            </span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {title}{" "}
            {highlight && <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">{highlight}</span>}
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
          <motion.p variants={fadeInUp} className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
