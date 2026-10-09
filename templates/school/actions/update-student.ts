import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
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
    const db = getDb();
    const { id, customFields, ...rest } = args;
    const updates: Record<string, unknown> = {
      ...rest,
      updatedAt: new Date().toISOString(),
    };
    if (customFields) {
      const [existing] = await db
        .select({ customFieldsJson: schema.students.customFieldsJson })
        .from(schema.students)
        .where(eq(schema.students.id, id))
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
      .where(eq(schema.students.id, id));
    return { success: true, id };
  },
});
