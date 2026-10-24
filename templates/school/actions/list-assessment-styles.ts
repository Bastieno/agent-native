import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, isNull, or } from "drizzle-orm";
import { z } from "zod";

/**
 * Which subjects have a way of asking, and which are still being asked at
 * random.
 *
 * Two lists in one answer, because the question is never only "what styles
 * exist" — it is "which of my subjects are covered", and that is the one an
 * admin can act on.
 */
export default defineAction({
  description:
    "The assessment styles available to this school — its own and the samples that ship with the app — and which subjects currently use each. Names the subjects with no style, since those are drafted without any house habits.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const styles = await db
      .select()
      .from(schema.assessmentStyles)
      .where(
        or(
          isNull(schema.assessmentStyles.orgId),
          eq(schema.assessmentStyles.orgId, orgId),
        ),
      );

    const subjects = await db
      .select({
        id: schema.subjects.id,
        name: schema.subjects.name,
        styleId: schema.subjects.assessmentStyleId,
      })
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.schoolId, orgId),
          eq(schema.subjects.status, "active"),
        ),
      );

    const byId = new Map(styles.map((s: any) => [s.id, s]));
    const withStyle = subjects.filter(
      (s: any) => s.styleId && byId.has(s.styleId),
    );
    const without = subjects.filter(
      (s: any) => !s.styleId || !byId.has(s.styleId),
    );

    return {
      styles: styles.map((s: any) => ({
        id: s.id,
        name: s.name,
        subject: s.subject,
        region: s.region,
        isSample: !!s.isSample,
        ownedByThisSchool: s.orgId === orgId,
        derivedFrom: s.derivedFrom,
        usedBy: subjects
          .filter((sub: any) => sub.styleId === s.id)
          .map((sub: any) => sub.name),
      })),
      subjectsWithStyle: withStyle.map((s: any) => ({
        subject: s.name,
        style: byId.get(s.styleId)?.name,
      })),
      subjectsWithoutStyle: without.map((s: any) => s.name),
      message: without.length
        ? `${without.length} of ${subjects.length} subject(s) have no assessment style: ${without.map((s: any) => s.name).join(", ")}. Questions for those are written without any house habits — they will read like a textbook quiz rather than like this school's papers.`
        : `All ${subjects.length} subject(s) have an assessment style.`,
    };
  },
});
