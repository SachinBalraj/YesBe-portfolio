import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ReadingProgress({ containerId }: { containerId?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let scrollable: HTMLElement | null = null;
      if (containerId) {
        scrollable = document.getElementById(containerId);
      }
      if (scrollable) {
        const rect = scrollable.getBoundingClientRect();
        const scrollTop = -rect.top;
        const total = scrollable.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? Math.min(1, Math.max(0, scrollTop / total)) : 0);
        return;
      }
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerId]);

  return (
    <div
      className="fixed left-0 right-0 top-[56px] z-[55] h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#2563eb]"
        style={{ scaleX: progress, transformOrigin: "left" }}
      />
    </div>
  );
}
