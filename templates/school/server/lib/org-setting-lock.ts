/**
 * One writer at a time for a setting that is read, changed and written back.
 *
 * The pending-invitation lists live as a JSON array in a single org setting,
 * and inviting someone reads it, appends, and writes the whole thing back.
 * Two invitations sent at the same moment both read the same list, and the
 * second write overwrites the first — so the invitation disappears with no
 * error anywhere. An agent asked to invite a class sends them in parallel,
 * which is exactly the case that loses them: ten at once reliably lost two,
 * and forty lost twelve.
 *
 * This serialises those sections per key within the process. It is not a
 * distributed lock — two server processes sharing a database can still race —
 * so the durable fix is a row per invitation with a unique constraint rather
 * than an array in one value. Until then this removes the failure anyone
 * actually hits, which is one server and a handful of parallel calls.
 */

const queues = new Map<string, Promise<unknown>>();

export async function withOrgSettingLock<T>(
  key: string,
  work: () => Promise<T>,
): Promise<T> {
  const previous = queues.get(key) ?? Promise.resolve();
  // Each caller waits for the one before it, and failures do not block the
  // queue — an invitation that throws must not wedge every later invitation.
  const mine = previous.then(work, work);
  queues.set(
    key,
    mine.catch(() => undefined),
  );
  try {
    return await mine;
  } finally {
    // Let the map go when this was the last waiter, so a long-lived server
    // does not accumulate a promise per school for ever.
    if (queues.get(key) === mine || (await isSettled(queues.get(key)))) {
      queues.delete(key);
    }
  }
}

async function isSettled(promise: unknown): Promise<boolean> {
  if (!(promise instanceof Promise)) return true;
  const marker = Symbol("pending");
  const result = await Promise.race([promise, Promise.resolve(marker)]);
  return result !== marker;
}
