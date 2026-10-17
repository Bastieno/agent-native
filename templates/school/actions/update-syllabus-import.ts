import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";
import { summariseImport } from "../shared/syllabus-import.js";
import { schoolYearGroups } from "../server/lib/year-groups.js";

/**
 * Save what has been read of a school's syllabus so far.
 *
 * The reply says what was understood — subjects, strands, objectives, what is
 * still unread — because an extraction that quietly dropped half a document
 * looks exactly like one that worked.
 */
export default defineAction({
  description:
    "Save the syllabus read so far. Send the whole state each time, not a patch. The reply says what was understood and what still needs fixing; read it rather than assuming the save was clean.",
  schema: z.object({
    id: z.string().describe("Import ID"),
    stateJson: jsonish(z.record(z.string(), z.unknown())).describe(
      "The whole import state: { framework, subjects[], unread[] }",
    ),
    step: z.string().optional().describe("What you are working through"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
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
      throw new Error(
        "That import has already been committed — its objectives are in the school's library. Edit the library, or start a new import.",
      );
    }

    await db
      .update(schema.syllabusImports)
      .set({
        stateJson: JSON.stringify(args.stateJson),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.syllabusImports.id, args.id));

    await writeAppState(`syllabus-import-${args.id}`, {
      importId: args.id,
      title: row.title,
      stateJson: args.stateJson,
      step: args.step ?? "reading",
    });

    const summary = summariseImport(
      args.stateJson as any,
      await schoolYearGroups(orgId),
    );
    const parts = [
      `${summary.totalObjectives} objective(s) across ${summary.subjects.length} subject(s).`,
      ...summary.problems,
      ...summary.observations,
    ];
    return {
      success: true,
      id: args.id,
      summary,
      message: `Saved. ${parts.join(" ")}`,
    };
  },
});
