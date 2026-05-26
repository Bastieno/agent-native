import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List all subjects for the school.",
  schema: z.object({
    departmentId: z.string().optional().describe("Filter by department"),
    status: z.enum(["active", "archived"]).optional(),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const conditions = [eq(schema.subjects.schoolId, orgId)];
    if (args.departmentId) conditions.push(eq(schema.subjects.departmentId, args.departmentId));
    if (args.status) conditions.push(eq(schema.subjects.status, args.status));
    return db
      .select()
      .from(schema.subjects)
      .where(and(...conditions))
      .orderBy(asc(schema.subjects.position));
  },
});
