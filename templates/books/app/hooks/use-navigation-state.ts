import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  agentNativePath,
  appBasePath,
  appPath,
} from "@agent-native/core/client";
import { TAB_ID } from "@/lib/tab-id";

export interface NavigationState {
  view: string;
  path?: string;
  /** Selected expense code (E-12) on the Expenses page, digest id on a report. */
  expenseCode?: string;
  digestId?: string;
  start?: string;
  end?: string;
}

export function useNavigationState() {
  const location = useLocation();
  const navigate = useNavigate();
  const qc = useQueryClient();

  // Sync current route to application state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const digestMatch = location.pathname.match(/^\/reports\/([^/]+)/);
    const state: NavigationState = {
      view: viewForPath(location.pathname),
      path: appPath(location.pathname),
      ...(params.get("expense") ? { expenseCode: params.get("expense")! } : {}),
      ...(digestMatch ? { digestId: digestMatch[1] } : {}),
      ...(params.get("start") ? { start: params.get("start")! } : {}),
      ...(params.get("end") ? { end: params.get("end")! } : {}),
    };

    fetch(agentNativePath("/_agent-native/application-state/navigation"), {
      method: "PUT",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        "X-Request-Source": TAB_ID,
      },
      body: JSON.stringify(state),
    }).catch(() => {});
  }, [location.pathname, location.search]);

  // Listen for navigate commands from agent
  const { data: navCommand } = useQuery({
    queryKey: ["navigate-command"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/application-state/navigate"),
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (data) {
        // Return with a timestamp to ensure uniqueness
        return { ...data, _ts: Date.now() };
      }
      return null;
    },
    refetchInterval: 2_000,
    structuralSharing: false,
  });

  useEffect(() => {
    if (!navCommand) return;
    // Delete the one-shot command AFTER reading it
    fetch(agentNativePath("/_agent-native/application-state/navigate"), {
      method: "DELETE",
      headers: {
        "X-Agent-Native-CSRF": "1",
        "X-Request-Source": TAB_ID,
      },
    }).catch(() => {});
    const cmd = navCommand as NavigationState;

    // Navigate to a specific path or resolve view name to path
    const path = routerPath(cmd.path || pathForView(cmd.view));
    navigate(path);
    qc.setQueryData(["navigate-command"], null);
  }, [navCommand, navigate, qc]);
}

const VIEWS: Record<string, string> = {
  today: "/",
  expenses: "/expenses",
  sales: "/sales",
  reports: "/reports",
  settings: "/settings",
  extensions: "/extensions",
  observability: "/observability",
  team: "/team",
};

function viewForPath(pathname: string): string {
  if (pathname === "/") return "today";
  for (const [view, path] of Object.entries(VIEWS))
    if (path !== "/" && pathname.startsWith(path)) return view;
  return "today";
}

function pathForView(view?: string): string {
  return (view && VIEWS[view]) || "/";
}

function routerPath(path: string): string {
  const basePath = appBasePath();
  if (!basePath) return path;
  if (path === basePath) return "/";
  if (path.startsWith(`${basePath}/`)) {
    return path.slice(basePath.length) || "/";
  }
  return path;
}
