import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

interface StandardEntry {
  framework: string;
  code: string;
  description?: string;
}

interface SubjectDraft {
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
      objectives?: Array<{ description: string; bloomsLevel?: string }>;
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
      unitsCreated: 0,
      objectivesCreated: 0,
    };

    for (const s of subjects) {
      const subjectId = nanoid();
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

      for (const gl of s.gradeLevels ?? []) {
        for (const u of gl.units ?? []) {
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
            sequence: u.sequence ?? 1,
            standardsJson: JSON.stringify(u.standards ?? []),
            status: "active",
            ownerEmail: userEmail ?? "",
            orgId,
            visibility: "org" as const,
          });
          results.unitsCreated++;

          for (let i = 0; i < (u.objectives ?? []).length; i++) {
            const obj = u.objectives![i];
            await db.insert(schema.learningObjectives).values({
              id: nanoid(),
              unitId,
              description: obj.description,
              bloomsLevel: obj.bloomsLevel ?? null,
              sequence: i + 1,
            });
            results.objectivesCreated++;
          }
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

    return {
      success: true,
      draftId: args.id,
      ...results,
      message: `Committed: ${results.subjectsCreated} subjects, ${results.unitsCreated} units, ${results.objectivesCreated} learning objectives created.`,
    };
  },
});
