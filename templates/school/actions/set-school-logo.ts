import { defineAction } from "@agent-native/core";
import {
  deleteOrgSetting,
  getOrgSetting,
  putOrgSetting,
} from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import {
  CREST_SETTING_KEY,
  MAX_CREST_BYTES,
  crestUrl,
} from "../server/lib/school-crest.js";

/**
 * Put the school's crest on its portal and its paper, without object storage.
 *
 * A crest changes about once a decade, so it is held in the school's own
 * settings rather than in a bucket: no S3 account, no credentials, no bill and
 * no second system to back up — and, more importantly, no public URL: a file
 * in a bucket is readable by anyone who gets the link, which is the wrong
 * default for a deployment holding children's records, even for a logo.
 *
 * The image is kept in its own setting and served from `/api/school/crest` to
 * people signed in to the school; only that short address goes in the school's
 * configuration as `theme.logoUrl`. (It used to be inlined in the config, which
 * is read on nearly every page and handed to the assistant whole, so it had to
 * stay tiny.) Everything that already renders `theme.logoUrl` in an `<img>`
 * keeps working with no change.
 *
 * This is deliberately not a general file service. When learners start handing
 * in photographs of their working, those are many, large and genuinely
 * sensitive, and they need a real store with access checks per file. This
 * covers the one small case properly instead of building that early.
 */

const ALLOWED = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  // Safe here because the crest is only ever rendered as an <img> source,
  // which does not execute script inside the image.
  "image/svg+xml",
]);

export default defineAction({
  description:
    "Set or remove the school's crest, shown in the portal header and on printed documents. Takes the image as a data URL (data:image/png;base64,...), stored inline in the school's configuration — no file hosting needed. Square works best; 512×512 is plenty.",
  schema: z.object({
    dataUrl: z
      .string()
      .optional()
      .describe(
        "The image as a data URL: data:image/png;base64,iVBOR... PNG, JPEG, WebP or SVG, under 512KB before encoding.",
      ),
    clear: z
      .boolean()
      .optional()
      .default(false)
      .describe("Remove the current crest"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");

    const existing =
      ((await getOrgSetting(orgId, "school-config")) as Record<
        string,
        any
      > | null) ?? {};
    const theme = { ...((existing.theme as Record<string, any>) ?? {}) };

    if (args.clear) {
      delete theme.logoUrl;
      await putOrgSetting(orgId, "school-config", { ...existing, theme });
      await deleteOrgSetting(orgId, CREST_SETTING_KEY);
      return { cleared: true, message: "The school crest has been removed." };
    }

    if (!args.dataUrl) {
      throw new Error(
        "Pass dataUrl with the image, or clear=true to remove it.",
      );
    }

    const match = args.dataUrl.match(/^data:([^;,]+);base64,(.+)$/);
    if (!match) {
      throw new Error(
        "dataUrl must look like data:image/png;base64,<encoded>. If you have a file on disk, read it and base64-encode it first.",
      );
    }

    const mimeType = match[1].trim().toLowerCase();
    if (!ALLOWED.has(mimeType)) {
      throw new Error(
        `${mimeType} is not a supported image type. Use PNG, JPEG, WebP or SVG.`,
      );
    }

    // Decode to measure the real size — base64 inflates by roughly a third,
    // and the limit that matters is what every page load has to carry.
    let bytes: Buffer;
    try {
      bytes = Buffer.from(match[2], "base64");
    } catch {
      throw new Error("The image data could not be decoded.");
    }
    if (bytes.length === 0) throw new Error("The image is empty.");
    if (bytes.length > MAX_CREST_BYTES) {
      throw new Error(
        `That image is ${Math.round(bytes.length / 1024)}KB, and the limit is ${
          MAX_CREST_BYTES / 1024
        }KB. Resize it — 512×512 is plenty for a crest.`,
      );
    }

    const updatedAt = Date.now();
    await putOrgSetting(orgId, CREST_SETTING_KEY, {
      dataUrl: args.dataUrl,
      mimeType,
      updatedAt,
    });
    theme.logoUrl = crestUrl(updatedAt);
    await putOrgSetting(orgId, "school-config", { ...existing, theme });

    return {
      mimeType,
      bytes: bytes.length,
      message: `Crest saved (${mimeType}, ${Math.round(bytes.length / 1024)}KB). It now appears in the portal header and on printed documents.`,
    };
  },
});
