import { getDb, schema } from "../db/index.js";
import { and, asc, eq, inArray, ne } from "drizzle-orm";
import {
  describeWeeks,
  termWeekCount,
  unplannedWeeks,
} from "../../shared/term-weeks.js";

/**
 * One subject's committed curriculum, the way a school thinks about it: by
 * year group, then by term, then unit by unit in teaching order.
 *
 * The subject page used to list units in a single run ordered by `sequence`,
 * which every year group starts again from 1 — so JSS1's first unit and SS1's
 * first unit sat next to each other as "1." and "2.", and nothing said which
 * class either was for. It also never showed an objective: `list-units` does
 * not return them.
 *
 * This is shared by the page, the agent's action and `view-screen`, so the
 * agent describes exactly what the admin is looking at.
 */

import { parseWeekPlan, type WeekPlanEntry } from "../../shared/week-plan.js";

export type CurriculumUnit = {
  id: string;
  title: string;
  description: string | null;
  weekStart: number | null;
  weekEnd: number | null;
  sequence: number;
  standards: Array<{ framework?: string; code: string; description?: string }>;
  objectives: Array<{
    id: string;
    description: string;
    bloomsLevel: string | null;
  }>;
  /**
   * Which weeks teach what, as it was agreed.
   *
   * A unit stores this at commit and the lesson notes are written from it, so
   * it is the most consulted thing in a committed curriculum — and it was the
   * one thing the draft showed and the curriculum did not. Null when nobody
   * paced the unit and its objectives are spread evenly.
   */
  weekPlan: WeekPlanEntry[] | null;
};

export type CurriculumTerm = {
  termId: string | null;
  name: string;
  weeks: number | null;
  units: CurriculumUnit[];
  objectives: number;
  unplannedWeeks: number[];
  /** "Nothing planned for Weeks 12–13 of 13", or null when fully planned. */
  gapNote: string | null;
};

export type CurriculumYearGroup = {
  gradeLevelId: string;
  name: string;
  units: number;
  objectives: number;
  terms: CurriculumTerm[];
};

export type SubjectCurriculum = {
  subject: {
    id: string;
    name: string;
    code: string | null;
    color: string | null;
  };
  units: number;
  objectives: number;
  unitsWithoutObjectives: number;
  yearGroups: CurriculumYearGroup[];
};

function parseStandards(json: string | null): CurriculumUnit["standards"] {
  try {
    const list = JSON.parse(json ?? "[]");
    return Array.isArray(list)
      ? list
          .map((s: any) => (typeof s === "string" ? { code: s } : s))
          .filter((s: any) => s?.code)
      : [];
  } catch {
    return [];
  }
}

