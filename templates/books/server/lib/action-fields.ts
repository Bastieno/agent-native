import { z } from "zod";

/** Fields shared by the expense actions. Amounts are naira here; Books stores kobo. */
export const expenseFields = {
  occurredOn: z.string().describe("Date on the receipt, YYYY-MM-DD"),
  vendor: z.string().describe("Who was paid"),
  amount: z.number().positive().describe("Amount in naira"),
  business: z
    .enum(["lounge", "hub"])
    .optional()
    .describe("lounge = Restaurant & Lounge"),
  category: z
    .string()
    .optional()
    .describe("Expense category name, e.g. 'Diesel / power'"),
  paidWith: z.enum(["cash", "transfer", "card", "unknown"]).default("unknown"),
  note: z.string().optional(),
  confirmDuplicate: z
    .boolean()
    .default(false)
    .describe("Save even though it looks like an earlier expense"),
};

export const rangeSchema = z.object({
  start: z.string().describe("First day, YYYY-MM-DD"),
  endExclusive: z
    .string()
    .describe("The day after the last day, YYYY-MM-DD (Moniebook's end date)"),
});
