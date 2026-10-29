import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { writeSchoolGuide } from "../server/lib/school-guide.js";

export default defineAction({
  description:
    "Write or update the SCHOOL_GUIDE.md resource — the school's behavioral instructions for the agent. Use this to record school identity, terminology, pedagogical approach, grading conventions, and any patterns the agent should remember. Each school has its own guide, shared by all its staff.",
  schema: z.object({
    content: z.string().describe("Full markdown content of SCHOOL_GUIDE.md"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    await writeSchoolGuide(orgId, args.content);
    return { success: true, message: "SCHOOL_GUIDE.md updated successfully." };
  },
});
