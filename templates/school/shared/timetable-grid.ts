import { placementSlot, validPairs, type SchoolWeek } from "./school-week.js";

/** What the admin grid needs of a placed row. */
export interface GridRow {
  scheduleId: string;
  pairId: string | null;
  day: number;
  periodNumber: number | null;
  start: string;
  end: string;
}

/**
 * Which doubles the admin grid draws as one tall cell. A valid double whose
 * halves sit in neighbouring grid rows of one day spans them, unless either
 * row is already spanned on that day by another double (staggered doubles,
 * or a clash): then it is drawn as two ordinary cells, so every grid row
 * keeps one cell per day. Pure.
 *
 * - `hidden`: second halves drawn inside their first half's cell.
 * - `partnerOf`: a spanning first half → its second half.
 * - `spans`: "day:rowIndex" of each spanning cell's top row.
 */
export function gridSpans<T extends GridRow>(
  week: SchoolWeek,
  rowNumbers: number[],
  periods: T[],
): {
  hidden: Set<string>;
  partnerOf: Map<string, string>;
  spans: Set<string>;
} {
  const rowAt = new Map(rowNumbers.map((n, i) => [n, i]));
  const rowOf = (p: T) => {
    const n = placementSlot(week, p)?.number;
    return n == null ? undefined : rowAt.get(n);
  };
  const candidates = [...validPairs(week, periods).values()]
    .map(([a, b]) => ({ a, b, ra: rowOf(a), rb: rowOf(b) }))
    .filter(
      (c): c is { a: T; b: T; ra: number; rb: number } =>
        c.ra != null && c.rb != null && c.rb === c.ra + 1,
    )
    // The earlier double wins a row two of them want.
    .sort((x, y) => x.a.day - y.a.day || x.ra - y.ra);

  const taken = new Set<string>();
  const hidden = new Set<string>();
  const partnerOf = new Map<string, string>();
  const spans = new Set<string>();
  for (const { a, b, ra, rb } of candidates) {
    const top = `${a.day}:${ra}`;
    const bottom = `${a.day}:${rb}`;
    // Two doubles of an option block over the same two rows share one span.
    if (spans.has(top)) {
      hidden.add(b.scheduleId);
      partnerOf.set(a.scheduleId, b.scheduleId);
      continue;
    }
    if (taken.has(top) || taken.has(bottom)) continue;
    taken.add(top);
    taken.add(bottom);
    spans.add(top);
    hidden.add(b.scheduleId);
    partnerOf.set(a.scheduleId, b.scheduleId);
  }
  return { hidden, partnerOf, spans };
}
