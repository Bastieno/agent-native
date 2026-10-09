/**
 * The school's own words, including their plurals.
 *
 * A school calls a piece of work an assignment, a task, homework, or class
 * work. Appending "s" turns the first two into sensible plurals and the last
 * two into "homeworks" and "class works". English has no rule that separates
 * them, so nothing in this app can work it out — the school has to say, and
 * the app has to ask at the moment the word is set rather than hoping someone
 * remembers.
 *
 * `naivePlural` is what the app will show when nobody has said. It is fine for
 * most words and wrong for mass nouns, which is exactly what the warning on
 * update-school-config is for.
 */

export type Terminology = {
  assessmentTerminology?: string | null;
  assessmentTerminologyPlural?: string | null;
};

export function naivePlural(word: string): string {
  const w = word.trim();
  if (!w) return w;
  if (/(s|x|z|ch|sh)$/i.test(w)) return `${w}es`;
  if (/[^aeiou]y$/i.test(w)) return `${w.slice(0, -1)}ies`;
  return `${w}s`;
}

/** Words that look like mass nouns, where adding "s" is usually wrong. */
export function looksUncountable(word: string): boolean {
  return /(work|homework|prep|study|revision|practice|reading)$/i.test(
    word.trim(),
  );
}

/** The school's word for one piece of work, and for several. */
export function workWords(config: Terminology | null | undefined): {
  one: string;
  many: string;
} {
  const one = config?.assessmentTerminology?.trim() || "assessment";
  const many = config?.assessmentTerminologyPlural?.trim() || naivePlural(one);
  return { one, many };
}

/** "1 assignment", "3 assignments", "3 homework". */
export function countOfWork(
  count: number,
  config: Terminology | null | undefined,
): string {
  const { one, many } = workWords(config);
  return `${count} ${count === 1 ? one : many}`;
}
