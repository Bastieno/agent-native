import { createError, defineEventHandler, readBody } from "h3";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { getSession } from "@agent-native/core/server";
import { getDb, schema } from "../../../db/index.js";
import { actorForEmail } from "../../../lib/class-access.js";

/**
 * Remember a phone or browser that agreed to push. The person is the signed-in
 * one, read from the session; an endpoint already stored moves to them, which
 * is what happens when two people share a phone.
 */
export default defineEventHandler(async (event) => {
  const session = await getSession(event);
  if (!session?.email) {
    throw createError({ statusCode: 401, statusMessage: "Sign in" });
  }
  const actor = await actorForEmail(session.email);
  if (!actor)
    throw createError({ statusCode: 403, statusMessage: "No school" });

  const body = (await readBody(event)) as {
    endpoint?: string;
    keys?: { p256dh?: string; auth?: string };
    unsubscribe?: boolean;
  };
  const endpoint = body?.endpoint;
  if (typeof endpoint !== "string" || !/^https:\/\//.test(endpoint)) {
    throw createError({ statusCode: 400, statusMessage: "Bad subscription" });
  }
  const db = getDb();
  await db
    .delete(schema.pushSubscriptions)
    .where(eq(schema.pushSubscriptions.endpoint, endpoint));
  if (body.unsubscribe) return { ok: true };

  const p256dh = body.keys?.p256dh;
  const auth = body.keys?.auth;
  if (typeof p256dh !== "string" || typeof auth !== "string") {
    throw createError({ statusCode: 400, statusMessage: "Bad subscription" });
  }
  await db.insert(schema.pushSubscriptions).values({
    id: nanoid(),
    userId: actor.userId,
    schoolId: actor.schoolId,
    endpoint,
    p256dh,
    auth,
    createdAt: new Date().toISOString(),
  });
  return { ok: true };
});
