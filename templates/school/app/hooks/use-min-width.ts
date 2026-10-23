import { useSyncExternalStore } from "react";

/**
 * Whether the window is at least `px` wide, following it as it changes.
 *
 * For choosing between two layouts that must not both be in the page: a
 * hidden copy still holds its own popovers and hover cards, which then open
 * over nothing. CSS breakpoints are for layouts that are only restyled.
 */
export function useMinWidth(px: number): boolean {
  const query = `(min-width: ${px}px)`;
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    // No window on the server: the wide layout, which the page hydrates from.
    () => true,
  );
}