export async function loadSubjectCurriculum(
  subjectId: string,
  schoolId: string,
): Promise<SubjectCurriculum | null> {
  const db = getDb();

  // The subject must belong to this school; everything else hangs off it.
  const [subject] = await db
    .select()
    .from(schema.subjects)
    .where(
      and(
        eq(schema.subjects.id, subjectId),
        eq(schema.subjects.schoolId, schoolId),
      ),
    )
    .limit(1);
  if (!subject) return null;

  const units = await db
    .select()
    .from(schema.units)
    .where(
      and(
        eq(schema.units.subjectId, subjectId),
        ne(schema.units.status, "archived"),
      ),
    );

  const objectiveRows = units.length
    ? await db
        .select()
        .from(schema.learningObjectives)
        .where(
          inArray(
            schema.learningObjectives.unitId,
            units.map((u: any) => u.id),
          ),
        )
        .orderBy(asc(schema.learningObjectives.sequence))
    : [];
  const objectivesByUnit = new Map<string, CurriculumUnit["objectives"]>();
  for (const o of objectiveRows) {
    const list = objectivesByUnit.get(o.unitId) ?? [];
    list.push({
      id: o.id,
      description: o.description,
      bloomsLevel: o.bloomsLevel ?? null,
    });
    objectivesByUnit.set(o.unitId, list);
  }

  const levels = await db
    .select()
    .from(schema.gradeLevels)
    .where(eq(schema.gradeLevels.schoolId, schoolId));
  const terms = await db
    .select()
    .from(schema.terms)
    .where(eq(schema.terms.schoolId, schoolId));
  const levelById = new Map<string, any>(levels.map((l: any) => [l.id, l]));
  const termById = new Map<string, any>(terms.map((t: any) => [t.id, t]));

  const byLevel = new Map<string, any[]>();
  for (const u of units) {
    const list = byLevel.get(u.gradeLevelId) ?? [];
    list.push(u);
    byLevel.set(u.gradeLevelId, list);
  }

  const yearGroups: CurriculumYearGroup[] = [...byLevel.entries()]
    .map(([gradeLevelId, levelUnits]) => {
      const byTerm = new Map<string, any[]>();
      for (const u of levelUnits) {
        const key = u.termId ?? "";
        const list = byTerm.get(key) ?? [];
        list.push(u);
        byTerm.set(key, list);
      }

      const termGroups: CurriculumTerm[] = [...byTerm.entries()]
        .map(([key, termUnits]) => {
          const term = key ? termById.get(key) : null;
          const ordered = [...termUnits].sort(
            (a, b) =>
              (a.weekStart ?? Number.MAX_SAFE_INTEGER) -
                (b.weekStart ?? Number.MAX_SAFE_INTEGER) ||
              a.sequence - b.sequence,
          );
          const shaped: CurriculumUnit[] = ordered.map((u) => ({
            id: u.id,
            title: u.title,
            description: u.description ?? null,
            weekStart: u.weekStart ?? null,
            weekEnd: u.weekEnd ?? null,
            sequence: u.sequence,
            standards: parseStandards(u.standardsJson),
            objectives: objectivesByUnit.get(u.id) ?? [],
            weekPlan: parseWeekPlan(u.weekPlanJson),
          }));
          const weeks = term
            ? termWeekCount(term.startDate, term.endDate)
            : null;
          const gaps = weeks ? unplannedWeeks(shaped, weeks) : [];
          return {
            termId: key || null,
            name: term?.name ?? "No term set",
            weeks,
            units: shaped,
            objectives: shaped.reduce((n, u) => n + u.objectives.length, 0),
            unplannedWeeks: gaps,
            gapNote: gaps.length
              ? `Nothing planned for ${describeWeeks(gaps).join(", ")} of ${weeks}`
              : null,
            _order: term
              ? [term.startDate ?? "", term.sequence ?? 0]
              : ["~", Number.MAX_SAFE_INTEGER],
          } as CurriculumTerm & { _order: [string, number] };
        })
        // Terms in the order they are taught; units with no term go last.
        .sort(
          (a: any, b: any) =>
            a._order[0].localeCompare(b._order[0]) || a._order[1] - b._order[1],
        )
        .map(({ _order, ...rest }: any) => rest);

      const level = levelById.get(gradeLevelId);
      return {
        gradeLevelId,
        name: level?.name ?? "Unknown year group",
        units: levelUnits.length,
        objectives: termGroups.reduce((n, t) => n + t.objectives, 0),
        terms: termGroups,
        _sequence: level?.sequence ?? Number.MAX_SAFE_INTEGER,
      } as CurriculumYearGroup & { _sequence: number };
    })
    .sort((a: any, b: any) => a._sequence - b._sequence)
    .map(({ _sequence, ...rest }: any) => rest);

  const allUnits = yearGroups.flatMap((y) => y.terms.flatMap((t) => t.units));
  return {
    subject: {
      id: subject.id,
      name: subject.name,
      code: subject.code ?? null,
      color: subject.color ?? null,
    },
    units: allUnits.length,
    objectives: allUnits.reduce((n, u) => n + u.objectives.length, 0),
    unitsWithoutObjectives: allUnits.filter((u) => u.objectives.length === 0)
      .length,
    yearGroups,
  };
}
