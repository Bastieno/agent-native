/**
 * What each kind of person can do in the school app, written once.
 *
 * The Help pages, the first-sign-in card, the point-of-use hints, the free
 * answers to "how do I…?" in the assistant and `get-help` for a teacher's own
 * AI app all read this list, so they cannot disagree. A test
 * (`test/help.check.ts`) fails when an action offered to a role is claimed by
 * no capability, so a new feature cannot ship without a line here.
 *
 * Wording is the school's own and plain: no action names, ids or role codes.
 * Learner entries say only what a learner can see.
 */

export type HelpRole = "admin" | "teacher" | "student";

export interface Capability {
  id: string;
  roles: HelpRole[];
  /** Only for a subject coordinator (shown on the teacher page, marked). */
  coordinator?: boolean;
  group: string;
  title: string;
  summary: string;
  steps: string[];
  /** The page it lives on, per role. */
  where?: Partial<Record<HelpRole, string>>;
  /** Actions it relies on, for the drift check. Never shown to people. */
  actions?: string[];
  /** Best done from the person's own AI app (long or heavy work). */
  aiApp?: boolean;
  /** Requests worth copying into the assistant or an AI app. */
  starters?: Array<{ label: string; text: string }>;
  /** Words people use for it, for search. */
  keywords: string[];
  /** When it arrived; drives "new for you". */
  added: string;
}

