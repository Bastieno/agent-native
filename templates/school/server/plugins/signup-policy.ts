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

  if (isProduction && autoCreate && override) {
    console.warn(
      "[school] Open sign-up is enabled in production (ALLOW_OPEN_SIGNUP): anyone signing up gets their own school.",
    );
  }
}
