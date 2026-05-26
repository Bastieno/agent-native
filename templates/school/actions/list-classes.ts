import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List classes for the school or for a specific teacher.",
  schema: z.object({
    teacherUserId: z.string().optional().describe("Filter to classes where this user is primary teacher"),
    subjectId: z.string().optional(),
    gradeLevelId: z.string().optional(),
    academicYearId: z.string().optional(),
    status: z.enum(["active", "archived"]).optional(),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const conditions = [eq(schema.classes.orgId, orgId)];
    if (args.teacherUserId) conditions.push(eq(schema.classes.primaryTeacherUserId, args.teacherUserId));
    if (args.subjectId) conditions.push(eq(schema.classes.subjectId, args.subjectId));
    if (args.gradeLevelId) conditions.push(eq(schema.classes.gradeLevelId, args.gradeLevelId));
    if (args.academicYearId) conditions.push(eq(schema.classes.academicYearId, args.academicYearId));
    if (args.status) conditions.push(eq(schema.classes.status, args.status));
    return db
      .select()
      .from(schema.classes)
      .where(and(...conditions));
  },
});
