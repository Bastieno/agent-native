/**
 * Slow background polling when nobody is at the page.
 *
 * Several parts of the app ask the server for news every few seconds (what
 * changed, whether the agent has a command, whether demo mode is on). With a
 * page left open, those requests never stop, and on a serverless host each one
 * wakes a function and reads the database, which keeps a pay-per-use database
 * awake all day. Someone using the page needs the quick refresh; a page nobody
 * has touched for a minute does not.
 *
 * `idlePollDelay(ms)` returns `ms` while someone is active and a longer wait
 * once they have been away, and goes back to `ms` the moment they touch the
 * page. Nothing is lost: the next poll after they return still delivers every
 * change, just a little later.
 */
const IDLE_AFTER_MS = 60_000;
const IDLE_FACTOR = 8;
const IDLE_MAX_MS = 30_000;

let lastActive = Date.now();
let installed = false;

function install(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;
  const mark = () => {
    lastActive = Date.now();
  };
  for (const type of [
    "pointerdown",
    "keydown",
    "scroll",
    "touchstart",
    "focus",
  ]) {
    window.addEventListener(type, mark, { passive: true, capture: true });
  }
}

/** Whether nobody has touched the page for a minute. */
export function isIdle(): boolean {
  install();
  return Date.now() - lastActive > IDLE_AFTER_MS;
}

/** `baseMs` while someone is active; a longer wait once they have been away. */
export function idlePollDelay(baseMs: number): number {
  return isIdle() ? Math.min(baseMs * IDLE_FACTOR, IDLE_MAX_MS) : baseMs;
}
