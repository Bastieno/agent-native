# Ellai landing page: copy and outline

Draft for review, 2026-10-29. The page is for schools only. Reader: a
proprietor, principal or head of academics.

## The idea

Ellai fits the school, not the other way round: year groups, terms, grading,
timetable and the school's own words are settings. The page shows that by
speaking each visitor's school language, not by claiming it.

**Two editions of one page.** The server reads the visitor's country (Vercel's
`x-vercel-ip-country`) and renders one edition:

| Visitor          | Edition                          | Demo school in the fragments          |
| ---------------- | -------------------------------- | ------------------------------------- |
| In Nigeria       | **NG**: JSS/SS, WAEC, terms, arms | Crestfield College, Ibadan            |
| Anywhere else    | **US**: Grades 9–12, GPA, quarters | Yellow View High School, Columbus     |

- Visitors outside Nigeria never see Nigerian content: no Crestfield, no WAEC,
  no switch to it.
- Visitors in Nigeria see Crestfield, with a quiet "See it in an American high
  school" link in the two-schools section, which is the proof that it fits
  others.
- Server-rendered, so crawlers get the US edition (they mostly crawl from the
  US) and nothing flickers. `?edition=ng|us` forces one for testing and for
  links you send.

Rules: no invented proof (quotes, logos, user counts). Every visual is a piece
of the real app filled with the demo school's data, labelled as a demo school.
**[confirm]** marks what needs the owner's answer before it goes live. Where a
line differs by edition, both are given; otherwise it is shared.

---

## 1. Header

Ellai · Help · Sign in · **Book a call**

## 2. Hero

# Run a school by asking.

Tell Ellai what you need. It sets the school up, builds the timetable, drafts
lesson notes, marks work and writes report cards. Your staff read it and decide
what goes out.

**Book a 20-minute call**
- **NG**: Free for your first term.
- **US**: Free for your first quarter.

_Fragment: the principal's home, with "Needs attention"._

- **NG**, Crestfield: 31 staff, 180 learners, 112 classes, 28 subjects.
  - Fatima Nwachukwu, SS2B, has missed three pieces of work
  - JSS3 Basic Science is two weeks behind on lesson notes
  - 14 report cards are waiting for a form teacher's comment
- **US**, Yellow View: 30 staff, 180 students, 96 classes, 58 courses.
  - [student from the Yellow View data], 10B, has missed three assignments
  - Grade 9 Physical Science is two weeks behind on lesson plans
  - 12 report cards are waiting for a homeroom teacher's comment

Caption: a demo school.

Line under the fragment:

- **NG**: Works to the NERDC curriculum, WAEC grading and three terms, or your
  own syllabus.
- **US**: Works to Common Core, NGSS and AP, quarters or semesters, letter
  grades and GPA, or your own syllabus.

## 3. Three ways in

## Talk to it, or click. Both work.

**The school's assistant.** On every page. It knows which class or student you
have open, so "who is struggling here?" is enough.

**Your own Claude or ChatGPT.** Connect it to the school in about two minutes.
It works with your permissions, and long jobs run on your subscription, not the
school's.

**The screens.** Whatever the assistant does appears at once, and anyone can
check it or change it by hand.

## 4. Instead of, just say

## An afternoon of forms is one sentence.

| Who       | Instead of                                   | Just say (NG)                                                              | Just say (US)                                                          | What you get                                                                                  |
| --------- | -------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Principal | Building the timetable period by period      | "Generate the timetable and show me the proposal."                         | same                                                                   | A week for every class with no clashes, on a grid, waiting for you to accept it.              |
| Principal | Opening every class to find who is behind    | "What needs my attention this week?"                                       | same                                                                   | A short list, with names and reasons.                                                         |
| Teacher   | Writing lesson notes class by class          | "Draft this week's lesson notes for SS1A Physics from the scheme of work." | "Draft this week's lesson plans for 9A Biology."                       | Drafts saved for you to read before anyone else sees them.                                    |
| Teacher   | Making a worksheet, then two easier versions | "Make a three-level worksheet on fractions for JSS1A."                     | "Make a three-level worksheet on linear equations for 9B Algebra I."   | Three papers. Each student gets the one that fits their marks.                                |
| Teacher   | Grading forty papers by hand                 | "Mark the SS1A Physics test."                                              | "Grade the 9A Biology quiz."                                           | Marks that quote the student's own words as evidence. Marks it is unsure of are flagged.      |
| Teacher   | Going through a student's marks one by one   | "How is Fatima doing? Make her a catch-up sheet."                          | "How is [student] doing? Make her a catch-up sheet."                   | What she has missed, where she slipped, and a draft resource for her alone.                   |

Each row opens to show its result as a fragment from the edition's school.
The NG edition says "learner" and "mark"; the US edition "student" and "grade".

## 5. The school year, start to finish

