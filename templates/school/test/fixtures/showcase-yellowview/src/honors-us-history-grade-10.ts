import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors US History, Grade 10, Quarter 1. Colonial America through the
 * founding, with weight on historians' arguments and source evaluation.
 * Standards: C3 Framework dimensions 1 to 4, in the school's own words.
 */

const w1: WeekInput = {
  topic: "Framing the question: three settlements, three kinds of evidence",
  note: `
## Objectives

Students will be able to:

1. frame a question about colonial America and decide which documents will help answer it;
2. explain how geography and motives shaped the settlement of the Chesapeake, New England and the Middle Colonies;
3. describe how Native nations, Europeans and enslaved Africans experienced colonial America.

## Materials

Teacher-written summaries of six sources (an account of the Jamestown "starving time" by a survivor, the Mayflower Compact, John Winthrop's lay sermon, a description of the Mystic fort attack in 1637, a Wampanoag oral tradition about the first winter, a Pennsylvania promotional tract), a blank question-to-source planning table, a map of the colonies with rivers and soil, and the exit ticket.

## Starter (8 minutes)

Write on the board: "In the winter of 1609 to 1610, Jamestown's population fell from about 500 to about 60." Ask students to calculate the percentage lost (88 percent) and then write the question a historian would ask next. Collect the questions and sort them into answerable and unanswerable.

## Main activity

1. Question workshop. Take the best question from the starter and, in pairs, build a planning table: for each part of the question, name the source type that would best answer it, what it would show and where it could mislead. Compare tables.
2. Three regions. Groups take one region and produce a one-slide argument: "The most important influence on [region] was ..., because ..." using geography, motive and people. Groups critique each other's slides with one objection each.
3. Perspectives. In small groups, students examine the Mystic summary and the Wampanoag tradition against the English accounts. For each pair they identify what the English source records and what it cannot know, and where the Native account is itself a later telling. Link to Ohio: the Scioto valley, where Columbus sits, was Shawnee homeland long before it was Ohio.

## Checking for understanding

Pairs trade question-to-source tables and give one suggestion each: a better source or a limit not yet noted.

## Exit ticket

State the question you would research about one colonial region, the two sources you would start with, and the strongest reason a source might mislead.
`,
  reading: [
    "Starving times, covenants and the problem of who wrote it down",
    `
Historians of early America work with a problem: nearly everything that survives was written by Europeans, and mostly by men who had reasons to praise their own enterprise. A good question therefore pairs what we want to know with the kinds of evidence that could answer it, and with a frank look at what each kind leaves out.

Consider Jamestown. In 1607 the Virginia Company sent about 100 men to the Chesapeake with a charter, investors' hopes and no strong plan for feeding themselves. In the winter of 1609 to 1610, known as the **starving time**, the colony's population dropped from roughly 500 to about 60 as famine and disease combined with a siege by Powhatan warriors. Accounts by colonists survive, and some mention shocking acts of desperation. Because the writers were defending the colony to investors, their record both supplies detail and shapes it. Archaeology at the fort site has recently added evidence of how people lived, ate and died. A later change came with tobacco, introduced as a profitable crop by John Rolfe by 1612. It rewarded large landholdings, and the headright system, which gave fifty acres for each person whose passage a planter paid, encouraged owners to import servants. Between 1619, when the House of Burgesses first met and about twenty enslaved Africans were landed at Point Comfort, and the later 1600s, planters moved from indentured servitude toward lifelong slavery.

New England began differently. The Pilgrims, who landed in 1620, and the Puritans who founded Massachusetts Bay in 1630 came largely in families and with a sense of purpose. The Mayflower Compact bound its signers to make "just and equal laws," and John Winthrop's sermon aboard the Arbella urged the Puritans to behave as "a city upon a hill," watched by the world. Both are primary sources that tell us how leaders wanted the colony to see itself. Neither tells us what the servants and the women who came with them thought. Town meetings gave adult male church members a voice, yet dissent was punished: Anne Hutchinson was banished in 1638 for her religious views, and Roger Williams founded Rhode Island after being forced out.

The Middle Colonies, taken from the Dutch in 1664 and extended by William Penn's colony of 1681, drew a mix of English, Dutch, German, Swedish and African people on fertile land with navigable rivers. Penn's promotional writing offered cheap land and religious tolerance, and the evidence of immigrant lists suggests thousands came for those reasons. A promoter's tract is a good source for what was promised, but not for what was delivered.

Native nations appear in all these stories as more than background. Native societies had their own political systems and trade networks, and many settlers relied on Native knowledge in early years. Disease, land seizure and war changed this. The Pequot War of 1637 ended in the burning of a fortified village at Mystic with the deaths of hundreds of Pequot men, women and children. King Philip's War in 1675 and 1676, between New England colonists and a coalition of Native nations including the Wampanoag, was among the deadliest conflicts in American history in proportion to population. To understand such events, historians need Native voices. Oral traditions preserved by Wampanoag and other communities, written records and archaeology provide some, though each has its own limits and cannot simply be read as a record of what happened.

The lesson for an investigator is to match the question to its evidence and to say plainly where the evidence is thin.
`,
  ],
  cards: [
    ["Starving time", "The winter of 1609 to 1610 at Jamestown when the colony shrank from about 500 to about 60."],
    ["Headright", "A grant of 50 acres to a person who paid for a new settler's passage to Virginia."],
    ["Mayflower Compact", "A 1620 agreement among the Plymouth settlers to make laws for the common good."],
    ["City upon a hill", "Winthrop's image of the Puritan colony as an example watched by the world."],
    ["Mystic (1637)", "The burning of a Pequot village by English and allied forces during the Pequot War."],
    ["King Philip's War", "The 1675 to 1676 war between New England colonists and a coalition of Native nations, deadly in proportion to population."],
    ["Oral tradition", "History passed down by spoken accounts in a community, valuable but shaped by retelling."],
    ["Question-to-source table", "A plan matching each part of a research question with the best source and its limits."],
  ],
  closed: [
    [
      "Jamestown's population fell from about 500 to about 60 in the starving time. About what percentage of the colonists were lost?",
      ["About 12 percent", "About 56 percent", "About 88 percent", "About 99 percent"],
      "C",
    ],
    [
      "Which question about Jamestown is most answerable from sources?",
      [
        "Was Jamestown a good idea?",
        "How did the colonists' dependence on Powhatan food supplies affect survival in 1609 and 1610?",
        "What was Jamestown like?",
        "Who was the best colonist?",
      ],
      "B",
    ],
    [
      "Why must a historian treat Winthrop's \"city upon a hill\" sermon with care as evidence of Puritan society?",
      [
        "It was written by a servant",
        "It shows what a leader wanted the colony to be, not how all colonists lived",
        "It was written after the Revolution",
        "It describes the Chesapeake",
      ],
      "B",
    ],
    [
      "A Pennsylvania promotional tract promised cheap land and tolerance. What can it best show?",
      [
        "What settlers actually experienced",
        "What the colony's promoters offered to attract settlers",
        "How Native nations viewed Penn",
        "The cost of enslaved labor",
      ],
      "B",
    ],
    [
      "Why can an oral tradition be valuable but not simply read as a transcript of events?",
      [
        "Oral traditions are always false",
        "They preserve a community's memory but are shaped by retelling over generations",
        "They were written in English",
        "They do not mention events",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a research question about how the Chesapeake and New England colonies differed, then build a plan: name two kinds of sources and, for each, say what it could show and one way it could mislead.",
      scheme: [
        "States an answerable question that compares the two regions on a specific point",
        "Names a first source type that matches part of the question",
        "Explains what the first source could show and how it could mislead",
        "Names a second source type that matches the question",
        "Explains what the second source could show and how it could mislead",
      ],
      model:
        "Question: How did the reasons colonists gave for coming to the Chesapeake and to New England shape the kind of government each colony built before 1650? One source is Winthrop's sermon and the Mayflower Compact, which show how Puritan and Pilgrim leaders wanted their communities to work, but they were written by leaders and may not reflect ordinary settlers. A second is the records of Virginia's House of Burgesses, which show how planters made decisions, but they record only the voices of the men who sat in it.",
      answers: [
        [
          "full",
          "[[0|How did the reasons colonists came to the Chesapeake and New England affect the kind of government each colony built before 1650?]] [[1|One source type is leaders' writings like Winthrop's sermon and the Mayflower Compact]]. [[2|They show what the leaders wanted their community to look like, but they were written by elite men so they might not reflect what servants or women thought]]. [[3|A second type is the records of the Virginia House of Burgesses]]. [[4|They show how planters actually made decisions, but they only record the voices of the men who sat there]].",
          "Full marks. Your question is specific and answerable, and your limits describe who is missing from each source.",
        ],
        [
          "full",
          "[[0|Why did families settle in New England while mostly men settled in the Chesapeake, and how did that affect their economies?]] I'd use [[1|ship passenger lists]]. [[2|They would show who came, with ages and whether families traveled together, but they could miss servants or people who traveled unrecorded]]. I'd also use [[3|tax or probate records, which list property and crops]]. [[4|They show how people earned a living, but only those who owned property would be recorded]].",
          "All five points. Passenger lists and probate records are exactly the kind of sources that answer a question about who came and how they lived.",
        ],
        [
          "partial",
          "[[0|How were the Chesapeake and New England colonies different?]] [[1|I would use Winthrop's sermon]]. It shows what the Puritans wanted.",
          "A start. Make the question more specific, say how Winthrop's sermon could mislead, and add a second source with its limits.",
        ],
        [
          "partial",
          "[[3|A second source could be the House of Burgesses records]] and [[4|they only show what the planters said]]. The first source is a map.",
          "Your second source is well handled. A map is vague, and you need a specific question and a first source that shows and misleads.",
          true,
        ],
        [
          "weak",
          "Why was the Chesapeake worse than New England? I'd read a textbook for that because it has all the facts already.",
          "'Worse' is a judgment, not a research question, and a textbook is a secondary source. Ask a question about a specific difference and use sources from the time.",
        ],
        [
          "weak",
          "[[0|What were the Chesapeake and New England like?]] Sources would just tell us.",
          "The question is too broad to answer. Narrow it to one thing, like government or work, and name the specific sources you would use.",
        ],
      ],
    },
    {
      prompt:
        "Evaluate the claim: \"Native nations were only victims in the colonial story.\" Use at least two specific facts about Native nations' actions or choices, and explain what evidence we have and what limits it.",
      scheme: [
        "States a clear position on the claim",
        "Gives a first specific fact about Native nations' actions or power, such as Powhatan's siege at Jamestown or Haudenosaunee diplomacy",
        "Gives a second specific fact",
        "Acknowledges real harm, such as disease, land loss or the Pequot War",
        "Explains what evidence exists, such as colonists' records, oral traditions and archaeology",
        "Explains a limit of that evidence",
      ],
      model:
        "The claim is too simple. Native nations suffered greatly from disease, land loss and wars such as the Pequot War in 1637, which ended with the burning of the Mystic village. But they also acted as political powers: the Powhatan besieged Jamestown during the starving time, and the Haudenosaunee played European powers against each other to protect their interests. Evidence comes from colonists' records, oral traditions and archaeology. The English records often present Native people only as friend or enemy, and oral traditions were shaped by retelling, so a historian combines them.",
      answers: [
        [
          "full",
          "[[0|I think the claim is too simple because Native nations were victims of a lot, but they also acted as powers in their own right]]. [[1|The Powhatan besieged Jamestown during the starving time, which was a big reason the colony almost failed]]. [[2|The Haudenosaunee played the French, Dutch and English against each other to protect their own interests]]. [[3|But the harm was also real, with disease and land loss and the Pequot War, when Mystic was burned in 1637]]. [[4|The evidence comes from colonists' records, oral traditions and archaeology]], and [[5|English records often only describe Native people as allies or enemies, and oral traditions were shaped by being retold, so they must be compared]].",
          "Full marks. You kept both the harm and the agency, and you said honestly what each type of evidence can and cannot do.",
        ],
        [
          "full",
          "[[0|Native people were victims in many ways, but 'only victims' leaves out their choices and power]]. [[1|Massasoit of the Wampanoag made an alliance with Plymouth in 1621 because it helped his people against rivals]], and [[2|the Powhatan controlled the food Jamestown depended on]]. [[3|Still, diseases killed huge numbers, and King Philip's War in 1675 and 1676 was devastating]]. [[4|Our sources include English accounts, Wampanoag oral history and archaeology]]. [[5|A limit is that most written accounts were by colonists, so Native voices come mostly through other kinds of evidence that are themselves partial]].",
          "All six points. The Massasoit alliance is a precise example of strategic choice.",
        ],
        [
          "partial",
          "[[0|The claim is mostly wrong]]. [[1|The Powhatan besieged Jamestown]]. They also got diseases.",
          "A clear position and a fact. Add a second specific fact, say what the evidence is, and explain a limit on it.",
        ],
        [
          "partial",
          "[[3|There was real harm like disease and the Pequot War]] and [[4|we know from colonist records and oral tradition]]. [[5|The records are one-sided]].",
          "You have the harm and the evidence. State your position and give two facts about Native choices or power.",
          true,
        ],
        [
          "weak",
          "Native nations were helpless victims and didn't do anything. The colonists did everything.",
          "That ignores the Powhatan siege, Haudenosaunee diplomacy and alliances like Massasoit's. Native nations were active political powers as well as victims.",
        ],
        [
          "weak",
          "[[0|The claim is wrong]] because Native Americans always won all the wars and the colonists were victims.",
          "Native nations did not always win. Disease and wars such as the Pequot War devastated them. Take a position that includes both harm and agency.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "How slavery took hold, and what self-government and the Enlightenment gave colonists",
  note: `
## Objectives

Students will be able to:

1. analyze the causes and effects of the growth of slavery and the Atlantic trade;
2. trace the changes in colonial government and the ideas of the Enlightenment that shaped them.

## Materials

A data sheet on the Atlantic slave trade (about 12.5 million embarked, about 10.7 million arrived, about 390,000 to the territory of the present United States), a summary of Virginia's 1662 law and the 1705 slave code, a summary of Bacon's Rebellion (1676), a summary of the Stono Rebellion (1739), an excerpt-summary of Locke's argument about consent, a summary of the Zenger case, a cause-and-effect organizer, and the exit ticket.

## Starter (8 minutes)

Display: "12.5 million embarked, 10.7 million arrived." Ask students to calculate the deaths and the percentage, and then ask: "What question would a historian ask about this number, and what could she never learn from it?" Record the answers.

## Main activity

1. Causes of the growth of slavery. Using the organizer, students trace economic causes (cash crops, labor shortages as indentured servants became harder to recruit), political causes (Bacon's Rebellion in 1676 and planters' fear of an angry class of poor white and Black laborers) and legal causes (the 1662 law and slave codes). Present a historian's argument that after Bacon's Rebellion planters worked to divide white and Black laborers by race. Students judge the strength of that argument.
2. Effects. Use the Stono Rebellion to show enslaved resistance and the harsh response, a stricter slave code in South Carolina in 1740.
3. Colonial government and the Enlightenment. Students match colonial practices (assemblies controlling money, the Zenger trial, town meetings) with ideas from Locke and Montesquieu, and name one way each practice excluded people.

## Checking for understanding

Ask each pair to explain how slavery and the colonial ideal of liberty existed in the same society, using one example.

## Exit ticket

Which was more important in the spread of slavery, economic demand or law? Defend your answer in two sentences.
`,
  reading: [
    "Law, labor and liberty in the same colonies",
    `
Why did a labor system based on enslaved Africans replace one based largely on indentured servants? Historians point to several causes and argue over their relative weight. The economic cause is clearest. Tobacco in the Chesapeake, rice and indigo in South Carolina and sugar in the Caribbean were profitable crops that required huge amounts of hard labor. English wages rose in the later 1600s, so fewer servants came, and servants who survived their terms demanded land. Enslaved workers could be forced to stay for life, and their children, under Virginia's 1662 law, followed the mother's status and so belonged to the owner too. Virginia's code of 1705 and later codes in other colonies defined enslaved people as property and limited their movement, assembly and testimony.

A political cause has also been proposed. In 1676 Nathaniel Bacon led a rebellion of frontier settlers and servants, some of them Black as well as white, against Virginia's governor, partly over his refusal to attack Native nations. Some historians argue that the rebellion alarmed planters, who feared a restless class of poor laborers who might unite. They then deliberately encouraged racial divisions, giving poor white colonists new privileges while stripping Black people of rights. Other historians doubt that planters acted so deliberately and stress the effects of falling servant numbers and rising profits. The debate matters because it asks whether slavery in America grew mainly from economic opportunity or from political choice.

The Atlantic system drew in Africa, Europe, the Caribbean and the mainland. The most complete database of slaving voyages estimates that about 12.5 million Africans were embarked and about 10.7 million arrived, about 1.8 million deaths on the passage, roughly one in seven. About 390,000 landed in the territory that became the United States, a small share of the whole, but by 1770 nearly one in five people in the mainland colonies were enslaved. Merchants in New England built ships and carried rum and provisions. Banks and insurers in London financed the trade. Enslaved people resisted in many ways, from work slowdowns to flight to revolt. At Stono, South Carolina, in 1739, perhaps twenty enslaved people started a march toward Spanish Florida that grew to around sixty before militia stopped it, and South Carolina passed a harsher slave code in 1740.

At the same time, colonists built practices of self-government. Each colony had a governor and an elected assembly with the right to approve taxes. For long periods Britain did not enforce the Navigation Acts closely, and colonists grew used to running their own affairs. Property qualifications let many white men vote, though not women, enslaved people, Native people or most free Black men. Enlightenment ideas gave a language to these habits. John Locke's argument in 1689 that governments rest on the consent of the governed and exist to protect natural rights seemed to describe what colonists already practiced. Montesquieu's 1748 argument that liberty requires dividing power was cited in debates over how to keep governors in check. In 1735 a New York jury acquitted the printer John Peter Zenger of seditious libel for criticizing the governor, though the judge had told them that truth was no defense. The verdict showed a growing belief that the press should be free to expose the misuse of power.

What stands out is not that colonists lived by only one set of principles, but that they held two at once. They built strong traditions of liberty while building systems of bondage on which much of their wealth depended, and later generations would argue about how to reconcile them.
`,
  ],
  cards: [
    ["Bacon's Rebellion (1676)", "An uprising of frontier settlers and servants in Virginia against the governor; some historians link it to planters' turn to racial slavery."],
    ["Slave code", "Laws defining enslaved people as property and limiting their movement, assembly and testimony, as Virginia's 1705 code did."],
    ["Stono Rebellion (1739)", "A rebellion of enslaved people in South Carolina marching toward Spanish Florida; followed by a harsher slave code."],
    ["Middle Passage mortality", "About 1.8 million of 12.5 million Africans embarked died on the Atlantic voyage, roughly one in seven."],
    ["Navigation Acts", "British laws regulating colonial trade, loosely enforced for long periods."],
    ["Consent of the governed", "Locke's idea that government's authority comes from the agreement of the people."],
    ["Separation of powers", "Montesquieu's idea that liberty is safest when power is divided."],
    ["Zenger trial (1735)", "A New York jury's acquittal of a printer who criticized a royal governor."],
  ],
  closed: [
    [
      "Of about 12.5 million Africans embarked, about 10.7 million arrived. The percentage who died on the passage is closest to:",
      ["About 1.4 percent", "About 14 percent", "About 28 percent", "About 40 percent"],
      "B",
    ],
    [
      "Which finding best supports the argument that economic demand drove the shift to slavery?",
      [
        "Wages in England rose, fewer servants came, and cash crops needed large amounts of labor",
        "Virginia's governor opposed Bacon",
        "South Carolina passed a code in 1740",
        "Zenger was acquitted",
      ],
      "A",
    ],
    [
      "A historian argues that Bacon's Rebellion led planters to encourage racial divisions. Which would be strong evidence against this argument?",
      [
        "Planters wrote letters expressing fear of an alliance of poor whites and Black laborers",
        "Records showing the shift toward slavery was already underway before 1676 because of falling servant numbers and rising crop profits",
        "A 1705 law restricting enslaved people",
        "The founding of Jamestown in 1607",
      ],
      "B",
    ],
    [
      "A South Carolina estate has 120 enslaved people and 30 white residents. What fraction of the people on the estate were enslaved?",
      ["One fifth", "One half", "Four fifths", "Nine tenths"],
      "C",
    ],
    [
      "Which sentence best describes the contradiction in colonial society?",
      [
        "Colonists had no ideas about liberty",
        "Colonists built traditions of self-government while many of their economies relied on slavery",
        "Colonists opposed slavery in every colony",
        "Colonists had no assemblies",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Evaluate two explanations for the growth of slavery in Virginia: (a) economic demand for labor and (b) planters' political reaction to Bacon's Rebellion. Say what evidence supports each, and which you find more convincing.",
      scheme: [
        "Explains the economic argument accurately",
        "Gives supporting evidence for the economic argument, such as falling servant numbers or profitable tobacco",
        "Explains the political argument accurately",
        "Gives supporting evidence or reasoning for the political argument",
        "Evaluates the strengths or weaknesses of at least one argument",
        "Reaches a reasoned judgment and may note the two can work together",
      ],
      model:
        "The economic argument says planters turned to enslaved labor because tobacco was profitable and fewer indentured servants came as English wages rose. The political argument says that after Bacon's Rebellion in 1676, planters feared a united class of poor white and Black laborers and encouraged racial divisions. The economic argument is supported by the shift in labor supply, and the political one by planters' fears after the rebellion, but the shift was already underway before 1676. I find the economic explanation stronger as the main cause, with the rebellion shaping how slavery was legally and socially organized.",
      answers: [
        [
          "full",
          "[[0|The economic argument says planters switched to slavery because tobacco made a lot of money and needed a lot of labor]]. [[1|English wages rose so fewer indentured servants came, and servants who finished their terms wanted land]]. [[2|The political argument says that after Bacon's Rebellion, planters were afraid of poor white and Black laborers joining forces and so they encouraged racial divisions]]. [[3|Evidence for this is that after 1676 laws gave poor whites privileges while taking rights from Black people]]. [[4|But the shift to slavery had already begun before 1676 because of the labor supply, which weakens the political argument as the main cause]]. [[5|I think economics was the main cause and the rebellion shaped how slavery was organized legally and socially]].",
          "Full marks. You explained both arguments, tested one against the timing, and reached a judgment that combines them.",
        ],
        [
          "full",
          "[[0|One explanation is that slavery grew because it was profitable and the planters needed workers for tobacco]]. [[1|The evidence is that fewer English servants came, and servants who survived their contracts wanted land, so planters had less cheap labor]]. [[2|The other explanation is that Bacon's Rebellion scared planters, who then divided poor whites from Black laborers by race]]. [[3|The evidence is that servants of both races took part and that laws afterwards created racial distinctions]]. [[4|I find the political argument interesting but harder to prove because it depends on planters' intentions, which are hard to show]]. [[5|The best judgment is that both matter: economics created the demand and politics shaped how slavery was defended and enforced]].",
          "All six points. Pointing out that intentions are hard to prove is a real historian's critique.",
        ],
        [
          "partial",
          "[[0|Economic demand means tobacco needed workers]] and [[1|fewer servants came]]. The political one is about the rebellion.",
          "Your economic argument is well supported. Explain the political argument properly, with evidence, and judge between them.",
        ],
        [
          "partial",
          "[[2|After Bacon's Rebellion planters feared poor laborers joining together]]. [[5|I think the political reason is most important]].",
          "You explain the political argument and take a position. Give the economic argument too, with evidence, and support your judgment.",
          true,
        ],
        [
          "weak",
          "Slavery grew because Virginians were just racist and wanted to own people for no reason, so there are no other explanations.",
          "Historians do discuss racism, but the economic and political explanations are specific, testable arguments. Explain both and weigh their evidence.",
        ],
        [
          "weak",
          "[[0|Economic demand is when tobacco needs workers]]. Bacon's Rebellion was about Native Americans and has nothing to do with slavery.",
          "Bacon's Rebellion was partly about Native nations, but some historians connect it to slavery through planters' reaction. Explain that argument.",
        ],
      ],
    },
    {
      prompt:
        "Explain how colonists could embrace Enlightenment ideas of liberty while depending on slavery. Use one Enlightenment idea and one colonial practice or event, and discuss at least one way people were excluded.",
      scheme: [
        "States an Enlightenment idea accurately",
        "Names a colonial practice or event that reflects it",
        "Explains the connection between the idea and the practice",
        "Identifies a group excluded from the liberty the idea described",
        "Explains the contradiction or how colonists justified or overlooked it",
      ],
      model:
        "Locke argued that government rests on the consent of the governed and protects natural rights. Colonial assemblies, which had to approve taxes, put this into practice for the property-owning men who could vote. But enslaved people, most women and Native people had no vote and were denied natural rights, so liberty for some coexisted with bondage for others. Many slaveholders justified this by treating enslaved people as property or by racial arguments, and the Stono Rebellion showed that enslaved people did not accept it.",
      answers: [
        [
          "full",
          "[[0|Locke said government gets its power from the consent of the governed and has to protect natural rights]]. [[1|The colonial assemblies, which had to approve taxes, were a practice that fit this]]. [[2|The assembly let property-owning men give consent to the taxes they paid]]. [[3|But enslaved people, most women and Native people couldn't vote or have those rights]]. [[4|Slaveholders got around this by treating enslaved people as property or by racial arguments, and events like the Stono Rebellion show enslaved people did not accept it]].",
          "Full marks. You connected idea, practice and exclusion, and added how slaveholders justified it and how enslaved people resisted.",
        ],
        [
          "full",
          "[[0|Montesquieu argued that liberty needs power to be split up so no one has too much]]. [[1|The Zenger trial in 1735 is an example from the colonies, where a jury acquitted a printer who criticized the governor]]. [[2|It shows colonists thought speech should check the power of officials]]. [[3|But free speech meant very little for enslaved people, who could be punished for speaking against owners, and women and Native people had little voice]]. [[4|Colonists could hold both ideas because they saw liberty as a right of free property-owning men, not of everyone]].",
          "All five points. The final sentence names how the contradiction was lived with, which is the key insight.",
        ],
        [
          "partial",
          "[[0|Locke believed in consent]]. [[1|Colonial assemblies controlled taxes]]. Slavery was bad.",
          "Good start. Explain how the assembly matched Locke's idea, who was excluded, and how colonists lived with the contradiction.",
        ],
        [
          "partial",
          "[[3|Enslaved people and women were excluded from liberty]] and [[4|colonists justified slavery by saying enslaved people were property]].",
          "The exclusion and the justification are well stated. Name a specific Enlightenment idea and a colonial practice and connect them.",
          true,
        ],
        [
          "weak",
          "The colonists didn't use any Enlightenment ideas because they were all loyal to the king until 1776.",
          "Colonists read Locke and Montesquieu and used their ideas well before 1776. Pick an idea and a colonial practice that shows it.",
        ],
        [
          "weak",
          "[[0|Locke wrote about consent]]. So the colonists freed their slaves because they believed in it.",
          "Most colonists did not free enslaved people. Their liberty was for some people only. Explain how they held both ideas.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Empire's bill: from the Ohio forks to the road to war",
  note: `
## Objectives

Students will be able to:

1. analyze the causes of the French and Indian War and its effects on the colonies and Britain;
2. separate the long-term causes of the American Revolution from the events that set it off.

## Materials

Maps of North America in 1754 and 1763, Franklin's "Join, or Die" image and a summary of the Albany Plan of 1754, a debt and revenue table (British debt about 72 million pounds in 1755 and about 133 million in 1763), a short passage-summary on the Tea Act and the Tea Party (342 chests, about 90,000 pounds), a four-column causation sheet (structural causes, ideological causes, contingent events, triggers), and the exit ticket.

## Starter (8 minutes)

Show Franklin's snake cartoon and ask students what argument it makes. Reveal that it was published in 1754, before the war's first battles, and ask: "What does the date tell us about the colonial relationship to Britain before the Revolution?"

## Main activity

1. Causes of the war. Students use the maps to explain the contest for the Ohio Country: Virginia and the Ohio Company, French forts, Native nations, including the Shawnee and Miami in the Scioto region, who tried to keep their independence. Walk through Washington's 1754 expedition.
2. Effects. Use the debt table: Britain's debt rose by about 61 million pounds. Discuss the Proclamation of 1763, Pontiac's War, the Sugar Act, the Stamp Act and the objections to it, the Declaratory Act, and the Townshend duties.
3. Sorting causes. On the four-column sheet, students place events: the end of salutary neglect (structural), radical Whig ideas about corruption and liberty (ideological), the Boston Massacre of 1770 (contingent), the Tea Act and Tea Party of 1773 (trigger), and the Intolerable Acts of 1774. They then argue: the Tea Act was a modest price cut, so why did colonists resist it?

## Checking for understanding

Pairs defend or challenge the statement "The Revolution was inevitable after 1763." They must name the evidence that would convince them.

## Exit ticket

Pick the one cause you think was necessary for the Revolution and explain why it was not sufficient alone.
`,
  reading: [
    "The cost of winning, and the question of inevitability",
    `
In 1754 the colonies were disunited and often suspicious of each other. When delegates from seven colonies met at Albany to discuss defense and relations with the Haudenosaunee, Benjamin Franklin proposed a union of the colonies under a grand council. The colonial assemblies rejected it, and Parliament did not adopt it either. Yet Franklin's cartoon of a snake cut into pieces, "Join, or Die," shows that some colonists could already imagine acting together.

The French and Indian War began over land west of the Appalachians. The Ohio Country was home to the Shawnee, Delaware, Miami and other nations, who traded with both French and British and wanted neither to take over. Virginia investors and the Ohio Company claimed the region, and France built forts to protect its connection between Canada and Louisiana. Young George Washington's clash with French forces in 1754 and his surrender at Fort Necessity began a war that spread to Europe and the world. After early defeats, Britain's war effort under William Pitt captured Quebec in 1759. In the Treaty of Paris of 1763, France ceded Canada and territory east of the Mississippi.

The costs of victory shaped the next decade. Britain's national debt rose from roughly 72 million pounds to roughly 133 million. Officials in London thought colonists, who had been the main beneficiaries of the removal of France from North America, should pay part of the cost of the 10,000 troops that remained. After Pontiac's War in 1763, in which an Ottawa leader led a coalition of nations against British posts, the Proclamation of 1763 forbade colonial settlement west of the Appalachians, a decision that angered land speculators and settlers. Then came taxes. The Sugar Act of 1764 raised the cost of enforcing trade duties. The Stamp Act of 1765 taxed legal papers, newspapers and playing cards, and, because it reached every person who used paper, brought widespread protest, mobs and boycotts. Colonial assemblies declared that only they could tax their people. Parliament repealed it in 1766 but passed the Declaratory Act claiming power to make law for the colonies "in all cases whatsoever." The Townshend duties of 1767 met a new boycott, soldiers arrived in Boston in 1768, and on March 5, 1770, soldiers fired into a crowd and killed five people.

The Tea Act of 1773 is a puzzle. It lowered the price of tea by allowing the struggling East India Company to sell directly to the colonies. Even so, many colonists opposed it, because they saw it as an attempt to get them to accept Parliament's right to tax and to give a monopoly to a company favored by the Crown. On December 16, 1773, men in Boston dumped 342 chests of tea, about 90,000 pounds, into the harbor. Parliament responded in 1774 with the Intolerable Acts, closing the port until the tea was paid for and curbing Massachusetts's self-government. In September 1774 the First Continental Congress met, and on April 19, 1775, fighting began at Lexington and Concord.

Historians debate whether the war's causes were deep or shallow. Some emphasize **structural causes**: the shift from loose rule to closer control, and the cost of empire. Some emphasize **ideological causes**: the belief among colonists, drawn from radical English writers, that corrupt power always threatens liberty. Some emphasize **contingency**: particular decisions, such as the soldiers' fire in Boston, or Parliament's choice to punish Massachusetts rather than negotiate. Careful argument usually separates the conditions that made conflict likely from the choices that made it happen, and asks whether the war could have been avoided if any one of them had gone differently.
`,
  ],
  cards: [
    ["Albany Plan (1754)", "Franklin's proposal for a colonial union under a grand council, rejected by the colonies and the Crown."],
    ["Ohio Country", "The land between the Appalachians and the Mississippi contested by France, Britain and Native nations."],
    ["Pontiac's War (1763)", "A coalition of Native nations led by Pontiac that attacked British posts after the French and Indian War."],
    ["Declaratory Act (1766)", "Parliament's statement that it could legislate for the colonies in all cases."],
    ["Townshend duties (1767)", "Taxes on imports such as glass, lead, paint and tea, which led to a new boycott."],
    ["Tea Act (1773)", "A law that let the East India Company sell tea directly to the colonies, lowering its price but alarming colonists over monopoly and taxation."],
    ["Intolerable (Coercive) Acts", "The 1774 punishments of Massachusetts, including closing Boston's port."],
    ["Structural, ideological and contingent causes", "Three kinds of cause: long-term conditions, shared beliefs and particular choices or events."],
  ],
  closed: [
    [
      "Britain's debt rose from about 72 million pounds to about 133 million. By what percent did it grow?",
      ["About 46 percent", "About 61 percent", "About 85 percent", "About 185 percent"],
      "C",
    ],
    [
      "Why is the Tea Act a puzzle for historians?",
      [
        "It raised the price of tea sharply",
        "It lowered the price of tea but colonists still resisted it over principle and monopoly",
        "It was passed by colonists",
        "It was repealed within a week",
      ],
      "B",
    ],
    [
      "Which is a contingent cause rather than a structural one?",
      [
        "Britain's debt after the war",
        "The decision of soldiers to fire into a crowd in Boston on March 5, 1770",
        "The end of salutary neglect",
        "The colonists' habit of self-government",
      ],
      "B",
    ],
    [
      "342 chests of tea weighed about 90,000 pounds. About how many pounds per chest is that?",
      ["About 26", "About 260", "About 2,600", "About 26,000"],
      "B",
    ],
    [
      "A student says the Revolution was inevitable after 1763. Which evidence best challenges this?",
      [
        "The Stamp Act was repealed in 1766 after colonial protest, showing compromise was possible",
        "Parliament passed the Declaratory Act",
        "The Boston Massacre killed five people",
        "The Tea Party destroyed tea",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the French and Indian War created the conditions for the Revolution. Include the war's costs, at least one policy Britain adopted afterward, and how colonists' response to it reveals their ideas about government.",
      scheme: [
        "States the war's financial cost, with a figure or comparison",
        "States a policy Britain adopted afterward, such as the Proclamation of 1763, troops or new taxes",
        "Explains why the policy provoked colonial opposition",
        "Identifies a principle in the colonists' objection, such as no taxation without representation",
        "Explains what this reveals about colonial ideas about government",
      ],
      model:
        "The war nearly doubled Britain's debt, from about 72 million to about 133 million pounds. Britain decided to keep troops in America and to tax the colonies, passing the Stamp Act in 1765. Colonists objected because Parliament, where they had no representatives, was taxing them directly for the first time. Their principle, no taxation without representation, shows that they believed government rests on the consent of the governed and that their assemblies were the proper bodies to tax them.",
      answers: [
        [
          "full",
          "[[0|The war nearly doubled Britain's debt, from about 72 million to about 133 million pounds]]. [[1|Parliament passed the Stamp Act in 1765 to raise money for the troops that stayed in America]]. [[2|Colonists protested with boycotts and mobs because it was a direct tax that touched everyone who used paper]]. [[3|Their principle was no taxation without representation]]. [[4|This shows they thought government should rest on consent, and that their own assemblies, not a Parliament across the ocean, were the right bodies to tax them]].",
          "Full marks. Each step follows from the one before, and the last sentence says what the response reveals.",
        ],
        [
          "full",
          "[[0|Britain paid about 61 million pounds more in debt because of the war]]. [[1|After the war the Proclamation of 1763 closed the land west of the Appalachians and Parliament decided to tax the colonies]]. [[2|Colonists were angry because settlers wanted that land and because the taxes were new]]. [[3|They answered that Parliament had no right to tax them because they weren't represented]]. [[4|This reveals that colonists believed in a theory of rights where taxes require consent, which came from English tradition and Enlightenment ideas]].",
          "All five points. Linking the colonists' principle to English tradition and Enlightenment thought connects this week to the last.",
        ],
        [
          "partial",
          "[[0|Britain's debt nearly doubled]]. [[1|They taxed the colonies with the Stamp Act]]. Colonists were mad.",
          "Good first two steps. Explain why colonists objected, name their principle and say what it reveals about their ideas.",
        ],
        [
          "partial",
          "[[3|The colonists said no taxation without representation]], which shows [[4|they believed in consent of the governed]].",
          "The principle and its meaning are right. Add the war's cost and the policy that provoked the objection.",
          true,
        ],
        [
          "weak",
          "The French and Indian War was won so easily that Britain didn't have any costs, so the colonists had no reason to be upset.",
          "The war was expensive and nearly doubled Britain's debt. Look at the debt figures and what Parliament did about them.",
        ],
        [
          "weak",
          "[[1|Britain taxed the colonists]]. Colonists were just cheap and didn't want to pay anything.",
          "The colonists' objection was about who had the right to tax them, not about being cheap. Explain the principle behind it.",
        ],
      ],
    },
    {
      prompt:
        "Was the American Revolution inevitable after 1763? Take a position using at least one structural cause, one ideological cause and one contingent event, and answer a counterargument.",
      scheme: [
        "States a clear position on inevitability",
        "Identifies and explains a structural cause",
        "Identifies and explains an ideological cause",
        "Identifies and explains a contingent event or choice",
        "States a counterargument",
        "Answers the counterargument",
      ],
      model:
        "I argue the Revolution was likely but not inevitable. A structural cause was the end of salutary neglect and the debt, which put Britain and the colonies on a collision course. An ideological cause was the colonists' belief that corrupt power threatens liberty, which made them read taxes as tyranny. A contingent event was the Boston Massacre of 1770 and Parliament's decision in 1774 to punish Massachusetts rather than negotiate. Someone might say the structural problems made war inevitable, but the repeal of the Stamp Act in 1766 and the quiet years after 1770 show that compromise was possible until the 1774 choices.",
      answers: [
        [
          "full",
          "[[0|I think the Revolution was likely but not inevitable]]. [[1|A structural cause was Britain's huge debt and the end of salutary neglect, which pushed Britain to tax and control the colonies]]. [[2|An ideological cause was the colonists' belief that corrupt power always threatens liberty, so they saw taxes as a plot against rights]]. [[3|A contingent event was Parliament's choice in 1774 to punish Massachusetts with the Intolerable Acts instead of negotiating]]. [[4|The counterargument is that these deep causes made conflict certain]]. [[5|But the Stamp Act was repealed in 1766 and things calmed down after 1770, which shows compromise was still possible until the 1774 choices]].",
          "Full marks. Your reply to the counterargument uses the repeal and the quiet years as evidence, which is exactly what a claim of 'not inevitable' needs.",
        ],
        [
          "full",
          "[[0|I argue that the Revolution was close to inevitable once Parliament passed the Intolerable Acts]]. [[1|Structurally, the empire's debt meant Britain would keep seeking revenue from the colonies]]. [[2|Ideologically, colonists read British actions as part of a pattern of tyranny, so every new law fit the pattern]]. [[3|The Boston Massacre was a contingent event but it hardened feeling on both sides]]. [[4|Someone could argue there were many chances to compromise]]. [[5|True, but each compromise failed because Britain would not give up Parliament's right to tax and colonists would not accept it, so the basic disagreement stayed]].",
          "All six points. You argued the opposite position from the first answer, and your answer to the counterargument identifies the unresolved core of the dispute.",
        ],
        [
          "partial",
          "[[0|I think it was inevitable]]. [[1|The debt made Britain tax the colonies]]. [[2|Colonists believed in liberty]].",
          "A position and two causes. Add a contingent event, state a counterargument and answer it.",
        ],
        [
          "partial",
          "[[3|The Boston Massacre was a contingent event]]. [[4|Someone could say it was inevitable]], but I think it wasn't.",
          "You have an event and a counterargument. Give structural and ideological causes and an actual answer to the counterargument using evidence.",
          true,
        ],
        [
          "weak",
          "It was inevitable because the colonists wanted independence from the start in 1607 and just waited.",
          "Most colonists in 1763 did not want independence. Support a position with causes from the period after 1763.",
        ],
        [
          "weak",
          "[[0|It was not inevitable]]. Anything can happen so nothing is inevitable.",
          "That is too general to be an argument. Use specific causes and events from 1763 to 1775 to explain your position.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Reading the Declaration against its historians, and whose war it was",
  note: `
## Objectives

Students will be able to:

1. compare the Declaration of Independence with a historian's account of why the colonists broke with Britain;
2. describe the experiences and choices of patriots, loyalists, women, and enslaved and free Black people in the war.

## Materials

Teacher-written summaries of three historians' approaches (ideas, economic interests, and an account stressing the many local declarations of 1776 and the Declaration's slow rise to prominence), the Declaration's opening and a list of grievances, a summary of Jefferson's deleted passage on the slave trade, role dossiers for six people (a Boston merchant patriot, a Philadelphia Quaker neutral, a New York loyalist, Abigail Adams, an enslaved man in Virginia deciding about Dunmore's offer, a free Black soldier in a Massachusetts regiment), and the exit ticket.

## Starter (8 minutes)

Ask: "If a company wrote a press release explaining why it was leaving a partnership, would you trust it as the full story?" Connect to the Declaration as a document of explanation and persuasion.

## Main activity

1. Source against source. Pairs analyze the Declaration's list of grievances against two historians' summaries. They identify: which grievances reflect ideas, which reflect economic interests, which the Declaration highlights and which it leaves out. Then they note what the historians cannot know that the Declaration shows, namely how the case was presented at the time.
2. Dossier jigsaw. Each group studies one dossier and fills in a choice-and-consequence chart: what options did this person have, what pressures shaped the decision, and what happened. Present to the class.
3. Whole-class discussion: "Was the Revolution one event or many?" Students use evidence from at least two dossiers.

## Checking for understanding

Whiteboards: "One thing the Declaration shows that a historian cannot; one thing a historian shows that the Declaration cannot." Collect and discuss.

## Exit ticket

Choose a person from the dossiers and write one sentence about how the Declaration's words applied, or did not apply, to them.
`,
  reading: [
    "A persuasive document and the people it spoke for, and did not",
    `
When Congress adopted the Declaration of Independence on July 4, 1776, it was explaining a decision it had made two days earlier, on July 2, to vote for independence. Thomas Jefferson, the principal author, wrote for several audiences at once: the American public, the British, and especially potential allies in Europe. The document's structure reflects this. The famous opening sets out principles: that all men are created equal, that they have unalienable rights including life, liberty and the pursuit of happiness, and that governments derive their just powers from the consent of the governed. The long middle section lists about twenty-seven grievances against George III, from keeping standing armies without consent to cutting off trade and imposing taxes without consent. The conclusion declares the united colonies free and independent states.

Historians read the document in different ways. A historian who emphasizes **ideas** will point to the way the opening echoes John Locke and Enlightenment arguments, and to the way the grievances, aimed at the king instead of Parliament, reflect colonists' belief that their relationship was with the Crown. A historian who emphasizes **economic interests** will point to taxes, trade restrictions and the Proclamation of 1763, and may argue that principle was a cover for the interests of merchants and planters. A third approach notes that before July 1776 dozens of towns, counties and states had adopted their own declarations, and that Americans did not treat Jefferson's text as sacred until decades later, when its words were applied in new causes. Each approach explains something and omits something. The Declaration itself is the best evidence of how the case was framed in 1776, but a poor guide to what many individuals felt, and it does not mention the interests of enslaved people, women or Native nations except in hostile terms: its grievances complain that the king had encouraged "domestic insurrections" and brought "merciless Indian Savages" against the frontiers. A passage in Jefferson's draft that blamed the king for the slave trade was struck out by Congress, partly to satisfy delegates from South Carolina and Georgia.

The war put each person to a choice. **Patriots** included merchants, farmers and artisans with differing aims. **Loyalists**, perhaps one in five white colonists, included royal officials, Anglican clergy, some wealthy merchants and farmers who feared disorder; some sixty thousand left during or after the war. Many people tried to stay neutral. **Women** managed farms and shops, organized boycotts through groups like the Daughters of Liberty and, as Abigail Adams wrote to John Adams in 1776, hoped the new laws would "remember the ladies." The reply was dismissive, and the laws kept women's legal status largely unchanged, though ideas of "republican motherhood," the notion that mothers should educate virtuous citizens, gave women a new civic role.

For **Black Americans** the question was where freedom was more likely. In November 1775 Lord Dunmore, Virginia's royal governor, offered freedom to enslaved men owned by rebels who joined British forces. Estimates run as high as twenty thousand enslaved people who reached British lines across the South during the war, though many died of disease. At the same time, about five thousand Black men fought for the patriots, and northern states began gradual emancipation: Pennsylvania in 1780, Massachusetts in 1783 by court decisions that built on Elizabeth Freeman's 1781 suit. After the war, the British carried several thousand formerly enslaved people to Nova Scotia and other colonies as the Black Loyalists.

The contradiction between "all men are created equal" and slaveholding patriots was noticed at the time. Jefferson himself held over a hundred people in slavery in 1776. In later decades, abolitionists, women's rights advocates and civil rights leaders would turn the Declaration's own words against those who had written it.
`,
  ],
  cards: [
    ["Grievance list", "The roughly 27 complaints against George III in the Declaration, written to justify separation."],
    ["Unalienable rights", "Rights that cannot be taken away; in the Declaration, life, liberty and the pursuit of happiness."],
    ["Republican motherhood", "The idea that women had a civic duty to raise virtuous citizens of the republic."],
    ["Daughters of Liberty", "Women's groups that organized boycotts and spun cloth to avoid British goods."],
    ["Black Loyalists", "Formerly enslaved people who joined the British and were later evacuated to Nova Scotia and elsewhere."],
    ["Gradual emancipation", "Laws, as in Pennsylvania in 1780, that freed enslaved people's children at a set age, ending slavery slowly."],
    ["Elizabeth Freeman (Mum Bett)", "An enslaved woman who sued for freedom in Massachusetts in 1781 and won."],
    ["Deleted passage", "Jefferson's draft criticizing the slave trade, removed by Congress."],
  ],
  closed: [
    [
      "Why might a historian be cautious about taking the Declaration's grievances as a complete explanation of the break?",
      [
        "It was written decades afterward",
        "It was a persuasive document written for an audience, which selected reasons and left out others",
        "It was written in Latin",
        "It was written by the king",
      ],
      "B",
    ],
    [
      "Why does the Declaration direct its grievances at the king rather than Parliament?",
      [
        "Parliament did not exist",
        "Colonists argued that their relationship was with the Crown and that Parliament had no authority over them",
        "The king had signed the Declaration",
        "Parliament was on their side",
      ],
      "B",
    ],
    [
      "About 5,000 Black men fought for the patriots, and Washington's army might have had about 230,000 enlistments over the war. About what percentage were Black soldiers?",
      ["About 0.2 percent", "About 2 percent", "About 20 percent", "About 50 percent"],
      "B",
    ],
    [
      "Why did Congress remove Jefferson's passage blaming the king for the slave trade?",
      [
        "It was too short",
        "Delegates from South Carolina and Georgia objected, and others were uneasy about it",
        "It supported the British",
        "It was not true",
      ],
      "B",
    ],
    [
      "What did Abigail Adams's letter reveal?",
      [
        "That women had no opinions about politics",
        "That some women expected the new republic to reconsider their legal position, though the request was brushed off",
        "That women could vote in 1776",
        "That she opposed independence",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare how a historian who emphasizes ideas and one who emphasizes economic interests would use the Declaration as evidence for why the colonies separated from Britain. Use at least two features of the document, and say what each approach leaves out.",
      scheme: [
        "Identifies a feature of the Declaration that the ideas historian would use, such as the opening principles",
        "Explains how the ideas historian would use it",
        "Identifies a feature the economic historian would use, such as taxation or trade grievances",
        "Explains how the economic historian would use it",
        "Says what the ideas approach leaves out",
        "Says what the economic approach leaves out",
      ],
      model:
        "A historian who emphasizes ideas would point to the opening principles of equality, natural rights and consent of the governed, and argue that colonists broke with Britain because they believed their rights were under attack. An economic historian would point to the grievances about taxes and cutting off trade and argue that the break came from the interests of merchants and planters. The ideas approach leaves out how interests such as land and taxes shaped which ideas colonists stressed, while the economic approach tends to underestimate how sincerely colonists believed in their principles.",
      answers: [
        [
          "full",
          "[[0|The ideas historian would use the opening, where it says all men are created equal and governments get power from the consent of the governed]]. [[1|They would say colonists broke away because they sincerely believed Britain was violating their natural rights]]. [[2|The economic historian would use the grievances about taxes without consent and cutting off trade]]. [[3|They would say the break was about money and land, with principles used to justify it]]. [[4|The ideas approach leaves out how interests like taxes and western land affected which ideas people stressed]]. [[5|The economic approach underestimates that people risked their lives for principles and not just income]].",
          "Full marks. Each approach is explained fairly, and your criticisms of each are things a historian could actually argue.",
        ],
        [
          "full",
          "[[0|An ideas historian would say the opening principles, drawn from Locke, are the heart of the document]]. [[1|They would argue colonists really believed that corrupt power was a threat to liberty and that this belief made compromise impossible]]. [[2|An economic historian would stress the grievances about taxation and trade restrictions]]. [[3|They would argue that the colonists' real concern was protecting their wealth and that language about rights was a way of presenting it]]. [[4|A weakness of the ideas view is that it doesn't explain why slaveholders like Jefferson could write about equality]]. [[5|A weakness of the economic view is that it doesn't explain why many wealthy colonists became loyalists, so interests alone can't predict who rebelled]].",
          "All six points. The loyalist objection to the economic view is especially strong evidence.",
        ],
        [
          "partial",
          "[[0|The ideas historian uses the opening about natural rights]]. [[1|They think colonists believed in liberty]]. The economic historian would talk about money.",
          "The ideas side is clear. Give specific features of the Declaration the economic historian would use, and say what each approach leaves out.",
        ],
        [
          "partial",
          "[[2|The economic historian uses the taxes grievance]] and [[3|says it was really about money]]. [[5|That leaves out sincere beliefs]].",
          "Good on the economic side and a fair limit. Add the ideas historian's use of the document and its limit.",
          true,
        ],
        [
          "weak",
          "Both historians agree that the Declaration is a perfect, complete explanation, so there's nothing to compare.",
          "The two approaches emphasize different parts of the document and disagree about causes. Identify what each uses and what each leaves out.",
        ],
        [
          "weak",
          "[[0|The ideas historian uses the part about equality]]. The economic one doesn't use the Declaration at all because it's about money.",
          "The economic historian can use the Declaration's grievances about taxes and trade. Compare how each approach reads the same document.",
        ],
      ],
    },
    {
      prompt:
        "Choose two people or groups from the war (a patriot, a loyalist, a woman, an enslaved person, a free Black soldier). Explain the choices each faced, the pressures on them, and how the Declaration's principles applied or failed to apply to each.",
      scheme: [
        "Describes a choice faced by the first person or group",
        "Explains a pressure that shaped it, and what happened or was at stake",
        "Explains how the Declaration's principles applied or failed to apply to them",
        "Describes a choice faced by the second person or group",
        "Explains a pressure and what happened or was at stake",
        "Explains how the Declaration's principles applied or failed to apply to them",
      ],
      model:
        "An enslaved man in Virginia in 1775 had to choose whether to flee to Lord Dunmore's lines. The pressure was the offer of freedom against the risk of capture and punishment, and the Declaration's claim that all men are created equal did not free him, so the British offer promised more. A loyalist in New York faced the choice to stay loyal to the Crown or support the patriots. The pressure was fear of mob violence and loyalty to royal government, and the Declaration's argument about consent did not reach him, since patriots treated him as an enemy. About sixty thousand loyalists left rather than stay.",
      answers: [
        [
          "full",
          "[[0|An enslaved man in Virginia had to decide whether to flee to Lord Dunmore's lines or stay]]. [[1|The pressure was that Dunmore offered freedom, but fleeing was dangerous and many died of disease or were recaptured]]. [[2|The Declaration said all men are created equal, but it didn't free him, so the British promise meant more to him]]. [[3|A loyalist in New York had to choose between staying loyal to the Crown and supporting the patriots]]. [[4|The pressure was that patriot mobs could threaten loyalists, but he valued the royal government]]. [[5|The Declaration talked about consent of the governed, but patriots treated people like him as enemies and about sixty thousand left]].",
          "Full marks. You used a specific event for each person and showed how the Declaration's words did not reach either one.",
        ],
        [
          "full",
          "[[0|A woman like Abigail Adams had to decide how to support the cause while the men were away, running the farm and writing to Congress]]. [[1|The pressure was heavy work and the danger of war, and the stake was whether the new laws would change women's status]]. [[2|The Declaration said all men are created equal, but she had to ask John to remember the ladies, so the principle was not applied to women, and laws stayed the same]]. [[3|A free Black soldier in a Massachusetts regiment had to choose whether to fight for a country that did not give equal rights to Black people]]. [[4|The pressure was that serving could mean respect and sometimes freedom for enslaved soldiers, with great risk]]. [[5|The Declaration's principle applied to him in theory, but in practice most Black people stayed excluded, though soldiers' service was later used in arguments for freedom]].",
          "All six points. You noticed that the Declaration's words applied in theory but not in practice, and that service became an argument later.",
        ],
        [
          "partial",
          "[[0|An enslaved person could flee to the British]]. [[2|The Declaration said all men are equal but it didn't apply to him]].",
          "Good first person. Describe the pressure on them, and then give a second person or group with the same three parts.",
        ],
        [
          "partial",
          "[[3|A loyalist had to choose a side]], and [[4|patriot mobs were scary]].",
          "The loyalist's choice and pressure are right. Explain how the Declaration applied to him, and add a second person or group.",
          true,
        ],
        [
          "weak",
          "Everyone agreed with the Declaration and everyone had equal choices because it said all men are created equal.",
          "The Declaration's principles did not apply equally in practice. Choose two groups and show their different choices and pressures.",
        ],
        [
          "weak",
          "[[0|Women had to choose whether to run the farm]]. They didn't have any other role in the war.",
          "Women also organized boycotts and sometimes followed armies. Add the pressures they faced and what the Declaration meant for them.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Winning, ratifying and governing: an argument about the republic's first years",
  note: `
## Objectives

Students will be able to:

1. use several sources to argue why the Americans won the Revolutionary War;
2. describe how Federalists and Anti-Federalists reasoned about the new government;
3. analyze how the early republic changed under Washington, Adams and Jefferson.

## Materials

Six source summaries (British General Clinton's problem of holding territory, a Continental Army desertion and pay summary, the French alliance of 1778, Cornwallis at Yorktown, Brutus No. 1, Federalist No. 51), a ranking organizer, a data sheet on Hamilton's financial plan (federal debt about 54 million dollars, state debts assumed about 21.5 million), an Alien and Sedition Acts timeline, a map of the Louisiana Purchase, and the exit ticket.

## Starter (8 minutes)

Pose the question: "If the British could win nearly every set battle and still lose the war, what does that tell you about what 'winning' meant?" Take answers and distinguish winning battles from achieving political aims.

## Main activity

1. Argument workshop on the war. Groups rank causes (French alliance, Washington's leadership and the army's survival, British strategic problems, American militia and civilians) and must cite two of the six sources. Each group then drafts a thesis in the form "Although ..., the most important reason was ... because ..." and trades theses for a critique.
2. Two arguments about government. Students read Brutus No. 1 and Federalist No. 51 summaries and identify each author's view of power, size and human nature, then decide whose view they find more convincing and why.
3. Three presidents. A quick timeline of Hamilton's plan (assuming state debts and a national bank), the Whiskey Rebellion of 1794, the Alien and Sedition Acts of 1798 and the Kentucky and Virginia Resolutions, the election of 1800, the Louisiana Purchase of 1803 and Marbury v. Madison. Calculate the total debt Hamilton's plan assumed. Note Ohio's statehood on March 1, 1803.

## Checking for understanding

Students write a one-sentence thesis on whether the early republic was more a story of stability or of crisis and peers say what evidence they would want.

## Exit ticket

Which of the early republic's first three presidents most changed the meaning of the Constitution in practice? Defend with one example.
`,
  reading: [
    "Why Britain lost, how Americans argued over power, and what presidents made of the Constitution",
    `
Historians have long asked why Britain, the strongest power in the world, failed to suppress the rebellion. No single answer suffices, and the best arguments rank causes and show how they interacted. One cause was the problem of space. British forces could take cities, but Americans could keep fighting from the countryside, and the war was fought at the end of a supply line three thousand miles long. British commanders, from General Howe to Clinton, found that they could win a battle and still not control the territory around it. A second cause was the survival of the Continental Army under Washington. The winter at Valley Forge in 1777 and 1778, when about two thousand of some twelve thousand soldiers died, tested its endurance, and it emerged more disciplined under Baron von Steuben's training. Yet the army was often short of pay and supplies, and mutinies by soldiers show the strain. A third cause was diplomacy. After the American victory at Saratoga in October 1777, France signed an alliance in February 1778, then sent soldiers, money and a fleet. Spain and the Netherlands soon fought Britain as well, making the war global and stretching British resources. At Yorktown in October 1781 the French navy under Admiral de Grasse cut off Cornwallis's escape by sea, and a combined American and French army forced his surrender. A fourth cause was the role of militia and civilians. After 1778 Britain shifted to a "southern strategy," expecting loyalist support, but partisan fighters and local militia in the Carolinas harried British forces and undermined that hope. A well-built argument puts these in order and explains why, with the French alliance usually ranked highest because it changed the war's scale and the British ability to supply and move by sea.

Winning independence did not settle how to govern. The Anti-Federalist "Brutus" argued in 1787 that a republic cannot flourish over so large a country, because representatives would lose touch with the people and a distant government would tend toward tyranny. James Madison replied in Federalist No. 10 that a large republic is better, because it contains many interests and makes it harder for one faction to dominate, and in Federalist No. 51 that since people are not angels, ambition must be set against ambition through separated powers. The disagreement was about human nature and scale, and it still shapes American debates.

The first governments tested the Constitution. Treasury Secretary Alexander Hamilton proposed that the federal government assume the states' war debts, about 21.5 million dollars on top of about 54 million in federal debt, a total of about 75.5 million, and charter a national bank. Jefferson and Madison thought the Constitution did not authorize a bank, and the argument over "implied powers" and "strict construction" has never ended. In 1794 farmers in western Pennsylvania resisted a tax on whiskey, and Washington led about thirteen thousand militia to put down the rebellion, showing that the new government could enforce its laws. In his Farewell Address in 1796 he warned against party spirit and entangling alliances.

Under John Adams, a quasi-war with France led to the Alien and Sedition Acts of 1798, which allowed prosecution of those who published "false, scandalous and malicious" writing against the government. About two dozen people were arrested and ten convicted, mostly newspaper editors who supported Jefferson. Jefferson and Madison responded with the Kentucky and Virginia Resolutions, arguing that states could judge unconstitutional laws, a claim that would be revived in later crises. In the election of 1800, Jefferson defeated Adams after a bitter contest, and power passed peacefully between parties, which Jefferson called a "revolution" in principles. In 1803 he bought the Louisiana Territory from France for about 15 million dollars, though he doubted that the Constitution gave him the power to do so. That year the Supreme Court, in Marbury v. Madison, asserted the power of judicial review. And on March 1, 1803, Ohio entered the Union as the seventeenth state.

Each of these episodes also altered how the Constitution worked in practice: by implied powers, by the military enforcement of national law, by contest over free speech, by the peaceful transfer of power, and by stretching presidential authority.
`,
  ],
  cards: [
    ["Southern strategy", "Britain's plan after 1778 to win the South with loyalist support, which partisan fighters undermined."],
    ["Saratoga and the French alliance", "The 1777 victory that led France to ally with the United States in 1778."],
    ["Brutus No. 1", "An Anti-Federalist essay arguing that a republic cannot work over a large territory."],
    ["Federalist No. 51", "Madison's essay arguing that separated powers let ambition check ambition."],
    ["Implied powers", "The idea, urged by Hamilton, that Congress may use means not listed in the Constitution to carry out listed powers."],
    ["Whiskey Rebellion (1794)", "Western Pennsylvania farmers' resistance to a whiskey tax, put down by about 13,000 militia."],
    ["Kentucky and Virginia Resolutions", "1798 and 1799 statements by Jefferson and Madison that states could judge federal laws unconstitutional."],
    ["Marbury v. Madison (1803)", "The Supreme Court case asserting the power of judicial review."],
  ],
  closed: [
    [
      "Hamilton's plan assumed about 21.5 million dollars of state debt on top of about 54 million of federal debt. What was the total?",
      ["About 32.5 million dollars", "About 54 million dollars", "About 75.5 million dollars", "About 129 million dollars"],
      "C",
    ],
    [
      "Why did the southern strategy fail?",
      [
        "Britain had no soldiers",
        "Loyalist support was weaker than expected and partisan fighters harassed British forces",
        "France blocked it with a fleet in 1776",
        "Cornwallis refused orders",
      ],
      "B",
    ],
    [
      "Which best summarizes the difference between Brutus and Madison?",
      [
        "Brutus thought a large republic would be too distant and tyrannical; Madison thought it would better control factions",
        "Brutus wanted a king; Madison wanted no government",
        "Both thought republics must be small",
        "Both opposed a constitution",
      ],
      "A",
    ],
    [
      "About 25 people were arrested under the Sedition Act and about 10 were convicted. About what fraction of those arrested were convicted?",
      ["About one in ten", "About two in five", "About three in four", "All of them"],
      "B",
    ],
    [
      "Which is the strongest reason to call the election of 1800 significant?",
      [
        "Jefferson won by a large margin",
        "Power passed between opposing parties peacefully",
        "The Federalists did not run",
        "It was the first election",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Argue which cause did most to explain the American victory in the Revolutionary War: the French alliance, the survival of the Continental Army under Washington, or Britain's difficulty holding territory. Choose one, cite at least two specific facts, and answer an objection.",
      scheme: [
        "States a thesis that chooses one cause",
        "Gives a first accurate, specific fact",
        "Gives a second accurate, specific fact",
        "Explains how the facts support the thesis",
        "States an objection or competing cause",
        "Answers the objection with evidence or reasoning",
      ],
      model:
        "Although Washington's army survived hardship, the French alliance did most to explain victory. After Saratoga in 1777, France signed an alliance in 1778 and sent troops, money and a fleet. At Yorktown the French navy cut off Cornwallis's escape by sea, and a combined army forced his surrender. This mattered because the Americans lacked a navy. Someone could argue that without Washington's army surviving Valley Forge there would have been no one to ally with. But France's help turned a stalemate into a decisive victory, which the army alone could not have achieved.",
      answers: [
        [
          "full",
          "[[0|Although Washington's army kept the war going, the French alliance did the most to win it]]. [[1|After Saratoga, France signed an alliance in 1778 and sent troops, money and a navy]]. [[2|At Yorktown the French fleet under de Grasse blocked Cornwallis from escaping by sea while American and French troops surrounded him]]. [[3|The Americans had no navy, so France supplied what they couldn't provide for themselves]]. [[4|Someone could argue that without the army surviving Valley Forge there would have been nobody for France to ally with]]. [[5|That's true, but survival only produced a stalemate, and the French helped turn it into a victory]].",
          "Full marks. Your thesis opens with the concession and your reply to the objection distinguishes survival from victory.",
        ],
        [
          "full",
          "[[0|Britain's difficulty holding territory most explains the American victory]]. [[1|British armies could take cities like New York and Philadelphia, but the Americans kept fighting from the countryside]], and [[2|they had to supply an army across three thousand miles of ocean]]. [[3|That means Britain could win battles without winning the war, so even a weak American army could outlast it]]. [[4|The objection is that the French alliance changed the war]]. [[5|But the alliance helped most because of the same problem: it made Britain's supply lines and its fleet even more stretched]].",
          "All six points. You took a different position and showed that the French alliance worked through your own cause.",
        ],
        [
          "partial",
          "[[0|The French alliance was most important]]. [[1|France joined after Saratoga]]. They were helpful.",
          "A clear thesis and a fact. Add a second fact such as Yorktown, explain the link, and answer an objection.",
        ],
        [
          "partial",
          "[[1|The army survived Valley Forge where about 2,000 died]] and [[4|some say France was more important]]. [[3|But the army kept fighting]].",
          "You have a fact and an objection. State a clear thesis, add a second fact and answer the objection with evidence.",
          true,
        ],
        [
          "weak",
          "The Americans won because they were better fighters and God was on their side.",
          "Historians look for evidence like the French alliance, the army's survival and British supply problems. Choose one and use facts.",
        ],
        [
          "weak",
          "[[0|The French alliance was most important]]. All the causes mattered equally so I can't choose.",
          "The question asks you to rank. Choose one and defend it with two specific facts and a reply to an objection.",
        ],
      ],
    },
    {
      prompt:
        "Compare Brutus and Madison on whether a large republic can survive. State each author's argument, say what each assumed about human nature or power, and judge which was better borne out by the early republic, using at least one event.",
      scheme: [
        "States Brutus's argument about large republics accurately",
        "States Madison's argument accurately",
        "Identifies an assumption about human nature or power behind one author's view",
        "Identifies an assumption behind the other's view",
        "Uses an event from the early republic as evidence",
        "Makes a reasoned judgment",
      ],
      model:
        "Brutus argued that a republic cannot survive over a large territory because representatives lose touch with the people and a distant government drifts toward tyranny. Madison argued in Federalist No. 10 that a large republic is safer because it contains many interests, which makes it harder for one faction to dominate. Brutus assumed that closeness keeps officials accountable, while Madison assumed that people pursue self-interest and that ambition must be set against ambition. The Whiskey Rebellion showed a distant government enforcing law on frontier farmers, which supports Brutus's fear of distance, but the peaceful transfer of power in 1800 supports Madison's view that competing interests could check each other. On balance Madison's view was better borne out.",
      answers: [
        [
          "full",
          "[[0|Brutus said a republic can't work over a big territory because representatives lose touch with the people and a distant government turns tyrannical]]. [[1|Madison said a big republic is better because it has so many interests that no one faction can take over]]. [[2|Brutus assumed that being close to the people keeps leaders accountable]]. [[3|Madison assumed that people follow their self-interest, and that ambition had to be set against ambition]]. [[4|The Whiskey Rebellion supports Brutus, since the government sent thousands of militia against western farmers, but the peaceful transfer of power in 1800 supports Madison]]. [[5|I think Madison's view was better borne out because the republic survived and expanded, and competing parties checked each other instead of one taking over]].",
          "Full marks. You used one event for each side and then made a reasoned judgment.",
        ],
        [
          "full",
          "[[0|Brutus argued that a government over such a large area would be too far from the people and become tyrannical]]. [[1|Madison argued in Federalist 10 that the larger the republic, the more interests there would be, so a majority faction would find it harder to form]]. [[2|Brutus assumed power over a distance would always slip out of the people's control]]. [[3|Madison assumed that people are not angels, so you have to use a design that makes self-interest work as a check]]. [[4|The Alien and Sedition Acts of 1798 support Brutus because the national government used its power against critics]]. [[5|But the voters and states pushed back and the Federalists lost in 1800, so I'd say the evidence is mixed but leans toward Madison because the system corrected itself]].",
          "All six points. Your use of the Alien and Sedition Acts as evidence for Brutus is well chosen and your judgment is honest about mixed evidence.",
        ],
        [
          "partial",
          "[[0|Brutus said a big republic would become a tyranny]]. [[1|Madison said a big republic was good because of many interests]].",
          "Both arguments are accurate. Add their assumptions about human nature, use an event from the early republic, and make a judgment.",
        ],
        [
          "partial",
          "[[4|The Whiskey Rebellion shows the government used force]]. [[5|I think Brutus was right]].",
          "You have an event and a judgment. State both authors' arguments and the assumptions behind them, then explain how the event supports your judgment.",
          true,
        ],
        [
          "weak",
          "Brutus wanted a king and Madison wanted a democracy where everyone voted on everything.",
          "Brutus feared tyranny, not wanted a king, and Madison argued for a representative republic, not a direct democracy. Re-read each argument.",
        ],
        [
          "weak",
          "[[1|Madison said a big republic has many interests]]. Brutus is irrelevant because Madison won.",
          "Madison's side did win ratification, but Brutus's concerns shaped the Bill of Rights and later debates. Explain his argument too.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "A weak confederation, a rebellion, and the limits of letters, papers and pamphlets",
  note: `
## Objectives

Students will be able to:

1. identify the limits of a letter, a newspaper and a pamphlet as evidence of public opinion in the 1790s;
2. explain how the Articles of Confederation were organized and why they were replaced.

## Materials

A chart of the Articles' structure, a summary of the Land Ordinance of 1785 (townships six miles square divided into 36 sections of 640 acres, section 16 set aside for schools) and the Northwest Ordinance of 1787, a summary of Shays' Rebellion and of the Whiskey Rebellion, four teacher-written model sources about the Jay Treaty of 1794 (a private letter from a Boston merchant, a Federalist newspaper item, a Republican newspaper item, a pamphlet defending the treaty), a source-evaluation matrix, and the exit ticket.

## Starter (8 minutes)

Pose: "Can the loudest voices in a debate be mistaken for public opinion?" Ask students for modern examples (online comments, letters to the editor) and what each leaves out.

## Main activity

1. The Articles. Review the structure (one house, one vote per state, nine of thirteen votes for major laws, unanimity to amend, no taxation or commerce power, no executive or courts). Students calculate the minimum number of states that could block a major law (5) and propose why that might be a problem. Use the Land Ordinance: calculate the acreage of one township (36 sections of 640 acres is 23,040 acres) and discuss how this system shaped Ohio.
2. Shays' Rebellion and the road to Philadelphia. Students trace why leaders saw it as a threat.
3. This week doubles back from the 1790s to the 1780s and returns, because the argument about the Articles depends on the same question the sources raise: whose voice is on record?
4. Source matrix. Groups evaluate the four sources on the Jay Treaty: author, audience, purpose, who is missing, and what a second source would add. Build a short claim about public opinion that the sources can and cannot support.

## Checking for understanding

Pairs rewrite an overconfident claim ("Americans hated the Jay Treaty") into a careful one that matches the evidence.

## Exit ticket

Choose one of the sources and write what it can prove, what it cannot, and the evidence you would add.
`,
  reading: [
    "A government that could not pay its debts, and evidence that cannot count heads",
    `
The Articles of Confederation, ratified in 1781, reflected a recent fear of concentrated power. Congress was a single chamber in which each state, large or small, had one vote. It could declare war, make treaties and borrow, but not tax individuals or regulate commerce, and it relied on requisitions that states often ignored. Major decisions needed nine of thirteen states, so five could block action, and amendment required all thirteen. There was no president to carry out laws and no national court to settle disputes among states. The weaknesses were obvious in debt and trade: Congress could not pay veterans or bondholders reliably, and states set tariffs against each other's goods.

The Articles also had achievements, especially in the West. The Land Ordinance of 1785 set a pattern for surveying public land into townships six miles square, each divided into 36 sections of 640 acres. A township therefore held 23,040 acres, and the sixteenth section was reserved for schools. The Northwest Ordinance of 1787 provided that the territory north of the Ohio River would be governed first by appointed officials and then, when its free adult male population reached 5,000, by an elected legislature, and that it would form three to five states with full equality. It prohibited slavery in the territory, though in practice the ban was not always strictly enforced, and it declared that "religion, morality, and knowledge" were necessary to good government. Ohio, the first state carved from the territory, entered the Union in 1803, and its grid of townships still shapes the map around Columbus.

Shays' Rebellion in 1786 and 1787 showed the cost of weakness. Massachusetts farmers, many of them Revolutionary veterans, faced taxes and debts during a postwar depression and began closing courts to prevent foreclosures. Under Daniel Shays they marched on the arsenal at Springfield and were dispersed by a private militia raised by merchants because the state lacked the means and Congress lacked the authority. Washington wrote in alarm to friends, and the episode helped persuade many leaders to attend the Convention in Philadelphia. Historians differ on how serious the rebellion was, and some argue that leaders used it to justify a project they already wished to pursue.

Once the Constitution was in place, politics intensified, and historians face a new problem: how to know what ordinary Americans thought. Three kinds of source dominate the 1790s, and each is limited. **Letters** were written by a small, literate, mostly wealthy and male group. A merchant's private letter about the Jay Treaty of 1794, which settled disputes with Britain but angered many who thought it too generous, reveals one informed person's views, and archives preserve disproportionately the letters of prominent people. **Newspapers** of the 1790s were partisan. Federalist editors such as John Fenno and Republican editors such as Benjamin Franklin Bache printed reports shaped by party aims, and circulation was limited by cost and literacy. A newspaper reveals what a party wanted people to think, and sometimes what it feared they thought, but not what everyone thought. **Pamphlets** argued a case at length, often by authors writing under pseudonyms, and we often do not know who paid for them or how many people read them.

To go beyond any one voice, a historian combines evidence of different kinds, such as petitions with hundreds of signatures, resolutions of town meetings, crowd actions, election returns and prosecution records. Even then the evidence is partial: most women, enslaved people and Native people left no petitions or votes. A careful claim says only what the evidence can bear: "Printed opposition to the Jay Treaty was widespread in port cities" is safer than "Americans hated the treaty."
`,
  ],
  cards: [
    ["Requisition", "A request to states to contribute money, which Congress under the Articles could not enforce."],
    ["Land Ordinance of 1785", "Law surveying western land into townships of 36 square-mile sections, with one section for schools."],
    ["Township", "A survey unit six miles on a side, containing 36 sections of 640 acres, or 23,040 acres."],
    ["Northwest Ordinance (1787)", "Law governing land north of the Ohio River, setting a path to statehood and prohibiting slavery there."],
    ["Shays' Rebellion", "A 1786 to 1787 farmers' uprising in Massachusetts over debt and taxes that exposed national weakness."],
    ["Jay Treaty (1794)", "A treaty with Britain that settled disputes but angered many Republicans."],
    ["Partisan press", "Newspapers that openly supported a party, as in the 1790s."],
    ["Overclaiming", "Stating a conclusion broader than the evidence can support."],
  ],
  closed: [
    [
      "A township is 6 miles by 6 miles, divided into sections of 640 acres. How many acres is a township?",
      ["640 acres", "3,840 acres", "23,040 acres", "230,400 acres"],
      "C",
    ],
    [
      "Under the Articles a major law needed 9 of 13 states. What is the smallest number of states that can block it?",
      ["4", "5", "7", "9"],
      "B",
    ],
    [
      "Which claim is best supported by a single merchant's letter opposing the Jay Treaty?",
      [
        "Most Americans opposed the treaty",
        "At least one prominent, informed merchant opposed the treaty",
        "Newspapers opposed the treaty",
        "Congress rejected the treaty",
      ],
      "B",
    ],
    [
      "Why can two partisan newspapers describe the same event differently?",
      [
        "They were printed in different cities only",
        "Each editor aimed to advance one party's view",
        "Newspapers did not exist in 1794",
        "Newspapers were government-owned",
      ],
      "B",
    ],
    [
      "Which source would best help a historian check a claim that opposition to the Jay Treaty was widespread in a city?",
      [
        "One politician's diary",
        "Petitions signed by many residents and records of town meeting resolutions",
        "A pamphlet by the treaty's author",
        "A single letter",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the Articles of Confederation were organized, and argue whether their weaknesses or their achievements better explain why they were replaced. Use at least three specific features and one event.",
      scheme: [
        "Accurately describes at least two features of the Articles' organization",
        "Identifies a specific weakness with an effect",
        "Identifies a specific achievement, such as the Northwest or Land Ordinance",
        "Uses an event, such as Shays' Rebellion, as evidence",
        "States a clear position on weaknesses versus achievements",
        "Supports the position with reasoning",
      ],
      model:
        "The Articles created a one-house Congress where each state had one vote, with nine of thirteen states needed for major laws and all thirteen to amend, and with no executive or national courts and no power to tax or regulate commerce. The weaknesses explain why they were replaced: Congress could not pay its debts, and Shays' Rebellion in 1786 showed it had no force to protect order. The achievements, such as the Land Ordinance and Northwest Ordinance, show real accomplishment but concerned the West, while the failure to pay debts and to control trade touched the whole country. I conclude the weaknesses better explain why they were replaced, since the achievements did not solve the problems leaders feared most.",
      answers: [
        [
          "full",
          "[[0|The Articles had a one-house Congress with one vote per state and needed nine states for major laws and all thirteen for amendments]]. There was no president or national court and [[1|Congress could not tax, so it relied on states to contribute and couldn't pay its debts]]. [[2|The Northwest Ordinance and the Land Ordinance were real achievements because they set up a way to survey land and turn the territory into states]]. [[3|Shays' Rebellion in 1786 showed Congress had no way to help a state restore order]]. [[4|I argue the weaknesses better explain the replacement]]. [[5|The achievements were about the West, but leaders worried about debts, trade and unrest, which affected the whole country and which the Articles couldn't fix]].",
          "Full marks. You described the structure, weighed both sides and justified your position.",
        ],
        [
          "full",
          "[[0|Under the Articles, each state had one vote, five states could block major laws, and amendments needed all thirteen]]. [[1|Because states could set their own tariffs and Congress couldn't regulate trade, there were trade fights between states]]. [[2|But the Land Ordinance of 1785 created the township system, with 36 sections including one for schools, and that shaped how the West was settled]]. [[3|Shays' Rebellion scared leaders like Washington because there was no national force]]. [[4|I think the achievements matter more than people say, but the weaknesses still explain the replacement]]. [[5|The Ordinances worked partly because they dealt with the territory Congress owned, but the government couldn't govern the states themselves where the real problems were]].",
          "All six points. Recognizing why the Ordinances succeeded where the rest failed is a sophisticated observation.",
        ],
        [
          "partial",
          "[[0|The Articles gave each state one vote]]. [[2|The Northwest Ordinance was an achievement]]. The Articles were weak.",
          "A feature and an achievement. Add weaknesses with their effects, an event and a clear position with reasoning.",
        ],
        [
          "partial",
          "[[3|Shays' Rebellion showed the government couldn't handle trouble]], so [[4|I think weaknesses were more important]].",
          "Your event and position are good. Describe how the Articles were organized, name a specific weakness and an achievement, and explain your reasoning.",
          true,
        ],
        [
          "weak",
          "The Articles gave all power to the president and people feared a dictator, so they got replaced.",
          "The Articles had no president. The problem was a government too weak to tax or enforce laws. Look again at how they were organized.",
        ],
        [
          "weak",
          "[[2|The Northwest Ordinance was good]]. The Articles didn't have any problems so there was no reason to replace them.",
          "The Ordinance was an achievement, but the Articles had serious weaknesses in taxation, trade and enforcement. Use at least one with an effect.",
        ],
      ],
    },
    {
      prompt:
        "A historian wants to claim that \"Americans overwhelmingly opposed the Jay Treaty.\" Using a merchant's letter, a partisan newspaper and a pamphlet as her evidence, explain what each can and cannot support, rewrite the claim so the evidence can bear it, and name two other kinds of evidence she should add.",
      scheme: [
        "Explains what a private letter can and cannot support",
        "Explains what a partisan newspaper can and cannot support",
        "Explains what a pamphlet can and cannot support",
        "Rewrites the claim so it is narrower and fits the evidence",
        "Names a first additional kind of evidence and what it adds",
        "Names a second additional kind of evidence and what it adds",
      ],
      model:
        "A merchant's letter shows one informed person's view, not those of most Americans. A partisan newspaper shows what a party's editor wanted readers to believe, not necessarily what they believed. A pamphlet argues a case and shows an author's position, but we do not know how many read it. A careful claim would be, 'Opposition to the Jay Treaty was strongly voiced in the Republican press and by some prominent merchants and writers.' She should add petitions with signatures, which show how many people were willing to sign, and election results, which show how voters responded.",
      answers: [
        [
          "full",
          "[[0|A merchant's letter can show one informed person's view but can't show what most Americans thought, since few people wrote letters that survive]]. [[1|A partisan newspaper shows what an editor and his party wanted readers to think, not what the readers thought]]. [[2|A pamphlet shows one author's argument, but we don't know how many people read or agreed with it]]. [[3|A better claim is that opposition to the treaty was strongly voiced in the Republican press and by some prominent writers]]. [[4|She should add petitions with signatures, which show how many ordinary people were willing to sign]], and [[5|election results, to see how voters responded after the treaty]].",
          "Full marks. Your rewritten claim fits the evidence and your two additions test it in new ways.",
        ],
        [
          "full",
          "[[0|The letter is from a merchant, a group that was small, rich and not typical, so it can only show that some merchants opposed the treaty]]. [[1|A partisan paper is written to push a party line, so it can show the party's message but not how many readers agreed]]. [[2|A pamphlet is meant to persuade and could be written by a politician under a fake name, so it shows the arguments in circulation]]. [[3|A safer claim is that there was loud, organized opposition among Republicans and in port cities]]. [[4|She could add records of town meeting resolutions, to see what communities formally decided]]. [[5|She could also add crowd actions, like the protests and burning of treaty copies, which show action and not just words]].",
          "All six points. Crowd actions are an excellent source because they show behavior, not only opinion.",
        ],
        [
          "partial",
          "[[0|A letter shows one person's view]]. [[1|A newspaper is biased]]. A pamphlet is a source too.",
          "You have the first two limits. Say what the pamphlet can and cannot show, rewrite the claim and name two additional sources.",
        ],
        [
          "partial",
          "[[3|A better claim would be that some people opposed the treaty]]. [[4|She should add petitions]].",
          "Your rewrite and one addition are good. Explain what each of the three sources can and cannot support, and add a second kind of evidence.",
          true,
        ],
        [
          "weak",
          "The sources prove the claim, because the letter, the newspaper and the pamphlet all say people were against it, so it's confirmed.",
          "Each source reflects a particular voice, so all three agreeing does not prove most Americans agreed. Say what each can and cannot support.",
        ],
        [
          "weak",
          "[[1|Newspapers are biased]]. The letter and pamphlet are the real truth because there was no bias in them.",
          "Letters and pamphlets also have a point of view: one person's, or an author's aim to persuade. Evaluate each of them.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Designing limited government: the Convention's bargains and the demand for rights",
  note: `
## Objectives

Students will be able to:

1. explain how the Constitution created a government with limits and the compromises that made it possible;
2. explain why the Bill of Rights was added and how it protects individual liberties.

## Materials

A matrix of the Virginia Plan, the New Jersey Plan and the final Constitution, a summary of the Great Compromise, the Three-Fifths Compromise, the slave trade clause (1808) and the Electoral College, a calculation sheet using rounded 1790 numbers for Virginia (about 290,000 enslaved people, one House seat for every 33,000), ratification vote counts (Massachusetts 187 to 168, Virginia 89 to 79, New York 30 to 27), a summary of the debate over a bill of rights including Madison's change of mind, and the exit ticket.

## Starter (8 minutes)

Pose: "If you could design a school government where no one could ever abuse power, what would you build? What would you worry about?" Collect ideas and note which match the Constitution's tools: dividing power, requiring supermajorities, writing down rights.

## Main activity

1. The matrix. Students compare the Virginia Plan, New Jersey Plan and final Constitution on representation, executive power and federal power. For each difference they identify who favored it and why.
2. Quantifying a compromise. Using the 1790 numbers, students compute: three-fifths of about 290,000 enslaved Virginians is about 174,000 people added to Virginia's count, which at 33,000 per seat is about 5 extra House seats. Discuss who gained from that, who objected and what that meant for the electoral vote in the election of 1800, which Jefferson won 73 to 65.
3. Ratification and rights. Students look at the close votes in Massachusetts, Virginia and New York and calculate Massachusetts's margin and share. Then they examine why Madison, who thought a bill of rights unnecessary in 1787, proposed one in 1789.

## Checking for understanding

Cold-call: "Which compromise had the largest long-term consequences, and what is your evidence?"

## Exit ticket

Write a two-sentence argument for or against the claim that the Bill of Rights was necessary.
`,
  reading: [
    "Parchment barriers, real bargains and a late list of rights",
    `
The delegates who met in Philadelphia in 1787 shared a diagnosis: the Articles had left the national government too weak and the state governments too unchecked. James Madison, before the Convention, had written that the states were passing unjust laws and trampling minorities, and that a government built on a larger scale and with divided powers would be better. His Virginia Plan proposed a national legislature of two houses with representation by population, an executive and national courts, and a national power to overrule state laws. The delegates from smaller states, led by William Paterson of New Jersey, responded with a plan that kept a single house with equal votes for each state, though it gave Congress new power to tax and regulate trade. Alexander Hamilton proposed a still stronger national government with an executive chosen for life, which few took seriously.

The result was a design of limits. Power was divided in three ways: **horizontally**, among legislative, executive and judicial branches; **vertically**, between the national government and the states under federalism; and **in time**, through staggered terms, so that the House is elected every two years, the president every four and senators every six, with only one third of the Senate up in each election. Checks overlapped. The president can veto, but two thirds of Congress can override. The Senate confirms appointments and ratifies treaties. Impeachment gives Congress a check on the executive and courts. Madison argued in Federalist No. 51 that these devices, by setting ambition against ambition, would do what moral appeals could not.

The compromises were bargains, and some were costly. The **Great Compromise** broke the deadlock between large and small states: representation in the House by population, in the Senate equal for each state. The **Three-Fifths Compromise** counted three-fifths of the enslaved population when apportioning House seats and direct taxes. The effect was substantial. With about 290,000 enslaved people in Virginia in 1790, three-fifths gave the state about 174,000 additional counted people. With one House seat for every 33,000 people, that came to about five extra seats, and since a state's electoral votes equal its number of House seats plus two, it enlarged slaveholding states' influence in presidential elections too. Jefferson defeated Adams in 1800 by 73 votes to 65, and some historians, such as Garry Wills, argue that without the clause the result would have been reversed, though that argument rests on assumptions about how electors would have been apportioned. A related clause barred Congress from ending the importation of enslaved people before 1808. At the Convention a few delegates, such as Gouverneur Morris and Luther Martin, spoke against slavery, but they did not prevail.

Ratification was close in the key states. Massachusetts approved by 187 to 168, Virginia by 89 to 79 and New York by 30 to 27. Federalists won partly by promising amendments. The Anti-Federalist case, voiced by George Mason, who refused to sign, was that a government with no declaration of rights would trample liberty. Madison at first judged a bill of rights unnecessary and even dangerous, since listing some rights might imply that others were unprotected, and he called such lists "parchment barriers" that would not hold against majorities. Jefferson, writing from Paris, argued that a bill of rights was what the people were entitled to against every government. Madison came to agree, partly because he had promised voters in Virginia, where he faced a tough election to the First Congress, and partly because he saw that amendments could win over critics and calm fears. He drew up a list in 1789 from state proposals. Congress approved twelve; the states ratified ten of them by December 15, 1791.

The Bill of Rights protects freedom of religion, speech, press, assembly and petition, guards against unreasonable searches and seizures, and sets out the rights of the accused, including due process, trial by jury and the right to counsel. The Ninth and Tenth Amendments state that unlisted rights are retained by the people and unlisted powers by the states or the people. At first these limits bound only the national government, and their meaning was seldom tested in court. In the twentieth century, through the Fourteenth Amendment, most of them were applied to the states as well.
`,
  ],
  cards: [
    ["Virginia Plan", "Madison's plan for a national government with population-based representation and power to overrule state laws."],
    ["New Jersey Plan", "Paterson's plan keeping equal state votes while adding some national powers."],
    ["Great Compromise", "A population-based House and an equal-vote Senate."],
    ["Three-Fifths Compromise", "Counting three-fifths of the enslaved population for apportioning seats and direct taxes."],
    ["Parchment barrier", "Madison's phrase for a written limit that might fail against determined majorities."],
    ["George Mason", "A Virginia delegate who refused to sign because the Constitution lacked a bill of rights."],
    ["Ratification margins", "Massachusetts 187 to 168, Virginia 89 to 79, New York 30 to 27: all narrow."],
    ["Ninth and Tenth Amendments", "Statements that unlisted rights remain with the people and unlisted powers with the states or people."],
  ],
  closed: [
    [
      "In 1790 Virginia had about 290,000 enslaved people. Three-fifths of that number is closest to:",
      ["58,000", "116,000", "174,000", "232,000"],
      "C",
    ],
    [
      "With one House seat per 33,000 people, about how many extra House seats did 174,000 additional counted people represent?",
      ["About 2", "About 5", "About 9", "About 17"],
      "B",
    ],
    [
      "Massachusetts ratified by 187 to 168. What was the margin of victory?",
      ["19 votes", "168 votes", "187 votes", "355 votes"],
      "A",
    ],
    [
      "Why did Madison first oppose a bill of rights?",
      [
        "He thought rights were unimportant",
        "He thought it was unnecessary because the government had only delegated powers, and that listing rights might imply others were unprotected, and that parchment barriers would not stop majorities",
        "He thought the states should have none",
        "He was in Britain",
      ],
      "B",
    ],
    [
      "Which feature of the Constitution divides power over time?",
      [
        "The separation of church and state",
        "Staggered terms of two, four and six years",
        "The veto",
        "Equal state votes in the Senate",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the Constitution limits power in three ways, and evaluate which limit Madison relied on most to protect liberty. Use at least two named features and one passage or argument from Madison.",
      scheme: [
        "Explains separation of powers among branches with an example",
        "Explains federalism or another vertical division with an example",
        "Explains a third limit, such as checks and balances, staggered terms or a supermajority requirement",
        "Accurately describes Madison's argument about ambition and checks, or factions",
        "States which limit Madison relied on most",
        "Justifies the judgment with reasoning",
      ],
      model:
        "The Constitution separates power among Congress, the president and the courts, so no one branch controls all of government. It divides power between the national government and the states through federalism, so each has its own sphere. It also checks power, for example by the presidential veto, which Congress can override with two thirds. In Federalist No. 51, Madison argued that since people are not angels, ambition must be set against ambition. I think he relied most on checks and balances, because he believed that structure, not good intentions, would protect liberty.",
      answers: [
        [
          "full",
          "[[0|The Constitution separates power among Congress, the president and the courts so no single branch holds all of it]]. [[1|It divides power between national and state governments, which is federalism, so the states keep their own powers]]. [[2|It also builds in checks, like the president's veto that Congress can override with a two-thirds vote]]. [[3|In Federalist No. 51 Madison said people aren't angels, so ambition must be made to counteract ambition]]. [[4|I think Madison relied most on checks and balances]], [[5|because he believed structure and self-interest, rather than hoping leaders would be virtuous, would protect liberty]].",
          "Full marks. You named three limits and connected the last one to Madison's own reasoning.",
        ],
        [
          "full",
          "[[0|One limit is separation of powers: legislative, executive and judicial branches each have separate roles]]. [[1|Another is federalism, where the national and state governments share power, so there are two levels]]. [[2|A third is that terms are staggered, with the House elected every two years and senators every six with only a third up at a time, so a sudden wave can't change everything]]. [[3|In Federalist 10 Madison argued that a large republic would hold many interests, making it harder for one faction to dominate]]. [[4|I think Madison relied most on the size and variety of the republic, which is the federal structure]], [[5|because he thought the real danger was majority factions, and dividing power across a big country and many interests was the best protection]].",
          "All six points. You chose the federalism and scale argument from Federalist 10, which is a defensible answer to the question.",
        ],
        [
          "partial",
          "[[0|Separation of powers divides government into three branches]]. [[1|Federalism shares power with the states]].",
          "Two limits are right. Add a third, say what Madison argued, and judge which he relied on most.",
        ],
        [
          "partial",
          "[[3|Madison said ambition must counteract ambition]], and [[4|he trusted checks and balances]].",
          "You have Madison's argument and a choice. Explain three limits with examples and give reasoning for your judgment.",
          true,
        ],
        [
          "weak",
          "The Constitution limits power by making the president a king for life who can't do anything.",
          "The president is elected, serves a fixed term and is checked by Congress and courts. Look at how each branch limits the others.",
        ],
        [
          "weak",
          "[[0|There are three branches]]. Madison thought people were angels so they didn't need limits.",
          "The three branches are right, but Madison argued the opposite: since people are not angels, power needs checks.",
        ],
      ],
    },
    {
      prompt:
        "Evaluate the claim that the Bill of Rights was necessary. Consider Madison's early objections, the Anti-Federalist case and what happened to the Bill of Rights in its first decades. Take a position and support it.",
      scheme: [
        "States Madison's early objection accurately",
        "States the Anti-Federalist case for a bill of rights accurately",
        "Explains why Madison changed his mind, such as political need or Jefferson's argument",
        "Uses a fact about how the Bill of Rights applied in its first decades, such as limited to the national government",
        "States a clear position on necessity",
        "Supports the position with reasoning that addresses an opposing view",
      ],
      model:
        "Madison first argued that a bill of rights was unnecessary because the national government had only delegated powers, and that a list could imply that unlisted rights were unprotected. Anti-Federalists such as George Mason argued that a government with no declaration of rights would endanger liberty. Madison changed his mind because Jefferson argued for it and because supporters had promised amendments to win ratification. In its first decades the Bill of Rights limited only the national government and was seldom tested in court. I argue it was necessary, even though weakly enforced at first, because it set standards that later generations used to protect liberties, and because it reassured critics so that ratification held. Madison's worry about parchment barriers shows the limits, but a written standard is better than none.",
      answers: [
        [
          "full",
          "[[0|Madison first said a bill of rights wasn't needed because the national government only had the powers delegated to it, and a list might suggest other rights weren't protected]]. [[1|Anti-Federalists like George Mason said that a government without a declaration of rights would threaten liberty]]. [[2|Madison changed his mind because Jefferson argued for it and because Federalists had promised amendments to get the Constitution ratified]]. [[3|In its first decades the Bill of Rights only limited the national government and was rarely tested in court]]. [[4|I think it was necessary]]. [[5|It set standards that later generations used to protect rights, and it eased fears that kept some states on the edge. Madison's parchment barrier worry has some truth, but a written standard is better than none]].",
          "Full marks. You used the weak early enforcement as evidence and still defended necessity with a reasoned answer to Madison's worry.",
        ],
        [
          "full",
          "[[0|Madison thought it was unnecessary and maybe even dangerous because listing some rights could imply that others had no protection]]. [[1|George Mason and other Anti-Federalists argued that without a bill of rights the new government could trample liberties]]. [[2|Madison changed his mind because of political need, since he had to win votes in Virginia and wanted to calm critics, and because Jefferson told him the people were entitled to one]]. [[3|The Bill of Rights only applied to the national government at first, so states could still restrict speech or religion]]. [[4|I would say it was not strictly necessary at the start, because the national government was small and the states held most power over daily life]]. [[5|But it was useful politically, and later it became essential once the national government grew and the Fourteenth Amendment applied it to states]].",
          "All six points. You argued the opposite from the first answer by distinguishing necessity in 1791 from necessity later, which is a defensible and nuanced position.",
        ],
        [
          "partial",
          "[[0|Madison didn't think it was necessary at first]]. [[2|He changed his mind because of Jefferson]]. I think it was necessary.",
          "Good start. Add the Anti-Federalist case, a fact about its early application and reasoning for your position.",
        ],
        [
          "partial",
          "[[1|Anti-Federalists said a government without a bill of rights would threaten liberty]], and [[3|it only applied to the national government at first]].",
          "Two accurate points. State Madison's objection, why he changed, and take a clear position.",
          true,
        ],
        [
          "weak",
          "The Bill of Rights was necessary because it gave everyone in America all the rights right away, starting in 1791, in every state.",
          "At first it limited only the national government, not the states, and enforcement was rare. Use that fact in your argument.",
        ],
        [
          "weak",
          "[[0|Madison thought it was unneeded]]. He never changed his mind and had nothing to do with the Bill of Rights.",
          "Madison did change his mind and wrote the amendments in 1789. Explain why he changed.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Testing founding-era sources, and arguing compromise or victory",
  note: `
## Objectives

Students will be able to:

1. evaluate the credibility of primary sources from the founding era;
2. build an evidence-based argument about whether the Constitution was a compromise or a victory for one side.

## Materials

Seven source summaries (Madison's notes of the Convention with the fact that he revised them and published after his death in 1840; Robert Yates's notes, which cover only part of the Convention and were published in 1821; Franklin's closing speech as recorded by Madison; Federalist No. 10; Brutus No. 1; a letter from Jefferson in Paris; George Mason's objections), a credibility rubric, an argument rubric with a requirement to concede and rebut, and the exit ticket.

## Starter (8 minutes)

Pose: "Two people attended the same meeting and give different accounts. How do you decide who is more reliable?" Collect criteria (presence, purpose, consistency, a third account) and keep them on the board.

## Main activity

1. Credibility audit. Pairs choose three of the seven sources and complete the rubric: provenance, position, purpose, proximity to events, corroboration. Each pair must identify which source is best for a particular question (what was said in debate, how Americans reacted, why delegates refused to sign) and which is worst, with reasons.
2. Counting: of the 42 delegates present on September 17, 39 signed; three, Mason, Gerry and Randolph, refused. Compute the proportion who signed (about 93 percent) and discuss why unanimity of those present and unanimity of those who attended the whole Convention are different claims.
3. Argument. Students draft a thesis, build a three-source argument and write a counterargument paragraph, then peer review using the rubric. The thesis must name the one compromise or provision on which the argument most depends.

## Checking for understanding

Each student marks in their draft the sentence where a source's limits are acknowledged.

## Exit ticket

Which source is the strongest support for your thesis, and what would a skeptic say is wrong with it?
`,
  reading: [
    "Notes, speeches and letters: reading the founders with care",
    `
The evidence for the Constitution's making is unusually rich and unusually uneven. The delegates agreed to keep their debates secret, so there was no official transcript. The most complete record is James Madison's notes, which he took almost every day, often copying from a seat in front of the presiding officer. He kept them private, revised them over the years, and allowed them to appear only after his death, in 1840. The notes are indispensable, but a historian should remember that they are the work of a participant with a view, written down quickly and polished later, and that they may reflect the version of events that Madison preferred. Robert Yates, a delegate from New York who left in July in protest, kept notes that survive for the first weeks and were published in 1821. They are less detailed, but they offer a check and come from a delegate who opposed the direction the Convention took. A historian who reads Madison and Yates on the same debate is in a stronger position than one who reads only one.

Other kinds of sources answer different questions. Benjamin Franklin's closing speech on September 17, as recorded by Madison, admitted he did not approve every part of the Constitution but doubted that any other convention could do better, and urged unanimous signing. It is an excellent source for the mood of the closing day, though a speech urging unity is not neutral, and it is known only through Madison's record. Thomas Jefferson, then minister to France, praised the delegates as "an assembly of demigods" but he was not present, so his letter tells us about how the Convention seemed from a distance, not what happened in it. George Mason's objections, written after the Convention, list the reasons he refused to sign: the lack of a bill of rights, too much power for the national government, and the allowance of the slave trade to continue until 1808. His document is a valuable record of why a prominent delegate dissented, written to persuade others to dissent as well.

Of forty-two delegates present at the end, thirty-nine signed, about 93 percent. The three who did not were Mason, Elbridge Gerry and Edmund Randolph. But the number is more complicated than it looks. Many delegates had left earlier, and some who signed did so while disliking parts of the plan, as Franklin acknowledged. Interpreting the vote as an expression of consensus would overstate the case.

How then should a historian judge whether the Constitution was a compromise or a victory for one side? Pieces of evidence point in different directions. There were real compromises: the Great Compromise, the Three-Fifths Compromise, the 1808 clause and the Electoral College. Each involved concessions that neither side loved. Yet it is also fair to argue that one side achieved more of its central goal. Nationalists such as Madison and Hamilton had set out to create a national government that could tax, regulate commerce and enforce its own laws directly on individuals, and they largely succeeded. Slaveholding delegates secured protections for slavery in the three-fifths clause, the importation clause and the fugitive slave clause, which suggests their interests were also secured. Smaller states secured equal representation in the Senate, a feature the Constitution makes nearly impossible to amend. An argument must say which of these is central and why.

A good argument also concedes where the evidence is against it. A writer who claims that the Constitution was mainly a compromise should admit that on the key question of national power the Federalists got what they wanted, and should explain why that does not undo the claim. A writer who argues it was a victory for national government should admit that the bargain over slavery shaped the document, and explain why it is secondary. The quality of the argument depends less on the side chosen than on how well the evidence is weighed.
`,
  ],
  cards: [
    ["Madison's notes", "The fullest record of the Convention, kept privately, revised later and published in 1840."],
    ["Yates's notes", "Notes by New York delegate Robert Yates, covering the early weeks, published in 1821."],
    ["Corroboration", "Support from a second, independent source."],
    ["Franklin's closing speech", "A September 17, 1787 appeal to sign despite reservations, known through Madison's record."],
    ["Mason, Gerry, Randolph", "The three delegates present on September 17 who refused to sign."],
    ["Provenance", "The origin of a source: author, time, audience and purpose."],
    ["Concession", "Admitting a point against your argument, which strengthens it when answered."],
    ["Nationalist", "A delegate who wanted a stronger national government."],
  ],
  closed: [
    [
      "Thirty-nine of 42 delegates present signed. What percentage is that, rounded?",
      ["About 78 percent", "About 85 percent", "About 93 percent", "About 99 percent"],
      "C",
    ],
    [
      "Why does reading Yates alongside Madison strengthen a historian's account?",
      [
        "Yates was the president of the Convention",
        "Yates was a participant who opposed the Convention's direction, and gives a check on Madison's account",
        "Yates's notes cover the whole Convention in more detail than Madison's",
        "Yates published his notes in 1787",
      ],
      "B",
    ],
    [
      "Which question is Jefferson's \"assembly of demigods\" letter best suited to answer?",
      [
        "What did delegates say during the debate on the Senate?",
        "How did the Convention appear to an informed American observer abroad?",
        "How many votes did the Great Compromise win?",
        "Who wrote the Federalist Papers?",
      ],
      "B",
    ],
    [
      "Why is it a limit to treat the 39 signatures as proof of consensus?",
      [
        "The number is too high to be true",
        "Some delegates signed while disliking parts of the plan, and others had left earlier",
        "The signers were not delegates",
        "Madison forged them",
      ],
      "B",
    ],
    [
      "Which sentence is the best concession in an argument that the Constitution was mainly a victory for supporters of national power?",
      [
        "There was no compromise at all",
        "The Three-Fifths Compromise and the 1808 clause were real bargains with slaveholders, though they did not change the central design of strong national government",
        "The Constitution was a victory for everyone",
        "The delegates were all gods",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A historian wants to know why some delegates refused to sign the Constitution. Compare how useful George Mason's objections, Madison's notes and Franklin's closing speech are for answering this question. Say what each offers, what each lacks, and which is most useful.",
      scheme: [
        "States what Mason's objections offer on the question",
        "States a limit of Mason's objections",
        "States what Madison's notes offer",
        "States a limit of Madison's notes",
        "States what Franklin's speech offers and a limit of it",
        "Reaches a reasoned judgment about which is most useful, noting that they can be combined",
      ],
      model:
        "Mason's objections list his reasons for refusing: no bill of rights, too much national power and the continuation of the slave trade. They are most direct, but Mason wrote to persuade others to oppose ratification. Madison's notes record what delegates said during the debates and the arguments of those who later refused, but he wrote as a supporter and revised the notes later. Franklin's speech shows the pressure to sign and the reservations of those who did, but it was an appeal for unity and survives only in Madison's record. Mason's objections are most useful on his reasons, but a historian should combine them with Madison's record of what dissenters said in the room.",
      answers: [
        [
          "full",
          "[[0|Mason's objections give his own reasons for not signing, like no bill of rights, too much national power and the slave trade clause]]. [[1|But he wrote them to persuade others to oppose the Constitution, so they present his case, not a neutral summary]]. [[2|Madison's notes show what dissenters actually said in the debates]], but [[3|Madison supported the Constitution and revised his notes later, so he may favor his side]]. [[4|Franklin's speech shows that many delegates signed despite doubts, and what pressure there was to be united, but it was a speech meant to win signatures and we only know it through Madison]]. [[5|I think Mason's objections are most useful because they are his own words about his reasons, but they should be checked against Madison's notes]].",
          "Full marks. You gave each source an offer and a limit and reached a judgment that uses them together.",
        ],
        [
          "full",
          "[[0|Mason's objections are valuable because they are a direct statement from one of the three who refused, listing his specific reasons]]. [[1|The limit is that he wrote after the Convention to rally opposition and isn't speaking for Gerry or Randolph]]. [[2|Madison's notes are valuable because they record what the dissenters said as it happened, over a whole summer]]. [[3|The limit is that Madison was on the other side and edited them years later]]. [[4|Franklin's speech is valuable because it shows the reservations even of supporters and the case for signing anyway, though it is a persuasive speech and comes to us through Madison]]. [[5|The most useful for the question of why delegates refused is Madison's notes, because they cover all three refusers, and I would use Mason's objections to check Mason's reasons]].",
          "All six points. You noticed that Mason's document only speaks for himself, a limit many students miss.",
        ],
        [
          "partial",
          "[[0|Mason's objections say why he refused]]. [[2|Madison's notes show what people said]]. Franklin gave a speech.",
          "Good start on two sources. Give a limit for each source, say what Franklin's speech offers, and judge which is most useful.",
        ],
        [
          "partial",
          "[[1|Mason wrote to persuade]] and [[3|Madison edited his notes]]. [[5|Mason's objections are most useful]].",
          "Good limits and a judgment. Say what each source offers and explain Franklin's speech.",
          true,
        ],
        [
          "weak",
          "All three sources say exactly the same things, so it doesn't matter which one you use.",
          "The three sources differ in what they record and why they were written. Compare what each offers and lacks for this question.",
        ],
        [
          "weak",
          "[[0|Mason's objections are useful]]. Madison's notes and Franklin's speech are useless because they supported the Constitution.",
          "Supporters' sources still record what dissenters said and how the signing happened. Explain what each offers and its limits.",
        ],
      ],
    },
    {
      prompt:
        "Write an argument answering: Was the Constitution mainly a compromise, or mainly a victory for one side? Your thesis must name one provision you consider central. Use at least three pieces of evidence, concede one point against your view, and rebut it.",
      scheme: [
        "States a clear thesis that names a central provision",
        "Gives a first specific piece of evidence",
        "Gives a second specific piece of evidence",
        "Gives a third specific piece of evidence, ideally from a source",
        "Concedes a point against the thesis",
        "Rebuts the concession with reasoning",
      ],
      model:
        "The Constitution was mainly a compromise, and the Great Compromise on representation is the central provision, because without it the Convention would have broken up. It split the difference by giving the large states a population-based House and the small states an equal Senate. The Three-Fifths Compromise and the 1808 clause were bargains between free and slaveholding states. Franklin's closing speech admitted that he did not approve every part but would sign, a sign that signers compromised. One could concede that nationalists got their central goal of a strong national government. But that goal was only achieved because they gave up pieces such as equal Senate representation and accepted slavery's protections, so the strong government was a result of compromise rather than a victory over its opponents.",
      answers: [
        [
          "full",
          "[[0|I argue that the Constitution was mainly a compromise, and the central provision is the Great Compromise on representation]]. [[1|It gave large states a House by population and small states an equal Senate, so each side won something and lost something]]. [[2|The Three-Fifths Compromise and the 1808 clause on the slave trade were bargains between free and slaveholding states]]. [[3|Franklin's closing speech, recorded by Madison, admitted he didn't approve of every part but would sign, which shows signers accepted compromises]]. [[4|Someone could concede that nationalists got their main goal of a strong national government]]. [[5|But they achieved it only by giving up the equal Senate and accepting protections for slavery, so the strong government was a product of compromise and not a clean victory]].",
          "Full marks. Your concession is fair and your rebuttal argues that the victory was itself built from compromise.",
        ],
        [
          "full",
          "[[0|I argue the Constitution was mainly a victory for supporters of national power, and the central provision is the grant of powers to tax and regulate commerce in Article I]]. [[1|Under the Articles, Congress couldn't tax or regulate trade, and the Constitution gave it both powers]]. [[2|The supremacy clause made national law override state law, and the national government could act directly on individuals]]. [[3|Madison's Federalist No. 10 and 51 laid out the design he wanted, and the structure follows it]]. [[4|I concede that the Great Compromise and Three-Fifths Compromise were real bargains]]. [[5|But they settled how power would be shared, not whether the national government would be strong, and on that deciding question the nationalists got what they wanted]].",
          "All six points. You argued the opposite thesis, and your rebuttal uses the distinction between how power is shared and whether it exists.",
        ],
        [
          "partial",
          "[[0|It was mainly a compromise, and the Great Compromise is central]]. [[1|It gave the large states the House and the small states the Senate]].",
          "A thesis and one evidence. Add two more pieces of evidence, a concession and a rebuttal.",
        ],
        [
          "partial",
          "[[2|The Three-Fifths Compromise was a bargain]] and [[4|nationalists got a strong government]]. So it was a compromise.",
          "You have evidence and a concession. State a thesis that names a central provision, add a third piece of evidence, and rebut the concession.",
          true,
        ],
        [
          "weak",
          "It was a victory for the South because they got the most slaves and the most power forever, which makes it a victory for them.",
          "The South won protections, but the thesis needs specific provisions and a counterweight. Name a central provision and give evidence.",
        ],
        [
          "weak",
          "[[0|It was a compromise]]. Everyone compromised so there is no need for evidence.",
          "A claim needs evidence. Name a central provision and give at least three specific pieces of support.",
        ],
      ],
    },
  ],
};

writeCourse("honors-us-history-grade-10.json", "Honors US History", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
