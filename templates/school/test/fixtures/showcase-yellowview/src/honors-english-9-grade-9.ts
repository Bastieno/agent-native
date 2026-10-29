import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors English 9, Grade 9, Quarter 1. Standards: Common Core State
 * Standards, English Language Arts, Grade 9 (RL, RI, W, SL, L), in the
 * school's own words. Anchor texts: "The Tell-Tale Heart" and "The Cask of
 * Amontillado" (Poe), Romeo and Juliet (Shakespeare), "The Cabuliwallah"
 * (Tagore), "Thank You, Ma'am" (Hughes), Tennyson's "Ulysses" with the
 * Odyssey, and the Narrative of Frederick Douglass. Short phrases only from
 * anything still in copyright.
 */

const w1: WeekInput = {
  topic: `The unreliable narrator: evidence, motive and diction in "The Tell-Tale Heart"`,
  note: `
## Objectives

Students will be able to:

1. support an interpretation of a short story with the strongest evidence, and say what the text leaves unstated;
2. explain how a complex character's choices and motives move the plot and shape the theme;
3. interpret figurative and connotative language and show how specific diction sets tone.

## Materials

Copies of "The Tell-Tale Heart" by Edgar Allan Poe, a two-column annotation sheet (what he says / what we infer), and highlighters.

## Starter (8 minutes)

Write on the board: "I am perfectly calm." Ask: "If a person has to tell you this, what do you think of it?" Let students argue for two minutes, then name the problem: a speaker's claims about himself are evidence, but they are not proof.

## Main activity

1. Read the story aloud to the end of the eighth night. Students annotate every place the narrator insists he is sane.
2. In pairs, fill the two-column sheet. Left: what he says. Right: what a careful reader infers. Push for inferences that the text supports from two places, not one.
3. Diction mini-lesson. Compare "film over the eye" with "vulture eye." Which makes the old man monstrous? Whose view does that word choice show?
4. Motive debate. The narrator says he had no reason. Is the "eye" a motive, a symptom, or an excuse? Students must cite two lines.

## Checking for understanding

Students write one sentence that begins "The narrator wants us to believe ..., but the text suggests ..."

## Exit ticket

Choose the one word in the story whose connotation tells you most about the narrator, and explain why.
`,
  reading: [
    "A narrator you cannot take at his word",
    `
Every story has a voice, and in a first-person story that voice also has an agenda. In an **unreliable narrator**, the teller's version of events cannot be fully trusted, either because he does not see himself clearly, or because he wants to shape what we think. Edgar Allan Poe's narrator in "The Tell-Tale Heart" is the most famous example in American short fiction, and reading him well means reading two stories at once: the one he tells, and the one his telling reveals.

He opens by protesting. He admits to being "very, very dreadfully nervous," then asks why anyone would call him mad. The question is a defense, and a defense is what a person offers when accused. Notice also that he defines his sanity by a skill: he can tell the story calmly. Then he narrates the murder in a tone of pride, boasting of the caution, foresight and dissimulation with which he worked. He says he was never kinder to the old man than the week before he killed him. The text keeps the facts and the self-portrait in tension, and a strong reader sets them side by side.

The most telling evidence is what the narrator cannot explain. He claims there was no object, no passion, no desire for gold. "He had never wronged me," he says, and then fixes on the old man's eye. Poe lets us infer the motive that the narrator will not name. The eye, pale blue and filmed over, becomes a vulture's eye in the narrator's mind, and the connotations of "vulture" (scavenging, waiting for death, predatory) are transferred from the narrator's own state to the man he is about to kill. This is **projection**: assigning to someone else the qualities you cannot see in yourself.

Diction, the writer's choice of words, carries the story's tone. Words such as "dissemble," "scream," "hideous" and "hell" push the mood toward terror, and by the last page the sentences break into short, gasping exclamations that mimic a mind coming apart. The beating that the narrator hears may be his own pulse, and the police may hear nothing at all. What the text leaves unstated, that the guilt comes from inside him, is the engine of the theme: a conscience cannot be silenced by a clean floor.

When you write about a story like this, avoid quoting only the narrator's claims. Pair each claim with the detail that contradicts or complicates it, and name the inference you draw from the pair.
`,
  ],
  cards: [
    ["Unreliable narrator", "A narrator whose account the reader cannot fully trust."],
    ["Inference", "A conclusion drawn from clues in the text that the text does not state outright."],
    ["Diction", "A writer's choice of words, including their connotations and level of formality."],
    ["Connotation", "The associations and feelings a word carries beyond its dictionary meaning."],
    ["Projection", "Assigning to another person the qualities one cannot admit in oneself."],
    ["Motive", "The reason behind a character's actions, stated or implied."],
    ["Dramatic irony", "When the reader understands something that a character or narrator does not."],
    ["Tone", "The author's or narrator's attitude toward the subject, shown by word choice and rhythm."],
  ],
  closed: [
    [
      "The narrator asks, \"Why will you say that I am mad?\" What does this question most likely suggest about him?",
      [
        "He is sure that nobody has accused him of anything.",
        "He is defending himself against a charge, which makes the reader doubt him.",
        "He is a doctor trying to diagnose someone else.",
        "He has just woken from a dream.",
      ],
      "B",
    ],
    [
      "The narrator calls the old man's eye a \"vulture eye.\" Which connotation of \"vulture\" most clearly shapes the narrator's feelings?",
      [
        "A graceful bird that flies high",
        "A symbol of peace",
        "A predator that waits for death, which makes the eye seem threatening",
        "A bird that is easily frightened",
      ],
      "C",
    ],
    [
      "Which detail is the strongest evidence that the narrator is not purely rational?",
      [
        "He lives in the same house as the old man.",
        "He waits eight nights, then kills a man who had never wronged him because of the look of an eye.",
        "He opens the lantern slowly.",
        "He greets the police politely.",
      ],
      "B",
    ],
    [
      "Near the end, the narrator's sentences become shorter and more frantic. What is the effect?",
      [
        "They slow the story so the reader can rest.",
        "They show that the narrator has become bored.",
        "They suggest that his composure is breaking, matching the pounding he hears.",
        "They indicate a change of narrator.",
      ],
      "C",
    ],
    [
      "Which statement states an inference rather than a fact stated in the text?",
      [
        "The narrator kills the old man at night.",
        "The sound of the heart that the narrator hears may come from his own guilt or pulse.",
        "The police arrive after a neighbor hears a shriek.",
        "The narrator hides the body beneath the floorboards.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Make a claim about whether the narrator of \"The Tell-Tale Heart\" is reliable. Support it with two pieces of evidence that work together: one thing the narrator says about himself and one detail that complicates it. Explain the inference you draw.",
      scheme: [
        "States a clear, arguable claim about the narrator's reliability",
        "Gives a specific statement the narrator makes about himself",
        "Gives a specific contradicting or complicating detail from the story",
        "Explains the inference that links the two pieces of evidence to the claim",
      ],
      model:
        "The narrator is unreliable because his picture of himself does not match his actions. He insists that his calm storytelling proves he is sane and that he was never kinder to the old man than the week before the murder. Yet he kills a man he admits never wronged him, over the look of an eye. A person who is kindest to someone he is plotting to kill is concealing something, so his claims of sanity are a defense, not evidence.",
      answers: [
        [
          "full",
          "[[0|The narrator is not reliable, because what he says about himself keeps getting undercut by what he does.]] [[1|He says he was never kinder to the old man than the whole week before he killed him, and that his careful planning shows how sane he is.]] [[2|But he also admits the old man never wronged him and he had no reason except the eye, so the planning is really obsession.]] [[3|I infer that he is using his calm to hide his instability, and a reader should believe his actions more than his words.]]",
          "Full marks. Setting a claim against the detail that undercuts it is the move this question asks for, and your inference names what that tells us.",
        ],
        [
          "full",
          "[[0|I would argue the narrator cannot be trusted at all on the question of his own sanity.]] [[1|He begins by asking why anyone would call him mad and then explains how cleverly and slowly he opened the door.]] [[2|Later, though, he hears the heart beating after the old man is dead and the police hear nothing, which means the sound is in his head.]] [[3|The inference is that the more he insists he is in control, the less he is, since his proof of sanity turns into proof of the opposite.]]",
          "All four marks. You used the beginning and the ending, which shows the pattern across the whole story.",
        ],
        [
          "partial",
          "[[0|The narrator is unreliable.]] [[1|He says that he is not mad and that he was calm and careful when he killed the old man.]] He is very scary and does bad things.",
          "Your claim and first piece of evidence are solid. Now find a detail that complicates his claim, such as the sound that only he hears, and explain what you infer from the two together.",
        ],
        [
          "partial",
          "[[2|He kills the old man because of the eye even though he says the old man never hurt him.]] [[3|That means we can't trust him, because a sane person would not do that.]]",
          "Good inference from a strong detail. What does the narrator say about himself that this detail contradicts? Quote it so the contrast is visible.",
          true,
        ],
        [
          "weak",
          "The narrator is reliable because he tells the story in order and gives lots of details about what happened. Reliable narrators give details.",
          "Detail is not the same as honesty. Look at what he claims about himself and ask whether his actions match.",
        ],
        [
          "weak",
          "[[1|He says he is not crazy.]] That is why the story is called the Tell-Tale Heart.",
          "You have found what he says about himself. A claim needs a point about reliability, a contradicting detail and an inference. Why is his insistence suspicious?",
        ],
      ],
    },
    {
      prompt:
        "Poe's narrator calls the old man's eye a \"vulture eye.\" Analyze how this word choice works. Consider denotation, connotation, and what the choice reveals about the narrator's motive.",
      scheme: [
        "Distinguishes the denotation (a bird, or an eye likened to one) from the connotation (predator, death, threat)",
        "Explains how the connotations make the eye seem menacing",
        "Connects the word choice to the narrator's psychology, such as projection or an excuse for his motive",
      ],
      model:
        "Denotatively, a vulture is a bird, so the narrator is saying the eye looks like a bird's. Connotatively, vultures wait for death and feed on it, so the eye seems predatory and sinister. By giving the eye those qualities, the narrator makes the old man a threat and so excuses his own violence. The word choice shows he needs an outside reason for what is really his own obsession.",
      answers: [
        [
          "full",
          "[[0|A vulture is literally a bird, but it connotes death, scavenging, and a creature that waits for something to die.]] [[1|When the narrator uses this word, the pale film of the old man's eye becomes frightening and cruel, as if the old man were hunting him.]] [[2|That helps the narrator excuse the murder, because if the eye is a predator then he is acting in self-defense. It suggests the real motive is in his mind, not in anything the old man did.]]",
          "Full marks. You moved from the word to the effect on the reader to the narrator's psychology in three steps.",
        ],
        [
          "full",
          "[[0|The dictionary meaning is just a large bird, but the feeling that comes with the word is that of something that feeds on the dead.]] [[1|It gives the eye a menacing, almost evil quality, so readers feel the old man is looking at him with bad intent.]] [[2|But the narrator is the only one who sees that, which tells us the threat is something he projects. He needs a reason, so he makes one up.]]",
          "All three marks. Noting that only the narrator sees the threat is a sharp observation.",
        ],
        [
          "partial",
          "[[0|A vulture is a bird that eats dead animals, and it makes you think of death.]] [[1|It makes the eye sound scary and creepy.]]",
          "You have the denotation, the connotation and the effect. Go one step further: what does it show about the narrator that he sees the eye this way?",
        ],
        [
          "partial",
          "[[2|The narrator picks a hateful word so that he can make himself feel better about killing the old man.]] It is just a word.",
          "Your point about motive is excellent. Support it by explaining the word's denotation and connotation first, so the reader sees how the word works.",
          true,
        ],
        [
          "weak",
          "Vulture means the old man is old and ugly, which is why the narrator hates him. The author did it to describe him.",
          "A vulture is not mainly about age or looks. Ask what a vulture does and what that suggests about death and threat.",
        ],
        [
          "weak",
          "[[0|A vulture is a bird.]] The narrator likes birds a lot and that is why he used it.",
          "Right that a vulture is a bird. The story gives no sign that he likes birds, and the word is chosen for its feeling. Think about what vultures wait for.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Theme, time and the structure of Romeo and Juliet",
  note: `
## Objectives

Students will be able to:

1. trace a theme through a play and describe how the author shapes and refines it over the course of the text;
2. analyze how an author's decisions about order, pacing and time create suspense, surprise or tension.

## Materials

Copies of Romeo and Juliet, a five-act plot diagram, a four-day timeline, and a theme tracker.

## Starter (8 minutes)

Display the Prologue's first fourteen lines without the title. Ask: "What does the audience know before a single character speaks? Why would a playwright tell us the ending first?"

## Main activity

1. Read the Prologue and Act 1 Scene 1 aloud. Students record what the audience is promised (a feud, doomed love, death) and what is withheld (how and why).
2. Build a timeline of the play on a strip: Sunday night to early Thursday morning. Mark each time the play speeds up, such as secret marriage, killings and banishment, and each time it slows, such as the balcony scene.
3. Mark the turning point: Act 3 Scene 1. Ask what changes for every character at the moment Mercutio dies.
4. Theme tracker: students pick one theme (fate versus choice, haste, love and hate) and gather one moment from each of Acts 1, 2, 3 and 5. Pairs compare how the theme has changed.

## Checking for understanding

Cold-call: "Where is the point of no return? Defend it with one line."

## Exit ticket

Write one sentence on how the compressed time of the play builds tension.
`,
  reading: [
    "A play that runs against the clock",
    `
Romeo and Juliet announces its ending before the first scene. The Prologue calls the lovers "star-cross'd" and says their deaths will end their parents' feud. A modern movie would hide this, but Shakespeare wants something different from surprise. He wants **dramatic irony**: the audience knows what the characters do not, so every happy moment is shadowed. When Romeo and Juliet exchange vows at the balcony, we listen with a sense of dread.

Time is the play's main pressure. The story takes place in about four days. Romeo meets Juliet on Sunday night, marries her on Monday, kills Tybalt on Monday afternoon, spends his wedding night with Juliet, and is banished by Tuesday morning. By Thursday, both are dead. Characters repeat words such as "haste" and "soon." Friar Laurence warns, "Wisely and slow; they stumble that run fast," and then the plot proves him right. The speed of events does not give anyone time to think, and that is part of the theme: choices made too quickly in anger or love lead to harm that cannot be undone.

The structure of the play helps. In a five-act tragedy, Act 1 introduces the conflict and Act 2 raises hope, with the party, the balcony and the secret wedding. The turning point comes in Act 3 Scene 1, in a street fight that begins as a joke and ends with two deaths. Before it, the play feels like a romance. After it, the play is a race: Romeo's banishment, Juliet's forced marriage, the Friar's plan and the letter that never arrives. Each of those steps uses a delay or a missed message to make the tension worse. If the letter had arrived, the ending would have changed.

Themes develop through this structure. The idea of fate appears at the start, in the Prologue and in Romeo's premonition before the party, but by Act 5 we have watched human choices (a duel, a plan, a hurried visit) cause the disaster. Shakespeare keeps both explanations alive. The theme of love versus hate also shifts: at the start the two are separate, but in the final scene the families' hatred is answered only by the cost of their children's love. A reader who traces such change sees that a theme is not a fixed label but a line that bends across the play.
`,
  ],
  cards: [
    ["Dramatic irony", "When the audience knows something the characters do not."],
    ["Prologue", "An opening speech that sets up the play, here stating the ending in advance."],
    ["Turning point", "The moment in a plot where the action changes direction for good."],
    ["Foil", "A character who contrasts with another to highlight qualities, such as Mercutio and Romeo."],
    ["Compressed time", "Events squeezed into a short span, which increases pressure."],
    ["Soliloquy", "A speech in which a character speaks thoughts aloud while alone on stage."],
    ["Tragic flaw", "A weakness in a character that contributes to their downfall."],
    ["Act", "A major division of a play, each with its own part of the structure."],
  ],
  closed: [
    [
      "Why does Shakespeare reveal the ending in the Prologue?",
      [
        "He forgot that surprise is important.",
        "It creates dramatic irony, so every hopeful scene is shadowed by what the audience knows.",
        "It gives the actors less to memorize.",
        "It means the tragedy is not worth watching.",
      ],
      "B",
    ],
    [
      "Which best explains how the play's short time span increases tension?",
      [
        "It gives the characters plenty of time to reconsider.",
        "It makes decisions seem rushed, with no room to undo mistakes.",
        "It lets the audience forget the feud.",
        "It makes the setting seem peaceful.",
      ],
      "B",
    ],
    [
      "Most critics place the turning point in Act 3 Scene 1. Why?",
      [
        "The lovers meet for the first time.",
        "The chorus speaks.",
        "Mercutio and Tybalt die and Romeo is banished, changing the play from romance to race against disaster.",
        "Juliet takes the potion.",
      ],
      "C",
    ],
    [
      "The failed delivery of the Friar's letter is an example of",
      [
        "a delay that creates tension and shows how small chances matter",
        "a flashback",
        "a comic subplot",
        "a soliloquy",
      ],
      "A",
    ],
    [
      "Which sentence states a theme, not just a topic?",
      [
        "Fate",
        "Haste in love and in anger can destroy what people most want to protect.",
        "Verona",
        "The Capulets and Montagues",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose one theme of Romeo and Juliet (for example, haste, fate versus choice, or love versus hate). Explain how Shakespeare develops it across at least two different acts, and show how the treatment of the theme changes or deepens.",
      scheme: [
        "States a theme as a full-sentence idea",
        "Gives a specific moment from an early part of the play that develops the theme",
        "Gives a specific moment from a later part that develops or changes it",
        "Explains how the theme deepens or shifts between the moments",
      ],
      model:
        "A theme of the play is that haste in love and anger leads to irreversible loss. In Act 2, the Friar warns that those who run fast stumble, yet he agrees to marry the couple within a day. In Act 3, Romeo rushes to avenge Mercutio and kills Tybalt, and in Act 5 he rushes to the tomb without waiting for the Friar's letter. The theme deepens from a warning to a demonstration, as haste moves from romance to violence to death.",
      answers: [
        [
          "full",
          "[[0|One theme is that moving too fast, whether in love or in anger, leads to disaster that can't be fixed.]] [[1|In Act 2 Friar Laurence says that people who run fast stumble, and in the same scene he marries them after knowing each other one day.]] [[2|Then in Act 3 Romeo kills Tybalt on the spot, without thinking, and in Act 5 he drinks the poison before Juliet wakes.]] [[3|So the theme starts as a warning that nobody heeds and ends as a proof, and the cost goes from a risky marriage to two deaths.]]",
          "Full marks. You traced the theme through three acts and said how it changed, not just that it appears.",
        ],
        [
          "full",
          "[[0|The play suggests that fate and choice are tangled together, and people blame fate for what they do themselves.]] [[1|Early on, Romeo says he fears some consequence yet hanging in the stars before he goes to the party, so he treats his future as fixed.]] [[2|But at the end, the deaths come from choices: Romeo not waiting for the Friar, the Friar leaving the tomb in a panic.]] [[3|By Act 5 the audience sees that the stars are only part of it, because Shakespeare shows plenty of human mistakes, so the theme becomes more complex than fate alone.]]",
          "All four marks. Showing a theme complicate itself is more sophisticated than showing it repeat.",
        ],
        [
          "partial",
          "[[0|A theme is that hurrying causes problems.]] [[1|In Act 2 the Friar tells Romeo to go slowly but then he marries them quickly.]] There is also a lot of fighting.",
          "Your theme and first moment are strong. Add a moment from later in the play and explain how the idea develops or changes.",
        ],
        [
          "partial",
          "[[2|In Act 3 Romeo kills Tybalt right after Mercutio dies, and in Act 5 he kills himself before he learns the truth.]] [[3|The theme gets more serious because the results get worse each time.]]",
          "Good development. State the theme in a sentence first, and add an early moment to show where it began.",
          true,
        ],
        [
          "weak",
          "The theme is love. Romeo and Juliet love each other and they get married and die. It is a very sad play.",
          "Love is the topic. Say what the play claims about love, and cite specific moments from different acts.",
        ],
        [
          "weak",
          "[[0|A theme is that hate hurts people.]] This happens in every act because the families fight all the time.",
          "Your theme is a start. \"Every act\" is too general: choose two specific scenes and say how the theme changes between them.",
        ],
      ],
    },
    {
      prompt:
        "Shakespeare compresses the action of the play into a few days and uses delays and missed messages late in the play. Analyze how these choices about time and pacing create tension, using at least two specific moments.",
      scheme: [
        "Identifies the compression of time and explains its effect",
        "Analyzes a first specific delay or missed message and its effect",
        "Analyzes a second specific moment of pacing, such as the speed after the turning point",
        "Connects the choices to the audience's feelings of dread or tension",
      ],
      model:
        "By limiting the story to a few days, Shakespeare gives the characters no time to recover from impulse. After Mercutio's death in Act 3, the play races: banishment, the forced marriage and the Friar's plan follow one another. Then the letter to Romeo is delayed by quarantine, so he hears of Juliet's supposed death from Balthasar. Because the audience knows the plan, the delay makes them feel helpless and increases dread.",
      answers: [
        [
          "full",
          "[[0|The play takes place in only about four days, so everything feels rushed and nobody gets time to think, which makes mistakes feel unavoidable.]] [[1|The best example is the Friar's letter being stopped by the quarantine, so Romeo never learns the plan.]] [[2|After Act 3 Scene 1 the scenes keep jumping to the next problem, with Romeo banished, Juliet told to marry Paris, and the potion, with no breathing room.]] [[3|Because we know about the letter and Romeo doesn't, we watch him walk toward the tomb and feel helpless, which is the dread Shakespeare wants.]]",
          "Full marks. Your moments are specific and you tied each of them to the audience's response.",
        ],
        [
          "full",
          "[[0|Shakespeare squeezes the love story into a few days, so the speed adds to the sense that fate is chasing the characters.]] [[1|When Friar John cannot get out of Mantua because of the plague, the plan fails by pure chance, which makes the audience tense because we see how close it was.]] [[2|Another example is the rapid sequence after the fight: Romeo is banished and Juliet is told she must marry Paris within days.]] [[3|The crowded, hurried scenes put the audience in a state of dread because we can see no way for them to slow down and fix things.]]",
          "All four marks. The word \"chance\" captures why the missed message feels cruel.",
        ],
        [
          "partial",
          "[[0|The play happens very quickly so it feels rushed.]] [[1|The letter does not reach Romeo, and that makes the ending sadder.]]",
          "You have the compression and one delay. Add a second moment of pacing and say how it affects what the audience feels.",
        ],
        [
          "partial",
          "[[2|After Mercutio dies the play moves faster and faster with Romeo banished and Juliet being forced to marry.]] [[3|It makes the audience nervous.]]",
          "Strong on the speed after the turning point. Explain how the short time span overall adds to the effect, and give a specific delay such as the letter.",
          true,
        ],
        [
          "weak",
          "The pacing is slow because there are lots of long speeches. This builds suspense because the audience gets bored.",
          "Long speeches do slow the play, but boredom is not the suspense Shakespeare is after. Look at the speed of events and the missed messages.",
        ],
        [
          "weak",
          "[[3|The audience feels nervous at the end.]] That is what plays do and it does not depend on time.",
          "The nervous feeling is right, but the question asks how time and delays create it. Find the choices that cause that feeling.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Across cultures and across centuries: Tagore, Hughes and Tennyson's Ulysses",
  note: `
## Objectives

Students will be able to:

1. compare how a work from another culture and a US work approach a shared idea, with attention to point of view;
2. recognize how an author draws on a myth or classic story, and explain what the later work does with it.

## Materials

Copies of "The Cabuliwallah" by Rabindranath Tagore (translation) and "Thank You, Ma'am" by Langston Hughes; a summary of Book 5 and Book 23 of the Odyssey; Tennyson's "Ulysses"; a comparison grid.

## Starter (8 minutes)

Ask: "When is it hardest to trust a stranger? When is it hardest to be trusted by one?" Take three short answers and write the shared word on the board: trust across a gap.

## Main activity

1. Read both stories. Fill the grid: who is the stranger in each, who has power, what is offered, and what changes.
2. Point of view. Tagore's father narrates in first person and is part of the story. Hughes's narrator describes from outside, almost like a camera that enters Roger's mind only at moments. Ask what each choice makes the reader notice and judge.
3. Odyssey connection: in the epic, Odysseus's goal is homecoming. Read Tennyson's old Ulysses. What has Tennyson changed about the hero's wish?
4. Students write a two-sentence statement: "Tennyson takes the myth and ..."

## Checking for understanding

Pairs share one similarity and one difference in how the two stories treat generosity.

## Exit ticket

Choose a line from "Ulysses" that shows the hero's attitude and say which part of the Odyssey it responds to.
`,
  reading: [
    "Strangers, kindness and a hero who will not stay home",
    `
Writers separated by oceans keep returning to the same human questions. How do we treat someone we have been taught to fear? What is the difference between punishing a person and helping them? Reading a story from Bengal beside one from Harlem shows both what is universal and what belongs to one place.

Rabindranath Tagore's "The Cabuliwallah," written in India in 1892, tells of Mini, a chattering five-year-old, and Rahmun, an Afghan fruit seller whom her father calls the Cabuliwallah. Mini's mother fears him, but Mini adores him, and over time the father learns that Rahmun's affection for Mini comes from the memory of a daughter he left behind. After Rahmun stabs a customer in a dispute, he spends years in prison and returns on the day of Mini's wedding. The father, who narrates, spends money meant for the celebration to send him home. In Langston Hughes's "Thank You, Ma'am," set in a Black neighborhood in the United States in the 1950s, a boy named Roger tries to steal a woman's purse, and Mrs. Luella Bates Washington Jones drags him home, makes him wash his face, feeds him supper, and gives him money for the shoes he wanted. Both stories ask what a person owes a stranger who may be a threat.

Point of view shapes how we judge each helper. Tagore's father admits his own early suspicion, and he narrates his change of heart, so the story is a confession as much as a plot. Hughes uses an outside narrator who reports what Mrs. Jones does and says with almost no comment, and the reader decides what her actions mean. The first story invites us to examine our own prejudice, and the second invites us to notice how rarely a stranger is treated with firmness and trust at once.

The writers of epics also borrow and answer one another. In Homer's Odyssey, Odysseus spends ten years trying to get home to Ithaca, and the story ends with his return. In his poem "Ulysses," Alfred, Lord Tennyson imagines the hero back at home and restless. This Ulysses finds his kingdom dull and wants to sail again "to strive, to seek, to find, and not to yield." Tennyson keeps the hero, the sea and the crew, but reverses the goal. In Homer, home is the prize. In Tennyson, home is the place to escape from. An allusion like this does more than repeat a myth. It argues with it, and the new meaning comes from the distance between the old story and the new one.
`,
  ],
  cards: [
    ["Point of view", "The perspective from which a narrative is told and how that shapes what we notice."],
    ["First-person narrator", "A narrator who is a character in the story and says \"I.\""],
    ["Third-person limited/objective", "A narrator outside the story who reports actions, sometimes with a character's thoughts."],
    ["Allusion", "A reference to a well-known story, person, work or event."],
    ["Epic", "A long narrative poem about a hero's deeds, such as the Odyssey."],
    ["Dramatic monologue", "A poem in which one speaker addresses a silent listener and reveals character."],
    ["Archetype", "A pattern, such as the wanderer or the mentor, found across many stories."],
    ["Theme (shared)", "An idea that two or more works treat in their own ways."],
  ],
  closed: [
    [
      "Which idea do \"The Cabuliwallah\" and \"Thank You, Ma'am\" most clearly share?",
      [
        "Strangers should always be avoided.",
        "Kindness and trust can change the way two people from different worlds see each other.",
        "Money solves most problems.",
        "Children cannot learn from adults.",
      ],
      "B",
    ],
    [
      "How does Tagore's first-person narrator shape the reader's response?",
      [
        "He hides his opinions.",
        "He confesses his early suspicion and change, which invites the reader to question their own assumptions.",
        "He is never present in the events.",
        "He says nothing about Rahmun.",
      ],
      "B",
    ],
    [
      "Hughes's narrator reports what Mrs. Jones does with almost no comment. What is the effect?",
      [
        "The reader must decide what her actions mean.",
        "The reader is told exactly what to think.",
        "The story becomes a riddle.",
        "Roger's thoughts are always known.",
      ],
      "A",
    ],
    [
      "In Homer's Odyssey, Odysseus's central goal is homecoming. What does Tennyson change in \"Ulysses\"?",
      [
        "He makes the hero afraid of the sea.",
        "He has the hero find home unsatisfying and long to travel again.",
        "He turns the story into a comedy.",
        "He removes the hero entirely.",
      ],
      "B",
    ],
    [
      "An allusion to a classic story is most effective when the later author",
      [
        "copies the story word for word",
        "avoids all changes to the original",
        "uses the old story to say something new through what is kept and what is changed",
        "forgets to name the characters",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Compare how \"The Cabuliwallah\" and \"Thank You, Ma'am\" treat the idea of trust between a person and a stranger who may seem threatening. In a paragraph, identify one similarity and one difference in the stories' ideas, and explain how each narrator's point of view shapes the reader's judgment.",
      scheme: [
        "Identifies a shared idea or similarity between the stories",
        "Identifies a difference in how the stories treat the idea",
        "Explains how Tagore's point of view shapes the reader's judgment",
        "Explains how Hughes's point of view shapes the reader's judgment",
      ],
      model:
        "In both stories an adult offers trust to someone others would fear, and the stranger responds to the respect. They differ in what drives the kindness: Tagore's father is moved by recognizing that Rahmun is a father too, while Mrs. Jones acts out of firm care for a boy she sees as capable of better. Tagore's first-person narrator confesses his own early suspicion, so the reader examines their own prejudice. Hughes's outside narrator reports what Mrs. Jones does without comment, so the reader must judge her actions for themselves.",
      answers: [
        [
          "full",
          "[[0|Both stories show someone choosing to trust a person others would be wary of, and in both the trust changes the person who receives it.]] [[1|One difference is that the father in Tagore's story is changed by recognizing something he shares with Rahmun, while Mrs. Jones decides on her own terms to help Roger and does not need to relate to him as a father figure.]] [[2|Because Tagore uses a first-person narrator who admits he was suspicious at first, we are pushed to admit our own assumptions.]] [[3|Hughes uses an outside narrator who just reports what she does, so we have to decide on our own that she is both strict and generous.]]",
          "Full marks. Your paragraph covered the idea, a distinction and the effect of each narrator without losing focus.",
        ],
        [
          "full",
          "[[0|Each story asks what we owe to a stranger, and each answers with generosity.]] [[1|The stories differ because Rahmun is an immigrant treated with prejudice by Mini's mother and the neighbors, while Roger is a neighborhood boy whose poverty is the real issue.]] [[2|In Tagore, the father tells it himself and confesses his own bias, so the story feels like a lesson he learned and passes on to us.]] [[3|In Hughes, the narrator stays outside and shows Mrs. Jones teaching without lecturing, so we form our own opinion of her.]]",
          "All four marks. Linking the kind of stranger to the type of prejudice is a perceptive difference.",
        ],
        [
          "partial",
          "[[0|Both stories are about trust between strangers.]] [[2|In The Cabuliwallah the father narrates so you see his thoughts change.]] I liked the second one more.",
          "Your similarity and your comment on Tagore's narrator are good. Add a clear difference and the effect of Hughes's point of view.",
        ],
        [
          "partial",
          "[[1|A difference is that Mrs. Jones teaches Roger a lesson while Rahmun just wants to see Mini.]] [[3|Hughes does not tell you what Mrs. Jones thinks, so it is up to you.]]",
          "Good difference and good comment on Hughes. State the similarity, and say how Tagore's first-person narrator shapes your judgment.",
          true,
        ],
        [
          "weak",
          "Both stories are set in the United States and both have a boy as a main character. They are about boys who steal.",
          "Only Hughes's story is set in the United States, and Tagore's centers on a girl and her father. Look at how each story treats trust.",
        ],
        [
          "weak",
          "[[0|They are both about people being kind to strangers.]] The point of view is the same in both because they are both stories.",
          "The similarity is a good start. Tagore's narrator is a character who says \"I,\" and Hughes's is outside the story. What does each choice do to the reader?",
        ],
      ],
    },
    {
      prompt:
        "Tennyson's \"Ulysses\" draws on Homer's Odyssey. Explain what Tennyson keeps from the myth and what he changes, and what the change suggests about the poem's idea of heroism.",
      scheme: [
        "Identifies what Tennyson keeps, such as the hero, the sea or the crew",
        "Identifies the change, such as home being dull instead of the goal",
        "Explains what the change suggests about heroism or human desire",
      ],
      model:
        "Tennyson keeps Ulysses, the sea and the mariners from Homer. What he changes is the goal: in the Odyssey the hero fights to reach home, but Tennyson's Ulysses finds home dull and wants to sail again. The change suggests a view of heroism as restless striving, where a hero cannot be satisfied by rest, even if it also hints at selfishness toward those left behind.",
      answers: [
        [
          "full",
          "[[0|Tennyson keeps the same hero, Ulysses, along with the ships and the old crew of sailors.]] [[1|What he changes is the ending, since in Homer, getting home is the whole point, but in Tennyson he is back in Ithaca and wants to leave because it bores him.]] [[2|This makes heroism about never giving up the search, not about reaching a safe place, though it also makes you wonder about the family he leaves.]]",
          "Full marks. The final clause shows you are reading the poem critically and not only admiring it.",
        ],
        [
          "full",
          "[[0|The poem still has Ulysses the sea captain, the voyages and the mariners he led at Troy.]] [[1|But Tennyson reverses the hero's desire: Homer's Odysseus longs for home for ten years, and Tennyson's Ulysses can't stand being at home.]] [[2|So the poem's idea of a hero is someone who must keep striving and learning until the end, even when it would be easier to stay.]]",
          "All three marks. The word \"reverses\" states the change precisely.",
        ],
        [
          "partial",
          "[[0|Tennyson uses the same hero and the sea like Homer did.]] Ulysses is old in the poem.",
          "You noticed what is kept. Now say what changes about the hero's goal and what the change suggests about heroism.",
        ],
        [
          "partial",
          "[[1|In Tennyson's poem, he is home and he wants to leave, which is the opposite of Homer.]] [[2|It shows that some people are never satisfied.]]",
          "Strong change and a thoughtful idea. Also name what Tennyson keeps, such as the hero and his crew, so the contrast is clear.",
          true,
        ],
        [
          "weak",
          "Tennyson changes the hero into a woman who stays home. It is about how women are strong too.",
          "Ulysses is still the male hero in Tennyson's poem. Reread what he says about home and the sea.",
        ],
        [
          "weak",
          "[[0|The poem keeps Ulysses.]] Nothing else is different because it is still the Odyssey.",
          "Tennyson does change something important. Look at how Ulysses feels about being home.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Central idea and strongest evidence in Frederick Douglass's account of learning to read",
  note: `
## Objectives

Students will be able to:

1. select the textual evidence that most strongly supports a claim about a nonfiction text;
2. determine the central idea of an informational text and summarize how it builds across paragraphs.

## Materials

The reading "A Boy Learns Why Reading Is Dangerous," a highlighter, and a paragraph-by-paragraph chart.

## Starter (8 minutes)

Ask: "Why would anyone forbid a child to learn the alphabet?" Take answers, then say that in the 1830s, in Baltimore, a young enslaved man named Frederick Douglass was in exactly this situation, and he later wrote about it.

## Main activity

1. Read the passage in stages. After each paragraph, students write a five-word note: what does this paragraph add to the whole?
2. Students draft the central idea in one sentence. Compare two versions: one that names a topic ("learning to read") and one that states an idea ("literacy is the path to freedom, which is why slaveholders feared it").
3. Evidence ranking. Three claims, five pieces of evidence each. Students rank the evidence from strongest to weakest and justify the order in writing.
4. Summary workshop: write a five-sentence summary that traces how the idea builds, and exclude opinion.

## Checking for understanding

Hold up numbers (1 to 5) to rank which piece of evidence best supports a claim. Cold-call a reason.

## Exit ticket

State the central idea in one sentence and name the paragraph that you think builds it most.
`,
  reading: [
    "A boy learns why reading is dangerous",
    `
Frederick Douglass was born into slavery in Maryland around 1818. As a boy he was sent to Baltimore to live with Hugh and Sophia Auld, and in his Narrative, published in 1845, he describes what happened there. Mrs. Auld, who had never owned a slave before, began to teach him the alphabet, and he learned quickly. When Mr. Auld found out, he forbade it, and he gave his reason aloud. Learning, he said, would make a slave unfit to be a slave: he would want to be free and become discontented.

Douglass writes that these words struck him like a revelation. He had been trying to understand why some people were masters and others were enslaved, and now a master had told him, without meaning to, that knowledge was the dividing line. From that moment, Douglass says, he understood the pathway from slavery to freedom. The lesson he took from Mr. Auld's anger was the opposite of the one intended.

He then found other ways to learn. Walking the streets of Baltimore, he gave bread to white boys in exchange for lessons, and he traded the lessons for more. He copied letters from the wood in a shipyard and challenged boys to writing contests to learn new ones. Later he acquired a book of speeches, The Columbian Orator, which gave him arguments about liberty and the vocabulary to state them. Reading taught him the vocabulary of his own condition. He also writes of the pain: the more he understood about slavery, the worse he felt, and at times he envied those who could not think about it.

Notice how the passage builds. It begins with a small action, a kind woman teaching a child. It turns on a single speech from a master. Then it gradually shows what literacy opens: first self-knowledge, then ways to learn, then the language to argue for freedom. Each stage depends on the last. The central idea is that the ability to read is power, which explains why a system built on bondage worked to deny it.

Douglass is also making a point about how the powerful reveal their fears. Mr. Auld's ban did not stop Douglass from learning. It told him how valuable learning was. A reader who follows that irony sees how the narrative functions as evidence for its own claim: Douglass lived the pathway he describes, and the book we are holding is its result.
`,
  ],
  cards: [
    ["Central idea", "The most important point an informational or nonfiction text makes."],
    ["Narrative (autobiography)", "A first-person account of the writer's own life or experience."],
    ["Strongest evidence", "The detail that most directly and convincingly supports a claim."],
    ["Summary", "A concise account of a text's main points, in your own words, with no opinion."],
    ["Irony", "A contrast between what is expected and what happens."],
    ["Literacy", "The ability to read and write."],
    ["Supporting detail", "A fact or example that helps develop the central idea."],
    ["Paraphrase", "To restate a passage in your own words while keeping its meaning."],
  ],
  closed: [
    [
      "Which sentence best states the central idea of the reading?",
      [
        "Frederick Douglass lived in Baltimore.",
        "Reading gave Douglass power, and that is why those who held power over him tried to deny it.",
        "Mrs. Auld was kind to him.",
        "The Columbian Orator is a book of speeches.",
      ],
      "B",
    ],
    [
      "A student claims, \"Douglass turned an act of oppression into a lesson in freedom.\" Which evidence supports this most strongly?",
      [
        "Mr. Auld's warning that learning would make him unfit to be a slave led Douglass to understand the pathway from slavery to freedom.",
        "Douglass was born in Maryland.",
        "Douglass traded bread to boys in the street.",
        "Mrs. Auld had never owned a slave.",
      ],
      "A",
    ],
    [
      "How does the third paragraph (the bread, the shipyard, the Orator) develop the central idea?",
      [
        "It interrupts the argument with unrelated stories.",
        "It shows the effort Douglass made to gain literacy, proving how much it mattered to him.",
        "It explains how The Columbian Orator was printed.",
        "It argues that bread is important.",
      ],
      "B",
    ],
    [
      "Which detail is a supporting detail and not part of the central idea?",
      [
        "Literacy is a form of power.",
        "Denying literacy protects those who hold power.",
        "He copied letters from the wood in a shipyard.",
        "Knowledge gave Douglass the language to argue for freedom.",
      ],
      "C",
    ],
    [
      "Which is the best objective summary of the passage?",
      [
        "Douglass was lucky to meet kind people in Baltimore.",
        "Douglass hated Mr. Auld and wrote the Narrative to get revenge.",
        "Douglass learned the alphabet from Mrs. Auld, was forbidden by Mr. Auld, and used the ban as a clue that reading was the path to freedom, which he pursued by every means he could find.",
        "Mr. Auld was correct about how reading affects a slave.",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Write the central idea of the reading in one sentence. Then give the two pieces of textual evidence you think most strongly support it, and explain why they are stronger than other details in the passage.",
      scheme: [
        "States the central idea as a complete, accurate sentence",
        "Cites a first specific piece of evidence from the text",
        "Cites a second specific piece of evidence from the text",
        "Explains why these details are stronger than others, such as being direct or showing a turning point",
      ],
      model:
        "The central idea is that literacy is a form of power, which is why those who held power over Douglass tried to keep him from it. The strongest evidence is Mr. Auld's statement that learning would make a slave unfit to be a slave, and Douglass's reaction that he now understood the pathway from slavery to freedom. These are stronger than details like the bread or the shipyard because they show the idea stated by both sides: the master fears it and Douglass realizes it.",
      answers: [
        [
          "full",
          "[[0|The central idea is that being able to read is power, which is why people who wanted to control Douglass did not want him to learn.]] [[1|The strongest evidence is when Mr. Auld says learning would make a slave unfit to be a slave.]] [[2|The second is Douglass saying that after hearing that, he understood the pathway from slavery to freedom.]] [[3|These are better than the details about bread and the shipyard because those show his effort but not why reading mattered, and these two are the master and Douglass both naming the power of reading.]]",
          "Full marks. Choosing the evidence that comes from both sides of the conflict is a strong, defensible decision.",
        ],
        [
          "full",
          "[[0|The passage is mainly saying that knowledge is freedom's first step, and the people who profit from slavery know it.]] [[1|One strong detail is that Mr. Auld forbids lessons because he thinks learning makes a slave discontented.]] [[2|Another is that Douglass kept learning from boys and The Columbian Orator even after the ban.]] [[3|They are stronger than the detail about Mrs. Auld never owning a slave since they show the power of reading from the master's fear and Douglass's response, not background information.]]",
          "All four marks. You justified the ranking by saying what the evidence proves, which is the habit to keep.",
        ],
        [
          "partial",
          "[[0|The central idea is that reading is power.]] [[1|Mr. Auld says that learning will make a slave unfit to be a slave.]] The other details are okay too.",
          "Your idea and first evidence are good. Add a second piece of evidence, and say why you chose these over others.",
        ],
        [
          "partial",
          "[[2|Douglass traded bread for lessons and he learned from The Columbian Orator.]] [[3|They are the best because they show how hard he worked.]]",
          "You cited details that show his effort. They are strong support for perseverance, but a stronger choice for the central idea is the moment Douglass understands why reading is feared. State the idea too.",
          true,
        ],
        [
          "weak",
          "The central idea is that Douglass lived in Baltimore and was born in Maryland. Those are the best pieces of evidence.",
          "Those are background facts. The central idea is about what literacy meant to him. Reread paragraph two.",
        ],
        [
          "weak",
          "[[0|Reading is power.]] The evidence is that Mrs. Auld was nice and then she wasn't nice. That shows her character.",
          "You have the idea. The evidence has to come from Douglass's learning and Mr. Auld's reaction, not Mrs. Auld's personality alone.",
        ],
      ],
    },
    {
      prompt:
        "Write a five-sentence objective summary of the reading that shows how its ideas build from paragraph to paragraph. Do not include your opinion.",
      scheme: [
        "Covers the opening situation accurately (Mrs. Auld teaching, Mr. Auld forbidding)",
        "Covers Douglass's realization about the pathway to freedom",
        "Covers how he kept learning by other means",
        "Connects these to the central idea that literacy is power",
        "Stays objective and in the writer's own words",
      ],
      model:
        "Douglass was taught the alphabet by Mrs. Auld until her husband forbade it. Mr. Auld's reason, that learning would make a slave unfit to be a slave, showed Douglass that reading was the pathway to freedom. He kept learning by trading bread to boys for lessons and by studying a book of speeches. The passage shows the ideas building from a small lesson to a larger understanding of power. Its central idea is that literacy is power, which is why it was denied.",
      answers: [
        [
          "full",
          "[[0|Mrs. Auld started teaching Douglass the alphabet until her husband made her stop.]] [[1|Mr. Auld said reading would make a slave want to be free, and Douglass realized that reading was the way out.]] [[2|He kept learning by getting lessons from boys on the street for bread and by reading The Columbian Orator.]] [[3|Each step shows him gaining the words and knowledge that make freedom thinkable.]] [[4|So the passage is about reading being a kind of power, and it states this without commenting on whether the ban was right.]]",
          "Full marks. You moved in order through the passage and kept your own opinion out.",
        ],
        [
          "full",
          "[[0|At first Douglass learns his letters from Mrs. Auld, but Mr. Auld stops the lessons.]] [[1|His angry words teach Douglass that knowledge is the thing that divides slaves from masters.]] [[2|After that, Douglass uses bread, wood in a shipyard, and a book of speeches to teach himself.]] [[3|The ideas build from a small kindness to a bigger understanding of power.]] [[4|Overall the passage shows that literacy is power, and that those in control tried to deny it.]]",
          "All five marks. Your third sentence compresses three examples without losing them.",
        ],
        [
          "partial",
          "[[0|Mrs. Auld taught Douglass his letters but Mr. Auld stopped her.]] [[1|Douglass understood from this that reading was the way to freedom.]] [[4|The passage is about the power of literacy.]] I think the Aulds were wrong.",
          "Three strong sentences. A summary leaves out your opinion, so cut the last sentence, and add how he kept learning.",
        ],
        [
          "partial",
          "[[2|Douglass traded bread to boys and read The Columbian Orator to learn.]] [[3|The story builds because he learns more and more.]] It is very inspiring.",
          "You summarize the middle well. Begin with how the situation started, and remove \"inspiring,\" which is your opinion.",
          true,
        ],
        [
          "weak",
          "Douglass was a slave who lived in Maryland. It was a very sad time. He learned to read.",
          "These are true but too general. A summary should say what happened in the passage and how the ideas build.",
        ],
        [
          "weak",
          "[[0|Mrs. Auld taught him the alphabet.]] Then he got a lot of bread and ate it with the boys. The end.",
          "The first sentence is accurate. Douglass gave the bread to the boys in exchange for lessons. Reread paragraph three and check each detail.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Linking ideas, purpose and point of view in argument, and writing a narrative",
  note: `
## Objectives

Students will be able to:

1. analyze how an author introduces, links and develops a series of ideas or events;
2. identify an author's purpose and point of view and explain the rhetoric used to advance it;
3. write a narrative with a clear point of view, pacing, sensory detail and a reflective ending.

## Materials

The reading "The Case for the Walk-In Tuesday," a three-color annotation key, and a narrative planning page.

## Starter (8 minutes)

Project this opening: "The last thing my grandfather ever taught me was how to fold a map." Ask: "What do you expect from this essay? What has the writer done in one line?"

## Main activity

1. Annotate the reading in three colors: yellow for each idea introduced, green for transitions and echoes that link ideas, and blue for rhetoric (anecdote, rhetorical question, appeal to fairness).
2. Discuss the author's purpose and point of view. What does the first-person "we" assume about the audience? How would the argument change if written in third person?
3. Narrative craft lesson: slow motion (pacing a moment), compressing time, and the reflective ending that ties a scene to a larger idea.
4. Students draft a narrative scene of 150 words about a time they learned something by accident, using one slowed moment and one compressed stretch of time.

## Checking for understanding

Pair-share the slowed moment. The partner names the sensory details and where the pace slows.

## Exit ticket

Write the reflective sentence that ends your narrative.
`,
  reading: [
    "The case for the walk-in Tuesday",
    `
Every Tuesday morning, my grandfather walked into the Whetstone library to read the newspaper. He was not looking for anything in particular. He sat in the same chair, tapped his glasses twice, and read until the clock hit ten. I used to think this was a waste of a perfectly good morning. Now I think it is how a person stays connected to the place where he lives.

I raise my grandfather because our school is considering a new rule that would end our open study hall and replace it with a strict, scheduled period. Supporters say it will raise grades. They are right that unstructured time can be wasted. But I want to argue that, for many of us, the open period is the most valuable class of the day, and that closing it would cost more than it gains.

Consider what study hall actually does. First, it gives students who work after school or care for siblings a place to finish homework that they cannot do at home. Second, it allows a student to meet with a teacher, one on one, without giving up another class. Third, and this is harder to measure, it teaches us to manage time. A student who is told every minute what to do cannot learn to decide.

The strongest objection to my position is that some students will goof off. That is true, and a school should take it seriously. Yet the answer to misuse is not to remove the room. It is to measure how it is used: require a sign-in, let teachers write passes, and reserve one corner for quiet work. A school can trust its students and still check on them.

My grandfather never had a class on Tuesdays, but he taught me what an open hour is for: to choose how to spend it, and to find out who you are when no one is telling you. I hope our principal will give us the same chance. The rule belongs on the table for discussion, not on the schedule by default.
`,
  ],
  cards: [
    ["Anecdote", "A short personal story used to introduce or illustrate a point."],
    ["Rhetorical question", "A question asked for effect, not for an answer."],
    ["Transition", "A word or phrase that links ideas, such as first, yet or consider."],
    ["Echo", "Repeating an earlier image or phrase to link the parts of a piece."],
    ["Concession", "Admitting that the other side has a fair point."],
    ["Audience", "The people the writer expects to read the piece."],
    ["Reflective ending", "A closing that considers what an experience or argument means."],
    ["Slow motion (pacing)", "Stretching a key moment with detail, so the reader feels it as important."],
  ],
  closed: [
    [
      "Why does the writer open with the grandfather in the library?",
      [
        "To prove that libraries are better than study halls",
        "To give a personal image of an open, unstructured hour that the argument then defends",
        "To describe the author's family tree",
        "To criticize newspapers",
      ],
      "B",
    ],
    [
      "The writer says, \"They are right that unstructured time can be wasted.\" What is this move called?",
      ["A rhetorical question", "A flashback", "A concession", "A thesis"],
      "C",
    ],
    [
      "Which transitions best link the writer's three reasons?",
      [
        "First, second, and third",
        "Meanwhile, meanwhile and meanwhile",
        "In conclusion, in conclusion and in conclusion",
        "Yet, however and nevertheless",
      ],
      "A",
    ],
    [
      "How does the closing return to the opening, and what is the effect?",
      [
        "It forgets the grandfather, which weakens the essay.",
        "It repeats the grandfather and the open hour, tying the personal story to the argument.",
        "It adds a new topic about newspapers.",
        "It attacks the principal.",
      ],
      "B",
    ],
    [
      "Which is the best description of the writer's purpose?",
      [
        "To entertain readers with a family story",
        "To describe the Whetstone library",
        "To persuade the principal and school community not to replace open study hall",
        "To explain how to read a newspaper",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Analyze how the writer links the opening anecdote to the argument and to the closing. Explain at least two techniques that connect the ideas, and say what the connection adds to the essay's purpose.",
      scheme: [
        "Identifies how the opening anecdote introduces the central idea of an open hour",
        "Identifies a technique that links the ideas, such as a transition or the echo in the conclusion",
        "Identifies a second technique, such as concession or enumerated reasons",
        "Explains how the connection serves the writer's purpose of persuading",
      ],
      model:
        "The anecdote introduces the central idea of an open, self-directed hour by showing the grandfather's Tuesday habit. The writer links this to the argument with the phrase 'I raise my grandfather because,' and returns to him in the final paragraph, so the essay's ends match. Transitions such as first, second and third, along with the concession that unstructured time can be wasted, guide the reader through reasons and an objection. The connection makes the argument personal and fair, which helps persuade.",
      answers: [
        [
          "full",
          "[[0|The grandfather scene introduces the idea of an open hour that you choose how to use, which is exactly what study hall is.]] [[1|The writer links it by saying she raises her grandfather because of the new rule, and then she returns to him in the last paragraph, so the essay is framed.]] [[2|She also concedes that unstructured time can be wasted, and uses first, second and third to organize reasons, so the reader can follow.]] [[3|Together these make the argument feel personal and fair, which helps persuade the principal.]]",
          "Full marks. Naming the frame and the concession gives two real techniques, and the last sentence ties them to purpose.",
        ],
        [
          "full",
          "[[0|The opening is a story that shows an open hour in a person's life, so the reader starts with a picture instead of a claim.]] [[1|It connects to the argument when she uses the grandfather as a reason for caring about open study hall, and to the end when she brings him back.]] [[2|In the middle she uses a rhetorical move of agreeing with the objection first, then answering it, and she lines up the reasons with transitions.]] [[3|That all makes it more convincing, because the reader feels the value of the open hour and also sees that the writer was fair about the other side.]]",
          "All four marks. You noticed that the story works before the argument is even stated.",
        ],
        [
          "partial",
          "[[0|The grandfather story shows what an open hour can be.]] [[1|She comes back to him at the end.]] That is how she links it.",
          "You have the introduction and the return. Add a second technique from the middle of the essay and say how the links help persuade.",
        ],
        [
          "partial",
          "[[2|She admits that students might goof off, and she uses first, second, third.]] [[3|This makes the essay seem fair.]]",
          "Good techniques and effect. Explain how the opening anecdote introduces the idea and how the closing connects back to it.",
          true,
        ],
        [
          "weak",
          "The grandfather story is not connected to the argument because they are about different things. The essay would be better without it.",
          "The grandfather's open hour is the heart of the argument. Look at what the writer says in the second paragraph and the last.",
        ],
        [
          "weak",
          "[[0|The grandfather story shows an open hour.]] The essay uses many words that are big, which makes it sound smart.",
          "The first sentence is right. Big words are not a linking technique. Look for transitions, repetition and the structure of the reasons.",
        ],
      ],
    },
    {
      prompt:
        "Write a narrative paragraph (six to eight sentences) in first person about a moment when you learned something unexpectedly. Slow down the key moment with sensory detail, compress other time, and end with a reflective sentence.",
      scheme: [
        "Uses a clear first-person point of view",
        "Includes at least two specific sensory details",
        "Controls pacing by slowing the key moment and compressing other time",
        "Ends with a reflection that says what the moment meant",
      ],
      model:
        "For three weeks I practiced the trumpet every night and got nowhere. Then one Thursday, in the empty band room, I held the final note of the song and felt the air in my chest turn into sound. The room smelled of valve oil and old carpet, and the note hung there, bright and steady, longer than I ever thought I could hold. Nobody was listening. I understood then that I had been trying to impress people instead of making the sound. Getting better, I realized, happens in the hours when no one is watching.",
      answers: [
        [
          "full",
          "[[0|I did not think I could swim the length of the pool until the day I tried at the Y with my cousin.]] The first lengths went by in a blur. [[1|On the last one, the chlorine burned my eyes and the water slapped the sides so loudly that it was all I could hear.]] [[2|I counted each stroke, slowly, until my fingers hit the cool tile.]] [[3|I learned that you can't finish the whole length at once, only the next stroke.]]",
          "Full marks. You compressed the early lengths into one sentence and slowed down the last, which is the pacing choice that makes it work.",
        ],
        [
          "full",
          "[[0|My aunt asked me to help in her kitchen on Sunday, and I figured I would just stir and be done.]] A couple of hours later she slid a hot pan toward me. [[1|The smell of garlic and browned butter came up in a cloud and the sizzle sounded like rain on a tin roof.]] [[2|She stood back and said \"your turn,\" and I stood there with the spoon in the air, my hand shaking, deciding how to flip it.]] [[3|I found out that cooking is mostly trusting yourself, and I had been waiting for permission.]]",
          "All four marks. The shaking hand with the spoon in the air makes the key moment vivid.",
        ],
        [
          "partial",
          "[[0|I learned a lot the day I started high school.]] [[1|The halls were loud and smelled like cleaning spray.]] It was a good day and I met people.",
          "You have a clear voice and a couple of good details. Slow down on one moment and end with a sentence about what it meant.",
        ],
        [
          "partial",
          "Last summer at Buckeye Lake my brother and I rented a kayak. [[2|We drifted for an hour, then the wind came up and I paddled and paddled with my arms burning while the shore stayed in the same place.]] [[3|I realized that going nowhere can still be progress if you do not stop.]]",
          "Your pacing and reflection work well. Add a few more sensory details and open with the first-person moment more clearly.",
          true,
        ],
        [
          "weak",
          "One day I learned something at school. It was about math. It was interesting. I will never forget it.",
          "These sentences tell but do not show. Pick one moment and describe what you saw or heard, then say what you understood.",
        ],
        [
          "weak",
          "[[0|I remember when I went to the store with my dad.]] We bought things and then we went home. I learned that shopping is fun.",
          "You have a point of view. The moment needs detail, and your ending should reflect on something deeper than \"fun.\"",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Writing an informative essay and an argument that answers the other side",
  note: `
## Objectives

Students will be able to:

1. write an informative essay that organizes ideas under a clear thesis with relevant facts and examples;
2. write an argument that states a precise claim, supports it with reasons and evidence, and addresses a counterclaim.

## Materials

A set of thesis cards (some strong, some weak), a model argument paragraph with a counterclaim, and a planning page.

## Starter (8 minutes)

Hand out thesis cards. In groups, sort them into "informative," "argument," and "not yet a thesis." Defend the sort aloud. Ask what makes a precise claim different from a general one.

## Main activity

1. Mini-lesson on precision: compare "Social media is bad" with "Social media companies should be required to turn off autoplay for users under 16 because it encourages hours of passive viewing."
2. Outline: thesis, reasons in order of strength, evidence for each, counterclaim and rebuttal.
3. Model a rebuttal move: concede, pivot, refute. Practice with three counterclaims.
4. Students write the body of an argument on a school issue, including the counterclaim paragraph, and swap for peer response with a checklist (claim precise? evidence specific? counterclaim fair?).

## Checking for understanding

On an index card, students underline the concession, circle the pivot word, and bracket the refutation in their own rebuttal.

## Exit ticket

Rewrite one weak thesis from the sorting activity so that it is precise.
`,
  reading: [
    "Precision, evidence and the strongest objection",
    `
A thesis is a promise to the reader, and a precise thesis keeps its promise. "Pollution is a problem" cannot be disproved because it commits to nothing. "Columbus should extend the CMH bus line to the east side before building a new highway interchange, because transit reaches more workers per dollar" commits to a position, a reason and a comparison. That is a claim a thoughtful person could challenge, and that is exactly the point.

An **informative** essay uses a thesis to organize an explanation. Imagine an essay on why the Scioto River floods. The thesis might say that flooding depends on three conditions: heavy rain, saturated soil and narrow channels. The body paragraphs then take the conditions in order, each with facts and examples. The strongest informative writing answers questions the reader would ask. How much rain is heavy? How does saturated soil change what happens to rainwater? An example, such as a year when the river crested above the normal bank, makes the explanation concrete.

An **argument** adds a decision: the writer wants the reader to believe or do something. A strong argument is built from reasons, and each reason is backed by evidence the reader can check. It also treats the other side seriously. The best objection to your claim is called a **counterclaim**, and a thoughtful writer states it as fairly as its supporters would, then **rebuts** it. The standard move has three parts: concede what is true, pivot with a word like "yet" or "however," and refute with evidence or reasoning.

For example, a writer who argues for later school start times might write: "Opponents note that a later bell would force the district to rework its bus schedule, which is true and would not be cheap. Yet at least a few districts that made the change spent less than expected and reported higher attendance, which suggests the cost can be managed." The concession shows fairness, the pivot signals a turn, and the refutation uses evidence. A writer who ignores the opposing view leaves a hole in the argument. A writer who answers it earns the reader's trust.

Finally, order matters. Many writers place their strongest reason last, or first and last, so that the essay ends on its best point. Whichever order you choose, transitions should make it plain why each piece comes where it does.
`,
  ],
  cards: [
    ["Precise claim", "A claim specific enough to be argued with evidence, naming what, who and why."],
    ["Informative thesis", "A thesis that names a subject and the main ideas the essay will explain."],
    ["Counterclaim", "The strongest opposing view to a writer's claim."],
    ["Concession", "Admitting what is true or fair in the opposing view."],
    ["Pivot", "A transition word such as yet or however that turns from concession to response."],
    ["Rebuttal (refutation)", "Evidence or reasoning that answers a counterclaim."],
    ["Reason", "A point that explains why a claim is true."],
    ["Evidence", "Facts, examples, statistics or quotations that support a reason."],
  ],
  closed: [
    [
      "Which claim is most precise?",
      [
        "Phones are distracting.",
        "Schools should change phone rules.",
        "Ohio high schools should require phones to be stored in lockers during class, because studies link nearby phones to lower attention.",
        "Technology is changing the world.",
      ],
      "C",
    ],
    [
      "Which sentence is the pivot in this rebuttal? \"A later bell would disrupt bus schedules. Yet several districts reorganized routes at modest cost.\"",
      [
        "A later bell would disrupt bus schedules.",
        "Yet several districts reorganized routes at modest cost.",
        "Both are pivots.",
        "Neither is a pivot.",
      ],
      "B",
    ],
    [
      "A writer concedes a fair point and then refutes it. What is the main benefit?",
      [
        "The writer seems fair and the argument is harder to dismiss.",
        "The essay becomes shorter.",
        "The reader forgets the claim.",
        "The writer no longer needs evidence.",
      ],
      "A",
    ],
    [
      "Which is the strongest piece of evidence for the claim \"Open study hall helps working students\"?",
      [
        "I think it is helpful.",
        "Everyone likes study hall.",
        "A survey of 120 students found that 40 percent had jobs and used study hall to finish homework.",
        "Study hall was invented in the nineteenth century.",
      ],
      "C",
    ],
    [
      "Which thesis would best organize an informative essay?",
      [
        "The Scioto River should be cleaned.",
        "I love rivers.",
        "Scioto River flooding depends on three conditions: heavy rain, saturated soil and narrow channels.",
        "Rivers are interesting.",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Rewrite this weak thesis so it is precise and arguable: \"Homework is bad.\" Then write a one-paragraph rebuttal of the strongest counterclaim to your new thesis, using concession, a pivot word and a refutation with a reason or evidence.",
      scheme: [
        "Rewrites the thesis so it is specific and arguable",
        "States a fair counterclaim and concedes what is true",
        "Uses a pivot word or phrase to turn",
        "Refutes the counterclaim with a reason or evidence",
      ],
      model:
        "Thesis: High schools should limit homework to 90 minutes a night because longer assignments reduce sleep and do little to raise scores. Some teachers argue that more homework builds discipline, which is true. Yet research on students in Ohio and elsewhere suggests that after about 90 minutes the gains flatten while sleep drops, so extra assignments cost more than they teach.",
      answers: [
        [
          "full",
          "[[0|High schools should cap nightly homework at 90 minutes because more than that cuts into sleep without improving grades.]] Some people say more homework builds discipline, [[1|and that is partly true, since practice does teach responsibility.]] [[2|However,]] [[3|after about an hour and a half, studies show scores stop going up while students sleep less, so the same discipline can be learned with fewer, better assignments.]]",
          "Full marks. Your thesis names who, what and why, and your rebuttal has all three moves in order.",
        ],
        [
          "full",
          "[[0|Columbus City Schools should stop assigning homework over weekends and breaks, because it takes away rest students need to learn.]] It is fair to worry that [[1|students will forget what they learned without weekend practice.]] [[2|Yet]] [[3|forgetting happens mostly when practice is rushed or stressful, and teachers can use short review quizzes on Monday to rebuild memory without costing the weekend.]]",
          "All four marks. Offering Monday quizzes as an alternative makes the rebuttal practical.",
        ],
        [
          "partial",
          "[[0|Teachers should give less homework so that students can sleep more and play sports.]] Some say it helps you learn. They are wrong.",
          "Your thesis is clearer. The rebuttal needs a concession, a pivot and a reason. \"They are wrong\" is not a refutation.",
        ],
        [
          "partial",
          "Homework is bad for kids. [[1|Some teachers think homework is important for learning, which is a fair point.]] [[2|But]] [[3|there is a lot of evidence that a short amount is just as good.]]",
          "Your rebuttal structure is good. Your thesis still needs to be precise: what should change, and why? Rewrite it first.",
          true,
        ],
        [
          "weak",
          "Homework is bad because nobody likes it. Teachers should not do it because it is boring.",
          "This repeats the weak thesis with a different word. Say how much homework, who should change it, and why that would be better.",
        ],
        [
          "weak",
          "[[0|Schools should have less homework because it is stressful.]] Nobody disagrees with this so I do not need a counterclaim.",
          "Your revised thesis is better. Someone always disagrees, and a strong argument names the best objection. What would a teacher say?",
        ],
      ],
    },
    {
      prompt:
        "Write an informative thesis for an essay explaining why Ohio gets so much lake-effect snow near Lake Erie, and outline three body paragraphs, each with a specific kind of evidence you would use.",
      scheme: [
        "Writes a clear informative thesis that names the main ideas",
        "Outlines a first body paragraph with a specific kind of evidence",
        "Outlines a second body paragraph with a different kind of evidence",
        "Outlines a third body paragraph with a different kind of evidence",
      ],
      model:
        "Thesis: Lake-effect snow falls heavily near Lake Erie because cold air crosses warmer water, picks up moisture, and is lifted as it moves onto land. Paragraph 1 explains the cold air mass, using temperature data from a winter storm. Paragraph 2 explains the warm lake, using the difference between lake and air temperatures as evidence. Paragraph 3 explains why the land lifts the clouds, with a snowfall map of a recent storm as evidence.",
      answers: [
        [
          "full",
          "[[0|Heavy lake-effect snow falls east and south of Lake Erie because cold winds pick up heat and moisture over the lake and drop it as snow when they hit land.]] [[1|Paragraph one: the cold air, using a temperature reading from the National Weather Service for a storm in November.]] [[2|Paragraph two: the lake itself, using lake surface temperatures compared with air temperatures to show the difference.]] [[3|Paragraph three: the land lifting the air, using a map of snowfall totals from a recent Ashtabula County storm.]]",
          "Full marks. Each paragraph has a different kind of evidence, so the essay would not repeat itself.",
        ],
        [
          "full",
          "[[0|Lake-effect snow happens in northeast Ohio because three things come together: freezing air, open water and rising ground.]] [[1|First body paragraph: freezing air, using a quote from a meteorologist about where the cold comes from.]] [[2|Second: open water, with data on how long Lake Erie stays unfrozen in early winter.]] [[3|Third: rising ground, with a description of how snow totals jump a few miles inland.]]",
          "All four marks. A quote, data and a description give you variety in evidence.",
        ],
        [
          "partial",
          "[[0|Lake-effect snow is caused by cold air passing over warm water and then moving onto land.]] [[1|The first paragraph is about cold air with a temperature chart.]] [[2|The second is about the lake and its temperature.]]",
          "Strong thesis and two paragraphs. Add a third paragraph with its own kind of evidence, and make the second type different from the first.",
        ],
        [
          "partial",
          "[[1|A paragraph about cold air, with data.]] [[2|A paragraph about warm water, with a quote.]] [[3|A paragraph about land, with a map.]]",
          "The three paragraphs and evidence are good. You still need a thesis that names these three ideas in one or two sentences.",
          true,
        ],
        [
          "weak",
          "Ohio has a lot of snow because it is cold. Paragraph one is about snow. Paragraph two is about winter. Paragraph three is about cold.",
          "These are the same idea three times. Name the separate causes and the different evidence you would use.",
        ],
        [
          "weak",
          "[[0|Lake Erie makes snow when cold air passes over it.]] I will find evidence by looking at the internet.",
          "Your thesis starts well. Name the specific evidence you would use for each paragraph, such as temperature data or a snowfall map.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Revision with feedback, and preparing for a Socratic seminar",
  note: `
## Objectives

Students will be able to:

1. plan, revise and edit writing after feedback, and say what each revision changed;
2. contribute to a seminar discussion by preparing in advance, building on others' points and keeping to agreed rules.

## Materials

A two-page draft with margin comments, a revision log template, seminar prep sheets, and an observer chart.

## Starter (8 minutes)

Display two versions of one paragraph, one with a vague topic sentence and one with a revised, specific one. Ask students to identify what changed and whether the revision improved the idea, the order, or only the wording.

## Main activity

1. Distinguish global revision (claim, evidence, organization) from local revision (sentence clarity) from editing (conventions). Students sort a list of fixes under these headings.
2. Using margin comments on a sample draft, students decide which comment to take, which to adapt, and which to decline, and write a one-line reason for each decision.
3. Seminar rules and prep: two passages with page numbers, one open question, and a written sentence that could build on or challenge a peer.
4. Fishbowl seminar on the question: "Is the narrator of 'The Tell-Tale Heart' more afraid of the old man or of himself?" Inner circle discusses; outer circle tracks evidence and how often speakers build on each other.

## Checking for understanding

Observers report one moment when a speaker built on a peer's point and one moment when evidence turned the conversation.

## Exit ticket

Write one revision decision you declined and why.
`,
  reading: [
    "What changed, and why: the discipline of revision",
    `
Beginners think of revision as a cleanup. Experienced writers think of it as a series of decisions, each of which they can defend. A defensible revision answers three questions: what did I change, why did I change it, and what is the effect on the reader?

Start with levels. **Global revision** changes the big things: whether the claim is clear, whether the evidence supports it, whether the paragraphs are in a sensible order. **Local revision** works on sentences and paragraphs: cutting repetition, replacing a vague verb, adding a transition. **Editing** corrects conventions such as spelling and punctuation. Working from the top down saves time, because it makes no sense to fix commas in a paragraph you might cut.

Feedback is the raw material. A comment like "unclear" could mean the sentence is confusing, the logic is missing a step, or the evidence does not match the claim. A mature reviser reads a comment as a symptom and diagnoses the cause. Sometimes the reviser decides not to follow a comment: perhaps the reader misunderstood, or perhaps a suggestion would change the meaning. That is allowed, as long as the writer can say why. A revision log makes these decisions visible: "Comment: add evidence. Change: added the quotation about the vulture eye. Reason: my claim about the narrator's projection needed a specific word. Effect: the claim now rests on the text."

The same discipline applies to speaking. A **Socratic seminar** is a discussion in which the participants, not the teacher, carry the conversation. Preparation matters: marking passages, writing an open question, and noting a sentence you might use to challenge or support someone. During the discussion, strong speakers do three things. They speak to the text, pointing the group to a line. They build, using phrases such as "I want to add to what Ana said" or "I see it differently because." And they make room, noticing who has not spoken and inviting them in. Notice that all three are forms of revision in real time. You listen, you adjust, and you change your mind when the evidence demands.

The test of a good seminar is not who spoke the most but whether the group understood the text better at the end than at the beginning.
`,
  ],
  cards: [
    ["Global revision", "Changes to the claim, evidence, organization or focus of a piece."],
    ["Local revision", "Changes to sentences and paragraphs for clarity, concision and style."],
    ["Editing", "Correcting spelling, punctuation, grammar and formatting."],
    ["Revision log", "A record of changes with the reason and effect of each."],
    ["Socratic seminar", "A student-led discussion that explores a text through open questions."],
    ["Open question", "A question with more than one defensible answer, which invites discussion."],
    ["Build", "To add to or extend a peer's point in discussion."],
    ["Fishbowl", "A discussion format with an inner circle of speakers and an outer circle of observers."],
  ],
  closed: [
    [
      "Which of these is a global revision?",
      [
        "Correcting \"definately\" to \"definitely\"",
        "Moving the strongest reason to the end and adding evidence to support it",
        "Adding a comma after an introductory phrase",
        "Changing \"said\" to \"declared\"",
      ],
      "B",
    ],
    [
      "A peer comments \"unclear\" beside a sentence. What is the best next step?",
      [
        "Delete the sentence immediately.",
        "Ignore it because comments are only opinions.",
        "Diagnose why it is unclear, such as missing logic or vague wording, and then revise.",
        "Rewrite the whole essay.",
      ],
      "C",
    ],
    [
      "A reviser may decide not to follow a comment when",
      [
        "the comment is hard to follow",
        "the change would alter the meaning the writer intends, and the writer can say why",
        "it takes too much time",
        "the reviewer is not a friend",
      ],
      "B",
    ],
    [
      "Which is the strongest open question for a seminar on \"Romeo and Juliet\"?",
      [
        "Who is Mercutio?",
        "Did Romeo and Juliet love each other?",
        "To what extent do Romeo's choices, not fate, bring about the ending?",
        "How many acts are in the play?",
      ],
      "C",
    ],
    [
      "In a seminar, which speaker is best building on a peer?",
      [
        "\"I wasn't listening, but I think it's about love.\"",
        "\"I want to add to what Ana said about the letter: on page 100 the Friar's delay shows how chance interferes.\"",
        "\"Skip that. Let's talk about my idea.\"",
        "\"That is wrong.\"",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Here is a draft sentence and a peer comment. Draft: \"The narrator is crazy because he kills the old man.\" Comment: \"Claim is too general. What in the text shows this? Be careful about 'crazy.'\" Revise the sentence, then write a log entry stating the change, the reason you made it, and its effect.",
      scheme: [
        "Revises the sentence to be more precise and text-based",
        "States what was changed",
        "Explains the reason for the change in terms of the comment",
        "Describes the effect on the reader or the claim",
      ],
      model:
        "Revision: The narrator is unreliable because he insists on his calm and sanity while killing a man he admits never wronged him. Log: I replaced crazy with unreliable and added the detail about the man never wronging him. The peer pointed out that crazy was too general and not text-based. Now the claim is specific and rests on evidence from the story.",
      answers: [
        [
          "full",
          "[[0|The narrator is unreliable, since he claims perfect calm but kills an old man who, by his own admission, never wronged him.]] Log: [[1|I changed crazy to unreliable and added the detail that the old man never wronged him.]] [[2|The comment said crazy was too general and that I needed text evidence.]] [[3|Now the claim is about what the text shows and it is easier to prove.]]",
          "Full marks. The new word fits what the story actually shows, and the log connects comment, change and effect.",
        ],
        [
          "full",
          "[[0|By insisting that his careful plan proves he is sane, the narrator reveals that he cannot see himself accurately.]] Revision log: [[1|I removed the word crazy and wrote about the contradiction between his claim and his act.]] [[2|My peer said to be careful with the word and to use text.]] [[3|The new sentence argues something instead of labeling him, and a reader can check it against the story.]]",
          "All four marks. Moving from a label to an observation about the text is a real improvement.",
        ],
        [
          "partial",
          "[[0|The narrator kills the old man even though the old man never did anything to him.]] Log: I changed it because the comment said so.",
          "The revised sentence is stronger. The log must say what you changed and what difference it makes, not just that someone asked.",
        ],
        [
          "partial",
          "The narrator is a really bad guy. Log: [[1|I added some words about him.]] [[2|My peer said claim was too general.]] [[3|It sounds better now.]]",
          "Your log tells me the reason but the sentence is still general. Use evidence from the text and avoid labels like \"bad guy.\"",
          true,
        ],
        [
          "weak",
          "The narrator is crazy and he kills the old man. Log: I fixed the spelling and punctuation.",
          "The comment asked for a global fix, not an edit. The claim needs a precise word and evidence.",
        ],
        [
          "weak",
          "[[1|I changed the sentence.]] The narrator is crazy because he is the narrator. Log done.",
          "You say you changed it, but the sentence is the same. Look at the comment again and add text evidence.",
        ],
      ],
    },
    {
      prompt:
        "Prepare for a Socratic seminar on \"Ulysses\" by Tennyson. Write an open question, identify one passage you would point the group to and explain why, and write a sentence you could use to challenge a peer respectfully.",
      scheme: [
        "Writes an open, text-based question with more than one defensible answer",
        "Identifies a specific passage or line",
        "Explains why the passage matters for the question",
        "Writes a respectful sentence that challenges a peer with evidence",
      ],
      model:
        "Question: Is Ulysses a hero in the poem, or is he abandoning his duties? Passage: the lines where he hands the kingdom to Telemachus and says he must keep seeking, because they show both his trust in his son and his restlessness. Challenge: I see why you say he is courageous, but I think leaving Penelope and his people for adventure suggests selfishness, especially in how he describes his kingdom as dull.",
      answers: [
        [
          "full",
          "[[0|My question is whether Tennyson wants us to admire Ulysses or to question him.]] [[1|I would point the group to the part where he says he cannot rest from travel.]] [[2|It matters because it can sound brave or like he is ignoring everyone at home, so people can disagree about what the poem wants.]] [[3|I'd say, I understand why Jordan reads him as heroic, but I wonder if the line about the dull kingdom suggests he does not value what he has.]]",
          "Full marks. Your question can be argued both ways, and your challenge uses the text and keeps a respectful tone.",
        ],
        [
          "full",
          "[[0|To what extent does the poem treat old age as a loss, and to what extent as a chance?]] [[1|I would highlight the line about striving, seeking, finding and not yielding.]] [[2|It's about being old and still pushing, which can be read as hopeful or desperate.]] [[3|I would challenge a peer by saying, I see it as hopeful, but the line before it talks about being weakened, and I wonder if that changes it.]]",
          "All four marks. Your question is open, and the passage you chose really does support two readings.",
        ],
        [
          "partial",
          "[[0|Is Ulysses a good leader?]] [[1|I would use the part about Telemachus.]] I would just say I disagree.",
          "Your question and passage are good. Explain why the passage matters, and write a challenge that uses evidence and sounds respectful.",
        ],
        [
          "partial",
          "[[2|The passage matters because it shows his restlessness.]] [[3|I would say, I hear you, but the text says he finds home dull.]]",
          "Strong reasoning and a respectful challenge. You need a question for the group and should name the passage or line.",
          true,
        ],
        [
          "weak",
          "Do you like the poem? I would use any line. I'd tell people they are wrong if they do not like it.",
          "A seminar question must be open and about the text, and a challenge should be respectful and use evidence. Choose a line and rewrite your question.",
        ],
        [
          "weak",
          "[[0|What is Ulysses doing in the poem?]] I do not need a passage because I read it.",
          "Your question is a start but it is too broad to discuss. Seminars rely on specific passages. Choose one and say why it matters.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Appositives, absolute phrases and clauses; Latin and Greek roots",
  note: `
## Objectives

Students will be able to:

1. use phrases and clauses to add variety and precision to sentences;
2. work out the meaning of unfamiliar words from context, word parts and reference tools.

## Materials

Sentence-combining cards, a root chart (Latin and Greek), dictionaries or devices, and the worksheet.

## Starter (8 minutes)

Write four short sentences on the board: "Mr. Ruiz teaches chemistry. He coaches soccer. He grew up in Dayton. He wears bow ties." Ask students to combine them into one elegant sentence in two minutes. Share three versions and compare the techniques each used.

## Main activity

1. Teach three structures: the appositive ("Mr. Ruiz, a chemistry teacher and soccer coach, ..."), the participial phrase ("Wearing a bow tie, ..."), and the absolute phrase ("His bow tie crooked, ...").
2. Sentence-combining stations. Students combine sets of four short sentences in two different ways and justify which is clearer.
3. Vocabulary: roots. Teach spect (look), port (carry), scrib or script (write), bene (good), mal (bad), and the Greek chron (time) and graph (write). Students decode six unfamiliar words, then check each in a dictionary.
4. Short quiz on identifying clause and phrase types.

## Checking for understanding

Hold up a card: independent clause, dependent clause, appositive or absolute phrase for each sentence flashed on the board.

## Exit ticket

Combine two sentences using an appositive, and decode one word using its root.
`,
  reading: [
    "Packing meaning into a sentence",
    `
A skilled writer can say more in fewer words by choosing the right structure. Three structures let you pack extra information into a sentence without making it a string of short ones.

An **appositive** is a noun or noun phrase placed next to another noun to rename or explain it. "My neighbor, a retired bus driver, plants tomatoes along the fence." The phrase "a retired bus driver" renames the neighbor. Most appositives are set off by commas. A **participial phrase** begins with a verb form ending in -ing or -ed and describes a noun: "Tired from practice, the team boarded the bus." The phrase modifies "team," so it must sit next to the word it describes. Placing it elsewhere produces a dangling modifier: "Tired from practice, the bus was quiet" says the bus was tired. An **absolute phrase** is a noun plus a participle that adds a detail about the whole sentence: "Her arms full of books, Priya pushed the door open with her hip."

These phrases join with **clauses**. An independent clause stands alone. A dependent clause, which begins with a word such as although, because, when or which, cannot. A relative clause such as "which she had borrowed from the library" describes a noun. When a dependent clause comes before the independent clause, a comma follows it; when it comes after, usually no comma is needed. A semicolon can join two closely related independent clauses: "The rain stopped; the game resumed."

The same awareness helps with vocabulary. Most of the advanced words you will meet in high school and on the ACT are built from Latin and Greek roots. The root **spect** means look: inspect, spectator, retrospect. **Port** means carry: transport, portable, export. **Scrib** or **script** means write: describe, manuscript, prescription. **Bene** means good and **mal** means bad, so a benefactor does good, and a malfunction is a bad function. **Chron** means time: chronological, synchronize. When you meet a new word, try to see a root, a prefix and a suffix, test the guess against the sentence, and confirm in a dictionary. For example, "ubiquitous" comes from the Latin for everywhere, which fits a sentence like "Smartphones have become ubiquitous in American high schools."
`,
  ],
  cards: [
    ["Appositive", "A noun or noun phrase that renames the noun beside it."],
    ["Participial phrase", "A phrase beginning with a participle that modifies a noun."],
    ["Absolute phrase", "A noun plus a participle phrase that adds detail about the whole sentence."],
    ["Dangling modifier", "A phrase that does not clearly attach to the noun it is meant to describe."],
    ["Relative clause", "A dependent clause beginning with who, which or that that describes a noun."],
    ["Root spect", "Latin for look: inspect, spectator."],
    ["Root port", "Latin for carry: transport, portable."],
    ["Root chron", "Greek for time: chronological, synchronize."],
  ],
  closed: [
    [
      "Which sentence contains an appositive?",
      [
        "Because it rained, the game was canceled.",
        "Ms. Patel, our debate coach, announced the schedule.",
        "Running to the bus, Eli dropped his phone.",
        "The team won and celebrated.",
      ],
      "B",
    ],
    [
      "Which sentence has a dangling modifier?",
      [
        "Walking to school, Dana noticed the frost.",
        "Tired after the long drive, we stopped for lunch.",
        "Walking to school, the frost was bright and sharp.",
        "Worried about the test, Marcus studied all night.",
      ],
      "C",
    ],
    [
      "Which is an absolute phrase in this sentence? \"Her backpack slung over one shoulder, Mia sprinted for the bus.\"",
      [
        "sprinted for the bus",
        "Mia",
        "Her backpack slung over one shoulder",
        "for the bus",
      ],
      "C",
    ],
    [
      "The root \"scrib/script\" means write. What does \"manuscript\" most likely mean?",
      ["A handwritten text", "A loud noise", "A kind of machine", "A person who carries things"],
      "A",
    ],
    [
      "\"Online learning has become ubiquitous; nearly every student has used it.\" Using the context, what does \"ubiquitous\" mean?",
      ["rare", "expensive", "found everywhere", "dangerous"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Combine these four sentences into one well-formed sentence using at least one appositive and one participial phrase: \"Jada is a point guard. She practiced every morning. She was determined to make varsity. She stayed after school to shoot free throws.\" Name the two structures you used and check for dangling modifiers.",
      scheme: [
        "Combines the sentences into one grammatical sentence",
        "Uses an appositive correctly with commas",
        "Uses a participial phrase attached to the right noun",
        "Names the structures and confirms there is no dangling modifier",
      ],
      model:
        "Jada, a point guard determined to make varsity, practiced every morning, staying after school to shoot free throws. The appositive is a point guard determined to make varsity, and the participial phrase is staying after school to shoot free throws. Both attach to Jada, so there is no dangling modifier.",
      answers: [
        [
          "full",
          "[[0|Determined to make varsity, Jada, a point guard, practiced every morning and stayed after school to shoot free throws.]] [[1|The appositive is a point guard.]] [[2|The participial phrase is determined to make varsity.]] [[3|Both describe Jada, who comes right after, so nothing is dangling.]]",
          "Full marks. Placing the participial phrase before Jada makes it clear what it describes.",
        ],
        [
          "full",
          "[[0|Jada, a point guard, practiced every morning, staying after school to shoot free throws because she was determined to make varsity.]] [[1|I used the appositive a point guard right after her name.]] [[2|The participial phrase is staying after school to shoot free throws.]] [[3|It describes Jada, the subject, so it is not dangling.]]",
          "All four marks. The because clause also keeps the motive in the sentence.",
        ],
        [
          "partial",
          "[[0|Jada, a point guard, practiced every morning and stayed after school to shoot free throws, and she was determined to make varsity.]] [[1|The appositive is a point guard.]]",
          "Your sentence is correct. You did not use a participial phrase here, so reshape the final part and name the structure.",
        ],
        [
          "partial",
          "Determined to make varsity, the free throws were practiced by Jada every morning. [[2|The participial phrase is determined to make varsity.]]",
          "You used a participial phrase, but it dangles: the phrase describes the free throws, not Jada. Put Jada right after the comma and add an appositive.",
          true,
        ],
        [
          "weak",
          "Jada is a point guard, she practiced every morning she was determined to make varsity she stayed after school to shoot free throws.",
          "Those are four sentences stitched together with commas. Use an appositive for the first fact and a participial phrase for another.",
        ],
        [
          "weak",
          "[[0|Jada practiced every morning and she stayed after school.]] An appositive is when you describe an action.",
          "Your sentence is correct but leaves out facts. An appositive renames a noun, like \"a point guard.\" Add one and a participial phrase.",
        ],
      ],
    },
    {
      prompt:
        "Explain what the word \"retrospective\" most likely means in this sentence, using context and word parts, and name the roots you used: \"The museum's retrospective of the painter's career let visitors look back over fifty years of work.\" Then use \"retrospective\" in a sentence of your own.",
      scheme: [
        "Gives an accurate meaning, such as a look back at past work or events",
        "Uses context from the sentence",
        "Identifies the prefix retro- (back) and root spect (look)",
        "Uses the word correctly in a new sentence",
      ],
      model:
        "Retrospective means a look back at past work or events. The context says visitors could look back over fifty years of work. Retro- means back and spect means look, so the word means looking back. My sentence: In a retrospective of the season, the coach admitted that the team had changed its defense too late.",
      answers: [
        [
          "full",
          "[[0|It means a showing that looks back on past work, like an exhibit of an artist's whole career.]] [[1|The sentence says visitors could look back over fifty years, which gives the meaning away.]] [[2|Retro means back and spect means look, like in spectator.]] [[3|After the playoffs, our coach gave a retrospective on the season, talking about what we learned.]]",
          "Full marks. Your own sentence shows that you understand how the word is used.",
        ],
        [
          "full",
          "[[0|Retrospective means looking back at what has happened.]] [[1|The clue is look back over fifty years of work.]] [[2|The prefix retro- means backward and the root spect means to look or see.]] [[3|In a retrospective essay, she wrote about the decisions she would make differently.]]",
          "All four marks. Matching the context to the parts is the strongest way to confirm a guess.",
        ],
        [
          "partial",
          "[[0|It means looking at past things.]] [[2|Retro is back and spect is look.]] I will write about it later.",
          "Meaning and word parts are right. Add the context clue and a sentence of your own.",
        ],
        [
          "partial",
          "[[1|The sentence says look back over fifty years.]] [[3|My retrospective of last year shows I should have studied more.]]",
          "Good use of context and a correct sentence. Add the meaning and the roots that explain it.",
          true,
        ],
        [
          "weak",
          "Retrospective means someone who is picky about art. The museum sentence is about a picky person.",
          "Nothing in the sentence suggests that. Reread the clue \"look back over fifty years\" and think about what retro- means.",
        ],
        [
          "weak",
          "[[2|Spect means look.]] Retrospective means looking forward to the future.",
          "You recognized spect. The prefix retro- means back, so the word looks to the past, not the future.",
        ],
      ],
    },
  ],
};

writeCourse("honors-english-9-grade-9.json", "Honors English 9", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
