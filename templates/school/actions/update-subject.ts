import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "Update a subject's name, code, color, department, or status.",
  schema: z.object({
    id: z.string().describe("Subject ID"),
    name: z.string().optional().describe("Subject name"),
    code: z.string().optional().describe("Short code, e.g. 'MATH'"),
    color: z.string().optional().describe("Hex color for UI, e.g. '#3b82f6'"),
    departmentId: z.string().optional().describe("Department ID"),
    status: z.enum(["active", "archived"]).optional(),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { id, ...updates } = args;
    const db = getDb();
    const set: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };
    if (updates.name !== undefined) set.name = updates.name;
    if (updates.code !== undefined) set.code = updates.code;
    if (updates.color !== undefined) set.color = updates.color;
    if (updates.departmentId !== undefined)
      set.departmentId = updates.departmentId;
    if (updates.status !== undefined) set.status = updates.status;
    await db.update(schema.subjects).set(set).where(eq(schema.subjects.id, id));
    return { success: true, id };
  },
});
