import { getOrgSetting } from "@agent-native/core/settings";
import { and, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { parseActivityContent } from "../../shared/activity-content.js";
import { getUserLabels, labelFor } from "./user-names.js";

/**
 * The marks that count as a paper's average: published, and a real number.
 * A zero is a mark. Everything that quotes a paper's average goes through
 * here, so the page, the assistant and a teacher's own AI app say the same
 * thing about the same paper.
 */
export function publishedPercentages(
  grades: Array<{ percentage: string | null; isPublished: boolean | null }>,
): number[] {
  return grades
    .filter((g) => g.isPublished)
    .map((g) => parseFloat(g.percentage ?? ""))
    .filter((n) => Number.isFinite(n));
}

export function paperAverage(marks: number[]): number | null {
  return marks.length
    ? Math.round(marks.reduce((a, b) => a + b, 0) / marks.length)
    : null;
}

/**
 * How a class did on one paper, in figures a person can act on.
 *
 * It says what happened and stops: who has not handed in, where the marks
 * sit against the pass mark, and which questions were most often missed. It
 * does not say why. A hard paper, a topic not yet taught and missed work look
 * the same from here, so the reader is left to ask the teacher.
 */
export async function paperProfileFor(assessmentId: string, orgId: string) {
  const db = getDb();
  const [paper] = await db
    .select()
    .from(schema.assessments)
    .where(
      and(
        eq(schema.assessments.id, assessmentId),
        eq(schema.assessments.orgId, orgId),
      ),
    )
    .limit(1);
  if (!paper) throw new Error("Activity not found.");

  const config = ((await getOrgSetting(orgId, "school-config")) ?? {}) as any;
  const passMark: number = config?.passMark ?? 50;

  const [cls] = await db
    .select({ id: schema.classes.id, name: schema.classes.name })
    .from(schema.classes)
    .where(eq(schema.classes.id, paper.classId))
    .limit(1);

  const enrolled = await db
    .select({ userId: schema.classEnrollments.studentUserId })
    .from(schema.classEnrollments)
    .where(
      and(
        eq(schema.classEnrollments.classId, paper.classId),
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
            enrolled.map((e: any) => e.userId),
          ),
        )
    : [];
  const labels = await getUserLabels(students.map((s: any) => s.userId));

  const subs = await db
    .select()
    .from(schema.submissions)
    .where(eq(schema.submissions.assessmentId, assessmentId));
  const grades = await db
    .select()
    .from(schema.grades)
    .where(eq(schema.grades.assessmentId, assessmentId));

  const handedInIds = new Set(
    subs
      .filter((s: any) => s.status === "submitted" || s.status === "graded")
      .map((s: any) => s.studentId),
  );
  const notHandedIn = students
    .filter((s: any) => !handedInIds.has(s.id))
    .map((s: any) => ({
      studentId: s.id,
      name: labelFor(labels, s.userId) ?? "A learner",
    }))
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  const marks = publishedPercentages(grades as any);
  const publishedIds = new Set(
    grades.filter((g: any) => g.isPublished).map((g: any) => g.studentId),
  );
  // Handed in but with no published mark yet.
  const waitingForMarks = [...handedInIds].filter(
    (id) => !publishedIds.has(id),
  ).length;

  const below = marks.filter((m) => m < passMark).length;
  const high = marks.filter((m) => m >= 70).length;
  const spread = [
    { label: `Below ${passMark}%`, count: below },
    { label: `${passMark}% to 69%`, count: marks.length - below - high },
    { label: "70% and above", count: high },
  ];

  // Which questions were most often missed. Each learner may have been given a
  // different version, so a question is told apart by its version and place.
  const variants = await db
    .select()
    .from(schema.assessmentVariants)
    .where(eq(schema.assessmentVariants.assessmentId, assessmentId));
  const blocksOf = new Map<string, any[]>();
  for (const v of variants as any[]) {
    const content = parseActivityContent(v.contentJson, paper.renderAs);
    if (content?.shape === "questions")
      blocksOf.set(v.id, content.blocks as any[]);
  }
  const subVariant = new Map<string, string | null>(
    subs.map((s: any) => [s.id, s.variantId ?? null]),
  );
  const responses = blocksOf.size
    ? await db
        .select({
          submissionId: schema.questionResponses.submissionId,
          blockIndex: schema.questionResponses.blockIndex,
          isCorrect: schema.questionResponses.isCorrect,
          awardedPoints: schema.questionResponses.awardedPoints,
          answer: schema.questionResponses.answer,
        })
        .from(schema.questionResponses)
        .where(eq(schema.questionResponses.assessmentId, assessmentId))
    : [];

  const tally = new Map<
    string,
    { variantId: string | null; index: number; seen: number; lost: number }
  >();
  for (const r of responses as any[]) {
    const variantId =
      subVariant.get(r.submissionId) ?? [...blocksOf.keys()][0] ?? null;
    const block = variantId ? blocksOf.get(variantId)?.[r.blockIndex] : null;
    if (!block) continue;
    // How much of the question this answer earned, 0 to 1.
    let earned: number | null = null;
    if (
      typeof block.points === "number" &&
      block.points > 0 &&
      r.awardedPoints != null
    ) {
      earned = Math.min(1, r.awardedPoints / block.points);
    } else if (r.isCorrect != null) {
      earned = r.isCorrect ? 1 : 0;
    }
    if (earned === null) continue; // not marked yet
    const key = `${variantId}:${r.blockIndex}`;
    const t = tally.get(key) ?? {
      variantId,
      index: r.blockIndex,
      seen: 0,
      lost: 0,
    };
    t.seen += 1;
    t.lost += 1 - earned;
    tally.set(key, t);
  }
  const MIN_ANSWERS = 3;
  const questions = [...tally.values()]
    .filter((t) => t.seen >= MIN_ANSWERS)
    .map((t) => {
      const block = blocksOf.get(t.variantId ?? "")?.[t.index];
      const variant = variants.find((v: any) => v.id === t.variantId) as any;
      return {
        number: t.index + 1,
        prompt: String(block?.prompt ?? "")
          .replace(/\s+/g, " ")
          .slice(0, 140),
        version: variants.length > 1 ? (variant?.label ?? null) : null,
        answered: t.seen,
        earnedPercent: Math.round((1 - t.lost / t.seen) * 100),
      };
    })
    .filter((q) => q.earnedPercent < 100)
    .sort((a, b) => a.earnedPercent - b.earnedPercent)
    .slice(0, 5);

  return {
    paper: {
      id: paper.id,
      title: paper.title,
      format: paper.format,
      status: paper.status,
      classId: paper.classId,
      className: cls?.name ?? null,
    },
    passMark,
    enrolled: students.length,
    handedIn: handedInIds.size,
    notHandedIn,
    marked: marks.length,
    waitingForMarks,
    average: paperAverage(marks),
    spread,
    questions,
    counting: [
      "The average is the mean of this paper's published marks. A mark of zero counts; work not handed in has no mark and is listed separately.",
      `Below ${passMark}% is the school's pass mark.`,
      `A question is listed when at least ${MIN_ANSWERS} answers to it have been marked, ranked by the share of its marks the class earned.`,
      "These are figures, not causes: a hard paper, a topic not yet taught and missed work look the same here.",
    ],
  };
}
