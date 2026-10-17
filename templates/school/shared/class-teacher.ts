/**
 * A class with nobody teaching it yet.
 *
 * Schools plan the timetable before the staffing is settled — a new subject, a
 * teacher not yet hired, a replacement arriving after term starts. Requiring a
 * teacher to create a class meant naming one who wasn't, and a borrowed name
 * is worse than none: it shows up in that teacher's own portal and in "what do
 * I have today?", and nothing afterwards says it was a placeholder.
 *
 * The column itself stays required — making it optional would mean rebuilding
 * a table that live schools share — so an unassigned class carries this marker
 * instead. It matches no user, so name lookups come back empty and every list
 * can say "No teacher assigned" rather than showing a blank.
 */
export const UNASSIGNED_TEACHER_ID = "__unassigned__";

export function isUnassignedTeacher(
  teacherUserId: string | null | undefined,
): boolean {
  return !teacherUserId || teacherUserId === UNASSIGNED_TEACHER_ID;
}

/** What to show where a teacher's name would go. */
export const NO_TEACHER_LABEL = "No teacher assigned";
