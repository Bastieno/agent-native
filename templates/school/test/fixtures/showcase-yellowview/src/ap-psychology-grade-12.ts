import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * AP Psychology, Grade 12, Quarter 1. Units 1 to 4 of the AP Psychology
 * course framework plus free-response skills. A separate book from Grade 11:
 * different examples, studies and data, with the same objectives.
 */

const w1: WeekInput = {
  topic: "Perspectives on one behavior, methods and a mindfulness experiment",
  note: `
## Objectives

Students will be able to:

1. describe the major perspectives in psychology and the questions each asks;
2. compare descriptive, correlational and experimental methods and say what each can show;
3. design a simple experiment and identify the independent variable, dependent variable and controls.

## Materials

A short vignette about procrastination, a perspective matching sheet, examples of surveys with biased wording, the worksheet.

## Starter (7 minutes)

Pose: "A senior keeps putting off college applications. Why?" Collect explanations on the board (fear of failure, a brain wired for immediate rewards, past criticism, family pressure, a habit learned from friends). Show that each is a different way of asking why.

## Main activity

1. Perspectives applied to procrastination: biological (the reward system favors immediate pleasure), evolutionary (valuing the present helped survival), behavioral (avoiding the task is reinforced by relief), cognitive (thoughts such as "I must do it perfectly"), psychodynamic (anxiety and unconscious conflict), humanistic (a need for autonomy and self-worth), sociocultural (family and peer expectations).
2. Methods: naturalistic observation (watching how students use study hall), survey (wording and sampling bias), case study, correlational study (hours of social media and sleep), experiment.
3. Design: "Does a 10-minute mindfulness exercise reduce test anxiety?" Name the IV, DV (an anxiety questionnaire score), groups, random assignment, placebo activity, and operational definitions.

## Checking for understanding

Whiteboards: write a better version of a biased survey question.

## Worksheet

Perspectives and an experiment design.
`,
  reading: [
    "Six reasons for one behavior, and a way to test one of them",
    `
Imagine a high school senior who keeps putting off college applications. Psychologists would not agree on one answer, because each **perspective** asks a different question. The **biological** perspective looks at the brain's reward system, which tends to favor immediate rewards over distant ones, so scrolling a phone feels better right now than writing an essay. The **evolutionary** perspective asks whether valuing the present was an advantage for our ancestors. The **behavioral** perspective points out that avoiding the task brings relief, and relief reinforces avoidance. The **cognitive** perspective focuses on thoughts such as "It has to be perfect or it's worthless." The **psychodynamic** perspective suggests that anxiety and unconscious conflicts about leaving home may be involved. The **humanistic** perspective emphasizes the student's need for autonomy and a sense of self-worth. The **sociocultural** perspective examines family expectations, peer norms and cultural messages about success. A full understanding often combines several perspectives.

To test an explanation, researchers choose a **method**. In **naturalistic observation**, the researcher records behavior in its natural setting without interfering, such as watching how students spend study hall. It shows real behavior, but the observer cannot control what happens, and people who know they are watched may change. A **survey** collects self-reports from many people, but results depend on the wording of questions and on the **sample**. A survey of only the students who attend an after-school club cannot represent the whole school (sampling bias). Biased wording, such as "Don't you agree that social media is ruining teens?", pushes respondents toward an answer. A **case study** gives rich detail on one person or group, but it may not generalize. A **correlational study** measures two variables, for example hours of social media use and hours of sleep, and computes r. It can predict but not show cause, because of third variables and the directionality problem. An **experiment** is the only method that can show cause and effect, because the researcher manipulates one variable (the **independent variable**), measures another (the **dependent variable**), randomly assigns participants to groups, and controls other variables.

Suppose a counselor asks, "Does a 10-minute mindfulness exercise before a test reduce test anxiety?" She recruits 80 volunteers and randomly assigns half to a mindfulness exercise (experimental group) and half to a 10-minute neutral activity such as reading a magazine (control or placebo group). Right before an identical test, everyone completes a 10-item anxiety questionnaire. The IV is the mindfulness exercise, the DV is the anxiety score (an **operational definition**), and the controls include the test, the time of day and the room. If the experimental group scores lower, and the groups were alike at the start, she can conclude the exercise reduced anxiety, with caution about whether the result generalizes beyond volunteers.
`,
  ],
  cards: [
    ["Evolutionary perspective", "Asks how a behavior helped ancestors survive and reproduce."],
    ["Sociocultural perspective", "Studies how culture, family and situation influence behavior."],
    ["Naturalistic observation", "Recording behavior in real settings without interfering."],
    ["Sampling bias", "A sample that does not represent the population."],
    ["Directionality problem", "Not knowing whether A causes B or B causes A."],
    ["Operational definition", "A precise statement of how a variable is measured."],
    ["Experimental group", "The group that receives the treatment."],
    ["Control group", "The group that does not receive the treatment."],
  ],
  closed: [
    [
      "Which perspective emphasizes that avoiding a task is reinforced by relief?",
      ["Behavioral", "Humanistic", "Evolutionary", "Psychodynamic"],
      "A",
    ],
    [
      "A survey of only the students who attend an after-school club would most likely suffer from:",
      ["Random assignment", "Sampling bias", "A placebo effect", "Double blinding"],
      "B",
    ],
    [
      "Which survey question is biased?",
      ["How many hours do you sleep?", "Don't you agree that homework is a waste of time?", "How often do you exercise?", "What is your grade level?"],
      "B",
    ],
    [
      "In the mindfulness study, the dependent variable is:",
      ["The mindfulness exercise", "The anxiety questionnaire score", "The room", "The time of day"],
      "B",
    ],
    [
      "Only which method can show cause and effect?",
      ["Survey", "Naturalistic observation", "Experiment", "Case study"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A researcher wants to know whether a 10-minute walk outdoors before studying improves how well students remember a list of 30 words. Design an experiment. Identify the independent variable, the dependent variable, the experimental and control groups, how participants should be assigned, and two controlled variables.",
      scheme: [
        "Identifies the independent variable as taking a 10-minute outdoor walk (or not) before studying",
        "Identifies the dependent variable as the number of words recalled",
        "Describes an experimental group (walk) and a control group (rest indoors), with random assignment",
        "Names two controlled variables, such as the word list, the study time, the time of day or the testing room",
      ],
      model:
        "The independent variable is whether students take a 10-minute outdoor walk before studying. The dependent variable is the number of the 30 words recalled. Students are randomly assigned to a walk group or to a control group that rests indoors for 10 minutes. The researcher controls the word list, the study time and the testing room.",
      answers: [
        [
          "full",
          "[[0|The independent variable is whether students take a 10-minute walk outdoors before studying.]] [[1|The dependent variable is how many of the 30 words they remember.]] [[2|I'd randomly assign students to the walking group or a control group that sits indoors for 10 minutes.]] [[3|Both groups would get the same word list, the same time to study and the same testing room.]]",
          "Full marks. Random assignment and the controls are clearly stated.",
        ],
        [
          "full",
          "[[0|IV: outdoor walk or no walk for 10 minutes before studying.]] [[1|DV: number of words recalled from the list of 30.]] [[2|Random assignment would put half of the 60 volunteers in the experimental group (walk) and half in a control group (rest).]] [[3|Controls: time of day, study time and the list of words.]]",
          "Full marks. The operational definition of the DV is clear.",
        ],
        [
          "partial",
          "[[0|The independent variable is the walk.]] [[1|The dependent variable is the number of words.]] I would let the students choose whether to walk or not.",
          "Letting students choose introduces self-selection bias. Use random assignment. Add two controlled variables.",
        ],
        [
          "partial",
          "[[2|One group walks and one rests, randomly assigned.]] [[3|Control the list and the study time.]] The dependent variable is the walk.",
          "The walk is the independent variable. The dependent variable is the number of words recalled.",
          true,
        ],
        [
          "weak",
          "I would ask students if walking helps them remember. That will show whether walking works.",
          "A survey shows opinions, not cause and effect. An experiment manipulates the walk and measures recall.",
        ],
        [
          "weak",
          "[[0|The independent variable is the walk.]] I'd give the walking group an easier word list so they do better.",
          "Both groups must receive the same list. A different list would be a confounding variable.",
        ],
      ],
    },
    {
      prompt:
        "Rewrite this biased survey question so it is neutral: \"Don't you agree that cell phones in school are distracting and should be banned?\" Then explain two ways a survey on this topic could suffer from sampling bias and one limitation of surveys compared with an experiment.",
      scheme: [
        "Rewrites the question in neutral wording (for example, how do cell phones affect your focus in class?)",
        "Gives one sampling bias, such as surveying only teachers or only students in one class",
        "Gives a second sampling bias, such as a volunteer sample or one grade only",
        "States that a survey cannot show cause and effect, while an experiment can",
      ],
      model:
        "Neutral version: How do cell phones in class affect your ability to focus? Sampling bias could happen if only teachers are surveyed, or if only students who volunteer respond. A survey describes opinions and cannot show cause and effect, whereas an experiment with random assignment can.",
      answers: [
        [
          "full",
          "[[0|A neutral version is: How do cell phones in school affect your ability to focus?]] [[1|A sampling bias would be surveying only teachers, who may not see the student view.]] [[2|Another is if only volunteers answer, because they might feel strongly.]] [[3|A survey can't show cause, but an experiment that manipulates phone use can.]]",
          "Full marks. You identified two different sources of sampling bias.",
        ],
        [
          "full",
          "[[0|Rewrite: What is your opinion of cell phone use during class?]] [[1|Surveying only one grade would give a biased sample.]] [[2|Sending the survey only to students in a tech class would also be biased.]] [[3|Unlike an experiment, a survey only reports opinions and can't show that phones cause distraction.]]",
          "Full marks. The rewritten question is neutral and open.",
        ],
        [
          "partial",
          "[[0|Do you think cell phones in school are good or bad?]] [[1|Surveying only teachers is biased.]] A survey is better than an experiment because it is faster.",
          "Faster is not better for showing cause. Add a second source of bias and a limitation of surveys.",
        ],
        [
          "partial",
          "[[3|A survey can't show cause.]] [[2|Volunteers could bias the sample.]] The question is fine as it is.",
          "The question is leading: it tells respondents what answer to give. Rewrite it neutrally.",
          true,
        ],
        [
          "weak",
          "A survey is always accurate since people tell the truth. Just ask more people.",
          "Surveys can be biased by wording and sampling, and people may not answer honestly.",
        ],
        [
          "weak",
          "[[0|Rewrite: How do phones affect focus?]] There is no bias if I survey my friends because I know them.",
          "Surveying only friends is a convenience sample, which is biased.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Research ethics and reading correlations",
  note: `
## Objectives

Students will be able to:

1. explain why research must follow ethical guidelines and name the safeguards that exist;
2. read a graph or a correlation and avoid concluding causation without an experiment.

## Materials

Summaries of the Little Albert study and a modern online experiment on emotional contagion, an informed consent form, scatterplots, the worksheet.

## Starter (6 minutes)

Pose: "A social media company changes what some users see to study whether it changes their mood, without telling them. Is this acceptable?" Gather opinions and name the ethical concerns.

## Main activity

1. Ethical principles: informed consent (and assent for minors), voluntary participation, right to withdraw, protection from harm, confidentiality, deception only when justified and followed by debriefing, and IRB review. Historical cases: Little Albert (Watson and Rayner, 1920) conditioned an infant to fear a white rat, and was never deconditioned; Milgram's obedience studies; a more recent controversy over a large online study of emotional contagion where participants had not given specific consent.
2. Animal research guidelines: minimize pain, justify the study, use the smallest number of animals.
3. Correlations: read a scatterplot of shoe size and reading score in elementary school (positive, due to age), screen time and mood, and hours of sleep and test scores. Evaluate with: is there a third variable? Could the direction be reversed? Was there a random sample?

## Checking for understanding

Ask: "Which safeguard was missing in the Little Albert study?"

## Worksheet

An ethics analysis and three correlation claims.
`,
  reading: [
    "Where research went wrong, and how to read a relationship",
    `
Psychology has learned about ethics partly from studies that went wrong. In 1920, John Watson and Rosalind Rayner conditioned a nine-month-old child, known as Little Albert, to fear a white rat by pairing it with a loud noise. Albert's fear generalized to other furry objects, such as a rabbit and a fur coat, and the researchers never reversed it. Today the study would not be approved: it caused lasting psychological harm to a child who could not give consent. Stanley Milgram's obedience experiments in the 1960s and Philip Zimbardo's prison simulation in 1971 also raised concerns about distress to participants. More recently, a large online experiment on emotional contagion altered the content that hundreds of thousands of users saw to see whether it changed their posts, and critics argued that agreeing to a general terms-of-service document was not informed consent for a psychological study.

These cases led to rules, which are enforced by an **Institutional Review Board (IRB)**. Participants must give **informed consent**, which means they know the purpose, procedure, risks and benefits and agree freely. Minors give **assent** and their parents give permission. Participation is **voluntary** and participants may **withdraw** at any time without penalty. Researchers must **protect participants from harm**, physical and psychological, and keep data **confidential** or anonymous. **Deception** is acceptable only if the research could not be done without it and the risks are minimal, and it must be followed by a full **debriefing**. For research with animals, scientists must justify the study, minimize pain and suffering, and use as few animals as possible.

A second responsibility is to interpret evidence correctly. Look at a **scatterplot**. If the points rise from lower left to upper right, there is a positive correlation; if they fall, the correlation is negative; if they form a cloud, there is little or none. The coefficient **r** ranges from -1 to +1. In a famous example, children's shoe size correlates positively with reading ability across elementary school. Large feet do not cause good reading. The **third variable** is age: older children have bigger feet and read better. Likewise, if teens who spend more time on screens report lower mood (r = -0.25), screens might lower mood, low mood might lead teens to spend more time on screens (reverse direction), or a third variable such as sleep loss or loneliness might affect both. The correlation is weak, and it cannot settle the question. Ask three questions of any correlation: Could a third variable explain it? Could the direction be reversed? How strong is it, and who was in the sample? Only an experiment with random assignment can establish cause.
`,
  ],
  cards: [
    ["Little Albert", "Watson and Rayner's 1920 study that conditioned fear in an infant."],
    ["Assent", "A minor's agreement to participate, along with parental permission."],
    ["Anonymous data", "Data collected without any identifying information."],
    ["Debriefing", "Explaining the full purpose and results to participants afterward."],
    ["Confounding variable", "An uncontrolled factor that affects the dependent variable."],
    ["Third variable", "A hidden factor that causes both of two correlated variables."],
    ["r = -0.25", "A weak negative correlation."],
    ["Informed consent", "Agreement to participate after learning purpose, risks and benefits."],
  ],
  closed: [
    [
      "Which ethical problem is most associated with the Little Albert study?",
      ["Lack of random assignment", "Lasting psychological harm to a child who could not consent", "A biased survey", "A small sample only"],
      "B",
    ],
    [
      "A minor's agreement to take part, in addition to parental permission, is called:",
      ["Debriefing", "Assent", "Confidentiality", "Deception"],
      "B",
    ],
    [
      "Shoe size and reading ability correlate in elementary school because of:",
      ["Big feet cause better reading", "Age, a third variable", "Reading causes foot growth", "Chance only"],
      "B",
    ],
    [
      "A correlation of r = -0.25 between screen time and mood is:",
      ["Strong and positive", "Weak and negative", "Strong and negative", "Zero"],
      "B",
    ],
    [
      "Deception in research is acceptable only if:",
      ["It is justified, minimal risk, and followed by debriefing", "It is always banned", "Participants are not told afterward", "The sample is large"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A company studies how seeing negative posts affects teens' moods by secretly changing the posts that appear in their feeds for a week. Evaluate this study. Identify three ethical problems, explain which safeguards are missing, and suggest how the study could be redesigned ethically.",
      scheme: [
        "Identifies the lack of informed consent (and parental permission for minors)",
        "Identifies the risk of psychological harm from showing negative content",
        "Identifies the missing debriefing and the lack of the right to withdraw or IRB review",
        "Suggests an ethical redesign, such as obtaining consent, using milder manipulation, monitoring distress, debriefing and IRB approval",
      ],
      model:
        "Participants did not give informed consent, and since they are minors, parents should have given permission. Showing negative posts could cause psychological harm. There is no debriefing and no chance to withdraw, and an IRB would likely not approve it. An ethical redesign would obtain consent and parental permission, limit the manipulation to a mild level, monitor distress, let participants withdraw, and debrief them.",
      answers: [
        [
          "full",
          "[[0|The teens didn't give informed consent, and since they are minors their parents should have given permission.]] [[1|Showing negative posts for a week could harm their mood.]] [[2|There is no debriefing and no right to withdraw, and an IRB probably wouldn't approve it.]] [[3|To fix it, the researchers would get consent from teens and parents, use a milder change, monitor distress, let people quit, and debrief everyone.]]",
          "Full marks. Each problem is linked to a safeguard, and your redesign is realistic.",
        ],
        [
          "full",
          "[[0|There was no informed consent or parental permission for minors.]] [[1|The negative content could cause psychological harm, especially for teens who already feel low.]] [[2|It lacked a debriefing, the right to withdraw and IRB review.]] [[3|A better design would recruit volunteers who consent, use a short and mild manipulation, include a way to opt out, and debrief with resources for support.]]",
          "Full marks. Including support resources is a strong ethical addition.",
        ],
        [
          "partial",
          "[[0|There was no consent.]] [[1|It could harm teens' mood.]] The study should just be banned and never done.",
          "Studies of social media can be ethical if redesigned. Add the missing safeguards: debriefing, right to withdraw and IRB review.",
        ],
        [
          "partial",
          "[[2|They needed a debriefing and IRB approval.]] [[3|Get consent and make the change mild.]] There is no ethical problem since the teens agreed to the app's terms.",
          "Agreeing to an app's terms is not informed consent for a psychological study. State the specific problems.",
          true,
        ],
        [
          "weak",
          "This is fine because social media is public and the posts are already there.",
          "The problem is that participants' moods were deliberately manipulated without their knowledge or consent.",
        ],
        [
          "weak",
          "[[1|The study could harm mood.]] The only problem is that the sample was too big.",
          "A large sample is not an ethical issue. The key problems are lack of consent, risk of harm and missing safeguards.",
        ],
      ],
    },
    {
      prompt:
        "A magazine reports: \"Teens who sleep less than 7 hours have lower GPAs (r = +0.40 between hours of sleep and GPA). So parents should make teens go to bed earlier to raise their grades.\" Evaluate the claim: explain what r = +0.40 means, give two alternative explanations, and describe an experiment to test the claim.",
      scheme: [
        "States that r = +0.40 is a moderate positive relationship between sleep and GPA, not proof of cause",
        "Gives one alternative explanation, such as a third variable (stress or a part-time job)",
        "Gives a second alternative, such as reverse direction (students with lower GPAs worry and sleep less)",
        "Describes an experiment with random assignment to different bedtimes and a measure of grades or performance",
      ],
      model:
        "An r of +0.40 shows a moderate positive relationship, meaning students who sleep more tend to have higher GPAs, but it does not prove that sleep causes better grades. A third variable such as stress or a demanding job could reduce both sleep and grades. Or the direction could be reversed: students with low grades may worry and sleep less. To test it, randomly assign students to earlier or usual bedtimes and compare performance.",
      answers: [
        [
          "full",
          "[[0|r = +0.40 is a moderate positive correlation, so more sleep goes with higher GPA, but it doesn't prove cause.]] [[1|A third variable like stress or a job could lower both sleep and grades.]] [[2|It could also be reversed: students with low grades worry and sleep less.]] [[3|An experiment would randomly assign students to earlier or usual bedtimes for a month and compare grades or test performance.]]",
          "Full marks. You evaluated the claim thoroughly and proposed a test.",
        ],
        [
          "full",
          "[[0|The correlation is moderate and positive, but a correlation can't show cause.]] [[1|Maybe students who are busy with sports and work sleep less and have less study time.]] [[2|Or students who struggle academically stay up late and worry.]] [[3|To test it, randomly assign half of a group to a set earlier bedtime and half to their usual bedtime, then compare a test they all take.]]",
          "Full marks. The explanation of busy schedules is a good third variable.",
        ],
        [
          "partial",
          "[[0|r = +0.40 shows a relationship.]] [[1|Maybe stress affects both.]] A survey of more teens would settle it.",
          "A larger survey would still be correlational. Add a reverse-direction explanation and an experiment.",
        ],
        [
          "partial",
          "[[3|Randomly assign teens to bedtimes and compare their grades.]] [[2|Maybe low grades cause less sleep.]] The claim is correct because the correlation is positive.",
          "A positive r does not mean sleep causes better grades. Explain what r = +0.40 means and name a third variable.",
          true,
        ],
        [
          "weak",
          "The claim is true. A positive correlation means that sleep causes good grades.",
          "Correlation does not show causation. Other explanations are possible.",
        ],
        [
          "weak",
          "[[0|r = +0.40 is moderate.]] I'd make half the teens stay up all night to see if grades drop.",
          "Keeping teens up all night could be harmful and breaks ethical rules. Use a mild, safe manipulation.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Neurons, neurotransmitters and how drugs change the synapse",
  note: `
## Objectives

Students will be able to:

1. describe the structure of a neuron and how neurons communicate;
2. explain the roles of neurotransmitters in mood, movement and memory, including how drugs and toxins act.

## Materials

A neuron model, synapse diagrams for caffeine, nicotine, cocaine and botulinum toxin, a card sort of neurotransmitters and functions, the quiz.

## Starter (6 minutes)

Ask: "How can a cup of coffee make you feel more awake? What is happening in your brain?" Collect ideas. Introduce the idea that drugs often act at the synapse.

## Main activity

1. Neuron structure and action potential: dendrites, soma, axon, myelin, terminal buttons; resting potential, threshold, all-or-none, refractory period; the synapse and receptor sites.
2. Neurotransmitters: acetylcholine (muscles, memory), dopamine (reward, movement), serotonin (mood), norepinephrine (alertness), GABA (inhibitory), glutamate (excitatory), endorphins (pain relief), and adenosine (builds up during waking and promotes sleepiness).
3. Drug and toxin effects: caffeine is an antagonist at adenosine receptors, so sleepiness signals are blocked; nicotine is an agonist at ACh receptors; cocaine blocks reuptake of dopamine; opioids are agonists at endorphin receptors; botulinum toxin prevents the release of ACh and causes paralysis, while in tiny doses it is used medically (and cosmetically).
4. Tolerance and withdrawal: the brain adapts to the drug's effect.

## Checking for understanding

Whiteboards: draw a synapse and show where caffeine acts.

## Quiz

Neurotransmitter functions and drug effects.
`,
  reading: [
    "Chemical messengers and the drugs that change them",
    `
Neurons communicate by electrical impulses along the axon and by chemicals across the synapse. The impulse, an **action potential**, begins when a neuron's signals reach the **threshold**; it obeys the **all-or-none principle**; and it is followed by a **refractory period**. At the **terminal buttons**, **neurotransmitters** are released into the **synapse**, bind to **receptor sites** on the next neuron, and are then cleared by **reuptake** or broken down by enzymes. The **myelin sheath** speeds up conduction along the axon.

Each neurotransmitter has typical roles. **Acetylcholine (ACh)** triggers muscle contraction and is involved in learning and memory. **Dopamine** is involved in voluntary movement and in the reward pathway, which makes behaviors such as eating or social success feel good. **Serotonin** affects mood, sleep and appetite. **Norepinephrine** raises alertness and arousal. **GABA** is the major inhibitory transmitter, and **glutamate** is the major excitatory one, especially important in learning. **Endorphins** reduce pain and promote pleasure. **Adenosine** accumulates in the brain during the day and makes us feel sleepy.

Many drugs and toxins work by changing the activity of neurotransmitters. An **agonist** mimics or enhances a neurotransmitter. An **antagonist** blocks it. **Caffeine** is an antagonist at adenosine receptors: because it blocks the receptors, adenosine cannot deliver its "sleepy" message, and we feel more alert. **Nicotine** is an agonist at certain ACh receptors and also triggers dopamine release in the reward pathway, which helps explain why it is addictive. **Cocaine** blocks the reuptake of dopamine, so more dopamine remains in the synapse, producing a rush of pleasure. **Opioids** such as morphine and heroin are agonists at endorphin receptors, relieving pain and producing euphoria, but they can slow breathing dangerously. **Botulinum toxin** prevents the release of ACh from the terminal buttons, causing paralysis; in tiny, controlled doses it is used to treat muscle spasms and, in cosmetic treatments, to relax facial muscles.

Regular drug use leads to **tolerance**, in which the brain adapts, for example by reducing the number of receptors, so that more of the drug is needed to get the same effect. When a person stops, **withdrawal** symptoms occur, often the opposite of the drug's effect: after heavy caffeine use, people experience headaches and tiredness, because the brain has more adenosine receptors than before.
`,
  ],
  cards: [
    ["Adenosine", "A neurotransmitter that builds up during waking and promotes sleepiness."],
    ["Caffeine", "An antagonist at adenosine receptors."],
    ["Nicotine", "An agonist at certain ACh receptors that also triggers dopamine release."],
    ["Cocaine", "A drug that blocks the reuptake of dopamine."],
    ["Opioids", "Agonists at endorphin receptors that relieve pain."],
    ["Botulinum toxin", "A toxin that blocks the release of ACh, causing paralysis."],
    ["Tolerance", "Needing more of a drug to get the same effect."],
    ["Withdrawal", "Symptoms that occur when a drug use stops."],
  ],
  closed: [
    [
      "Caffeine increases alertness by acting as an antagonist at which receptor?",
      ["Dopamine", "Adenosine", "Serotonin", "GABA"],
      "B",
    ],
    [
      "Cocaine produces a rush of pleasure by:",
      ["Blocking dopamine reuptake", "Blocking ACh release", "Mimicking endorphins", "Increasing GABA"],
      "A",
    ],
    [
      "Botulinum toxin causes paralysis because it:",
      ["Blocks the release of acetylcholine", "Blocks dopamine receptors", "Destroys myelin", "Mimics serotonin"],
      "A",
    ],
    [
      "Which neurotransmitter is the major inhibitory transmitter?",
      ["Glutamate", "GABA", "Dopamine", "Norepinephrine"],
      "B",
    ],
    [
      "Needing more of a drug to feel the same effect is called:",
      ["Withdrawal", "Tolerance", "Reuptake", "Antagonism"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how caffeine makes a person feel more alert. Include the role of adenosine, what type of drug caffeine is at the receptor, and why a regular coffee drinker may get a headache after stopping.",
      scheme: [
        "States that adenosine builds up during waking and promotes sleepiness by binding to its receptors",
        "States that caffeine is an antagonist that blocks adenosine receptors",
        "States that blocking the receptors prevents the sleepy signal, so the person feels more alert",
        "Explains that with regular use the brain makes more adenosine receptors (tolerance), so stopping leads to withdrawal such as headaches and tiredness",
      ],
      model:
        "Adenosine builds up during waking and promotes sleepiness by binding to its receptors. Caffeine is an antagonist that blocks these receptors, so the sleepy signal is not delivered and the person feels more alert. With regular use the brain makes more adenosine receptors, so tolerance develops. When caffeine stops, adenosine has more receptors to act on, which causes withdrawal effects like headaches and tiredness.",
      answers: [
        [
          "full",
          "[[0|Adenosine builds up while we're awake and binds to receptors to make us sleepy.]] [[1|Caffeine is an antagonist that blocks the adenosine receptors.]] [[2|With the receptors blocked, the sleepy signal doesn't get through, so we feel more alert.]] [[3|Regular drinkers grow more adenosine receptors, so when they stop there's a withdrawal headache and tiredness.]]",
          "Full marks. You explained both the effect and the tolerance and withdrawal.",
        ],
        [
          "full",
          "[[0|During the day adenosine accumulates and signals sleepiness.]] [[1|Caffeine occupies those receptors as an antagonist without activating them.]] [[2|So the message of fatigue is blocked and alertness increases.]] [[3|Over time the brain adds receptors (tolerance) and when you quit there's a rebound of sleepiness and headaches.]]",
          "Full marks. 'Occupies without activating' is a precise description of an antagonist.",
        ],
        [
          "partial",
          "[[0|Adenosine makes us sleepy.]] [[1|Caffeine blocks adenosine receptors.]] Caffeine gives you energy directly, like food.",
          "Caffeine does not give energy. It blocks sleepiness signals. Explain tolerance and withdrawal.",
        ],
        [
          "partial",
          "[[3|Withdrawal happens because the brain adds more receptors.]] [[2|The signal for sleepiness is blocked.]] Caffeine is an agonist for adenosine.",
          "Caffeine is an antagonist because it blocks the receptors. An agonist would imitate adenosine and make you sleepier.",
          true,
        ],
        [
          "weak",
          "Caffeine adds more adrenaline to the neurons, which wakes the brain up.",
          "Caffeine mainly blocks adenosine receptors. Adrenaline comes from the adrenal glands.",
        ],
        [
          "weak",
          "[[1|Caffeine blocks receptors.]] The headache is because the person is dehydrated and has nothing to do with the brain.",
          "Withdrawal headaches are linked to the brain's adaptation to caffeine, with more adenosine receptors.",
        ],
      ],
    },
    {
      prompt:
        "Compare how nicotine, cocaine and opioids change the activity of neurotransmitters at the synapse. For each, name the neurotransmitter system involved and say whether the drug acts as an agonist, antagonist or reuptake blocker. Explain why these drugs can lead to addiction.",
      scheme: [
        "States that nicotine is an agonist at ACh receptors (and triggers dopamine release)",
        "States that cocaine blocks the reuptake of dopamine",
        "States that opioids are agonists at endorphin receptors",
        "Explains that they all activate the reward pathway (dopamine), reinforcing use, and that tolerance and withdrawal contribute to addiction",
      ],
      model:
        "Nicotine is an agonist at ACh receptors and also triggers dopamine release. Cocaine blocks the reuptake of dopamine, so more stays in the synapse. Opioids are agonists at endorphin receptors, relieving pain. All of them activate the brain's reward pathway, which reinforces use, and tolerance and withdrawal make it hard to stop, which leads to addiction.",
      answers: [
        [
          "full",
          "[[0|Nicotine is an agonist at ACh receptors and also leads to dopamine release.]] [[1|Cocaine blocks the reuptake of dopamine so more of it stays in the synapse.]] [[2|Opioids are agonists at endorphin receptors and relieve pain.]] [[3|They all activate the reward pathway, so using them is reinforcing, and tolerance and withdrawal make it hard to stop.]]",
          "Full marks. The reward pathway is the common link.",
        ],
        [
          "full",
          "[[0|Nicotine mimics ACh at its receptors, an agonist, and boosts dopamine.]] [[1|Cocaine is a reuptake blocker for dopamine.]] [[2|Opioids such as morphine act as agonists at the brain's endorphin receptors.]] [[3|Because each increases activity in the dopamine reward system, the behavior is reinforced, and tolerance and withdrawal drive continued use.]]",
          "Full marks. Naming each as agonist or reuptake blocker is exactly right.",
        ],
        [
          "partial",
          "[[0|Nicotine is an agonist for ACh.]] [[1|Cocaine blocks dopamine reuptake.]] Opioids block endorphins to stop pain.",
          "Opioids are agonists at endorphin receptors: they mimic endorphins. Explain why the drugs can lead to addiction.",
        ],
        [
          "partial",
          "[[2|Opioids are agonists at endorphin receptors.]] [[3|They affect the reward pathway.]] Cocaine is an antagonist for dopamine.",
          "Cocaine blocks dopamine reuptake, which increases dopamine in the synapse. It is not an antagonist.",
          true,
        ],
        [
          "weak",
          "These drugs all destroy neurons, which is why people can't stop.",
          "They change neurotransmitter activity at the synapse. Addiction involves the reward pathway, tolerance and withdrawal.",
        ],
        [
          "weak",
          "[[1|Cocaine blocks reuptake.]] Addiction is just a lack of willpower and has nothing to do with the brain.",
          "Addiction involves changes in brain chemistry, though many factors contribute.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Brain plasticity, split brains and hormones",
  note: `
## Objectives

Students will be able to:

1. name the major structures of the brain and the functions of each lobe;
2. describe how the endocrine system and the nervous system work together.

## Materials

A brain diagram, a summary of Sperry and Gazzaniga's split-brain research, an article on London taxi drivers' hippocampi, a hormone chart, the problem set.

## Starter (6 minutes)

Pose: "If a person's brain were cut in two, would they have two personalities?" Collect guesses. Introduce split-brain research.

## Main activity

1. Review structures and lobes: frontal, parietal, temporal, occipital, with motor and somatosensory cortex, Broca's and Wernicke's areas; hindbrain, limbic system, thalamus, hypothalamus.
2. Hemispheres: the corpus callosum; split-brain patients (severed corpus callosum to treat severe epilepsy): information shown to the left visual field goes to the right hemisphere, which cannot speak but can act (draw), and information in the right visual field goes to the left hemisphere, which can name it. Cautions about "left-brained" and "right-brained" myths.
3. Plasticity: the brain changes with experience and after injury. London taxi drivers have a larger posterior hippocampus; stroke recovery as other areas take over functions; children recover from hemisphere damage better than adults.
4. Endocrine system: hormones from glands (pituitary, thyroid, adrenal, pancreas, gonads) and others: melatonin from the pineal gland (sleep), oxytocin (bonding), leptin and ghrelin (hunger and fullness). The hypothalamus links nervous and endocrine systems.

## Checking for understanding

Ask: "Why can a split-brain patient draw a spoon with the left hand but not name it?"

## Problem set

Split-brain scenarios and hormone functions.
`,
  reading: [
    "A brain that changes, two halves that talk, and hormones",
    `
The cerebral cortex is divided into the left and right **hemispheres**, connected by the **corpus callosum**, a thick band of nerve fibers. In the 1960s, Roger Sperry and Michael Gazzaniga studied patients who had had the corpus callosum cut to control life-threatening epilepsy. The surgery reduced seizures, and these **split-brain** patients seemed normal in daily life. But in carefully designed experiments the two hemispheres could be tested separately. Information from the right visual field goes to the left hemisphere, which in most people includes the language areas. Information from the left visual field goes to the right hemisphere. When a picture of a spoon was flashed to the right visual field, the patient could say "spoon." When it was flashed to the left visual field, the patient said they saw nothing, yet the left hand (controlled by the right hemisphere) could pick out a spoon from a group of hidden objects or draw it. The right hemisphere knew, but without the connection to the language areas it could not say so. The research showed that the hemispheres have specialized functions, such as language in the left and spatial tasks and face recognition in the right. But the popular idea that people are "left-brained" (logical) or "right-brained" (creative) is a myth: in healthy people, the hemispheres work closely together on almost every task.

The brain is also not fixed. **Plasticity** is the brain's ability to change its structure and function in response to experience or injury. Brain scans of London taxi drivers, who memorize thousands of streets, show a larger posterior hippocampus than in non-drivers, and the more years they drive, the greater the difference. After a stroke damages an area that controls the right hand, therapy can lead other areas to take over some of the function, and recovery is often better in children, whose brains are more flexible. Learning a new skill, such as playing the violin, enlarges the cortical areas for the fingers.

The nervous system works with the **endocrine system**, which sends chemical messages through the blood. Besides the glands covered earlier, some hormones are important for behavior. The **pineal gland** secretes **melatonin**, which increases in darkness and promotes sleep; exposure to bright screens at night can delay it. **Oxytocin**, released by the pituitary, plays a role in childbirth, nursing and social bonding. **Ghrelin**, from the stomach, signals hunger, and **leptin**, from fat cells, signals fullness. The **hypothalamus** links the two systems: it receives neural information, then controls the pituitary gland, which regulates the other glands. This explains why emotional stress (a brain event) can change hormone levels, and why hormones can change mood and behavior.
`,
  ],
  cards: [
    ["Corpus callosum", "The band of fibers connecting the two hemispheres."],
    ["Split-brain patient", "A person whose corpus callosum was cut, usually to control epilepsy."],
    ["Plasticity", "The brain's ability to change with experience or injury."],
    ["Hippocampus", "A limbic structure involved in forming new explicit memories."],
    ["Melatonin", "A hormone from the pineal gland that promotes sleep."],
    ["Oxytocin", "A hormone involved in bonding, childbirth and nursing."],
    ["Ghrelin", "A hormone from the stomach that signals hunger."],
    ["Leptin", "A hormone from fat cells that signals fullness."],
  ],
  closed: [
    [
      "A picture flashed to the left visual field of a split-brain patient goes first to the:",
      ["Left hemisphere", "Right hemisphere", "Corpus callosum", "Cerebellum"],
      "B",
    ],
    [
      "A split-brain patient is shown a spoon in the left visual field. What can the patient do?",
      ["Say 'spoon'", "Pick out a spoon with the left hand", "Do neither", "Do both equally"],
      "B",
    ],
    [
      "The enlarged posterior hippocampus in London taxi drivers is an example of:",
      ["Plasticity", "Heredity only", "Sensory adaptation", "A tumor"],
      "A",
    ],
    [
      "Which hormone is secreted in darkness and promotes sleep?",
      ["Leptin", "Oxytocin", "Melatonin", "Ghrelin"],
      "C",
    ],
    [
      "Which statement about 'left-brained' and 'right-brained' people is most accurate?",
      ["It is a well-supported idea", "It is a myth; the hemispheres work together", "Left-brained people cannot be creative", "Right-brained people cannot do math"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain what happens when a picture of a key is flashed to the left visual field of a split-brain patient, and then to the right visual field. State what the patient can say and what the patient can do with each hand, and explain why.",
      scheme: [
        "States that the left visual field goes to the right hemisphere and the right visual field goes to the left hemisphere",
        "States that when the key is flashed to the right visual field, the patient can say 'key' because the left hemisphere has language",
        "States that when it is flashed to the left visual field, the patient cannot say what they saw, but the left hand can pick out the key",
        "Explains that the severed corpus callosum prevents the hemispheres from sharing information",
      ],
      model:
        "The left visual field goes to the right hemisphere and the right visual field goes to the left hemisphere. When the key is flashed to the right visual field, the left hemisphere, which has language, lets the patient say 'key'. When it is flashed to the left visual field, the patient cannot say what they saw, but the left hand, controlled by the right hemisphere, can pick out a key. The cut corpus callosum prevents the hemispheres from sharing the information.",
      answers: [
        [
          "full",
          "[[0|The left visual field goes to the right hemisphere and the right field goes to the left hemisphere.]] [[1|If the key is in the right visual field, the left hemisphere processes it, and the patient can say 'key'.]] [[2|If it is in the left visual field, the patient says they saw nothing, but the left hand can pick the key from a group of objects.]] [[3|This is because the corpus callosum is cut, so the right hemisphere can't tell the language areas what it saw.]]",
          "Full marks. You linked each visual field and hand to the hemisphere.",
        ],
        [
          "full",
          "[[0|Each visual field projects to the opposite hemisphere.]] [[1|The language centers are in the left hemisphere, so the patient names what appears in the right visual field.]] [[2|For the left field, the right hemisphere knows what it saw, so the left hand finds the key even though the patient says no.]] [[3|The severed corpus callosum blocks communication between the halves.]]",
          "Full marks. Saying the right hemisphere 'knows' captures the finding.",
        ],
        [
          "partial",
          "[[0|Each visual field goes to the opposite side.]] [[1|They can say 'key' for the right field.]] For the left field, they can't see the key at all because the eye is blind.",
          "The patient can see the key; the problem is that the right hemisphere cannot communicate with the language areas. The left hand can find it.",
        ],
        [
          "partial",
          "[[2|The left hand can pick the key for the left visual field.]] [[3|The corpus callosum is cut.]] The right hand picks the key for the left visual field.",
          "The right hemisphere controls the left hand. Explain which hemisphere handles each visual field.",
          true,
        ],
        [
          "weak",
          "The patient has two separate people in the brain and each one has a different name.",
          "Split-brain patients have one personality. The hemispheres cannot share some information.",
        ],
        [
          "weak",
          "[[3|The corpus callosum is cut.]] That is why the patient can't see out of one eye.",
          "The patient can see with both eyes; the cut prevents the hemispheres sharing information.",
        ],
      ],
    },
    {
      prompt:
        "Explain two examples of brain plasticity (for instance, taxi drivers or recovery after a stroke), and describe how melatonin and oxytocin show the endocrine system affecting behavior. Include the role of the hypothalamus.",
      scheme: [
        "Describes a correct example of plasticity, such as the enlarged hippocampus in London taxi drivers",
        "Describes a second example, such as recovery after a stroke or a learned skill enlarging a cortical area",
        "Explains that melatonin from the pineal gland increases in darkness and promotes sleep",
        "Explains oxytocin's role in bonding, and the hypothalamus linking the nervous and endocrine systems through the pituitary",
      ],
      model:
        "London taxi drivers have an enlarged posterior hippocampus from memorizing streets. After a stroke, other brain areas can take over some functions during therapy. Melatonin from the pineal gland rises in darkness and promotes sleep. Oxytocin supports bonding and nursing. The hypothalamus links the nervous system and the endocrine system by controlling the pituitary gland.",
      answers: [
        [
          "full",
          "[[0|London taxi drivers who memorize thousands of streets have a larger posterior hippocampus, which shows plasticity.]] [[1|After a stroke, therapy can help other areas take over some lost functions.]] [[2|Melatonin from the pineal gland increases in the dark and promotes sleep.]] [[3|Oxytocin helps with bonding and nursing, and the hypothalamus controls the pituitary, linking the nervous and endocrine systems.]]",
          "Full marks. Both examples of plasticity and both hormones are explained.",
        ],
        [
          "full",
          "[[0|A bigger hippocampus in taxi drivers shows the brain changes with experience.]] [[1|Practicing the violin enlarges the cortical area for the fingers.]] [[2|Bright screens at night can delay melatonin, which makes sleep harder.]] [[3|The hypothalamus signals the pituitary, which releases hormones like oxytocin that affect bonding.]]",
          "Full marks. The screen example connects hormones to everyday behavior.",
        ],
        [
          "partial",
          "[[0|Taxi drivers have a bigger hippocampus.]] [[2|Melatonin makes you sleepy.]] The pineal gland is next to the thalamus and does nothing.",
          "The pineal gland secretes melatonin. Add a second example of plasticity and the role of the hypothalamus.",
        ],
        [
          "partial",
          "[[1|Stroke recovery shows plasticity.]] [[3|The hypothalamus links the nervous and endocrine systems.]] Oxytocin is the hormone for hunger.",
          "Ghrelin signals hunger. Oxytocin is involved in bonding, childbirth and nursing.",
          true,
        ],
        [
          "weak",
          "The brain cannot change after childhood. Hormones are all made in the brain.",
          "The brain shows plasticity throughout life, though it is greater in children. Hormones are made in many glands.",
        ],
        [
          "weak",
          "[[2|Melatonin promotes sleep.]] Oxytocin is a stress hormone that makes people fight.",
          "Adrenaline and cortisol are stress hormones. Oxytocin is linked to bonding.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Twins reared apart, vision and hearing, and Gestalt principles",
  note: `
## Objectives

Students will be able to:

1. explain how nature and nurture interact, using twin and adoption studies;
2. describe how sensory receptors turn physical energy into neural signals;
3. compare bottom-up and top-down processing in perception.

## Materials

A summary of the Minnesota Study of Twins Reared Apart, a diagram of the eye and ear, Gestalt demonstrations, the worksheet.

## Starter (6 minutes)

Share the story of identical twins, separated at birth, who met at age 39 and found that both worked as firefighters, drove the same car and named their dogs the same. Ask: "Is that genes, environment, or coincidence?"

## Main activity

1. Nature and nurture: the Minnesota study of twins reared apart found strong similarities in personality, interests and IQ in identical twins, supporting genetic influence; but twins also shared prenatal environments, and some similarity may be coincidence. Temperament as an inherited tendency that interacts with parenting. Heritability and its limits.
2. Sensation: the eye (cornea, lens, retina, rods for dim light, cones for color, fovea, optic nerve, blind spot) and theories of color vision (trichromatic: three types of cones; opponent-process: pairs such as red-green). The ear (outer, middle, inner; cochlea and hair cells transduce vibration), place theory and frequency theory of pitch.
3. Perception: bottom-up and top-down; Gestalt principles (figure-ground, proximity, similarity, continuity, closure).

## Checking for understanding

Ask: "Why can't you see color well in dim light?"

## Worksheet

A twin analysis, eye and ear labeling and Gestalt demonstrations.
`,
  reading: [
    "Shared genes, shared senses, shared rules of seeing",
    `
In the 1980s, researchers at the University of Minnesota began studying identical twins who had been separated at birth and raised in different homes. They tested them on personality, intelligence and interests. The identical twins raised apart were remarkably similar, often as similar as identical twins raised together, and more similar than fraternal twins. For example, correlations for IQ in identical twins reared apart were about 0.7. The results support a genetic influence on many traits. But researchers urge caution: the twins shared the same prenatal environment, adoptive homes were often similar in social class, and with enough questions, some striking similarities (such as the same name for a dog) can be coincidences. The best conclusion is that genes and environment interact. A child with a genetically shy **temperament**, for example, may become more outgoing with a warm, encouraging family and more withdrawn in a critical one.

Sensation begins when sensory receptors detect energy. In the eye, light passes through the **cornea** and the **lens**, which focuses it on the **retina**. The retina contains **rods**, which are sensitive in dim light and do not detect color, and **cones**, which work in bright light and detect color and fine detail, concentrated at the **fovea**. Signals travel through the **optic nerve** to the brain; where it leaves the eye is the **blind spot**. The **trichromatic theory** says the retina has three types of cones, sensitive to red, green and blue light, and mixes their signals to produce all colors. The **opponent-process theory** says that neurons beyond the retina respond in opposing pairs (red versus green, blue versus yellow), which explains afterimages: staring at a red image and then looking at white gives a green afterimage. Both theories are true at different stages. In the ear, sound waves make the eardrum vibrate, bones in the middle ear amplify the vibration, and in the **cochlea**, hair cells transduce it into neural signals. **Place theory** says pitch depends on where on the cochlea the hair cells respond; **frequency theory** says the rate of neural firing matches the frequency of the sound; both play a role.

In perception, the brain organizes the input by **Gestalt principles**, the idea that the whole is different from the sum of its parts. **Figure-ground** is the tendency to see an object (figure) against a background. **Proximity** groups nearby elements together. **Similarity** groups elements that look alike. **Continuity** makes us perceive smooth, continuous lines. **Closure** makes us fill in gaps to see a complete shape. These rules work in a bottom-up and top-down way: the pattern in the input is organized by built-in rules, while our expectations help to resolve ambiguity.
`,
  ],
  cards: [
    ["Temperament", "An inherited tendency in emotional reactivity and activity level."],
    ["Rods", "Retinal cells for dim light and black and white vision."],
    ["Cones", "Retinal cells for color and fine detail in bright light."],
    ["Fovea", "The central area of the retina with the most cones."],
    ["Trichromatic theory", "Color vision based on three types of cones."],
    ["Opponent-process theory", "Color vision based on opposing pairs, such as red and green."],
    ["Cochlea", "The inner-ear structure containing hair cells that transduce sound."],
    ["Closure", "A Gestalt principle of filling in gaps to see a whole shape."],
  ],
  closed: [
    [
      "Which cells let us see color in bright light?",
      ["Rods", "Cones", "Hair cells", "Rods and hair cells"],
      "B",
    ],
    [
      "Afterimages are best explained by:",
      ["Trichromatic theory", "Opponent-process theory", "Place theory", "Frequency theory"],
      "B",
    ],
    [
      "Hair cells in the cochlea:",
      ["Focus light", "Transduce sound vibrations into neural signals", "Amplify sound in the middle ear", "Send smell signals"],
      "B",
    ],
    [
      "Seeing a circle made of dashes as a complete circle illustrates:",
      ["Proximity", "Closure", "Figure-ground", "Similarity"],
      "B",
    ],
    [
      "A reason to be cautious about the twin-reared-apart findings is that the twins:",
      ["Did not share genes", "Shared a prenatal environment and some similar adoptive homes", "Were too different", "Were not tested"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Identical twins reared apart have an IQ correlation of about 0.7, and fraternal twins reared together have about 0.5. Explain what these figures suggest about nature and nurture, and give two reasons for caution in interpreting studies of twins reared apart.",
      scheme: [
        "States that the higher correlation in identical twins, who share 100 percent of genes, suggests a genetic influence",
        "States that the correlation is below 1.0, so the environment also plays a role",
        "Gives one reason for caution, such as the twins shared a prenatal environment",
        "Gives a second reason, such as similar adoptive homes or coincidence in striking similarities",
      ],
      model:
        "Identical twins share 100 percent of their genes, and their higher correlation, even when reared apart, suggests that genes influence IQ. The correlation of 0.7 is below 1.0, so the environment also plays a role. Caution is needed because twins share a prenatal environment, adoptive homes are often similar in social class, and striking similarities can be coincidences.",
      answers: [
        [
          "full",
          "[[0|Identical twins share all their genes, and they're more alike even when separated, so genes influence IQ.]] [[1|0.7 is less than 1.0, so the environment matters too.]] [[2|Caution: twins share the same prenatal environment.]] [[3|Also adoptive homes can be alike, and some surprising similarities may just be coincidence.]]",
          "Full marks. You balanced the conclusion about genes with reasons for caution.",
        ],
        [
          "full",
          "[[0|The higher correlation for identical twins than fraternal twins suggests a genetic contribution.]] [[1|Because it isn't perfect, experiences also shape IQ.]] [[2|The twins were together in the womb, which is a shared environment.]] [[3|Adoption agencies often place children in similar homes, so the environments weren't totally different.]]",
          "Full marks. The point about adoption agencies is a strong one.",
        ],
        [
          "partial",
          "[[0|Identical twins share genes so IQ is genetic.]] [[2|They shared the womb.]] The environment doesn't matter.",
          "A correlation of 0.7, below 1.0, means the environment matters too. Give a second reason for caution.",
        ],
        [
          "partial",
          "[[1|The environment matters because it's not 1.0.]] [[3|Striking similarities may be coincidence.]] Fraternal twins have 100% of the same genes.",
          "Fraternal twins share about 50 percent of their genes. Identical twins share 100 percent.",
          true,
        ],
        [
          "weak",
          "IQ is entirely determined by genes, and the twin studies prove it.",
          "A correlation of 0.7 does not prove that IQ is entirely genetic. Environment contributes too.",
        ],
        [
          "weak",
          "[[2|They shared the womb.]] Twin studies are useless because twins are rare.",
          "Twin studies are useful, but they have limitations. Explain how to interpret the correlation.",
        ],
      ],
    },
    {
      prompt:
        "Explain why a person has poor color vision and low detail in dim light but good color and detail in bright light, using rods, cones and the fovea. Then describe two Gestalt principles and give an everyday example of each.",
      scheme: [
        "States that rods work in dim light but do not detect color",
        "States that cones work in bright light, detect color and fine detail, and are concentrated at the fovea",
        "Describes one Gestalt principle with a correct example (proximity, similarity, closure, continuity or figure-ground)",
        "Describes a second Gestalt principle with a correct example",
      ],
      model:
        "Rods work in dim light but do not detect color. Cones work in bright light, detect color and detail, and are concentrated at the fovea. In dim light, the cones do not respond well, so color and detail are lost. Proximity groups nearby items: dots close together look like a group. Closure fills gaps: a dashed circle looks complete.",
      answers: [
        [
          "full",
          "[[0|Rods work in dim light but they can't detect color.]] [[1|Cones need bright light, detect color and detail, and are packed in the fovea, so in dim light we lose color and detail.]] [[2|Proximity groups nearby things, like people standing close together looking like a group.]] [[3|Closure fills in gaps, like seeing a complete circle in a dashed circle.]]",
          "Full marks. Each cell type and each principle has an example.",
        ],
        [
          "full",
          "[[0|In dim light only rods respond, and they give black and white vision.]] [[1|Cones give color and sharpness in bright light, especially in the fovea.]] [[2|Similarity groups objects that look alike, such as seeing rows of red and blue seats in a stadium.]] [[3|Figure-ground lets you see text against the page.]]",
          "Full marks. The stadium seats are a clever example of similarity.",
        ],
        [
          "partial",
          "[[0|Rods are for dim light.]] [[1|Cones are for color.]] Proximity is when objects are similar. Closure is when something closes.",
          "Proximity means nearness, and closure means filling in a gap to see a whole. Give an everyday example for each.",
        ],
        [
          "partial",
          "[[1|Cones are in the fovea.]] [[2|Closure fills gaps.]] Rods detect color in dim light.",
          "Rods do not detect color. Explain why color vision fails in dim light and give a second Gestalt principle.",
          true,
        ],
        [
          "weak",
          "Eyes work the same in dim and bright light, and Gestalt principles are about German words.",
          "Rods and cones respond to different conditions. Gestalt is a school of psychology about organizing perception.",
        ],
        [
          "weak",
          "[[0|Rods work in dim light.]] The fovea is the part that sends the signal to the ear.",
          "The fovea is the retina's center with many cones. The optic nerve sends signals to the brain.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Illusions of size and depth, taste aversion and shaping",
  note: `
## Objectives

Students will be able to:

1. explain depth perception and perceptual constancies;
2. compare classical and operant conditioning and give an example of each.

## Materials

Pictures of the Ponzo and Müller-Lyer illusions and the Ames room, a summary of Garcia's taste aversion research, a plan for shaping a behavior (training a dog trick), the worksheet.

## Starter (6 minutes)

Show the Ponzo illusion (two equal horizontal bars on converging lines). Ask: "Which bar is longer?" Reveal they are equal. Discuss how depth cues trick us.

## Main activity

1. Depth cues and illusions: linear perspective makes the upper bar in the Ponzo illusion seem farther, so we judge it larger (size constancy misapplied). The Ames room: a distorted room that looks rectangular makes a person seem to grow or shrink. Constancies: size, shape, brightness, color.
2. Classical conditioning applied: conditioned taste aversion (John Garcia): rats that became ill after drinking saccharin water avoided it, even though the sickness came hours later, showing biological preparedness. Contrast with the fear of the doctor's office.
3. Operant conditioning applied: Skinner box; shaping a behavior by reinforcing successive approximations (teaching a dog to ring a bell); reinforcement, punishment and extinction.
4. Compare: classical is involuntary and associates stimuli; operant is voluntary and links behavior to consequences.

## Checking for understanding

Ask: "Why can one bad experience with a food lead to a lasting aversion?"

## Worksheet

Illusions, taste aversion and shaping.
`,
  reading: [
    "When depth cues fool us, and learning from nausea and from rewards",
    `
Our experience of size depends on distance, and the brain automatically uses depth cues to correct for it. This is **size constancy**. But when the cues are misleading, we are fooled. In the **Ponzo illusion**, two identical horizontal bars are placed between converging lines like railroad tracks. Because of **linear perspective**, the upper bar seems farther away, and the brain scales its size up, so we see it as longer. In the **Ames room**, which is built with slanted walls and floor but looks rectangular from a peephole, a person standing in the far corner looks tiny and a person in the near corner looks huge, because the brain assumes a normal room. The illusions show how perception is an active construction based on cues and assumptions.

Classical conditioning explains many emotional responses, and one striking case is **conditioned taste aversion**. In the 1950s and 1960s, John Garcia gave rats saccharin-flavored water and then made them sick with radiation or a chemical. The rats avoided saccharin afterward, even though the sickness began hours after they tasted it. This challenged two ideas: that the conditioned stimulus must come right before the unconditioned stimulus, and that any stimulus can be linked to any response. Rats readily linked taste with nausea but not lights or sounds with nausea. This shows **biological preparedness**: organisms are biologically ready to learn associations that helped survival, such as avoiding food that causes illness. Many people have such an aversion to a food they ate before a stomach flu, even though they know the food did not cause it. In the language of conditioning, the food (CS) was paired with illness (UCS), producing nausea (CR) at the taste or smell.

**Operant conditioning** is learning in which voluntary behavior is changed by its consequences. In a **Skinner box**, a rat presses a lever to receive food, and its rate of pressing rises (positive reinforcement). To teach a complex behavior, trainers use **shaping**, reinforcing **successive approximations** of the desired behavior. To teach a dog to ring a bell, the trainer first rewards looking at the bell, then moving toward it, then touching it, and finally ringing it. When reinforcement stops, the behavior fades through **extinction**, although it often shows an extinction burst, a temporary increase, first. **Punishment** decreases behavior but has downsides: it may suppress behavior only when the punisher is present, may cause fear, and does not teach what to do instead. Often reinforcing a desired behavior works better.

To tell the types apart, ask: Is the behavior reflexive or voluntary? In classical conditioning, a stimulus triggers an automatic response, and the learner associates two stimuli. In operant conditioning, the learner's own action produces a consequence, and the learner associates behavior and consequence.
`,
  ],
  cards: [
    ["Ponzo illusion", "An illusion in which converging lines make equal bars look unequal."],
    ["Ames room", "A distorted room that makes people seem to change size."],
    ["Conditioned taste aversion", "Avoiding a flavor after it is paired with sickness."],
    ["Biological preparedness", "An inborn readiness to learn certain associations."],
    ["Skinner box", "An apparatus for studying operant conditioning in animals."],
    ["Shaping", "Reinforcing successive approximations of a target behavior."],
    ["Extinction burst", "A temporary increase in behavior when reinforcement stops."],
    ["Successive approximations", "Behaviors that come closer and closer to the target."],
  ],
  closed: [
    [
      "In the Ponzo illusion, the upper bar looks longer because of:",
      ["Linear perspective", "Retinal disparity", "Convergence", "Brightness constancy"],
      "A",
    ],
    [
      "Garcia's research on rats and saccharin showed that:",
      ["Learning requires immediate pairing", "Animals are biologically prepared to link taste and sickness even with a long delay", "Lights and sounds are better CSs", "Conditioning cannot occur in rats"],
      "B",
    ],
    [
      "Teaching a dog to ring a bell by rewarding closer and closer behaviors is:",
      ["Shaping", "Extinction", "Spontaneous recovery", "Generalization"],
      "A",
    ],
    [
      "A person feels sick at the smell of a food eaten before a stomach flu. The smell is the:",
      ["UCS", "UCR", "CS", "Reinforcer"],
      "C",
    ],
    [
      "Which is a downside of punishment?",
      ["It may suppress behavior only when the punisher is present", "It always teaches the right behavior", "It increases the behavior", "It never causes fear"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A student eats a burrito at a restaurant and, six hours later, gets a stomach flu. Weeks later, the smell of a burrito makes her feel nauseated. Identify the UCS, UCR, CS and CR, and explain why this learning happened despite the long delay. Then explain how extinction could occur.",
      scheme: [
        "Identifies the stomach flu (illness) as the UCS and nausea as the UCR",
        "Identifies the smell or taste of the burrito as the CS and nausea at the smell as the CR",
        "Explains biological preparedness: organisms are biologically ready to link taste and illness even with a delay",
        "Explains extinction as repeated exposure to burrito smells without becoming ill, which weakens the response",
      ],
      model:
        "The stomach flu is the UCS and nausea is the UCR. The smell of a burrito is the CS and the nausea at the smell is the CR. This learning occurred despite the delay because of biological preparedness: organisms are ready to link tastes and illness. Extinction could occur if she smells or tastes burritos repeatedly without getting sick, so the association weakens.",
      answers: [
        [
          "full",
          "[[0|The UCS is the stomach flu and the UCR is the nausea it causes.]] [[1|The burrito's smell is the CS and the nausea at the smell is the CR.]] [[2|It happened even with a delay because of biological preparedness, since we are ready to link tastes with sickness.]] [[3|Extinction would happen if she has burritos repeatedly and doesn't get sick, so the association fades.]]",
          "Full marks. All terms are applied, and the role of preparedness is explained.",
        ],
        [
          "full",
          "[[0|Unconditioned stimulus: the illness; unconditioned response: feeling sick.]] [[1|Conditioned stimulus: the smell of burritos; conditioned response: nausea.]] [[2|Garcia's research shows that taste aversions form quickly even with hours between taste and sickness, because it is adaptive to avoid poisonous food.]] [[3|Presenting the CS many times without the UCS leads to extinction.]]",
          "Full marks. Linking to Garcia and adaptation is strong.",
        ],
        [
          "partial",
          "[[0|The stomach flu is the UCS and nausea is the UCR.]] [[1|The burrito smell is the CS.]] It happened because she is sensitive. Extinction means forgetting the burrito.",
          "Extinction is a weakening of the response when the CS occurs without the UCS, not forgetting. Explain biological preparedness.",
        ],
        [
          "partial",
          "[[2|We're biologically prepared to link food and sickness.]] [[3|Extinction occurs by repeated exposure to the smell without illness.]] The CS is the stomach flu.",
          "The CS is the smell of the burrito. The stomach flu is the UCS.",
          true,
        ],
        [
          "weak",
          "This is operant conditioning because eating the burrito was punished by getting sick.",
          "This is classical conditioning because an automatic response, nausea, is associated with a smell. Operant conditioning involves voluntary behavior.",
        ],
        [
          "weak",
          "[[0|The UCS is the flu.]] It can't be conditioning because six hours is too long for learning to happen.",
          "Taste aversion can form even with long delays because of biological preparedness.",
        ],
      ],
    },
    {
      prompt:
        "Describe how you would use shaping to teach a dog to ring a bell hanging by a door. List at least four successive approximations and the reinforcer. Then explain one advantage of using reinforcement rather than punishment to change behavior.",
      scheme: [
        "Names a reinforcer, such as a treat or praise",
        "Lists at least four successive approximations in order (look, approach, touch, ring)",
        "Explains that reinforcement is given for each closer approximation and not for earlier ones once the next step is learned",
        "States an advantage of reinforcement over punishment, such as that it teaches what to do and avoids fear",
      ],
      model:
        "I would use a treat as the reinforcer. First I reward the dog for looking at the bell, then for moving toward it, then for touching it with its nose, and finally for ringing it. Once a step is learned, I reward only the next closer approximation. Reinforcement is better than punishment because it teaches what to do and avoids fear.",
      answers: [
        [
          "full",
          "[[0|I'd use small treats as the reinforcer.]] [[1|First I reward looking at the bell, then walking toward it, then touching it with the nose, then ringing it.]] [[2|As the dog learns each step, I stop rewarding the earlier one and only reward the closer behavior.]] [[3|Reinforcement is better because it teaches the dog what to do, while punishment can cause fear and doesn't tell the dog the right behavior.]]",
          "Full marks. Shaping is described in clear steps with a rationale.",
        ],
        [
          "full",
          "[[0|Reinforcer: a treat plus praise.]] [[1|Successive approximations: looks at the bell, steps toward it, sniffs it, touches it, rings it.]] [[2|Each time, I raise the criterion so only the closer behavior gets the treat.]] [[3|Positive reinforcement builds a willing partner, whereas punishment suppresses behavior mainly when I am present and can cause fear.]]",
          "Full marks. The mention of raising the criterion is precise.",
        ],
        [
          "partial",
          "[[0|A treat is the reinforcer.]] [[1|I'd reward looking at the bell, then going near it, then ringing it.]] I'd reward every step forever. Punishment is better for fast results.",
          "In shaping you stop rewarding earlier steps as the dog progresses. Punishment has downsides, so explain an advantage of reinforcement.",
        ],
        [
          "partial",
          "[[2|You only reward the closer behavior after the dog learns a step.]] [[3|Reinforcement avoids fear.]] The reinforcer is the bell.",
          "The reinforcer is the treat or praise. The bell is the target. List the successive approximations.",
          true,
        ],
        [
          "weak",
          "I would wait until the dog rings the bell by itself and then give it a treat. That is shaping.",
          "Shaping rewards successive approximations. Waiting for the whole behavior might take a very long time.",
        ],
        [
          "weak",
          "[[0|I'd give a treat.]] I'd shout at the dog when it doesn't ring the bell because that teaches it quickly.",
          "Punishment may cause fear and does not teach what to do. Use reinforcement.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Reinforcement in apps and token economies, and observational learning",
  note: `
## Objectives

Students will be able to:

1. apply schedules of reinforcement and explain how they shape behavior;
2. describe observational learning and Bandura's Bobo doll study.

## Materials

Examples of app features (daily streaks, loot boxes, notifications), a token economy example from a classroom, a summary of Bandura's study and later research on prosocial modeling, the worksheet.

## Starter (6 minutes)

Ask: "Why do some mobile games send you a reward for logging in every day, and others give you random bonus items?" Collect ideas. Introduce schedules as design tools.

## Main activity

1. Schedules applied: a daily-login streak resembles a fixed interval (daily); a loot box resembles variable ratio; completing a set number of levels for a prize is fixed ratio; random bonus notifications resemble variable interval. Effects on persistence and extinction. Ethical implications of design.
2. Token economy: reinforcers (tokens) exchanged for backup reinforcers; used in classrooms and treatment programs.
3. Observational learning: models, attention, retention, reproduction and motivation; Bobo doll study; vicarious reinforcement; prosocial modeling (children watching helpful behavior are more helpful); mirror neurons; limitations of the Bobo doll research.

## Checking for understanding

Ask: "Which schedule does a loot box use, and why is it hard to stop opening them?"

## Worksheet

App schedules and a modeling analysis.
`,
  reading: [
    "Designing for habits, and learning from models",
    `
Schedules of reinforcement are not just laboratory ideas; they are used in the design of games, apps and workplaces. In a **fixed-ratio** schedule, reinforcement comes after a set number of responses: a game that gives a prize after every ten levels completed. In a **variable-ratio** schedule, reinforcement comes after an unpredictable number of responses: a **loot box** that sometimes holds a rare item. Variable-ratio schedules produce high, steady rates of responding and are very resistant to extinction, which is why critics worry about their use with teenagers. In a **fixed-interval** schedule, the first response after a set time is rewarded: a daily-login bonus that resets every 24 hours. People tend to check in once a day, near the time the reward becomes available. In a **variable-interval** schedule, the first response after an unpredictable time is rewarded: a random notification that offers a bonus, which encourages people to check the app again and again. Understanding the schedules helps people recognize how designs shape their own behavior.

Another application is the **token economy**, a system in which desired behaviors are reinforced with tokens (points, stickers, chips) that can later be exchanged for **backup reinforcers**, such as extra recess or a small prize. It is used in classrooms, residential programs and psychiatric hospitals. A teacher might give a token for each homework assignment turned in, and students can trade ten tokens for a choice of seat. Tokens are secondary reinforcers: they have value because of what they can buy.

People also learn by **observation**. Albert Bandura's social learning theory says that observing a **model** can change behavior, and that this requires **attention** to the model, **retention** of what was seen, the ability to **reproduce** the behavior, and **motivation**, which is influenced by whether the model was reinforced. In the 1961 **Bobo doll** study, preschool children saw an adult hit an inflatable doll with a mallet and shout. When later left with the doll, they imitated the aggression, including the exact words and actions, more often than children who had seen a calm model. In later studies, children who saw the model punished were less likely to imitate (**vicarious punishment**) but could still perform the actions if offered a reward, showing that they had learned it. Observational learning can promote helpful behavior as well. Children who watched adults share, or who watched prosocial programs, tend to behave more helpfully afterward. Limitations of the Bobo doll research include that the doll invites hitting, the setting was artificial, and the study measured short-term imitation. Neuroscientists have found **mirror neurons** in primates that respond both when an animal performs an action and when it watches another do it, which may support imitation.
`,
  ],
  cards: [
    ["Loot box", "A random reward that works like a variable-ratio schedule."],
    ["Daily login bonus", "A reward on a fixed-interval schedule."],
    ["Token economy", "A system where tokens earned for good behavior are exchanged for rewards."],
    ["Backup reinforcer", "A reward for which tokens can be exchanged."],
    ["Secondary reinforcer", "A reinforcer that gets its value from association with a primary reinforcer."],
    ["Model", "A person whose behavior is observed and imitated."],
    ["Vicarious punishment", "Reduced imitation after seeing a model punished."],
    ["Mirror neurons", "Neurons that fire when performing or watching an action."],
  ],
  closed: [
    [
      "A loot box that gives a rare item after an unpredictable number of tries is a:",
      ["Fixed-ratio schedule", "Variable-ratio schedule", "Fixed-interval schedule", "Variable-interval schedule"],
      "B",
    ],
    [
      "A daily-login bonus that resets every 24 hours is a:",
      ["Fixed-ratio schedule", "Variable-ratio schedule", "Fixed-interval schedule", "Variable-interval schedule"],
      "C",
    ],
    [
      "In a token economy, tokens are:",
      ["Primary reinforcers", "Secondary reinforcers", "Punishers", "Unconditioned stimuli"],
      "B",
    ],
    [
      "In Bandura's theory, which step requires that the observer pays attention to the model?",
      ["Attention", "Retention", "Reproduction", "Extinction"],
      "A",
    ],
    [
      "A child who saw a model punished but later performs the behavior when offered a reward shows that:",
      ["No learning had occurred", "Learning occurred but was not performed until motivated", "The child forgot the behavior", "The model was reinforced"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A game gives a gold coin for every five enemies defeated, a surprise bonus chest at unpredictable times while playing, a daily gift when you log in, and a rare card when you open a card pack. Identify the schedule for each and explain which is most likely to keep a player opening packs long after rewards stop coming.",
      scheme: [
        "Identifies the coin for every five enemies as a fixed-ratio schedule",
        "Identifies the surprise bonus chest as a variable-interval schedule",
        "Identifies the daily gift as a fixed-interval schedule and the card pack as a variable-ratio schedule",
        "Explains that the variable-ratio card pack is the most resistant to extinction because the next reward could come at any time",
      ],
      model:
        "The coin for every five enemies is a fixed-ratio schedule. The surprise bonus chest at unpredictable times is variable interval. The daily gift is fixed interval, and the rare card from packs is variable ratio. The card pack is most likely to keep a player opening packs after rewards stop, because variable-ratio schedules are the most resistant to extinction: the next pack could always be the winner.",
      answers: [
        [
          "full",
          "[[0|The coin for every five enemies is fixed ratio.]] [[1|The surprise chest at unpredictable times is variable interval.]] [[2|The daily gift is fixed interval, and the rare card from packs is variable ratio.]] [[3|The card packs are the most resistant to extinction, since the next pack might be the one with the rare card, so players keep going.]]",
          "Full marks. All four schedules are identified and the strongest one is justified.",
        ],
        [
          "full",
          "[[0|Fixed ratio: a set number of responses (five enemies) gets the reward.]] [[1|Variable interval: the bonus appears after unpredictable time.]] [[2|Fixed interval: daily login. Variable ratio: card packs, with unpredictable numbers of packs needed for a rare card.]] [[3|Variable ratio produces the highest, steadiest responding and resists extinction, so it explains why players keep opening packs.]]",
          "Full marks. The explanation of high, steady responding is accurate.",
        ],
        [
          "partial",
          "[[0|Fixed ratio is the coin.]] [[2|Daily gift is fixed interval.]] The bonus chest is variable ratio. Card packs are fixed interval.",
          "The bonus chest depends on time, so it is variable interval; card packs are variable ratio because the number of packs needed is unpredictable.",
        ],
        [
          "partial",
          "[[2|Card packs are variable ratio.]] [[3|They resist extinction.]] The coin is variable interval.",
          "A coin for every five enemies is a fixed number of responses, so it is a fixed-ratio schedule.",
          true,
        ],
        [
          "weak",
          "They are all the same because they are all rewards in a game.",
          "The schedules differ in whether reinforcement depends on the number of responses or on time, and whether it is predictable.",
        ],
        [
          "weak",
          "[[0|Fixed ratio is the coin.]] The daily gift is the most resistant to extinction because it is regular.",
          "Regular, predictable rewards produce less persistence than unpredictable ones. Variable ratio resists extinction the most.",
        ],
      ],
    },
    {
      prompt:
        "Describe Bandura's four steps of observational learning (attention, retention, reproduction, motivation) using the example of a child watching an older sibling help clean up a mess and get praised. Then explain what the Bobo doll study showed about aggression and one limitation of the study.",
      scheme: [
        "Applies attention and retention to the example (the child watches and remembers)",
        "Applies reproduction and motivation to the example (the child can do it and sees praise as a reward)",
        "Describes the Bobo doll result: children imitated an aggressive model more than those who saw a calm model",
        "Gives a valid limitation, such as the doll invites hitting, the setting was artificial, or only short-term imitation was measured",
      ],
      model:
        "The child pays attention to the sibling and remembers the steps. Later the child can reproduce the behavior, and is motivated because the sibling was praised, which is vicarious reinforcement. In the Bobo doll study, children who saw an aggressive adult imitated the aggression more than children who saw a calm model. A limitation is that the doll invites hitting and the setting was artificial.",
      answers: [
        [
          "full",
          "[[0|The child pays attention to the older sibling cleaning and remembers how it was done.]] [[1|Later the child is able to do it and is motivated because the sibling got praised.]] [[2|In the Bobo doll study, children who saw an adult hit the doll copied the aggression more than children who saw a calm adult.]] [[3|A limitation is that a doll invites hitting and the lab was artificial, so it may not show real-world aggression.]]",
          "Full marks. Each of the four steps is applied, and the study is described accurately.",
        ],
        [
          "full",
          "[[0|Attention: the child watches closely; retention: stores the sequence of cleaning.]] [[1|Reproduction: the child has the skill to do it; motivation: sees the sibling praised, which is vicarious reinforcement.]] [[2|Bandura found that children imitated the aggressive model, including the words and moves, more than the control children did.]] [[3|The study only measured short-term imitation with a doll, so we can't be sure it predicts real violence.]]",
          "Full marks. Naming vicarious reinforcement is correct and precise.",
        ],
        [
          "partial",
          "[[0|The child watches and remembers.]] [[1|The child is motivated by the praise.]] In the Bobo study, the children were rewarded for hitting. A limitation is that it used a doll.",
          "The children in the Bobo doll study were not rewarded; they imitated what they saw. Describe the result.",
        ],
        [
          "partial",
          "[[2|Children copied the aggressive adult.]] [[3|A doll invites hitting.]] Attention is when the child can do the behavior.",
          "Attention is paying attention to the model. Reproduction is the ability to do the behavior.",
          true,
        ],
        [
          "weak",
          "The child learns only when someone directly rewards the child. The Bobo doll shows that.",
          "Observational learning occurs without direct reward. The Bobo doll study shows that children imitated a model.",
        ],
        [
          "weak",
          "[[2|The children copied the adult.]] The limitation is that dolls cannot talk, so the research is invalid.",
          "A better limitation is that the doll invites hitting and the setting was artificial.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Writing about psychology and reading study data",
  note: `
## Objectives

Students will be able to:

1. write a response that defines a term and applies it to a scenario;
2. interpret a data table from a study and state a conclusion.

## Materials

Practice scenarios (original), a rubric, a data table from a fictional study of spaced versus massed studying, the quiz.

## Starter (6 minutes)

Give a scenario: "A student only studies the night before a test and forgets the material a week later." Ask: "Name a concept from this unit and apply it." Take two student answers and compare their quality.

## Main activity

1. Define and apply: name the concept, define it in your own words, apply it to details in the prompt. Practice with three scenarios: a brain structure (amygdala), a research method (naturalistic observation), a learning concept (variable ratio).
2. Common errors: defining without applying, naming without explaining, confusing similar terms (positive reinforcement vs positive punishment; negative reinforcement vs punishment), and overclaiming ("proves").
3. Reading a table: mean scores of two groups, sample sizes, how participants were assigned, what the table shows, what it does not show. Template: claim, evidence, reasoning, limitation.
4. Peer review of responses with the rubric.

## Checking for understanding

Ask: "What is wrong with writing 'this proves spaced studying works'?"

## Quiz

A define-and-apply response and a data table.
`,
  reading: [
    "From concept to scenario, and from numbers to claim",
    `
Writing about psychology is a skill that you can practice. The most common task is to **define a concept and apply it to a scenario**. Use three moves: **name** the concept, **define** it in your own words, and **apply** it by pointing to the specific details in the scenario. A response that stops after the definition earns only part of the credit.

Take this scenario: "Before a speech, a student's heart pounds and her palms sweat. She knows the feelings are caused by her body's stress response." Which structure is involved? A strong response: "The **amygdala** is a limbic structure that detects threats and triggers fear. When the student faces the speech, her amygdala signals the hypothalamus, which activates the sympathetic nervous system and the adrenal glands. The adrenal glands release adrenaline, which speeds up her heart and makes her palms sweat." The response names the amygdala, defines it, and traces the details in the scenario. A weak response would say, "The amygdala is part of the brain that deals with emotion," and stop.

Pay attention to common mix-ups. **Negative reinforcement** is not punishment: it removes something unpleasant to increase a behavior (taking an aspirin to end a headache). **Positive** and **negative** mean adding and removing. A **correlation** is not a **cause**. An **independent variable** is manipulated, and a **dependent variable** is measured. Also avoid the word "proves" in psychology; use "suggests," "supports" or "is consistent with."

You also need to read data. Imagine a study in which 50 students are randomly assigned either to study a set of vocabulary words in one long 2-hour session (massed practice) or in four 30-minute sessions across a week (spaced practice). Everyone takes the same test one week later. The table shows mean scores of 74 for the massed group (25 students) and 82 for the spaced group (25 students). Because of random assignment and a manipulated variable, this is an experiment. The independent variable is the type of practice, and the dependent variable is the test score. The data suggest that spaced practice produced 8 points higher scores on average. A complete conclusion uses the form **claim, evidence, reasoning, limitation**: "Spaced practice improves retention. The spaced group scored 82 compared with 74, a difference of 8 points. This is consistent with the idea that spacing allows time to consolidate memory. However, the sample was small and from one school, we cannot tell from the table whether the difference is statistically significant, and the results may not generalize to other kinds of material."
`,
  ],
  cards: [
    ["Name, define, apply", "The three moves of a define-and-apply response."],
    ["Spaced practice", "Studying in several shorter sessions spread over time."],
    ["Massed practice", "Studying in one long session."],
    ["Claim, evidence, reasoning", "A structure for supporting a conclusion."],
    ["Negative reinforcement", "Removing an unpleasant stimulus to increase a behavior."],
    ["Overclaiming", "Stating a stronger conclusion than the data support."],
    ["Statistical significance", "Evidence that a difference is unlikely to be due to chance."],
    ["Generalize", "Apply results to other people, places or materials."],
  ],
  closed: [
    [
      "A response that only defines a term and does not apply it to the scenario will typically:",
      ["Earn full credit", "Earn partial credit", "Earn extra credit", "Be marked as an opinion"],
      "B",
    ],
    [
      "Spaced practice mean 82, massed practice mean 74. What is the difference?",
      ["6", "8", "10", "156"],
      "B",
    ],
    [
      "Which phrase is the most appropriate for a conclusion from one small experiment?",
      ["This proves it", "The data suggest", "Everyone should", "It is a fact"],
      "B",
    ],
    [
      "In the spaced versus massed study, the independent variable is:",
      ["The test score", "The type of practice", "The school", "The vocabulary words"],
      "B",
    ],
    [
      "Taking an aspirin to end a headache, which makes you more likely to take it, is:",
      ["Positive reinforcement", "Negative reinforcement", "Positive punishment", "Negative punishment"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Scenario: \"Before a speech in front of the class, a student's heart pounds, her mouth goes dry and her palms sweat.\" Define the fight-or-flight response, apply it to the scenario by naming the structures and hormones involved, and explain why the effects are helpful in real danger.",
      scheme: [
        "Names and defines the fight-or-flight response as the body's rapid arousal to face or escape a threat",
        "Names the amygdala and hypothalamus as detecting the threat and activating the system",
        "Names the adrenal glands and adrenaline (and the sympathetic nervous system) and applies the hormone's effect to the heart pounding and sweating",
        "Explains that the effects, such as a faster heart rate and blood flow to muscles, prepare the body to act in real danger",
      ],
      model:
        "The fight-or-flight response is the body's rapid arousal to face or escape a threat. In the scenario, the amygdala detects the speech as a threat and the hypothalamus activates the sympathetic nervous system. The adrenal glands release adrenaline, which makes her heart pound and her palms sweat. In real danger these effects help because a faster heart rate sends more blood to the muscles for running or fighting.",
      answers: [
        [
          "full",
          "[[0|The fight-or-flight response is the body's quick arousal to face or escape a threat.]] [[1|In the scenario, the amygdala detects the speech as a threat and the hypothalamus activates the sympathetic nervous system.]] [[2|The adrenal glands release adrenaline, which makes her heart pound and her palms sweat.]] [[3|In real danger that is useful, since a faster heart rate sends more blood to the muscles so you can run or fight.]]",
          "Full marks. The concept is defined, applied to the details and explained.",
        ],
        [
          "full",
          "[[0|Fight-or-flight is the sympathetic nervous system's rapid arousal when we perceive danger.]] [[1|The amygdala flags the class as a threat and the hypothalamus triggers the response.]] [[2|Adrenaline from the adrenal glands increases her heart rate, which she feels as pounding, and cools her by sweating.]] [[3|If the threat were real, the extra blood flow and alertness would help her escape or defend herself.]]",
          "Full marks. A clear trace from structure to symptom.",
        ],
        [
          "partial",
          "[[0|Fight-or-flight is when the body gets ready to deal with danger.]] [[2|Adrenaline makes her heart pound.]] The cerebellum starts the response. It helps in danger.",
          "The amygdala and hypothalamus, not the cerebellum, start the response. Explain why the effects are helpful.",
        ],
        [
          "partial",
          "[[1|The amygdala and hypothalamus are involved.]] [[3|It helps the body run or fight.]] The pituitary gland releases adrenaline.",
          "The adrenal glands release adrenaline. Define the response and connect adrenaline to the heart and sweating.",
          true,
        ],
        [
          "weak",
          "She is just nervous. Nervousness is a feeling that has nothing to do with the body.",
          "The feelings are caused by the body's stress response, involving brain structures and hormones.",
        ],
        [
          "weak",
          "[[0|Fight-or-flight is a response to danger.]] It is a type of learning and it is permanent once learned.",
          "It is an innate physiological response, not a type of learning.",
        ],
      ],
    },
    {
      prompt:
        "A study randomly assigns 50 students to study vocabulary in one 2-hour session (massed, n = 25) or in four 30-minute sessions across a week (spaced, n = 25). A week later, the means on the same test are: massed 74, spaced 82. Interpret the table: state the type of study, the variables, the conclusion in careful words, and one limitation.",
      scheme: [
        "Identifies the study as an experiment because of the manipulated variable and random assignment",
        "Identifies the independent variable as the type of practice and the dependent variable as the test score",
        "States the conclusion: the spaced group scored 8 points higher, and the data suggest spaced practice improves retention",
        "States a limitation, such as the small sample, no information on statistical significance or limited generalization",
      ],
      model:
        "This is an experiment because the type of practice was manipulated and participants were randomly assigned. The independent variable is the type of practice and the dependent variable is the test score. The spaced group scored 8 points higher on average, which suggests that spaced practice improves retention. A limitation is that there were only 50 students and we do not know whether the difference is statistically significant.",
      answers: [
        [
          "full",
          "[[0|It is an experiment, since the researchers manipulated the practice type and used random assignment.]] [[1|The IV is massed versus spaced practice, and the DV is the test score.]] [[2|The spaced group scored 8 points higher on average, which suggests spaced practice improves retention.]] [[3|A limitation is that only 50 students took part and we don't know if the difference is statistically significant.]]",
          "Full marks. The conclusion is supported by the data and carefully worded.",
        ],
        [
          "full",
          "[[0|This is an experimental design with random assignment to two conditions.]] [[1|Independent variable: type of study schedule; dependent variable: score on the vocabulary test.]] [[2|The data are consistent with spaced practice producing better retention, an 82 compared with a 74.]] [[3|The results might not generalize beyond vocabulary or this school, and the table doesn't show a significance test.]]",
          "Full marks. 'Consistent with' is an appropriate scientific phrase.",
        ],
        [
          "partial",
          "[[0|It's an experiment.]] [[1|The IV is the type of study, the DV is the score.]] This proves that spacing works for everyone.",
          "Avoid 'proves' and 'everyone'. State the conclusion carefully and add a limitation.",
        ],
        [
          "partial",
          "[[2|The spaced group did better by 8 points.]] [[3|The sample is small.]] It is a correlational study since it measures scores.",
          "It is an experiment, because the practice type was manipulated and participants were randomly assigned.",
          true,
        ],
        [
          "weak",
          "The massed group did better because 74 is less than 82.",
          "The spaced group had the higher mean, 82 compared with 74, so it did better.",
        ],
        [
          "weak",
          "[[1|The IV is the type of practice.]] There is no limitation because the study was random.",
          "Random assignment is a strength, but every study has limitations, such as sample size or generalization.",
        ],
      ],
    },
  ],
};

writeCourse("ap-psychology-grade-12.json", "AP Psychology", "Grade 12", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
