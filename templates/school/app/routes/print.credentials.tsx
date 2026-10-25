import { useEffect, useState } from "react";
import { IconPrinter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { LeavePrintView } from "@/components/layout/LeavePrintView";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { decodeSheet, type SheetData } from "../../shared/credentials-sheet";

/**
 * A sheet of sign-in details to cut up and hand out: one card per learner.
 *
 * The details come from the link's fragment, made by `create-student-accounts`,
 * because the passwords are stored nowhere. Open the link again and the sheet
 * is the same; lose the link and the only way to a new sheet is to reset the
 * passwords.
 */
export default function PrintCredentials() {
  const { config } = useSchoolConfig();
  const [data, setData] = useState<SheetData | null | undefined>(undefined);
  useEffect(() => {
    setData(decodeSheet(window.location.hash));
  }, []);
  const school =
    (config as any)?.theme?.displayName ?? (config as any)?.name ?? "School";
  const crest = (config as any)?.theme?.logoUrl ?? null;

  if (data === undefined) return null;
  if (data === null) {
    return (
      <main className="mx-auto max-w-md space-y-3 p-8 text-sm">
        <LeavePrintView />
        <p>
          This page needs the link given when the accounts were made. Passwords
          are not kept anywhere, so a lost link cannot be rebuilt. To get new
          ones, ask the assistant to reset a learner's password.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6 print:max-w-none print:p-0">
      <div
        data-print-hide
        className="mb-6 flex flex-wrap items-center justify-between gap-3"
      >
        <LeavePrintView />
        <div className="flex items-center gap-3">
          <p className="text-xs text-muted-foreground">
            {data.rows.length} card{data.rows.length === 1 ? "" : "s"}. Keep
            this sheet private, and cut along the dashed lines.
          </p>
          <Button size="sm" onClick={() => window.print()}>
            <IconPrinter size={14} className="mr-1.5" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0 bg-white print:gap-0">
        {data.rows.map((r) => (
          <section
            key={r.u}
            className="break-inside-avoid border border-dashed border-neutral-400 p-4 text-neutral-900"
          >
            <div className="flex items-center gap-2">
              {crest ? (
                <img
                  src={crest}
                  alt=""
                  className="h-7 w-7 shrink-0 object-contain"
                />
              ) : null}
              <p className="text-sm font-semibold">{school}</p>
            </div>
            <p className="mt-3 text-base font-medium">{r.n}</p>
            {r.g ? <p className="text-xs text-neutral-600">{r.g}</p> : null}
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 text-neutral-600">Sign in at</dt>
                <dd className="break-all">{data.address}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 text-neutral-600">ID</dt>
                <dd className="font-mono font-semibold">{r.u}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 text-neutral-600">Password</dt>
                <dd className="font-mono font-semibold">{r.p}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[11px] text-neutral-500">
              Keep your password to yourself.
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
