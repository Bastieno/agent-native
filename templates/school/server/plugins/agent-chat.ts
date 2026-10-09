import {
  createAgentChatPlugin,
  loadActionsFromStaticRegistry,
} from "@agent-native/core/server";
import { getOrgContext } from "@agent-native/core/org";
import { appStateGet } from "@agent-native/core/application-state";
import actionsRegistry from "../../.generated/actions-registry.js";
import { guardActions } from "../lib/guard-actions.js";

export default createAgentChatPlugin({
  // Every action is role-checked. This map backs both the agent's tools and
  // the auto-mounted HTTP endpoints, so the guard covers both paths.
  actions: guardActions(loadActionsFromStaticRegistry(actionsRegistry)),
  appId: "school",
  model: "claude-haiku-4-5",
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
