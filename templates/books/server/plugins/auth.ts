import { createAuthPlugin } from "@agent-native/core/server";

const rawAppTitle = "Books";
const appTitle =
  rawAppTitle === "{" + "{APP_TITLE}}" ? "Blank app" : rawAppTitle;

export default createAuthPlugin({
  // Machine callers with no session; each checks its own secret or signature.
  publicPaths: [
    "/api/books/cron/tick",
    "/api/books/cron/reconcile",
    // Only two build ids: lets a tab (or a check after a deploy) see a new version.
    "/api/books/version",
    "/api/moniepoint/webhook",
    // The privacy policy: the link Meta checks for the WhatsApp app.
    "/privacy",
  ],
  marketing: {
    appName: appTitle,
    tagline: "Your lounge and hub accounts, reconciled every day.",
    features: [
      "Moniebook sales, Moniepoint payments and WhatsApp receipts in one place",
      "Every day checked: transfers, cash in the till, free items and leakages",
      "Daily, weekly and monthly reports for you and your partner",
    ],
  },
});
