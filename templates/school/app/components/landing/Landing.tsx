import {
  EDITIONS,
  type EditionContent,
  type Edition,
  type Exchange,
} from "@shared/landing-content";
import {
  IconChevronDown,
  IconLayoutDashboard,
  IconMessage,
  IconPlugConnected,
} from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { BookCall, CONTACT_EMAIL } from "./BookCall";
import { ReportCardTop, SettingsSheet, SignInCard } from "./Fragments";
import { DemoVideo, EllaiMark, Phone, Screen } from "./Media";

/**
 * One colour for each person in a school, taken from the logo's bars. The
 * classes are spelled out so Tailwind finds them.
 */
const ROLE = {
  principal: {
    bar: "bg-principal",
    border: "border-principal",
    ink: "text-principal-ink",
  },
  teacher: {
    bar: "bg-teacher",
    border: "border-teacher",
    ink: "text-teacher-ink",
  },
  learner: {
    bar: "bg-learner",
    border: "border-learner",
    ink: "text-learner-ink",
  },
} as const;
type Role = keyof typeof ROLE;

export function Wordmark({ className }: { className?: string }) {
  return (
    <a
      href="/"
      className={cn(
        "flex items-center gap-2 text-lg font-bold tracking-[-0.03em]",
        className,
      )}
    >
      <EllaiMark className="size-7" />
      Ellai
    </a>
  );
}

export function SiteHeader({
  calLink,
  edition,
}: {
  calLink: string | null;
  edition: Edition;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark />
        <nav className="flex items-center gap-4 sm:gap-6">
          <a
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sign in
          </a>
          <BookCall
            calLink={calLink}
            edition={edition}
            size="default"
            className="hidden sm:inline-flex"
          />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Wordmark className="text-foreground" />
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="/privacy" className="hover:text-foreground">
            Privacy
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
    </footer>
  );
}

function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-16 py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

