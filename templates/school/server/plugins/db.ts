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
  ],
  { table: "school_migrations" },
);
