import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Journalism, Grade 11, Quarter 1. Standards: Common Core State Standards for
 * English Language Arts (reading informational text, writing, speaking and
 * listening, language), applied to news writing, in the school's own words.
 * The school paper is the Yellow View Voice. All people and events in the
 * examples are invented.
 */

const w1: WeekInput = {
  topic: "Word choice, framing and the same story in three media",
  note: `
## Objectives

Students will be able to:

1. evaluate how a news writer's word choice and framing reveal a point of view;
2. compare how the same event is reported in print, broadcast and online sources.

## Materials

Two short invented articles about the same school board vote (one neutral, one loaded), a print story, a broadcast script and an online post on the same event, a framing chart, the quiz.

## Starter (7 minutes)

Write two headlines on the board: "Board approves later start time" and "Board slams students with chaotic schedule shake-up." Ask: "Which one is a fact? Which one carries an opinion? What words tell you?"

## Main activity

1. Word choice: denotation (dictionary meaning) and connotation (feelings attached). Compare "criticized" with "slammed," "government" with "regime," "protesters" with "mob," "said" with "claimed" or "admitted." Loaded words reveal a point of view even in a story that looks factual.
2. Framing: what a story puts first, what it leaves out, which sources it quotes, and how it describes people. Two stories about the same vote can emphasize different facts.
3. Compare media: print (depth, space for context, time to verify), broadcast (short, visual, spoken), online (fast, updated, links, sometimes less checked). Students fill in a chart for the same event in three versions.

## Checking for understanding

Ask: "What is a neutral word for 'slammed'? Why does the choice matter?"

## Quiz

Connotation, framing and media comparison.
`,
  reading: [
    "The same vote, told three ways",
    `
Every news story is made of choices. A reporter decides which facts go first, whom to quote, and which words to use. Those choices are the **framing** of the story, and they can shape how readers feel even when every fact is accurate. A good reader notices the choices.

Start with **word choice**. Every word has a **denotation**, its dictionary meaning, and a **connotation**, the feelings and associations that come with it. Compare these pairs: "The mayor **criticized** the plan" and "The mayor **slammed** the plan"; "The group **said** the data were wrong" and "The group **claimed** the data were wrong"; "Students **gathered** outside" and "A **mob** gathered outside." The first word in each pair is plain, and the second suggests a judgment. Neutral news writing prefers the plain word. The verb **said** is the most reliable verb of attribution, because "claimed," "admitted," "insisted" and "confessed" imply something about whether the speaker is telling the truth.

Framing goes beyond words. Imagine that the Yellow View school board votes 5 to 2 to move the first bell from 7:20 a.m. to 8:15 a.m. One story might open: "Yellow View teens will get an extra hour of sleep next fall, following a 5-2 vote by the school board Tuesday." Another might open: "Parents of athletes fear that practices will end after dark under a new bell schedule approved by the school board on a 5-2 vote Tuesday." Both are accurate. The first emphasizes sleep, the second emphasizes a cost. The reader should ask: Which sources are quoted? Whose voices are missing? Which facts come in the first paragraph and which are buried at the end?

Different media tell the same event differently. A **print** article has space for background, numbers and several voices, and a day to verify facts. A **broadcast** report is short, often 30 to 90 seconds, uses pictures and sound, and focuses on a single main idea and a person on camera. An **online** post can be published within minutes, can be updated, can include links, video and reader comments, but it may also be less checked, and headlines are often written to attract clicks. When you compare coverage, make a chart: What is the main point? What is the first fact? Who is quoted? What is left out? What is the tone? Reading the same event in two or three formats is one of the best ways to find the facts they share and the points on which they differ.
`,
  ],
  cards: [
    ["Denotation", "The dictionary meaning of a word."],
    ["Connotation", "The feelings or associations that come with a word."],
    ["Framing", "The choices of what to emphasize, include or leave out in a story."],
    ["Attribution", "Telling the reader who said or provided the information."],
    ["Loaded word", "A word chosen to sway opinion, such as slammed or mob."],
    ["Neutral verb", "A plain attribution verb such as said."],
    ["Print", "Medium with room for depth and time to verify."],
    ["Broadcast", "Medium that is short, spoken and visual."],
  ],
  closed: [
    [
      "Which sentence uses the most neutral word choice?",
      ["The mayor slammed the plan.", "The mayor criticized the plan.", "The mayor trashed the plan.", "The mayor destroyed the plan."],
      "B",
    ],
    [
      "Which attribution verb is the most neutral?",
      ["claimed", "admitted", "said", "insisted"],
      "C",
    ],
    [
      "Two accurate stories about the same vote open differently, one on sleep and one on athletes' practice times. This is a difference in:",
      ["Denotation", "Framing", "Spelling", "Layout only"],
      "B",
    ],
    [
      "Which medium usually has the most space for background and the time to verify?",
      ["A tweet", "A print article", "A 30-second broadcast", "A comment"],
      "B",
    ],
    [
      "The word \"mob\" instead of \"crowd\" shows a difference in:",
      ["Denotation only", "Connotation", "Grammar", "Spelling"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Read these two sentences about the same event: (A) \"Parents slammed the board's chaotic new schedule at a heated meeting.\" (B) \"Several parents raised concerns about the new schedule at Tuesday's meeting.\" Identify the loaded words in A, rewrite A in neutral language, and explain how the word choice affects the reader.",
      scheme: [
        "Identifies at least two loaded words in A, such as slammed, chaotic or heated",
        "Rewrites A in neutral language, such as Parents criticized the new schedule at the meeting",
        "Explains that connotation can push the reader toward a negative view of the board",
        "Explains that neutral language lets readers form their own judgment, or notes that B is more neutral",
      ],
      model:
        "The loaded words in A are slammed, chaotic and heated. A neutral version is: Parents criticized the board's new schedule at the meeting. The loaded words have connotations that push the reader toward a negative view of the board and the meeting. Neutral language, as in B, gives the facts and lets readers form their own judgment.",
      answers: [
        [
          "full",
          "[[0|The loaded words in A are 'slammed,' 'chaotic' and 'heated.']] [[1|A neutral rewrite is: Parents criticized the board's new schedule at the meeting.]] [[2|The loaded words make the reader feel negative about the board before seeing any facts.]] [[3|Sentence B is more neutral, so it lets readers decide for themselves.]]",
          "Full marks. You identified the words, rewrote the sentence and explained the effect.",
        ],
        [
          "full",
          "[[0|'Slammed' and 'chaotic' are opinionated, and 'heated' suggests anger.]] [[1|Neutral: Parents expressed concerns about the new schedule during the meeting.]] [[2|The connotations color how readers see both the parents and the board.]] [[3|Neutral word choice is fairer because it reports what happened and not how the writer feels about it.]]",
          "Full marks. Noticing 'heated' as a loaded word is a sharp observation.",
        ],
        [
          "partial",
          "[[0|The loaded words are 'slammed' and 'chaotic.']] [[1|A rewrite: Parents criticized the schedule.]] Loaded words don't matter because the facts are the same.",
          "Loaded words matter because their connotations affect the reader even when the facts are the same. Explain the effect.",
        ],
        [
          "partial",
          "[[2|The loaded words push readers to feel negative.]] [[3|B is more neutral.]] The loaded word is 'parents.'",
          "'Parents' is neutral. The loaded words are slammed, chaotic and heated.",
          true,
        ],
        [
          "weak",
          "There are no loaded words. Both sentences say the same thing, so word choice does not matter.",
          "Words like slammed and chaotic carry opinions. Compare the connotations in A and B.",
        ],
        [
          "weak",
          "[[1|Parents criticized the schedule.]] The loaded words are all the verbs, because verbs show action and action is opinion.",
          "Verbs are not all loaded. Slammed is loaded, while criticized and said are plain.",
        ],
      ],
    },
    {
      prompt:
        "A fire alarm forces Yellow View High School to evacuate for 20 minutes on Monday. Describe how a print article, a 30-second broadcast report and an online post would each tell this story differently. Give one strength and one weakness of each medium.",
      scheme: [
        "Describes the print article as longer with background and several sources, a strength being depth and time to verify",
        "States a weakness of print, such as slower publication",
        "Describes broadcast as short, visual and focused on one idea, a strength being immediacy or visuals, a weakness being little detail",
        "Describes the online post as fast and updatable with links and photos, a weakness being the risk of errors or lack of checking",
      ],
      model:
        "The print article would be longer, with background on the cause, quotes from the principal and students, and time to verify facts, but it would be published later. A 30-second broadcast would give the main point with pictures and one interview, which is immediate but has little detail. An online post could be published within minutes and updated with photos and links, but it risks mistakes when it is rushed.",
      answers: [
        [
          "full",
          "[[0|The print article would be longer, with background, the cause of the alarm and quotes from several people, so it has depth and time to check facts.]] [[1|Its weakness is that it comes out later than the other media.]] [[2|The broadcast would be a 30-second report with video and one interview, which is quick and visual, but it has little detail.]] [[3|The online post can go up in minutes and be updated with photos and links, but it may contain mistakes if it's rushed.]]",
          "Full marks. Each medium has a strength and a weakness, and all are linked to the event.",
        ],
        [
          "full",
          "[[0|Print: in-depth, includes several sources and context, and it can be verified before it is published.]] [[1|Print is slower, so readers may already know the news.]] [[2|Broadcast: short, spoken and visual with a student on camera, which is immediate, but it can't include many details.]] [[3|Online: fastest and can be updated as new facts arrive, but corrections and accuracy can suffer when speed is the priority.]]",
          "Full marks. The point about readers already knowing the news is an astute weakness of print.",
        ],
        [
          "partial",
          "[[0|Print has more detail.]] [[2|Broadcast is short and has video.]] Online is the best because it is the newest and never has mistakes.",
          "Online posts can contain errors, especially when rushed. Give a weakness of each medium.",
        ],
        [
          "partial",
          "[[3|The online post is fast and can be updated.]] [[1|Print is slower.]] Broadcast is better because it is the longest.",
          "Broadcast reports are usually the shortest, often under a minute. Describe what a broadcast story includes.",
          true,
        ],
        [
          "weak",
          "All three would be exactly the same because the event is the same.",
          "The medium shapes length, detail, speed and style. Describe the differences.",
        ],
        [
          "weak",
          "[[0|Print is longer.]] Broadcast and online are not news; only print is real news.",
          "All three can be news. Each has strengths and weaknesses.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Reporting, opinion and advertising; student press rights",
  note: `
## Objectives

Students will be able to:

1. tell reporting that supports its claims with evidence from opinion or advertising dressed as news;
2. explain how the First Amendment and school press rulings bear on what a student newspaper may print.

## Materials

Samples of an invented news story, an editorial and a "sponsored content" piece, a summary of Tinker, Hazelwood and Mahanoy, a case study of a school paper dispute, the problem set.

## Starter (6 minutes)

Show three short pieces and ask: "Which is news, which is opinion, which is an ad?" Let students vote and give reasons. Discuss what clues they used: label, byline, tone, evidence, who benefits.

## Main activity

1. Three kinds of content: news (reports facts, attributes claims, sources named, balanced), opinion (a writer's view, labeled, uses evidence to argue), and advertising or sponsored content (paid, aims to sell, may imitate a news story and carry a small "sponsored" label). Check: Who wrote it? Who paid? Does it cite sources? Are claims supported? Is it labeled?
2. The First Amendment protects freedom of the press. Student press rulings: Tinker v. Des Moines (1969): students do not "shed their constitutional rights" at the schoolhouse gate; schools may restrict speech only if it would substantially disrupt school. Hazelwood v. Kuhlmeier (1988): schools may exercise editorial control over school-sponsored publications, such as a newspaper produced as part of a class, for reasonable educational reasons. Mahanoy Area School District v. B.L. (2021): limited authority over off-campus speech. Some states have passed laws that expand student press freedom beyond Hazelwood.
3. Case study: a student editor wants to print a story about a staff member's misconduct. Discuss legal limits (libel, invasion of privacy, true threats), ethical responsibilities (fairness, accuracy, minimizing harm) and what an editor can do if an administrator objects.

## Checking for understanding

Ask: "What does Hazelwood allow a school to do, and what does it not allow?"

## Problem set

Classify content and analyze a student press case.
`,
  reading: [
    "What kind of content is this? And who decides what students can print?",
    `
Not everything that looks like a news story is news. As a reader and as a reporter, you need to be able to tell three kinds of content apart.

**News reporting** reports verified facts. It answers who, what, where, when, why and how. It names its sources and **attributes** claims ("according to the district's budget report"; "Principal Maria Lopez said"). It gives space to different sides of a dispute and keeps the reporter's opinion out. A news story supports its claims with evidence that readers can check.

**Opinion** gives a writer's or an organization's point of view. Editorials, columns and reviews are opinion. They can use facts, but their purpose is to persuade. A responsible publication labels opinion clearly, with words like "Editorial" or "Opinion" and a byline or an editorial board label, and keeps it apart from the news pages.

**Advertising** is paid to promote a product or an idea. Some ads imitate news stories, a practice called **native advertising** or **sponsored content**. A story called "5 Ways This Energy Drink Will Change Your Life," with a small gray "Sponsored" label, is an ad dressed as news. To judge a piece, ask: Who wrote it? Who paid for it? Does it name sources and give evidence? Does it present more than one side? Is it clearly labeled? If a piece cites no sources and tells you what to buy, it is probably an ad.

The First Amendment protects the freedom of the press, but student journalists have more complicated rights than professional ones. Three Supreme Court cases matter. In **Tinker v. Des Moines** (1969), students wore black armbands to protest the Vietnam War, and the Court ruled that students do not "shed their constitutional rights to freedom of speech or expression at the schoolhouse gate," and that schools can restrict student expression only if it would substantially disrupt school activities or invade the rights of others. In **Hazelwood School District v. Kuhlmeier** (1988), the Court ruled that a school principal could remove two articles from a school-sponsored student newspaper that was produced in a journalism class, because schools may control the content of school-sponsored publications for legitimate educational reasons. In **Mahanoy Area School District v. B.L.** (2021), the Court held that a school had limited authority to punish a student for off-campus speech on social media. Since Hazelwood, some states have passed laws, often called "New Voices" laws, that give student journalists more protection; students should find out what the law is in their state and what their school's policy says.

Even where a student paper is free from censorship, there are limits. Libel (false statements that harm a person's reputation), invasion of privacy and true threats are not protected. Ethical rules also apply: be accurate, be fair, minimize harm, and be open about corrections.
`,
  ],
  cards: [
    ["Attribution", "Naming the source of information in a story."],
    ["Opinion", "Content that gives a point of view, clearly labeled."],
    ["Native advertising", "Paid content designed to look like news."],
    ["Tinker v. Des Moines", "1969 ruling that students keep free-speech rights at school unless there is substantial disruption."],
    ["Hazelwood v. Kuhlmeier", "1988 ruling allowing school control over school-sponsored publications for educational reasons."],
    ["Libel", "A false published statement that harms someone's reputation."],
    ["Byline", "The line naming the writer of a story."],
    ["Editorial board", "The group that writes an organization's editorials."],
  ],
  closed: [
    [
      "A story with no sources, a small \"Sponsored\" label, and a call to buy a product is most likely:",
      ["News", "An editorial", "Native advertising", "A court ruling"],
      "C",
    ],
    [
      "Which case protected students wearing black armbands to protest a war?",
      ["Hazelwood v. Kuhlmeier", "Tinker v. Des Moines", "Mahanoy v. B.L.", "Miranda v. Arizona"],
      "B",
    ],
    [
      "Hazelwood allows schools to:",
      ["Never control student papers", "Exercise editorial control over school-sponsored publications for educational reasons", "Punish all online speech", "Close newspapers for any reason"],
      "B",
    ],
    [
      "Which feature best distinguishes news from opinion?",
      ["News names sources and attributes claims while opinion argues a view", "News is always longer", "Opinion has no facts", "News is always online"],
      "A",
    ],
    [
      "A false published statement that harms someone's reputation is:",
      ["Attribution", "Libel", "A byline", "Framing"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A website posts an article titled \"Why Every Teen Needs Brainy Boost Drink,\" with a small gray label that reads \"Sponsored.\" It includes quotes from a satisfied customer and no other sources. Explain why this is not news reporting. Give three clues, and explain how a responsible reader should treat the article.",
      scheme: [
        "Identifies the sponsored label as a clue that the content is paid advertising",
        "Identifies the lack of independent sources and evidence as a clue",
        "Identifies the one-sided persuasion (telling readers what they need) or promotional title as a clue",
        "Explains that a reader should treat it as an ad, check independent sources and consider who benefits",
      ],
      model:
        "This is native advertising, not news. The Sponsored label shows that someone paid for it. It has no independent sources or evidence, only a satisfied customer. The title tells teens what they need, which is persuasion rather than reporting. A responsible reader should treat it as an ad, look for independent evidence and ask who benefits.",
      answers: [
        [
          "full",
          "[[0|The 'Sponsored' label shows that someone paid for the piece, so it's advertising.]] [[1|It has no independent sources or evidence, only one happy customer.]] [[2|The title tells teens what they 'need,' which is persuasion and not reporting.]] [[3|A reader should treat it as an ad, look for independent evidence and ask who benefits from the claim.]]",
          "Full marks. Three clear clues and a sensible response.",
        ],
        [
          "full",
          "[[0|It is labeled 'Sponsored,' which means paid content designed to look like a news story.]] [[1|It doesn't name any experts or studies that can be checked.]] [[2|It promotes one product and doesn't present any other side.]] [[3|I'd read it as an ad, and look for reliable sources before believing its claims.]]",
          "Full marks. The point about no other side is an important clue.",
        ],
        [
          "partial",
          "[[0|The label says 'Sponsored.']] [[2|The title is promotional.]] A reader should believe it because it has a quote.",
          "A single customer quote is not independent evidence. Explain why a reader should be cautious.",
        ],
        [
          "partial",
          "[[1|There are no independent sources.]] [[3|The reader should check who paid for it.]] The title shows that it is news because it has a name.",
          "A product name in the title suggests advertising. Identify the label and the promotional title as clues.",
          true,
        ],
        [
          "weak",
          "It is news because it is on a website and has an article format.",
          "Format is not enough. Look at the label, sources, evidence and purpose.",
        ],
        [
          "weak",
          "[[0|It is sponsored.]] Sponsored means the government approved it, so it is accurate.",
          "Sponsored means that someone paid for it. It does not mean it is verified.",
        ],
      ],
    },
    {
      prompt:
        "The editor of the Yellow View Voice, a school newspaper produced in a class, wants to print a story that says the new athletic director has been accused of mistreating players. The principal wants to stop the story. Explain what Hazelwood allows, what the editor must do to meet journalistic standards, and one option the editor has if the principal objects.",
      scheme: [
        "States that under Hazelwood, schools may control content of school-sponsored publications for reasonable educational reasons",
        "States that the editor must verify the facts and get comment from the accused",
        "States that the editor must use attribution and avoid libel, and report fairly",
        "States an option, such as asking for the principal's specific educational reason, appealing to the district, or checking whether state law gives more protection",
      ],
      model:
        "Under Hazelwood, the school can control the content of a school-sponsored paper for reasonable educational reasons, so the principal may have the power to stop the story. To meet standards, the editor must verify the facts, seek comment from the athletic director, attribute claims to named sources and avoid libel. If the principal objects, the editor can ask for the specific educational reason, appeal to the district, and check whether the state has a law that gives student journalists more protection.",
      answers: [
        [
          "full",
          "[[0|Under Hazelwood, the school can control a school-sponsored paper if it has a reasonable educational reason, so the principal might be able to stop it.]] [[1|The editor must verify the allegations with documents or sources and ask the athletic director for comment.]] [[2|The story has to attribute claims to named sources and avoid libel.]] [[3|If the principal objects, the editor can ask for the specific reason, appeal to the district and check whether state law gives students more protection.]]",
          "Full marks. You balanced the legal question with the ethical standards.",
        ],
        [
          "full",
          "[[0|Hazelwood gives schools broad power over school-sponsored publications like a class newspaper.]] [[1|The editor needs two sources or documents, and has to give the accused person a chance to respond.]] [[2|Claims have to be attributed, and the story must not state unproven accusations as fact, to avoid libel.]] [[3|The editor can ask the principal to explain the educational reason, bring in a media law adviser, and see if a state 'New Voices' law applies.]]",
          "Full marks. Calling for two sources and a chance to respond is solid practice.",
        ],
        [
          "partial",
          "[[0|Hazelwood lets the school control the paper.]] [[3|The editor can appeal.]] The editor should print it anyway because of the First Amendment.",
          "The First Amendment is limited for school-sponsored papers under Hazelwood. Add the standards the story must meet.",
        ],
        [
          "partial",
          "[[1|The editor must verify the facts and ask the athletic director for comment.]] [[2|Attribute the claims.]] Hazelwood says that school papers have no restrictions.",
          "Hazelwood allows schools to control school-sponsored papers for educational reasons. Explain what it permits.",
          true,
        ],
        [
          "weak",
          "The principal can never stop a story because of the First Amendment, so the editor should publish it.",
          "Under Hazelwood a school may control a school-sponsored paper for educational reasons, so the question is more complicated.",
        ],
        [
          "weak",
          "[[1|The editor should check the facts.]] A rumor from the locker room is enough to print because everyone knows it.",
          "A rumor is not verified. Print only what you can verify and attribute.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "The inverted pyramid and the feature story",
  note: `
## Objectives

Students will be able to:

1. write a news story in inverted-pyramid form that answers who, what, where, when, why and how;
2. write a feature story that opens with a scene and organizes information around a central idea.

## Materials

A fact sheet about an invented event (a fire drill gone wrong, a robotics win), model stories, a scene-writing worksheet, the worksheet.

## Starter (6 minutes)

Give students a fact sheet and ask them to circle the single most important fact. Then ask them to put the facts in order of importance. Compare their choices and introduce the inverted pyramid.

## Main activity

1. The inverted pyramid: the lede (first sentence or paragraph) gives the most important facts, the next paragraphs add important details, and the least important background goes last, so the story can be cut from the bottom. A good news lede answers who, what, where and when, and often why or how, in about 25 to 35 words.
2. Write a news story from the fact sheet: lede, second paragraph with a key quote, supporting details, background. Attribute with "said."
3. The feature story: opens with a scene or a person, then moves to a nut graf (a paragraph that states the central idea), then develops the idea with details, quotes and context, and returns to the opening at the end. Use sensory details, avoid opinion words.
4. Compare the two forms side by side.

## Checking for understanding

Ask: "Can you cut the last paragraph of a news story and still understand it? Why?"

## Worksheet

A news story and a scene lede.
`,
  reading: [
    "The inverted pyramid, and the scene that opens a feature",
    `
Most hard news stories use the **inverted pyramid**: the most important information goes first and the least important goes last. The shape comes from the way news used to be set in type and cut for space. The editors cut from the bottom, so the end of a story had to be expendable. It still helps readers, who often read only the first few paragraphs.

The **lede** (also spelled lead) is the opening sentence or paragraph, and it carries the most weight. A good news lede answers the **5 W's and an H**: who, what, where, when, why and how, or at least the ones that matter most, in about 25 to 35 words. Here is a lede for an invented event: "Yellow View High School's robotics team won the state championship Saturday in Columbus, beating 48 other teams with a robot built in six weeks." The **who** is the robotics team, the **what** is winning the championship, the **where** is Columbus, the **when** is Saturday, and the **how** is a robot built in six weeks. The second paragraph often adds a key quote or the next most important fact: "'We didn't think we had a chance after the first round,' team captain Jada Brooks said." Next come more details, background, and secondary information. Attribute opinions and claims by naming the source and using **said**: "Coach Daniel Reyes said the team practiced 20 hours a week." Do not put your own opinion in the story; avoid words such as "amazing" unless it is in a quotation.

A **feature story** works differently. It is not time-sensitive, and its purpose is to explain, to explore a person or a trend, and to hold the reader through to the end. A feature often opens with a **scene** or an **anecdote**: "At 6:40 a.m., before the first bell, senior Maya Chen unlocks the door of Room 112 and flips on the lights of the school's only student-run food pantry." The scene uses sensory details and draws the reader in. Then comes the **nut graf**, a paragraph that explains the central idea and why the story matters: "Maya is one of 14 student volunteers who stock the pantry, which serves about 60 classmates a week and has grown from a single shelf to a room." After that the writer develops the idea with details, quotes, numbers and context, and often ends by returning to the opening scene, which gives the story a sense of completion.

When you plan a story, ask: Is this news that readers need now (inverted pyramid) or an in-depth piece that explores a theme (feature)? Many publications run both on the same topic.
`,
  ],
  cards: [
    ["Inverted pyramid", "A news structure with the most important facts first."],
    ["Lede", "The opening sentence or paragraph of a news story."],
    ["5 W's and an H", "Who, what, where, when, why and how."],
    ["Nut graf", "The paragraph in a feature that states the central idea."],
    ["Scene lede", "An opening that places the reader in a specific moment."],
    ["Attribution verb 'said'", "The standard, neutral verb for quotes."],
    ["Feature story", "An in-depth story that explores a person, trend or idea."],
    ["Anecdote", "A short story used to illustrate a point."],
  ],
  closed: [
    [
      "In the inverted pyramid, the least important information goes:",
      ["First", "In the middle", "Last", "In the headline"],
      "C",
    ],
    [
      "Which is the best news lede?",
      [
        "It was a great day for the school.",
        "Yellow View High School's robotics team won the state championship Saturday in Columbus.",
        "Many people were happy about the win.",
        "Robotics is a fun club at Yellow View.",
      ],
      "B",
    ],
    [
      "The nut graf in a feature story:",
      ["Gives the headline", "States the central idea and why the story matters", "Lists all quotes", "Ends the story"],
      "B",
    ],
    [
      "Which verb of attribution should a news writer use most?",
      ["claimed", "exclaimed", "said", "boasted"],
      "C",
    ],
    [
      "Which story type often opens with a scene?",
      ["A hard news brief", "A feature", "A weather list", "A correction"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Fact sheet: The Yellow View High School band won first place at the Ohio state marching contest on Saturday, Oct. 12, in Canton. It was the band's first state title in 18 years. There were 22 bands. Director Alicia Moore said, \"The students worked every morning since August.\" The band has 96 members. The score was 91.4, ahead of the second-place band's 89.8. Write a news story of three paragraphs in inverted-pyramid form, with a lede that answers who, what, where and when, a quote with attribution, and supporting details.",
      scheme: [
        "Writes a lede that includes who, what, where and when",
        "Places the most important facts first and the least important last",
        "Includes the quote correctly attributed with said",
        "Includes supporting details such as the score, the number of bands or members, without opinion words",
      ],
      model:
        "The Yellow View High School marching band won first place at the Ohio state marching contest Saturday in Canton, claiming its first state title in 18 years. The band scored 91.4, ahead of the second-place band's 89.8, in a field of 22 bands. \"The students worked every morning since August,\" director Alicia Moore said. The band has 96 members.",
      answers: [
        [
          "full",
          "[[0|The Yellow View High School marching band won first place at the Ohio state contest Saturday in Canton, its first state title in 18 years.]] [[1|The band scored 91.4 and beat the second-place band, which scored 89.8, in a field of 22 bands.]] [[2|\"The students worked every morning since August,\" director Alicia Moore said.]] [[3|The band has 96 members.]]",
          "Full marks. The lede has the 5 W's, the details follow, and the least important fact is last.",
        ],
        [
          "full",
          "[[0|CANTON, Ohio — Yellow View High School's marching band won the Ohio state marching contest Saturday, ending an 18-year wait for a state title.]] [[1|The 96-member band scored 91.4 points, ahead of the runner-up's 89.8, among 22 bands.]] [[2|Director Alicia Moore said, \"The students worked every morning since August.\"]] [[3|The contest was held on Oct. 12.]]",
          "Full marks. A dateline is a nice professional touch.",
        ],
        [
          "partial",
          "[[0|The Yellow View High School marching band won first place Saturday in Canton.]] The students worked hard, said Moore. [[3|The band has 96 members.]] The amazing band is the best in Ohio.",
          "Avoid opinion words such as 'amazing' and 'best.' Add the score and the quote with the full attribution.",
        ],
        [
          "partial",
          "[[1|The band scored 91.4, ahead of 89.8, among 22 bands.]] [[2|\"The students worked every morning since August,\" Moore said.]] On Saturday, in Canton, the band won. It was a great day.",
          "Start with the most important fact in the lede, who won what, where and when. 'It was a great day' is opinion.",
          true,
        ],
        [
          "weak",
          "It was a beautiful fall day and the band members got up early in the morning, put on their uniforms and went to Canton.",
          "A news story starts with the most important fact: the band won a state title. Save the scene for a feature.",
        ],
        [
          "weak",
          "[[3|The band has 96 members.]] Moore exclaimed that the students were incredible and the best band ever.",
          "Use said, not exclaimed, and report the actual quote. Do not include opinion words.",
        ],
      ],
    },
    {
      prompt:
        "Write a feature story opening of two paragraphs about a student who volunteers at the school's food pantry before school. Paragraph one should be a scene with at least two sensory details. Paragraph two should be a nut graf that states the central idea and why it matters. Use invented but plausible details.",
      scheme: [
        "Opens with a specific scene with a time and place",
        "Includes at least two sensory details such as sights, sounds or smells",
        "Writes a nut graf that states the central idea of the story",
        "Explains why the story matters, with a fact or number, and avoids unsupported opinion",
      ],
      model:
        "At 6:40 a.m., before the first bell, senior Maya Chen unlocks Room 112 and flips on the lights. The room smells of cardboard and bananas, and cans clink as she stacks them on a metal shelf. Maya is one of 14 student volunteers who run the school's food pantry, which serves about 60 classmates a week. It has grown from a single shelf in a closet to a full room in two years, a sign of how many students need help with food.",
      answers: [
        [
          "full",
          "[[0|At 6:40 a.m., before the first bell, senior Maya Chen unlocks Room 112 and flips on the lights.]] [[1|The room smells like cardboard and ripe bananas, and cans clink as she lines them up on a metal shelf.]] [[2|Maya is one of 14 student volunteers who run Yellow View's food pantry, which now serves about 60 classmates each week.]] [[3|It started as one shelf in a closet two years ago, and its growth shows how many students need help with food.]]",
          "Full marks. The scene has sensory details, and the nut graf gives the idea and a reason for the story.",
        ],
        [
          "full",
          "[[0|The hallway is still dark when sophomore Jordan Reyes slips through the side door of the cafeteria at 7 a.m.]] [[1|A refrigerator hums, a cart squeaks, and the sharp smell of oranges fills the stockroom.]] [[2|Jordan is one of a dozen students who run the school's weekly food pantry, which serves 60 families.]] [[3|The pantry, started by a teacher two years ago, now gives out about 400 pounds of food every Friday, which matters because one in six Ohio children faces food insecurity.]]",
          "Full marks. The statistic gives the story a reason to matter, but make sure to cite its source in a real story.",
        ],
        [
          "partial",
          "[[0|At 6:40 a.m., senior Maya Chen opens Room 112.]] She is a nice person who really cares. [[2|Maya is one of 14 volunteers who run the pantry.]] It is an amazing project.",
          "Add sensory details to the scene, and replace 'nice' and 'amazing' with facts. Explain why the story matters.",
        ],
        [
          "partial",
          "[[1|The room smells of bananas and the cans clink.]] [[3|The pantry matters because 60 students use it each week.]] Maya Chen is a volunteer.",
          "Start with a time and place for the scene and state the central idea in a nut graf.",
          true,
        ],
        [
          "weak",
          "Food pantries are important in society. Many people need help. This story is about a food pantry at school.",
          "A feature opening should place readers in a specific scene, not make general statements.",
        ],
        [
          "weak",
          "[[2|Maya is one of 14 volunteers.]] The pantry is the greatest thing the school has ever done and everyone should donate.",
          "Avoid opinion and persuasion in a feature. Show with facts and details.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Editorials, headlines, ledes and captions",
  note: `
## Objectives

Students will be able to:

1. write an editorial that takes a clear position and answers the strongest objection;
2. write headlines, ledes and captions that are accurate, concise and suited to the audience.

## Materials

Model editorials from the Yellow View Voice (invented), a headline-writing workshop, photos for caption practice, the worksheet.

## Starter (6 minutes)

Pose: "Should the school allow phones at lunch?" Take a quick poll and ask students to explain their reasons. Point out that an editorial needs a position, evidence and an answer to the other side.

## Main activity

1. Editorial structure: a hook, a clear position (thesis), two or three arguments with evidence, the strongest counterargument stated fairly, a rebuttal, and a conclusion with a recommendation. Tone: firm, not insulting. Written in the voice of the editorial board ("we").
2. Headlines: use strong present-tense verbs, be specific, fit the space, avoid ending with a period, capitalize only the first word and proper nouns (in AP style), and never promise more than the story delivers. Compare "Board votes" with "Board OKs later start for high schools."
3. Ledes: short and specific; avoid starting with "On Tuesday" or a quote unless it is exceptional.
4. Captions: identify people (left to right), say what is happening, give the date or context, use the present tense for the action in the photo and add one sentence of context in the past tense.

## Checking for understanding

Ask: "What's wrong with the headline 'Students are upset'?"

## Worksheet

An editorial paragraph, headlines and captions.
`,
  reading: [
    "Taking a stand fairly, and writing the words readers see first",
    `
An **editorial** is a piece of opinion that represents the view of a publication. Unlike a news story, it takes a **position**. But a good editorial is more than a complaint; it follows a structure. It begins with a **hook**, an example or fact that draws in the reader. It states a clear **position** (the thesis): "The Yellow View Voice believes that students should be allowed to use phones during lunch." It then gives **two or three arguments**, each supported by **evidence**, such as numbers, examples or expert views: "Students use lunch to check on family and to arrange rides after practice; a survey of 200 students found that 74 percent make a family-related call or text during lunch." Then comes the part that makes an editorial persuasive and fair: the **strongest counterargument**, stated honestly, and a **rebuttal**: "Some teachers worry that phones will make the cafeteria silent and that students will not talk to each other. This is a fair concern. But a lunch policy can require phones to be put away in the first ten minutes or in designated tables, while still giving students the chance to connect with family." Finally, the editorial **concludes** with a recommendation. Editorials are written in the voice of the board ("we") and avoid personal attacks.

**Headlines** are the first thing the reader sees. A good headline is **accurate** (it matches the story), **specific**, **concise** and active. Use a **strong verb in the present tense** and omit unnecessary words: "Board OKs later start for high schools" is better than "The school board voted on Tuesday to approve a later starting time for high schools." Use sentence-style capitalization (only the first word and proper nouns). Do not end with a period. Avoid vague headlines such as "Students are upset" and avoid ones that promise more than the story offers, such as "School bans phones" if only one rule changed.

The **lede** of a news story must be specific: "The Yellow View robotics team won the state title Saturday" is better than "A big event happened over the weekend." Avoid starting with a time ("On Tuesday") or a weak quote.

A **caption** explains a photo. It should **identify** the people in it, usually from left to right, say **what is happening**, and add **context**. Use the present tense for what the picture shows and the past tense for earlier events: "Seniors Jada Brooks, left, and Marcus Lee, right, tighten the arm of their robot before the final round. The team went on to win the state title Saturday in Columbus." Never write a caption that says only what the picture already shows, such as "Students stand in the gym." A reader should learn something new from it.
`,
  ],
  cards: [
    ["Editorial", "An opinion piece representing the view of a publication."],
    ["Thesis (position)", "The clear statement of the editorial's view."],
    ["Counterargument", "The strongest argument against your position."],
    ["Rebuttal", "Your response to the counterargument."],
    ["Headline", "The title of a story, short and active."],
    ["Sentence-style headline", "Only the first word and proper nouns are capitalized."],
    ["Caption", "Text that explains a photograph."],
    ["Left to right", "The order in which people are identified in a photo caption."],
  ],
  closed: [
    [
      "Which headline is the best?",
      ["Students are upset", "Board OKs later start for high schools", "The school board voted on Tuesday on something", "Big news today"],
      "B",
    ],
    [
      "An editorial should include:",
      ["Only the writer's feelings", "A position, evidence, and the strongest counterargument", "No evidence", "Insults to the other side"],
      "B",
    ],
    [
      "A caption should:",
      ["Repeat what is obvious in the picture", "Identify people, say what is happening and add context", "Be at least 200 words", "Give the reporter's opinion"],
      "B",
    ],
    [
      "Which headline follows AP sentence-style capitalization?",
      ["Board Approves A Later Start For High Schools", "Board approves later start for high schools", "BOARD APPROVES LATER START", "Board approves later start for high schools."],
      "B",
    ],
    [
      "In an editorial, a rebuttal:",
      ["Repeats the position", "Responds to the strongest objection", "Introduces a new topic", "Lists the sources"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write an editorial paragraph (about 120 words) for the Yellow View Voice arguing for or against allowing phones at lunch. Include a clear position, one argument with evidence (invent a plausible survey number), the strongest counterargument and a rebuttal.",
      scheme: [
        "States a clear position in the voice of the editorial board",
        "Gives an argument supported by evidence such as a survey result",
        "States the strongest counterargument fairly",
        "Gives a rebuttal that answers the counterargument and recommends a solution",
      ],
      model:
        "The Yellow View Voice believes students should be allowed to use phones at lunch. Many students use lunch to arrange rides and check on family; in a Voice survey of 200 students, 74 percent said they make a family-related call or text during lunch. Some teachers worry that the cafeteria will go silent. That is a fair concern, but the school can ask students to put phones away for the first ten minutes. A balanced policy protects both conversation and family contact.",
      answers: [
        [
          "full",
          "[[0|The Yellow View Voice believes that students should be allowed to use phones at lunch.]] [[1|In a Voice survey of 200 students, 74 percent said they use lunch to contact family or arrange rides.]] [[2|Some teachers worry that phones will make the cafeteria silent and that students will stop talking.]] [[3|That is a fair concern, but the school could require phones to be put away for the first ten minutes, which protects conversation and still allows students to reach their families.]]",
          "Full marks. The counterargument is stated fairly, and the rebuttal offers a workable solution.",
        ],
        [
          "full",
          "[[0|We urge the school to keep phones out of the cafeteria at lunch.]] [[1|A Voice poll of 150 students found that 62 percent said they ate while looking at a screen and 58 percent said they did not talk to the people at their table.]] [[2|Opponents argue that a phone ban would stop students from contacting parents in an emergency.]] [[3|The office phone and teachers can handle emergencies, and a lunch free of screens gives students a rare time to talk face to face.]]",
          "Full marks. A well-argued editorial on the other side, with a fair statement of the objection.",
        ],
        [
          "partial",
          "[[0|We think students should have phones at lunch.]] [[1|Everyone knows that most students need their phones.]] Teachers say it's bad, but they are wrong. Phones are good.",
          "Support your argument with evidence, such as a survey, and state the counterargument fairly. 'They are wrong' is not a rebuttal.",
        ],
        [
          "partial",
          "[[2|Some say phones make lunch silent.]] [[3|The school could limit phones to the second half of lunch.]] We believe in phones because it's the best.",
          "State your position clearly and add evidence. 'It's the best' is an opinion without support.",
          true,
        ],
        [
          "weak",
          "Phones are great and anyone who says otherwise is dumb. Students should have their phones all the time.",
          "An editorial should be firm but fair and should not insult the other side. Add evidence and a counterargument.",
        ],
        [
          "weak",
          "[[1|A survey said many students like phones.]] This editorial is about how phones were invented in the 1900s.",
          "Stay on the topic of lunch policy. State your position and respond to the strongest objection.",
        ],
      ],
    },
    {
      prompt:
        "Improve these three items. (1) Headline: \"The School Board Voted On Tuesday To Approve A Plan To Build A New Gym.\" (2) Lede: \"On Tuesday, there was a meeting at which the board talked about the gym.\" (3) Caption for a photo of two students holding a trophy: \"Students holding a trophy.\" Rewrite each one, and explain the rule you applied.",
      scheme: [
        "Rewrites the headline in a short, active, present-tense, sentence-style form, such as Board OKs plan for new gym",
        "Rewrites the lede to be specific, with who, what and when, such as The school board approved a plan Tuesday to build a new gym",
        "Rewrites the caption to identify people, say what is happening and add context",
        "Explains at least two rules applied, such as active verbs, brevity, specificity and identifying people left to right",
      ],
      model:
        "Headline: Board OKs plan for new gym. Lede: The school board approved a $4.2 million plan Tuesday to build a new gym at Yellow View High School. Caption: Seniors Jada Brooks, left, and Marcus Lee hold the state robotics trophy after Saturday's win in Columbus. Rules: use short active headlines, make ledes specific, and identify people and add context in captions.",
      answers: [
        [
          "full",
          "(1) [[0|Board OKs plan for new gym]] (2) [[1|The school board approved a $4.2 million plan Tuesday to build a new gym at Yellow View High School.]] (3) [[2|Seniors Jada Brooks, left, and Marcus Lee hold the state robotics trophy after Saturday's win in Columbus.]] [[3|I used a short active headline, a specific lede with the key facts, and a caption that identifies people left to right and gives context.]]",
          "Full marks. All three are improved, and the rules are named.",
        ],
        [
          "full",
          "(1) [[0|Board approves new gym plan]] (2) [[1|Yellow View's school board voted 5-2 Tuesday to build a new gym, a project that will cost $4.2 million.]] (3) [[2|Band members Ana Ruiz, left, and Ben Cho hold the first-place trophy from the state contest in Canton.]] [[3|The rules: strong present-tense verbs in headlines, specifics in the lede and identifying people with context in captions.]]",
          "Full marks. The vote count and the cost make the lede specific.",
        ],
        [
          "partial",
          "(1) [[0|Board approves gym]] (2) The board met Tuesday and approved the gym. (3) Two students hold a trophy they won. [[3|I made them shorter.]]",
          "Shorter is not the only rule. Add specifics to the lede and identify the people and the context in the caption.",
        ],
        [
          "partial",
          "(1) The Board Voted To Build A New Gym. (2) [[1|The school board approved a plan Tuesday to build a new gym.]] (3) [[2|Marcus Lee, left, and Jada Brooks hold the trophy after winning the state title.]]",
          "AP headlines use sentence-style capitalization and active verbs: Board OKs plan for new gym. Your lede and caption are good.",
          true,
        ],
        [
          "weak",
          "(1) Gym. (2) There was a meeting about the gym on Tuesday. (3) Trophy.",
          "A headline needs a subject and an active verb, a lede needs the key facts, and a caption needs names and context.",
        ],
        [
          "weak",
          "(1) Amazing! Board Gives Us the Best Gym Ever (2) We are so excited about the gym! (3) Our awesome winners!",
          "Avoid opinion words and exclamation in news writing. Stick to facts and identify the people in captions.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Digital tools, updating a news page and planning a project",
  note: `
## Objectives

Students will be able to:

1. use digital tools to produce, publish and update a school news page;
2. plan a reporting project from a focused question to a published piece.

## Materials

A school news page template (or a free content management tool), sample photos with permission notes, a project planning sheet, a timeline template, the worksheet.

## Starter (6 minutes)

Show an online news page. Ask: "How do you know when it was published? What if there is a mistake? How do you know who wrote it?" Gather answers about bylines, timestamps and corrections.

## Main activity

1. Producing and publishing online: headline, subhead (deck), byline, dateline and timestamp, body copy, photos with captions and credits, links to sources, tags, and an accessible design (alt text for images, readable fonts, headings). Respect copyright: use your own photos or permitted images, and credit them.
2. Updating: add new information with a clear note ("Updated at 4:15 p.m. with comment from Principal Lopez"); correct errors openly ("Correction: An earlier version of this story gave the wrong date for the vote."). Never silently change facts.
3. Planning a project: start with a focused question ("How many Yellow View students work part-time, and how does it affect their sleep?"), then list sources (interviews, documents, data), a method, a timeline with milestones (reporting, drafting, fact-checking, editing, publishing), roles, and the format (story, photo essay, podcast, graphic).
4. Peer review of a project plan.

## Checking for understanding

Ask: "What belongs in a correction note?"

## Worksheet

A news page layout and a project plan.
`,
  reading: [
    "Publishing, updating and planning like a newsroom",
    `
When a story is published online, the page contains more than the text. A professional news page has a **headline**, often a **subhead** or **deck** that adds a detail, a **byline** naming the reporter, a **dateline** that tells where the story was reported, and a **timestamp** that shows when it was published and updated. The body should be broken into short paragraphs. **Photos** need a caption and a **credit** (who took the picture). It is important to respect **copyright**: use your own photographs or images you have permission to use, and credit the photographer. The page can include **links** to the documents or the sources that support the story, and **tags** that help readers find related stories. Good design includes **alt text** for the images, so that readers with visual impairments can understand them, large readable type, and clear headings.

One of the great strengths of online news is that it can be **updated**. When new information arrives, a reporter adds it and tells the reader that the story changed. For example: "Updated at 4:15 p.m. with comment from Principal Maria Lopez." When a reporter finds a mistake, the story must be **corrected** openly. A correction note states what was wrong and what is right: "Correction: An earlier version of this story gave the wrong date for the vote. The board voted Tuesday, not Monday." Silently changing a fact, even a small one, damages the reader's trust and is considered bad practice. Corrections protect the credibility of the publication more than they hurt it.

A reporting project starts with a **focused question**, one that can be answered by reporting and that matters to your audience. "What is happening with school lunch?" is too broad. "How many Yellow View students work part-time, and how does it affect their sleep?" is focused. Next, list the **sources** you will need: people to interview (students, a counselor, a researcher), documents (district attendance data, a public survey) and data. Decide on the **method**: a survey of 150 students, five interviews, and a review of sleep research. Create a **timeline** with milestones: for example, week 1 for the survey and interview requests, week 2 for the interviews, week 3 for drafting, week 4 for fact-checking and editing, and publication at the end. Assign **roles**: reporter, photographer, editor, fact-checker. Choose the **format**: a written story with a chart, a photo essay, a podcast or a combination. Share your plan with an editor, who can point out gaps, such as a missing perspective or a deadline that is too short.
`,
  ],
  cards: [
    ["Byline", "The line naming the writer of a story."],
    ["Timestamp", "The date and time a story was published or updated."],
    ["Alt text", "A text description of an image for readers who cannot see it."],
    ["Correction", "An open note that fixes an error in a published story."],
    ["Update note", "A note telling readers what new information was added."],
    ["Focused question", "A specific, answerable question that guides a reporting project."],
    ["Photo credit", "A line naming who took a photograph."],
    ["Milestone", "A checkpoint with a date in a project timeline."],
  ],
  closed: [
    [
      "When you find a factual error in a published story, you should:",
      ["Silently fix it", "Delete the story", "Correct it and add a clear correction note", "Ignore it"],
      "C",
    ],
    [
      "Which is the best focused question for a reporting project?",
      ["What is happening with school lunch?", "How many Yellow View students work part-time, and how does it affect their sleep?", "Is school good?", "What should we write about?"],
      "B",
    ],
    [
      "Alt text is used to:",
      ["Make images larger", "Describe images for readers who cannot see them", "Add colors", "Credit photographers"],
      "B",
    ],
    [
      "Which of these belongs in a photo credit?",
      ["The caption", "The name of the photographer", "The headline", "The opinion of the editor"],
      "B",
    ],
    [
      "Which is a reason to include a timestamp on a story?",
      ["To show when the story was published or updated", "To make the page longer", "To hide the author", "To add a color"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "You published an online story that says the student council voted 8-4 to hold prom at the Convention Center on Saturday, April 12. The next morning the council adviser tells you that the vote was 8-5 and the date is April 5. Write the correction note, and explain the steps you should take to correct the story and why you should not just change the numbers silently.",
      scheme: [
        "Writes a correction note stating what was wrong and what is right (vote 8-5, date April 5)",
        "Explains that the story should be corrected on the page promptly",
        "Explains that the reporter should verify the correct facts with a second source or the minutes",
        "Explains that silent changes damage trust and that openness protects credibility",
      ],
      model:
        "Correction: An earlier version of this story gave the wrong vote count and date for the prom. The student council voted 8-5, not 8-4, to hold prom at the Convention Center on Saturday, April 5, not April 12. I would first verify the facts with the minutes or a second source, then correct the story promptly with the note. Silent changes would damage readers' trust, while an open correction protects the credibility of the publication.",
      answers: [
        [
          "full",
          "[[0|Correction: An earlier version of this story gave the wrong vote and date. The council voted 8-5, not 8-4, and prom is Saturday, April 5, not April 12.]] [[1|I would fix the story on the page promptly, with the note at the top or bottom.]] [[2|Before changing it, I'd check the council's minutes or ask a second person to confirm the numbers.]] [[3|Silent changes would make readers lose trust, but an open correction shows we care about accuracy.]]",
          "Full marks. The note states both errors and the right facts, and the steps are in a sensible order.",
        ],
        [
          "full",
          "[[0|Correction: The student council voted 8-5, not 8-4, to hold prom at the Convention Center on April 5. An earlier version of this story gave the wrong information.]] [[1|The story should be updated right away so readers see the right facts.]] [[2|I would verify against the official minutes or by asking another council member.]] [[3|Quietly changing the numbers would be dishonest to readers who saw the first version, and corrections build credibility.]]",
          "Full marks. Mentioning readers who saw the first version is an important reason.",
        ],
        [
          "partial",
          "[[0|Correction: the vote was 8-5 and the date is April 5.]] [[1|I'd fix it quickly.]] I'd just change the numbers without a note because it is only a small mistake.",
          "Even small factual changes need a note. Explain why silent changes are a problem.",
        ],
        [
          "partial",
          "[[2|I'd verify with the minutes.]] [[3|A correction protects the credibility of the paper.]] Delete the story and write it again.",
          "Deleting the story hides the mistake. Publish a correction note with the right facts.",
          true,
        ],
        [
          "weak",
          "I would not do anything because the adviser might be wrong and nobody reads the story anyway.",
          "Verify the facts and correct any error. Readers rely on accurate information.",
        ],
        [
          "weak",
          "[[1|Fix it on the page.]] Corrections make the paper look bad, so it's better not to mention that the story was changed.",
          "Corrections protect credibility. Not mentioning a change is a silent change.",
        ],
      ],
    },
    {
      prompt:
        "Plan a reporting project for the Yellow View Voice. Write a focused question, list at least three sources, describe your method, and give a four-week timeline with milestones. Name the format you would use and explain why.",
      scheme: [
        "Writes a focused, answerable question that matters to the audience",
        "Lists at least three appropriate sources (interviews, documents, data)",
        "Describes a method and a four-week timeline with milestones",
        "Chooses a format and explains why it suits the question",
      ],
      model:
        "Question: How many Yellow View students work part-time, and how does it affect their sleep? Sources: a survey of 150 students, interviews with five working students and a counselor, and sleep research from a pediatric group. Timeline: Week 1 survey, week 2 interviews, week 3 drafting, week 4 fact-checking, editing and publishing. Format: a written story with a chart, because the survey data are best shown visually.",
      answers: [
        [
          "full",
          "[[0|My question is: How many Yellow View students work part-time, and how does it affect their sleep?]] [[1|My sources are a survey of 150 students, interviews with five working students and a counselor, and a sleep study from a children's hospital.]] [[2|The timeline is: Week 1 survey and interview requests; Week 2 interviews; Week 3 draft; Week 4 fact-check, edit and publish.]] [[3|I'd publish a written story with a chart because the survey results are easier to see in a graph.]]",
          "Full marks. The plan is specific, with sources, a timeline and a reason for the format.",
        ],
        [
          "full",
          "[[0|Question: Why do 40 percent of Yellow View sophomores miss lunch, and what can the school do about it?]] [[1|Sources: the school's lunch data, interviews with the cafeteria manager, three students and a nutritionist.]] [[2|Week 1: get the data; week 2: interviews; week 3: draft the story; week 4: fact-check and publish.]] [[3|A podcast would work well because the interviews give the voices of students directly.]]",
          "Full marks. Choosing a podcast for the interview voices is a good match.",
        ],
        [
          "partial",
          "[[0|My question is about lunch.]] [[1|I'd talk to students, the principal and look at data.]] Week 1 do the research and week 2 write it up. A story is the format.",
          "Make the question focused and answerable, and add milestones for all four weeks. Explain why a story is the best format.",
        ],
        [
          "partial",
          "[[2|Week 1 survey, week 2 interviews, week 3 draft, week 4 edit.]] [[3|I'd use a podcast to hear voices.]] The question is: What is school like?",
          "'What is school like?' is too broad. Make the question focused, and list the sources you will use.",
          true,
        ],
        [
          "weak",
          "I will write about whatever I find interesting. I will ask my friends and publish it when I am done.",
          "A project needs a focused question, planned sources and a timeline.",
        ],
        [
          "weak",
          "[[1|I'd interview students.]] The question doesn't matter as long as the story is long, and no timeline is needed.",
          "A focused question and a timeline help you finish on time.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Interviews, documents, fact-checking and attribution",
  note: `
## Objectives

Students will be able to:

1. gather information from interviews and documents, check facts and attribute sources properly;
2. conduct an interview with prepared questions and follow-ups, and report the answers fairly.

## Materials

A sample budget document (invented), a recorded interview clip or transcript, an interview planning sheet, fact-checking checklist, role-play cards, the quiz.

## Starter (6 minutes)

Role-play two interviews: one with only yes-or-no questions, one with open questions. Ask: "Which interview gave you a story? Why?" Discuss open-ended questions and follow-ups.

## Main activity

1. Preparing: research first, write 8 to 10 open questions (how, why, what happened, what next), order them from easy to sensitive, know your main question, and ask permission to record. Questions to avoid: yes-or-no, leading, double-barreled.
2. During: listen more than you talk, ask follow-ups ("Can you give an example?" "What did you mean by...?"), confirm names and spellings, take accurate quotes, and ask "Is there anything I haven't asked?"
3. Attribution: use "said," "according to"; on the record (can be quoted with name), on background, off the record (cannot be used), and why reporters ask for named sources. Quote accurately; paraphrase fairly; never change a quote's meaning.
4. Documents and fact-checking: use official documents (budgets, minutes, test results). Check names, titles, numbers, dates, spelling; confirm with a second source; call back to verify; keep notes.

## Checking for understanding

Ask: "What is wrong with the question 'Don't you think the lunch is terrible?'"

## Quiz

Interview questions, attribution and fact-checking.
`,
  reading: [
    "Asking, listening, checking",
    `
Interviews are the heart of reporting. Good interviews begin with **preparation**. Research the person and the topic first so that you do not waste time on basic facts. Write eight to ten **open-ended questions** that begin with how, why, what or tell me about. Avoid **yes-or-no** questions ("Do you like the new schedule?"), **leading** questions ("Don't you think the new schedule is terrible?") and **double-barreled** questions that ask two things at once ("How do you feel about the schedule and the new gym?"). Instead ask: "How has the new schedule changed your day?" Order the questions from easy to sensitive, and decide on the one question that you must have answered. Ask for permission to record, and tell the person what the story is about.

During the interview, **listen more than you talk**. Ask **follow-up questions** when something interesting or unclear comes up: "Can you give me an example?" "What did you mean by 'it's been hard'?" "What happened next?" Confirm the spelling of the person's name and the exact title. Write down key quotes word for word, and use pauses to let the person continue. Finish with: "Is there anything I haven't asked that you think I should know?"

**Attribution** tells the reader where the information came from. Use **said** for quotes: "'We cut the budget by 8 percent,' Principal Maria Lopez said." For information from a document, use "according to": "According to the district budget, the cafeteria spent $212,000 last year." Be clear on the ground rules. **On the record** means that the person can be quoted by name. **On background** means that the information can be used without naming the source. **Off the record** means that the information cannot be published. Agree on the rules before the interview. Named sources are best because readers can judge their credibility. Quote accurately; if you change a word, you change the quote. Paraphrase fairly. Never change the meaning.

**Documents** are a second source of information: budgets, meeting minutes, test results and policies. They can confirm what people tell you and can reveal facts no one mentioned. Finally, **fact-check** everything: names, titles, numbers, dates and the spelling of every word. Confirm important claims with a second source. Re-read your notes against the story. A single error can damage the credibility of the whole piece, and the credibility of the publication. Many newsrooms follow the rule: "If your mother says she loves you, check it out."
`,
  ],
  cards: [
    ["Open-ended question", "A question that needs more than yes or no."],
    ["Leading question", "A question that suggests the answer the interviewer wants."],
    ["Follow-up question", "A question that goes deeper based on the answer."],
    ["On the record", "The person may be quoted by name."],
    ["Off the record", "Information that cannot be published."],
    ["According to", "A phrase to attribute information to a document or source."],
    ["Fact-checking", "Verifying names, numbers, dates and claims."],
    ["Second source", "A separate source used to confirm a fact."],
  ],
  closed: [
    [
      "Which is an open-ended question?",
      ["Do you like the new schedule?", "How has the new schedule changed your day?", "Is the schedule bad?", "Isn't the schedule awful?"],
      "B",
    ],
    [
      "A source says something is \"off the record.\" This means you:",
      ["May publish the name", "May not publish it", "May quote it later", "Must record it"],
      "B",
    ],
    [
      "Which is a leading question?",
      ["Why did the board change the schedule?", "Don't you think the new schedule is terrible?", "What happened at the meeting?", "How many students attended?"],
      "B",
    ],
    [
      "Which is the best way to attribute a figure from a budget document?",
      ["The budget is huge.", "According to the district budget, the cafeteria spent $212,000 last year.", "Everyone says the cafeteria spends a lot.", "The cafeteria obviously spent too much."],
      "B",
    ],
    [
      "Why should a reporter confirm important claims with a second source?",
      ["To make the story longer", "To check accuracy and protect credibility", "To get more quotes", "To avoid attribution"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "You will interview the cafeteria manager for a story about why many Yellow View students skip lunch. Write eight questions in order. They should be open-ended, include at least two follow-ups you might ask depending on the answer, and avoid leading, yes-or-no and double-barreled questions. Identify one question you must have answered.",
      scheme: [
        "Writes at least six open-ended questions beginning with how, why, what or tell me about",
        "Avoids leading, yes-or-no and double-barreled questions",
        "Includes at least two follow-up questions linked to possible answers",
        "Identifies the one must-answer question and orders the questions from easy to sensitive",
      ],
      model:
        "1. How long have you managed the cafeteria? 2. What does a typical lunch period look like? 3. How many students eat lunch each day? 4. Why do you think some students skip lunch? 5. What have you noticed about the lines? 6. What changes have you tried? Follow-ups: Can you give an example? What did you do next? Must-answer: Why do you think some students skip lunch?",
      answers: [
        [
          "full",
          "[[0|1. How long have you managed the cafeteria? 2. What does a typical lunch period look like? 3. How many students eat lunch each day? 4. Why do you think some students skip lunch? 5. What changes have you tried? 6. How do students react to the menu?]] [[1|None of these are leading, yes-or-no or double-barreled.]] [[2|Follow-ups: Can you give me an example? What happened after you tried that?]] [[3|The must-answer question is number 4, and I put easier questions first.]]",
          "Full marks. The questions are open, ordered and include follow-ups.",
        ],
        [
          "full",
          "[[0|Tell me about a typical lunch period. How long do students have to eat? What are the lines like? Why do you think some students skip lunch? What have you heard from students about the food? What would you change if you could?]] [[1|I avoided yes-or-no and leading questions.]] [[2|Follow-ups I may ask: What did you mean by that? Who told you that?]] [[3|My key question is: Why do you think some students skip lunch? It comes after the easier ones.]]",
          "Full marks. Using 'tell me about' is a classic open-ended opening.",
        ],
        [
          "partial",
          "[[0|1. How long have you worked here? 2. What is a typical lunch like? 3. Why do students skip lunch?]] 4. Don't you think the food is bad? 5. Do students like the pizza? [[3|My key question is number 3.]]",
          "Question 4 is leading and question 5 is yes-or-no. Rewrite them, and add at least two follow-ups.",
        ],
        [
          "partial",
          "[[2|Follow-ups: Can you give an example? What happened next?]] [[3|Must-answer: Why do students skip lunch?]] 1. Do you like your job? 2. Is the lunch period too short and is the food good?",
          "Question 1 is yes-or-no and question 2 asks two things. Write at least six open-ended questions.",
          true,
        ],
        [
          "weak",
          "Do students skip lunch? Is the food bad? Do you like pizza? Are the lines long? Is the lunch period short?",
          "These are all yes-or-no questions. Rewrite them as open-ended questions beginning with how, why, what or tell me about.",
        ],
        [
          "weak",
          "[[0|What is a typical day like?]] I'll make sure the manager agrees with me by asking, 'You agree that the food is terrible, right?'",
          "That is a leading question. A neutral question lets the source speak freely.",
        ],
      ],
    },
    {
      prompt:
        "Rewrite each statement with correct attribution, and explain the difference between on the record, on background and off the record. (1) The cafeteria spent $212,000 last year (from a district budget). (2) \"We have cut costs by 8 percent\" (said by Principal Maria Lopez). (3) A teacher tells you privately that the lunch period is too short and asks not to be named.",
      scheme: [
        "Attributes (1) to the document with according to the district budget",
        "Attributes (2) to the principal with said",
        "Explains that the teacher's request means the information is on background or off the record and the name cannot be published",
        "Explains the three ground rules correctly (on the record can be named, on background can be used without naming, off the record cannot be used)",
      ],
      model:
        "(1) According to the district budget, the cafeteria spent $212,000 last year. (2) \"We have cut costs by 8 percent,\" Principal Maria Lopez said. (3) If the teacher asks not to be named, the information is on background and the teacher cannot be named; if it is off the record, it cannot be used at all. On the record means the person can be quoted by name; on background means the information can be used without naming the source; off the record means it cannot be published.",
      answers: [
        [
          "full",
          "(1) [[0|According to the district budget, the cafeteria spent $212,000 last year.]] (2) [[1|\"We have cut costs by 8 percent,\" Principal Maria Lopez said.]] (3) [[2|The teacher asked not to be named, so I can use the information on background without the name, or not at all if it is off the record.]] [[3|On the record means I can quote and name the person, on background means I can use the information but not name the source, and off the record means I can't publish it.]]",
          "Full marks. The attributions are in correct form and the ground rules are explained.",
        ],
        [
          "full",
          "(1) [[0|The cafeteria spent $212,000 last year, according to the district budget.]] (2) [[1|Principal Maria Lopez said the school has cut costs by 8 percent.]] (3) [[2|Because the teacher asked for anonymity, I'd confirm the ground rules first; if on background, I can print the claim without naming her.]] [[3|On the record: usable with a name; on background: usable without a name; off the record: not usable.]]",
          "Full marks. Confirming the ground rules before using the information is good practice.",
        ],
        [
          "partial",
          "(1) [[0|According to the district budget, the cafeteria spent $212,000.]] (2) Principal Lopez claimed they cut costs 8 percent. (3) I'd print the teacher's name anyway. [[3|On the record means the source can be named.]]",
          "Use 'said' instead of 'claimed,' and do not name the teacher after she asked not to be named.",
        ],
        [
          "partial",
          "(1) The cafeteria spent a lot. (2) [[1|\"We have cut costs by 8 percent,\" Principal Maria Lopez said.]] (3) [[2|The teacher should not be named.]]",
          "Attribute the figure in (1) to the budget and give the exact number. Explain the three ground rules.",
          true,
        ],
        [
          "weak",
          "(1) The cafeteria spent $212,000. (2) The principal said they cut costs. (3) I'd publish the teacher's name since the information is true.",
          "A source's request not to be named should be respected. Attribute the figure to the budget.",
        ],
        [
          "weak",
          "[[1|Principal Lopez said that they cut costs by 8 percent.]] Off the record means that I can use the information as long as I don't say who it came from.",
          "Off the record means that the information cannot be published. 'Not named' describes on background.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Broadcast and podcast segments, and AP style",
  note: `
## Objectives

Students will be able to:

1. present a short broadcast or podcast segment with a clear structure and a steady delivery;
2. apply Associated Press style conventions for numbers, titles and attribution.

## Materials

A one-page AP style cheat sheet (invented examples), a broadcast script template, a microphone or recording app, a timer, the problem set.

## Starter (6 minutes)

Read the same sentence aloud twice, once written for print ("Principal Maria Lopez, 52, announced Tuesday that the 2025-26 school budget, which totals $48.2 million, will include a 3.1 percent increase.") and once for the ear. Ask: "Which version is easier to follow when you only hear it?"

## Main activity

1. Writing for the ear: short sentences, one idea each, conversational words, present or present perfect tense, round numbers ("nearly 50 million dollars"), attribution first ("Principal Maria Lopez says the budget will grow"), and spelled-out pronunciation guides for hard names. Read it aloud before recording.
2. Structure of a 60-second segment: a hook, a main point, one voice or fact, a close that tells what happens next.
3. Delivery: pace (about 150 words a minute), pauses, breath, emphasis, a clear voice, and a steady rhythm. Record and replay.
4. AP style: numbers one through nine are spelled out, 10 and above are numerals; ages always numerals; percent spelled out with numerals (3.1 percent); titles capitalized before names (Principal Maria Lopez) and lowercase after (Maria Lopez, principal of Yellow View); months abbreviated with a specific date (Oct. 12) but spelled out alone (October); states: Columbus, Ohio; attribution with said.

## Checking for understanding

Ask: "How do you write 'seven' and '12' in AP style? What about an age?"

## Problem set

AP style editing and a broadcast script.
`,
  reading: [
    "Writing for the ear, and the rules that keep copy consistent",
    `
Broadcast and podcast writing is written to be heard, not read. A listener cannot go back and re-read a sentence, so every sentence must be clear the first time. Follow a few rules. Use **short sentences**, with one idea each. Use **conversational words**, as if you were telling a friend. Put the **attribution first**: "Principal Maria Lopez says the school will add a new bus route," rather than "A new bus route will be added, Principal Maria Lopez says." Use **present or present perfect tense** for recent news ("says," "has approved") to give it immediacy. **Round numbers** so the listener can follow: say "nearly 50 million dollars" instead of "$48,212,306." Avoid long strings of names and titles. For difficult names, write a **pronunciation guide** in the script. Always read your script aloud before recording; if you stumble, rewrite.

A 60-second segment has a clear **structure**: a **hook** that gets attention in the first sentence, a **main point** that states the news, a **supporting voice or fact** (a short sound bite or a number), and a **close** that tells the listener what happens next. For example: "Yellow View students could be starting school an hour later next fall. The school board voted five to two Tuesday night to move the first bell to 8:15. Board president Elena Ruiz says research shows teens do better with more sleep. The change takes effect in August, and families will get a letter with details next month." The script is about 55 words, which is roughly 20 seconds at a normal pace. Aim for about 150 words a minute, with pauses at the ends of sentences and a breath before each new idea. Vary your pitch so you do not sound flat, and emphasize the key words. Record yourself and listen to the pace, volume and clarity.

Whether you are writing for the screen or the microphone, consistency matters. The **Associated Press Stylebook** is the style guide that most American newsrooms follow. A few key rules: Spell out the numbers **one through nine** and use numerals for **10 and above** (seven students, 12 teachers). Ages are always numerals (a 16-year-old student, Maria Lopez, 52). Use numerals with the word **percent** (3.1 percent). **Capitalize a formal title before a name** and lowercase it after: "Principal Maria Lopez," but "Maria Lopez, principal of Yellow View." **Abbreviate** months with a specific date: **Oct. 12**, but write October alone ("in October"). The months March, April, May, June and July are never abbreviated. Write a city and a state as "Columbus, Ohio." Use **said** for attribution. Consistent style makes the work look professional and helps readers focus on the content and not on the inconsistencies.
`,
  ],
  cards: [
    ["Writing for the ear", "Short sentences, conversational words and attribution first."],
    ["Sound bite", "A short recorded quote used in a broadcast."],
    ["Pronunciation guide", "A respelling of a hard name in a script."],
    ["150 words per minute", "A normal pace for broadcast reading."],
    ["AP numbers", "Spell out one through nine; use numerals for 10 and above."],
    ["AP ages", "Always use numerals."],
    ["AP titles", "Capitalize before a name; lowercase after."],
    ["AP dates", "Abbreviate months with a specific date, such as Oct. 12."],
  ],
  closed: [
    [
      "In AP style, which is correct?",
      ["7 students and twelve teachers", "Seven students and 12 teachers", "seven students and twelve teachers", "7 students and 12 teachers"],
      "B",
    ],
    [
      "Which sentence uses AP style for a title?",
      ["Maria Lopez, Principal, spoke.", "Principal Maria Lopez spoke.", "Maria Lopez, Principal, spoke today.", "The Principal Maria Lopez spoke."],
      "B",
    ],
    [
      "Which is the best broadcast style for the amount $48,212,306?",
      ["$48,212,306", "nearly 50 million dollars", "forty-eight million two hundred twelve thousand", "about $48.2m"],
      "B",
    ],
    [
      "How should the date October 12 be written in AP style?",
      ["October 12", "Oct. 12", "10/12", "Oct 12th"],
      "B",
    ],
    [
      "A good pace for reading a broadcast script is about:",
      ["50 words per minute", "150 words per minute", "300 words per minute", "500 words per minute"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Rewrite this print sentence for a 20-second podcast segment: \"Principal Maria Lopez, 52, announced Tuesday that the 2025-26 school budget, which totals $48,212,306, will include a 3.1 percent increase in funding for transportation, according to a document released by the district.\" Use short sentences, attribution first, rounded numbers and an easy structure. Then say why each change helps the listener.",
      scheme: [
        "Splits the sentence into shorter sentences, each with one idea",
        "Puts the attribution first (Principal Maria Lopez says...)",
        "Rounds the numbers for the ear (nearly 50 million dollars, about 3 percent)",
        "Explains that listeners cannot re-read, so clarity, rounding and attribution first help them follow",
      ],
      model:
        "Principal Maria Lopez says next year's school budget will grow. The budget is nearly 50 million dollars. About 3 percent more will go to buses. The district released the numbers Tuesday. Listeners cannot go back and re-read, so short sentences, rounded numbers and attribution first make it easier to follow.",
      answers: [
        [
          "full",
          "[[0|Principal Maria Lopez says next year's school budget will grow.]] [[1|She says more money will go to buses.]] [[2|The budget is nearly 50 million dollars, and about 3 percent more will go to transportation.]] [[3|Short sentences, rounded numbers and the speaker first make it easier to follow because listeners can't re-read.]]",
          "Full marks. Each change is explained by the needs of a listener.",
        ],
        [
          "full",
          "[[0|Yellow View's budget is going up. Principal Maria Lopez says it will include more money for buses.]] [[1|The district released the plan Tuesday.]] [[2|The total is close to 48 million dollars, with transportation up about 3 percent.]] [[3|I split the long sentence, rounded the numbers and put the source first, because a listener only hears the sentence once.]]",
          "Full marks. 'Only hears the sentence once' is the key reason.",
        ],
        [
          "partial",
          "[[0|Principal Maria Lopez says the budget will increase.]] [[2|It is 48,212,306 dollars with 3.1 percent for transportation.]] The district released a document.",
          "Round the numbers for the ear. 48,212,306 is hard to follow when spoken: say nearly 50 million dollars.",
        ],
        [
          "partial",
          "[[1|Bus money will go up about 3 percent.]] [[3|Listeners can't re-read.]] Principal Maria Lopez, 52, announced Tuesday.",
          "Leave out details that don't help the listener, such as her age. Put the attribution first and round the main number.",
          true,
        ],
        [
          "weak",
          "Principal Maria Lopez, 52, announced Tuesday that the 2025-26 school budget, which totals $48,212,306, will include a 3.1 percent increase in funding for transportation.",
          "That is the print sentence. Break it into short sentences for the ear.",
        ],
        [
          "weak",
          "[[0|Principal Maria Lopez says the budget will grow.]] Listeners prefer long sentences with many details so that they get all the information.",
          "Listeners cannot go back, so short sentences with one idea each work better.",
        ],
      ],
    },
    {
      prompt:
        "Edit these sentences to AP style: (1) \"There were 7 students and twelve teachers at the October 12th meeting.\" (2) \"principal Maria Lopez, age fifty-two, said the budget grew by 3.1%.\" (3) \"The meeting was held in Columbus Ohio on September twenty-fourth.\" Rewrite each sentence correctly and name the rule.",
      scheme: [
        "Corrects (1) to seven students, 12 teachers and Oct. 12",
        "Corrects (2) to Principal Maria Lopez, 52, said the budget grew by 3.1 percent",
        "Corrects (3) to Columbus, Ohio, and Sept. 24",
        "Names at least three AP rules applied (numbers, titles, ages, percent, month abbreviations, state names)",
      ],
      model:
        "(1) There were seven students and 12 teachers at the Oct. 12 meeting. (2) Principal Maria Lopez, 52, said the budget grew by 3.1 percent. (3) The meeting was held in Columbus, Ohio, on Sept. 24. Rules: spell out one through nine; numerals for 10 and above; ages are numerals; capitalize titles before names; percent is spelled out; abbreviate months with dates.",
      answers: [
        [
          "full",
          "(1) [[0|There were seven students and 12 teachers at the Oct. 12 meeting.]] (2) [[1|Principal Maria Lopez, 52, said the budget grew by 3.1 percent.]] (3) [[2|The meeting was held in Columbus, Ohio, on Sept. 24.]] [[3|Rules: spell out one through nine, use numerals for 10 and up and for ages, capitalize the title before the name, spell out percent, and abbreviate months with dates.]]",
          "Full marks. All three sentences are corrected and the rules are named.",
        ],
        [
          "full",
          "(1) [[0|Seven students and 12 teachers attended the Oct. 12 meeting.]] (2) [[1|Principal Maria Lopez, 52, said the budget increased 3.1 percent.]] (3) [[2|The meeting took place Sept. 24 in Columbus, Ohio.]] [[3|AP rules used: numbers under 10 are spelled out, ages are numerals, titles before names are capitalized, percent is a word, Sept. is abbreviated with a date and the state name follows the city.]]",
          "Full marks. Rewording also tightened the sentences.",
        ],
        [
          "partial",
          "(1) [[0|There were seven students and 12 teachers at the Oct. 12 meeting.]] (2) Principal Maria Lopez, age 52, said the budget grew 3.1%. (3) The meeting was in Columbus, Ohio, on September 24th. [[3|I used the rule for numbers.]]",
          "Use percent instead of the symbol, and write Sept. 24 without th. Name more of the rules you applied.",
        ],
        [
          "partial",
          "(1) There were 7 students and 12 teachers at the October 12th meeting. (2) [[1|Principal Maria Lopez, 52, said the budget grew by 3.1 percent.]] (3) [[2|The meeting was in Columbus, Ohio, on Sept. 24.]]",
          "In (1), spell out seven and write Oct. 12. Your corrections in (2) and (3) are right.",
          true,
        ],
        [
          "weak",
          "They are all fine, because AP style is only a suggestion and it doesn't matter.",
          "AP style provides consistency in newsrooms. Apply the rules to each sentence.",
        ],
        [
          "weak",
          "[[1|Principal Maria Lopez, 52, said the budget grew by 3.1 percent.]] The state should be abbreviated as OH in every story.",
          "AP style spells out Ohio when it follows a city: Columbus, Ohio.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Editing copy and writing in plain language",
  note: `
## Objectives

Students will be able to:

1. edit copy for grammar, spelling and punctuation to a publishable standard;
2. choose precise, plain language over jargon when writing for a general audience.

## Materials

A short article with planted errors, a list of editing marks, a jargon-to-plain-language chart, a copy editing checklist, the worksheet.

## Starter (6 minutes)

Show a paragraph with errors and ask students to find as many as they can in 90 seconds: "The principals announcement effected over 200 student's." Discuss how a few errors can cost a publication its credibility.

## Main activity

1. Editing for correctness: subject-verb agreement, pronoun agreement, apostrophes (its / it's; possessives with students' vs student's), commas (series, after introductory phrases, around nonessential clauses), homophones (affect / effect, their / there / they're), spelling of names, consistency.
2. Editing for clarity: cut wordiness ("in order to" becomes "to"), prefer active voice ("The board approved the plan" over "The plan was approved by the board"), choose strong verbs, remove redundancy ("past history," "free gift").
3. Plain language: replace jargon with plain words for a general audience: "utilize" becomes "use," "individuals" becomes "people," "commence" becomes "begin," "stakeholders" becomes "parents and teachers," "implement" becomes "start." Explain technical terms when they are needed.
4. Practice: edit a 150-word article and then swap with a partner for a second read.

## Checking for understanding

Ask: "Which is better for a general audience, 'utilize' or 'use'? Why?"

## Worksheet

Copy editing and plain-language rewriting.
`,
  reading: [
    "The last read: making copy correct and clear",
    `
A story is not finished when the writer finishes. It must be edited. Editing happens in layers. First comes **correctness**: grammar, spelling and punctuation. A few common problems recur in student copy. **Subject-verb agreement**: "The team of students **is** winning," not "are winning," because the subject is team. **Pronoun agreement**: "Each student should bring **his or her** lunch" or, more simply, "Students should bring **their** lunches." **Apostrophes**: **it's** means "it is" and **its** shows possession; **students'** shows possession by many students, and **student's** by one. **Commas**: use them to separate items in a series, after an introductory phrase ("After the vote, the board adjourned"), and around nonessential clauses ("Principal Maria Lopez, who joined the school in 2019, said..."). **Homophones**: **affect** is usually a verb ("The change will affect students") and **effect** is usually a noun ("The effect was immediate"); **their** shows possession, **there** shows place and **they're** means "they are." Check every name against a reliable source: a misspelled name is among the most upsetting mistakes for readers and sources. Keep your style consistent with AP.

The second layer is **clarity**. Cut **wordiness**: "in order to" becomes "to," "due to the fact that" becomes "because," "at this point in time" becomes "now." Prefer the **active voice**: "The board approved the plan" is shorter and more direct than "The plan was approved by the board." Choose **strong verbs** over weak verbs plus adverbs. Remove **redundancy** such as "past history," "free gift," "completely finished" or "future plans."

The third layer is **plain language**. A news story is written for the general reader, who may not know the specialist words of education, government or science. Replace **jargon** with plain words: **utilize** becomes **use**; **individuals** becomes **people**; **commence** becomes **begin**; **stakeholders** becomes **parents and teachers**; **implement** becomes **start**; **fiscal year** can become **budget year**. When a technical term is necessary, define it the first time: "The district uses a levy, a tax that voters must approve, to pay for the new gym." Good journalism respects the reader's time and intelligence. A sentence like "The administration will utilize a multi-faceted approach to optimize the learning environment" says nothing, whereas "The school will add tutors and open the library after school" says something the reader can picture.

Finally, read your piece aloud and have someone else read it. Fresh eyes catch errors that the writer misses, and the effort to be correct and clear is what separates a published piece from a draft.
`,
  ],
  cards: [
    ["Subject-verb agreement", "A verb matches its subject in number."],
    ["its / it's", "Possessive / it is."],
    ["students' / student's", "Possessive of many students / of one student."],
    ["affect / effect", "Usually a verb meaning to influence / usually a noun meaning a result."],
    ["Active voice", "The subject does the action: The board approved the plan."],
    ["Redundancy", "Saying the same thing twice, such as past history."],
    ["Jargon", "Specialized words that a general reader may not know."],
    ["Plain language", "Clear, simple wording suited to a general audience."],
  ],
  closed: [
    [
      "Which sentence is correct?",
      ["The team of students are winning.", "The team of students is winning.", "The team of students be winning.", "The team of students were winning now."],
      "B",
    ],
    [
      "Which is the plain-language replacement for \"utilize\"?",
      ["use", "utility", "commence", "implement"],
      "A",
    ],
    [
      "Choose the correct word: \"The new schedule will ___ every student.\"",
      ["effect", "affect", "effects", "affects"],
      "B",
    ],
    [
      "Which sentence is in the active voice?",
      ["The plan was approved by the board.", "The board approved the plan.", "The plan has been approved.", "Approval was given."],
      "B",
    ],
    [
      "Which is a redundancy?",
      ["past history", "history", "recent history", "history class"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Edit this paragraph for grammar, punctuation and clarity, and rewrite it: \"The principals announcement effected over 200 student's on Tuesday. In order to utilize the new bus routes individuals will need to commence registering. Its important that everyone read there email.\" Identify at least five corrections you made.",
      scheme: [
        "Corrects the apostrophe errors (principal's, students, It's)",
        "Corrects the word-choice errors (affected, their)",
        "Replaces jargon and wordiness (use, people, start, to)",
        "Produces a clear, correct rewrite and identifies at least five corrections",
      ],
      model:
        "The principal's announcement affected more than 200 students on Tuesday. To use the new bus routes, people will need to start registering. It's important that everyone read their email. Corrections: principals to principal's, effected to affected, student's to students, in order to utilize to to use, individuals to people, commence to start, Its to It's, there to their.",
      answers: [
        [
          "full",
          "[[0|The principal's announcement affected more than 200 students on Tuesday. It's important that everyone read their email.]] [[1|I changed 'effected' to 'affected,' 'there' to 'their,' and 'principals' to 'principal's.']] [[2|To use the new bus routes, people will need to start registering. I replaced 'in order to utilize' with 'to use,' 'individuals' with 'people,' and 'commence' with 'start.']] [[3|The rewrite is correct and clearer, with eight corrections in all, including 'student's' to 'students' and 'Its' to 'It's.']]",
          "Full marks. You fixed grammar and plain language and explained the corrections.",
        ],
        [
          "full",
          "[[0|The principal's announcement Tuesday affected more than 200 students. It's important to read your email.]] [[1|Corrections: effected to affected, student's to students, Its to It's, there to their.]] [[2|To use the new bus routes, families need to begin registering. I cut 'in order,' replaced 'utilize' with 'use' and 'individuals' with 'families.']] [[3|That is at least eight changes, and the paragraph is now shorter and plainer.]]",
          "Full marks. Replacing 'individuals' with 'families' fits the context well.",
        ],
        [
          "partial",
          "[[0|The principal's announcement affected over 200 students on Tuesday.]] [[1|I fixed 'effected' and 'student's.']] In order to use the new bus routes individuals must commence registering. Its important to read their email.",
          "You left 'in order to utilize,' 'individuals,' 'commence' and 'Its.' Fix the jargon and the contraction.",
        ],
        [
          "partial",
          "[[2|To use the new bus routes, people will need to start registering.]] [[3|I made five corrections.]] The principals announcement effected over 200 students.",
          "'Principals' needs an apostrophe (principal's) and 'effected' should be 'affected.' List the corrections you made.",
          true,
        ],
        [
          "weak",
          "The paragraph is fine as it is. Jargon makes it sound professional.",
          "Jargon makes writing harder for general readers. Edit for plain language.",
        ],
        [
          "weak",
          "[[1|Effected should be affected.]] I would make the paragraph longer by adding more big words so that it sounds smart.",
          "Good editing makes copy shorter and clearer, not longer and more complex.",
        ],
      ],
    },
    {
      prompt:
        "Rewrite each sentence in plain, active language and explain what you changed: (1) \"The decision was made by the administration to implement a new policy regarding the utilization of mobile devices.\" (2) \"At this point in time, the school is in the process of commencing renovations.\" (3) \"Stakeholders are encouraged to provide feedback in order to optimize outcomes.\"",
      scheme: [
        "Rewrites (1) in the active voice with plain words, such as The school started a new cell phone policy",
        "Rewrites (2) concisely, such as The school is starting renovations now",
        "Rewrites (3) with plain words, such as Parents and teachers can share their ideas",
        "Explains the changes, such as active voice, cutting wordiness and replacing jargon",
      ],
      model:
        "(1) The school adopted a new cell phone policy. (2) The school is starting renovations now. (3) Parents and teachers are invited to share their ideas. I changed the passive voice to active, cut wordy phrases such as at this point in time and in the process of, and replaced jargon like implement, utilization, commence, stakeholders and optimize outcomes with plain words.",
      answers: [
        [
          "full",
          "(1) [[0|The school adopted a new policy on cell phones.]] (2) [[1|The school is starting renovations now.]] (3) [[2|Parents and teachers are invited to share their ideas.]] [[3|I used the active voice, cut phrases like 'at this point in time,' and replaced jargon like 'utilization,' 'commencing,' 'stakeholders' and 'optimize outcomes' with plain words.]]",
          "Full marks. Each rewrite is shorter, plainer and active, and you explained the changes.",
        ],
        [
          "full",
          "(1) [[0|Administrators started a new cell phone policy.]] (2) [[1|Renovations at the school begin now.]] (3) [[2|The school wants parents and teachers to send comments.]] [[3|I cut wordiness, changed passive sentences to active ones and swapped abstract terms such as 'stakeholders' for the real groups.]]",
          "Full marks. Naming the real groups in place of 'stakeholders' is exactly the point of plain language.",
        ],
        [
          "partial",
          "(1) [[0|The administration made a new phone policy.]] (2) At this point in time, the school is starting renovations. (3) Stakeholders can give feedback. [[3|I made them shorter.]]",
          "Cut 'at this point in time' and replace 'stakeholders' with the real groups. Explain more of the changes.",
        ],
        [
          "partial",
          "(1) The decision was made to start a new phone policy. (2) [[1|The school is starting renovations now.]] (3) [[2|Parents and teachers are asked for their ideas.]]",
          "In (1), 'the decision was made' is passive; say who decided. Name the rules you used.",
          true,
        ],
        [
          "weak",
          "They are already clear. I would keep them because they sound formal.",
          "These sentences are wordy and use jargon. Rewrite them plainly.",
        ],
        [
          "weak",
          "[[1|The school is starting renovations now.]] I would make (1) and (3) longer so they sound more professional.",
          "Longer is not clearer. Use active voice and plain words.",
        ],
      ],
    },
  ],
};

writeCourse("journalism-grade-11.json", "Journalism", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
