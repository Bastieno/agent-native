import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { getMyWeek } from "../server/lib/my-week.js";

export default defineAction({
  description:
    "Get the signed-in person's own week: each day the school teaches, each period and break with its bell times, and the lessons in it with subject, teacher and room. A learner gets the classes they are enrolled in; a member of staff gets the classes they teach. Also names the next lesson. Between terms it shows the next term's timetable and says so.",
  schema: z.object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe(
        "ISO date (YYYY-MM-DD) that picks the term. Defaults to today.",
      ),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    return getMyWeek(orgId, userEmail, args.date);
  },
});
