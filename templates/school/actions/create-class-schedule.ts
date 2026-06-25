import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Add a recurring weekly schedule slot to a class (e.g. every Monday at 08:00–08:45, Period 1). Run once per slot per class. Use list-class-schedules to see existing slots before adding to avoid duplicates.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    dayOfWeek: z
      .number()
      .int()
      .min(1)
      .max(7)
      .describe("Day of week: 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday"),
    startTime: z.string().regex(/^\d{2}:\d{2}$/).describe("Start time in HH:MM 24-hour format, e.g. '08:00'"),
    endTime: z.string().regex(/^\d{2}:\d{2}$/).describe("End time in HH:MM 24-hour format, e.g. '08:45'"),
    periodNumber: z.number().int().optional().describe("Optional period number (1–8) for human-readable reference"),
    room: z.string().optional().describe("Room override — defaults to the class's roomNumber if omitted"),
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
      .where(and(eq(schema.classes.id, args.classId), eq(schema.classes.orgId, orgId)))
      .limit(1);
    if (!cls) throw new Error(`Class not found: ${args.classId}`);

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
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });

    const dayNames = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return {
      id,
      classId: args.classId,
      className: cls.name,
      dayOfWeek: args.dayOfWeek,
      dayName: dayNames[args.dayOfWeek],
      startTime: args.startTime,
      endTime: args.endTime,
      periodNumber: args.periodNumber ?? null,
      room: args.room ?? cls.roomNumber ?? null,
    };
  },
});
