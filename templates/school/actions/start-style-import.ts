import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

/**
 * Begin reading a school's own past papers into a style of its own.
 *
 * The shipped samples describe someone else's exam. A school that sets its
 * own papers — a house style, a diocesan exam, a board we do not ship — gets
 * a better fit by being read than by being approximated.
 */
export default defineAction({
  description:
    "Start reading this school's own past papers into an assessment style. Then add the questions in batches with update-style-import — stem, options, answer — and commit when enough have been read. Only the statistics are kept; the questions are discarded at commit.",
  schema: z.object({
    styleName: z
      .string()
      .describe('What the school calls it — "Our house style", "NECO"'),
    subject: z
      .string()
      .optional()
      .describe(
        "The subject these papers are for. Omit only if the style is meant to cover every subject.",
      ),
    source: z
      .string()
      .optional()
      .describe("What is being read — which papers, which years"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.styleImports).values({
      id,
      schoolId: orgId,
      styleName: args.styleName,
      subject: args.subject ?? null,
      source: args.source ?? null,
      questionsJson: "[]",
      status: "in_progress",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    return {
      importId: id,
      styleName: args.styleName,
      subject: args.subject ?? null,
      message: `Reading "${args.styleName}"${args.subject ? ` for ${args.subject}` : ""}. Add the questions with update-style-import as you read them — stem, options and answer for each. Around 200 gives a style worth trusting; under 60 describes little more than one paper.`,
    };
  },
});
