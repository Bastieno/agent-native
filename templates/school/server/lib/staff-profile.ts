import { getOrgSetting } from "@agent-native/core/settings";
import { and, eq, inArray, or, isNull, sql } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { rowOf } from "./raw-sql.js";
import { classAveragesFor } from "./class-averages.js";
import { isMarkedWork } from "./gradebook.js";
import { sharedWithClass } from "./shared-with-class.js";
import { getUserLabels, labelFor } from "./user-names.js";
import { missedWorkPolicy } from "../../shared/missed-work.js";
import {
  classFindingsFor,
  teacherFindingsFor,
  type ClassFact,
  type WaitingPaper,
} from "../../shared/staff-findings.js";
import getLessonNoteCoverage from "../../actions/get-lesson-note-coverage.js";

/**
 * A teacher, and a class, for the admin who has to act on them.
 *
 * Both are counted the way a learner's own Grades page and the report card
 * count (published marks only, missed work by the school's setting), so a
 * class figure here is the figure everywhere else. A class's figure is always
 * set beside the school's other classes in the same subject and year group,
 * because on its own it cannot tell a hard cohort from a hard term.
 */

const days = (iso: string | null | undefined) => {
  const t = iso ? Date.parse(iso) : NaN;
  return Number.isFinite(t)
    ? Math.max(0, Math.floor((Date.now() - t) / 864e5))
    : 0;
};

interface Loaded {
  facts: Map<string, ClassFact>;
  /** Extra detail the class page needs. */
  extra: Map<
    string,
    {
      armName: string | null;
      teacherUserId: string;
      room: string | null;
      assessmentIds: string[];
      assessments: Array<{ id: string; title: string; dueDate: string | null }>;
    }
  >;
  passMark: number;
  policy: ReturnType<typeof missedWorkPolicy>;
  averages: Awaited<ReturnType<typeof classAveragesFor>>;
}

