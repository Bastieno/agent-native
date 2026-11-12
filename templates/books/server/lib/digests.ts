import { isEmailConfigured, sendEmail } from "@agent-native/core/server";
import {
  digestFigures,
  type DigestFigures,
  type DigestPeriod,
} from "./digest-figures.js";
import {
  renderEmailDigest,
  renderWhatsApp,
  summaryLine,
} from "./digest-render.js";
import { newId, nowIso } from "./ids.js";
import { rows, run } from "./sql.js";
import { sendWhatsAppTemplate } from "./whatsapp-send.js";

export interface Recipient {
  name: string;
  email?: string;
  whatsapp?: string;
}

export const appUrl = () =>
  (
    process.env.BOOKS_APP_URL ||
    process.env.BETTER_AUTH_URL ||
    "http://localhost:8140"
  ).replace(/\/$/, "");
export const reportLink = (id: string) => `${appUrl()}/reports/${id}`;

/** True when a sales summary has covered this day. */
export async function salesFileCovers(
  orgId: string,
  day: string,
): Promise<boolean> {
  const found = await rows(
    `SELECT id FROM imports WHERE org_id = ? AND kind = 'sales-summary' AND range_start <= ? AND range_end >= ? LIMIT 1`,
    [orgId, day, day],
  );
  return found.length > 0;
}

export async function buildDigest(
  orgId: string,
  period: DigestPeriod,
  start: string,
  end: string,
) {
  if (period === "daily" && !(await salesFileCovers(orgId, end)))
    throw new Error(`No sales file for ${end} yet.`);
  const figures = await digestFigures(orgId, period, start, end);
  const at = nowIso();
  const [existing] = await rows(
    `SELECT id, status FROM digests WHERE org_id = ? AND period = ? AND start_day = ? AND end_day = ?`,
    [orgId, period, start, end],
  );
  if (existing && existing.status !== "sent") {
    await run(
      `UPDATE digests SET figures = ?, commentary = NULL, status = 'draft' WHERE org_id = ? AND id = ?`,
      [JSON.stringify(figures), orgId, existing.id],
    );
    return { digestId: existing.id as string, figures };
  }
  if (existing)
    return { digestId: existing.id as string, figures, alreadySent: true };
  const id = newId();
  await run(
    `INSERT INTO digests (id, period, start_day, end_day, figures, commentary, status, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, NULL, 'draft', ?, ?, 'org')`,
    [id, period, start, end, JSON.stringify(figures), at, orgId],
  );
  return { digestId: id, figures };
}

export async function loadDigest(orgId: string, id: string) {
  const [d] = await rows(`SELECT * FROM digests WHERE org_id = ? AND id = ?`, [
    orgId,
    id,
  ]);
  if (!d) throw new Error("No such digest.");
  return {
    digestId: d.id as string,
    period: d.period as DigestPeriod,
    start: d.start_day as string,
    end: d.end_day as string,
    status: d.status as string,
    sentAt: (d.sent_at as string) ?? null,
    commentary: (d.commentary as string) ?? null,
    figures: JSON.parse(d.figures) as DigestFigures,
    delivery: d.delivery ? JSON.parse(d.delivery) : null,
    link: reportLink(d.id),
  };
}

export async function recipients(orgId: string): Promise<Recipient[]> {
  const [s] = await rows(
    `SELECT recipients FROM books_settings WHERE org_id = ?`,
    [orgId],
  );
  return s ? (JSON.parse(s.recipients || "[]") as Recipient[]) : [];
}

/** Deliver a saved digest. The digest is already stored, so a failed send never loses it. */
export async function sendDigest(orgId: string, id: string) {
  const d = await loadDigest(orgId, id);
  const people = await recipients(orgId);
  const results: {
    name: string;
    channel: string;
    ok: boolean;
    error?: string;
  }[] = [];
  const email = renderEmailDigest(d.figures, d.commentary, d.link);
  const subject = `Books ${d.period === "range" ? "report" : `${d.period} digest`}: ${summaryLine(d.figures)}`;
  for (const p of people) {
    if (p.whatsapp) {
      const r = await sendWhatsAppTemplate(p.whatsapp, "books_digest", [
        summaryLine(d.figures),
        d.link,
      ]);
      results.push({ name: p.name, channel: "whatsapp", ...r });
    }
    if (p.email) {
      if (!isEmailConfigured()) {
        results.push({
          name: p.name,
          channel: "email",
          ok: false,
          error: "Email is not set up",
        });
      } else {
        try {
          await sendEmail({
            to: p.email,
            subject,
            html: email.html,
            text: email.text,
          });
          results.push({ name: p.name, channel: "email", ok: true });
        } catch (err) {
          results.push({
            name: p.name,
            channel: "email",
            ok: false,
            error: (err as Error).message,
          });
        }
      }
    }
  }
  const ok = results.some((r) => r.ok);
  await run(
    `UPDATE digests SET status = ?, sent_at = ?, delivery = ? WHERE org_id = ? AND id = ?`,
    [
      ok ? "sent" : "failed",
      ok ? nowIso() : null,
      JSON.stringify(results),
      orgId,
      id,
    ],
  );
  return {
    digestId: id,
    status: ok ? "sent" : "failed",
    results,
    whatsappText: renderWhatsApp(d.figures, d.link),
  };
}
