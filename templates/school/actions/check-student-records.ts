import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";
import { studentFieldDefs } from "../server/lib/custom-field-values.js";

/**
 * Which students are missing something the school records about them.
 *
 * A school adds a field in month six and every student who joined before it
 * silently has a blank. Nothing asked, nothing warned, and the only way to
 * find out was to remember to look — which is how the agent came to offer
 * "ask me to check now and then" as a plan. It is not a plan; it is a thing
 * to forget.
 *
 * So the gap is something the app can state: per field, who has no value,
 * and the year group, which drives everything else and is just as often
 * missing. Nothing here knows what any field means, only that the school
 * said it records one.
 */
export default defineAction({
  description:
    "Which students have no year group, or no value for one of the school's own student fields. Run this after adding a field — every student who joined before it has a blank — and whenever someone asks who is missing details.",
  schema: z.object({
    fieldName: z
      .string()
      .optional()
      .describe("Only this field, by its name. Omit for all of them."),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const defs = (await studentFieldDefs(orgId)).filter(
      (d) => !args.fieldName || d.name === args.fieldName,
    );
    if (args.fieldName && defs.length === 0) {
      throw new Error(
        `This school records no student field called "${args.fieldName}".`,
      );
    }

    const rows = await db
      .select({
        id: schema.students.id,
        userId: schema.students.userId,
        gradeLevelId: schema.students.gradeLevelId,
        gradeLevelName: schema.gradeLevels.name,
        customFieldsJson: schema.students.customFieldsJson,
      })
      .from(schema.students)
      .leftJoin(
        schema.gradeLevels,
        eq(schema.students.gradeLevelId, schema.gradeLevels.id),
      )
      .where(
        and(
          eq(schema.students.schoolId, orgId),
          eq(schema.students.status, "active"),
        ),
      );

    const labels = await getUserLabels(rows.map((r: any) => r.userId));
    const named = (r: any) => ({
      id: r.id,
      name: labelFor(labels, r.userId),
      gradeLevel: r.gradeLevelName ?? null,
    });

    const values = (r: any): Record<string, unknown> => {
      try {
        const parsed = JSON.parse(r.customFieldsJson ?? "{}");
        return parsed && typeof parsed === "object" ? parsed : {};
      } catch {
        return {};
      }
    };

    // The year group is not a custom field, but it is missing for the same
    // reason and matters more: the curriculum, the classes and the calendar
    // all hang off it.
    const withoutYearGroup = args.fieldName
      ? []
      : rows.filter((r: any) => !r.gradeLevelId).map(named);

    const byField = defs.map((def) => {
      const missing = rows
        .filter((r: any) => {
          const v = values(r)[def.name];
          return v === undefined || v === null || v === "";
        })
        .map(named);
      return {
        name: def.name,
        label: def.label ?? def.name,
        required: !!def.required,
        missingCount: missing.length,
        missing,
      };
    });

    const labelWord =
      ((await getOrgSetting(orgId, "school-config")) as any)?.customLabels
        ?.student ?? "student";
    const gaps = [
      withoutYearGroup.length
        ? `${withoutYearGroup.length} ${labelWord}(s) have no year group`
        : null,
      ...byField
        .filter((f) => f.missingCount > 0)
        .map((f) => `${f.missingCount} have no ${f.label}`),
    ].filter(Boolean);

    return {
      students: rows.length,
      fieldsDefined: defs.length,
      withoutYearGroup,
      byField,
      message:
        defs.length === 0 && withoutYearGroup.length === 0
          ? `Nothing missing. This school records no extra student fields yet — ask an admin what else they keep about a ${labelWord}, and it can be added.`
          : gaps.length
            ? `${gaps.join("; ")}. Values can be set with update-student, or ask the person who knows.`
            : "Every active record has a year group and every field filled in.",
    };
  },
});
