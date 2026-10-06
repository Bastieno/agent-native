import type { WeekPlanEntry } from "@shared/week-plan";

/**
 * Which weeks of a unit teach what.
 *
 * The same thing is asked in two places — while a curriculum is being drafted,
 * and afterwards when someone opens the subject to check what was agreed — and
 * they were drawn by two different pieces of code, so the committed view
 * quietly lost the pacing the draft had shown. One component now, used by
 * both, so they cannot drift again.
 *
 * A table reads best where there is width for three columns; on a tablet held
 * in one hand the same table squeezes "Focus" to nothing, so the narrow view
 * keeps the list.
 */
export function WeekPlan({
  plan,
  objectives,
  /** Said when the plan is the app's even spread rather than anyone's choice. */
  inferredNote,
}: {
  plan: WeekPlanEntry[];
  /** The unit's objectives in order, for numbering the "Covers" column. */
  objectives: string[];
  inferredNote?: string | null;
}) {
  const numbers = new Map(objectives.map((o, i) => [o, i + 1]));
  const covers = (weekObjectives: string[]) => {
    if (weekObjectives.length === 0) return "—";
    if (weekObjectives.length === numbers.size && numbers.size > 1) {
      return "All";
    }
    return weekObjectives
      .map((o) => numbers.get(o))
      .filter(Boolean)
      .map((n) => `Obj. ${n}`)
      .join(", ");
  };

  const focus = (w: WeekPlanEntry) =>
    w.note ?? (w.objectives.length ? w.objectives.join("; ") : "—");

  return (
    <>
      {inferredNote ? (
        <p className="pt-2 text-[11px] text-muted-foreground">{inferredNote}</p>
      ) : null}
      <ul className="space-y-0.5 pt-1.5 lg:hidden">
        {plan.map((w) => (
          <li key={w.week} className="flex gap-2 text-xs text-muted-foreground">
            <span className="w-14 shrink-0 tabular-nums">Week {w.week}</span>
            <span className="min-w-0">{focus(w)}</span>
          </li>
        ))}
      </ul>
      <div className="hidden pt-2 lg:block">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="w-16 py-1 pr-2 text-left font-medium">Week</th>
              <th className="py-1 pr-2 text-left font-medium">Focus</th>
              <th className="w-32 py-1 text-left font-medium">Covers</th>
            </tr>
          </thead>
          <tbody>
            {plan.map((w) => (
              <tr key={w.week} className="border-b last:border-0">
                <td className="py-1.5 pr-2 tabular-nums text-muted-foreground">
                  {w.week}
                </td>
                <td className="py-1.5 pr-2">{focus(w)}</td>
                <td className="py-1.5 text-muted-foreground">
                  {covers(w.objectives)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
