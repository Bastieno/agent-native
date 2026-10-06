import { getOrgSetting } from "@agent-native/core/settings";
import type { CustomField } from "../../shared/custom-field-words.js";

/**
 * Values for a school's own fields, checked against that school's own
 * definitions.
 *
 * Nothing here knows what a House or a Stream is, and nothing ships with the
 * app: a field exists because a school said so, its options are the school's
 * words, and this only answers "is this value one of the ones they named?".
 *
 * The check matters most at invitation, which is the one moment someone has
 * the answer in front of them. A typo accepted there becomes a record nobody
 * can filter on, and a value silently dropped is worse — the admin answered
 * the question and the app forgot.
 */

export async function studentFieldDefs(orgId: string): Promise<CustomField[]> {
  const schema = (await getOrgSetting(orgId, "custom-fields-schema")) as Record<
    string,
    CustomField[]
  > | null;
  const fields = schema?.student;
  return Array.isArray(fields) ? fields : [];
}

export type FieldCheck = {
  /** The values that may be written, keyed by field name. */
  values: Record<string, unknown>;
  /** What could not be accepted, in words for whoever is being told. */
  problems: string[];
};

/**
 * Keep what fits the school's definitions, and say plainly what does not.
 *
 * A field that is not defined is refused rather than stored: a misspelt name
 * would otherwise sit in the record forever, invisible to every screen and
 * every report, looking exactly like a value that had never been given.
 */
export function checkFieldValues(
  defs: CustomField[],
  given: Record<string, unknown> | undefined | null,
): FieldCheck {
  const values: Record<string, unknown> = {};
  const problems: string[] = [];
  if (!given) return { values, problems };

  const byName = new Map(defs.map((d) => [d.name, d]));
  for (const [name, raw] of Object.entries(given)) {
    const def = byName.get(name);
    if (!def) {
      problems.push(
        defs.length
          ? `There is no "${name}" field for students. This school records: ${defs
              .map((d) => d.name)
              .join(", ")}.`
          : `There is no "${name}" field for students, and this school has none defined yet.`,
      );
      continue;
    }
    if (raw === null || raw === "" || raw === undefined) continue;

    if (def.type === "enum") {
      const options = def.options ?? [];
      // Matched case-insensitively but stored as the school wrote it, so
      // "science" from a hurried admin becomes "Science" on the record and
      // filters alongside everyone else's.
      const match = options.find(
        (o) => o.toLowerCase() === String(raw).trim().toLowerCase(),
      );
      if (!match) {
        problems.push(
          `"${raw}" is not one of the ${def.label ?? def.name} options (${options.join(", ")}).`,
        );
        continue;
      }
      values[name] = match;
      continue;
    }
    if (def.type === "number") {
      const n = Number(raw);
      if (Number.isNaN(n)) {
        problems.push(`${def.label ?? def.name} should be a number.`);
        continue;
      }
      values[name] = n;
      continue;
    }
    if (def.type === "boolean") {
      const text = String(raw).trim().toLowerCase();
      if (["true", "yes", "1"].includes(text)) values[name] = true;
      else if (["false", "no", "0"].includes(text)) values[name] = false;
      else problems.push(`${def.label ?? def.name} should be yes or no.`);
      continue;
    }
    if (def.type === "date") {
      const text = String(raw).trim();
      // Stored as a plain day, which is what a birthday is: no timezone can
      // move it to the day before.
      if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
        problems.push(
          `${def.label ?? def.name} should be a date written as YYYY-MM-DD.`,
        );
        continue;
      }
      values[name] = text;
      continue;
    }
    values[name] = String(raw);
  }
  return { values, problems };
}

/** Fields the school marked required that no value was given for. */
export function missingRequired(
  defs: CustomField[],
  values: Record<string, unknown>,
): string[] {
  return defs
    .filter((d) => d.required)
    .filter((d) => values[d.name] === undefined || values[d.name] === "")
    .map((d) => d.label ?? d.name);
}
