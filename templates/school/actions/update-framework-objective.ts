import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { assertOwnFrameworkObjective } from "../server/lib/curriculum-access.js";

/**
 * Correct one objective in a school's own syllabus library.
 *
 * A line read from a photograph comes out wrong often enough — a missed word,
 * a code transcribed from the row above, the wrong year group — and the only
 * remedy was to remove the whole library and import it again. One line should
 * not cost a syllabus.
 *
 * Curricula already written keep what they were written against: a unit stores
 * its standards codes as its own text, and its objectives were copied when the
 * unit was created. Correcting the library changes what is planned from here.
 */
export default defineAction({
  description:
    "Correct one objective in a syllabus this school imported: its wording, code, strand, year group or source note. Only this school's own libraries can be edited — the samples that ship with the app are shared. Curricula already written are unchanged.",
  schema: z.object({
    id: z.string().describe("Objective ID, from get-school-library"),
    description: z.string().optional().describe("The corrected wording"),
    code: z
      .string()
      .optional()
      .describe("The syllabus's own code for this objective"),
    strand: z.string().nullable().optional(),
    subStrand: z.string().nullable().optional(),
    gradeLevel: z
      .string()
      .nullable()
      .optional()
      .describe("Which year group(s) this objective belongs to"),
    source: z
      .string()
      .nullable()
      .optional()
      .describe("Where it came from — document and page"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const { objective } = await assertOwnFrameworkObjective(args.id, orgId);

    const updates: Record<string, unknown> = {};
    if (args.description !== undefined) {
      const text = args.description.trim();
      if (!text) {
        throw new Error(
          "An objective cannot be empty. Remove it with delete-framework-objective instead.",
        );
      }
      updates.description = text;
    }
    if (args.code !== undefined) {
      const code = args.code.trim();
      if (!code) throw new Error("A code cannot be empty.");
      updates.code = code;
      // A code typed in by the school is the syllabus's own, not the app's.
      updates.codeGenerated = false;
    }
    if (args.strand !== undefined) updates.strand = args.strand;
    if (args.subStrand !== undefined) updates.subStrand = args.subStrand;
    if (args.gradeLevel !== undefined) updates.gradeLevel = args.gradeLevel;
    if (args.source !== undefined) updates.sourceNote = args.source;

    if (Object.keys(updates).length === 0) {
      return { id: args.id, message: "Nothing to change." };
    }

    await getDb()
      .update(schema.frameworkObjectives)
      .set(updates)
      .where(eq(schema.frameworkObjectives.id, args.id));
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      id: args.id,
      previous: {
        description: objective.description,
        code: objective.code,
      },
      message:
        "Objective corrected. Curricula already written keep the wording and codes they were built with.",
    };
  },
});
