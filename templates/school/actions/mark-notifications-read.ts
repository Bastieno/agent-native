import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { actorForEmail } from "../server/lib/class-access.js";
import { markRead } from "../server/lib/notifications.js";

export default defineAction({
  description:
    "Mark your own notifications read: the ones given by id, or all of them when no ids are given.",
  schema: z.object({
    ids: z.array(z.string()).max(200).optional(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (!actor) throw new Error("No school context.");
    await markRead(actor.userId, args.ids);
    return { success: true };
  },
});
