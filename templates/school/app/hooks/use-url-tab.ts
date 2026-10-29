import { useCallback } from "react";
import { useSearchParams } from "react-router";

/**
 * A tab (or any picker that works like one) kept in the address.
 *
 * A tab chosen in component state is forgotten on reload and when someone
 * leaves the page and comes back, which on a settings page means starting
 * again at the first tab every time. In the address it survives both, Back
 * returns to the tab that was open, and a link can name the tab it means.
 *
 * - The first tab is the default and leaves the address clean; any other tab
 *   is written as `?tab=<value>` (`key` names a second set of tabs on the same
 *   page, so they do not collide).
 * - It replaces the history entry rather than adding one, so switching tabs
 *   does not make Back step through every tab.
 * - Other parameters on the page (`year`, `rows`, `termId`) are kept, and the
 *   scroll position is left alone.
 * - `clear` names parameters that belong to the old tab's own sub-choices (the
 *   guide's Write/Preview) and are dropped when the tab changes.
 * - A value that is not in `allowed` (an old link, a typo) falls back to the
 *   default instead of showing an empty page.
 * - `explicit` always writes the value, for a page whose default depends on
 *   data (it opens on Submissions when work is waiting): removing the
 *   parameter there would let the default move under the person's choice.
 */
const NONE: readonly string[] = [];

export function useUrlTab<T extends string>(
  fallback: T,
  options: {
    key?: string;
    allowed?: readonly T[];
    explicit?: boolean;
    clear?: readonly string[];
  } = {},
): [T, (next: string) => void] {
  const { key = "tab", allowed, explicit = false, clear = NONE } = options;
  const [params, setParams] = useSearchParams();
  const raw = params.get(key);
  const value =
    raw && (!allowed || (allowed as readonly string[]).includes(raw))
      ? (raw as T)
      : fallback;

  const set = useCallback(
    (next: string) => {
      setParams(
        (prev) => {
          const out = new URLSearchParams(prev);
          if (next === fallback && !explicit) out.delete(key);
          else out.set(key, next);
          for (const k of clear) out.delete(k);
          return out;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [setParams, key, fallback, explicit, clear],
  );

  return [value, set];
}
