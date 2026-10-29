import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * US Government, Grade 11, Quarter 1. Structure and principles of American
 * government, rights and liberties, and civic action.
 * Standards: C3 Framework, Civic and Political Institutions, in the school's
 * own words.
 */

const w1: WeekInput = {
  topic: "Who governs, why, and the ideas behind the American founding",
  note: `
## Objectives

Students will be able to:

1. distinguish the powers of local, state, tribal and national governments and give an example of each;
2. explain why governments exist and compare forms of government such as democracy, monarchy and authoritarian rule;
3. explain the major ideas that shaped the American founding, such as natural rights, consent of the governed and the social contract.

## Materials

A four-circle diagram handout (local, state, tribal, national), a set of twelve problem cards ("A pothole on Broad Street," "A hunting license," "A treaty," "Tribal police jurisdiction," and so on), short teacher-written summaries of Hobbes, Locke and Rousseau, a government-forms chart, and the exit ticket.

## Starter (8 minutes)

Ask: "Imagine your school suddenly has no principal, no rules and no one in charge for one week. What problems would appear by Wednesday?" Collect the list and name the jobs government does: keeping order, settling disputes, protecting people, providing services.

## Main activity

1. Sort the problem cards onto the four-circle diagram: which level handles each? Debrief with Columbus and Ohio examples: a city council, the Franklin County commissioners, the Ohio General Assembly, the Navajo Nation's own council and courts, and Congress. Note that Ohio's historic Native nations, such as the Shawnee, are today based elsewhere, mostly in Oklahoma.
2. Compare forms of government. Using the chart, students identify who holds power, how leaders are chosen, and how power is limited in a direct democracy, a representative democracy, an absolute monarchy, a constitutional monarchy and an authoritarian state.
3. Jigsaw on three thinkers. Groups read a summary of Hobbes (people need a strong ruler to avoid chaos), Locke (natural rights and consent) and Rousseau (the general will) and teach each other. Connect to the opening of the Declaration.

## Checking for understanding

Mini whiteboards: name the level of government for four new scenarios, and then complete: "A government gets its authority from ___."

## Exit ticket

Which of the three thinkers influenced the Declaration most? Give one phrase or idea as evidence.
`,
  reading: [
    "Four layers of government, many forms and the case for consent",
    `
Most Americans live under several governments at once. The **local** government, such as the Columbus city council or a school board, runs police, trash collection, buses, zoning and public schools. The **state** government, in Ohio's case the governor, the General Assembly and the state courts, charters cities, licenses drivers, sets criminal laws and oversees colleges. The **national** government handles national defense, foreign policy, currency, immigration and interstate commerce. Between them stand more than 570 **tribal nations** recognized by the federal government. These nations govern themselves under a unique status. The Navajo Nation, for example, has its own elected council, courts and police, and manages land across three states. Each level has its own powers and sometimes overlaps with others. A road may be built with city, state and federal money, and a crime may break more than one set of laws.

Why have governments at all? Political thinkers have offered answers for centuries. In the 1600s the English philosopher Thomas Hobbes argued that without a strong ruler, life would be a "war of all against all," so people give up some freedom for safety. John Locke, writing in 1689, took a more hopeful view. He said that people have **natural rights** to life, liberty and property that exist before any government, and that people create governments to protect those rights. If a government fails to do so, the people may change it. This agreement is the **social contract**. Jean-Jacques Rousseau, in 1762, stressed that legitimate authority comes from the "general will" of the people. Locke's ideas are close to the language of the Declaration of Independence, which says governments derive their just powers from the **consent of the governed**.

Governments take many forms. In a **direct democracy**, citizens vote on laws themselves, as in New England town meetings. In a **representative democracy**, also called a republic, citizens elect officials who make decisions for them, as in the United States. In an **absolute monarchy**, a king or queen holds all power by birthright, as in France under Louis XIV. In a **constitutional monarchy**, such as the United Kingdom today, the monarch is a symbol, and an elected parliament governs. In an **authoritarian** state, a single leader or party holds power without free elections and restricts opposition, speech and the press. A useful test asks two questions: who holds power, and what limits it?

The American founders chose a representative republic with written limits. They had lived under a king who, in their view, ruled without consent, and they feared concentrated power. Their design reflects Locke's idea that government is a trust, Montesquieu's idea of dividing power and a belief in popular sovereignty, which means that the people are the ultimate source of authority.

A common mistake is to treat "democracy" as a single thing. Whether a government is democratic depends on how many people can vote, how free elections are, whether minority rights are protected and whether leaders can be removed peacefully.
`,
  ],
  cards: [
    ["Local government", "A city, county or school board that provides everyday services such as police, buses and public schools."],
    ["Tribal sovereignty", "The right of federally recognized tribal nations to govern themselves under their own laws, councils and courts."],
    ["Natural rights", "Rights, such as life, liberty and property, that Locke said people have before any government exists."],
    ["Social contract", "The idea that people agree to form a government and give up some freedom in exchange for protection."],
    ["Consent of the governed", "The principle that a government's authority comes from the agreement of the people."],
    ["Popular sovereignty", "The idea that the people are the ultimate source of government's power."],
    ["Representative democracy", "A system in which citizens elect officials to make laws for them; also called a republic."],
    ["Authoritarian government", "A system in which one leader or party holds power without free elections and limits opposition."],
  ],
  closed: [
    [
      "Which level of government is mainly responsible for running Columbus's city buses?",
      ["Local", "Tribal", "National", "State legislature only"],
      "A",
    ],
    [
      "Which thinker's ideas about natural rights and revolution are closest to the Declaration of Independence?",
      ["Thomas Hobbes", "John Locke", "Louis XIV", "Rousseau, alone"],
      "B",
    ],
    [
      "A nation's leader holds power for life, there are no free elections, and newspapers need government approval. What form of government is this?",
      ["Representative democracy", "Constitutional monarchy", "Authoritarian", "Direct democracy"],
      "C",
    ],
    [
      "A small New England town holds a meeting at which every resident votes directly on the budget. This is an example of:",
      ["Direct democracy", "Representative democracy", "Absolute monarchy", "Tribal government"],
      "A",
    ],
    [
      "The Navajo Nation operates its own court system. This is an example of:",
      [
        "A local government under a county",
        "Tribal sovereignty",
        "A state agency",
        "A federal department",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose two levels of government (local, state, tribal or national). For each, give one power or service and a real example, and explain one way the two levels might overlap or depend on each other.",
      scheme: [
        "Names a power or service for the first level, with a real example",
        "Names a power or service for the second level, with a real example",
        "Accurately explains one way the two levels overlap or depend on each other",
        "Supports the overlap with a concrete example",
      ],
      model:
        "A city government, such as Columbus, runs local services like police and trash collection. The national government handles national defense and currency. They overlap when a street project is paid for by federal funds and built by the city, so the city depends on the national government for money and must follow federal rules for how it is spent.",
      answers: [
        [
          "full",
          "[[0|Local government like the Columbus city council runs the police and trash pickup]]. [[1|The state government, like Ohio's, licenses drivers and sets criminal laws]]. [[2|They overlap because the state sets rules for cities and gives them money]], for example [[3|Ohio gives Columbus money for roads but the state also decides what cities are allowed to do about things like taxes]].",
          "Full marks. Your overlap example shows that levels depend on each other and are not separate boxes.",
        ],
        [
          "full",
          "[[0|The Navajo Nation, a tribal government, has its own council, courts and police on its land]]. [[1|The national government handles things like the military and money]]. [[2|They overlap because the federal government has a special relationship with tribes and provides some funding]], and [[3|a crime on Navajo land might involve both tribal and federal law enforcement depending on the crime]].",
          "All four points. Naming a case where jurisdiction crosses between tribal and federal authorities is a precise example.",
        ],
        [
          "partial",
          "[[0|Local government runs the police]]. [[1|The national government runs the army]].",
          "Both powers are right. Say how the two levels overlap and give an example.",
        ],
        [
          "partial",
          "[[2|A city and the state both make laws that affect people]], like [[3|a road that is paid for partly by the state]]. The local government is the city.",
          "Good on overlap. Name specific powers or services for each of two levels, with real examples.",
          true,
        ],
        [
          "weak",
          "The local government runs the whole country and the state government only runs the schools. The levels never overlap.",
          "The national government runs the country-wide matters, and levels often overlap. Look at the roles of each level again.",
        ],
        [
          "weak",
          "[[0|Tribal government runs the police]]. Tribes are just clubs and have no real power.",
          "Tribal nations have real power, including courts and police. They are sovereign within limits set by federal law. Choose another level too.",
        ],
      ],
    },
    {
      prompt:
        "Explain how John Locke's ideas of natural rights and consent are reflected in the Declaration of Independence, and compare Locke's view of government with Hobbes's.",
      scheme: [
        "Accurately states Locke's idea of natural rights or consent",
        "Connects it to specific language or ideas in the Declaration",
        "Accurately states Hobbes's view of government",
        "Draws a clear comparison between Locke and Hobbes",
      ],
      model:
        "Locke argued that people have natural rights to life, liberty and property and that government rests on the consent of the governed. The Declaration echoes this when it says that people have unalienable rights and that governments get their just powers from the consent of the governed. Hobbes thought people need a strong ruler to avoid chaos and give up most freedoms for safety, while Locke thought government is limited and can be changed if it fails to protect rights.",
      answers: [
        [
          "full",
          "[[0|Locke said people have natural rights to life, liberty and property and that the government needs the consent of the people]]. [[1|The Declaration says that people have unalienable rights, including life and liberty, and that governments get their power from the consent of the governed]]. [[2|Hobbes said that without a strong ruler life would be chaos so people should give up most freedom for safety]]. [[3|The difference is that Locke thought government is limited and people can change it if it fails, but Hobbes thought the ruler needed strong power]].",
          "Full marks. You matched Locke to the language of the Declaration and set the two thinkers side by side.",
        ],
        [
          "full",
          "[[0|Locke believed in natural rights that exist before government and that people can replace a government that doesn't protect them]]. [[1|The Declaration does this when it lists grievances against the king and says people have a right to alter or abolish a government that violates their rights]]. [[2|Hobbes argued that people give up their freedom to a ruler to avoid a war of all against all]]. [[3|They differ because Locke made the people the judge of the government, while Hobbes made the ruler the guardian against chaos]].",
          "All four points. Using the Declaration's right to alter or abolish government is a strong link to Locke.",
        ],
        [
          "partial",
          "[[0|Locke said people have natural rights]]. [[1|The Declaration mentions rights too]]. Hobbes was different.",
          "A good start. Say what Hobbes believed, and explain the comparison clearly.",
        ],
        [
          "partial",
          "[[2|Hobbes thought people needed a strong ruler to avoid chaos]]. [[3|Locke thought people could replace bad rulers]].",
          "A clear comparison. Now explain Locke's ideas of natural rights and consent and connect them to the Declaration's words.",
          true,
        ],
        [
          "weak",
          "Locke wanted a king with total power and the Declaration agrees with that, because it was written for King George.",
          "Locke argued for limited government with the consent of the governed, which the Declaration uses against King George. Re-read the thinkers' ideas.",
        ],
        [
          "weak",
          "[[2|Hobbes believed in a strong ruler]]. Locke and Hobbes were the same because they both wrote in English.",
          "Hobbes's idea is right, but Locke and Hobbes disagreed about how much power a ruler should have. Compare their views.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Three answers to how we should govern, and how the branches check each other",
  note: `
## Objectives

Students will be able to:

1. describe how the Declaration, the Articles of Confederation and the Constitution each answered the question of how to govern;
2. explain how the Constitution sets up separation of powers and checks and balances, and how that has changed.

## Materials

Three one-page summary cards (Declaration, Articles, Constitution), a branch-and-check diagram with blank arrows, a set of twelve scenario cards ("The president vetoes a bill," "The Supreme Court strikes down a law," "The Senate rejects a nominee"), a short summary of two modern changes (executive orders and delegation to agencies), and the exit ticket.

## Starter (8 minutes)

Ask: "If a class of 30 had to decide on a field trip, what rules would you need so that one loud student couldn't decide for everyone?" Collect rules and relate them to limits on power.

## Main activity

1. Compare the three documents. Students fill in a table: purpose, structure, strengths, weaknesses. The Declaration (1776) explains why; the Articles (1781) created a weak national government; the Constitution (1787, effective 1789) created a stronger one with limits.
2. Draw the checks. Using the diagram, students draw arrows for checks: the president's veto, Congress's override, Senate confirmation of judges, judicial review, impeachment and removal. They then classify the 12 scenario cards by which branch acts on which.
3. Change over time. Discuss how modern practice differs from the text: presidents issue executive orders, Congress delegates rule-writing to agencies, and judges interpret the text in cases. Students decide whether each change strengthens or weakens the checks.

## Checking for understanding

Whiteboards: "Which branch checks the president's veto?" and "Name a check by the courts."

## Exit ticket

Choose one check and explain why it protects against abuse of power.
`,
  reading: [
    "Why, then how: the Declaration, the Articles and the Constitution",
    `
Three documents mark the first stages of American self-government, and each answers a different question. The **Declaration of Independence** of 1776 answered "why?" It explained why the colonies were separating from Britain, using the theory that governments exist to secure natural rights and rest on consent. It did not create a government. The **Articles of Confederation**, adopted in 1781, answered "how?" for the first time, but timidly. Fearing a repeat of British rule, the states created a "league of friendship" with a weak Congress and no president, no national courts and no power to tax. The result was a national government that could not raise money or settle disputes. In 1787 delegates met in Philadelphia and wrote a new plan, the **Constitution**, which took effect in 1789. It answered the question of how to build a government strong enough to function but limited enough to protect liberty.

The Constitution's main tool is **separation of powers**. Article I gives lawmaking to Congress, which has two houses, the House of Representatives and the Senate. Article II gives the job of carrying out laws to the president. Article III establishes the judicial branch, headed by the Supreme Court. Dividing these powers prevents any one person or group from making, enforcing and judging the law. The second tool is **checks and balances**, which lets each branch limit the others. The president can veto a bill, but Congress can override the veto with a two-thirds vote of both houses. The Senate must confirm the president's judges, ambassadors and cabinet. Congress can impeach and remove a president or a judge for "high crimes and misdemeanors": the House votes on charges, and the Senate holds the trial, where two thirds must vote to convict. Federal courts can strike down laws or actions that violate the Constitution, a power called **judicial review**. A third tool, **federalism**, divides power between the nation and the states.

The system has not stood still. The text does not mention political parties, yet parties now shape how Congress and the president interact. Presidents increasingly use **executive orders** and agreements to act without waiting for Congress, and Congress often passes broad laws that leave details to executive agencies, a practice called **delegation**. Critics say this weakens Congress's role and lets the president do too much. Defenders say complex modern problems need experts and quick action, and that Congress and the courts can still review what agencies do. The Supreme Court has also grown as a policymaker through its interpretations in landmark cases.

Students should resist a simple picture in which each branch acts alone. In practice, a law passes only when House, Senate and president agree, or when two thirds of Congress override a veto, and a new law can be challenged in court. Each step is a place where power can be slowed, checked or redirected. That friction is a feature of the design, not a flaw, though it can frustrate those who want fast action.
`,
  ],
  cards: [
    ["Articles of Confederation", "The first U.S. constitution, 1781, creating a weak national government without a president, courts or power to tax."],
    ["Separation of powers", "Dividing government into legislative, executive and judicial branches."],
    ["Checks and balances", "Powers that let each branch limit the others, such as the veto and judicial review."],
    ["Veto and override", "The president's power to reject a bill and Congress's power to pass it anyway with a two-thirds vote of both houses."],
    ["Impeachment", "The House's power to charge an official, and the Senate's power to try and remove, requiring two thirds."],
    ["Judicial review", "The courts' power to strike down laws and actions that violate the Constitution."],
    ["Executive order", "A directive from the president that manages the executive branch and has the force of law within it."],
    ["Delegation", "Congress giving executive agencies the job of filling in the details of a law."],
  ],
  closed: [
    [
      "Which of the three documents explained why the colonies were separating from Britain?",
      ["The Articles of Confederation", "The Declaration of Independence", "The Constitution", "The Bill of Rights"],
      "B",
    ],
    [
      "Congress passes a bill, the president vetoes it, and the House has 435 members. At least how many House votes are needed to override, if all members vote?",
      ["218", "261", "290", "335"],
      "C",
    ],
    [
      "Which action is an example of a check by the Senate on the president?",
      [
        "Writing a bill",
        "Refusing to confirm a nominee for a federal judge",
        "Vetoing a law",
        "Declaring a law unconstitutional",
      ],
      "B",
    ],
    [
      "Why do critics sometimes object to delegation to agencies?",
      [
        "It gives too much control to the Supreme Court",
        "It lets executive agencies make rules, which they say moves lawmaking away from Congress",
        "It increases the number of states",
        "It ends the presidency",
      ],
      "B",
    ],
    [
      "A federal court declares that a law violates the First Amendment. Which power is this?",
      ["Impeachment", "Veto", "Judicial review", "Executive order"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Compare the Articles of Confederation and the Constitution as answers to the question of how to govern. Give two differences and explain why the change was made.",
      scheme: [
        "Identifies a first difference, such as the Constitution creating an executive and courts while the Articles had none",
        "Identifies a second difference, such as the power to tax",
        "Explains a weakness of the Articles that led to the change",
        "Explains how the Constitution addressed the problem while limiting power",
      ],
      model:
        "The Articles had a Congress only, with no president or national courts, while the Constitution created three branches. Congress under the Articles could not tax, but under the Constitution it can. The change was made because the Articles left the national government too weak to pay its debts or settle disputes between states. The Constitution addressed this by giving the national government more power, while limiting it with separation of powers and checks and balances.",
      answers: [
        [
          "full",
          "[[0|The Articles had only a Congress, but the Constitution created a president and national courts too]]. [[1|Under the Articles Congress couldn't tax but under the Constitution it can]]. [[2|The change was made because the Articles left the government too weak to pay its debts and stop trouble like Shays' Rebellion]]. [[3|The Constitution gave it more power but limited that power by splitting it among three branches with checks]].",
          "Full marks. You named two differences and explained both the problem and the way the Constitution answered it.",
        ],
        [
          "full",
          "A difference is that [[0|the Articles had no executive branch to carry out laws and no national courts, and the Constitution has both]]. Another is that [[1|the Articles needed states to contribute money, while the Constitution lets Congress collect taxes]]. [[2|Leaders changed it because the national government couldn't deal with the debt or with disputes between states]]. [[3|The new government was stronger but its powers were separated so nobody could abuse them]].",
          "All four points. You explained the 'why' and the limits, which is the point of the question.",
        ],
        [
          "partial",
          "[[0|The Constitution created a president]], but the Articles didn't. The Articles were too weak.",
          "The difference is right. Add a second difference and explain what the weakness caused and how the Constitution fixed it.",
        ],
        [
          "partial",
          "[[1|Under the Articles Congress couldn't tax]] and [[2|that is why the government was too weak to pay debts]].",
          "Good on the cause of the change. Add a second difference and explain how the Constitution solved the problem while limiting power.",
          true,
        ],
        [
          "weak",
          "The Articles were stronger than the Constitution because they gave all the power to the national government.",
          "The Articles were weaker. They gave most power to the states. Compare what each document allowed the national government to do.",
        ],
        [
          "weak",
          "[[0|The Articles had no president]]. They were replaced because people wanted a king.",
          "Americans did not want a king. They wanted a stronger government with limits. Explain what problems the Articles had.",
        ],
      ],
    },
    {
      prompt:
        "Choose one check and balance (the veto, judicial review, Senate confirmation or impeachment). Explain how it works, why the framers wanted it, and one modern example or change in how it is used.",
      scheme: [
        "Accurately explains how the chosen check works",
        "Names the branch that uses it and the branch it limits",
        "Explains why the framers wanted it, relating to fear of concentrated power",
        "Gives a modern example or a change in practice",
      ],
      model:
        "The veto lets the president reject a bill passed by Congress, and Congress can override with a two-thirds vote in both houses. It lets the executive limit the legislature, and the override lets the legislature answer back. The framers wanted it because they feared that any one branch could dominate. A modern example is a president vetoing a spending bill, where Congress often lacks the two thirds to override.",
      answers: [
        [
          "full",
          "[[0|The veto lets the president reject a bill that Congress passed, and Congress can override with a two-thirds vote in both houses]]. [[1|It's the executive limiting the legislature, and the override lets Congress answer back]]. [[2|The framers wanted checks like this because they feared that any one branch might become too powerful, like the king was]]. [[3|Modern presidents veto bills fairly often, and usually Congress can't get two thirds to override, so the veto is strong]].",
          "Full marks. Your last sentence uses a modern fact to show the check's practical strength.",
        ],
        [
          "full",
          "[[0|Impeachment lets the House charge an official with high crimes and misdemeanors and the Senate holds a trial where two thirds must vote to remove]]. [[1|It's Congress checking the president and judges]]. [[2|The framers included it because they'd lived under a king who couldn't be removed, and wanted a way to remove officials who abuse power]]. [[3|A modern example is that presidents have been impeached by the House but not removed by the Senate, which shows how hard the two-thirds requirement is]].",
          "All four points. Using the removal threshold shows how the design makes the check hard to use.",
        ],
        [
          "partial",
          "[[0|The veto means the president can say no to a bill]]. [[1|Congress limited by the president]].",
          "Good start. Add the override, why the framers wanted it and a modern example.",
        ],
        [
          "partial",
          "[[2|The framers wanted judicial review because they feared one branch getting too strong]]. [[3|The Supreme Court has struck down laws]].",
          "Right reasons and example. Explain how judicial review works and which branches are involved.",
          true,
        ],
        [
          "weak",
          "A veto means Congress rejects the president's law, and the president can override it with a majority.",
          "It is the other way around. The president vetoes a bill from Congress, and Congress overrides with a two-thirds vote.",
        ],
        [
          "weak",
          "[[1|The Senate is limited by the president]]. Senate confirmation doesn't exist.",
          "The Senate does confirm nominees, which checks the president. Choose a check and describe it accurately.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Federalism and how the Constitution changes",
  note: `
## Objectives

Students will be able to:

1. describe federalism and how powers are divided and shared between the nation and the states;
2. explain the formal and informal ways the Constitution changes, including amendments and judicial interpretation.

## Materials

A three-column chart (delegated, reserved, concurrent powers), a set of 12 scenario cards (printing money, issuing driver's licenses, building highways, regulating schools, declaring war), a summary of McCulloch v. Maryland (1819) and South Dakota v. Dole (1987), an Article V flowchart, a table of the first few amendments with dates, calculators, and the exit ticket.

## Starter (8 minutes)

Ask: "In Ohio you can drive at 16 with a license, but a state can't print its own money. Who decides which is which?" Let students guess and list the principles they use.

## Main activity

1. Sort the scenario cards into delegated (national), reserved (state) and concurrent (both) powers. Debrief on the Supremacy Clause: when national and state law conflict, the national law wins if it is within the Constitution.
2. Cooperative federalism. Present the national minimum drinking age as a case: Congress cannot directly set it, but in 1984 tied a share of highway money to a state's age-21 law, and the Court upheld it in South Dakota v. Dole. Discuss how national money can shape state policy.
3. Changing the Constitution. Walk through Article V: an amendment is proposed by two thirds of both houses (290 of 435 in the House, 67 of 100 in the Senate) and ratified by three fourths of the states, which means 38 of 50. Compute these numbers. Contrast formal change with informal change by interpretation, such as McCulloch v. Maryland's holding that Congress has implied powers.

## Checking for understanding

Cold-call: "Is this power national, state or shared? Print money, set speed limits, collect taxes." Ask for the one-sentence reason.

## Exit ticket

Give one example of formal change and one of informal change to how the Constitution works.
`,
  reading: [
    "Dividing power between the nation and the states, and changing the rules",
    `
The Constitution divides power between the national government and the states, a system called **federalism**. Some powers are **delegated**, or enumerated, to the national government: it can coin money, declare war, make treaties, regulate trade among the states and with other nations, and run the post office. Other powers are **reserved** to the states by the Tenth Amendment, which says that powers not given to the national government nor forbidden to the states belong to the states or to the people. States run most police forces, license drivers and professions, run elections and set many rules for schools. Some powers are **concurrent**, meaning both levels hold them: both can tax, build roads and set up courts. When a national law and a state law conflict, the **Supremacy Clause** in Article VI makes the national law the "supreme Law of the Land," provided it is based on a power the Constitution gives.

The border between the two has always been argued over. In 1819, in *McCulloch v. Maryland*, Maryland tried to tax the national bank. The Supreme Court, led by Chief Justice John Marshall, held that Congress has implied powers under the Necessary and Proper Clause to do what is needed to carry out its listed powers, so it could create a bank. It also held that a state could not tax a national institution. The case expanded national power. In the other direction, in the 1990s the Court sometimes limited Congress's use of the Commerce Clause, holding in one case that Congress could not ban guns near schools under that power.

Today much of federalism works through money and cooperation. The national government gives states **grants** for highways, education and health care, and attaches conditions. The drinking age shows how this works. Congress could not directly set a state's drinking age, so in 1984 it told states that those without a minimum age of 21 would lose ten percent of certain federal highway money. States complied, and in *South Dakota v. Dole* (1987) the Court upheld the arrangement. Supporters say it lets the national government pursue a goal without ordering states. Critics say it can pressure states to give up choices that belong to them. States are also called "laboratories of democracy," because one can try a policy, such as a new education program, and others can copy it if it works.

The Constitution also changes, in two ways. **Formal change** happens through amendment under Article V. An amendment can be proposed by two thirds of both houses of Congress, 290 of 435 representatives and 67 of 100 senators, or by a convention called by two thirds of the states, a route never used. It must then be ratified by three fourths of the states, which means 38 of the 50. Only 27 amendments have succeeded. The high bar is meant to make changes rare and broadly supported. The 26th Amendment, lowering the voting age to 18, was ratified in 1971 in about three months, one of the quickest ever.

**Informal change** happens without altering the text. Courts reinterpret its words, as when the Supreme Court held that "equal protection of the laws" bars racial segregation in public schools in *Brown v. Board of Education* (1954). Presidents and Congress adopt new practices, such as the president's cabinet, which the Constitution only hints at. Custom, such as George Washington's decision to serve only two terms, shaped the presidency until the 22nd Amendment made it law in 1951. These informal changes let a document written in 1787 apply to modern life, though critics ask whether judges who stretch old words are making law.
`,
  ],
  cards: [
    ["Federalism", "A system that divides power between a national government and state governments."],
    ["Delegated (enumerated) powers", "Powers the Constitution gives to the national government, such as coining money and declaring war."],
    ["Reserved powers", "Powers left to the states by the Tenth Amendment, such as running schools and licensing drivers."],
    ["Concurrent powers", "Powers held by both levels, such as taxing and building roads."],
    ["Supremacy Clause", "Article VI's rule that the Constitution and valid national laws override conflicting state laws."],
    ["McCulloch v. Maryland (1819)", "The Court held Congress has implied powers and that states cannot tax the national bank."],
    ["Article V", "The Constitution's process for amendments: two thirds of Congress proposes, three fourths of the states ratify."],
    ["Informal change", "Change in how the Constitution works through court interpretation, custom or practice rather than amendment."],
  ],
  closed: [
    [
      "Which power belongs mainly to the national government?",
      ["Licensing drivers", "Running public schools", "Declaring war", "Setting a state's speed limit"],
      "C",
    ],
    [
      "A state law conflicts with a valid national law. According to the Supremacy Clause, which prevails?",
      ["The state law", "The national law", "The one passed first", "Whichever the governor prefers"],
      "B",
    ],
    [
      "How many states must ratify an amendment under Article V?",
      ["26", "34", "38", "50"],
      "C",
    ],
    [
      "In South Dakota v. Dole, how did Congress encourage states to adopt a drinking age of 21?",
      [
        "It ordered every state to change its law",
        "It tied a portion of federal highway money to the age requirement",
        "It amended the Constitution",
        "It made the president set the age",
      ],
      "B",
    ],
    [
      "Which is an example of informal change to the Constitution?",
      [
        "The 26th Amendment lowering the voting age to 18",
        "Brown v. Board of Education interpreting \"equal protection\" to ban school segregation",
        "Article V",
        "The Preamble",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain the difference between delegated, reserved and concurrent powers. Give one example of each from the Constitution or from everyday life in Ohio.",
      scheme: [
        "Accurately defines delegated powers with an example",
        "Accurately defines reserved powers with an example",
        "Accurately defines concurrent powers with an example",
        "Explains what happens when national and state law conflict, using the Supremacy Clause",
      ],
      model:
        "Delegated powers are those given to the national government by the Constitution, such as coining money. Reserved powers belong to the states, such as licensing drivers in Ohio. Concurrent powers are shared by both, such as taxing. If a valid national law and a state law conflict, the Supremacy Clause makes the national law supreme.",
      answers: [
        [
          "full",
          "[[0|Delegated powers are the ones the Constitution gives to the national government, like printing money or declaring war]]. [[1|Reserved powers belong to the states, like issuing driver's licenses in Ohio or running public schools]]. [[2|Concurrent powers are shared by both, like taxing people and building roads]]. [[3|If national and state laws conflict, the Supremacy Clause says the national law wins as long as it's valid]].",
          "Full marks. All three categories have an example, and you added what happens in a conflict.",
        ],
        [
          "full",
          "[[0|A delegated power is one listed for the federal government, for instance running the military or making treaties]]. [[1|A reserved power is left to the states by the Tenth Amendment, such as setting rules for marriage or police]]. [[2|A concurrent power is something both levels do, like collecting taxes and running courts]]. [[3|The Supremacy Clause in Article VI makes valid federal law the supreme law, so a conflicting state law loses]].",
          "All four points. Citing the Tenth Amendment and Article VI gives your answer proper grounding.",
        ],
        [
          "partial",
          "[[0|Delegated powers are for the national government, like coining money]]. [[1|Reserved powers are for the states]].",
          "You have two definitions. Add an example of a reserved power, a concurrent power and the Supremacy Clause.",
        ],
        [
          "partial",
          "[[2|Concurrent means both share it, like taxes]]. [[3|The national law wins in a conflict]].",
          "Both points are right. Define delegated and reserved powers with examples.",
          true,
        ],
        [
          "weak",
          "Delegated powers belong to the states and reserved powers belong to the national government.",
          "They are reversed. Delegated powers go to the national government and reserved powers to the states.",
        ],
        [
          "weak",
          "[[1|Reserved powers are for states]]. Concurrent powers are powers that don't exist anymore.",
          "Reserved powers are for states, which is right. Concurrent powers are shared and still exist, like taxing. Define all three.",
        ],
      ],
    },
    {
      prompt:
        "Compare formal and informal ways the Constitution changes. Use the amendment process with its numbers, and one example of informal change, and explain why the amendment process is intentionally hard.",
      scheme: [
        "Describes the proposal step with accurate numbers, such as two thirds of both houses",
        "Describes the ratification step with accurate numbers, such as 38 of 50 states",
        "Gives an accurate example of informal change and says how it works",
        "Explains why the process is intentionally hard, such as ensuring broad support",
      ],
      model:
        "To amend the Constitution, two thirds of both houses of Congress, 290 of 435 representatives and 67 of 100 senators, must propose an amendment. Three fourths of the states, 38 of 50, must ratify it. Informal change happens when courts reinterpret the text, as in Brown v. Board of Education, which held that equal protection bars school segregation. The process is hard so that changes have broad, lasting support and cannot be made by a narrow majority.",
      answers: [
        [
          "full",
          "[[0|Two thirds of both houses of Congress have to propose it, which is 290 of 435 in the House and 67 of 100 in the Senate]]. [[1|Then three fourths of the states have to ratify, which is 38 of 50]]. [[2|An informal change is when the Supreme Court interprets the words differently, like in Brown v. Board of Education where they said equal protection bans school segregation]]. [[3|It is hard on purpose so changes have broad support and a small majority can't just change the rules]].",
          "Full marks. Your numbers are right, and your Brown example shows interpretation changing meaning without a new amendment.",
        ],
        [
          "full",
          "[[0|An amendment needs a two-thirds vote in the House and the Senate to be proposed]]. [[1|After that, 38 states must approve it]]. [[2|An informal change is when presidents and Congress create customs like the cabinet, which the Constitution hardly mentions]]. [[3|The framers made it hard because they wanted the Constitution to be stable and for changes to be supported by a wide majority across the country]].",
          "All four points. The cabinet is a good example of change by practice.",
        ],
        [
          "partial",
          "[[0|Two thirds of Congress proposes an amendment]]. [[2|The Supreme Court can change meanings]].",
          "Good start. Give the ratification numbers, a specific example of informal change and why the process is hard.",
        ],
        [
          "partial",
          "[[1|38 states have to ratify it]] and [[3|it is hard so changes have broad support]].",
          "Both are right. Describe the proposal step with numbers and give an example of informal change.",
          true,
        ],
        [
          "weak",
          "An amendment just needs the president to sign it, and the Constitution can't be changed any other way.",
          "The president has no role in the amendment process, and the Constitution also changes informally. Review Article V and the examples.",
        ],
        [
          "weak",
          "[[3|The process is hard so nobody can ever change anything]]. Informal change is illegal.",
          "The process is hard but not impossible, as 27 amendments show. Informal change through interpretation is a normal part of how the Constitution works.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Congress, the presidency and how a bill becomes a law",
  note: `
## Objectives

Students will be able to:

1. describe the structure, powers and leadership of Congress and how a bill becomes law;
2. analyze the powers and the limits of the presidency and the executive branch.

## Materials

A flowchart of a bill's path with blank boxes, a Congress comparison table (House and Senate), a president's powers card set (formal and informal), a data sheet (435 House members, 100 senators, 15 Ohio House seats since 2022, 538 electoral votes, 17 for Ohio), a one-paragraph bill (teacher-written, a proposal for a school-zone speed rule) for a mock committee, and the exit ticket.

## Starter (8 minutes)

Ask: "A bill needs to pass the House and the Senate and be signed by the president. At how many points could it die?" Take guesses and list them as the class builds the flowchart.

## Main activity

1. Mock bill. In groups of four, students act as a committee considering the school-zone speed bill. They hold a hearing, amend it and vote. Then trace what would happen in the House (simple majority, 218 of 435), the Senate (51 of 100, though 60 to end a filibuster) and with the president (sign or veto, override with 290 and 67).
2. Compare the chambers. Students list differences: size, terms (2 and 6 years), age and residency (25 and 30), special powers (the House begins revenue bills and impeaches; the Senate confirms nominations and tries impeachments) and leadership (Speaker of the House, Senate Majority Leader and the Vice President as tiebreaker).
3. The presidency. Sort the president's powers into formal (veto, commander in chief, appointments, pardons, treaties) and informal (executive orders, setting the agenda, shaping public opinion). Then list limits: Congress's power of the purse, the courts, the 22nd Amendment's two-term limit, the War Powers Resolution of 1973. Compute: how many electoral votes are needed (270 of 538) and what share Ohio's 17 represents (about 3.2 percent).

## Checking for understanding

Whiteboards: name one power only the House has and one only the Senate has.

## Exit ticket

Name one formal power and one limit on the president, with the reason the limit exists.
`,
  reading: [
    "Two chambers, one signature and a president under limits",
    `
Article I of the Constitution gives the power to make laws to Congress, which has two chambers. The **House of Representatives** has 435 voting members, apportioned among the states by population, so a larger state such as Ohio, with 15 seats, has more representatives than a smaller one. Members serve two-year terms, must be at least 25 years old, and have the sole power to start bills that raise revenue and to impeach officials. The **Senate** has 100 members, two from each state regardless of size, who serve six-year terms and must be at least 30. The Senate confirms the president's nominees, approves treaties by a two-thirds vote and tries impeachments. The framers wanted a House close to the people and a smaller, slower Senate that would cool passions. Each chamber has its leaders. The House elects a Speaker, who is second in the line of presidential succession after the vice president. The Senate is led by the Vice President, who votes only to break ties, and by a Majority Leader chosen by the majority party.

Most work happens in **committees**, small groups of members that specialize in areas such as agriculture, armed services or education. A bill, which can be introduced by any member, is first sent to a committee, which holds hearings, amends it and votes on whether to send it on. If it passes the House with a simple majority, 218 votes if all 435 members vote, it goes to the Senate. There the rules of debate matter. A senator can talk a bill to death in a filibuster, and the Senate can end debate only by a "cloture" vote of 60 senators. If the two chambers pass different versions, a conference committee works out a single text. The final bill goes to the president, who can sign it, veto it, or, in some cases, let it become law without signing. Congress can override a veto with two thirds of each chamber, 290 representatives and 67 senators if all are present. Few bills survive the whole process. Of thousands introduced each Congress, only a small fraction become law.

Article II places the **executive power** in a president, who serves four-year terms and is limited to two by the 22nd Amendment of 1951. The president is chosen through the Electoral College, in which each state has as many electors as it has House members and senators combined. There are 538 electors in all, so a candidate needs 270 to win. Ohio has 17, about 3.2 percent of the total. The president's formal powers include acting as commander in chief of the armed forces, making treaties with the consent of two thirds of the Senate, nominating judges and officials, granting pardons for federal crimes, and signing or vetoing bills. Informal powers have grown: presidents issue executive orders, make executive agreements with other nations, set the political agenda and speak to the public in ways that shape the debate. The **bureaucracy**, which includes cabinet departments and agencies such as the Environmental Protection Agency, carries out the laws and employs millions of civilians. Its rules shape daily life, from food safety to highway standards.

The president's power is limited. Congress controls money and can refuse to fund programs, can override vetoes and can impeach. In 1973 it passed the War Powers Resolution, which requires the president to report to Congress within 48 hours of sending troops into combat and sets a 60-day limit without approval. Courts can block executive actions that exceed the president's authority. The Senate can reject nominees, and public opinion and the press can constrain a president too.

Together these details show a system that makes law slowly by design. A bill must pass three gates, committee, floor votes in two chambers and the president, and can be blocked at any one.
`,
  ],
  cards: [
    ["House of Representatives", "435 members apportioned by population, two-year terms, starts revenue bills and impeaches."],
    ["Senate", "100 members, two per state, six-year terms, confirms nominations, approves treaties and tries impeachments."],
    ["Committee", "A small group of members that studies bills in a particular area and decides whether to send them forward."],
    ["Filibuster and cloture", "A tactic to delay a Senate vote by extended debate, and the 60-vote motion to end it."],
    ["Veto override", "Passing a bill again over a presidential veto by two thirds of both houses."],
    ["Electoral College", "538 electors; a candidate needs 270 to win the presidency."],
    ["Executive order", "A presidential directive that manages the executive branch."],
    ["War Powers Resolution (1973)", "A law requiring the president to report troop deployments within 48 hours and limiting them to 60 days without approval."],
  ],
  closed: [
    [
      "Which power belongs only to the Senate?",
      [
        "Starting revenue bills",
        "Impeaching the president",
        "Confirming the president's nominees",
        "Choosing the Speaker",
      ],
      "C",
    ],
    [
      "Ohio has 17 electoral votes out of 538. About what percent is that?",
      ["About 1.7 percent", "About 3.2 percent", "About 17 percent", "About 31 percent"],
      "B",
    ],
    [
      "The Senate has 100 members. How many votes are needed for cloture to end a filibuster?",
      ["51", "60", "67", "75"],
      "B",
    ],
    [
      "Which is a limit on the president's power?",
      [
        "The president can issue pardons",
        "The 22nd Amendment limits a president to two elected terms",
        "The president is commander in chief",
        "The president can nominate judges",
      ],
      "B",
    ],
    [
      "Which is the correct order of a bill's path?",
      [
        "President, committee, House, Senate",
        "Committee, floor vote in one chamber, other chamber, president",
        "Senate, president, House, committee",
        "Supreme Court, House, Senate, president",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the path of a bill from introduction to becoming law, and identify two points where the bill could be stopped. Use at least four steps.",
      scheme: [
        "Describes introduction and committee review",
        "Describes passing one chamber and then the other (and resolving differences)",
        "Describes the president's options of signing or vetoing",
        "Names a first point where the bill could be stopped, with a reason",
        "Names a second point where it could be stopped, such as a filibuster or a veto not overridden",
      ],
      model:
        "A member introduces the bill, and it goes to a committee, which holds hearings and votes on whether to send it forward. It must then pass one chamber and the other, and a conference committee resolves differences. The president can sign or veto it. A bill can die in committee if the chair refuses to schedule it, or in the Senate through a filibuster if supporters cannot reach 60 votes. A vetoed bill dies unless two thirds of both chambers override it.",
      answers: [
        [
          "full",
          "[[0|A member introduces the bill and it goes to a committee that holds hearings and votes on whether to send it on]]. [[1|Then it has to pass the House and the Senate, and if they pass different versions a conference committee fixes it]]. [[2|The president can sign it or veto it]]. [[3|It could die in committee if the committee doesn't want to vote on it]]. [[4|It could also be stopped by a filibuster in the Senate if the supporters can't get 60 votes]].",
          "Full marks. You included each step and two realistic ways a bill can die.",
        ],
        [
          "full",
          "[[0|First it is introduced and sent to a committee, which studies it and votes]]. [[1|It must pass a majority in both the House and the Senate in the same form]]. [[2|Then the president either signs it or vetoes it]]. [[3|A bill can be killed in committee if the leaders won't schedule it]]. [[4|If the president vetoes it, it's dead unless two thirds of both houses override, which is hard to get]].",
          "All five points. Pointing to the two-thirds override as a place where a bill stops is accurate and shows how high the bar is.",
        ],
        [
          "partial",
          "[[0|A bill is introduced and goes to committee]]. [[2|Then the president signs it]].",
          "You skipped the floor votes in both chambers. Add them and name two places a bill could be stopped.",
        ],
        [
          "partial",
          "[[1|It passes the House and the Senate]] and [[4|a filibuster could stop it]].",
          "Good middle steps and one stopping point. Add introduction, committee, the president's options and another stopping point.",
          true,
        ],
        [
          "weak",
          "A bill starts with the president, then goes to the Supreme Court for approval and then Congress votes on it.",
          "Bills start in Congress, and the Supreme Court does not approve them in advance. Review the path through committee, both chambers and the president.",
        ],
        [
          "weak",
          "[[2|The president signs it]] and then it's a law. That's the whole process.",
          "The president signs at the end. First the bill goes through committee and both chambers. Describe the earlier steps.",
        ],
      ],
    },
    {
      prompt:
        "A student argues, \"The president has too much power.\" Use at least two formal or informal presidential powers and two limits on them to evaluate the claim, and state your own judgment.",
      scheme: [
        "Accurately describes a first formal or informal power",
        "Accurately describes a second power",
        "Accurately describes a first limit on presidential power",
        "Accurately describes a second limit",
        "States a clear judgment on the claim",
        "Supports the judgment with reasoning that weighs the powers against the limits",
      ],
      model:
        "The president has formal powers such as vetoing bills and commanding the armed forces, and informal powers such as issuing executive orders. But Congress can override a veto with two thirds of both houses and controls the money, the 22nd Amendment limits a president to two terms, and courts can block unlawful actions. I think the claim is partly true, because presidents have gained informal power, but the limits remain real, especially Congress's control of money and the courts' review.",
      answers: [
        [
          "full",
          "[[0|The president can veto bills and is commander in chief]]. [[1|Presidents also use executive orders, an informal power that lets them act without Congress]]. [[2|But Congress can override a veto with two thirds and control the budget]]. [[3|And the courts can block an executive order that goes beyond the president's authority]]. [[4|I think the claim is partly true]], because [[5|presidents have gained power over time through orders and agencies, but Congress and the courts still hold real limits, so the president isn't unlimited]].",
          "Full marks. You balanced the powers against the limits and reached a judgment that follows from both.",
        ],
        [
          "full",
          "[[0|Formal powers include nominating judges and granting pardons]]. [[1|An informal power is shaping the public agenda by giving speeches]]. [[2|Limits include the 22nd Amendment, which limits a president to two terms]]. [[3|The Senate can also refuse to confirm nominees and Congress can pass the War Powers Resolution to limit use of troops]]. [[4|I disagree that the president has too much power]]. [[5|The limits are real and presidents are often blocked, for example when Congress won't pass what they want or a court stops an order]].",
          "All six points. You took a clear position and used real checks to defend it.",
        ],
        [
          "partial",
          "[[0|The president can veto bills]] and [[2|Congress can override]]. I think the claim is true.",
          "A power and a limit. Add a second of each, and explain your judgment.",
        ],
        [
          "partial",
          "[[1|Executive orders are an informal power]] and [[3|courts can block them]]. [[4|The claim is false]].",
          "A power and a limit again. Give a second power and limit, and say why the claim is false.",
          true,
        ],
        [
          "weak",
          "The president can do anything because he's the president, and nobody can stop him, so the claim is totally right.",
          "Congress, the courts and the Constitution limit the president. Describe at least two limits.",
        ],
        [
          "weak",
          "[[0|The president can veto]]. The president has no power at all because Congress makes all decisions.",
          "The president has real powers, such as the veto and commander in chief. Describe powers and limits and weigh them.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "The federal courts, judicial review and the citizen's part",
  note: `
## Objectives

Students will be able to:

1. describe how the federal courts work and the role of judicial review in Marbury v. Madison;
2. analyze the role of citizens in the political system, including voting, serving and protesting;
3. analyze how personal interests and perspectives affect how people use civil rights and liberties.

## Materials

A diagram of the federal court system (94 district courts, 13 courts of appeals, the Supreme Court), a role-play script for Marbury v. Madison (teacher-written), a data sheet on voter turnout (about 66 percent of eligible citizens voting in the 2020 presidential election), perspective cards (four students with different interests in a school dress-code case), and the exit ticket.

## Starter (8 minutes)

Ask: "If two students disagree about whether a school rule is fair, who should decide, and how do we make sure the decider follows the rules too?" Draw out the idea of an independent referee bound by a higher rule.

## Main activity

1. Court system. Walk through the levels. District courts hold trials, courts of appeals review for legal errors, and the Supreme Court chooses its cases, usually when four of nine justices agree to hear one. Justices serve for life during good behavior, so they do not have to please voters.
2. Marbury v. Madison (1803). Role-play: William Marbury was named a justice of the peace by outgoing President Adams, but Secretary of State Madison did not deliver his commission. Chief Justice Marshall said Marbury had a right to it, but that the part of the Judiciary Act of 1789 giving the Court power to order it conflicted with the Constitution, so it was void. Students state why this established judicial review.
3. Citizens. Compute: if 66 percent of 240 million eligible voters voted, how many votes? (about 158 million). Discuss voting, jury service, running for office, protest and petition, and what each requires. Link to Ohio's rules: you must be 18 on Election Day and registered 30 days before it.
4. Perspective cards. Students decide how each person in the dress-code case would use free speech and equal-treatment rights and why interests differ.

## Checking for understanding

Whiteboards: "Which court hears the trial, and which reviews it for mistakes?" and "What did Marbury establish?"

## Exit ticket

Choose one way citizens take part in government and say what it asks of them.
`,
  reading: [
    "Judges, a famous case and what citizens do with their rights",
    `
The federal courts apply national law and the Constitution. At the base are **district courts**, where trials are held. There are 94 of them, and each has at least one in every state, such as the Southern District of Ohio in Columbus. Cases can be appealed to one of 13 **courts of appeals**, which review for legal errors and do not hold new trials. At the top is the **Supreme Court**, with nine justices who serve for life during good behavior. A justice is nominated by the president and confirmed by the Senate. Life tenure is meant to make judges independent, so they can decide a case on the law instead of on what is popular. The Court chooses most of its cases, generally agreeing to hear a case when four of the nine justices vote to do so, and it takes up only a small number out of thousands of requests each year.

The power of the Court to strike down laws is not written in the Constitution. It was established in *Marbury v. Madison* (1803). Before leaving office, President John Adams had appointed a number of judges, including William Marbury as a justice of the peace, but the new Secretary of State, James Madison, under President Jefferson, would not deliver Marbury's commission. Marbury asked the Supreme Court to order Madison to deliver it, relying on a section of the Judiciary Act of 1789. Chief Justice John Marshall, in a careful opinion, said Marbury had a right to the position and that the law gave a remedy, but that the section of the act allowing the Court to hear the case directly was not allowed by the Constitution, which sets out the cases the Court may hear first. Since the Constitution is the "supreme law," a law that conflicts with it cannot stand. The Court did not order the commission delivered, so Jefferson lost nothing in the immediate dispute, but the Court gained a lasting power: **judicial review**, the authority to decide whether laws and actions fit the Constitution.

A democracy also depends on what its citizens do. **Voting** is the most common act. In the 2020 presidential election about 66 percent of eligible citizens voted, which, of roughly 240 million eligible voters, is about 158 million people, the highest rate in over a century, yet a third stayed home. In Ohio a voter must be 18 on Election Day, be a citizen and register at least 30 days before. The 26th Amendment, ratified in 1971, set the voting age at 18 across the country. Citizens also serve on **juries**, which are drawn from voter and driver records. Citizens can run for office, from the school board to Congress, and can join political parties and interest groups. They can **petition** and **protest**, which the First Amendment protects, as long as they follow reasonable rules about time, place and manner. Civic life also includes less visible tasks, such as attending a city council meeting or helping a neighbor register.

People do not all use their rights the same way, because interests and perspectives differ. A student who wears a political button to school, a student who objects to a dress code that is enforced unevenly and a school administrator trying to keep order may all appeal to rights but weigh them differently. Someone who has felt unfairly treated by authorities may be quicker to protest or sue, while someone who has benefited from the system may focus on voting. Personal experience, income, age, race, religion, where one lives and one's trust in institutions all shape which rights feel most important. Recognizing that does not mean one view is right, but it helps explain why disputes over rights are so common and why courts, which must apply the same rules to all sides, play such a large role.
`,
  ],
  cards: [
    ["District court", "A federal trial court; there are 94, such as the Southern District of Ohio."],
    ["Court of appeals", "One of 13 federal courts that review trial decisions for legal errors."],
    ["Supreme Court", "The nation's highest court, with nine justices who serve for life during good behavior."],
    ["Rule of four", "The practice that the Court hears a case when four justices vote to take it."],
    ["Marbury v. Madison (1803)", "The case that established judicial review."],
    ["Judicial review", "The power of courts to decide whether laws and actions are constitutional."],
    ["26th Amendment", "Ratified in 1971; lowered the voting age to 18."],
    ["Time, place and manner", "Reasonable rules about when and where a protest may occur, which the government can set without banning the message."],
  ],
  closed: [
    [
      "In Marbury v. Madison, the Court held that:",
      [
        "Marbury must be given the job at once",
        "A part of the Judiciary Act of 1789 conflicted with the Constitution and so was void",
        "Presidents cannot appoint judges",
        "The Supreme Court has no powers",
      ],
      "B",
    ],
    [
      "Which court holds trials in federal cases?",
      ["Supreme Court", "Court of appeals", "District court", "Senate"],
      "C",
    ],
    [
      "About 66 percent of 240 million eligible voters voted in 2020. About how many votes were cast?",
      ["About 80 million", "About 120 million", "About 158 million", "About 240 million"],
      "C",
    ],
    [
      "Why do federal judges serve for life during good behavior?",
      [
        "To make them easy to remove",
        "To make them independent of public pressure and elections",
        "To ensure a young court",
        "To let presidents control them",
      ],
      "B",
    ],
    [
      "Which best explains why two people might use the same right differently?",
      [
        "Rights mean different things in different weeks",
        "Their interests and experiences shape which rights matter most to them",
        "Only one of them has rights",
        "Rights only apply to adults",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how Marbury v. Madison established judicial review. Describe what the case was about, what the Court decided, and why the decision gave the courts lasting power.",
      scheme: [
        "Describes the case: Marbury did not receive his commission",
        "States the Court's key reasoning, that a law conflicting with the Constitution is void",
        "States that the part of the Judiciary Act of 1789 was declared unconstitutional",
        "Explains why the decision gave courts a lasting power to review laws",
      ],
      model:
        "Marbury had been appointed a justice of the peace by Adams, but Madison did not deliver his commission. Marbury asked the Supreme Court to order it. Chief Justice Marshall said that the part of the Judiciary Act of 1789 giving the Court that power conflicted with the Constitution and was void, because the Constitution is the supreme law. This established judicial review, the courts' power to decide whether laws are constitutional, which the Court has used ever since.",
      answers: [
        [
          "full",
          "[[0|William Marbury was appointed a justice of the peace but Madison, the Secretary of State, wouldn't give him his commission]]. [[1|Marshall said a law that conflicts with the Constitution is void since the Constitution is the supreme law]]. [[2|The part of the Judiciary Act of 1789 that let the Court hear the case directly was declared unconstitutional]]. [[3|That gave the courts the lasting power of judicial review, which they've used to strike down laws ever since]].",
          "Full marks. Each part of the decision is accurate and ties to why it mattered.",
        ],
        [
          "full",
          "The case was about [[0|Marbury asking the Court to make Madison deliver the commission Adams had signed]]. [[1|Marshall reasoned that the Constitution is the highest law, so a law that goes against it can't be applied]]. [[2|He found that a section of the Judiciary Act of 1789 gave the Court a power the Constitution didn't allow]]. [[3|So the Court gained the power to review laws, even though Marbury didn't get his job]].",
          "All four points. Noting that Marbury did not get the job explains why the decision was both a loss for him and a win for the Court.",
        ],
        [
          "partial",
          "[[0|Marbury didn't get his commission]], and [[3|the Court got judicial review]].",
          "Two good points. Explain the Court's reasoning and which law was struck down.",
        ],
        [
          "partial",
          "[[1|The Constitution is the highest law so a law that conflicts is void]], and [[2|the Judiciary Act was unconstitutional]].",
          "Right reasoning. Describe what the case was about and why the decision gave the courts lasting power.",
          true,
        ],
        [
          "weak",
          "Marbury v. Madison is when the Supreme Court said the president had too much power and gave the power to Congress.",
          "The case did not reduce the president's power in that way. It established the courts' power to strike down laws that conflict with the Constitution.",
        ],
        [
          "weak",
          "[[0|Marbury wanted a job]]. Marshall gave him the job and that made the court powerful.",
          "Marbury wanted a job, which is right, but the Court did not give it to him. It struck down part of a law and established judicial review.",
        ],
      ],
    },
    {
      prompt:
        "Describe two ways citizens take part in government. For each, explain what it requires, and say how a person's interests or perspective might affect how they take part.",
      scheme: [
        "Accurately describes a first way citizens take part",
        "Explains what it requires or involves, such as age, registration or time",
        "Accurately describes a second way",
        "Explains what it requires or involves",
        "Explains how interests or perspective could affect how someone takes part",
      ],
      model:
        "One way is voting, which requires being 18 and a citizen and, in Ohio, registering at least 30 days before the election. Another is serving on a jury, which requires being called from voter and driver records and giving time to a trial. A person's perspective can affect how they take part: someone who feels the system treats them unfairly might be more likely to protest, while someone who trusts institutions may focus on voting or serving.",
      answers: [
        [
          "full",
          "[[0|One way is voting]]. [[1|It requires being 18, a citizen and registered, and in Ohio you have to register at least 30 days before the election]]. [[2|Another way is serving on a jury]]. [[3|It requires being called from voter or driver records and giving up time to sit through a trial]]. [[4|A person's interests affect this because someone who feels the system has treated them unfairly might protest more, while someone who trusts it might vote or serve instead]].",
          "Full marks. You included real requirements and connected perspective to the choice of how to take part.",
        ],
        [
          "full",
          "[[0|Citizens can protest and petition under the First Amendment]]. [[1|It requires following reasonable rules about time, place and manner, and it takes time and sometimes courage]]. [[2|Citizens can also run for office, like for school board]]. [[3|That requires meeting the age and residency rules, collecting signatures, and a lot of time]]. [[4|Someone with a strong personal stake, like a parent worried about a school closing, might be more likely to run or speak at a meeting than someone who isn't affected]].",
          "All five points. The example of a parent and a school closing shows how stakes shape participation.",
        ],
        [
          "partial",
          "[[0|Voting is one way]], [[1|and you have to be 18]]. Another is going to meetings.",
          "Good start on voting. Explain a second way and its requirements, and how perspective affects participation.",
        ],
        [
          "partial",
          "[[2|Jury service is a way to take part]] and [[4|different people use it differently because of their interests]].",
          "Good point on perspective. Add a first way with requirements, and requirements for jury service.",
          true,
        ],
        [
          "weak",
          "Citizens take part by paying taxes and nothing else, because government does everything else.",
          "Paying taxes is a duty, but citizens also vote, serve on juries, petition and protest. Describe two ways with their requirements.",
        ],
        [
          "weak",
          "[[0|Voting is how you take part]]. You can vote at any age and don't need to register.",
          "Voting is right. In Ohio you must be 18 and register 30 days before the election. Include real requirements.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "First Amendment cases and the rights of the accused",
  note: `
## Objectives

Students will be able to:

1. examine the First Amendment freedoms and landmark Supreme Court cases about speech and religion;
2. explain due process and the rights of the accused in the Fourth through Eighth Amendments.

## Materials

Case cards for Tinker v. Des Moines (1969), Brandenburg v. Ohio (1969), West Virginia v. Barnette (1943), Engel v. Vitale (1962), Mapp v. Ohio (1961), Gideon v. Wainwright (1963) and Miranda v. Arizona (1966), each with a facts-holding-reasoning outline (teacher-written), a chart of the Fourth to Eighth Amendments, scenario cards, and the exit ticket.

## Starter (8 minutes)

Pose: "A student wears an armband to school to protest a war. The principal says it will disrupt class. Whose side would you take, and what do you need to know?" Collect questions: Did it disrupt? What does the Constitution say?

## Main activity

1. Speech and religion. Using the case cards, groups state facts, holding and reasoning for Tinker (students keep free speech at school unless it substantially disrupts), Brandenburg v. Ohio (speech can be punished only if it is directed to producing imminent lawless action and is likely to do so), Barnette (students cannot be forced to salute the flag) and Engel (school-sponsored prayer violates the Establishment Clause). Note that Brandenburg began with a Ku Klux Klan rally in Hamilton County, Ohio.
2. Rights of the accused. Using the chart, students match scenarios to amendments: unreasonable searches (Fourth), self-incrimination and due process (Fifth), speedy public trial and a lawyer (Sixth), jury trial in civil cases (Seventh), excessive bail and cruel punishment (Eighth). Walk through Mapp v. Ohio (evidence from an unlawful search cannot be used in state court), Gideon (the state must provide a lawyer to those who cannot afford one in felony cases) and Miranda (police must warn suspects of their rights).
3. Apply. In pairs, students resolve two new scenarios by naming the amendment, the best-matching case and the likely result.

## Checking for understanding

Whiteboards: "Which case protects ___?" for four rights.

## Exit ticket

Choose one case and write what it decided in one sentence and why it matters to a student.
`,
  reading: [
    "Armbands, flags, a Cleveland search and the right to a lawyer",
    `
The First Amendment protects freedom of religion, speech, the press, assembly and petition, but none is absolute, and the Supreme Court has spent more than a century drawing lines.

In *Tinker v. Des Moines* (1969), students in Iowa were suspended for wearing black armbands to protest the Vietnam War. The Court held that students do not "shed their constitutional rights" at the schoolhouse gate, and that schools can limit student speech only if it would substantially disrupt the school or invade others' rights. In *West Virginia v. Barnette* (1943), the Court held that public schools cannot force students to salute the flag, because the First Amendment protects the right not to speak as well as to speak. A case from Ohio set the modern test for dangerous speech. In *Brandenburg v. Ohio* (1969), a Ku Klux Klan leader was convicted under a state law for a speech at a rally in Hamilton County. The Court struck down the law, ruling that the government may punish speech only when it is "directed to inciting or producing imminent lawless action" and is likely to do so. The case protected even offensive speech from punishment unless it crosses that line.

On religion, the First Amendment has two clauses. The Free Exercise Clause protects people's right to practice their religion. The Establishment Clause bars the government from establishing an official religion. In *Engel v. Vitale* (1962) the Court held that a school-led prayer, even a brief nondenominational one, violated the Establishment Clause when written by officials and led in public school. In *Wisconsin v. Yoder* (1972), the Court held that Amish families could not be required to send their children to school after eighth grade, because it burdened their religious practice. Together these cases show a balance between not endorsing religion and not punishing it.

The Fourth through Eighth Amendments protect people who are accused of crimes, and they are the heart of **due process**, the principle that the government must follow fair procedures before taking a person's life, liberty or property. The **Fourth Amendment** bars unreasonable searches and seizures and generally requires a warrant based on probable cause. In *Mapp v. Ohio* (1961), Cleveland police forced their way into Dollree Mapp's home looking for a suspect and found obscene materials. The Court held that evidence gathered through an unlawful search cannot be used in a state criminal trial, a rule called the **exclusionary rule**. The **Fifth Amendment** protects against being forced to testify against yourself and guarantees due process. The **Sixth Amendment** guarantees a speedy, public trial by an impartial jury and the right to a lawyer. In *Gideon v. Wainwright* (1963), Clarence Gideon, a poor man accused of a felony in Florida, had to defend himself because the state did not provide a lawyer. The Court held that states must appoint lawyers for those who cannot afford one in serious cases. In *Miranda v. Arizona* (1966), the Court held that police must tell suspects before questioning that they may remain silent and have a lawyer. The **Seventh Amendment** preserves jury trials in many civil cases, and the **Eighth Amendment** bans excessive bail, excessive fines and cruel and unusual punishments.

These cases are good examples of how rights are real only if the courts enforce them. They also show the tension at the center of the topic: the same Constitution that protects the freedom to say unpopular things and the rights of those accused of crimes also asks courts to weigh those freedoms against safety and order.
`,
  ],
  cards: [
    ["Tinker v. Des Moines (1969)", "Students may wear armbands to protest unless it would substantially disrupt school."],
    ["Brandenburg v. Ohio (1969)", "Speech may be punished only if directed to and likely to produce imminent lawless action."],
    ["West Virginia v. Barnette (1943)", "Public schools cannot force students to salute the flag."],
    ["Engel v. Vitale (1962)", "School-led prayer in public schools violates the Establishment Clause."],
    ["Due process", "The requirement that government follow fair procedures before taking a person's life, liberty or property."],
    ["Mapp v. Ohio (1961)", "Evidence from an unlawful search cannot be used in state court (the exclusionary rule)."],
    ["Gideon v. Wainwright (1963)", "States must provide a lawyer to defendants who cannot afford one in serious cases."],
    ["Miranda v. Arizona (1966)", "Police must warn suspects of their right to silence and to a lawyer before questioning."],
  ],
  closed: [
    [
      "A school suspends a student for a quiet armband protest that disrupts nothing. Under Tinker, the suspension is probably:",
      [
        "Allowed, because schools can ban any speech",
        "Unconstitutional, because the speech did not substantially disrupt school",
        "Allowed if the principal dislikes the message",
        "Required by law",
      ],
      "B",
    ],
    [
      "Brandenburg v. Ohio set what standard for punishing speech?",
      [
        "Speech that is unpopular",
        "Speech that is directed to inciting imminent lawless action and likely to do so",
        "Any speech that offends someone",
        "Speech in a public place",
      ],
      "B",
    ],
    [
      "Police search a home without a warrant and find evidence. Under Mapp v. Ohio, what happens?",
      [
        "The evidence is admitted anyway",
        "The evidence generally cannot be used in a criminal trial",
        "The homeowner is automatically convicted",
        "The police are exempt",
      ],
      "B",
    ],
    [
      "Which case guaranteed a lawyer for people who cannot afford one in serious criminal cases?",
      ["Tinker v. Des Moines", "Gideon v. Wainwright", "Engel v. Vitale", "Barnette"],
      "B",
    ],
    [
      "Which amendment bans excessive bail and cruel and unusual punishments?",
      ["Fourth", "Fifth", "Sixth", "Eighth"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Choose one case about speech or religion (Tinker, Brandenburg, Barnette or Engel). State the facts, the Court's decision, and explain how it affects the rights of students or citizens today.",
      scheme: [
        "Accurately states the key facts of the case",
        "Accurately states the Court's holding",
        "Explains the Court's reasoning",
        "Explains how it affects rights of students or citizens today",
      ],
      model:
        "In Tinker v. Des Moines (1969), students were suspended for wearing black armbands to protest the Vietnam War. The Court held that the school could not punish them because the protest did not substantially disrupt school. The Court reasoned that students and teachers do not lose their constitutional rights at the schoolhouse gate. Today, students can express opinions at school, such as wearing a button or an armband, unless it substantially disrupts the school or violates others' rights.",
      answers: [
        [
          "full",
          "[[0|In Tinker some students in Iowa wore black armbands to school to protest the Vietnam War and were suspended]]. [[1|The Court said the school couldn't punish them because the protest was quiet and didn't disrupt anything]]. [[2|The reasoning was that students don't shed their constitutional rights at the schoolhouse gate]]. [[3|Today students can wear things like political buttons as long as it doesn't substantially disrupt school]].",
          "Full marks. You gave the facts, the holding, the reasoning and today's effect.",
        ],
        [
          "full",
          "In Barnette, [[0|Jehovah's Witness students in West Virginia refused to salute the flag and were punished]]. [[1|The Court ruled that public schools can't force students to salute]]. [[2|It said the First Amendment protects the right not to speak as well as to speak, and that the government shouldn't force a belief]]. [[3|Today a student can sit out the Pledge of Allegiance and can't be punished for it]].",
          "All four points. Your explanation of the right not to speak is the heart of this case.",
        ],
        [
          "partial",
          "[[0|In Tinker students wore armbands]]. [[1|The Court said they could]].",
          "Good outline. Explain the reasoning and how the case affects students now.",
        ],
        [
          "partial",
          "[[2|The Court said students keep their rights at school]], and [[3|this means students can speak at school today]].",
          "Right reasoning and effect. State the facts of the case and the decision.",
          true,
        ],
        [
          "weak",
          "In Tinker the Court said schools can ban any speech they want because they are in charge of the students.",
          "That is the opposite of the ruling. The Court said students keep free speech unless it substantially disrupts school.",
        ],
        [
          "weak",
          "[[0|Some students wore armbands]]. It was in 1999 and about a school shooting.",
          "The armband case was in 1969 and about the Vietnam War. Check the case card for the facts.",
        ],
      ],
    },
    {
      prompt:
        "A police officer stops a car, searches the trunk without a warrant or any reason to suspect a crime, and finds stolen goods. The driver is arrested and later questioned without being told of any rights, and cannot afford a lawyer. Identify at least three rights at issue, name the case that supports each, and explain what the courts' rules mean for this case.",
      scheme: [
        "Identifies the Fourth Amendment issue with the unlawful search",
        "Names Mapp v. Ohio and the exclusionary rule and explains the result for the evidence",
        "Identifies the Miranda warning issue and names the case",
        "Identifies the right to a lawyer and names Gideon v. Wainwright",
        "Explains what the rules mean overall for how the case might proceed",
      ],
      model:
        "The search of the trunk without a warrant or reason raises the Fourth Amendment's protection against unreasonable searches. Under Mapp v. Ohio, evidence from an unlawful search generally cannot be used in court, so the stolen goods may be excluded. The questioning without warnings raises the Fifth Amendment right against self-incrimination, as in Miranda v. Arizona, so statements might be excluded. Because the driver cannot afford a lawyer, Gideon v. Wainwright requires that a lawyer be appointed if the charge is serious. Together these rules could weaken the prosecution's case, though the details would depend on the facts.",
      answers: [
        [
          "full",
          "[[0|The search without a warrant or a reason is an unreasonable search, which the Fourth Amendment forbids]]. [[1|Under Mapp v. Ohio the stolen goods likely can't be used as evidence because of the exclusionary rule]]. [[2|The questioning without telling the driver their rights breaks the Miranda rule, so the statements might be thrown out]]. [[3|Under Gideon v. Wainwright the court has to give the driver a lawyer if they can't afford one for a serious charge]]. [[4|So the prosecution might lose much of its case, though it would depend on the facts, like whether the police had a reason for the search]].",
          "Full marks. You tied each rule to the case and recognized that the result depends on the facts.",
        ],
        [
          "full",
          "[[0|The Fourth Amendment protects against unreasonable searches, and a trunk search with no warrant or cause may violate it]]. [[1|Mapp v. Ohio set the exclusionary rule so the stolen goods can't be used in court]]. [[2|Miranda v. Arizona says police have to warn suspects of the right to remain silent before questioning, so what the driver said could be excluded]]. [[3|Gideon v. Wainwright says the state has to provide a lawyer for those who can't afford one]]. [[4|So the driver's lawyer could ask the judge to throw out the evidence and the statements, which could end the case, but police might argue an exception applied]].",
          "All five points. Noting that police could argue an exception shows you know the rules have limits.",
        ],
        [
          "partial",
          "[[0|The search was unreasonable under the Fourth Amendment]], and [[1|Mapp v. Ohio says the evidence is excluded]].",
          "Good on the search. Add the Miranda issue, the right to a lawyer with case names, and what it means for the case.",
        ],
        [
          "partial",
          "[[2|Miranda says they have to warn about the right to be silent]] and [[3|Gideon says a lawyer should be provided]].",
          "These two are right. Add the Fourth Amendment and Mapp issue and explain what the rules mean overall.",
          true,
        ],
        [
          "weak",
          "None of this matters because the driver had stolen goods, so the police did the right thing and everything counts.",
          "The Constitution's protections apply even to people who may be guilty. Look at the search, the warnings and the lawyer.",
        ],
        [
          "weak",
          "[[0|The search might be a problem]]. The case is Brandenburg v. Ohio and the driver gets his speech back.",
          "Brandenburg is about speech, not searches. Review which case governs each issue.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "The Fourteenth Amendment, and judging a news report against a government source",
  note: `
## Objectives

Students will be able to:

1. explain how the Fourteenth Amendment has been used to apply the Bill of Rights to the states;
2. evaluate a news report and a government source on the same issue for credibility and bias.

## Materials

A timeline of incorporation (Gitlow 1925, Near 1931, Mapp 1961, Gideon 1963), a summary of the Fourteenth Amendment's key clauses (citizenship, due process, equal protection, ratified 1868), a summary of Plessy v. Ferguson (1896) and Brown v. Board of Education (1954), two teacher-written model sources about the same monthly jobs report (a government release stating the unemployment rate moved from 4.0 to 4.2 percent, and a news story headlined "Jobless rate jumps"), a source-comparison checklist, and the exit ticket.

## Starter (8 minutes)

Ask: "The First Amendment says 'Congress shall make no law.' Does that stop your state or your school district from limiting speech?" Take answers and note that for over a century the Bill of Rights limited only the national government.

## Main activity

1. Incorporation. Explain that after the Civil War the Fourteenth Amendment told the states they could not deprive any person of life, liberty or property without due process, or deny equal protection of the laws. Over time the Court used the due process clause to apply, or incorporate, most of the Bill of Rights to the states, one right at a time: free speech (Gitlow, 1925), the exclusionary rule (Mapp, 1961) and the right to a lawyer (Gideon, 1963). Students match each case to a right and to the year.
2. Equal protection. Contrast Plessy v. Ferguson (1896), which allowed "separate but equal," with Brown v. Board of Education (1954), which held that separate schools were inherently unequal.
3. Source comparison. Students read the two jobs-report sources and fill in a checklist: who made it, what is its purpose, what does it say, what does it leave out? They compute the change: 4.0 to 4.2 is 0.2 percentage points, or a 5 percent relative increase. They then judge which headline wording is fair.

## Checking for understanding

Whiteboards: "Which amendment made states follow the Bill of Rights?" and "One question to ask of any news story."

## Exit ticket

Write a fair, one-sentence headline for the jobs report, and say what source you would check next.
`,
  reading: [
    "Making the states follow the Bill of Rights, and reading the news carefully",
    `
When the Bill of Rights was ratified in 1791, it limited only the national government. In *Barron v. Baltimore* (1833), the Supreme Court held that the Fifth Amendment did not stop a city from taking property without paying. A state could in theory restrict speech or search homes without the protections of the first ten amendments.

The Civil War changed this. After the abolition of slavery by the 13th Amendment, Congress proposed the **Fourteenth Amendment**, ratified in 1868. It says that all persons born or naturalized in the United States are citizens, and it forbids any state from depriving a person of life, liberty or property "without due process of law," or from denying any person "the equal protection of the laws." These clauses were aimed at laws that denied freed people their rights, but their language is broad. At first the Court read the amendment narrowly. Beginning in the 1920s, it began to use the Due Process Clause to apply specific rights in the Bill of Rights to the states, a process called **selective incorporation**. In *Gitlow v. New York* (1925) the Court said, in an opinion that upheld Gitlow's conviction but assumed freedom of speech applies to the states, that First Amendment freedoms are protected from state action. In *Mapp v. Ohio* (1961), the Court applied the exclusionary rule to the states, and in *Gideon v. Wainwright* (1963), the right to a lawyer. By now nearly all the major protections of the Bill of Rights have been incorporated. This is why a student at a public school in Ohio can invoke the First Amendment against the school district, even though the amendment speaks only of Congress.

The **Equal Protection Clause** has also reshaped American life. In *Plessy v. Ferguson* (1896), the Court upheld a Louisiana law requiring separate railroad cars for Black and white passengers, finding that "separate but equal" facilities did not violate the Fourteenth Amendment. For half a century segregation was legal across much of the country. In *Brown v. Board of Education* (1954), the Court reversed course and held that separate public schools for Black and white children are inherently unequal. Chief Justice Earl Warren wrote that separating children by race creates a sense of inferiority. The ruling was a landmark of informal constitutional change, and it was followed by the civil rights laws of the 1960s.

A citizen's own work includes judging the information she receives about government. A **government source**, such as a Bureau of Labor Statistics release, usually gives raw figures and definitions, which is valuable, but it presents what the agency chooses to emphasize, and a political appointee may influence its framing. A **news report** puts the figures in context, adds interviews and may help a reader understand what they mean, but it also has an angle, a headline written to attract readers and limits of space. Suppose the government reports that unemployment rose from 4.0 to 4.2 percent. That is a rise of 0.2 percentage points, or a 5 percent relative increase. A headline that says "Jobless rate jumps" suggests a larger change than the number justifies, while a headline that says "Unemployment holds near historic lows" may understate a change. To compare sources, ask who made it, what its purpose is, what it leaves out and whether another source confirms it. Reading laterally, by leaving the page and checking what others say about the source, is often faster and more reliable than staring at a single page.

Credibility is not all or nothing. A source with a viewpoint can still be accurate, and a source that claims neutrality can mislead by what it omits.
`,
  ],
  cards: [
    ["Fourteenth Amendment", "Ratified in 1868; grants citizenship and bars states from denying due process or equal protection."],
    ["Selective incorporation", "The process by which the Court applied most Bill of Rights protections to the states one at a time."],
    ["Gitlow v. New York (1925)", "The Court assumed that free speech applies to the states."],
    ["Equal Protection Clause", "The requirement that states treat people in similar situations equally under the law."],
    ["Plessy v. Ferguson (1896)", "The Court upheld \"separate but equal\" racial segregation."],
    ["Brown v. Board of Education (1954)", "The Court held that segregated public schools are inherently unequal."],
    ["Lateral reading", "Checking what other sources say about a source before trusting it."],
    ["Percentage points versus percent", "A change from 4.0 to 4.2 percent is 0.2 percentage points, but a 5 percent relative increase."],
  ],
  closed: [
    [
      "Originally, the Bill of Rights restricted which government?",
      ["State governments only", "The national government", "City governments only", "All governments"],
      "B",
    ],
    [
      "How did the Supreme Court apply Bill of Rights protections to the states?",
      [
        "By amending the Constitution itself",
        "By using the Fourteenth Amendment's Due Process Clause, one right at a time",
        "By asking Congress to pass a law",
        "By ignoring the Bill of Rights",
      ],
      "B",
    ],
    [
      "The unemployment rate moves from 4.0 to 4.2 percent. By how many percentage points did it rise?",
      ["0.02", "0.2", "2", "4.2"],
      "B",
    ],
    [
      "Which decision overturned the idea of \"separate but equal\" in public schools?",
      ["Plessy v. Ferguson", "Gitlow v. New York", "Brown v. Board of Education", "Mapp v. Ohio"],
      "C",
    ],
    [
      "Which is the best step in lateral reading?",
      [
        "Reading the same article twice",
        "Opening new tabs to see what other sources say about the website",
        "Believing the first search result",
        "Counting the ads on the page",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the Fourteenth Amendment made the Bill of Rights apply to state governments. Include what the amendment says, how the Court used it, and one example case.",
      scheme: [
        "Accurately states a relevant clause, such as due process or equal protection",
        "Explains that the Bill of Rights originally limited only the national government",
        "Explains how the Court used the Due Process Clause to apply rights to the states one at a time",
        "Gives an accurate example case and the right it applied",
      ],
      model:
        "The Fourteenth Amendment, ratified in 1868, says that no state may deprive a person of life, liberty or property without due process of law. The Bill of Rights originally limited only the national government. Beginning in the 1920s, the Supreme Court used the Due Process Clause to apply, or incorporate, specific rights to the states one at a time. For example, in Mapp v. Ohio in 1961 the Court applied the exclusionary rule to state courts.",
      answers: [
        [
          "full",
          "[[0|The Fourteenth Amendment says that states can't take away life, liberty or property without due process]]. [[1|The Bill of Rights at first only limited the national government]]. [[2|The Supreme Court started using the due process clause to apply different rights to the states, one right at a time]]. [[3|An example is Gideon v. Wainwright in 1963, which applied the right to a lawyer to state courts]].",
          "Full marks. Each part is accurate and the example matches the process you described.",
        ],
        [
          "full",
          "[[0|The Equal Protection Clause and Due Process Clause of the 14th Amendment limit what states can do]]. [[1|Before that the Bill of Rights only applied to the federal government, as in Barron v. Baltimore]]. [[2|Starting in the 1920s the Court said that most rights in the Bill of Rights were part of due process, and it incorporated them selectively]]. [[3|In Mapp v. Ohio in 1961 the Court said evidence from an illegal search can't be used in state courts]].",
          "All four points. Citing Barron v. Baltimore shows you know where the problem started.",
        ],
        [
          "partial",
          "[[0|The Fourteenth Amendment has a due process clause]]. [[1|The Bill of Rights was only for the federal government]].",
          "Two accurate points. Explain how the Court used the clause and give an example case.",
        ],
        [
          "partial",
          "[[2|The Court applied rights to the states one at a time]], like [[3|Gideon, the right to a lawyer]].",
          "Good process and example. State what the amendment says and that the Bill of Rights originally limited only the national government.",
          true,
        ],
        [
          "weak",
          "The Fourteenth Amendment ended slavery and that's how the Bill of Rights got applied to the states.",
          "The 13th Amendment ended slavery. The 14th Amendment's due process and equal protection clauses are what the Court used to apply the Bill of Rights to the states.",
        ],
        [
          "weak",
          "[[1|The Bill of Rights was only for the national government]]. The Court never changed that, so states can ignore it.",
          "The Court did change it. Through the Fourteenth Amendment, most Bill of Rights protections now bind the states. Explain the process.",
        ],
      ],
    },
    {
      prompt:
        "A government report says unemployment rose from 4.0 to 4.2 percent. A news headline says, \"Jobless rate jumps.\" Evaluate both sources. Calculate the change, and say what each source does well, what each might leave out, and how you would check the claim.",
      scheme: [
        "Calculates the change correctly (0.2 percentage points, or a 5 percent relative increase)",
        "Explains what the government source does well, such as giving the exact figures",
        "Explains a limit or possible bias of the government source",
        "Explains what the news headline does or leaves out, noting that \"jumps\" overstates a small change",
        "Describes a way to check or compare, such as lateral reading or another independent source",
      ],
      model:
        "The unemployment rate rose 0.2 percentage points, from 4.0 to 4.2 percent, which is a 5 percent relative increase. The government report gives the exact figures and definitions, but it presents what the agency chooses to emphasize. The headline \"jumps\" suggests a large change when the rise is small, and a headline can leave out context such as the long-term trend. I would check by reading other sources, such as economists' comments, and by looking at the trend over several months.",
      answers: [
        [
          "full",
          "[[0|The rate went up 0.2 percentage points, which is a 5 percent increase from 4.0]]. [[1|The government report is good because it gives the exact numbers and how they were measured]]. [[2|A limit is that the government might frame things to look good, and it doesn't explain what it means for people]]. [[3|The headline 'jumps' makes a small change sound huge and leaves out the trend over time]]. [[4|I'd check by reading other sources and looking at what the numbers have done over several months]].",
          "Full marks. You computed the change both ways and compared the strengths and limits of each source.",
        ],
        [
          "full",
          "[[0|From 4.0 to 4.2 is a rise of 0.2 percentage points]]. [[1|The BLS release is useful because it has the actual statistics and it's the original source]]. [[2|It could have a bias in what it highlights, since agency leaders are appointed]]. [[3|The news story helps explain the context but 'jumps' is exaggerating a small change, because the rise is tiny]]. [[4|To check I'd do lateral reading by opening other sites that report the same figure and see if they agree, including an economist's comment]].",
          "All five points. Lateral reading is exactly the method to use here.",
        ],
        [
          "partial",
          "[[0|It went up 0.2 percentage points]]. [[3|The headline is overreacting]].",
          "Good. Add what the government source does well and where it could be limited, and how you would check.",
        ],
        [
          "partial",
          "[[1|The government report gives the real numbers]] and [[4|I would check other sources too]].",
          "Good start. Calculate the change, explain the limits of both sources and say what the headline leaves out.",
          true,
        ],
        [
          "weak",
          "The government report is always right and the news is always wrong, so there's nothing to check.",
          "Neither is automatically right or wrong. Each has strengths and limits. Compare them and describe a way to check.",
        ],
        [
          "weak",
          "It went up by 4.2 percentage points so the headline is exact.",
          "The rate rose from 4.0 to 4.2, which is 0.2 percentage points. Subtract the two figures, then evaluate the wording of the headline.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Making a public case and taking one civic step",
  note: `
## Objectives

Students will be able to:

1. present an argument on a public issue to an audience, with attention to counterarguments;
2. assess options for individual and group action on a local issue and take one step.

## Materials

An issue brief on a local issue (a proposed crosswalk and 20 mph limit near a school on a busy Columbus street, written by the teacher with city traffic figures: 4,000 cars a day, 12 near-misses reported in a year), an argument planner (claim, two reasons, evidence, counterargument, rebuttal), a presentation rubric, a list of civic actions (speak at a public meeting, write to a council member, join or form a group, sign or organize a petition, vote or register others), and the exit ticket.

## Starter (8 minutes)

Ask: "Think of something near school that you would change if you could. Who has the power to change it, and how would you reach them?" Collect issues and decision makers.

## Main activity

1. Build the argument. With the planner, students take a side on the issue brief. Each writes a claim, two reasons with evidence from the brief, one counterargument and a rebuttal. They practice phrases that acknowledge the other side without caving: "Opponents argue ... This is a fair concern, but ..."
2. Present and respond. In groups of four, each student gives a 90-second presentation. Listeners restate the argument and add one question or counterargument. The presenter responds.
3. Options for action. Students compare options for acting on the issue, using the list. For each they estimate cost, time, likely impact and who needs to act. Calculation: if a petition needs 50 signatures from residents and each volunteer can collect 8 in a week, how many volunteers are needed? (7.)
4. Take one step. Each student chooses one action to take that week, such as emailing the council member, drafting a comment for a public meeting or registering to vote, and writes a short plan.

## Checking for understanding

Pairs trade planners and underline the weakest piece of evidence and the strongest counterargument.

## Exit ticket

Write the one step you will take, who you will contact, and by what date.
`,
  reading: [
    "From opinion to argument to action",
    `
A public argument does more than state a preference. It makes a **claim**, gives **reasons** supported by **evidence**, and deals honestly with **counterarguments**. Suppose the question is whether a city should lower the speed limit to 20 miles per hour on a busy street beside a school. A weak argument says, "It's dangerous, so do it." A stronger one says: "The city should lower the limit near Yellow View High School, because 12 near-misses were reported there last year, and because a pedestrian struck at 20 miles per hour is far more likely to survive than one struck at 35. Opponents say it will slow commuters. But the slowdown is about a minute over two blocks, a small cost compared with a child's safety."

Notice the parts. The claim says what should happen. The reasons answer why. The evidence is specific: a number from reports, a fact about speeds. The counterargument names the best objection, and the rebuttal answers it with reasoning rather than dismissing it. Audiences trust speakers who show they understand the other side. A good speaker also adapts to the audience: a city council cares about budget, safety and legal responsibility, while neighbors care about parking and noise.

Presenting is a skill. Lead with the claim, so listeners know where you are going. Use two or three strong points rather than ten weak ones. Use a number or a short story to make a point stick, and speak slowly enough to be followed. When someone challenges you, restate their point before answering, and admit what you do not know.

After deciding what to say, a citizen has to decide how to act. **Individual** actions include writing to an elected official, speaking at a public meeting, registering to vote and voting, and starting a conversation with neighbors. **Group** actions include joining an existing organization, forming a student group, organizing a petition, and building a coalition with others, such as parents, local businesses or a neighborhood association. Each option has a different cost and reach. An email takes ten minutes and may be one of many. A petition takes weeks but shows how many people care. A public comment at a council meeting takes preparation and a few minutes of speaking time, but it creates a public record. Because many decisions are made at the local level, where few people participate, a small number of informed residents can have a real effect.

Planning helps. A petition that needs 50 resident signatures, with volunteers collecting 8 each in a week, needs seven volunteers, which is an easy calculation that tells you how to recruit. Good plans name the decision-maker, the specific request, the date of the next meeting or vote and the evidence to bring. They also consider obstacles, such as budget, existing laws or opposition, and ask who else might support the request.

Taking one step turns learning into practice. It need not be large: sending a message to a council member's office, drafting two minutes of public comment, or registering at a school voter drive are all real civic acts. The skill of building an argument and the habit of taking action reinforce each other, because acting reveals how decisions are really made and which arguments persuade.
`,
  ],
  cards: [
    ["Claim", "A statement of what should be done or believed."],
    ["Reason and evidence", "A reason says why; evidence is the fact, number or example that supports it."],
    ["Counterargument", "The best objection to your claim, which a strong argument names fairly."],
    ["Rebuttal", "Your reasoned reply to the counterargument."],
    ["Public comment", "A period at a government meeting when residents may address the officials."],
    ["Petition", "A signed request to government, which shows how many people share a concern."],
    ["Coalition", "A group of different organizations or people working together on a goal."],
    ["Decision-maker", "The official or body with the power to grant what you ask for."],
  ],
  closed: [
    [
      "Which sentence is the strongest piece of evidence for a 20 mph limit near a school?",
      [
        "It would be nice for kids",
        "Twelve near-misses were reported near the school last year",
        "Everyone knows it's safer",
        "Cars should go slower in general",
      ],
      "B",
    ],
    [
      "A speaker says, \"Opponents are wrong and foolish.\" What is the best improvement?",
      [
        "Repeat it more loudly",
        "Name the opponents' best point and answer it with reasons",
        "Remove the claim",
        "Add a joke",
      ],
      "B",
    ],
    [
      "A petition needs 50 signatures and each volunteer can collect 8 in a week. What is the fewest volunteers needed to finish in one week?",
      ["5", "6", "7", "8"],
      "C",
    ],
    [
      "Which action creates a public record of your concern at a city council meeting?",
      [
        "Telling a friend",
        "Making a public comment",
        "Posting a private note",
        "Thinking about it",
      ],
      "B",
    ],
    [
      "Why might a coalition be more effective than a single speaker?",
      [
        "It shows broader support and combines different resources",
        "It makes meetings shorter",
        "It avoids all opposition",
        "It is legally required",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Make a short argument about the proposal to lower the speed limit to 20 mph on the street beside a school. Include a claim, two reasons with evidence from the issue brief (4,000 cars a day, 12 near-misses in a year), a counterargument and a rebuttal.",
      scheme: [
        "States a clear claim for or against the proposal",
        "Gives a first reason with specific evidence",
        "Gives a second reason with specific evidence",
        "States a fair counterargument",
        "Gives a reasoned rebuttal",
      ],
      model:
        "The city should lower the speed limit to 20 mph beside the school. First, 12 near-misses were reported in a year, which shows students are already at risk. Second, 4,000 cars a day means many drivers pass at the times students arrive and leave. Opponents say the limit will slow commuters, but over two blocks the delay is about a minute, which is a small cost compared with preventing a serious injury.",
      answers: [
        [
          "full",
          "[[0|The city should lower the speed limit to 20 mph beside the school]]. [[1|There were 12 near-misses reported in a year, so kids are already at risk]]. [[2|About 4,000 cars use the street every day, so a lot of drivers pass when students are walking]]. [[3|Opponents say it will slow down commuters]]. [[4|But over two blocks the delay is about a minute, which is a small price for stopping an accident]].",
          "Full marks. Your reasons use the numbers from the brief, and your rebuttal compares the cost to the benefit.",
        ],
        [
          "full",
          "[[0|I don't think the city should lower the limit yet and should first try a crosswalk with a flashing signal]]. [[1|Twelve near-misses is a problem, but none were actual collisions, so a cheaper fix might address the crossing]]. [[2|With 4,000 cars a day, the problem could be a few unsafe crossing spots and not the speed]]. [[3|Supporters say 20 mph is the only way to be safe]]. [[4|But a flashing crosswalk targets where students actually cross and costs less, and if it doesn't work, the limit can be lowered after]].",
          "All five points. You argued against the proposal with a specific alternative, which makes the position more persuasive than just saying no.",
        ],
        [
          "partial",
          "[[0|I think the city should lower the speed limit]]. [[1|Twelve near-misses is a lot]]. Cars are dangerous.",
          "Good claim and one piece of evidence. Add a second reason, a counterargument and a rebuttal.",
        ],
        [
          "partial",
          "[[3|Some people say it slows traffic]] and [[4|a minute is not much]]. I'm in favor.",
          "Your counterargument and rebuttal are well matched. State a clear claim and give two reasons with evidence.",
          true,
        ],
        [
          "weak",
          "The speed limit should be lowered because I said so and everyone agrees. Nobody could have a different view.",
          "An argument needs reasons and evidence, and acknowledges other views. Use the numbers in the brief and name an objection.",
        ],
        [
          "weak",
          "[[0|Lower the limit]]. Cars are bad and should be banned from the whole city.",
          "A claim should be specific to the proposal. Support it with evidence like the near-misses and answer a reasonable objection.",
        ],
      ],
    },
    {
      prompt:
        "Compare two ways a student could act on the local issue (for example speaking at a public meeting, organizing a petition, writing to a council member, or joining a neighborhood group). For each, describe what it involves, its cost in time and effort, and its likely effect. Then state which you would choose first and why.",
      scheme: [
        "Accurately describes the first action",
        "Describes its cost and likely effect",
        "Accurately describes the second action",
        "Describes its cost and likely effect",
        "States which action to take first",
        "Gives a reason that considers the decision-maker or the timing",
      ],
      model:
        "Speaking at a public meeting involves giving a short statement to the council. It takes preparation and attendance at a set time, but creates a public record and is heard by decision-makers directly. Organizing a petition involves collecting signatures from residents, which takes weeks but shows how many people care. I would start with a petition, because it builds support and then makes a stronger case when I speak at a meeting, since the council can see the number of residents behind the request.",
      answers: [
        [
          "full",
          "[[0|Speaking at a public meeting means giving a short statement to the council during public comment]]. [[1|It takes preparation and attending at a set time, but it creates a public record and decision-makers hear you directly]]. [[2|A petition means collecting signatures from residents who agree]]. [[3|It takes weeks but it shows how many people care]]. [[4|I'd start with the petition]], [[5|because then when I speak at the meeting I can show the council how many residents are behind it, which makes my case stronger]].",
          "Full marks. You compared costs and effects and gave a reason that considers how the two actions work together.",
        ],
        [
          "full",
          "[[0|Writing to a council member means sending an email or letter that explains the issue and what I'm asking for]]. [[1|It takes about an hour and might reach one office, but it's quick and can start a conversation]]. [[2|Joining a neighborhood group means becoming part of an existing organization that meets regularly]]. [[3|It takes longer to build trust but the group already has a voice with the city and can keep pressure up]]. [[4|I'd email first]], [[5|because there is a council meeting coming up and a quick message could get the issue on someone's radar before then]].",
          "All six points. Timing the email to the upcoming meeting is a practical reason.",
        ],
        [
          "partial",
          "[[0|Speaking at a meeting is when you talk to the council]]. [[2|A petition is signatures]].",
          "Both are described briefly. Add the cost and effect of each, which you would choose first and why.",
        ],
        [
          "partial",
          "[[1|A public comment takes time to prepare but creates a record]]. [[4|I would do that first]].",
          "Good on one action's cost and effect. Describe the second action and give reasons for your choice.",
          true,
        ],
        [
          "weak",
          "I wouldn't act at all, because one person can't change anything and officials don't listen to students.",
          "Small groups of informed residents often influence local decisions. Choose two actions and describe their costs and effects.",
        ],
        [
          "weak",
          "[[0|A petition is when people sign something]]. A petition is the same as voting and the council has to do what it says.",
          "A petition shows support, but it is not binding like a vote. Describe cost, effect and which action you'd choose first.",
        ],
      ],
    },
  ],
};

writeCourse("us-government-grade-11.json", "US Government", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
