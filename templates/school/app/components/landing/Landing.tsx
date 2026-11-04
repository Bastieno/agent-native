import { useState } from "react";
import {
  IconChevronDown,
  IconMessage,
  IconPlugConnected,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { EDITIONS, type Edition } from "@shared/landing-content";
import { BookCall, CONTACT_EMAIL } from "./BookCall";
import {
  AdminHome,
  Attention,
  GradebookRow,
  LearnerSummary,
  LessonDraft,
  MarkedAnswer,
  PhoneWeek,
  ReportCardTop,
  SettingsSheet,
  SetupChecklist,
  SignInCard,
  ThreeLevels,
  WeekGrid,
} from "./Fragments";

export function Wordmark({ className }: { className?: string }) {
  return (
    <a
      href="/"
      className={cn("text-lg font-semibold tracking-[-0.03em]", className)}
    >
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
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark />
        <nav className="flex items-center gap-1 sm:gap-3">
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
    <section
      id={id}
      className={cn("border-t border-border/70 py-20 sm:py-28", className)}
    >
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

export function Landing({
  edition,
  calLink,
}: {
  edition: Edition;
  calLink: string | null;
}) {
  const c = EDITIONS[edition];
  const Person = c.person.singular;

  const fragments = {
    timetable: <WeekGrid c={c} proposal />,
    attention: <Attention c={c} />,
    lesson: <LessonDraft c={c} />,
    levels: <ThreeLevels c={c} />,
    marked: <MarkedAnswer c={c} />,
    learner: <LearnerSummary c={c} />,
  };

  return (
    <div className="landing min-h-screen bg-background text-foreground antialiased">
      <SiteHeader calLink={calLink} edition={edition} />

      <main>
        {/* Hero */}
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <h1 className="max-w-4xl text-balance text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.5rem]">
            Run a school by asking.
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Tell Ellai what you need. It sets the school up, builds the
            timetable, drafts {c.notes}, {c.mark}s work and writes report cards.
            Your staff read it and decide what goes out.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <BookCall calLink={calLink} edition={edition} />
            <span className="text-sm text-muted-foreground">{c.pilotNote}</span>
          </div>

          <div className="mt-16 sm:mt-20">
            <AdminHome c={c} />
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
            {c.standardsLine}
          </p>
        </div>

        {/* Three ways in */}
        <Section>
          <Heading>Talk to it, or click. Both work.</Heading>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: IconMessage,
                title: "The school's assistant",
                body: `On every page. It knows which class or ${Person} you have open, so "who is struggling here?" is enough.`,
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
                <Icon size={20} className="text-primary" />
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

        {/* Instead of, just say */}
        <Section>
          <Heading>An afternoon of forms is one sentence.</Heading>
          <AskList rows={c.ask} fragments={fragments} />
        </Section>

        {/* The year */}
        <Section>
          <Heading>From the first week to the report card.</Heading>
          <div className="mt-16 grid gap-20">
            <Feature
              title="Set up once."
              body={
                <>
                  <span className="text-foreground">
                    &ldquo;{c.setupQuote}&rdquo;
                  </span>{" "}
                  Ellai records it and tells you what is still missing.
                </>
              }
              fragment={<SetupChecklist c={c} />}
            />
            <Feature
              title="A timetable that knows your day."
              body={c.dayLine}
              fragment={<WeekGrid c={c} />}
              flip
            />
            <Feature
              title={`${capital(c.mark)}s you can check.`}
              body={`Every ${c.mark} shows why it was given. Nothing is published until the teacher says so.`}
              fragment={<GradebookRow c={c} />}
            />
            <Feature
              title="Report cards on time."
              body={c.reportLine}
              fragment={<ReportCardTop c={c} />}
              flip
            />
          </div>
        </Section>

        {/* Students */}
        <Section>
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Heading>A tutor that won&rsquo;t do the homework.</Heading>
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
            </div>
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-center">
              <PhoneWeek c={c} />
              {c.idCards ? <SignInCard c={c} /> : null}
            </div>
          </div>
        </Section>

        {/* Trust */}
        <Section>
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
        <Section>
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
        <Section>
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
        <Section className="pb-28 sm:pb-36">
          <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-6xl">
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

function Feature({
  title,
  body,
  fragment,
  flip = false,
}: {
  title: string;
  body: React.ReactNode;
  fragment: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className={cn("min-w-0", flip && "lg:order-2")}>
        <h3 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h3>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
      <div className={cn("min-w-0", flip && "lg:order-1")}>{fragment}</div>
    </div>
  );
}

function AskList({
  rows,
  fragments,
}: {
  rows: (typeof EDITIONS)["ng"]["ask"];
  fragments: Record<string, React.ReactNode>;
}) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div className="mt-14 divide-y divide-border border-y border-border">
      {rows.map((r, i) => (
        <Collapsible
          key={r.say}
          open={open === i}
          onOpenChange={(o) => setOpen(o ? i : -1)}
        >
          <CollapsibleTrigger className="group grid w-full gap-2 py-6 text-left sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8">
            <span className="text-sm text-muted-foreground">
              <IconChevronDown
                size={16}
                className="float-right transition-transform group-data-[state=open]:rotate-180 sm:hidden"
              />
              {r.who}
              <span className="block text-xs">
                instead of {lower(r.insteadOf)}
              </span>
            </span>
            <span className="text-balance text-xl font-medium leading-snug tracking-[-0.015em] sm:text-2xl">
              &ldquo;{r.say}&rdquo;
            </span>
            <IconChevronDown
              size={18}
              className="hidden text-muted-foreground transition-transform group-data-[state=open]:rotate-180 sm:block"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid gap-6 pb-8 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <div />
              <div className="grid min-w-0 gap-5 lg:grid-cols-[1fr_1.3fr] lg:items-start">
                <p className="leading-relaxed text-muted-foreground">
                  {r.result}
                </p>
                <div className="min-w-0">{fragments[r.fragment]}</div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}

function lower(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
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
