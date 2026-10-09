import { defineAction } from "@agent-native/core";
import { resourceGetByPath, SHARED_OWNER } from "@agent-native/core/resources";
import { z } from "zod";

export default defineAction({
  description:
    "Read the current SCHOOL_GUIDE.md — the school's behavioral instructions for the agent. Returns the full markdown content, or null if not yet written.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const resource = await resourceGetByPath(SHARED_OWNER, "SCHOOL_GUIDE.md");
    return {
      content: resource?.content ?? null,
      updatedAt: resource?.updatedAt ?? null,
    };
  },
});
