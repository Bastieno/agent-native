import { renderEmail } from "@agent-native/core/server";
import type { DigestFigures } from "./digest-figures.js";
import type { Signal } from "./trends.js";
import { formatNaira as n } from "./money.js";

const NAMES: Record<string, string> = {
  lounge: "Lounge",
  hub: "Hub",
  unassigned: "Unassigned",
};
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

const FLAG_WORDS: Record<string, string> = {
  moniepoint_without_sale: "Moniepoint money with no sale",
  transfer_missing: "transfers not received",
  manual_unmatched: "'Accepted manually' with no transfer",
  split_short: "split payments short",
  split_over: "split payments over",
  split_unknown: "split payments not yet checked",
  shared_reference_mismatch: "shared transfers that don't add up",
  cancelled: "cancelled orders",
  house_leakages_high: "The House and leakages above the limit",
  large_expense: "large expenses",
  category_spike: "costs above their usual level",
  duplicate_receipt: "possible duplicate receipts",
  needs_review: "receipts to review",
  files_disagree: "files that don't agree",
  unconfirmed_category: "item categories to confirm",
  no_cost: "items with no cost",
};

export function signalText(s: Signal): string {
  const subject = NAMES[s.subject] ?? s.subject;
  const pctText = `${s.change > 0 ? "+" : ""}${s.change}%`;
  switch (s.kind) {
    case "income":
      return `${subject} income ${n(s.now)} (${pctText})`;
    case "gross_profit":
      return `${subject} gross profit ${n(s.now)} (${pctText})`;
    case "category_margin":
      return `${subject} margin ${s.now}% (${s.change > 0 ? "+" : ""}${s.change} pts)`;
    case "expense_category":
      return `${subject} spend ${n(s.now)} (${pctText})`;
    case "house_leakages":
      return `The House and leakages ${n(s.now)} at cost (${pctText})`;
    case "expenses_outpace_income":
      return `Expenses growing faster than income`;
    case "weakest_weekday":
      return `${subject} is the slowest day (${n(s.now)})`;
    case "item_margin_falling":
      return `${subject} selling more at a lower margin (${s.now}%)`;
    case "best_ever":
      return `Best on record: ${n(s.now)}`;
    case "new_subscribers":
      return `${s.now} new Hub subscriber${s.now === 1 ? "" : "s"}`;
    case "flag_free_run":
      return `${s.now} days in a row with every check passing`;
  }
}

function flagSummary(f: DigestFigures): string[] {
  return Object.entries(f.flagCounts)
    .filter(([k]) => FLAG_WORDS[k])
    .map(([k, c]) => `${c} ${FLAG_WORDS[k]}`);
}

/** The short WhatsApp message. Never names customers, senders or staff. */
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
  const given = f.notIncome.atCost;
  paragraphs.push(
    `Given away at cost: The House ${n(given.house)}, subscriber meals ${n(given.perk)}, leakages ${n(given.leakages)}.`,
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
