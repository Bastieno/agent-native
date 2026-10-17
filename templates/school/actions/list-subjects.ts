import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";
import { parseGradeLevelIds } from "../server/lib/subject-year-groups.js";

export default defineAction({
  description:
    "List the school's subjects. Active ones by default — archived subjects are retired, and an agent narrating them (or adding units to one) is how a duplicate gets used by mistake. Pass status to see archived ones, or 'all' for both.",
  schema: z.object({
    departmentId: z.string().optional().describe("Filter by department"),
    status: z
      .enum(["active", "archived", "all"])
      .optional()
      .default("active")
      .describe("Which subjects to list. Defaults to the ones in use."),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const conditions = [eq(schema.subjects.schoolId, orgId)];
    if (args.departmentId)
      conditions.push(eq(schema.subjects.departmentId, args.departmentId));
    if (args.status && args.status !== "all") {
      conditions.push(eq(schema.subjects.status, args.status));
    }
    const rows = await db
      .select()
      .from(schema.subjects)
      .where(and(...conditions))
      .orderBy(asc(schema.subjects.position));
    // Year groups as ids, parsed — null when the school has not said.
    return rows.map((row: any) => ({
      ...row,
      gradeLevelIds: parseGradeLevelIds(row.gradeLevelsJson),
    }));
  },
});
