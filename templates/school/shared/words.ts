/**
 * Small pure helpers for putting the school's own words into sentences.
 * No database and no environment, so server code, the pure generator and the
 * client can all use them.
 */

/** A word with its article: "an arm", "a house". */
export function withArticle(word: string): string {
  return `${/^[aeiou]/i.test(word) ? "an" : "a"} ${word}`;
}

/** The same, capitalised for the start of a sentence: "An arm", "A house". */
export function withArticleCapital(word: string): string {
  const s = withArticle(word);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * "A, B and C" in the locale's own conventions. `Intl.ListFormat` is in every
 * supported runtime but not in the ES2020 lib, hence the guarded lookup and
 * the plain fallback. Empty names are dropped.
 */
export function joinNames(names: string[], locale?: string): string {
  const list = names.map((n) => n.trim()).filter(Boolean);
  if (list.length <= 1) return list[0] ?? "";
  const ListFormat = (Intl as unknown as { ListFormat?: any }).ListFormat;
  if (ListFormat) {
    try {
      return new ListFormat(locale || undefined, {
        type: "conjunction",
      }).format(list);
    } catch {
      // An unusable locale tag: fall through to the plain join.
    }
  }
  return `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
}
