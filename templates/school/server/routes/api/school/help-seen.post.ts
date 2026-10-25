import { createError, defineEventHandler, readBody } from "h3";
import { getSession } from "@agent-native/core/server";
import { getDb, schema } from "../../../db/index.js";
import { actorForEmail } from "../../../lib/class-access.js";
import { CAPABILITIES } from "../../../../shared/capabilities.js";

const KNOWN = new Set([...CAPABILITIES.map((c) => c.id), "tour"]);

/** Record that the signed-in person has seen some Help entries. */
export default defineEventHandler(async (event) => {
  const session = await getSession(event);
  const email = session?.email;
  if (!email) throw createError({ statusCode: 401, statusMessage: "Sign in" });
  const actor = await actorForEmail(email);
  if (!actor?.schoolId) throw createError({ statusCode: 404 });

  const body = (await readBody(event)) as { ids?: unknown } | null;
  // Only ids that exist, and never more than a page's worth at once.
  const ids = (Array.isArray(body?.ids) ? body!.ids : [])
    .filter((x): x is string => typeof x === "string" && KNOWN.has(x))
    .slice(0, 50);
  if (ids.length === 0) return { saved: 0 };

  await getDb()
    .insert(schema.capabilitySeen)
    .values(
      ids.map((capabilityId) => ({
        id: `${actor.userId}:${capabilityId}`,
        userId: actor.userId,
        schoolId: actor.schoolId,
        capabilityId,
      })),
    )
    .onConflictDoNothing();
  return { saved: ids.length };
});
