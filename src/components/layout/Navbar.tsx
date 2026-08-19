import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu, X, ArrowRight, Search,
} from "lucide-react";
import { cn } from "@/utils/cn";
import logoImg from "@/assets/images/YBlogo.png";
import { SearchModal } from "@/components/knowledge/SearchModal";
import { trackConsultationClick } from "@/utils/analytics";

/* ─── Navigation Data ─── */

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Knowledge Center", href: "/knowledge-center" },
  { label: "Pricing", href: "/pricing" },
];

/* ─── Navigation Helpers ─── */

function navLinkClass(isActive: boolean) {
  return cn(
    "relative shrink-0 px-4 py-2 text-[15px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 border-b-2",
    isActive
      ? "text-[#2563EB] border-[#2563EB]"
      : "text-[#1E293B] border-transparent hover:text-[#2563EB] hover:border-[#dbeafe]"
  );
}

function mobileNavLinkClass(isActive: boolean) {
  return cn(
    "flex w-full rounded-xl px-4 py-3.5 text-[14px] font-medium transition-all duration-200 text-left",
    isActive ? "bg-[#eff6ff] text-[#2563EB]" : "text-[#1E293B] hover:bg-[#f8fafc]/80"
  );
}


/* ─── Main Navbar ─── */

function NavbarComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 10);

      if (currentY > 200) {
        setHidden(currentY > lastScrollY.current && currentY - lastScrollY.current > 5);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    menu.addEventListener("keydown", handleKeyDown);
    first?.focus();
    return () => menu.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  const handleNavigate = useCallback((href: string) => {
    navigate(href);
    setIsMobileOpen(false);
  }, [navigate]);

  return (
    <>
      <motion.header
        role="banner"
        initial={false}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          isScrolled
            ? "bg-white/75 backdrop-blur-2xl border-b border-[#e2e8f0]/40 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_2px_16px_rgba(0,0,0,0.02)]"
            : "bg-white",
        )}
      >
        <nav
          className="mx-auto flex h-[56px] items-center px-5 sm:px-6 lg:px-10"
          style={{ maxWidth: "1280px" }}
          aria-label="Main navigation"
          role="navigation"
        >
          {/* ── Logo ── */}
          <button
            onClick={() => handleNavigate("/")}
            className="relative z-10 flex shrink-0 items-center group mr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:rounded-xl"
          >
            <img
              src={logoImg}
              alt="YesBe Technologies Logo"
              width={48}
              height={48}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-[46px] w-[46px] object-contain rounded-xl transition-all duration-300 ease-out group-hover:scale-105"
            />
          </button>

          {/* ── Desktop Navigation ── */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) => navLinkClass(isActive)}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* ── Spacer ── */}
          <div className="flex-1" aria-hidden="true" />

          {/* ── CTA + Search + Mobile Toggle ── */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all duration-200 hover:border-primary/40 hover:text-primary hover:bg-white dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
              title="Search Knowledge Center (⌘ K)"
            >
              <Search className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 shadow-2xs dark:border-slate-700 dark:bg-slate-900">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => { trackConsultationClick("navbar"); handleNavigate("/contact"); }}
              className="hidden lg:inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] px-6 py-3 text-[14px] font-semibold leading-[1.2] tracking-[0.2px] text-white shadow-[0_1px_4px_rgba(37,99,235,0.2),0_4px_16px_rgba(37,99,235,0.1)] transition-all duration-300 hover:shadow-[0_2px_8px_rgba(37,99,235,0.25),0_8px_32px_rgba(37,99,235,0.12),0_0_20px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              Book Free Consultation
              <ArrowRight className="h-[18px] w-[18px] shrink-0" />
            </button>
            <button
              className="lg:hidden rounded-lg p-2.5 text-[#64748B] hover:text-[#1E293B] hover:bg-[#f1f5f9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Slide-Over ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed right-0 top-0 z-50 h-full w-80 max-w-[calc(100vw-1rem)] border-l border-[#e2e8f0]/50 bg-white/95 backdrop-blur-2xl shadow-[−8px_0_24px_rgba(0,0,0,0.06)] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex h-[56px] items-center justify-between px-6">
                <img
                  src={logoImg}
                alt="YesBe Technologies Logo"
                width={44}
                height={44}
                loading="eager"
                decoding="async"
                className="h-11 w-11 object-contain rounded-xl"
                />
                <button
                  className="rounded-lg p-2.5 text-[#64748B] hover:text-[#1E293B] hover:bg-[#f1f5f9] transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-1 px-4 pb-6 overflow-y-auto max-h-[calc(100vh-56px)]">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <NavLink
                      to={item.href}
                      end={item.href === "/"}
                      className={({ isActive }) => mobileNavLinkClass(isActive)}
                      onClick={() => handleNavigate(item.href)}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-[#e2e8f0]/50 px-5 py-5">
                <button
                  onClick={() => { trackConsultationClick("navbar_mobile"); handleNavigate("/contact"); }}
                  className="flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] px-6 py-3.5 text-[14px] font-semibold leading-[1.2] tracking-[0.2px] text-white shadow-[0_1px_4px_rgba(37,99,235,0.2),0_4px_16px_rgba(37,99,235,0.1)]"
                >
                  Book Free Consultation
                  <ArrowRight className="h-[18px] w-[18px] shrink-0" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export const Navbar = memo(NavbarComponent);
