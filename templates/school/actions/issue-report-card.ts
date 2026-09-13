import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";

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

    // One row per subject.
    const subjects = classes
      .map((cls: any) => {
        const forClass = assessments.filter((a: any) => a.classId === cls.id);
        const mine = grades.filter((g: any) =>
          forClass.some((a: any) => a.id === g.assessmentId),
        );
        if (mine.length === 0) {
          return {
            subject: cls.subjectName ?? cls.name,
            assessmentsCounted: 0,
            percentage: null,
            grade: null,
          };
        }
        const percentage =
          mine.reduce(
            (sum: number, g: any) => sum + parseFloat(g.percentage ?? "0"),
            0,
          ) / mine.length;
        return {
          subject: cls.subjectName ?? cls.name,
          assessmentsCounted: mine.length,
          percentage: Math.round(percentage),
          grade: letterFor(percentage),
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

    const snapshot = {
      student: { id: args.studentId, name: studentName },
      term: { id: term.id, name: term.name, ends: term.endDate },
      subjects,
      overall,
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

  lines.push("| Subject | Assessments | Score | Grade |");
  lines.push("| --- | --- | --- | --- |");
  for (const row of s.subjects) {
    lines.push(
      `| ${row.subject} | ${row.assessmentsCounted || "—"} | ${
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
