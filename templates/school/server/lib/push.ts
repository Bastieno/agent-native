/**
 * Push notifications to phones that have the app on their home screen.
 *
 * Configured by three environment variables (VAPID keys, generated once with
 * `npx web-push generate-vapid-keys`): VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY and
 * VAPID_SUBJECT (a `mailto:` address). Without them push is simply off and
 * nothing here throws.
 *
 * A person who switches push off, or whose phone no longer accepts it (the
 * endpoint answers 404 or 410), stops being sent to.
 */
import webpush from "web-push";
import { and, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";

export interface PushPayload {
  title: string;
  body?: string;
  url?: string;
  tag?: string;
}

let configured: boolean | null = null;

export function pushPublicKey(): string | null {
  return pushConfigured() ? (process.env.VAPID_PUBLIC_KEY ?? null) : null;
}

export function pushConfigured(): boolean {
  if (configured !== null) return configured;
  const pub = process.env.VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;
  if (!pub || !priv || !subject) return (configured = false);
  try {
    webpush.setVapidDetails(subject, pub, priv);
    return (configured = true);
  } catch (err) {
    console.error("[push] VAPID keys rejected:", err);
    return (configured = false);
  }
}

/** Send to every phone these people registered, except those who opted out. */
export async function pushToUsers(
  userIds: string[],
  payload: PushPayload,
): Promise<number> {
  if (!pushConfigured() || userIds.length === 0) return 0;
  const db = getDb();
  const optedOut = new Set(
    (
      await db
        .select({ userId: schema.notificationPrefs.userId })
        .from(schema.notificationPrefs)
        .where(
          and(
            inArray(schema.notificationPrefs.userId, userIds),
            eq(schema.notificationPrefs.push, "off"),
          ),
        )
    ).map((r: any) => r.userId),
  );
  const targets = userIds.filter((id) => !optedOut.has(id));
  if (targets.length === 0) return 0;
  const subs = await db
    .select()
    .from(schema.pushSubscriptions)
    .where(inArray(schema.pushSubscriptions.userId, targets));

  const body = JSON.stringify({
    ...payload,
    body: payload.body?.slice(0, 140),
  });
  let sent = 0;
  const gone: string[] = [];
  // A few at a time: a whole school is a lot of open requests at once.
  for (let i = 0; i < subs.length; i += 20) {
    await Promise.allSettled(
      subs.slice(i, i + 20).map(async (s: any) => {
        try {
          await webpush.sendNotification(
            { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
            body,
            { TTL: 24 * 60 * 60, timeout: 8000 },
          );
          sent++;
        } catch (err: any) {
          if (err?.statusCode === 404 || err?.statusCode === 410) {
            gone.push(s.id);
          }
        }
      }),
    );
  }
  if (gone.length) {
    await db
      .delete(schema.pushSubscriptions)
      .where(inArray(schema.pushSubscriptions.id, gone));
  }
  return sent;
}
