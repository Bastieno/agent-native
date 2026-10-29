import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * English 9, Grade 9, Quarter 1. Standards: Common Core State Standards,
 * English Language Arts, Grade 9 (RL, RI, W, SL, L), in the school's own words.
 * Anchor texts are public domain: "The Gift of the Magi", "The Most Dangerous
 * Game", "The Necklace" and Ovid's story of Icarus.
 */

const w1: WeekInput = {
  topic: `Evidence, motive and word choice in "The Gift of the Magi"`,
  note: `
## Objectives

Students will be able to:

1. support a claim about a short story with the strongest evidence and say what the text leaves unstated;
2. explain how a character's choices and motives move the plot and shape the theme;
3. interpret figurative and connotative language and say how it sets tone.

## Materials

Class copies of "The Gift of the Magi" by O. Henry, highlighters in two colors, and the exit ticket.

## Starter (8 minutes)

Write on the board: "Della sells her hair." Ask: "What does that tell us about her?" Take three answers and then ask the harder question: "What in the story makes you say that?" Sort responses into claims (what we think) and evidence (what the text says).

## Main activity

1. Read the opening two pages aloud. Students highlight in yellow every detail about money and in green every detail about love.
2. Model a claim with weak evidence ("Della is poor because she cries") and then rebuild it with the strongest evidence (the one dollar and eighty-seven cents counted three times).
3. Pairs list three of Della's choices, name the motive behind each, and decide which choice moves the plot most.
4. Mini-lesson on connotation: why the narrator says "shabby" and not "old."

## Checking for understanding

Circulate and ask each pair, "Is that your strongest piece of evidence, or just a piece?" Collect the claim-and-evidence chart.

## Exit ticket

One claim about Jim or Della and the single best quotation for it.
`,
  reading: [
    "Choosing the strongest evidence",
    `
When you write about a story, you make a claim: a statement about what the story means that someone could argue with. "Della loves Jim" is a claim. It needs evidence, and the best evidence is not just any detail that points the right way. It is the detail that points most clearly, most directly, and that another reader would find hard to explain differently.

Take "The Gift of the Magi." Della has saved one dollar and eighty-seven cents, and she counts it three times. That detail shows she is worried about money, but it does not show love yet. The strongest evidence for her love is what she does next: she sells her hair, the one thing she is proud of, to buy Jim a chain for his watch. A reader could not easily explain that choice by anything except love.

Good readers also notice what a text leaves unstated. The narrator never says Della is brave when she goes into Madame Sofronie's shop. We infer it from the fact that she leaves the shop in a hurry and does not stop to second-guess herself. An inference is a conclusion that the text supports but does not spell out.

Word choice matters too. A word has a **denotation**, its dictionary meaning, and a **connotation**, the feeling that comes with it. "Shabby" and "worn" both mean used up, but "shabby" adds embarrassment. When O. Henry writes that Della's hair fell "like a cascade of brown waters," he uses a **simile**, a comparison with "like" or "as." The picture is of something flowing, shining and plentiful, so the reader understands how much she is giving up. Figurative language does not decorate the story. It tells us what the characters value and sets the tone.

A character's **motive** is the reason behind a choice, and the plot depends on it. Della's motive is love, and Jim's motive turns out to be the same. Their choices cancel each other out in a way neither expected, which is why the ending feels ironic and tender at once. When you build an argument about a story, name the choice, name the motive, and quote the evidence that proves it.
`,
  ],
  cards: [
    ["Claim", "A statement about a text that a reader could argue for or against."],
    ["Textual evidence", "A detail or quotation from the text that supports a claim."],
    ["Inference", "A conclusion the text supports but does not state outright."],
    ["Motive", "The reason a character makes a choice."],
    ["Denotation", "The dictionary meaning of a word."],
    ["Connotation", "The feeling or association that comes with a word beyond its dictionary meaning."],
    ["Simile", "A comparison of two unlike things using \"like\" or \"as.\""],
    ["Tone", "The author's attitude toward the subject, shown through word choice."],
  ],
  closed: [
    [
      "A student claims, \"Della is willing to sacrifice for Jim.\" Which piece of evidence from the story supports the claim most strongly?",
      [
        "She counts her money three times.",
        "She lives in a small furnished flat.",
        "She sells her long hair to buy a gift for Jim.",
        "She sits on the shabby couch and cries.",
      ],
      "C",
    ],
    [
      "The narrator calls the couch \"shabby\" instead of \"old.\" What does the word \"shabby\" add?",
      [
        "A feeling of poverty and embarrassment",
        "A sense that the couch is brand new",
        "A suggestion that the couch is comfortable",
        "The exact age of the couch",
      ],
      "A",
    ],
    [
      "Which sentence states an inference rather than a fact stated in the text?",
      [
        "Della has one dollar and eighty-seven cents.",
        "Jim earns twenty dollars a week.",
        "Della cuts off her hair.",
        "Della is afraid Jim will no longer find her pretty after the haircut.",
      ],
      "D",
    ],
    [
      "Which is the best description of a character's motive?",
      [
        "What the character looks like",
        "The reason the character does something",
        "Where the character lives",
        "What the character says to the narrator",
      ],
      "B",
    ],
    [
      "\"Her hair fell about her like a cascade of brown waters.\" This figurative language mainly shows that Della's hair is",
      [
        "wet from the rain",
        "cut short and messy",
        "flowing, shining and valuable to her",
        "difficult to brush every morning",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Della sells her hair. Make a claim about what this choice shows about her, and support it with the strongest piece of evidence from the story. Explain how the evidence proves your claim.",
      scheme: [
        "States a clear claim about Della's character or motive",
        "Supports it with a specific, accurate detail from the story",
        "Explains how the detail proves the claim",
      ],
      model:
        "Della's choice to sell her hair shows that she puts Jim's happiness above her own pride. The story says her hair is her most prized possession, and she gives it up to buy a chain for Jim's watch. If she cared more about herself, she would have kept it. Because she gives up the thing she is proudest of, we know her love is real.",
      answers: [
        [
          "full",
          "[[0|Selling her hair shows that Della loves Jim more than she loves herself.]] [[1|The story says her hair fell like a cascade of brown waters and was one of her two prize possessions, and she sold it for twenty dollars.]] [[2|That is the strongest proof because she gave up the thing she was proudest of, so the love has to be real.]]",
          "Full marks. You picked the detail that is hardest to explain any other way, and you said why it works.",
        ],
        [
          "full",
          "[[0|I think Della is a selfless person.]] [[1|She sells her hair to Madame Sofronie so she can buy the platinum chain for Jim's watch.]] [[2|It shows she is selfless because she had no reason to do it except to make Jim happy, and it cost her something she cared about.]]",
          "All three marks. Your explanation names what it cost her, which is what makes the evidence strong.",
        ],
        [
          "partial",
          "[[0|Della is very loving.]] She cries on the couch a lot and she counts her money. That is how you can tell.",
          "Your claim is good. The crying and counting show she is worried, not that she loves Jim. Use the hair sale, which is the choice that really proves it.",
        ],
        [
          "partial",
          "[[1|She sells her hair for twenty dollars and buys a chain.]] That shows she is a good wife.",
          "The detail is accurate. Now turn it into a clear claim, and then explain why that detail proves it. \"Good wife\" is vague, so tell me what quality it shows.",
          true,
        ],
        [
          "weak",
          "Della is poor so she had to sell her hair for money. It shows that she needs cash.",
          "She is poor, but money was not the reason. She spends the money on a gift for Jim, not on herself. Ask what she bought and what that tells you.",
        ],
        [
          "weak",
          "[[0|Della is a brave person]] because it is a nice story and the ending is sad.",
          "Brave is a reasonable claim. You still need a specific detail from the story, like what she sold and why, and then an explanation of how it proves the claim.",
        ],
      ],
    },
    {
      prompt:
        "The narrator says Della's hair fell \"like a cascade of brown waters.\" Name the kind of figurative language, explain the comparison, and say what it makes the reader feel about her sacrifice.",
      scheme: [
        "Identifies the figure of speech as a simile",
        "Explains the comparison, such as hair flowing and shining like water",
        "Connects the image to the tone or the size of her sacrifice",
      ],
      model:
        "This is a simile because it compares hair to a waterfall using the word like. The comparison makes her hair seem long, shining and flowing, something rich and beautiful. That makes the reader feel the loss when she sells it, so the sacrifice feels large and the tone is both tender and sad.",
      answers: [
        [
          "full",
          "[[0|It is a simile since it uses \"like\" to compare her hair to a waterfall.]] [[1|Water that pours and shines makes you picture hair that is long and full and moves.]] [[2|So when she cuts it off you feel how much she lost, and the tone gets sad but sweet.]]",
          "Full marks. You tied the picture to the feeling, which is what the question wants.",
        ],
        [
          "full",
          "[[0|The author uses a simile.]] [[1|He compares her hair to a cascade, which is water falling in a big smooth rush, so her hair is thick, shiny, and beautiful.]] [[2|That makes the reader sorry for her and makes the sacrifice seem bigger.]]",
          "All three marks. Good plain explanation of the image and its effect.",
        ],
        [
          "partial",
          "[[0|It's a simile.]] It compares her hair to water.",
          "You named it correctly. Now say what water suggests (flowing, shining, plentiful) and what that does to the reader's feelings about the haircut.",
        ],
        [
          "partial",
          "[[1|Her hair looks like a waterfall, long and shiny,]] and it was pretty. The author used a metaphor.",
          "Your explanation of the image is good. It is a simile, not a metaphor, because of the word \"like.\" You also left out how it affects the reader.",
          true,
        ],
        [
          "weak",
          "It is a metaphor because it is a comparison. It means her hair got wet.",
          "A comparison with \"like\" is a simile, and the water does not mean her hair is wet. Think about what a waterfall looks like and why the author picked it.",
        ],
        [
          "weak",
          "[[0|It is a simile.]] The author just wanted to put in some description to make the story longer.",
          "You found the simile. Descriptions in a story do work: this one shows how beautiful her hair was, so the loss hurts. Try explaining that.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: `Theme, order and suspense in "The Most Dangerous Game"`,
  note: `
## Objectives

Students will be able to:

1. trace a theme through a story and describe how the author develops it;
2. analyze how the order of events, pacing and the use of time create suspense and surprise.

## Materials

Class copies of "The Most Dangerous Game" by Richard Connell, a blank timeline strip, colored pencils.

## Starter (8 minutes)

Ask: "Have you ever been so scared you could not look away from a movie? What was the director doing?" List techniques on the board: music, hiding the monster, slow reveals. Tell the class that writers do the same with sentences.

## Main activity

1. Read the opening scene on the yacht. Ask what Whitney's talk about the island does before anything happens (foreshadowing).
2. Students build a timeline of the hunt from the moment Rainsford is given his head start. Mark where the pace speeds up (short sentences, quick actions) and where it slows down (long descriptions, waiting).
3. Discuss the theme. Draw two columns, Rainsford at the start and Rainsford at the end, and ask what changed in his attitude toward hunted creatures.
4. Pairs write one sentence that states the theme, then find two moments where Connell develops it.

## Checking for understanding

Hold up a mini whiteboard: theme as a full sentence, not a single word ("fear" is a topic, not a theme).

## Exit ticket

Name one moment where the author slows the story down and say what suspense it builds.
`,
  reading: [
    "How a writer builds a theme and a clock",
    `
A **topic** is what a story is about, such as hunting or fear. A **theme** is what the story says about that topic, and it can be written as a full sentence: "People who hurt others without a thought may learn how it feels when they are the ones in danger." A theme does not arrive all at once. The author builds it through events, character change and repeated ideas, and a careful reader tracks how.

In "The Most Dangerous Game," Connell sets up the theme before the action begins. On the yacht, Rainsford tells Whitney that a hunted animal has no feelings worth worrying about. He is certain. Then he falls overboard, swims to Ship-Trap Island, and meets General Zaroff, who hunts people for sport. When Rainsford becomes the prey, the same certainty is turned against him. By the time he builds traps in the jungle, he knows the "fear" he once dismissed. The theme develops as his attitude shifts from mockery to understanding.

Connell also controls time to build suspense. The story opens with a quiet, almost lazy conversation about the dark and the heat. That slow beginning is a kind of promise, and the reader waits for something to go wrong. Later, the hunt is stretched across three days, and the General gives Rainsford a three-hour head start, so the reader counts hours along with him. Sentences speed up in the chase and slow down when Rainsford hides and listens. Short sentences feel like quick breaths, and long ones feel like waiting.

Order matters as well. Connell does not tell us how the hunt will end. He lets Zaroff's confidence grow while Rainsford's cunning grows too, and then gives a surprise: Rainsford is waiting in the General's bedroom. A good ending feels both unexpected and fair, because details earlier in the story, such as the skill Rainsford showed as a hunter, make it believable.

When you analyze a story, ask two questions. What is the author saying about the topic? And how does the order and speed of events make you feel while you read?
`,
  ],
  cards: [
    ["Topic", "What a story is about in a word or two, such as fear or courage."],
    ["Theme", "A full-sentence statement of what the story says about a topic."],
    ["Foreshadowing", "Hints early in a story about what will happen later."],
    ["Suspense", "The feeling of tension from not knowing what will happen next."],
    ["Pacing", "How fast or slow the events of a story move."],
    ["In medias res", "Beginning a story in the middle of the action."],
    ["Irony", "A gap between what is expected and what happens or is said."],
    ["Dynamic character", "A character who changes in an important way during a story."],
  ],
  closed: [
    [
      "Which of these is a theme rather than a topic?",
      [
        "Hunting",
        "Fear and survival",
        "People who ignore the suffering of others may learn it only when it happens to them.",
        "General Zaroff's island",
      ],
      "C",
    ],
    [
      "Early in the story Whitney says the island has a bad reputation and that sailors fear it. What technique is Connell using?",
      ["Flashback", "Foreshadowing", "Personification", "Dialect"],
      "B",
    ],
    [
      "Connell gives Rainsford a three-hour head start and a three-day hunt. How does this create suspense?",
      [
        "It lets the reader count time along with Rainsford and wonder if he will survive.",
        "It makes the story shorter.",
        "It explains the history of the island.",
        "It shows Zaroff has forgotten the rules.",
      ],
      "A",
    ],
    [
      "A writer uses short, choppy sentences during the chase scene. What effect do they most likely have?",
      [
        "They slow the story and relax the reader.",
        "They speed the story and make the reader feel the urgency.",
        "They show that the writer is out of ideas.",
        "They make the setting seem peaceful.",
      ],
      "B",
    ],
    [
      "How does Rainsford change over the course of the story?",
      [
        "He grows more certain that animals do not feel fear.",
        "He decides never to leave the yacht again.",
        "He learns, from being hunted, what the prey feels, and he becomes ruthless himself.",
        "He forgets everything that happened on the island.",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "State a theme of \"The Most Dangerous Game\" as a full sentence. Then give two moments in the story where Connell develops that theme.",
      scheme: [
        "States a theme as a full-sentence idea, not just a topic",
        "Gives a first accurate moment that develops the theme",
        "Gives a second accurate moment that develops the theme",
      ],
      model:
        "A theme of the story is that people who are cruel to others without thinking may learn how it feels only when they are in danger themselves. At the start, Rainsford says the hunted animals do not have feelings that matter. Later, when Zaroff hunts him, Rainsford feels the same fear and builds traps to survive.",
      answers: [
        [
          "full",
          "[[0|A theme is that you do not really understand someone else's fear until you have felt it yourself.]] [[1|At the beginning Rainsford tells Whitney that the hunted jaguars do not feel anything he needs to worry about.]] [[2|Then Zaroff hunts him for three days, and Rainsford finally knows what it is like to run and hide.]]",
          "Full marks. Your theme is a complete idea, and both moments are from different parts of the story.",
        ],
        [
          "full",
          "[[0|The theme is that people can become what they hate when they have power over others.]] [[1|Rainsford starts out as a hunter who does not care how animals feel.]] [[2|At the end he goes back to the General's bedroom and says he will fight him, so he has now become hunter of a man.]]",
          "All three marks. Good reading: you saw that the ending complicates the theme instead of tidying it up.",
        ],
        [
          "partial",
          "[[0|One theme is that being hunted teaches you what fear is.]] Zaroff is the villain and he is cruel and also Rainsford wins in the end.",
          "Your theme is well put. You need two specific moments: one where Rainsford dismisses fear, and one where he feels it.",
        ],
        [
          "partial",
          "The theme is hunting. [[1|At the start Rainsford says the hunted animals have no feelings.]] [[2|Later Zaroff hunts him and he is afraid.]]",
          "Your two moments are good. \"Hunting\" is the topic. Say what the story is saying about hunting, such as what Rainsford learns.",
          true,
        ],
        [
          "weak",
          "The theme is Zaroff. He lives on an island and has a servant named Ivan and he hunts people.",
          "Those are facts about the story, but a theme is an idea the story is saying, not a character. Ask what Rainsford learns from being hunted.",
        ],
        [
          "weak",
          "[[1|Rainsford falls off the yacht and swims to the island.]] Then he sleeps in a nice bed. The theme is about boats.",
          "That is the plot, and the first detail is accurate. Move from what happens to what it means. What does the story say about how people treat others?",
        ],
      ],
    },
    {
      prompt:
        "Connell stretches the hunt over three days and often slows down when Rainsford hides and waits. Explain how his handling of time and pacing creates suspense.",
      scheme: [
        "Identifies a specific choice about time or pacing, such as the head start or the three days",
        "Explains how the choice makes the reader uncertain about what will happen",
        "Connects the effect to what the reader feels or to the story's tension",
      ],
      model:
        "Connell gives Rainsford a three-hour head start and stretches the hunt over three days, so the reader keeps counting time with him. Because the danger could come at any moment, the reader is never sure whether he will escape. When Rainsford hides and the sentences slow down, the reader feels the tension build.",
      answers: [
        [
          "full",
          "[[0|Connell makes the hunt last three days and gives Rainsford only three hours to get away.]] [[1|Because of this I was counting the hours too and I couldn't tell when Zaroff would find him.]] [[2|When he hides and waits it goes slow and my stomach felt tight, so the suspense builds.]]",
          "Full marks. You mention a specific timing choice and your own reaction as a reader, which is persuasive.",
        ],
        [
          "full",
          "[[0|The time limit of the head start]] makes you worry. [[1|You do not know if he will be caught because every hour that passes gets Zaroff closer.]] [[2|The slow parts where he is waiting in the trap make the tension worse because you expect the attack at any second.]]",
          "All three marks. The idea of expecting the attack is exactly how suspense works.",
        ],
        [
          "partial",
          "[[0|There is a three-day hunt.]] That is a long time and it is scary.",
          "You found the choice. Explain how it makes the reader uncertain, such as not knowing if Rainsford will survive, and tie it to how the reader feels.",
        ],
        [
          "partial",
          "[[1|You never know whether he will escape or get caught,]] so you keep reading. The sentences are good.",
          "Good point about uncertainty. Name the specific timing choice that creates it, like the head start or the three days.",
          true,
        ],
        [
          "weak",
          "Time does not matter in the story because it all happens on one island.",
          "Time matters a great deal here: the head start and the three days are what make the chase feel urgent. Look back at how long Rainsford is given.",
        ],
        [
          "weak",
          "[[0|The hunt is three days.]] This makes the story boring because it is too long.",
          "The three days is the right detail. A long hunt is meant to build tension, not boredom. Ask what the reader is waiting for during those days.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: `Two cultures, one idea, and a myth retold: "The Necklace" and Icarus`,
  note: `
## Objectives

Students will be able to:

1. compare how a work from another culture and a US work approach a shared idea, paying attention to point of view;
2. recognize how an author draws on a myth or classic story and explain what the later work does with it.

## Materials

Copies of "The Necklace" by Guy de Maupassant (translated) and "The Gift of the Magi" from Week 1; a one-page retelling of the myth of Daedalus and Icarus from Ovid; a Venn diagram.

## Starter (8 minutes)

Ask: "Has anyone ever borrowed something from a friend and been terrified of breaking it?" Take two stories. Then say that today two writers, one French and one American, ask what people will sacrifice for appearances and love.

## Main activity

1. Read "The Necklace." Pairs fill in the Venn diagram: what Mathilde and Della each want, what each gives up, and what each learns.
2. Discuss point of view. "The Necklace" stays close to Mathilde's wants. O. Henry's narrator speaks to us and comments. Ask how that changes our sympathy.
3. Read the Icarus myth. Ask what Daedalus warns, what Icarus does, and what the story teaches.
4. Show three modern uses of "flew too close to the sun" (a headline, a caption, a sports quote) and ask what each borrows from the myth.

## Exit ticket

One sentence: what does a modern writer gain by alluding to Icarus?
`,
  reading: [
    "Same idea, different voices: comparing stories and borrowing from myths",
    `
Writers in different countries often return to the same questions. How much should a person give up to look successful? What is the price of pride? Reading two works side by side helps you see not only what they say but how they say it.

Guy de Maupassant, writing in France in the 1880s, tells the story of Mathilde Loisel, a clerk's wife who is unhappy with her ordinary life. She borrows a diamond necklace for a ministry ball, loses it, and spends ten years in debt replacing it, only to learn that the original was a fake. In "The Gift of the Magi," the American writer O. Henry tells of a couple who each sell their most precious possession to buy a gift for the other. Both stories are about sacrifice and about the things people value, but they take opposite roads. Mathilde sacrifices for appearances, and she loses her youth and her pride. Della and Jim sacrifice for love, and although their gifts are now useless, they gain something bigger.

**Point of view** is the angle from which a story is told. Maupassant stays close to Mathilde's thoughts, and the narrator rarely pauses to comment, so we mostly experience her longing and then her shock. O. Henry's narrator steps outside the plot and speaks to the reader directly, calling Jim and Della "foolish children" and then calling them the wisest gift givers of all. The first point of view lets the reader feel an ironic punishment fall. The second invites the reader to smile at the mistake and to be moved by the people who make it.

An **allusion** is a reference to a well-known story, person or event. Ovid's story of Daedalus and Icarus tells how a father builds wings of feathers and wax so he and his son can escape the island of Crete. Daedalus warns his son not to fly too high or too low, but Icarus, thrilled, rises toward the sun. The wax melts and he falls into the sea. When a writer says that a company "flew too close to the sun," they are borrowing the whole story in a few words: ambition, a warning ignored, and a fall. Notice what the later writer changes as well. A modern reference may take sides with Icarus and admire his daring, or it may use him only as a warning.
`,
  ],
  cards: [
    ["Point of view", "The angle from which a story is told, such as through one character's eyes or by a narrator who comments."],
    ["Narrator", "The voice that tells the story."],
    ["Allusion", "A reference to a well-known story, person or event."],
    ["Myth", "A traditional story, often about gods or heroes, that explains a belief or a human truth."],
    ["Compare", "To look at what two things share."],
    ["Contrast", "To look at how two things differ."],
    ["Situational irony", "When what happens is the opposite of what a character or reader expects."],
    ["Hubris", "Excessive pride that leads to a downfall."],
  ],
  closed: [
    [
      "Mathilde and Della each lose something precious. What is the key difference in why they sacrifice?",
      [
        "Mathilde sacrifices for love and Della for appearances.",
        "Both sacrifice for appearances.",
        "Mathilde sacrifices to repair her mistake, while Della sacrifices out of love for Jim.",
        "Neither character is willing to sacrifice anything.",
      ],
      "C",
    ],
    [
      "The narrator of \"The Gift of the Magi\" speaks to the reader and comments on Jim and Della. What is the main effect of this point of view?",
      [
        "It hides what the characters feel.",
        "It invites the reader to see the couple's mistake with warmth and humor.",
        "It makes the story seem like a news report.",
        "It keeps the ending a total mystery.",
      ],
      "B",
    ],
    [
      "In Ovid's story, what does Daedalus warn Icarus about?",
      [
        "Flying too fast over the sea",
        "Leaving the island without permission",
        "Trusting the king of Crete",
        "Flying too high or too low",
      ],
      "D",
    ],
    [
      "A sports headline reads, \"Local Team Flies Too Close to the Sun in Fourth Quarter.\" What is the headline's allusion doing?",
      [
        "It suggests the team was overconfident and then collapsed, borrowing Icarus's story.",
        "It states that the game was played outside in hot weather.",
        "It praises the team for flying a plane.",
        "It claims that the team will win the next game.",
      ],
      "A",
    ],
    [
      "Which sentence best compares the two stories?",
      [
        "Both stories are about characters who find joy when they get what they want.",
        "Both stories show characters who sacrifice something precious and then learn their sacrifice did not turn out as planned.",
        "Neither story deals with money or possessions.",
        "Both stories are told from the first-person point of view.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "\"The Necklace\" and \"The Gift of the Magi\" both show characters who sacrifice something they value. Write a paragraph that compares the two stories. State one similarity and one difference, and say how point of view shapes the way readers feel about the characters.",
      scheme: [
        "States a similarity between the stories, such as sacrifice leading to an ironic result",
        "States a difference, such as sacrificing for appearances rather than love",
        "Explains how point of view affects what the reader feels about the characters",
      ],
      model:
        "Both stories show characters who give up something precious and end with an ironic twist: Mathilde loses ten years to replace a fake necklace, and Della and Jim give up gifts that no longer match what each now owns. The difference is why they sacrifice. Mathilde acts out of pride and a need to seem rich, while Della and Jim act out of love. Maupassant stays close to Mathilde so we feel her shock, while O. Henry's narrator speaks to us, so we feel warm toward the couple's mistake.",
      answers: [
        [
          "full",
          "[[0|Both stories end with an irony: the characters give up something big and it does not work out the way they planned.]] [[1|But Mathilde gives up her youth to look rich, while Della and Jim give up things because they love each other.]] [[2|In The Necklace the narrator stays close to Mathilde so we are shocked with her at the end, but in the Magi the narrator talks right to us, so we smile at the couple instead of feeling sorry for them.]]",
          "Full marks. You compared the ending, the motive and the narrator in one paragraph without losing track of the question.",
        ],
        [
          "full",
          "[[0|Mathilde and Della both lose something valuable and both stories have a twist ending.]] [[1|The big difference is that Mathilde does it because she is proud and afraid of looking poor, and Della does it for love.]] [[2|The narrator in the Magi calls them wise at the end, which makes us admire them, but the narrator in The Necklace does not defend Mathilde, so we judge her more.]]",
          "All three marks. Good point that the narrator's comment changes our sympathy.",
        ],
        [
          "partial",
          "[[0|Both stories have a sacrifice and an ironic twist.]] [[1|Mathilde wants to look rich but Della only wants to give Jim a gift.]] The narrators are different.",
          "The first two parts are strong. Finish the thought: how do the narrators differ, and what does that do to the way readers feel about the characters?",
        ],
        [
          "partial",
          "[[1|One difference is that Mathilde sacrifices because of pride and Della sacrifices because of love.]] [[2|The narrator of the Magi talks to the reader, so it feels warm.]]",
          "You gave a clear difference and an accurate comment on point of view. You have not stated a similarity. What do the two endings share?",
          true,
        ],
        [
          "weak",
          "Both are French stories and both are about a ball. Mathilde is a good example.",
          "Only \"The Necklace\" is French, and the ball is in only one story. Look at what each character gives up and why.",
        ],
        [
          "weak",
          "[[0|They both have a sacrifice.]] The Necklace has more words, so it is better. The Magi is shorter.",
          "You identified one similarity. Length is not what the question asks. Next, say why each character sacrifices and how the narrator shapes your feelings.",
        ],
      ],
    },
    {
      prompt:
        "Read this sentence from a school newspaper: \"After weeks of ignoring his coach's warnings, our star pitcher went for one more fastball and Icaroused himself right out of the game.\" Explain what the writer borrows from the myth of Icarus and what effect it has on the reader.",
      scheme: [
        "Names the allusion and the parts of the myth it borrows, such as the ignored warning and the fall",
        "Explains what the allusion says about the pitcher, such as overconfidence",
        "Explains the effect on the reader, such as adding humor or depth with few words",
      ],
      model:
        "The writer alludes to Icarus, who ignored his father's warning and flew too high until his wings melted. By borrowing this, the sentence says the pitcher was overconfident and ignored his coach, and his own daring caused his fall. The reference lets the writer say a lot in a few words and adds a touch of humor for readers who know the story.",
      answers: [
        [
          "full",
          "[[0|The writer is alluding to Icarus, who ignored the warning about flying too high and then fell.]] [[1|It says the pitcher was too cocky and did not listen to his coach, so he hurt himself.]] [[2|It works because readers who know the story get the whole idea in one word, and it is a little funny too.]]",
          "Full marks. You named the myth, applied it to the pitcher, and said why the allusion is worth using.",
        ],
        [
          "full",
          "[[0|It is an allusion to the myth where Icarus didn't listen to Daedalus and flew toward the sun until his wax wings melted and he fell.]] [[1|The pitcher is like Icarus because he ignored his coach and pushed too far.]] [[2|It gives the sentence extra meaning without a lot of explaining, and it sort of makes the pitcher seem foolish and proud.]]",
          "All three marks. You explained the effect on the reader as well as the meaning.",
        ],
        [
          "partial",
          "[[0|It is an allusion to Icarus who didn't listen to a warning and fell.]] It is a funny way to say what happened.",
          "You identified the myth clearly. Say what it tells us about the pitcher (overconfidence) and why using the allusion beats a plain sentence.",
        ],
        [
          "partial",
          "[[1|The pitcher was proud and did not listen to his coach.]] [[2|It makes the sentence more interesting than saying he made a bad pitch.]]",
          "Both points are good. Be sure to name the allusion and the part of the myth that matches the pitcher's mistake.",
          true,
        ],
        [
          "weak",
          "It says the pitcher can fly because Icarus could fly. He is a really fast player.",
          "Icarus did not succeed at flying. He fell because he flew too high. The allusion is about a warning ignored, not about speed.",
        ],
        [
          "weak",
          "[[0|It refers to the myth of Icarus.]] It is just a way to make the newspaper sound smarter.",
          "You found the myth. An allusion does more than sound smart: it carries the idea of pride and a fall. What does that say about the pitcher?",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Evidence and the central idea in an informational text",
  note: `
## Objectives

Students will be able to:

1. select the textual evidence that most strongly supports a claim about a nonfiction text;
2. determine the central idea of an informational text and summarize how it builds across paragraphs.

## Materials

The reading "When Lake Erie Turned Green," a highlighter, and a paragraph-by-paragraph summary chart.

## Starter (8 minutes)

Show a headline: "Toledo Tells Residents Not to Drink Tap Water." Ask students what they already know about algae in Lake Erie. Write their ideas on the board and mark which are facts and which are guesses.

## Main activity

1. Read the article once for the gist. Students write a single sentence: "This article is mostly about ..."
2. Read again. After each paragraph, students write a five-word note on what that paragraph adds. Compare with a neighbor.
3. Teach central idea versus topic versus supporting detail. Model by crossing out details that could be removed without changing the main point.
4. Give three claims about the article. Students choose the strongest evidence for each from four options, and explain why the others are weaker.

## Checking for understanding

Cold-call three students to read their summary sentence. Does it include the central idea and leave out minor details?

## Exit ticket

Write a two-sentence summary of the article that a seventh grader could understand.
`,
  reading: [
    "When Lake Erie Turned Green",
    `
On a Saturday morning in August 2014, people in Toledo, Ohio, turned on their faucets and were told not to drink what came out. A toxin called microcystin had been found in the city's water. For about three days, hundreds of thousands of people drove to stores for bottled water, and the shelves were empty within hours. The cause was not a broken pipe. It was a bloom of algae in Lake Erie.

Algae are plant-like organisms that live in water, and most are harmless. Some kinds, however, are blue-green bacteria that grow quickly when conditions are right and make toxins as they die. They need two things in particular: warm water, and phosphorus. Phosphorus is a nutrient, the same one found in many fertilizers, and it reaches Lake Erie by running off farm fields and lawns after heavy rain, and in some places from sewage that was not fully treated.

The problem has grown for several reasons. Farms in the western Lake Erie watershed use fertilizer on large fields, and heavy rain in spring washes some of it into rivers such as the Maumee. Zebra mussels, a small invasive animal that arrived in ship water in the 1980s, clear the lake by feeding, which lets sunlight reach the algae. Warmer summers speed the growth.

Scientists track each summer's bloom and try to predict its size. Their reports are used by water plants like Toledo's, which now test more often and use carbon filters to remove toxins. Farmers in the area have also begun planting cover crops, strips of grass or clover between fields, and applying fertilizer in smaller amounts at better times to keep phosphorus on the land.

The Toledo story is about more than one city. Everything people put on the ground eventually ends up in water. A choice made on a farm in the spring can show up in a kitchen faucet in the summer. To keep Lake Erie healthy, people who live far from the shore must also pay attention to where their runoff goes.
`,
  ],
  cards: [
    ["Central idea", "The most important point an informational text makes about its topic."],
    ["Supporting detail", "A fact, example or reason that helps prove or explain the central idea."],
    ["Summary", "A short retelling of the main points in your own words, with no opinions."],
    ["Evidence", "Facts, examples or quotations from the text that back a claim."],
    ["Topic", "The subject of a text in a word or two."],
    ["Paraphrase", "To restate an idea in your own words without changing its meaning."],
    ["Runoff", "Water that flows over land and carries things like fertilizer into rivers and lakes."],
    ["Cause and effect", "A relationship in which one event makes another happen."],
  ],
  closed: [
    [
      "Which sentence best states the central idea of \"When Lake Erie Turned Green\"?",
      [
        "Algae are plant-like organisms that live in water.",
        "Toledo ran out of bottled water in August 2014.",
        "What people put on land eventually reaches water, so protecting Lake Erie takes attention far from the shore.",
        "Zebra mussels came to the Great Lakes in the 1980s.",
      ],
      "C",
    ],
    [
      "A student claims, \"Farm runoff is a major cause of the algae bloom.\" Which evidence from the reading best supports the claim?",
      [
        "Heavy rain in spring washes fertilizer, which contains phosphorus, into rivers that flow into the lake.",
        "Toledo residents drove to stores for bottled water.",
        "Scientists track the size of each summer's bloom.",
        "Water plants use carbon filters.",
      ],
      "A",
    ],
    [
      "What is the main job of the second paragraph, which describes algae and phosphorus?",
      [
        "To tell the story of the Toledo water crisis",
        "To argue that farmers are to blame",
        "To explain what causes the blooms",
        "To describe how scientists predict blooms",
      ],
      "C",
    ],
    [
      "Which detail is a supporting detail rather than part of the central idea?",
      [
        "Choices on land affect the water.",
        "Zebra mussels clear the lake so sunlight reaches the algae.",
        "Everyone should pay attention to runoff.",
        "Lake Erie needs protection from far-away sources of pollution.",
      ],
      "B",
    ],
    [
      "Which is the best summary of the article?",
      [
        "Toledo had trouble with its water in 2014 because it did not have enough bottled water.",
        "Algae in Lake Erie, fed by phosphorus runoff and warm water, forced Toledo to stop using its tap water, and the story shows why people far from the lake should care about runoff.",
        "Zebra mussels are an invasive species that harm Lake Erie, and farmers should plant clover.",
        "Scientists predict the size of blooms using computers and reports.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a two-sentence summary of \"When Lake Erie Turned Green\" that includes its central idea. Do not include your opinion.",
      scheme: [
        "States the cause: algae bloom fed by phosphorus runoff and warm water",
        "States the effect or event, such as Toledo's water advisory",
        "States the central idea, that land use affects water far away",
      ],
      model:
        "In 2014, an algae bloom in Lake Erie, fed by phosphorus runoff from farms and warm water, forced Toledo to tell residents not to drink their tap water. The article shows that what people do on land eventually affects the water, so even people far from the lake have to think about runoff.",
      answers: [
        [
          "full",
          "[[0|A bloom of toxic algae grew in Lake Erie because of phosphorus runoff from fertilizer and warm weather.]] [[1|It made Toledo tell people not to drink tap water for about three days in 2014.]] [[2|The article's point is that what happens on land ends up in the water, so everyone needs to watch runoff.]]",
          "Full marks. Your summary is in your own words and leaves out minor details like the mussels.",
        ],
        [
          "full",
          "In 2014 [[1|Toledo had to stop its residents from using tap water because of microcystin from algae in the lake.]] [[0|The algae grew because of fertilizer runoff and hot summers.]] [[2|The author wants readers to know that actions on land affect water far away, even for people who do not live near the lake.]]",
          "All three marks. Good order, and you kept your opinion out.",
        ],
        [
          "partial",
          "[[0|Algae grew in Lake Erie because of fertilizer runoff.]] [[1|Toledo could not drink its water for three days in 2014.]]",
          "You gave the cause and the event. Add the central idea: what is the article trying to teach readers about runoff?",
        ],
        [
          "partial",
          "[[2|The author is saying that everyone has to take care of what goes on the ground because it ends up in the water.]] I think this is really important.",
          "Your central idea is right. Summaries should stay objective, so leave out \"I think.\" Also add the cause and the event that led to the central idea.",
          true,
        ],
        [
          "weak",
          "Zebra mussels are bad and algae are bad and Toledo is a city in Ohio with a lake.",
          "These facts are in the reading, but a summary connects them into a main point. What happened to Toledo, and why does the article say it matters?",
        ],
        [
          "weak",
          "[[0|Algae need warm water and phosphorus.]] Farmers should be arrested for polluting the lake.",
          "The first sentence is accurate. The article does not say farmers should be arrested, and a summary should not add opinions. Stick to the author's points.",
        ],
      ],
    },
    {
      prompt:
        "A classmate says, \"The article proves that farmers are the only cause of the algae bloom.\" Is the claim supported? Use evidence from the reading to agree or disagree.",
      scheme: [
        "States clearly whether the claim is supported or overstated",
        "Uses evidence that farm runoff is one cause",
        "Uses evidence that other causes also exist, such as sewage, zebra mussels or warm water",
        "Explains why the word \"only\" is the problem",
      ],
      model:
        "The claim goes too far. The article says runoff from fertilizer on farms is a cause, because rain washes phosphorus into rivers. But it also names sewage that was not fully treated, zebra mussels that let sunlight reach the algae, and warmer summers. Because the article gives several causes, calling farmers the only cause is not supported.",
      answers: [
        [
          "full",
          "[[0|I disagree, the claim is too strong.]] [[1|The article does say fertilizer runoff from farm fields is a cause.]] [[2|But it also says sewage, zebra mussels and warmer summers help the algae grow.]] [[3|Since there are other causes, the word \"only\" makes the claim wrong.]]",
          "Full marks. You gave evidence on both sides before judging the word \"only.\"",
        ],
        [
          "full",
          "[[0|The claim is not supported.]] [[1|Farm runoff does cause some of the phosphorus.]] [[2|However the article says warm water, sewage and the zebra mussels also play a part.]] [[3|If a reader says only, they ignore everything else the author wrote.]]",
          "All four marks. Careful reading of one word is a skill that helps on the ACT too.",
        ],
        [
          "partial",
          "[[0|The claim is wrong.]] [[1|Farmers use fertilizer and it runs off into the rivers.]] But I don't think farmers do it on purpose.",
          "You judged the claim and used a real detail. Now find the other causes in the reading to show why \"only\" is the issue.",
        ],
        [
          "partial",
          "[[2|There are other causes like warm water and zebra mussels.]] [[3|So it is not the only cause.]]",
          "Strong on the other causes. State your position at the start and give the farm evidence to show you read both sides.",
          true,
        ],
        [
          "weak",
          "The claim is right because the article talks about farms a lot. Farms have fertilizer so they are the cause.",
          "The article does mention farms, but it names other causes too. Reread paragraphs two and three for them.",
        ],
        [
          "weak",
          "[[0|The claim is not supported.]] Because the article is about Toledo and not about farms.",
          "You judged the claim well. The reason does not fit: the article does talk about farms. Use specific details about runoff and the other causes.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "How writers link ideas, why they write, and writing a narrative",
  note: `
## Objectives

Students will be able to:

1. analyze how an author introduces, links and develops a series of ideas or events;
2. identify an author's purpose and point of view and explain the rhetoric used to advance it;
3. write a narrative with a clear point of view, pacing, sensory detail and a reflective ending.

## Materials

The reading "Let Us Sleep," two highlighters, narrative planning organizer.

## Starter (8 minutes)

Read aloud the first sentence of the reading: "At 6:40 on a January morning, the first bus on Route 8 pulls up to a dark stop." Ask: "What do you see, hear and feel? What does the writer want you to feel before the argument starts?"

## Main activity

1. Students mark the reading's path: opening scene, claim, reasons, counterargument, closing call to act. Draw arrows to show how each paragraph hands off to the next with a transition.
2. Teach purpose and point of view. Purpose: to persuade. Point of view: the writer is a parent and a teacher, not a neutral observer. Students list three words that show it.
3. Name the rhetoric: appeal to feelings (the dark stop), appeal to evidence (the sleep research), appeal to fairness (the counterargument).
4. Narrative workshop: students choose a ten-minute memory, such as the first day of a new school, and sketch three moments in order. They write two sentences of sensory detail for the middle moment and a reflective ending.

## Checking for understanding

Share one sensory sentence aloud. Classmates identify which sense it uses.

## Exit ticket

Finish the sentence: "The author wants me to ..., and I know because ..."
`,
  reading: [
    "Let Us Sleep",
    `
At 6:40 on a January morning, the first bus on Route 8 pulls up to a dark stop. A boy in a green hoodie climbs on with his eyes half shut. He will be in first period before the sun comes up, and in his chair by 7:25 with a pencil he is too tired to hold. His story is not unusual in Columbus. It is the story of thousands of teenagers whose school day begins before their bodies are ready for it.

I have taught ninth grade for twelve years, and I am convinced our high school start time of 7:25 is hurting students. Sleep researchers have found that during the teenage years the body clock shifts later, so that most teens do not feel sleepy until close to eleven at night. A student who falls asleep at eleven and wakes at six gets about seven hours, not the eight to ten hours that doctors recommend. First, this makes it hard to pay attention. Second, it makes it hard to remember what we teach. Finally, tired students are more likely to feel sad or to have car accidents once they begin to drive.

Some will say that moving the bell later will cost money, because buses run in tiers and a later high school start would push elementary school earlier. That concern is fair. However, districts across the country have moved their start times, and many found the cost smaller than they feared, while attendance and grades improved. Others worry about after-school sports, but practice can begin later or be held under the lights.

My students are not lazy. They are working against their own biology, and the schedule we hand them makes it harder. Consider the boy on Route 8. If the bell rang an hour later, he would not just sleep longer. He would arrive awake, ready to learn, and able to hold on to the pencil.

The Board of Education will vote in March. I am asking every parent and neighbor to write to them. Let us give our teenagers the chance to be students at the time of day when they can actually learn.
`,
  ],
  cards: [
    ["Purpose", "The reason an author writes: to inform, persuade, entertain or explain."],
    ["Point of view (author)", "The author's position or attitude toward the topic."],
    ["Rhetoric", "The way a writer uses language to persuade or influence an audience."],
    ["Transition", "A word or phrase, like first, however or finally, that links ideas."],
    ["Counterargument", "An objection from the other side, which a writer answers to strengthen the case."],
    ["Sensory detail", "Description that appeals to sight, sound, smell, taste or touch."],
    ["Pacing", "The speed at which events or ideas move, controlled by detail and sentence length."],
    ["Reflection", "A closing thought about what an experience meant or taught."],
  ],
  closed: [
    [
      "What is the most likely purpose of \"Let Us Sleep\"?",
      [
        "To entertain readers with a story about a bus",
        "To persuade the school board and community to change a start time",
        "To explain how buses are scheduled",
        "To describe the history of the school bell",
      ],
      "B",
    ],
    [
      "The author opens with the boy on Route 8. Why start with a scene?",
      [
        "To prove that the bus is always late",
        "To confuse the reader before the argument",
        "To give the schedule of Route 8",
        "To make the reader care about a real student before the claim",
      ],
      "D",
    ],
    [
      "In the third paragraph the author writes, \"That concern is fair. However, districts across the country have moved their start times.\" What is the author doing?",
      [
        "Admitting an objection and then answering it",
        "Changing the subject to sports",
        "Agreeing completely with the objection",
        "Ending the argument",
      ],
      "A",
    ],
    [
      "Which phrase from the reading best shows the author's point of view as a teacher?",
      [
        "\"Route 8 pulls up to a dark stop\"",
        "\"buses run in tiers\"",
        "\"I have taught ninth grade for twelve years\"",
        "\"The Board of Education will vote in March\"",
      ],
      "C",
    ],
    [
      "In a narrative, which sentence uses sensory detail?",
      [
        "I was nervous on my first day.",
        "The hallway smelled like floor wax and burnt toast, and my shoes squeaked with every step.",
        "It was a long day at school.",
        "Many students feel nervous on the first day.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Identify the author's purpose in \"Let Us Sleep.\" Then name one example of rhetoric the author uses (an appeal to feelings, evidence or fairness), quote or describe it, and explain how it advances the purpose.",
      scheme: [
        "States the purpose accurately: to persuade the board and community to start high school later",
        "Names and identifies a specific rhetorical technique",
        "Explains how the technique helps persuade the audience",
      ],
      model:
        "The author's purpose is to persuade the school board and the community to move the high school start time later. One technique is the opening scene of the boy on Route 8, which appeals to the reader's feelings. By making the reader picture a tired student in the dark, the author makes the problem feel real before giving the research, so the reader is more willing to agree.",
      answers: [
        [
          "full",
          "[[0|The purpose is to persuade the board and parents to start high school later in the morning.]] [[1|The author uses an emotional appeal when she describes the boy in the green hoodie on the dark bus.]] [[2|It makes you feel sorry for him, so when the facts come up you already care and are more likely to agree.]]",
          "Full marks. You named the purpose, the technique and the effect on the reader.",
        ],
        [
          "full",
          "[[0|She is trying to convince people to vote for a later bell.]] [[1|She uses a counterargument, where she says the cost concern is fair and then answers it with other districts.]] [[2|That makes her more trustworthy because she is not ignoring the other side, and it persuades readers who were worried about money.]]",
          "All three marks. A counterargument is a good choice and you explained why it persuades.",
        ],
        [
          "partial",
          "[[0|The author wants to persuade the school board.]] She uses a lot of facts and she is a teacher.",
          "The purpose is right. Choose one technique and say how it works on the reader. \"A lot of facts\" is too general.",
        ],
        [
          "partial",
          "[[1|She uses an appeal to feelings with the boy on the bus.]] [[2|It makes people care.]]",
          "Your technique and effect are right. State the purpose clearly too: what does she want the board to do?",
          true,
        ],
        [
          "weak",
          "The purpose is to tell us about her job as a teacher. She uses rhetoric because she is a teacher.",
          "She mentions teaching, but the point of the piece is to get people to act. Look at her last paragraph for what she asks.",
        ],
        [
          "weak",
          "[[0|The author wants to persuade people.]] She uses the word first and finally, so that is rhetoric.",
          "The purpose is right but could say who and about what. Words like first and finally are transitions. Rhetoric is a technique aimed at the reader, like the opening scene.",
        ],
      ],
    },
    {
      prompt:
        "Write a short narrative paragraph (four to six sentences) about a moment from your own life, such as a first day, a game or a family event. Use a clear point of view, at least two sensory details, and end with a reflective sentence.",
      scheme: [
        "Tells the story from a clear point of view, such as first person",
        "Uses at least two sensory details",
        "Controls pacing so the key moment is developed",
        "Ends with a reflection on what the moment meant",
      ],
      model:
        "I stood at the edge of the pool, and the chlorine stung my nose. The whistle blew, and the shouts of the crowd turned into one low roar in my ears. I hit the water and the cold shocked my arms awake. Every stroke took forever, and every breath felt shorter than the last. When my hand finally hit the wall, I did not look at the clock. I understood that I had kept going when I wanted to quit, and that was enough.",
      answers: [
        [
          "full",
          "[[0|I walked into Grandma's kitchen on Thanksgiving morning]] and [[1|the whole house smelled like sage and warm butter, and the oven fan hummed over the pie crust.]] [[2|My cousins crowded around the counter and I waited my turn to stir the gravy, counting the stirs under my breath.]] [[3|I realized that the best part of the holiday was not the food but being squeezed in with everyone.]]",
          "Full marks. The smell and sound details are specific, and your last sentence reflects instead of just ending.",
        ],
        [
          "full",
          "[[0|I remember the first time I took the bus alone.]] The seat was cracked and sticky, [[1|and the driver's radio crackled with a song I did not know while the windows rattled.]] [[2|I held my backpack on my lap and watched each stop go by, afraid to miss mine, until I finally saw the green sign for Maple.]] [[3|I learned that being scared and doing it anyway is what growing up feels like.]]",
          "All four marks. Slowing down at the end, when you watch each stop, is strong pacing.",
        ],
        [
          "partial",
          "[[0|I was at the football game last Friday.]] [[1|It was loud and the lights were really bright.]] We won and it was fun.",
          "Your point of view and sensory details are a good start. Slow down on one moment and finish with a sentence that says what it meant to you.",
        ],
        [
          "partial",
          "Last summer I went to Buckeye Lake. [[2|I jumped off the dock three times, once for each of my cousins, and then I hesitated at the last one, standing there with the sun on my back and my toes curled over the edge.]] [[3|It taught me that waiting is usually harder than jumping.]]",
          "Strong pacing and a thoughtful ending. Add more sensory detail, like how the water smelled or sounded, and set up the point of view in your opening.",
          true,
        ],
        [
          "weak",
          "It was a very good day. We did a lot of things and everyone was happy. It was the best day ever.",
          "These sentences tell me the feeling but show nothing. Choose one moment and describe what you saw, heard or smelled.",
        ],
        [
          "weak",
          "[[0|I went to my aunt's house.]] Then we ate and then we left. Then we went home.",
          "You have a point of view. Use more detail in the middle and end with a sentence about what the visit meant.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Informative essays and arguments with a counterclaim",
  note: `
## Objectives

Students will be able to:

1. write an informative essay that organizes ideas under a clear thesis with relevant facts and examples;
2. write an argument that states a precise claim, supports it with reasons and evidence, and addresses a counterclaim.

## Materials

Sample thesis statements on strips of paper, a planning organizer, and two model paragraphs.

## Starter (8 minutes)

Display two sentences: "Pizza is food." and "A school lunch of pizza, salad and fruit gives students more energy than a vending machine snack." Ask which one could start an essay and why. Introduce the idea that a thesis tells what the paper will explain or prove.

## Main activity

1. Contrast informative and argument writing. An informative thesis explains ("Lake-effect snow forms when ..."). An argument thesis takes a side ("Ohio should ...").
2. Sort ten thesis strips into strong, vague and too broad. Students revise two of the weak ones.
3. Build an outline: thesis, three supporting points, fact or example for each.
4. For argument: introduce the counterclaim, the strongest objection from the other side. Model a rebuttal paragraph that begins with "Some argue ..." and answers with evidence.
5. Students draft their thesis and one counterclaim paragraph on a topic they choose.

## Checking for understanding

Read thesis statements aloud and have the class vote: informative or argument?

## Exit ticket

Write a thesis statement for an argument about the school's phone policy.
`,
  reading: [
    "Thesis, evidence and the other side",
    `
Every strong essay begins with a **thesis**: one or two sentences that tell the reader the main point. A thesis is not a topic. "School lunch" is a topic. "Columbus schools should serve more fresh fruit because it improves how students feel and perform" is a thesis, because it has a position and a reason.

**Informative writing** explains. Its thesis names a subject and tells what the essay will teach: "Lake-effect snow forms when cold air moves over the warm water of Lake Erie and picks up moisture." The body paragraphs then take each part in turn, such as the cold air, the warm lake and the land that the clouds drift over. Each paragraph has a topic sentence and **evidence**: facts, definitions, examples, numbers and quotations. A reader should be able to take each piece of evidence and see which part of the thesis it supports.

**Argument writing** takes a side. Its thesis is a **claim** that a thoughtful person could disagree with. It is supported by **reasons**, and each reason needs evidence. If your claim is that phones should be put away during class, a reason might be that they distract students, and your evidence might be a study of test scores or a personal observation. Your evidence should be relevant, accurate and enough to persuade.

A strong argument also deals with the other side. A **counterclaim** is the best objection someone might raise. Maybe a classmate says phones are needed for emergencies. Instead of ignoring this, say it fairly and then respond: "Some students say they need their phones in case of an emergency. However, the school office can reach any student in minutes, and students could keep their phones in their bags and check them at lunch." Notice the move: acknowledge, then answer with a reason. A writer who answers the other side sounds fair and confident.

Finally, use **transitions** such as for example, in addition, however and as a result to guide the reader. They show how the pieces connect, so the essay reads like one line of thought and not a list.
`,
  ],
  cards: [
    ["Thesis", "A sentence or two that states the main point of an essay."],
    ["Claim", "A position in an argument that someone could disagree with."],
    ["Reason", "A statement that explains why the claim is true."],
    ["Evidence", "Facts, examples, statistics or quotations that support a reason."],
    ["Counterclaim", "An objection or opposing position to the writer's claim."],
    ["Rebuttal", "The writer's response to a counterclaim."],
    ["Topic sentence", "The sentence that states the main point of a paragraph."],
    ["Informative writing", "Writing that explains or describes a subject without taking a side."],
  ],
  closed: [
    [
      "Which sentence is a thesis for an argument essay?",
      [
        "Cell phones are in many classrooms.",
        "This essay is about cell phones.",
        "Students should keep their phones in lockers during class because phones distract from learning.",
        "Cell phones were invented in the 1970s.",
      ],
      "C",
    ],
    [
      "Which thesis is informative rather than argumentative?",
      [
        "The Scioto River became a center of trade because of its location, its fertile land and its link to canals.",
        "Columbus should build a new bridge over the Scioto.",
        "Everyone should visit the Scioto River this summer.",
        "The Scioto River is the best river in Ohio.",
      ],
      "A",
    ],
    [
      "A writer argues that school should start later. Which is a counterclaim?",
      [
        "Teens need more sleep.",
        "Later start times might force sports practices to run in the dark.",
        "Studies show higher attendance with later start times.",
        "Many districts have changed their bells.",
      ],
      "B",
    ],
    [
      "Which response is the strongest rebuttal to the counterclaim \"Later starts cost too much\"?",
      [
        "That is not true because I said so.",
        "Money does not matter in schools.",
        "Some districts that moved start times found the cost smaller than expected and saw better attendance.",
        "Nobody cares about buses.",
      ],
      "C",
    ],
    [
      "Which transition best fits between \"Many students enjoy group projects\" and \"Others find them frustrating\"?",
      ["For example", "In conclusion", "As a result", "However"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Write a thesis statement for an informative essay about how lake-effect snow forms, and list three points your body paragraphs will cover. Each point should be a different piece of the explanation.",
      scheme: [
        "Writes a clear thesis that names the subject and its main idea",
        "Lists a first relevant supporting point",
        "Lists a second, different supporting point",
        "Lists a third, different supporting point",
      ],
      model:
        "Lake-effect snow forms when cold air moves across the warmer water of a Great Lake and picks up moisture that falls as snow on the downwind shore. My body paragraphs will explain (1) how the cold air mass arrives, (2) how the warm lake adds heat and moisture, and (3) how the land causes the clouds to rise and drop snow.",
      answers: [
        [
          "full",
          "[[0|Lake-effect snow happens when cold wind blows over the warm water of Lake Erie and carries moisture onto land, where it falls as snow.]] My paragraphs will cover [[1|how the cold air gets to the lake,]] [[2|how the lake gives the air heat and water vapor,]] and [[3|why the snow falls on the shore side where the air rises over land.]]",
          "Full marks. Each point is a different step in the process, so the essay would be well organized.",
        ],
        [
          "full",
          "[[0|When freezing air crosses an unfrozen lake, the lake warms and moistens it, and that is how lake-effect snow forms.]] [[1|First I will explain what makes the air cold enough.]] [[2|Next I will explain the role of the warm lake water in adding moisture.]] [[3|Last I will explain why the land makes the clouds drop snow.]]",
          "All four marks. Using first, next, last also shows the order your reader will follow.",
        ],
        [
          "partial",
          "[[0|Lake-effect snow comes from cold air going over a warm lake.]] [[1|I will talk about cold air.]] [[2|I will talk about the lake.]]",
          "Good thesis and two points. Add a third distinct point, such as why snow falls inland, and say what you will explain about each.",
        ],
        [
          "partial",
          "[[1|Cold air from Canada,]] [[2|warm lake water,]] and [[3|land that pushes the clouds up]] are the three things I will cover.",
          "Your three points are strong and different. Now add a thesis sentence that ties them into one idea about how lake-effect snow forms.",
          true,
        ],
        [
          "weak",
          "Snow is cold and white and it falls in winter. I will write about snow, and also about winter, and also about snow days.",
          "These are topics, not a thesis about how snow forms. Start by saying what causes lake-effect snow.",
        ],
        [
          "weak",
          "[[0|Lake-effect snow forms when cold air crosses a warm lake.]] I will write about how much I like snow, my favorite sled, and why school should close.",
          "Your thesis is clear. The points should explain the process, not your opinions. Replace each with a step in how the snow forms.",
        ],
      ],
    },
    {
      prompt:
        "Write a short paragraph (four to six sentences) that states a counterclaim to the claim \"Students should be allowed to eat lunch off campus,\" and then answers it with a rebuttal.",
      scheme: [
        "States a fair, specific counterclaim",
        "Signals the shift with a transition such as however",
        "Gives a reasoned rebuttal supported by a reason or evidence",
        "Keeps a respectful, confident tone",
      ],
      model:
        "Some people argue that off-campus lunch would be unsafe, because students would cross busy roads and some might not return on time. However, the school could allow it only for juniors and seniors with a signed form, and many districts that do this report few problems. Students who return late could lose the privilege, which gives them a strong reason to be responsible.",
      answers: [
        [
          "full",
          "[[0|Some parents worry that students would cross busy streets and be late coming back.]] [[1|However,]] [[2|the school could limit it to upperclassmen with a signed form, and anyone who is late would lose the privilege, so students have a strong reason to be on time.]] [[3|That is a fair worry, but it can be solved with simple rules.]]",
          "Full marks. You treated the worry as reasonable and answered it with a concrete plan.",
        ],
        [
          "full",
          "[[0|The main objection is that the cafeteria would lose money if students eat elsewhere.]] [[1|On the other hand,]] [[2|students who leave would free up lines and tables, and the cafeteria could focus on those who stay, so the savings might balance the loss.]] [[3|The concern is understandable, and a trial semester could show the real numbers.]]",
          "All four marks. Suggesting a trial semester shows you take the objection seriously.",
        ],
        [
          "partial",
          "[[0|Some people think students will get in trouble if they leave school.]] [[1|But]] that is just their opinion and it is not a big deal.",
          "Your counterclaim is fair and the transition is there. The rebuttal needs a reason, not a dismissal. How could the school prevent trouble?",
        ],
        [
          "partial",
          "[[2|The school could make a sign-out sheet and only let seniors go, so it would be safer.]] [[3|I understand the worry about safety.]]",
          "Your rebuttal and tone are good. State the counterclaim in your own words first, so the reader knows what you are answering.",
          true,
        ],
        [
          "weak",
          "Nobody would disagree with this because everyone loves off campus lunch. The cafeteria food is bad anyway.",
          "A counterclaim is a real objection from the other side. Think of what a principal or parent might worry about.",
        ],
        [
          "weak",
          "[[0|Some people say it is unsafe.]] They are wrong and I do not want to talk about it more.",
          "You named a counterclaim. Now respond to it with a reason or a plan, not just \"they are wrong.\"",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Revising with feedback and taking part in a seminar",
  note: `
## Objectives

Students will be able to:

1. plan, revise and edit writing after feedback, and say what each revision changed;
2. contribute to a seminar discussion by preparing in advance, building on others' points and keeping to agreed rules.

## Materials

A draft paragraph with teacher comments on a projector, a revision log chart, and seminar preparation cards.

## Starter (8 minutes)

Show a draft sentence: "The story was good because stuff happened." Ask students how many ways it could improve. Collect ideas for clarity, detail, and word choice. Introduce the difference between revising (changing ideas, order, evidence) and editing (fixing spelling, punctuation, grammar).

## Main activity

1. Read a teacher comment on the projected draft. Model one revision, then write in the log: what I changed, why, and what it improved.
2. Students revise their own Week 6 argument paragraph using at least three comments from a partner, and fill in a revision log.
3. Teach seminar norms: prepare two quotations and a question, speak after listening, say "I want to build on what ... said," invite quiet voices, and use evidence.
4. Practice a ten-minute seminar in groups of six on the question: "Does Rainsford change in 'The Most Dangerous Game'?"

## Checking for understanding

Observer in each group tallies who spoke and who built on another speaker.

## Exit ticket

Complete: "One revision I made was ..., and it made my writing better because ..."
`,
  reading: [
    "Revising is re-seeing",
    `
Professional writers rarely get it right the first time. They write a draft, get feedback, and then change it. The word **revise** comes from a Latin word meaning to see again. Revising is not just fixing mistakes. It is looking at your work with fresh eyes and asking what the reader needs.

A good revision starts with **feedback**. A teacher or classmate may say, "I do not see your evidence," or "This paragraph jumps around." Do not take it as an insult. A reader's confusion is useful information because you cannot see your own writing the way a stranger does. Read the comment, decide what it means, and choose a change. Sometimes you add evidence. Sometimes you move a sentence, cut a repeated idea, or replace a vague word like "good" with a precise one like "gripping."

Writers then **edit**, which is different. Editing is the final polish: spelling, capital letters, punctuation, and grammar. If you edit before you revise, you might perfect a sentence that you later delete. The usual order is plan, draft, revise, edit, then publish.

It helps to keep a **revision log**. For each change, write what you changed, why, and what it improved. For example: "Changed 'Rainsford was scared' to 'Rainsford's hands shook as he lashed the vines.' I wanted to show fear instead of telling it, so the scene is more vivid." A log proves that you thought about your choices, and it makes you a better writer next time.

Revision also matters in speaking. In a **seminar**, a student-led discussion about a text, you "revise" your thinking as you listen. You prepare ahead by marking passages and writing a question. During the talk you speak, but you also listen and build on others: "I agree with Maria that the island is a trap, and I would add that the setting is almost another character." When you disagree, do so with evidence and respect. The goal is not to win but to understand the text better together.
`,
  ],
  cards: [
    ["Revise", "To change the ideas, organization, evidence or word choice of a draft."],
    ["Edit", "To correct spelling, punctuation, capitalization and grammar."],
    ["Feedback", "Comments from a reader about what works and what to improve."],
    ["Revision log", "A record of each change, why it was made and what it improved."],
    ["Seminar", "A student-led discussion about a text."],
    ["Build on", "To add to another speaker's idea instead of starting a new one."],
    ["Evidence-based comment", "A remark in discussion that points to the text."],
    ["Active listening", "Paying full attention to a speaker and responding to what they said."],
  ],
  closed: [
    [
      "Which is a revision rather than an edit?",
      [
        "Fixing the spelling of \"recieve\"",
        "Adding a capital letter to a name",
        "Moving a paragraph so the strongest reason comes last",
        "Putting a comma after \"however\"",
      ],
      "C",
    ],
    [
      "A classmate writes \"unclear evidence\" next to your paragraph. What is the best response?",
      [
        "Delete the paragraph.",
        "Ignore the comment because it is only one opinion.",
        "Add a specific quotation and explain how it supports the point.",
        "Make the font bigger.",
      ],
      "C",
    ],
    [
      "Why is it better to revise before editing?",
      [
        "Editing is not important.",
        "You might polish sentences that you later cut or change.",
        "Teachers read revisions first.",
        "Revising takes less time.",
      ],
      "B",
    ],
    [
      "In a seminar, which comment best builds on another speaker?",
      [
        "My question is different, so I will skip what Dana said.",
        "I did not read it.",
        "I agree with Dana that Zaroff is cruel, and on page nine his calm voice shows he does not see it as cruel.",
        "Whatever.",
      ],
      "C",
    ],
    [
      "What belongs in a revision log?",
      [
        "What changed, why, and what it improved",
        "The name of every student in the class",
        "Only the final grade",
        "A list of words that were deleted",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Here is a draft sentence and a teacher comment. Draft: \"Rainsford was scared in the jungle.\" Comment: \"Show me, don't tell me.\" Revise the sentence, then write a revision log entry that says what you changed, why, and what it improved.",
      scheme: [
        "Revises the sentence with specific, showing detail",
        "States what was changed",
        "Explains why the change was made, in response to the comment",
        "Says what the change improved for the reader",
      ],
      model:
        "Revision: Rainsford's heart pounded as he crouched in the wet ferns, listening for the sound of Zaroff's boots. Log: I replaced the word scared with details of his heart, his hiding and the sound he listens for. The teacher asked me to show and not tell, so I used actions. The sentence now makes the reader feel the fear instead of just being told about it.",
      answers: [
        [
          "full",
          "[[0|Rainsford's breath came in short gasps and his fingers dug into the mud while a twig snapped behind him.]] Log: [[1|I swapped the word scared for what his body does and what he hears.]] [[2|You said show don't tell, so I wrote actions the reader can picture.]] [[3|Now the reader feels the tension themselves.]]",
          "Full marks. Your log connects the comment, the change and the effect.",
        ],
        [
          "full",
          "[[0|Every shadow in the jungle looked like General Zaroff, and Rainsford froze with his knife shaking in his hand.]] Revision log: [[1|I changed the sentence from a feeling word to a picture of him freezing.]] [[2|The comment asked me to show, so I used his hand shaking.]] [[3|It improves the scene because you see how afraid he is.]]",
          "All four marks. Specific details like the shaking knife are exactly what the comment wanted.",
        ],
        [
          "partial",
          "[[0|Rainsford's legs trembled as he ran through the dark trees.]] Log: I changed the sentence to be better.",
          "Your revised sentence works. The log needs to say what you changed, why, and what it improved, not just that it is better.",
        ],
        [
          "partial",
          "Rainsford was very very scared in the jungle. Log: [[1|I changed the sentence by adding words.]] [[2|The teacher asked me to show.]]",
          "Your log names the comment, but the sentence still tells. Rewrite it with actions or details, like what he sees or hears.",
          true,
        ],
        [
          "weak",
          "Rainsford was terrified in the jungle. Log: I made it stronger by using a bigger word.",
          "Terrified is still a feeling word. The comment wants an image. What does his body do?",
        ],
        [
          "weak",
          "Rainsford was in the jungle and he was scared. [[1|I added the word and.]]",
          "That sentence is almost the same as the draft. Describe what he does or hears to show fear, and say why you made the change.",
        ],
      ],
    },
    {
      prompt:
        "You are preparing for a seminar on \"The Most Dangerous Game.\" Write one question for the group, one piece of evidence from the text you would bring, and one sentence you could use to build on another speaker.",
      scheme: [
        "Writes an open question that invites discussion",
        "Chooses a specific piece of evidence from the text",
        "Writes a sentence that builds on another speaker's idea",
      ],
      model:
        "Question: Is Rainsford a hero or has he become like Zaroff? Evidence: At the end he goes to Zaroff's bedroom and says he is still a beast at bay, which shows he is willing to hunt a man. Building sentence: I agree with Jamal that Rainsford wins, but I would add that the way he wins makes me wonder what he has lost.",
      answers: [
        [
          "full",
          "[[0|My question is, does Rainsford learn anything from being hunted, or does he just get better at hunting?]] [[1|My evidence is that at the end he sleeps in Zaroff's bed and says it is the best bed he has ever slept in, which seems calm for someone who just killed a man.]] [[2|I would say, I agree with Sophie that he changed, but I think the change is that he stopped caring.]]",
          "Full marks. Your question can be argued either way, and your building sentence names who you are answering.",
        ],
        [
          "full",
          "[[0|Why does Connell end the story with Rainsford waiting instead of showing the fight?]] [[1|I would bring the part where Zaroff says dinner is ready and Rainsford answers from behind the curtain.]] [[2|I'd say, building on what Marcus said about suspense, the missing fight keeps the suspense going after the story ends.]]",
          "All three marks. A question about the author's choice leads to good discussion.",
        ],
        [
          "partial",
          "[[0|What does the island mean?]] My evidence is that Zaroff is mean. I would say I agree with everyone.",
          "Your question works. Bring a specific moment from the text, and build on a particular speaker's idea instead of everyone.",
        ],
        [
          "partial",
          "[[1|I will bring the quote where Whitney says the island has a bad name and the sailors are afraid.]] [[2|I could say, to add to what Eli said, that quote is foreshadowing.]]",
          "Evidence and building sentence are strong. Add a question the group can discuss, such as why the author starts that way.",
          true,
        ],
        [
          "weak",
          "Did you like the story? I liked it. It was good.",
          "A good seminar question is open and about the text, not about liking. Try asking about Rainsford's choices.",
        ],
        [
          "weak",
          "[[0|Is Zaroff evil?]] I do not need evidence because everyone knows it.",
          "A seminar relies on text evidence. Choose a moment that shows Zaroff's behavior and think of a sentence that adds to someone's point.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Phrases, clauses and the meaning of unfamiliar words",
  note: `
## Objectives

Students will be able to:

1. use phrases and clauses to add variety and precision to sentences;
2. work out the meaning of unfamiliar words from context, word parts and reference tools.

## Materials

Sentence strips, a root-and-affix chart, dictionaries or devices, and the problem set.

## Starter (8 minutes)

Put the sentence on the board: "The dog barked." Ask students to add information, one piece at a time: when, where, why, how. Write the longer sentence: "After the mail carrier left, the dog barked loudly at the gate because it wanted attention." Label the parts as a class.

## Main activity

1. Teach the vocabulary: a phrase is a group of words without both a subject and a verb; a clause has both. An independent clause stands alone; a dependent clause cannot.
2. Students underline phrases and circle clauses in five sentences. Check as a group.
3. Practice combining: take two short sentences and join them using a dependent clause (because, although, when) or a participial phrase ("Running down the hall, ...").
4. Vocabulary strategies station: context clues, prefixes, roots, suffixes, and checking a dictionary. Students tackle six unfamiliar words using at least two strategies each.

## Checking for understanding

Whiteboard: write a sentence with one independent clause and one dependent clause.

## Exit ticket

Write the meaning of "unpredictable" using its prefix, root and suffix.
`,
  reading: [
    "Building sentences and building meaning",
    `
Good writers vary their sentences. A string of short sentences, such as "I woke up. I ate. I walked to school," sounds like a drumbeat. By using **phrases** and **clauses** you can join ideas, add detail and control rhythm.

A **phrase** is a group of words that works together but does not have both a subject and a verb. "After the game" is a prepositional phrase. "Running down the hall" is a participial phrase, which begins with a verb form and describes a noun. A **clause** has a subject and a verb. An **independent clause** can stand alone as a sentence: "The team celebrated." A **dependent clause** begins with a word like because, although, when or if, and cannot stand alone: "although it was raining." Joined together they make a **complex sentence**: "The team celebrated although it was raining." When a dependent clause comes first, use a comma: "Although it was raining, the team celebrated."

Choosing a precise phrase or clause lets you pack in information. Compare "The bus was late. I missed the quiz." with "Because the bus was late, I missed the quiz." The second version shows the cause, and the reader does not have to guess.

Variety also helps with new vocabulary, because writers use sentences to explain hard words. When you meet an unfamiliar word, look first at **context clues**, the nearby words. In "The speaker was so eloquent that the whole room sat silent, hanging on every word," the clue that the room was silent and listening suggests eloquent means skilled at speaking.

You can also break a word into parts. A **prefix** comes at the beginning (un-, re-, pre-), a **root** carries the core meaning, and a **suffix** comes at the end (-able, -ness, -ly). Take "unpredictable": un- means not, pre- means before, the root dict means say or tell, and -able means able to be. So it means not able to be told ahead of time. Finally, confirm your guess in a dictionary or thesaurus, which also gives pronunciation and the part of speech.
`,
  ],
  cards: [
    ["Phrase", "A group of related words that lacks a subject-verb pair."],
    ["Clause", "A group of words with a subject and a verb."],
    ["Independent clause", "A clause that can stand alone as a sentence."],
    ["Dependent clause", "A clause that cannot stand alone; it begins with a word like because or although."],
    ["Context clue", "A hint in nearby words that helps you work out a word's meaning."],
    ["Prefix", "A word part added to the beginning of a word, such as un- or re-."],
    ["Root", "The core part of a word that carries its main meaning."],
    ["Suffix", "A word part added to the end of a word, such as -able or -ness."],
  ],
  closed: [
    [
      "Which group of words is a dependent clause?",
      [
        "After the final bell",
        "because the bus was late",
        "Running down the hall",
        "The bus was late.",
      ],
      "B",
    ],
    [
      "Which sentence correctly combines \"The team lost. They kept practicing\" into a complex sentence?",
      [
        "The team lost they kept practicing.",
        "The team lost, and they kept practicing, but.",
        "Although the team lost, they kept practicing.",
        "Although the team lost.",
      ],
      "C",
    ],
    [
      "\"The lecture was so tedious that half the class yawned and checked the clock.\" What does tedious most likely mean?",
      ["exciting", "boring and tiring", "loud", "short"],
      "B",
    ],
    [
      "The prefix re- means \"again.\" What does \"reconsider\" mean?",
      ["To forget", "To think about again", "To refuse", "To agree"],
      "B",
    ],
    [
      "Which sentence contains a participial phrase?",
      [
        "She is tall.",
        "Because she was late, she ran.",
        "Humming a tune, Maya walked into the gym.",
        "The gym was loud and warm.",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Combine these two sentences into one sentence that uses a dependent clause, and underline or name the dependent clause: \"Kofi missed the practice. He had a dentist appointment.\" Then write a second version that begins with the dependent clause and explain the punctuation.",
      scheme: [
        "Combines the sentences correctly with a dependent clause",
        "Identifies the dependent clause",
        "Rewrites the sentence starting with the dependent clause",
        "Places a comma after an opening dependent clause",
      ],
      model:
        "Kofi missed practice because he had a dentist appointment. The dependent clause is because he had a dentist appointment. Starting with it: Because he had a dentist appointment, Kofi missed practice. A comma follows the opening dependent clause.",
      answers: [
        [
          "full",
          "[[0|Kofi missed the practice because he had a dentist appointment.]] The dependent clause is [[1|because he had a dentist appointment]]. [[2|Because he had a dentist appointment, Kofi missed the practice.]] [[3|I put a comma after the clause since it comes first.]]",
          "Full marks. You explained the punctuation rule in your own words.",
        ],
        [
          "full",
          "[[0|Kofi missed practice since he had to go to the dentist.]] The dependent part is [[1|since he had to go to the dentist]] because it cannot be a sentence alone. [[2|Since he had to go to the dentist, Kofi missed practice.]] [[3|There is a comma there because a dependent clause came before the main part.]]",
          "All four marks. Noticing that the clause cannot stand alone is the key test.",
        ],
        [
          "partial",
          "[[0|Kofi missed the practice because he had a dentist appointment.]] The dependent clause is [[1|because he had a dentist appointment.]] Because he had a dentist appointment Kofi missed the practice.",
          "Your first sentence and label are right. In the second version you need a comma after the opening clause.",
        ],
        [
          "partial",
          "[[2|Although he had a dentist appointment, Kofi missed practice.]] [[3|I used a comma.]]",
          "The comma is right, but \"although\" changes the meaning: it does not show the reason. Use because, and also name the dependent clause.",
          true,
        ],
        [
          "weak",
          "Kofi missed the practice, he had a dentist appointment. The comma splits it into two parts.",
          "That is a comma splice. Use a word like because to join them, and the part that cannot stand alone is the dependent clause.",
        ],
        [
          "weak",
          "[[0|Kofi missed the practice because he had a dentist appointment.]] The dependent clause is Kofi missed the practice.",
          "Your combined sentence is good. But \"Kofi missed the practice\" can stand alone, so it is independent. The dependent clause is the part beginning with because.",
        ],
      ],
    },
    {
      prompt:
        "Read: \"The principal's announcement was unexpectedly ambiguous; some students thought school was closed and others thought it was only delayed.\" What does \"ambiguous\" mean? Use a context clue and at least one word part, then say how you could check your answer.",
      scheme: [
        "Gives an accurate meaning, such as unclear or having more than one meaning",
        "Uses a context clue from the sentence",
        "Uses a word part such as the prefix ambi- meaning both",
        "Names a way to confirm, such as a dictionary",
      ],
      model:
        "Ambiguous means unclear because it can be understood in more than one way. The clue is that some students thought school was closed and others thought it was delayed, so the message allowed two readings. The prefix ambi- means both, which fits. I would check a dictionary to confirm.",
      answers: [
        [
          "full",
          "[[0|Ambiguous means unclear, able to be read two ways.]] [[1|The sentence says some thought closed and some thought delayed, so the message had two meanings.]] [[2|It also starts with ambi, like ambidextrous, which means both.]] [[3|I would look it up in a dictionary to make sure.]]",
          "Full marks. Linking it to ambidextrous is a smart word-part connection.",
        ],
        [
          "full",
          "[[0|It means not clear, with more than one possible meaning.]] [[1|The context clue is that students disagreed about what the announcement meant.]] [[2|The prefix ambi- means both, so it fits something that goes both ways.]] [[3|I could check a thesaurus or dictionary.]]",
          "All four marks. You used both clue types and a way to verify.",
        ],
        [
          "partial",
          "[[0|It means unclear.]] [[1|Some students thought one thing and others thought another.]]",
          "Meaning and context clue are right. Add a word part and name a way to check your guess.",
        ],
        [
          "partial",
          "[[2|I know ambi means both.]] [[3|I would check the dictionary.]] I think it means confusing about school.",
          "Good strategy. Say the meaning more exactly and point to the context clue about students disagreeing.",
          true,
        ],
        [
          "weak",
          "It means announcement. I guessed because the sentence is about an announcement.",
          "The sentence uses the word to describe the announcement. Look at what the students disagreed about.",
        ],
        [
          "weak",
          "[[3|I would ask a friend.]] It means loud because principals are loud.",
          "Asking is not wrong, but check a dictionary or the clues in the sentence. The students disagree, so what does that tell you about the announcement?",
        ],
      ],
    },
  ],
};

writeCourse("english-9-grade-9.json", "English 9", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
