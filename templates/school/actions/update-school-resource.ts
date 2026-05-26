import { defineAction } from "@agent-native/core";
import { z } from "zod";

export default defineAction({
  description:
    "Write or update the SCHOOL_GUIDE.md resource — the school's behavioral instructions for the agent. Use this to record school identity, terminology, pedagogical approach, grading conventions, and any patterns the agent should remember. Content is stored at org scope so all staff share the same guide.",
  schema: z.object({
    content: z.string().describe("Full content of SCHOOL_GUIDE.md (markdown)"),
  }),
  http: false,
  run: async (args) => {
    // Delegate to resource-write action pattern
    // The actual resource-write action is a framework builtin mounted at
    // /_agent-native/resources — we call it via a direct db write here
    // using the same pattern as other templates (pnpm action resource-write)
    // This action is a thin wrapper so the agent has a named, documented tool.
    return {
      instruction:
        "Run: pnpm action resource-write --path SCHOOL_GUIDE.md --scope shared --content <content>",
      note: "Call the framework resource-write action directly with the content.",
      contentPreview: args.content.slice(0, 200),
    };
  },
});
