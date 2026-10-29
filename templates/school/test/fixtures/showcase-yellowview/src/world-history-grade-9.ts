import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * World History, Grade 9, Quarter 1. Early humans to the classical world.
 * Standards: C3 Framework dimensions 1 to 4, in the school's own words.
 */

const w1: WeekInput = {
  topic: "Sources, timelines and the first river valleys",
  note: `
## Objectives

Students will be able to:

1. choose the kinds of sources that will best answer a question about an early civilization;
2. explain what historians mean by prehistory and history, and order early human development on a timeline;
3. explain how geography and climate shaped Mesopotamia, Egypt, the Indus Valley and China.

## Materials

Four photographs of objects (a clay tablet, a cave painting, a pottery shard, a statue), a blank wall timeline, a physical map of the Eastern Hemisphere, and the exit ticket.

## Starter (8 minutes)

Hold up your own school ID and ask: "If this were all that survived of Westerville High in 4,000 years, what could a historian say about us, and what could they never know?" Collect answers on the board under two headings, "Can tell" and "Cannot tell".

## Main activity

1. Introduce the line between prehistory (before writing) and history (after). Place cuneiform at about 3200 BCE on the wall timeline and add the earlier markers together: fire, stone tools, the first Homo sapiens.
2. Groups get one of the four objects and a question card, such as "How did people get food?" Each group argues whether their object is the best source for the question or only a clue, and what other source they would want.
3. Use the map. Groups mark the Tigris and Euphrates, the Nile, the Indus and the Yellow River and write one sentence on what each river gave a farmer and what each took away.

## Checking for understanding

Cold-call three students to match a question to the best source type. Listen for the words "tells us" and "cannot tell us".

## Exit ticket

Write one question about early Egypt and name the single source you would look for first.
`,
  reading: [
    "Rivers, tools and the evidence we rely on",
    `
Historians begin with a question, then ask what evidence could answer it. Evidence comes in two broad kinds. A **primary source** was made by someone who was there, such as a clay tablet listing barley rations, a letter, a tomb painting or a coin. A **secondary source** is written later by someone who studied the past, such as a museum guide or this reading. A source does not speak for itself. Each one has a maker, a purpose and a limit. A king's monument tells you what the king wanted remembered, not what a farmer thought.

The longest part of human life is **prehistory**, the time before people wrote. Historians study it through objects: stone tools, bones, hearths and cave paintings. Our species, Homo sapiens, appeared in Africa about 300,000 years ago. People used fire for cooking and warmth long before that. **History**, in the narrow sense, begins when writing does. The earliest known writing is cuneiform, pressed into clay by the Sumerians in Mesopotamia around 3200 BCE. A timeline helps with scale. Writing has existed for roughly 5,000 years, a sliver beside the hundreds of thousands of years before it.

Why did the first cities grow where they did? Geography is a large part of the answer. In **Mesopotamia**, the land between the Tigris and Euphrates rivers, flooding came without warning and rain was scarce, so farmers dug canals and shared labor to control the water. The **Nile** in Egypt flooded on a steady schedule each summer and left rich black silt, while desert on both sides made invasion hard. In South Asia, the **Indus** and its tributaries watered the planned cities of Harappa and Mohenjo-daro, where the monsoon and snowmelt from the mountains fed the crops. In northern China, the **Yellow River** carried fine yellow soil called loess, which grew millet well but also silted up the riverbed, so its floods were deadly enough to earn the name "China's Sorrow."

The pattern is that each river made farming possible and demanded organized work in return. Where farmers had to dig canals, build levees and store grain, someone had to plan and lead. That is one reason river valleys produced the first governments.
`,
  ],
  cards: [
    ["Primary source", "Evidence made by someone who was there at the time, such as a letter, a tablet or a tomb painting."],
    ["Secondary source", "An account written later by someone who studied the past, such as a textbook."],
    ["Prehistory", "The long period before writing, known mainly from objects such as tools, bones and paintings."],
    ["Cuneiform", "The wedge-shaped writing of Sumer, pressed into clay beginning about 3200 BCE."],
    ["Mesopotamia", "The land between the Tigris and Euphrates rivers, in present-day Iraq."],
    ["Silt", "Fine, fertile soil left behind by a flooding river."],
    ["Loess", "Fine yellow windblown soil of northern China that the Yellow River carries and deposits."],
    ["Harappa and Mohenjo-daro", "Two large planned cities of the Indus Valley civilization, built about 2600 BCE."],
  ],
  closed: [
    [
      "A student asks, \"What did workers in Sumerian temple fields eat?\" Which source would answer it best?",
      [
        "A statue of a king holding a spear",
        "A modern novel set in Mesopotamia",
        "A clay tablet recording barley and beer rations to workers",
        "A map of the Tigris and Euphrates in an atlas",
      ],
      "C",
    ],
    [
      "Which description of prehistory is most accurate?",
      [
        "The period before people wrote, studied through objects such as tools and bones",
        "The period when no humans lived anywhere on Earth",
        "The years before the invention of farming",
        "The period covered only by religious texts",
      ],
      "A",
    ],
    [
      "A museum label says, \"Cuneiform appeared about 3200 BCE.\" About how long ago is that from 2026?",
      ["About 1,200 years ago", "About 3,200 years ago", "About 5,200 years ago", "About 32,000 years ago"],
      "C",
    ],
    [
      "Why was the Nile easier to farm beside than the Tigris and Euphrates?",
      [
        "The Nile never flooded",
        "The Nile flooded on a fairly predictable schedule and left rich silt",
        "The Nile ran through rainforest that watered the crops",
        "The Nile was too small to flood at all",
      ],
      "B",
    ],
    [
      "The Yellow River was called \"China's Sorrow.\" What best explains the name?",
      [
        "Its water was too salty to drink",
        "It flowed through land that was too cold to farm",
        "Silt raised its bed, so it flooded the farmland and villages with deadly results",
        "It was the border between two warring kingdoms",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Compare how the Nile in Egypt and the Tigris and Euphrates in Mesopotamia shaped the farmers who lived beside them. Use at least one difference in the rivers' floods.",
      scheme: [
        "States that the Nile flooded at predictable times, or that its floods were fairly regular",
        "States that the Tigris and Euphrates flooded unpredictably or violently",
        "Links the Mesopotamian floods to canals, irrigation or shared labor",
        "Names a second benefit or protection of the Nile, such as silt or desert borders",
      ],
      model:
        "The Nile flooded about the same time every summer, so Egyptian farmers could plan around it, and the flood left rich silt. Its desert borders also kept invaders away. The Tigris and Euphrates flooded without warning, so Mesopotamian farmers had to dig canals and work together to control the water.",
      answers: [
        [
          "full",
          "[[0|The Nile flooded on a schedule every summer]], and it [[3|left black silt that was great for crops, and the deserts around it protected Egypt]]. [[1|The Tigris and Euphrates flooded at random times]] so [[2|people in Mesopotamia had to dig canals and work together]].",
          "Full marks. You tied the difference in the floods to a difference in how people lived, which is the cause-and-effect step this question wanted.",
        ],
        [
          "full",
          "In Egypt [[0|the flood came about the same time each year so farmers knew when to plant]]. [[1|In Mesopotamia the floods were unpredictable and could be violent]], which meant [[2|they needed irrigation canals and a lot of people organized to build them]]. [[3|The Nile also left silt behind that made the soil rich.]]",
          "All four points. Saying farmers knew when to plant shows you understand why a regular flood mattered.",
        ],
        [
          "partial",
          "[[0|The Nile flooded every year at the same time]] and [[3|the silt helped the crops]]. Mesopotamia also had rivers and people farmed there too.",
          "Good on the Nile. For Mesopotamia you need to say what was different about the floods and what farmers did about it.",
        ],
        [
          "partial",
          "[[1|The Tigris and Euphrates flooded with no warning]] so [[2|the people built canals to hold the water]]. The Nile was a river in Egypt.",
          "Strong on Mesopotamia. The question asked for a comparison, so say what the Nile did differently, such as flooding on a schedule.",
          true,
        ],
        [
          "weak",
          "Both rivers flooded all the time so the farmers had to move away from them. [[3|The Nile had desert around it]].",
          "The desert point is correct, but the farmers did not move away. They stayed because the floods gave fertile soil. Compare how regular the floods were.",
        ],
        [
          "weak",
          "Egypt was hot and Mesopotamia was also hot so they were about the same. Farmers grew wheat in both.",
          "Both places were hot, but the question is about the rivers. Look again at when and how each river flooded.",
        ],
      ],
    },
    {
      prompt:
        "A historian asks, \"How did the people of Mohenjo-daro manage their water?\" Name two different kinds of sources she could use and say what each can show and one thing it cannot.",
      scheme: [
        "Names a first appropriate source type, such as the excavated drains, wells or baths",
        "Says what that source shows, such as that the city had planned water systems",
        "Names a second, different source type, such as pottery, seals or a map of the site",
        "Says one limit of a source, such as that the Indus script has not been read or that objects do not show who ran the system",
      ],
      model:
        "She could study the excavated brick drains and wells, which show that the city had a planned system for carrying water and waste. She could also use the seals found at the site, but because the Indus script has not been read, they cannot tell us who managed the water or what rules they followed.",
      answers: [
        [
          "full",
          "She could dig up and study [[0|the brick drains and wells in the city]], which [[1|show the city planned for water and waste]]. She could also look at [[2|the stamp seals that were found]], but [[3|nobody can read the Indus writing so they can't tell us who was in charge]].",
          "Full marks. You named two kinds of source and were honest that the script is unread, which is exactly the kind of limit a historian reports.",
        ],
        [
          "full",
          "[[0|The excavated streets, drains and the Great Bath]] are one source and [[1|they show Mohenjo-daro had planned water systems]]. Another is [[2|pottery and tools found in the houses]]. [[3|Objects can't tell us what the people thought or what laws they had, since we can't read their writing.]]",
          "All four points. The Great Bath is a good detail, and noting that objects do not give laws or beliefs is a careful limit.",
        ],
        [
          "partial",
          "She should look at [[0|the drains that archaeologists found]]. [[1|They show there was a system for water]]. She should look at other stuff too.",
          "Your first source works. The question asks for a second, different kind of source and a limit, so name one specifically.",
        ],
        [
          "partial",
          "[[2|She could use seals and pottery]] and [[3|the writing on the seals can't be read yet]]. The sources tell everything about water.",
          "You named sources and a good limit, but the last sentence goes too far. Say what a source shows about water, such as drains, and stay specific.",
          true,
        ],
        [
          "weak",
          "She could read a history book about Egypt and that would tell her how they did water because all the old cities were the same.",
          "Egypt and the Indus Valley were different civilizations. A source about Egypt cannot answer a question about Mohenjo-daro. Look for evidence from the site itself.",
        ],
        [
          "weak",
          "[[0|She could look at the drains]]. They are really old and made of stone.",
          "Drains are a good source. They were made of fired brick, and you need to say what they show, a second source, and a limit.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Farming changes everything: surplus, cities and the river-valley states",
  note: `
## Objectives

Students will be able to:

1. analyze the causes and effects of the agricultural revolution on early societies;
2. compare the political, religious and social systems of the first river-valley civilizations.

## Materials

A bag of dried corn and a bag of wheat, a handful of foraging cards ("berries," "roots," "fish"), a three-column comparison chart, and the exit ticket.

## Starter (8 minutes)

Ask: "You can gather food all day and eat what you find, or plant seeds and wait four months. Why would anyone choose to wait?" Take three answers and list the risks of each on the board.

## Main activity

1. Run a short simulation. Half the class are foragers who pick a card for each day, with some days empty. The other half are farmers who "plant" cards and collect a store at the end of a round. Debrief: who had surplus, who had to stay in one place, and what could the surplus support?
2. Teach the chain: warmer climate after the last Ice Age, plant and animal domestication around 10,000 years ago, surplus, larger settlements, specialized jobs, rulers and priests.
3. In groups, fill in the comparison chart for Sumer, Egypt and the Indus Valley: who ruled, what religion looked like, how people were ranked.

## Checking for understanding

Ask each group to say one cause and one effect of the agricultural revolution in a single sentence with "because."

## Exit ticket

Why does a food surplus make a king possible?
`,
  reading: [
    "From foragers to farmers to rulers",
    `
For most of human history, people lived by hunting animals and gathering wild plants. They moved with the seasons because food ran out where they stayed. Around 10,000 years ago, as the climate warmed at the end of the last Ice Age, some groups in the Fertile Crescent of Southwest Asia began planting wheat and barley and keeping sheep and goats. In other places, independently, people domesticated rice in China, maize in Mesoamerica and millet in Africa. Historians call this change the **agricultural revolution**, though it unfolded over thousands of years.

Farming created a **surplus**, more food than the farmers themselves needed. A surplus changed everything that followed. Fewer people had to grow food, so some could become potters, weavers, metalworkers, soldiers or scribes. This is **specialization**. Villages grew into towns and then cities, and cities needed someone to store grain, settle disputes and organize defense. Records and counting became necessary, which is one reason writing appeared first in cities such as Uruk in Sumer.

Farming also had costs. People who lived close together and near animals caught more diseases. A bad harvest could bring famine. Differences in wealth grew, because those who controlled land or grain gained power.

The first river-valley states organized this power in different ways. In **Sumer**, independent city-states such as Ur and Uruk each had a ruler, often tied to the temple, and kings governed in the name of the gods. In **Egypt**, a single king, the pharaoh, ruled the whole Nile valley and was believed to be a god in human form, which made the state both political and sacred. In the **Indus Valley**, archaeologists have found planned streets and standard-sized bricks, but no clear palaces or royal tombs, so we do not know for certain who ruled. In all three, a small group of rulers, priests and officials sat at the top, merchants and craftsmen in the middle, and farmers and laborers made up most of the population, with enslaved people at the bottom in Sumer and Egypt.

Comparing them shows that farming produced similar results, cities and ranks, yet each society shaped its government and beliefs differently.
`,
  ],
  cards: [
    ["Agricultural revolution", "The shift, beginning about 10,000 years ago, from hunting and gathering to planting crops and raising animals."],
    ["Surplus", "More food than the farmers themselves need."],
    ["Domestication", "Breeding plants and animals over time so that they serve human needs."],
    ["Specialization", "When people work at one skill, such as pottery or writing, instead of growing their own food."],
    ["Fertile Crescent", "An arc of fertile land in Southwest Asia where farming first developed."],
    ["City-state", "A city and the farmland around it, governed as an independent state, as in Sumer."],
    ["Pharaoh", "The king of Egypt, believed to be a god in human form."],
    ["Social hierarchy", "A ranking of groups in a society from most powerful to least."],
  ],
  closed: [
    [
      "Which sequence best shows the effects of farming?",
      [
        "Surplus, then fewer specialists, then smaller villages",
        "Surplus, then specialization, then larger settlements and government",
        "Larger cities, then farming, then a surplus",
        "Specialization, then farming, then rulers",
      ],
      "B",
    ],
    [
      "Rice, maize and millet were each first farmed in different parts of the world. What does this show?",
      [
        "Farming spread from a single place to every other place",
        "Farming began independently in more than one region",
        "Only river valleys had any farming",
        "Farming began only after writing was invented",
      ],
      "B",
    ],
    [
      "Which describes the Egyptian pharaoh?",
      [
        "One of several elected city magistrates",
        "A king who ruled the whole Nile valley and was seen as divine",
        "A priest who had no political power",
        "A general chosen for one battle",
      ],
      "B",
    ],
    [
      "Why can't historians say for sure who ruled the Indus Valley cities?",
      [
        "No Indus city has been found",
        "There are no signs of planning in the cities",
        "Their writing is unread and there are no clear palaces or royal tombs",
        "Egyptian records say the Indus had no rulers",
      ],
      "C",
    ],
    [
      "A town in 6000 BCE stores 40 tons of grain, but the 200 farmers eat only 25 tons. What does the extra 15 tons make possible?",
      [
        "Support for a few people who do not farm, such as potters or scribes",
        "Fewer people learning crafts",
        "An end to all disease",
        "Freedom from any form of leadership",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the invention of farming led to the first cities. Include a surplus and at least one result of it.",
      scheme: [
        "States that farming produced a surplus of food",
        "Says that surplus meant some people did not need to farm, or could specialize",
        "Says that specialists, trade or storage led to larger settlements or cities",
        "Names a need for leaders, rulers or record keeping that grew with the city",
      ],
      model:
        "Farming grew more food than the farmers needed, a surplus. Because of the surplus, some people did not have to farm and became specialists like potters or scribes. Towns grew larger as people gathered around the stored food, and cities needed rulers and record keepers to manage grain and settle disputes.",
      answers: [
        [
          "full",
          "[[0|When people started farming they made a surplus of food]]. [[1|Not everybody had to grow the food anymore so some people became craftspeople or scribes]]. [[2|Towns got bigger and turned into cities]] and [[3|they needed rulers to store the grain and keep records]].",
          "Full marks. Your chain from surplus to specialists to cities to rulers is the causal story in order.",
        ],
        [
          "full",
          "Farming gave people [[0|more food than they needed]]. [[1|That meant some could specialize in jobs like making pots or metal tools instead of farming]]. [[2|People settled near the stored grain and the settlements grew into cities]], and [[3|someone had to organize the storage and decide fights, so leaders appeared]].",
          "All four points, written in your own words. Linking the stored grain to the need for leaders is the key move.",
        ],
        [
          "partial",
          "[[0|Farming made extra food, a surplus]]. [[2|After that towns grew into cities]].",
          "Correct, but you skipped the middle step. Why could a town grow? Say what the surplus let some people do.",
        ],
        [
          "partial",
          "[[1|Some people didn't have to farm so they could do other jobs]]. Then they needed a king.",
          "The specialist idea is right. Name the surplus that made it possible, and say why a king or leaders became necessary.",
          true,
        ],
        [
          "weak",
          "Farming made people healthier so there were more people and that's how cities started.",
          "Farming often made people less healthy, because of crowding and disease. The cause of cities was the food surplus. Think about what extra food allowed.",
        ],
        [
          "weak",
          "The cities came first and then people invented farming to feed the cities.",
          "It was the other way around. Farming came first and the surplus allowed cities to grow. Check the order of your chain.",
        ],
      ],
    },
    {
      prompt:
        "Compare Sumer and Egypt as early states. Name one way their governments were alike and one way they were different.",
      scheme: [
        "Identifies a similarity, such as rulers tied to religion or a ranked society",
        "Supports the similarity with an accurate detail",
        "Identifies a difference, such as many city-states in Sumer and one kingdom in Egypt",
        "Supports the difference with an accurate detail, such as the pharaoh being seen as a god",
      ],
      model:
        "Both societies had rulers whose power was tied to religion and both ranked people, with priests and officials above farmers. They differed in that Sumer was made of separate city-states like Ur and Uruk, while Egypt was ruled as one kingdom by a pharaoh who was believed to be a god.",
      answers: [
        [
          "full",
          "[[0|Both had rulers connected to religion]], like [[1|Sumerian kings ruling for the gods and priests running the temples]]. [[2|They were different because Sumer was a lot of separate city-states]] while [[3|Egypt had one pharaoh over everything who was thought to be a god]].",
          "Full marks. You gave both comparisons and supported each with a specific example.",
        ],
        [
          "full",
          "One way they were alike is that [[0|each society had a social ladder]], [[1|with priests and officials at the top and farmers and laborers at the bottom]]. A difference is that [[2|Egypt was united under one ruler, but Sumer had independent cities]] such as Ur, and [[3|the pharaoh was believed to be divine]].",
          "All four points. A social ladder is a fair similarity, and Ur is a well-chosen detail.",
        ],
        [
          "partial",
          "[[0|Both of them had rulers who were linked to their gods]]. In Egypt it was a pharaoh.",
          "The similarity is correct. Support it with a Sumerian example and add a difference between the two governments.",
        ],
        [
          "partial",
          "[[2|Sumer had many city-states while Egypt had one kingdom]]. [[3|The pharaoh was like a god]].",
          "Good on the difference, and the pharaoh detail is accurate. You also need one way they were alike.",
          true,
        ],
        [
          "weak",
          "They were alike because both were on the Nile. They were different because one was a desert and one was not.",
          "Sumer was between the Tigris and Euphrates, not on the Nile. The question is about governments, so compare who ruled and how.",
        ],
        [
          "weak",
          "Egypt had pharaohs and Sumer had pharaohs too but in Sumer they were called kings.",
          "Pharaoh is the Egyptian title and Sumer had separate city rulers. Think about whether each society had one government or many.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Greek citizens, philosophers and Alexander's world",
  note: `
## Objectives

Students will be able to:

1. describe how Greek ideas about citizenship, philosophy and democracy developed, and how people of the time saw them;
2. analyze the causes and effects of Alexander's conquests and the Hellenistic world.

## Materials

Colored slips marked "citizen," "woman," "enslaved person" and "foreign resident" (one per student), a map of Alexander's route, a short excerpt card for each philosopher (teacher-written), and the exit ticket.

## Starter (8 minutes)

Hand out the slips at random. Announce a vote: "Only citizens may vote on whether the whole class gets a homework pass." Run the vote, then ask each group how they felt. Connect the experience to who counted as a citizen in Athens.

## Main activity

1. Mini-lecture on the polis, Cleisthenes and Athenian democracy in 508 BCE, contrasted with Sparta. Students list who could and could not take part in the Assembly.
2. Introduce Socrates, Plato and Aristotle with the three excerpt cards. Each pair says what question the philosopher asked and why some Athenians distrusted such questions. Mention that Socrates was put on trial in 399 BCE.
3. Trace Alexander's route on the map from Macedon in 336 BCE to the Indus in 326 BCE. Students record one cause and one effect of his conquests on a two-column chart.

## Checking for understanding

Thumbs up or down on statements such as "Athens was a democracy, so everyone could vote." Ask students who vote down to correct it.

## Exit ticket

Give one way Greek ideas spread after Alexander and one problem that came with his empire.
`,
  reading: [
    "Citizens, thinkers and a conqueror",
    `
Ancient Greece was not one country but hundreds of independent communities called **poleis** (singular **polis**). Each polis was a city and the land around it, with its own laws. Athens and Sparta were the most famous. Sparta was ruled by two kings and a small council, and its economy rested on the **helots**, enslaved people who farmed the land. Athens went a different way. After reforms led by Cleisthenes in 508 BCE, citizens met in an Assembly and voted directly on laws and war. Historians call this direct democracy, from the Greek words for "people" and "power."

Athenian democracy was real but limited. Only adult men born to Athenian parents counted as citizens. Women, enslaved people, who made up a large share of the population, and foreign residents could not vote. Out of perhaps 250,000 people in Athens and its surrounding land, the number who could vote was around 30,000. Some Athenians praised their system as rule by the many. Others, including some philosophers, feared that crowds could be swayed by clever speakers.

That worry shows up in **philosophy**, which means "love of wisdom." Socrates walked the Athenian marketplace asking people to explain what they meant by justice or courage, and his questions made powerful men look foolish. In 399 BCE a jury of Athenian citizens convicted him of impiety and corrupting the young and sentenced him to death. His student Plato wrote dialogues about the ideal state, and Plato's student Aristotle studied logic, biology and politics.

In 336 BCE Alexander of Macedon, a kingdom north of Greece, became king at twenty. Within a decade he defeated the Persian Empire, took Egypt, and led his army as far east as the Indus River, where his tired soldiers refused to go farther in 326 BCE. He died in Babylon in 323 BCE at age thirty-two, and his generals divided the empire. The result was the **Hellenistic world**, a vast area where Greek language, art and ideas mixed with Egyptian, Persian and Indian cultures. The city of Alexandria in Egypt became a center of learning with a famous library. Hellenistic scholars such as Euclid in geometry and Archimedes in mechanics built on earlier work, and Greek became the common language for trade across the region.

But the cost was high. Alexander's wars killed many, and the empire he left broke apart quickly because it depended on one man.
`,
  ],
  cards: [
    ["Polis", "A Greek city-state: a city and the land around it, with its own government."],
    ["Direct democracy", "A system in which citizens vote on laws themselves rather than electing representatives."],
    ["Citizen (in Athens)", "An adult male born to Athenian parents; the only people who could vote."],
    ["Helots", "Enslaved people who farmed the land for the Spartans."],
    ["Philosophy", "Greek for \"love of wisdom\"; the study of questions about knowledge, justice and how to live."],
    ["Socrates", "Athenian philosopher who questioned people about their beliefs; executed in 399 BCE."],
    ["Hellenistic", "The era after Alexander when Greek culture mixed with Egyptian, Persian and Indian cultures."],
    ["Alexandria", "Egyptian city founded by Alexander; a Hellenistic center of learning and home of a great library."],
  ],
  closed: [
    [
      "Why is it fair to call Athenian democracy limited?",
      [
        "Citizens could not vote on laws",
        "Only free adult men born in Athens were citizens, so most residents could not vote",
        "Athens had a king who made all decisions",
        "Women voted but men did not",
      ],
      "B",
    ],
    [
      "About 30,000 of roughly 250,000 people in Athens and its land could vote. About what share is that?",
      ["About 1 in 80", "About 1 in 25", "About 1 in 8", "About 1 in 2"],
      "C",
    ],
    [
      "Why did some Athenians distrust Socrates?",
      [
        "He refused to speak in public",
        "His questions made powerful people look foolish and some thought he corrupted the young",
        "He wanted to make Athens a monarchy",
        "He served in the Spartan army",
      ],
      "B",
    ],
    [
      "Which was a lasting effect of Alexander's conquests?",
      [
        "Greek language and ideas mixed with those of Egypt, Persia and India",
        "Greece became the only center of learning in the world",
        "Persia became the strongest empire in the Mediterranean",
        "The empire stayed united under his family for centuries",
      ],
      "A",
    ],
    [
      "Why did Alexander's empire break apart after 323 BCE?",
      [
        "The Persians took it back immediately",
        "It depended on one leader, and his generals fought to divide it",
        "Greek cities voted to leave",
        "A plague ended all trade",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A classmate says, \"Athens was a democracy, so every person there had a say.\" Use evidence to explain why this is only partly true.",
      scheme: [
        "Acknowledges that Athens did have a real form of democracy, with citizens voting directly",
        "States that only adult free men born in Athens were citizens",
        "Names at least two groups excluded, such as women, enslaved people or foreign residents",
        "Uses a number or comparison, such as roughly 30,000 voters out of about 250,000 people",
      ],
      model:
        "Athens was a democracy because citizens voted directly on laws in the Assembly. But citizens were only adult free men born to Athenian parents. Women, enslaved people and foreign residents could not vote, so only about 30,000 of roughly 250,000 people had a say.",
      answers: [
        [
          "full",
          "[[0|Athens really did have a democracy where citizens voted on laws in the Assembly]]. But [[1|you had to be a free adult man born in Athens]]. [[2|Women, enslaved people and foreigners living there were left out]], so [[3|only about 30,000 out of 250,000 people could vote]].",
          "Full marks. You agreed with what was true, corrected the rest, and used the numbers as evidence.",
        ],
        [
          "full",
          "Your classmate is half right because [[0|Athenian citizens did vote directly instead of letting someone else decide]]. The problem is that [[1|citizens were only men whose parents were Athenian]], and [[2|women and enslaved people couldn't take part, and neither could metics, who were foreigners]]. [[3|That left something like one in eight people with a vote.]]",
          "All four points. Using the word metic and turning the numbers into a fraction both show careful study.",
        ],
        [
          "partial",
          "[[0|It was a democracy because citizens voted]]. But [[2|women and slaves couldn't vote]].",
          "Good start. Add who counted as a citizen and some numbers to show how few that was.",
        ],
        [
          "partial",
          "[[1|Only men who were born in Athens could be citizens]] and [[3|just 30,000 people could vote]]. So it wasn't a real democracy at all.",
          "The facts are right, but it was a real democracy for citizens. Say what citizens did, and name the groups left out.",
          true,
        ],
        [
          "weak",
          "Athens had a king and a few of his friends made the laws so the classmate is wrong.",
          "Athens did not have a king after its reforms. Citizens voted in an Assembly. Look at how Athenians made laws again.",
        ],
        [
          "weak",
          "Everybody could vote in Athens except kids. [[0|It was a democracy]] like ours.",
          "Our system includes all adult citizens and elected representatives. In Athens, women and enslaved people could not vote. Check who counted as a citizen.",
        ],
      ],
    },
    {
      prompt:
        "Explain one cause and one effect of Alexander the Great's conquests. Use at least two specific facts.",
      scheme: [
        "Gives a cause, such as the Macedonian army, Philip's reforms or the weakness of Persia",
        "Supports the cause with a fact",
        "Gives an effect, such as the spread of Greek culture or a divided empire",
        "Supports the effect with a fact, such as Alexandria or the generals splitting the empire after 323 BCE",
      ],
      model:
        "One cause was Alexander's strong Macedonian army, built up by his father Philip, which defeated the Persian Empire. One effect was the Hellenistic world, where Greek culture blended with local cultures, and cities like Alexandria in Egypt became centers of learning.",
      answers: [
        [
          "full",
          "[[0|He had a really well-trained Macedonian army]] that his father Philip built, and [[1|it beat the Persian Empire]]. [[2|After he died Greek culture spread over a big area and mixed with others]]. [[3|Alexandria in Egypt became a place for scholars and had a famous library.]]",
          "Full marks. You gave a cause and an effect and backed each with a specific fact.",
        ],
        [
          "full",
          "A cause was [[0|Persia was big but its armies couldn't match Alexander's tactics]], for example [[1|he won at Gaugamela in 331 BCE]]. An effect was that [[2|his generals split the empire into kingdoms after he died]] and [[3|they ruled Egypt and Syria, the Ptolemies and the Seleucids]].",
          "All four points. Naming Gaugamela and the successor kingdoms is exactly the specific evidence the question asked for.",
        ],
        [
          "partial",
          "[[0|He had a strong army]]. [[2|Because of him Greek ideas spread to other places]].",
          "Both ideas are right. Support each with a fact, such as a battle, a city or a date.",
        ],
        [
          "partial",
          "[[2|The effect was the Hellenistic world]] and [[3|the city of Alexandria]]. He conquered because he wanted to.",
          "The effect is well supported. The cause is vague. Name something specific, such as his army or Persia's weakness.",
          true,
        ],
        [
          "weak",
          "He conquered everything because he was a god. Then the Romans took it all right away.",
          "Alexander was a mortal king, and his empire split among his generals first. Name a cause that is a real fact about his army or Persia.",
        ],
        [
          "weak",
          "[[0|His army was good]]. And everyone became Greek.",
          "The army is a real cause, but explain why. People did not all become Greek. Greek culture mixed with local cultures.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Rome and Han China: how empires rise and fall",
  note: `
## Objectives

Students will be able to:

1. describe how the Roman Republic became an empire and the effects on the people it ruled;
2. analyze the causes and effects of the rise and decline of the Roman and Han empires.

## Materials

A map of the Roman Empire in 117 CE and one of Han China, two-column comparison charts, index cards with causes of decline, and the exit ticket.

## Starter (8 minutes)

Ask: "What makes a country feel too big to run?" List the problems students suggest: distance, taxes, rebellion, a bad leader. Tell them they will test the list against two real empires.

## Main activity

1. Present the Republic: consuls, the Senate and tribunes, the Twelve Tables of 450 BCE. Trace the Punic Wars against Carthage (264 to 146 BCE) and the growth of Roman power. Ask what changed for conquered peoples: roads, law and citizenship, but also taxes and slavery.
2. Move to Julius Caesar's assassination in 44 BCE and Augustus becoming the first emperor in 27 BCE. Calculate how long the Republic lasted (509 to 27 BCE) on the board.
3. Parallel Han China from Liu Bang in 202 BCE, through Emperor Wu, to the empire's collapse in 220 CE. Students sort the index cards into causes of rise and causes of decline and match them to Rome or Han or both.

## Checking for understanding

Have partners write one sentence that begins "Both empires fell partly because ..." and one that begins "Rome differed from Han because ...".

## Exit ticket

Name one thing a conquered Roman province gained and one it lost.
`,
  reading: [
    "Two empires, two collapses",
    `
Rome began as a city on the Tiber River that overthrew its kings in 509 BCE and built a **republic**. Power was shared among two yearly consuls, a Senate of wealthy leaders, and tribunes who spoke for ordinary citizens. In 450 BCE the Romans carved their laws on the Twelve Tables so that everyone could see the rules. The Republic then expanded, first across Italy and then overseas. Three wars against Carthage, the Punic Wars from 264 to 146 BCE, ended with Rome controlling the western Mediterranean.

Expansion brought wealth and trouble. Generals gained loyal armies, enslaved captives filled Roman farms, and poor farmers lost their land. Rival leaders fought for power. After Julius Caesar was assassinated in 44 BCE, his heir Octavian won the civil wars and in 27 BCE took the title Augustus, becoming the first emperor. The Republic had lasted 482 years. For the next two centuries Rome enjoyed the **Pax Romana**, a long peace inside its borders, supported by roads, a common currency and a single legal system.

For people Rome ruled, the effects were mixed. Provinces gained roads, aqueducts, trade and eventually the chance to become Roman citizens. They also paid taxes, supplied soldiers, and could be enslaved if they resisted. After 180 CE emperors were often chosen or killed by the army, inflation weakened the economy, plague struck, and frontiers were hard to defend. In 476 CE the last western emperor, Romulus Augustulus, was removed by a Germanic general named Odoacer.

On the other side of Eurasia, **Han China** rose after Liu Bang defeated rivals in 202 BCE. Emperor Wu, who ruled from 141 to 87 BCE, expanded the empire, built up a civil service of educated officials who studied Confucian texts, and opened trade along the Silk Road. Han artisans improved iron tools and invented paper by about 105 CE. But heavy taxes burdened farmers, powerful landowners grew rich, and court officials fought over weak young emperors. A peasant revolt in 184 CE, the Yellow Turban Rebellion, showed how fragile order had become, and in 220 CE the Han ended when generals divided the empire.

Rome and Han lasted around four centuries each, and both fell partly from the same causes: expensive armies, unequal wealth and weak central rule. The differences matter too. China's civil service and shared writing helped later dynasties rebuild a united empire, while Rome's western lands never reunited.
`,
  ],
  cards: [
    ["Republic", "A government in which power belongs to citizens and officeholders chosen by them, not a hereditary king."],
    ["Consul", "One of two elected leaders of the Roman Republic who served for a single year."],
    ["Twelve Tables", "Rome's first written laws, set up in 450 BCE so that all citizens could know them."],
    ["Punic Wars", "Three wars (264 to 146 BCE) between Rome and Carthage that made Rome master of the western Mediterranean."],
    ["Pax Romana", "The roughly 200 years of relative peace and stability inside the Roman Empire after 27 BCE."],
    ["Augustus", "Title of Octavian, who became Rome's first emperor in 27 BCE."],
    ["Civil service", "A system of trained officials who run a government, as in Han China."],
    ["Yellow Turban Rebellion", "A large peasant uprising in 184 CE that weakened the Han dynasty."],
  ],
  closed: [
    [
      "The Roman Republic lasted from 509 BCE to 27 BCE. About how many years was that?",
      ["About 380 years", "About 482 years", "About 536 years", "About 690 years"],
      "B",
    ],
    [
      "What was the main purpose of the Twelve Tables?",
      [
        "To make the Senate more powerful",
        "To record Rome's laws publicly so that all citizens could know them",
        "To list the cities Rome had conquered",
        "To set taxes for the provinces",
      ],
      "B",
    ],
    [
      "Which was a benefit of Roman rule for people in the provinces?",
      [
        "Freedom from all taxes",
        "Roads, trade and the chance to become citizens",
        "The right to choose their own emperor",
        "An end to slavery",
      ],
      "B",
    ],
    [
      "Han officials were chosen by studying Confucian texts. What did this create?",
      [
        "A civil service of educated officials",
        "A government run only by the military",
        "A parliament elected by farmers",
        "A system of kings in every province",
      ],
      "A",
    ],
    [
      "Which problem hurt both Rome and Han in their later years?",
      [
        "Too few roads",
        "Unequal wealth and weak central leadership",
        "A lack of written laws",
        "A shortage of cities",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain two reasons why the Roman Republic turned into an empire under Augustus. Give a fact for each.",
      scheme: [
        "Gives a first reason, such as generals with loyal private armies",
        "Supports the first reason with a fact or example",
        "Gives a second reason, such as civil wars after Caesar's assassination or inequality among Romans",
        "Supports the second reason with a fact such as the assassination in 44 BCE or Augustus winning in 27 BCE",
      ],
      model:
        "One reason was that powerful generals had armies loyal to them, not to the Senate, so rivals fought for control. Another was the civil wars after Julius Caesar was killed in 44 BCE. Octavian won them, and in 27 BCE he became Augustus, the first emperor.",
      answers: [
        [
          "full",
          "One reason is [[0|generals had armies that were loyal to them personally]], like [[1|Caesar, whose soldiers followed him across the Rubicon]]. Another reason is [[2|there were civil wars after Caesar was killed]] and [[3|Octavian won and became Augustus in 27 BCE]].",
          "Full marks. The Rubicon is a good, accurate example of an army loyal to its general.",
        ],
        [
          "full",
          "[[0|Rome grew by conquest and the generals got rich and powerful with soldiers who depended on them]], for example [[1|Pompey and Caesar fought each other]]. Also [[2|the Republic had too much unrest and fighting between rivals]]. [[3|After Caesar's murder in 44 BCE, Octavian beat his opponents and was named Augustus]].",
          "All four points. You showed the generals' power as a cause and then the civil war as the result.",
        ],
        [
          "partial",
          "[[0|Generals had their own armies]]. And Augustus became emperor.",
          "That reason is right. Give a fact to support it, and add a second reason with evidence.",
        ],
        [
          "partial",
          "[[2|There were civil wars after Caesar was killed]] and [[3|in 27 BCE Augustus became the first emperor]].",
          "Good use of the civil war and date. Add a second, different reason, such as the power of generals, and support it.",
          true,
        ],
        [
          "weak",
          "Rome had a republic and then the people voted to have an emperor because they wanted a king.",
          "Romans had rejected kings in 509 BCE. The change came through civil war and the army, not a vote. Think about who held power by 44 BCE.",
        ],
        [
          "weak",
          "Because of the Punic Wars. Carthage made Rome into an empire.",
          "The Punic Wars helped Rome grow, but the Republic became an empire after Rome's own civil wars. Say what happened after Caesar died.",
        ],
      ],
    },
    {
      prompt:
        "Compare why the Roman Empire and Han China declined. Name one cause they share and one difference in what came after.",
      scheme: [
        "Names a shared cause of decline, such as weak emperors, unequal wealth or heavy taxes",
        "Supports the shared cause with an example from each empire or from one clearly",
        "Identifies a difference in what came after, such as Han being rebuilt by later dynasties",
        "Explains the difference with a reason, such as China's civil service and common writing, or Rome's western lands not reuniting",
      ],
      model:
        "Both empires suffered from weak central leadership and unequal wealth. Roman emperors were made and killed by armies, and Han court officials fought over young emperors while rich landowners avoided taxes. After Han fell, China was later reunited by new dynasties with the help of its civil service, but Rome's western lands never came together again.",
      answers: [
        [
          "full",
          "[[0|Both had weak leadership and rich people getting too much power]]. [[1|Roman emperors were killed by their armies and in Han China young emperors were controlled by officials]]. [[2|China ended up united again by later dynasties]] but [[3|Rome's western part never came back together, maybe because China had a civil service and shared writing]].",
          "Full marks. You tied the shared cause to examples from both empires and gave a reason for the difference.",
        ],
        [
          "full",
          "A shared cause is [[0|unfair taxes and unequal land]]. [[1|In Han times farmers were hurt by taxes and the Yellow Turbans rose up, while in Rome inflation hurt ordinary people]]. [[2|After Han, China was reunited under later dynasties]], [[3|since the idea of one empire and educated officials survived, while Rome's west split into different kingdoms]].",
          "All four points. Naming the Yellow Turbans and inflation shows you know specific evidence for both.",
        ],
        [
          "partial",
          "[[0|Both had weak emperors]]. Rome fell in 476 CE and Han in 220 CE.",
          "Weak emperors is a valid shared cause. The question also asks for an example and a difference in what came after.",
        ],
        [
          "partial",
          "[[2|China got put back together again but Rome didn't]]. [[3|The Chinese had a civil service]].",
          "Good on the difference. You also need a shared cause with evidence.",
          true,
        ],
        [
          "weak",
          "They both fell because barbarians conquered them and that's the only reason.",
          "Outside pressure mattered for Rome, but Han fell largely from inside, from rebellion and generals. Look for a cause that applies to both.",
        ],
        [
          "weak",
          "Han and Rome both fell in 476 CE when their last emperors lost.",
          "Han ended in 220 CE. Only the western Roman Empire ended in 476 CE. Check your dates before comparing.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "India's empires, four world religions and the limits of evidence",
  note: `
## Objectives

Students will be able to:

1. describe the Maurya and Gupta empires of India and their contributions to mathematics and science;
2. compare the beliefs and practices of Hinduism, Buddhism, Judaism and Christianity and explain how each spread;
3. identify what an inscription, a coin and a chronicle can and cannot show as evidence.

## Materials

A map of India with the Maurya and Gupta territories, a photocopy of a plain coin and a plain pillar, four short belief profile cards, a four-column religion chart, and the exit ticket.

## Starter (8 minutes)

Write 0 on the board. Ask: "Where did zero come from, and why did anyone need it?" Take guesses. Then write 205 and 25 and ask what the zero is doing. Explain that India's mathematicians made zero a number and a way to hold a place in a larger number.

## Main activity

1. Tell the story of Ashoka (about 268 to 232 BCE): the violent Kalinga war, his turn toward Buddhism and his edicts carved on stone pillars. Students list what a pillar tells us and what it cannot (did people follow the edicts?).
2. Use the four profile cards. Pairs complete the chart: founder or origin, central belief, holy text or practice, how it spread. Highlight how Buddhism followed trade routes and Ashoka's missionaries, Christianity spread on Roman roads, Judaism spread in a diaspora after the Romans destroyed the Temple in 70 CE, and Hinduism spread with Indian traders and teachers.
3. Evidence round: show a coin of a Gupta king and read an imagined chronicle line. Students answer "What can this show? What can it not show?"

## Checking for understanding

Each pair writes one claim a historian could safely make from an inscription and one claim they could not.

## Exit ticket

Choose one of the four religions and explain one way it spread.
`,
  reading: [
    "Ashoka's pillars, the Gupta zero and four faiths",
    `
In northern India, **Chandragupta Maurya** built a large empire around 322 BCE, using a strong army and a network of spies and officials. His grandson **Ashoka**, who ruled from about 268 to 232 BCE, brought the Maurya Empire to its height. After a brutal war against the kingdom of Kalinga, in which tens of thousands died according to his own inscriptions, Ashoka turned toward Buddhism. He had edicts carved into rock faces and stone pillars across the empire, telling officials and subjects to be fair, tolerate other beliefs and avoid needless violence. The empire broke up about fifty years after his death.

Five centuries later, the **Gupta Empire**, from about 320 to 550 CE, ruled northern India in an age often called a golden age. Its scholars worked out the decimal place-value system with zero as a number, which later spread west through the Islamic world and became the numerals we use. The astronomer Aryabhata calculated pi as about 3.1416 and explained that the Earth turns on its axis. Indian doctors set bones, performed surgery and wrote medical texts.

During these centuries, four major religions took shape or spread. **Hinduism** has no single founder. It grew from ancient texts called the Vedas and teaches ideas such as dharma (duty), karma (action and its results), and reincarnation. **Buddhism** began with Siddhartha Gautama, who lived around 500 BCE and taught the Four Noble Truths and the Eightfold Path as a way to end suffering. It spread through monks, merchants and kings such as Ashoka. **Judaism**, rooted in a covenant between one God and the Israelites, teaches belief in one God and the laws of the Torah. After Rome destroyed the Temple in Jerusalem in 70 CE, Jews spread across the empire, keeping their faith in communities known as the diaspora. **Christianity** began in the first century CE among the followers of Jesus of Nazareth, a Jewish teacher. Missionaries such as Paul carried it along Roman roads, and it became legal in 313 CE and the empire's official religion in 380 CE.

Historians reach these facts from sources that each have limits. An **inscription** like Ashoka's pillar shows what a ruler wanted to say, but not whether people obeyed. A **coin** shows a ruler's name, image and metal, which can prove trade and the date a king ruled, but not what ordinary people believed. A **chronicle**, a record written by a court writer, can give a sequence of events, but it often flatters the ruler who paid for it.
`,
  ],
  cards: [
    ["Ashoka", "Maurya emperor (about 268 to 232 BCE) who turned to Buddhism after the Kalinga war and carved his edicts on pillars."],
    ["Edict", "An official order or announcement, such as those Ashoka had carved in stone."],
    ["Gupta golden age", "About 320 to 550 CE, a period of achievement in mathematics, astronomy and medicine in northern India."],
    ["Decimal system with zero", "A way of writing numbers by place value, developed in India, that treats zero as a number."],
    ["Dharma and karma", "Hindu ideas of duty (dharma) and the results of one's actions (karma)."],
    ["Four Noble Truths", "The Buddha's teaching that life includes suffering, that desire causes it, that it can end, and that the Eightfold Path leads to its end."],
    ["Diaspora", "The scattering of a people from their homeland, as with the Jews after 70 CE."],
    ["Inscription, coin, chronicle", "Three kinds of ancient evidence, each limited by who made it and why."],
  ],
  closed: [
    [
      "What did the Kalinga war do to Ashoka's policies?",
      [
        "It convinced him to attack more kingdoms",
        "It led him to Buddhism and to edicts on tolerance and fairness",
        "It made him abandon the throne",
        "It made him a ruler of Rome",
      ],
      "B",
    ],
    [
      "Why was the Indian use of zero so important in mathematics?",
      [
        "It made it possible to write any number by place value",
        "It replaced all fractions",
        "It was only used for religious texts",
        "It ended the need for counting",
      ],
      "A",
    ],
    [
      "Which religion's central text is the Torah?",
      ["Hinduism", "Buddhism", "Judaism", "Christianity"],
      "C",
    ],
    [
      "How did Christianity spread so widely in its first three centuries?",
      [
        "Through armies that conquered each region",
        "Through missionaries such as Paul who traveled along Roman roads and sea routes",
        "By being the empire's official religion from its beginning",
        "By being carried only by Gupta merchants",
      ],
      "B",
    ],
    [
      "A pillar edict of Ashoka says, \"All people are my children.\" What is the best conclusion?",
      [
        "All of Ashoka's subjects were treated equally",
        "It shows what Ashoka wanted to be known for, but not that his officials followed it",
        "Ashoka was never a warrior",
        "No one in India was ever mistreated",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose two of the four religions (Hinduism, Buddhism, Judaism, Christianity). Compare one belief of each and explain how each one spread.",
      scheme: [
        "Accurately states one belief of the first chosen religion",
        "Accurately states one belief of the second chosen religion",
        "Explains how the first religion spread, with a specific detail",
        "Explains how the second religion spread, with a specific detail",
      ],
      model:
        "Buddhism teaches the Four Noble Truths, that life has suffering that can end by following the Eightfold Path. Christianity teaches belief in one God and in Jesus as his son. Buddhism spread through monks, merchants and Ashoka's missionaries, while Christianity spread through Paul and other missionaries along Roman roads.",
      answers: [
        [
          "full",
          "[[0|Buddhists believe suffering comes from desire and can end by following the Eightfold Path]]. [[1|Christians believe in one God and that Jesus is his son]]. [[2|Buddhism spread along trade routes with monks and merchants and Ashoka sent missionaries]]. [[3|Christianity spread when Paul and others traveled on Roman roads]].",
          "Full marks. Each belief is accurate and each way of spreading has a specific detail.",
        ],
        [
          "full",
          "I'm choosing Judaism and Hinduism. [[0|Jews believe in one God and follow the Torah]] and [[1|Hindus believe in dharma and karma and being reborn]]. [[2|After the Romans destroyed the Temple in 70 CE the Jews were scattered across the empire, the diaspora]], and [[3|Hinduism spread as Indian traders and teachers traveled]].",
          "All four points. The diaspora is the correct way to explain how Judaism spread.",
        ],
        [
          "partial",
          "[[0|Buddhists follow the Eightfold Path]]. [[1|Christians believe in Jesus]]. Both spread everywhere eventually.",
          "The beliefs are right. Say how each one spread, using a detail such as Ashoka or Paul.",
        ],
        [
          "partial",
          "[[2|Buddhism spread when Ashoka sent missionaries]] and [[3|Christianity spread on Roman roads]]. They have different beliefs.",
          "Good on the spread. The question also asks you to name one belief of each religion.",
          true,
        ],
        [
          "weak",
          "Buddhists believe in the Torah and Jews believe in karma. They spread because armies made people join.",
          "The Torah is Jewish, and karma is part of Hindu and Buddhist teaching. These religions mainly spread by teachers and trade, not armies. Review each profile card.",
        ],
        [
          "weak",
          "[[1|Christianity is about Jesus]]. All four religions are the same.",
          "Jesus is central to Christianity, which is right. But the four religions differ in belief, so pick specific ideas and say how each spread.",
        ],
      ],
    },
    {
      prompt:
        "A historian wants to know whether Ashoka's people followed his edicts on tolerance. Explain what his pillar inscriptions can show and what they cannot, and name one other source that would help.",
      scheme: [
        "States that the inscriptions show what Ashoka wanted to say or what policies he announced",
        "States that they cannot show whether people or officials actually obeyed",
        "Gives a reason, such as that the ruler made them to present himself well",
        "Names another useful source, such as a record from outside India, a local account or archaeological evidence",
      ],
      model:
        "The pillars show what Ashoka announced and wanted people to believe about his rule. They cannot prove that officials or ordinary people followed the edicts, because a ruler writes to present himself well. A historian would want another source, such as a Greek or Sri Lankan account, or archaeological evidence from towns, to check it.",
      answers: [
        [
          "full",
          "[[0|The pillars show what policies Ashoka announced]]. But [[1|they can't prove his officials or the people actually did what they said]] because [[2|a king wrote them to look good]]. [[3|A historian would want a source from outside, like an account by a Greek visitor]].",
          "Full marks. You separated what a ruler says from what happens, then proposed a check on it.",
        ],
        [
          "full",
          "These inscriptions [[0|tell us what Ashoka wanted his empire to hear and believe]]. They [[1|don't tell us whether people really practiced tolerance]], since [[2|kings carve things to praise themselves]]. [[3|Archaeological evidence from towns would show if different religions really lived together]].",
          "All four points. Suggesting archaeology as a check is a smart historian's move.",
        ],
        [
          "partial",
          "[[0|The pillars show Ashoka's rules]]. [[3|Another source could be a Greek record]].",
          "Both parts are good. Add what the pillars cannot prove, and why.",
        ],
        [
          "partial",
          "[[1|We can't know if people obeyed]] and [[2|the king might have been bragging]].",
          "Good limits. Say what the inscription does show, and name another source that would help.",
          true,
        ],
        [
          "weak",
          "The pillars prove everyone was tolerant because it's carved in stone and stone doesn't lie.",
          "Stone lasts, but the person who ordered the carving chose the words. An inscription shows what the ruler said, not what everyone did.",
        ],
        [
          "weak",
          "[[0|They show Ashoka's laws]]. Nothing else could help because it was so long ago.",
          "Naming the laws is right. But other sources, like outside accounts or digs, can help, so a historian would look for them.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Why some empires last: comparing evidence, and feeding the cities",
  note: `
## Objectives

Students will be able to:

1. use evidence from several sources to argue why one classical empire lasted longer than another;
2. use maps and population data to describe how early societies met their needs for food and water.

## Materials

A data table of empire dates (Maurya, Gupta, Han, Roman Empire in the west), four short source cards (a Han census figure, a Roman aqueduct description, a Gupta coin note, a Maurya road note), blank maps with rivers marked, calculators, and the exit ticket.

## Starter (8 minutes)

Write four empire names on the board. Ask students to guess which lasted longest and by how many years. After the guesses, reveal the dates and have partners compute the lifespans: Maurya about 322 to 185 BCE, Gupta about 320 to 550 CE, Han 202 BCE to 220 CE, western Rome 27 BCE to 476 CE.

## Main activity

1. In groups, students rank the four empires by length and then choose one factor (roads, a civil service, religion, trade, a strong frontier, a food supply) that best explains why the longest-lasting one lasted. They must cite two of the source cards.
2. Introduce the second question. Show a map of Rome with its aqueducts and a map of the Nile delta. Use the sample figures on the board: a city of one million people needs about 1.5 million pounds of grain a day. Where did it come from and how was it moved?
3. Each group sketches a flow of food and water to one city on the blank map.

## Checking for understanding

A group's spokesperson states the claim and the one piece of evidence that best supports it. Another group must name the best piece of evidence against it.

## Exit ticket

Give one claim about why an empire lasted and the evidence that supports it.
`,
  reading: [
    "Counting years, counting people, counting grain",
    `
When historians compare empires, they start with simple numbers. The Maurya Empire lasted about 137 years, from around 322 to 185 BCE. The Gupta Empire lasted about 230 years, from around 320 to 550 CE. Han China lasted 421 years, from 202 BCE to 220 CE, if you count the short break in the middle. The Roman Empire in the west lasted from 27 BCE to 476 CE, about 502 years. But the numbers do not explain themselves. The question "why did one last longer?" needs evidence about how each empire was held together.

Rome and Han both lasted a long time, and both shared features. Each had a standing army paid by taxes. Each built roads and canals that moved soldiers and grain. Rome built roads that connected the whole empire, and local people became Roman citizens, which gave them a reason to stay loyal. Han China used a civil service of trained officials who owed their jobs to merit rather than birth. Both used a written language that officials across a huge area could read. The Maurya Empire, by contrast, relied heavily on one strong ruler and a network of spies and officials. After Ashoka died, no equally strong leader followed, and the empire split. Weak links like this help explain why it ended so soon.

Empires also depended on food and water. The Han census in 2 CE counted about 58 million people, one of the largest counts of the ancient world. Feeding so many required farms along the Yellow and Yangtze rivers and canals to carry grain north. Rome's capital held about one million people in the second century CE. A city of that size needs about 1.5 million pounds of grain every day, assuming each person eats about 1.5 pounds. Much of it came by ship from Egypt, because the Nile delta produced large harvests. Water was carried by aqueducts, stone channels that used gravity to bring clean water from hills dozens of miles away. Rome's cities had fountains, baths and sewers because of them.

A strong argument about an empire's lifespan uses a claim, evidence and reasoning. "Rome lasted longer than the Maurya because it built roads and extended citizenship" is a claim. The roads and citizenship are evidence only if sources show them. The reasoning explains why those things kept people loyal and the empire connected.
`,
  ],
  cards: [
    ["Claim", "A statement you argue is true, supported by evidence."],
    ["Evidence", "Facts from a source that support or challenge a claim."],
    ["Reasoning", "The explanation that connects the evidence to the claim."],
    ["Aqueduct", "A raised stone channel that carries water using gravity, as in Roman cities."],
    ["Census", "An official count of a population; the Han census of 2 CE counted about 58 million."],
    ["Merit", "Worth or ability; a merit-based civil service chooses officials for ability rather than birth."],
    ["Citizenship (Roman)", "Legal membership in Rome's community, extended over time to people in the provinces."],
    ["Canal", "A human-made waterway used to move water or boats, as in Han China."],
  ],
  closed: [
    [
      "The Han dynasty ran from 202 BCE to 220 CE. How many years is that?",
      ["318 years", "382 years", "421 years", "422 years"],
      "C",
    ],
    [
      "A city of 2,000 people eats about 1.5 pounds of grain each per day. How much grain does it need in one day?",
      ["3,000 pounds", "1,333 pounds", "30,000 pounds", "300 pounds"],
      "A",
    ],
    [
      "Which factor best helps explain why Rome lasted longer than the Maurya Empire?",
      [
        "Rome had fewer people to govern",
        "Rome built roads and gave citizenship, which tied provinces to the center",
        "Rome never fought wars",
        "Rome's ruler lived forever",
      ],
      "B",
    ],
    [
      "How did Roman cities get clean water from distant hills?",
      ["By pumping it with steam", "By aqueducts that used gravity", "By melting snow in the city", "By buying it from Egypt"],
      "B",
    ],
    [
      "Which sentence is evidence, not just a claim?",
      [
        "The Han were the best empire",
        "The Han census of 2 CE counted about 58 million people",
        "Rome was too big to fail",
        "Roads are always good for empires",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Rome lasted about 502 years in the west and the Maurya Empire about 137 years. Make an argument for one factor that best explains the difference, and support it with two pieces of evidence from this unit.",
      scheme: [
        "States a clear claim naming one factor",
        "Gives a first piece of accurate evidence",
        "Gives a second piece of accurate evidence",
        "Explains the reasoning that links the evidence to the lifespan",
      ],
      model:
        "Rome lasted longer mainly because it tied its provinces to the center. It built roads across the empire and it gave citizenship to people it conquered. The Maurya Empire depended on one strong ruler and split soon after Ashoka. Roads and citizenship gave people a reason to stay loyal even when one emperor was weak.",
      answers: [
        [
          "full",
          "[[0|I think the biggest reason was how Rome connected its provinces]]. [[1|Rome built roads so soldiers and goods could go everywhere]], and [[2|it gave citizenship to people it conquered]]. [[3|That meant people had a reason to stay loyal even if an emperor was weak, while the Maurya depended on Ashoka and fell apart soon after he died]].",
          "Full marks. You made a claim, backed it with two pieces of evidence and explained why they mattered.",
        ],
        [
          "full",
          "[[0|My claim is that the Roman system of government was more stable]]. [[1|Rome had a legal system and the same laws all over the empire]], and [[2|the army was paid with taxes from the provinces so it could defend the borders]]. [[3|The Maurya relied on a single strong ruler, so when the ruler was gone the system collapsed]].",
          "All four points. The key was the contrast: a system that survives weak leaders against one that does not.",
        ],
        [
          "partial",
          "[[0|Rome lasted longer because of its roads]]. [[1|They connected the whole empire]].",
          "A good claim and one piece of evidence. Add a second piece, and explain how it explains the longer life.",
        ],
        [
          "partial",
          "[[1|Rome gave citizenship to conquered people]] and [[2|built roads]]. That is why it was good.",
          "You have two pieces of evidence. Now state the claim clearly, and connect them to why Rome lasted longer than Maurya.",
          true,
        ],
        [
          "weak",
          "Rome lasted longer because it was bigger and stronger than everyone and the Maurya were weak.",
          "Size alone does not explain it, and the Maurya were large too. Choose one specific factor, such as roads or citizenship, and give evidence.",
        ],
        [
          "weak",
          "[[0|Rome's military made it last]] and the Maurya had no army.",
          "The Maurya did have a large army. Pick a factor and compare how the two empires used it.",
        ],
      ],
    },
    {
      prompt:
        "Rome's capital had about one million people in the second century CE. Using that figure, calculate how many pounds of grain it needed per day at 1.5 pounds per person, and explain where much of that grain came from and why.",
      scheme: [
        "Correctly multiplies 1,000,000 by 1.5",
        "States the answer as 1.5 million pounds a day, with the unit",
        "Names Egypt or the Nile delta as a main source of grain",
        "Explains why, such as large harvests from the Nile's silt and the ability to ship by sea",
      ],
      model:
        "One million people times 1.5 pounds each is 1,500,000 pounds, or 1.5 million pounds of grain a day. A lot of it came from Egypt, because the Nile's flood left rich silt and produced huge harvests, and the grain could be shipped across the Mediterranean.",
      answers: [
        [
          "full",
          "[[0|1,000,000 x 1.5 = 1,500,000]] so [[1|the city needed 1.5 million pounds of grain every day]]. [[2|Much came from Egypt]] because [[3|the Nile made the soil rich and the grain could be sent by ship]].",
          "Full marks. The calculation, the unit and the reasoning are all there.",
        ],
        [
          "full",
          "A million people times one and a half pounds is [[0|1.5 million]], which means [[1|1,500,000 pounds of grain per day]]. [[2|A lot of that was shipped from the Nile delta in Egypt]], [[3|because the yearly flood left rich silt and gave big harvests]].",
          "All four points. Naming the Nile delta and the flood shows how this connects to week 1.",
        ],
        [
          "partial",
          "[[0|1,000,000 x 1.5 = 1,500,000]]. The grain probably came from farms nearby.",
          "The calculation is right. Add the unit and say where much of Rome's grain really came from.",
        ],
        [
          "partial",
          "[[2|Egypt provided a lot of the grain]] [[3|since the Nile had good farmland]]. About a million pounds a day.",
          "Your reasoning is good, but a million times 1.5 is more than a million pounds. Redo the multiplication.",
          true,
        ],
        [
          "weak",
          "1,000,000 + 1.5 = 1,000,001.5 pounds. The grain came from the city's own fields.",
          "You added when the question needs multiplication, since each person needs 1.5 pounds. And a city that size needed grain from abroad.",
        ],
        [
          "weak",
          "[[2|The grain came from Egypt]] and the amount is 150,000 pounds.",
          "Egypt is right. For the amount, multiply 1,000,000 by 1.5. Count the zeros carefully.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "The Silk Road and the Indian Ocean: trade, ideas and what moved with them",
  note: `
## Objectives

Students will be able to:

1. gather information about Silk Road and Indian Ocean trade from several primary and secondary sources;
2. combine evidence from several sources to support a claim about how ideas spread along trade routes.

## Materials

A wall map of Eurasia and the Indian Ocean, five source cards (a teacher-written summary of Zhang Qian's mission, a description from a first-century sailors' guidebook, a note on Roman coins found in southern India, a Buddhist cave-temple description, and a textbook paragraph), highlighters, and the exit ticket.

## Starter (8 minutes)

Ask: "Which of your things came from somewhere else, and how did it get here?" List items (phone parts, shoes, spices, the cotton in a T-shirt). Say that long-distance trade is thousands of years old.

## Main activity

1. Trace the Silk Road on the map: Chang'an in China, through central Asia, to Antioch and the Mediterranean, about 4,000 miles. Note that few merchants made the whole trip; goods passed through many hands. Then show the monsoon route across the Indian Ocean, where sailors used summer winds from the southwest to reach India and winter winds from the northeast to return.
2. Source stations. Groups rotate through the five cards and record on a note sheet: who made it, what it says about goods, what it says about ideas, and its limits (primary or secondary, bias, gaps).
3. Each group drafts a claim about how one idea, such as Buddhism or a technology like papermaking, spread, citing at least two of the cards.

## Checking for understanding

Pairs trade claims and underline the evidence. The partner marks "needs a source" where a claim has none.

## Exit ticket

Name one thing that traveled along a trade route besides goods and explain how it traveled.
`,
  reading: [
    "Caravans, monsoons and the ideas that came along",
    `
Trade across the ancient world moved by two great systems, one by land and one by sea. The **Silk Road** was not a single road but a network of tracks running about 4,000 miles from Chang'an, the Han capital, across deserts and mountains of central Asia to the Mediterranean. It earned its name from Chinese silk, a fabric that Romans prized and could not make. The Han emperor Wu sent an envoy, Zhang Qian, west in 138 BCE to seek allies and was surprised to find rich kingdoms with horses worth buying. Caravans of camels carried silk, jade, porcelain and paper east to west, and brought back glass, gold, horses and grapes. Few merchants traveled the whole route. Goods were passed along from trader to trader, with prices rising at each stop.

The **Indian Ocean** trade moved by sea. Sailors learned that the monsoon winds blow from the southwest in summer and reverse in winter. A ship could leave Arabia or East Africa in summer, reach India in a few weeks, and return months later with the winter wind. Greek-speaking sailors in Egypt wrote a first-century CE guidebook, the Periplus of the Erythraean Sea, listing ports, goods and dangers. It names spices, pearls and ivory. Archaeologists have also found Roman coins in southern India, showing that merchants did far more than write about the trade.

Goods were only part of what moved. Merchants and monks carried ideas, and the routes became pathways for religions. Buddhism traveled from India along the Silk Road to central Asia and China, where merchants supported monasteries and cave temples. Technologies moved too: Chinese papermaking spread west over several centuries. Plants such as cotton and citrus were carried between regions. So were diseases, which spread along trade routes, including an epidemic that struck the Roman Empire in the second century CE.

When historians combine sources about trade, each one fills a gap. A sailor's guidebook gives details about ports and goods but says little about ordinary people. Coins show where money circulated but not what was bought. A textbook, a secondary source, pulls evidence together but can leave out disagreements. By reading them together and asking where they agree, historians can support a claim, such as "Buddhism spread along trade routes because merchants funded monasteries," with more than one kind of proof.
`,
  ],
  cards: [
    ["Silk Road", "A network of overland trade routes about 4,000 miles long linking China with the Mediterranean."],
    ["Caravan", "A group of traders and pack animals traveling together, especially across desert."],
    ["Monsoon", "A seasonal wind that reverses direction, used by sailors to cross the Indian Ocean."],
    ["Zhang Qian", "The Han envoy sent west in 138 BCE whose travels opened contact with central Asia."],
    ["Periplus of the Erythraean Sea", "A first-century CE sailors' guide to ports and goods along the Red Sea and Indian Ocean."],
    ["Cultural diffusion", "The spread of ideas, beliefs and technologies from one society to another."],
    ["Primary and secondary sources (trade)", "A guidebook written by a sailor is primary; a modern textbook summary is secondary."],
    ["Middlemen", "Traders who buy goods from one trader and sell to the next, raising the price along the route."],
  ],
  closed: [
    [
      "Why was the Silk Road not a single road?",
      [
        "It was one paved road built by the Han",
        "It was a network of routes, and goods were passed from trader to trader",
        "It ran only by sea",
        "It existed only on Roman maps",
      ],
      "B",
    ],
    [
      "How did sailors use the monsoon winds?",
      [
        "They rowed against them for exercise",
        "They sailed to India with summer winds and returned with winter winds",
        "They sailed only in the winter",
        "They avoided the ocean in monsoon season",
      ],
      "B",
    ],
    [
      "Roman coins found in southern India show that:",
      [
        "Romans invaded India",
        "Roman and Indian merchants traded directly or indirectly",
        "Indians used only Roman money",
        "India was part of the Roman Empire",
      ],
      "B",
    ],
    [
      "A silk scarf is bought in China for 10 dollars and passes through 2 middlemen. Each adds 50 percent of the price he paid. What does the second middleman sell it for?",
      ["15 dollars", "20 dollars", "22.50 dollars", "25 dollars"],
      "C",
    ],
    [
      "Which claim is best supported by combining a monk's travel diary, a cave-temple description and a record of merchant donations?",
      [
        "Buddhism spread to China partly because merchants funded monasteries",
        "Silk was the only item traded",
        "Roman citizens built the Silk Road",
        "Buddhism was created in China",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Use two sources from the unit (for example Zhang Qian's mission, the Periplus, Roman coins in India, or a Buddhist cave temple) to support the claim: \"Trade routes spread more than goods.\"",
      scheme: [
        "Names a first specific source",
        "Says what it shows about ideas or technology spreading, not just goods",
        "Names a second, different specific source",
        "Says what it shows, and links both to the claim",
      ],
      model:
        "A Buddhist cave temple in central Asia, funded by merchants, shows that a religion from India spread along the Silk Road. The Periplus, a sailors' guidebook, shows that Indian Ocean traders did not only carry goods but also knew and shared information about distant ports. Together they support the claim that routes carried ideas and knowledge as well as goods.",
      answers: [
        [
          "full",
          "[[0|One source is a Buddhist cave temple in central Asia]]. [[1|It shows Buddhism traveled from India along the Silk Road because merchants paid for monasteries]]. [[2|Another is the Periplus]], and [[3|it shows sailors shared information about ports, so knowledge was moving too, which backs up the claim]].",
          "Full marks. You named two specific sources and used each to show something other than goods.",
        ],
        [
          "full",
          "[[0|Zhang Qian's mission is a source]]. [[1|It shows that contact with central Asia brought new knowledge about kingdoms and horses to China]]. [[2|The Roman coins in southern India are another]]. [[3|They show contact between Rome and India, so news and ideas could travel along with the money, which supports the claim]].",
          "All four points. Linking each source back to the claim shows careful argument.",
        ],
        [
          "partial",
          "[[0|The Buddhist cave temples]] [[1|show that Buddhism spread to China on the Silk Road]]. Trade is important.",
          "Your first source is well used. Add a second, different source and connect both to the claim.",
        ],
        [
          "partial",
          "[[2|The Periplus is a source]] and [[3|it shows ports where ideas could be exchanged]]. I think the claim is true.",
          "Good second source. Name a first source too, and say what it shows about ideas.",
          true,
        ],
        [
          "weak",
          "Trade routes carried silk and spices, so more than goods means more kinds of goods.",
          "The claim means things that are not goods, like religion, technology or knowledge. Pick a source that shows one of them.",
        ],
        [
          "weak",
          "[[0|The Silk Road]] is a source. It shows silk went to Rome.",
          "The Silk Road is the subject, not a source. A source would be a text or object, and it must show something other than goods.",
        ],
      ],
    },
    {
      prompt:
        "Explain how the monsoon winds made Indian Ocean trade different from Silk Road trade. Use at least two differences.",
      scheme: [
        "States that Indian Ocean trade used ships and relied on seasonal winds",
        "States that the Silk Road used caravans over land",
        "Gives one difference in speed, cost, or amount carried, such as ships carrying heavier cargo",
        "Gives one more difference or consequence, such as sailors timing trips by season or goods changing hands many times on the Silk Road",
      ],
      model:
        "Indian Ocean trade moved by ship, and sailors timed trips to the monsoon winds, going east in summer and returning in winter. The Silk Road moved by caravans over land. Ships could carry heavier cargo, such as pearls, spices and ivory, while Silk Road goods had to be light and valuable and passed through many traders who raised the price.",
      answers: [
        [
          "full",
          "[[0|Indian Ocean trade was by sea and sailors used the monsoon winds to go one way in summer and the other way in winter]]. [[1|The Silk Road was overland with camel caravans]]. [[2|Ships could carry more weight at one time]], and [[3|on the Silk Road goods went through lots of traders so the price kept rising]].",
          "Full marks. You gave two clear differences and tied the winds to how trips were planned.",
        ],
        [
          "full",
          "[[0|The monsoon made it possible for ships to cross the ocean, because the wind blows one direction in summer and reverses in winter]], while [[1|Silk Road traders crossed deserts and mountains with camels]]. [[2|Ships can carry heavy things like spices and ivory, but camels carry less so the goods had to be light and valuable]]. [[3|Sailors had to plan trips around the seasons]].",
          "All four points. Noting that camel loads forced light, valuable goods is a good insight.",
        ],
        [
          "partial",
          "[[0|Indian Ocean trade used ships and the monsoon winds]]. The Silk Road was mostly walking.",
          "The ship and wind point is right. Say that the Silk Road used caravans over land, and give a difference in what or how much they carried.",
        ],
        [
          "partial",
          "[[1|The Silk Road went over land with caravans]]. [[3|Traders passed goods along so prices rose]].",
          "Good on the Silk Road. The question is about how the monsoon made the sea route different, so describe the ships and the winds.",
          true,
        ],
        [
          "weak",
          "The monsoon is a big storm that sank the ships so people used the Silk Road instead.",
          "A monsoon is a seasonal wind pattern, and sailors used it. Look again at how summer and winter winds helped them.",
        ],
        [
          "weak",
          "They were the same, both moved goods between China and Rome. [[1|The Silk Road was on land]].",
          "Both moved goods, but the question asks how they differed. Compare how the goods traveled and what carried them.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Turning points and what shaped a civilization",
  note: `
## Objectives

Students will be able to:

1. construct an explanation of a turning point in the ancient world using precise vocabulary;
2. build an argument about which factor most shaped a classical civilization, supported by specific evidence.

## Materials

Turning-point cards (the Kalinga war and Ashoka's change, Qin unification in 221 BCE, the battle of Salamis in 480 BCE, Constantine and the Edict of Milan in 313 CE), an argument organizer with "claim, evidence, reasoning, counterclaim," sentence starters, and the exit ticket.

## Starter (8 minutes)

Ask: "What is a turning point in your own life, a moment after which things were not the same?" Take a few answers and define the term: an event that changes the direction of a society.

## Main activity

1. Each pair gets a turning-point card. They answer three questions: what was the situation before, what happened, and what changed after. They must use at least three vocabulary words from the quarter (for example surplus, specialization, citizen, empire, diffusion).
2. Mini-lesson on a claim-evidence-reasoning paragraph using the model: "Geography most shaped Egypt. Evidence: the Nile flooded on a schedule. Reasoning: so farmers could plan and the state could collect taxes in grain."
3. Students choose one civilization from the quarter and one factor from this list: geography, religion, government, trade, or military. They fill in the organizer and include one counterclaim, a reason another factor might matter more, and answer it.

## Checking for understanding

Circulate and listen for evidence that is specific (a date, a name, a number) rather than "they were strong."

## Exit ticket

Write your claim in one sentence and the single best piece of evidence for it.
`,
  reading: [
    "Explaining a turning point and arguing about causes",
    `
A **turning point** is an event or decision after which a society moves in a clearly different direction. To explain one well, a historian describes the situation before, the event itself, and the changes that followed. Then she tests the explanation against the evidence: did the changes really follow from the event, or were they already underway?

Consider Ashoka's change of course. Around 261 BCE, after the war in Kalinga, he wrote that he felt deep sorrow for the suffering it caused. Before the war, the Maurya Empire expanded by conquest. Afterward, Ashoka's edicts called for fairness, tolerance and care for the people, and he sent Buddhist missionaries to other lands, including Sri Lanka. The empire's policies changed, and Buddhism gained a powerful supporter and spread more widely. But an honest explanation notes limits: the edicts are Ashoka's own words, so we know what he claimed, and the empire itself still declined after his death.

Another example is the unification of China in 221 BCE, when the Qin ruler Shi Huangdi defeated the other states and declared himself the First Emperor. Before, China was divided among warring kingdoms. He standardized writing, weights, measures and even the width of cart axles, and he began building walls along the northern frontier. These changes made it easier to govern a large area, and later dynasties like the Han kept many of them. Yet his harsh rule led to revolts, and the Qin dynasty lasted only until 206 BCE.

Historians also argue about which factor mattered most in shaping a civilization. A strong argument has four parts: a **claim**, **evidence** from specific sources, **reasoning** that connects them, and an answer to a **counterclaim**. For example: "Geography most shaped Egypt. The Nile flooded on a predictable schedule and left rich silt, so farmers could plan and the state could collect grain as taxes. Someone might argue that religion mattered more because the pharaoh was divine. But belief in a divine king rested on the need to keep the flood and harvest running, so geography came first."

Notice what makes this strong. It uses a particular fact, not a general statement. It explains why the fact matters. And it takes the best objection seriously.
`,
  ],
  cards: [
    ["Turning point", "An event or decision after which a society's direction changes."],
    ["Claim", "The main point an argument tries to prove."],
    ["Counterclaim", "A reasonable objection or different explanation that an argument must answer."],
    ["Qin Shi Huangdi", "The First Emperor of China, who unified the country in 221 BCE and standardized writing, weights and measures."],
    ["Kalinga", "The kingdom whose conquest led Ashoka to reject violence and turn to Buddhism."],
    ["Edict of Milan (313 CE)", "A decision by Constantine and Licinius that allowed Christians to worship freely in the Roman Empire."],
    ["Standardization", "Making things the same across a region, such as weights or writing, to simplify government and trade."],
    ["Precise vocabulary", "Using the exact word for an idea, such as surplus or diffusion, instead of a vague one."],
  ],
  closed: [
    [
      "Which best explains why Qin unification in 221 BCE was a turning point?",
      [
        "It ended all trade in China",
        "It standardized writing, weights and measures and created one state out of many warring kingdoms",
        "It started the Silk Road",
        "It moved the capital to Rome",
      ],
      "B",
    ],
    [
      "A historian says, \"Ashoka became peaceful, so his empire never declined.\" What is the main problem with this argument?",
      [
        "It ignores that the empire declined after his death",
        "It uses too many dates",
        "It mentions Ashoka by name",
        "It has no counterclaim about Rome",
      ],
      "A",
    ],
    [
      "The Qin dynasty lasted from 221 BCE to 206 BCE. How long was that?",
      ["15 years", "27 years", "206 years", "221 years"],
      "A",
    ],
    [
      "Which sentence is the strongest piece of evidence for \"Geography shaped Egypt\"?",
      [
        "Egypt was a great civilization",
        "The Nile flooded on a predictable schedule and left rich silt",
        "Many people lived in Egypt",
        "The pharaohs were powerful",
      ],
      "B",
    ],
    [
      "What does a counterclaim do in an argument?",
      [
        "It ends the argument",
        "It repeats the claim in other words",
        "It names a reasonable objection and the writer answers it",
        "It lists the dates of every event",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Explain why the unification of China under the Qin in 221 BCE was a turning point. Describe the situation before, what changed, and one lasting effect.",
      scheme: [
        "Describes China before unification as divided into warring states",
        "Names a specific change, such as standard writing, weights, measures or axle widths",
        "States a lasting effect, such as later dynasties keeping the system or a united state being easier to govern",
        "Uses precise vocabulary, such as emperor, dynasty, unify or standardize, correctly",
      ],
      model:
        "Before 221 BCE China was divided among warring kingdoms. The Qin ruler unified them and standardized writing, weights and measures, which made a large state easier to govern. Later dynasties like the Han kept many of these changes, so the unification changed the direction of Chinese history.",
      answers: [
        [
          "full",
          "[[0|Before this China was a bunch of kingdoms fighting each other]]. The First Emperor [[1|made one writing system and one set of weights and measures]] across the country. [[2|The Han dynasty kept a lot of these changes so a big united China lasted]]. [[3|Qin was the first dynasty to unify and standardize everything]].",
          "Full marks. You described before, change and after, and used the vocabulary precisely.",
        ],
        [
          "full",
          "[[0|China was divided into warring states for a long time]]. In 221 BCE Shi Huangdi won and [[1|standardized writing, weights and even the width of cart axles]]. This was a turning point because [[2|it was easier to govern a huge area and later dynasties built on it]]. [[3|It was the start of the imperial era, with an emperor ruling a unified state]].",
          "All four points. The cart axle detail is a good, specific piece of evidence.",
        ],
        [
          "partial",
          "[[0|China was divided before and the Qin unified it]]. It was a big change.",
          "The before is right. Name a specific change the Qin made, and say what lasted afterward.",
        ],
        [
          "partial",
          "[[1|The Qin standardized writing and measures]] and [[2|the Han kept those ideas]]. It was a turning point.",
          "The change and effect are right. Describe what China was like before, so the turning is clear.",
          true,
        ],
        [
          "weak",
          "The Qin built the Great Wall and that's why it was a turning point because walls stopped the invaders forever.",
          "The wall is only part of the story and it did not stop invaders forever. Think about what unification did to writing, laws and measures.",
        ],
        [
          "weak",
          "[[0|China was divided]] and then the Romans conquered it.",
          "China was divided, which is right, but the Romans did not conquer it. The Qin ruler unified China. Check who made the change.",
        ],
      ],
    },
    {
      prompt:
        "Write an argument: Which factor most shaped one classical civilization you studied: geography, religion, government, trade, or military? State a claim, give two pieces of specific evidence, and answer one counterclaim.",
      scheme: [
        "States a clear claim naming a civilization and a factor",
        "Gives a first piece of specific, accurate evidence",
        "Gives a second piece of specific, accurate evidence",
        "States a counterclaim and answers it with reasoning",
      ],
      model:
        "Government most shaped Han China. The Han built a civil service of officials chosen by studying Confucian texts, and Emperor Wu expanded the empire and opened trade. A reader might say trade mattered more, since the Silk Road brought wealth. But the Silk Road depended on a stable government that could guard the routes, so government mattered first.",
      answers: [
        [
          "full",
          "[[0|I claim that government most shaped Han China]]. [[1|The Han made a civil service of officials who studied Confucian texts]] and [[2|Emperor Wu expanded the empire, so there was one government over a huge land]]. Someone might say trade mattered most, [[3|but the Silk Road needed a strong government to protect the routes, so government came first]].",
          "Full marks. Your counterclaim is honest and your answer to it uses reasoning, not just a denial.",
        ],
        [
          "full",
          "[[0|Geography most shaped Egypt]]. [[1|The Nile flooded on a schedule so farmers could plan]]. [[2|The silt it left was rich so Egypt could feed many people and pay taxes in grain]]. Some people say religion mattered most because pharaohs were gods, [[3|but belief in a divine king depended on keeping the flood and harvest going, so geography came first]].",
          "All four points. You connected specific facts to the claim in a clear chain.",
        ],
        [
          "partial",
          "[[0|I think trade shaped Rome the most]]. [[1|Rome got grain from Egypt by ship]]. Other things were important too.",
          "A clear claim and one real piece of evidence. Add a second and answer a specific counterclaim.",
        ],
        [
          "partial",
          "[[1|The Nile flooded on schedule]] and [[2|the silt made the farms rich]]. So geography is the answer.",
          "Your evidence is good but you did not state which civilization in a full claim, and you did not answer a counterclaim.",
          true,
        ],
        [
          "weak",
          "I think the military shaped everything because they won wars. Everyone knows that.",
          "Winning wars is a general statement. Pick a civilization, give specific evidence like a battle or an army reform, and consider an objection.",
        ],
        [
          "weak",
          "[[0|Religion shaped India the most]]. There are four religions.",
          "A claim is a start. Which religion, what did it change, and what evidence shows it? Add two specific facts and a counterclaim.",
        ],
      ],
    },
  ],
};

writeCourse("world-history-grade-9.json", "World History", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
