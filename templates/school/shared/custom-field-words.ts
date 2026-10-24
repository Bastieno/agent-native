/**
 * A custom field described as a person would describe it.
 *
 * The settings page printed the stored shape — `enum: Science, Arts,
 * Commercial` — which is the word the code uses, not the word a head teacher
 * uses. They do not know what an enum is and have no reason to: what they want
 * to read back is "one of Science, Arts or Commercial", which is the sentence
 * they said to the agent in the first place.
 *
 * The list is joined with the school's own locale, so a French school reads
 * "Science, Arts ou Commercial".
 */

export type CustomField = {
  name: string;
  label?: string;
  type: "text" | "number" | "boolean" | "enum" | "date" | string;
  options?: string[];
  required?: boolean;
};

const TYPE_WORDS: Record<string, string> = {
  text: "text",
  number: "a number",
  boolean: "yes or no",
  date: "a date",
};

export function describeField(field: CustomField, locale?: string): string {
  if (field.type === "enum") {
    const options = field.options ?? [];
    if (options.length === 0) return "one of a list";
    return `one of ${joinOr(options, locale)}`;
  }
  return TYPE_WORDS[field.type] ?? field.type;
}

/** "On each student" — where the field actually turns up. */
export function entityPhrase(entity: string, labelFor?: (k: string) => string) {
  const word = labelFor?.(entity) ?? entity.replace(/_/g, " ");
  return `On each ${word}`;
}

/**
 * "Science, Arts or Commercial".
 *
 * `Intl.ListFormat` knows each language's own conventions — where the comma
 * goes, which word means "or" — so it is used where the runtime has it. The
 * project targets ES2020, which predates it, hence the guarded lookup and the
 * plain fallback rather than a build-wide target bump for one sentence.
 */
function joinOr(items: string[], locale?: string): string {
  const ListFormat = (Intl as unknown as { ListFormat?: any }).ListFormat;
  if (ListFormat) {
    try {
      return new ListFormat(locale || undefined, {
        type: "disjunction",
      }).format(items);
    } catch {
      // An unusable locale tag: fall through to the plain join.
    }
  }
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;
}
