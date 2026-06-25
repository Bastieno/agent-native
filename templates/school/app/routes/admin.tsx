import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { AgentSidebar } from "@agent-native/core/client";
import { getSchoolSuggestions } from "@/lib/school-suggestions";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { useRole } from "@/hooks/use-role";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { DefaultSpinner } from "@agent-native/core/client";

export default function AdminLayout() {
  const { role, isLoading, isAuthenticated } = useRole();
  const navigate = useNavigate();
  const { command, clearCommand } = useNavigationState();

  useEffect(() => {
    if (isLoading) return;
    // Not logged in → send to login
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    // Logged in but assigned a non-admin role → send to their portal
    if (role && role !== "school_admin") {
      navigate("/");
    }
    // Authenticated with no role (new user) or school_admin → stay here
  }, [isLoading, isAuthenticated, role, navigate]);

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
      defaultOpen
    >
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </AgentSidebar>
  );
}
