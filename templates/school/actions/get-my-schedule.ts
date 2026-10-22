import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import {
  loadSchoolConfig,
  loadTimetable,
  resolveTerm,
} from "../server/lib/timetable.js";
import { schoolToday } from "../shared/dates.js";
import { schoolWeekdayName, joinDoubles } from "../shared/school-week.js";
import { rowOf } from "../server/lib/raw-sql.js";

export default defineAction({
  description:
    "Get the teaching schedule for today (or a specific date/day). Returns the teacher's classes sorted by start time, with room, subject, grade level, the lesson's own name if the school gave it one, and whether a lesson note has been prepared. A double is one slot from its first start to its second end, with periodCount 2. Defaults to today when no date is provided.",
  schema: z.object({
    date: z
      .string()
      .optional()
      .describe(
        "ISO date string (YYYY-MM-DD). Defaults to today's date. Used to determine the day of week.",
      ),
  }),
  http: { method: "POST" },
  // Reads only: without this every call tells open pages to refetch.
  readOnly: true,
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    // Resolve the teacher's userId
    if (!userEmail) throw new Error("No authenticated user.");
    const userRow = await rowOf<{ id: string }>(
      sql`SELECT id FROM "user" WHERE email = ${userEmail} LIMIT 1`,
    );
    if (!userRow) throw new Error("User not found.");
    const teacherUserId = userRow.id;

    // Determine target date and day of week (1=Mon … 7=Sun)
    // "Today" is the school's today, not UTC's.
    const config = await loadSchoolConfig(orgId);
    const targetDate = args.date ?? schoolToday(config);
    const jsDay = new Date(targetDate + "T12:00:00Z").getUTCDay(); // 0=Sun … 6=Sat
    const dayOfWeek = jsDay === 0 ? 7 : jsDay; // convert: Sun→7, Mon→1 … Sat→6

    const term = await resolveTerm(orgId, targetDate);
    const { week, locale, periods } = await loadTimetable(orgId, term.termId);
    const dayName = schoolWeekdayName(dayOfWeek, locale);

    if (periods.length === 0 && !week) {
      return {
        date: targetDate,
        dayOfWeek,
        dayName,
        slots: [],
        unpreparedCount: 0,
        message:
          "Your school has not set up its week, and no lessons are placed yet.",
      };
    }

    // Periods today where this person teaches, as primary or support.
    const mine = periods.filter(
      (p) =>
        p.day === dayOfWeek &&
        p.teachers.some((t) => t.userId === teacherUserId),
    );

    // Between terms the rows are the next term's: say so, and that it has not
    // started, rather than "today".
    const notStarted =
      term.status === "next" && term.termName
        ? `${term.termName} hasn't started yet`
        : null;

    if (mine.length === 0) {
      return {
        date: targetDate,
        dayOfWeek,
        dayName,
        slots: [],
        unpreparedCount: 0,
        message: notStarted
          ? `No classes scheduled for ${dayName} in ${term.termName}, which hasn't started yet.`
          : `No classes scheduled for ${dayName}.`,
      };
    }

    // Class details and prepared lesson notes, one query each for the whole day.
    const classIds = [...new Set(mine.map((p) => p.classId))];
    const [classRows, lessonRows] = await Promise.all([
      db
        .select({
          id: schema.classes.id,
          subjectId: schema.classes.subjectId,
          gradeLevelId: schema.classes.gradeLevelId,
        })
        .from(schema.classes)
        .where(
          and(
            eq(schema.classes.orgId, orgId),
            inArray(schema.classes.id, classIds),
          ),
        ),
      db
        .select({
          id: schema.lessonNotes.id,
          classId: schema.lessonNotes.classId,
          title: schema.lessonNotes.title,
          status: schema.lessonNotes.status,
        })
        .from(schema.lessonNotes)
        .where(
          and(
            inArray(schema.lessonNotes.classId, classIds),
            eq(schema.lessonNotes.lessonDate, targetDate),
          ),
        ),
    ]);
    const classById = new Map(classRows.map((c) => [c.id, c]));
    const lessonByClass = new Map<string, (typeof lessonRows)[number]>();
    for (const l of lessonRows) {
      if (!lessonByClass.has(l.classId)) lessonByClass.set(l.classId, l);
    }

    // A double is one slot: from its first start to its second end. Only a
    // valid pair joins; anything else reads as single periods.
    const joined = joinDoubles(week, mine);

    const enriched = joined.map(({ first: p, last, count }) => {
      const cls = classById.get(p.classId);
      const recent = lessonByClass.get(p.classId);
      return {
        scheduleId: p.scheduleId,
        classId: p.classId,
        className: p.className,
        subjectId: cls?.subjectId ?? null,
        gradeLevelId: cls?.gradeLevelId ?? null,
        periodNumber: p.periodNumber,
        periodCount: count,
        startTime: p.start,
        endTime: last.end,
        room: p.room,
        lessonLabel: p.lessonLabel,
        lessonPrepared: !!recent,
        lesson: recent
          ? { id: recent.id, title: recent.title, status: recent.status }
          : null,
      };
    });

    // Sort by start time
    enriched.sort((a, b) => a.startTime.localeCompare(b.startTime));

    const unprepared = enriched.filter((s) => !s.lessonPrepared);

    return {
      date: targetDate,
      dayOfWeek,
      dayName,
      slots: enriched,
      unpreparedCount: unprepared.length,
      message: notStarted
        ? `This is your timetable for ${term.termName}, which hasn't started yet: ${enriched.length} class${enriched.length !== 1 ? "es" : ""} on ${dayName}.`
        : unprepared.length > 0
          ? `You have ${enriched.length} class${enriched.length !== 1 ? "es" : ""} today. ${unprepared.length} ${unprepared.length === 1 ? "has" : "have"} no lesson note prepared for today.`
          : `You have ${enriched.length} class${enriched.length !== 1 ? "es" : ""} today — all have lesson notes prepared.`,
    };
  },
});
