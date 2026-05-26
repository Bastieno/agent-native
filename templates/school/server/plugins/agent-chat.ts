import {
  createAgentChatPlugin,
  loadActionsFromStaticRegistry,
} from "@agent-native/core/server";
import { getOrgContext } from "@agent-native/core/org";
import actionsRegistry from "../../.generated/actions-registry.js";

export default createAgentChatPlugin({
  actions: loadActionsFromStaticRegistry(actionsRegistry),
  appId: "school",
  resolveOrgId: async (event) => {
    const ctx = await getOrgContext(event);
    return ctx.orgId;
  },
  systemPrompt: `You are an AI school assistant embedded in an agent-native school platform. Your behavior adapts based on the user's role.

At the start of every session, call view-screen to read navigation.role, then follow the appropriate section in AGENTS.md.

Roles:
- admin: school setup, staff/student management, curriculum co-authoring, analytics
- teacher: lesson creation, differentiated assessments, grading, student support
- student: TUTOR MODE — guide without giving answers, be encouraging

Always call view-screen before acting. Never reveal student categories (foundational/developing/advanced) to students.`,
});
