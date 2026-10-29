import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Choir, Grade 9, Quarter 1. National Core Arts Standards, Music, in the
 * school's own words. A mixed beginning choir: posture and breath, warm-ups,
 * unison and two-part singing, matching pitch, following a conductor, solo and
 * small-group singing, singing in other languages, notation and solfege,
 * concert preparation, listening to ourselves, and making up music. No
 * practicals.
 */

const w1: WeekInput = {
  topic: "Posture, breath and a healthy sound; warming up the voice",
  note: `
## Objectives

Students will be able to:

1. sing with correct posture, breath support and a healthy tone;
2. warm up the voice with exercises for range, resonance and diction;
3. sing your part in unison and in two-part harmony with accurate pitch.

## Materials

Piano or keyboard, a mirror, a warm-up chart, copies of a simple two-part round, the worksheet.

## Starter (6 minutes)

Stand with feet shoulder-width apart, shoulders back and relaxed, knees soft. Breathe in for four counts, hold for four, out on a hiss for eight. Ask: "Where did you feel your body move when you breathed in?"

## Main activity

1. Posture and breath: stand tall with the head level, the chest comfortable and the shoulders loose. Breathe low, so the belly and the lower ribs expand, and release the air in a steady stream. Put a hand on your belly and feel it move.
2. Warm-up sequence: lip trills and sirens for range, humming for resonance, "mah-may-mee-moh-moo" for open vowels, and tongue twisters for diction. Move up and down in half steps and stop if you strain.
3. Unison and two-part: sing a simple melody all together on a vowel, then in a two-part round. Listen for the other part and keep your own.
4. Voice care: drink water, avoid shouting, rest the voice when tired, and never force the sound.

## Checking for understanding

Ask: "What is one sign that you are singing with a healthy tone?" (The sound is free and not strained or hurting.)

## Exit ticket

List the four parts of a warm-up sequence.
`,
  reading: [
    "Standing tall, breathing low, singing freely",
    `
Your voice is an instrument that you carry with you, and like any instrument it works best when you take care of it. The way you stand and breathe makes the biggest difference to the sound.

**Posture** is the way you stand. Place your feet about shoulder-width apart, with your knees soft instead of locked. Keep your spine long, your shoulders back and relaxed, and your head level, so that your chin is neither up nor down. Good posture opens your chest and lets your lungs fill. When you slouch, your breath is cramped and your tone gets weaker and flatter.

**Breath support** is how you use air. Breathe in low, so that your belly and the lower ribs expand, not your shoulders. Place a hand on your stomach to feel this. Then let the air out in a steady stream while the muscles around the stomach support it. A steady stream makes a steady tone. If your shoulders rise as you breathe in, or your sound shakes, you are probably using the upper chest only.

A **healthy tone** is relaxed and free. It should never hurt, and your throat should not feel tight. Sing at a comfortable volume, because a forced, loud sound can damage the voice.

A **warm-up** prepares the voice the way stretching prepares an athlete. A good warm-up has four parts. First, **breath** exercises, such as a slow hiss. Second, exercises for **range**, such as lip trills and sirens that slide from low to high. Third, exercises for **resonance**, such as humming, which helps you feel the sound in the front of the face. Fourth, exercises for **diction**, how clearly you say the words, such as tongue twisters and the open vowel pattern "mah-may-mee-moh-moo." Move in small steps, up and down, and stop before you strain.

When we sing together, we may sing in **unison**, where everyone sings the same notes, or in **harmony**, where different groups sing different notes at the same time. A **round** is a simple way to start harmony: everyone sings the same melody but starts at different times. Listen to the other part as you sing your own, and you will hear the harmony.

Take care of your voice: drink water, avoid yelling, rest when tired, and ask your director if you have pain or are sick.
`,
  ],
  cards: [
    ["Posture", "How you stand: tall, relaxed and balanced."],
    ["Breath support", "Using steady air from low in the body to make a steady tone."],
    ["Warm-up", "Exercises that prepare the voice before singing."],
    ["Range", "The span of notes a singer can sing."],
    ["Resonance", "The richness of sound made by vibrations in the head and chest."],
    ["Diction", "How clearly words are pronounced when singing."],
    ["Unison", "Everyone singing the same notes."],
    ["Round", "A melody sung by groups starting at different times."],
  ],
  closed: [
    [
      "Where should your breath go when you breathe for singing?",
      [
        "Up into the shoulders",
        "Low, expanding the belly and lower ribs",
        "Only into the nose",
        "Nowhere in particular",
      ],
      "B",
    ],
    [
      "Which warm-up exercise helps to develop resonance?",
      ["Shouting", "Humming", "Whispering", "Coughing"],
      "B",
    ],
    [
      "When you sing in unison, everyone sings:",
      [
        "Different notes",
        "The same notes",
        "Only the rhythm",
        "In silence",
      ],
      "B",
    ],
    [
      "Which is a sign of an unhealthy sound?",
      [
        "A relaxed, free sound",
        "A tight throat or pain",
        "Clear vowels",
        "Steady breath",
      ],
      "B",
    ],
    [
      "A round is a melody sung:",
      [
        "By a soloist only",
        "By groups starting at different times",
        "Without words",
        "In a circle only",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe good singing posture and breathing, and explain how each helps the sound.",
      scheme: [
        "Describes posture: feet apart, spine long, shoulders relaxed, head level",
        "Explains that good posture opens the chest and lets the lungs fill",
        "Describes breathing low so the belly and lower ribs expand",
        "Explains that steady air makes a steady tone",
      ],
      model:
        "Stand with the feet shoulder-width apart, spine long, shoulders relaxed and head level. This opens the chest so the lungs can fill. Breathe in low so the belly and lower ribs expand, and let the air out in a steady stream, which makes a steady tone.",
      answers: [
        [
          "full",
          "[[0|I stand with my feet apart, my back long, shoulders loose and head level.]] [[1|That opens my chest so my lungs can fill up.]] [[2|I breathe in low so my belly and ribs go out.]] [[3|The air comes out steady, so my tone is steady.]]",
          "Full marks. You linked each habit to its effect on the sound.",
        ],
        [
          "full",
          "[[0|Feet shoulder-width, knees soft, shoulders back but relaxed.]] [[1|It lets my chest open and gives my breath room.]] [[2|I breathe into my belly and lower ribs, not my shoulders.]] [[3|A slow steady breath out gives a smooth sound.]]",
          "All four marks. Knees soft is a detail that many beginners forget.",
        ],
        [
          "partial",
          "[[0|Stand up straight.]] [[2|Breathe low.]]",
          "Both are right. Add the details of posture and explain how each habit helps the sound.",
        ],
        [
          "partial",
          "[[2|I breathe low.]] [[3|The air must be steady.]] I keep my shoulders up.",
          "Breathing low is good. Raised shoulders cramp the breath, so keep them relaxed and back.",
        ],
        [
          "weak",
          "I lean back and push out my chest to sing loud.",
          "Leaning and pushing creates tension. Stand tall with a relaxed chest and let the breath do the work.",
        ],
        [
          "weak",
          "Posture is only for the picture at concerts.",
          "Posture affects the sound as well as the look. It opens the chest so you can breathe and sing freely.",
        ],
      ],
    },
    {
      prompt:
        "List the four parts of a good warm-up sequence, give one exercise for each, and say what each prepares your voice to do.",
      scheme: [
        "Names breath and gives an exercise such as a slow hiss",
        "Names range and gives an exercise such as sirens or lip trills",
        "Names resonance and gives an exercise such as humming",
        "Names diction and gives an exercise such as tongue twisters or open vowels, and says what each prepares",
      ],
      model:
        "Breath: a slow hiss prepares steady air. Range: lip trills or sirens prepare the voice to move low and high. Resonance: humming prepares a rich, forward sound. Diction: tongue twisters or the open vowel pattern prepare clear words.",
      answers: [
        [
          "full",
          "[[0|Breath: a slow hiss to get steady air.]] [[1|Range: lip trills and sirens so my voice can go low and high.]] [[2|Resonance: humming to feel the sound in the front of my face.]] [[3|Diction: tongue twisters so my words are clear.]]",
          "Full marks. Each part has an exercise and its purpose.",
        ],
        [
          "full",
          "[[0|Breathing exercises like breathing in for four and out for eight.]] [[1|Sirens for range.]] [[2|Humming for resonance.]] [[3|Mah may mee moh moo for diction and open vowels.]]",
          "All four marks. The open vowel pattern is a good example of a diction exercise.",
        ],
        [
          "partial",
          "[[0|A hiss for breath.]] [[2|Humming.]]",
          "Two good parts. Add the exercises for range and diction, and say what each prepares your voice to do.",
        ],
        [
          "partial",
          "[[1|Sirens.]] [[3|Tongue twisters.]] Singing loudly for the last part.",
          "Singing loudly is not part of a warm-up and can strain the voice. Use a breath exercise and humming for resonance.",
        ],
        [
          "weak",
          "A warm-up is when you sing your song once.",
          "A warm-up uses exercises for breath, range, resonance and diction before singing the music.",
        ],
        [
          "weak",
          "I do not need a warm-up because my voice is already ready.",
          "Every singer warms up. It prepares the voice and helps prevent strain.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Matching pitch, blending and following the conductor",
  note: `
## Objectives

Students will be able to:

1. match pitch and blend with the section;
2. follow a conductor's gestures for tempo, dynamics and cut-offs.

## Materials

Keyboard, a pitch-matching game, a conductor's pattern chart, the worksheet.

## Starter (6 minutes)

Pitch echo: the teacher sings a short pattern on "loo," students echo it. Move up and down. Ask: "What do you listen for to tell if you match the pitch?"

## Main activity

1. Matching pitch: sing a single pitch together. If you hear a wobble (beats) you are not the same. Adjust until the wobble slows or stops. Use a keyboard to check.
2. Blend: listen to the singers next to you and match their vowel shape and volume. Your voice should not stand out in the section.
3. Conducting gestures: the preparatory beat, the beat pattern in 4/4 (down, in, out, up), dynamics shown by the size of the pattern, and a cut-off for the end of a note.
4. Practice a short song with changes of volume (piano to forte) guided by the conductor.

## Checking for understanding

Ask: "What does a cut-off tell the choir?" (When to stop singing.)

## Exit ticket

Name two things the conductor's gestures can show.
`,
  reading: [
    "Singing the same note together, and watching the director",
    `
When a choir sings, forty voices should sound like one. This depends on two skills: **matching pitch** and **blending**.

To **match pitch**, you listen to the note, think about it, and then sing it. If the note you sing is a little higher or lower than the one next to you, you will hear a wobble in the sound, called **beats**. The closer the notes get, the slower the wobble, until it disappears. This is a signal that you are in tune with each other. A keyboard can help, but the best way to learn is by listening and adjusting. If you have trouble matching, try humming the pitch quietly first, then open to a vowel.

**Blend** means that your voice fits in with the voices around you. Listen to your neighbors. Match their **vowel shape**: if the word is "love," shape the vowel so it sounds like theirs. Match their **volume**, so you do not stand out. If you can hear yourself clearly above the others, you are probably too loud. A well-blended choir has a unified sound.

The **conductor** helps the choir sing together. The conductor gives a **preparatory beat** before the music starts, to show the tempo and when to breathe. The right hand shows the **beat pattern**, for 4/4 it goes down, in, out, up. A large, strong pattern calls for loud singing, and a small, light pattern calls for soft. The left hand often shows dynamics and cues sections. A **cut-off** is a gesture that tells the choir exactly when to stop a note, so that everyone ends together.

Dynamics are marked with Italian words: **piano (p)** is soft, **mezzo piano (mp)** is medium soft, **mezzo forte (mf)** is medium loud, **forte (f)** is loud. A **crescendo** gets gradually louder and a **decrescendo** gets softer.

The key habit is to keep your eyes up. If you look at the conductor and listen to the choir, you will sing in time, in tune and in balance.
`,
  ],
  cards: [
    ["Matching pitch", "Singing the same pitch as the note you hear."],
    ["Beats", "A wobbling sound when two pitches are slightly different."],
    ["Blend", "Matching voices so a section sounds like one."],
    ["Vowel shape", "The shape of the mouth for a vowel sound."],
    ["Preparatory beat", "A gesture before singing that shows tempo and breath."],
    ["Cut-off", "A gesture that shows when to stop a note."],
    ["Crescendo", "Gradually getting louder."],
    ["Decrescendo", "Gradually getting softer."],
  ],
  closed: [
    [
      "You hear a slow wobble when you and a friend sing the same note. What does this tell you?",
      [
        "The pitches are close but not exactly the same",
        "The pitches are perfectly matched",
        "You are singing too softly",
        "You are singing the wrong words",
      ],
      "A",
    ],
    [
      "A cut-off is a gesture that tells you:",
      ["When to start", "When to stop a note", "To sing louder", "To sit down"],
      "B",
    ],
    [
      "How can you tell you are not blending?",
      [
        "You can hear yourself clearly above the others",
        "You hear everyone equally",
        "You are in tune",
        "You are watching the conductor",
      ],
      "A",
    ],
    [
      "What does forte mean?",
      ["Soft", "Loud", "Fast", "Slow"],
      "B",
    ],
    [
      "In a 4/4 pattern, the conductor's hand goes:",
      ["Down, in, out, up", "Left, right", "Up, down", "In a circle"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain what blend is in a choir and describe two things you can do to blend with the singers near you.",
      scheme: [
        "Defines blend as matching voices so a section sounds like one",
        "Gives a first action, such as matching vowel shape",
        "Gives a second action, such as matching volume",
        "Says what blending sounds like or how to know you are doing it",
      ],
      model:
        "Blend is matching your voice with the voices near you so that the section sounds like one voice. I can match their vowel shape and their volume. If I can hear myself clearly over the others, I am probably too loud and not blending.",
      answers: [
        [
          "full",
          "[[0|Blend is when your voice matches the others so the section sounds like one voice.]] [[1|I can match the shape of my vowels with my neighbors.]] [[2|I can match their volume so I do not stick out.]] [[3|If I can hear just my own voice, I am too loud.]]",
          "Full marks. The test of hearing yourself is a good way to check.",
        ],
        [
          "full",
          "[[0|Blend means the singers in a section sound like one voice.]] [[1|Listen and copy the way they shape their mouths for the vowels.]] [[2|Sing at the same loudness.]] [[3|When it is blended you cannot pick out a single person.]]",
          "All four marks. Not being able to pick out one voice is what blend sounds like.",
        ],
        [
          "partial",
          "[[0|Blend is singing together.]] [[1|Match vowels.]]",
          "Say what blend means in more detail and add a second action, such as matching volume.",
        ],
        [
          "partial",
          "[[2|Sing at the same volume.]] [[3|You should hear yourself clearly.]]",
          "Matching volume is right, but hearing yourself clearly above others shows you are too loud, not blended.",
        ],
        [
          "weak",
          "Blend means singing as loud as possible so everyone hears you.",
          "Blend means fitting in, not being louder. If you stand out, you are not blending.",
        ],
        [
          "weak",
          "Blend is when the choir all wear the same color.",
          "Blend is about sound, not clothing. It means matching voices so the section sounds like one.",
        ],
      ],
    },
    {
      prompt:
        "The conductor gives a preparatory beat, a crescendo gesture and a cut-off during a song. Describe what each gesture tells the choir to do.",
      scheme: [
        "Says the preparatory beat shows the tempo and when to breathe",
        "Says singers breathe and begin together on the beat",
        "Says the crescendo gesture means get gradually louder",
        "Says the cut-off tells everyone to stop the note together",
      ],
      model:
        "The preparatory beat shows the tempo and when to breathe, so we breathe and start together. The crescendo gesture, often a growing pattern, means to gradually get louder. The cut-off tells us to stop the note together at exactly the same moment.",
      answers: [
        [
          "full",
          "[[0|The preparatory beat shows the speed and when to breathe.]] [[1|We take a breath and start on the beat together.]] [[2|The crescendo gesture means to slowly get louder.]] [[3|The cut-off means everyone stops the note at the same time.]]",
          "Full marks. Each gesture has a clear action for the choir.",
        ],
        [
          "full",
          "[[0|The prep beat tells the tempo and breath.]] [[1|We start together after it.]] [[2|Big growing hands mean crescendo, get louder gradually.]] [[3|The cut-off hand closing means stop together.]]",
          "All four marks. Describing the shape of the gesture helps you remember it.",
        ],
        [
          "partial",
          "[[0|Prep beat is the tempo.]] [[3|Cut-off is stop.]]",
          "Add what you do on the preparatory beat and what the crescendo gesture means.",
        ],
        [
          "partial",
          "[[2|Crescendo is getting louder.]] The cut-off means to start the note.",
          "Crescendo is right. A cut-off tells you to stop the note, not to start it.",
        ],
        [
          "weak",
          "The conductor is just keeping time and we can ignore the other gestures.",
          "The gestures give the choir important information about when to start, how loud to sing and when to stop.",
        ],
        [
          "weak",
          "We start whenever we feel like it.",
          "Singing together needs the preparatory beat. Start at the same moment, with the same tempo.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Solo and small-group singing, and songs in other languages",
  note: `
## Objectives

Students will be able to:

1. sing a short solo or small-group part with confidence;
2. perform songs in different languages with correct pronunciation.

## Materials

A song in Spanish and one in Latin or Italian with IPA-style pronunciation guides, a recording of native speakers, the quiz.

## Starter (6 minutes)

Say the phrase "Dona nobis pacem" (Latin for "grant us peace") in rhythm. Ask: "What do you notice about the vowels?" (They are pure and consistent.)

## Main activity

1. Confidence in a small group: stand in a trio and sing a four-bar phrase from memory. Others listen for pitch and one thing that was good.
2. Solo basics: breathe, find the starting pitch from the piano, sing with an open vowel and eye contact, and finish the phrase even if you slip.
3. Foreign-language songs: Latin and Spanish have five pure vowels (ah, eh, ee, oh, oo). Practice them, then add consonants. Learn the meaning of the words so the sound has feeling.
4. Perform the phrase of the song in a small group while the class gives specific, kind feedback.

## Checking for understanding

Ask: "What are the five pure vowels used in Latin and Spanish?" (Ah, eh, ee, oh, oo.)

## Exit ticket

Write the meaning of one line of a song in another language and one pronunciation tip.
`,
  reading: [
    "Singing alone, singing together, and singing in another language",
    `
Singing a solo or in a small group takes courage. Everyone feels nervous, and the way to manage it is preparation and a plan.

When you sing in a **small group**, such as a trio or a quartet, you are an important part of the sound, since each voice is heard. Learn your part well, listen to the others, and watch the signal for the start. A **solo** is a part sung by one person. Before singing, **breathe** low, find the **starting pitch** from the piano, think of the first word, and sing with **open vowels** and a relaxed face. If you make a mistake, keep going. Audiences do not remember a small slip, but they remember whether you finished with confidence. After singing, your classmates will give **specific, kind feedback**: one thing that was good and one thing to try.

Choirs often sing in languages other than English, such as **Latin**, **Spanish**, **Italian**, **German** and many others. Learning to pronounce them is part of the fun. Latin and Spanish are easier to start with, because their vowels are **pure**: **ah** (as in "father"), **eh** (as in "bed"), **ee** (as in "see"), **oh** (as in "go") and **oo** (as in "moon"). Each vowel stays the same from the start of the note to the end, unlike English, where vowels often glide into a second sound. Add the consonants lightly and crisply. In Latin, "Dona nobis pacem" is pronounced "DOH-nah NOH-bees PAH-chem" and means "grant us peace." In Spanish, a song such as "De Colores" has the line "y por eso los grandes amores de muchos colores me gustan a mí," which means "that is why the great loves of many colors please me."

Always learn the **meaning** of the words you sing. When you know what the words say, your sound reflects feeling. Listen to a recording of native speakers, and ask a teacher or a speaker for help with difficult sounds.

Practicing in a small group builds the confidence you need for any performance.
`,
  ],
  cards: [
    ["Solo", "A part sung by one person."],
    ["Trio", "A group of three singers."],
    ["Starting pitch", "The first note of a song, given before singing."],
    ["Pure vowel", "A vowel that stays the same through the whole note."],
    ["Latin", "The language of ancient Rome, often used in choral music."],
    ["Dona nobis pacem", "Latin for 'grant us peace.'"],
    ["Open vowel", "A vowel sung with a relaxed, open mouth."],
    ["Specific feedback", "Comments that name what was good and what to try."],
  ],
  closed: [
    [
      "How many pure vowels do Latin and Spanish use in singing?",
      ["Three", "Five", "Seven", "Ten"],
      "B",
    ],
    [
      "What does 'Dona nobis pacem' mean?",
      ["Come with me", "Grant us peace", "Sing to the Lord", "Good morning"],
      "B",
    ],
    [
      "If you make a mistake in a solo, you should:",
      ["Stop and leave", "Keep going and finish with confidence", "Start over loudly", "Apologize"],
      "B",
    ],
    [
      "A pure vowel:",
      [
        "Glides into a second sound",
        "Stays the same through the note",
        "Is silent",
        "Is always loud",
      ],
      "B",
    ],
    [
      "Why should you learn the meaning of the words in a foreign-language song?",
      [
        "So your singing can show the feeling of the words",
        "To make the song shorter",
        "To avoid the director",
        "It is not important",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how to prepare for a short solo, in order, from the moment before you sing until you finish.",
      scheme: [
        "Breathes low and finds the starting pitch",
        "Thinks of the first word and sings with open vowels",
        "Keeps going if a mistake is made",
        "Finishes the phrase with confidence and listens to feedback",
      ],
      model:
        "I breathe low and find the starting pitch from the piano. I think of the first word and sing with open vowels and a relaxed face. If I make a mistake, I keep going. I finish the phrase with confidence and then listen to the feedback.",
      answers: [
        [
          "full",
          "[[0|First I take a low breath and listen for my starting note.]] [[1|I think of the first word and open my mouth for the vowels.]] [[2|If I slip, I keep going.]] [[3|I finish with confidence and then listen to what my classmates say.]]",
          "Full marks. The steps are in a sensible order.",
        ],
        [
          "full",
          "[[0|Breathe in low, get the pitch from the piano.]] [[1|Think about the first word and sing with a relaxed face and open vowels.]] [[2|Do not stop if I make a mistake.]] [[3|Finish the phrase, then listen to the feedback.]]",
          "All four marks. Relaxing your face is one of the best ways to help your sound.",
        ],
        [
          "partial",
          "[[0|Breathe and find the note.]] [[2|Keep going if I make a mistake.]]",
          "Add the thinking of the first word and open vowels, and finishing with confidence.",
        ],
        [
          "partial",
          "[[1|Sing with open vowels.]] [[3|Finish and listen to feedback.]]",
          "Add the breath and the starting pitch at the start, and what to do if you make a mistake.",
        ],
        [
          "weak",
          "I would stand there and wait to see if I feel ready.",
          "Preparation means taking a breath and finding the pitch before singing. Waiting for a feeling does not help.",
        ],
        [
          "weak",
          "If I make a mistake I stop and start over from the beginning.",
          "Stopping interrupts the performance. Keep going and finish the phrase with confidence.",
        ],
      ],
    },
    {
      prompt:
        "Explain what pure vowels are, name the five used in Latin and Spanish, and say how they differ from many English vowels.",
      scheme: [
        "Defines a pure vowel as one that stays the same through the note",
        "Names the five: ah, eh, ee, oh, oo",
        "Says that many English vowels glide into a second sound",
        "Gives an example, such as the English 'go' gliding into 'oo'",
      ],
      model:
        "A pure vowel stays the same from the start to the end of the note. The five are ah, eh, ee, oh and oo. Many English vowels glide into a second sound, so the word 'go' often ends in 'oo', whereas a pure oh stays as oh.",
      answers: [
        [
          "full",
          "[[0|A pure vowel does not change while you sing it.]] [[1|The five are ah, eh, ee, oh, oo.]] [[2|English vowels often glide into another sound.]] [[3|For example in 'go' we say oh then oo, but a pure oh stays the same.]]",
          "Full marks. The 'go' example shows exactly what the glide is.",
        ],
        [
          "full",
          "[[0|A pure vowel stays the same from start to finish.]] [[1|Ah, eh, ee, oh, oo.]] [[2|In English, vowels often become two sounds.]] [[3|Say 'no' and notice how the oh turns into oo at the end.]]",
          "All four marks. Trying it in a real word is a great way to hear the difference.",
        ],
        [
          "partial",
          "[[1|Ah, eh, ee, oh, oo.]] [[0|They stay the same.]]",
          "Add how English vowels are different and give an example.",
        ],
        [
          "partial",
          "[[0|A pure vowel does not move.]] [[2|English has glides.]]",
          "Name the five vowels and give an example of a glide in an English word.",
        ],
        [
          "weak",
          "Pure vowels are vowels with no consonants near them.",
          "A pure vowel is one that stays the same sound through the note, not one without consonants.",
        ],
        [
          "weak",
          "Latin has no vowels.",
          "Latin has five vowels, ah, eh, ee, oh and oo, which are pure.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Preparing for a concert and keeping a practice log",
  note: `
## Objectives

Students will be able to:

1. prepare for a concert, including stage behavior and a performance plan;
2. keep a practice log and set goals for your voice.

## Materials

A concert calendar, a stage-behavior checklist, practice log templates, the problem set.

## Starter (6 minutes)

Pose: "The concert is in four weeks. What must happen before then?" List answers on the board.

## Main activity

1. Concert preparation: work backward. Week 1 learn notes and words, week 2 fix hard spots, week 3 add dynamics and expression, week 4 run-through and dress rehearsal.
2. Stage behavior: enter in order, stand tall, hold the folder at chest height or sing from memory, look at the conductor, stand still, and bow together.
3. Performance plan: warm-up before the concert, water, concert dress, call time, and what to do if you forget a word (keep going and look at the director).
4. Practice log: record the date, minutes, what you practiced and a goal. Practice with a recording and sing along with your part.

## Checking for understanding

Ask: "What do you do if you forget a word?" (Keep going and look at the conductor.)

## Exit ticket

Write one goal for your voice this week.
`,
  reading: [
    "Getting ready for the stage, and practicing on your own",
    `
A concert is the moment when the choir shares its work with an audience, and the preparation begins weeks before. The best way to plan is to **work backward** from the concert date. If the concert is four weeks away, then in week one you learn the notes, words and rhythms. In week two you fix the hard spots and learn the difficult words. In week three you add **dynamics** and **expression**, the feeling in the music. In week four you do complete run-throughs and a **dress rehearsal**, where you practice in concert clothes with the stage setup.

On the stage, **behavior** is part of the performance. Enter in order and quietly. Stand tall with your feet apart and your knees soft. Hold your folder at chest height so that you can see the conductor over the top, or sing from memory if you have learned the piece. Watch the conductor. Stay still between songs. Do not wave to the audience, and wait for the conductor to signal a bow. If you forget a word, **keep going** and look at the conductor. It is better to sing a wrong word with confidence than to stop.

A **performance plan** includes a warm-up before the concert, drinking water, eating a light meal, wearing the concert dress, and arriving at the **call time**. Take a few slow breaths before you walk out. Nerves are normal and can even help you stay alert.

Learning the music well takes **practice outside class**. Practice a little every day rather than a lot in one day. Use a **practice log** to record the date, the number of minutes, what you worked on and a goal. For example: "Date: Tuesday. 15 minutes. Worked on measures 9 to 16 with the recording. Goal: sing the notes with no mistakes three times in a row." Sing along with a recording of your part, and mark the hard spots with a pencil. At the end of the week, look at your log and adjust the plan.

A choir sounds its best when every member has prepared on their own as well as together.
`,
  ],
  cards: [
    ["Work backward", "Plan from the concert date toward today."],
    ["Dynamics", "How loud or soft the music is."],
    ["Expression", "The feeling put into the music by the singer."],
    ["Dress rehearsal", "A full rehearsal in concert clothes and setup."],
    ["Stage behavior", "How performers act on stage."],
    ["Call time", "The time performers must arrive."],
    ["Practice log", "A record of what, when and how long you practiced."],
    ["Run-through", "Singing the whole piece from start to finish."],
  ],
  closed: [
    [
      "A concert is four weeks away. What is a good goal for week one?",
      [
        "A dress rehearsal",
        "Learn the notes, words and rhythms",
        "Perfect the dynamics",
        "Only perform",
      ],
      "B",
    ],
    [
      "If you forget a word during the concert, you should:",
      [
        "Stop singing",
        "Keep going and look at the conductor",
        "Leave the stage",
        "Laugh",
      ],
      "B",
    ],
    [
      "A dress rehearsal is:",
      [
        "A rehearsal about clothing styles",
        "A full rehearsal in concert clothes with the stage setup",
        "The first rehearsal",
        "A rehearsal with no music",
      ],
      "B",
    ],
    [
      "Which practice habit is best?",
      [
        "A little every day",
        "A lot the night before",
        "None",
        "Only in class",
      ],
      "A",
    ],
    [
      "A practice log should include:",
      [
        "The date, minutes, what you worked on and a goal",
        "Your favorite color",
        "The weather",
        "The audience size",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "The choir has a concert in four weeks. Make a week-by-week plan with a goal for each week.",
      scheme: [
        "Week 1: learn notes, words and rhythms",
        "Week 2: fix hard spots",
        "Week 3: add dynamics and expression",
        "Week 4: run-through and dress rehearsal",
      ],
      model:
        "Week 1: learn the notes, words and rhythms. Week 2: fix the hard spots. Week 3: add dynamics and expression. Week 4: complete run-throughs and a dress rehearsal.",
      answers: [
        [
          "full",
          "[[0|Week 1: learn the notes, words and rhythms.]] [[1|Week 2: fix the hard spots.]] [[2|Week 3: add dynamics and expression.]] [[3|Week 4: run it all the way through and have a dress rehearsal.]]",
          "Full marks. Each week builds on the last.",
        ],
        [
          "full",
          "[[0|Week one: get the notes and words down.]] [[1|Week two: work on the hard parts slowly.]] [[2|Week three: add loud and soft and feeling.]] [[3|Week four: practice the whole concert and do a dress rehearsal.]]",
          "All four marks. A clear sequence from accuracy to expression to performance.",
        ],
        [
          "partial",
          "[[0|Week 1 learn it.]] [[3|Week 4 dress rehearsal.]]",
          "The first and last weeks are right. Give goals for weeks 2 and 3: hard spots, then dynamics and expression.",
        ],
        [
          "partial",
          "[[2|Week 1 add dynamics.]] [[1|Week 2 fix hard spots.]]",
          "You need to learn the notes before you can add dynamics. Start with the notes and words.",
        ],
        [
          "weak",
          "Sing it every day and hope it works.",
          "A plan has a goal for each week: notes, hard spots, expression and then run-throughs.",
        ],
        [
          "weak",
          "Do the dress rehearsal first so we are ready.",
          "A dress rehearsal is for the end, when everything has been learned.",
        ],
      ],
    },
    {
      prompt:
        "Write a practice log entry for one day, including the date, minutes, what you worked on, and a goal for the next day. Then explain how you would use the log at the end of the week.",
      scheme: [
        "Includes a date and minutes",
        "Says what was practiced",
        "Includes a specific goal for the next day",
        "Explains how the log would be used at the end of the week",
      ],
      model:
        "Date: Tuesday. Minutes: 15. Worked on measures 9 to 16 with the recording. Goal for tomorrow: sing those measures with no wrong notes three times in a row. At the end of the week I will review my log to see which days I practiced and whether I met my goals, and then change the plan.",
      answers: [
        [
          "full",
          "[[0|Tuesday, 15 minutes.]] [[1|I sang measures 9 to 16 with the recording.]] [[2|Goal for tomorrow: sing them with no wrong notes three times in a row.]] [[3|On Friday I will read my log to see if I met my goals and what to change.]]",
          "Full marks. The goal is specific and checkable.",
        ],
        [
          "full",
          "[[0|Date: Wednesday. Time: 12 minutes.]] [[1|Practiced the Latin words in the second verse.]] [[2|Goal: say the words at tempo without looking.]] [[3|At the end of the week I will count how many days I practiced and see if the goals worked.]]",
          "All four marks. Counting the days is a good habit.",
        ],
        [
          "partial",
          "[[0|Tuesday, 15 minutes.]] [[1|Practiced my song.]]",
          "Name which part you practiced, set a goal for tomorrow and explain how you will use the log at the end of the week.",
        ],
        [
          "partial",
          "[[2|My goal is to be better tomorrow.]] [[3|I will look at my log on Friday.]]",
          "Better is hard to measure. Add the date, minutes, what you practiced and a specific goal.",
        ],
        [
          "weak",
          "I practiced a lot today.",
          "A log entry needs the date, the number of minutes, what you worked on and a goal.",
        ],
        [
          "weak",
          "I do not need to write it down because I can remember.",
          "Writing it down lets you see patterns and progress over the week. Memory is not reliable for this.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Reading notation: key and time signatures, rhythm, solfege and sight-singing",
  note: `
## Objectives

Students will be able to:

1. read simple notation, including key and time signatures, rhythm and solfege;
2. sight-sing a short melodic pattern;
3. describe the text, mood and style of a piece we are learning.

## Materials

Staff paper, hand signs chart, a solfege ladder, a short sight-singing example, the worksheet.

## Starter (6 minutes)

Clap and say a rhythm with syllables: ta (quarter), ti-ti (two eighths), ta-a (half). Then change the rhythm and let students echo.

## Main activity

1. Key signature and time signature: in 4/4 there are four beats in a measure and a quarter note gets one beat. Find the key signature for a song in F (one flat).
2. Solfege: do re mi fa sol la ti do. In a major key, do is the tonic. Practice the scale with hand signs, up and down.
3. Sight-singing routine: find do, check the time signature, tap the rhythm, sing the solfege syllables, then sing with words.
4. Describe a piece: read the text, name the mood (joyful, gentle, sad), the style (folk, spiritual, classical) and why the composer chose the melody.

## Checking for understanding

Ask: "What is do in the key of F?" (The note F.)

## Exit ticket

Write the solfege for a five-note pattern: do, re, mi, fa, sol.

`,
  reading: [
    "How to read music and sing it the first time",
    `
Reading music is a skill that opens up hundreds of songs. The first things to read are the **key signature** and the **time signature** at the beginning of the staff. The key signature tells you which notes are sharp or flat. A song in F major has one flat, B-flat. The **time signature** has two numbers. The top number shows how many beats are in a measure, and the bottom number shows which note gets one beat. In **4/4** time, there are four beats, and a quarter note gets one beat. A half note lasts two beats, a whole note four, and two eighth notes together last one beat. You can say the rhythm with syllables: "ta" for a quarter note, "ti-ti" for two eighth notes, and "ta-a" for a half note.

**Solfege** is a system that gives each note of the major scale a syllable: **do, re, mi, fa, sol, la, ti, do**. The first note, do, is the **tonic**, the note that sounds like home. In the key of F, do is F; in the key of C, do is C. Solfege helps you hear the relationships between notes, rather than just the names. Each syllable has a **hand sign**, and showing the signs helps you remember the pitches.

**Sight-singing** means singing a melody you have not seen before. A routine helps. First, find **do** by looking at the key signature. Second, check the **time signature** and tap or clap the **rhythm**. Third, sing the **solfege syllables** and use your inner ear to hear each note. Fourth, sing the melody on a vowel, and finally sing it with the words. Do not give up if you make a mistake. Repeat the line and listen to the pitch.

To understand a piece, read the **text**, the words that are sung. Describe the **mood**, the feeling of the song: joyful, gentle, serious or sad. Name the **style**: folk, spiritual, classical or popular. Ask why the composer chose this melody for these words. For example, the American folk song "Shenandoah" has a long, flowing melody that matches its feeling of longing for a river and a far-off home.
`,
  ],
  cards: [
    ["Key signature", "Sharps or flats at the start of a staff that show the key."],
    ["Time signature", "Two numbers showing beats per measure and the note that gets one beat."],
    ["Solfege", "A system of syllables for scale notes: do, re, mi, fa, sol, la, ti."],
    ["Do", "The first note and tonic of a major scale."],
    ["Quarter note", "A note that lasts one beat in 4/4."],
    ["Sight-singing", "Singing a melody you have not seen before."],
    ["Text", "The words of a song."],
    ["Mood", "The feeling of a piece of music."],
  ],
  closed: [
    [
      "In 4/4 time, how many beats are in a measure?",
      ["Two", "Three", "Four", "Five"],
      "C",
    ],
    [
      "What is do in the key of F?",
      ["C", "F", "G", "B-flat"],
      "B",
    ],
    [
      "Which is the correct order of solfege for a major scale?",
      [
        "do re mi fa sol la ti do",
        "do mi re fa la sol do ti",
        "re do mi fa sol ti la do",
        "do re fa mi sol la ti do",
      ],
      "A",
    ],
    [
      "How long does a half note last in 4/4?",
      ["One beat", "Two beats", "Three beats", "Four beats"],
      "B",
    ],
    [
      "What is the first step in a sight-singing routine?",
      [
        "Sing loudly",
        "Find do from the key signature",
        "Skip the rhythm",
        "Close your eyes",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the sight-singing routine in four steps, and explain why you tap the rhythm before singing the pitches.",
      scheme: [
        "Finds do from the key signature",
        "Checks the time signature and taps the rhythm",
        "Sings the solfege syllables, then the words",
        "Explains that tapping the rhythm first separates rhythm from pitch so each is easier",
      ],
      model:
        "First find do from the key signature. Second check the time signature and tap the rhythm. Third sing the solfege syllables, and then sing with the words. I tap the rhythm first so that I handle the rhythm and the pitches one at a time, which is easier than doing both together.",
      answers: [
        [
          "full",
          "[[0|First I find do by looking at the key signature.]] [[1|Then I check the time signature and tap the rhythm.]] [[2|Then I sing the solfege and then the words.]] [[3|Tapping the rhythm first means I only have to think about the pitches next, so it is easier.]]",
          "Full marks. Splitting rhythm and pitch is the idea behind the routine.",
        ],
        [
          "full",
          "[[0|Find do from the sharps or flats.]] [[1|Check 4/4 or whatever and clap the rhythm.]] [[2|Sing the syllables and then add the words.]] [[3|I do the rhythm separately so I am not doing two hard things at once.]]",
          "All four marks. Clearly explained in your own words.",
        ],
        [
          "partial",
          "[[0|Find do.]] [[1|Tap the rhythm.]]",
          "Good first two steps. Add the singing of syllables and words, and explain why the rhythm comes first.",
        ],
        [
          "partial",
          "[[2|Sing the syllables.]] [[3|Rhythm is not important.]]",
          "Rhythm is very important. Tapping it first makes the singing easier, because you only need to think about pitch next.",
        ],
        [
          "weak",
          "Just sing the notes and see what happens.",
          "A routine helps: find do, check the time signature, tap the rhythm, sing the syllables and then the words.",
        ],
        [
          "weak",
          "Sight-singing means memorizing the song before singing.",
          "Sight-singing means singing a song you have not seen before, using the routine of key, rhythm and syllables.",
        ],
      ],
    },
    {
      prompt:
        "Choose a song we are learning and describe its text, mood and style, and explain how the melody supports the words.",
      scheme: [
        "Names the song and summarizes its text",
        "Describes the mood",
        "Names the style, such as folk, spiritual or classical",
        "Explains how the melody supports the words",
      ],
      model:
        "In the folk song Shenandoah, the text is about longing for a river and a far-off home. The mood is gentle and sad. The style is an American folk song. The long, flowing melody supports the words by sounding like a river and by matching the feeling of longing.",
      answers: [
        [
          "full",
          "[[0|Shenandoah is about someone who misses a river and a home far away.]] [[1|The mood is gentle and a little sad.]] [[2|It is an American folk song.]] [[3|The long smooth melody matches the feeling of longing, like water flowing.]]",
          "Full marks. Your link between the melody and the words is very clear.",
        ],
        [
          "full",
          "[[0|Our song talks about peace and asks for it.]] [[1|The mood is calm and prayerful.]] [[2|It is a short Latin round, classical style.]] [[3|The slow, even notes make it sound peaceful, which supports the words.]]",
          "All four marks. Slow, even notes are a good way to show a calm mood.",
        ],
        [
          "partial",
          "[[0|It is about a river.]] [[1|Gentle mood.]]",
          "Add the style and explain how the melody supports the words.",
        ],
        [
          "partial",
          "[[2|It is a folk song.]] [[3|The tune fits the words.]]",
          "Say what the words are about and the mood, and give a specific reason why the tune fits.",
        ],
        [
          "weak",
          "I like the song because it is pretty.",
          "Describe the text, mood and style, and explain how the melody helps to express the words.",
        ],
        [
          "weak",
          "Nothing about it matters, you just sing the notes.",
          "Understanding the text and mood helps you sing it with feeling.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Listening to ourselves, and making up a vocal improvisation",
  note: `
## Objectives

Students will be able to:

1. evaluate a recording of the choir using a rubric and suggest improvements;
2. create a short vocal improvisation or a new verse for a song.

## Materials

A recording of the choir's last run-through, a rubric (tone, pitch, rhythm, diction, dynamics, blend), a pentatonic scale chart, the worksheet.

## Starter (6 minutes)

Play thirty seconds of the choir's recording. Ask: "What do you hear that you could not hear while singing?"

## Main activity

1. Rubric listening: score tone, pitch, rhythm, diction, dynamics and blend from 1 to 4. Write one sentence of evidence for each, with a measure number or a word.
2. Improvement plan: choose the lowest category, state a cause and a way to improve it.
3. Improvisation: sing a short melody using the five notes of a pentatonic scale (do, re, mi, sol, la) over a simple drone. Start with a two-note idea and repeat it.
4. New verse: write a second verse for a simple folk song, keeping the rhythm and rhyme, and sing it for the group.

## Checking for understanding

Ask: "Which notes are in the pentatonic scale in solfege?" (Do, re, mi, sol, la.)

## Exit ticket

Write one rubric score with evidence and one improvement idea.
`,
  reading: [
    "Hearing ourselves, and making up our own music",
    `
Singers have a challenge: you cannot hear your voice the way an audience does. When you sing, you hear yourself from the inside, and your neighbors make it hard to hear the whole choir. A **recording** solves this. Listening to a recording of the choir gives you the audience's view, and helps you find what needs work.

Use a **rubric** to listen in an organized way. A rubric lists categories, such as **tone** (is the sound full and free?), **pitch** (are the notes in tune?), **rhythm** (is the timing accurate?), **diction** (are the words clear?), **dynamics** (are the loud and soft parts as marked?) and **blend** (does the choir sound like one voice?). Score each from 1 to 4. A score is only useful with **evidence**: "Diction 2: the final consonants in the second verse were not clear" is better than "Diction was bad." Then pick the lowest category and write an **improvement plan**. For example: "In the next rehearsal, we will say the words of the second verse together without singing, and exaggerate the final consonants."

You can also make your own music. **Improvising** means making up music in the moment. A **pentatonic scale** is a good place to start, because the five notes sound good in almost any order. In solfege, the major pentatonic is **do, re, mi, sol, la**. While the piano plays a steady drone on do, sing a short idea using these notes, such as "mi-re-do, mi-re-do." Then change one note or the rhythm. Repeat what works. Do not worry about mistakes, because improvisation is about trying ideas.

You can also write a **new verse** for a song. Choose a simple folk song and keep its melody and rhythm. Write new words that fit the same number of syllables and the same rhyme pattern. For example, a verse about the school day could be sung to the tune of a familiar folk song. Sing it for the group and ask for one suggestion.

Creating music helps you understand how songs are built, and makes you a better performer.
`,
  ],
  cards: [
    ["Rubric", "A chart of categories and levels used to judge a performance."],
    ["Evidence", "A specific detail that supports a score."],
    ["Improvement plan", "Specific steps to fix a weakness."],
    ["Improvise", "To make up music in the moment."],
    ["Pentatonic scale", "A five-note scale; in solfege, do re mi sol la."],
    ["Drone", "A long, steady note sounded under a melody."],
    ["Verse", "A section of a song with the same melody but new words."],
    ["Syllable count", "The number of syllables in a line of words."],
  ],
  closed: [
    [
      "Why is a recording useful for a choir?",
      [
        "It gives the audience's view of the sound",
        "It makes singing easier",
        "It replaces rehearsal",
        "It is required",
      ],
      "A",
    ],
    [
      "Which is the strongest piece of evidence for a score?",
      [
        "It was bad",
        "Diction 2: the final consonants in the second verse were not clear",
        "I like the choir",
        "We should try harder",
      ],
      "B",
    ],
    [
      "Which notes are in the major pentatonic scale?",
      [
        "do re mi fa sol",
        "do re mi sol la",
        "do mi fa sol ti",
        "re mi fa la ti",
      ],
      "B",
    ],
    [
      "What is a drone?",
      [
        "A very fast melody",
        "A long, steady note under a melody",
        "A kind of rhythm",
        "A verse",
      ],
      "B",
    ],
    [
      "When writing a new verse for a folk song, you should keep:",
      [
        "The melody, rhythm and syllable count",
        "Nothing",
        "Only the title",
        "The same words",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Choose a category from the choir's rubric where the recording scored lowest. Give a score and evidence, name a cause, and write an improvement plan.",
      scheme: [
        "Names a category and gives a score",
        "Gives specific evidence from the recording",
        "Names a cause of the problem",
        "Writes an improvement plan that can be checked",
      ],
      model:
        "Category: diction. Score 2. The final consonants in the second verse were not clear. The cause is that we sang the vowels long and let the ends of words go. The plan: next rehearsal we will say the words of the second verse together and exaggerate the final consonants, then sing it and record again.",
      answers: [
        [
          "full",
          "[[0|Diction, 2.]] [[1|The ends of the words in the second verse were not clear.]] [[2|We dropped the final consonants because we focus on vowels.]] [[3|Next time we say the words together, exaggerate the ends and record again to check.]]",
          "Full marks. The plan has a way of checking the improvement.",
        ],
        [
          "full",
          "[[0|Pitch, 2.]] [[1|The altos were flat on the long note in measure 12.]] [[2|The cause is that they did not support the breath at the end of the phrase.]] [[3|We practice measure 12 with a steady breath and check it with the keyboard next week.]]",
          "All four marks. Linking the flat pitch to breath support is accurate.",
        ],
        [
          "partial",
          "[[0|Blend, 2.]] [[1|Some singers were louder.]]",
          "Add a cause and an improvement plan that you can check.",
        ],
        [
          "partial",
          "[[3|We should practice more.]] [[0|Rhythm, 3.]]",
          "Practice more is too vague. Say what you heard and how you will check improvement.",
        ],
        [
          "weak",
          "The choir was bad.",
          "Choose one category, give a score and say where you heard the problem.",
        ],
        [
          "weak",
          "I did not listen to the recording.",
          "Listen to the recording with the rubric, and write one piece of evidence for a category.",
        ],
      ],
    },
    {
      prompt:
        "Explain how to improvise a short melody using the pentatonic scale, and write a two-line new verse for a simple folk song that keeps the same rhythm.",
      scheme: [
        "Names the pentatonic notes do re mi sol la",
        "Explains starting with a short idea and repeating or changing it",
        "Writes a two-line verse",
        "Keeps the syllable count and rhythm of the original lines",
      ],
      model:
        "Use the five notes do, re, mi, sol and la over a drone. Start with a short idea such as mi-re-do and repeat it, changing one note or the rhythm. A new verse for a folk song with eight syllables a line could be: Morning comes with golden light, / We walk to school with friends tonight.",
      answers: [
        [
          "full",
          "[[0|Use do, re, mi, sol and la.]] [[1|Start with a short idea like mi re do and repeat it, changing a note each time.]] [[2|Morning comes with golden light, we walk to school with friends tonight.]] [[3|Each line has eight syllables, like the original.]]",
          "Full marks. The verse fits the structure of the song.",
        ],
        [
          "full",
          "[[0|The five notes are do re mi sol la over a steady drone.]] [[1|I sing a two-note idea and then make it a bit different each time.]] [[2|New verse: Winter wind is blowing cold, / We wear our hats and scarves of gold.]] [[3|Both lines have eight syllables and they rhyme.]]",
          "All four marks. The rhyme and syllable count fit well.",
        ],
        [
          "partial",
          "[[0|do re mi sol la.]] [[1|Start with something short.]]",
          "Add a verse of your own that keeps the rhythm and syllable count.",
        ],
        [
          "partial",
          "[[2|Spring is here, the birds are singing, flowers blooming, bells are ringing.]] [[3|It matches the song.]]",
          "Name the pentatonic notes and explain how to improvise, and check that your syllable count matches.",
        ],
        [
          "weak",
          "Improvising is singing any notes you like, even wrong ones.",
          "A pentatonic scale gives you five notes that fit together, which makes improvising easier.",
        ],
        [
          "weak",
          "A new verse should have different music.",
          "A new verse uses the same melody and rhythm with new words.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Writing a four-bar melody, and the history of a spiritual",
  note: `
## Objectives

Students will be able to:

1. compose a four-bar melody for voice using a given scale;
2. describe the history and cultural context of a piece in our repertoire.

## Materials

Staff paper, a keyboard, a short biography card about spirituals, a recording of a spiritual, the worksheet.

## Starter (6 minutes)

Sing "Wade in the Water" or another spiritual from our repertoire. Ask: "How does this song make you feel? What do you think it is about?"

## Main activity

1. Composing: write a four-bar melody in the key of F, in 4/4. Use notes of the F major scale. Begin and end on F (do). Make the melody mostly step-wise with one skip. Use at least two different note lengths.
2. Sing it: sing your melody on solfege and then on a vowel. Make one change and hear how it differs.
3. History: spirituals were created by enslaved African Americans in the United States, mostly in the 1700s and 1800s. They were passed on by singing, not by writing. Their texts often carried religious and hidden messages of hope and the desire for freedom.
4. Context: discuss how songs can tell a community's story, and why respect and accuracy matter when we perform music from another culture.

## Checking for understanding

Ask: "How were spirituals passed on?" (By singing and hearing, an oral tradition.)

## Exit ticket

Write the solfege syllables of your four-bar melody.
`,
  reading: [
    "Writing your own tune, and a song with a story",
    `
You have been learning to read notes. Now you can write some. A **four-bar melody** in 4/4 has sixteen beats. Choose a key, such as **F major**, and write notes from its scale: F, G, A, B-flat, C, D, E, F. Begin and end on **F** (do), because the **tonic** gives the tune a feeling of home. Move mostly by **step**, which makes a melody easy to sing, and include one **skip** for interest. Use more than one note length, such as quarter notes and a half note, so that the rhythm has shape. Sing your melody on **solfege**, and then on a vowel. Change one note or rhythm and notice how that changes the character.

Many songs in a choir's repertoire have a history. A **spiritual** is a type of song created by enslaved African Americans in the United States, mostly in the 1700s and 1800s. Spirituals were not written down at first. They were passed on by singing and listening, which is called an **oral tradition**. They often use Bible stories and images, such as crossing a river or marching to a promised land. For people living in slavery, these songs expressed faith and hope, and some of them carried hidden messages about escape and freedom. After the Civil War, groups such as the **Fisk Jubilee Singers**, a choir of formerly enslaved people and their children from Fisk University in Nashville, toured the United States and Europe in the 1870s and made spirituals known to the world. Arrangers have since written choral versions of spirituals for concert use.

When we perform a song from a culture, we should do so with **respect** and **accuracy**. Learn what the song means and where it came from. Listen to recordings by people from the tradition. Sing with sincerity, and do not turn it into a joke.

Songs tell stories about the people who made them. When you sing a spiritual, you are carrying that story forward.
`,
  ],
  cards: [
    ["Four-bar melody", "A short tune of four measures."],
    ["Step", "A move to the next note in the scale."],
    ["Skip", "A move over one note in the scale."],
    ["Tonic", "The first note of the scale, where the tune feels at home."],
    ["Spiritual", "A song created by enslaved African Americans, with religious and hopeful texts."],
    ["Oral tradition", "Music passed on by singing and listening, not by writing."],
    ["Fisk Jubilee Singers", "A choir from Fisk University that toured in the 1870s."],
    ["Respect and accuracy", "Learning and performing a song from another culture with care."],
  ],
  closed: [
    [
      "How many beats are in a four-bar melody in 4/4?",
      ["4", "8", "12", "16"],
      "D",
    ],
    [
      "On which note should a melody in F major usually begin and end?",
      ["C", "A", "F", "G"],
      "C",
    ],
    [
      "How were spirituals first passed on?",
      [
        "In printed books",
        "By singing and listening",
        "By television",
        "By email",
      ],
      "B",
    ],
    [
      "Who were the Fisk Jubilee Singers?",
      [
        "A choir of formerly enslaved people and their children who toured in the 1870s",
        "A modern pop group",
        "A church bell choir",
        "An opera company",
      ],
      "A",
    ],
    [
      "Which melody feature makes a tune easy to sing?",
      [
        "Many large leaps",
        "Mostly steps",
        "Only one note",
        "No rhythm",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe how you would compose a four-bar melody in F major, and write the solfege for an example melody of your own.",
      scheme: [
        "Says to use notes of the F major scale",
        "Says to start and end on F, do",
        "Says to move mostly by step with one skip and use more than one note length",
        "Writes a solfege example that fits, such as do re mi re do sol do",
      ],
      model:
        "I would use the notes of the F major scale, begin and end on F (do), move mostly by step with one skip, and use more than one note length. An example in solfege: do re mi fa, sol mi re re, mi fa sol la, sol mi re do.",
      answers: [
        [
          "full",
          "[[0|I use the notes of F major.]] [[1|Start and end on F, which is do.]] [[2|Mostly steps with one skip, and different note lengths.]] [[3|Mine is: do re mi fa, sol mi re re, mi fa sol la, sol mi re do.]]",
          "Full marks. Your example begins and ends on do, as a good melody should.",
        ],
        [
          "full",
          "[[0|Pick notes from the F scale.]] [[1|It should start on F and end on F so it feels finished.]] [[2|Use steps mostly, one skip, and quarter notes and a half note.]] [[3|do mi re do, mi sol fa mi, sol la sol fa, mi re do do.]]",
          "All four marks. You included note lengths as well, which helps the shape of the tune.",
        ],
        [
          "partial",
          "[[0|Use notes from F major.]] [[1|Start and end on F.]]",
          "Add the types of motion and note lengths, and write your own example in solfege.",
        ],
        [
          "partial",
          "[[3|do re mi fa sol la ti do.]] I started on do.",
          "The scale is not a melody. Write a four-bar tune with steps and a skip that ends on do.",
        ],
        [
          "weak",
          "Any notes will do.",
          "Using notes of the scale and starting and ending on do makes a melody that sounds finished.",
        ],
        [
          "weak",
          "A four-bar melody has four notes.",
          "A four-bar melody has four measures, which is sixteen beats in 4/4, so it has many more notes.",
        ],
      ],
    },
    {
      prompt:
        "Explain what a spiritual is, how it was passed on, and why we should perform one with respect and accuracy.",
      scheme: [
        "Says spirituals were created by enslaved African Americans",
        "Says they were passed on orally by singing and listening",
        "Says they expressed faith and hope and sometimes hidden messages",
        "Explains that respect and accuracy mean learning the meaning and background and singing with sincerity",
      ],
      model:
        "A spiritual is a song created by enslaved African Americans in the United States. It was passed on by singing and listening, an oral tradition. Spirituals expressed faith and hope, and some carried hidden messages about freedom. We should perform one with respect and accuracy by learning its meaning and background and singing it sincerely.",
      answers: [
        [
          "full",
          "[[0|A spiritual is a song made by enslaved African Americans.]] [[1|It was passed on by singing and listening, not by writing.]] [[2|The songs expressed faith and hope and sometimes carried hidden messages about freedom.]] [[3|We should learn the meaning and background and sing it sincerely.]]",
          "Full marks. All the key points are accurate.",
        ],
        [
          "full",
          "[[0|Spirituals were created by enslaved people in America.]] [[1|They were an oral tradition.]] [[2|They showed faith and hope and some had secret messages.]] [[3|We should respect the history and sing with care and know what the words mean.]]",
          "All four marks. Knowing what the words mean is the heart of respect.",
        ],
        [
          "partial",
          "[[0|Enslaved people made spirituals.]] [[1|They sang them without writing them down.]]",
          "Add what the songs expressed and why we should perform them with respect and accuracy.",
        ],
        [
          "partial",
          "[[3|We should be respectful.]] [[2|They are about hope.]]",
          "Say who created them, how they were passed on and what respect and accuracy mean in practice.",
        ],
        [
          "weak",
          "Spirituals are just old songs from church.",
          "Spirituals are songs created by enslaved African Americans, and they have a particular history.",
        ],
        [
          "weak",
          "We can sing them in any way we want because it is just music.",
          "Songs from a culture deserve care. Learn the meaning and the history and sing with respect.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Singing, language, math and wellness; finding choirs in your community",
  note: `
## Objectives

Students will be able to:

1. explain how singing connects with language, mathematics and wellness;
2. identify community choirs and opportunities for continued singing.

## Materials

A rhythm tree, a breathing chart, a list of community music opportunities, the quiz.

## Starter (6 minutes)

Sing a short phrase and then speak it in rhythm. Ask: "How are singing and speaking the same? How are they different?"

## Main activity

1. Language: singing helps us learn words, sounds and rhythm. Compare how vowels are held in singing and spoken.
2. Math: a quarter note is one beat, a half note two, an eighth half a beat. A measure of 4/4 adds up to four beats. A song of 32 measures in 4/4 at 100 beats per minute lasts 32 × 4 ÷ 100 = 1.28 minutes.
3. Wellness: singing uses deep breathing, can reduce stress, and singing with others builds a sense of belonging. Practice a slow breathing exercise.
4. Community: church choirs, community choruses, school honor choirs, musical theater groups and a cappella groups. Make a list of two groups and a first step for each.

## Checking for understanding

Ask: "How long does a 32-measure song at 100 beats per minute last?" (About 1 minute 17 seconds.)

## Exit ticket

Write one way singing helps your well-being.
`,
  reading: [
    "More than a sound: singing, learning and belonging",
    `
Singing is connected to many parts of life. It helps with **language**. When you sing, you slow down the words and hold the vowels, which lets you notice how each sound is made. Many people learn the words of a second language more easily through songs, because the melody and rhythm help memory. Singing also builds listening and pronunciation skills.

Singing is full of **math**. A **quarter note** is one beat, a **half note** is two beats, and an **eighth note** is half a beat. A measure of 4/4 adds up to four beats. You can use arithmetic to find how long a song lasts. A song of 32 measures in 4/4 has 32 × 4 = 128 beats. At 100 beats per minute it lasts 128 ÷ 100 = 1.28 minutes, or about 1 minute 17 seconds. Rhythm patterns, fractions and ratios are all there when you read music.

Singing is also good for **wellness**. It uses deep, slow breathing, which can help you feel calm. Singing releases tension and many people report that it lifts their mood. Singing with a group gives a sense of **belonging**, because you share a goal with other people. Of course, take care of your voice, and never force it.

There are many ways to keep singing after this class. **School choirs** and **honor choirs** bring together singers from different schools. **Church and community choirs** welcome singers of all ages and often need no audition. **Musical theater** groups need singers for shows. **A cappella groups**, which sing without instruments, exist in many schools and colleges. To find a group, ask your director, search for community choruses in your area, and visit a rehearsal. A good first step is to attend a concert, or to email the director of a group that interests you.

Whether you sing in a large choir or just in the shower, you are part of a very old tradition. People have used their voices to learn, to celebrate and to comfort one another for thousands of years.
`,
  ],
  cards: [
    ["Quarter note", "One beat in 4/4."],
    ["Eighth note", "Half of a beat."],
    ["Wellness", "Good physical and mental health."],
    ["Belonging", "A feeling of being part of a group."],
    ["Honor choir", "A choir of selected singers from several schools."],
    ["Community choir", "A choir of volunteers from a town or neighborhood."],
    ["A cappella", "Singing without instruments."],
    ["Audition", "A short performance to be chosen for a group."],
  ],
  closed: [
    [
      "How long is a song of 32 measures in 4/4 at 100 beats per minute, about?",
      ["32 seconds", "1 minute 17 seconds", "2 minutes", "5 minutes"],
      "B",
    ],
    [
      "Which of these is true about singing and wellness?",
      [
        "Slow, deep breathing in singing can help you feel calm",
        "Singing is bad for you",
        "You should never sing in a group",
        "It makes you tired always",
      ],
      "A",
    ],
    [
      "How many eighth notes equal a quarter note?",
      ["One", "Two", "Three", "Four"],
      "B",
    ],
    [
      "An a cappella group sings:",
      [
        "With a full orchestra",
        "Without instruments",
        "Only in Latin",
        "Silently",
      ],
      "B",
    ],
    [
      "A good first step to join a community choir is to:",
      [
        "Wait until you are 40",
        "Attend a concert or contact the director",
        "Never audition",
        "Buy a piano",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A song has 48 measures in 4/4 at 96 beats per minute. How long does it last? Show your work and write the answer in minutes and seconds.",
      scheme: [
        "Calculates the total beats, 48 times 4 = 192",
        "Divides by the tempo, 192 divided by 96 = 2",
        "States the answer as 2 minutes",
        "Writes it as 2 minutes 0 seconds",
      ],
      model:
        "48 measures × 4 beats = 192 beats. 192 ÷ 96 = 2 minutes. The song lasts 2 minutes, or 2 minutes 0 seconds.",
      answers: [
        [
          "full",
          "[[0|48 × 4 = 192 beats.]] [[1|192 ÷ 96 = 2.]] [[2|It lasts 2 minutes.]] [[3|That is 2 minutes 0 seconds.]]",
          "Full marks. The steps are in the right order.",
        ],
        [
          "full",
          "[[0|Total beats is 4 times 48, which is 192.]] [[1|Beats divided by beats per minute is 192 / 96 = 2.]] [[2|So 2 minutes.]] [[3|2:00.]]",
          "All four marks. Clear and correct.",
        ],
        [
          "partial",
          "[[0|192 beats.]] 192 × 96 is a big number.",
          "The beats are right. To find minutes you divide by the tempo, 192 ÷ 96 = 2.",
        ],
        [
          "partial",
          "[[1|96 goes into 192 two times.]] I did not find the beats.",
          "The division is right. Show where the 192 comes from: 48 measures times 4 beats.",
        ],
        [
          "weak",
          "48 + 4 + 96 = 148 seconds.",
          "Adding the numbers has no meaning. Multiply measures by beats, then divide by the tempo.",
        ],
        [
          "weak",
          "It is 48 measures so 48 minutes.",
          "A measure is a few seconds, not a minute. Find the total beats and divide by the beats per minute.",
        ],
      ],
    },
    {
      prompt:
        "Describe two ways singing can help your well-being and name two places in your community where you could continue to sing, with one first step for each.",
      scheme: [
        "Describes a first way singing helps, such as calm breathing",
        "Describes a second way, such as belonging or mood",
        "Names two places to sing, such as a church choir and a school honor choir",
        "Gives a first step for each, such as contacting the director or attending a concert",
      ],
      model:
        "Singing uses slow, deep breathing that can help me feel calm, and singing with a group gives me a sense of belonging. I could join a church or community choir and a school honor choir. For the community choir I would attend a concert; for the honor choir I would ask my director about the audition.",
      answers: [
        [
          "full",
          "[[0|The slow deep breathing helps me feel calm.]] [[1|Singing with others gives me a feeling of belonging.]] [[2|I could join a community choir and the honor choir.]] [[3|I will go to a community concert and ask my director about the honor choir audition.]]",
          "Full marks. Two benefits and two places with a first step for each.",
        ],
        [
          "full",
          "[[0|Singing helps me relax when I am stressed.]] [[1|Being in a group makes me feel part of something.]] [[2|A church choir and an a cappella group at school are two places.]] [[3|I will visit a rehearsal at church and ask my teacher how a cappella groups audition.]]",
          "All four marks. Visiting a rehearsal is a sensible first step.",
        ],
        [
          "partial",
          "[[0|It makes me calm.]] [[2|I could join the honor choir.]]",
          "Add a second wellness benefit and a second place, and a first step for each.",
        ],
        [
          "partial",
          "[[1|It makes me feel part of a group.]] [[3|I will contact the director.]]",
          "Add a first benefit and name the places where you could sing.",
        ],
        [
          "weak",
          "Singing does nothing for well-being.",
          "Singing uses deep breathing and gives a sense of belonging, which helps well-being.",
        ],
        [
          "weak",
          "I will not sing after this class.",
          "You could continue in many places, such as church choirs, community choruses and school groups. Choose two and a first step.",
        ],
      ],
    },
  ],
};

writeCourse("choir-grade-9.json", "Choir", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
