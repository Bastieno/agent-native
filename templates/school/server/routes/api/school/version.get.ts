import { defineEventHandler, setResponseHeader } from "h3";

/**
 * Which deployment is live. An open tab compares this with the one it loaded
 * under and offers a refresh when they differ. Vercel sets the id on every
 * deployment; locally there is only one, so it never changes. It is behind
 * the same sign-in as the rest of /api, and carries nothing but an id.
 */
export default defineEventHandler((event) => {
  setResponseHeader(event, "Cache-Control", "no-store");
  return {
    id:
      process.env.VERCEL_DEPLOYMENT_ID ??
      process.env.VERCEL_GIT_COMMIT_SHA ??
      "dev",
  };
});
