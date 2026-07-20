import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/images/YBlogo.png";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [visible, setVisible] = useState(true);

  /* Progress bar */
  useEffect(() => {
    const start = Date.now();
    const duration = 1800;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  /* Typing dots */
  useEffect(() => {
    const id = setInterval(() => setDotCount((d) => (d + 1) % 4), 400);
    return () => clearInterval(id);
  }, []);

  /* Dismiss */
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 2000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          aria-label="Loading"
          role="status"
        >
          {/* Background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-aurora" />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#2563eb]/[0.04]"
                style={{ width: 4 + i * 2, height: 4 + i * 2, left: `${10 + i * 14}%`, top: `${15 + (i % 3) * 28}%` }}
                animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center">
            {/* Logo with ring animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative mb-8"
            >
              {/* Spinning ring */}
              <motion.div
                className="absolute -inset-3 rounded-full border border-primary/10"
                style={{ borderTopColor: "rgba(37,99,235,0.4)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.img
                src={logoImg}
                alt="YesBe Logo"
                width={110}
                height={110}
                className="h-[110px] w-[110px] object-contain relative z-10"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Glow behind logo */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="h-40 w-40 rounded-full bg-primary/[0.08] blur-[40px]"
                />
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl font-bold tracking-tight text-foreground"
            >
              YesBe
            </motion.h1>

            {/* Titles */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground"
            >
              <span>AI Solutions</span>
              <span className="text-primary">&middot;</span>
              <span>ERP Systems</span>
              <span className="text-primary">&middot;</span>
              <span>Business Solutions</span>
            </motion.div>

            {/* Loading dots */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-sm font-medium text-muted-foreground"
            >
              Loading{".".repeat(dotCount)}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="mt-4 h-[3px] w-48 overflow-hidden rounded-full bg-primary/10"
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-6 text-[11px] tracking-wide text-muted-foreground"
            >
              Building Intelligent Business Solutions
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
