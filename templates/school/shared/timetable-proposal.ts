/** The sentence said when a draft no longer fits the timetable it was made for. */
export const PROPOSAL_STALE =
  "The timetable changed after this was proposed — generate again.";

/**
 * Why a draft can no longer be accepted, or null when it still can: the
 * term's lessons are not what they were when it was drafted, or a class it
 * places lessons for is no longer active. Pure.
 */
export function staleReason(
  proposal: { baseFingerprint: string; classIds: string[] },
  activeClassIds: Iterable<string>,
  fingerprint: string,
): string | null {
  if (proposal.baseFingerprint !== fingerprint) return PROPOSAL_STALE;
  const active = new Set(activeClassIds);
  return proposal.classIds.every((id) => active.has(id))
    ? null
    : PROPOSAL_STALE;
}
