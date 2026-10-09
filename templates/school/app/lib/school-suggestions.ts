import type { AgentDynamicSuggestionContext } from "@agent-native/core/client";

/**
 * Generates context-aware agent suggestions based on the current school portal
 * view and the actual data visible on screen (written into navigation state by
 * each route's sync() call).
 */
export function getSchoolSuggestions(
  context: AgentDynamicSuggestionContext,
): string[] {
  const nav = context.navigation as Record<string, any> | null;
  if (!nav) return ["What can you help me with here?"];
  const { role, view } = nav;

  // ─── Admin ────────────────────────────────────────────────────────────────
  if (role === "admin") {
    if (nav.isNewSchool) {
      return [
        "Set up my school",
        "What should I configure first?",
        "Help me create a grade structure",
      ];
    }
    if (view === "overview") {
      const s: string[] = [];
      if (nav.staffCount === 0) s.push("Invite a teacher");
      if (nav.studentCount === 0) s.push("Add students");
      if (nav.classCount === 0) s.push("Create a class");
      if (nav.subjectCount === 0) s.push("Set up subjects");
      if (s.length === 0) s.push("Give me a school overview");
      s.push("Show me struggling students");
      return s.slice(0, 4);
    }
    if (view === "staff") {
      return [
        "Invite a new teacher",
        "Show me all active staff",
        "Change a teacher's role",
        "What can you help me with here?",
      ];
    }
    if (view === "students") {
      return [
        "Invite a student",
        "Show struggling students",
        "What can you help me with here?",
      ];
    }
    if (view === "classes") {
      return [
        "Create a new class",
        "Assign a teacher to a class",
        "Show class performance",
      ];
    }
    if (view === "curriculum") {
      return [
        "Build a curriculum",
        "Create a new subject",
        "Add units to a subject",
        "What can you help me with here?",
      ];
    }
    if (view === "analytics") {
      return [
        "How is the school performing?",
        "Which students are struggling?",
        "Show me grade distribution",
      ];
    }
    if (view === "announcements") {
      return [
        "Post a school-wide announcement",
        "Announce an upcoming exam",
        "Remind students about deadlines",
      ];
    }
    if (view === "settings") {
      return [
        "Update our grading scale",
        "Change the pass mark",
        "Update school terminology",
        "What settings can I change?",
      ];
    }
    return ["What can you help me with here?"];
  }

  // ─── Teacher ──────────────────────────────────────────────────────────────
  if (role === "teacher") {
    if (view === "dashboard" || !view) {
      if (nav.classCount === 0) {
        return [
          "Why don't I have any classes?",
          "What can I do as a teacher?",
          "How do I get started?",
        ];
      }
      return [
        "Create a lesson note",
        "Build a differentiated assessment",
        "Which students need help?",
        "Show my gradebook",
      ];
    }
    if (view === "class") {
      const name = nav.className ? ` for ${nav.className}` : "";
      return [
        `Create a lesson note${name}`,
        `Build a differentiated assessment${name}`,
        `Who is struggling${name}?`,
        `Categorize students${name}`,
      ];
    }
    if (view === "lesson") {
      return [
        "Improve this lesson",
        "Make this lesson more concise",
        "Align this lesson to the learning objectives",
        "Finalize this lesson",
      ];
    }
    if (view === "assessment") {
      const hasVariantId = !!nav.variantId;
      if (hasVariantId) {
        return [
          "Improve this variant",
          "Make questions more challenging",
          "Add more scaffolding to this variant",
          "What can you help me with here?",
        ];
      }
      return [
        "Create differentiated variants",
        "Grade all submissions",
        "Show submission analytics",
        "Publish grades",
      ];
    }
    if (view === "students") {
      return [
        "Categorize my students",
        "Show struggling students",
        "Get a student's performance report",
      ];
    }
    if (view === "gradebook") {
      const name = nav.className ? ` for ${nav.className}` : "";
      return [
        `Update gradebook entries${name}`,
        "Show students with low grades",
        "Generate a report card",
        "What can you help me with here?",
      ];
    }
    if (view === "analytics") {
      const name = nav.className ? ` for ${nav.className}` : "";
      return [
        `How is${name ? ` ${nav.className}` : " my class"} performing?`,
        "Which students need intervention?",
        "Show grade distribution",
      ];
    }
    return ["What can you help me with here?"];
  }

  // ─── Student ──────────────────────────────────────────────────────────────
  if (role === "student") {
    if (view === "dashboard") {
      if (nav.pendingCount > 0) {
        return [
          `Help me with my ${nav.pendingCount === 1 ? "assignment" : `${nav.pendingCount} assignments`}`,
          "Explain my next assignment",
          "How am I doing in my classes?",
        ];
      }
      return [
        "How am I doing in my classes?",
        "Explain a topic I'm struggling with",
        "Show my grades",
      ];
    }
    if (view === "assessment") {
      const hasSubmission = !!nav.submissionId;
      if (hasSubmission) {
        return [
          "Help me understand this question",
          "Check my reasoning (don't give the answer)",
          "Explain the underlying concept",
        ];
      }
      return [
        "Help me understand this assignment",
        "Explain the instructions",
        "Where should I start?",
      ];
    }
    if (view === "grades") {
      return [
        "Explain my latest grade",
        "How can I improve?",
        "Which subject needs the most work?",
      ];
    }
    if (view === "progress") {
      return [
        "How am I doing overall?",
        "Which class needs the most work?",
        "What should I focus on?",
      ];
    }
    if (view === "classes") {
      return [
        "What assignments do I have?",
        "Help me prepare for my next class",
        "Explain the curriculum",
      ];
    }
    return ["What can you help me with here?"];
  }

  return ["What can you help me with here?"];
}
