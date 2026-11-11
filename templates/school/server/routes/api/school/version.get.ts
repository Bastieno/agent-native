import { defineEventHandler, setResponseHeader } from "h3";

/**
 * Which build of the app is live. An open tab compares this with the build it
 * loaded and offers a refresh when they differ.
 *
 * The id is the version React Router stamps on a build's client manifest. The
 * browser has the same value (`window.__reactRouterManifest.version`) and the
 * server build embeds it, so it changes exactly when the client code changes:
 * a deploy that touches only the server asks nobody to refresh. It needs no
 * hosting provider's variable, so it works on any host. Vercel's deployment id
 * is the fallback, and locally there is one build, so it never changes. It is
 * behind the same sign-in as the rest of /api, and carries nothing but an id.
 */
export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Cache-Control", "no-store");
  let version: string | undefined;
  try {
    const build: any = await import("virtual:react-router/server-build");
    version = build?.assets?.version;
  } catch {
    // No build to read (an odd dev state): fall back below.
  }
  return {
    id:
      version ??
      process.env.VERCEL_DEPLOYMENT_ID ??
      process.env.VERCEL_GIT_COMMIT_SHA ??
      "dev",
  };
});
