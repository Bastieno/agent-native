import { useEffect, useState } from "react";
import { IconPrinter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

/**
 * How to put the school on a phone, for anyone: no sign-in, so a school can
 * print it or send the link to parents. It carries the school's name when it
 * is opened at the school's own address.
 */
export default function Install() {
  const [school, setSchool] = useState<string | null>(null);
  useEffect(() => {
    fetch("/manifest.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((m) => setSchool(m?.name && m.name !== "School" ? m.name : null))
      .catch(() => {});
  }, []);
  const where = school ?? "the school";
  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6 sm:p-10">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Put {where} on your phone</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            There is nothing to download. You add the school's website to your
            Home Screen, and it then opens like an app, with its own icon. The
            address to use is the one at the top of this page.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 print:hidden"
          onClick={() => window.print()}
        >
          <IconPrinter size={14} className="mr-1.5" />
          Print
        </Button>
      </header>

      <Steps
        title="Android phone (Chrome)"
        steps={[
          "Open the school's address in Chrome.",
          "Tap the menu (the three dots at the top right).",
          "Tap Install app, or Add to Home screen.",
          "Open the school from the new icon.",
        ]}
      />
      <Steps
        title="iPhone (Safari)"
        steps={[
          "Open the school's address in Safari. Other browsers will not work for this.",
          "Tap the Share button (the square with an arrow).",
          "Scroll down and tap Add to Home Screen, then Add.",
          "Open the school from the new icon on your Home Screen.",
        ]}
      />
      <Steps
        title="Laptop (Chrome or Edge)"
        steps={[
          "Open the school's address.",
          "Click the install icon at the right end of the address bar, then Install.",
        ]}
      />

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Then, to hear about new things</h2>
        <p className="text-sm text-muted-foreground">
          Open the app, go to Notifications, and switch on "On this device".
          Your phone will show a message when there is a new announcement or
          work due. On an iPhone this only works once the school has been added
          to the Home Screen as above.
        </p>
      </section>
    </main>
  );
}

function Steps({ title, steps }: { title: string; steps: string[] }) {
  return (
    <section className="space-y-2 break-inside-avoid">
      <h2 className="text-lg font-medium">{title}</h2>
      <ol className="list-decimal space-y-1.5 pl-5 text-sm">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </section>
  );
}
