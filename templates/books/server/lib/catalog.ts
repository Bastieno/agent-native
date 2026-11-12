import { newId, nowIso } from "./ids.js";
import { rows, run } from "./sql.js";

/** Items, Moniebook categories and the business each category belongs to. */

export async function businessIdBySlug(
  orgId: string,
  slug: string,
): Promise<string> {
  const [b] = await rows<{ id: string }>(
    `SELECT id FROM businesses WHERE org_id = ? AND slug = ?`,
    [orgId, slug],
  );
  if (!b) throw new Error(`Unknown business: ${slug}`);
  return b.id;
}

/** Find or create a category by name; a new one has no business until someone assigns it. */
export async function categoryId(orgId: string, name: string): Promise<string> {
  const [c] = await rows<{ id: string }>(
    `SELECT id FROM item_categories WHERE org_id = ? AND name = ?`,
    [orgId, name],
  );
  if (c) return c.id;
  const id = newId();
  await run(
    `INSERT INTO item_categories (id, name, business_id, created_at, org_id, visibility) VALUES (?, ?, NULL, ?, ?, 'org')`,
    [id, name, nowIso(), orgId],
  );
  return id;
}

/** Item ids by name, creating missing ones without a category. Returns the names that were new. */
export async function ensureItems(
  orgId: string,
  names: string[],
): Promise<{ ids: Map<string, string>; created: string[] }> {
  const ids = new Map<string, string>();
  for (const r of await rows<{ id: string; name: string }>(
    `SELECT id, name FROM items WHERE org_id = ?`,
    [orgId],
  )) {
    ids.set(r.name, r.id);
  }
  const created: string[] = [];
  for (const name of new Set(names)) {
    if (ids.has(name)) continue;
    const id = newId();
    await run(
      `INSERT INTO items (id, name, category_id, category_source, confirmed, created_at, org_id, visibility) VALUES (?, ?, NULL, NULL, 0, ?, ?, 'org')`,
      [id, name, nowIso(), orgId],
    );
    ids.set(name, id);
    created.push(name);
  }
  return { ids, created };
}

export async function setItemCategory(
  orgId: string,
  itemName: string,
  category: string,
  source: "moniebook" | "agent" | "owner",
  confirmed: boolean,
): Promise<void> {
  const { ids } = await ensureItems(orgId, [itemName]);
  const cid = await categoryId(orgId, category);
  await run(
    `UPDATE items SET category_id = ?, category_source = ?, confirmed = ? WHERE org_id = ? AND id = ?`,
    [cid, source, confirmed ? 1 : 0, orgId, ids.get(itemName)],
  );
}

/** Days that have sales containing any of these items. */
export async function daysWithItems(
  orgId: string,
  itemNames: string[],
): Promise<string[]> {
  if (!itemNames.length) return [];
  const found = await rows<{ day: string }>(
    `SELECT DISTINCT s.day AS day FROM sales s
       JOIN sale_lines l ON l.sale_id = s.id
       JOIN items i ON i.id = l.item_id
      WHERE s.org_id = ? AND i.name IN (${itemNames.map(() => "?").join(", ")})
      ORDER BY s.day`,
    [orgId, ...itemNames],
  );
  return found.map((r) => r.day);
}
