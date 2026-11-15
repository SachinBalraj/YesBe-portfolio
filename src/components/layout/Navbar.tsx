import {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  lazy,
  Suspense,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence } from "framer-motion";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { ButtonLink } from "@/components/system/ButtonLink";
import { PRIMARY_NAV } from "@/constants/navigation";
import { trackConsultationClick } from "@/utils/analytics";
import logoImg from "@/assets/images/YBlogo.webp";
import { MegaMenu, type MegaMenuKey } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

const SearchModal = lazy(() =>
  import("@/components/knowledge/SearchModal").then((m) => ({ default: m.SearchModal })),
);

function navLinkClass(isActive: boolean) {
  return cn(
    "relative inline-flex items-center gap-1 px-3 py-2 text-[13.5px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary",
    "after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-300",
    isActive
      ? "text-primary after:scale-x-100"
      : "text-ink-soft after:scale-x-0 hover:text-ink hover:after:scale-x-100",
  );
}

function NavbarComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchMounted, setSearchMounted] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const solutionsButtonRef = useRef<HTMLButtonElement>(null);
  const industriesButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldFocusPanelRef = useRef(false);
  const lastScrollY = useRef(0);

  const navigate = useNavigate();
  const location = useLocation();

  const isSolutionsActive =
    location.pathname === "/services" || location.pathname.startsWith("/services/");
  const isIndustriesActive =
    location.pathname === "/industries" || location.pathname.startsWith("/industries/");

  useEffect(() => {
    if (isSearchOpen) setSearchMounted(true);
  }, [isSearchOpen]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 10);
      setOpenMenu(null);

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

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleSearchShortcut);
    return () => window.removeEventListener("keydown", handleSearchShortcut);
  }, []);

  useEffect(() => {
    if (!openMenu) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      const trigger =
        openMenu === "solutions" ? solutionsButtonRef.current : industriesButtonRef.current;
      trigger?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenu]);

  useEffect(() => {
    if (!openMenu || !shouldFocusPanelRef.current) return;
    shouldFocusPanelRef.current = false;
    megaPanelRef.current?.querySelector<HTMLElement>("a")?.focus();
  }, [openMenu]);

  useEffect(
    () => () => {
      clearCloseTimer();
    },
    [clearCloseTimer],
  );

  const openOnHover = (menu: MegaMenuKey) => {
    clearCloseTimer();
    setOpenMenu(menu);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 160);
  };

  const toggleMenu = (menu: MegaMenuKey) => {
    clearCloseTimer();
    const next = openMenu === menu ? null : menu;
    shouldFocusPanelRef.current = next !== null;
    setOpenMenu(next);
  };

  const handleMenuKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    menu: MegaMenuKey,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      shouldFocusPanelRef.current = true;
      setOpenMenu(menu);
    }
  };

  const handleHeaderBlur = (event: React.FocusEvent<HTMLElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
      setOpenMenu(null);
    }
  };

  const closeMobileNav = useCallback(() => setIsMobileOpen(false), []);

  const handleNavigate = () => {
    setOpenMenu(null);
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
        onBlur={handleHeaderBlur}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-out",
          isScrolled
            ? "border-line/80 bg-paper/90 shadow-[0_10px_30px_-24px_rgba(10,18,32,0.45)] backdrop-blur-xl"
            : "border-transparent bg-paper/80 backdrop-blur-md",
          hidden ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="container-page">
          <nav
            className="flex h-[76px] items-center"
            aria-label="Main navigation"
            role="navigation"
          >
            <Link
              to="/"
              aria-label="YESBE Technologies home"
              className="relative z-10 mr-5 flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={handleNavigate}
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

            <div className="hidden items-center gap-0.5 lg:flex">
              {PRIMARY_NAV.map((item) => {
                if (item.label === "Solutions" || item.label === "Industries") {
                  const menu: MegaMenuKey =
                    item.label === "Solutions" ? "solutions" : "industries";
                  const isOpen = openMenu === menu;
                  const isActive = menu === "solutions" ? isSolutionsActive : isIndustriesActive;

                  return (
                    <button
                      key={item.label}
                      ref={menu === "solutions" ? solutionsButtonRef : industriesButtonRef}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`desktop-menu-${menu}`}
                      aria-haspopup="true"
                      onClick={() => toggleMenu(menu)}
                      onMouseEnter={() => openOnHover(menu)}
                      onKeyDown={(event) => handleMenuKeyDown(event, menu)}
                      className={navLinkClass(isActive || isOpen)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  );
                }

                return (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    end={item.href === "/"}
                    className={({ isActive }) => navLinkClass(isActive)}
                    onClick={handleNavigate}
                    onMouseEnter={() => {
                      clearCloseTimer();
                      setOpenMenu(null);
                    }}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>

            <div className="flex-1" aria-hidden="true" />

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex min-h-10 items-center gap-2 border border-line bg-card/60 px-3 py-2 text-[13px] font-medium text-ink-soft transition-colors duration-200 hover:border-line-strong hover:bg-card hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                title="Search Articles (⌘ K)"
                aria-haspopup="dialog"
                aria-keyshortcuts="Meta+K Control+K"
              >
                <Search className="size-4 text-body" aria-hidden="true" />
                <span className="hidden sm:inline">Search</span>
                <kbd
                  aria-hidden="true"
                  className="hidden border border-line bg-paper px-1.5 py-0.5 text-[10px] font-medium text-body md:inline-block"
                >
                  ⌘K
                </kbd>
              </button>

              <div className="hidden xl:block">
                <ButtonLink
                  onClick={() => {
                    trackConsultationClick("navbar");
                    navigate("/contact");
                  }}
                  variant="primary"
                  className="btn-compact whitespace-nowrap"
                  withArrow
                >
                  Book a Free Consultation
                </ButtonLink>
              </div>

              <button
                type="button"
                className="inline-flex size-10 items-center justify-center text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                onClick={() => setIsMobileOpen((open) => !open)}
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
              >
                {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </div>

        <AnimatePresence>
          {openMenu && (
            <MegaMenu menu={openMenu} panelRef={megaPanelRef} onNavigate={handleNavigate} />
          )}
        </AnimatePresence>
      </header>

      <MobileNav open={isMobileOpen} onClose={closeMobileNav} />

      {searchMounted && (
        <Suspense fallback={null}>
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </Suspense>
      )}
    </>
  );
}

export const Navbar = memo(NavbarComponent);
