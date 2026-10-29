import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Theater, Grade 10, Quarter 1. National Core Arts Standards, Theatre, in the
 * school's own words. Improvisation and character, designing a scene, voice
 * and body, monologues and scene work, blocking and production roles, reading
 * and responding to plays, critique, theater history, and careers. No
 * practicals.
 */

const w1: WeekInput = {
  topic: "Improvisation, character and writing a short scene",
  note: `
## Objectives

Students will be able to:

1. use improvisation to develop characters and scenes;
2. create a character with a physical and vocal choice, a want and an obstacle;
3. write a short scene with a beginning, middle and end.

## Materials

Index cards with character, place and situation prompts, a timer, scene-writing sheets, the quiz.

## Starter (7 minutes)

Play "Yes, and": in a circle, each person adds to a story by starting with "Yes, and." Ask: "What happens to the story when someone says no?"

## Main activity

1. Improv rules: accept and build on your partner's offer ("yes, and"), listen, commit, and make your partner look good. Do two-minute scenes from prompt cards.
2. Building a character: choose a want (what the character is trying to get), an obstacle (what stands in the way), a physical choice (how the character moves) and a vocal choice (how the character speaks). Fill in a character card for a person in a school cafeteria.
3. Writing a scene: a beginning that sets up the situation, a middle where the obstacle makes the problem harder, and an end where something changes. Write a one-page scene with two characters and about ten lines of dialogue.
4. Read two scenes aloud and discuss what each character wants.

## Checking for understanding

Ask: "What is a want, and what is an obstacle?" (A want is what the character tries to get; an obstacle is what stands in the way.)

## Exit ticket

Write one want and one obstacle for a character in a bus station.
`,
  reading: [
    "Making things up together, and building a person on stage",
    `
**Improvisation**, or improv, is acting without a script, making up the scene as it happens. It sounds scary, but it follows a few simple rules that make it work. The first is **"yes, and."** When your scene partner makes an **offer**, an idea such as "We are lost in the woods," you accept it (yes) and add something new (and): "Yes, and I think I hear a bear!" If you say no or ignore the offer, the scene stops. The second rule is to **listen**, because the best ideas come from what your partner just said. The third is to **commit**: when you play, play fully. The fourth is to **make your partner look good**. Improv is a team activity, and the goal is a good scene, not a win.

A good scene needs a good **character**. A character is more than a name and a costume. Actors build a character by answering four questions. What does the character **want**? A want is a goal the character is trying to reach, such as to win a contest, to be forgiven or to get a seat on a crowded bus. What is the **obstacle**? An obstacle is what stands in the way, such as a rival, a rule or fear. How does the character **move**, which is the **physical choice**? A shy person might make small gestures, while a confident person takes up more space. How does the character **speak**, the **vocal choice**? A nervous character might talk fast and quietly, and a king might speak slowly and loudly.

When you **write a scene**, give it three parts. The **beginning** sets up who is there, where they are and what each wants. In the **middle**, the obstacle makes the problem harder, and the conflict grows. At the **end**, something changes: a character gets what they want, or loses, or learns something. Use short lines of **dialogue**, the words the characters speak, and let each line show what a character wants rather than explain it.

Read your scene aloud with a partner. If the lines sound natural, and if the audience can tell what each person wants, the scene is working.
`,
  ],
  cards: [
    ["Improvisation", "Acting without a script, making the scene up as it happens."],
    ["Yes, and", "Accepting a partner's idea and adding to it."],
    ["Offer", "An idea one actor gives another in a scene."],
    ["Want", "What a character is trying to get."],
    ["Obstacle", "What stands in the way of a character's want."],
    ["Physical choice", "How a character moves."],
    ["Vocal choice", "How a character speaks."],
    ["Dialogue", "The words characters say to each other."],
  ],
  closed: [
    [
      "In improv, what does 'yes, and' mean?",
      [
        "Say yes to everything and do nothing",
        "Accept your partner's idea and add to it",
        "Argue with your partner",
        "Wait for the teacher",
      ],
      "B",
    ],
    [
      "A character's obstacle is:",
      [
        "What the character wants",
        "What stands in the way",
        "The character's name",
        "The costume",
      ],
      "B",
    ],
    [
      "A scene's middle usually:",
      [
        "Sets up the characters only",
        "Makes the problem harder through the obstacle",
        "Ends the story",
        "Has no action",
      ],
      "B",
    ],
    [
      "Which is a vocal choice?",
      [
        "Walking slowly",
        "Speaking fast and quietly because of nerves",
        "Wearing a hat",
        "Standing near a door",
      ],
      "B",
    ],
    [
      "Why is listening important in improv?",
      [
        "The best ideas come from what your partner just said",
        "It makes the scene longer",
        "You can copy the lines",
        "It is not important",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Create a character in a school cafeteria. Give the character a name, a want, an obstacle, a physical choice and a vocal choice.",
      scheme: [
        "Names the character and gives a clear want",
        "Gives an obstacle that stands in the way",
        "Gives a physical choice",
        "Gives a vocal choice",
      ],
      model:
        "Maya wants to sit at the popular table. The obstacle is that the seats are all taken and she is afraid to ask. She walks with small steps and holds her tray close to her body. She speaks quickly and quietly and trails off at the end of sentences.",
      answers: [
        [
          "full",
          "[[0|Maya wants to sit at the popular table.]] [[1|The obstacle is that every seat is taken and she is afraid to ask.]] [[2|She walks in small steps and holds her tray close.]] [[3|She speaks fast and quietly and does not finish her sentences.]]",
          "Full marks. All four choices fit together to make a believable character.",
        ],
        [
          "full",
          "[[0|Mr. Perez, a lunch monitor, wants to find out who spilled the juice.]] [[1|The obstacle is that no one will tell him and the cameras are broken.]] [[2|He stands tall with his arms behind his back and moves slowly.]] [[3|He speaks in a low, calm voice with long pauses.]]",
          "All four marks. The calm voice and the slow movement show a confident character.",
        ],
        [
          "partial",
          "[[0|A girl who wants lunch.]] [[2|She walks slowly.]]",
          "Add an obstacle and a vocal choice, and make the want more specific.",
        ],
        [
          "partial",
          "[[1|The obstacle is a long line.]] [[3|He talks loudly.]]",
          "Name the character and the want, and give a physical choice.",
        ],
        [
          "weak",
          "A student in the cafeteria who is a student.",
          "A character needs a clear want, an obstacle, and choices for moving and speaking.",
        ],
        [
          "weak",
          "I do not know what to write.",
          "Start with the want: what does this person want in the cafeteria? Then add the obstacle.",
        ],
      ],
    },
    {
      prompt:
        "Write a four-line dialogue between two characters in which each one wants something different, and explain how the beginning, middle and end of your short scene would work.",
      scheme: [
        "Writes four lines of dialogue",
        "Shows different wants for the two characters",
        "Describes a beginning that sets up the situation",
        "Describes a middle with a growing problem and an end where something changes",
      ],
      model:
        "A: Can I borrow your notes? B: I need them for tonight. A: I will give them back in ten minutes. B: Ask Jamal. In the beginning A asks for the notes; in the middle B refuses and the problem grows; at the end A finds another way and B changes his mind.",
      answers: [
        [
          "full",
          "[[0|A: Can I borrow your notes? B: I need them tonight. A: I will give them back in ten minutes. B: Ask Jamal.]] [[1|A wants the notes and B wants to keep them.]] [[2|The beginning sets up that A needs the notes for a test.]] [[3|In the middle B refuses and A gets desperate, and at the end B decides to share.]]",
          "Full marks. The dialogue shows each want without stating it.",
        ],
        [
          "full",
          "[[0|A: Where were you last night? B: At practice. A: Practice ended at six. B: I had to stay and clean up.]] [[1|A wants the truth and B wants to hide something.]] [[2|In the beginning we meet two friends at a locker.]] [[3|The middle gets tense as A pushes and the end reveals B went to a surprise party planning.]]",
          "All four marks. A surprise at the end gives the scene a satisfying change.",
        ],
        [
          "partial",
          "[[0|A: Hi. B: Hi. A: How are you? B: Fine.]] [[2|It starts at school.]]",
          "The lines are fine but nobody wants anything. Give each character a goal that clashes.",
        ],
        [
          "partial",
          "[[1|One wants to go out and the other wants to stay in.]] [[3|The end is different.]]",
          "Write the four lines of dialogue and describe the beginning, middle and end.",
        ],
        [
          "weak",
          "They talk about stuff and then they leave.",
          "A scene needs a want, a problem that grows and a change at the end.",
        ],
        [
          "weak",
          "They agree on everything the whole time.",
          "Without conflict there is no story. Give the characters different wants.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Designing a scene: set, lighting and costume, and adapting a story",
  note: `
## Objectives

Students will be able to:

1. plan a simple set, lighting or costume design for a scene;
2. adapt a short story or news event into a scene.

## Materials

Graph paper for a ground plan, colored pencils, a short story excerpt, a news article, the problem set.

## Starter (6 minutes)

Show two photos of a stage with different lighting. Ask: "How does the lighting change where the scene seems to be and how it feels?"

## Main activity

1. Set design: a ground plan is a bird's-eye drawing of the stage. Mark the entrances, furniture and playing areas. A set shows where the scene happens and helps the actors move.
2. Lighting: warm colors (amber) suggest daytime or comfort, cool colors (blue) suggest night or sadness. Lighting also shows time and focus.
3. Costumes: clothing shows character, time period and mood. Choose colors and materials that match the character.
4. Adapting a story: choose a short story or news event, find the main characters and conflict, decide what to keep, cut or change, and write a two-page scene.

## Checking for understanding

Ask: "What does a ground plan show?" (The layout of the stage as seen from above.)

## Exit ticket

Describe a lighting choice for a night scene and why.
`,
  reading: [
    "Showing where, when and who: design for the stage, and turning a story into a scene",
    `
Theater is made of words, actors and design. The **designers** help the audience see where and when a scene takes place and what it feels like.

**Set design** shows the setting. Before building, a designer draws a **ground plan**, a view of the stage from above that shows the walls, doors, furniture and the areas where actors will stand. A good set serves the actors. There must be clear **entrances and exits**, room to move, and furniture placed so that the audience can see the actors' faces. A set does not have to be realistic. A few chairs can be a kitchen, and a single door can be a house.

**Lighting design** sets the mood and controls what the audience sees. **Color** has a strong effect. Warm amber light suggests daytime, comfort or fire, and cool blue light suggests night, cold or sadness. Light can also create **focus**, such as a bright spotlight on one actor with the rest of the stage dim. Changing light can show the passing of time, from sunrise to evening.

**Costume design** tells the audience about a character before the actor speaks. Clothing shows the **time period**, the **place**, a person's **job** and **personality**, and even changes during the story. A character who begins in plain gray and ends in bright red may have undergone a big change.

Many plays and films are **adaptations** of other stories. To adapt a short story or a news event into a scene, follow these steps. Find the **main characters** and the **central conflict**. Decide what to **keep** (the most important moments), what to **cut** (long descriptions and minor events) and what to **change** (turn narration into dialogue and action). Keep the scene short, usually a few pages, and make sure it has a beginning, middle and end.

Whether you are designing or adapting, the question is always the same: what does the audience need to see, hear and understand?
`,
  ],
  cards: [
    ["Ground plan", "A bird's-eye drawing of the stage layout."],
    ["Entrance", "A way for actors to come onto the stage."],
    ["Playing area", "The part of the stage where action happens."],
    ["Warm light", "Amber light that suggests daytime or comfort."],
    ["Cool light", "Blue light that suggests night or sadness."],
    ["Focus", "Directing the audience's attention with light."],
    ["Adaptation", "A version of a story changed to fit another form."],
    ["Narration", "Words that tell the story rather than show it."],
  ],
  closed: [
    [
      "What does a ground plan show?",
      [
        "The stage layout seen from above",
        "The costumes",
        "The audience seats",
        "The script",
      ],
      "A",
    ],
    [
      "Which light suggests night or sadness?",
      ["Warm amber", "Cool blue", "Bright yellow", "No light"],
      "B",
    ],
    [
      "When adapting a story, what should you do with long descriptions?",
      [
        "Keep them all",
        "Cut them or turn them into action and dialogue",
        "Read them aloud",
        "Make them longer",
      ],
      "B",
    ],
    [
      "What can a costume change tell the audience?",
      [
        "That a character has changed",
        "That the show is over",
        "That the play is in color",
        "Nothing",
      ],
      "A",
    ],
    [
      "A good set must have:",
      [
        "Clear entrances and room for actors to move",
        "Real walls only",
        "No furniture",
        "A very large size",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Plan a design for a scene set in a small kitchen at night. Describe the set, the lighting and one costume, and say what each tells the audience.",
      scheme: [
        "Describes a set with entrances and furniture",
        "Describes lighting and its color",
        "Describes a costume",
        "Says what each choice tells the audience",
      ],
      model:
        "The set has a table and two chairs in the center, a door on the right and a window at the back. The lighting is a dim, warm lamp over the table with blue light from the window to show night. The character wears a worn bathrobe. These show a quiet home at night and that the character cannot sleep.",
      answers: [
        [
          "full",
          "[[0|The set has a table and two chairs in the middle, a door on the right and a window at the back.]] [[1|A warm lamp over the table and cool blue from the window.]] [[2|The character wears an old bathrobe.]] [[3|They tell the audience it is night in a quiet house and the character cannot sleep.]]",
          "Full marks. Each choice has a reason that the audience can read.",
        ],
        [
          "full",
          "[[0|A table with a chair, a fridge on the left wall and an entrance to the hall at stage right.]] [[1|Dim amber light on the table and the rest of the stage in blue.]] [[2|A sweatshirt and slippers.]] [[3|It shows a lonely late-night snack and a person who is comfortable but sad.]]",
          "All four marks. The focus on the table helps the audience see the main action.",
        ],
        [
          "partial",
          "[[0|A table and chairs.]] [[1|Blue light.]]",
          "Add an entrance, a costume and what each choice tells the audience.",
        ],
        [
          "partial",
          "[[2|A bathrobe.]] [[3|It shows the person is tired.]]",
          "Describe the set and the lighting too.",
        ],
        [
          "weak",
          "A kitchen with everything in it like a real kitchen.",
          "A set does not need everything. Choose a few items that help the story and leave room for the actors.",
        ],
        [
          "weak",
          "It does not matter what the lights are.",
          "Lighting sets the time and mood. Warm and cool colors tell the audience a lot.",
        ],
      ],
    },
    {
      prompt:
        "Choose a short story or news event and explain how you would adapt it into a two-page scene. Say what you would keep, cut and change.",
      scheme: [
        "Names the story or event and its main characters or conflict",
        "Says what to keep",
        "Says what to cut",
        "Says what to change, such as narration into dialogue",
      ],
      model:
        "I would adapt a news story about a lost dog found by two students. The main characters are the students and the owner, and the conflict is the search. I would keep the moment they find the dog, cut the long background about the neighborhood, and change the reporter's narration into dialogue between the students.",
      answers: [
        [
          "full",
          "[[0|I would use a news story about two students who find a lost dog, with the owner as the third character.]] [[1|I would keep the moment they find the dog and meet the owner.]] [[2|I would cut the long description of the neighborhood.]] [[3|I would turn the reporter's narration into dialogue between the students.]]",
          "Full marks. Each decision is clear and fits a short scene.",
        ],
        [
          "full",
          "[[0|A short story about a boy who is afraid to ride his bike, with his sister as the other character.]] [[1|Keep the conversation when she tells him how to start.]] [[2|Cut the paragraphs about the street.]] [[3|Change the thoughts of the boy into lines he says aloud to his sister.]]",
          "All four marks. Turning thoughts into dialogue is the key skill in adaptation.",
        ],
        [
          "partial",
          "[[0|A story about two friends.]] [[1|Keep the main parts.]]",
          "Name the conflict, and say what you would cut and change.",
        ],
        [
          "partial",
          "[[2|Cut the boring parts.]] [[3|Make them talk more.]]",
          "Name the story and its characters, and say what you would keep.",
        ],
        [
          "weak",
          "I would copy the whole story onto the stage.",
          "A scene is short. Choose the key moments and cut the rest.",
        ],
        [
          "weak",
          "I would change it so it is a different story.",
          "An adaptation keeps the main characters and the conflict, but changes how it is told.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Voice and body: projection, articulation, gesture and movement",
  note: `
## Objectives

Students will be able to:

1. use voice, including volume, pace, articulation and emphasis, to communicate a character;
2. use body, gesture and stage movement to communicate meaning.

## Materials

A warm-up sheet, tongue twisters, a line of text to practice with different emphases, a mirror, the worksheet.

## Starter (6 minutes)

Stand in a circle and shake out arms and legs, roll shoulders, and breathe deeply. Say "red leather, yellow leather" five times, getting faster.

## Main activity

1. Vocal warm-up: breath (diaphragm), humming for resonance, and articulation drills (tongue twisters).
2. Using the voice: volume (how loud), pace (how fast), pitch (how high or low), articulation (how clearly) and emphasis (which word is stressed). Say the line "I did not say you took it" seven times, stressing a different word each time. Notice how the meaning changes.
3. Body and gesture: posture, level, gestures and facial expression. Walk across the room as a person who is tired, proud or afraid.
4. Pairs perform a short line with a clear vocal and physical choice and the class guesses the character's feeling.

## Checking for understanding

Ask: "How does stressing a different word change the meaning of 'I did not say you took it'?" (It points to a different idea each time.)

## Exit ticket

Write one vocal and one physical choice for a nervous character.
`,
  reading: [
    "Using your voice and body to tell the story",
    `
An actor has two main tools: the **voice** and the **body**. Both can be trained.

Begin with a **warm-up**. Stretch and shake out any tension. Practice **breath support**: breathe low into the belly and release the air slowly. Hum to feel the vibration in the front of the face, which is called **resonance**. Practice **articulation**, how clearly you shape the consonants and vowels, with tongue twisters such as "red leather, yellow leather."

The voice has several qualities that an actor can control. **Volume** is how loud or soft. **Projection** means making your voice reach the back of the room without shouting, by using breath support. **Pace** is how fast you speak: a rushed pace can show fear, and a slow pace can show thoughtfulness or power. **Pitch** is how high or low. **Emphasis** is which word you stress. Try the line "I did not say you took it." If you stress "I," it suggests someone else said it. If you stress "did," you are denying it. If you stress "took," you may be admitting that you said something else. The same words can carry seven meanings.

The body tells the story, too. **Posture** shows confidence or fear. **Levels** are the height of the actor's body, such as standing, sitting or kneeling, and show power or weakness. **Gesture** is movement of the hands and arms, and should be purposeful, not nervous. **Facial expression** shows emotions, and even small changes can be read by an audience. **Stage movement** means walking with purpose. Stay still when you have nothing to do, because extra movement distracts.

Always ask: what does my character want, and how would they use their voice and body to get it? A character who is afraid might speak quickly and softly and keep their arms close. A king might speak slowly and take up space.

Good actors practice every day. Voice and body, like muscles, grow stronger with regular exercise.
`,
  ],
  cards: [
    ["Projection", "Making your voice reach the back of the room using breath support."],
    ["Articulation", "How clearly you shape consonants and vowels."],
    ["Pace", "How fast you speak."],
    ["Emphasis", "Stressing a particular word to show meaning."],
    ["Pitch", "How high or low the voice is."],
    ["Levels", "The height of an actor's body, such as standing or kneeling."],
    ["Gesture", "A movement of the hands or arms."],
    ["Resonance", "The richness of sound felt in the head and chest."],
  ],
  closed: [
    [
      "What is projection?",
      [
        "Shouting as loudly as possible",
        "Making your voice reach the back of the room using breath support",
        "Whispering",
        "Speaking only in a mirror",
      ],
      "B",
    ],
    [
      "Why does stressing a different word change a line's meaning?",
      [
        "It changes which idea the line points to",
        "It makes the line longer",
        "It adds new words",
        "It does not change anything",
      ],
      "A",
    ],
    [
      "A character who speaks quickly and softly and keeps their arms close might be:",
      ["Confident", "Afraid", "Angry", "A king"],
      "B",
    ],
    [
      "Levels in acting refer to:",
      [
        "How loud the voice is",
        "The height of the actor's body",
        "Seat prices",
        "The brightness of the lights",
      ],
      "B",
    ],
    [
      "Which gesture is the best choice?",
      [
        "Constant nervous fidgeting",
        "A purposeful gesture that shows the character's feeling",
        "Hiding your hands",
        "Pointing at the audience always",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose the line 'I did not say you took it.' Explain how stressing two different words gives the line two different meanings.",
      scheme: [
        "Names a first stressed word",
        "Explains the meaning that results",
        "Names a second stressed word",
        "Explains the second meaning",
      ],
      model:
        "If I stress 'I,' the line means someone else said it. If I stress 'took,' the line means I did not say you took it, but perhaps I said you borrowed it or lost it.",
      answers: [
        [
          "full",
          "[[0|If I stress I,]] [[1|it means someone else said it, not me.]] [[2|If I stress took,]] [[3|it means I might have said you borrowed it or lost it, but not that you took it.]]",
          "Full marks. Both meanings are clear and different.",
        ],
        [
          "full",
          "[[0|Stress on 'say']] [[1|means I did not say it out loud, maybe I hinted.]] [[2|Stress on 'you']] [[3|means I said somebody else took it.]]",
          "All four marks. Choosing different stressed words shows the range of meanings.",
        ],
        [
          "partial",
          "[[0|Stress on I.]] [[1|It means someone else said it.]]",
          "Add a second stressed word and its meaning.",
        ],
        [
          "partial",
          "[[0|I stress did.]] [[2|I stress took.]]",
          "Explain the meaning each stress gives to the line.",
        ],
        [
          "weak",
          "The meaning is always the same.",
          "Stress changes the meaning. Try saying the line with different words stressed and listen.",
        ],
        [
          "weak",
          "You just say it louder.",
          "Emphasis is not only volume. It is which word you stress, which changes the idea the line points to.",
        ],
      ],
    },
    {
      prompt:
        "Describe the voice and body choices for a nervous character giving a speech and explain how each shows the character's feeling.",
      scheme: [
        "Gives a vocal choice such as fast pace or a quiet voice",
        "Explains how that vocal choice shows nervousness",
        "Gives a body choice such as small gestures or rigid posture",
        "Explains how that body choice shows nervousness",
      ],
      model:
        "A nervous character might speak quickly and in a quiet voice, which shows they want the speech to be over. They might stand stiffly with their arms close to their body and avoid eye contact, which shows they feel unsafe and want to hide.",
      answers: [
        [
          "full",
          "[[0|The character talks fast and quietly.]] [[1|That shows they want to get through it quickly because they are scared.]] [[2|They stand stiffly with their arms close and look down.]] [[3|That shows they want to hide and feel unsafe.]]",
          "Full marks. Each choice is explained by the feeling it shows.",
        ],
        [
          "full",
          "[[0|A shaky voice that goes up at the end of each sentence.]] [[1|It shows the character is not sure of themselves.]] [[2|Hands that fidget and a shift from foot to foot.]] [[3|It shows nervous energy that cannot stay still.]]",
          "All four marks. A voice that goes up at the end shows doubt very well.",
        ],
        [
          "partial",
          "[[0|A quiet voice.]] [[2|Stand stiffly.]]",
          "Say how each choice shows that the character is nervous.",
        ],
        [
          "partial",
          "[[1|It shows they are scared.]] [[3|They want to hide.]]",
          "Name the specific voice and body choices that show it.",
        ],
        [
          "weak",
          "The character just says the lines.",
          "Actors make choices. Think about how a nervous person would speak and move.",
        ],
        [
          "weak",
          "They should look very happy and loud.",
          "A nervous person usually does not appear loud and happy. Choose a quiet, fast voice and tense body.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Monologues and playing a scene with a partner",
  note: `
## Objectives

Students will be able to:

1. memorize and deliver a monologue with intention;
2. rehearse and perform a scene with a partner, listening and responding in the moment.

## Materials

Short monologue selections (age-appropriate and in the public domain or original), a memorization worksheet, scene scripts for pairs, the worksheet.

## Starter (6 minutes)

Pair up. One person says a short line, and the other responds in a way that changes the line's meaning. Ask: "What changed when your partner reacted differently?"

## Main activity

1. Monologue: a speech by one character. Find the character's want, what they are saying it to, and the moment that causes them to speak. Divide it into beats (changes of thought), and mark a new action for each beat (convince, plead, demand, confess).
2. Memorizing: read it aloud five times, then cover a line and say it, add lines gradually, and practice while moving, not only sitting.
3. Playing a scene: listen to your partner and respond to what they actually say. Use eye contact, pause when a thought changes, and share the focus.
4. Rehearse a two-minute scene, then perform for another pair, who give feedback on one thing that worked.

## Checking for understanding

Ask: "What is a beat in a monologue?" (A change of thought or action.)

## Exit ticket

Write the want of your character and the action for the first beat.
`,
  reading: [
    "Saying a speech with purpose, and really playing with a partner",
    `
A **monologue** is a long speech by one character. The best monologues are not just words to say. The actor must know **who** the character is, **what** they want, **to whom** they are speaking and **why now**: what has happened that makes them speak at this moment.

To prepare, break the monologue into **beats**. A beat is a unit of thought, where the character begins a new idea or changes tactic. In each beat, choose an **action**, a verb that shows what the character is trying to do to the listener: to **convince**, **plead**, **warn**, **tease** or **confess**. When you say a line with an action, your voice and body naturally change, and the speech sounds alive.

**Memorizing** is easier with a method. Read the monologue aloud several times. Then cover the line, say it, check, and add one more line at a time. Practice in different ways, such as walking around the room, saying it to a friend or recording and listening. Understanding the meaning helps you remember the words, so do not memorize without thinking.

A **scene** is different from a monologue, because you work with a partner. The first rule is to **listen**. Do not wait for your cue and then say the next line. Hear what your partner says and let it affect you. If they say a line harshly, respond differently from the way you would if they said it gently. Use **eye contact**. Allow **pauses** when the character is thinking. **Share the focus**: if your partner has the important line, do not distract the audience by moving.

When you rehearse, **run the scene** two or three times, make one adjustment each time, and ask the observer for one thing that worked and one to try. When you perform, **commit** fully. If a line goes wrong, stay in character and keep the scene moving, as an audience will usually not notice.

Acting is about truthful reactions, and the best way to be truthful is to listen.
`,
  ],
  cards: [
    ["Monologue", "A long speech by one character."],
    ["Beat", "A unit of thought or a change of tactic in a speech or scene."],
    ["Action", "A verb showing what a character tries to do, such as convince or plead."],
    ["Intention", "What a character is trying to achieve in a moment."],
    ["Cue", "The words or action that tell an actor to speak or move."],
    ["Share the focus", "Not distracting from the actor who has the important moment."],
    ["Commit", "Play fully, without holding back."],
    ["Memorize", "Learn lines by heart."],
  ],
  closed: [
    [
      "What is a beat?",
      [
        "A musical drum",
        "A unit of thought or a change of tactic",
        "The end of a scene",
        "A prop",
      ],
      "B",
    ],
    [
      "Which is the best way to memorize a monologue?",
      [
        "Read it once the night before",
        "Read it aloud, add a line at a time and practice while moving",
        "Do not practice",
        "Memorize the first word only",
      ],
      "B",
    ],
    [
      "In a scene with a partner, the first rule is to:",
      ["Talk over them", "Listen and respond to what they actually say", "Look at the audience only", "Move constantly"],
      "B",
    ],
    [
      "Which of these is an action verb for a monologue beat?",
      ["Plead", "Chair", "Window", "Tomorrow"],
      "A",
    ],
    [
      "If you forget a line in performance, you should:",
      [
        "Stop and apologize",
        "Stay in character and keep the scene moving",
        "Leave the stage",
        "Start over",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose a monologue you might perform. Say who is speaking, what the character wants, who the character is speaking to, and why the character speaks now.",
      scheme: [
        "Says who is speaking",
        "Says what the character wants",
        "Says who the character is speaking to",
        "Says why the character speaks now",
      ],
      model:
        "A student named Jordan is speaking. Jordan wants the principal to cancel a punishment for a friend. Jordan speaks to the principal. Jordan speaks now because the decision is about to be final.",
      answers: [
        [
          "full",
          "[[0|Jordan, a student, is speaking.]] [[1|Jordan wants the principal to cancel a friend's punishment.]] [[2|The listener is the principal.]] [[3|Jordan speaks now because the decision is about to be final.]]",
          "Full marks. All four questions are answered clearly.",
        ],
        [
          "full",
          "[[0|A grandmother is talking.]] [[1|She wants her grandson to forgive his father.]] [[2|She talks to her grandson in the kitchen.]] [[3|She speaks now because the father is arriving in ten minutes.]]",
          "All four marks. The deadline in your answer gives the speech urgency.",
        ],
        [
          "partial",
          "[[0|A student.]] [[1|Wants something.]]",
          "Be specific about the want, who the speaker talks to and why now.",
        ],
        [
          "partial",
          "[[2|The principal.]] [[3|Because it is important.]]",
          "Say who is speaking and what they want, and name what has just happened.",
        ],
        [
          "weak",
          "Someone is talking and I have to say the words.",
          "An actor must know who is speaking, what they want, to whom and why now.",
        ],
        [
          "weak",
          "It does not matter, I will just say the lines.",
          "These questions make the speech live. Without them it is only words.",
        ],
      ],
    },
    {
      prompt:
        "Describe three habits that make a scene with a partner believable, and explain what you would do if your partner forgot a line.",
      scheme: [
        "Describes listening and responding to what the partner really says",
        "Describes eye contact or pauses",
        "Describes sharing the focus or committing fully",
        "Explains staying in character and helping the scene continue if a line is forgotten",
      ],
      model:
        "I would listen and respond to what my partner really says. I would use eye contact and allow pauses when the character is thinking. I would share the focus and commit fully. If my partner forgot a line, I would stay in character and give a natural cue to keep the scene moving.",
      answers: [
        [
          "full",
          "[[0|Listen and let my partner's line change my reaction.]] [[1|Use eye contact and take pauses when I am thinking.]] [[2|Share the focus and commit fully.]] [[3|If they forget a line, I stay in character and say something that gets us back on track.]]",
          "Full marks. Helping your partner in character is an important skill.",
        ],
        [
          "full",
          "[[0|Really hear what is said, not just wait for my cue.]] [[1|Look at my partner and pause for thought.]] [[2|Do not move when my partner has the important line.]] [[3|If a line is forgotten I keep the scene going as the character.]]",
          "All four marks. Not moving during your partner's moment is the heart of sharing focus.",
        ],
        [
          "partial",
          "[[0|Listen.]] [[1|Eye contact.]]",
          "Add a third habit and what to do if a partner forgets a line.",
        ],
        [
          "partial",
          "[[2|Commit fully.]] [[3|Stay in character.]]",
          "Add listening and eye contact or pauses.",
        ],
        [
          "weak",
          "Say my lines as fast as I can and wait for my turn.",
          "Waiting for your turn is not listening. React to what your partner really says.",
        ],
        [
          "weak",
          "If my partner forgets a line I laugh and stop.",
          "Stopping breaks the scene. Stay in character and help the scene continue.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Blocking, stage areas, production roles and showcase etiquette",
  note: `
## Objectives

Students will be able to:

1. block a scene and use stage areas and terms such as upstage and downstage;
2. take on a production role such as stage manager, props or sound;
3. prepare for a showcase and follow theater etiquette.

## Materials

A stage or taped floor plan, a stage-area chart, a prompt book template, production role cards, the worksheet.

## Starter (6 minutes)

Tape a stage rectangle on the floor. Ask students to point to the audience, the back of the stage, stage right and stage left, and notice that right and left are from the actor's point of view.

## Main activity

1. Stage areas: downstage is toward the audience, upstage is away from the audience, stage right is the actor's right facing the audience, stage left is the actor's left. Center stage is the middle.
2. Blocking: planned movement and positions of actors in a scene. Write the blocking in a prompt book with notes such as "Maya enters stage left, crosses to downstage center."
3. Production roles: director, stage manager (runs rehearsals and calls cues), props manager, costume crew, lighting and sound operators, and house manager.
4. Showcase etiquette: arrive early, silence phones, stay quiet backstage, respect the space and the crew, and thank the audience and each other.

## Checking for understanding

Ask: "Which direction is upstage?" (Away from the audience.)

## Exit ticket

Write the blocking for one entrance and one crossing.
`,
  reading: [
    "Where to stand, who does what, and how to behave at a performance",
    `
Actors and directors use special words for the parts of the stage, so that everyone is moving in the same space. These words come from a time when stages sloped toward the audience. **Downstage** is the part of the stage closest to the audience. **Upstage** is farthest from the audience. **Stage right** is the actor's right as the actor faces the audience, and **stage left** is the actor's left. **Center stage** is the middle. The terms are always from the **actor's** point of view, not the audience's.

**Blocking** is the planned movement and position of actors in a scene. It tells where the characters enter, where they stand, when they cross the stage and where they exit. Good blocking helps the story. If two characters argue, they might stand far apart and then move closer. If a character is shy, they may stay upstage and to the side. Blocking is usually written in pencil in the actor's script, and in the **prompt book**, the stage manager's copy of the script, with notes such as "Maya enters stage left, crosses to downstage center."

A play depends on many people. The **director** guides the whole production. The **stage manager** runs rehearsals and performances, keeps the prompt book and **calls the cues**, which tell the crew when to change lights or sound. The **props manager** collects and organizes the objects used on stage. The **costume crew** prepares clothing. **Lighting** and **sound operators** run the technical effects. The **house manager** takes care of the audience. Every role is essential, and good crews are often the reason a show runs smoothly.

**Theater etiquette** shows respect for the work. Arrive early and be ready. Silence your phone. Stay quiet backstage, because sound carries to the audience. Do not touch props or costumes that are not yours. Never watch the show from the wings in a way that distracts the actors. Follow the stage manager's instructions. After the show, thank the crew and your fellow actors, and accept compliments politely.

Teamwork, preparation and respect are as important as talent in the theater.
`,
  ],
  cards: [
    ["Downstage", "The part of the stage nearest the audience."],
    ["Upstage", "The part of the stage farthest from the audience."],
    ["Stage right", "The actor's right when facing the audience."],
    ["Stage left", "The actor's left when facing the audience."],
    ["Blocking", "Planned movement and positions of actors."],
    ["Prompt book", "The stage manager's script with cues and blocking."],
    ["Stage manager", "The person who runs rehearsals and calls the cues."],
    ["House manager", "The person who looks after the audience."],
  ],
  closed: [
    [
      "Which direction is downstage?",
      ["Away from the audience", "Toward the audience", "To the left", "To the right"],
      "B",
    ],
    [
      "Stage right is:",
      [
        "The audience's right",
        "The actor's right when facing the audience",
        "The back of the stage",
        "The front of the stage",
      ],
      "B",
    ],
    [
      "Who calls the cues during a performance?",
      ["The audience", "The stage manager", "The props manager", "The actor"],
      "B",
    ],
    [
      "Which of these is good theater etiquette?",
      [
        "Talking backstage during the show",
        "Silencing your phone and staying quiet backstage",
        "Touching other people's props",
        "Arriving late",
      ],
      "B",
    ],
    [
      "What is blocking?",
      [
        "Building the set",
        "Planned movement and positions of actors",
        "Memorizing lines",
        "Selling tickets",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write the blocking for a short scene in which a character enters, crosses to a table, sits, and later exits. Use stage directions with correct terms.",
      scheme: [
        "Uses a correct entrance direction, such as stage left",
        "Uses a correct crossing direction, such as downstage center",
        "Includes sitting at a location with a stage-area term",
        "Uses a correct exit direction",
      ],
      model:
        "Maya enters stage left. She crosses to the table at downstage center. She sits in the chair at the table. Later she gets up and exits stage right.",
      answers: [
        [
          "full",
          "[[0|Maya enters stage left.]] [[1|She crosses to the table downstage center.]] [[2|She sits in the chair at the table.]] [[3|At the end she exits stage right.]]",
          "Full marks. The directions are correct and from the actor's point of view.",
        ],
        [
          "full",
          "[[0|Enter upstage right.]] [[1|Cross to downstage left where the table is.]] [[2|Sit on the chair at the table.]] [[3|Exit upstage left.]]",
          "All four marks. Using upstage and downstage together with left and right is precise.",
        ],
        [
          "partial",
          "[[0|She enters.]] [[2|She sits at the table.]]",
          "Add the stage-area terms for the entrance, the crossing and the exit.",
        ],
        [
          "partial",
          "[[0|Enters stage left.]] [[3|Exits stage left.]]",
          "Add the crossing to the table and where she sits.",
        ],
        [
          "weak",
          "She walks in and sits down and then leaves.",
          "Blocking uses stage terms such as stage left, downstage and center. Add the correct directions.",
        ],
        [
          "weak",
          "She goes to the audience's left.",
          "Stage directions are from the actor's point of view, so use stage left and stage right.",
        ],
      ],
    },
    {
      prompt:
        "Choose a production role other than actor. Describe what the person does, one skill needed, and how that role helps the show run smoothly.",
      scheme: [
        "Names a role",
        "Describes what the person does",
        "Names one skill needed",
        "Explains how the role helps the show run smoothly",
      ],
      model:
        "The stage manager runs rehearsals, keeps the prompt book and calls the cues. The role needs organization and clear communication. It helps the show run smoothly because the lights, sound and actors all change at the right moments.",
      answers: [
        [
          "full",
          "[[0|Stage manager.]] [[1|They keep the prompt book and call the cues for lights and sound.]] [[2|They need to be organized and communicate clearly.]] [[3|That way every change happens at the right moment and the show runs smoothly.]]",
          "Full marks. All four parts are specific.",
        ],
        [
          "full",
          "[[0|Props manager.]] [[1|They collect and keep track of all the objects actors use.]] [[2|They need to be organized and pay attention to detail.]] [[3|The actors always have the right object at the right time, which keeps the scenes on track.]]",
          "All four marks. Attention to detail is a real need in props.",
        ],
        [
          "partial",
          "[[0|Lighting operator.]] [[1|Runs the lights.]]",
          "Add a skill and explain how the role helps the show run smoothly.",
        ],
        [
          "partial",
          "[[2|You have to be organized.]] [[3|It helps the show.]]",
          "Name the role and describe what the person does.",
        ],
        [
          "weak",
          "Other roles are not as important as actors.",
          "Every role is essential. Without a crew, the show cannot happen.",
        ],
        [
          "weak",
          "The house manager is the person who owns the house.",
          "The house manager looks after the audience, for example by seating them and handling the doors.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Reading a play and responding to a performance with evidence",
  note: `
## Objectives

Students will be able to:

1. read a play and identify the plot, characters, conflict and theme;
2. analyze a live or recorded performance and give evidence-based feedback.

## Materials

A short one-act play or a scene (original or in the public domain), a play analysis sheet, a recording of a performance, a feedback template, the quiz.

## Starter (6 minutes)

Read the first page of a short play aloud. Ask: "Who are the characters? What do they want? Where are they?"

## Main activity

1. Elements of a play: plot (what happens), characters, setting, conflict (the problem), theme (the big idea) and dialogue. Fill in the analysis sheet for the play we read.
2. Structure: exposition (introduces), rising action (conflict grows), climax (turning point), falling action and resolution.
3. Responding to a performance: watch a scene. Describe what you saw and heard (acting, voice, movement, set, lighting). Evaluate one choice with evidence and say how it supported the meaning.
4. Write a feedback paragraph with a description, a strength with evidence and a suggestion.

## Checking for understanding

Ask: "What is a theme?" (The big idea or message of a play.)

## Exit ticket

Write one sentence of description and one sentence of evidence-based feedback.
`,
  reading: [
    "How a play is built, and how to talk about what you see",
    `
A play is written to be performed. When you read one, look for its main elements. The **plot** is what happens, the events in order. The **characters** are the people in the story, each with wants and obstacles. The **setting** is where and when the play takes place. The **conflict** is the problem or struggle: it may be between two characters, between a character and a group, or inside a character. The **theme** is the big idea or message, such as "loyalty is tested by fear" or "honesty is difficult but necessary." The **dialogue** is the words the characters speak, and **stage directions** are the playwright's instructions for movement and action.

Plays often follow a pattern. In the **exposition**, we meet the characters and learn the situation. In the **rising action**, the conflict grows and complications arise. The **climax** is the turning point, the most intense moment when the conflict reaches its peak. In the **falling action**, the effects of the climax unfold, and in the **resolution**, the conflict ends and the story concludes. Not every play follows this pattern, but it is a useful guide.

When you watch a performance, practice **responding with evidence**. First **describe** what you saw and heard. Describe the acting, the voices, the movement, the set, the lighting and the costumes, in neutral words, such as "The actor stood at the edge of the stage and spoke quietly." Then **evaluate**: how well did a choice work? Give **evidence**: "The quiet voice made the character seem afraid, and it made the audience lean in." Say how the choice supported the **meaning**. Finally, offer a **suggestion**, a specific idea for the next performance: "The actor could face the audience more so that the quiet lines can be heard."

Feedback is most useful when it is **specific**, **kind** and **about the choices**, not about the person. Instead of "you were bad," say "The pace was fast in the second speech, so I missed the key words."

Reading and responding carefully help you understand how a play works and how to make your own work better.
`,
  ],
  cards: [
    ["Plot", "The events of a play in order."],
    ["Conflict", "The problem or struggle at the center of the story."],
    ["Theme", "The big idea or message of a play."],
    ["Exposition", "The part that introduces the characters and situation."],
    ["Climax", "The turning point and most intense moment."],
    ["Resolution", "The end of the conflict."],
    ["Stage directions", "The playwright's instructions about action and setting."],
    ["Evidence", "Specific details that support an opinion."],
  ],
  closed: [
    [
      "Which part of a play is the most intense turning point?",
      ["Exposition", "Climax", "Resolution", "Stage directions"],
      "B",
    ],
    [
      "A theme is:",
      [
        "The costumes",
        "The big idea or message of a play",
        "The length of the play",
        "The title only",
      ],
      "B",
    ],
    [
      "Which feedback includes evidence?",
      [
        "The actor was great",
        "The quiet voice made the character seem afraid, and the audience leaned in",
        "I liked it",
        "It was too long",
      ],
      "B",
    ],
    [
      "The conflict in a play can be:",
      [
        "Between characters, with a group or inside a character",
        "Only between two characters",
        "Only in the title",
        "Never present",
      ],
      "A",
    ],
    [
      "Good feedback should be about:",
      [
        "The performer's choices",
        "The performer's personality",
        "The audience's clothes",
        "Nothing specific",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the plot, conflict and a possible theme of a short play or scene you have read, naming the main characters.",
      scheme: [
        "Names the main characters",
        "Summarizes the plot",
        "Identifies the conflict",
        "States a possible theme",
      ],
      model:
        "In the scene, Sam and Dana are friends. Sam finds a wallet, and Dana tells him to keep the money. The conflict is between honesty and temptation. A possible theme is that being honest can be hard but worthwhile.",
      answers: [
        [
          "full",
          "[[0|The characters are Sam and Dana.]] [[1|Sam finds a wallet with money and Dana says to keep it, so Sam has to decide.]] [[2|The conflict is between being honest and being tempted.]] [[3|The theme is that honesty is hard but worth it.]]",
          "Full marks. The theme follows from the conflict.",
        ],
        [
          "full",
          "[[0|A grandmother and her grandson.]] [[1|The grandson wants to leave the village and the grandmother wants him to stay, and in the end he leaves with her blessing.]] [[2|The conflict is between family duty and personal dreams.]] [[3|The theme is that love lets people go.]]",
          "All four marks. A clear summary with a theme tied to the ending.",
        ],
        [
          "partial",
          "[[0|Sam and Dana.]] [[1|They find a wallet.]]",
          "Add the conflict and a possible theme.",
        ],
        [
          "partial",
          "[[2|The conflict is about honesty.]] [[3|The theme is honesty.]]",
          "Name the characters and summarize what happens.",
        ],
        [
          "weak",
          "It is about people who talk to each other.",
          "Be specific about what happens, the problem and the big idea.",
        ],
        [
          "weak",
          "The theme is the title.",
          "A theme is a message or big idea, not the title, though a title can hint at it.",
        ],
      ],
    },
    {
      prompt:
        "Watch a scene and write four sentences of feedback: a description, a strength with evidence, an effect on the meaning, and a suggestion.",
      scheme: [
        "Describes what was seen or heard in neutral words",
        "Names a strength with evidence",
        "Says how the choice supported the meaning",
        "Gives a specific suggestion",
      ],
      model:
        "The actor stood at the edge of the stage and spoke quietly in the second speech. The quiet voice made the character seem afraid because the audience leaned in to listen. This supported the meaning that the character was hiding something. The actor could face the audience more so the quiet lines can be heard.",
      answers: [
        [
          "full",
          "[[0|The actor stood at the edge of the stage and spoke quietly in the second speech.]] [[1|The quiet voice made the character seem afraid because the audience leaned in.]] [[2|That supported the idea that the character was hiding something.]] [[3|The actor could face the audience more so the quiet lines can be heard.]]",
          "Full marks. All four sentences are specific and respectful.",
        ],
        [
          "full",
          "[[0|The two actors moved apart during the argument and one turned away.]] [[1|It showed how the friendship was breaking because they stopped looking at each other.]] [[2|It fit the theme that anger can separate people.]] [[3|They could pause longer before the last line so the audience can feel the change.]]",
          "All four marks. A pause is a good suggestion for a key moment.",
        ],
        [
          "partial",
          "[[0|The actor spoke quietly.]] [[3|They could speak louder.]]",
          "Add a strength with evidence and the effect on the meaning.",
        ],
        [
          "partial",
          "[[1|It was really good because of the acting.]] [[2|It made the story clear.]]",
          "Describe a specific moment and give a concrete suggestion.",
        ],
        [
          "weak",
          "I liked it a lot.",
          "Describe what you saw and give evidence for your opinion.",
        ],
        [
          "weak",
          "The actor was bad and should quit.",
          "Feedback should be kind and about choices, not the person. Describe a moment and suggest something to try.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Giving and receiving notes, and the history of theater from Greece to today",
  note: `
## Objectives

Students will be able to:

1. take part in a rehearsal critique, giving and receiving notes;
2. describe the history of theater from ancient Greece to the present.

## Materials

A timeline of theater, a note-giving sheet, a short scene to rehearse, the problem set.

## Starter (6 minutes)

Perform a short scene twice, once with a change suggested by a classmate. Ask: "How did the change affect the scene?"

## Main activity

1. Giving notes: be specific, kind and useful. Use the format "I noticed... it made me feel/think... try...". Receive notes by listening, thanking the person and trying the idea.
2. Rehearsal critique: perform a scene, receive two notes, then repeat the scene with changes. Discuss what improved.
3. Theater history: ancient Greece (about 500 BCE, Dionysus festivals, tragedy and comedy, masks, an outdoor theater); Roman theater; medieval religious plays; Shakespeare and the Globe Theatre in London (about 1600); the American theater, including Broadway (from the 1800s), and modern theater.
4. Create a class timeline with one fact for each period.

## Checking for understanding

Ask: "What are two features of ancient Greek theater?" (Masks, outdoor theaters, a chorus, tragedy and comedy.)

## Exit ticket

Write one note you gave in the style "I noticed... try..."
`,
  reading: [
    "The art of giving notes, and two and a half thousand years of theater",
    `
In rehearsal, directors, actors and classmates give **notes**: observations and suggestions that help improve a performance. Good notes are **specific**, **kind** and **useful**. A helpful format is: "I noticed ... It made me think ... Could you try ...?" For example: "I noticed that you turned away when you said the last line. It made me think you were hiding something. Could you try facing her for that line?" When you **receive** a note, listen without arguing, say thank you, and try the idea. Even if you do not use it in the end, trying it will teach you something. Notes are about the scene, not about the person.

Theater has a long history. In **ancient Greece**, around 500 BCE, plays were performed at festivals honoring the god **Dionysus**. Greek theaters were large **outdoor** spaces built into hillsides. Actors wore **masks** to show their characters, and a **chorus** sang and spoke together. The two main kinds of play were **tragedy**, a serious story about a hero, and **comedy**. The **Romans** later built theaters of their own and adapted Greek plays.

In the **Middle Ages**, plays in Europe were often religious, performed on wagons in town squares. By about **1600**, in England, the playwright **William Shakespeare** wrote comedies, tragedies and histories for the **Globe Theatre** in London, an open-air playhouse where audiences stood or sat in galleries. At that time, women's roles were played by boys and men.

In the **United States**, theater grew in the 1700s and 1800s, with touring companies and local playhouses. In New York City, the **Broadway** district became famous for its musicals and plays, from the 1800s to today. In the twentieth century, writers such as **Lorraine Hansberry**, whose play "A Raisin in the Sun" opened on Broadway in 1959, brought the stories of Black American families to the stage. Modern theater includes realistic plays, musicals, experimental work and community theater.

Each period shows what people cared about, from honoring gods to telling the stories of families. When you perform, you are part of a very long tradition.
`,
  ],
  cards: [
    ["Notes", "Observations and suggestions that help improve a performance."],
    ["Dionysus", "The Greek god honored at the festivals where drama began."],
    ["Chorus", "A group that speaks or sings together in Greek theater."],
    ["Tragedy", "A serious play about a hero's downfall."],
    ["Globe Theatre", "The open-air playhouse in London where Shakespeare's plays were performed."],
    ["Broadway", "The theater district in New York City."],
    ["A Raisin in the Sun", "A 1959 play by Lorraine Hansberry about a Black family in Chicago."],
    ["Mask", "A covering worn by Greek actors to show a character."],
  ],
  closed: [
    [
      "Which feature belongs to ancient Greek theater?",
      [
        "Large outdoor theaters and masks",
        "Electric lighting",
        "Movie screens",
        "Microphones",
      ],
      "A",
    ],
    [
      "Where were Shakespeare's plays performed around 1600?",
      [
        "The Globe Theatre in London",
        "Broadway in New York",
        "A television studio",
        "A Greek hillside",
      ],
      "A",
    ],
    [
      "A good way to receive a note is to:",
      [
        "Argue and explain why it is wrong",
        "Listen, say thank you and try the idea",
        "Ignore it",
        "Leave the room",
      ],
      "B",
    ],
    [
      "Which note is the most useful?",
      [
        "That was bad",
        "I noticed you turned away on the last line, and it made me think you were hiding something; could you try facing her?",
        "I would have done it differently",
        "You should not act",
      ],
      "B",
    ],
    [
      "Which play by Lorraine Hansberry opened on Broadway in 1959?",
      [
        "A Raisin in the Sun",
        "Hamlet",
        "Oedipus Rex",
        "Our Town",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Write a note for a classmate using the format 'I noticed... it made me think... could you try...' about a scene you watched, and explain how to receive a note well.",
      scheme: [
        "Begins with a specific observation",
        "Explains the effect on the viewer",
        "Gives a specific suggestion",
        "Explains how to receive a note well",
      ],
      model:
        "I noticed that you spoke the last line while looking at the floor. It made me think the character was ashamed. Could you try looking up on that line to show that the character is brave? To receive a note, listen, say thank you and try the idea.",
      answers: [
        [
          "full",
          "[[0|I noticed you looked at the floor on the last line.]] [[1|It made me think the character was ashamed.]] [[2|Could you try looking up to show she is brave?]] [[3|To receive a note I listen, say thank you and try it.]]",
          "Full marks. The note is specific and your advice on receiving is sound.",
        ],
        [
          "full",
          "[[0|I noticed you said the second speech very fast.]] [[1|It made me lose the key words.]] [[2|Could you try slowing down on the word 'promise'?]] [[3|When I get a note I thank the person and try it before deciding.]]",
          "All four marks. Naming the word to slow down makes the suggestion easy to use.",
        ],
        [
          "partial",
          "[[0|I noticed you spoke fast.]] [[2|Try slower.]]",
          "Add what effect it had on you and how you would receive a note.",
        ],
        [
          "partial",
          "[[3|I listen and say thank you.]] [[1|It made me think about it.]]",
          "Write a note with a specific observation and a suggestion.",
        ],
        [
          "weak",
          "I noticed you were bad.",
          "A note should name a specific choice and suggest something to try.",
        ],
        [
          "weak",
          "If someone gives me a note I explain why they are wrong.",
          "Arguing blocks learning. Listen, say thank you, and try the idea.",
        ],
      ],
    },
    {
      prompt:
        "Describe two periods in the history of theater, saying where and when each happened and one feature that made it different from today's theater.",
      scheme: [
        "Names the first period with a place and time",
        "Gives one feature of the first period",
        "Names the second period with a place and time",
        "Gives one feature of the second period",
      ],
      model:
        "In ancient Greece, around 500 BCE, plays were performed at festivals in large outdoor theaters, and actors wore masks. In England around 1600, Shakespeare's plays were performed at the Globe Theatre, an open-air playhouse where boys and men played the women's roles.",
      answers: [
        [
          "full",
          "[[0|Ancient Greece, around 500 BCE.]] [[1|Plays were in big outdoor theaters and actors wore masks.]] [[2|London, around 1600, with Shakespeare at the Globe.]] [[3|Boys and men played the women's parts, and it was open to the air.]]",
          "Full marks. Each period has a place, a date and a feature.",
        ],
        [
          "full",
          "[[0|The Middle Ages in Europe.]] [[1|Religious plays were performed on wagons in town squares.]] [[2|Broadway in New York, from the 1800s on.]] [[3|It is famous for musicals and many new plays.]]",
          "All four marks. Wagons in town squares is a vivid detail.",
        ],
        [
          "partial",
          "[[0|Ancient Greece.]] [[2|Shakespeare's time.]]",
          "Add the dates and one feature for each period.",
        ],
        [
          "partial",
          "[[1|They wore masks.]] [[3|Boys played women.]]",
          "Name the two periods and their places and times.",
        ],
        [
          "weak",
          "Theater was invented last year.",
          "Theater has a long history, beginning with the ancient Greeks around 500 BCE.",
        ],
        [
          "weak",
          "Shakespeare lived in ancient Greece.",
          "Shakespeare lived in England around 1600. Ancient Greece was about 2,000 years earlier.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Plays and their times, and careers and community theater",
  note: `
## Objectives

Students will be able to:

1. explain how a play reflects the culture and time in which it was written;
2. identify careers in theater and community opportunities.

## Materials

Short excerpts of plays from different periods (public-domain or original), a careers chart, a list of community theater groups (invented or approved), the worksheet.

## Starter (6 minutes)

Read two short lines, one from an old play and one from a modern play. Ask: "What does each tell us about the people and time it came from?"

## Main activity

1. Plays and their times: how the social situation, beliefs and technology of a time shape a play. A Greek tragedy reflects religion and fate, a Shakespeare play reflects the Renaissance interest in power and human nature, and a modern realistic play reflects ordinary life.
2. Compare: choose two plays from different times and describe one similarity and one difference in themes.
3. Careers: actor, director, playwright, designer (set, lights, costumes, sound), stage manager, technical director, drama teacher, drama therapist and arts administrator.
4. Community opportunities: school drama club, community theater, youth theater programs, summer camps, volunteering as crew, and attending shows.

## Checking for understanding

Ask: "Name two careers in theater that are not acting." (For example, stage manager and lighting designer.)

## Exit ticket

Write one career and one community opportunity that interest you, with a first step.
`,
  reading: [
    "Plays are mirrors of their time, and theater can be a lifelong path",
    `
A play does not appear from nowhere. It is written by a person in a particular **time** and **place**, and it reflects the **culture**, beliefs and concerns of that world. This is called the **context** of the play. A play from ancient Greece, such as one by Sophocles, often deals with fate, the gods and the duty of a ruler, because these were central ideas in Greek life. A play by Shakespeare, written in England about 1600, reflects the Renaissance interest in human nature, ambition and power, and the structure of society under a monarch. A modern play such as Lorraine Hansberry's "A Raisin in the Sun" (1959) looks at a Black family in Chicago facing questions of housing, dignity and dreams in the middle of the twentieth century.

Technology also shapes plays. Greek plays were performed in daylight, with no lighting changes, so the words carried the mood. Shakespeare's theater had no scenery to speak of, so the language painted the setting. Modern plays can use detailed sets, electric light and amplified sound, which allows realistic settings.

To compare two plays, ask: what **problem** do the characters face? What do they **value**? What does the play suggest about **society**? You may find that the themes of love, loyalty, power and justice appear in many periods, but the ways of expressing them change.

Theater also offers many **careers**. On stage there are **actors** and **singers**. Behind the scenes, **directors** guide the production, **playwrights** write the scripts, and **designers** create sets, lighting, costumes and sound. **Stage managers** run the show, **technical directors** supervise the building and equipment, **drama teachers** introduce young people to the art, **drama therapists** use drama to help people heal, and **arts administrators** manage theaters and funding.

You can take part in theater in many ways right now. Join the **school drama club**, audition for a **community theater** or a **youth theater** program, volunteer as **crew** for a production, attend shows and read plays. A first step could be to talk to the drama teacher, or to sign up to help with the set.

Whether you work in theater or only enjoy it, you will carry the skills of listening, collaboration and speaking with confidence into every part of your life.
`,
  ],
  cards: [
    ["Context", "The time, place and culture in which a work was created."],
    ["Playwright", "A person who writes plays."],
    ["Director", "The person who guides the whole production."],
    ["Technical director", "The person who supervises building and equipment."],
    ["Drama therapist", "A person who uses drama to help people heal."],
    ["Arts administrator", "A person who manages a theater and its funding."],
    ["Community theater", "Theater by volunteers in a local community."],
    ["Crew", "People who work backstage on a production."],
  ],
  closed: [
    [
      "Which of these is a career in theater that is not acting?",
      ["Lighting designer", "Pilot", "Banker", "Chef"],
      "A",
    ],
    [
      "A Greek tragedy often deals with:",
      [
        "Fate, the gods and the duty of a ruler",
        "Space travel",
        "Smartphones",
        "Cooking",
      ],
      "A",
    ],
    [
      "What is the context of a play?",
      [
        "The time, place and culture in which it was written",
        "Its length",
        "The cost of tickets",
        "The name of the theater",
      ],
      "A",
    ],
    [
      "Which is a way to take part in theater right now?",
      [
        "Join the school drama club or volunteer as crew",
        "Wait until you graduate",
        "Avoid shows",
        "Never read plays",
      ],
      "A",
    ],
    [
      "A Raisin in the Sun (1959) is about:",
      [
        "A Black family in Chicago facing housing and dreams",
        "Ancient Greek gods",
        "A king in medieval England",
        "A space voyage",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how a play reflects the time and culture in which it was written, using an example from one of the periods we studied.",
      scheme: [
        "Names a play or period",
        "Says when and where it was written",
        "Describes a belief or concern of that time shown in the play",
        "Explains how the play reflects it",
      ],
      model:
        "Shakespeare's plays were written in England around 1600. People then were very interested in power, ambition and the nature of kings. In Macbeth, a man murders a king to gain power, and the play shows what the people of that time feared about ambition and disorder.",
      answers: [
        [
          "full",
          "[[0|Shakespeare's Macbeth.]] [[1|It was written in England around 1600.]] [[2|People then worried about power, ambition and who should be king.]] [[3|The play shows a man who murders the king, so it reflects those worries.]]",
          "Full marks. The example matches the concerns of the time.",
        ],
        [
          "full",
          "[[0|A Raisin in the Sun.]] [[1|It was written in the United States in 1959.]] [[2|Black families faced unfair housing rules and struggled for dignity.]] [[3|The play follows a family who wants to move to a better house, which reflects those problems.]]",
          "All four marks. The family's wish to move is a clear link to the real issue.",
        ],
        [
          "partial",
          "[[0|Greek theater.]] [[1|Around 500 BCE.]]",
          "Add a belief or concern of that time, and explain how a play reflects it.",
        ],
        [
          "partial",
          "[[2|People cared about the gods.]] [[3|The plays show that.]]",
          "Name a specific play or period and when it was written.",
        ],
        [
          "weak",
          "Plays are only entertainment and do not show anything about the time.",
          "Plays reflect the beliefs and worries of the people who write and watch them.",
        ],
        [
          "weak",
          "All plays say the same thing no matter when they were written.",
          "Themes may repeat, but each play also reflects its own time and place.",
        ],
      ],
    },
    {
      prompt:
        "Choose one career in theater and one community opportunity that interest you. Describe each and give a first step for each.",
      scheme: [
        "Names a career and describes it",
        "Names a community opportunity and describes it",
        "Gives a first step for the career",
        "Gives a first step for the opportunity",
      ],
      model:
        "I am interested in being a stage manager, who runs rehearsals and calls the cues. I am also interested in the school drama club, where students put on plays. For stage manager, my first step is to ask to help on the next show. For the club, my first step is to attend a meeting.",
      answers: [
        [
          "full",
          "[[0|Stage manager, who runs rehearsals and calls the cues.]] [[1|The school drama club, where students put on plays.]] [[2|I will volunteer as assistant stage manager on the next show.]] [[3|I will go to the first club meeting this week.]]",
          "Full marks. Specific careers and realistic first steps.",
        ],
        [
          "full",
          "[[0|Lighting designer, who plans how the stage is lit.]] [[1|A youth theater program in town where students work on productions.]] [[2|I will ask the drama teacher if I can help with lights on the next show.]] [[3|I will look up the audition date for the youth program.]]",
          "All four marks. Linking a school job to a community program is a smart path.",
        ],
        [
          "partial",
          "[[0|Actor.]] [[1|Drama club.]]",
          "Describe each and give a first step for each.",
        ],
        [
          "partial",
          "[[2|Ask the teacher.]] [[3|Go to a meeting.]]",
          "Name the career and the opportunity and what each involves.",
        ],
        [
          "weak",
          "I do not want to do anything in theater.",
          "You can still choose something that interests you, such as a crew job or watching shows.",
        ],
        [
          "weak",
          "I will become famous.",
          "Choose a specific career or opportunity and a realistic first step.",
        ],
      ],
    },
  ],
};

writeCourse("theater-grade-10.json", "Theater", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
