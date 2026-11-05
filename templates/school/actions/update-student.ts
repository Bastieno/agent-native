import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { currentAccess } from "@agent-native/core/sharing";
import { assertGradeLevelInSchool } from "../server/lib/curriculum-access.js";
import { z } from "zod";

export default defineAction({
  description:
    "Update a student's grade level, admission number, custom fields, or status.",
  schema: z.object({
    id: z.string().describe("Student record ID"),
    gradeLevelId: z.string().optional(),
    admissionNumber: z.string().optional(),
    status: z.enum(["active", "graduated", "withdrawn"]).optional(),
    customFields: z
      .record(z.string(), z.unknown())
      .optional()
      .describe("Custom field values to merge into existing"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    // Only this school's own learners: an id alone would reach any school's.
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const { id, customFields, ...rest } = args;
    const [own] = await db
      .select({ id: schema.students.id })
      .from(schema.students)
      .where(and(eq(schema.students.id, id), eq(schema.students.orgId, orgId)))
      .limit(1);
    if (!own) throw new Error("That learner is not in this school.");
    if (args.gradeLevelId) {
      await assertGradeLevelInSchool(args.gradeLevelId, orgId);
    }
    const updates: Record<string, unknown> = {
      ...rest,
      updatedAt: new Date().toISOString(),
    };
    if (customFields) {
      const [existing] = await db
        .select({ customFieldsJson: schema.students.customFieldsJson })
        .from(schema.students)
        .where(
          and(eq(schema.students.id, id), eq(schema.students.orgId, orgId)),
        )
        .limit(1);
      const merged = {
        ...JSON.parse(existing?.customFieldsJson ?? "{}"),
        ...customFields,
      };
      updates.customFieldsJson = JSON.stringify(merged);
    }
    await db
      .update(schema.students)
      .set(updates)
      .where(and(eq(schema.students.id, id), eq(schema.students.orgId, orgId)));
    return { success: true, id };
  },
});
