import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Band, Grade 11, Quarter 1. National Core Arts Standards, Music, in the
 * school's own words. The upper band: every major key, minor scale forms,
 * section leadership and rehearsal technique, concert programming, student
 * conducting, composing with chord progressions, syncopation and jazz
 * rhythm, form and the sonata idea, and music as a path after school.
 * No practicals.
 */

const w1: WeekInput = {
  topic: "All twelve keys, minor scale forms and prepared sight-reading",
  note: `
## Objectives

Students will be able to:

1. play assigned parts with accurate pitch, rhythm and tone;
2. perform major scales in several keys and three forms of a minor scale from memory;
3. sight-read a short passage at a steady tempo.

## Materials

Instruments, metronomes, a circle of fifths chart, a sight-reading card with a key change, the worksheet.

## Starter (6 minutes)

Concert B-flat long tone, then move up a perfect fifth and hold again. Ask: "How many flats or sharps did the key signature gain or lose when we moved?"

## Main activity

1. The circle of fifths: each step clockwise adds a sharp, each step counterclockwise adds a flat. Fill in the order of sharps (F, C, G, D, A, E, B) and the order of flats (B, E, A, D, G, C, F).
2. Play major scales in all twelve keys over two octaves, assigning keys by section, at 92 beats per minute in eighth notes.
3. Minor scale forms: natural minor, harmonic minor (raised seventh) and melodic minor (raised sixth and seventh going up). Play A minor in all three forms and describe how they sound.
4. Sight-reading with a key change: scan for the new key signature and plan where the accidentals will be.

## Checking for understanding

Ask: "How many sharps does D major have?" (Two.) Ask: "How do you get the harmonic minor from the natural minor?" (Raise the seventh.)

## Exit ticket

Write the A harmonic minor scale.
`,
  reading: [
    "The circle of fifths and three kinds of minor",
    `
By your third year in band you should be comfortable in every key. A tool that makes this possible is the **circle of fifths**, a diagram that shows how the twelve major keys are related. Start at C major at the top, with no sharps or flats. Each step clockwise moves up a perfect fifth and adds one sharp: G major has one, D major has two, A major has three, E major has four, B major has five. Each step counterclockwise adds one flat: F major has one, B-flat major has two, E-flat major has three, A-flat major has four. The sharps are added in the order **F, C, G, D, A, E, B**, and the flats in the order **B, E, A, D, G, C, F**, which is the same list backwards. A useful rule: in a flat key, the second-to-last flat names the key (for example, in B-flat, E-flat, the second-to-last flat is the name of the key signature with two flats, B-flat).

Each major key has a relative minor three half steps below. There are three forms of the minor scale. The **natural minor** uses only the notes of the key signature, so A natural minor is A, B, C, D, E, F, G, A. The **harmonic minor** raises the seventh note by a half step, giving A, B, C, D, E, F, G-sharp, A. That creates a leading tone, a note that wants to resolve up to the tonic, and a distinctive sound with a large step between the sixth and seventh. The **melodic minor** raises both the sixth and seventh notes when going up, A, B, C, D, E, F-sharp, G-sharp, A, to smooth that gap, and usually goes back to the natural minor on the way down.

When you **sight-read** a piece with a key change, scan the whole piece before you play. Find each key signature, mark them with a pencil, and look at what changes. Find the accidentals that suggest the harmonic or melodic minor. Plan breaths and difficult fingerings in advance. The aim is to play what is written, at a steady tempo, even on the first time through.

Skill in all keys means you can move between pieces and ensembles easily, and you will find it much easier to learn new music.
`,
  ],
  cards: [
    ["Circle of fifths", "A diagram showing how the twelve keys are related by fifths."],
    ["Order of sharps", "F, C, G, D, A, E, B."],
    ["Order of flats", "B, E, A, D, G, C, F."],
    ["Natural minor", "A minor scale that uses only the notes of its key signature."],
    ["Harmonic minor", "A minor scale with a raised seventh note."],
    ["Melodic minor", "A minor scale with raised sixth and seventh notes going up."],
    ["Leading tone", "The seventh note of the scale, a half step below the tonic."],
    ["Key change", "A move from one key to another within a piece."],
  ],
  closed: [
    [
      "How many sharps does D major have?",
      ["One", "Two", "Three", "Four"],
      "B",
    ],
    [
      "Which note is raised to make the harmonic minor scale from the natural minor?",
      ["The third", "The fifth", "The seventh", "The tonic"],
      "C",
    ],
    [
      "What is the order of sharps?",
      [
        "F, C, G, D, A, E, B",
        "B, E, A, D, G, C, F",
        "C, D, E, F, G, A, B",
        "G, D, A, E, B, F, C",
      ],
      "A",
    ],
    [
      "Moving one step counterclockwise on the circle of fifths from C major gives which key?",
      ["G major", "D major", "F major", "B major"],
      "C",
    ],
    [
      "The melodic minor scale, going up, raises:",
      [
        "Only the second note",
        "The sixth and seventh notes",
        "The third and fourth notes",
        "No notes",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write the A natural minor, A harmonic minor and A melodic minor scales (ascending) and say what changes from one to the next.",
      scheme: [
        "Writes A natural minor: A B C D E F G A",
        "Writes A harmonic minor with G-sharp",
        "Writes A melodic minor ascending with F-sharp and G-sharp",
        "Says what is raised: the seventh for harmonic and sixth and seventh for melodic",
      ],
      model:
        "A natural minor: A, B, C, D, E, F, G, A. A harmonic minor: A, B, C, D, E, F, G-sharp, A, with the seventh raised. A melodic minor ascending: A, B, C, D, E, F-sharp, G-sharp, A, with the sixth and seventh raised.",
      answers: [
        [
          "full",
          "[[0|Natural: A B C D E F G A.]] [[1|Harmonic: A B C D E F G-sharp A.]] [[2|Melodic up: A B C D E F-sharp G-sharp A.]] [[3|Harmonic raises the seventh and melodic raises the sixth and seventh.]]",
          "Full marks. All three forms are correct and the changes are clearly stated.",
        ],
        [
          "full",
          "[[0|A minor natural has no sharps: A B C D E F G.]] [[1|Harmonic has a G#.]] [[2|Melodic going up has F# and G#.]] [[3|So the 7th goes up for harmonic and 6th and 7th for melodic.]]",
          "All four marks. Explaining which degrees move is exactly what the question asked.",
        ],
        [
          "partial",
          "[[0|A, B, C, D, E, F, G, A.]] [[1|A, B, C, D, E, F, G-sharp, A.]]",
          "The first two scales are correct. Add the melodic form and say what changes from each form to the next.",
        ],
        [
          "partial",
          "[[0|Natural: A B C D E F G.]] Harmonic: A B C D E F# G#. [[3|Melodic raises the sixth and seventh.]]",
          "The natural scale and the melodic idea are right. In the harmonic minor, only the seventh is raised, so F stays natural.",
        ],
        [
          "weak",
          "A minor has all the notes in A major but flat.",
          "A minor has no sharps or flats in its natural form. A major has three sharps. They are related but not identical.",
        ],
        [
          "weak",
          "The three forms are just names for slow, medium and fast.",
          "The forms of the minor scale describe different notes, not speed: natural uses the key signature, harmonic raises the seventh, melodic raises the sixth and seventh going up.",
        ],
      ],
    },
    {
      prompt:
        "Use the circle of fifths to find the number of sharps in E major and explain how you know which notes they are.",
      scheme: [
        "Counts clockwise steps from C major to E major, four steps",
        "States that E major has four sharps",
        "Names the sharps as F, C, G and D",
        "Uses the order of sharps F C G D A E B to find them",
      ],
      model:
        "From C major, E major is four steps clockwise on the circle of fifths (G, D, A, E), so it has four sharps. The sharps are the first four in the order of sharps F, C, G, D, A, E, B: F-sharp, C-sharp, G-sharp and D-sharp.",
      answers: [
        [
          "full",
          "[[0|C to G to D to A to E is four steps clockwise.]] [[1|So E major has four sharps.]] [[2|They are F, C, G and D sharp.]] [[3|I use the order of sharps, F C G D A E B, and take the first four.]]",
          "Full marks. Counting the steps and then using the order of sharps is the standard method.",
        ],
        [
          "full",
          "[[0|Going clockwise from C: G (1), D (2), A (3), E (4).]] [[1|Four sharps.]] [[3|The order is F C G D A E B,]] [[2|so it is F#, C#, G# and D#.]]",
          "All four marks. The step-by-step count makes your answer easy to check.",
        ],
        [
          "partial",
          "[[1|E major has four sharps.]] [[2|F, C, G and D.]]",
          "Correct. Say how you know: count four steps clockwise from C and use the order of sharps.",
        ],
        [
          "partial",
          "[[0|C, G, D, A, E is four steps.]] There are four flats.",
          "The count is right. Clockwise adds sharps, not flats, so there are four sharps.",
        ],
        [
          "weak",
          "E major has no sharps because E is a natural note.",
          "The name of the key does not tell you the sharps. E major has four sharps: F, C, G and D.",
        ],
        [
          "weak",
          "I guessed three sharps.",
          "Use the circle of fifths: C to G to D to A to E is four steps, so four sharps.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Leading a section: rehearsal technique, conducting and ensemble listening",
  note: `
## Objectives

Students will be able to:

1. follow a conductor's cues for tempo, dynamics and entrances;
2. balance and blend your sound with the other players in your section.

## Materials

Batons, a score and a part for the same piece, recording device, a section leader checklist, the worksheet.

## Starter (6 minutes)

Hand each student a part and a full score. Ask: "What can you see in the score that you cannot see in your part?"

## Main activity

1. Reading a score: staves grouped by family, transposing instruments marked, the conductor's cues. Find where your part enters relative to others.
2. Section leader skills: giving a start pitch, giving a clear count-off, and using short specific feedback (for example, "Clarinets, the quarter notes in bar 12 are late").
3. Rehearsal technique: isolate a problem, slow it down, repeat it with a metronome, then add the section back in context. Use four steps: find, fix, drill, play.
4. Student conducting: each student conducts a four-bar passage while others play. Focus on a clear preparatory beat, a steady pattern and eye contact.

## Checking for understanding

Ask: "What are the four steps of a good rehearsal technique?" (Find, fix, drill, play.)

## Exit ticket

Write one piece of specific feedback a section leader could give.
`,
  reading: [
    "How to lead a section and rehearse well",
    `
As an upper-class player you may be asked to be a **section leader**, a player who helps the section prepare and sets an example. The job is not to be the loudest voice. It is to help your section play together, in tune and on time.

First, learn to read a **score**, the full music for all instruments, one staff above another. Instruments are grouped by family: woodwinds, brass and percussion. Transposing instruments are shown in their written key, and a good score marks the concert pitch. By reading the score you can see how your part relates to others, what the melody is, and when your section enters.

Second, learn **rehearsal technique**. Rehearsing is not the same as playing straight through. When something is wrong, use four steps: **find** the exact spot (for example, bar 12, beat 3), **fix** the cause (wrong note, wrong rhythm, a late entrance), **drill** it slowly with a metronome until it is correct several times in a row, and then **play** it again in context with the whole group. Spend more time on the parts that are hard than on the parts that are easy.

Third, give feedback that is **specific**, **kind** and **useful**. "That was bad" does nothing. "Clarinets, your eighth notes in bar 12 are rushing; let's try it at 80 with the metronome" tells the section what and how. Listen more than you talk, and thank people for their work.

Fourth, try **conducting**. A conductor gives a clear preparatory beat, keeps a steady pattern, and looks at the players, not at the music. Even a four-bar passage will teach you how hard it is to keep a group together. Many band members become better players after they have conducted, because they learn to see the music from the front.

The best section leaders are the ones whose sections get better, and who help new players feel welcome.
`,
  ],
  cards: [
    ["Section leader", "A player who helps the section prepare and sets an example."],
    ["Score", "The full music for all instruments, one staff above another."],
    ["Concert pitch", "The actual sounding pitch, as opposed to the written pitch of a transposing instrument."],
    ["Find, fix, drill, play", "Four steps of a good rehearsal technique."],
    ["Specific feedback", "Comments that name the place and the problem."],
    ["Preparatory beat", "A gesture before the first note that shows tempo and breath."],
    ["Eye contact", "Looking at the players while conducting."],
    ["Context", "The music around a passage when played with the full group."],
  ],
  closed: [
    [
      "What is a score?",
      [
        "The result of a contest",
        "The full music for all instruments, one staff above another",
        "A part for one instrument",
        "A list of players",
      ],
      "B",
    ],
    [
      "Which is the best feedback from a section leader?",
      [
        "That was bad",
        "Clarinets, your eighth notes in bar 12 are rushing, so let us try it with the metronome",
        "Try harder",
        "You should have practiced",
      ],
      "B",
    ],
    [
      "What is the first step of rehearsal technique?",
      ["Play the whole piece", "Find the exact spot of the problem", "End rehearsal", "Change the music"],
      "B",
    ],
    [
      "Why is it useful to conduct a four-bar passage?",
      [
        "It makes you louder",
        "It shows how hard it is to keep a group together and helps you see the music from the front",
        "It is required by law",
        "It shortens rehearsal",
      ],
      "B",
    ],
    [
      "A section leader should mostly:",
      [
        "Play louder than everyone",
        "Help the section play together and set an example",
        "Ignore the conductor",
        "Choose the music",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the four-step rehearsal technique and show how you would use it on a rhythm that your section rushes in bar 12.",
      scheme: [
        "Names the four steps: find, fix, drill, play",
        "Applies find: identifies bar 12 and the rushing",
        "Applies fix and drill: slows the passage and uses a metronome",
        "Applies play: adds it back in context with the whole group",
      ],
      model:
        "The steps are find, fix, drill and play. Find: the rushing happens in bar 12. Fix and drill: play it slowly with the metronome until it is correct several times. Play: put it back into the music with the whole group and check it again.",
      answers: [
        [
          "full",
          "[[0|The steps are find, fix, drill and play.]] [[1|First we find bar 12, beats 2 to 4, where we rush.]] [[2|Then we slow it to 72 with the metronome and repeat it until it is right four times.]] [[3|Last we play it again in the full piece.]]",
          "Full marks. The tempo and the number of repetitions make your plan something real.",
        ],
        [
          "full",
          "[[0|Find the problem, fix the cause, drill it, then play it in context.]] [[1|The problem is the rushing in bar 12.]] [[2|We would drill it slowly with a metronome.]] [[3|Then play from bar 9 to 14 with everyone.]]",
          "All four marks. Playing from a few bars before gives a good run-up.",
        ],
        [
          "partial",
          "[[0|Find, fix, drill, play.]] [[2|Use the metronome.]]",
          "You have the steps. Show how each applies to bar 12, including finding the exact beat and playing it again in context.",
        ],
        [
          "partial",
          "[[1|Find bar 12.]] Play it over and over fast until it is right.",
          "Finding the spot is good. Drilling should be slow, with a metronome, not fast, or the rushing gets worse.",
        ],
        [
          "weak",
          "Play the whole piece again and hope it fixes itself.",
          "Playing through does not fix specific problems. Use the four steps on the exact spot.",
        ],
        [
          "weak",
          "Tell the section to try harder in bar 12.",
          "Try harder is not specific. Find the exact beat, fix the cause, drill it slowly, and play it in context.",
        ],
      ],
    },
    {
      prompt:
        "Rewrite this feedback so it is specific, kind and useful: \"The trumpets sounded bad.\" Then explain what makes your version better.",
      scheme: [
        "Names the specific place, such as a bar or section",
        "Names the specific problem, such as pitch, rhythm or balance",
        "Gives a way to fix it, such as a slower tempo or a drill",
        "Explains that the new feedback is specific, tells what to do and is respectful",
      ],
      model:
        "Trumpets, the high note in bar 20 is a little sharp. Let us check it with the tuner and play it slowly. This is better because it names the place and the problem, gives a way to fix it, and is respectful.",
      answers: [
        [
          "full",
          "[[0|Trumpets, in bar 20]] [[1|the high note was a bit sharp.]] [[2|Let us tune it with the tuner and play it slowly.]] [[3|This is better because it says where and what the problem is and how to fix it, and it is not rude.]]",
          "Full marks. Your version gives the trumpets something they can do right away.",
        ],
        [
          "full",
          "[[0|Trumpets, measures 9 to 12,]] [[1|the entrance on the second beat was late.]] [[2|Try it with the metronome at 80.]] [[3|It is better because it is specific and tells them what to do.]]",
          "All four marks. Adding the tempo for the drill makes it very useful.",
        ],
        [
          "partial",
          "[[0|Trumpets in bar 20]] [[1|you were sharp.]]",
          "Good, specific and polite. Add what to do about it and explain why it is better than the original.",
        ],
        [
          "partial",
          "[[2|Try it slower with the metronome.]] [[3|That is better because it is nicer.]]",
          "The fix is good. Name where and what the problem is, and say it is better because it is specific, not only nicer.",
        ],
        [
          "weak",
          "The trumpets were not good, so they need to be better.",
          "This does not say where, what or how. Name the bar, the problem and a way to fix it.",
        ],
        [
          "weak",
          "I would not say anything because it might hurt feelings.",
          "Feedback helps the band improve. The skill is to make it specific and respectful.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Endurance, stage presence and programming a concert",
  note: `
## Objectives

Students will be able to:

1. perform with correct posture, breath support and instrument care;
2. prepare for a concert, including a warm-up routine and a rehearsal plan.

## Materials

Sample concert programs, a timer, the rehearsal calendar, the worksheet.

## Starter (6 minutes)

Ask: "If you were planning a 40-minute concert with six pieces, which piece would you play first and which last? Why?"

## Main activity

1. Physical endurance: brass players build lip stamina through a gradual schedule; woodwinds control air in long phrases; percussionists manage a fast setup. Plan rest in rehearsal so players do not tire.
2. Stage presence: walk on and off in order, sit quickly, hold instruments in a rest position, look at the conductor, bow when asked, and stay still between pieces.
3. Programming a concert: contrast keys, tempos and moods; include a strong opener, a slow lyrical piece, and a lively closer. Check the total time, including pauses of about 1 minute between pieces.
4. A rehearsal plan: working backward from the concert, the plan assigns pieces to rehearsals and leaves time for a dress rehearsal.

## Checking for understanding

Ask: "What makes a good program?" (Variety and a strong shape.)

## Exit ticket

Write a program of four pieces with their lengths and the total time.
`,
  reading: [
    "Stamina, stage presence and the shape of a program",
    `
Performing well is physical. Brass players use small muscles in the lips, and these tire if you ask too much too quickly. Build **endurance** gradually: play for a short time, rest, and extend the time each week. Woodwind players need control of their air so that long phrases do not run out. Percussionists have to set up quickly and quietly, because they move more equipment than anyone. Always warm up, drink water, and stop and rest if you feel pain.

**Stage presence** is how you look and behave on stage. It does not mean acting. It means respect for the audience and the other players. Enter in order, take your seat quickly and quietly, and place your instrument in a **rest position** until the conductor lifts the baton. Look at the conductor during every piece, since the audience can see if you are alert. Between pieces, stay still and do not talk. If the conductor asks you to stand or bow, do it together. Leave in order at the end. Good stage presence makes the performance look as good as it sounds.

Planning a **concert program** is a creative job. A good program has **variety** in key, tempo, mood, and the instruments featured. It often begins with a strong, lively opener, includes a slower lyrical piece in the middle, and ends with an exciting closer. Avoid putting two pieces in the same key and tempo next to each other. Add the lengths of the pieces and the pauses, about one minute between pieces, to find the total time. A concert of four pieces of 5, 6, 4 and 7 minutes lasts 22 minutes of music plus three pauses of one minute, so 25 minutes.

The **rehearsal plan** puts it together. Start with the date and work backward. Each rehearsal has a goal and each piece is scheduled. Leave at least one rehearsal for a complete run-through, and one for a **dress rehearsal** in concert clothes and with the stage setup.

Concerts are not just about perfection. They are a chance to share what the band has worked for.
`,
  ],
  cards: [
    ["Endurance", "The ability to keep playing without tiring."],
    ["Stage presence", "How you look and behave on stage."],
    ["Rest position", "How you hold your instrument while waiting to play."],
    ["Program", "The list and order of pieces in a concert."],
    ["Variety", "A mix of keys, tempos and moods."],
    ["Opener", "The first piece in a concert."],
    ["Closer", "The last piece in a concert."],
    ["Dress rehearsal", "A full rehearsal in concert dress and stage setup."],
  ],
  closed: [
    [
      "A good concert program usually has:",
      [
        "Pieces all in the same key and tempo",
        "Variety in key, tempo and mood",
        "Only slow pieces",
        "No opener",
      ],
      "B",
    ],
    [
      "Four pieces of 5, 6, 4 and 7 minutes with a one-minute pause between pieces last how long?",
      ["22 minutes", "25 minutes", "26 minutes", "28 minutes"],
      "B",
    ],
    [
      "What should you do while waiting for the conductor to begin?",
      [
        "Put your instrument in the rest position and watch the conductor",
        "Talk with a friend",
        "Play quietly",
        "Look at the audience for a friend",
      ],
      "A",
    ],
    [
      "Why should a brass player build endurance gradually?",
      [
        "The lip muscles can tire if you do too much too quickly",
        "It is a rule",
        "Brass is quiet",
        "It saves money",
      ],
      "A",
    ],
    [
      "A dress rehearsal is:",
      [
        "A rehearsal for the clothing store",
        "A full rehearsal in concert dress and setup",
        "A concert for children only",
        "The first rehearsal",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Plan a four-piece concert program. List each piece with a type, key or tempo and a length in minutes, explain the order, and find the total time with a one-minute pause between pieces.",
      scheme: [
        "Lists four pieces with a length, key or tempo",
        "Explains the order, with a strong opener and a lively closer",
        "Includes variety, such as a slower lyrical piece in the middle",
        "Calculates the total time including the pauses",
      ],
      model:
        "1. A march in E-flat, fast, 4 minutes. 2. A chorale in F, slow, 3 minutes. 3. A lyrical piece in B-flat, medium, 5 minutes. 4. A fast finale in B-flat, 6 minutes. The march is a strong opener and the finale is a lively closer, with the slow chorale and lyrical piece in the middle for variety. Music is 18 minutes plus three one-minute pauses, so 21 minutes.",
      answers: [
        [
          "full",
          "[[0|1. March in E-flat, fast, 4 min. 2. Chorale in F, slow, 3 min. 3. Lyrical piece in B-flat, medium, 5 min. 4. Finale, fast, 6 min.]] [[1|The march is a strong opener and the finale is a lively closer.]] [[2|The slow chorale and the lyrical piece give variety in the middle.]] [[3|4 + 3 + 5 + 6 = 18 plus three pauses is 21 minutes.]]",
          "Full marks. The order has a clear shape, and the total is correct.",
        ],
        [
          "full",
          "[[0|A fast opener (5 min), a slow ballad (4 min), a medium piece in a new key (5 min) and a loud closer (6 min).]] [[1|Start strong and end strong.]] [[2|A ballad in the middle gives contrast.]] [[3|The music is 20 minutes and there are 3 pauses, so 23 minutes total.]]",
          "All four marks. Mixing the tempos and moods makes a satisfying program.",
        ],
        [
          "partial",
          "[[0|March 4 min, chorale 3 min, ballad 5 min, finale 6 min.]] [[3|18 minutes.]]",
          "The pieces and the music time are right. Explain the order and add the three one-minute pauses to get 21 minutes.",
        ],
        [
          "partial",
          "[[0|Four pieces: fast 4 min, fast 4 min, fast 4 min, fast 4 min.]] [[3|16 plus 3 is 19 minutes.]]",
          "The arithmetic is right. A program of four fast pieces has no variety. Add a slower piece and explain the order.",
        ],
        [
          "weak",
          "Play them in any order, it does not matter.",
          "The order shapes the concert. A strong opener, contrast in the middle and a lively closer keep the audience interested.",
        ],
        [
          "weak",
          "I would play four pieces that are 10 minutes each.",
          "The length is not the problem, but you need to explain the order and variety, and add the pauses. Four ten-minute pieces and three pauses are 43 minutes.",
        ],
      ],
    },
    {
      prompt:
        "Describe three parts of good stage presence at a concert and why each matters to the audience.",
      scheme: [
        "Describes entering and sitting in an orderly way",
        "Describes holding the instrument in a rest position and watching the conductor",
        "Describes staying still and quiet between pieces or bowing together",
        "Explains why each matters to the audience",
      ],
      model:
        "Players enter and sit quickly and quietly, so the audience sees a calm, prepared group. They hold their instruments in a rest position and watch the conductor, which shows they are alert. Between pieces they stay still and bow together, which shows respect. Each makes the performance look as good as it sounds.",
      answers: [
        [
          "full",
          "[[0|We enter in order and sit down quickly and quietly.]] [[1|We put our instruments in the rest position and keep our eyes on the conductor.]] [[2|Between pieces we stay still and we bow together.]] [[3|The audience sees a group that is prepared and respectful, so it looks as good as it sounds.]]",
          "Full marks. The reasons tie each habit to what the audience sees.",
        ],
        [
          "full",
          "[[0|Walking on and off in an orderly way.]] [[1|Watching the conductor so you are ready.]] [[2|Not talking between pieces.]] [[3|It shows the audience respect and makes the concert feel professional.]]",
          "All four marks. The word professional sums it up.",
        ],
        [
          "partial",
          "[[0|Sit down quickly.]] [[1|Watch the conductor.]]",
          "Two good habits. Add a third, such as staying still between pieces, and say why they matter to the audience.",
        ],
        [
          "partial",
          "[[2|Stay still and bow together.]] It is not important what the audience sees.",
          "Staying still and bowing are good. The audience does matter: stage presence shows respect and prepares them to listen.",
        ],
        [
          "weak",
          "Wave to my family during the concert.",
          "Waving can distract from the music. Good presence means watching the conductor and staying still.",
        ],
        [
          "weak",
          "Stage presence is when you play louder than everyone.",
          "Stage presence is how you look and behave, such as entering in order and watching the conductor, not how loudly you play.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Show design for a marching band, leadership and long-term practice goals",
  note: `
## Objectives

Students will be able to:

1. perform in marching band or pep band with correct formation and movement;
2. keep a practice log and set goals for improvement.

## Materials

Grid paper with yard lines, a drill design template, practice logs, the quiz.

## Starter (6 minutes)

Look at a two-page drill chart. Ask: "What shape is the band making in set 1? What shape in set 2? How many counts between them?"

## Main activity

1. Drill design: the football field is 100 yards between goal lines with a line every 5 yards. A band can make shapes such as a block, a line, a circle and a diagonal. Plan a 16-count move from a block to a line.
2. Step math: at 8 to 5 a 25-yard move takes 40 steps. At 6 to 5, it takes 30 steps. Check that the move can be done in the counts.
3. Leadership: a drum major, a section leader, a squad leader. Discuss what each does, such as a clear signal, safety and encouragement.
4. Goal setting: set a quarter goal, a weekly goal and a daily goal. For example: quarter goal is to play a two-octave major scale in all keys at 100; weekly goal is three keys; daily goal is 15 minutes.

## Checking for understanding

Ask: "How many steps is 25 yards at 8 to 5?" (40.)

## Exit ticket

Write a quarter goal and a weekly goal that lead to it.
`,
  reading: [
    "Designing a show and planning your own growth",
    `
A marching band show is designed on paper long before it appears on a field. A **drill designer** uses grid paper with the yard lines of a football field. The field is 100 yards between the goal lines, with a line every 5 yards and a hash mark on each side. Players are dots or letters, and each page of the chart shows one **set**, a formation such as a **block**, a **line**, a **circle** or a **diagonal**. The move from one set to the next takes a certain number of **counts**.

Step math makes sure that the design works. In an **8 to 5** step, 8 steps cover 5 yards. A move of 25 yards is five groups of five, so it takes 5 × 8 = 40 steps. In a **6 to 5** step, the same move takes 5 × 6 = 30 steps. If the move has only 24 counts, an 8 to 5 step is too long, so the designer picks 6 to 5 or shortens the move. When a design has players moving different distances in the same number of counts, those who go farther use longer steps. Good designers check every move before they teach it.

A show needs leaders. The **drum major** conducts the band from a podium and gives the starting signal. **Section leaders** and **squad leaders** help their groups learn and perform the drill. A good leader gives a clear signal, keeps people safe, helps others learn and stays positive when things go wrong.

To improve over a long period you need goals at several levels. A **quarter goal** is what you hope to reach at the end of the nine weeks, such as playing a two-octave major scale in all twelve keys at 100 beats per minute. A **weekly goal** breaks it into pieces: three keys each week. A **daily goal** is what you do in one session: 15 minutes of scale practice with a metronome. Keep your practice log up to date and review it every Friday. If you meet the weekly goal, raise the tempo. If you do not, look at the log to see why. Did you practice on the days you planned? Was the time too short? Then adjust the plan, not the goal.
`,
  ],
  cards: [
    ["Drill designer", "A person who plans where each player stands in each set."],
    ["Hash mark", "A short line on a football field used as a reference in drill."],
    ["Block", "A rectangular formation."],
    ["Diagonal", "A slanting line formation."],
    ["Drum major", "The student conductor of a marching band."],
    ["Squad leader", "A leader of a small group within a section."],
    ["Quarter goal", "A goal for the whole nine weeks."],
    ["Weekly goal", "A smaller goal that leads toward the quarter goal."],
  ],
  closed: [
    [
      "How many steps does it take to march 25 yards at 8 to 5?",
      ["25", "30", "40", "50"],
      "C",
    ],
    [
      "How many steps does it take to march 25 yards at 6 to 5?",
      ["25", "30", "40", "50"],
      "B",
    ],
    [
      "Who conducts a marching band from a podium?",
      ["The squad leader", "The drum major", "The tuba player", "The director in the stands"],
      "B",
    ],
    [
      "A quarter goal is:",
      [
        "What you want to reach by the end of the quarter",
        "A goal for one day",
        "A goal for ten years",
        "Not a real goal",
      ],
      "A",
    ],
    [
      "If you miss your weekly goal, what should you do first?",
      [
        "Give up",
        "Look at the log to see why and adjust the plan",
        "Change the quarter goal to something easy",
        "Skip practice",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A band must move 35 yards in 56 counts. Calculate the number of steps at 8 to 5 and at 6 to 5, and say which step size fits the counts if each count is one step.",
      scheme: [
        "Finds the number of five-yard groups, 35 divided by 5 = 7",
        "Calculates 7 times 8 = 56 steps at 8 to 5",
        "Calculates 7 times 6 = 42 steps at 6 to 5",
        "Says 8 to 5 fits exactly, 56 steps in 56 counts",
      ],
      model:
        "35 yards is 7 groups of five yards. At 8 to 5 the move takes 7 × 8 = 56 steps. At 6 to 5 it takes 7 × 6 = 42 steps. Since there are 56 counts and each count is one step, 8 to 5 fits exactly.",
      answers: [
        [
          "full",
          "[[0|35 / 5 = 7.]] [[1|7 × 8 = 56 steps at 8 to 5.]] [[2|7 × 6 = 42 steps at 6 to 5.]] [[3|The 8 to 5 move fits the 56 counts exactly.]]",
          "Full marks. You matched the number of steps to the number of counts.",
        ],
        [
          "full",
          "[[0|There are 7 five-yard groups.]] [[1|At 8 to 5 that is 56.]] [[2|At 6 to 5 that is 42.]] [[3|56 counts means 8 to 5 is the right one.]]",
          "All four marks. Clear and complete.",
        ],
        [
          "partial",
          "[[0|7 groups.]] [[1|7 × 8 = 56 at 8 to 5.]]",
          "Good so far. Do the 6 to 5 calculation and say which step size fits the counts.",
        ],
        [
          "partial",
          "[[1|56 steps at 8 to 5]] and [[2|42 at 6 to 5]]. Both fit.",
          "The numbers are right, but 42 steps in 56 counts leaves 14 counts over, so only 8 to 5 fits exactly.",
        ],
        [
          "weak",
          "35 steps because it is 35 yards.",
          "A step is not a yard. Divide the yards by 5 and multiply by the steps in each five-yard group.",
        ],
        [
          "weak",
          "35 + 56 = 91 steps.",
          "Adding the yards and counts does not give the steps. Use the ratio: steps = yards divided by 5 times the steps per group.",
        ],
      ],
    },
    {
      prompt:
        "Write a quarter goal, a weekly goal and a daily goal for your instrument that fit together, and explain how you will use your practice log to check them.",
      scheme: [
        "States a quarter goal that is specific and measurable",
        "States a weekly goal that leads to the quarter goal",
        "States a daily goal with minutes or a task",
        "Explains how the log is used to check progress",
      ],
      model:
        "Quarter goal: play all twelve major scales for two octaves at 100 beats per minute. Weekly goal: learn two new keys each week. Daily goal: 15 minutes of scales with a metronome. I will record each session in my log and review it on Friday to see if I met the weekly goal.",
      answers: [
        [
          "full",
          "[[0|Quarter: play all 12 major scales, two octaves, at 100 beats per minute.]] [[1|Weekly: two new keys a week.]] [[2|Daily: 15 minutes with the metronome.]] [[3|I will write the minutes and the key in my log and check on Friday.]]",
          "Full marks. The three goals are linked and measurable.",
        ],
        [
          "full",
          "[[0|By the end of the quarter I will play the chromatic scale for two octaves at 120.]] [[1|This week I will do it at 88.]] [[2|Today I will work on 10 minutes of it, three times through.]] [[3|My log will show the tempo each day so I can see progress.]]",
          "All four marks. Raising the tempo a little each week is a sensible path.",
        ],
        [
          "partial",
          "[[0|Quarter: play all scales.]] [[2|Daily: 15 minutes.]]",
          "Make the quarter goal measurable, such as a tempo, and add a weekly goal and a way to check the log.",
        ],
        [
          "partial",
          "[[1|Weekly: learn two keys.]] [[3|I will check my log.]]",
          "Good. Add a quarter goal that the weekly goal leads to, and a daily goal with minutes.",
        ],
        [
          "weak",
          "My goal is to be great at the end of the quarter.",
          "Great cannot be measured. Name a tempo, a scale or a passage, and break it into weekly and daily steps.",
        ],
        [
          "weak",
          "I do not need goals if I practice.",
          "Practice without goals is not as effective. Goals help you decide what to practice and show your progress.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Chord progressions, syncopation and a short jazz arrangement",
  note: `
## Objectives

Students will be able to:

1. compose or improvise a short melody using a given scale;
2. arrange a simple phrase for your instrument by changing rhythm or dynamics;
3. read and interpret key signatures, time signatures and musical terms.

## Materials

Staff paper, a piano, a backing track with a I-IV-V-I progression in B-flat, the problem set.

## Starter (6 minutes)

Play the chords B-flat, E-flat, F and B-flat on the piano. Ask: "Which chord sounds like home and which one makes you want to go back?"

## Main activity

1. Chords in a key: build triads on each degree of the B-flat major scale. The primary chords are I (B-flat), IV (E-flat) and V (F). Play a I-IV-V-I progression and notice the resolution.
2. Compose a melody over the progression: use the notes of each chord on the strong beats and passing notes in between.
3. Syncopation: accent the off-beats or place a rest on a strong beat. Clap a rhythm and add the syncopated one.
4. Arrange: write a jazz version of your melody by adding swing eighth notes (long-short), a walking bass line on the low brass, and an accent on beats 2 and 4.

## Checking for understanding

Ask: "Which chord is the V chord in B-flat?" (F major.)

## Exit ticket

Write the notes of the I, IV and V chords in B-flat major.
`,
  reading: [
    "Chords, off-beats and a little swing",
    `
So far you have written melodies using a scale. To write music that has harmony, think about **chords**. A **triad** is a chord of three notes built from every other note of a scale. In B-flat major, the triad built on the first note, the **I chord**, is B-flat, D, F. The triad on the fourth note, the **IV chord**, is E-flat, G, B-flat. The triad on the fifth note, the **V chord**, is F, A, C. The I, IV and V chords are the **primary chords**, and many tunes can be harmonized with just these three. Chords are written with **Roman numerals**, in capitals for major chords. A **chord progression** such as I-IV-V-I moves from home, away and back, creating tension and release.

To write a melody over a progression, use the notes of the current chord on the **strong beats**, beats 1 and 3, and fill the spaces with **passing notes** from the scale. A melody that follows the chord tones sounds natural and connected to the harmony.

**Syncopation** is placing emphasis on beats that are normally weak, or leaving a rest where you expect a strong beat. A rhythm with a rest on beat 1 and an accent on the "and" of 2 feels as though it is pulling against the beat. Syncopation is a key ingredient in jazz, funk and Latin music. To read it, count steadily and place each note carefully against the pulse.

Jazz has its own style. **Swing eighth notes** are played in a long-short pattern, as if each pair were the first and third notes of a triplet, rather than two equal notes. In a swing style, accents are placed on beats 2 and 4, and a **walking bass line** plays a note on each beat, moving by steps through the chord tones. Arranging your melody in a swing style means changing the rhythm, adding accents and giving the low brass the bass line.

Always check the **key and time signatures** and musical terms before you begin. A good arranger can describe in words what each change will sound like.
`,
  ],
  cards: [
    ["Triad", "A chord of three notes built from every other note of a scale."],
    ["I, IV, V", "The primary chords of a key."],
    ["Chord progression", "A series of chords played in order."],
    ["Strong beat", "A beat that normally receives emphasis, such as beats 1 and 3 in 4/4."],
    ["Passing note", "A note between two chord tones, moving by step."],
    ["Syncopation", "Emphasis on weak beats or rests on strong beats."],
    ["Swing eighths", "A long-short pattern of eighth notes used in jazz."],
    ["Walking bass", "A bass line that plays one note on each beat."],
  ],
  closed: [
    [
      "Which notes make the I chord in B-flat major?",
      ["B-flat, D, F", "E-flat, G, B-flat", "F, A, C", "C, E, G"],
      "A",
    ],
    [
      "What is the V chord in B-flat major?",
      ["E-flat major", "F major", "C major", "G minor"],
      "B",
    ],
    [
      "Syncopation is when:",
      [
        "All the notes are on the beat",
        "Emphasis is on weak beats or a strong beat has a rest",
        "The tempo is slow",
        "The piece is in minor",
      ],
      "B",
    ],
    [
      "How are swing eighth notes played?",
      [
        "Equal and even",
        "In a long-short pattern",
        "Very short",
        "Very soft",
      ],
      "B",
    ],
    [
      "In jazz, accents are often placed on:",
      ["Beats 1 and 3", "Beats 2 and 4", "Every beat equally", "Only the last beat"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write the I, IV and V chords in the key of B-flat major and explain how a I-IV-V-I progression creates tension and release.",
      scheme: [
        "Writes the I chord: B-flat, D, F",
        "Writes the IV chord: E-flat, G, B-flat",
        "Writes the V chord: F, A, C",
        "Explains that the music moves away from home and returns to the I chord, which feels resolved",
      ],
      model:
        "The I chord is B-flat, D, F. The IV chord is E-flat, G, B-flat. The V chord is F, A, C. In a I-IV-V-I progression, the music leaves the home chord, builds tension on the V chord, and returns to I, which feels like release.",
      answers: [
        [
          "full",
          "[[0|I = B-flat D F.]] [[1|IV = E-flat G B-flat.]] [[2|V = F A C.]] [[3|The progression goes away from home to IV and V, which builds tension, and then back to I which feels resolved.]]",
          "Full marks. All three chords are right and your explanation uses tension and release.",
        ],
        [
          "full",
          "[[0|B-flat major triad: Bb D F.]] [[1|E-flat major triad: Eb G Bb.]] [[2|F major triad: F A C.]] [[3|V is tense because it wants to go to I, and I feels like arriving home.]]",
          "All four marks. Explaining why V wants to go to I is the heart of the answer.",
        ],
        [
          "partial",
          "[[0|I is Bb D F.]] [[2|V is F A C.]] IV is Eb F Bb.",
          "I and V are right. IV is built on the fourth note, E-flat, with G and B-flat, not F.",
        ],
        [
          "partial",
          "[[0|B-flat, D, F.]] [[1|E-flat, G, B-flat.]] [[2|F, A, C.]]",
          "The three chords are right. Now explain how the progression creates tension and release.",
        ],
        [
          "weak",
          "I, IV and V are the first, fourth and fifth notes, so Bb, Eb and F.",
          "Those are the roots. A chord has three notes: add every other note above the root, such as D and F above B-flat.",
        ],
        [
          "weak",
          "The progression sounds the same all the way, there is no tension.",
          "The V chord creates tension because it wants to resolve to I. Listen to the change from V to I.",
        ],
      ],
    },
    {
      prompt:
        "Explain how you would arrange a simple melody in a swing jazz style, naming three changes to rhythm, accents and the bass line.",
      scheme: [
        "Says to play eighth notes as swing eighths, long-short",
        "Says to accent beats 2 and 4",
        "Says to add a walking bass line on the low instruments",
        "Says what effect the changes have, such as a relaxed, rolling feel",
      ],
      model:
        "I would play the eighth notes as swing eighths, in a long-short pattern, put the accents on beats 2 and 4, and give the low brass a walking bass line with one note on each beat. Together these give the music a relaxed, rolling jazz feel.",
      answers: [
        [
          "full",
          "[[0|Play the eighth notes long-short, swing eighths.]] [[1|Accent beats 2 and 4.]] [[2|Let the tubas and trombones play a walking bass line, one note per beat.]] [[3|It makes the music feel relaxed and rolling, like jazz.]]",
          "Full marks. Each change is correct and the effect is described.",
        ],
        [
          "full",
          "[[0|Change the rhythm to swing eighths.]] [[1|Put the accents on 2 and 4 instead of 1 and 3.]] [[2|Write a walking bass for the low brass.]] [[3|The result has the bounce and laid-back feel of swing.]]",
          "All four marks. Swapping the accents from 1 and 3 to 2 and 4 is the key idea.",
        ],
        [
          "partial",
          "[[0|Swing eighths.]] [[1|Accent 2 and 4.]]",
          "Both changes are right. Add the walking bass line and say what effect it all has.",
        ],
        [
          "partial",
          "[[2|A walking bass.]] Play it faster and louder.",
          "The walking bass is correct. Faster and louder does not make it swing. Use swing eighths and accents on beats 2 and 4.",
        ],
        [
          "weak",
          "Play every note the same and very short.",
          "Swing relies on a long-short pattern and on accents on beats 2 and 4, not on playing every note the same.",
        ],
        [
          "weak",
          "Jazz is just playing random notes.",
          "Jazz uses planned rhythms and chords. A swing arrangement has swing eighths, accents on 2 and 4, and a walking bass.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Form in larger works, and recording analysis with a detailed rubric",
  note: `
## Objectives

Students will be able to:

1. identify and describe the form of a piece of band music;
2. evaluate a recording of the band's performance using a rubric.

## Materials

A recording of a band work with a clear form (march with trio or a short overture), a listening map, a detailed rubric, the worksheet.

## Starter (6 minutes)

Play the first thirty seconds of a piece and ask students to predict how it might develop.

## Main activity

1. Forms in band music: a march (intro, first strain, second strain, trio, break strain), a theme and variations, a rondo (ABACA), and an overture (fast-slow-fast). Identify the cues that mark each section.
2. Listening map: mark each section by time on the recording, and name the key, tempo and instruments for each.
3. Detailed rubric: score tone, intonation, rhythm, dynamics, balance, articulation and ensemble precision from 1 to 4. Write one sentence of evidence for each, with a measure number or time.
4. Action plan: pick the two lowest scores, state the cause and write a rehearsal plan with a measurable target.

## Checking for understanding

Ask: "What is the trio of a march?" (A contrasting section, often softer and in a new key.)

## Exit ticket

Write one rubric score with evidence for our recording.
`,
  reading: [
    "Large-scale form and turning listening into a plan",
    `
Longer pieces of music hold together because of **form**. In a typical American **march** the form is: an **introduction**, a **first strain**, a **second strain**, then a **trio**, a contrasting section, usually in the key a fourth higher (the subdominant) and often softer, and finally a **break strain** and a final repeat of the trio. A **rondo** brings back the main theme again and again, in the pattern A-B-A-C-A. A **theme and variations** repeats one theme with changes. An **overture** is an opening piece, often in a fast-slow-fast pattern. Understanding form helps you shape your performance, because you know where a section ends and a new one begins, and you can prepare the right character.

To study form while listening, use a **listening map** with times. Write the time when each section starts, name the key (if you can hear it), the tempo, the dynamic level and the instruments in the lead. For a march, the trio is easy to hear: the music becomes smoother, and the low brass often takes a melody.

The same careful listening applies to our own recordings. A **detailed rubric** has categories for **tone**, **intonation**, **rhythm**, **dynamics**, **balance**, **articulation** and **ensemble precision**, which is how well the group plays together in entrances, cut-offs and tempo. Score each from 1 to 4 and write a line of **evidence**, such as "Articulation 2: the staccato in measures 9 to 16 was too long in the trumpets". Once the scores are in, find the two lowest and find the **cause**. The cause of poor ensemble precision might be that players are not watching the conductor, or that the tempo was not set clearly. Then write an **action plan** with a **measurable target**. For instance: "In the next rehearsal, the band will play measures 9 to 16 with the metronome at 112 and the trumpets will shorten their staccato; we will record and rescore it."

The point of all of this is that listening carefully, and acting on what you hear, is what turns a good band into a better one.
`,
  ],
  cards: [
    ["Strain", "A section of a march, usually 16 or 32 bars."],
    ["Trio", "A contrasting section in a march, often softer and in a new key."],
    ["Break strain", "A lively section after the trio in a march."],
    ["Rondo", "A form in which the main theme returns, as in A-B-A-C-A."],
    ["Overture", "An opening piece, often fast-slow-fast."],
    ["Ensemble precision", "How well the group plays together in entrances, cut-offs and tempo."],
    ["Cause", "The reason a problem happens."],
    ["Action plan", "Specific steps to fix a problem with a way to measure success."],
  ],
  closed: [
    [
      "In a march, the trio is usually:",
      [
        "A very loud finale",
        "A contrasting section, often softer and in a new key",
        "An introduction",
        "A drum solo",
      ],
      "B",
    ],
    [
      "Which form is A-B-A-C-A?",
      ["Binary", "Rondo", "Theme and variations", "Overture"],
      "B",
    ],
    [
      "A listening map with times helps you to:",
      [
        "Find where each section begins and what changes",
        "Tune your instrument",
        "Count the audience",
        "Choose a conductor",
      ],
      "A",
    ],
    [
      "Which is the best evidence for a score?",
      [
        "It was not good",
        "Articulation 2: the staccato in measures 9 to 16 was too long in the trumpets",
        "I like the band",
        "The conductor was too fast",
      ],
      "B",
    ],
    [
      "What should an action plan include?",
      [
        "A measurable target",
        "A new instrument",
        "A new uniform",
        "A longer concert",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the form of a typical American march and explain how a listener can recognize the trio.",
      scheme: [
        "Names the sections: introduction and strains",
        "Names the trio and the break strain",
        "Says the trio is a contrasting section, often softer and in a new key",
        "Says a listener can hear the change in smoothness, key or instruments",
      ],
      model:
        "A typical march has an introduction, a first strain and a second strain, then the trio, then a break strain and a return to the trio. The trio is a contrasting section, often softer and in a new key. A listener can hear it because the music becomes smoother and the low brass often takes the melody.",
      answers: [
        [
          "full",
          "[[0|A march starts with an introduction and then the first and second strains.]] [[1|Then there is the trio and after it a break strain.]] [[2|The trio contrasts with the strains, it is usually softer and in a new key.]] [[3|You can hear the music get smoother and the low brass play the tune.]]",
          "Full marks. You described both the form and how to hear it.",
        ],
        [
          "full",
          "[[0|Intro, first strain, second strain.]] [[1|Trio, then a break strain.]] [[2|The trio is a change of key and often quieter.]] [[3|It sounds more singing and relaxed than the strains.]]",
          "All four marks. Relaxed is a good word for the usual feel of a trio.",
        ],
        [
          "partial",
          "[[0|Introduction and strains.]] [[1|Then the trio.]]",
          "The sections are right. Add what makes the trio different and how a listener can recognize it.",
        ],
        [
          "partial",
          "[[2|The trio is softer and in a new key.]] A march has only one part.",
          "The trio is described well. A march has several sections: an introduction, two strains, the trio and a break strain.",
        ],
        [
          "weak",
          "A march is a song with three people singing.",
          "A trio in a march is a contrasting section of the piece, not three singers.",
        ],
        [
          "weak",
          "The trio is the loudest part of the march.",
          "The trio is usually softer and smoother than the strains, which is why it contrasts.",
        ],
      ],
    },
    {
      prompt:
        "Choose two categories from the detailed rubric where the band scored lowest. Give a score and evidence for each, name a cause for one, and write an action plan with a measurable target.",
      scheme: [
        "Names two categories with scores",
        "Gives specific evidence for each score",
        "Names a cause for one of the problems",
        "Writes an action plan with a measurable target",
      ],
      model:
        "Intonation, score 2: the flutes were sharp on the long note in measure 12. Ensemble precision, score 2: entrances in measure 17 were not together because players were not watching the conductor. Action plan: tune the flutes to the clarinets before measure 12 and rehearse the entrance with eyes on the conductor; record again and score both at 3 or above.",
      answers: [
        [
          "full",
          "[[0|Intonation 2 and ensemble precision 2.]] [[1|The flutes were sharp on the long note in measure 12, and the entrance at 17 was ragged.]] [[2|The cause was that people were looking at the music rather than the conductor.]] [[3|Plan: tune before 12, practice the entrance with eyes up, record again and get both to a 3.]]",
          "Full marks. The plan has a clear target and a way to check it.",
        ],
        [
          "full",
          "[[0|Balance 2, articulation 2.]] [[1|Trombones covered the melody in measures 20 to 24, and the staccato in the trumpets was too long in measures 9 to 16.]] [[2|The cause for the balance was that the trombones played forte instead of mezzo piano.]] [[3|Next time they play mp, the trumpets shorten the staccato, and we record to check for a 3.]]",
          "All four marks. Each score has evidence and the plan is measurable.",
        ],
        [
          "partial",
          "[[0|Balance 2 and dynamics 2.]] [[1|The melody was hard to hear in the middle.]]",
          "You have two categories and some evidence. Name measure numbers, a cause, and a measurable action plan.",
        ],
        [
          "partial",
          "[[0|Rhythm 2, tone 3.]] [[3|We will practice more and do better.]]",
          "A plan needs a target that can be checked, such as a tempo or a score, and evidence for each score. Tone 3 is not a low score, so choose your lowest two.",
        ],
        [
          "weak",
          "Everything was fine so I gave all fours.",
          "Use the recording as evidence. There is almost always something that can be improved, and the rubric asks for the two lowest.",
        ],
        [
          "weak",
          "I do not like the sound of the recording.",
          "That is an opinion. Name a category, a score and what you heard in a specific measure.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Comparing professional recordings, and the history of the American band movement",
  note: `
## Objectives

Students will be able to:

1. listen to a professional performance and compare it with ours;
2. explain the history and style of a piece we are rehearsing.

## Materials

Two professional recordings of the same piece, a comparison chart, a timeline of American band history, the worksheet.

## Starter (6 minutes)

Play thirty seconds of two different recordings of the same piece. Ask: "Which do you prefer? What exactly is different?"

## Main activity

1. Compare interpretations: tempo, dynamics, articulation, phrasing and balance in two recordings. A different interpretation is not necessarily better or worse, but it can teach different ideas.
2. Apply to our band: decide on two changes to try, and record the result.
3. History: military bands in the 1800s; Patrick Gilmore and the Civil War era; John Philip Sousa and the Marine Band; the rise of the American school band after World War I; Percy Grainger and Gustav Holst (early 1900s) for wind band music.
4. Style: in the piece we are rehearsing, describe the style (march, lyrical, jazz-influenced) and why the composer wrote it.

## Checking for understanding

Ask: "What are two reasons two professional bands can sound different on the same piece?" (Different tempo or interpretation.)

## Exit ticket

Name one change you will try after comparing the recordings.
`,
  reading: [
    "Interpretation, and where the American band comes from",
    `
When two professional bands play the same piece, the notes are the same, but the performances can be very different. The difference is **interpretation**. A conductor may choose a faster tempo, a softer opening, a longer pause, a more detached articulation or a different balance. Neither one is necessarily right or wrong. Listening to several recordings shows you the choices that are possible and helps you decide on your own. Use a chart for **tempo**, **dynamics**, **articulation**, **phrasing** and **balance**, and write down what is different, then decide what you would try with our band.

It also helps to know the history of the music you play. The wind band has a long history in the United States. In the 1800s, **military bands** played at drills, parades and ceremonies. During the Civil War era, bandleaders such as **Patrick Gilmore** led large and popular bands. Later **John Philip Sousa**, who led the United States Marine Band and then his own civilian band, made the march a national art form. In the early twentieth century, composers such as **Gustav Holst** in England and **Percy Grainger** in the United States and Australia wrote serious works for wind band, which helped the band gain a place in concert halls. After World War I, school and community bands spread across America, and many of the high school bands of today grew from that movement.

When we rehearse a piece, learn about its **style** and the reason it was written. Was it a march for parades? A lyrical piece for a concert? A piece influenced by jazz or folk tunes? Knowing the style tells you how to play it: precise and crisp for a march, smooth and expressive for a lyrical work, relaxed and swinging for jazz.

Playing with understanding makes the music more meaningful for you and for the audience.
`,
  ],
  cards: [
    ["Interpretation", "A performer's personal choices about how to play a piece."],
    ["Military band", "A band attached to the armed forces, often playing for drills and ceremonies."],
    ["Patrick Gilmore", "A nineteenth-century American bandleader who led large popular bands."],
    ["Gustav Holst", "An English composer who wrote important works for wind band."],
    ["Percy Grainger", "A composer who wrote notable music for wind band."],
    ["Style", "The character of a piece, such as march, lyrical or jazz."],
    ["Phrasing", "How a musical line rises and falls like a sentence."],
    ["School band movement", "The growth of school bands in the United States after World War I."],
  ],
  closed: [
    [
      "Why can two professional bands sound different playing the same piece?",
      [
        "They use different notes",
        "They make different interpretive choices",
        "One is out of tune",
        "One is lost",
      ],
      "B",
    ],
    [
      "Which composer led the United States Marine Band and was called the March King?",
      ["Gustav Holst", "John Philip Sousa", "Percy Grainger", "Patrick Gilmore"],
      "B",
    ],
    [
      "Which style needs a precise, crisp sound?",
      ["A lyrical piece", "A march", "A lullaby", "A hymn"],
      "B",
    ],
    [
      "What helped school bands spread across the United States?",
      [
        "The invention of the radio only",
        "A growth in school and community bands after World War I",
        "Banning marches",
        "The closing of schools",
      ],
      "B",
    ],
    [
      "When comparing two recordings, a chart helps because:",
      [
        "It makes the recording shorter",
        "It records specific features such as tempo and balance",
        "It gives a score",
        "It tunes the band",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Two professional recordings of the same march differ in tempo and articulation. Explain how you would compare them on a chart and what you would try with our band.",
      scheme: [
        "Says to listen to both and fill in a chart",
        "Names tempo as a category and what to note, such as beats per minute",
        "Names articulation as a category and what to note",
        "Says what the band will try as a result",
      ],
      model:
        "I would listen to both recordings and fill in a chart. For tempo I would note the speed, perhaps 112 beats per minute in one and 124 in the other. For articulation I would note that one plays the staccato notes shorter. Our band could try the faster tempo with the metronome and shorter staccato.",
      answers: [
        [
          "full",
          "[[0|I would listen to both and write on the chart.]] [[1|Tempo: one is at 112 beats per minute and the other is faster.]] [[2|Articulation: one band plays the short notes very short and crisp.]] [[3|We would try the crisp articulation and a slightly faster tempo with the metronome.]]",
          "Full marks. Writing the actual tempos makes the chart useful.",
        ],
        [
          "full",
          "[[0|Listen twice and fill in each box.]] [[1|Note the tempo of each with a metronome app.]] [[2|Note how long the staccato notes are.]] [[3|Then we try the one we like at rehearsal and record ourselves.]]",
          "All four marks. Recording your own attempt closes the loop.",
        ],
        [
          "partial",
          "[[0|Listen to both.]] [[1|Compare tempo.]]",
          "Good. Add articulation and what the band will try.",
        ],
        [
          "partial",
          "[[2|One has shorter notes.]] [[3|We will try that.]]",
          "Add the tempo comparison and the chart, and say how you would try it in rehearsal.",
        ],
        [
          "weak",
          "I would choose the one I like and copy it exactly.",
          "Copying exactly does not build your own understanding. Compare specific features and try one or two ideas.",
        ],
        [
          "weak",
          "One of them must be wrong.",
          "Interpretation is a choice. Both can be right, and comparing them shows different ideas.",
        ],
      ],
    },
    {
      prompt:
        "Describe two important moments in the history of the American band, explaining who or what was involved and why it mattered.",
      scheme: [
        "Names a first moment or person, such as military bands or Gilmore",
        "Explains why it mattered",
        "Names a second moment or person, such as Sousa or the school band movement",
        "Explains why the second mattered",
      ],
      model:
        "Military bands in the 1800s played at drills and parades, which made band music familiar to many Americans. John Philip Sousa led the Marine Band and wrote marches that made the march an American art form. After World War I, school bands spread across the country, which created the school music programs we have today.",
      answers: [
        [
          "full",
          "[[0|Military bands played at parades and ceremonies in the 1800s.]] [[1|This made band music popular and familiar.]] [[2|John Philip Sousa led the Marine Band and wrote marches.]] [[3|His marches made the march an American art form that bands still play.]]",
          "Full marks. Each moment is tied to a reason it mattered.",
        ],
        [
          "full",
          "[[0|Patrick Gilmore led huge popular bands around the time of the Civil War.]] [[1|People got used to going to band concerts.]] [[2|After World War I, school bands spread across the country.]] [[3|That is why we have school band programs like ours.]]",
          "All four marks. Linking history to our own band program is a strong ending.",
        ],
        [
          "partial",
          "[[0|Military bands.]] [[2|Sousa.]]",
          "You named two moments. Explain who or what was involved and why each mattered.",
        ],
        [
          "partial",
          "[[2|Sousa wrote marches.]] [[3|They are still played today.]]",
          "Good second moment. Add a first moment, such as military bands or the school band movement, and why it mattered.",
        ],
        [
          "weak",
          "Bands started in 2005 when school got a new director.",
          "Bands in the United States have a long history, starting with military bands in the 1800s.",
        ],
        [
          "weak",
          "Bands were invented by Mozart.",
          "Mozart wrote orchestral music. American bands developed from military bands in the 1800s and later grew in schools.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Metric modulation, ratios in tuning and music after high school",
  note: `
## Objectives

Students will be able to:

1. relate musical patterns to mathematics, such as fractions and ratios in rhythm;
2. describe the role of music in your community and how you can take part in it.

## Materials

Calculators, a metronome, a frequency chart, a list of music paths (college ensembles, community groups, careers), the worksheet.

## Starter (6 minutes)

Play A at 440 hertz on a tuner and the A an octave above at 880. Ask: "What is the ratio of the two frequencies?" (2 to 1.)

## Main activity

1. Frequency ratios: an octave is 2:1, a perfect fifth is 3:2, a perfect fourth is 4:3. Calculate the frequency of a fifth above A 440 (660 hertz).
2. Tempo and duration: duration = measures × beats per measure ÷ beats per minute. Calculate several, including pieces with a tempo change.
3. Changing meter: if the quarter note stays constant, a measure of 3/4 has 3 beats and a measure of 6/8 has 2 big beats. Compare.
4. Music after high school: college ensembles (open to non-majors), community bands, military bands, teaching, music business, music therapy, sound design. Choose one path and plan the first step.

## Checking for understanding

Ask: "What is the frequency of the A one octave below A 440?" (220 hertz.)

## Exit ticket

Calculate the frequency of the note a perfect fifth above A 440.
`,
  reading: [
    "The mathematics inside music, and where music can take you",
    `
Music and mathematics are close partners. Every pitch is a **frequency**, the number of vibrations each second, measured in **hertz (Hz)**. The note that tuners use as a standard, the A above middle C, is 440 hertz. When two notes are in a simple **ratio** of frequencies, they sound good together. An **octave** is a ratio of 2 to 1: the A one octave above is 880 hertz, and the A one octave below is 220 hertz. A **perfect fifth** is a ratio of 3 to 2, so the note a fifth above A 440 has a frequency of 440 × 3/2 = 660 hertz. A **perfect fourth** is 4 to 3, so a fourth above A 440 is 440 × 4/3, about 587 hertz. The simplest ratios sound the most stable, which is part of why octaves and fifths are the basis of tuning.

Rhythm is also mathematical. **Duration** is calculated from the number of measures, the beats in a measure and the tempo. A piece of 120 measures of 3/4 at 90 beats per minute has 360 beats and lasts 360 ÷ 90 = 4 minutes. If a piece changes tempo, calculate each section separately and add the times. A section of 40 measures of 4/4 at 120 lasts 160 ÷ 120 = 1 minute 20 seconds. A second section of 24 measures of 4/4 at 96 lasts 96 ÷ 96 = 1 minute. The total is 2 minutes 20 seconds.

After high school, music can take many forms. Many colleges have **band and orchestra ensembles open to non-majors**, so you can keep playing whatever you study. **Community bands** welcome adults of every age. **Military bands** are professional ensembles in the armed forces. Some people become **music teachers**, **music therapists**, **sound designers** or work in the **music business**. Others simply keep music as a lifelong hobby. A good first step is to find one group in your area, check how to join and attend a rehearsal.

Whatever path you choose, the habits you have built, careful listening, practice, teamwork and attention to detail, will serve you well.
`,
  ],
  cards: [
    ["Frequency", "The number of vibrations per second, measured in hertz."],
    ["Hertz (Hz)", "A unit of frequency: one vibration per second."],
    ["Octave", "An interval with a frequency ratio of 2 to 1."],
    ["Perfect fifth", "An interval with a frequency ratio of 3 to 2."],
    ["Perfect fourth", "An interval with a frequency ratio of 4 to 3."],
    ["Duration", "How long a piece lasts: beats divided by beats per minute."],
    ["Community band", "A band of volunteers of all ages in a community."],
    ["Music therapy", "Using music to improve health and well-being."],
  ],
  closed: [
    [
      "What is the frequency of the A one octave above A 440?",
      ["220 hertz", "660 hertz", "880 hertz", "1,320 hertz"],
      "C",
    ],
    [
      "A perfect fifth above A 440 is about:",
      ["550 hertz", "660 hertz", "770 hertz", "880 hertz"],
      "B",
    ],
    [
      "A piece of 120 measures of 3/4 at 90 beats per minute lasts:",
      ["2 minutes", "3 minutes", "4 minutes", "6 minutes"],
      "C",
    ],
    [
      "Which of these is an octave ratio?",
      ["3 to 2", "4 to 3", "2 to 1", "5 to 4"],
      "C",
    ],
    [
      "Which is a path for music after high school?",
      [
        "Joining a community band",
        "Giving up music forever",
        "Only listening to radio",
        "Never practicing again",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Calculate the frequency of the note a perfect fifth above A 440 and the note an octave below A 440, and explain how the ratios relate to the intervals.",
      scheme: [
        "Uses the 3 to 2 ratio for the fifth",
        "Calculates 440 × 3/2 = 660 hertz",
        "Uses the 2 to 1 ratio and calculates 440 ÷ 2 = 220 hertz for the octave below",
        "Names the intervals: fifth is 3:2 and octave is 2:1",
      ],
      model:
        "A perfect fifth is a ratio of 3 to 2, so the note a fifth above A 440 is 440 × 3/2 = 660 hertz. An octave is 2 to 1, so the A an octave below is 440 ÷ 2 = 220 hertz.",
      answers: [
        [
          "full",
          "[[0|A fifth is 3 to 2.]] [[1|440 × 3/2 = 660 hertz.]] [[2|An octave below is half, 440 / 2 = 220 hertz.]] [[3|So a fifth is the ratio 3:2 and an octave is 2:1.]]",
          "Full marks. The ratios are right and the arithmetic is clear.",
        ],
        [
          "full",
          "[[0|For the fifth I multiply by 3/2.]] [[1|440 × 1.5 = 660 Hz.]] [[2|For the octave below I divide by 2, so 220 Hz.]] [[3|The fifth ratio is 3:2 and the octave ratio is 2:1.]]",
          "All four marks. Using the decimal 1.5 gives the same result and is easy to check.",
        ],
        [
          "partial",
          "[[1|660 hertz for the fifth.]] [[2|220 for the octave below.]]",
          "The answers are right. Show the calculations and name the ratios, 3 to 2 and 2 to 1.",
        ],
        [
          "partial",
          "[[0|A fifth is 3 to 2.]] 440 + 3/2 = 441.5 hertz.",
          "The ratio is right. You must multiply by 3/2, not add: 440 × 3/2 = 660.",
        ],
        [
          "weak",
          "A fifth is five notes above, so 440 + 5 = 445.",
          "A fifth is a ratio of 3 to 2, so you multiply the frequency by 1.5.",
        ],
        [
          "weak",
          "An octave below is double the frequency, 880.",
          "An octave below is half the frequency, 220 hertz. Double is an octave above.",
        ],
      ],
    },
    {
      prompt:
        "A piece has two sections. Section 1 is 48 measures of 4/4 at 96 beats per minute. Section 2 is 30 measures of 3/4 at 90 beats per minute. Find the total length in minutes and seconds.",
      scheme: [
        "Calculates the beats in section 1, 48 × 4 = 192",
        "Calculates the duration of section 1: 192 ÷ 96 = 2 minutes",
        "Calculates section 2: 30 × 3 = 90 beats, and 90 ÷ 90 = 1 minute",
        "Adds the sections for a total of 3 minutes",
      ],
      model:
        "Section 1 has 48 × 4 = 192 beats, so it lasts 192 ÷ 96 = 2 minutes. Section 2 has 30 × 3 = 90 beats, so it lasts 90 ÷ 90 = 1 minute. The total length is 3 minutes.",
      answers: [
        [
          "full",
          "[[0|Section 1: 48 × 4 = 192 beats.]] [[1|192 / 96 = 2 minutes.]] [[2|Section 2: 30 × 3 = 90 beats, 90 / 90 = 1 minute.]] [[3|2 + 1 = 3 minutes total.]]",
          "Full marks. Each section is calculated separately and then added.",
        ],
        [
          "full",
          "[[0|First part has 192 beats.]] [[1|At 96 per minute that is 2 minutes.]] [[2|Second part has 90 beats at 90 per minute, 1 minute.]] [[3|The piece is 3 minutes.]]",
          "All four marks. Clear and concise.",
        ],
        [
          "partial",
          "[[0|192 beats in section 1.]] [[1|2 minutes.]]",
          "Section 1 is right. Calculate section 2 and add the two.",
        ],
        [
          "partial",
          "[[2|Section 2 is 90 beats, so 1 minute.]] Section 1 is 48 minutes.",
          "Section 2 is right. For section 1, find the beats first (192) and then divide by the tempo, 96, to get 2 minutes.",
        ],
        [
          "weak",
          "48 + 30 = 78 measures, so 78 minutes.",
          "A measure is not a minute. Find the beats in each section and divide by its tempo.",
        ],
        [
          "weak",
          "Average the tempos and use it for the whole piece.",
          "The tempos differ between sections, so calculate each one and add the times.",
        ],
      ],
    },
  ],
};

writeCourse("band-grade-11.json", "Band", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
