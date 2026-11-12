import { table, text, integer } from "@agent-native/core/db/schema";
import { ownableColumns } from "@agent-native/core/sharing";

/**
 * Books tables. Money columns are integer kobo. Days are `YYYY-MM-DD` in
 * Africa/Lagos time. Every table is org-scoped through ownableColumns().
 */
const created = { createdAt: text("created_at").notNull() };

export const businesses = table("businesses", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(), // lounge | hub
  ...created,
  ...ownableColumns(),
});

/** Moniebook item categories (Drinks, Subscription, …) and the business each belongs to. */
export const itemCategories = table("item_categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  businessId: text("business_id"),
  ...created,
  ...ownableColumns(),
});

export const items = table("items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  categoryId: text("category_id"),
  categorySource: text("category_source"), // moniebook | agent | owner
  confirmed: integer("confirmed").notNull().default(0),
  ...created,
  ...ownableColumns(),
});

/** Unit cost from an item report; a line uses the latest row on or before its day. */
export const itemCosts = table("item_costs", {
  id: text("id").primaryKey(),
  itemId: text("item_id").notNull(),
  unitCost: integer("unit_cost").notNull(),
  effectiveFrom: text("effective_from").notNull(),
  importId: text("import_id").notNull(),
  ...created,
  ...ownableColumns(),
});

export const sales = table("sales", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull(),
  orderedAt: text("ordered_at").notNull(),
  day: text("day").notNull(),
  branchName: text("branch_name"),
  status: text("status").notNull(), // COMPLETED | CANCELLED
  refundAmount: integer("refund_amount").notNull().default(0),
  staffName: text("staff_name"),
  customerName: text("customer_name"),
  total: integer("total").notNull(),
  collectedAmount: integer("collected_amount").notNull(),
  changeAmount: integer("change_amount").notNull().default(0),
  paymentMode: text("payment_mode").notNull(), // REGULAR | SPLIT
  methods: text("methods").notNull(), // JSON string[]
  importId: text("import_id").notNull(),
  fingerprint: text("fingerprint"),
  ...created,
  ...ownableColumns(),
});

export const saleLines = table("sale_lines", {
  id: text("id").primaryKey(),
  saleId: text("sale_id").notNull(),
  itemId: text("item_id").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(),
  lineTotal: integer("line_total").notNull(),
  ...created,
  ...ownableColumns(),
});

export const salePayments = table("sale_payments", {
  id: text("id").primaryKey(),
  saleId: text("sale_id").notNull(),
  legIndex: integer("leg_index").notNull(),
  method: text("method").notNull(),
  reference: text("reference"),
  amount: integer("amount"),
  bank: text("bank"),
  senderName: text("sender_name"),
  senderAccountMasked: text("sender_account_masked"),
  ...created,
  ...ownableColumns(),
});

export const paymentMethodTotals = table("payment_method_totals", {
  id: text("id").primaryKey(),
  rangeStart: text("range_start").notNull(),
  rangeEndExclusive: text("range_end_exclusive").notNull(),
  method: text("method").notNull(),
  payments: integer("payments").notNull(),
  collected: integer("collected").notNull(),
  refunded: integer("refunded").notNull(),
  net: integer("net").notNull(),
  importId: text("import_id").notNull(),
  ...created,
  ...ownableColumns(),
});

export const moniepointEvents = table("moniepoint_events", {
  id: text("id").primaryKey(),
  webhookId: text("webhook_id").notNull(),
  receivedAt: text("received_at").notNull(),
  type: text("type").notNull(),
  reference: text("reference"),
  altReference: text("alt_reference"),
  amount: integer("amount").notNull(),
  occurredAt: text("occurred_at").notNull(),
  day: text("day").notNull(),
  payload: text("payload").notNull(),
  ...created,
  ...ownableColumns(),
});

export const expenseCategories = table("expense_categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  sort: integer("sort").notNull(),
  ...created,
  ...ownableColumns(),
});

export const receiptFiles = table("receipt_files", {
  id: text("id").primaryKey(),
  mimeType: text("mime_type").notNull(),
  dataBase64: text("data_base64").notNull(),
  byteSize: integer("byte_size").notNull(),
  ...created,
  ...ownableColumns(),
});

export const expenses = table("expenses", {
  id: text("id").primaryKey(),
  code: text("code").notNull(), // E-1, E-2, …
  occurredOn: text("occurred_on").notNull(),
  vendor: text("vendor").notNull(),
  amount: integer("amount").notNull(),
  businessId: text("business_id"),
  categoryId: text("category_id"),
  paidWith: text("paid_with").notNull().default("unknown"), // cash | transfer | card | unknown
  status: text("status").notNull(), // needs_review | confirmed
  receiptFileId: text("receipt_file_id"),
  imageHash: text("image_hash"),
  rawText: text("raw_text"),
  lineItems: text("line_items"), // JSON
  source: text("source").notNull(), // whatsapp | upload | history | app
  messageId: text("message_id"),
  ...created,
  ...ownableColumns(),
});

export const imports = table("imports", {
  id: text("id").primaryKey(),
  kind: text("kind").notNull(), // sales-summary | payment-method | item-sales | moniepoint-statement
  fileName: text("file_name").notNull(),
  rangeStart: text("range_start"),
  rangeEnd: text("range_end"), // exclusive for range reports, last day for sales summaries
  rowsAdded: integer("rows_added").notNull().default(0),
  rowsUpdated: integer("rows_updated").notNull().default(0),
  receivedVia: text("received_via").notNull(),
  checkResult: text("check_result"), // JSON RangeCheck
  ...created,
  ...ownableColumns(),
});

export const reconciliations = table("reconciliations", {
  id: text("id").primaryKey(),
  day: text("day").notNull(),
  figures: text("figures").notNull(), // JSON DayResult
  flags: text("flags").notNull(), // JSON Flag[]
  computedAt: text("computed_at").notNull(),
  ...created,
  ...ownableColumns(),
});

export const digests = table("digests", {
  id: text("id").primaryKey(),
  period: text("period").notNull(),
  startDay: text("start_day").notNull(),
  endDay: text("end_day").notNull(),
  figures: text("figures").notNull(),
  commentary: text("commentary"),
  status: text("status").notNull(), // draft | sent | failed
  sentAt: text("sent_at"),
  delivery: text("delivery"), // JSON
  ...created,
  ...ownableColumns(),
});

export const booksSettings = table("books_settings", {
  orgId: text("org_id").primaryKey(),
  thresholds: text("thresholds").notNull(),
  recipients: text("recipients").notNull(),
  allowedNumbers: text("allowed_numbers").notNull(),
  reminders: text("reminders").notNull().default("{}"),
  createdAt: text("created_at").notNull(),
});
