import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { coverageView } from "../server/lib/timetable-coverage.js";

export default defineAction({
  description:
    "What is still missing on a term's timetable: for each class, the periods a week it needs, the periods placed, and the shortfall. Classes the school has not given counts for are marked unset and not counted as short. Defaults to the current term, with the same fallback as get-timetable. Narrow to one arm (option classes drawing on it included) or one teacher. Placed counts every row of the class in that term, including lessons off the bells.",
  schema: z.object({
    termId: z.string().optional().describe("Defaults to the current term"),
    armId: z.string().optional().describe("Only this arm's classes"),
    teacherUserId: z
      .string()
      .optional()
      .describe("Only the classes this teacher takes"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    return coverageView(orgId, args);
  },
});
