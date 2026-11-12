import { getDbExec } from "@agent-native/core/db";

/** Small wrapper over the framework's dialect-neutral executor (`?` placeholders). */
export async function rows<T = Record<string, any>>(
  sql: string,
  args: unknown[] = [],
): Promise<T[]> {
  const res = await getDbExec().execute({ sql, args: args as any[] });
  return res.rows as T[];
}

export async function run(sql: string, args: unknown[] = []): Promise<void> {
  await getDbExec().execute({ sql, args: args as any[] });
}

export const num = (v: unknown): number => (v == null ? 0 : Number(v));
export const placeholders = (n: number) =>
  Array.from({ length: n }, () => "?").join(", ");
