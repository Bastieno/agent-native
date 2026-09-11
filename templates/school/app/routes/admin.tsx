import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { AgentSidebar } from "@agent-native/core/client";
import { getSchoolSuggestions } from "@/lib/school-suggestions";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { PortalShell } from "@/components/layout/PortalShell";
import { useRole } from "@/hooks/use-role";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { DefaultSpinner } from "@agent-native/core/client";

export default function AdminLayout() {
  const { role, isLoading, isAuthenticated, accessDenied } = useRole();
  const navigate = useNavigate();
  const { command, clearCommand } = useNavigationState();

  useEffect(() => {
    if (isLoading) return;
    // Not logged in → send to login
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    // Authenticated but school is set up and they have no invite
    if (accessDenied) {
      navigate("/pending-activation");
      return;
    }
    // Logged in but assigned a non-admin role → send to their portal
    if (role && role !== "school_admin") {
      navigate("/");
    }
    // Authenticated with no role (first admin) or school_admin → stay here
  }, [isLoading, isAuthenticated, accessDenied, role, navigate]);

  useEffect(() => {
    if (!command.data) return;
    const nav = command.data as any;
    clearCommand();
    if (!nav.view) return;
    const viewMap: Record<string, string> = {
      overview: "/admin",
      curriculum: "/admin/curriculum",
      "curriculum-setup": nav.curriculumDraftId
        ? `/admin/curriculum-setup?draftId=${nav.curriculumDraftId}`
        : "/admin/curriculum-setup",
      staff: "/admin/staff",
      students: "/admin/students",
      classes: "/admin/classes",
      analytics: "/admin/analytics",
      announcements: "/admin/announcements",
      settings: "/admin/settings",
      extensions: "/admin/extensions",
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
      emptyStateText="How can I help you manage your school?"
      dynamicSuggestions={{ getSuggestions: getSchoolSuggestions }}
      // Side by side only on a large desktop; below that the panel overlays
      // the page instead of squeezing navigation + content + chat into one row.
      overlayBreakpointPx={1279}
      defaultOpen={
        typeof window !== "undefined" ? window.innerWidth >= 1280 : false
      }
    >
      <PortalShell sidebar={<AdminSidebar />} title="Admin Portal">
        <Outlet />
      </PortalShell>
    </AgentSidebar>
  );
}
