import { createCoreRoutesPlugin } from "@agent-native/core/server";
import { envKeys } from "../lib/env-config.js";
import { readyBeforeServing } from "../lib/plugin-readiness.js";

const coreRoutes = createCoreRoutesPlugin({ envKeys });

export default readyBeforeServing(coreRoutes);
