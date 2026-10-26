import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Spanish III, Grade 11, Quarter 1. Standards: ACTFL World-Readiness
 * Standards, in the school's own words. Prompts are mostly in English with
 * Spanish phrases; learners answer in Spanish with the slips of a third-year
 * student (preterite and imperfect choice, irregular stems, command forms,
 * pronoun placement).
 */

const w1: WeekInput = {
  topic: "El pretérito, el imperfecto y los verbos irregulares",
  note: `
## Objectives

Students will be able to:

1. talk about past experiences and what they did last weekend using the preterite;
2. contrast the preterite and the imperfect to describe what used to happen and what happened once;
3. use irregular preterite verbs correctly in conversation.

## Materials

A timeline of a weekend, cards with irregular preterite stems, short narrative paragraphs, whiteboards, the quiz, problem set and worksheet.

## Starter (7 minutes)

Ask in Spanish: "¿Qué hiciste el fin de semana pasado?" Let students answer in short sentences. Write verbs they use on the board in two columns: single completed actions and repeated or background actions. Do not name the tenses yet.

## Main activity

1. Preterite for completed actions: regular -ar (hablé, hablaste, habló, hablamos, hablaron) and -er/-ir (comí, comiste, comió, comimos, comieron). Spelling changes in yo: busqué, llegué, empecé. Irregular stems: ir/ser (fui, fuiste, fue, fuimos, fueron), hacer (hice, hiciste, hizo), tener (tuve), estar (estuve), poder (pude), venir (vine), decir (dije, dijeron), dar (di, dio), ver (vi).
2. Imperfect for description and habit: -aba/-ía endings, and the only irregulars: ser (era), ir (iba), ver (veía). "Cuando era niño, jugaba al fútbol todos los días."
3. Contrast: the imperfect sets the scene and the preterite tells what happened. "Llovía cuando salí de casa." "Mientras estudiaba, sonó el teléfono."
4. Pair story: tell your partner about one memorable weekend, using both tenses.

## Checking for understanding

Whiteboards: choose the correct tense in a sentence: "Cuando (ser) niña, (ir) a la playa cada verano, pero un año (tener) un accidente."

## Quiz, problem set and worksheet

Tense choice and irregular forms.
`,
  reading: [
    "Dos pasados: lo que pasó y cómo era",
    `
Spanish has two simple past tenses, and choosing between them is one of the central skills of intermediate Spanish. The **preterite** (pretérito) tells what happened as a completed event with a beginning and an end. The **imperfect** (imperfecto) tells what used to happen, what was happening, and describes people, places, ages, weather and feelings in the past. A good way to think of it: the imperfect paints the background of the scene; the preterite moves the story forward.

Regular preterite endings for **-ar** verbs are -é, -aste, -ó, -amos, -aron: hablé, hablaste, habló, hablamos, hablaron. For **-er** and **-ir** verbs they are -í, -iste, -ió, -imos, -ieron: comí, comiste, comió, comimos, comieron. Verbs ending in -car, -gar and -zar change spelling in the yo form to keep the sound: buscar → busqué, llegar → llegué, empezar → empecé. Many common verbs are irregular. **Ir** and **ser** share forms: fui, fuiste, fue, fuimos, fueron ("Fui al cine" and "Fue una película excelente"). **Hacer**: hice, hiciste, hizo, hicimos, hicieron. Others: tener (tuve), estar (estuve), poder (pude), poner (puse), venir (vine), decir (dije, dijiste, dijo, dijimos, dijeron), dar (di, diste, dio), ver (vi, viste, vio). Notice that irregular preterites have no written accents on the endings.

The imperfect is regular almost everywhere: **-ar** verbs take -aba, -abas, -aba, -ábamos, -aban; **-er/-ir** verbs take -ía, -ías, -ía, -íamos, -ían. Only three verbs are irregular: **ser** (era, eras, era, éramos, eran), **ir** (iba, ibas, iba, íbamos, iban) and **ver** (veía, veías, veía, veíamos, veían). Typical signals for the imperfect are "siempre," "todos los días," "cuando era niño," and "mientras." Signals for the preterite are "ayer," "anoche," "una vez," "de repente."

Read this paragraph. "El sábado pasado **fui** al centro con mis amigos. **Hacía** frío y **nevaba**, pero nosotros **estábamos** contentos. **Comimos** en un restaurante y después **vimos** una película. Cuando **salimos** del cine, ya **era** muy tarde. **Tomé** el autobús y **llegué** a casa a las once." The imperfect (hacía, nevaba, estábamos, era) sets the scene; the preterite (fui, comimos, vimos, salimos, tomé, llegué) tells the events.

When the two tenses appear together, a common pattern is an action in progress that is interrupted: "**Estudiaba** cuando **sonó** el teléfono." Another is a change of meaning: "Conocí a Ana en 2020" (I met her), but "Conocía a Ana" (I knew her).
`,
  ],
  cards: [
    ["hablé / hablaste / habló", "I spoke / you spoke / he or she spoke"],
    ["fui / fue", "I went or was / he or she went or was"],
    ["hice / hizo", "I did or made / he or she did or made"],
    ["tuve / estuve / pude", "I had / I was / I could"],
    ["dije / dijeron", "I said / they said"],
    ["era / iba / veía", "I was / I used to go / I used to see"],
    ["cuando era niño", "when I was a child"],
    ["de repente", "suddenly"],
  ],
  closed: [
    [
      "Which sentence uses the preterite correctly: \"Yesterday I went to the store\"?",
      ["Ayer iba a la tienda.", "Ayer fui a la tienda.", "Ayer voy a la tienda.", "Ayer fue a la tienda."],
      "B",
    ],
    [
      "Choose the right tense: \"Cuando yo ___ niño, jugaba al fútbol todos los días.\"",
      ["fui", "era", "soy", "fue"],
      "B",
    ],
    [
      "What is the yo preterite of \"llegar\"?",
      ["llegé", "llegué", "llegí", "llego"],
      "B",
    ],
    [
      "\"Estudiaba cuando sonó el teléfono\" shows:",
      ["Two completed events", "A background action interrupted by an event", "A habit in the past", "A future plan"],
      "B",
    ],
    [
      "Which is the correct preterite of \"hacer\" for ella?",
      ["hiço", "hizo", "hacía", "hace"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write six sentences in Spanish about what you did last weekend, using the preterite. Include at least two irregular verbs (such as ir, hacer, tener, ver, decir) and one verb with a spelling change in the yo form (llegar, buscar, empezar).",
      scheme: [
        "Uses at least two irregular preterite verbs with correct forms",
        "Uses a spelling-change verb correctly in the yo form (llegué, busqué, empecé)",
        "Uses regular preterite endings correctly",
        "Includes time expressions such as el sábado, anoche or después, and mostly correct accents",
      ],
      model:
        "El sábado fui al centro con mis amigos. Hicimos compras y vimos una película. Llegué a casa a las diez. Después cené con mi familia. El domingo tuve que estudiar y empecé la tarea a las cuatro.",
      answers: [
        [
          "full",
          "El sábado por la mañana [[0|fui a la biblioteca y busqué un libro]]. [[1|Llegué a casa a las doce y empecé la tarea.]] Por la tarde [[2|mis amigos vinieron a mi casa y jugamos videojuegos]]. [[3|Anoche vi una película y me acosté a las once.]] El domingo mi madre hizo tamales.",
          "Muy bien. Your irregular forms (fui, vinieron, vi, hizo) and the spelling change (busqué, llegué, empecé) are all correct.",
        ],
        [
          "full",
          "[[0|El viernes tuve un partido de fútbol y fuimos a un restaurante después.]] [[1|Pagué la cuenta y llegué tarde a casa.]] [[2|El sábado comí con mis abuelos y hablé con ellos mucho.]] [[3|Después estudié para el examen y dije a mis padres que estaba cansado.]]",
          "Excelente. A good mix of regular and irregular verbs, and your time expressions keep the story in order.",
        ],
        [
          "partial",
          "[[0|El sábado fui al cine con mis amigos.]] Yo llegé a casa a las diez. [[2|Comí pizza y hablé con mi madre.]] El domingo yo hací la tarea.",
          "Check the spelling changes: llegué, not llegé. Hacer is irregular: hice la tarea.",
        ],
        [
          "partial",
          "[[0|Fui al parque y vi a mis amigos.]] [[1|Empecé un libro nuevo.]] Yo tenía mucha tarea el sábado y yo estudiaba mucho.",
          "For completed actions use the preterite: tuve mucha tarea and estudié. Your first three sentences are correct.",
          true,
        ],
        [
          "weak",
          "Last weekend I went to the movies. I saw a movie and ate popcorn. I arrived home at ten.",
          "Please write in Spanish: el fin de semana pasado fui al cine, vi una película y llegué a casa a las diez.",
        ],
        [
          "weak",
          "Yo va cine. Yo ve película. Yo comer palomitas. Yo llega casa.",
          "Use the preterite: fui al cine, vi una película, comí palomitas, llegué a casa.",
        ],
      ],
    },
    {
      prompt:
        "Write a short paragraph (six sentences) about a day from your childhood. Use the imperfect for the background and habits (como era, qué hacías siempre), and the preterite for one event that interrupted it.",
      scheme: [
        "Uses the imperfect for a habit or background with correct forms (jugaba, vivía, era, iba)",
        "Includes a time or age expression such as cuando era niño",
        "Uses the preterite for an interrupting or single event",
        "Combines the two tenses logically in at least one sentence",
      ],
      model:
        "Cuando era niño, vivía en una casa pequeña cerca de un parque. Todos los días jugaba al fútbol con mis amigos. Un día, mientras jugaba, me caí y me rompí el brazo. Mi madre me llevó al hospital y estuve allí tres horas.",
      answers: [
        [
          "full",
          "[[0|Cuando era niña, vivía en Dayton con mis abuelos y siempre jugaba en el jardín.]] [[1|Tenía siete años y mi casa era azul.]] Un sábado [[2|mientras jugaba con mi perro, me caí y lloré]]. [[3|Mi abuelo vino rápido y me dio un helado.]]",
          "Muy bien. Your imperfect sets the scene, and the preterite tells what happened.",
        ],
        [
          "full",
          "[[0|De niño, íbamos a la playa cada verano y mi padre cocinaba.]] [[1|Hacía mucho sol y yo tenía diez años.]] Un día, [[2|mientras construía un castillo de arena, vi una tortuga]]. [[3|Corrí a decírselo a mi padre y él tomó una foto.]]",
          "Excelente. Your story has a clear scene, an interruption and a reaction.",
        ],
        [
          "partial",
          "[[0|Cuando era niño, vivía en un apartamento.]] [[1|Yo jugué con mi hermano todos los días.]] Un día yo caía y mi madre vino.",
          "For a habit use the imperfect: jugaba. For a single event use the preterite: me caí.",
        ],
        [
          "partial",
          "[[1|Tenía ocho años y vivía en Ohio.]] [[3|Mientras comía, mi hermano gritó.]] Cuando yo era niño, yo fui feliz.",
          "A description of how things were uses the imperfect: era feliz. Your middle sentence uses both tenses well.",
          true,
        ],
        [
          "weak",
          "When I was a child I lived in Ohio. I played soccer every day. One day I fell and broke my arm.",
          "Please write in Spanish: cuando era niño vivía en Ohio, jugaba al fútbol, y un día me caí.",
        ],
        [
          "weak",
          "Yo ser niño. Yo jugar fútbol. Un día yo caer.",
          "Use the imperfect for the habit (era, jugaba) and the preterite for the single event (me caí).",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Pedir ayuda, las direcciones y la salud",
  note: `
## Objectives

Students will be able to:

1. make and respond to requests for help and directions in a city;
2. talk about health, symptoms and visiting a doctor.

## Materials

A map of downtown Columbus labeled in Spanish, direction phrase cards, a body diagram, role-play scripts for a doctor's visit, the quiz, problem set and worksheet.

## Starter (6 minutes)

Show a map of downtown Columbus with the Statehouse, the library and a park. Ask: "Perdón, ¿cómo llego a la biblioteca?" Students suggest simple answers. Collect the phrases: derecho, a la izquierda, a la derecha.

## Main activity

1. Directions: ¿Cómo llego a...? ¿Dónde está...? Está a dos cuadras de aquí. Siga derecho. Doble a la izquierda. Cruce la calle. Está al lado de, enfrente de, en la esquina. Ask politely: Perdone, ¿me puede ayudar? Respond: Claro. Por supuesto. Lo siento, no sé.
2. Health: Me duele la cabeza (the head hurts me), me duelen los pies. Tengo fiebre, tos, dolor de garganta, un resfriado. Estoy enfermo/a. The doctor asks: ¿Qué le pasa? ¿Desde cuándo? ¿Tiene alergias? Recommendations: Debe descansar, tomar medicina, beber líquidos. Doler works like gustar.
3. Role-play: a patient at a clinic and a doctor, in pairs. Use usted.

## Checking for understanding

Ask: "¿Cómo se dice 'My throat hurts'?" and "¿Cómo llego del parque al museo?"

## Quiz, problem set and worksheet

Directions and health vocabulary.
`,
  reading: [
    "Perdone, ¿me puede ayudar?",
    `
When you travel or live in a Spanish-speaking community, you often need to ask for help. A polite beginning is **"Perdone, ¿me puede ayudar?"** or **"Disculpe..."** To ask for a place: **"¿Cómo llego a la biblioteca?"** or **"¿Dónde está el banco?"** A person may answer with directions: **"Siga derecho"** (go straight), **"Doble a la derecha"** (turn right), **"Doble a la izquierda"** (turn left), **"Cruce la calle"** (cross the street), **"Está a dos cuadras"** (it is two blocks away), **"Está en la esquina"** (it is on the corner), **"Está enfrente de la plaza"** (it is across from the square), **"Está al lado del museo"** (it is next to the museum). The words used are commands in the usted form, which you will study in more detail this unit. If you do not understand, say **"¿Puede repetir, por favor?"** or **"Más despacio, por favor."** If you cannot help someone, say **"Lo siento, no sé."**

Look at an example in downtown Columbus. "Perdone, ¿cómo llego a la biblioteca? — Mire, siga derecho por esta calle dos cuadras. Después doble a la izquierda en la calle Gay. La biblioteca está enfrente del parque. — Muchas gracias. — De nada."

Health is another area where real communication matters. To say a body part hurts, use the verb **doler**, which works like gustar. The verb agrees with the thing that hurts: **"Me duele la cabeza"** (my head hurts), **"Me duelen los pies"** (my feet hurt). Other expressions: **"Tengo fiebre"** (I have a fever), **"Tengo tos"** (I have a cough), **"Tengo dolor de garganta"** (I have a sore throat), **"Tengo un resfriado"** (I have a cold), **"Estoy enfermo"** or **"enferma"** (I am sick). At the doctor's office, the **médico** or **médica** will ask in the formal style: **"¿Qué le pasa?"** (What is wrong?), **"¿Desde cuándo se siente así?"** (Since when do you feel this way?), **"¿Tiene alergias?"** (Do you have allergies?). Then comes advice: **"Debe descansar"** (you should rest), **"Tiene que tomar esta medicina"** (you have to take this medicine), **"Debe beber muchos líquidos"** (you should drink a lot of liquids).

Here is a short dialogue. "— Buenos días. ¿Qué le pasa? — Me duele la garganta y tengo tos. — ¿Desde cuándo? — Desde ayer. — ¿Tiene fiebre? — Sí, un poco. — Tiene un resfriado. Debe descansar y beber líquidos. Aquí tiene una receta para la medicina."
`,
  ],
  cards: [
    ["¿Cómo llego a...?", "How do I get to...?"],
    ["Siga derecho.", "Go straight."],
    ["Doble a la izquierda.", "Turn left."],
    ["a dos cuadras", "two blocks away"],
    ["Me duele la cabeza.", "My head hurts."],
    ["Me duelen los pies.", "My feet hurt."],
    ["Tengo fiebre.", "I have a fever."],
    ["Debe descansar.", "You should rest."],
  ],
  closed: [
    [
      "How do you say \"Turn right\" when speaking politely to an adult?",
      ["Dobla a la derecha", "Doble a la derecha", "Dobló a la derecha", "Doblar a la derecha"],
      "B",
    ],
    [
      "\"Me duelen los pies\" means:",
      ["My feet hurt", "My foot hurts", "I hurt my feet", "My feet are cold"],
      "A",
    ],
    [
      "Why do we say \"me duele\" but \"me duelen\"?",
      ["The verb agrees with the thing that hurts", "It agrees with the person", "It depends on the time", "It is random"],
      "A",
    ],
    [
      "A doctor says: \"Debe descansar y beber líquidos.\" This is:",
      ["An order about the past", "Advice for the patient", "A description of symptoms", "A question"],
      "B",
    ],
    [
      "\"Está en la esquina\" means:",
      ["It is on the corner", "It is in the school", "It is next to the park", "It is far away"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A tourist stops you in downtown Columbus and asks, \"Perdone, ¿cómo llego a la biblioteca?\" Write your answer as a dialogue of at least six lines in Spanish, giving three directions with usted command forms, and mention one landmark.",
      scheme: [
        "Starts with a polite greeting or response (claro, con mucho gusto)",
        "Gives at least two direction commands in the usted form (siga, doble, cruce)",
        "Mentions a distance or number of blocks (a dos cuadras)",
        "Mentions a landmark with a location phrase (enfrente de, al lado de, en la esquina)",
      ],
      model:
        "— Perdone, ¿cómo llego a la biblioteca? — Claro. Siga derecho dos cuadras. Doble a la izquierda en la calle Gay. Cruce la plaza. La biblioteca está enfrente del parque. — Muchas gracias. — De nada.",
      answers: [
        [
          "full",
          "— Perdone, ¿cómo llego a la biblioteca? — [[0|Con mucho gusto.]] [[1|Siga derecho y doble a la derecha en la calle High.]] Después cruce la plaza. [[2|La biblioteca está a tres cuadras.]] [[3|Está enfrente del parque y al lado del banco.]] — Gracias. — De nada.",
          "Muy bien. Your commands are in the usted form, and you gave a distance and landmarks.",
        ],
        [
          "full",
          "— Disculpe, ¿me puede ayudar? Busco la biblioteca. — [[0|Por supuesto.]] [[1|Doble a la izquierda aquí y siga derecho.]] Cruce la calle Broad. [[2|Está a dos cuadras de la plaza.]] [[3|La biblioteca está en la esquina, enfrente del museo.]] — Muchas gracias. — No hay de qué.",
          "Excelente. You used natural expressions, such as por supuesto and no hay de qué.",
        ],
        [
          "partial",
          "— Perdone. — [[0|Claro.]] Dobla a la derecha y sigue derecho. [[2|Está a dos cuadras.]] La biblioteca está al lado de la escuela.",
          "With a stranger use usted commands: doble and siga, not dobla and sigue. Your distance and landmark are good.",
        ],
        [
          "partial",
          "— ¿Cómo llego? — [[1|Siga derecho y cruce la calle.]] [[3|La biblioteca está enfrente del parque.]] — Gracias. — Adiós.",
          "Add a polite beginning, such as claro, and a distance such as a dos cuadras.",
          true,
        ],
        [
          "weak",
          "— Excuse me, how do I get to the library? — Go straight two blocks and turn left. It is across from the park.",
          "Please write in Spanish: siga derecho dos cuadras y doble a la izquierda. Está enfrente del parque.",
        ],
        [
          "weak",
          "— Biblioteca? — Derecho izquierda. Parque. Cuadras dos.",
          "Use full polite sentences: siga derecho, doble a la izquierda, está a dos cuadras.",
        ],
      ],
    },
    {
      prompt:
        "Write a dialogue of at least six lines between a doctor and a patient who has a cold. Include symptoms with tengo and me duele, how long the patient has felt sick, and the doctor's advice using usted.",
      scheme: [
        "The doctor asks what is wrong in the formal style (¿qué le pasa?)",
        "The patient names a symptom with tengo or me duele / me duelen",
        "The patient says since when (desde ayer, hace dos días)",
        "The doctor gives advice with debe or tiene que plus an infinitive",
      ],
      model:
        "— Buenos días. ¿Qué le pasa? — Me duele la garganta y tengo tos. — ¿Desde cuándo? — Desde ayer. — Tiene un resfriado. Debe descansar y beber líquidos.",
      answers: [
        [
          "full",
          "— Buenas tardes. [[0|¿Qué le pasa?]] — [[1|Me duele la cabeza y tengo mucha tos.]] — ¿Tiene fiebre? — Sí, un poco. — [[2|¿Desde cuándo se siente así? — Desde anoche.]] — [[3|Debe descansar, beber agua y tomar esta medicina dos veces al día.]]",
          "Muy bien. You used the formal register throughout, and the doctor's advice is specific.",
        ],
        [
          "full",
          "— Hola, ¿cómo está? [[0|¿Qué le pasa hoy?]] — [[1|Tengo fiebre y me duelen los oídos.]] — [[2|¿Hace cuánto tiempo?]] — Hace dos días. — [[3|Tiene que tomar antibióticos y debe quedarse en casa.]]",
          "Excelente. Hace dos días is an excellent way to say how long, and me duelen is correctly plural.",
        ],
        [
          "partial",
          "— ¿Qué le pasa? — [[1|Me duele los pies y tengo tos.]] — ¿Desde cuándo? — [[2|Desde ayer.]] — Debes descansar.",
          "Pies is plural, so say me duelen los pies. With a patient use usted: debe descansar.",
        ],
        [
          "partial",
          "— Buenos días. — Tengo fiebre. — [[3|Debe tomar medicina y beber líquidos.]] — Gracias, doctor.",
          "Add the doctor's question ¿qué le pasa? and say since when with desde ayer.",
          true,
        ],
        [
          "weak",
          "— What is wrong? — I have a cold and a sore throat. — Since when? — Since yesterday. — You should rest.",
          "Please write the dialogue in Spanish: ¿qué le pasa? Tengo un resfriado. Debe descansar.",
        ],
        [
          "weak",
          "— Qué pasa? — Yo estoy enfermo, garganta duele, tos yo. — Descansar.",
          "Use complete sentences: me duele la garganta, tengo tos. Debe descansar.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Los mandatos y los pronombres de objeto indirecto",
  note: `
## Objectives

Students will be able to:

1. use commands to give advice, instructions and directions;
2. use indirect object pronouns with verbs such as dar, decir and gustar.

## Materials

Recipe cards with commands, recorded instructions, whiteboards, a table of command forms, the problem set and worksheet.

## Starter (6 minutes)

Give a quick classroom game: "Simón dice." The teacher gives commands in Spanish: "Levántense. Abran el libro. Escriban su nombre." Ask students to notice the verb endings that change from the infinitive.

## Main activity

1. Tú commands: affirmative = the él/ella form (habla, come, escribe); eight irregular: di, haz, ve, ten, pon, sal, sé, ven. Negative tú commands use the "opposite vowel" (no hables, no comas, no escribas); irregular negatives: no vayas, no seas, no des.
2. Usted and ustedes commands: hable, coma, escriba; hablen, coman, escriban. Used for directions with strangers.
3. Pronoun placement: attached to affirmative commands (dímelo, ciérrala) with an accent; before negative commands (no me lo digas).
4. Indirect object pronouns: me, te, le, nos, les. They tell to whom or for whom: "Le doy un regalo a mi madre." "Me dijo la verdad." With gustar: "Le gusta la música."

## Checking for understanding

Whiteboards: change to commands: "Hablar" (tú, affirmative and negative) and "Dar" (usted).

## Problem set and worksheet

Commands and indirect object pronouns.
`,
  reading: [
    "¡Hazlo ahora! Dímelo, por favor",
    `
We use **commands** (mandatos) to give advice, instructions and directions. The form depends on who you are talking to. For **tú**, the affirmative command is the same as the él/ella form of the present: **habla** (speak), **come** (eat), **escribe** (write). There are eight common verbs with irregular affirmative tú commands: **di** (decir), **haz** (hacer), **ve** (ir), **ten** (tener), **pon** (poner), **sal** (salir), **sé** (ser) and **ven** (venir). The negative tú command uses the "opposite vowel": -ar verbs take -es and -er/-ir verbs take -as. So **no hables**, **no comas**, **no escribas**. The irregular negatives are **no vayas**, **no seas**, **no des**, **no digas**, **no hagas**.

For **usted**, the command uses the opposite vowel, too: **hable**, **coma**, **escriba**. For **ustedes**, add n: **hablen**, **coman**, **escriban**. This is the form used for polite directions: "Doble a la derecha." "Cruce la calle."

Pronouns go in different places. With **affirmative** commands, they are attached to the end of the verb, and an accent mark may be needed to keep the stress: **dímelo** (tell it to me), **cierra la puerta → ciérrala** (close it). With **negative** commands, the pronouns go before the verb: **no me lo digas** (don't tell it to me), **no la cierres** (don't close it).

Now for indirect object pronouns. An **indirect object** tells to whom or for whom the action is done. The pronouns are **me** (to me), **te** (to you), **le** (to him, her, you formal), **nos** (to us) and **les** (to them). They are used with verbs like **dar** (to give), **decir** (to say, tell), **escribir**, **mandar**, **comprar** and with **gustar**. "Le doy un regalo a mi madre." "Mi hermano me dijo la verdad." "Te escribo un mensaje." "Les compramos flores a los abuelos." Notice that it is common to repeat the person with **a**: "A mi madre le gusta la música." If you have both an indirect and a direct object pronoun, the indirect comes first, and **le** or **les** changes to **se** before lo, la, los, las: "Se lo doy" (I give it to him). A short recipe shows commands in use: "Corta las cebollas. Añade sal, pero no pongas mucha. Mezcla los ingredientes y dame un poco para probarlo."
`,
  ],
  cards: [
    ["habla / no hables", "speak / don't speak (tú)"],
    ["haz / ve / ten / pon", "irregular tú commands: do, go, have, put"],
    ["hable / coman", "speak (usted) / eat (ustedes)"],
    ["dímelo", "tell it to me"],
    ["no me lo digas", "don't tell it to me"],
    ["le doy un regalo", "I give him or her a gift"],
    ["me, te, le, nos, les", "indirect object pronouns"],
    ["se lo doy", "I give it to him, her or them"],
  ],
  closed: [
    [
      "Which is the affirmative tú command of \"hablar\"?",
      ["hablo", "habla", "hables", "hable"],
      "B",
    ],
    [
      "Which is the correct negative tú command of \"comer\"?",
      ["no come", "no comas", "no coma", "no comes"],
      "B",
    ],
    [
      "How do you say \"Tell it to me\" (tú)?",
      ["Dime lo", "Dímelo", "Me lo di", "Lo me di"],
      "B",
    ],
    [
      "Which pronoun means \"to them\" in \"___ compramos flores a los abuelos\"?",
      ["le", "les", "nos", "se"],
      "B",
    ],
    [
      "Which is the irregular affirmative tú command of \"hacer\"?",
      ["hace", "haz", "hagas", "hacer"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "You are a babysitter leaving instructions for a younger cousin (tú). Write six commands in Spanish, three affirmative and three negative. Include at least two irregular affirmative commands (di, haz, ve, ten, pon, sal, sé, ven) and one command with an attached pronoun.",
      scheme: [
        "Uses at least two irregular affirmative tú commands correctly",
        "Uses negative tú commands correctly with the opposite vowel",
        "Uses a command with an attached pronoun and the accent mark if needed",
        "Uses a complete sentence structure and a logical instruction in each case",
      ],
      model:
        "Haz la tarea ahora. Pon los platos en la mesa. Ciérralas ventanas si hace frío. No abras la puerta a nadie. No comas dulces antes de la cena. No veas televisión muy tarde.",
      answers: [
        [
          "full",
          "[[0|Haz la tarea antes de la cena y pon los libros en la mochila.]] [[3|Ven aquí si necesitas algo.]] [[1|No abras la puerta a nadie y no comas dulces.]] No veas televisión después de las nueve. [[2|Llámame si tienes un problema y ciérrala puerta con llave.]]",
          "Muy bien. Haz, pon and ven are the irregular commands, and llámame is correctly accented with the attached pronoun.",
        ],
        [
          "full",
          "[[0|Ve a tu cuarto a las ocho y ten cuidado con la estufa.]] [[1|No juegues afuera y no hables con extraños.]] [[3|Sé bueno con tu hermano.]] [[2|Dímelo si pasa algo.]] Haz la cama.",
          "Excelente. Dímelo has its attached pronouns and the written accent.",
        ],
        [
          "partial",
          "[[0|Haz la tarea y pon la mesa.]] No abres la puerta. No comes dulces. [[2|Llámame si necesitas ayuda.]]",
          "Negative tú commands use the opposite vowel: no abras, no comas. Your affirmative commands are right.",
        ],
        [
          "partial",
          "Abre la ventana. [[1|No juegues con el fuego.]] [[2|Dame tu teléfono.]] Hace la tarea. Ve a dormir a las nueve.",
          "Hacer is irregular: haz la tarea, not hace. Good use of dame and no juegues.",
          true,
        ],
        [
          "weak",
          "Do your homework. Don't open the door. Put the plates on the table. Don't eat candy.",
          "Please write the instructions in Spanish: haz la tarea, no abras la puerta, pon los platos, no comas dulces.",
        ],
        [
          "weak",
          "Hacer tarea. No abrir puerta. Poner platos. No comer dulces.",
          "Do not use the infinitive. Use tú commands: haz, no abras, pon, no comas.",
        ],
      ],
    },
    {
      prompt:
        "Write five sentences in Spanish with indirect object pronouns: say what you give someone, what someone told you, what you write or buy for someone, and one sentence with gustar. Use le, les, me or nos correctly.",
      scheme: [
        "Uses le or les correctly with dar, escribir or comprar",
        "Uses me correctly with decir or mandar",
        "Uses gustar with the right indirect pronoun and verb form",
        "Adds a (a mi madre, a mis amigos) for clarity in at least one sentence",
      ],
      model:
        "Le doy un regalo a mi madre. Mi padre me dijo la verdad. Les escribo mensajes a mis abuelos. A mi hermano le gusta el fútbol. Nos compraron boletos para el concierto.",
      answers: [
        [
          "full",
          "[[0|Le doy un libro a mi amiga en su cumpleaños.]] [[1|Mi profesora me dijo que mi ensayo era excelente.]] Les escribo cartas a mis abuelos. [[2|A mi hermano le gustan los videojuegos.]] [[3|A mis padres les compré flores para su aniversario.]]",
          "Muy bien. Every pronoun matches its person, and you repeated the person with a for clarity.",
        ],
        [
          "full",
          "[[0|Le mandé un mensaje a mi entrenador.]] [[1|Mi madre me dio un consejo importante.]] Nos dijeron la verdad. [[2|A mí me gusta la música y a ella le gustan las películas.]] [[3|A mis primos les compro regalos cada Navidad.]]",
          "Excelente. You contrasted a mí me gusta with a ella le gustan correctly.",
        ],
        [
          "partial",
          "[[0|Le doy un regalo a mi madre.]] [[1|Mi padre me dijo la verdad.]] A mis amigos le gusta el fútbol. Yo les escribo a mi abuela.",
          "A mis amigos les gusta (plural). A mi abuela requires le: yo le escribo.",
        ],
        [
          "partial",
          "[[0|Les compro flores a mis abuelos.]] Mi madre le dio un consejo (a mí). [[2|A mi hermana le gusta cantar.]]",
          "The pronoun for me is me: mi madre me dio un consejo. Your other two sentences are correct.",
          true,
        ],
        [
          "weak",
          "I give a gift to my mother. My dad told me the truth. I write to my grandparents. My brother likes soccer.",
          "Please write in Spanish: le doy un regalo a mi madre, mi padre me dijo la verdad.",
        ],
        [
          "weak",
          "Yo dar regalo a mi madre. Mi padre dijo yo verdad. Mi hermano gusta fútbol.",
          "Use the pronouns: le doy un regalo, mi padre me dijo la verdad, a mi hermano le gusta el fútbol.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Un viaje y un recuerdo de la infancia",
  note: `
## Objectives

Students will be able to:

1. write a paragraph about a trip they took, with times and places;
2. narrate a childhood memory with background details and key events.

## Materials

Travel photos and a map, a graphic organizer (setting, characters, events, feelings), a model narrative, a writing rubric, the worksheet.

## Starter (6 minutes)

Show a photo of a family trip (Cedar Point, the Smoky Mountains, a visit to relatives in Puerto Rico). Ask in Spanish: "¿Adónde viajaste? ¿Con quién fuiste? ¿Cómo era el lugar?" Students answer orally.

## Main activity

1. Model paragraph about a trip: where, when, with whom, how you traveled, what the weather was like (imperfect), what you did (preterite), what you saw, how you felt. Use transitions: primero, luego, después, finalmente, de repente.
2. Planning: use the organizer to separate background (imperfect) from events (preterite).
3. Writing workshop: write 8 to 10 sentences about a trip you took.
4. Narrating a childhood memory: age, place, people, a typical day, and one event that stands out. Share in pairs and give feedback on tense choice.

## Checking for understanding

Peer check: underline each verb and write P or I above it. Does the story make sense?

## Worksheet

A trip paragraph and a childhood memory.
`,
  reading: [
    "Un viaje a Puerto Rico",
    `
A good narrative in Spanish needs a clear sequence and a mix of tenses. Use the **imperfect** to describe the scene, the weather, ages, feelings and habits, and the **preterite** to tell the events that move the story. Linking words help the reader follow the order: **primero** (first), **luego** and **después** (then, afterward), **mientras** (while), **de repente** (suddenly), **por fin** (finally), **al final** (in the end).

Read this paragraph about a trip.

"El verano pasado mi familia y yo viajamos a Puerto Rico para visitar a mis abuelos. **Salimos** de Columbus a las seis de la mañana y **llegamos** a San Juan por la tarde. Cuando **bajamos** del avión, **hacía** mucho calor y **había** mucha humedad, pero yo **estaba** muy emocionada. Mi abuela nos **esperaba** en el aeropuerto con una sonrisa enorme. Durante dos semanas **visitamos** el Viejo San Juan, **comimos** mofongo y **nadamos** en el mar. Un día, mientras **caminábamos** por la playa, **vimos** una tortuga gigante. **Sacamos** muchas fotos. Al final, no **quería** volver a casa. Fue el mejor viaje de mi vida."

Notice how the verbs behave. The events are in the preterite: salimos, llegamos, bajamos, visitamos, comimos, nadamos, vimos, sacamos. The background and descriptions are in the imperfect: hacía, había, estaba, esperaba, quería. And when an action was in progress and something happened, we combine both: "mientras caminábamos (imperfect), vimos (preterite) una tortuga."

To write about a childhood memory, include the age, the place, the people and a normal day, then a special event. "Cuando tenía siete años, vivía en una casa pequeña con mis abuelos. Todos los días jugaba en el jardín con mi perro, Max. Un sábado, mientras jugábamos, Max encontró un gato. Corrió detrás de él y se escondió debajo del carro. Yo lloraba porque tenía miedo. Mi abuelo salió, sacó al perro y me dio un abrazo."

When you revise, ask yourself: Does each verb describe an event or a background? Did I include times and places? Did I use words that connect the story? Can the reader picture the scene?
`,
  ],
  cards: [
    ["el verano pasado", "last summer"],
    ["llegamos / salimos", "we arrived / we left"],
    ["mientras", "while"],
    ["de repente", "suddenly"],
    ["por fin / al final", "finally / in the end"],
    ["hacía calor", "it was hot"],
    ["cuando tenía siete años", "when I was seven years old"],
    ["Fue el mejor viaje.", "It was the best trip."],
  ],
  closed: [
    [
      "Which verb form describes the weather in the past scene?",
      ["Hizo calor", "Hacía calor", "Hace calor", "Haga calor"],
      "B",
    ],
    [
      "Choose the best form: \"Mientras ___ por la playa, vimos una tortuga.\"",
      ["caminamos", "caminábamos", "caminaremos", "caminen"],
      "B",
    ],
    [
      "Which linking word best introduces a surprising event?",
      ["mientras", "siempre", "de repente", "normalmente"],
      "C",
    ],
    [
      "\"Cuando tenía siete años\" uses the imperfect because it:",
      ["Describes age as a background condition", "Tells a single event", "Shows a future plan", "Is a command"],
      "A",
    ],
    [
      "Which sentence tells an event?",
      ["Hacía frío.", "Había mucha gente.", "Llegamos a las seis.", "Estaba cansada."],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Write a paragraph of at least eight sentences in Spanish about a trip you took (real or invented). Include where you went, when, with whom, the weather, at least three events, and how you felt. Use both the preterite and the imperfect.",
      scheme: [
        "Uses the imperfect for background (weather, feelings, descriptions) correctly",
        "Uses the preterite for at least three events correctly",
        "States where, when and with whom",
        "Uses transitions such as primero, luego, mientras or de repente",
      ],
      model:
        "El verano pasado viajé a Chicago con mi familia. Hacía sol y había mucha gente en la ciudad. Primero visitamos el museo. Luego comimos pizza. Mientras caminábamos por el lago, vimos un concierto. Me sentía muy feliz.",
      answers: [
        [
          "full",
          "[[0|En julio viajé a Washington con mi familia. Hacía mucho calor y yo estaba emocionada.]] Primero visitamos el Capitolio, [[1|luego comimos en un restaurante y después compramos recuerdos]]. [[2|Fuimos a Washington con mis padres y mis dos hermanos.]] [[3|De repente empezó a llover mientras caminábamos, pero nos divertimos mucho.]] Al final volví a Columbus cansada y contenta.",
          "Muy bien. Your background is in the imperfect and the events in the preterite, with good connectors.",
        ],
        [
          "full",
          "[[0|El año pasado fui a México con mi abuela. Era diciembre y hacía fresco.]] [[1|Visitamos las pirámides, subimos a una de ellas y sacamos muchas fotos.]] [[2|Viajamos con mis primos y mis tíos.]] [[3|Mientras comíamos tacos, empezó un baile en la plaza y bailamos todos.]] Me sentía feliz y quería quedarme.",
          "Excelente. Your story has a clear scene, events, and feelings.",
        ],
        [
          "partial",
          "[[2|Fui a Cleveland con mis amigos en agosto.]] [[0|Hacía sol.]] Nosotros visitábamos el museo y comíamos pizza. Estábamos felices. Volvimos a casa.",
          "Events need the preterite: visitamos el museo and comimos pizza. Your descriptions with hacía and estábamos are right.",
        ],
        [
          "partial",
          "[[1|Fuimos a la playa, nadamos y comimos helado.]] Hizo mucho calor y yo fui feliz. [[3|De repente vimos un delfín.]]",
          "For the weather and feelings in the background, use the imperfect: hacía mucho calor y yo estaba feliz.",
          true,
        ],
        [
          "weak",
          "Last summer I went to Chicago with my family. It was sunny. We visited the museum and ate pizza.",
          "Please write the paragraph in Spanish: el verano pasado viajé a Chicago. Hacía sol. Visitamos el museo.",
        ],
        [
          "weak",
          "Yo ir Chicago. Hacer sol. Nosotros visitar museo. Yo feliz.",
          "Use past forms: fui a Chicago, hacía sol, visitamos el museo, estaba feliz.",
        ],
      ],
    },
    {
      prompt:
        "Narrate a childhood memory in at least six sentences in Spanish. Give your age, where you lived, who was there, what usually happened (imperfect), and one event that stands out (preterite).",
      scheme: [
        "States age and place in the imperfect (tenía ... años, vivía en)",
        "Describes a habit or typical scene in the imperfect",
        "Tells one standout event in the preterite",
        "Connects the background and the event with cuando or mientras and gives a feeling or ending",
      ],
      model:
        "Cuando tenía siete años, vivía en Dayton con mis abuelos. Todos los días jugaba en el jardín. Un día, mientras jugaba, encontré una moneda de oro en la tierra. Corrí a mostrársela a mi abuelo y él sonrió.",
      answers: [
        [
          "full",
          "[[0|Cuando tenía seis años, vivía en una casa azul con mis padres.]] [[1|Todos los sábados íbamos al parque y yo jugaba en el columpio.]] [[2|Un sábado me caí y me rompí un diente.]] [[3|Mientras lloraba, mi padre me abrazó y me compró un helado.]] Después me sentí mejor.",
          "Muy bien. You separated the habit (íbamos, jugaba) from the event (me caí, me rompí).",
        ],
        [
          "full",
          "[[0|De niña, vivía en Puerto Rico, y tenía ocho años.]] [[1|Mi abuela cocinaba cada domingo y toda la familia comía junta.]] [[2|Un domingo, mi primo escondió el postre y nos reímos mucho.]] [[3|Cuando mi abuela lo encontró, no se enojó, sino que se rió también.]]",
          "Excelente. A strong, vivid memory with a warm ending.",
        ],
        [
          "partial",
          "[[0|Cuando tenía cinco años, vivía en Ohio.]] [[1|Yo jugué con mi perro todos los días.]] Un día el perro corrió y yo lo perseguía.",
          "A habit takes the imperfect: jugaba. An event takes the preterite: lo perseguí.",
        ],
        [
          "partial",
          "[[2|Un día mi hermano rompió una ventana.]] [[3|Mi madre gritó mientras yo me escondía.]] Tengo siete años y vivo con mis abuelos.",
          "The age and place are in the past: tenía siete años y vivía con mis abuelos.",
          true,
        ],
        [
          "weak",
          "When I was five I lived in Ohio. I played with my dog every day. One day he ran away and I cried.",
          "Please write in Spanish: cuando tenía cinco años vivía en Ohio, jugaba con mi perro, un día se escapó.",
        ],
        [
          "weak",
          "Yo ser pequeño. Yo vivir Ohio. Jugar perro. Un día perro escapar.",
          "Use the imperfect and the preterite: era pequeño, vivía en Ohio, jugaba con mi perro, un día se escapó.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Consejos de salud, un cuento de viaje y un anuncio",
  note: `
## Objectives

Students will be able to:

1. give a short presentation that offers advice on a healthy lifestyle;
2. understand the main ideas and details of a travel story in Spanish;
3. read an authentic ad or a brochure and identify its purpose.

## Materials

A short travel story in Spanish (about 200 words), an authentic brochure from a Spanish tourist office or a Columbus clinic, a presentation planner, the worksheet and quiz.

## Starter (6 minutes)

Pose a question: "¿Qué hace una persona saludable?" Collect ideas in Spanish: duerme ocho horas, come frutas, hace ejercicio, bebe agua. Introduce the structure es importante + infinitive and hay que.

## Main activity

1. Giving advice: commands (descansa, no fumes), debes + infinitive, es importante + infinitive, recomiendo que + subjunctive (introduced as a chunk). Practice a 45-second advice talk with three tips and reasons.
2. Reading a travel story: identify the narrator, the place, the main events and one detail for each paragraph. Practice with cognates and context.
3. Authentic materials: read an ad or brochure; identify purpose (inform, persuade, sell), audience, and key details (hours, price, contact).

## Checking for understanding

Ask: "¿Cuál es el propósito de este anuncio? ¿Para quién es?"

## Worksheet and quiz

An advice talk plan and a reading comprehension.
`,
  reading: [
    "Vida sana, un viaje y un anuncio",
    `
To give advice, Spanish offers several tools that you already know. You can use **commands**: "Duerme ocho horas." "No comas tantos dulces." You can use **deber + infinitive**: "Debes beber agua." You can use impersonal expressions such as **es importante + infinitive**: "Es importante hacer ejercicio." And you can use **hay que + infinitive**: "Hay que comer frutas y verduras." A strong presentation begins with an introduction ("Hoy voy a hablar de cómo tener una vida sana"), gives three tips, each with a reason ("Primero, es importante dormir ocho horas porque el cuerpo necesita descansar"), and ends with a conclusion ("En resumen, una vida sana es posible si hacemos pequeños cambios"). Speak from notes and look at your audience.

Reading a travel story in Spanish is like reading any story: find who, where, what and why. Here is a short one.

"El año pasado, Daniel viajó solo a Perú. Quería visitar Machu Picchu, la ciudad de los incas. Tomó un tren desde Cusco y, durante el viaje, conoció a una señora que vendía tejidos. Ella le explicó la historia de las montañas. Cuando llegó, estaba lloviendo y había mucha niebla, pero de repente el sol salió y Daniel pudo ver las ruinas entre las nubes. Sacó fotos toda la mañana. Esa noche escribió en su diario: 'Hoy entendí por qué tanta gente sueña con este lugar.'"

The main idea is Daniel's trip to Machu Picchu and his emotion when he saw it. Supporting details include the train from Cusco, the woman who sold textiles, the weather, and the diary entry. You do not need to understand every word; look at the order of events and the cognates (ciudad, historia, ruinas).

An authentic ad or brochure is meant for real readers, so it uses vocabulary and layout that you can learn to read quickly. Ask: **¿Cuál es el propósito?** (To inform? To persuade? To sell?) **¿Para quién es?** (Tourists? Families? Students?) **¿Qué información práctica da?** (Hours, prices, address, phone number, website). For example, a brochure from a museum in Madrid might say: "Museo del Prado. Abierto de lunes a sábado, de 10:00 a 20:00. Entrada general: 15 euros. Gratis para menores de 18 años." The purpose is to inform and to attract visitors; the audience is tourists; the key details are the hours and the price.
`,
  ],
  cards: [
    ["Es importante + infinitive", "It is important to + verb"],
    ["Hay que + infinitive", "One must + verb"],
    ["una vida sana", "a healthy life"],
    ["en resumen", "in summary"],
    ["el propósito", "the purpose"],
    ["la entrada", "admission, ticket"],
    ["gratis", "free"],
    ["de lunes a sábado", "from Monday to Saturday"],
  ],
  closed: [
    [
      "Which sentence gives advice using a command?",
      ["Hago ejercicio.", "Duerme ocho horas.", "Dormí ocho horas.", "Duermo ocho horas."],
      "B",
    ],
    [
      "In Daniel's story, what did he see when the sun came out?",
      ["The sea", "The ruins among the clouds", "A city festival", "A train"],
      "B",
    ],
    [
      "A brochure says \"Entrada gratis para menores de 18 años.\" What does this tell you?",
      ["Adults pay less", "Minors do not pay admission", "The museum is closed", "Tickets are sold out"],
      "B",
    ],
    [
      "What is the best conclusion phrase for a talk?",
      ["En resumen, ...", "Primero, ...", "Mientras tanto, ...", "Por ejemplo, ..."],
      "A",
    ],
    [
      "What question helps you find the purpose of an ad?",
      ["¿Cuál es el propósito?", "¿Cuántos años tienes?", "¿Qué hora es?", "¿Dónde vives?"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Write the script for a 45-second talk in Spanish offering advice on a healthy lifestyle. Include an introduction, three tips (each with a reason using porque), and a conclusion. Use at least one command, one debes, and one es importante + infinitive.",
      scheme: [
        "Includes a clear introduction and a conclusion",
        "Gives three separate tips with a reason for each",
        "Uses at least one command, debes and es importante + infinitive correctly",
        "Uses mostly correct grammar and accents",
      ],
      model:
        "Hoy voy a hablar de una vida sana. Primero, es importante dormir ocho horas porque el cuerpo necesita descansar. Segundo, debes beber agua porque ayuda a concentrarte. Tercero, camina treinta minutos cada día porque te da energía. En resumen, pequeños cambios mejoran tu salud.",
      answers: [
        [
          "full",
          "[[0|Hoy voy a hablar de cómo tener una vida sana.]] Primero, [[1|es importante dormir ocho horas porque el cuerpo necesita energía.]] Segundo, [[2|debes beber agua porque ayuda a concentrarte.]] Tercero, come más frutas porque tienen vitaminas. [[3|En resumen, pequeños cambios hacen una gran diferencia.]]",
          "Muy bien. Your talk has a clear structure, and each tip has a reason.",
        ],
        [
          "full",
          "[[0|Buenos días, hoy les voy a dar tres consejos para su salud.]] Número uno: [[1|camina treinta minutos cada día porque el ejercicio reduce el estrés.]] Número dos: [[2|es importante comer verduras porque tienen vitaminas.]] Número tres: no uses el teléfono antes de dormir porque no puedes descansar. [[3|Para terminar, recuerden que cuidar el cuerpo es cuidar la vida.]]",
          "Excelente. You addressed the audience and finished with a memorable closing line.",
        ],
        [
          "partial",
          "[[0|Hoy voy a hablar de la salud.]] Primero, [[1|es importante dormir]]. Segundo, debes beber agua porque es bueno. Tercero, haz ejercicio. En resumen, es bueno.",
          "Give a reason for each tip and be specific: porque el cuerpo necesita descansar. Your structure is good.",
        ],
        [
          "partial",
          "Primero, [[2|debes comer frutas porque tienen vitaminas]]. Segundo, camina cada día. [[3|En resumen, hay que cuidar la salud.]]",
          "Add an introduction, a third tip and the use of es importante + infinitive.",
          true,
        ],
        [
          "weak",
          "Today I am going to talk about health. You should sleep eight hours, drink water and exercise.",
          "Please write the talk in Spanish: hoy voy a hablar de la salud. Debes dormir ocho horas.",
        ],
        [
          "weak",
          "Salud es bueno. Yo dormir. Agua. Ejercicio. Bueno gracias.",
          "Use full sentences and reasons: es importante dormir ocho horas porque el cuerpo necesita descansar.",
        ],
      ],
    },
    {
      prompt:
        "Read this ad: \"Clínica Salud Latina. Atención médica en español para toda la familia. Abierto de lunes a viernes, de 8:00 a 18:00. Primera consulta gratis. Llame al 614-555-0148.\" Answer in English: (a) What is the purpose? (b) Who is it for? (c) Give two practical details. Then write one sentence in Spanish inviting a friend to the clinic.",
      scheme: [
        "States that the purpose is to inform and attract patients to the clinic",
        "States that the audience is Spanish-speaking families",
        "Gives two practical details, such as hours, the free first visit or the phone number",
        "Writes a correct Spanish sentence inviting a friend, such as te recomiendo que vayas",
      ],
      model:
        "(a) The purpose is to inform people about the clinic and to attract patients. (b) It is for Spanish-speaking families. (c) It is open Monday to Friday from 8:00 to 6:00 and the first visit is free. Ven conmigo a la clínica; la primera consulta es gratis.",
      answers: [
        [
          "full",
          "(a) [[0|The purpose is to tell people about the clinic and persuade them to come.]] (b) [[1|It is for Spanish-speaking families.]] (c) [[2|It is open Monday to Friday, 8:00 to 6:00, and the first visit is free.]] [[3|Ven conmigo a la clínica porque la primera consulta es gratis.]]",
          "Muy bien. Your Spanish sentence uses a command and gives a reason.",
        ],
        [
          "full",
          "(a) [[0|It informs readers and tries to attract new patients.]] (b) [[1|The audience is families who speak Spanish in the area.]] (c) [[2|There is a phone number, 614-555-0148, and the hours are 8 to 18:00.]] [[3|Te recomiendo la clínica: tienen médicos que hablan español.]]",
          "Excelente. Te recomiendo is a natural phrase for a recommendation.",
        ],
        [
          "partial",
          "(a) [[0|To tell about the clinic.]] (b) For doctors. (c) [[2|It is open Monday to Friday and the first visit is free.]] Ven a la clínica.",
          "The audience is families who need medical care in Spanish. Add a reason in your Spanish sentence.",
        ],
        [
          "partial",
          "(a) To sell medicine. (b) [[1|For Spanish-speaking families.]] (c) [[2|Free first visit and a phone number.]] [[3|Vamos a la clínica juntos.]]",
          "The purpose is to inform and attract patients, not to sell medicine. Your other answers are correct.",
          true,
        ],
        [
          "weak",
          "I do not understand. It is a hospital and it is far away.",
          "Look for cognates and numbers: clínica, médica, familia, gratis, lunes, viernes. They tell the purpose and hours.",
        ],
        [
          "weak",
          "(a) It is a story. (b) For kids. (c) Pizza and ice cream. Clínica bonita.",
          "Read again: it is an ad for a medical clinic, for families, with hours and a free first visit.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Fiestas familiares y obras de arte, música y literatura",
  note: `
## Objectives

Students will be able to:

1. explain how holidays and family celebrations differ in Spanish-speaking countries;
2. describe a piece of art, music or literature from the Spanish-speaking world.

## Materials

Photos of las Posadas, the Rosca de Reyes and the twelve grapes of New Year's Eve in Spain; images of Frida Kahlo's "Las dos Fridas" and Picasso's "Guernica"; audio of a cumbia and Violeta Parra's "Gracias a la vida"; an excerpt of García Márquez, the problem set and worksheet.

## Starter (6 minutes)

Ask: "¿Cómo celebras la Navidad en tu familia? ¿Cuándo abres los regalos?" Write on the board a few answers. Then ask: "En muchos países hispanos, la fiesta principal es el 24 de diciembre. ¿Por qué creen que es así?"

## Main activity

1. Holidays and family celebrations: Nochebuena (Dec 24) with a late dinner; las Posadas (Dec 16 to 24) in Mexico; el Día de los Reyes Magos (Jan 6), when children receive gifts and families eat the Rosca de Reyes; the twelve grapes at midnight in Spain on New Year's Eve; el Día de la Independencia (Sept 16, Mexico, with the Grito); la quinceañera and el cumpleaños. Compare with Thanksgiving and Christmas morning in Ohio.
2. Describing a work: art (Frida Kahlo, Las dos Fridas, 1939; Picasso, Guernica, 1937), music (cumbia, salsa, Violeta Parra), literature (García Márquez, Cien años de soledad). Use descriptive language: En el cuadro hay... Los colores son... Me hace sentir...
3. Practice a 60-second description of a work.

## Checking for understanding

Ask: "¿Cuál es una diferencia entre una celebración hispana y una celebración en Ohio?"

## Worksheet, quiz and problem set

Comparison of celebrations and description of a work.
`,
  reading: [
    "Cómo celebramos y qué nos dice el arte",
    `
Family celebrations are an important part of culture, and in Spanish-speaking countries they have many forms. In much of the Spanish-speaking world, the main Christmas celebration is not on December 25 but on **Nochebuena**, the night of December 24. Families gather for a late dinner, which can last until midnight, and many attend the **Misa del Gallo**, a midnight Mass. In Mexico, from December 16 to 24, communities celebrate **las Posadas**, processions that remember the journey of Mary and Joseph looking for lodging, with songs, piñatas and food. In many countries, children receive gifts not from Santa Claus but on **el Día de los Reyes Magos**, January 6, from the Three Kings, and families share the **Rosca de Reyes**, a ring-shaped sweet bread with a small figure hidden inside. Whoever finds it is expected to host a party on February 2. In Spain, on New Year's Eve, people eat **doce uvas** (twelve grapes) at the stroke of midnight, one for each chime, for good luck in the new year. On **September 16**, Mexicans celebrate their independence with **el Grito**, a shout of "¡Viva México!" from the balcony of the National Palace. In the United States, Thanksgiving, with its focus on gratitude and family, and Christmas morning with gifts under the tree, are the main family occasions. Many Latino families in Ohio combine traditions from both.

Art, music and literature also express culture. **Frida Kahlo**, a Mexican painter, painted "Las dos Fridas" in 1939. It shows two versions of herself sitting side by side, holding hands, with exposed hearts connected by a vein. One wears a European white dress and the other a traditional Tehuana dress, which can be seen as a portrait of her mixed heritage and her emotional pain after her divorce. **Pablo Picasso**, the Spanish painter, painted "Guernica" in 1937, a huge black, white and gray work about the bombing of a Basque town in the Spanish Civil War. It shows a screaming horse, a bull, and a woman holding her dead child, and has become a symbol against war. In music, **la cumbia** is a dance rhythm from Colombia now popular across Latin America, with drums and accordion. The Chilean singer **Violeta Parra** wrote "Gracias a la vida," a song of gratitude. The Colombian writer **Gabriel García Márquez** wrote "Cien años de soledad," a novel in the style of magical realism, in which extraordinary events are told as ordinary.

To describe a work, say what it is, who made it, when, what you see or hear, and what it means to you: "En el cuadro hay dos mujeres. Los colores son rojos y blancos. Me hace pensar en la identidad."
`,
  ],
  cards: [
    ["Nochebuena", "Christmas Eve, December 24"],
    ["las Posadas", "Mexican Christmas processions, December 16 to 24"],
    ["el Día de los Reyes Magos", "Three Kings' Day, January 6"],
    ["la Rosca de Reyes", "ring-shaped sweet bread with a hidden figure"],
    ["las doce uvas", "twelve grapes eaten at midnight on New Year's Eve in Spain"],
    ["el Grito", "the cry of independence in Mexico on September 16"],
    ["el cuadro", "the painting"],
    ["el realismo mágico", "magical realism"],
  ],
  closed: [
    [
      "When do many Spanish-speaking children receive gifts from the Three Kings?",
      ["December 25", "January 6", "February 2", "November 1"],
      "B",
    ],
    [
      "What do people in Spain traditionally eat at midnight on New Year's Eve?",
      ["Twelve grapes", "Tamales", "Rosca de Reyes", "A turkey"],
      "A",
    ],
    [
      "Who painted \"Las dos Fridas\"?",
      ["Pablo Picasso", "Frida Kahlo", "Diego Rivera", "Salvador Dalí"],
      "B",
    ],
    [
      "\"Guernica\" is a painting about:",
      ["A family party", "The bombing of a town in the Spanish Civil War", "A cumbia festival", "A Christmas procession"],
      "B",
    ],
    [
      "What is \"el Grito\" in Mexico?",
      ["A type of music", "A cry of independence on September 16", "A Christmas dinner", "A painting"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain in Spanish two differences between how Christmas and New Year are celebrated in Spanish-speaking countries and how they are celebrated in your family or in Ohio. Write at least five sentences, using Nochebuena, los Reyes Magos, las doce uvas, or las Posadas.",
      scheme: [
        "Describes a celebration from a Spanish-speaking country correctly (Nochebuena, Reyes, uvas or Posadas)",
        "Describes the corresponding celebration in Ohio or their family",
        "Uses a comparison word (pero, mientras que, en cambio)",
        "States a second difference with correct present-tense verbs",
      ],
      model:
        "En muchos países hispanos la familia celebra la Nochebuena el 24 de diciembre con una cena tarde. En mi familia abrimos los regalos el 25 por la mañana. En España comen doce uvas a medianoche, mientras que en Ohio vemos la bola en la televisión.",
      answers: [
        [
          "full",
          "[[0|En México, la familia celebra las Posadas del 16 al 24 de diciembre con canciones y piñatas.]] [[1|En mi familia, ponemos el árbol y abrimos los regalos el 25 por la mañana.]] [[2|En España comen doce uvas a medianoche, mientras que nosotros vemos la bola de Nueva York en la televisión.]] [[3|También en muchos países los niños reciben regalos el 6 de enero, no solo el 25.]]",
          "Muy bien. Your comparison uses mientras que and gives two clear differences.",
        ],
        [
          "full",
          "[[0|La Nochebuena es la fiesta principal en muchos países hispanos, con una cena muy tarde.]] [[1|En mi casa cenamos temprano el 25 y después abrimos los regalos.]] [[2|En cambio, en España cada persona come doce uvas para tener buena suerte.]] [[3|Los niños reciben regalos de los Reyes Magos el 6 de enero, y en mi familia solo recibimos regalos de Santa Claus.]]",
          "Excelente. En cambio and the contrast with Santa Claus show good control.",
        ],
        [
          "partial",
          "[[0|En España comen doce uvas el 31 de diciembre.]] [[1|En Ohio nosotros comemos pavo.]] Los Reyes Magos son el 25 de diciembre.",
          "Los Reyes Magos come on January 6, not December 25. You described one difference well.",
        ],
        [
          "partial",
          "[[1|En mi familia abrimos los regalos el 25.]] [[2|En México hay las Posadas pero nosotros no tenemos.]] Las Posadas es una fiesta de cumpleaños.",
          "Las Posadas are processions during Christmas, not birthdays. Explain what they are in one sentence.",
          true,
        ],
        [
          "weak",
          "In Mexico there are Posadas before Christmas. In my family we open gifts on December 25. In Spain they eat grapes.",
          "Please write in Spanish: en México hay las Posadas. En mi familia abrimos los regalos el 25.",
        ],
        [
          "weak",
          "Navidad diferente. Mexico fiesta. Ohio regalos. Yo gusta.",
          "Use full sentences: en México celebran las Posadas, pero en Ohio abrimos los regalos el 25.",
        ],
      ],
    },
    {
      prompt:
        "Choose one work of art, music or literature from this unit (Las dos Fridas, Guernica, a cumbia, Gracias a la vida or Cien años de soledad). Write a description of at least five sentences in Spanish: what it is, who made it, what you see or hear, and what it makes you think or feel.",
      scheme: [
        "Identifies the work and its creator correctly",
        "Describes what is seen or heard using hay, es or son",
        "Describes colors, subjects or sounds using adjectives that agree",
        "Gives a personal interpretation using me hace pensar or me hace sentir",
      ],
      model:
        "Las dos Fridas es un cuadro de Frida Kahlo, pintado en 1939. En el cuadro hay dos mujeres sentadas y sus corazones están conectados. Los colores son rojos y blancos. Me hace pensar en la identidad y el dolor.",
      answers: [
        [
          "full",
          "[[0|Guernica es un cuadro de Pablo Picasso, de 1937.]] [[1|En el cuadro hay un caballo que grita, un toro y una mujer con su hijo muerto.]] [[2|Los colores son negro, blanco y gris, y las figuras son angulares.]] [[3|Me hace sentir tristeza y me hace pensar en los efectos de la guerra.]]",
          "Muy bien. Your adjectives agree and your interpretation is thoughtful.",
        ],
        [
          "full",
          "[[0|La cumbia es un ritmo de Colombia que ahora se escucha en toda América Latina.]] [[1|En la música hay tambores, acordeón y una voz alegre.]] [[2|El ritmo es rápido y las letras son sencillas.]] [[3|Me hace sentir feliz y me da ganas de bailar.]]",
          "Excelente. You described what you hear and gave your reaction.",
        ],
        [
          "partial",
          "[[0|Las dos Fridas es un cuadro de Frida Kahlo.]] [[1|Hay dos mujeres.]] Los colores es rojo y blanco. Me hace pensar.",
          "Colors is plural: los colores son rojos y blancos. Say what it makes you think about.",
        ],
        [
          "partial",
          "[[0|Cien años de soledad es un libro de García Márquez.]] [[3|Me hace pensar en la familia.]] El libro tiene muchos personajes grande.",
          "Personajes is plural and masculine: muchos personajes grandes. Say what you read or see in the story.",
          true,
        ],
        [
          "weak",
          "Guernica is a painting by Picasso. It is black and white. It is about war and it makes me sad.",
          "Please write in Spanish: Guernica es un cuadro de Picasso. Es negro y blanco. Me hace sentir tristeza.",
        ],
        [
          "weak",
          "Cuadro Frida. Dos mujer. Rojo. Yo gusta.",
          "Use full sentences: es un cuadro de Frida Kahlo, en el cuadro hay dos mujeres, me gusta.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Historia, ciencia y las noticias en dos idiomas",
  note: `
## Objectives

Students will be able to:

1. use Spanish to learn about history or science from an authentic source;
2. compare a Spanish-language news report with an English one on the same topic.

## Materials

A short Spanish article on the Panama Canal, the Inca quipu or Hurricane Maria; two news reports of the same event in Spanish and English (provided), a comparison chart, the quiz, problem set and worksheet.

## Starter (6 minutes)

Show a map of the Panama Canal. Ask: "¿Qué es el canal de Panamá? ¿Por qué es importante?" Collect prior knowledge in Spanish and English.

## Main activity

1. Reading for content: a text about the Panama Canal (opened in 1914, connects the Atlantic and Pacific, locks lift ships 26 meters, about 14,000 ships a year). Practice strategies: scan for numbers, cognates (canal, océano, construcción), time words, and the order of events.
2. Science in Spanish: a short text on how a hurricane forms (huracán, océano caliente, vientos, presión, ojo). Answer questions in Spanish.
3. Comparing news reports: look at a headline, the first paragraph, who is quoted, the vocabulary and the tone in a Spanish and an English report on the same event. Use a chart.

## Checking for understanding

Ask: "¿Qué información está en los dos informes? ¿Qué información solo está en uno?"

## Quiz, problem set and worksheet

Reading questions and a comparison paragraph.
`,
  reading: [
    "El canal de Panamá y las noticias en dos idiomas",
    `
Spanish is not only a school subject but a tool for learning about the world. Let us read a short text about history.

"El canal de Panamá es una vía de agua artificial que conecta el océano Atlántico con el océano Pacífico. Antes del canal, un barco que iba de Nueva York a San Francisco tenía que navegar unos 22,000 kilómetros alrededor de América del Sur. Con el canal, el viaje es de solo 9,500 kilómetros. La construcción empezó en 1904 y terminó en 1914. Miles de trabajadores de muchos países participaron, y muchos murieron por enfermedades como la fiebre amarilla y la malaria. El canal funciona con esclusas, que son como grandes ascensores de agua: suben los barcos hasta 26 metros sobre el nivel del mar y los bajan al otro lado. Cada año pasan por el canal unos 14,000 barcos. Hasta 1999, Estados Unidos controló el canal. Hoy pertenece a Panamá."

Some strategies help: scan for numbers (1904, 1914, 26 metros, 14,000), cognates (canal, océano, construcción, malaria) and words that show time (antes de, hasta, hoy). You can also guess unknown words from context: "esclusas, que son como grandes ascensores de agua" explains itself. The main idea is the history and importance of the canal; supporting details are its construction and operation.

Science texts work in the same way. A short passage might explain: "Un huracán se forma sobre océanos con agua caliente, de más de 26 grados. El aire caliente sube y crea una zona de baja presión. Los vientos giran alrededor del centro, que se llama el ojo. Cuando el huracán llega a la tierra, los vientos y la lluvia causan daños." You can recognize huracán, océano, presión and zona, and the structure shows cause and effect.

News is a good place to compare perspectives. When the same event is reported in Spanish and in English, notice the **headline**, the **first paragraph**, **who is quoted**, the **vocabulary** and the **tone**. A report written for Spanish-speaking readers in Latin America might give more space to local community voices, relatives abroad, or the economic effects on the region, while an English report might focus on policy or on the effect on the United States. Neither is necessarily "right" or "wrong"; they have different audiences and priorities. A chart with two columns, one for each article, and rows for headline, main facts, sources, and what is missing, helps to compare. Always check more than one source for important news.
`,
  ],
  cards: [
    ["el canal", "the canal"],
    ["las esclusas", "the locks (of a canal)"],
    ["el huracán", "hurricane"],
    ["el ojo del huracán", "the eye of the hurricane"],
    ["el titular", "the headline"],
    ["la fuente", "the source"],
    ["el tono", "the tone"],
    ["el informe", "the report"],
  ],
  closed: [
    [
      "What does the Panama Canal connect?",
      ["The Pacific and Indian Oceans", "The Atlantic and Pacific Oceans", "The Caribbean and the Mediterranean", "Lake Erie and Lake Michigan"],
      "B",
    ],
    [
      "In the passage, what are \"esclusas\"?",
      ["Types of ships", "Locks that raise and lower ships", "Workers", "Diseases"],
      "B",
    ],
    [
      "How many kilometers shorter is the trip from New York to San Francisco with the canal (22,000 vs 9,500)?",
      ["9,500", "12,500", "22,000", "31,500"],
      "B",
    ],
    [
      "When comparing news reports, which is NOT a useful element to compare?",
      ["The headline", "The sources quoted", "The tone", "The color of the page"],
      "D",
    ],
    [
      "Why can reports in Spanish and English on the same event differ?",
      ["They have different audiences and priorities", "One is always false", "Facts are different in each language", "They are written by the same person"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Read the passage about the Panama Canal in your reading, and answer in Spanish: (1) ¿Qué conecta el canal? (2) ¿Cuándo empezó y terminó su construcción? (3) ¿Por qué es importante? Write complete sentences with numbers from the text.",
      scheme: [
        "Says the canal connects the Atlantic and Pacific oceans (el Atlántico con el Pacífico)",
        "Gives the dates 1904 and 1914",
        "Gives a reason the canal is important, using the distance saved or the number of ships",
        "Writes complete sentences with correct verb forms",
      ],
      model:
        "El canal conecta el océano Atlántico con el océano Pacífico. La construcción empezó en 1904 y terminó en 1914. Es importante porque los barcos viajan 12,500 kilómetros menos y pasan unos 14,000 barcos cada año.",
      answers: [
        [
          "full",
          "(1) [[0|El canal conecta el océano Atlántico con el océano Pacífico.]] (2) [[1|La construcción empezó en 1904 y terminó en 1914.]] (3) [[2|Es importante porque los barcos viajan mucho menos, solo 9,500 kilómetros en vez de 22,000.]] [[3|Por el canal pasan unos 14,000 barcos cada año.]]",
          "Muy bien. You used precise numbers from the text and complete sentences.",
        ],
        [
          "full",
          "(1) [[0|Conecta el Atlántico y el Pacífico.]] (2) [[1|Empezaron en 1904 y terminaron en 1914.]] (3) [[2|Los barcos no tienen que navegar alrededor de América del Sur.]] [[3|Cada año pasan 14,000 barcos, y esto ahorra tiempo y dinero.]]",
          "Excelente. You added an inference, that the canal saves time and money.",
        ],
        [
          "partial",
          "(1) [[0|El canal conecta los océanos Atlántico y Pacífico.]] (2) La construcción fue en 1914. (3) Es importante porque es grande.",
          "Give both dates, 1904 and 1914, and a reason from the text, such as 9,500 km instead of 22,000.",
        ],
        [
          "partial",
          "(1) El canal es en Panamá. (2) [[1|Empezó en 1904 y terminó en 1914.]] (3) [[3|Pasan 14,000 barcos cada año.]]",
          "Say what the canal connects. Panama is where it is, not what it connects.",
          true,
        ],
        [
          "weak",
          "(1) It connects oceans. (2) 1914. (3) Because ships.",
          "Please answer in Spanish with complete sentences: el canal conecta el Atlántico con el Pacífico.",
        ],
        [
          "weak",
          "(1) Canal conecta lago. (2) Hoy. (3) Barco muerto.",
          "Reread the passage. The canal connects two oceans, it started in 1904, and ships save thousands of kilometers.",
        ],
      ],
    },
    {
      prompt:
        "Imagine you read two reports of a hurricane that hit Puerto Rico, one in Spanish for readers in Puerto Rico and one in English for readers in Ohio. In English, write a paragraph comparing what each might emphasize (headline, sources, details), and explain why it is useful to read both. Include one sentence in Spanish that could be a headline of the Spanish report.",
      scheme: [
        "Identifies a likely difference in emphasis (local damage and community voices versus national policy or the effect on the US)",
        "Identifies a difference in sources quoted or in the details given",
        "Explains that reading both gives a more complete picture",
        "Writes a plausible Spanish headline with correct grammar",
      ],
      model:
        "The Spanish report might focus on local damage, power outages and community voices, while the English report might focus on federal aid and the US response. They may also quote different sources. Reading both gives a more complete picture. Titular: Miles de familias siguen sin electricidad después del huracán.",
      answers: [
        [
          "full",
          "[[0|The Spanish report would likely focus on local damage, power outages and the stories of families in Puerto Rico.]] [[1|The English report may quote federal officials and focus on aid and policy.]] [[2|Reading both gives me a more complete picture because each shows details that the other leaves out.]] [[3|Titular: Miles de familias siguen sin electricidad después del huracán.]]",
          "Excelente. Your headline is grammatical and fits the report you described.",
        ],
        [
          "full",
          "[[0|A Puerto Rican newspaper would emphasize the effect on neighborhoods and the daily life of people.]] [[1|A paper in Ohio might quote the governor or the Red Cross and mention how Ohioans can help.]] [[2|Together, the two reports give a fuller view of the same event.]] [[3|Titular: Los vecinos se ayudan después del huracán.]]",
          "Muy bien. Using a different source type for each report supports your comparison.",
        ],
        [
          "partial",
          "[[0|The Spanish report would show more local stories.]] [[2|It is good to read both.]] Titular: Huracán es muy malo en Puerto Rico.",
          "Add the sources and details each report would include. For your headline say: el huracán causa daños graves en Puerto Rico.",
        ],
        [
          "partial",
          "[[1|The English report quotes government officials.]] [[3|Titular: El huracán llegó a la isla.]] The Spanish report is false.",
          "Neither report is false; they have different audiences. Explain why reading both helps.",
          true,
        ],
        [
          "weak",
          "They are the same because a hurricane is a hurricane. I do not need to read two reports.",
          "Reports can differ in focus and sources even about the same event. Compare headlines, sources and details.",
        ],
        [
          "weak",
          "The Spanish one is longer. Titular: Huracán.",
          "Length is not the main difference. Compare the focus, the sources and the audience. A headline should be a complete idea.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Los pasados en dos idiomas y una entrevista en la comunidad",
  note: `
## Objectives

Students will be able to:

1. explain how Spanish expresses the past differently from English;
2. interview a Spanish speaker in the community, with preparation, and report what they learned.

## Materials

A comparison chart of past tenses in English and Spanish, interview planning sheets, a list of local community contacts (a teacher, a parent, a business owner), a recording permission form, the problem set and worksheet.

## Starter (6 minutes)

Write on the board three English sentences: "I ate," "I was eating," "I used to eat." Ask: "¿Cómo se dicen en español?" Students give comí, comía and comía (with context). Notice that Spanish has two simple tenses where English uses several structures.

## Main activity

1. Comparison: English uses simple past (I ate), past progressive (I was eating) and "used to/would" for habits, while Spanish uses the preterite for completed events and the imperfect for ongoing or habitual actions. The imperfect covers was eating and used to eat. Some verbs change meaning (conocer, saber, querer).
2. Interviewing a Spanish speaker: prepare 8 to 10 questions with usted: ¿Cómo se llama? ¿De dónde es? ¿Cuándo llegó a Columbus? ¿Por qué decidió venir? ¿Cómo era su vida allí? ¿Qué extraña? ¿Qué consejo le daría a un estudiante?
3. Practice: role-play interviews. Plan the opening, follow-up questions and thank-you.
4. After the interview, write a report of five to six sentences in Spanish with the past tenses.

## Checking for understanding

Ask: "¿Qué pregunta de seguimiento haría usted si la persona dice 'Me mudé aquí en 2015'?"

## Problem set and worksheet

A tense explanation and an interview plan.
`,
  reading: [
    "Dos idiomas, dos maneras de hablar del pasado",
    `
English and Spanish both talk about the past, but they divide it differently. English uses the simple past ("I ate"), the past progressive ("I was eating") and the expressions "used to" or "would" for habits ("I used to eat at my grandmother's house"). Spanish uses mainly two simple tenses. The **preterite** (comí) tells of a completed event with a clear start or end. The **imperfect** (comía) tells of an action in progress, a habit or a description in the past. So the one form "comía" can mean "I was eating," "I used to eat," or "I would eat," depending on the context. Another difference is that some verbs change meaning between the tenses: "Conocí a Marta ayer" means "I met Marta yesterday," but "Conocía a Marta" means "I knew Marta." "Supe la noticia" means "I found out the news," while "Sabía la noticia" means "I knew the news." "No quise ir" means "I refused to go," and "No quería ir" means "I did not want to go." Learners from English often use one tense for both ideas, and the result may be understandable but sound unnatural. Practice noticing the question: Was it an event that happened, or a background or a habit?

One of the most valuable ways to practice a language is to talk with real speakers. In Columbus and in Ohio there are people from Mexico, Puerto Rico, Guatemala, Colombia, Venezuela and Spain, who are neighbors, colleagues, shop owners and family members of your classmates. An **entrevista** (interview) is a great way to learn from them. Preparation matters. Choose a person respectfully and ask permission, explain that it is for a class assignment, and ask if you may take notes or record. Write eight to ten open-ended questions in the **usted** form: "¿Cómo se llama usted?" "¿De dónde es?" "¿Cuándo llegó a Columbus?" "¿Por qué decidió venir?" "¿Cómo era su vida en su país?" "¿Qué extraña más?" "¿Qué cosa le sorprendió cuando llegó?" "¿Qué consejo le daría a un estudiante de español?" Plan follow-up questions such as "¿Puede explicarme más?" Begin with a greeting and thank the person at the end. After the interview, write a report: "Hablé con el señor Rivera, que llegó a Columbus en 2015. En México era maestro y trabajaba en una escuela pequeña. Decidió venir porque quería una vida mejor para sus hijos. Dice que extraña la comida de su madre."

In your report, use the preterite for what he did (llegó, decidió) and the imperfect for descriptions and habits (era, trabajaba, quería).
`,
  ],
  cards: [
    ["comí / comía", "I ate / I was eating or used to eat"],
    ["Conocí a Marta.", "I met Marta."],
    ["Conocía a Marta.", "I knew Marta."],
    ["la entrevista", "the interview"],
    ["¿Cuándo llegó usted?", "When did you arrive? (formal)"],
    ["¿Puede explicarme más?", "Can you explain more to me?"],
    ["extrañar", "to miss (someone or something)"],
    ["una pregunta abierta", "an open-ended question"],
  ],
  closed: [
    [
      "\"Conocía a Marta\" means:",
      ["I met Marta", "I knew Marta", "I will meet Marta", "I am meeting Marta"],
      "B",
    ],
    [
      "Which English structures does the Spanish imperfect often translate?",
      ["Only the simple past", "Was eating and used to eat", "Only the future", "Only commands"],
      "B",
    ],
    [
      "Which form of address is used in a respectful interview?",
      ["tú", "usted", "vos", "vosotros"],
      "B",
    ],
    [
      "Which question is the best open-ended interview question?",
      ["¿Vive en Ohio?", "¿Cómo era su vida antes de venir a Columbus?", "¿Tiene un perro?", "¿Es de México?"],
      "B",
    ],
    [
      "\"No quise ir\" means:",
      ["I did not want to go", "I refused to go", "I will not go", "I never go"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain in English how Spanish expresses the past differently from English. Use the example 'I was eating when she arrived' and the verbs conocer or saber to show how meaning changes between the preterite and the imperfect. Give one Spanish sentence for each.",
      scheme: [
        "States that Spanish has two simple pasts, the preterite for completed events and the imperfect for ongoing or habitual actions",
        "Translates 'I was eating when she arrived' as Comía cuando ella llegó",
        "Explains that conocí means met and conocía means knew (or saber / supe)",
        "Notes that English uses different structures (was eating, used to) where Spanish uses the imperfect",
      ],
      model:
        "Spanish has two simple pasts: the preterite for completed events and the imperfect for ongoing or habitual actions. 'I was eating when she arrived' is Comía cuando ella llegó. Conocí a Marta means I met her, and Conocía a Marta means I knew her. English uses was eating or used to where Spanish uses the imperfect.",
      answers: [
        [
          "full",
          "[[0|Spanish has two simple past tenses: the preterite for events that are complete and the imperfect for actions in progress or habits.]] [[1|'I was eating when she arrived' is: Comía cuando ella llegó.]] [[2|With conocer, 'Conocí a Marta' means I met her, but 'Conocía a Marta' means I knew her.]] [[3|English uses was eating or used to, but Spanish uses the same imperfect form for both.]]",
          "Excelente. Your examples show exactly how meaning changes with the tense.",
        ],
        [
          "full",
          "[[0|The preterite is for something that happened and ended, and the imperfect is for background, habits and ongoing actions.]] [[1|Estaba comiendo cuando ella llegó, or comía cuando ella llegó.]] [[2|Supe la noticia means I found out the news, and Sabía la noticia means I already knew it.]] [[3|In English we choose among simple past, was doing and used to, while Spanish has to choose between preterite and imperfect.]]",
          "Muy bien. Using saber as a second example is helpful.",
        ],
        [
          "partial",
          "[[0|Spanish has two past tenses, preterite and imperfect.]] [[1|Comía cuando ella llegó.]] Conocí and conocía mean the same thing.",
          "Conocí means I met and conocía means I knew. The tense changes the meaning.",
        ],
        [
          "partial",
          "[[2|Conocí means met and conocía means knew.]] [[3|English uses used to.]] Spanish uses only one past tense.",
          "Spanish uses two simple past tenses. Explain the difference between them in one sentence.",
          true,
        ],
        [
          "weak",
          "Spanish and English are the same in the past tense. You just add -ed in English and -é in Spanish.",
          "Spanish has two simple past tenses (preterite and imperfect), and the choice depends on the type of action.",
        ],
        [
          "weak",
          "[[1|Comía cuando ella llegó.]] The imperfect is the past tense for long words and the preterite is for short words.",
          "The choice depends on the meaning, not the length of the word. The preterite is for completed events, the imperfect is for ongoing or habitual ones.",
        ],
      ],
    },
    {
      prompt:
        "Prepare an interview with a Spanish speaker in your community. Write six questions in Spanish in the usted form: two about the person's background, two about their past life (use the imperfect or preterite), one follow-up question, and one for advice. Then write a one-sentence thank-you.",
      scheme: [
        "Writes questions in the correct usted form (¿cómo se llama usted?, ¿de dónde es?)",
        "Includes two questions about the past with correct tense choice (¿cómo era su vida?, ¿cuándo llegó?)",
        "Includes a follow-up question (¿puede explicarme más?) and a question for advice",
        "Writes a polite thank-you sentence",
      ],
      model:
        "¿Cómo se llama usted? ¿De dónde es? ¿Cuándo llegó a Columbus? ¿Cómo era su vida en su país? ¿Puede explicarme más sobre su trabajo? ¿Qué consejo le daría a un estudiante? Muchas gracias por su tiempo.",
      answers: [
        [
          "full",
          "[[0|¿Cómo se llama usted? ¿De dónde es?]] [[1|¿Cuándo llegó a Columbus? ¿Cómo era su vida en México?]] [[2|¿Puede explicarme más sobre su trabajo? ¿Qué consejo le daría a un estudiante de español?]] [[3|Muchas gracias por su tiempo y por sus respuestas.]]",
          "Muy bien. All six questions use the formal register and there is a good variety.",
        ],
        [
          "full",
          "[[0|¿Cómo se llama? ¿Qué hace usted en Columbus?]] [[1|¿Por qué decidió venir? ¿Qué extrañaba más de su país?]] [[2|¿Podría contarme una historia de su primer año aquí? ¿Qué le recomienda a las personas que quieren aprender español?]] [[3|Le agradezco mucho su tiempo.]]",
          "Excelente. The question about the first year invites a story, which is a great technique.",
        ],
        [
          "partial",
          "[[0|¿Cómo te llamas? ¿De dónde eres?]] [[1|¿Cuándo llegó a Columbus?]] [[2|¿Puede explicarme más?]] Gracias por tiempo.",
          "With an adult in the community use usted: ¿cómo se llama? ¿de dónde es? The thank-you needs su: gracias por su tiempo.",
        ],
        [
          "partial",
          "[[0|¿Cómo se llama usted?]] [[1|¿Cómo era su vida?]] ¿Tiene hijos? ¿Le gusta Ohio? [[3|Muchas gracias.]]",
          "Open questions work better than yes-or-no questions. Add a follow-up question and a question asking for advice.",
          true,
        ],
        [
          "weak",
          "What is your name? Where are you from? When did you arrive? Thank you for your time.",
          "Please write the questions in Spanish in the usted form: ¿cómo se llama usted? ¿de dónde es?",
        ],
        [
          "weak",
          "Nombre? De dónde? Cuándo Columbus? Gracias.",
          "Use full polite questions: ¿cómo se llama usted? ¿de dónde es? ¿cuándo llegó a Columbus?",
        ],
      ],
    },
  ],
};

writeCourse("spanish-iii-grade-11.json", "Spanish III", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