async function loadFacts(
  orgId: string,
  wanted: string[],
  notes: { teacherUserId?: string; gradeLevelId?: string; subjectId?: string },
): Promise<Loaded> {
  const db = getDb();
  const config = ((await getOrgSetting(orgId, "school-config")) ?? {}) as any;
  const policy = missedWorkPolicy(config);
  const passMark: number = config?.passMark ?? 50;

  const rows = wanted.length
    ? await db
        .select({
          id: schema.classes.id,
          name: schema.classes.name,
          subjectId: schema.classes.subjectId,
          gradeLevelId: schema.classes.gradeLevelId,
          armId: schema.classes.armId,
          teacher: schema.classes.primaryTeacherUserId,
          room: schema.classes.roomNumber,
          subjectName: schema.subjects.name,
          gradeName: schema.gradeLevels.name,
        })
        .from(schema.classes)
        .leftJoin(
          schema.subjects,
          eq(schema.classes.subjectId, schema.subjects.id),
        )
        .leftJoin(
          schema.gradeLevels,
          eq(schema.classes.gradeLevelId, schema.gradeLevels.id),
        )
        .where(
          and(
            eq(schema.classes.orgId, orgId),
            inArray(schema.classes.id, wanted),
          ),
        )
    : [];

  // The school's other classes in the same subjects and year groups.
  const subjectIds = [...new Set(rows.map((r) => r.subjectId))];
  const gradeIds = [...new Set(rows.map((r) => r.gradeLevelId))];
  const peers = rows.length
    ? await db
        .select({
          id: schema.classes.id,
          subjectId: schema.classes.subjectId,
          gradeLevelId: schema.classes.gradeLevelId,
          teacher: schema.classes.primaryTeacherUserId,
        })
        .from(schema.classes)
        .where(
          and(
            eq(schema.classes.orgId, orgId),
            eq(schema.classes.status, "active"),
            inArray(schema.classes.subjectId, subjectIds),
            inArray(schema.classes.gradeLevelId, gradeIds),
          ),
        )
    : [];
  const averages = await classAveragesFor(
    [...new Set([...rows.map((r) => r.id), ...peers.map((p) => p.id)])],
    policy,
  );

  // Work set, and what is waiting on the teacher.
  const assessments = wanted.length
    ? (
        await db
          .select()
          .from(schema.assessments)
          .where(
            and(inArray(schema.assessments.classId, wanted), sharedWithClass()),
          )
      ).filter(isMarkedWork)
    : [];
  const ids = assessments.map((a) => a.id);
  const subs = ids.length
    ? await db
        .select({
          id: schema.submissions.id,
          assessmentId: schema.submissions.assessmentId,
          status: schema.submissions.status,
          submittedAt: schema.submissions.submittedAt,
          updatedAt: schema.submissions.updatedAt,
        })
        .from(schema.submissions)
        .where(inArray(schema.submissions.assessmentId, ids))
    : [];
  const grades = ids.length
    ? await db
        .select({
          submissionId: schema.grades.submissionId,
          assessmentId: schema.grades.assessmentId,
          isPublished: schema.grades.isPublished,
          gradedAt: schema.grades.gradedAt,
          updatedAt: schema.grades.updatedAt,
        })
        .from(schema.grades)
        .where(inArray(schema.grades.assessmentId, ids))
    : [];
  const gradedSubmissions = new Set(grades.map((g) => g.submissionId));

  const coverage: any = await getLessonNoteCoverage
    .run({
      ...(notes.teacherUserId ? { teacherUserId: notes.teacherUserId } : {}),
      ...(notes.gradeLevelId ? { gradeLevelId: notes.gradeLevelId } : {}),
      ...(notes.subjectId ? { subjectId: notes.subjectId } : {}),
      onlyGaps: false,
    } as any)
    .catch(() => null);
  const coverageOf = new Map<string, any>(
    (coverage?.classes ?? []).map((c: any) => [c.classId, c]),
  );

  const facts = new Map<string, ClassFact>();
  const extra: Loaded["extra"] = new Map();
  const arms = rows.some((r) => r.armId)
    ? await db
        .select({ id: schema.arms.id, name: schema.arms.name })
        .from(schema.arms)
        .where(
          inArray(
            schema.arms.id,
            rows.map((r) => r.armId).filter(Boolean) as string[],
          ),
        )
    : [];

  for (const r of rows) {
    const mine = assessments.filter((a) => a.classId === r.id);
    const mineIds = new Set(mine.map((a) => a.id));
    const titleOf = new Map(mine.map((a) => [a.id, a.title]));

    const waiting = new Map<string, WaitingPaper>();
    for (const s of subs) {
      if (!mineIds.has(s.assessmentId)) continue;
      if (s.status !== "submitted" || gradedSubmissions.has(s.id)) continue;
      const d = days(s.submittedAt ?? s.updatedAt);
      const cur = waiting.get(s.assessmentId);
      waiting.set(s.assessmentId, {
        title: titleOf.get(s.assessmentId) ?? "Paper",
        count: (cur?.count ?? 0) + 1,
        oldestDays: Math.max(cur?.oldestDays ?? 0, d),
      });
    }
    const unpublished = new Map<string, WaitingPaper>();
    for (const g of grades) {
      if (!mineIds.has(g.assessmentId) || g.isPublished) continue;
      const d = days(g.gradedAt ?? g.updatedAt);
      const cur = unpublished.get(g.assessmentId);
      unpublished.set(g.assessmentId, {
        title: titleOf.get(g.assessmentId) ?? "Paper",
        count: (cur?.count ?? 0) + 1,
        oldestDays: Math.max(cur?.oldestDays ?? 0, d),
      });
    }

    const others = peers
      .filter(
        (p) =>
          p.id !== r.id &&
          p.subjectId === r.subjectId &&
          p.gradeLevelId === r.gradeLevelId &&
          p.teacher !== r.teacher,
      )
      .map((p) => averages.get(p.id)?.exact ?? null)
      .filter((v): v is number => v !== null);
    const cov = coverageOf.get(r.id);
    const avg = averages.get(r.id);

    facts.set(r.id, {
      classId: r.id,
      name: r.name,
      subject: r.subjectName ?? "",
      yearGroup: r.gradeName ?? null,
      learners: avg?.learners ?? 0,
      average: avg?.average ?? null,
      othersAverage: others.length
        ? Math.round(others.reduce((a, b) => a + b, 0) / others.length)
        : null,
      othersCount: others.length,
      papersSet: mine.length,
      awaitingMarks: [...waiting.values()],
      unpublished: [...unpublished.values()],
      notes:
        cov && cov.expectedNotes > 0
          ? {
              expected: cov.expectedNotes,
              written: cov.notes,
              ready: cov.finalized,
            }
          : null,
    });
    extra.set(r.id, {
      armName: arms.find((a) => a.id === r.armId)?.name ?? null,
      teacherUserId: r.teacher,
      room: r.room ?? null,
      assessmentIds: mine.map((a) => a.id),
      assessments: mine.map((a) => ({
        id: a.id,
        title: a.title,
        dueDate: (a as any).closesAt ?? (a as any).dueDate ?? null,
      })),
    });
  }
  return { facts, extra, passMark, policy, averages };
}

async function personOf(userId: string) {
  return (await rowOf(
    sql`SELECT name, email FROM "user" WHERE id = ${userId} LIMIT 1`,
  )) as { name: string | null; email: string | null } | undefined;
}

