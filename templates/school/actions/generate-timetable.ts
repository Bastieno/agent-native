import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { joinNames } from "../shared/words.js";
import { getDb, schema } from "../server/db/index.js";
import {
  buildGeneratorInput,
  generatorWords,
  termFingerprint,
} from "../server/lib/timetable-generation.js";
import {
  buildUnits,
  explainUnplaced,
  generateTimetable,
} from "../server/lib/timetable-generator.js";
import {
  assertTermCanTakeRow,
  findTerm,
  loadSchoolConfig,
} from "../server/lib/timetable.js";

const count = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;

export default defineAction({
  description:
    "Draft a timetable for a term: place the lessons its classes still need, around the lessons already there, without moving any of them. Nothing is changed on the timetable; the draft waits to be accepted or discarded, and a new draft replaces the one waiting. Classes the school has not given lesson counts are left out, and the reply says how many lessons did not fit and why. Refuses when the school has no week, no class has lesson counts, or the term is still showing the school's earlier timetable. When some classes have no teacher it asks first (needsConfirm); pass confirm to go ahead.",
  schema: z.object({
    termId: z.string(),
    confirm: z
      .boolean()
      .optional()
      .describe(
        "Go ahead although some classes have no teacher yet. Without it the reply asks first.",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const term = await findTerm(orgId, args.termId);
    if (!term) throw new Error("That term is not in this school.");
    const config = await loadSchoolConfig(orgId);
    if (!config.schoolWeek) {
      throw new Error(
        "The school hasn't set its week yet, so there are no periods to place lessons in. Set it in Settings → School week.",
      );
    }
    // Taken before the solve, so a lesson edited meanwhile makes accept refuse
    // the draft instead of passing it.
    const baseFingerprint = await termFingerprint(orgId, term.id);
    const input = await buildGeneratorInput(orgId, term.id);
    if (!input.classes.some((c) => (c.required?.periods ?? 0) > 0)) {
      throw new Error(
        "No class has a lesson count yet, so there is nothing to place. Say how many periods a week each subject needs first.",
      );
    }
    await assertTermCanTakeRow(orgId, term);

    const nameOf = new Map(input.classes.map((c) => [c.classId, c.className]));
    const planned = buildUnits(input);
    if (planned.units.length === 0) {
      return {
        lessons: 0,
        notFitted: 0,
        notSet: planned.notSet.length,
        noTeacher: 0,
        message: `Every class with a lesson count already has its lessons in ${term.name}, so there is nothing to draft.`,
      };
    }
    if (planned.noTeacher.length > 0 && !args.confirm) {
      const names = planned.noTeacher.map((id) => nameOf.get(id) ?? "a class");
      return {
        needsConfirm: true,
        noTeacher: names,
        message: `${count(names.length, "class has", "classes have")} no teacher yet: ${joinNames(names, input.locale)}. Their lessons can still be placed, but they won't be checked against any teacher's time, so clashes may appear once one is assigned. Shall I go ahead?`,
      };
    }

    const result = generateTimetable(input);
    const explained = explainUnplaced(
      result,
      input,
      await generatorWords(orgId),
    );

    // What did not fit, counted in lessons like what did.
    const unitById = new Map(planned.units.map((u) => [u.id, u]));
    const notFitted = result.unplaced.reduce(
      (n, u) =>
        n +
        (unitById.get(u.unitId)?.members.reduce((m, x) => m + x.periods, 0) ??
          0),
      0,
    );

    const P = schema.timetableProposals;
    await db
      .update(P)
      .set({ status: "discarded" })
      .where(
        and(eq(P.schoolId, orgId), eq(P.termId, term.id), eq(P.status, "open")),
      );
    const userRow = userEmail
      ? await db.get<{ id: string }>(
          sql`SELECT id FROM "user" WHERE email = ${userEmail} LIMIT 1`,
        )
      : null;
    const id = nanoid();
    await db.insert(P).values({
      id,
      schoolId: orgId,
      termId: term.id,
      createdByUserId: userRow?.id ?? null,
      baseFingerprint,
      lessonsJson: JSON.stringify(result.lessons),
      unplacedJson: JSON.stringify(explained.reasons),
      summaryJson: JSON.stringify({
        lessons: result.lessons.length,
        notFitted,
        notSet: explained.notSet,
        noTeacher: explained.noTeacher,
        elapsedMs: result.elapsedMs,
      }),
      status: "open",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org",
    });

    const parts = [
      result.lessons.length === 0
        ? `I couldn't place any lessons in ${term.name}.`
        : `I've drafted ${count(result.lessons.length, "lesson", "lessons")} for ${term.name}.`,
    ];
    if (notFitted > 0) {
      parts.push(
        `${count(notFitted, "lesson", "lessons")} couldn't be fitted; the draft says why.`,
      );
    }
    if (result.notSet.length > 0) {
      parts.push(
        `${count(result.notSet.length, "class has", "classes have")} no lesson count, so ${result.notSet.length === 1 ? "it was" : "they were"} left out.`,
      );
    }
    parts.push(
      "Nothing is on the timetable until the draft is accepted, and the lessons already there stay where they are.",
    );
    return {
      proposalId: id,
      lessons: result.lessons.length,
      notFitted,
      notSet: result.notSet.length,
      noTeacher: result.noTeacher.length,
      elapsedMs: result.elapsedMs,
      message: parts.join(" "),
    };
  },
});
