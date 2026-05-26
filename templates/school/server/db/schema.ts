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
  submittedAt: text("submitted_at"),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
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
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
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
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
  publishedAt: text("published_at"),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
  ...ownableColumns(),
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
