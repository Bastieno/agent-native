/**
 * The assistant's credit, as schools and the operator count it.
 *
 * One credit is a tenth of a US cent of retail value: US$0.001. Retail value
 * is what the model run cost the provider times a margin. Amounts are stored
 * as whole "retail centicents" (1/100 of a cent, the unit `token_usage` already
 * uses for provider cost), so nothing is ever a fraction: 1 credit = 10.
 *
 * Shared by the server (which charges and enforces) and the settings screen
 * (which shows the balance), so both read the same arithmetic.
 */

/** Retail centicents in one credit. */
export const CENTICENTS_PER_CREDIT = 10;

/** The margin on provider cost, in basis points: 15000 is 1.5x. */
export const DEFAULT_MARGIN_BP = 15000;

/** What a new school is given once, to set itself up. */
export const STARTER_CREDITS = 5000;

/** A balance under this share of the last grant, or under this many days at the
 * recent rate, is "low". */
export const LOW_BALANCE_SHARE = 0.2;
export const LOW_BALANCE_DAYS = 3;

/** Roughly what one staff working request costs a school, for plain estimates. */
export const CREDITS_PER_STAFF_REQUEST = 40;

export type BillingMode = "managed" | "byo";

/** Provider cost to retail cost, rounded up so a school is never undercharged. */
export function retailCc(
  providerCc: number,
  marginBp: number = DEFAULT_MARGIN_BP,
): number {
  if (!Number.isFinite(providerCc) || providerCc <= 0) return 0;
  return Math.ceil((providerCc * marginBp) / 10000);
}

export function creditsToCc(credits: number): number {
  return Math.round(credits * CENTICENTS_PER_CREDIT);
}

/** Whole credits for display. A balance below zero shows as zero. */
export function ccToCredits(cc: number): number {
  return Math.max(0, Math.floor(cc / CENTICENTS_PER_CREDIT));
}

/** "About 1,000 staff requests", for a balance. */
export function staffRequestsLeft(cc: number): number {
  return Math.floor(ccToCredits(cc) / CREDITS_PER_STAFF_REQUEST);
}

/** What someone is told when the school's credit has run out. */
export function creditsOutMessage(
  audience: "learner" | "teacher" | "admin",
): string {
  if (audience === "learner") {
    return "The school's assistant is resting for now. Have another go on your own, or ask your teacher.";
  }
  if (audience === "teacher") {
    return "The school's assistant has used up its credit. Your admin can top it up in Settings, under Assistant.";
  }
  return "The school's assistant has used up its credit. Top it up in Settings, under Assistant, and it works again straight away.";
}

/** Whether a balance deserves a warning. `daily` is recent credits per day. */
export function isLowBalance(
  balanceCc: number,
  lastGrantCc: number,
  dailyCc: number,
): boolean {
  if (balanceCc <= 0) return false; // out, not low
  if (lastGrantCc > 0 && balanceCc < lastGrantCc * LOW_BALANCE_SHARE) {
    return true;
  }
  return dailyCc > 0 && balanceCc / dailyCc < LOW_BALANCE_DAYS;
}

/**
 * Packs a school can buy, with an approximate naira price at about ₦1,500 to
 * the dollar. The operator confirms the price when the payment is made; these
 * are what the Top up form shows, so changing them is changing this list.
 */
export const CREDIT_PACKS: Array<{
  credits: number;
  naira: number;
}> = [
  { credits: 10_000, naira: 15_000 },
  { credits: 50_000, naira: 70_000 },
  { credits: 200_000, naira: 270_000 },
];
