/**
 * Reading a list out of whatever shape an action returns.
 *
 * Actions answer with what suits them — a bare array, `{active, pending}`,
 * `{students}` — and a simulation that guessed wrong reported the app as
 * broken when the fault was its own reading. Normalising it in one place
 * keeps that mistake from being made twenty times.
 */
export function asList(value: unknown, ...keys: string[]): any[] {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  const record = value as Record<string, unknown>;
  for (const key of keys) {
    if (Array.isArray(record[key])) return record[key] as any[];
  }
  // Fall back to the first array-valued property, so a shape nobody
  // anticipated still reads rather than silently coming back empty.
  for (const v of Object.values(record)) if (Array.isArray(v)) return v;
  return [];
}

/** An id out of whatever the action called it. */
export function idOf(value: any, ...keys: string[]): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  for (const key of ["id", ...keys]) {
    if (typeof value[key] === "string") return value[key];
    if (value[key] && typeof value[key]?.id === "string") return value[key].id;
  }
  return undefined;
}
