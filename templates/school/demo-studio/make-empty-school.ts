import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec } from "@agent-native/core/db";
import { provisionSchool } from "../server/lib/operator/provision-school.js";
import { Client } from "../test/sim/client.js";

/**
 * Create the demo's empty school the way an operator does, then sign its head
 * up so the take can sign in. Run by `pnpm demo:snapshot empty`, against the
 * demo server's database.
 */
loadEnv();
const url = process.argv[2];
const head = "head@lagos.test";
try {
  await provisionSchool({
    name: "Lagos Grammar School",
    headEmail: head,
    headName: "Mrs Adeyemi",
    slug: "lagos",
    ownKey: false,
    by: "demo-studio",
  });
  await new Client(url).signUp(head, "head", "school_admin");
  console.log(`Created Lagos Grammar School; head is ${head}.`);
} finally {
  await closeDbExec();
}
