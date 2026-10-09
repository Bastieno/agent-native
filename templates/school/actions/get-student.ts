import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "Get full details for a student, including custom fields.",
  schema: z.object({
    id: z.string().describe("Student record ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const [student] = await db
      .select()
      .from(schema.students)
      .where(eq(schema.students.id, args.id))
      .limit(1);
    if (!student) throw new Error(`Student not found: ${args.id}`);
    const customFieldsSchema = await getOrgSetting(
      orgId,
      "custom-fields-schema",
    );
    const studentFieldDefs = (customFieldsSchema as any)?.student ?? [];
    return {
      ...student,
      customFields: JSON.parse(student.customFieldsJson),
      customFieldDefs: studentFieldDefs,
    };
  },
});
