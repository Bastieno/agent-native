import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  generateCode,
  resolveYearGroup,
  summariseImport,
  type SyllabusImportState,
} from "../shared/syllabus-import.js";
import { schoolYearGroups } from "../server/lib/year-groups.js";

/**
 * Put a reviewed syllabus into the school's own standards library.
 *
 * From here it behaves exactly as the shipped libraries do — curriculum
 * drafting reads it, units carry its codes — except that it belongs to this
 * school, is not a sample, and every objective remembers where it came from.
 *
 * It previews by default. An import is an extraction from a document nobody
 * has proof-read line by line, and writing a school's curriculum on a guess is
 * not something to do on one call.
 */
export default defineAction({
  description:
    "Write a reviewed syllabus import into this school's own standards library, where curriculum drafting will find it alongside the shipped samples. Previews by default; pass confirm=true to write. Objectives keep the syllabus's own codes; where there are none, codes are generated and marked as the app's own.",
  schema: z.object({
    id: z.string().describe("Import ID"),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe("false previews what would be written; true writes it"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [row] = await db
      .select()
      .from(schema.syllabusImports)
      .where(
        and(
          eq(schema.syllabusImports.id, args.id),
          eq(schema.syllabusImports.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!row) throw new Error("That import was not found.");
    if (row.status === "committed") {
      throw new Error("That import has already been committed.");
    }

    const state = JSON.parse(row.stateJson || "{}") as SyllabusImportState;
    const known = await schoolYearGroups(orgId);
    const summary = summariseImport(state, known);
    const name = summary.frameworkName;
    if (!name) {
      throw new Error(
        "The syllabus has no name — what does the school call it? Set framework.name before committing.",
      );
    }
    if (summary.problems.length) {
      throw new Error(
        `This import is not ready: ${summary.problems.join(" ")} Fix it with update-syllabus-import, then commit.`,
      );
    }

    // What already exists under this name for this school — committing twice
    // must not leave a school with two copies of its own syllabus.
    const existing = await db
      .select()
      .from(schema.curriculumFrameworks)
      .where(
        and(
          eq(schema.curriculumFrameworks.name, name),
          eq(schema.curriculumFrameworks.orgId, orgId),
        ),
      );

    if (!args.confirm) {
      return {
        preview: true,
        id: args.id,
        framework: name,
        subjects: summary.subjects,
        totalObjectives: summary.totalObjectives,
        unread: summary.unread,
        observations: summary.observations,
        existingEntries: existing.length,
        message: `Would add "${name}" to ${orgId === row.schoolId ? "this school's" : "the"} library: ${summary.totalObjectives} objective(s) across ${summary.subjects.length} subject(s).${
          existing.length
            ? ` ${existing.length} entr(ies) already exist under this name and will be left alone — committing adds alongside them, so check this is not a second copy.`
            : ""
        }${summary.observations.length ? ` ${summary.observations.join(" ")}` : ""} Re-run with confirm=true to write it.`,
      };
    }

    let frameworksCreated = 0;
    let objectivesCreated = 0;
    let generatedCodes = 0;

    for (const subject of state.subjects ?? []) {
      const frameworkId = nanoid();
      await db.insert(schema.curriculumFrameworks).values({
        id: frameworkId,
        name,
        subject: subject.subject,
        gradeRange: resolveYearGroup(subject.gradeRange, known).canonical,
        version: state.framework?.version ?? null,
        sourceUrl: state.framework?.source ?? row.source ?? null,
        // The school's own syllabus: theirs, and not a sample.
        orgId,
        isSample: false,
        // Remembering the import means removing this later can hand the
        // reading back for correcting instead of throwing it away.
        importId: row.id,
      });
      frameworksCreated++;

      let sequence = 1;
      for (const strand of subject.strands ?? []) {
        for (const objective of strand.objectives ?? []) {
          const description = objective.description?.trim();
          if (!description) continue;
          const own = objective.code?.trim();
          const code =
            own || generateCode(subject.subject, strand.strand, sequence);
          if (!own) generatedCodes++;
          await db.insert(schema.frameworkObjectives).values({
            id: nanoid(),
            frameworkId,
            code,
            strand: strand.strand ?? null,
            subStrand: strand.subStrand ?? null,
            subject: subject.subject,
            description,
            // Stored in the school's own spelling: an objective filed under
            // "JSS 1" is invisible to a year group called "JSS1".
            gradeLevel: resolveYearGroup(
              objective.gradeLevel ?? subject.gradeRange,
              known,
            ).canonical,
            sequence: sequence++,
            sourceNote: objective.source ?? state.framework?.source ?? null,
            codeGenerated: !own,
          });
          objectivesCreated++;
        }
      }
    }

    await db
      .update(schema.syllabusImports)
      .set({ status: "committed", updatedAt: new Date().toISOString() })
      .where(eq(schema.syllabusImports.id, args.id));
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      committed: true,
      id: args.id,
      framework: name,
      frameworksCreated,
      objectivesCreated,
      generatedCodes,
      unread: summary.unread,
      message: `"${name}" is now in the school's library: ${objectivesCreated} objective(s) across ${frameworksCreated} subject(s). ${
        generatedCodes
          ? `${generatedCodes} carry codes generated by the app rather than the syllabus — they order the library and should not be quoted as official references. `
          : ""
      }${
        summary.unread.length
          ? `Still unread from the document: ${summary.unread.join("; ")}. `
          : ""
      }Curriculum drafting will now find it under "${name}", ahead of any shipped sample of the same name.`,
    };
  },
});
