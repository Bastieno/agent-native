import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, asc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { boolish, jsonish } from "../shared/zod-json.js";
import { moveLearnersArm } from "../server/lib/arm-enrolment.js";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";

/**
 * Move a year group's learners up to the next one when a new year begins.
 *
 * Doing it learner by learner meant one change to the year group and one to
 * the arm for each of a school's hundreds of learners, and nothing said which
 * had been done. This does the whole promotion — or one year group of it — in
 * one step, and says first what it will do.
 *
 * Nothing here is named after a school. "The next year group" is the one with
 * the next sequence number; the last year group's learners are marked
 * graduated; and a learner in the nth arm of a year group goes to the nth arm
 * of the next (wrapping when the next has fewer), so classes stay together
 * unless the school says otherwise with `armMap`.
 *
 * Run it after the new year is current, so each learner is enrolled in the
 * new year's classes for their arm. Their enrolments in last year's classes
 * were already closed when the year changed.
 */
export default defineAction({
  description:
    "Promote learners to the next year group at the start of a new academic year: each active learner moves up one year group and into an arm there (the nth arm to the nth arm unless armMap says otherwise), joining that arm's classes in the current year; the last year group graduates. Run it after set-active-academic-year. Previews by default, saying how many go where; pass confirm=true to promote. Pass gradeLevelId to promote one year group only.",
  schema: z.object({
    gradeLevelId: z
      .string()
      .optional()
      .describe(
        "Promote only this year group's learners. Omit for every year group.",
      ),
    armMap: jsonish(z.record(z.string(), z.string()))
      .optional()
      .describe(
        "Where an arm's learners go, as { fromArmId: toArmId }, for a school that does not want the nth-to-nth default.",
      ),
    graduateLastYear: boolish()
      .optional()
      .default(true)
      .describe(
        "Mark the last year group's learners graduated. Pass false to leave them as they are.",
      ),
    allowAgain: boolish()
      .optional()
      .default(false)
      .describe(
        "Promote a year group that was already promoted into this year. Almost never right: it moves those learners up a second time.",
      ),
    confirm: boolish()
      .optional()
      .default(false)
      .describe("false returns a preview; true promotes"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [year] = await db
      .select({ id: schema.academicYears.id, name: schema.academicYears.name })
      .from(schema.academicYears)
      .where(
        and(
          eq(schema.academicYears.orgId, orgId),
          eq(schema.academicYears.schoolId, orgId),
          eq(schema.academicYears.status, "active"),
        ),
      )
      .limit(1);
    if (!year) {
      throw new Error(
        "The school has no current academic year. Make the new year current first (set-active-academic-year), so learners join its classes.",
      );
    }

    const grades = await db
      .select()
      .from(schema.gradeLevels)
      .where(eq(schema.gradeLevels.schoolId, orgId))
      .orderBy(asc(schema.gradeLevels.sequence));
    const arms = await db
      .select()
      .from(schema.arms)
      .where(
        and(eq(schema.arms.orgId, orgId), eq(schema.arms.status, "active")),
      )
      .orderBy(asc(schema.arms.sequence));
    const armsOf = (gradeId: string) =>
      arms.filter((a: any) => a.gradeLevelId === gradeId);
    const armById = new Map<string, any>(arms.map((a: any) => [a.id, a]));

    const learners = await db
      .select()
      .from(schema.students)
      .where(
        and(
          eq(schema.students.orgId, orgId),
          eq(schema.students.status, "active"),
        ),
      );
    const scope = learners.filter(
      (l: any) =>
        l.gradeLevelId &&
        (!args.gradeLevelId || l.gradeLevelId === args.gradeLevelId),
    );

    // Remember which year groups have been promoted into this year. Running it
    // twice would move the same learners up twice, and nothing on a learner's
    // record says they already moved.
    const recordKey = `promoted-into-${year.id}`;
    const already = new Set<string>(
      (
        (await getOrgSetting(orgId, recordKey)) as {
          gradeLevelIds?: string[];
        } | null
      )?.gradeLevelIds ?? [],
    );
    const inScope = new Set<string>(scope.map((l: any) => l.gradeLevelId));
    const repeated = grades.filter(
      (g: any) => inScope.has(g.id) && already.has(g.id),
    );
    if (repeated.length > 0 && !args.allowAgain) {
      throw new Error(
        `${repeated.map((g: any) => g.name).join(", ")} ${repeated.length === 1 ? "was" : "were"} already promoted into ${year.name}. Promoting again would move those learners up a second time. If that is what you want, pass allowAgain=true; to do only the year groups still waiting, name them with gradeLevelId.`,
      );
    }

    // The year group below one already moved up this year means this one now
    // holds learners who just arrived, and would send them up again. Year
    // groups go from the top down.
    const mixed = grades.filter((g: any, i: number) => {
      const below = grades[i - 1];
      return inScope.has(g.id) && below && already.has(below.id);
    });
    if (mixed.length > 0 && !args.allowAgain) {
      throw new Error(
        `${mixed.map((g: any) => g.name).join(", ")} now holds learners who were just promoted into it, and would move them up again. Promote year groups from the top down, or all at once by leaving gradeLevelId out.`,
      );
    }

    const overrides = args.armMap ?? {};
    for (const [from, to] of Object.entries(overrides)) {
      const a = armById.get(from);
      const b = armById.get(to);
      if (!a || !b)
        throw new Error("armMap names an arm that is not in this school.");
      const next =
        grades[grades.findIndex((g: any) => g.id === a.gradeLevelId) + 1];
      if (!next || b.gradeLevelId !== next.id) {
        throw new Error(
          `${a.name} can only go to an arm of the next year group, and ${b.name} is not in it.`,
        );
      }
    }

    type Plan = { learner: any; toGrade: any; toArm: any | null };
    const moving: Plan[] = [];
    const graduating: any[] = [];
    const kept: any[] = []; // last year group with graduation switched off
    for (const l of scope as any[]) {
      const at = grades.findIndex((g: any) => g.id === l.gradeLevelId);
      if (at < 0) continue;
      const toGrade = grades[at + 1];
      if (!toGrade) {
        (args.graduateLastYear ? graduating : kept).push(l);
        continue;
      }
      let toArm: any = null;
      if (l.armId) {
        const forced = overrides[l.armId];
        if (forced) toArm = armById.get(forced);
        else {
          const here = armsOf(l.gradeLevelId);
          const there = armsOf(toGrade.id);
          const position = Math.max(
            0,
            here.findIndex((a: any) => a.id === l.armId),
          );
          toArm = there.length ? there[position % there.length] : null;
        }
      }
      moving.push({ learner: l, toGrade, toArm });
    }

    // How many go where, in words.
    const tally = new Map<string, number>();
    for (const m of moving) {
      const key = `${m.toGrade.name}${m.toArm ? ` (${m.toArm.name})` : ""}`;
      tally.set(key, (tally.get(key) ?? 0) + 1);
    }
    const where = [...tally.entries()]
      .map(([k, n]) => `${n} to ${k}`)
      .join(", ");
    const summary = {
      academicYear: year.name,
      promoting: moving.length,
      graduating: graduating.length,
      leftAsTheyAre: kept.length,
      destinations: Object.fromEntries(tally),
    };
    const outline = `${moving.length} learner${moving.length === 1 ? "" : "s"} move up${where ? `: ${where}` : ""}.${
      graduating.length
        ? ` ${graduating.length} in the last year group graduate.`
        : ""
    }`;

    if (!args.confirm) {
      return {
        preview: true,
        ...summary,
        message: `${outline} They join the classes of ${year.name}. Re-run with confirm=true to promote them.`,
      };
    }

    const now = new Date().toISOString();
    // Year group first, then the arm: an arm only takes learners of its own
    // year group.
    const byTarget = new Map<string, string[]>(); // arm id or "" -> user ids
    for (const m of moving) {
      await db
        .update(schema.students)
        .set({ gradeLevelId: m.toGrade.id, updatedAt: now })
        .where(
          and(
            eq(schema.students.id, m.learner.id),
            eq(schema.students.orgId, orgId),
          ),
        );
      const key = m.toArm?.id ?? "";
      byTarget.set(key, [...(byTarget.get(key) ?? []), m.learner.userId]);
    }
    let enrolled = 0;
    for (const [armId, userIds] of byTarget) {
      // Learners with no arm leave the one they were in.
      const result = await moveLearnersArm(orgId, userIds, armId || null);
      enrolled += result.enrolled;
    }

    if (graduating.length > 0) {
      const ids = graduating.map((l: any) => l.id);
      // Out of their arm first, so no class of theirs counts them.
      await moveLearnersArm(
        orgId,
        graduating.map((l: any) => l.userId),
        null,
      );
      await db
        .update(schema.students)
        .set({ status: "graduated", updatedAt: now })
        .where(
          and(
            inArray(schema.students.id, ids),
            eq(schema.students.orgId, orgId),
          ),
        );
    }

    // Learners now in a year group were promoted out of the one below it, so
    // it is the year groups they came from that are recorded.
    await putOrgSetting(orgId, recordKey, {
      gradeLevelIds: [...new Set([...already, ...inScope])],
      at: new Date().toISOString(),
    } as any);

    return {
      preview: false,
      ...summary,
      enrolments: enrolled,
      message: `${outline} They are enrolled in ${year.name}'s classes (${enrolled} enrolments).`,
    };
  },
});
