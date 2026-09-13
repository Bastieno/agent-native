import {
  table,
  text,
  integer,
  now,
  ownableColumns,
  createSharesTable,
} from "@agent-native/core/db/schema";

// ─── Layer 1: School Identity ────────────────────────────────────────────────

export const schoolProfiles = table("school_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  schoolId: text("school_id").notNull(), // = orgId from framework
  schoolRole: text("school_role").notNull(), // school_admin | teacher | subject_coordinator | student
  subjectSpecialization: text("subject_specialization"), // for teachers
  status: text("status").notNull().default("active"), // active | suspended
  joinedAt: text("joined_at").notNull().default(now()),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
});

// ─── Layer 2: Academic Structure ─────────────────────────────────────────────

export const academicYears = table("academic_years", {
  id: text("id").primaryKey(),
  schoolId: text("school_id").notNull(),
  name: text("name").notNull(), // e.g. "2025-2026"
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  status: text("status").notNull().default("active"), // active | archived
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const terms = table("terms", {
  id: text("id").primaryKey(),
  academicYearId: text("academic_year_id").notNull(),
  schoolId: text("school_id").notNull(),
  name: text("name").notNull(), // "Term 1" | "Semester 1" | "Q1"
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  sequence: integer("sequence").notNull().default(1),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const departments = table("departments", {
  id: text("id").primaryKey(),
  schoolId: text("school_id").notNull(),
  name: text("name").notNull(),
  headTeacherUserId: text("head_teacher_user_id"),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const gradeLevels = table("grade_levels", {
  id: text("id").primaryKey(),
  schoolId: text("school_id").notNull(),
  name: text("name").notNull(), // "Grade 7" | "Form 2" | "Year 8"
  sequence: integer("sequence").notNull().default(1), // for ordering
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const subjects = table("subjects", {
  id: text("id").primaryKey(),
  schoolId: text("school_id").notNull(),
  departmentId: text("department_id"),
  name: text("name").notNull(),
  code: text("code"),
  color: text("color"),
  iconName: text("icon_name"),
  position: integer("position").notNull().default(0),
  status: text("status").notNull().default("active"), // active | archived
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const subjectShares = createSharesTable("subject_shares");

export const curriculumDrafts = table("curriculum_drafts", {
  id: text("id").primaryKey(),
  schoolId: text("school_id").notNull(),
  sessionTitle: text("session_title").notNull(),
  stateJson: text("state_json").notNull().default("{}"),
  status: text("status").notNull().default("in_progress"), // in_progress | committed
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

// ─── Layer 3: Curriculum Units & Objectives ──────────────────────────────────

export const units = table("units", {
  id: text("id").primaryKey(),
  subjectId: text("subject_id").notNull(),
  termId: text("term_id"),
  gradeLevelId: text("grade_level_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  weekStart: integer("week_start"),
  weekEnd: integer("week_end"),
  sequence: integer("sequence").notNull().default(1),
  // JSON array of { framework, code, description } — e.g. Common Core, WAEC, IGCSE
  standardsJson: text("standards_json").notNull().default("[]"),
  status: text("status").notNull().default("draft"), // draft | active | archived
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const learningObjectives = table("learning_objectives", {
  id: text("id").primaryKey(),
  unitId: text("unit_id").notNull(),
  description: text("description").notNull(),
  bloomsLevel: text("blooms_level"), // remember | understand | apply | analyze | evaluate | create
  sequence: integer("sequence").notNull().default(1),
  createdAt: text("created_at").notNull().default(now()),
});

// ─── Layer 4: Classes & Rosters ──────────────────────────────────────────────

export const classes = table("classes", {
  id: text("id").primaryKey(),
  subjectId: text("subject_id").notNull(),
  gradeLevelId: text("grade_level_id").notNull(),
  academicYearId: text("academic_year_id").notNull(),
  termId: text("term_id"),
  name: text("name").notNull(),
  primaryTeacherUserId: text("primary_teacher_user_id").notNull(),
  roomNumber: text("room_number"),
  capacity: integer("capacity"),
  status: text("status").notNull().default("active"), // active | archived
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const classTeachers = table("class_teachers", {
  id: text("id").primaryKey(),
  classId: text("class_id").notNull(),
  teacherUserId: text("teacher_user_id").notNull(),
  role: text("role").notNull().default("support"), // primary | support | observer
  createdAt: text("created_at").notNull().default(now()),
});

export const classEnrollments = table("class_enrollments", {
  id: text("id").primaryKey(),
  classId: text("class_id").notNull(),
  studentUserId: text("student_user_id").notNull(),
  enrolledAt: text("enrolled_at").notNull().default(now()),
  status: text("status").notNull().default("active"), // active | withdrawn | suspended
  createdAt: text("created_at").notNull().default(now()),
});

export const classSchedules = table("class_schedules", {
  id: text("id").primaryKey(),
  classId: text("class_id").notNull(),
  schoolId: text("school_id").notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 1=Monday … 5=Friday (6=Sat, 7=Sun if needed)
  periodNumber: integer("period_number"), // optional human-readable period label (1–8)
  startTime: text("start_time").notNull(), // "08:00" — 24-hour HH:MM
  endTime: text("end_time").notNull(), // "08:45"
  room: text("room"), // room override (falls back to class.roomNumber)
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

// ─── Layer 5: Content ────────────────────────────────────────────────────────

export const lessonNotes = table("lesson_notes", {
  id: text("id").primaryKey(),
  classId: text("class_id").notNull(),
  unitId: text("unit_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull().default(""),
  summary: text("summary"),
  lessonDate: text("lesson_date"),
  status: text("status").notNull().default("draft"), // draft | finalized
  customFieldsJson: text("custom_fields_json").notNull().default("{}"),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const lessonNoteShares = createSharesTable("lesson_note_shares");

export const lessonResources = table("lesson_resources", {
  id: text("id").primaryKey(),
  lessonNoteId: text("lesson_note_id").notNull(),
  type: text("type").notNull(), // file | url | video
  title: text("title").notNull(),
  url: text("url"),
  storageId: text("storage_id"),
  mimeType: text("mime_type"),
  uploadedAt: text("uploaded_at").notNull().default(now()),
  createdAt: text("created_at").notNull().default(now()),
});

// ─── Layer 6: Assessments ────────────────────────────────────────────────────

export const assessments = table("assessments", {
  id: text("id").primaryKey(),
  classId: text("class_id").notNull(),
  unitId: text("unit_id"),
  title: text("title").notNull(),
  description: text("description"),
  assessmentType: text("assessment_type").notNull().default("homework"), // homework | quiz | test | project | oral | practical | custom
  // How the work is shaped. Free text on purpose: the set of sensible formats
  // differs by subject, country and school, and belongs in school data rather
  // than in an enum here. e.g. "worksheet", "reading", "problem set",
  // "practical write-up", "recitation".
  format: text("format"),
  // How a learner responds: "typed", "upload", "none" (nothing to hand in).
  responseMode: text("response_mode"),
  // "rubric", "points", or "none" for practice that carries no marks.
  gradingMode: text("grading_mode"),
  opensAt: text("opens_at"),
  closesAt: text("closes_at"),
  durationMinutes: integer("duration_minutes"),
  // The learning objectives this activity is meant to move, carried through to
  // the rubric, the marking and the report comment.
  objectivesJson: text("objectives_json").notNull().default("[]"),
  // "linear" serves one question at a time, no going back. Unset = the whole
  // paper at once, as it has always behaved.
  navigation: text("navigation"),
  // Tell the learner right or wrong as they go. Off for marked work.
  instantFeedback: integer("instant_feedback", { mode: "boolean" })
    .notNull()
    .default(false),
  // Display structure: prose | questions | cards | table | steps | criteria.
  // Unset means prose. Distinct from `format`, which is the school's own word
  // for the material and stays free text.
  renderAs: text("render_as"),
  dueDate: text("due_date"),
  totalPoints: integer("total_points").notNull().default(100),
  status: text("status").notNull().default("draft"), // draft | published | closed
  customFieldsJson: text("custom_fields_json").notNull().default("{}"),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const assessmentShares = createSharesTable("assessment_shares");

export const assessmentVariants = table("assessment_variants", {
  id: text("id").primaryKey(),
  assessmentId: text("assessment_id").notNull(),
  difficulty: text("difficulty").notNull(), // foundational | developing | advanced | custom
  label: text("label").notNull(),
  content: text("content").notNull().default(""),
  // Structured body, shaped by the activity's renderAs. The markdown above is
  // kept as the fallback renderer and the print view.
  contentJson: text("content_json"),
  instructions: text("instructions"),
  totalPoints: integer("total_points").notNull().default(100),
  position: integer("position").notNull().default(0),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
});

export const rubrics = table("rubrics", {
  id: text("id").primaryKey(),
  assessmentId: text("assessment_id").notNull(),
  variantId: text("variant_id"), // null = applies to all variants
  title: text("title").notNull(),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const rubricCriteria = table("rubric_criteria", {
  id: text("id").primaryKey(),
  rubricId: text("rubric_id").notNull(),
  description: text("description").notNull(),
  maxPoints: integer("max_points").notNull().default(10),
  sequence: integer("sequence").notNull().default(1),
  createdAt: text("created_at").notNull().default(now()),
});

// ─── Layer 7: Student Performance & Categorization ───────────────────────────

export const students = table("students", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  schoolId: text("school_id").notNull(),
  gradeLevelId: text("grade_level_id"),
  admissionNumber: text("admission_number"),
  customFieldsJson: text("custom_fields_json").notNull().default("{}"),
  enrolledAt: text("enrolled_at").notNull().default(now()),
  status: text("status").notNull().default("active"), // active | graduated | withdrawn
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

export const studentCategories = table("student_categories", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull(),
  classId: text("class_id").notNull(),
  category: text("category").notNull(), // foundational | developing | advanced
  basis: text("basis").notNull().default("teacher_manual"), // agent_assessed | teacher_manual
  assessedAt: text("assessed_at").notNull().default(now()),
  assessedBy: text("assessed_by"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
});

export const studentAssessments = table("student_assessments", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull(),
  assessmentId: text("assessment_id").notNull(),
  variantId: text("variant_id"),
  assignedAt: text("assigned_at").notNull().default(now()),
  assignedBy: text("assigned_by"),
  createdAt: text("created_at").notNull().default(now()),
});

// ─── Layer 8: Submissions & Grading ─────────────────────────────────────────

export const submissions = table("submissions", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull(),
  assessmentId: text("assessment_id").notNull(),
  variantId: text("variant_id"),
  content: text("content").notNull().default(""),
  attachmentsJson: text("attachments_json").notNull().default("[]"),
  status: text("status").notNull().default("not_started"), // not_started | draft | submitted | resubmission_requested | graded
  // Set the first time a learner opens a timed activity; their own deadline is
  // startedAt + the activity's durationMinutes.
  startedAt: text("started_at"),
  submittedAt: text("submitted_at"),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

/**
 * One learner's answer to one question, with the clock.
 *
 * Kept apart from `submissions.content` because the interesting data is the
 * timing: how long each question took, and whether the clock ran out. A mark
 * says a learner got it wrong; this says whether they were guessing quickly or
 * stuck for four minutes, which is a different conversation with them.
 */
export const questionResponses = table("question_responses", {
  id: text("id").primaryKey(),
  submissionId: text("submission_id").notNull(),
  assessmentId: text("assessment_id").notNull(),
  studentId: text("student_id").notNull(),
  blockIndex: integer("block_index").notNull(),
  answer: text("answer"),
  /** When this question was put in front of them — the server's clock. */
  servedAt: text("served_at"),
  answeredAt: text("answered_at"),
  elapsedMs: integer("elapsed_ms"),
  timedOut: integer("timed_out", { mode: "boolean" }).notNull().default(false),
  /** Null where the question needs a person to read it. */
  isCorrect: integer("is_correct", { mode: "boolean" }),
  awardedPoints: integer("awarded_points"),
  /**
   * Handwritten working as strokes — see shared/drawing.ts. Stored beside the
   * typed answer, because "show your working" is a second answer, not an
   * alternative to the first.
   */
  drawingJson: text("drawing_json"),
  /** What the learner is told about this answer. */
  feedback: text("feedback"),
  /**
   * Which of the learner's own words earned each mark, as
   * [{ criterion, points, quote }]. A teacher verifying a mark should be able
   * to see the evidence rather than re-read and re-decide.
   */
  evidenceJson: text("evidence_json"),
  /** high | medium | low — how sure the marker was. */
  confidence: text("confidence"),
  markedBy: text("marked_by"),
  markedAt: text("marked_at"),
  /** Put in front of a person before anything is published. */
  needsReview: integer("needs_review", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
});

/**
 * A report card as it was issued.
 *
 * Everything a school app usually gets wrong about report cards comes from
 * treating them as a query. A Term 1 report reopened in Term 3 must show Term
 * 1's marks — not marks recomputed from data that has moved on, and not a
 * comment reworded since. So the figures are frozen in `snapshotJson` and the
 * words are frozen in `documentMarkdown`: reprinting renders what was stored,
 * which is the only way a reprint can be trusted to match the copy a parent
 * already holds.
 */
export const reportCards = table("report_cards", {
  id: text("id").primaryKey(),
  orgId: text("org_id").notNull(),
  studentId: text("student_id").notNull(),
  termId: text("term_id"),
  academicYearId: text("academic_year_id"),
  /** Human reference a parent can quote back to the school. */
  serial: text("serial"),
  /** The figures as they stood, for machines. */
  snapshotJson: text("snapshot_json").notNull().default("{}"),
  /** The document as it read, for people. Reprinting renders exactly this. */
  documentMarkdown: text("document_markdown").notNull().default(""),
  status: text("status").notNull().default("issued"),
  issuedAt: text("issued_at").notNull().default(now()),
  issuedBy: text("issued_by"),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
});

export const submissionShares = createSharesTable("submission_shares");

export const grades = table("grades", {
  id: text("id").primaryKey(),
  submissionId: text("submission_id").notNull(),
  studentId: text("student_id").notNull(),
  assessmentId: text("assessment_id").notNull(),
  variantId: text("variant_id"),
  score: integer("score"),
  maxScore: integer("max_score").notNull().default(100),
  percentage: text("percentage"),
  letterGrade: text("letter_grade"),
  feedback: text("feedback"),
  rubricScoresJson: text("rubric_scores_json").notNull().default("{}"),
  gradedBy: text("graded_by"),
  gradedAt: text("graded_at"),
  isPublished: integer("is_published", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
});

export const gradebookEntries = table("gradebook_entries", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull(),
  classId: text("class_id").notNull(),
  termId: text("term_id").notNull(),
  computedScore: text("computed_score"),
  letterGrade: text("letter_grade"),
  isPublished: integer("is_published", { mode: "boolean" })
    .notNull()
    .default(false),
  publishedAt: text("published_at"),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});

// ─── Standards Library ───────────────────────────────────────────────────────
// Built-in reference tables for curriculum frameworks (WAEC, Common Core, etc.)
// These are not user-owned — orgId = null means available to all schools.

export const curriculumFrameworks = table("curriculum_frameworks", {
  id: text("id").primaryKey(),
  name: text("name").notNull(), // "WAEC", "Common Core", "Cambridge IGCSE"
  subject: text("subject"), // "Mathematics", NULL = cross-subject
  gradeRange: text("grade_range"), // "SS1-SS3", "Grade 6-8"
  version: text("version"), // "2024-2025 syllabus"
  sourceUrl: text("source_url"),
  orgId: text("org_id"), // NULL = built-in global; orgId = school-custom framework
  createdAt: text("created_at").notNull().default(now()),
});

export const frameworkObjectives = table("framework_objectives", {
  id: text("id").primaryKey(),
  frameworkId: text("framework_id").notNull(),
  code: text("code").notNull(), // "MATH-ALG-1", "8.EE.C.7"
  strand: text("strand"), // "Algebra", "Number and Numeration"
  subStrand: text("sub_strand"), // "Linear Equations"
  subject: text("subject"), // "Mathematics"
  description: text("description").notNull(),
  gradeLevel: text("grade_level"), // "SS1-SS3", "Grade 8"
  sequence: integer("sequence").notNull().default(1),
  createdAt: text("created_at").notNull().default(now()),
});

// ─── Layer 9: Communication ──────────────────────────────────────────────────

export const announcements = table("announcements", {
  id: text("id").primaryKey(),
  schoolId: text("school_id").notNull(),
  scope: text("scope").notNull().default("school"), // school | class
  classId: text("class_id"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  publishedAt: text("published_at"),
  authorUserId: text("author_user_id").notNull(),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
});
