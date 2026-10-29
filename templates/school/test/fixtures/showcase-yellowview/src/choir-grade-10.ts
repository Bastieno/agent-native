import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Choir, Grade 10, Quarter 1. National Core Arts Standards, Music, in the
 * school's own words. The second-year choir: three-part singing, voice parts
 * and ranges, intervals and minor keys, singing in German and Hebrew, a
 * concert plan with a solo or ensemble feature, a Renaissance madrigal, and
 * choral music across styles. No practicals.
 */

const w1: WeekInput = {
  topic: "Voice parts, ranges and warm-ups for three-part singing",
  note: `
## Objectives

Students will be able to:

1. sing with correct posture, breath support and a healthy tone;
2. warm up the voice with exercises for range, resonance and diction;
3. sing your part in unison and in two-part or three-part harmony with accurate pitch.

## Materials

Keyboard, a range chart, copies of a three-part arrangement (SSA or SAB), the worksheet.

## Starter (6 minutes)

Siren from your lowest comfortable note to your highest and back. Ask: "Where does your voice feel the most comfortable?"

## Main activity

1. Voice parts: soprano and alto (higher voices), tenor and bass (lower voices). A voice part is chosen by the range where the voice is comfortable and the color of the tone. Teens may be changing, so some singers are baritones or midvoices.
2. Warm-up routine: breath (hiss on eight counts), range (sirens and five-note scales), resonance (humming into "ng" and "ah"), diction (tongue twisters).
3. Three-part singing: learn one line of a three-part arrangement. Sing alone on your part, then in pairs, then in the full group, listening to the chord.
4. Voice care: during a voice change, sing in a comfortable range, do not push high or low, and ask for help.

## Checking for understanding

Ask: "How do you find your best voice part?" (By the range where the voice is comfortable and the tone is free.)

## Exit ticket

Write the four voice parts from highest to lowest.
`,
  reading: [
    "Finding your voice part, and singing three parts",
    `
A mixed choir is divided into **voice parts**. The higher parts are **soprano** and **alto**, and the lower parts are **tenor** and **bass**. A voice part is assigned according to the **range** where your voice is most comfortable, and the **color** or quality of your tone, not just how high or low you can force your voice to go. Some choirs also use three-part arrangements, such as **SSA** (two soprano lines and an alto), **SAB** (soprano, alto and bass) or **TTB** (two tenor lines and a bass).

During your teen years your voice may change. This is natural, and it varies from person to person. If your voice is changing, sing in the range that feels comfortable, do not push for high or low notes, and talk to your director. Many singers find that the range moves several times, and some will be **baritones** or **midvoices** who sing in the middle between the higher and lower parts.

A good **warm-up** gets your breath, range, resonance and diction ready. Begin with **breath**: a slow hiss for eight counts, then ten. Next, **range**: a siren, and a five-note scale that moves up and down by half steps. Then **resonance**: hum on "ng," then open to "ah," feeling the vibration in the front of your face. Last, **diction**: tongue twisters and crisp consonants. Sing quietly at first and increase the volume only when the voice is warm.

When you sing in **three parts**, the biggest skill is listening. Learn your line alone first, on a neutral syllable, with the keyboard for support. Then sing it with a partner who has a different part, and hold your own line even when it differs from theirs. When the full group sings, listen for the **chord**, the sound made by all three parts together. A chord sounds best when all three notes are in tune and balanced. If the sound is harsh, check your pitch.

Learning a part well means you can sing it with confidence in front of an audience, and that you can help others who sit near you.
`,
  ],
  cards: [
    ["Soprano", "The highest voice part."],
    ["Alto", "A lower female or boys' voice part, below the soprano."],
    ["Tenor", "A higher male voice part."],
    ["Bass", "The lowest voice part."],
    ["Baritone", "A middle male voice, between tenor and bass."],
    ["SAB", "A three-part arrangement for soprano, alto and bass."],
    ["Chord", "Three or more notes sounded together."],
    ["Voice change", "The natural change in the range and tone of a teenager's voice."],
  ],
  closed: [
    [
      "Which list shows the voice parts from highest to lowest?",
      [
        "Bass, tenor, alto, soprano",
        "Soprano, alto, tenor, bass",
        "Alto, soprano, bass, tenor",
        "Tenor, soprano, bass, alto",
      ],
      "B",
    ],
    [
      "How should you choose your voice part?",
      [
        "By the highest note you can reach",
        "By the range where your voice is comfortable and the color of your tone",
        "By your friends' choice",
        "By your height",
      ],
      "B",
    ],
    [
      "What should you do if your voice is changing?",
      [
        "Push hard to reach the high notes",
        "Sing in a comfortable range and talk to your director",
        "Stop singing forever",
        "Only whisper",
      ],
      "B",
    ],
    [
      "A baritone sings:",
      [
        "The highest part",
        "In the middle between higher and lower male parts",
        "Only solos",
        "Only the melody",
      ],
      "B",
    ],
    [
      "In three-part singing, the most important skill is:",
      ["Singing the loudest", "Listening to the chord", "Skipping rehearsals", "Singing alone"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how a singer finds the right voice part and what to do if the voice is changing.",
      scheme: [
        "Says the part is chosen by comfortable range",
        "Says the part is also chosen by the color of the tone",
        "Says that during a voice change the singer should sing in a comfortable range and not push",
        "Says to talk to the director or ask for help",
      ],
      model:
        "A voice part is chosen by the range where the voice is most comfortable and by the color of the tone. If the voice is changing, the singer should stay in a comfortable range and not push for high or low notes, and should talk to the director.",
      answers: [
        [
          "full",
          "[[0|You find the range where your voice feels comfortable.]] [[1|You also listen to the color of your tone, whether it is lighter or darker.]] [[2|If my voice is changing I sing where it is easy and do not push.]] [[3|I would tell my director.]]",
          "Full marks. All four points are accurate.",
        ],
        [
          "full",
          "[[0|The part depends on where your voice is comfortable and free.]] [[1|Also the quality of the sound matters, not only how high you can go.]] [[2|With a changing voice you stay in a comfortable range and never strain.]] [[3|You ask the director for help.]]",
          "All four marks. Not straining during a voice change is the most important advice.",
        ],
        [
          "partial",
          "[[0|By the notes you can sing comfortably.]] [[3|Ask the director.]]",
          "Add the color of the tone and what to do while the voice is changing.",
        ],
        [
          "partial",
          "[[0|Where it is comfortable.]] If my voice is changing I should reach for higher notes to keep my range.",
          "Do not push for higher notes during a change, because that can strain the voice. Sing in a comfortable range.",
        ],
        [
          "weak",
          "The director picks the part and it does not matter how it feels.",
          "The director listens to find where the voice is comfortable. If a part is uncomfortable, you should say so.",
        ],
        [
          "weak",
          "Everyone sings the highest part so it sounds good.",
          "A choir needs all parts. Each singer is placed where their voice is comfortable.",
        ],
      ],
    },
    {
      prompt:
        "Describe a routine for learning a new line in a three-part arrangement, from learning alone to singing with the whole group.",
      scheme: [
        "Learns the line alone first, on a neutral syllable",
        "Sings it with a partner with a different part",
        "Holds the line while listening to the other parts",
        "Sings with the full group and listens for the chord",
      ],
      model:
        "First I learn my line alone on a neutral syllable with the keyboard. Then I sing it with a partner who has a different part. I hold my line while I listen to theirs. Then I sing with the full group and listen for the chord, checking that my pitch is in tune.",
      answers: [
        [
          "full",
          "[[0|I learn my line by myself on a vowel with the keyboard.]] [[1|Then I sing it with a partner on a different part.]] [[2|I keep my line even when it is different from theirs and listen.]] [[3|Then I sing with the whole group and listen for the chord.]]",
          "Full marks. Each step builds toward the full ensemble.",
        ],
        [
          "full",
          "[[0|Learn it alone on a neutral syllable first.]] [[1|Pair up with someone on another part.]] [[2|Hold my part and listen to theirs.]] [[3|Join the group and tune the chord.]]",
          "All four marks. A good order from solo to group.",
        ],
        [
          "partial",
          "[[0|Learn it alone.]] [[3|Sing with the group.]]",
          "Add the step with a partner and the listening for the chord.",
        ],
        [
          "partial",
          "[[1|Sing with a partner.]] [[2|Follow the other person's part.]]",
          "Follow your own line, not theirs. Learn it alone first and hold it even when it differs.",
        ],
        [
          "weak",
          "Wait for the others to sing and then copy them.",
          "Copying means you do not learn your own line. Learn it first, then add the other parts.",
        ],
        [
          "weak",
          "Sing as loudly as you can so you hear your part.",
          "Loud singing makes it harder to hear the other parts. Sing at a moderate volume and listen to the chord.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Intervals, tuning chords and following a conductor in minor keys",
  note: `
## Objectives

Students will be able to:

1. match pitch and blend with the section in major and minor;
2. follow a conductor's gestures for tempo, dynamics and cut-offs.

## Materials

Keyboard, an interval chart, a short minor-key piece, the worksheet.

## Starter (6 minutes)

Sing a major triad (do, mi, sol) slowly and then change the middle note down a half step. Ask: "What changed in the mood?"

## Main activity

1. Intervals: the distance between two notes. A unison is the same note, a third has three letter names, a fifth five. Sing do-mi-sol and name the thirds and fifths.
2. Minor chords: lower the third of a major triad by a half step to make a minor triad. Sing do-me-sol and notice the sadder sound. Tune the chords by listening for beats.
3. Conductor gestures: fermata (hold), ritardando (slow), cut-off, and a hand that shows a crescendo or a decrescendo.
4. Practice a short minor-key piece with ritardando and fermata, following the conductor.

## Checking for understanding

Ask: "What does a fermata tell you?" (Hold the note longer than written.)

## Exit ticket

Name the notes of the A minor triad.
`,
  reading: [
    "Intervals, minor chords and watching more closely",
    `
An **interval** is the distance between two notes. When two singers sing the same note, the interval is a **unison**. When they sing notes that are three letter names apart, such as C and E, the interval is a **third**. When they are five letter names apart, such as C and G, it is a **fifth**. Intervals can sound bright or dark depending on their type.

A **triad** is a chord of three notes built from a root, a third and a fifth. In a **major triad**, such as C-E-G, the third is a major third above the root, and the sound is bright. A **minor triad** lowers the third by a half step, so C-E-flat-G. In solfege, do-mi-sol is major, and do-me-sol is minor. A minor chord sounds more serious or sad. Minor keys have their own key signatures: A minor has no sharps or flats, and D minor has one flat. Many beautiful choral songs are in minor keys.

To **tune a chord**, listen for **beats**, the wobble that happens when two pitches are slightly different. A good chord has very slow or no beats. In a major chord the third is often sung a little lower than the keyboard plays it, and the fifth a little higher. Your ear will learn this with practice. Always tune from the bottom up: the bass singers set the root, the middle voices fit to it, and the top voice matches.

The conductor has more than the beat to show. A **fermata** (a curved sign over a note) tells you to hold the note longer than its written length, until the conductor gives a cut-off. A **ritardando** is a gradual slowing down. A **crescendo** or **decrescendo** can be shown with the left hand rising or falling. A **cut-off** ends a note. Keep your eyes on the conductor, because many of these gestures are not written in the music.

By listening carefully and watching closely, you will make the choir's sound unified and expressive.
`,
  ],
  cards: [
    ["Interval", "The distance between two notes."],
    ["Third", "An interval spanning three letter names, such as C to E."],
    ["Fifth", "An interval spanning five letter names, such as C to G."],
    ["Major triad", "A chord with a root, a major third and a fifth."],
    ["Minor triad", "A chord with a root, a minor third and a fifth."],
    ["Fermata", "A sign telling you to hold a note longer."],
    ["Ritardando", "Gradually slowing down."],
    ["Cut-off", "A signal to stop a note together."],
  ],
  closed: [
    [
      "Which chord is built do-me-sol in solfege?",
      ["Major triad", "Minor triad", "A fermata", "A cut-off"],
      "B",
    ],
    [
      "What does a fermata tell you to do?",
      [
        "Sing faster",
        "Hold the note longer than written",
        "Skip the note",
        "Sing softly",
      ],
      "B",
    ],
    [
      "How many sharps or flats are in the key signature of A minor?",
      ["None", "One", "Two", "Three"],
      "A",
    ],
    [
      "Which interval is C to G?",
      ["A third", "A fourth", "A fifth", "A sixth"],
      "C",
    ],
    [
      "When tuning a chord, which voices do you tune first?",
      ["The highest", "The bass", "The soloist", "None"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain the difference between a major triad and a minor triad, and give the notes of the C major triad and the C minor triad.",
      scheme: [
        "Says that a minor triad has a lowered third",
        "Says the major triad sounds bright and the minor sounds more serious or sad",
        "Gives the C major triad: C E G",
        "Gives the C minor triad: C E-flat G",
      ],
      model:
        "A minor triad lowers the third of the major triad by a half step. A major triad sounds bright and a minor triad sounds more serious or sad. The C major triad is C, E, G. The C minor triad is C, E-flat, G.",
      answers: [
        [
          "full",
          "[[0|The minor triad has the third lowered by a half step.]] [[1|Major sounds bright and minor sounds sadder.]] [[2|C major is C, E, G.]] [[3|C minor is C, E-flat, G.]]",
          "Full marks. The difference and both chords are correct.",
        ],
        [
          "full",
          "[[0|To make it minor you lower the middle note a half step.]] [[1|Major is happy and bright and minor is darker.]] [[2|C E G.]] [[3|C E-flat G.]]",
          "All four marks. Calling the third the middle note is a clear way to say it.",
        ],
        [
          "partial",
          "[[2|C major is C E G.]] [[3|C minor is C E-flat G.]]",
          "Both chords are right. Explain what changes between them and how they sound.",
        ],
        [
          "partial",
          "[[1|Major is bright and minor is sad.]] [[2|C, E, G.]] The minor is C, D, G.",
          "Your major chord is right. For minor, lower the E to E-flat, not change it to D.",
        ],
        [
          "weak",
          "A minor triad is smaller and quieter.",
          "A minor triad is not smaller or quieter. The third is lowered a half step, which makes the sound darker.",
        ],
        [
          "weak",
          "Major and minor are the same chord with different words.",
          "They are different chords. The minor third gives the chord a different quality.",
        ],
      ],
    },
    {
      prompt:
        "Describe what a conductor shows with a fermata, a ritardando and a cut-off, and what singers should do for each.",
      scheme: [
        "Says a fermata means hold the note and watch for the cut-off",
        "Says a ritardando means gradually slow down together",
        "Says a cut-off means stop the note at the same moment",
        "Says singers should keep their eyes on the conductor",
      ],
      model:
        "At a fermata the conductor holds the note, and singers hold it until the cut-off. At a ritardando the conductor slows the beat, and singers slow down together. A cut-off tells the singers to stop at exactly the same moment. Throughout, the singers keep their eyes on the conductor.",
      answers: [
        [
          "full",
          "[[0|A fermata means hold the note longer and wait for the cut-off.]] [[1|A ritardando means we slow down gradually together.]] [[2|A cut-off means we all stop at the same time.]] [[3|We keep our eyes on the conductor the whole time.]]",
          "Full marks. Each gesture is described with the singers' action.",
        ],
        [
          "full",
          "[[0|Hold the note until the conductor ends it.]] [[1|Slow down with the conductor's beat.]] [[2|Stop exactly when the hand closes.]] [[3|That means watching the conductor, not the music.]]",
          "All four marks. Watching, not the music, is the most important habit.",
        ],
        [
          "partial",
          "[[0|Fermata is hold.]] [[2|Cut-off is stop.]]",
          "Add the ritardando and say that singers keep their eyes on the conductor.",
        ],
        [
          "partial",
          "[[1|A ritardando means slow down.]] [[3|Watch the conductor.]]",
          "Add the fermata and the cut-off and what the singers do for each.",
        ],
        [
          "weak",
          "A fermata means to sing it very loudly.",
          "A fermata means to hold the note longer than written. It does not tell you the volume.",
        ],
        [
          "weak",
          "The conductor does not matter if I know the music.",
          "Many gestures are not written, so you need to watch the conductor to stay together.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Small-ensemble singing, and songs in German and Hebrew",
  note: `
## Objectives

Students will be able to:

1. sing a short solo or small-group part with confidence;
2. perform songs in different languages with correct pronunciation.

## Materials

A short German or Hebrew choral piece with a pronunciation guide, a recording by native speakers, a trio or quartet score, the quiz.

## Starter (6 minutes)

Say aloud a phrase in German such as "Ich liebe dich" (I love you) and a phrase in Hebrew such as "Shalom" (peace). Ask: "What sounds are new in your mouth?"

## Main activity

1. Quartets and trios: form groups of three or four and learn a short passage. Sing it with no director, listening to each other, and giving a start signal with a breath.
2. German pronunciation: the "ch" sound in "ich" is made with the tongue near the roof of the mouth; the umlaut "ü" is made by saying "ee" with rounded lips. The vowel "ei" sounds like "eye."
3. Hebrew pronunciation: vowels are pure, the "ch" is a throat sound as in "challah," and "shalom" has the stress on the last syllable.
4. Perform for another group and give feedback with one thing that worked and one goal.

## Checking for understanding

Ask: "What does 'shalom' mean?" (Peace.)

## Exit ticket

Write the meaning of a line in the song we are learning and one pronunciation tip.
`,
  reading: [
    "Singing without a director, and in new languages",
    `
In a small group such as a trio or quartet, there is often **no conductor**. The singers must listen and lead each other. Before singing, face each other so that you can see each person. One singer gives a **start signal**: a quiet breath in the tempo, with a small nod. Everyone breathes together and enters on the beat. During the music, keep your eyes up, listen to each part and match the dynamics. If the group gets out of tune, adjust your pitch to the bass.

Choral music is sung in many languages, and each one adds new sounds. German is common in classical choral music, because composers such as Bach, Brahms and Mendelssohn wrote in it. Here are three guides. The letters **ch** after a front vowel, as in **ich** ("I"), is made with the tongue close to the roof of the mouth, a soft hissing sound. The **ü** (u with an umlaut) is made by saying "ee" with your lips rounded as if to say "oo." The **ei** combination sounds like the English word "eye," as in "mein" ("my"). For example, "Ich liebe dich" means "I love you."

Hebrew is used in many songs from Jewish tradition. Hebrew vowels are **pure** and consistent, like Latin and Spanish. The **ch** sound (written "ch" or "kh") is made in the throat, as in the word "challah" or the name "Bach." A well-known word is **shalom**, which means "peace" and is also a greeting. In "shalom," the stress is on the last syllable: sha-LOM.

As with every language, **learn the meaning** of the words. Ask a speaker or a teacher, listen to a recording, and write the translation under the text. Mark the places where the stress falls, and say the words in rhythm before you add the notes.

Singing in another language is also a way to build respect for other cultures. When you pronounce a language carefully, you show that you care about the people who speak it.
`,
  ],
  cards: [
    ["Start signal", "A breath and nod that shows a small group when to begin."],
    ["Trio", "A group of three singers."],
    ["Quartet", "A group of four singers."],
    ["ich", "German for 'I', with a soft 'ch' sound."],
    ["ü", "A German vowel made with 'ee' and rounded lips."],
    ["shalom", "Hebrew for 'peace', stressed on the last syllable."],
    ["ch (Hebrew)", "A sound made in the throat, as in 'challah'."],
    ["Translation", "The meaning of the words in your own language."],
  ],
  closed: [
    [
      "What does 'shalom' mean?",
      ["Hello only", "Peace", "Song", "Music"],
      "B",
    ],
    [
      "How does a small group begin without a conductor?",
      [
        "Everyone starts at a different time",
        "One singer gives a start signal with a breath",
        "They shout",
        "They wait a minute",
      ],
      "B",
    ],
    [
      "The German 'ei' as in 'mein' sounds like:",
      ["Ee", "Eye", "Ay", "Oh"],
      "B",
    ],
    [
      "Which composer wrote choral music in German?",
      ["Bach", "Sousa", "Gershwin", "Copland"],
      "A",
    ],
    [
      "Why should you learn the meaning of foreign words in a song?",
      [
        "To sing with understanding and feeling",
        "To make the song longer",
        "It is not necessary",
        "To sing faster",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how a trio can start and sing together without a conductor.",
      scheme: [
        "Says singers face each other so they can see one another",
        "Says one singer gives a start signal with a breath and nod",
        "Says everyone breathes and enters together on the beat",
        "Says they keep listening and tune to the bass during the music",
      ],
      model:
        "The singers face each other so they can see each person. One singer gives a start signal with a breath and a nod, and everyone breathes together and enters on the beat. During the music they listen to each other and tune to the bass.",
      answers: [
        [
          "full",
          "[[0|We stand facing each other so we can see everybody.]] [[1|One person gives a start signal, a breath and a small nod.]] [[2|We all breathe together and start on the beat.]] [[3|We keep listening and tune to the bass.]]",
          "Full marks. All four parts of the routine are clear.",
        ],
        [
          "full",
          "[[0|Make a small circle so we see each other.]] [[1|The leader breathes in the tempo with a nod.]] [[2|We start together with that breath.]] [[3|While singing we listen to the bass voice to stay in tune.]]",
          "All four marks. Choosing a leader for the start is key.",
        ],
        [
          "partial",
          "[[1|One person gives a signal.]] [[2|We all start.]]",
          "Add how the group is arranged and how it stays together during the song.",
        ],
        [
          "partial",
          "[[0|Face each other.]] [[3|Listen to the bass.]]",
          "Add the start signal and breathing together on the beat.",
        ],
        [
          "weak",
          "Everyone starts when they feel ready.",
          "Without a signal the group will not start together. One singer gives a breath and a nod.",
        ],
        [
          "weak",
          "A small group cannot sing without a conductor.",
          "Small groups sing without a conductor by watching and listening to each other, with a start signal.",
        ],
      ],
    },
    {
      prompt:
        "Give two pronunciation tips for a language you are singing in, and explain how learning the meaning of the words changes how you sing.",
      scheme: [
        "Gives a first correct pronunciation tip",
        "Gives a second correct pronunciation tip",
        "Says that learning the meaning helps you sing with understanding",
        "Says that your voice and expression match the words' feeling",
      ],
      model:
        "In German, ei sounds like eye and ich has a soft ch with the tongue near the roof of the mouth. When I know the meaning of the words, I sing with understanding, and my voice and expression match the feeling of the words.",
      answers: [
        [
          "full",
          "[[0|In German, ei sounds like eye.]] [[1|The ch in ich is a soft sound made with the tongue near the roof of the mouth.]] [[2|When I know what the words mean, I understand what I am singing.]] [[3|My expression matches the feeling of the words.]]",
          "Full marks. Both tips are accurate and your explanation is clear.",
        ],
        [
          "full",
          "[[0|In Hebrew the vowels are pure like in Latin.]] [[1|The ch is made in the throat.]] [[2|Knowing that shalom means peace changes how I sing it.]] [[3|I sing it gently and with feeling.]]",
          "All four marks. Linking the meaning to a gentle sound is exactly right.",
        ],
        [
          "partial",
          "[[0|Ei sounds like eye.]] [[2|Knowing the meaning helps.]]",
          "Add a second pronunciation tip and say how the meaning changes your expression.",
        ],
        [
          "partial",
          "[[1|The ch is in the throat.]] [[3|My expression matches.]]",
          "Add a first tip and explain that understanding the words helps you sing with meaning.",
        ],
        [
          "weak",
          "Pronunciation does not matter if the notes are right.",
          "Pronunciation is an important part of singing in another language, and shows respect.",
        ],
        [
          "weak",
          "I just say the words as they look in English.",
          "Languages have their own sounds. Use the guide and a recording to pronounce them correctly.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "A concert plan with a featured ensemble, and a vocal practice log",
  note: `
## Objectives

Students will be able to:

1. prepare for a concert, including stage behavior and a performance plan;
2. keep a practice log and set goals for your voice.

## Materials

A concert calendar, an order-of-program template, practice logs, the problem set.

## Starter (6 minutes)

Look at a sample concert program with a featured small ensemble. Ask: "Why might the director place the small group in the middle?"

## Main activity

1. Program order: open with a strong, lively piece; place slower, quieter pieces and the featured ensemble in the middle; end with an exciting piece. Calculate the total running time, including about 30 seconds between songs.
2. Stage plan: place voice parts so the sound blends and the singers can see the conductor. Practice moving to risers in order and silently.
3. Concert health: warm up, hydrate, avoid dairy and caffeine just before singing if they trouble you, and rest the voice the day before.
4. Practice log: weekly goals and daily entries, and a Friday review.

## Checking for understanding

Ask: "Why do we stand in a specific order on the risers?" (So the voice parts blend and everyone can see the conductor.)

## Exit ticket

Write the order of a four-song program and the total time.
`,
  reading: [
    "Building a concert, and looking after the voice that performs it",
    `
A concert program is like a story with a beginning, a middle and an end. A good order begins with a **strong, lively piece** to get the audience's attention. The middle includes **contrast**: a slower, quieter piece, a piece in a different language, or a **featured ensemble**, a small group such as a quartet or the chamber choir. The program ends with an **exciting finale**. Each piece should be different in tempo and mood from the one before.

To plan the time, add the length of each piece and the time between them. If a program has four pieces of 3, 4, 3 and 5 minutes, that is 15 minutes of music. With about 30 seconds between songs for the singers and conductor to settle, there are three pauses of 30 seconds, or 1.5 minutes, so the total is 16.5 minutes.

The **stage plan** places the voice parts. Many choirs put sopranos and altos on one side and tenors and basses on the other, or mix the parts so that each singer is next to someone on a different part, which helps singers to keep their own line. Everyone should see the conductor. **Risers** are steps that let the back rows be seen and heard. Practice walking on and off in order and without talking.

On concert days, protect your voice. **Warm up** carefully, and drink water through the day. Some singers find that milk products or caffeine just before singing make their throat feel unsettled, so they avoid them. Avoid yelling or whispering, which strain the voice, and get enough sleep. If you are sick, tell your director.

A **practice log** keeps you on track. At the start of each week, write one goal, such as "learn the German text of verse 2 with no mistakes." Each day, write the date, minutes and what you did. On Friday, review: did you meet your goal? What will you change next week?

When every singer prepares carefully, the concert becomes a team achievement.
`,
  ],
  cards: [
    ["Program", "The list and order of pieces in a concert."],
    ["Contrast", "Differences in tempo, mood or style between pieces."],
    ["Featured ensemble", "A small group highlighted in a concert."],
    ["Finale", "The last piece of a concert."],
    ["Risers", "Steps on which a choir stands so that all can see and be seen."],
    ["Hydrate", "Drink enough water."],
    ["Weekly goal", "A goal for one week, leading to a larger goal."],
    ["Review", "Looking back at a log to see progress."],
  ],
  closed: [
    [
      "A good program usually ends with:",
      [
        "A quiet piece with no energy",
        "An exciting finale",
        "A speech",
        "Silence",
      ],
      "B",
    ],
    [
      "Four pieces of 3, 4, 3 and 5 minutes with 30 seconds between songs last how long?",
      ["15 minutes", "16 minutes", "16.5 minutes", "18 minutes"],
      "C",
    ],
    [
      "Why mix voice parts on the risers?",
      [
        "It helps singers keep their own line by standing next to different parts",
        "It is required by law",
        "It makes the choir louder",
        "It saves space",
      ],
      "A",
    ],
    [
      "Which habit protects your voice on concert day?",
      [
        "Yelling at lunch",
        "Warming up carefully and drinking water",
        "Not sleeping",
        "Singing loudly all day",
      ],
      "B",
    ],
    [
      "A weekly goal in a practice log should be:",
      [
        "Specific and measurable",
        "Vague",
        "Impossible",
        "Written by someone else",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Plan a four-piece concert program. Give each piece a length and a mood, explain the order, and find the total time including 30 seconds between songs.",
      scheme: [
        "Lists four pieces with lengths and moods",
        "Opens with a strong, lively piece",
        "Includes contrast or a featured ensemble in the middle and an exciting finale",
        "Calculates the total time correctly including the pauses",
      ],
      model:
        "1. A lively folk song, 3 minutes. 2. A slow Latin piece, 4 minutes. 3. A featured quartet, 3 minutes. 4. An exciting spiritual arrangement, 5 minutes. The program starts and ends strong, with contrast in the middle. The music is 15 minutes and there are three pauses of 30 seconds, so the total is 16.5 minutes.",
      answers: [
        [
          "full",
          "[[0|1. Lively folk song, 3 min. 2. Slow Latin piece, 4 min. 3. A quartet, 3 min. 4. An exciting spiritual, 5 min.]] [[1|We open with a lively song.]] [[2|The slow piece and the quartet give contrast and the spiritual is the finale.]] [[3|3 + 4 + 3 + 5 = 15, plus 1.5 minutes of pauses is 16.5 minutes.]]",
          "Full marks. A well-shaped program with correct arithmetic.",
        ],
        [
          "full",
          "[[0|A fast song (4 min), a gentle song (3 min), a featured trio (3 min) and a fast closer (5 min).]] [[1|The fast opener gets attention.]] [[2|A gentle song and a trio add contrast, and the closer ends strong.]] [[3|15 minutes + 3 pauses of 30 seconds = 16.5 minutes.]]",
          "All four marks. The pauses are counted properly.",
        ],
        [
          "partial",
          "[[0|3 min lively, 4 min slow, 3 min quartet, 5 min fast.]] [[3|15 minutes.]]",
          "The pieces and the music time are right. Add the order explanation and the pauses, for 16.5 minutes.",
        ],
        [
          "partial",
          "[[0|Four slow songs of 4 minutes each.]] [[3|16 plus 1.5 is 17.5 minutes.]]",
          "The arithmetic is right, but four slow songs have no contrast. Add a lively opener and finale.",
        ],
        [
          "weak",
          "I will put the songs in any order.",
          "The order shapes the concert. Start strong, add contrast in the middle and end with a finale.",
        ],
        [
          "weak",
          "The concert is four songs, so four minutes.",
          "Add the length of each song and the time between them to find the total.",
        ],
      ],
    },
    {
      prompt:
        "Write a weekly goal and three daily log entries for a week of vocal practice, and explain how you will review them on Friday.",
      scheme: [
        "States a specific weekly goal",
        "Gives three daily entries with date, minutes and task",
        "Shows progress toward the goal across the entries",
        "Explains how to review on Friday and adjust",
      ],
      model:
        "Weekly goal: sing measures 9 to 24 with the correct notes and German words, three times in a row without mistakes. Monday, 15 minutes, notes with the keyboard. Wednesday, 15 minutes, the German words alone. Thursday, 15 minutes, notes and words together. On Friday I will check whether I met the goal and adjust my plan if not.",
      answers: [
        [
          "full",
          "[[0|Goal: sing measures 9 to 24 with the right notes and words three times in a row.]] [[1|Monday 15 min notes with the keyboard. Wednesday 15 min German words. Thursday 15 min both.]] [[2|Each day builds toward the goal.]] [[3|On Friday I will sing it three times and see if I met the goal, then change my plan if not.]]",
          "Full marks. The entries lead step by step to the goal.",
        ],
        [
          "full",
          "[[0|Goal: memorize verse 2.]] [[1|Mon 10 min first half, Tue 10 min second half, Thu 12 min all of it.]] [[2|Each entry adds more.]] [[3|Friday I will test myself and decide what to practice next week.]]",
          "All four marks. Breaking the verse into halves is a smart plan.",
        ],
        [
          "partial",
          "[[0|My goal is to know the song.]] [[1|Monday 10 minutes.]]",
          "Make the goal more specific, add two more entries and explain the Friday review.",
        ],
        [
          "partial",
          "[[3|On Friday I will look at my log.]] [[1|I will practice on three days.]]",
          "Add a specific goal and details for each entry.",
        ],
        [
          "weak",
          "I do not need a log, I just sing.",
          "A log shows progress and helps you plan. Write a goal and some entries.",
        ],
        [
          "weak",
          "My goal is to practice a lot.",
          "A lot is not measurable. Name the passage and how you will know you have learned it.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Reading in minor keys, sight-singing with intervals, and a Renaissance madrigal",
  note: `
## Objectives

Students will be able to:

1. read notation in major and minor keys, including key and time signatures, rhythm and solfege;
2. sight-sing a short melodic pattern with intervals;
3. describe the text, mood and style of a piece we are learning.

## Materials

Staff paper, hand signs, a sight-singing example in A minor, a score of a simple madrigal, the worksheet.

## Starter (6 minutes)

Clap and say a rhythm in 6/8 ("ta-ti-ti ta-ti-ti"). Ask: "How is this different from 4/4?"

## Main activity

1. Minor solfege: in a minor key with la as the tonic, the scale is la, ti, do, re, mi, fa, sol, la. Sing it with hand signs. Compare A minor to C major, its relative major.
2. Intervals in sight-singing: sing do-mi (a third), do-sol (a fifth) and do-do (an octave). Use these as anchors to find other notes.
3. Sight-singing routine for minor: find la, check the key signature (A minor has none), tap the rhythm, sing the solfege and then the text.
4. The madrigal: a secular piece from the Renaissance for several voices, about love, nature and humor. Listen to "Now is the Month of Maying" by Thomas Morley (1595) and describe the text and mood.

## Checking for understanding

Ask: "What is la in A minor?" (The tonic, the note A.)

## Exit ticket

Write the solfege for the A natural minor scale.
`,
  reading: [
    "Singing in minor, reading intervals and a song from the Renaissance",
    `
So far you have sung mostly in **major keys**, where **do** is the tonic. In a **minor key**, the tonic is **la**. The A natural minor scale in solfege is **la, ti, do, re, mi, fa, sol, la**. It has the same notes as C major, which is its **relative major**, but starts and ends on A. A minor has no sharps or flats in the key signature. Singing with **hand signs** helps you to see and feel each pitch.

**Intervals** give you anchors for reading melodies. Learn the sound of a few: a **third** (do to mi) is bright and small, a **fifth** (do to sol) is open and strong, and an **octave** (do to high do) is the same note an octave higher. When you see a leap in a melody, ask yourself which interval it is, and think of the sound you know.

For **sight-singing** in a minor key, use the routine you know, with a small change. Find **la** by looking at the key signature and the first and last notes. Check the **time signature**, tap the rhythm, and sing the **solfege**. Sometimes a melody has a raised seventh, called **si** or sometimes written as a sharp, as in the harmonic minor. Check for accidentals before you start.

A **madrigal** is a secular (non-religious) song for several voices, written in the **Renaissance**, from about 1400 to 1600. Madrigals were sung for pleasure by small groups of friends, with each singer on a part. The texts were about love, nature, humor and the seasons. Composers often used **word painting**: setting a word so that the music suggests its meaning, such as a rising line for "ascend" or a quick, light run for "dancing." The English composer **Thomas Morley** published "Now is the Month of Maying" in 1595. It is a lively, dance-like piece with a **fa-la-la** refrain in several voices. Notice the cheerful mood and the way the voices answer each other.

When you describe a piece, name the **text**, the **mood** and the **style**. A madrigal is a Renaissance secular style with word painting and independent voice parts.
`,
  ],
  cards: [
    ["Minor tonic", "In solfege, la is the tonic of a minor key."],
    ["Relative major", "The major key that shares a key signature with a minor key."],
    ["Third", "An interval of three letter names, such as do to mi."],
    ["Fifth", "An interval of five letter names, such as do to sol."],
    ["Madrigal", "A Renaissance secular song for several voices."],
    ["Renaissance", "The period of European history from about 1400 to 1600."],
    ["Word painting", "Setting music so that it suggests the meaning of a word."],
    ["Secular", "Not religious."],
  ],
  closed: [
    [
      "In a minor key, which solfege syllable is the tonic?",
      ["Do", "Re", "La", "Sol"],
      "C",
    ],
    [
      "What is the relative major of A minor?",
      ["G major", "C major", "E major", "F major"],
      "B",
    ],
    [
      "A madrigal is:",
      [
        "A Renaissance secular song for several voices",
        "A hymn only for church",
        "A solo instrumental piece",
        "A march",
      ],
      "A",
    ],
    [
      "Word painting is:",
      [
        "Writing words with paint",
        "Setting music so it suggests the meaning of a word",
        "Painting the stage",
        "Singing very softly",
      ],
      "B",
    ],
    [
      "Which interval is do to sol?",
      ["Third", "Fourth", "Fifth", "Octave"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Write the A natural minor scale in solfege and in letter names, and explain how it is related to C major.",
      scheme: [
        "Writes solfege la ti do re mi fa sol la",
        "Writes letter names A B C D E F G A",
        "Says A minor and C major share the same notes and key signature",
        "Says A minor starts and ends on A, so the tonic is different",
      ],
      model:
        "In solfege: la, ti, do, re, mi, fa, sol, la. In letters: A, B, C, D, E, F, G, A. A minor is the relative minor of C major: they share the same notes and key signature, but A minor starts and ends on A, so its tonic is different.",
      answers: [
        [
          "full",
          "[[0|la ti do re mi fa sol la.]] [[1|A B C D E F G A.]] [[2|They have the same notes and no sharps or flats like C major.]] [[3|But A minor starts and ends on A, so A is the tonic instead of C.]]",
          "Full marks. You showed both the similarity and the difference.",
        ],
        [
          "full",
          "[[0|La ti do re mi fa sol la.]] [[1|A B C D E F G A.]] [[2|C major is its relative major with the same key signature.]] [[3|The home note is A instead of C, which is why it sounds different.]]",
          "All four marks. The home note is the key to the difference.",
        ],
        [
          "partial",
          "[[0|la ti do re mi fa sol la.]] [[1|A B C D E F G A.]]",
          "Both scales are right. Explain how A minor is related to C major.",
        ],
        [
          "partial",
          "[[1|A B C D E F G A.]] [[2|It has the same notes as C major.]] I wrote do re mi fa sol la ti do for the solfege.",
          "For A minor the solfege starts on la: la ti do re mi fa sol la.",
        ],
        [
          "weak",
          "A minor is the same as A major but sadder.",
          "A minor and A major are different keys. A minor shares its notes with C major, not A major.",
        ],
        [
          "weak",
          "I do not know solfege for minor.",
          "In minor, la is the tonic. Start on la and go up: la ti do re mi fa sol la.",
        ],
      ],
    },
    {
      prompt:
        "Describe the text, mood and style of a Renaissance madrigal such as 'Now is the Month of Maying', and give one example of word painting.",
      scheme: [
        "Describes the text, such as spring and dancing",
        "Describes the mood as cheerful or lively",
        "Names the style as a Renaissance madrigal for several voices",
        "Gives an example of word painting or the fa-la-la refrain",
      ],
      model:
        "The text of 'Now is the Month of Maying' is about the joy of spring and dancing. The mood is cheerful and lively. It is a Renaissance madrigal for several voices. An example of word painting is a quick, light run on words about dancing.",
      answers: [
        [
          "full",
          "[[0|The words are about spring in May and people dancing.]] [[1|The mood is cheerful and lively.]] [[2|It is a Renaissance madrigal sung by several voices.]] [[3|The fa-la-la refrain sounds like dancing, and quick light notes show the word dancing.]]",
          "Full marks. All four parts are accurate.",
        ],
        [
          "full",
          "[[0|It celebrates springtime and merry-making.]] [[1|Happy and playful.]] [[2|A secular song from the Renaissance for small groups of singers.]] [[3|Word painting is when the music dances along with the word dance.]]",
          "All four marks. Your explanation of word painting is clear.",
        ],
        [
          "partial",
          "[[0|It is about spring.]] [[1|Happy.]]",
          "Add the style and an example of word painting.",
        ],
        [
          "partial",
          "[[2|A madrigal.]] [[3|The fa-la-la part.]]",
          "Describe the text and the mood, too.",
        ],
        [
          "weak",
          "It is a very old church hymn.",
          "A madrigal is a secular song, not a church hymn.",
        ],
        [
          "weak",
          "It is about war and is serious.",
          "This piece is about spring and dancing, with a lively mood.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Evaluating the choir, and creating a harmony part",
  note: `
## Objectives

Students will be able to:

1. evaluate a recording of the choir using a rubric and suggest improvements;
2. create a short vocal improvisation or a new harmony part for a melody.

## Materials

A recording of the choir, a rubric, a keyboard, the worksheet.

## Starter (6 minutes)

Play a short recording of the choir. Ask: "What do you hear that you could not hear while you were singing?"

## Main activity

1. Evaluate a recording: score tone, pitch, rhythm, diction, dynamics, blend and expression from 1 to 4. Give evidence and write one goal.
2. Making a harmony: sing a simple melody (such as a round or a folk song). Find a harmony a third below by singing the same rhythm and moving down two scale steps.
3. Test the harmony: sing the melody and the harmony together. If it sounds good, write it in solfege. If a note clashes, move it a step.
4. Improvise: over a drone on do, sing a short pentatonic idea and then answer a partner's idea.

## Checking for understanding

Ask: "How do you find a harmony a third below?" (Move down two scale steps with the same rhythm.)

## Exit ticket

Write the solfege of a harmony a third below do-re-mi-re-do.
`,
  reading: [
    "Self-evaluation and your first harmony",
    `
Choirs improve when singers listen to themselves honestly. A **recording** gives you the audience's view. Use a **rubric** to listen with a purpose. The categories might be **tone** (a full, relaxed sound), **pitch** (accurate and in tune), **rhythm** (steady and accurate), **diction** (clear words), **dynamics** (the loud and soft markings), **blend** (one voice from many) and **expression** (the feeling in the music). Score each from 1 to 4. Without **evidence**, a score is only an opinion, so add a specific detail, such as the bar or the word. Then choose the lowest score and decide what to do. "The altos were flat in measure 12 on 'peace.' We will tune the chord from the bass, and sing the line again, using the keyboard to check."

You can also **create** music. One of the simplest ways to harmonize is to sing a **third below** the melody. A third is the distance of two steps in the scale. If the melody is **do-re-mi-re-do**, then the harmony a third below is **la-ti-do-ti-la**, moving down two steps from each note. Because the two lines move in the same direction and at the same speed, they sound smooth together. Try it with a partner. One sings the melody and the other the harmony, and then swap. Listen to the chord they make. If a note sounds wrong, try moving it up or down a step.

**Improvising** with a partner is another way to create. Use the **pentatonic scale** (do, re, mi, sol, la) over a drone, a long steady note. One person sings a short idea, and the other answers with a similar one. Imitation and answer help you to develop confidence.

Through evaluating and creating, you will begin to listen as a musician, not only a singer.
`,
  ],
  cards: [
    ["Harmony", "Different notes sung or played at the same time."],
    ["Third below", "A harmony two scale steps below the melody."],
    ["Rubric", "A chart of categories and levels used to judge a performance."],
    ["Evidence", "A specific detail that supports a score."],
    ["Expression", "The feeling put into the music."],
    ["Improvise", "To make up music in the moment."],
    ["Drone", "A long, steady note under a melody."],
    ["Answer phrase", "A musical reply to a first phrase."],
  ],
  closed: [
    [
      "A harmony a third below do-re-mi is:",
      ["la-ti-do", "re-mi-fa", "sol-la-ti", "do-do-do"],
      "A",
    ],
    [
      "Which is the strongest evidence?",
      [
        "It was bad",
        "The altos were flat in measure 12 on the word 'peace'",
        "I like the choir",
        "We tried hard",
      ],
      "B",
    ],
    [
      "Why do two lines moving in the same direction a third apart sound smooth?",
      [
        "They move together at the same speed",
        "They are very loud",
        "They never change",
        "They use no notes",
      ],
      "A",
    ],
    [
      "What is a drone?",
      [
        "A fast melody",
        "A long, steady note under a melody",
        "A type of rhythm",
        "A rest",
      ],
      "B",
    ],
    [
      "After choosing the lowest-scoring category, what should the choir do?",
      [
        "Ignore it",
        "Write a plan to improve it and check again",
        "Stop rehearsing",
        "Change the audience",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose a category from the rubric where the choir scored lowest, give a score and evidence, and write a plan that you can check in the next rehearsal.",
      scheme: [
        "Names a category and a score",
        "Gives specific evidence from the recording",
        "Writes a plan with a specific action",
        "States how it will be checked, such as a recording or a keyboard check",
      ],
      model:
        "Pitch, 2. The altos were flat in measure 12 on the word peace. Plan: tune the chord from the bass and repeat measures 11 to 13 slowly. We will record it again in the next rehearsal and check the pitch with the keyboard.",
      answers: [
        [
          "full",
          "[[0|Pitch, 2.]] [[1|The altos were flat in measure 12 on 'peace.']] [[2|We tune the chord from the bass and sing measures 11 to 13 slowly.]] [[3|We record it again and check it with the keyboard.]]",
          "Full marks. The plan is concrete and can be checked.",
        ],
        [
          "full",
          "[[0|Diction, 2.]] [[1|The last consonants in the second verse were missing.]] [[2|We say the words rhythmically and exaggerate the endings.]] [[3|We listen to the recording to see if the ends are clearer.]]",
          "All four marks. Saying the words in rhythm is a good diction exercise.",
        ],
        [
          "partial",
          "[[0|Blend, 2.]] [[1|Some singers were loud.]]",
          "Add a plan and a way to check it.",
        ],
        [
          "partial",
          "[[2|We should practice more.]] [[3|We will record again.]]",
          "Name the category and score, and say what you heard.",
        ],
        [
          "weak",
          "The choir was not good.",
          "Choose one category, give a score and say what you heard.",
        ],
        [
          "weak",
          "I do not want to criticize.",
          "The rubric helps the choir improve. Choose a specific category and describe what you heard.",
        ],
      ],
    },
    {
      prompt:
        "Create a harmony a third below the melody do-re-mi-re-do. Write it in solfege and explain how you found it and how you would test it.",
      scheme: [
        "Writes the harmony la-ti-do-ti-la",
        "Explains that each note moves down two scale steps",
        "Says the rhythm is the same as the melody",
        "Explains testing it by singing both parts and moving a note if it clashes",
      ],
      model:
        "The harmony is la, ti, do, ti, la. I found it by moving each melody note down two scale steps, using the same rhythm. To test it, I would sing both parts with a partner and move any clashing note a step.",
      answers: [
        [
          "full",
          "[[0|la ti do ti la.]] [[1|I moved each note down two steps in the scale.]] [[2|It has the same rhythm as the melody.]] [[3|I would sing both parts with a partner and change any note that sounds wrong.]]",
          "Full marks. The method and the test are both clear.",
        ],
        [
          "full",
          "[[0|La, ti, do, ti, la.]] [[1|Count down two scale notes from each melody note.]] [[2|Keep the same rhythm so they move together.]] [[3|Test it by singing it and fix clashes by moving a note a step.]]",
          "All four marks. Keeping the same rhythm helps the lines blend.",
        ],
        [
          "partial",
          "[[0|la ti do ti la.]] [[1|Two steps down.]]",
          "The harmony and the method are right. Add the rhythm and how you would test it.",
        ],
        [
          "partial",
          "[[0|re mi fa mi re.]] I went up two steps.",
          "You went up, which gives a third above the melody. For a third below, go down two scale steps.",
        ],
        [
          "weak",
          "do re mi re do again.",
          "That is the same melody. A harmony uses different notes at the same time, a third below.",
        ],
        [
          "weak",
          "I would write any notes that I like.",
          "A harmony follows a plan, such as a third below, so it fits with the melody.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Composing a vocal phrase in minor, and the history of choral music",
  note: `
## Objectives

Students will be able to:

1. compose a four-bar melody for voice using a given scale;
2. describe the history and cultural context of a piece in our repertoire.

## Materials

Staff paper, a keyboard, a timeline of choral music, a recording of a Renaissance madrigal and a modern choral piece, the worksheet.

## Starter (6 minutes)

Sing the first line of a piece from our repertoire. Ask: "When do you think this piece was written, and why?"

## Main activity

1. Composing in A minor: write a four-bar melody in 4/4 using notes of the A natural minor scale. Start and end on A (la). Use stepwise motion with one skip. Add dynamics.
2. Check and sing: sing the melody on solfege, then on a vowel. Make one change and compare.
3. Timeline of choral music: plainsong and chant (before 1000), Renaissance madrigals (1400 to 1600), Baroque choral works such as Bach's chorales (1700s), Romantic part-songs, spirituals (1700s to 1800s), and contemporary choral music.
4. Context: pick a piece in our repertoire, place it on the timeline, and write two sentences on when and why it was written.

## Checking for understanding

Ask: "Where does a Renaissance madrigal fit on the timeline?" (Between 1400 and 1600.)

## Exit ticket

Write the solfege of your four-bar melody and name the period of one repertoire piece.
`,
  reading: [
    "Composing in minor, and a thousand years of choral music",
    `
Writing a melody in a **minor key** is similar to writing in major. In **A natural minor**, use the notes A, B, C, D, E, F, G, A, which in solfege are **la, ti, do, re, mi, fa, sol, la**. Begin and end on **A (la)**, the tonic. A melody that moves mostly by step is easy to sing, and one or two skips add interest. Use different note lengths to give the rhythm a shape. Mark the dynamics, such as **piano** at the start, a **crescendo** in the middle and **piano** again at the end. Sing your melody on solfege, then on a vowel, and ask a partner to sing it too. Change one note and notice how the character changes.

Choral music has a long history, and every piece in our repertoire has a place in it. Here is a short timeline. Before about 1000, the main choral music of Europe was **plainsong**, or chant, sung in unison in churches. From about **1400 to 1600**, in the **Renaissance**, composers wrote music for several independent voices, including **sacred** motets and **secular** madrigals. In the **Baroque** period (about 1600 to 1750), **Johann Sebastian Bach** wrote chorales and large choral works with instruments. In the **Romantic** period (about 1820 to 1900), composers such as Brahms wrote expressive part-songs and large choral works. In the United States, **spirituals** were created by enslaved African Americans in the 1700s and 1800s, and later arranged for choirs. Today's composers write **contemporary** choral music in many styles.

When you study a piece, find out **when** it was written, **who** wrote it, and **why**. A hymn is written for worship, a madrigal for friends to sing at home, and a spiritual for a community to express faith and hope. Knowing this helps you perform with understanding: a madrigal is light and quick, a chant is calm and flowing, and a spiritual is sung with sincerity.

When you place a piece in history, you also join a tradition of singers who have performed it for hundreds of years.
`,
  ],
  cards: [
    ["Plainsong", "Unaccompanied unison sacred chant of medieval Europe."],
    ["Renaissance", "The period from about 1400 to 1600."],
    ["Baroque", "The period from about 1600 to 1750."],
    ["Romantic", "The period from about 1820 to 1900."],
    ["Motet", "A sacred choral piece for several voices."],
    ["Part-song", "A piece for several voices, usually without accompaniment."],
    ["Contemporary", "Music of the present day."],
    ["Timeline", "A chart that shows events in order."],
  ],
  closed: [
    [
      "Which period includes Bach's chorales?",
      ["Renaissance", "Baroque", "Romantic", "Contemporary"],
      "B",
    ],
    [
      "What is plainsong?",
      [
        "Chant sung in unison, usually in church",
        "A song with no words",
        "A song for solo piano",
        "A march",
      ],
      "A",
    ],
    [
      "In A natural minor, which note do you begin and end on?",
      ["C", "A", "E", "G"],
      "B",
    ],
    [
      "Why is it helpful to know when and why a piece was written?",
      [
        "It helps you perform with understanding",
        "It makes the piece shorter",
        "It is never useful",
        "It changes the notes",
      ],
      "A",
    ],
    [
      "Which period was before the Baroque?",
      ["Romantic", "Renaissance", "Contemporary", "Modern"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a four-bar melody in A minor in solfege, and explain two choices you made about the notes and rhythm.",
      scheme: [
        "Writes a melody beginning and ending on la",
        "Uses notes from the A natural minor scale",
        "Explains a choice such as using steps with one skip",
        "Explains a choice about note lengths or dynamics",
      ],
      model:
        "Melody: la ti do re, mi re do ti, do re mi fa, mi re do la. I began and ended on la. I used mostly steps with one skip, which makes it easy to sing, and used different note lengths so the rhythm has shape.",
      answers: [
        [
          "full",
          "[[0|la ti do re, mi re do ti, do re mi fa, mi re do la.]] [[1|It uses the notes of A minor and begins and ends on la.]] [[2|I used mostly steps and one skip so it is easy to sing.]] [[3|I made the last note a half note so it feels finished.]]",
          "Full marks. The long final note is a good choice for an ending.",
        ],
        [
          "full",
          "[[0|la do re mi, fa mi re do, re mi fa sol, mi re do la.]] [[1|It stays in A minor and starts and ends on la.]] [[2|A skip from la to do at the start adds interest.]] [[3|I added a crescendo in bar 3 for the highest part.]]",
          "All four marks. The crescendo toward the highest note shapes the phrase.",
        ],
        [
          "partial",
          "[[0|la ti do re mi re do la.]] [[2|It moves by step.]]",
          "Write four bars of notes, which is a longer melody, and explain a choice about the rhythm or dynamics.",
        ],
        [
          "partial",
          "[[1|It is in A minor.]] [[3|I made some notes long.]]",
          "Write out the melody in solfege and explain your choices about the steps and skips.",
        ],
        [
          "weak",
          "do re mi fa sol la ti do.",
          "That is a major scale, not a minor melody. Start and end on la and use notes from A minor.",
        ],
        [
          "weak",
          "I wrote random notes that sounded good.",
          "A melody in minor uses the notes of the scale and begins and ends on la.",
        ],
      ],
    },
    {
      prompt:
        "Choose a piece from our repertoire. Say when and why it was written, which period it belongs to, and how that affects how we should sing it.",
      scheme: [
        "Names the piece",
        "Says when it was written and its period",
        "Says why it was written",
        "Explains how this affects the way we sing it",
      ],
      model:
        "The madrigal 'Now is the Month of Maying' by Thomas Morley was published in 1595, in the Renaissance. It was written for friends to sing for pleasure. So we should sing it in a light, lively and dance-like way with clear diction.",
      answers: [
        [
          "full",
          "[[0|Now is the Month of Maying.]] [[1|It was published in 1595, in the Renaissance.]] [[2|It was for friends to sing at home for fun.]] [[3|So we sing it lightly and with a dancing feeling and clear words.]]",
          "Full marks. The history shapes the style in your answer.",
        ],
        [
          "full",
          "[[0|Wade in the Water, a spiritual.]] [[1|It was created in the 1700s or 1800s by enslaved African Americans.]] [[2|It expressed faith and hope and sometimes hidden messages about freedom.]] [[3|So we sing it sincerely and with respect.]]",
          "All four marks. Singing with sincerity is the right response to the history.",
        ],
        [
          "partial",
          "[[0|Now is the Month of Maying.]] [[1|1595.]]",
          "Add why it was written and how that affects the singing.",
        ],
        [
          "partial",
          "[[2|It was written for fun.]] [[3|So we sing it lightly.]]",
          "Name the piece, the date and the period.",
        ],
        [
          "weak",
          "It is an old song.",
          "Be specific: name the piece, the date, the period and the reason it was written.",
        ],
        [
          "weak",
          "It does not matter when it was written.",
          "Knowing the history helps you choose a style and sing with understanding.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Frequency ratios, healthy breathing and finding a choir",
  note: `
## Objectives

Students will be able to:

1. explain how singing connects with language, mathematics and wellness;
2. identify community choirs and opportunities for continued singing.

## Materials

A tuner, a frequency chart, a breathing guide, a list of choirs and events, the quiz.

## Starter (6 minutes)

Play A at 440 hertz and then the A an octave lower. Ask: "What is the frequency of the lower A?" (220.)

## Main activity

1. Frequency: an octave is a ratio of 2 to 1. A perfect fifth is 3 to 2. Calculate a fifth above A 440 (660 hertz) and an octave below (220 hertz).
2. Language and rhythm: syllables and beats. Count the syllables in a line of text and match them to beats. A line with eight syllables in 4/4 can use eight eighth notes (four beats).
3. Wellness: three-part breathing in four counts, hold for four, out for six; posture and stress; sleep and hydration for the voice.
4. Opportunities: school honor choirs, community choruses, church choirs, a cappella groups, musical theater, and college choirs. Choose two and plan first steps.

## Checking for understanding

Ask: "How many beats are in a line of eight eighth notes?" (Four.)

## Exit ticket

Calculate the frequency of the note a fifth above A 440.
`,
  reading: [
    "Numbers in music, a calm breath and where to sing next",
    `
Music and mathematics are close. The pitch of a note depends on its **frequency**, the number of vibrations per second, measured in **hertz**. The A above middle C is 440 hertz. An **octave** is a frequency ratio of **2 to 1**: A one octave above is 880 hertz, and A one octave below is 220 hertz. A **perfect fifth** is a ratio of **3 to 2**, so the note a fifth above A 440 has the frequency 440 × 3/2 = 660 hertz. Notes whose frequencies have simple ratios sound smooth together, which is why octaves and fifths sound so stable in a choir.

Rhythm links language and mathematics. When you set words to music, each **syllable** gets a note. A line with eight syllables fits eight eighth notes, which add up to four beats in 4/4. If a word has three syllables, such as "beautiful," the stress usually falls on the first syllable, and you place that syllable on the stronger beat. Counting syllables and beats helps you write words for a melody and learn text quickly.

Singing and **wellness** go together. A calm breathing routine can help before a performance. Breathe in for four counts, hold for four, and breathe out slowly for six. Good posture and relaxed shoulders lower tension. Sleep and water help the voice to stay healthy. Many singers say that singing in a group lifts their mood and gives them a sense of belonging.

You do not have to stop singing when this class ends. **School honor choirs** invite students from several schools. **Community choruses** and **church choirs** welcome singers of different ages, often without an audition. **A cappella** groups sing without instruments, and **musical theater** needs singers for shows. In college, many choirs are open to non-music majors. To find a group, ask your director, search for local choruses and attend a rehearsal or a concert. A useful first step is to send an email to the director of a group you like.

Wherever you sing, you will be using habits you have learned here: careful listening, steady practice and working with others.
`,
  ],
  cards: [
    ["Frequency", "The number of vibrations per second, measured in hertz."],
    ["Octave ratio", "A frequency ratio of 2 to 1."],
    ["Perfect fifth ratio", "A frequency ratio of 3 to 2."],
    ["Syllable", "A unit of sound in a word."],
    ["Stress", "The syllable of a word that is stronger."],
    ["Calm breathing", "In for four, hold for four, out for six."],
    ["Honor choir", "A choir of selected singers from several schools."],
    ["A cappella", "Singing without instruments."],
  ],
  closed: [
    [
      "What is the frequency of the A one octave above A 440?",
      ["220 hertz", "660 hertz", "880 hertz", "1,320 hertz"],
      "C",
    ],
    [
      "A perfect fifth above A 440 has a frequency of about:",
      ["550 hertz", "660 hertz", "770 hertz", "880 hertz"],
      "B",
    ],
    [
      "A line with eight syllables set to eighth notes in 4/4 lasts:",
      ["Two beats", "Four beats", "Six beats", "Eight beats"],
      "B",
    ],
    [
      "A calm breathing pattern before a concert is:",
      [
        "In for one, out for one",
        "In for four, hold for four, out for six",
        "Hold your breath for a minute",
        "Breathe as fast as possible",
      ],
      "B",
    ],
    [
      "Which of these could you join after high school?",
      [
        "A community chorus",
        "Nothing",
        "Only professional choirs",
        "Only a choir in another country",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Calculate the frequency of the note a perfect fifth above A 440 and the A one octave below, and name the ratio for each interval.",
      scheme: [
        "Uses the ratio 3 to 2 for the fifth",
        "Calculates 440 times 3/2 = 660 hertz",
        "Calculates the octave below as 440 divided by 2 = 220 hertz",
        "Names the octave ratio as 2 to 1",
      ],
      model:
        "A perfect fifth is a ratio of 3 to 2, so the note a fifth above A 440 is 440 × 3/2 = 660 hertz. The A an octave below is half of 440, which is 220 hertz. The octave ratio is 2 to 1.",
      answers: [
        [
          "full",
          "[[0|A fifth is 3 to 2.]] [[1|440 × 3/2 = 660 hertz.]] [[2|An octave below is half, 440 / 2 = 220 hertz.]] [[3|An octave is a ratio of 2 to 1.]]",
          "Full marks. Both frequencies and the ratios are right.",
        ],
        [
          "full",
          "[[0|For the fifth I multiply by 3/2.]] [[1|440 × 1.5 = 660 Hz.]] [[2|For the octave below I divide by 2, which gives 220 Hz.]] [[3|The octave ratio is 2:1.]]",
          "All four marks. Using 1.5 for 3/2 is a handy shortcut.",
        ],
        [
          "partial",
          "[[1|660 hertz.]] [[2|220 hertz.]]",
          "The answers are right. Name the ratios, 3 to 2 and 2 to 1, and show the calculation.",
        ],
        [
          "partial",
          "[[0|A fifth is 3 to 2.]] 440 + 3 = 443 hertz.",
          "The ratio is right, but you multiply by it: 440 × 3/2 = 660.",
        ],
        [
          "weak",
          "A fifth is five notes above so it is 445.",
          "A fifth is a ratio of 3 to 2, so you multiply the frequency by 1.5.",
        ],
        [
          "weak",
          "An octave below is 880.",
          "An octave below is half the frequency, 220 hertz. 880 is an octave above.",
        ],
      ],
    },
    {
      prompt:
        "Choose two places where you could keep singing after this class, say what each offers, and give a first step for each.",
      scheme: [
        "Names a first place and what it offers",
        "Names a second place and what it offers",
        "Gives a first step for the first place",
        "Gives a first step for the second place",
      ],
      model:
        "A community chorus welcomes singers of all ages and often needs no audition, and a school honor choir brings together selected singers from several schools. For the community chorus I would attend a concert. For the honor choir I would ask my director about the audition.",
      answers: [
        [
          "full",
          "[[0|A community chorus welcomes all ages and often has no audition.]] [[1|The honor choir brings together singers from many schools.]] [[2|I will go to a concert of the community chorus.]] [[3|I will ask my director about the honor choir audition.]]",
          "Full marks. Two places with practical first steps.",
        ],
        [
          "full",
          "[[0|A church choir sings every week and welcomes new members.]] [[1|An a cappella group sings without instruments and often performs at school events.]] [[2|I will visit a rehearsal at church.]] [[3|I will talk to the a cappella group about their auditions.]]",
          "All four marks. Visiting a rehearsal is the best first step.",
        ],
        [
          "partial",
          "[[0|A community chorus.]] [[2|Go to a concert.]]",
          "Add a second place and a first step for it.",
        ],
        [
          "partial",
          "[[1|An honor choir.]] [[3|Ask my director.]]",
          "Add a first place and what each group offers.",
        ],
        [
          "weak",
          "I will not sing again.",
          "You could continue in many ways. Choose two groups and a first step for each.",
        ],
        [
          "weak",
          "I will sing on my own in the shower.",
          "Singing alone is fine, but name two groups you could join and a first step for each.",
        ],
      ],
    },
  ],
};

writeCourse("choir-grade-10.json", "Choir", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
