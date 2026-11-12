import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { reminderText, sendReminder } from "../server/lib/schedule.js";

export default defineAction({
  description:
    "Remind the owner on WhatsApp that a day's sales file hasn't arrived.",
  schema: z.object({ day: z.string().describe("YYYY-MM-DD") }),
  run: async ({ day }) => {
    await sendReminder(await ownerOrg(), day);
    return { sent: reminderText(day) };
  },
});
