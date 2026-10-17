import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Add a teacher to a class as primary, support, or observer.",
  schema: z.object({
    classId: z.string(),
    teacherUserId: z.string(),
    role: z.enum(["primary", "support", "observer"]).default("support"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    // Verify class belongs to this school
    const [cls] = await db
      .select({ id: schema.classes.id })
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.id, args.classId),
          eq(schema.classes.orgId, orgId),
        ),
      )
      .limit(1);
    if (!cls) throw new Error("Class not found.");

    await db.insert(schema.classTeachers).values({
      id: nanoid(),
      classId: args.classId,
      teacherUserId: args.teacherUserId,
      role: args.role,
    });

    return {
      classId: args.classId,
      teacherUserId: args.teacherUserId,
      role: args.role,
    };
  },
});
