/**
 * Corrections to a demo school's snapshot that its source database still
 * carries, made through the app's own actions so they follow the same rules
 * a principal's change would.
 *
 *   pnpm demo:touch-up yellowview
 *
 * Restores the snapshot, starts the school, applies the corrections, stops it
 * and saves the snapshot again. `pnpm demo:snapshot yellowview` runs it after
 * copying, so a fresh copy is corrected too.
 */
import path from "node:path";

import { Client, type Persona } from "../test/sim/client.js";
import { restoreSnapshot, takeSnapshot, waitForDbClosed } from "./db.js";
import { SCHOOLS, type SchoolId } from "./schools.js";
import { startDemoServer } from "./server.js";

const ROOT = path.resolve(import.meta.dirname, "..");

type Fix = (client: Client, principal: Persona) => Promise<void>;

/**
 * Yellow View's seed once gave Grade 12's fourth elective without a room of
 * its own the room "12undefined classroom" (the seed now refuses that). Give
 * AP Statistics the Math Lab, as the seed does now.
 */
const yellowViewRooms: Fix = async (client, principal) => {
  const config = await client.as(principal, "get-school-config");
  const rooms: { name: string; kind: string }[] = config?.rooms ?? [];
  if (!rooms.length) throw new Error("Yellow View has no rooms in its config.");
  if (!rooms.some((r) => r.name === "Math Lab")) {
    await client.as(principal, "update-school-config", {
      rooms: [...rooms, { name: "Math Lab", kind: "special" }],
    });
  }
  const classes = await client.as<{ id: string; roomNumber: string | null }[]>(
    principal,
    "list-classes",
    { status: "all" },
  );
  if (!Array.isArray(classes)) throw new Error("list-classes gave no list.");
  const broken = classes.filter((c) => c.roomNumber?.includes("undefined"));
  for (const c of broken) {
    await client.as(principal, "update-class", {
      id: c.id,
      roomNumber: "Math Lab",
    });
  }
  console.log(`  rooms: ${broken.length} class(es) moved to the Math Lab`);
};

const FIXES: Partial<Record<SchoolId, { principal: string; fixes: Fix[] }>> = {
  yellowview: {
    principal: "principal@yellowview.test",
    fixes: [yellowViewRooms],
  },
};

export async function touchUp(id: SchoolId): Promise<void> {
  const plan = FIXES[id];
  if (!plan) return;
  restoreSnapshot(undefined, id);
  const server = await startDemoServer(id);
  try {
    const client = new Client(server.url);
    const principal = await client.signIn(plan.principal, "principal", "admin");
    for (const fix of plan.fixes) await fix(client, principal);
  } finally {
    await server.stop();
  }
  await waitForDbClosed(path.join(ROOT, SCHOOLS[id].db));
  takeSnapshot(undefined, id);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const id = process.argv[2] as SchoolId;
  if (!FIXES[id]) {
    console.error(
      `No touch-ups for "${id ?? ""}". Schools with some: ${Object.keys(FIXES).join(", ")}`,
    );
    process.exit(1);
  }
  await touchUp(id);
  console.log(`Touched up the ${id} snapshot.`);
}
