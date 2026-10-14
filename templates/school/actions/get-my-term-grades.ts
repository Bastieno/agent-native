import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { resolveStudentId } from "../server/lib/student-session.js";
import { isMarkedWork } from "../server/lib/gradebook.js";
import { SHARED_STATUSES } from "../server/lib/shared-with-class.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { missedWorkPolicy, summarise } from "../shared/missed-work.js";

/**
 * A learner's term at a glance, the way they would want to read it: how
 * they are doing overall, what was marked most recently, and each subject
 * with its work, newest first.
 *
 * A flat list of every published mark answered none of those questions: the
 * learner had to find their subjects among sixty rows and work out an average
 * in their head. Averages here are counted as the report card counts them,
 * so the page and the document that goes home agree.
 */

type Piece = {
  assessmentId: string;
  title: string;
  /** The title without its "Week 3 quiz:" opening, which the row already says. */
  topic: string;
  week: number | null;
  kind: string | null;
  dueDate: string | null;
  state: "marked" | "waiting" | "open" | "missed";
  score: number | null;
  maxScore: number | null;
  percentage: number | null;
  grade: string | null;
};

const WEEK_TITLE = /^Week (\d+)\b[^:]*:\s*/i;

export default defineAction({
  description:
    "Student-facing: the learner's term at a glance — overall average and grade, how much work was handed in, the most recently marked work, and every subject with its average and its pieces of work (marked, waiting for marks, still open, or not handed in), newest first. Averages are counted the way the report card counts them.",
  schema: z.object({
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student — it is resolved from the session.",
      ),
  }),
  http: { method: "GET" },
  run: async (rawArgs) => {
    const studentId = await resolveStudentId(rawArgs.studentId);
    if (!studentId) {
      throw new Error("studentId is required — say which student you mean.");
    }
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [student] = await db
      .select()
      .from(schema.students)
      .where(
        and(
          eq(schema.students.id, studentId),
          eq(schema.students.orgId, orgId),
        ),
      )
      .limit(1);
    if (!student) throw new Error("Student not found.");

    const config = ((await getOrgSetting(orgId, "school-config")) ?? {}) as any;
    const levels: any[] = config?.gradingScale?.levels ?? [];
    const passMark: number = config?.passMark ?? 50;
    const policy = missedWorkPolicy(config);
    const gradeFor = (p: number | null) =>
      p === null
        ? null
        : (levels.find((l) => p >= l.min && p <= l.max)?.grade ?? null);

    const enrollments = student.userId
      ? await db
          .select({ classId: schema.classEnrollments.classId })
          .from(schema.classEnrollments)
          .where(
            and(
              eq(schema.classEnrollments.studentUserId, student.userId),
              eq(schema.classEnrollments.status, "active"),
            ),
          )
      : [];
    const classIds = enrollments.map((e) => e.classId);
    if (!classIds.length) {
      return {
        summary: null,
        recent: [],
        subjects: [],
        message: "You are not in any classes yet.",
      };
    }

    const classes = await db
      .select({
        id: schema.classes.id,
        name: schema.classes.name,
        subjectName: schema.subjects.name,
        teacherUserId: schema.classes.primaryTeacherUserId,
      })
      .from(schema.classes)
      .leftJoin(
        schema.subjects,
        eq(schema.classes.subjectId, schema.subjects.id),
      )
      .where(inArray(schema.classes.id, classIds));

    const assessments = (
      await db
        .select()
        .from(schema.assessments)
        .where(
          and(
            inArray(schema.assessments.classId, classIds),
            inArray(schema.assessments.status, [...SHARED_STATUSES]),
          ),
        )
    ).filter(isMarkedWork);
    const ids = assessments.map((a) => a.id);

    const grades = ids.length
      ? await db
          .select()
          .from(schema.grades)
          .where(
            and(
              eq(schema.grades.studentId, studentId),
              eq(schema.grades.isPublished, true),
              inArray(schema.grades.assessmentId, ids),
            ),
          )
      : [];
    const submissions = ids.length
      ? await db
          .select()
          .from(schema.submissions)
          .where(
            and(
              eq(schema.submissions.studentId, studentId),
              inArray(schema.submissions.assessmentId, ids),
            ),
          )
      : [];

    const labels = await getUserLabels(
      classes.map((c) => c.teacherUserId).filter(Boolean) as string[],
    );

    const pieceOf = (a: (typeof assessments)[number]): Piece => {
      const grade = grades.find((g) => g.assessmentId === a.id);
      const sub = submissions.find((s) => s.assessmentId === a.id);
      const handedIn =
        !!sub && ["submitted", "graded"].includes(String(sub.status));
      const state: Piece["state"] = grade
        ? "marked"
        : handedIn
          ? "waiting"
          : a.status === "closed"
            ? "missed"
            : "open";
      const percentage = grade ? parseFloat(grade.percentage ?? "0") : null;
      const week = a.title.match(WEEK_TITLE);
      return {
        assessmentId: a.id,
        title: a.title,
        topic: a.title.replace(WEEK_TITLE, "") || a.title,
        week: week ? Number(week[1]) : null,
        kind: a.format ?? null,
        dueDate: a.dueDate ?? a.closesAt ?? null,
        state,
        score: grade ? Number(grade.score) : null,
        maxScore: grade ? Number(grade.maxScore) : null,
        percentage: percentage === null ? null : Math.round(percentage),
        grade: grade?.letterGrade ?? gradeFor(percentage),
      };
    };
    const newestFirst = (a: Piece, b: Piece) =>
      String(b.dueDate ?? "").localeCompare(String(a.dueDate ?? ""));

    const subjects = classes
      .map((cls) => {
        const pieces = assessments
          .filter((a) => a.classId === cls.id)
          .map(pieceOf)
          .sort(newestFirst);
        const marked = pieces.filter((p) => p.state === "marked");
        const missed = pieces.filter((p) => p.state === "missed").length;
        const summary = summarise(
          marked.map((p) => p.percentage ?? 0),
          marked.length + missed,
          policy,
        );
        return {
          classId: cls.id,
          className: cls.name,
          subject: cls.subjectName ?? cls.name,
          teacher: cls.teacherUserId
            ? (labelFor(labels, cls.teacherUserId) ?? null)
            : null,
          percentage: summary.percentage,
          grade: gradeFor(summary.percentage),
          belowPassMark:
            summary.percentage !== null && summary.percentage < passMark,
          marked: marked.length,
          missed,
          pieces,
        };
      })
      .sort((a, b) => a.subject.localeCompare(b.subject));

    const all = subjects.flatMap((s) =>
      s.pieces.map((p) => ({ ...p, subject: s.subject })),
    );
    const counted = subjects.filter((s) => s.percentage !== null);
    const overall = counted.length
      ? Math.round(
          counted.reduce((n, s) => n + (s.percentage ?? 0), 0) / counted.length,
        )
      : null;

    // Which way the term is going: the average of the earlier half of the
    // marked work against the later half, by when it was due. Said only
    // when there is enough work for the comparison to mean something.
    const markedInOrder = all
      .filter((p) => p.state === "marked")
      .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
    // Missed work counts in the direction exactly as it does in the average,
    // or a term average falling under missed work reads as "up".
    const countedInOrder = all
      .filter(
        (p) =>
          p.state === "marked" || (p.state === "missed" && policy === "zero"),
      )
      .map((p) => (p.state === "missed" ? { ...p, percentage: 0 } : p))
      .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
    let earlier: number | null = null;
    let later: number | null = null;
    if (countedInOrder.length >= 6) {
      const half = Math.floor(countedInOrder.length / 2);
      const mean = (xs: Piece[]) =>
        Math.round(xs.reduce((n, p) => n + (p.percentage ?? 0), 0) / xs.length);
      earlier = mean(countedInOrder.slice(0, half));
      later = mean(countedInOrder.slice(half));
    }

    const now = new Date().toISOString().slice(0, 10);
    const dueNext =
      all
        .filter((p) => p.state === "open" && p.dueDate && p.dueDate >= now)
        .sort((a, b) =>
          String(a.dueDate).localeCompare(String(b.dueDate)),
        )[0] ?? null;

    const set = all.length;
    const handedIn = all.filter(
      (p) => p.state === "marked" || p.state === "waiting",
    ).length;

    return {
      summary: {
        percentage: overall,
        grade: gradeFor(overall),
        passMark,
        handedIn,
        set,
        missed: all.filter((p) => p.state === "missed").length,
        stillOpen: all.filter((p) => p.state === "open").length,
        missedCountsAsZero: policy === "zero",
        earlier,
        later,
        dueNext: dueNext
          ? {
              assessmentId: dueNext.assessmentId,
              title: dueNext.topic,
              subject: dueNext.subject,
              dueDate: dueNext.dueDate,
            }
          : null,
      },
      recent: markedInOrder.slice(-5).reverse(),
      subjects,
    };
  },
});
