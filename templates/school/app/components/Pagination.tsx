import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const PAGE_SIZE = 10;
export const PAGE_SIZES = [10, 25, 50, 100];

/**
 * Client-side paging for a list that is already in memory.
 *
 * A school's lists (learners, classes, staff) run to hundreds of rows, and
 * drawing them all makes the page long and slow to scan. The page lives in
 * the address (?page=3), so opening a row and coming Back returns to the same
 * page. A page past the end (the list shrank under a filter) shows the last
 * one that exists, and the address is left alone while the list is still
 * loading, so a reload lands on the page it was on.
 *
 * `pageKey` names the parameter when one screen pages several lists.
 */
export function usePagination<T>(
  items: T[],
  defaultPageSize: number = PAGE_SIZE,
  { pageKey = "page" }: { pageKey?: string } = {},
) {
  // The chosen size lives in the address (?rows=25), so it survives a reload
  // and can be shared; a page with several lists shares one choice.
  const [searchParams, setSearchParams] = useSearchParams();
  const fromUrl = Number(searchParams.get("rows"));
  const pageSize = PAGE_SIZES.includes(fromUrl) ? fromUrl : defaultPageSize;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const asked = Math.max(1, Math.floor(Number(searchParams.get(pageKey))) || 1);

  const setPage = useCallback(
    (page: number) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (page <= 1) next.delete(pageKey);
          else next.set(pageKey, String(page));
          return next;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [setSearchParams, pageKey],
  );

  const current = Math.min(asked, pageCount);
  const start = (current - 1) * pageSize;
  return {
    page: current,
    setPage,
    pageCount,
    pageSize,
    // A new size starts again from the first page.
    setPageSize: (size: number) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (size === defaultPageSize) next.delete("rows");
          else next.set("rows", String(size));
          next.delete(pageKey);
          return next;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    total: items.length,
    items: items.slice(start, start + pageSize),
    /** Back to the first page, for a filter or search that changed. */
    reset: () => setPage(1),
  };
}

/**
 * Paging for a list the server pages (`{ items, total }`).
 *
 * `usePagination` slices a list already in memory, so it can clamp the page to
 * the list's length. Here the total arrives with the page, so the page must
 * not be derived from it: a total that changed between two responses would
 * move the page, which would fetch another response, and so on. The page is
 * only what the address says. A page past the end is moved back once, by the
 * caller, when the server has confirmed the total (see `clampPage`).
 */
export function useServerPagination(
  total: number,
  defaultPageSize: number = PAGE_SIZE,
  { pageKey = "page" }: { pageKey?: string } = {},
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const fromUrl = Number(searchParams.get("rows"));
  const pageSize = PAGE_SIZES.includes(fromUrl) ? fromUrl : defaultPageSize;
  const page = Math.max(1, Math.floor(Number(searchParams.get(pageKey))) || 1);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const setPage = useCallback(
    (next: number) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (next <= 1) params.delete(pageKey);
          else params.set(pageKey, String(next));
          return params;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [setSearchParams, pageKey],
  );
  const setPageSize = useCallback(
    (size: number) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (size === defaultPageSize) params.delete("rows");
          else params.set("rows", String(size));
          params.delete(pageKey);
          return params;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [setSearchParams, pageKey, defaultPageSize],
  );
  return { page, pageSize, pageCount, total, setPage, setPageSize };
}

/** 1 2 3 4 5 … 26, with the window following the current page. */
function pageNumbers(page: number, pageCount: number): (number | "gap")[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const out: (number | "gap")[] = [1];
  const from = Math.max(2, Math.min(page - 1, pageCount - 4));
  const to = Math.min(pageCount - 1, Math.max(page + 1, 5));
  if (from > 2) out.push("gap");
  for (let n = from; n <= to; n++) out.push(n);
  if (to < pageCount - 1) out.push("gap");
  out.push(pageCount);
  return out;
}

/**
 * Rows per page, numbered pages and "Showing 1–10 of 258". Renders nothing
 * while everything fits on the smallest page, so short lists carry no chrome.
 */
export function Pagination({
  page,
  pageCount,
  pageSize,
  total,
  setPage,
  setPageSize,
  noun = "results",
  flush = true,
}: {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  noun?: string;
  /**
   * The bar is the last thing on a page padded by p-6: pull it over that
   * padding so it is the same height in the list's flow as when it sticks.
   * Turn off where more content follows it.
   */
  flush?: boolean;
}) {
  if (total <= PAGE_SIZES[0]) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return (
    <nav
      aria-label="Pagination"
      // Sticks to the bottom of the scrolling page (-bottom-6 cancels the
      // page's own p-6, so no strip is left for rows to show through), so a long list never has
      // to be scrolled to its end to change page. pr-20 (pr-14 from sm up) keeps the controls
      // clear of the floating assistant button. min-h-[53px] is the height of
      // the sidebar's Sign out footer, so the two top borders line up.
      className={cn(
        "sticky -bottom-6 z-10 -mx-6 flex min-h-[53px] flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t bg-background/95 px-6 py-2 pr-20 sm:pr-14 text-xs text-muted-foreground backdrop-blur",
        // The bar's own height must not depend on where it is.
        flush && "-mb-6",
      )}
    >
      <Select
        value={String(pageSize)}
        onValueChange={(v) => setPageSize(Number(v))}
      >
        <SelectTrigger
          className="h-8 w-auto gap-2 text-xs"
          aria-label="Rows per page"
        >
          <span className="max-sm:sr-only">Show</span>
          <SelectValue />
          <span className="max-sm:sr-only">rows</span>
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZES.map((n) => (
            <SelectItem key={n} value={String(n)}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-wrap items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          aria-label="Previous page"
        >
          <IconChevronLeft size={14} />
        </Button>
        {/* A phone has no room for the numbers: say where you are instead. */}
        <span className="px-2 tabular-nums sm:hidden">
          {page} / {pageCount}
        </span>
        <div className="hidden items-center gap-1 sm:flex">
          {pageNumbers(page, pageCount).map((n, i) =>
            n === "gap" ? (
              <span key={`gap-${i}`} className="px-1.5" aria-hidden>
                …
              </span>
            ) : (
              <Button
                key={n}
                variant={n === page ? "outline" : "ghost"}
                size="sm"
                className={cn(
                  "h-8 min-w-8 px-2 tabular-nums",
                  n === page && "border-primary text-primary",
                )}
                aria-current={n === page ? "page" : undefined}
                onClick={() => setPage(n)}
              >
                {n}
              </Button>
            ),
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={page >= pageCount}
          onClick={() => setPage(page + 1)}
          aria-label="Next page"
        >
          <IconChevronRight size={14} />
        </Button>
        <span className="hidden pl-2 sm:inline" aria-live="polite">
          Showing {from}–{to} of {total} {noun}
        </span>
      </div>
    </nav>
  );
}
