/**
 * Whether an error looks like the database not being reachable right now,
 * rather than the database refusing something.
 *
 * A function that wakes up cold can reach a serverless database (Neon,
 * Turso) before the connection will hold: the socket drops, times out, or the
 * database is still starting. The driver reports some of these as a bare
 * `ErrorEvent` with no message, so the name and `type` are checked as well as
 * the text. A second attempt a moment later usually works.
 */
const TRANSIENT_TEXT = [
  "econnreset",
  "econnrefused",
  "etimedout",
  "epipe",
  "connection terminated",
  "connection closed",
  "connection timeout",
  "timeout expired",
  "timed out",
  "socket hang up",
  "websocket",
  "fetch failed",
  "network error",
  "the database system is starting up",
  "too many connections",
  "terminating connection",
];

export function isTransientConnectionError(err: unknown): boolean {
  if (!err) return false;
  const e = err as {
    name?: string;
    type?: string;
    code?: string;
    message?: string;
    cause?: unknown;
  };
  // The WebSocket driver's own failure event: no message, no stack.
  if (
    e.constructor?.name === "ErrorEvent" ||
    (e.type === "error" && !e.message)
  ) {
    return true;
  }
  const code = String(e.code ?? "").toLowerCase();
  if (
    code === "57p03" ||
    code === "53300" ||
    code === "08006" ||
    code === "08001"
  ) {
    return true;
  }
  const text = `${e.message ?? ""} ${e.name ?? ""} ${code}`.toLowerCase();
  if (TRANSIENT_TEXT.some((t) => text.includes(t))) return true;
  return e.cause ? isTransientConnectionError(e.cause) : false;
}

/** Wait before attempt `n + 1`: 400ms, 800ms, 1.6s. */
export function connectRetryDelay(attempt: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, 400 * 2 ** (attempt - 1)),
  );
}

export const CONNECT_ATTEMPTS = 4;
