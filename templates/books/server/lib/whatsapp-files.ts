import { fetchIntegrationAttachment } from "@agent-native/core/server";

type Fetcher = (
  mediaId: string,
) => Promise<{ mimeType: string; dataBase64: string }>;

let fetcher: Fetcher = (mediaId) =>
  fetchIntegrationAttachment("whatsapp", mediaId);

/** A file sent to the WhatsApp number, by its media id. */
export const fetchWhatsAppFile = (mediaId: string) => fetcher(mediaId);

/** Checks replace the Graph API download with fixtures. */
export function setAttachmentFetcherForChecks(f: Fetcher): void {
  fetcher = f;
}
