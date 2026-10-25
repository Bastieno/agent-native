import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { actorForEmail } from "../server/lib/class-access.js";

export default defineAction({
  description:
    "See or change how you hear about things. `emailDigest`: 'daily' sends one email a day with what is new, 'off' sends none. `push`: 'on' or 'off' for notifications on a phone that has the app installed. Email digests only go out when the school has turned them on; the result says whether it has. Pass nothing to just read your settings.",
  schema: z.object({
    emailDigest: z.enum(["off", "daily"]).optional(),
    push: z.enum(["on", "off"]).optional(),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (!actor) throw new Error("No school context.");
    const db = getDb();
    const [existing] = await db
      .select()
      .from(schema.notificationPrefs)
      .where(eq(schema.notificationPrefs.userId, actor.userId))
      .limit(1);
    const next = {
      emailDigest: args.emailDigest ?? existing?.emailDigest ?? "off",
      push: args.push ?? existing?.push ?? "on",
    };
    if (args.emailDigest || args.push || !existing) {
      await db
        .insert(schema.notificationPrefs)
        .values({
          userId: actor.userId,
          schoolId: actor.schoolId,
          ...next,
          updatedAt: new Date().toISOString(),
        })
        .onConflictDoUpdate({
          target: schema.notificationPrefs.userId,
          set: { ...next, updatedAt: new Date().toISOString() },
        });
    }
    const config = (await getOrgSetting(actor.schoolId, "school-config")) as {
      emailDigests?: boolean;
    } | null;
    return {
      ...next,
      schoolSendsEmailDigests: !!config?.emailDigests,
    };
  },
});
