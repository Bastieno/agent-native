import type { runMigrations } from "@agent-native/core/db";

type MigrationEntry = Parameters<typeof runMigrations>[0][number];

/** Additive only: new tables and new columns. Never drop or rename. */
export const BOOKS_MIGRATIONS: MigrationEntry[] = [
  {
    version: 1,
    sql: `CREATE TABLE IF NOT EXISTS businesses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 2,
    sql: `CREATE TABLE IF NOT EXISTS item_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    business_id TEXT,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 3,
    sql: `CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category_id TEXT,
    category_source TEXT,
    confirmed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 4,
    sql: `CREATE TABLE IF NOT EXISTS item_costs (
    id TEXT PRIMARY KEY,
    item_id TEXT NOT NULL,
    unit_cost INTEGER NOT NULL,
    effective_from TEXT NOT NULL,
    import_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 5,
    sql: `CREATE TABLE IF NOT EXISTS sales (
    id TEXT PRIMARY KEY,
    order_number TEXT NOT NULL,
    ordered_at TEXT NOT NULL,
    day TEXT NOT NULL,
    branch_name TEXT,
    status TEXT NOT NULL,
    refund_amount INTEGER NOT NULL DEFAULT 0,
    staff_name TEXT,
    customer_name TEXT,
    total INTEGER NOT NULL,
    collected_amount INTEGER NOT NULL,
    change_amount INTEGER NOT NULL DEFAULT 0,
    payment_mode TEXT NOT NULL,
    methods TEXT NOT NULL,
    import_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 6,
    sql: `CREATE TABLE IF NOT EXISTS sale_lines (
    id TEXT PRIMARY KEY,
    sale_id TEXT NOT NULL,
    item_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price INTEGER NOT NULL,
    line_total INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 7,
    sql: `CREATE TABLE IF NOT EXISTS sale_payments (
    id TEXT PRIMARY KEY,
    sale_id TEXT NOT NULL,
    leg_index INTEGER NOT NULL,
    method TEXT NOT NULL,
    reference TEXT,
    amount INTEGER,
    bank TEXT,
    sender_name TEXT,
    sender_account_masked TEXT,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 8,
    sql: `CREATE TABLE IF NOT EXISTS payment_method_totals (
    id TEXT PRIMARY KEY,
    range_start TEXT NOT NULL,
    range_end_exclusive TEXT NOT NULL,
    method TEXT NOT NULL,
    payments INTEGER NOT NULL,
    collected INTEGER NOT NULL,
    refunded INTEGER NOT NULL,
    net INTEGER NOT NULL,
    import_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 9,
    sql: `CREATE TABLE IF NOT EXISTS moniepoint_events (
    id TEXT PRIMARY KEY,
    webhook_id TEXT NOT NULL,
    received_at TEXT NOT NULL,
    type TEXT NOT NULL,
    reference TEXT,
    amount INTEGER NOT NULL,
    occurred_at TEXT NOT NULL,
    day TEXT NOT NULL,
    payload TEXT NOT NULL,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 10,
    sql: `CREATE TABLE IF NOT EXISTS expense_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sort INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 11,
    sql: `CREATE TABLE IF NOT EXISTS receipt_files (
    id TEXT PRIMARY KEY,
    mime_type TEXT NOT NULL,
    data_base64 TEXT NOT NULL,
    byte_size INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 12,
    sql: `CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    occurred_on TEXT NOT NULL,
    vendor TEXT NOT NULL,
    amount INTEGER NOT NULL,
    business_id TEXT,
    category_id TEXT,
    paid_with TEXT NOT NULL DEFAULT 'unknown',
    status TEXT NOT NULL,
    receipt_file_id TEXT,
    image_hash TEXT,
    raw_text TEXT,
    line_items TEXT,
    source TEXT NOT NULL,
    message_id TEXT,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 13,
    sql: `CREATE TABLE IF NOT EXISTS imports (
    id TEXT PRIMARY KEY,
    kind TEXT NOT NULL,
    file_name TEXT NOT NULL,
    range_start TEXT,
    range_end TEXT,
    rows_added INTEGER NOT NULL DEFAULT 0,
    rows_updated INTEGER NOT NULL DEFAULT 0,
    received_via TEXT NOT NULL,
    check_result TEXT,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 14,
    sql: `CREATE TABLE IF NOT EXISTS reconciliations (
    id TEXT PRIMARY KEY,
    day TEXT NOT NULL,
    figures TEXT NOT NULL,
    flags TEXT NOT NULL,
    computed_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 15,
    sql: `CREATE TABLE IF NOT EXISTS digests (
    id TEXT PRIMARY KEY,
    period TEXT NOT NULL,
    start_day TEXT NOT NULL,
    end_day TEXT NOT NULL,
    figures TEXT NOT NULL,
    commentary TEXT,
    status TEXT NOT NULL,
    sent_at TEXT,
    delivery TEXT,
    created_at TEXT NOT NULL,
    owner_email TEXT NOT NULL DEFAULT 'local@localhost',
    org_id TEXT,
    visibility TEXT NOT NULL DEFAULT 'private'
    )`,
  },
  {
    version: 16,
    sql: `CREATE TABLE IF NOT EXISTS books_settings (
    org_id TEXT PRIMARY KEY,
    thresholds TEXT NOT NULL,
    recipients TEXT NOT NULL,
    allowed_numbers TEXT NOT NULL,
    reminders TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL
    )`,
  },
  {
    version: 17,
    sql: `CREATE UNIQUE INDEX IF NOT EXISTS uq_sales_order ON sales (org_id, order_number)`,
  },
  {
    version: 18,
    sql: `CREATE UNIQUE INDEX IF NOT EXISTS uq_items_name ON items (org_id, name)`,
  },
  {
    version: 19,
    sql: `CREATE UNIQUE INDEX IF NOT EXISTS uq_item_categories_name ON item_categories (org_id, name)`,
  },
  {
    version: 20,
    sql: `CREATE UNIQUE INDEX IF NOT EXISTS uq_moniepoint_webhook ON moniepoint_events (webhook_id)`,
  },
  {
    version: 21,
    sql: `CREATE UNIQUE INDEX IF NOT EXISTS uq_reconciliations_day ON reconciliations (org_id, day)`,
  },
  {
    version: 22,
    sql: `CREATE UNIQUE INDEX IF NOT EXISTS uq_expenses_code ON expenses (org_id, code)`,
  },
  {
    version: 23,
    sql: `CREATE INDEX IF NOT EXISTS ix_sale_lines_sale ON sale_lines (sale_id)`,
  },
  {
    version: 24,
    sql: `CREATE INDEX IF NOT EXISTS ix_sale_payments_sale ON sale_payments (sale_id)`,
  },
  {
    version: 25,
    sql: `CREATE INDEX IF NOT EXISTS ix_sales_day ON sales (org_id, day)`,
  },
  {
    version: 26,
    sql: `CREATE INDEX IF NOT EXISTS ix_events_reference ON moniepoint_events (reference)`,
  },
  {
    version: 27,
    sql: `CREATE INDEX IF NOT EXISTS ix_item_costs_item ON item_costs (item_id, effective_from)`,
  },
  { version: 28, sql: `ALTER TABLE sales ADD COLUMN fingerprint TEXT` },
];
