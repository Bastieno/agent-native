import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import {
  remindOnce,
  reminderText,
  sendReminder,
} from "../server/lib/schedule.js";

export default defineAction({
  description:
    "Remind the owner on WhatsApp that a day's sales file hasn't arrived. Sends at most once a day; sent: false means they were already reminded.",
  schema: z.object({ day: z.string().describe("YYYY-MM-DD") }),
  run: async ({ day }) => {
    const sent = await remindOnce(await ownerOrg(), day, sendReminder);
    return { sent, text: reminderText(day) };
  },
});
