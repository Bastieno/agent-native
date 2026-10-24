import { createError, defineEventHandler, getQuery } from "h3";
import { getSession, runWithRequestContext } from "@agent-native/core/server";
import { getOrgSetting } from "@agent-native/core/settings";
import { actorForEmail } from "../../../lib/class-access.js";
import {
  CREST_SETTING_KEY,
  type StoredCrest,
} from "../../../lib/school-crest.js";

/**
 * The school's crest, as the image itself.
 *
 * Only someone signed in to the school sees it, like everything else here: it
 * is read for the caller's own school, never one named in the request. The
 * address carries a version, so a browser keeps a crest for a year and picks
 * up a new one the moment it changes.
 */
export default defineEventHandler(async (event) => {
  const session = await getSession(event);
  const email = session?.email;
  if (!email) throw createError({ statusCode: 401, statusMessage: "Sign in" });

  const actor = await actorForEmail(email);
  if (!actor?.schoolId) throw createError({ statusCode: 404 });

  return runWithRequestContext(
    { userEmail: email, orgId: actor.schoolId },
    async () => {
      const crest = (await getOrgSetting(
        actor.schoolId,
        CREST_SETTING_KEY,
      )) as unknown as StoredCrest | null;
      const match = crest?.dataUrl?.match(/^data:([^;,]+);base64,(.+)$/);
      if (!match) throw createError({ statusCode: 404 });

      const versioned = !!getQuery(event).v;
      return new Response(Buffer.from(match[2], "base64"), {
        headers: {
          "Content-Type": match[1],
          "Cache-Control": versioned
            ? "private, max-age=31536000, immutable"
            : "private, max-age=300",
          // An SVG is only ever drawn as an image; this stops a browser
          // running anything inside one that is opened directly.
          "Content-Security-Policy":
            "default-src 'none'; style-src 'unsafe-inline'",
          "X-Content-Type-Options": "nosniff",
        },
      });
    },
  );
});
