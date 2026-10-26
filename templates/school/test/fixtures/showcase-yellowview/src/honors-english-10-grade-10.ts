import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors English 10, Grade 10, Quarter 1. Standards: Common Core State
 * Standards, English Language Arts, Grade 10 (RL, RI, W, SL, L), in the
 * school's own words. Anchor texts: Macbeth (Shakespeare), Lincoln's Second
 * Inaugural Address, Frederick Douglass's speech of July 5, 1852, and the
 * Declaration of Independence. All public domain.
 */

const w1: WeekInput = {
  topic: "Evidence, ambiguity and theme in Macbeth, Acts 1 and 2",
  note: `
## Objectives

Students will be able to:

1. cite the strongest textual evidence for an interpretation of a longer literary work, and mark where the text is ambiguous;
2. follow a theme across a play and explain how it is developed through characters and events;
3. analyze how complex characters relate to one another and to the larger conflict.

## Materials

Copies of Macbeth (Acts 1 and 2 read), an evidence-and-ambiguity chart, and a relationship map for Macbeth, Lady Macbeth, Banquo and Duncan.

## Starter (8 minutes)

Pose a question with no neat answer: "If a stranger told you that you would be president, and then it started to come true, would you wait or would you help it along?" Collect answers, then ask what the question has to do with the witches.

## Main activity

1. Read Act 1 Scene 3 aloud. Students mark each word that suggests the witches control events and each word that suggests they only predict. Discuss which reading the text supports.
2. Build the relationship map. Label the line between Macbeth and Lady Macbeth with verbs from the text: she urges, he hesitates, she shames, he commits. Mark the shift in power.
3. Ambiguity workshop. In Act 1 Scene 7 Macbeth gives reasons not to kill Duncan. Is his hesitation moral or only fear of consequences? Students find two lines and argue both.
4. Choose a theme (ambition, fate and free will, appearance and reality) and collect one moment from each of Acts 1 and 2.

## Checking for understanding

Students write a thesis on whether the witches cause Macbeth's choices, ranking two quotations as strongest and weakest evidence.

## Exit ticket

State one place where the text refuses to settle a question, and the two readings it allows.
`,
  reading: [
    "A man, a prophecy and a text that will not settle",
    `
Macbeth begins with a promise and a question. Three witches tell the victorious general Macbeth that he will be Thane of Cawdor and then king. Almost at once, the first prophecy comes true. The play asks whether the witches know the future, cause it, or simply say what Macbeth already wants to hear. The text does not answer. A careful reader treats this refusal as part of the design and builds an argument that admits it.

Consider how evidence works in a play of this kind. When Macbeth reacts to the prophecy, he says that its truth either is good or ill, and he is horrified by the "horrid image" that rises in his mind. The image is of murder, and it arrives before anyone has suggested it. A strong reading might use this as evidence that the idea is Macbeth's own. Another reading can answer that the witches planted it. Both readings use the same lines, so the stronger argument is the one that deals with the counter-reading and explains why its own evidence is more persuasive. Notice, for instance, that Banquo hears the same prophecy about his descendants and does not turn to violence.

The relationship between Macbeth and Lady Macbeth shows how characters shape each other. In Act 1 she is the one who reads the letter, imagines the crime and calls on spirits to take away her femininity and fill her with cruelty. Macbeth hesitates. In the soliloquy of Act 1 Scene 7 he lists reasons not to act: Duncan is his kinsman, his king and his guest. The only thing that pushes him on, he admits, is "vaulting ambition." Lady Macbeth's attack on his courage, "Art thou afeard," turns his moral objection into a question of manhood, and he agrees. Their partnership will later reverse, as he acts without consulting her and she begins to break.

A theme grows in the details. The line "Fair is foul, and foul is fair," spoken by the witches in the first scene, announces the theme of appearance and reality. It returns when Lady Macbeth tells her husband to "look like the innocent flower, but be the serpent under it," and it returns again in the images of darkness that cover each murder. By the end of Act 2, the audience has seen how each character hides his or her intentions, which makes the later unraveling more powerful.
`,
  ],
  cards: [
    ["Ambiguity", "A feature of a text that supports more than one reasonable interpretation."],
    ["Prophecy", "A prediction of future events, often by a supernatural figure."],
    ["Soliloquy", "A speech by a character alone on stage that reveals their thoughts."],
    ["Free will", "The ability to choose one's actions, as opposed to being determined by fate."],
    ["Counter-reading", "An alternative interpretation that a strong argument acknowledges and answers."],
    ["Foil", "A character whose contrast with another highlights qualities, such as Banquo and Macbeth."],
    ["Theme", "A central idea about life or people that a work develops."],
    ["Thane", "A Scottish noble title in the play."],
  ],
  closed: [
    [
      "Which statement best explains why the witches' role is ambiguous?",
      [
        "The play proves they control Macbeth.",
        "The play shows they have no power at all.",
        "The text supports readings in which they cause, predict or simply voice what Macbeth already wants.",
        "They disappear after Act 1.",
      ],
      "C",
    ],
    [
      "Banquo hears a prophecy too but does not murder anyone. How does this affect a reading of Macbeth's choice?",
      [
        "It proves the witches are harmless.",
        "It suggests that the prophecy alone does not force a murder, which supports the view that Macbeth chooses.",
        "It proves Banquo is a witch.",
        "It shows Macbeth did not hear the prophecy.",
      ],
      "B",
    ],
    [
      "In Act 1 Scene 7 Macbeth lists reasons not to kill Duncan and admits only \"vaulting ambition\" pushes him. This is best read as",
      [
        "a lack of any conscience",
        "evidence that he understands the moral cost and chooses anyway",
        "a plan to blame Lady Macbeth",
        "a joke",
      ],
      "B",
    ],
    [
      "\"Fair is foul, and foul is fair\" introduces which theme?",
      [
        "Friendship",
        "Appearance versus reality",
        "The weather",
        "Education",
      ],
      "B",
    ],
    [
      "A strong argument about an ambiguous text should",
      [
        "ignore the evidence for other readings",
        "acknowledge a counter-reading and explain why its own evidence is stronger",
        "avoid using quotations",
        "state that the text has no answer and stop",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Argue whether the witches cause Macbeth's choices or only reveal them. State a claim, support it with two pieces of evidence from Acts 1 and 2, acknowledge the strongest counter-reading, and explain why your reading is more convincing.",
      scheme: [
        "States a clear, arguable claim about the witches' role",
        "Supports it with a first specific piece of evidence",
        "Supports it with a second specific piece of evidence",
        "Acknowledges a counter-reading",
        "Explains why the claim is more convincing than the counter-reading",
      ],
      model:
        "The witches reveal what is already in Macbeth rather than cause it. When he hears the prophecy he is struck by a 'horrid image' of murder before anyone has urged him, which suggests the idea was already in him. In the soliloquy in Act 1 Scene 7 he names ambition as his only motive, not any command. A counter-reading holds that the witches planted the idea. But Banquo hears a prophecy too and does not act, so the prophecy alone does not explain murder. That makes Macbeth's choice the stronger cause.",
      answers: [
        [
          "full",
          "[[0|The witches don't cause Macbeth's choices, they just show what is already in him.]] [[1|When he first hears the prophecy he gets a horrid image of murder in his head before anyone has told him to do anything.]] [[2|Then in Act 1 Scene 7 he says the only thing pushing him is his own ambition, not the witches.]] [[3|Someone could argue that the witches planted the idea.]] [[4|But Banquo hears a prophecy too and does not kill anyone, so a prophecy alone can't make a person do murder, which makes Macbeth's choice the real cause.]]",
          "Full marks. Using Banquo as a control case is the strongest move in the paragraph.",
        ],
        [
          "full",
          "[[0|I think the witches are only a trigger and the real cause is Macbeth's ambition and Lady Macbeth's pressure.]] [[1|His reaction to the prophecy is fear at his own thought of murder, which means it was already in his mind.]] [[2|Lady Macbeth calls on spirits and questions his manhood when he hesitates, so the push to act comes from people, not from the witches.]] [[3|The counter-reading is that the witches knew what to say to tempt him and so they are responsible.]] [[4|But the witches never tell him to kill, and Macbeth chooses the method, so I find the argument that the responsibility is his more convincing.]]",
          "All five marks. Noting that the witches never tell him to kill is exact use of the text.",
        ],
        [
          "partial",
          "[[0|The witches influence Macbeth but he still chooses.]] [[1|He has a horrid image in his head after the prophecy.]] [[3|Some people say the witches control him.]]",
          "Good claim, evidence and counter-reading. Add a second piece of evidence and explain why your reading is more convincing.",
        ],
        [
          "partial",
          "[[2|In Act 1 Scene 7 he says his ambition is what pushes him.]] [[4|Banquo also gets a prophecy but he does not murder, so Macbeth must be choosing.]]",
          "Strong reasoning. Open with a claim, and acknowledge the counter-reading so the argument is complete.",
          true,
        ],
        [
          "weak",
          "The witches are evil and control everyone. They make Macbeth kill Duncan because they have magic.",
          "The play does not show the witches doing the killing or ordering it. Reread what Macbeth says about his own reasons.",
        ],
        [
          "weak",
          "[[0|The witches reveal what is inside him.]] I know this because the witches are in the first scene and because it is Shakespeare.",
          "Your claim is arguable. The reason you give is not evidence. Find lines from Act 1 that support it.",
        ],
      ],
    },
    {
      prompt:
        "Analyze the relationship between Macbeth and Lady Macbeth in Acts 1 and 2. Identify how it shifts, support your reading with specific moments, and explain what the relationship shows about the play's central conflict.",
      scheme: [
        "Describes Lady Macbeth's initial influence over Macbeth, with a moment",
        "Describes Macbeth's hesitation or moral objection, with a moment",
        "Identifies a shift in the balance of power or dependence",
        "Connects the relationship to the larger conflict between ambition and conscience",
      ],
      model:
        "In Act 1, Lady Macbeth drives the plan. She calls on spirits to unsex her and challenges Macbeth's courage when he hesitates. Macbeth, in his Act 1 Scene 7 soliloquy, lists moral reasons not to kill Duncan. After the murder, he is horrified by his bloody hands while she tells him a little water will clear them, but by Act 3 he acts without telling her. The relationship shows the conflict between ambition and conscience being fought inside a marriage.",
      answers: [
        [
          "full",
          "[[0|In Act 1 Lady Macbeth is the one in charge, since she calls on spirits to take away her softness and questions Macbeth's manhood when he wavers.]] [[1|Macbeth shows his conscience in the soliloquy where he says Duncan is his kinsman, his king and his guest.]] [[2|After the murder the balance shifts, because he is shaken by the blood on his hands and she is the practical one, saying a little water will clean it, but later he starts to act on his own.]] [[3|The marriage shows the conflict between ambition and conscience, because each of them argues the sides in the other's head.]]",
          "Full marks. Your final sentence names how the relationship embodies the conflict.",
        ],
        [
          "full",
          "[[0|Lady Macbeth pushes Macbeth to act, reading the letter and then telling him to look like the innocent flower but be the serpent under it.]] [[1|Macbeth hesitates and says he has no reason except vaulting ambition.]] [[2|Their roles flip in Act 2 where she stays calm and he is the one who sees blood and hears a voice that says he has murdered sleep.]] [[3|This shows that ambition without conscience can't hold, and that guilt reaches the one who acts first.]]",
          "All four marks. The reversal you identified matters later in the play.",
        ],
        [
          "partial",
          "[[0|Lady Macbeth tells Macbeth to kill the king.]] [[1|Macbeth does not want to at first.]] They are married.",
          "Accurate start. Say how their balance changes and what it shows about the larger conflict.",
        ],
        [
          "partial",
          "[[2|After the murder Macbeth is scared and Lady Macbeth is the calm one, and later it flips again.]] [[3|It shows the fight between ambition and conscience.]]",
          "Strong on the shift and the conflict. Add specific moments from Act 1, such as her call to the spirits and his soliloquy.",
          true,
        ],
        [
          "weak",
          "Lady Macbeth is a witch and she controls Macbeth with magic spells. That is the central conflict.",
          "Lady Macbeth is human, and she persuades Macbeth with argument and challenge. Find the lines where she does this.",
        ],
        [
          "weak",
          "[[0|Lady Macbeth makes the plan.]] Macbeth just goes along and he never has any thoughts of his own.",
          "Macbeth does have thoughts, as his soliloquy shows. Reread Act 1 Scene 7 for his reasons.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Blood, darkness and sleep: motifs and structure in Macbeth",
  note: `
## Objectives

Students will be able to:

1. analyze the effect of repeated words, images and symbols on meaning and mood;
2. explain how the structure of a play, including its acts and turning points, shapes its effect.

## Materials

Copies of Macbeth, a motif tracker with columns for blood, darkness, sleep and clothing, and a five-act structure diagram.

## Starter (8 minutes)

Display three phrases from different acts: "Stars, hide your fires," "Will all great Neptune's ocean wash this blood," and "Out, damned spot." Ask: "What do these share, and what changes between them?"

## Main activity

1. Motif tracking in groups. Each group traces one motif through Acts 1 to 5 and records the line, the speaker and the meaning. Groups present on how the motif's meaning changes.
2. Structure workshop. Mark the five-act arc: Act 1 temptation, Act 2 the crime, Act 3 the turning point (Banquo's murder and the banquet), Act 4 the tyrant's isolation, and Act 5 the fall. Discuss the way Act 3 Scene 4 forces the audience to see Macbeth's guilt.
3. Close reading of "Tomorrow, and tomorrow, and tomorrow" (Act 5 Scene 5). Students annotate the repetition and metaphors and connect to the sleep and blood motifs.
4. Write: How does the motif of sleep trace Macbeth's fall?

## Checking for understanding

A quiz on speakers and meanings of five quoted lines.

## Exit ticket

Choose one motif and name the act where its meaning shifts most.
`,
  reading: [
    "Motifs, and the shape of a downfall",
    `
Shakespeare's tragedies work on two levels at once: the plot, which moves from event to event, and the imagery, which builds a second story out of repeated words. In Macbeth the imagery is so dense that the play seems to be steeped in it. A reader who traces the repeated images sees the meaning the plot only hints at.

Take blood. It first appears as a sign of glory: a wounded captain describes Macbeth's bravery in battle as he "unseamed" an enemy. Blood is a mark of courage. After the murder of Duncan, however, the same substance means guilt. Macbeth asks if all the ocean could wash it from his hand and fears that his hand will instead turn the seas red. Lady Macbeth, calmer, says a little water will clear them of the deed. In Act 5 she walks in her sleep, rubbing her hands and crying out against a spot only she can see. The motif has moved from honor to horror, and from an outside stain to a mark that will not leave her mind.

Darkness works differently. Characters call for night to hide their actions: Macbeth asks the stars to hide their fires, and Lady Macbeth calls for thick night. The play grows darker as the crimes grow, and the language of light, of candles and torches, is used for those who struggle against evil. Sleep ties the two together. After murdering the sleeping Duncan, Macbeth hears a voice that says he has "murdered sleep." The line is the turning of a conscience. By the end, Lady Macbeth cannot sleep peacefully, and Macbeth lives with endless unrest.

The structure of the play magnifies these motifs. Act 1 introduces the temptation. Act 2 stages the crime. Act 3 is the turning point: Macbeth, now king, arranges the murder of Banquo, and at the banquet he sees Banquo's ghost. The scene shows the audience that his guilt is stronger than his power. Acts 4 and 5 follow the tyrant as he isolates himself and the country rises against him. In Act 5, when he hears of his wife's death, he gives the "Tomorrow" speech, a meditation on how a life can seem an empty story. The speech draws on the play's patterns of time, light and sleep, and shows a man who has lost the means to feel. The structure takes us from a man who seemed brave to one who sees nothing worth the cost.
`,
  ],
  cards: [
    ["Motif", "An image, word or idea that recurs and builds meaning across a work."],
    ["Imagery", "Language that appeals to the senses to create pictures in the reader's mind."],
    ["Turning point", "The moment when the direction of the plot changes decisively."],
    ["Tragic hero", "A central character of high standing whose flaw leads to his downfall."],
    ["Hamartia", "The flaw or error that leads to a tragic hero's downfall."],
    ["Metaphor", "A comparison made by saying one thing is another."],
    ["Soliloquy", "A speech in which a character speaks aloud thoughts while alone on stage."],
    ["Pathetic fallacy", "Giving human feelings to nature or weather, as when storms mirror disorder."],
  ],
  closed: [
    [
      "How does the meaning of blood change in the play?",
      [
        "It always means birth.",
        "It begins as a sign of battlefield courage and becomes a symbol of guilt.",
        "It begins as guilt and becomes courage.",
        "It never changes.",
      ],
      "B",
    ],
    [
      "When Macbeth says he has \"murdered sleep,\" the line most clearly shows",
      [
        "that he is now well rested",
        "his guilt and the loss of peace the crime brings",
        "that Duncan woke up",
        "that he enjoys the night",
      ],
      "B",
    ],
    [
      "Most critics identify Act 3 as the turning point because",
      [
        "Macbeth gives up the crown",
        "Macbeth, now king, orders Banquo's murder and sees the ghost, showing that guilt is mastering him",
        "the witches disappear",
        "Duncan returns",
      ],
      "B",
    ],
    [
      "The \"Tomorrow\" speech draws on the play's motifs of time and light. What does it express?",
      [
        "Hope for the future",
        "Weariness and the sense that life signifies nothing",
        "Joy at the victory",
        "A plan for the battle",
      ],
      "B",
    ],
    [
      "A motif is stronger evidence for a thesis than a single image because",
      [
        "it is longer",
        "it shows a pattern and a change across the work",
        "it is easier to find",
        "it uses fewer words",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose one motif in Macbeth (blood, darkness, sleep). Trace how its meaning changes from an early to a late moment, and explain what the change shows about Macbeth or Lady Macbeth.",
      scheme: [
        "Identifies the motif and an early moment with its meaning",
        "Identifies a later moment with a different or deeper meaning",
        "Explains the change in meaning",
        "Connects the change to the character's development or downfall",
      ],
      model:
        "Blood begins as a sign of courage when the captain describes Macbeth's brave fighting. After Duncan's murder, blood means guilt: Macbeth fears the ocean could not wash his hands clean. By Act 5, Lady Macbeth sees an imaginary spot on her hands and cannot wash it away. The change shows that actions leave a mark on the conscience that cannot be erased, and it traces her collapse from confident planner to haunted sleepwalker.",
      answers: [
        [
          "full",
          "[[0|Blood first shows up in the battle, where the captain describes Macbeth's bravery, so it stands for courage and honor.]] [[1|After Duncan dies, Macbeth says all the ocean could not wash the blood from his hand, and in Act 5 Lady Macbeth sees a spot she can't wash off.]] [[2|So blood changes from something outside that you can be proud of into guilt that sticks.]] [[3|For Lady Macbeth, this traces her fall from the person who said a little water clears us of the deed to someone who sleepwalks and rubs her hands.]]",
          "Full marks. Quoting her early line against her later behavior makes the change vivid.",
        ],
        [
          "full",
          "[[0|Sleep begins as something innocent, like Duncan sleeping in the castle.]] [[1|Then Macbeth hears a voice that says he has murdered sleep, and later Lady Macbeth sleepwalks and is tormented.]] [[2|It changes from peaceful rest into a punishment, because the crime takes away the ability to rest.]] [[3|That shows Macbeth's conscience is still alive underneath, and it follows both of them to the end.]]",
          "All four marks. You see that a motif can show what a character cannot say aloud.",
        ],
        [
          "partial",
          "[[0|Blood is courage at the beginning.]] [[1|Later it is guilt.]] That's how it changes.",
          "Good early and later moments. Explain why the shift matters and what it shows about the characters.",
        ],
        [
          "partial",
          "[[2|The motif changes from outside to inside the mind.]] [[3|It shows Lady Macbeth's collapse.]]",
          "Strong analysis. Name the motif and the specific early and late moments.",
          true,
        ],
        [
          "weak",
          "Darkness is just because the play happens at night. It does not change.",
          "Characters ask for darkness to hide their deeds, and its meaning grows. Look for the lines where it is called on.",
        ],
        [
          "weak",
          "[[0|Blood is a sign of bravery in the battle.]] It always means bravery, even at the end.",
          "You identified the early meaning. At the end Lady Macbeth sees blood as guilt. Reread Act 5 Scene 1.",
        ],
      ],
    },
    {
      prompt:
        "Explain how Shakespeare's five-act structure shapes the effect of Macbeth. Identify the turning point and describe how the play's mood and pace change after it.",
      scheme: [
        "Identifies the turning point and why it matters",
        "Describes what the play does before it (temptation, crime, rise)",
        "Describes what changes after it (isolation, tyranny, fall)",
        "Connects the structure to the tragic effect on the audience",
      ],
      model:
        "The turning point is Act 3, when Macbeth orders Banquo killed and then sees his ghost at the banquet. Before it, Acts 1 and 2 show temptation and the crime that gets Macbeth the crown. After it, Macbeth becomes more tyrannical and isolated while Scotland turns against him. The structure lets the audience see a rise and then a fall, which creates pity and fear as a good man is ruined.",
      answers: [
        [
          "full",
          "[[0|The turning point is the banquet in Act 3 when Banquo's ghost appears, showing that Macbeth's guilt is stronger than his power as king.]] [[1|Before that the first two acts are about the temptation and then the murder, and Macbeth gets what he wanted.]] [[2|After that he turns into a tyrant who kills more people, loses friends, and finally is attacked by his country.]] [[3|The structure makes the audience watch someone rise and then fall, which is how a tragedy makes you pity him even though he did terrible things.]]",
          "Full marks. Your last sentence names the tragic effect directly.",
        ],
        [
          "full",
          "[[0|Act 3 is the turning point because Macbeth has the crown but cannot trust anyone, so he orders Banquo killed and the plan partly fails.]] [[1|Acts 1 and 2 build tension toward the murder, with the prophecy and Lady Macbeth's pressure.]] [[2|Acts 4 and 5 are about him becoming more isolated, with the witches' warnings, Macduff's family, and the English army.]] [[3|The shape makes us understand how one choice leads to many, and it ends with a man who sees life as meaningless.]]",
          "All four marks. Linking the structure to the meaning of the \"Tomorrow\" speech is a strong move.",
        ],
        [
          "partial",
          "[[0|Act 3 is the turning point with the ghost.]] [[1|Before that he kills Duncan.]] After that things get worse.",
          "You have the turning point and early events. Describe the later acts more specifically and say how the structure affects the audience.",
        ],
        [
          "partial",
          "[[2|After the banquet he is isolated and kills more people.]] [[3|The audience feels sorry for him.]]",
          "Strong on the later acts and audience response. Name the turning point and what the first two acts do.",
          true,
        ],
        [
          "weak",
          "The play has five acts and each one has scenes. The ending is when someone wins.",
          "That describes the form but not the effect. Ask where the play changes direction and what the audience feels.",
        ],
        [
          "weak",
          "[[0|The turning point is Act 1 when the witches speak.]] After that nothing changes because the prophecy is fixed.",
          "A lot changes after Act 1. Consider the moment in Act 3 where Macbeth loses control of the consequences.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Page, stage and screen: Macbeth's dagger and what a performance chooses",
  note: `
## Objectives

Students will be able to:

1. compare a written scene with a staged or filmed version and explain what each interpretation emphasizes;
2. read and comprehend a range of grade-level literature, independently and with growing stamina.

## Materials

Act 2 Scene 1 (the dagger soliloquy) printed with room for annotation, descriptions of three possible stagings, and a staging comparison grid.

## Starter (8 minutes)

Ask: "How would you show a vision on screen? Should the audience see a dagger, or only see an actor reacting to nothing?" Take two arguments and note that both are interpretations.

## Main activity

1. Close read the soliloquy: "Is this a dagger which I see before me?" Mark the questions, the shift from hallucination to resolve, and the final bell.
2. Compare three stagings (described, or viewed in clips): (a) a bare stage with no dagger and a single spotlight, (b) a film with a glowing floating dagger and echoing sound, and (c) a modern staging in a kitchen with a knife on the counter. Students complete a grid: what does it emphasize about Macbeth's mind?
3. Discuss fidelity. Which version is truest to the text's uncertainty about whether the dagger is real? Which choices add something the text does not state?
4. Stamina: silent independent reading of Act 3 Scene 1 with annotation, followed by a three-sentence summary.

## Checking for understanding

Stand-and-sort: students move to a corner that matches their preferred staging, then explain the textual reason.

## Exit ticket

Which staging is most faithful to the soliloquy's ambiguity, and why?
`,
  reading: [
    "The dagger that may not be there",
    `
In Act 2 Scene 1 of Macbeth, the hero is alone on the stage just before he murders Duncan. He sees a dagger in the air, the handle toward his hand, and he asks if it is "a dagger of the mind, a false creation." He tries to grasp it and cannot. Then he sees blood on it, and decides that the dagger is not a vision at all but the sign of the murder he is going to commit. A bell rings, and he goes to kill the king.

On the page, the passage depends on questions and shifts. Macbeth asks himself whether the dagger is real, accuses his own senses, and then reasons that it points the way he was already going. A reader must decide whether the scene shows a mind unraveling or a mind gathering itself, and the text supports both. This is the ambiguity that a director has to turn into something an audience can see.

Consider three staging choices. A production on a bare stage might use a single light on the actor and no dagger at all. The audience then sees Macbeth reaching for nothing, and the effect is to place us inside his mind. It emphasizes the idea that the dagger is imaginary and that his struggle is psychological. A film might instead show a floating dagger, glowing, with an echoing sound. This version emphasizes the supernatural and the idea that forces outside Macbeth may be drawing him on. A modern stage production might place the scene in a kitchen with a knife on the counter, stressing the ordinariness of violence and the way a trivial object can become a means of murder.

Each choice solves one problem and creates another. The bare stage honors the ambiguity of the language but asks the audience to supply the dagger. The glowing blade makes the vision concrete, but it can seem to settle a question the text leaves open. The kitchen turns the play toward domestic violence but loses the feeling of fate that the witches provide. A viewer who compares a stage version to the text asks what each choice adds, what it removes, and which interpretation best accounts for the lines.

Reading a long scene on your own also asks for stamina. A helpful habit is to pause after each speech, state in one sentence what has changed, and then continue.
`,
  ],
  cards: [
    ["Hallucination", "Seeing something that is not there, as Macbeth sees the dagger."],
    ["Interpretation", "A reading of a text, shown in an essay or in a performance."],
    ["Fidelity", "How faithfully a performance follows the meaning of the text."],
    ["Mise-en-scène", "Everything placed in front of the camera or on stage: setting, lighting, costumes, props."],
    ["Close reading", "Careful attention to the words, structure and effects of a passage."],
    ["Ambiguity", "A feature of a text that allows more than one reading."],
    ["Dramatic soliloquy", "A speech in which a character reveals thoughts aloud, alone on stage."],
    ["Adaptation", "A version of a work reworked for another medium or setting."],
  ],
  closed: [
    [
      "Why might a director choose to show no physical dagger in the soliloquy?",
      [
        "To save money on props only",
        "To place the audience inside Macbeth's mind and emphasize that the dagger may be imaginary",
        "To remove the murder from the play",
        "To prove the dagger is real",
      ],
      "B",
    ],
    [
      "A film shows a glowing floating dagger with an echoing sound. What does this choice most emphasize?",
      [
        "The vision as a supernatural force",
        "That the scene is a comedy",
        "That the stage is empty",
        "That Macbeth is calm",
      ],
      "A",
    ],
    [
      "A staging sets the soliloquy in a kitchen with a knife on the counter. What interpretation might it suggest?",
      [
        "That fate is the main cause",
        "That violence can grow from ordinary objects and settings",
        "That Macbeth is a cook",
        "That the witches are present",
      ],
      "B",
    ],
    [
      "Which staging most faithfully keeps the text's uncertainty about whether the dagger is real?",
      [
        "One that makes it clearly physical",
        "One that leaves the audience unsure by showing Macbeth's reaction but no object",
        "One that cuts the soliloquy",
        "One that reveals the dagger is a toy",
      ],
      "B",
    ],
    [
      "A good strategy for reading a long, hard scene independently is to",
      [
        "read it once quickly and never go back",
        "pause after each speech and summarize in one sentence",
        "read only the stage directions",
        "skip all the soliloquies",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare two possible stagings of the dagger soliloquy: (a) a bare stage with no dagger and (b) a film with a glowing floating dagger. Explain what each choice emphasizes about Macbeth, and decide which is more faithful to the text's language, with a reason.",
      scheme: [
        "Explains what the bare-stage choice emphasizes",
        "Explains what the glowing-dagger choice emphasizes",
        "States which is more faithful to the text",
        "Supports the judgment with a reference to the soliloquy's language or ambiguity",
      ],
      model:
        "The bare stage emphasizes Macbeth's mind, since the audience sees him reaching for nothing and must decide whether he is hallucinating. The glowing dagger emphasizes the supernatural, as though an outside force is guiding him. The bare stage is more faithful to the text because Macbeth himself asks whether the dagger is 'a dagger of the mind, a false creation,' and the language keeps the question open, which a visible dagger would settle.",
      answers: [
        [
          "full",
          "[[0|The bare stage puts the audience in Macbeth's head because we see him grab at nothing, so it makes the scene about his mind and his fear.]] [[1|The glowing dagger makes it feel supernatural, like something outside him is pulling him toward the murder.]] [[2|I think the bare stage is more faithful.]] [[3|Macbeth says it might be a dagger of the mind and a false creation, which means the text isn't sure, and a glowing dagger would answer that question for the audience.]]",
          "Full marks. You tied your judgment directly to a phrase from the soliloquy.",
        ],
        [
          "full",
          "[[0|With no dagger the scene is a study of Macbeth's psychology and shows how he might be seeing what he wants to do.]] [[1|With the glowing dagger the film stresses the witches' world and the idea that fate is leading him.]] [[2|The more faithful one is the bare stage.]] [[3|He questions his own senses, and the bare stage keeps us in the same doubt, while the floating knife takes it away.]]",
          "All four marks. You see that fidelity means keeping the text's doubt alive.",
        ],
        [
          "partial",
          "[[0|The bare stage shows it's in his mind.]] [[1|The glowing dagger makes it look magical.]] They are both good.",
          "Your descriptions are accurate. Decide which is more faithful and support it with the language of the soliloquy.",
        ],
        [
          "partial",
          "[[2|The bare stage is more faithful.]] [[3|He says it could be a false creation so the audience shouldn't see it.]]",
          "Good use of the text. Add what each staging emphasizes so the comparison is complete.",
          true,
        ],
        [
          "weak",
          "The glowing dagger is better because it looks cooler and the effects are good. The bare stage is boring.",
          "Visual appeal is not the question. Ask what each choice does to the text's uncertainty.",
        ],
        [
          "weak",
          "[[1|The glowing dagger makes it supernatural.]] The bare stage is the same because the words are the same, so there is no difference.",
          "The words may be the same, but the staging changes what we emphasize. You described the glowing version well; now describe the bare one.",
        ],
      ],
    },
    {
      prompt:
        "In a paragraph, summarize what happens in the dagger soliloquy and explain how the structure of the speech, with its questions, then reasoning, then resolve, shows Macbeth's state of mind. Refer to specific moments.",
      scheme: [
        "Summarizes the soliloquy accurately (vision of the dagger, attempt to grasp, bloody blade, bell)",
        "Identifies the opening questions and what they show",
        "Identifies the shift to reasoning or resolve",
        "Explains what the structure shows about Macbeth's mind",
      ],
      model:
        "Macbeth sees a dagger in the air, tries to grasp it, and then sees blood on it before a bell rings and he goes to kill Duncan. He begins with questions that show doubt about his senses. He then reasons that the dagger points where he is going and moves to a resolve to act. The structure from doubt to decision shows a mind that tries to resist its own purpose and then yields to it.",
      answers: [
        [
          "full",
          "[[0|Macbeth sees a dagger floating in the air, tries to grab it, sees blood on it, and then hears a bell that tells him to go kill Duncan.]] [[1|At first he asks questions, like is this a dagger I see, which shows he doubts his own eyes.]] [[2|Then he starts explaining it to himself as a sign pointing to the murder and ends up deciding to go.]] [[3|So the shape from doubt to decision shows that he is fighting his own plan and then giving in.]]",
          "Full marks. Your account of the summary and the structure both stay close to the text.",
        ],
        [
          "full",
          "[[0|In the speech Macbeth sees a dagger he can't touch, later it has blood on it, and a bell rings as a signal.]] [[1|He opens with questions, which tells me he is confused and unsure what is real.]] [[2|By the end the questions turn into statements, and he says the bell invites him to heaven or hell and he moves.]] [[3|The shift shows his mind settling on the murder even though a part of him knows it is wrong.]]",
          "All four marks. Noticing that questions turn into statements is a sharp structural observation.",
        ],
        [
          "partial",
          "[[0|Macbeth sees a dagger and a bell rings.]] [[1|He asks questions at the start.]] It shows he is nervous.",
          "Accurate but brief. Describe the shift to reasoning and resolve and what the structure shows.",
        ],
        [
          "partial",
          "[[2|He reasons that the dagger points the way and then he goes to kill the king.]] [[3|The speech shows that he is going from doubt to action.]]",
          "Strong on the shift and meaning. Add a brief summary and the opening questions.",
          true,
        ],
        [
          "weak",
          "Macbeth uses the dagger to kill Duncan on stage. The structure is that he talks and then he does.",
          "The murder happens offstage and the dagger he sees is not the one he uses at first. Reread the soliloquy.",
        ],
        [
          "weak",
          "[[1|He asks lots of questions.]] This is because Macbeth is a teacher and teachers ask questions.",
          "The questions show doubt, not teaching. Think about why someone might question their own eyes.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Tone and structure in Lincoln's Second Inaugural Address",
  note: `
## Objectives

Students will be able to:

1. analyze how an author's word choices in a speech or essay shape its tone and meaning;
2. analyze how an author structures an argument and how the parts connect to the whole.

## Materials

The Second Inaugural Address (March 4, 1865) with line numbers, a diction chart (word, connotation, effect), and a structure map.

## Starter (8 minutes)

Ask: "You are asked to speak to a country that is about to win a war against half of itself. What do you say to the winners? What do you say to the losers?" Take a few answers and note the tension between triumph and healing.

## Main activity

1. Read the short first paragraph and the final paragraph aloud. Ask how the tone differs from what students predicted.
2. Diction analysis. Students choose five words or phrases (for example, "malice," "charity," "bondsman," "unrequited toil," "judgments") and complete a chart: denotation, connotation, effect.
3. Structure. Divide the speech into movements: modest opening, review of the causes of the war, the turn to providence and the idea of shared guilt, and the closing call for charity. Students explain how each movement prepares for the next.
4. Close read the sentence about the two parties who both read the same Bible. What does the balanced syntax do?

## Checking for understanding

Whiteboards: one word from the speech with its connotation.

## Exit ticket

How does the final paragraph's tone differ from the third, and why would Lincoln end that way?
`,
  reading: [
    "A speech without a victory lap",
    `
When Abraham Lincoln stood to take the oath of office for a second time on March 4, 1865, the Civil War had a month or so left to run, and the Union was almost certain to win. A listener might have expected a speech of triumph. Lincoln gave one of the shortest inaugural addresses in American history, and one of the least boastful. Its power comes from its tone, and its tone comes from word choice and structure.

The opening is deliberately modest. Lincoln says that there is "less occasion for an extended address" than there was four years earlier, since the progress of the war is known to everyone. He declines to predict. The humility is a signal: the speech will not flatter the audience.

The middle of the speech reviews the causes of the war, and here Lincoln is direct. He names slavery as "a peculiar and powerful interest" and says that all knew it was somehow the cause of the war. The word "peculiar" is chosen with care: it means particular to a place, but it also carries a hint of strangeness, even wrongness. He describes both sides with balanced sentences: one party "would make war rather than let the nation survive," and the other "would accept war rather than let it perish." The parallel structure gives each side a place without excusing either.

Then the speech takes a turn that is surprising for a political address. Lincoln observes that both sides read the same Bible and pray to the same God, and that each invokes God's aid against the other. He suggests that the war may be a judgment on the whole country. The most severe passage says that if God wills the war to continue until every drop of blood drawn with the lash is paid by another drawn with the sword, then the judgments of the Lord are true and righteous. The vocabulary of "bondsman," "lash" and "unrequited toil" brings the moral weight of slavery into the language of providence.

The close is gentle. "With malice toward none, with charity for all" repeats the same structure twice, and the repetition is like a promise. The final sentence lists tasks: to finish the work, to bind up the nation's wounds, to care for the soldier and his widow and orphan, and to achieve a just and lasting peace. The structure moves from modesty to analysis to judgment to healing. Each movement prepares for the next, and the whole argues that the country can only be rebuilt if it is honest about its guilt and generous in its aims.
`,
  ],
  cards: [
    ["Diction", "The speaker's choice of words, including their connotations."],
    ["Tone", "The speaker's attitude toward the subject and the audience."],
    ["Parallel structure", "Repeating the same grammatical pattern for related ideas."],
    ["Providence", "The belief that events are guided by God."],
    ["Chiasmus", "A figure in which the order of terms is reversed in the second part, such as 'one would make war... the other would accept war.'"],
    ["Connotation", "The feelings and associations attached to a word."],
    ["Movement (in a speech)", "A major section with its own purpose."],
    ["Anaphora", "Repetition of a word or phrase at the start of successive clauses."],
  ],
  closed: [
    [
      "Lincoln opens by saying there is \"less occasion for an extended address\" than at his first inauguration. What tone does this establish?",
      [
        "Boastful",
        "Modest and restrained",
        "Angry",
        "Playful",
      ],
      "B",
    ],
    [
      "\"With malice toward none, with charity for all\" is an example of",
      ["parallel structure and anaphora", "hyperbole", "irony", "a rhetorical question"],
      "A",
    ],
    [
      "What does Lincoln suggest by noting that both sides read the same Bible and pray to the same God?",
      [
        "That the war should be fought over religion",
        "That neither side can claim a simple moral victory, and the war may be a judgment on the whole nation",
        "That the South was right",
        "That the Union should keep fighting forever",
      ],
      "B",
    ],
    [
      "The phrase \"unrequited toil\" in the speech emphasizes",
      [
        "the profit of the workers",
        "the unpaid, unrewarded labor of the enslaved",
        "the comfort of the factory owners",
        "the weather",
      ],
      "B",
    ],
    [
      "Which sequence best describes the speech's movements?",
      [
        "Triumph, boasting, revenge, celebration",
        "Modest opening, review of the war's causes, reflection on shared guilt and providence, call to charity",
        "A list of battles, a list of generals, a list of laws",
        "A joke, a story, a song",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose two words or phrases from the Second Inaugural Address (for example, \"peculiar,\" \"unrequited toil,\" \"malice,\" or \"charity\"). For each, explain its connotation and how it contributes to the speech's tone and meaning.",
      scheme: [
        "Identifies the first word or phrase accurately",
        "Explains its connotation and effect on tone or meaning",
        "Identifies the second word or phrase accurately",
        "Explains its connotation and effect, linking both to the speech's overall purpose of healing and honesty",
      ],
      model:
        "'Peculiar' means particular to a place, but it also suggests something strange and wrong, so Lincoln names slavery without raising his voice. 'Charity' suggests Christian love and generosity, which sets a tone of healing at the end. Together, the words show Lincoln pairing honest judgment with a call for reconciliation.",
      answers: [
        [
          "full",
          "[[0|Lincoln calls slavery a peculiar interest.]] [[1|Peculiar means specific to one region, but it also sounds odd and a little wrong, so he names the cause of the war calmly while hinting at its moral problem.]] [[2|At the end he asks for charity for all.]] [[3|Charity is a word of love and generosity that makes the ending sound like forgiveness, and together the words show that he wanted honesty about the cause and kindness about the future.]]",
          "Full marks. Pairing a word of judgment with a word of mercy explains the speech's design.",
        ],
        [
          "full",
          "[[0|The phrase unrequited toil describes the labor of enslaved people.]] [[1|Unrequited means it was never paid back, so it makes the reader think of all the work taken without reward, which adds moral weight and a tone of sorrow.]] [[2|Another word is malice, in malice toward none.]] [[3|Malice is a harsh word for ill will, and by rejecting it Lincoln sets a tone of mercy toward the South, which fits his purpose of healing the nation.]]",
          "All four marks. Choosing a word he rejects (malice) is an interesting analysis.",
        ],
        [
          "partial",
          "[[0|Lincoln says malice toward none.]] [[1|Malice means wanting to hurt people, so he is saying he doesn't want revenge.]] He uses another word too.",
          "Your first word is well explained. Analyze a second word and link them to the speech's purpose.",
        ],
        [
          "partial",
          "[[2|The word charity at the end.]] [[3|It shows the speech is about forgiving and rebuilding, not about celebrating victory.]]",
          "Strong on tone and purpose. Add a second word and explain its connotation.",
          true,
        ],
        [
          "weak",
          "Lincoln uses old-fashioned words because it was a long time ago. They don't mean anything special.",
          "Lincoln's words are chosen for effect. Pick one and think about the feeling it creates.",
        ],
        [
          "weak",
          "[[0|He says charity.]] Charity is when you give money to the poor, so the speech is about giving to the poor.",
          "Charity here means generosity of spirit toward the defeated, not money to the poor. Think about who the audience is.",
        ],
      ],
    },
    {
      prompt:
        "Describe the structure of the Second Inaugural Address in three or four movements. For each, say what Lincoln does and how it prepares for the next, and explain how the structure supports his argument.",
      scheme: [
        "Identifies the opening movement and its purpose",
        "Identifies the review of causes and the turn to providence",
        "Identifies the closing call to charity",
        "Explains how the movements connect to form one argument",
      ],
      model:
        "The speech begins modestly, declining to predict. It then reviews the causes of the war, naming slavery, and turns to the idea that both sides invoke the same God and that the war may be a national judgment. It ends with a call for charity toward all and for a just peace. Each movement prepares for the next: modesty earns trust, honest analysis justifies the idea of shared guilt, and shared guilt supports the call for healing.",
      answers: [
        [
          "full",
          "[[0|The first movement is humble, with Lincoln saying there is less to say than at the first inauguration.]] [[1|Then he reviews the causes of the war, saying slavery was the cause, and shifts to talking about God and how both sides prayed to the same God, so both are judged.]] [[2|The last movement says with malice toward none and calls for binding up the nation's wounds.]] [[3|They connect because the humility makes people trust him, the honesty about slavery justifies the idea of shared guilt, and shared guilt is the reason the country needs mercy.]]",
          "Full marks. You explained the logic that holds the movements together.",
        ],
        [
          "full",
          "[[0|He begins quietly, by not making predictions or bragging.]] [[1|The middle is a hard look at the cause, which is slavery, and the religious idea that the war is a punishment for the whole nation.]] [[2|The ending turns to forgiveness and to the work of rebuilding, with care for veterans and widows.]] [[3|Each part earns the next one: the quiet start makes him credible, the honest middle makes his call for mercy mean something.]]",
          "All four marks. \"Earns the next one\" is a precise way to describe structure.",
        ],
        [
          "partial",
          "[[0|It starts modestly.]] [[2|It ends with charity for all.]] The middle is about the war.",
          "Good start and end. Be specific about the middle and explain how the movements connect.",
        ],
        [
          "partial",
          "[[1|In the middle he talks about slavery as the cause and about God judging both sides.]] [[3|This leads to the end because he can ask for kindness after being honest.]]",
          "Strong on the middle and the logic. Name the opening and closing movements to complete the structure.",
          true,
        ],
        [
          "weak",
          "The speech has no structure. He just says things that come to mind and ends.",
          "The speech is carefully arranged. Reread the opening, the middle and the final paragraph.",
        ],
        [
          "weak",
          "[[2|The last part is about charity.]] The first part is about winning and the middle part is about punishing the South.",
          "You have the last part. The speech does not boast of winning or call for punishment. Reread the opening and the middle.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Evaluating arguments: Douglass, the Declaration, and writing a literary argument",
  note: `
## Objectives

Students will be able to:

1. evaluate an argument, separating valid reasoning from unsupported or fallacious claims;
2. compare how two foundational US documents or speeches address a similar concept;
3. write a literary argument with a precise claim, organized reasons, evidence and a counterclaim.

## Materials

Excerpts from the Declaration of Independence and Frederick Douglass's speech of July 5, 1852, an argument analysis sheet, and a literary-argument rubric.

## Starter (8 minutes)

Display one sentence from Douglass: "This Fourth of July is yours, not mine." Ask: "Who is speaking? Who is being addressed? What is odd about saying this on a holiday?" Collect answers.

## Main activity

1. Read excerpts from the Declaration (the claim that all are created equal and the list of grievances) and from Douglass's speech (his praise of the founders and his turn to indictment).
2. Argument analysis. Students identify Douglass's claim, his reasons, and the appeals he uses. Where does he use logos, where pathos, and where ethos?
3. Fallacy check on a short model argument and a repair.
4. Compare: how does each text treat liberty? What does Douglass do with the Declaration's principles? Students write a comparison thesis.
5. Plan a literary argument on Macbeth with claim, reasons, evidence and counterclaim.

## Checking for understanding

Pair share: one sentence where Douglass uses the Declaration's own principles against the nation's practice.

## Exit ticket

A thesis for a comparison of the two texts, with one point of agreement and one of difference.
`,
  reading: [
    "Using the founders' words against the nation's practice",
    `
In 1776, the Continental Congress adopted a declaration that began with a principle and moved to a list. The principle was that all men are created equal and have rights that governments must protect. The list was a series of grievances against the king that, in the authors' view, showed he had broken his duty. The structure is a model of logical argument: premise, evidence, conclusion. The conclusion is that the colonies are justified in separating.

Seventy-six years later, on July 5, 1852, Frederick Douglass was invited to speak in Rochester, New York, at a celebration of Independence Day. Douglass had escaped slavery and become one of the most powerful speakers in the country. He did not give the expected address. He began modestly, then praised the founders as "brave men" who had acted for principle. Then he turned the audience's attention to those for whom the day meant nothing: "What, to the American slave, is your Fourth of July?" His answer was that the day revealed to him "the gross injustice and cruelty" to which he was the constant victim.

Douglass's argument works by borrowing the founders' own premises. He does not claim that the principles of the Declaration are wrong. He claims that the nation has not lived up to them. This is an argument from consistency, and it is hard to refute, because his audience already believes the premise. His evidence includes the laws permitting slavery and the Fugitive Slave Act. His appeals combine logos, the logic of the contradiction; pathos, the images of families torn apart; and ethos, the authority of a man who has lived what he describes.

Critical readers also test arguments for weak reasoning. A **fallacy** is an error in reasoning, such as a false dilemma, which presents two options when more exist, or a hasty generalization, which draws a broad conclusion from too little evidence. Douglass avoids these by anticipating objections and answering them. He asks, for instance, whether anyone needs an argument to prove that slavery is wrong, and then explains that what is needed is not argument but "scorching irony" and "withering sarcasm." That is a rhetorical choice: he claims the question is settled by common sense.

When you write your own **literary argument**, use the same discipline. Make a claim that is specific and arguable, give reasons in a logical order, support each with textual evidence, and address the most serious counterclaim. A thesis such as "Shakespeare uses the motif of blood to show that guilt cannot be washed away by power" is stronger than "Blood is important in Macbeth," because it commits to an idea that someone could challenge.
`,
  ],
  cards: [
    ["Premise", "A statement offered as a basis for an argument's conclusion."],
    ["Logos", "An appeal to reason and evidence."],
    ["Pathos", "An appeal to emotion."],
    ["Ethos", "An appeal based on the speaker's credibility or character."],
    ["Hasty generalization", "A broad conclusion drawn from too little evidence."],
    ["False dilemma", "Presenting only two options when more exist."],
    ["Argument from consistency", "Arguing that others must follow the principles they already claim to hold."],
    ["Counterclaim", "An opposing view that a strong argument addresses."],
  ],
  closed: [
    [
      "Douglass's speech uses the Declaration's own principles to criticize the nation. This is best described as",
      [
        "an argument from consistency",
        "a hasty generalization",
        "a false dilemma",
        "an appeal to the bandwagon",
      ],
      "A",
    ],
    [
      "Which appeal is Douglass using when he reminds the audience that he has lived under slavery?",
      ["Logos", "Pathos", "Ethos", "None of these"],
      "C",
    ],
    [
      "\"Two students failed the quiz, so the whole class is not learning.\" This is a",
      [
        "valid argument",
        "hasty generalization",
        "false dilemma",
        "counterclaim",
      ],
      "B",
    ],
    [
      "Why does Douglass begin by praising the founders?",
      [
        "He agrees with all their choices.",
        "It builds common ground and then makes his turn to indictment more powerful.",
        "He was told to.",
        "It is a mistake.",
      ],
      "B",
    ],
    [
      "Which thesis is strongest for a literary argument?",
      [
        "Macbeth is a play.",
        "Macbeth has blood in it.",
        "Shakespeare uses the motif of blood to show that guilt cannot be washed away by power.",
        "Blood is red.",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Identify one way Douglass uses the Declaration of Independence in his argument, and evaluate whether the reasoning is valid. In your answer, name the type of appeal he uses and explain why it is persuasive to his audience.",
      scheme: [
        "Identifies how Douglass uses the Declaration's principles",
        "Evaluates the reasoning as valid, such as an argument from consistency",
        "Names an appeal he uses (logos, pathos or ethos)",
        "Explains why it is persuasive to his audience",
      ],
      model:
        "Douglass accepts the Declaration's principle that all are created equal and argues that the nation fails to live up to it. This is valid reasoning from consistency, because his audience already believes the premise. He uses ethos, since as someone who escaped slavery he speaks with authority. This is persuasive because the audience cannot dismiss him as an outsider and cannot reject the principle without rejecting their founding document.",
      answers: [
        [
          "full",
          "[[0|Douglass takes the Declaration's idea that all are created equal and says America doesn't follow it when it allows slavery.]] [[1|The reasoning is valid because it is an argument from consistency: his audience already believes the principle so they can't deny the conclusion without contradicting themselves.]] [[2|He uses ethos because he escaped slavery and speaks from his own experience.]] [[3|That is persuasive because the audience can't write him off as someone who doesn't understand, and they can't reject the principle without rejecting their own founding.]]",
          "Full marks. You evaluated the logic and named the appeal, then linked both to the audience.",
        ],
        [
          "full",
          "[[0|He praises the founders and uses their own words about liberty against the country that allows slavery.]] [[1|I think it is solid reasoning because he is not asking for a new principle, just for the nation to follow the one it already has.]] [[2|He also uses pathos when he describes families being sold apart.]] [[3|That works on an audience that celebrates freedom, because it makes them feel the gap between their holiday and his reality.]]",
          "All four marks. Your point about \"not asking for a new principle\" is exactly why the argument is strong.",
        ],
        [
          "partial",
          "[[0|Douglass uses the Declaration's principle to criticize slavery.]] [[2|He uses ethos.]] It is persuasive.",
          "Good start. Evaluate the logic, and explain why the appeal persuades his audience in particular.",
        ],
        [
          "partial",
          "[[1|It's valid because he's only using what they already believe.]] [[3|They can't argue back without going against their own founding.]]",
          "Strong reasoning. Add how he uses the Declaration and name one appeal he uses.",
          true,
        ],
        [
          "weak",
          "Douglass says the Declaration is wrong and should be thrown away. His argument is weak because the founders were great.",
          "Douglass praises the Declaration's principles; he criticizes the nation for not following them. Reread the first half of the speech.",
        ],
        [
          "weak",
          "[[0|Douglass uses the Declaration.]] He uses pathos because he is sad. That is the whole argument.",
          "Specify how he uses it, and say how emotion works on the audience. Is sadness the same as an appeal to emotion?",
        ],
      ],
    },
    {
      prompt:
        "Write a thesis for a literary argument about Macbeth that makes a precise, arguable claim. Then name the strongest counterclaim to your thesis and explain how you would answer it with evidence from the play.",
      scheme: [
        "Writes a precise, arguable thesis about the play",
        "Names a plausible counterclaim",
        "Offers a specific piece of evidence for the response",
        "Explains how the evidence answers the counterclaim",
      ],
      model:
        "Thesis: Shakespeare uses the motif of sleep to show that guilt destroys the peace power cannot restore. Counterclaim: Some might say that the sleep imagery is minor compared to the blood. I would answer that Macbeth's line about having murdered sleep and Lady Macbeth's sleepwalking make sleep the way both characters' consciences return. This shows sleep carries as much weight as blood and extends the theme.",
      answers: [
        [
          "full",
          "[[0|Shakespeare uses the sleepwalking scene to show that Lady Macbeth's guilt cannot be controlled by the strength she showed before the murder.]] [[1|A counterclaim is that she is just ill, and her sleepwalking has a medical cause and not a moral one.]] [[2|My evidence is that she talks about the blood on her hands and about Duncan's death, so what she says is about the crime, not a disease.]] [[3|The content of her words answers the counterclaim because it shows that the guilt is the cause of her condition.]]",
          "Full marks. Your response uses the specific content of her speech, which is the strongest available evidence.",
        ],
        [
          "full",
          "[[0|Macbeth's loss of sleep shows that crime destroys peace even for the person who gains power.]] [[1|A reader might say that Macbeth's insomnia comes from being king and worrying about enemies, not from guilt.]] [[2|I would point to the line where he hears a voice say he has murdered sleep, right after the killing and before he has any enemies.]] [[3|That timing shows the cause is the murder and not the throne.]]",
          "All four marks. The timing argument is smart and uses the text exactly.",
        ],
        [
          "partial",
          "[[0|Macbeth shows that guilt destroys peace.]] [[1|A counterclaim is that he is not guilty.]] It is hard to answer.",
          "Your thesis and counterclaim are clear. Offer specific evidence and explain how it answers the counterclaim.",
        ],
        [
          "partial",
          "[[2|The evidence is the line about murdering sleep.]] [[3|It shows his guilt began right away.]]",
          "Good evidence and explanation. State the thesis and the counterclaim it answers.",
          true,
        ],
        [
          "weak",
          "Macbeth is a good play. A counterclaim would be that it is a bad play. I would say it is good because I like it.",
          "A thesis needs a specific idea about the play's meaning, and a counterclaim needs to challenge it. Preference is not evidence.",
        ],
        [
          "weak",
          "[[0|Shakespeare shows that ambition is dangerous.]] No one could disagree with this so there is no counterclaim.",
          "An arguable claim invites disagreement. Make the thesis more specific so a reader could challenge it.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "The explanatory essay and a short research project: the Great Dayton Flood",
  note: `
## Objectives

Students will be able to:

1. write an explanatory essay that develops a topic with well-chosen facts, quotations and transitions;
2. carry out a short research project, narrowing the question as the sources suggest.

## Materials

Three short sources on the Great Dayton Flood of 1913 and the creation of the Miami Conservancy District, a research log, and an explanatory essay rubric.

## Starter (8 minutes)

Show a photograph description of downtown Dayton underwater in March 1913. Ask: "What questions would you ask? Which are too big, which too small, and which could guide a five-page essay?" Sort the questions.

## Main activity

1. Model the research cycle: topic, background reading, question, source gathering, note taking, revising the question. Start with "Dayton floods" and move to "How did the Great Dayton Flood lead to a new system of flood control?"
2. Read three sources. In the research log, students record the source, three facts and one quotation, and note where sources agree or conflict.
3. Revise the question after the sources. Perhaps the second source suggests that engineering choices matter more than the flood itself.
4. Draft a thesis that names the ideas to be explained. Outline three body paragraphs with the evidence for each.

## Checking for understanding

Peers read a thesis and name the three paragraphs it promises.

## Exit ticket

The narrowed question and a thesis, written on a card.
`,
  reading: [
    "From a flood to a flood-control system",
    `
In March 1913, heavy rain fell for days over Ohio, and the rivers that run through Dayton rose beyond anything the city had planned for. Levees failed, water filled the downtown, and more than three hundred people died. Thousands of homes were damaged. The disaster was one of the worst floods in American history, and it posed a question that engineers, businessmen and residents had to answer: how could a city protect itself from a river?

A researcher with that topic would begin with background reading, then narrow. "The Dayton flood" is too broad, and "How many boats were used in rescue?" is too narrow to carry an essay. A better question might be "How did the Great Dayton Flood of 1913 lead to a new approach to flood control in the Miami Valley?" This question has a clear scope, and it needs evidence that can be found in sources.

The sources suggest an answer. After the flood, local leaders raised millions of dollars in a few days, and then hired an engineer named Arthur E. Morgan to design a system. Instead of building higher levees alone, the plan he developed used dams on the tributaries upstream of the city. The dams were dry: they let water pass in normal times and held back floodwater only when the river rose. The Miami Conservancy District, created in 1915, was the legal body that could tax property owners across the watershed to pay for the work. The dams were finished in the early 1920s, and they have protected the valley since.

An **explanatory essay** about this topic would not argue that the dams are good. It would explain how and why the system was created. The thesis could be: "After the 1913 flood, Dayton replaced a patchwork of local levees with a regional system built on upstream dams, a new legal district and shared payment." Each body paragraph would develop one part. The first would explain the failure of the old system, with facts about the levees. The second would explain the engineering idea, with a quotation from an engineer or historian. The third would explain the Conservancy District and how it financed the work.

Good explanatory writing uses transitions that show cause and effect ("because," "as a result," "for this reason"), keeps quotations short and introduces them, and cites each source. And a good researcher stays open to revision. If a source shows that another city's earlier flood influenced the plan, the question or the thesis may need to change.
`,
  ],
  cards: [
    ["Research cycle", "The process of choosing a topic, reading, asking a question, gathering sources and revising."],
    ["Narrowing", "Making a research question more specific as you learn."],
    ["Thesis (explanatory)", "A statement of the ideas an essay will explain."],
    ["Primary source", "A source from the time being studied, such as a letter or photograph."],
    ["Secondary source", "A source that interprets or analyzes events, such as a history book."],
    ["Research log", "A record of sources and the facts and quotations taken from each."],
    ["Dry dam", "A dam that lets water pass normally and holds water back only during floods."],
    ["Transition", "A word or phrase that shows how ideas connect."],
  ],
  closed: [
    [
      "Which research question is best for a five-page essay?",
      [
        "What is a flood?",
        "How many people live in Dayton?",
        "How did the 1913 flood lead to a new system of flood control in the Miami Valley?",
        "Is water wet?",
      ],
      "C",
    ],
    [
      "A photograph taken in Dayton in March 1913 is an example of",
      ["a secondary source", "a primary source", "a thesis", "a counterclaim"],
      "B",
    ],
    [
      "Reading a second source, a researcher finds a fact that contradicts the first. The best response is to",
      [
        "ignore the new fact",
        "compare the sources, check their credibility, and revise the thesis if needed",
        "delete the research log",
        "choose the shorter source",
      ],
      "B",
    ],
    [
      "Which thesis suits an explanatory essay?",
      [
        "The Miami Conservancy District is the best thing ever built.",
        "After 1913, Dayton replaced local levees with a regional system of upstream dams, a legal district and shared payment.",
        "Floods are bad.",
        "I like dams.",
      ],
      "B",
    ],
    [
      "Which transition best shows cause and effect?",
      ["For example", "As a result", "Meanwhile", "On the other hand"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student begins with the topic \"Flooding in Ohio\" and, after reading two sources, notices that both discuss how the Great Dayton Flood changed engineering practice. Write a narrowed research question and an explanatory thesis, and name the three body-paragraph ideas the thesis promises.",
      scheme: [
        "Writes a narrowed, specific research question",
        "Writes an explanatory thesis that names the main ideas",
        "Names a first body-paragraph idea",
        "Names a second and a third body-paragraph idea that are distinct",
      ],
      model:
        "Question: How did the 1913 Dayton flood change the way engineers protected cities from rivers? Thesis: After the 1913 flood, the Miami Valley replaced local levees with a regional system built on upstream dry dams, a conservancy district with taxing power, and engineering that treated the whole watershed as one problem. The paragraphs would explain the failure of the levees, the dam design, and the district and its funding.",
      answers: [
        [
          "full",
          "[[0|How did the 1913 Dayton flood change the way engineers protected cities from river flooding?]] [[1|Thesis: After 1913 the Miami Valley replaced separate levees with a regional system of upstream dry dams, a legal district that could tax everyone who benefited, and a plan that treated the whole watershed as one system.]] [[2|Paragraph one will explain how the old levees failed.]] [[3|Paragraphs two and three will explain the dry dams and the Conservancy District's financing.]]",
          "Full marks. Each body paragraph is a distinct part of the thesis.",
        ],
        [
          "full",
          "[[0|What did the Great Dayton Flood teach engineers about controlling rivers?]] [[1|Thesis: The 1913 flood led to a new way of controlling rivers because Arthur Morgan's team used dry dams upstream, created a district to pay for them, and planned for the whole watershed.]] [[2|My first paragraph covers why the levees failed.]] [[3|My second covers the dam design and my third covers how the district was created and paid for.]]",
          "All four marks. Naming a person like Arthur Morgan gives the thesis a concrete anchor.",
        ],
        [
          "partial",
          "[[0|How did the Dayton flood change flood control?]] [[1|Thesis: The flood led to a new system with dams and a district.]]",
          "Good question and a short thesis. Name the paragraph ideas more specifically.",
        ],
        [
          "partial",
          "[[2|One paragraph on the failed levees.]] [[3|One on dry dams and one on the district.]]",
          "The three ideas are well chosen. Add a narrowed research question and a thesis that ties them together.",
          true,
        ],
        [
          "weak",
          "How do floods happen? Thesis: Floods happen when it rains. My paragraphs will be about rain, rivers and water.",
          "These are too broad to explain with specific evidence. Narrow the question to the Dayton case and name causes and responses.",
        ],
        [
          "weak",
          "[[0|What caused the Dayton flood?]] Thesis: I think the flood was horrible and dams are great. First, floods. Second, dams. Third, my opinion.",
          "Your question is specific. A thesis for an explanatory essay names causes or components, not opinions.",
        ],
      ],
    },
    {
      prompt:
        "Write a body paragraph of five to seven sentences for an explanatory essay on the Miami Conservancy District. Develop this topic sentence with at least two facts, one short introduced quotation (you may invent a plausible source for it), and a cause-and-effect transition: \"The Miami Conservancy District changed flood control by making the whole watershed responsible for paying for protection.\"",
      scheme: [
        "Develops the topic sentence with at least two relevant facts",
        "Introduces a short quotation with a source phrase",
        "Uses a cause-and-effect transition",
        "Explains in the writer's own words how the facts support the topic sentence",
      ],
      model:
        "The Miami Conservancy District changed flood control by making the whole watershed responsible for paying for protection. Before 1915, each town built its own levees and paid for them alone. The new district could tax landowners across the valley who benefited from the dams. According to one historian, the district 'turned a local problem into a regional responsibility.' As a result, communities that had never flooded helped pay for protection, and the dams could be built on a scale no single town could afford.",
      answers: [
        [
          "full",
          "The Miami Conservancy District changed flood control by making the whole watershed responsible for paying for protection. [[0|Before 1915 each town built and paid for its own levees, and the district was given the power to tax landowners across the valley who would benefit.]] [[1|According to one historian, the district 'turned a local problem into a regional responsibility.']] [[2|As a result, towns that had never flooded helped pay,]] [[3|which meant the dams could be built on a scale that no single town could have afforded.]]",
          "Full marks. The last clause explains why the facts matter, which is what makes it explanation and not a list.",
        ],
        [
          "full",
          "The Miami Conservancy District changed flood control by making the whole watershed responsible for paying for protection. [[0|The law let the district assess property owners based on how much they would benefit, and it covered a huge area of southwest Ohio.]] [[1|An engineer wrote that 'the river does not stop at a town line.']] [[2|Because of this, the plan could be built for the whole valley at once,]] [[3|and each community shared the cost in proportion to its protection, which made the system fair and lasting.]]",
          "All four marks. Your invented quotation fits the argument well.",
        ],
        [
          "partial",
          "The Miami Conservancy District changed flood control by making the whole watershed responsible for paying for protection. [[0|The district could tax landowners across the valley.]] [[2|As a result, the dams could be built.]]",
          "You have a fact and a transition. Add a second fact, an introduced quotation and an explanation in your own words.",
        ],
        [
          "partial",
          "The Miami Conservancy District changed flood control by making the whole watershed responsible for paying for protection. [[1|According to one report, 'the valley stood together.']] [[3|That is how the idea of shared responsibility made the system possible.]]",
          "Your quotation and explanation are good. Add facts and a cause-and-effect transition.",
          true,
        ],
        [
          "weak",
          "The Miami Conservancy District changed flood control by making the whole watershed responsible for paying for protection. Floods are terrible and Dayton had a bad one. I think the district is cool.",
          "The sentences after the topic sentence do not develop it. Add facts about taxing and shared cost.",
        ],
        [
          "weak",
          "The Miami Conservancy District changed flood control by making the whole watershed responsible for paying for protection. [[0|The district was created in 1915.]] The quotation is from my head and the district is about dams.",
          "You have one fact. Introduce a quotation with its source and explain the connection.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Credible sources, honest citation, and evidence from literature and nonfiction",
  note: `
## Objectives

Students will be able to:

1. gather relevant information from several sources, assess their credibility and cite them without plagiarizing;
2. draw evidence from literary and informational texts to support analysis in writing.

## Materials

A source packet (a state agency report, a newspaper article, an advocacy group's webpage, an anonymous video transcript), a lateral-reading handout, citation templates in MLA and APA, and a passage from Macbeth paired with a nonfiction article on sleep.

## Starter (8 minutes)

Pose a challenge: "In thirty seconds, find out who runs a website you have never heard of, without reading anything on that site. How do you do it?" Introduce lateral reading, which means leaving a page to check what others say about it.

## Main activity

1. Evaluate the four sources with the checklist (author, expertise, date, evidence, purpose, bias). Students also practice lateral reading with one source.
2. Plagiarism lab. Three student passages of increasing subtlety, from a copied sentence to a paraphrase with the same structure, to an uncited idea. Students classify and repair each.
3. Citation practice: write a works-cited entry and an in-text citation for two sources.
4. Evidence from two genres. Students use Lady Macbeth's sleepwalking scene and a short article about sleep deprivation to support a claim about guilt and the body.

## Checking for understanding

Exit slips with one repair of a plagiarized sentence.

## Exit ticket

Write one in-text citation and the matching works-cited entry.
`,
  reading: [
    "Checking who is speaking, and giving credit",
    `
The quality of an essay depends on the quality of its sources. A researcher cannot judge a page by its design, which any person with a template can make attractive. The better approach is to ask questions about the source and, when possible, to leave the page to find out what others say about it. Professional fact checkers call this **lateral reading**. Instead of reading down a page to decide whether to trust it, they open new tabs to see who is behind it and what other sources say. A group that sounds neutral, such as a "Council for Better Nutrition," may turn out to be funded by a company that sells supplements.

Useful questions include these. Who is the author, and what is their expertise? Who published it, and why? How current is it? What evidence does it provide, and can it be traced? Does the source acknowledge other views? An agency report with cited data and named authors is stronger than an unsigned page, but even strong sources can be biased by their purpose or by what they leave out.

Once you have chosen sources, you must credit them. **Plagiarism** is using another person's words, structure or ideas without credit. It includes obvious copying and also **patchwriting**, which means lifting a sentence's structure and replacing some words with synonyms. A true **paraphrase** changes both the words and the structure, and keeps the idea accurate, with a citation. A **quotation** keeps exact words, marks them, and cites the source. A **summary** condenses a longer passage.

Style guides such as MLA and APA set the form of citations. A basic MLA works-cited entry gives the author, title of the article, title of the website, publisher, date and URL. An in-text citation, such as (Morgan 14) or (Morgan), points to the entry. APA uses the author and year, as in (Morgan, 1916). Whichever style your teacher requires, use it consistently.

Evidence can also span genres. Suppose you are writing about guilt in Macbeth. You can cite Lady Macbeth's sleepwalking scene, in which she rubs her hands and speaks of blood, and pair it with an informational article that explains how chronic stress and guilt disturb sleep. The literary evidence shows how Shakespeare dramatizes the idea, and the informational evidence shows that the idea reflects something true about people. Your job is to introduce each piece, quote or paraphrase it, and explain how the two together support your claim.
`,
  ],
  cards: [
    ["Lateral reading", "Leaving a page to check what other sources say about its author and purpose."],
    ["Bias", "A tendency to favor one side or a reason to do so."],
    ["Plagiarism", "Presenting another person's words, structure or ideas as your own."],
    ["Patchwriting", "Copying a source's sentence structure while swapping some words."],
    ["Paraphrase", "Restating an idea in new words and structure, with a citation."],
    ["Works cited", "A list of full source information at the end of a paper (MLA)."],
    ["In-text citation", "A short note in the body of a paper that points to a source."],
    ["Credibility", "How trustworthy a source is, based on author, evidence and purpose."],
  ],
  closed: [
    [
      "A website for a \"Council for Better Nutrition\" looks neutral. What is the best way to check its credibility?",
      [
        "Read only the About page.",
        "Open new tabs to see who funds it and what other sources say.",
        "Check how many images it has.",
        "Trust it because the name sounds official.",
      ],
      "B",
    ],
    [
      "A student keeps a source's sentence structure and changes a few words. This is",
      [
        "a good paraphrase",
        "patchwriting, a form of plagiarism",
        "a quotation",
        "a summary",
      ],
      "B",
    ],
    [
      "Which is a true paraphrase?",
      [
        "Copying the sentence with a different first word",
        "Restating the idea in new words and sentence structure, with a citation",
        "Using the idea without a citation",
        "Changing the title only",
      ],
      "B",
    ],
    [
      "In MLA style, an in-text citation usually gives",
      [
        "the full web address",
        "the author's name (and often a page number)",
        "the date of the paper",
        "the student's name",
      ],
      "B",
    ],
    [
      "A writer combines Lady Macbeth's sleepwalking scene with an article about sleep and stress. What does this show?",
      [
        "Evidence can be drawn from both literary and informational texts to support one claim.",
        "Literature cannot be cited.",
        "Only articles count as evidence.",
        "The play is a documentary.",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Here is an original sentence: \"The district's dams were designed to hold floodwater only when the river rose, so in normal times the water flowed through unhindered.\" A student writes: \"The dams of the district are built to keep flood water only when the river rises, so in regular times water flows through without hindrance.\" Explain why this is plagiarism, and write a true paraphrase with an in-text citation (author: Morgan).",
      scheme: [
        "Identifies the student's version as patchwriting, with the same structure and synonyms",
        "Notes the lack of a citation",
        "Writes a paraphrase with new structure and wording that keeps the meaning",
        "Includes an in-text citation",
      ],
      model:
        "The student's sentence keeps the original structure and swaps in synonyms, which is patchwriting, and it has no citation. A true paraphrase: Morgan explains that the dams stay open during ordinary river flow and only store water during a flood (Morgan).",
      answers: [
        [
          "full",
          "[[0|The student kept the exact structure of the sentence and just replaced words with synonyms, which is patchwriting and counts as plagiarism.]] [[1|It also has no citation, so the idea is not credited.]] [[2|A better version is that the dams let the river pass freely most of the time and only hold water back during a flood]] [[3|(Morgan).]]",
          "Full marks. Your version changes both the structure and the words, and it credits the source.",
        ],
        [
          "full",
          "[[0|It is plagiarism because it mirrors the original sentence, with synonyms such as regular for normal and hindrance for unhindered.]] [[1|There is also no author credit.]] [[2|My paraphrase: According to the engineer, the dams only work as reservoirs when floodwaters come, and otherwise the river runs as it always has]] [[3|(Morgan).]]",
          "All four marks. Pointing out the specific synonym swaps shows how patchwriting works.",
        ],
        [
          "partial",
          "[[0|The student copied the sentence and changed some words.]] [[1|There's no citation.]] That is plagiarism.",
          "You diagnosed the problem. Now write your own paraphrase with new structure and an in-text citation.",
        ],
        [
          "partial",
          "[[2|The dams only store water during floods and let it pass normally]] [[3|(Morgan).]]",
          "Your paraphrase and citation are good. Explain what was wrong with the student's version.",
          true,
        ],
        [
          "weak",
          "The student is fine because the words are different. A paraphrase only needs different words.",
          "A paraphrase needs new structure too, and a citation. Compare the order of ideas in both sentences.",
        ],
        [
          "weak",
          "[[1|It has no citation.]] I would just add Morgan at the end and it would be fine.",
          "The missing citation is one problem. The structure is also copied. Rewrite the idea in your own sentence.",
        ],
      ],
    },
    {
      prompt:
        "You are writing about guilt in Macbeth. Write a paragraph of four to six sentences that uses (a) a detail from Lady Macbeth's sleepwalking scene and (b) a fact from an invented article on sleep and stress (cite it in parentheses with an author's last name), and explains how together they support the claim: \"Shakespeare shows that guilt takes a physical toll.\"",
      scheme: [
        "States the claim clearly",
        "Uses an accurate detail from the sleepwalking scene",
        "Uses an informational fact with a parenthetical citation",
        "Explains how the two pieces together support the claim",
      ],
      model:
        "Shakespeare shows that guilt takes a physical toll. In the sleepwalking scene, Lady Macbeth rubs her hands and cries out about a spot she cannot remove, even though she is asleep. Researchers report that chronic stress and guilt can disrupt sleep and raise heart rate (Alvarez). The two pieces together show that the play's picture of a guilty conscience agrees with real effects on the body.",
      answers: [
        [
          "full",
          "[[0|Shakespeare shows that guilt takes a toll on the body.]] [[1|In the sleepwalking scene, Lady Macbeth rubs her hands and talks about a spot of blood even though she is asleep.]] [[2|A sleep researcher reports that guilt and chronic stress interfere with deep sleep and raise anxiety (Alvarez).]] [[3|Putting them together, the play and the research both show that guilt does not stay in the mind, because it reaches the body and breaks up rest.]]",
          "Full marks. Your last sentence explains the connection instead of leaving the two pieces side by side.",
        ],
        [
          "full",
          "[[0|Guilt in Macbeth is not just a feeling, it is a physical condition.]] [[1|Lady Macbeth rubs her hands as if she is washing them and says there is still a smell of blood.]] [[2|According to a study on stress, people with unresolved guilt often sleep poorly and show higher heart rates (Brooks).]] [[3|The scene and the study agree that guilt can break rest and show up in the body, so Shakespeare's picture is believable.]]",
          "All four marks. \"Believable\" is a nice way to describe why the pairing works.",
        ],
        [
          "partial",
          "[[0|Shakespeare shows that guilt has a physical effect.]] [[1|Lady Macbeth sleepwalks and rubs her hands.]] It is a sad scene.",
          "Claim and literary evidence are good. Add an informational fact with a citation and explain how the two work together.",
        ],
        [
          "partial",
          "[[2|A study says guilt disturbs sleep (Nguyen).]] [[3|That matches what happens to Lady Macbeth.]]",
          "Informational evidence and connection are strong. State the claim and give a specific detail from the scene.",
          true,
        ],
        [
          "weak",
          "Guilt is bad. Lady Macbeth feels guilt and it makes her sad. Studies say guilt is bad too.",
          "This does not use specific evidence. Name what she does in the scene and give a cited fact.",
        ],
        [
          "weak",
          "[[0|Shakespeare shows guilt is physical.]] I read it on a website that I do not remember and it said the same thing.",
          "A claim needs evidence that you can cite. Use the scene and an article with an author.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Presenting reasoning clearly; colons, semicolons and careful finishing",
  note: `
## Objectives

Students will be able to:

1. present findings clearly and logically so that listeners can follow the line of reasoning;
2. use a colon or semicolon correctly, and spell and punctuate with care in finished work.

## Materials

A presentation rubric, a colon-and-semicolon handout with advanced cases, an editing passage with ten errors, and student research notes.

## Starter (8 minutes)

Project two versions of a sentence: "The dams worked, the district was effective." and "The dams worked; the district was effective." Ask which is correct, and what error the first contains (a comma splice).

## Main activity

1. Presentation structure: a hook, a thesis stated aloud, signposts, evidence for each point with its source named, and a conclusion that answers the research question. Discuss pacing and how to cite orally ("According to the Miami Conservancy District's report ...").
2. Practice in groups of four. Each student gives a ninety-second version of their findings. Peers score the line of reasoning (can I name the three points?) and give one revision.
3. Punctuation lab. Review colons for introduction and explanation, semicolons for related independent clauses, semicolons in lists with internal commas, and the misuse of semicolons before dependent clauses.
4. Editing passage: students correct ten errors in spelling and punctuation, then explain two corrections in writing.

## Checking for understanding

A quick check: students identify whether five punctuated sentences are correct.

## Exit ticket

One sentence with a correct semicolon and one with a correct colon, about your research.
`,
  reading: [
    "Making the reasoning audible, and finishing with care",
    `
When a reader loses the thread of an argument, they can go back and look again. A listener cannot. The best speakers know this and build their reasoning to be heard. They state the question at the start, tell the audience what the answer is, and signal each step. A phrase such as "My first reason is," followed by evidence and a short summary, lets listeners follow even if their attention drifts. Naming the source aloud ("According to Arthur Morgan's 1916 report") gives the claim authority and shows the speaker has done the work. At the end, the speaker returns to the original question and answers it in a sentence.

Pacing and delivery matter too. Slow down for numbers and quotations. Pause before the main point. Look at the audience, not the slides, and use visuals that add something: a map, a graph, a photograph. Practice aloud, with a timer, so you can adjust the length.

In writing, careful finishing is the mark of a serious writer. Two pieces of punctuation deserve special attention.

A **colon** introduces what follows a complete sentence: a list, an explanation or a quotation. "The district had three tools: dams, a taxing power and a plan." A colon should not interrupt a sentence that is incomplete; "The district had: dams" is wrong. A **semicolon** joins two independent clauses that are closely related: "The levees failed; the dams held." It also separates items in a series when those items contain commas: "The speakers were Arthur Morgan, an engineer; Edward Deeds, an industrialist; and John Patterson, a manufacturer." Do not use a semicolon before a dependent clause, as in "The dams worked; because they were well designed." A comma splice, two independent clauses joined with only a comma, can be fixed with a semicolon, a period, or a conjunction.

Finally, edit for spelling and usage. Keep a personal list of words you misspell. Common troublemakers include "affect/effect," "its/it's," "principal/principle" and "definitely." Read your final draft aloud or backward, one sentence at a time, to catch errors that your eye skips. Finished work shows respect for the reader, and in a presentation or a paper, it earns their trust.
`,
  ],
  cards: [
    ["Comma splice", "Two independent clauses joined with only a comma."],
    ["Colon", "Punctuation that introduces a list, explanation or quotation after a complete sentence."],
    ["Semicolon", "Punctuation that joins related independent clauses or separates list items containing commas."],
    ["Signpost", "A phrase that tells listeners where you are in the argument."],
    ["Oral citation", "Naming the source aloud when presenting evidence."],
    ["Series", "A list of three or more items in a sentence."],
    ["Proofread", "To read a final draft carefully for errors."],
    ["Affect/effect", "Affect is usually a verb meaning to influence; effect is usually a noun meaning a result."],
  ],
  closed: [
    [
      "Which sentence is punctuated correctly?",
      [
        "The dams held, the levees failed.",
        "The dams held; the levees failed.",
        "The dams held; because the levees failed.",
        "The dams held: the.",
      ],
      "B",
    ],
    [
      "Which sentence uses a colon correctly?",
      [
        "The district had: dams and a plan.",
        "The district had two strengths: its dams and its power to tax.",
        "The district: had two strengths.",
        "The district had two strengths: and.",
      ],
      "B",
    ],
    [
      "Which sentence correctly uses semicolons in a series?",
      [
        "We visited Dayton, Ohio; Louisville, Kentucky; and Cincinnati, Ohio.",
        "We visited Dayton, Ohio, Louisville, Kentucky, and Cincinnati, Ohio.",
        "We visited Dayton; Ohio, Louisville; Kentucky.",
        "We visited: Dayton, Ohio; Louisville.",
      ],
      "A",
    ],
    [
      "Which phrase best serves as an oral citation?",
      [
        "Somebody said",
        "According to the Miami Conservancy District's 1920 report",
        "Everyone knows",
        "I read it somewhere",
      ],
      "B",
    ],
    [
      "Which is the correct choice? \"The flood had a lasting ____ on engineering.\"",
      ["affect", "effect", "affected", "affects"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Correct each error and explain the rule. (1) \"The levees failed, the dams held.\" (2) \"The speakers were an engineer, Arthur Morgan, a businessman, Edward Deeds, and a mayor.\" (3) \"The district had: dams, taxes and plans.\"",
      scheme: [
        "Fixes the comma splice in (1) and names the error",
        "Fixes the series in (2) with semicolons or by revising and explains",
        "Fixes (3) by removing the colon or completing the sentence, with an explanation",
        "Gives accurate rule explanations for each correction",
      ],
      model:
        "(1) The levees failed; the dams held. The original is a comma splice, two independent clauses joined with a comma. (2) The speakers were an engineer, Arthur Morgan; a businessman, Edward Deeds; and a mayor. Semicolons separate the items because they contain commas. (3) The district had dams, taxes and plans, or The district had three tools: dams, taxes and plans. A colon must follow a complete sentence.",
      answers: [
        [
          "full",
          "(1) [[0|The levees failed; the dams held. The original is a comma splice because it joins two independent clauses with just a comma.]] (2) [[1|The speakers were an engineer, Arthur Morgan; a businessman, Edward Deeds; and a mayor. I used semicolons since the items already have commas inside them.]] (3) [[2|The district had three tools: dams, taxes and plans.]] [[3|A colon needs a complete sentence before it, so I added three tools to complete it.]]",
          "Full marks. Your explanation of why the semicolons are needed in (2) is the hardest part and you got it.",
        ],
        [
          "full",
          "(1) [[0|The levees failed, but the dams held. A comma alone cannot join two sentences, so I added a conjunction.]] (2) [[1|The speakers were an engineer, Arthur Morgan; a businessman, Edward Deeds; and a mayor. The semicolons keep the groups clear.]] (3) [[2|The district had dams, taxes and plans.]] [[3|I removed the colon because what comes before it was not a complete sentence.]]",
          "All four marks. Choosing a conjunction in (1) is also correct; a semicolon was not the only repair.",
        ],
        [
          "partial",
          "(1) [[0|The levees failed; the dams held. It was a comma splice.]] (2) The speakers were an engineer, Arthur Morgan, a businessman, Edward Deeds, and a mayor. (3) The district had dams, taxes and plans.",
          "Number 1 is right with the rule named. Number 2 needs semicolons, and number 3's fix should include the rule.",
        ],
        [
          "partial",
          "(1) The levees failed, the dams held. (2) [[1|The speakers were an engineer, Arthur Morgan; a businessman, Edward Deeds; and a mayor.]] (3) [[2|The district had three tools: dams, taxes and plans.]]",
          "Two excellent corrections. Number 1 is still a comma splice, and each correction should come with the rule.",
          true,
        ],
        [
          "weak",
          "(1) The levees failed: the dams held. (2) The speakers were an engineer, Arthur Morgan, a businessman, Edward Deeds, and a mayor. (3) The district had; dams, taxes and plans.",
          "Check what each mark does. A colon introduces, a semicolon joins sentences, and neither belongs in the middle of a list the way you have it.",
        ],
        [
          "weak",
          "(1) [[0|The levees failed; the dams held.]] (2) is already correct. (3) is correct because colons introduce lists.",
          "Number 1 is right. In 2 the items contain commas so semicolons are needed, and in 3 the colon follows an incomplete sentence.",
        ],
      ],
    },
    {
      prompt:
        "Prepare the opening ninety seconds of a presentation of your research on the Great Dayton Flood. Write the hook, the thesis stated aloud, a preview with signposts, and one oral citation. Then explain why each part helps listeners follow your reasoning.",
      scheme: [
        "Writes an engaging hook",
        "States the thesis clearly aloud",
        "Previews the points with signposts",
        "Includes an oral citation and explains how the parts help listeners",
      ],
      model:
        "Hook: In March 1913, a river took a city by surprise. Thesis: After that flood, Dayton replaced separate levees with a regional system of dry dams and a district that shared the cost. Preview: First I will explain why the levees failed. Second, I will explain the dams. Finally, I will explain how the district was paid for. According to engineer Arthur Morgan's report, the dams hold water only in a flood. Each part tells listeners where we are going and where we are.",
      answers: [
        [
          "full",
          "[[0|Hook: In March of 1913 a river took a city by surprise.]] [[1|Thesis: After that flood, Dayton replaced separate levees with a regional system of upstream dams and a district that shared the cost.]] [[2|First I will explain why the levees failed. Second, I will explain how the dry dams work. Finally, I will explain how the district was paid for.]] [[3|According to Arthur Morgan's report, the dams only hold water when the river is in flood. I opened with the hook to get attention, and the thesis and signposts let listeners know the three points to follow, and the citation shows that my evidence is credible.]]",
          "Full marks. You explained the purpose of each piece, which shows that you are planning for the listener.",
        ],
        [
          "full",
          "[[0|What would you do if a river rose twenty feet overnight?]] [[1|My thesis is that the 1913 flood led Dayton to build a new type of flood control with upstream dams, a legal district and shared costs.]] [[2|First, why the old levees failed. Next, how the dams work. Last, who paid.]] [[3|As Arthur Morgan wrote in his report, the system had to protect the whole valley. The question gets attention, the thesis states the answer, and the signposts mean the audience always knows where we are, while naming Morgan shows where the evidence comes from.]]",
          "All four marks. Starting with a question the audience can picture is a strong hook.",
        ],
        [
          "partial",
          "[[0|In 1913 a flood hit Dayton.]] [[1|My thesis is that Dayton built a new system afterward.]] I will talk about it.",
          "Your hook and thesis are present. Add signposts and an oral citation, and explain why they help.",
        ],
        [
          "partial",
          "[[2|First, the failure of the levees. Second, the dams. Third, the financing.]] [[3|According to a historian, the dams were built in the early 1920s.]]",
          "Good signposts and citation. Add a hook and a thesis, and explain the purpose of each part.",
          true,
        ],
        [
          "weak",
          "Hello, today I will tell you everything I learned. There are a lot of facts, and I will go through them one by one without stopping.",
          "A presentation needs a structure for listeners. Add a hook, a thesis, signposts and a source named aloud.",
        ],
        [
          "weak",
          "[[0|Imagine a flooded city.]] Then I will read my paper. It is long but it is good.",
          "The hook is a good start. Reading a paper is hard to follow by ear. Plan a thesis, signposts and citation instead.",
        ],
      ],
    },
  ],
};

writeCourse("honors-english-10-grade-10.json", "Honors English 10", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
