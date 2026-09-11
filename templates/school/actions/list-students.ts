import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { z } from "zod";

export default defineAction({
  description:
    "List students enrolled in the school, optionally filtered by grade level or status.",
  schema: z.object({
    gradeLevelId: z.string().optional(),
    status: z.enum(["active", "graduated", "withdrawn"]).optional(),
    limit: z.number().optional().default(50),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const conditions = [eq(schema.students.schoolId, orgId)];
    if (args.gradeLevelId)
      conditions.push(eq(schema.students.gradeLevelId, args.gradeLevelId));
    if (args.status) conditions.push(eq(schema.students.status, args.status));
    const rows = await db
      .select({
        student: schema.students,
        gradeLevelName: schema.gradeLevels.name,
      })
      .from(schema.students)
      .leftJoin(
        schema.gradeLevels,
        eq(schema.students.gradeLevelId, schema.gradeLevels.id),
      )
      .where(and(...conditions))
      .limit(args.limit ?? 50);

    const labels = await getUserLabels(rows.map((r: any) => r.student.userId));

    return rows.map((r: any) => ({
      ...r.student,
      gradeLevelName: r.gradeLevelName ?? null,
      name: labelFor(labels, r.student.userId),
      email: labels[r.student.userId]?.email ?? null,
    }));
  },
});
