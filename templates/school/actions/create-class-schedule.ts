import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { schoolWeekdayName } from "../shared/school-week.js";
import {
  assertTermCanTakeRow,
  clashesForTerm,
  findTerm,
  resolveTerm,
  termHasOwnRows,
} from "../server/lib/timetable.js";

export default defineAction({
  description:
    "Add a recurring weekly schedule slot to a class (e.g. every Monday at 08:00–08:45, Period 1). Run once per slot per class. Use list-class-schedules to see existing slots before adding to avoid duplicates. Prefer set-timetable-period, which takes times from the school's week. Refuses a term that is still showing the school's earlier timetable (copy it in first with copy-timetable). The reply says which term the slot went into.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    dayOfWeek: z
      .number()
      .int()
      .min(1)
      .max(7)
      .describe(
        "Day of week: 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday",
      ),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .describe("Start time in HH:MM 24-hour format, e.g. '08:00'"),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .describe("End time in HH:MM 24-hour format, e.g. '08:45'"),
    periodNumber: z
      .number()
      .int()
      .optional()
      .describe("Optional period number (1–8) for human-readable reference"),
    room: z
      .string()
      .optional()
      .describe(
        "Room override — defaults to the class's roomNumber if omitted",
      ),
    termId: z
      .string()
      .optional()
      .describe(
        "The term this slot belongs to. Omit to use the current term when it has a timetable of its own, else the school's earlier timetable (which applies until a term has its own).",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    // Verify class exists and belongs to this school
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
    if (!cls) throw new Error(`Class not found: ${args.classId}`);

    // Which timetable the slot joins. Named: that term, refused while it is
    // still showing the earlier timetable (its first row would hide the rest).
    // Unnamed: the current term once it has rows of its own, since a row
    // without a term is shown nowhere then; else the earlier timetable.
    let term: { id: string; name: string } | null = null;
    if (args.termId) {
      term = await findTerm(orgId, args.termId);
      if (!term) throw new Error("That term is not in this school.");
      await assertTermCanTakeRow(orgId, term);
    } else {
      const current = await resolveTerm(orgId);
      if (current.termId && (await termHasOwnRows(orgId, current.termId))) {
        term = { id: current.termId, name: current.termName! };
      }
    }

    const id = nanoid();
    await db.insert(schema.classSchedules).values({
      id,
      classId: args.classId,
      schoolId: orgId,
      dayOfWeek: args.dayOfWeek,
      startTime: args.startTime,
      endTime: args.endTime,
      periodNumber: args.periodNumber ?? null,
      room: args.room ?? null,
      termId: term?.id ?? null,
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });

    const loaded = await clashesForTerm(orgId, term?.id ?? null);
    const clashes = loaded.clashes.filter((c) => c.scheduleIds.includes(id));

    const dayName = schoolWeekdayName(args.dayOfWeek, loaded.locale);
    const where = term
      ? term.name
      : "the school's earlier timetable (not tied to a term; it applies until a term has its own)";
    const added = `Added ${cls.name} on ${dayName} ${args.startTime}–${args.endTime} to ${where}.`;
    return {
      id,
      classId: args.classId,
      className: cls.name,
      dayOfWeek: args.dayOfWeek,
      dayName,
      startTime: args.startTime,
      endTime: args.endTime,
      periodNumber: args.periodNumber ?? null,
      room: args.room ?? cls.roomNumber ?? null,
      termId: term?.id ?? null,
      termName: term?.name ?? null,
      clashes,
      message: clashes.length
        ? `${added} This causes ${clashes.length} clash(es): ${clashes
            .map((c) => c.message)
            .join(" ")}`
        : added,
    };
  },
});
