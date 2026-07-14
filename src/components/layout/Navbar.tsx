import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/utils/cn";
import logoImg from "@/assets/images/sblogo.png";

const SCROLL_OFFSET = 80;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px -60% 0px`, threshold: 0 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const scrollTo = useCallback((href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsMobileOpen(false);
  }, []);

  return (
    <>
      <motion.header
        role="banner"
        initial={false}
        animate={{ y: isScrolled ? 0 : 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-strong border-b border-border/40 shadow-sm"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation" role="navigation">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            className="relative z-10 flex items-center"
          >
            <img
              src={logoImg}
              alt="Sachin Balraj Logo"
              width={52}
              height={52}
              loading="eager"
              decoding="async"
              className="h-10 w-10 sm:h-[46px] sm:w-[46px] lg:h-[52px] lg:w-[52px] object-contain rounded-lg transition-transform duration-300 ease-out hover:scale-105"
            />
          </a>

          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={cn(
                    "relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <a
              href="#enquiry"
              onClick={(e) => { e.preventDefault(); scrollTo("#enquiry"); }}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Book Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              className="lg:hidden rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed right-0 top-0 z-50 h-full w-72 border-l border-border/40 bg-white/95 backdrop-blur-xl shadow-2xl lg:hidden"
              role="dialog"
              aria-label="Mobile navigation"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <img
                  src={logoImg}
                  alt="Sachin Balraj Logo"
                  width={40}
                  height={40}
                  loading="eager"
                  decoding="async"
                  className="h-10 w-10 object-contain rounded-lg"
                />
                <button
                  className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-4 pb-6">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                        className={cn(
                          "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {link.label}
                        {isActive && (
                          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </a>
                    </motion.div>
                  );
                })}
              </div>
              <div className="border-t border-border/40 px-4 py-5">
                <a
                  href="#enquiry"
                  onClick={(e) => { e.preventDefault(); scrollTo("#enquiry"); }}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
                >
                  Book Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
