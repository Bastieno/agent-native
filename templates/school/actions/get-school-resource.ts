import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { readSchoolGuide } from "../server/lib/school-guide.js";

export default defineAction({
  description:
    "Read the current SCHOOL_GUIDE.md — the school's behavioral instructions for the agent. Returns the full markdown content, or null if not yet written.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const guide = await readSchoolGuide(orgId);
    return { content: guide.content, updatedAt: guide.updatedAt };
  },
});
