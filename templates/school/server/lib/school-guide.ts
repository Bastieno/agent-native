import {
  resourceGetByPath,
  resourcePut,
  SHARED_OWNER,
} from "@agent-native/core/resources";
import { getDb, schema } from "../db/index.js";

/**
 * A school's guide, kept per school.
 *
 * It used to be one file, `SCHOOL_GUIDE.md`, owned by the shared workspace:
 * fine while a database held one school, but in a database that holds two,
 * each school's agent would read the other's guide (WAEC and naira at an
 * American high school). A school's guide now lives at
 * `school-guides/<school id>/SCHOOL_GUIDE.md`.
 *
 * The old shared file is still read, as a fallback, but only while the
 * database holds a single school, so a school that wrote its guide before this
 * change keeps it. Once there is a second school the fallback is off: the
 * first school's guide has to be adopted into its own path
 * (`pnpm adopt:school-guide`), and a school with no guide of its own has none.
 */

export const GUIDE_FILE = "SCHOOL_GUIDE.md";

export const guidePath = (schoolId: string) =>
  `school-guides/${schoolId}/${GUIDE_FILE}`;

/** Whether more than one school has people in this database. */
async function hasSeveralSchools(): Promise<boolean> {
  const rows = await getDb()
    .selectDistinct({ schoolId: schema.schoolProfiles.schoolId })
    .from(schema.schoolProfiles)
    .limit(2);
  return rows.length > 1;
}

export async function readSchoolGuide(schoolId: string): Promise<{
  content: string | null;
  updatedAt: string | number | null;
  from: "school" | "shared" | null;
}> {
  const own = await resourceGetByPath(SHARED_OWNER, guidePath(schoolId));
  if (own?.content?.trim()) {
    return { content: own.content, updatedAt: own.updatedAt, from: "school" };
  }
  if (!(await hasSeveralSchools())) {
    const legacy = await resourceGetByPath(SHARED_OWNER, GUIDE_FILE);
    if (legacy?.content?.trim()) {
      return {
        content: legacy.content,
        updatedAt: legacy.updatedAt,
        from: "shared",
      };
    }
  }
  return { content: null, updatedAt: null, from: null };
}

export async function writeSchoolGuide(
  schoolId: string,
  content: string,
): Promise<void> {
  await resourcePut(
    SHARED_OWNER,
    guidePath(schoolId),
    content,
    "text/markdown",
  );
}
