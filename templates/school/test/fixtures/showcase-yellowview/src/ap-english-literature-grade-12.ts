import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * AP English Literature and Composition, Grade 12, Quarter 1. Framed by the
 * College Board's course units (short fiction, poetry, longer fiction and
 * drama, writing about literature), with fresh prompts written for this
 * course. Anchor texts, all public domain: Joyce ("Araby", "Eveline"),
 * Dickinson, Wordsworth, Shelley, Blake, Hopkins, Shakespeare's Hamlet and
 * Ibsen's A Doll's House.
 */

const w1: WeekInput = {
  topic: `Character, setting and narration in Joyce's "Araby"`,
  note: `
## Objectives

Students will be able to:

1. describe a character's traits, motives and changes as a short story develops;
2. explain how setting shapes mood, character and conflict in a story;
3. analyze how a narrator's point of view affects what the reader learns and how they judge it.

## Materials

Copies of "Araby" by James Joyce, annotation sheets in three columns (character, setting, narration), and the AP character-analysis prompt frame.

## Starter (8 minutes)

Ask: "When you remember a time you were in love for the first time, are you the same person narrating it now as you were then? What do you see now that you could not see then?" Collect two responses and introduce the idea of a retrospective narrator.

## Main activity

1. Read the story aloud. Annotate the setting in the opening paragraph (a blind street, a deserted house, the "cold gray" lamps) and the bazaar at the end (the darkened hall, the stalls closing). Chart what each setting shows about the boy's inner life.
2. Trace the character's change. List the boy's motives (to bring something back for Mangan's sister), the obstacles (his uncle's lateness), and his final realization. How does the language of the early pages, with its religious images of chalice and prayer, prepare for the last line?
3. Analyze point of view. The narrator is an adult looking back, though he speaks as the boy. Find sentences that belong to the older voice.
4. Write a thesis answering: how does Joyce use the retrospective narrator to dramatize the boy's disillusionment?

## Checking for understanding

Cold call: one detail of setting, one inference about the boy, one consequence of the narrator's distance.

## Exit ticket

Complete: "The narrator's hindsight allows the reader to see ..."
`,
  reading: [
    "A boy, a bazaar and the older voice that remembers",
    `
James Joyce's "Araby," one of the stories in Dubliners (1914), follows an unnamed boy through a few weeks of infatuation and one night of disillusion. The story is short, but nearly every sentence is working at three levels: it moves the plot, builds the mood, and shows the narrator's mind.

The setting is the first lesson. North Richmond Street is "blind," a dead end, and the houses stand with "brown imperturbable faces." The adjectives suggest enclosure and quiet, and in that world a boy's imagination has nowhere to go but inward. The dead priest's house, with its wild garden and rusty bicycle pump, adds a note of decay, and the books left behind include a romance. Against this deadness, the girl across the street, Mangan's sister, becomes the focus of every thought. The boy's feeling is both sensual and religious: he carries his "chalice" through the crowd of the market, and he says his heart is a prayer. The religious language raises her into an idol and prepares the reader for the collapse.

The plot is simple. The girl mentions that she cannot go to the bazaar called Araby, and the boy promises to bring her something. On the night, his uncle comes home late and forgetful, and the boy's journey is delayed. He arrives near closing time with a florin in his pocket. The bazaar, which he had imagined as a place of Eastern enchantment, is a nearly dark hall that reminds him of a church after a service. A young woman at a stall talks with two men in English accents, the conversation trivial and flirtatious. The boy cannot buy anything he can bear to bring back. He ends with one of Joyce's best-known lines: "Gazing up into the darkness I saw myself as a creature driven and derided by vanity; and my eyes burned with anguish and anger."

The narration is the key. The voice is that of an adult remembering, who knows the boy's mind but can name it with a clarity the boy did not have. The word "vanity" belongs to that older voice, since a boy in the moment would more likely say he was ashamed. The hindsight allows the reader to see the boy's idealism and its collapse together, and to ask whether the adult has learned to see more clearly or only to feel the loss more keenly.
`,
  ],
  cards: [
    ["Retrospective narrator", "A narrator who tells the story from a later time with the knowledge gained since."],
    ["Epiphany", "A sudden moment of insight in which a character perceives something about themself or the world."],
    ["Setting (mood)", "Place and atmosphere that reflect or shape a character's inner state."],
    ["Idealization", "Seeing a person or thing as better than reality, as the boy does with Mangan's sister."],
    ["Religious imagery", "Language drawn from worship and ritual, here used for infatuation."],
    ["Disillusionment", "The loss of an illusion about a person, place or idea."],
    ["Free indirect style", "Narration that blends the narrator's voice with a character's thoughts."],
    ["Motif", "A repeated image or idea that builds meaning across a work."],
  ],
  closed: [
    [
      "The phrase \"blind\" street and houses with \"imperturbable faces\" mainly establish a setting that",
      [
        "is lively and welcoming",
        "suggests enclosure and quiet, in which the boy's imagination turns inward",
        "is a city center with heavy traffic",
        "is full of children playing",
      ],
      "B",
    ],
    [
      "The boy describes carrying his \"chalice\" through the market. What does the religious image suggest?",
      [
        "He is a priest.",
        "His devotion to the girl has the intensity of worship, which raises her above ordinary life.",
        "He is in church.",
        "He has stolen something.",
      ],
      "B",
    ],
    [
      "At the bazaar, the hall is dark like a church after a service. The comparison suggests that",
      [
        "the bazaar is bright and joyous",
        "the sacred feeling the boy brought has ended, leaving only emptiness",
        "the bazaar is a church",
        "the boy is praying",
      ],
      "B",
    ],
    [
      "The word \"vanity\" in the final lines likely belongs to the voice of",
      [
        "the girl",
        "the older narrator, who can name the boy's illusion more clearly than the boy could",
        "the uncle",
        "a salesperson",
      ],
      "B",
    ],
    [
      "What is the effect of the retrospective narration?",
      [
        "It removes all emotion.",
        "It lets the reader see the boy's idealism and its collapse with the clarity of hindsight.",
        "It makes the story a news report.",
        "It hides the boy's thoughts.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "In a paragraph, analyze how Joyce uses setting in \"Araby\" to reveal the boy's inner life and to prepare for his final epiphany. Refer to at least two specific settings or details.",
      scheme: [
        "Makes a defensible claim about how setting reveals inner life or prepares the epiphany",
        "Analyzes a first setting or detail from the opening (the blind street, the deserted house)",
        "Analyzes a second setting or detail from the bazaar",
        "Explains the connection between the settings and the final realization",
      ],
      model:
        "Joyce uses setting to externalize the boy's longing and to prepare for its collapse. The 'blind' street and the dead priest's house create an enclosed, decaying world where imagination has nowhere to go but inward, which intensifies his idealization of Mangan's sister. At the bazaar, the darkened hall that resembles a church after a service replaces the enchantment he imagined with emptiness. The movement from an enclosed street to a hollow hall makes the final recognition of vanity feel inevitable.",
      answers: [
        [
          "full",
          "[[0|Joyce uses setting to show the boy's inner world and to prepare for his collapse.]] [[1|The street is called blind and the houses have imperturbable faces, and the priest's house is decaying, so the boy lives in an enclosed place where his imagination has nowhere to go but inward onto the girl.]] [[2|At the bazaar the hall is almost dark and compared to a church after a service, so the sacred feeling he carried has become empty.]] [[3|The shift from enclosed street to hollow hall makes his final realization of vanity feel like the natural end of an illusion that setting had been feeding.]]",
          "Full marks. You paired an early and a late setting and traced how they connect to the epiphany.",
        ],
        [
          "full",
          "[[0|The setting in Araby works as a mirror of the boy's mind and a signal of what will happen to his hopes.]] [[1|The dead end street with its quiet and the abandoned house with a garden gone wild suggest a world that is cut off, where the boy's feeling for the girl grows without any check from reality.]] [[2|At the bazaar, most of the stalls are closing, the hall is dark, and the trivial talk of the saleswoman with two men replaces the romance he imagined.]] [[3|So the setting moves from the secret world of his daydream to the plain world, which forces him to see how foolish his idealization was.]]",
          "All four marks. Including the saleswoman's conversation as part of the setting is perceptive.",
        ],
        [
          "partial",
          "[[0|Joyce uses setting to show how the boy feels.]] [[1|The street is blind and quiet.]] That is how the setting works.",
          "Your claim and first detail are good. Analyze a bazaar detail and connect both settings to the epiphany.",
        ],
        [
          "partial",
          "[[2|At the bazaar the hall is dark like a church after a service.]] [[3|That prepares for him seeing himself as a creature driven by vanity.]]",
          "Strong on the bazaar and the epiphany. Add a claim and an early setting detail.",
          true,
        ],
        [
          "weak",
          "The setting is Dublin. The bazaar is a place where they sell things. The story is about shopping.",
          "These are surface facts. Ask how the settings reflect the boy's feelings and expectations.",
        ],
        [
          "weak",
          "[[1|The street is blind.]] Setting is not important in a short story because the plot is what matters.",
          "In a story this short, setting does the work of showing what the narrator feels. Look at the contrast between street and hall.",
        ],
      ],
    },
    {
      prompt:
        "Analyze how the narrator's point of view in \"Araby\" shapes what the reader learns and how the reader judges the boy. Consider the relationship between the boy who experiences events and the adult who recounts them, and refer to specific language.",
      scheme: [
        "Identifies the retrospective narration and its dual voice",
        "Identifies specific language that belongs to the older voice or reveals the boy's illusion",
        "Explains what the reader learns because of this point of view",
        "Explains how it shapes the reader's judgment of the boy (sympathy, irony, or both)",
      ],
      model:
        "Joyce uses an adult narrator remembering a boyhood experience, so two perspectives overlap. The language of worship, such as 'chalice' and 'prayer,' shows the boy's illusions, while the phrase 'driven and derided by vanity' names them with an adult's clarity. The reader therefore learns not only what the boy felt but how foolish and moving it later seems. This produces both irony and sympathy: we see the boy's mistake, yet the adult's tone shows he still feels its sting.",
      answers: [
        [
          "full",
          "[[0|The story is told by an adult looking back, so there are two voices, the boy who felt and the man who understands.]] [[1|The boy's side comes out in religious words like chalice and prayer, and the older voice shows up when the last line calls him a creature driven and derided by vanity.]] [[2|Because of this we learn what the boy felt and also how that feeling looks in hindsight.]] [[3|We see the mistake with irony but we also feel for him, since the adult still seems to feel the sting.]]",
          "Full marks. Your final sentence handles irony and sympathy together, which is the sophisticated reading.",
        ],
        [
          "full",
          "[[0|Joyce uses a retrospective first-person narrator, an adult who remembers being the boy.]] [[1|The line about vanity could not belong to the boy in the moment, since he only felt anguish and anger, while the phrase driven and derided is a man's analysis.]] [[2|This lets the reader see the boy's feelings from inside and also understand what they mean.]] [[3|It makes us judge the boy gently, because the adult is not mocking him, he is looking back with a mix of sorrow and clearness.]]",
          "All four marks. Noting that the boy would only feel anguish is a keen reading of the two voices.",
        ],
        [
          "partial",
          "[[0|The narrator is an adult remembering when he was a boy.]] [[1|He says chalice and vanity.]] It helps the story.",
          "You identified the dual voice and some language. Explain what the reader learns and how it shapes judgment.",
        ],
        [
          "partial",
          "[[2|We learn what the boy felt and what he later understood.]] [[3|We feel sympathy.]]",
          "Good on what we learn and judge. Identify the retrospective narration and cite language.",
          true,
        ],
        [
          "weak",
          "The narrator is the boy as a boy telling it as it happens. The reader learns only what he knew then.",
          "The word 'vanity' shows an older perspective. Reread the last paragraph.",
        ],
        [
          "weak",
          "[[0|It is a first-person narrator.]] That means the narrator is always honest and we should believe everything he says.",
          "First person is not automatically reliable. This narrator's hindsight actually corrects the boy's illusions.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Writing a literary thesis, and imagery and figurative language in Dickinson",
  note: `
## Objectives

Students will be able to:

1. write a thesis about how an author's choices create meaning in a short story;
2. analyze how imagery and figurative language build meaning in a poem.

## Materials

Emily Dickinson's "Because I could not stop for Death," a thesis ladder (description, claim, defensible interpretation), and the imagery-and-figures tracker.

## Starter (8 minutes)

Display three thesis statements on "Araby": "The story is about a boy." "Joyce uses setting." "Through a retrospective narrator who names the boy's vanity, Joyce shows that the loss of an illusion can be understood only in hindsight." Ask students to rank them and explain what the third does that the others do not.

## Main activity

1. Thesis ladder. Move three thesis statements up from description to defensible interpretation. Rule: a thesis must say what the author does, how, and what it means.
2. Read Dickinson's poem twice. First, identify the literal situation: a speaker rides in a carriage with Death and Immortality. Second, track the images in order: the school at recess, the fields of gazing grain, the setting sun, the house that is a swelling in the ground.
3. Figurative language. Death is personified as a polite suitor; the ride is a metaphor for the passage from life; "the Cornice—in the Ground" shifts the carriage to a grave. Students create a table: image, literal meaning, figurative meaning, effect.
4. Write a thesis for the poem and share.

## Checking for understanding

Whiteboards: one thesis, with a "by ... , the poet ... " frame.

## Exit ticket

Choose the image that most surprises you and say what it adds to the poem's tone.
`,
  reading: [
    "A courteous Death, and how to say what a text does",
    `
A thesis is not a topic, and it is not a summary. In AP Literature, it is a defensible claim about how an author's choices produce meaning. A common ladder illustrates the difference. A **description** says what is there ("Joyce uses setting"). A **claim** says what it does ("Joyce uses setting to show the boy's feelings"). A **defensible interpretation** says what it means and why it matters ("Joyce moves the boy from an enclosed street to a darkened hall to show that idealized love cannot survive contact with ordinary life"). The last is the one that earns the point, because someone could argue with it and the writer can defend it with evidence.

Emily Dickinson's "Because I could not stop for Death" (written about 1863) offers a rich test. The speaker says she was too busy to stop for Death, so "He kindly stopped for me." The first image is of a courteous driver with a carriage, in which they ride with only Immortality for company. Death is personified, not as a terror but as a gentleman caller, and the mood is leisurely: "We slowly drove—He knew no haste." Her willingness to put aside her work and leisure suggests that she accepts the journey.

The images that follow map a life. The carriage passes a school where children are playing at recess, then fields of grain that seem to look back at the riders, and finally the setting sun. These are childhood, maturity and decline, and the preposition shifts reinforce the meaning: they pass the school and the grain, but when they reach the sun, it "passed Us," so they have moved outside time. The chill and dew that follow, and her thin clothing, suggest that she is not dressed for the cold of the grave. Then the carriage halts at a house that looks like "a Swelling of the Ground," its roof barely visible. The comparison turns a grave into a domestic building, which continues the poem's calm, almost domestic tone.

The last stanza steps back from the ride. Centuries have passed, but they "feel shorter than the Day" she first sensed the horses' heads toward eternity. The flat, conversational rhythm and the dashes keep her tone controlled. A strong thesis might argue that Dickinson uses the gentle personification and the domestic imagery to make death familiar rather than frightening, while the final jump in time reveals how unsettling that familiarity is. The best claims account for both the calm surface and the disquiet underneath.
`,
  ],
  cards: [
    ["Thesis (AP)", "A defensible claim about how an author's choices create meaning."],
    ["Personification", "Giving human qualities to an abstraction or object, as Dickinson does with Death."],
    ["Imagery", "Language that appeals to the senses to create a picture."],
    ["Extended metaphor", "A comparison developed throughout a poem, here the carriage ride as a life's passage."],
    ["Dash (Dickinson)", "A punctuation mark that creates pauses, hesitation or emphasis."],
    ["Tone", "The speaker's attitude, such as calm, wry or uneasy."],
    ["Defensible interpretation", "A reading someone could argue against and the writer can support."],
    ["Domestic imagery", "Images drawn from home and daily life."],
  ],
  closed: [
    [
      "Which thesis for \"Araby\" is most defensible?",
      [
        "\"Araby\" is a story by Joyce.",
        "Joyce uses setting in the story.",
        "By moving the boy from an enclosed street to a darkened hall, Joyce shows that idealized love cannot survive ordinary life.",
        "The boy goes to a bazaar.",
      ],
      "C",
    ],
    [
      "In the poem, Death is portrayed as",
      [
        "a terrifying monster",
        "a courteous gentleman who stops his carriage for the speaker",
        "a soldier",
        "a teacher",
      ],
      "B",
    ],
    [
      "The school, the fields of grain and the setting sun are best read as",
      [
        "unrelated scenery",
        "stages of a life, from childhood through maturity to decline",
        "a list of places in Massachusetts",
        "the speaker's chores",
      ],
      "B",
    ],
    [
      "The house like a \"Swelling of the Ground\" is a metaphor for",
      [
        "a hill",
        "a grave, described in the calm language of a home",
        "a barn",
        "a school",
      ],
      "B",
    ],
    [
      "The poem's calm, conversational tone combined with the subject of death produces",
      [
        "humor only",
        "a disquieting effect, since death seems oddly familiar",
        "a lack of meaning",
        "a lively mood",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a thesis statement for an essay on how Dickinson uses imagery and figurative language in \"Because I could not stop for Death\" to shape the poem's attitude toward death. Then name two specific images or figures you would use as evidence and what each would show.",
      scheme: [
        "Writes a defensible thesis that makes a claim about meaning, not a description",
        "Names a first specific image or figure",
        "Explains what the first shows",
        "Names and explains a second specific image or figure",
      ],
      model:
        "Thesis: Through the personification of Death as a courteous driver and the domestic image of the grave as a house, Dickinson makes death seem familiar and gentle on the surface, while the poem's final leap into eternity exposes the unsettling quiet beneath that calm. Evidence: Death 'kindly' stopping shows an attitude of acceptance. The grave as a 'Swelling of the Ground' shows death rendered as an ordinary dwelling and the poem's disquiet.",
      answers: [
        [
          "full",
          "[[0|Through personifying Death as a polite gentleman and describing the grave as a house, Dickinson makes death feel familiar and calm, but the jump to eternity at the end shows the unease under that calm.]] [[1|One piece of evidence is that Death kindly stops for her and knows no haste.]] [[2|It shows the speaker accepting death as a courtesy and sets the tone as unhurried and polite.]] [[3|Another is that the grave is a Swelling of the Ground, which turns it into a home, and shows the poem's calm voice hiding something strange.]]",
          "Full marks. Your thesis commits to a reading and the two images support different halves of it.",
        ],
        [
          "full",
          "[[0|Dickinson uses images of a life's stages and a quiet, domestic grave to argue that death is a natural continuation of life and not an interruption, though the last stanza leaves the reader uneasy about eternity.]] [[1|The school with children at recess and the fields of gazing grain.]] [[2|These show the stages of a life passing by the window, so death is part of the same journey.]] [[3|The sun that passes them at the end shows they have left time, since normally they would be passing it.]]",
          "All four marks. Noticing the sun passing them is a precise use of the poem's grammar.",
        ],
        [
          "partial",
          "[[0|Dickinson uses imagery to show death is calm.]] [[1|Evidence: the carriage ride with Death.]] That is how.",
          "Your thesis is a start and the evidence is accurate. Explain what each image shows and add a second image.",
        ],
        [
          "partial",
          "[[2|The courteous driver shows death is polite.]] [[3|The grave as a house shows death is ordinary.]]",
          "Strong interpretations. Add a thesis that connects the images and name the specifics.",
          true,
        ],
        [
          "weak",
          "Dickinson uses imagery. The poem has a carriage and a sun. These are images. That is my thesis.",
          "This is description. A thesis says what the images do and what they mean.",
        ],
        [
          "weak",
          "[[0|Dickinson uses personification to show that death is calm.]] I will use the evidence that she wrote it in the 1800s and that she was a woman.",
          "Your thesis is a start. Evidence must come from the poem's images, not from the author's biography alone.",
        ],
      ],
    },
    {
      prompt:
        "Analyze the shift in the poem's final stanza, in which centuries \"feel shorter than the Day\" she first sensed that the horses' heads were toward eternity. Explain what this change in time does to the poem's tone and to the earlier images of a calm ride.",
      scheme: [
        "Describes the shift in time accurately",
        "Explains how it changes the tone or mood",
        "Explains how it reframes the earlier calm images",
        "Connects the shift to the poem's meaning",
      ],
      model:
        "In the final stanza the speaker steps outside the ride and reveals that centuries have passed since the day she sensed eternity. This stretches the poem's unhurried tone into something vast and uncanny, because the calm carriage ride now looks like the start of endless time. The earlier gentle images of school and grain and the grave as a house are reframed as a leisurely disguise for eternity. The poem suggests that familiarity with death does not remove its strangeness.",
      answers: [
        [
          "full",
          "[[0|In the last stanza the speaker says centuries have passed but they feel shorter than the day she first felt the horses' heads were toward eternity, so the story jumps outside of normal time.]] [[1|That changes the tone from calm and polite to uncanny and vast, since the quiet ride has gone on forever.]] [[2|The earlier gentle images of the school, the grain and the little house now seem like a disguise that made eternity look ordinary.]] [[3|The poem suggests that getting used to death does not make it less strange.]]",
          "Full marks. You showed how the final shift changes how we read everything before it.",
        ],
        [
          "full",
          "[[0|The last stanza reveals that the speaker has been dead for centuries and that time means nothing now.]] [[1|The tone changes from leisurely to eerie, because the polite voice is still the same but the information is chilling.]] [[2|This makes me look back at the sun passing them and the house in the ground as signs that she was moving out of time the whole way.]] [[3|The poem shows death as calm on the outside but unsettling underneath, which is why the mild voice matters.]]",
          "All four marks. Calling the voice \"the same but the information chilling\" captures Dickinson's method.",
        ],
        [
          "partial",
          "[[0|The last stanza says centuries have passed.]] [[1|It makes the poem more serious.]] The speaker stays calm.",
          "You noted the shift and a change in tone. Explain how it reframes the earlier images and what it means.",
        ],
        [
          "partial",
          "[[2|It makes the earlier calm images look like a disguise.]] [[3|Death is strange even if you get used to it.]]",
          "Strong reframing and meaning. Describe the shift in time and its effect on tone.",
          true,
        ],
        [
          "weak",
          "The last stanza is just where the poem ends. Centuries pass because the ride was long and nothing changes.",
          "Centuries is a deliberate leap. Ask what happens to the sense of time in the poem.",
        ],
        [
          "weak",
          "[[0|Centuries feel shorter than a day.]] That means the speaker is joking about how short life is.",
          "The line is not a joke about the shortness of life; it shows how time behaves after death. Think about eternity.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Form, structure and shifts in tone: Wordsworth and Shelley",
  note: `
## Objectives

Students will be able to:

1. explain how form, structure and line breaks contribute to a poem's effect;
2. describe how a speaker's tone shifts across a poem and what the shift reveals.

## Materials

William Wordsworth's "The world is too much with us" and Percy Bysshe Shelley's "Ozymandias," a form-and-shift annotation sheet, and the tone vocabulary list.

## Starter (8 minutes)

Display a fourteen-line block of prose with no line breaks and the same text as a sonnet. Ask: "What changes when the lines break where they do? What does the rhyme scheme ask us to notice?"

## Main activity

1. Review the Petrarchan and Shakespearean sonnet forms. Octave and sestet, the volta, rhyme scheme. Mark each in Wordsworth's poem.
2. Read "The world is too much with us." In the octave, the speaker diagnoses a world of "getting and spending"; at the volta he turns to a wish. Chart the tone from weariness and complaint to a startling, almost irreverent wish.
3. Read "Ozymandias." Identify the frame narrative: a traveler tells the speaker about a statue. Trace the tone from the description of the sculptor's art to the inscription "Look on my Works, ye Mighty, and despair!" to the final lines about "nothing beside remains." Where does the shift occur and how is it enacted by line breaks and syntax?
4. Write a paragraph explaining a shift, citing the line, the device and the effect.

## Checking for understanding

Pairs mark the volta in each poem and name the shift in a single phrase.

## Exit ticket

Name one way a line break emphasizes a word in either poem.
`,
  reading: [
    "How a poem's shape argues, and how its tone turns",
    `
A poem's form is a decision about how its meaning will arrive. Take the sonnet, a fourteen-line poem with a long tradition. In the Petrarchan form, the first eight lines (the **octave**) rhyme ABBAABBA and usually present a problem, observation or situation. The last six (the **sestet**) answer or complicate it. Between them comes the **volta**, or turn, a shift in thought or tone that gives the sonnet its characteristic movement from tension to resolution, or from statement to surprise.

William Wordsworth's "The world is too much with us" follows this form. The octave diagnoses a modern problem: "Getting and spending, we lay waste our powers." People are so absorbed in work and money that they have lost their connection to nature, and the speaker's tone is weary and accusing. He says that "we have given our hearts away, a sordid boon," a phrase whose contradiction between "boon" and "sordid" shows his disgust at a bargain no one questioned. The volta arrives at line 9 with an abrupt, bitter wish: he would rather be "a Pagan suckled in a creed outworn," so that he might see pagan gods in the sea and hear old music in the wind. The wish is startling, even irreverent, and the sestet's tone changes from complaint to longing. The poem argues that a world with no wonder is a poorer one, and its form dramatizes the argument: the problem fills the octave and the impossible wish completes the sestet.

Percy Bysshe Shelley's "Ozymandias" uses the sonnet differently. A traveler describes a ruined statue in the desert: two vast legs of stone, a shattered face with a "sneer of cold command." The sculptor, the speaker notes, read the king's passions well, and the lines that describe the face are rich with detail. The inscription on the pedestal then speaks in the king's own voice, proud and boastful: "Look on my Works, ye Mighty, and despair!" The tone seems to rise toward grandeur, and then the final lines undercut it. "Nothing beside remains." The sand stretches "lone and level," and the sentence ends on a long, flat line that mimics the emptiness it describes. The shift is from imperial arrogance to ironic ruin. The frame, in which the speaker reports what a traveler said, adds distance, a layer of time between the king and the reader, which strengthens the irony.

When you analyze form, ask what the shape does to meaning: where does the poem turn, how do the line breaks and syntax dramatize the turn, and what does the shift reveal about the speaker or subject?
`,
  ],
  cards: [
    ["Sonnet", "A fourteen-line poem, often in iambic pentameter, with a set rhyme scheme."],
    ["Octave", "The first eight lines of a Petrarchan sonnet."],
    ["Sestet", "The last six lines of a Petrarchan sonnet."],
    ["Volta", "The turn in thought or tone within a sonnet."],
    ["Frame narrative", "A story or poem told through a speaker who reports another person's account."],
    ["Irony (situational)", "A contrast between what is expected and what happens."],
    ["Enjambment", "A line that runs on into the next without a pause."],
    ["Caesura", "A pause within a line of poetry."],
  ],
  closed: [
    [
      "In Wordsworth's poem, the volta comes at line 9. What shift does it mark?",
      [
        "From nature to the city",
        "From a complaint about modern life to a startling wish to be a pagan",
        "From past to future tense",
        "From prose to verse",
      ],
      "B",
    ],
    [
      "The phrase \"a sordid boon\" combines opposing ideas. Its effect is to",
      [
        "praise the bargain",
        "show the speaker's disgust at a trade people accepted as a gain",
        "confuse the reader",
        "introduce a new topic",
      ],
      "B",
    ],
    [
      "In \"Ozymandias,\" the inscription \"Look on my Works, ye Mighty, and despair!\" is ironic because",
      [
        "the works have crumbled and nothing remains",
        "the king is humble",
        "the inscription is in a different language",
        "the sculptor was unskilled",
      ],
      "A",
    ],
    [
      "The frame of a traveler reporting what he saw does what for the poem?",
      [
        "Removes the speaker",
        "Adds distance in time and perspective, strengthening the irony",
        "Shortens the poem",
        "Changes the form to a play",
      ],
      "B",
    ],
    [
      "The final lines of \"Ozymandias\" describe sand stretching \"lone and level\" far away. What formal effect do the long, flat lines create?",
      [
        "A feeling of speed",
        "A feeling of emptiness that mimics the desert",
        "A lighthearted rhythm",
        "A sense of crowding",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Analyze how the volta in Wordsworth's \"The world is too much with us\" shifts the speaker's tone and what the shift reveals about the poem's argument. Refer to specific lines or phrases from the octave and the sestet.",
      scheme: [
        "Identifies the volta and the sonnet structure (octave and sestet)",
        "Describes the tone and content of the octave with specific language",
        "Describes the tone and content of the sestet with specific language",
        "Explains what the shift reveals about the poem's argument",
      ],
      model:
        "The volta at line 9 divides the octave from the sestet. In the octave, the speaker's tone is weary and accusing, as shown in 'Getting and spending, we lay waste our powers' and 'a sordid boon,' which present people as having traded their hearts for gain. In the sestet he turns to a startling wish to be 'a Pagan suckled in a creed outworn,' and the tone becomes longing and defiant. The shift shows that the poem's argument is about the loss of wonder, which the speaker would rather recover through an outdated belief than live without.",
      answers: [
        [
          "full",
          "[[0|The poem is a sonnet with an octave that states the problem and a sestet that responds, and the volta comes at line 9.]] [[1|In the octave the tone is tired and accusing, with phrases like getting and spending we lay waste our powers and a sordid boon showing disgust at a world of work and money.]] [[2|In the sestet the speaker suddenly says he would rather be a pagan suckled in a creed outworn, so the tone becomes longing and almost rebellious.]] [[3|This reveals the poem's argument that a life with no wonder is worse than an outdated belief that sees divinity in nature.]]",
          "Full marks. You tied the structure, the tone shift and the argument together.",
        ],
        [
          "full",
          "[[0|The sonnet's turn at line 9 separates the octave from the sestet.]] [[1|Before it, the speaker complains about people wasting their powers in getting and spending and having given their hearts away.]] [[2|After it, he surprises us by wishing for a pagan's belief, and he imagines glimpses of Proteus rising from the sea, so the tone is imaginative and desperate.]] [[3|The shift shows he is arguing that modern people lost something precious, and he is willing to choose an old faith over a modern emptiness.]]",
          "All four marks. Mentioning Proteus gives specific evidence for the sestet's imaginative tone.",
        ],
        [
          "partial",
          "[[0|There is a volta at line 9 between the octave and sestet.]] [[1|The first part complains about getting and spending.]] The second part is about paganism.",
          "Good structure and octave. Describe the tone of the sestet and explain what the shift reveals.",
        ],
        [
          "partial",
          "[[2|The sestet wishes to be a pagan, so the tone becomes longing.]] [[3|This shows the poem is about losing wonder.]]",
          "Strong on the sestet and meaning. Identify the volta and describe the octave.",
          true,
        ],
        [
          "weak",
          "The poem has fourteen lines and rhymes. There is no shift in tone because it is all one complaint.",
          "The poem's tone changes at the volta. Compare line 1's tone with the wish at line 9.",
        ],
        [
          "weak",
          "[[1|The octave says getting and spending.]] The volta is at the end of the poem and means the poem is over.",
          "The volta comes at line 9, not the end. Look at where the speaker turns from complaint to wish.",
        ],
      ],
    },
    {
      prompt:
        "Analyze how Shelley's \"Ozymandias\" shifts from an impression of grandeur to irony, using at least two specific details of diction, syntax or form, and explain what the shift reveals about power.",
      scheme: [
        "Identifies the early tone of grandeur or the king's pride with a detail",
        "Identifies the late tone of irony or ruin with a detail",
        "Analyzes a specific diction, syntactic or formal choice that enacts the shift",
        "Explains what the shift reveals about power or time",
      ],
      model:
        "The poem begins with a picture of imperial pride: the face with its 'sneer of cold command' and the inscription 'Look on my Works, ye Mighty, and despair!' It ends with irony: 'Nothing beside remains.' The final lines of the poem use long, flat syntax and the words 'lone and level' to mimic the emptiness, so form enacts the ruin. The frame of a traveler's report adds distance. The shift reveals that power is temporary, and that the artist's record outlasts the king's boast only as a record of his failure.",
      answers: [
        [
          "full",
          "[[0|The poem starts by describing the king's pride, with the sneer of cold command and the inscription telling the mighty to look on his works and despair.]] [[1|It ends with irony, because nothing beside remains and the sand stretches away.]] [[2|The last lines are long and flat, with the words lone and level, so the rhythm itself feels empty like the desert.]] [[3|This reveals that power is temporary and the king's boast has become an accidental joke about the end of all empires.]]",
          "Full marks. You noticed that the final lines enact the emptiness they describe.",
        ],
        [
          "full",
          "[[0|At first the details make the king seem grand, like the wrinkled lip and the commanding sneer and the inscription calling himself king of kings.]] [[1|The tone changes at the end to ironic, because the pedestal says to despair at his works and nothing is left.]] [[2|Shelley uses a frame, a traveler telling the story, so the king is far away in time, and this makes the irony stronger as it was all told secondhand.]] [[3|The shift shows that even the greatest rulers are forgotten, and that only the artist's skill in capturing his arrogance remains.]]",
          "All four marks. Connecting the sculptor to what survives is a subtle point about art and power.",
        ],
        [
          "partial",
          "[[0|The king seems proud at the start.]] [[1|At the end there is nothing left.]] The poem is ironic.",
          "Good start and end. Analyze a specific choice of diction, syntax or form and explain what the shift reveals.",
        ],
        [
          "partial",
          "[[2|The long flat last lines with lone and level feel empty.]] [[3|This shows power doesn't last.]]",
          "Strong form analysis and meaning. Add the early tone of grandeur and the late tone of irony.",
          true,
        ],
        [
          "weak",
          "Ozymandias is a poem about a cool statue. The tone is happy because the statue is big and the king is great.",
          "The statue is broken, and the ending undercuts the king's boast. Reread the last four lines.",
        ],
        [
          "weak",
          "[[0|The king is proud.]] The shift is that he becomes humble at the end and apologizes.",
          "The king does not speak at the end; the poem's irony comes from what remains. Look at the final lines.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Comparing two poems, and tracing a theme through a play: Blake and A Doll's House",
  note: `
## Objectives

Students will be able to:

1. compare how two poems treat a similar subject;
2. trace how a theme develops across a novel or a play from beginning to end.

## Materials

William Blake's "The Lamb" and "The Tyger," Henrik Ibsen's A Doll's House (translated, read through Act 3), a comparison matrix, and a theme-tracking chart.

## Starter (8 minutes)

Ask: "If you had to explain what a creator might feel about a gentle creature and a fierce creature, what would you say?" Introduce the idea that Blake wrote two poems as a pair, a Song of Innocence and a Song of Experience.

## Main activity

1. Read both poems. Chart the speaker, form, sound and questions. "The Lamb" asks a child's question and answers it; "The Tyger" asks a series of questions with no answer. Compare rhyme, rhythm, repetition and tone.
2. Comparative analysis. In pairs, write a sentence that begins: "Whereas 'The Lamb' ..., 'The Tyger' ..." and complete it with a point about the poems' views of creation.
3. Turn to the play. Students trace the theme of "playing a role" through A Doll's House: Nora as "little lark" in Act 1, the tarantella in Act 2, and the ending in Act 3, when she says she must find out who she is. Mark the changes in her language.
4. Draft a thesis that makes a claim about how Ibsen develops the theme from beginning to end.

## Checking for understanding

Students write one comparison sentence about the poems and one development sentence about the play.

## Exit ticket

Write one line from the play that shows the theme at an early stage and one from a late stage.
`,
  reading: [
    "Two creations, two questions, and a doll who walks out",
    `
William Blake published Songs of Innocence in 1789 and Songs of Experience in 1794, then combined them under the subtitle "Showing the Two Contrary States of the Human Soul." "The Lamb" belongs to Innocence, and "The Tyger" to Experience. They are paired, and a strong reader treats them as a conversation.

"The Lamb" is simple in form. The speaker is a child who asks the lamb, "Little Lamb, who made thee?" and then answers it in the second stanza: the creator is the one who "calls himself a Lamb," the child, and the creator. The rhyme is gentle and nearly nursery-like, and the repeated blessing "Little Lamb God bless thee" closes the poem. The tone is trusting, and the creator is a loving presence.

"The Tyger" asks the same question with a different effect. The poem opens, "Tyger Tyger, burning bright / In the forests of the night," and the question that follows is "What immortal hand or eye / Could frame thy fearful symmetry?" The poem is a series of questions with no answers. The rhythm is hammered, with a heavy beat that sounds like a forge, and the images of "furnace," "anvil" and "chain" suggest a violent making. The key question is whether the same maker could create both: "Did he smile his work to see? / Did he who made the Lamb make thee?" The poem leaves the question open. Where "The Lamb" answers, "The Tyger" wonders. A comparison might argue that Blake treats creation as having two faces, gentleness and terror, and that the pairing resists a simple view of the creator.

The same skill, tracing a theme across a long work, applies to a play. In Henrik Ibsen's A Doll's House (1879), the theme of playing a role begins in Act 1. Torvald calls Nora his "little lark" and "squirrel," pet names that keep her as a decorative child. She accepts them, and she performs obedience, hiding her secret loan and the macaroons she is not allowed to eat. In Act 2 the theme intensifies in the tarantella she dances for the costume party, a frantic performance that she hopes will distract Torvald from the letter in the mailbox. In Act 3, after Torvald's reaction to the discovery of her forgery, she sees that for eight years she has been a doll in her husband's house, as she was a doll to her father. The theme resolves in her decision to leave and to educate herself. The development is from role to rebellion, and each act changes the meaning of the words "play" and "perform."
`,
  ],
  cards: [
    ["Songs of Innocence and of Experience", "Blake's paired collections that show contrary views of the human soul."],
    ["Comparison (poems)", "Analysis of how two poems treat a similar subject through similar or different choices."],
    ["Rhetorical question", "A question asked for effect, with no expected answer."],
    ["Trochaic rhythm", "A rhythm with stressed-unstressed patterns, as in 'Tyger Tyger, burning bright'."],
    ["Theme development", "How a theme is introduced, complicated and resolved across a long work."],
    ["Pet name", "An affectionate name that can also reveal how a person is regarded."],
    ["Tarantella", "A frantic Italian dance that Nora performs, as a symbol of her desperate performance."],
    ["Contrary states", "Blake's idea that opposites such as innocence and experience exist together."],
  ],
  closed: [
    [
      "Which statement best captures the difference between 'The Lamb' and 'The Tyger'?",
      [
        "Both ask unanswerable questions.",
        "The first answers its question with trust, and the second leaves its questions open and unsettling.",
        "The first is about a tiger and the second a lamb.",
        "Neither mentions a creator.",
      ],
      "B",
    ],
    [
      "The images of 'furnace,' 'anvil' and 'chain' in 'The Tyger' suggest that creation is",
      [
        "gentle and domestic",
        "a violent, forceful act of labor",
        "an accident",
        "quiet and slow",
      ],
      "B",
    ],
    [
      "In A Doll's House, Torvald's pet names for Nora (lark, squirrel) show that",
      [
        "he respects her as an equal",
        "he treats her like a decorative child",
        "he fears her",
        "he does not know her",
      ],
      "B",
    ],
    [
      "The tarantella in Act 2 can be read as",
      [
        "a celebration of independence",
        "a frantic performance meant to distract Torvald and delay discovery of her secret",
        "a funeral dance",
        "a lesson for her children",
      ],
      "B",
    ],
    [
      "How does the theme of playing a role develop across the play?",
      [
        "It disappears after Act 1.",
        "It moves from Nora's performed obedience to her recognition and rejection of the role",
        "It stays the same.",
        "It moves from freedom to obedience.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare how Blake's \"The Lamb\" and \"The Tyger\" treat the idea of a creator. In a paragraph, make a claim, and support it with two or more specific points of comparison (for example, speaker, question, rhythm, imagery).",
      scheme: [
        "Makes a defensible comparative claim about their views of creation",
        "Compares the speakers or the questions with specific evidence",
        "Compares the sound, rhythm or imagery with specific evidence",
        "Explains what the contrast, taken together, suggests about creation or the soul",
      ],
      model:
        "Blake uses the paired poems to suggest that creation has two faces, trust and terror. 'The Lamb' has a child speaker who asks 'who made thee?' and answers it with confidence, while 'The Tyger' asks a series of unanswered questions about 'what immortal hand or eye.' The rhythm of 'The Lamb' is gentle and nursery-like, but 'The Tyger' hammers like a forge, and its images of furnace and anvil suggest violent making. Together they imply that a creator who made the lamb also made the tiger, and that no single view of the world can hold both.",
      answers: [
        [
          "full",
          "[[0|Blake uses the two poems to show that creation has two faces, gentleness and terror, and that you cannot understand the creator with only one of them.]] [[1|In The Lamb a child asks who made thee and answers right away, but The Tyger asks question after question without an answer, like what immortal hand or eye could frame it.]] [[2|The Lamb has a soft sing-song rhythm and the Tyger pounds like a hammer, and its furnace and anvil images make creation sound violent.]] [[3|Together they suggest that the same maker is behind both and that Innocence and Experience are two parts of one world.]]",
          "Full marks. Your paragraph compares speaker, question and sound, and then states what the comparison means.",
        ],
        [
          "full",
          "[[0|The poems treat the creator differently: one trusts him and the other fears and wonders about him.]] [[1|The Lamb's speaker is a child who thinks the creator is a gentle father, but the Tyger's speaker is awed and unsure, asking whether the maker smiled to see his work.]] [[2|The Lamb repeats its blessing and has simple rhymes, while the Tyger has a driving beat and images of fire and chains.]] [[3|By pairing them, Blake suggests that a view of God as only loving is incomplete, because the world also has terrifying things.]]",
          "All four marks. The question about whether the maker smiled is a good piece of evidence.",
        ],
        [
          "partial",
          "[[0|Blake shows two sides of creation.]] [[1|The Lamb answers a question and the Tyger just asks questions.]] They are different.",
          "Claim and one comparison are accurate. Add a comparison of sound or imagery and explain what the contrast suggests.",
        ],
        [
          "partial",
          "[[2|The Tyger has a hammered rhythm and violent images.]] [[3|This shows that creation can be frightening.]]",
          "Strong on sound and imagery and meaning. Add a claim and compare the speakers' questions with The Lamb.",
          true,
        ],
        [
          "weak",
          "Blake wrote two poems about animals. They are the same, since both are about animals and both are by Blake.",
          "They are about animals, but their views of creation differ. Compare the questions and the tone.",
        ],
        [
          "weak",
          "[[1|The Lamb answers who made thee.]] The Tyger is the happy poem and the Lamb is the scary one.",
          "It is the reverse: The Lamb is gentle and The Tyger is fearsome. Reread the imagery.",
        ],
      ],
    },
    {
      prompt:
        "Trace the theme of performing a role in A Doll's House from Act 1 to Act 3. Cite a moment from the beginning, a moment from the middle, and a moment from the end, and explain how the theme develops.",
      scheme: [
        "Identifies an early moment that shows Nora performing a role",
        "Identifies a middle moment that intensifies the theme",
        "Identifies a late moment that resolves or reverses the theme",
        "Explains how the theme develops from beginning to end",
      ],
      model:
        "In Act 1, Torvald calls Nora his lark and squirrel, and she plays the child, hiding her loan and the forbidden macaroons. In Act 2, she dances the tarantella frantically to distract Torvald from the letter, which shows the role becoming a strain. In Act 3, after his harsh reaction, she says she has been treated as a doll, first by her father and then by him, and decides to leave. The theme develops from a comfortable performance, to a desperate one, to a refusal that makes her an independent person.",
      answers: [
        [
          "full",
          "[[0|In Act 1 Torvald calls Nora his little lark and squirrel and she acts like a child, hiding the macaroons.]] [[1|In Act 2 she dances the tarantella wildly to keep him from reading the letter, so the role has become frantic.]] [[2|In Act 3 she tells him she was a doll to her father and then to him, and she leaves to learn who she is.]] [[3|The theme goes from a comfortable act, to a desperate one, to a refusal, which turns playing a role into becoming an individual.]]",
          "Full marks. You traced three stages and named the change in each one.",
        ],
        [
          "full",
          "[[0|At the beginning, the pet names and her secret eating of macaroons show that Nora plays the part of a child for Torvald.]] [[1|In the middle, the tarantella is a performance in a literal sense, and she dances like her life depends on it.]] [[2|At the end, she takes off her costume and sits down to talk, and says they have never had a real conversation, then she leaves.]] [[3|The development is from pretending to being forced to perform, to finally giving up the act and seeking her own self.]]",
          "All four marks. Mentioning her taking off the costume ties the stage action to the theme.",
        ],
        [
          "partial",
          "[[0|Torvald calls her his lark.]] [[1|She dances the tarantella.]] Then she leaves him.",
          "You have early and middle moments. Explain the late moment and how the theme develops.",
        ],
        [
          "partial",
          "[[2|At the end she says she has been a doll to her father and her husband.]] [[3|The theme goes from acting to rejecting the role.]]",
          "Good late moment and development. Add specific early and middle moments.",
          true,
        ],
        [
          "weak",
          "The theme is that Nora likes being a doll and stays in the house at the end. It never changes.",
          "Nora leaves at the end. Reread the last scene to see how the theme changes.",
        ],
        [
          "weak",
          "[[0|Nora is called a lark and a squirrel.]] The tarantella is just a dance and it has nothing to do with the theme.",
          "The tarantella is a performance that links to the theme of role-playing. Think about why she dances so wildly.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Structure, motif and relationship in Hamlet",
  note: `
## Objectives

Students will be able to:

1. analyze how the structure of a longer work, such as its sequence and its subplots, shapes its meaning;
2. explain how a symbol or motif recurs and deepens across a long work;
3. analyze the relationship between two characters and what it shows about the work's central conflict.

## Materials

Copies of Hamlet, a structure diagram (acts, subplots of Laertes, Fortinbras and Ophelia), a motif tracker (disease and rot, acting and seeming, ears and hearing), and a relationship map.

## Starter (8 minutes)

Display the line "Something is rotten in the state of Denmark." Ask: "Where does that image of rot and sickness appear again? What would be lost if it appeared only once?"

## Main activity

1. Structure. Draw the arc of the play: the Ghost's revelation (Act 1), Hamlet's feigned madness and delay (Acts 2 and 3), the play within the play and the prayer scene (Act 3), exile and return (Acts 4 and 5), and the duel. Mark where each subplot mirrors Hamlet: Laertes acts quickly to avenge his father; Fortinbras marches an army for little gain.
2. Motif tracking. Groups follow disease and rot across Acts 1, 3, 4 and 5. Note a line, the speaker and the meaning in each.
3. Relationship analysis. Examine Hamlet and Gertrude in the closet scene (Act 3, Scene 4). What does the confrontation show about the play's central conflict, between action and moral certainty?
4. Draft a thesis on how the foils of Laertes and Fortinbras deepen the reader's understanding of Hamlet's delay.

## Checking for understanding

Cards: name the motif, a line and a meaning, and defend the choice in one sentence.

## Exit ticket

How does a subplot of your choice change your view of Hamlet's delay?
`,
  reading: [
    "A play of delay, rot and mirrors",
    `
Hamlet is long, and the length is part of the effect. A play in which a prince learns that his uncle murdered his father, and then waits, is a play about delay. Shakespeare builds the structure so that the delay is not simply a flaw of character but a condition the audience feels. The Ghost tells Hamlet to avenge him in Act 1, yet the revenge does not happen until Act 5. The structure fills the gap with doubt, performance, a trap and a missed opportunity.

The structure can be mapped. Act 1 establishes the crime and the command. Act 2 shows Hamlet putting on an "antic disposition" and the court trying to read him. Act 3 holds the center: the play within the play, in which Hamlet stages a version of the murder to watch Claudius's reaction, and the scene in which he finds Claudius at prayer and does not strike. In the closet scene, Hamlet confronts his mother and kills Polonius by mistake. The consequences cascade through Acts 4 and 5: exile, Ophelia's madness and death, the graveyard, the duel. The long middle gives the revenge plot both momentum and drag.

Subplots serve as mirrors. Laertes, whose father is also killed, returns from France in a fury and acts at once, willing to cut Hamlet's throat in a church. Fortinbras, the Norwegian prince, leads an army to fight for a patch of ground "not tomb enough" to bury the dead, and Hamlet reflects that such action is both foolish and admirable. Both contrast with Hamlet's thought. They allow the audience to measure his hesitation: Is he a thinker who sees consequences or a man who cannot act?

Motifs add depth. The image of **disease and rot** begins with Marcellus's remark that "something is rotten" and recurs in Hamlet's description of the world as "an unweeded garden," in Claudius's "offence is rank," and in the gravedigger scene, where Hamlet considers what becomes of a body. A second motif is **acting and seeming**: Hamlet's feigned madness, the player who weeps for Hecuba, and the performance of the play within the play. Each time the motif returns, it asks whether anyone in Denmark is what they seem.

The relationship between Hamlet and Gertrude exposes the central conflict most directly. In the closet scene he holds up two portraits and demands that she see the difference between his father and Claudius. She admits that he has turned her eyes "into my very soul." For a moment the play's concerns converge: truth, guilt, rot and the cost of acting on knowledge.
`,
  ],
  cards: [
    ["Subplot", "A secondary storyline that parallels or contrasts with the main plot."],
    ["Foil", "A character who contrasts with another to highlight qualities, such as Laertes and Fortinbras to Hamlet."],
    ["Play within a play", "A performance staged inside the main play, used to reveal truth or advance plot."],
    ["Antic disposition", "Hamlet's feigned madness."],
    ["Motif", "A recurring image or idea that gains meaning through repetition."],
    ["Soliloquy", "A speech in which a character speaks thoughts aloud, alone on stage."],
    ["Closet scene", "The confrontation between Hamlet and Gertrude in Act 3, Scene 4."],
    ["Delay", "Hamlet's postponement of revenge, a central feature of the play's structure."],
  ],
  closed: [
    [
      "How does Laertes function as a foil for Hamlet?",
      [
        "He also delays revenge.",
        "He acts immediately and passionately to avenge his father, in contrast to Hamlet's delay.",
        "He forgives Claudius.",
        "He refuses to fight.",
      ],
      "B",
    ],
    [
      "The image of the 'unweeded garden' belongs to which motif?",
      ["Disease and rot", "Light and dark", "Water", "Music"],
      "A",
    ],
    [
      "What is the main function of the play within the play?",
      [
        "To entertain Gertrude",
        "To test Claudius's guilt by staging a version of the murder and watching his reaction",
        "To end the revenge plot",
        "To introduce Fortinbras",
      ],
      "B",
    ],
    [
      "Hamlet finds Claudius at prayer and does not strike. This moment most deepens which theme?",
      [
        "The beauty of music",
        "Moral uncertainty and delay in action",
        "The importance of travel",
        "The cost of education",
      ],
      "B",
    ],
    [
      "In the closet scene, the portraits of the two kings are used to",
      [
        "show Hamlet's wealth",
        "force Gertrude to see the difference between her two husbands and face her guilt",
        "decorate the room",
        "introduce a ghost",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Analyze how one subplot (Laertes's revenge or Fortinbras's march) shapes the audience's understanding of Hamlet's delay. Make a claim, support it with specific evidence from the subplot and from Hamlet, and explain the effect.",
      scheme: [
        "Makes a defensible claim about how the subplot shapes understanding of Hamlet's delay",
        "Describes specific evidence from the subplot",
        "Describes specific evidence from Hamlet's delay or reflection that connects to it",
        "Explains the effect on the audience's judgment of Hamlet",
      ],
      model:
        "Laertes's revenge plot serves as a foil that makes Hamlet's delay a question of thought versus action. When Laertes learns his father is dead, he storms back from France and says he will cut Hamlet's throat in a church, acting without scruple. Hamlet, by contrast, stages a play to test the ghost, and finds Claudius at prayer and does not strike. The contrast makes the audience weigh whether Hamlet's hesitation is wisdom or paralysis, and complicates any simple judgment of him.",
      answers: [
        [
          "full",
          "[[0|The subplot of Laertes makes the audience judge Hamlet's delay by comparing him to a man who acts instantly.]] [[1|When Laertes hears his father is dead he rushes back and says he would cut Hamlet's throat in a church, and he doesn't care about consequences.]] [[2|Hamlet on the other hand tests the Ghost with a play, and when he sees Claudius praying he decides not to strike.]] [[3|The contrast makes us ask if Hamlet is wise to be careful or paralyzed by thought, and it shows that both choices are costly.]]",
          "Full marks. You presented the contrast as a question the play leaves open, which is more sophisticated than calling Hamlet weak.",
        ],
        [
          "full",
          "[[0|Fortinbras's march shows Hamlet's delay by contrast, and it makes Hamlet question his own inaction.]] [[1|Fortinbras leads an army to fight for a patch of ground that is not even big enough to bury the dead, just for honor.]] [[2|Hamlet sees the army and says it shames him, since he has real cause and has done nothing.]] [[3|The effect is that the audience sees that action can be foolish while inaction can be a failure, and it complicates the idea that Hamlet is simply a coward.]]",
          "All four marks. Using Hamlet's own reaction to the army ties the foil back to his psychology.",
        ],
        [
          "partial",
          "[[0|Laertes contrasts with Hamlet.]] [[1|He acts right away to avenge his father.]] Hamlet is more thoughtful.",
          "Claim and subplot evidence are present. Cite a specific moment from Hamlet and explain the effect on the audience.",
        ],
        [
          "partial",
          "[[2|Hamlet doesn't kill Claudius when he is praying.]] [[3|This makes the audience wonder if Hamlet is careful or afraid.]]",
          "Strong evidence and effect. State the claim and describe the subplot that serves as the foil.",
          true,
        ],
        [
          "weak",
          "Laertes is a minor character so he does not matter for Hamlet's delay. The delay is because Hamlet is lazy.",
          "Laertes is a foil, which makes him important. Delay in the play is complex. Reread his return in Act 4.",
        ],
        [
          "weak",
          "[[1|Fortinbras leads an army.]] This shows that Hamlet is wrong and should have led an army too.",
          "The play does not simply endorse Fortinbras. Hamlet sees both the shame and the folly of his action.",
        ],
      ],
    },
    {
      prompt:
        "Trace the motif of disease or rot through Hamlet. Cite at least two moments from different parts of the play, and explain how the motif deepens in meaning.",
      scheme: [
        "Identifies the motif and a first moment with its meaning",
        "Identifies a second moment from a different part of the play",
        "Explains how the meaning deepens or changes",
        "Connects the motif to the central conflict or theme",
      ],
      model:
        "In Act 1, Marcellus says 'Something is rotten in the state of Denmark,' signaling political and moral corruption. In Act 5, in the graveyard, Hamlet holds Yorick's skull and considers how even great figures decay to dust, so the motif has moved from corruption in the state to the universal fact of death. The deepening shows that the rot is not only Claudius's crime but the condition of mortality itself. This ties to the play's conflict between acting against corruption and accepting what cannot be changed.",
      answers: [
        [
          "full",
          "[[0|The motif of rot starts in Act 1 when Marcellus says something is rotten in the state of Denmark, which signals political and moral corruption.]] [[1|It returns in Act 5 in the graveyard, where Hamlet holds Yorick's skull and thinks about how even Alexander turns to dust.]] [[2|The meaning deepens from corruption in a particular state to the universal fact that every body decays.]] [[3|This connects to the conflict because the question becomes whether it is worth fighting corruption when death makes everything dust, which helps explain Hamlet's late calm.]]",
          "Full marks. Your final sentence ties the motif to the changed Hamlet of Act 5.",
        ],
        [
          "full",
          "[[0|In Act 1 Hamlet calls the world an unweeded garden that grows to seed and is full of things rank and gross, so rot is a picture of corruption.]] [[1|Later, Claudius says his offense is rank and smells to heaven when he tries to pray.]] [[2|So rot moves from Hamlet's view of the world to Claudius's own conscience, and it becomes a sign of guilt as well as decay.]] [[3|This shows that the play's central problem is not just a murder but the way sin spreads through a whole society, which makes revenge more complicated.]]",
          "All four marks. Following the motif from Hamlet's view to Claudius's guilt shows it deepening.",
        ],
        [
          "partial",
          "[[0|Marcellus says something is rotten in Denmark.]] [[1|Hamlet holds a skull in the graveyard.]] Those are about death.",
          "Two moments, one in each part, are accurate. Explain how the motif deepens and connects to the conflict.",
        ],
        [
          "partial",
          "[[2|The motif goes from corruption to the fact that everyone dies.]] [[3|That affects how Hamlet acts at the end.]]",
          "Good development and connection. Cite two specific moments from different parts of the play.",
          true,
        ],
        [
          "weak",
          "The rot motif is about food and the kitchen because rotten means spoiled food. It shows up at the feast.",
          "The motif is a metaphor for moral and political corruption and death. Look at Marcellus's line and the graveyard.",
        ],
        [
          "weak",
          "[[0|Marcellus says something is rotten.]] After that, the motif never comes back and so it is not important.",
          "A motif recurs. Look for it in Hamlet's speeches, Claudius's prayer and the graveyard.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Writing a literary argument; using quotation and paraphrase accurately",
  note: `
## Objectives

Students will be able to:

1. write a literary argument that defends an interpretation with evidence and commentary;
2. use quotations and paraphrase accurately and explain how each supports the claim.

## Materials

A sample body paragraph from an essay on A Doll's House, with labeled parts, the AP Literature scoring guide (thesis, evidence and commentary, sophistication), and a quotation-integration worksheet.

## Starter (8 minutes)

Show three versions of a sentence quoting Nora: dropped in without context; introduced awkwardly; embedded smoothly. Ask which one best serves the writer's claim and why.

## Main activity

1. Parts of a literary argument. A defensible thesis; topic sentences that advance it; evidence that is specific; commentary that explains how the evidence supports the thesis and complicates it; a conclusion that extends meaning.
2. Quotation and paraphrase. Practice cutting a quotation to the essential words, integrating it grammatically, and using a paraphrase when the exact words are not the point. Check accuracy: does the paraphrase change meaning?
3. Sentence-level commentary. Compare a weak commentary ("This shows that Nora is trapped") with a strong one that names the effect of a specific word choice.
4. Quiz at the end of the lesson on quotation integration, accuracy and commentary.

## Checking for understanding

Underline the claim, evidence and commentary in one body paragraph, and circle a word that could be cut.

## Exit ticket

One embedded quotation and one sentence of commentary.
`,
  reading: [
    "From claim to commentary: how a literary argument works",
    `
A literary argument defends an interpretation of a text with evidence and explains how the evidence supports it. On the AP Literature exam, the scoring guide rewards three things. One point goes to a **defensible thesis**. Up to four points go to **evidence and commentary**: specific textual evidence, and explanation of how it supports the line of reasoning. One point goes to **sophistication**, which is shown in the way a response handles complexity, tension or contradiction in the text, or in the fluency of its prose. The essay is not graded on whether the reader shares the interpretation. It is graded on the quality of the argument.

The core unit is the body paragraph. A strong paragraph begins with a topic sentence that advances the thesis, not just names a topic. It then presents evidence, either a **quotation** or a **paraphrase**. A quotation preserves the exact words and should be used when the language itself matters: a word with a particular connotation, a striking image, a pattern of sound. It should be as short as possible and woven into the writer's sentence: When Torvald calls Nora his "little lark," the diminutive reveals how he sees her. A paraphrase restates the idea in the writer's words and is useful when the content, not the diction, is the point: In Act 3, Nora tells Torvald that she has been treated as a doll first by her father and then by him. Both must be accurate. A paraphrase that changes meaning or a quotation that has been altered is not evidence for the claim.

**Commentary** is the engine of the essay. It explains the connection between evidence and claim, and it should say something that the evidence does not say for itself. Weak commentary repeats or summarizes: "This shows that Nora is trapped." Strong commentary analyzes language, structure or effect: "The diminutive 'little' and the animal imagery turn Nora into a pet, which suggests that Torvald's affection depends on her playing a role. The detail anticipates her later refusal to continue the performance." Commentary often names a literary device, but naming is not enough; it must explain what the device does.

Finally, the best essays acknowledge complexity. A response that argues Torvald is simply a villain misses that the play shows him as a man formed by his society. A thesis that recognizes this tension gives the writer more to say, and it often earns the sophistication point.
`,
  ],
  cards: [
    ["Thesis", "A defensible claim that responds to the prompt and can be supported by the text."],
    ["Topic sentence", "A sentence that advances the thesis and controls a paragraph."],
    ["Quotation", "The exact words of the text, in quotation marks, woven into the writer's sentence."],
    ["Paraphrase", "A restatement of the text's idea in the writer's own words."],
    ["Commentary", "The writer's explanation of how the evidence supports the claim."],
    ["Sophistication", "Handling complexity or tension in the text, or writing with notable control."],
    ["Diminutive", "A word form that suggests smallness, such as 'little lark'."],
    ["Integration", "Weaving a quotation into the grammar of the writer's own sentence."],
  ],
  closed: [
    [
      "Which sentence integrates a quotation best?",
      [
        "Torvald says \"little lark.\" This shows he is controlling.",
        "When Torvald calls Nora his \"little lark,\" the diminutive reveals how he sees her.",
        "\"Little lark\" is a quote.",
        "Quote: Torvald, little lark.",
      ],
      "B",
    ],
    [
      "Which is the strongest commentary?",
      [
        "This shows that Nora is trapped.",
        "The diminutive 'little' and animal imagery turn Nora into a pet, suggesting that his affection depends on her playing a role.",
        "This is an important quote.",
        "Nora is Torvald's wife.",
      ],
      "B",
    ],
    [
      "When is a paraphrase a better choice than a quotation?",
      [
        "When the exact wording is not the point and the content is what matters",
        "When you want to avoid analysis",
        "When the quotation is too short",
        "Never",
      ],
      "A",
    ],
    [
      "A paraphrase changes the meaning of the original. What is the problem?",
      [
        "It is too short.",
        "It is no longer accurate evidence for the claim.",
        "It uses quotation marks.",
        "It is too formal.",
      ],
      "B",
    ],
    [
      "Which topic sentence best advances a thesis about Torvald?",
      [
        "Torvald is a character in the play.",
        "Ibsen presents Torvald not as a simple tyrant but as a man shaped by his society, whose tenderness is inseparable from control.",
        "This paragraph is about Torvald.",
        "Torvald says many things.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a body paragraph (six to eight sentences) from an essay arguing that Ibsen shows Torvald to be shaped by his society and not a simple villain. Include a topic sentence, one embedded quotation, one accurate paraphrase, and commentary that explains how each supports the claim.",
      scheme: [
        "Writes a topic sentence that advances the claim",
        "Embeds an accurate quotation grammatically",
        "Includes an accurate paraphrase",
        "Provides commentary that explains how the evidence supports the claim",
      ],
      model:
        "Ibsen presents Torvald as a man formed by his society, whose control is inseparable from sincere affection. When he calls Nora his 'little lark,' the diminutive expresses real tenderness while also reducing her to a pet. In Act 3, after learning of her forgery, he tells her that he has no regard for a woman who would risk her reputation, a view that reflects the standards he has inherited about honor. The tenderness and the control come from the same source, which suggests that Torvald, like Nora, is playing the role his world assigns him.",
      answers: [
        [
          "full",
          "[[0|Ibsen presents Torvald as a man shaped by his society, whose control cannot be separated from sincere affection.]] [[1|When he calls Nora his \"little lark,\" the pet name expresses real fondness while also making her small.]] [[2|In Act 3, after he learns of the forgery, he reacts by worrying about his own reputation and treating her as a danger to his name.]] [[3|The fondness and the control come from the same source, which suggests that Torvald, like Nora, is playing a role assigned by his world, and that makes him a product of that world, not a lone villain.]]",
          "Full marks. Your commentary names how the two pieces of evidence connect to the claim.",
        ],
        [
          "full",
          "[[0|Torvald is best understood as a product of his society and not as a villain acting alone.]] [[1|He says he cannot bear for Nora to be anything but his \"squirrel,\" and the word shows that he can only love her as long as she is small.]] [[2|Later, when he discovers the loan, he talks about the standing of a man in society and how a scandal would ruin him.]] [[3|The pairing suggests that his affection and his cruelty are both shaped by a society that makes a man's honor depend on the obedience of his wife, which is why he seems pitiable as well as unkind.]]",
          "All four marks. The word \"pitiable\" shows you are handling the tension in the character.",
        ],
        [
          "partial",
          "[[0|Torvald is a man shaped by his society.]] [[1|He calls Nora his \"little lark.\"]] That shows he is controlling.",
          "Your topic sentence and quotation are good. Add a paraphrase and fuller commentary that explains the quotation.",
        ],
        [
          "partial",
          "[[2|After he learns about the loan, he worries about his reputation.]] [[3|That shows that his values come from society.]]",
          "Good paraphrase and commentary. Add a topic sentence and an embedded quotation.",
          true,
        ],
        [
          "weak",
          "Torvald is a villain. He is mean to Nora and says mean things to her and that is why he is bad.",
          "The play presents Torvald as more complex. Use specific evidence and explain how it supports your claim.",
        ],
        [
          "weak",
          "[[1|He calls her his \"little lark.\"]] The quote speaks for itself so I do not need to explain it.",
          "A quotation needs commentary. Explain what the word choice shows and how it supports your claim.",
        ],
      ],
    },
    {
      prompt:
        "A student writes: \"Nora is a doll. In Act 3 she says, 'I have been your doll-wife.' This shows she is a doll.\" Evaluate the paragraph's use of evidence and commentary, identify two weaknesses, and rewrite the evidence and commentary to meet the standard for the highest scores.",
      scheme: [
        "Identifies the weakness in the claim or topic sentence (too general)",
        "Identifies the weakness in commentary (circular and repeats the evidence)",
        "Rewrites the evidence with accurate, integrated quotation or paraphrase",
        "Rewrites the commentary so that it analyzes how the evidence supports a developed claim",
      ],
      model:
        "The paragraph's claim, 'Nora is a doll,' is too general to be a defensible interpretation, and the commentary repeats the quotation instead of analyzing it. A stronger version: Ibsen has Nora recognize that her marriage is a performance when she tells Torvald that she has been his 'doll-wife,' as she was her father's 'doll-child.' The repetition of the doll image across two relationships shows that her role has never been chosen, which explains why leaving is the only act that makes her an individual.",
      answers: [
        [
          "full",
          "[[0|The claim that Nora is a doll is too general, because it just names an image and does not say what it means.]] [[1|The commentary this shows she is a doll repeats the quote without analyzing it.]] [[2|A better version would be that Nora recognizes the marriage as a performance when she says she has been Torvald's doll-wife, just as she was her father's doll-child.]] [[3|Repeating the doll image across two relationships shows her role was never chosen, which explains why leaving is the only way for her to become an individual.]]",
          "Full marks. Your rewrite analyzes the repetition of the image, which is how commentary earns its score.",
        ],
        [
          "full",
          "[[0|The topic sentence is too broad and does not make an arguable interpretation.]] [[1|The commentary only repeats what the quotation says and so adds nothing.]] [[2|I would write: When Nora tells Torvald she has been his doll-wife, she links the marriage to her childhood with her father, who treated her as a doll-child.]] [[3|The link shows that she has moved from one controlled role to another without choosing either, which is why her decision to leave marks the first act of her own will.]]",
          "All four marks. The words \"without choosing either\" give the commentary a precise meaning.",
        ],
        [
          "partial",
          "[[0|The claim is too general.]] [[1|The commentary just repeats the quote.]]",
          "You diagnosed both weaknesses. Rewrite the evidence and commentary.",
        ],
        [
          "partial",
          "[[2|A better version: Nora tells Torvald she has been his doll-wife, just as she was her father's doll-child.]] [[3|The repeated image shows that her role was never chosen.]]",
          "Strong rewrite. Name the weaknesses in the original paragraph.",
          true,
        ],
        [
          "weak",
          "The paragraph is perfect because it uses a quote. A quote proves the claim and no more explanation is needed.",
          "A quotation does not prove a claim by itself; it needs analysis of how it supports the interpretation.",
        ],
        [
          "weak",
          "[[1|The commentary repeats the quote.]] To fix it, I would add more quotes about dolls and nothing else.",
          "More quotations without analysis would repeat the problem. Explain what the repetition of the doll image shows.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Revising a thesis, and timed essays on a poem and a prose passage",
  note: `
## Objectives

Students will be able to:

1. revise a thesis so it is specific, defensible and about the work's meaning;
2. write a timed essay on a poem and a timed essay on a prose passage.

## Materials

Gerard Manley Hopkins's "Spring and Fall: To a Young Child" and a short passage from James Joyce's "Eveline," thesis-revision cards, a 40-minute timer and the scoring guide.

## Starter (8 minutes)

Display five theses on "Spring and Fall" (from "Hopkins writes about autumn" to a fully developed claim) and ask students to rank them and revise the weakest. Review the standard: specific, defensible, about meaning.

## Main activity

1. Thesis revision workshop. Students revise two weak theses using the formula: [author] uses [specific choices] to [create an effect], revealing [meaning or complication].
2. Timed poem essay. Read "Spring and Fall," a poem in which a speaker addresses a child named Margaret who grieves over falling leaves. Students write a 40-minute essay on how Hopkins uses imagery, sound and the speaker's shift in address to convey a view of grief and mortality.
3. Timed prose essay. Read the passage from "Eveline," in which the speaker sits at a window and weighs leaving home. Students write a 40-minute essay on how Joyce uses narrative detail and syntax to reveal her conflict.
4. Self-score one essay against the guide, and plan a revision of the thesis.

## Checking for understanding

Peers underline each other's theses and check that they name choices and meaning.

## Exit ticket

Write the revised thesis you would use to improve your timed essay.
`,
  reading: [
    "Specific, defensible, about meaning: the thesis revised",
    `
Timed essays reward writers who decide quickly what they think. The thesis is the instrument of that decision. A weak thesis names a topic or lists devices: "Hopkins uses imagery, sound and tone." A strong one commits to a reading: "In 'Spring and Fall,' Hopkins uses the tender, sing-song address to a child to make the poem's lesson about mortality gentler and more devastating, since the speaker knows that the grief Margaret feels for the leaves is really grief for herself." The second can be argued with, and it prepares the writer to look for evidence in specific places.

A useful formula is to name the author, the choices, the effect and the meaning. The formula keeps the thesis from being too vague or too narrow. If a thesis is too vague, ask how. If it is too narrow, ask so what. A thesis that is merely true ("The poem is about death") should be pushed until someone could disagree.

For the poem, Hopkins's "Spring and Fall" (written in 1880) addresses a young girl, Margaret, who is grieving over the leaves falling in autumn. The speaker's voice is tender, with a rhythm that bounces and stumbles ("Márgarét, áre you gríeving / Over Goldengrove unleaving?"). The invented word "unleaving" turns leaves into a process. The speaker predicts that as she grows older she will not weep for such things, and then tells her that the grief is really for herself: "It is the blight man was born for, / It is Margaret you mourn for." The poem's shift is from gentle explanation to a startling statement, in the last two lines, that all grief is grief for mortality.

For the prose passage, James Joyce's "Eveline" begins with a young woman at a window watching the evening "invade the avenue," holding the smell of dusty curtains. She is weighing a promise to her dying mother to keep the home together, against an offer from a sailor, Frank, to take her to Buenos Aires. The narration moves close to her mind, with long sentences of reasons and memories, and the dust and the street sounds hold her to the place. At the end, at the dock, she grips an iron railing, and her face gives no sign of love, farewell or recognition. A strong essay on this passage might argue that the habit of inertia, built into the syntax, is stronger than her wish to leave.

After writing, a short review helps: mark the thesis, the evidence and the commentary, and ask whether each paragraph advances the claim.
`,
  ],
  cards: [
    ["Thesis formula", "Author + specific choices + effect + meaning or complication."],
    ["Too vague", "A thesis that could apply to many works; ask 'how?'"],
    ["Too narrow", "A thesis that states an obvious fact; ask 'so what?'"],
    ["Sprung rhythm", "Hopkins's rhythm based on stressed syllables, giving a bouncing, speech-like beat."],
    ["Coinage", "A newly invented word, such as 'unleaving'."],
    ["Inertia", "The tendency to stay as one is; the force that holds Eveline."],
    ["Timed essay", "An essay written under a strict time limit, requiring quick planning."],
    ["Self-scoring", "Applying a rubric to your own work to identify strengths and goals."],
  ],
  closed: [
    [
      "Which is the strongest thesis for \"Spring and Fall\"?",
      [
        "Hopkins writes about autumn.",
        "Hopkins uses imagery, sound and tone.",
        "By addressing a child tenderly and then revealing that her grief is really for herself, Hopkins makes the poem's lesson about mortality gentle and devastating.",
        "The poem has fifteen lines.",
      ],
      "C",
    ],
    [
      "A thesis that says \"The poem is about death\" is",
      [
        "too narrow and merely true",
        "perfect",
        "an evidence statement",
        "a quotation",
      ],
      "A",
    ],
    [
      "The coined word \"unleaving\" in Hopkins's poem most likely emphasizes",
      [
        "the leaves' color",
        "the process of the leaves falling as an ongoing action",
        "the weather",
        "a place name",
      ],
      "B",
    ],
    [
      "Joyce's description of Eveline gripping the iron railing at the dock and giving no sign of love, farewell or recognition suggests",
      [
        "she is excited to leave",
        "inertia holds her in place despite her wish to leave",
        "she has forgotten Frank",
        "she is angry at the ship",
      ],
      "B",
    ],
    [
      "During a timed essay, the best use of the first five minutes is to",
      [
        "begin writing immediately",
        "decide a thesis and the two or three pieces of evidence that will support it",
        "copy the prompt",
        "write the conclusion",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Revise this weak thesis about \"Spring and Fall\" into one that is specific, defensible and about meaning: \"Hopkins uses imagery and sound to talk about death.\" Then list the two pieces of evidence you would use, and the commentary you would write for each.",
      scheme: [
        "Writes a revised thesis that names choices, effect and meaning",
        "Identifies a first specific piece of evidence",
        "Describes commentary for the first piece",
        "Identifies and explains a second piece of evidence with commentary",
      ],
      model:
        "Revised thesis: By addressing a child in a tender, sing-song voice and then revealing that her grief over the falling leaves is really grief for her own mortality, Hopkins makes the poem's lesson about death both gentle and devastating. Evidence 1: the coined word 'unleaving,' commentary: it turns leaves into a process and makes loss ongoing. Evidence 2: the final couplet 'It is the blight man was born for, / It is Margaret you mourn for,' commentary: the turn from gentle explanation to blunt statement exposes that all grief is self-grief.",
      answers: [
        [
          "full",
          "[[0|By speaking tenderly to a child and then revealing that her grief over the leaves is really grief for herself, Hopkins makes the poem's lesson about death gentle and devastating at once.]] [[1|Evidence one is the word unleaving.]] [[2|Commentary: it is a made-up word that turns leaves into an ongoing action, so loss isn't an event but a process Margaret will always be part of.]] [[3|Evidence two is the last couplet, it is Margaret you mourn for, and the commentary is that the blunt shift from soft explanation to plain statement is what makes the lesson devastating.]]",
          "Full marks. Your thesis has the choices, effect and meaning, and each piece of evidence gets commentary.",
        ],
        [
          "full",
          "[[0|Hopkins uses a bouncing, child-like rhythm and a surprising last line to show that grief for anything small is secretly grief for our own deaths.]] [[1|My first evidence is the rhythm in Margaret, are you grieving, which sounds like a nursery rhyme.]] [[2|Commentary: the playful sound disguises the seriousness so that the child and the reader are caught off guard by the lesson.]] [[3|My second evidence is the line that says it is the blight man was born for, with commentary that it names mortality as the source of all sadness in plain words, a contrast to the soft sound.]]",
          "All four marks. You noticed that the playful sound disguises the lesson, which gives the thesis a real argument.",
        ],
        [
          "partial",
          "[[0|Hopkins uses a gentle tone to teach a child about death.]] [[1|Evidence: the word unleaving.]] I would explain it.",
          "Your thesis is stronger. Describe the commentary and add a second piece of evidence.",
        ],
        [
          "partial",
          "[[2|The coined word unleaving makes loss an ongoing process.]] [[3|The last couplet makes the lesson blunt and shows that all grief is for ourselves.]]",
          "Both commentaries are strong. Add a revised thesis that connects them.",
          true,
        ],
        [
          "weak",
          "Hopkins uses imagery and sound a lot to talk about death and I would use the first line and the last line as evidence.",
          "This restates the weak thesis. Say what the choices do and what they mean, and name specific evidence.",
        ],
        [
          "weak",
          "[[1|Evidence one is the title.]] The title is Spring and Fall and so the poem is about seasons. That is all.",
          "The title is a start, but the poem uses the seasons as a metaphor for a life. Push the interpretation further.",
        ],
      ],
    },
    {
      prompt:
        "Plan a 40-minute essay on this passage from Joyce's \"Eveline\": Eveline sits at a window watching evening invade the avenue, and at the dock she grips the iron railing, her eyes giving Frank no sign of love, farewell or recognition. Write a thesis, an outline of two body paragraphs with evidence, and a note on how you will show sophistication.",
      scheme: [
        "Writes a defensible thesis about how Joyce's choices reveal Eveline's conflict",
        "Outlines a first body paragraph with specific evidence from the passage",
        "Outlines a second body paragraph with specific evidence from the passage",
        "Describes a way to show sophistication, such as treating the tension between desire and inertia",
      ],
      model:
        "Thesis: Through the stillness of the window scene and the paralysis at the dock, Joyce shows that Eveline's inertia is stronger than her desire to escape, so that freedom is available to her but cannot be taken. Paragraph 1: the opening, where evening 'invades' the avenue and she sits unmoving among dust and memory, shows the habit of staying built into setting and syntax. Paragraph 2: the dock, where she grips the railing and gives no sign of love, farewell or recognition, shows her body refusing her wish. Sophistication: acknowledge that her loyalty to her promise is also a form of love, so staying is not only weakness.",
      answers: [
        [
          "full",
          "[[0|Through the stillness at the window and her frozen grip at the dock, Joyce suggests that Eveline's inertia is stronger than her desire to escape, so that freedom is available to her but she cannot take it.]] [[1|Paragraph one: at the beginning the evening invades the avenue and she sits among the dust and memories, which shows how the habit of staying is built into the setting.]] [[2|Paragraph two: at the dock she grips the iron railing and her eyes give Frank no sign of love, farewell or recognition, which shows her body refusing what her mind wants.]] [[3|For sophistication I will say that her promise to her dying mother is also a form of love, so staying is not only weakness.]]",
          "Full marks. The complication in the last line is the kind of tension that earns the sophistication point.",
        ],
        [
          "full",
          "[[0|Joyce uses long sentences of memory and reason that circle back on themselves to argue that Eveline is held in place by her past more than by any outside force.]] [[1|First paragraph: the dusty curtains and the cretonne in the window show a world she knows too well to leave, and her list of the home's small comforts and troubles keeps her in thought.]] [[2|Second paragraph: at the dock the iron railing and her passive, helpless face show the moment of choice becoming no choice at all.]] [[3|I will add complexity by noting that Frank's offer is uncertain too, since the reader never learns whether he is sincere, so her fear is not irrational.]]",
          "All four marks. Noting that Frank's sincerity is uncertain adds nuance to the reading.",
        ],
        [
          "partial",
          "[[0|Joyce shows that Eveline is trapped by her past.]] [[1|Paragraph one: the window scene.]] Paragraph two: the dock.",
          "Your thesis is a start and your outline names the scenes. Add specific details and a sophistication note.",
        ],
        [
          "partial",
          "[[2|The iron railing and her passive face at the dock show her body refusing.]] [[3|I will mention that her promise is also a form of love.]]",
          "Good evidence and sophistication. Add a thesis and a paragraph for the window scene.",
          true,
        ],
        [
          "weak",
          "Joyce uses a window and a dock. My thesis is that Eveline is in a story about a ship, and I will talk about both.",
          "A thesis must say what the choices reveal. Ask why Eveline cannot leave.",
        ],
        [
          "weak",
          "[[0|Joyce shows Eveline is afraid.]] I will use quotations from the whole story and I do not need to think about the structure.",
          "Your thesis is a start. Choose two specific places and explain how they show her conflict.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Leading a discussion with interpretive questions, and reflecting on growth as a reader and writer",
  note: `
## Objectives

Students will be able to:

1. lead a discussion of a text by asking questions that invite interpretation;
2. reflect on your growth as a reader and writer using feedback from a scoring rubric.

## Materials

A short text for discussion (a one-page prose poem written for the class, "The Last Light in the Gymnasium"), question-type cards (literal, interpretive, evaluative), the AP Literature scoring guide, and a growth-portfolio template.

## Starter (8 minutes)

Display three questions about Hamlet: "Who kills Polonius?" "Why might Hamlet spare Claudius at prayer?" "Is Hamlet's delay a failure or a form of wisdom?" Ask students to sort them into literal, interpretive and evaluative and say which will produce the best discussion.

## Main activity

1. Question design. Practice converting a literal question into an interpretive one and testing it: Can it be answered in more than one defensible way? Does it require evidence? Does it lead to a larger idea?
2. Discussion leaders. In groups of five, one student leads a ten-minute discussion of the prose poem. The leader prepares an opening interpretive question, two follow-ups that press for evidence, and a question that links to another text from the unit.
3. Debrief. The group records two points where the discussion changed its view and one question that remained open.
4. Reflection. Students gather three pieces of their own writing from the quarter and the feedback on each. Using the scoring guide, they identify where they improved, what pattern of weakness remains, and a goal for the next quarter.

## Checking for understanding

Leaders hand in their question plan, annotated with the question type.

## Exit ticket

Write one goal for your reading or writing in the next quarter, with the first step you will take.
`,
  reading: [
    "Questions that open a text, and a quarter's growth",
    `
A good discussion depends on good questions. A **literal** question has one answer in the text: "Who kills Polonius?" It is useful for checking understanding, but it ends quickly. An **interpretive** question has more than one defensible answer and requires evidence: "Why might Hamlet spare Claudius at prayer?" An **evaluative** question asks for a judgment: "Is Hamlet's delay a failure or a form of wisdom?" The best discussion leaders move through all three, but they invest most of their time in interpretation and evaluation.

To write an interpretive question, start from something puzzling in the text: a contradiction, a pattern, a gap, an unusual word. A question like "Why does Ibsen end Act 3 with the sound of a door closing?" invites students to weigh the sound, the staging and the meaning of the exit. Follow-up questions should press for evidence ("Where in the scene do you see that?") and for connection ("How does that compare to Nora's behavior in Act 1?"). A leader's job is not to give answers but to keep the conversation on the text, to notice when someone says something worth pursuing, and to invite quieter participants to speak. A strong leader also knows when to let a silence work.

Discussion also teaches the habit of listening. A member who changes a view because of someone else's evidence shows the reasoning the course values. Afterward, a brief summary of where the group agreed, where it split, and what it left open can become the seed of an essay.

The end of a quarter is also a time for reflection. The AP scoring guide offers a vocabulary for it: thesis, evidence and commentary, and sophistication. Gather three pieces of writing and the feedback you received. Which row of the guide has improved? Which keeps costing you points? A pattern is more useful than a single comment. A student who notices that the thesis is strong but the commentary repeats the evidence has a clear target: add a sentence after each quotation that explains how a word or image does its work. A reflection should name specific changes, give evidence from the writing, and set one goal that can be tested next quarter. The goal should be a behavior ("Before I quote, I will write the claim the quotation supports") and not a wish ("write better"). Reflection turns experience into skill.
`,
  ],
  cards: [
    ["Literal question", "A question with a single answer found directly in the text."],
    ["Interpretive question", "A question with more than one defensible answer, requiring evidence."],
    ["Evaluative question", "A question that asks for a judgment, supported by reasons."],
    ["Follow-up (press for evidence)", "A question that asks participants to point to the text."],
    ["Discussion leader", "The participant who guides conversation without supplying all the answers."],
    ["Open question", "A question the group may leave unresolved, which can lead to deeper thinking."],
    ["Growth goal", "A specific, testable behavior for the next stage of learning."],
    ["Pattern (in feedback)", "A repeated strength or weakness across several pieces of work."],
  ],
  closed: [
    [
      "Which is an interpretive question?",
      [
        "Who kills Polonius?",
        "How many acts does Hamlet have?",
        "Why might Hamlet spare Claudius at prayer?",
        "What year was Hamlet written?",
      ],
      "C",
    ],
    [
      "Which follow-up best presses for evidence?",
      [
        "Do you agree?",
        "Where in the scene do you see that?",
        "Anyone else?",
        "Why not?",
      ],
      "B",
    ],
    [
      "An evaluative question",
      [
        "has one fixed answer",
        "asks for a judgment supported by reasons",
        "asks about plot only",
        "should be avoided",
      ],
      "B",
    ],
    [
      "Which growth goal is the most useful?",
      [
        "Write better.",
        "Try harder.",
        "After each quotation, add a sentence explaining how a specific word or image supports my claim.",
        "Use bigger words.",
      ],
      "C",
    ],
    [
      "A discussion leader should",
      [
        "do all the talking",
        "keep the conversation on the text, press for evidence, and invite quieter voices",
        "avoid questions",
        "end the discussion early",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a discussion plan for a ten-minute seminar on A Doll's House. Include (a) an opening interpretive question, (b) two follow-up questions that press for evidence or connect to another text from this quarter, and (c) an explanation of why your opening question will produce a rich discussion.",
      scheme: [
        "Writes an interpretive opening question with more than one defensible answer",
        "Writes a follow-up that presses for textual evidence",
        "Writes a follow-up that connects to another text",
        "Explains why the opening question will produce a rich discussion",
      ],
      model:
        "Opening: Is Nora's decision to leave an act of courage, selfishness, or both? Follow-up 1: Which moment in Act 3 best supports your view, and what exactly does the language show? Follow-up 2: How does Nora's choice compare to Eveline's inability to leave in Joyce's story? Why the opening works: it has several defensible answers, requires evidence from the final scene, and links to the play's central tension between duty and selfhood.",
      answers: [
        [
          "full",
          "[[0|Opening question: Is Nora's decision to leave an act of courage, selfishness, or both?]] [[1|Follow-up one: Which moment in Act 3 best supports your view, and what in the language shows it?]] [[2|Follow-up two: How does Nora's choice compare to Eveline's inability to leave in Joyce's story?]] [[3|The opening works because there are good arguments on several sides, it requires evidence from the last scene, and it connects to the central tension between duty and selfhood.]]",
          "Full marks. Your question is open, and the comparison with Eveline links the seminar to a text from earlier in the quarter.",
        ],
        [
          "full",
          "[[0|Why does Ibsen end the play with the sound of a door instead of with a speech?]] [[1|Follow-up: Where in the stage directions or Nora's last lines do you see support for your idea?]] [[2|Connection: How does this ending compare with the ending of Hamlet, where the final action is a mass of deaths?]] [[3|This question will produce discussion since students can argue that the door is a triumph, a tragedy or a question, and each answer requires them to use specific evidence from the final moments.]]",
          "All four marks. A question about the sound of the door asks students to read staging as meaning.",
        ],
        [
          "partial",
          "[[0|Is Nora right to leave her family?]] [[1|Follow-up: Where in the text do you see that?]] That will start the discussion.",
          "Your opening and first follow-up are good. Add a connecting follow-up and explain why the opening will produce rich discussion.",
        ],
        [
          "partial",
          "[[2|How does Nora compare to Eveline?]] [[3|It will get people talking because they can argue many ways.]]",
          "Good connection and rationale. Write an opening question and a follow-up that presses for evidence.",
          true,
        ],
        [
          "weak",
          "What is the name of Nora's husband? What year was the play written? What did Nora eat? Those will start discussion.",
          "These are literal questions and will end quickly. Write a question with more than one defensible answer.",
        ],
        [
          "weak",
          "[[0|Do you like A Doll's House?]] It is a good question because everybody has an opinion and nobody is wrong.",
          "A seminar question should require evidence from the text. Ask about a character's choices, for example.",
        ],
      ],
    },
    {
      prompt:
        "Write a short reflection (a paragraph of six to eight sentences) on your growth as a reader and writer this quarter. Use the three rows of the scoring guide (thesis, evidence and commentary, sophistication). Cite a specific improvement, a pattern of weakness, and a testable goal for next quarter. You may invent plausible details about your own work.",
      scheme: [
        "Identifies a specific improvement with an example from the writing",
        "Identifies a pattern of weakness tied to a rubric row",
        "Sets a specific, testable goal",
        "Explains how the goal would improve the writing or the score",
      ],
      model:
        "This quarter my theses improved: my first essay on 'Araby' said only that Joyce uses setting, while my essay on Hamlet argued that Laertes and Fortinbras shape our view of delay. A pattern remains in my commentary, where I often repeat the quotation instead of explaining how a word works. My goal is to add one sentence after each quotation that names a specific word and what it does. This should raise my evidence and commentary score, which has stayed at two.",
      answers: [
        [
          "full",
          "[[0|This quarter my theses improved a lot: my first essay on Araby only said Joyce uses setting, but my Hamlet essay argued that Laertes and Fortinbras change how we see the delay.]] [[1|A pattern is that my commentary still repeats the quotation instead of explaining it, which has kept my evidence and commentary score at two.]] [[2|My goal is to add one sentence after each quotation naming a specific word and what it does.]] [[3|That should raise the commentary score because it moves me from restating to analyzing.]]",
          "Full marks. Your goal is a behavior you can check in your next essay.",
        ],
        [
          "full",
          "[[0|I got better at choosing evidence, because in my Dickinson essay I used the image of the sun passing them instead of summarizing the carriage ride.]] [[1|But my sophistication score has stayed at zero because I tend to argue one side and ignore complications in the text.]] [[2|Next quarter my goal is to write one sentence in every essay that acknowledges a detail that does not fit my thesis and explains how I account for it.]] [[3|This should earn the sophistication point because it shows I can handle tension in the text.]]",
          "All four marks. Targeting the sophistication row with a specific habit is a smart choice.",
        ],
        [
          "partial",
          "[[0|My thesis statements got better.]] [[1|My commentary is still weak.]] I want to improve.",
          "Improvement and pattern are named. Set a specific, testable goal and explain how it will help.",
        ],
        [
          "partial",
          "[[2|My goal is to add a sentence of analysis after every quotation.]] [[3|That will help my commentary score.]]",
          "Good goal and reason. Add a specific improvement and a pattern of weakness from your writing.",
          true,
        ],
        [
          "weak",
          "I improved a lot and I am a good writer. Next quarter I will try harder and write better essays.",
          "These are general. Identify a specific improvement, a pattern of weakness and a testable goal.",
        ],
        [
          "weak",
          "[[1|My commentary is a problem.]] I do not need a goal because the problem will fix itself with time.",
          "A pattern needs a plan. Write a behavior you will try and how you will check it.",
        ],
      ],
    },
  ],
};

writeCourse("ap-english-literature-grade-12.json", "AP English Literature", "Grade 12", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