## From the first week to the report card.

**Set up once.**

- **NG**: "We are a secondary school, JSS1 to SS3, three arms, three terms,
  WAEC grading."
- **US**: "We are a high school, Grades 9 to 12, three homerooms, four
  quarters, letter grades with GPA, Honors and AP."

Ellai records it and tells you what is still missing.
_Fragment: the setup checklist, two items left._

**A timetable that knows your day.**

- **NG**: Assembly, eight 40-minute periods, two breaks and a short Friday.
  Option blocks in the senior years.
- **US**: Homeroom, seven 48-minute periods and lunch. An elective block where
  each student picks a course.

_Fragment: one week of SS2A (NG) or 11C (US)._

**Grading you can check.** Every mark shows why it was given. Nothing is
published until the teacher says so.
_Fragment: a gradebook row with one flagged mark._

**Report cards on time.**

- **NG**: WAEC grades, class positions and each teacher's comment, printed on
  A4.
- **US**: Letter grades, GPA weighted for Honors and AP, credits, and each
  teacher's comment, printed on Letter.

_Fragment: the top of a First Term (NG) or Quarter 1 (US) report card._

## 6. Students

## A tutor that won't do the homework.

**Their week on any phone.** Nothing to download. Add the school to the Home
Screen and it opens like an app.

**Help, not answers.** The assistant explains and asks questions. It does not
hand over the answer.

**No email needed.** Make accounts with a student ID and print sign-in cards
for the class. Form teachers can reset a password, and every reset is
recorded. _(NG edition only: in a US school every student has a school email,
so the US edition replaces this with "Their own grades, always current: every
course, the quarter's GPA, and what is due next.")_

**Feedback they can use.** Returned work shows the mark, the feedback and a
model answer. Missed work counts, so nothing slips by quietly.

_Fragment: phone frame with the week of Zainab Oyebode (NG) or Ava Hoffman,
with AP Biology in it (US)._

## 7. Trust

## Fast, but never unsupervised.

**Same person, same permissions.** The assistant, or a connected Claude or
ChatGPT, acts as the person signed in. A teacher asking for another teacher's
class is refused.

**Drafts first.** Notes, resources and marks are saved for a person to review.
Ellai does not publish marks, and it asks before anything that cannot be
undone.

**The data stays with the school.** Names and marks stay on the school's
server. A connected AI app calls the school's tools; it does not copy the data
out.

## 8. Your school's rules, not ours

## Your year, your grades, your words.

Year groups, terms, grading, the school day and what you call things are
settings, not code. A school changes its mind in a sentence.

Fragment: the settings sheet of the edition's school, short:

- **NG**: JSS1 to SS3 · Arms · Three terms · WAEC A1 to F9, pass 40 · Positions
  on · Africa/Lagos · A4
- **US**: Grade 9 to 12 · Homerooms · Four quarters · A to F, GPA on 4.0, Honors
  +0.5, AP +1.0 · America/New_York · Letter

**NG edition only**, under it: "The same code runs Yellow View High School in
Columbus, Ohio. See it" (switches the page to the US edition, `?edition=us`).

## 9. Questions

Accordion, closed by default.

**Do our teachers need to know about AI?**
No. They type what they want, or use the screens as they would any school
software.

**Do we have to use the assistant?**
No. Every screen works on its own.

**Can it follow our curriculum?**
Yes. It comes with **NG**: the NERDC and WAEC syllabuses / **US**: Common Core,
NGSS, C3, ACTFL and AP frameworks, and imports your own from a PDF or a photo
of the printed scheme.

**What does a pilot involve?**
Your first term (**US**: quarter) is free. We set the school up with you,
train the staff in one session, and check in every two weeks. We ask for honest
feedback.

**What does it cost after that?**
A licence per student, agreed before you commit. The assistant runs on the
school's own AI key, so you pay the AI provider directly for what you use, with
no markup. **[pricing not public yet]**

**Who owns the data?**
The school. You can export all of it at any time, and we delete it when you
leave. **[needs the export to exist first]**

## 10. Closing

## See your own school in it.

On the call we open a demo school, then show what yours would look like.

**Book a 20-minute call**

## 11. Footer

Ellai · Help · Sign in · Privacy (`/privacy`, drafted with the page)

---

## Booking (Cal.com)

The button opens the Cal.com popup; its script loads only on click. Event type:
"Ellai pilot call", 20 minutes. Questions:

- School name
- Your role
- Number of students
- Phone (WhatsApp in the NG edition)

Cal.com emails both sides. Its webhook writes each booking, reschedule and
cancellation to `pilot_bookings`, with the edition the visitor saw;
`list-pilot-bookings` lets the operator ask the agent about them.

## Open question

A visitor from the UK, Ghana or Kenya gets the US edition. Fine for now; a
third edition is a data file, not a redesign, once there is a third demo
school.
