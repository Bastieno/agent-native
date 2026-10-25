import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { actorForEmail } from "../server/lib/class-access.js";
import { listFor } from "../server/lib/notifications.js";

export default defineAction({
  description:
    "Your own notifications, newest first, with how many are unread: new announcements, work due soon, work waiting to be marked. Use it for 'what's new for me?'. Only ever your own.",
  schema: z.object({
    limit: z.coerce.number().int().min(1).max(100).default(30),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (!actor) return { items: [], unread: 0 };
    return listFor(actor.userId, args.limit);
  },
});
