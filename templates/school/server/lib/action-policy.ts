/**
 * Who may run each action.
 *
 * Every action in `actions/` MUST appear here. The guard denies anything it
 * does not recognise, and `assertPolicyCoversAllActions()` fails the build if
 * a new action is added without a decision being made about its audience.
 *
 * Roles come from `school_profiles.school_role`:
 *   school_admin        — runs the school
 *   subject_coordinator — owns a subject's curriculum across classes
 *   teacher             — teaches their own classes
 *   student             — a learner
 *
 * "everyone" means any signed-in member of the school, including students.
 * It does NOT mean unauthenticated.
 */

export type SchoolRole =
  | "school_admin"
  | "subject_coordinator"
  | "teacher"
  | "student";

export const ALL_ROLES: SchoolRole[] = [
  "school_admin",
  "subject_coordinator",
  "teacher",
  "student",
];

const ADMIN: SchoolRole[] = ["school_admin"];
const ADMIN_COORD: SchoolRole[] = ["school_admin", "subject_coordinator"];
const STAFF: SchoolRole[] = ["school_admin", "subject_coordinator", "teacher"];
const EVERYONE: SchoolRole[] = ALL_ROLES;
const STUDENT_ONLY: SchoolRole[] = ["student"];

/**
 * Framework actions this app deliberately does not use.
 *
 * These come from `packages/core`, not `actions/`, so they were never in the
 * list below and the guard denied them as unclassified — fail-safe, but by
 * accident rather than by decision. Naming them here records the decision and
 * lets the caller be told why.
 *
 * The school has its own visibility model: work belongs to a class, and who
 * may see it follows from role and enrolment, enforced in every action. The
 * framework's generic sharing lets one user hand a resource to another user
 * directly, which would route around that — a teacher could share a class's
 * assessment with someone who does not teach it, or with a pupil. If a school
 * needs to share something, it should happen through a school action that
 * knows what a class is.
 */
export const DENIED: Record<string, string> = {
  "share-resource":
    "Sharing is decided by role and class enrolment in this school, not per resource.",
  "unshare-resource":
    "Sharing is decided by role and class enrolment in this school, not per resource.",
  "list-resource-shares":
    "Sharing is decided by role and class enrolment in this school, not per resource.",
  "set-resource-visibility":
    "Visibility follows the class a resource belongs to and cannot be set directly.",
};

/**
 * Actions nobody may call over HTTP or as an agent tool — operator-only
 * maintenance run from the CLI (`agent-native action <name>`), where there is
 * no signed-in user and no role to check.
 */
export const OPERATOR_ONLY = new Set<string>([
  "seed-nerdc",
  "seed-waec",
  "seed-assessment-styles",
  "db-query",
  "run",
]);

/**
 * Actions a signed-in person may run *before* they belong to any school.
 *
 * Every other action requires a school role, and a school role only exists
 * once `setup-school` has created one — so without this exception the first
 * admin of a new school can never get started. The guard denied them, and the
 * only reason it was not noticed sooner is that every test school already had
 * its profile from before the guard existed.
 *
 * This is not a hole: `setup-school` itself refuses when the organisation
 * already has a school admin, so it can create a school where there is none
 * and cannot be used to seize one that exists.
 */
export const BOOTSTRAP = new Set<string>(["setup-school"]);

