import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * US History, Grade 10, Quarter 1. Colonial America through the founding.
 * Standards: C3 Framework dimensions 1 to 4, in the school's own words.
 */

const w1: WeekInput = {
  topic: "Asking a question about colonial America, and who was there",
  note: `
## Objectives

Students will be able to:

1. frame a question about colonial America and decide which documents will help answer it;
2. explain how geography and motives shaped the settlement of the Chesapeake, New England and the Middle Colonies;
3. describe how Native nations, Europeans and enslaved Africans experienced colonial America.

## Materials

A map of the thirteen colonies with rivers and soil regions, a set of five source cards (a John Smith passage summary, a Mayflower Compact summary, a Penn description, a Wampanoag oral-history summary, a ship's record of Africans landed in 1619), a three-column chart, and the exit ticket.

## Starter (8 minutes)

Ask: "Why would a family cross the Atlantic in 1620, and what would you want to know before deciding to go?" List their reasons. Sort them into money, religion, safety and adventure on the board.

## Main activity

1. Model a historical question: "Why did the Chesapeake and New England colonies develop so differently?" Show how a good question can be answered with sources, not just opinions. Students rewrite a weak question ("What was Jamestown?") into a stronger one.
2. Jigsaw on regions. Three groups study the Chesapeake, New England or the Middle Colonies and complete a row on the chart: location and land, who came and why, economy, government. They teach the others.
3. Perspectives. Students read the source cards and write, for each, whose view it shows and what it leaves out. Connect to Ohio: before 1800 the Scioto valley, where Columbus now sits, was Shawnee land.

## Checking for understanding

Mini whiteboards: "One document I would use to answer our question, and why." Look for a document that matches the question, not just the nearest one.

## Exit ticket

Write one question about colonial America and the single source you would use first.
`,
  reading: [
    "Three kinds of colonies and the people already here",
    `
England's mainland colonies began as three very different experiments. In 1607 the Virginia Company planted Jamestown in the **Chesapeake** region. The settlers were mostly men seeking profit. The colony nearly failed, but in 1612 John Rolfe began growing a sweet tobacco that sold well in England, and tobacco became the colony's cash crop. It needed a great deal of land and labor. The **headright system** gave fifty acres to anyone who paid for a passenger's journey, which rewarded wealthy planters who brought over indentured servants, poor people who worked for a set number of years in exchange for passage. In 1619 Virginia held the first meeting of the House of Burgesses, a representative assembly, and that same year about twenty enslaved Africans were landed at Point Comfort.

**New England** was settled for faith. The Pilgrims, Separatists who had left the Church of England, landed at Plymouth in 1620 and signed the Mayflower Compact, agreeing to make laws for the common good. In 1630 the Puritans founded the Massachusetts Bay Colony, led by John Winthrop, who told his followers they would be "a city upon a hill." Puritans came as families, built towns around a meetinghouse and a church, and held town meetings. Rocky soil and a cold climate favored small farms, fishing, shipbuilding and trade. They expected strict conformity, and dissenters such as Roger Williams, who founded Rhode Island, were pushed out.

The **Middle Colonies**, from New York to Delaware, had richer soil, navigable rivers and more variety. New York was taken from the Dutch in 1664 and kept its mix of peoples. William Penn, a Quaker, founded Pennsylvania in 1681 and welcomed people of many faiths, which attracted Germans, Scots-Irish and others. Wheat from the Middle Colonies earned them the name "the breadbasket."

These lands were not empty. Native nations such as the Powhatan in Virginia, the Wampanoag in Massachusetts, and the Haudenosaunee (Iroquois) in New York had governments, farms and trade networks. Early colonists depended on their help, but diseases to which Native people had no immunity killed a large share of them, and the colonists' hunger for land led to wars, such as the Pequot War of 1637. Native nations also used the new situation. The Haudenosaunee played the French, Dutch and English against each other to protect their interests. West of the colonies, in what became Ohio, the Shawnee, Miami and Wyandot lived along rivers like the Scioto.

For enslaved Africans, the colonies meant forced labor and the loss of family and home. Their experience is the hardest to see in documents, because most records were written by owners.

A strong historical question uses these differences. "Why did Virginia and Massachusetts grow differently?" can be answered with evidence about motives, land and government. "What was colonial America?" cannot.
`,
  ],
  cards: [
    ["Chesapeake", "The region around Chesapeake Bay, home of Jamestown and tobacco plantations."],
    ["Headright system", "Virginia's practice of granting 50 acres to anyone who paid for a new settler's passage."],
    ["Indentured servant", "A person who worked for a set number of years in return for passage to America."],
    ["Mayflower Compact", "A 1620 agreement by the Plymouth settlers to make laws for the common good."],
    ["Puritans", "English Protestants who settled Massachusetts Bay in 1630 to build a society based on their faith."],
    ["Pennsylvania", "Colony founded in 1681 by the Quaker William Penn, welcoming many religions."],
    ["Haudenosaunee", "The Iroquois confederacy of five (later six) nations in present New York, skilled in diplomacy."],
    ["Primary source", "A document or object created at the time being studied."],
  ],
  closed: [
    [
      "Which best explains why tobacco shaped the Chesapeake colonies?",
      [
        "It required little land or labor",
        "It was a profitable crop that needed much land and labor, so planters wanted servants and later enslaved workers",
        "It was grown mostly in New England",
        "It grew well only in the winter",
      ],
      "B",
    ],
    [
      "Why did the Puritans settle Massachusetts Bay in 1630?",
      [
        "To find gold",
        "To build a society based on their faith, as whole families",
        "To trade furs with France",
        "To escape debt in Spain",
      ],
      "B",
    ],
    [
      "Which question could a historian best answer with colonial sources?",
      [
        "What was colonial America?",
        "Why did tobacco planters in Virginia rely on indentured servants before they relied on enslaved workers?",
        "Was colonial life good?",
        "Is history interesting?",
      ],
      "B",
    ],
    [
      "A Virginia planter pays the passage of 8 servants. Under the headright system, how many acres could he claim?",
      ["50 acres", "80 acres", "400 acres", "800 acres"],
      "C",
    ],
    [
      "Which describes the experience of Native nations in colonial America?",
      [
        "They stayed untouched by European diseases",
        "They had their own governments and trade, and also suffered disease and land loss",
        "They had no knowledge of the land",
        "They all allied with the French",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare why English settlers came to the Chesapeake and to New England. Include at least one difference in motive and one difference in who came.",
      scheme: [
        "States a motive for Chesapeake settlers, such as profit",
        "States a motive for New England settlers, such as religious faith",
        "Compares who came to the Chesapeake, such as mostly young men and servants",
        "Compares who came to New England, such as whole families",
      ],
      model:
        "Chesapeake settlers came mainly for profit, backed by the Virginia Company, and most were young men and servants working for planters. New England settlers came for religious reasons, wanting to practice their faith as Puritans or Pilgrims, and they came as whole families who built towns around the church.",
      answers: [
        [
          "full",
          "[[0|The Chesapeake was about making money]], first for the Virginia Company and later with tobacco. [[1|New England was about religion because the Puritans wanted to build a society based on their faith]]. [[2|In the Chesapeake it was mostly young men and servants who came]], but [[3|in New England people came as whole families]].",
          "Full marks. You answered both parts of the comparison, motive and who came, for both regions.",
        ],
        [
          "full",
          "[[0|Virginia settlers were looking for profit, and then tobacco gave them a way]]. [[1|The Pilgrims and Puritans in New England were looking for religious freedom for their own faith]]. [[2|Most of the early settlers in Virginia were men, many were indentured servants]], and [[3|the families in Massachusetts built towns around a church and meetinghouse]].",
          "All four points. Noting the meetinghouse links who came to how they lived.",
        ],
        [
          "partial",
          "[[0|Chesapeake settlers wanted money]] and [[1|New England settlers wanted religion]].",
          "Your motives are right. The question also asks about who came to each place. What was different about the people?",
        ],
        [
          "partial",
          "[[2|The Chesapeake got mostly men]] and [[3|New England got families]]. They all wanted a better life.",
          "Good on who came. Say what motive drew each group, because that explains why the groups differed.",
          true,
        ],
        [
          "weak",
          "Everyone came for religious freedom, including the Virginia colonists, because that's why people came to America.",
          "Religion drove New England, but Jamestown was a money-making venture. Look again at why the Virginia Company sent people.",
        ],
        [
          "weak",
          "Both colonies were settled by the Dutch. [[1|New England was religious]].",
          "New England was religious, which is right, but both were English colonies. The Dutch settled New Netherland. Compare motives and who came.",
        ],
      ],
    },
    {
      prompt:
        "A student asks, \"Why did Pennsylvania attract such a mix of peoples?\" Write the question as a historian would, and name two kinds of sources that would help answer it. Say what each would show.",
      scheme: [
        "States a clear, answerable historical question about Pennsylvania",
        "Names a first type of source",
        "Says what the first source would show",
        "Names a second type of source and says what it would show",
      ],
      model:
        "A better question is: Why did Germans, Scots-Irish and others choose Pennsylvania over other colonies in the late 1600s and 1700s? Penn's own writings advertising the colony would show what he promised, such as religious tolerance and cheap land. Immigrant letters or ship records would show who actually came and why they said they did.",
      answers: [
        [
          "full",
          "[[0|A better question is: Why did Germans and Scots-Irish choose Pennsylvania instead of other colonies?]] [[1|One source is Penn's own writings that advertised the colony]]. [[2|It would show what he promised, like religious tolerance and land]]. [[3|Another is immigrant letters or ship lists, which would show who really came and what they said about why]].",
          "Full marks. Your question can be answered with evidence, and your sources check each other: what Penn promised and what immigrants did.",
        ],
        [
          "full",
          "[[0|Why did so many people from different countries and religions settle in Pennsylvania in the 1680s and after?]] I would use [[1|the Frame of Government, Penn's laws for the colony]], and it would show [[2|that he promised freedom of worship and a voice in government]]. I would also use [[3|ship passenger lists, which would show where immigrants came from and in what numbers]].",
          "All four points. Passenger lists are an excellent choice for a question about who came.",
        ],
        [
          "partial",
          "[[0|Why did so many different people come to Pennsylvania?]] [[1|Penn's writings could help]].",
          "A good question and a good source. Say what Penn's writings would show, and add a second type of source.",
        ],
        [
          "partial",
          "[[3|Immigrant letters would show why people came]]. [[1|Another source is a map]].",
          "The letters are a good choice. A map is vague, and you also need to write the question out as a question.",
          true,
        ],
        [
          "weak",
          "What was Pennsylvania like? I would look at a modern textbook.",
          "That question is too broad to answer, and a textbook is a secondary source. Ask about one puzzle, like why so many peoples came.",
        ],
        [
          "weak",
          "[[0|Why did Pennsylvania have all kinds of people?]] No sources are needed because it was a long time ago.",
          "The question is a start. Sources are how historians answer questions about the past. Name two and say what each shows.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Slavery, the Atlantic economy and colonial self-government",
  note: `
## Objectives

Students will be able to:

1. analyze the causes and effects of the growth of slavery and the Atlantic trade;
2. trace the changes in colonial government and the ideas of the Enlightenment that shaped them.

## Materials

A map of Atlantic trade routes, a one-page data table of Atlantic slave voyages (about 12.5 million embarked, about 10.7 million survived), a card on Virginia's 1662 law and the 1705 slave code, a short summary of the Virginia House of Burgesses, a Locke and Montesquieu quotation-summary sheet, and the exit ticket.

## Starter (8 minutes)

Display the data: about 12.5 million Africans embarked on ships, about 10.7 million arrived. Ask: "What do these two numbers, and the difference between them, tell us? What do they leave out?" Let students notice the human cost behind the subtraction.

## Main activity

1. Cause and effect on slavery. Trace how a demand for labor in tobacco, rice and sugar colonies, the decline of indentured servitude, and laws like Virginia's 1662 rule that a child follows the mother's status led to a hereditary system. Students complete a cause-effect chain.
2. Atlantic trade. On the map, students trace trade in sugar, rum, enslaved people and manufactured goods and calculate: what share of those who embarked did not survive?
3. Self-government. Compare colonial assemblies, governors and the Crown. Introduce John Locke's idea that government rests on the consent of the governed and Montesquieu's idea of separated powers. Students match each idea to a colonial practice.

## Checking for understanding

Two-sentence summary: "Slavery grew because ... and it affected ... by ...".

## Exit ticket

Name one colonial practice that reflected Enlightenment ideas and the idea behind it.
`,
  reading: [
    "A hereditary system of slavery and a habit of self-government",
    `
In the 1600s the English colonies relied first on indentured servants, but by the end of the century enslaved Africans did more and more of the work. Several things pushed this change. Wages in England rose, so fewer servants wanted to come. Planters in the Chesapeake, the Carolinas and the Caribbean saw that tobacco, rice and sugar were very profitable and needed workers they could force to stay for life. And colonial laws made slavery **hereditary** and racial. A Virginia law of 1662 stated that a child's status followed the mother's, so the children of enslaved women were born enslaved. Virginia's slave code of 1705 further limited what enslaved people could own and where they could go. By 1770, about one in five people in the mainland colonies was enslaved, and in the Chesapeake and South Carolina the proportion was far higher.

The **Atlantic trade** connected Africa, Europe, the Caribbean and North America. Ships carried manufactured goods from Europe to West Africa, enslaved Africans across the Atlantic on the brutal voyage known as the Middle Passage, and sugar, tobacco and rice back to Europe. Scholars who have built a database of nearly all slave voyages estimate that about 12.5 million Africans were forced aboard ships and about 10.7 million reached the Americas, which means nearly 1.8 million, about one in seven, died on the way. Only a small share, roughly 390,000, were brought to the territory that became the United States. Northern merchants and shipbuilders also profited by supplying the plantation economy with food, lumber and ships, which shows that slavery's influence extended well beyond the South.

Colonial government developed alongside these changes. Each colony had a governor, appointed by the Crown or by a proprietor in most cases, and an elected assembly. The Virginia House of Burgesses, first meeting in 1619, was the earliest. Assemblies controlled taxes and spending, which gave them leverage over governors. For decades, because Britain was distracted by wars and the Navigation Acts were loosely enforced, the colonies governed themselves in practice, a policy later called salutary neglect. A freeman's right to vote typically required owning property, which meant a majority of white men could vote, a far larger share than in Britain, but enslaved people, most women, Native people and free Black people in most places could not.

Ideas from the Enlightenment gave colonists a language for what they were doing. John Locke argued in 1689 that people have natural rights to life, liberty and property, and that governments exist by the consent of the governed. Montesquieu, writing in 1748, argued that liberty is safest when power is divided among separate branches. In the 1730s and 1740s the religious revival called the Great Awakening taught ordinary people to judge ministers for themselves, and the 1735 trial of the printer John Peter Zenger, acquitted of libel for printing true criticism of a governor, showed how colonists valued a free press.

These developments pulled in opposite directions. Colonists were building both a system of liberty for some and a system of bondage for others, and the same period produced both.
`,
  ],
  cards: [
    ["Hereditary slavery", "A system in which enslaved status passes from mother to child, as in Virginia's 1662 law."],
    ["Middle Passage", "The forced voyage of enslaved Africans across the Atlantic."],
    ["Atlantic trade", "The exchange of goods and enslaved people among Europe, Africa and the Americas."],
    ["House of Burgesses", "Virginia's elected assembly, first meeting in 1619."],
    ["Salutary neglect", "Britain's loose enforcement of rules over the colonies, which let them govern themselves in practice."],
    ["John Locke", "English thinker who argued for natural rights and government by consent."],
    ["Montesquieu", "French thinker who argued that liberty is safest when power is divided among branches."],
    ["Zenger trial", "The 1735 acquittal of a New York printer who published criticism of the governor, a landmark for a free press."],
  ],
  closed: [
    [
      "About 12.5 million Africans were forced aboard ships and about 10.7 million arrived. About how many died on the way?",
      ["About 180,000", "About 1.8 million", "About 10.7 million", "About 12.5 million"],
      "B",
    ],
    [
      "What did Virginia's 1662 law, that a child's status follows the mother's, do?",
      [
        "End slavery in Virginia",
        "Make slavery hereditary, so children of enslaved women were born enslaved",
        "Free the children of planters",
        "Give assemblies power over the Crown",
      ],
      "B",
    ],
    [
      "Which best describes salutary neglect?",
      [
        "Britain closely controlled every colonial decision",
        "Britain loosely enforced its rules, so colonists governed themselves in practice",
        "The colonies ignored Britain's wars",
        "Colonists refused to trade with Britain",
      ],
      "B",
    ],
    [
      "A colonial assembly's control over taxes mattered because:",
      [
        "It gave assemblies leverage over appointed governors",
        "It abolished the governor",
        "It ended the Navigation Acts",
        "It gave the Crown more power",
      ],
      "A",
    ],
    [
      "Which colonial practice reflects Locke's idea of consent of the governed?",
      [
        "A governor appointed by the king with no assembly",
        "An elected assembly that must agree to taxes",
        "A law passed only in London",
        "A royal order dissolving a town meeting",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain two reasons why slavery grew in the colonies in the late 1600s. Use at least one specific fact such as a law or a number.",
      scheme: [
        "Gives a first reason, such as the profits of tobacco, rice or sugar needing large amounts of labor",
        "Gives a second reason, such as fewer indentured servants or laws making slavery hereditary",
        "Supports a reason with a specific fact, such as Virginia's 1662 law or the percent of the population enslaved",
        "Explains how the reasons connect to the growth of slavery",
      ],
      model:
        "One reason was that tobacco, rice and sugar were very profitable and needed lots of workers. Another was that laws, such as Virginia's 1662 rule that a child follows its mother's status, made slavery hereditary, so planters did not have to keep buying workers. As fewer servants came from England, planters turned to enslaved Africans, and by 1770 about one in five people in the mainland colonies was enslaved.",
      answers: [
        [
          "full",
          "[[0|One reason is cash crops like tobacco and rice made planters rich, and they needed a lot of workers]]. [[1|Another is that fewer indentured servants wanted to come from England once wages went up]]. [[2|A law in Virginia in 1662 said a child's status followed the mother's, so enslaved women's children were also enslaved]]. [[3|Together these made planters switch to enslaved Africans, who could be forced to work for life and whose children would too]].",
          "Full marks. Your fact is specific and you connected the reasons instead of just listing them.",
        ],
        [
          "full",
          "[[0|Planters made huge profits from sugar, rice and tobacco, which took many workers]]. [[1|The supply of indentured servants went down]], [[2|and laws like the 1705 Virginia slave code said what enslaved people could and couldn't do, which fixed slavery in law]]. [[3|That is how it changed from a few workers to a whole system that passed down to children]].",
          "All four points. You used a different law, the 1705 code, which also fits.",
        ],
        [
          "partial",
          "[[0|Tobacco and rice were profitable]]. [[2|A 1662 law made children of enslaved mothers enslaved]].",
          "Good, but you stop at two facts. Name the second reason, such as fewer servants, and explain how the reasons together led to growth.",
        ],
        [
          "partial",
          "[[1|There were fewer indentured servants coming]], so [[3|planters used enslaved Africans instead]].",
          "Good logic. Add a reason about profits from crops and a specific fact such as a law or a number.",
          true,
        ],
        [
          "weak",
          "Slavery grew because Africans wanted to come to America for work and there were more ships.",
          "Africans did not come willingly. They were forced aboard ships. The reasons for growth were planters' demand for labor and laws that made slavery hereditary.",
        ],
        [
          "weak",
          "[[0|There were cash crops]] and slavery had always been part of life everywhere so there was nothing to explain.",
          "Cash crops are a real reason, but slavery in the colonies became hereditary and racial over time, and that needs explanation. Add a law or number.",
        ],
      ],
    },
    {
      prompt:
        "Choose one Enlightenment idea (Locke's consent of the governed or Montesquieu's separated powers) and explain how it matched a feature of colonial government. Then name one way colonial reality fell short of the idea.",
      scheme: [
        "States the Enlightenment idea accurately",
        "Names a feature of colonial government, such as elected assemblies or control of taxes",
        "Explains how the feature matches the idea",
        "Identifies a way colonial reality fell short, such as enslaved people, most women, or non-property owners not having a say",
      ],
      model:
        "Locke argued that government rests on the consent of the governed. Colonial assemblies such as the House of Burgesses were elected and had to approve taxes, so the people's representatives gave consent to the government's actions. But reality fell short, because enslaved people, most women, Native people and many men without property had no vote, so consent covered only some of the people.",
      answers: [
        [
          "full",
          "[[0|Locke said the government gets its power from the consent of the governed]]. [[1|Colonial assemblies like the House of Burgesses were elected]], and [[2|they had to approve taxes, so colonists' representatives were giving consent]]. [[3|But enslaved people and most women couldn't vote, and men without property often couldn't either, so consent wasn't for everybody]].",
          "Full marks. You matched the idea to a real institution, then showed honestly how it fell short.",
        ],
        [
          "full",
          "[[0|Montesquieu thought liberty is safest when power is split up among different branches]]. [[1|In the colonies, the governor, the council and the assembly each had their own role]], and [[2|assemblies controlling taxes was a check on the governor]]. [[3|The limit is that the idea of liberty didn't apply to enslaved people, who had no rights at all]].",
          "All four points. Calling the assembly's money power a check is a precise link.",
        ],
        [
          "partial",
          "[[0|Locke said government needs consent]]. [[1|The colonies had assemblies]].",
          "The idea and the institution are both right. Explain how the institution matched the idea, and name a way reality fell short.",
        ],
        [
          "partial",
          "[[3|Not everyone could vote, like enslaved people and women]]. Locke was about natural rights.",
          "The limit is right. Now state Locke's idea about consent, name a colonial feature and say how they match.",
          true,
        ],
        [
          "weak",
          "Locke wanted the king to have all the power and the colonists agreed because they loved the king.",
          "Locke argued the opposite: government rests on the consent of the governed, not on a king's unchecked power. Reread his idea.",
        ],
        [
          "weak",
          "[[1|The colonies had a governor and assemblies]]. They followed Enlightenment ideas completely and everybody was free.",
          "The institutions are right, but not everyone was free or could vote. Say which idea they matched and where they fell short.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "From the French and Indian War to Lexington: causes and triggers",
  note: `
## Objectives

Students will be able to:

1. analyze the causes of the French and Indian War and its effects on the colonies and Britain;
2. separate the long-term causes of the American Revolution from the events that set it off.

## Materials

A map of North America in 1754 and 1763, a debt table (British national debt about 72 million pounds in 1755 and about 133 million pounds in 1763), a timeline strip from 1754 to 1775, two-color highlighters for causes and triggers, and the exit ticket.

## Starter (8 minutes)

Ask: "If your family took out a big loan to fight off a neighbor who was a threat to everyone on your street, and then asked everyone on the street to chip in to pay, would you expect them to say yes?" Link the analogy to Britain's postwar debt and its request that colonists help pay.

## Main activity

1. Causes of the war. Use the map: the Ohio Country, claimed by Virginia, France and several Native nations, including the Shawnee and Miami, whose lands included the Scioto valley. Walk through George Washington's 1754 expedition, the surrender at Fort Necessity, and the war's global spread.
2. Effects. Under the Treaty of Paris of 1763, France gave up Canada and land east of the Mississippi. Britain doubled its debt and kept 10,000 troops in America. The Proclamation of 1763 barred settlement west of the Appalachians. Students predict how colonists reacted.
3. Sort the timeline. Students color long-term causes (the end of salutary neglect, new taxes, rising ideas about rights, debt) in one color and triggers (the Boston Massacre, the Tea Act, the Boston Tea Party, the Intolerable Acts, Lexington and Concord) in another and explain the difference.

## Checking for understanding

Whiteboards: "Is this a cause or a trigger? The Tea Act. A long debt. The Stamp Act. Lexington." Ask for one reason per answer.

## Exit ticket

One long-term cause and one trigger of the Revolution, and why they are not the same thing.
`,
  reading: [
    "A war that won an empire and cost it the colonies",
    `
In the early 1750s France and Britain both claimed the Ohio Country, the land between the Appalachians and the Mississippi, which was home to Shawnee, Miami, Delaware and other nations. Virginia investors, including the Ohio Company, wanted land there. France built forts to protect its fur trade and its link between Canada and Louisiana. In 1754 a twenty-two-year-old Virginia officer named George Washington led a small force to the forks of the Ohio River, fired on a French party, and was forced to surrender at his hastily built Fort Necessity. That clash began the **French and Indian War** (1754 to 1763), part of a larger global conflict called the Seven Years' War.

Early on the British lost battles, but under the leadership of William Pitt, who sent money and troops, they captured Quebec in 1759 and Montreal in 1760. By the **Treaty of Paris of 1763**, France gave up Canada and everything east of the Mississippi. Britain had won an empire in North America.

Victory brought new problems. Britain's national debt had nearly doubled, from about 72 million pounds to about 133 million. It decided to keep ten thousand soldiers in America and thought colonists should help pay, since the war had been fought partly to defend them. In 1763 Pontiac, an Ottawa leader, led Native nations in a war against British forts around the Great Lakes and the Ohio Country. To avoid more such wars, the Crown issued the **Proclamation of 1763**, which banned colonial settlement west of the Appalachians. Colonists who had hoped to farm the Ohio valley felt cheated.

Parliament then passed laws that treated the colonies more directly. The Sugar Act of 1764 tightened enforcement of trade taxes. The Stamp Act of 1765 taxed printed materials such as newspapers, legal documents and playing cards, and was the first direct tax Parliament had laid on the colonies. Colonists objected that Parliament, where they had no elected representative, had no right to tax them, a position summed up as "no taxation without representation." The Stamp Act was repealed in 1766, but Parliament insisted in the Declaratory Act that it could make laws for the colonies "in all cases."

Historians separate **long-term causes**, which built over years, from **triggers**, which are the events that set things off. The long-term causes include the end of salutary neglect, the debt and taxes, colonial experience with self-government, and ideas about natural rights. The triggers are the specific events of the early 1770s: British soldiers firing into a crowd in Boston on March 5, 1770, killing five people; the Tea Act of 1773, which led colonists to dump 342 chests of tea into Boston Harbor on December 16, 1773; Parliament's harsh response in 1774, the Intolerable Acts, which closed Boston's port; and the first shots at Lexington and Concord on April 19, 1775.

Keeping the two apart matters. If you say the Tea Act "caused the Revolution," you ignore the dozen years of argument that made colonists ready to react so strongly.
`,
  ],
  cards: [
    ["French and Indian War", "The 1754 to 1763 conflict between Britain and France, and their allies, for control of North America."],
    ["Treaty of Paris (1763)", "The treaty by which France gave up Canada and land east of the Mississippi to Britain."],
    ["Proclamation of 1763", "A British ban on settlement west of the Appalachians, intended to avoid wars with Native nations."],
    ["Pontiac", "An Ottawa leader who led a war against British forts in 1763."],
    ["Stamp Act (1765)", "A tax on printed materials, the first direct tax Parliament placed on the colonies."],
    ["Taxation without representation", "The colonists' objection that Parliament could not tax them without their elected representatives."],
    ["Long-term cause", "A condition that builds over years and makes an event more likely."],
    ["Trigger", "A specific event that sets off a change that has been building."],
  ],
  closed: [
    [
      "Britain's debt rose from about 72 million pounds to about 133 million. About how much did it increase?",
      ["About 21 million pounds", "About 61 million pounds", "About 133 million pounds", "About 205 million pounds"],
      "B",
    ],
    [
      "Which was a long-term cause of the Revolution, not a trigger?",
      [
        "The Boston Tea Party",
        "The end of salutary neglect and the new taxes after the war",
        "The battle of Lexington",
        "The Boston Massacre",
      ],
      "B",
    ],
    [
      "Why did the Proclamation of 1763 anger many colonists?",
      [
        "It taxed their tea",
        "It banned settlement west of the Appalachians, where many hoped to farm",
        "It took away their assemblies",
        "It forced them to house soldiers",
      ],
      "B",
    ],
    [
      "What was the colonists' main argument against the Stamp Act?",
      [
        "The tax was too small to matter",
        "Parliament had no right to tax them because they had no elected representatives there",
        "They preferred a tax from France",
        "Printed materials were not valuable",
      ],
      "B",
    ],
    [
      "A student writes: \"The Tea Act caused the Revolution.\" What is the best response?",
      [
        "That's correct, nothing else mattered",
        "The Tea Act was a trigger, but it only mattered because of long-term tensions over taxes and self-government",
        "The Tea Act was passed by the colonists",
        "The Revolution happened before the Tea Act",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the French and Indian War led to colonial anger at Britain. Include at least two effects of the war and connect each to a colonial reaction.",
      scheme: [
        "States that Britain's debt rose sharply after the war",
        "Connects the debt to taxes on the colonies and the colonial objection to them",
        "States another effect, such as the Proclamation of 1763 or keeping troops in America",
        "Connects it to a colonial reaction, such as anger at the western settlement ban or fear of a standing army",
      ],
      model:
        "The war nearly doubled Britain's debt, so Parliament decided colonists should help pay through new taxes like the Stamp Act. Colonists objected that they had no representatives in Parliament. The war also led to the Proclamation of 1763, which banned settling west of the Appalachians, and colonists who wanted to farm the Ohio valley felt cheated.",
      answers: [
        [
          "full",
          "[[0|Britain's debt almost doubled because of the war]]. [[1|So Parliament taxed the colonies with things like the Stamp Act and colonists said it was wrong because they had no representatives in Parliament]]. [[2|The war also led to the Proclamation of 1763 that banned settling past the Appalachians]], and [[3|colonists who wanted the Ohio land were angry that the king was blocking them]].",
          "Full marks. Each effect has a matching colonial reaction, which is exactly the cause-and-effect chain the question asks for.",
        ],
        [
          "full",
          "[[0|The war cost so much that Britain's national debt went from 72 to 133 million pounds]]. [[1|Britain thought the colonies should pay part since the war protected them, but the colonists felt taxes should be passed by their own assemblies]]. [[2|Britain also kept ten thousand soldiers in America]], and [[3|many colonists feared a standing army in peacetime]].",
          "All four points. Using the debt figures gives your answer strong evidence.",
        ],
        [
          "partial",
          "[[0|The war made Britain broke]], so [[1|they taxed the colonies and the colonists got mad]].",
          "Good first effect. Name a second effect, such as the Proclamation of 1763, and say how colonists reacted. Also state the colonists' specific objection.",
        ],
        [
          "partial",
          "[[2|The Proclamation of 1763 said colonists couldn't settle west]] and [[3|they were angry because they wanted the land]]. Taxes were bad too.",
          "The second effect is right. For the debt, give the number or the reasoning, and connect it to the colonial objection.",
          true,
        ],
        [
          "weak",
          "The French and Indian War was fought against the colonists, so they were angry that Britain attacked them.",
          "Britain and the colonists fought together against France. The colonists' anger came after the war, over debt and new rules. Reread the effects.",
        ],
        [
          "weak",
          "[[0|Britain had a debt]] and so it made every colonist go to war.",
          "The debt is real, but Britain asked the colonies to pay through taxes, not to go to war. Explain how colonists responded to taxes.",
        ],
      ],
    },
    {
      prompt:
        "Sort these into a long-term cause or a trigger of the Revolution and explain the difference: the end of salutary neglect; the Boston Tea Party; the Stamp Act; Lexington and Concord.",
      scheme: [
        "Correctly identifies the end of salutary neglect as a long-term cause",
        "Correctly identifies the Tea Party and Lexington and Concord as triggers",
        "Correctly places the Stamp Act (as a cause that builds tension, a long-term or intermediate cause) with a reason",
        "Explains the difference: long-term causes build over years while triggers are specific events that set off change",
      ],
      model:
        "The end of salutary neglect is a long-term cause. The Boston Tea Party and Lexington and Concord are triggers. The Stamp Act is part of the long-term tension over taxes because it started the argument over representation in 1765, years before the fighting. Long-term causes build over years and make conflict likely, while triggers are specific events that set it off.",
      answers: [
        [
          "full",
          "[[0|The end of salutary neglect is a long-term cause]] because it changed how Britain treated the colonies over years. [[1|The Tea Party and Lexington and Concord are triggers]] since they were specific events in 1773 and 1775. [[2|The Stamp Act is a long-term cause because it started the argument about taxation and representation back in 1765]]. [[3|The difference is that long-term causes build for a long time and make conflict likely, and triggers are the events that actually set it off]].",
          "Full marks. You placed all four and said why the Stamp Act belongs with the long-term causes.",
        ],
        [
          "full",
          "[[0|Long-term: the end of salutary neglect, when Britain began enforcing rules and taxing after the war]]. [[2|Also long-term is the Stamp Act, since it began the debate about representation but was repealed a year later, so it set the stage rather than starting the war]]. [[1|Triggers are the Boston Tea Party, a protest in December 1773, and Lexington and Concord, where fighting began in April 1775]]. [[3|Long-term causes make a conflict possible over time, and triggers are the moment it starts]].",
          "All four points. Noting that the Stamp Act was repealed explains why it was not the trigger.",
        ],
        [
          "partial",
          "[[0|Salutary neglect ending is long-term]] and [[1|the Tea Party and Lexington are triggers]]. The Stamp Act is a tax.",
          "Three correct sorts. Place the Stamp Act and explain the difference between a long-term cause and a trigger.",
        ],
        [
          "partial",
          "[[3|A long-term cause builds for years and a trigger sets it off]]. [[1|Lexington is a trigger]].",
          "Your definition is clear. Apply it to every item, including the end of salutary neglect and the Stamp Act.",
          true,
        ],
        [
          "weak",
          "They are all triggers because they were all events that happened and made colonists angry.",
          "A trigger is a specific event that sets things off, but the end of salutary neglect was a gradual change. Sort each one by how long it built.",
        ],
        [
          "weak",
          "[[1|Lexington is a trigger]]. The others are all the same as it so I put them all as triggers.",
          "Lexington is a trigger. The others differ: some were long-term. Look at which ones built over years.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "The Declaration, its historians, and whose revolution it was",
  note: `
## Objectives

Students will be able to:

1. compare the Declaration of Independence with a historian's account of why the colonists broke with Britain;
2. describe the experiences and choices of patriots, loyalists, women, and enslaved and free Black people in the war.

## Materials

A short excerpt of the Declaration's opening and a list of its grievances (public domain), two teacher-written summaries of historians' accounts (one stressing ideas, one stressing economic interests), role cards for five people (a Boston merchant patriot, a New York loyalist, Abigail Adams, an enslaved man in Virginia deciding whether to flee to Lord Dunmore's lines, a free Black soldier in a Massachusetts regiment), and the exit ticket.

## Starter (8 minutes)

Read the Declaration's sentence beginning "We hold these truths to be self-evident." Ask: "Who is included in 'all men'? Who might have read it and wondered?" Keep a list of voices to return to.

## Main activity

1. Compare two kinds of source. The Declaration is a primary source written to persuade the world; the historians' summaries are secondary. Students make a table: what reasons does each give for the break, how convincing is each, and what does each leave out?
2. Role cards. Each group gets a person and answers three questions: what did this person want, what choices did they have, what did the war cost or offer them? Present to the class.
3. Class discussion: Was the Revolution one revolution or many? Students support a position with two role cards.

## Checking for understanding

A quick write: "One thing the Declaration leaves out that a historian would add."

## Exit ticket

Name one person whose war was different from a Boston patriot's and say how.
`,
  reading: [
    "One document, many revolutions",
    `
The Declaration of Independence was adopted on July 4, 1776, with Thomas Jefferson as its main author. It is a primary source with a clear purpose: to persuade the world, and especially possible allies like France, that the colonies had good reason to separate. It opens by saying that people are "created equal" and have rights to life, liberty and the pursuit of happiness, and that governments get their power from the consent of the governed, ideas drawn from Enlightenment thinkers like John Locke. It then lists a long series of grievances against King George III: that he had kept armies among them without consent, cut off their trade, taxed them without their consent and dissolved their legislatures. It ends by declaring the colonies free and independent states.

Historians who study why the colonists broke with Britain do not simply repeat this list. Some have stressed ideas: colonists believed British policy was part of a plot against liberty, and that belief made compromise impossible. Others have stressed interests, such as the cost of new taxes to merchants and the desire to settle land in the West. Each approach picks up something the Declaration says, and also something it leaves out. A document written to justify a decision is unlikely to mention that Jefferson, the man who wrote "all men are created equal," held more than a hundred people in slavery, or that a draft passage criticizing the slave trade was removed by Congress.

The war was lived differently by different people. **Patriots** were not all alike: merchants, farmers, artisans and planters had different reasons. **Loyalists**, perhaps one in five white colonists, remained loyal to the Crown for reasons such as faith in the empire, fear of mob rule or a job under royal government. After the war, roughly sixty thousand left for Canada, Britain and the Caribbean. **Women** ran farms and businesses while men served, organized boycotts, and in some cases followed the armies as nurses, cooks and laundresses. In March 1776 Abigail Adams wrote to her husband John, who was in Congress, asking him to "remember the ladies" in the new laws. He joked in reply and the laws did not change. A few women disguised themselves as men to fight, as Deborah Sampson did.

For **enslaved and free Black people**, the question was what the war could offer. In November 1775, Virginia's royal governor, Lord Dunmore, promised freedom to enslaved men who escaped from patriot owners and joined the British, and thousands tried to reach British lines. Meanwhile about five thousand Black men, free and enslaved, served in the patriot forces, and some earned their freedom. At the war's end the British evacuated many formerly enslaved people to Nova Scotia and elsewhere. Phillis Wheatley, an enslaved woman, published poetry that argued for liberty. In 1781 Elizabeth Freeman, known as Mum Bett, sued for her freedom in Massachusetts under the state's new constitution and won.

The Revolution therefore had many stories, and the document that tells the best-known one also invites us to ask whose stories it left out.
`,
  ],
  cards: [
    ["Declaration of Independence", "The document of July 4, 1776, in which the colonies announced their separation from Britain."],
    ["Consent of the governed", "The idea that government gets its power from the people it rules."],
    ["Grievance", "A complaint; the Declaration lists many against George III."],
    ["Loyalist", "A colonist who stayed loyal to Britain during the Revolution."],
    ["Patriot", "A colonist who supported independence."],
    ["Lord Dunmore's Proclamation", "A 1775 offer of freedom to enslaved men who left patriot owners to join the British."],
    ["Abigail Adams", "Wife of John Adams who in 1776 asked him to \"remember the ladies\" in new laws."],
    ["Mum Bett (Elizabeth Freeman)", "Enslaved woman who sued for freedom in Massachusetts in 1781 and won."],
  ],
  closed: [
    [
      "The Declaration is best described as:",
      [
        "A neutral report written by a historian",
        "A primary source written to persuade the world that separation was justified",
        "A secondary source summarizing the war",
        "A private letter",
      ],
      "B",
    ],
    [
      "Why might a historian be cautious about using only the Declaration to explain why colonists broke with Britain?",
      [
        "It was written in a foreign language",
        "It lists the reasons the authors wanted to present and leaves out things such as slavery and economic interests",
        "It was written after the war ended",
        "It does not mention the king",
      ],
      "B",
    ],
    [
      "About 60,000 of roughly 2.5 million colonists became exiled loyalists. About what share is that?",
      ["About 0.24 percent", "About 2.4 percent", "About 24 percent", "About 60 percent"],
      "B",
    ],
    [
      "Why did thousands of enslaved people try to reach British lines after Lord Dunmore's proclamation?",
      [
        "They had been promised freedom if they joined the British",
        "They wanted to attack Virginia",
        "They were ordered to by patriot owners",
        "They wanted to move to Boston",
      ],
      "A",
    ],
    [
      "What did Abigail Adams's 1776 letter ask for?",
      [
        "That women be allowed to command troops",
        "That the new laws \"remember the ladies\" and not give husbands unlimited power",
        "That the colonies remain British",
        "That taxes on tea be repealed",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare what the Declaration of Independence gives as reasons for separating from Britain with what a historian who stresses economic interests would add. Say which reasons each source emphasizes and what each leaves out.",
      scheme: [
        "Identifies reasons the Declaration emphasizes, such as taxation without consent and violations of rights",
        "Identifies reasons the economic-interest historian emphasizes, such as merchants' trade losses or desire for western land",
        "Says what the Declaration leaves out",
        "Says what the historian's account might leave out",
      ],
      model:
        "The Declaration stresses rights and consent: taxation without consent, armies kept among them, and dissolved legislatures. A historian stressing interests would add the cost of taxes to merchants and the desire of colonists to settle the Ohio Country, which the Proclamation of 1763 blocked. The Declaration leaves out economic motives and the contradiction of slavery, while the historian's account may underplay how sincerely colonists believed in their principles.",
      answers: [
        [
          "full",
          "[[0|The Declaration emphasizes being taxed without consent, armies kept in the colonies and the king dissolving their assemblies]]. [[1|A historian who looks at economic interests would add that merchants lost money from British trade rules and that settlers wanted the western land the Proclamation of 1763 closed]]. [[2|The Declaration leaves out that economic motives were part of it, and that slavery contradicted the idea that all men are created equal]]. [[3|The historian's account might leave out that many colonists sincerely believed in the ideas about rights]].",
          "Full marks. Pointing to both sources' blind spots, not just the Declaration's, shows balanced analysis.",
        ],
        [
          "full",
          "[[0|The Declaration says Britain violated colonists' natural rights and governed without their consent]]. [[1|An economic historian would say people were angry about taxes and trade rules that hurt their wallets and about land in the West]]. [[2|What's missing from the Declaration is that Jefferson held slaves, and the money reasons]]. [[3|What's missing from the economic view is that people were willing to risk their lives for principles, and not just for money]].",
          "All four points. 'Willing to risk their lives for principles' is a fair challenge to the economic account.",
        ],
        [
          "partial",
          "[[0|The Declaration is about rights and taxation without consent]]. A historian might talk about money.",
          "You have the Declaration's reasons. Name the historian's specific reasons and say what each source leaves out.",
        ],
        [
          "partial",
          "[[1|The historian would say merchants cared about trade]] and [[2|the Declaration doesn't mention slavery]].",
          "Two good points. Say what the Declaration emphasizes, and what the historian's account might miss.",
          true,
        ],
        [
          "weak",
          "The Declaration was written by a historian who looked at all the reasons so it has everything.",
          "The Declaration was written by revolutionaries to persuade, not by a historian looking back. It chooses its reasons, so compare it with a later account.",
        ],
        [
          "weak",
          "[[0|The Declaration is about taxes]]. The historian is just a different opinion and it doesn't matter.",
          "Taxes are right. But a historian's account adds evidence and perspective, and the differences are worth explaining.",
        ],
      ],
    },
    {
      prompt:
        "Choose two groups from patriots, loyalists, women, and enslaved or free Black people. Explain how the Revolution offered each group different choices, and what the war cost or gave them.",
      scheme: [
        "Names a first group and describes a choice it faced",
        "Gives a specific cost or gain for the first group",
        "Names a second group and describes a choice it faced",
        "Gives a specific cost or gain for the second group",
      ],
      model:
        "Loyalists had to choose whether to stay loyal to the Crown, and about sixty thousand left for Canada or Britain after the war, losing their homes. Enslaved people in Virginia faced the choice of fleeing to British lines after Lord Dunmore's 1775 proclamation promised freedom, which gave some freedom but meant great risk, while others stayed or later served in patriot forces.",
      answers: [
        [
          "full",
          "[[0|Loyalists had to decide whether to stick with the Crown or join the patriots]]. [[1|About sixty thousand left for Canada and Britain after the war, which meant losing their homes and land]]. [[2|Enslaved people in Virginia had a choice after Lord Dunmore promised freedom to those who joined the British]]. [[3|Some got freedom and were later taken to Nova Scotia, but fleeing was dangerous and many were recaptured]].",
          "Full marks. Both groups have a real choice and a real cost or gain, backed by specific facts.",
        ],
        [
          "full",
          "[[0|Women had to decide how to support the cause while men were away, and they ran farms and shops and organized boycotts]]. [[1|The cost was heavy work and danger, and the gain was a new sense of political voice, but laws didn't change after Abigail Adams asked]]. [[2|Free and enslaved Black men could choose to join the patriot army or the British]]. [[3|About five thousand served the patriots and some earned freedom, but the new country still allowed slavery]].",
          "All four points. Naming that laws did not change for women is an honest account of what the war gave.",
        ],
        [
          "partial",
          "[[0|Loyalists had to choose between the king and independence]]. [[2|Enslaved people could run to the British]].",
          "Both choices are correct. For each group, say what the choice cost or gave them, using facts.",
        ],
        [
          "partial",
          "[[1|Loyalists lost their homes]] and [[3|enslaved people who escaped could get freedom]].",
          "The costs and gains are right. Describe the choice each group faced, not just the result.",
          true,
        ],
        [
          "weak",
          "Everyone in the colonies was a patriot and wanted independence, so everybody had the same experience.",
          "Many colonists were loyalists or neutral, and for women and Black people the war offered different choices. Pick two groups and compare.",
        ],
        [
          "weak",
          "[[0|Loyalists had to choose]]. Women didn't do anything in the war because only men fought.",
          "Women did a great deal: running farms, organizing boycotts and sometimes following armies. Review the reading, then compare two groups.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Why the Americans won, and a young republic's first three presidents",
  note: `
## Objectives

Students will be able to:

1. use several sources to argue why the Americans won the Revolutionary War;
2. describe how Federalists and Anti-Federalists reasoned about the new government;
3. analyze how the early republic changed under Washington, Adams and Jefferson.

## Materials

A set of four source cards (a summary of the Saratoga surrender, the Franco-American alliance of 1778, a description of Valley Forge, a description of the British supply problem), a Federalist-versus-Anti-Federalist chart, a timeline of the presidents with one key event for each, and the exit ticket.

## Starter (8 minutes)

Pose the puzzle: "Britain had the strongest navy and army in the world. How did the colonists win?" Take quick guesses and record them under possible headings: leadership, allies, geography, will.

## Main activity

1. Argument from sources. In groups, students study the four cards and rank the reasons for the American victory by importance. Each group must state a claim and use at least two cards.
2. Federalists and Anti-Federalists. Use the chart. Federalists such as Madison and Hamilton argued that a stronger national government was needed; Anti-Federalists such as the writer "Brutus" feared it would threaten liberty and wanted a bill of rights. Students decide which side they would join and why.
3. The first three presidents. A quick tour: Washington set precedents and warned against parties; Adams and the Alien and Sedition Acts; Jefferson and the Louisiana Purchase. Connect to Ohio: statehood on March 1, 1803.

## Checking for understanding

Pairs write two sentences: "Americans won because ..., as shown by ..." Check that the claim uses specific evidence.

## Exit ticket

Which president changed the young republic most, and what is your evidence?
`,
  reading: [
    "Winning a war, debating a government, learning to govern",
    `
The odds against the American cause looked long. Britain had the world's best navy, a professional army and far greater resources. Yet in 1783 Britain recognized American independence. Historians give several reasons, and the best explanations combine them.

Leadership mattered. George Washington lost more battles than he won, but he kept the Continental Army together through the bitter winter of 1777 to 1778 at Valley Forge, where roughly two thousand men died of disease and cold. There the Prussian officer Baron von Steuben drilled soldiers into a more disciplined force. Geography helped too. The British had to supply an army three thousand miles away, and the country was too big to control by taking a few cities. Even when they occupied New York or Philadelphia, the Americans kept fighting.

The most important turning point was diplomatic. The American victory at Saratoga in October 1777, where a British army under General Burgoyne surrendered, convinced France that the Americans could win. In February 1778 France signed an alliance, and it later sent soldiers, money and a navy. Spain and the Netherlands also joined the war against Britain. At Yorktown, Virginia, in October 1781, a French fleet blocked British escape by sea while American and French troops surrounded General Cornwallis, who surrendered on October 19. The Treaty of Paris in 1783 confirmed independence.

After the war, Americans argued about how to govern themselves. When the Constitution was proposed in 1787, those in favor, the **Federalists**, argued that the weak Articles of Confederation had failed and that a stronger national government with separated powers could protect liberty and order. James Madison argued in Federalist No. 10 that a large republic would make it harder for one faction to dominate. The **Anti-Federalists** feared that a distant government would become tyrannical. They said the new Constitution lacked a bill of rights and gave too much power to the national government and to a standing army. Their objections led directly to the first ten amendments.

George Washington, elected unanimously in 1789, set many precedents: he created a cabinet, stepped down after two terms and, in his Farewell Address in 1796, warned against political parties and foreign entanglements. His treasury secretary, Alexander Hamilton, wanted a national bank and federal assumption of state debts, and Thomas Jefferson opposed him, so political parties formed anyway. John Adams, elected in 1796, faced a crisis with France called the XYZ Affair. His party passed the Alien and Sedition Acts of 1798, which made criticizing the government a crime, and Jefferson's supporters condemned them as a violation of free speech. In 1800 Jefferson won the presidency and Adams peacefully handed over power, which showed that elections could change governments without violence. In 1803 Jefferson bought the Louisiana Territory from France for about 15 million dollars, roughly doubling the size of the country. That same year Ohio, formed from part of the Northwest Territory, became the seventeenth state.

Taken together, these years show a republic that could win a war, argue over its foundation and survive its first changes of government.
`,
  ],
  cards: [
    ["Valley Forge", "The Continental Army's winter camp in 1777 to 1778, where hardship and training strengthened the army."],
    ["Saratoga", "The October 1777 American victory that convinced France to ally with the United States."],
    ["Yorktown", "The October 1781 victory where American and French forces trapped Cornwallis, effectively ending the war."],
    ["Federalists", "Supporters of the Constitution who wanted a stronger national government."],
    ["Anti-Federalists", "Opponents of the Constitution who feared a distant government and demanded a bill of rights."],
    ["Alien and Sedition Acts (1798)", "Laws passed under Adams that made criticizing the government a crime."],
    ["Louisiana Purchase (1803)", "Jefferson's purchase of land from France for about $15 million, doubling the country's size."],
    ["Precedent", "An action that becomes an example for later leaders, such as Washington leaving after two terms."],
  ],
  closed: [
    [
      "Why was the Battle of Saratoga a turning point?",
      [
        "It ended the war",
        "It convinced France to ally with the Americans",
        "It won the Ohio Country",
        "It made Washington president",
      ],
      "B",
    ],
    [
      "At Valley Forge, about 2,000 of about 12,000 soldiers died. What fraction is that?",
      ["About one in twenty", "About one in six", "About one in three", "About one in two"],
      "B",
    ],
    [
      "Which Anti-Federalist objection led to the Bill of Rights?",
      [
        "The Constitution had no list of individual rights",
        "The Constitution created too many states",
        "The Constitution gave the president no power",
        "The Constitution banned all taxes",
      ],
      "A",
    ],
    [
      "What did Washington's Farewell Address warn against?",
      [
        "Political parties and permanent foreign alliances",
        "Westward expansion and Native nations",
        "A national bank and tariffs",
        "A third branch of government",
      ],
      "A",
    ],
    [
      "The Louisiana Purchase cost about 15 million dollars and covered about 828,000 square miles. About how much did it cost per square mile?",
      ["About 2 cents", "About 18 cents", "About 1.80 dollars", "About 18 dollars"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Argue which was more important to the American victory: the French alliance or Washington's leadership. Choose one and support it with two specific facts. Then answer an objection.",
      scheme: [
        "States a clear claim choosing one factor",
        "Gives a first specific, accurate fact",
        "Gives a second specific, accurate fact",
        "Explains how the facts support the claim",
        "States an objection, such as the strength of the other factor",
        "Answers the objection",
      ],
      model:
        "The French alliance was more important. After Saratoga, France joined the war in 1778 and sent money, soldiers and a navy, and at Yorktown a French fleet blocked Cornwallis's escape. Without this help, Washington's army could not have beaten the British navy. Someone could argue that Washington's leadership at Valley Forge kept the army alive, which is true, but an army alone could not have won at Yorktown without the French fleet.",
      answers: [
        [
          "full",
          "[[0|I think the French alliance was more important]]. [[1|France joined in 1778 after Saratoga and sent money, troops and ships]]. [[2|At Yorktown a French fleet blocked the British from escaping by sea]]. [[3|The Americans had no navy to do that, so the alliance gave them what they lacked]]. [[4|Someone might say Washington's leadership at Valley Forge kept the army together]]. [[5|That's true, but an army that survived still needed the French fleet to win the final battle]].",
          "Full marks. Your claim, two facts and a reply to the best objection make a complete argument.",
        ],
        [
          "full",
          "[[0|My claim is that Washington's leadership mattered more]]. [[1|He kept the army together through Valley Forge where about 2,000 men died]], and [[2|he even lost many battles but never let the army be destroyed]]. [[3|That meant the British could never win decisively, which gave time for allies to join and for Britain to tire of the war]]. [[4|The objection is the French fleet at Yorktown]]. [[5|But France only joined because Saratoga showed the Americans could keep fighting, and that depended on an army that Washington held together]].",
          "All six points. You took the opposite position and used the objection to support your own claim.",
        ],
        [
          "partial",
          "[[0|The French alliance was most important]]. [[1|France sent soldiers and ships]].",
          "A clear claim and one fact. Add a second specific fact, explain how the facts support the claim and answer an objection.",
        ],
        [
          "partial",
          "[[1|Washington held the army together at Valley Forge]] and [[3|that helped them keep fighting]]. [[4|Some people say France mattered most]].",
          "Good reasoning and objection. State a clear claim, add a second fact and answer the objection instead of only stating it.",
          true,
        ],
        [
          "weak",
          "The Americans won because they had better weapons and a bigger army than Britain.",
          "Britain had the stronger army and navy. The Americans won through allies, leadership and geography. Pick one factor and give facts.",
        ],
        [
          "weak",
          "[[0|The French helped]]. Also Washington was a great leader. Both were good.",
          "The question asks you to pick one and argue for it. Choose a claim, add two specific facts and explain.",
        ],
      ],
    },
    {
      prompt:
        "Explain one disagreement between Federalists and Anti-Federalists over the Constitution. State each side's reasoning and say how the dispute was partly resolved.",
      scheme: [
        "Identifies a specific disagreement, such as the power of the national government or the lack of a bill of rights",
        "States the Federalist reasoning",
        "States the Anti-Federalist reasoning",
        "Explains how it was partly resolved, such as adding the Bill of Rights",
      ],
      model:
        "They disagreed over whether the Constitution needed a bill of rights. Federalists said the government only had the powers listed, so a list of rights was unnecessary and could even be dangerous. Anti-Federalists feared a strong national government would take away liberties and wanted rights written down. The dispute was resolved in part when the First Congress proposed the Bill of Rights, ratified in 1791.",
      answers: [
        [
          "full",
          "[[0|They argued about whether the Constitution needed a bill of rights]]. [[1|Federalists said the national government had only the powers given to it, so a list of rights wasn't needed]]. [[2|Anti-Federalists said a strong government could threaten liberty so rights needed to be written down]]. [[3|It was partly settled when the first Congress added the Bill of Rights, which was ratified in 1791]].",
          "Full marks. Each side's reasoning is stated fairly and the resolution is accurate.",
        ],
        [
          "full",
          "[[0|One disagreement was over how strong the national government should be]]. [[1|Federalists like Madison said the Articles were too weak and that a larger republic with separated powers would protect liberty]]. [[2|Anti-Federalists like Brutus feared a distant government would become tyrannical and rule over states and citizens]]. [[3|The Anti-Federalists got the Bill of Rights added as a safeguard, which was a partial compromise]].",
          "All four points. Naming Madison and Brutus shows you know where each argument came from.",
        ],
        [
          "partial",
          "[[0|They argued over a bill of rights]]. [[2|Anti-Federalists wanted one because they feared the government]].",
          "Good on the Anti-Federalist side. Give the Federalist reasoning and say how the dispute was resolved.",
        ],
        [
          "partial",
          "[[1|Federalists thought the Articles were too weak]] and [[3|the Bill of Rights was added later]].",
          "Both are accurate. Name the specific disagreement and give the Anti-Federalist reasoning to complete the comparison.",
          true,
        ],
        [
          "weak",
          "Federalists wanted a king and Anti-Federalists wanted a republic so the Anti-Federalists won.",
          "Neither side wanted a king. Both supported a republic but disagreed about how strong the national government should be. Look again at each side.",
        ],
        [
          "weak",
          "[[0|They disagreed about the Constitution]]. Federalists were for it and Anti-Federalists were against it, and that's all.",
          "That is a start. Name what they disagreed about, give each side's reasons, and say how it was partly resolved.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "The Articles of Confederation, and reading public opinion in the 1790s",
  note: `
## Objectives

Students will be able to:

1. identify the limits of a letter, a newspaper and a pamphlet as evidence of public opinion in the 1790s;
2. explain how the Articles of Confederation were organized and why they were replaced.

## Materials

A one-page chart of the Articles' structure, a summary of the Northwest Ordinance of 1787, short teacher-written model sources (a farmer's letter about the Whiskey tax in 1794, an extract from a Federalist newspaper and one from a Republican paper on the same event, a pamphlet defending the Jay Treaty), a source-evaluation sheet, and the exit ticket.

## Starter (8 minutes)

Ask: "How would a historian 200 years from now know what most Americans thought about a new law today?" List suggestions (polls, social media, news) and ask what each one gets wrong. Return to this when students analyze the 1790s sources.

## Main activity

1. The Articles. Draw the structure: one house of Congress, one vote per state, nine of thirteen states needed to pass major laws, all thirteen to amend, no executive, no courts, no power to tax or to regulate trade. Students identify two strengths (the Northwest Ordinance, winning the war) and four weaknesses.
2. Shays' Rebellion (1786 to 1787) and why it alarmed leaders. Link to the Constitutional Convention of 1787.
3. This is a step back in time from week 5. Explain that the unit now returns to the 1780s, then jumps to the 1790s, because historians need both to ask how people at the time understood their government.
4. Source evaluation. Groups examine three sources and fill in: who wrote it, who read it, whose opinion it represents, what it leaves out.

## Checking for understanding

Whiteboards: "A newspaper tells us what ___ thought, not what ___ thought." Collect and discuss.

## Exit ticket

One reason the Articles were replaced and one limit of a newspaper as evidence of public opinion.
`,
  reading: [
    "A weak union, and why one voice is not public opinion",
    `
The Articles of Confederation, written in 1777 and ratified in 1781, created a "firm league of friendship" among thirteen states. Americans had just fought a war against a distant, powerful government, and they were determined not to build another. The Articles gave Congress one house, with one vote for each state, regardless of size. Congress could declare war, make treaties and borrow money, but it could not tax or regulate trade. Nine of thirteen states had to agree to pass major laws, and all thirteen to amend the Articles. There was no president and no national court system.

The system had achievements. Congress negotiated the peace treaty in 1783. It also passed the Northwest Ordinance in 1787, which organized the territory north of the Ohio River, the land that includes Columbus, set a path to statehood for at least three and not more than five new states, banned slavery in that territory and set aside land for public schools. Marietta, the first permanent American settlement in Ohio, was founded the next year.

But the weaknesses were serious. Because Congress could not tax, it asked the states to contribute, and many did not. It could not pay its war debts or the soldiers. States set their own tariffs and printed their own money, and trade quarreled across state lines. In 1786 and 1787 Daniel Shays, a Massachusetts veteran, led farmers who faced losing their land to debt in a rebellion that shut down courts. Congress had no army to stop it, and the state had to raise its own militia. Leaders including Washington and Madison were alarmed. A meeting in Philadelphia in May 1787, called to revise the Articles, instead wrote a new Constitution.

The 1790s brought new arguments, and with them the question historians ask when they use sources: whose opinion are we reading? A **letter** is a private source. A Pennsylvania farmer writing about the whiskey tax in 1794 tells us what he and perhaps his neighbors thought, but he is one voice, and only a small share of people wrote letters that survive. A **newspaper** reflects its editor's politics. In the 1790s most papers openly sided with the Federalists or with Jefferson's Republicans and printed attacks on the other side, so two papers can describe the same event very differently. A **pamphlet** is written to persuade. A pamphlet defending the Jay Treaty of 1794 shows the argument its author wanted to make, perhaps paid for by a party, and who actually read it is unclear.

Each source helps, but none is a poll. To judge public opinion, a historian compares many kinds of evidence, such as election results, petitions, letters, newspapers and pamphlets, and asks of each who could write and read, who is missing, and what the writer wanted.
`,
  ],
  cards: [
    ["Articles of Confederation", "The first national constitution, ratified in 1781, creating a weak union of states."],
    ["Unicameral", "Having one house of legislature, as in Congress under the Articles."],
    ["Northwest Ordinance (1787)", "Law organizing the Northwest Territory, including Ohio, banning slavery there and setting a path to statehood."],
    ["Shays' Rebellion", "A 1786 to 1787 uprising of Massachusetts farmers over debts and taxes that exposed the weakness of the Articles."],
    ["Public opinion", "What a wide range of people in a society think about an issue."],
    ["Partisan press", "Newspapers in the 1790s that openly supported a political party."],
    ["Pamphlet", "A short, unbound publication, often written to persuade."],
    ["Representative sample", "A group of sources or people that reflects the whole population, which letters, newspapers and pamphlets seldom do."],
  ],
  closed: [
    [
      "Why couldn't Congress under the Articles raise money reliably?",
      [
        "It could only ask states to contribute and could not tax",
        "It had too many presidents",
        "States had no money",
        "It was forbidden to borrow",
      ],
      "A",
    ],
    [
      "Under the Articles, a major law needed nine of thirteen states to agree. What is the smallest number of states that could block it?",
      ["4", "5", "9", "13"],
      "B",
    ],
    [
      "What did the Northwest Ordinance of 1787 do?",
      [
        "It banned all trade with Britain",
        "It organized land north of the Ohio River, set a path to statehood and banned slavery there",
        "It created a national bank",
        "It gave Congress the power to tax",
      ],
      "B",
    ],
    [
      "A Republican newspaper and a Federalist newspaper describe the same 1794 event very differently. Why?",
      [
        "They were written in different languages",
        "Most newspapers in the 1790s openly supported one party",
        "One of them was written before the event",
        "Newspapers could not report events",
      ],
      "B",
    ],
    [
      "Which is the best reason a single farmer's letter cannot show public opinion?",
      [
        "Letters are always false",
        "One letter reflects one writer's view and few people's letters survive",
        "Letters were illegal",
        "Farmers could not write",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain why the Articles of Confederation were replaced. Use at least three specific weaknesses, and connect at least one to an event such as Shays' Rebellion.",
      scheme: [
        "Names a first specific weakness, such as no power to tax",
        "Names a second specific weakness, such as no executive or courts, or no power over trade",
        "Names a third specific weakness, such as needing nine states to pass laws or unanimity to amend",
        "Connects a weakness to an event, such as Shays' Rebellion showing there was no army to enforce order",
      ],
      model:
        "The Articles gave Congress no power to tax, so it could not pay its debts. It also had no president or national courts and could not regulate trade, so states set their own tariffs. Nine of thirteen states had to approve major laws and all thirteen to amend the Articles, which made reform nearly impossible. Shays' Rebellion in 1786 showed the problem, because Congress had no army to help Massachusetts, and this convinced leaders to write a new Constitution.",
      answers: [
        [
          "full",
          "[[0|Congress couldn't tax, so it couldn't pay its debts]]. [[1|There was no president or national court to carry out laws or settle disputes]]. [[2|Changing the Articles needed all thirteen states, and major laws needed nine, so reform was very hard]]. [[3|Shays' Rebellion showed it, because Congress had no army to stop farmers who shut down courts in Massachusetts]]. That convinced leaders like Washington and Madison to rewrite the government.",
          "Full marks. Three weaknesses plus an event that shows how they mattered in real life.",
        ],
        [
          "full",
          "A big problem was [[0|that Congress had no power to raise taxes and only asked states for money, which many didn't give]]. [[1|Congress also couldn't control trade, so states had their own tariffs and trade fights]]. [[2|The Articles needed all states to agree to any change]]. [[3|Shays' Rebellion made leaders afraid the national government couldn't handle unrest]], and that's why they met in Philadelphia in 1787.",
          "All four points. The state-by-state tariffs are a vivid detail that shows how the weakness hurt trade.",
        ],
        [
          "partial",
          "[[0|Congress couldn't tax]] and [[3|Shays' Rebellion showed it was weak]].",
          "Good, but you need two more specific weaknesses. What else was missing from the Articles?",
        ],
        [
          "partial",
          "[[1|No president or courts]] and [[2|you needed all states to change anything]]. It had a Northwest Ordinance.",
          "Two accurate weaknesses. Add the power to tax, and connect a weakness to an event such as Shays' Rebellion.",
          true,
        ],
        [
          "weak",
          "The Articles were replaced because they gave too much power to the president and people were afraid of him.",
          "The Articles had no president. The problem was a government that was too weak. Look at what Congress could not do.",
        ],
        [
          "weak",
          "[[0|They couldn't tax]]. Everything else about the Articles was perfect.",
          "Not being able to tax was a real problem. There were others: no executive, no courts, trade disputes and the difficulty of amendment.",
        ],
      ],
    },
    {
      prompt:
        "A historian wants to know what ordinary Pennsylvanians thought about the whiskey tax in 1794. Name the limits of using (a) one farmer's letter, (b) a partisan newspaper and (c) a pamphlet as evidence. Say what other evidence she might add.",
      scheme: [
        "Gives a limit of a single letter, such as one voice or who writes letters",
        "Gives a limit of a partisan newspaper, such as the editor's political bias",
        "Gives a limit of a pamphlet, such as being written to persuade and unclear readership",
        "Names an additional source that would help, such as petitions, election results or court records",
      ],
      model:
        "A single farmer's letter shows one person's view, and only some people wrote letters that survive. A partisan newspaper shows what its editor and party wanted readers to think, and would present the tax protests in a favorable or hostile way. A pamphlet was written to persuade, and we do not know how many people read it. She could add petitions signed by many people or election results from the region.",
      answers: [
        [
          "full",
          "[[0|A letter is just one person's view, and most farmers' letters didn't survive or weren't written]]. [[1|A newspaper in the 1790s sided with a party, so it would tell the story the party's way]]. [[2|A pamphlet is written to persuade and we don't know who read it]]. [[3|She could add petitions with many signatures or election results to see how people voted]].",
          "Full marks. Each limit is specific to the type of source, and your additions are real ways to widen the evidence.",
        ],
        [
          "full",
          "[[0|The letter only speaks for the writer and maybe his neighbors, so it can't represent all Pennsylvanians]]. [[1|The newspaper had a political slant, because the editor supported either the Federalists or the Republicans]]. [[2|The pamphlet's author was trying to win people over, so it shows his argument and not necessarily what readers believed]]. [[3|Court records of who was arrested in the protests would show how many people were involved]].",
          "All four points. Court records are a fine addition because they show actions, not just words.",
        ],
        [
          "partial",
          "[[0|A letter is only one person's opinion]]. [[1|A newspaper could be biased]].",
          "Both limits are right. Add a limit of the pamphlet and name another source she could use.",
        ],
        [
          "partial",
          "[[2|A pamphlet is meant to persuade]] and [[3|she could use election results]].",
          "Good on those two. The question also asks for limits of the letter and the newspaper.",
          true,
        ],
        [
          "weak",
          "All three sources are reliable because they are from 1794 and they show exactly what everybody thought.",
          "Being from the time makes them primary sources, but each reflects one person or group. They do not show what everybody thought.",
        ],
        [
          "weak",
          "[[1|Newspapers could be biased]]. Letters and pamphlets are fine because they're real.",
          "Bias in newspapers is right. Letters and pamphlets have limits too: one voice, and a purpose to persuade.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Building the Constitution: limits, compromises and the Bill of Rights",
  note: `
## Objectives

Students will be able to:

1. explain how the Constitution created a government with limits and the compromises that made it possible;
2. explain why the Bill of Rights was added and how it protects individual liberties.

## Materials

A one-page diagram of the three branches with checks, a chart of the Virginia Plan and the New Jersey Plan, cards for the Great Compromise and the Three-Fifths Compromise, a copy of the Bill of Rights in student-friendly summary, population numbers for a representation exercise, and the exit ticket.

## Starter (8 minutes)

Run a mini-vote: "Should each state get the same number of votes in a national legislature, or should votes be based on population?" Split students into "large states" and "small states" and ask them to argue. Tell them that the delegates of 1787 faced the same problem.

## Main activity

1. Limits. Walk through separation of powers, checks and balances and federalism. Students match examples (a presidential veto, Senate confirmation, judicial review) to the idea they illustrate.
2. Compromises. The Virginia Plan favored large states by representation based on population; the New Jersey Plan gave each state one vote. The Great Compromise created a House based on population and a Senate with two members per state. Use the Three-Fifths Compromise numbers: a state with 400,000 free people and 100,000 enslaved people counts 400,000 plus three-fifths of 100,000, or 460,000, for the House. Discuss who gained and who was left out.
3. The Bill of Rights. Present the Anti-Federalist demand for a list of rights and Madison's proposal of amendments in 1789, ratified in 1791. Students pair each of five amendments with a scenario.

## Checking for understanding

Cold-call for a limit on power that the Constitution creates and the rights an amendment protects.

## Exit ticket

One compromise in the Constitution and who gained and lost from it.
`,
  reading: [
    "A government with limits, a bargain with costs, and ten amendments",
    `
Fifty-five delegates from twelve states met in Philadelphia in the summer of 1787. Rhode Island refused to send anyone. They began by agreeing in secret to write a new constitution rather than patch the Articles. The government they designed rested on three ideas about limiting power.

The first was **separation of powers**: Congress would make laws, the president would carry them out, and courts would decide cases. The second was **checks and balances**, so each branch could restrain the others. The president can veto a bill, but Congress can override the veto with a two-thirds vote. The Senate must approve the president's appointments and treaties. Federal courts can decide whether a law fits the Constitution. The third was **federalism**, a division of power between the national government and the states. Together these ideas aimed to prevent any person or group from gaining unchecked control.

Agreement on structure came only through compromise. The Virginia Plan, drafted by James Madison, based representation in both houses on population and favored large states. The New Jersey Plan gave each state one vote, as under the Articles, and favored small states. After weeks of argument the delegates adopted the **Great Compromise**: a House of Representatives apportioned by population and a Senate with two members from each state. A second dispute concerned slavery. Southern states wanted enslaved people to count toward representation, while Northern delegates objected. The **Three-Fifths Compromise** counted three-fifths of the enslaved population when apportioning seats and direct taxes. A state with 400,000 free people and 100,000 enslaved people would count as 400,000 plus 60,000, or 460,000, which gave slaveholding states more seats than their free population alone would have earned. Another clause barred Congress from ending the importation of enslaved people until 1808, and a fugitive slave clause required the return of people who escaped. The word "slavery" does not appear in the document, but the system was protected throughout. These compromises made the Constitution possible, and they carried a heavy moral cost that later generations would pay.

Thirty-nine delegates signed on September 17, 1787. Nine states had to ratify before it took effect, and the debate was fierce. Anti-Federalists said the proposed government threatened individual liberty and pointed out that the Constitution contained no bill of rights. Several states ratified on the understanding that amendments would follow. James Madison, who had at first thought a bill of rights unnecessary, introduced amendments in the First Congress in 1789. Ten were ratified by the states on December 15, 1791, and are called the **Bill of Rights**. They protect freedoms of religion, speech, press, assembly and petition, the right to bear arms, protections against unreasonable searches, rights for the accused such as a jury trial and a lawyer, and a promise that powers not given to the national government remain with the states or the people.

At the start, the Bill of Rights restricted only the national government. Not until the twentieth century did the Supreme Court apply most of it to states, a story for a later unit.
`,
  ],
  cards: [
    ["Separation of powers", "Dividing government into legislative, executive and judicial branches."],
    ["Checks and balances", "Ways each branch can limit the others, such as the veto and Senate confirmation."],
    ["Federalism", "Sharing power between a national government and state governments."],
    ["Virginia Plan", "A plan for a legislature based on population, favoring large states."],
    ["New Jersey Plan", "A plan giving each state one vote, favoring small states."],
    ["Great Compromise", "The deal creating a House based on population and a Senate with two members per state."],
    ["Three-Fifths Compromise", "The agreement counting three-fifths of the enslaved population for representation and taxes."],
    ["Bill of Rights", "The first ten amendments, ratified in 1791, protecting individual liberties."],
  ],
  closed: [
    [
      "A state has 300,000 free people and 100,000 enslaved people. How many people count for House seats under the Three-Fifths Compromise?",
      ["300,000", "360,000", "400,000", "460,000"],
      "B",
    ],
    [
      "Which is an example of checks and balances?",
      [
        "The president vetoes a bill and Congress can override the veto",
        "States print their own money",
        "Congress asks states for money",
        "Each state has one vote",
      ],
      "A",
    ],
    [
      "Why did small states favor the New Jersey Plan?",
      [
        "It gave each state an equal vote regardless of population",
        "It abolished state governments",
        "It based seats on population",
        "It created a king",
      ],
      "A",
    ],
    [
      "Why was the Bill of Rights added after the Constitution was written?",
      [
        "The delegates forgot about rights",
        "Anti-Federalists and some states demanded a list of protected rights before ratifying",
        "The Supreme Court required it",
        "The British demanded it",
      ],
      "B",
    ],
    [
      "At least how many of the 13 states had to ratify the Constitution for it to take effect?",
      ["Seven", "Nine", "Eleven", "All thirteen"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the Great Compromise settled the dispute between large and small states, and say who gained and who lost under the Three-Fifths Compromise.",
      scheme: [
        "States that large states wanted representation by population and small states wanted equal representation",
        "Explains that the Great Compromise created a House by population and a Senate with two members per state",
        "States who gained from the Three-Fifths Compromise, such as slaveholding states gaining seats",
        "States who lost, such as enslaved people who had no rights or free states and the enslaved themselves",
      ],
      model:
        "Large states wanted representation by population and small states wanted each state to have an equal vote. The Great Compromise created a House based on population and a Senate with two members for each state. Under the Three-Fifths Compromise, slaveholding states gained extra seats and electoral votes by counting part of the enslaved population, while enslaved people lost, since they had no rights or vote despite being counted.",
      answers: [
        [
          "full",
          "[[0|Large states wanted seats by population and small states wanted every state equal]]. [[1|The Great Compromise made the House based on population and the Senate two for each state]]. [[2|The Three-Fifths Compromise helped slaveholding states because they got more seats in the House from counting part of the enslaved people]]. [[3|Enslaved people lost out because they were counted but had no vote or rights]].",
          "Full marks. You showed the dispute, the deal and the winners and losers, including who paid the cost.",
        ],
        [
          "full",
          "The disagreement was that [[0|big states like Virginia wanted representation based on population while small states like New Jersey wanted equal votes]]. [[1|The compromise gave the House seats by population and the Senate two senators from every state]]. For the Three-Fifths Compromise, [[2|Southern states gained political power because they counted three-fifths of enslaved people toward their seats]], and [[3|enslaved people lost because it treated them as partly property and partly people, while giving them no voice]].",
          "All four points. Describing the compromise as treating enslaved people as 'partly property and partly people' shows how it worked.",
        ],
        [
          "partial",
          "[[0|Big states wanted population and small states wanted equal votes]]. [[1|The Great Compromise gave one house by population and the other equal]].",
          "Good on the first part. The question also asks who gained and who lost under the Three-Fifths Compromise.",
        ],
        [
          "partial",
          "[[2|Slaveholding states gained seats from the Three-Fifths Compromise]] and [[3|enslaved people lost]]. The Great Compromise was a compromise.",
          "Good on the Three-Fifths. Explain the Great Compromise: what the large and small states wanted and what was created.",
          true,
        ],
        [
          "weak",
          "The Great Compromise gave every state the same number of representatives in both houses so it was fair to all.",
          "The Great Compromise had two parts: the House by population and the Senate equal. Re-read what each house does.",
        ],
        [
          "weak",
          "[[3|Enslaved people lost under the Three-Fifths Compromise]]. Nobody gained because everyone compromised.",
          "Enslaved people did lose, which is right. But slaveholding states gained seats, so there were winners as well. Identify who.",
        ],
      ],
    },
    {
      prompt:
        "Choose two amendments from the Bill of Rights. For each one, explain what it protects and why Anti-Federalists, who feared a strong national government, wanted it.",
      scheme: [
        "Accurately describes what the first amendment protects",
        "Explains why Anti-Federalists wanted that protection",
        "Accurately describes what the second amendment protects",
        "Explains why Anti-Federalists wanted that protection",
      ],
      model:
        "The First Amendment protects freedoms of religion, speech, press, assembly and petition. Anti-Federalists wanted it because they feared a strong national government could silence critics, as the British had. The Fourth Amendment protects people from unreasonable searches and seizures, which Anti-Federalists wanted because they remembered British officials searching colonial homes and feared a distant government would do the same.",
      answers: [
        [
          "full",
          "[[0|The First Amendment protects speech, religion, press, assembly and petition]]. [[1|Anti-Federalists wanted it because they were afraid a strong national government could punish critics, like the British did]]. [[2|The Fourth Amendment protects against unreasonable searches and seizures]], and [[3|they wanted it because British officers had searched colonists' homes, and they feared a distant government would do it again]].",
          "Full marks. You tied each protection to the fear behind it.",
        ],
        [
          "full",
          "One is the Sixth Amendment, which [[0|guarantees a speedy public trial by jury and a lawyer for the accused]]. [[1|Anti-Federalists wanted it because they feared a powerful distant government would put people on trial unfairly]]. The other is the Second, which [[2|protects the right to keep and bear arms and mentions a well-regulated militia]]. [[3|They wanted it because they distrusted a standing army and wanted citizens and state militias to be able to defend themselves]].",
          "All four points. Linking the Second Amendment to the fear of a standing army reflects the debate of the time.",
        ],
        [
          "partial",
          "[[0|The First Amendment protects speech and religion]]. [[1|Anti-Federalists wanted it to protect people]].",
          "Right about what it protects. Be more specific about why they wanted it, then do the same for a second amendment.",
        ],
        [
          "partial",
          "[[2|The Fourth Amendment protects against unreasonable searches]], [[3|because the British searched people's houses]].",
          "That is accurate and well explained. Add the first amendment, with what it protects and why Anti-Federalists wanted it.",
          true,
        ],
        [
          "weak",
          "The Fifth Amendment lets states leave the country. Anti-Federalists wanted it because they were mad at Britain.",
          "The Fifth Amendment protects rights of the accused, such as no self-incrimination. Check what each amendment says.",
        ],
        [
          "weak",
          "[[0|The First Amendment protects free speech]]. The Bill of Rights was about Federalists wanting a king.",
          "Free speech is right. But Federalists did not want a king, and the Bill of Rights came from Anti-Federalist fears of a strong government.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Weighing founding-era sources, and was the Constitution a compromise or a victory?",
  note: `
## Objectives

Students will be able to:

1. evaluate the credibility of primary sources from the founding era;
2. build an evidence-based argument about whether the Constitution was a compromise or a victory for one side.

## Materials

Five source cards (a summary of Federalist No. 10 with its date and pseudonym, a summary of Brutus No. 1, a summary of Madison's notes of the Convention and the fact of their later publication, a summary of a Jefferson letter written from Paris, a summary of a newspaper account of the ratifying convention), a credibility checklist (author, date, audience, purpose, corroboration), an argument organizer, and the exit ticket.

## Starter (8 minutes)

Ask: "Your friend tells you something about what happened at a school board meeting. Whose account would you trust most: the person who was in the room, a person who was told about it, or the person who gave the speech?" List reasons. Introduce the idea that "who was there" is one test of many.

## Main activity

1. Credibility checks. Groups take two of the five cards and answer: who wrote it, when, for whom and why; was the author present; can another source confirm it? Each group must name one thing the source is good for and one thing it is not.
2. The argument. Pose: "Was the Constitution a compromise or a victory for one side?" Students list compromises (Great Compromise, Three-Fifths, the 1808 slave trade clause) and gains for one side (a stronger national government for Federalists; protections for slavery for Southern delegates).
3. Write. Using the organizer, each student drafts a claim, two pieces of evidence from at least two sources, and a counterclaim with a response.

## Checking for understanding

Exchange paragraphs and mark the claim, evidence, counterclaim. The partner says which source is the weakest in the argument and why.

## Exit ticket

Write your claim in one sentence and name the source that most strengthens it.
`,
  reading: [
    "Who wrote it, and what did the Constitution really settle?",
    `
Evaluating a source means asking how far you can rely on it for a particular purpose. Historians usually check five things: who wrote it, when, for what audience, for what purpose, and whether another source supports it. A source can be excellent for one question and poor for another.

Take the debate over ratifying the Constitution. In 1787 and 1788, Alexander Hamilton, James Madison and John Jay wrote eighty-five essays, now called the Federalist Papers, signed with the pen name "Publius" and published in New York newspapers. Federalist No. 10, by Madison, argues that a large republic can control the danger of factions better than a small one. It is a primary source written during the fight, but it is also a piece of persuasion aimed at New York voters who were undecided. It is excellent evidence of the Federalists' reasoning and less reliable as an unbiased description of the Constitution's effects. The Anti-Federalist essays signed "Brutus," published at the same time, argue that a government over so large a territory would drift away from the people. Read together, the two sides give a fuller picture than either alone.

Not all sources about the Convention are equal. The delegates met in secret, and the best record is the notes James Madison took almost daily. He did not publish them. They appeared in 1840, after his death, and he is known to have revised parts of them in later years, so they are an invaluable record that should be used with care. Thomas Jefferson, who was serving as the American minister in Paris and was not at the Convention, wrote in a letter that the delegates were "an assembly of demigods." That is a valuable sign of how the Convention looked from abroad, but he was not there, so it is not evidence of what happened in the room.

With these cautions, how should one judge the Constitution? The compromises were real. The Great Compromise split the difference between large and small states. The Three-Fifths Compromise and the clause protecting the importation of enslaved people until 1808 gave Southern delegates what they demanded in exchange for their support. The Electoral College was a compromise between election by Congress and election by popular vote. Yet one could argue that the Federalists won a larger prize, a national government with the power to tax, to regulate trade and to enforce its laws, which was exactly what they had wanted since the failures of the Articles. And Anti-Federalists gained the Bill of Rights, which they might call a partial victory.

A strong answer does not simply pick a side. It states a claim, backs it with evidence from sources whose reliability it has weighed, and admits what the evidence cannot settle.
`,
  ],
  cards: [
    ["Credibility", "How far a source can be relied on for a specific question, judged by author, date, audience, purpose and corroboration."],
    ["Publius", "The pen name under which Hamilton, Madison and Jay wrote the Federalist Papers."],
    ["Federalist No. 10", "Madison's essay arguing that a large republic can better control factions."],
    ["Brutus", "A pen name of an Anti-Federalist essayist who argued that a large republic would be too distant from its people."],
    ["Madison's notes", "The most detailed record of the 1787 Convention, published in 1840 after he revised parts of them."],
    ["Electoral College", "The compromise method of choosing the president through electors from each state."],
    ["Corroboration", "Confirmation of a claim by another independent source."],
    ["Counterclaim", "An objection to your argument that you must answer."],
  ],
  closed: [
    [
      "Why is Federalist No. 10 both a valuable and a limited source?",
      [
        "It is a neutral account written decades later",
        "It shows Federalist reasoning but was written to persuade, so it is not an unbiased description of the Constitution's effects",
        "It was written by an Anti-Federalist",
        "It describes the debates in the Convention",
      ],
      "B",
    ],
    [
      "Jefferson called the Convention's delegates \"an assembly of demigods\" in a letter from Paris. What can this source be used for?",
      [
        "Proving what happened inside the Convention",
        "Showing how the Convention was viewed from abroad by someone who was not there",
        "Proving the delegates were gods",
        "Showing that Jefferson attended",
      ],
      "B",
    ],
    [
      "Why must historians be careful with Madison's notes of the Convention?",
      [
        "They were published in 1840 and he revised parts of them",
        "They were written by Hamilton",
        "They were written in code",
        "They cover a different convention",
      ],
      "A",
    ],
    [
      "Which is the best example of a claim that the Constitution was a compromise?",
      [
        "The Constitution was written entirely by Southern delegates",
        "The Great Compromise gave large states the House and small states the Senate",
        "The Constitution had no limits on power",
        "The Constitution was ratified unanimously by popular vote",
      ],
      "B",
    ],
    [
      "Eighty-five Federalist essays were published. If Madison wrote 29 of them, about what share did he write?",
      ["About 11 percent", "About 24 percent", "About 34 percent", "About 51 percent"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Evaluate how credible Madison's notes of the Constitutional Convention are as evidence of what happened there. Consider who wrote them, when they were published and what can be used to check them.",
      scheme: [
        "States that Madison was a delegate present in the room",
        "States that the notes were published after his death in 1840",
        "States that he revised parts of them, which affects reliability",
        "Names another source or kind of evidence that could confirm them, such as other delegates' notes",
        "Reaches a reasoned judgment about their credibility",
      ],
      model:
        "Madison was a delegate and took notes almost daily, so he was present for the debates, which makes the notes highly valuable. But they were published only in 1840, after his death, and he revised parts of them later, so they may reflect his later views. Other delegates' notes, such as those of Robert Yates or Rufus King, can be used to check them. I judge them very credible for the main events and arguments but worth checking on details where Madison had a stake.",
      answers: [
        [
          "full",
          "[[0|Madison was in the room as a delegate and took notes nearly every day]], which makes them very useful. But [[1|they weren't published until 1840 after he died]] and [[2|he went back and revised some of them over the years]], which means they may reflect what he thought later. [[3|Notes by other delegates, like Yates or King, can be used to check him]]. [[4|So I'd say the notes are highly credible for the main arguments and events, but a historian should double-check where Madison had a personal stake]].",
          "Full marks. Your judgment is balanced and names a way to check the source against others.",
        ],
        [
          "full",
          "A strength is that [[0|Madison was an active delegate who was there throughout the convention]]. A weakness is that [[1|they were only published in 1840 so nobody could challenge them at the time]], and [[2|he edited them in later years, probably to clarify, but also maybe to shape his own role]]. [[3|Other delegates left notes, so a historian can compare]]. [[4|I think they are the best single source on the Convention but not a perfect one]].",
          "All five points. Recognizing that editing could have been for clarity or for self-presentation shows careful thought.",
        ],
        [
          "partial",
          "[[0|Madison was a delegate there]]. [[1|They were published in 1840]]. They are mostly reliable.",
          "Good start. Say how his revisions affect reliability and what could be used to check them, then explain your judgment.",
        ],
        [
          "partial",
          "[[2|Madison revised them later]] and [[3|other delegates' notes can check them]].",
          "Two good points. Add that he was present, the publication date, and a clear judgment.",
          true,
        ],
        [
          "weak",
          "They aren't credible at all because Madison wrote them years later and he made everything up.",
          "Madison took notes during the Convention, then revised parts later. They are not made up, but a historian checks them. Explain the strengths and limits.",
        ],
        [
          "weak",
          "[[0|Madison was there]] so everything he wrote is 100 percent true and needs no checking.",
          "Being present is a real strength. But he revised the notes later and published them after his death. A historian still checks.",
        ],
      ],
    },
    {
      prompt:
        "Write an argument that answers the question: Was the Constitution mainly a compromise, or a victory for one side? State a claim, use evidence from at least two named sources or provisions, and answer a counterclaim.",
      scheme: [
        "States a clear claim answering the question",
        "Gives a first specific piece of evidence, such as a provision or a source",
        "Gives a second specific piece of evidence",
        "Explains how the evidence supports the claim",
        "States a counterclaim",
        "Answers the counterclaim",
      ],
      model:
        "The Constitution was mainly a compromise. The Great Compromise gave large states the House and small states the Senate, and the Three-Fifths Compromise and the 1808 clause gave Southern states concessions in return for their support. These deals show that no side got all it wanted. Someone could argue that Federalists won because they got a strong national government. But the Anti-Federalists got the Bill of Rights, and the Convention could not have succeeded without these trade-offs.",
      answers: [
        [
          "full",
          "[[0|I argue the Constitution was mainly a compromise]]. [[1|The Great Compromise gave large states the House and small states equal votes in the Senate]]. [[2|The Three-Fifths Compromise and the 1808 slave trade clause gave Southern delegates protections in exchange for support]]. [[3|These deals show that every group gave something up and got something, so no one side won everything]]. [[4|Someone could argue that the Federalists won because they got a strong national government]]. [[5|But Anti-Federalists got the Bill of Rights added, and the Federalists had to agree to compromises to even get the Constitution ratified]].",
          "Full marks. Your claim, evidence and answer to the strongest objection hold together well.",
        ],
        [
          "full",
          "[[0|I think the Constitution was more of a victory for the Federalists than a compromise]]. [[1|It gave the national government the power to tax and regulate trade, which is what Federalists wanted after the Articles failed]]. [[2|Madison argued in Federalist No. 10 that a large republic would protect against factions, and that is the design the Constitution used]]. [[3|The central goal of a stronger national government was achieved]]. [[4|The counterclaim is that the Great Compromise and the Three-Fifths clause were compromises]]. [[5|But those settled how power was shared, not whether the government would be strong, and on that main question the Federalists got what they wanted]].",
          "All six points. You took the other side from the first answer, and your reply to the counterclaim separates two different questions.",
        ],
        [
          "partial",
          "[[0|It was a compromise]]. [[1|The Great Compromise is one example]].",
          "A claim and one example. Add a second piece of evidence, explain how they support the claim and answer a counterclaim.",
        ],
        [
          "partial",
          "[[2|The Three-Fifths Compromise gave Southern states power]] and [[4|Federalists might say they won]]. So it was a compromise.",
          "You have one piece of evidence and a counterclaim. Add another piece of evidence, explain it, and answer the counterclaim.",
          true,
        ],
        [
          "weak",
          "The Constitution was a victory for everybody equally, so it was perfect and nobody lost anything.",
          "Enslaved people and Native nations, for example, lost. Choose a claim you can support with specific provisions or sources.",
        ],
        [
          "weak",
          "[[0|It was a victory for the South]] because they were the winners of the Revolution.",
          "The South did win some concessions, but the claim needs evidence like the 1808 clause. Argue with specific provisions and sources.",
        ],
      ],
    },
  ],
};

writeCourse("us-history-grade-10.json", "US History", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
