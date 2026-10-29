import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * AP US Government and Politics, Grade 11, Quarter 1. Units 1 to 3 and the
 * course's skills, framed around concept application, quantitative analysis,
 * Supreme Court comparison and argument essay. All questions are original.
 */

const w1: WeekInput = {
  topic: "Natural rights, factions and the design of the republic",
  note: `
## Objectives

Students will be able to:

1. explain the ideas of natural rights, popular sovereignty and the social contract in the Declaration of Independence;
2. compare the Federalist No. 10 and Brutus No. 1 arguments about the size of a republic;
3. describe how the Constitution's design provides separation of powers and checks and balances.

## Materials

Annotated excerpts of the Declaration's preamble (public domain), a one-page argument map of Federalist No. 10 (problem, two cures, the solution), a corresponding map of Brutus No. 1, Federalist No. 51 excerpt-summary, a blank checks-and-balances matrix (three branches by three branches), a short stimulus-based quiz, and the exit ticket.

## Starter (8 minutes)

Ask: "In a class of 30 where a group of 16 always decides how the class spends its fundraising money, is the system fair? What would prevent them from ignoring the other 14?" Use this to introduce the problem of majority faction.

## Main activity

1. Foundational reading. Annotate the Declaration's preamble for three ideas: natural rights, consent of the governed and the right to alter or abolish. For each, students write where the later Constitution reflects it.
2. Fed 10 versus Brutus 1. Pairs fill an argument map. For Madison: faction is inevitable because of the unequal distribution of property and opinions; the cause cannot be removed without destroying liberty, so control the effects; in a large republic, representation and many interests make a stable majority faction less likely. For Brutus: a large republic cannot know the people; representatives will be too few and too far away; the Necessary and Proper and Supremacy clauses will consolidate power. Each pair writes one place where each author's reasoning is strongest and weakest.
3. Design features. Using the matrix, students list the checks each branch has on the others and cite the Constitution's article for each. They connect Federalist No. 51's "ambition must counteract ambition."
4. Quiz. Five stimulus-based questions and one short free-response, in the format of the exam.

## Checking for understanding

Cold-call: "Which of Madison's cures for faction does the Constitution use, and which does it reject, and why?"

## Exit ticket

Write one sentence naming a feature of the Constitution that answers Brutus's fears, and one that fails to answer them fully.
`,
  reading: [
    "Three foundations of the republic: consent, factions and distance",
    `
The Declaration of Independence rests on an argument from political philosophy. Its preamble claims that all people have unalienable rights, that governments are formed to secure those rights, that they derive their just powers from the **consent of the governed**, and that people may alter or abolish a government that destroys those ends. Taken together these ideas yield **natural rights** (rights that exist prior to government), **popular sovereignty** (the people as the ultimate source of authority) and a **social contract** (a government that exists by agreement and must keep its side of it). Students of the course should see the argument as a chain: rights come first, government is created to protect them, and the people judge whether it has done so.

The founders' next problem was how to build a government that does protect rights without becoming a threat to them. In **Federalist No. 10**, James Madison identifies the greatest danger to a republic as faction, a group of citizens, whether a majority or a minority, united by a common interest or passion that is opposed to the rights of others or to the community's long-term interests. Madison argues that the causes of faction are rooted in human nature and in the unequal distribution of property, so removing them would require destroying liberty or making everyone think the same, and both cures are worse than the disease. The better course is to control the effects. A **republic**, in which citizens elect representatives, can refine public opinion by passing it through people who may be wiser and less swayed by local passion. And a large republic, with a greater number and variety of interests, makes it harder for any single faction to become a majority and to act together.

The Anti-Federalist essay **Brutus No. 1** answers from the opposite direction. Brutus argues that republics historically have survived only over small territories, where citizens share interests and can watch their representatives. In a country as vast as the new United States, he says, a small number of representatives would not truly know the people, would be elected by wide districts and would be drawn from the wealthy and well known. He fears that the Necessary and Proper Clause and the Supremacy Clause would allow the national government to absorb the states' powers, and that a standing army would be used to enforce its will. His remedy was a smaller republic, or at least a bill of rights.

The Constitution tries to guard against these dangers by design. **Separation of powers** divides authority among Congress, the president and the courts. **Checks and balances** give each branch tools to restrain the others: Congress can override a veto, the Senate confirms appointments, courts review laws and executive actions, and the House can impeach. Madison explains the logic in **Federalist No. 51**: since people are not angels, the structure of government must set ambition against ambition, so that each branch has the means and the motive to resist the others. A bicameral Congress, whose chambers differ in size, term and mode of election, adds a further check inside the legislature. Federalism divides power again, between the national and state governments.

For the exam, two skills matter. You must be able to explain each argument accurately and apply its logic to a new example, such as a modern interest group or a recent act of Congress. And you must be able to use the documents as evidence in an argument, which means citing a specific claim in the text, not only naming the document.
`,
  ],
  cards: [
    ["Natural rights", "Rights that exist before government, such as life, liberty and the pursuit of happiness in the Declaration."],
    ["Popular sovereignty", "The principle that the people are the ultimate source of government's authority."],
    ["Social contract", "The idea that government arises from an agreement among the people and must protect their rights."],
    ["Faction (Federalist No. 10)", "A group of citizens united by a common interest or passion opposed to others' rights or the community's interests."],
    ["Madison's solution", "Control the effects of faction through a large republic with representation and many competing interests."],
    ["Brutus No. 1", "Anti-Federalist essay arguing a large republic cannot know its people and will consolidate power."],
    ["Federalist No. 51", "Madison's argument that ambition must counteract ambition through separation of powers and checks."],
    ["Bicameralism", "A two-house legislature; in Congress, the House and Senate differ in size, terms and election."],
  ],
  closed: [
    [
      "A state's legislature passes a law requested by a small group of wealthy landowners that harms the interests of most residents. Which concept from Federalist No. 10 best describes the landowners?",
      ["Popular sovereignty", "A faction", "A bicameral check", "A social contract"],
      "B",
    ],
    [
      "Madison argues that a large republic is better than a small one at controlling faction because it:",
      [
        "Removes the causes of faction by equalizing property",
        "Contains many interests, making a stable majority faction harder to form",
        "Eliminates the need for representation",
        "Allows citizens to vote directly on all laws",
      ],
      "B",
    ],
    [
      "Which of the following best reflects Brutus's concern about the Necessary and Proper Clause?",
      [
        "It lets Congress choose its own members",
        "It could give the national government broad, open-ended power that overtakes the states",
        "It limits the president to two terms",
        "It protects freedom of the press",
      ],
      "B",
    ],
    [
      "The president vetoes a bill; Congress passes it again by a two-thirds vote in each house. This is an example of:",
      [
        "Separation of powers only",
        "A check by one branch on another, and a response to it",
        "Judicial review",
        "Federalism",
      ],
      "B",
    ],
    [
      "A government declares that its authority comes from the agreement of those it governs and may be replaced if it abuses that agreement. Which two concepts are most directly illustrated?",
      [
        "Federalism and bicameralism",
        "Social contract and popular sovereignty",
        "Judicial review and federalism",
        "Faction and republicanism",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Madison in Federalist No. 10 and Brutus in Brutus No. 1 reach opposite conclusions about the size of a republic. (a) Describe Madison's argument about the effects of a large republic on faction. (b) Describe Brutus's argument about representation in a large republic. (c) Explain one way the Constitution's design responds to Brutus's concern, and one way it does not fully do so.",
      scheme: [
        "Describes Madison's argument that a large republic contains many interests and makes a stable majority faction less likely",
        "Describes Brutus's argument that representatives in a large republic will not know the people or will be too few and too distant",
        "Explains a way the Constitution responds, such as federalism, the Bill of Rights, or separation of powers and checks",
        "Explains a way the response is incomplete, such as large House districts or the Necessary and Proper Clause",
      ],
      model:
        "(a) Madison argues that a large republic includes many different interests and groups, so it is harder for any one faction to become a majority and act together. (b) Brutus argues that in a large republic the representatives are too few and too far from the people to know their needs, so the government will serve the wealthy and drift toward consolidation. (c) The Constitution responds through federalism, which leaves many powers with the states closer to the people, and the Bill of Rights, added later. It does not fully answer him because House districts today are very large, around 760,000 people each, and the Necessary and Proper Clause still gives Congress broad power.",
      answers: [
        [
          "full",
          "(a) [[0|Madison argues that in a large republic there are so many different interests that it's hard for any one faction to become a majority and work together]]. (b) [[1|Brutus argues that representatives in a big republic can't know the people, because there are too few of them and they are too far away, so they'll represent the rich and well known]]. (c) [[2|The Constitution responds with federalism, which leaves a lot of power with the states, and later the Bill of Rights]]. [[3|It doesn't fully answer him, because House districts today have about 760,000 people, so representatives can't know everyone, and the Necessary and Proper Clause gives Congress broad power]].",
          "Full marks. Your modern data on district size is a precise way to show the response is incomplete.",
        ],
        [
          "full",
          "(a) [[0|A large republic has a greater variety of parties and interests, so a faction trying to be a majority would have trouble getting enough people together]]. (b) [[1|Brutus says a representative should be like the people he represents, but in a big country there would be few representatives who couldn't understand local needs]]. (c) [[2|Separation of powers and checks and balances respond because even if representatives are distant, they can be checked by the other branches]]. [[3|It's incomplete because the checks only work if the branches want to use them, and when the same party controls both Congress and the presidency they may not]].",
          "All four points. Pointing out that checks can weaken under unified party control is a strong, modern complication.",
        ],
        [
          "partial",
          "(a) [[0|Madison says a large republic has many interests so no faction can dominate]]. (b) Brutus says a large republic is bad. (c) The Constitution has a Bill of Rights.",
          "Part (a) is accurate. In (b) describe what Brutus says about representation, and in (c) explain the response and a limit.",
        ],
        [
          "partial",
          "(b) [[1|Brutus says representatives won't know the people in such a big country]]. (c) [[2|Federalism answers it because states are closer to people]], [[3|but the national government still has big powers]]. (a) Madison likes republics.",
          "Parts (b) and (c) are well done. Part (a) needs the specific argument about many interests and majority faction.",
          true,
        ],
        [
          "weak",
          "(a) Madison says there should be no factions at all because they are bad. (b) Brutus wants a king. (c) The Constitution is perfect.",
          "Madison argued factions cannot be removed without destroying liberty, and Brutus wanted a smaller republic, not a king. Re-read each argument.",
        ],
        [
          "weak",
          "(a) [[0|Madison says there are many interests]]. (b) Brutus agrees with Madison. (c) The president can veto.",
          "The first part is accurate but brief. Brutus disagreed with Madison, and part (c) should connect a feature of the Constitution to Brutus's concern.",
        ],
      ],
    },
    {
      prompt:
        "A newly elected president issues an executive order that Congress's leaders oppose, and a federal court blocks it. (a) Identify the principle of separation of powers illustrated. (b) Explain how checks and balances operate in this scenario using two different checks. (c) Explain, using Federalist No. 51, why the framers designed the system this way.",
      scheme: [
        "Identifies separation of powers, that each branch has distinct roles, or the executive acting within its sphere",
        "Explains a first check, such as judicial review by the court",
        "Explains a second check, such as Congress's power to pass a law, defund or override",
        "Explains the Federalist No. 51 reasoning that ambition must counteract ambition",
        "Connects the reasoning to the scenario",
      ],
      model:
        "(a) The scenario illustrates separation of powers because the executive issues the order, Congress opposes it and the judiciary decides its legality. (b) A federal court blocking the order is judicial review, a check on the executive. Congress could also check it by passing a law that overrides the order or by refusing to fund it. (c) Federalist No. 51 argues that since people are not angels, each branch must have the means and motive to resist the others, so that ambition counteracts ambition. In this scenario, the court and Congress each use their power to resist the president, as Madison intended.",
      answers: [
        [
          "full",
          "(a) [[0|Separation of powers, because the president, Congress and the courts each play a different role and the executive can only act within its sphere]]. (b) [[1|The court blocking the order is judicial review, which checks the executive]]. [[2|Congress can also check the president by passing a law against the order or by refusing to fund it]]. (c) [[3|In Federalist 51 Madison says people aren't angels so each branch needs the power and the motive to resist the others, so ambition counteracts ambition]]. [[4|Here the court and Congress both resist the president, which is what Madison wanted]].",
          "Full marks. You used two different checks and applied Madison's logic back to the scenario.",
        ],
        [
          "full",
          "(a) [[0|It shows separation of powers since three branches each handled their part: the president acting, the court judging it and Congress objecting]]. (b) [[1|The court checks the president through judicial review when it blocks the order]]. [[2|Congress checks the president through the power of the purse, since it could refuse to pay for enforcing it]]. (c) [[3|Madison said in Federalist 51 that if men were angels no government would be needed, so the way to protect liberty is to set ambition against ambition]]. [[4|Each branch protects its own power, and that prevents the president from just ruling alone]].",
          "All five points. 'Each branch protects its own power' captures the mechanism of the argument.",
        ],
        [
          "partial",
          "(a) [[0|Separation of powers]]. (b) [[1|The court used judicial review]]. (c) Madison said ambition counteracts ambition.",
          "Parts (a) and (b) are correct but brief. Add a second check from Congress, and explain Madison's reasoning in (c) and tie it to the scenario.",
        ],
        [
          "partial",
          "(b) [[2|Congress could pass a law or cut funding]]. (c) [[3|Madison believed ambition should counteract ambition because people are not angels]]. [[4|The branches fight each other]].",
          "Good use of Congress's checks and a correct reading of Madison. Add the court's check and name the principle in (a).",
          true,
        ],
        [
          "weak",
          "(a) Federalism, because the president and the courts are different levels. (b) The president can override the court. (c) Madison wanted a strong president.",
          "The principle is separation of powers, not federalism, and the court can block an executive order. Madison wanted checks on every branch, including the president.",
        ],
        [
          "weak",
          "(a) [[0|Separation of powers]]. (b) Nothing in the Constitution lets courts do this. (c) The framers didn't care.",
          "Judicial review is a recognized check, and the framers did care about checks, as Federalist No. 51 shows. Explain at least two checks.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "The federalism debate and why the Articles gave way",
  note: `
## Objectives

Students will be able to:

1. explain how the debate over federalism has shaped the relationship of the states and the national government;
2. compare the Articles of Confederation with the Constitution and explain why the framers replaced them.

## Materials

A comparison table of the Articles and the Constitution (representation, executive, courts, taxation, commerce, amendment), a timeline of the federalism eras (dual, cooperative, devolution), grant-type cards (categorical, block, mandate, unfunded mandate), a summary of McCulloch v. Maryland (1819) and United States v. Lopez (1995), a quantitative handout on a fictional grant, and the exit ticket.

## Starter (8 minutes)

Pose: "The national government wants all states to set a drinking age of 21 but cannot order them to. What tools could it use instead?" Take suggestions and put them on the board as "persuade, fund, threaten, require."

## Main activity

1. Articles versus Constitution. Students complete the table and then write a two-sentence causal explanation of why the framers replaced the Articles, using Shays' Rebellion, the inability to tax and the requirement of unanimity to amend.
2. Eras of federalism. Present dual federalism ("layer cake"), cooperative federalism ("marble cake") after the New Deal, and devolution since the 1980s. Students sort examples (a categorical grant for school lunches, a block grant for welfare, an unfunded mandate) onto the timeline.
3. The Court's role. McCulloch v. Maryland: Congress has implied powers, and states cannot tax a federal bank. United States v. Lopez: Congress exceeded its Commerce Clause power by banning guns near schools. Students state which direction each decision moves power.
4. Quantitative work. A fictional state receives a categorical grant of 40 million dollars requiring a state match of 25 percent of the total program cost. Compute the state's share and the total.

## Checking for understanding

Whiteboards: classify a new example as a categorical grant, a block grant or an unfunded mandate, with one sentence of justification.

## Exit ticket

Which direction did McCulloch and Lopez push federalism? Use one fact from each.
`,
  reading: [
    "Layer cake, marble cake and the argument that never ends",
    `
The question of how power should be divided between the national and state governments is the oldest argument in American politics. Under the **Articles of Confederation**, ratified in 1781, the states kept nearly all real power. Congress had a single house with one vote per state, no executive and no national courts. It could not tax or regulate interstate trade, and it needed nine of thirteen states to pass major laws and all thirteen to amend. The consequences became clear within a few years: unpaid war debts, trade wars among the states, and Shays' Rebellion in 1786 and 1787, which the national government could not suppress. The **Constitution** answered by creating three branches, giving Congress the power to tax, borrow and regulate commerce, making national law supreme over state law, and permitting amendment by three fourths of the states instead of all of them. Yet the framers also kept the states in place and reserved powers to them, a bargain that Federalists defended and Anti-Federalists doubted.

The balance has shifted over time. In the early republic and through the nineteenth century, **dual federalism** prevailed: the national and state governments operated in separate spheres, a pattern sometimes called a layer cake. The Great Depression and the New Deal moved toward **cooperative federalism**, in which national and state governments work together on the same programs, a pattern called a marble cake. The central tool of cooperation has been the **grant**. **Categorical grants** are for a specific purpose and come with conditions, such as funds for school lunches. **Block grants** give states broad discretion within a general area, such as welfare. **Mandates** require states to act, and **unfunded mandates** require action without providing the money. Since the 1980s, **devolution** has moved some responsibilities back to the states, as in the 1996 welfare reform.

The Supreme Court has refereed this contest. In *McCulloch v. Maryland* (1819), the Court held that Congress has implied powers under the Necessary and Proper Clause to charter a national bank, and that states cannot tax a federal institution because of the Supremacy Clause. The decision strengthened the national government. In *United States v. Lopez* (1995), the Court held that Congress exceeded its power under the Commerce Clause when it banned guns near schools, because possessing a gun in a school zone was not economic activity. This was the first time in nearly sixty years that the Court had limited the Commerce Clause, and it moved power toward the states. The two cases show that no single era settles the matter.

Quantitative reasoning appears often in this topic. Suppose a state receives a categorical grant of 40 million dollars that covers 75 percent of a program's cost, and the state must match the rest. The 40 million represents 75 percent, so the total cost is about 53.3 million dollars and the state's share is about 13.3 million. A student who understands how matching grants work can explain why states may accept programs they would not otherwise fund, and why critics warn that grants give the national government leverage over state decisions.

On the exam, expect scenarios that ask which type of federalism or grant is illustrated and what effect it has on the balance of power. A good answer names the concept, ties it to specific details in the scenario and explains the consequence for states, such as higher costs, less discretion or more resources.
`,
  ],
  cards: [
    ["Articles of Confederation", "1781 plan with a weak one-house Congress, no executive, no national courts and no power to tax."],
    ["Dual federalism", "A model in which national and state governments work in separate spheres, sometimes called a layer cake."],
    ["Cooperative federalism", "A model in which levels of government work together on shared programs, called a marble cake."],
    ["Categorical grant", "A federal grant for a specific purpose, with conditions attached."],
    ["Block grant", "A federal grant giving states broad discretion within a general area."],
    ["Unfunded mandate", "A requirement placed on states without providing money to carry it out."],
    ["McCulloch v. Maryland (1819)", "Congress has implied powers; states cannot tax a federal bank (Supremacy Clause)."],
    ["United States v. Lopez (1995)", "Congress exceeded its Commerce Clause power by banning guns near schools."],
    ["Devolution", "The shift of responsibilities from the national government back to the states."],
  ],
  closed: [
    [
      "A federal law requires states to improve water testing and provides no money for the new tests. This is best described as:",
      ["A block grant", "A categorical grant", "An unfunded mandate", "Devolution"],
      "C",
    ],
    [
      "Which of the following was a weakness of the Articles of Confederation that the Constitution addressed?",
      [
        "The national government had too many courts",
        "Congress could not tax individuals or regulate interstate commerce",
        "The president had too much power",
        "States were forbidden to tax",
      ],
      "B",
    ],
    [
      "A state receives a categorical grant covering 75 percent of a 60 million dollar program. How much must the state pay?",
      ["10 million dollars", "15 million dollars", "20 million dollars", "45 million dollars"],
      "B",
    ],
    [
      "The decision in United States v. Lopez is best seen as:",
      [
        "Expanding national power under the Necessary and Proper Clause",
        "Limiting national power under the Commerce Clause",
        "Giving states the power to tax federal banks",
        "Establishing judicial review",
      ],
      "B",
    ],
    [
      "Which situation best illustrates cooperative federalism?",
      [
        "A state and the national government fund and administer a highway project together",
        "A state refuses to follow any federal law",
        "The national government abolishes state governments",
        "A city passes a local tax",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A fictional federal law offers states a block grant for job training with few conditions, and separately requires all states to meet new air-quality standards without providing funding. (a) Identify the type of federal tool in each case. (b) Explain how the block grant and the mandate each affect the balance of power between states and the national government. (c) Explain one reason a state might prefer a block grant to a categorical grant.",
      scheme: [
        "Identifies the job-training money as a block grant and the air standard as an unfunded mandate",
        "Explains the block grant's effect, such as more state discretion",
        "Explains the mandate's effect, such as increasing national control and state costs",
        "Explains a reason a state might prefer a block grant, such as flexibility to fit local needs",
      ],
      model:
        "(a) The job-training funding is a block grant, and the air-quality requirement without money is an unfunded mandate. (b) The block grant gives states discretion over how to use the money, so it moves some power toward the states. The unfunded mandate increases national control because states must comply, and shifts the cost to state budgets. (c) A state might prefer a block grant because it can design the program to fit local needs, instead of following the strict conditions of a categorical grant.",
      answers: [
        [
          "full",
          "(a) [[0|The job training money is a block grant and the air-quality requirement with no funding is an unfunded mandate]]. (b) [[1|The block grant gives states freedom to decide how to spend the money, which shifts some power to the states]]. [[2|The mandate increases national control because states have to comply, and it puts the cost on state budgets]]. (c) [[3|A state might like a block grant because it can design the program to fit its own needs instead of following strict federal conditions]].",
          "Full marks. You correctly identified both tools and described the opposite effects on the balance of power.",
        ],
        [
          "full",
          "(a) [[0|Block grant for job training, unfunded mandate for the air standard]]. (b) [[1|A block grant lets states use their own judgment, so it strengthens state discretion]]. [[2|The mandate strengthens the national government's control and forces states to spend their own money]]. (c) [[3|A state might prefer a block grant because every state has different job needs, and a categorical grant would make them follow one set of rules]].",
          "All four points. Your reason in (c) ties flexibility to actual differences among states.",
        ],
        [
          "partial",
          "(a) [[0|Block grant and unfunded mandate]]. (b) The block grant helps the states and the mandate doesn't. (c) States like money.",
          "Part (a) is correct. Explain how each affects power in (b) and give a specific reason for (c).",
        ],
        [
          "partial",
          "(b) [[2|The mandate costs states money and gives the national government control]]. (c) [[3|A block grant is more flexible]]. (a) They are both grants.",
          "Good effects and reason. In (a), the air-quality rule is a mandate, not a grant, and the job funding is a block grant.",
          true,
        ],
        [
          "weak",
          "(a) The block grant is a mandate and the air standard is a categorical grant. (b) Both give states more power. (c) Categorical grants are always better.",
          "You reversed the types. The job-training money is a block grant and the unfunded air rule is a mandate. Review the definitions.",
        ],
        [
          "weak",
          "(a) [[0|The job training is a block grant]]. (b) Nothing changes the balance of power, since the national government always wins. (c) Not sure.",
          "The block grant identification is right, but the tools do change the balance of power. Explain each effect and a reason for preferring a block grant.",
        ],
      ],
    },
    {
      prompt:
        "Compare McCulloch v. Maryland (1819) and United States v. Lopez (1995). (a) Describe the constitutional clause at issue in each case. (b) Explain how each decision affected the balance between state and national power. (c) Explain one reason why the Court reached a different result in each case, even though both involved questions of national power.",
      scheme: [
        "Describes the clause at issue in McCulloch, the Necessary and Proper Clause and/or Supremacy Clause",
        "Describes the clause at issue in Lopez, the Commerce Clause",
        "Explains that McCulloch expanded national power and Lopez limited it",
        "Explains a reason for the different results, such as the connection to economic activity or the Court's view of limits on enumerated powers",
      ],
      model:
        "(a) McCulloch involved the Necessary and Proper Clause and the Supremacy Clause, because Congress chartered a national bank and Maryland tried to tax it. Lopez involved the Commerce Clause, because Congress banned guns near schools. (b) McCulloch strengthened the national government by recognizing implied powers and preventing states from taxing federal institutions. Lopez limited national power by finding that the gun law exceeded Congress's authority, which moved power toward the states. (c) The Court reached different results because in McCulloch the bank was a reasonable means of carrying out powers such as taxing and borrowing, while in Lopez the possession of a gun in a school zone was not economic activity and was too distant from interstate commerce.",
      answers: [
        [
          "full",
          "(a) [[0|In McCulloch the clauses were the Necessary and Proper Clause and the Supremacy Clause, because Congress made a national bank and Maryland taxed it]]. [[1|In Lopez the clause was the Commerce Clause, because Congress banned guns near schools]]. (b) [[2|McCulloch increased national power by allowing implied powers and barring states from taxing the bank, while Lopez decreased it by saying Congress went too far, which gave more power to the states]]. (c) [[3|In McCulloch a bank is a reasonable way to carry out Congress's powers over money, while in Lopez carrying a gun near school isn't economic activity so it doesn't have a real link to interstate commerce]].",
          "Full marks. Your reason for the different results points to the specific fact that distinguishes the cases.",
        ],
        [
          "full",
          "(a) [[0|McCulloch dealt with the Necessary and Proper Clause and the Supremacy Clause]]. [[1|Lopez dealt with the Commerce Clause]]. (b) [[2|McCulloch strengthened the federal government and Lopez was a limit on it, the first time in decades the Court limited Congress's commerce power]]. (c) [[3|The difference is that the bank was tied to powers Congress clearly has, like taxing and borrowing, but the gun-free zone law was about a local crime rather than commerce]].",
          "All four points. You noted that Lopez was the first limit on the Commerce Clause in decades, which shows context.",
        ],
        [
          "partial",
          "(a) [[0|McCulloch is about the Necessary and Proper Clause]]. [[1|Lopez is about the Commerce Clause]]. (b) They both are about federalism.",
          "Part (a) is right. In (b) say which way each decision shifted power, and give a reason for the different outcomes in (c).",
        ],
        [
          "partial",
          "(b) [[2|McCulloch made the national government stronger and Lopez made states stronger]]. (c) The Court changed its mind over time.",
          "Part (b) is correct. In (a), name the clauses, and in (c), say what facts differed between the cases.",
          true,
        ],
        [
          "weak",
          "(a) Both cases are about the Bill of Rights. (b) Both gave more power to the states. (c) The Court was in a different mood.",
          "These cases concern the Constitution's grants of power, not the Bill of Rights, and McCulloch strengthened the national government. Re-read each case.",
        ],
        [
          "weak",
          "(a) [[1|Lopez is about the Commerce Clause]]. (b) McCulloch was about a bank robbery. (c) They are the same.",
          "McCulloch concerned a national bank and Maryland's tax, not a robbery, and the cases reached different results. Explain what clauses and facts mattered.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Compromise, ratification, amendment and the structure of Congress",
  note: `
## Objectives

Students will be able to:

1. explain how the Constitution's ratification and its amendments reflect compromise;
2. describe the structure, powers and leadership of Congress, including the House and the Senate.

## Materials

A graphic organizer of the Convention's compromises (representation, slavery, executive selection), the Article V flowchart, a timeline of amendment milestones (Bill of Rights 1791, 11th to 15th, 17th in 1913, 19th in 1920, 26th in 1971, 27th in 1992), a House-versus-Senate comparison grid, a short data sheet (435 House seats, a 2020 population of about 331 million, 100 senators, 60 for cloture, 218 for a discharge petition), and the exit ticket.

## Starter (8 minutes)

Ask: "The 27th Amendment, on congressional pay, was proposed in 1789 and ratified in 1992. What does that 203-year gap say about how the amendment process works?" Collect ideas about thresholds, timing and public attention.

## Main activity

1. Compromise audit. Students sort the Convention's bargains into: structural (Great Compromise, Electoral College), moral and economic (Three-Fifths Compromise, the slave trade clause) and rights (the promise of a Bill of Rights to win ratification). For each, they name who gained and who yielded.
2. Amendment mechanics. Using Article V, students compute the votes needed: two thirds of the House (290 if all vote), two thirds of the Senate (67), three fourths of the states (38). They then check how the 17th, 19th and 26th Amendments changed representation or participation.
3. Congress. Students complete a comparison grid: size, term, qualifications, representation, unique powers (the House starts revenue bills, impeaches and chooses the president if the Electoral College is deadlocked; the Senate confirms nominations, ratifies treaties by two thirds and tries impeachments). Explain leadership: Speaker, majority and minority leaders, whips, committee chairs. Calculate average district size: about 331 million divided by 435, about 761,000.
4. Rules that shape outcomes. Discuss the Rules Committee, the discharge petition and the filibuster and cloture at 60.

## Checking for understanding

Whiteboards: "Which chamber has this power? Impeach, try an impeachment, confirm a nominee, begin a revenue bill."

## Exit ticket

Pick one amendment and explain what compromise or political change it reflects.
`,
  reading: [
    "A bargain that needed to be sold, and a legislature built as two",
    `
The Constitution that emerged from Philadelphia was a set of bargains, and it still carries their marks. The **Great Compromise** reconciled large and small states by creating a House apportioned by population and a Senate with two members per state. The **Three-Fifths Compromise** counted three-fifths of the enslaved population for apportioning House seats and direct taxes, which increased the power of slaveholding states in the House and in the Electoral College. A clause protected the importation of enslaved people from federal ban until 1808. The **Electoral College** split the difference between election of the president by Congress and by popular vote, giving each state electors equal to its House and Senate seats. Each compromise purchased agreement at a price that fell unevenly on different people.

Ratification was another test. The Federalists, who supported the Constitution, were better organized and had the support of many newspapers. The Anti-Federalists objected to the lack of a bill of rights, the power of the national government and the distance of representatives from the people. Narrow votes in Massachusetts, Virginia and New York gave the Federalists victories only after promises that amendments would follow. The first ten, the **Bill of Rights**, were ratified in 1791 and were as much a political compromise as a statement of principle.

The amendment process in Article V is difficult by design. An amendment must be proposed by two thirds of both houses of Congress, or by a convention called by two thirds of the states, and ratified by three fourths of the states. Only 27 amendments have been adopted. Several expanded democracy. The 17th Amendment (1913) provided for direct election of senators, who had previously been chosen by state legislatures. The 19th (1920) guaranteed women the right to vote, the 24th (1964) banned poll taxes in federal elections and the 26th (1971) lowered the voting age to 18. Others reflect struggles over slavery and citizenship, including the 13th, 14th and 15th Amendments after the Civil War. The 27th Amendment, which delays any change in Congress's pay until after the next election, was proposed in 1789 and ratified in 1992, a reminder that an amendment may sit unratified for generations until the public's interest revives.

Article I establishes Congress as a bicameral legislature, and the differences between the chambers are intentional. The **House** has 435 members, a number fixed by statute in 1929, who serve two-year terms and must be at least 25. Because House seats are apportioned by population, each member represents on average about 761,000 people (331 million divided by 435). The **Senate** has 100 members, two from each state, who serve staggered six-year terms and must be at least 30. The House begins revenue bills, impeaches federal officials and chooses a president if no candidate wins an Electoral College majority. The Senate confirms presidential nominees, ratifies treaties by a two-thirds vote and conducts impeachment trials, where a two-thirds vote is needed to convict.

Leadership structures reflect party control. The **Speaker of the House**, elected by the majority, is the chamber's presiding officer and second in line for the presidency after the vice president. The Senate's presiding officer is the vice president, who votes only to break ties, but day-to-day leadership belongs to the majority leader. Both parties have **whips** who count votes and press members to follow the party. Most legislative work is done in committees: standing committees with permanent jurisdictions, select committees for special investigations, joint committees with members from both chambers and conference committees that reconcile different versions of a bill. In the House, the Rules Committee sets the terms of debate for most bills, and a discharge petition signed by 218 members can force a bill out of committee. In the Senate, debate is long unless **cloture**, which needs 60 votes, ends a filibuster. These rules mean that structure often matters as much as the number of votes.
`,
  ],
  cards: [
    ["Great Compromise", "Created a House by population and a Senate with equal state representation."],
    ["Three-Fifths Compromise", "Counted three-fifths of the enslaved population for House seats and direct taxes."],
    ["Article V", "Amendments are proposed by two thirds of Congress (or a convention called by two thirds of states) and ratified by three fourths of the states."],
    ["17th Amendment", "1913: provided for direct popular election of senators."],
    ["Speaker of the House", "Presiding officer chosen by the majority party; second in line to the presidency."],
    ["Whip", "A party leader who counts votes and encourages members to support the party's position."],
    ["Rules Committee", "House committee that sets the terms of debate for most bills."],
    ["Discharge petition", "A petition signed by 218 House members to force a bill out of committee."],
    ["Cloture", "A Senate vote, requiring 60 senators, to end debate and overcome a filibuster."],
  ],
  closed: [
    [
      "The House has 435 members and the 2020 population was about 331 million. About how many people does each member represent on average?",
      ["About 76,100", "About 331,000", "About 761,000", "About 1.2 million"],
      "C",
    ],
    [
      "Which of the following is a power granted to the Senate but not to the House?",
      [
        "Beginning revenue bills",
        "Impeaching federal officials",
        "Confirming presidential nominees",
        "Choosing the Speaker",
      ],
      "C",
    ],
    [
      "A majority party's supporters in the House want to force a bill out of a committee that refuses to act on it. Which tool is available?",
      ["Cloture", "A discharge petition", "A filibuster", "A veto override"],
      "B",
    ],
    [
      "The 17th Amendment is best understood as a change that:",
      [
        "Gave Congress power over taxes",
        "Made the Senate more directly accountable to voters by establishing popular election of senators",
        "Gave states control of the Electoral College",
        "Extended presidential terms",
      ],
      "B",
    ],
    [
      "Which best explains why the Bill of Rights is considered a result of compromise?",
      [
        "It was written by the Anti-Federalists alone",
        "Federalists promised amendments to win ratification, and Madison proposed them in Congress",
        "It was part of the original text in 1787",
        "It was required by the Articles",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Identify one compromise made at the Constitutional Convention and one amendment to the Constitution. (a) Describe the compromise and explain which groups gained and which gave something up. (b) Describe the amendment and explain how it changed political participation or representation. (c) Explain one similarity between the way the compromise and the amendment reflect competing interests.",
      scheme: [
        "Accurately describes a Convention compromise",
        "Explains who gained and who gave up something",
        "Accurately describes an amendment",
        "Explains its effect on participation or representation",
        "Explains a similarity in how they reflect competing interests",
      ],
      model:
        "(a) The Great Compromise created a House with seats by population and a Senate with two members per state. Large states gained in the House, small states gained equal representation in the Senate, and each gave up something. (b) The 17th Amendment (1913) provided for direct election of senators instead of choosing by state legislatures, which made the Senate more directly accountable to voters. (c) Both reflect competing interests, because the compromise balanced large and small states, and the amendment responded to a long-running dispute between state legislatures and voters, who gained power.",
      answers: [
        [
          "full",
          "(a) [[0|The Great Compromise made a House based on population and a Senate with two senators for every state]]. [[1|Large states gained influence in the House and small states got equal power in the Senate, so each side gave up its demand for the whole legislature]]. (b) [[2|The 17th Amendment in 1913 made senators elected by voters directly rather than chosen by state legislatures]]. [[3|That made the Senate more accountable to ordinary voters and increased voter participation]]. (c) [[4|Both reflect competing interests: the compromise balanced large states against small states, and the amendment balanced state legislatures against the voters, with voters gaining power]].",
          "Full marks. Each part is accurate and part (c) names the competing interests in both cases.",
        ],
        [
          "full",
          "(a) [[0|The Three-Fifths Compromise counted three-fifths of the enslaved people for House seats and taxes]]. [[1|Southern slaveholding states gained more seats than their free population justified, while Northern states conceded that, and enslaved people had no voice in it at all]]. (b) [[2|The 26th Amendment lowered the voting age to 18]]. [[3|It increased participation by letting millions of younger citizens vote, partly because of the argument that those old enough to be drafted could vote]]. (c) [[4|Both involved a struggle over who counts in the political system, with the compromise deciding who counted for representation and the amendment extending voting to a new group]].",
          "All five points. Connecting both to the question of who counts is a strong, unifying observation.",
        ],
        [
          "partial",
          "(a) [[0|The Great Compromise made a House and Senate]]. [[1|Both big and small states got something]]. (b) The 19th Amendment. (c) They are both important.",
          "Part (a) is accurate. In (b), describe the 19th Amendment and its effect, and in (c) say how both reflect competing interests.",
        ],
        [
          "partial",
          "(b) [[2|The 19th Amendment guaranteed women the right to vote]], so [[3|participation went up since millions of women could vote]]. (a) Compromises happened.",
          "Part (b) is well done. In (a), name and describe a compromise with winners and losers, and add (c).",
          true,
        ],
        [
          "weak",
          "(a) The Great Compromise gave all power to the large states. (b) The 17th Amendment made senators appointed by the president. (c) They had nothing in common.",
          "The Great Compromise balanced large and small states, and the 17th Amendment made senators directly elected by voters. Check each fact.",
        ],
        [
          "weak",
          "(a) [[0|The Three-Fifths Compromise was about counting enslaved people]]. (b) Amendments are written by the president. (c) It's all one thing.",
          "The first point is right, but amendments are proposed by Congress or a convention and ratified by states. Explain winners and an actual amendment.",
        ],
      ],
    },
    {
      prompt:
        "A bill is introduced in the House and assigned to a committee, whose chair refuses to hold hearings. Separately, a similar bill reaches the Senate floor, where its supporters have 56 votes. (a) Identify one tool House supporters could use if the committee never acted. (b) Explain why the Senate bill might still fail with 56 votes, and name the rule involved. (c) Explain how the differences between the House and the Senate lead to different outcomes.",
      scheme: [
        "Identifies the discharge petition (218 signatures) as a tool in the House",
        "Explains why 56 votes may fail in the Senate because of a filibuster",
        "Names cloture and the 60-vote requirement",
        "Explains that House rules allow majority control while the Senate protects minority rights through extended debate",
        "Links the difference to the institutional design of each chamber",
      ],
      model:
        "(a) House supporters could use a discharge petition, signed by 218 members, to force the bill out of committee. (b) With 56 votes in the Senate the bill could be filibustered, because ending debate requires cloture, a vote of 60 senators. (c) The House, with 435 members and a Rules Committee that sets the terms of debate, is designed so that a majority can generally act, while the Senate, with 100 members and rules of extended debate, protects minority rights and slows action. These differences were intended by the framers.",
      answers: [
        [
          "full",
          "(a) [[0|They could use a discharge petition signed by 218 members to force it out of committee]]. (b) [[1|Senators opposing the bill could filibuster]], and [[2|to end debate with cloture it takes 60 votes, but supporters only have 56]]. (c) [[3|The House can move on a majority, since the Rules Committee sets the terms of debate, but the Senate lets the minority extend debate and block a vote]]. [[4|That's because the framers wanted a House closer to the people and a Senate that would be slower and more deliberate]].",
          "Full marks. You tied the mechanics to the framers' design.",
        ],
        [
          "full",
          "(a) [[0|A discharge petition with 218 signatures gets a bill out of a committee that won't act]]. (b) [[1|The bill could be blocked by a filibuster, which means senators can talk to delay the vote]]. [[2|It takes 60 votes for cloture to end the debate and they have only 56]]. (c) [[3|The House works with majority rule and set time limits, but the Senate gives minority senators leverage, so a bill with majority support can pass the House and die in the Senate]]. [[4|The difference comes from size and terms: the House with 435 members and two-year terms is built to be responsive, and the Senate is smaller and slower]].",
          "All five points. Pointing to size and term length shows how structure leads to behavior.",
        ],
        [
          "partial",
          "(a) [[0|A discharge petition]]. (b) [[1|The Senate could have a filibuster]]. (c) The House is different from the Senate.",
          "Parts (a) and (b) are correct. Name the 60-vote cloture rule, and explain how and why the chambers differ.",
        ],
        [
          "partial",
          "(b) [[2|Cloture requires 60 votes and they only have 56]]. (c) [[3|The Senate gives more power to the minority than the House]].",
          "Good points on cloture and the difference. Add the discharge petition in (a) and the explanation of a filibuster and the framers' design.",
          true,
        ],
        [
          "weak",
          "(a) The president can force it out of committee. (b) 56 is a majority so it passes. (c) They are the same.",
          "The president has no such tool, and cloture needs 60 votes. The chambers have different rules. Review the tools in each chamber.",
        ],
        [
          "weak",
          "(a) [[0|A discharge petition]]. (b) The Senate has 100 members and 56 is more than half so the bill automatically becomes law. (c) No difference.",
          "The discharge petition is right. A bill needs to get past a possible filibuster and then the president. Review cloture.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Oversight, the purse, the presidency and the bureaucracy",
  note: `
## Objectives

Students will be able to:

1. explain how Congress uses its powers of oversight, the budget and committees;
2. describe the formal and informal powers of the president and the role of the bureaucracy.

## Materials

Scenario cards for oversight (a hearing, a subpoena, an appropriations rider, a confirmation fight), a budget-process chart (president's budget, budget resolution, appropriations, reconciliation, continuing resolutions), a president's-powers sort (formal and informal), a bureaucracy organizer (cabinet departments, independent agencies, regulatory commissions, government corporations), a data table (fictional agency budget: 2.0 billion dollars in year one, 2.3 billion in year two), and the exit ticket.

## Starter (8 minutes)

Pose a puzzle: "Congress writes the law, but a department of thousands of employees carries it out. How does Congress make sure that the law is carried out as intended?" List ideas and sort them into "money," "questions," "people" and "law."

## Main activity

1. Oversight tools. Students match scenario cards to tools: hearings and investigations, subpoenas, appropriations and riders, Senate confirmation, impeachment, legislative vetoes (struck down in INS v. Chadha), reporting requirements. They rank which tools are strongest and why.
2. Budget. Walk through the process: the president's budget request, the budget resolution, twelve appropriations bills, and the use of reconciliation (which passes with a simple majority in the Senate). Calculate the change in the fictional agency's budget: 2.0 to 2.3 billion dollars is a 15 percent increase.
3. President and bureaucracy. Sort formal powers (veto, commander in chief, appointments, treaties, pardons) from informal powers (executive orders, executive agreements, the bully pulpit, going public). Then study the bureaucracy: 15 executive departments, independent agencies, independent regulatory commissions and government corporations. Introduce the Pendleton Act (1883) and the civil service, and Loper Bright (2024), which ended Chevron deference.
4. Application. Groups analyze a new scenario: an agency writes a rule under a vague statute. They explain how Congress, the president and courts could each check it.

## Checking for understanding

Whiteboards: classify powers as formal or informal, and name one tool of oversight not involving money.

## Exit ticket

Which is the strongest tool of congressional oversight and why?
`,
  reading: [
    "The power of the purse, the power of the pen and the fourth branch",
    `
Congress writes laws, but the **executive branch** carries them out, and the distance between the two creates the need for **oversight**, the monitoring of how laws are executed. Congress's most powerful tool is the **power of the purse**. Under Article I, no money may be spent without an appropriation, so Congress can fund, underfund or eliminate programs. Each year it passes appropriations bills for the departments and agencies, sometimes attaching **riders**, which are provisions that change policy and ride along on a must-pass bill. The budget process begins with the president's budget request. Congress then adopts a budget resolution, writes twelve appropriations bills and sometimes uses **reconciliation**, a procedure that allows certain budget-related bills to pass the Senate with a simple majority and avoids a filibuster. When appropriations are not finished by the start of the fiscal year, Congress passes continuing resolutions to keep the government funded, and if it fails, a shutdown follows.

Other tools include **hearings** and **investigations** by committees, which can compel testimony and documents through subpoenas, and Senate **confirmation** of the president's appointments, which allows senators to question nominees about their views. Congress can also pass statutes requiring agencies to report on their activities, and, as an ultimate tool, can impeach officials. Congress once used the **legislative veto**, a resolution allowing one or both houses to cancel an executive action, but the Supreme Court struck it down in *INS v. Chadha* (1983) as violating the separation of powers.

The president's powers fall into two groups. **Formal powers**, listed in Article II, include the power to veto bills, serve as commander in chief, make treaties with Senate approval, appoint judges and officials, grant pardons and receive ambassadors. **Informal powers** are not spelled out but have grown through practice. Presidents use **executive orders** to direct the executive branch, **executive agreements** with other countries that do not need Senate approval, and the **bully pulpit**, the president's unique ability to attract public attention and set the national agenda. Presidents also use "going public," appealing directly to the people to pressure Congress. Though these powers are real, they are checked: executive orders can be overturned by courts or reversed by later presidents, and agreements can be undone by statute.

The **bureaucracy** is the set of agencies that implement policy. It has four main types. The 15 **cabinet departments**, such as Agriculture and Defense, are led by secretaries appointed by the president. **Independent agencies**, such as NASA, operate outside the departments. **Independent regulatory commissions**, such as the Federal Reserve and the Federal Communications Commission, write and enforce rules in specific industries and are designed to be insulated from direct presidential control. **Government corporations**, such as the Postal Service, provide services that could be sold. Most bureaucrats are career civil servants hired under the merit system established by the **Pendleton Act of 1883**, in response to the spoils system. They bring expertise and continuity, but critics say the agencies can resist presidential direction or make rules with limited accountability. Agencies write regulations under statutes that often leave details to them, a practice called delegation. For decades courts followed the *Chevron* doctrine, which told them to defer to an agency's reasonable reading of an unclear statute. In *Loper Bright Enterprises v. Raimondo* (2024), the Supreme Court ended that deference, directing courts to use their own judgment about what a statute means. This shifts power from agencies toward courts.

For the exam, the key is linking each tool to a branch and to the value it protects. Appropriations and oversight protect legislative power. Executive orders and appointments project presidential power. Court review protects the rule of law, and civil service rules protect expertise and merit.
`,
  ],
  cards: [
    ["Power of the purse", "Congress's constitutional control over taxing and spending."],
    ["Rider", "A policy provision attached to a bill that must pass, often an appropriations bill."],
    ["Reconciliation", "A budget procedure allowing certain bills to pass the Senate with a simple majority."],
    ["Oversight", "Congress's monitoring of how the executive branch carries out laws."],
    ["INS v. Chadha (1983)", "Struck down the legislative veto as a violation of separation of powers."],
    ["Executive agreement", "An agreement between the president and another country that does not require Senate approval."],
    ["Bully pulpit", "The president's ability to use the office to draw attention and shape public debate."],
    ["Pendleton Act (1883)", "Created a merit-based civil service to replace much of the spoils system."],
    ["Loper Bright (2024)", "Ended Chevron deference; courts now interpret statutes independently."],
  ],
  closed: [
    [
      "A House committee subpoenas documents from a federal agency to investigate how it spent funds. This is an example of:",
      ["Judicial review", "Congressional oversight", "A line-item veto", "Executive privilege"],
      "B",
    ],
    [
      "An agency's budget rises from 2.0 billion dollars to 2.3 billion. What is the percentage increase?",
      ["3 percent", "10 percent", "15 percent", "30 percent"],
      "C",
    ],
    [
      "Which of the following is an informal power of the president?",
      [
        "Vetoing a bill",
        "Using a televised address to build public support for a bill",
        "Nominating a Supreme Court justice",
        "Granting a pardon",
      ],
      "B",
    ],
    [
      "The Federal Reserve is best classified as which type of bureaucratic organization?",
      [
        "A cabinet department",
        "An independent regulatory commission",
        "A government corporation",
        "A legislative committee",
      ],
      "B",
    ],
    [
      "The Pendleton Act of 1883 is best understood as a response to:",
      [
        "The spoils system, in which jobs were given for loyalty",
        "The legislative veto",
        "The Articles of Confederation",
        "Executive agreements",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A fictional agency is given a broad statute to 'reduce harmful emissions' and issues a costly rule that angers many members of Congress. (a) Identify one way Congress could check the agency using its power over money. (b) Identify one way Congress could check the agency that does not involve money. (c) Explain how a federal court could affect the rule, and describe the effect of the Loper Bright decision on that review.",
      scheme: [
        "Identifies a money-based check, such as cutting the agency's appropriations or adding a rider barring enforcement",
        "Identifies a non-monetary check, such as hearings, a subpoena, or passing a law that overrides the rule",
        "Explains that a court could strike down the rule if it exceeds the statute or the law",
        "Explains that Loper Bright ended Chevron deference so the court interprets the statute itself",
      ],
      model:
        "(a) Congress could cut the agency's appropriation or attach a rider to a spending bill that bars the agency from enforcing the rule. (b) Congress could hold oversight hearings to question the agency's leaders, or pass a new law that overrides the rule. (c) A federal court could strike down the rule if it finds the agency exceeded the authority granted by the statute. Under Loper Bright (2024), the court no longer defers to the agency's reasonable interpretation of an ambiguous statute but decides the meaning itself, making it easier to overturn the rule.",
      answers: [
        [
          "full",
          "(a) [[0|Congress could cut the agency's funding or put a rider on a spending bill that stops it from enforcing the rule]]. (b) [[1|Congress could hold hearings to question the agency head or pass a new law that overrides the rule]]. (c) [[2|A federal court could strike down the rule if the agency went beyond what the statute allowed]]. [[3|Under Loper Bright the court doesn't have to defer to the agency's reading of a vague law and decides what the statute means, so it's easier to overturn the rule]].",
          "Full marks. Each check is distinct and your description of Loper Bright is accurate.",
        ],
        [
          "full",
          "(a) [[0|The power of the purse: Congress can reduce the agency's appropriation]]. (b) [[1|Congress can use its confirmation power to question the agency's nominees and make the agency leaders explain the rule]]. (c) [[2|Courts have judicial review, so a court could rule that the rule isn't authorized by the law]]. [[3|Since Chevron deference ended in Loper Bright, courts interpret ambiguous statutes themselves instead of accepting the agency's reasonable view, which gives courts more power over agencies]].",
          "All four points. Using confirmation as a non-monetary check is a good choice.",
        ],
        [
          "partial",
          "(a) [[0|Congress could cut the budget of the agency]]. (b) [[1|Congress could hold hearings]]. (c) Courts can do something.",
          "Parts (a) and (b) are correct. In (c), explain what the court could do and what Loper Bright changed.",
        ],
        [
          "partial",
          "(c) [[2|A court could strike down the rule if it goes beyond the statute]], and [[3|Loper Bright ended Chevron deference]]. (a) Congress can write laws.",
          "Part (c) is accurate. In (a) and (b), give a specific money-based check and a non-monetary check.",
          true,
        ],
        [
          "weak",
          "(a) The president can fire the agency. (b) The Supreme Court can pass laws. (c) Courts have no role.",
          "The question asks about Congress's checks, and courts do review agency rules. Review the tools of oversight.",
        ],
        [
          "weak",
          "(a) [[0|Cut the agency's money]]. (b) Impeach the whole agency. (c) Loper Bright made agencies more powerful.",
          "Cutting the money is right. Only officials can be impeached, not an agency, and Loper Bright gave courts more power over agencies.",
        ],
      ],
    },
    {
      prompt:
        "Analyze this president's behavior: The president fails to win a Senate vote on a trade bill, so addresses the nation on television to urge citizens to call their senators, and then negotiates an executive agreement with the foreign countries involved. (a) Identify two informal powers used. (b) Explain how each power works without requiring a new law. (c) Explain one constraint that limits each of these powers.",
      scheme: [
        "Identifies going public or the bully pulpit as an informal power",
        "Identifies the executive agreement as an informal power",
        "Explains how going public works without a new law, by shaping public pressure on senators",
        "Explains how an executive agreement works without Senate approval",
        "Explains a constraint on the informal powers, such as that public opinion may not follow, or that Congress can override an agreement by statute or defund it",
      ],
      model:
        "(a) The president used the bully pulpit by addressing the nation, and used an executive agreement. (b) The speech works by shaping public opinion and creating pressure on senators, without needing a law. An executive agreement works because it is made by the president under executive authority and does not require Senate approval, unlike a treaty. (c) Public pressure may fail if citizens do not respond or if the president's approval is low. An executive agreement can be undone by a later president, defunded by Congress or overridden by statute.",
      answers: [
        [
          "full",
          "(a) [[0|The president used the bully pulpit, going on TV to push citizens to call senators]], and [[1|an executive agreement with the other countries]]. (b) [[2|The speech works by creating public pressure on senators, and it doesn't need any law]]. [[3|The executive agreement works because it doesn't need Senate approval like a treaty does]]. (c) [[4|Both are limited: public opinion may not respond, and Congress can defund or override an executive agreement, or a later president can end it]].",
          "Full marks. Distinguishing a treaty from an executive agreement is the key point, and you gave constraints for both.",
        ],
        [
          "full",
          "(a) [[0|Going public is one, since the president appeals directly to the people instead of just bargaining with senators]]. [[1|The other is an executive agreement]]. (b) [[2|Going public works by getting voters to pressure their representatives, which doesn't take legislation]]. [[3|An executive agreement is made by the president alone and is carried out through executive power]]. (c) [[4|A speech only works if people actually listen and care, and an agreement is weak because the next president could cancel it and Congress could refuse the money to carry it out]].",
          "All five points. Your constraint on the speech, that people must actually respond, is realistic and precise.",
        ],
        [
          "partial",
          "(a) [[0|Bully pulpit]] and [[1|executive agreement]]. (b) They are powers. (c) Congress can limit them.",
          "Part (a) is correct. Explain how each works without a new law in (b) and give specific constraints in (c).",
        ],
        [
          "partial",
          "(b) [[3|An executive agreement doesn't need Senate approval]]. (c) [[4|Congress can refuse to fund it]]. (a) Speech.",
          "You describe the agreement and a constraint well. Name both informal powers in (a), and explain the speech in (b) and its constraint.",
          true,
        ],
        [
          "weak",
          "(a) Veto and pardon. (b) They don't need a law. (c) Nobody can limit them.",
          "The veto and pardon are formal powers listed in Article II, and the informal powers can be limited. Name two informal powers from the scenario.",
        ],
        [
          "weak",
          "(a) [[1|Executive agreement]]. (b) It's the same as a treaty and needs two thirds of the Senate. (c) Not sure.",
          "The executive agreement is right, but unlike a treaty it does not need Senate approval. Review the difference.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Judicial review and its limits, branches at work, and incorporation",
  note: `
## Objectives

Students will be able to:

1. explain how the Supreme Court uses judicial review and how its decisions are limited;
2. analyze how the branches interact in making and carrying out policy;
3. explain how the Bill of Rights has been incorporated against the states.

## Materials

An excerpt-summary of Federalist No. 78 (the judiciary as "the least dangerous branch"), a limits-on-the-Court matrix (internal: standing, justiciability, stare decisis; external: appointments, jurisdiction, constitutional amendment, enforcement), summaries of Marbury v. Madison, Baker v. Carr (1962) and Shaw v. Reno (1993), a case study on redistricting that traces actions of a legislature, a governor and a court, an incorporation timeline (Barron 1833, Gitlow 1925, Mapp 1961, Gideon 1963, McDonald 2010), and the exit ticket.

## Starter (8 minutes)

Pose: "Nine unelected justices can strike down laws passed by elected officials. What limits them?" Collect answers and sort them into limits from inside the Court and limits from outside.

## Main activity

1. Judicial review and its limits. Read the Federalist No. 78 summary. Students fill in the matrix: standing and the requirement of a real case or controversy, the political question doctrine, stare decisis and the rule of four on the inside; Senate confirmation, Congress's control of jurisdiction and the size of the Court, constitutional amendments (the 14th Amendment overturning Dred Scott) and the Court's dependence on others to enforce its rulings on the outside. Compute: about 4,000 petitions per year and about 60 cases argued means about 1.5 percent are heard.
2. Policy interaction. Trace a redistricting case: the legislature draws congressional maps, the governor signs, groups sue, courts review. In Baker v. Carr, the Court held that claims about unequal district populations can be heard in federal court; in Shaw v. Reno, it held that districts drawn primarily by race may violate equal protection. Students compute the deviation between districts of 700,000 and 770,000.
3. Incorporation. Students order the timeline and explain selective incorporation through the Due Process Clause of the Fourteenth Amendment.

## Checking for understanding

Whiteboards: "Is this an internal or external limit on the Court?" for six examples.

## Exit ticket

Choose one limit on the Court and explain whether it is stronger or weaker than the Court's power of review.
`,
  reading: [
    "The least dangerous branch, and the work of incorporating the Bill of Rights",
    `
In **Federalist No. 78**, Alexander Hamilton described the judiciary as the "least dangerous" branch, because it controls neither the sword, which belongs to the executive, nor the purse, which belongs to the legislature, and has "neither force nor will, but merely judgment." Hamilton argued that this weakness required independence, so judges serve for life during good behavior, and that independence would let courts keep the legislature within the limits of the Constitution. In *Marbury v. Madison* (1803), Chief Justice Marshall turned that argument into **judicial review**: courts may declare laws and executive actions unconstitutional. The Court has used the power sparingly in some periods and boldly in others.

Several limits restrain the Court. Some are internal. A federal court may decide only an actual **case or controversy**, brought by a party with **standing**, meaning someone who has been or will be directly harmed. The Court avoids **political questions** better handled by the elected branches, and it normally follows precedent, the doctrine of *stare decisis*. It controls its docket: it receives about 4,000 petitions each year and hears about 60, roughly 1.5 percent, and grants review when four of nine justices agree. Other limits are external. The president nominates and the Senate confirms justices, so elected officials shape the Court's makeup over time. Congress can change the Court's size, control much of the federal courts' jurisdiction and pass new laws in response to rulings. The people can amend the Constitution to reverse a decision, as the Fourteenth Amendment did for the Dred Scott ruling. And the Court depends on the executive and states to carry out its decisions, which has sometimes slowed their effect, as in the long delay in school desegregation after *Brown v. Board of Education*.

Policy is rarely made by one branch. Consider redistricting, the drawing of congressional district lines after each census. State legislatures usually draw the maps and governors sign them, an example of lawmaking at the state level, but disputes go to the courts. In *Baker v. Carr* (1962), the Court held that challenges to unequal district populations are not political questions and may be heard in federal court. It was followed by *Reynolds v. Sims* (1964), which established the principle of "one person, one vote." In *Shaw v. Reno* (1993), the Court held that a district drawn so irregularly that race appeared to be its main purpose could violate the Equal Protection Clause. If one district has 700,000 people and another 770,000, the larger has about 10 percent more residents, so each vote in the larger district counts for less. Courts therefore review the maps, legislatures redraw them and governors and voters respond, so all three branches and the states interact.

The same pattern of interaction appears in civil liberties. The Bill of Rights originally restrained only the national government, as *Barron v. Baltimore* (1833) held. After the Fourteenth Amendment's ratification in 1868, the Court began to apply, or **incorporate**, specific rights against state governments through the Due Process Clause, one at a time, a process called **selective incorporation**. In *Gitlow v. New York* (1925), the Court assumed that freedom of speech binds the states. In *Mapp v. Ohio* (1961), it applied the exclusionary rule, and in *Gideon v. Wainwright* (1963), the right to counsel. In *McDonald v. Chicago* (2010), it held that the Second Amendment right recognized in *Heller* also limits state and local governments. Today nearly every provision of the Bill of Rights is incorporated, with some exceptions such as the Third Amendment's ban on quartering soldiers and the Fifth Amendment's right to a grand jury indictment, which the Court has not applied to states.

When answering questions, name the specific case and the principle it established, and show how the branches or levels of government interact, instead of describing the Court alone.
`,
  ],
  cards: [
    ["Federalist No. 78", "Hamilton's argument that the judiciary is the least dangerous branch and needs independence."],
    ["Standing", "The requirement that a party have been or will be directly harmed to bring a case."],
    ["Political question", "An issue the Court leaves to the elected branches."],
    ["Stare decisis", "The practice of following precedent in deciding cases."],
    ["Baker v. Carr (1962)", "Challenges to unequal district populations can be heard by federal courts."],
    ["Shaw v. Reno (1993)", "A district drawn primarily on the basis of race may violate equal protection."],
    ["Selective incorporation", "The Court's application of Bill of Rights protections to states one at a time via the Fourteenth Amendment."],
    ["McDonald v. Chicago (2010)", "Held the Second Amendment right applies to state and local governments."],
  ],
  closed: [
    [
      "About 4,000 petitions are filed each year and about 60 cases are argued. About what percent of petitions are heard?",
      ["About 0.15 percent", "About 1.5 percent", "About 15 percent", "About 60 percent"],
      "B",
    ],
    [
      "A group sues over a law that has never been enforced against anyone, and no one has been harmed. The Court dismisses the case for lack of standing. This is an example of:",
      [
        "An external limit on the Court",
        "An internal limit on the Court",
        "Judicial activism",
        "Selective incorporation",
      ],
      "B",
    ],
    [
      "Which of the following is an external limit on the Supreme Court?",
      [
        "Stare decisis",
        "The Senate's power to confirm justices",
        "The rule of four",
        "The case-or-controversy requirement",
      ],
      "B",
    ],
    [
      "Baker v. Carr is best summarized as holding that:",
      [
        "Districts must be drawn on the basis of race",
        "Claims about unequal district populations may be heard in federal courts",
        "States may not draw districts",
        "Congressional districts must be equal to the last person",
      ],
      "B",
    ],
    [
      "The Supreme Court holds that a state's ban on handguns violates the Second Amendment. This ruling depends on which doctrine?",
      [
        "Judicial review only",
        "Selective incorporation of the Second Amendment against the states",
        "The Supremacy Clause alone",
        "Federalism only",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A federal court strikes down a state law restricting political protests, and the state's legislature responds by passing a new law limiting the court's jurisdiction. (a) Identify the Supreme Court power used by the court and the doctrine that lets it apply the First Amendment to a state. (b) Explain one way Congress or the executive could limit the effect of a Court decision. (c) Explain why Hamilton in Federalist No. 78 considers the judiciary the weakest branch, and how that supports independence.",
      scheme: [
        "Identifies judicial review as the power used",
        "Identifies selective incorporation through the Fourteenth Amendment as the doctrine that applies the First Amendment to a state",
        "Explains a way another branch could limit the effect of a decision, such as constitutional amendment, new legislation, controlling jurisdiction, or refusing to enforce",
        "Explains that Hamilton says the judiciary has neither force nor will but only judgment, and so needs independence such as life tenure",
      ],
      model:
        "(a) The court used judicial review, and the doctrine that lets it apply the First Amendment to a state is selective incorporation through the Due Process Clause of the Fourteenth Amendment. (b) Congress could propose a constitutional amendment to reverse the decision, or could pass a new law within constitutional limits, or limit the courts' jurisdiction. (c) Hamilton argues that the judiciary has neither the sword nor the purse, only judgment, so it is the weakest branch, and that life tenure during good behavior is needed so that judges can rule against the other branches without fear.",
      answers: [
        [
          "full",
          "(a) [[0|The court used judicial review]], and [[1|selective incorporation, which uses the Fourteenth Amendment's Due Process Clause to apply First Amendment rights to states]]. (b) [[2|Congress could propose a constitutional amendment to reverse the decision, or limit what cases courts can hear]]. (c) [[3|Hamilton said the judiciary has neither force nor will, only judgment, because it doesn't control the army or the money, so it needs independence like life tenure to be willing to rule against the other branches]].",
          "Full marks. Each part names the correct doctrine, and your answer in (c) explains why weakness supports independence.",
        ],
        [
          "full",
          "(a) [[0|Judicial review is the power]], and [[1|selective incorporation is the doctrine, which makes states follow the Bill of Rights through the Fourteenth Amendment]]. (b) [[2|The executive could weaken a decision by being slow to enforce it, as happened after Brown v. Board]]. (c) [[3|Federalist 78 says the courts don't have the sword or the purse and only have judgment, so judges serving for life during good behavior can decide without fear of the other branches]].",
          "All four points. The reference to slow enforcement after Brown is exactly the kind of evidence the question wants.",
        ],
        [
          "partial",
          "(a) [[0|Judicial review]]. (b) [[2|Congress could amend the Constitution]]. (c) Hamilton liked judges.",
          "Parts (a) and (b) are right. Name the doctrine for applying the First Amendment to states, and explain Hamilton's reasoning in (c).",
        ],
        [
          "partial",
          "(a) [[1|Selective incorporation applies the Bill of Rights to states through the Fourteenth Amendment]]. (c) [[3|Hamilton said the judiciary only has judgment, not force or will]].",
          "Good on the doctrine and Hamilton. Name judicial review in (a) and give a way to limit the decision in (b).",
          true,
        ],
        [
          "weak",
          "(a) The court used the veto and the First Amendment applies automatically. (b) The president can overturn the court. (c) Hamilton thought judges should be elected.",
          "Courts do not use vetoes, and Hamilton argued for life tenure, not elections. Review judicial review and Federalist No. 78.",
        ],
        [
          "weak",
          "(a) [[0|Judicial review]]. (b) Nobody can limit the Court. (c) The Court is the strongest branch.",
          "Judicial review is right, but the Court is limited from inside and outside and Hamilton called it the weakest branch. Explain those limits.",
        ],
      ],
    },
    {
      prompt:
        "Two congressional districts in a state have 700,000 and 770,000 residents. (a) Calculate how much larger the second district is as a percent of the first. (b) Explain, using Baker v. Carr, why a voter in the second district could bring a federal case. (c) Explain how Shaw v. Reno limits a legislature's response to such a challenge, and describe how this illustrates interaction among the branches.",
      scheme: [
        "Correctly calculates the 10 percent difference (70,000 divided by 700,000)",
        "Explains that Baker v. Carr made unequal district populations a matter federal courts can hear",
        "Explains that a voter in the larger district has less voting power per person",
        "Explains that Shaw v. Reno limits redrawing districts primarily on the basis of race, so a legislature must draw lines without making race the main factor",
        "Explains the interaction among legislature, courts and the executive or state officials",
      ],
      model:
        "(a) The difference is 70,000, and 70,000 divided by 700,000 is 10 percent. (b) Under Baker v. Carr, claims about unequal district populations are not political questions and can be heard in federal court. A voter in the larger district has less voting power per person, so the voter may sue. (c) Shaw v. Reno limits how the legislature fixes the problem, because a district drawn primarily on race may violate equal protection. The legislature must therefore balance population equality with race-neutral criteria. This shows the legislature drawing, the courts reviewing and officials responding.",
      answers: [
        [
          "full",
          "(a) [[0|The second district has 70,000 more, and 70,000 divided by 700,000 is 10 percent]]. (b) [[1|Under Baker v. Carr unequal district populations are not a political question, so federal courts can hear the case]]. [[2|A voter in the bigger district has less voting power per person, so there's a real harm to bring a case over]]. (c) [[3|Shaw v. Reno says the legislature can't redraw the lines mainly on the basis of race, so it has to equalize population in another way]]. [[4|The legislature draws, the court reviews and the governor and election officials carry out the new map, so all of them interact]].",
          "Full marks. You included the calculation, both cases and a clear picture of the branches interacting.",
        ],
        [
          "full",
          "(a) [[0|770,000 minus 700,000 is 70,000, and that's 10 percent of 700,000]]. (b) [[1|Baker v. Carr said courts can hear complaints about districts with unequal populations]], [[2|because people in the larger district have less say per person, so each vote counts for less]]. (c) [[3|Shaw v. Reno says a legislature can't use race as the predominant factor when it redraws, so it can't simply move people around by race to fix the numbers]]. [[4|It shows the court checking the legislature while the legislature and governor have to carry out what the court allows]].",
          "All five points. Your explanation of why each vote counts less in the bigger district is the core of the equal-representation argument.",
        ],
        [
          "partial",
          "(a) [[0|The difference is 10 percent]]. (b) [[1|Baker v. Carr allows federal courts to hear it]]. (c) Shaw v. Reno is about districts.",
          "Parts (a) and (b) are accurate. Explain why the voter has a harm and what Shaw v. Reno limits.",
        ],
        [
          "partial",
          "(c) [[3|Shaw v. Reno limits drawing districts mainly on race]], and [[4|the legislature and court interact]]. (a) It's 7 percent.",
          "Part (c) is good. In (a), 70,000 divided by 700,000 is 10 percent, not 7.",
          true,
        ],
        [
          "weak",
          "(a) 770,000 is 70 percent larger. (b) Baker v. Carr says districts have to be drawn by race. (c) Shaw v. Reno requires equal districts.",
          "The difference is 10 percent. Baker v. Carr is about equal population and Shaw v. Reno limits race-based drawing. Review the cases.",
        ],
        [
          "weak",
          "(a) [[0|About 10 percent]]. (b) The court should stay out of politics. (c) The president draws districts.",
          "Ten percent is right. Baker v. Carr says federal courts can hear these claims, and legislatures, not presidents, draw districts. Review who acts.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "First Amendment cases applied, and how civil rights movements won change",
  note: `
## Objectives

Students will be able to:

1. apply the First Amendment cases required for the course to a new scenario;
2. describe how civil rights movements used the courts, protest and legislation to expand equality.

## Materials

Case summary cards for Engel v. Vitale (1962), Wisconsin v. Yoder (1972), Tinker v. Des Moines (1969), Schenck v. United States (1919) and New York Times v. United States (1971); two new scenario cards based on Kennedy v. Bremerton School District (2022) and Mahanoy Area School District v. B.L. (2021) (teacher-written summaries); a civil rights timeline (Brown 1954, Montgomery 1955 to 1956, Civil Rights Act 1964, Voting Rights Act 1965, Shelby County 2013, Title IX 1972); a strategies chart (litigation, direct action, legislation); a short quiz; and the exit ticket.

## Starter (8 minutes)

Pose: "A high school football coach kneels to pray after a game at midfield. Is that the coach's own speech and religion, or is it the school endorsing religion?" Take positions and name the clauses involved.

## Main activity

1. Apply the cases. Groups take a new scenario and write an answer in the form: identify the First Amendment clause, name the required case and a fact it shares with the scenario, state the holding, and explain how the new facts are similar or different. For example, Kennedy v. Bremerton (2022) resembles Engel because both involve prayer in public school, but differs because the coach's prayer was personal and not led by the school; the Court found it protected. Mahanoy (2021) compares to Tinker: a student's off-campus social media post and school discipline; the Court ruled for the student, saying schools have a reduced interest in off-campus speech.
2. Strategies for change. Students sort civil rights events into three strategies: litigation (NAACP in Brown), direct action (the Montgomery bus boycott, 381 days from December 1955 to December 1956; sit-ins), and legislation (the Civil Rights Act of 1964, Voting Rights Act of 1965). They explain how each strategy supported the others.
3. Limits and reversals. Discuss Shelby County v. Holder (2013), which struck down the formula that identified places needing federal preclearance, and Title IX (1972) as a legislative response for gender equity in education.

## Checking for understanding

Quiz of five questions in the exam format, then a self-check against a scoring guide.

## Exit ticket

Write one sentence comparing a required case with its modern counterpart, using the format: "Like ___, ___; unlike ___, ___."
`,
  reading: [
    "Prayer, protest and the road from courtroom to legislature",
    `
Five First Amendment cases are required for the AP course, and the exam asks students to apply them to unfamiliar facts. **Engel v. Vitale** (1962) held that a prayer written by state officials for recitation in public schools violates the **Establishment Clause**, even if it is nondenominational and voluntary. **Wisconsin v. Yoder** (1972) held that Amish parents could not be required to send their children to school past eighth grade, because it burdened their religious practice under the **Free Exercise Clause** and the state's interest was not strong enough to override it. **Tinker v. Des Moines** (1969) held that students keep free speech rights at school, so a school may restrict student expression only if it would substantially disrupt the educational environment. **Schenck v. United States** (1919) upheld the conviction of a man for distributing leaflets that urged resistance to the draft during World War I, applying the "clear and present danger" test. And **New York Times v. United States** (1971) held that the government may not stop newspapers from publishing the Pentagon Papers, since prior restraint of the press faces a heavy presumption of invalidity.

The skill is comparison. A modern case may resemble a required one and yet differ in ways that matter. In *Kennedy v. Bremerton School District* (2022), a Washington high school football coach knelt and prayed at midfield after games, and the school district placed him on leave. Like *Engel*, the case involves prayer connected to a public school. Unlike *Engel*, the prayer was the coach's own and not composed or led by officials, and the Court held that the district violated his free exercise and free speech rights. A student who explains why those differences changed the result shows the reasoning the exam asks for. In *Mahanoy Area School District v. B.L.* (2021), a high school cheerleader posted a profane message on social media off campus after failing to make the varsity squad, and the school suspended her from cheerleading. Like *Tinker*, the case concerned student speech and school discipline. Unlike *Tinker*, the speech occurred off campus, and the Court held for the student, reasoning that a school's interest in regulating off-campus speech is weaker, though not zero.

The civil rights movement used three main strategies. **Litigation** by the NAACP's lawyers led to *Brown v. Board of Education* (1954), which held that segregated public schools violate equal protection. The decision's enforcement was slow, which showed that rulings needed more support. **Direct action** such as boycotts, sit-ins and marches built pressure. The Montgomery bus boycott, begun in December 1955 after Rosa Parks's arrest, lasted 381 days and ended after the Supreme Court affirmed a lower court's ruling against bus segregation. In his 1963 letter from a Birmingham jail, Martin Luther King Jr. argued that people have a moral duty to disobey unjust laws, openly and accepting the penalty, and that waiting for change often means it never comes. **Legislation** followed. The Civil Rights Act of 1964 banned discrimination in public accommodations and employment, and the Voting Rights Act of 1965 outlawed practices such as literacy tests and set up federal preclearance for places with a history of discrimination. The 24th Amendment (1964) banned poll taxes in federal elections.

Gains have been contested. In *Shelby County v. Holder* (2013), the Court held that the formula used to decide which places needed preclearance was outdated, which effectively ended the requirement until Congress writes a new one. Other movements used similar strategies. Title IX of the Education Amendments of 1972 bars sex discrimination in federally funded education, including athletics.

A good answer on the exam names a strategy, the event that illustrates it and the way a different branch or level of government responded. It treats the courts, protest and legislation as parts of a system in which each depended on the others.
`,
  ],
  cards: [
    ["Engel v. Vitale (1962)", "School-sponsored prayer in public schools violates the Establishment Clause."],
    ["Wisconsin v. Yoder (1972)", "Amish families could not be compelled to send children to school past eighth grade; Free Exercise outweighed the state's interest."],
    ["Tinker v. Des Moines (1969)", "Students keep free speech rights unless the speech substantially disrupts school."],
    ["Schenck v. United States (1919)", "Speech creating a clear and present danger can be punished."],
    ["New York Times v. United States (1971)", "The government generally cannot stop publication in advance (prior restraint)."],
    ["Kennedy v. Bremerton (2022)", "A coach's personal prayer after games was protected speech and free exercise."],
    ["Mahanoy v. B.L. (2021)", "A school's power to punish off-campus student speech is limited."],
    ["Shelby County v. Holder (2013)", "Struck down the Voting Rights Act coverage formula for preclearance."],
  ],
  closed: [
    [
      "A public high school principal leads the student body in a prayer written by the district. Which case most directly applies?",
      ["Tinker v. Des Moines", "Engel v. Vitale", "Wisconsin v. Yoder", "Schenck v. United States"],
      "B",
    ],
    [
      "A student wears a quiet protest button that disrupts no classes, and the school orders her to remove it. Under Tinker, the school's action is most likely:",
      [
        "Constitutional, because schools can limit any speech",
        "Unconstitutional, because the speech did not substantially disrupt school",
        "Constitutional if the principal disagrees with the message",
        "Required by the First Amendment",
      ],
      "B",
    ],
    [
      "The Montgomery bus boycott lasted 381 days beginning December 5, 1955. In about how many months did it end?",
      ["About 6 months", "About 9 months", "About 12.5 months", "About 20 months"],
      "C",
    ],
    [
      "Which best illustrates the strategy of litigation in the civil rights movement?",
      [
        "The Montgomery bus boycott",
        "The NAACP arguing Brown v. Board of Education",
        "A sit-in at a lunch counter",
        "The passage of the Civil Rights Act of 1964",
      ],
      "B",
    ],
    [
      "Which feature distinguishes Kennedy v. Bremerton from Engel v. Vitale?",
      [
        "Kennedy involved a private school",
        "The prayer in Kennedy was the coach's own, not composed or led by the school",
        "Engel involved a coach",
        "Kennedy was decided in 1962",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Read the scenario: A public high school student posts a political message on social media from home on a Saturday, criticizing the principal's decision to cancel a student event. The school suspends the student from the football team. (a) Identify the right at issue. (b) Identify a required case relevant to this scenario and explain its holding. (c) Explain how the facts of this scenario are similar to or different from those in the required case, and how that might affect the outcome.",
      scheme: [
        "Identifies freedom of speech as the right at issue",
        "Identifies Tinker v. Des Moines and states its holding about substantial disruption",
        "Explains a similarity, such as a student's speech and school discipline",
        "Explains a difference, such as the off-campus setting, and how it could affect the outcome",
      ],
      model:
        "(a) The right at issue is freedom of speech under the First Amendment. (b) The required case is Tinker v. Des Moines, in which the Court held that students do not lose their free speech rights at school and that schools may restrict student speech only if it substantially disrupts the educational environment. (c) The scenario is similar because a student is punished by a public school for expressing a political view. It differs because the post was made off campus on a weekend, so the school has weaker authority to regulate it. That difference makes it more likely the student's speech is protected unless it caused substantial disruption at school.",
      answers: [
        [
          "full",
          "(a) [[0|The right is freedom of speech under the First Amendment]]. (b) [[1|The case is Tinker v. Des Moines, which held that students keep their free speech rights at school and the school can only restrict them if the speech would substantially disrupt education]]. (c) [[2|It's similar because a student is being punished by a public school for a political message]]. [[3|It's different because the post was made off campus at home on a Saturday, so the school has less power to regulate it, and the student is more likely to win unless the post disrupted school]].",
          "Full marks. You identified a similarity and a difference and explained what the difference does to the outcome.",
        ],
        [
          "full",
          "(a) [[0|Freedom of speech]]. (b) [[1|Tinker v. Des Moines held that a school can limit student speech only if it substantially disrupts the learning environment, and students don't shed their rights at the schoolhouse gate]]. (c) [[2|Both involve a student criticizing something and being punished by a public school]]. [[3|The difference is that Tinker's armbands were worn at school and this was at home, so the school's interest in controlling the speech is weaker and the Court, as it did in Mahanoy, would likely protect it]].",
          "All four points. Bringing in Mahanoy shows you know the modern case.",
        ],
        [
          "partial",
          "(a) [[0|Free speech]]. (b) [[1|Tinker held students keep their rights unless it substantially disrupts school]]. (c) It's about the same.",
          "Parts (a) and (b) are right. In (c) explain a specific similarity and a difference and what they mean for the outcome.",
        ],
        [
          "partial",
          "(c) [[2|Both involve a student punished for speech]], but [[3|this one happened off campus]]. (a) The Constitution.",
          "Good comparison. In (a) name the right and in (b) name Tinker and state its holding.",
          true,
        ],
        [
          "weak",
          "(a) The right to religion. (b) Engel v. Vitale says schools can punish speech. (c) The school wins because it can control students.",
          "This is a speech issue, not religion, and Engel is about school prayer. Tinker is the required case. Review the holdings.",
        ],
        [
          "weak",
          "(a) [[0|Free speech]]. (b) Schenck says the student is a danger. (c) No difference.",
          "Free speech is right. Schenck concerns draft leaflets, and Tinker is the better match. Explain the similarities and differences.",
        ],
      ],
    },
    {
      prompt:
        "Explain how the civil rights movement used (a) litigation, (b) direct action and (c) legislation to expand equality. For each, give one specific example and explain how it supported the other strategies. Then state which you think was most essential and why.",
      scheme: [
        "Gives an accurate example of litigation, such as Brown v. Board of Education",
        "Gives an accurate example of direct action, such as the Montgomery bus boycott or sit-ins",
        "Gives an accurate example of legislation, such as the Civil Rights Act of 1964 or the Voting Rights Act of 1965",
        "Explains how the strategies supported each other",
        "States which strategy was most essential",
        "Gives a reason for the judgment",
      ],
      model:
        "(a) The NAACP's litigation led to Brown v. Board of Education (1954), which held that segregated schools were unequal. (b) The Montgomery bus boycott of 1955 to 1956 was direct action that lasted 381 days. (c) The Civil Rights Act of 1964 banned discrimination in public accommodations and employment. The strategies supported each other: the Brown decision gave legal support to protesters, the protests created public pressure on Congress, and legislation gave the government power to enforce what courts had said. I think legislation was most essential because it provided enforcement and covered more areas than court cases, but it depended on the other two.",
      answers: [
        [
          "full",
          "(a) [[0|Litigation: the NAACP argued Brown v. Board of Education, which ended legal segregation in schools]]. (b) [[1|Direct action: the Montgomery bus boycott lasted 381 days in 1955 and 1956]]. (c) [[2|Legislation: the Civil Rights Act of 1964 banned discrimination in public places and jobs]]. [[3|They supported each other because Brown gave moral and legal backing to protests, the protests created pressure on Congress, and the laws gave the government the power to enforce rights that courts had only declared]]. [[4|I think legislation was most essential]] because [[5|Brown had been slow to take effect without enforcement, and the Civil Rights Act covered jobs and public places across the country]].",
          "Full marks. Your reason for choosing legislation is backed by the slow enforcement of Brown.",
        ],
        [
          "full",
          "(a) [[0|The NAACP Legal Defense Fund's litigation led to Brown v. Board]]. (b) [[1|Sit-ins at lunch counters were direct action that made segregation visible]]. (c) [[2|The Voting Rights Act of 1965 outlawed literacy tests and had federal oversight of voting in places with a history of discrimination]]. [[3|The strategies worked together because the Selma marches created public pressure that helped pass the Voting Rights Act, and court cases gave a legal basis for the demands]]. [[4|I think direct action was most essential]] because [[5|without public pressure and attention, Congress and presidents probably wouldn't have acted, and the courts had already ruled in Brown with little result]].",
          "All six points. Choosing direct action and defending it with the slow results after Brown is a strong, different judgment.",
        ],
        [
          "partial",
          "(a) [[0|Brown v. Board is litigation]]. (b) [[1|The Montgomery bus boycott]]. (c) The Civil Rights Act. They all helped.",
          "Two examples are well explained. Describe the Civil Rights Act, explain how the strategies supported each other and judge which was most essential.",
        ],
        [
          "partial",
          "(c) [[2|The Civil Rights Act of 1964 banned discrimination in jobs]]. [[4|I think legislation was the most essential]]. [[3|They all work together]].",
          "Good on legislation and your choice. Give examples of litigation and direct action, and explain with specifics how they supported each other.",
          true,
        ],
        [
          "weak",
          "(a) Litigation is protests. (b) Direct action is passing laws. (c) Legislation is courts. They all were done by Martin Luther King.",
          "These definitions are mixed up. Litigation is court cases, direct action is protest, and legislation is laws. Many people and groups were involved.",
        ],
        [
          "weak",
          "(a) [[0|Brown v. Board was litigation]]. (b) Direct action is when lawyers argue cases in court. (c) The strategies did not support each other.",
          "Brown is right, but direct action means protest such as the Montgomery boycott or sit-ins, and the strategies reinforced each other. Review the three terms.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Skills: reading a foundational document and analyzing political-behavior data",
  note: `
## Objectives

Students will be able to:

1. read and interpret a required foundational document, such as Federalist No. 10, and explain its argument;
2. analyze quantitative data in a chart or a table about political behavior.

## Materials

A paraphrased, annotated outline of Federalist No. 10 with line prompts (problem, causes, cures, solution, republic versus democracy), a fictional county data table of 2024 general-election turnout by age group (registered voters: 18 to 29 had 60,000, 30 to 44 had 80,000, 45 to 64 had 90,000, 65 and over had 70,000; turnout rates 41, 62, 74 and 80 percent), a quantitative-analysis scoring guide (identify, describe, draw a conclusion, explain, predict a consequence), calculators, and the exit ticket.

## Starter (8 minutes)

Ask: "If the 18 to 29 age group voted at the same rate as the 65-and-over group, would candidates talk differently? What does the data you would need look like?" Take a few predictions.

## Main activity

1. Close reading. In pairs, students annotate the outline of Federalist No. 10 using the prompts: What is the problem? Why can't the causes be removed? What are the two ways to control the effects? How does a republic differ from a democracy for Madison? Why does Madison think the extended republic is better? Pairs write a three-sentence summary and exchange summaries.
2. Quantitative analysis. Using the table, students compute the number of voters in each group (24,600; 49,600; 66,600; 56,000), the total (196,800) and the overall turnout (about 65.6 percent). They then compare each group's share of registered voters with its share of actual voters (the 65-and-over group is 23.3 percent of registered voters but about 28.5 percent of actual voters).
3. Writing to the scoring guide. Students answer five parts in the exam's quantitative format: identify the trend; describe a difference; draw a conclusion; explain a reason, such as political socialization, voter mobilization or the effect of life events and registration barriers; and predict one consequence, such as candidates and policy focusing on older voters.

## Checking for understanding

Pairs swap answers and mark them against the guide.

## Exit ticket

Write one claim that the data support and one claim it cannot support.
`,
  reading: [
    "Reading Madison closely and reading numbers honestly",
    `
Two kinds of reading dominate the free-response section of the exam: close reading of a foundational document and careful reading of data. Both ask a student to separate what a source says from what one would like it to say.

Start with Federalist No. 10. Madison begins with a problem: popular governments have tended to die of faction. He defines faction not by number but by the opposition of its aims to the rights of other citizens or the long-term good of the community, so a faction can be a majority or a minority. He then asks what can be done. Two methods exist for curing the mischief of faction: remove its causes, or control its effects. Removing the causes would mean either destroying liberty, which is the air that faction breathes, or giving every citizen the same opinions, passions and interests, which is impossible because people differ in their abilities and in the property they hold. So the causes are built into human nature and society. If a faction is a minority, majority rule will defeat it. The great danger is a majority faction, which could oppress the minority while still following the rules of popular government. Madison's solution is to contrast a pure **democracy**, in which citizens administer the government directly, with a **republic**, in which a small number of elected representatives do. A republic, he argues, can refine public views by passing them through representatives who are able to judge the true interest of the country, and it can govern a larger area and population. The larger the society, the greater the variety of interests and parties within it, so a majority of the whole is less likely to share one motive to invade the rights of others, and if it does, it is harder for its members to find each other and act together. Notice what the argument does not say. It does not say factions are good, and it does not say that elected representatives are always wise. It claims that the structure of an extended republic makes oppression less likely than the alternatives.

Now turn to data. Imagine a county whose registered voters include 60,000 aged 18 to 29, 80,000 aged 30 to 44, 90,000 aged 45 to 64 and 70,000 aged 65 and over, with turnout of 41, 62, 74 and 80 percent. Multiply to find votes cast: 24,600, 49,600, 66,600 and 56,000, a total of 196,800 out of 300,000 registered, or about 65.6 percent. The oldest group is 23.3 percent of registered voters (70,000 out of 300,000) but 28.5 percent of voters who actually turned out (56,000 out of 196,800), while the youngest group is 20 percent of registrants but only 12.5 percent of voters. The trend is clear: turnout rises with age.

A careful reader draws a conclusion that matches the data. It would be accurate to say that in this county older registered voters turn out at higher rates, and that older voters are overrepresented among those who vote. It would not be accurate to say that young people do not care about politics, because the table does not measure interest or reasons. The table also covers only registered voters, so it cannot show how many young people are not registered. To explain a pattern, a student brings in concepts from the course. **Political socialization** and habit may build voting over a lifetime. Older people tend to be more settled in a community and are more often contacted by campaigns and parties. Younger people move more often, and must re-register when they do. A consequence is that candidates may focus their messages and policy promises on groups that vote, which creates incentives that can reinforce the gap.

On the exam, answers earn points when they use specific numbers from the data and name a course concept in a sentence that links the two.
`,
  ],
  cards: [
    ["Faction (Madison)", "A group, majority or minority, united by interests opposed to the rights of others or the community's long-term interests."],
    ["Two cures for faction", "Remove its causes (impossible without destroying liberty) or control its effects (Madison's choice)."],
    ["Democracy versus republic (Madison)", "A democracy is direct rule by citizens; a republic is rule by elected representatives."],
    ["Extended republic", "A large republic whose variety of interests makes a majority faction less likely."],
    ["Voter turnout", "The share of eligible or registered voters who actually vote."],
    ["Political socialization", "The process by which people learn political attitudes and habits, such as through family, school and community."],
    ["Quantitative analysis", "Using data to identify a trend, draw a conclusion and explain it, and not claiming more than the data show."],
    ["Overrepresentation", "A group making up a larger share of voters than of the population."],
  ],
  closed: [
    [
      "The table shows 60,000 registered voters aged 18 to 29, with turnout of 41 percent. How many of them voted?",
      ["2,460", "24,600", "41,000", "60,000"],
      "B",
    ],
    [
      "In the county, 56,000 of 196,800 voters were 65 and over. About what percent of all voters were in this age group?",
      ["About 12.5 percent", "About 23.3 percent", "About 28.5 percent", "About 80 percent"],
      "C",
    ],
    [
      "Which conclusion is best supported by the county table?",
      [
        "Young people are uninterested in politics",
        "Among registered voters in this county, turnout rises with age",
        "Older voters always support the same candidate",
        "Voting should be mandatory",
      ],
      "B",
    ],
    [
      "Madison argues that in Federalist No. 10 the causes of faction cannot be removed because:",
      [
        "Government has never tried",
        "Removing them would require destroying liberty or making everyone have the same opinions and interests",
        "Factions are always minorities",
        "Representatives are corrupt",
      ],
      "B",
    ],
    [
      "A candidate in the county spends most of her advertising on voters over 45. Which is the most likely reason, based on the data?",
      [
        "Voters over 45 are less likely to vote",
        "Voters over 45 turn out at higher rates and make up a larger share of actual voters",
        "Younger voters do not live in the county",
        "She is required by law",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Using the county data (registered voters: 18 to 29 had 60,000, 30 to 44 had 80,000, 45 to 64 had 90,000, 65 and over had 70,000; turnout: 41, 62, 74 and 80 percent): (a) Identify the trend in turnout by age. (b) Describe the difference in votes cast between the 45 to 64 group and the 18 to 29 group, using numbers. (c) Draw a conclusion about the age groups' share of the electorate. (d) Explain one reason for the pattern using a course concept. (e) Explain one likely consequence of the pattern for how candidates campaign.",
      scheme: [
        "Identifies that turnout increases with age",
        "Describes the difference in votes cast using correct numbers (66,600 versus 24,600, a difference of 42,000)",
        "Draws a conclusion that older groups make up a larger share of voters than of registered voters, and the youngest a smaller share",
        "Explains a reason for the pattern using a course concept such as political socialization or mobilization by parties",
        "Explains a consequence such as candidates targeting older voters in messages and policy",
      ],
      model:
        "(a) Turnout rises with age, from 41 percent for 18 to 29 to 80 percent for 65 and over. (b) The 45 to 64 group cast 66,600 votes and the 18 to 29 group 24,600, a difference of 42,000. (c) Older voters make up a larger share of those who vote than of those registered, while the youngest group makes up a smaller share. (d) Political socialization is one reason: voting is a habit built over time, and older residents are more settled and more often contacted by parties. (e) Candidates may focus their messages and policies on older voters, since they are more likely to vote.",
      answers: [
        [
          "full",
          "(a) [[0|Turnout goes up as age goes up, from 41 percent to 80 percent]]. (b) [[1|The 45 to 64 group cast 66,600 votes and the 18 to 29 group cast 24,600, so about 42,000 more]]. (c) [[2|Older voters are a bigger share of actual voters than of registered voters, and the 18 to 29 group is a smaller share of voters than of registered voters]]. (d) [[3|Political socialization is one reason, because voting is a habit that people develop over time, and older people are more settled and contacted more by parties]]. (e) [[4|Candidates probably focus their ads and promises on older voters because they're more likely to vote]].",
          "Full marks. Each part uses a number or a course concept and your conclusion matches the data.",
        ],
        [
          "full",
          "(a) [[0|The trend is that older age groups vote at higher rates]]. (b) [[1|Votes cast by 45 to 64 were 66,600 compared with 24,600 by 18 to 29, a gap of 42,000 even though the registered groups differ by only 30,000]]. (c) [[2|The 65 and over group is 23 percent of registered voters but 28.5 percent of voters, so older voters have more weight in the outcome]]. (d) [[3|Young people move more often and have to re-register, and parties and campaigns contact them less, so mobilization differs]]. (e) [[4|Because campaigns want votes, they may stress issues like Medicare and property taxes, which can reinforce the gap]].",
          "All five points. Pointing out that the registered groups differ by only 30,000 shows careful reading of the numbers.",
        ],
        [
          "partial",
          "(a) [[0|Turnout rises with age]]. (b) [[1|The 45 to 64 group voted 66,600 and the 18 to 29 group 24,600]]. (c) Older people vote more. (d) Young people don't care. (e) Candidates ignore them.",
          "Parts (a) and (b) are good. For (c) use shares, for (d) use a course concept, because the data cannot show that young people don't care, and for (e) say what candidates do.",
        ],
        [
          "partial",
          "(a) Older people vote more. (d) [[3|Political socialization makes voting a habit]]. (e) [[4|Candidates focus on older voters]]. (b) The 45 to 64 group is bigger.",
          "Parts (d) and (e) are strong. Make (a) specific, and for (b) use the numbers of votes cast and compute the difference.",
          true,
        ],
        [
          "weak",
          "(a) Turnout goes down as age goes up. (b) The 18 to 29 group voted the most. (c) Young people are most of the electorate. (d) Old people are lazy. (e) Candidates ignore older voters.",
          "The data show the opposite: turnout rises with age. Recompute the votes and describe the trend carefully.",
        ],
        [
          "weak",
          "(a) [[0|Turnout rises with age]]. (b) 80 percent minus 41 percent is 39. (c) The data prove young people hate politics. (d) Not sure. (e) Nothing.",
          "The trend is right. Part (b) asks for votes cast, not percentages, and the data cannot prove attitudes. Use specific numbers and a course concept.",
        ],
      ],
    },
    {
      prompt:
        "Read this paraphrase of Federalist No. 10: Madison argues that the effects of faction can be controlled by a large republic in which representatives are chosen by many citizens across a wide territory. (a) Describe Madison's argument about why representatives can help control faction. (b) Describe Madison's argument about the size of a republic. (c) Explain one criticism of Madison's argument, and respond to it.",
      scheme: [
        "Describes that representatives can refine and enlarge public views through a chosen body of citizens",
        "Describes that a larger territory has more interests and parties, making a majority faction harder to form and coordinate",
        "States a reasonable criticism, such as Brutus's concern about distance or that representatives may be influenced by wealthy interests",
        "Responds to the criticism with reasoning, such as federalism, elections or checks and balances",
      ],
      model:
        "(a) Madison argues that representatives can refine and enlarge public views by passing them through a chosen body of citizens who are likely to judge the true interest of the country better than the people themselves in a passion. (b) A larger republic has more varied interests and parties, so a majority is less likely to share one motive to oppress, and harder to organize if it does. (c) A critic such as Brutus would say that in a large republic representatives are too few and too distant to know their voters, and may represent the wealthy. A response is that federalism leaves many decisions to states and localities closer to the people, and that elections and checks and balances give citizens ways to remove representatives who fail them.",
      answers: [
        [
          "full",
          "(a) [[0|Madison says representatives can refine and enlarge public views by passing them through chosen citizens who can judge the real interest of the country better than a crowd in a passion]]. (b) [[1|A bigger republic has more kinds of interests and parties, so a majority is less likely to share one motive to oppress, and it's harder for them to act together]]. (c) [[2|A critic like Brutus says representatives in a large republic are too far from voters and too few to know their needs]]. [[3|A response is that federalism leaves lots of decisions to state and local governments that are closer to people, and voters can remove representatives at elections]].",
          "Full marks. Your response draws on a design feature from earlier in the unit, which is the strongest kind of reply.",
        ],
        [
          "full",
          "(a) [[0|Representatives are meant to filter public opinion so that decisions come from a smaller group chosen for their wisdom and love of country, not from temporary passions]]. (b) [[1|In a large republic there are so many different groups that a single faction would find it hard to become a majority and to unite]]. (c) [[2|A criticism is that elected officials might serve wealthy donors more than the people, so the filter isn't neutral]]. [[3|A response is that the competition among many interest groups and the checks among branches limit any one group's control, so even if some influence is unequal, no single faction can dominate completely]].",
          "All four points. Your criticism about donors is a modern update of Brutus's concern, and your reply uses Madison's own logic.",
        ],
        [
          "partial",
          "(a) [[0|Representatives refine public views]]. (b) A large republic is better. (c) Brutus disagrees.",
          "Part (a) is good. Describe the specific reason a larger republic helps, and state and answer a criticism.",
        ],
        [
          "partial",
          "(b) [[1|In a large republic there are so many interests that a majority faction is harder to form]]. (c) [[3|Federalism puts power closer to people]]. (a) Representatives vote.",
          "Part (b) and your response are strong. Explain in (a) how representatives refine opinion, and state the criticism you are answering.",
          true,
        ],
        [
          "weak",
          "(a) Madison says people should vote directly on everything. (b) Small republics are best. (c) Nobody criticized him.",
          "Madison argued for representation and a large republic, and Brutus criticized him. Re-read the argument.",
        ],
        [
          "weak",
          "(a) [[0|Representatives refine views]]. (b) Madison says a republic needs one party. (c) Brutus agrees with Madison.",
          "Part (a) is right. Madison argued that many interests prevent domination, and Brutus disagreed with him. Review both arguments.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Writing the argument essay, and applying a landmark case to a new situation",
  note: `
## Objectives

Students will be able to:

1. write a short argument essay that makes a claim and supports it with evidence from a foundational document;
2. apply a landmark Supreme Court case to a new situation and explain the reasoning.

## Materials

The argument-essay scoring guide (thesis, evidence from a required document, evidence from a second document or example, reasoning, alternative perspective and response), a model prompt on checks and balances, a bank of required documents (Federalist No. 10, No. 51, No. 70, No. 78, Brutus No. 1, the Declaration), a case-application organizer (facts of the required case, holding, reasoning, facts of the new situation, similarities, differences, likely outcome), a new scenario based on right to counsel, and the exit ticket.

## Starter (8 minutes)

Display a weak thesis ("Checks and balances are important") and a strong one ("Although checks and balances still constrain presidents, Federalist No. 51's promise that ambition would counteract ambition is weakened when Congress and the president share a party"). Ask students to say what makes the second one defensible and arguable.

## Main activity

1. Anatomy of the essay. Walk through the scoring guide. A strong thesis makes a claim that responds to the prompt, not just restates it. Evidence must be specific and tied to a required document, not just named. Reasoning explains how the evidence supports the claim. The alternative perspective is a reasoned objection, followed by a response.
2. Write a short essay. In 25 minutes, students respond to the prompt: "Develop an argument that explains the extent to which the system of checks and balances described in Federalist No. 51 limits the power of the executive today." They must use Federalist No. 51 as evidence, and one more document or example.
3. Case application. Groups apply Gideon v. Wainwright (1963) to a new situation: a defendant charged with a felony in state court who cannot afford a lawyer is told to represent himself. They note the facts, holding and reasoning of Gideon, then similarities and differences, and then consider a variation: a charge carrying only a fine.
4. Peer scoring. Students score a classmate's essay against the guide and give one improvement.

## Checking for understanding

Cold-call: "State your thesis, one piece of evidence and the alternative perspective you answered."

## Exit ticket

Write the sentence from your essay that carries the response to an alternative perspective.
`,
  reading: [
    "Making a claim you can defend, and moving from a case to a new set of facts",
    `
The argument essay asks for a claim that responds to a prompt and that a reasonable person could dispute. A thesis such as "The president has a lot of power" is a statement of fact, not an argument. A thesis such as "Although courts, Congress and elections still limit executive power, Federalist No. 51's system of checks has weakened where one party controls both Congress and the White House" is arguable because it commits to a judgment about extent and gives a reason. It is common for students to restate the prompt, which earns no credit. The thesis should take a position and signal the line of reasoning.

The essay also needs **evidence**. At least one piece must come from a required document and be used specifically. It is not enough to write "Federalist No. 51 talks about checks and balances." A better sentence says that in Federalist No. 51 Madison argues that since men are not angels, each branch must have the means and motive to resist the others, so that ambition counteracts ambition. A second piece of evidence can come from another required document, such as Federalist No. 70, in which Hamilton argues that an energetic executive is essential to good government, or from a historical or current example, such as a president's use of executive orders, or a veto override. The evidence must then be tied to the thesis by **reasoning**. A sentence of reasoning explains why the evidence supports the claim: "Because Madison depended on each branch defending its own power, the system works only when members of Congress identify with their institution more than with their party."

Finally, the best essays address an **alternative perspective**. A student who argues that checks have weakened can acknowledge that courts, the media, state governments and elections still constrain presidents, and then respond by explaining why these limits are slower, narrower or less reliable than the congressional checks Madison relied on. Responding does not mean agreeing with both sides. It means showing that the opposing argument has been considered and explaining why it does not undo the claim.

The other skill in this unit is applying a case. A required Supreme Court case becomes useful on the exam when a student can use its reasoning on new facts. Take *Gideon v. Wainwright* (1963). Clarence Earl Gideon was charged with breaking into a Florida pool hall and could not afford a lawyer. The trial judge refused to appoint one, and he was convicted. The Supreme Court held unanimously that the Sixth Amendment right to counsel applies to the states through the Fourteenth Amendment, so states must provide lawyers to defendants in felony cases who cannot afford them, because a fair trial is impossible for most people without legal help. Suppose a new defendant, charged with a state felony, cannot afford a lawyer and is told to represent himself. The facts closely match, so the defendant's right to counsel has been violated, and a conviction would likely be overturned. If the charge is a minor offense punishable only by a fine, the situation differs. Gideon's reasoning rested on the danger of losing liberty in a felony case, and later cases extended the right to any case in which a defendant can be jailed, but not to those that carry only a fine. A student would explain that the stakes and the likely penalty distinguish the situations.

A complete answer therefore states the case's facts and holding, identifies relevant similarities and differences with the new facts, and draws a reasoned conclusion about the likely result.
`,
  ],
  cards: [
    ["Thesis", "A defensible claim that responds to the prompt and commits to a judgment, not a restatement of the prompt."],
    ["Evidence (essay)", "Specific information from a required document or a real example, tied to the claim."],
    ["Reasoning", "The explanation of why the evidence supports the claim."],
    ["Alternative perspective", "A reasoned objection to your claim, followed by your response."],
    ["Federalist No. 70", "Hamilton's argument that an energetic, single executive is essential to good government."],
    ["Gideon v. Wainwright (1963)", "States must provide lawyers to poor defendants in felony cases under the Sixth and Fourteenth Amendments."],
    ["Similarity and difference", "Points of comparison between a case and a new situation that explain why the result should be the same or different."],
    ["Likely outcome", "A reasoned prediction of how a court would apply a precedent to new facts."],
  ],
  closed: [
    [
      "Which thesis is the most defensible for an argument essay?",
      [
        "Federalism is important in the United States.",
        "Although the Court's power of judicial review is limited by appointments and jurisdiction, it remains the most effective check on legislative power.",
        "The Constitution has a Senate.",
        "Congress passes laws.",
      ],
      "B",
    ],
    [
      "Which sentence uses a required document as specific evidence?",
      [
        "Federalist No. 51 is about government.",
        "In Federalist No. 51, Madison argues that ambition must counteract ambition by giving each branch means to resist the others.",
        "Many people read Federalist No. 51.",
        "Madison wrote Federalist No. 51.",
      ],
      "B",
    ],
    [
      "A defendant is charged with a state felony and cannot afford a lawyer. Under Gideon, the state must:",
      [
        "Let him represent himself",
        "Provide him with a lawyer",
        "Dismiss the charge",
        "Charge him with a lesser offense",
      ],
      "B",
    ],
    [
      "A response to an alternative perspective is best described as:",
      [
        "Ignoring the objection",
        "Explaining why the objection does not undo the claim",
        "Agreeing with the objection and abandoning the claim",
        "Restating the claim louder",
      ],
      "B",
    ],
    [
      "Why might the right to counsel in Gideon not extend to a case where the only penalty is a small fine?",
      [
        "The Sixth Amendment does not mention lawyers",
        "The reasoning rested on the risk of losing liberty, which does not exist where only a fine is possible",
        "Fines are more serious than prison",
        "The Court does not hear fine cases",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Develop an argument that explains the extent to which the system of checks and balances described in Federalist No. 51 limits the power of the executive today. In your essay, use Federalist No. 51 and at least one other piece of evidence (another required document or an example). Include an alternative perspective and respond to it.",
      scheme: [
        "States a defensible thesis that responds to the prompt and takes a position on the extent of the limit",
        "Uses specific evidence from Federalist No. 51 about ambition counteracting ambition or branches' means to resist one another",
        "Uses a second piece of accurate evidence, from another document or a real example",
        "Explains the reasoning that connects the evidence to the thesis",
        "Presents a reasonable alternative perspective",
        "Responds to the alternative perspective with reasoning",
      ],
      model:
        "Although the executive is still limited by Congress, courts and elections, the checks Madison described in Federalist No. 51 have weakened where one party controls both branches. Madison argued that each branch must have the means and motive to resist the others so that ambition counteracts ambition. But his theory depends on members of Congress defending their institution. When a president's party controls Congress, members often put party loyalty first, and presidents have used executive orders to act without legislation, which Congress rarely reverses. A critic might say courts still block presidents and a veto override is possible. That is true, but court review is slow and narrow, and an override needs two thirds, which is hard when the president's party holds more than a third of either house. So the system limits the executive less than Madison expected.",
      answers: [
        [
          "full",
          "[[0|Although courts, Congress and elections still limit the executive, Madison's system of checks in Federalist 51 works less well when one party controls Congress and the White House]]. [[1|In Federalist 51 Madison argues that each branch has to have the means and motive to resist the others so that ambition counteracts ambition]]. [[2|But presidents now use executive orders to act without legislation, and Congress rarely reverses them]]. [[3|Madison's theory depends on members of Congress defending their own institution, but when the president's party controls Congress, members tend to put party first]]. [[4|A critic might say courts still block presidents and Congress can override vetoes]]. [[5|That's true, but a court case is slow and narrow, and an override needs two thirds, which is hard when the president's party has more than a third of either house]].",
          "Full marks. Your thesis commits to a position, your evidence comes from Madison and a real practice, and your response uses specific numbers about the override.",
        ],
        [
          "full",
          "[[0|I argue that the checks in Federalist 51 still limit the executive significantly, even though presidents have gained informal power]]. [[1|Madison wrote that since men aren't angels the branches need the means to resist each other, and he gave each branch tools like the veto, confirmation and impeachment]]. [[2|These tools still work today: the Senate has rejected nominees, and courts have blocked executive orders such as those that went beyond a statute]]. [[3|The reason this supports my claim is that the constraints don't depend on trusting a president's good intentions, which is what Madison wanted]]. [[4|Someone could argue that executive orders and executive agreements let presidents avoid Congress]]. [[5|But the same orders can be overturned by courts, reversed by the next president or defunded, so they are less permanent than laws, and the checks still operate, though more slowly]].",
          "All six points. You argued the opposite thesis from the first answer, and your response to the alternative perspective notes that executive orders are less durable than laws.",
        ],
        [
          "partial",
          "[[0|The checks and balances in Federalist 51 limit the executive a lot]]. [[1|Madison said ambition must counteract ambition]]. Presidents can't do whatever they want.",
          "A clear thesis and a document-based point. Add a second piece of specific evidence, explain your reasoning and address an alternative perspective.",
        ],
        [
          "partial",
          "[[2|Presidents use executive orders to avoid Congress]]. [[4|Some people say courts can block them]]. [[5|But courts are slow]]. So the system is weak.",
          "You have an example, an alternative perspective and a response. Add a clear thesis, specific evidence from Federalist No. 51 and your reasoning.",
          true,
        ],
        [
          "weak",
          "Federalist 51 is a really important document that was written by James Madison. Checks and balances are important in government and everyone should know about them.",
          "This restates the topic without taking a position or using specific evidence. State a claim about the extent of the limit and use a specific idea from the document.",
        ],
        [
          "weak",
          "[[0|The executive is not limited at all today]]. The president is a king and the founders failed. Everyone knows this.",
          "That is a position, but it needs evidence from the document and an example, reasoning and an alternative perspective. 'Everyone knows' is not evidence.",
        ],
      ],
    },
    {
      prompt:
        "Apply Gideon v. Wainwright to this situation: A defendant in a state court is charged with burglary, a felony punishable by up to ten years, and cannot afford a lawyer. The judge tells him to defend himself. (a) Describe the holding in Gideon. (b) Explain two similarities between Gideon and the situation. (c) Explain how the outcome might differ if the charge were a minor offense punishable only by a fine. (d) Explain the constitutional provision that allows the Court's decision to bind state courts.",
      scheme: [
        "Accurately describes the holding that the Sixth Amendment requires states to provide counsel to poor defendants in felony cases",
        "Explains a first similarity, such as both are state felony prosecutions",
        "Explains a second similarity, such as the defendant could not afford counsel and was told to defend himself",
        "Explains that for a fine-only offense there is no risk of jail, so the right to counsel would not likely apply",
        "Explains that the Fourteenth Amendment's Due Process Clause incorporates the Sixth Amendment against states",
      ],
      model:
        "(a) In Gideon, the Court held that the Sixth Amendment right to counsel requires states to provide a lawyer to defendants in felony cases who cannot afford one. (b) The situation is similar because it is a state felony prosecution, and because the defendant cannot afford a lawyer and is told to represent himself, as Gideon was. (c) If the charge carried only a fine, the outcome would likely differ, because Gideon's reasoning rested on the risk of losing liberty, which does not exist when only a fine is possible. (d) The Fourteenth Amendment's Due Process Clause incorporates the Sixth Amendment against the states, which is why the right applies in state court.",
      answers: [
        [
          "full",
          "(a) [[0|In Gideon the Court held that the Sixth Amendment requires states to give a lawyer to defendants in felony cases who can't afford one]]. (b) [[1|One similarity is that both are state felony prosecutions]], and [[2|the defendant can't afford a lawyer and the judge makes him defend himself, just like Gideon]]. (c) [[3|With a fine only, the result would probably differ because the Gideon reasoning was about losing liberty, and with only a fine there's no risk of jail]]. (d) [[4|The Fourteenth Amendment's Due Process Clause incorporates the Sixth Amendment against the states, so it binds state courts]].",
          "Full marks. All four parts are accurate, and (c) gives the reasoning behind the distinction.",
        ],
        [
          "full",
          "(a) [[0|Gideon held that states have to provide counsel for poor defendants in serious criminal cases, based on the Sixth Amendment]]. (b) [[1|A similarity is that burglary is a serious felony like the one Gideon was charged with, breaking into a pool hall]]. [[2|Another is that this defendant couldn't pay for a lawyer and was told to defend himself]]. (c) [[3|If the penalty was only a fine, the right to counsel may not apply because the risk of imprisonment is what made counsel essential]]. (d) [[4|The Court used selective incorporation through the Fourteenth Amendment to apply the Sixth Amendment to the states]].",
          "All five points. Using the term selective incorporation in (d) is precise.",
        ],
        [
          "partial",
          "(a) [[0|Gideon says states have to give lawyers to poor felony defendants]]. (b) [[1|Both are felonies]]. (c) The outcome is different. (d) The Constitution.",
          "Part (a) and one similarity are right. Add a second similarity, explain why a fine-only offense differs and name the incorporation provision.",
        ],
        [
          "partial",
          "(c) [[3|With only a fine nobody could go to jail so Gideon wouldn't apply]]. (d) [[4|The Fourteenth Amendment applies it to states]]. (b) [[2|The defendant can't afford a lawyer]].",
          "Good on three parts. State Gideon's holding in (a) and give another similarity, such as the kind of charge.",
          true,
        ],
        [
          "weak",
          "(a) Gideon says everyone gets a free lawyer for every case, even traffic tickets. (b) They are the same. (c) The same. (d) The Constitution says so.",
          "Gideon covered serious criminal cases, not all cases, and the outcome could differ for a fine-only offense. Review the holding and its reasoning.",
        ],
        [
          "weak",
          "(a) [[0|Gideon is about lawyers]]. (b) Gideon was about free speech. (c) Nothing would change. (d) States don't have to follow it.",
          "Gideon is about the right to a lawyer, not speech, and states must follow it through incorporation. Re-read the case.",
        ],
      ],
    },
  ],
};

writeCourse("ap-us-government-grade-11.json", "AP US Government", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
