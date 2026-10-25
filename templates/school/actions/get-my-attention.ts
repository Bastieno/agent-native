import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { and, desc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { actorForEmail } from "../server/lib/class-access.js";
import {
  classAveragesFor,
  isStrugglingFigure,
} from "../server/lib/class-averages.js";
import { carriesMarks } from "../server/lib/gradebook.js";
import { sharedWithClass } from "../server/lib/shared-with-class.js";
import { audienceOf } from "../server/lib/audience.js";
import { missedWorkPolicy } from "../shared/missed-work.js";

/**
 * What a teacher needs to know or do, most pressing first, each with the page
 * that does it.
 *
 * It is the one place the list is made, so the dashboard and the teacher's own
 * AI app say the same thing. Nothing here is counted afresh: each line is a
 * count of something already in the data (handed in and not marked, marked and
 * not published, this week's lesson note not ready, drafts nobody has read,
 * learners who are struggling).
 */
export default defineAction({
  description:
    "What the signed-in teacher needs to know or do, most pressing first, each with a link: work handed in and waiting to be marked, marks ready to publish, this week's lesson notes not ready, drafts waiting to be read and shared, and classes with learners who are struggling. Use it for 'what needs my attention?' or 'what should I do today?'.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { userEmail, orgId } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (!actor || !orgId) return { items: [] };
    const db = getDb();

    // The classes this person teaches, as main or supporting teacher. An admin
    // or coordinator is not given the whole school's work as theirs.
    const primary = await db
      .select({ id: schema.classes.id })
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.primaryTeacherUserId, actor.userId),
          eq(schema.classes.orgId, orgId),
        ),
      );
    const assigned = await db
      .select({ id: schema.classTeachers.classId })
      .from(schema.classTeachers)
      .where(eq(schema.classTeachers.teacherUserId, actor.userId));
    const classIds = [
      ...new Set([...primary.map((r) => r.id), ...assigned.map((r) => r.id)]),
    ];
    if (classIds.length === 0) return { items: [] };

    const classes = await db
      .select({ id: schema.classes.id, name: schema.classes.name })
      .from(schema.classes)
      .where(inArray(schema.classes.id, classIds));
    const className = new Map(classes.map((c) => [c.id, c.name]));
    const base = "/teacher";
    const plural = (n: number, one: string, many: string) =>
      `${n} ${n === 1 ? one : many}`;

    type Item = {
      id: string;
      kind: "mark" | "publish" | "note" | "draft" | "struggling";
      text: string;
      detail: string | null;
      href: string;
    };
    const items: Item[] = [];

    // Marked work: handed in and not yet marked, and marked but not published.
    const papers = await db
      .select({
        id: schema.assessments.id,
        title: schema.assessments.title,
        classId: schema.assessments.classId,
        status: schema.assessments.status,
      })
      .from(schema.assessments)
      .where(
        and(
          inArray(schema.assessments.classId, classIds),
          sharedWithClass(),
          carriesMarks(),
        ),
      );
    if (papers.length > 0) {
      const ids = papers.map((p) => p.id);
      const subs = await db
        .select({
          assessmentId: schema.submissions.assessmentId,
          studentId: schema.submissions.studentId,
          status: schema.submissions.status,
        })
        .from(schema.submissions)
        .where(inArray(schema.submissions.assessmentId, ids));
      const grades = await db
        .select({
          assessmentId: schema.grades.assessmentId,
          studentId: schema.grades.studentId,
          isPublished: schema.grades.isPublished,
        })
        .from(schema.grades)
        .where(inArray(schema.grades.assessmentId, ids));
      const gradedKey = new Set(
        grades.map((g) => `${g.assessmentId}:${g.studentId}`),
      );

      const waiting: Array<{ paper: (typeof papers)[number]; n: number }> = [];
      const toPublish: Array<{ paper: (typeof papers)[number]; n: number }> =
        [];
      for (const paper of papers) {
        const n = subs.filter(
          (s) =>
            s.assessmentId === paper.id &&
            (s.status === "submitted" || s.status === "graded") &&
            !gradedKey.has(`${paper.id}:${s.studentId}`),
        ).length;
        if (n > 0) waiting.push({ paper, n });
        const unpublished = grades.filter(
          (g) => g.assessmentId === paper.id && !g.isPublished,
        ).length;
        if (unpublished > 0 && paper.status === "published") {
          toPublish.push({ paper, n: unpublished });
        }
      }
      for (const w of waiting.sort((a, b) => b.n - a.n).slice(0, 3)) {
        items.push({
          id: `mark:${w.paper.id}`,
          kind: "mark",
          text: `${plural(w.n, "paper", "papers")} to mark in ${w.paper.title}`,
          detail: className.get(w.paper.classId) ?? null,
          href: `${base}/assessments/${w.paper.id}?tab=submissions`,
        });
      }
      for (const p of toPublish.sort((a, b) => b.n - a.n).slice(0, 3)) {
        items.push({
          id: `publish:${p.paper.id}`,
          kind: "publish",
          text: `Marks for ${p.paper.title} are ready to publish`,
          detail: `${className.get(p.paper.classId) ?? ""} · ${plural(p.n, "mark", "marks")}`,
          href: `${base}/assessments/${p.paper.id}`,
        });
      }
    }

    // This week's lesson notes that are not ready to teach from.
    const today = new Date();
    const day = (d: Date) => d.toISOString().slice(0, 10);
    const weekAgo = day(new Date(today.getTime() - 6 * 86_400_000));
    const notes = await db
      .select({
        id: schema.lessonNotes.id,
        title: schema.lessonNotes.title,
        classId: schema.lessonNotes.classId,
        status: schema.lessonNotes.status,
        lessonDate: schema.lessonNotes.lessonDate,
      })
      .from(schema.lessonNotes)
      .where(inArray(schema.lessonNotes.classId, classIds));
    for (const n of notes
      .filter(
        (n) =>
          n.lessonDate &&
          n.lessonDate.slice(0, 10) >= weekAgo &&
          n.lessonDate.slice(0, 10) <= day(today) &&
          n.status !== "finalized",
      )
      .slice(0, 3)) {
      items.push({
        id: `note:${n.id}`,
        kind: "note",
        text: `This week's lesson note is not ready: ${n.title}`,
        detail: className.get(n.classId) ?? null,
        href: `${base}/lessons/${n.id}`,
      });
    }

    // Drafts nobody has read yet, in the classes they teach.
    const drafts = await db
      .select({
        id: schema.assessments.id,
        title: schema.assessments.title,
        classId: schema.assessments.classId,
        audienceStudentIdsJson: schema.assessments.audienceStudentIdsJson,
      })
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.orgId, orgId),
          eq(schema.assessments.status, "draft"),
          inArray(schema.assessments.classId, classIds),
        ),
      )
      .orderBy(desc(schema.assessments.createdAt))
      .limit(4);
    for (const d of drafts) {
      const forN = audienceOf(d)?.length ?? 0;
      items.push({
        id: `draft:${d.id}`,
        kind: "draft",
        text: `Read and share: ${d.title}`,
        detail: [
          className.get(d.classId),
          forN > 0 ? `for ${plural(forN, "learner", "learners")} only` : null,
        ]
          .filter(Boolean)
          .join(" · "),
        href: `${base}/assessments/${d.id}`,
      });
    }

    // Classes with learners who are struggling, counted as everywhere else.
    const config = ((await getOrgSetting(orgId, "school-config")) ?? {}) as any;
    const averages = await classAveragesFor(classIds, missedWorkPolicy(config));
    const passMark: number = config?.passMark ?? 50;
    const struggling = classIds
      .map((id) => ({
        id,
        n: (averages.get(id)?.figures ?? []).filter((f) =>
          isStrugglingFigure(f, passMark),
        ).length,
      }))
      .filter((c) => c.n > 0)
      .sort((a, b) => b.n - a.n)
      .slice(0, 3);
    for (const c of struggling) {
      items.push({
        id: `struggling:${c.id}`,
        kind: "struggling",
        text: `${plural(c.n, "learner is", "learners are")} struggling in ${className.get(c.id) ?? "a class"}`,
        detail: "See who, and what could help",
        href: `${base}/analytics`,
      });
    }

    return { items: items.slice(0, 10) };
  },
});
