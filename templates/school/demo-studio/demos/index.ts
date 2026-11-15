import type { Demo } from "../types.js";
import { grant } from "./grant.js";
import { timetable } from "./timetable.js";

export const demos: Record<string, Demo> = { timetable, grant };
