import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * AP English Language and Composition, Grade 11, Quarter 1. Framed by the
 * College Board's course units (rhetorical situation, claims and evidence,
 * reasoning and organization, synthesis, style, and writing practice), with
 * fresh passages and prompts written for this course. Public-domain speeches:
 * Susan B. Anthony (1873), Franklin D. Roosevelt (1941).
 */

const w1: WeekInput = {
  topic: "The rhetorical situation: Susan B. Anthony's address of 1873",
  note: `
## Objectives

Students will be able to:

1. identify the exigence, audience, purpose and speaker in a text, and explain how they shape it;
2. explain how a writer's claim and line of reasoning respond to a rhetorical situation;
3. describe how the parts of a text, such as introduction, evidence and conclusion, serve the writer's purpose.

## Materials

Excerpts from Susan B. Anthony's speech "Is It a Crime for a Citizen of the United States to Vote?" (1873), the rhetorical-situation organizer (exigence, audience, purpose, speaker, context, message), and the line-of-reasoning map.

## Starter (8 minutes)

Display the first sentence: "Friends and fellow citizens: I stand before you tonight under indictment for the alleged crime of having voted at the last presidential election." Ask: "Who is speaking, to whom, and why now? What would change if she said this a year earlier?"

## Main activity

1. Brief context: Anthony voted in Rochester, New York, in November 1872, was arrested and indicted, and in 1873 toured Monroe County before her trial.
2. Complete the rhetorical-situation organizer in pairs. Distinguish exigence (the circumstance that calls for the speech) from purpose (what the speaker wants to accomplish).
3. Map the line of reasoning: premise (the Constitution begins "We, the people"), minor premise (women are people and citizens), conclusion (a state may not deny them the vote). Mark where she answers a possible objection.
4. Discuss: how do the opening, the evidence and the conclusion serve her purpose, which is to persuade potential jurors?

## Checking for understanding

Cold call: "State the exigence in one sentence. State the purpose in another."

## Exit ticket

One sentence that links Anthony's audience to one rhetorical choice.
`,
  reading: [
    "Why now, why you, why this: reading the rhetorical situation",
    `
Every text is a response. Before a writer chooses a single word, a situation has already shaped what can be said, to whom and with what chance of success. AP students call this the **rhetorical situation**, and a careful analysis begins by naming its parts. The **speaker** is the person or group creating the text, along with what credibility they bring. The **audience** is the people the speaker hopes to reach, which may differ from the people who actually read it. The **exigence** is the circumstance that makes the text necessary: the problem, event or need that prompts it. The **purpose** is what the speaker wants the audience to think, feel or do. The **context** is the time, place and conversation in which the text appears.

Susan B. Anthony's 1873 address is a model case. In November 1872, Anthony and a group of women in Rochester, New York, voted in the presidential election. She was arrested and indicted for voting unlawfully. Before her trial she traveled through the county giving a speech to the people who might sit on her jury. The exigence is her indictment and the coming trial. Her speaker's position is unusual: she is both an experienced reformer and a defendant, so she has authority and a stake. The audience is ordinary male voters, who in 1873 held the political power to decide her fate. The purpose is to persuade them that her vote was a lawful exercise of citizenship, and to prepare them to acquit her.

Her **line of reasoning** is the sequence of ideas that moves the audience from premise to conclusion. She starts with the preamble of the Constitution, which begins "We, the people," and argues that it was "we, the whole people" who formed the Union, not just white or male citizens. If women are people and citizens, and if the Constitution protects the privileges of citizens, then a state cannot deny them the vote. Notice that the argument does not depend on emotion alone. It rests on a text her audience already respects.

The parts of the speech serve this purpose. The opening is direct and ironic, since she introduces herself as accused of a crime she says she did not commit. The body proceeds through constitutional evidence. The conclusion warns that a government that denies half its people the vote is an "oligarchy," a rule by a privileged few. Each part moves the audience closer to a decision about her case.
`,
  ],
  cards: [
    ["Rhetorical situation", "The circumstances that shape a text: speaker, audience, purpose, exigence and context."],
    ["Exigence", "The event, problem or need that prompts the writer or speaker to respond."],
    ["Purpose", "What the speaker wants the audience to think, feel or do."],
    ["Audience (intended)", "The people the speaker hopes to reach with the message."],
    ["Line of reasoning", "The sequence of claims and reasons that leads an audience from premise to conclusion."],
    ["Claim", "A statement that the speaker asks the audience to accept."],
    ["Context", "The time, place and ongoing conversation surrounding a text."],
    ["Speaker's credibility", "The authority or trust a speaker brings to the topic."],
  ],
  closed: [
    [
      "What is the exigence of Anthony's 1873 speech?",
      [
        "The invention of the telephone",
        "Her indictment for voting and the coming trial",
        "The end of the Civil War",
        "A request from the school board",
      ],
      "B",
    ],
    [
      "Anthony's primary audience for the speech is best described as",
      [
        "Congress",
        "Ordinary male voters who might serve on a jury or influence the trial",
        "Foreign diplomats",
        "Her fellow defendants only",
      ],
      "B",
    ],
    [
      "Which statement best describes the difference between exigence and purpose?",
      [
        "They are the same thing.",
        "Exigence is the circumstance that calls for the text; purpose is what the speaker wants the audience to do or believe.",
        "Exigence is the conclusion; purpose is the introduction.",
        "Exigence is the audience; purpose is the speaker.",
      ],
      "B",
    ],
    [
      "Anthony's line of reasoning depends mainly on",
      [
        "personal stories alone",
        "the Constitution's language about the people, applied to women as citizens",
        "a ban on all voting",
        "an appeal to foreign law",
      ],
      "B",
    ],
    [
      "Which feature of the opening best serves her purpose?",
      [
        "A long list of statistics",
        "A direct, ironic statement that she stands accused of voting, which frames her act as a question for the audience to judge",
        "A joke about the trial",
        "An apology for voting",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how Anthony's rhetorical situation (her speaker position, audience and exigence) shapes the claim and reasoning she chooses in the 1873 address. Refer to at least two elements of the situation.",
      scheme: [
        "Identifies the exigence accurately (her indictment and coming trial)",
        "Identifies the audience or speaker position accurately",
        "Explains how one element shapes her choice of claim or reasoning",
        "Explains how a second element shapes a choice, with a specific reference to the speech",
      ],
      model:
        "The exigence is her indictment for voting, so she must defend the lawfulness of her act. Her audience is male voters in the county, who may sit on her jury, so she grounds her claim in the Constitution they respect instead of in an appeal for pity. As both reformer and defendant she has authority and a stake, which lets her speak as a citizen defending a right. Her argument that 'we, the whole people' formed the Union uses the preamble they accept to reach a conclusion they had not expected.",
      answers: [
        [
          "full",
          "[[0|The exigence is that she was indicted for voting, so the speech has to defend that act.]] [[1|Her audience is male voters in the county who may become the jury, and they are the ones who hold political power.]] [[2|Because of that, she bases her claim on the Constitution, which they already respect, instead of just asking for sympathy.]] [[3|She says it was we, the whole people, who formed the Union, which is an argument aimed at readers who believe in the founding document and would have a hard time denying its wording.]]",
          "Full marks. Each element of the situation is tied to a specific choice in the argument.",
        ],
        [
          "full",
          "[[0|She is responding to being arrested and tried for casting a vote.]] [[1|As a reformer and a defendant, she has authority, but she is also speaking to an audience that does not have to agree with her, since only men can vote and serve on juries.]] [[2|So she chooses a line of reasoning from the Constitution and not from women's feelings, because a man on a jury could accept legal logic more easily.]] [[3|She starts with the phrase we, the people and moves to the conclusion that women are citizens, so the audience arrives at her claim by their own accepted premise.]]",
          "All four marks. The point about logic being easier for a juror to accept shows genuine rhetorical analysis.",
        ],
        [
          "partial",
          "[[0|The exigence is her indictment for voting.]] [[1|The audience is men in the county.]] Her speech is persuasive.",
          "You identified two elements. Explain how each shapes her claim or reasoning, with a reference to the speech.",
        ],
        [
          "partial",
          "[[2|Her audience can sit on a jury, so she uses the Constitution.]] [[3|She says we, the whole people, formed the Union.]]",
          "Good link between audience and choice. Name the exigence clearly and explain how the quotation works.",
          true,
        ],
        [
          "weak",
          "The exigence is that women wanted to vote. Her audience is women who wanted to vote, so she talks about what women feel.",
          "Her audience is men who held power, and her argument is constitutional, not emotional. Reread the opening.",
        ],
        [
          "weak",
          "[[0|She was arrested for voting.]] The rhetorical situation is not important because the speech is famous.",
          "The situation explains the speech's choices. Ask how her audience and position shape her argument.",
        ],
      ],
    },
    {
      prompt:
        "Describe the line of reasoning in Anthony's argument that she had a right to vote. State her premise, the step that connects it to her situation, and her conclusion, and explain how the opening and the conclusion serve her purpose.",
      scheme: [
        "States the premise (the Constitution is made by 'we, the people')",
        "States the connecting step (women are people and citizens)",
        "States the conclusion (a state cannot deny them the vote)",
        "Explains how the opening or conclusion serves her purpose",
      ],
      model:
        "Her premise is that the Constitution was formed by 'we, the whole people.' The connecting step is that women are people and citizens, so they share the rights the Constitution protects. The conclusion is that a state cannot lawfully deny them the vote, so her vote was no crime. The opening, which presents her as accused of a crime, frames the trial as a question for the audience, and the conclusion warns of an oligarchy of sex, urging them to see themselves as defenders of equal citizenship.",
      answers: [
        [
          "full",
          "[[0|Her premise is that the Constitution was formed by we, the whole people and not just by men.]] [[1|The next step is that women are people and citizens, so they are included.]] [[2|She concludes that a state can't deny them the vote, which means that voting was not a crime.]] [[3|The opening says she is accused of a crime, which makes the audience judge the case as if they were jurors, and the ending warns about a government run by half the people, which makes them see the stakes.]]",
          "Full marks. You laid out the argument as premise, step and conclusion, then connected the ends to her purpose.",
        ],
        [
          "full",
          "[[0|She starts with the preamble and says it was the whole people who formed the union.]] [[1|Then she says women are part of the people because they are citizens.]] [[2|So no state can take away their right, and therefore her vote was lawful.]] [[3|The opening makes her sound like she is being tried unjustly, which fits her purpose of winning over the people who may be on a jury.]]",
          "All four marks. You noticed that the opening frames her as wrongly accused.",
        ],
        [
          "partial",
          "[[0|Her premise is that the Constitution is for the whole people.]] [[2|Her conclusion is that women can vote.]] She is brave.",
          "Premise and conclusion are right. State the step that connects them and explain how the opening or ending serves her purpose.",
        ],
        [
          "partial",
          "[[1|She says women are citizens and so they have the same rights.]] [[3|The opening makes it a trial of the law itself.]]",
          "Strong link and purpose. Give her premise and her explicit conclusion.",
          true,
        ],
        [
          "weak",
          "She argues that voting is dangerous so it should be banned for everyone. Her conclusion is that no one should vote.",
          "Anthony argues for equal voting rights. Reread her claim about the Constitution.",
        ],
        [
          "weak",
          "[[0|She starts with the Constitution.]] She doesn't have a line of reasoning, she just says things.",
          "Her speech has a clear sequence. Look at how she moves from the preamble to the conclusion.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Writing a defensible thesis, and judging claims and evidence",
  note: `
## Objectives

Students will be able to:

1. write a thesis that takes a defensible position on a rhetorical analysis prompt;
2. distinguish a claim from the evidence offered for it, and judge whether the evidence is relevant and sufficient.

## Materials

An original passage on the four-day school week (printed in the reading), a thesis-sorting activity (descriptive, restating, defensible), and an evidence evaluation chart (relevant, sufficient, representative).

## Starter (8 minutes)

Write on the board: "The writer uses a lot of rhetorical strategies." Ask: "What is wrong with this as a thesis? What would you have to add so that someone could disagree?"

## Main activity

1. Sort twelve thesis statements into restate-the-prompt, descriptive-only (names strategies without saying why), and defensible (makes an arguable claim about how the choices serve a purpose).
2. Revise two weak theses together. Show the formula: the writer [does X] in order to [purpose], thereby [effect on audience].
3. Evidence evaluation. Using the passage on the four-day school week, students separate claims from evidence and rate each piece of evidence: relevant? sufficient? representative? A single anecdote supports a claim differently from a district's two-year attendance data.
4. Write a one-sentence thesis on the passage and swap for feedback.

## Checking for understanding

Whiteboards: show a thesis and hold up a number for its category.

## Exit ticket

Write a defensible thesis for the passage, then name the weakest piece of evidence in it.
`,
  reading: [
    "A thesis you can argue with, and evidence you can weigh",
    `
On a rhetorical analysis question, a thesis is not a summary and not a list of devices. It is a claim about how the writer's choices accomplish a purpose for an audience. The College Board's scoring guide awards the thesis point to responses that make a defensible interpretation, not merely restating the prompt or describing the passage. "The author uses imagery, diction and syntax to make her point" is a description. "By pairing precise local data with a parent's quiet anecdote, the writer reassures skeptical families that a shorter week need not cost their children learning" is a claim someone could dispute.

A useful formula is to name the writer's move, state its purpose, and state its effect. The writer [does X] in order to [purpose], which [effect on audience]. Not every thesis needs to follow it, but it keeps the claim tied to the rhetorical situation.

To practice, consider this passage from an invented editorial. A rural Ohio superintendent writes: "When our district moved to a four-day week two years ago, parents worried. Mrs. Alvarez, who drives a school bus, told me she thought her sons would fall behind. Last spring both made the honor roll. Across the county, attendance rose from 91 to 95 percent, and teacher resignations fell by a third. These numbers are not an accident. A longer weekend gives families time to schedule appointments and gives teachers time to prepare. We are not cutting education. We are making it possible."

Separate the claim from the evidence. The claim is that the four-day week works. The evidence includes an anecdote about two boys, attendance figures, and resignation rates. Now weigh the evidence. The anecdote is vivid and relevant but only one family, so it is not sufficient. The attendance and resignation figures are broader, but the passage does not say whether the figures are from one district or all, whether they cover a long period, or whether other changes happened at the same time. The claim "these numbers are not an accident" goes beyond the evidence, since it assumes the schedule caused the change.

A strong response to a prompt about this passage might argue that the superintendent builds credibility with a personal anecdote and then moves to data, a sequence that eases skeptical parents toward the claim, though the strength of the proof does not match the confidence of the tone. Such a thesis commits to an interpretation and acknowledges complexity.
`,
  ],
  cards: [
    ["Defensible thesis", "A claim about how a writer's choices serve a purpose that a reader could reasonably dispute."],
    ["Descriptive thesis", "A statement that names devices or topics without arguing why they matter."],
    ["Evidence", "Facts, examples, data or testimony offered to support a claim."],
    ["Relevant evidence", "Evidence that bears directly on the claim."],
    ["Sufficient evidence", "Enough evidence, of enough kinds, to support the claim."],
    ["Representative evidence", "Evidence that reflects the larger group or case, not a single exception."],
    ["Correlation vs. causation", "Two things happening together does not prove one caused the other."],
    ["Anecdote", "A brief personal story used to illustrate a point."],
  ],
  closed: [
    [
      "Which thesis is defensible?",
      [
        "The author uses diction, syntax and imagery.",
        "The passage is about a four-day week.",
        "By opening with a bus driver's worry and following with data, the superintendent eases skeptical parents toward his claim.",
        "The superintendent writes an editorial.",
      ],
      "C",
    ],
    [
      "In the editorial, which statement is the claim?",
      [
        "Mrs. Alvarez drives a school bus.",
        "Attendance rose from 91 to 95 percent.",
        "The four-day week works, and the district is not cutting education.",
        "Both boys made the honor roll.",
      ],
      "C",
    ],
    [
      "Why is the anecdote about Mrs. Alvarez's sons not sufficient by itself?",
      [
        "It is not interesting.",
        "It describes only one family, so it cannot represent the whole district.",
        "It is about a bus driver.",
        "It has no numbers.",
      ],
      "B",
    ],
    [
      "The writer says, \"These numbers are not an accident.\" What is the weakness?",
      [
        "The phrase is too short.",
        "It assumes the schedule caused the changes without ruling out other causes.",
        "It uses a rhetorical question.",
        "It contains an error in spelling.",
      ],
      "B",
    ],
    [
      "A response that restates the prompt without making a claim would most likely",
      [
        "earn the thesis point",
        "not earn the thesis point because it lacks a defensible interpretation",
        "earn two points",
        "receive a bonus",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a defensible thesis for a rhetorical analysis of the superintendent's editorial in the reading. Then identify one piece of evidence in the editorial that is relevant but not sufficient, and explain why.",
      scheme: [
        "Writes a thesis that makes a claim about the writer's choices and purpose",
        "The thesis names a specific rhetorical choice from the passage",
        "Identifies a piece of evidence that is relevant but not sufficient",
        "Explains why it is insufficient",
      ],
      model:
        "Thesis: By opening with a bus driver's worry and then offering attendance and resignation figures, the superintendent reassures skeptical parents, although the confidence of his closing outruns the proof. The anecdote about Mrs. Alvarez's sons is relevant to the claim that students did not fall behind, but it describes only one family and cannot show what happened across the district.",
      answers: [
        [
          "full",
          "[[0|By beginning with a worried parent and then moving to attendance numbers, the superintendent eases skeptical families toward accepting the four-day week.]] [[1|The pairing of a personal story with data is the specific choice.]] [[2|The anecdote about Mrs. Alvarez's sons making the honor roll is relevant to the claim that students did not fall behind.]] [[3|But it is only one family, so it can't show what happened for the whole district.]]",
          "Full marks. Your thesis names the choice, the purpose and the effect, and your evaluation is precise.",
        ],
        [
          "full",
          "[[0|Although the superintendent appears to rely on facts, his editorial persuades mainly by moving from reassurance to numbers and then to confident language, which makes parents feel the decision has already been proven.]] [[1|He starts with a parent's fear and ends on a bold line.]] [[2|The attendance figure is relevant to the claim that the schedule works.]] [[3|It is not sufficient because the editorial doesn't say how many districts, how long, or whether anything else changed, so it can't prove the schedule was the cause.]]",
          "All four marks. Raising the question of whether anything else changed shows you understand causation.",
        ],
        [
          "partial",
          "[[0|The superintendent uses an anecdote and data to persuade parents.]] [[2|The anecdote is relevant.]]",
          "Your thesis is a good start. Explain why the anecdote is insufficient, and make the thesis show the effect on the audience.",
        ],
        [
          "partial",
          "[[1|The writer uses the story of Mrs. Alvarez.]] [[3|It isn't enough because it's only one family.]] The editorial is good.",
          "Your evaluation is correct. Write a full thesis that makes a claim about the writer's purpose and effect.",
          true,
        ],
        [
          "weak",
          "The editorial is about a four-day school week. The author uses a lot of strategies and the anecdote is great proof.",
          "This describes the passage without a claim, and a single anecdote is not strong proof. Revisit the thesis formula.",
        ],
        [
          "weak",
          "[[0|The writer persuades parents.]] The data are perfect evidence because they are numbers and numbers are always sufficient.",
          "Your thesis needs a specific choice. Numbers can be insufficient if they lack context, such as the number of districts.",
        ],
      ],
    },
    {
      prompt:
        "A student claims, \"The superintendent's evidence proves that a four-day week improves attendance.\" Evaluate this claim. Is the evidence sufficient to prove it? Identify what additional information would strengthen or weaken it.",
      scheme: [
        "States a judgment about the claim, such as that it overstates what the evidence shows",
        "Identifies what the evidence shows (a correlation)",
        "Explains why causation is not proven",
        "Names additional information needed, such as comparison districts or other changes",
      ],
      model:
        "The claim overstates the evidence. The editorial shows that attendance rose from 91 to 95 percent after the change, which is a correlation. It does not rule out other causes such as a new attendance policy. To judge causation, we would want data from comparable districts that kept a five-day week and information on other changes during the same years.",
      answers: [
        [
          "full",
          "[[0|The claim goes too far.]] [[1|The editorial shows that attendance went up after the change, which means the two things happened together.]] [[2|That doesn't prove the schedule caused it, because something else could have changed at the same time.]] [[3|We would need attendance data from similar districts that kept five days and a list of other changes in that district to make a fair comparison.]]",
          "Full marks. You separated correlation from causation and asked for a control group.",
        ],
        [
          "full",
          "[[0|I think the claim overstates what the evidence can show.]] [[1|A rise from 91 to 95 percent is a real change, but it is only what happened after the switch.]] [[2|Without knowing if the district also started a new attendance incentive, we can't say the four-day week caused it.]] [[3|More information that would help is attendance numbers over several years and in neighboring districts with a five-day week.]]",
          "All four marks. Asking about an attendance incentive is the kind of alternative cause that matters.",
        ],
        [
          "partial",
          "[[0|The claim is too strong.]] [[1|Attendance went up.]] It's not proven.",
          "Your judgment is right. Explain why causation is not proven and what further information would help.",
        ],
        [
          "partial",
          "[[2|Other things could have changed.]] [[3|They need to compare to other districts.]]",
          "Strong on causation and what to add. State your overall judgment and what the evidence does show.",
          true,
        ],
        [
          "weak",
          "The claim is proven because the attendance is higher. Higher numbers mean it worked.",
          "Higher numbers after a change do not prove the change caused them. Consider other explanations.",
        ],
        [
          "weak",
          "[[1|Attendance rose from 91 to 95.]] That means the editorial is lying because it is a superintendent.",
          "The numbers may be accurate. The issue is whether they prove causation. Avoid assuming dishonesty.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Ethos, pathos and logos in Roosevelt's address of December 8, 1941",
  note: `
## Objectives

Students will be able to:

1. analyze how a writer uses ethos, pathos and logos in a speech or essay;
2. write a body paragraph that links a piece of evidence to the claim with commentary.

## Materials

Franklin D. Roosevelt's address to Congress on December 8, 1941, with line numbers, an appeals chart, and a body-paragraph frame (claim, evidence, commentary, link).

## Starter (8 minutes)

Ask: "How would you tell a nation that it has been attacked and that you will ask for war, without causing panic or rage?" Gather ideas about tone and content, then reveal that Roosevelt had less than a day to write this.

## Main activity

1. Read the speech aloud and mark phrases for each appeal. Examples: "a date which will live in infamy" (pathos and an evaluation of the act); the list of Japanese attacks across the Pacific on the same day (logos through accumulation of evidence); "I ask that the Congress declare" (ethos as a leader acting within constitutional limits).
2. Discuss the speaker's credibility. Roosevelt speaks as president, asks Congress to act and does not claim the power himself. Why does this matter?
3. Teach the body-paragraph frame, then model one on the list of attacks as logos.
4. Students write a paragraph on one appeal, using the frame. Peers highlight the commentary sentence and check that it explains how the evidence works, not just what it says.

## Checking for understanding

Pairs trade paragraphs and mark each sentence as claim, evidence, commentary or link.

## Exit ticket

A single sentence of commentary about one phrase in the speech.
`,
  reading: [
    "Three appeals, one speech",
    `
The ancient Greek philosopher Aristotle described three ways a speaker can persuade: by establishing character (**ethos**), by moving emotions (**pathos**), and by offering reasons (**logos**). AP students are expected to do more than label them. A strong analysis explains how the choices work on a particular audience in a particular situation.

On December 8, 1941, the day after Japan attacked Pearl Harbor, Franklin D. Roosevelt addressed a joint session of Congress. The audience was Congress and, through radio, the whole nation. The exigence was an act of war. His purpose was to ask Congress to declare war and to unify a divided country. Isolationist sentiment had been strong, and a speech that sounded rash or vengeful could have deepened that division.

His **ethos** is built carefully. Roosevelt speaks as the president, but he does not claim power for himself. He asks that Congress "declare" a state of war, which respects the constitutional division of authority. He speaks in a restrained tone, which suggests that his judgment is steady. He also reminds his audience that he had been in peaceful talks with Japan, which shows the nation acted in good faith.

His **logos** appears in the sequence of evidence. After stating that Pearl Harbor was attacked, he lists attacks on Malaya, Hong Kong, Guam, the Philippines, Wake Island and Midway. The accumulation does a logical job: it shows that the attack was not an isolated incident but a coordinated campaign, planned in advance. This supports his claim that the act was "deliberate."

His **pathos** is concentrated in a few words. "A date which will live in infamy" turns a date into a moral judgment and invites listeners to share it. He mentions the heavy loss of American lives, and he ends by pledging that the nation will defend itself and make sure that this form of treachery never endangers it again.

A body paragraph analyzing one appeal needs a claim, specific evidence, commentary, and a link. The claim says what the writer does and why. The evidence names a phrase. The commentary explains how the phrase works on the audience, not just what it means. The link returns to the larger purpose. The commentary is what earns the highest score.
`,
  ],
  cards: [
    ["Ethos", "Persuasion through the speaker's credibility and character."],
    ["Pathos", "Persuasion through emotion."],
    ["Logos", "Persuasion through logic and evidence."],
    ["Commentary", "The writer's explanation of how the evidence supports the claim and serves the purpose."],
    ["Accumulation", "Piling up examples so that the weight of the list becomes an argument."],
    ["Restraint", "A controlled tone that signals judgment and trustworthiness."],
    ["Isolationism", "A policy of avoiding involvement in other nations' conflicts."],
    ["Link", "The final sentence of a body paragraph that ties the analysis to the thesis."],
  ],
  closed: [
    [
      "Roosevelt asks that Congress \"declare\" war instead of declaring it himself. This choice mainly builds",
      ["logos", "ethos", "pathos only", "irony"],
      "B",
    ],
    [
      "The list of attacks across the Pacific supports which kind of appeal?",
      ["Pathos", "Logos", "Ethos only", "None"],
      "B",
    ],
    [
      "\"A date which will live in infamy\" mainly works as an appeal to",
      ["logos", "emotion and moral judgment", "statistics", "authority only"],
      "B",
    ],
    [
      "Which sentence is commentary rather than evidence?",
      [
        "Roosevelt lists attacks on Malaya, Hong Kong, Guam and Midway.",
        "The accumulation of places shows listeners that the attack was a coordinated campaign, supporting his claim that it was deliberate.",
        "He ends by pledging that the nation will defend itself.",
        "The speech was delivered on December 8.",
      ],
      "B",
    ],
    [
      "Why would a restrained tone serve Roosevelt's purpose with a divided Congress?",
      [
        "It hides the seriousness of the attack.",
        "It signals steady judgment and avoids sounding rash or vengeful, which helps unify skeptics.",
        "It makes the speech shorter.",
        "It proves he is angry.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a body paragraph (five to seven sentences) that analyzes how Roosevelt uses one of the three appeals in his December 8 address. Include a claim, specific evidence from the speech, commentary that explains how the evidence works on the audience, and a link to his purpose.",
      scheme: [
        "Makes a claim about how Roosevelt uses an appeal and why",
        "Gives specific, accurate evidence from the speech",
        "Provides commentary explaining how the evidence works on the audience",
        "Links the analysis back to his purpose",
      ],
      model:
        "Roosevelt builds logos through accumulation, in order to show that the attack was deliberate and to justify a call for war. After naming Pearl Harbor, he lists attacks on Malaya, Hong Kong, Guam, the Philippines, Wake Island and Midway. By stacking the places in a series, he lets the listeners draw the conclusion themselves, that an operation spread across the Pacific on one day must have been planned. This lets him claim treachery without raising his voice. The evidence of coordination therefore moves a divided Congress toward the unity he needs.",
      answers: [
        [
          "full",
          "[[0|Roosevelt uses logos by piling up evidence to prove that the attack was deliberate.]] [[1|After Pearl Harbor, he lists attacks on Malaya, Hong Kong, Guam, the Philippines, Wake Island and Midway.]] [[2|By listing so many places, he lets the audience reach the conclusion themselves that this was a coordinated plan, so he doesn't have to call Japan names.]] [[3|That calm proof helps unify a Congress that had been divided, which is the purpose of the speech.]]",
          "Full marks. Your commentary explains the mechanism, that the audience draws the conclusion, instead of just retelling the list.",
        ],
        [
          "full",
          "[[0|Roosevelt builds ethos by speaking as a restrained leader who respects the Constitution.]] [[1|He asks that Congress declare a state of war and does not claim the power for himself.]] [[2|This makes him seem steady and trustworthy to an audience that was wary of presidents taking the country to war, since he shows that he will act only with their approval.]] [[3|That credibility makes his request for war easier for skeptics to accept.]]",
          "All four marks. Linking restraint to the audience's wariness of presidential power is a precise insight.",
        ],
        [
          "partial",
          "[[0|Roosevelt uses pathos in the speech.]] [[1|He says a date which will live in infamy.]] It makes people feel upset.",
          "Your claim and evidence are good. Explain how the phrase works on the audience and tie it to his purpose.",
        ],
        [
          "partial",
          "[[2|The long list of attacks makes the audience see that it was a plan.]] [[3|That helps Congress agree to declare war.]]",
          "Strong commentary and link. Add a clear claim and name the specific places or details from the list.",
          true,
        ],
        [
          "weak",
          "Roosevelt uses ethos, pathos and logos in his speech. He uses them a lot and it is persuasive and the speech is famous.",
          "Name one appeal, quote a detail and explain how it works. Describing the speech as famous is not analysis.",
        ],
        [
          "weak",
          "[[1|He lists the attacks on Guam and Wake Island.]] This is logos because lists are logical. The end.",
          "You have an accurate detail. Explain what the list does to the audience's understanding, and connect to his purpose.",
        ],
      ],
    },
    {
      prompt:
        "Explain why \"a date which will live in infamy\" is a powerful choice. Analyze the word choice and say which appeal or appeals it works through, with commentary on the audience's response.",
      scheme: [
        "Identifies the key words (date, infamy) and their effect",
        "Names the appeal(s) it uses, such as pathos and ethos",
        "Explains how the phrase turns an event into a moral judgment",
        "Explains the effect on the audience and ties to purpose",
      ],
      model:
        "The phrase turns an ordinary date into a lasting moral verdict. 'Infamy' means shameful reputation, so Roosevelt does not just describe an attack, he labels it dishonorable. This is mainly pathos, because it invites anger and shared condemnation, and also ethos, because it shows the president speaking for a nation's judgment. For a divided audience, a shared moral condemnation helps unify them behind his request for war.",
      answers: [
        [
          "full",
          "[[0|The words date and infamy matter because infamy means a shameful reputation, so a simple date becomes a lasting disgrace.]] [[1|It works mostly through pathos, but also through ethos, since Roosevelt is speaking for the nation's judgment.]] [[2|It turns the attack from an event into a moral verdict, saying that Japan acted dishonorably.]] [[3|That gives a divided audience a shared feeling of condemnation, and it helps unite them behind the request for war.]]",
          "Full marks. You explained the word's meaning, the appeal and the audience's response in sequence.",
        ],
        [
          "full",
          "[[0|Infamy is a strong word that means wicked or disgraceful, and calling the date one that will live suggests it won't be forgotten.]] [[1|It is pathos because it stirs anger and pride, and ethos because the president names what the nation should feel.]] [[2|Instead of saying the attack was bad, he labels the act itself as shameful.]] [[3|The effect is to give the whole audience a common feeling, even those who had not wanted war.]]",
          "All four marks. The idea that a president names what the nation should feel is perceptive.",
        ],
        [
          "partial",
          "[[0|Infamy means shameful.]] [[1|It is pathos.]] It is a strong phrase.",
          "Good start. Explain how it changes the event into a moral judgment and how the audience responds.",
        ],
        [
          "partial",
          "[[2|It makes the attack sound dishonorable.]] [[3|That unifies people.]]",
          "Strong effect. Name the key words and the appeal.",
          true,
        ],
        [
          "weak",
          "Infamy means famous, so Roosevelt is saying the date will be famous. It is a nice phrase.",
          "Infamy means famous for something bad. The difference is the point of the word. Look up the connotation.",
        ],
        [
          "weak",
          "[[1|It's pathos.]] It works because it has the word date and dates are specific so it is logos.",
          "The phrase is mainly pathos and ethos. Specificity of a date is not a logical argument. Focus on the connotation of infamy.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Anecdote, statistics, authority and organization as support",
  note: `
## Objectives

Students will be able to:

1. explain how a writer uses anecdote, statistics and authority to support a claim;
2. analyze how a writer's organization, such as chronological, spatial or comparative, supports the argument.

## Materials

The original editorial "The Last Free Room" (in the reading), an evidence-type chart (anecdote, statistic, authority), and an organization map with four patterns: chronological, spatial, comparative, and problem-solution.

## Starter (8 minutes)

Ask: "A friend wants you to join a club. Which convinces you more: a story about a member, a number of members, or the club president's endorsement? Does it depend on who you are?" Elicit that different kinds of support work on different audiences.

## Main activity

1. Read "The Last Free Room" and annotate each piece of support: label as anecdote, statistic, or authority (an expert or institution). For each, write in the margin what the audience feels or believes after reading it.
2. Discuss why a writer might place the anecdote first and the statistic later. Test an alternative order and predict the effect.
3. Organization patterns. Identify the pattern of the editorial. Students sketch alternatives: what would a chronological version look like? A comparative one?
4. Short quiz on the passage: identify the support type and its function.

## Checking for understanding

Whiteboards: one piece of evidence and its type.

## Exit ticket

State one way the organization of the editorial supports its argument.
`,
  reading: [
    "The Last Free Room",
    `
Every Saturday at ten, a retired machinist named Mr. Dwyer walks into the Whetstone branch of the Columbus Metropolitan Library and logs in to a computer. He is applying for a part-time job that he cannot find in the paper. The application is online, the resume requires a template, and the template requires an email address that he set up last week with the help of a librarian named Priya. When the page times out, she is the person he asks for help.

Mr. Dwyer is not an exception. The library system reports that more than a million people used its public computers last year, and that computer help sessions are among its most requested services. A 2023 survey by a national research center found that about one in five American adults lacks a reliable home internet connection fast enough to complete a job application. In a country that has moved most civic life online, the library is where the offline go.

It is easy to think of the library as a quiet room for books. The director of the Public Library Association once described it as "the last public space where you do not have to buy anything to stay." That is the claim I want to make: the library is not a leftover from the era of print but the last free room in a community, and a city that trims its hours is trimming something no other institution replaces.

Consider the alternatives. A coffee shop expects a purchase. A school is closed to adults. A government office is open only for narrow business. The library alone welcomes anyone, at any age, with any purpose. First come the readers, then the job seekers, then the students without a quiet place to do homework, and finally the older people who come in for company.

The proposal now before the city council would reduce library hours on weekends. Such a cut would save a small amount. It would cost people like Mr. Dwyer the one day when he can come without missing work. Before the council votes, it should ask what a community owes to those who have no other room.
`,
  ],
  cards: [
    ["Anecdote", "A short, specific story that illustrates a point and builds connection with the audience."],
    ["Statistic", "A numerical fact offered as evidence; its strength depends on its source and context."],
    ["Authority", "Support that relies on the credibility of an expert or institution."],
    ["Chronological order", "Organizing ideas in the order events occurred."],
    ["Spatial order", "Organizing ideas by physical arrangement or place."],
    ["Comparative order", "Organizing ideas by examining similarities and differences."],
    ["Problem-solution", "Organizing by presenting a problem and then a response."],
    ["Appeal to need", "An argument that emphasizes what people cannot do without."],
  ],
  closed: [
    [
      "The opening about Mr. Dwyer is best described as",
      ["a statistic", "an anecdote", "an authority", "a counterclaim"],
      "B",
    ],
    [
      "The writer cites a national survey that one in five adults lacks reliable home internet. Its main function is to",
      [
        "tell a story",
        "show that Mr. Dwyer's situation is part of a broader pattern",
        "entertain the reader",
        "contradict the claim",
      ],
      "B",
    ],
    [
      "Quoting the director of the Public Library Association is an appeal to",
      ["anecdote", "authority", "statistics", "irony"],
      "B",
    ],
    [
      "Why might the writer place the anecdote before the statistics?",
      [
        "To make the editorial shorter",
        "To engage the reader with a human case first, so the numbers are read as evidence of many such cases",
        "To hide the thesis",
        "To avoid citing sources",
      ],
      "B",
    ],
    [
      "The paragraph beginning \"Consider the alternatives\" is organized mainly by",
      [
        "chronology",
        "comparison of the library with other places",
        "geography",
        "cause and effect only",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Analyze how the writer of \"The Last Free Room\" uses an anecdote, a statistic and an authority to support the claim that the library is the last free public room. For each, explain what it adds and how the three together build the argument.",
      scheme: [
        "Identifies the anecdote and explains what it adds",
        "Identifies the statistic and explains what it adds",
        "Identifies the authority and explains what it adds",
        "Explains how the three together build the argument",
      ],
      model:
        "The anecdote about Mr. Dwyer gives the argument a human face and makes the need concrete. The statistic that one in five adults lacks reliable home internet shows his case is common. The quotation from the library association director adds authority by defining the library's role as the last public space where you need not buy anything. Together, they move from one person to many people to a principle, which makes the claim feel personal, widespread and well founded.",
      answers: [
        [
          "full",
          "[[0|The story of Mr. Dwyer applying for a job adds a human face so the reader sees what is at stake.]] [[1|The survey that one in five adults lacks reliable home internet adds proof that his case is common.]] [[2|The director's line about the last public space adds authority, since an expert is naming the library's special role.]] [[3|Put together they move from one person to many people to a principle, so the argument is emotional, factual and credible at once.]]",
          "Full marks. Your final sentence describes the progression rather than repeating the three types.",
        ],
        [
          "full",
          "[[0|The anecdote makes the reader care by showing Mr. Dwyer struggling with an online application.]] [[1|The statistics, the million computer users and the one in five lacking internet, show that this is not unusual.]] [[2|The director of the library association gives authority and puts the claim in a memorable phrase.]] [[3|Combined, the three kinds of support appeal to feelings, logic and trust, so the claim is harder to dismiss.]]",
          "All four marks. Linking the three to feeling, logic and trust connects the assignment to the appeals you studied.",
        ],
        [
          "partial",
          "[[0|The story of Mr. Dwyer gives a real example.]] [[1|The survey shows it is common.]] The editorial is persuasive.",
          "Two supports are well explained. Add the authority and describe how all three build the argument.",
        ],
        [
          "partial",
          "[[2|The director's quote adds authority.]] [[3|The three types together make the argument stronger.]]",
          "Good authority and synthesis. Explain what the anecdote and statistic each add.",
          true,
        ],
        [
          "weak",
          "The writer uses a story, a number and a quote. These are all the same kind of evidence so they do the same thing.",
          "They do different jobs: a story engages, a number shows scale, and an expert adds credibility. Describe each.",
        ],
        [
          "weak",
          "[[0|Mr. Dwyer is an anecdote.]] The statistic is not important because it comes from a survey and surveys can be wrong.",
          "Surveys can be weighed, but the statistic's function is to show the pattern. Explain what it adds to the argument.",
        ],
      ],
    },
    {
      prompt:
        "Describe the organization of \"The Last Free Room\" and evaluate how it supports the argument. Identify at least two organizational choices (for example, anecdote first, comparison in the middle, call to action at the end) and explain the effect of each.",
      scheme: [
        "Identifies the opening organizational choice and explains its effect",
        "Identifies the comparative middle section and explains its effect",
        "Identifies the closing call to action and explains its effect",
        "Evaluates how the overall organization supports the argument",
      ],
      model:
        "The editorial opens with an anecdote, which engages readers with a person before presenting a claim. In the middle, it compares the library with the coffee shop, school and government office, showing that no alternative offers a free welcome to all. It closes by returning to Mr. Dwyer and asking the council to consider what the community owes. The movement from person to claim to proof to action leads readers through feeling to reasoning to decision, which suits an audience that must vote.",
      answers: [
        [
          "full",
          "[[0|It opens with an anecdote about Mr. Dwyer so the reader cares about a real person first.]] [[1|The middle compares the library to the coffee shop, school and government office, which shows no other place welcomes everyone without a purchase.]] [[2|At the end it goes back to Mr. Dwyer and asks the council what the community owes, which turns the argument into a call to action.]] [[3|The order goes from feeling to proof to a decision, which fits an audience of council members who have a vote to cast.]]",
          "Full marks. Naming the audience in your evaluation shows you understand why the organization suits the occasion.",
        ],
        [
          "full",
          "[[0|The editorial starts with a story to hook the reader before making any claim.]] [[1|It then uses comparison, going through the places a person could go instead and showing why each falls short.]] [[2|The conclusion goes back to the opening person and focuses on the council vote, so the reader leaves with something to do.]] [[3|The structure is effective because it builds from empathy to logic to action, so each part prepares the next.]]",
          "All four marks. Saying that each part prepares the next is the core of evaluating organization.",
        ],
        [
          "partial",
          "[[0|It starts with a story.]] [[2|It ends with the council vote.]] That's the organization.",
          "You named the opening and the ending. Identify the comparative middle and evaluate how the whole supports the argument.",
        ],
        [
          "partial",
          "[[1|The middle compares the library with other places.]] [[3|This helps the argument by showing it is the only one.]]",
          "Strong on the middle. Add the opening and closing choices and their effects.",
          true,
        ],
        [
          "weak",
          "The organization is chronological because it starts on Saturday and goes through the day. That is why it is good.",
          "The editorial is not organized by a day's events. It moves from anecdote to claim to comparison to action.",
        ],
        [
          "weak",
          "[[0|It starts with a story.]] The rest has no organization, the writer just puts in a bunch of facts.",
          "The order is deliberate. Look at what each paragraph does: evidence, claim, comparison, then proposal.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Transitions and order, the rhetorical analysis essay, and reading several sources on one issue",
  note: `
## Objectives

Students will be able to:

1. explain how transitions and the order of ideas guide the reader through a line of reasoning;
2. write a rhetorical analysis essay with a thesis, evidence and commentary that explains the writer's choices;
3. read several sources on one issue and identify points of agreement and disagreement.

## Materials

Four short original sources on whether Ohio's rural districts should adopt a four-day school week (a superintendent's letter, a parent's blog post, a researcher's summary, a teacher's column), a rhetorical-analysis essay frame, and a source comparison grid.

## Starter (8 minutes)

Give students a scrambled paragraph with its transitions deleted. Ask them to reorder it and add transitions. Discuss how the order and the words changed the logic.

## Main activity

1. Mini-lesson on transitions that signal addition, contrast, cause, concession and sequence. Students underline the transitions in the reading and name the relationship each shows.
2. Rhetorical analysis essay frame: introduction with the context and the thesis, two body paragraphs each with claim, evidence and commentary, and a brief conclusion that shows the significance of the writer's choices.
3. Source comparison. Read the four sources on the four-day week. For each, note the position, the kind of evidence, and the audience. Students record where sources agree (for instance, on teacher retention) and where they disagree (on learning).
4. Begin a paragraph that synthesizes two of the sources with attention to their disagreement.

## Checking for understanding

Pair students to explain one source's position and a point on which it conflicts with another.

## Exit ticket

A sentence that names a point where two sources disagree, using a transition that signals contrast.
`,
  reading: [
    "How writers lead you through an argument, and how readers compare arguments",
    `
A reader follows an argument the way a hiker follows a trail: by markers. **Transitions** are those markers. They signal the relationship between ideas, and the choice of transition is part of the writer's reasoning. "Moreover" and "in addition" add. "However" and "yet" contrast. "Therefore" and "as a result" show cause. "Although" and "granted" concede. "First," "next" and "finally" order. A transition that does not match the logic misleads the reader, as when a writer uses "therefore" where no conclusion follows.

The **order of ideas** matters as much as the words that link them. A writer who puts a concession first, such as "It is true that a shorter week reduces instructional time," and then argues "yet research suggests otherwise" brings the audience's doubt into the open before answering it. A writer who saves the strongest evidence for last may build momentum. Analyzing a text means asking why this order and what the audience would feel if it changed.

When you write a **rhetorical analysis essay**, you apply this thinking. The introduction places the text in its context and states a thesis about the writer's choices. Each body paragraph makes a claim about one choice, gives specific evidence from the text, and explains in commentary how the choice serves the purpose for the audience. The conclusion does not repeat. It shows why the choices matter. The commentary should always do more than paraphrase: it should explain how the choice makes the audience believe, feel or act.

A second skill is reading **several sources on one issue**, which prepares you for synthesis. Imagine four sources on whether a rural Ohio district should adopt a four-day school week. A superintendent argues that it saves money and improves attendance. A parent's blog worries about child care on the fifth day. A researcher's summary reports that studies show mixed results for achievement and strong results for teacher retention. A teacher's column says the longer days are tiring for younger children. The sources agree that teacher retention may improve and disagree about learning and family burden. Mapping where sources agree and disagree, and noticing what kind of evidence each uses (data, personal experience, expert summary), shows you which claims are well supported and which are contested. The goal is not to choose a side yet, but to understand the conversation.
`,
  ],
  cards: [
    ["Transition", "A word or phrase that shows the relationship between ideas."],
    ["Concession", "Admitting a point that seems to favor the other side."],
    ["Order of ideas", "The sequence in which a writer presents claims and evidence."],
    ["Commentary", "The writer's explanation of how evidence supports a claim and serves the purpose."],
    ["Rhetorical analysis", "An essay that explains how a writer's choices serve a purpose for an audience."],
    ["Source comparison", "Identifying where sources agree, disagree and what kind of evidence they use."],
    ["Contested claim", "A claim that sources disagree about."],
    ["Conversation (on an issue)", "The set of positions and evidence that sources bring to a shared question."],
  ],
  closed: [
    [
      "Which transition signals concession?",
      ["Therefore", "Granted", "Moreover", "Finally"],
      "B",
    ],
    [
      "A writer uses \"therefore\" where no conclusion follows. What is the effect?",
      [
        "It strengthens the logic.",
        "It misleads the reader about the relationship between ideas.",
        "It adds a contrast.",
        "It has no effect.",
      ],
      "B",
    ],
    [
      "In a rhetorical analysis essay, the main job of commentary is to",
      [
        "restate the quotation",
        "explain how the choice works on the audience and serves the purpose",
        "list more quotations",
        "summarize the plot",
      ],
      "B",
    ],
    [
      "In the four-day-week sources, which claim is likely contested?",
      [
        "That Ohio has school districts",
        "That a four-day week improves learning",
        "That teachers work in schools",
        "That the week has seven days",
      ],
      "B",
    ],
    [
      "A researcher's summary and a parent's blog post differ mainly in",
      [
        "the number of words",
        "the kind of evidence they offer, such as data summary versus personal experience",
        "the date of publication",
        "the title",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a short rhetorical analysis paragraph (a claim, evidence, and commentary) on how the order of ideas in the following passage serves the writer's purpose. Passage: \"It is true that a four-day week reduces classroom hours. Yet a study of rural districts found that attendance rose and that teachers were far more likely to stay. In a district that loses its best teachers every June, that stability is worth more than another day of lessons.\"",
      scheme: [
        "Makes a claim about the order of ideas",
        "Quotes or cites specific evidence from the passage",
        "Explains how the concession followed by contrast serves the writer's purpose",
        "Explains the effect on the audience",
      ],
      model:
        "The writer begins with a concession in order to disarm skeptics. By admitting that 'a four-day week reduces classroom hours,' the passage shows fairness before it pivots with 'Yet' to evidence of higher attendance and teacher retention. The final sentence frames stability as worth more than a day of lessons. This order brings the audience's strongest objection into the open, answers it, and leaves them with a value judgment, which makes them more willing to accept the writer's claim.",
      answers: [
        [
          "full",
          "[[0|The writer puts a concession first so that skeptics feel heard before the argument begins.]] [[1|He says it is true that a four-day week reduces classroom hours, and then uses the transition yet to move to the study that found higher attendance and teacher retention.]] [[2|Admitting the objection first makes him look fair, and the contrast makes the evidence feel like an answer to a real worry.]] [[3|The audience is more likely to accept the final claim that stability is worth more than another day of lessons because they feel their concern was taken seriously.]]",
          "Full marks. Your commentary explains the psychological effect of order, not just the order.",
        ],
        [
          "full",
          "[[0|The order of concession, then contrast, then value judgment shows a deliberate strategy.]] [[1|The first sentence admits a loss of classroom hours, the word yet turns to attendance and retention, and the last sentence says stability is worth more than another day.]] [[2|The concession gains trust and disarms the strongest objection, and ending on a value judgment makes the evidence into a reason to choose.]] [[3|A skeptical parent is moved from doubt to a feeling that the trade is reasonable.]]",
          "All four marks. Calling the ending a value judgment shows that you read the final sentence closely.",
        ],
        [
          "partial",
          "[[0|The writer starts by admitting something that hurts his case.]] [[1|He says it is true that a four-day week reduces classroom hours.]] It is a good strategy.",
          "Your claim and evidence are accurate. Explain how the order serves his purpose and affects the audience.",
        ],
        [
          "partial",
          "[[2|The word yet shows a contrast that answers the objection.]] [[3|It makes the audience trust him.]]",
          "Good commentary. Include a claim and a specific quotation from the passage.",
          true,
        ],
        [
          "weak",
          "The order is random. The writer could have put the sentences in any order and it would mean the same.",
          "The order is deliberate. Test it: what happens if the concession comes last?",
        ],
        [
          "weak",
          "[[1|He says it is true that a four-day week reduces classroom hours.]] This is bad for his argument and he should not say it.",
          "A concession can strengthen an argument by disarming objections. Explain why the writer includes it.",
        ],
      ],
    },
    {
      prompt:
        "Two sources disagree about the four-day week. Source A (a superintendent) claims it improves attendance and saves money. Source B (a parent's blog) argues it creates a child-care burden on the fifth day. Identify one point where the sources agree, one where they disagree, and one difference in the kind of evidence they use.",
      scheme: [
        "Identifies a point of agreement or shared concern",
        "Identifies a point of disagreement",
        "Identifies a difference in the kind of evidence",
        "Uses accurate transition language to compare the sources",
      ],
      model:
        "Both sources care about families' well-being, though they weigh it differently. They disagree on the net effect: A claims the schedule helps attendance and finances, while B argues it burdens families who need child care. A uses district data and cost figures, but B relies on personal experience. While A focuses on the district's gains, B emphasizes the household's costs.",
      answers: [
        [
          "full",
          "[[0|Both sources say they care about families and students.]] [[1|They disagree on the effect of the schedule, because the superintendent says it improves attendance and saves money while the parent says it creates a child-care burden.]] [[2|The superintendent uses district data and costs, and the parent uses her own experience.]] [[3|While the superintendent focuses on the district's gains, the parent focuses on the household's costs.]]",
          "Full marks. Your final sentence uses a contrast transition to compare their perspectives.",
        ],
        [
          "full",
          "[[0|One place they agree is that the schedule changes how families live their weeks.]] [[1|They disagree about whether the change is mainly good, since A sees benefits for the district and B sees costs for parents.]] [[2|A relies on numbers like attendance and savings while B relies on a personal account of finding child care.]] [[3|Whereas A looks at the whole district, B looks at an individual home.]]",
          "All four marks. Distinguishing the district from the household captures the gap between the sources.",
        ],
        [
          "partial",
          "[[0|Both say the four-day week matters to families.]] [[1|They disagree on whether it is good.]]",
          "Good start. Identify the kind of evidence each uses and use a contrast transition.",
        ],
        [
          "partial",
          "[[2|A uses data and B uses personal experience.]] [[3|However, they both talk about the same schedule.]]",
          "Strong comparison of evidence. Name a point of agreement and a point of disagreement more precisely.",
          true,
        ],
        [
          "weak",
          "Source A and Source B both hate the four-day week and agree it is terrible.",
          "Source A supports the schedule. Reread each source's position before comparing.",
        ],
        [
          "weak",
          "[[1|They disagree about the child-care burden.]] There is no difference in evidence since both are about schools.",
          "The sources differ in evidence: data versus personal experience. Look at how each supports its claim.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Synthesis: integrating sources and citing them accurately",
  note: `
## Objectives

Students will be able to:

1. integrate evidence from sources into your own argument using paraphrase, summary and quotation;
2. cite sources accurately in a standard format and avoid plagiarism.

## Materials

Six original sources on a question (should Ohio require every high school to teach personal finance? sources A to F, including a chart and a state legislator's statement), a synthesis paragraph frame, MLA citation guide, and a plagiarism-check sheet.

## Starter (8 minutes)

Show a sentence that quotes a source awkwardly ("Source A says 'personal finance should be taught.'"). Ask: "How can we integrate this into an argument so that our idea leads and the source supports?" Revise as a class.

## Main activity

1. Review the three modes of integration: paraphrase (own words, same idea), summary (brief account of a longer passage) and quotation (exact words, short). Practice each on one source.
2. Build a synthesis paragraph. The frame: your claim; evidence from source one (integrated); evidence from source two (integrated); commentary that connects the sources to each other and to the claim.
3. Citation. Practice parenthetical citations by source designation (Source A) and, for the AP exam, by title or author. Write one works-cited entry in MLA for a website article.
4. Plagiarism check. Peers examine each other's paragraphs for patchwriting, uncited ideas and quotations that lack quotation marks.

## Checking for understanding

Students underline their own idea in one color and the source's idea in another, to check that their voice leads.

## Exit ticket

One integrated sentence that includes a source and a citation.
`,
  reading: [
    "Letting sources support you without letting them speak for you",
    `
On the AP synthesis question, students receive several sources and are asked to develop a position and support it with at least three of them. A frequent mistake is to let the sources do the talking, producing a paragraph that strings together summaries: "Source A says this. Source B says that." That is a report. A **synthesis** is an argument in which your claim leads and the sources serve it. Your voice should be the strongest in every paragraph.

There are three ways to bring a source into your sentence. A **paraphrase** restates an idea in your own words and structure: "A state economist notes that students who study budgeting in school are less likely to carry credit card debt (Source C)." A **summary** compresses a longer passage: "The legislator's statement outlines the cost of a statewide course, arguing that it is small compared with the cost of consumer debt (Source D)." A **quotation** preserves the source's exact words: "As the economist puts it, a course 'pays for itself in years' (Source C)." Use quotation sparingly, for language that is especially clear or vivid, and always weave it into your own sentence.

Synthesis requires more than using sources side by side. The strongest writing puts sources into **conversation**. Suppose Source B reports a survey in which most graduates say they wish they had learned finance in school, and Source E, an editorial, warns that adding a requirement will crowd out other courses. You might write: "While graduates themselves wish they had been taught (Source B), critics worry about the cost to the schedule (Source E). Both concerns are legitimate, but a one-semester requirement, as Source D describes, addresses the first without much cost to the second." The writer's own reasoning connects the sources and moves the argument forward.

**Citation** tells the reader where ideas come from. On the AP exam, a parenthetical reference such as (Source A) or (Smith) is enough. In a research paper you would use MLA or APA, with a works-cited list. Citing is not just a rule; it is part of being believable. It also protects you from **plagiarism**, which includes copying words, copying structure with a few synonyms swapped, and using an idea without credit. Whenever a sentence contains something you did not know before reading the sources, a citation belongs.
`,
  ],
  cards: [
    ["Synthesis", "Combining ideas from several sources into your own argument."],
    ["Paraphrase", "Restating a source's idea in your own words and structure, with citation."],
    ["Summary", "A brief account of a longer passage, with citation."],
    ["Quotation", "A source's exact words in quotation marks, with citation."],
    ["Integrate", "To work a source into your own sentence so that your voice leads."],
    ["Parenthetical citation", "A short reference in parentheses that points to a source."],
    ["Works cited", "A list of full publication details for all sources used."],
    ["Patchwriting", "Copying a source's structure and swapping synonyms, a form of plagiarism."],
  ],
  closed: [
    [
      "Which sentence integrates a source best?",
      [
        "Source C says this. Source D says that.",
        "Because students who study budgeting carry less credit card debt (Source C), a required course makes economic sense.",
        "Source C: budgeting.",
        "Quote: 'pays for itself.'",
      ],
      "B",
    ],
    [
      "Which is a paraphrase?",
      [
        "'A course pays for itself in years.'",
        "An economist argues that the cost of a course is repaid within a few years (Source C).",
        "A course pays for itself in years (Source C).",
        "Courses are good.",
      ],
      "B",
    ],
    [
      "Putting sources in conversation means",
      [
        "listing them in order",
        "showing how they relate to each other and to your claim, by agreement, contrast or qualification",
        "using only one source",
        "quoting every source in full",
      ],
      "B",
    ],
    [
      "A student copies a source's sentence structure and replaces some words. This is",
      [
        "a quotation",
        "a paraphrase",
        "patchwriting, a form of plagiarism",
        "a summary",
      ],
      "C",
    ],
    [
      "On the AP exam, which citation is acceptable for a source provided with the question?",
      ["(Source B)", "No citation", "A full works-cited list is required", "(page 3)"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Use these two source statements to write a synthesis sentence or two that supports the claim \"Ohio should require a semester of personal finance for graduation.\" Source B (survey): most recent graduates say they wish they had learned how to manage money in school. Source E (editorial): adding a requirement may crowd other courses out of students' schedules. Integrate both, cite them, and show the relationship between them.",
      scheme: [
        "Paraphrases or summarizes Source B accurately with a citation",
        "Paraphrases or summarizes Source E accurately with a citation",
        "Shows the relationship between the sources (agreement, contrast or qualification)",
        "Connects the sources to the claim in the writer's own voice",
      ],
      model:
        "Although recent graduates say they wish they had been taught to manage money (Source B), critics warn that a new requirement might crowd out other courses (Source E). Because the concern about scheduling is real but limited to one semester, a short course can answer the graduates' need without removing other subjects, which supports requiring it.",
      answers: [
        [
          "full",
          "Although [[0|most recent graduates say they wish they had learned to manage money in school (Source B),]] [[1|critics warn that another requirement may push other classes out of students' schedules (Source E).]] [[2|These concerns pull in opposite directions,]] [[3|but a single semester would meet graduates' need with only a small cost to schedules, so the requirement is worth adopting.]]",
          "Full marks. Your voice leads, and the relationship between the sources is stated, not left implied.",
        ],
        [
          "full",
          "[[0|A survey shows that recent graduates wish they had been taught about money (Source B).]] [[1|An editorial argues that a new requirement could crowd out other courses (Source E).]] [[2|The second source qualifies the first by raising a cost.]] [[3|Yet if the course is limited to one semester, the cost is small compared with the lifetime benefit, which supports my claim that Ohio should require it.]]",
          "All four marks. \"Qualifies\" is the exact word for the relationship you described.",
        ],
        [
          "partial",
          "[[0|Graduates say they wish they had learned money skills (Source B).]] [[1|Another source says it takes time away from other classes (Source E).]]",
          "Both sources are represented and cited. Show how they relate to each other and to your claim.",
        ],
        [
          "partial",
          "[[2|These sources disagree about the cost.]] [[3|But a short course is worth it, so Ohio should require it.]]",
          "Good relationship and claim. Include the content of each source with a citation.",
          true,
        ],
        [
          "weak",
          "Source B says survey. Source E says editorial. The claim is that Ohio should require a course because it's good.",
          "That names the sources without using their content. Paraphrase what each says and connect them.",
        ],
        [
          "weak",
          "[[0|Most graduates wish they had learned about money.]] The sources do not matter because I already know the answer is yes.",
          "You include the first source but forgot the citation and the second source. A synthesis uses sources to support the claim.",
        ],
      ],
    },
    {
      prompt:
        "A student writes: \"According to the economist, a course in personal finance pays for itself in years because the students are less likely to have debt problems later on.\" The original source says: \"A course in personal finance pays for itself in a few years as students develop habits that reduce debt.\" Evaluate whether the student has plagiarized, and revise to a true paraphrase with a parenthetical citation.",
      scheme: [
        "Identifies the student's sentence as patchwriting, or too close to the original",
        "Notes that structure and key phrases are copied",
        "Writes a revised paraphrase with new structure and wording",
        "Includes a parenthetical citation",
      ],
      model:
        "The student's sentence is patchwriting: it keeps the original structure and the phrase 'pays for itself in years,' changing only a few words. A true paraphrase would restructure the idea: Within a few years, the cost of teaching personal finance is repaid, since the habits students learn lower their later debt (Source C).",
      answers: [
        [
          "full",
          "[[0|The student's sentence is mostly the original with a few words changed, which is patchwriting.]] [[1|It keeps the phrase pays for itself in years and the same order of ideas.]] [[2|A better version is that the habits students learn in the course reduce their debt, so the cost of teaching it is repaid within a few years]] [[3|(Source C).]]",
          "Full marks. Your revision changes the order and the language, and the citation is in place.",
        ],
        [
          "full",
          "[[0|This is plagiarism by patchwriting because the sentence mirrors the original.]] [[1|The phrase pays for itself and the idea about debt both follow the original's order.]] [[2|My version: Teaching money habits lowers later debt, which means schools earn back the cost of the class within a few years]] [[3|(Source C).]]",
          "All four marks. Putting the effect before the result is a real restructuring.",
        ],
        [
          "partial",
          "[[0|The student has used patchwriting.]] [[1|The wording is too close.]]",
          "Correct diagnosis. Now write a true paraphrase with a citation.",
        ],
        [
          "partial",
          "[[2|Students who learn money habits carry less debt, so schools recover the cost within years]] [[3|(Source C).]] It is plagiarism if you don't change it.",
          "Your paraphrase and citation work. Explain what was wrong with the student's version and why.",
          true,
        ],
        [
          "weak",
          "It is not plagiarism because the student said according to the economist, so credit is given.",
          "Crediting the source is only part of it. Copying the sentence structure and phrases with minor changes is still plagiarism.",
        ],
        [
          "weak",
          "[[3|(Source C).]] I would just put the quote in quotation marks and call it done, even if the sentence is mostly copied.",
          "Quotation marks would make it a quote, but a quote should be chosen for its wording and woven in. Try a true paraphrase.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Style: diction, syntax and figurative language, and revising for effect",
  note: `
## Objectives

Students will be able to:

1. analyze how diction, syntax and figurative language contribute to a writer's tone;
2. revise sentences for variety, concision and emphasis, and explain the effect of each change.

## Materials

A short original passage, "The Ninth Inning" (a sports column about the final week of a high school baseball season), a tone-vocabulary list, and a sentence-revision worksheet.

## Starter (8 minutes)

Write two sentences describing the same empty stadium. One: "The stadium was empty and quiet." Two: "The bleachers stood hollow, and a single plastic cup rolled along the aisle." Ask students to name the difference in tone and the words that produce it.

## Main activity

1. Teach three lenses. Diction: connotation, formality, concrete or abstract words. Syntax: sentence length, order, fragments, parallelism. Figurative language: metaphor, simile, personification, with attention to the feeling each creates.
2. Close-read "The Ninth Inning" and complete a tone chart: tone word, textual evidence, and the specific choice that produces it.
3. Revision stations. Students revise sentences for variety (combine and split), concision (cut wordy phrases) and emphasis (move the key idea to the end or isolate it). For each revision, write a one-sentence explanation of the effect.
4. Write one body paragraph on how the writer's style creates tone, using the commentary skills from Week 3.

## Checking for understanding

Whiteboards: choose a tone word for a sentence and underline the phrase that supports it.

## Exit ticket

Rewrite a wordy sentence in at most half the words and say what you cut.
`,
  reading: [
    "Style is a set of choices, and each choice has a cost",
    `
When AP students are asked to analyze style, they sometimes produce a list: "The author uses a metaphor, then imagery, then a long sentence." The College Board calls this description, and it earns little. Style is a set of choices, and a strong analysis asks what each choice accomplishes. Three lenses help.

**Diction** is word choice. A writer picks among words that mean nearly the same thing but carry different feelings. "Slender" and "scrawny" both describe thin, but one flatters and the other insults. Diction also varies in formality (the "kids" or "adolescents"), in concreteness ("a cracked bat" or "a failure") and in sound. When you read a passage, ask which words stand out and what the writer would lose with a plainer word.

**Syntax** is sentence structure. Short sentences produce speed or bluntness. Long sentences, especially those with many clauses, can sound reflective or breathless. A fragment may add emphasis. Parallel structure gives rhythm. Inverted order can place the key idea at the end where the reader remembers it.

**Figurative language** compares things in order to make a reader feel something. A metaphor that calls a bench "the island of the unchosen" creates a mood of isolation with fewer words than an explanation would.

Consider this passage from an invented sports column: "The bleachers stood hollow. The sun, tired of the season, sank behind the scoreboard. Three seniors stayed to rake the infield, though no one had asked them to. They raked slowly, the way people fold a flag." The diction is plain and concrete, with "raked" and "scoreboard" anchoring the scene. The syntax moves from short sentences to a longer final one, as though the work were slowing down. The personification of the sun and the simile of the flag build a tone of quiet reverence. Together they suggest that the boys are performing a small ritual of farewell.

The same lenses help in revision. **Variety** means mixing sentence lengths. **Concision** means cutting words that do no work, so "due to the fact that" becomes "because." **Emphasis** means putting the important idea where it will land. When you revise, you should be able to say what each change does. "I cut the first clause to reach the main point faster" is a revision. "I changed it to sound better" is not.
`,
  ],
  cards: [
    ["Diction", "A writer's choice of words, including their connotation, formality and concreteness."],
    ["Syntax", "The arrangement of words and phrases to form sentences."],
    ["Figurative language", "Language that uses comparison or imagery to create meaning beyond the literal."],
    ["Tone", "The writer's attitude toward the subject, shown through style."],
    ["Personification", "Giving human qualities to something nonhuman."],
    ["Concision", "Expressing an idea in as few words as are needed."],
    ["Emphasis", "Placing or isolating an idea so that it stands out."],
    ["Connotation", "The feelings and associations a word carries beyond its literal meaning."],
  ],
  closed: [
    [
      "Which word choice has the most negative connotation?",
      ["slender", "thin", "scrawny", "lean"],
      "C",
    ],
    [
      "A writer follows a long sentence with a five-word sentence. The most likely effect is",
      [
        "to confuse the reader",
        "to give emphasis and mark a shift in rhythm",
        "to lengthen the paragraph",
        "to show the writer ran out of ideas",
      ],
      "B",
    ],
    [
      "\"The sun, tired of the season, sank behind the scoreboard.\" This is an example of",
      ["hyperbole", "personification", "irony", "an allusion"],
      "B",
    ],
    [
      "Which revision improves concision without changing meaning?",
      [
        "Change \"because\" to \"due to the fact that.\"",
        "Change \"due to the fact that\" to \"because.\"",
        "Add two more adjectives.",
        "Repeat the sentence.",
      ],
      "B",
    ],
    [
      "Which analysis is strongest?",
      [
        "The writer uses a simile.",
        "The simile comparing the raking to folding a flag gives the boys' work a reverent, ceremonial tone.",
        "The simile is good.",
        "The writer uses figurative language in the passage.",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Analyze how diction and syntax create tone in this passage: \"The bleachers stood hollow. The sun, tired of the season, sank behind the scoreboard. Three seniors stayed to rake the infield, though no one had asked them to. They raked slowly, the way people fold a flag.\" Identify the tone, and explain two stylistic choices that produce it.",
      scheme: [
        "Identifies a reasonable tone, such as quiet, reverent or elegiac",
        "Identifies a specific diction or figurative choice with evidence",
        "Explains how that choice produces the tone",
        "Identifies and explains a syntactic choice, such as short sentences leading to a longer one",
      ],
      model:
        "The tone is quiet and reverent, almost elegiac. The simile that the seniors rake 'the way people fold a flag' links a small chore to a ceremony of honor, giving their work solemn dignity. The syntax moves from short, plain sentences such as 'The bleachers stood hollow' to a longer final sentence that slows as the boys do, mirroring their unhurried farewell.",
      answers: [
        [
          "full",
          "[[0|The tone is quiet and respectful, almost like a farewell.]] [[1|The simile that they raked the way people fold a flag compares the raking to a ceremony.]] [[2|That gives the boys' job a serious, dignified feeling, since folding a flag is done with care to honor something.]] [[3|The syntax goes from short sentences like the bleachers stood hollow to a longer last sentence that slows down the way they do, which mirrors their unhurried goodbye.]]",
          "Full marks. You analyzed two choices and named exactly what each contributes to the tone.",
        ],
        [
          "full",
          "[[0|The passage has a reverent, wistful tone.]] [[1|The writer personifies the sun as tired of the season.]] [[2|That makes the end of the day feel like the end of a long effort, which gives the scene a sense of exhaustion and loss.]] [[3|The first two sentences are short and simple, and then the third is longer with a clause about no one having asked, which shows the seniors choosing their own quiet ritual.]]",
          "All four marks. Connecting the longer sentence to the seniors' choice shows attention to content and form together.",
        ],
        [
          "partial",
          "[[0|The tone is sad and quiet.]] [[1|The simile compares raking to folding a flag.]] It makes the passage better.",
          "Tone and device identified. Explain how the simile produces the tone, and add a syntax choice.",
        ],
        [
          "partial",
          "[[2|Folding a flag is respectful, so the raking seems important.]] [[3|The sentences start short and then get longer.]]",
          "Good explanation and syntax observation. Name the tone clearly and quote the choice that produces it.",
          true,
        ],
        [
          "weak",
          "The tone is angry because the bleachers are hollow and the sun is tired. The author uses lots of adjectives.",
          "The passage is not angry; its images are quiet. Look at the connotations of folding a flag and the pace of the sentences.",
        ],
        [
          "weak",
          "[[0|The tone is quiet.]] The syntax doesn't matter because the sentences are just sentences.",
          "Syntax is a choice. Compare the length of the first sentences with the last.",
        ],
      ],
    },
    {
      prompt:
        "Revise this sentence for concision and emphasis, and explain what each change does: \"Due to the fact that the team had practiced very hard for a long period of time, the players were, in the end, able to win the game by the end of the final inning.\"",
      scheme: [
        "Cuts wordy phrases while preserving meaning",
        "Places the key idea for emphasis",
        "Explains the effect of cutting",
        "Explains the effect of the emphasis",
      ],
      model:
        "Revision: After months of hard practice, the team won in the final inning. I cut 'due to the fact that,' 'in the end,' and 'a long period of time' because they added words without meaning. Ending on 'in the final inning' places the moment of victory last, where it lands with the most force.",
      answers: [
        [
          "full",
          "[[0|Because the team practiced hard for months, it won in the final inning.]] [[1|I put the result and the final inning at the end of the sentence.]] [[2|I cut due to the fact that, long period of time and in the end, which were wordy and added no meaning, so the sentence is faster.]] [[3|Ending on the final inning gives emphasis because the reader remembers the last words and the win comes at the last moment.]]",
          "Full marks. You explained both what was cut and why the new ending is stronger.",
        ],
        [
          "full",
          "[[0|After months of hard practice, the team won in the last inning.]] [[1|The win comes last so the sentence ends on the key moment.]] [[2|I removed the wordy phrases like due to the fact that and in the end, since they repeated ideas and slowed the sentence.]] [[3|The shorter sentence puts the emphasis on the victory, which makes it feel earned and quick.]]",
          "All four marks. \"Feel earned\" connects the style to the meaning.",
        ],
        [
          "partial",
          "[[0|After months of hard practice, the team won in the last inning.]] I cut words so it is shorter.",
          "Your revision is good. Explain which phrases were cut and what the new order emphasizes.",
        ],
        [
          "partial",
          "[[2|Due to the fact that is wordy and in the end repeats the last inning.]] [[3|The end of the sentence is where the idea should be.]]",
          "Good explanation. Show your revised sentence.",
          true,
        ],
        [
          "weak",
          "The team practiced a very hard and long time, so they won in the end of the final inning at the end of the game.",
          "This is still wordy and repeats \"end.\" Cut the phrases that add nothing and end on the key moment.",
        ],
        [
          "weak",
          "[[0|The team won.]] I changed it because it sounds better.",
          "Your revision is concise but loses the practice and the final inning. Explain what each change does and keep the meaning.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Writing the timed argument essay, and reflecting on feedback from the scoring guide",
  note: `
## Objectives

Students will be able to:

1. write a timed argument essay that defends a position using evidence from your reading and experience;
2. reflect on feedback from a scoring rubric and set a goal for the next essay.

## Materials

A fresh argument prompt, the six-point rubric (thesis, evidence and commentary, sophistication), three annotated sample essays at different levels (written for class), and a reflection sheet.

## Starter (8 minutes)

Display the prompt: "Some argue that colleges should consider community service as heavily as test scores in admissions. Write an essay that defends, challenges or qualifies this view." Ask students to spend two minutes writing a position and three reasons. Share quickly.

## Main activity

1. Teach the rubric. Thesis (0 or 1): a defensible position, not a restatement. Evidence and commentary (0 to 4): specific evidence and commentary that explains reasoning. Sophistication (0 or 1): a nuanced understanding of the tension, effective style, or a counterargument handled well.
2. Score three sample essays with the rubric. Discuss why the strongest earns the sophistication point and why a middle essay stops at two or three.
3. Timed practice. Students plan for five minutes and write for thirty-five minutes on the prompt.
4. Reflection. Students self-score with the rubric, identify one strength and one goal, and write a plan for the next essay.

## Checking for understanding

Students underline their thesis, their strongest piece of evidence and their commentary, to check that all three are present.

## Exit ticket

State a goal for the next essay in the form: "Next time I will ... in order to earn ..."
`,
  reading: [
    "What the scoring guide rewards, and how to use feedback",
    `
The argument essay on the AP exam asks you to take a position on a debatable issue and defend it with evidence from reading, observation, experience or history. There is no required opinion, and the essay is not graded on whether the reader agrees. It is scored on a six-point rubric.

The **thesis** point goes to a response that presents a defensible position. Restating the prompt ("Community service in admissions is a topic with many sides") does not earn it. A defensible thesis commits: "Colleges should weigh community service alongside test scores, but only when it reflects sustained commitment rather than short-term hours." Someone could argue the opposite, which makes it a position.

The **evidence and commentary** category allows up to four points. A response earns more when its evidence is specific and its commentary explains the line of reasoning that connects the evidence to the claim. Evidence can come from many places: a historical event, a book you have read, a news story, a personal observation. A vague claim such as "many students who volunteer are better prepared" is a weak foundation. A specific one, such as a student who spends two years organizing a food drive and learns to manage volunteers and budgets, can be analyzed. Commentary is the difference between a high and a middle score. It explains why the evidence matters and how it supports the thesis, and it addresses complications.

The **sophistication** point rewards an essay that shows a nuanced understanding of the issue. This might mean exploring a tension (service can be genuine or performed), acknowledging a counterargument and responding, or writing prose that is vivid and controlled. It is the hardest point and should not be the first goal.

Feedback from the rubric is most useful when you translate it into action. Read your essay and mark where each point was earned or missed. A common pattern is a good thesis followed by evidence that lacks commentary. The goal for the next essay would then be specific: "Add two sentences of commentary after each example, explaining the link to my claim." Setting one concrete goal is better than promising to "write better." Finally, practice under timed conditions. Five minutes of planning, which names a thesis and three examples, repays itself in the focus of the essay that follows.
`,
  ],
  cards: [
    ["Argument essay", "An essay that defends, challenges or qualifies a position using evidence."],
    ["Defensible thesis", "A position that a reasonable person could dispute."],
    ["Commentary", "Explanation of how evidence supports the claim."],
    ["Sophistication", "Nuance, a developed counterargument, or especially effective style."],
    ["Qualify", "To accept a claim in part while setting limits or conditions."],
    ["Line of reasoning", "The logical path from evidence to claim."],
    ["Planning (timed writing)", "Brief prewriting that names thesis and evidence before drafting."],
    ["Goal (specific)", "A concrete, measurable change to try in the next draft."],
  ],
  closed: [
    [
      "Which thesis would earn the thesis point?",
      [
        "Community service is a topic that people debate.",
        "Colleges should weigh community service alongside test scores, but only when it reflects sustained commitment.",
        "This essay will discuss community service.",
        "Some say service matters, while others disagree.",
      ],
      "B",
    ],
    [
      "What separates a high evidence-and-commentary score from a middle one?",
      [
        "More examples without explanation",
        "Commentary that explains how the evidence supports the claim and addresses complications",
        "A longer introduction",
        "Using bigger words",
      ],
      "B",
    ],
    [
      "Which is the best evidence for an argument about service?",
      [
        "Many people volunteer.",
        "A student who organizes a two-year food drive and learns to manage volunteers and a budget.",
        "Volunteering is good.",
        "Everyone knows service matters.",
      ],
      "B",
    ],
    [
      "Which goal is the most useful for the next essay?",
      [
        "Write better.",
        "Try harder.",
        "Add two sentences of commentary after each example to explain the link to my thesis.",
        "Use more words.",
      ],
      "C",
    ],
    [
      "The sophistication point might be earned by",
      [
        "restating the prompt",
        "acknowledging a counterargument and responding, or exploring a tension in the issue",
        "writing more paragraphs",
        "using a quotation from the prompt",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Respond to this prompt in a planning outline and a complete opening paragraph (thesis included): \"Some argue that high schools should require every student to complete a semester-long community project before graduating. Write an essay that defends, challenges or qualifies this view.\" Your outline should list your thesis and two pieces of specific evidence with a note on the commentary you would write.",
      scheme: [
        "Writes a defensible thesis",
        "Identifies a first specific piece of evidence",
        "Identifies a second specific piece of evidence",
        "Plans commentary that explains how the evidence supports the thesis, and addresses a complication",
      ],
      model:
        "Thesis: High schools should require a semester project, but only if students choose it, because required service imposed from above can feel hollow. Evidence 1: a student I know who organized a coat drive at her church and learned to run a team. Commentary: choice made her ownership real. Evidence 2: Ohio's graduation requirement for service hours, which many students complete with a signature and no learning. Commentary: the lack of choice shows the risk. Complication: a project requirement also costs time students with jobs may lack.",
      answers: [
        [
          "full",
          "[[0|Thesis: High schools should require a semester community project, but students need to choose their project so the work is not just a box to check.]] [[1|Evidence 1: a classmate who organized a coat drive and learned to manage a team, and the commentary explains that she cared about it because she picked it.]] [[2|Evidence 2: service hours in other places that are signed off without any learning, and the commentary explains that without choice the requirement can become empty.]] [[3|I will also add a complication that students with jobs have less time, so the project should count as class credit.]]",
          "Full marks. Your plan has a position, two examples with commentary, and a complication that adds nuance.",
        ],
        [
          "full",
          "[[0|Thesis: A required community project can help students, but only if it replaces some coursework and not just adds to it.]] [[1|Evidence 1: my cousin who worked at a food pantry for a semester and learned how to budget donations, which I would explain shows real-world skills.]] [[2|Evidence 2: the stress that students in AP classes already report, which I would use to show the requirement should be part of the school day.]] [[3|My complication is that not every community has the same resources, so projects might have to be flexible.]]",
          "All four marks. Your thesis qualifies the claim, which is a strong approach.",
        ],
        [
          "partial",
          "[[0|Schools should require a project because it helps students.]] [[1|Evidence: students learn leadership from projects.]] I would write that it is good.",
          "Your thesis is clear. Make the evidence specific and plan commentary that explains the link to your thesis.",
        ],
        [
          "partial",
          "[[2|Evidence: a student who spent a semester tutoring younger kids and learned patience.]] [[3|Commentary: this shows service teaches skills and also students with jobs may struggle to find time.]]",
          "Good evidence and commentary with a complication. Add a defensible thesis.",
          true,
        ],
        [
          "weak",
          "I think community projects are a topic that has many sides. Some people like them and some don't. I will discuss both sides.",
          "That restates the prompt. Commit to a position that someone could argue against.",
        ],
        [
          "weak",
          "[[0|Schools should require a project.]] Evidence: everyone knows service is good. Commentary: because it is good.",
          "Your thesis is a position. Replace \"everyone knows\" with a specific example and explain how it supports your claim.",
        ],
      ],
    },
    {
      prompt:
        "Read this reflection and respond as a coach. A student's essay received 1 point for thesis, 2 for evidence and commentary, and 0 for sophistication. The student wrote: \"My thesis was good, but I just listed examples without explaining them. I think I should write longer essays.\" Evaluate the student's diagnosis, and write a more precise goal for the next essay with a reason.",
      scheme: [
        "Affirms the accurate part of the diagnosis (the thesis was good, the examples lacked explanation)",
        "Corrects the proposed solution (longer is not the answer)",
        "Writes a specific, measurable goal",
        "Connects the goal to the rubric category it would improve",
      ],
      model:
        "The student diagnosed the problem correctly: the thesis was strong and the examples lacked commentary. But writing longer essays will not fix it, since more unexplained examples would still earn few points. A better goal: after each example, write two sentences explaining how it proves the thesis. This directly targets the evidence and commentary category, where the student lost points.",
      answers: [
        [
          "full",
          "[[0|The student is right that the thesis was good and that the examples had no explanation.]] [[1|But writing longer is not the answer, because a longer essay with unexplained examples would still get the same score.]] [[2|A better goal is to add two sentences of commentary after every example that explain how it proves the thesis.]] [[3|That targets the evidence and commentary row of the rubric, which is where the student lost points.]]",
          "Full marks. You gave the student a goal they can actually check on the next draft.",
        ],
        [
          "full",
          "[[0|The diagnosis is mostly accurate because the problem was the lack of commentary.]] [[1|The plan to write longer won't work since the problem is explanation, not length.]] [[2|Next time the student should write a because sentence after each example saying how it supports the claim, and check that each paragraph has at least two of them.]] [[3|This would raise the evidence and commentary score, which was a 2 out of 4.]]",
          "All four marks. Tying the goal to the exact score shows how rubric feedback becomes a plan.",
        ],
        [
          "partial",
          "[[0|The student is right about the examples.]] [[1|Longer essays won't fix it.]]",
          "You corrected the proposed solution. Write a specific goal and say which rubric category it targets.",
        ],
        [
          "partial",
          "[[2|The student should write two sentences of commentary after each example.]] [[3|That will improve the evidence and commentary score.]]",
          "Strong goal. Begin by saying which part of the student's diagnosis was accurate and why longer essays would not help.",
          true,
        ],
        [
          "weak",
          "The student is right. The goal should be to write longer, because more words means a higher score.",
          "Length alone does not raise a score. The problem was that examples lacked explanation.",
        ],
        [
          "weak",
          "[[0|The thesis was good.]] The student should try harder and just be better at writing next time.",
          "\"Try harder\" is not a measurable goal. Write a specific change tied to the rubric.",
        ],
      ],
    },
  ],
};

writeCourse("ap-english-language-grade-11.json", "AP English Language", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
