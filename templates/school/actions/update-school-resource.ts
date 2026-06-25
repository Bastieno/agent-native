import { defineAction } from "@agent-native/core";
import { resourcePut, SHARED_OWNER } from "@agent-native/core/resources";
import { z } from "zod";

export default defineAction({
  description:
    "Write or update the SCHOOL_GUIDE.md resource — the school's behavioral instructions for the agent. Use this to record school identity, terminology, pedagogical approach, grading conventions, and any patterns the agent should remember. Content is stored at org scope so all staff share the same guide.",
  schema: z.object({
    content: z.string().describe("Full markdown content of SCHOOL_GUIDE.md"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    await resourcePut(SHARED_OWNER, "SCHOOL_GUIDE.md", args.content, "text/markdown");
    return { success: true, message: "SCHOOL_GUIDE.md updated successfully." };
  },
});
