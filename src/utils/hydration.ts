/**
 * Routes whose prerendered markup is preserved by hydration.
 *
 * These pages no longer contain lazy sections above the fold. Keeping the
 * route tree free of Suspense boundaries lets React hydrate the captured HTML
 * instead of discarding it while a client chunk loads.
 */
export function isHydrationTargetPath(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/services" ||
    pathname === "/case-studies" ||
    pathname === "/industries" ||
    pathname.startsWith("/industries/") ||
    pathname.startsWith("/services/")
  );
}
