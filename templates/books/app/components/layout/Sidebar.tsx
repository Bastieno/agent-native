import { Link, useLocation } from "react-router";
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconChecklist,
  IconLayoutDashboard,
  IconLogout,
  IconReportAnalytics,
  IconSettings,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  agentNativePath,
  appPath,
  useActionQuery,
  useSession,
} from "@agent-native/core/client";
import { APP_TITLE } from "@/lib/app-config";

const navItems = [
  { icon: IconLayoutDashboard, label: "Overview", href: "/" },
  { icon: IconChecklist, label: "Review", href: "/review" },
  { icon: IconArrowDownLeft, label: "Money in", href: "/sales" },
  { icon: IconArrowUpRight, label: "Money out", href: "/expenses" },
  { icon: IconReportAnalytics, label: "Reports", href: "/reports" },
  { icon: IconSettings, label: "Settings", href: "/settings" },
];

/** How many things wait on the Review screen. */
function useReviewCount(): number {
  const { data } = useActionQuery("list-review", {});
  if (!data) return 0;
  return (
    data.expensesWaiting +
    data.uncategorisedItems.length +
    data.categoryGuesses.length +
    data.pendingReceipts
  );
}

/** `inDrawer`: fills the phone menu drawer, which has its own edge. */
export function Sidebar({ inDrawer = false }: { inDrawer?: boolean }) {
  const location = useLocation();
  const reviewCount = useReviewCount();

  return (
    <aside
      className={cn(
        "flex h-full min-w-0 shrink-0 flex-col overflow-hidden bg-sidebar text-sidebar-foreground",
        inDrawer ? "w-full" : "w-56 border-r border-border",
      )}
    >
      <div className="flex h-12 shrink-0 items-center gap-2 px-4 border-b border-border">
        <img
          src={appPath("/agent-native-icon-light.svg")}
          alt=""
          aria-hidden="true"
          className="block h-4 w-auto dark:hidden"
        />
        <img
          src={appPath("/agent-native-icon-dark.svg")}
          alt=""
          aria-hidden="true"
          className="hidden h-4 w-auto dark:block"
        />
        <span className="truncate text-sm font-semibold tracking-tight">
          {APP_TITLE}
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.href === "/review" && reviewCount > 0 && (
                <span className="rounded-full bg-muted px-1.5 text-xs tabular-nums text-muted-foreground">
                  {reviewCount > 999 ? "999+" : reviewCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <AccountFooter />
    </aside>
  );
}

/** Who is signed in, and signing out. Nothing about organisations or apps. */
function AccountFooter() {
  const { session } = useSession();
  return (
    <div className="border-t border-border p-2">
      {session?.email && (
        <div className="truncate px-3 pb-1 pt-1.5 text-xs text-muted-foreground">
          {session.email}
        </div>
      )}
      <button
        type="button"
        onClick={async () => {
          await fetch(agentNativePath("/_agent-native/auth/logout"), {
            method: "POST",
          }).catch(() => {});
          window.location.href = appPath("/");
        }}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-foreground"
      >
        <IconLogout className="h-4 w-4 shrink-0" />
        Sign out
      </button>
    </div>
  );
}
