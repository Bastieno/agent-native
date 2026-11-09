# Ellai: run a school by asking

A school platform built with [Agent-Native](https://github.com/BuilderIO/agent-native).

School software usually means menus, buttons and long forms. Here a principal, teacher or learner says what they need and an AI agent does it: it sets the school up, builds the timetable, drafts lesson notes, writes and marks work, and issues report cards. The agent and the screens are equal partners on one database, so whatever one does, the other shows at once. The agent can be the school's own assistant, or a person's own Claude or ChatGPT connected over MCP.

## Live demo

Two demo schools, built by the same code, to show the platform is not tied to one country, curriculum or grading system:

| School                                                 | Place           | Sign in as                                                          |
| ------------------------------------------------------ | --------------- | ------------------------------------------------------------------- |
| [Crestfield College](https://crestfield.ellai.dev)      | Ibadan, Nigeria | `principal@crestfield.test`, `adebola.ogundipe@crestfield.test` |
| [Yellow View High School](https://yellowview.ellai.dev) | Columbus, Ohio  | `principal@yellowview.test`, `rebecca.tanaka@yellowview.test`   |

Each has 180 learners, about 30 staff, a generated timetable, a full term already taught, marked work, exams and report cards. The data is simulated.

The password for the live demos is not in this repository; email [support@ellai.dev](mailto:support@ellai.dev) and ask for it. To explore on your own machine instead, see [Build both schools on your own machine](#build-both-schools-on-your-own-machine).

## Try it in five minutes

1. In Claude, ChatGPT, Claude Code or Cursor, add a custom connector (an MCP server) at `https://crestfield.ellai.dev/_agent-native/mcp`.
2. Sign in with a demo email in the browser. You then act as that person, with that person's permissions.
3. Ask in plain words:
   - "What needs my attention this week?" then "Give me a link to the lesson notes not marked ready."
   - "Generate the timetable and show me the proposal."
   - "How is Fatima doing in SS2B? Make a catch-up resource for her alone and save it as a draft."

It answers with names, not codes, and gives a link to the real page in the app. The same assistant is also in the app's sidebar, and it knows which page, class or learner you have open.

## How it uses Agent-Native

- **One action, every way in.** More than 200 capabilities are each written once with `defineAction()` in [`actions/`](actions). The screens, the in-app assistant and a connected Claude or ChatGPT call the same code, so the agent has no second version to drift.
- **The agent sees the page.** The open page, and the class or learner on it, is shared with the agent, so "who is struggling here?" needs no names.
- **One database, kept in step.** Screens and agent read and write the same SQL data (Drizzle; SQLite locally, Postgres in production), and the screens refresh when the agent changes something.
- **Checked per role.** Every action has a role policy ([`server/lib/action-policy.ts`](server/lib/action-policy.ts)), enforced in one place ([`server/lib/guard-actions.ts`](server/lib/guard-actions.ts)). A connected app is offered only the tools its role may use, and a teacher asking for another teacher's class is refused.
- **Answers link to screens.** A result about a learner, class, paper or lesson note carries a link to its page ([`server/lib/view-links.ts`](server/lib/view-links.ts)). A check fails if a new read action neither links nor says why not.
- **Drafts first.** Notes, resources and marks are saved for the person to review. The agent does not publish marks, and it confirms before anything that cannot be undone.

## Build both schools on your own machine

Tested from a fresh clone. You need Node 24 (see [`.nvmrc`](../../.nvmrc)), pnpm 10 (`corepack enable` gives you the right one) and git. There is no database to install and no account to create: each school lives in its own SQLite file under `templates/school/data/`.

**1. Get the code and install** (about a minute; this also builds the framework packages):

```bash
git clone --branch school https://github.com/Bastieno/agent-native.git
cd agent-native
pnpm install
cd templates/school
```

**2. Build Crestfield College** (Ibadan, Nigeria). Use two terminals in `templates/school`.

Terminal 1, start the school's server:

```bash
pnpm dev:showcase        # http://localhost:8131
```

Wait until [http://localhost:8131/login](http://localhost:8131/login) opens. The first start writes a secret to `.env.local` and restarts itself once, so give it a few seconds.

Terminal 2, build the school. Choose a password; every account will use it:

```bash
SIM_PASSWORD='choose-a-password' pnpm showcase:school     # about 4 minutes
```

**3. Build Yellow View High School** (Columbus, Ohio). Same again, on its own port and database, so you can do it at the same time as Crestfield:

```bash
pnpm dev:yellowview      # terminal 3, http://localhost:8133
```

```bash
SIM_PASSWORD='choose-a-password' pnpm yellowview:school   # terminal 4, under 3 minutes
```

**What you get.** The build calls the app's own actions with no AI model, so it costs nothing. When it finishes it prints a block like this, with the address and the accounts to sign in with:

```text
Ready. Open http://localhost:8131 and sign in with one of these.
  principal  principal@crestfield.test
  teacher    emmanuel.okafor@crestfield.test  (Emmanuel Okafor)
  learner    eniola.ajibola@crestfield.test  (Eniola Ajibola)
  password   choose-a-password  (every account; set SIM_PASSWORD before the run to choose your own)
```

It also writes a folder of files, `docs/showcase/` for Crestfield and `docs/showcase-yellowview/` for Yellow View:

| File                  | What is in it                                                       |
| --------------------- | ------------------------------------------------------------------- |
| `school-roster.md`  | Every account (staff and learners) with its email, and the password |
| `school-roster.csv` | The same as a spreadsheet                                           |
| `where-to-look.md`  | What to open to see each feature                                    |
| `report.md`         | The checklist the build verified, with timings and findings (none)  |

These folders hold the password, so they are git-ignored and stay on your machine.

**Accounts that exist after a build** (all `.test` addresses, all with your password):

| School      | Role      | Email                                |
| ----------- | --------- | ------------------------------------ |
| Crestfield  | Principal | `principal@crestfield.test`        |
| Crestfield  | Teacher   | `adebola.ogundipe@crestfield.test` |
| Crestfield  | Teacher   | `emmanuel.okafor@crestfield.test`  |
| Crestfield  | Learner   | `zainab.oyebode@crestfield.test`   |
| Crestfield  | Learner   | `fatima.nwachukwu@crestfield.test` |
| Yellow View | Principal | `principal@yellowview.test`        |
| Yellow View | Teacher   | `rebecca.tanaka@yellowview.test`   |
| Yellow View | Learner   | `ava.hoffman@yellowview.test`      |

If you leave out `SIM_PASSWORD`, the build uses a built-in test password from [`test/sim/client.ts`](test/sim/client.ts). That is fine on your own laptop; never reuse a real password, and set your own if anyone else can reach the server.

**Start again from nothing.** A school can only be built once per database, and a second run tells you so. To rebuild, stop the server (Ctrl-C), then:

```bash
pnpm showcase:reset      # or pnpm yellowview:reset
pnpm dev:showcase        # start the server again, then run the build again
```

**The assistant chat** needs an Anthropic key: copy `.env.example` to `.env` and set `ANTHROPIC_API_KEY`. The screens, the actions and the build itself work without one.

**Two local-only switches.** `dev:showcase`, `dev:yellowview` and `dev:journeys` set `AUTO_CREATE_DEFAULT_ORG` (the build can create its first account without an invitation) and `ALLOW_PLAIN_NOTATION` (the hand-written demo content is not held to the rule that makes the AI mark maths and chemistry as notation). A hosted school sets neither; production refuses to start with open sign-up.

Other commands: `pnpm typecheck`, `pnpm build`, and the fast checks in `test/*.check.ts`, which need no server.

## How it was tested

A simulation, not unit tests. A whole school runs for a term through the app's own actions. Learners carry a hidden ability, trajectory and diligence that the app is never told, and where the app's verdict and the truth disagree, that is a finding. Both demo schools finish with every checklist feature filled and no findings. Schema edits are additive only. The second school (Yellow View) was chosen to find what Nigeria had quietly hard-coded; it needed three changes (GPA, school words, no default timezone), each made once in the platform.

## Where things are

| Path                                 | What is there                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| [`actions/`](actions)               | Every capability, once: the agent's tools and the screens' endpoints          |
| [`app/routes/`](app/routes)         | The screens, by role (`admin.*`, `teacher.*`, `student.*`)              |
| [`server/lib/`](server/lib)         | Role policy, the request gate, links, credits, notifications and shared logic |
| [`server/plugins/`](server/plugins) | Start-up: migrations, sign-in, the assistant and its gate                     |
| [`shared/`](shared)                 | Code used by both the server and the screens                                  |
| [`test/`](test)                     | Fast checks (`*.check.ts`) and the school simulation (`test/sim/`)        |
| [`ops/`](ops)                       | Provisioning, credits and migration scripts for running a hosted school       |
| [`AGENTS.md`](AGENTS.md)            | The instructions and skills the assistant works from                          |
