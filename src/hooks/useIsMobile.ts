import { useEffect, useState } from "react";

/** Tailwind's `sm` breakpoint. Kept in sync with the 640px mobile/desktop split. */
const MOBILE_QUERY = "(max-width: 639px)";

/**
 * True when the viewport matches `query` (phone-sized by default).
 *
 * Used where a purely visual override is not enough — most importantly for
 * framer-motion entrances that translate on the X axis. Those transforms are
 * set inline, so CSS cannot neutralise them at small widths, and a 30px
 * horizontal offset is enough to push a near-full-width card outside a 320px
 * viewport where an ancestor's overflow-hidden silently clips it.
 */
export function useIsMobile(query: string = MOBILE_QUERY): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
