import type { OnboardingStep } from "@agent-native/core/onboarding";
import { rows } from "./sql.js";

const has = (...keys: string[]) => keys.every((k) => !!process.env[k]);

async function orgHas(
  orgId: string | null | undefined,
  sql: string,
): Promise<boolean> {
  if (!orgId) return false;
  const found = await rows(sql, [orgId]).catch(() => []);
  return found.length > 0;
}

/** Books' setup checklist, in the order the owner does it. */
export const BOOKS_SETUP_STEPS: OnboardingStep[] = [
  {
    id: "books-whatsapp",
    order: 40,
    required: false,
    title: "WhatsApp number",
    description:
      "The number receipts and Moniebook files are sent to, on the WhatsApp Business (Cloud) API. In Meta's dashboard set the webhook to <your app>/_agent-native/integrations/whatsapp/webhook, and create a message template named books_digest with two variables: a one-line summary and a link.",
    methods: [
      {
        id: "keys",
        kind: "form",
        label: "Add the WhatsApp keys",
        primary: true,
        payload: {
          writeScope: "app",
          fields: [
            {
              key: "WHATSAPP_ACCESS_TOKEN",
              label: "Permanent access token",
              secret: true,
            },
            { key: "WHATSAPP_PHONE_NUMBER_ID", label: "Phone number ID" },
            {
              key: "WHATSAPP_VERIFY_TOKEN",
              label: "Verify token (any random text, also pasted into Meta)",
            },
            { key: "WHATSAPP_APP_SECRET", label: "App secret", secret: true },
          ],
        },
      },
      {
        id: "docs",
        kind: "link",
        label: "Meta's setup guide",
        payload: {
          url: "https://developers.facebook.com/docs/whatsapp/cloud-api/get-started",
          external: true,
        },
      },
    ],
    isComplete: () =>
      has(
        "WHATSAPP_ACCESS_TOKEN",
        "WHATSAPP_PHONE_NUMBER_ID",
        "WHATSAPP_VERIFY_TOKEN",
        "WHATSAPP_APP_SECRET",
      ),
  },
  {
    id: "books-moniepoint",
    order: 41,
    required: false,
    title: "Moniepoint payments",
    description:
      "In the Moniepoint Business dashboard, open the POS Apps developer section, subscribe a webhook to <your app>/api/moniepoint/webhook, and paste its signing secret here. The organisation id is shown in Settings → Connections.",
    methods: [
      {
        id: "keys",
        kind: "form",
        label: "Add the webhook secret",
        primary: true,
        payload: {
          writeScope: "app",
          fields: [
            {
              key: "MONIEPOINT_WEBHOOK_SECRET",
              label: "Webhook signing secret",
              secret: true,
            },
            { key: "MONIEPOINT_ORG_ID", label: "Books organisation id" },
          ],
        },
      },
    ],
    isComplete: () => has("MONIEPOINT_WEBHOOK_SECRET", "MONIEPOINT_ORG_ID"),
  },
  {
    id: "books-people",
    order: 43,
    required: false,
    title: "You and your partner",
    description:
      "Add both of you with an email and WhatsApp number. Books only listens to these numbers.",
    methods: [
      {
        id: "people",
        kind: "link",
        label: "Add people",
        primary: true,
        payload: { url: "/settings?tab=people" },
      },
    ],
    isComplete: (ctx) =>
      orgHas(
        ctx?.orgId,
        `SELECT org_id FROM books_settings WHERE org_id = ? AND recipients <> '[]'`,
      ),
  },
  {
    id: "books-first-import",
    order: 44,
    required: false,
    title: "First files",
    description:
      "Upload a Sales by item report first (it sets categories and costs), then sales summaries and payment method reports. End each date range on the day after.",
    methods: [
      {
        id: "upload",
        kind: "link",
        label: "Upload on Sales",
        primary: true,
        payload: { url: "/sales" },
      },
    ],
    isComplete: (ctx) =>
      orgHas(
        ctx?.orgId,
        `SELECT id FROM imports WHERE org_id = ? AND kind = 'item-sales' LIMIT 1`,
      ).then(
        async (items) =>
          items &&
          (await orgHas(
            ctx?.orgId,
            `SELECT id FROM imports WHERE org_id = ? AND kind = 'sales-summary' LIMIT 1`,
          )),
      ),
  },
  {
    id: "books-digests",
    order: 45,
    required: false,
    title: "Switch on digests",
    description:
      "Turns on the 8am daily, Monday weekly and 1st-of-the-month digests. On a host without an always-on server, also set CRON_SECRET so the daily safety net can run.",
    methods: [
      {
        id: "on",
        kind: "link",
        label: "Switch on",
        primary: true,
        payload: { url: "/settings?tab=connections" },
      },
      {
        id: "cron",
        kind: "form",
        label: "Set CRON_SECRET",
        payload: {
          writeScope: "app",
          fields: [{ key: "CRON_SECRET", label: "CRON_SECRET", secret: true }],
        },
      },
    ],
    isComplete: async () =>
      (
        await rows(
          `SELECT id FROM resources WHERE path = 'jobs/books-digests.md' LIMIT 1`,
        ).catch(() => [])
      ).length > 0,
  },
];
