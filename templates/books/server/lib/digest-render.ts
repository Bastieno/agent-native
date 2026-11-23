import { renderEmail } from "@agent-native/core/server";
import type { DigestFigures } from "./digest-figures.js";
import { formatNaira as n } from "./money.js";
import {
  BUSINESS_NAMES as NAMES,
  FLAG_WORDS,
  signalText,
} from "../../shared/labels.js";

const TITLES = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  range: "Report",
} as const;

const dateLabel = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
export const periodLabel = (f: DigestFigures) =>
  f.start === f.end
    ? dateLabel(f.start)
    : `${dateLabel(f.start)}–${dateLabel(f.end)}`;

function flagSummary(f: DigestFigures): string[] {
  return Object.entries(f.flagCounts)
    .filter(([k]) => FLAG_WORDS[k])
    .map(([k, c]) => `${c} ${FLAG_WORDS[k]}`);
}

/** The short WhatsApp message. Never names customers, senders or staff. */
/** " (car fuel ₦40,000, phone & data ₦12,000)": the biggest kinds of owner's pay. */
export function ownerKinds(f: DigestFigures, max = 3): string {
  const kinds = Object.entries(f.ownersPayByKind ?? {})
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1]);
  // Only plain Owner's pay: nothing to break down.
  if (!kinds.length || (kinds.length === 1 && kinds[0][0] === "Other"))
    return "";
  const shown = kinds
    .slice(0, max)
    .map(([k, v]) => `${k.toLowerCase()} ${n(v)}`);
  if (kinds.length > max) shown.push("…");
  return ` (${shown.join(", ")})`;
}

export function renderWhatsApp(f: DigestFigures, link: string): string {
  const lines = [`Books · ${TITLES[f.period]} · ${periodLabel(f)}`];
  for (const b of ["lounge", "hub"]) {
    const x = f.businesses[b];
    if (x)
      lines.push(
        `${NAMES[b]}: in ${n(x.income)}, profit ${n(x.grossProfit)}, out ${n(x.expenses)}`,
      );
  }
  lines.push(
    `Net ${n(f.combined.net)}${f.cashInTill != null && f.period === "daily" ? ` · cash in till ${n(f.cashInTill)}` : ""}`,
  );
  if (f.ownersPay > 0 || f.unitemised > 0)
    lines.push(
      [
        f.ownersPay > 0
          ? `of which owner's pay ${n(f.ownersPay)}${ownerKinds(f)}`
          : null,
        f.unitemised > 0
          ? `sent for stock, not itemised ${n(f.unitemised)}`
          : null,
      ]
        .filter(Boolean)
        .join(" · "),
    );
  if (f.stockBought > 0)
    lines.push(
      `Stock bought ${n(f.stockBought)} (cost of goods sold ${n(f.combined.costOfGoods)})`,
    );
  const moved = Object.entries(f.notCosts ?? {});
  if (moved.length)
    lines.push(
      `Moved, not counted as costs: ${moved.map(([c, v]) => `${c.toLowerCase()} ${n(v)}`).join(", ")}`,
    );
  const good = f.trends
    .filter((s) => s.direction === "good")
    .slice(0, 2)
    .map(signalText);
  const watch = f.trends
    .filter((s) => s.direction === "watch")
    .slice(0, 2)
    .map(signalText);
  if (good.length) lines.push(`Going well: ${good.join("; ")}`);
  if (watch.length) lines.push(`To watch: ${watch.join("; ")}`);
  const flags = flagSummary(f).slice(0, 3);
  if (flags.length) lines.push(`Checks: ${flags.join(", ")}`);
  lines.push(link);
  return lines.join("\n").slice(0, 990);
}

/** One line for the WhatsApp template's summary parameter (no newlines allowed). */
export function summaryLine(f: DigestFigures): string {
  return `${periodLabel(f)}: income ${n(f.combined.income)}, profit ${n(f.combined.grossProfit)}, net ${n(f.combined.net)}`;
}

export function renderEmailDigest(
  f: DigestFigures,
  commentary: string | null,
  link: string,
) {
  const paragraphs: string[] = [];
  if (commentary)
    paragraphs.push(
      ...commentary
        .split(/\n{2,}/)
        .map((p) => p.replace(/\n/g, " ").trim())
        .filter(Boolean),
    );
  for (const b of ["lounge", "hub"]) {
    const x = f.businesses[b];
    if (x) {
      paragraphs.push(
        `${NAMES[b]}: income ${n(x.income)}, cost of goods ${n(x.costOfGoods)}, gross profit ${n(x.grossProfit)}, expenses ${n(x.expenses)}, net ${n(x.net)}.`,
      );
    }
  }
  paragraphs.push(
    `Both: income ${n(f.combined.income)}, net ${n(f.combined.net)}${f.combined.margin != null ? `, margin ${f.combined.margin}%` : ""}.`,
  );
  if (f.ownersPay > 0 || f.unitemised > 0)
    paragraphs.push(
      `Included in expenses: owner's pay ${n(f.ownersPay)}${ownerKinds(f)}; sent to a manager for stock with no breakdown ${n(f.unitemised)}. Net before owner's pay: ${n(f.combined.net + f.ownersPay)}.`,
    );
  if (f.stockBought > 0)
    paragraphs.push(
      `Stock bought ${n(f.stockBought)}, against cost of goods sold ${n(f.combined.costOfGoods)}. Stock is not taken off again as an expense.`,
    );
  const moved = Object.entries(f.notCosts ?? {});
  if (moved.length)
    paragraphs.push(
      `Money moved, not counted as costs: ${moved.map(([c, v]) => `${c.toLowerCase()} ${n(v)}`).join("; ")}.`,
    );
  const given = f.notIncome.atCost;
  paragraphs.push(
    `Given away at cost: The House ${n(given.house)}, subscriber meals ${n(given.perk)}, leakages and missing stock ${n(given.leakages)}.`,
  );
  const good = f.trends.filter((s) => s.direction === "good").map(signalText);
  const watch = f.trends.filter((s) => s.direction === "watch").map(signalText);
  if (good.length) paragraphs.push(`Going well: ${good.join("; ")}.`);
  if (watch.length) paragraphs.push(`To watch: ${watch.join("; ")}.`);
  const flags = flagSummary(f);
  if (flags.length) paragraphs.push(`Checks: ${flags.join(", ")}.`);
  if (f.uncostedRevenue > 0)
    paragraphs.push(
      `${n(f.uncostedRevenue)} of sales have no cost yet; send a Sales by item report.`,
    );
  return renderEmail({
    preheader: summaryLine(f),
    heading: `${TITLES[f.period]} digest · ${periodLabel(f)}`,
    paragraphs,
    cta: { label: "Open the full report", url: link },
  });
}
