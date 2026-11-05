import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { currentAccess } from "@agent-native/core/sharing";
import {
  actorForEmail,
  assertAssessmentAccess,
} from "../server/lib/class-access.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Update a rubric's title and/or replace all its criteria. Providing criteria replaces the existing set.",
  schema: z.object({
    id: z.string().describe("Rubric ID"),
    title: z.string().optional().describe("New title for the rubric"),
    criteria: z
      .array(
        z.object({
          description: z.string().describe("Criterion description"),
          maxPoints: z
            .number()
            .int()
            .positive()
            .describe("Maximum points for this criterion"),
        }),
      )
      .optional()
      .describe("Full replacement list of criteria (replaces all existing)"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    // A rubric is edited by someone who may edit the work it marks. The id
    // alone would reach any school's.
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const [rubric] = await db
      .select({
        orgId: schema.rubrics.orgId,
        assessmentId: schema.rubrics.assessmentId,
      })
      .from(schema.rubrics)
      .where(eq(schema.rubrics.id, args.id))
      .limit(1);
    if (!rubric || rubric.orgId !== orgId) throw new Error("Rubric not found.");
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (!actor) throw new Error("No school context.");
    if (rubric.assessmentId) {
      await assertAssessmentAccess(actor, rubric.assessmentId);
    }
    const now = new Date().toISOString();
    if (args.title) {
      await db
        .update(schema.rubrics)
        .set({ title: args.title, updatedAt: now })
        .where(eq(schema.rubrics.id, args.id));
    }
    if (args.criteria) {
      await db
        .delete(schema.rubricCriteria)
        .where(eq(schema.rubricCriteria.rubricId, args.id));
      for (let i = 0; i < args.criteria.length; i++) {
        const c = args.criteria[i];
        await db.insert(schema.rubricCriteria).values({
          id: nanoid(),
          rubricId: args.id,
          description: c.description,
          maxPoints: c.maxPoints,
          sequence: i + 1,
        });
      }
    }
    return { success: true, id: args.id };
  },
});