export const CAPABILITIES: Capability[] = [
  // ───────────────────────── Everyone ─────────────────────────
  {
    id: "install-app",
    roles: ["admin", "teacher", "student"],
    group: "Staying informed",
    title: "Put the app on your phone",
    summary:
      "Add the school to your Home Screen so it opens like an app, and so your phone can tell you when something new arrives. There is nothing to download.",
    steps: [
      "Android: open the school's address in Chrome, tap the menu (three dots), then Install app or Add to Home screen.",
      "iPhone: open the school's address in Safari, tap Share, then Add to Home Screen, then Add. Open it from the new icon.",
      "Laptop: in Chrome or Edge, use the install icon at the right end of the address bar.",
      "Then open Notifications and switch on 'On this device'.",
    ],
    where: {
      admin: "/install",
      teacher: "/install",
      student: "/install",
    },
    keywords: [
      "install",
      "home screen",
      "add to home screen",
      "phone",
      "app",
      "iphone",
      "android",
      "pwa",
    ],
    added: "2026-10-25",
  },
  {
    id: "notifications",
    roles: ["admin", "teacher", "student"],
    group: "Staying informed",
    title: "Notifications and reminders",
    summary:
      "New announcements, work due soon and work waiting to be marked show up under Notifications, with a count beside it. You can also get a daily email, and a message on your phone.",
    steps: [
      "Open Notifications to read what is new; tap one to go to it.",
      "Under 'How you hear', turn on the daily email if your school has enabled it.",
      "On a phone, add the app to your Home Screen, then switch on 'On this device'.",
    ],
    where: {
      admin: "/admin/notifications",
      teacher: "/teacher/notifications",
      student: "/student/notifications",
    },
    actions: [
      "list-my-notifications",
      "mark-notifications-read",
      "update-my-notifications",
    ],
    keywords: [
      "notification",
      "reminder",
      "alert",
      "announcement",
      "due",
      "email",
      "phone",
      "push",
    ],
    added: "2026-10-25",
  },
  // ───────────────────────── Admin ─────────────────────────
  {
    id: "admin-setup",
    roles: ["admin"],
    group: "Setting up",
    title: "Set the school up",
    summary:
      "Record the school's name, year groups, terms, grading and curriculum once; everything else follows from it.",
    steps: [
      "Ask the assistant to set the school up. It drafts one editable sheet from what it can infer.",
      "Correct anything that is wrong, such as the pass mark or term dates.",
      "Run 'what is still missing?' to see what is not set and what the app uses meanwhile.",
    ],
    where: { admin: "/admin/settings" },
    actions: [
      "setup-school",
      "check-school-setup",
      "get-school-config",
      "update-school-config",
      "manage-grade-levels",
      "list-academic-years",
      "create-academic-year",
      "list-terms",
      "create-term",
      "list-subjects",
      "create-subject",
      "update-subject",
      "manage-activity-blueprints",
      "draft-school-guide",
      "update-school-resource",
      "get-custom-fields-schema",
      "get-school-guidance",
    ],
    keywords: [
      "set up",
      "setup",
      "onboarding",
      "pass mark",
      "grading scale",
      "terms",
      "year groups",
      "settings",
      "configure",
      "school guide",
    ],
    starters: [
      {
        label: "Start the setup",
        text: "Please set our school up. Show me one sheet to correct.",
      },
      {
        label: "What is missing?",
        text: "What is still not set up in our school?",
      },
    ],
    added: "2026-09-01",
  },
  {
    id: "admin-staff",
    roles: ["admin"],
    group: "People",
    title: "Invite and manage staff",
    summary:
      "Invite teachers and coordinators by email, change roles, and suspend or reactivate people.",
    steps: [
      "Open Staff and press Invite, or ask the assistant to invite someone with their name and role.",
      "They sign in with the address you used. Their account is created then.",
      "Only after they have signed in can you give them classes.",
    ],
    where: { admin: "/admin/staff" },
    actions: [
      "list-staff",
      "invite-staff",
      "cancel-staff-invite",
      "update-staff-role",
      "add-teacher-to-class",
    ],
    keywords: [
      "invite",
      "teacher",
      "staff",
      "role",
      "suspend",
      "sign up",
      "account",
    ],
    added: "2026-09-01",
  },
  {
    id: "admin-learners",
    roles: ["admin"],
    group: "People",
    title: "See how a learner is doing",
    summary:
      "Open any learner to see what is going well, what needs attention, and each subject beside the class, with the evidence behind it.",
    steps: [
      "Open Students and choose a learner. From a class or from Analytics, a name opens the same page.",
      "Read 'Needs attention' and 'Going well'. Each finding opens to the papers behind it.",
      "Open the report card from the top of the page once one has been issued.",
    ],
    where: { admin: "/admin/students" },
    actions: [
      "list-students",
      "create-student",
      "invite-student",
      "get-student-profile",
      "get-class-profile",
      "get-teacher-profile",
    ],
    keywords: [
      "learner",
      "student",
      "how is",
      "doing",
      "progress",
      "profile",
      "drill down",
    ],
    starters: [
      { label: "Ask about a learner", text: "How is [learner name] doing?" },
    ],
    added: "2026-10-01",
  },
  {
    id: "admin-learner-ids",
    roles: ["admin"],
    group: "People",
    title: "Add learners who have no email address",
    summary:
      "Give each learner an ID (their admission number) and a password. They sign in with those, and nothing needs to be sent to an email address.",
    steps: [
      "Ask the assistant to create accounts for a list of learners. Give each name and admission number, and their year group if you know it. A pasted class list works.",
      "It makes a starting password for each and shows them once, with a link to a printable sheet of cards, one per learner, to cut up and hand out. Keep that link private: it carries the passwords, and they are kept nowhere else.",
      "Hand each learner their ID and password. They sign in at the school's address with their ID in the same box where others type an email.",
      "If a learner forgets their password, ask the assistant to reset it by name or ID. It gives you a new one to pass on. A form teacher can do this for the learners of their own arm.",
      "Every reset is recorded. Ask 'who reset passwords this week?' to see who changed whose.",
    ],
    where: { admin: "/admin/students" },
    actions: [
      "create-student-accounts",
      "reset-student-password",
      "list-password-resets",
    ],
    starters: [
      {
        label: "Create learner accounts",
        text: "Create accounts for these learners, with admission numbers as their IDs: [paste name and admission number, one per line]",
      },
      {
        label: "Reset a password",
        text: "Give [learner name or ID] a new password.",
      },
    ],
    keywords: [
      "no email",
      "without email",
      "admission number",
      "learner id",
      "username",
      "password",
      "forgot password",
      "create account",
      "bulk",
      "class list",
    ],
    added: "2026-10-25",
  },
  {
    id: "admin-school-emails",
    roles: ["admin"],
    group: "Settings",
    title: "Where replies go, and daily emails",
    summary:
      "Emails from the school come from a no-reply address, so say where replies should go. You can also let people opt in to one daily email of what is new.",
    steps: [
      "Ask the assistant to set the reply-to address to your office email. Invitations and password emails then reply there.",
      "To allow daily emails, ask the assistant to turn on email digests. People still choose for themselves under Notifications, and nobody is emailed until they do.",
      "Learners who sign in with an ID have no email, so they only see notifications in the app and on their phone.",
    ],
    where: { admin: "/admin/settings" },
    actions: ["update-school-config"],
    starters: [
      {
        label: "Set reply-to",
        text: "Set the school's reply-to email address to [office email].",
      },
      { label: "Allow daily emails", text: "Turn on daily email digests." },
    ],
    keywords: [
      "reply",
      "reply-to",
      "noreply",
      "email",
      "digest",
      "daily email",
      "notifications email",
    ],
    added: "2026-10-25",
  },
  {
    id: "admin-classes",
    roles: ["admin"],
    group: "People",
    title: "Classes, arms and enrolment",
    summary:
      "Create classes, split a year group into arms such as SS1A and SS1B, and enrol learners.",
    steps: [
      "Create a class for a subject and year group. A class can be for a whole arm, an option, or nobody in particular.",
      "Move learners into an arm; their whole-arm classes follow.",
      "Give each class a teacher once that teacher has signed in.",
    ],
    where: { admin: "/admin/classes" },
    actions: [
      "list-classes",
      "create-class",
      "bulk-enroll-students",
      "list-arms",
      "create-arm",
      "set-learner-arm",
    ],
    keywords: [
      "class",
      "arm",
      "enrol",
      "enroll",
      "ss1a",
      "option",
      "year group",
    ],
    added: "2026-09-01",
  },
  {
    id: "admin-timetable",
    roles: ["admin"],
    group: "Running the term",
    title: "Build the timetable",
    summary:
      "Set the school's week and rooms, place lessons by hand or have a draft made for the term, then accept or discard it.",
    steps: [
      "Tell the assistant how your week runs: days, periods, breaks and rooms.",
      "Say how many periods a week each subject gets in each year group.",
      "Ask for a draft timetable, read what could not be placed, then accept or discard it.",
    ],
    where: { admin: "/admin/timetable" },
    actions: [
      "get-timetable",
      "set-lesson-counts",
      "get-timetable-coverage",
      "generate-timetable",
      "get-timetable-proposal",
      "accept-timetable-proposal",
      "discard-timetable-proposal",
    ],
    keywords: [
      "timetable",
      "periods",
      "clash",
      "rooms",
      "schedule",
      "week",
      "bells",
    ],
    added: "2026-09-15",
  },
  {
    id: "admin-curriculum",
    roles: ["admin"],
    group: "Running the term",
    title: "Curriculum and schemes of work",
    summary:
      "Build the curriculum with the assistant, bring in the school's own syllabus, and turn it into week-by-week lesson notes.",
    steps: [
      "Start a curriculum session and describe what each year group learns; the page fills in as you go.",
      "Or import your own syllabus from a document. Anything unreadable is listed, never guessed.",
      "Commit it, then ask for lesson notes for each class.",
    ],
    where: { admin: "/admin/curriculum" },
    actions: [
      "list-curriculum-drafts",
      "start-curriculum-draft",
      "get-curriculum-draft",
      "update-curriculum-draft",
      "commit-curriculum-draft",
      "discard-curriculum-draft",
      "generate-scheme-of-work",
    ],
    aiApp: true,
    keywords: [
      "curriculum",
      "syllabus",
      "scheme of work",
      "units",
      "objectives",
      "waec",
      "nerdc",
    ],
    added: "2026-09-01",
  },
  {
    id: "admin-lesson-notes",
    roles: ["admin"],
    group: "Running the term",
    title: "Who is behind on lesson notes",
    summary:
      "See which classes have their notes ready, which are behind, and which have no curriculum yet.",
    steps: [
      "Open Lesson notes for the readiness of every class.",
      "Open a class, then a note, in the same editor the teacher uses.",
      "You can mark a note ready for a teacher; they are told you did.",
    ],
    where: { admin: "/admin/lessons" },
    actions: [
      "get-lesson-note-coverage",
      "get-school-attention",
      "get-school-stats",
    ],
    keywords: ["lesson notes", "behind", "readiness", "prepared", "coverage"],
    added: "2026-09-20",
  },
  {
    id: "admin-analytics",
    roles: ["admin"],
    group: "How the school is doing",
    title: "Analytics that open all the way down",
    summary:
      "School, then subject, then class, then learners and papers. Each step shows who and why, with how it was counted.",
    steps: [
      "Open Analytics and a subject to see its classes, with the number struggling.",
      "Open a class to see its learners weakest first, and its papers.",
      "Open a paper for who has not handed in, where the marks sit, and the questions most often missed.",
    ],
    where: { admin: "/admin/analytics" },
    actions: [
      "get-school-analytics",
      "get-paper-profile",
      "identify-struggling-students",
      "get-class-performance",
    ],
    starters: [
      {
        label: "Why is a paper low?",
        text: "Why did [paper name] score so low in [class]?",
      },
    ],
    keywords: [
      "analytics",
      "struggling",
      "average",
      "paper",
      "why low",
      "performance",
      "handed in",
      "not handed in",
      "missing work",
    ],
    added: "2026-10-24",
  },
  {
    id: "admin-report-cards",
    roles: ["admin"],
    group: "How the school is doing",
    title: "Issue report cards",
    summary:
      "Preview a learner's term, add attendance, remarks and the next term's date, then issue it. Once issued it is frozen and printable.",
    steps: [
      "Ask the assistant to prepare a report card; it shows what it will say.",
      "Give it anything the school records that it was not given.",
      "Say go ahead to issue it. A mistake means issuing another, so check first.",
    ],
    where: { admin: "/admin/students" },
    actions: ["issue-report-card", "get-report-card", "generate-report-card"],
    aiApp: true,
    keywords: ["report card", "term report", "issue", "print", "remarks"],
    added: "2026-10-10",
  },
  {
    id: "admin-set-work",
    roles: ["admin"],
    group: "Learning resources",
    title: "Set or share work for any class",
    summary:
      "Cover an absence or get a subject started before its teacher exists. Sharing work in someone else's class names the teacher and asks first.",
    steps: [
      "Ask for a worksheet, reading, quiz or PDF for a class.",
      "Read it as a draft.",
      "Share it. The teacher's portal shows that you did.",
    ],
    actions: [
      "create-activity",
      "create-document-resource",
      "publish-assessment",
    ],
    aiApp: true,
    keywords: ["publish", "set work", "worksheet", "cover", "absence"],
    added: "2026-10-25",
  },
  {
    id: "admin-announcements",
    roles: ["admin"],
    group: "Running the term",
    title: "Announcements",
    summary: "Send a message to the whole school or to one class.",
    steps: [
      "Open Announcements and write it, or ask the assistant to.",
      "Choose the whole school or a class.",
    ],
    where: { admin: "/admin/announcements" },
    actions: [
      "create-announcement",
      "list-announcements",
      "delete-announcement",
    ],
    keywords: ["announcement", "notice", "message", "broadcast"],
    added: "2026-09-01",
  },
  {
    id: "admin-assistant-settings",
    roles: ["admin"],
    group: "Setting up",
    title: "Choose who has the assistant",
    summary:
      "Switch the assistant on or off for learners (or one year group), pick its model for each role, and set daily limits.",
    steps: [
      "Open Settings, then Assistant.",
      "Turn learners on or off; set year groups, models and limits under Advanced.",
      "A learner sitting a timed paper never gets the assistant, whatever is set.",
    ],
    where: { admin: "/admin/settings" },
    actions: ["get-my-agent-access"],
    keywords: [
      "assistant",
      "limit",
      "model",
      "learners",
      "switch off",
      "daily limit",
      "cost",
    ],
    added: "2026-10-05",
  },
  {
    id: "admin-ai-app",
    roles: ["admin"],
    group: "Your own AI app",
    title: "Use your own Claude or ChatGPT with the school",
    summary:
      "Your AI app can read and change the school directly, on your own account. Long jobs cost the school nothing this way.",
    steps: [
      "Open Settings, then Assistant, then 'Connect an AI app', and follow the steps for your app.",
      "Sign in with your school account. There is no token to copy.",
      "Ask it for what you would ask the assistant, or for long jobs: curriculum, report cards, a whole timetable.",
    ],
    where: { admin: "/admin/settings" },
    aiApp: true,
    actions: ["ask_app", "get-my-profile", "get-help"],
    keywords: [
      "ai app",
      "claude",
      "chatgpt",
      "connect",
      "mcp",
      "own account",
      "connector",
    ],
    added: "2026-10-12",
  },
  {
    id: "admin-extensions",
    roles: ["admin"],
    group: "Setting up",
    title: "Mini-apps for your school",
    summary:
      "Describe a small tool, such as a house-points tracker, and the assistant builds it. It is private until you share it.",
    steps: [
      "Open Extensions and describe what you need.",
      "Try it, then share it with the school if it is good.",
      "Switch 'Teachers' on so it appears on their Extensions page.",
    ],
    where: { admin: "/admin/extensions" },
    actions: [
      "list-extensions",
      "get-extension",
      "create-extension",
      "update-extension",
    ],
    keywords: [
      "extension",
      "mini app",
      "widget",
      "tracker",
      "house points",
      "tool",
    ],
    added: "2026-10-01",
  },

  // ───────────────────────── Teacher (and coordinator) ─────────────────────────
  {
    id: "teacher-classes",
    roles: ["teacher"],
    group: "Your classes",
    title: "Your classes in one place",
    summary:
      "Each class has its lessons, its activities and its learners. Lessons show the week, the unit and what is waiting to be shared.",
    steps: [
      "Open My Classes and choose a class.",
      "Use the tabs: Lessons, Assessments, Students.",
      "A learner's name opens how they are doing overall.",
    ],
    where: { teacher: "/teacher/classes" },
    actions: [
      "list-classes",
      "get-class",
      "list-class-students",
      "list-lesson-notes",
      "get-subject-curriculum",
      "get-my-week",
      "get-my-schedule",
    ],
    keywords: ["class", "my classes", "week", "lessons", "timetable", "today"],
    added: "2026-09-01",
  },
  {
    id: "teacher-attention",
    roles: ["teacher"],
    group: "Your classes",
    title: "What needs your attention",
    summary:
      "Your dashboard lists what to do next, each line a link: papers waiting to be marked, marks ready to publish, this week's lesson notes not ready, drafts to read and share, and classes with learners who are struggling.",
    steps: [
      "Open your dashboard; the list is under your greeting.",
      "Press a line to go straight to where it is done.",
      "Ask your AI app 'what needs my attention?' for the same list.",
    ],
    where: { teacher: "/teacher" },
    actions: ["get-my-attention"],
    starters: [
      { label: "Ask what is waiting", text: "What needs my attention today?" },
    ],
    keywords: [
      "attention",
      "to do",
      "todo",
      "waiting",
      "drafts",
      "what should I do",
      "today",
      "pending",
    ],
    added: "2026-10-25",
  },
  {
    id: "teacher-lesson-notes",
    roles: ["teacher"],
    group: "Your classes",
    title: "Write and finish lesson notes",
    summary:
      "The assistant drafts a week's note from the curriculum; you edit it live and mark it ready. Learners never see your plan, only the material you share.",
    steps: [
      "Open a lesson and ask the assistant to draft it, or write it yourself.",
      "It sees your unsaved text, so you can ask for changes as you go.",
      "Mark it ready. You can put it back to draft if the week changes.",
    ],
    actions: [
      "plan-lesson-notes",
      "create-lesson-note",
      "update-lesson-note",
      "finalize-lesson-note",
      "reopen-lesson-note",
      "get-lesson-note",
      "get-lesson-note-coverage",
    ],
    starters: [
      {
        label: "Draft this week",
        text: "Draft the lesson note for [class] for this week.",
      },
    ],
    keywords: [
      "lesson note",
      "plan",
      "draft",
      "mark ready",
      "finalize",
      "week",
    ],
    added: "2026-09-01",
  },
  {
    id: "teacher-reset-password",
    roles: ["teacher"],
    group: "Your learners",
    title: "Reset a password for a learner in your arm",
    summary:
      "If you are the form teacher of an arm, you can give one of its learners a new password when they forget theirs. It only applies to learners who sign in with an ID.",
    steps: [
      "Ask the assistant to reset the password for the learner, by name or ID.",
      "It shows the new password once. Give it to the learner.",
      "The reset is recorded for the school's admin. A learner with an email address uses 'Forgot password' instead.",
    ],
    actions: ["reset-student-password"],
    starters: [
      {
        label: "Reset a password",
        text: "Give [learner name or ID] a new password.",
      },
    ],
    keywords: [
      "password",
      "forgot password",
      "reset password",
      "form teacher",
      "login",
      "sign in",
    ],
    added: "2026-10-25",
  },
  {
    id: "teacher-activities",
    roles: ["teacher"],
    group: "Learning resources",
    title: "Make worksheets, readings, quizzes and card decks",
    summary:
      "Tell the assistant what the week is for. It drafts work in the shape your school uses, with the objectives built in, and you read it before sharing.",
    steps: [
      "Open the class or the lesson and ask for what you want, for example a Week 5 quiz.",
      "Check the preview: format, objectives, timing and marking.",
      "Create it as a draft, read it, then share it with the class.",
    ],
    actions: [
      "create-activity",
      "create-assessment",
      "update-assessment",
      "list-assessments",
      "get-assessment",
      "publish-assessment",
      "close-assessment",
      "unshare-assessment",
      "delete-activity",
      "get-assessment-style",
      "list-assessment-styles",
      "manage-activity-blueprints",
      "list-units",
      "list-learning-objectives",
      "get-curriculum-calendar",
      "list-framework-objectives",
      "get-school-library",
      "get-subject",
      "attach-lesson-resource",
      "list-lesson-resources",
    ],
    starters: [
      {
        label: "A quiz for the week",
        text: "Make a 10-question quiz for [class] on this week's topic.",
      },
      {
        label: "A card deck",
        text: "Make a flashcard deck of the key terms for [class], week [number].",
      },
    ],
    keywords: [
      "worksheet",
      "quiz",
      "reading",
      "card deck",
      "flashcards",
      "activity",
      "assessment",
      "homework",
      "practical",
      "create",
    ],
    added: "2026-09-05",
  },
  {
    id: "teacher-pdf-resource",
    roles: ["teacher"],
    group: "Learning resources",
    title: "A PDF handout from a reference document",
    summary:
      "Give your own AI app a textbook chapter or notes and it writes a fresh, branded PDF handout, with redrawn diagrams, saved as a draft for you to read.",
    steps: [
      "Open 'Your AI app' in the sidebar and connect Claude or ChatGPT once.",
      "Attach your reference and name the pages and topic, and the week it is for, for example weeks 3 and 4.",
      "Ask for a handout. It checks its own pages and saves a draft to the class.",
      "Open the class, then Lessons: the draft is under 'Handouts and other material' (or under its week). Read it, then share it. Learners can view, download and print it.",
    ],
    where: { teacher: "/teacher/classes" },
    actions: [
      "create-document-resource",
      "create-document",
      "get-print-material",
    ],
    aiApp: true,
    starters: [
      {
        label: "A PDF from a reference",
        text: "Using the attached document as a reference, make a branded PDF handout for [class] on [topic]. Look at the pages as images, write it fresh in your own words, redraw the diagrams cleanly, and save it to the school as a draft for me to read.",
      },
    ],
    keywords: [
      "pdf",
      "handout",
      "reference",
      "textbook",
      "notes pdf",
      "diagram",
      "branded",
      "document",
      "learning resource",
    ],
    added: "2026-10-25",
  },
  {
    id: "teacher-one-learner",
    roles: ["teacher"],
    group: "Learning resources",
    title: "A resource for one learner",
    summary:
      "From a learner's page, make a catch-up page or extra practice for them alone. Classmates never see it, and nothing about it is marked.",
    steps: [
      "Open a learner from your class, the gradebook or Analytics.",
      "Under Suggested next steps, press Resource on the subject.",
      "Say what kind of help you want, read the draft, then share it.",
    ],
    where: { teacher: "/teacher/students" },
    actions: [
      "get-student-profile",
      "list-my-students",
      "get-student",
      "get-student-performance",
    ],
    aiApp: true,
    starters: [
      {
        label: "Catch-up for one learner",
        text: "How is [learner] doing in [class]? Make a short resource to help them catch up, for them alone, as a draft for me to read first.",
      },
    ],
    keywords: [
      "catch up",
      "one learner",
      "individual",
      "extra practice",
      "struggling",
      "personalised",
      "named learners",
    ],
    added: "2026-10-24",
  },
  {
    id: "teacher-three-levels",
    roles: ["teacher"],
    group: "Learning resources",
    title: "Papers at three levels",
    summary:
      "Give foundational, developing and advanced learners different versions of the same paper. Learners are never told which they have.",
    steps: [
      "Make the paper with three versions, or add versions to an existing one.",
      "Preview the grouping from recent marks and correct it.",
      "Assign versions by group, then share.",
    ],
    actions: [
      "create-variant",
      "update-variant",
      "delete-variant",
      "list-variants",
      "assign-variants",
      "create-rubric",
      "update-rubric",
      "categorize-students",
      "override-student-category",
    ],
    keywords: [
      "differentiate",
      "three levels",
      "variants",
      "groups",
      "foundational",
      "advanced",
      "rubric",
    ],
    added: "2026-09-10",
  },
  {
    id: "teacher-marking",
    roles: ["teacher"],
    group: "Marking",
    title: "Mark open answers with evidence",
    summary:
      "Closed questions mark themselves. For open ones the assistant marks against your scheme, quoting the learner's words, and flags what it is unsure of. You review and publish.",
    steps: [
      "Open the paper and ask the assistant to mark the open answers.",
      "Read the flagged marks first.",
      "Publish the marks. This shows learners their marks and closes the work.",
    ],
    actions: [
      "get-marking-queue",
      "list-submissions",
      "get-submission",
      "grade-submission",
      "record-answer-mark",
      "compile-submission-grade",
      "bulk-grade-submissions",
      "request-resubmission",
      "publish-grades",
      "update-gradebook-entry",
      "get-gradebook",
    ],
    aiApp: true,
    keywords: [
      "mark",
      "marking",
      "grade",
      "flagged",
      "publish grades",
      "open answers",
      "resubmission",
    ],
    added: "2026-09-20",
  },
  {
    id: "teacher-gradebook",
    roles: ["teacher"],
    group: "Marking",
    title: "The gradebook",
    summary:
      "Every learner's marks for a class in one table, with names that open the learner's page.",
    steps: [
      "Open the class, then Gradebook.",
      "Names open how a learner is doing overall.",
    ],
    where: { teacher: "/teacher/classes" },
    actions: ["get-gradebook"],
    keywords: ["gradebook", "marks table", "grades", "scores"],
    added: "2026-09-01",
  },
  {
    id: "teacher-learner-page",
    roles: ["teacher"],
    group: "How your classes are doing",
    title: "Open any learner in your classes",
    summary:
      "See their term, what is going well, what needs attention, and each subject beside the class. From here you can make something just for them.",
    steps: [
      "Open Students, or a name anywhere: class roster, gradebook, Analytics.",
      "Read the findings; each opens to the evidence.",
      "Use Suggested next steps to act on a subject.",
    ],
    where: { teacher: "/teacher/students" },
    actions: ["get-student-profile"],
    keywords: ["learner page", "student", "how is", "profile", "findings"],
    added: "2026-10-24",
  },
  {
    id: "teacher-analytics",
    roles: ["teacher"],
    group: "How your classes are doing",
    title: "Analytics and who is struggling",
    summary:
      "Your average, work waiting to be marked, and for each class the learners who are struggling, by name.",
    steps: [
      "Open Analytics.",
      "Open 'N struggling' on a class for names and figures, weakest first.",
      "Open a paper from its class for who has not handed in and the questions most often missed.",
    ],
    where: { teacher: "/teacher/analytics" },
    actions: [
      "get-my-analytics",
      "get-class-performance",
      "identify-struggling-students",
      "get-assessment-analytics",
      "get-answer-insights",
      "get-card-difficulty",
      "get-paper-profile",
    ],
    keywords: [
      "analytics",
      "struggling",
      "average",
      "who needs help",
      "class performance",
      "paper",
      "handed in",
      "not handed in",
      "missing work",
      "hasn't handed in",
    ],
    added: "2026-10-24",
  },
  {
    id: "teacher-print",
    roles: ["teacher"],
    group: "Learning resources",
    title: "Print worksheets and documents",
    summary:
      "Print a week's material, with a class copy that has the answers removed and a teacher copy with them, or compose a one-off document.",
    steps: [
      "Open a lesson and choose Print this week.",
      "Pick the class copy or the teacher copy.",
    ],
    actions: ["create-document", "get-print-material"],
    keywords: ["print", "paper copy", "answers", "mark scheme", "a4"],
    added: "2026-09-15",
  },
  {
    id: "teacher-timetable",
    roles: ["teacher"],
    group: "Your classes",
    title: "Your day and week",
    summary:
      "What you teach today, this week, and when your next lesson is. Add a single lesson to your own class.",
    steps: [
      "Ask 'what do I have today?' or open the week view.",
      "Ask the assistant to add a lesson to your class if one is missing.",
    ],
    actions: ["create-class-schedule", "get-timetable"],
    keywords: [
      "timetable",
      "today",
      "my week",
      "next lesson",
      "schedule",
      "periods",
    ],
    added: "2026-09-15",
  },
  {
    id: "teacher-announcements",
    roles: ["teacher"],
    group: "Your classes",
    title: "Announce something to a class",
    summary: "Send a message to one of your classes.",
    steps: ["Ask the assistant to announce it, naming the class."],
    actions: ["create-announcement", "list-announcements"],
    keywords: ["announcement", "notice", "tell the class"],
    added: "2026-09-01",
  },
  {
    id: "teacher-report-cards",
    roles: ["teacher"],
    group: "Marking",
    title: "A learner's term summary",
    summary:
      "A structured term summary for a learner in your class, counted the way the report card counts.",
    steps: [
      "Ask the assistant or your AI app for a learner's term summary in a class.",
    ],
    actions: ["generate-report-card", "get-report-card"],
    aiApp: true,
    keywords: ["report card", "term summary", "report"],
    added: "2026-10-10",
  },
  {
    id: "teacher-reference",
    roles: ["teacher"],
    group: "Setting up",
    title: "The school's own settings, read-only",
    summary:
      "Your AI app reads the school's grading scale, pass mark, words, year groups, subjects and terms so it follows the school's way of working.",
    steps: ["Nothing to do: it reads these itself when it needs them."],
    actions: [
      "get-school-config",
      "get-custom-fields-schema",
      "get-school-resource",
      "get-current-term",
      "list-subjects",
      "list-grade-levels",
      "list-academic-years",
      "list-terms",
      "list-arms",
      "get-timetable-coverage",
      "get-timetable-proposal",
      "get-school-guidance",
      "get-my-profile",
      "ask_app",
      "get-help",
    ],
    keywords: ["settings", "school guide", "reference", "grading scale"],
    added: "2026-10-25",
  },
  {
    id: "teacher-ai-app",
    roles: ["teacher"],
    group: "Your own AI app",
    title: "Use your own Claude or ChatGPT with the school",
    summary:
      "Your AI app can do nearly everything on this page, on your own account. It suits long jobs: a PDF from a 60-page reference, marking a class set, a term of lesson notes.",
    steps: [
      "Press 'Your AI app' in the sidebar and follow the steps for Claude or ChatGPT.",
      "Sign in with your school account once.",
      "Then ask it in your own words; it uses your classes and only yours.",
    ],
    aiApp: true,
    keywords: [
      "ai app",
      "claude",
      "chatgpt",
      "connect",
      "own account",
      "connector",
      "mcp",
    ],
    starters: [
      {
        label: "Draft this week",
        text: "Draft the lesson notes for [class] for this week from the curriculum.",
      },
    ],
    added: "2026-10-25",
  },
  {
    id: "teacher-extensions",
    roles: ["teacher"],
    group: "Setting up",
    title: "Mini-apps your school has shared",
    summary:
      "If your school has put mini-apps in front of teachers, they appear under Extensions.",
    steps: [
      "Open Extensions in the sidebar (it appears only when there is one).",
    ],
    where: { teacher: "/teacher/extensions" },
    keywords: ["extension", "mini app", "widget"],
    added: "2026-10-01",
  },

  // coordinator extras
  {
    id: "coordinator-curriculum",
    roles: ["teacher"],
    coordinator: true,
    group: "Subject coordination",
    title: "Own a subject's curriculum across classes",
    summary:
      "Draft, commit and change the curriculum for your subject, and generate its schemes of work.",
    steps: [
      "Open Curriculum and start a session for your subject.",
      "Commit it, then generate schemes of work for each year group.",
      "Edit a committed unit rather than starting a second draft.",
    ],
    where: { teacher: "/teacher/curriculum" },
    actions: [
      "list-curriculum-drafts",
      "start-curriculum-draft",
      "get-curriculum-draft",
      "update-curriculum-draft",
      "commit-curriculum-draft",
      "discard-curriculum-draft",
      "generate-scheme-of-work",
      "get-curriculum-coverage",
    ],
    aiApp: true,
    keywords: ["curriculum", "scheme of work", "coordinator", "subject"],
    added: "2026-09-10",
  },
  {
    id: "coordinator-oversight",
    roles: ["teacher"],
    coordinator: true,
    group: "Subject coordination",
    title: "Where your subject stands",
    summary:
      "School-wide figures for your subject, which classes are behind on notes, and report cards.",
    steps: [
      "Ask for the lesson-note coverage of your subject.",
      "Ask for school analytics by subject.",
    ],
    actions: ["get-school-analytics", "issue-report-card"],
    keywords: ["coverage", "behind", "subject analytics", "coordinator"],
    added: "2026-09-20",
  },

  // ───────────────────────── Student ─────────────────────────
  {
    id: "student-dashboard",
    roles: ["student"],
    group: "Your school day",
    title: "What is due and what is next",
    summary:
      "Your dashboard shows work to do, what is coming this week and your recent marks.",
    steps: ["Open Dashboard.", "Open anything on it to go straight there."],
    where: { student: "/student" },
    keywords: ["dashboard", "due", "homework", "todo", "what to do"],
    added: "2026-09-01",
  },
  {
    id: "student-week",
    roles: ["student"],
    group: "Your school day",
    title: "Your timetable",
    summary:
      "Your week, period by period, with rooms and teachers. Ask 'what do I have tomorrow?' for a quick answer.",
    steps: [
      "Open My week.",
      "Ask your tutor about a day to get it in a sentence.",
    ],
    where: { student: "/student/week" },
    keywords: [
      "timetable",
      "my week",
      "tomorrow",
      "next lesson",
      "schedule",
      "room",
    ],
    added: "2026-09-15",
  },
  {
    id: "student-classes",
    roles: ["student"],
    group: "Learning",
    title: "Your classes and what your teacher shares",
    summary:
      "Each class lists its lessons and the readings, card decks, handouts and work your teacher has shared.",
    steps: [
      "Open My Classes and choose a class.",
      "Open a week to see what is there.",
    ],
    where: { student: "/student/classes" },
    keywords: ["classes", "lessons", "reading", "material", "week"],
    added: "2026-09-01",
  },
  {
    id: "student-handouts",
    roles: ["student"],
    group: "Learning",
    title: "PDF handouts",
    summary:
      "A handout your teacher shares opens inside the app. You can also download it or print it.",
    steps: [
      "Open it from the class or the week.",
      "Scroll to read. Use Download to keep it, or Print for a paper copy.",
    ],
    keywords: ["pdf", "handout", "notes", "download", "print"],
    added: "2026-10-25",
  },
  {
    id: "student-work",
    roles: ["student"],
    group: "Learning",
    title: "Doing your work",
    summary:
      "Open a piece of work, answer it, and hand it in. Timed work starts when you press begin, and hands in by itself when time is up.",
    steps: [
      "Open the work from your dashboard or class.",
      "Your answers save as you go.",
      "Hand in when you are done. Work with a clock hands in by itself at the end.",
    ],
    keywords: [
      "homework",
      "assignment",
      "submit",
      "hand in",
      "quiz",
      "timed",
      "answers",
    ],
    added: "2026-09-01",
  },
  {
    id: "student-revise",
    roles: ["student"],
    group: "Learning",
    title: "Revise a subject",
    summary:
      "Go over a whole subject week by week, with its reading and your marks. Work marked below the pass mark is gathered at the top.",
    steps: [
      "Open a class, then Revise.",
      "Start with the work gathered at the top.",
    ],
    keywords: ["revise", "revision", "study", "exam", "go over"],
    added: "2026-10-01",
  },
  {
    id: "student-marks",
    roles: ["student"],
    group: "Your marks",
    title: "Your marks and marked papers",
    summary:
      "See your term average, each subject, and your marked papers. The right answers appear once the paper has closed for the whole class.",
    steps: [
      "Open Grades.",
      "Open a subject to see its work.",
      "Open a marked paper to see your answers and feedback.",
    ],
    where: { student: "/student/grades" },
    keywords: [
      "grades",
      "marks",
      "results",
      "average",
      "feedback",
      "correct answers",
    ],
    added: "2026-09-01",
  },
  {
    id: "student-tutor",
    roles: ["student"],
    group: "Getting help",
    title: "Your tutor",
    summary:
      "Ask your tutor to explain an idea or check your thinking. It helps you work it out rather than giving the answer, and is not available while you sit a timed paper.",
    steps: [
      "Open the chat button.",
      "Ask about the idea you are stuck on.",
      "If it is switched off for you, your school has chosen that.",
    ],
    keywords: ["tutor", "help", "assistant", "stuck", "explain", "chat"],
    added: "2026-09-01",
  },
];

/** The capabilities one kind of person sees. A coordinator also gets theirs. */
export function capabilitiesFor(
  role: HelpRole,
  opts: { coordinator?: boolean } = {},
): Capability[] {
  return CAPABILITIES.filter(
    (c) => c.roles.includes(role) && (!c.coordinator || opts.coordinator),
  );
}

/** Which Help role a school role uses. */
export function helpRoleOf(
  schoolRole: string | null | undefined,
): HelpRole | null {
  switch (schoolRole) {
    case "school_admin":
      return "admin";
    case "teacher":
    case "subject_coordinator":
      return "teacher";
    case "student":
      return "student";
    default:
      return null;
  }
}

/** What the first-time card points a new person at, by role. */
export const HIGHLIGHTS: Record<HelpRole, string[]> = {
  admin: ["admin-setup", "admin-analytics", "admin-ai-app"],
  teacher: [
    "teacher-activities",
    "teacher-pdf-resource",
    "teacher-learner-page",
  ],
  student: ["student-week", "install-app", "student-tutor"],
};
