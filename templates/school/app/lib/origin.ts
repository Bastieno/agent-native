import { useLocation } from "react-router";

/**
 * Where a learner was when they opened a page, kept with the history entry.
 *
 * "Back" should return to the page someone came from, and say so: the same
 * material is opened from the dashboard, a week, the revise page and the
 * grades page, and a fixed back link can only be right for one of them. The
 * origin travels in the router's own `state`, so it survives a refresh and
 * needs no storage; a page opened without one (a bookmark, a link in a
 * message) falls back to its own parent.
 */
const PORTALS = ["/student", "/teacher", "/admin"];

export interface Origin {
  to: string;
  label: string;
}

/** Link state naming the page being left, e.g. `state={origin("Dashboard")}`. */
export function useOrigin() {
  const { pathname, search } = useLocation();
  return (label: string) => ({
    from: { to: `${pathname}${search}`, label } satisfies Origin,
  });
}

/** The origin a page was opened from, when it carries a usable one. */
export function originOf(state: unknown): Origin | null {
  const from = (state as { from?: Partial<Origin> } | null)?.from;
  // Only paths inside a portal: state is not trusted to point elsewhere.
  if (
    typeof from?.to === "string" &&
    PORTALS.some((p) => from.to === p || from.to!.startsWith(`${p}/`)) &&
    typeof from.label === "string" &&
    from.label
  ) {
    return { to: from.to, label: from.label };
  }
  return null;
}

/**
 * Where a detail page's back link goes: the page it was opened from when the
 * link said so, else its own parent.
 */
export function useBackTarget(fallback: Origin): Origin {
  const { state } = useLocation();
  return originOf(state) ?? fallback;
}
