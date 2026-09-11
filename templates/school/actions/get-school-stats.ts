import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, count } from "drizzle-orm";
import { z } from "zod";

/** Headline counts for the admin overview: how big is this school? */
export default defineAction({
  description:
    "Counts for the school at a glance: active staff, students, classes and subjects.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [staffRows, studentRows, classRows, subjectRows] = await Promise.all([
      db
        .select({ c: count() })
        .from(schema.schoolProfiles)
        .where(
          and(
            eq(schema.schoolProfiles.schoolId, orgId),
            eq(schema.schoolProfiles.status, "active"),
          ),
        ),
      db
        .select({ c: count() })
        .from(schema.students)
        .where(
          and(
            eq(schema.students.schoolId, orgId),
            eq(schema.students.status, "active"),
          ),
        ),
      db
        .select({ c: count() })
        .from(schema.classes)
        .where(
          and(
            eq(schema.classes.orgId, orgId),
            eq(schema.classes.status, "active"),
          ),
        ),
      db
        .select({ c: count() })
        .from(schema.subjects)
        .where(
          and(
            eq(schema.subjects.orgId, orgId),
            eq(schema.subjects.status, "active"),
          ),
        ),
    ]);

    // Staff profiles include students; count only the adults.
    const studentProfiles = await db
      .select({ c: count() })
      .from(schema.schoolProfiles)
      .where(
        and(
          eq(schema.schoolProfiles.schoolId, orgId),
          eq(schema.schoolProfiles.status, "active"),
          eq(schema.schoolProfiles.schoolRole, "student"),
        ),
      );

    return {
      staffCount: Math.max(
        0,
        Number(staffRows[0]?.c ?? 0) - Number(studentProfiles[0]?.c ?? 0),
      ),
      studentCount: Number(studentRows[0]?.c ?? 0),
      classCount: Number(classRows[0]?.c ?? 0),
      subjectCount: Number(subjectRows[0]?.c ?? 0),
    };
  },
});