export const ACTION_POLICY: Record<string, SchoolRole[]> = {
  // ── Context & navigation ──────────────────────────────────────────────
  "view-screen": EVERYONE,
  navigate: EVERYONE,
  "refresh-list": EVERYONE,

  // ── School identity & configuration ───────────────────────────────────
  "setup-school": ADMIN,
  "get-school": EVERYONE,
  "get-school-stats": STAFF,
  "get-school-config": EVERYONE, // grading scale, labels — UI needs it
  "update-school-config": ADMIN,
  "set-school-logo": ADMIN,
  "get-custom-fields-schema": STAFF,
  "update-custom-fields-schema": ADMIN,
  "manage-grade-levels": ADMIN,
  "list-academic-years": STAFF,
  "create-academic-year": ADMIN,
  "list-terms": STAFF,
  // Which session and term it is — everyone needs the context.
  "get-current-term": EVERYONE,
  "create-term": ADMIN,
  "list-departments": STAFF,
  "create-department": ADMIN,
  "get-school-resource": STAFF,
  "update-school-resource": ADMIN,
  "draft-school-guide": ADMIN_COORD,
  "check-school-setup": ADMIN_COORD,
  // How a subject's questions are worded is a curriculum decision.
  "list-assessment-styles": STAFF,
  "get-assessment-style": STAFF,
  // Reading the school's own papers into a style is curriculum work.
  "start-style-import": ADMIN_COORD,
  "update-style-import": ADMIN_COORD,
  "commit-style-import": ADMIN_COORD,
  "discard-style-import": ADMIN_COORD,
  "list-style-imports": ADMIN_COORD,
  "set-subject-assessment-style": ADMIN_COORD,

  // ── Staff management ──────────────────────────────────────────────────
  "list-staff": ADMIN,
  "invite-staff": ADMIN,
  "cancel-staff-invite": ADMIN,
  "finalize-staff-invite": ADMIN,
  "update-staff-role": ADMIN,
  // Anyone may correct their own name; the handler decides whose.
  "update-person-name": EVERYONE,
  "suspend-staff": ADMIN,
  "reactivate-staff": ADMIN,
  "remove-staff": ADMIN,

  // ── Curriculum ────────────────────────────────────────────────────────
  "list-subjects": EVERYONE, // students see their subjects
  "get-subject": STAFF,
  "create-subject": ADMIN_COORD,
  "update-subject": ADMIN_COORD,
  "list-units": STAFF,
  "create-unit": ADMIN_COORD,
  "update-unit": ADMIN_COORD,
  "reorder-units": ADMIN_COORD,
  "list-learning-objectives": STAFF,
  "create-learning-objective": ADMIN_COORD,
  "update-learning-objective": ADMIN_COORD,
  "delete-learning-objective": ADMIN_COORD,
  "reorder-learning-objectives": ADMIN_COORD,
  "list-framework-objectives": STAFF,
  // A school's own syllabus, on its way in from their documents.
  "start-syllabus-import": ADMIN_COORD,
  "update-syllabus-import": ADMIN_COORD,
  "get-syllabus-import": ADMIN_COORD,
  "list-syllabus-imports": ADMIN_COORD,
  "commit-syllabus-import": ADMIN_COORD,
  "get-school-library": STAFF,
  "update-framework-objective": ADMIN_COORD,
  "delete-framework-objective": ADMIN_COORD,
  "create-framework-objective": ADMIN_COORD,
  "remove-framework": ADMIN_COORD,
  "discard-syllabus-import": ADMIN_COORD,
  // Drafting a curriculum is subject work, and the person who has taught
  // the subject for a decade is the teacher. Reading and writing a draft is
  // open to staff — scoped, for a teacher, to subjects they actually teach.
  // Committing it stays with the admin or the subject coordinator: that is
  // the moment it becomes the school's, and someone has to answer for it.
  "start-curriculum-draft": STAFF,
  "get-curriculum-draft": STAFF,
  "list-curriculum-drafts": STAFF,
  "discard-curriculum-draft": ADMIN_COORD,
  "update-curriculum-draft": STAFF,
  "commit-curriculum-draft": ADMIN_COORD,
  "generate-scheme-of-work": ADMIN_COORD,
  "get-curriculum-calendar": STAFF,
  "get-curriculum-coverage": ADMIN_COORD,
  "get-subject-curriculum": STAFF,
  "plan-lesson-notes": STAFF,

  // ── Students (staff-facing) ───────────────────────────────────────────
  "list-students": STAFF,
  "get-student": STAFF,
  "create-student": ADMIN,
  "update-student": ADMIN,
  "invite-student": ADMIN,
  "list-student-invites": ADMIN,
  "cancel-student-invite": ADMIN,
  "reactivate-student": ADMIN,
  // Categories must never be visible to the student they describe.
  "categorize-students": STAFF,
  "override-student-category": STAFF,

  // ── Classes ───────────────────────────────────────────────────────────
  "list-classes": STAFF,
  "get-class": STAFF,
  "create-class": ADMIN,
  "list-arms": STAFF,
  "create-arm": ADMIN,
  "update-arm": ADMIN,
  "set-learner-arm": ADMIN,
  "get-timetable": STAFF,
  "set-timetable-period": ADMIN,
  "remove-timetable-period": ADMIN,
  "copy-timetable": ADMIN,
  "update-class": STAFF,
  "list-class-students": STAFF,
  "enroll-student": ADMIN,
  "bulk-enroll-students": ADMIN,
  "unenroll-student": ADMIN,
  "add-teacher-to-class": ADMIN,
  "create-class-schedule": STAFF,
  "get-my-schedule": STAFF,
  "get-my-week": EVERYONE,

  // ── Lesson notes ──────────────────────────────────────────────────────
  "list-lesson-notes": STAFF,
  // Readiness across classes. An admin checking that teachers have prepared,
  // or a teacher checking their own — the action narrows to the caller's
  // classes, so the same question is safe to ask from either portal.
  "get-lesson-note-coverage": STAFF,
  "get-lesson-note": EVERYONE, // handler restricts students to their own finalized lessons
  "create-lesson-note": STAFF,
  "update-lesson-note": STAFF,
  "finalize-lesson-note": STAFF,
  // The way back from "ready". A teacher must be able to undo a marking made
  // on their behalf, or the privilege above is one-directional.
  "reopen-lesson-note": STAFF,
  "attach-lesson-resource": STAFF,
  "list-lesson-resources": EVERYONE,

  // ── Assessments ───────────────────────────────────────────────────────
  "list-assessments": STAFF,
  "get-assessment": STAFF,
  "create-assessment": STAFF,
  "create-activity": STAFF,
  "manage-activity-blueprints": STAFF,
  "update-assessment": STAFF,
  "publish-assessment": STAFF,
  // The way back. Whoever may share may unshare.
  "unshare-assessment": STAFF,
  // The way back from making something by mistake.
  "delete-activity": STAFF,
  // Printing what is stored, rather than retyping it into a document.
  "get-print-material": STAFF,
  // Who is missing a year group or one of the school's own student fields.
  "check-student-records": STAFF,
  // A learner's own practice: theirs to record, nobody's to inspect by name.
  "record-card-review": STUDENT_ONLY,
  "get-card-difficulty": STAFF,
  "close-assessment": STAFF,
  // Variants expose difficulty levels — staff only, always.
  "list-variants": STAFF,
  "create-variant": STAFF,
  "update-variant": STAFF,
  "delete-variant": STAFF,
  "assign-variants": STAFF,
  "create-rubric": STAFF,
  "update-rubric": STAFF,

  // ── Submissions & grading ─────────────────────────────────────────────
  "list-submissions": STAFF,
  "get-submission": STAFF,
  "grade-submission": STAFF,
  "bulk-grade-submissions": STAFF,
  "request-resubmission": STAFF,
  "get-gradebook": STAFF,
  "update-gradebook-entry": STAFF,
  "publish-grades": STAFF,
  "generate-report-card": STAFF,
  // Report cards as records: issued by staff, frozen at issue, readable by
  // the learner they belong to (the action scopes students to their own).
  "issue-report-card": ADMIN_COORD,
  "get-report-card": EVERYONE,
  // Marking open answers: gather the work, record a mark with its evidence,
  // then total it. Nothing here publishes — publish-grades still does that.
  "get-marking-queue": STAFF,
  "record-answer-mark": STAFF,
  "compile-submission-grade": STAFF,
  // Observations about speed and accuracy. Staff only, and never shown to a
  // learner — see the caution the action returns.
  "get-answer-insights": STAFF,
  // Staff only for now. When learners can photograph or scan their working,
  // they will need this for their own submission and it becomes EVERYONE with
  // a per-student scope check, like submit-work.
  "upload-image": STAFF,
  // Printable documents, composed on demand and held in the caller's own
  // application state.
  "create-document": STAFF,
  // Students act on their own work only; the actions resolve the student from
  // the session and reject any other studentId.
  "submit-work": STUDENT_ONLY,
  "start-activity": STUDENT_ONLY,
  "serve-question": STUDENT_ONLY,
  "answer-question": STUDENT_ONLY,
  "save-submission-draft": STUDENT_ONLY,

  // ── Analytics ─────────────────────────────────────────────────────────
  "get-my-analytics": STAFF,
  "list-my-students": STAFF,
  "get-class-performance": STAFF,
  "get-assessment-analytics": STAFF,
  "get-student-performance": STAFF,
  "identify-struggling-students": STAFF,
  "get-school-analytics": ADMIN_COORD,

  // ── Student-facing reads (own data only) ──────────────────────────────
  "get-my-classes": EVERYONE,
  "get-my-class": EVERYONE,
  "get-my-assessments": EVERYONE,
  "get-my-assessment": EVERYONE,
  "get-my-submission": EVERYONE,
  "get-my-grades": EVERYONE,
  "get-my-progress": EVERYONE,

  // ── Communication ─────────────────────────────────────────────────────
  "list-announcements": EVERYONE,
  "create-announcement": STAFF,
  "delete-announcement": ADMIN,
};

export function rolesFor(actionName: string): SchoolRole[] | null {
  if (OPERATOR_ONLY.has(actionName)) return [];
  return ACTION_POLICY[actionName] ?? null;
}

/** Why a deliberately unused framework action is refused, if it is one. */
export function denialReasonFor(actionName: string): string | null {
  return DENIED[actionName] ?? null;
}

/**
 * Fail loudly when an action has no policy entry, so adding an action forces a
 * decision about who may call it instead of silently inheriting access.
 */
export function findUnclassifiedActions(actionNames: string[]): string[] {
  return actionNames.filter(
    (name) =>
      !OPERATOR_ONLY.has(name) && !(name in ACTION_POLICY) && !(name in DENIED),
  );
}
