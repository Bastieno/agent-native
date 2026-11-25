import { APP_TITLE } from "@/lib/app-config";

/**
 * The privacy policy: public and server-rendered (it is the link Meta checks
 * for the WhatsApp app), so it renders outside the signed-in app shell.
 */
export function meta() {
  return [
    { title: `Privacy — ${APP_TITLE}` },
    {
      name: "description",
      content: `What ${APP_TITLE} keeps, who can see it and how to have it removed.`,
    },
  ];
}

const UPDATED = "25 November 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyRoute() {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 px-5 py-12 text-foreground">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Privacy</h1>
        <p className="text-sm text-muted-foreground">
          {APP_TITLE} keeps the accounts of one Restaurant &amp; Lounge and Hub.
          It is used only by the business owner and their business partner. Last
          updated {UPDATED}.
        </p>
      </header>

      <Section title="What Books keeps">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Sales records from the business&rsquo;s till: what was sold, when,
            for how much and how it was paid. These can include a
            customer&rsquo;s name where the till recorded one.
          </li>
          <li>
            Payments received, as reported by Moniepoint, the business&rsquo;s
            payment provider.
          </li>
          <li>
            Expenses: receipt and transfer-slip images, and who was paid, how
            much and what for.
          </li>
          <li>
            Messages sent to the Books WhatsApp number by the owner and the
            partner, and the files and photos attached to them.
          </li>
          <li>
            The owner&rsquo;s and partner&rsquo;s names, email addresses and
            WhatsApp numbers, so Books knows who is signing in or writing.
          </li>
        </ul>
      </Section>

      <Section title="Who can see it">
        <p>
          Only the owner and the partner, after signing in. Books answers only
          the WhatsApp numbers they have listed, and ignores messages from
          anyone else. Nothing is sold, shared for advertising or published.
        </p>
      </Section>

      <Section title="Services Books uses">
        <p>
          The data is stored on the business&rsquo;s own server. To do its work,
          Books passes data to these services, each under its own privacy terms:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Meta (WhatsApp Business Platform), which carries WhatsApp messages
            to and from the Books number.
          </li>
          <li>
            Anthropic, whose assistant reads messages and receipts to record
            them and answers the owner&rsquo;s and partner&rsquo;s questions.
          </li>
          <li>
            Resend, which delivers the daily, weekly and monthly reports by
            email.
          </li>
          <li>Moniepoint, which tells Books about payments received.</li>
        </ul>
      </Section>

      <Section title="How long it is kept">
        <p>
          As long as the business keeps its accounts. Financial records are
          normally kept for several years for tax purposes.
        </p>
      </Section>

      <Section title="Having data removed">
        <p>
          To ask what Books holds about you, or to have it corrected or removed,
          contact the owner of the Restaurant &amp; Lounge and Hub. Records the
          business must keep by law are kept for as long as the law requires;
          anything else is removed on request.
        </p>
      </Section>
    </main>
  );
}
