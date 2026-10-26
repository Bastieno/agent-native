import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * English 10, Grade 10, Quarter 1. Standards: Common Core State Standards,
 * English Language Arts, Grade 10 (RL, RI, W, SL, L), in the school's own
 * words. Anchor texts: Lord of the Flies (short phrases only), Julius Caesar
 * (Shakespeare), the Gettysburg Address, the Declaration of Independence and
 * the Declaration of Sentiments (Seneca Falls, 1848).
 */

const w1: WeekInput = {
  topic: "Evidence, theme and character in Lord of the Flies",
  note: `
## Objectives

Students will be able to:

1. cite the strongest textual evidence for an interpretation of a longer work, and mark where the text is ambiguous;
2. follow a theme across a novel and explain how it is developed through characters and events;
3. analyze how complex characters relate to one another and to the larger conflict.

## Materials

Class novels (Lord of the Flies, chapters 1 to 6 read), a character relationship web, and the evidence ranking sheet.

## Starter (8 minutes)

Ask: "On an island with no adults, who would you follow, and why?" Take three answers and list the qualities students value: strength, fairness, ideas, fun. Tell them that in the novel three boys, Ralph, Jack and Piggy, offer different answers.

## Main activity

1. Draw the relationship web on the board with Ralph, Jack, Piggy and Simon at the corners. Students label each line with a verb: Ralph depends on Piggy's ideas but laughs at him in front of the others; Jack challenges Ralph for control.
2. Evidence ranking. Given the claim "Ralph is a flawed leader," students rank five quotations or events from strongest to weakest and explain the ranking.
3. Theme tracking: students choose civilization versus savagery or the loss of innocence and gather one moment from the early, middle and later chapters.
4. Mark an ambiguous moment (for example, whether the boys' first kill is shown with pride or fear). Discuss why the text can support two readings.

## Checking for understanding

Whiteboards: write a one-sentence claim about a character and hold up the page number of your best evidence.

## Exit ticket

Name one thing the novel leaves unclear and the two readings it allows.
`,
  reading: [
    "Four boys, four answers to the same question",
    `
In William Golding's Lord of the Flies, a group of British schoolboys survive a plane crash on an uninhabited island, and the novel asks what happens when the rules of a society disappear. Instead of one answer, Golding offers several, each carried by a character. To read the book well, you need to track not only what the characters do but what they stand for and how they push against each other.

Ralph is elected leader because he blows the conch, and the conch becomes a symbol of order and the right to speak. Ralph wants rescue and a signal fire. Piggy, who is smart but mocked for his weight, his asthma and his glasses, supplies the thinking: he knows that the fire matters, and he insists on rules. Jack, the head of the choir, wants to hunt. His appeal is excitement. He offers meat, masks and a feeling of power, and as the boys lose faith in the fire, more of them drift to his side. Simon, quiet and gentle, is the one who sees the truth about the "beast": that the fear is inside the boys.

These characters are connected by the novel's main conflict, between the desire for order and the pull of savagery. Ralph and Jack are not simple heroes and villains. Ralph also hunts, and in a chapter that readers often find disturbing, he joins a frenzy in which the boys attack Simon. A strong argument will notice such moments and say what they mean. The text can support more than one reading of whether Ralph is a good leader: he cares about rescue, but he cannot keep the boys' attention, and he shows moments of temper. When the evidence points two ways, a careful reader says so.

When you build an argument, rank your evidence. A quotation from a single scene might show a character's mood, but a pattern across several chapters shows who the character is. For the claim "Jack's leadership grows from the boys' fear," stronger evidence would be the way the group's fear of the beast increases Jack's power. Weaker evidence would be a description of his hair color. The strongest evidence is specific, representative, and hard to explain any other way.

A theme is carried by those choices: when order seems boring or hard, people may choose what feels exciting, even when it harms them. The novel does not state it. It lets you watch.
`,
  ],
  cards: [
    ["Textual evidence", "A quotation, detail or event from the text used to support a claim."],
    ["Ambiguity", "A feature of a text that can reasonably be read in more than one way."],
    ["Symbol", "An object, person or place that stands for a larger idea, such as the conch for order."],
    ["Theme", "A central idea about life or people that a work develops."],
    ["Foil", "A character who contrasts with another to bring out their qualities."],
    ["Allegory", "A story in which characters and events stand for larger ideas or situations."],
    ["Complex character", "A character with several, sometimes conflicting, traits and motives."],
    ["Conflict", "A struggle between opposing forces that drives the plot."],
  ],
  closed: [
    [
      "In the novel, what does the conch most clearly symbolize?",
      [
        "Wealth",
        "Order and the right to speak",
        "The beast",
        "Rescue by a ship",
      ],
      "B",
    ],
    [
      "A student claims, \"Jack gains power by using the boys' fear.\" Which evidence is strongest?",
      [
        "Jack leads the choir.",
        "As the boys grow more afraid of the beast, more of them join Jack's hunters, who promise protection and meat.",
        "Jack has red hair.",
        "Jack and Ralph both say they want to be leader.",
      ],
      "B",
    ],
    [
      "Why are Ralph and Piggy a good pair for analysis?",
      [
        "They are identical in every trait.",
        "Piggy supplies thinking and Ralph supplies leadership, so their relationship shows how order depends on both.",
        "They never speak to each other.",
        "They are enemies from the first chapter.",
      ],
      "B",
    ],
    [
      "Why might a reader say the text is ambiguous about whether Ralph is a good leader?",
      [
        "He is absent from most chapters.",
        "He wants rescue and builds shelters, but he also loses focus and joins a violent frenzy.",
        "He always makes the right decision.",
        "Golding never mentions him.",
      ],
      "B",
    ],
    [
      "Which statement is a theme rather than a topic?",
      [
        "Boys on an island",
        "Leadership",
        "When order feels hard and fear grows, people may choose excitement over rules, even to their own harm.",
        "The pilot is dead.",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Make a claim about Jack's rise to power in Lord of the Flies. Support it with the strongest piece of evidence you can recall from the novel, explain why that evidence is stronger than another detail you could have chosen, and name one thing about Jack that the text leaves open to interpretation.",
      scheme: [
        "States an arguable claim about Jack's rise to power",
        "Gives a specific piece of evidence from the novel",
        "Explains why this evidence is stronger than another choice",
        "Identifies an ambiguity or point open to interpretation",
      ],
      model:
        "Jack gains power because he turns the boys' fear into loyalty. As the fear of the beast grows, he offers hunting, meat and the safety of a group that acts, and the boys leave Ralph's fire for his feasts. This evidence is stronger than his appearance or his title as choir leader because it shows a pattern of boys choosing him over time. The novel leaves open whether Jack enjoys power for its own sake or fears being weak himself.",
      answers: [
        [
          "full",
          "[[0|Jack takes power because he gives frightened boys something to do about their fear.]] [[1|The beast scares everyone, and Jack's hunters get meat and a chant and a feeling of being protected, so more and more boys go to his side.]] [[2|That is stronger than saying he was the choir leader because it shows boys actually choosing him again and again, not just starting with a title.]] [[3|It's less clear if Jack really wants to control people or if he is trying to prove he isn't weak, and the book doesn't say.]]",
          "Full marks. Your claim comes from a pattern, not from a single scene, and the ambiguity you raised is a real one.",
        ],
        [
          "full",
          "[[0|Jack rises because Ralph's way of leading is slow and boring compared to his.]] [[1|When Ralph wants everyone to keep the signal fire and build shelters, a lot of the boys sneak off to hunt, and eventually they follow Jack to the feast.]] [[2|I picked this over his red hair or his temper because it shows the boys making a choice, which explains his power.]] [[3|You could read Jack as a villain, but the text also shows he is scared of failing in front of the others, so it's open.]]",
          "All four marks. Showing why you chose this evidence is the step students most often skip.",
        ],
        [
          "partial",
          "[[0|Jack becomes powerful by getting the boys to fear the beast.]] [[1|He gets them to join his hunters by promising meat.]] He is also kind of mean.",
          "Your claim and evidence are good. Explain why this evidence beats another option, and say what in the text could be read two ways.",
        ],
        [
          "partial",
          "[[2|I chose the part about the hunters getting meat because it's more important than what Jack looks like.]] [[3|You can't tell if Jack is brave or just scared.]]",
          "You showed ranking and ambiguity. Begin with a clear claim and name the specific evidence.",
          true,
        ],
        [
          "weak",
          "Jack is the leader because he is the oldest and the biggest. The book doesn't leave anything open.",
          "Jack is not the oldest boy, and the novel leaves many things open. Think about how the boys' choices change.",
        ],
        [
          "weak",
          "[[0|Jack wins power.]] The reason is that Ralph is boring and I like Jack more.",
          "A claim about the novel needs evidence from the text, not preference. Which events show boys choosing Jack?",
        ],
      ],
    },
    {
      prompt:
        "Choose two characters from Lord of the Flies and explain how their relationship develops the novel's central conflict between order and savagery. Include a specific moment from the text.",
      scheme: [
        "Names two characters and describes their relationship accurately",
        "Gives a specific moment from the text that shows it",
        "Explains how the relationship represents order versus savagery",
        "Shows how the relationship changes or complicates the conflict",
      ],
      model:
        "Ralph and Piggy represent order and thought: Ralph leads, and Piggy gives ideas and insists on rules. In the scene where Jack's boys break Piggy's glasses and take them, the group loses its means of making fire and Piggy's voice is ignored. This shows order losing to force. The relationship is complicated because Ralph sometimes mocks Piggy in front of the others, so even the side of order is not perfect.",
      answers: [
        [
          "full",
          "[[0|Ralph and Piggy work together, with Ralph the elected leader and Piggy the thinker who knows what to do but isn't listened to.]] [[1|When Jack's group steals Piggy's glasses so they can make fire, it shows the thinking side being overpowered.]] [[2|Their friendship stands for order and reason, and Jack's takeover of the glasses stands for savagery winning.]] [[3|But Ralph sometimes lets the others laugh at Piggy, which shows that even the orderly side fails the people who need it.]]",
          "Full marks. The last sentence complicates the conflict instead of simply restating it.",
        ],
        [
          "full",
          "[[0|Jack and Ralph are rivals, because Ralph was elected with the conch and Jack wanted to lead the whole time.]] [[1|The moment that shows it is when Jack calls his own meeting and walks off with the hunters, leaving Ralph with only a few boys.]] [[2|Ralph is the rule of order and Jack is the pull toward hunting and violence.]] [[3|It gets complicated because Ralph does join in the dance where Simon dies, so he is not purely on the side of order.]]",
          "All four marks. You spotted that the conflict runs inside Ralph as well.",
        ],
        [
          "partial",
          "[[0|Ralph and Jack are enemies and want to be leader.]] [[1|Jack leaves with the hunters.]] They are very different.",
          "Good start with accurate details. Explain how they stand for order and savagery and how their relationship shifts.",
        ],
        [
          "partial",
          "[[2|Piggy and Ralph are the side of order and rules.]] [[3|But Ralph isn't always nice to Piggy so it's not so simple.]]",
          "Your analysis is strong. Add a specific moment from the text to prove it.",
          true,
        ],
        [
          "weak",
          "Ralph and Piggy are friends. They are on the island together. They live in shelters.",
          "These are true but they do not connect to the conflict. Ask what Ralph and Piggy stand for.",
        ],
        [
          "weak",
          "[[0|Jack and Simon are different, since Simon is quiet and Jack is loud.]] Simon represents hunting.",
          "You describe them accurately. Simon does not represent hunting. Reread what Simon discovers about the beast.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Repeated images, symbols and structure in Lord of the Flies",
  note: `
## Objectives

Students will be able to:

1. analyze the effect of repeated words, images and symbols on meaning and mood;
2. explain how the structure of a novel, including its chapters and turning points, shapes its effect.

## Materials

Class novels, a symbol tracker (conch, fire, glasses, the beast, face paint), and a chapter map strip.

## Starter (8 minutes)

Project two images: a lit signal fire and a dying fire. Ask: "What mood does each give? What would a story say by showing fire first one way and then the other?"

## Main activity

1. Symbol tracker. In groups, students trace one object across at least four chapters, noting what it means when it first appears and what it means later. Groups present.
2. Mini-lesson: motif. A symbol can appear once; a motif repeats. Fire appears again and again as hope, then destruction. Students find two places where fire changes meaning.
3. Structure. Mark the chapter map: opening (arrival), rising action (building the fire, the first fear), turning point (Simon's death and the splitting of the group), climax (the hunt for Ralph), and ending (the officer). Students describe how the pace changes.
4. Short writing: how the novel's ending reframes the opening.

## Checking for understanding

Hold up a card showing one of the symbols. Classmates give its early meaning and its late meaning.

## Exit ticket

Choose one symbol and write one sentence about how its meaning changes.
`,
  reading: [
    "How objects mean more as the novel goes on",
    `
A symbol is an object that stands for something larger, but the best symbols in a long novel do not keep one meaning. They change as the story moves. In Lord of the Flies, a handful of objects carry much of the book's meaning, and following them from chapter to chapter is a way to see the structure of the whole.

The conch begins as a tool for calling the boys together. When Ralph blows it, the boys gather, and whoever holds it can speak. It stands for order, law and civilized talk. As the boys lose interest in meetings, the conch's power fades. In the end it is shattered at the very moment when a boy is killed, and the shell's destruction signals the end of rules on the island. The meaning of the conch does not change; it is lost, and loss is the point.

Fire works in the opposite way, as a **motif**, an image that repeats and builds. At first the fire is hope: it is a signal to ships. But the first great fire spreads out of control and probably kills a small boy. Later the fire becomes a cooking fire, then a tool of hunting. At the climax it is a weapon: Jack's boys set the island ablaze to force Ralph out. The same image has traveled from rescue to destruction, and the ship that finally appears is drawn by that very blaze. Golding makes the reader notice an irony: the fire the boys lit to save themselves is what finally brings rescue only after it has nearly killed one of them.

Piggy's glasses are another changing symbol. They represent reason and science because they make fire, but they are also fragile. When Jack's tribe steals them, it shows that violence can seize the tools of intelligence without understanding how to use them.

Structure matters here. The novel moves from arrival to order, then to doubt, then to fear, and finally to chaos. The turning point comes with the death of Simon, who understood that the beast was inside the boys. After that, the pace rushes toward the climax. The naval officer's arrival at the end shifts the lens: the savages become children again, and Ralph weeps for the end of innocence. The ending reframes the opening: a story that began with an escape from adult war ends with an adult war ship, and the reader is left to consider whether the adults are any different.
`,
  ],
  cards: [
    ["Motif", "An image, idea or object that repeats and builds meaning through a work."],
    ["Symbol", "Something that stands for a larger idea."],
    ["Structure", "How a work is organized: the order of its chapters, acts or events."],
    ["Turning point", "The moment when the story's direction changes decisively."],
    ["Climax", "The point of highest tension, when the central conflict peaks."],
    ["Irony", "A contrast between expectation and outcome."],
    ["Mood", "The feeling a text creates in the reader."],
    ["Reframe", "To cause a reader to see earlier events in a new light."],
  ],
  closed: [
    [
      "In Lord of the Flies, why is the destruction of the conch significant?",
      [
        "It proves the island is unsafe.",
        "It marks the final collapse of order and the right to speak.",
        "It shows that Ralph has won.",
        "It signals that the boys are rescued.",
      ],
      "B",
    ],
    [
      "How does the meaning of fire change across the novel?",
      [
        "It stays a symbol of hope in every chapter.",
        "It begins as a signal of hope and becomes a tool of destruction.",
        "It is never mentioned again after the first chapter.",
        "It first means danger, then rescue, and then nothing.",
      ],
      "B",
    ],
    [
      "Piggy's glasses are stolen by Jack's group. What does this event suggest?",
      [
        "Glasses are fashionable.",
        "Violence can seize the tools of reason without understanding them.",
        "Jack wants to help Piggy see.",
        "The glasses are not important.",
      ],
      "B",
    ],
    [
      "A motif differs from a symbol because a motif",
      [
        "appears once",
        "repeats and builds meaning across a work",
        "is always a person",
        "is always a place",
      ],
      "B",
    ],
    [
      "How does the arrival of the naval officer reframe the novel?",
      [
        "It shows the boys were always safe.",
        "It reveals the adults are engaged in war too, so civilization is not as separate from savagery as it seemed.",
        "It proves Jack was right.",
        "It makes the earlier events a dream.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose one symbol or motif from Lord of the Flies (the conch, fire, Piggy's glasses, or face paint). Explain how its meaning changes between an early and a late moment in the novel, and what that change does to the reader's mood.",
      scheme: [
        "Identifies the symbol or motif and its early meaning with a specific moment",
        "Describes its later meaning with a specific moment",
        "Explains how the change develops the novel's meaning",
        "Explains the effect on the reader's mood",
      ],
      model:
        "Fire starts as a signal of hope when the boys build it on the mountain to attract a ship. Later, Jack's tribe uses fire to hunt Ralph, setting the island ablaze, so it has become a weapon. The change shows how the boys' goals shift from rescue to cruelty. The reader's mood moves from hopeful to uneasy and then to horror.",
      answers: [
        [
          "full",
          "[[0|At the beginning the fire is the signal on the mountain that is meant to get a ship to rescue them.]] [[1|At the end Jack's tribe sets the whole island on fire to smoke Ralph out, so now it's a weapon.]] [[2|The change shows how the boys went from wanting to go home to wanting to hurt each other.]] [[3|When the fire is hope you feel optimistic, and when it burns the island you feel dread, so the mood goes from hope to horror.]]",
          "Full marks. Your two moments are specific and the mood shifts as the meaning does.",
        ],
        [
          "full",
          "[[0|The conch starts as the way Ralph calls everyone together, and whoever holds it is allowed to speak, so it means order.]] [[1|Later Roger rolls the rock that smashes it when Piggy is killed, so the conch is gone for good.]] [[2|Its destruction shows that rules and talking have been replaced by violence.]] [[3|The mood changes from calm and hopeful to grim and empty, because the shell was the last thing keeping order.]]",
          "All four marks. You tied the symbol's end to the larger collapse.",
        ],
        [
          "partial",
          "[[0|The fire is how they signal for rescue at first.]] [[1|Later it burns down the island.]] It changes.",
          "You have both moments. Explain what the change shows about the boys, and describe the effect on the mood.",
        ],
        [
          "partial",
          "[[2|The glasses show how reason is taken by force.]] [[3|It makes you feel sad and angry.]]",
          "Good meaning and mood. Describe an early moment, such as making fire, and a late one, such as the theft, so the change is visible.",
          true,
        ],
        [
          "weak",
          "Fire is just fire. It means they cook food and stay warm, and the mood is warm.",
          "In the novel, fire does more than keep them warm: it is a signal, then a weapon. Look at the scene where the island burns.",
        ],
        [
          "weak",
          "[[0|The conch is used to call meetings.]] It stays the same all the way through because it is a shell.",
          "You name the early use. Look at what happens to the conch at the end, and ask what that shows.",
        ],
      ],
    },
    {
      prompt:
        "Explain how Golding's structure shapes the effect of the novel. Identify the turning point, say how the pace changes after it, and explain how the ending reframes the opening.",
      scheme: [
        "Identifies a turning point, such as the death of Simon, and says why it matters",
        "Describes how the pace or tension changes after it",
        "Explains how the ending (the naval officer) reframes the opening",
        "Connects the structure to the novel's meaning",
      ],
      model:
        "The turning point is Simon's death, after which the group breaks apart and the pace speeds toward the hunt for Ralph. The chapters become shorter and more urgent. At the end, the naval officer appears, and his warship reminds the reader that the adults are fighting a war too. This reframes the opening, in which the boys escape war, and suggests that savagery is not confined to children or to the island.",
      answers: [
        [
          "full",
          "[[0|The turning point is when Simon gets killed in the dance, because after that there is no going back to the rules.]] [[1|After it the story speeds up, and everything moves toward the chase of Ralph without any more meetings.]] [[2|The officer arriving at the end makes you remember the war the boys were escaping, so the opening looks different, since the grown-ups are no better.]] [[3|So the structure supports the idea that savagery is in all people.]]",
          "Full marks. Your final sentence connects the structure to meaning, which is what turns a summary into analysis.",
        ],
        [
          "full",
          "[[0|A turning point is the night Simon dies and the group splits.]] [[1|Before it there were still meetings and attempts at rules, and after it the tension rises quickly toward the end.]] [[2|At the end the officer in his uniform with his warship makes Ralph and the boys look like children again, and it reminds us the story began because of a war.]] [[3|This tells us the book is about all of civilization, not just boys.]]",
          "All four marks. Looking back to the plane crash and the war is the right move.",
        ],
        [
          "partial",
          "[[0|The turning point is Simon's death.]] [[1|After that the pace gets faster.]] The ending is when they get rescued.",
          "Good on the turning point and pace. Explain what the rescue says about the opening and the meaning of the book.",
        ],
        [
          "partial",
          "[[2|The officer showing up at the end makes the whole thing feel different because he is also part of a war.]] [[3|It shows that the problem is bigger than the island.]]",
          "Strong idea about the ending. Identify the turning point and how the pace changed to complete the structure analysis.",
          true,
        ],
        [
          "weak",
          "The book is organized by chapters and has twelve of them. The ending is the last chapter.",
          "That describes the format, not the effect. Think about where the story changes direction and what the ending adds.",
        ],
        [
          "weak",
          "[[0|The turning point is when they get to the island.]] Nothing changes after that.",
          "A great deal changes after they arrive, and arrival is the start of the plot. Look for a moment after which the story cannot go back.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "From page to stage: Julius Caesar and Antony's funeral speech",
  note: `
## Objectives

Students will be able to:

1. compare a written scene with a staged or filmed version and explain what each interpretation emphasizes;
2. read and comprehend a range of grade-level literature, independently and with growing stamina.

## Materials

Copies of Julius Caesar (Act 3, Scene 2), two short clips or described productions of Antony's speech (one in classical dress and one in a modern political setting), and a comparison chart.

## Starter (8 minutes)

Ask: "A friend says, 'I'm not mad at you.' Say it three ways, so it means three different things." Let volunteers perform. Make the point that tone and gesture can change a sentence's meaning.

## Main activity

1. Read Antony's speech on the page, lines 75 to 110 or so, aloud as a class. Annotate: where does Antony seem humble, where does he turn the crowd, and what does he repeat?
2. View or hear two interpretations. Chart choices: setting, costume, speed, pauses, where the actor looks, how the crowd reacts.
3. Discuss what each staging emphasizes. A classical staging may stress the rule of Rome; a modern rally staging may stress the way politicians manipulate crowds.
4. Stamina routine: silent reading of the next ten pages with a two-sentence summary after each page.

## Checking for understanding

On a Venn diagram, record one thing both productions share and one thing each emphasizes.

## Exit ticket

Which staging do you find more persuasive about Antony, and what choice made you think so?
`,
  reading: [
    "The same words, two different speeches",
    `
Shakespeare's plays were written to be performed, and every performance is an interpretation. The text gives words and some stage directions, but not a tone of voice or a pause. When a director and actor decide how to say a line, they are making an argument about its meaning. Comparing a scene on the page with a staged version is a way of seeing what the words allow.

The funeral speech of Mark Antony, in Act 3, Scene 2 of Julius Caesar, is a good test. Brutus, one of the men who killed Caesar, has just persuaded the Roman crowd that the murder was necessary to protect liberty. Antony then rises to speak, with the permission of Brutus, who has promised not to blame the assassins. He begins with a line that sounds humble: "I come to bury Caesar, not to praise him." Then, instead of praising, he lists Caesar's deeds and repeats that Brutus is "an honorable man." The more often he says it, the more it sounds like sarcasm. By the end of the scene, the crowd is shouting for revenge.

On the page, a reader can see the technique in the repetition and the way Antony uses a will and Caesar's wounds to move the audience. A performance has to decide the tone. One production might have an actor in a toga on a marble platform, speaking slowly and with dignity, the crowd silent until it is not. Another might set the scene at a modern rally, with microphones, flags and an actor who smiles for the cameras and lets the repetition turn mocking. The first version stresses the Roman setting and the tragedy of a republic. The second stresses the idea that crowds are easy to move and that rhetoric can be a weapon, a theme that feels current.

Neither version is wrong. Each chooses certain meanings the text allows. Strong readers ask which choices a performance makes (pace, silences, gestures, setting, reactions of the crowd), what each choice emphasizes, and which interpretation seems most faithful to the whole play.

Reading a difficult play also builds stamina. Shakespeare's sentences are long, and the vocabulary is unfamiliar. The habit that helps is to read a few lines, say them in your own words, and then continue. Over several pages, the meaning builds, and a play that began as a puzzle becomes a story you can follow.
`,
  ],
  cards: [
    ["Interpretation", "A particular reading of a text, shown in a performance or an essay."],
    ["Stage directions", "Instructions in a script about movement, tone and setting."],
    ["Repetition", "Using a word or phrase again for emphasis or effect."],
    ["Verbal irony", "Saying one thing while meaning another, often the opposite."],
    ["Rhetoric", "The art of using language to persuade."],
    ["Soliloquy", "A speech by a character alone on stage, revealing thoughts."],
    ["Blocking", "Where and how actors move on stage."],
    ["Stamina (reading)", "The ability to keep reading a challenging text with understanding."],
  ],
  closed: [
    [
      "Antony repeats that Brutus is \"an honorable man.\" What is the effect of the repetition?",
      [
        "It proves that Antony agrees with Brutus.",
        "It turns the phrase into sarcasm, making the crowd doubt Brutus.",
        "It confuses the crowd about who is speaking.",
        "It marks the end of the scene.",
      ],
      "B",
    ],
    [
      "A director sets Antony's speech at a modern rally with microphones and flags. What is this production most likely to emphasize?",
      [
        "That Rome was built of marble",
        "That Antony is shy",
        "How rhetoric and spectacle can sway a crowd, as in modern politics",
        "That the play is a comedy",
      ],
      "C",
    ],
    [
      "Why might two actors deliver the same line very differently?",
      [
        "The text decides all choices in tone and gesture.",
        "Performance choices such as pace and tone are interpretations the words allow.",
        "One actor forgot the words.",
        "The play changes each night.",
      ],
      "B",
    ],
    [
      "A film makes Antony's speech very quiet and slow. Which choice would most likely follow?",
      [
        "The crowd shouts the whole time.",
        "Long silences and close-ups on the crowd's faces",
        "A rapid chase scene",
        "The speech is skipped.",
      ],
      "B",
    ],
    [
      "A useful strategy for reading a difficult Shakespeare passage is to",
      [
        "skip any line you do not understand",
        "read a few lines, restate them in your own words, then continue",
        "read only the stage directions",
        "wait for the film to be released",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare how a classical staging (toga, marble platform, solemn pace) and a modern rally staging (microphone, flags, camera) of Antony's funeral speech might interpret the scene differently. Identify at least one specific choice in each and explain what it emphasizes.",
      scheme: [
        "Identifies a specific choice in the classical staging",
        "Explains what the classical choice emphasizes",
        "Identifies a specific choice in the modern staging",
        "Explains what the modern choice emphasizes and compares the two",
      ],
      model:
        "In the classical staging, the slow pace and silence from the crowd stress the dignity and tragedy of Rome and make Antony's grief seem sincere. In the modern rally staging, the microphone and cheering crowd emphasize how a speaker can manipulate emotions, so Antony looks calculating. The first highlights Caesar's death as a loss to the republic, while the second highlights the danger of persuasive rhetoric.",
      answers: [
        [
          "full",
          "[[0|In the classical staging Antony speaks slowly from a platform while the crowd stays quiet.]] [[1|That emphasizes the seriousness of Caesar's death and makes Antony seem like a loyal friend who is truly mourning.]] [[2|In the modern staging he uses a microphone and flags and the crowd cheers like at a campaign event.]] [[3|That emphasizes how he is working the crowd, so he looks more like a politician than a mourner, and the scene is about how speeches control people.]]",
          "Full marks. You compared what each choice does to our view of Antony, which is the heart of the question.",
        ],
        [
          "full",
          "[[0|A classical production might have long pauses where Antony looks at Caesar's body.]] [[1|It would highlight the grief and the sacredness of Rome, and the horror of the murder.]] [[2|A modern rally production might have camera crews and the crowd chanting along with each repetition of 'honorable man.']] [[3|That highlights the manipulation, since the repetition is like a slogan, and makes the audience think about modern media.]]",
          "All four marks. Linking the repeated phrase to a slogan is a strong connection.",
        ],
        [
          "partial",
          "[[0|In the classical one he speaks slowly in a toga.]] [[2|In the modern one he has a microphone and flags.]] They are different.",
          "Your choices are good. Explain what each emphasizes about Antony and about the scene.",
        ],
        [
          "partial",
          "[[1|The classical version shows how serious Roman politics were.]] [[3|The modern one shows how a speech can control people.]]",
          "Strong on emphasis. Name a specific staging choice in each, like pace, costume or crowd reaction, so the comparison is concrete.",
          true,
        ],
        [
          "weak",
          "The first one is boring and old, and the second one is exciting and new. I prefer the modern one.",
          "Preference is not analysis. Focus on what choices such as costume and crowd reaction emphasize about Antony.",
        ],
        [
          "weak",
          "[[0|In the classical version he wears a toga.]] The two versions are the same because the words are the same.",
          "The words may match, but the performance choices do not, and each changes what we notice. Ask what the toga or microphone emphasizes.",
        ],
      ],
    },
    {
      prompt:
        "Antony says Brutus is \"an honorable man\" many times. Explain how the repetition works as verbal irony, and how an actor could use tone to make that irony clear.",
      scheme: [
        "Defines verbal irony in this context, saying one thing and meaning another",
        "Explains how repetition shifts the meaning of 'honorable'",
        "Describes a specific vocal or physical choice that conveys the irony",
        "Explains the effect on the crowd",
      ],
      model:
        "Verbal irony means Antony says Brutus is honorable but means the opposite. Each repetition follows a fact that contradicts the word, such as Caesar's refusal of the crown, so 'honorable' begins to sound false. An actor could stress the word with a pause or a raised eyebrow. The crowd begins to doubt Brutus and turns against the conspirators.",
      answers: [
        [
          "full",
          "[[0|Verbal irony is when you say something but mean the opposite, and Antony says Brutus is honorable while really suggesting he isn't.]] [[1|Every time he repeats it he follows it with a fact, like that Caesar refused the crown three times, so the word starts to sound false.]] [[2|An actor could say honorable with a little smile or a pause before it, so the audience can tell it is sarcasm.]] [[3|The crowd begins to see Brutus as a liar and in the end they riot.]]",
          "Full marks. Pairing the repetition with a fact is exactly how the irony is built.",
        ],
        [
          "full",
          "[[0|It is irony because the words on the surface say Brutus is good but the meaning underneath is that he's a murderer.]] [[1|Repeating it makes the word wear out, so it begins to sound mocking.]] [[2|The actor could lower his voice, stare at the conspirators, and lean on the word.]] [[3|That gets the crowd to turn on Brutus, which is Antony's goal.]]",
          "All four marks. The idea that repetition wears a word out is perceptive.",
        ],
        [
          "partial",
          "[[0|Verbal irony means saying the opposite of what you mean.]] [[2|The actor could say it sarcastically.]] The crowd listens.",
          "Right idea and a good delivery choice. Explain how repetition and the facts around it change the word's meaning, and describe the crowd's reaction.",
        ],
        [
          "partial",
          "[[1|Each time he says it the word sounds more fake.]] [[3|The crowd starts to doubt Brutus.]]",
          "Strong explanation of effect. Define verbal irony and describe how an actor's tone could show it.",
          true,
        ],
        [
          "weak",
          "Antony is telling the truth that Brutus is honorable. He wants to be nice to him.",
          "Reread the scene: Antony says it just after listing facts that make Brutus's act look dishonorable. Ask why he keeps saying it.",
        ],
        [
          "weak",
          "[[0|Verbal irony is saying one thing and meaning another.]] I think the crowd likes Antony because he is loud.",
          "You have the definition. The crowd responds to what Antony's repetition suggests, not to volume. Think about what the word starts to mean.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Word choice and argument in the Gettysburg Address",
  note: `
## Objectives

Students will be able to:

1. analyze how an author's word choices in a speech or essay shape its tone and meaning;
2. analyze how an author structures an argument and how the parts connect to the whole.

## Materials

The Gettysburg Address (printed with line numbers), the reading "Ten Sentences That Held a Nation," and a three-part structure chart.

## Starter (8 minutes)

Ask: "Which is longer to deliver: a speech that lasts two minutes or one that lasts two hours? Which would you expect people to remember?" Share that in November 1863, Edward Everett spoke for two hours at Gettysburg and Abraham Lincoln spoke for about two minutes.

## Main activity

1. Read the Address aloud. Students underline words that repeat (dedicate, nation, people, great) and words that sound religious or legal (conceived, consecrate, hallow).
2. Discuss word choice: Lincoln says "four score and seven years ago" instead of "eighty-seven." What tone does it set? Why "dedicate" and not "honor"?
3. Structure. Divide the speech into three parts: past (the founding), present (the war and the ground), future (the unfinished work). Students explain the job of each part and how it leads to the next.
4. Compare to the Everett speech's reported length: why might brevity be an argument too?

## Checking for understanding

Cold call: "Which word in the final sentence carries the most weight, and why?"

## Exit ticket

Write one sentence about how the structure of the Address moves from past to present to future.
`,
  reading: [
    "Ten sentences that held a nation",
    `
On November 19, 1863, thousands of people gathered at a new cemetery in Gettysburg, Pennsylvania, where some 7,000 soldiers had died in battle four months earlier. The main speaker was Edward Everett, one of the most famous orators in the country. He spoke for about two hours. Then President Abraham Lincoln rose and spoke for about two minutes. It is Lincoln's speech that people remember.

The reason is partly word choice. Lincoln begins, "Four score and seven years ago," which is a formal, almost biblical way to say eighty-seven. The rhythm sounds like scripture, and it lifts the occasion above ordinary politics. He goes on to say that the nation was "conceived in Liberty," a word that suggests birth and family, and "dedicated to the proposition that all men are created equal," a phrase that echoes the Declaration of Independence. The words "conceived" and "dedicated" are chosen with care. A nation that is conceived is something new and fragile that must be protected.

The speech then turns to the present and the work at hand. Lincoln says the audience cannot "dedicate," "consecrate," or "hallow" the ground, because the soldiers who struggled there have already done so. This is a series of three verbs, each stronger than the one before. Lincoln's modesty is also an argument: he places the soldiers' sacrifice above any words. The tone is humble, solemn and grateful.

Finally, the speech looks to the future. Lincoln calls on the living to be "dedicated to the great task remaining before us," so that "government of the people, by the people, for the people, shall not perish from the earth." The repeated "people" is a kind of rhythmic drumbeat, and each preposition adds a new idea: whose government it is, who runs it, and who it serves.

The structure moves in a clear line, from the past to the present to the future. The first part reminds listeners why the nation exists, the second says what the occasion means, and the third says what must be done. The brevity of the speech is part of the argument. The ideas are so clear that they need no more words.
`,
  ],
  cards: [
    ["Diction", "A writer's or speaker's choice of words."],
    ["Tone", "The speaker's attitude toward the subject and the audience."],
    ["Parallelism", "Using the same grammatical structure for related ideas."],
    ["Allusion", "A reference to another well-known text or event."],
    ["Structure (of an argument)", "How the parts of a text are arranged to build its case."],
    ["Anaphora", "Repeating a word or phrase at the start of successive clauses."],
    ["Connotation", "The feelings and associations attached to a word."],
    ["Occasion", "The event or circumstance that prompts a speech."],
  ],
  closed: [
    [
      "Why might Lincoln begin \"Four score and seven years ago\" instead of \"Eighty-seven years ago\"?",
      [
        "He did not know the number.",
        "The formal, biblical rhythm lifts the occasion above ordinary politics.",
        "He was running out of time.",
        "He wanted to confuse the audience.",
      ],
      "B",
    ],
    [
      "The phrase \"government of the people, by the people, for the people\" is an example of",
      ["a metaphor", "parallelism", "hyperbole", "a pun"],
      "B",
    ],
    [
      "In the middle section Lincoln says the living cannot \"dedicate, consecrate, hallow\" the ground. What does this series of words suggest?",
      [
        "Lincoln believes the ground is unimportant.",
        "The soldiers' sacrifice has already made the place sacred beyond anything speakers can add.",
        "The soldiers were not brave.",
        "The audience should leave.",
      ],
      "B",
    ],
    [
      "How is the Address structured?",
      [
        "Future, present, past",
        "Present, present, present",
        "Past (the founding), present (the occasion), future (the task)",
        "A series of unrelated stories",
      ],
      "C",
    ],
    [
      "Which best describes the tone of the Address?",
      [
        "Playful and casual",
        "Angry and sarcastic",
        "Solemn, humble and hopeful",
        "Bored and distant",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Choose two words or phrases from the Gettysburg Address (for example, \"conceived,\" \"dedicated,\" \"consecrate,\" or \"four score and seven\") and explain how Lincoln's word choice shapes the speech's tone and meaning.",
      scheme: [
        "Identifies a first word or phrase accurately",
        "Explains its connotation or effect on tone and meaning",
        "Identifies a second word or phrase accurately",
        "Explains its connotation or effect and links to the speech's overall purpose",
      ],
      model:
        "'Conceived' suggests birth, so the nation seems new and in need of protection, which sets a tone of care. 'Consecrate' is a religious word that makes the battlefield sacred, giving the speech a solemn tone. Together they show that Lincoln wants listeners to treat the cause of the Union as sacred and the nation as something to protect.",
      answers: [
        [
          "full",
          "[[0|Lincoln says the nation was conceived in liberty.]] [[1|Conceived makes it sound like a baby being born, so the nation seems new and fragile, and the tone is protective.]] [[2|He also says the living cannot consecrate the ground.]] [[3|Consecrate is a church word that makes the battlefield feel holy, and together the words show he wants people to see the cause as sacred.]]",
          "Full marks. You tied the connotations to a purpose, not just to a feeling.",
        ],
        [
          "full",
          "[[0|The phrase four score and seven years ago is formal and sounds old and biblical.]] [[1|It makes the speech serious and gives the founding a feeling of history, so listeners feel they are part of something large.]] [[2|Lincoln also repeats the word dedicated.]] [[3|The repetition connects the founding to the present, so the purpose is to ask the audience to continue the work.]]",
          "All four marks. Repetition of a key word often shows the speech's real subject.",
        ],
        [
          "partial",
          "[[0|Lincoln uses the word conceived.]] [[1|It makes the nation seem new.]] He also uses long sentences.",
          "You have one word well explained. Add a second word and connect both to the speech's purpose.",
        ],
        [
          "partial",
          "[[2|Lincoln uses consecrate and hallow.]] [[3|They sound religious, so the tone is solemn and the cause sounds sacred.]]",
          "Strong on tone and purpose. Identify the first word and explain what it adds, so you have two words analyzed.",
          true,
        ],
        [
          "weak",
          "Lincoln uses old words because the speech is old. This makes it sound old and hard to understand.",
          "Old words are chosen for effect. Pick one and ask what feeling it gives and why Lincoln wanted it.",
        ],
        [
          "weak",
          "[[0|He says four score and seven.]] That means eighty-seven and it is just a math thing.",
          "It does mean eighty-seven, but Lincoln chose the formal version for its tone. Ask what that rhythm suggests.",
        ],
      ],
    },
    {
      prompt:
        "Explain how the three parts of the Gettysburg Address (past, present, future) connect to form a single argument. Say what each part does and how it leads to the next.",
      scheme: [
        "Describes what the first part (the past and the founding) does",
        "Describes what the middle part (the present occasion) does",
        "Describes what the final part (the future task) does",
        "Explains how the parts connect to one argument",
      ],
      model:
        "The first part recalls the founding of a nation based on equality, which sets the standard. The middle part turns to the battlefield, explaining that the soldiers' sacrifice has made the ground sacred, so the war is a test of whether that founding idea survives. The last part calls the living to finish the work so that self-government will not perish. Together they argue that honoring the dead means continuing the unfinished cause of the founding.",
      answers: [
        [
          "full",
          "[[0|The first part goes back to the founding and says the nation was based on the idea that all men are created equal.]] [[1|The middle part says the war tests whether that kind of nation can last, and the soldiers' sacrifice has made the field holy.]] [[2|The last part asks the living to finish the work so that government by the people does not disappear.]] [[3|They connect because the founding makes the standard, the war tests it, and the future task is how to honor the dead, so it all makes one argument.]]",
          "Full marks. Your last sentence names the logic that links the parts.",
        ],
        [
          "full",
          "[[0|Part one sets the standard by recalling the founding and equality.]] [[1|Part two moves to the present at Gettysburg and says the dead have done more than words can.]] [[2|Part three looks forward and tells the audience they must keep going so the sacrifice was not for nothing.]] [[3|Each part leads to the next: the ideal, the cost, then the duty, which is a clear line of argument.]]",
          "All four marks. Naming the ideal, the cost and the duty is a nice summary.",
        ],
        [
          "partial",
          "[[0|The first part is about when the country started.]] [[1|The second is about the battlefield.]] The third is the end.",
          "Good start. Say what the final section asks of the audience and how all three build one argument.",
        ],
        [
          "partial",
          "[[2|The last part says the living need to finish the work.]] [[3|It connects to the first part because that is where equality started.]]",
          "Your link between the last and first is strong. Describe what the middle part does to complete the structure.",
          true,
        ],
        [
          "weak",
          "The parts are separate. The first is about Lincoln, the second is about Gettysburg, and the third is about the audience's lunch.",
          "The speech is one argument. Reread each part and see how it prepares for the next.",
        ],
        [
          "weak",
          "[[0|The first part is about the founding.]] The rest are random ideas that he put at the end.",
          "You identified the first part. The other parts follow a plan: present occasion, then future task. Look again at how they relate to the founding.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Evaluating arguments, comparing founding documents, writing a literary argument",
  note: `
## Objectives

Students will be able to:

1. evaluate an argument, separating valid reasoning from unsupported or fallacious claims;
2. compare how two foundational US documents or speeches address a similar concept;
3. write a literary argument with a precise claim, organized reasons, evidence and a counterclaim.

## Materials

Excerpts of the Declaration of Independence (1776) and the Declaration of Sentiments (Seneca Falls, 1848), a fallacy sorting activity, and a literary-argument planning organizer.

## Starter (8 minutes)

Show three statements: "Everyone I know likes this song, so it must be good." "If we let students use phones in class, soon they won't learn anything." "Either we ban homework or students will burn out." Ask what is wrong with the reasoning in each.

## Main activity

1. Name the fallacies: bandwagon, slippery slope, false dilemma. Students sort twelve short arguments. They rewrite one fallacious argument so the reasoning is valid.
2. Compare the documents. The Declaration of Independence claims a right to separate from Britain. The Declaration of Sentiments, written at Seneca Falls, borrows its form and many words to claim equal rights for women. Students annotate shared phrases and changes.
3. Discuss why the later authors copied the structure: to claim the same authority and show that the founding ideals had not been fully applied.
4. Plan a literary argument about Lord of the Flies or Julius Caesar: claim, three reasons, textual evidence, and a counterclaim.

## Checking for understanding

Pairs share one fallacy and how to repair it.

## Exit ticket

One claim, one reason and one counterclaim for a literary argument.
`,
  reading: [
    "Good reasoning, borrowed words and a literary argument",
    `
An argument is more than a loud opinion. A good argument has a claim, reasons that support the claim, and evidence for each reason. A **fallacy** is a flaw in the reasoning, a mistake that makes an argument seem stronger than it is. A **bandwagon** fallacy says something is true because many people believe it. A **slippery slope** says one small step will inevitably lead to disaster, without showing how. A **false dilemma** says there are only two choices when there are more. Spotting these gives you a way to evaluate what you read and to avoid them in your own writing.

Founding documents offer lessons in reasoning and in rhetoric. In 1776, the Declaration of Independence set out why the American colonies were separating from Britain. It begins with a principle, that all people have rights, and then lists grievances against the king as evidence. The structure is a logical one: a claim about rights, evidence of violations, and a conclusion that separation is justified.

In 1848, at Seneca Falls, New York, a group of women and men led by Elizabeth Cady Stanton wrote the Declaration of Sentiments. They borrowed the form of the Declaration of Independence, even many of its phrases, and changed the key line to say that "all men and women are created equal." They then listed their own grievances: laws that denied married women property, wages and the vote. By using the same structure they claimed the same authority and invited readers to see that the ideals of 1776 had not yet been applied to everyone.

Comparing the two documents shows how an author can use an earlier text as a model. The first argues for national independence, and the second argues for personal equality. Both rely on the idea of rights, both use a list as evidence, and both end with a resolution to act.

You can apply these skills when writing about literature. A **literary argument** makes a claim about what a work means and defends it with evidence from the text. A strong claim is specific: "Golding uses Piggy's glasses to show that violence can seize the tools of reason" is more precise than "Piggy is important." A good argument also considers a counterclaim, such as the objection that the glasses simply make fire, and answers it by explaining what they represent.
`,
  ],
  cards: [
    ["Fallacy", "A flaw in reasoning that makes an argument seem stronger than it is."],
    ["Bandwagon", "Claiming something is true or good because many people believe it."],
    ["Slippery slope", "Claiming one step will inevitably lead to extreme results without showing how."],
    ["False dilemma", "Presenting only two choices when more exist."],
    ["Grievance", "A complaint about a wrong or an injustice."],
    ["Literary argument", "An essay that claims what a work means and defends it with textual evidence."],
    ["Counterclaim", "An opposing view that the writer answers."],
    ["Valid reasoning", "Reasoning in which the evidence actually supports the conclusion."],
  ],
  closed: [
    [
      "\"Everyone is watching that show, so it must be the best.\" This is an example of",
      ["slippery slope", "bandwagon", "false dilemma", "valid reasoning"],
      "B",
    ],
    [
      "\"If we allow one late homework, soon no one will turn anything in.\" This is an example of",
      ["slippery slope", "bandwagon", "valid reasoning", "a counterclaim"],
      "A",
    ],
    [
      "The authors of the Declaration of Sentiments borrowed the structure of the Declaration of Independence in order to",
      [
        "save time",
        "claim the same authority and show that the ideals of 1776 had not reached women",
        "argue for independence from Britain",
        "support the king",
      ],
      "B",
    ],
    [
      "Which claim is most suitable for a literary argument?",
      [
        "Julius Caesar is a play by Shakespeare.",
        "Antony's repetition of \"honorable\" turns the word into irony and moves the crowd.",
        "Many people like Shakespeare.",
        "The play has five acts.",
      ],
      "B",
    ],
    [
      "Which statement is a false dilemma?",
      [
        "We should consider several options for the schedule.",
        "Either we cancel the dance or we have a riot.",
        "Some students prefer a later start.",
        "The data show attendance improved.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Identify the fallacy in this argument and explain why it is faulty: \"If the school lets seniors leave for lunch, soon every student will skip class and the whole school will collapse.\" Then rewrite the argument so the reasoning is valid.",
      scheme: [
        "Names the fallacy as a slippery slope",
        "Explains why it is faulty, since the steps to disaster are not shown",
        "Rewrites the argument with a reasonable claim",
        "Supports the rewritten claim with a reason or evidence",
      ],
      model:
        "This is a slippery slope fallacy. It jumps from seniors leaving for lunch to the school collapsing without showing how one leads to the other. A better version: Allowing seniors to leave for lunch could increase tardiness if there is no check-in. A sign-in system at the front office would reduce the risk, as it has at schools that use it.",
      answers: [
        [
          "full",
          "[[0|This is a slippery slope.]] [[1|It claims one small change will cause a disaster but it never shows how seniors leaving for lunch would make everyone skip class.]] [[2|A better argument is that off-campus lunch might cause more late arrivals, so the school should have a sign-in rule.]] [[3|Schools that track the privilege report that students are on time, which gives evidence for the rule.]]",
          "Full marks. Your repair is specific, and it includes evidence.",
        ],
        [
          "full",
          "[[0|It is a slippery slope fallacy.]] [[1|The writer skips all the steps in between and just says the school will collapse, which is exaggerated and unsupported.]] [[2|A valid version is that letting seniors leave for lunch might lead to some being late, which could be a problem.]] [[3|The school could limit it to students with good attendance, since previous programs showed that the privilege improved responsibility.]]",
          "All four marks. You kept the concern but made it believable.",
        ],
        [
          "partial",
          "[[0|It is a slippery slope.]] [[1|The writer exaggerates and does not show how it would happen.]]",
          "You diagnosed the fallacy. Now rewrite the argument and support it.",
        ],
        [
          "partial",
          "[[2|Seniors leaving for lunch could cause some late arrivals.]] [[3|A sign-in sheet would help.]] It is a bandwagon argument.",
          "Your rewrite is sensible. The original is a slippery slope, not a bandwagon, and you should explain why it is faulty.",
          true,
        ],
        [
          "weak",
          "This is a false dilemma because it gives two choices, skip class or not skip class. It is fine as it is.",
          "The argument does not give two choices; it claims one step will lead to disaster. Reread the second half.",
        ],
        [
          "weak",
          "[[0|It is a slippery slope.]] The argument is good because it shows what could happen. Nothing needs to change.",
          "A slippery slope is a flaw. The argument does not show how one thing causes the next. Try rewriting it with a reasonable claim.",
        ],
      ],
    },
    {
      prompt:
        "Compare how the Declaration of Independence and the Declaration of Sentiments treat the idea of equal rights. Explain one similarity in their structure and one important difference in their claim.",
      scheme: [
        "Identifies a similarity in structure, such as the same form or a list of grievances",
        "Explains why the later document borrows the form",
        "Identifies a difference in claim, such as national independence versus equality for women",
        "Explains the effect of the difference on the reader",
      ],
      model:
        "Both documents begin with a principle of equal rights and then list grievances as evidence. The Declaration of Sentiments borrows the form to claim the same authority and to show that the founding ideals were not applied to women. The difference is that the 1776 document argues for national independence, while the 1848 document argues for equality inside the nation. This asks readers to apply an old promise to new people.",
      answers: [
        [
          "full",
          "[[0|Both start with a statement that people have equal rights and then give a long list of complaints as proof.]] [[1|The Sentiments copied the form so that it would carry the same authority and make people see that the Declaration had left women out.]] [[2|A difference is that the Declaration of Independence wants to break away from Britain, while the Sentiments wants women to be treated as equals inside the country.]] [[3|That makes the reader face the gap between what America said and what it did.]]",
          "Full marks. You tied structure, purpose, claim and effect into one comparison.",
        ],
        [
          "full",
          "[[0|They both open with the idea that all are created equal and both have a list of wrongs by the ruler or the laws.]] [[1|The authors in 1848 used the old form so people would take them seriously and see that they were asking America to keep its own promise.]] [[2|The claim is different because one is separating from a king and the other is asking for the vote and legal rights for women.]] [[3|The reader has to decide if the founding ideals apply to everyone.]]",
          "All four marks. The phrase \"keep its own promise\" explains the borrowing in plain words.",
        ],
        [
          "partial",
          "[[0|They both list grievances.]] [[2|One is about leaving Britain and the other is about women's rights.]]",
          "Both observations are accurate. Explain why the later document used the same form and what that does to the reader.",
        ],
        [
          "partial",
          "[[1|The Sentiments copied the Declaration so people would respect it.]] [[3|It makes the reader think about whether the promise was kept.]]",
          "Good reasoning about purpose and effect. Add a similarity in structure and a difference in claim.",
          true,
        ],
        [
          "weak",
          "The Declaration of Independence and the Declaration of Sentiments are the same document written twice. There is no difference.",
          "They share a form, but the claims differ. One argues for independence from a king, the other for women's equality.",
        ],
        [
          "weak",
          "[[0|They both have a list of grievances.]] The Sentiments is by Thomas Jefferson too.",
          "The list is a good similarity. Thomas Jefferson wrote the Declaration of Independence; the Sentiments was written in 1848 by a convention including Elizabeth Cady Stanton.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Writing an explanatory essay and starting a research project",
  note: `
## Objectives

Students will be able to:

1. write an explanatory essay that develops a topic with well-chosen facts, quotations and transitions;
2. carry out a short research project, narrowing the question as the sources suggest.

## Materials

A sample explanatory essay, a research question funnel handout, and two or three short sources on a topic such as "How the Cuyahoga River fire of 1969 led to environmental law."

## Starter (8 minutes)

Ask: "What is the difference between 'Tell me about rivers' and 'Why did a river catch fire?'" Elicit that a good research question is specific and has an answer that must be investigated.

## Main activity

1. Mini-lesson on explanatory writing: a thesis that names the main ideas, topic sentences, facts and quotations used as evidence, and transitions that show cause and effect.
2. Model the question funnel. Start with "Cuyahoga River" and narrow to "How did the 1969 river fire change federal environmental law?" after reading one source.
3. Students read two short sources, record at least three facts with the source's name, and revise their question.
4. Draft a thesis and a topic-sentence outline for the explanatory essay. Peers check that every paragraph supports the thesis.

## Checking for understanding

Each student states their narrowed research question in one sentence on an index card.

## Exit ticket

Write the revised question and one fact with its source.
`,
  reading: [
    "Narrowing a question, building an explanation",
    `
Research begins with curiosity, but curiosity needs a shape. A question like "What is pollution?" is too big to answer in an essay. A question like "How did the 1969 fire on the Cuyahoga River in Cleveland lead to new environmental laws?" is specific, and it has an answer that can be found in sources. Writers usually reach that question in steps. They start with a topic, read a little, find a part that interests them, and narrow. Each source may suggest a new direction. A good researcher is willing to change the question when the evidence points somewhere else.

The Cuyahoga River, which flows through Cleveland into Lake Erie, was so polluted by oil and industrial waste that it caught fire several times. The 1969 fire was small and brief, but a national magazine published a dramatic account of it, and the story drew attention to the state of American waterways. In the following years, Congress created the Environmental Protection Agency and passed the Clean Water Act. A writer who reads sources about this will learn that the fire alone did not cause the laws. Public concern, earlier fires, and a growing environmental movement also mattered. This is the kind of discovery that changes a thesis from "The fire caused the laws" to "The fire became a symbol that helped turn existing concern into action."

An **explanatory essay** teaches the reader how or why something happened. Its thesis names the main ideas it will explain. Its body paragraphs each develop one of those ideas with facts, definitions, quotations and examples. A **quotation** should be short and relevant, and it should be introduced, as in "According to a 1969 report, the river 'oozes rather than flows.'" A fact should come from a source you name. Transitions such as "as a result," "because of," and "meanwhile" guide the reader through cause and effect. Finally, the conclusion does more than repeat. It tells the reader why the explanation matters.

As you research, keep a record of every source: the title, author, date and where you found it. This habit makes citing easy later and protects you from accidentally using someone else's words as your own.
`,
  ],
  cards: [
    ["Research question", "A specific question that an essay or project sets out to answer."],
    ["Narrowing", "Making a topic or question more specific as you learn more."],
    ["Explanatory essay", "An essay that explains how or why something happens."],
    ["Thesis (explanatory)", "A statement of the main ideas an essay will explain."],
    ["Cause and effect", "A relationship in which one event brings about another."],
    ["Source", "A book, article, website or person that provides information."],
    ["Quotation", "The exact words of a source, placed in quotation marks."],
    ["Transition", "A word or phrase that shows how ideas relate."],
  ],
  closed: [
    [
      "Which is the best research question for a short project?",
      [
        "What is pollution?",
        "Why do rivers exist?",
        "How did the 1969 fire on the Cuyahoga River influence federal environmental law?",
        "Is the environment important?",
      ],
      "C",
    ],
    [
      "After reading a source, a student learns that several events contributed to a law. What should the student do?",
      [
        "Ignore the source.",
        "Revise the thesis to fit the evidence.",
        "Delete the question.",
        "Copy the source's conclusion.",
      ],
      "B",
    ],
    [
      "Which sentence correctly introduces a quotation?",
      [
        "The river oozes rather than flows.",
        "According to a 1969 report, the river 'oozes rather than flows.'",
        "Oozes rather than flows, the river.",
        "A report.",
      ],
      "B",
    ],
    [
      "Which transition best shows cause and effect?",
      ["Meanwhile", "As a result", "For instance", "In addition"],
      "B",
    ],
    [
      "What should you record for each source while researching?",
      [
        "Only the title",
        "The title, author, date and where you found it",
        "Only the web address",
        "Nothing, since you can find it later",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student's first research question is \"What is water pollution?\" After reading two sources about Lake Erie algae blooms, the student wants to narrow it. Write a narrowed research question and a thesis sentence that names the main ideas an explanatory essay would cover.",
      scheme: [
        "Writes a narrowed, specific research question",
        "Question is answerable with sources",
        "Writes a thesis that names the main ideas to be explained",
        "Thesis includes causes or effects consistent with the sources",
      ],
      model:
        "Question: What causes the summer algae blooms in western Lake Erie, and how do they affect drinking water in Toledo? Thesis: Western Lake Erie's algae blooms grow from phosphorus runoff, warm summers and invasive mussels, and they threaten the drinking water of Toledo.",
      answers: [
        [
          "full",
          "[[0|What causes the summer algae blooms in western Lake Erie, and how have they affected drinking water in Toledo?]] [[1|It can be answered with reports from scientists and the city.]] [[2|Thesis: Algae blooms in western Lake Erie grow because of fertilizer runoff, warmer summers and invasive mussels,]] [[3|and they put the water supply of cities like Toledo at risk.]]",
          "Full marks. Your thesis names the exact ideas your body paragraphs would explain.",
        ],
        [
          "full",
          "[[0|How does farm runoff contribute to toxic algae in Lake Erie?]] [[1|I could use sources from the EPA and local universities.]] [[2|Thesis: Phosphorus from farm fertilizer feeds algae in Lake Erie, and heavy spring rain and warm water make the problem worse,]] [[3|so the toxins reach drinking water systems.]]",
          "All four marks. A source plan shows the question is realistic.",
        ],
        [
          "partial",
          "[[0|What causes algae in Lake Erie?]] [[1|I can find that in the articles.]] It is a problem.",
          "The question is narrower now. Add a thesis that names the main causes or effects you would explain.",
        ],
        [
          "partial",
          "[[2|Fertilizer runoff and warm summers feed algae blooms in Lake Erie,]] [[3|which threaten Toledo's water.]]",
          "Your thesis names the ideas well. Add the narrowed research question that it answers.",
          true,
        ],
        [
          "weak",
          "How is water polluted all over the world? Thesis: Water is polluted.",
          "These are still too big. Use what you read about Lake Erie to ask a specific question.",
        ],
        [
          "weak",
          "[[0|Why does Lake Erie get algae?]] Thesis: I think Lake Erie should be cleaned because it is gross.",
          "Your question is specific. A thesis for an explanatory essay names causes or effects instead of opinions.",
        ],
      ],
    },
    {
      prompt:
        "Write a short explanatory paragraph (five to seven sentences) that develops this topic sentence with facts, one introduced quotation, and a transition: \"The 1969 Cuyahoga River fire became a turning point in American environmental policy.\" You may invent plausible details, but make clear which parts are a fact, which is a quotation, and where the transition is.",
      scheme: [
        "Develops the topic sentence with at least two relevant facts",
        "Introduces a quotation with a source phrase",
        "Uses a transition showing cause and effect",
        "Keeps the paragraph focused and explanatory",
      ],
      model:
        "The 1969 Cuyahoga River fire became a turning point in American environmental policy. The river was so polluted with oil and waste that it had burned several times before. A national magazine described the water as something that 'oozes rather than flows,' according to its report. As a result, the public demanded action, and Congress soon created the Environmental Protection Agency and passed the Clean Water Act.",
      answers: [
        [
          "full",
          "The 1969 Cuyahoga River fire became a turning point in American environmental policy. [[0|The river carried so much oil and industrial waste that it had caught fire several times, and the fire in 1969 drew national attention.]] [[1|According to a magazine report from that year, the river 'oozes rather than flows.']] [[2|As a result, the public began to demand cleaner water,]] and [[3|within a few years Congress created the Environmental Protection Agency and passed the Clean Water Act.]]",
          "Full marks. Your facts, quotation and transition do their jobs without wandering.",
        ],
        [
          "full",
          "The 1969 Cuyahoga River fire became a turning point in American environmental policy. [[0|Cleveland's river had burned before, but this fire was photographed and published, so people across the country saw it.]] [[1|One writer said, quote, the river 'oozes rather than flows.']] [[2|Because of that attention, citizens and lawmakers began to take pollution more seriously.]] [[3|Soon the federal government created new agencies and laws, including the Clean Water Act.]]",
          "All four marks. Mentioning the photographs explains why this fire mattered more than earlier ones.",
        ],
        [
          "partial",
          "The 1969 Cuyahoga River fire became a turning point in American environmental policy. [[0|The river was so dirty that it burned.]] [[2|As a result, people were upset.]] It was bad.",
          "You include a fact and a transition. Add a second fact and an introduced quotation, and replace \"it was bad\" with a closing explanation.",
        ],
        [
          "partial",
          "The 1969 Cuyahoga River fire became a turning point in American environmental policy. [[1|According to the report, the river 'oozes rather than flows.']] [[3|Congress later passed the Clean Water Act.]]",
          "Your quotation and your outcome are strong. Add a transition that shows the cause and effect, and one more fact about the pollution.",
          true,
        ],
        [
          "weak",
          "The 1969 Cuyahoga River fire became a turning point in American environmental policy. Rivers are important. Fires are hot. People should be careful with pollution.",
          "These sentences do not develop the topic sentence. Add facts about the fire and what followed.",
        ],
        [
          "weak",
          "The 1969 Cuyahoga River fire became a turning point in American environmental policy. [[0|The river was so polluted that it burned.]] I like clean water and the river is far away.",
          "The first sentence is a good fact. The rest is personal. Add a quotation, a transition and a result.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Evaluating sources, citing them, and using evidence from literature and nonfiction",
  note: `
## Objectives

Students will be able to:

1. gather relevant information from several sources, assess their credibility and cite them without plagiarizing;
2. draw evidence from literary and informational texts to support analysis in writing.

## Materials

Four sample sources on one topic (a government report, a news article, a personal blog, an advertisement), a credibility checklist, a citation guide, and a short passage of Julius Caesar paired with a nonfiction article on persuasion.

## Starter (8 minutes)

Ask: "You need to know whether a school lunch is healthy. Would you trust the cafeteria menu, a vitamin company's website, or a nutritionist's report? Why?" Discuss what makes a source more or less trustworthy.

## Main activity

1. Credibility checklist: author, expertise, date, purpose, evidence, and bias. Students rate the four samples and rank them.
2. Paraphrase versus quotation versus plagiarism. Show a passage and three student uses: a copy, a bad paraphrase that only swaps words, and a good paraphrase with a citation. Students identify the problem in each.
3. Practice a simple citation (author, title, publisher, date, web address) in a standard style such as MLA.
4. Pair a literary text and an informational text. Students write a paragraph that uses a quotation from Julius Caesar and a fact from the nonfiction article to support one claim about persuasion.

## Checking for understanding

Thumbs: plagiarism, acceptable paraphrase, or quotation, for five sample sentences.

## Exit ticket

Write the citation for one source you used today.
`,
  reading: [
    "Whom to trust, and how to say whose words are whose",
    `
Anyone can publish anything. A teenager's blog, a company's ad and a scientist's report can all appear on the same page of search results, and they do not deserve equal trust. Researchers learn to ask a set of questions before using a source. Who wrote it, and what do they know about the subject? When was it written, and is it current? Why was it written: to inform, to sell, to persuade? What evidence does it give? And does the author have a **bias**, a reason to favor one side?

A government agency's report, a peer-reviewed study or an established news outlet is usually more reliable than an anonymous post. That does not mean such sources are perfect. It means you can trace their claims, find the author and see how they were checked. An advertisement, by contrast, is trying to sell something, and its evidence is chosen to flatter the product. It can still be a source, but about advertising and not about facts.

Once you have trustworthy sources, you must use them honestly. **Plagiarism** is using someone else's words or ideas as if they were your own. It happens when you copy text without quotation marks, when you swap a few words and call it your own, or when you use an idea without naming where it came from. There are three honest ways to use a source. A **quotation** reproduces the exact words in quotation marks, with a citation. A **paraphrase** restates the idea in your own words and sentence structure, with a citation. A **summary** compresses a longer passage into its main points, also with a citation.

A **citation** tells the reader where the information came from so that they can find it. In MLA style, a works-cited entry for a web article lists the author, title, website, date and address. In the text, a short parenthetical note such as (Smith) points to it.

Evidence can also come from both literature and nonfiction. When you write that "persuasion often works by repetition," you might support it with Antony's repeated "honorable man" in Julius Caesar and with a fact from an article on advertising. Combining the two gives your claim a wider base. Introduce each piece of evidence, then explain how it supports the claim in your own words.
`,
  ],
  cards: [
    ["Credibility", "How trustworthy a source is, based on the author, evidence and purpose."],
    ["Bias", "A reason or tendency to favor one side."],
    ["Plagiarism", "Presenting someone else's words or ideas as your own."],
    ["Paraphrase", "Restating an idea in your own words and sentence structure, with a citation."],
    ["Quotation", "The exact words of a source, in quotation marks, with a citation."],
    ["Summary", "A short statement of a source's main points, in your own words."],
    ["Citation", "A note that tells the reader where information came from."],
    ["Works cited", "A list at the end of a paper giving full details of each source used."],
  ],
  closed: [
    [
      "Which source is likely the most credible for information on school lunch nutrition?",
      [
        "An anonymous forum post",
        "A snack company's advertisement",
        "A report from a federal agency that explains its data",
        "A friend's opinion",
      ],
      "C",
    ],
    [
      "A student copies a sentence from a website and changes two words. This is",
      [
        "a good paraphrase",
        "plagiarism",
        "a quotation",
        "a summary",
      ],
      "B",
    ],
    [
      "Which is an honest use of a source?",
      [
        "Copying a paragraph without quotation marks",
        "Using another student's essay",
        "Paraphrasing an idea in your own words and citing the source",
        "Using an idea without saying where it came from",
      ],
      "C",
    ],
    [
      "What does a citation do?",
      [
        "Makes the paper longer",
        "Tells the reader where the information came from",
        "Proves the claim is true",
        "Replaces the need for evidence",
      ],
      "B",
    ],
    [
      "A writer uses a line from Julius Caesar and a statistic from an advertising study to support one claim. This is an example of",
      [
        "a fallacy",
        "using evidence from both literature and informational text",
        "plagiarism",
        "a rhetorical question",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "You are researching whether energy drinks are safe for teenagers. You find (a) a study by a university hospital published last year, (b) an energy drink company's website, and (c) an anonymous blog post. Rank them by credibility and explain your ranking using at least two criteria.",
      scheme: [
        "Ranks the university hospital study as most credible",
        "Explains using expertise, evidence or date",
        "Identifies the company's website as biased because it is selling a product",
        "Identifies the anonymous blog as least reliable because the author and evidence are unknown",
      ],
      model:
        "The study from the university hospital is most credible because its authors are experts, it presents evidence and it is recent. The company's website is next, but it has a bias because it wants to sell the drinks. The anonymous blog is least reliable because we cannot tell who wrote it or what evidence it uses.",
      answers: [
        [
          "full",
          "[[0|I would rank the university hospital study first.]] [[1|Its authors are doctors and researchers, it comes with data, and it is recent.]] [[2|The company website goes second because it can still have facts, but it wants to sell the drink so it is biased.]] [[3|The anonymous blog is last because no one knows who wrote it or if they have any evidence.]]",
          "Full marks. You used three different criteria across the three sources.",
        ],
        [
          "full",
          "[[0|The study comes first because it was done by a university hospital.]] [[1|I trust it because the researchers have expertise and they explain their evidence and methods.]] [[2|Second is the company website, which has an obvious reason to make energy drinks look good.]] [[3|Third is the blog since I can't check who the writer is or where they got their claims.]]",
          "All four marks. \"Obvious reason\" is a clear way to describe bias.",
        ],
        [
          "partial",
          "[[0|The study is first.]] [[1|It was done by experts.]] The other two are about the same.",
          "Your first choice and criterion are good. The company has a bias and the blog is unknown, so they are not equal. Rank and explain them.",
        ],
        [
          "partial",
          "[[2|The company site is biased since it sells the drinks.]] [[3|The blog is unknown so it is worst.]] I think the study is probably OK.",
          "Great on the two weaker sources. Put the study first and give a reason, such as the authors' expertise and evidence.",
          true,
        ],
        [
          "weak",
          "The blog is the best because it has the most comments. More comments mean it is true.",
          "The number of comments does not show reliability. Think about who wrote it and what evidence it offers.",
        ],
        [
          "weak",
          "[[2|The company site is biased.]] The study is not good because studies are boring and the blog is the same.",
          "Biased is a good observation. A study's value depends on its authors and evidence, not on whether it is interesting.",
        ],
      ],
    },
    {
      prompt:
        "Write a short paragraph (four to six sentences) that makes the claim \"Repetition is a powerful tool of persuasion\" using evidence from both Julius Caesar and one invented fact from an informational source. Introduce each piece of evidence and cite the informational source in parentheses.",
      scheme: [
        "States the claim clearly",
        "Uses and introduces accurate evidence from Julius Caesar",
        "Uses an informational fact with a parenthetical citation",
        "Explains in the writer's own words how the evidence supports the claim",
      ],
      model:
        "Repetition is a powerful tool of persuasion. In Julius Caesar, Antony repeats that Brutus is 'an honorable man,' and each repetition makes the phrase sound more doubtful until the crowd turns on the conspirators. Similarly, advertising researchers report that people remember slogans better when they hear them several times (Lopez). Both examples show that repeating an idea can change what an audience believes.",
      answers: [
        [
          "full",
          "[[0|Repetition is one of the most powerful tools of persuasion.]] [[1|In Julius Caesar, Antony keeps saying that Brutus is an honorable man, and each time it sounds more sarcastic until the crowd riots.]] [[2|A study of ad campaigns found that people trust a slogan more after hearing it several times (Reyes).]] [[3|Both examples show that repeating a message wears down doubt and makes the audience accept it.]]",
          "Full marks. Your own words tie the two sources to the claim.",
        ],
        [
          "full",
          "[[0|Repeating an idea can change what people believe.]] [[1|When Antony repeats honorable man during his funeral speech, he turns the word into an insult.]] [[2|According to a media researcher, advertisers repeat their slogans because familiarity builds trust (Patel).]] [[3|These examples show that repetition works on the audience's memory and feelings, not just on their logic.]]",
          "All four marks. Distinguishing memory and feelings from logic is a strong insight.",
        ],
        [
          "partial",
          "[[0|Repetition is a powerful way to persuade.]] [[1|Antony repeats honorable man in Julius Caesar.]] That is persuasion.",
          "Claim and literary evidence are good. Add an informational fact with a citation, and explain how they support the claim.",
        ],
        [
          "partial",
          "[[2|Studies show that people remember repeated slogans (Garcia).]] [[3|Repetition works because the audience becomes used to the idea.]]",
          "The citation and the explanation are good. Add the claim and a quotation or detail from Julius Caesar.",
          true,
        ],
        [
          "weak",
          "Persuasion is when you talk a lot. In Julius Caesar people talk and in ads people talk, so it is persuasive.",
          "Talking a lot is not the same as repetition. Use a specific example, like Antony's repeated phrase, and explain what it does.",
        ],
        [
          "weak",
          "[[0|Repetition persuades people.]] It says so on the internet, and I read it, and so it is true.",
          "A claim needs evidence you can cite. Name a specific source, and include a detail from the play.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Presenting findings, and colons and semicolons",
  note: `
## Objectives

Students will be able to:

1. present findings clearly and logically so that listeners can follow the line of reasoning;
2. use a colon or semicolon correctly, and spell and punctuate with care in finished work.

## Materials

A short model presentation outline, a rubric for oral presentations, a colon-and-semicolon handout, and an editing practice sheet.

## Starter (8 minutes)

Ask two volunteers to explain the same topic to the class, one in a rambling way and one in a clear order. Discuss what made the second easier to follow: a preview, signposts and a conclusion.

## Main activity

1. Present the structure of a good talk: an opening hook, a preview ("I will explain three causes"), signposts ("First," "Next," "Finally"), evidence for each point, and a conclusion that returns to the question.
2. Practice with a two-minute version of the research project. Partners listen for the reasoning and give one compliment and one suggestion.
3. Punctuation mini-lesson. A colon introduces a list, an explanation or a quotation after a complete sentence. A semicolon joins two related independent clauses or separates items in a list that already contains commas.
4. Editing practice: students correct ten sentences, and then edit their own work for punctuation and spelling.

## Checking for understanding

Whiteboards: add a colon or a semicolon to each of five sentences or write "none."

## Exit ticket

Write one sentence using a colon and one using a semicolon correctly.
`,
  reading: [
    "Making your reasoning audible, and punctuating with care",
    `
A good presentation is easy to follow because the speaker has done the work of organizing for the listener. A reader can reread a difficult sentence; a listener cannot. For that reason speakers rely on structure. They begin with a hook, a short story, question or fact that gets attention. They then give a **preview**: "Today I will explain three reasons the Cuyahoga fire changed American law." They use **signposts** such as "first," "next," "another reason" and "finally" so that the audience always knows where they are. Each point includes evidence, and the conclusion returns to the opening question. The speaker also controls pace and volume, makes eye contact, and uses visuals that support the words and do not repeat them.

Careful punctuation does the same work in writing. Two marks that students often confuse are the colon and the semicolon.

A **colon** (:) follows a complete sentence and introduces something that explains or lists. "The report named three causes: runoff, heat and invasive mussels." What comes before the colon must be able to stand alone. You would not write "The causes were: runoff," because "The causes were" is not a complete thought; leave out the colon there. A colon can also introduce a quotation or an explanation: "Antony's strategy is clear: he repeats a phrase until it changes its meaning."

A **semicolon** (;) joins two independent clauses that are closely related in meaning without a conjunction. "The fire was small; its effects were enormous." It can also separate items in a list when the items already contain commas: "The tour visited Cleveland, Ohio; Buffalo, New York; and Erie, Pennsylvania." A semicolon is not a weaker period and not a stronger comma. If you use one, check that both sides could be sentences on their own and that the ideas truly belong together.

Finally, spell carefully. Words like "separate," "definitely," "receive" and "their/there/they're" cause frequent errors. A short list of your own most-missed words, kept at the back of your notebook, is one of the best study tools there is. Proofreading aloud, or from the last sentence to the first, helps catch mistakes that the eye skips.
`,
  ],
  cards: [
    ["Preview", "A statement near the start of a talk that tells listeners what is coming."],
    ["Signpost", "A word or phrase, such as first or finally, that shows the listener where the speaker is."],
    ["Colon", "Punctuation that follows a complete sentence and introduces a list, explanation or quotation."],
    ["Semicolon", "Punctuation that joins two related independent clauses, or separates list items that contain commas."],
    ["Independent clause", "A group of words with a subject and a verb that can stand alone."],
    ["Proofread", "To read carefully for errors in spelling, punctuation and grammar."],
    ["Eye contact", "Looking at the audience while speaking to connect with them."],
    ["Visual aid", "A slide, chart or object that supports a talk."],
  ],
  closed: [
    [
      "Which sentence uses a colon correctly?",
      [
        "The causes were: runoff, heat and mussels.",
        "The report named three causes: runoff, heat and mussels.",
        "The report: named three causes of runoff.",
        "Three causes: runoff.",
      ],
      "B",
    ],
    [
      "Which sentence uses a semicolon correctly?",
      [
        "The fire was small; and its effects were large.",
        "The fire was small; its effects were enormous.",
        "Because the fire was small; its effects were large.",
        "The fire; was small.",
      ],
      "B",
    ],
    [
      "Which sentence correctly separates list items that contain commas?",
      [
        "We visited Cleveland, Ohio, Buffalo, New York, and Erie, Pennsylvania.",
        "We visited Cleveland, Ohio; Buffalo, New York; and Erie, Pennsylvania.",
        "We visited Cleveland, Ohio: Buffalo, New York: and Erie, Pennsylvania.",
        "We visited Cleveland; Ohio, Buffalo; New York.",
      ],
      "B",
    ],
    [
      "What is the job of a preview in a presentation?",
      [
        "To end the talk",
        "To tell listeners what main points are coming so they can follow",
        "To list the sources",
        "To show a funny picture",
      ],
      "B",
    ],
    [
      "Which strategy best helps a listener follow reasoning?",
      [
        "Speaking as fast as possible",
        "Using signposts like first, next and finally",
        "Reading every word from slides",
        "Avoiding eye contact",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write two sentences about the Gettysburg Address or Lord of the Flies: one that uses a colon correctly to introduce an explanation or list, and one that uses a semicolon correctly to join two related independent clauses. Underline or name the punctuation, and say why it is correct.",
      scheme: [
        "Writes a sentence with a colon after a complete sentence",
        "Explains why the colon is correct",
        "Writes a sentence with a semicolon joining two independent clauses",
        "Explains why the semicolon is correct",
      ],
      model:
        "Lincoln's speech has three parts: the past, the present and the future. A colon is correct because a complete sentence comes before it. Ralph wants rescue; Jack wants meat. A semicolon is correct because each side is a complete sentence and the ideas are closely related.",
      answers: [
        [
          "full",
          "[[0|Lincoln's speech is built in three parts: the founding, the battlefield and the future.]] [[1|The colon is right because everything before it is a full sentence and the list explains it.]] [[2|Ralph hopes for rescue; Jack craves the hunt.]] [[3|The semicolon works because both halves could be sentences by themselves and the ideas are closely connected.]]",
          "Full marks. You explained each mark with the rule that makes it correct.",
        ],
        [
          "full",
          "[[0|Golding makes his point clear: the boys fall apart without rules.]] [[1|There is a colon because the first part is a complete sentence and the second part explains it.]] [[2|Piggy has the glasses; Jack has the spears.]] [[3|I used a semicolon since these are two independent clauses that are related.]]",
          "All four marks. Your examples also say something true about the novel.",
        ],
        [
          "partial",
          "[[0|Lincoln gave one idea: equality is the nation's foundation.]] [[1|It is correct because there is a sentence before the colon.]] Jack wants power, and he is mean.",
          "Your colon sentence is correct and explained. The second sentence uses a comma and no semicolon. Try joining two independent clauses.",
        ],
        [
          "partial",
          "[[2|Ralph wants rescue; Jack wants meat.]] [[3|The semicolon joins two sentences.]]",
          "Your semicolon is perfect. Add a colon sentence and explain why it is correct.",
          true,
        ],
        [
          "weak",
          "The Gettysburg Address has: three parts, the past, the present and the future. A colon is used to separate things.",
          "What comes before the colon must be a complete sentence. \"The Gettysburg Address has\" is not, so remove the colon.",
        ],
        [
          "weak",
          "[[0|Lincoln gave a clear message: the nation must continue.]] A semicolon is a stronger comma so I used it; wherever; I wanted.",
          "Your colon sentence is right. A semicolon is not a stronger comma; it must join two independent clauses.",
        ],
      ],
    },
    {
      prompt:
        "Outline a two-minute presentation of your research findings. Include a hook, a preview, signposts for at least two points, and a conclusion that returns to your question. Use the Cuyahoga River or Lake Erie as your topic.",
      scheme: [
        "Includes an attention-getting hook",
        "Includes a preview naming the points to come",
        "Uses signposts and evidence for at least two points",
        "Ends with a conclusion that returns to the question",
      ],
      model:
        "Hook: In 1969 a river in Cleveland caught fire. Preview: I will explain two ways that fire changed the law. First, it shocked the public. Next, it pushed Congress to act, with the Clean Water Act as the result. Conclusion: So, to answer my question, the fire mattered because it turned concern into action.",
      answers: [
        [
          "full",
          "[[0|Hook: Imagine a river so dirty it catches fire.]] [[1|Preview: Today I will explain two ways the 1969 Cuyahoga fire changed environmental law.]] [[2|First, photographs of the fire shocked the country. Next, the shock led Congress to create the EPA and pass the Clean Water Act.]] [[3|Conclusion: So the fire changed the law because it turned public worry into political action, which answers my question.]]",
          "Full marks. Your signposts and conclusion make the reasoning easy to follow by ear.",
        ],
        [
          "full",
          "[[0|Start with a photo of Lake Erie green with algae and ask, Would you drink from this?]] [[1|Preview: I will show two causes of the algae and one result.]] [[2|First, fertilizer runoff gives the algae food. Second, warm summers help it grow.]] [[3|Last, I will return to my question, why did Toledo lose its tap water, and answer that the algae made toxins that the plant could not filter.]]",
          "All four marks. Ending with your question is a strong choice.",
        ],
        [
          "partial",
          "[[0|Hook: A river caught on fire.]] [[1|Preview: I will tell you about two effects.]] The fire was bad and then it was over.",
          "Your hook and preview are good. Add signposts with evidence and a conclusion that answers your question.",
        ],
        [
          "partial",
          "[[2|First, the fire shocked the public. Then Congress passed laws.]] [[3|So the fire mattered.]]",
          "Your signposts and conclusion work. Add a hook and a preview so the listener knows what to expect.",
          true,
        ],
        [
          "weak",
          "I will read my essay out loud to the class. It is long and has many facts.",
          "A presentation is organized for listening, not reading. Add a hook, a preview, signposts and a conclusion.",
        ],
        [
          "weak",
          "[[0|Did you know a river burned in Cleveland?]] Then I will talk about the river for two minutes until the time is up.",
          "Your hook is good. The rest needs a plan: what points will you make, in what order, and how will you end?",
        ],
      ],
    },
  ],
};

writeCourse("english-10-grade-10.json", "English 10", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
