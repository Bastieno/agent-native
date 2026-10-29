import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Band, Grade 9, Quarter 1. Standards: National Core Arts Standards, Music
 * (performing, creating, responding, connecting), in the school's own words.
 * A beginning-to-intermediate concert band: tone and scales, following a
 * conductor, concert preparation, marching and pep band, composing with a
 * scale, form, listening critically, and rhythm as fractions. No practicals.
 */

const w1: WeekInput = {
  topic: "Tone, pitch and rhythm: scales and sight-reading",
  note: `
## Objectives

Students will be able to:

1. play assigned parts with accurate pitch, rhythm and tone;
2. perform the concert B-flat and E-flat major scales from memory;
3. sight-read a short passage at a steady tempo.

## Materials

Instruments, stands, a tuner and metronome, a sight-reading card (four bars in 4/4), the worksheet.

## Starter (8 minutes)

Long tones: everyone plays a concert B-flat for eight counts, listens to the tuner, then plays it again with a better breath. Ask: "What is the difference between a note that is in tune and a note that has a good tone?"

## Main activity

1. Review the concert B-flat major scale: B-flat, C, D, E-flat, F, G, A, B-flat. Play it slowly with the metronome at 72, one note to a beat, then at 96. Check fingerings, slurs and the key signature of two flats.
2. Add the concert E-flat major scale (three flats) and the arpeggio, the first, third, fifth and eighth notes.
3. Sight-reading routine: before you play, check the key and time signatures, find the hardest bar, scan for repeats, and count one measure aloud. Play the card at a tempo you can keep steady, not at a speed that makes you stop.
4. Section time: woodwinds, brass and percussion play the same card with the section leader checking pitch and rhythm.

## Checking for understanding

Ask three students to name the first step of sight-reading (check the key and time signature). Listen for the whole routine.

## Exit ticket

Write the notes of the concert E-flat major scale and say how many flats are in its key signature.
`,
  reading: [
    "Pitch, rhythm and tone: three things a band listens for",
    `
Every sound you make in band has three parts that the director and your neighbors are listening for. **Pitch** is how high or low a note is, and whether it matches the notes around you. **Rhythm** is when the note starts and how long it lasts. **Tone** is the quality of the sound: round and full, or thin and fuzzy. A player can have the right note at the right time and still sound poor if the tone is weak, which is why every rehearsal starts with long tones.

A **scale** is a set of notes in order, going up or down by steps. A **major scale** follows a pattern of whole steps and half steps: whole, whole, half, whole, whole, whole, half. Most band music uses the concert scales of B-flat, E-flat and F, because they are comfortable for brass and woodwind instruments. The concert B-flat major scale has two flats, B-flat and E-flat, and its notes are B-flat, C, D, E-flat, F, G, A and B-flat. The concert E-flat major scale has three flats, B-flat, E-flat and A-flat, and its notes are E-flat, F, G, A-flat, B-flat, C, D and E-flat. An **arpeggio** plays the notes of a chord one at a time, usually the first, third, fifth and eighth notes of the scale.

Remember that many band instruments are **transposing instruments**. A trumpet in B-flat plays a C and the sound that comes out is a concert B-flat. That is why your part may show a different key signature from the flute part.

**Sight-reading** means playing music you have not seen before. Good sight-readers do not rely on luck. They follow a routine. First, find the **key signature** and the **time signature**. Next, look for the hardest bar and scan for repeats, accidentals and rests. Then tap or count one measure out loud to set the tempo. Finally, play at a speed you can keep steady. A slow, steady performance with correct rhythm is better than a fast one that stops and starts. If you make a mistake, keep going and look ahead. Real bands do not stop to fix one wrong note in a concert.

Use a metronome when you practice scales. Start slower than you think you need, make every note even, then raise the tempo by 4 beats per minute only when the scale is clean.
`,
  ],
  cards: [
    ["Pitch", "How high or low a note is."],
    ["Tone", "The quality of a sound: full and round, or thin and fuzzy."],
    ["Major scale", "Eight notes in a pattern of whole and half steps: W W H W W W H."],
    ["Key signature", "The sharps or flats at the start of a staff that tell you the key."],
    ["Arpeggio", "The notes of a chord played one at a time."],
    ["Transposing instrument", "An instrument whose written notes sound at a different pitch."],
    ["Sight-reading", "Playing music you have not seen before."],
    ["Metronome", "A device that clicks a steady tempo in beats per minute."],
  ],
  closed: [
    [
      "How many flats are in the concert B-flat major key signature?",
      ["One", "Two", "Three", "Four"],
      "B",
    ],
    [
      "Which is the first thing to check when you begin sight-reading?",
      [
        "The last bar of the piece",
        "The key signature and time signature",
        "How fast the person next to you plays",
        "Whether the piece has lyrics",
      ],
      "B",
    ],
    [
      "A player's note is on pitch and on time but sounds thin and airy. Which part of the sound needs work?",
      ["Tone", "Rhythm", "Key signature", "Tempo marking"],
      "A",
    ],
    [
      "Which sequence of whole (W) and half (H) steps makes a major scale?",
      ["W H W W H W W", "W W H W W W H", "H W W H W W W", "W W W H W W H"],
      "B",
    ],
    [
      "While you are sight-reading in rehearsal you play one wrong note. What should you do?",
      [
        "Stop the whole band",
        "Keep going and look ahead",
        "Start over from the first bar",
        "Put down your instrument",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write the notes of the concert E-flat major scale, say how many flats are in the key signature and name them.",
      scheme: [
        "Writes the scale notes in order, E-flat F G A-flat B-flat C D E-flat",
        "States that the key signature has three flats",
        "Names the flats as B-flat, E-flat and A-flat",
      ],
      model:
        "The concert E-flat major scale is E-flat, F, G, A-flat, B-flat, C, D, E-flat. Its key signature has three flats: B-flat, E-flat and A-flat.",
      answers: [
        [
          "full",
          "[[0|E-flat, F, G, A-flat, B-flat, C, D, E-flat]]. [[1|It has 3 flats]] and [[2|they are B-flat, E-flat and A-flat]].",
          "Full marks. The notes and the flats are correct and in order.",
        ],
        [
          "full",
          "[[0|Eb F G Ab Bb C D Eb]]. The key signature has [[1|three flats]] which are [[2|Bb, Eb and Ab]]. I remember it by the order of flats, B E A.",
          "All three marks, and the memory trick of B, E, A is useful.",
        ],
        [
          "partial",
          "[[0|E-flat, F, G, A-flat, B-flat, C, D, E-flat]]. It has two flats.",
          "The scale is right. The key signature has three flats, because A-flat is in the scale as well as B-flat and E-flat.",
        ],
        [
          "partial",
          "E-flat, F, G, A, B-flat, C, D, E-flat. [[1|Three flats]], [[2|Bb, Eb and Ab]].",
          "The flats are right, which means the fourth note in the scale should be A-flat, not A natural. Check it against the key signature.",
        ],
        [
          "weak",
          "E-flat has no sharps so it is easy, it is E F G A B C D E.",
          "In the E-flat scale you play the flats in the key signature. Writing E, F, G without any flats would be the scale of E major with sharps instead.",
        ],
        [
          "weak",
          "[[1|It has three flats]] but I do not remember which.",
          "The count is right. Learn the order of flats: B, E, A, D. For three flats, those are the first three, B-flat, E-flat and A-flat.",
        ],
      ],
    },
    {
      prompt:
        "A trumpet player in B-flat says, \"My music has no flats but the band is playing in B-flat.\" Explain why this can be true, and describe the sight-reading routine you would use before playing a new piece.",
      scheme: [
        "Explains that a B-flat trumpet is a transposing instrument",
        "Explains that the written C sounds as the concert B-flat, so the written key differs",
        "Checks the key signature and time signature first",
        "Scans for the hardest bar and sets a steady tempo, by counting or tapping",
      ],
      model:
        "A B-flat trumpet is a transposing instrument, so its written C sounds as concert B-flat. The written key for the trumpet has no flats even though the band sounds in B-flat. Before sight-reading I check the key and time signatures, find the hardest bar, and count one measure to set a steady tempo.",
      answers: [
        [
          "full",
          "[[0|A trumpet is a transposing instrument.]] [[1|What the player reads as C sounds as B-flat, so the written key is different from the concert key.]] Before I play I [[2|check the key and time signature first,]] then [[3|find the hardest bar and count a measure to pick a steady tempo.]]",
          "Full marks. You separated the written note from the sounding note clearly.",
        ],
        [
          "full",
          "That is true because [[0|trumpet is a transposing instrument]] and [[1|a written C comes out as a concert B-flat]]. My routine: [[2|key signature and time signature]], [[3|look for hard parts and tap the tempo before I start]].",
          "All four marks. Short but complete and in a good order.",
        ],
        [
          "partial",
          "[[0|A trumpet is a transposing instrument]], so the music looks different. First I read the notes.",
          "Good start on the transposing idea. For the routine, begin with the key and time signatures, and say what the written C sounds like.",
        ],
        [
          "partial",
          "The trumpet part is in a different key. [[2|I check the key signature and time signature]] and [[3|count one measure]].",
          "Your routine is good. Say why the part is in a different key: the trumpet is a transposing instrument and sounds a step lower than written.",
        ],
        [
          "weak",
          "The part has no flats because the trumpet player does not need them.",
          "Every instrument plays in the same key as the band. The part is written in a different key to make the sounding pitch match, because the trumpet is a transposing instrument.",
        ],
        [
          "weak",
          "I just start playing and look at the notes as I go, it is faster.",
          "Starting without a plan is how mistakes pile up. Check the key and time signatures first, then find the hardest bar and set the tempo.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Following the conductor: tempo, dynamics, blend and balance",
  note: `
## Objectives

Students will be able to:

1. follow a conductor's cues for tempo, dynamics and entrances;
2. balance and blend your sound with the other players in your section.

## Materials

Baton or conducting practice cards, a video clip of a conductor (school-approved), a dynamics chart, the worksheet.

## Starter (6 minutes)

Eyes on the conductor. Without sound, conduct four beats at a slow tempo, then a fast tempo, and ask students to say what they noticed about the size and speed of the pattern.

## Main activity

1. The conductor's right hand keeps the beat with a pattern (down, left, right, up for four beats). The left hand shows dynamics and cues entrances. The preparatory beat tells you the tempo and breath before you begin, and the cut-off tells you when to stop.
2. Dynamics: pianissimo (very soft), piano (soft), mezzo piano, mezzo forte, forte (loud) and fortissimo (very loud). Play a concert B-flat for four counts at each level, then a crescendo and a decrescendo.
3. Blend: in a unison line, you should not hear yourself standing out. Practice matching your section's tone, with the section leader as the model.
4. Balance: the melody should be heard above the accompaniment. Play a short chorale with the melody at mezzo forte and the harmony at mezzo piano.

## Checking for understanding

Ask: "If you can hear yourself over the clarinet next to you, what should you do?" (Play softer or match their tone.)

## Exit ticket

Name two things the conductor's left hand can show.
`,
  reading: [
    "Making one sound out of forty players",
    `
A band has dozens of players, and the audience should hear one musical idea, not dozens of individuals. The person who makes this possible is the **conductor**. The conductor keeps everyone together by showing the **tempo** (the speed), by shaping the **dynamics** (how loud or soft), and by cueing **entrances** and **cut-offs** (the exact moment a note begins or ends).

For a piece in 4/4 time, the right hand usually draws a pattern of four beats: down, in, out and up. The size of the pattern suggests the dynamics, with a smaller pattern for soft music and a larger one for loud. The left hand often shows dynamics, balances sections and points to an instrument that is about to enter. Before the band begins, the conductor gives a **preparatory beat**, a gesture that shows the tempo and when to breathe. Watch it, not the music, for that moment.

Dynamics are marked with Italian words and letters. **Pianissimo (pp)** is very soft, **piano (p)** is soft, **mezzo piano (mp)** is medium soft, **mezzo forte (mf)** is medium loud, **forte (f)** is loud and **fortissimo (ff)** is very loud. A **crescendo** gets gradually louder, and a **decrescendo** or diminuendo gets gradually softer. These words are relative: your forte should be a full, strong sound, not a harsh or out-of-tune one.

Two other ideas make a band sound professional. **Blend** is matching the color and volume of the players in your section so that a line of six flutes sounds like one instrument. If you can pick your own sound out of the section, you are probably too loud or your tone does not match. **Balance** is the volume relationship between parts. The melody should be heard over the accompaniment, so players of the accompaniment play a little softer, even if the music says the same dynamic.

To improve, listen more than you play. Ask yourself three questions in rehearsal: Am I with the conductor? Am I in tune with the sections around me? Can I hear the melody?
`,
  ],
  cards: [
    ["Conductor", "The leader who shows tempo, dynamics and cues to keep the band together."],
    ["Preparatory beat", "A gesture before the first note that shows the tempo and when to breathe."],
    ["Cut-off", "The conductor's signal for when a note ends."],
    ["Dynamics", "How loud or soft the music is."],
    ["Forte (f)", "Loud."],
    ["Piano (p)", "Soft."],
    ["Blend", "Matching tone and volume so a section sounds like one voice."],
    ["Balance", "Making sure the melody is heard over the other parts."],
  ],
  closed: [
    [
      "Which dynamic marking means very soft?",
      ["ff", "mf", "pp", "mp"],
      "C",
    ],
    [
      "What does the preparatory beat tell the band?",
      [
        "The title of the piece",
        "The tempo and when to breathe",
        "Which section plays first",
        "How many bars are left",
      ],
      "B",
    ],
    [
      "A crescendo is a gradual change from:",
      ["Loud to soft", "Soft to loud", "Fast to slow", "Slow to fast"],
      "B",
    ],
    [
      "In a band with a clarinet melody and a tuba accompaniment, what should the tuba players do to help the balance?",
      [
        "Play louder than the clarinets",
        "Play a little softer than the melody",
        "Stop playing",
        "Change the notes",
      ],
      "B",
    ],
    [
      "You can hear your own trumpet clearly over the rest of the section in a unison passage. What is most likely true?",
      [
        "You are blending perfectly",
        "You are probably too loud or your tone does not match",
        "The conductor is too slow",
        "The section is too soft",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain the difference between blend and balance in a concert band, and give an example of each in a rehearsal.",
      scheme: [
        "Defines blend as matching tone and volume within a section",
        "Gives an example of blend, such as a flute section sounding like one instrument",
        "Defines balance as the volume relationship between parts so the melody is heard",
        "Gives an example of balance, such as the accompaniment playing softer than the melody",
      ],
      model:
        "Blend is matching the tone and volume of the players in a section so they sound like one instrument, for example six flutes playing a unison line. Balance is the volume relationship between different parts so the melody can be heard, for example the tubas and horns playing softer than the clarinet melody.",
      answers: [
        [
          "full",
          "[[0|Blend is when the players in one section match their tone and volume.]] [[1|Like six flutes should sound like one flute.]] [[2|Balance is how loud the different parts are compared to each other so you hear the melody.]] [[3|For example the accompaniment plays softer than the clarinet melody.]]",
          "Full marks. You tied each idea to a clear example.",
        ],
        [
          "full",
          "[[0|Blend is a section matching so no one sticks out.]] [[1|The trumpets in a unison line are an example.]] [[2|Balance is making sure the melody is louder than the background parts.]] [[3|In the chorale the low brass play mp while the melody plays mf.]]",
          "All four marks. The chorale is a good real example from our rehearsal.",
        ],
        [
          "partial",
          "[[0|Blend is matching your section.]] [[2|Balance is hearing the melody.]]",
          "You have both definitions. Add a rehearsal example for each, such as a unison line for blend and soft accompaniment for balance.",
        ],
        [
          "partial",
          "Blend is how loud the whole band is. [[2|Balance is making the melody louder than the other parts.]] [[3|The tubas play softer.]]",
          "Balance is right. Blend is about matching within a section, not the loudness of the whole band. A unison line shows it well.",
        ],
        [
          "weak",
          "Blend is mixing the band together and balance is standing up straight.",
          "Balance is about volume between the parts, not posture. Blend is matching tone and volume within a section so it sounds like one instrument.",
        ],
        [
          "weak",
          "They are the same thing, both are playing at the same volume.",
          "They are different. Blend is within a section, where everyone matches. Balance is between parts, where the melody should be a little louder than the accompaniment.",
        ],
      ],
    },
    {
      prompt:
        "The conductor gives a preparatory beat and then cues the flutes to enter at mezzo forte. Describe three things you should do as a flute player to be ready, in order.",
      scheme: [
        "Watches the conductor, not the music, at the preparatory beat",
        "Takes a breath in the tempo shown",
        "Starts at the dynamic mezzo forte, not louder",
        "Listens to blend with the section and the balance with other parts",
      ],
      model:
        "I watch the conductor at the preparatory beat, take a breath in the tempo that the beat shows, enter together with the section at mezzo forte, and listen so my sound blends with the other flutes and does not cover the melody.",
      answers: [
        [
          "full",
          "[[0|First I look up and watch the conductor for the preparatory beat.]] [[1|I breathe in at the speed the beat shows.]] [[2|Then I start at mezzo forte, medium loud.]] [[3|I listen to blend with the flutes and to the balance.]]",
          "Full marks. The order of what you do is exactly what a good player does.",
        ],
        [
          "full",
          "I [[0|keep my eyes on the conductor during the prep beat]], [[1|breathe in on the beat and be ready to go]], [[2|play at mf, not louder]], and [[3|listen to match the other flutes and not drown out the melody]].",
          "All four marks. Clear and in order, with the listening included.",
        ],
        [
          "partial",
          "[[0|Watch the conductor.]] [[2|Play mezzo forte.]]",
          "Both are right. Add the breath in tempo and the listening for blend and balance to complete the sequence.",
        ],
        [
          "partial",
          "[[1|Take a breath on the prep beat.]] Look at my music so I do not miss the notes.",
          "The breath is correct. At the preparatory beat you should be looking at the conductor, not the music, so you start together.",
        ],
        [
          "weak",
          "Play as loud as I can so the conductor hears the flutes enter.",
          "Entering louder than marked breaks the balance. Mezzo forte means medium loud, so match that level and blend with the section.",
        ],
        [
          "weak",
          "Wait for the person next to me to start and then copy them.",
          "Copying a neighbor makes you late. The conductor's preparatory beat shows exactly when to begin, so watch the conductor and enter on the beat.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Posture, breath and instrument care; preparing for a concert",
  note: `
## Objectives

Students will be able to:

1. perform with correct posture, breath support and instrument care;
2. prepare for a concert, including a warm-up routine and a rehearsal plan.

## Materials

Mirrors, cleaning kits (swabs, cork grease, valve oil), a concert calendar, the worksheet.

## Starter (6 minutes)

Posture check: students sit at the front edge of the chair, feet flat, back tall. Hold your instrument and take a deep, slow breath in for four counts, out for four. Ask: "How does your breath feel different when you slouch?"

## Main activity

1. Posture and breath: sit or stand tall, shoulders relaxed, breathe from the diaphragm so the belly expands, not the chest. A steady stream of air makes a steady tone.
2. Instrument care by section: woodwinds swab after playing and check pads and reeds; brass oil valves and grease slides and empty the water; percussion check sticks, heads and stands. Never leave an instrument on a chair or on the floor.
3. A warm-up routine: long tones, a slow scale, an arpeggio, and a passage from the concert piece, about ten minutes in total.
4. Concert preparation: make a timeline. The concert is in five weeks; each week has a goal (notes, rhythm, dynamics, run-through, final polish).

## Checking for understanding

Cold-call: "What do you do at the end of rehearsal to take care of your instrument?" Each answer should be specific to the instrument family.

## Exit ticket

Write a three-part warm-up routine for your instrument.
`,
  reading: [
    "Getting ready to play, and getting ready for a concert",
    `
Good playing starts with the body. **Posture** is how you sit or stand with your instrument. Sit on the front half of your chair with your feet flat on the floor and your back tall but not stiff. Keep your shoulders relaxed and your head level. Your instrument should come to you, rather than you bending down to it. Good posture opens your lungs and keeps your hands free to move.

**Breath support** is how you use air to produce a steady tone. Breathe in deeply so your belly and ribs expand, not just your chest, and let the air out in a steady stream controlled by your stomach muscles. Wind players need to practice this every day. Percussionists need good posture and relaxed grips to avoid injury. A steady stream of air makes steady pitch, and a tight, tired body makes a pinched sound.

**Instrument care** keeps your instrument playing and saves money. Woodwind players swab the inside after every session, keep reeds in a case and handle keys gently. Brass players oil valves, grease slides and empty water from the instrument, and wipe the outside with a soft cloth. Percussionists check that sticks are not cracked, that drum heads are tuned and stands are stable. Never leave an instrument on a chair, on the floor or in a hot car. Most repairs are caused by bumps and neglect.

A **warm-up** prepares both your body and your sound. A ten-minute routine might include long tones to find your best tone, a slow major scale, an arpeggio, and a short, difficult passage from your concert music played slowly. Warm-ups work best when done in the same order each time.

**Concert preparation** takes weeks. Work backward from the concert date. If the concert is five weeks away, week one is learning the notes and rhythms, week two is fixing difficult passages, week three adds dynamics and balance, week four is full run-throughs, and week five is a final polish and a dress rehearsal. On concert day, arrive early, bring your instrument, music and a pencil, wear the concert dress, and listen carefully to the conductor. A good concert is the result of good habits in every rehearsal.
`,
  ],
  cards: [
    ["Posture", "How you sit or stand while playing: tall, relaxed and balanced."],
    ["Breath support", "Using a deep breath and steady air to produce a steady tone."],
    ["Swab", "A cloth pulled through a woodwind to remove moisture."],
    ["Valve oil", "A lubricant used on brass valves."],
    ["Warm-up", "A short routine to prepare your body and sound before playing."],
    ["Run-through", "Playing a whole piece from beginning to end without stopping."],
    ["Dress rehearsal", "A final practice done in concert dress and setup."],
    ["Long tones", "Sustained notes used to develop tone and breath control."],
  ],
  closed: [
    [
      "Which is the best way to sit when playing in band?",
      [
        "Slouched against the back of the chair",
        "On the front half of the chair with feet flat and back tall",
        "With your legs crossed",
        "Leaning forward over your music",
      ],
      "B",
    ],
    [
      "A clarinet player should do which of these after rehearsal?",
      [
        "Leave the reed on the mouthpiece in the case",
        "Swab the inside and put the reed in its holder",
        "Wash the clarinet in the sink",
        "Leave the clarinet on a chair",
      ],
      "B",
    ],
    [
      "Why do wind players need good breath support?",
      [
        "It makes the instrument heavier",
        "It produces a steady tone and pitch",
        "It replaces the need to practice",
        "It makes the music quieter",
      ],
      "B",
    ],
    [
      "A concert is in five weeks. What is a sensible plan for the first week?",
      [
        "Dress rehearsal",
        "Learn the notes and rhythms",
        "Final polish",
        "Add dynamics only",
      ],
      "B",
    ],
    [
      "Which is the best place to leave your instrument during a short break in rehearsal?",
      [
        "On your chair",
        "On the floor beside you",
        "In its case or on a safe stand",
        "In a hot car",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Describe a ten-minute warm-up routine for your instrument (or a trumpet, if you play percussion) and explain why each part is included.",
      scheme: [
        "Includes long tones and says they help tone and breath control",
        "Includes a slow scale or arpeggio and says it builds accuracy and technique",
        "Includes a passage from the concert music played slowly",
        "Says the routine is done in the same order each time or gives its time breakdown",
      ],
      model:
        "I start with two minutes of long tones to find my best tone and steady my breath. Then I play a slow major scale and arpeggio for three minutes to build accuracy. Then I play the hardest passage from our concert piece slowly for five minutes. I do the routine in the same order every time so it becomes a habit.",
      answers: [
        [
          "full",
          "[[0|I start with long tones, 2 minutes, to get a good tone and control my air.]] [[1|Then a slow B-flat scale and arpeggio for 3 minutes so my fingers and notes are accurate.]] [[2|Then the hard part of our concert piece at a slow tempo, 5 minutes.]] [[3|I do it in the same order every day so it is a habit.]]",
          "Full marks. Every part has a reason and the minutes add up to ten.",
        ],
        [
          "full",
          "[[0|Long tones first because they help tone and breath]]. [[1|Then a scale and arpeggio slowly to work on technique]]. [[2|Last I play one passage from the concert music slowly]]. [[3|The same order each time, around ten minutes.]]",
          "All four marks. The order moves from the basics toward the music, which is exactly right.",
        ],
        [
          "partial",
          "[[0|Long tones for tone.]] [[1|A scale.]]",
          "You have two good parts. Add a slow passage from the concert music and say the routine is done in the same order each time.",
        ],
        [
          "partial",
          "[[2|I play the hardest part of the concert piece.]] Then I play the whole piece fast to warm up.",
          "Playing the hard part slowly is right. Warming up with the whole piece fast skips the basics. Start with long tones and a scale, and slow the passage down.",
        ],
        [
          "weak",
          "I just play the song once and that is my warm-up.",
          "A warm-up prepares your body and sound before you play the music. Start with long tones, add a scale, then a slow passage from the piece.",
        ],
        [
          "weak",
          "I do not need a warm-up because I practice at home.",
          "Even with home practice, a short warm-up each time prepares your breath and your sound. Rehearsal starts better when everyone warms up.",
        ],
      ],
    },
    {
      prompt:
        "The winter concert is five weeks away. Make a week-by-week rehearsal plan and say what the goal is for each week.",
      scheme: [
        "Week 1 goal is learning notes and rhythms",
        "Week 2 or 3 goal is fixing difficult passages and adding dynamics",
        "Week 4 goal is full run-throughs",
        "Week 5 goal is the final polish and a dress rehearsal",
      ],
      model:
        "Week 1: learn the notes and rhythms. Week 2: fix the difficult passages. Week 3: add dynamics and balance. Week 4: full run-throughs of the whole program. Week 5: final polish and a dress rehearsal in concert dress.",
      answers: [
        [
          "full",
          "[[0|Week 1: learn the notes and rhythms.]] [[1|Week 2: fix the hard passages. Week 3: add dynamics and balance.]] [[2|Week 4: run through the whole program without stopping.]] [[3|Week 5: polish and do a dress rehearsal.]]",
          "Full marks. Each week builds on the last and the plan ends with a dress rehearsal.",
        ],
        [
          "full",
          "[[0|1 is learning the notes and counting the rhythms]], [[1|2 is working out hard spots and 3 is adding dynamics]], [[2|4 is full run-throughs]], [[3|and 5 is the final polish and dress rehearsal.]]",
          "All four marks. A realistic and complete plan.",
        ],
        [
          "partial",
          "[[0|Week 1 learn the notes.]] Weeks 2, 3 and 4 practice a lot. [[3|Week 5 dress rehearsal.]]",
          "The first and last weeks are right. Give the middle weeks specific goals: fix hard passages, add dynamics, then do run-throughs.",
        ],
        [
          "partial",
          "[[2|Run through the whole program every week.]] [[3|The last week is a dress rehearsal.]]",
          "Run-throughs matter, but you cannot run through the program before the notes are learned. Begin with notes and rhythms, then work toward run-throughs.",
        ],
        [
          "weak",
          "Play the songs every day for five weeks.",
          "Playing every day is good, but the plan should change week by week: learn notes, fix hard parts, add dynamics, run through, then polish.",
        ],
        [
          "weak",
          "We should start the dress rehearsal in week 1 so we are ready.",
          "A dress rehearsal is for the end, when everything is learned. Week 1 is for learning the notes and rhythms.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Marching and pep band, and keeping a practice log",
  note: `
## Objectives

Students will be able to:

1. perform in marching band or pep band with correct formation and movement;
2. keep a practice log and set goals for improvement.

## Materials

Field or gym floor marked with yard lines, a drill chart for a short set, a practice log template, the quiz.

## Starter (6 minutes)

Count off by fours while marching in place with a steady step. Ask: "Why does a marching band need everyone to take the same size step?"

## Main activity

1. Marching basics: posture (chest up, shoulders back), a steady tempo with eight steps to five yards (the standard "8 to 5" step size), the horns-up position, and mark time (marching in place).
2. Formation: read a simple drill chart with dots for players and yard lines. Move from a block into a line and then a wedge in sixteen counts.
3. Pep band: playing in the stands for a basketball game. Short pieces, big dynamics, watch the leader, stay seated, and keep the instrument safe in a crowd.
4. Practice log: record date, minutes, what you worked on, and one goal. Set a goal using the SMART format (specific, measurable, achievable, relevant, time-bound).

## Checking for understanding

Ask: "What does 8 to 5 mean?" (Eight steps cover five yards.)

## Exit ticket

Write one SMART goal for your instrument for the next two weeks.
`,
  reading: [
    "Moving with the band, and tracking your progress",
    `
Concert band sits still, but marching band moves. A marching band performs at football games, in parades and at contests, playing and moving at the same time. The most important skill is **uniformity**: everyone moves in the same way, at the same tempo, and in the same direction.

The foundation is posture and tempo. Stand tall with your chest up and your shoulders back. Hold your instrument at the same height as everyone else, which is called the **horns-up** position. Marching bands count their step size in a ratio of **8 to 5**, which means eight steps cover five yards, so each step is 22.5 inches. If everyone takes the same step size at the same tempo, the lines stay straight. **Mark time** means marching in place without moving forward, and is used while the band waits for the next move.

A **drill chart** is a diagram that shows where each player stands in each set. Dots stand for players, and the yard lines on the field show exact places. A **set** is one formation, and a **count** is one beat of movement between sets. A move from a block into a line in sixteen counts means that each player moves a set distance at an even pace, and they all arrive on the sixteenth count. Learning your spot in the drill means you can keep the formation clean.

A **pep band** is a smaller group that plays at basketball games or school events, usually from the stands. The music is short, loud and exciting. The leader signals the next song, you stay with the tempo, and you keep your instrument safe in a crowded space. Pep band is all about energy and teamwork.

To grow as a musician, keep a **practice log**. Write the date, how many minutes you practiced, what you worked on and a note about how it went. Then set a goal. A **SMART goal** is Specific, Measurable, Achievable, Relevant and Time-bound. "Practice more" is vague. "Play the concert B-flat scale at 96 beats per minute with no errors by Friday, practicing 15 minutes a day" is a SMART goal because you can tell exactly whether you reached it.
`,
  ],
  cards: [
    ["Marching band", "A band that plays and moves in formation, often at football games and parades."],
    ["Horns up", "A position in which the instrument is held at the same height as everyone else."],
    ["8 to 5", "A step size in which eight steps cover five yards."],
    ["Mark time", "Marching in place."],
    ["Drill chart", "A diagram showing where each player stands in each formation."],
    ["Set", "One formation in a marching show."],
    ["Pep band", "A smaller band that plays at games and school events, usually in the stands."],
    ["SMART goal", "A goal that is Specific, Measurable, Achievable, Relevant and Time-bound."],
  ],
  closed: [
    [
      "In an 8 to 5 step, how long is each step in inches?",
      ["18", "22.5", "30", "36"],
      "B",
    ],
    [
      "Which is the best description of mark time?",
      [
        "Marching forward quickly",
        "Marching in place",
        "Stopping and resting",
        "Marching backward",
      ],
      "B",
    ],
    [
      "A drill chart shows:",
      [
        "The notes of each part",
        "Where each player stands in each formation",
        "The score of the game",
        "The tempo of each song",
      ],
      "B",
    ],
    [
      "Which of these is a SMART goal?",
      [
        "Get better at scales",
        "Practice more",
        "Play the F major scale at 88 beats per minute with no errors by Friday",
        "Be the best in the band",
      ],
      "C",
    ],
    [
      "At a basketball game in the stands, what should pep band players do with their instruments?",
      [
        "Leave them on the bleachers",
        "Keep them safe and in hand in the crowd",
        "Hand them to friends",
        "Leave them under a seat",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain what \"8 to 5\" means in marching band and calculate how many steps it takes to march 20 yards.",
      scheme: [
        "States that eight steps cover five yards",
        "Sets up the calculation: 20 yards is four times 5 yards",
        "Calculates 4 times 8 equals 32 steps",
        "Gives the answer as 32 steps",
      ],
      model:
        "8 to 5 means eight steps cover five yards. Twenty yards is four groups of five yards, so the band takes 4 times 8 = 32 steps.",
      answers: [
        [
          "full",
          "[[0|8 to 5 means eight steps go five yards.]] [[1|20 yards is four sets of 5 yards.]] [[2|4 times 8 is 32.]] [[3|So it takes 32 steps.]]",
          "Full marks. The grouping of 20 yards into fives is a clear approach.",
        ],
        [
          "full",
          "[[0|In 8 to 5, eight steps = 5 yards.]] [[1|20 / 5 = 4 groups]], [[2|4 × 8 = 32]] [[3|steps.]]",
          "All four marks. Showing the division and then the multiplication is exactly right.",
        ],
        [
          "partial",
          "[[0|Eight steps is five yards.]] 20 yards takes 20 steps.",
          "The meaning is right. A yard is not one step. Since 5 yards takes 8 steps, 20 yards takes 4 times as many, which is 32.",
        ],
        [
          "partial",
          "[[1|20 divided by 5 is 4]] and 4 plus 8 is 12 steps.",
          "The first step is right. You need to multiply, not add: four groups of 8 steps is 32 steps.",
        ],
        [
          "weak",
          "It means 8 players and 5 drums.",
          "8 to 5 is a step size, not a number of players. It means eight steps cover five yards.",
        ],
        [
          "weak",
          "[[3|32 steps]] because that is how many it usually is.",
          "The number is correct. Show how you got it: 20 yards is four groups of 5 yards, and each group takes 8 steps.",
          true,
        ],
      ],
    },
    {
      prompt:
        "Write one SMART goal for your instrument for the next two weeks, and explain which parts make it specific, measurable and time-bound.",
      scheme: [
        "States a goal about a specific skill or passage",
        "Includes a measurable target, such as a tempo, accuracy or number of minutes",
        "Includes a deadline within two weeks",
        "Explains which parts make it specific, measurable and time-bound",
      ],
      model:
        "My goal is to play the concert B-flat scale, two octaves, at 96 beats per minute with no wrong notes by Friday of week two, practicing 15 minutes a day. It is specific because it names the scale, measurable because of the tempo and no wrong notes, and time-bound because it has a deadline.",
      answers: [
        [
          "full",
          "[[0|I will play the concert B-flat scale from memory]] [[1|at 96 beats per minute with no wrong notes]] [[2|by Friday two weeks from now.]] [[3|It is specific because it names the scale, measurable because of the tempo and mistakes, and time-bound because of Friday.]]",
          "Full marks. You even explained which part of the goal does which job.",
        ],
        [
          "full",
          "[[0|My goal is to play measures 9 to 16 of our concert piece]] [[1|with correct rhythm in 4 out of 5 tries]] [[2|by the end of next week.]] [[3|Specific: measures 9 to 16. Measurable: 4 out of 5 tries. Time-bound: end of next week.]]",
          "All four marks. Counting tries is a smart way to measure a passage.",
        ],
        [
          "partial",
          "[[0|I will play my scales better]] [[2|by next week]].",
          "The goal has a deadline, but better is not measurable. Say which scale, at what tempo and with how few mistakes.",
        ],
        [
          "partial",
          "[[0|I will learn the solo section.]] [[1|I will play it at the correct tempo.]]",
          "Specific and measurable, which is good. Add a deadline, such as by Friday of week two, and explain which parts make the goal SMART.",
        ],
        [
          "weak",
          "I will practice more.",
          "Practice more is too vague to check. Name what you will play, how you will measure success, and by when.",
        ],
        [
          "weak",
          "I will be the first chair by the winter concert.",
          "First chair is an outcome and depends on others. A SMART goal is about what you will do, such as a passage, a tempo and a date.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Composing with a scale, arranging, and reading key and time signatures",
  note: `
## Objectives

Students will be able to:

1. compose or improvise a short melody using a given scale;
2. arrange a simple phrase for your instrument by changing rhythm or dynamics;
3. read and interpret key signatures, time signatures and musical terms.

## Materials

Staff paper, pencils, a keyboard or mallet instrument for hearing ideas, the problem set.

## Starter (6 minutes)

Clap a four-beat rhythm and ask students to echo it. Change one beat and ask them to describe how it changed.

## Main activity

1. Composing with a scale: choose the concert B-flat major scale. Write a four-bar melody in 4/4. Use notes from the scale, begin and end on B-flat, and use at least two different rhythms. Play it to check it.
2. Improvising: with a backing chord, play a short answer to a four-beat call from the teacher using only notes of the scale.
3. Arranging: take the same four-bar phrase and change it: make the rhythm different, add dynamics, or change the articulation.
4. Reading signatures: a key signature tells you the sharps or flats. A time signature tells you how many beats are in a measure (the top number) and which note gets a beat (the bottom number). Review terms: allegro, andante, ritardando, staccato, legato.

## Checking for understanding

Ask: "In 3/4, how many beats are in a measure and which note gets one beat?" (Three, the quarter note.)

## Exit ticket

Write a four-beat rhythm in 4/4 using one half note and two quarter notes.
`,
  reading: [
    "Writing your own music",
    `
Every piece of music was once a blank page. **Composing** is writing new music, and **improvising** is making it up on the spot. Both begin with a scale, because the notes of a scale fit together and make a melody sound natural.

Start with a key. The concert B-flat major scale uses B-flat, C, D, E-flat, F, G and A. A simple melody uses mostly **steps**, moving to the next note, with a few **skips**, moving over a note. Begin and end on the first note of the scale, B-flat, which is called the **tonic** and gives the melody a sense of home. A four-bar melody in 4/4 has sixteen beats in total. You could use quarter notes, half notes and a few eighth notes, so the rhythm is not all the same.

**Improvising** works the same way, but in real time. If the leader plays a four-beat call, you play a four-beat answer using only notes from the scale. Because you stay inside the scale, nothing you play will clash with the chord underneath. Improvisation gets better with practice and with confidence.

**Arranging** means changing music to suit different players or to give it a new feel. You can take a phrase and change its rhythm, add dynamics such as a crescendo, switch from smooth **legato** to short **staccato**, or move it to a different instrument.

To read music well, you need to understand its signs. The **key signature** shows which notes are sharp or flat all the way through the piece. The **time signature** has two numbers. The top number says how many beats are in each measure, and the bottom number says which note gets one beat. In 4/4 there are four beats and the quarter note gets one. In 3/4 there are three beats, which feels like a waltz. In 6/8 there are six beats, with the eighth note getting one.

Finally, learn the Italian words. **Allegro** is fast, **andante** is a walking pace, **ritardando** means gradually slowing down, **staccato** means short and detached, and **legato** means smooth and connected.
`,
  ],
  cards: [
    ["Compose", "To write new music."],
    ["Improvise", "To create music on the spot."],
    ["Tonic", "The first note of a scale, which feels like home."],
    ["Arrange", "To change music to suit different players or to give it a new style."],
    ["Time signature", "Two numbers: beats per measure over the note that gets one beat."],
    ["Legato", "Smooth and connected."],
    ["Staccato", "Short and detached."],
    ["Ritardando", "Gradually slowing down."],
  ],
  closed: [
    [
      "In 3/4 time, how many beats are in a measure and which note gets one beat?",
      ["Four, the quarter note", "Three, the quarter note", "Three, the eighth note", "Four, the half note"],
      "B",
    ],
    [
      "Which note should a melody in B-flat major usually begin and end on?",
      ["F", "D", "B-flat", "A"],
      "C",
    ],
    [
      "What does ritardando mean?",
      ["Gradually get louder", "Gradually slow down", "Play short and detached", "Play very fast"],
      "B",
    ],
    [
      "If you improvise using only notes from the B-flat major scale over a B-flat chord, what is most likely?",
      [
        "Every note will clash",
        "Your notes will fit with the chord",
        "You must play only whole notes",
        "You must play in 6/8",
      ],
      "B",
    ],
    [
      "How many beats are in a four-bar melody in 4/4?",
      ["4", "8", "12", "16"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Write a four-bar rhythm for 4/4 time using at least one half note, one quarter note and one pair of eighth notes in each measure. Show how many beats each measure has.",
      scheme: [
        "Writes four measures of rhythm",
        "Each measure totals four beats",
        "Uses at least a half note, quarter notes and eighth notes as asked",
        "Shows the beat count for each measure",
      ],
      model:
        "Measure 1: half note (2) + quarter note (1) + two eighth notes (1) = 4. Measure 2: quarter (1) + two eighths (1) + half (2) = 4. Measure 3: two eighths (1) + quarter (1) + half (2) = 4. Measure 4: half (2) + two eighths (1) + quarter (1) = 4.",
      answers: [
        [
          "full",
          "[[0|Measure 1: half, quarter, 2 eighths. Measure 2: quarter, 2 eighths, half. Measure 3: 2 eighths, quarter, half. Measure 4: half, 2 eighths, quarter.]] [[1|Each one adds up to 4 beats.]] [[2|Every measure has a half note, a quarter and a pair of eighths.]] [[3|The counts are 2 + 1 + 1 = 4 each time.]]",
          "Full marks. Every measure uses the notes you were asked for, and each adds to four.",
        ],
        [
          "full",
          "[[0|M1: half + quarter + eighth eighth. M2: quarter + eighth eighth + half. M3: eighth eighth + half + quarter. M4: half + quarter + eighth eighth.]] [[3|Beats: 2+1+1 each.]] [[1|They all equal four.]] [[2|Each has the three kinds of notes.]]",
          "All four marks. Showing 2 + 1 + 1 for each measure proves the beats are right.",
        ],
        [
          "partial",
          "[[0|M1: half, quarter, two eighths. M2: half, quarter, two eighths. M3: half, quarter, two eighths. M4: half, quarter, two eighths.]] [[1|Each has 4 beats.]]",
          "All four measures are correct, but they are all the same. Use different orders so the rhythm is more interesting, and show the counts.",
        ],
        [
          "partial",
          "M1: half, quarter, quarter. [[1|4 beats.]] M2: half, quarter, 2 eighths, quarter. 5 beats.",
          "The first measure adds up. The second has five beats, which is too many. A half plus two quarters or a half plus a quarter plus two eighths each gives four.",
        ],
        [
          "weak",
          "I wrote four notes in each measure.",
          "The number of notes does not decide the beats. A half note counts two, so add up the value of each note until you reach four.",
        ],
        [
          "weak",
          "Half, quarter, eighth, eighth, and that is 5 beats.",
          "Check the values: half is 2, quarter is 1, and two eighths together are 1. That adds up to 4, not 5.",
        ],
      ],
    },
    {
      prompt:
        "Take a four-note phrase and describe three ways to arrange it so that it sounds different, using rhythm, dynamics or articulation.",
      scheme: [
        "Describes a change to the rhythm",
        "Describes a change to the dynamics",
        "Describes a change to the articulation, such as legato or staccato",
        "Says what effect each change has on the sound",
      ],
      model:
        "I could change the rhythm by making the second note a dotted rhythm, which gives it a bouncy feel. I could add a crescendo so the phrase builds. I could change it from legato to staccato, which makes it sound light and playful.",
      answers: [
        [
          "full",
          "[[0|Change the rhythm by using eighth notes instead of quarters so it is quicker.]] [[1|Add a crescendo so it builds up.]] [[2|Play it staccato instead of legato.]] [[3|The faster rhythm sounds busy, the crescendo sounds exciting, and the staccato sounds light and bouncy.]]",
          "Full marks. Each change has an effect that you could actually hear.",
        ],
        [
          "full",
          "[[0|A dotted rhythm for the second note.]] [[1|Start it softly, piano, and get louder.]] [[2|Make it smooth and connected, legato.]] [[3|That gives a swingy feel, a growing feel and a calm, singing feel.]]",
          "All four marks. Three clear changes with the sound each makes.",
        ],
        [
          "partial",
          "[[0|Make the notes faster.]] [[1|Make it louder.]] [[2|Make it short.]]",
          "Three good changes. Use the musical words and say what each does to the sound: a crescendo builds excitement and staccato sounds light.",
        ],
        [
          "partial",
          "[[1|Play it forte then piano.]] [[2|Play it staccato.]] The notes would be the same.",
          "Two changes are clear. Add one about rhythm, such as changing a quarter note to two eighths, and describe the effect.",
        ],
        [
          "weak",
          "I would change the notes to different ones.",
          "Arranging keeps the same notes and changes how they are played. Change the rhythm, dynamics or articulation instead of the pitches.",
        ],
        [
          "weak",
          "Play it on a different day.",
          "Arranging is about how the music is played, not when. Change the rhythm, the dynamics or the articulation.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Musical form and evaluating a recording of our band",
  note: `
## Objectives

Students will be able to:

1. identify and describe the form of a piece of band music;
2. evaluate a recording of the band's performance using a rubric.

## Materials

A recording of last week's run-through, a listening map, the rubric (tone, intonation, rhythm, dynamics, balance), the worksheet.

## Starter (6 minutes)

Play eight bars of a march and ask the class to raise a hand when they hear the music change. Tell students that the changes are the structure, or form, of the piece.

## Main activity

1. Letters show form: A is the first section, B a contrasting one. AB, ABA and rondo (ABACA) are common. A march often has several strains and a trio.
2. Listening map: follow a printed map of a march as you listen. Mark where each section begins, and note the key and dynamics.
3. Rubric listening: play a recording of our band for two minutes. Score tone, intonation, rhythm, dynamics and balance from 1 to 4. Write one strength and one goal for each category.
4. Share results. Remind students that a rubric gives feedback to help us improve, not to criticize any person.

## Checking for understanding

Ask: "What is the form if the piece begins with section A, then a new section B, then A again?" (ABA.)

## Exit ticket

Write one strength and one goal for the band based on the recording.
`,
  reading: [
    "How music is built, and how to listen with a purpose",
    `
Most pieces of music are built with a plan. We call this plan the **form**. Form uses letters: **A** is the first main section, and **B** is a section that contrasts with it, perhaps in a different key, a different tempo or a different mood. If a piece goes A, B, A, we call it **ABA** or **ternary** form, which gives a feeling of leaving home and returning. A piece that goes A, B is **binary** form. A **rondo** keeps coming back to the A section, as in A-B-A-C-A.

Marches are a special form. A traditional American march has several **strains**, each usually 16 or 32 bars long, followed by a **trio**, which is a contrasting section that is often softer and in a new key. Then the band plays a final bright section to finish. When you listen to a march, follow the sections and notice when the music changes key, loudness or instruments.

A **listening map** is a visual guide to a piece. It is a chart, with boxes or lines, showing each section in order. As you listen, you follow along and mark the changes. Listening with a purpose helps you remember what happens and understand why the composer made certain choices.

Bands also listen to themselves. Recording a rehearsal and listening back is one of the best ways to improve, because it is hard to hear everything while you play. Evaluating with a **rubric** keeps the feedback fair and specific. A rubric is a chart of categories, such as **tone**, **intonation** (how well the notes are in tune), **rhythm**, **dynamics** and **balance**, each with levels from 1 to 4. For each category, you decide the level that matches what you hear, then write evidence. For example: "Intonation: 2. The flutes were sharp in measures 9 to 12." Good feedback names something that can be fixed. After that, set a goal: "Next week the flutes will tune to the clarinets before measure 9."
`,
  ],
  cards: [
    ["Form", "The plan or structure of a piece of music."],
    ["Ternary form (ABA)", "A first section, a contrasting section, then a return to the first."],
    ["Binary form (AB)", "Two different sections."],
    ["Rondo", "A form in which the main theme keeps returning, as in A-B-A-C-A."],
    ["Strain", "A section of a march, usually 16 or 32 bars long."],
    ["Trio", "A contrasting section of a march, often softer and in a new key."],
    ["Listening map", "A visual guide to the sections of a piece."],
    ["Intonation", "How accurately the notes are in tune."],
  ],
  closed: [
    [
      "A piece goes section A, section B, then section A again. Which form is this?",
      ["Binary", "Rondo", "ABA", "Theme and variations"],
      "C",
    ],
    [
      "What is a trio in a march?",
      [
        "Three players on one part",
        "A contrasting section, often softer and in a new key",
        "A fast ending",
        "A section for percussion only",
      ],
      "B",
    ],
    [
      "Which of these is a category on a typical band rubric?",
      ["Uniform color", "Intonation", "Seating chart", "Number of players"],
      "B",
    ],
    [
      "A listening map is used to:",
      [
        "Find the way to the band room",
        "Follow the sections of a piece as you listen",
        "Tune the instruments",
        "Write new music",
      ],
      "B",
    ],
    [
      "Which feedback is the most useful?",
      [
        "That was bad",
        "Intonation: 2. The flutes were sharp in measures 9 to 12",
        "Everyone should try harder",
        "I liked the drums",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain what form is in music, and describe the form of a piece that begins with a theme (A), moves to a contrasting theme (B), and then comes back to the first theme (A). Say what feeling the form gives the listener.",
      scheme: [
        "Defines form as the plan or structure of a piece",
        "Names the form as ABA or ternary",
        "Describes the contrast between the sections",
        "Says the return to A gives a feeling of coming back home or closure",
      ],
      model:
        "Form is the plan or structure of a piece of music. A piece that goes A, B, A is in ABA, or ternary, form. The B section contrasts with A, for example in a different key or mood. When A returns, the listener has a feeling of coming back home.",
      answers: [
        [
          "full",
          "[[0|Form is how a piece is built, its structure.]] [[1|A, B, A is called ABA or ternary form.]] [[2|The B section is different, maybe a new key or softer.]] [[3|When A comes back it feels like going home again.]]",
          "Full marks. The idea of going home explains why the form feels satisfying.",
        ],
        [
          "full",
          "[[0|Form is the structure of the music.]] [[1|This one is ABA.]] [[2|B contrasts with A with a different mood or tempo.]] [[3|The return of A feels like closure, like the music finishes the story.]]",
          "All four marks. Closure is a good word for it.",
        ],
        [
          "partial",
          "[[0|Form is the structure.]] [[1|It is ABA.]]",
          "You have the definition and the name. Explain how the B section contrasts and what the return to A feels like to the listener.",
        ],
        [
          "partial",
          "This is binary form. [[2|B is different from A.]] [[3|It feels like going home.]]",
          "You described the sections well, but a return to A makes it three parts, ABA, not binary (AB).",
        ],
        [
          "weak",
          "Form means how you sit in band.",
          "In music, form is the structure of a piece, using letters for the sections. The way you sit is posture.",
        ],
        [
          "weak",
          "It is a march and the trio is the B part.",
          "A trio is a section of a march, but the question asks for the form. A theme, a contrast, then the first theme again is ABA.",
        ],
      ],
    },
    {
      prompt:
        "Choose one category from the band rubric (tone, intonation, rhythm, dynamics or balance). Score the band's recording from 1 to 4, give evidence for your score, and write one goal.",
      scheme: [
        "Names one rubric category",
        "Gives a score from 1 to 4",
        "Gives specific evidence from the recording, such as a measure or section",
        "Writes a goal that can be checked",
      ],
      model:
        "Category: balance. Score: 2. In measures 17 to 24 the trombones covered the melody in the clarinets. My goal is that the trombones play mezzo piano in that section so the melody can be heard in the next rehearsal.",
      answers: [
        [
          "full",
          "[[0|Category: dynamics.]] [[1|I give it a 3.]] [[2|The crescendo in measures 25 to 28 was good, but the soft part in measure 9 was too loud.]] [[3|Goal: play measure 9 at piano and check it with the recording on Friday.]]",
          "Full marks. The evidence is specific and the goal can be checked.",
        ],
        [
          "full",
          "[[0|Intonation.]] [[1|2 out of 4.]] [[2|The flutes and trumpets were not together on the long note in measure 12, the flutes were sharp.]] [[3|Goal: tune to the clarinets before measure 12 and listen to the recording again next week.]]",
          "All four marks. Naming the instruments and the measure makes your feedback useful.",
        ],
        [
          "partial",
          "[[0|Rhythm.]] [[1|3.]] It was okay but some people were off.",
          "The category and score are good. Say who was off and where, and add a goal that you can check.",
        ],
        [
          "partial",
          "[[0|Tone.]] The tone was weak so [[3|everyone should play with more air in the next rehearsal and record again.]]",
          "Your goal is good. Add a score and name where you heard weak tone, such as the clarinets in the opening.",
        ],
        [
          "weak",
          "It was good. I gave it a 4 because I like our band.",
          "A score needs evidence from the recording. Pick a category and describe what you heard, such as a measure, a section or an instrument.",
        ],
        [
          "weak",
          "The recording was too quiet so I could not do the rubric.",
          "A quiet recording can still be evaluated, and if it is hard to hear, that is a sign that the recording setup needs fixing. Choose one category and describe what you can hear.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Comparing with a professional band, and the story of a march",
  note: `
## Objectives

Students will be able to:

1. listen to a professional performance and compare it with ours;
2. explain the history and style of a piece we are rehearsing.

## Materials

A professional recording of a march (school-approved), a printed biography card of John Philip Sousa, the comparison chart, the worksheet.

## Starter (6 minutes)

Play thirty seconds of a professional military or concert band performing a march. Ask: "What do you notice about the sound that is different from ours? What is the same?"

## Main activity

1. Listening for details: play the recording twice. First time, listen for the overall sound. Second time, use a comparison chart: tempo, dynamics, articulation, balance, tone. Mark where our band is similar and where it is different.
2. Do not copy the recording blindly. Ask what the professionals do that we can try: a lighter staccato, the bass line being clear, a more careful crescendo.
3. History: introduce John Philip Sousa (1854 to 1932), the American composer and conductor known as the "March King," who led the United States Marine Band. His march "The Stars and Stripes Forever" (1896) is the national march of the United States. Discuss why marches were written for parades, the military and community events.
4. Style: American marches are usually in 2/4 or 6/8, at a steady tempo of about 120 beats per minute, with a strong bass line and a bright trio.

## Checking for understanding

Ask: "Why are marches often in 2/4 or 6/8?" (They match the steps of marching, left and right.)

## Exit ticket

Write two things you will try after listening to the professional performance.
`,
  reading: [
    "Listening to the pros, and the March King",
    `
One of the best ways to improve is to listen to musicians who are better than you, and then compare. Professional bands play with great control, but the things they do are things any band can learn. When you listen to a professional performance, listen several times. The first time, listen to the whole, the overall sound and the mood. The next time, focus on details: **tempo**, **dynamics**, **articulation** (how notes are started and ended), **balance** and **tone**. Writing down what you hear on a comparison chart helps you remember. Then ask how our band is similar, how it is different, and what we can try. For example, the professionals may play the staccato sections lighter and shorter, or the low brass may be clearer in the bass line, or their crescendos may be longer and more controlled.

It is important not to copy a recording note for note, but to learn from it. Ask what is musical about it, then apply the idea in your own playing.

The march is a piece of American musical history. A march is music with a strong steady beat that suits people walking in step, so it is usually in 2/4 or 6/8, which have two main beats to a measure, matching left and right feet. The tempo is typically about 120 beats per minute, similar to a brisk walk.

The most famous march composer in the United States was **John Philip Sousa** (1854 to 1932). He was a conductor and composer who led the United States Marine Band and later formed his own band, which toured around the world. Because of his many marches he was called the "March King." His march **"The Stars and Stripes Forever"**, written in 1896, was named the national march of the United States by Congress in 1987. Marches like his were played in parades, at military events, at political rallies and in town parks across America. Many of them have a bright trio section and a loud finish.

Even if you play modern music, learning marches teaches you precise rhythm, steady tempo, clear articulation and teamwork, skills that every band uses.
`,
  ],
  cards: [
    ["Articulation", "How notes are started and ended, such as legato or staccato."],
    ["March", "Music with a steady beat meant for walking in step."],
    ["2/4 time", "Two beats per measure, with the quarter note getting one beat."],
    ["6/8 time", "Six eighth notes per measure, often felt as two groups of three."],
    ["John Philip Sousa", "American composer and conductor known as the March King."],
    ["The Stars and Stripes Forever", "Sousa's 1896 march, the national march of the United States."],
    ["Comparison chart", "A table used to compare two performances on tempo, dynamics, articulation and more."],
    ["Marine Band", "The United States Marine Band, which Sousa led."],
  ],
  closed: [
    [
      "Why are marches usually written in 2/4 or 6/8?",
      [
        "They are easier to read",
        "They match the left and right steps of marching",
        "They are always slow",
        "They are required by law",
      ],
      "B",
    ],
    [
      "Who is called the March King?",
      ["Aaron Copland", "John Philip Sousa", "Duke Ellington", "Leonard Bernstein"],
      "B",
    ],
    [
      "Which is the best way to learn from a professional recording?",
      [
        "Copy every note without thinking",
        "Listen to details like tempo, dynamics and articulation and try one idea",
        "Play louder than the recording",
        "Listen only once",
      ],
      "B",
    ],
    [
      "A typical marching tempo is about:",
      ["60 beats per minute", "120 beats per minute", "200 beats per minute", "30 beats per minute"],
      "B",
    ],
    [
      "A trio of a march is usually:",
      [
        "A contrasting section, often softer and in a new key",
        "The first section only",
        "Three drums only",
        "A very long solo",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "You listen to a professional band play a march and then to a recording of our band. Describe how you would use a comparison chart, and name two features you would compare and why.",
      scheme: [
        "Says to listen several times, first to the whole and then to details",
        "Names a feature to compare, such as tempo, dynamics, articulation, balance or tone",
        "Names a second feature to compare",
        "Says what the band will try or change as a result",
      ],
      model:
        "I would listen once for the overall sound and again for details, filling in the chart for both recordings. I would compare articulation, because the professionals play the staccato notes shorter, and balance, because their bass line is clearer. Then our band would try shorter staccato and a clearer low brass line.",
      answers: [
        [
          "full",
          "[[0|First I listen to the whole thing, then I listen again for details and fill in the chart for each band.]] [[1|I would compare articulation, because the pros play the short notes lighter.]] [[2|I would compare balance because their bass line is easy to hear.]] [[3|Then we would try lighter staccato and make the low brass clearer.]]",
          "Full marks. The comparison ends with something the band can actually try.",
        ],
        [
          "full",
          "[[0|Listen twice, once for the sound and once for specifics, writing in each box of the chart.]] [[1|Tempo, because the professionals kept a very steady beat.]] [[2|Dynamics, because their crescendo was longer and more controlled.]] [[3|We could practice the crescendo and use the metronome.]]",
          "All four marks. Steady tempo and crescendo are good choices for a young band.",
        ],
        [
          "partial",
          "[[0|Listen to both recordings and write in the chart.]] [[1|Compare tempo.]]",
          "The method and one feature are right. Add a second feature and say what the band will try after the comparison.",
        ],
        [
          "partial",
          "[[1|Compare tone]] and [[2|compare dynamics]]. The professionals are better.",
          "Two good features. Explain what you would hear for each, and say what our band will try, instead of just saying they are better.",
        ],
        [
          "weak",
          "I would copy the professional band exactly, note for note.",
          "Copying exactly does not teach you much. Compare features like articulation and balance, then try one idea in your own playing.",
        ],
        [
          "weak",
          "The chart is not needed, I can just tell which one is better.",
          "A chart makes the comparison specific, so you know exactly which features to improve rather than only which one sounds better.",
        ],
      ],
    },
    {
      prompt:
        "Explain who John Philip Sousa was, name one of his most famous marches, and describe two features of an American march.",
      scheme: [
        "Says Sousa was an American composer and conductor, the March King",
        "Names The Stars and Stripes Forever, or another well-known march",
        "Gives one feature of a march, such as 2/4 or 6/8 time or a steady tempo",
        "Gives a second feature, such as a strong bass line, strains or a bright trio",
      ],
      model:
        "John Philip Sousa (1854 to 1932) was an American composer and conductor who led the United States Marine Band and was called the March King. One of his famous marches is The Stars and Stripes Forever. An American march usually has a steady tempo in 2/4 or 6/8 time, and it has a strong bass line and a trio section.",
      answers: [
        [
          "full",
          "[[0|Sousa was an American composer and conductor known as the March King, and he led the Marine Band.]] [[1|His most famous march is The Stars and Stripes Forever.]] [[2|Marches have a steady tempo in 2/4 or 6/8.]] [[3|They also have a trio, which is a contrasting section.]]",
          "Full marks. Each part of the answer is accurate and clear.",
        ],
        [
          "full",
          "[[0|John Philip Sousa was the March King, an American composer and bandleader.]] [[1|He wrote The Stars and Stripes Forever in 1896.]] [[2|A march keeps a steady beat for walking, like 2/4 time.]] [[3|It usually has a strong bass line and a bright finish.]]",
          "All four marks. You included the year, which is a nice detail.",
        ],
        [
          "partial",
          "[[0|Sousa was a composer, the March King.]] [[1|He wrote The Stars and Stripes Forever.]]",
          "Good on who he was and a march. Add two features of a march, such as time signature, steady tempo, bass line or trio.",
        ],
        [
          "partial",
          "[[2|A march is in 2/4 or 6/8 with a steady beat.]] [[3|It has a trio.]] Sousa wrote the Star-Spangled Banner.",
          "The features are good. Sousa wrote The Stars and Stripes Forever. The Star-Spangled Banner was written by Francis Scott Key with a different melody.",
        ],
        [
          "weak",
          "Sousa invented the sousaphone and the march was a dance.",
          "Sousa is associated with the sousaphone, which was named for him, but he was best known as a composer and conductor. A march is music for walking, not a dance.",
        ],
        [
          "weak",
          "I do not remember anything about him.",
          "Use your notes: John Philip Sousa was the American March King who led the Marine Band and wrote The Stars and Stripes Forever.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Rhythm as fractions, and music in our community",
  note: `
## Objectives

Students will be able to:

1. relate musical patterns to mathematics, such as fractions and ratios in rhythm;
2. describe the role of music in your community and how you can take part in it.

## Materials

Fraction strips or a rhythm tree chart, clapping sticks, a list of local music groups (invented or approved by the director), the worksheet.

## Starter (6 minutes)

Clap one whole note, then two half notes, then four quarter notes, all in the same amount of time. Ask: "What do you notice about how they fit together?"

## Main activity

1. The rhythm tree: a whole note is 4 beats, a half note 2, a quarter note 1, an eighth note one half of a beat, and a sixteenth note one quarter of a beat. A measure of 4/4 must add up to four beats, like adding fractions.
2. Dotted notes: a dot adds half of the note's value. A dotted half note is 2 + 1 = 3 beats. A dotted quarter is 1 + 1/2 = 1 1/2 beats.
3. Ratios: a triplet fits three notes in the time of two. Discuss the ratio 3:2.
4. Community: brainstorm all of the ways music appears in our community, from the high school marching band and the town summer concert series to community bands, church bands and the symphony. How can a student take part?

## Checking for understanding

Ask: "How many beats are in a dotted half note?" (Three.)

## Exit ticket

Write the total beats of a half note, a dotted quarter and an eighth note added together.
`,
  reading: [
    "Counting in fractions, and music that belongs to everyone",
    `
Music is full of mathematics. When you read rhythm, you are really working with **fractions**. A **whole note** lasts four beats in 4/4 time. A **half note** lasts two beats, half as long as a whole note. A **quarter note** lasts one beat, a quarter of the whole note. An **eighth note** lasts one half of a beat, and a **sixteenth note** lasts one quarter of a beat. You can build a "rhythm tree" to see this: each level divides the note above it in half.

Because the values are fractions, each measure must add up to the right total. A measure of 4/4 must have four beats. For example, half note + quarter note + two eighth notes = 2 + 1 + 1/2 + 1/2 = 4. If your measure adds up to 3 or 5, there is a mistake.

A **dot** after a note adds half of the note's value. A dotted half note is 2 plus half of 2, which is 2 + 1 = 3 beats. A dotted quarter note is 1 + 1/2 = 1 1/2 beats. A **tie** joins two notes of the same pitch and adds their values together.

Ratios appear in music too. A **triplet** puts three equal notes in the time of two, a ratio of 3 to 2. Tempo is a rate: 120 beats per minute means two beats every second, so each beat lasts 0.5 seconds. If a piece is 96 measures long in 4/4 at 120 beats per minute, it lasts 96 × 4 = 384 beats, which is 384 ÷ 2 = 192 seconds, or 3 minutes 12 seconds.

Finally, music is part of every community. In Ohio, you can hear school marching bands on Friday nights, community bands in summer concert series in town parks, church and civic groups, and orchestras in larger cities. Students can take part by joining the school's ensembles, auditioning for honor bands, playing in a community group, volunteering at a concert, or simply attending a performance and supporting local musicians. Making music with other people is a lifelong skill, and the habits you build in band, such as listening, teamwork and practice, will help you in many other parts of life.
`,
  ],
  cards: [
    ["Whole note", "Lasts four beats in 4/4 time."],
    ["Half note", "Lasts two beats."],
    ["Quarter note", "Lasts one beat."],
    ["Eighth note", "Lasts one half of a beat."],
    ["Dotted note", "A note with a dot adds half of its own value."],
    ["Tie", "A curved line that joins two notes of the same pitch."],
    ["Triplet", "Three notes played in the time of two."],
    ["Tempo", "The speed of the beat, measured in beats per minute."],
  ],
  closed: [
    [
      "How many beats are in a dotted half note in 4/4?",
      ["Two", "Three", "Four", "One and a half"],
      "B",
    ],
    [
      "A measure of 4/4 has a quarter note, a half note and two eighth notes. What is its total?",
      ["3 beats", "4 beats", "5 beats", "6 beats"],
      "B",
    ],
    [
      "A piece is at 120 beats per minute. How long does one beat last?",
      ["0.25 seconds", "0.5 seconds", "1 second", "2 seconds"],
      "B",
    ],
    [
      "How many eighth notes equal one half note?",
      ["2", "4", "6", "8"],
      "B",
    ],
    [
      "Which is a good way for a student to take part in the music of their community?",
      [
        "Wait until you are an adult",
        "Join a community group or attend local concerts",
        "Avoid performing",
        "Only listen to recordings",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Find the total number of beats in this measure and say whether it fits in 4/4: a dotted half note, a quarter note and an eighth note. Show the fraction work.",
      scheme: [
        "Finds the dotted half note value of 3 beats",
        "Adds the quarter note, 1 beat, to get 4",
        "Adds the eighth note, 1/2 beat, to get 4 1/2",
        "Concludes the measure has 4 1/2 beats, so it does not fit in 4/4",
      ],
      model:
        "A dotted half note is 2 + 1 = 3 beats. Adding a quarter note, 1 beat, gives 4 beats. Adding an eighth note, 1/2 beat, gives 4 1/2 beats. A measure of 4/4 must have exactly 4 beats, so this measure does not fit; it has half a beat too many.",
      answers: [
        [
          "full",
          "[[0|Dotted half is 2 + 1 = 3 beats.]] [[1|3 + 1 for the quarter is 4.]] [[2|4 + 1/2 for the eighth is 4 1/2.]] [[3|That is more than 4, so it does not fit in 4/4, it is half a beat over.]]",
          "Full marks. Adding step by step shows exactly where it goes over.",
        ],
        [
          "full",
          "[[0|3 beats for the dotted half]] + 1 + 1/2 = [[2|4.5 beats]]. [[1|After the quarter note I already have 4.]] [[3|So it is too long for 4/4 because it should be exactly 4.]]",
          "All four marks. Noticing that the quarter note already makes 4 beats is a sharp observation.",
        ],
        [
          "partial",
          "[[0|A dotted half is 3 beats.]] [[1|Plus a quarter is 4.]] So it fits.",
          "Good so far. You forgot the eighth note, 1/2 beat, which makes the total 4 1/2, so it does not fit.",
        ],
        [
          "partial",
          "[[0|3]] + 1 + 1 = 5 beats so it does not fit.",
          "You counted the eighth note as a whole beat. An eighth note is half a beat, so the total is 4 1/2. Your conclusion is still right.",
        ],
        [
          "weak",
          "A dotted half is 4 beats, so it already fits with the others.",
          "A half note is 2 beats and the dot adds half of that, 1 beat, so a dotted half note is 3 beats, not 4.",
        ],
        [
          "weak",
          "It has three notes so it is 3 beats.",
          "The number of notes does not decide the beats. Add the value of each: 3 + 1 + 1/2.",
        ],
      ],
    },
    {
      prompt:
        "A piece is 64 measures long in 4/4 at 128 beats per minute. How long does it last in minutes and seconds? Show your work.",
      scheme: [
        "Calculates the number of beats, 64 times 4 equals 256",
        "Divides by the tempo, 256 divided by 128 equals 2 minutes",
        "States the answer as 2 minutes",
        "Includes the unit and reads the answer back, 2 minutes 0 seconds",
      ],
      model:
        "64 measures × 4 beats = 256 beats. At 128 beats per minute, 256 ÷ 128 = 2 minutes. The piece lasts 2 minutes, or 2 minutes 0 seconds.",
      answers: [
        [
          "full",
          "[[0|64 × 4 = 256 beats.]] [[1|256 ÷ 128 = 2.]] [[2|It lasts 2 minutes]], [[3|so 2 minutes and 0 seconds.]]",
          "Full marks. Clear steps and the units are right.",
        ],
        [
          "full",
          "[[0|Total beats is 4 × 64 which is 256.]] [[1|Beats divided by beats per minute is 256/128 = 2.]] [[2|So the song is 2 minutes long]], [[3|2:00.]]",
          "All four marks. Beats divided by beats per minute is the key relationship.",
        ],
        [
          "partial",
          "[[0|64 × 4 = 256 beats.]] 256 × 128 is a big number.",
          "The first step is right. Divide the beats by the tempo, not multiply, because you want minutes: 256 ÷ 128 = 2.",
        ],
        [
          "partial",
          "[[1|128 divided by 64 is 2]] so it is 2 minutes.",
          "The answer is right but the calculation is not what the situation needs. First find the total beats, 256, then divide by the tempo, 128.",
          true,
        ],
        [
          "weak",
          "64 + 128 = 192 so it is 192 seconds.",
          "Adding the measures and the tempo has no meaning. Multiply the measures by 4 for the beats, then divide by the beats per minute.",
        ],
        [
          "weak",
          "It is 64 measures so about 64 minutes.",
          "A measure of 4/4 lasts only a few seconds at this tempo. Count the total beats and divide by the beats per minute.",
        ],
      ],
    },
  ],
};

writeCourse("band-grade-9.json", "Band", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
