import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * English 11, Grade 11, Quarter 1: American literature. Standards: Common Core
 * State Standards, English Language Arts, Grade 11 (RL, RI, W, SL, L), in the
 * school's own words. Anchor texts: The Great Gatsby (public domain in the US),
 * Adventures of Huckleberry Finn, Franklin's Autobiography, Emerson's
 * "Self-Reliance", the Letter from Birmingham Jail (short phrases only) and
 * Tinker v. Des Moines (a court opinion).
 */

const w1: WeekInput = {
  topic: "What a text says, implies and leaves uncertain: The Great Gatsby",
  note: `
## Objectives

Students will be able to:

1. cite strong evidence for what a text says directly and what it implies, and weigh where it is uncertain;
2. determine two or more themes in a work of American literature and analyze how they interact;
3. analyze how an author's choices about setting, character and plot create effects such as irony or ambiguity.

## Materials

Class novels (The Great Gatsby, chapters 1 to 5 read), a three-column sheet (says / implies / uncertain), and a theme interaction grid.

## Starter (8 minutes)

Ask: "Nick says he is 'inclined to reserve all judgments.' Does he? Find one place in chapter 1 where he judges someone." Take two responses and note that the narrator's claim and his behavior are separate pieces of evidence.

## Main activity

1. Three-column reading. Choose a paragraph describing Gatsby's parties or Tom's study. Students list what the text says directly, what it implies, and what remains uncertain. Compare with neighbors.
2. Setting as argument. Contrast West Egg, East Egg and the Valley of Ashes. What does each place imply about the wealth and the people in it? Discuss the billboard of Dr. T. J. Eckleburg.
3. Theme interaction. Students pick two themes (the American Dream, class and money, the pull of the past) and explain how one complicates the other. Example: Gatsby's belief that he can repeat the past depends on money, yet money cannot give him what he wants.
4. Short analytic paragraph on the green light, with a direct statement, an inference and an acknowledged uncertainty.

## Checking for understanding

Exit slip: one inference supported by two pieces of evidence.

## Exit ticket

Identify one place where Fitzgerald creates irony and explain the gap between expectation and result.
`,
  reading: [
    "Reading what is said, what is implied, and what is left open",
    `
F. Scott Fitzgerald published The Great Gatsby in 1925, and it has become one of the books most often taught in American high schools. It is a short novel, but it rewards careful reading, because much of what matters is not stated outright. A strong reader distinguishes what the text says, what it implies, and what it leaves uncertain, and treats each differently.

What the text says is the plainest level. Nick Carraway, the narrator, moves to West Egg, next to a mansion owned by a man named Jay Gatsby, who throws enormous parties. Across the bay, in East Egg, live his cousin Daisy and her husband Tom Buchanan. These are facts. What the text implies requires an inference. When Nick describes Tom's house as "red and white Georgian Colonial," and then notes that Tom's body gives an impression of "enormous power," the passage suggests that wealth and physical dominance go together in Tom. When the novel places the Valley of Ashes, a gray industrial dump, between the wealthy towns and New York, the setting implies that the glamour of the rich depends on a landscape of poor people who pay for it.

What the text leaves uncertain is the most interesting. Nick calls himself "one of the few honest people that I have ever known," yet he arranges Gatsby's meeting with Daisy and keeps important facts from Tom. Is he honest, or is he a narrator who flatters himself? The novel does not say. Fitzgerald also leaves open whether Gatsby truly loves Daisy or loves the idea of what she represents. A reader should mark such moments and avoid forcing one reading.

Themes in the novel work together. The American Dream, the belief that anyone can rise by effort, appears in Gatsby's self-made fortune. But the novel complicates it with class: old money like the Buchanans treats new money as unwelcome, no matter how rich. A third theme, the power of the past, shows that Gatsby's dream depends on repeating something that has already ended. The themes interact. The Dream depends on money; money cannot buy the past; and the old rich guard their world against those who try.

The effect is irony. Gatsby, who has everything he can buy, dies alone, and at his funeral almost none of the guests from his parties appear. The gap between what the reader expects and what happens is the novel's judgment on the world it describes.
`,
  ],
  cards: [
    ["Direct statement", "What a text says outright."],
    ["Implication", "What a text suggests without stating, which a reader infers."],
    ["Ambiguity", "A feature that supports more than one reasonable reading."],
    ["Unreliable narrator", "A narrator whose account the reader has reasons to question."],
    ["Irony", "A gap between what is expected and what happens or is said."],
    ["American Dream", "The belief that anyone can rise through effort; a theme often examined by American writers."],
    ["Setting (as meaning)", "Place and time that shape mood, character and theme."],
    ["Theme interaction", "How two or more ideas in a work complicate or strengthen each other."],
  ],
  closed: [
    [
      "Nick says he is \"inclined to reserve all judgments,\" but he often judges others. What does this contrast make the reader question?",
      [
        "The accuracy of the setting",
        "Nick's reliability as a narrator",
        "Tom's wealth",
        "Gatsby's age",
      ],
      "B",
    ],
    [
      "What does the Valley of Ashes between West Egg and New York most strongly imply?",
      [
        "The rich towns are close to nature.",
        "The glamour of the wealthy depends on, and hides, the poverty and waste behind it.",
        "New York is a farm.",
        "Gatsby lives there.",
      ],
      "B",
    ],
    [
      "Which statement is a direct statement and not an inference?",
      [
        "Tom believes that he is better than other people.",
        "Daisy and Tom Buchanan live in East Egg.",
        "Gatsby is lonely.",
        "Nick envies the Buchanans.",
      ],
      "B",
    ],
    [
      "How do the themes of class and the American Dream interact in the novel?",
      [
        "They never overlap.",
        "Gatsby gains money, but old wealth still excludes him, which complicates the idea that effort alone brings acceptance.",
        "Class proves the Dream is easy.",
        "The Dream makes class disappear.",
      ],
      "B",
    ],
    [
      "The poorly attended funeral at the end creates irony because",
      [
        "the funeral is held in winter",
        "a man known for lavish parties is mourned by almost no one who enjoyed them",
        "the preacher forgot a speech",
        "Daisy gave a eulogy",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose one significant element of The Great Gatsby, such as the green light, the Valley of Ashes, or Nick's claim of honesty. State what the text says directly, what it implies, and what remains uncertain about it.",
      scheme: [
        "Names the element and states what the text says directly",
        "Offers a supported implication or inference",
        "Identifies a point of uncertainty or ambiguity",
        "Uses specific evidence from the text",
      ],
      model:
        "The Valley of Ashes is described as a gray area of dust and waste between West Egg and New York. It implies that the leisure of the rich depends on workers like George Wilson who live among the ashes. What remains uncertain is whether Fitzgerald blames the wealthy or simply shows the cost, since Nick, who narrates, seems fascinated by the rich even as he is repelled. The billboard of Dr. T. J. Eckleburg adds to the uncertainty: is it a god, a witness or merely an advertisement?",
      answers: [
        [
          "full",
          "[[0|The text says that the Valley of Ashes is a gray place of dust and ash between West Egg and New York, where George Wilson has his garage.]] [[1|It implies that the rich people of the Eggs depend on the people who live and work there and don't see them.]] [[2|It is uncertain whether the novel blames the rich, since Nick is the one telling it and he still admires some of them.]] [[3|The billboard of Dr. T. J. Eckleburg staring over the ashes is another piece of evidence that can be read as God watching or as just an advertisement.]]",
          "Full marks. You used the billboard to illustrate the uncertainty, which is what the third part needs.",
        ],
        [
          "full",
          "[[0|The text says Nick Carraway calls himself one of the few honest people he has ever known.]] [[1|It implies he wants the reader to trust his story, and it also hints he is defending himself, since he has just admitted to hiding things.]] [[2|It's uncertain whether he is honest or deceiving himself, because the novel never confirms it, and he arranges the meeting between Gatsby and Daisy without telling Tom.]] [[3|The evidence cuts both ways, so a careful reader has to hold both readings.]]",
          "All four marks. \"Hold both readings\" is a mature way to handle ambiguity.",
        ],
        [
          "partial",
          "[[0|The green light is at the end of Daisy's dock.]] [[1|It implies Gatsby wants her.]] I think it is a nice symbol.",
          "Your statement and inference are accurate. Add a point of uncertainty and a more specific piece of evidence.",
        ],
        [
          "partial",
          "[[2|It is unclear whether Gatsby loves Daisy or what she stands for.]] [[3|He stares at the green light across the bay.]]",
          "Good uncertainty and evidence. State what the text says directly and what it implies about the light.",
          true,
        ],
        [
          "weak",
          "The green light means money because money is green. There is no other way to read it.",
          "The text offers more than one reading. Connect the light to Gatsby's reaching toward Daisy and ask what else it could mean.",
        ],
        [
          "weak",
          "[[0|The Valley of Ashes is gray.]] Nothing is implied and nothing is uncertain because it is just a place.",
          "Settings in a novel do work. Ask what it suggests about who pays for the wealth nearby.",
        ],
      ],
    },
    {
      prompt:
        "Explain how two themes in The Great Gatsby interact. Choose two (such as the American Dream, class, or the pull of the past), and show with evidence how one complicates or strengthens the other.",
      scheme: [
        "Names two themes clearly",
        "Gives a specific piece of evidence for the first",
        "Gives a specific piece of evidence for the second",
        "Explains how the themes interact",
      ],
      model:
        "The American Dream and class interact in the novel. Gatsby builds a fortune from poverty, which fits the Dream. But the Buchanans, who have inherited wealth, treat him as an outsider, so class limits the Dream. Together they suggest that effort can win money but not acceptance in a closed social world.",
      answers: [
        [
          "full",
          "[[0|The American Dream and class are two themes in the book.]] [[1|Gatsby starts with nothing and builds a huge fortune, which looks like the Dream coming true.]] [[2|But Tom and Daisy come from old money and treat him as someone who doesn't belong, even in his own house, which shows class limits.]] [[3|The themes interact because the Dream says anyone can succeed, but class shows that some doors stay closed no matter how much you earn.]]",
          "Full marks. Your final sentence states the interaction exactly.",
        ],
        [
          "full",
          "[[0|I chose the pull of the past and the American Dream.]] [[1|Gatsby says you can repeat the past, and he tells Nick this when talking about Daisy.]] [[2|His fortune came from reaching for a better life, but he is using it to get back to a moment that already ended.]] [[3|The Dream looks forward and the past looks back, so the book shows the Dream can get trapped by nostalgia.]]",
          "All four marks. Contrasting forward and backward is a neat way to show the interaction.",
        ],
        [
          "partial",
          "[[0|The themes are class and the American Dream.]] [[1|Gatsby made a lot of money.]] They go together.",
          "Themes are named and one piece of evidence is given. Add evidence for class and explain how they interact.",
        ],
        [
          "partial",
          "[[2|Tom looks down on Gatsby because he is new money.]] [[3|That shows money alone does not make you accepted.]]",
          "Strong evidence and idea. Name both themes and add Gatsby's rise as evidence for the Dream.",
          true,
        ],
        [
          "weak",
          "The themes are wealth and parties. They interact because there are parties at wealthy houses.",
          "Those are subjects, not themes. A theme is an idea about life. Ask what the novel says about what money can and cannot do.",
        ],
        [
          "weak",
          "[[0|The American Dream and class are themes.]] They don't interact because they are about different things.",
          "They are connected: class affects who can reach the Dream. Look at how the Buchanans treat Gatsby.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Language, irony and the difference between what is said and what is meant: Twain and Fitzgerald",
  note: `
## Objectives

Students will be able to:

1. analyze how language that is rich or ambiguous contributes to meaning and tone across a text;
2. analyze a point of view in which what is directly stated differs from what is meant, such as satire or understatement.

## Materials

Excerpts from Chapter 31 of Adventures of Huckleberry Finn (Huck decides about Jim) and from Gatsby's closing pages, a diction-and-tone chart, and a passage of satire for practice.

## Starter (8 minutes)

Ask: "A student says, 'Oh, great, another pop quiz.' What does the student mean? How do you know?" Elicit tone, context and the gap between words and meaning.

## Main activity

1. Read the Huck passage in which Huck decides to help Jim escape even though he believes it is wrong. Students underline phrases where Huck says one thing and the reader understands another: "All right, then, I'll go to hell."
2. Explain the technique: a naive narrator whose moral reasoning is wrong by his society's standards but right by ours. Twain's irony depends on the reader seeing the difference.
3. Contrast with Fitzgerald's rich language. Read the closing paragraphs of Gatsby ("the green light," "boats against the current"). Annotate for connotation and rhythm.
4. Students write two sentences: one in which a narrator's stated view differs from the author's, and one that uses understatement for effect.

## Checking for understanding

Share the sentences aloud; classmates identify the gap between statement and meaning.

## Exit ticket

What does Huck say, what does Twain mean, and how do we know?
`,
  reading: [
    "When a narrator says the opposite of what the author means",
    `
Some of the most powerful writing says one thing while meaning another. When a text states a view that the author does not share, readers must work out the difference, and that work reveals the author's real point. Satire, understatement and irony all use this gap.

Mark Twain's Adventures of Huckleberry Finn, published in 1884, is narrated by a boy who has absorbed the beliefs of his time and place. Huck has been taught that helping an enslaved person to freedom is a sin and a crime. When he travels down the Mississippi with Jim, he comes to like and respect him, but he believes that a "good" boy would turn Jim in. In Chapter 31 he writes a letter to Miss Watson, telling her where Jim is. Then he thinks about all they have been through, and he tears the letter up. "All right, then, I'll go to hell," he says. The sentence is the climax of the book's irony. Huck believes he has chosen evil; the reader understands he has chosen conscience. Twain does not tell us so. He lets Huck's confusion make the point, and the gap between Huck's belief and our judgment is where the satire lives. Twain is attacking a society that taught a decent boy to think kindness was a sin.

Understatement is a related tool. A speaker plays down something large so that it seems larger by contrast. When a character calls a devastating flood "a little water," or a lost fortune "a minor setback," the mismatch makes the reader notice. In Gatsby, Nick's calm, often understated narration of terrible events, such as the death of Myrtle Wilson, makes them seem more shocking.

Fitzgerald is also a writer of rich, ambiguous language. In the last pages of the novel, he writes of the green light and then of the "fresh, green breast of the new world" that once appeared to Dutch sailors. The words suggest both a promise and a body, a land that could be desired and consumed. The last line, "So we beat on, boats against the current, borne back ceaselessly into the past," carries a rhythm that mimics the struggle it describes. It could be read as hopeful because we keep going, or as bleak because we are carried back. The language is rich because it will not settle.

When you analyze such passages, ask what the narrator says, what the author means, how you know, and what effect the gap creates.
`,
  ],
  cards: [
    ["Satire", "Writing that uses irony, exaggeration or humor to criticize people or society."],
    ["Understatement", "Treating something important as less serious than it is, for effect."],
    ["Naive narrator", "A narrator whose limited understanding lets the reader see more than they do."],
    ["Verbal irony", "Saying one thing while meaning another."],
    ["Dramatic irony", "When the reader knows something the narrator or character does not."],
    ["Tone", "The author's attitude toward the subject, shown through language."],
    ["Connotation", "The associations and emotions a word carries."],
    ["Ambiguity", "Language that supports more than one reasonable reading."],
  ],
  closed: [
    [
      "When Huck says, \"All right, then, I'll go to hell,\" the irony is that",
      [
        "Huck wants to be punished",
        "Huck believes he has chosen evil, while the reader sees that he has chosen conscience",
        "Huck is joking about his religion",
        "Huck is going to a real place",
      ],
      "B",
    ],
    [
      "Twain's satire in this scene is aimed mainly at",
      [
        "Huck's honesty",
        "a society that taught decent people to think kindness to an enslaved person was a sin",
        "the Mississippi River",
        "Jim's courage",
      ],
      "B",
    ],
    [
      "Which sentence is an example of understatement?",
      [
        "The storm wrecked the whole town; it was an unfortunate bit of weather.",
        "The storm wrecked the whole town and killed hundreds.",
        "I'm so hungry I could eat a horse.",
        "The storm was like a monster.",
      ],
      "A",
    ],
    [
      "The phrase \"fresh, green breast of the new world\" is rich because it",
      [
        "has only one possible meaning",
        "joins ideas of promise and desire, giving the land a body that can be loved or taken",
        "is a scientific description",
        "is a list of crops",
      ],
      "B",
    ],
    [
      "The ending of Gatsby, \"boats against the current,\" can be read as hopeful or bleak. This is an example of",
      ["a factual error", "ambiguity", "a rhyme scheme", "a plot twist"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how Twain uses a naive narrator in Chapter 31 of Huckleberry Finn to criticize society. State what Huck says, what Twain means, and how the reader knows the difference.",
      scheme: [
        "States what Huck says or believes",
        "States what Twain means or what the reader understands",
        "Explains how the reader knows the difference, such as the contrast between Huck's belief and his action",
        "Explains the effect or target of the satire",
      ],
      model:
        "Huck says he will go to hell for helping Jim, because he believes society's teaching that helping an enslaved person escape is a sin. Twain means that Huck is acting with real conscience and that the teaching is wrong. The reader knows because Huck's actions are kind and loyal while his words condemn himself. The effect is to criticize a society whose morals could make a good person believe goodness was wicked.",
      answers: [
        [
          "full",
          "[[0|Huck says he is going to hell because he believes helping Jim is a sin.]] [[1|Twain means that Huck is doing the right thing and that what he was taught is wrong.]] [[2|We know the difference because Huck tears up the letter and chooses to protect Jim, which is clearly kind and brave, even though his words say it is evil.]] [[3|The effect is to criticize a society that could make a good kid feel guilty for being decent.]]",
          "Full marks. Your third sentence points to the evidence that reveals the irony, which is the key skill.",
        ],
        [
          "full",
          "[[0|Huck believes that helping Jim is wrong and says he will go to hell for it.]] [[1|Twain wants the reader to see that Huck's conscience is better than the rules he was taught.]] [[2|We can tell because earlier Huck has been learning that Jim is a good friend and a person, and that doesn't match what he's been told.]] [[3|Twain is making fun of the idea that slavery was morally justified, using a naive narrator who doesn't see the contradiction.]]",
          "All four marks. Linking to Huck's earlier experience with Jim shows that you traced the irony across the novel.",
        ],
        [
          "partial",
          "[[0|Huck says he will go to hell.]] [[1|Twain means that Huck is a good person.]] I think it is a good scene.",
          "You have what Huck says and what Twain means. Explain how the reader knows and what society is being criticized.",
        ],
        [
          "partial",
          "[[2|Huck's action is kind, but his words say it's evil.]] [[3|That makes fun of the way society thinks.]]",
          "Strong on how we know and the effect. State clearly what Huck believes and what Twain means.",
          true,
        ],
        [
          "weak",
          "Twain is saying that Huck is a bad kid who deserves to go to hell because he helps Jim escape.",
          "Twain presents Huck's choice as admirable. The irony is that Huck thinks it is wrong while the reader sees it is right. Reread the scene.",
        ],
        [
          "weak",
          "[[0|Huck thinks he is going to hell.]] That is just a funny line and nothing deeper.",
          "The line is funny and serious at once. Ask what society taught Huck and what Twain thinks of that teaching.",
        ],
      ],
    },
    {
      prompt:
        "Choose one sentence from the final pages of The Great Gatsby (for example, the green light, the \"fresh, green breast of the new world,\" or \"boats against the current\"). Analyze how its language contributes to meaning and tone, and explain what makes it ambiguous.",
      scheme: [
        "Quotes or identifies the sentence accurately",
        "Analyzes specific words, images or rhythm",
        "Explains the tone or meaning it creates",
        "Identifies the ambiguity, with two possible readings",
      ],
      model:
        "In 'So we beat on, boats against the current, borne back ceaselessly into the past,' the image of boats rowing against a current suggests struggle, while 'borne back' and 'ceaselessly' suggest defeat. The long rhythm feels like the effort it describes. The tone is both determined and sad. The line is ambiguous because it can be read as admiring our persistence or as lamenting that we cannot escape the past.",
      answers: [
        [
          "full",
          "[[0|The last line says So we beat on, boats against the current, borne back ceaselessly into the past.]] [[1|The image of boats fighting a current shows struggle, but borne back and ceaselessly show we are always pushed backward, and the sentence rolls on like the effort itself.]] [[2|The tone is determined but sorrowful.]] [[3|It could be hopeful because we keep going, or it could be bleak because we never get past the past.]]",
          "Full marks. You analyzed both the words and the rhythm and gave two readings.",
        ],
        [
          "full",
          "[[0|I chose the fresh, green breast of the new world.]] [[1|Fresh and green suggest new life and promise, but breast makes the land into a body, something to be wanted and used.]] [[2|The tone is wonder mixed with greed, because the sailors are amazed by something they will also take.]] [[3|It is ambiguous because it can be read as a hopeful beginning or as a warning about wanting too much.]]",
          "All four marks. Noticing that \"breast\" turns land into a body is a sophisticated reading.",
        ],
        [
          "partial",
          "[[0|The sentence is about the green light and how Gatsby believed in it.]] [[1|Believed is a strong word that shows his hope.]] It sounds nice.",
          "Good start. Explain the tone and name the ambiguity more clearly.",
        ],
        [
          "partial",
          "[[2|The tone is sad and hopeful at once.]] [[3|It could mean we keep trying or that we can never escape.]]",
          "Great reading of tone and ambiguity. Quote the sentence and analyze specific words.",
          true,
        ],
        [
          "weak",
          "The sentence is about boats and rowing. It has nothing to do with the rest of the novel.",
          "The boats are a metaphor. Ask what the current and the past stand for.",
        ],
        [
          "weak",
          "[[0|The sentence says boats against the current.]] It means one thing only, which is that people should row more.",
          "The sentence is figurative. It can be read in more than one way, so avoid taking it literally.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Self-making across the centuries: Franklin, Emerson and Gatsby",
  note: `
## Objectives

Students will be able to:

1. show how foundational works of American literature treat similar themes across different periods;
2. evaluate evidence that supports inferences drawn from an essay or speech.

## Materials

Excerpts from Benjamin Franklin's Autobiography (the thirteen virtues), Ralph Waldo Emerson's "Self-Reliance," and the schedule in Gatsby's boyhood copy of a book (Chapter 9), and a comparison grid.

## Starter (8 minutes)

Ask: "If you could make a daily schedule to turn yourself into your best self, what would be on it? Would you write it down?" Take three answers, then reveal that three famous Americans did just that in very different ways.

## Main activity

1. Read the Franklin excerpt. Students list the virtues, noting that Franklin tracked his progress with a chart. What does this show about his view of the self?
2. Read the Emerson excerpt. Students note the phrases that urge trust in oneself and resist conformity.
3. Return to Gatsby Chapter 9: the schedule and the "General Resolves." Compare with Franklin. What is similar, and what changes?
4. Evidence workshop. Given the inference "Emerson would find Gatsby's self-making hollow," students choose evidence from the texts, rank it, and note what is missing.

## Checking for understanding

Venn diagram: Franklin, Emerson, Gatsby, one shared idea and one difference each.

## Exit ticket

State a theme the three share, and a difference in how each treats it.
`,
  reading: [
    "The self-made American, in three centuries",
    `
Few ideas are as American as the belief that a person can make himself. Three texts from three centuries show how that idea changes.

Benjamin Franklin, writing his Autobiography in the 1700s, describes a project of "moral perfection." He listed thirteen virtues, including temperance, silence, order, industry and humility, and kept a small book with a page for each. Each day he marked his failures, working on one virtue per week. He never reached perfection, he admits, but he thought the effort made him a better and happier man. For Franklin, the self is a project that can be managed by method. Character is improved through habit, record keeping and discipline, and the result is both a good life and success in the world.

Ralph Waldo Emerson, in the 1840s, takes a different view. In "Self-Reliance" he argues that individuals should trust their own minds and resist the pressure to conform. "Whoso would be a man must be a nonconformist," he writes. For Emerson, the self is not a project of rules but a source of truth. The danger is society, which asks people to give up their own voices for approval. Where Franklin tracks his behavior against a list, Emerson distrusts lists that come from outside.

In The Great Gatsby, set in the 1920s, Jay Gatsby invented himself. In the closing chapter, Gatsby's father shows Nick a copy of a book in which his son had written a schedule as a boy: "Rise from bed," "Study electricity," "Practice elocution, poise and how to attain it." There are "General Resolves" too, among them to avoid wasting time and to be better to his parents. The echo of Franklin is clear. But Gatsby's discipline serves an ideal of wealth and status, and he reinvents his name and past. If Franklin's self-making was a method and Emerson's was a refusal to imitate, Gatsby's is a performance that depends on others' approval.

When you evaluate an inference, such as "Emerson would find Gatsby's self-making hollow," look at the support. Strong evidence comes from the text itself: Emerson's insistence on nonconformity, set beside Gatsby's dependence on the approval of Daisy and the society that rejects him. Weaker evidence would be a general feeling that the novel is sad. It also helps to say what is missing: Emerson never read the novel, so the inference is a reasoned guess about how his ideas would apply.
`,
  ],
  cards: [
    ["Autobiography", "A person's account of their own life."],
    ["Transcendentalism", "A nineteenth-century American movement that valued intuition, nature and the individual."],
    ["Self-reliance", "Trusting one's own judgment instead of depending on others."],
    ["Nonconformist", "A person who refuses to follow accepted rules or customs."],
    ["Inference", "A conclusion drawn from evidence that is not stated outright."],
    ["Evidence (strong)", "Textual support that is specific, relevant and hard to explain another way."],
    ["Theme across periods", "An idea that recurs in works from different times, treated differently each time."],
    ["Echo (literary)", "A repeated pattern or reference that links two works."],
  ],
  closed: [
    [
      "How did Franklin attempt to improve himself in his Autobiography?",
      [
        "By avoiding all habits",
        "By listing virtues and tracking his progress in a record book",
        "By moving to a new town",
        "By writing poetry",
      ],
      "B",
    ],
    [
      "Emerson's line \"Whoso would be a man must be a nonconformist\" suggests that",
      [
        "following social rules is the best path",
        "individual integrity requires resisting pressure to conform",
        "nonconformists are always wrong",
        "men should avoid school",
      ],
      "B",
    ],
    [
      "How does Gatsby's boyhood schedule echo Franklin?",
      [
        "It shows Gatsby avoided work.",
        "It shows a method of self-improvement by schedule and resolves, though Gatsby's goal is wealth and status.",
        "It proves Gatsby read Emerson.",
        "It shows Gatsby copied Franklin's book.",
      ],
      "B",
    ],
    [
      "Which evidence best supports the inference that Emerson would find Gatsby's self-making hollow?",
      [
        "Gatsby owns a large house.",
        "Gatsby's identity depends on winning Daisy's approval and entering the society that rejects him, which conflicts with Emerson's call to self-trust.",
        "Gatsby throws parties.",
        "Gatsby lives on Long Island.",
      ],
      "B",
    ],
    [
      "Which is a fair statement about the inference \"Emerson would find Gatsby hollow\"?",
      [
        "It is a fact that Emerson wrote about Gatsby.",
        "It is a reasoned inference, since Emerson died decades before the novel.",
        "It is proven by Gatsby's death.",
        "It is false because both are American.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare how Franklin's Autobiography and Emerson's \"Self-Reliance\" treat the idea of improving oneself. Identify one point of agreement and one important difference, and cite a specific detail from each text.",
      scheme: [
        "Identifies a point of agreement between the two views",
        "Cites a specific detail from Franklin",
        "Cites a specific detail from Emerson",
        "Explains a key difference in how each treats the self",
      ],
      model:
        "Both Franklin and Emerson believe individuals can shape their own character. Franklin lists thirteen virtues and tracks his progress in a book. Emerson urges people to be nonconformists and to trust themselves. The difference is that Franklin treats self-improvement as a method guided by a list, while Emerson distrusts external rules and says that the truth comes from within.",
      answers: [
        [
          "full",
          "[[0|They agree that a person can and should work on himself instead of just accepting how he is.]] [[1|Franklin made a list of thirteen virtues and marked his progress in a little book each day.]] [[2|Emerson said to trust yourself and that anyone who wants to be a man must be a nonconformist.]] [[3|The difference is that Franklin used a system of rules and habits to improve, while Emerson thinks real improvement comes from your own mind and not from following lists.]]",
          "Full marks. Your final sentence names the difference between method and intuition precisely.",
        ],
        [
          "full",
          "[[0|Both think the individual is important and responsible for his own life.]] [[1|Franklin had his thirteen virtues and focused on one each week.]] [[2|Emerson wrote that you should resist conforming to society.]] [[3|They differ because Franklin is cultivating habits he picked from outside himself, and Emerson would say that following any list is a form of conformity.]]",
          "All four marks. Turning the lists into a form of conformity is a clever application.",
        ],
        [
          "partial",
          "[[0|Both think people can improve themselves.]] [[1|Franklin had thirteen virtues.]] Emerson was a writer.",
          "Agreement and one detail are accurate. Add a specific detail from Emerson and explain the key difference.",
        ],
        [
          "partial",
          "[[2|Emerson says to be a nonconformist.]] [[3|Franklin is more about rules and Emerson is more about listening to yourself.]]",
          "Strong on the difference and Emerson. Add Franklin's detail and a point of agreement.",
          true,
        ],
        [
          "weak",
          "Franklin and Emerson agree about everything. They both lived long ago and wrote books.",
          "They share a belief in self-improvement but differ on how. Look at Franklin's list and Emerson's call to nonconformity.",
        ],
        [
          "weak",
          "[[1|Franklin made a list of virtues.]] Emerson also made a list, and they both followed rules.",
          "Emerson distrusted outside rules. Reread his line about nonconformists.",
        ],
      ],
    },
    {
      prompt:
        "Evaluate the evidence for this inference: \"Gatsby's boyhood schedule shows that he is a self-disciplined idealist, not a fraud.\" Name one piece of evidence that supports it, one that complicates it, and your judgment of how strong the inference is.",
      scheme: [
        "Identifies a piece of evidence that supports the inference",
        "Identifies a piece of evidence that complicates it",
        "States a judgment about the inference's strength",
        "Gives a reason for the judgment",
      ],
      model:
        "The schedule and General Resolves support the inference by showing that as a boy Gatsby worked to improve himself with discipline and ideals. But the novel also shows Gatsby inventing a false past and gaining money through criminal associates, which complicates the claim that he is not a fraud. The inference is partly supported: he is a disciplined idealist, but the word 'not a fraud' goes too far because he constructs a false identity.",
      answers: [
        [
          "full",
          "[[0|The schedule shows that he was a disciplined kid who had ideals and resolves to improve, which supports idealist and self-disciplined.]] [[1|But Gatsby also made up a false story about Oxford and has illegal business partners, so he is a fraud in some ways.]] [[2|I judge that the inference is partly supported.]] [[3|He is an idealist, but not a fraud is too strong because the novel shows him inventing his past.]]",
          "Full marks. You noticed the one phrase that overreaches, which is what evaluating an inference means.",
        ],
        [
          "full",
          "[[0|The schedule with resolves like studying and practicing proves he was serious about becoming better.]] [[1|The complicating evidence is Meyer Wolfsheim and the made-up Oxford story, which show he lies.]] [[2|My judgment is that the inference is half right.]] [[3|He believes in a dream, but he builds it using fraud, so you can't call him not a fraud.]]",
          "All four marks. Meyer Wolfsheim is a good piece of complicating evidence.",
        ],
        [
          "partial",
          "[[0|The schedule shows he was disciplined as a boy.]] [[2|I think the inference is probably OK.]]",
          "Good support and judgment. Add evidence that complicates the inference and give a reason for your judgment.",
        ],
        [
          "partial",
          "[[1|He invented a false past.]] [[3|So it is wrong to say he is not a fraud.]]",
          "Complication and reasoning are strong. Add what the schedule supports and state your judgment.",
          true,
        ],
        [
          "weak",
          "The inference is completely true because he was a kid when he wrote the schedule and kids are honest.",
          "The question is about the whole character. Look for evidence from the adult Gatsby too.",
        ],
        [
          "weak",
          "[[0|The schedule shows he was disciplined.]] There is no evidence against it so the inference is perfect.",
          "The novel gives evidence that complicates it, like his false story of his past. Look for it.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Structure and appeals in the Letter from Birmingham Jail",
  note: `
## Objectives

Students will be able to:

1. evaluate the effectiveness of the structure an author uses to make a point engaging or persuasive;
2. evaluate an author's reasoning and rhetoric in a seminal US text, including the appeals used.

## Materials

Selected passages from Martin Luther King Jr.'s Letter from Birmingham Jail (April 1963), the 1963 statement by eight clergymen to which it responds (described in a one-page summary), and an appeals chart for ethos, pathos and logos.

## Starter (8 minutes)

Ask: "If a respected adult told you to be patient about something unfair, how would you respond politely but firmly?" Take responses and note the rhetorical problem King faced: he was answering fellow ministers who called his actions untimely.

## Main activity

1. Context. In April 1963 King was jailed in Birmingham, Alabama, for demonstrating without a permit. He wrote his letter in response to a public statement by eight white clergymen who called his methods "unwise and untimely." He wrote on the margins of a newspaper and on scraps.
2. Structure map. Students mark the letter's movements: an opening that addresses the ministers as "my dear fellow clergymen," an explanation of why he is in Birmingham, the four steps of nonviolent campaigns, a response to the call to wait, a defense of breaking unjust laws, and a closing that returns to the ministers' good will.
3. Appeals chart. Find an example of ethos, pathos and logos in the passages. How does each answer the clergymen?
4. Evaluate the reasoning: is the distinction between just and unjust laws sound? What would a critic say?

## Checking for understanding

Cold call: "Which paragraph is built on pathos, and how do you know?"

## Exit ticket

Write one sentence on why King's courteous opening makes the later argument stronger.
`,
  reading: [
    "A letter to his critics, written to the nation",
    `
On April 12, 1963, Martin Luther King Jr. was arrested in Birmingham, Alabama, for taking part in a march that violated a local ban. A few days earlier, eight white clergymen had published a statement in a local newspaper calling the demonstrations "unwise and untimely." King read it in his jail cell and began a response. He wrote on the margins of the newspaper, on scraps of paper smuggled in, and on a pad his lawyers eventually brought. The result, the Letter from Birmingham Jail, is addressed to the clergymen, but King knew that it would reach a far larger audience.

The structure of the letter helps explain its force. King opens with courtesy. He explains that he rarely answers criticism, but he believes the men are "of genuine good will" and wishes to answer in "patient and reasonable terms." That choice matters. A harsh opening would have made him seem the angry outsider the clergymen described. Instead, he establishes ethos, the credibility of a reasonable and religious man. He then defends his presence in Birmingham: he says he is there because injustice is there, and he claims that "injustice anywhere is a threat to justice everywhere." The line widens the argument from one city to the whole country.

Next he explains the four steps of a nonviolent campaign: gathering the facts, negotiating, self-purification and direct action. This section appeals to logos. It shows that the demonstrations were a last resort after talks failed, not a rash act. He also answers the call to wait with a long sentence of pathos. Within it he lists the humiliations of segregation, from the cruelty done to Black people to the confusion of a child who asks why she cannot go to an amusement park. The list builds so that the call for patience seems cruel. The length of the sentence makes the reader feel the weight of the waiting.

His defense of breaking unjust laws is the most philosophical part. He argues that a just law is one that matches moral law, and an unjust law degrades people. He cites religious thinkers to support the claim. A critic might ask who decides which laws are unjust, and King answers by saying that the person who breaks such a law should do so openly and accept the penalty, showing respect for law itself.

The letter ends where it began, with a hope for friendship with his readers. The structure, a courteous frame around hard arguments, lets a prisoner write as a minister and a citizen.
`,
  ],
  cards: [
    ["Ethos", "An appeal based on the speaker's credibility and character."],
    ["Pathos", "An appeal to the audience's emotions."],
    ["Logos", "An appeal to logic and evidence."],
    ["Seminal text", "A foundational work that strongly influences later writing."],
    ["Direct action", "Public protest meant to force attention to a problem."],
    ["Civil disobedience", "Refusing to obey an unjust law openly and accepting the penalty."],
    ["Audience (intended vs. actual)", "The reader a writer addresses versus the readers who actually see it."],
    ["Frame", "A beginning and ending that echo each other to enclose the argument."],
  ],
  closed: [
    [
      "Why does King begin the letter with a courteous tone?",
      [
        "He was afraid of the clergymen.",
        "It builds ethos and presents him as a reasonable man, making his later arguments harder to dismiss.",
        "He wanted to avoid the issue.",
        "He did not know the clergymen.",
      ],
      "B",
    ],
    [
      "King's explanation of the four steps of a nonviolent campaign is primarily an appeal to",
      ["logos", "pathos", "ethos only", "humor"],
      "A",
    ],
    [
      "King's long sentence about the humiliations of segregation, ending with a child, is mainly an appeal to",
      ["logos", "pathos", "a statistic", "a legal precedent"],
      "B",
    ],
    [
      "The line \"injustice anywhere is a threat to justice everywhere\" does what for the argument?",
      [
        "Limits the issue to one city",
        "Widens the argument from Birmingham to the whole nation",
        "Admits that King is an outsider",
        "Ends the letter",
      ],
      "B",
    ],
    [
      "A critic asks, \"Who decides which laws are unjust?\" King's answer in the letter includes",
      [
        "ignoring all laws",
        "breaking such laws openly and accepting the penalty, which shows respect for law itself",
        "waiting for a court to decide before acting",
        "refusing to explain",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose one of the three appeals (ethos, pathos or logos) and show how King uses it in the Letter from Birmingham Jail. Quote or paraphrase a specific moment, and evaluate how effective it is for the clergymen and for the wider audience.",
      scheme: [
        "Names an appeal and identifies a specific moment where King uses it",
        "Explains how the moment works as that appeal",
        "Evaluates its effectiveness for the clergymen",
        "Evaluates its effectiveness for the wider audience",
      ],
      model:
        "King uses ethos when he opens by calling the clergymen men of genuine good will and promising to answer in patient and reasonable terms. This presents him as a reasonable minister, not an agitator. For the clergymen, it makes it hard to dismiss him as angry. For the wider audience, it shows that the man in jail is calm and fair, which makes the injustice he describes look worse.",
      answers: [
        [
          "full",
          "[[0|King uses ethos in the opening where he says the ministers are men of good will and that he will answer in patient and reasonable terms.]] [[1|It works as ethos because it shows him as a reasonable, religious person and not an angry radical.]] [[2|For the clergymen it is effective because it is hard to dismiss someone who treats you respectfully.]] [[3|For the wider audience it is effective because they see a calm man in a jail cell, which makes the unfairness of his arrest more obvious.]]",
          "Full marks. You judged effectiveness for two different audiences, which the question asks for.",
        ],
        [
          "full",
          "[[0|I chose pathos, in the long sentence where he lists what Black people suffer under segregation and ends with a child who asks why she can't go to an amusement park.]] [[1|It works as pathos because the list keeps building and then lands on a small child, which makes you feel the pain.]] [[2|For the clergymen it makes the call to wait feel heartless.]] [[3|For readers in the rest of the country it makes segregation seem like a cruelty and not a political issue.]]",
          "All four marks. The details you chose, the building list and the child, are exactly where the pathos is.",
        ],
        [
          "partial",
          "[[0|King uses logos when he explains the four steps of a nonviolent campaign.]] [[1|It shows he had a plan and gave negotiation a chance.]] It works well.",
          "Good identification and explanation. Evaluate how it affects the clergymen and the wider audience separately.",
        ],
        [
          "partial",
          "[[2|The clergymen would have to take him seriously because he was polite.]] [[3|People across the country would see him as reasonable.]]",
          "Strong on both audiences. Name the appeal and the specific moment that you are evaluating.",
          true,
        ],
        [
          "weak",
          "King uses ethos because he is famous. People believed him because he was Martin Luther King.",
          "Ethos is built in the text through tone and reasoning. In 1963 many people in Birmingham did not know him. Look at how his opening presents him.",
        ],
        [
          "weak",
          "[[0|King uses pathos.]] He just tries to make people cry so they agree with him.",
          "Pathos is a specific appeal. Find the passage and explain how it is built, and don't reduce it to crying.",
        ],
      ],
    },
    {
      prompt:
        "King argues that a just law matches moral law and an unjust law degrades people. Evaluate this reasoning: state the claim, give one strength of the reasoning, and one question a critic could raise and how King's letter answers it.",
      scheme: [
        "States King's claim about just and unjust laws",
        "Identifies a strength of the reasoning",
        "Identifies a fair question or objection a critic could raise",
        "Explains King's response, such as acting openly and accepting the penalty",
      ],
      model:
        "King claims that a law is just if it matches moral law and unjust if it degrades human personality. A strength is that he grounds the claim in moral and religious thinkers, so it is not just his opinion. A critic could ask who decides which laws are unjust, since people disagree. King answers that a person who breaks an unjust law must do so openly and accept the penalty, which shows respect for law.",
      answers: [
        [
          "full",
          "[[0|King says a just law lines up with moral law and an unjust law degrades people.]] [[1|One strength is that he supports it by citing respected religious thinkers, so it isn't only his opinion.]] [[2|A critic could ask who gets to decide what is unjust, since anyone could say a law they dislike is unjust.]] [[3|King answers that a person has to break the law openly and accept the punishment, which shows respect for law as an institution.]]",
          "Full marks. Naming the critic's objection and the response is exactly the evaluating step.",
        ],
        [
          "full",
          "[[0|His claim is that laws which treat people as less than human are unjust and shouldn't be obeyed.]] [[1|The reasoning is strong because he gives a clear test, whether the law uplifts or degrades people, and he gives examples like segregation.]] [[2|A critic could say that this would let anyone ignore laws they disagree with.]] [[3|King responds that the person breaking the law must do it in public and take the penalty, so it's not an excuse for lawlessness.]]",
          "All four marks. Giving the test (uplifts or degrades) shows you read the reasoning closely.",
        ],
        [
          "partial",
          "[[0|King says unjust laws degrade people.]] [[1|He supports it with respected thinkers.]] Some people might disagree.",
          "Good claim and strength. State the critic's question specifically and explain how King answers it.",
        ],
        [
          "partial",
          "[[2|A critic could ask who decides.]] [[3|King says you have to take the punishment.]]",
          "The objection and response are right. State the claim and identify a strength of the reasoning.",
          true,
        ],
        [
          "weak",
          "King is wrong because breaking laws is always bad. He should have obeyed the law and waited.",
          "That is a judgment without evaluation. Consider how King answers the objection and why his reasoning might or might not hold.",
        ],
        [
          "weak",
          "[[0|King says laws should be fair.]] The reasoning has no problems because he is a famous leader.",
          "Fame is not a reason. Name a possible objection and show how his argument responds.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Reasoning in a Supreme Court opinion; writing an argument and an informative essay",
  note: `
## Objectives

Students will be able to:

1. delineate and evaluate the reasoning in a Supreme Court opinion or other public document;
2. write an argument that sets out a claim, distinguishes it from alternatives and supports it with valid reasoning;
3. write an informative essay that organizes complex ideas and sustains a formal style.

## Materials

Excerpts and a plain-language summary of Tinker v. Des Moines Independent Community School District (1969), a reasoning map, and a style checklist for formal writing.

## Starter (8 minutes)

Ask: "If you wore a black armband to school to protest a war, could the principal suspend you?" Take positions and have students explain on what principle they rely: safety, order, expression.

## Main activity

1. Facts. In December 1965, in Des Moines, Iowa, Mary Beth Tinker (13), her brother John (15), and Christopher Eckhardt (16) wore black armbands to school to protest the Vietnam War. They were suspended. The case reached the Supreme Court, which ruled 7 to 2 for the students in 1969.
2. Delineate the reasoning. On a map, students list the question, the rule the majority applies (student expression cannot be punished unless it would "materially and substantially interfere" with school discipline), the facts it applies it to, and the conclusion. Include the famous line that students do not "shed their constitutional rights to freedom of speech or expression at the schoolhouse gate."
3. Evaluate the dissent's view that schools need authority to prevent disruption. What does each side value?
4. Writing: students draft a claim about whether a school should be able to limit a type of student speech, distinguishing their claim from the alternative. A second task: an informative paragraph that explains the rule in formal style.

## Checking for understanding

Cold call: "State the rule in your own words and name the fact that mattered."

## Exit ticket

One sentence that states your claim and distinguishes it from the opposing view.
`,
  reading: [
    "Armbands at the schoolhouse gate",
    `
In December 1965, a group of students in Des Moines, Iowa, decided to wear black armbands to school to mourn people who had died in the Vietnam War and to support a Christmas truce. Mary Beth Tinker was thirteen, her brother John was fifteen, and their friend Christopher Eckhardt was sixteen. The school district, which had adopted a rule against armbands just days before, suspended them. Their families sued. In 1969, in Tinker v. Des Moines Independent Community School District, the Supreme Court ruled 7 to 2 that the suspensions violated the students' First Amendment rights.

To read a court opinion, it helps to separate its parts. The **question** is what the Court is deciding: here, whether a public school may punish students for wearing a symbol of protest. The **rule** is the legal principle the Court uses. The **facts** are the events. The **reasoning** connects the rule to the facts. The **conclusion** states the result.

In Tinker, Justice Abe Fortas wrote for the majority. The rule he stated was that students keep their rights in school, memorably saying that they do not "shed their constitutional rights to freedom of speech or expression at the schoolhouse gate." But those rights are not unlimited: schools may restrict speech that would "materially and substantially interfere" with discipline or with other students' rights. Applying the rule to the facts, the majority noted that the armbands were silent and passive, and that no disruption had occurred. The school had acted because it feared controversy, and the Court held that a general fear of disturbance is not enough.

Justice Hugo Black dissented. He argued that schools need authority to keep order and that the armbands distracted students from their work. In his view, the Court's decision invited students to challenge their teachers' control. Evaluating the opinion means weighing both views: the value of free expression against the school's duty to maintain a place for learning.

When you write an **argument** about such a question, you set out a claim, such as "Schools should be able to restrict only speech that causes real disruption," and distinguish it from alternatives, such as "Schools should be able to restrict any speech they find inappropriate." You then support it with valid reasoning and evidence. When you write an **informative** essay, for example on how the Tinker standard works, you organize complex ideas in a clear order, define terms precisely, and keep a formal style: no slang, careful transitions, and an objective tone.
`,
  ],
  cards: [
    ["Majority opinion", "The opinion that expresses the view of the majority of justices and becomes the Court's decision."],
    ["Dissent", "An opinion by a justice who disagrees with the majority."],
    ["Precedent", "An earlier decision that guides later cases."],
    ["Standard", "A test a court uses to decide a case, such as 'materially and substantially interfere.'"],
    ["First Amendment", "The part of the Constitution that protects freedom of speech, religion, press and assembly."],
    ["Formal style", "Writing that avoids slang and contractions and keeps an objective tone."],
    ["Claim", "A position that a writer argues for."],
    ["Alternative claim", "A different position that the writer distinguishes from their own."],
  ],
  closed: [
    [
      "What was the central question in Tinker v. Des Moines?",
      [
        "Whether students can skip school",
        "Whether a public school may punish students for wearing symbols of protest",
        "Whether the Vietnam War was legal",
        "Whether teachers can wear armbands",
      ],
      "B",
    ],
    [
      "According to the majority, when may schools restrict student speech?",
      [
        "Whenever a teacher dislikes it",
        "When it would materially and substantially interfere with discipline or others' rights",
        "Never",
        "Whenever the principal fears controversy",
      ],
      "B",
    ],
    [
      "Why did the majority reject the school's argument that the armbands might cause a disturbance?",
      [
        "The Court agreed that any possible disturbance is enough.",
        "A general fear of controversy is not enough; the school needed evidence of real disruption.",
        "The armbands were illegal.",
        "The students were adults.",
      ],
      "B",
    ],
    [
      "Justice Black's dissent argued mainly that",
      [
        "students should have unlimited speech",
        "schools need authority to maintain order and the armbands were distracting",
        "the Vietnam War was wrong",
        "the First Amendment does not exist",
      ],
      "B",
    ],
    [
      "Which sentence best maintains a formal style?",
      [
        "The Court was kind of annoyed at the school.",
        "The majority concluded that the district had not shown evidence of disruption.",
        "The judges were like, nope.",
        "Schools can't do whatever.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Delineate the reasoning in the Tinker majority opinion. State the question, the rule, a key fact it applied to, and the conclusion. Then give one thing a critic could say against the reasoning.",
      scheme: [
        "States the question the Court decided",
        "States the rule or standard the Court used",
        "Identifies a key fact and shows how the Court applied the rule to it",
        "States the conclusion",
        "Identifies a fair criticism of the reasoning",
      ],
      model:
        "The question was whether a public school could suspend students for wearing black armbands to protest the Vietnam War. The rule is that students keep their free speech rights in school unless their expression would materially and substantially interfere with discipline. The Court noted that the armbands were silent and caused no disruption, and that the school acted out of fear of controversy. The conclusion was that the suspensions violated the First Amendment. A critic, such as Justice Black, could argue that the standard lets students disrupt schools before the school can act.",
      answers: [
        [
          "full",
          "[[0|The question was whether a public school could suspend students for wearing black armbands to protest the war.]] [[1|The Court's rule was that students keep their free speech rights unless the speech would materially and substantially disrupt the school.]] [[2|The key fact is that the armbands were silent and nothing was disrupted, and the school was only afraid of controversy, so the rule favored the students.]] [[3|The conclusion was that the suspensions were unconstitutional.]] [[4|A critic could say the rule makes schools wait for a disruption before acting, which is hard on teachers.]]",
          "Full marks. Each part of the reasoning is separated and the criticism is a real one.",
        ],
        [
          "full",
          "[[0|The Court had to decide if students could be punished for wearing armbands to protest the Vietnam War.]] [[1|It said students don't leave their rights at the schoolhouse gate but speech can be limited if it would substantially interfere with discipline.]] [[2|Because the students were quiet and there was no disruption, the school's fear of trouble was not enough.]] [[3|So the Court ruled 7 to 2 for the students.]] [[4|Justice Black's critique is that schools need authority to keep order, and distractions can hurt learning.]]",
          "All five marks. Using Justice Black as the critic ties your answer to the actual case.",
        ],
        [
          "partial",
          "[[0|The question was whether students could be punished for armbands.]] [[3|The Court said no.]] The case happened in Iowa.",
          "You have the question and the conclusion. Add the rule, a key fact and how they connect, and name a criticism.",
        ],
        [
          "partial",
          "[[1|The rule is students keep their rights unless it disrupts the school.]] [[2|The armbands were quiet so there was no disruption.]] [[4|A critic would say the school should have more control.]]",
          "The rule, a fact and a criticism are all there. State the question and the conclusion clearly.",
          true,
        ],
        [
          "weak",
          "The Court said students can do anything they want at school. There are no limits on students at all.",
          "The Court set a limit: speech that materially and substantially disrupts school can be restricted. Reread the rule.",
        ],
        [
          "weak",
          "[[0|The question was about armbands.]] The Court decided because it liked the students. Fortas was a nice judge.",
          "The decision rests on a rule and facts, not on likes. State the rule and how it applied to the case.",
        ],
      ],
    },
    {
      prompt:
        "Write a short argument paragraph (five to seven sentences, formal style) that takes a position on whether a school may ban students from wearing political buttons or T-shirts. State your claim, distinguish it from an alternative, and support it with valid reasoning that refers to the Tinker standard.",
      scheme: [
        "States a clear claim",
        "Distinguishes the claim from an alternative position",
        "Supports the claim with valid reasoning that uses the Tinker standard",
        "Maintains a formal style with no slang",
      ],
      model:
        "A school should be allowed to restrict political buttons and T-shirts only when they would materially and substantially disrupt learning. Some argue that a school should be able to ban all political expression to avoid conflict. That position would apply even to silent, peaceful messages, which the Tinker decision protected. Under Tinker, a general fear of controversy is not enough. A school that wishes to limit a message must show a real disruption or a threat to other students' rights.",
      answers: [
        [
          "full",
          "[[0|A school should be allowed to restrict political buttons and T-shirts only if they would materially and substantially disrupt learning.]] [[1|Some argue that a school should be able to ban all political expression to avoid conflict.]] [[2|That view conflicts with Tinker, in which silent armbands were protected because the school had shown no real disruption.]] [[3|A general fear of controversy is not sufficient grounds, so a ban would need specific evidence that the message interferes with the school's work.]]",
          "Full marks. Your claim, alternative, reasoning and style all work, and the closing sentence applies the standard.",
        ],
        [
          "full",
          "[[0|In my view, schools should permit students to wear political buttons unless the message threatens others or interrupts class.]] [[1|The alternative is a complete ban, which would be easier to enforce.]] [[2|However, the Court in Tinker said students do not lose their rights at the schoolhouse gate and that schools must show actual interference.]] [[3|A complete ban would go beyond that standard, so a more limited rule is both more just and more consistent with the law.]]",
          "All four marks. Admitting that the ban is easier to enforce makes the argument more honest.",
        ],
        [
          "partial",
          "[[0|Schools should let students wear buttons if they don't cause trouble.]] [[2|That is what Tinker says about armbands.]]",
          "Your claim is reasonable, and you cited Tinker. Distinguish it from an alternative and write in a more formal style.",
        ],
        [
          "partial",
          "[[1|Some say schools should ban all politics.]] [[3|But a ban needs proof of disruption under the Tinker standard.]]",
          "Alternative and reasoning are strong. State your own claim first so the paragraph has a clear position.",
          true,
        ],
        [
          "weak",
          "Schools can do whatever they want because it's their school. Students should just listen to what the principal says.",
          "That position ignores Tinker, which limits the schools' authority. State the standard and apply it.",
        ],
        [
          "weak",
          "[[0|Schools should not ban buttons.]] It's totally unfair and the principal is basically just being a jerk about it.",
          "Your claim is clear. The tone is informal and there is no reasoning. Use Tinker and a formal style.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Narrative technique and a sustained research project",
  note: `
## Objectives

Students will be able to:

1. write a narrative that uses technique such as dialogue, reflection and shifting pace to convey experience;
2. conduct a sustained research project, synthesizing several sources on a focused question.

## Materials

A model personal narrative (a college-essay-style scene), a dialogue-punctuation reference, and a synthesis matrix for the research project. Each student brings a research question approved in Week 5 of the project calendar.

## Starter (8 minutes)

Display two openings for a narrative about a first driving lesson. Version A: "I was nervous my first time driving." Version B: "Dad's hand hovered over the emergency brake like a hawk deciding whether to dive." Ask which draws the reader in and why.

## Main activity

1. Narrative technique mini-lesson. Dialogue that reveals character, with correct punctuation. Pacing: slow motion for key moments, summary for transitions. Reflection: the narrator's later understanding of the moment.
2. Students draft a 300-word scene from their lives with at least four lines of dialogue, one slowed moment, and one reflective sentence.
3. Research project check-in. Students bring three sources on their question and complete a synthesis matrix: columns for each source, rows for subpoints, with notes on agreements and disagreements.
4. Discuss synthesis versus summary. Summary reports each source in turn; synthesis organizes by idea and compares sources.

## Checking for understanding

Peer read: identify one line of dialogue that reveals character and one place the pace slows.

## Exit ticket

Write the research claim you currently believe and the source that best supports it.
`,
  reading: [
    "Telling a true story, and weaving sources together",
    `
A good personal narrative is not a list of what happened. It is a chosen moment, told so that the reader sees it, hears it and understands why it mattered. Three techniques do most of the work.

**Dialogue** lets characters speak for themselves. A line of dialogue should do something: show a trait, reveal tension, or move the story forward. "You're going to want to turn the wheel earlier," Dad said, in the careful voice he used when he was frightened, tells the reader about the father without a paragraph of description. In writing, each speaker gets a new paragraph, and the punctuation goes inside the quotation marks. **Pacing** controls how time moves. A writer can slow down at the key moment, stretching a single second over several sentences of sensory detail, and summarize less important stretches in a line. **Reflection** is the narrator's later view. A scene ends not with "It was fun" but with a sentence that shows what changed in the writer: "That afternoon I understood that being trusted with the keys was less about driving and more about being trusted to fail."

A research project works on a different scale but asks for a similar discipline. A sustained project begins with a focused question, such as "How have changes in Ohio's farm fertilizer rules affected algae blooms in Lake Erie?" The researcher finds several sources, evaluates them, and then must **synthesize** them. Synthesis is not summary. A summary reports Source A, then Source B, then Source C. A synthesis organizes the paper by ideas, and within each idea brings the sources into conversation: "While the state agency reports a decline in phosphorus runoff since 2019, an independent study at Ohio State finds that the improvement is concentrated in a few watersheds." The writer places the sources in relation to each other and to the question, and draws a conclusion.

A **synthesis matrix** helps. List each source across the top, and each subtopic down the side. In each cell, note what the source says about that subtopic. Reading across a row shows where sources agree or disagree; reading down a column shows what each source emphasizes. Gaps show where more research is needed. The researcher then writes from the rows, not the columns.

Like the narrator, the researcher ends with reflection: not only what was found, but what it means and what remains uncertain.
`,
  ],
  cards: [
    ["Dialogue", "The words characters speak, set in quotation marks and used to reveal character or move the plot."],
    ["Pacing", "How quickly or slowly a narrative moves through time."],
    ["Reflection", "The narrator's thoughts about what an experience meant."],
    ["Synthesis", "Combining ideas from several sources into a new, organized understanding."],
    ["Summary", "A report of what each source says in turn."],
    ["Synthesis matrix", "A table that compares what several sources say about each subtopic."],
    ["Focused question", "A research question narrow enough to answer with evidence."],
    ["Sensory detail", "Language that appeals to sight, sound, smell, taste or touch."],
  ],
  closed: [
    [
      "In a narrative, a new speaker's dialogue should",
      [
        "go in the same paragraph as the previous speaker",
        "begin a new paragraph",
        "never use quotation marks",
        "be at the end of the story",
      ],
      "B",
    ],
    [
      "Which sentence is the best example of reflection?",
      [
        "We drove to the store.",
        "It was a sunny day.",
        "That afternoon I understood that being trusted with the keys meant being trusted to make mistakes.",
        "My dad was in the car.",
      ],
      "C",
    ],
    [
      "A writer slows down time during the key moment of a story by",
      [
        "using one sentence for the whole scene",
        "stretching the moment with sensory detail and short beats of action",
        "leaving out the moment",
        "using a list",
      ],
      "B",
    ],
    [
      "How does synthesis differ from summary?",
      [
        "It is shorter.",
        "It organizes by ideas and compares sources, not one source after another.",
        "It ignores sources.",
        "It is the same as plagiarism.",
      ],
      "B",
    ],
    [
      "Reading across a row in a synthesis matrix shows",
      [
        "what one source says about everything",
        "where different sources agree or disagree about one subtopic",
        "the author's name",
        "the page numbers",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a narrative passage of six to eight sentences about a moment when you or someone you know was tested (a game, a first job, a hard conversation). Include at least two lines of dialogue punctuated correctly, one slowed-down moment, and a closing reflection.",
      scheme: [
        "Includes at least two lines of correctly punctuated dialogue",
        "Slows down a key moment with specific detail",
        "Summarizes or moves quickly through less important time",
        "Ends with a reflective sentence that says what the moment meant",
      ],
      model:
        "\"You're up next,\" Coach said, and the bleachers seemed to tilt. I walked to the line at the end of the court, rubbed my palms on my shorts, and listened to the ball slap the floor while the gym went quiet. \"Breathe,\" Maya whispered from the bench. The ball left my hands, spun once, and I watched it rise past the lights and drop through the net. We had played the whole game in a blur, but those three seconds are the ones I can still see. I learned that fear does not go away; you just shoot anyway.",
      answers: [
        [
          "full",
          "[[0|\"You're up next,\" Coach said. \"Don't think, just shoot.\"]] Everything before that was a blur of drills, but [[1|at the line I could hear the ball bounce three times against the floor and feel the sweat in my palms while the whole gym seemed to hold its breath.]] [[2|We had been down all night and I had been sitting out for most of it.]] [[3|I understood that being ready is not the same as feeling ready; you just step up.]]",
          "Full marks. The dialogue, the slowed moment and the reflection all do separate work.",
        ],
        [
          "full",
          "My first day at the grocery store, [[0|my manager handed me a scanner and said, \"Don't worry, everyone breaks something their first week.\" \"What if I break something big?\" I asked.]] [[1|Right then a jar of pasta sauce slid from my hand, and I watched it turn over once in the air, the red lid flashing, until it hit the tile and burst.]] [[2|After that the shift passed quickly, mostly stocking shelves and listening to the radio.]] [[3|Looking back, I think the jar was the best thing that could have happened, since it taught me that mistakes are just part of the work.]]",
          "All four marks. Summarizing the rest of the shift lets the dropped jar carry the weight.",
        ],
        [
          "partial",
          "[[0|\"Are you ready?\" my sister asked. \"No,\" I said.]] It was my first race and I was scared. I ran and I won.",
          "Your dialogue is correct and natural. Slow down on the race itself, summarize the rest, and add a closing reflection.",
        ],
        [
          "partial",
          "[[1|The starting gun cracked and my feet slapped the track while my lungs burned and the crowd noise blurred into one hum.]] [[3|I realized the race was won in the first step I decided to take.]]",
          "Good slowed moment and reflection. Add at least two lines of dialogue.",
          true,
        ],
        [
          "weak",
          "I played a game. It was fun. I scored and we won. It was the best day.",
          "This tells but does not show. Choose a moment, add dialogue and detail, and finish with a reflection.",
        ],
        [
          "weak",
          "[[0|\"Hurry up,\" he said, \"we are late.\"]] Then we went there. We got there. We left.",
          "Your dialogue works. The rest moves too fast for a narrative. Choose one moment to slow down.",
        ],
      ],
    },
    {
      prompt:
        "A student's research question is \"How have changes in Ohio farm fertilizer rules affected algae blooms in Lake Erie?\" The student has two sources: a state report that says phosphorus runoff has fallen since new rules, and a university study that says the improvement is limited to a few watersheds. Write a synthesis sentence or short paragraph that brings the sources into conversation, then explain why this is synthesis and not summary.",
      scheme: [
        "Accurately represents the first source's claim",
        "Accurately represents the second source's claim",
        "Brings the sources into relation, noting agreement or tension",
        "Explains why this is synthesis rather than summary",
      ],
      model:
        "While the state report finds that phosphorus runoff has fallen since the new fertilizer rules, the university study concludes that the improvement is concentrated in only a few watersheds, which suggests the rules have helped but not everywhere. This is synthesis because it places the sources side by side on one idea and draws a conclusion, instead of reporting each source in turn.",
      answers: [
        [
          "full",
          "[[0|The state report finds that phosphorus runoff has dropped since the new fertilizer rules,]] [[1|but the university study found that the improvement is limited to a few watersheds.]] [[2|Taken together, they suggest the rules have helped in some places, but the problem is not solved across the lake.]] [[3|This is synthesis because I compared both sources on one idea and reached a conclusion instead of telling what each source says one at a time.]]",
          "Full marks. The phrase \"taken together\" is the signal of synthesis.",
        ],
        [
          "full",
          "While [[0|the state agency reports that phosphorus runoff has fallen since the new rules,]] [[1|a study at the university says this change is concentrated in a few watersheds.]] [[2|The difference may mean that the overall numbers hide local problems, and it makes me think the rules work best in specific areas.]] [[3|That is synthesis since I put the two sources in conversation about the same question and drew my own idea from them.]]",
          "All four marks. You drew an idea that neither source states by itself, which is the heart of synthesis.",
        ],
        [
          "partial",
          "[[0|The state report says that runoff has fallen.]] [[1|The university study says the improvement is limited.]] Both talk about fertilizer.",
          "Both sources are correctly represented. Bring them into relation with a conclusion and explain why it is synthesis.",
        ],
        [
          "partial",
          "[[2|The sources agree there is progress but disagree about how widespread it is.]] [[3|This is synthesis because it compares them.]]",
          "Good comparison and explanation. Represent each source's claim specifically so the reader sees what is being compared.",
          true,
        ],
        [
          "weak",
          "The state report is about runoff. The university study is also about runoff. Synthesis is when you write a lot about sources.",
          "That is not yet synthesis. Say what each source claims and how they relate on the same question.",
        ],
        [
          "weak",
          "[[0|The state says runoff is falling.]] The university is wrong and the state is right, so I will only use the state report.",
          "Synthesis does not discard sources without reason. Consider why the studies might differ and what the difference suggests.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Evidence from American literature, and discussions that move toward a decision",
  note: `
## Objectives

Students will be able to:

1. draw evidence from literary or informational texts, including a work of American literature, to support analysis;
2. lead and take part in discussions that respond to a range of perspectives and move toward a decision.

## Materials

Gatsby and Huckleberry Finn excerpts, a model analytic paragraph with labeled parts, discussion roles cards (facilitator, evidence checker, summarizer, devil's advocate), and a decision-making protocol.

## Starter (8 minutes)

Pose a question: "Is Gatsby a hero or a fool?" Ask for a show of hands, then ask the class: "What would it take to change your mind?" Gather criteria on the board.

## Main activity

1. Model an analytic paragraph with the parts labeled: claim, lead-in, quotation, explanation, link back to claim. Students practice rewriting a weak paragraph in which the quotation floats without explanation.
2. Quote integration. Practice introducing a quotation with a signal phrase and embedding a short quotation in a sentence of your own.
3. Discussion groups of five with assigned roles. Their question: "Is Gatsby's dream admirable, foolish, or both?" The protocol asks the group to state positions, test them against text evidence, and end by writing a group statement of what they decided and where they still disagree.
4. Debrief: how did the group respond to perspectives that differed from its own?

## Checking for understanding

Each group posts its statement. The class compares them.

## Exit ticket

Write one sentence that changed or sharpened your view after discussion.
`,
  reading: [
    "Quoting well, and talking toward a decision",
    `
Using evidence is not the same as dropping a quotation into a paragraph. A quotation that arrives without a lead-in and leaves without an explanation does little work. A strong analytic paragraph has a rhythm. It begins with a **claim**, an idea about the text. It introduces the evidence with a **lead-in** that gives context and names the speaker or situation. It presents the **quotation** or paraphrase, ideally short and embedded in the writer's own sentence. It follows with **explanation** that says how the evidence supports the claim, and it ends by connecting back to the larger point.

For example, a claim might be that Fitzgerald presents Daisy's voice as a measure of her world. A lead-in sets the scene: Gatsby tells Nick that Daisy's voice is full of something. The quotation follows: her voice is "full of money." The explanation says how the phrase joins sound and wealth, making her charm inseparable from her class. The link returns to the claim: the novel suggests that what Gatsby loves is as much a social position as a person. Notice that the quotation is only a few words, so the writer's own voice does most of the work.

When using quotations, introduce them with signal phrases such as "Nick observes that," or "In Chapter 31, Huck decides that," and use brackets or ellipses to adjust a quotation while keeping its meaning. Quote only as much as you need and always explain it.

Discussion is analysis in real time. In a group of classmates, people rarely begin with the same view, and the goal is not to win but to move toward a decision that the group can defend. Good discussion habits include stating your position with evidence, asking others to clarify, summarizing what has been said, and testing proposals against the text. Roles help. A facilitator keeps the group on task, an evidence checker asks "Where does it say that?", a summarizer restates areas of agreement and disagreement, and a devil's advocate offers the strongest opposing view. When a group has heard the range of views, it can state a decision, such as "We agree that Gatsby's dream is admirable in its energy but foolish in its object," and note where members still disagree.

The best sign of a good discussion is that someone changes or sharpens a view because of what another said.
`,
  ],
  cards: [
    ["Lead-in", "A phrase that introduces a quotation by giving context."],
    ["Signal phrase", "Words such as 'Nick observes that' that introduce a quotation or paraphrase."],
    ["Embedded quotation", "A short quotation worked into the writer's own sentence."],
    ["Commentary", "The writer's explanation of how evidence supports the claim."],
    ["Ellipsis", "Three dots that show words have been omitted from a quotation."],
    ["Facilitator", "The discussion member who keeps the group on task."],
    ["Devil's advocate", "A member who offers the strongest opposing view to test the group's thinking."],
    ["Consensus statement", "A group's written summary of what it decided and where members still disagree."],
  ],
  closed: [
    [
      "Which sentence best embeds a quotation?",
      [
        "\"Her voice is full of money.\" This is a quotation.",
        "Gatsby says that Daisy's voice is \"full of money,\" suggesting that her charm and her class cannot be separated.",
        "Quotation: full of money.",
        "Daisy's voice. Gatsby. Money.",
      ],
      "B",
    ],
    [
      "A paragraph has a quotation but no explanation. What is missing?",
      [
        "A title",
        "Commentary that says how the quotation supports the claim",
        "More quotations",
        "A longer introduction",
      ],
      "B",
    ],
    [
      "In a group discussion, the evidence checker's job is to ask",
      [
        "Who is winning?",
        "Where does the text say that?",
        "Can we stop now?",
        "What do you feel?",
      ],
      "B",
    ],
    [
      "Which statement is a strong consensus statement?",
      [
        "We all agree.",
        "We agree that Gatsby's dream is admirable in energy but foolish in its object; two members still think his methods make it unadmirable.",
        "Nobody agreed on anything.",
        "The teacher decides.",
      ],
      "B",
    ],
    [
      "Which signal phrase best introduces evidence?",
      [
        "Here it says",
        "In Chapter 31, Huck decides that",
        "Quote",
        "I think",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write an analytic paragraph (five to seven sentences) that makes a claim about Gatsby or Huckleberry Finn, introduces a short quotation with a signal phrase, embeds it in your sentence, explains how it supports the claim, and links back. You may use any short phrase from the novels you recall accurately.",
      scheme: [
        "States a clear claim about the text",
        "Introduces a short quotation with a signal phrase and context",
        "Embeds the quotation in the writer's own sentence",
        "Explains how the quotation supports the claim",
        "Links back to the larger point",
      ],
      model:
        "Twain uses Huck's confusion to criticize a society that confused cruelty with morality. In Chapter 31, Huck decides to protect Jim, even though he believes he is committing a sin, and he says, \"All right, then, I'll go to hell.\" The line shows a boy choosing conscience over what he has been taught. Because the reader sees that Huck is right while Huck thinks he is wrong, the line exposes the corruption of the moral rules around him. In this way, Huck's mistaken belief becomes Twain's argument.",
      answers: [
        [
          "full",
          "[[0|Twain uses Huck's confusion to criticize a society that mistook cruelty for morality.]] [[1|In Chapter 31, after Huck writes a letter to turn Jim in and then thinks it over,]] [[2|he decides he will \"go to hell\" rather than betray his friend.]] [[3|The phrase shows Huck choosing his conscience over what he has been taught, even though he thinks the choice is wicked.]] [[4|So Huck's mistaken belief becomes Twain's argument against the moral rules of his time.]]",
          "Full marks. Your quotation is short and sits inside your sentence, and your explanation does the work.",
        ],
        [
          "full",
          "[[0|Fitzgerald shows that Gatsby's dream depends on a past that cannot return.]] [[1|When Nick tells Gatsby that he cannot repeat the past, Gatsby answers with surprise, saying]] [[2|\"Why of course you can!\"]] [[3|The exclamation reveals how completely he believes in his own story and how little he understands about time.]] [[4|His faith in repeating the past is the flaw that makes his dream both moving and doomed.]]",
          "All five marks. Your explanation uses the exclamation mark as evidence of his belief, which is attentive reading.",
        ],
        [
          "partial",
          "[[0|Fitzgerald shows that money does not buy happiness.]] [[2|Daisy's voice is \"full of money.\"]] It is a good book.",
          "Your claim is clear. Add a lead-in, explain how the quotation supports the claim, and link back.",
        ],
        [
          "partial",
          "[[3|The phrase shows that Daisy's charm cannot be separated from her wealth.]] [[4|This supports the idea that Gatsby loves a social position.]]",
          "Strong explanation and link. Add the claim at the start and introduce the quotation with context.",
          true,
        ],
        [
          "weak",
          "\"All right, then, I'll go to hell.\" That is a quote from Huck. Huck is a boy. The end.",
          "A quotation needs a claim, a lead-in and an explanation. Say what the quotation shows.",
        ],
        [
          "weak",
          "[[0|Twain wants people to be kind.]] This is proven because Huck says things and Jim says things, and they all talk.",
          "Your claim is a start, but you need a specific quotation and an explanation of how it supports the claim.",
        ],
      ],
    },
    {
      prompt:
        "Your discussion group is deciding whether Gatsby's dream is admirable, foolish, or both. Write a consensus statement that states the group's decision, gives two reasons with a reference to the text, and notes one point of continuing disagreement.",
      scheme: [
        "States a clear decision",
        "Gives a first reason with a reference to the text",
        "Gives a second reason with a reference to the text",
        "Notes a point of continuing disagreement or uncertainty",
      ],
      model:
        "We decided that Gatsby's dream is both admirable and foolish. It is admirable because of his hope and energy, shown in his years of work and his faith in the green light. It is foolish because it depends on repeating the past, which he insists is possible when Nick says it is not. Two members still disagree about whether his illegal business makes the dream unadmirable no matter how hopeful he is.",
      answers: [
        [
          "full",
          "[[0|Our group decided Gatsby's dream is both admirable and foolish.]] [[1|It is admirable because he worked for years and kept hoping, as shown by his gaze at the green light.]] [[2|It is foolish because he thinks he can repeat the past, and tells Nick that of course you can.]] [[3|Two of us still disagree about whether his illegal business takes away from how admirable the dream is.]]",
          "Full marks. The statement makes a decision and is honest about what remains unsettled.",
        ],
        [
          "full",
          "[[0|We agreed that Gatsby's dream is mostly foolish but has admirable parts.]] [[1|The admirable part is his loyalty, such as how he waited for Daisy through all the years.]] [[2|The foolish part is that he loves an image of her, not who she is now, like when he is upset that she never said she did not love Tom.]] [[3|We still do not agree on whether Daisy deserves any blame for how it ended.]]",
          "All four marks. Your continuing disagreement is a real question the novel leaves open.",
        ],
        [
          "partial",
          "[[0|We decided Gatsby's dream is foolish.]] [[1|He worked a long time for Daisy.]] Some of us think it's good.",
          "You made a decision. Add a second reason with text support and state the disagreement clearly.",
        ],
        [
          "partial",
          "[[2|It is foolish because he thinks you can repeat the past.]] [[3|One member disagreed.]]",
          "Good reason and disagreement. State the decision, and add a reason that supports the admirable side.",
          true,
        ],
        [
          "weak",
          "We decided that everyone is right and nobody is wrong, so the dream is whatever you think it is.",
          "A consensus statement makes a decision with reasons. Choose a position and support it with the text.",
        ],
        [
          "weak",
          "[[0|The dream is admirable and foolish.]] We did not discuss it so there are no reasons, but it is both.",
          "The decision is clear. Give two reasons from the novel, and note where members disagreed.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Presenting for an audience, and varying syntax for effect",
  note: `
## Objectives

Students will be able to:

1. present information so that organization, development and style suit the audience and task;
2. vary syntax for effect, consulting style guides when writing for a particular audience.

## Materials

A rubric for oral presentations, a handout on sentence types and rhetorical effects (periodic sentences, parallelism, short emphatic sentences), a style guide excerpt (MLA and a news style), and a before-and-after paragraph.

## Starter (8 minutes)

Read two versions of the same news about a school event aloud: one for the principal's newsletter and one for a group chat. Ask what changes and why. Name this as awareness of audience and task.

## Main activity

1. Presentation planning. Students prepare a three-minute presentation of their research for an audience of adults, such as the school board. They identify the audience's needs and adjust organization, evidence and vocabulary.
2. Syntax lab. Show examples of varied sentence structures: a short sentence for emphasis after a long one, a periodic sentence that saves the main idea for the end, parallel structure for rhythm, and a sentence that begins with a subordinate clause. Students revise a monotone paragraph.
3. Consult a style guide. Students decide how a given sentence should be formatted for MLA (for example, a title, a quotation, a citation) and for a news style (for example, numbers, titles).
4. Peer feedback on presentations using the rubric.

## Checking for understanding

Each student states the audience for their presentation and one choice they made because of it.

## Exit ticket

Rewrite one sentence three ways and say which suits your audience best.
`,
  reading: [
    "Fitting the voice to the audience",
    `
The same information can be delivered in many ways, and the right way depends on the audience and the task. A presentation to the school board about the cost of flood damage will be organized differently from a conversation with a friend. A board member has limited time, wants a clear recommendation, and may not know the technical vocabulary. A good presenter begins with the main point, supports it with a small number of strong pieces of evidence, defines key terms, and ends with a request or a conclusion. A visual aid should support the spoken words and should not simply repeat them. A speaker should practice with a timer, since a presentation that runs too long loses its audience.

Sentence style matters in writing as well as in speech. A paragraph in which every sentence has the same length and pattern sounds monotonous, even when the content is good. Skilled writers vary their **syntax**, the arrangement of words in a sentence, for effect. A **short sentence** after a long one lands with force: "The levees held for six hours. Then they failed." A **periodic sentence** delays the main idea to the end, building suspense: "After weeks of rain, after the rivers rose, after the sirens sounded and the roads closed, the city flooded." **Parallelism** gives related ideas the same form, creating rhythm and emphasis: "We studied the causes, we measured the damage, and we planned the response." A sentence that opens with a subordinate clause, such as "Although the data were incomplete, the trend was clear," puts the contrast in the reader's mind before the main point.

Different audiences also follow different conventions, which is where style guides come in. MLA style, often used in English classes, tells you how to format quotations, titles and citations. A newspaper style may spell out numbers under ten and shorten titles. A scientific style may prefer passive constructions and precise measurements. When you write for a particular audience, check the relevant guide, and when the guide is silent, choose consistency. Consulting a style guide is not a sign of weakness; it is the habit of a professional writer.

The question to ask in every case is the same: who is reading or listening, what do they need, and which choices serve them?
`,
  ],
  cards: [
    ["Audience", "The people a writer or speaker is addressing."],
    ["Syntax", "The arrangement of words and phrases in a sentence."],
    ["Periodic sentence", "A sentence that saves its main idea for the end."],
    ["Parallelism", "Using the same grammatical form for related ideas."],
    ["Short emphatic sentence", "A brief sentence used after longer ones to stress a point."],
    ["Style guide", "A reference that sets conventions for formatting and usage, such as MLA or AP."],
    ["Monotone prose", "Writing in which every sentence has the same length and pattern."],
    ["Visual aid", "A slide, chart or object that supports a presentation."],
  ],
  closed: [
    [
      "Which sentence is periodic?",
      [
        "The city flooded after the rivers rose.",
        "After weeks of rain, after the rivers rose and the roads closed, the city flooded.",
        "The city flooded.",
        "The rivers rose, and the city flooded.",
      ],
      "B",
    ],
    [
      "Which sentence uses parallelism?",
      [
        "We studied causes, measuring the damage, and a plan was made.",
        "We studied the causes, we measured the damage, and we planned the response.",
        "We studied the causes and then it was measured and plans.",
        "The causes were studied; damage; plan.",
      ],
      "B",
    ],
    [
      "A short sentence after a long one is mainly used to",
      [
        "confuse readers",
        "give emphasis",
        "lengthen the paragraph",
        "avoid punctuation",
      ],
      "B",
    ],
    [
      "A presentation for the school board should",
      [
        "begin with a joke and end without a conclusion",
        "begin with the main point, define terms, and end with a clear request or conclusion",
        "use as many slides as possible",
        "avoid evidence",
      ],
      "B",
    ],
    [
      "When a style guide is silent on a point, the best choice is to",
      [
        "ignore the guide",
        "choose a consistent approach",
        "change randomly",
        "leave it out",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Revise this monotone passage to vary sentence structure, using at least a short emphatic sentence and one periodic or parallel sentence. Then explain two effects of your changes. Passage: \"The levees failed. The water rose. The streets flooded. The people left. The city waited.\"",
      scheme: [
        "Combines or reshapes sentences to vary length and structure",
        "Includes a short emphatic sentence",
        "Includes a periodic or parallel sentence",
        "Explains the effect of at least two changes",
      ],
      model:
        "Revision: When the levees failed, the water rose through the streets and the people left their homes behind, abandoning their porches, their cars and their kitchens. The city waited. Explanation: The long sentence gathers the events into a rush, and the short sentence at the end slows the pace and emphasizes the silence after the flood.",
      answers: [
        [
          "full",
          "[[0|When the levees failed, the water rose through the streets, and the people left their homes behind: porches, cars and kitchens.]] [[1|The city waited.]] [[2|The list of porches, cars and kitchens is a parallel series, and the opening is a longer sentence that holds the whole disaster.]] [[3|The long sentence pulls the events together like the rush of the flood, and the short last sentence makes the waiting feel heavy and quiet.]]",
          "Full marks. You explained how sentence length matches what the sentences describe.",
        ],
        [
          "full",
          "[[0|After the levees failed, after the water rose and the streets filled, the people left.]] [[1|And the city waited.]] [[2|The first sentence is periodic because the main action, the people left, comes at the end.]] [[3|That delay builds the feeling of an event piling up, and the short sentence after it gives emphasis and a feeling of stillness.]]",
          "All four marks. Calling out that the main action comes at the end shows you understand periodic structure.",
        ],
        [
          "partial",
          "[[0|When the levees failed, the water rose and flooded the streets, and the people left.]] The city waited. It is better.",
          "You combined the sentences well, and the final short sentence works. Add a periodic or parallel structure and explain the effects.",
        ],
        [
          "partial",
          "[[2|I used parallelism with the same kind of phrase.]] [[3|It makes the rhythm stronger and the ending more emphatic.]]",
          "Your explanation is good. Show the revised passage so the reader can see the structures you used.",
          true,
        ],
        [
          "weak",
          "The levees failed. The water rose a lot. The streets flooded badly. The people left fast. The city waited quietly.",
          "This is still five short sentences in the same pattern. Combine some and keep one short sentence for emphasis.",
        ],
        [
          "weak",
          "[[1|The city waited.]] I changed nothing else because the passage is already good as it is.",
          "The final short sentence works. Reshape the rest to vary sentence length and structure, and explain the effect.",
        ],
      ],
    },
    {
      prompt:
        "You must present your research on Lake Erie algae blooms to two audiences: (a) classmates and (b) the Ohio state legislature's agriculture committee. Explain three specific choices you would change between the two presentations in organization, evidence or style, and why.",
      scheme: [
        "Identifies a change in organization for the committee",
        "Identifies a change in evidence or detail",
        "Identifies a change in style or vocabulary",
        "Explains why each change suits the audience",
      ],
      model:
        "For the committee, I would begin with my main recommendation and the cost of doing nothing, since members have limited time. I would present exact figures and cite agencies and studies, which they will want. I would use formal language and define technical terms like phosphorus runoff. For classmates, I would open with a story, use fewer figures and speak more casually. The changes suit the legislators' need for clear decisions and the classmates' interest and background.",
      answers: [
        [
          "full",
          "[[0|For the committee I would start with my recommendation and the main reason, since they have limited time and need to decide.]] [[1|I would add exact numbers with their sources, like phosphorus levels from state agencies, because they will expect credible data.]] [[2|I would use formal language and explain terms like runoff, but with classmates I would use a story and simpler words.]] [[3|Each change fits what the audience needs: decision makers need the point first and proof, and classmates need interest and background.]]",
          "Full marks. You tied each change to a need of the audience, not just a difference.",
        ],
        [
          "full",
          "[[0|For legislators, I would organize it as problem, solution and cost, and put the solution at the beginning.]] [[1|I'd include a chart of bloom sizes by year and name the study that produced it.]] [[2|My tone would be formal and respectful, with no slang, and for classmates I'd be more conversational.]] [[3|The committee is short on time and has power to act, so organization and credibility matter most, while classmates need something that holds their attention.]]",
          "All four marks. Problem, solution, cost is the structure policy audiences expect.",
        ],
        [
          "partial",
          "[[0|I would start with the main point for the committee.]] [[2|I would use more formal words.]] For classmates it would be more fun.",
          "Good organization and style choices. Add a change in evidence and explain why each suits its audience.",
        ],
        [
          "partial",
          "[[1|I would include more data and cite the studies for the committee.]] [[3|They need proof to make a decision.]]",
          "Strong evidence choice with a reason. Add changes in organization and style.",
          true,
        ],
        [
          "weak",
          "I would give the same presentation to both groups because the facts are the same, so there is no reason to change anything.",
          "The facts may be the same, but each audience needs different organization, evidence and style. Think about what the committee must decide.",
        ],
        [
          "weak",
          "[[2|I would use bigger words for the committee.]] That would make me look smart and they would respect me.",
          "Formal language helps, but bigger words alone do not serve the audience. Define terms and organize for decision makers.",
        ],
      ],
    },
  ],
};

writeCourse("english-11-grade-11.json", "English 11", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
