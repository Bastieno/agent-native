import { orgForHost } from "../../server/lib/school-host";
import { pickEdition, type Edition } from "@shared/landing-content";

export type IndexData =
  | { mode: "app" }
  | { mode: "landing"; edition: Edition; calLink: string | null };

/**
 * A session cookie of either kind the framework sets. Only its presence is
 * read: a stale one lands on the app, which sends the visitor to sign in.
 */
function hasSessionCookie(request: Request): boolean {
  const cookie = request.headers.get("cookie") ?? "";
  return /(?:^|;\s*)(?:__Secure-)?(?:an_session[\w-]*|[\w.-]*session_token)=/.test(
    cookie,
  );
}

/**
 * What `/` is for this request. A school's own address is the school's front
 * door, so it never shows the marketing page. Anyone already signed in goes
 * into the app. Everyone else gets the landing page, in the edition for
 * where they are.
 */
export async function indexData(
  request: Request,
): Promise<IndexData | { redirect: string }> {
  const signedIn = hasSessionCookie(request);
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? url.host;
  if (await orgForHost(host)) {
    return signedIn ? { mode: "app" } : { redirect: "/login" };
  }
  if (signedIn && url.searchParams.get("edition") === null) {
    return { mode: "app" };
  }
  return {
    mode: "landing",
    edition: pickEdition(
      url.searchParams.get("edition"),
      request.headers.get("x-vercel-ip-country"),
    ),
    calLink: process.env.CAL_LINK?.trim() || null,
  };
}
