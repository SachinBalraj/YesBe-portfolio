import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ScrollToTopButtonProps } from "@/types";
import { cn } from "@/utils/cn";

function ScrollToTopButtonComponent({
  className,
  showThreshold = 300,
  yieldToSelector = "#contact",
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [yielding, setYielding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showThreshold]);

  // On phones the button is anchored bottom-right, which is exactly where the
  // form's Continue control lives. Stand down whenever that content is on
  // screen; on desktop there is room for both, so leave it alone.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 639px)");
    if (!mq.matches) {
      setYielding(false);
      return;
    }

    const target = document.querySelector(yieldToSelector);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setYielding(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [yieldToSelector]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && !yielding && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 16 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            className
          )}
        >
          <Button
            size="icon"
            variant="outline"
            onClick={scrollToTop}
            className="h-11 w-11 rounded-xl shadow-md bg-card/80 backdrop-blur-sm"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const ScrollToTopButton = memo(ScrollToTopButtonComponent);
