import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * AP Psychology, Grade 11, Quarter 1. Units 1 to 4 of the AP Psychology
 * course framework plus free-response skills, written fresh in the school's
 * own words. Examples drawn from teen life and the Columbus area.
 */

const w1: WeekInput = {
  topic: "Perspectives, research methods and designing an experiment",
  note: `
## Objectives

Students will be able to:

1. describe the major perspectives in psychology and the questions each asks;
2. compare descriptive, correlational and experimental methods and say what each can show;
3. design a simple experiment and identify the independent variable, dependent variable and controls.

## Materials

Short case vignettes (a student who cannot sleep before exams), a perspective chart, index cards for matching methods to questions, the worksheet.

## Starter (7 minutes)

Pose: "A student feels anxious before every test. Why?" Collect explanations on the board without labels (genes, thoughts, past experience, culture, unconscious conflict). Then show how each is a different perspective.

## Main activity

1. Perspectives: biological (brain, genes, hormones), evolutionary (adaptive value), behavioral (learned responses), cognitive (thought and memory), psychodynamic (unconscious conflict), humanistic (growth and self-actualization), sociocultural (culture and situation). Practice matching a question to a perspective.
2. Methods: descriptive (case study, naturalistic observation, survey) shows what exists; correlational (r from -1 to +1) shows relationships; experimental (random assignment, manipulating an independent variable) can show cause and effect.
3. Design: "Does 20 minutes of exercise before a quiz raise scores?" Name the IV (exercise), DV (quiz score), experimental and control groups, random assignment, operational definition, placebo and double-blind where needed.

## Checking for understanding

Whiteboards: classify five research questions as descriptive, correlational or experimental.

## Worksheet

Perspectives matching and an experiment design.
`,
  reading: [
    "Many ways to ask why, and one way to test cause",
    `
Psychology is the science of behavior and mental processes, and psychologists approach the same question from different **perspectives**. The **biological** perspective looks at the brain, genes and hormones. The **evolutionary** perspective asks how a trait helped our ancestors survive and reproduce. The **behavioral** perspective studies how behavior is learned through rewards, punishments and associations. The **cognitive** perspective examines thinking, memory and problem solving. The **psychodynamic** perspective, rooted in Sigmund Freud's work, emphasizes unconscious conflicts and early experience. The **humanistic** perspective, represented by Carl Rogers and Abraham Maslow, emphasizes growth, free will and self-actualization. The **sociocultural** perspective studies how culture, family and the situation influence behavior. A student who feels anxious before tests could be explained by an overactive stress response (biological), by catastrophic thoughts (cognitive), by earlier failures that became linked with tests (behavioral), or by pressures in the family or community (sociocultural). Most psychologists use more than one perspective.

Researchers also choose among **methods**. **Descriptive** methods describe what exists. A **case study** examines one person in depth, **naturalistic observation** records behavior in real settings, and a **survey** asks many people questions. They are useful, but surveys can be affected by wording and by who responds (sampling bias), and case studies may not generalize. **Correlational** research measures two variables and calculates a **correlation coefficient** (r) from -1.0 to +1.0. A positive r means both rise together; a negative r means one rises as the other falls; the closer to 1 or -1, the stronger the relationship. Correlation does not show cause. Only an **experiment** can do that.

In an experiment, the researcher manipulates the **independent variable** (IV), measures the **dependent variable** (DV), and holds other things constant. Participants are placed into groups by **random assignment**, so that the groups are alike at the start. The **experimental group** gets the treatment and the **control group** does not; a control group might get a **placebo**, a harmless inactive treatment, to separate the effect of the treatment from the effect of expectations. In a **double-blind** study, neither participants nor researchers who measure results know who got what. Variables need **operational definitions**: "anxiety" could be defined as a score on a 20-item questionnaire.

Suppose a teacher wants to know whether 20 minutes of exercise before a quiz raises scores. She randomly assigns 60 students to two groups. The experimental group jogs for 20 minutes and the control group sits quietly for 20 minutes. Everyone takes the same quiz. The IV is exercise, the DV is the quiz score, and the controls include the quiz, the time of day and the room.
`,
  ],
  cards: [
    ["Biological perspective", "Explains behavior by the brain, genes and hormones."],
    ["Behavioral perspective", "Explains behavior as learned through reinforcement and association."],
    ["Cognitive perspective", "Studies thinking, memory and problem solving."],
    ["Correlation coefficient (r)", "A number from -1 to +1 showing the direction and strength of a relationship."],
    ["Random assignment", "Placing participants into groups by chance."],
    ["Independent variable", "The factor the experimenter manipulates."],
    ["Placebo", "An inactive treatment used to control for expectations."],
    ["Double-blind", "A study in which neither participants nor researchers know who got the treatment."],
  ],
  closed: [
    [
      "A psychologist studies how a child's fear of dogs formed after being bitten. Which perspective is this?",
      ["Behavioral", "Humanistic", "Evolutionary", "Psychodynamic"],
      "A",
    ],
    [
      "Which method can show cause and effect?",
      ["Case study", "Survey", "Correlational study", "Experiment"],
      "D",
    ],
    [
      "A correlation of r = -0.80 between hours of video games and GPA means:",
      ["More gaming causes lower GPA", "As gaming hours rise, GPA tends to fall, strongly", "There is no relationship", "GPA causes gaming"],
      "B",
    ],
    [
      "What is the purpose of random assignment?",
      ["To make the groups alike at the start", "To make participants happy", "To reduce the sample size", "To reveal the hypothesis"],
      "A",
    ],
    [
      "In a double-blind study:",
      ["Only the participants are unaware of the group", "Neither the participants nor the researchers who measure results know the group", "Only researchers know", "Everyone knows"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A researcher at an Ohio high school wants to test whether listening to instrumental music while studying improves quiz scores. Design an experiment. Identify the independent variable, the dependent variable, the experimental and control groups, how participants should be assigned, and two variables to control.",
      scheme: [
        "Identifies the independent variable as listening to instrumental music (or not) while studying",
        "Identifies the dependent variable as the quiz score",
        "Describes an experimental group (music) and a control group (silence), with random assignment",
        "Names two controlled variables, such as the material studied, the time spent, the quiz or the room",
      ],
      model:
        "The independent variable is whether students listen to instrumental music while studying. The dependent variable is the score on the quiz. Students would be randomly assigned to an experimental group that studies with music and a control group that studies in silence. The researcher would control the material studied, the time allowed and the quiz given.",
      answers: [
        [
          "full",
          "[[0|The independent variable is whether students study with instrumental music or not.]] [[1|The dependent variable is the quiz score.]] [[2|I would randomly assign students to a music group and a silent control group.]] [[3|I'd keep the same material, the same study time and the same quiz for both groups.]]",
          "Full marks. Random assignment and the controls are clearly stated.",
        ],
        [
          "full",
          "[[0|IV: presence of instrumental music during studying.]] [[1|DV: score on the same 20-question quiz.]] [[2|Random assignment would put half of 60 students in the experimental group with music and half in a control group with no music.]] [[3|Controls: the time of day, the study materials and the length of study time.]]",
          "Full marks. The operational definition of the DV is a nice addition.",
        ],
        [
          "partial",
          "[[0|The independent variable is music.]] [[1|The dependent variable is the quiz score.]] I'd pick the students who like music for the experimental group and the others in the control.",
          "Picking by preference introduces bias. Use random assignment so the groups are alike at the start. Add two controlled variables.",
        ],
        [
          "partial",
          "[[2|One group listens to music and one group has silence, assigned randomly.]] [[3|Control the quiz and the time.]] The dependent variable is the music.",
          "The music is the independent variable. The dependent variable is the quiz score, which is measured.",
          true,
        ],
        [
          "weak",
          "I would ask students if they like music while studying and see what they say. That will show if music helps.",
          "A survey shows opinions, not cause and effect. An experiment manipulates the music and measures scores.",
        ],
        [
          "weak",
          "[[0|The independent variable is music.]] I would give the music group an easier quiz so that they do better.",
          "The groups must take the same quiz. A different quiz would be a confounding variable.",
        ],
      ],
    },
    {
      prompt:
        "Match each question to the most appropriate research method and explain in one sentence why: (1) How many Ohio teenagers say they sleep fewer than seven hours? (2) Is there a relationship between hours of sleep and GPA? (3) Does reducing screen time before bed increase sleep? Name what each method can and cannot show.",
      scheme: [
        "Identifies (1) as a survey (descriptive) and says it describes how many",
        "Identifies (2) as a correlational study and says it shows a relationship",
        "Identifies (3) as an experiment and says it can show cause and effect",
        "States a limit of correlation or description, such as that neither shows cause",
      ],
      model:
        "(1) A survey, which is descriptive: it shows how many teens sleep less than seven hours. (2) A correlational study: it measures the relationship between sleep and GPA but cannot show that sleep causes better grades. (3) An experiment: randomly assigning students to reduced screen time can show cause and effect.",
      answers: [
        [
          "full",
          "(1) [[0|A survey, which is descriptive because it tells how many teens sleep less than seven hours.]] (2) [[1|A correlational study, which finds if sleep and GPA are related.]] (3) [[2|An experiment, where we randomly assign students to reduce screen time and measure their sleep, which can show cause.]] [[3|Surveys and correlations can't show cause because other variables could explain the relationship.]]",
          "Full marks. Each method is matched and the limit is stated.",
        ],
        [
          "full",
          "(1) [[0|Descriptive survey; it describes the percentage.]] (2) [[1|Correlation: it gives an r value for the relationship.]] (3) [[2|Experimental: manipulating screen time with random assignment lets us infer causation.]] [[3|The correlation might be due to a third variable, such as stress, so we cannot say sleep causes higher GPA.]]",
          "Full marks. The third-variable example is a good touch.",
        ],
        [
          "partial",
          "(1) [[0|Survey.]] (2) [[1|Correlation.]] (3) Correlation, because we compare screen time and sleep.",
          "Question 3 asks about cause, so it needs an experiment with a manipulated IV.",
        ],
        [
          "partial",
          "(1) Experiment. (2) [[1|Correlational study.]] (3) [[2|Experiment, which can show cause.]]",
          "Counting how many teens sleep less than seven hours is a descriptive survey. An experiment would not be needed.",
          true,
        ],
        [
          "weak",
          "All three are surveys because you ask people about sleep and school.",
          "The questions differ: describing, finding a relationship, and testing a cause. Match each to its method.",
        ],
        [
          "weak",
          "[[2|(3) is an experiment.]] (1) and (2) are experiments too because they are all scientific.",
          "Not all scientific studies are experiments. Only studies with a manipulated variable and random assignment are.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Ethics in research and the limits of correlation",
  note: `
## Objectives

Students will be able to:

1. explain why research must follow ethical guidelines and name the safeguards that exist;
2. read a graph or a correlation and avoid concluding causation without an experiment.

## Materials

Summaries of Milgram's obedience study and the Stanford prison study, an informed consent form template, scatterplots, a "spurious correlations" handout, the worksheet.

## Starter (6 minutes)

Pose: "Would it be okay to tell a student their test score was low (when it wasn't) to see how they react? Why or why not?" Collect opinions and identify the ethical principles involved.

## Main activity

1. Ethics: informed consent, protection from harm (physical and psychological), confidentiality, voluntary participation and the right to withdraw, debriefing, and use of deception only when justified and followed by debriefing. Institutional Review Boards (IRBs) review proposals. Animal research guidelines (minimize pain, use fewer animals). Discuss Milgram and Zimbardo as the studies that led to stricter rules.
2. Correlation: read scatterplots (positive, negative, none), r values, and the three explanations for a correlation: A causes B, B causes A, or a third variable causes both. Examples: ice cream sales and drownings (heat), hours of sleep and GPA.
3. Evaluate claims in the news: "Teens who play sports get better grades, so sports make you smarter." Find alternative explanations.

## Checking for understanding

Ask: "Which safeguard would you add to a study that asks participants about trauma?"

## Worksheet

Ethical analysis of a study and three correlation claims.
`,
  reading: [
    "Doing research responsibly, and reading numbers carefully",
    `
Psychologists study people, so they have a special responsibility to protect them. In the 1960s and 1970s, a few well-known studies raised serious ethical questions. In Stanley Milgram's obedience experiments, participants were told to give what they believed were increasingly painful electric shocks to another person, and many showed severe stress. In Philip Zimbardo's Stanford prison study, college students who played guards became cruel, and the study was stopped early because of the distress of the "prisoners." These studies taught researchers important lessons, and they led to rules for the field, in particular the ethical guidelines of the American Psychological Association (APA) and the federal rules for research with human participants.

Today, an **Institutional Review Board (IRB)** at a university or school reviews research proposals before they begin. The main safeguards are: **Informed consent**, in which participants are told about the purpose, procedures, risks and benefits in terms they can understand, and agree to take part; for minors, parents give consent and the minor gives assent. **Voluntary participation** and the **right to withdraw** without penalty. **Protection from harm**, both physical and psychological. **Confidentiality**, so that personal data are protected and the results do not identify individuals. **Deception**, such as a cover story about the real purpose, is allowed only when the study could not be done without it, the risk is minimal, and participants are **debriefed** at the end, told the real purpose and given a chance to ask questions. Studies on animals must also follow guidelines: minimize pain and distress, use the smallest number of animals needed, and have the research reviewed by a committee.

Another responsibility is to interpret numbers carefully. A **correlation** means two variables are related. A **scatterplot** with dots rising from left to right shows a positive correlation, and dots falling show a negative one. The number **r** gives the strength: r = +0.70 is a strong positive relationship, and r = -0.20 is a weak negative one. There are always three possible explanations for a correlation between A and B: A causes B; B causes A (the **directionality problem**); or a **third variable** causes both. Ice cream sales and drownings are positively correlated, but ice cream does not cause drowning; hot weather (the third variable) increases both. Likewise, if students who play sports have higher grades, it could be that sports teach time management, that good students are more likely to make the team, or that students from families with more resources can do both. Only an experiment with random assignment can show cause. When you read a claim in the news, ask: What was measured? How were participants chosen? Was there a control group? What other explanation could account for the result?
`,
  ],
  cards: [
    ["Informed consent", "Participants are told the purpose, risks and benefits and agree to take part."],
    ["Debriefing", "Explaining the true purpose and results to participants after a study."],
    ["Confidentiality", "Protecting participants' personal information."],
    ["Institutional Review Board (IRB)", "A committee that reviews research proposals for ethical safety."],
    ["Third variable", "An unmeasured factor that causes both of two correlated variables."],
    ["Directionality problem", "Not knowing whether A causes B or B causes A."],
    ["Scatterplot", "A graph of paired data points showing a relationship."],
    ["Spurious correlation", "A correlation that is due to chance or a third variable, not cause."],
  ],
  closed: [
    [
      "Which safeguard involves telling participants the true purpose of a study after it ends?",
      ["Informed consent", "Debriefing", "Random assignment", "Confidentiality"],
      "B",
    ],
    [
      "A committee that reviews proposed studies for ethical safety is called:",
      ["An IRB", "A control group", "A peer review panel only", "A survey"],
      "A",
    ],
    [
      "Ice cream sales and drownings are positively correlated because:",
      ["Ice cream causes drowning", "Hot weather increases both", "Drownings cause ice cream sales", "There is no correlation"],
      "B",
    ],
    [
      "A correlation of r = -0.20 is:",
      ["Strong and positive", "Weak and negative", "Strong and negative", "Perfect"],
      "B",
    ],
    [
      "Which of these is NOT a required safeguard for human participants?",
      ["The right to withdraw", "Confidentiality", "Always revealing the hypothesis in advance", "Protection from harm"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A researcher wants to study how teenagers react to social exclusion by telling them that classmates did not want to work with them (which is false). Identify three ethical issues this raises and explain what safeguards should be in place, including whether deception can be justified.",
      scheme: [
        "Identifies the use of deception as an issue and says it is allowed only if justified and minimal in risk",
        "Identifies the risk of psychological harm and says the researcher must protect participants from harm",
        "Names informed consent (with parental consent for minors) and the right to withdraw as safeguards",
        "Names debriefing and IRB review as safeguards",
      ],
      model:
        "Deception is an issue, but it is allowed only if the study cannot be done without it and the risk is minimal. The false feedback could cause psychological harm, so the researcher must minimize distress. Participants (with parental consent for minors) should give informed consent to take part and be free to withdraw. They must be debriefed afterward, and an IRB should review the plan.",
      answers: [
        [
          "full",
          "[[0|The study uses deception, which is only acceptable if the research can't be done without it and the risk is small.]] [[1|The false message could cause psychological harm, so the researcher must protect participants from distress.]] [[2|Participants need informed consent, with parent permission for minors, and the right to withdraw at any time.]] [[3|They must be debriefed at the end, and an IRB should review the plan beforehand.]]",
          "Full marks. All the safeguards are linked to the specific risks.",
        ],
        [
          "full",
          "[[0|Deception can be justified only when it's necessary and the harm is minimal.]] [[1|Being told you are excluded could make a teen feel hurt, so the researcher should monitor distress and stop if needed.]] [[2|Consent from parents and assent from the teens, plus the right to withdraw, are needed.]] [[3|A debriefing that explains the false feedback and an IRB review are essential.]]",
          "Full marks. Monitoring distress and stopping if needed is a strong practical safeguard.",
        ],
        [
          "partial",
          "[[0|Deception is a problem.]] [[1|The teens could be upset.]] They should just be told the truth at the end.",
          "Telling the truth at the end is debriefing, which is right. Add informed consent, the right to withdraw and IRB review.",
        ],
        [
          "partial",
          "[[2|They need informed consent and can withdraw.]] [[3|An IRB would review it.]] Deception is never allowed in research.",
          "Deception is allowed only if it is justified and followed by debriefing. Name the risk of psychological harm.",
          true,
        ],
        [
          "weak",
          "It is fine since it is just an experiment and the teens know it is not real.",
          "Participants in a deception study do not know it is not real. That is why safeguards are needed.",
        ],
        [
          "weak",
          "[[3|An IRB reviews it.]] The only ethical issue is that the teens' names might be on the report.",
          "Confidentiality is one issue, but deception and psychological harm are the most serious here.",
        ],
      ],
    },
    {
      prompt:
        "A news story says: \"A study found that students who eat breakfast have higher test scores (r = +0.45). Therefore, eating breakfast raises your score.\" Evaluate the conclusion. Explain what the correlation shows, give two alternative explanations, and describe an experiment that could test the claim.",
      scheme: [
        "States that r = +0.45 shows a moderate positive relationship, not cause",
        "Gives one alternative explanation, such as a third variable (family income or sleep)",
        "Gives a second alternative explanation, such as reverse direction or another factor",
        "Describes an experiment with random assignment to breakfast and no-breakfast groups and a test score as the dependent variable",
      ],
      model:
        "The correlation of +0.45 shows a moderate positive relationship, but it does not show that breakfast causes higher scores. A third variable, such as family income or sleep, could affect both. Or students who are more organized might both eat breakfast and study more. An experiment could randomly assign students to eat breakfast or not before a test and compare scores.",
      answers: [
        [
          "full",
          "[[0|r = +0.45 is a moderate positive relationship, but it doesn't prove that breakfast causes higher scores.]] [[1|A third variable such as family income could lead to both eating breakfast and better scores.]] [[2|Or students who are more organized might both eat breakfast and study more.]] [[3|An experiment would randomly assign students to breakfast or no-breakfast groups and compare their test scores.]]",
          "Full marks. You judged the claim and offered a testable design.",
        ],
        [
          "full",
          "[[0|The correlation shows a moderate link, not cause and effect.]] [[1|Sleep could be the third variable: well-rested students eat breakfast and do better.]] [[2|It might also be reverse: students who care about school plan their mornings better.]] [[3|To test it, randomly assign students to eat a standard breakfast or none, and give both groups the same test.]]",
          "Full marks. The design controls the test and the meal.",
        ],
        [
          "partial",
          "[[0|The correlation does not show cause.]] [[1|Maybe family income affects both.]] You could do another survey to see.",
          "A second survey would not show cause. Add a second alternative and an experiment with random assignment.",
        ],
        [
          "partial",
          "[[3|You could randomly assign students to eat breakfast or not.]] [[2|Maybe good students eat breakfast.]] The conclusion is right because r is positive.",
          "A positive r does not prove cause. Explain what r = +0.45 means and give a third-variable explanation.",
          true,
        ],
        [
          "weak",
          "The conclusion is correct because a positive correlation means breakfast raises scores.",
          "A correlation shows a relationship, not cause. Other variables could explain it.",
        ],
        [
          "weak",
          "[[0|r = +0.45 is a moderate relationship.]] I would test it by giving everyone breakfast and then see if scores go up.",
          "Without a control group that does not eat breakfast, you cannot tell whether breakfast caused any change.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Neurons and neurotransmitters",
  note: `
## Objectives

Students will be able to:

1. describe the structure of a neuron and how neurons communicate;
2. explain the roles of neurotransmitters in mood, movement and memory.

## Materials

Neuron models, a chart of neurotransmitters, a diagram of a synapse, case summaries (Parkinson's disease, depression, Alzheimer's), the quiz.

## Starter (6 minutes)

Pose: "How can a signal travel from your toe to your brain in a fraction of a second?" Collect ideas about wiring and chemicals. Introduce electrical and chemical signaling.

## Main activity

1. Structure: dendrites (receive), cell body (soma), axon (carries), myelin sheath (insulates and speeds), terminal buttons (release). Action potential: resting potential about -70 mV, threshold, all-or-none, refractory period.
2. Synapse: neurotransmitters released into the synaptic gap, bind to receptors on the next neuron, then are reabsorbed (reuptake) or broken down.
3. Neurotransmitters and function: dopamine (reward, movement; low in Parkinson's), serotonin (mood, sleep; targeted by SSRIs), acetylcholine (muscles, memory; reduced in Alzheimer's), GABA (main inhibitory), glutamate (main excitatory, learning), endorphins (pain relief), norepinephrine (arousal).
4. Agonists and antagonists: drugs that mimic or block neurotransmitters (L-dopa, SSRIs, curare, morphine).

## Checking for understanding

Whiteboards: label a neuron and the synapse.

## Quiz

Neuron structure and neurotransmitters.
`,
  reading: [
    "Signals along and between neurons",
    `
The nervous system is built of cells called **neurons**. A typical neuron has **dendrites**, branching fibers that receive messages from other neurons; a **cell body** (soma) containing the nucleus; an **axon**, a long fiber that carries messages away; and **terminal buttons** at the end of the axon that release chemicals. Many axons are wrapped in a fatty **myelin sheath** that insulates and speeds up the message. Multiple sclerosis is a disease in which myelin is damaged.

A neuron at rest has an electrical charge of about -70 millivolts inside compared with outside. When the neuron receives enough stimulation to reach its **threshold**, an **action potential** fires: positively charged sodium ions rush into the axon and the charge reverses briefly. The action potential travels down the axon. It follows the **all-or-none principle**: either the neuron fires completely or it does not fire at all. A stronger stimulus does not make a bigger action potential, but a faster rate of firing. After firing, there is a **refractory period** of a moment when the neuron cannot fire again.

At the end of the axon, neurons do not touch one another. A tiny gap, the **synapse**, separates them. When the action potential reaches the terminal buttons, they release chemical messengers called **neurotransmitters** into the gap. The neurotransmitters cross and bind to **receptor sites** on the next neuron, like a key in a lock, and either excite or inhibit it. Afterward, the neurotransmitter is cleared from the synapse by **reuptake**, in which it is reabsorbed by the sending neuron, or it is broken down by enzymes.

Each neurotransmitter has particular roles. **Dopamine** is involved in movement and in the brain's reward system; too little dopamine in a movement area is linked to Parkinson's disease, and too much is linked to schizophrenia symptoms. **Serotonin** affects mood, sleep and appetite, and low levels are linked to depression. **Acetylcholine** (ACh) triggers muscle contraction and is important for memory; Alzheimer's disease involves a loss of ACh-producing neurons. **GABA** is the main inhibitory neurotransmitter, calming neural activity, and **glutamate** is the main excitatory one, essential for learning and memory. **Endorphins** are the body's natural painkillers. **Norepinephrine** increases alertness and arousal.

Drugs and medicines often work at synapses. An **agonist** mimics a neurotransmitter or increases its effect: L-dopa, used for Parkinson's disease, is converted to dopamine. An **antagonist** blocks a neurotransmitter: curare blocks ACh and causes paralysis. SSRIs, widely used for depression, block the reuptake of serotonin so that more of it remains in the synapse.
`,
  ],
  cards: [
    ["Dendrite", "A branching fiber that receives messages."],
    ["Axon", "A long fiber that carries messages away from the cell body."],
    ["Myelin sheath", "A fatty coating that insulates the axon and speeds the signal."],
    ["Action potential", "An electrical impulse that travels down the axon."],
    ["Synapse", "The gap between two neurons."],
    ["Reuptake", "The reabsorption of neurotransmitter by the sending neuron."],
    ["Agonist", "A substance that mimics or enhances a neurotransmitter."],
    ["Antagonist", "A substance that blocks a neurotransmitter."],
  ],
  closed: [
    [
      "Which part of the neuron receives messages from other neurons?",
      ["Axon", "Dendrite", "Terminal button", "Myelin"],
      "B",
    ],
    [
      "The all-or-none principle means:",
      ["A stronger stimulus makes a larger action potential", "A neuron either fires completely or not at all", "All neurons fire together", "Neurons fire in order"],
      "B",
    ],
    [
      "Low levels of which neurotransmitter are linked to depression?",
      ["Serotonin", "GABA", "Acetylcholine", "Glutamate"],
      "A",
    ],
    [
      "An SSRI works by:",
      ["Blocking the reuptake of serotonin", "Blocking acetylcholine receptors", "Destroying myelin", "Causing the release of dopamine"],
      "A",
    ],
    [
      "Curare causes paralysis because it is an antagonist for:",
      ["Dopamine", "Serotonin", "Acetylcholine", "Endorphins"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Describe what happens at a synapse when an action potential arrives at the terminal buttons. Include the neurotransmitter, the receptors, and what happens afterward. Then explain how an SSRI increases the effect of serotonin.",
      scheme: [
        "States that neurotransmitters are released into the synaptic gap",
        "States that they bind to receptor sites on the next neuron, exciting or inhibiting it",
        "States that the neurotransmitter is cleared by reuptake or enzymes",
        "Explains that an SSRI blocks the reuptake of serotonin, leaving more in the synapse",
      ],
      model:
        "When the action potential reaches the terminal buttons, neurotransmitters are released into the synaptic gap. They bind to receptor sites on the next neuron and excite or inhibit it. Afterward, the neurotransmitter is cleared by reuptake into the sending neuron or broken down by enzymes. An SSRI blocks the reuptake of serotonin, so more serotonin stays in the synapse.",
      answers: [
        [
          "full",
          "[[0|The terminal buttons release neurotransmitters into the gap between the neurons.]] [[1|They bind to receptors on the next neuron, like a key in a lock, and make it more or less likely to fire.]] [[2|Afterward the neurotransmitters are taken back up by the sending neuron or broken down.]] [[3|An SSRI blocks reuptake of serotonin so more of it stays in the synapse to keep acting.]]",
          "Full marks. Each stage is described, and the drug's mechanism is accurate.",
        ],
        [
          "full",
          "[[0|Calcium entry causes vesicles to release neurotransmitter into the synapse.]] [[1|The neurotransmitter binds to receptor sites on the postsynaptic neuron, producing excitation or inhibition.]] [[2|It is cleared by reuptake or by enzymes.]] [[3|SSRIs prevent serotonin being reabsorbed, which increases its concentration in the gap.]]",
          "Full marks. The mention of vesicles and the postsynaptic neuron is precise.",
        ],
        [
          "partial",
          "[[0|Neurotransmitters are released.]] [[1|They bind to receptors on the next neuron.]] SSRIs make the brain produce more serotonin.",
          "SSRIs do not increase production. They block reuptake. Add what happens to the neurotransmitter afterward.",
        ],
        [
          "partial",
          "[[2|The neurotransmitter is taken back up.]] [[3|SSRIs block reuptake.]] The neurons touch each other so the signal jumps across.",
          "Neurons do not touch. A gap, the synapse, separates them, and the signal crosses by neurotransmitters.",
          true,
        ],
        [
          "weak",
          "The electrical signal jumps across the synapse like a spark to the next neuron. SSRIs make the spark bigger.",
          "The signal crosses the synapse chemically with neurotransmitters. SSRIs block reuptake of serotonin.",
        ],
        [
          "weak",
          "[[1|Neurotransmitters bind to receptors.]] An SSRI destroys serotonin so the person is calm.",
          "An SSRI does not destroy serotonin; it keeps it in the synapse longer by blocking reuptake.",
        ],
      ],
    },
    {
      prompt:
        "Parkinson's disease involves a loss of dopamine-producing neurons. Explain the symptoms in terms of dopamine's role, and explain how a medication like L-dopa helps. Then contrast with Alzheimer's disease and acetylcholine.",
      scheme: [
        "States that dopamine is important for movement and that its loss causes tremors and difficulty moving",
        "Explains that L-dopa is converted into dopamine and acts as an agonist",
        "States that acetylcholine is important for memory and muscle action",
        "States that Alzheimer's disease involves loss of ACh-producing neurons and memory problems",
      ],
      model:
        "Dopamine is important for smooth movement, so its loss in Parkinson's disease causes tremors, stiffness and slow movement. L-dopa is converted into dopamine in the brain and acts as an agonist, increasing dopamine levels. In contrast, acetylcholine is important for memory and muscle action. Alzheimer's disease involves loss of neurons that produce ACh, causing memory loss.",
      answers: [
        [
          "full",
          "[[0|Dopamine helps control smooth movement, so when it's lost, people get tremors, stiffness and slow movement.]] [[1|L-dopa is converted into dopamine in the brain, so it acts as an agonist and brings the level back up.]] [[2|Acetylcholine is important for memory as well as muscle action.]] [[3|In Alzheimer's disease the neurons that make ACh are lost, causing memory problems.]]",
          "Full marks. The two diseases are contrasted through their neurotransmitters.",
        ],
        [
          "full",
          "[[0|Without enough dopamine in the movement areas, a person with Parkinson's has trouble starting and controlling movements and has tremors.]] [[1|L-dopa is a precursor that turns into dopamine, working as an agonist.]] [[2|ACh is key for learning and memory.]] [[3|Alzheimer's destroys ACh-producing neurons, so the main symptom is memory loss.]]",
          "Full marks. Calling L-dopa a precursor is accurate.",
        ],
        [
          "partial",
          "[[0|Parkinson's has tremors because of low dopamine.]] [[1|L-dopa becomes dopamine.]] Alzheimer's is also caused by low dopamine.",
          "Alzheimer's involves a loss of acetylcholine-producing neurons. Add the role of ACh in memory.",
        ],
        [
          "partial",
          "[[2|Acetylcholine is important for memory.]] [[3|Alzheimer's involves loss of ACh neurons.]] Parkinson's is a memory disease.",
          "Parkinson's mainly affects movement because of a loss of dopamine. Explain how L-dopa helps.",
          true,
        ],
        [
          "weak",
          "Parkinson's is caused by too much dopamine, and L-dopa blocks it. Alzheimer's is when you are old.",
          "Parkinson's involves too little dopamine, and L-dopa increases it. Alzheimer's is a disease, not just aging.",
        ],
        [
          "weak",
          "[[0|Dopamine is for movement.]] The two diseases are the same disease with different names.",
          "Parkinson's involves dopamine and movement, while Alzheimer's involves acetylcholine and memory.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "The brain and the endocrine system",
  note: `
## Objectives

Students will be able to:

1. name the major structures of the brain and the functions of each lobe;
2. describe how the endocrine system and the nervous system work together.

## Materials

A brain model or poster, a lobe-labeling worksheet, the story of Phineas Gage, a chart of glands and hormones, the problem set.

## Starter (6 minutes)

Share the story of Phineas Gage, a railroad worker who in 1848 survived an iron rod through his frontal lobe, and whose personality changed. Ask: "What does this suggest about the frontal lobe?"

## Main activity

1. Brain structure: hindbrain (medulla for breathing and heart rate, pons, cerebellum for balance and coordination), midbrain, and forebrain (thalamus as a sensory relay, hypothalamus controlling hunger, thirst, temperature and the pituitary, limbic system with the amygdala for emotion and the hippocampus for forming memories).
2. The cerebral cortex and lobes: frontal (planning, judgment, voluntary movement in the motor cortex, Broca's area for speech production), parietal (touch in the somatosensory cortex), temporal (hearing, Wernicke's area for language comprehension), occipital (vision). The two hemispheres joined by the corpus callosum.
3. Endocrine system: glands release hormones into the blood; slower, longer-lasting than neural messages. Pituitary (master gland), thyroid, adrenal glands (adrenaline and cortisol in stress), pancreas (insulin), gonads. Hypothalamus links the two systems.
4. Case study: stress response.

## Checking for understanding

Ask: "Damage to which lobe would affect vision? To which would affect planning?"

## Problem set

Match the lobe to the function, and trace the stress response.
`,
  reading: [
    "A map of the brain, and chemical messages",
    `
The brain can be divided into three regions: the hindbrain, the midbrain and the forebrain. The **hindbrain** includes the **medulla**, which controls breathing and heart rate; the **pons**, which helps with sleep and coordination; and the **cerebellum**, which coordinates voluntary movement and balance and plays a role in learning skills. The **midbrain** helps coordinate movement with sensory information. The **forebrain** includes the **thalamus**, a relay station that sends sensory information (except smell) to the cortex; the **hypothalamus**, which regulates hunger, thirst, body temperature and sex drive, and controls the pituitary gland; and the **limbic system**, important in emotion and memory, containing the **amygdala** (fear and aggression) and the **hippocampus** (forming new explicit memories).

The **cerebral cortex**, the thin, wrinkled outer layer of the forebrain, is responsible for higher-level thinking. It is divided into four lobes in each hemisphere. The **frontal lobe**, at the front, handles planning, judgment, decision making and personality, and contains the **motor cortex**, which controls voluntary movement, and **Broca's area**, usually in the left hemisphere, which is needed to produce speech. The **parietal lobe**, at the top and back, contains the **somatosensory cortex**, which receives touch, pressure and temperature information. The **temporal lobe**, on the sides, handles hearing and includes **Wernicke's area**, which is involved in understanding language. The **occipital lobe**, at the back, processes vision. The two hemispheres communicate through a bundle of fibers called the **corpus callosum**. The case of Phineas Gage, a railroad worker who survived an iron rod through his frontal lobe in 1848 and afterward became impulsive and short-tempered, was one of the first clues that the frontal lobe is involved in personality and self-control.

The brain works with the **endocrine system**, a network of glands that release **hormones** into the bloodstream. Hormones travel more slowly than neural messages but have longer-lasting effects. The **pituitary gland**, controlled by the hypothalamus, is called the "master gland" because its hormones regulate other glands. The **thyroid** regulates metabolism. The **pancreas** releases insulin. The **adrenal glands** release adrenaline (epinephrine) and cortisol during stress. In the **fight-or-flight response**, the amygdala detects a threat, the hypothalamus signals the sympathetic nervous system and the adrenal glands, and adrenaline raises heart rate and breathing and sends blood to the muscles. If the stress continues, the hypothalamus triggers the release of cortisol, which keeps energy available but can harm health if elevated for months. A student who feels a racing heart before a speech has experienced this system at work.
`,
  ],
  cards: [
    ["Cerebellum", "Hindbrain structure that coordinates movement and balance."],
    ["Hypothalamus", "Forebrain structure that controls hunger, thirst, temperature and the pituitary."],
    ["Amygdala", "Limbic structure involved in fear and aggression."],
    ["Hippocampus", "Limbic structure that forms new explicit memories."],
    ["Frontal lobe", "Lobe for planning, judgment and voluntary movement."],
    ["Occipital lobe", "Lobe that processes vision."],
    ["Broca's area", "Frontal lobe region needed for speech production."],
    ["Adrenal glands", "Glands that release adrenaline and cortisol in stress."],
  ],
  closed: [
    [
      "Which structure coordinates balance and fine movement?",
      ["Medulla", "Cerebellum", "Thalamus", "Amygdala"],
      "B",
    ],
    [
      "Damage to the occipital lobe would most affect:",
      ["Vision", "Hearing", "Touch", "Planning"],
      "A",
    ],
    [
      "The hippocampus is most involved in:",
      ["Breathing", "Forming new memories", "Balance", "Hunger"],
      "B",
    ],
    [
      "Which gland is called the master gland?",
      ["Thyroid", "Adrenal", "Pituitary", "Pancreas"],
      "C",
    ],
    [
      "Phineas Gage's injury suggested that the frontal lobe is important for:",
      ["Vision", "Personality and self-control", "Hearing", "Balance"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student has a stroke that damages the left temporal lobe near Wernicke's area, but her movement and vision are normal. Predict the symptoms, name the lobe and area involved, and contrast with damage to Broca's area in the frontal lobe.",
      scheme: [
        "Identifies Wernicke's area in the temporal lobe as involved in comprehension of language",
        "Predicts that she would speak fluently but with little meaning and have trouble understanding speech",
        "Identifies Broca's area as needed for speech production",
        "Predicts that damage to Broca's area causes slow, effortful speech with comprehension largely intact",
      ],
      model:
        "Wernicke's area is in the temporal lobe and is involved in understanding language. Damage would cause fluent speech with little meaning and trouble understanding what others say. Broca's area, in the frontal lobe, is needed to produce speech. Damage there causes slow, effortful speech while comprehension is largely intact.",
      answers: [
        [
          "full",
          "[[0|Wernicke's area in the temporal lobe is involved in understanding language.]] [[1|She would speak fluently but the words wouldn't make sense, and she would have trouble understanding others.]] [[2|Broca's area, in the frontal lobe, is needed to produce speech.]] [[3|Damage there causes slow, effortful speech but the person can mostly understand.]]",
          "Full marks. The contrast between the two aphasias is clear.",
        ],
        [
          "full",
          "[[0|The temporal lobe contains Wernicke's area, which handles language comprehension.]] [[1|The result is fluent but meaningless speech and poor comprehension.]] [[2|Broca's area in the frontal lobe controls speech production.]] [[3|With Broca's damage the person knows what to say but speaks in short, halting phrases.]]",
          "Full marks. The phrase 'knows what to say' captures the contrast.",
        ],
        [
          "partial",
          "[[0|The temporal lobe has Wernicke's area, for understanding language.]] [[1|She would have trouble understanding.]] Broca's area is for hearing.",
          "Broca's area is in the frontal lobe and is needed to produce speech, not for hearing. Describe what her own speech would sound like.",
        ],
        [
          "partial",
          "[[2|Broca's area controls speech production.]] [[3|Damage would cause slow speech.]] Wernicke's area is in the frontal lobe.",
          "Wernicke's area is in the temporal lobe. Add the symptoms of Wernicke's damage.",
          true,
        ],
        [
          "weak",
          "She would be paralyzed because the temporal lobe controls movement.",
          "The temporal lobe is involved in hearing and language understanding. Movement is controlled by the motor cortex in the frontal lobe.",
        ],
        [
          "weak",
          "[[2|Broca's area is for speech.]] Wernicke's and Broca's are the same area.",
          "They are different areas: Wernicke's for comprehension, in the temporal lobe, and Broca's for production, in the frontal lobe.",
        ],
      ],
    },
    {
      prompt:
        "Trace the body's response when a student sees a car swerve toward them on the way to school. Describe the roles of the amygdala, hypothalamus, adrenal glands and the sympathetic nervous system, and explain how this differs from the long-term release of cortisol.",
      scheme: [
        "States that the amygdala detects the threat",
        "States that the hypothalamus signals the sympathetic nervous system and the adrenal glands",
        "States that the adrenal glands release adrenaline, increasing heart rate and sending blood to muscles",
        "States that with ongoing stress cortisol is released, which keeps energy available but can harm health when elevated for long periods",
      ],
      model:
        "The amygdala detects the threat and the hypothalamus signals the sympathetic nervous system and the adrenal glands. The adrenal glands release adrenaline, which increases heart rate and breathing and sends blood to the muscles. If the stress continues, the hypothalamus triggers the release of cortisol, which keeps energy available, but high levels over months can harm health.",
      answers: [
        [
          "full",
          "[[0|The amygdala detects the danger.]] [[1|The hypothalamus activates the sympathetic nervous system and signals the adrenal glands.]] [[2|The adrenal glands release adrenaline, which speeds the heart and breathing and sends blood to the muscles.]] [[3|If the stress goes on, cortisol is released to keep energy available, but too much for months can damage health.]]",
          "Full marks. The two phases of the stress response are distinguished.",
        ],
        [
          "full",
          "[[0|The amygdala quickly identifies the threat.]] [[1|The hypothalamus triggers the sympathetic nervous system, which stimulates the adrenal glands.]] [[2|Epinephrine raises heart rate, widens airways and moves blood to the muscles for fight or flight.]] [[3|Cortisol is the longer-term stress hormone, and chronic high levels can weaken the immune system.]]",
          "Full marks. Naming a health effect makes the contrast concrete.",
        ],
        [
          "partial",
          "[[0|The amygdala detects the threat.]] [[2|Adrenaline speeds up the heart.]] The hypothalamus makes the adrenal glands produce insulin.",
          "The adrenal glands release adrenaline and cortisol; insulin comes from the pancreas. Explain the role of cortisol.",
        ],
        [
          "partial",
          "[[1|The hypothalamus signals the adrenal glands.]] [[3|Cortisol is released if stress continues.]] The cerebellum detects the danger.",
          "The amygdala detects the threat. The cerebellum is for balance and coordination.",
          true,
        ],
        [
          "weak",
          "The student's heart rate goes up because the brain decides to run. Hormones are not involved.",
          "The endocrine system is involved: the adrenal glands release adrenaline, which raises the heart rate.",
        ],
        [
          "weak",
          "[[2|Adrenaline speeds the heart.]] Cortisol is the same as adrenaline and acts just as fast.",
          "Cortisol acts more slowly and over a longer time. Adrenaline is the quick response.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Nature and nurture, sensation and perception",
  note: `
## Objectives

Students will be able to:

1. explain how nature and nurture interact, using twin and adoption studies;
2. describe how sensory receptors turn physical energy into neural signals;
3. compare bottom-up and top-down processing in perception.

## Materials

A table of concordance rates in twin studies, optical illusions, a diagram of the eye and ear, the worksheet.

## Starter (6 minutes)

Show an optical illusion (the Müller-Lyer lines). Ask: "Which line is longer?" Reveal they are equal. Discuss: "Why do we see what we see?" Introduce perception as interpretation.

## Main activity

1. Nature and nurture: genes and environment interact. Twin studies compare identical (monozygotic, 100 percent shared genes) and fraternal (dizygotic, about 50 percent) twins; if identical twins are more alike than fraternal twins, the trait has a genetic influence. Adoption studies compare adoptees with biological and adoptive relatives. Heritability is an estimate for a population, not an individual. Epigenetics shows that the environment can change gene expression.
2. Sensation: transduction converts physical energy (light, sound waves, pressure, chemicals) into neural signals. Absolute threshold (the minimum stimulus detected 50 percent of the time), difference threshold (just noticeable difference), Weber's law, sensory adaptation.
3. Perception: bottom-up processing (starts with the stimulus and builds up: feature detectors) versus top-down processing (uses knowledge, expectations and context). Perceptual set.

## Checking for understanding

Ask: "When you read a word with a missing letter and still understand it, is that bottom-up or top-down?"

## Worksheet

A twin-study analysis and a perception activity.
`,
  reading: [
    "Genes, environments and how we make sense of the world",
    `
Do our traits come from our genes (nature) or from our experiences (nurture)? The question is a false choice: they work together. Genes set a range of possibilities and the environment shapes where within the range we end up. Psychologists use **twin studies** to estimate the role of genes. **Identical twins** (monozygotic) come from one fertilized egg and share 100 percent of their genes. **Fraternal twins** (dizygotic) come from two eggs and share about 50 percent. If identical twins are more similar on a trait than fraternal twins, even when they are raised in the same kind of home, then genes likely play a role. For example, if 60 percent of identical twin pairs share a diagnosis of a certain disorder and only 25 percent of fraternal twins, the difference points to a genetic influence. **Adoption studies** compare adopted children with their biological relatives, with whom they share genes, and with their adoptive relatives, with whom they share the home environment. Heritability is a statistic that describes how much of the variation of a trait **in a population** is due to genes; it does not tell how much of one person's trait is genetic. **Epigenetics** shows that experiences can turn genes on or off without changing the DNA sequence.

Our contact with the world begins with **sensation**, the process of detecting stimuli. **Sensory receptors** are specialized cells that convert physical energy into neural signals, a process called **transduction**. In the eye, rods and cones transduce light; in the ear, hair cells transduce vibration of sound; in the skin, receptors respond to pressure and temperature; in the nose and mouth, chemoreceptors respond to molecules. The **absolute threshold** is the weakest stimulus we can detect half the time, such as a candle flame seen from 30 miles on a clear night. The **difference threshold** or just noticeable difference is the smallest change that we can detect, and by **Weber's law**, it is proportional to the size of the original stimulus: you notice a one-pound change in a five-pound bag but not in a 50-pound bag. **Sensory adaptation** reduces our response to unchanging stimuli, which is why you stop noticing a smell after a few minutes.

**Perception** is the process of organizing and interpreting sensory information. In **bottom-up processing**, perception builds from the sensory input: feature detectors in the visual cortex respond to edges and lines, and the brain assembles them into an object. In **top-down processing**, our knowledge, expectations and context guide interpretation: we read "THE CAT" with the same shape for H and A in each word because the context tells us what they are. A **perceptual set** is a mental predisposition to perceive one thing and not another, as when people see a face in a cloud. Both processes work together.
`,
  ],
  cards: [
    ["Monozygotic twins", "Identical twins who share 100 percent of their genes."],
    ["Dizygotic twins", "Fraternal twins who share about 50 percent of their genes."],
    ["Epigenetics", "Changes in gene expression caused by the environment, without changing DNA."],
    ["Transduction", "Converting physical energy into neural signals."],
    ["Absolute threshold", "The weakest stimulus detected half the time."],
    ["Weber's law", "The just noticeable difference is proportional to the size of the stimulus."],
    ["Bottom-up processing", "Perception that starts with sensory input and builds up."],
    ["Top-down processing", "Perception guided by knowledge and expectations."],
  ],
  closed: [
    [
      "If identical twins are much more similar on a trait than fraternal twins, this suggests:",
      ["An environmental cause only", "A genetic influence", "No influence", "A measurement error"],
      "B",
    ],
    [
      "What is transduction?",
      ["Remembering a stimulus", "Converting physical energy into neural signals", "Ignoring a stimulus", "Interpreting a stimulus"],
      "B",
    ],
    [
      "According to Weber's law, which change is easiest to notice?",
      ["1 pound added to 5 pounds", "1 pound added to 50 pounds", "1 pound added to 500 pounds", "All are equally easy"],
      "A",
    ],
    [
      "Reading a smudged word by using the context of the sentence is an example of:",
      ["Bottom-up processing", "Top-down processing", "Transduction", "Sensory adaptation"],
      "B",
    ],
    [
      "Why do you stop noticing the smell of a room after a few minutes?",
      ["Transduction fails", "Sensory adaptation", "Weber's law", "A high absolute threshold"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "In a study, 70 percent of identical twin pairs and 30 percent of fraternal twin pairs both have a particular anxiety disorder. Explain what this suggests about nature and nurture, why the result does not mean the disorder is entirely genetic, and how an adoption study could add evidence.",
      scheme: [
        "States that identical twins share more genes than fraternal twins, so the higher concordance suggests genes play a role",
        "States that because concordance in identical twins is not 100 percent, the environment also plays a role",
        "Explains that twins raised together share an environment, so an adoption study separates genes from environment",
        "States that in an adoption study, similarity to biological relatives suggests genes and similarity to adoptive relatives suggests environment",
      ],
      model:
        "Identical twins share 100 percent of their genes and fraternal twins about 50 percent, so the higher concordance in identical twins suggests genes play a role. But identical twins do not always share the disorder (70 percent, not 100), so the environment also plays a part. Because twins often share a home, an adoption study can help: similarity to biological relatives suggests genes, and similarity to adoptive relatives suggests environment.",
      answers: [
        [
          "full",
          "[[0|Identical twins share more genes than fraternal twins, so the higher rate in identical twins suggests genes matter.]] [[1|But it's only 70%, not 100%, so the environment must play a role too.]] [[2|Twins usually share a home, so an adoption study could separate genes from environment.]] [[3|If adoptees are more like their biological relatives, that suggests genes, and if they're like their adoptive family, that suggests environment.]]",
          "Full marks. You interpreted the numbers and proposed how to add evidence.",
        ],
        [
          "full",
          "[[0|The gap between 70% and 30% shows a genetic influence, since the identical twins share 100% of their genes.]] [[1|Because not all identical twins share the disorder, nurture or chance also matters.]] [[2|An adoption study separates the shared home from the shared genes.]] [[3|Comparing adoptees with both their biological and adoptive parents shows which group they resemble.]]",
          "Full marks. Each conclusion is tied to the evidence.",
        ],
        [
          "partial",
          "[[0|The difference suggests genes play a role.]] [[1|Environment matters too since it's not 100%.]] An adoption study would study twins.",
          "An adoption study compares adopted children with biological and adoptive relatives. Explain what the results would show.",
        ],
        [
          "partial",
          "[[2|An adoption study separates genes and environment.]] [[3|If adoptees resemble their biological parents it suggests genes.]] The disorder is entirely genetic.",
          "The 70 percent figure shows the disorder is not entirely genetic. Environment also plays a role.",
          true,
        ],
        [
          "weak",
          "The disorder is caused by genes only because identical twins have the same genes.",
          "Identical twins do not always share the disorder, so the environment must also play a role.",
        ],
        [
          "weak",
          "[[0|Identical twins share more genes.]] The numbers prove it is completely nurture.",
          "A higher concordance in identical twins suggests genes matter. It does not prove it is all nurture.",
        ],
      ],
    },
    {
      prompt:
        "Describe the difference between bottom-up and top-down processing using the example of reading a handwritten note with messy writing. Explain how transduction begins the process, and give an example of Weber's law.",
      scheme: [
        "States that transduction in the eye converts light into neural signals",
        "Describes bottom-up processing as building perception from the features of the letters",
        "Describes top-down processing as using context and expectations to interpret unclear letters",
        "Gives a correct example of Weber's law, such as noticing 1 pound added to 5 pounds but not to 50",
      ],
      model:
        "Transduction in the eye converts light into neural signals. Bottom-up processing builds the perception from the features of the letters, like lines and curves. Top-down processing uses context and expectations to interpret unclear letters, so a messy word makes sense in a sentence. By Weber's law, a one-pound change is noticeable in a five-pound bag but not in a fifty-pound bag.",
      answers: [
        [
          "full",
          "[[0|First, rods and cones in the eye transduce light into neural signals.]] [[1|Bottom-up processing builds the letters from the lines and curves that feature detectors pick up.]] [[2|Top-down processing uses the context, so even if a letter is unclear I can guess the word from the sentence.]] [[3|Weber's law: you notice 1 added pound in a 5-pound bag, but not in a 50-pound bag.]]",
          "Full marks. All three ideas are illustrated.",
        ],
        [
          "full",
          "[[0|Transduction turns the light reflected by the page into electrical signals in the retina.]] [[1|With bottom-up processing, the brain assembles the strokes into letters.]] [[2|With top-down processing, my expectations about what the note would say help me decode messy words.]] [[3|By Weber's law, a small change is noticeable only if it's a large fraction of the original stimulus.]]",
          "Full marks. Your statement of Weber's law is accurate.",
        ],
        [
          "partial",
          "[[0|Light is transduced into neural signals.]] [[1|Bottom-up is building from the lines.]] Top-down is when you look from the top of the page. [[3|Weber's law is about how much change we notice.]]",
          "Top-down processing is not about position on the page; it is using knowledge and context. Give an example of Weber's law.",
        ],
        [
          "partial",
          "[[2|Top-down uses context to guess words.]] [[3|1 pound added to 5 pounds is noticeable.]] Bottom-up uses your expectations.",
          "Bottom-up starts with sensory input, not expectations. Add transduction as the first step.",
          true,
        ],
        [
          "weak",
          "Both are the same thing. Weber's law is a law about weight.",
          "Bottom-up and top-down are different and Weber's law applies to all senses, not just weight.",
        ],
        [
          "weak",
          "[[0|Light is transduced.]] Bottom-up is when we are happy and top-down is when we are sad.",
          "The terms describe the direction of processing, not mood.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Depth perception and constancies, and two kinds of conditioning",
  note: `
## Objectives

Students will be able to:

1. explain depth perception and perceptual constancies;
2. compare classical and operant conditioning and give an example of each.

## Materials

Images with depth cues, a Pavlov's dogs diagram, a card sort of conditioning terms, a list of scenarios, the worksheet.

## Starter (6 minutes)

Cover one eye and try to touch a pen tip to another pen held by a partner. Ask: "Why is it harder with one eye?" Introduce binocular cues.

## Main activity

1. Depth perception: binocular cues (retinal disparity, convergence) and monocular cues (relative size, interposition, linear perspective, texture gradient, relative height, motion parallax). Perceptual constancies: size, shape, color and brightness constancy, why objects look stable despite changes in the image.
2. Classical conditioning (Pavlov): UCS, UCR, NS, CS, CR; acquisition, extinction, spontaneous recovery, generalization and discrimination. Watson's Little Albert and a modern example: a phone buzz that signals a message and makes the heart race.
3. Operant conditioning (Skinner, Thorndike's law of effect): reinforcement increases behavior (positive: add a pleasant stimulus; negative: remove an unpleasant one) and punishment decreases it (positive: add; negative: remove). Shaping.
4. Sort scenarios into classical or operant.

## Checking for understanding

Whiteboards: identify the UCS, UCR, CS and CR in a scenario about a dentist's drill.

## Worksheet

Depth cues and conditioning scenarios.
`,
  reading: [
    "How we see depth, and how we learn associations and consequences",
    `
The retina is flat, yet we see a three-dimensional world. The brain uses **depth cues**. **Binocular cues** need both eyes. **Retinal disparity** is the slight difference between the images on the two retinas; the brain uses a greater disparity to judge that an object is closer. **Convergence** is the inward turning of the eyes as an object gets closer. **Monocular cues** work with one eye. **Relative size**: if two objects are believed to be the same size, the smaller image seems farther away. **Interposition**: an object that blocks another seems closer. **Linear perspective**: parallel lines, like railroad tracks, seem to converge in the distance. **Texture gradient**: texture seems finer farther away. **Relative height**: objects higher in the visual field appear farther away. **Motion parallax**: near objects seem to move faster than far ones when we travel, as telephone poles do when seen from a car.

**Perceptual constancy** is our ability to see objects as stable despite changes in the retinal image. **Size constancy** lets us see a friend walking away as the same size even though the image on the retina shrinks. **Shape constancy** lets us see a door as rectangular even when it is partly open. **Color and brightness constancy** let us see a red shirt as red in shade or sun.

Learning is a change in behavior due to experience. In **classical conditioning**, a neutral stimulus becomes associated with an unconditioned stimulus and comes to trigger a response. Ivan Pavlov noticed that dogs salivated at the sight of the person who fed them. In his experiment, food is the **unconditioned stimulus (UCS)** and salivation is the **unconditioned response (UCR)**. A neutral stimulus, the bell, is paired with the food and becomes a **conditioned stimulus (CS)**, which triggers a **conditioned response (CR)**, salivation to the bell alone. Learning the association is **acquisition**. If the CS appears repeatedly without the UCS, the response weakens, which is **extinction**, though it may reappear after a rest, called **spontaneous recovery**. **Generalization** is responding to similar stimuli; **discrimination** is responding only to the CS. A modern example: a dentist's drill (UCS) produces fear (UCR); after several visits, the sound of the waiting room's door (CS) makes your heart race (CR).

In **operant conditioning**, behavior is shaped by its consequences. Edward Thorndike's **law of effect** says behaviors followed by satisfying consequences are likely to be repeated. B. F. Skinner extended it. **Reinforcement** increases behavior: **positive reinforcement** adds a pleasant stimulus (praise after a good grade); **negative reinforcement** removes an unpleasant one (fastening your seatbelt stops the buzzer). **Punishment** decreases behavior: **positive punishment** adds an unpleasant stimulus (a parking ticket); **negative punishment** removes a pleasant one (losing phone privileges). Negative reinforcement is not punishment.
`,
  ],
  cards: [
    ["Retinal disparity", "A binocular depth cue based on the difference between the two retinal images."],
    ["Linear perspective", "A monocular cue in which parallel lines seem to converge in the distance."],
    ["Size constancy", "Seeing an object as the same size despite changes in distance."],
    ["Unconditioned stimulus (UCS)", "A stimulus that naturally triggers a response."],
    ["Conditioned stimulus (CS)", "A neutral stimulus that comes to trigger a response through pairing."],
    ["Extinction", "The weakening of a conditioned response when the CS is no longer paired with the UCS."],
    ["Negative reinforcement", "Removing an unpleasant stimulus to increase a behavior."],
    ["Positive punishment", "Adding an unpleasant stimulus to decrease a behavior."],
  ],
  closed: [
    [
      "Railroad tracks that appear to meet in the distance illustrate:",
      ["Retinal disparity", "Linear perspective", "Interposition", "Convergence"],
      "B",
    ],
    [
      "Seeing a friend as the same size as they walk away is an example of:",
      ["Size constancy", "Retinal disparity", "Texture gradient", "Sensory adaptation"],
      "A",
    ],
    [
      "A dog salivates at a bell. The bell is the:",
      ["UCS", "UCR", "CS", "CR"],
      "C",
    ],
    [
      "Taking aspirin to remove a headache, which makes you more likely to take it again, is:",
      ["Positive reinforcement", "Negative reinforcement", "Positive punishment", "Negative punishment"],
      "B",
    ],
    [
      "A parent takes away a teen's phone for missing curfew. This is:",
      ["Positive reinforcement", "Negative reinforcement", "Positive punishment", "Negative punishment"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "A student has a panic attack in a hallway when the fire alarm rings. Months later, she feels her heart race whenever she hears any loud bell. Identify the UCS, UCR, CS and CR, and describe generalization in this scenario. Then explain how extinction could reduce her response.",
      scheme: [
        "Identifies the UCS as the fire alarm (or the original fear trigger) and the UCR as the panic or fear response",
        "Identifies the CS as the loud bell and the CR as the racing heart",
        "Identifies generalization as responding to similar sounds, such as any loud bell",
        "Explains that extinction occurs when the CS is presented repeatedly without the UCS",
      ],
      model:
        "The fire alarm is the UCS, and the panic is the UCR. The loud bell, after pairing, is the CS, and the racing heart is the CR. Her response to any loud bell, not only the alarm, is generalization. Extinction could occur if she repeatedly hears bells without anything frightening happening, so the association weakens.",
      answers: [
        [
          "full",
          "[[0|The UCS is the fire alarm and the UCR is the panic it causes.]] [[1|The CS is the loud bell and the CR is her racing heart.]] [[2|Responding to any loud bell, not just that one, is generalization.]] [[3|Extinction could happen if she hears bells many times without the alarm or panic, so the CS no longer predicts the UCS.]]",
          "Full marks. All the terms are applied to the scenario.",
        ],
        [
          "full",
          "[[0|Unconditioned stimulus: the fire alarm; unconditioned response: panic.]] [[1|Conditioned stimulus: loud bells; conditioned response: heart racing.]] [[2|Generalization is when she reacts to different bells that sound similar.]] [[3|Extinction is repeated exposure to bells without the scary event, which weakens the response.]]",
          "Full marks. This is a well-organized answer.",
        ],
        [
          "partial",
          "[[0|The fire alarm is the UCS and panic is the UCR.]] [[1|The bell is the CS.]] Extinction means she forgets the bell. Generalization is when she goes to the same hallway.",
          "Generalization is reacting to similar stimuli, like other bells. Extinction is the weakening of the response when the CS occurs without the UCS.",
        ],
        [
          "partial",
          "[[2|She reacts to many bells, which is generalization.]] [[3|Extinction happens when bells are heard without anything bad.]] The CS is the panic and the CR is the alarm.",
          "The CS is the bell and the CR is the racing heart. The alarm is the UCS and panic is the UCR.",
          true,
        ],
        [
          "weak",
          "This is operant conditioning because she learned by consequences. The bell is the reinforcement.",
          "This is classical conditioning: an association between a neutral bell and the alarm. Operant conditioning involves consequences.",
        ],
        [
          "weak",
          "[[0|The fire alarm is the UCS.]] Everything else is the same thing, a fear response, so there is no difference between the CR and the UCR.",
          "The UCR is the response to the alarm; the CR is the response to the bell. They are the same kind of response but to different stimuli.",
        ],
      ],
    },
    {
      prompt:
        "Classify each scenario as positive reinforcement, negative reinforcement, positive punishment or negative punishment, and explain: (1) A student gets praised for answering a question and begins to answer more. (2) A driver is given a speeding ticket and drives slower. (3) A student does homework to stop a parent's nagging. (4) A child loses TV time for hitting a sibling.",
      scheme: [
        "Classifies (1) as positive reinforcement because a pleasant stimulus (praise) is added and behavior increases",
        "Classifies (2) as positive punishment because an unpleasant stimulus (ticket) is added and behavior decreases",
        "Classifies (3) as negative reinforcement because an unpleasant stimulus (nagging) is removed and behavior increases",
        "Classifies (4) as negative punishment because a pleasant stimulus (TV time) is removed and behavior decreases",
      ],
      model:
        "(1) Positive reinforcement: praise is added and answering increases. (2) Positive punishment: the ticket is added and speeding decreases. (3) Negative reinforcement: the nagging is removed and homework increases. (4) Negative punishment: TV time is removed and hitting decreases.",
      answers: [
        [
          "full",
          "(1) [[0|Positive reinforcement: praise was added, and answering increased.]] (2) [[1|Positive punishment: a ticket was added and speeding decreased.]] (3) [[2|Negative reinforcement: the nagging was removed and doing homework increased.]] (4) [[3|Negative punishment: TV time was taken away and hitting decreased.]]",
          "Full marks. Each is classified and justified by the added or removed stimulus and the change in behavior.",
        ],
        [
          "full",
          "(1) [[0|Positive reinforcement, because a pleasant thing is added to make the behavior more likely.]] (2) [[1|Positive punishment, because an unpleasant thing is added to make the behavior less likely.]] (3) [[2|Negative reinforcement, because an unpleasant thing is removed to make the behavior more likely.]] (4) [[3|Negative punishment, because a pleasant thing is removed to make the behavior less likely.]]",
          "Full marks. The general rule for each category is stated clearly.",
        ],
        [
          "partial",
          "(1) [[0|Positive reinforcement.]] (2) [[1|Positive punishment.]] (3) Negative punishment, because the parent is nagging. (4) Negative reinforcement.",
          "In (3) the nagging is removed and homework increases, which is negative reinforcement. In (4) TV time is removed to decrease hitting: negative punishment.",
        ],
        [
          "partial",
          "(1) Positive punishment. (2) [[1|Positive punishment, a ticket is added.]] (3) [[2|Negative reinforcement.]] (4) Negative reinforcement.",
          "In (1) praise is added to increase behavior: positive reinforcement. Negative reinforcement removes an unpleasant stimulus, but in (4) TV time is pleasant.",
          true,
        ],
        [
          "weak",
          "All of them are punishment because the people are not happy about them.",
          "Reinforcement increases behavior and punishment decreases it. Positive and negative mean added or removed.",
        ],
        [
          "weak",
          "[[3|(4) is negative punishment.]] Negative means bad, so (2) and (3) are negative because they are bad.",
          "Negative means removing something, positive means adding. Judge by what is added or removed and the effect on the behavior.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Schedules of reinforcement and observational learning",
  note: `
## Objectives

Students will be able to:

1. apply schedules of reinforcement and explain how they shape behavior;
2. describe observational learning and Bandura's Bobo doll study.

## Materials

Examples of reward systems (a loyalty card, a slot machine, a paycheck, pop quizzes), video excerpt of the Bobo doll study (short), the worksheet.

## Starter (6 minutes)

Ask: "Why do people keep playing a slot machine even though it pays only sometimes?" Collect guesses. Introduce the idea that the pattern of reinforcement matters.

## Main activity

1. Continuous versus partial reinforcement: continuous leads to fast learning but fast extinction; partial reinforcement leads to slower learning but greater resistance to extinction.
2. Schedules: fixed ratio (reinforcement after a set number of responses, as in a coffee card after 10 purchases), variable ratio (after an unpredictable number, as in slot machines; produces high, steady response rates), fixed interval (after a set time, as in a paycheck every two weeks; response increases near the end), variable interval (after unpredictable time, as in pop quizzes or checking for texts; steady, slow response).
3. Observational learning: Albert Bandura, social learning theory, modeling, vicarious reinforcement. The Bobo doll study (1961): children who saw an adult act aggressively toward the doll imitated the aggression more than children who saw a non-aggressive model or no model. Later versions showed that vicarious punishment reduced imitation. Mirror neurons. Applications: media violence, prosocial modeling.
4. Classify examples of schedules.

## Checking for understanding

Whiteboards: classify "A salesperson earns a bonus after every five sales" and "A fisherman catches fish at random times."

## Worksheet

Schedule classification and Bobo doll analysis.
`,
  reading: [
    "Patterns of reward, and learning by watching",
    `
Not every behavior is reinforced every time. When reinforcement follows every response, it is **continuous reinforcement**. Learning is fast, but when reinforcement stops, the behavior fades quickly (fast extinction). When reinforcement follows only some responses, it is **partial reinforcement**. Learning is slower, but the behavior resists extinction, which is why people keep trying after many unrewarded attempts. The pattern of partial reinforcement is called a **schedule**, and there are four basic types.

A **fixed-ratio** schedule reinforces after a set number of responses. A coffee shop in Columbus gives a free drink after you buy ten; a worker paid per ten items built is on a fixed ratio. Response rates are high, with a short pause after each reward. A **variable-ratio** schedule reinforces after an unpredictable number of responses, such as a slot machine or a fisherman casting a line. It produces the highest, steadiest response rate and is the most resistant to extinction, which explains why gambling is so hard to stop and why some apps use random rewards. A **fixed-interval** schedule reinforces the first response after a set amount of time, as with a paycheck every two weeks or a weekly quiz. Responses speed up as the time approaches, like students studying just before a scheduled test. A **variable-interval** schedule reinforces the first response after an unpredictable amount of time, such as pop quizzes, or checking your phone for a text, and produces a slow, steady rate of responding. Ratio schedules depend on the number of responses, and interval schedules depend on time.

People and animals also learn by watching. **Observational learning** occurs when we learn by watching others, called **models**. Albert Bandura developed **social learning theory**, which says that we imitate behaviors we see, especially when the model is similar to us, is admired or is rewarded. In his famous **Bobo doll study** (1961), nursery-school children watched an adult in a room either punch and kick an inflatable doll while shouting, or play quietly with other toys. Later, the children who had seen the aggressive model were much more likely to hit the doll and to use the same words, even though they had not been rewarded for it. In later versions, children who saw the model rewarded were more aggressive, and children who saw the model punished were less so, which is **vicarious reinforcement** and **vicarious punishment**. Critics note that a doll is not a person and that the study was in a lab. Still, the research has influenced debates over violence in the media, and the same principle explains positive modeling: children who watch parents reading or helping others are more likely to do so. Neuroscientists have discovered **mirror neurons**, which fire both when we act and when we watch the same action.
`,
  ],
  cards: [
    ["Continuous reinforcement", "Reinforcing every response."],
    ["Partial reinforcement", "Reinforcing only some responses; resists extinction."],
    ["Fixed-ratio schedule", "Reinforcement after a set number of responses."],
    ["Variable-ratio schedule", "Reinforcement after an unpredictable number of responses."],
    ["Fixed-interval schedule", "Reinforcement for the first response after a set time."],
    ["Variable-interval schedule", "Reinforcement for the first response after an unpredictable time."],
    ["Observational learning", "Learning by watching others, called models."],
    ["Vicarious reinforcement", "Increased behavior after seeing a model rewarded."],
  ],
  closed: [
    [
      "A slot machine pays out after an unpredictable number of pulls. This is a:",
      ["Fixed-ratio schedule", "Variable-ratio schedule", "Fixed-interval schedule", "Variable-interval schedule"],
      "B",
    ],
    [
      "A paycheck every two weeks is a:",
      ["Fixed-ratio schedule", "Variable-ratio schedule", "Fixed-interval schedule", "Variable-interval schedule"],
      "C",
    ],
    [
      "Which schedule is most resistant to extinction?",
      ["Continuous reinforcement", "Variable-ratio", "Fixed-interval", "No reinforcement"],
      "B",
    ],
    [
      "In Bandura's Bobo doll study, children who saw an aggressive model:",
      ["Were less aggressive afterward", "Were more likely to imitate aggression", "Ignored the doll", "Were punished"],
      "B",
    ],
    [
      "Learning that increases after seeing a model rewarded is:",
      ["Vicarious reinforcement", "Negative punishment", "Extinction", "Discrimination"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Identify the schedule of reinforcement in each scenario and explain how it shapes the pattern of behavior: (1) A student earns a free sandwich after buying ten. (2) A teacher gives surprise quizzes at unpredictable times. (3) A person plays an online game where rare items appear at random. (4) A band member receives a stipend every month.",
      scheme: [
        "Identifies (1) as fixed ratio and describes a high rate with a pause after reward",
        "Identifies (2) as variable interval and describes steady, slow responding (studying regularly)",
        "Identifies (3) as variable ratio and describes high, steady responding and resistance to extinction",
        "Identifies (4) as fixed interval and describes increasing effort near the time of the reward",
      ],
      model:
        "(1) Fixed ratio: reinforcement after a set number of purchases, producing a high rate of buying with a pause after reward. (2) Variable interval: unpredictable times, producing steady studying. (3) Variable ratio: random rewards, producing a high, steady rate and resistance to extinction. (4) Fixed interval: payment after a set time, with effort increasing as the time approaches.",
      answers: [
        [
          "full",
          "(1) [[0|Fixed ratio: it's after ten purchases, so people buy fast and may pause after getting the sandwich.]] (2) [[1|Variable interval: the quizzes come at unpredictable times, so students study steadily.]] (3) [[2|Variable ratio: rare items come after an unpredictable number of tries, so players keep playing at a high steady rate and are hard to stop.]] (4) [[3|Fixed interval: the money comes after a set time, so effort may increase near payday.]]",
          "Full marks. Each schedule is identified and the behavior pattern is explained.",
        ],
        [
          "full",
          "(1) [[0|Fixed-ratio; a set number of responses (ten) gets the reward, so behavior is fast with a post-reinforcement pause.]] (2) [[1|Variable-interval; unpredictable timing leads to slow, steady responding.]] (3) [[2|Variable-ratio; this schedule leads to the highest response rate and the most resistance to extinction.]] (4) [[3|Fixed-interval; a scalloped pattern, with more activity as the payment date nears.]]",
          "Full marks. The scalloped pattern is a precise description.",
        ],
        [
          "partial",
          "(1) [[0|Fixed ratio.]] (2) Fixed interval because it is a quiz. (3) [[2|Variable ratio.]] (4) Fixed ratio.",
          "(2) is variable interval because the quizzes come at unpredictable times. (4) is fixed interval because the money comes after a set time.",
        ],
        [
          "partial",
          "(1) Variable ratio. (2) [[1|Variable interval, steady studying.]] (3) Variable ratio. (4) [[3|Fixed interval.]]",
          "(1) is fixed ratio because the number of purchases is set at ten. Explain how each schedule shapes behavior.",
          true,
        ],
        [
          "weak",
          "They are all just rewards. The schedule does not change behavior.",
          "The schedule of reinforcement strongly affects the pattern and persistence of behavior.",
        ],
        [
          "weak",
          "[[0|Fixed ratio.]] The rest are all variable ratio because rewards are random.",
          "(2) depends on time (variable interval), and (4) comes after a set time (fixed interval). Only (3) is variable ratio.",
        ],
      ],
    },
    {
      prompt:
        "Describe Bandura's Bobo doll study: the procedure, the results and what they show about learning. Then give one criticism or limitation and one real-world application.",
      scheme: [
        "Describes the procedure: children watched an adult model act aggressively or non-aggressively toward the doll",
        "Describes the result: children who saw aggression imitated it more",
        "States that the study shows that learning can occur by observation without direct reinforcement",
        "Gives a limitation (a doll is not a person, lab setting) and a real-world application (media violence or positive modeling)",
      ],
      model:
        "Children watched an adult either act aggressively toward an inflatable doll or play quietly. Afterward, children who saw the aggression were more likely to imitate it. This shows that people learn by observation without being directly reinforced. A limitation is that a doll is not a real person and the setting was a lab. An application is the concern over media violence or the use of positive role models.",
      answers: [
        [
          "full",
          "[[0|Children watched an adult either hit and kick a Bobo doll or play quietly with toys.]] [[1|The children who saw the aggressive adult were much more likely to hit the doll and use the same words.]] [[2|This shows that we can learn by watching, without being rewarded ourselves.]] [[3|A limitation is that a doll isn't a real person and it was a lab, and it applies to debates about violence in the media and the importance of positive role models.]]",
          "Full marks. All four parts are covered concisely.",
        ],
        [
          "full",
          "[[0|In the procedure, preschoolers saw either an aggressive or a non-aggressive model with an inflatable doll.]] [[1|Afterward, those who saw the aggressive model imitated the aggression more.]] [[2|It supports social learning theory: behavior is learned through observation and modeling.]] [[3|Critics say a doll can't fight back, so it isn't real aggression, but the findings are used to discuss the effect of media violence.]]",
          "Full marks. Linking the result to social learning theory is exactly what the question asks.",
        ],
        [
          "partial",
          "[[0|Children watched an adult with a doll.]] [[1|They imitated the adult.]] It shows that children are always aggressive. A limitation is the lab.",
          "The study does not show that children are always aggressive; it shows they imitate models. Say what the result shows about learning.",
        ],
        [
          "partial",
          "[[2|It shows we can learn by observation.]] [[3|It applies to media violence.]] The children were rewarded with candy for hitting the doll.",
          "In the original study the children were not rewarded; they learned by watching. Describe the procedure.",
          true,
        ],
        [
          "weak",
          "Bandura trained dogs to ring a bell and then showed they salivated. It showed classical conditioning.",
          "That is Pavlov. Bandura's study used an inflatable doll and showed observational learning.",
        ],
        [
          "weak",
          "[[1|Children who saw aggression were more aggressive.]] That means TV causes all violence in the world.",
          "The study shows imitation of observed behavior, not that media is the only cause of violence.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Free-response skills: define and apply, and interpret data",
  note: `
## Objectives

Students will be able to:

1. write a response that defines a term and applies it to a scenario;
2. interpret a data table from a study and state a conclusion.

## Materials

Practice free-response prompts (original), a scoring rubric, a data table from a fictional study, the quiz.

## Starter (6 minutes)

Give a scenario: "A student gets a free coffee after buying nine." Ask: "Define the schedule of reinforcement and apply it to this scenario." Write a model response together and underline the definition and the application.

## Main activity

1. The define-and-apply structure: (1) name the term, (2) define it in your own words, (3) apply it to the specific scenario using details from the prompt. A response that only defines gets partial credit. Use "because" to connect the concept to the evidence.
2. Practice: write responses to three scenarios (classical conditioning, a brain structure, a research method). Peer score with the rubric.
3. Data tables: read means, spot differences, state what the data show and what they do not. Conclusion template: "The data show that ___, because ___. However, ___ (limitation)."
4. Interpret a table: mean words recalled: caffeine group 14.2, placebo group 11.8, with 30 participants each; discuss sample size, random assignment and whether the difference might be due to chance.

## Checking for understanding

Ask: "What is wrong with the conclusion 'This proves caffeine improves memory'?"

## Quiz

A define-and-apply response and a data table.
`,
  reading: [
    "Writing about psychology, and reading the evidence",
    `
Many psychology exams, including the AP Psychology free-response questions, ask you to **define a concept and apply it to a scenario**. A good answer has three parts. First, **name** the concept. Second, **define** it in your own words. Third, **apply** it to the specific details of the scenario, using them as evidence. Defining alone is not enough; you must show how the concept appears in the example.

Here is a scenario: "A student notices that her heart races whenever she hears the school bell, because last year the bell rang during an emergency drill that frightened her." A strong response: "This is **classical conditioning**, learning an association between two stimuli. Before the drill the bell was a neutral stimulus. The drill was frightening, so the drill (unconditioned stimulus) produced fear (unconditioned response). Because the bell rang during the drill, the bell became a **conditioned stimulus**, and now it produces a racing heart, which is the **conditioned response**." Notice that the answer uses the words from the scenario (the bell, the heart, the drill) and connects each with the term. A weak response might say only: "Classical conditioning is when you learn by association," with no application.

Practice with other topics. For a brain structure: "The **hippocampus** is a limbic structure involved in forming new explicit memories. A person with damage to the hippocampus, like the patient in the case who can recall childhood but cannot remember what he ate for breakfast, shows this: he cannot form new memories." For a method: "A **correlational study** measures two variables to see if they are related, but cannot show cause. The study that found a relationship between sleep and grades is correlational because the researchers did not manipulate sleep."

Another important skill is reading a table of results. Suppose a study randomly assigns 60 students to a caffeine group or a placebo group (30 each) and asks them to learn a list of 20 words. The mean number of words recalled is 14.2 for the caffeine group and 11.8 for the placebo group. Because participants were randomly assigned and there was a placebo control, the study is an experiment, and the data suggest that caffeine improved recall by 2.4 words on average. A careful conclusion adds cautions: "The data show that the caffeine group recalled more words, which suggests caffeine may improve short-term recall. However, the sample was small and from one school, we do not know whether the difference is statistically significant, and the effect might not apply to other tasks or to other groups." Avoid saying "proves." Say "suggests," "supports" or "is consistent with."
`,
  ],
  cards: [
    ["Define and apply", "Name a concept, define it in your own words, and connect it to the scenario."],
    ["Operational definition", "A precise description of how a variable is measured."],
    ["Mean", "The average of a set of scores."],
    ["Statistical significance", "Evidence that a difference is unlikely to be due to chance."],
    ["Limitation", "A weakness of a study that limits its conclusions."],
    ["Placebo group", "A control group that receives an inactive treatment."],
    ["Generalize", "Apply results to other people or situations."],
    ["Suggests / supports", "Careful words for conclusions, instead of proves."],
  ],
  closed: [
    [
      "Which response earns full credit on a define-and-apply question?",
      ["Naming only the term", "Defining only", "Defining and linking to details in the scenario", "Giving an opinion"],
      "C",
    ],
    [
      "The mean recall for caffeine is 14.2 and for placebo is 11.8. The difference is:",
      ["1.4", "2.4", "3.4", "26.0"],
      "B",
    ],
    [
      "Which wording is the most appropriate scientific conclusion?",
      ["The study proves caffeine improves memory", "The data suggest caffeine may improve recall", "Caffeine is bad for memory", "The study is useless"],
      "B",
    ],
    [
      "A major limitation of a small sample from one school is that:",
      ["Results may not generalize", "The study has no variables", "Random assignment is impossible", "The placebo is invalid"],
      "A",
    ],
    [
      "Why is random assignment important in the caffeine study?",
      ["It makes the groups alike at the start so differences can be attributed to caffeine", "It guarantees significance", "It increases the sample", "It is not important"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Scenario: \"A teenager checks her phone every few minutes, and sometimes it buzzes with a message but at unpredictable times. She keeps checking even when there are no new messages for a long time.\" Define the schedule of reinforcement that best explains her behavior and apply it to the scenario. Explain why it is resistant to extinction.",
      scheme: [
        "Names the variable-interval schedule",
        "Defines it as reinforcement for the first response after an unpredictable amount of time",
        "Applies it: the buzz of a message comes at unpredictable times and checking the phone is the response",
        "Explains that unpredictability makes the behavior persist because the next reward could come at any time",
      ],
      model:
        "This is a variable-interval schedule: reinforcement is given for the first response after an unpredictable amount of time. In the scenario, a message arrives at unpredictable times, and checking the phone is the response. Because she never knows when the next message will come, she keeps checking, so the behavior is resistant to extinction.",
      answers: [
        [
          "full",
          "[[0|This is a variable-interval schedule of reinforcement.]] [[1|That means the reward comes for the first response after a time that changes and can't be predicted.]] [[2|In the scenario, the message (reward) comes at unpredictable times and checking the phone is the response.]] [[3|It resists extinction because she never knows when the next message will arrive, so she keeps checking even after long gaps.]]",
          "Full marks. The definition and the application use the details of the scenario.",
        ],
        [
          "full",
          "[[0|Variable interval is the schedule.]] [[1|It reinforces the first response after an unpredictable interval of time.]] [[2|The teenager's checking is the response and the message is the reinforcer, which arrives at random times.]] [[3|Because any check might be the one that gets rewarded, she doesn't stop easily, which shows resistance to extinction.]]",
          "Full marks. The point about any check being rewarded is a strong explanation.",
        ],
        [
          "partial",
          "[[0|It is variable ratio.]] [[2|She checks and gets messages sometimes.]] That makes her keep checking.",
          "The reward depends on time, not the number of checks, so it is variable interval. Define the schedule and explain why it resists extinction.",
        ],
        [
          "partial",
          "[[0|Variable interval.]] [[1|It is reinforcement after a set time.]] [[2|The messages come at unpredictable times.]]",
          "Variable interval means an unpredictable time, not a set time. Explain why it makes the behavior persist.",
          true,
        ],
        [
          "weak",
          "It is classical conditioning because the phone buzzes and she checks it, like Pavlov's dogs.",
          "Checking the phone is a voluntary behavior reinforced by messages, which is operant conditioning with a schedule.",
        ],
        [
          "weak",
          "[[2|The messages come at random times.]] She keeps checking because she is addicted, which is a schedule.",
          "Name the schedule and define it. Addicted is not a term that explains the pattern.",
        ],
      ],
    },
    {
      prompt:
        "A study randomly assigns 40 students to a sleep-extension group (9 hours) or a control group (usual sleep) for a week and gives both a reaction-time test. The mean reaction times are 285 ms for the sleep-extension group and 310 ms for the control group. Interpret the data: state the conclusion, the type of study, one reason the design supports it, and one limitation.",
      scheme: [
        "States that the sleep-extension group had faster reaction times by 25 ms on average",
        "Identifies the study as an experiment because of random assignment and manipulation of sleep",
        "States a design strength, such as random assignment or a control group",
        "States a limitation, such as a small sample, no test of significance, or limited generalization, and uses cautious wording",
      ],
      model:
        "The sleep-extension group had faster reaction times by 25 ms on average. The study is an experiment because sleep was manipulated and participants were randomly assigned. Random assignment and a control group support the claim. A limitation is the small sample of 40 students and that we do not know if the difference is statistically significant, so the data suggest, but do not prove, that sleep improves reaction time.",
      answers: [
        [
          "full",
          "[[0|The sleep-extension group reacted 25 ms faster on average (285 vs 310).]] [[1|It's an experiment because the researchers manipulated sleep and used random assignment.]] [[2|Random assignment and a control group let us attribute the difference to sleep.]] [[3|A limitation is the small sample of 40 and no test of significance, so the data suggest but don't prove that more sleep improves reaction time.]]",
          "Full marks. The conclusion uses cautious wording.",
        ],
        [
          "full",
          "[[0|The mean reaction time was 25 milliseconds lower for the group with extra sleep.]] [[1|The study is an experiment since sleep was the manipulated independent variable.]] [[2|Because participants were randomly assigned, the groups should be alike before the treatment.]] [[3|We can't be sure the difference is statistically significant, and results from 40 students may not generalize to everyone, so the data are consistent with a benefit.]]",
          "Full marks. 'Consistent with' is a careful phrase for the conclusion.",
        ],
        [
          "partial",
          "[[0|The sleep group was faster by 25 ms.]] [[1|It is an experiment.]] This proves that sleep makes you faster.",
          "Avoid 'proves'. Add the design strength and a limitation, such as the small sample.",
        ],
        [
          "partial",
          "[[2|Random assignment helps.]] [[3|The sample is small.]] The study is correlational because it measured reaction time.",
          "Because sleep was manipulated with random assignment, this is an experiment, not a correlational study.",
          true,
        ],
        [
          "weak",
          "The control group is better because 310 is higher than 285.",
          "In a reaction-time test, a lower number means faster. The sleep-extension group was faster by 25 ms.",
        ],
        [
          "weak",
          "[[1|It's an experiment.]] The data show that all teenagers should sleep nine hours.",
          "A small study cannot support a conclusion for all teenagers. Use cautious wording and name limitations.",
        ],
      ],
    },
  ],
};

writeCourse("ap-psychology-grade-11.json", "AP Psychology", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
