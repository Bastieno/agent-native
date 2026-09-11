import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { z } from "zod";

/** One class, as staff see it. Access to the class is checked by the guard. */
export default defineAction({
  description:
    "Get a single class with its subject, year group and teacher. Staff view — students use get-my-class.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [row] = await db
      .select({
        cls: schema.classes,
        subjectName: schema.subjects.name,
        gradeLevelName: schema.gradeLevels.name,
      })
      .from(schema.classes)
      .leftJoin(
        schema.subjects,
        eq(schema.classes.subjectId, schema.subjects.id),
      )
      .leftJoin(
        schema.gradeLevels,
        eq(schema.classes.gradeLevelId, schema.gradeLevels.id),
      )
      .where(
        and(
          eq(schema.classes.id, args.classId),
          eq(schema.classes.orgId, orgId),
        ),
      )
      .limit(1);
    if (!row) throw new Error("Class not found.");

    const labels = await getUserLabels([row.cls.primaryTeacherUserId]);
    return {
      ...row.cls,
      subjectName: row.subjectName ?? null,
      gradeLevelName: row.gradeLevelName ?? null,
      teacherName: labelFor(labels, row.cls.primaryTeacherUserId),
    };
  },
});
