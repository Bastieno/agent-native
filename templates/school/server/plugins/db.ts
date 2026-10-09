import { runMigrations } from "@agent-native/core/db";

export default runMigrations(
  [
    {
      version: 1,
      sql: `CREATE TABLE IF NOT EXISTS school_profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        school_id TEXT NOT NULL,
        school_role TEXT NOT NULL,
        subject_specialization TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        joined_at TEXT NOT NULL DEFAULT (datetime('now')),
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 2,
      sql: `CREATE TABLE IF NOT EXISTS academic_years (
        id TEXT PRIMARY KEY,
        school_id TEXT NOT NULL,
        name TEXT NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 3,
      sql: `CREATE TABLE IF NOT EXISTS terms (
        id TEXT PRIMARY KEY,
        academic_year_id TEXT NOT NULL,
        school_id TEXT NOT NULL,
        name TEXT NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        sequence INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 4,
      sql: `CREATE TABLE IF NOT EXISTS departments (
        id TEXT PRIMARY KEY,
        school_id TEXT NOT NULL,
        name TEXT NOT NULL,
        head_teacher_user_id TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 5,
      sql: `CREATE TABLE IF NOT EXISTS grade_levels (
        id TEXT PRIMARY KEY,
        school_id TEXT NOT NULL,
        name TEXT NOT NULL,
        sequence INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 6,
      sql: `CREATE TABLE IF NOT EXISTS subjects (
        id TEXT PRIMARY KEY,
        school_id TEXT NOT NULL,
        department_id TEXT,
        name TEXT NOT NULL,
        code TEXT,
        color TEXT,
        icon_name TEXT,
        position INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 7,
      sql: `CREATE TABLE IF NOT EXISTS subject_shares (
        id TEXT PRIMARY KEY,
        resource_id TEXT NOT NULL,
        principal_type TEXT NOT NULL,
        principal_id TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'viewer',
        granted_by TEXT,
        granted_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 8,
      sql: `CREATE TABLE IF NOT EXISTS curriculum_drafts (
        id TEXT PRIMARY KEY,
        school_id TEXT NOT NULL,
        session_title TEXT NOT NULL,
        state_json TEXT NOT NULL DEFAULT '{}',
        status TEXT NOT NULL DEFAULT 'in_progress',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 9,
      sql: `CREATE TABLE IF NOT EXISTS units (
        id TEXT PRIMARY KEY,
        subject_id TEXT NOT NULL,
        term_id TEXT,
        grade_level_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        week_start INTEGER,
        week_end INTEGER,
        sequence INTEGER NOT NULL DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'draft',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 10,
      sql: `CREATE TABLE IF NOT EXISTS learning_objectives (
        id TEXT PRIMARY KEY,
        unit_id TEXT NOT NULL,
        description TEXT NOT NULL,
        blooms_level TEXT,
        sequence INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 11,
      sql: `CREATE TABLE IF NOT EXISTS classes (
        id TEXT PRIMARY KEY,
        subject_id TEXT NOT NULL,
        grade_level_id TEXT NOT NULL,
        academic_year_id TEXT NOT NULL,
        term_id TEXT,
        name TEXT NOT NULL,
        primary_teacher_user_id TEXT NOT NULL,
        room_number TEXT,
        capacity INTEGER,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 12,
      sql: `CREATE TABLE IF NOT EXISTS class_teachers (
        id TEXT PRIMARY KEY,
        class_id TEXT NOT NULL,
        teacher_user_id TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'support',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 13,
      sql: `CREATE TABLE IF NOT EXISTS class_enrollments (
        id TEXT PRIMARY KEY,
        class_id TEXT NOT NULL,
        student_user_id TEXT NOT NULL,
        enrolled_at TEXT NOT NULL DEFAULT (datetime('now')),
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 14,
      sql: `CREATE TABLE IF NOT EXISTS lesson_notes (
        id TEXT PRIMARY KEY,
        class_id TEXT NOT NULL,
        unit_id TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL DEFAULT '',
        summary TEXT,
        lesson_date TEXT,
        status TEXT NOT NULL DEFAULT 'draft',
        custom_fields_json TEXT NOT NULL DEFAULT '{}',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 15,
      sql: `CREATE TABLE IF NOT EXISTS lesson_note_shares (
        id TEXT PRIMARY KEY,
        resource_id TEXT NOT NULL,
        principal_type TEXT NOT NULL,
        principal_id TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'viewer',
        granted_by TEXT,
        granted_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 16,
      sql: `CREATE TABLE IF NOT EXISTS lesson_resources (
        id TEXT PRIMARY KEY,
        lesson_note_id TEXT NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        url TEXT,
        storage_id TEXT,
        mime_type TEXT,
        uploaded_at TEXT NOT NULL DEFAULT (datetime('now')),
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 17,
      sql: `CREATE TABLE IF NOT EXISTS assessments (
        id TEXT PRIMARY KEY,
        class_id TEXT NOT NULL,
        unit_id TEXT,
        title TEXT NOT NULL,
        description TEXT,
        assessment_type TEXT NOT NULL DEFAULT 'homework',
        due_date TEXT,
        total_points INTEGER NOT NULL DEFAULT 100,
        status TEXT NOT NULL DEFAULT 'draft',
        custom_fields_json TEXT NOT NULL DEFAULT '{}',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 18,
      sql: `CREATE TABLE IF NOT EXISTS assessment_shares (
        id TEXT PRIMARY KEY,
        resource_id TEXT NOT NULL,
        principal_type TEXT NOT NULL,
        principal_id TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'viewer',
        granted_by TEXT,
        granted_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 19,
      sql: `CREATE TABLE IF NOT EXISTS assessment_variants (
        id TEXT PRIMARY KEY,
        assessment_id TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        label TEXT NOT NULL,
        content TEXT NOT NULL DEFAULT '',
        instructions TEXT,
        total_points INTEGER NOT NULL DEFAULT 100,
        position INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 20,
      sql: `CREATE TABLE IF NOT EXISTS rubrics (
        id TEXT PRIMARY KEY,
        assessment_id TEXT NOT NULL,
        variant_id TEXT,
        title TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 21,
      sql: `CREATE TABLE IF NOT EXISTS rubric_criteria (
        id TEXT PRIMARY KEY,
        rubric_id TEXT NOT NULL,
        description TEXT NOT NULL,
        max_points INTEGER NOT NULL DEFAULT 10,
        sequence INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 22,
      sql: `CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        school_id TEXT NOT NULL,
        grade_level_id TEXT,
        admission_number TEXT,
        custom_fields_json TEXT NOT NULL DEFAULT '{}',
        enrolled_at TEXT NOT NULL DEFAULT (datetime('now')),
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 23,
      sql: `CREATE TABLE IF NOT EXISTS student_categories (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        class_id TEXT NOT NULL,
        category TEXT NOT NULL,
        basis TEXT NOT NULL DEFAULT 'teacher_manual',
        assessed_at TEXT NOT NULL DEFAULT (datetime('now')),
        assessed_by TEXT,
        notes TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 24,
      sql: `CREATE TABLE IF NOT EXISTS student_assessments (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        assessment_id TEXT NOT NULL,
        variant_id TEXT,
        assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
        assigned_by TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 25,
      sql: `CREATE TABLE IF NOT EXISTS submissions (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        assessment_id TEXT NOT NULL,
        variant_id TEXT,
        content TEXT NOT NULL DEFAULT '',
        attachments_json TEXT NOT NULL DEFAULT '[]',
        status TEXT NOT NULL DEFAULT 'not_started',
        submitted_at TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 26,
      sql: `CREATE TABLE IF NOT EXISTS submission_shares (
        id TEXT PRIMARY KEY,
        resource_id TEXT NOT NULL,
        principal_type TEXT NOT NULL,
        principal_id TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'viewer',
        granted_by TEXT,
        granted_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 27,
      sql: `CREATE TABLE IF NOT EXISTS grades (
        id TEXT PRIMARY KEY,
        submission_id TEXT NOT NULL,
        student_id TEXT NOT NULL,
        assessment_id TEXT NOT NULL,
        variant_id TEXT,
        score INTEGER,
        max_score INTEGER NOT NULL DEFAULT 100,
        percentage TEXT,
        letter_grade TEXT,
        feedback TEXT,
        rubric_scores_json TEXT NOT NULL DEFAULT '{}',
        graded_by TEXT,
        graded_at TEXT,
        is_published INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 28,
      sql: `CREATE TABLE IF NOT EXISTS gradebook_entries (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        class_id TEXT NOT NULL,
        term_id TEXT NOT NULL,
        computed_score TEXT,
        letter_grade TEXT,
        is_published INTEGER NOT NULL DEFAULT 0,
        published_at TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 29,
      sql: `CREATE TABLE IF NOT EXISTS announcements (
        id TEXT PRIMARY KEY,
        school_id TEXT NOT NULL,
        scope TEXT NOT NULL DEFAULT 'school',
        class_id TEXT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        published_at TEXT,
        author_user_id TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 30,
      sql: `ALTER TABLE units ADD COLUMN standards_json TEXT NOT NULL DEFAULT '[]'`,
    },
    {
      version: 31,
      sql: `CREATE TABLE IF NOT EXISTS class_schedules (
        id TEXT PRIMARY KEY,
        class_id TEXT NOT NULL,
        school_id TEXT NOT NULL,
        day_of_week INTEGER NOT NULL,
        period_number INTEGER,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        room TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    {
      version: 32,
      sql: `CREATE TABLE IF NOT EXISTS curriculum_frameworks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        subject TEXT,
        grade_range TEXT,
        version TEXT,
        source_url TEXT,
        org_id TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 33,
      sql: `CREATE TABLE IF NOT EXISTS framework_objectives (
        id TEXT PRIMARY KEY,
        framework_id TEXT NOT NULL,
        code TEXT NOT NULL,
        strand TEXT,
        sub_strand TEXT,
        subject TEXT,
        description TEXT NOT NULL,
        grade_level TEXT,
        sequence INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    // Activities: how the work is shaped, when it runs, and how it is marked.
    // All free text — a school names its own formats ("WAEC practical
    // write-up", "recitation") without a code change.
    {
      version: 34,
      sql: `ALTER TABLE assessments ADD COLUMN format TEXT`,
    },
    {
      version: 35,
      sql: `ALTER TABLE assessments ADD COLUMN response_mode TEXT`,
    },
    {
      version: 36,
      sql: `ALTER TABLE assessments ADD COLUMN grading_mode TEXT`,
    },
    {
      version: 37,
      sql: `ALTER TABLE assessments ADD COLUMN opens_at TEXT`,
    },
    {
      version: 38,
      sql: `ALTER TABLE assessments ADD COLUMN closes_at TEXT`,
    },
    {
      version: 39,
      sql: `ALTER TABLE assessments ADD COLUMN duration_minutes INTEGER`,
    },
    {
      version: 40,
      sql: `ALTER TABLE assessments ADD COLUMN objectives_json TEXT NOT NULL DEFAULT '[]'`,
    },
    // When this learner started. A timed activity's clock is per-learner —
    // twenty students open the same paper at different moments — so the
    // deadline is derived from here, not from the activity.
    {
      version: 41,
      sql: `ALTER TABLE submissions ADD COLUMN started_at TEXT`,
    },
    // How the work is shaped on screen. `format` stays the school's own word
    // ("vocabulary drill"); `render_as` is the structure it displays as
    // ("cards"), from a small closed set. The markdown in
    // assessment_variants.content is kept as the fallback and the print view,
    // so content_json is strictly an addition.
    {
      version: 42,
      sql: `ALTER TABLE assessments ADD COLUMN render_as TEXT`,
    },
    {
      version: 43,
      sql: `ALTER TABLE assessment_variants ADD COLUMN content_json TEXT`,
    },
    // How a paper is sat: "linear" serves one question at a time and does not
    // let a learner go back, which is what makes a per-question time limit
    // mean anything. Unset behaves as it always did — the whole paper at once.
    {
      version: 44,
      sql: `ALTER TABLE assessments ADD COLUMN navigation TEXT`,
    },
    // Whether a learner is told right or wrong as they go. Off for anything
    // that carries marks, on for practice — the teacher decides per activity.
    {
      version: 45,
      sql: `ALTER TABLE assessments ADD COLUMN instant_feedback INTEGER NOT NULL DEFAULT 0`,
    },
    // One row per learner per question: what they answered, when it was put in
    // front of them, and how long they took. The timing is the point — a mark
    // alone cannot tell a teacher the difference between fluent and guessing.
    {
      version: 46,
      sql: `CREATE TABLE IF NOT EXISTS question_responses (
        id TEXT PRIMARY KEY,
        submission_id TEXT NOT NULL,
        assessment_id TEXT NOT NULL,
        student_id TEXT NOT NULL,
        block_index INTEGER NOT NULL,
        answer TEXT,
        served_at TEXT,
        answered_at TEXT,
        elapsed_ms INTEGER,
        timed_out INTEGER NOT NULL DEFAULT 0,
        is_correct INTEGER,
        awarded_points INTEGER,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 47,
      sql: `CREATE UNIQUE INDEX IF NOT EXISTS question_responses_unique
        ON question_responses (submission_id, block_index)`,
    },
    // Marking an open answer: what it earned, why, and how sure the marker
    // was. The evidence is the point — a teacher checking twenty scripts needs
    // to see which words earned each mark, not just a number to re-derive.
    {
      version: 48,
      sql: `ALTER TABLE question_responses ADD COLUMN feedback TEXT`,
    },
    {
      version: 49,
      sql: `ALTER TABLE question_responses ADD COLUMN evidence_json TEXT`,
    },
    {
      version: 50,
      sql: `ALTER TABLE question_responses ADD COLUMN confidence TEXT`,
    },
    {
      version: 51,
      sql: `ALTER TABLE question_responses ADD COLUMN marked_by TEXT`,
    },
    {
      version: 52,
      sql: `ALTER TABLE question_responses ADD COLUMN marked_at TEXT`,
    },
    {
      version: 53,
      sql: `ALTER TABLE question_responses ADD COLUMN needs_review INTEGER NOT NULL DEFAULT 0`,
    },
    // Handwritten working, as strokes. Beside the typed answer rather than
    // instead of it: a maths question wants the method and the value.
    {
      version: 54,
      sql: `ALTER TABLE question_responses ADD COLUMN drawing_json TEXT`,
    },
    // A report card is a document of record, not a view of live data. Parents
    // keep it, schools archive it, and it can be disputed — so what it said on
    // the day it was issued is stored, marks and wording both, and reprinting
    // it renders the stored words rather than recomputing them.
    {
      version: 55,
      sql: `CREATE TABLE IF NOT EXISTS report_cards (
        id TEXT PRIMARY KEY,
        org_id TEXT NOT NULL,
        student_id TEXT NOT NULL,
        term_id TEXT,
        academic_year_id TEXT,
        serial TEXT,
        snapshot_json TEXT NOT NULL DEFAULT '{}',
        document_markdown TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'issued',
        issued_at TEXT NOT NULL DEFAULT (datetime('now')),
        issued_by TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 56,
      sql: `CREATE INDEX IF NOT EXISTS report_cards_student
        ON report_cards (org_id, student_id, term_id)`,
    },
    // Which year groups take a subject. Null means the school has not said,
    // which is different from "none" — a subject is not missing from a year
    // group's plan until we know that year group takes it.
    {
      version: 57,
      sql: `ALTER TABLE subjects ADD COLUMN grade_levels_json TEXT`,
    },
    // A unit's week-by-week plan: which objectives each week carries, and
    // what a week is for when it carries none — a mid-term test, revision,
    // a practical. Without it a committed unit knows only its first and last
    // week, and the pacing an agent worked out with the school was discarded
    // the moment it was committed.
    {
      version: 58,
      sql: `ALTER TABLE units ADD COLUMN week_plan_json TEXT`,
    },
    // The shipped NERDC and WAEC libraries are samples — a couple of dozen
    // objectives per subject, enough to show the shape. An agent that treats
    // one as the whole syllabus plans a thin year from it, which is exactly
    // what happened to JSS1 Basic Science.
    {
      version: 59,
      sql: `ALTER TABLE curriculum_frameworks ADD COLUMN is_sample INTEGER NOT NULL DEFAULT 0`,
    },
    {
      version: 60,
      sql: `UPDATE curriculum_frameworks SET is_sample = 1 WHERE org_id IS NULL`,
    },
    // A school's own syllabus, on its way in from whatever they had — a PDF,
    // a scan, photographs of paper. Extraction is not reliable enough to write
    // straight into the library, so it lands here first and is reviewed.
    {
      version: 61,
      sql: `CREATE TABLE IF NOT EXISTS syllabus_imports (
        id TEXT PRIMARY KEY,
        school_id TEXT NOT NULL,
        title TEXT NOT NULL,
        source TEXT,
        state_json TEXT NOT NULL DEFAULT '{}',
        status TEXT NOT NULL DEFAULT 'in_progress',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'org'
      )`,
    },
    // Where an objective came from, and whether its code is the syllabus's own
    // or one this app made up. A teacher asking "where does this come from?"
    // deserves an answer, and a generated code must never be cited as official.
    {
      version: 62,
      sql: `ALTER TABLE framework_objectives ADD COLUMN source_note TEXT`,
    },
    {
      version: 63,
      sql: `ALTER TABLE framework_objectives ADD COLUMN code_generated INTEGER NOT NULL DEFAULT 0`,
    },
    // Which import a school's library entry came from, so removing it can
    // hand the import back for correcting rather than losing the reading.
    {
      version: 64,
      sql: `ALTER TABLE curriculum_frameworks ADD COLUMN import_id TEXT`,
    },
    // An admin may write, edit and finalize a lesson note on a teacher's
    // behalf — covering an absence, or setting a subject up before its
    // teacher exists. The privilege is real, so it is attributed: a teacher
    // opening a note they did not write can see who did.
    {
      version: 65,
      sql: `ALTER TABLE lesson_notes ADD COLUMN finalized_by_user_id TEXT`,
    },
    {
      version: 66,
      sql: `ALTER TABLE lesson_notes ADD COLUMN finalized_at TEXT`,
    },
    {
      version: 67,
      sql: `ALTER TABLE lesson_notes ADD COLUMN last_edited_by_user_id TEXT`,
    },
    // Marking a note ready can be wrong — an admin who moved too early, a
    // teacher who was not finished. Reopening it records who did that and
    // keeps the earlier marking, so the disagreement is legible instead of
    // silently overwritten.
    {
      version: 68,
      sql: `ALTER TABLE lesson_notes ADD COLUMN reopened_by_user_id TEXT`,
    },
    {
      version: 69,
      sql: `ALTER TABLE lesson_notes ADD COLUMN reopened_at TEXT`,
    },
    // Which week's lesson an activity belongs to, so a learner can be shown
    // "this week: read this, practise these, hand this in on Friday".
    {
      version: 70,
      sql: `ALTER TABLE assessments ADD COLUMN lesson_note_id TEXT`,
    },
    // How a subject's questions are usually worded — WAEC, KCSE, a school's
    // own habits. Data, never code: an app that knows no exam board by name
    // works the same in Lagos and in Nairobi.
    {
      version: 71,
      sql: `CREATE TABLE IF NOT EXISTS assessment_styles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        subject TEXT,
        region TEXT,
        org_id TEXT,
        is_sample INTEGER NOT NULL DEFAULT 0,
        item_style_json TEXT NOT NULL DEFAULT '{}',
        paper_shape_json TEXT,
        derived_from TEXT,
        questions_analysed INTEGER,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 72,
      sql: `ALTER TABLE subjects ADD COLUMN assessment_style_id TEXT`,
    },
    // Which style an activity's questions were written against — so "was this
    // actually written WAEC-style?" has an answer months later.
    {
      version: 73,
      sql: `ALTER TABLE assessments ADD COLUMN assessment_style_id TEXT`,
    },
    // A school's own past papers on their way to becoming a style.
    {
      version: 74,
      sql: `CREATE TABLE IF NOT EXISTS style_imports (
        id TEXT PRIMARY KEY,
        school_id TEXT NOT NULL,
        style_name TEXT NOT NULL,
        subject TEXT,
        source TEXT,
        questions_json TEXT NOT NULL DEFAULT '[]',
        status TEXT NOT NULL DEFAULT 'in_progress',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    // A learner's own practice with a card, over time. Private to them:
    // self-reports schedule their revision and never become a mark.
    {
      version: 75,
      sql: `CREATE TABLE IF NOT EXISTS card_reviews (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        assessment_id TEXT NOT NULL,
        card_key TEXT NOT NULL,
        rating TEXT NOT NULL,
        reviewed_at TEXT NOT NULL DEFAULT (datetime('now')),
        org_id TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    {
      version: 76,
      sql: `CREATE INDEX IF NOT EXISTS card_reviews_student_card
        ON card_reviews (student_id, assessment_id, card_key)`,
    },
    // Who gave this to the class, and when. An admin may publish to any class
    // in the school — someone has to, when a teacher is absent or not yet
    // appointed — but a teacher should never find work live to their class
    // with nothing saying who put it there.
    {
      version: 77,
      sql: `ALTER TABLE assessments ADD COLUMN published_by_user_id TEXT`,
    },
    {
      version: 78,
      sql: `ALTER TABLE assessments ADD COLUMN published_at TEXT`,
    },
    // Arm-based class groupings and option classes for flexible timetabling.
    {
      version: 79,
      sql: `CREATE TABLE IF NOT EXISTS arms (
        id TEXT PRIMARY KEY,
        school_id TEXT NOT NULL,
        grade_level_id TEXT NOT NULL,
        name TEXT NOT NULL,
        stream TEXT,
        home_room TEXT,
        form_teacher_user_id TEXT,
        sequence INTEGER NOT NULL DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        owner_email TEXT,
        org_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'private'
      )`,
    },
    // Which arm a student belongs to; null if unattached or school has no arms.
    {
      version: 80,
      sql: `ALTER TABLE students ADD COLUMN arm_id TEXT`,
    },
    // Marks a class as whole-arm or null if option or unattached.
    {
      version: 81,
      sql: `ALTER TABLE classes ADD COLUMN arm_id TEXT`,
    },
    // Option classes: many-to-many join of arms a class draws from.
    {
      version: 82,
      sql: `CREATE TABLE IF NOT EXISTS class_arms (
        id TEXT PRIMARY KEY,
        class_id TEXT NOT NULL,
        arm_id TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    },
    // Which term this timetable slot belongs to; null if permanent schedule.
    {
      version: 83,
      sql: `ALTER TABLE class_schedules ADD COLUMN term_id TEXT`,
    },
    // Index for finding schedules by term and day, fast lookups when showing the timetable.
    {
      version: 84,
      sql: `CREATE INDEX IF NOT EXISTS class_schedules_term_day ON class_schedules (org_id, term_id, day_of_week)`,
    },
  ],
  { table: "school_migrations" },
);
