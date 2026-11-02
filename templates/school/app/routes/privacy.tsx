import type { MetaFunction } from "react-router";
import { SiteFooter, Wordmark } from "@/components/landing/Landing";
import { CONTACT_EMAIL } from "@/components/landing/BookCall";

export const handle = { publicPage: true };

export const meta: MetaFunction = () => [
  { title: "Privacy · Ellai" },
  { tagName: "link", rel: "canonical", href: "https://ellai.dev/privacy" },
  {
    name: "description",
    content:
      "What Ellai stores for a school, who it shares it with, and what a school can ask for.",
  },
];

const UPDATED = "29 October 2026";

/**
 * The privacy notice. It describes what the app actually stores and who it
 * actually uses; when either changes, this page changes with it.
 */
export default function Privacy() {
  return (
    <div className="landing min-h-screen bg-background text-foreground antialiased">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <Wordmark />
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
          Privacy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated {UPDATED}
        </p>

        <div className="mt-12 grid gap-10 leading-relaxed [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:mt-1.5 [&_p]:mt-3 [&_p]:text-muted-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted-foreground">
          <section>
            <h2>Who we are</h2>
            <p>
              Ellai is school software. It is operated by Francis Nduamaka.
              Questions about this notice or about your data go to{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-foreground underline underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2>The school decides, Ellai acts for it</h2>
            <p>
              A school that uses Ellai is responsible for the personal data of
              its students and staff: it decides what is recorded and why. Ellai
              handles that data on the school&rsquo;s behalf and only to run the
              service the school asked for. Where the law asks for a
              parent&rsquo;s or guardian&rsquo;s consent, the school obtains it,
              usually at enrolment.
            </p>
            <p>Ellai is not offered to schools whose students are under 13.</p>
          </section>

          <section>
            <h2>What Ellai stores</h2>
            <ul>
              <li>
                Names, email addresses or student IDs, and each person&rsquo;s
                role in the school.
              </li>
              <li>Year groups, classes, enrolments and the timetable.</li>
              <li>
                What teachers write and set: curriculum, lesson notes, work and
                its mark schemes.
              </li>
              <li>
                What students hand in, their marks and feedback, and report
                cards.
              </li>
              <li>
                Conversations with the school&rsquo;s assistant, so a
                conversation can be picked up again.
              </li>
              <li>
                Notifications, and the devices that agreed to receive them.
              </li>
              <li>
                A record of every password changed for a student by staff: who,
                for whom and when. Never the password itself.
              </li>
            </ul>
            <p>
              Passwords are stored only as a one-way hash. A school&rsquo;s
              Anthropic key is stored encrypted.
            </p>
          </section>

          <section>
            <h2>What Ellai never does</h2>
            <ul>
              <li>Sell personal data, or share it for advertising.</li>
              <li>Use it to build profiles for anyone but the school.</li>
              <li>Train AI models on it.</li>
            </ul>
          </section>

          <section>
            <h2>Who else handles it</h2>
            <p>
              Ellai uses a small number of providers to run. Each sees only what
              it needs to do its job.
            </p>
            <ul>
              <li>Vercel hosts the application.</li>
              <li>Neon hosts the database.</li>
              <li>
                Anthropic runs the assistant. A school connects it with its own
                Anthropic key, so the school is Anthropic&rsquo;s customer
                directly. Anthropic&rsquo;s commercial terms say it does not
                train its models on what is sent through its API.
              </li>
              <li>Resend sends the school&rsquo;s email.</li>
              <li>
                Cal.com takes bookings when someone books a call from this site.
              </li>
            </ul>
            <p>
              These providers store data in the United States. For schools in
              Nigeria and elsewhere, that means the data leaves the country; it
              is protected by the providers&rsquo; contractual safeguards and
              the security measures below.
            </p>
            <p>
              Staff may also connect their own AI app, such as Claude or
              ChatGPT. That app then acts as the person, with their permissions,
              and works under that person&rsquo;s own agreement with its
              provider.
            </p>
          </section>

          <section>
            <h2>How it is protected</h2>
            <ul>
              <li>
                Every request is checked against the person&rsquo;s role. A
                teacher cannot open another teacher&rsquo;s class, and one
                school cannot see another&rsquo;s data.
              </li>
              <li>Accounts are made by invitation from the school only.</li>
              <li>Data travels encrypted between your device and Ellai.</li>
            </ul>
            <p>
              If personal data is ever exposed, we tell the school without
              delay, so it can meet its own duty to inform the regulator and the
              people affected.
            </p>
          </section>

          <section>
            <h2>What a school can ask for</h2>
            <ul>
              <li>A copy of its data, to keep or to take elsewhere.</li>
              <li>A correction to anything recorded wrongly.</li>
              <li>
                Deletion of its data when it stops using Ellai, or of one
                person&rsquo;s data at any time.
              </li>
            </ul>
            <p>
              Students, parents and staff make these requests through their
              school, which can make them of us at {CONTACT_EMAIL}.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              Ellai sets only the cookies needed to keep you signed in. It does
              not use advertising cookies.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              When this notice changes, the date at the top changes too, and
              schools using Ellai are told of anything that affects them.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
