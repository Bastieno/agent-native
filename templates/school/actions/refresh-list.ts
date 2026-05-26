import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { z } from "zod";

export default defineAction({
  description: "Trigger a UI refresh after agent mutations (create, update, delete). Always call this after any data mutation.",
  schema: z.object({}),
  http: false,
  run: async () => {
    await writeAppState("refresh-signal", { ts: Date.now() });
    return "UI refresh triggered.";
  },
});
