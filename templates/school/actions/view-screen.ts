import { defineAction } from "@agent-native/core";
import { readAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, sql } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "See what the user is currently looking at on screen. Role-aware: returns admin, teacher, or student context based on navigation.role.",
  schema: z.object({}),
  http: false,
  run: async () => {
    const navigation = await readAppState("navigation");
    const nav = navigation as any;

    if (!nav) {
      return "No navigation state found. Is the app running and is the user logged in?";
    }

    const db = getDb();
    const screen: Record<string, unknown> = { navigation: nav };
    const role = nav.role;

    // ─── Admin views ─────────────────────────────────────────────────────────
    if (role === "admin") {
      if (nav.view === "overview" || !nav.view) {
        try {
          const [staffCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(schema.schoolProfiles)
            .where(
              and(
                eq(schema.schoolProfiles.schoolId, nav.schoolId ?? ""),
                sql`school_role != 'student'`,
              ),
            );
          const [studentCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(schema.schoolProfiles)
            .where(
              and(
                eq(schema.schoolProfiles.schoolId, nav.schoolId ?? ""),
                eq(schema.schoolProfiles.schoolRole, "student"),
              ),
            );
          const [classCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(schema.classes)
            .where(eq(schema.classes.orgId, nav.schoolId ?? ""));
          const [subjectCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(schema.subjects)
            .where(eq(schema.subjects.schoolId, nav.schoolId ?? ""));

          screen.stats = {
            staffCount: staffCount?.count ?? 0,
            studentCount: studentCount?.count ?? 0,
            classCount: classCount?.count ?? 0,
            subjectCount: subjectCount?.count ?? 0,
          };
        } catch {
          // continue without stats
        }
      }

      if (nav.view === "curriculum" || nav.subjectId) {
        try {
          const subjects = await db
            .select()
            .from(schema.subjects)
            .where(eq(schema.subjects.schoolId, nav.schoolId ?? ""))
            .orderBy(schema.subjects.position);
          screen.subjects = subjects.map((s) => ({
            id: s.id,
            name: s.name,
            code: s.code,
            color: s.color,
            status: s.status,
          }));
          if (nav.subjectId) {
            const units = await db
              .select()
              .from(schema.units)
              .where(eq(schema.units.subjectId, nav.subjectId))
              .orderBy(schema.units.sequence);
            screen.units = units;
          }
        } catch {
          // continue
        }
      }

      if (nav.view === "curriculum-setup" && nav.curriculumDraftId) {
        const draftState = await readAppState(
          `curriculum-draft-${nav.curriculumDraftId}`,
        );
        const [draft] = await db
          .select()
          .from(schema.curriculumDrafts)
          .where(eq(schema.curriculumDrafts.id, nav.curriculumDraftId))
          .limit(1);
        screen.curriculumDraft = draft
          ? {
              id: draft.id,
              sessionTitle: draft.sessionTitle,
              stateJson: JSON.parse(draft.stateJson),
              status: draft.status,
            }
          : null;
        screen.liveWorkspace = draftState;
      }

      if (nav.view === "students" || nav.studentId) {
        try {
          const students = await db
            .select()
            .from(schema.students)
            .where(eq(schema.students.schoolId, nav.schoolId ?? ""))
            .limit(50);
          screen.students = students.map((s) => ({
            id: s.id,
            userId: s.userId,
            admissionNumber: s.admissionNumber,
            status: s.status,
          }));
        } catch {
          // continue
        }
      }
    }

    // ─── Teacher views ────────────────────────────────────────────────────────
    if (role === "teacher") {
      if (nav.view === "class" && nav.classId) {
        try {
          const [cls] = await db
            .select()
            .from(schema.classes)
            .where(eq(schema.classes.id, nav.classId))
            .limit(1);
          if (cls) {
            const [enrollmentCount] = await db
              .select({ count: sql<number>`count(*)` })
              .from(schema.classEnrollments)
              .where(
                and(
                  eq(schema.classEnrollments.classId, nav.classId),
                  eq(schema.classEnrollments.status, "active"),
                ),
              );
            const recentLessons = await db
              .select()
              .from(schema.lessonNotes)
              .where(eq(schema.lessonNotes.classId, nav.classId))
              .orderBy(schema.lessonNotes.updatedAt)
              .limit(5);
            const upcomingAssessments = await db
              .select()
              .from(schema.assessments)
              .where(
                and(
                  eq(schema.assessments.classId, nav.classId),
                  eq(schema.assessments.status, "published"),
                ),
              )
              .limit(5);

            screen.class = {
              id: cls.id,
              name: cls.name,
              subjectId: cls.subjectId,
              gradeLevelId: cls.gradeLevelId,
              enrollmentCount: enrollmentCount?.count ?? 0,
              status: cls.status,
            };
            screen.recentLessons = recentLessons.map((l) => ({
              id: l.id,
              title: l.title,
              status: l.status,
              updatedAt: l.updatedAt,
            }));
            screen.upcomingAssessments = upcomingAssessments.map((a) => ({
              id: a.id,
              title: a.title,
              assessmentType: a.assessmentType,
              dueDate: a.dueDate,
              status: a.status,
            }));
          }
        } catch {
          // continue
        }
      }

      if (nav.view === "lesson" && nav.lessonId) {
        try {
          const [lesson] = await db
            .select()
            .from(schema.lessonNotes)
            .where(eq(schema.lessonNotes.id, nav.lessonId))
            .limit(1);
          const liveEdit = await readAppState(
            `lesson-edit-${nav.lessonId}`,
          );
          const resources = await db
            .select()
            .from(schema.lessonResources)
            .where(eq(schema.lessonResources.lessonNoteId, nav.lessonId));
          if (lesson) {
            screen.lesson = {
              id: lesson.id,
              title: lesson.title,
              content: lesson.content,
              summary: lesson.summary,
              status: lesson.status,
              customFields: JSON.parse(lesson.customFieldsJson),
              updatedAt: lesson.updatedAt,
            };
            screen.liveEdit = liveEdit;
            screen.resources = resources;
            if (lesson.unitId) {
              const [unit] = await db
                .select()
                .from(schema.units)
                .where(eq(schema.units.id, lesson.unitId))
                .limit(1);
              const objectives = unit
                ? await db
                    .select()
                    .from(schema.learningObjectives)
                    .where(eq(schema.learningObjectives.unitId, unit.id))
                    .orderBy(schema.learningObjectives.sequence)
                : [];
              screen.unit = unit
                ? {
                    id: unit.id,
                    title: unit.title,
                    learningObjectives: objectives,
                  }
                : null;
            }
          }
        } catch {
          // continue
        }
      }

      if (nav.view === "assessment" && nav.assessmentId) {
        try {
          const [assessment] = await db
            .select()
            .from(schema.assessments)
            .where(eq(schema.assessments.id, nav.assessmentId))
            .limit(1);
          if (assessment) {
            const variants = await db
              .select()
              .from(schema.assessmentVariants)
              .where(
                eq(schema.assessmentVariants.assessmentId, nav.assessmentId),
              )
              .orderBy(schema.assessmentVariants.position);
            const [submittedCount] = await db
              .select({ count: sql<number>`count(*)` })
              .from(schema.submissions)
              .where(
                and(
                  eq(schema.submissions.assessmentId, nav.assessmentId),
                  eq(schema.submissions.status, "submitted"),
                ),
              );
            const [gradedCount] = await db
              .select({ count: sql<number>`count(*)` })
              .from(schema.grades)
              .where(eq(schema.grades.assessmentId, nav.assessmentId));

            screen.assessment = {
              id: assessment.id,
              title: assessment.title,
              assessmentType: assessment.assessmentType,
              dueDate: assessment.dueDate,
              totalPoints: assessment.totalPoints,
              status: assessment.status,
            };
            screen.variants = variants;
            screen.submissionSummary = {
              submitted: submittedCount?.count ?? 0,
              graded: gradedCount?.count ?? 0,
            };
          }
        } catch {
          // continue
        }
      }

      if (nav.view === "dashboard" || !nav.view) {
        try {
          const myClasses = await db
            .select()
            .from(schema.classes)
            .where(eq(schema.classes.primaryTeacherUserId, nav.userId ?? ""))
            .orderBy(schema.classes.createdAt)
            .limit(10);
          screen.myClasses = myClasses.map((c) => ({
            id: c.id,
            name: c.name,
            subjectId: c.subjectId,
            status: c.status,
          }));
        } catch {
          // continue
        }
      }
    }

    // ─── Student views ────────────────────────────────────────────────────────
    if (role === "student") {
      if (nav.view === "assessment" && nav.assessmentId) {
        try {
          const [assessment] = await db
            .select()
            .from(schema.assessments)
            .where(
              and(
                eq(schema.assessments.id, nav.assessmentId),
                eq(schema.assessments.status, "published"),
              ),
            )
            .limit(1);
          if (assessment) {
            // Get assigned variant (never reveal difficulty name to student)
            const [assigned] = await db
              .select()
              .from(schema.studentAssessments)
              .where(
                and(
                  eq(schema.studentAssessments.assessmentId, nav.assessmentId),
                  eq(schema.studentAssessments.studentId, nav.studentId ?? ""),
                ),
              )
              .limit(1);
            const variant = assigned?.variantId
              ? await db
                  .select()
                  .from(schema.assessmentVariants)
                  .where(
                    eq(schema.assessmentVariants.id, assigned.variantId),
                  )
                  .limit(1)
                  .then(([v]) => v)
              : null;
            const [submission] = nav.submissionId
              ? await db
                  .select()
                  .from(schema.submissions)
                  .where(eq(schema.submissions.id, nav.submissionId))
                  .limit(1)
              : [null];
            const submissionDraft = nav.submissionId
              ? await readAppState(`submission-draft-${nav.submissionId}`)
              : null;
            const grade = submission
              ? await db
                  .select()
                  .from(schema.grades)
                  .where(eq(schema.grades.submissionId, submission.id))
                  .limit(1)
                  .then(([g]) => g)
              : null;

            screen.assessment = {
              id: assessment.id,
              title: assessment.title,
              assessmentType: assessment.assessmentType,
              dueDate: assessment.dueDate,
            };
            // Strip difficulty from student view
            screen.myVariant = variant
              ? {
                  id: variant.id,
                  instructions: variant.instructions,
                  content: variant.content,
                  totalPoints: variant.totalPoints,
                }
              : null;
            screen.mySubmission = submission
              ? {
                  id: submission.id,
                  status: submission.status,
                  content: submission.content,
                  submittedAt: submission.submittedAt,
                  grade:
                    grade?.isPublished
                      ? {
                          score: grade.score,
                          maxScore: grade.maxScore,
                          percentage: grade.percentage,
                          letterGrade: grade.letterGrade,
                          feedback: grade.feedback,
                        }
                      : null,
                }
              : null;
            screen.submissionDraft = submissionDraft;
          }
        } catch {
          // continue
        }
      }

      if (nav.view === "dashboard" || nav.view === "classes") {
        try {
          const enrollments = await db
            .select()
            .from(schema.classEnrollments)
            .where(
              and(
                eq(schema.classEnrollments.studentUserId, nav.userId ?? ""),
                eq(schema.classEnrollments.status, "active"),
              ),
            );
          const classIds = enrollments.map((e) => e.classId);
          screen.enrolledClasses = classIds.length;
        } catch {
          // continue
        }
      }
    }

    return screen;
  },
});
