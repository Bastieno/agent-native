import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { isUnassignedTeacher } from "../shared/class-teacher.js";
import { findTerm } from "../server/lib/timetable.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { openProposal } from "../server/lib/timetable-generation.js";
import type { ProposedLesson } from "../server/lib/timetable-generator.js";

export default defineAction({
  description:
    "The timetable drafted for a term and still waiting to be accepted or discarded: each lesson it would place (with its class name, subject, arm, option arms, teachers, day, period, time and room), why some lessons did not fit, the classes left out for want of a lesson count or a teacher, and a summary. proposal is null when nothing is waiting.",
  schema: z.object({ termId: z.string() }),
  http: { method: "GET" },
  readOnly: true,
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const term = await findTerm(orgId, args.termId);
    if (!term) throw new Error("That term is not in this school.");
    const row = await openProposal(orgId, term.id);
    if (!row) {
      return {
        proposal: null,
        message: `Nothing is drafted for ${term.name}.`,
      };
    }

    const lessons: ProposedLesson[] = JSON.parse(row.lessonsJson);
    const ids = [...new Set(lessons.map((l) => l.classId))];
    type Info = {
      className: string;
      subjectName: string;
      armId: string | null;
      optionArmIds: string[];
      teachers: { userId: string; name: string }[];
    };
    const info = new Map<string, Info>();
    if (ids.length) {
      const db = getDb();
      const [classRows, optionRows, teacherRows] = await Promise.all([
        db
          .select()
          .from(schema.classes)
          .where(
            and(
              eq(schema.classes.orgId, orgId),
              inArray(schema.classes.id, ids),
            ),
          ),
        db
          .select()
          .from(schema.classArms)
          .where(inArray(schema.classArms.classId, ids)),
        db
          .select()
          .from(schema.classTeachers)
          .where(
            and(
              inArray(schema.classTeachers.classId, ids),
              inArray(schema.classTeachers.role, ["primary", "support"]),
            ),
          ),
      ]);
      const subjectIds = [
        ...new Set((classRows as any[]).map((c) => c.subjectId as string)),
      ];
      const subjectRows = subjectIds.length
        ? await db
            .select()
            .from(schema.subjects)
            .where(
              and(
                eq(schema.subjects.schoolId, orgId),
                inArray(schema.subjects.id, subjectIds),
              ),
            )
        : [];
      const subjectName = new Map(
        (subjectRows as any[]).map((s) => [s.id as string, s.name as string]),
      );
      // Primary first, then support; each person once, no unassigned marker.
      const teacherIds = new Map<string, string[]>();
      for (const c of classRows as any[]) {
        teacherIds.set(
          c.id,
          isUnassignedTeacher(c.primaryTeacherUserId)
            ? []
            : [c.primaryTeacherUserId],
        );
      }
      const rank = (r: any) => (r.role === "primary" ? 0 : 1);
      for (const t of [...(teacherRows as any[])].sort(
        (a, b) => rank(a) - rank(b),
      )) {
        if (isUnassignedTeacher(t.teacherUserId)) continue;
        const list = teacherIds.get(t.classId);
        if (list && !list.includes(t.teacherUserId)) list.push(t.teacherUserId);
      }
      const labels = await getUserLabels([...teacherIds.values()].flat());
      for (const c of classRows as any[]) {
        info.set(c.id, {
          className: c.name,
          subjectName: subjectName.get(c.subjectId) ?? "",
          armId: c.armId ?? null,
          optionArmIds: (optionRows as any[])
            .filter((o) => o.classId === c.id)
            .map((o) => o.armId as string),
          teachers: (teacherIds.get(c.id) ?? []).map((userId) => ({
            userId,
            name: labelFor(labels, userId) ?? "",
          })),
        });
      }
    }
    const summary = JSON.parse(row.summaryJson) as Record<string, any>;
    return {
      proposal: {
        id: row.id,
        createdAt: row.createdAt,
        lessons: lessons.map((l) => {
          const c = info.get(l.classId);
          return {
            ...l,
            className: c?.className ?? "",
            subjectName: c?.subjectName ?? "",
            armId: c?.armId ?? null,
            optionArmIds: c?.optionArmIds ?? [],
            teachers: c?.teachers ?? [],
          };
        }),
        reasons: JSON.parse(row.unplacedJson),
        notSet: summary.notSet ?? [],
        noTeacher: summary.noTeacher ?? [],
        summary: {
          lessons: summary.lessons ?? lessons.length,
          notFitted: summary.notFitted ?? 0,
          elapsedMs: summary.elapsedMs ?? 0,
        },
      },
      message: `${lessons.length} ${lessons.length === 1 ? "lesson is" : "lessons are"} drafted for ${term.name}, waiting to be accepted.`,
    };
  },
});
