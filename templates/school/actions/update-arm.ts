import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Update an arm: its name, stream, home room, form teacher, order, or status (active or archived). Pass null to clear the stream, home room or form teacher.",
  schema: z.object({
    id: z.string().describe("Arm ID"),
    name: z.string().min(1).optional(),
    stream: z.string().nullable().optional(),
    homeRoom: z.string().nullable().optional(),
    formTeacherUserId: z.string().nullable().optional(),
    sequence: z.number().int().optional(),
    status: z.enum(["active", "archived"]).optional(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [arm] = await db
      .select()
      .from(schema.arms)
      .where(and(eq(schema.arms.id, args.id), eq(schema.arms.orgId, orgId)))
      .limit(1);
    if (!arm) throw new Error("That arm is not in this school.");

    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };
    if (args.name !== undefined) {
      const name = args.name.trim();
      const siblings = await db
        .select()
        .from(schema.arms)
        .where(
          and(
            eq(schema.arms.orgId, orgId),
            eq(schema.arms.gradeLevelId, arm.gradeLevelId),
          ),
        );
      if (
        siblings.some(
          (a: any) =>
            a.id !== arm.id && a.name.toLowerCase() === name.toLowerCase(),
        )
      ) {
        throw new Error(`The year group already has an arm called ${name}.`);
      }
      updates.name = name;
    }
    if (args.stream !== undefined) updates.stream = args.stream;
    if (args.homeRoom !== undefined) updates.homeRoom = args.homeRoom;
    if (args.formTeacherUserId !== undefined)
      updates.formTeacherUserId = args.formTeacherUserId;
    if (args.sequence !== undefined) updates.sequence = args.sequence;
    if (args.status !== undefined) updates.status = args.status;

    await db
      .update(schema.arms)
      .set(updates)
      .where(and(eq(schema.arms.id, args.id), eq(schema.arms.orgId, orgId)));

    return {
      id: args.id,
      updated: true,
      message: `Updated ${updates.name ?? arm.name}.`,
    };
  },
});
