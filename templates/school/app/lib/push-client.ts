import { agentNativePath } from "@agent-native/core/client";

/** What this browser can do about push, and what is left for the person to do. */
export type PushSupport =
  | "unsupported" // no push in this browser
  | "install" // iPhone: only works from the home screen
  | "off" // the school has not set push up
  | "denied" // the person said no in the browser
  | "ready";

function isIos(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}
function isInstalled(): boolean {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true
  );
}

export async function pushSupport(): Promise<PushSupport> {
  if (isIos() && !isInstalled()) return "install";
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return "unsupported";
  }
  if (Notification.permission === "denied") return "denied";
  const res = await fetch(agentNativePath("/api/school/push-key"));
  const { key } = res.ok ? await res.json() : { key: null };
  return key ? "ready" : "off";
}

function keyBytes(base64Url: string): Uint8Array {
  const pad = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const raw = atob((base64Url + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

export async function isSubscribed(): Promise<boolean> {
  if (!("serviceWorker" in navigator)) return false;
  const reg = await navigator.serviceWorker.getRegistration("/sw.js");
  return !!(await reg?.pushManager.getSubscription());
}

/** Ask permission, subscribe this device, and tell the server. */
export async function enablePush(): Promise<boolean> {
  const res = await fetch(agentNativePath("/api/school/push-key"));
  const { key } = await res.json();
  if (!key) return false;
  if ((await Notification.requestPermission()) !== "granted") return false;
  const reg = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;
  const sub =
    (await reg.pushManager.getSubscription()) ??
    (await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: keyBytes(key) as BufferSource,
    }));
  const json = sub.toJSON();
  const saved = await fetch(agentNativePath("/api/school/push-subscribe"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint: json.endpoint, keys: json.keys }),
  });
  return saved.ok;
}

export async function disablePush(): Promise<void> {
  const reg = await navigator.serviceWorker.getRegistration("/sw.js");
  const sub = await reg?.pushManager.getSubscription();
  if (!sub) return;
  await fetch(agentNativePath("/api/school/push-subscribe"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint: sub.endpoint, unsubscribe: true }),
  }).catch(() => {});
  await sub.unsubscribe();
}
