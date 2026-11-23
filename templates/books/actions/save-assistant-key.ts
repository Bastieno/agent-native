import { defineAction } from "@agent-native/core";
import { writeAppSecret } from "@agent-native/core/secrets";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";

export default defineAction({
  description:
    "Save the Anthropic API key the assistant runs on, for the owner and partner both. Owner only. Meant for the form in the chat panel or Settings → Assistant; never ask anyone to paste a key into the chat.",
  schema: z.object({
    key: z.string().min(1).describe("The Anthropic API key (starts sk-ant-)"),
  }),
  http: { method: "POST" },
  run: async ({ key }) => {
    const orgId = await ownerOrg();
    const value = key.trim();
    if (!/^sk-ant-[\w-]{20,}$/.test(value))
      throw new Error(
        "That does not look like an Anthropic key. It starts with sk-ant-.",
      );
    // Org scope: the owner and partner both use it; it is stored encrypted.
    await writeAppSecret({
      key: "ANTHROPIC_API_KEY",
      value,
      scope: "org",
      scopeId: orgId,
      description: "Books assistant key",
    });
    return { saved: true };
  },
});
