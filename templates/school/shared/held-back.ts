/**
 * Material a teacher has scheduled for later.
 *
 * A reading or card deck carries no hand-in, so a learner has nothing to plan
 * around: listing next month's reading beside this week's only buries what
 * is open now. Work with an opening date is different, since a learner
 * should know a test is coming, so it stays listed and says when it opens.
 * The paper's own page still explains itself to anyone who follows a link.
 */
type Timed = {
  opensAt?: string | null;
  gradingMode?: string | null;
  responseMode?: string | null;
};

/** Something to read or practise with, as against something owed. */
export const isMaterial = (a: Timed) =>
  a.gradingMode === "none" && a.responseMode === "none";

/** Material whose opening date has not come. */
export function heldBack(a: Timed, now: Date = new Date()): boolean {
  if (!isMaterial(a) || !a.opensAt) return false;
  const opens = new Date(a.opensAt).getTime();
  return Number.isFinite(opens) && opens > now.getTime();
}
