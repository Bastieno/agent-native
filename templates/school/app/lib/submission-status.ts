/**
 * A learner's own work, described in their words rather than the database's.
 *
 * "draft" is what the app stores once a learner has started and their answers
 * are saving; shown raw, it read like a teacher's unfinished draft. Every
 * learner-facing place that names where their work stands uses these.
 */
const SUBMISSION_STATUS_WORDS: Record<string, string> = {
  not_started: "Not started",
  draft: "Started",
  submitted: "Handed in",
  resubmission_requested: "Redo requested",
  graded: "Marked",
};

export function submissionStatusWord(status: string | null | undefined) {
  return SUBMISSION_STATUS_WORDS[status ?? "not_started"] ?? "Not started";
}
