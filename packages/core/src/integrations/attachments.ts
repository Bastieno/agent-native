import { whatsappAdapter } from "./adapters/whatsapp.js";
import type { IncomingAttachment, PlatformAdapter } from "./types.js";

const fetchers: Record<string, () => PlatformAdapter> = {
  whatsapp: whatsappAdapter,
};

/**
 * Download a file an integration message referenced (e.g. the mediaId in an
 * `[Attached file: …, mediaId …]` line), for app actions that process it.
 */
export async function fetchIntegrationAttachment(
  platform: string,
  mediaId: string,
  hint: Partial<IncomingAttachment> = {},
): Promise<{ mimeType: string; dataBase64: string }> {
  const adapter = fetchers[platform]?.();
  if (!adapter?.fetchAttachment)
    throw new Error(`${platform} attachments are not supported`);
  return adapter.fetchAttachment({
    kind: hint.kind ?? "document",
    mediaId,
    mimeType: hint.mimeType ?? "application/octet-stream",
    ...(hint.fileName ? { fileName: hint.fileName } : {}),
  });
}
