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

export const PAGE_SIZES = [25, 50, 100];

/**
 * Pages a list already in memory. The page and the rows per page live in the
 * address (?page=3&rows=50), so opening a row and coming back, or reloading,
 * keeps the place. A page past the end (a filter shrank the list) shows the
 * last page there is.
 */
export function usePagination<T>(items: T[], defaultSize = PAGE_SIZES[0]) {
  const [params, setParams] = useSearchParams();
  const asked = Number(params.get("rows"));
  const pageSize = PAGE_SIZES.includes(asked) ? asked : defaultSize;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(
    pageCount,
    Math.max(1, Math.floor(Number(params.get("page"))) || 1),
  );
  const update = useCallback(
    (change: (p: URLSearchParams) => void) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          change(next);
          return next;
        },
        { replace: true, preventScrollReset: true },
      ),
    [setParams],
  );
  const start = (page - 1) * pageSize;
  return {
    page,
    pageCount,
    pageSize,
    total: items.length,
    items: items.slice(start, start + pageSize),
    setPage: (n: number) =>
      update((p) => (n <= 1 ? p.delete("page") : p.set("page", String(n)))),
    // A new size starts from the first page.
    setPageSize: (size: number) =>
      update((p) => {
        if (size === defaultSize) p.delete("rows");
        else p.set("rows", String(size));
        p.delete("page");
      }),
  };
}

/** 1 2 3 4 5 … 14, the window following the current page. */
function pageNumbers(page: number, count: number): (number | "gap")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const out: (number | "gap")[] = [1];
  const from = Math.max(2, Math.min(page - 1, count - 4));
  const to = Math.min(count - 1, Math.max(page + 1, 5));
  if (from > 2) out.push("gap");
  for (let n = from; n <= to; n++) out.push(n);
  if (to < count - 1) out.push("gap");
  out.push(count);
  return out;
}

/**
 * Rows per page, the pages, and "Showing 26–50 of 341". Sticks to the bottom
 * of the scrolling page so a long list never has to be scrolled to its end to
 * move on. Shows nothing while the whole list fits on the smallest page.
 */
export function Pagination({
  page,
  pageCount,
  pageSize,
  total,
  setPage,
  setPageSize,
  noun = "items",
}: {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  noun?: string;
}) {
  if (total <= PAGE_SIZES[0]) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return (
    <nav
      aria-label="Pagination"
      // Sticks to the bottom of the screen, which is what scrolls; the
      // negative margins cancel the page's padding so it runs edge to edge.
      className="sticky bottom-0 z-10 -mx-4 -mb-4 mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border bg-background/95 px-4 py-2 text-xs text-muted-foreground backdrop-blur sm:-mx-6 sm:-mb-6 sm:px-6"
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
          <IconChevronLeft className="h-3.5 w-3.5" />
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
                  n === page && "text-foreground",
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
          <IconChevronRight className="h-3.5 w-3.5" />
        </Button>
        <span className="hidden pl-2 tabular-nums sm:inline" aria-live="polite">
          Showing {from}–{to} of {total.toLocaleString("en-NG")} {noun}
        </span>
      </div>
    </nav>
  );
}
