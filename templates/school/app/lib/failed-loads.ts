import { useCallback, useSyncExternalStore } from "react";
import { useQueryClient, type Query } from "@tanstack/react-query";

/**
 * A load that failed before anything was shown: the query is on screen, it
 * errored, and it has no earlier answer to fall back on. (One that fails
 * after a good answer keeps that answer; see ConnectionNotice.)
 */
const failedWithNothing = (q: Query) =>
  q.state.status === "error" &&
  q.state.data === undefined &&
  q.getObserversCount() > 0;

/**
 * How many loads on screen have failed with nothing to show, and a way to try
 * them all again.
 *
 * It exists so that a failed load is never read as an empty list. A page
 * writes "No students yet" when its list is empty, and a list that could not
 * be fetched is empty too; this is how the shared empty state and the notice
 * tell the two apart, without each page having to ask.
 */
export function useFailedLoads() {
  const qc = useQueryClient();
  const count = useSyncExternalStore(
    (notify) => qc.getQueryCache().subscribe(notify),
    () => qc.getQueryCache().findAll({ predicate: failedWithNothing }).length,
    () => 0,
  );
  const retry = useCallback(
    () => qc.refetchQueries({ predicate: failedWithNothing }),
    [qc],
  );
  return { count, retry };
}
