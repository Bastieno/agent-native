import { getOrgSetting } from "@agent-native/core/settings";
import { and, count, eq } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import {
  ACTION_PAGE,
  NEEDS,
  SETUP_ACTIONS,
  checklistText,
  missingFor,
  progressSummary,
  type ReadinessFacts,
} from "../../shared/readiness.js";

/** Which first steps a school has done, worked out from what exists. */
export async function readinessFor(orgId: string): Promise<ReadinessFacts> {
  const db = getDb();
  const config = ((await getOrgSetting(orgId, "school-config")) ??
    {}) as Record<string, any>;
  const [levels, termRows, classRows] = await Promise.all([
    db
      .select({ c: count() })
      .from(schema.gradeLevels)
      .where(eq(schema.gradeLevels.schoolId, orgId)),
    db
      .select({ c: count() })
      .from(schema.terms)
      .where(eq(schema.terms.schoolId, orgId)),
    db
      .select({ c: count() })
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.orgId, orgId),
          eq(schema.classes.status, "active"),
        ),
      ),
  ]);
  return {
    yearGroups: Number(levels[0]?.c ?? 0) > 0,
    terms: Number(termRows[0]?.c ?? 0) > 0,
    schoolWeek: !!config.schoolWeek?.days?.length,
    classes: Number(classRows[0]?.c ?? 0) > 0,
  };
}

/**
 * Refuse an action whose page is still waiting for setup, in words the
 * assistant can act on. Actions not in the list are never held back.
 */
export async function assertSetupDone(
  actionName: string,
  orgId: string | null | undefined,
): Promise<void> {
  const page = ACTION_PAGE[actionName];
  if (!page || !orgId) return;
  const missing = missingFor(page, await readinessFor(orgId));
  if (missing.length === 0) return;
  throw new Error(
    `The school is not set up for this yet. Still to do, in order: ${missing
      .map((n) => NEEDS[n].label)
      .join(
        "; ",
      )}. Tell the person this, and offer to do the first one with them (check-school-setup shows what is empty). Do not try ${actionName} again until it is done.`,
  );
}

/**
 * Under the result of a setup action, where the school stands: the same
 * checklist the Overview page shows. Whoever is helping the head, our
 * assistant or their own AI app, then has the progress in front of them after
 * every step, without having to remember to ask.
 */
export async function withSetupProgress<T>(
  actionName: string,
  orgId: string | null | undefined,
  result: T,
  args?: Record<string, unknown>,
): Promise<T> {
  if (!SETUP_ACTIONS.has(actionName) || !orgId) return result;
  // A look-and-feel change (the school's colour or name) is not a setup step:
  // do not report setup progress under it.
  if (
    actionName === "update-school-config" &&
    args &&
    Object.keys(args).every((k) => k === "theme")
  ) {
    return result;
  }
  if (!result || typeof result !== "object" || Array.isArray(result)) {
    return result;
  }
  try {
    const facts = await readinessFor(orgId);
    return {
      ...(result as object),
      setupProgress: `Setup: ${progressSummary(facts)}.\n\n${checklistText(facts)}\n\nShow this to the person as it is, then offer the next step.`,
    } as T;
  } catch {
    // The step itself worked; the progress line is a courtesy.
    return result;
  }
}
