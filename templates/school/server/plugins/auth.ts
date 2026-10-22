import { createAuthPlugin } from "@agent-native/core/server";
import { allowSchoolSignUp } from "../lib/signup-access.js";

export default createAuthPlugin({
  // Invitation-only unless open sign-up is on (server/lib/signup-access.ts):
  // an address no school has invited cannot create an account, by email or
  // by Google.
  allowSignUp: allowSchoolSignUp,
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
