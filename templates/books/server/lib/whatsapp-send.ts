/** Business-initiated WhatsApp sends (digests, reminders) through the Cloud API. */
const GRAPH = "https://graph.facebook.com/v21.0";

async function post(
  body: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId)
    return { ok: false, error: "WhatsApp is not connected" };
  const res = await fetch(`${GRAPH}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      ...body,
    }),
  });
  if (res.ok) return { ok: true };
  const data = (await res.json().catch(() => ({}))) as {
    error?: { message?: string };
  };
  return { ok: false, error: data.error?.message ?? `HTTP ${res.status}` };
}

/** Free text: only delivered inside WhatsApp's 24-hour window after the person last wrote. */
export const sendWhatsAppText = (to: string, text: string) =>
  post({ to, type: "text", text: { body: text.slice(0, 4096) } });

/** An approved template: works outside the 24-hour window. */
export const sendWhatsAppTemplate = (
  to: string,
  template: string,
  params: string[],
  language = "en",
) =>
  post({
    to,
    type: "template",
    template: {
      name: template,
      language: { code: language },
      components: [
        {
          type: "body",
          parameters: params.map((text) => ({ type: "text", text })),
        },
      ],
    },
  });
