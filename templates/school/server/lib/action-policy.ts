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
 * Actions nobody may call over HTTP or as an agent tool — operator-only
 * maintenance run from the CLI (`agent-native action <name>`), where there is
 * no signed-in user and no role to check.
 */
export const OPERATOR_ONLY = new Set<string>([
  "seed-nerdc",
  "seed-waec",
  "db-query",
  "run",
]);

export const ACTION_POLICY: Record<string, SchoolRole[]> = {
  // ── Context & navigation ──────────────────────────────────────────────
  "view-screen": EVERYONE,
  navigate: EVERYONE,
  "refresh-list": EVERYONE,

  // ── School identity & configuration ───────────────────────────────────
  "setup-school": ADMIN,
  "get-school": EVERYONE,
  "get-school-config": EVERYONE, // grading scale, labels — UI needs it
  "update-school-config": ADMIN,
  "get-custom-fields-schema": STAFF,
  "update-custom-fields-schema": ADMIN,
  "manage-grade-levels": ADMIN,
  "list-academic-years": STAFF,
  "create-academic-year": ADMIN,
  "list-terms": STAFF,
  "create-term": ADMIN,
  "list-departments": STAFF,
  "create-department": ADMIN,
  "get-school-resource": STAFF,
  "update-school-resource": ADMIN,

  // ── Staff management ──────────────────────────────────────────────────
  "list-staff": ADMIN,
  "invite-staff": ADMIN,
  "cancel-staff-invite": ADMIN,
  "finalize-staff-invite": ADMIN,
  "update-staff-role": ADMIN,
  "suspend-staff": ADMIN,
  "reactivate-staff": ADMIN,
  "remove-staff": ADMIN,

  // ── Curriculum ────────────────────────────────────────────────────────
  "list-subjects": EVERYONE, // students see their subjects
  "create-subject": ADMIN_COORD,
  "update-subject": ADMIN_COORD,
  "list-units": STAFF,
  "create-unit": ADMIN_COORD,
  "update-unit": ADMIN_COORD,
  "reorder-units": ADMIN_COORD,
  "list-learning-objectives": STAFF,
  "create-learning-objective": ADMIN_COORD,
  "list-framework-objectives": STAFF,
  "start-curriculum-draft": ADMIN_COORD,
  "get-curriculum-draft": ADMIN_COORD,
  "update-curriculum-draft": ADMIN_COORD,
  "commit-curriculum-draft": ADMIN_COORD,

  // ── Students (staff-facing) ───────────────────────────────────────────
  "list-students": STAFF,
  "get-student": STAFF,
  "create-student": ADMIN,
  "update-student": ADMIN,
  "invite-student": ADMIN,
  "cancel-student-invite": ADMIN,
  "reactivate-student": ADMIN,
  // Categories must never be visible to the student they describe.
  "categorize-students": STAFF,
  "override-student-category": STAFF,

  // ── Classes ───────────────────────────────────────────────────────────
  "list-classes": STAFF,
  "create-class": ADMIN,
  "update-class": STAFF,
  "list-class-students": STAFF,
  "enroll-student": ADMIN,
  "bulk-enroll-students": ADMIN,
  "unenroll-student": ADMIN,
  "add-teacher-to-class": ADMIN,
  "create-class-schedule": STAFF,
  "get-my-schedule": STAFF,

  // ── Lesson notes ──────────────────────────────────────────────────────
  "list-lesson-notes": STAFF,
  "get-lesson-note": EVERYONE, // handler restricts students to their own finalized lessons
  "create-lesson-note": STAFF,
  "update-lesson-note": STAFF,
  "finalize-lesson-note": STAFF,
  "attach-lesson-resource": STAFF,
  "list-lesson-resources": EVERYONE,

  // ── Assessments ───────────────────────────────────────────────────────
  "list-assessments": STAFF,
  "create-assessment": STAFF,
  "update-assessment": STAFF,
  "publish-assessment": STAFF,
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
  // Students act on their own work only; the actions resolve the student from
  // the session and reject any other studentId.
  "submit-work": STUDENT_ONLY,
  "save-submission-draft": STUDENT_ONLY,

  // ── Analytics ─────────────────────────────────────────────────────────
  "get-class-performance": STAFF,
  "get-assessment-analytics": STAFF,
  "get-student-performance": STAFF,
  "identify-struggling-students": STAFF,
  "get-school-analytics": ADMIN_COORD,

  // ── Student-facing reads (own data only) ──────────────────────────────
  "get-my-classes": EVERYONE,
  "get-my-assessments": EVERYONE,
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

/**
 * Fail loudly when an action has no policy entry, so adding an action forces a
 * decision about who may call it instead of silently inheriting access.
 */
export function findUnclassifiedActions(actionNames: string[]): string[] {
  return actionNames.filter(
    (name) => !OPERATOR_ONLY.has(name) && !(name in ACTION_POLICY),
  );
}
