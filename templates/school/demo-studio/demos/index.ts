import type { Demo } from "../types.js";
import { grant } from "./grant.js";
import { phone } from "./phone.js";
import { phoneRough } from "./phone-rough.js";
import { timetable } from "./timetable.js";

export const demos: Record<string, Demo> = {
  timetable,
  grant,
  "phone-rough": phoneRough,
  phone,
};
