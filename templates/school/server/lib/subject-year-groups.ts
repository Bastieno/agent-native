import { getDb, schema } from "../db/index.js";
import { and, eq } from "drizzle-orm";

/**
 * Which year groups take which subjects.
 *
 * A secondary school's subject list mixes junior and senior subjects — Basic
 * Science and Physics, Social Studies and Government — and nothing recorded
 * which was which. So the calendar's "no plan yet for JSS1" listed all 26,
 * Physics included, and the one useful thing on the line (which JSS1 subjects
 * still need planning) was lost in it.
 *
 * A subject is taken by a year group when any of these says so:
 *   - the subject's own year groups, set by the school;
 *   - a class exists for it in that year group;
 *   - it already has units written for that year group.
 * A subject none of these speaks for is "not stated" — never "missing".
 */

export function parseGradeLevelIds(json: string | null | undefined) {
  if (!json) return null;
  try {
    const list = JSON.parse(json);
    return Array.isArray(list)
      ? list.filter((x) => typeof x === "string")
      : null;
  } catch {
    return null;
  }
}

/**
 * Year groups given by id or by name ("JSS1"), resolved to this school's ids.
 * Names are what a person says; ids are what is stored.
 */
export async function resolveGradeLevelIds(
  input: string[],
  schoolId: string,
): Promise<string[]> {
  const levels = await getDb()
    .select({ id: schema.gradeLevels.id, name: schema.gradeLevels.name })
    .from(schema.gradeLevels)
    .where(eq(schema.gradeLevels.schoolId, schoolId));
  const ids: string[] = [];
  const unknown: string[] = [];
  for (const raw of input) {
    const value = raw.trim();
    const match =
      levels.find((l: any) => l.id === value) ??
      levels.find((l: any) => l.name.toLowerCase() === value.toLowerCase());
    if (match) {
      if (!ids.includes(match.id)) ids.push(match.id);
    } else unknown.push(value);
  }
  if (unknown.length) {
    throw new Error(
      `Unknown year group(s): ${unknown.join(", ")}. This school's year groups are ${levels
        .map((l: any) => l.name)
        .join(", ")}.`,
    );
  }
  return ids;
}

export type YearGroupSubjects = {
  /** Subjects this year group takes, by any of the three signals. */
  taken: Array<{ id: string; name: string }>;
  /** Active subjects nothing says anything about. */
  notStated: Array<{ id: string; name: string }>;
};

export async function subjectsForYearGroup(
  schoolId: string,
  gradeLevelId: string,
): Promise<YearGroupSubjects> {
  const db = getDb();
  const subjects = await db
    .select({
      id: schema.subjects.id,
      name: schema.subjects.name,
      position: schema.subjects.position,
      gradeLevelsJson: schema.subjects.gradeLevelsJson,
    })
    .from(schema.subjects)
    .where(
      and(
        eq(schema.subjects.schoolId, schoolId),
        eq(schema.subjects.status, "active"),
      ),
    );

  const classRows = await db
    .select({
      subjectId: schema.classes.subjectId,
      gradeLevelId: schema.classes.gradeLevelId,
    })
    .from(schema.classes)
    .where(eq(schema.classes.orgId, schoolId));
  const unitRows = await db
    .select({
      subjectId: schema.units.subjectId,
      gradeLevelId: schema.units.gradeLevelId,
      status: schema.units.status,
    })
    .from(schema.units)
    .where(eq(schema.units.orgId, schoolId));

  const hasClassHere = new Set(
    classRows
      .filter((c: any) => c.gradeLevelId === gradeLevelId)
      .map((c: any) => c.subjectId),
  );
  const hasUnitsHere = new Set(
    unitRows
      .filter(
        (u: any) => u.gradeLevelId === gradeLevelId && u.status !== "archived",
      )
      .map((u: any) => u.subjectId),
  );
  const hasAnySignal = new Set([
    ...classRows.map((c: any) => c.subjectId),
    ...unitRows
      .filter((u: any) => u.status !== "archived")
      .map((u: any) => u.subjectId),
  ]);

  const taken: YearGroupSubjects["taken"] = [];
  const notStated: YearGroupSubjects["notStated"] = [];
  for (const s of [...subjects].sort(
    (a: any, b: any) => a.position - b.position || a.name.localeCompare(b.name),
  )) {
    const stated = parseGradeLevelIds(s.gradeLevelsJson);
    if (
      stated?.includes(gradeLevelId) ||
      hasClassHere.has(s.id) ||
      hasUnitsHere.has(s.id)
    ) {
      taken.push({ id: s.id, name: s.name });
    } else if (!stated && !hasAnySignal.has(s.id)) {
      notStated.push({ id: s.id, name: s.name });
    }
  }
  return { taken, notStated };
}
