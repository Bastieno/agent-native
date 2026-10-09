import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { pacingReport } from "../server/lib/pacing-report.js";
import { weekPlanFromDraft } from "../shared/week-plan.js";

interface StandardEntry {
  framework: string;
  code: string;
  description?: string;
}

interface SubjectDraft {
  /** An existing subject to add to. Without it, one is matched by name. */
  subjectId?: string;
  name: string;
  code?: string;
  color?: string;
  departmentId?: string;
  gradeLevels?: Array<{
    gradeLevelId: string;
    units?: Array<{
      title: string;
      description?: string;
      termId?: string;
      weekStart?: number;
      weekEnd?: number;
      sequence?: number;
      standards?: StandardEntry[];
      // Both spellings arrive. `learningObjectives` is what the draft, the
      // workspace and the documentation use; `objectives` is what this action
      // originally read. Reading only one dropped every objective silently.
      // The pacing within the unit, as worked out with the school: which
      // objectives each week carries, and what a week with none is for.
      objectivesByWeek?: string[][];
      weekNotes?: unknown;
      learningObjectives?: Array<
        string | { description: string; bloomsLevel?: string }
      >;
      objectives?: Array<
        string | { description: string; bloomsLevel?: string }
      >;
    }>;
  }>;
}

export default defineAction({
  description:
    "Materialize a curriculum draft into real subjects, units, and learning objectives in the database. This is the final step of the curriculum co-authoring flow. The draft stateJson must contain a 'subjects' array.",
  schema: z.object({
    id: z.string().describe("Curriculum draft ID to commit"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [draft] = await db
      .select()
      .from(schema.curriculumDrafts)
      .where(eq(schema.curriculumDrafts.id, args.id))
      .limit(1);
    if (!draft) throw new Error(`Draft not found: ${args.id}`);
    if (draft.status === "committed")
      throw new Error("This draft has already been committed.");

    const state = JSON.parse(draft.stateJson) as {
      subjects?: SubjectDraft[];
    };
    const subjects = state.subjects ?? [];

    const results = {
      subjectsCreated: 0,
      subjectsReused: 0,
      unitsCreated: 0,
      unitsWithWeekPlan: 0,
      objectivesCreated: 0,
      unitsWithoutObjectives: 0,
    };

    for (const s of subjects) {
      // A curriculum is almost always written for a subject the school already
      // has. Creating a new one every time left two "Mathematics" subjects,
      // with the units on the copy and the original — the one with its colour,
      // its classes and its blueprint — empty. Use the one named by id, then
      // one matching by name, and create only when neither exists.
      const existing = s.subjectId
        ? await db
            .select({ id: schema.subjects.id })
            .from(schema.subjects)
            .where(
              and(
                eq(schema.subjects.id, s.subjectId),
                eq(schema.subjects.schoolId, orgId),
              ),
            )
            .limit(1)
        : [];
      const byName =
        existing.length === 0
          ? (
              await db
                .select({ id: schema.subjects.id, name: schema.subjects.name })
                .from(schema.subjects)
                .where(
                  and(
                    eq(schema.subjects.schoolId, orgId),
                    eq(schema.subjects.status, "active"),
                  ),
                )
            ).filter(
              (row: { name: string }) =>
                row.name.trim().toLowerCase() === s.name.trim().toLowerCase(),
            )
          : [];

      let subjectId: string;
      if (existing[0]) {
        subjectId = existing[0].id;
        results.subjectsReused++;
      } else if (byName[0]) {
        subjectId = byName[0].id;
        results.subjectsReused++;
      } else {
        subjectId = nanoid();
        await db.insert(schema.subjects).values({
          id: subjectId,
          schoolId: orgId,
          name: s.name,
          code: s.code ?? null,
          color: s.color ?? null,
          departmentId: s.departmentId ?? null,
          iconName: null,
          position: 0,
          status: "active",
          ownerEmail: userEmail ?? "",
          orgId,
          visibility: "org" as const,
        });
        results.subjectsCreated++;
      }

      for (const gl of s.gradeLevels ?? []) {
        // Units come in teaching order; keep it. Defaulting every one to
        // sequence 1 left a term's units with no order at all.
        const ordered = [...(gl.units ?? [])].sort(
          (a, b) => (a.weekStart ?? 0) - (b.weekStart ?? 0),
        );
        for (let position = 0; position < ordered.length; position++) {
          const u = ordered[position];
          const unitId = nanoid();
          await db.insert(schema.units).values({
            id: unitId,
            subjectId,
            gradeLevelId: gl.gradeLevelId,
            title: u.title,
            description: u.description ?? null,
            termId: u.termId ?? null,
            weekStart: u.weekStart ?? null,
            weekEnd: u.weekEnd ?? null,
            sequence: u.sequence ?? position + 1,
            // Without this the weekly plan lived only in the draft, and a
            // committed unit knew nothing but its first and last week.
            weekPlanJson: (() => {
              const plan = weekPlanFromDraft(u as any);
              return plan ? JSON.stringify(plan) : null;
            })(),
            standardsJson: JSON.stringify(u.standards ?? []),
            status: "active",
            ownerEmail: userEmail ?? "",
            orgId,
            visibility: "org" as const,
          });
          results.unitsCreated++;
          if (weekPlanFromDraft(u as any)) results.unitsWithWeekPlan++;

          const objectives = u.learningObjectives ?? u.objectives ?? [];
          let written = 0;
          for (let i = 0; i < objectives.length; i++) {
            const obj = objectives[i];
            const description =
              typeof obj === "string" ? obj : obj?.description;
            if (!description?.trim()) continue;
            await db.insert(schema.learningObjectives).values({
              id: nanoid(),
              unitId,
              description: description.trim(),
              bloomsLevel:
                typeof obj === "string" ? null : (obj.bloomsLevel ?? null),
              sequence: i + 1,
            });
            written++;
            results.objectivesCreated++;
          }
          if (written === 0) results.unitsWithoutObjectives++;
        }
      }
    }

    // Mark draft as committed
    await db
      .update(schema.curriculumDrafts)
      .set({ status: "committed", updatedAt: new Date().toISOString() })
      .where(eq(schema.curriculumDrafts.id, args.id));

    // Clear live workspace app-state
    await writeAppState(`curriculum-draft-${args.id}`, {
      draftId: args.id,
      stateJson: state,
      step: "committed",
      lastAction: "commit-curriculum-draft",
    });

    const pacing = await pacingReport(state, orgId);

    // A commit that made units but no objectives is not a success, whatever
    // the database says. It is how seventeen objectives went missing while the
    // action reported success: true.
    const warning =
      results.unitsWithoutObjectives > 0
        ? `${results.unitsWithoutObjectives} unit(s) were created with no learning objectives. Check the draft's units carry a learningObjectives array.`
        : null;

    return {
      success: warning === null,
      draftId: args.id,
      ...results,
      warning,
      // What was committed, in terms of weeks: the same reading the draft gave
      // on every save, repeated here because this is the copy a teacher works
      // from. Units can still be edited afterwards.
      pacing: pacing.terms,
      problems: pacing.problems,
      observations: pacing.observations,
      message: `Committed: ${results.unitsCreated} units and ${results.objectivesCreated} learning objectives${
        results.subjectsReused
          ? `, added to ${results.subjectsReused} existing subject(s)`
          : ""
      }${
        results.subjectsCreated
          ? `, ${results.subjectsCreated} new subject(s) created`
          : ""
      }.${warning ? ` WARNING: ${warning}` : ""}${
        pacing.problems.length ? ` ${pacing.problems.join(" ")}` : ""
      }${pacing.observations.length ? ` ${pacing.observations.join(" ")}` : ""}`,
    };
  },
});
