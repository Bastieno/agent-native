import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq, inArray, notInArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import {
  doubleSecondPeriod,
  findPeriod,
  roomKey,
  schoolWeekdayName,
  type Room,
} from "../shared/school-week.js";
import {
  assertTermCanTakeRow,
  clashesForTerm,
  findTerm,
  loadSchoolConfig,
} from "../server/lib/timetable.js";
import { schoolLocale } from "../shared/dates.js";

export default defineAction({
  description:
    "Put a class in a day and period of a term's timetable, optionally in a room. Pass scheduleId to move an existing placement instead of adding one. Times come from the school's week. Refuses a day the school doesn't teach, a period that doesn't exist or is a break, and a room that isn't on the room list. With double: true it takes the next lesson period of that day too, as one double (refused when a break or the end of the day comes next); moving either half of a double moves both, and double: false splits it back to one period. lessonLabel is the school's own name for the lesson, free text. Returns any clash the placement causes.",
  schema: z.object({
    termId: z.string(),
    classId: z.string(),
    day: z.number().int().min(1).max(7).describe("1 = Monday … 7 = Sunday"),
    periodNumber: z.number().int().describe("The school's own period number"),
    room: z
      .string()
      .optional()
      .describe(
        "A room from the school's room list. Omit to use the class's own room; when moving, omit to keep the room it had.",
      ),
    scheduleId: z
      .string()
      .optional()
      .describe("Move this existing placement rather than adding a new one"),
    double: z
      .boolean()
      .optional()
      .describe(
        "true: this period and the next lesson period of the day, as one double. false: one period (splits a double). Omit to keep what it is.",
      ),
    lessonLabel: z
      .string()
      .nullable()
      .optional()
      .describe(
        "The school's own name for this lesson, as they write it; empty or null clears it. Omit to keep it.",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const term = await findTerm(orgId, args.termId);
    if (!term) throw new Error("That term is not in this school.");

    const [cls] = await db
      .select()
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.id, args.classId),
          eq(schema.classes.orgId, orgId),
        ),
      )
      .limit(1);
    if (!cls) throw new Error("That class is not in this school.");
    if (cls.status === "archived") {
      throw new Error(
        `${cls.name} is archived, so it can't go on the timetable.`,
      );
    }

    const config = await loadSchoolConfig(orgId);
    const week = config.schoolWeek ?? null;
    if (!week?.days?.length) {
      throw new Error(
        "The school hasn't set its week yet, so there are no periods to place a class in. Set it in Settings → School week.",
      );
    }
    const S = schema.classSchedules;
    // A term with no rows of its own shows the school's earlier timetable;
    // its first row would switch that off and hide every other lesson.
    await assertTermCanTakeRow(orgId, term);
    const locale = schoolLocale(config);
    const dayName = schoolWeekdayName(args.day, locale);
    const weekDay = week.days.find((d: any) => d.day === args.day);
    if (!weekDay) {
      throw new Error(
        `The school doesn't teach on ${dayName}. It teaches on ${week.days
          .map((d: any) => schoolWeekdayName(d.day, locale))
          .join(", ")}.`,
      );
    }
    const period = findPeriod(week, args.day, args.periodNumber);
    const lessons = weekDay.periods
      .filter((p: any) => p.kind === "lesson")
      .map((p: any) => p.number);
    if (!period || period.kind !== "lesson") {
      throw new Error(
        `${dayName} has no lesson in period ${args.periodNumber}${
          period ? ` (it is ${period.label ?? "a break"})` : ""
        }. ${
          lessons.length
            ? `Its lesson periods are ${lessons.join(", ")}.`
            : "That day has no lesson periods."
        }`,
      );
    }

    let room: string | null | undefined;
    if (args.room !== undefined) {
      const wanted = args.room.trim();
      if (!wanted) {
        room = null;
      } else if (Array.isArray(config.rooms) && config.rooms.length > 0) {
        const match = (config.rooms as Room[]).find(
          (r) => roomKey(r.name) === roomKey(wanted),
        );
        if (!match) {
          throw new Error(
            `"${wanted}" isn't on the school's room list (${(
              config.rooms as Room[]
            )
              .map((r) => r.name.trim())
              .join(", ")}). Add it in Settings → Rooms first.`,
          );
        }
        room = match.name;
      } else {
        room = wanted;
      }
    }

    let scheduleId = args.scheduleId;
    let movedRow: any = null;
    let partner: any = null;
    if (scheduleId) {
      const [row] = await db
        .select()
        .from(S)
        .where(and(eq(S.id, scheduleId), eq(S.schoolId, orgId)))
        .limit(1);
      if (!row) throw new Error("That placement is not in this school.");
      if (row.termId !== term.id) {
        throw new Error(
          row.termId === null
            ? "That placement is part of the school's earlier timetable, not this term's."
            : "That placement belongs to a different term's timetable.",
        );
      }
      movedRow = row;
      if (row.pairId) {
        [partner] = await db
          .select()
          .from(S)
          .where(
            and(
              eq(S.schoolId, orgId),
              eq(S.pairId, row.pairId),
              notInArray(S.id, [row.id]),
            ),
          )
          .limit(1);
      }
    }

    // A double keeps being one unless asked otherwise; a new one is single.
    const wantDouble = args.double ?? !!movedRow?.pairId;
    let second: { number: number; start: string; end: string } | null = null;
    if (wantDouble) {
      const next = doubleSecondPeriod(week, args.day, args.periodNumber);
      if (!next.second) {
        throw new Error(
          next.blocker
            ? `Period ${args.periodNumber} is the last lesson before ${
                next.blocker.label?.trim() || next.blocker.start
              }, so a double can't start there.`
            : `Period ${args.periodNumber} is the last lesson on ${dayName}, so a double can't start there.`,
        );
      }
      second = next.second;
    }

    // The same class in the same term, day and period twice is never meant,
    // whether it is being added or moved (a move excludes its own rows).
    const own = [movedRow?.id, partner?.id].filter(Boolean) as string[];
    const numbers = second
      ? [args.periodNumber, second.number]
      : [args.periodNumber];
    const [already] = await db
      .select()
      .from(S)
      .where(
        and(
          eq(S.schoolId, orgId),
          eq(S.termId, term.id),
          eq(S.classId, cls.id),
          eq(S.dayOfWeek, args.day),
          inArray(S.periodNumber, numbers),
          ...(own.length ? [notInArray(S.id, own)] : []),
        ),
      )
      .limit(1);
    if (already) {
      throw new Error(
        `${cls.name} is already in period ${already.periodNumber} on ${dayName} in ${term.name}.`,
      );
    }

    // A double has one name: what is given, else what it had.
    const lessonLabel =
      args.lessonLabel === undefined
        ? (movedRow?.lessonLabel ?? null)
        : args.lessonLabel?.trim() || null;
    const finalRoom = room === undefined ? (movedRow?.room ?? null) : room;
    const pairId = second ? (movedRow?.pairId ?? nanoid()) : null;
    const now = new Date().toISOString();
    const fresh = (
      id: string,
      p: { number: number; start: string; end: string },
    ) => ({
      id,
      classId: cls.id,
      schoolId: orgId,
      termId: term.id,
      dayOfWeek: args.day,
      periodNumber: p.number,
      startTime: p.start,
      endTime: p.end,
      room: finalRoom,
      pairId,
      lessonLabel,
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });

    let partnerId: string | null = null;
    let split = false;
    if (movedRow) {
      await db
        .update(S)
        .set({
          classId: cls.id,
          dayOfWeek: args.day,
          periodNumber: args.periodNumber,
          startTime: period.start,
          endTime: period.end,
          room: finalRoom,
          pairId,
          lessonLabel,
          updatedAt: now,
        })
        .where(and(eq(S.id, scheduleId!), eq(S.schoolId, orgId)));
      if (second && partner) {
        partnerId = partner.id;
        await db
          .update(S)
          .set({
            classId: cls.id,
            dayOfWeek: args.day,
            periodNumber: second.number,
            startTime: second.start,
            endTime: second.end,
            room: finalRoom,
            pairId,
            lessonLabel,
            updatedAt: now,
          })
          .where(and(eq(S.id, partner.id), eq(S.schoolId, orgId)));
      } else if (second) {
        partnerId = nanoid();
        await db.insert(S).values(fresh(partnerId, second));
      } else if (partner) {
        split = true;
        await db
          .delete(S)
          .where(and(eq(S.id, partner.id), eq(S.schoolId, orgId)));
      }
    } else {
      scheduleId = nanoid();
      const values = [fresh(scheduleId, period)];
      if (second) {
        partnerId = nanoid();
        values.push(fresh(partnerId, second));
      }
      // One insert, so a double is both halves or neither.
      await db.insert(S).values(values);
    }

    const ids = [scheduleId!, ...(partnerId ? [partnerId] : [])];
    const { clashes: all } = await clashesForTerm(orgId, term.id);
    const clashes = all.filter((c) =>
      c.scheduleIds.some((id) => ids.includes(id)),
    );
    const where = second
      ? `periods ${args.periodNumber} and ${second.number} on ${dayName} (${period.start}–${second.end}), as a double,`
      : `period ${args.periodNumber} on ${dayName} (${period.start}–${period.end})`;
    const sentences = [
      `${args.scheduleId ? "Moved" : "Put"} ${cls.name}${
        lessonLabel ? ` (${lessonLabel})` : ""
      } ${args.scheduleId ? "to" : "in"} ${where} in ${term.name}.`,
    ];
    if (split) {
      sentences.push(
        "It is a single period now; its second period has been taken out.",
      );
    }
    const placed = sentences.join(" ");
    return {
      scheduleId,
      partnerScheduleId: partnerId,
      pairId,
      lessonLabel,
      clashes,
      message: clashes.length
        ? `${placed} This causes ${clashes.length} clash(es): ${clashes
            .map((c) => c.message)
            .join(" ")}`
        : placed,
    };
  },
});
