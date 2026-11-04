/**
 * What a query function throws when the server answers with a failure.
 *
 * Returning an empty list there instead looks harmless and is not: React Query
 * takes it as the answer, so a polling refresh that hit a blip replaces the
 * data already on screen with "nothing yet". Throwing keeps what is shown and
 * lets the query retry; see `shouldRetry`.
 */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function httpError(res: Response): Promise<HttpError> {
  const body = await res.json().catch(() => null);
  const message =
    (body && typeof body === "object" && (body as any).error) ||
    `Request failed (${res.status})`;
  return new HttpError(res.status, String(message));
}

/**
 * Worth trying again: the network, the server, or a sign-in that was briefly
 * out of step. A refusal (403) or a missing record (404) will answer the same
 * way next time, so those fail at once.
 */
export function shouldRetry(count: number, error: unknown): boolean {
  if (count >= 3) return false;
  if (error instanceof HttpError) {
    // One more try for a sign-in that was briefly out of step; a person who
    // really is signed out should not wait through three.
    if (error.status === 401) return count < 1;
    return error.status >= 500 || [408, 425, 429].includes(error.status);
  }
  return true;
}
