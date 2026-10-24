import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { canOpenCurriculumDraft } from "../server/lib/curriculum-access.js";
import { actorForEmail } from "../server/lib/class-access.js";
import { getDb, schema } from "../server/db/index.js";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

/**
 * Curriculum sessions that are still open.
 *
 * A draft is durable — it sits in the database until it is committed — but
 * there was no way to find one again. The workspace that shows it is reachable
 * only by the agent navigating to it with an id, and nothing listed the ids.
 * So starting a session and closing the tab left work stranded: real, saved,
 * and invisible.
 *
 * Counting what is in the draft matters as much as listing it. "A session from
 * Tuesday" is not enough to decide whether to resume it or start again; "nine
 * units, sixty objectives" is.
 */
export default defineAction({
  description:
    "List curriculum co-authoring sessions, newest first, with how much has been drafted in each. Use it to resume a session rather than starting a new one — an unfinished draft is easy to lose track of.",
  schema: z.object({
    status: z
      .enum(["in_progress", "committed", "discarded", "all"])
      .optional()
      .default("in_progress")
      .describe("Which sessions to list. Defaults to unfinished ones."),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const conditions = [eq(schema.curriculumDrafts.schoolId, orgId)];
    if (args.status && args.status !== "all") {
      conditions.push(eq(schema.curriculumDrafts.status, args.status));
    }

    const all = await db
      .select()
      .from(schema.curriculumDrafts)
      .where(and(...conditions))
      .orderBy(desc(schema.curriculumDrafts.updatedAt));

    // A teacher sees sessions for the subjects they teach. Listing the rest
    // and refusing to open them would only advertise work that is not
    // theirs.
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    const rows = actor
      ? (
          await Promise.all(
            all.map(async (row: any) =>
              (await canOpenCurriculumDraft(actor, row.stateJson, row.status))
                ? row
                : null,
            ),
          )
        ).filter(Boolean)
      : all;

    const drafts = rows.map((row: any) => {
      // The draft's shape is the agent's to decide, so count tolerantly
      // rather than assuming one structure.
      let subjects = 0;
      let units = 0;
      let objectives = 0;
      try {
        const state = JSON.parse(row.stateJson ?? "{}");
        const subjectList = Array.isArray(state.subjects) ? state.subjects : [];
        subjects = subjectList.length;
        for (const subject of subjectList) {
          // Units nest under year groups in the documented shape; a flat
          // `units` list is still counted for older drafts.
          const unitList = [
            ...(Array.isArray(subject?.units) ? subject.units : []),
            ...(Array.isArray(subject?.gradeLevels)
              ? subject.gradeLevels.flatMap((gl: any) =>
                  Array.isArray(gl?.units) ? gl.units : [],
                )
              : []),
          ];
          units += unitList.length;
          for (const unit of unitList) {
            const objectiveList = Array.isArray(unit?.learningObjectives)
              ? unit.learningObjectives
              : Array.isArray(unit?.objectives)
                ? unit.objectives
                : [];
            objectives += objectiveList.length;
          }
        }
      } catch {
        // A draft we cannot parse is still a draft worth showing.
      }

      return {
        id: row.id,
        sessionTitle: row.sessionTitle,
        status: row.status,
        subjects,
        units,
        objectives,
        updatedAt: row.updatedAt,
        createdAt: row.createdAt,
        path: `/admin/curriculum-setup?draftId=${row.id}`,
      };
    });

    return {
      drafts,
      count: drafts.length,
      message: drafts.length
        ? `${drafts.length} curriculum session(s). Resume one rather than starting again — an unfinished draft holds work that is not in the curriculum yet.`
        : "No curriculum sessions open.",
    };
  },
});
