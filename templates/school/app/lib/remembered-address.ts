import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * The last address each page was shown at, filters and all.
 *
 * A list's filters, search, tab and page live in its address, so Back in the
 * browser returns to them. A back link names a page, though, not a history
 * entry: "Classes" from a class is `/admin/classes`, which would drop the
 * teacher and year the admin had picked. Remembering the last query string
 * per page lets that link return to the list as it was left. Kept in memory
 * for this tab only; a reload starts from the address itself.
 */
const lastSearch = new Map<string, string>();

/** Mounted once in the app shell: notes each address as it is shown. */
export function RememberAddresses() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    lastSearch.set(pathname, search);
  }, [pathname, search]);
  return null;
}

/**
 * A link target with the page's remembered filters added, when the target
 * names none of its own.
 */
export function withRememberedSearch(to: string): string {
  if (to.includes("?") || to.includes("#")) return to;
  return `${to}${lastSearch.get(to) ?? ""}`;
}

/**
 * `withRememberedSearch` for a link that stays on screen across navigation,
 * such as the sidebar: it re-reads on every move, so a section's link has the
 * filters it was left with by the time someone has moved elsewhere.
 */
export function useRememberedSearch(): (to: string) => string {
  useLocation();
  return withRememberedSearch;
}
