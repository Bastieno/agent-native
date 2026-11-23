/**
 * Who an email speaks for, when one deployment serves several organisations
 * each on its own address.
 *
 * The framework's system emails (password reset, email verification) used to
 * name the app and link to the deployment's one URL. An app that gives each
 * school its own host can register a resolver here: given the host a request
 * arrived on, it says which name the email should carry and which origin its
 * link should point to. A host the resolver does not know gets the defaults,
 * so apps that never register one behave exactly as before.
 */
export interface EmailBranding {
  /** Shown as the sender's name and in the email's wording. */
  name?: string;
  /** Origin links in the email point to, e.g. `https://school.example.com`. */
  origin?: string;
  /** Where replies go. */
  replyTo?: string;
}

export type EmailBrandingResolver = (
  host: string,
) => Promise<EmailBranding | null> | EmailBranding | null;

let resolver: EmailBrandingResolver | null = null;

export function setEmailBrandingResolver(fn: EmailBrandingResolver | null) {
  resolver = fn;
}

/** The host a request was made to, behind a proxy or not. */
function hostOf(request?: Request | null): string {
  if (!request) return "";
  const forwarded = request.headers.get("x-forwarded-host");
  const raw = (forwarded?.split(",")[0] || request.headers.get("host")) ?? "";
  return raw.trim().toLowerCase();
}

/** The branding for the host this request arrived on, if the app has any. */
export async function brandingForRequest(
  request?: Request | null,
): Promise<EmailBranding | null> {
  const host = hostOf(request);
  if (!resolver || !host) return null;
  try {
    return (await resolver(host)) ?? null;
  } catch {
    // An email is worth sending even when the lookup is not.
    return null;
  }
}

/** A display name that cannot add a header or break the address. */
export function safeDisplayName(name: string): string {
  return name
    .replace(/[\r\n<>",]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
