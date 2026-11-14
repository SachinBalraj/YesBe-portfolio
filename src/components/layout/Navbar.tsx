import { useState, useEffect, useRef, useCallback, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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
  { label: "Solutions", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Articles", href: "/insights" },
];

/* ─── Navigation Helpers ─── */

function navLinkClass(isActive: boolean) {
  return cn(
    "relative shrink-0 px-3.5 py-2 text-[14px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 border-b-2",
    isActive
      ? "text-primary border-primary font-semibold"
      : "text-slate-700 border-transparent hover:text-primary hover:border-slate-300"
  );
}

function mobileNavLinkClass(isActive: boolean) {
  return cn(
    "flex w-full px-4 py-3 text-[15px] font-medium transition-colors duration-200 text-left border-l-2",
    isActive ? "border-primary bg-primary/[0.04] text-primary" : "border-transparent text-slate-700 hover:bg-slate-50"
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
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleSearchShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleSearchShortcut);
    return () => window.removeEventListener("keydown", handleSearchShortcut);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsMobileOpen(false);
        return;
      }
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
    return () => {
      menu.removeEventListener("keydown", handleKeyDown);
      const previous = previouslyFocusedRef.current;
      if (previous && document.contains(previous)) previous.focus();
    };
  }, [isMobileOpen]);

  const handleNavigate = useCallback((href: string) => {
    navigate(href);
    setIsMobileOpen(false);
  }, [navigate]);

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          isScrolled
            ? "bg-white/95 backdrop-blur border-b border-border"
            : "bg-white border-b border-transparent",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <nav
          className="mx-auto flex h-[68px] items-center px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: "1280px" }}
          aria-label="Main navigation"
          role="navigation"
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            aria-label="YESBE Technologies home"
            className="relative z-10 flex shrink-0 items-center mr-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:rounded-sm"
          >
            <img
              src={logoImg}
              alt="YESBE Technologies Logo"
              width={40}
              height={40}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-10 w-10 object-contain transition-opacity duration-200 hover:opacity-80"
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden shrink-0 items-center gap-1 lg:flex">
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
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex min-h-10 items-center gap-2 border border-border bg-white px-3 py-2 text-[13px] font-medium text-slate-700 transition-colors duration-200 hover:border-slate-400 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              title="Search Articles (⌘ K)"
              aria-label="Search articles"
              aria-haspopup="dialog"
            >
              <Search className="h-4 w-4 text-slate-500" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block border border-border bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => { trackConsultationClick("navbar"); handleNavigate("/contact"); }}
              className="hidden xl:inline-flex items-center gap-2 whitespace-nowrap bg-primary px-5 py-2.5 text-[13px] font-semibold leading-[1.2] text-white transition-colors duration-200 hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
            <button
              ref={mobileToggleRef}
              className="lg:hidden p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Slide-Over ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              className="fixed right-0 top-0 z-50 h-full w-80 max-w-[calc(100vw-1rem)] border-l border-border bg-white lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex h-[68px] items-center justify-between px-5">
                <img
                  src={logoImg}
                  alt="YESBE Technologies Logo"
                  width={40}
                  height={40}
                  loading="eager"
                  decoding="async"
                  className="h-10 w-10 object-contain"
                />
                <button
                  className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col border-t border-border pb-6 overflow-y-auto max-h-[calc(100vh-68px)]">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    end={item.href === "/"}
                    className={({ isActive }) => mobileNavLinkClass(isActive)}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="border-t border-border px-5 py-5">
                <button
                  onClick={() => { trackConsultationClick("navbar_mobile"); handleNavigate("/contact"); }}
                  className="flex w-full items-center justify-center gap-2 whitespace-nowrap bg-primary px-5 py-3.5 text-[14px] font-semibold leading-[1.2] text-white transition-colors hover:bg-[#1d4ed8]"
                >
                  Book a Free Consultation
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
