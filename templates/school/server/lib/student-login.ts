/**
 * Sign-in names for learners who have no email address.
 *
 * A school creates the account and gives the learner an ID (their admission
 * number) and a password. Underneath, the sign-in system needs an email, so the
 * app makes one up: `<id>@<the school's address>.invalid`. `.invalid` can never
 * receive mail, so nothing is ever sent to it by mistake.
 *
 * The sign-in page builds the same address from what the learner types; its
 * rule for tidying an ID (lower case, no spaces, slashes become hyphens) must
 * match `normalizeUsername` here.
 */
import { randomInt } from "node:crypto";

/** An ID as the app stores it. */
export function normalizeUsername(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[\\/]+/g, "-");
}

/** Why an ID cannot be used, or null when it can. */
export function usernameProblem(username: string): string | null {
  if (!/^[a-z0-9][a-z0-9._-]{1,38}[a-z0-9]$/.test(username)) {
    return "Use 3 to 40 letters, numbers, dots, hyphens or underscores.";
  }
  return null;
}

/** The made-up address behind an ID, for a school reached at `host`. */
export function usernameEmail(username: string, host: string): string {
  return `${username}@${host.toLowerCase()}.invalid`;
}

/** Whether an address is one the app made up for a username account. */
export function isMadeUpEmail(email: string): boolean {
  return email.toLowerCase().endsWith(".invalid");
}

// No 0/O, 1/l/I: a password read off a printed sheet should not be ambiguous.
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

/** A starting password: ten characters in two groups, easy to read aloud. */
export function generatePassword(): string {
  const pick = () => ALPHABET[randomInt(ALPHABET.length)];
  const group = () => Array.from({ length: 5 }, pick).join("");
  return `${group()}-${group()}`;
}
