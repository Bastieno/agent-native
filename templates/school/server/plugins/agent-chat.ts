import {
  createAgentChatPlugin,
  loadActionsFromStaticRegistry,
} from "@agent-native/core/server";
import { getOrgContext } from "@agent-native/core/org";
import { appStateGet } from "@agent-native/core/application-state";
import actionsRegistry from "../../.generated/actions-registry.js";
import { guardActions } from "../lib/guard-actions.js";
import { gateAgentMessage } from "../lib/agent-gate.js";
import {
  CHAT_APP_INSTRUCTIONS,
  chatAppToolFilter,
  refuseChatAppCaller,
  withChatAppSurface,
} from "../lib/chat-apps.js";
import { readyBeforeServing } from "../lib/plugin-readiness.js";

const agentChat = createAgentChatPlugin({
  // Every action is role-checked. This map backs both the agent's tools and
  // the auto-mounted HTTP endpoints, so the guard covers both paths.
  // The actions a head or teacher's own AI app (Claude, ChatGPT) may call
  // directly are marked here, with their guidance; see server/lib/chat-apps.ts.
  actions: withChatAppSurface(
    guardActions(loadActionsFromStaticRegistry(actionsRegistry)),
  ),
  // From an outside AI app: learners and people with no school are turned
  // away, each role sees its own short list, and the client is told how the
  // school's work is done.
  mcpRefuseCaller: refuseChatAppCaller,
  mcpToolFilter: chatAppToolFilter,
  mcpInstructions: CHAT_APP_INSTRUCTIONS,
  appId: "school",
  model: "claude-haiku-4-5",
  // The admin decides who has the assistant, on which model and how many
  // messages a day (Settings → Assistant). Enforced here, per message, so a
  // learner cannot get round it by picking a model or calling the endpoint
  // directly: a switched-off learner, one sitting a paper and one over the
  // day's limit get a calm reply and no model is called.
  prepareRequest: async ({ event, ownerEmail, internalContinuation }) => {
    let orgId: string | null = null;
    try {
      orgId = (await getOrgContext(event)).orgId ?? null;
    } catch {
      // The person's own school profile names the school anyway.
    }
    return gateAgentMessage({ ownerEmail, orgId, internalContinuation });
  },
  // Everything else that runs the agent for someone — sub-agents a teacher's
  // chat starts, automations, scheduled jobs, integrations, agent-to-agent
  // and MCP calls — passes the same gate: each run counts as a message
  // against that person's daily limit, runs on their role's model and, for a
  // learner, has the learner's tools only.
  // A request from someone's own AI app (ask_app, source "mcp") also counts
  // against the school's daily allowance for those (chatAppDailyLimit).
  runGate: async ({ ownerEmail, orgId, source }) =>
    gateAgentMessage({ ownerEmail, orgId, source }),
  // A school org holds every student, teacher and grade. The framework's SQL
  // tools are org-scoped, which would let any signed-in student read the whole
  // school. Data access goes through role-checked actions only.
  disableDbDataTools: true,
  resolveOrgId: async (event) => {
    const ctx = await getOrgContext(event);
    return ctx.orgId;
  },
  extraContext: async (_event: any, owner: string) => {
    try {
      const nav = (await appStateGet(owner, "navigation")) as any;
      if (!nav) return null;
      const lines: string[] = ["<current-screen>"];
      if (nav.role) lines.push(`role: ${nav.role}`);
      if (nav.view) lines.push(`view: ${nav.view}`);
      if (nav.settingsTab) lines.push(`settingsTab: ${nav.settingsTab}`);
      if (nav.classId) lines.push(`classId: ${nav.classId}`);
      if (nav.className) lines.push(`className: ${nav.className}`);
      if (nav.lessonId) lines.push(`lessonId: ${nav.lessonId}`);
      if (nav.assessmentId) lines.push(`assessmentId: ${nav.assessmentId}`);
      if (nav.variantId) lines.push(`variantId: ${nav.variantId}`);
      if (nav.studentId) lines.push(`studentId: ${nav.studentId}`);
      if (nav.submissionId) lines.push(`submissionId: ${nav.submissionId}`);
      if (nav.curriculumDraftId)
        lines.push(`curriculumDraftId: ${nav.curriculumDraftId}`);
      lines.push("</current-screen>");
      return lines.join("\n");
    } catch {
      return null;
    }
  },
  systemPrompt: `You are an AI school assistant embedded in an agent-native school platform. Your behavior adapts based on the user's role.

Navigation context is pre-injected on every turn in a <current-screen> block — you already know the user's role, current view, and any active entity IDs. Call view-screen only when you need a full data snapshot (entity details, live content, submission drafts) — not just to learn the role or current view.

Roles:
- admin: school setup, staff/student management, curriculum co-authoring, analytics
- teacher: lesson creation, differentiated assessments, grading, student support
- student: TUTOR MODE — guide without giving answers, be encouraging

Before executing destructive or irreversible actions (suspend, remove, delete, publish grades, close assessment), always confirm with the user first — describe what will happen and ask them to confirm.

Never reveal student categories (foundational/developing/advanced) to students.`,
});

export default readyBeforeServing(agentChat);
