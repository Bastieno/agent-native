import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IconPlugConnectedX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useFailedLoads } from "@/lib/failed-loads";

/** How long a refresh must keep failing before anyone is told. */
const TELL_AFTER_MS = 30_000;
/** How long a load that never worked must keep failing before the banner. */
const TELL_EMPTY_AFTER_MS = 15_000;
/** How soon a list whose last refresh failed tries again. */
const HEAL_EVERY_MS = 5_000;

/**
 * One quiet notice for the whole app, for a connection that has been failing
 * for a while.
 *
 * A refresh that fails keeps the data already on screen and is tried again
 * every few seconds from here: nothing else would, because the change poll only
 * says "something changed", so one failed refresh would otherwise leave old
 * data until the next change. Most failures are over in seconds, so those say
 * nothing. Only when something on screen has been out of date for half a
 * minute is it worth saying so: the information shown may be old, and the app
 * is still trying. It goes by itself when the refresh works. It never asks for
 * a reload, and it never hides or replaces data.
 */
export function ConnectionNotice() {
  const qc = useQueryClient();
  const [failing, setFailing] = useState(false);
  const [failingEmpty, setFailingEmpty] = useState(false);
  const failedLoads = useFailedLoads();

  useEffect(() => {
    // When each visible query first failed, kept until it works again.
    const since = new Map<string, number>();
    const lastTry = new Map<string, number>();
    const emptySince = new Map<string, number>();
    const evaluate = () => {
      const now = Date.now();
      let late = false;
      let lateEmpty = false;
      for (const q of qc.getQueryCache().getAll()) {
        // A load that has never worked: a blip that mends itself within
        // seconds is not worth a banner, but it is worth knowing which one.
        const neverWorked =
          q.state.status === "error" &&
          q.state.data === undefined &&
          q.getObserversCount() > 0;
        if (neverWorked) {
          if (!emptySince.has(q.queryHash)) {
            emptySince.set(q.queryHash, now);
            console.warn(
              "[school] a load failed:",
              q.queryKey,
              (q.state.error as Error | null)?.message,
            );
          }
          if (now - (emptySince.get(q.queryHash) ?? now) >= TELL_EMPTY_AFTER_MS)
            lateEmpty = true;
        } else {
          emptySince.delete(q.queryHash);
        }
        const failed =
          q.state.status === "error" &&
          q.state.data !== undefined &&
          q.getObserversCount() > 0;
        if (!failed) {
          since.delete(q.queryHash);
          continue;
        }
        const first = since.get(q.queryHash) ?? now;
        since.set(q.queryHash, first);
        if (now - first >= TELL_AFTER_MS) late = true;
        // Try again, quietly, unless it is already trying or the tab is away.
        if (
          q.state.fetchStatus === "idle" &&
          document.visibilityState === "visible" &&
          now - (lastTry.get(q.queryHash) ?? 0) >= HEAL_EVERY_MS
        ) {
          lastTry.set(q.queryHash, now);
          void qc.refetchQueries(
            { queryKey: q.queryKey, exact: true },
            { cancelRefetch: false },
          );
        }
      }
      setFailing((was) => (was === late ? was : late));
      setFailingEmpty((was) => (was === lateEmpty ? was : lateEmpty));
    };
    const unsubscribe = qc.getQueryCache().subscribe(evaluate);
    // Time passing is itself a reason to look again.
    const timer = window.setInterval(evaluate, 5_000);
    evaluate();
    return () => {
      unsubscribe();
      window.clearInterval(timer);
    };
  }, [qc]);

  // Something that never loaded and keeps failing: said, with a way to try
  // again. The list beneath may look empty; this says why. (The list itself
  // already says so at once; this is only the app-wide banner.)
  if (failedLoads.count > 0 && failingEmpty) {
    return (
      <div
        role="status"
        className="pointer-events-none fixed inset-x-0 top-2 z-[100] flex justify-center px-4"
      >
        <p className="pointer-events-auto flex items-center gap-2 rounded-full border bg-background/95 py-1 pl-3 pr-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur">
          <IconPlugConnectedX size={14} className="shrink-0" />
          Some information could not be loaded.
          <Button
            size="sm"
            variant="outline"
            className="h-6 rounded-full px-2.5 text-xs"
            onClick={() => void failedLoads.retry()}
          >
            Try again
          </Button>
        </p>
      </div>
    );
  }
  if (!failing) return null;
  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 top-2 z-[100] flex justify-center px-4"
    >
      <p className="pointer-events-auto flex items-center gap-2 rounded-full border bg-background/95 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur">
        <IconPlugConnectedX size={14} className="shrink-0" />
        Connection problem. Showing the last information we have, and trying
        again.
      </p>
    </div>
  );
}
