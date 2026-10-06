import { getDb, schema } from "../db/index.js";
import { getOrgSetting } from "@agent-native/core/settings";
import { eq } from "drizzle-orm";
import {
  pacingForTerm,
  type PacingUnit,
  type TermPacing,
} from "../../shared/curriculum-pacing.js";
import {
  reservedWeeksForTerm,
  termWeekCount,
} from "../../shared/term-weeks.js";
import { weekPlanFromDraft } from "../../shared/week-plan.js";
import {
  paceObjectives,
  reservedFromWeek,
} from "../../shared/objective-pacing.js";

/**
 * How a draft's units sit in their terms — reported back the moment a draft is
 * saved, so a shape nobody could teach from is caught while it is still a
 * draft rather than after it is committed.
 *
 * Everything here is drawn from the school's own data: its term dates, and
 * whatever it has said about examination weeks and unit length. A school that
 * has said nothing gets facts and no opinions.
 */
export async function pacingReport(
  state: any,
  schoolId: string,
): Promise<{
  terms: TermPacing[];
  problems: string[];
  observations: string[];
}> {
  const db = getDb();
  const terms = await db
    .select()
    .from(schema.terms)
    .where(eq(schema.terms.schoolId, schoolId));
  const levels = await db
    .select()
    .from(schema.gradeLevels)
    .where(eq(schema.gradeLevels.schoolId, schoolId));
  const config = (await getOrgSetting(schoolId, "school-config")) as any;
  const examWeeks =
    typeof config?.examWeeksPerTerm === "number"
      ? config.examWeeksPerTerm
      : null;
  const preferences = config?.curriculumPacing ?? null;
  const reservedWeeks = config?.reservedWeeks ?? null;

  // Units grouped the way they are taught: one year group, one term.
  const groups = new Map<
    string,
    { label: string; termId: string | null; units: PacingUnit[] }
  >();
  for (const subject of state?.subjects ?? []) {
    for (const gl of subject?.gradeLevels ?? []) {
      const levelName =
        gl?.gradeLevelName ??
        levels.find((l: any) => l.id === gl?.gradeLevelId)?.name ??
        "year group";
      for (const unit of gl?.units ?? []) {
        const term = terms.find((t: any) => t.id === unit?.termId);
        const termName = term?.name ?? unit?.termName ?? "no term set";
        const key = `${subject?.name} · ${levelName} · ${termName}`;
        const entry = groups.get(key) ?? {
          label: key,
          termId: term?.id ?? null,
          units: [],
        };
        entry.units.push({
          title: unit?.title ?? "untitled unit",
          weekStart: unit?.weekStart ?? null,
          weekEnd: unit?.weekEnd ?? null,
          objectives: (unit?.learningObjectives ?? unit?.objectives ?? [])
            .length,
          // Which weeks actually teach something new — the same reckoning the
          // lesson notes use, so the check and the writer never disagree
          // about what a week is for.
          weeksTeaching: teachingWeeksOf(unit, term, examWeeks),
          // Either shape counts as paced: a list per week, or notes naming
          // what a week is for.
          paced: !!(
            (Array.isArray(unit?.objectivesByWeek) &&
              unit.objectivesByWeek.length) ||
            (unit?.objectivesByWeek &&
              typeof unit.objectivesByWeek === "object" &&
              Object.keys(unit.objectivesByWeek).length) ||
            (unit?.weekNotes &&
              typeof unit.weekNotes === "object" &&
              Object.keys(unit.weekNotes).length)
          ),
        });
        groups.set(key, entry);
      }
    }
  }

  const out: TermPacing[] = [];
  for (const group of groups.values()) {
    const term = terms.find((t: any) => t.id === group.termId);
    out.push(
      pacingForTerm(group.label, group.units, {
        weeksInTerm: term ? termWeekCount(term.startDate, term.endDate) : null,
        examWeeksReserved: examWeeks,
        // This term's own weeks: a term that names its own replaces the
        // school-wide entry of the same name rather than adding to it.
        reservedWeeks: reservedWeeksForTerm(reservedWeeks, group.termId),
        preferences,
      }),
    );
  }
  return {
    terms: out,
    problems: out.flatMap((t) => t.problems),
    observations: out.flatMap((t) => t.observations),
  };
}

/**
 * The weeks of a unit that carry new objectives.
 *
 * A week given over to a test, a practical or revision teaches nothing new,
 * and neither does a week the school keeps for examinations — so neither
 * belongs in an answer about where new material falls. Null when the unit has
 * no weeks set at all and there is nothing to say.
 */
function teachingWeeksOf(
  unit: any,
  term: any,
  examWeeks: number | null,
): number[] | null {
  if (!unit?.weekStart) return null;
  const plan = weekPlanFromDraft(unit);
  if (plan) {
    return plan.filter((w) => w.objectives.length > 0).map((w) => w.week);
  }
  const objectives = (unit?.learningObjectives ?? unit?.objectives ?? []).map(
    (o: any) => (typeof o === "string" ? o : (o?.description ?? "")),
  );
  if (objectives.length === 0) return [];
  const totalWeeks = term ? termWeekCount(term.startDate, term.endDate) : null;
  return paceObjectives(
    objectives,
    unit.weekStart,
    unit.weekEnd ?? unit.weekStart,
    undefined,
    { reservedFromWeek: reservedFromWeek(totalWeeks, examWeeks) },
  )
    .filter((w) => w.objectives.length > 0)
    .map((w) => w.week);
}
