import { getDb, schema } from "../db/index.js";
import { asc, eq } from "drizzle-orm";

/** The school's own year-group names, in their order. */
export async function schoolYearGroups(schoolId: string): Promise<string[]> {
  const rows = await getDb()
    .select({ name: schema.gradeLevels.name })
    .from(schema.gradeLevels)
    .where(eq(schema.gradeLevels.schoolId, schoolId))
    .orderBy(asc(schema.gradeLevels.sequence));
  return rows.map((r: { name: string }) => r.name);
}
