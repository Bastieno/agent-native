import { defineEventHandler, setResponseHeader } from "h3";

/**
 * Which build of Books is live. An open tab compares it with the build it
 * loaded and offers a refresh when they differ.
 *
 * The id is the version React Router stamps on a build's client manifest; the
 * browser holds the same value (`window.__reactRouterManifest.version`). It
 * changes only when the client code changes, so a server-only deploy asks
 * nobody to refresh. Behind sign-in like the rest of /api; it carries only an id.
 */
export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Cache-Control", "no-store");
  let version: string | undefined;
  try {
    // @ts-ignore: the virtual module exists only inside a build
    const build: any = await import("virtual:react-router/server-build");
    version = build?.assets?.version;
  } catch {
    // No build to read (development): one build, so it never changes.
  }
  return { id: version ?? "dev" };
});
