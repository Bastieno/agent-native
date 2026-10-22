import { isEmailConfigured } from "@agent-native/core/server";

/**
 * Whether sign-up confirms the address by email, worked out the way the
 * framework does (`better-auth-instance.ts`): only with an email provider,
 * and not when `AUTH_SKIP_EMAIL_VERIFICATION` is on (the default in
 * development and test).
 */
function signUpVerifiesEmail(): boolean {
  if (!isEmailConfigured()) return false;
  const raw = process.env.AUTH_SKIP_EMAIL_VERIFICATION;
  const skip =
    raw == null
      ? process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
      : !["", "0", "false"].includes(raw.trim().toLowerCase());
  return !skip;
}

/**
 * Refuse to start a production deployment that hands schools out to strangers.
 *
 * `AUTO_CREATE_DEFAULT_ORG` gives any new account its own organisation — which
 * is what you want locally, so the first account you create has a school to set
 * up. In production it means anyone who reaches the sign-up page provisions a
 * school inside your deployment. For an app holding children's records, that
 * should not be reachable by forgetting an environment variable.
 *
 * Set `ALLOW_OPEN_SIGNUP=1` to override deliberately.
 *
 * It also refuses to start when sign-up does not confirm the address by
 * email. Sign-up is invitation-only, by address: without a confirmation
 * email, anyone who knows an invited address can create that account before
 * its owner does. Set `ALLOW_UNVERIFIED_SIGNUP=1` to override deliberately.
 */
export default function signupPolicyPlugin() {
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.AGENT_MODE === "production";
  const autoCreate = !!process.env.AUTO_CREATE_DEFAULT_ORG;
  const override = !!process.env.ALLOW_OPEN_SIGNUP;

  if (isProduction && autoCreate && !override) {
    throw new Error(
      [
        "Refusing to start: AUTO_CREATE_DEFAULT_ORG is set in production.",
        "Every new sign-up would create its own school inside this deployment.",
        "Create schools deliberately and invite their admins instead.",
        "If this really is what you want, set ALLOW_OPEN_SIGNUP=1.",
      ].join(" "),
    );
  }

  if (isProduction && !signUpVerifiesEmail()) {
    if (!process.env.ALLOW_UNVERIFIED_SIGNUP) {
      throw new Error(
        [
          "Refusing to start: sign-up does not confirm addresses by email in production.",
          "Invitations are by address, so anyone who knows an invited address could claim that account first.",
          "Configure an email provider (RESEND_API_KEY or SENDGRID_API_KEY) and leave AUTH_SKIP_EMAIL_VERIFICATION unset.",
          "If this really is what you want, set ALLOW_UNVERIFIED_SIGNUP=1.",
        ].join(" "),
      );
    }
    console.warn(
      "[school] Sign-up does not confirm addresses by email (ALLOW_UNVERIFIED_SIGNUP): an invited address can be claimed by whoever signs up with it first.",
    );
  }

  if (isProduction && autoCreate && override) {
    console.warn(
      "[school] Open sign-up is enabled in production (ALLOW_OPEN_SIGNUP): anyone signing up gets their own school.",
    );
  }
}