function Heading({
  children,
  lede,
}: {
  children: React.ReactNode;
  lede?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
        {children}
      </h2>
      {lede ? (
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** A person's section opens with their colour: a bar, then who it is for. */
function RoleHeading({
  role,
  who,
  children,
}: {
  role: Role;
  who: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <div className={cn("h-1.5 w-12 rounded-full", ROLE[role].bar)} />
      <p
        className={cn(
          "mt-5 text-sm font-semibold uppercase tracking-[0.08em]",
          ROLE[role].ink,
        )}
      >
        {who}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
        {children}
      </h2>
    </div>
  );
}

function Feature({
  title,
  body,
  children,
}: {
  title: string;
  body: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 sm:gap-8">
      <div className="max-w-2xl">
        <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
      {children}
    </div>
  );
}

export function Landing({
  edition,
  calLink,
}: {
  edition: Edition;
  calLink: string | null;
}) {
  const c = EDITIONS[edition];
  const Person = capital(c.person.singular);

  return (
    <div className="landing min-h-screen bg-background text-foreground antialiased">
      <SiteHeader calLink={calLink} edition={edition} />

      <main>
        {/* Hero */}
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="min-w-0">
            <h1 className="text-balance text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl">
              Run a school by asking.
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              The principal, every teacher and every {c.person.singular} get an
              assistant that knows the school. It sets the school up, builds the
              timetable, drafts {c.notes}, {c.mark}s work and writes report
              cards. Your staff read it and decide what goes out.
            </p>
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
              <BookCall calLink={calLink} edition={edition} />
              <span className="text-sm text-muted-foreground">
                {c.pilotNote}
              </span>
            </div>
          </div>
          <HeroAsk c={c} />
        </div>

        {c.video ? (
          <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
            <DemoVideo id={c.video.id} title={c.video.title} />
          </div>
        ) : null}

        {/* One assistant, three people */}
        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <div className="grid overflow-hidden rounded-xl border border-border md:grid-cols-3">
            {(
              [
                [
                  "principal",
                  "Principal",
                  c.exchanges.principal.say,
                  "#principal",
                ],
                ["teacher", "Teacher", c.exchanges.teacher.say, "#teacher"],
                ["learner", Person, c.exchanges.learner.say, "#learner"],
              ] as const
            ).map(([role, who, say, href], i) => (
              <a
                key={role}
                href={href}
                className={cn(
                  "group border-t-4 bg-card p-6 transition-colors hover:bg-muted/60 sm:p-7",
                  ROLE[role].border,
                  i > 0 && "border-l-0 md:border-l md:border-l-border",
                )}
              >
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.08em]",
                    ROLE[role].ink,
                  )}
                >
                  {who}
                </span>
                <span className="mt-3 block text-balance text-lg font-medium leading-snug tracking-[-0.01em]">
                  &ldquo;{say}&rdquo;
                </span>
              </a>
            ))}
          </div>
          <p className="mt-5 max-w-2xl text-sm text-muted-foreground">
            {c.standardsLine}
          </p>
        </div>

        {/* Principal */}
        <Section id="principal">
          <RoleHeading role="principal" who="For the principal">
            Know what needs you before it is late.
          </RoleHeading>
          <div className="mt-14 grid gap-20">
            <Feature
              title="Ask instead of opening every class."
              body="It reads the whole school, says what is holding work up and offers the next step."
            >
              <Screen
                edition={edition}
                name="principal-ask"
                label={`The principal asks what needs attention at ${c.school}`}
              />
            </Feature>
            <Feature
              title="A timetable that knows your day."
              body={`${c.dayLine} Generate one and accept the proposal when it looks right.`}
            >
              <Screen
                edition={edition}
                name="timetable"
                label={`The timetable at ${c.school}`}
              />
            </Feature>
          </div>
        </Section>

        {/* Teacher */}
        <Section id="teacher" className="bg-muted/40">
          <RoleHeading role="teacher" who="For teachers">
            {capital(c.mark)}s you can check, report cards on time.
          </RoleHeading>
          <div className="mt-14 grid gap-20">
            <Feature
              title={`${capital(c.mark)} a whole class in one sentence.`}
              body={`Every ${c.mark} shows why it was given, and anything unclear is flagged. Nothing is published until the teacher says so.`}
            >
              <Screen
                edition={edition}
                name="teacher-mark"
                label={`A teacher asks the assistant to ${c.mark} a quiz`}
              />
            </Feature>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="max-w-md">
                <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                  Report cards on time.
                </h3>
                <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
                  {c.reportLine}
                </p>
              </div>
              <div className="min-w-0">
                <ReportCardTop c={c} />
              </div>
            </div>
          </div>
        </Section>

        {/* Learner */}
        <Section id="learner">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <RoleHeading role="learner" who={`For ${c.person.plural}`}>
                A tutor that won&rsquo;t do the homework.
              </RoleHeading>
              <dl className="mt-10 grid gap-7 sm:grid-cols-2">
                <Point title="Their week on any phone.">
                  Nothing to download. Add the school to the Home Screen and it
                  opens like an app.
                </Point>
                <Point title="Help, not answers.">
                  The assistant explains and asks questions. It does not hand
                  over the answer.
                </Point>
                <Point title={c.learnerExtra.title}>
                  {c.learnerExtra.body}
                </Point>
                <Point title="Feedback they can use.">
                  Returned work shows the {c.mark}, the feedback and a model
                  answer. Missed work counts, so nothing slips by quietly.
                </Point>
              </dl>
              {c.idCards ? (
                <div className="mt-10 max-w-xs">
                  <SignInCard c={c} />
                </div>
              ) : null}
            </div>
            <div className="flex items-start justify-center gap-4 sm:gap-6">
              <Phone
                edition={edition}
                name="learner-week"
                label={`A ${c.person.singular}'s week on a phone`}
                className="w-[44%] sm:w-[15rem]"
              />
              <Phone
                edition={edition}
                name="learner-help"
                label={`A ${c.person.singular} asks for the answers and is helped instead`}
                className="mt-12 w-[44%] sm:w-[15rem]"
              />
            </div>
          </div>
        </Section>

        {/* Three ways in */}
        <Section className="border-t border-border/70">
          <Heading>Talk to it, or click. Both work.</Heading>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: IconMessage,
                title: "The school's assistant",
                body: `On every page. It knows which class or ${c.person.singular} you have open, so "who is struggling here?" is enough.`,
              },
              {
                icon: IconPlugConnected,
                title: "Your own Claude or ChatGPT",
                body: "Connect it to the school in about two minutes. It works with your permissions, and long jobs run on your subscription, not the school's.",
              },
              {
                icon: IconLayoutDashboard,
                title: "The screens",
                body: "Whatever the assistant does appears at once, and anyone can check it or change it by hand.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="border-t border-foreground/80 pt-5">
                <Icon size={20} />
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Trust */}
        <Section className="border-t border-border/70">
          <Heading>Fast, but never unsupervised.</Heading>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <Point title="Same person, same permissions." rule>
              The assistant, or a connected Claude or ChatGPT, acts as the
              person signed in. A teacher asking for another teacher&rsquo;s
              class is refused.
            </Point>
            <Point title="Drafts first." rule>
              Notes, resources and {c.mark}s are saved for a person to review.
              Ellai does not publish {c.mark}s, and it asks before anything that
              cannot be undone.
            </Point>
            <Point title="The data stays with the school." rule>
              Names and {c.mark}s stay on the school&rsquo;s server. A connected
              AI app calls the school&rsquo;s tools; it does not copy the data
              out.
            </Point>
          </div>
        </Section>

        {/* Your rules */}
        <Section className="border-t border-border/70">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Heading lede="Year groups, terms, grading, the school day and what you call things are settings, not code. A school changes its mind in a sentence.">
              Your year, your grades, your words.
            </Heading>
            <div className="grid gap-4">
              <SettingsSheet c={c} />
              {edition === "ng" ? (
                <p className="text-sm text-muted-foreground">
                  The same code runs Yellow View High School in Columbus, Ohio,
                  on grades, quarters and GPA.{" "}
                  <a
                    href="?edition=us"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    See it
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </Section>

        {/* Questions */}
        <Section className="border-t border-border/70">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Heading>Questions</Heading>
            <div className="divide-y divide-border border-y border-border">
              {[
                {
                  q: "Do our teachers need to know about AI?",
                  a: "No. They type what they want, or use the screens as they would any school software.",
                },
                {
                  q: "Do we have to use the assistant?",
                  a: "No. Every screen works on its own.",
                },
                { q: "Can it follow our curriculum?", a: c.curriculumAnswer },
                {
                  q: "What does a pilot involve?",
                  a: `Your first ${edition === "ng" ? "term" : "quarter"} is free. We set the school up with you, train the staff in one session, and check in every two weeks. We ask for honest feedback.`,
                },
                {
                  q: "What does it cost after that?",
                  a: `A licence ${c.priceUnit}, agreed before you commit. The assistant runs on the school's own Anthropic key, so you pay Anthropic directly for what you use, with no markup.`,
                },
                {
                  q: "Who owns the data?",
                  a: "The school. You can export it, and we delete it when you leave.",
                },
              ].map((f) => (
                <Faq key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </Section>

        {/* Closing */}
        <Section className="border-t border-border/70 pb-28 sm:pb-36">
          <EllaiMark className="size-12" />
          <h2 className="mt-8 max-w-3xl text-balance text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-6xl">
            See your own school in it.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            On the call we open a demo school, then show what yours would look
            like.
          </p>
          <div className="mt-9">
            <BookCall calLink={calLink} edition={edition} />
          </div>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}

/**
 * The hero: one question from each person, and the answer, set large enough
 * to read. A picture of the conversation, not a working chat.
 */
function HeroAsk({ c }: { c: EditionContent }) {
  const tabs: { role: Role; who: string; ex: Exchange }[] = [
    {
      role: "principal",
      who: "Principal",
      ex: c.exchanges.principal,
    },
    { role: "teacher", who: "Teacher", ex: c.exchanges.teacher },
    {
      role: "learner",
      who: capital(c.person.singular),
      ex: c.exchanges.learner,
    },
  ];
  return (
    <Tabs defaultValue="principal" className="min-w-0">
      <TabsList className="mb-4 h-auto gap-1.5 bg-transparent p-0">
        {tabs.map((t) => (
          <TabsTrigger
            key={t.role}
            value={t.role}
            className="gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm data-[state=active]:border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
          >
            <span className={cn("size-2 rounded-[2px]", ROLE[t.role].bar)} />
            {t.who}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.role} value={t.role} className="mt-0">
          <div className="min-h-[22rem] rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-28px_rgba(40,25,0,0.35)] sm:p-6">
            <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-muted px-4 py-3 text-base font-medium sm:text-[1.05rem]">
              {t.ex.say}
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {t.ex.reply}
            </p>
            {t.ex.items ? (
              <ul className="mt-3">
                {t.ex.items.map((item, i) => (
                  <li
                    key={item.title}
                    className="grid grid-cols-[4px_1fr] gap-3.5 border-t border-border py-3"
                  >
                    <span
                      className={cn(
                        "rounded-full",
                        ROLE[
                          (["principal", "teacher", "learner"] as const)[i % 3]
                        ].bar,
                      )}
                    />
                    <span>
                      <span className="block font-semibold tracking-[-0.01em]">
                        {item.title}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function capital(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Point({
  title,
  children,
  rule = false,
}: {
  title: string;
  children: React.ReactNode;
  rule?: boolean;
}) {
  return (
    <div className={cn(rule && "border-t border-foreground/80 pt-5")}>
      <dt className="font-semibold tracking-tight">{title}</dt>
      <dd className="mt-1.5 leading-relaxed text-muted-foreground">
        {children}
      </dd>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 py-5 text-left font-medium">
        {q}
        <IconChevronDown
          size={18}
          className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="max-w-xl pb-5 leading-relaxed text-muted-foreground">
          {a}
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
