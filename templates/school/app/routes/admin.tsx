import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { AgentSidebar } from "@agent-native/core/client";
import { getSchoolSuggestions } from "@/lib/school-suggestions";
import { SchoolTheme } from "@/components/SchoolTheme";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AssistantSetupCard } from "@/components/settings/AssistantKey";
import { PortalShell } from "@/components/layout/PortalShell";
import { useRole } from "@/hooks/use-role";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { DefaultSpinner } from "@agent-native/core/client";

/** The timetable page for a navigate command: its term and whose week. */
function timetablePath(nav: Record<string, unknown>): string {
  const params = new URLSearchParams();
  for (const key of ["termId", "armId", "teacherUserId", "room"]) {
    const value = nav[key];
    if (typeof value === "string" && value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `/admin/timetable?${query}` : "/admin/timetable";
}

export default function AdminLayout() {
  const { role, isLoading, isAuthenticated, access } = useRole();
  const navigate = useNavigate();
  const { command, clearCommand } = useNavigationState();

  useEffect(() => {
    if (isLoading) return;
    // Not logged in → send to login
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    // No role, and not someone who may set their school up
    if (!role && access !== "setup") {
      navigate("/pending-activation");
      return;
    }
    // Logged in but assigned a non-admin role → send to their portal
    if (role && role !== "school_admin") {
      navigate("/");
    }
    // Setting their own school up, or school_admin → stay here
  }, [isLoading, isAuthenticated, access, role, navigate]);

  useEffect(() => {
    if (!command.data) return;
    const nav = command.data as any;
    clearCommand();
    if (!nav.view) return;
    const viewMap: Record<string, string> = {
      overview: "/admin",
      // A subject opens its own page; without one, the list of subjects —
      // narrowed to a year group when one is given.
      curriculum: nav.subjectId
        ? `/admin/curriculum/${nav.subjectId}${
            nav.gradeLevelId ? `?year=${nav.gradeLevelId}` : ""
          }`
        : nav.gradeLevelId
          ? `/admin/curriculum?year=${nav.gradeLevelId}`
          : "/admin/curriculum",
      "curriculum-setup": nav.curriculumDraftId
        ? `/admin/curriculum-setup?draftId=${nav.curriculumDraftId}`
        : "/admin/curriculum-setup",
      // A teacher opens on their own page; without one, the list.
      staff: nav.staffUserId
        ? `/admin/staff/${nav.staffUserId}`
        : "/admin/staff",
      // A learner opens on their own page; without one, the list.
      students: nav.studentId
        ? `/admin/students/${nav.studentId}`
        : "/admin/students",
      // A class opens on its own page; without one, the list.
      classes: nav.classId ? `/admin/classes/${nav.classId}` : "/admin/classes",
      arms: "/admin/classes?tab=arms",
      timetable: timetablePath(nav),
      // A note opens on its own; without one, how ready each class is.
      lessons: nav.lessonId
        ? `/admin/lessons/${nav.lessonId}`
        : nav.classId
          ? `/admin/lessons?classId=${nav.classId}`
          : "/admin/lessons",
      lesson: nav.lessonId
        ? `/admin/lessons/${nav.lessonId}`
        : "/admin/lessons",
      analytics: "/admin/analytics",
      announcements: "/admin/announcements",
      settings: "/admin/settings",
      extensions: "/admin/extensions",
      // A printable is a route of its own, outside the portal shell.
      ...(nav.documentId ? { document: `/print/${nav.documentId}` } : {}),
      // Printed from the stored blocks, not from retyped markdown.
      ...(nav.lessonId
        ? { "print-material": `/print/material/${nav.lessonId}` }
        : {}),
      ...(nav.assessmentId
        ? { "print-activity": `/print/activity/${nav.assessmentId}` }
        : {}),
      // An issued report card, printed from what was stored.
      ...(nav.reportId
        ? { "print-report": `/print/report/${nav.reportId}` }
        : {}),
    };
    const path = viewMap[nav.view];
    if (path) navigate(path);
  }, [command.data, clearCommand, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <DefaultSpinner />
      </div>
    );
  }
  if (!isAuthenticated) return null;

  return (
    <AgentSidebar
      setupCard={<AssistantSetupCard />}
      emptyStateText="How can I help you manage your school?"
      dynamicSuggestions={{ getSuggestions: getSchoolSuggestions }}
      // The admin sets each role's model (Settings → Assistant) and the server
      // enforces it, so a picker here would offer a choice it cannot honour.
      // Someone who needs a stronger model asks the admin.
      showModelSelector={false}
      // Side by side only on a large desktop; below that the panel overlays
      // the page instead of squeezing navigation + content + chat into one row.
      overlayBreakpointPx={1279}
      defaultOpen={
        typeof window !== "undefined" ? window.innerWidth >= 1280 : false
      }
    >
      <SchoolTheme />
      <PortalShell
        sidebar={<AdminSidebar />}
        drawerSidebar={<AdminSidebar showAgentToggle={false} />}
        title="Admin Portal"
      >
        <Outlet />
      </PortalShell>
    </AgentSidebar>
  );
}
