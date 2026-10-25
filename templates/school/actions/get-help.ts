import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { actorForEmail } from "../server/lib/class-access.js";
import { capabilitiesFor, helpRoleOf } from "../shared/capabilities.js";
import { searchCapabilities } from "../shared/help-search.js";

/**
 * The school's own Help, for the person asking: what they can do and how, in
 * the words the Help page uses. Reading it costs nothing, so a teacher's own AI
 * app should look here before answering "how do I…?" from memory.
 */
export default defineAction({
  description:
    "What the signed-in person can do in the school app, and how: the school's own Help, matched to their role. Pass a question or topic (for example 'make a PDF from a reference document' or 'connect my AI app') for the best matches, or nothing for everything they can do, grouped. Use it before answering any 'how do I…?' or 'can the app…?' question, and quote its steps; do not describe features from memory. It says nothing about the school's data.",
  schema: z.object({
    query: z
      .string()
      .optional()
      .describe("A question or topic. Omit for the full list."),
  }),
  http: { method: "GET" },
  run: async ({ query }) => {
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    const role = helpRoleOf(actor?.schoolRole);
    if (!actor || !role) {
      return { entries: [], message: "No help is available for this account." };
    }
    const caps = capabilitiesFor(role, {
      coordinator: actor.schoolRole === "subject_coordinator",
    });
    const chosen = query?.trim()
      ? searchCapabilities(query, caps)
          .slice(0, 5)
          .map((r) => r.capability)
      : caps;
    return {
      entries: chosen.map((c) => ({
        title: c.title,
        group: c.group,
        summary: c.summary,
        steps: c.steps,
        page: c.where?.[role] ?? null,
        bestFromYourOwnAiApp: !!c.aiApp,
        tryAsking: (c.starters ?? []).map((s) => s.text),
      })),
      message: query?.trim()
        ? chosen.length
          ? `${chosen.length} matching entr${chosen.length === 1 ? "y" : "ies"}.`
          : "Nothing in Help matches that."
        : `${chosen.length} entries.`,
    };
  },
});
