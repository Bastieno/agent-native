// guard:allow-unscoped — the operator's cross-school view; every caller passes requireOperator first.
import { sql } from "drizzle-orm";
import {
  creditStatus,
  getBilling,
  ledgerFor,
  type CreditStatus,
  type LedgerEntry,
} from "../credits.js";
import { rowsOf } from "../raw-sql.js";

export interface OperatorSchool {
  id: string;
  name: string;
  host: string | null;
  head: string | null;
  mode: "managed" | "byo" | "none";
  credits: number;
  staffRequests: number;
  /** Credits spent in the last 30 days. */
  spent30: number;
  /** At the recent rate; null when there is no use to go on, or the school is on its own key. */
  daysLeft: number | null;
  low: boolean;
  out: boolean;
}

export interface TopUpRequest {
  id: string;
  schoolId: string;
  schoolName: string;
  requestedBy: string;
  credits: number | null;
  reference: string | null;
  note: string | null;
  status: string;
  createdAt: string;
}

async function spentCc(schoolId: string, days: number): Promise<number> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const rows = await rowsOf<{ total: number | string | null }>(
    sql`SELECT COALESCE(SUM(-amount_cc), 0) AS total FROM school_credit_ledger
        WHERE school_id = ${schoolId} AND kind = 'debit' AND created_at >= ${since}`,
  );
  return Number(rows[0]?.total ?? 0);
}

function describe(
  base: { id: string; name: string; host: string | null; head: string | null },
  status: CreditStatus,
  spent30Cc: number,
): OperatorSchool {
  const spent30 = Math.round(spent30Cc / 10);
  const perDay = spent30 / 30;
  const managed = status.mode === "managed";
  return {
    ...base,
    mode: status.mode,
    credits: status.credits,
    staffRequests: status.staffRequests,
    spent30,
    daysLeft:
      managed && perDay > 0 ? Math.floor(status.credits / perDay) : null,
    low: status.low,
    out: status.out,
  };
}

export async function listSchools(): Promise<OperatorSchool[]> {
  const orgs = await rowsOf<{ id: string; name: string }>(
    sql`SELECT id, name FROM organizations ORDER BY name`,
  );
  const hosts = await rowsOf<{ org_id: string; host: string }>(
    sql`SELECT org_id, host FROM school_domains ORDER BY created_at`,
  ).catch(() => []);
  const owners = await rowsOf<{ org_id: string; email: string }>(
    sql`SELECT org_id, email FROM org_members WHERE role = 'owner' ORDER BY email`,
  ).catch(() => []);
  const hostOf = new Map<string, string>();
  for (const h of hosts)
    if (!hostOf.has(h.org_id)) hostOf.set(h.org_id, h.host);
  const headOf = new Map<string, string>();
  for (const o of owners)
    if (!headOf.has(o.org_id)) headOf.set(o.org_id, o.email);

  const out: OperatorSchool[] = [];
  for (const o of orgs) {
    const [status, spent] = await Promise.all([
      creditStatus(o.id),
      spentCc(o.id, 30),
    ]);
    out.push(
      describe(
        {
          id: o.id,
          name: o.name,
          host: hostOf.get(o.id) ?? null,
          head: headOf.get(o.id) ?? null,
        },
        status,
        spent,
      ),
    );
  }
  return out;
}

export async function schoolDetail(id: string): Promise<{
  school: OperatorSchool;
  ledger: LedgerEntry[];
  marginBp: number | null;
} | null> {
  const all = await rowsOf<{ id: string; name: string }>(
    sql`SELECT id, name FROM organizations WHERE id = ${id} LIMIT 1`,
  );
  if (!all[0]) return null;
  const [host] = await rowsOf<{ host: string }>(
    sql`SELECT host FROM school_domains WHERE org_id = ${id} ORDER BY created_at LIMIT 1`,
  ).catch(() => []);
  const [owner] = await rowsOf<{ email: string }>(
    sql`SELECT email FROM org_members WHERE org_id = ${id} AND role = 'owner' ORDER BY email LIMIT 1`,
  ).catch(() => []);
  const [status, spent, ledger, billing] = await Promise.all([
    creditStatus(id),
    spentCc(id, 30),
    ledgerFor(id, 50),
    getBilling(id),
  ]);
  return {
    school: describe(
      {
        id,
        name: all[0].name,
        host: host?.host ?? null,
        head: owner?.email ?? null,
      },
      status,
      spent,
    ),
    ledger,
    marginBp: billing?.marginBp ?? null,
  };
}

export async function listTopUpRequests(): Promise<TopUpRequest[]> {
  const rows = await rowsOf<Record<string, unknown>>(
    sql`SELECT r.id, r.school_id, r.requested_by, r.credits, r.reference, r.note, r.status, r.created_at, o.name AS school_name
        FROM credit_top_up_requests r LEFT JOIN organizations o ON o.id = r.school_id
        ORDER BY (CASE WHEN r.status = 'pending' THEN 0 ELSE 1 END), r.created_at DESC LIMIT 100`,
  ).catch(() => []);
  return rows.map((r) => ({
    id: String(r.id),
    schoolId: String(r.school_id),
    schoolName: String(r.school_name ?? r.school_id),
    requestedBy: String(r.requested_by),
    credits: r.credits == null ? null : Number(r.credits),
    reference: (r.reference as string | null) ?? null,
    note: (r.note as string | null) ?? null,
    status: String(r.status),
    createdAt: String(r.created_at),
  }));
}
