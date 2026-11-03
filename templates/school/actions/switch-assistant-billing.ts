import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { deleteAppSecret } from "@agent-native/core/secrets";
import { getRequestUserEmail } from "@agent-native/core/server";
import { z } from "zod";
import { getBilling, setBillingMode } from "../server/lib/credits.js";

/**
 * Choose how the assistant is paid for: Ellai's credit, or the school's own
 * Anthropic key. Saving a key (`save-assistant-key`) already does the second;
 * this does the first. A school with no billing row has never had credit, so
 * it cannot move to it by itself: the people running Ellai start that.
 */
export default defineAction({
  description:
    "Switch the school's assistant to Ellai's credit instead of its own Anthropic key. This removes the school's saved key, so confirm with the admin first. Only possible for a school Ellai has set up with credit. Admin only.",
  schema: z.object({
    mode: z.literal("managed"),
  }),
  http: { method: "POST" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const billing = await getBilling(orgId);
    if (!billing) {
      throw new Error(
        "Ellai credit has not been set up for this school. Ask the people running Ellai to switch it on.",
      );
    }
    // A saved key would win over the credit, so it has to go.
    await deleteAppSecret({
      key: "ANTHROPIC_API_KEY",
      scope: "org",
      scopeId: orgId,
    });
    await setBillingMode(orgId, "managed", getRequestUserEmail() ?? "admin");
    return { mode: "managed" };
  },
});
