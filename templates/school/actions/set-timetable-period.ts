import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import {
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
    "Put a class in a day and period of a term's timetable, optionally in a room. Pass scheduleId to move an existing placement instead of adding one. Times come from the school's week. Refuses a day the school doesn't teach, a period that doesn't exist or is a break, and a room that isn't on the room list. Returns any clash the placement causes.",
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
        }. Its lesson periods are ${lessons.join(", ")}.`,
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
      await db
        .update(S)
        .set({
          classId: cls.id,
          dayOfWeek: args.day,
          periodNumber: args.periodNumber,
          startTime: period.start,
          endTime: period.end,
          room: room === undefined ? row.room : room,
          updatedAt: new Date().toISOString(),
        })
        .where(and(eq(S.id, scheduleId), eq(S.schoolId, orgId)));
    } else {
      const [already] = await db
        .select()
        .from(S)
        .where(
          and(
            eq(S.schoolId, orgId),
            eq(S.termId, term.id),
            eq(S.classId, cls.id),
            eq(S.dayOfWeek, args.day),
            eq(S.periodNumber, args.periodNumber),
          ),
        )
        .limit(1);
      if (already) {
        throw new Error(
          `${cls.name} is already in period ${args.periodNumber} on ${dayName} in ${term.name}.`,
        );
      }
      scheduleId = nanoid();
      await db.insert(S).values({
        id: scheduleId,
        classId: cls.id,
        schoolId: orgId,
        termId: term.id,
        dayOfWeek: args.day,
        periodNumber: args.periodNumber,
        startTime: period.start,
        endTime: period.end,
        room: room ?? null,
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      });
    }

    const { clashes: all } = await clashesForTerm(orgId, term.id);
    const clashes = all.filter((c) => c.scheduleIds.includes(scheduleId!));
    const placed = `${args.scheduleId ? "Moved" : "Put"} ${cls.name} ${
      args.scheduleId ? "to" : "in"
    } period ${args.periodNumber} on ${dayName} (${period.start}–${period.end}) in ${term.name}.`;
    return {
      scheduleId,
      clashes,
      message: clashes.length
        ? `${placed} This causes ${clashes.length} clash(es): ${clashes
            .map((c) => c.message)
            .join(" ")}`
        : placed,
    };
  },
});
