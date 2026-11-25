import { unzipSync, strFromU8 } from "fflate";

/** Base64 without Node's Buffer, so the browser can read exports too. */
export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

/**
 * A WhatsApp "Export chat" zip (with media), from iPhone or Android. Dates
 * are read as day/month/year, Lagos time.
 */
export interface ChatMessage {
  at: string; // ISO instant
  sender: string;
  text: string;
  attachment?: { fileName: string; mimeType: string; dataBase64: string };
}

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  pdf: "application/pdf",
};
const mimeFor = (name: string) =>
  MIME[name.split(".").pop()?.toLowerCase() ?? ""] ??
  "application/octet-stream";

const IOS =
  /^\[(\d{1,2})\/(\d{1,2})\/(\d{2,4}),? (\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])?\] ([^:]+): ?(.*)$/;
const ANDROID =
  /^(\d{1,2})\/(\d{1,2})\/(\d{2,4}),? (\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])? - ([^:]+): ?(.*)$/;
const ATTACHED_IOS = /<attached: ([^>]+)>/;
const ATTACHED_ANDROID = /^(.+?) \(file attached\)$/;

function instant(
  d: string,
  m: string,
  y: string,
  h: string,
  min: string,
  s: string | undefined,
  ampm: string | undefined,
) {
  let hour = Number(h);
  if (ampm) {
    const pm = ampm.toLowerCase() === "pm";
    if (pm && hour < 12) hour += 12;
    if (!pm && hour === 12) hour = 0;
  }
  const year = y.length === 2 ? `20${y}` : y;
  const pad = (v: string | number) => String(v).padStart(2, "0");
  return new Date(
    `${year}-${pad(m)}-${pad(d)}T${pad(hour)}:${pad(min)}:${pad(s ?? 0)}+01:00`,
  ).toISOString();
}

export function readChatExport(zip: Uint8Array): ChatMessage[] {
  const files = unzipSync(zip);
  const chatName =
    Object.keys(files).find((n) => n.endsWith("_chat.txt")) ??
    Object.keys(files).find((n) => n.toLowerCase().endsWith(".txt"));
  if (!chatName) {
    const photos = loosePhotos(files);
    if (photos.length) return photos;
    throw new Error("This zip has no WhatsApp chat in it.");
  }
  const byBase = new Map<string, Uint8Array>();
  for (const [name, bytes] of Object.entries(files))
    byBase.set(name.split("/").pop()!, bytes);

  const out: ChatMessage[] = [];
  const attach = (msg: ChatMessage, fileName: string) => {
    const bytes = byBase.get(fileName.trim());
    if (!bytes) return;
    msg.attachment = {
      fileName: fileName.trim(),
      mimeType: mimeFor(fileName),
      dataBase64: bytesToBase64(bytes),
    };
  };
  const takeText = (msg: ChatMessage, raw: string) => {
    const ios = raw.match(ATTACHED_IOS);
    const android = raw.match(ATTACHED_ANDROID);
    if (ios) {
      attach(msg, ios[1]);
      raw = raw.replace(ATTACHED_IOS, "").trim();
    } else if (android) {
      attach(msg, android[1]);
      raw = "";
    }
    if (raw) msg.text = msg.text ? `${msg.text}\n${raw}` : raw;
  };

  for (const rawLine of strFromU8(files[chatName]).split(/\r?\n/)) {
    const line = rawLine.replace(/[‎‏‪-‮]/g, "").trimEnd();
    if (!line) continue;
    const m = line.match(IOS) ?? line.match(ANDROID);
    if (m) {
      const msg: ChatMessage = {
        at: instant(m[1], m[2], m[3], m[4], m[5], m[6], m[7]),
        sender: m[8].trim(),
        text: "",
      };
      takeText(msg, m[9]);
      out.push(msg);
    } else if (out.length) {
      takeText(out[out.length - 1], line.trim());
    }
  }
  return out;
}

/** WhatsApp's own media names: PHOTO-2026-11-12-09-30-20 (iOS), IMG-20261113-WA0004 (Android). */
const IOS_NAME =
  /^(?:\d+-)?PHOTO-(\d{4})-(\d\d)-(\d\d)-(\d\d)-(\d\d)-(\d\d)\.\w+$/;
const ANDROID_NAME = /^(?:IMG|DOC)-(\d{4})(\d\d)(\d\d)-WA\d+\.\w+$/;

/**
 * Photos saved out of WhatsApp and zipped without the chat: each is dated by
 * its own name (Lagos time; Android names carry the day only). Files not named
 * that way are left out, since nothing says when they were sent.
 */
function loosePhotos(files: Record<string, Uint8Array>): ChatMessage[] {
  const out: ChatMessage[] = [];
  for (const [path, bytes] of Object.entries(files)) {
    const name = path.split("/").pop()!;
    if (path.startsWith("__MACOSX/") || name.startsWith(".")) continue;
    const ios = name.match(IOS_NAME);
    const android = ios ? null : name.match(ANDROID_NAME);
    if (!ios && !android) continue;
    const at = ios
      ? instant(ios[3], ios[2], ios[1], ios[4], ios[5], ios[6], undefined)
      : instant(
          android![3],
          android![2],
          android![1],
          "0",
          "0",
          "0",
          undefined,
        );
    out.push({
      at,
      sender: "",
      text: "",
      attachment: {
        fileName: name,
        mimeType: mimeFor(name),
        dataBase64: bytesToBase64(bytes),
      },
    });
  }
  return out.sort((a, b) => a.at.localeCompare(b.at));
}
