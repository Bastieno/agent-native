/**
 * Whether a stored name is a person's name, and what to call them.
 *
 * Signing up asks only for an email and a password, so the framework fills the
 * name in from the address — `student1@pilot.test` becomes "student1". A name
 * may therefore be one someone chose or one nobody did, and they differ in one
 * reliable way: a derived name equals the address's local part.
 *
 * Greeting a child as "student1" is worse than not greeting them at all, so
 * anything user-facing checks here first.
 */

export function realNameOrNull(
  name: string | null | undefined,
  email: string | null | undefined,
): string | null {
  const trimmed = name?.trim();
  if (!trimmed) return null;
  const local = email?.split("@")[0]?.trim().toLowerCase();
  if (local && trimmed.toLowerCase() === local) return null;
  return trimmed;
}

/** What to call someone to their face: their first name, or null. */
export function firstNameOrNull(
  name: string | null | undefined,
  email: string | null | undefined,
): string | null {
  const real = realNameOrNull(name, email);
  if (!real) return null;
  // "Mrs Adaeze Okoro" → "Mrs Adaeze" reads oddly, but dropping a title
  // guesses at which words are titles in a school's own conventions. The
  // first word is the safest thing we can say with confidence.
  return real.split(" ")[0] ?? real;
}
