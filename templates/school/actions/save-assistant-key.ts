import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppSecret } from "@agent-native/core/secrets";
import { z } from "zod";

export default defineAction({
  description:
    "Save the school's Anthropic API key so the assistant works for everyone in the school. Admin only. Meant for the form in Settings → Assistant; never ask anyone to paste a key into the chat.",
  schema: z.object({
    key: z.string().min(1).describe("The Anthropic API key (starts sk-ant-)"),
  }),
  http: { method: "POST" },
  run: async ({ key }) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context. Are you signed in?");
    const value = key.trim();
    if (!/^sk-ant-[\w-]{20,}$/.test(value)) {
      throw new Error(
        "That does not look like an Anthropic key. It starts with sk-ant-.",
      );
    }
    // Org scope: every member of this school uses it, and no other school can.
    await writeAppSecret({
      key: "ANTHROPIC_API_KEY",
      value,
      scope: "org",
      scopeId: orgId,
      description: "School assistant key",
    });
    return { saved: true };
  },
});
