import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Update a class (name, status, room number, capacity, or primary teacher).",
  schema: z.object({
    id: z.string().describe("Class ID"),
    name: z.string().optional(),
    status: z.enum(["active", "archived"]).optional(),
    primaryTeacherUserId: z.string().optional(),
    roomNumber: z.string().optional(),
    capacity: z.number().optional(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const now = new Date().toISOString();

    const updates: Record<string, any> = { updatedAt: now };
    if (args.name !== undefined) updates.name = args.name;
    if (args.status !== undefined) updates.status = args.status;
    if (args.primaryTeacherUserId !== undefined)
      updates.primaryTeacherUserId = args.primaryTeacherUserId;
    if (args.roomNumber !== undefined) updates.roomNumber = args.roomNumber;
    if (args.capacity !== undefined) updates.capacity = args.capacity;

    await db
      .update(schema.classes)
      .set(updates)
      .where(
        and(eq(schema.classes.id, args.id), eq(schema.classes.orgId, orgId)),
      );

    return { id: args.id, updated: true };
  },
});
