import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, sql } from "drizzle-orm";
import { z } from "zod";

const DAY_NAMES = [
  "",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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

    // Find all classes where this teacher is the primary teacher
    const teacherClasses = await db
      .select()
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.primaryTeacherUserId, teacherUserId),
          eq(schema.classes.orgId, orgId),
          eq(schema.classes.status, "active"),
        ),
      );

    if (teacherClasses.length === 0) {
      return {
        date: targetDate,
        dayOfWeek,
        dayName: DAY_NAMES[dayOfWeek],
        slots: [],
        message: "No active classes assigned to you.",
      };
    }

    const classIds = teacherClasses.map((c) => c.id);

    // Get schedule slots for today's day of week across all teacher's classes
    const allSlots = await db
      .select()
      .from(schema.classSchedules)
      .where(
        and(
          eq(schema.classSchedules.dayOfWeek, dayOfWeek),
          eq(schema.classSchedules.orgId, orgId),
        ),
      );

    const todaySlots = allSlots.filter((s) => classIds.includes(s.classId));

    if (todaySlots.length === 0) {
      return {
        date: targetDate,
        dayOfWeek,
        dayName: DAY_NAMES[dayOfWeek],
        slots: [],
        message: `No classes scheduled for ${DAY_NAMES[dayOfWeek]}.`,
      };
    }

    // Enrich slots with class details and check for prepared lesson notes
    const enriched = await Promise.all(
      todaySlots.map(async (slot) => {
        const cls = teacherClasses.find((c) => c.id === slot.classId)!;

        // Check if there's a lesson note prepared for today
        const [recentLesson] = await db
          .select({
            id: schema.lessonNotes.id,
            title: schema.lessonNotes.title,
            status: schema.lessonNotes.status,
          })
          .from(schema.lessonNotes)
          .where(
            and(
              eq(schema.lessonNotes.classId, slot.classId),
              eq(schema.lessonNotes.lessonDate, targetDate),
            ),
          )
          .limit(1);

        return {
          scheduleId: slot.id,
          classId: cls.id,
          className: cls.name,
          subjectId: cls.subjectId,
          gradeLevelId: cls.gradeLevelId,
          periodNumber: slot.periodNumber,
          startTime: slot.startTime,
          endTime: slot.endTime,
          room: slot.room ?? cls.roomNumber ?? null,
          lessonPrepared: !!recentLesson,
          lesson: recentLesson ?? null,
        };
      }),
    );

    // Sort by start time
    enriched.sort((a, b) => a.startTime.localeCompare(b.startTime));

    const unprepared = enriched.filter((s) => !s.lessonPrepared);

    return {
      date: targetDate,
      dayOfWeek,
      dayName: DAY_NAMES[dayOfWeek],
      slots: enriched,
      unpreparedCount: unprepared.length,
      message:
        unprepared.length > 0
          ? `You have ${enriched.length} class${enriched.length !== 1 ? "es" : ""} today. ${unprepared.length} ${unprepared.length === 1 ? "has" : "have"} no lesson note prepared for today.`
          : `You have ${enriched.length} class${enriched.length !== 1 ? "es" : ""} today — all have lesson notes prepared.`,
    };
  },
});
