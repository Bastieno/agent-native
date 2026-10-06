import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, isNull, or } from "drizzle-orm";
import { z } from "zod";
import { assertSubjectInSchool } from "../server/lib/curriculum-access.js";

/**
 * Say how a subject's questions should be worded here.
 *
 * Per subject on purpose: a school can prepare for WAEC in the sciences and
 * examine its French quite differently, and one setting for the whole school
 * would force a lie on one of them.
 */
export default defineAction({
  description:
    "Choose which assessment style a subject's questions follow — or pass none to clear it. Affects only wording; what is asked still comes from the curriculum, and how much from whoever sets the work.",
  schema: z.object({
    subjectId: z.string().describe("The subject"),
    styleId: z
      .string()
      .optional()
      .describe(
        "A specific style, when a name alone is ambiguous — several subjects can share one name",
      ),
    styleName: z
      .string()
      .optional()
      .describe(
        'The style\'s name, e.g. "WAEC". Omit, or pass "none", to clear it.',
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const subject = await assertSubjectInSchool(args.subjectId, orgId);

    // Clearing is an explicit "none", or naming nothing at all. An id on its
    // own is a choice, not an absence — reading only the name here silently
    // cleared the subject whenever the caller passed an id, which is exactly
    // what the page does.
    const clearing =
      args.styleName?.toLowerCase() === "none" ||
      (!args.styleName && !args.styleId);
    if (clearing) {
      await db
        .update(schema.subjects)
        .set({ assessmentStyleId: null, updatedAt: new Date().toISOString() })
        .where(eq(schema.subjects.id, args.subjectId));
      await writeAppState("refresh-signal", { ts: Date.now() });
      return {
        subject: subject.name,
        style: null,
        message: `${subject.name} now has no assessment style. Its questions will be written without any house habits.`,
      };
    }

    const visible = await db
      .select()
      .from(schema.assessmentStyles)
      .where(
        or(
          isNull(schema.assessmentStyles.orgId),
          eq(schema.assessmentStyles.orgId, orgId),
        ),
      );

    // An id settles it; a name may not, since several subjects share one.
    let pick: any = args.styleId
      ? visible.find((c: any) => c.id === args.styleId)
      : undefined;
    if (args.styleId && !pick) {
      throw new Error("That assessment style is not available to this school.");
    }

    if (!pick) {
      const candidates = visible.filter((c: any) => c.name === args.styleName);
      if (candidates.length === 0) {
        throw new Error(
          `No assessment style called "${args.styleName}" is available to this school. list-assessment-styles shows what is.`,
        );
      }
      // The school's own beats a sample; one read for this subject beats one
      // read for another. A school that names its subjects differently from
      // the papers — "Mathematics" where they say "General Mathematics" — is
      // not making a mistake, so the nearest is offered rather than refused.
      pick =
        candidates.find(
          (c: any) => c.orgId === orgId && c.subject === subject.name,
        ) ??
        candidates.find((c: any) => c.orgId === orgId && !c.subject) ??
        candidates.find((c: any) => c.subject === subject.name) ??
        candidates.find((c: any) => !c.subject) ??
        candidates[0];
    }
    const readForAnother = !!pick.subject && pick.subject !== subject.name;

    await db
      .update(schema.subjects)
      .set({
        assessmentStyleId: pick.id,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.subjects.id, args.subjectId));
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      subject: subject.name,
      style: pick.name,
      isSample: !!pick.isSample,
      readFor: pick.subject,
      message: `${subject.name} questions will now be worded like ${pick.name}.${
        readForAnother
          ? ` Those habits were read from ${pick.subject} papers rather than ${subject.name} ones — useful where the two are examined alike, worth changing where they are not.`
          : ""
      }${
        pick.isSample
          ? " It is one of the samples that ship with the app — a style built from this school's own papers would fit better."
          : ""
      }`,
    };
  },
});
