/**
 * What the run noticed.
 *
 * A simulation that stops at the first surprise tests only the first
 * surprise. Findings are collected and the run carries on wherever it can,
 * so one report covers a whole term rather than the first ten minutes of it.
 */

export type Severity = "broken" | "wrong" | "missing" | "wording" | "note";

export type Finding = {
  severity: Severity;
  phase: string;
  what: string;
  /** How to see it again. */
  detail?: string;
};

export class Findings {
  readonly all: Finding[] = [];

  add(severity: Severity, phase: string, what: string, detail?: string) {
    this.all.push({ severity, phase, what, detail });
    const mark = severity === "broken" ? "✗" : severity === "note" ? "·" : "!";
    console.log(`  ${mark} [${severity}] ${what}`);
  }

  /** An expectation that should hold. Records rather than throws. */
  expect(
    phase: string,
    condition: boolean,
    what: string,
    detail?: string,
    severity: Severity = "broken",
  ): boolean {
    if (!condition) this.add(severity, phase, what, detail);
    return condition;
  }

  count(severity: Severity): number {
    return this.all.filter((f) => f.severity === severity).length;
  }
}
