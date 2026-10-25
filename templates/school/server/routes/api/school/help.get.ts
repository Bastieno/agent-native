import { createError, defineEventHandler } from "h3";
import { eq } from "drizzle-orm";
import { getSession } from "@agent-native/core/server";
import { getDb, schema } from "../../../db/index.js";
import { actorForEmail } from "../../../lib/class-access.js";

/**
 * Which Help entries the signed-in person has already seen. Their own rows
 * only: the person is read from the session, never from the request.
 */
export default defineEventHandler(async (event) => {
  const session = await getSession(event);
  const email = session?.email;
  if (!email) throw createError({ statusCode: 401, statusMessage: "Sign in" });
  const actor = await actorForEmail(email);
  if (!actor) return { seen: [] as string[], tourAt: null, role: null };

  const rows = await getDb()
    .select({
      id: schema.capabilitySeen.capabilityId,
      at: schema.capabilitySeen.seenAt,
    })
    .from(schema.capabilitySeen)
    .where(eq(schema.capabilitySeen.userId, actor.userId));
  // "tour" is not a capability: it marks when the person first dismissed the
  // welcome card, which is the date after which something counts as new.
  return {
    seen: rows.filter((r) => r.id !== "tour").map((r) => r.id),
    tourAt: rows.find((r) => r.id === "tour")?.at ?? null,
    role: actor.schoolRole,
  };
});
