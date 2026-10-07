import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { timetableView } from "../server/lib/timetable-view.js";

export default defineAction({
  description:
    "A term's timetable: the school's week, every period placed in it with its times, room, teachers and learners, and the clashes (a teacher, room, arm or learner in two places at once) in words. Defaults to the current term. Narrow it to one arm, teacher or room with the optional filters; clashes are then only those touching what is shown.",
  schema: z.object({
    termId: z.string().optional().describe("Defaults to the current term"),
    armId: z.string().optional().describe("Only this arm's periods"),
    teacherUserId: z
      .string()
      .optional()
      .describe("Only the periods this teacher takes"),
    room: z.string().optional().describe("Only the periods held in this room"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");

    return timetableView(orgId, args);
  },
});
