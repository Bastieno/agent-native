import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import { z } from "zod";

/**
 * The school's own answer to "what does work look like in this subject?".
 *
 * Deliberately data, not code. A registry in the source — science gets a lab
 * report, history gets source analysis — cannot be edited by the school that
 * disagrees, cannot describe a WAEC practical write-up, and needs a deploy to
 * change. Here the agent drafts blueprints from the school's own subjects and
 * framework during setup, and anyone can revise them later in conversation.
 *
 * Each blueprint is free-form on purpose; these are notes the agent reads
 * before drafting an activity, not a schema it must satisfy.
 */
export default defineAction({
  description:
    "Read or write the school's activity blueprints — per subject (or subject group), the kinds of work that suit it, typical length and timing, how it is usually marked, and anything a teacher should know. Read these before creating an activity. Write them during school setup, and revise whenever a teacher says the shape is wrong.",
  schema: z.object({
    action: z
      .enum(["list", "set", "remove"])
      .default("list")
      .describe("list reads all blueprints; set adds or replaces one"),
    subject: z
      .string()
      .optional()
      .describe(
        "Subject or group this applies to, in the school's own words — 'Mathematics', 'Sciences', 'Languages'",
      ),
    blueprint: z
      .object({
        formats: z
          .array(z.string())
          .optional()
          .describe("Kinds of work that suit this subject, most common first"),
        defaultFormat: z.string().optional(),
        typicalDurationMinutes: z.number().optional(),
        gradingMode: z
          .string()
          .optional()
          .describe("'rubric', 'points' or 'none'"),
        rubricCriteria: z
          .array(z.string())
          .optional()
          .describe("Criteria this subject is usually marked on"),
        responseMode: z.string().optional(),
        notes: z
          .string()
          .optional()
          .describe("Anything else the agent should honour for this subject"),
      })
      .optional(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");

    const all = ((await getOrgSetting(orgId, "activity-blueprints")) ??
      {}) as Record<string, unknown>;

    if (args.action === "list") {
      return {
        blueprints: all,
        count: Object.keys(all).length,
        message: Object.keys(all).length
          ? undefined
          : "No blueprints yet. Draft them from the school's subjects and framework, then save each with action='set'.",
      };
    }

    if (!args.subject) throw new Error("subject is required.");

    if (args.action === "remove") {
      delete all[args.subject];
      await putOrgSetting(orgId, "activity-blueprints", all);
      return { removed: args.subject, blueprints: all };
    }

    if (!args.blueprint) throw new Error("blueprint is required for set.");
    all[args.subject] = { ...(all[args.subject] as object), ...args.blueprint };
    await putOrgSetting(orgId, "activity-blueprints", all);
    return { saved: args.subject, blueprints: all };
  },
});
