import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * French II, Grade 10, Quarter 1. Standards: ACTFL World-Readiness
 * Standards, in the school's own words. Prompts give English support where a
 * second-year learner needs it; learners answer in French with the slips of a
 * second-year student (agreement of the past participle, reflexive pronouns,
 * partitive articles, accents).
 */

const w1: WeekInput = {
  topic: "Ma routine, mes projets et le verbe aller",
  note: `
## Objectives

Students will be able to:

1. review greetings and introductions, and talk about family, school and free time in complete sentences;
2. describe their daily routine using reflexive verbs such as se réveiller and se laver;
3. use aller plus an infinitive to talk about plans.

## Materials

A sequence of picture cards of a daily routine, a chart of reflexive pronouns, whiteboards, the problem set.

## Starter (7 minutes)

Review in pairs: "Présente-toi. Comment s'appelle ta famille? Qu'est-ce que tu aimes faire pendant ton temps libre?" Listen for complete sentences. Write two good ones on the board.

## Main activity

1. Reflexive verbs: the pronoun matches the subject (me, te, se, nous, vous, se). Teach se réveiller (je me réveille), se lever (je me lève, with an accent change), se laver, s'habiller, se brosser les dents, se coiffer, se coucher. With body parts use the article: je me brosse les dents, not mes dents. Before a vowel, me becomes m' and te becomes t'.
2. Aller + infinitive: je vais, tu vas, il va, nous allons, vous allez, ils vont. "Je vais étudier ce soir." "Nous allons regarder un film samedi." Time expressions: demain, ce week-end, la semaine prochaine, après l'école.
3. Pair task: "Ma routine du lundi." Students describe their morning in six sentences and one plan for the evening.

## Checking for understanding

Whiteboards: conjugate se lever for je, tu, nous. Write one sentence with aller + infinitive.

## Problem set

Reflexive pronouns and aller.
`,
  reading: [
    "Une journée normale dans ma vie",
    `
When we talk about our daily routine in French, many of the verbs are **reflexive**. A reflexive verb has a pronoun that shows that the person does the action to himself or herself. The infinitive begins with **se**: se réveiller (to wake up), se lever (to get up), se laver (to wash), s'habiller (to get dressed), se brosser les dents (to brush one's teeth), se coiffer (to do one's hair) and se coucher (to go to bed). The pronoun changes with the subject: **me** (je), **te** (tu), **se** (il, elle, on), **nous** (nous), **vous** (vous), **se** (ils, elles). Before a vowel, me becomes **m'** and te becomes **t'**: je m'habille, tu t'habilles. The pronoun goes before the conjugated verb: "Je me réveille à six heures et demie." With body parts and clothing, use the definite article, not the possessive: "Je me brosse **les** dents," not "mes dents." Notice that **se lever** takes a grave accent in most forms: je me lève, tu te lèves, il se lève, but nous nous levons.

To talk about plans, French often uses **aller + infinitive**, like "going to" in English. The verb **aller** is irregular: **je vais, tu vas, il va, nous allons, vous allez, ils vont**. "Je vais étudier ce soir." "Mes amis vont jouer au foot." "Nous allons regarder un film samedi." Time expressions help: **demain**, **ce week-end**, **la semaine prochaine**, **après l'école**.

Read how one student from Columbus describes a typical day.

"Les jours d'école, je me réveille à six heures et quart. Je me lève, je me lave et je m'habille en vingt minutes. Je prends le petit déjeuner avec ma sœur et ensuite je prends le bus. Les cours commencent à sept heures et demie. L'après-midi, je joue au foot avec l'équipe. Le soir, après le dîner, je fais mes devoirs. Je me couche à dix heures et demie parce que j'ai besoin de dormir huit heures. Ce week-end, je vais me lever tard et nous allons faire une promenade en famille."

Notice how the paragraph uses the verbs in order and connects activities with time expressions: les jours d'école, l'après-midi, le soir, ce week-end.
`,
  ],
  cards: [
    ["se réveiller", "to wake up"],
    ["je me lève", "I get up"],
    ["elle se lave", "she washes"],
    ["se brosser les dents", "to brush one's teeth"],
    ["je vais / nous allons", "I go / we go"],
    ["je vais étudier", "I am going to study"],
    ["se coucher", "to go to bed"],
    ["ce week-end", "this weekend"],
  ],
  closed: [
    [
      "Which reflexive pronoun goes with \"je\" before a vowel?",
      ["te", "se", "m'", "nous"],
      "C",
    ],
    [
      "What is the correct form: \"Nous ___ à dix heures.\" (se coucher)?",
      ["me couche", "nous couchons", "se couchent", "te couches"],
      "B",
    ],
    [
      "Which sentence correctly uses aller + infinitive?",
      ["Je vais étudier ce soir.", "Je aller étudier ce soir.", "Je vas étudier ce soir.", "Je vais étudie ce soir."],
      "A",
    ],
    [
      "How do you say \"I brush my teeth\"?",
      ["Je me brosse mes dents", "Je me brosse les dents", "Je brosse me les dents", "Il se brosse les dents"],
      "B",
    ],
    [
      "Which form of aller goes with \"ils\"?",
      ["vais", "va", "allons", "vont"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Write six sentences in French describing your routine on a school day. Use at least three different reflexive verbs and give a time for two of them.",
      scheme: [
        "Uses a reflexive verb with the correct pronoun (me / te / se / nous / vous)",
        "Uses three different reflexive verbs in the answer",
        "Gives times for at least two activities",
        "Uses correct verb endings with accents and the article with body parts and clothes",
      ],
      model:
        "Je me réveille à six heures et demie. Je me lève et je me lave. Je m'habille et je me brosse les dents. Je prends le petit déjeuner avec ma famille. Je prends le bus à sept heures. Je me couche à dix heures.",
      answers: [
        [
          "full",
          "[[0|Je me réveille à six heures et quart.]] [[1|Je me lave, je m'habille et je me coiffe.]] Je prends le petit déjeuner avec mon frère. Je vais à l'école en bus. [[2|Les cours commencent à sept heures et demie et finissent à trois heures.]] [[3|Le soir, je me brosse les dents et je me couche à dix heures.]]",
          "Très bien. Your reflexive pronouns match the subject, and you used les dents without a possessive.",
        ],
        [
          "full",
          "Le lundi [[0|je me lève à cinq heures et demie]] parce que j'ai l'entraînement de foot. [[1|Je me lave, je m'habille et je me brosse les dents]] très vite. Ma mère prépare le petit déjeuner. [[2|À six heures et demie, je quitte la maison et à sept heures j'arrive à l'école.]] [[3|Je me couche à dix heures et demie parce que j'ai besoin de dormir.]]",
          "Excellent. Your paragraph flows in order, with a reason with parce que.",
        ],
        [
          "partial",
          "[[0|Je me réveille à six heures.]] [[1|Je me lave et je m'habille.]] Je brosse mes dents. Je vais à l'école à sept heures et demie.",
          "With body parts use the reflexive pronoun and the article: je me brosse les dents. You gave one time; add another.",
        ],
        [
          "partial",
          "Je [[0|me lève]] à six heures. Ma sœur se lave et s'habille. [[2|Les cours commencent à huit heures.]] Je me coucher à dix heures.",
          "You use the reflexive well. Conjugate the last verb: je me couche. Add a third reflexive verb in your own routine, such as je me lave.",
          true,
        ],
        [
          "weak",
          "I wake up at six. I take a shower and get dressed. I go to school. I go to bed at ten.",
          "Please write this in French. Use je me réveille, je me lave, je m'habille and je me couche.",
        ],
        [
          "weak",
          "Je réveille à six et je lave et je habiller, coucher à dix.",
          "Add the reflexive pronoun and conjugate: je me réveille, je me lave, je m'habille, je me couche.",
        ],
      ],
    },
    {
      prompt:
        "Write five sentences about your plans for this weekend and what your friends or family are going to do. Use aller + infinitive at least four times, with at least three different subjects (je, nous, mes amis, ma mère).",
      scheme: [
        "Uses a correct form of aller with je (vais)",
        "Uses a correct form of aller with nous (allons) or ils/elles (vont)",
        "Uses an infinitive after aller correctly each time",
        "Includes a time expression and writes mostly correct accents",
      ],
      model:
        "Samedi matin, je vais dormir tard. Nous allons manger au restaurant. Mes amis vont jouer au foot. Ma mère va faire les courses. Dimanche soir, je vais étudier.",
      answers: [
        [
          "full",
          "Samedi matin [[0|je vais me lever tard]]. L'après-midi [[1|mes amis et moi, nous allons jouer au foot]]. Le soir [[2|ma mère va préparer le dîner et mes frères vont regarder un film]]. Dimanche [[3|je vais étudier pour l'examen]].",
          "Très bien. Your forms of aller match their subjects, and your infinitives are correct.",
        ],
        [
          "full",
          "Ce week-end [[0|je vais aller au cinéma avec ma cousine]]. [[1|Nous allons voir un film d'action.]] [[2|Mes parents vont rester à la maison et vont jouer aux cartes.]] Dimanche matin, [[3|nous allons tous faire une promenade au parc]]. Et toi, qu'est-ce que tu vas faire?",
          "Excellent. The question at the end is natural, and you used four different subjects.",
        ],
        [
          "partial",
          "Samedi [[0|je vais étudier]]. [[1|Mes amis vont jouer au basket.]] Nous allons regarder un film. Ma mère va préparons le dîner.",
          "After a conjugated form of aller use the infinitive: ma mère va préparer le dîner.",
        ],
        [
          "partial",
          "Demain [[0|je vais jouer au foot]]. [[2|Mes parents vont voyager.]] Je va faire mes devoirs. Nous va manger.",
          "Check aller: je vais and nous allons. Your sentences with mes parents and the first je are correct.",
          true,
        ],
        [
          "weak",
          "This weekend I am going to sleep late. My friends are going to play soccer. We are going to eat at a restaurant.",
          "Please write in French: ce week-end, je vais dormir tard. Mes amis vont jouer au foot.",
        ],
        [
          "weak",
          "Je aller dormir. Amis aller foot. Nous aller manger.",
          "Conjugate aller: je vais dormir, mes amis vont jouer au foot, nous allons manger.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Au café et au restaurant, et les articles partitifs",
  note: `
## Objectives

Students will be able to:

1. order food in a café or restaurant and discuss meals and food preferences;
2. use partitive articles to talk about food and drink.

## Materials

A menu from a French café, role-play cards for waiter and customer, picture cards of foods, whiteboards, the worksheet.

## Starter (6 minutes)

Hand students a café menu and ask: "Qu'est-ce que vous voulez manger? Qu'est-ce que vous allez prendre?" Collect answers and write the polite forms: Je voudrais..., Je prends..., Pour moi...

## Main activity

1. Meals and foods: le petit déjeuner, le déjeuner, le dîner; le poulet, le poisson, le riz, les légumes, la salade, le fromage, le pain, l'eau, le jus d'orange, le dessert. Restaurant phrases: Vous désirez? Je voudrais... Pour moi... L'addition, s'il vous plaît. Le service est compris?
2. Partitive articles express "some" or an unspecified amount: du (masculine), de la (feminine), de l' (vowel), des (plural). "Je mange du pain, de la salade, de l'agneau et des légumes." After a negative, the partitive becomes de or d': "Je ne mange pas de viande." Compare with the definite article for likes (j'aime le fromage) and with the indefinite article for a single item (un croissant).
3. Role-play: a waiter and a customer. The customer orders at least three things and answers questions using the partitive.

## Checking for understanding

Whiteboards: fill in du, de la, de l' or des: "Je veux ___ eau." "Elle mange ___ pain." "Il boit ___ limonade."

## Worksheet

Ordering and partitives.
`,
  reading: [
    "Dans un café français",
    `
Eating out is a good place to practice real conversation. In a café or restaurant, the **serveur** or **serveuse** (waiter or waitress) brings the **carte** or **menu** and asks, "Vous désirez?" or "Qu'est-ce que vous prenez?" There are polite ways to order. Instead of the direct "Je veux un croissant," it is nicer to say **"Je voudrais un croissant"** (I would like a croissant), or **"Je prends le poulet"** (I'll have the chicken), or **"Pour moi, la soupe"** (For me, the soup). Later you ask for the bill: **"L'addition, s'il vous plaît."** In France, the service is usually included in the price, so you may ask, **"Le service est compris?"** The meals of the day are **le petit déjeuner** (breakfast), **le déjeuner** (lunch) and **le dîner** (dinner). Typical foods include **le poulet, le poisson, le riz, les légumes, la salade, le fromage, le pain** and, to drink, **l'eau, le jus d'orange, le café, le thé**. For dessert, **le dessert**, there might be **la tarte aux pommes** or **la mousse au chocolat**.

When we talk about an unspecified amount of food or drink, French uses the **partitive article**: **du** (masculine), **de la** (feminine), **de l'** (before a vowel) and **des** (plural). It expresses "some" in English, but French requires it even where English leaves it out: "Je mange **du** pain" (I eat bread), "Elle boit **de la** limonade" (she drinks lemonade), "Nous voulons **de l'**eau" (we want water), "Ils mangent **des** légumes" (they eat vegetables). Compare three kinds of article. The **definite** article is used for general likes: "J'aime **le** fromage." The **indefinite** article is used for one item or a count: "Je prends **un** croissant." The **partitive** is used for an amount: "Je prends **du** fromage." In a **negative** sentence, the partitive and the indefinite articles become **de** or **d'**: "Je ne mange **pas de** viande." "Il n'y a **plus d'**eau."

Here is a short dialogue in a café.

— Bonjour. Vous désirez?
— Je voudrais un jus d'orange, s'il vous plaît. Et pour manger, je prends de la soupe à l'oignon.
— Et pour vous, madame?
— Pour moi, de la salade avec du poulet. Vous avez de la tarte aux pommes?
— Oui, nous en avons. Vous en voulez en dessert?
— Oui, avec de la glace. Et l'addition, s'il vous plaît.
`,
  ],
  cards: [
    ["Je voudrais + item", "I would like + item"],
    ["Pour moi + dish", "For me + dish"],
    ["L'addition, s'il vous plaît.", "The check, please."],
    ["le service est compris", "the tip is included"],
    ["le déjeuner", "lunch"],
    ["du / de la / de l' / des", "some (partitive articles)"],
    ["je ne mange pas de viande", "I do not eat meat"],
    ["la tarte aux pommes", "apple tart"],
  ],
  closed: [
    [
      "Which partitive article goes with \"eau\" (feminine, starts with a vowel)?",
      ["du", "de la", "de l'", "des"],
      "C",
    ],
    [
      "Which is the most polite way to order a croissant?",
      ["Je veux un croissant", "Donne-moi un croissant", "Je voudrais un croissant, s'il vous plaît", "Un croissant maintenant"],
      "C",
    ],
    [
      "Complete: \"Je ne mange pas ___ viande.\"",
      ["de la", "du", "de", "des"],
      "C",
    ],
    [
      "\"Le service est compris?\" asks about:",
      ["The menu", "Whether the tip is included", "The drinks", "The reservation"],
      "B",
    ],
    [
      "Which article is used to say you like something in general (\"I like cheese\")?",
      ["du fromage", "le fromage", "un fromage", "de fromage"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "You are at a café in Paris. Write a dialogue of at least six lines between a waiter and a customer. The customer should order a drink, a main dish and a dessert using a polite form (je voudrais / pour moi / je prends) and ask for the bill.",
      scheme: [
        "The waiter asks what the customer wants to order",
        "The customer uses a polite ordering form (je voudrais, pour moi or je prends)",
        "The customer orders a drink, a main dish and a dessert using food vocabulary correctly",
        "The customer asks for the bill with l'addition, s'il vous plaît",
      ],
      model:
        "— Bonjour. Vous désirez? — Je voudrais un jus d'orange, s'il vous plaît. — Et pour manger? — Pour moi, du poulet avec du riz. — Un dessert? — Oui, de la tarte aux pommes. — Très bien. — L'addition, s'il vous plaît.",
      answers: [
        [
          "full",
          "— Bonjour. [[0|Vous désirez?]] — [[1|Je voudrais une limonade, s'il vous plaît.]] — Et pour manger? — [[2|Pour moi, de la soupe et du poisson. Comme dessert, je prends de la mousse au chocolat.]] — Très bien. Je vous apporte tout de suite. — Merci. [[3|L'addition, s'il vous plaît.]]",
          "Très bien. You used two polite forms and all the parts of the meal.",
        ],
        [
          "full",
          "— Bonjour, bienvenue. [[0|Qu'est-ce que vous prenez?]] — [[1|Je prends de l'eau et pour moi, la soupe à l'oignon.]] — Autre chose? — [[2|Oui, comme dessert, je voudrais de la tarte aux pommes.]] — Parfait. — Merci. [[3|Vous pouvez m'apporter l'addition, s'il vous plaît?]]",
          "Excellent. The way you asked for the bill, vous pouvez m'apporter, is very natural.",
        ],
        [
          "partial",
          "— Qu'est-ce que vous voulez? — [[1|Je voudrais un jus.]] — Et pour manger? — [[2|Pour moi, le poulet avec riz.]] — D'accord. — Je veux la addition.",
          "Use the partitive and the right article: du riz. For the bill, be polite: l'addition, s'il vous plaît. Add a dessert order.",
        ],
        [
          "partial",
          "— [[0|Vous désirez?]] — Je veux des crêpes. — Et pour boire? — [[2|De l'eau et comme dessert de la glace.]] — Merci. [[3|L'addition, s'il vous plaît.]]",
          "Use je voudrais or je prends instead of je veux to be polite. Your ordering is clear and complete.",
          true,
        ],
        [
          "weak",
          "— What would you like? — I would like a juice and a crêpe. — Anything else? — Ice cream. The check, please.",
          "Please write the dialogue in French, with je voudrais, pour moi, and l'addition, s'il vous plaît.",
        ],
        [
          "weak",
          "— Quoi? — Moi vouloir crêpe et jus. — Bon. — Moi payer.",
          "Add polite words: je voudrais une crêpe et un jus. À la fin, dites: l'addition, s'il vous plaît.",
        ],
      ],
    },
    {
      prompt:
        "Complete each sentence with du, de la, de l', des, un, une, le, la, les or de/d' as needed, and give a short reason in English for each of your first three choices: (1) Je mange ___ pain. (2) Elle boit ___ eau. (3) Nous ne mangeons pas ___ viande. (4) Il aime ___ chocolat. Then write one original sentence with a partitive.",
      scheme: [
        "Chooses du for (1) because pain is masculine and the amount is unspecified",
        "Chooses de l' for (2) because eau starts with a vowel",
        "Chooses de for (3) because the partitive becomes de after a negative, and le for (4) because it is a general like",
        "Writes a correct sentence with a partitive article",
      ],
      model:
        "(1) du: pain is masculine and the amount is unspecified. (2) de l': eau begins with a vowel. (3) de: after a negative the partitive becomes de. (4) le: a general like uses the definite article. Je mange de la salade.",
      answers: [
        [
          "full",
          "(1) [[0|du, because pain is masculine and it is an amount.]] (2) [[1|de l', because eau begins with a vowel.]] (3) [[2|de, since after a negative the partitive becomes de, and (4) le, because it's a general like.]] [[3|Je bois du lait le matin.]]",
          "Très bien. Your reasons match each rule, and your extra sentence is correct.",
        ],
        [
          "full",
          "(1) [[0|du: masculine singular, an unspecified amount.]] (2) [[1|de l': the noun starts with a vowel.]] (3) [[2|de: negative sentences drop du, de la and des for de, and (4) le for liking in general.]] [[3|Nous mangeons de la salade à midi.]]",
          "Excellent. A short, precise explanation for each blank.",
        ],
        [
          "partial",
          "(1) [[0|du, because it is masculine.]] (2) de la. (3) du. (4) [[2|le, it is a general like.]] Je mange du pomme.",
          "In (2) eau starts with a vowel: de l'. In (3) the negative changes it to de. Pomme is feminine: de la pomme.",
        ],
        [
          "partial",
          "(1) du. (2) [[1|de l']]. (3) [[2|de]]. (4) le. Je mange la pain.",
          "Add the reasons, in English, for each of your first three choices. Pain is masculine and needs du.",
          true,
        ],
        [
          "weak",
          "(1) le (2) la (3) les (4) un. I eat bread.",
          "The partitive expresses some: du pain, de l'eau. After a negative use de. Write a French sentence.",
        ],
        [
          "weak",
          "All of these use the partitive because the partitive is more formal. Je mange pain.",
          "Only unspecified amounts use the partitive. A general like uses le, la or les. Write je mange du pain.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Les vêtements, les prix et le passé composé avec avoir",
  note: `
## Objectives

Students will be able to:

1. talk about clothes and shopping, including prices, sizes and colors;
2. use the passé composé with avoir to talk about what happened yesterday.

## Materials

Clothing flyers or a French store web page, price tags, picture cards of clothes, a shopping role-play script, a table of past participles, the worksheet.

## Starter (6 minutes)

Show a flyer from a clothing store with prices in euros. Ask in French: "Combien coûte la chemise? De quelle couleur est-elle?" Review colors and numbers up to 1000.

## Main activity

1. Clothes: la chemise, le t-shirt, le pantalon, la jupe, la robe, le manteau, la veste, les chaussures, les bottes, les chaussettes. Colors agree: une chemise rouge, des chaussures noires, une robe blanche (blanc, blanche), verte (vert, verte). Sizes: la taille (petite, moyenne, grande), la pointure (shoes).
2. Shopping dialogue: Je peux vous aider? Je cherche une veste. Combien ça coûte? Ça coûte quarante euros. Vous avez une taille plus grande? Je la prends. Discuss prices in euros and dollars, and les soldes (sales).
3. Passé composé with avoir: avoir (present) + past participle. -er verbs: j'ai parlé; -ir verbs: j'ai fini; -re verbs: j'ai vendu. Irregular participles: fait, pris, eu, vu, bu, lu, écrit. Negative: je n'ai pas mangé. "Hier, j'ai acheté une veste."
4. Role-play in a store, then tell your partner what you bought yesterday.

## Checking for understanding

Whiteboards: put into the passé composé: "Je mange. Tu finis. Il fait ses devoirs."

## Worksheet

Shopping vocabulary and past participles.
`,
  reading: [
    "Faire du shopping et raconter hier",
    `
Going shopping is a useful way to practice many things: clothes, colors, numbers and polite requests. Clothing words in French include **la chemise** (shirt), **le t-shirt**, **le pantalon** (pants), **la jupe** (skirt), **la robe** (dress), **la veste** (jacket), **le manteau** (coat), **les chaussures** (shoes), **les bottes** (boots) and **les chaussettes** (socks). Notice that le pantalon is singular in French, even though "pants" is plural in English. Colors are adjectives and agree with the noun: **une chemise rouge, un manteau rouge, des chaussures noires, une robe blanche, une jupe verte**. Colors that end in **-e**, like rouge and jaune, have just one form for masculine and feminine. Some colors never change, like **orange** and **marron**.

To talk about sizes, use **la taille** for clothes (**petite, moyenne, grande**) and **la pointure** for shoes. A short shopping dialogue in a store goes like this.

— Bonjour. Je peux vous aider?
— Je cherche une veste noire.
— Quelle taille faites-vous?
— Je fais du moyen. Combien coûte celle-ci?
— Elle coûte quarante euros. En ce moment, il y a des soldes et elle coûte trente-cinq euros.
— Je la prends, merci.

For prices, use the verb **coûter**: "Ça coûte quarante euros." "Les chaussures coûtent soixante-cinq euros." The word **soldes** means "sales."

To tell about something that happened yesterday, use the **passé composé**. Most verbs form it with the present tense of **avoir** plus a **past participle**. For -er verbs, the participle ends in -é: **j'ai acheté, tu as parlé, il a mangé**. For -ir verbs, it ends in -i: **nous avons fini**. For -re verbs, it ends in -u: **ils ont vendu**. Many common verbs have irregular participles: **faire → fait, prendre → pris, avoir → eu, voir → vu, boire → bu, lire → lu, écrire → écrit**. In the negative, ne and pas go around the verb avoir: **je n'ai pas acheté**. Use time words like **hier** (yesterday), **hier soir**, **la semaine dernière**, **ce matin**. "Hier, j'ai acheté une veste, j'ai pris le bus et j'ai fait mes devoirs. Je n'ai pas regardé la télé."
`,
  ],
  cards: [
    ["la chemise / la veste", "shirt / jacket"],
    ["le pantalon", "pants"],
    ["les chaussures", "shoes"],
    ["la taille", "the size (clothes)"],
    ["Ça coûte quarante euros.", "It costs forty euros."],
    ["les soldes", "sales"],
    ["j'ai acheté / j'ai fini", "I bought / I finished"],
    ["fait, pris, eu, vu", "irregular participles: done, taken, had, seen"],
  ],
  closed: [
    [
      "Which sentence is correct?",
      ["La jupe est verts.", "La jupe est verte.", "Les jupes est verte.", "La jupe sont verte."],
      "B",
    ],
    [
      "Which is the passé composé of \"je mange\"?",
      ["j'ai mangé", "je suis mangé", "j'ai mange", "je mangeais"],
      "A",
    ],
    [
      "Which is the participle of \"prendre\"?",
      ["prendu", "pris", "prendé", "prenu"],
      "B",
    ],
    [
      "How do you say \"I did not buy a jacket\"?",
      ["Je n'ai acheté pas une veste", "Je n'ai pas acheté de veste", "Je ne pas ai acheté veste", "J'ai pas acheter une veste"],
      "B",
    ],
    [
      "Which word means \"sales\" in a store?",
      ["tailles", "soldes", "couleurs", "prix"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a dialogue of at least six lines between a salesperson and a customer who is looking for a jacket. Include the color, the size, the price (use coûter), and the customer's decision to buy or not.",
      scheme: [
        "The salesperson greets the customer and asks how to help",
        "The customer says what they are looking for with the color and the agreement correct",
        "The size and the price are discussed using taille and coûter with a number",
        "The customer decides, such as je la prends or non, merci",
      ],
      model:
        "— Bonjour. Je peux vous aider? — Je cherche une veste bleue. — Quelle taille faites-vous? — Je fais du moyen. Combien ça coûte? — Elle coûte cinquante euros. — Je la prends, merci.",
      answers: [
        [
          "full",
          "— [[0|Bonjour. Je peux vous aider?]] — [[1|Je cherche une veste noire.]] — Quelle taille faites-vous? — Moyenne. [[2|Combien coûte-t-elle? — Elle coûte quarante-cinq euros.]] — C'est cher. Vous avez des soldes? — Oui, aujourd'hui elle coûte trente-cinq euros. — [[3|Alors je la prends, merci.]]",
          "Très bien. You agreed veste with noire, and you used the pronoun la in je la prends.",
        ],
        [
          "full",
          "— [[0|Bonjour, je peux vous aider?]] — [[1|Oui, je cherche un pantalon vert.]] — Quelle taille? — Petite. [[2|Celui-ci coûte soixante euros.]] — C'est cher, mais je l'aime beaucoup. [[3|Je le prends.]] — Très bien, autre chose?",
          "Excellent. Pantalon is masculine, so you correctly used vert and je le prends.",
        ],
        [
          "partial",
          "— [[0|Bonjour.]] — Je cherche une veste rouge. — Quelle taille? — [[2|Grande. Combien ça coûte?]] — Ça coûte cinquante euros. — Je la prends.",
          "Add the salesperson's offer to help (je peux vous aider?). Veste rouge is correct, and the dialogue is clear.",
        ],
        [
          "partial",
          "— Je peux vous aider? — [[1|Je cherche une veste bleue.]] — Elle coûte quarante euros. — [[3|Non, merci. C'est trop cher.]]",
          "Add the size, such as je fais du moyen. Your decision is clear and polite.",
          true,
        ],
        [
          "weak",
          "— Can I help you? — I am looking for a blue jacket. — It costs forty euros. — I will take it.",
          "Please write in French: je cherche une veste bleue, elle coûte quarante euros, je la prends.",
        ],
        [
          "weak",
          "— Aider? — Moi veux veste bleu. — Coûte 40. — Moi acheter.",
          "Use full sentences: je cherche une veste bleue. Elle coûte quarante euros. Je la prends.",
        ],
      ],
    },
    {
      prompt:
        "Tell what you did yesterday in six sentences using the passé composé with avoir. Use at least three regular verbs, two irregular participles (fait, pris, vu, eu, bu, lu, écrit), and one negative sentence.",
      scheme: [
        "Uses at least three regular passé composé forms correctly (j'ai mangé, j'ai fini, j'ai vendu)",
        "Uses at least two irregular participles correctly",
        "Uses a negative sentence correctly with ne and pas around avoir",
        "Includes a time expression such as hier or hier soir and uses accents correctly",
      ],
      model:
        "Hier, j'ai mangé à la cafétéria. J'ai étudié à la bibliothèque. J'ai fini mes devoirs. J'ai pris le bus et j'ai fait la cuisine. Je n'ai pas regardé la télé.",
      answers: [
        [
          "full",
          "Hier matin, [[0|j'ai mangé des céréales, j'ai pris le bus et j'ai étudié à la bibliothèque]]. [[1|J'ai fait mes devoirs et j'ai vu un film avec ma famille.]] [[2|Je n'ai pas regardé la télé le soir.]] [[3|À dix heures, j'ai fini mon livre et j'ai éteint la lumière.]]",
          "Très bien. Your participles (pris, fait, vu) are correct, and the negative is in the right order.",
        ],
        [
          "full",
          "Hier, [[0|j'ai joué au foot, j'ai mangé une pizza et j'ai acheté un t-shirt]]. [[1|J'ai lu un livre et j'ai écrit un message à mon ami.]] [[2|Je n'ai pas fait mes devoirs de maths.]] [[3|Hier soir, nous avons regardé un match de basket à la télé.]]",
          "Excellent. A good variety of regular and irregular verbs, with hier soir for time.",
        ],
        [
          "partial",
          "[[0|Hier, j'ai mangé une pizza.]] J'ai prendu le bus. [[1|J'ai fait mes devoirs.]] Je n'ai pas regardé pas la télé.",
          "Prendre has an irregular participle: j'ai pris le bus. In the negative say je n'ai pas regardé la télé, with pas only once.",
        ],
        [
          "partial",
          "Hier [[0|j'ai étudié et j'ai mangé à midi]]. [[2|Je n'ai pas joué au foot.]] Je suis vu un film. J'ai fait la cuisine.",
          "Voir uses avoir: j'ai vu un film. Add a time expression such as hier soir.",
          true,
        ],
        [
          "weak",
          "Yesterday I ate pizza, I took the bus and I did my homework. I did not watch TV.",
          "Please write in French: hier, j'ai mangé une pizza, j'ai pris le bus, j'ai fait mes devoirs.",
        ],
        [
          "weak",
          "Hier je manger pizza. Je prendre bus. Je faire devoirs. Pas télé.",
          "Use avoir plus the participle: j'ai mangé, j'ai pris, j'ai fait. In the negative: je n'ai pas regardé la télé.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Le passé composé avec être et les comparaisons",
  note: `
## Objectives

Students will be able to:

1. use the passé composé with être for verbs of movement;
2. make comparisons with plus que, moins que and aussi que.

## Materials

A house diagram labeled with the movement verbs, cards with the verbs that use être, whiteboards, the worksheet.

## Starter (6 minutes)

Act out a short story with movements: enter the room, go up to the board, go down, leave, come back. Ask students in French: "Qu'est-ce que j'ai fait?" Elicit "Vous êtes entré, vous êtes monté..." and note that the helping verb is être.

## Main activity

1. Passé composé with être: être (present) + past participle, with agreement in gender and number. The main verbs of movement and change: aller (allé), venir (venu), arriver, partir, sortir, entrer, rentrer, monter, descendre, naître (né), mourir (mort), rester, tomber, retourner. A memory aid: the "house" verbs. Examples: "Je suis allé au cinéma. Elle est allée au cinéma. Nous sommes arrivés à midi. Elles sont parties tôt."
2. Reflexive verbs also take être: Je me suis levé(e). Contrast with avoir verbs, where there is no agreement: "J'ai mangé" and "Elle a mangé."
3. Comparisons: plus + adjective + que (more than), moins + adjective + que (less than), aussi + adjective + que (as ... as). "Les bottes sont plus chères que les chaussures." "Ce manteau est aussi beau que l'autre." Irregular: bon → meilleur ("Cette pizza est meilleure que l'autre.").
4. Partner activity: ask "Où es-tu allé hier?" and compare two places.

## Checking for understanding

Whiteboards: "Marie (aller) au parc." "Nous (arriver) en retard." Write both in the passé composé.

## Worksheet

Être verbs and comparisons.
`,
  reading: [
    "Où es-tu allé? Plus grand que lui",
    `
Most French verbs form the passé composé with **avoir**, but about seventeen verbs, mostly verbs of movement or change, use **être** instead. They are: **aller** (to go), **venir** (to come), **arriver** (to arrive), **partir** (to leave), **sortir** (to go out), **entrer** (to enter), **rentrer** (to return home), **monter** (to go up), **descendre** (to go down), **naître** (to be born), **mourir** (to die), **rester** (to stay), **tomber** (to fall) and **retourner** (to go back). All reflexive verbs also use être. The past participle of these verbs **agrees** with the subject, as an adjective would: add **-e** for feminine, **-s** for plural. "Il est allé au cinéma." "Elle est allée au cinéma." "Ils sont allés au cinéma." "Elles sont allées au cinéma." With **avoir** verbs the participle does not change: "Elle a mangé." "Elles ont mangé."

Here is a short story in the passé composé. "Hier, Marie **est partie** de la maison à huit heures. Elle **est arrivée** à l'école à huit heures et demie. Elle **est entrée** dans la classe et elle **est restée** assise toute la matinée. À midi, elle **est sortie** pour déjeuner avec ses amis. Après les cours, ils **sont allés** au parc et ils **sont rentrés** à six heures. Elle **s'est couchée** à dix heures." Notice that Marie's participles end in -e because Marie is feminine, and "ils sont allés" has an s for the plural.

To compare two things, use these patterns. For "more than": **plus + adjective + que**. For "less than": **moins + adjective + que**. For "as ... as": **aussi + adjective + que**. "Les bottes sont **plus chères que** les chaussures." "Le t-shirt est **moins cher que** le manteau." "Cette veste est **aussi belle que** l'autre." The adjective agrees with the first noun. The adjective **bon** has a special comparative: **meilleur(e)** (better). "Cette pizza est **meilleure que** l'autre." Notice that we do not say "plus bon." Similarly, the adverb **bien** becomes **mieux**: "Elle chante **mieux que** moi."

In everyday conversation you can ask: "Où es-tu allé hier?" and answer: "Je suis allé au centre commercial. J'ai acheté un t-shirt qui était moins cher que celui de mon frère."
`,
  ],
  cards: [
    ["je suis allé(e)", "I went"],
    ["elle est arrivée", "she arrived"],
    ["ils sont partis", "they left"],
    ["je me suis levé(e)", "I got up"],
    ["plus ... que", "more ... than"],
    ["moins ... que", "less ... than"],
    ["aussi ... que", "as ... as"],
    ["meilleur(e)", "better (for bon)"],
  ],
  closed: [
    [
      "Which sentence correctly says \"She went to the park\"?",
      ["Elle a allée au parc.", "Elle est allée au parc.", "Elle est allé au parc.", "Elle a allé au parc."],
      "B",
    ],
    [
      "Which auxiliary verb does \"arriver\" use in the passé composé?",
      ["avoir", "être", "aller", "faire"],
      "B",
    ],
    [
      "Complete: \"Nous ___ arrivés à midi.\"",
      ["avons", "sommes", "sont", "êtes"],
      "B",
    ],
    [
      "\"Cette veste est aussi belle que l'autre\" means:",
      ["This jacket is prettier than the other", "This jacket is less pretty than the other", "This jacket is as pretty as the other", "This jacket is the prettiest"],
      "C",
    ],
    [
      "How do you say \"better\" for a pizza (feminine)?",
      ["plus bonne", "meilleure", "plus meilleure", "bonnière"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a short story of at least six sentences about where you or a friend went yesterday, using the passé composé with être. Use at least four different être verbs and make the participles agree with the subject.",
      scheme: [
        "Uses at least four different être verbs correctly",
        "Uses the correct form of être for each subject",
        "Makes the past participle agree in gender and number",
        "Includes a place and a time and tells the events in a logical order",
      ],
      model:
        "Hier, Marie est partie de la maison à huit heures. Elle est arrivée à l'école à huit heures et demie. Elle est restée en classe toute la matinée. Après les cours, elle est allée au parc avec ses amis. Ils sont rentrés à six heures.",
      answers: [
        [
          "full",
          "Hier, ma sœur [[0|est partie de la maison à sept heures et est arrivée au lycée à sept heures et demie]]. Elle [[1|est entrée dans la classe]] et elle [[2|est restée toute la matinée]]. Après l'école, mes amis et moi, [[3|nous sommes allés au centre commercial et nous sommes rentrés à six heures]].",
          "Très bien. Partie and arrivée take -e for ma sœur, and allés takes -s for nous (a group of boys).",
        ],
        [
          "full",
          "Samedi dernier, [[0|je suis allée à Cleveland avec ma cousine]]. Nous [[1|sommes parties à neuf heures]] et nous [[2|sommes arrivées à onze heures]]. [[3|Ensuite, nous sommes entrées dans un musée, nous sommes montées au troisième étage et nous sommes sorties à deux heures.]] Je suis rentrée très fatiguée.",
          "Excellent. Allée, parties, arrivées: you made every participle agree with a feminine subject.",
        ],
        [
          "partial",
          "Hier, [[0|je suis allé au parc]] avec Léa. Elle est arrivé à dix heures. Nous [[2|sommes restés deux heures]] et nous sommes rentré à midi.",
          "Léa is feminine: elle est arrivée. With nous (a plural subject) write rentrés. You used être well.",
        ],
        [
          "partial",
          "Hier mes parents [[0|sont allés au restaurant]]. Ils [[1|sont arrivés à huit heures]]. Ils ont rentré à dix heures. Ma mère est tombé.",
          "Rentrer uses être: ils sont rentrés. Ma mère is feminine: elle est tombée.",
          true,
        ],
        [
          "weak",
          "Yesterday I went to the park with my friend. We arrived at ten and we stayed two hours.",
          "Please write in French: hier, je suis allé au parc avec mon ami. Nous sommes arrivés à dix heures.",
        ],
        [
          "weak",
          "Hier je aller parc. Nous arriver dix heures. Nous rester deux heures.",
          "Use être plus the participle: je suis allé, nous sommes arrivés, nous sommes restés.",
        ],
      ],
    },
    {
      prompt:
        "Write four sentences in French comparing two things: two items of clothing and their prices (plus que or moins que), two similar things (aussi que), and a food or place using meilleur.",
      scheme: [
        "Uses plus ... que (or moins ... que) correctly with agreement",
        "Uses aussi ... que correctly",
        "Uses meilleur(e) correctly with the right gender",
        "Writes complete sentences with accents and correct agreement of adjectives",
      ],
      model:
        "Les bottes sont plus chères que les chaussures. La veste est aussi belle que le manteau. Cette pizza est meilleure que l'autre. Mon frère est moins grand que moi.",
      answers: [
        [
          "full",
          "[[0|Le manteau est plus cher que la veste.]] [[1|Les chaussettes sont aussi bon marché que les t-shirts.]] [[2|Cette tarte est meilleure que le gâteau.]] [[3|Mon frère est moins grand que mon père et ma sœur est aussi grande que moi.]]",
          "Très bien. Every adjective agrees with its noun: cher with manteau, meilleure with tarte.",
        ],
        [
          "full",
          "[[0|Les bottes sont moins confortables que les baskets.]] [[1|Cette jupe est aussi jolie que cette robe.]] [[2|Mon père est meilleur cuisinier que ma mère.]] [[3|Les chaussures noires sont plus chères que les chaussures blanches.]]",
          "Excellent. Using meilleur without plus is exactly right.",
        ],
        [
          "partial",
          "[[0|La chemise est plus chère que la jupe.]] [[1|Le pantalon est aussi beau que la robe.]] Cette pizza est plus bonne que l'autre.",
          "Do not use plus with bon: cette pizza est meilleure que l'autre. Also check beau and robe: aussi belle que la robe.",
        ],
        [
          "partial",
          "[[0|Les chaussures sont plus chers que les bottes.]] Ce gâteau est meilleur que la tarte. [[1|La veste est aussi cher que le manteau.]]",
          "Adjectives agree with the first noun: les chaussures sont plus chères, la veste est aussi chère. Gâteau is masculine, so meilleur is right.",
          true,
        ],
        [
          "weak",
          "The boots are more expensive than the shoes. The shirt is as cheap as the skirt. My brother is younger than me.",
          "Please write in French. For example: les bottes sont plus chères que les chaussures.",
        ],
        [
          "weak",
          "Bottes plus cher chaussures. Chemise aussi bon marché jupe. Frère moins grand.",
          "Use que and agreement: les bottes sont plus chères que les chaussures. La chemise est aussi bon marché que la jupe.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Une journée typique, la recette et un plat traditionnel",
  note: `
## Objectives

Students will be able to:

1. understand a short recording or text about a typical day;
2. read a menu and recipe and understand the quantities and steps;
3. present a short talk about a traditional dish and where it comes from.

## Materials

A short audio or script about a typical day in Dakar, a menu and a recipe for crêpes, measuring spoons, photos of ratatouille, thieboudienne and poutine, the quiz.

## Starter (6 minutes)

Play the first minute of a short audio about a typical day. Ask students to listen for times and activities and write three words they understand. Check for cognates.

## Main activity

1. Interpretive listening and reading: use the context, cognates and verbs in order to get the sequence of the day. Answer comprehension questions in French and English.
2. Menus and recipes: read a menu for entrées, plats principaux, boissons, desserts and prix. Read a recipe for crêpes: ingrédients (250 grammes de farine, 3 œufs, un demi-litre de lait, une pincée de sel, une cuillère à soupe de sucre), quantities with de (une tasse de lait), and steps with the vous command: mélangez, ajoutez, versez, faites cuire.
3. Present a dish: "Le plat s'appelle la ratatouille. Il vient de Provence. On met des légumes: aubergines, courgettes, tomates. On le mange en été. C'est délicieux."
4. Practice a 40-second talk with notes.

## Checking for understanding

Ask: "Combien d'œufs faut-il? Qu'est-ce qu'on fait d'abord?"

## Quiz

A recipe reading and a talk plan.
`,
  reading: [
    "Une recette et un plat traditionnel",
    `
Reading a recipe in French is a good exercise in understanding instructions and quantities. A recipe is called **une recette** and begins with a list of **ingrédients**. Amounts are given with units such as **une tasse de** (a cup of), **une cuillère à soupe de** (a tablespoon of), **une pincée de** (a pinch of), **un demi-litre de** (half a liter of), or in grams (**grammes**), because France uses the metric system. After a quantity, French uses **de** with no article: "une tasse **de** lait," "deux cents grammes **de** farine." Here is a recipe for crêpes.

**Les crêpes**

Ingrédients: 250 grammes de farine, trois œufs, un demi-litre de lait, une pincée de sel, une cuillère à soupe de sucre, un peu de beurre.

Préparation:
1. Mettez la farine dans un grand bol.
2. Faites un trou au milieu et ajoutez les œufs.
3. Versez le lait petit à petit et mélangez bien.
4. Ajoutez le sel et le sucre.
5. Laissez reposer la pâte une heure.
6. Faites chauffer une poêle avec un peu de beurre et faites cuire les crêpes deux minutes de chaque côté.

The verbs in the steps are in the **command form** with **vous**: mettez, faites, ajoutez, versez, mélangez, laissez. You do not need to know yet how to form them, only to recognize them as instructions. Key words that show order are **d'abord**, **ensuite**, **après** and **enfin**.

A menu works similarly. You find **entrées** (starters), **plats principaux** (main dishes), **boissons** (drinks), **desserts** and prices. A line may say: "Poulet rôti avec frites — 14 €." You can use cognates and food words to guess: **poulet** is chicken, and **frites** are fries.

When you listen to or read about a typical day, pay attention to time words and the order of events. A student from Dakar, in Senegal, might say: "Je me lève à six heures. Je prends le petit déjeuner avec du pain et du café. Je vais à l'école en bus. Les cours finissent à deux heures et je rentre déjeuner avec ma famille. Le déjeuner, c'est le repas principal."

To present a traditional dish, say its name, where it comes from, what is in it, and when it is eaten. **La ratatouille** is from Provence, in the south of France, a stew of aubergines, courgettes, tomatoes and peppers, eaten in summer. **Le thieboudienne** is the national dish of Senegal, rice cooked with fish and vegetables, shared from a large bowl. **La poutine** is from Québec: French fries with cheese curds and gravy.
`,
  ],
  cards: [
    ["la recette", "recipe"],
    ["les ingrédients", "ingredients"],
    ["une cuillère à soupe de", "a tablespoon of"],
    ["mélangez / ajoutez / versez", "mix / add / pour (commands)"],
    ["le plat principal", "main dish"],
    ["la poutine", "fries with cheese curds and gravy, from Québec"],
    ["la ratatouille", "vegetable stew from Provence"],
    ["Il faut trois œufs.", "You need three eggs."],
  ],
  closed: [
    [
      "In the crêpe recipe, how many eggs do you need?",
      ["One", "Two", "Three", "Four"],
      "C",
    ],
    [
      "What does \"Ajoutez le sel\" instruct you to do?",
      ["Remove the salt", "Add the salt", "Taste the salt", "Buy the salt"],
      "B",
    ],
    [
      "Which dish is the national dish of Senegal?",
      ["Poutine", "Thieboudienne", "Ratatouille", "Crêpes"],
      "B",
    ],
    [
      "On a menu, \"boissons\" are:",
      ["Desserts", "Drinks", "Starters", "Main dishes"],
      "B",
    ],
    [
      "How do you say \"a cup of milk\"?",
      ["une tasse du lait", "une tasse de lait", "une tasse le lait", "une tasse des lait"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Read this paragraph and answer in English, then in French: \"Je me lève à six heures. Je prends mon petit déjeuner avec du pain et du café. Je vais à l'école en bus et j'arrive à sept heures et demie. À midi, je déjeune avec mes amis à la cantine. Après l'école, je joue au foot et le soir je fais mes devoirs.\" (a) What time does the student get up? (b) What does the student eat for breakfast? (c) Write one question in French you could ask this student.",
      scheme: [
        "States that the student gets up at 6:00",
        "States that the student eats bread and coffee for breakfast",
        "Mentions a further detail, such as lunch at the cafeteria or soccer after school",
        "Writes a correct question in French about the routine",
      ],
      model:
        "(a) The student gets up at six. (b) The student has bread and coffee for breakfast. The student also has lunch at the cafeteria with friends and plays soccer after school. (c) À quelle heure tu fais tes devoirs?",
      answers: [
        [
          "full",
          "(a) [[0|The student gets up at 6:00.]] (b) [[1|Bread and coffee for breakfast.]] [[2|The student has lunch at the cafeteria and plays soccer after school.]] (c) [[3|À quelle heure tu joues au foot?]]",
          "Très bien. Your question uses à quelle heure correctly and is on topic.",
        ],
        [
          "full",
          "(a) The student gets up at six in the morning. (b) [[1|He or she eats bread and drinks coffee.]] [[0|The student gets up at six.]] The student takes the bus and [[2|has lunch with friends]]. (c) [[3|Avec qui tu déjeunes?]]",
          "Excellent. Your question uses avec qui, which makes the conversation continue.",
        ],
        [
          "partial",
          "(a) [[0|Six o'clock.]] (b) The student has cereal. (c) Qu'est-ce que tu fais?",
          "The breakfast is bread and coffee, not cereal. Your question should be more specific.",
        ],
        [
          "partial",
          "(a) The student gets up at seven. (b) [[1|Bread and coffee.]] (c) [[3|À quelle heure tu prends le petit déjeuner?]]",
          "The student gets up at six and arrives at school at seven thirty. Your breakfast answer and your question are good.",
          true,
        ],
        [
          "weak",
          "I do not understand. It is about school. (c) Salut.",
          "Look for time words: à six heures, à midi, le soir. Write a question such as à quelle heure tu dînes?",
        ],
        [
          "weak",
          "(a) At 12. (b) Soccer. (c) Où école?",
          "Se lever is at six, and the breakfast is bread and coffee. A complete question is où est ton école?",
        ],
      ],
    },
    {
      prompt:
        "Prepare a 30-second talk in French about a traditional dish (from the reading or your family). Write your notes as full sentences: the name, where it comes from, three ingredients, when it is eaten, and your opinion.",
      scheme: [
        "Names the dish and where it comes from with le plat s'appelle and il vient de",
        "Lists at least three ingredients with on met or les ingrédients sont",
        "Says when the dish is eaten or what occasion it belongs to",
        "Gives an opinion with a reason",
      ],
      model:
        "Le plat s'appelle la ratatouille. Il vient de Provence. On met des aubergines, des courgettes et des tomates. On le mange en été. J'aime ce plat parce qu'il est frais et délicieux.",
      answers: [
        [
          "full",
          "[[0|Le plat s'appelle le thieboudienne. Il vient du Sénégal.]] [[1|On met du riz, du poisson et des légumes.]] [[2|On le mange le dimanche avec toute la famille, dans un grand plat.]] [[3|J'aime ce plat parce qu'on le partage avec les autres.]]",
          "Très bien. Your talk has all four parts in a clear order.",
        ],
        [
          "full",
          "[[0|Mon plat préféré s'appelle la poutine. Il vient du Québec.]] [[1|Les ingrédients sont des frites, du fromage et de la sauce.]] [[2|On le mange en hiver, quand il fait très froid.]] [[3|J'aime la poutine parce qu'elle est chaude et délicieuse.]]",
          "Excellent. Linking the dish to the season makes a presentation more interesting.",
        ],
        [
          "partial",
          "[[0|Le plat s'appelle la ratatouille. Il vient de Provence.]] On met aubergines et tomates. On le mange en été. J'aime parce que bon.",
          "Add a third ingredient with the articles (des aubergines, des tomates) and say parce que c'est bon.",
        ],
        [
          "partial",
          "[[1|La poutine contient des frites, du fromage et de la sauce.]] [[3|J'aime ça parce que c'est délicieux.]] Le plat vient du Québec.",
          "Say le plat s'appelle la poutine and when it is eaten. Your ingredients and opinion are well written.",
          true,
        ],
        [
          "weak",
          "The dish is called poutine. It is from Québec. It has fries, cheese and gravy. I like it.",
          "Please write your notes in French: le plat s'appelle la poutine. Il vient du Québec.",
        ],
        [
          "weak",
          "Plat poutine. Québec. Frites fromage. Moi manger hiver. Bon.",
          "Use complete sentences: le plat s'appelle la poutine, il vient du Québec, on met des frites et du fromage.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Mon week-end et les repas en France, au Sénégal et aux États-Unis",
  note: `
## Objectives

Students will be able to:

1. write a paragraph about their last weekend;
2. compare mealtimes and eating customs in France, Senegal and the United States.

## Materials

A model weekend paragraph in the passé composé, a table of mealtimes, photos of a French family lunch and a Senegalese shared bowl, a writing rubric, the problem set.

## Starter (6 minutes)

Ask in French: "Qu'est-ce que tu as fait le week-end dernier?" Take short answers and write the verbs on the board. Sort them into avoir verbs and être verbs.

## Main activity

1. Writing: model paragraph about a weekend with samedi matin, l'après-midi, le soir, dimanche. Use connectors: d'abord, ensuite, puis, après, enfin. Combine avoir and être verbs and add a feeling or evaluation: C'était amusant.
2. Students write their paragraph of 8 to 10 sentences, then exchange with a partner for feedback on agreement of être participles.
3. Mealtimes and customs: France (petit déjeuner light, déjeuner 12:00 to 2:00, dîner 7:30 to 8:30, meals eaten at the table, bread with meals); Senegal (thieboudienne from a shared bowl at lunch, eating with the right hand or a spoon, the value of teranga, hospitality); United States (lunch around noon, dinner about 6:00, snacks).
4. Venn diagram, then write three sentences comparing.

## Checking for understanding

Ask: "À quelle heure dîne-t-on en France? Et chez toi?"

## Problem set

A weekend paragraph and a comparison.
`,
  reading: [
    "Un week-end bien rempli, et à table dans le monde francophone",
    `
To tell about a weekend in French, use the **passé composé** and organize your sentences in time order. Begin with a time expression: **samedi matin** (Saturday morning), **samedi après-midi**, **samedi soir**, **dimanche**. Link the actions with **d'abord** (first), **ensuite** and **puis** (then), **après** (afterward) and **enfin** (finally). Remember the two helping verbs: most verbs use **avoir** ("j'ai mangé, nous avons joué"), but verbs of movement and change, and reflexive verbs, use **être**, with the participle agreeing with the subject ("je suis allée, elles sont parties, nous nous sommes levés"). To give your opinion in the past, use the imperfect of être: **C'était** amusant (it was fun), **c'était** ennuyeux (it was boring). Read this model.

"Samedi dernier, d'abord, je me suis levée à neuf heures. Ensuite, j'ai pris le petit déjeuner avec ma famille. L'après-midi, mes amies et moi, nous sommes allées au centre commercial. J'ai acheté un pull bleu et mes amies ont acheté des chaussures. Puis nous avons mangé une glace. Le soir, j'ai regardé un film à la maison. Dimanche, je suis restée à la maison et j'ai fait mes devoirs. C'était un week-end amusant!"

Meals are a window into culture. In **France**, the day usually begins with a light **petit déjeuner**, such as a tartine with butter and coffee, tea or hot chocolate. The **déjeuner** is the main meal at midday, usually between 12:00 and 2:00, and in many schools, students have a hot lunch at the cantine with several courses. The **dîner** is eaten around 7:30 to 8:30 in the evening at the table with the family, with bread, and often cheese and fruit at the end. Many families do not eat snacks between meals, except for the **goûter**, a snack for children at about 4:30 after school. In **Senegal**, the main midday meal is often **thieboudienne**, a dish of rice, fish and vegetables, served in one large bowl in the middle. People sit around the bowl on the floor or low seats and eat from the part in front of them, using the right hand or a spoon. Hospitality, called **teranga**, is an important value: guests are always invited to share the meal. In the **United States**, lunch is usually at around noon, often shorter and eaten at school or work, and dinner at about 6:00 is the main meal for many families, with snacks between meals.

These are general customs. They differ by region, family and situation, and many people mix traditions. The best way to be respectful when you are a guest is to watch what others do and to ask politely if you are unsure.
`,
  ],
  cards: [
    ["samedi dernier", "last Saturday"],
    ["d'abord / ensuite / puis", "first / then / then"],
    ["enfin", "finally"],
    ["C'était amusant.", "It was fun."],
    ["le petit déjeuner", "breakfast"],
    ["le goûter", "afternoon snack"],
    ["la teranga", "Senegalese hospitality"],
    ["le thieboudienne", "rice with fish and vegetables, national dish of Senegal"],
  ],
  closed: [
    [
      "Which sentence correctly says \"On Saturday we went to the park\"?",
      ["Samedi, nous sommes allé au parc.", "Samedi, nous sommes allés au parc.", "Samedi, nous avons allés au parc.", "Samedi, nous sommes aller au parc."],
      "B",
    ],
    [
      "In France, when is the déjeuner usually eaten?",
      ["Around 7:00 in the morning", "Between 12:00 and 2:00", "At 6:00 in the evening", "At midnight"],
      "B",
    ],
    [
      "What is the Senegalese value of hospitality called?",
      ["La bise", "La teranga", "Le goûter", "La poutine"],
      "B",
    ],
    [
      "Which word means \"finally\" in a sequence?",
      ["d'abord", "ensuite", "enfin", "puis"],
      "C",
    ],
    [
      "How do you say \"It was boring\"?",
      ["C'est ennuyeux", "C'était ennuyeux", "J'ai ennuyé", "Il fut ennuyeux"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a paragraph of at least eight sentences in French about your last weekend (real or invented). Use the passé composé with both avoir and être verbs, at least three connectors (d'abord, ensuite, puis, enfin), and give your opinion with c'était.",
      scheme: [
        "Uses at least three correct passé composé forms with avoir",
        "Uses at least two correct passé composé forms with être, with agreement",
        "Uses at least three connectors to order events",
        "Gives an opinion with c'était and writes mostly correct accents",
      ],
      model:
        "Samedi dernier, d'abord, je me suis levée à neuf heures. Ensuite, j'ai mangé avec ma famille. L'après-midi, mes amis et moi, nous sommes allés au parc et nous avons joué au foot. Puis nous avons mangé une glace. Enfin, je suis rentrée à six heures. C'était un week-end amusant.",
      answers: [
        [
          "full",
          "Samedi dernier, d'abord, [[0|j'ai pris le petit déjeuner et j'ai fait mes devoirs]]. Ensuite, [[1|mes amies et moi, nous sommes allées au centre commercial et nous sommes rentrées à quatre heures]]. Puis [[2|nous avons mangé une pizza et nous avons regardé un film]]. Enfin, [[3|je me suis couchée tard. C'était un week-end amusant!]]",
          "Très bien. Allées and rentrées agree with a feminine plural subject, and your connectors give a clear order.",
        ],
        [
          "full",
          "Vendredi soir, [[0|j'ai joué au basket avec mon équipe]]. Samedi, d'abord, [[1|je suis allé chez mon cousin et nous sommes restés à la maison toute la matinée]]. Ensuite, [[2|nous avons préparé des crêpes et nous avons mangé avec mes oncles]]. Enfin, dimanche, j'ai étudié. [[3|C'était un bon week-end, mais c'était trop court.]]",
          "Excellent. A good variety of avoir and être verbs, with a thoughtful opinion at the end.",
        ],
        [
          "partial",
          "Samedi, [[0|j'ai mangé avec mes amis]]. Ensuite, je suis allé au cinéma avec Léa. Elle est arrivé en retard. Nous avons regardé un film. [[3|C'était amusant.]]",
          "Léa is feminine: elle est arrivée. You used être and avoir verbs well; add one more connector such as puis or enfin.",
        ],
        [
          "partial",
          "D'abord, [[0|j'ai joué au foot]]. Puis je suis alle au parc. Après, j'ai restée à la maison. [[3|C'était bien.]]",
          "Aller is allé with an accent. Rester takes être: je suis resté. Add details about what you did.",
          true,
        ],
        [
          "weak",
          "Last weekend I went to the mall with my friends. We ate pizza and watched a movie. It was fun.",
          "Please write in French: le week-end dernier, je suis allé au centre commercial. Nous avons mangé une pizza.",
        ],
        [
          "weak",
          "Week-end je aller centre commercial. Nous manger pizza. Regarder film. Amusant.",
          "Use the passé composé: je suis allé, nous avons mangé, nous avons regardé. Say c'était amusant.",
        ],
      ],
    },
    {
      prompt:
        "Compare mealtimes and eating customs in France, Senegal and the United States. Write a short paragraph in English with at least three specific facts (times or customs) and explain one reason that customs differ.",
      scheme: [
        "Gives a fact about France, such as lunch between 12:00 and 2:00 or a dinner at the table with bread",
        "Gives a fact about Senegal, such as sharing a large bowl of thieboudienne and teranga",
        "Gives a fact about the United States, such as a shorter lunch around noon and dinner at about 6:00",
        "Explains one reason for the differences, such as tradition, climate or work and school schedules",
      ],
      model:
        "In France lunch is the main meal, between 12:00 and 2:00, and dinner is eaten at the table about 8:00. In Senegal the midday meal is often eaten from a shared bowl and hospitality, teranga, is important. In the US lunch is around noon and often short, and dinner at about 6:00 is the main meal. Customs differ because of tradition and work and school schedules.",
      answers: [
        [
          "full",
          "[[0|In France, lunch is the main meal between 12:00 and 2:00, and dinner is at the table at about 8:00, with bread.]] [[1|In Senegal, people share a large bowl of thieboudienne at lunch, and teranga, hospitality, is a key value.]] [[2|In the US, lunch is usually short around noon, and dinner at 6:00 is the main family meal.]] [[3|The differences come from traditions and work and school schedules in each place.]]",
          "Excellent. Each country has a specific custom, and you gave a reasonable cause.",
        ],
        [
          "full",
          "[[0|France has a hot lunch at school, dinner at 7:30 to 8:30 and a goûter for children in the afternoon.]] [[1|In Senegal, the bowl is shared, people eat with the right hand or a spoon, and a guest is always invited.]] [[2|Americans eat dinner early, about 6:00, and often have snacks between meals.]] [[3|Climate, history and the length of the workday all affect when and how people eat.]]",
          "Très bien. The goûter is a good cultural detail.",
        ],
        [
          "partial",
          "[[0|In France people eat lunch between 12:00 and 2:00.]] [[2|In the US we eat dinner at 6:00.]] People in Senegal eat the same as us.",
          "Senegal differs: meals are often shared from one bowl and hospitality is a value. Add a reason for the differences.",
        ],
        [
          "partial",
          "[[1|In Senegal they share a bowl.]] [[3|The differences are due to traditions.]] France eats breakfast at noon.",
          "The French eat a light breakfast in the morning, a main meal at midday and dinner in the evening.",
          true,
        ],
        [
          "weak",
          "People in France, Senegal and the US eat at the same times because everyone gets hungry at the same time.",
          "Mealtimes and customs differ in the three places. Look for the times and customs in each country.",
        ],
        [
          "weak",
          "[[2|In the US dinner is at 6:00.]] In France they don't eat dinner, and in Senegal they only eat rice.",
          "The French do eat dinner, at about 8:00. Senegalese meals include rice, fish and vegetables.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Les marchés, les aliments et la nutrition",
  note: `
## Objectives

Students will be able to:

1. describe the food and markets of a French-speaking region;
2. use French to learn about nutrition or geography from a French-language source.

## Materials

Photos of a Provençal market, the Marché Sandaga in Dakar and a sugar shack in Québec, a short French-language article on eating well, a map of Africa and Canada, the worksheet.

## Starter (6 minutes)

Show a photo of a French outdoor market with colorful fruit stalls. Ask in English: "What do you notice? What would you buy?" Elicit foods: tomates, melons, fromages, olives, lavande.

## Main activity

1. Regions and foods: Provence (olives, lavande, tomates, herbes de Provence, le marché du samedi); Dakar (le marché Sandaga with fish, mangues, bissap, épices); Québec (le sirop d'érable, la cabane à sucre in March, la poutine, les tourtières). Describe a market: il y a des étals de fruits et de légumes; les marchands crient les prix.
2. Nutrition vocabulary: manger équilibré, les protéines, les glucides, les lipides, les vitamines, l'eau. "Il faut manger cinq fruits et légumes par jour." "On doit boire de l'eau."
3. Read a short article in French about eating well. Find five cognates, the main idea and two recommendations.
4. Plan a French-language search: find a geography fact about a country using a French web page.

## Checking for understanding

Ask: "Qu'est-ce qu'on vend au marché de Dakar? Qu'est-ce qu'il faut manger chaque jour?"

## Worksheet

A market description and an article reading.
`,
  reading: [
    "Marchés, régions et manger équilibré",
    `
Markets, or **marchés**, are central to everyday life in many French-speaking places. Instead of shopping only at supermarkets, many people buy food at open markets with dozens of **étals** (stalls), where vendors, called **marchands**, sell fruits, vegetables, meat, fish, cheese, spices and flowers. Vendors often call out their prices, and customers greet them and chat. Each region has its own ingredients and flavors.

In **Provence**, in the south of France, the Saturday market sells tomatoes, melons, olives, goat cheese, bundles of lavender and **herbes de Provence**, a mixture of thyme, rosemary and oregano. The sun and dry summers shape the food: olive oil, garlic and tomatoes appear in many dishes, such as ratatouille. In **Dakar**, Senegal, the **marché Sandaga** is crowded and loud, with stalls of fresh fish, mangoes, peanuts, spices, colorful cloth and **bissap**, a drink made from hibiscus flowers. In **Québec**, Canada, the tradition of the **cabane à sucre** (sugar shack) takes place in March, when sap runs in the maple trees. Families gather to eat pancakes, ham and baked beans with **sirop d'érable** (maple syrup) and taste warm syrup poured on the snow. Québec is the biggest producer of maple syrup in the world. In each place, local geography and climate shape the food: sea, sun or cold forests.

Talking about food also means talking about health. A **repas équilibré** (balanced meal) includes **protéines** (meat, fish, eggs, beans), **glucides** (bread, rice, pasta, potatoes), **lipides** (oils, nuts) and **vitamines et minéraux** (fruits and vegetables). The French health authorities have a well-known slogan: **"Pour votre santé, mangez au moins cinq fruits et légumes par jour."** The expression **il faut** + infinitive means "one must," and **on doit** + infinitive means "one should." "Il faut manger des légumes tous les jours." "On doit boire de l'eau." "Il ne faut pas manger trop de sucre." Cognates make it easy to read health information: **protéines, vitamines, minéraux, énergie, calories**.

When you read a French article, do not translate every word. Find the cognates, the title and the first sentence for the main idea, and use pictures. Then look for the recommendations. You can use the same strategy to learn geography in French. A web page about Senegal might tell you that the capital is Dakar, that the country is on the west coast of Africa, that its official language is French, and that the Sénégal River forms part of its northern border.
`,
  ],
  cards: [
    ["le marché", "the market"],
    ["l'étal", "market stall"],
    ["le marchand", "the vendor"],
    ["le sirop d'érable", "maple syrup"],
    ["manger équilibré", "to eat a balanced diet"],
    ["les protéines", "proteins"],
    ["il faut + infinitive", "one must + verb"],
    ["on doit + infinitive", "one should + verb"],
  ],
  closed: [
    [
      "Which food is a specialty of Québec in March?",
      ["Bissap", "Maple syrup at the cabane à sucre", "Herbes de Provence", "Mangoes"],
      "B",
    ],
    [
      "\"Il faut manger cinq fruits et légumes par jour\" means:",
      ["You ate five fruits and vegetables", "One must eat five fruits and vegetables a day", "You like fruits and vegetables", "Five vegetables are on sale"],
      "B",
    ],
    [
      "Which market is in Dakar, Senegal?",
      ["La Boquería", "Le marché Sandaga", "Le marché de Provence", "Le marché Jean-Talon"],
      "B",
    ],
    [
      "Which of these is a cognate that helps you read a health article?",
      ["étal", "vitamines", "marchand", "cabane"],
      "B",
    ],
    [
      "Bissap is a drink made from:",
      ["Maple sap", "Hibiscus flowers", "Lavender", "Olives"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe a market in a French-speaking region in five sentences in French. Name the region, say what the market sells (at least three things) and say whether you would like to shop there and why.",
      scheme: [
        "Names the market and region or country",
        "Names at least three things sold using il y a or on vend",
        "Describes the market using an adjective that agrees or a sentence about the vendors",
        "Gives an opinion with je voudrais or j'aime and a reason",
      ],
      model:
        "Le marché de Provence est dans le sud de la France. Il y a des étals de tomates, de melons et de fromages. Les marchands sont sympas et ils parlent beaucoup. Je voudrais acheter des olives parce qu'elles sont délicieuses.",
      answers: [
        [
          "full",
          "[[0|Le marché Sandaga est à Dakar, au Sénégal.]] [[1|Il y a des étals de poisson frais, de mangues, d'épices et de tissus.]] [[2|Les marchands sont très gentils et le marché est grand et coloré.]] [[3|Je voudrais y aller parce que j'aime les mangues et les épices.]]",
          "Très bien. Your adjectives agree: grand, coloré, gentils.",
        ],
        [
          "full",
          "[[0|En Provence, il y a un marché très célèbre le samedi.]] [[1|On vend des tomates, des olives, du fromage de chèvre et de la lavande.]] [[2|Les marchands crient les prix et les clients bavardent avec eux.]] [[3|J'aime ce marché parce qu'il est très authentique.]]",
          "Excellent. You wrote in the present with different verbs, and the details feel real.",
        ],
        [
          "partial",
          "[[0|Le marché de Provence est en France.]] [[1|Il y a des tomates, des olives et du fromage.]] Les marchands sont gentil. Je voudrais aller parce que joli.",
          "Marchands is plural, so write gentils. After parce que add c'est: parce que c'est joli.",
        ],
        [
          "partial",
          "[[1|Au marché il y a des fruits, des légumes et du fromage.]] [[3|J'aime acheter là-bas.]] Le marché est en France.",
          "Name the city or region, and say why you like it, using parce que.",
          true,
        ],
        [
          "weak",
          "The market in Provence sells tomatoes, olives and cheese. I would like to go.",
          "Please write in French: au marché il y a des tomates, des olives et du fromage. Je voudrais y aller.",
        ],
        [
          "weak",
          "Marché Provence. Tomate olive fromage. Moi aimer beaucoup.",
          "Use full sentences: le marché de Provence vend des tomates. J'aime beaucoup ce marché.",
        ],
      ],
    },
    {
      prompt:
        "Read: \"Un repas équilibré comprend des fruits, des légumes, des protéines et des glucides. Il faut boire de l'eau tous les jours. On ne doit pas manger trop de sucre parce que c'est mauvais pour les dents.\" Answer in English: (a) What does a balanced meal include? (b) What advice is given about water and sugar? Then write two recommendations of your own in French using il faut or on doit.",
      scheme: [
        "States that a balanced meal includes fruits, vegetables, proteins and carbohydrates",
        "States that one must drink water every day",
        "States that one should not eat too much sugar because it is bad for the teeth",
        "Writes two correct recommendations in French with il faut or on doit plus an infinitive",
      ],
      model:
        "(a) A balanced meal includes fruits, vegetables, proteins and carbohydrates. (b) You must drink water every day, and you should not eat too much sugar because it is bad for your teeth. Il faut manger des fruits. On doit dormir huit heures.",
      answers: [
        [
          "full",
          "(a) [[0|A balanced meal includes fruit, vegetables, protein and carbohydrates.]] (b) [[1|You have to drink water every day.]] [[2|You should not eat too much sugar because it is bad for your teeth.]] [[3|Il faut manger des légumes. On doit faire du sport.]]",
          "Très bien. Your French recommendations use both structures correctly.",
        ],
        [
          "full",
          "(a) [[0|Fruits, vegetables, proteins and carbohydrates.]] (b) [[1|Drink water every day.]] [[2|Don't eat too much sugar, which is bad for teeth.]] [[3|Il faut boire moins de soda. On doit marcher chaque jour.]]",
          "Excellent. Using moins de with soda gives practical advice.",
        ],
        [
          "partial",
          "(a) [[0|A balanced meal has fruit and vegetables and protein.]] (b) [[1|You must drink water.]] Do not eat sweets. Il faut manger des fruits. On doit manges bien.",
          "After on doit use the infinitive: on doit manger bien. Also mention that too much sugar is bad for the teeth.",
        ],
        [
          "partial",
          "(a) It includes foods. (b) [[1|Drink water every day.]] [[2|Sugar is bad for teeth.]] [[3|Il faut boire de l'eau.]]",
          "Name the foods in a balanced meal: fruits, vegetables, proteins and carbohydrates. Add a second French recommendation.",
          true,
        ],
        [
          "weak",
          "I do not know the words. I think it is about food and school.",
          "Look for cognates: repas, fruits, protéines, glucides. They tell you the article is about healthy food.",
        ],
        [
          "weak",
          "(a) It includes candy and soda. (b) You should eat much sugar. Moi doit manger pizza.",
          "The text says you should not eat too much sugar. Use on doit plus an infinitive: on doit manger des fruits.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "La vie à l'école et en famille, et un objectif pour le français",
  note: `
## Objectives

Students will be able to:

1. explain a difference in school or home life between a French-speaking country and their own;
2. set a goal for using French outside the classroom and track it for a week.

## Materials

A short video of a school day in Lyon and in Dakar, a Venn diagram, a goal-setting sheet and a weekly log, the worksheet.

## Starter (6 minutes)

Ask: "What do you think is different about a school day in French-speaking countries compared with Ohio?" List ideas: no school sports teams, long lunch, class schedule, grades out of 20.

## Main activity

1. School life: in France, students at the collège and lycée stay in the same classroom with the teachers moving, grades are given out of 20, lunch is a long break at the cantine, the school day can run until 5:00, and many extracurricular activities are outside school in clubs. In Senegal, class sizes can be large and French is the language of instruction. Discuss varied systems and avoid generalizing.
2. Home life: many families include grandparents living nearby, shared meals, and strong ties with extended family. Compare to students' experiences.
3. Complete a Venn diagram, then write two sentences in French: "Dans mon école, ... mais en France, ..."
4. Goal setting: choose a specific goal for using French outside the classroom (listen to a podcast for 10 minutes three times a week, text a classmate in French, label objects at home, read a news headline, watch a show with subtitles). Track daily in a log.

## Checking for understanding

Ask: "Quel est ton objectif pour cette semaine? Comment vas-tu le noter?"

## Worksheet

A comparison and a goal plan.
`,
  reading: [
    "Écoles, familles et un objectif personnel",
    `
Comparing school and family life in different countries helps us to see our own customs from a new angle. Differences are interesting, but they are general: schools within a country vary, and no single description is true for everyone. With this caution, here are some things you might notice in many French-speaking countries.

In **France**, students go to the **collège** (ages 11 to 15) and then to the **lycée** (ages 15 to 18). The class group usually stays in one classroom while the teachers move from room to room, the opposite of the usual system in US high schools, where students change classrooms. Grades are on a scale of 0 to 20, and 10 is a passing grade; getting a 16 or higher is rare and excellent. The school day can last from 8:00 to 5:00, with a long lunch break at the **cantine**, and there is often no school on Wednesday afternoon. Sports and clubs are usually organized outside the school, in community associations, rather than through school teams as in Ohio, where Friday night football is a school tradition. At the end of the lycée, students take the national exam called the **baccalauréat** (le bac). In many schools in **Senegal**, class sizes are large, and French is the language of instruction, though students speak Wolof and other languages at home.

Family life also has its own customs. In many families, **les grands-parents** (grandparents), aunts, uncles and cousins live nearby, and may even live in the same house. Sunday lunch with the extended family is common in France. Of course, many families are smaller and live far from relatives, and families in Columbus from Canada, Haiti and West Africa keep close ties across the world.

To write a comparison in French, use contrast words: **mais** (but), **cependant** (however), **tandis que** (while), **aussi** (also). "Dans mon école, les élèves changent de salle, mais en France, les professeurs changent de salle."

Finally, learning a language does not stop when class ends. A good way to improve is to set an **objectif** (goal) that is specific, measurable and realistic, and to track it. For example: "Cette semaine, je vais écouter un podcast en français dix minutes, trois fois." Others might be to text a classmate in French, label ten objects in your room, read one headline a day, or watch a series with French subtitles. At the end of the week, check your log: Est-ce que j'ai atteint mon objectif? Qu'est-ce qui a marché? Qu'est-ce que je peux changer?
`,
  ],
  cards: [
    ["le lycée", "high school in France (ages 15 to 18)"],
    ["la cantine", "school cafeteria"],
    ["le baccalauréat (le bac)", "national exam at the end of high school"],
    ["tandis que", "while, whereas"],
    ["cependant", "however"],
    ["l'objectif", "goal"],
    ["Cette semaine, je vais + verbe", "This week I am going to + verb"],
    ["atteindre un objectif", "to reach a goal"],
  ],
  closed: [
    [
      "What is a typical difference mentioned for many schools in France?",
      ["Students never eat lunch", "The class group stays in a classroom while teachers move", "There are no teachers", "School ends at noon"],
      "B",
    ],
    [
      "Which word means \"however\"?",
      ["aussi", "cependant", "parce que", "ensuite"],
      "B",
    ],
    [
      "Which goal is the most specific and measurable?",
      ["Je vais étudier plus", "Cette semaine, je vais écouter un podcast en français dix minutes, trois fois", "Je veux bien parler", "Je vais être intelligent"],
      "B",
    ],
    [
      "\"Tandis que\" is used to:",
      ["Show a contrast between two things", "Ask a question", "Say goodbye", "Give a command"],
      "A",
    ],
    [
      "Why is it important not to overgeneralize about schools and families in a country?",
      ["Because all schools are the same", "Because schools and families vary within a country", "Because customs never change", "Because only one country speaks French"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare one aspect of school life in your school with that of a school in a French-speaking country. Write four sentences in French using at least one contrast word (mais, cependant, tandis que) and then one sentence in English explaining why you should not generalize.",
      scheme: [
        "Describes a feature of their own school in French correctly",
        "Describes the corresponding feature in a French-speaking country in French",
        "Uses a contrast word (mais, cependant or tandis que) correctly",
        "Explains in English that practices vary among schools and countries",
      ],
      model:
        "Dans mon école, les élèves changent de salle. En France, les professeurs changent de salle, mais les élèves restent dans la même salle. Dans mon école, nous avons des équipes de sport, tandis qu'en France, les sports sont souvent dans des clubs. Not every school is the same, because customs vary within each country.",
      answers: [
        [
          "full",
          "[[0|Dans mon école, nous changeons de salle entre les cours.]] [[1|En France, les élèves restent souvent dans la même salle.]] [[2|Nous avons des équipes de sport à l'école, tandis qu'en France, le sport est souvent dans des clubs.]] [[3|I should not generalize because schools differ within a country, and public and private schools can be different.]]",
          "Très bien. You used tandis que accurately and your caution about generalizing is thoughtful.",
        ],
        [
          "full",
          "[[0|Dans mon école, les cours commencent à sept heures et demie.]] [[1|En France, beaucoup d'écoles commencent à huit heures, mais certaines finissent à cinq heures.]] [[2|Cependant, toutes les écoles ne sont pas pareilles.]] [[3|Every school and every country is different, so one example cannot describe everyone.]]",
          "Excellent. Using cependant to introduce your caution is a nice touch.",
        ],
        [
          "partial",
          "[[0|Dans mon école, nous avons le football américain.]] [[1|En France, il y a des équipes dans des clubs.]] Mon école est grande tandis que mon école est petite. [[3|Not every school is the same.]]",
          "Check your use of tandis que: you need two different things to contrast, such as two schools.",
        ],
        [
          "partial",
          "[[0|Dans mon école, nous mangeons à la cafétéria.]] [[2|En France, beaucoup d'élèves mangent à la cantine, mais d'autres mangent à la maison.]] Tous les élèves en France déjeunent deux heures.",
          "Avoid generalizing with tous. Say beaucoup d'élèves. Describe your own school and add a note on variation.",
          true,
        ],
        [
          "weak",
          "In my school we change classrooms. In France teachers change classrooms. Schools are different.",
          "Please write the comparison in French: dans mon école, nous changeons de salle, mais en France, les professeurs changent de salle.",
        ],
        [
          "weak",
          "Mon école pas uniforme. France uniforme oui. Mais mon école meilleur.",
          "Avoid saying one is better. Say dans mon école, nous n'avons pas d'uniforme, mais dans certaines écoles françaises, oui.",
        ],
      ],
    },
    {
      prompt:
        "Set a goal for using French outside class this week. Write it in French as a sentence that says what, how many times and for how long (Cette semaine, je vais ...). Then write a plan of three days with what you will do, and one sentence on how you will know whether you met your goal.",
      scheme: [
        "States a goal with cette semaine, je vais plus an infinitive",
        "Includes a number of times or a length of time that is measurable",
        "Gives a plan for three days with specific activities",
        "Explains how success will be checked, such as a log or checklist",
      ],
      model:
        "Cette semaine, je vais écouter un podcast en français dix minutes, trois fois. Lundi, j'écoute un podcast sur la musique. Mercredi, je lis un titre de journal. Vendredi, j'envoie un message à mon ami. Je vais utiliser un carnet pour marquer chaque jour.",
      answers: [
        [
          "full",
          "[[0|Cette semaine, je vais lire un article court en français.]] [[1|Je vais lire quinze minutes, quatre fois.]] [[2|Lundi, je lis sur le foot, mercredi sur la musique et vendredi sur la cuisine.]] [[3|Je vais marquer les jours dans une liste dans mon cahier.]]",
          "Très bien. Your goal is specific, measurable and realistic, and you chose topics you like.",
        ],
        [
          "full",
          "[[0|Cette semaine, je vais parler en français avec mon ami Luc.]] [[1|Nous allons parler cinq minutes chaque jour.]] [[2|Mardi, nous parlons de l'école, jeudi de la musique et samedi des projets.]] [[3|Je vais écrire une croix sur le calendrier après chaque conversation.]]",
          "Excellent. Planning the topic for each day makes it easier to follow through.",
        ],
        [
          "partial",
          "[[0|Cette semaine, je vais étudier le français.]] Lundi, je vais regarder une vidéo. Mercredi, je vais écouter de la musique. Vendredi, je lis un livre. Je vais voir si ça marche.",
          "Make the goal measurable: say how many minutes or times. Say how you will check, for example with a log.",
        ],
        [
          "partial",
          "[[0|Je vais écouter de la musique française trois fois.]] [[1|Vingt minutes à chaque fois.]] [[3|Je vais marquer sur un carnet.]]",
          "Start with cette semaine, and give a plan for three days with specific activities.",
          true,
        ],
        [
          "weak",
          "This week I am going to listen to French music and read a book. I will check it at the end.",
          "Please write in French: cette semaine, je vais écouter de la musique en français. Give the number of times.",
        ],
        [
          "weak",
          "Moi aller parler français beaucoup. Tout jour. Moi bon.",
          "Say cette semaine, je vais parler en français dix minutes, trois fois. Use specific numbers.",
        ],
      ],
    },
  ],
};

writeCourse("french-ii-grade-10.json", "French II", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
