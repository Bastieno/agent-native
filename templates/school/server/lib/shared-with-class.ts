import { inArray } from "drizzle-orm";
import { schema } from "../db/index.js";

/**
 * Work the class has been given: published, or published and since closed.
 *
 * Closing a paper stops new answers; it does not take the work back. Reads
 * that filtered on `status = "published"` alone dropped a paper the moment a
 * teacher closed it — from the learner's own list, the gradebook, report
 * cards, grouping and every analytic — so the most routine end to a piece of
 * work quietly deleted its marks from the record. Use this wherever the
 * question is "what has this class been set?". Keep `published` alone only
 * where the question is "what is still open?", such as work still owed.
 */
export const SHARED_STATUSES = ["published", "closed"] as const;

export function sharedWithClass() {
  return inArray(schema.assessments.status, [...SHARED_STATUSES]);
}
