import { getOrgSetting } from "@agent-native/core/settings";

/**
 * A subject's course level must be one the school has named (Honors, AP), so
 * a typo cannot quietly leave a course unweighted. Returns the level as the
 * school spells it, or null for a standard course.
 */
export async function checkCourseLevel(
  orgId: string,
  level: string | null | undefined,
): Promise<string | null> {
  if (!level) return null;
  const config = ((await getOrgSetting(orgId, "school-config")) ?? {}) as {
    courseLevels?: Array<{ name: string }>;
  };
  const known = config.courseLevels ?? [];
  const found = known.find((c) => c.name.toLowerCase() === level.toLowerCase());
  if (!found) {
    throw new Error(
      known.length
        ? `"${level}" is not one of this school's course levels (${known.map((c) => c.name).join(", ")}). Add it with update-school-config --courseLevels first.`
        : `This school has no course levels yet. Add them with update-school-config --courseLevels first.`,
    );
  }
  return found.name;
}