const counting = (policy: string) => ({
  publishedMarksOnly: true,
  missedWorkCountsAsZero: policy === "zero",
  classFigureIsMeanOfLearners: true,
});

/** One teacher: their classes with figures, what is waiting, and findings. */
export async function teacherProfileFor(
  userId: string,
  who: { orgId: string },
) {
  const { orgId } = who;
  const db = getDb();

  const [profile] = await db
    .select()
    .from(schema.schoolProfiles)
    .where(
      and(
        eq(schema.schoolProfiles.userId, userId),
        eq(schema.schoolProfiles.schoolId, orgId),
      ),
    )
    .limit(1);
  if (!profile || profile.schoolRole === "student") {
    throw new Error("Staff member not found.");
  }
  const person = await personOf(userId);

  const led = await db
    .select({ id: schema.classes.id })
    .from(schema.classes)
    .where(
      and(
        eq(schema.classes.orgId, orgId),
        eq(schema.classes.status, "active"),
        eq(schema.classes.primaryTeacherUserId, userId),
      ),
    );
  const supported = await db
    .select({ id: schema.classTeachers.classId })
    .from(schema.classTeachers)
    .innerJoin(
      schema.classes,
      eq(schema.classes.id, schema.classTeachers.classId),
    )
    .where(
      and(
        eq(schema.classTeachers.teacherUserId, userId),
        eq(schema.classes.orgId, orgId),
        eq(schema.classes.status, "active"),
      ),
    );
  const ledIds = led.map((c) => c.id);
  const supportIds = supported
    .map((c) => c.id)
    .filter((id) => !ledIds.includes(id));

  const loaded = await loadFacts(orgId, [...ledIds, ...supportIds], {
    teacherUserId: userId,
  });
  const ledFacts = ledIds.map((id) => loaded.facts.get(id)!).filter(Boolean);

  // Periods a week in the term running now, counting each period of a double.
  const today = new Date().toISOString().slice(0, 10);
  const terms = await db
    .select()
    .from(schema.terms)
    .where(eq(schema.terms.schoolId, orgId));
  const term =
    terms.find((t: any) => t.startDate <= today && t.endDate >= today) ??
    [...terms].sort((a: any, b: any) =>
      b.startDate.localeCompare(a.startDate),
    )[0];
  const periods = ledIds.length
    ? (
        await db
          .select({ id: schema.classSchedules.id })
          .from(schema.classSchedules)
          .where(
            and(
              inArray(schema.classSchedules.classId, ledIds),
              term
                ? or(
                    eq(schema.classSchedules.termId, term.id),
                    isNull(schema.classSchedules.termId),
                  )
                : undefined,
            ),
          )
      ).length
    : 0;

  const findings = teacherFindingsFor({
    passMark: loaded.passMark,
    classes: ledFacts,
  });

  const waiting = (xs: WaitingPaper[]) => xs.reduce((n, p) => n + p.count, 0);
  const classes = [...ledIds, ...supportIds]
    .map((id) => {
      const f = loaded.facts.get(id);
      if (!f) return null;
      return {
        ...f,
        role: ledIds.includes(id) ? ("leads" as const) : ("supports" as const),
        arm: loaded.extra.get(id)?.armName ?? null,
        room: loaded.extra.get(id)?.room ?? null,
        waitingForMarks: waiting(f.awaitingMarks),
        unpublishedMarks: waiting(f.unpublished),
      };
    })
    .filter(Boolean);

  return {
    teacher: {
      userId,
      name: person?.name ?? person?.email ?? null,
      email: person?.email ?? null,
      schoolRole: profile.schoolRole,
      specialisation: profile.subjectSpecialization ?? null,
      status: profile.status,
    },
    term: term ? { id: term.id, name: term.name } : null,
    passMark: loaded.passMark,
    summary: {
      classesLed: ledIds.length,
      classesSupported: supportIds.length,
      learners: ledFacts.reduce((n, c) => n + c.learners, 0),
      periodsPerWeek: periods,
      waitingForMarks: ledFacts.reduce(
        (n, c) => n + waiting(c.awaitingMarks),
        0,
      ),
      unpublishedMarks: ledFacts.reduce(
        (n, c) => n + waiting(c.unpublished),
        0,
      ),
    },
    classes,
    findings,
    counting: counting(loaded.policy),
  };
}

