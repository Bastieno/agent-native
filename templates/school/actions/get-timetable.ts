import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { roomKey, schoolWeekdayName } from "../shared/school-week.js";
import {
  clashesForTerm,
  findTerm,
  resolveTerm,
} from "../server/lib/timetable.js";

export default defineAction({
  description:
    "A term's timetable: the school's week, every period placed in it with its times, room, teachers and learners, and the clashes (a teacher, room, arm or learner in two places at once) in words. Defaults to the current term. Narrow it to one arm, teacher or room with the optional filters; clashes are then only those touching what is shown.",
  schema: z.object({
    termId: z.string().optional().describe("Defaults to the current term"),
    armId: z.string().optional().describe("Only this arm's periods"),
    teacherUserId: z
      .string()
      .optional()
      .describe("Only the periods this teacher takes"),
    room: z.string().optional().describe("Only the periods held in this room"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");

    let term: { id: string; name: string } | null = null;
    if (args.termId) {
      term = await findTerm(orgId, args.termId);
      if (!term) throw new Error("That term is not in this school.");
    } else {
      const current = await resolveTerm(orgId);
      if (current.termId) {
        term = { id: current.termId, name: current.termName! };
      }
    }

    const loaded = await clashesForTerm(orgId, term?.id ?? null);
    const { week, locale, fromUntermedRows } = loaded;

    let periods = loaded.periods;
    if (args.armId) {
      periods = periods.filter(
        (p) => p.armId === args.armId || p.optionArmIds.includes(args.armId!),
      );
    }
    if (args.teacherUserId) {
      periods = periods.filter((p) =>
        p.teachers.some((t) => t.userId === args.teacherUserId),
      );
    }
    if (args.room) {
      const wanted = roomKey(args.room);
      periods = periods.filter((p) => p.room && roomKey(p.room) === wanted);
    }
    const shown = new Set(periods.map((p) => p.scheduleId));
    const clashes = loaded.clashes.filter((c) =>
      c.scheduleIds.some((id) => shown.has(id)),
    );

    const dayNames: Record<number, string> = {};
    for (const d of week?.days ?? []) {
      dayNames[d.day] = schoolWeekdayName(d.day, locale);
    }

    const parts: string[] = [];
    if (!week) {
      parts.push(
        "The school hasn't set its week yet, so there are no periods to place lessons in (Settings → School week). Lessons show only the times typed against them.",
      );
    }
    if (!term) {
      parts.push("There is no current or upcoming term to show.");
    }
    parts.push(
      periods.length === 0
        ? `${term ? term.name : "This timetable"} has no periods placed.`
        : `${periods.length} period(s) placed${term ? ` in ${term.name}` : ""}.`,
    );
    if (fromUntermedRows && periods.length > 0) {
      parts.push(
        "None of these were set for this term in particular; they are the school's earlier timetable, which applies until this term has its own.",
      );
    }
    parts.push(
      clashes.length
        ? `${clashes.length} clash(es): ${clashes.map((c) => c.message).join(" ")}`
        : "No clashes.",
    );

    return {
      term,
      week,
      dayNames,
      periods,
      clashes,
      fromUntermedRows,
      message: parts.join(" "),
    };
  },
});
