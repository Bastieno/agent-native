import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors World History, Grade 9, Quarter 1. Early humans to the classical
 * world, with more weight on source criticism and written argument.
 * Standards: C3 Framework dimensions 1 to 4, in the school's own words.
 */

const w1: WeekInput = {
  topic: "Asking a historian's question: sources, dating and the river valleys",
  note: `
## Objectives

Students will be able to:

1. choose the kinds of sources that will best answer a question about an early civilization and justify the choice;
2. explain what historians mean by prehistory and history, and order early human development on a scaled timeline;
3. explain how geography and climate shaped Mesopotamia, Egypt, the Indus Valley and China.

## Materials

A roll of adding-machine paper for a scaled timeline (1 inch per 1,000 years), a provenance sheet for each source (who made it, when, why, who for), a half-life demonstration with 40 pennies, a physical map of the Eastern Hemisphere, and the exit ticket.

## Starter (8 minutes)

Give pairs a question: "Were the first cities of Sumer ruled by kings, by priests, or by an assembly?" Ask them to list the kinds of evidence they would hunt for and rank them. Collect the rankings and note disagreements; return to them at the end.

## Main activity

1. Build the scaled timeline. Mark the first Homo sapiens (about 300,000 years ago), controlled fire (over a million years ago), cave paintings at Lascaux (about 17,000 years ago), cuneiform (about 5,200 years ago). Students notice that at this scale recorded history fits in a thumb's width.
2. Radiocarbon demonstration. Start with 40 pennies representing carbon-14 atoms; every "half-life" (5,730 years) half are removed. Ask: if a bone retains one quarter, how old is it?
3. Provenance practice. Groups receive four source cards and fill in the sheet. They decide which source best answers the starter question and defend it, naming one bias.
4. Brief geography round with the map: what does each of the four rivers give and cost?

## Checking for understanding

Cold-call for a limit: "What could this source never tell us?"

## Exit ticket

Write the question you would ask and the two sources you would choose, with the one weakness of each.
`,
  reading: [
    "Provenance, half-lives and four ways a river can make a state",
    `
Before a historian trusts a source, she asks four questions about its **provenance**: who made it, when, for whom, and why. A Sumerian tablet listing barley rations was written by a temple scribe for the temple's own accounts. Nobody had any reason to flatter anyone, so it is useful for what workers actually received. A royal inscription boasting of victories was written to be seen, so it is better evidence of what a king wanted remembered than of what happened. Neither source is simply true or false. The skill is matching the source to the question and noting its limits. Historians also look for **corroboration**, a second independent source that points the same way, and they sort sources into primary (made at the time) and secondary (written later by someone studying them).

Dating prehistory depends on science rather than writing. Radiocarbon dating uses a fact about carbon-14, an unstable atom that living things take in and stop taking in when they die. Its **half-life** is 5,730 years, so after that time half of the original carbon-14 in a bone or a piece of charcoal is left, after 11,460 years a quarter, and so on. Measuring what remains gives the age, up to about 50,000 years. Other methods, such as tree rings and layers of soil, check the result. The scale is humbling. If the 300,000 years of Homo sapiens were one day, writing would appear in the last twenty-five minutes.

River valleys gave early states very different problems. The Tigris and Euphrates of **Mesopotamia** could flood at any time, and the land between them had little stone or timber, so Sumerians had to trade for materials and cooperate to dig canals; no natural barrier protected the plain, so cities built walls and fought each other. Egypt's **Nile** flooded in late summer with great regularity, deposits of black silt renewed the fields, and desert and cataracts guarded the valley. A single government grew because the river itself was a single highway: the current flows north and the wind blows south, so boats could travel both ways. The **Indus** system was less predictable than the Nile, but its cities, Mohenjo-daro and Harappa, were laid out on grids with standard bricks and covered drains, suggesting careful planning. In northern China, the **Yellow River** carries so much loess that its bed rises above the plains behind its levees. Every breach was a disaster, and building and repairing dikes demanded labor on a huge scale, an effort that later Chinese tradition connects with the legendary founder-engineer Yu the Great.

Geography did not decide everything, but it set the conditions. It is a good historian's habit to ask not "what did the river make people do?" but "what did the river make easy, hard or necessary?"
`,
  ],
  cards: [
    ["Provenance", "The origin of a source: who made it, when, for whom and why."],
    ["Corroboration", "Support for a claim from a second, independent source."],
    ["Radiocarbon dating", "A method that measures remaining carbon-14 in once-living material to estimate its age."],
    ["Half-life", "The time for half of a radioactive sample to decay; 5,730 years for carbon-14."],
    ["Cataract", "A rocky rapid in the Nile that made it hard for invaders to sail upriver into Egypt."],
    ["Levee", "A raised bank along a river that holds back floodwater."],
    ["Loess", "Fine windblown yellow soil that fills the Yellow River and fertilizes northern China."],
    ["Bias", "A way a source's maker may lean, because of purpose, position or audience; it limits but does not erase a source's value."],
    ["Yu the Great", "Legendary Chinese hero said to have tamed the floods by digging channels; a story, not a proven person."],
  ],
  closed: [
    [
      "A bone fragment retains one quarter of its original carbon-14. About how old is it?",
      ["About 5,730 years", "About 11,460 years", "About 17,190 years", "About 22,920 years"],
      "B",
    ],
    [
      "A historian wants to know what temple workers in Sumer actually received for their labor. Which source has the least reason to exaggerate?",
      [
        "A royal inscription claiming the king fed all his people generously",
        "A temple scribe's tablet recording barley rations issued to named workers",
        "A hymn praising the king as the shepherd of the land",
        "A modern textbook paragraph on Sumerian economy",
      ],
      "B",
    ],
    [
      "Why can an Egyptian boat travel both up and down the Nile?",
      [
        "The river flows south and the wind blows north",
        "The river flows north and the wind usually blows south",
        "Both the river and wind flow east",
        "The Nile has no current",
      ],
      "B",
    ],
    [
      "If all of the 300,000 years of Homo sapiens were scaled to 24 hours, writing's 5,200 years would occupy about how long?",
      ["About 25 seconds", "About 25 minutes", "About 2 hours", "About 3 hours"],
      "B",
    ],
    [
      "Which statement best shows corroboration?",
      [
        "A king's inscription is repeated word for word by his own court scribe",
        "A tablet listing rations and an excavated grain store agree that a temple distributed barley",
        "A modern textbook repeats another textbook",
        "A historian's opinion backs up her own earlier opinion",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A historian asks, \"Was the early Sumerian city of Uruk ruled by a king, a priest, or an assembly?\" Choose two kinds of source, say what each could show, and explain one limit of each.",
      scheme: [
        "Names a first appropriate kind of source (for example administrative tablets, a royal inscription, a seal, or the layout of temple and palace buildings)",
        "Explains what the first source could show about who held power",
        "Names a second, different kind of source",
        "Explains what the second source could show about who held power",
        "States a limit of the first source, such as who made it and why",
        "States a limit of the second source",
      ],
      model:
        "Administrative tablets from the temple could show who issued rations and gave orders, which points to who held economic power, but they were written by temple scribes and only cover what the temple handled. The layout of excavated buildings could show whether a palace or a temple dominated the city center, but buildings cannot say who made the decisions or what title they held. Using both gives a more complete answer than either alone.",
      answers: [
        [
          "full",
          "[[0|One good source is the administrative tablets from the temple at Uruk]], and [[1|they could show who gave out rations and orders, which tells us who had real power]]. [[2|Another source is the excavated layout of the buildings in the city center]], which [[3|could show whether a palace or a temple was the biggest and most central building]]. The tablets have a limit: [[4|they were written by temple scribes so they only show what the temple managed, not what a king did]]. The buildings also have one: [[5|a big building doesn't tell you who made decisions or what title that person had]].",
          "Full marks. You matched each source to the question and gave a limit that comes from who made it or what it can physically show.",
        ],
        [
          "full",
          "[[0|I would use royal inscriptions]], since [[1|if a ruler boasts about building temples or leading armies, we can see who claimed authority]]. I would pair that with [[2|seals and sealings, which are clay stamps used to mark goods]], because [[3|they show which officials controlled storage and who had to approve it]]. A limit of the inscriptions is that [[4|kings wrote them to look powerful, so they might exaggerate]]. A limit of the seals is that [[5|they show an official's role but not whether he answered to a king, a priest or a council]].",
          "All six points. Choosing seals as a second source is a good move, and your limits are tied to each source's purpose.",
        ],
        [
          "partial",
          "[[0|Tablets from the temple could be used]] and [[1|they would show who was handing out food and giving orders]]. Another source would be a king's monument. The monument might be biased.",
          "Your first source is well explained. Say what the second would show, and name a limit for the tablets as well.",
        ],
        [
          "partial",
          "[[2|The layout of the city's buildings is a source]] and [[3|it could show if the palace or the temple was in the middle]]. [[5|The problem is you can't tell who decided things from a building]]. Tablets are another source but they are boring.",
          "Good use of buildings. Explain what the tablets would show and what limits they have, rather than calling them boring.",
          true,
        ],
        [
          "weak",
          "I would just look at a history textbook because it would give the answer. A textbook is more reliable than old stuff because it is written by experts.",
          "A textbook is a secondary source built from the older evidence. A historian asking this question works from the early sources, so name two of them.",
        ],
        [
          "weak",
          "[[0|Clay tablets]] are a source. They are really old so they are accurate.",
          "Tablets are a good choice. But age does not make a source accurate. Say what they would show about rulers and what limit they have.",
        ],
      ],
    },
    {
      prompt:
        "Compare how geography shaped the early state in Egypt with the early state in northern China. Use at least two features of each river and connect each to a feature of government or society.",
      scheme: [
        "Identifies a feature of the Nile (regular flood, silt, northward current, desert barriers)",
        "Connects that Nile feature to a feature of Egyptian government or society",
        "Identifies a second feature of the Nile with a connection",
        "Identifies a feature of the Yellow River (loess, rising bed, destructive floods)",
        "Connects the Yellow River feature to a feature of Chinese government or society, such as large labor projects",
        "Draws a comparison or contrast between the two",
      ],
      model:
        "The Nile flooded regularly, so Egyptians could plan the farming year, and it flowed north while the wind blew south, so one ruler could travel and control the whole valley by boat. Deserts and cataracts protected Egypt from invasion. The Yellow River, by contrast, carried loess that raised its bed and caused deadly floods, so governments had to organize huge labor teams to build and repair levees. Egypt's river encouraged unity and stability, while China's demanded constant, large-scale labor.",
      answers: [
        [
          "full",
          "[[0|The Nile flooded on a reliable schedule]] so [[1|farmers and officials could plan taxes and planting, which helped a central government keep records]]. [[2|Because the Nile flowed north and the wind blew south, a ruler could move boats along the whole valley]]. [[3|The Yellow River carries loess and silts up its own bed]], and [[4|it needed levees and huge workforces, which pushed rulers to organize labor on a big scale]]. [[5|So the Nile gave Egypt stability and easy unity, while the Yellow River forced China to keep building and repairing, so its governments were always about managing labor and disaster]].",
          "Full marks. You tied specific features to specific features of government and closed with a real comparison.",
        ],
        [
          "full",
          "In Egypt, [[0|the flood was predictable and left silt]], which [[1|let farmers rely on the harvest and made grain taxes dependable]]. Also [[2|the desert and cataracts made invasion hard so the state could stay stable for long periods]]. In China, [[3|the Yellow River floods were destructive because loess raised the riverbed]]. [[4|Emperors and officials had to draft peasants to build dikes]]. [[5|The difference is that Egypt's geography protected it while China's required constant work to hold the river back]].",
          "All six points. Your contrast of protection versus constant labor is a clear thesis.",
        ],
        [
          "partial",
          "[[0|The Nile flooded regularly]] and [[1|that let Egyptians plan farming]]. [[3|The Yellow River had floods with loess]] too.",
          "Good on the Nile. For the Yellow River, connect the loess and floods to something government did, and then compare.",
        ],
        [
          "partial",
          "[[3|The Yellow River raised its own bed with silt and flooded]], so [[4|China needed big labor projects for levees]]. In Egypt the river was good.",
          "The China section is strong. For Egypt, name specific features of the Nile and link them to government, then compare.",
          true,
        ],
        [
          "weak",
          "Both rivers flooded so both places had floods and farmers. China was colder.",
          "Floods alone do not make a comparison. Egypt's were regular and China's were destructive. Name features of each river and what government did about them.",
        ],
        [
          "weak",
          "[[3|The Yellow River had loess]]. Egypt had pyramids so Egypt was richer.",
          "Loess is accurate, but pyramids are a result of government and wealth, not geography. Link the rivers' features to how each state organized itself.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "The Neolithic revolution and the first states: causes, costs and law",
  note: `
## Objectives

Students will be able to:

1. analyze the causes and effects of the agricultural revolution on early societies;
2. compare the political, religious and social systems of the first river-valley civilizations.

## Materials

Excerpt cards (teacher-written summaries) on Göbekli Tepe and Çatalhöyük, paraphrased law cards from the Code of Hammurabi, an Egyptian maat card, an Indus city grid, a comparison matrix, and the exit ticket.

## Starter (8 minutes)

Pose the puzzle: "People built giant stone enclosures at Göbekli Tepe about 11,000 years ago, before they were farming. Did farming lead to organized religion, or did organized religion lead to farming?" Take positions on a line across the room. Do not resolve it.

## Main activity

1. Present the causes of the Neolithic revolution, including the end of the Younger Dryas about 11,700 years ago, warmer wetter climate, wild cereals and herd animals. Distinguish necessary conditions from sufficient ones.
2. Present effects, both positive and negative: surplus and specialization, but also disease, nutritional decline and inequality. Students compute an example: a village of 200 stores 40 tons of grain while each person eats 0.1 ton a year.
3. Hand out paraphrased law cards from the Code of Hammurabi (about 1754 BCE). Ask: what do these laws show about social ranking and how the state saw its role?
4. Fill in the comparison matrix: ruler, religion, law, class structure, evidence for each of Sumer, Egypt and the Indus.

## Checking for understanding

Ask two students to state a claim that the matrix supports, and one that it cannot support because the evidence is silent.

## Exit ticket

One cost and one benefit of farming, and which you think mattered more for the long run.
`,
  reading: [
    "Wheat, inequality and the law of Hammurabi",
    `
Why did people start farming? The traditional answer, that hungry people invented farming to solve a food shortage, has problems. Hunter-gatherers often ate well and worked fewer hours than early farmers. More recent explanations point to changes in climate and opportunity. About 11,700 years ago the cold, dry period called the Younger Dryas ended, and warmer, wetter weather spread wild wheat, barley and the herds that grazed on them across Southwest Asia. People who lived beside rich stands of grain began to harvest, store and then plant them. Over generations the seeds with the traits people preferred, such as larger grains that did not scatter, were planted again, and the plants changed. The same process, domestication, happened independently with rice in China, maize in Mesoamerica and sorghum in Africa.

An odd discovery complicates the tidy story. At Göbekli Tepe, in present-day Turkey, hunter-gatherers raised carved stone pillars weighing many tons about 11,000 years ago, apparently before farming was established nearby. If groups gathered to build a sacred site, they would have needed to be fed, which may have given them a reason to cultivate grain. Historians debate this, and it is a good reminder that evidence can overturn a neat sequence.

The consequences were mixed. Farming could support more people per square mile, and storage made a **surplus** possible. A simple calculation shows the scale. If a village of 200 people each eats about 0.1 ton of grain a year, they need 20 tons; a harvest of 40 tons leaves 20 tons spare, enough to support specialists and traders. But skeletons from early farming villages are often shorter and show more tooth decay and anemia, because diets relied on a few crops, and crowding spread diseases from livestock. Wealth also became unequal, since those who held the land or the grain could gain power over others.

Law was one way early states managed these tensions. The Code of Hammurabi, carved on a stone pillar about 1754 BCE by the king of Babylon, lists nearly three hundred rulings. It shows a society sorted by rank: a nobleman who blinded another nobleman suffered the same injury, but a nobleman who blinded a commoner paid a fee in silver. Rules on debt, marriage, builders and farmers show how much of daily life the state claimed to regulate. In Egypt, the king was expected to uphold **ma'at**, a sacred order of truth, justice and balance, so law and religion were closely joined. In the Indus cities, standard bricks and drains suggest strong planning, yet because the script is unread we cannot say whether laws existed or who enforced them.

These cases show a pattern historians watch for: similar pressures, such as the need to store, distribute and protect food, produced states, but each state justified its authority in its own language.
`,
  ],
  cards: [
    ["Younger Dryas", "A cold, dry period that ended about 11,700 years ago, after which warmer weather helped wild grains spread."],
    ["Domestication", "Selective breeding of plants and animals over generations until they depend on humans."],
    ["Göbekli Tepe", "A site in Turkey with huge carved pillars, about 11,000 years old, built by people not yet farming."],
    ["Surplus", "More food than a community needs for itself, which allows specialization."],
    ["Code of Hammurabi", "Laws recorded by the Babylonian king Hammurabi about 1754 BCE, with different penalties for different social ranks."],
    ["Ma'at", "The Egyptian idea of truth, justice and cosmic order that the king was expected to uphold."],
    ["Necessary versus sufficient cause", "A necessary cause must be present for an event to happen; a sufficient cause alone is enough to make it happen."],
    ["Social stratification", "The division of a society into ranked groups with unequal power and wealth."],
  ],
  closed: [
    [
      "A village of 300 people eats 0.1 ton of grain each per year and harvests 45 tons. How much surplus is there?",
      ["15 tons", "30 tons", "45 tons", "75 tons"],
      "A",
    ],
    [
      "Which finding about early farmers' skeletons best shows a cost of farming?",
      [
        "They were taller than hunter-gatherers",
        "They often show more tooth decay and anemia, from a narrower diet and crowding",
        "They show no signs of disease",
        "They were buried with weapons",
      ],
      "B",
    ],
    [
      "What does the Code of Hammurabi's different penalties for nobles and commoners show?",
      [
        "That Babylon had no class system",
        "That Babylonian society was ranked and the law reflected rank",
        "That all people were equal before the king",
        "That law was unimportant",
      ],
      "B",
    ],
    [
      "Why does Göbekli Tepe challenge the claim that farming came before large-scale organized religion?",
      [
        "It was built much later than the first farms",
        "It was built by people who were not yet farming, but who gathered in large numbers",
        "It was built by farmers who used iron tools",
        "It proves that farming started in Turkey",
      ],
      "B",
    ],
    [
      "A historian says warm weather \"caused\" farming. Which comment best shows careful thinking about cause?",
      [
        "Warm weather was probably a necessary condition, but people also had to choose to plant, so it was not sufficient alone",
        "Warm weather was the only cause",
        "Cause cannot be discussed in history",
        "Farming caused warm weather",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Evaluate this statement: \"The agricultural revolution was a clear improvement for human life.\" Use at least two benefits and two costs, and give your own judgment.",
      scheme: [
        "Names a benefit of farming, such as surplus or larger populations",
        "Explains how that benefit led to specialization, cities or security",
        "Names a cost, such as disease, a narrower diet or lost leisure",
        "Supports the cost with evidence, such as skeletal findings or crowding",
        "Names a second cost or benefit with evidence, such as inequality",
        "Gives a reasoned judgment that weighs costs against benefits",
      ],
      model:
        "Farming created a surplus, which allowed specialization and cities, and could feed more people per acre. But early farmers were often less healthy, with skeletons showing more decay and anemia, and crowded villages spread diseases from animals. Farming also created inequality because those who controlled land or grain gained power. In the short run it was often not an improvement for individuals, though in the long run it made later achievements like writing and cities possible, so the statement is partly true but depends on whose life and what time scale we mean.",
      answers: [
        [
          "full",
          "It's partly true. A real benefit is [[0|farming made a surplus and could feed more people]], and [[1|that meant some people could become specialists or scribes and cities could form]]. But [[2|early farmers were often sicker]], for example [[3|their skeletons show more tooth decay and anemia, and living close to animals and each other spread disease]]. [[4|Another cost was inequality, since people who controlled the land or grain gained power over others]]. [[5|So I would say it was not a clear improvement for most individuals right away, but over the long run it made cities and writing possible, so it depends on what time scale you use]].",
          "Full marks. Your judgment is reasoned and you separate the short run from the long run.",
        ],
        [
          "full",
          "I don't agree that it was clearly better. [[0|The upside was more food per acre and a surplus]], which [[1|let populations grow and let some people take up crafts or government jobs]]. The downside is [[2|farmers had a narrower diet and worked harder than foragers]]. [[3|Bones from early farming villages show shorter heights and more anemia]]. [[4|Also, the people who held the grain stores could control everyone else, which made inequality]]. [[5|Overall it was a trade-off: better for civilization as a whole, worse for many people's daily lives]].",
          "All six points. The phrase 'better for civilization, worse for daily lives' is a strong, defensible judgment.",
        ],
        [
          "partial",
          "[[0|Farming made a surplus]] [[1|which made cities possible]]. [[2|It also made people sicker]]. So I think it was good overall.",
          "Fine start. Back the cost up with evidence (what do skeletons show?), add a second cost, and explain your judgment.",
        ],
        [
          "partial",
          "[[2|Farmers got more diseases from living near animals]] and [[3|skeletons show tooth decay]]. [[4|There was more inequality too]]. But it wasn't good.",
          "You gave costs with evidence. The question also asks for two benefits and a judgment that weighs both sides.",
          true,
        ],
        [
          "weak",
          "Yes, farming was a clear improvement because people didn't have to hunt anymore, which was dangerous, and farming was easy work.",
          "Farming was often harder work than foraging, and it brought new problems. Look at what early skeletons and crowded villages show.",
        ],
        [
          "weak",
          "[[0|Farming made more food]]. It was bad because people got bored of the same crops.",
          "More food is a real benefit. The costs historians point to are disease, a narrow diet and inequality, not boredom. Review the reading for evidence.",
        ],
      ],
    },
    {
      prompt:
        "Use the Code of Hammurabi and Egyptian ma'at to compare how Mesopotamian and Egyptian rulers justified their authority. Include one similarity and one difference, and say what evidence supports each.",
      scheme: [
        "Identifies a similarity, such as rulers claiming to uphold justice or divine order",
        "Supports it with evidence from the Code of Hammurabi",
        "Supports it with evidence from ma'at or the Egyptian king's role",
        "Identifies a difference, such as Egypt's king being seen as divine versus Hammurabi presenting himself as a just ruler chosen by the gods",
        "Supports the difference with specific evidence",
      ],
      model:
        "Both rulers claimed to protect justice and order. Hammurabi had his laws carved on a pillar to show he gave fair rulings, and the Egyptian king was expected to uphold ma'at, the divine order of truth and balance. They differed because the Egyptian king was seen as a god in human form, while Hammurabi presented himself as a king chosen by the gods to bring justice, and his code shows a ranked society with penalties by class.",
      answers: [
        [
          "full",
          "[[0|Both rulers said they were protecting justice and order]]. [[1|Hammurabi had his laws carved on a stone pillar so the people could see them and his laws handled things like debts and building]], and [[2|the Egyptian king had to keep ma'at, which was truth and balance]]. [[3|The difference is that the pharaoh was thought to be a god, but Hammurabi was a king that the gods chose to bring justice]]. [[4|The Code of Hammurabi is full of practical penalties by rank, while ma'at was a sacred idea more than a list of laws]].",
          "Full marks. You used both pieces of evidence and made the difference clear with a contrast in how each ruler's claim worked.",
        ],
        [
          "full",
          "A similarity is that [[0|both rulers connected their power to a divine sense of justice]]. [[1|Hammurabi's code has an introduction saying the gods called him to establish justice]], and [[2|Egyptian kings were expected to preserve ma'at as a sacred order]]. One difference is that [[3|Egypt's king was himself divine, while Hammurabi was a human ruler under the gods]]. [[4|You can see this because Hammurabi's pillar shows him standing before the sun god Shamash receiving the law, while Egyptian art shows pharaohs as gods themselves]].",
          "All five points. The picture of Hammurabi before Shamash is a good detail to rest the difference on.",
        ],
        [
          "partial",
          "[[0|Both claimed to be about justice]]. [[1|Hammurabi's code had rules about eyes and teeth]]. Egypt had pharaohs.",
          "Your similarity is good and the code is a fair example. Explain ma'at and then name a clear difference with evidence.",
        ],
        [
          "partial",
          "[[3|The pharaoh was a god and Hammurabi was a king]], and [[4|the code shows penalties changed by social rank]]. Both had laws.",
          "The difference is strong. Say clearly what the similarity is, and use evidence from ma'at.",
          true,
        ],
        [
          "weak",
          "Hammurabi and the pharaohs were all about the same. They both ruled Egypt.",
          "Hammurabi ruled Babylon in Mesopotamia, not Egypt. Compare what each ruler said justified his power.",
        ],
        [
          "weak",
          "[[0|Both kings said they were fair]]. The code is a pillar and ma'at is a bird.",
          "Both claimed fairness, which is right. But ma'at is the idea of truth and order, not a bird. Use evidence from both to support your points.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Democracy and its critics, and the world Alexander made",
  note: `
## Objectives

Students will be able to:

1. describe how Greek ideas about citizenship, philosophy and democracy developed, and how people of the time saw them;
2. analyze the causes and effects of Alexander's conquests and the Hellenistic world.

## Materials

A timeline strip from Draco to the Peloponnesian War, teacher-written summaries of Thucydides' account of Pericles' funeral speech and of Plato's ship-of-state image, an ostracism ballot (a broken pottery sherd), a map of Alexander's route, and the exit ticket.

## Starter (8 minutes)

Run an ostracism. Each student writes a name on a scrap of paper: the classmate "who has too much influence on class decisions." Do not collect or count them; instead ask: "What might go wrong with this system? What might go right?" Then explain that Athens held such a vote, and that 6,000 votes were needed.

## Main activity

1. Timeline of reforms: Solon's cancellation of debts in 594 BCE, Cleisthenes' organization of citizens into ten tribes in 508 BCE, and Pericles' payment for jury service. Ask: each reform widened or narrowed who held power?
2. Read the two summaries side by side: Pericles' pride in Athens as open and equal before the law, and Plato's picture of a ship whose crew votes on steering instead of letting the person who knows navigation steer. Students write what each author feared and hoped.
3. Move to Alexander. Use Arrian, who wrote about four hundred years after Alexander, as a case of source reliability. Students decide what Arrian could and could not know.
4. Hellenistic achievements: Eratosthenes estimates the Earth's size using a shadow angle of 7.2 degrees and a distance of 5,000 stadia. Compute together.

## Checking for understanding

Ask partners to say whether Athenian democracy was best seen as a success or a failure and to cite two facts.

## Exit ticket

Write the strongest criticism of Athenian democracy by someone who lived in it, and one fact that answers it.
`,
  reading: [
    "A democracy of citizens, with critics, and a world made Greek",
    `
Greek ideas of citizenship changed over three centuries. Around 594 BCE, Athens was torn by debts that threatened to turn poor farmers into slaves. The lawgiver Solon canceled many debts and banned loans secured by a person's own body, widening the number of Athenians who counted as free members of the community. In 508 BCE Cleisthenes reorganized the citizens into ten new tribes drawn from city, coast and countryside, which weakened old aristocratic rivalries and gave ordinary men a stake in government. The Assembly, which met on a hillside called the Pnyx, could seat perhaps six thousand. Juries were chosen by lot, and under Pericles in the 450s BCE jurors were paid, so that a poor citizen could afford to serve. Ostracism allowed the Assembly to send a person into exile for ten years if enough citizens, at least six thousand, voted against him on pieces of broken pottery.

Yet the system had limits and critics. Only men of Athenian descent counted. Perhaps thirty to forty thousand adult men voted, in a population of several hundred thousand. Pericles, in a funeral speech reported by the historian Thucydides in 431 BCE, praised Athens as a place where laws protected all citizens equally and ability counted more than rank. But Thucydides, who admired Pericles, also described how the Assembly later made rash decisions, such as the disastrous expedition to Sicily in 415 BCE. Plato went further. In the Republic he compared a state to a ship whose crew quarrel over the wheel, with none learning the art of navigation, and argued that those with knowledge, not the majority, should rule. His student Aristotle took a more cautious view. He classified governments by who ruled, one, few or many, and whether they ruled for the common good or for themselves, and favored a mixed constitution.

Philip II of Macedon conquered the Greek city-states by 338 BCE, and in 336 BCE his son Alexander took the throne. The main account of his campaigns was written by Arrian in the second century CE, nearly four hundred years later, from earlier accounts that have since been lost, so historians use it with care. Alexander defeated the Persian king at Gaugamela in 331 BCE and led his army to the Indus. His campaigns covered perhaps eleven thousand miles in about eleven years.

After his death in 323 BCE, his generals founded kingdoms. In the **Hellenistic** world they created, Greek became the language of administration from Egypt to Afghanistan. Cities such as Alexandria in Egypt became centers of learning. Eratosthenes, who directed the Library there, noted that at noon on a summer day the sun's rays cast no shadow at Syene but made a 7.2-degree angle at Alexandria. Because 7.2 degrees is one fiftieth of a full circle, and the cities were about 5,000 stadia apart, he calculated Earth's circumference as about 250,000 stadia. In the east, Greek styles influenced the Buddhist sculpture of Gandhara. Not all effects were gentle. Conquered peoples lost independence, and many Greek-ruled cities were built on land taken from others.

The legacy is mixed: the idea that ordinary citizens can govern, a habit of asking hard questions in philosophy and science, and a pattern of empire that later states copied.
`,
  ],
  cards: [
    ["Solon", "Athenian lawgiver who canceled debts around 594 BCE and banned loans secured by a person's body."],
    ["Cleisthenes", "Athenian reformer who in 508 BCE reorganized the citizens into ten tribes, a founding step of democracy."],
    ["Ostracism", "A vote by pottery sherd to exile a citizen for ten years, needing at least 6,000 votes."],
    ["Thucydides", "Athenian historian who recorded the Peloponnesian War and reported Pericles' funeral speech."],
    ["Plato's ship of state", "An image arguing that a state needs rulers with knowledge, like a ship needs a skilled navigator."],
    ["Mixed constitution", "Aristotle's preference for a government that combines elements of rule by the one, the few and the many."],
    ["Gaugamela", "The 331 BCE battle where Alexander defeated the Persian king Darius III."],
    ["Eratosthenes", "Hellenistic scholar at Alexandria who estimated the Earth's circumference from a shadow angle."],
    ["Gandhara", "Region of present-day Pakistan and Afghanistan where Greek and Buddhist art blended."],
  ],
  closed: [
    [
      "Eratosthenes measured a 7.2-degree angle at Alexandria, 5,000 stadia from Syene. What circumference does this give?",
      ["36,000 stadia", "72,000 stadia", "250,000 stadia", "360,000 stadia"],
      "C",
    ],
    [
      "Alexander's army covered about 11,000 miles in about 11 years. About how many miles per year is that on average?",
      ["About 100 miles", "About 1,000 miles", "About 11,000 miles", "About 121,000 miles"],
      "B",
    ],
    [
      "Why must historians be careful using Arrian's account of Alexander?",
      [
        "Arrian was Alexander's rival",
        "He wrote about four hundred years later, from earlier accounts that have not survived",
        "He wrote in a language no one can read",
        "He was never in Greece",
      ],
      "B",
    ],
    [
      "How did paid jury service under Pericles change Athenian democracy?",
      [
        "It let poorer citizens afford to take part",
        "It ended election by lot",
        "It gave women the vote",
        "It abolished the Assembly",
      ],
      "A",
    ],
    [
      "Plato criticized democracy mainly because he believed:",
      [
        "People who are skilled should rule, not whoever the majority favors",
        "The Assembly met too rarely",
        "Only soldiers should vote",
        "Wealth should decide every issue",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Choose one criticism of Athenian democracy that someone from the time made (for example by Plato or by Thucydides' account of the Sicilian expedition) and evaluate how strong it is. Use at least two facts.",
      scheme: [
        "Accurately states a specific criticism",
        "Identifies who made it, with a correct detail about them",
        "Gives a fact that supports the criticism",
        "Gives a fact or argument that weakens the criticism or limits it",
        "Reaches a reasoned judgment about its strength",
      ],
      model:
        "Plato argued that a ship needs a captain who knows navigation, and that a state should likewise be run by those with knowledge, not by whatever the majority wants. The disastrous Sicilian expedition of 415 BCE, which an Assembly voted for, supports the worry that crowds can be swayed. But Athenians also corrected mistakes in open debate, and juries and the Assembly drew on many citizens' experience, so the criticism overstates the problem. I find it a serious but incomplete critique.",
      answers: [
        [
          "full",
          "[[0|Plato said a state shouldn't be run by whatever the majority votes, just like a ship shouldn't be steered by a crew who vote instead of listening to the navigator]]. [[1|Plato was a student of Socrates, who was executed by an Athenian jury, which probably colored how he saw democracy]]. [[2|The Sicilian expedition in 415 BCE supports his worry because the Assembly was talked into a big risky war that failed]]. [[3|But it can be answered since Athens also had open debate where decisions could be challenged, and experienced citizens made up the Assembly and juries]]. [[4|I think the criticism is serious but not decisive, because even experts make mistakes and the Athenians could correct theirs]].",
          "Full marks. You noticed Plato's own experience with Socrates' trial and weighed the criticism both ways.",
        ],
        [
          "full",
          "[[0|One criticism is that crowds can be persuaded by clever speakers to make rash decisions]]. [[1|Thucydides, who wrote about the Peloponnesian War and admired Pericles, described this after Pericles died]]. [[2|He reported that the Assembly voted for the huge Sicilian expedition of 415 BCE, and it ended in disaster]]. [[3|However, Athenians debated that decision in public and the plan had its opponents, so the problem was a failure of judgment on one occasion, not proof that voting itself is bad]]. [[4|So the criticism is fair about the risks of demagogues, but weaker as an argument against democracy as a whole]].",
          "All five points. Separating the risk of demagogues from the system as a whole is a careful judgment.",
        ],
        [
          "partial",
          "[[0|Plato thought rulers should be wise people instead of a majority vote]]. [[1|Plato was Socrates' student]]. I think he had a point.",
          "You stated the view and said who held it. Support it with a fact, add a limit on it and explain why you judge it as you do.",
        ],
        [
          "partial",
          "[[2|The Sicilian expedition was a failure the Assembly voted for]]. [[3|But the Athenians argued about it]].",
          "You have two facts. Say what criticism these facts bear on and who made it, then give your judgment.",
          true,
        ],
        [
          "weak",
          "Pericles said democracy was bad because only men could vote. That is a good criticism because it was unfair.",
          "Pericles praised Athens' system, so he was not its critic here. Only men voting is a real limit, but a criticism from the time would be one like Plato's.",
        ],
        [
          "weak",
          "[[0|The Greeks said the majority could be wrong]]. So democracy is bad and we shouldn't have it either.",
          "Some Greeks did worry about the majority. Pick one named critic, support the criticism with a fact and decide how strong it is, without jumping to our own time.",
        ],
      ],
    },
    {
      prompt:
        "Explain two lasting effects of Alexander's conquests and evaluate which was more significant for the people of the Hellenistic world. Use at least two specific examples.",
      scheme: [
        "Names a first lasting effect, such as Greek as a common language of administration or trade",
        "Gives a specific example of that effect",
        "Names a second effect, such as cultural blending, new centers of learning or the splitting of the empire",
        "Gives a specific example of the second effect, such as Alexandria, Eratosthenes or Gandhara",
        "States which was more significant",
        "Justifies the judgment with reasoning",
      ],
      model:
        "One effect was that Greek became the common language of administration and trade from Egypt to Afghanistan, so scholars and merchants could communicate across a wide area. A second was cultural blending, as in Gandhara, where Greek sculpting methods shaped Buddhist art, and in Alexandria, where scholars like Eratosthenes worked. I think the cultural blending was more significant because it produced new ideas and art that outlasted the kingdoms, while the language mostly served officials.",
      answers: [
        [
          "full",
          "One effect is that [[0|Greek became a common language in many kingdoms]], for example [[1|in Egypt and Syria officials used Greek for records and trade]]. A second is that [[2|cultures mixed and new centers of learning appeared]], like [[3|Alexandria, where Eratosthenes measured the Earth, and Gandhara, where Greek style was used for Buddha statues]]. [[4|I think the cultural mixing was more significant]] because [[5|it produced new knowledge and art that lasted after the kingdoms collapsed, while the language mostly helped governments]].",
          "Full marks. Your examples are specific and the judgment follows from reasons.",
        ],
        [
          "full",
          "[[0|One lasting effect was that the empire split into Hellenistic kingdoms ruled by Alexander's generals]], like [[1|the Ptolemies in Egypt and the Seleucids in Syria and Persia]]. A second was that [[2|learning spread and grew]], such as [[3|the Library at Alexandria and Euclid's geometry]]. [[4|I would say the spread of learning mattered more]] because [[5|the kingdoms were later conquered by Rome, but Euclid is still taught today]].",
          "All six points. Comparing what lasted against what was swept away is a good criterion for 'significant.'",
        ],
        [
          "partial",
          "[[0|Greek became a common language]] and [[2|cultures blended]]. The blending was more important.",
          "The effects are right. Give specific examples for each, and explain why you judge blending more important.",
        ],
        [
          "partial",
          "[[3|The Library of Alexandria and Gandhara art are examples]]. [[4|I think learning was more significant]]. The empire fell apart too.",
          "Your examples are good. Name the effects they illustrate, and give a reason for your judgment.",
          true,
        ],
        [
          "weak",
          "Alexander made everybody speak Greek forever and everyone was Greek after that.",
          "Greek spread as a language of administration and learning, but local cultures continued and blended with it. Give specific examples of that blending.",
        ],
        [
          "weak",
          "[[2|Learning spread]]. Alexander was great. The most important effect was that he was great.",
          "Learning spreading is a real effect. 'Alexander was great' is an opinion, not an effect. Give examples and a reason for your judgment.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "From republic to principate, and two ways an empire can end",
  note: `
## Objectives

Students will be able to:

1. describe how the Roman Republic became an empire and the effects on the people it ruled;
2. analyze the causes and effects of the rise and decline of the Roman and Han empires.

## Materials

Teacher-written summaries of three sources (a paraphrase of Augustus' own account of his deeds, a Han memorial on the burden of taxes, a Roman coin-weight table), a data sheet on silver content of the Roman denarius, a causation diagram template, and the exit ticket.

## Starter (8 minutes)

Pose a question: "Augustus said he gave the Republic back to the Senate and the people. Did he?" Take a vote and list the reasons.

## Main activity

1. Trace the Republic's crisis: the Gracchi reforms of 133 and 123 BCE, Marius' enrolling of landless men in the army around 107 BCE, Sulla's march on Rome, Caesar crossing the Rubicon in 49 BCE. For each, ask whether the armies' loyalty was shifting from Rome to generals.
2. Read the summary of Augustus' account of his deeds. Students identify what he emphasizes (restoring the Republic, great generosity) and what he omits, then decide how to use the document.
3. Present the third-century crisis: from 235 to 284 CE Rome had around twenty-six emperors, most killed. Show the denarius data: nearly pure silver under Augustus, under 5 percent by about 270 CE. Students explain the link between paying armies and debasing coin.
4. Han: Emperor Wu's salt and iron monopolies, Wang Mang's interruption (9 to 23 CE), the Yellow Turbans in 184 CE, and the collapse in 220 CE. Fill in a causation diagram comparing Roman and Han decline.

## Checking for understanding

Partners decide which of three causes (money, military, leadership) is most important for each empire, with one fact each.

## Exit ticket

One cause of decline that Rome and Han shared and one that was specific to only one.
`,
  reading: [
    "How a republic became an empire, and why empires crack",
    `
By 133 BCE Rome ruled the Mediterranean world, but its success had unsettled the Republic. Wealthy landowners worked huge estates with enslaved captives, many citizen-soldiers lost their farms while on campaign, and the poor drifted to Rome. The tribune Tiberius Gracchus tried to redistribute public land in 133 BCE and was killed by a mob of senators and their followers. Violence had entered Roman politics. Around 107 BCE the general Marius began to enroll landless citizens in the army, promising them land after the war. These soldiers depended on their general rather than the Senate, and ambitious commanders used that loyalty. Sulla marched an army on Rome in 88 BCE. Julius Caesar, after conquering Gaul, crossed the Rubicon with his legion in 49 BCE, starting a civil war, and he was assassinated in 44 BCE by senators who feared he would become a king.

Augustus won the next round of civil wars and ruled for 40 years. In his own account of his achievements, he stressed that he had restored the Republic and refused extra powers. A reader should notice how carefully this was said. He kept the Senate and the old offices but held the real power, controlling the army, the provinces and the treasury. Historians call this system the **principate**, a monarchy dressed in republican clothes. For the people of the provinces, it meant more regular taxes and governors who were less likely to plunder, and for many an eventual path to citizenship. It also meant legions stationed on the frontier and little say in their own government.

The third century CE exposed the empire's weaknesses. Between 235 and 284 CE there were about twenty-six emperors, nearly all killed or overthrown. Armies needed pay, and emperors met the cost by mixing less and less silver into their coins. The denarius had been almost pure silver under Augustus but by about 270 CE contained less than five percent, and prices rose as people lost trust in the money. Plague, invasion on several frontiers and civil war added to the strain. Diocletian and Constantine restored order, but the empire was reorganized into east and west, and in 476 CE the western half ended when a Germanic commander, Odoacer, deposed the last emperor. The eastern half lasted until 1453.

Han China's trouble looked different on the surface and similar underneath. Emperor Wu spent heavily on wars against the Xiongnu, a confederation of horse-riding nomads to the north, and raised revenue through state monopolies on salt and iron. Later, great landowning families escaped taxes and took over small farms, so tax income fell while peasants' burdens grew. A reformer, Wang Mang, seized the throne in 9 CE and tried to redistribute land, but floods, famine and rebellions toppled him in 23 CE. The Han were restored. By the 180s, court factions, powerful eunuchs and generals dominated weak child emperors, and the Yellow Turban Rebellion of 184 CE spread across the Yellow River plain. By 220 CE the empire had split into three kingdoms.

Both empires fell apart when money, military loyalty and leadership failed together. Historians still argue which came first, and a careful answer usually admits that the causes fed each other.
`,
  ],
  cards: [
    ["Gracchi", "Tiberius (killed 133 BCE) and Gaius (killed 121 BCE) Gracchus, tribunes who tried to reform land and grain laws and were killed."],
    ["Marius' reforms", "Around 107 BCE the general Marius enrolled landless men in the army, tying their loyalty to their commander."],
    ["Rubicon", "River boundary of Italy that Caesar crossed with his army in 49 BCE, starting a civil war."],
    ["Principate", "Augustus' system of one-man rule behind republican forms, such as the Senate and consuls."],
    ["Debasement", "Reducing the precious metal in coins to make more money, which causes prices to rise."],
    ["Diocletian", "Emperor from 284 CE who restored order and split administrative duties between east and west."],
    ["Xiongnu", "A confederation of nomadic horse-riding peoples on China's northern frontier."],
    ["Wang Mang", "Official who seized the Han throne in 9 CE and tried land reform; killed in 23 CE during rebellions."],
    ["Causation diagram", "A chart showing how causes lead to effects and how causes can reinforce each other."],
  ],
  closed: [
    [
      "Why did Marius' enrolling of landless men in the army weaken the Republic?",
      [
        "It lowered the number of soldiers",
        "Soldiers depended on their general for land and loyalty, not on the Senate",
        "It made the Senate stronger",
        "It ended wars in Italy",
      ],
      "B",
    ],
    [
      "Between 235 and 284 CE, Rome had about 26 emperors. About how many years did each last on average?",
      ["About 1.9 years", "About 4.5 years", "About 12 years", "About 26 years"],
      "A",
    ],
    [
      "A denarius that was about 95 percent silver under Augustus has 4 percent silver by 270 CE. Roughly what fraction of the silver is left?",
      ["About one half", "About one quarter", "About one twentieth", "About one twenty-fourth"],
      "D",
    ],
    [
      "What did Augustus' claim to have restored the Republic leave out?",
      [
        "That he kept real control of the army, provinces and treasury",
        "That Rome had a Senate",
        "That Rome had consuls",
        "That he lived in Rome",
      ],
      "A",
    ],
    [
      "Which cause of decline is shared by Rome and Han?",
      [
        "Invasion by the same enemy",
        "Rich elites avoiding taxes while rulers lost control of generals",
        "A shortage of paper",
        "Too few written laws",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Evaluate Augustus' claim that he \"restored the Republic.\" Use at least two specific facts about what changed and what stayed the same, and decide how far the claim is true.",
      scheme: [
        "Identifies something that stayed the same, such as the Senate or the consuls continuing",
        "Gives a specific fact about continuity",
        "Identifies something that changed, such as control of the army and provinces",
        "Gives a specific fact about the change, such as Augustus holding command of the legions or the treasury",
        "Considers why Augustus described it this way, such as to avoid the fate of Caesar",
        "Reaches a reasoned judgment about how true the claim is",
      ],
      model:
        "The Senate and the offices of consul continued, and Augustus avoided the title of king. But he controlled the army, the provinces with legions and the treasury, so power was in one man's hands. He described it as a restoration because Caesar had been killed for appearing to want a crown, so he disguised a monarchy in republican forms. The claim is true in form but false in substance.",
      answers: [
        [
          "full",
          "[[0|Some things did stay the same]]: [[1|the Senate still met and there were still consuls elected every year]]. But [[2|the real power changed]]. [[3|Augustus controlled the legions and the provinces that had armies, and he held the treasury]]. [[4|He phrased it as a restoration because Caesar was murdered for acting like a king]]. [[5|So I'd say the claim is true in form but false in substance, since Rome had one ruler in everything but name]].",
          "Full marks. 'True in form but false in substance' is a clear judgment, and you explained his motive.",
        ],
        [
          "full",
          "[[0|The institutions of the Republic were kept]], like [[1|the Senate, the consuls and the Assembly]]. What changed is that [[2|he held the real military power]] since [[3|he commanded the army and decided who governed the provinces where soldiers were stationed]]. [[4|He had to be careful because Julius Caesar was killed by senators who thought he wanted a crown]]. [[5|I think the claim is mostly misleading, since the Republic's key feature was shared power, and that was gone]].",
          "All six points. Defining the Republic by its shared power is a strong criterion.",
        ],
        [
          "partial",
          "[[0|The Senate stayed]] and [[1|there were still consuls]]. So he did restore the Republic.",
          "Your continuity facts are right. Look at what changed, such as who controlled the army, before judging.",
        ],
        [
          "partial",
          "[[2|He was really in charge]] because [[3|he controlled the army]]. [[4|He said it was a republic so people wouldn't be mad]].",
          "Good on change and motive. Add what stayed the same, and state a clear judgment.",
          true,
        ],
        [
          "weak",
          "Augustus was an emperor from the beginning and everybody knew it, so he never claimed to restore anything.",
          "He did claim it, in his own account. The point of the question is to test that claim against what he really controlled.",
        ],
        [
          "weak",
          "[[0|He kept the Senate]]. Everything else was the same so it was restored.",
          "The Senate stayed, but not everything was the same: he held the army and provinces. Add that and evaluate again.",
        ],
      ],
    },
    {
      prompt:
        "Construct an argument about whether money problems or military problems did more to bring down the Roman Empire in the third century CE, with reference to the debasement of the denarius and the number of emperors.",
      scheme: [
        "States a clear claim about which problem did more",
        "Uses accurate evidence about the denarius (silver content falling to under 5 percent)",
        "Uses accurate evidence about military instability (about 26 emperors from 235 to 284 CE)",
        "Explains how the two problems were connected",
        "Answers a counterargument, such as plague or invasion",
      ],
      model:
        "I argue that the two were linked but the military problem was the root, because emperors who needed armies' loyalty paid them with debased coins. The denarius fell from nearly pure silver to under five percent silver by about 270 CE, causing inflation, while around twenty-six emperors came and went between 235 and 284 CE, mostly killed by soldiers. Someone might say plague and invasion did the most damage, but those hit a state already unable to raise stable money or keep a leader.",
      answers: [
        [
          "full",
          "[[0|I think the military problem was the root cause, but money made it worse]]. [[1|The denarius went from almost pure silver to under five percent silver by 270 CE, which caused prices to rise]]. [[2|There were around 26 emperors between 235 and 284 and most were killed, often by their own soldiers]]. [[3|The link is that emperors needed to pay the army to stay in power, so they debased the money, which weakened the economy and made it even harder to pay]]. [[4|Someone could say plague and invasions did more damage, but they hit a state that already couldn't keep a stable ruler or currency]].",
          "Full marks. You explained how the two causes fed each other and answered the best counterargument.",
        ],
        [
          "full",
          "[[0|My claim is that money problems did more, because they weakened everything else]]. [[1|The silver in the denarius fell to under 5 percent by around 270 CE, so wages and taxes lost value]]. [[2|The military problem was real: about 26 emperors in 49 years]]. [[3|But the soldiers turned on emperors when they weren't paid enough, so the money problem produced the instability]]. [[4|You could say invasions were the cause, but weaker finances meant Rome could not defend or reward its soldiers]].",
          "All five points. You took the opposite side from the first answer and defended it with the same evidence, which shows the evidence can support more than one reading.",
        ],
        [
          "partial",
          "[[0|I think the military mattered more]]. [[2|There were 26 emperors in 49 years]]. They kept getting killed.",
          "A clear claim with one good fact. Add the denarius evidence, explain how the two connect and answer an objection.",
        ],
        [
          "partial",
          "[[1|The denarius had less and less silver, under 5 percent]], so [[3|emperors were paying soldiers with bad money]]. It was a money problem.",
          "You connected the coin to the soldiers well. Use the emperor evidence too, state a claim about which did more, and answer a counterargument.",
          true,
        ],
        [
          "weak",
          "It was the barbarians. They attacked and that's all that happened in the third century so the money doesn't matter.",
          "Invasions were a real problem, but the question is about money and the army, and the evidence shows both mattered. Use the denarius and emperor numbers.",
        ],
        [
          "weak",
          "[[2|There were 26 emperors]] and that's a lot so it's military. Money is just money.",
          "The 26 emperors is good evidence. But the denarius evidence shows why money mattered. Use both and explain how they connect.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Mauryan power, Gupta science, four faiths and three kinds of proof",
  note: `
## Objectives

Students will be able to:

1. describe the Maurya and Gupta empires of India and their contributions to mathematics and science;
2. compare the beliefs and practices of Hinduism, Buddhism, Judaism and Christianity and explain how each spread;
3. identify what an ancient inscription, a coin and a chronicle can and cannot show as evidence.

## Materials

Paraphrased excerpt cards on Ashoka's thirteenth rock edict, a Kushan coin description, and a passage from the Sri Lankan Mahavamsa chronicle, a map with the four faiths' spread, a comparison matrix, calculators, and the exit ticket.

## Starter (8 minutes)

Write on the board: "62,832 divided by 20,000." Have students compute (3.1416) and tell them an Indian astronomer worked this out about 1,500 years ago. Ask: "What does a number like this tell you about what a society could do?"

## Main activity

1. Source triad. Give each group one of the three cards (the rock edict, the Kushan coin, the Mahavamsa) and a worksheet with four questions: who made it, what does it claim or show, what could it not show, what second source would you add? Each group reports out.
2. Compare the faiths. In pairs, students complete the matrix on origin, central teaching, key texts or practices, and mode of spread. Push on mode: not "it spread" but "carried by whom, along what route, and helped or hindered by which power?"
3. Discuss Ashoka's thirteenth edict. Students list what he claims, which parts could be checked by other evidence, and what the edict says about how he wanted to be seen.

## Checking for understanding

Each pair states one claim about Ashoka that the edict supports and one claim it cannot support.

## Exit ticket

Pick two faiths and one source type. Write one way a historian could use that source to learn how the faith spread, and one thing the source could not tell her.
`,
  reading: [
    "What an emperor said, what a coin showed, what monks remembered",
    `
The Maurya Empire began when Chandragupta Maurya took the Ganges kingdom of Magadha about 321 BCE and defeated the Greek-ruled regions left by Alexander. A Greek ambassador, Megasthenes, lived at the Maurya capital, Pataliputra, and wrote about it. His book is lost, and we know it only from passages quoted by later authors, which is a reminder that even a firsthand witness can reach us secondhand. A Sanskrit handbook of statecraft, the Arthashastra, attributed to the minister Kautilya, advises kings on spies, taxes and war, though scholars argue about how much of it dates to Mauryan times.

Ashoka, Chandragupta's grandson, ruled from about 268 to 232 BCE. His thirteenth rock edict says that in the eighth year of his reign he conquered Kalinga, that 150,000 people were deported, 100,000 were killed and many times that number died, and that he felt deep remorse. From then on he claims to have sought conquest by dhamma, a code of ethical conduct, rather than by force. He had edicts, written in several scripts and languages, set up from Afghanistan to southern India. The source is invaluable and limited. The figures come from Ashoka himself, written to show his transformation, and cannot be checked by another source. Archaeology confirms the pillars and the wide spread of his message, but not how officials behaved. A later chronicle from Sri Lanka, the Mahavamsa, compiled by Buddhist monks several centuries afterward, says Ashoka's son Mahinda brought Buddhism to the island. That is a religious community's memory of its own beginnings, which may preserve true events but also shapes them. Coins give a different kind of evidence. Kushan rulers, who held northwestern India in the first centuries CE, struck gold coins showing Greek, Persian, Hindu and Buddhist figures, including the Buddha, evidence that trade and rule brought traditions together. But a coin shows what a ruler chose to put on it, not the beliefs of those who held it.

Under the Gupta rulers, from about 320 to 550 CE, scholars made advances that spread far beyond India. Place-value notation with a symbol for zero was in use, and Aryabhata, writing in 499 CE, gave pi as 62,832 divided by 20,000, or 3.1416, and argued that the Earth rotates. Indian medical texts such as the Sushruta Samhita describe surgery and instruments. These ideas traveled to the Islamic world and then to Europe.

The four faiths grew by different routes. **Hinduism** has no single founder; it grew from the Vedas and the Upanishads, which introduced ideas of karma, rebirth and moksha, release from rebirth, and it spread through teachers, trade and royal patronage into Southeast Asia. **Buddhism** began with Siddhartha Gautama around 500 BCE and spread through monks, merchants and Ashoka's missions. **Judaism** centers on one God, a covenant, and the Torah, and its people were scattered after the Babylonians destroyed the First Temple in 586 BCE and the Romans the Second in 70 CE. **Christianity** began in Roman Judea, spread by missionaries like Paul along Roman roads, survived waves of persecution, and was legalized in 313 CE and made the empire's official religion in 380 CE.

A strong historical claim uses these kinds of sources together, noting what each can and cannot do.
`,
  ],
  cards: [
    ["Dhamma", "Ashoka's term for ethical conduct and tolerance, which he promoted in his edicts."],
    ["Arthashastra", "An ancient Indian handbook of statecraft attributed to Kautilya, minister of Chandragupta."],
    ["Megasthenes", "Greek ambassador to the Maurya court whose lost account survives only in quotations."],
    ["Mahavamsa", "A Sri Lankan Buddhist chronicle compiled by monks, recording Buddhism's arrival with Ashoka's son."],
    ["Kushan coins", "Gold coins of the Kushan kings, showing gods from several traditions including the Buddha."],
    ["Aryabhata", "Gupta-era astronomer (writing in 499 CE) who gave pi as 3.1416 and argued that the Earth rotates."],
    ["Moksha", "In Hindu thought, release from the cycle of rebirth."],
    ["First and Second Temple destruction", "Babylon destroyed the First in 586 BCE; Rome the Second in 70 CE, scattering Jewish communities."],
    ["Edict of Milan", "A 313 CE agreement of Constantine and Licinius allowing Christians to worship freely."],
  ],
  closed: [
    [
      "Aryabhata's value of pi is 62,832 divided by 20,000. What is that, rounded to four decimal places?",
      ["3.1306", "3.1416", "3.1426", "3.2832"],
      "B",
    ],
    [
      "Why must a historian be careful with the casualty figures in Ashoka's thirteenth edict?",
      [
        "They are written in a language no one can read",
        "They come from Ashoka himself, written to show his remorse, and cannot be checked by another source",
        "They were written centuries later by monks",
        "They contradict the pillars",
      ],
      "B",
    ],
    [
      "What can a Kushan gold coin showing the Buddha best prove?",
      [
        "That every Kushan subject was Buddhist",
        "That Kushan rulers allowed or promoted Buddhist imagery alongside other traditions",
        "That Buddhism began with the Kushans",
        "That the coin was made in Rome",
      ],
      "B",
    ],
    [
      "Why is the Mahavamsa not a neutral source on Buddhism's arrival in Sri Lanka?",
      [
        "It was written by Romans",
        "It was compiled by Buddhist monks who preserved their community's own story",
        "It was written before the events",
        "It has no mention of Ashoka",
      ],
      "B",
    ],
    [
      "From the First Temple's destruction in 586 BCE to the Second Temple's in 70 CE, how many years apart were they?",
      ["About 516 years", "About 586 years", "About 655 years", "About 70 years"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A historian is writing about Ashoka. Evaluate how useful his thirteenth rock edict is as evidence for (a) what happened in Kalinga and (b) how Ashoka wanted to be seen, and name one additional source that would strengthen her account.",
      scheme: [
        "Identifies that the edict is a primary source in Ashoka's own voice",
        "Evaluates its usefulness for the events in Kalinga with a limit, such as the figures being unverified",
        "Evaluates its usefulness for how Ashoka wanted to be seen, such as showing him as remorseful and just",
        "Explains why the author's purpose affects both",
        "Names an additional source and what it would add",
      ],
      model:
        "The edict is a primary source in Ashoka's own words, so it is valuable but not neutral. For Kalinga it gives casualty figures, but they come only from Ashoka, who may have wanted to dramatize his change of heart, and cannot be checked. It is much stronger evidence for how he wanted to be seen, as a ruler who regretted violence and preached ethical rule. A second source, such as an archaeological survey of Kalinga for destroyed settlements, or a foreign account, would test the figures.",
      answers: [
        [
          "full",
          "[[0|The edict is a primary source because it's Ashoka himself speaking]]. For what happened, [[1|it gives numbers like 100,000 killed, but those are only his claims and nobody else can confirm them]]. For how he wanted to be seen, [[2|it's very strong because it shows him as a king who regretted war and wanted ethical rule]]. [[3|Both are affected by why he wrote it: he wanted people to see his change, so he might have made the violence sound worse or the change more dramatic]]. [[4|Archaeology at Kalinga that shows destroyed towns would help check the numbers]].",
          "Full marks. You separated the two uses and explained how Ashoka's purpose touches both.",
        ],
        [
          "full",
          "[[0|Since the edict was ordered by Ashoka and carved under his authority, it is a primary source in his own voice]]. [[1|As evidence of what happened in Kalinga it is weaker, since we only have his word for the death toll and he may have rounded or exaggerated]]. [[2|As evidence of the image he wanted, it is excellent, because it's a public message designed to show him as a just king]]. [[3|The same purpose that makes it good for the second use makes it risky for the first]]. [[4|An outside source like a Greek or Sri Lankan account of the war would add a check]].",
          "All five points. The sentence that the same purpose helps one use and hurts the other is exactly the kind of point a historian makes.",
        ],
        [
          "partial",
          "[[0|It is a primary source from Ashoka]]. [[2|It shows he wanted to look like a good ruler]]. It is useful.",
          "The primary-source point and the image point are right. Judge it for the events too, say how his purpose matters and add a second source.",
        ],
        [
          "partial",
          "[[1|The numbers can't be checked]] and [[4|a source from Sri Lanka could help]]. [[3|He wrote it for his own reasons]].",
          "Good on limits and on a second source. Say what the edict is useful for, since an evaluation weighs value as well as limits.",
          true,
        ],
        [
          "weak",
          "The edict is completely reliable because it's carved in stone and kings were honest back then.",
          "Stone lasts, but the person who dictated it had reasons for what he said. A historian checks the author's purpose.",
        ],
        [
          "weak",
          "[[0|It is a source from Ashoka's time]]. It's useless because it only tells us what Ashoka said.",
          "It is from his time, which is right. But what a ruler says is useful evidence of how he wanted to be seen. Evaluate it for both uses.",
        ],
      ],
    },
    {
      prompt:
        "Compare how Buddhism and Christianity each spread in their first several centuries. Include at least two similarities or differences in who carried them, which routes they followed, and the role of rulers.",
      scheme: [
        "Accurately describes who carried Buddhism (monks, merchants, Ashoka's missions)",
        "Accurately describes who carried Christianity (missionaries such as Paul, early communities)",
        "Identifies the routes of one faith, such as Silk Road trade or Roman roads and sea lanes",
        "Identifies the routes of the other faith",
        "Compares the role of rulers, such as Ashoka's patronage versus Roman persecution then Constantine's support",
        "Draws a clear comparison or contrast",
      ],
      model:
        "Buddhism was carried by monks and merchants and supported by kings such as Ashoka, who sent missions to Sri Lanka, and it followed trade routes including the Silk Road into central Asia and China. Christianity was carried by missionaries such as Paul and by small communities along Roman roads and sea lanes. The role of rulers differed: Ashoka promoted Buddhism early, while Christians were sometimes persecuted by Roman emperors until Constantine legalized the faith in 313 CE. Both spread along trade and travel routes, but Buddhism had early royal support while Christianity grew despite official hostility.",
      answers: [
        [
          "full",
          "[[0|Buddhism was carried by monks and merchants and Ashoka sent missions]]. [[1|Christianity spread through missionaries like Paul and little communities in cities]]. [[2|Buddhism followed the Silk Road into central Asia and China]], and [[3|Christianity traveled along Roman roads and sea lanes]]. [[4|The difference with rulers is that Ashoka supported Buddhism early, while Roman emperors persecuted Christians until Constantine legalized it in 313]]. [[5|So they were similar in being carried along trade routes, but Buddhism had royal help from the start and Christianity grew despite official opposition]].",
          "Full marks. Your final sentence draws the comparison clearly instead of just listing facts.",
        ],
        [
          "full",
          "A similarity is that [[0|merchants and traveling monks carried Buddhism]] and [[1|merchants and missionaries carried Christianity]] across wide areas. [[2|Buddhism used the Silk Road and the sea routes to Sri Lanka and Southeast Asia]], while [[3|Christianity used the Roman road network and the Mediterranean]]. [[4|A difference is that Ashoka sent Buddhist missions, but Rome persecuted Christians, for example under Diocletian, until Constantine]]. [[5|The overall pattern is that both used existing trade networks, but their relationships with the state were opposite for the first few centuries]].",
          "All six points. 'Opposite relationships with the state' is a crisp conclusion.",
        ],
        [
          "partial",
          "[[0|Buddhism was spread by monks and Ashoka]] and [[1|Christianity was spread by Paul]]. They both spread a lot.",
          "The carriers are right. Say which routes each followed and compare the rulers' roles.",
        ],
        [
          "partial",
          "[[3|Christianity used Roman roads]] and [[4|Roman emperors persecuted Christians until Constantine]]. Buddhism spread too.",
          "Two good facts about Christianity. Describe Buddhism's carriers, routes and rulers, and make a comparison.",
          true,
        ],
        [
          "weak",
          "Both spread because armies forced people to convert. Christians had the Roman army and Buddhists had Ashoka's army.",
          "Neither mainly spread by forced conversion. Buddhism spread by monks, merchants and missions, and Christians were persecuted before Constantine. Review the routes.",
        ],
        [
          "weak",
          "[[1|Christianity was spread by Paul]]. Buddhism started in China so it spread from there.",
          "Paul is right. But Buddhism began in India with Siddhartha Gautama and spread to China later. Check where each began.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Staying power: comparing evidence on empires, and feeding and watering them",
  note: `
## Objectives

Students will be able to:

1. use evidence from several sources to argue why one classical empire lasted longer than another;
2. use maps and population data to describe how early societies met their needs for food and water.

## Materials

A data sheet with lifespans, a Han census summary (about 59.6 million people in 12.2 million households, 2 CE), an aqueduct elevation card (a 50 km channel dropping 17 meters), a map of the Nile and Yellow River valleys with population shading, calculators, and the exit ticket.

## Starter (8 minutes)

Give the four lifespans (Maurya about 137 years, Gupta about 230, Han 421, western Rome about 502) and ask for the average and the range. Then ask: "A longer life means a better empire. Agree or disagree?" Use disagreement to separate "lasted long" from "governed well."

## Main activity

1. Evidence stations. Four cards: Han census, a description of Roman citizenship grants, a note on the Maurya's dependence on Ashoka, and a description of Gupta decentralization (local rulers kept power). Groups record on a matrix what each card shows about integration, loyalty and succession.
2. Argument workshop. Pairs draft a three-sentence argument: claim, two pieces of evidence, a counterclaim answered. They exchange and critique.
3. Food and water. Use the census: if 59.6 million lived in 12.2 million households, how many per household? On the map, locate where the population is densest. Discuss why people cluster near rivers and how technology extended supply: canals, aqueducts. Compute the aqueduct's slope: 17 meters in 50 kilometers.

## Checking for understanding

Whiteboards: show the average household size, the aqueduct slope in meters per kilometer, and one limit of the census as evidence.

## Exit ticket

State your claim about why an empire lasted longer and name the evidence that most challenges it.
`,
  reading: [
    "Lifespan, households and a gentle slope: evidence about how empires lasted",
    `
Counting years does not explain longevity, but it frames the question. The Mauryan Empire lasted about 137 years, the Gupta about 230, the Han 421 and the western Roman Empire about 502, from Augustus to 476 CE. The republic before that lasted 482 years. A historian asks what held each together, and the best answers combine several kinds of evidence.

The Han census of 2 CE is one of the oldest surviving population counts. It records about 59.6 million people in about 12.2 million households, an average of nearly five per household. To collect it, officials had to know where every family lived, which required local registers, reliable roads and a literate administration. That is evidence of a government's reach, and a reason to ask who was left out: families hiding from taxes or conscription may not appear. The census also shows that most people lived in the river valleys. The Yellow River plain and the Wei and Yangtze valleys held the largest numbers, because water and soil were there.

Rome's integration was different. It extended citizenship to allies and eventually, in 212 CE, to nearly all free inhabitants of the empire. Citizenship brought legal protection and a stake in the empire, but also tax obligations. Roman law, Latin and Greek, the army and roads linked provinces together. The Mauryan system rested more on one capable ruler and a bureaucracy built around him, and the dynasty's decline after Ashoka suggests how fragile this could be. The Guptas ruled more loosely: subordinate kings kept their own territory in return for tribute and loyalty, a form of rule that required less administration but gave the center less control. Such a system can last if the center is respected, but it can fragment quickly when it is not.

Food and water explain why population gathered where it did, and how rulers pushed those limits. In Egypt, today as in antiquity, nearly all the population lives close to the Nile because the desert beyond receives almost no rain. A city the size of Rome, about a million people, needed roughly 1.5 million pounds of grain per day at 1.5 pounds each. Local farms could not supply it, so ships brought grain from Egypt and North Africa. Water arrived by aqueduct. Roman engineers had no pumps, so they let gravity do the work, laying channels with a gentle, steady slope. A channel in southern Gaul that drops 17 meters over 50 kilometers falls only 0.34 meters per kilometer, a gradient of about one in three thousand. Building that accurately across valleys and hills required surveying skill and a large labor force. Han engineers also dug canals to carry grain to northern garrisons.

The strongest arguments about longevity do not rely on one number. They put forward a claim, such as "citizenship and law tied the Roman provinces to the center," test it with sources that disagree, and say where the evidence is thin.
`,
  ],
  cards: [
    ["Han census of 2 CE", "A count of about 59.6 million people in about 12.2 million households, among the earliest surviving population records."],
    ["Citizenship edict of 212 CE", "An edict extending Roman citizenship to nearly all free inhabitants of the empire."],
    ["Subordinate kings", "Local rulers who keep power in return for tribute and loyalty to a central ruler, as in the Gupta system."],
    ["Gradient", "The steepness of a slope, here the drop in height per unit of distance."],
    ["Aqueduct slope", "A gentle, constant fall of the channel, often under half a meter per kilometer, that lets gravity move water."],
    ["Selection bias in a census", "A flaw when some groups, such as people avoiding taxes, are less likely to be counted."],
    ["Integration", "How tightly an empire's regions are tied to the center by law, roads, trade or loyalty."],
    ["Counterclaim", "A reasonable objection to an argument that the writer answers."],
  ],
  closed: [
    [
      "The Han census counted about 59.6 million people in about 12.2 million households. About how many people per household is that?",
      ["About 2.4", "About 4.9", "About 7.3", "About 12.2"],
      "B",
    ],
    [
      "An aqueduct channel drops 17 meters over 50 kilometers. What is its slope in meters per kilometer?",
      ["0.17", "0.34", "2.9", "3.4"],
      "B",
    ],
    [
      "Which statement about the Gupta system of rule best explains why it could fragment?",
      [
        "It had no army",
        "Subordinate kings kept their own territory, so the center depended on their loyalty",
        "It used only a single written language",
        "It had too many roads",
      ],
      "B",
    ],
    [
      "A city of 800,000 eats 1.5 pounds of grain per person per day. How many pounds of grain are needed in a 30-day month?",
      ["1,200,000", "24,000,000", "36,000,000", "36,000"],
      "C",
    ],
    [
      "Which is the best reason to question the Han census as complete evidence of population?",
      [
        "It was written in a foreign language",
        "Some families may have avoided registration to dodge taxes or conscription",
        "It counted too many people",
        "It was produced by Romans",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Argue whether Roman integration (citizenship, law and roads) or the Han civil service explains better why each empire lasted four to five centuries. Choose one as the stronger explanation and answer an objection.",
      scheme: [
        "States a clear claim comparing the two explanations",
        "Gives accurate evidence about Roman integration",
        "Gives accurate evidence about the Han civil service or census",
        "Explains the reasoning that links the evidence to longevity",
        "States a counterclaim",
        "Answers the counterclaim with evidence or reasoning",
      ],
      model:
        "I argue that the Han civil service explains the empire's longevity better because it kept the center in contact with every household and produced loyal officials chosen by merit. The Han census of 2 CE, counting about 59.6 million people, shows how far the government's records reached. Roman integration also mattered, through citizenship in 212 CE, law and roads, but it often depended on armies. Someone could say Roman law and roads were just as unifying. That is true, but Rome's army frequently made and unmade emperors, so its integration was weaker at the top, where the Han system provided continuity even under weak emperors.",
      answers: [
        [
          "full",
          "[[0|I think the Han civil service is the stronger explanation]]. [[1|Rome had citizenship, which was extended to almost all free people in 212 CE, plus law and roads]]. [[2|The Han census of 2 CE counted about 59.6 million people, which shows their officials knew where people lived and could collect taxes]]. [[3|A civil service that works even when the emperor is weak keeps the empire running, and that's what lets an empire last]]. [[4|Someone could argue that Roman law and roads were just as unifying]]. [[5|That's fair, but Rome's army kept making and killing emperors, so the center was unstable, while Han officials gave steady continuity]].",
          "Full marks. Your objection is a real one and your answer uses evidence about the army, not just opinion.",
        ],
        [
          "full",
          "[[0|My claim is that Roman integration explains the long life of Rome better than Han's civil service explains Han's]]. [[1|Roman citizenship was widened until 212 CE, and law and roads linked the provinces so people felt part of it]]. [[2|The Han census shows an impressive government, but only that officials counted people, and it may have missed families dodging taxes]]. [[3|Giving people a stake and a legal identity works better as glue than just collecting information on them]]. [[4|The objection is that the Han civil service kept weak emperors from collapsing the state]]. [[5|But the Han fell in 220 CE after generals and court factions took over, so officials couldn't hold it together, while Rome in the west lasted 500 years]].",
          "All six points. You argued the other side from the first answer, with evidence about the census's limit and the Han's end.",
        ],
        [
          "partial",
          "[[0|I think the Han civil service explains it better]]. [[2|The Han census counted 59.6 million people]]. Rome had roads too.",
          "A claim and one good fact. Give accurate Roman evidence, explain why it supports your claim, and answer an objection.",
        ],
        [
          "partial",
          "[[1|Rome gave citizenship to people in 212 CE and had roads and laws]]. [[4|Some people say the Han were better]]. Rome lasted longer so I'm right.",
          "Your Roman evidence is accurate. Name a claim, give Han evidence, and answer the objection with reasoning, not just the length of life.",
          true,
        ],
        [
          "weak",
          "Both empires lasted because they had good emperors who ruled for hundreds of years.",
          "No emperor ruled for hundreds of years. Rome and Han each had many rulers, so look at lasting institutions like law, roads and civil service.",
        ],
        [
          "weak",
          "[[0|The Han was better]] because it was bigger. Rome was too small.",
          "The Roman Empire was also very large. Size is not an explanation by itself. Use the institutions in the reading.",
        ],
      ],
    },
    {
      prompt:
        "A Roman engineer lays an aqueduct channel that must drop 17 meters over 50 kilometers. Calculate the slope in meters per kilometer, and explain why a gentle, constant slope mattered and what this shows about how Roman cities met their need for water.",
      scheme: [
        "Sets up the division 17 divided by 50",
        "Gets 0.34 meters per kilometer, with a unit",
        "Explains that gravity moves the water, so the slope must be constant",
        "Explains why too steep or too flat would cause problems, such as erosion or stagnation",
        "Links to how cities got water from distant sources, showing planning and large labor",
      ],
      model:
        "17 meters divided by 50 kilometers is 0.34 meters per kilometer. A Roman aqueduct had no pumps, so gravity moved the water, which requires a gentle, constant slope. Too steep and the water would rush and erode the channel; too flat and it would stagnate or stop. Building such precise slopes over long distances shows that Roman cities got water from far away through careful surveying and large labor forces.",
      answers: [
        [
          "full",
          "[[0|17 divided by 50]] is [[1|0.34 meters per kilometer]]. [[2|There were no pumps so the water ran because of gravity, and the slope has to stay constant]]. [[3|If it's too steep the water would rush and wear down the channel, and if it's too flat it wouldn't move]]. [[4|This shows Romans brought water from far away with careful surveying and a lot of workers]].",
          "Full marks. The calculation is right with its unit and you explained why a gentle slope was the whole design.",
        ],
        [
          "full",
          "To find the slope I did [[0|17 m / 50 km]] and got [[1|0.34 meters per kilometer]]. [[2|Without pumps the Romans needed gravity, so the channel had to run downhill the whole way]]. [[3|If the slope were too steep the water could damage the channel, and too gentle and it would stagnate]]. [[4|So Roman cities got water from far-off hills only because engineers could survey well and organize big labor forces]].",
          "All five points. The unit and the two-sided reason for a gentle slope are both correct.",
        ],
        [
          "partial",
          "[[0|17 / 50]] = [[1|0.34]]. [[2|Gravity moved the water]].",
          "The calculation is right, but include the unit, meters per kilometer. Explain why the slope should be gentle and what it shows.",
        ],
        [
          "partial",
          "[[2|The water ran by gravity so it had to go downhill]]. [[4|It shows the Romans were good engineers who brought water from far away]]. The slope is 3.4.",
          "Your reasoning is sound, but 3.4 is wrong: 17 divided by 50 is 0.34. Check the decimal place.",
          true,
        ],
        [
          "weak",
          "50 / 17 = 2.94 meters per kilometer. The Romans used pumps and slaves turned them.",
          "You divided the wrong way around, and Roman aqueducts did not use pumps. Divide the drop by the distance.",
        ],
        [
          "weak",
          "[[4|It shows Romans were good at building]]. The slope was really steep so water flowed fast.",
          "A steep slope would erode the channel. The point is a gentle, constant slope. Calculate it and explain why.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Reading the trade routes: what moved, who profited and how we know",
  note: `
## Objectives

Students will be able to:

1. gather information about Silk Road and Indian Ocean trade from several primary and secondary sources;
2. combine evidence from several sources to support a claim about how ideas spread along trade routes.

## Materials

Six source cards (a paraphrase of Pliny the Elder on the drain of coin to the East, a summary of the Periplus of the Erythraean Sea, a note on Sima Qian's account of Zhang Qian, a summary of the Chinese monk Faxian's travel diary, a description of Roman coin finds in southern India, a secondary-source paragraph on Sogdian merchants), a source log with columns for provenance, claim, bias and corroboration, calculators, and the exit ticket.

## Starter (8 minutes)

Pose a claim: "Rome lost its wealth to China and India." Ask: "What would you need to see to believe it?" List the kinds of evidence students propose and group them as primary and secondary.

## Main activity

1. Source log. In groups, students work through the six cards and complete the log, flagging for each one who wrote it, what it claims, whether the author had reason to exaggerate and which other card corroborates it.
2. Pliny's number. He complained that Rome lost about 100 million sesterces a year to India, China and Arabia. Students calculate what that means: if a soldier earned about 900 sesterces a year, how many soldiers' annual pay was that? Then evaluate: was Pliny a neutral accountant?
3. Ideas along routes. Using the Faxian and Zhang Qian cards, students trace how Buddhism and knowledge of western lands moved, then draft a claim with two sources, one corroborating and one complicating.

## Checking for understanding

Pairs write one claim and the evidence that supports it, and mark what would change their mind.

## Exit ticket

Which of the six sources is least reliable for the claim "Rome's wealth flowed East," and why?
`,
  reading: [
    "Merchants, monks and a complaint from Pliny",
    `
Two systems of exchange carried goods and ideas across the ancient world. The overland **Silk Road** linked Chang'an with Central Asia and the eastern Mediterranean, and the maritime **Indian Ocean** route linked East Africa, Arabia and India with Southeast Asia and China. Each system left a different pattern of evidence, and a historian's task is to read them together.

On the overland route, the Han emperor Wu sent an envoy, Zhang Qian, west in 138 BCE to find allies against the Xiongnu. He was held captive for about a decade, then returned with reports of the kingdoms of Central Asia. Sima Qian, the Han court historian writing about a generation later, included his account in the Records of the Grand Historian. It is a primary source by a writer close to events, but it was written for the court and to some degree reflects what the court wanted from the expedition. In later centuries the route was controlled by intermediaries: the Kushan Empire in northern India and Afghanistan, the Parthians in Iran, and Sogdian merchants from the region around Samarkand, whose language was widely used in trade. Few traders traveled the whole way, which is why goods grew more expensive at each handoff.

Sources from the sea tell of the monsoon system. The Periplus of the Erythraean Sea, a guide written in Greek by an unnamed merchant in the first century CE, lists ports from the Red Sea to India, naming the goods each exports and imports and warning about hazards. It records that ships left Egyptian ports in July and rode the southwest monsoon to India. Excavations in southern India have recovered Roman coins and Mediterranean pottery, which corroborates the Periplus. Neither tells us about the people who worked the ships.

The scale of the trade worried some Romans. Pliny the Elder wrote in the first century CE that India, China and Arabia drained about 100 million sesterces from the empire every year in payment for luxuries. If a legionary earned about 900 sesterces a year, that sum equals the annual pay of more than 100,000 soldiers. Pliny's figure may be an exaggeration, since he was a moralist complaining about luxury. We have no way to check it against another source. Yet the complaint itself is evidence of how much Romans valued silk and spices, and the Roman coin finds in India give it some support.

Ideas moved with the goods. A Chinese Buddhist monk named Faxian traveled from China to India between about 399 and 412 CE to find Buddhist texts and returned by sea, writing an account of the monasteries he visited. His travels, and the monasteries supported by merchants along the routes, show that Buddhism's spread was bound up with trade. Disease traveled too. Some historians link epidemics in Rome and in Han China in the second century CE to growing contacts, but the evidence is debated.

A good claim about trade uses sources of different kinds: a guidebook, coins, a diary, a complaint, a court history. Where they support each other, the claim is stronger; where one stands alone, as Pliny's figure does, it must be marked as uncertain.
`,
  ],
  cards: [
    ["Sima Qian", "Han court historian whose Records of the Grand Historian include the account of Zhang Qian's mission."],
    ["Sogdians", "Merchants from the region of Samarkand who dominated overland trade, speaking a language used across Central Asia."],
    ["Kushan Empire", "A state in northern India and Afghanistan that profited as middleman between China, India and Rome."],
    ["Parthians", "Rulers of Iran who controlled the land between Rome and the Silk Road."],
    ["Pliny the Elder", "Roman writer who complained that luxury trade drained about 100 million sesterces a year from the empire."],
    ["Sesterce", "A Roman coin worth a quarter of a denarius."],
    ["Faxian", "A Chinese Buddhist monk who traveled to India about 399 to 412 CE and wrote an account."],
    ["Corroboration", "Support for a claim from a separate, independent source."],
    ["Intermediary", "A person or state that handles goods between sellers and buyers, taking a profit."],
  ],
  closed: [
    [
      "Pliny says 100 million sesterces left Rome each year. A soldier earns 900 sesterces a year. How many soldiers' annual pay is that, approximately?",
      ["About 9,000", "About 90,000", "About 111,000", "About 900,000"],
      "C",
    ],
    [
      "What is the best reason to treat Pliny's figure of 100 million sesterces with caution?",
      [
        "He was writing in Chinese",
        "He was a moralist complaining about luxury and his figure cannot be checked against another source",
        "Sesterces did not exist in his time",
        "He had never heard of India",
      ],
      "B",
    ],
    [
      "Roman coins found in southern India support which source?",
      [
        "The Periplus, which describes trade between the Roman world and Indian ports",
        "Sima Qian's account of the Xiongnu",
        "Faxian's diary",
        "The Code of Hammurabi",
      ],
      "A",
    ],
    [
      "Why did goods on the Silk Road become more expensive at each handoff?",
      [
        "Each intermediary took a profit and bore the costs and risks of travel",
        "The goods grew heavier",
        "Governments banned trade",
        "Camels refused to travel far",
      ],
      "A",
    ],
    [
      "Sima Qian wrote about Zhang Qian roughly a generation after the mission. How should a historian treat the account?",
      [
        "As worthless because it was not written during the mission",
        "As a valuable account by someone near to events, read with awareness that it was written for the court",
        "As certain truth because it is Chinese",
        "As proof that the Silk Road did not exist",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Evaluate Pliny's claim that India, China and Arabia drained about 100 million sesterces a year from Rome. Say what supports it, what weakens it, and how confident a historian should be.",
      scheme: [
        "Identifies Pliny's purpose or position, such as moralist criticizing luxury",
        "Explains how this affects reliability",
        "Gives evidence that supports it, such as Roman coins in India or the Periplus listing trade goods",
        "Notes that the figure itself cannot be verified or has no corroborating source",
        "Makes a reasoned statement of how confident a historian should be",
      ],
      model:
        "Pliny was a moralist complaining about luxury, so he had a reason to exaggerate the amount flowing out of Rome. Roman coin finds in southern India and the Periplus, which lists the goods Rome bought, support the claim that significant trade existed. But the exact figure of 100 million sesterces has no second source to confirm it. A historian should be confident that trade was large and valuable, but cautious about the exact number.",
      answers: [
        [
          "full",
          "[[0|Pliny was a moralist who disapproved of luxury]], so [[1|he had a motive to make the loss sound huge, which lowers how far we can trust the number]]. [[2|What supports the idea of big trade is that Roman coins have been found in southern India and the Periplus lists the goods Rome bought]]. [[3|But the figure of 100 million can't be checked because no other source gives it]]. [[4|So a historian should be fairly confident that the trade was large and valuable but treat the exact amount as uncertain]].",
          "Full marks. You separated 'trade was large' from 'the exact number is right', which is the careful move.",
        ],
        [
          "full",
          "[[0|Pliny wrote as someone worried about Roman morals, complaining about silk and perfume]]. [[1|That purpose means he may have exaggerated to make his point]]. [[2|The coin finds in India show Roman money did go east, and the Periplus supports it by listing trade goods]]. [[3|However, nothing else confirms 100 million sesterces]]. [[4|I would say the trade claim is solid but the number is a rough, possibly inflated estimate]].",
          "All five points. Calling it 'a rough, possibly inflated estimate' is exactly the confidence level the evidence allows.",
        ],
        [
          "partial",
          "[[0|Pliny was a moralist]]. [[2|Roman coins in India back him up]]. I think he's mostly right.",
          "Two good points. Explain how his purpose matters, note that the exact figure is unverified, and say how confident a historian should be.",
        ],
        [
          "partial",
          "[[3|The number can't be verified]] and [[4|a historian should be cautious]]. Pliny was a Roman so he knew.",
          "Caution is right. Being Roman does not make him an accurate accountant. Explain his purpose and give evidence that supports the general claim.",
          true,
        ],
        [
          "weak",
          "Pliny is completely reliable because he was an expert who wrote down everything he saw, so 100 million sesterces is a fact.",
          "Pliny wrote many things he had only heard, and he had a point to make. The number has no second source, so it needs caution.",
        ],
        [
          "weak",
          "[[2|Roman coins were found in India]] so Pliny is totally wrong because those are only coins.",
          "The coins support, not refute, the idea of trade. Use them as evidence for the general claim and say why the exact number is uncertain.",
        ],
      ],
    },
    {
      prompt:
        "Using two sources from this unit, make an argument that Buddhism's spread to China was tied to trade. Name the sources, say what each shows, and note one limit on your argument.",
      scheme: [
        "States a clear claim",
        "Names a first specific source",
        "Says what the first shows about the link between Buddhism and trade",
        "Names a second, different source",
        "Says what the second shows",
        "Notes a limit on the argument, such as that the sources show a connection but not that trade was the only cause",
      ],
      model:
        "Buddhism's spread to China was closely tied to trade. Faxian's diary describes monasteries along the routes in India and Central Asia that he visited on his journey, which shows that Buddhist institutions existed in places connected to trade. Merchants' support for cave temples and monasteries along the Silk Road, as described in secondary accounts, shows that traders financed religion. But these sources show a close link, not that trade was the only cause, since monks, kings and the appeal of the teachings also mattered.",
      answers: [
        [
          "full",
          "[[0|I argue that Buddhism came to China largely along trade routes]]. [[1|One source is Faxian's travel diary]]. [[2|It shows monasteries all along the routes he traveled, from Central Asia to India, in places where merchants passed]]. [[3|A second source is the secondary account of Sogdian merchants]]. [[4|It shows merchants paid for temples and carried texts along the routes]]. [[5|The limit is that this shows a strong link but doesn't prove trade was the only cause, because monks and kings also spread Buddhism]].",
          "Full marks. The limit is the sort of honest qualification a strong argument includes.",
        ],
        [
          "full",
          "[[0|My claim is that trade routes carried Buddhism to China]]. [[1|The first source is Sima Qian's record of Zhang Qian's mission]], and [[2|it shows that the route to Central Asia opened under the Han, giving contact with places where Buddhism was already established]]. [[3|The second is a description of the Kushan Empire with its coins showing the Buddha]]. [[4|It shows that the middleman state that controlled the routes also supported Buddhist imagery]]. [[5|A limit is that this proves the route and the imagery were there, but it doesn't directly show that merchants brought the religion]].",
          "All six points. Using Zhang Qian and the Kushan coins is a different but equally good pair, and the limit is accurate.",
        ],
        [
          "partial",
          "[[0|Buddhism spread to China along the Silk Road]]. [[1|Faxian's diary is a source]]. It shows monasteries.",
          "A claim and a source. Say what the source shows about trade, add a second source and a limit.",
        ],
        [
          "partial",
          "[[3|Sogdian merchants]] [[4|paid for temples]]. [[5|It doesn't prove trade was the only reason]].",
          "The second source and the limit are good. State your claim, name and explain the first source, and say which source your merchant point comes from.",
          true,
        ],
        [
          "weak",
          "Buddhism spread to China because the Chinese emperor invaded India and brought it back.",
          "The Han did not invade India. Buddhism came by monks and merchants along routes. Use sources like Faxian's diary.",
        ],
        [
          "weak",
          "[[0|Buddhism spread by trade]]. Everybody knows that so you don't need sources.",
          "A claim needs evidence. Name two sources and say what each shows.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Turning points and arguments: causation in the ancient world",
  note: `
## Objectives

Students will be able to:

1. construct an explanation of a turning point in the ancient world with precise vocabulary;
2. build an argument about which factor most shaped a classical civilization, supported by specific evidence.

## Materials

Turning-point dossiers (Salamis 480 BCE, Qin unification 221 BCE, Constantine's conversion and the Edict of Milan 313 CE, Ashoka after Kalinga), a causation ladder (long-term causes, short-term triggers, effects, continuities), a rubric for argument writing, sentence frames for concession and rebuttal, and the exit ticket.

## Starter (8 minutes)

Ask: "A turning point means something changed. How would you know it changed because of that event and not because of something that was already happening?" Collect criteria: before and after, timing, alternative explanations.

## Main activity

1. Causation ladder. Groups choose a dossier and fill in long-term causes, the trigger, immediate effects, long-term effects and continuities (what did not change). They must identify at least one continuity, to keep the turning point honest.
2. Argument workshop. Present the rubric: a defensible claim, specific evidence, reasoning that connects the two, a counterclaim and a rebuttal, and precise vocabulary. Show a weak paragraph and a strong one on the same topic and have students say what makes the difference.
3. Write. Each student drafts a paragraph on which factor (geography, religion, government, trade, military) most shaped one civilization, then trades with a partner for peer review using the rubric.

## Checking for understanding

Ask each student to highlight the sentence that carries their counterclaim and the sentence that rebuts it.

## Exit ticket

Rewrite your claim to make it more precise: name the civilization, the factor and the effect.
`,
  reading: [
    "Turning points, continuities and the structure of an argument",
    `
Historians use the phrase **turning point** carefully. An event is a turning point only if it changed the direction of a society and if the change can be traced to it rather than to forces already in motion. The test has three parts. First, what was the situation before? Second, what changed afterward, and what stayed the same? Third, what alternative explanations could account for the change? An explanation that mentions only change, without continuity, tends to exaggerate.

Take Constantine. In 312 CE he won the battle of the Milvian Bridge and credited the Christian God. In 313 CE he and the eastern emperor Licinius issued the agreement known as the Edict of Milan, which allowed Christians, and others, to worship freely and ordered the return of confiscated church property. Before, Christians had faced periodic persecution, most recently under Diocletian. Afterward, bishops gained influence, churches were built with imperial money, and in 380 CE Theodosius made Christianity the empire's official religion. Yet continuities matter. Christianity had already grown for three centuries without imperial favor, perhaps to about ten percent of the empire's people. Many Romans still practiced traditional cults for generations, and Constantine himself waited until near his death to be baptized. The edict accelerated and protected a movement that was already underway, which is different from creating it.

Ashoka offers another case. The thirteenth rock edict ties his change of policy to remorse after Kalinga, and after it he promoted dhamma and supported Buddhist missions. Yet a historian asks whether the edict can be trusted on motive, and notes that the Maurya state kept its army, taxes and officials. The turning point was real in policy and image but narrower than a simple story of conversion suggests.

Arguments about which factor most shaped a civilization follow similar discipline. A strong argument names a precise **claim**, such as "The Nile's regular flood shaped Egyptian government by making grain taxation dependable." It supplies **evidence**: specific facts such as the flood's timing, the use of grain as payment, the system of officials. It gives **reasoning** that links them: because a regular flood meant a regular harvest, the state could count on revenue and maintain officials. It includes a **counterclaim**, perhaps that belief in the divine king mattered more, and a **rebuttal**: that belief itself was tied to the flood's reliability. Finally it uses precise vocabulary. "Surplus," "centralization," "diffusion" and "bureaucracy" are shorter and clearer than long, vague descriptions.

The best historical writing admits what it cannot show. A sentence such as "The evidence suggests, but does not prove" is not weakness. It tells the reader where the argument rests on firm ground and where it rests on inference.
`,
  ],
  cards: [
    ["Turning point", "An event after which a society's direction clearly changes, and whose effects can be traced to it."],
    ["Continuity", "What stays the same despite an apparent change."],
    ["Causation ladder", "A tool that separates long-term causes, triggers, effects and continuities."],
    ["Milvian Bridge", "The 312 CE battle at which Constantine won control of the western empire."],
    ["Theodosius", "Emperor who made Christianity the Roman Empire's official religion in 380 CE."],
    ["Concession", "Admitting part of an opposing view, which makes an argument fairer."],
    ["Rebuttal", "A reasoned reply to a counterclaim."],
    ["Bureaucracy", "A system of officials who administer a government by set rules."],
    ["Centralization", "Gathering power in one authority in the capital."],
  ],
  closed: [
    [
      "Which finding best shows a continuity in the Constantine story?",
      [
        "Christianity was legal after 313 CE",
        "Christianity had grown for centuries before Constantine, so he accelerated rather than created it",
        "Constantine was baptized as a child",
        "Persecution ended instantly across the world",
      ],
      "B",
    ],
    [
      "The Edict of Milan was issued in 313 CE and Theodosius made Christianity official in 380 CE. How many years later was that?",
      ["57 years", "67 years", "77 years", "380 years"],
      "B",
    ],
    [
      "A student writes: \"Ashoka's conversion ended Mauryan violence.\" Which comment best improves the argument?",
      [
        "Add that the Maurya state kept its army and taxes, so the change was narrower than the claim",
        "Add more dates",
        "Remove Ashoka's name",
        "State it more loudly",
      ],
      "A",
    ],
    [
      "Which is the best example of a rebuttal?",
      [
        "Some say religion mattered more, but belief in a divine king rested on the flood's reliability",
        "Egypt was a great civilization",
        "The Nile is long",
        "Many people disagree",
      ],
      "A",
    ],
    [
      "Which phrase is the most precise?",
      [
        "The Roman government did stuff in the provinces",
        "The Roman bureaucracy collected taxes in the provinces to pay the army",
        "Lots of things happened under Rome",
        "Rome was big and good",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Evaluate whether Constantine's 313 CE Edict of Milan was a turning point in the history of Christianity. Identify what changed, what continued, and give your judgment.",
      scheme: [
        "Describes the situation before, such as periodic persecution",
        "Describes at least one specific change afterward, such as church building, influence of bishops or later official status",
        "Identifies a continuity, such as Christianity's growth before Constantine",
        "Considers an alternative explanation or limit on the claim",
        "Reaches a reasoned judgment",
        "Uses accurate dates or names",
      ],
      model:
        "Before 313 CE Christians faced periodic persecution, most recently under Diocletian. After the edict, churches were built with imperial support, bishops gained influence, and by 380 CE Christianity became the official religion. But Christianity had grown for three centuries before Constantine, so he accelerated a movement already underway. I judge it a major turning point in the faith's legal and political position, but not in its basic growth.",
      answers: [
        [
          "full",
          "[[0|Before the edict Christians were sometimes persecuted, like under Diocletian]]. [[1|After it, emperors paid for churches and bishops got more influence, and in 380 CE Theodosius made it the official religion]]. [[2|But continuity matters, because Christianity had grown for about three hundred years without the emperor's help]]. [[3|Constantine may also have been responding to a trend, since he himself was baptized only near his death and many Romans kept old religions]]. [[4|So I think it was a turning point for Christianity's legal and political position, but not for its basic growth]]. [[5|Constantine issued the Edict of Milan with Licinius in 313 CE]].",
          "Full marks. Your judgment separates legal position from growth, which is exactly what the continuity evidence calls for.",
        ],
        [
          "full",
          "[[0|For about 250 years Christians faced occasional persecution, with the worst under Diocletian]]. [[1|The edict let them worship freely and get church property back, and later emperors built churches and gave bishops power]]. [[2|The thing that didn't change was that Christianity was already spreading, maybe to about ten percent of the empire]]. [[3|You could argue Constantine only joined a winning side, and that traditional cults survived a long time]]. [[4|I'd call it a turning point but one that accelerated rather than created change]]. [[5|The decisive date is 313 CE, and the later one is 380 CE]].",
          "All six points. 'Accelerated rather than created' is the kind of precise judgment that earns top marks.",
        ],
        [
          "partial",
          "[[0|Before 313 Christians were persecuted]]. [[1|After it they got churches and power]]. It was a turning point.",
          "Good before and after. Add a continuity, consider an alternative explanation and give a reasoned judgment with dates.",
        ],
        [
          "partial",
          "[[2|Christianity was already growing before Constantine]], so [[4|it was only a minor change]].",
          "Your continuity is right, but you skip what actually changed after 313. Describe the change before judging how big it was.",
          true,
        ],
        [
          "weak",
          "Constantine invented Christianity and made everyone become Christian right away in 313.",
          "Christianity began three centuries earlier, and conversion took generations. The edict allowed worship and protected the church. Look at what changed and what did not.",
        ],
        [
          "weak",
          "[[5|The Edict of Milan was in 313]]. It's a turning point because dates are important.",
          "The date is right, but a turning point needs before, after and a judgment, not just a date. Describe what changed.",
        ],
      ],
    },
    {
      prompt:
        "Write a short argument (claim, two pieces of evidence, reasoning, counterclaim and rebuttal) about which factor most shaped one classical civilization: geography, religion, government, trade or military.",
      scheme: [
        "States a precise claim naming a civilization, a factor and an effect",
        "Gives a first piece of specific, accurate evidence",
        "Gives a second piece of specific, accurate evidence",
        "Provides reasoning that links the evidence to the claim",
        "States a reasonable counterclaim",
        "Rebuts it with reasoning or evidence",
      ],
      model:
        "The Silk Road trade most shaped the Han empire's wealth and reach. Emperor Wu sent Zhang Qian west in 138 BCE, which opened contact with Central Asia, and Han silk became a prized good as far as Rome. These links brought revenue and horses that the army needed. Some might say the civil service mattered more because it ran the empire. But the civil service depended on money from the economy, and trade contributed to that revenue, so trade was foundational.",
      answers: [
        [
          "full",
          "[[0|My claim is that the Han civil service most shaped how long Han China lasted by keeping government running through weak emperors]]. [[1|The Han used officials chosen through study of Confucian texts]], and [[2|the census of 2 CE counted about 59.6 million people, which shows officials reached into every household]]. [[3|Because officials, not just the emperor, ran taxes and records, the empire kept functioning even when emperors were children]]. [[4|Someone might say the military mattered more because the army protected the borders]]. [[5|But the army needed the taxes and supplies that officials organized, so the civil service made the military possible]].",
          "Full marks. Your claim is precise and your rebuttal shows how the factors relate instead of just dismissing the other one.",
        ],
        [
          "full",
          "[[0|I claim that geography, especially the Nile's flood, most shaped Egyptian government by making grain taxes dependable]]. [[1|The Nile flooded on a regular schedule every summer]], and [[2|the flood left silt that produced large harvests that could be taxed in grain]]. [[3|Because the harvest was reliable, the state could pay officials and store grain, which encouraged a strong central government]]. [[4|Someone might argue that religion mattered more because the pharaoh was a god]]. [[5|However, belief in a divine king was tied to keeping the flood and harvest going, so it grew out of the same geography]].",
          "All six points. You linked the counterclaim back to your own factor, which is a mature rebuttal.",
        ],
        [
          "partial",
          "[[0|I claim government most shaped Han China]]. [[1|The Han used a civil service]]. That is why it lasted.",
          "A claim and one piece of evidence. Add a second piece, explain the link and answer a counterclaim.",
        ],
        [
          "partial",
          "[[1|The Nile flooded regularly]] and [[2|it left silt that made rich farmland]]. [[4|Some people say religion mattered more]].",
          "Your evidence is good and you mention a counterclaim. State a precise claim, explain how the evidence supports it and rebut the counterclaim.",
          true,
        ],
        [
          "weak",
          "The military shaped Rome the most because they had a big army and won wars and that's obvious.",
          "'Obvious' is not evidence. Give a specific fact about Rome's army and explain how it shaped the civilization, then consider an objection.",
        ],
        [
          "weak",
          "[[0|Trade shaped Persia]]. It had lots of merchants and they were rich.",
          "A claim should name the effect, and this unit did not cover Persia in detail. Pick a civilization you studied and give two specific facts.",
        ],
      ],
    },
  ],
};

writeCourse("honors-world-history-grade-9.json", "Honors World History", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
