import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { loadTimetable, resolveTerm } from "../server/lib/timetable.js";
import { schoolWeekdayName } from "../shared/school-week.js";

export default defineAction({
  description:
    "Get the teaching schedule for today (or a specific date/day). Returns the teacher's classes sorted by start time, with room, subject, grade level, and whether a lesson note has been prepared. Defaults to today when no date is provided.",
  schema: z.object({
    date: z
      .string()
      .optional()
      .describe(
        "ISO date string (YYYY-MM-DD). Defaults to today's date. Used to determine the day of week.",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    // Resolve the teacher's userId
    if (!userEmail) throw new Error("No authenticated user.");
    const userRow = await db.get<{ id: string }>(
      sql`SELECT id FROM "user" WHERE email = ${userEmail} LIMIT 1`,
    );
    if (!userRow) throw new Error("User not found.");
    const teacherUserId = userRow.id;

    // Determine target date and day of week (1=Mon … 7=Sun)
    const targetDate = args.date ?? new Date().toISOString().slice(0, 10);
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
          "Your school has not set up its week or placed any classes in a timetable yet.",
      };
    }

    // Periods today where this person teaches, as primary or support.
    const mine = periods.filter(
      (p) =>
        p.day === dayOfWeek &&
        p.teachers.some((t) => t.userId === teacherUserId),
    );

    if (mine.length === 0) {
      return {
        date: targetDate,
        dayOfWeek,
        dayName,
        slots: [],
        unpreparedCount: 0,
        message: `No classes scheduled for ${dayName}.`,
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

    const enriched = mine.map((p) => {
      const cls = classById.get(p.classId);
      const recent = lessonByClass.get(p.classId);
      return {
        scheduleId: p.scheduleId,
        classId: p.classId,
        className: p.className,
        subjectId: cls?.subjectId ?? null,
        gradeLevelId: cls?.gradeLevelId ?? null,
        periodNumber: p.periodNumber,
        startTime: p.start,
        endTime: p.end,
        room: p.room,
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
      message:
        unprepared.length > 0
          ? `You have ${enriched.length} class${enriched.length !== 1 ? "es" : ""} today. ${unprepared.length} ${unprepared.length === 1 ? "has" : "have"} no lesson note prepared for today.`
          : `You have ${enriched.length} class${enriched.length !== 1 ? "es" : ""} today — all have lesson notes prepared.`,
    };
  },
});
