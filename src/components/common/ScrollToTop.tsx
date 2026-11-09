import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // The target may belong to a lazily loaded section, so retry briefly.
    const timers = [0, 150, 400].map((delay) => window.setTimeout(scrollToTarget, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [pathname, hash]);

  return null;
}
