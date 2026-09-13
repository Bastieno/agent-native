import { Link } from "react-router";
import { IconChevronLeft } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/**
 * The way out of a detail page.
 *
 * Every page that can be opened from somewhere else needs one. The navigation
 * only reaches top-level sections, so without this the only way back from an
 * activity or a gradebook is the browser's own back button — which a tablet
 * hides behind a gesture and a wall-mounted screen may not offer at all.
 *
 * It names where it goes rather than saying "back", because the label is doing
 * two jobs: it is the way out, and it is the only thing on the page telling a
 * teacher which class they are looking at. `to` rather than `history.back()`
 * for the same reason — a real destination behaves the same however the page
 * was reached, including from a deep link out of Claude.
 */
export function BackLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "mb-1 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      <IconChevronLeft size={14} className="shrink-0" />
      <span className="truncate">{children}</span>
    </Link>
  );
}
