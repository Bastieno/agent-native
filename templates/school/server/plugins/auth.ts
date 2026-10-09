import { createAuthPlugin } from "@agent-native/core/server";

export default createAuthPlugin({
  marketing: {
    appName: "Agent-Native School",
    tagline: "Your AI agent teaches, grades, and supports students alongside you.",
    features: [
      "Differentiated assessments for every learner",
      "AI-powered tutoring in student mode",
      "Real-time curriculum co-authoring",
    ],
  },
});
