import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";
import { parseActivityContent } from "../shared/activity-content.js";
import { withCardIds } from "../shared/card-key.js";

/**
 * Amend an activity's body, in place.
 *
 * The app could write structured content and never correct it: a variant's
 * markdown could be replaced, but `contentJson` — where the questions, the
 * cards, the answers and the mark schemes actually live — could not be
 * touched. So a wrong mark scheme on question 8 meant recreating the whole
 * activity, and recreating a card deck would throw away every learner's
 * record of practising it, since that history hangs off each card's id.
 *
 * Two ways in, because the two jobs are different:
 *
 * - `patchBlocks` fixes one thing: "question 8's mark scheme is wrong". The
 *   named fields are merged into that block and everything else about it is
 *   left exactly as it was — ids included, which is what keeps a learner's
 *   history pointing at the same card.
 * - `contentJson` replaces the body outright, for a rewrite.
 */
export default defineAction({
  description:
    "Update a variant: its label, instructions, points, markdown, or its structured body. Use patchBlocks to correct one question or card in place — a wrong mark scheme, a typo, a bad option — which keeps every other block, and every card's identity, untouched. Use contentJson to replace the whole body.",
  schema: z.object({
    id: z.string().describe("Variant ID"),
    label: z.string().optional(),
    content: z
      .string()
      .optional()
      .describe("Full markdown content (replaces existing)"),
    instructions: z.string().optional(),
    totalPoints: z.number().optional(),
    contentJson: jsonish(z.record(z.string(), z.unknown()))
      .optional()
      .describe(
        "The whole structured body — { shape, blocks, columns?, preamble? } — replacing what is there. For one correction prefer patchBlocks.",
      ),
    patchBlocks: jsonish(
      z.array(
        z
          .object({
            index: z
              .number()
              .describe("Which block, from 0, in the order they are shown"),
          })
          .catchall(z.unknown()),
      ),
    )
      .optional()
      .describe(
        'Merge fields into named blocks: [{ "index": 7, "markScheme": "..." }]. Anything not named is left alone.',
      ),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const db = getDb();
    const { id, contentJson, patchBlocks, ...updates } = args;

    const [existing] = await db
      .select({
        contentJson: schema.assessmentVariants.contentJson,
        content: schema.assessmentVariants.content,
      })
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.id, id))
      .limit(1);
    if (!existing) throw new Error(`Variant not found: ${id}`);

    const set: Record<string, unknown> = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    const changed: string[] = Object.keys(updates);
    let patched = 0;

    if (contentJson) {
      if (!parseActivityContent(contentJson)) {
        throw new Error(
          "That body could not be read as activity content — it needs a `blocks` array, and a `shape` unless the activity already has one.",
        );
      }
      const parsed = parseActivityContent(contentJson)!;
      set.contentJson = JSON.stringify({
        ...contentJson,
        blocks: withCardIds(parsed.shape, parsed.blocks),
      });
      changed.push("contentJson");
    }

    if (patchBlocks?.length) {
      const base = parseActivityContent(contentJson ?? existing.contentJson);
      if (!base) {
        throw new Error(
          "This variant has no structured body to patch. Send contentJson to give it one.",
        );
      }
      const blocks = [...base.blocks] as Record<string, unknown>[];
      for (const patch of patchBlocks as Array<Record<string, unknown>>) {
        const index = patch.index as number;
        if (!blocks[index]) {
          throw new Error(
            `There is no block ${index} — this variant has ${blocks.length}, numbered from 0.`,
          );
        }
        const { index: _drop, ...fields } = patch;
        // Merged, never replaced: a card keeps its id and a question keeps
        // the marks, options and hint nobody mentioned.
        blocks[index] = { ...blocks[index], ...fields };
        patched++;
      }
      set.contentJson = JSON.stringify({
        ...base,
        blocks: withCardIds(base.shape, blocks),
      });
      if (!changed.includes("contentJson")) changed.push("blocks");
    }

    await db
      .update(schema.assessmentVariants)
      .set(set)
      .where(eq(schema.assessmentVariants.id, id));

    // The markdown is the print view and the fallback renderer. Changing the
    // structured body without it leaves two versions of the same activity
    // disagreeing, and the paper one is the one that reaches a desk.
    const markdownNowStale =
      set.contentJson !== undefined && updates.content === undefined;

    return {
      success: true,
      id,
      changed,
      blocksPatched: patched,
      ...(markdownNowStale
        ? {
            warning:
              "The structured body changed but the markdown did not. That markdown is what prints and what shows if the structured body cannot be read, so send `content` as well unless you have a reason not to.",
          }
        : {}),
    };
  },
});
