import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Create an arm: one of the parallel groups a year group splits into (for example JSS1A, JSS1B), usually with a stream such as Science. Refuses a name already used in the year group.",
  schema: z.object({
    gradeLevelId: z.string().describe("The year group the arm belongs to"),
    name: z.string().min(1).describe('Arm name, e.g. "JSS1A"'),
    stream: z.string().optional().describe('e.g. "Science", "Art"'),
    homeRoom: z.string().optional(),
    formTeacherUserId: z.string().optional(),
    sequence: z.number().int().optional().describe("Order within the year"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [level] = await db
      .select()
      .from(schema.gradeLevels)
      .where(
        and(
          eq(schema.gradeLevels.id, args.gradeLevelId),
          eq(schema.gradeLevels.orgId, orgId),
        ),
      )
      .limit(1);
    if (!level) throw new Error("That year group is not in this school.");

    const siblings = await db
      .select()
      .from(schema.arms)
      .where(
        and(
          eq(schema.arms.orgId, orgId),
          eq(schema.arms.gradeLevelId, args.gradeLevelId),
        ),
      );
    const name = args.name.trim();
    if (
      siblings.some((a: any) => a.name.toLowerCase() === name.toLowerCase())
    ) {
      throw new Error(`${level.name} already has an arm called ${name}.`);
    }

    const id = nanoid();
    const sequence =
      args.sequence ??
      siblings.reduce((m: number, a: any) => Math.max(m, a.sequence), 0) + 1;
    await db.insert(schema.arms).values({
      id,
      schoolId: orgId,
      gradeLevelId: args.gradeLevelId,
      name,
      stream: args.stream ?? null,
      homeRoom: args.homeRoom ?? null,
      formTeacherUserId: args.formTeacherUserId ?? null,
      sequence,
      status: "active",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });

    return {
      id,
      name,
      gradeLevelId: args.gradeLevelId,
      gradeLevelName: level.name,
      stream: args.stream ?? null,
      sequence,
      message: `Created ${name} in ${level.name}${args.stream ? `, the ${args.stream} stream` : ""}.`,
    };
  },
});
