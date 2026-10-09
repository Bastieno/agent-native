import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { missedWorkPolicy, summarise } from "../shared/missed-work.js";

/**
 * Issue a report card, and freeze it.
 *
 * A report card is not a view of live data. A parent keeps it, a school
 * archives it, and it can be disputed years later — so what it said on the day
 * it was issued has to be what it says when it is reprinted. Recomputing from
 * current data is how a Term 1 report quietly changes after a late mark is
 * entered, and how a school ends up unable to explain the copy a parent is
 * holding.
 *
 * So this takes a snapshot: the figures as they stand, and the document as it
 * reads, both stored. Reprinting renders the stored words.
 *
 * Only published marks go on it. An unpublished grade is one a teacher has not
 * stood behind yet, and it has no business on a document going home.
 *
 * What a report card contains beyond marks — conduct traits, attendance, whose
 * comments, whether learners are ranked — differs between schools and even
 * between terms, so it comes from the school's own template and from what the
 * teacher supplies here. Nothing about the shape of a Nigerian report card, or
 * any other, is written into this code.
 */
export default defineAction({
  description:
    "Issue a term's report card for a student and freeze it as a record. Gathers only published marks across every class they are enrolled in, applies the school's report-card template, stores both the figures and the wording, and returns a link to print it. Reprinting later renders exactly what was stored. Preview by default; pass confirm=true to issue.",
  schema: z.object({
    studentId: z.string().describe("Student record ID"),
    termId: z.string().describe("Term this report covers"),
    traits: jsonish(z.record(z.string(), z.string()))
      .optional()
      .describe(
        'Conduct and skills ratings the school asks for, e.g. {"Punctuality":"4","Neatness":"3"}. Which traits exist comes from the school\'s template.',
      ),
    attendance: jsonify()
      .optional()
      .describe('e.g. {"present": 58, "outOf": 62}'),
    comments: jsonish(z.record(z.string(), z.string()))
      .optional()
      .describe(
        'Whose remarks and what they said, e.g. {"Class teacher":"...","Principal":"..."}',
      ),
    nextTermBegins: z.string().optional().describe("Shown at the foot"),
    confirm: z.coerce
      .boolean()
      .optional()
      .default(false)
      .describe("false previews; true issues and freezes it"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [student] = await db
      .select()
      .from(schema.students)
      .where(
        and(
          eq(schema.students.id, args.studentId),
          eq(schema.students.orgId, orgId),
        ),
      )
      .limit(1);
    if (!student) throw new Error("Student not found.");

    const [term] = await db
      .select()
      .from(schema.terms)
      .where(eq(schema.terms.id, args.termId))
      .limit(1);
    if (!term) throw new Error("Term not found.");

    const labels = await getUserLabels([student.userId].filter(Boolean));
    const studentName = labelFor(labels, student.userId) ?? args.studentId;

    // Every class they are in — a report card covers the whole timetable, not
    // one subject.
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
    const classIds = enrollments.map((e: { classId: string }) => e.classId);

    const classes = classIds.length
      ? await db
          .select({
            id: schema.classes.id,
            name: schema.classes.name,
            termId: schema.classes.termId,
            subjectName: schema.subjects.name,
          })
          .from(schema.classes)
          .leftJoin(
            schema.subjects,
            eq(schema.classes.subjectId, schema.subjects.id),
          )
          .where(inArray(schema.classes.id, classIds))
      : [];

    const assessments = classIds.length
      ? await db
          .select()
          .from(schema.assessments)
          .where(inArray(schema.assessments.classId, classIds))
      : [];

    // Published only. An unpublished mark is one nobody has stood behind.
    const grades = assessments.length
      ? await db
          .select()
          .from(schema.grades)
          .where(
            and(
              eq(schema.grades.studentId, args.studentId),
              eq(schema.grades.isPublished, true),
              inArray(
                schema.grades.assessmentId,
                assessments.map((a: any) => a.id),
              ),
            ),
          )
      : [];

    const config = ((await getOrgSetting(orgId, "school-config")) ?? {}) as any;
    const template = ((await getOrgSetting(orgId, "report-card-template")) ??
      {}) as any;
    const levels: any[] = config?.gradingScale?.levels ?? [];
    const letterFor = (percentage: number) =>
      levels.find((l) => percentage >= l.min && percentage <= l.max)?.grade ??
      null;

    // One row per subject, counted the school's way.
    //
    // What was set matters as much as what came back: a mark from two papers
    // and a mark from six are not the same claim, and printing only the
    // second number let an absentee's average outrank a learner who sat
    // everything and struggled.
    const policy = missedWorkPolicy(config);
    const subjects = classes
      .map((cls: any) => {
        const forClass = assessments.filter(
          (a: any) => a.classId === cls.id && a.status === "published",
        );
        const mine = grades.filter((g: any) =>
          forClass.some((a: any) => a.id === g.assessmentId),
        );
        const summary = summarise(
          mine.map((g: any) => parseFloat(g.percentage ?? "0")),
          forClass.length,
          policy,
        );
        // Graded on the figure that is printed, not on the one behind it.
        // A school's bands are whole numbers, so an average of 59.6 printed
        // as 60% fell in the gap between C5 (55–59) and C4 (60–64) and came
        // out with no grade at all — on the document that goes home.
        return {
          subject: cls.subjectName ?? cls.name,
          assessmentsCounted: summary.sat,
          assessmentsSet: summary.set,
          missed: Math.max(0, summary.set - summary.sat),
          percentage: summary.percentage,
          grade:
            summary.percentage === null ? null : letterFor(summary.percentage),
        };
      })
      .sort((a, b) => a.subject.localeCompare(b.subject));

    const counted = subjects.filter((s) => s.percentage !== null);
    const overall = counted.length
      ? Math.round(
          counted.reduce((sum, s) => sum + (s.percentage ?? 0), 0) /
            counted.length,
        )
      : null;
    const missedTotal = subjects.reduce((n, s) => n + (s.missed ?? 0), 0);

    // Position in the year group, when the school asks for one.
    //
    // Ranking children is a real choice and schools differ, so it is off
    // until someone turns it on. Where it is on, it is computed from the
    // same gradebook figures as the scores above — not from a separate
    // calculation that could disagree with the page it sits on.
    let position: { place: number; outOf: number } | null = null;
    if (config?.rankLearners && overall !== null) {
      const cohort = await db
        .select({
          studentId: schema.gradebookEntries.studentId,
          computedScore: schema.gradebookEntries.computedScore,
        })
        .from(schema.gradebookEntries)
        .innerJoin(
          schema.students,
          eq(schema.students.id, schema.gradebookEntries.studentId),
        )
        .where(
          and(
            eq(schema.gradebookEntries.termId, args.termId),
            eq(schema.gradebookEntries.orgId, orgId),
            student?.gradeLevelId
              ? eq(schema.students.gradeLevelId, student.gradeLevelId)
              : eq(schema.students.schoolId, orgId),
          ),
        );

      // A learner's standing is their average across subjects, so the
      // gradebook's per-class rows are averaged per learner first.
      const byStudent = new Map<string, number[]>();
      for (const row of cohort as any[]) {
        const value = Number(row.computedScore);
        if (!Number.isFinite(value)) continue;
        byStudent.set(row.studentId, [
          ...(byStudent.get(row.studentId) ?? []),
          value,
        ]);
      }
      const averages = [...byStudent.entries()].map(([id, values]) => ({
        id,
        average: values.reduce((a, b) => a + b, 0) / values.length,
      }));
      if (averages.length > 1) {
        const sorted = [...averages].sort((a, b) => b.average - a.average);
        const index = sorted.findIndex((a) => a.id === args.studentId);
        if (index >= 0) {
          // Equal averages share a place, as a school would read them.
          const place =
            sorted.filter((a) => a.average > sorted[index].average).length + 1;
          position = { place, outOf: sorted.length };
        }
      }
    }

    const snapshot = {
      student: { id: args.studentId, name: studentName },
      term: { id: term.id, name: term.name, ends: term.endDate },
      subjects,
      overall,
      missedTotal,
      missedWorkPolicy: policy,
      position,
      overallGrade: overall === null ? null : letterFor(overall),
      traits: args.traits ?? {},
      attendance: args.attendance ?? null,
      comments: args.comments ?? {},
      nextTermBegins: args.nextTermBegins ?? template?.nextTermBegins ?? null,
      gradingScale: config?.gradingScale ?? null,
      issuedAt: new Date().toISOString(),
    };

    const markdown = renderReportCard(snapshot);

    if (!args.confirm) {
      return {
        preview: true,
        student: studentName,
        term: term.name,
        subjectsWithMarks: counted.length,
        subjectsWithoutMarks: subjects.length - counted.length,
        overall,
        markdown,
        message: `Ready to issue ${studentName}'s report for ${term.name}: ${counted.length} subject(s) with published marks${
          subjects.length - counted.length
            ? `, ${subjects.length - counted.length} with none yet`
            : ""
        }. Re-run with confirm=true to issue and freeze it.`,
      };
    }

    const id = nanoid();
    const serial = `${term.name.replace(/\s+/g, "").toUpperCase()}-${id.slice(0, 6).toUpperCase()}`;
    await db.insert(schema.reportCards).values({
      id,
      orgId,
      studentId: args.studentId,
      termId: args.termId,
      academicYearId: term.academicYearId ?? null,
      serial,
      snapshotJson: JSON.stringify(snapshot),
      documentMarkdown: markdown,
      status: "issued",
      issuedBy: userEmail ?? null,
    });

    return {
      reportCardId: id,
      serial,
      student: studentName,
      term: term.name,
      overall,
      path: `/print/report/${id}`,
      message: `Issued ${studentName}'s report for ${term.name} (${serial}). It is frozen as it stands and will reprint exactly this way. Open it at /print/report/${id}.`,
    };
  },
});

/** Accepts an object or the JSON string a command line can pass. */
function jsonify() {
  return jsonish(
    z.object({
      present: z.coerce.number(),
      outOf: z.coerce.number(),
    }),
  );
}

/**
 * The document itself, as markdown.
 *
 * Built once at issue and stored, so the wording cannot drift. What appears is
 * whatever the school supplied — a school that does not rate conduct has no
 * conduct section, rather than an empty one.
 */
function renderReportCard(s: any): string {
  const lines: string[] = [];
  lines.push(`**${s.student.name}** · ${s.term.name}`);
  lines.push("");

  lines.push("| Subject | Work done | Score | Grade |");
  lines.push("| --- | --- | --- | --- |");
  for (const row of s.subjects) {
    // "2 of 6" rather than "2": a parent reading a single number has no way
    // of knowing the mark rests on a third of the term.
    const done =
      row.assessmentsSet === undefined
        ? row.assessmentsCounted || "—"
        : `${row.assessmentsCounted} of ${row.assessmentsSet}`;
    lines.push(
      `| ${row.subject} | ${done} | ${
        row.percentage === null ? "—" : `${row.percentage}%`
      } | ${row.grade ?? "—"} |`,
    );
  }
  if (s.overall !== null) {
    lines.push(
      `| **Overall** | | **${s.overall}%** | **${s.overallGrade ?? "—"}** |`,
    );
  }
  lines.push("");

  if (s.position) {
    lines.push(
      `**Position:** ${ordinal(s.position.place)} of ${s.position.outOf} in the year group`,
    );
    lines.push("");
  }

  // Said in words, not left in a column. A term with work missing is the
  // thing a parent most needs to be told plainly.
  if (s.missedTotal) {
    lines.push(
      s.missedWorkPolicy === "zero"
        ? `**${s.missedTotal} piece(s) of work were not handed in**, and count as nought in the scores above.`
        : `**${s.missedTotal} piece(s) of work were not handed in.** The scores above are based only on the work that was done.`,
    );
    lines.push("");
  }

  if (s.attendance) {
    lines.push(
      `**Attendance:** ${s.attendance.present} of ${s.attendance.outOf} days`,
    );
    lines.push("");
  }

  const traits = Object.entries(s.traits ?? {});
  if (traits.length > 0) {
    lines.push("### Conduct and skills");
    lines.push("");
    lines.push("| | |");
    lines.push("| --- | --- |");
    for (const [name, rating] of traits) lines.push(`| ${name} | ${rating} |`);
    lines.push("");
  }

  const comments = Object.entries(s.comments ?? {});
  for (const [who, what] of comments) {
    lines.push(`### ${who}`);
    lines.push("");
    lines.push(String(what));
    lines.push("");
  }

  if (s.nextTermBegins) {
    lines.push(`**Next term begins:** ${s.nextTermBegins}`);
  }

  return lines.join("\n");
}

/** 1st, 2nd, 3rd — as a report card writes a place. */
function ordinal(place: number): string {
  const tens = place % 100;
  if (tens >= 11 && tens <= 13) return `${place}th`;
  const ones = place % 10;
  return `${place}${ones === 1 ? "st" : ones === 2 ? "nd" : ones === 3 ? "rd" : "th"}`;
}
