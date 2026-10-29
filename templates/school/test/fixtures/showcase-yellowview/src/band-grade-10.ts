import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Band, Grade 10, Quarter 1. National Core Arts Standards, Music, in the
 * school's own words. The second-year band: more scales and minor keys,
 * tuning and intonation, section rehearsals, a Bach chorale, variations,
 * mixed meter, and the band's part in the community. No practicals.
 */

const w1: WeekInput = {
  topic: "Scales in more keys, the chromatic scale and sight-reading in minor",
  note: `
## Objectives

Students will be able to:

1. play assigned parts with accurate pitch, rhythm and tone;
2. perform the concert F and A-flat major scales and one minor scale from memory;
3. sight-read a short passage at a steady tempo.

## Materials

Instruments, tuners, metronomes, a sight-reading card in D minor, the worksheet.

## Starter (7 minutes)

Long tones on concert F, listening for beats against a neighbor. Ask: "What do you hear when two players are slightly out of tune?"

## Main activity

1. Review the concert F major scale (one flat) and add A-flat major (four flats). Play each at 80 beats per minute, in eighth notes, with the metronome.
2. Introduce the natural minor scale: the pattern whole, half, whole, whole, half, whole, whole. D natural minor has the same notes as F major, so it has one flat. Compare the sound of F major and D minor.
3. The chromatic scale moves by half steps, using all twelve notes. Play it up and down one octave.
4. Sight-reading in minor: check the key signature (is it major or minor?), find the accidentals, and keep a steady tempo.

## Checking for understanding

Ask: "Which major key has the same key signature as D minor?" (F major.)

## Exit ticket

List the notes of the D natural minor scale.
`,
  reading: [
    "Major, minor and everything between",
    `
In first-year band you learned the concert B-flat and E-flat major scales. This year you add more keys, because the music you will play moves through many of them. The concert **F major** scale has one flat, B-flat, and its notes are F, G, A, B-flat, C, D, E, F. The concert **A-flat major** scale has four flats, B-flat, E-flat, A-flat and D-flat, and its notes are A-flat, B-flat, C, D-flat, E-flat, F, G, A-flat.

Every major key has a **relative minor** that shares its key signature. To find it, go down three half steps from the tonic of the major scale, or count to the sixth note. The relative minor of F major is D minor. The **natural minor scale** has the pattern whole, half, whole, whole, half, whole, whole, so D natural minor is D, E, F, G, A, B-flat, C, D. Minor music often sounds darker or more serious than major music, even though the notes are the same as in its relative major. That is because the tonic, the note that feels like home, is different.

The **chromatic scale** uses every half step, twelve different notes in an octave. It is good practice for finger and slide technique, and it appears in many band pieces as a quick run or a slide.

**Sight-reading in minor** adds one new check. Look at the key signature and ask: could this be a major key or its relative minor? Look at the first and last notes, which are usually the tonic, and look for accidentals such as a raised seventh note, which makes the minor scale sound more dramatic.

**Intonation** is how well your pitch matches the pitch of the band. Two notes that are very slightly different produce a wobbling sound called **beats**. The slower the wobble, the closer the pitch. Use a tuner to check your pitch, but also learn to listen. A good player adjusts to the ensemble, not only to the tuner.
`,
  ],
  cards: [
    ["Relative minor", "The minor key that shares a key signature with a major key."],
    ["Natural minor scale", "A scale with the pattern W H W W H W W."],
    ["Chromatic scale", "A scale of all twelve half steps in an octave."],
    ["Accidental", "A sharp, flat or natural sign that changes a note within a measure."],
    ["Intonation", "How accurately pitch matches the pitch of the ensemble."],
    ["Beats", "A wobbling sound heard when two pitches are slightly different."],
    ["Tonic", "The note that feels like home in a key."],
    ["Enharmonic", "Two names for the same pitch, such as G-sharp and A-flat."],
  ],
  closed: [
    [
      "Which major key has the same key signature as D minor?",
      ["B-flat major", "F major", "G major", "A major"],
      "B",
    ],
    [
      "How many flats are in the key signature of A-flat major?",
      ["Two", "Three", "Four", "Five"],
      "C",
    ],
    [
      "Two players hold the same note and you hear a slow wobble in the sound. What does it show?",
      [
        "The pitches are very close but not exactly the same",
        "The notes are in perfect tune",
        "One player is playing too short",
        "The notes are an octave apart",
      ],
      "A",
    ],
    [
      "How many different notes does a chromatic scale use in one octave?",
      ["Seven", "Eight", "Ten", "Twelve"],
      "D",
    ],
    [
      "Which pattern of steps makes the natural minor scale?",
      ["W W H W W W H", "W H W W H W W", "H W W H W W W", "W W W H W W H"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write the notes of the D natural minor scale, name its relative major key, and say how many flats are in the key signature.",
      scheme: [
        "Writes the scale D E F G A B-flat C D",
        "Names the relative major as F major",
        "States one flat in the key signature",
      ],
      model:
        "D natural minor is D, E, F, G, A, B-flat, C, D. Its relative major is F major. The key signature has one flat, B-flat.",
      answers: [
        [
          "full",
          "[[0|D, E, F, G, A, B-flat, C, D]]. [[1|The relative major is F major.]] [[2|There is one flat, B-flat.]]",
          "Full marks. All three parts are accurate and clear.",
        ],
        [
          "full",
          "[[0|D E F G A Bb C D]]. It shares its signature with [[1|F major]], so [[2|just one flat, Bb]].",
          "All three marks. Noticing that both scales share a signature is the key idea.",
        ],
        [
          "partial",
          "[[0|D, E, F, G, A, B-flat, C, D]]. The key signature has two flats.",
          "The scale is right. The key signature is the same as F major, with only one flat, B-flat.",
        ],
        [
          "partial",
          "D, E, F, G, A, B, C, D. [[1|The relative major is F major.]]",
          "Your relative major is correct. In D natural minor the sixth note is B-flat, not B natural, because the key signature has a flat.",
        ],
        [
          "weak",
          "D minor is the same as D major but darker.",
          "D major and D minor are different scales. The minor third and sixth make it sound darker, and its key signature has one flat.",
        ],
        [
          "weak",
          "I do not know the relative major but it has one flat.",
          "You have the right number of flats. To find the relative major, go up three half steps from the minor tonic, which gives F.",
        ],
      ],
    },
    {
      prompt:
        "You hear beats, a slow wobble, when your section plays a unison concert F. Explain what is happening and describe two things you could do to fix it.",
      scheme: [
        "Explains that the pitches are slightly different",
        "Explains that the slower the wobble the closer the pitch",
        "Suggests using a tuner or listening and adjusting",
        "Suggests a second fix, such as checking instrument position or breath support",
      ],
      model:
        "The beats happen because two players are slightly different in pitch. The slower the wobble, the closer they are. I would check my pitch with a tuner and adjust to match the section, and I would check that my instrument is set up and my air is steady.",
      answers: [
        [
          "full",
          "[[0|Two people are playing slightly different pitches.]] [[1|The slower the wobble gets, the closer we are to matching.]] [[2|I would use the tuner and listen to the section and adjust.]] [[3|I would also check my breath support and my instrument position.]]",
          "Full marks. You explained the cause and gave two practical fixes.",
        ],
        [
          "full",
          "[[0|The notes are close but not the same, so the sound waves clash.]] [[1|When the beats slow down, we are almost in tune.]] [[2|I could listen and move my tuning slide until it stops.]] [[3|I could also make sure I breathe steadily and my embouchure is the same.]]",
          "All four marks. Moving the slide until the beats slow is exactly what a player does.",
        ],
        [
          "partial",
          "[[0|We are slightly out of tune.]] [[2|Use the tuner.]]",
          "Both ideas are right. Say why the wobble gets slower as we get closer, and add a second fix.",
        ],
        [
          "partial",
          "[[0|The pitches are a bit different.]] I would play louder to cover it.",
          "Playing louder hides nothing and makes beats more obvious. Adjust your pitch with a tuner and by listening.",
        ],
        [
          "weak",
          "It means we are playing perfectly in tune.",
          "Beats happen when pitches are not quite the same. When they are exactly the same, the wobble stops.",
        ],
        [
          "weak",
          "Someone must be playing the wrong notes, so I would stop and tell them.",
          "Beats do not mean wrong notes; they mean slightly different pitches. Listen and adjust your own tuning first.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Conducting patterns, subdivisions and tuning the ensemble",
  note: `
## Objectives

Students will be able to:

1. follow a conductor's cues for tempo, dynamics and entrances;
2. balance and blend your sound with the other players in your section.

## Materials

Batons, a recording of the band tuning, a tuner, the worksheet.

## Starter (6 minutes)

Conduct a three-beat pattern (down, right, up) together while counting aloud, then a two-beat pattern. Ask students to say how many beats are in each.

## Main activity

1. Conducting patterns for 2/4, 3/4 and 4/4. Subdivide: when the tempo is slow, the conductor shows the eighth notes in the pattern.
2. Entrances: the conductor looks at the section, gives a preparatory beat, and breathes with the players. Practice an entrance on beat 3 of a four-beat pattern.
3. Tuning: the band tunes to a concert B-flat from the principal clarinet or an oboe in a professional orchestra. In our band, one section leader gives the pitch. Players listen, match and adjust.
4. Blend and balance: use a four-part chorale. The pyramid of sound puts more volume in the bass and less in the top so that the harmony sits well.

## Checking for understanding

Ask: "Why does a conductor subdivide in a slow piece?" (To keep the notes together.)

## Exit ticket

Draw the path of the baton for a three-beat measure and name the beats.
`,
  reading: [
    "Beat patterns, the pyramid of sound and tuning",
    `
A conductor draws a pattern in the air for each time signature. In **2/4** the baton goes down and up. In **3/4** it goes down, right and up. In **4/4** it goes down, in, out and up. Every pattern starts with a downbeat, the strongest beat of the measure, and the lowest point of the pattern is called the **ictus**, the place where the beat is felt. Watching the ictus keeps you together with the conductor.

When the tempo is very slow, a single beat is too long for the group to stay together. The conductor will **subdivide**, showing the half beat of each beat, so that the eighth notes are clear. When the tempo is fast, the conductor may show only one big beat to a measure, called **conducting in one**.

An **entrance** is the moment a section starts to play. A good entrance needs three things: the conductor looks at the section, gives a clear **preparatory beat**, and the players breathe together. If you enter on a beat that is not the first, your breath and the conductor's preparatory beat happen one beat earlier.

Before rehearsal and before a concert, the band **tunes**. One player gives a pitch, usually a concert B-flat for a band, and everyone listens and adjusts. Tune after warming up, because instruments change pitch as they warm. Wind instruments go sharp when they are warm and flat when they are cold.

**Balance** in a chord is often described as the **pyramid of sound**. The bass notes are the foundation, so the low instruments play a bit more strongly. The middle voices play a little less, and the top voice plays a little less again, unless it is the melody. The result is a chord that sounds full and in tune. If the top voices are louder than the bass, the chord sounds thin and the tuning is harder to hear.

A section that **blends** has players who listen to the person beside them and match tone and volume.
`,
  ],
  cards: [
    ["Ictus", "The lowest point of a conducting beat, where the beat is felt."],
    ["Subdivide", "Show smaller parts of each beat, such as eighth notes, in a slow tempo."],
    ["Conducting in one", "Showing one big beat per measure at a fast tempo."],
    ["Entrance", "The moment a player or section begins to play."],
    ["Downbeat", "The first and strongest beat of a measure."],
    ["Tuning", "Adjusting pitch so the whole ensemble matches."],
    ["Pyramid of sound", "Balancing a chord with the most volume in the bass and less toward the top."],
    ["Sharp", "Higher than the intended pitch."],
  ],
  closed: [
    [
      "In a three-beat pattern, the baton moves:",
      ["Down, right, up", "Down, in, out, up", "Down, up", "Side to side"],
      "A",
    ],
    [
      "Why does a conductor subdivide in a slow tempo?",
      [
        "To make the band play louder",
        "To keep the smaller notes together",
        "To speed up the music",
        "To end the piece",
      ],
      "B",
    ],
    [
      "What happens to the pitch of a wind instrument as it warms up?",
      [
        "It gets flatter",
        "It stays exactly the same",
        "It goes sharper",
        "It becomes very quiet",
      ],
      "C",
    ],
    [
      "In the pyramid of sound, which instruments play with a little more volume in a chord?",
      ["The highest", "The lowest", "Only the drums", "All the same"],
      "B",
    ],
    [
      "An entrance on beat 3 needs a preparatory beat on:",
      ["Beat 1", "Beat 2", "Beat 4", "No preparatory beat"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain the pyramid of sound and say why a chord can sound thin or out of tune if the top voices are louder than the bass.",
      scheme: [
        "Says the bass should be the most prominent, with less volume toward the top",
        "Describes the bass as the foundation of the chord",
        "Says that louder top voices make the chord sound thin",
        "Says that it makes tuning harder to hear or the chord less stable",
      ],
      model:
        "In the pyramid of sound the lowest voices play with the most volume and each higher voice a little softer. The bass is the foundation of the chord. If the top voices are louder, the chord sounds thin and it is harder to hear the tuning, so the chord is less stable.",
      answers: [
        [
          "full",
          "[[0|The pyramid of sound means the low instruments play a bit louder and the higher ones play less.]] [[1|The bass is like the base of a building.]] [[2|If the top is louder the chord sounds thin.]] [[3|It also makes it harder to hear if the chord is in tune.]]",
          "Full marks. The building comparison is a clear way to explain the idea.",
        ],
        [
          "full",
          "[[0|Bass gets the most volume, then the middle, then the top softer.]] [[1|The bass is the foundation of the chord.]] [[2|Loud top notes sound thin and pointed.]] [[3|The chord is less stable and the tuning is harder to hear.]]",
          "All four marks. You described both what to do and the sound that results.",
        ],
        [
          "partial",
          "[[0|The low notes are louder than the high notes.]] [[1|They are the foundation.]]",
          "Good start. Explain what happens to the chord when the top is louder: it sounds thin and the tuning is harder to hear.",
        ],
        [
          "partial",
          "[[2|If the top is too loud it sounds thin.]] The middle voices should be the loudest.",
          "The thin sound is right. The bass, not the middle voices, should have the most volume in the pyramid.",
        ],
        [
          "weak",
          "Everyone should play the same volume so it is fair.",
          "Balance is not about being fair to every player. A chord sounds best with more volume in the bass and less at the top.",
        ],
        [
          "weak",
          "The pyramid is how the percussion is set up on the stage.",
          "The pyramid of sound is about balancing the volume of a chord from the bottom to the top, not about the stage setup.",
        ],
      ],
    },
    {
      prompt:
        "A piece begins on beat 3 of a measure in 4/4. Describe what the conductor does and what the players do to make a good entrance together.",
      scheme: [
        "The conductor looks at the section that enters",
        "The conductor gives a preparatory beat one beat before, on beat 2",
        "The players breathe together on the preparatory beat",
        "The players watch the conductor and start together on beat 3",
      ],
      model:
        "The conductor looks at the entering section and gives a preparatory beat on beat 2. The players breathe in together on that beat, watch the conductor, and enter together on beat 3.",
      answers: [
        [
          "full",
          "[[0|The conductor looks at the people who come in.]] [[1|The conductor gives a prep beat on beat 2.]] [[2|We all breathe in together on that beat.]] [[3|Then we watch and start together on beat 3.]]",
          "Full marks. You covered what the conductor does and what the players do.",
        ],
        [
          "full",
          "[[0|The conductor looks at the section.]] [[1|On beat 2 they show a preparatory gesture.]] [[2|The section breathes with the gesture.]] [[3|We play on beat 3 with the downward beat.]]",
          "All four marks. Linking the breath to the conductor's gesture is the heart of a good entrance.",
        ],
        [
          "partial",
          "[[1|The conductor gives a preparatory beat.]] [[3|We play on beat 3.]]",
          "Both are right. Add that the conductor looks at the section and that the players breathe together on the preparatory beat.",
        ],
        [
          "partial",
          "[[2|We breathe together.]] The conductor gives the beat on beat 1.",
          "The breath is right. The preparatory beat comes one beat before the entrance, so for beat 3 it is on beat 2.",
        ],
        [
          "weak",
          "We just start playing when we feel it.",
          "Players need to watch the conductor's preparatory beat to start exactly together, not rely on feeling.",
        ],
        [
          "weak",
          "The conductor does not do anything until beat 3.",
          "A conductor shows the preparatory beat before the entrance, so for beat 3 the gesture happens on beat 2.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Embouchure, tone quality, equipment and concert readiness",
  note: `
## Objectives

Students will be able to:

1. perform with correct posture, breath support and instrument care;
2. prepare for a concert, including a warm-up routine and a rehearsal plan.

## Materials

Mouthpieces, reeds, a mirror, a concert checklist, the worksheet.

## Starter (6 minutes)

Play a long tone for as many counts as you can with a steady sound. Count to eight, ten, twelve. Ask: "What do you change in your body to hold the note longer?"

## Main activity

1. Embouchure: the way the lips, face and mouth shape the sound on wind instruments. Review the correct shape for your instrument family and check in a mirror.
2. Tone quality: a good tone is centered, steady and free from squeaks. Compare reed and mouthpiece condition and what a bad reed does to the sound.
3. Maintenance: schedule weekly cleaning (mouthpiece wash for brass, pad check for flutes, reed rotation for clarinets and saxophones).
4. A concert checklist: music, pencil, instrument, accessories, concert dress, call time, warm-up location. Assign each student a job for the performance day.

## Checking for understanding

Ask: "What is one thing that would change your tone if it was damaged?" (A cracked reed or a dented mouthpiece.)

## Exit ticket

Write three items from your concert checklist.
`,
  reading: [
    "Producing a good sound and being ready on the day",
    `
**Tone quality** starts with the way your body and instrument work together. On a wind instrument, the **embouchure** is the shape your lips, jaw and facial muscles make when you play. For brass, the lips vibrate inside the mouthpiece, and for woodwinds the lips support the reed or the air stream. A good embouchure is firm but not tight. Corners of the mouth stay steady and the chin is flat. Check in a mirror: if your cheeks puff out, or your lower lip curls in, adjust.

A good tone is **centered**, meaning it has a clear core of sound, **steady** in pitch and volume, and free from squeaks and cracks. Many tone problems come from equipment. A damaged reed makes a buzzy or stuffy sound, and clarinet and saxophone players should rotate several reeds. A dirty brass mouthpiece makes the sound muddy, so wash it weekly with warm water. A leaking flute pad makes some notes weak or missing, so tell the director if you see it.

**Maintenance** is more than cleaning after you play. Make a simple schedule. Woodwinds swab daily and have the instrument checked each year. Brass players oil valves weekly and grease slides monthly. Percussionists check sticks and mallets for splits. Store your instrument in its case, in a cool place, and never lend your mouthpiece to others.

A **concert checklist** helps you arrive ready. Items include your instrument and accessories, all of your music in order with a pencil, concert dress, the call time (the time to arrive, usually an hour early), and a place to warm up. On the day, warm up quietly, tune with the band, and focus. Concert etiquette matters: stay quiet during other pieces, sit up straight, and wait for the conductor to turn. After the performance, bow when the conductor does and put your instrument away safely.

The best preparation is a consistent practice routine. A short, careful daily warm-up of ten minutes will improve your tone more than an hour of playing without thinking.
`,
  ],
  cards: [
    ["Embouchure", "The shape of the lips and face used to play a wind instrument."],
    ["Centered tone", "A tone with a clear core of sound."],
    ["Reed rotation", "Using several reeds in turn so they last longer."],
    ["Call time", "The time performers must arrive before a concert."],
    ["Concert etiquette", "Polite behavior as a performer and audience member."],
    ["Pad", "A cushion on a woodwind key that seals a hole."],
    ["Mouthpiece", "The part of the instrument where the player's lips or reed make the sound."],
    ["Checklist", "A list of things to bring or do."],
  ],
  closed: [
    [
      "What is the embouchure?",
      [
        "The shape of the lips and face used to play",
        "A kind of music stand",
        "The length of a tube",
        "The key signature",
      ],
      "A",
    ],
    [
      "A clarinetist's tone is buzzy and stuffy. Which is the most likely cause?",
      [
        "A damaged reed",
        "The room is too bright",
        "A clean mouthpiece",
        "The conductor's baton",
      ],
      "A",
    ],
    [
      "How often should a brass player oil the valves?",
      ["Once a year", "About once a week", "Never", "Only before concerts"],
      "B",
    ],
    [
      "Which item belongs on a concert checklist?",
      ["A game console", "Your music and a pencil", "A tennis racket", "A pet"],
      "B",
    ],
    [
      "During other groups' pieces at a concert, you should:",
      [
        "Talk quietly with friends",
        "Stay quiet and respectful",
        "Warm up your instrument loudly",
        "Leave the room",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain two things that can make a player's tone sound poor and what the player can do to fix each.",
      scheme: [
        "Names a cause of poor tone, such as a damaged reed or dirty mouthpiece",
        "Gives a fix for that cause",
        "Names a second cause, such as embouchure or breath support",
        "Gives a fix for the second cause",
      ],
      model:
        "A damaged reed can make a buzzy sound, so the player should change to a better reed. A weak embouchure can make a thin tone, so the player should check the lip shape in a mirror and support the air.",
      answers: [
        [
          "full",
          "[[0|A cracked reed gives a buzzy sound.]] [[1|You should switch to a fresh reed and rotate them.]] [[2|A loose embouchure gives a thin tone.]] [[3|I would check my mouth in a mirror and use more air support.]]",
          "Full marks. Each cause has a clear fix.",
        ],
        [
          "full",
          "[[0|A dirty mouthpiece makes the sound muddy.]] [[1|Wash it with warm water every week.]] [[2|Tired breath support makes the tone shaky.]] [[3|Practice long tones and breathe from the diaphragm.]]",
          "All four marks. The fixes are practical and correct.",
        ],
        [
          "partial",
          "[[0|A bad reed.]] [[1|Replace it.]]",
          "Good, but the question asks for two causes. Add a second cause such as embouchure or breath support and its fix.",
        ],
        [
          "partial",
          "[[2|Poor embouchure.]] [[3|Check in a mirror.]] The instrument is too old.",
          "The embouchure part is right. Name a second cause that you can fix, such as an old reed or dirty mouthpiece.",
        ],
        [
          "weak",
          "Just play louder and it will sound better.",
          "Playing louder usually makes a poor tone worse. Look for the cause, such as the reed, the mouthpiece or your air.",
        ],
        [
          "weak",
          "The tone depends only on how expensive the instrument is.",
          "Equipment matters, but most tone problems come from reeds, cleanliness, embouchure and breath, which you can fix.",
        ],
      ],
    },
    {
      prompt:
        "Write a six-item concert checklist and a short plan for the hour before the performance.",
      scheme: [
        "Lists six sensible items",
        "Includes the instrument and the music",
        "Includes a warm-up in the plan",
        "Includes tuning or arriving at the call time in the plan",
      ],
      model:
        "Checklist: instrument, music in order, pencil, concert dress, reeds or valve oil, water. Plan: arrive at the call time, put on concert dress, warm up quietly, tune with the band, and listen to the director's reminders.",
      answers: [
        [
          "full",
          "[[0|Instrument, music, pencil, concert dress, reeds, water.]] [[1|The instrument and music are first.]] [[2|At the hour before I warm up quietly.]] [[3|I arrive at call time and tune with the band.]]",
          "Full marks. The list and the plan are realistic and complete.",
        ],
        [
          "full",
          "[[0|Instrument, folder, pencil, black shoes, valve oil, spare reed.]] [[1|Instrument and folder checked the night before.]] [[2|Warm up with long tones and a scale.]] [[3|Call time is 6:00 so I will be there at 5:50 and tune at 6:30.]]",
          "All four marks. The times in your plan show careful thinking.",
        ],
        [
          "partial",
          "[[0|Instrument, music, pencil.]] [[1|Instrument and music.]]",
          "The list needs six items. Add concert dress, an accessory and water, and a plan for the hour before the concert.",
        ],
        [
          "partial",
          "[[0|Instrument, music, pencil, dress, reed, water.]] I will just get there.",
          "A good list. Add a plan: arrive at call time, warm up and tune with the band.",
        ],
        [
          "weak",
          "Bring my phone and snacks.",
          "A checklist should have the items you need to perform: instrument, music, pencil, concert dress and accessories.",
        ],
        [
          "weak",
          "I will arrive at the concert time exactly.",
          "Players need to arrive at the call time, usually an hour before, so there is time to warm up and tune.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Pep band performance skills, drill and a practice plan",
  note: `
## Objectives

Students will be able to:

1. perform in marching band or pep band with correct formation and movement;
2. keep a practice log and set goals for improvement.

## Materials

Field or gym floor with yard lines, drill charts, practice logs, the quiz.

## Starter (6 minutes)

March in place to a steady 120 beats per minute while counting aloud to eight. Switch to half time (60) and ask what changes.

## Main activity

1. Review 8 to 5 and add 6 to 5 (six steps to five yards, so each step is 30 inches). Compare how it feels.
2. Drill charts: follow the path from set 3 to set 4 in sixteen counts. Calculate the number of steps from a yard line to another (30 yards at 8 to 5 is 48 steps).
3. Pep band: a repertoire of four short songs. Plan the order, assign entrances, and review safety in the stands (keep instruments off the floor, watch out for crowds).
4. Practice log: write goals and track at least four practice sessions a week with the date, minutes, goal and result. Review your log with a partner.

## Checking for understanding

Ask: "How many steps to march 20 yards at 6 to 5?" (24.)

## Exit ticket

Write one goal for this week and how you will measure it.
`,
  reading: [
    "Marching to a plan, and practicing with purpose",
    `
Marching band is a team activity in which every person must move in the same way at the same moment. The key measure of movement is the **step size**. In **8 to 5**, eight steps cover five yards, so each step is 22.5 inches. In **6 to 5**, six steps cover five yards, so each step is 30 inches. A band might use 8 to 5 for most of a show and 6 to 5 for a quick change or a slower effect.

You can use ratios to work out how many steps a move takes. To go 30 yards at 8 to 5, divide by 5 to find the number of five-yard groups: 30 / 5 = 6. Then multiply by 8: 6 × 8 = 48 steps. At 6 to 5 the same distance takes 6 × 6 = 36 steps. A **drill chart** shows the move from one set to the next, and a **count** is one beat of movement. If the move is 16 counts, you must arrive at the new spot exactly on count 16.

A **pep band** adds energy to games and events. Because the group plays in a crowd, safety is part of performing: hold your instrument in a safe spot, keep cases off the walkways, and stay aware of people around you. The group usually plays short, well-known songs, and the director calls them one after another. Pay attention, answer the cue quickly, and be ready with the right page.

Improvement does not come from playing more. It comes from practicing with a purpose. A **practice log** keeps track of the date, the amount of time, the goal you worked on and the result. Reviewing the log lets you see patterns: which days you were consistent, which skills improved, and where you still need work. Always begin with a goal that you can measure, such as "play measures 9 to 16 at 88 beats per minute without stopping, four times in a row." When you reach the goal, raise the tempo or choose a new challenge.

Musicians who reach their goals do not wait until they feel motivated. They schedule practice at the same time each day and keep their log.
`,
  ],
  cards: [
    ["8 to 5", "A step size where eight steps cover five yards, about 22.5 inches per step."],
    ["6 to 5", "A step size where six steps cover five yards, or 30 inches per step."],
    ["Count", "One beat of movement in a drill."],
    ["Set", "A formation in a show."],
    ["Pep band", "A band that plays at games and school events."],
    ["Practice log", "A record of what, when and how long you practiced."],
    ["Measurable goal", "A goal that can be checked with numbers."],
    ["Safety in the stands", "Keeping instruments and cases out of the way and watching the crowd."],
  ],
  closed: [
    [
      "At 8 to 5, how many steps does it take to march 30 yards?",
      ["24", "36", "48", "60"],
      "C",
    ],
    [
      "How long is each step at 6 to 5?",
      ["22.5 inches", "24 inches", "30 inches", "36 inches"],
      "C",
    ],
    [
      "A move is 16 counts. When must a player be in the new spot?",
      ["After count 20", "On count 16", "On count 8", "Any time"],
      "B",
    ],
    [
      "What does a practice log help you to see?",
      [
        "Patterns in your practice and progress",
        "The score of the game",
        "What the director is thinking",
        "How loud the band is",
      ],
      "A",
    ],
    [
      "Which goal is the most measurable?",
      [
        "Play better",
        "Be more confident",
        "Play measures 9 to 16 at 88 beats per minute without stopping, four times in a row",
        "Try hard",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A band must move 40 yards in one move. How many steps is that at 8 to 5 and at 6 to 5? Show your calculation and say which takes more steps.",
      scheme: [
        "Finds the number of five-yard groups, 40 / 5 = 8",
        "Calculates 8 times 8 = 64 steps at 8 to 5",
        "Calculates 8 times 6 = 48 steps at 6 to 5",
        "Says 8 to 5 takes more steps because each step is shorter",
      ],
      model:
        "40 yards is 8 groups of five yards. At 8 to 5, 8 × 8 = 64 steps. At 6 to 5, 8 × 6 = 48 steps. The 8 to 5 move takes more steps because the steps are shorter.",
      answers: [
        [
          "full",
          "[[0|40 / 5 = 8 groups of 5 yards.]] [[1|At 8 to 5 it is 8 × 8 = 64 steps.]] [[2|At 6 to 5 it is 8 × 6 = 48 steps.]] [[3|8 to 5 takes more steps because each step is shorter.]]",
          "Full marks. The reasoning about step length explains the result.",
        ],
        [
          "full",
          "[[0|There are 8 five-yard sections in 40 yards.]] [[1|8 to 5 means 64 steps.]] [[2|6 to 5 means 48 steps.]] [[3|The smaller steps, 22.5 inches, make 8 to 5 longer.]]",
          "All four marks. Using the step length to explain it shows real understanding.",
        ],
        [
          "partial",
          "[[0|40 / 5 = 8.]] [[1|8 × 8 = 64 steps at 8 to 5.]]",
          "Correct so far. Now do the same for 6 to 5, which is 8 × 6 = 48 steps, and say which takes more.",
        ],
        [
          "partial",
          "[[1|64 steps at 8 to 5]], [[2|48 at 6 to 5]]. They are the same.",
          "Your numbers are right but the two are not the same: 8 to 5 takes 64 steps and 6 to 5 takes 48.",
        ],
        [
          "weak",
          "40 steps for both because 40 yards.",
          "A step is not one yard. The step size changes with the ratio, so you must count groups of five yards and multiply.",
        ],
        [
          "weak",
          "8 to 5 means 8 players and 5 steps.",
          "8 to 5 is a step ratio: eight steps cover five yards, so each step is 22.5 inches.",
        ],
      ],
    },
    {
      prompt:
        "Write a one-week practice plan for your instrument with a goal, four practice days and a way to tell whether you reached the goal.",
      scheme: [
        "States a specific goal",
        "Schedules four practice days with times or minutes",
        "Gives a way to measure success, such as a tempo or number of correct tries",
        "Describes recording it in a log or reviewing at the end of the week",
      ],
      model:
        "Goal: play measures 9 to 16 of the concert piece at 88 beats per minute with correct rhythm. Plan: Monday, Tuesday, Thursday and Saturday, 15 minutes each. Success: four correct plays in a row at 88. I will record each session in my log and review it on Sunday.",
      answers: [
        [
          "full",
          "[[0|Goal: play measures 9 to 16 at 88 beats per minute.]] [[1|Monday, Tuesday, Thursday and Saturday for 15 minutes.]] [[2|It is a success if I play it four times in a row with no mistakes.]] [[3|I write it in my practice log and review it on Sunday.]]",
          "Full marks. A complete plan that you can check at the end of the week.",
        ],
        [
          "full",
          "[[0|I will learn the F scale for two octaves at 80 beats per minute.]] [[1|Four days, 12 minutes each, Mon, Wed, Fri, Sat.]] [[2|I will play it with no wrong notes three times in a row on Saturday.]] [[3|I will mark each session in my log and look at it at the end.]]",
          "All four marks. The test you chose on Saturday makes the goal measurable.",
        ],
        [
          "partial",
          "[[0|My goal is to play the scale better.]] [[1|I will practice four days.]]",
          "Better is hard to measure. Name a tempo or a number of correct tries, and add how you will record your progress.",
        ],
        [
          "partial",
          "[[0|Play measures 9 to 16 at 88 beats per minute.]] [[2|Four times with no mistakes.]]",
          "Your goal and test are good. Add the four practice days with the time for each and the log.",
        ],
        [
          "weak",
          "I will practice when I have time.",
          "A plan needs scheduled days and times. Choose four days and how long you will play each time.",
        ],
        [
          "weak",
          "My goal is to be the best player.",
          "Being the best is hard to measure and depends on others. Choose a skill, a tempo and a date.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Composing a theme, improvising on a blues scale, and mixed meter",
  note: `
## Objectives

Students will be able to:

1. compose or improvise a short melody using a given scale;
2. arrange a simple phrase for your instrument by changing rhythm or dynamics;
3. read and interpret key signatures, time signatures and musical terms.

## Materials

Staff paper, a keyboard, a backing track in B-flat, the problem set.

## Starter (6 minutes)

Clap a pattern in 3/4, then one in 4/4, then one in 5/4 (3 + 2). Ask: "What is different about how each feels?"

## Main activity

1. Composing a theme: eight bars in the concert B-flat major scale, with two four-bar phrases, a question phrase and an answer phrase. End the first on a note other than B-flat and the second on B-flat.
2. Improvising on the blues scale: B-flat, D-flat, E-flat, E natural, F, A-flat. Play over a simple 12-bar blues backing. Start with two-note ideas and repeat them.
3. Arranging: take your theme and change the articulation (staccato for the first phrase, legato for the second), dynamics (piano, then forte) and rhythm.
4. Time signatures: compound (6/8) and mixed (5/4, 7/8) meters. Count 6/8 as two groups of three.

## Checking for understanding

Ask: "How many beats are in 5/4 and how could you group them?" (Five, as 3 + 2 or 2 + 3.)

## Exit ticket

Write the notes of the B-flat blues scale.
`,
  reading: [
    "Question and answer phrases, the blues scale and odd meters",
    `
A good melody often has two halves that fit together like a conversation. The first phrase asks a musical **question**, and the second phrase gives an **answer**. The question often ends on a note that feels unfinished, such as the second or fifth note of the scale. The answer ends on the tonic, which feels like home. In an eight-bar theme in the concert B-flat major scale, you might write four bars that end on F and four bars that return to B-flat.

To make a melody interesting, vary the rhythm. If every note is a quarter note, the tune is dull. Use long notes to rest, short notes for movement, and a repeated rhythm to make the tune easy to remember. Repeat a short idea and change it slightly, which is called a **sequence**.

The **blues scale** is a six-note scale used in blues and jazz. In B-flat, the notes are B-flat, D-flat, E-flat, E natural, F and A-flat. The D-flat and E natural against a B-flat chord give the music its bluesy sound. To **improvise**, start simple. Choose two or three notes, repeat them with different rhythms, and leave space. A short phrase with a clear shape is better than a fast run with no plan. A **12-bar blues** is a common chord pattern with the chords I, IV and V.

**Arranging** your theme means changing how it is played. You might use staccato on the first phrase and legato on the second, add a crescendo into the answer, or give it a softer dynamic on the repeat.

Most music uses simple meters such as 2/4, 3/4 and 4/4, but you will meet others. In **6/8** there are six eighth notes in a measure, felt as two groups of three. In **5/4** there are five quarter-note beats, which are often grouped as 3 + 2 or 2 + 3, so the music feels uneven in an exciting way. In **7/8** there are seven eighth notes, often 2 + 2 + 3. Counting out loud with the groups helps you stay together.
`,
  ],
  cards: [
    ["Question and answer phrases", "Two phrases that fit together, one unfinished and one finished."],
    ["Sequence", "A short idea repeated at different pitches."],
    ["Blues scale", "A six-note scale used in blues and jazz."],
    ["12-bar blues", "A common chord pattern twelve measures long."],
    ["Compound meter", "A meter in which beats divide into three, such as 6/8."],
    ["5/4 time", "Five quarter-note beats per measure."],
    ["Staccato", "Short and detached."],
    ["Legato", "Smooth and connected."],
  ],
  closed: [
    [
      "Which note does an answer phrase usually end on?",
      ["The tonic", "A random note", "The seventh", "The note before the tonic always"],
      "A",
    ],
    [
      "How many eighth notes are in a measure of 6/8?",
      ["Three", "Four", "Six", "Eight"],
      "C",
    ],
    [
      "How could you group the beats of 5/4?",
      ["1 + 1 + 1 + 1 + 1 only", "3 + 2 or 2 + 3", "4 + 4", "2 + 2 + 2"],
      "B",
    ],
    [
      "Which scale is used most in blues?",
      ["Major scale", "Chromatic scale", "Blues scale", "Whole-tone scale"],
      "C",
    ],
    [
      "If you play the first phrase of a theme staccato and the second legato, you have changed its:",
      ["Key", "Articulation", "Time signature", "Title"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe how to write a four-bar question phrase and a four-bar answer phrase in B-flat major, including where each phrase ends.",
      scheme: [
        "Says the question phrase uses notes of the B-flat major scale",
        "Says the question phrase ends on a note that feels unfinished, such as F or C",
        "Says the answer phrase begins like the question or contrasts with it",
        "Says the answer phrase ends on the tonic, B-flat",
      ],
      model:
        "I would write both phrases with notes of the B-flat major scale. The question phrase ends on a note that feels unfinished, such as F. The answer phrase starts with a similar idea and ends on B-flat, the tonic, which feels like home.",
      answers: [
        [
          "full",
          "[[0|I use notes only from the B-flat major scale.]] [[1|The question ends on F so it feels unfinished.]] [[2|The answer begins with the same rhythm as the question.]] [[3|It ends on B-flat, which is the tonic, home.]]",
          "Full marks. Starting the answer with the same rhythm makes the two phrases feel connected.",
        ],
        [
          "full",
          "[[0|Both are in B-flat major.]] [[1|The first four bars end on C, a note that wants to go somewhere.]] [[2|The second four start with a changed version of the first.]] [[3|They end on B-flat.]]",
          "All four marks. A good plan for a melody that sounds finished.",
        ],
        [
          "partial",
          "[[0|Use the B-flat scale.]] [[3|End on B-flat.]]",
          "These are both right. Say where the question phrase ends, on a note that feels unfinished, and how the answer relates to it.",
        ],
        [
          "partial",
          "[[1|The question ends on F.]] [[3|The answer ends on F too.]]",
          "The question ending is right. The answer should end on B-flat, the tonic, so it sounds finished.",
        ],
        [
          "weak",
          "Write any notes you like and end on any note.",
          "A good melody uses notes from the key and the phrases end in a planned way: the question feels unfinished and the answer ends on the tonic.",
        ],
        [
          "weak",
          "Both phrases end on B-flat so they sound like home both times.",
          "If both end on the tonic, there is no question and answer. The first phrase should end on a note that feels unfinished.",
        ],
      ],
    },
    {
      prompt:
        "Explain how to count a measure of 6/8 and a measure of 5/4, and why 5/4 feels different from 4/4.",
      scheme: [
        "Says 6/8 has six eighth notes felt as two groups of three",
        "Counts 6/8 as 1 2 3 4 5 6 with accents on 1 and 4",
        "Says 5/4 has five beats grouped as 3 + 2 or 2 + 3",
        "Says 5/4 feels uneven or lopsided compared with the regular groups of 4/4",
      ],
      model:
        "6/8 has six eighth notes counted 1 2 3 4 5 6 with accents on 1 and 4, so it feels like two groups of three. 5/4 has five beats grouped 3 + 2 or 2 + 3. It feels uneven compared with 4/4, which has a regular pulse.",
      answers: [
        [
          "full",
          "[[0|6/8 has six eighth notes in two groups of three.]] [[1|I count 1 2 3 4 5 6 and accent 1 and 4.]] [[2|5/4 has five beats, 3 + 2 or 2 + 3.]] [[3|It feels uneven because 4/4 has an even pulse.]]",
          "Full marks. Counting out loud with accents is the way to learn both.",
        ],
        [
          "full",
          "[[0|In 6/8 you feel two big beats, each divided into three.]] [[1|Count 1-2-3-4-5-6, strong on 1 and 4.]] [[2|In 5/4 count 1-2-3-4-5 in groups of 3 and 2.]] [[3|It feels lopsided compared to 4/4.]]",
          "All four marks. Lopsided is a clear way to say it.",
        ],
        [
          "partial",
          "[[0|6/8 is six eighth notes.]] [[2|5/4 is five beats in 3 + 2.]]",
          "Good. Add how to count with accents, and say why 5/4 feels different from 4/4.",
        ],
        [
          "partial",
          "[[1|6/8 is 1 2 3 4 5 6 with accents on 1 and 4.]] 5/4 is the same as 4/4 with one more beat.",
          "The 6/8 counting is right. 5/4 is grouped as 3 + 2 or 2 + 3, so it feels uneven, not just like 4/4 with an extra beat.",
        ],
        [
          "weak",
          "6/8 means six beats and 5/4 means five beats, nothing else.",
          "The grouping matters. 6/8 is two groups of three eighth notes, and 5/4 is grouped as 3 + 2 or 2 + 3.",
        ],
        [
          "weak",
          "They feel the same because both have many beats.",
          "They feel different because of how the beats are grouped. 4/4 is even, 5/4 is uneven and 6/8 is in two groups of three.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Theme and variations, and a rubric for a rehearsal recording",
  note: `
## Objectives

Students will be able to:

1. identify and describe the form of a piece of band music;
2. evaluate a recording of the band's performance using a rubric.

## Materials

A recording of a theme and variations (a short example), listening map, rubric, the worksheet.

## Starter (6 minutes)

Play eight bars of a familiar tune (Twinkle, Twinkle, Little Star). Then play the same tune in a minor key and with a faster rhythm. Ask: "Is it the same tune? What changed?"

## Main activity

1. Theme and variations: the theme is stated, then repeated with changes in rhythm, key, instrumentation, dynamics or tempo. Mozart wrote variations on the French tune known to us as "Twinkle, Twinkle."
2. Listening map: mark each variation, name what changed, and note the instruments.
3. Rubric: score the band recording on tone, intonation, rhythm, dynamics, balance and articulation from 1 to 4. Work with a partner and give evidence, a measure number or a section.
4. Make a plan: choose the lowest scoring category and write two ways to improve it in the next rehearsal.

## Checking for understanding

Ask: "What stays the same in a theme and variations, and what changes?" (The theme's main idea stays; the treatment changes.)

## Exit ticket

Name two ways a theme can be varied.
`,
  reading: [
    "Variations on a theme, and honest listening",
    `
Some of the most interesting music takes one idea and plays with it. In **theme and variations** form, a composer states a **theme**, a melody that is short and clear, and then repeats it many times in different ways. Each repetition is a **variation**. The listener recognizes the theme underneath even as the music changes. A theme can be varied in several ways: by changing the **rhythm** (for example, long notes become short notes), the **key** or **mode** (a major theme can become minor), the **instruments** that play it, the **dynamics** and **tempo**, or by adding **ornaments** and a new countermelody.

A famous set of variations is by Wolfgang Amadeus Mozart, who wrote twelve variations on a French tune, "Ah! vous dirai-je, maman," which English speakers know as "Twinkle, Twinkle, Little Star." The simple tune is still easy to hear in each variation, though the notes around it change. You can use the same idea in band. Take a simple theme, such as the first four bars of a march, and try it in a minor key, then at a slower tempo, then with the woodwinds on the melody and the brass on the accompaniment.

To listen well, use a **listening map**. As the recording plays, make a note each time a new variation begins. Write what changed, and note the instruments you hear.

Bands improve by listening to themselves honestly. A **rubric** gives a fair way to do this. Score each category, such as tone, intonation, rhythm, dynamics, balance and articulation, from 1 (needs work) to 4 (excellent). A score is only useful if it has **evidence**. Instead of writing "dynamics 2," write "dynamics 2: the piano at measure 5 was as loud as the forte at measure 1." Then decide on the category with the lowest score and set a **goal** for the next rehearsal. For example: "The brass will play measures 5 to 8 at mezzo piano so the melody can be heard." After you rehearse, record again and compare.

Listening to yourself builds responsibility. It turns "we sounded bad" into "this specific thing can be fixed."
`,
  ],
  cards: [
    ["Theme", "A short, clear melody that is the basis of a piece."],
    ["Variation", "A repeat of a theme with changes."],
    ["Theme and variations", "A form in which a theme is repeated with changes each time."],
    ["Ornament", "Extra notes added to decorate a melody."],
    ["Countermelody", "A second melody played at the same time as the main one."],
    ["Mode", "A type of scale, such as major or minor."],
    ["Evidence", "A specific measure, section or sound that supports your score."],
    ["Goal", "What you will do to improve a skill by the next rehearsal."],
  ],
  closed: [
    [
      "In theme and variations, what usually stays recognizable?",
      ["The theme", "The tempo only", "The title", "The conductor"],
      "A",
    ],
    [
      "Which of these is a way to vary a theme?",
      [
        "Change the rhythm",
        "Delete the theme",
        "Play it exactly the same way",
        "Stop playing",
      ],
      "A",
    ],
    [
      "Which composer wrote variations on the tune known to us as \"Twinkle, Twinkle, Little Star\"?",
      ["Mozart", "Sousa", "Duke Ellington", "Holst"],
      "A",
    ],
    [
      "Which is the strongest piece of rubric feedback?",
      [
        "Dynamics 2: the piano at measure 5 was as loud as the forte at measure 1",
        "Dynamics were bad",
        "I did not like it",
        "Everyone should try harder",
      ],
      "A",
    ],
    [
      "After scoring a recording, what should the band do with the lowest category?",
      [
        "Ignore it",
        "Set a goal for the next rehearsal",
        "Cancel the concert",
        "Change the conductor",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain what a theme and variations is and describe three different ways a composer could vary a theme.",
      scheme: [
        "Says a theme is stated and then repeated with changes",
        "Describes a variation by rhythm or tempo",
        "Describes a variation by key, mode or dynamics",
        "Describes a variation by instrumentation or a countermelody",
      ],
      model:
        "A theme and variations states a theme and then repeats it with changes. A composer could change the rhythm or tempo, change the key or mode from major to minor, or change the instruments or add a countermelody.",
      answers: [
        [
          "full",
          "[[0|It is a form where a theme is played and then repeated again with changes.]] [[1|You could make the rhythm faster or change the tempo.]] [[2|You could change from major to minor.]] [[3|You could give the tune to different instruments or add a second melody.]]",
          "Full marks. Three clear and different ways, each correct.",
        ],
        [
          "full",
          "[[0|The composer plays a theme and then makes variations of it.]] [[1|One variation might have long notes turned into short ones.]] [[2|Another could be softer or in a different key.]] [[3|Another could have the flutes play the tune with the trumpets as a countermelody.]]",
          "All four marks. You described what happens in a real set of variations.",
        ],
        [
          "partial",
          "[[0|A theme is repeated with changes.]] [[1|Change the rhythm.]]",
          "Good start. Add two more kinds of change, such as key or mode, dynamics, or instruments.",
        ],
        [
          "partial",
          "[[1|Make it faster.]] [[2|Make it minor.]] [[3|Change the instruments.]]",
          "Three good changes. Begin with a definition: a theme is stated and then repeated with changes.",
        ],
        [
          "weak",
          "Variations means playing different songs one after another.",
          "In variations, the same theme is repeated with changes. It is not a set of different songs.",
        ],
        [
          "weak",
          "You change the theme completely so no one knows it.",
          "The theme should stay recognizable. The changes are around it, in rhythm, key, instruments and so on.",
        ],
      ],
    },
    {
      prompt:
        "Choose the category on a rehearsal rubric where our band scored lowest. Give evidence for the score and write a goal for the next rehearsal that can be checked.",
      scheme: [
        "Names a rubric category",
        "Gives a score",
        "Gives specific evidence from the recording",
        "Writes a goal that can be checked in the next rehearsal",
      ],
      model:
        "Category: balance. Score: 2. In measures 17 to 24 the trombones were louder than the clarinets who had the melody. Goal: in the next rehearsal the trombones will play mezzo piano in those measures, and we will record it to check that the clarinets can be heard.",
      answers: [
        [
          "full",
          "[[0|Category: intonation.]] [[1|I give it a 2.]] [[2|The trumpets were sharp on the held note in measure 12.]] [[3|Goal: the trumpets tune to the clarinets before measure 12 and we will record to check.]]",
          "Full marks. The evidence and the goal are both specific.",
        ],
        [
          "full",
          "[[0|Rhythm.]] [[1|Score 2.]] [[2|The percussion rushed in measures 9 to 12 while the winds stayed steady.]] [[3|Goal: use the metronome on measures 9 to 12 and play them together twice with no rushing.]]",
          "All four marks. A metronome goal is something you can verify.",
        ],
        [
          "partial",
          "[[0|Dynamics.]] [[1|2.]] It was not loud and soft enough.",
          "Name where the dynamics were wrong, such as which measures, and add a goal.",
        ],
        [
          "partial",
          "[[0|Balance.]] [[3|Goal: next week the melody will be heard clearly.]]",
          "The goal is good but needs evidence and a score. Say which measures and give a number from 1 to 4.",
        ],
        [
          "weak",
          "Everything was bad so I give everything a 1.",
          "Choose one category and give specific evidence. That makes it possible to fix.",
        ],
        [
          "weak",
          "I do not like to judge the band so I will not do it.",
          "Using a rubric is not about blaming people. It helps the band find what to improve.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "A Bach chorale, and how a professional band performs it",
  note: `
## Objectives

Students will be able to:

1. listen to a professional performance and compare it with ours;
2. explain the history and style of a piece we are rehearsing.

## Materials

A recording of a Bach chorale arranged for band, a chorale score in four parts, the comparison chart, the worksheet.

## Starter (6 minutes)

Play the first four bars of a chorale. Ask students to listen for how many parts there are and whether they move together or independently.

## Main activity

1. History: Johann Sebastian Bach (1685 to 1750), a German composer of the Baroque period, wrote hundreds of chorales, which are four-part harmonizations of hymn tunes. They are used in band to practice tuning and blend.
2. Style: a chorale moves in block chords. The parts are soprano, alto, tenor and bass. Breath marks and fermatas show the phrases.
3. Compare: play a professional band recording, then our recording of the same chorale. Use the chart to compare tempo, tone, intonation, phrasing and balance.
4. Apply: try breathing at the ends of phrases, connecting notes smoothly (legato), and shaping each phrase with a crescendo and decrescendo.

## Checking for understanding

Ask: "What are the four parts of a chorale?" (Soprano, alto, tenor, bass.)

## Exit ticket

Write one thing the professionals did that we will try.
`,
  reading: [
    "Block chords, four voices, and learning from the best",
    `
Many band directors use a **chorale** to teach tuning and blend, and the most famous chorales are by **Johann Sebastian Bach** (1685 to 1750), a German composer of the **Baroque** period. Bach wrote or arranged hundreds of four-part chorales based on hymn tunes used in the Lutheran church. A chorale has four **voices**: **soprano** (the highest), **alto**, **tenor** and **bass** (the lowest). The voices move mostly together in **block chords**, with one note for each voice on each beat, which makes it easy to hear the harmony and the tuning.

Playing a chorale is hard because there is nowhere to hide. Every note is exposed. If one player is sharp, you hear it. If the balance is wrong, you hear that too. This is why a chorale is such good training. Follow these habits. Keep your tone **even** and your air **steady**. Connect the notes smoothly, which is called **legato**. Breathe only at the end of a **phrase**, where the music has a **breath mark** or a **fermata** (a hold). Shape each phrase by getting a little louder toward the middle and a little softer at the end. Most of all, listen to the voices above and below yours.

When you compare a professional performance with ours, look for these things on a chart. **Tempo**: is the pace steady? **Tone**: is the sound warm and full? **Intonation**: do the chords sound clean? **Phrasing**: does the music rise and fall like a sentence? **Balance**: is each voice heard? Then ask what the professionals do that our band can try. For example, they may stretch each phrase to the end, or the bass may sing out more than ours.

Comparing is not about saying we are worse. It is about finding specific things that make music sound professional, and trying them in our rehearsals.
`,
  ],
  cards: [
    ["Chorale", "A four-part harmonization of a hymn tune."],
    ["Baroque", "A period of European music from about 1600 to 1750."],
    ["Soprano", "The highest voice in a four-part chorale."],
    ["Bass", "The lowest voice in a four-part chorale."],
    ["Block chords", "Chords in which all voices move together on the beat."],
    ["Phrase", "A musical sentence with a clear shape."],
    ["Fermata", "A sign that tells you to hold a note longer."],
    ["Breath mark", "A sign showing where to breathe."],
  ],
  closed: [
    [
      "Who wrote hundreds of four-part chorales in the Baroque period?",
      ["Mozart", "Bach", "Sousa", "Gershwin"],
      "B",
    ],
    [
      "Which four voices are in a chorale?",
      [
        "Violin, flute, trumpet and drum",
        "Soprano, alto, tenor and bass",
        "High, middle, low and loud",
        "Treble, bass, alto and clef",
      ],
      "B",
    ],
    [
      "Why is a chorale good practice for tuning?",
      [
        "It is very fast",
        "All the notes are exposed in block chords",
        "It has no harmony",
        "It is played by one person",
      ],
      "B",
    ],
    [
      "Where should players usually breathe in a chorale?",
      [
        "In the middle of any note",
        "At the end of a phrase at a breath mark",
        "Never",
        "On every beat",
      ],
      "B",
    ],
    [
      "A fermata tells you to:",
      ["Play faster", "Hold the note longer", "Play very softly", "Skip the note"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain why a chorale is useful for a band, naming two skills it teaches and one habit for playing it well.",
      scheme: [
        "Describes a chorale as a four-part hymn harmonization by Bach or others",
        "Names one skill, such as tuning or blend",
        "Names a second skill, such as balance or listening",
        "Gives a habit, such as breathing at phrase ends or playing legato",
      ],
      model:
        "A chorale is a four-part harmonization of a hymn tune, like those of Bach. It teaches tuning and balance because all the notes are exposed in block chords. A good habit is to breathe only at the end of a phrase and to play smoothly, in legato.",
      answers: [
        [
          "full",
          "[[0|A chorale is a four-part hymn tune, like the ones Bach wrote.]] [[1|It teaches tuning because everyone's notes can be heard.]] [[2|It also teaches balance, because you have to hear all four parts.]] [[3|A good habit is breathing only at the end of a phrase and playing legato.]]",
          "Full marks. You explained why the chorale makes the problems easy to hear.",
        ],
        [
          "full",
          "[[0|A chorale is a hymn harmonized in four voices.]] [[1|Blend, because each part has to match the others.]] [[2|Listening, because you have to know your voice in the chord.]] [[3|Keep the air steady and breathe at the breath marks.]]",
          "All four marks. Each answer is accurate and connected.",
        ],
        [
          "partial",
          "[[0|A chorale has four voices.]] [[1|It helps with tuning.]]",
          "Good. Name a second skill and a habit for playing it well.",
        ],
        [
          "partial",
          "[[1|Tuning.]] [[2|Balance.]] [[3|Breathe at the end of phrases.]]",
          "The skills and the habit are right. Start with what a chorale is: a four-part harmonization of a hymn tune.",
        ],
        [
          "weak",
          "A chorale is a choir song for a church.",
          "Chorales are indeed related to church music, but in band we use them as a four-part exercise to practice tuning and balance.",
        ],
        [
          "weak",
          "It teaches us to play fast.",
          "A chorale is usually slow and smooth. It teaches tuning, blend and balance.",
        ],
      ],
    },
    {
      prompt:
        "After listening to a professional recording of a chorale, describe three things you would compare with our band's recording and what you would try.",
      scheme: [
        "Names a first feature to compare",
        "Names a second feature to compare",
        "Names a third feature to compare",
        "Says what the band will try as a result",
      ],
      model:
        "I would compare tempo, because the professionals keep a steady pace; intonation, because their chords are cleaner; and phrasing, because their phrases rise and fall. We would try to breathe only at the phrase ends and shape each phrase with a small crescendo and decrescendo.",
      answers: [
        [
          "full",
          "[[0|Tempo, to see if it stays steady.]] [[1|Intonation, to see if the chords are clean.]] [[2|Phrasing, to see how the music rises and falls.]] [[3|We would try breathing at the ends of phrases and shaping them.]]",
          "Full marks. Three clear features and an action for the band.",
        ],
        [
          "full",
          "[[0|Tone, because theirs is warmer.]] [[1|Balance, because the bass is stronger.]] [[2|Articulation, because they connect the notes.]] [[3|We will try more air and a stronger bass line.]]",
          "All four marks. Linking each feature to a change you can try is valuable.",
        ],
        [
          "partial",
          "[[0|Tempo.]] [[1|Intonation.]] [[2|Phrasing.]]",
          "The three features are good. Say what you would hear in each and what our band will try.",
        ],
        [
          "partial",
          "[[0|Tempo.]] [[3|We will try to play like them.]]",
          "Name two more features, and replace play like them with a specific idea, such as phrase shaping.",
        ],
        [
          "weak",
          "The professionals are just better so there is nothing to compare.",
          "There is always something specific to learn. Compare tempo, intonation, phrasing or balance.",
        ],
        [
          "weak",
          "I would compare the size of the band.",
          "Size is not a musical feature. Compare tempo, tone, intonation, phrasing or balance.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Subdivision, ratios in music and honor ensembles",
  note: `
## Objectives

Students will be able to:

1. relate musical patterns to mathematics, such as fractions and ratios in rhythm;
2. describe the role of music in your community and how you can take part in it.

## Materials

Rhythm tree chart, metronome, a list of ensembles and events (school, honor band, community), the worksheet.

## Starter (6 minutes)

Clap four quarter notes, then eight eighth notes, then sixteen sixteenth notes in the same time. Ask: "How many of each fit in one measure of 4/4?"

## Main activity

1. Fractions and sums: a measure of 4/4 sums to 4. Use eighth notes (1/2) and sixteenth notes (1/4). Fill measures with combinations such as quarter + 2 eighths + 4 sixteenths + quarter.
2. Triplets: three notes in the time of two. Ratio 3:2. Practice counting "tri-p-let."
3. Tempo and time: duration = beats / (beats per minute). A piece of 120 measures in 3/4 at 90 beats per minute lasts 120 × 3 / 90 = 4 minutes.
4. Community: school honor band, All-State auditions, community bands, church ensembles, the local symphony's youth programs. Make a list of two opportunities and a first step for each.

## Checking for understanding

Ask: "How many sixteenth notes equal one quarter note?" (Four.)

## Exit ticket

Write how long a piece lasts if it has 80 measures of 4/4 at 100 beats per minute.
`,
  reading: [
    "Counting and ratios, and finding your place in music outside class",
    `
You have used fractions to count rhythm since your first lessons. Now we look more closely at how note values fit together. In 4/4, a measure totals 4 beats. A **quarter note** is 1 beat, an **eighth note** is 1/2 beat and a **sixteenth note** is 1/4 beat. So one quarter note equals two eighth notes or four sixteenth notes. A measure with a quarter note (1), two eighth notes (1), four sixteenth notes (1) and another quarter note (1) adds up to 1 + 1 + 1 + 1 = 4. A **rest** counts the same way as a note of the same value.

A **triplet** divides one beat into three equal parts instead of two. We write the ratio as **3 to 2**: three notes are played in the time that two normally take. Counting "trip-a-let" or "1-trip-let" helps keep the notes even.

Because tempo is a rate, you can find how long a piece lasts. Total beats equals the number of measures times the beats per measure. The duration in minutes equals total beats divided by beats per minute. A piece with 100 measures of 4/4 at 100 beats per minute has 400 beats, so it lasts 400 ÷ 100 = 4 minutes. If the tempo is 80, it lasts 5 minutes, because 400 ÷ 80 = 5.

Music in your community offers many ways to keep playing. Many schools hold **honor bands** or **solo and ensemble contests**, where you can play for judges. Ohio has an All-State tradition of audition ensembles for high school students. Community bands and church or civic groups often welcome players of all ages. Orchestras and symphony programs sometimes offer youth ensembles and free concerts. You can start by choosing one group, finding out how to audition or join, and attending a performance to see what it is like.

The skills you learn in band, such as steady tempo, careful listening, teamwork and practice, help you in every part of life.
`,
  ],
  cards: [
    ["Sixteenth note", "Lasts one quarter of a beat."],
    ["Rest", "A silence that lasts as long as a note of the same value."],
    ["Triplet", "Three equal notes played in the time of two."],
    ["Ratio 3:2", "The ratio of notes in a triplet to the time of two notes."],
    ["Duration", "How long a piece lasts; beats divided by beats per minute."],
    ["Honor band", "An ensemble for selected students, often chosen by audition."],
    ["Solo and ensemble contest", "An event in which students play for judges."],
    ["Audition", "A short performance to be chosen for a group."],
  ],
  closed: [
    [
      "How many sixteenth notes are equal to one quarter note?",
      ["Two", "Three", "Four", "Eight"],
      "C",
    ],
    [
      "A piece of 100 measures of 4/4 at 100 beats per minute lasts:",
      ["2 minutes", "4 minutes", "5 minutes", "10 minutes"],
      "B",
    ],
    [
      "A triplet is three notes in the time of:",
      ["One", "Two", "Four", "Three"],
      "B",
    ],
    [
      "A measure of 4/4 has a half note, a quarter note and two eighth notes. What is the total?",
      ["3", "3.5", "4", "5"],
      "C",
    ],
    [
      "Which is a way to take part in music in your community?",
      [
        "Join a community band",
        "Avoid all concerts",
        "Never audition",
        "Wait until age 40",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Fill a measure of 4/4 with at least one quarter note, two eighth notes and four sixteenth notes, and add the fractions to show it totals 4 beats. Use any other note needed.",
      scheme: [
        "Includes a quarter note, two eighth notes and four sixteenth notes",
        "Adds the values with correct fractions",
        "Includes the extra note needed to reach four beats",
        "States that the measure totals 4 beats",
      ],
      model:
        "Quarter (1) + two eighths (1/2 + 1/2 = 1) + four sixteenths (1/4 × 4 = 1) + a quarter note (1) = 4 beats. The measure totals 4 beats.",
      answers: [
        [
          "full",
          "[[0|A quarter, two eighths, four sixteenths]] and [[2|another quarter]]. [[1|1 + 1/2 + 1/2 + 4 × 1/4 + 1]] [[3|= 4 beats total.]]",
          "Full marks. The fractions add up exactly to four.",
        ],
        [
          "full",
          "[[0|Quarter note, 2 eighths, 4 sixteenths]] and [[2|a quarter at the end]]. [[1|1 + 1 + 1 + 1]] [[3|equals 4 beats.]]",
          "All four marks. Grouping the values into whole beats makes it easy to check.",
        ],
        [
          "partial",
          "[[0|Quarter, two eighths, four sixteenths.]] [[1|1 + 1 + 1 = 3.]] I think it is 3 beats.",
          "You have the notes you needed but the measure only totals 3. You need one more beat, such as a quarter note.",
        ],
        [
          "partial",
          "[[0|Quarter, two eighths, four sixteenths, quarter.]] [[3|It is 4 beats.]]",
          "Correct. Show the addition with fractions to prove it.",
        ],
        [
          "weak",
          "Quarter, two eighths, four sixteenths is 7 notes, so 7 beats.",
          "The number of notes does not decide the beats. Add their values: 1 + 1 + 1.",
        ],
        [
          "weak",
          "Sixteenth notes are the longest, so four of them is 16 beats.",
          "A sixteenth note is the shortest of these, a quarter of a beat. Four sixteenths add up to one beat.",
        ],
      ],
    },
    {
      prompt:
        "A piece has 72 measures of 3/4 at 108 beats per minute. How long does it last in minutes and seconds? Show your work.",
      scheme: [
        "Finds the total beats, 72 times 3 = 216",
        "Divides by the tempo, 216 divided by 108 = 2",
        "States the duration as 2 minutes",
        "Includes the unit and the answer 2 minutes 0 seconds",
      ],
      model:
        "72 × 3 = 216 beats. 216 ÷ 108 = 2. The piece lasts 2 minutes, or 2 minutes 0 seconds.",
      answers: [
        [
          "full",
          "[[0|72 measures × 3 beats = 216 beats.]] [[1|216 ÷ 108 = 2.]] [[2|So 2 minutes.]] [[3|That is 2 minutes 0 seconds.]]",
          "Full marks. The method is exactly right.",
        ],
        [
          "full",
          "[[0|Total beats 72 × 3 = 216]], [[1|beats / beats per minute = 216 / 108 = 2]], [[2|2 minutes]], [[3|or 2:00]].",
          "All four marks. Brief and correct.",
        ],
        [
          "partial",
          "[[0|216 beats.]] 216 × 108 is 23,328.",
          "The number of beats is right. To find time you divide by the tempo: 216 ÷ 108 = 2 minutes.",
        ],
        [
          "partial",
          "[[1|216 ÷ 108 = 2 minutes.]] I did 72 divided by 3 first.",
          "Your final calculation is right but the first step was wrong. The beats are 72 times 3, not 72 divided by 3. Recheck.",
          true,
        ],
        [
          "weak",
          "72 + 3 + 108 = 183 seconds.",
          "Adding the numbers has no meaning. Multiply measures by beats per measure, then divide by the tempo.",
        ],
        [
          "weak",
          "It is 72 measures so about 72 seconds.",
          "A measure is not one second. At this tempo each beat is a little over half a second, so find the total beats first.",
        ],
      ],
    },
  ],
};

writeCourse("band-grade-10.json", "Band", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