/** One class: who teaches it, how it is doing, learner by learner and paper by paper. */
export async function classProfileFor(classId: string, who: { orgId: string }) {
  const { orgId } = who;
  const db = getDb();

  const [cls] = await db
    .select()
    .from(schema.classes)
    .where(and(eq(schema.classes.id, classId), eq(schema.classes.orgId, orgId)))
    .limit(1);
  if (!cls) throw new Error("Class not found.");

  const loaded = await loadFacts(orgId, [classId], {
    gradeLevelId: cls.gradeLevelId,
    subjectId: cls.subjectId,
  });
  const fact = loaded.facts.get(classId)!;
  const extra = loaded.extra.get(classId)!;
  const avg = loaded.averages.get(classId);

  // Teachers.
  const support = await db
    .select()
    .from(schema.classTeachers)
    .where(eq(schema.classTeachers.classId, classId));
  const teacherIds = [
    ...new Set([
      cls.primaryTeacherUserId,
      ...support.map((s) => s.teacherUserId),
    ]),
  ];
  const labels = await getUserLabels(teacherIds);
  const teachers = teacherIds
    .map((id) => ({
      userId: id,
      name: labelFor(labels, id) ?? null,
      role:
        id === cls.primaryTeacherUserId
          ? ("leads" as const)
          : ((support.find((s) => s.teacherUserId === id)?.role ??
              "support") as string),
    }))
    .filter((t) => t.name);

  // Learners with their figures.
  const enrolled = await db
    .select({ userId: schema.classEnrollments.studentUserId })
    .from(schema.classEnrollments)
    .where(
      and(
        eq(schema.classEnrollments.classId, classId),
        eq(schema.classEnrollments.status, "active"),
      ),
    );
  const students = enrolled.length
    ? await db
        .select({ id: schema.students.id, userId: schema.students.userId })
        .from(schema.students)
        .where(
          inArray(
            schema.students.userId,
            enrolled.map((e) => e.userId),
          ),
        )
    : [];
  const studentLabels = await getUserLabels(students.map((s) => s.userId));
  const learners = (avg?.figures ?? [])
    .map((f) => {
      const s = students.find((x) => x.id === f.studentId);
      return {
        studentId: f.studentId,
        name: (s && labelFor(studentLabels, s.userId)) || "Learner",
        percentage: f.percentage === null ? null : Math.round(f.percentage),
        nothingHandedIn: f.nothingHandedIn,
      };
    })
    .sort(
      (a, b) =>
        (a.percentage ?? 101) - (b.percentage ?? 101) ||
        a.name.localeCompare(b.name),
    );

  // Papers: average of published marks and who handed in.
  const ids = extra.assessmentIds;
  const grades = ids.length
    ? await db
        .select({
          assessmentId: schema.grades.assessmentId,
          percentage: schema.grades.percentage,
          isPublished: schema.grades.isPublished,
        })
        .from(schema.grades)
        .where(inArray(schema.grades.assessmentId, ids))
    : [];
  const subs = ids.length
    ? await db
        .select({
          assessmentId: schema.submissions.assessmentId,
          status: schema.submissions.status,
        })
        .from(schema.submissions)
        .where(inArray(schema.submissions.assessmentId, ids))
    : [];
  const papers = extra.assessments.map((a) => {
    const marks = grades
      .filter((g) => g.assessmentId === a.id && g.isPublished)
      .map((g) => parseFloat(g.percentage ?? ""))
      .filter((n) => Number.isFinite(n));
    const handedIn = subs.filter(
      (s) =>
        s.assessmentId === a.id &&
        (s.status === "submitted" || s.status === "graded"),
    ).length;
    return {
      id: a.id,
      title: a.title,
      dueDate: a.dueDate,
      marked: marks.length,
      average: marks.length
        ? Math.round(marks.reduce((x, y) => x + y, 0) / marks.length)
        : null,
      handedIn,
      enrolled: enrolled.length,
    };
  });

  const findings = classFindingsFor({
    passMark: loaded.passMark,
    cls: fact,
    learners: learners.map((l) => ({
      name: l.name,
      percentage: l.percentage,
      nothingHandedIn: l.nothingHandedIn,
    })),
    papers,
  });

  return {
    class: {
      id: cls.id,
      name: cls.name,
      subject: fact.subject,
      yearGroup: fact.yearGroup,
      arm: extra.armName,
      room: extra.room,
      status: cls.status,
    },
    teachers,
    passMark: loaded.passMark,
    summary: {
      learners: enrolled.length,
      average: fact.average,
      othersAverage: fact.othersAverage,
      othersCount: fact.othersCount,
      papersSet: fact.papersSet,
      waitingForMarks: fact.awaitingMarks.reduce((n, p) => n + p.count, 0),
      unpublishedMarks: fact.unpublished.reduce((n, p) => n + p.count, 0),
      notes: fact.notes,
    },
    learners,
    papers,
    findings,
    counting: counting(loaded.policy),
  };
}
