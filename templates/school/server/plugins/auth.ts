import { createAuthPlugin } from "@agent-native/core/server";
import { allowSchoolSignUp } from "../lib/signup-access.js";
import { readyBeforeServing } from "../lib/plugin-readiness.js";

const auth = createAuthPlugin({
  // Invitation-only unless open sign-up is on (server/lib/signup-access.ts):
  // an address no school has invited cannot create an account, by email or
  // by Google.
  allowSignUp: allowSchoolSignUp,
  // The scheduler's own call: no session, gated by CRON_SECRET in the route.
  // The cron call (gated by CRON_SECRET) the manifest (a browser fetches it without cookies; it holds only the
  // school's name) and the install steps, which a school may print and hand out.
  publicPaths: ["/api/school/cron/daily", "/manifest.json", "/install"],
  // Learners without an email address sign in with their school ID.
  usernameLogin: true,
  marketing: {
    appName: "Agent-Native School",
    tagline:
      "Your AI agent teaches, grades, and supports students alongside you.",
    features: [
      "Differentiated assessments for every learner",
      "AI-powered tutoring in student mode",
      "Real-time curriculum co-authoring",
    ],
  },
});

export default readyBeforeServing(auth);
