import { useSyncExternalStore } from "react";

/**
 * Whether anything in this tab should listen for the assistant.
 *
 * The navigate-command poll exists so the agent can move the screen. With the
 * assistant switched off for a learner, nothing will ever write a command, so
 * polling for one every two seconds is load on a small server for nothing.
 * The learner layout turns this off; every other portal leaves it on.
 */
let watching = true;
const listeners = new Set<() => void>();

export function setAgentWatching(on: boolean) {
  if (on === watching) return;
  watching = on;
  for (const l of listeners) l();
}

export function useAgentWatching(): boolean {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => watching,
    () => true,
  );
}
