import { and, asc, eq } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";

/**
 * The terms of one academic year, as ids — the school's current year unless
 * another is named.
 *
 * A unit belongs to a term and a term to one year, so a school that has moved
 * into a second year holds two years of units. Anything that describes what
 * the school teaches *now* must look at one year's, or it reads "First Term"
 * twice and counts every unit double. Null when the school has no current
 * year, which means "do not filter".
 */
export async function termIdsForYear(
  orgId: string,
  academicYearId?: string,
): Promise<Set<string> | null> {
  const db = getDb();
  let yearId = academicYearId;
  if (!yearId) {
    const [active] = await db
      .select({ id: schema.academicYears.id })
      .from(schema.academicYears)
      .where(
        and(
          eq(schema.academicYears.orgId, orgId),
          eq(schema.academicYears.schoolId, orgId),
          eq(schema.academicYears.status, "active"),
        ),
      )
      .limit(1);
    if (!active) return null;
    yearId = active.id;
  }
  const terms = await db
    .select({ id: schema.terms.id })
    .from(schema.terms)
    .where(
      and(
        eq(schema.terms.orgId, orgId),
        eq(schema.terms.academicYearId, yearId),
      ),
    );
  // A year with no terms of its own cannot say which units are its: do not
  // filter, rather than hide every unit the school has.
  if (terms.length === 0) return null;
  return new Set(terms.map((t: any) => t.id));
}

/** A unit with no term belongs to no year, so it is always in scope. */
export function unitInYear(
  unit: { termId?: string | null },
  termIds: Set<string> | null,
): boolean {
  return !termIds || !unit.termId || termIds.has(unit.termId);
}

/**
 * The two years a "carry forward" step runs between, by default the year the
 * school is about to move into and the one before it.
 *
 * "Into" is the upcoming year when there is one — these steps run while next
 * year is still being set up, before the school switches to it — and the
 * current year once it has switched. "From" is the latest year before that.
 * Either can be named.
 */
export async function yearsToCarryBetween(
  orgId: string,
  fromAcademicYearId?: string,
  toAcademicYearId?: string,
) {
  const years = await getDb()
    .select()
    .from(schema.academicYears)
    .where(
      and(
        eq(schema.academicYears.orgId, orgId),
        eq(schema.academicYears.schoolId, orgId),
      ),
    )
    .orderBy(asc(schema.academicYears.startDate));
  if (years.length < 2) {
    throw new Error(
      "The school has only one academic year, so there is nothing to copy between. Create next year first.",
    );
  }
  const active = years.find((y: any) => y.status === "active");
  const upcoming = years.find(
    (y: any) =>
      y.status === "upcoming" && (!active || y.startDate > active.startDate),
  );
  const to = toAcademicYearId
    ? years.find((y: any) => y.id === toAcademicYearId)
    : (upcoming ?? active);
  if (!to) throw new Error("Name the academic year to copy into.");
  const from = fromAcademicYearId
    ? years.find((y: any) => y.id === fromAcademicYearId)
    : [...years]
        .filter((y: any) => y.id !== to.id && y.startDate < to.startDate)
        .pop();
  if (!from) throw new Error("There is no earlier academic year to copy from.");
  if (from.id === to.id) throw new Error("Pick two different years.");
  return { years, from, to };
}
