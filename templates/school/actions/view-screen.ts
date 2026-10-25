import { isForLearner } from "../server/lib/audience.js";
import { defineAction } from "@agent-native/core";
import { readAppState } from "@agent-native/core/application-state";
import { getOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import {
  loadSchoolConfig,
  loadTimetable,
  resolveTerm,
} from "../server/lib/timetable.js";
import { schoolToday } from "../shared/dates.js";
import { joinDoubles } from "../shared/school-week.js";
import { getMyWeek } from "../server/lib/my-week.js";
import { timetableView } from "../server/lib/timetable-view.js";
import { getSchoolRole } from "../server/lib/student-access.js";
import { studentProfileFor } from "../server/lib/student-profile.js";
import { viewRoleFor } from "../shared/view-role.js";
import { accessWithoutProfile } from "../server/lib/school-access.js";
import { proposalView } from "../server/lib/timetable-generation.js";
import { coverageView } from "../server/lib/timetable-coverage.js";
import { loadSubjectCurriculum } from "../server/lib/subject-curriculum.js";
import { sharedWithClass } from "../server/lib/shared-with-class.js";
import { rowOf } from "../server/lib/raw-sql.js";
import getSchoolAnalytics from "./get-school-analytics.js";
import getMyAnalytics from "./get-my-analytics.js";
import getGradebook from "./get-gradebook.js";
import getMyTermGrades from "./get-my-term-grades.js";
import {
  classProfileFor,
  teacherProfileFor,
} from "../server/lib/staff-profile.js";

/**
 * A page's figures, the same ones its own query loads, for the agent to read.
 *
 * The agent is always told which view is open, but not what is printed on it.
 * Left to that, asked "explain this number" it can answer from the sentence
 * the person quoted and fill the rest in from general knowledge. So a page
 * whose numbers people ask about hands them over here, keyed so they are
 * plainly "what is on screen" and not something the agent went looking for.
 * Long lists are trimmed to keep the turn small, and say so.
 */
async function onScreen<T>(read: () => Promise<T>): Promise<T | undefined> {
  try {
    return await read();
  } catch {
    // Not available to this person, or no longer there.
    return undefined;
  }
}
const trimmed = <T>(rows: T[] | undefined, keep: number) =>
  rows && rows.length > keep
    ? { rows: rows.slice(0, keep), total: rows.length, trimmedTo: keep }
    : { rows: rows ?? [], total: rows?.length ?? 0 };

export default defineAction({
  description:
    "See what the user is currently looking at on screen. Role-aware: returns admin, teacher, or student context for the role the signed-in person really holds, shown where they are in the app.",
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

    // Resolve school context from the authenticated session (not from nav state,
    // which does not carry schoolId or userId).
    const { orgId: schoolId, userEmail } = currentAccess();
    // The branch follows the role the person really holds. Navigation state is
    // written by the page, so a learner could claim "admin" there.
    const schoolRole = userEmail ? await getSchoolRole(userEmail) : null;
    // No profile yet: the admin branch only for someone who may set their own
    // school up, as /api/school/session decides; otherwise no branch.
    const canSetUp =
      !schoolRole && userEmail
        ? (await accessWithoutProfile(userEmail, schoolId)).access === "setup"
        : false;
    const role = viewRoleFor(schoolRole, canSetUp);

    // ─── Admin views ─────────────────────────────────────────────────────────
    if (role === "admin") {
      if (nav.view === "overview" || !nav.view) {
        if (!schoolId) {
          screen.setupRequired = true;
          screen.message =
            "No school has been set up yet. Run setup-school to initialize your school.";
        } else {
          try {
            const [staffCount] = await db
              .select({ count: sql<number>`count(*)` })
              .from(schema.schoolProfiles)
              .where(
                and(
                  eq(schema.schoolProfiles.schoolId, schoolId),
                  sql`school_role != 'student'`,
                ),
              );
            const [studentCount] = await db
              .select({ count: sql<number>`count(*)` })
              .from(schema.schoolProfiles)
              .where(
                and(
                  eq(schema.schoolProfiles.schoolId, schoolId),
                  eq(schema.schoolProfiles.schoolRole, "student"),
                ),
              );
            const [classCount] = await db
              .select({ count: sql<number>`count(*)` })
              .from(schema.classes)
              .where(eq(schema.classes.orgId, schoolId));
            const [subjectCount] = await db
              .select({ count: sql<number>`count(*)` })
              .from(schema.subjects)
              .where(
                and(
                  eq(schema.subjects.schoolId, schoolId),
                  eq(schema.subjects.status, "active"),
                ),
              );

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
      }

      if (nav.view === "settings" && schoolId) {
        try {
          const config = await getOrgSetting(schoolId, "school-config");
          const customFields = await getOrgSetting(
            schoolId,
            "custom-fields-schema",
          );
          const gradeLevels = await db
            .select()
            .from(schema.gradeLevels)
            .where(eq(schema.gradeLevels.schoolId, schoolId))
            .orderBy(schema.gradeLevels.sequence);
          const terms = await db
            .select()
            .from(schema.terms)
            .where(eq(schema.terms.schoolId, schoolId))
            .orderBy(schema.terms.sequence);
          screen.schoolConfig = config ?? null;
          screen.customFieldsSchema = customFields ?? null;
          screen.gradeLevels = gradeLevels;
          screen.terms = terms;
        } catch {
          // continue
        }
      }

      // The timetable as the admin sees it: the same term and the same arm,
      // teacher or room, so "this clash" means the one on their screen.
      if (nav.view === "timetable" && schoolId) {
        try {
          const shown = await timetableView(schoolId, {
            termId: nav.termId,
            armId: nav.timetableView === "arm" ? nav.armId : undefined,
            teacherUserId:
              nav.timetableView === "teacher" ? nav.teacherUserId : undefined,
            room: nav.timetableView === "room" ? nav.room : undefined,
          });
          screen.timetable = {
            ...shown,
            // Who sits in each lesson is not on the grid; a count is enough.
            periods: shown.periods.map(({ learnerUserIds, ...p }) => ({
              ...p,
              learnerCount: learnerUserIds.length,
            })),
          };
          // What is still missing for what is in view (not by room: a room
          // has no classes of its own to count).
          if (nav.timetableView !== "room") {
            screen.timetableCoverage = await coverageView(schoolId, {
              termId: nav.termId,
              armId: nav.timetableView === "arm" ? nav.armId : undefined,
              teacherUserId:
                nav.timetableView === "teacher" ? nav.teacherUserId : undefined,
            });
          }
          // The draft waiting for this term, as the bar over the grid shows it.
          const drafted = nav.termId
            ? await proposalView(schoolId, nav.termId)
            : null;
          screen.proposal = drafted
            ? {
                summary: drafted.summary,
                reasons: drafted.reasons,
                notSet: drafted.notSet,
                noTeacher: drafted.noTeacher,
              }
            : null;
          screen.selectedCell = nav.selectedCell ?? null;
          if (nav.selectedCell) {
            screen.selectedCellPeriods = shown.periods
              .filter(
                (p) =>
                  p.day === nav.selectedCell.day &&
                  p.periodNumber === nav.selectedCell.periodNumber,
              )
              .map((p) => ({
                scheduleId: p.scheduleId,
                className: p.className,
                room: p.room,
                teachers: p.teachers.map((t) => t.name),
                pairId: p.pairId,
                lessonLabel: p.lessonLabel,
              }));
          }
        } catch (e: any) {
          screen.timetableError = e?.message ?? String(e);
        }
      }

      if (nav.view === "curriculum" || nav.subjectId) {
        if (schoolId) {
          try {
            const subjects = await db
              .select()
              .from(schema.subjects)
              // Archived subjects are off the page, so they are off the
              // agent's screen too — otherwise it sees a second "Mathematics"
              // the admin cannot.
              .where(
                and(
                  eq(schema.subjects.schoolId, schoolId),
                  eq(schema.subjects.status, "active"),
                ),
              )
              .orderBy(schema.subjects.position);
            screen.subjects = subjects.map((s) => ({
              id: s.id,
              name: s.name,
              code: s.code,
              color: s.color,
              status: s.status,
            }));
            if (nav.subjectId) {
              // The subject page groups by year group and term; so does this,
              // so "unit 1" means the same thing to the agent as to the admin.
              const curriculum = await loadSubjectCurriculum(
                nav.subjectId,
                schoolId,
              );
              if (curriculum) {
                screen.subjectCurriculum = curriculum;
                screen.selectedYearGroup =
                  curriculum.yearGroups.find(
                    (y) => y.gradeLevelId === nav.gradeLevelId,
                  )?.name ??
                  curriculum.yearGroups[0]?.name ??
                  null;
              }
            }
          } catch {
            // continue
          }
        }
      }

      // A lesson note opened for reading from the admin calendar.
      if (nav.lessonId && schoolId) {
        const [note] = await db
          .select({
            id: schema.lessonNotes.id,
            title: schema.lessonNotes.title,
            status: schema.lessonNotes.status,
            lessonDate: schema.lessonNotes.lessonDate,
            content: schema.lessonNotes.content,
            className: schema.classes.name,
          })
          .from(schema.lessonNotes)
          .leftJoin(
            schema.classes,
            eq(schema.lessonNotes.classId, schema.classes.id),
          )
          .where(
            and(
              eq(schema.lessonNotes.id, nav.lessonId),
              eq(schema.lessonNotes.orgId, schoolId),
            ),
          )
          .limit(1);
        if (note) screen.openLessonNote = note;
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

      // The school's analytics page: the figures it prints.
      if (nav.view === "analytics" && schoolId) {
        const a: any = await onScreen(() => getSchoolAnalytics.run({}));
        if (a) {
          const { classSummaries, ...rest } = a;
          screen.analyticsOnScreen = {
            ...rest,
            classSummaries: trimmed(classSummaries, 30),
          };
        }
      }

      if ((nav.view === "students" || nav.studentId) && schoolId) {
        try {
          const students = await db
            .select()
            .from(schema.students)
            .where(eq(schema.students.schoolId, schoolId))
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

      // A teacher's or a class's page is open: the same profile the page
      // shows, with each finding's basis and evidence, so "why does it say
      // that?" is answered from the data and not guessed at.
      if (nav.view === "staff" && nav.staffUserId && schoolId) {
        try {
          screen.teacherOnScreen = await teacherProfileFor(nav.staffUserId, {
            orgId: schoolId,
          });
        } catch {
          // no longer there
        }
      }
      if (nav.view === "classes" && nav.classId && schoolId) {
        try {
          screen.classOnScreen = await classProfileFor(nav.classId, {
            orgId: schoolId,
          });
        } catch {
          // no longer there
        }
      }

      // A learner's own page is open: give the agent what is on it, with how
      // each figure was counted and the papers behind it, so "explain this"
      // is answered from the data and not guessed at.
      if (nav.studentId && schoolId) {
        try {
          screen.learnerOnScreen = await studentProfileFor(nav.studentId, {
            orgId: schoolId,
            userEmail,
          });
        } catch {
          // not available to this person, or no longer there
        }
      }
    }

    // ─── Teacher views ────────────────────────────────────────────────────────
    if (role === "teacher") {
      // A learner's page is open: the same profile as the admin's, limited to
      // this teacher's own classes by the profile itself.
      if (nav.view === "students" && nav.studentId && schoolId) {
        try {
          screen.learnerOnScreen = await studentProfileFor(nav.studentId, {
            orgId: schoolId,
            userEmail,
          });
        } catch {
          // not one of their learners, or no longer there
        }
      }
      // The gradebook and the analytics a teacher is looking at.
      if (nav.view === "gradebook" && nav.classId) {
        const gb: any = await onScreen(() =>
          getGradebook.run({ classId: nav.classId }),
        );
        if (gb) {
          screen.gradebookOnScreen = {
            ...gb,
            // The page's own arithmetic, so a figure on it can be explained.
            counting: [
              "A learner's average is the mean of the percentages on the pieces of work they have a mark for.",
              "Work with no mark is left out, not counted as zero, so a learner who has missed work can look better here than on their report card, which follows the school's missed-work setting.",
              "Reading pages and card decks carry no marks and have no column.",
            ],
          };
        }
      }
      if (nav.view === "analytics") {
        screen.analyticsOnScreen = await onScreen(() => getMyAnalytics.run({}));
      }
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
          const liveEdit = await readAppState(`lesson-edit-${nav.lessonId}`);
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
          // Look up teacher's userId from the framework user table
          let teacherUserId: string | undefined;
          if (userEmail) {
            const userRow = await rowOf<{ id: string }>(
              sql`SELECT id FROM "user" WHERE email = ${userEmail} LIMIT 1`,
            );
            teacherUserId = userRow?.id;
          }
          if (teacherUserId) {
            const myClasses = await db
              .select()
              .from(schema.classes)
              .where(
                and(
                  eq(schema.classes.primaryTeacherUserId, teacherUserId),
                  eq(schema.classes.status, "active"),
                ),
              )
              .orderBy(schema.classes.createdAt)
              .limit(10);
            screen.myClasses = myClasses.map((c) => ({
              id: c.id,
              name: c.name,
              subjectId: c.subjectId,
              status: c.status,
            }));

            // Today's schedule — day of week 1=Mon … 7=Sun
            // The school's today, not the server's or UTC's.
            const todayStr = schoolToday(await loadSchoolConfig(schoolId!));
            const jsDay = new Date(`${todayStr}T12:00:00Z`).getUTCDay(); // 0=Sun … 6=Sat
            const todayDow = jsDay === 0 ? 7 : jsDay;
            // From the school's week, so the times match the timetable and a
            // support teacher sees their classes too.
            const term = await resolveTerm(schoolId!, todayStr);
            const { periods, week } = await loadTimetable(
              schoolId!,
              term.termId,
            );
            const todayPeriods = periods
              .filter(
                (p) =>
                  p.day === todayDow &&
                  p.teachers.some((t) => t.userId === teacherUserId),
              )
              .sort((a, b) => a.start.localeCompare(b.start));
            const todayIds = [...new Set(todayPeriods.map((p) => p.classId))];
            const lessons =
              todayIds.length > 0
                ? await db
                    .select({
                      id: schema.lessonNotes.id,
                      classId: schema.lessonNotes.classId,
                      title: schema.lessonNotes.title,
                    })
                    .from(schema.lessonNotes)
                    .where(
                      and(
                        inArray(schema.lessonNotes.classId, todayIds),
                        eq(schema.lessonNotes.lessonDate, todayStr),
                      ),
                    )
                : [];
            screen.todaySchedule = joinDoubles(week, todayPeriods).map(
              ({ first: p, last, count }) => {
                const lesson = lessons.find((l) => l.classId === p.classId);
                return {
                  classId: p.classId,
                  className: p.className,
                  startTime: p.start,
                  endTime: last.end,
                  periodNumber: p.periodNumber,
                  periodCount: count,
                  room: p.room,
                  lessonLabel: p.lessonLabel,
                  lessonPrepared: !!lesson,
                  lesson: lesson
                    ? { id: lesson.id, title: lesson.title }
                    : null,
                };
              },
            );
          }
        } catch {
          // continue
        }
      }
    }

    // ─── Student views ────────────────────────────────────────────────────────
    if (role === "student") {
      // Their own grades page: the term, as the report card counts it.
      if (nav.view === "grades" || nav.view === "progress") {
        const g: any = await onScreen(() => getMyTermGrades.run({}));
        if (g) {
          screen.gradesOnScreen = {
            ...g,
            counting: [
              "Counted the way the report card counts: published marks only.",
              "A subject's average is its marked work under the school's missed-work setting (summary.missedCountsAsZero says which); the overall average is the mean of the subjects' averages.",
              "Earlier and later are the averages of the first and second half of the term's work by due date.",
            ],
          };
        }
      }
      // Resolve current student's userId from the framework user table
      let studentUserId: string | undefined;
      if (userEmail) {
        try {
          const userRow = await rowOf<{ id: string }>(
            sql`SELECT id FROM "user" WHERE email = ${userEmail} LIMIT 1`,
          );
          studentUserId = userRow?.id;
        } catch {
          // continue
        }
      }

      // Expose student IDs so the agent can pass them to student-facing actions
      if (studentUserId && schoolId) {
        screen.studentUserId = studentUserId;
        try {
          const [studentRow] = await db
            .select({ id: schema.students.id })
            .from(schema.students)
            .where(
              and(
                eq(schema.students.userId, studentUserId),
                eq(schema.students.schoolId, schoolId),
              ),
            )
            .limit(1);
          if (studentRow) screen.studentId = studentRow.id;
        } catch {
          // continue
        }
      }

      if (nav.view === "assessment" && nav.assessmentId) {
        try {
          const [assessment] = await db
            .select()
            .from(schema.assessments)
            .where(
              and(
                eq(schema.assessments.id, nav.assessmentId),
                sharedWithClass(),
              ),
            )
            .limit(1);
          if (
            assessment &&
            (!screen.studentId ||
              isForLearner(assessment, String(screen.studentId)))
          ) {
            // Get assigned variant (never reveal difficulty name to student)
            const [assigned] = studentUserId
              ? await db
                  .select()
                  .from(schema.studentAssessments)
                  .where(
                    and(
                      eq(
                        schema.studentAssessments.assessmentId,
                        nav.assessmentId,
                      ),
                      eq(schema.studentAssessments.studentId, studentUserId),
                    ),
                  )
                  .limit(1)
              : [undefined];
            const variant = assigned?.variantId
              ? await db
                  .select()
                  .from(schema.assessmentVariants)
                  .where(eq(schema.assessmentVariants.id, assigned.variantId))
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
                  grade: grade?.isPublished
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

      if (nav.view === "week" && schoolId) {
        try {
          screen.myWeek = await getMyWeek(schoolId, userEmail);
        } catch {
          // continue
        }
      }

      if (nav.view === "dashboard" || nav.view === "classes") {
        if (studentUserId) {
          try {
            const enrollments = await db
              .select()
              .from(schema.classEnrollments)
              .where(
                and(
                  eq(schema.classEnrollments.studentUserId, studentUserId),
                  eq(schema.classEnrollments.status, "active"),
                ),
              );
            screen.enrolledClasses = enrollments.length;
          } catch {
            // continue
          }
        }
      }
    }

    return screen;
  },
});
