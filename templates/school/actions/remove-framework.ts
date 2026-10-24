import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

/**
 * Take a school's own syllabus back out of its library.
 *
 * A syllabus read from a scan can turn out wrong — the wrong edition, half a
 * subject missed, a photograph that was of somebody else's folder. Until now
 * the only way back was the database.
 *
 * Only a school's own libraries can go. The samples shipped with the app
 * belong to every school on the deployment, and one school deleting NERDC for
 * everyone is not a mistake worth making possible.
 *
 * Units already written keep their standards codes: a unit stores the codes it
 * was written against as its own text, so a curriculum built from this
 * syllabus goes on saying what it was built from. What stops is new planning
 * finding these objectives.
 */
export default defineAction({
  description:
    "Remove one of this school's own syllabus libraries. Previews by default; pass confirm=true to remove. Units already written keep the standards codes they carry. The import it came from is handed back so it can be corrected and committed again. Cannot remove the sample libraries that ship with the app.",
  schema: z.object({
    name: z
      .string()
      .describe("The library's name, as list-framework-objectives shows it"),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe("false describes what would go; true removes it"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const mine = await db
      .select()
      .from(schema.curriculumFrameworks)
      .where(
        and(
          eq(schema.curriculumFrameworks.name, args.name),
          eq(schema.curriculumFrameworks.orgId, orgId),
        ),
      );

    if (mine.length === 0) {
      // Say which case it is: a school's own, a shipped sample, or nothing.
      const shipped = await db
        .select({ id: schema.curriculumFrameworks.id })
        .from(schema.curriculumFrameworks)
        .where(eq(schema.curriculumFrameworks.name, args.name));
      throw new Error(
        shipped.length
          ? `"${args.name}" is a library that ships with the app, shared by every school — it cannot be removed. Only a syllabus this school imported can.`
          : `This school has no library called "${args.name}".`,
      );
    }

    const frameworkIds = mine.map((f: any) => f.id);
    const objectives = await db
      .select({ id: schema.frameworkObjectives.id })
      .from(schema.frameworkObjectives)
      .where(inArray(schema.frameworkObjectives.frameworkId, frameworkIds));

    const importIds = [
      ...new Set(mine.map((f: any) => f.importId).filter(Boolean)),
    ] as string[];

    if (!args.confirm) {
      return {
        preview: true,
        name: args.name,
        subjects: mine.map((f: any) => f.subject).filter(Boolean),
        objectives: objectives.length,
        message: `Would remove "${args.name}" from this school's library: ${objectives.length} objective(s) across ${mine.length} subject entr(ies). Units already written keep the codes they carry; what stops is new planning finding these objectives.${
          importIds.length
            ? " The import it came from will be handed back so it can be corrected and committed again."
            : ""
        } Re-run with confirm=true to remove it.`,
      };
    }

    if (objectives.length) {
      await db
        .delete(schema.frameworkObjectives)
        .where(inArray(schema.frameworkObjectives.frameworkId, frameworkIds));
    }
    await db
      .delete(schema.curriculumFrameworks)
      .where(inArray(schema.curriculumFrameworks.id, frameworkIds));

    // Hand the reading back rather than losing it: the import returns to the
    // state it was in before it was committed.
    for (const importId of importIds) {
      await db
        .update(schema.syllabusImports)
        .set({ status: "in_progress", updatedAt: new Date().toISOString() })
        .where(
          and(
            eq(schema.syllabusImports.id, importId),
            eq(schema.syllabusImports.schoolId, orgId),
          ),
        );
    }
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      removed: true,
      name: args.name,
      objectivesRemoved: objectives.length,
      entriesRemoved: mine.length,
      importsReopened: importIds,
      message: `"${args.name}" has been removed from this school's library — ${objectives.length} objective(s) across ${mine.length} subject entr(ies). Units already written keep the codes they carry.${
        importIds.length
          ? ` The import it came from is open again, so it can be corrected and committed without reading the document a second time.`
          : ""
      }`,
    };
  },
});
