/**
 * One rule for who may create an account.
 *
 * Accounts come into being on several paths: the email form, Better Auth's
 * own social sign-in, identity SSO from a workspace hub, and the framework's
 * generic Google route, which starts a session without a Better Auth user
 * row. An app that is invitation-only registers a rule
 * (`createAuthPlugin({ allowSignUp })`) and every one of those paths asks it
 * before letting a new address in. Existing accounts are never asked.
 */

export interface SignUpDetails {
  /** The address being signed up, trimmed and lower-cased. */
  email: string;
}

/**
 * `true` lets the address in. A string refuses it, and is what the person is
 * shown, so write it for them.
 */
export type AllowSignUp = (
  details: SignUpDetails,
) => true | string | Promise<true | string>;

/** The error code a refused sign-up carries, on every path. */
export const SIGN_UP_REFUSED = "SIGN_UP_NOT_ALLOWED";

let rule: AllowSignUp | null = null;

export function setSignUpRule(next: AllowSignUp | null): void {
  rule = next;
}

export function getSignUpRule(): AllowSignUp | null {
  return rule;
}

/**
 * Why this address may not sign up, or null when it may (or no rule is set).
 * A rule that throws refuses: an invitation-only app must not open up because
 * its lookup failed.
 */
export async function signUpRefusal(rawEmail: string): Promise<string | null> {
  if (!rule) return null;
  const email = rawEmail.trim().toLowerCase();
  try {
    const verdict = await rule({ email });
    if (verdict === true) return null;
    return typeof verdict === "string" && verdict
      ? verdict
      : "This address can't be used to create an account here.";
  } catch (err) {
    console.error("[auth] sign-up rule failed; refusing", err);
    return "We couldn't check this address just now. Please try again in a moment.";
  }
}

/** Whether an error is a refused sign-up, from whichever path raised it. */
export function isSignUpRefusal(error: unknown): boolean {
  const e = error as { body?: { code?: unknown }; code?: unknown } | null;
  return e?.body?.code === SIGN_UP_REFUSED || e?.code === SIGN_UP_REFUSED;
}
