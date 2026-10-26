import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Band, Grade 12, Quarter 1. National Core Arts Standards, Music, in the
 * school's own words. The senior band: audition and solo preparation, running
 * a rehearsal, concert logistics and program notes, leading a marching or pep
 * show, composing and arranging with technology, form and analysis, critical
 * listening to recordings and live concerts, and music in life after school.
 * No practicals.
 */

const w1: WeekInput = {
  topic: "Audition preparation: etudes, scales and a prepared sight-reading plan",
  note: `
## Objectives

Students will be able to:

1. play assigned parts with accurate pitch, rhythm and tone;
2. perform major and minor scales and an etude from memory for an audition;
3. sight-read a short passage at a steady tempo.

## Materials

Instruments, metronomes, audition etudes, a recording device, a sample audition rubric, the worksheet.

## Starter (6 minutes)

Ask: "What do you think a judge writes down in the first ten seconds of an audition?" Collect answers: tone, posture, tuning, confidence.

## Main activity

1. Audition format: scales (judges choose the key), a prepared etude or solo, and sight-reading. Show a sample rubric with points for tone, accuracy, rhythm, expression and sight-reading.
2. Prepare the etude in stages: slow tempo with metronome, mark breaths, work on difficult bars, add dynamics and phrasing, and record yourself weekly.
3. Sight-reading plan: ten seconds to scan, check key and time signature, find accidentals, set a tempo, and keep going.
4. Mock audition: each student plays eight bars of their etude for a partner who scores them using the rubric and writes one strength and one goal.

## Checking for understanding

Ask: "What do you do in the ten seconds of preparation before sight-reading?" (Scan the key, time signature, accidentals and tempo.)

## Exit ticket

Write three steps in your plan for preparing an etude.
`,
  reading: [
    "How to prepare for an audition and for the music in front of you",
    `
Many seniors audition for something: an all-state band, a college ensemble, a scholarship or a community group. An audition is a short performance judged by experts, and preparation is what makes the difference. A typical audition has three parts. First, **scales**: the judge may ask for any major or minor scale, so you must know them all. Second, a **prepared piece**, such as an **etude** (a study that focuses on a particular technique) or a solo. Third, **sight-reading**, a short piece you have never seen.

A rubric helps you see what judges listen for. Typical categories are **tone** (full, centered and steady), **accuracy** (correct notes and rhythms), **intonation** (in tune), **expression** (dynamics and phrasing) and **sight-reading** (steady tempo and correct notes). Each category carries points, so a weakness in one place can be balanced by a strength elsewhere.

Prepare your prepared piece in **stages**. Begin slowly with a metronome so that every note and rhythm is correct. Mark your breath places in pencil. Pick out the hardest four bars and work on them separately, slowing the tempo down and building up by four beats per minute at a time. When the notes are secure, add dynamics and phrasing, because these show musicianship. Finally, run the whole piece from start to finish, and **record yourself** every week. Listening to the recording shows problems that you cannot hear while playing. Keep your **practice log** to track progress and to plan the days before the audition.

For sight-reading, use a routine: spend ten seconds scanning the key and time signatures, accidentals, tempo markings, repeats and the hardest bar. Choose a tempo you can keep steady, and do not stop if you make a mistake. Judges hear many players and want to see that you can read confidently.

On the day, arrive early, warm up, and take a deep breath. Walk in with good posture, present your music, and play as you have prepared. Whether or not you are selected, an audition teaches you how to prepare, perform under pressure and learn from feedback.
`,
  ],
  cards: [
    ["Audition", "A short performance judged by experts to choose players for a group or award."],
    ["Etude", "A study piece that focuses on a particular technical skill."],
    ["Rubric", "A chart that lists categories and levels for scoring a performance."],
    ["Sight-reading", "Playing a piece you have not seen before."],
    ["Expression", "The dynamics and phrasing that make music musical."],
    ["Stages of preparation", "Learning slowly, working hard spots, adding expression and run-throughs."],
    ["Record yourself", "Making a recording to hear what you cannot hear while playing."],
    ["Musicianship", "Skill in shaping music with sensitivity and understanding."],
  ],
  closed: [
    [
      "Which is the first stage in preparing an etude?",
      [
        "Play it as fast as possible",
        "Learn it slowly with a metronome",
        "Add dynamics only",
        "Memorize it without looking",
      ],
      "B",
    ],
    [
      "What is an etude?",
      [
        "A type of audition room",
        "A study piece that focuses on a technical skill",
        "A kind of trumpet",
        "A concert program",
      ],
      "B",
    ],
    [
      "Why should you record yourself while preparing?",
      [
        "To use up time",
        "To hear problems you cannot hear while playing",
        "To avoid practicing",
        "To send to the judges",
      ],
      "B",
    ],
    [
      "If you make a mistake while sight-reading in an audition, you should:",
      [
        "Stop and start again",
        "Keep going at a steady tempo",
        "Walk out",
        "Ask the judge for a new piece",
      ],
      "B",
    ],
    [
      "A typical audition includes:",
      [
        "Only a prepared piece",
        "Scales, a prepared piece and sight-reading",
        "A written test only",
        "A group interview only",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe a four-week plan for preparing an audition etude, with a goal for each week.",
      scheme: [
        "Week 1 goal is learning notes and rhythms slowly with a metronome",
        "Week 2 goal is working the hard spots and raising the tempo gradually",
        "Week 3 goal is adding dynamics, phrasing and breaths",
        "Week 4 goal is complete run-throughs and recording, then reviewing",
      ],
      model:
        "Week 1: learn the notes and rhythms slowly with the metronome. Week 2: work the hardest bars and raise the tempo by four beats per minute at a time. Week 3: add dynamics, phrasing and breath marks. Week 4: play complete run-throughs, record them and review.",
      answers: [
        [
          "full",
          "[[0|Week 1: notes and rhythms, slow, with the metronome.]] [[1|Week 2: hard spots, and speed up four beats at a time.]] [[2|Week 3: dynamics and phrasing and where to breathe.]] [[3|Week 4: run it all the way through, record it and listen back.]]",
          "Full marks. The plan builds from accuracy to expression to performance.",
        ],
        [
          "full",
          "[[0|First week I make sure every note and rhythm is correct at a slow tempo.]] [[1|Second week I isolate the hardest four bars and bring up the tempo gradually.]] [[2|Third week I add expression.]] [[3|Fourth week I record complete run-throughs and fix what I hear.]]",
          "All four marks. The progression from slow to expressive to recorded is right.",
        ],
        [
          "partial",
          "[[0|Week 1 learn the notes.]] [[3|Week 4 record myself.]]",
          "Good first and last weeks. Fill in weeks 2 and 3: hard spots and tempo, then dynamics and phrasing.",
        ],
        [
          "partial",
          "[[2|Week 1 add dynamics.]] [[0|Week 2 learn the notes.]]",
          "Learn the notes first and add expression after, since dynamics cannot be shaped until the notes are secure.",
        ],
        [
          "weak",
          "Practice it a lot every day and it will be fine.",
          "A plan needs goals for each week: notes, hard spots, expression and run-throughs.",
        ],
        [
          "weak",
          "I will wait until the week of the audition to start.",
          "Waiting leaves no time to build accuracy and expression. Start early and work in stages.",
        ],
      ],
    },
    {
      prompt:
        "List the four things you would check in the ten seconds before sight-reading an audition passage, and explain why each helps.",
      scheme: [
        "Checks the key signature and says it prepares the sharps or flats",
        "Checks the time signature and says it sets the beat",
        "Looks for accidentals, repeats or the hardest bar",
        "Sets a tempo you can keep steady",
      ],
      model:
        "I check the key signature so I know which notes are sharp or flat, and the time signature so I know how to count. I look for accidentals, repeats and the hardest bar so there are no surprises. I choose a tempo that I can keep steady, because a steady tempo matters most.",
      answers: [
        [
          "full",
          "[[0|The key signature, so I know which notes have sharps or flats.]] [[1|The time signature, so I know how to count.]] [[2|Accidentals and the hardest bar, so there are no surprises.]] [[3|A tempo that I can keep steady all the way through.]]",
          "Full marks. Every check has a reason that connects to playing well.",
        ],
        [
          "full",
          "[[0|Key signature first so my fingers are ready.]] [[1|Then the time signature and I count one bar in my head.]] [[2|Then I scan for accidentals and repeats and find the hard bar.]] [[3|Last I pick a safe tempo.]]",
          "All four marks. Counting one bar in your head is a good habit.",
        ],
        [
          "partial",
          "[[0|Key signature.]] [[1|Time signature.]]",
          "The first two are right. Add the accidentals or hardest bar and the tempo, and explain why each helps.",
        ],
        [
          "partial",
          "[[3|Pick a fast tempo to impress the judges.]] [[0|Look at the key signature.]]",
          "Choose a tempo you can keep steady, not a fast one, since mistakes at a fast tempo hurt more.",
        ],
        [
          "weak",
          "I would just look at the first note.",
          "Look at the whole passage: key, time signature, accidentals and tempo. One note is not enough.",
        ],
        [
          "weak",
          "I would ask the judge for help with the notes.",
          "Judges want to hear if you can read independently. Use the ten seconds to prepare.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Running a rehearsal: planning, tempo, ensemble tuning and student conducting",
  note: `
## Objectives

Students will be able to:

1. follow a conductor's cues for tempo, dynamics and entrances;
2. balance and blend your sound with the other players in your section.

## Materials

A score, batons, a rehearsal plan template, a timer, the worksheet.

## Starter (6 minutes)

Ask: "If you were given 20 minutes to rehearse one piece with the band, how would you spend them?" Collect answers.

## Main activity

1. Rehearsal planning: set an objective, choose the sections of the music, assign time for each (for example 3 minutes warm-up, 10 minutes on a hard spot, 5 minutes on a run-through, 2 minutes of review).
2. Ensemble tuning: tune chords from the bottom up, with the bass first, then the middle voices, then the melody. Listen for beats and adjust.
3. Giving cues: practice with a conductor's pattern in 4/4 and 6/8, a clear preparatory beat, and a cue to a section.
4. Student conducting: each pair rehearses a four-bar passage with a section for three minutes. The observer notes one strength and one goal. Then switch.

## Checking for understanding

Ask: "Why do we tune chords from the bottom up?" (The bass is the foundation of the chord and the pitch that others tune to.)

## Exit ticket

Write a 20-minute rehearsal plan with time for each part.
`,
  reading: [
    "How to run a good rehearsal",
    `
Great bands are made in rehearsal, and rehearsals are only as good as their plan. As a senior, you may lead a sectional, a small ensemble or a part of the band's rehearsal. The first rule is to have an **objective**. State one thing the group will achieve by the end, for example "play measures 17 to 24 together at 100 beats per minute with the right dynamics." Then divide the time. In a twenty-minute rehearsal, you might spend 3 minutes on a warm-up and tuning, 10 minutes on the hardest spot, 5 minutes on a run-through, and 2 minutes reviewing what you fixed and what is left.

**Ensemble tuning** is more than matching a tuner. Chords are tuned from the **bottom up**: the bass voices first, because they set the foundation, then the middle voices, then the melody. Ask the group to hold a chord, listen for **beats**, the wobble that shows two pitches are slightly different, and make small adjustments until the beating slows or stops. Thirds in major chords usually need to be a little lower than a keyboard would play them, and fifths a little higher, which your ear will learn to find.

The conductor leads with clear **cues**. A cue is a signal to a section that its entrance is coming. Look at the section, give a **preparatory beat** in the tempo, and breathe with them. The pattern for 4/4 is down, in, out, up, and for 6/8 in two big beats, down and up, each divided into three. A clear pattern makes it easy for players to follow, and a clear face and eyes help even more.

When you **conduct** or lead, remember these habits. Keep your **instructions short** and **specific**: name the bar and the problem. Let the group **play more than you talk**. **Praise** what is right so that people keep doing it. End with a run-through, so the group leaves feeling successful. Ask a partner to note one strength and one goal for your leadership.

Every leader makes mistakes. The mark of a good one is that the group is better at the end of the session than at the start.
`,
  ],
  cards: [
    ["Objective", "What a rehearsal is meant to achieve."],
    ["Bottom-up tuning", "Tuning the bass first, then middle voices, then the melody."],
    ["Beats", "A wobbling sound that shows two pitches are slightly different."],
    ["Cue", "A signal to a section that its entrance is coming."],
    ["Preparatory beat", "A gesture before the first note that shows tempo and breath."],
    ["Run-through", "Playing a passage or piece from start to finish."],
    ["Sectional", "A rehearsal for one section of the band."],
    ["Specific instruction", "Directions that name the bar and the problem."],
  ],
  closed: [
    [
      "In ensemble tuning, which voices do you tune first?",
      ["The melody", "The bass", "The percussion", "The middle voices"],
      "B",
    ],
    [
      "Which is the best instruction from a student leader?",
      [
        "Play better",
        "Clarinets, bar 12 is rushing, so try it at 80 with the metronome",
        "Be quiet",
        "That was wrong",
      ],
      "B",
    ],
    [
      "In a 20-minute rehearsal, which is the best use of the largest block of time?",
      [
        "The warm-up",
        "The hardest spot",
        "Talking",
        "The end of the piece only",
      ],
      "B",
    ],
    [
      "A cue to a section should include:",
      [
        "Looking at the section and a preparatory beat",
        "Looking at the floor",
        "A shout",
        "No gesture",
      ],
      "A",
    ],
    [
      "Why should a student conductor let the group play more than they talk?",
      [
        "Music is made by playing",
        "Talking is rude",
        "They are tired",
        "The director says so",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Write a 20-minute rehearsal plan for a band section with an objective and a time for each activity. Explain why you allotted the most time to one part.",
      scheme: [
        "States a specific objective",
        "Lists activities with times that total 20 minutes",
        "Gives the most time to the hardest spot",
        "Explains why the hardest spot needs the most time",
      ],
      model:
        "Objective: play measures 17 to 24 together at 100 beats per minute. Plan: 3 minutes warm-up and tuning, 10 minutes on measures 17 to 24 using find, fix, drill, 5 minutes run-through of the section, 2 minutes review. The hardest spot gets 10 minutes because problems need slow repetition to fix.",
      answers: [
        [
          "full",
          "[[0|Objective: measures 17 to 24 together at 100 beats per minute.]] [[1|3 minutes warm up and tune, 10 minutes on 17 to 24, 5 minutes run-through, 2 minutes review, total 20.]] [[2|The most time goes to measures 17 to 24.]] [[3|That is the hardest spot and needs slow repetition to fix.]]",
          "Full marks. The times add up and the reasoning is sound.",
        ],
        [
          "full",
          "[[0|Objective: the whole section plays the trio in tune and in time.]] [[1|Tune 4, hard spot 9, run-through 5, review 2.]] [[2|Hard spot gets the most time.]] [[3|Fixing a problem takes slow practice more than playing through.]]",
          "All four marks. Your total is 20 and the reasoning is clear.",
        ],
        [
          "partial",
          "[[0|Objective: play the trio better.]] [[1|Warm up 5, hard part 10, play 5.]]",
          "Better is vague, so give a measurable objective. The times add up. Explain why the hard part gets the most time.",
        ],
        [
          "partial",
          "[[1|Warm up 3, hard spot 10, run through 5, review 2.]] I just chose those.",
          "The times are good. Add a specific objective and say why the hard spot has the most time.",
        ],
        [
          "weak",
          "Play the whole piece four times through.",
          "Playing through does not fix specific problems. Plan time for the hardest spot.",
        ],
        [
          "weak",
          "I would talk for 15 minutes about the piece and play for 5.",
          "Musicians learn by playing. Give most of the time to playing and fixing problems.",
        ],
      ],
    },
    {
      prompt:
        "Explain why a band tunes a chord from the bottom up, and describe how you would use beats to adjust your pitch.",
      scheme: [
        "Says the bass is the foundation of the chord",
        "Says the other voices tune to the bass",
        "Describes beats as a wobble when pitches differ",
        "Says to adjust until the wobble slows or stops",
      ],
      model:
        "The bass is the foundation of a chord, so the other voices tune to it, starting from the bottom. Beats are the wobble you hear when two pitches differ slightly. I would adjust my pitch until the wobble slows down or stops.",
      answers: [
        [
          "full",
          "[[0|The bass is the foundation of the chord.]] [[1|The middle voices and the melody tune to it.]] [[2|Beats are a wobble when two pitches are a little different.]] [[3|I adjust until the wobble slows down or stops.]]",
          "Full marks. The explanation connects the order of tuning to the sound.",
        ],
        [
          "full",
          "[[0|The low notes set the base for everything above.]] [[1|So we tune the others to the bass first.]] [[2|If two pitches are close I hear a wavering sound, the beats.]] [[3|I move my slide or tuning until the wavering gets slower and stops.]]",
          "All four marks. Your own wording makes it very clear.",
        ],
        [
          "partial",
          "[[0|The bass is the foundation.]] [[2|Beats are a wobble.]]",
          "Add that the other voices tune to the bass and that you adjust until the wobble slows or stops.",
        ],
        [
          "partial",
          "[[3|I adjust until the wobble stops.]] We tune the melody first so people can hear it.",
          "The adjusting is right. Tune from the bottom up, not the melody first, because the bass is the foundation.",
        ],
        [
          "weak",
          "Beats are the drum beats in a song.",
          "In tuning, beats are a wobbling sound that happens when two pitches are slightly different.",
        ],
        [
          "weak",
          "We tune from the top because high notes are easier to hear.",
          "High notes are easier to hear but the bass is the foundation, so the other voices tune to it.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Concert logistics, program notes and performance health",
  note: `
## Objectives

Students will be able to:

1. perform with correct posture, breath support and instrument care;
2. prepare for a concert, including a warm-up routine and a rehearsal plan.

## Materials

Sample program notes, a concert logistics checklist, a calendar, the worksheet.

## Starter (6 minutes)

Pass around a sample concert program. Ask: "What information is on it? What would you add?"

## Main activity

1. Logistics: the stage plan (seating chart), risers, chairs, stands, percussion set-up, lighting and sound check, call times, transportation for instruments, and a backup plan for a missing player.
2. Program notes: a paragraph for the audience about a piece, including the composer, the year, the style and one thing to listen for. Write a draft for one piece.
3. Performance health: warm-up and cool-down, hearing protection for percussion, posture, taking breaks, and managing nerves with breathing.
4. A final rehearsal plan: three rehearsals before the concert with an objective for each.

## Checking for understanding

Ask: "What belongs in a program note?" (Composer, year, style, something to listen for.)

## Exit ticket

Write two sentences of a program note for a piece we are rehearsing.
`,
  reading: [
    "Planning the day, writing for the audience and keeping yourself healthy",
    `
A concert looks smooth because many people have planned the details. Seniors often help with the **logistics**, the practical arrangements. The **stage plan** is a seating chart that shows where each section sits, usually with the woodwinds in front, the brass behind, and the percussion at the back, so that the sound blends and everyone can see the conductor. You also need risers, chairs, stands and percussion equipment. A **sound check** tests the stage and the room before the audience arrives. A **call time** tells each person when to arrive, usually an hour before the performance, with extra time for the percussion to set up. Plan transportation for large instruments and a **backup plan** for emergencies such as a missing player or a broken stand.

The audience will enjoy the music more if they know something about it. A **program note** is a short paragraph, usually 50 to 100 words, that tells the audience about a piece. It includes the **composer**, the **year** or period, the **style** or story behind the piece, and **one thing to listen for**, such as "listen for the trumpet melody to return in the final minute." Write in plain, friendly language without jargon, and check your facts. A good program note makes listeners curious.

Performers must look after their own health. Begin with a **warm-up** and end with a **cool-down**, a few minutes of slow, easy playing. Percussionists and others in loud sections should consider **hearing protection**, such as musicians' earplugs, which lower the volume without ruining the sound. Keep a good **posture**, take breaks to rest tired muscles, and do not ignore pain. Nerves are normal before a concert. Slow breathing, in for four counts and out for six, calms the body. Focus on the music, not on fear of mistakes.

Finally, plan your rehearsals backward. Three rehearsals before the concert might be: a **section rehearsal** to fix problems, a **full run-through** with the whole program, and a **dress rehearsal** in concert clothes and stage setup. Each has an objective.

A concert is a team effort, and every person from the conductor to the stage crew has a role.
`,
  ],
  cards: [
    ["Logistics", "The practical arrangements for an event."],
    ["Stage plan", "A seating chart showing where each section sits."],
    ["Sound check", "A test of the stage and sound before the audience arrives."],
    ["Call time", "The time performers must arrive."],
    ["Program note", "A short paragraph telling the audience about a piece."],
    ["Cool-down", "Slow, easy playing after a performance or rehearsal."],
    ["Hearing protection", "Earplugs or other protection that lowers volume safely."],
    ["Dress rehearsal", "A full rehearsal in concert dress and stage setup."],
  ],
  closed: [
    [
      "What belongs in a program note?",
      [
        "The composer, the year, the style and something to listen for",
        "The score of the football game",
        "A list of every player's phone number",
        "A quiz",
      ],
      "A",
    ],
    [
      "A stage plan shows:",
      [
        "The seating of each section",
        "The audience's names",
        "The price of tickets",
        "The weather",
      ],
      "A",
    ],
    [
      "Why might a percussionist use musicians' earplugs?",
      [
        "To lower the volume safely without ruining the sound",
        "To avoid listening to the director",
        "To sleep",
        "To hear less of the melody",
      ],
      "A",
    ],
    [
      "What is a good way to calm nerves before performing?",
      [
        "Slow breathing, in for four and out for six",
        "Skipping the warm-up",
        "Playing very fast",
        "Not eating or drinking all day",
      ],
      "A",
    ],
    [
      "A dress rehearsal is:",
      [
        "A fashion show",
        "A full rehearsal in concert clothes and stage setup",
        "The first rehearsal",
        "A rehearsal for the audience",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a program note of about 50 words for a piece the band is rehearsing. Include the composer, the year or period, the style, and one thing to listen for.",
      scheme: [
        "Names the composer",
        "Gives the year or period",
        "Describes the style or the story behind the piece",
        "Gives one thing for the audience to listen for",
      ],
      model:
        "John Philip Sousa wrote The Stars and Stripes Forever in 1896. It is an American march, bright and lively, and is the national march of the United States. Listen for the piccolo's high, soaring obbligato in the final section, played over the full band.",
      answers: [
        [
          "full",
          "[[0|John Philip Sousa]] wrote [[1|The Stars and Stripes Forever in 1896]]. [[2|It is a bright American march meant for parades.]] [[3|Listen for the piccolo flying over the band in the last section.]]",
          "Full marks. A friendly note with a detail that the audience can listen for.",
        ],
        [
          "full",
          "[[0|Gustav Holst]] composed his First Suite in E-flat [[1|in 1909]]. [[2|It is an early serious work for wind band and is built on a few simple ideas.]] [[3|Listen for the opening theme and how it comes back in each movement.]]",
          "All four marks. Noticing the returning theme is a very useful listening tip.",
        ],
        [
          "partial",
          "[[0|Sousa]] [[1|1896]] [[2|march]].",
          "These are the right facts but a program note is a short paragraph. Write it in sentences and add something to listen for.",
        ],
        [
          "partial",
          "[[2|This is a lively march.]] [[3|Listen for the trumpets.]]",
          "Add the composer and the year, and name what the trumpets do so the audience knows what to listen for.",
        ],
        [
          "weak",
          "This piece is hard and we practiced a lot.",
          "A program note is for the audience. Tell them about the composer, the style and something to listen for.",
        ],
        [
          "weak",
          "Please do not clap until the end because the conductor is serious.",
          "A program note introduces the music. Etiquette instructions belong elsewhere. Include the composer, year, style and a listening tip.",
        ],
      ],
    },
    {
      prompt:
        "Plan three rehearsals before a concert, giving an objective for each, and describe two ways you will look after your health as a performer.",
      scheme: [
        "Gives an objective for a first rehearsal, such as a sectional to fix problems",
        "Gives an objective for a second rehearsal, such as a full run-through",
        "Gives an objective for a third rehearsal, such as a dress rehearsal",
        "Describes two health habits, such as warm-up, breaks, posture or hearing protection",
      ],
      model:
        "Rehearsal 1: a sectional to fix the hardest passages. Rehearsal 2: a full run-through of the program with no stops. Rehearsal 3: a dress rehearsal in concert clothes with the stage setup. For my health I will warm up and cool down, and take short breaks to rest my muscles.",
      answers: [
        [
          "full",
          "[[0|1: sectionals to fix the hard passages.]] [[1|2: a full run-through of the whole program.]] [[2|3: a dress rehearsal in concert clothes on the stage.]] [[3|I will warm up and cool down and take breaks so I do not strain myself.]]",
          "Full marks. The rehearsals build from fixing to running to performing.",
        ],
        [
          "full",
          "[[0|Rehearsal one: fix the trouble spots in sections.]] [[1|Rehearsal two: play the full program and record it.]] [[2|Rehearsal three: dress rehearsal with the stage plan and lights.]] [[3|I will stay hydrated and use good posture with breaks.]]",
          "All four marks. Recording the run-through is a clever addition.",
        ],
        [
          "partial",
          "[[0|Fix problems.]] [[1|Run through.]] [[2|Dress rehearsal.]]",
          "The three rehearsals are right. Give each an objective, and add two health habits.",
        ],
        [
          "partial",
          "[[3|Warm up and take breaks.]] I will rehearse every day.",
          "Good health habits. Name an objective for each of the three rehearsals before the concert.",
        ],
        [
          "weak",
          "Three rehearsals playing the same way.",
          "Each rehearsal should have a different purpose: fix problems, run through, and dress rehearsal.",
        ],
        [
          "weak",
          "I do not need a health plan because I am young.",
          "Even young players can strain muscles or damage their hearing. Warm-ups, breaks and good posture help.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Leading a show: drum major, student leadership and a year-long plan",
  note: `
## Objectives

Students will be able to:

1. perform in marching band or pep band with correct formation and movement;
2. keep a practice log and set goals for improvement.

## Materials

Drill charts, a sample leadership application, practice logs, the quiz.

## Starter (6 minutes)

Ask: "What makes someone a good leader in a group when they are not the oldest or the best player?" Collect answers on the board.

## Main activity

1. Drum major and section leader roles: conducting from the podium, teaching drill, checking uniforms and equipment, giving feedback, and setting an example.
2. A drill review: a 16-count move of 32 yards. Calculate steps and step size (8 to 5 gives 51.2 steps, so use 6 to 5 which gives 38.4, or change the distance). Discuss that some moves need a different step size.
3. Teaching a skill: pairs plan how to teach a new marching move to younger players in three steps (show, explain, practice), and give feedback.
4. A year-long plan: write a goal for each quarter of the school year, with a measurable target for this quarter.

## Checking for understanding

Ask: "What are three ways to teach a skill?" (Show, explain, practice, and give feedback.)

## Exit ticket

Write one goal for this quarter and one for the year.
`,
  reading: [
    "Leading others, teaching a skill and planning a year",
    `
In your last year of band, you are one of the people who set the tone. A good leader does not have to be the best player or the loudest voice. A good leader is **reliable**, **kind** and **clear**. In a marching band, the **drum major** conducts from a podium, gives the start and stop signals, and keeps the tempo. **Section leaders** and **squad leaders** teach the drill, check uniforms and equipment, and give feedback. All leaders **set an example**, by being on time, prepared and positive, because younger players imitate what they see.

When you teach a skill, use three steps. First **show** the move correctly, at full tempo. Second **explain** the key points, such as posture, step size and where to look. Third let learners **practice** while you watch, and give **feedback** that is short, specific and kind: "Good step size, now keep your horns up." Then repeat. People learn faster when they have a chance to try and are praised for what they do right.

Planning a show also takes math. A move of 32 yards at 8 to 5 takes 32 ÷ 5 × 8 = 51.2 steps, which is not a whole number, so the designer might use a different step size or adjust the distance. At 6 to 5 the same move takes 32 ÷ 5 × 6 = 38.4 steps. A sensible approach is to change the move to 30 yards, which takes 48 steps at 8 to 5 and 36 at 6 to 5, both whole numbers. Leaders check these numbers so that every player arrives on the right count.

Long-term growth needs a **plan**. A year is nine months, and a single goal will not carry you through. Break it down by quarter. A senior who wants to audition for a college band might set these goals: in the first quarter, to prepare the audition scales and an etude to a basic standard; in the second quarter, to record and send the audition; in the third quarter, to improve the performance based on feedback; and in the fourth quarter, to help the younger players learn the next year's show. For each quarter, choose a **measurable target**, such as "play two-octave scales in all keys at 112 beats per minute."

Keep your **practice log** and review it each week. At the end of the quarter, write a short reflection about what worked and what to change. Leaders learn from their own plans as well as their teams'.
`,
  ],
  cards: [
    ["Drum major", "The student conductor of a marching band."],
    ["Section leader", "A student who helps a section learn and perform."],
    ["Set an example", "Show the behavior you want others to follow."],
    ["Show, explain, practice", "Three steps for teaching a skill."],
    ["Feedback", "Short, specific and kind comments on performance."],
    ["Step size", "The ratio of steps to yards, such as 8 to 5 or 6 to 5."],
    ["Quarter goal", "A goal for one nine-week period."],
    ["Reflection", "Thinking about what worked and what to change."],
  ],
  closed: [
    [
      "Which are the three steps for teaching a skill?",
      [
        "Show, explain, practice",
        "Wait, watch, leave",
        "Talk, talk, talk",
        "Test, grade, repeat",
      ],
      "A",
    ],
    [
      "How many steps does a 30-yard move take at 8 to 5?",
      ["36", "42", "48", "60"],
      "C",
    ],
    [
      "Which is the best leader behavior?",
      [
        "Being late because you are important",
        "Being on time, prepared and positive",
        "Ignoring younger players",
        "Playing only your own part",
      ],
      "B",
    ],
    [
      "Which is a measurable quarter target?",
      [
        "Get better",
        "Play two-octave scales in all keys at 112 beats per minute",
        "Try hard",
        "Be famous",
      ],
      "B",
    ],
    [
      "Good feedback to a younger player is:",
      [
        "That was wrong",
        "Good step size, now keep your horns up",
        "I could do that better",
        "Stop playing",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A 32-yard move is planned at 8 to 5. Calculate the number of steps, say why it is a problem, and suggest a change.",
      scheme: [
        "Calculates 32 divided by 5 times 8 = 51.2 steps",
        "Says that the result is not a whole number, so players cannot all arrive together",
        "Suggests changing the distance, such as 30 yards or 35 yards, or the step size",
        "Gives the new number of steps, such as 48 steps for 30 yards",
      ],
      model:
        "32 ÷ 5 × 8 = 51.2 steps. That is not a whole number, so the players cannot all finish exactly on a count. I would change the move to 30 yards, which takes 6 × 8 = 48 steps at 8 to 5.",
      answers: [
        [
          "full",
          "[[0|32 / 5 is 6.4 and 6.4 × 8 = 51.2 steps.]] [[1|You cannot take 0.2 of a step so people would not all end together.]] [[2|I would change the move to 30 yards.]] [[3|30 yards is 6 × 8 = 48 steps.]]",
          "Full marks. Spotting the decimal as the problem is the key idea.",
        ],
        [
          "full",
          "[[0|8 to 5 means 32 × 8/5 = 51.2 steps.]] [[1|A fraction of a step is not possible on a count.]] [[2|Change it to 35 yards or to 30 yards.]] [[3|35 yards is 56 steps, 30 yards is 48 steps.]]",
          "All four marks. Giving two options for the change shows flexibility.",
        ],
        [
          "partial",
          "[[0|51.2 steps.]] [[1|It is not a whole number.]]",
          "The calculation and the problem are right. Suggest a change and give the new number of steps.",
        ],
        [
          "partial",
          "[[2|Change it to 30 yards.]] 30 yards is 40 steps.",
          "Changing the distance is a good idea. At 8 to 5, 30 yards is 6 groups of 5 yards, so 6 × 8 = 48 steps.",
        ],
        [
          "weak",
          "32 steps because it is 32 yards.",
          "A step is not a yard. The step size depends on the ratio, so divide by 5 and multiply by 8.",
        ],
        [
          "weak",
          "Round 51.2 to 51 and the players will be fine.",
          "If the move uses 51 steps but the counts are for 52, the group will be out of step. Change the distance so that the steps are a whole number.",
        ],
      ],
    },
    {
      prompt:
        "Write a quarter goal and a weekly goal for yourself as a senior leader, and describe how you would teach one skill to a younger player.",
      scheme: [
        "States a measurable quarter goal",
        "States a weekly goal that leads to it",
        "Describes teaching in steps: show, explain, practice",
        "Mentions giving specific and kind feedback",
      ],
      model:
        "Quarter goal: play all two-octave scales at 112 beats per minute. Weekly goal: learn three new keys each week. To teach a marching move, I would show it at full tempo, explain posture and step size, and let the player practice while I give short, specific, kind feedback.",
      answers: [
        [
          "full",
          "[[0|Quarter goal: all my major scales for two octaves at 112.]] [[1|Weekly goal: three new keys each week.]] [[2|To teach a skill I would show it, explain the key points and let them practice.]] [[3|I would give short feedback that says what they did right and what to fix.]]",
          "Full marks. Both goals are measurable and the teaching steps are complete.",
        ],
        [
          "full",
          "[[0|By the end of the quarter I will have my audition etude memorized at tempo.]] [[1|This week I will memorize four lines.]] [[2|With a freshman I would demonstrate, explain and have them try.]] [[3|My feedback would be kind and specific.]]",
          "All four marks. Memorizing a fixed number of lines per week is a good weekly target.",
        ],
        [
          "partial",
          "[[0|My quarter goal is to play my scales at 112.]] [[2|I would show them how to do it.]]",
          "Add a weekly goal and the other teaching steps, explain and practice, plus feedback.",
        ],
        [
          "partial",
          "[[1|Weekly: three keys.]] [[3|Give kind feedback.]]",
          "Add a quarter goal and the first teaching steps: show, explain and practice.",
        ],
        [
          "weak",
          "My goal is to be the best leader.",
          "Name a measurable target. Being best cannot be checked.",
        ],
        [
          "weak",
          "I would tell the younger player what to do and walk away.",
          "Teaching needs showing, explaining, letting them practice and giving feedback.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Composing and arranging with notation software and a rhythm section",
  note: `
## Objectives

Students will be able to:

1. compose or improvise a short melody using a given scale;
2. arrange a simple phrase for your instrument by changing rhythm or dynamics;
3. read and interpret key signatures, time signatures and musical terms.

## Materials

Computers with notation software, headphones, a recording of a short band arrangement, the problem set.

## Starter (6 minutes)

Play a short melody in a major key and then the same melody in minor. Ask: "What happened to the mood?"

## Main activity

1. Composing for band: write an eight-bar melody in B-flat or E-flat major, with a clear question and answer, and add a simple chord line (I, IV, V) in the low brass.
2. Notation software: enter notes, choose the key and time signatures, add dynamics and articulation, and play it back. Check ranges: the flute plays comfortably from C4 to C7, the trumpet from written F-sharp 3 to written C6, the tuba much lower.
3. Transposition: a B-flat trumpet part is written a whole step higher than it sounds. If the concert note is B-flat, the trumpet reads C.
4. Arranging: give the melody to different instruments in each phrase, and change the dynamics to build to a climax.

## Checking for understanding

Ask: "What note does a B-flat clarinet read when the concert pitch is E-flat?" (F.)

## Exit ticket

Write the transposed note a B-flat trumpet reads for a concert G.
`,
  reading: [
    "Writing for the band and using technology to hear it",
    `
When you write music for a band, you are composing for a group of instruments that each have their own character, range and transposition. A strong way to begin is the same as before: an eight-bar melody in a comfortable key with a **question and an answer phrase**, supported by simple **chords**. In B-flat major, give the low brass the roots of the I, IV and V chords, which are B-flat, E-flat and F, and let the woodwinds play the melody.

**Notation software** such as MuseScore or Noteflight makes it possible to enter music, hear it played back and print the parts. You set the **key signature** and **time signature**, enter the notes, and add **dynamics** and **articulations**. Software playback is a useful check, but it is not a performance. It does not breathe, and it does not know that a trombone cannot play a note that is too high. A good arranger also uses their own knowledge.

Every instrument has a **range**, the span of notes that it can play comfortably. A flute plays well from middle C upward for about three octaves. A trumpet's comfortable range runs from the F-sharp below middle C written to about the C two octaves above middle C written. A tuba plays much lower. Writing notes outside an instrument's range is a common error. Always check.

Many band instruments are **transposing**. A **B-flat trumpet** or **B-flat clarinet** sounds a whole step lower than written: when the player reads C, the sounding pitch is B-flat. To write a part for a B-flat instrument, **add a whole step** to the concert pitch. If the concert note is G, the B-flat trumpet reads A. For an E-flat alto saxophone, the written note is a major sixth above the concert pitch. The score may show either concert pitch or the transposed parts, so always check the label.

**Arranging** means giving the same melody a new color. Try giving the first phrase to the clarinets, the second to the trumpets, and the final phrase to the full band at a higher dynamic. Build to a **climax** with a crescendo and a rise in pitch, then relax.

The skills of composing and arranging make you a more thoughtful player, because you start to see why the composer made each choice.
`,
  ],
  cards: [
    ["Notation software", "A computer program for writing and playing back music."],
    ["Range", "The span of notes an instrument can play comfortably."],
    ["Transposing instrument", "An instrument whose written notes sound at a different pitch."],
    ["B-flat trumpet", "A trumpet that sounds a whole step lower than written."],
    ["Concert pitch", "The actual sounding pitch."],
    ["Arrange", "To adapt music for different instruments or a new style."],
    ["Climax", "The high point of a piece or phrase."],
    ["Roots of chords", "The bottom note of each chord, played by bass instruments."],
  ],
  closed: [
    [
      "A B-flat trumpet reads C. What concert pitch sounds?",
      ["C", "B-flat", "D", "A"],
      "B",
    ],
    [
      "A concert G is sounded. What does a B-flat trumpet read?",
      ["F", "G", "A", "B-flat"],
      "C",
    ],
    [
      "Why must you check an instrument's range when arranging?",
      [
        "So the notes are playable",
        "To make the part louder",
        "To make it longer",
        "It is not needed",
      ],
      "A",
    ],
    [
      "Notation software playback is useful but:",
      [
        "It is a real performance",
        "It does not breathe or know instrument limits",
        "It is never correct",
        "It replaces the band",
      ],
      "B",
    ],
    [
      "A good way to build a climax is to:",
      [
        "Play everything at one volume",
        "Add a crescendo and a rise in pitch",
        "Stop playing",
        "Slow down and get softer",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Transpose this concert-pitch melody for B-flat trumpet: B-flat, C, D, E-flat, F. Show the written notes and explain how you transposed them.",
      scheme: [
        "Transposes B-flat to C",
        "Transposes C to D and D to E",
        "Transposes E-flat to F and F to G",
        "Explains that the written part is a whole step above the concert pitch",
      ],
      model:
        "The B-flat trumpet reads a whole step above the sound, so the written notes are C, D, E, F, G. I transposed by adding a whole step to each concert note.",
      answers: [
        [
          "full",
          "[[0|B-flat to C,]] [[1|C to D, D to E,]] [[2|E-flat to F, F to G.]] [[3|The trumpet reads a whole step higher than the concert pitch, so I added a whole step to each note.]]",
          "Full marks. Every note and the rule are correct.",
        ],
        [
          "full",
          "[[0|Written: C]] [[1|D E]] [[2|F G]]. [[3|I raised each concert note by a whole step because the trumpet sounds a whole step below what it reads.]]",
          "All four marks. Explaining which direction the whole step goes is the key point.",
        ],
        [
          "partial",
          "[[0|C]] [[1|D, E]] [[2|F, G]]. I did it by guessing.",
          "The notes are right. Explain the method: add a whole step to each concert pitch.",
        ],
        [
          "partial",
          "[[0|C]] D, E, F, G. I lowered them.",
          "The notes are right but you raised them, not lowered. A B-flat trumpet reads higher than it sounds.",
        ],
        [
          "weak",
          "The notes are the same because trumpets play the same notes as the flutes.",
          "The trumpet is a transposing instrument, so its written notes are a whole step above the sound.",
        ],
        [
          "weak",
          "A, B, C, D, E.",
          "You went down a whole step. For a B-flat trumpet you add a whole step, not subtract it.",
        ],
      ],
    },
    {
      prompt:
        "Explain how you would arrange an eight-bar melody to build to a climax, naming three techniques and which instruments you would use for each phrase.",
      scheme: [
        "Names a technique, such as a crescendo",
        "Names a second technique, such as rising pitch or adding instruments",
        "Assigns instruments to phrases, such as clarinets first and full band at the end",
        "Says the climax is followed by relaxation or a quieter ending",
      ],
      model:
        "I would give the first phrase to the clarinets at piano, add a crescendo through the second phrase, raise the pitch and add the trumpets, and give the last phrase to the full band at forte. After the climax I would relax the dynamic at the cadence.",
      answers: [
        [
          "full",
          "[[0|Use a crescendo through the phrases.]] [[1|Raise the pitch and add more instruments each phrase.]] [[2|Clarinets play the first phrase, trumpets join in the second and the full band plays the last.]] [[3|After the climax I would soften the ending.]]",
          "Full marks. Each technique and the instrument plan are clear.",
        ],
        [
          "full",
          "[[0|Start soft and get louder.]] [[1|Make the melody higher on the repeat and add the brass.]] [[2|Flutes start, trumpets join and then everybody.]] [[3|End with a gentle cadence.]]",
          "All four marks. Starting small and adding forces is how climaxes are built.",
        ],
        [
          "partial",
          "[[0|A crescendo.]] [[2|Clarinets and then the whole band.]]",
          "Add a second technique, such as rising pitch, and say how the arrangement ends.",
        ],
        [
          "partial",
          "[[1|Higher notes.]] [[3|A quiet end.]]",
          "Add a crescendo and say which instruments play each phrase.",
        ],
        [
          "weak",
          "Play it as loud as possible from the start.",
          "A climax needs build-up. Start softer and grow in volume, pitch and instruments.",
        ],
        [
          "weak",
          "Put every instrument on every note.",
          "A thick texture all the time leaves no room for a climax. Add instruments gradually.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Analyzing form: sonata and rondo ideas, and a self-evaluation of the band",
  note: `
## Objectives

Students will be able to:

1. identify and describe the form of a piece of band music;
2. evaluate a recording of the band's performance using a rubric.

## Materials

A recording and score of a band piece with a clear form, an analysis worksheet, a detailed rubric, the worksheet.

## Starter (6 minutes)

Ask: "How can a piece of music have a beginning, a middle and an end without any words?" Collect answers.

## Main activity

1. Analyzing form: label sections with letters, mark key changes, and describe how themes return. Introduce sonata form: exposition (two themes), development (themes changed), recapitulation (themes return in the home key).
2. Rondo vs. sonata: compare how the main theme returns in each.
3. Self-evaluation: listen to a recording from the last concert. Use the rubric for tone, intonation, rhythm, dynamics, balance, articulation, precision and musicality. Compare your score with a partner's and discuss differences.
4. Reflection: write a paragraph on what the band improved since September and one challenge for the rest of the year.

## Checking for understanding

Ask: "What are the three parts of sonata form?" (Exposition, development, recapitulation.)

## Exit ticket

Write one sentence about the form of a piece we are rehearsing.
`,
  reading: [
    "Sonata form and honest self-evaluation",
    `
In your last year of band you can use a fuller vocabulary of **form**. A **rondo** (A-B-A-C-A) keeps coming back to its main theme, like a refrain in a song. **Sonata form** is the pattern that composers used for many first movements of symphonies and sonatas. It has three parts. In the **exposition**, two contrasting themes are introduced, the first in the home key and the second in a related key. In the **development**, the composer takes pieces of those themes and changes them, moving through new keys and building tension. In the **recapitulation**, both themes return, and this time they are both in the home key, which gives a feeling of resolution. Many band works use these ideas, even if they are not strict sonatas.

To **analyze** a piece, listen with a score if you have one. Label the sections with letters. Mark key changes and tempo changes. Ask: where does the main theme appear? Where does it change? Where does the music reach its high point and where does it come to rest? Write a sentence or two that describes the form in your own words. A good analysis helps you shape a performance because you can see the large plan, not just the next measure.

Seniors can also evaluate their band honestly. Use a **detailed rubric**, with categories such as **tone**, **intonation**, **rhythm**, **dynamics**, **balance**, **articulation**, **ensemble precision** and **musicality** (the shape and feeling of the phrases). Score each from 1 to 4 and write one sentence of **evidence**. Then compare your scores with a partner. If you disagree, discuss why, and listen again for the specific spots. Disagreement is useful, because it shows you hear things differently and sharpens your listening.

End with a **reflection**. Write what the band has improved since September, with an example, and what the band's biggest challenge is for the rest of the year. A reflection that is honest and specific helps the whole group improve.

The point of analysis and evaluation is not to criticize, but to make the next performance better than the last.
`,
  ],
  cards: [
    ["Sonata form", "A form with exposition, development and recapitulation."],
    ["Exposition", "The part of sonata form where the themes are first introduced."],
    ["Development", "The part where themes are changed and moved through new keys."],
    ["Recapitulation", "The part where the themes return in the home key."],
    ["Rondo", "A form in which the main theme returns, as in A-B-A-C-A."],
    ["Musicality", "The shape and feeling of the phrases in a performance."],
    ["Analysis", "A careful study of how a piece is built."],
    ["Reflection", "Thinking about what has improved and what is next."],
  ],
  closed: [
    [
      "What are the three parts of sonata form?",
      [
        "Introduction, middle, end",
        "Exposition, development, recapitulation",
        "Verse, chorus, bridge",
        "Theme, variation, coda",
      ],
      "B",
    ],
    [
      "In the recapitulation, the themes usually return:",
      [
        "In a distant key",
        "In the home key",
        "Only in minor",
        "Not at all",
      ],
      "B",
    ],
    [
      "Which is a good reason to compare your rubric scores with a partner?",
      [
        "To argue",
        "It shows you hear things differently and sharpens your listening",
        "To cheat",
        "To change the recording",
      ],
      "B",
    ],
    [
      "Which form is A-B-A-C-A?",
      ["Sonata", "Rondo", "Binary", "Variations"],
      "B",
    ],
    [
      "A good reflection is:",
      [
        "Honest and specific",
        "Short and vague",
        "Only about others",
        "About the weather",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain the three parts of sonata form and describe what happens to the themes in each.",
      scheme: [
        "Describes the exposition with two contrasting themes",
        "Describes the development as themes changed and moved through keys",
        "Describes the recapitulation as the themes returning in the home key",
        "Says what the form does for the listener, such as a sense of tension and resolution",
      ],
      model:
        "In the exposition, two contrasting themes are introduced. In the development, the themes are changed and move through new keys, which builds tension. In the recapitulation, the themes return, both in the home key, which gives a sense of resolution.",
      answers: [
        [
          "full",
          "[[0|Exposition: two contrasting themes are introduced.]] [[1|Development: the composer changes the themes and goes through different keys.]] [[2|Recapitulation: the themes come back and both are in the home key.]] [[3|It makes tension in the middle and resolution at the end.]]",
          "Full marks. The tension and resolution idea explains why the form works.",
        ],
        [
          "full",
          "[[0|The exposition presents the first theme and a second one that is different.]] [[1|The development plays with those pieces and moves to new keys.]] [[2|In the recapitulation the themes return home.]] [[3|The listener feels the story build and then settle.]]",
          "All four marks. Plain and accurate.",
        ],
        [
          "partial",
          "[[0|Exposition has two themes.]] [[2|Recapitulation brings them back.]]",
          "Add what happens in the development and what the whole form does for the listener.",
        ],
        [
          "partial",
          "[[1|Development changes the themes.]] [[2|Recapitulation is a repeat in a new key.]]",
          "Development is right. In the recapitulation both themes return in the home key, not a new key.",
        ],
        [
          "weak",
          "Sonata form is a piece for one instrument and piano.",
          "A sonata can be for one instrument and piano, but sonata form is the three-part structure of exposition, development and recapitulation.",
        ],
        [
          "weak",
          "It is the same as a rondo because it repeats.",
          "A rondo keeps returning to one theme. Sonata form develops two themes and then brings them back together.",
        ],
      ],
    },
    {
      prompt:
        "Choose two rubric categories for a recording of the band. Give a score and evidence for each, and write a reflection sentence about what has improved since September.",
      scheme: [
        "Names two categories with scores",
        "Gives specific evidence for each",
        "Writes a reflection sentence on improvement since September",
        "The reflection includes a specific example",
      ],
      model:
        "Tone 3: the clarinets had a full, even sound in measures 1 to 8. Balance 2: the trombones covered the melody in measures 17 to 24. Since September the band has improved at starting together; in measure 1 the entrance is now clean, where in September it was ragged.",
      answers: [
        [
          "full",
          "[[0|Tone 3 and balance 2.]] [[1|Tone: the clarinets sounded full in measures 1 to 8. Balance: the trombones covered the melody in 17 to 24.]] [[2|Since September we have improved at starting together.]] [[3|Measure 1 is clean now, in September it was ragged.]]",
          "Full marks. The example in your reflection makes it believable.",
        ],
        [
          "full",
          "[[0|Intonation 2 and rhythm 3.]] [[1|The flutes were sharp in measure 12 and the percussion was steady in 9 to 16.]] [[2|The band has become better at listening to each other.]] [[3|The chorale now has far fewer beats than in September.]]",
          "All four marks. Mentioning beats in the chorale ties it to a skill we practiced.",
        ],
        [
          "partial",
          "[[0|Tone 3, dynamics 2.]] [[1|It was good in the first part.]]",
          "Give specific evidence for each score, such as measure numbers, and add a reflection with an example.",
        ],
        [
          "partial",
          "[[2|We are better since September.]] [[0|Balance 2.]]",
          "Name another category, give evidence, and give a specific example of improvement.",
        ],
        [
          "weak",
          "We are the best band and everything is a 4.",
          "Scores need evidence from the recording. Look for specific places to improve.",
        ],
        [
          "weak",
          "I do not like to judge my friends.",
          "The rubric is about the music, not about people. Specific feedback helps the band improve.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Critical listening, live concert reviews and the story of a piece",
  note: `
## Objectives

Students will be able to:

1. listen to a professional performance and compare it with ours;
2. explain the history and style of a piece we are rehearsing.

## Materials

A recording of a professional wind band or orchestra, a concert review template, a short biography of the composer, the worksheet.

## Starter (6 minutes)

Play two minutes of a piece. Ask students to write down three words that describe the music, then share with a partner.

## Main activity

1. Critical listening: listen for structure, color (which instruments), mood, tempo changes and dynamics. Use the vocabulary of music, not just "good" or "bad."
2. Concert review: write a review of a professional or community concert (live or recorded). A review has a description of what was played, an evaluation with evidence, and an overall opinion. Read an example.
3. The story of our piece: research the composer's life, the time of the piece, and the reason it was written. Write a short paragraph that connects the story to how we should play it.
4. Compare: what can our performance learn from the professional recording?

## Checking for understanding

Ask: "What is the difference between a description and an evaluation?" (A description says what happened; an evaluation says how well and why.)

## Exit ticket

Write one sentence of description and one of evaluation of a recording.
`,
  reading: [
    "Listening like a critic, and knowing the story behind a piece",
    `
A critic is a person who listens carefully and explains what they hear. You can become a critical listener too. Begin with a **description**: what happened in the music? Notice the **structure** (the sections), the **color** (which instruments played and how they sounded), the **mood** (calm, joyful, tense), and changes in **tempo** and **dynamics**. Use the vocabulary of music, such as "the second theme enters in the oboe at a soft dynamic," rather than words like "nice" or "boring" that say little.

Then move to **evaluation**: how well was it played or composed, and why? Evaluation needs **evidence**. "The brass chorale was impressive" is an opinion. "The brass chorale was impressive because the chords were perfectly in tune and the crescendo was controlled" is an evaluation with evidence. A good **concert review** has three parts: a description of what was played, an evaluation with evidence, and an overall opinion that helps readers decide whether to attend. Reviews should be fair and respectful. Even when something does not work, say what you heard and why you think it did not succeed.

Knowing the **story** of a piece helps you perform it better. Find out who the **composer** was, when and where the piece was written, and why. A march written for a parade should sound crisp and strong. A piece written after a tragedy may need a solemn, quiet sound. A piece based on a folk tune may need a simple, singing style. When the story and the sound match, the audience feels the connection.

Here is an example. A concert band piece written in 1909 by Gustav Holst, the **First Suite in E-flat for Military Band**, is built on a few melodic ideas and was one of the first major works for a wind band. Knowing that it was written for bands that played serious music helps you play it with care and polish.

After you have listened to a professional recording, compare it with ours. What did they do that we can try? Better listening makes better playing, and writing about what you hear is a good way to learn.
`,
  ],
  cards: [
    ["Description", "Saying what happened in the music."],
    ["Evaluation", "Judging how well something was done and giving reasons."],
    ["Color (timbre)", "The sound quality of an instrument or group."],
    ["Mood", "The emotional character of a piece."],
    ["Concert review", "A written description and evaluation of a performance."],
    ["Evidence", "Specific details that support an opinion."],
    ["Composer", "A person who writes music."],
    ["Style", "The character of a piece, such as march, lyrical or folk."],
  ],
  closed: [
    [
      "Which is a description, not an evaluation?",
      [
        "The second theme enters in the oboe at a soft dynamic",
        "The performance was boring",
        "The tuning was excellent",
        "I wish it were shorter",
      ],
      "A",
    ],
    [
      "Which sentence is an evaluation with evidence?",
      [
        "The brass was impressive",
        "The brass chorale was impressive because the chords were in tune and the crescendo was controlled",
        "I like brass",
        "The brass sat at the back",
      ],
      "B",
    ],
    [
      "A good concert review includes:",
      [
        "Only an opinion",
        "A description, an evaluation with evidence and an overall opinion",
        "Only a list of pieces",
        "A copy of the program",
      ],
      "B",
    ],
    [
      "Why does the story of a piece help you to perform it?",
      [
        "It tells you the style and the mood to aim for",
        "It makes you play louder",
        "It shortens the piece",
        "It is not useful",
      ],
      "A",
    ],
    [
      "Which composer wrote the First Suite in E-flat for Military Band?",
      ["Gustav Holst", "John Philip Sousa", "Aaron Copland", "Duke Ellington"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Write a short review (four sentences) of a professional recording we listened to, with a description, an evaluation with evidence, and an overall opinion.",
      scheme: [
        "Includes a description of what was played using music vocabulary",
        "Includes an evaluation",
        "Supports the evaluation with specific evidence",
        "Includes an overall opinion or recommendation",
      ],
      model:
        "The band opened with a quiet chorale in the low brass, followed by a lively march. The tuning of the chorale was excellent because the chords were clean and the crescendo was controlled. The march was less convincing because the tempo rushed in the second strain. Overall, it was a fine performance that I would recommend to anyone who likes wind band music.",
      answers: [
        [
          "full",
          "[[0|The band began with a soft chorale in the low brass and moved to a lively march.]] [[1|The chorale was beautifully played.]] [[2|The chords were perfectly in tune and the crescendo was well controlled.]] [[3|Overall I would recommend it to anyone who likes wind band.]]",
          "Full marks. You used the vocabulary and backed up your opinion with detail.",
        ],
        [
          "full",
          "[[0|A slow introduction led to a fast section with a trumpet theme.]] [[1|The fast section was exciting.]] [[2|The trumpets were crisp and the tempo stayed steady even in the hard run.]] [[3|It is worth hearing.]]",
          "All four marks. Mentioning the steady tempo through a hard run is useful evidence.",
        ],
        [
          "partial",
          "[[0|The band played a slow chorale and then a march.]] [[1|It was good.]]",
          "Add specific evidence for why it was good, and an overall opinion.",
        ],
        [
          "partial",
          "[[1|It was great.]] [[3|I recommend it.]]",
          "Begin with a description of what was played and give the evidence that makes it great.",
        ],
        [
          "weak",
          "It was loud and I liked it.",
          "Describe what you heard using music words, and say why it was good with evidence.",
        ],
        [
          "weak",
          "The musicians looked nice in their uniforms.",
          "A music review is about what you hear. Describe the music and evaluate the playing.",
        ],
      ],
    },
    {
      prompt:
        "Choose a piece the band is rehearsing. Describe the composer, when and why it was written, and how the story affects how we should play it.",
      scheme: [
        "Names the composer",
        "Says when it was written",
        "Says why it was written or what it is for",
        "Explains how this affects how we should play it",
      ],
      model:
        "Gustav Holst wrote the First Suite in E-flat in 1909 for military band. It was written for a wind band to play serious music, not only marches. That means we should play it with care, even tone and clear structure, as concert music.",
      answers: [
        [
          "full",
          "[[0|Holst wrote the First Suite in E-flat.]] [[1|It was written in 1909.]] [[2|It was one of the first serious pieces written for a wind band.]] [[3|So we should play it carefully with an even tone and shape each movement like concert music.]]",
          "Full marks. The connection between the history and how we play is clear.",
        ],
        [
          "full",
          "[[0|John Philip Sousa composed The Stars and Stripes Forever.]] [[1|It was written in 1896.]] [[2|It was meant to be played in parades.]] [[3|So we play it crisply and in time, with a bright and strong sound.]]",
          "All four marks. A march asks for a different style of playing than a concert piece.",
        ],
        [
          "partial",
          "[[0|Holst.]] [[1|1909.]]",
          "Add why the piece was written and how it should change the way we play.",
        ],
        [
          "partial",
          "[[2|It was for a parade.]] [[3|We should play it crisply.]]",
          "Name the composer and the year to complete the story.",
        ],
        [
          "weak",
          "I do not know anything about it.",
          "Use the program or a reliable source to find the composer, the year and the reason for the piece.",
        ],
        [
          "weak",
          "It was written by someone a long time ago.",
          "Be specific: name the composer, the year and the reason the piece was written.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Acoustics, frequency ratios, and music as a lifelong path",
  note: `
## Objectives

Students will be able to:

1. relate musical patterns to mathematics, such as fractions and ratios in rhythm;
2. describe the role of music in your community and how you can take part in it.

## Materials

Calculators, a tuner with a frequency display, a chart of note frequencies, a list of post-graduation music options, the worksheet.

## Starter (6 minutes)

Use a tuner to show A at 440 hertz. Ask: "What do you think happens to the frequency when we go up an octave?" (It doubles.)

## Main activity

1. Frequency: an octave doubles the frequency. Each half step multiplies it by about 1.0595 (the twelfth root of 2). From A 440, calculate A-sharp (about 466), B (about 494) and C (about 523).
2. Duration and tempo: calculate a piece with a tempo change and a ritardando using average tempo.
3. Resonance and standing waves: a longer tube produces a lower pitch. A trombone slide lengthens the tube. Explain the idea in words.
4. Life after high school: scholarships, college ensembles, community groups, careers in music, and keeping music in your life. Choose one path and write down two first steps.

## Checking for understanding

Ask: "If a tube is twice as long, what happens to the pitch?" (It is an octave lower.)

## Exit ticket

Calculate A-sharp above A 440 using the ratio 1.0595.
`,
  reading: [
    "Frequency, tubes and the road ahead",
    `
The pitch of a note is determined by its **frequency**, the number of vibrations per second, measured in **hertz (Hz)**. The standard tuning note, the A above middle C, has a frequency of 440 Hz. Going up an **octave** doubles the frequency, to 880 Hz, and going down an octave halves it, to 220 Hz. The twelve half steps in an octave divide the doubling evenly. Each half step multiplies the frequency by the twelfth root of 2, about **1.0595**. So the A-sharp above A 440 has a frequency of about 440 × 1.0595 = 466.2 Hz, B is 440 × 1.0595², about 493.9 Hz, and C is about 523.3 Hz. This system is called **equal temperament**, and it is how pianos and many band instruments are tuned.

Why do instruments produce different pitches? In a wind or brass instrument, a column of air vibrates inside a tube. A **longer tube** produces a **lower** pitch, and a shorter tube a higher one. If a tube is twice as long, the pitch is an octave lower. A trombone player changes pitch by moving the slide to lengthen or shorten the tube, and a trumpet player presses valves that add extra lengths of tubing. Woodwind players cover holes to shorten the vibrating column of air. Knowing this helps you understand why a cold instrument is flat: cooler air is denser, and sound moves more slowly, so the pitch drops.

Tempo is mathematical as well. A piece may have a **ritardando** at the end. If a 20-measure section of 4/4 begins at 120 beats per minute and slows to 80, you can estimate with an average tempo of 100: 80 beats ÷ 100 = 0.8 minutes, or 48 seconds.

Finally, think about where music goes after graduation. Many universities and community colleges welcome non-majors in their bands, and some offer **scholarships** for strong players. You can join a **community band** or a church or civic group, play in a military band, teach, work in the **music business** or in **recording and sound**, become a **music therapist**, or simply keep music as a lifelong pleasure. Choose a path, then plan two first steps: for example, email a college band director about auditions and find a local community band's schedule.

The habits you have built in band, careful listening, steady practice and teamwork, will go with you wherever you go.
`,
  ],
  cards: [
    ["Frequency", "The number of vibrations per second, measured in hertz."],
    ["Hertz (Hz)", "One vibration per second."],
    ["Equal temperament", "A tuning system in which each half step has the same frequency ratio."],
    ["1.0595", "The approximate ratio of one half step in equal temperament."],
    ["Octave", "A frequency ratio of 2 to 1."],
    ["Standing wave", "A vibration pattern in a column of air or a string."],
    ["Scholarship", "Money awarded for talent or achievement."],
    ["Music therapy", "Using music to help health and well-being."],
  ],
  closed: [
    [
      "What happens to the frequency when you go up one octave?",
      ["It doubles", "It halves", "It stays the same", "It increases by 12"],
      "A",
    ],
    [
      "About how much is the frequency of A-sharp above A 440?",
      ["446 Hz", "466 Hz", "486 Hz", "526 Hz"],
      "B",
    ],
    [
      "Why does a longer tube make a lower pitch?",
      [
        "A longer column of air vibrates more slowly",
        "It is heavier",
        "It is more expensive",
        "It makes the sound louder",
      ],
      "A",
    ],
    [
      "A cold instrument tends to be:",
      ["Sharp", "Flat", "Louder", "In tune"],
      "B",
    ],
    [
      "Which is a path for music after high school?",
      [
        "Playing in a community band",
        "Giving up music forever",
        "Avoiding all concerts",
        "Only reading about music",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Calculate the approximate frequencies of A-sharp and B above A 440 using the half-step ratio 1.0595, and explain why the frequency of A an octave higher is exactly 880 Hz.",
      scheme: [
        "Calculates A-sharp as 440 times 1.0595, about 466 Hz",
        "Calculates B as 466.2 times 1.0595 or 440 times 1.0595 squared, about 494 Hz",
        "Says an octave is twelve half steps",
        "Explains that 1.0595 to the twelfth power equals 2, so the frequency doubles to 880 Hz",
      ],
      model:
        "A-sharp is 440 × 1.0595, about 466 Hz. B is 466.2 × 1.0595, about 494 Hz. An octave is twelve half steps, and 1.0595 multiplied by itself twelve times equals 2, so the frequency doubles to 880 Hz.",
      answers: [
        [
          "full",
          "[[0|A-sharp: 440 × 1.0595 = about 466 Hz.]] [[1|B: 466 × 1.0595 = about 494 Hz.]] [[2|An octave is 12 half steps.]] [[3|1.0595 to the 12th power is 2, so A is 880.]]",
          "Full marks. You connected the half step ratio to the octave.",
        ],
        [
          "full",
          "[[0|440 times 1.0595 is 466.2.]] [[1|466.2 times 1.0595 is 493.9.]] [[2|There are twelve half steps in an octave.]] [[3|Multiplying by 1.0595 twelve times makes exactly 2, so 880.]]",
          "All four marks. Showing the extra decimal place is accurate.",
        ],
        [
          "partial",
          "[[0|A-sharp is 466.]] [[1|B is 494.]]",
          "The frequencies are right. Explain why an octave doubles: twelve half steps each multiply by 1.0595, which gives 2.",
        ],
        [
          "partial",
          "[[0|440 × 1.0595 = 466.]] [[1|B is 440 + 466 = 906.]]",
          "The first is right. For B, multiply 466.2 by 1.0595 again to get about 494, not add.",
        ],
        [
          "weak",
          "A-sharp is 441 because it is one more than A.",
          "Frequencies are multiplied, not added. Use 440 × 1.0595.",
        ],
        [
          "weak",
          "An octave doubles because it is a rule.",
          "It is not just a rule. Twelve half steps each multiply by 1.0595, and 1.0595 to the 12th power equals 2.",
        ],
      ],
    },
    {
      prompt:
        "Choose one path for music after high school. Describe it, name two first steps you could take this year, and say how a habit from band would help.",
      scheme: [
        "Names a path and describes it",
        "Gives a first step",
        "Gives a second step",
        "Says how a band habit would help, such as listening, practice or teamwork",
      ],
      model:
        "I could join a community band. It is a group of players of all ages who rehearse and perform for their town. First steps: find the local band's rehearsal schedule and email the director. My habit of steady practice would help me keep up with the music.",
      answers: [
        [
          "full",
          "[[0|A college concert band that is open to non-majors where I can keep playing.]] [[1|First I look up the audition information for my top two colleges.]] [[2|Then I email the band director to ask what is needed.]] [[3|My habit of practicing steadily and listening to others will help me prepare.]]",
          "Full marks. Two concrete first steps and a habit that really transfers.",
        ],
        [
          "full",
          "[[0|Music therapy, where musicians help patients with music.]] [[1|I will research programs that offer a degree.]] [[2|I will volunteer to play at a care home.]] [[3|The teamwork and patience I learned in band will help me work with people.]]",
          "All four marks. The volunteering step lets you test the path early.",
        ],
        [
          "partial",
          "[[0|A community band.]] [[1|Find the rehearsal schedule.]]",
          "Add a second step, and say how a habit from band would help.",
        ],
        [
          "partial",
          "[[3|My practice habits will help.]] I will be in music.",
          "Name a specific path, such as a college band or a community group, and two first steps.",
        ],
        [
          "weak",
          "I will not do music because I am not going to be a professional.",
          "Music is not only for professionals. Community bands and college groups welcome amateurs.",
        ],
        [
          "weak",
          "I will become a famous musician.",
          "Choose a specific path and two first steps you can take this year.",
        ],
      ],
    },
  ],
};

writeCourse("band-grade-12.json", "Band", "Grade 12", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
