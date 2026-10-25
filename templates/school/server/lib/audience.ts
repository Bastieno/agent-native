/**
 * Who a piece of work was made for.
 *
 * Most work is for the whole class. A resource written to help one learner
 * catch up carries the ids of the learners it is for, and only they see it.
 * Everything a learner reads about their work goes through here, so a
 * classmate never sees what was made for someone else.
 */
export function audienceOf(row: {
  audienceStudentIdsJson?: string | null;
}): string[] | null {
  const raw = row.audienceStudentIdsJson;
  if (!raw) return null;
  try {
    const ids = JSON.parse(raw);
    return Array.isArray(ids) && ids.length > 0 ? ids.map(String) : null;
  } catch {
    // An unreadable list must hide the work, not show it to everyone.
    return [];
  }
}

export function isForLearner(
  row: { audienceStudentIdsJson?: string | null },
  studentId: string,
): boolean {
  const audience = audienceOf(row);
  return audience === null || audience.includes(studentId);
}
