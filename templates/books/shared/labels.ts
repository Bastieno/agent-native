import { formatNaira as n } from "./money.js";

/** Words for figures, shared by the digest, WhatsApp and the screens. */

export const BUSINESS_NAMES: Record<string, string> = {
  lounge: "Lounge",
  hub: "Hub",
  unassigned: "Unassigned",
};

export interface SignalLike {
  direction: "good" | "watch";
  kind: string;
  subject: string;
  now: number;
  before: number;
  change: number;
}

export const FLAG_WORDS: Record<string, string> = {
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

export function signalText(s: SignalLike): string {
  const subject = BUSINESS_NAMES[s.subject] ?? s.subject;
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

/** One flag, in words, without naming anyone. */
export function flagText(
  f: { kind: string } & Record<string, unknown>,
): string {
  const amt = (v: unknown) => n(Number(v ?? 0));
  switch (f.kind) {
    case "moniepoint_without_sale":
      return `${amt(f.amount)} arrived in Moniepoint with no sale against it`;
    case "transfer_missing":
      return `Order ${f.orderNumber}: transfer ${f.reference} hasn't arrived`;
    case "manual_unmatched":
      return `Order ${f.orderNumber}: "Accepted manually" ${amt(f.amount)} with no matching transfer`;
    case "split_short":
      return `Order ${f.orderNumber}: split payment ${amt(f.difference)} short`;
    case "split_over":
      return `Order ${f.orderNumber}: split payment ${amt(f.difference)} over`;
    case "split_unknown":
      return `Order ${f.orderNumber}: split payment can't be checked yet`;
    case "shared_reference_mismatch":
      return `One transfer for ${(f.orderNumbers as string[]).length} orders doesn't add up`;
    case "cancelled":
      return `Order ${f.orderNumber} (${amt(f.total)}) was cancelled`;
    case "house_leakages_high":
      return `The House and leakages ${amt(f.total)} at cost, above the limit`;
    case "large_expense":
      return `Large expense: ${amt(f.amount)}`;
    case "category_spike":
      return `Spending ${amt(f.today)} against a usual ${amt(f.average)} a day`;
    case "duplicate_receipt":
      return `Possible duplicate receipts`;
    case "needs_review":
      return `${f.count} receipt${f.count === 1 ? "" : "s"} to confirm`;
    case "files_disagree":
      return `Payment report ${amt(f.reportTotal)} vs sales ${amt(f.salesTotal)}: check the dates`;
    case "unconfirmed_category":
      return `Category guesses to confirm: ${(f.items as string[]).join(", ")}`;
    case "no_cost":
      return `No cost yet for ${(f.items as string[]).join(", ")}`;
    default:
      return FLAG_WORDS[f.kind] ?? f.kind;
  }
}
