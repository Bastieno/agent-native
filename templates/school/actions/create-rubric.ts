import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Create a grading rubric for an assessment (optionally for a specific variant).",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
    variantId: z.string().optional().describe("If set, rubric applies only to this variant. If omitted, applies to all variants."),
    title: z.string().describe("Rubric title"),
    criteria: z
      .array(
        z.object({
          description: z.string().describe("What is being assessed"),
          maxPoints: z.number().describe("Maximum points for this criterion"),
          sequence: z.number().optional(),
        }),
      )
      .describe("Grading criteria"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const rubricId = nanoid();
    await db.insert(schema.rubrics).values({
      id: rubricId,
      assessmentId: args.assessmentId,
      variantId: args.variantId ?? null,
      title: args.title,
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    for (let i = 0; i < args.criteria.length; i++) {
      const c = args.criteria[i];
      await db.insert(schema.rubricCriteria).values({
        id: nanoid(),
        rubricId,
        description: c.description,
        maxPoints: c.maxPoints,
        sequence: c.sequence ?? i + 1,
      });
    }
    return { id: rubricId, title: args.title, criteriaCount: args.criteria.length };
  },
});
