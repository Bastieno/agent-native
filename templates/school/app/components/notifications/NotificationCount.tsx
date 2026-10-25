import { useNotifications } from "@/hooks/use-notifications";

/** The number waiting, beside Notifications in the navigation. */
export function NotificationCount() {
  const { unread } = useNotifications();
  if (unread === 0) return null;
  return (
    <span
      className="ml-auto inline-flex min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-medium leading-5 text-primary-foreground"
      aria-label={`${unread} unread`}
    >
      {unread > 99 ? "99+" : unread}
    </span>
  );
}
