/**
 * Where a school's crest is kept.
 *
 * The image lives in its own setting, not inside `school-config`. The config
 * is read on nearly every page and handed to the assistant whole, so an image
 * inlined in it is carried everywhere and, as text, costs the assistant tens
 * of thousands of tokens per read. Only a short address goes in the config
 * (`theme.logoUrl`), and the image is served from `/api/school/crest`.
 */
export const CREST_SETTING_KEY = "school-crest";

/** Raw bytes, before base64 expands them by about a third. */
export const MAX_CREST_BYTES = 512 * 1024;

export interface StoredCrest {
  dataUrl: string;
  mimeType: string;
  updatedAt: number;
}

/** The address that goes in `theme.logoUrl`; the version busts the cache. */
export function crestUrl(updatedAt: number): string {
  return `/api/school/crest?v=${updatedAt}`;
}
