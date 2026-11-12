import { afterEach, describe, expect, it, vi } from "vitest";
import { whatsappAdapter } from "./whatsapp.js";

/** The adapter reads the raw body cached on the event context. */
const eventWith = (message: Record<string, unknown>) =>
  ({
    context: {
      __rawBody: JSON.stringify({
        entry: [
          {
            changes: [
              {
                field: "messages",
                value: {
                  metadata: { phone_number_id: "PNID" },
                  contacts: [{ profile: { name: "Owner" } }],
                  messages: [
                    {
                      from: "2348000000000",
                      id: "wamid.1",
                      timestamp: "1762787515",
                      ...message,
                    },
                  ],
                },
              },
            ],
          },
        ],
      }),
    },
  }) as any;

describe("whatsapp adapter media", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.WHATSAPP_ACCESS_TOKEN;
  });

  it("parses an image message with its caption, as a reference only", async () => {
    const incoming = await whatsappAdapter().parseIncomingMessage(
      eventWith({
        type: "image",
        image: { id: "MEDIA1", mime_type: "image/jpeg", caption: "diesel" },
      }),
    );
    expect(incoming?.text).toBe("diesel");
    expect(incoming?.attachments).toEqual([
      { kind: "image", mediaId: "MEDIA1", mimeType: "image/jpeg" },
    ]);
    expect(JSON.stringify(incoming)).not.toContain("base64");
  });

  it("parses a document message with its file name", async () => {
    const incoming = await whatsappAdapter().parseIncomingMessage(
      eventWith({
        type: "document",
        document: {
          id: "MEDIA2",
          mime_type: "text/csv",
          filename: "sales-summary.csv",
        },
      }),
    );
    expect(incoming?.text).toBe("");
    expect(incoming?.attachments).toEqual([
      {
        kind: "document",
        mediaId: "MEDIA2",
        mimeType: "text/csv",
        fileName: "sales-summary.csv",
      },
    ]);
  });

  it("still ignores stickers", async () => {
    const incoming = await whatsappAdapter().parseIncomingMessage(
      eventWith({
        type: "sticker",
        sticker: { id: "S1", mime_type: "image/webp" },
      }),
    );
    expect(incoming).toBeNull();
  });

  it("still parses text", async () => {
    const incoming = await whatsappAdapter().parseIncomingMessage(
      eventWith({ type: "text", text: { body: " hello " } }),
    );
    expect(incoming?.text).toBe("hello");
    expect(incoming?.attachments).toBeUndefined();
  });

  it("fetchAttachment follows the media url with the token", async () => {
    process.env.WHATSAPP_ACCESS_TOKEN = "TOKEN";
    const fetchMock = vi.fn(async (url: string, init?: any) => {
      if (url === "https://graph.facebook.com/v21.0/MEDIA1") {
        return new Response(
          JSON.stringify({
            url: "https://lookaside.example/MEDIA1",
            mime_type: "image/jpeg",
            file_size: 3,
          }),
        );
      }
      if (url === "https://lookaside.example/MEDIA1") {
        expect(init?.headers?.Authorization).toBe("Bearer TOKEN");
        return new Response(new Uint8Array([1, 2, 3]));
      }
      throw new Error(`unexpected ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);
    const file = await whatsappAdapter().fetchAttachment!({
      kind: "image",
      mediaId: "MEDIA1",
      mimeType: "image/jpeg",
    });
    expect(file).toEqual({
      mimeType: "image/jpeg",
      dataBase64: Buffer.from([1, 2, 3]).toString("base64"),
    });
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toBe(
      "Bearer TOKEN",
    );
  });

  it("refuses files over 10 MB", async () => {
    process.env.WHATSAPP_ACCESS_TOKEN = "TOKEN";
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              url: "https://x",
              mime_type: "image/jpeg",
              file_size: 11 * 1024 * 1024,
            }),
          ),
      ),
    );
    await expect(
      whatsappAdapter().fetchAttachment!({
        kind: "image",
        mediaId: "BIG",
        mimeType: "image/jpeg",
      }),
    ).rejects.toThrow(/too large/i);
  });
});
