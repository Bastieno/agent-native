/**
 * How often a page asks the server for news.
 *
 * Each request wakes a serverless function and reads the database, and an open
 * tab asks all day. So a page someone is using polls at its base rate, and one
 * nobody has touched for a minute backs off to a slower rate and speeds up
 * again the moment they come back. Nothing is lost: the next poll after they
 * return delivers every change, a little later at worst. A hidden tab is not
 * polled at all (react-query's default for an interval).
 */
const IDLE_AFTER_MS = 60_000;
const IDLE_FACTOR = 6;
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

/** `baseMs` while someone is active, a longer wait once they have been away. */
export function pollDelay(baseMs: number): number {
  install();
  const idle = Date.now() - lastActive > IDLE_AFTER_MS;
  return idle ? Math.min(baseMs * IDLE_FACTOR, IDLE_MAX_MS) : baseMs;
}
