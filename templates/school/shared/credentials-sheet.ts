/**
 * What a credentials sheet carries, and how it travels.
 *
 * Passwords are kept nowhere, so the sheet cannot be rebuilt later. Instead
 * the action puts the credentials in the link's fragment (the part after `#`),
 * which a browser never sends to a server: the sheet page reads them there and
 * nothing is stored or logged on the way.
 */
export interface SheetRow {
  /** Learner's name. */
  n: string;
  /** Sign-in ID. */
  u: string;
  /** Starting password. */
  p: string;
  /** Year group, when known. */
  g?: string | null;
}

export interface SheetData {
  /** Where learners sign in. */
  address: string;
  rows: SheetRow[];
}

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array {
  const pad = "=".repeat((4 - (text.length % 4)) % 4);
  const bin = atob((text + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

export function encodeSheet(data: SheetData): string {
  return toBase64Url(new TextEncoder().encode(JSON.stringify(data)));
}

export function decodeSheet(fragment: string): SheetData | null {
  try {
    const raw = fragment.replace(/^#/, "");
    if (!raw) return null;
    const data = JSON.parse(new TextDecoder().decode(fromBase64Url(raw)));
    if (
      typeof data?.address !== "string" ||
      !Array.isArray(data.rows) ||
      data.rows.some(
        (r: any) => typeof r?.n !== "string" || typeof r?.u !== "string",
      )
    ) {
      return null;
    }
    return data as SheetData;
  } catch {
    return null;
  }
}

/** The path of the page that prints a sheet, with the credentials in its fragment. */
export function sheetPath(data: SheetData): string {
  return `/print/credentials#${encodeSheet(data)}`;
}
