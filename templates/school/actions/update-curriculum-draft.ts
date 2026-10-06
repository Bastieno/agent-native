import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { pacingReport } from "../server/lib/pacing-report.js";
import { weekPlanFromDraft } from "../shared/week-plan.js";
import { z } from "zod";
import { assertMayOpenDraft } from "../server/lib/curriculum-access.js";

export default defineAction({
  description:
    "Persist accumulated curriculum co-authoring state after each turn. Updates both the SQL row (durable) and the app-state key (live UI). Call this at the end of every turn during a curriculum session.",
  schema: z.object({
    id: z.string().describe("Curriculum draft ID from start-curriculum-draft"),
    stateJson: z
      .record(z.string(), z.unknown())
      .describe(
        "The full accumulated state, in the shape commit-curriculum-draft reads:\n" +
          '{ "subjects": [ { "subjectId": "<existing subject id, to avoid creating a duplicate>", "name": "Mathematics", "code": "MTH",\n' +
          '  "gradeLevels": [ { "gradeLevelId": "<grade level id>", "gradeLevelName": "JSS1",\n' +
          '    "units": [ { "title": "Whole Numbers", "termId": "<term id>", "weekStart": 1, "weekEnd": 3,\n' +
          '      "standards": [ { "framework": "NERDC", "code": "MATHJSS-NN-1", "description": "..." } ],\n' +
          '      "learningObjectives": [ { "description": "...", "bloomsLevel": "understand" } ] } ] } ] } ] }\n' +
          "Units nest under the year group they are written for. Send the whole state each time, not a patch.",
      ),
    step: z
      .string()
      .optional()
      .describe(
        "Current step label for the UI, e.g. 'Adding units for Grade 9'",
      ),
    lastAction: z.string().optional().describe("Last action performed"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const db = getDb();
    // A teacher may draft the subjects they teach; this is where that is
    // checked, against the draft as it stands before this write.
    const [existing] = await db
      .select({
        stateJson: schema.curriculumDrafts.stateJson,
        status: schema.curriculumDrafts.status,
      })
      .from(schema.curriculumDrafts)
      .where(eq(schema.curriculumDrafts.id, args.id))
      .limit(1);
    if (!existing) throw new Error(`Curriculum draft not found: ${args.id}`);
    await assertMayOpenDraft(existing.stateJson, existing.status);

    const stateJsonStr = JSON.stringify(args.stateJson);
    await db
      .update(schema.curriculumDrafts)
      .set({ stateJson: stateJsonStr, updatedAt: new Date().toISOString() })
      .where(eq(schema.curriculumDrafts.id, args.id));
    await writeAppState(`curriculum-draft-${args.id}`, {
      draftId: args.id,
      stateJson: args.stateJson,
      step: args.step ?? "in_progress",
      lastAction: args.lastAction ?? "update-curriculum-draft",
    });
    // Say what the draft now adds up to. A shape nobody could teach from is
    // cheap to fix while it is still a draft.
    const { orgId } = currentAccess();
    const pacing = orgId
      ? await pacingReport(args.stateJson, orgId)
      : { terms: [], problems: [], observations: [] };

    // Saying only "saved" left an agent unable to tell whether the weekly
    // pacing it just wrote had been understood — the reply was identical
    // before and after adding it.
    const weekPlans: Array<{
      unit: string;
      weeks: Array<{ week: number; objectives: string[]; note: string | null }>;
    }> = [];
    for (const subject of (args.stateJson as any)?.subjects ?? []) {
      for (const gl of subject?.gradeLevels ?? []) {
        for (const unit of gl?.units ?? []) {
          const plan = weekPlanFromDraft(unit);
          if (!plan) continue;
          weekPlans.push({
            unit: unit?.title ?? "untitled unit",
            // The objectives themselves, not a count: a count of 0 was the
            // only sign that a plan written in an unexpected shape had been
            // read as empty, and it took an agent noticing to catch it.
            weeks: plan.map((w) => ({
              week: w.week,
              objectives: w.objectives,
              note: w.note ?? null,
            })),
          });
        }
      }
    }

    const lines = [...pacing.problems, ...pacing.observations];
    return {
      success: true,
      id: args.id,
      pacing: pacing.terms,
      weekPlans,
      problems: pacing.problems,
      observations: pacing.observations,
      message: lines.length ? `Saved. ${lines.join(" ")}` : "Saved.",
    };
  },
});
