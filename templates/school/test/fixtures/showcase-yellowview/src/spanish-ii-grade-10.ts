import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Spanish II, Grade 10, Quarter 1. Standards: ACTFL World-Readiness
 * Standards, in the school's own words. Prompts give English support where a
 * second-year learner needs it; learners answer in Spanish with the slips of
 * a second-year student (agreement, accents, reflexive pronouns, stem changes).
 */

const w1: WeekInput = {
  topic: "Mi rutina diaria y los verbos con cambio de raíz",
  note: `
## Objectives

Students will be able to:

1. review greetings and introductions, and talk about family, school and free time in complete sentences;
2. describe their daily routine using reflexive verbs such as despertarse and ducharse;
3. use stem-changing verbs in the present tense to express wants, preferences and abilities.

## Materials

A sequence of picture cards of a daily routine, a stem-change verb chart with boots drawn around the forms, whiteboards, the problem set and worksheet.

## Starter (7 minutes)

Review in pairs: "Preséntate. ¿Cómo se llama tu familia? ¿Qué te gusta hacer en tu tiempo libre?" Listen for complete sentences. Write two good ones on the board.

## Main activity

1. Reflexive verbs: the pronoun matches the subject (me, te, se, nos, se). Teach despertarse (me despierto), levantarse, ducharse, vestirse (me visto), cepillarse los dientes, peinarse, acostarse. With body parts and clothes use the article: me cepillo los dientes, not mis dientes. With the infinitive the pronoun can attach: voy a ducharme.
2. Stem-changing verbs: e to ie (querer, preferir, empezar), o to ue (poder, dormir, volver), u to ue (jugar), e to i (pedir). Draw a boot around the forms: nosotros and vosotros do not change.
3. Pair task: "Mi rutina de lunes a viernes." Students describe their morning in six sentences.

## Checking for understanding

Whiteboards: conjugate querer for yo, tú, nosotros. Write one sentence with a reflexive verb.

## Problem set and worksheet

Reflexive pronouns and stem changes.
`,
  reading: [
    "Un día normal en mi vida",
    `
When we talk about our daily routine in Spanish, many of the verbs are **reflexive**. A reflexive verb has a pronoun that shows that the person does the action to himself or herself. The infinitive ends in **-se**: despertarse (to wake up), levantarse (to get up), ducharse (to shower), vestirse (to get dressed), cepillarse los dientes (to brush one's teeth), peinarse (to comb one's hair) and acostarse (to go to bed). The pronoun changes with the subject: **me** (yo), **te** (tú), **se** (él, ella, usted), **nos** (nosotros), **se** (ellos, ustedes). The pronoun goes before the conjugated verb: "Me despierto a las seis y media." With body parts and clothing, use the definite article, not the possessive: "Me cepillo los dientes," not "me cepillo mis dientes." When there is an infinitive, you can put the pronoun before the first verb or attach it to the infinitive: "Voy a ducharme" or "Me voy a duchar."

Many verbs also **change their stem** in the present tense. In the "boot verbs," the vowel in the stem changes in all forms except **nosotros** (and vosotros). With **e → ie**: querer: quiero, quieres, quiere, queremos, quieren; also preferir, empezar, pensar. With **o → ue**: poder: puedo, puedes, puede, podemos, pueden; also dormir, volver, almorzar. With **u → ue**: jugar: juego, juegas, juega, jugamos, juegan. With **e → i**: pedir: pido, pides, pide, pedimos, piden. These verbs are very useful for wants, preferences and abilities: "Quiero estudiar medicina." "Prefiero levantarme tarde los sábados." "No puedo jugar hoy porque tengo que trabajar."

Read how one student from Columbus describes a typical day.

"Los días de escuela me despierto a las seis y cuarto. Me levanto, me ducho y me visto en veinte minutos. Desayuno con mi hermana y después tomo el autobús. Las clases empiezan a las siete y media. Por la tarde juego al fútbol con el equipo. Mi entrenador quiere que practiquemos todos los días. Después de la cena hago la tarea. Me acuesto a las diez y media porque necesito dormir ocho horas. Los fines de semana prefiero dormir hasta tarde."

Notice how the paragraph uses the verbs in order and connects activities with time expressions: los días de escuela, por la tarde, después de la cena, los fines de semana.
`,
  ],
  cards: [
    ["despertarse", "to wake up"],
    ["me levanto", "I get up"],
    ["se ducha", "he or she showers"],
    ["cepillarse los dientes", "to brush one's teeth"],
    ["quiero / queremos", "I want / we want"],
    ["puedo / podemos", "I can / we can"],
    ["juego / jugamos", "I play / we play"],
    ["acostarse", "to go to bed"],
  ],
  closed: [
    [
      "Which reflexive pronoun goes with \"yo\"?",
      ["te", "se", "me", "nos"],
      "C",
    ],
    [
      "What is the correct form: \"Nosotros ___ a las diez.\" (acostarse)?",
      ["me acuesto", "nos acostamos", "se acuestan", "te acuestas"],
      "B",
    ],
    [
      "Which sentence correctly uses the verb querer?",
      ["Yo quero un helado.", "Yo quiero un helado.", "Yo queiro un helado.", "Yo quieres un helado."],
      "B",
    ],
    [
      "How do you say \"I brush my teeth\"?",
      ["Me cepillo mis dientes", "Me cepillo los dientes", "Cepillo me los dientes", "Se cepilla los dientes"],
      "B",
    ],
    [
      "Which verb does NOT change its stem in the nosotros form?",
      ["poder", "jugar", "pedir", "all of these"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Write six sentences in Spanish describing your routine on a school day. Use at least three different reflexive verbs and give a time for two of them.",
      scheme: [
        "Uses a reflexive verb with the correct pronoun (me / se / nos ...)",
        "Uses three different reflexive verbs in the answer",
        "Gives times for at least two activities",
        "Uses correct verb endings with accents and the article with body parts and clothes",
      ],
      model:
        "Me despierto a las seis y media. Me levanto y me ducho. Me visto y me cepillo los dientes. Desayuno con mi familia. Tomo el autobús a las siete. Me acuesto a las diez.",
      answers: [
        [
          "full",
          "[[0|Me despierto a las seis y cuarto.]] [[1|Me ducho, me visto y me peino.]] Desayuno con mi hermano. Voy a la escuela en autobús. [[2|Las clases empiezan a las siete y media y terminan a las tres.]] [[3|Por la noche me cepillo los dientes y me acuesto a las diez.]]",
          "Muy bien. Your reflexive pronouns match the subject, and you used los dientes without a possessive.",
        ],
        [
          "full",
          "Los lunes [[0|me levanto a las cinco y media]] porque tengo práctica de fútbol. [[1|Me ducho, me visto y me cepillo los dientes]] muy rápido. Mi madre prepara el desayuno. [[2|A las seis y media salgo de casa y a las siete llego a la escuela.]] [[3|Me acuesto a las diez y media porque necesito dormir.]]",
          "Excelente. Your paragraph flows well in order, with a reason with porque.",
        ],
        [
          "partial",
          "[[0|Me despierto a las seis.]] [[1|Me ducho y me visto.]] Yo cepillo mis dientes. Voy a la escuela a las siete y media.",
          "With body parts use the reflexive pronoun and the article: me cepillo los dientes. You gave one time; add another.",
        ],
        [
          "partial",
          "Yo [[0|me levanto]] a las seis. Mi hermana se ducha y se viste. [[2|Las clases empiezan a las ocho.]] Yo me acuesto a las diez.",
          "You use the reflexive well. Add a third verb in your own routine, such as me ducho, and keep the pronoun with each one.",
          true,
        ],
        [
          "weak",
          "I wake up at six. I take a shower and get dressed. I go to school. I go to bed at ten.",
          "Please write this in Spanish. Use me despierto, me ducho, me visto and me acuesto.",
        ],
        [
          "weak",
          "Yo despierto a las seis y yo ducho, yo vestir y acuesto a las diez.",
          "Add the reflexive pronoun and conjugate: me despierto, me ducho, me visto, me acuesto.",
        ],
      ],
    },
    {
      prompt:
        "Write five sentences about what you and your friends want, prefer and can or cannot do on weekends. Use querer, preferir, poder and one other stem-changing verb (jugar, dormir, volver or pedir).",
      scheme: [
        "Uses a correct form of querer (quiero, quiere, queremos...)",
        "Uses a correct form of preferir or poder",
        "Uses a fourth stem-changing verb correctly",
        "Avoids stem-change errors in the nosotros form and uses accents correctly",
      ],
      model:
        "Quiero ir al cine con mis amigos. Mis amigos prefieren jugar al fútbol. No puedo salir porque tengo que estudiar. Nosotros podemos jugar a las cuatro. Los domingos duermo hasta tarde.",
      answers: [
        [
          "full",
          "Este fin de semana [[0|quiero ir al centro con mis amigos]]. [[1|Mi amigo Sam prefiere jugar al básquetbol y yo puedo ir después.]] [[2|Los sábados dormimos hasta las diez.]] [[3|Nosotros podemos y queremos mucho descansar.]] Mis padres piden pizza.",
          "Muy bien. Notice that nosotros podemos and dormimos have no stem change, which you got right.",
        ],
        [
          "full",
          "[[0|Mis amigos y yo queremos ver una película.]] [[1|Ellos prefieren la comedia, pero yo prefiero el terror.]] [[2|No puedo ir el domingo porque trabajo.]] [[3|Mi hermano juega al fútbol y vuelve a casa a las seis.]]",
          "Excelente. A good variety of verbs, with reasons and contrast.",
        ],
        [
          "partial",
          "[[0|Yo quiero ir al cine.]] [[1|Mi amiga prefiere jugar.]] Nosotros puedemos ir a las cuatro. Yo duermo mucho.",
          "The nosotros form of poder is podemos, with no stem change. The other forms are correct.",
        ],
        [
          "partial",
          "[[0|Quiero dormir mucho.]] Mis amigos quieren jugamos al fútbol. [[2|Prefiero ver televisión.]]",
          "After quieren use an infinitive: quieren jugar al fútbol. Your yo forms are right.",
          true,
        ],
        [
          "weak",
          "I want to sleep in. My friends prefer to play soccer. We can go to the movies. I can't go on Sunday.",
          "Please answer in Spanish using quiero, prefieren, podemos and no puedo.",
        ],
        [
          "weak",
          "Yo querer dormir. Mi amigos preferir jugar. Nosotros poder ir al cine.",
          "Conjugate each verb: quiero dormir, mis amigos prefieren jugar, nosotros podemos ir.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Mi casa, las tareas del hogar y los planes del fin de semana",
  note: `
## Objectives

Students will be able to:

1. talk about household chores and their home using vocabulary for rooms and furniture;
2. use ir a plus an infinitive to talk about plans for the weekend.

## Materials

A floor plan of a house with labeled rooms, chore picture cards, a weekend planner template, the worksheet.

## Starter (6 minutes)

Show a floor plan of a house in Columbus. Ask in Spanish: "¿Cuántas habitaciones hay? ¿Dónde está la cocina?" Students answer with hay and estar. Review prepositions: al lado de, cerca de, debajo de, encima de.

## Main activity

1. Rooms and furniture: la sala, el comedor, la cocina, el dormitorio, el baño, el garaje, el sótano; el sofá, la mesa, la cama, el escritorio, la lámpara. Describe a house: "Mi casa tiene tres dormitorios y dos baños. En mi cuarto hay una cama y un escritorio."
2. Chores: lavar los platos, sacar la basura, pasar la aspiradora, barrer el piso, hacer la cama, cortar el césped, ayudar en casa. Discuss: ¿Quién hace qué en tu casa? Use tener que + infinitive (tengo que).
3. Future plans with ir a: voy a, vas a, va a, vamos a, van a + infinitive. Explain that "ir a" is a combination with the verb ir, and "voy a ir" is possible.
4. Pair task: plan a weekend. "El sábado voy a ayudar en casa y después vamos a ir al cine."

## Checking for understanding

Cold-call: "¿Qué vas a hacer este fin de semana?"

## Worksheet

Rooms, chores and plans.
`,
  reading: [
    "Mi casa y mi fin de semana",
    `
To describe a home in Spanish, you need the names of the rooms. In a typical house there is **la sala** (the living room), **el comedor** (the dining room), **la cocina** (the kitchen), **el dormitorio** or **el cuarto** (the bedroom), **el baño** (the bathroom), **el garaje** and, in many Ohio homes, **el sótano** (the basement). Furniture includes **el sofá**, **la mesa**, **las sillas**, **la cama**, **el escritorio** and **la lámpara**. We describe the number of rooms with **tener** and the contents with **hay**: "Mi casa tiene tres dormitorios y dos baños. En mi cuarto hay una cama, un escritorio y una lámpara." To say where things are, use **estar** with prepositions such as **al lado de** (next to), **cerca de** (near), **debajo de** (under), **encima de** (on top of), **entre** (between): "La lámpara está encima del escritorio."

Everyone in a family helps. Common chores are **lavar los platos** (to wash the dishes), **sacar la basura** (to take out the trash), **pasar la aspiradora** (to vacuum), **barrer el piso** (to sweep the floor), **hacer la cama** (to make the bed), **cortar el césped** (to mow the lawn) and **limpiar el baño** (to clean the bathroom). To say what you must do, use **tener que** + infinitive: "Tengo que sacar la basura los martes." To say what you do not like, use **no me gusta**: "No me gusta lavar los platos."

To talk about the future in Spanish, you can use **ir a** + infinitive, which is like "going to" in English. The verb **ir** is irregular: **voy, vas, va, vamos, van**. "Voy a estudiar." "Mis amigos van a jugar al fútbol." "Nosotros vamos a ir al cine." Time expressions help: **mañana**, **este fin de semana**, **el sábado por la tarde**, **la próxima semana**.

Read this message from a student to a friend.

"Hola, Ana. Este fin de semana voy a estar muy ocupada. El sábado por la mañana tengo que limpiar mi cuarto y pasar la aspiradora en la sala. Después mi familia va a comer en un restaurante mexicano. Por la tarde mis primos y yo vamos a ver una película. El domingo mi padre va a cortar el césped y yo voy a ayudarlo. ¿Qué vas a hacer tú? ¿Vamos a estudiar juntas el domingo por la noche?"
`,
  ],
  cards: [
    ["la sala", "the living room"],
    ["el sótano", "the basement"],
    ["sacar la basura", "to take out the trash"],
    ["pasar la aspiradora", "to vacuum"],
    ["cortar el césped", "to mow the lawn"],
    ["tengo que + infinitive", "I have to + verb"],
    ["voy a / vas a / va a", "I am going to / you are going to / he or she is going to"],
    ["encima de", "on top of"],
  ],
  closed: [
    [
      "How do you say \"We are going to watch a movie\"?",
      ["Vamos ver una película", "Vamos a ver una película", "Vamos a viendo una película", "Vemos a una película"],
      "B",
    ],
    [
      "Which room is \"el sótano\"?",
      ["The kitchen", "The basement", "The garage", "The living room"],
      "B",
    ],
    [
      "Which sentence says \"I have to take out the trash\"?",
      ["Tengo sacar la basura", "Tengo que sacar la basura", "Tengo de sacar la basura", "Tiene que sacar la basura"],
      "B",
    ],
    [
      "\"La lámpara está encima del escritorio\" means:",
      ["The lamp is under the desk", "The lamp is on top of the desk", "The lamp is next to the desk", "The lamp is in the desk"],
      "B",
    ],
    [
      "Which form of ir goes with \"ellos\"?",
      ["voy", "va", "vamos", "van"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Describe your home in Spanish in five sentences. Say how many bedrooms and bathrooms it has, name two other rooms, and say where two pieces of furniture are in your room, using estar with a preposition.",
      scheme: [
        "States the number of bedrooms and bathrooms with tiene",
        "Names two other rooms with correct articles",
        "Gives the location of a piece of furniture with estar and a preposition",
        "Gives the location of a second piece of furniture with correct agreement",
      ],
      model:
        "Mi casa tiene tres dormitorios y dos baños. También hay una sala, una cocina y un garaje. En mi cuarto, la cama está al lado de la ventana. El escritorio está debajo de la lámpara.",
      answers: [
        [
          "full",
          "[[0|Mi casa tiene cuatro dormitorios y dos baños.]] [[1|También tiene una sala grande y una cocina moderna.]] [[2|En mi cuarto la cama está al lado de la ventana.]] [[3|El escritorio está debajo de la lámpara y el sofá está cerca de la puerta.]]",
          "Muy bien. Your articles and adjectives agree, and you used estar with different prepositions.",
        ],
        [
          "full",
          "[[0|Mi casa tiene tres dormitorios y un baño.]] [[1|Hay también un comedor, un sótano y un garaje.]] [[2|Mi escritorio está entre la cama y el armario.]] [[3|La lámpara está encima del escritorio.]]",
          "Excelente. You used entre, which was not in the model, and it is correct.",
        ],
        [
          "partial",
          "[[0|Mi casa tiene dos dormitorios y un baño.]] Hay una sala y una cocina. La cama es al lado de la ventana. [[3|El escritorio está debajo de la lámpara.]]",
          "For location use estar, not ser: la cama está al lado de la ventana.",
        ],
        [
          "partial",
          "[[1|Mi casa tiene una cocina grande y una sala pequeño.]] [[2|Mi cama está cerca de la ventana.]] Mi casa tiene tres cuartos.",
          "Sala is feminine: una sala pequeña. State dormitorios and baños too, with their numbers.",
          true,
        ],
        [
          "weak",
          "My house has three bedrooms and two bathrooms. My bed is next to the window.",
          "Please write in Spanish: mi casa tiene tres dormitorios y dos baños. Mi cama está al lado de la ventana.",
        ],
        [
          "weak",
          "Mi casa es tres cuartos. La cama es ventana. Escritorio lámpara.",
          "Use tiene for what the house has, and está plus a preposition: la cama está al lado de la ventana.",
        ],
      ],
    },
    {
      prompt:
        "Write a message of at least five sentences to a friend telling what you are going to do this weekend and which chores you have to do. Use ir a + infinitive at least three times and tener que + infinitive once.",
      scheme: [
        "Uses ir a plus an infinitive correctly at least three times",
        "Uses the correct form of ir for each subject (voy, vamos, van)",
        "Uses tener que plus an infinitive correctly",
        "Names a chore and a time expression (el sábado, por la tarde)",
      ],
      model:
        "Hola, Ana. El sábado voy a limpiar mi cuarto. Tengo que sacar la basura también. Por la tarde mis amigos y yo vamos a ver una película. El domingo mi familia va a comer en un restaurante.",
      answers: [
        [
          "full",
          "Hola, Carlos. Este fin de semana [[0|voy a cortar el césped]] el sábado por la mañana. [[3|Tengo que lavar los platos también.]] Por la tarde [[1|mis amigos y yo vamos a jugar al fútbol]]. El domingo [[2|mi familia va a visitar a mis abuelos]]. ¿Qué vas a hacer tú?",
          "Muy bien. Your forms of ir match their subjects, and the question at the end is natural.",
        ],
        [
          "full",
          "Querida Mia: El sábado [[0|voy a pasar la aspiradora]] y [[1|mis hermanos van a barrer el piso]]. [[3|Tengo que ayudar en casa antes de salir.]] Después [[2|vamos a ir al centro comercial]]. El domingo voy a estudiar para el examen.",
          "Excelente. Your message uses four different forms of ir in a natural way.",
        ],
        [
          "partial",
          "Hola. El sábado [[0|voy a limpiar mi cuarto]]. Tengo sacar la basura. [[1|Mis amigos van a venir a mi casa.]] Nosotros vamos ver una película.",
          "Write tengo que sacar la basura and vamos a ver una película, with que and a.",
        ],
        [
          "partial",
          "Yo [[0|voy a estudiar]] el sábado. El domingo [[3|tengo que cortar el césped]]. Mis padres va a trabajar.",
          "Parents are plural: mis padres van a trabajar. You need ir a at least three times.",
          true,
        ],
        [
          "weak",
          "Hi. This weekend I am going to clean my room, and then I am going to watch a movie. I have to take out the trash.",
          "Please write the message in Spanish, using voy a limpiar and tengo que sacar la basura.",
        ],
        [
          "weak",
          "Yo ir limpiar cuarto. Mis amigos ir cine. Yo tener basura sábado.",
          "Conjugate ir and add a: voy a limpiar, mis amigos van al cine. Use tengo que sacar la basura.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "En el restaurante y los pronombres de objeto directo",
  note: `
## Objectives

Students will be able to:

1. order food in a restaurant and discuss meals and food preferences;
2. use direct object pronouns to avoid repetition when talking about food and shopping.

## Materials

A menu from a Mexican restaurant, role-play cards for waiter and customer, picture cards of foods, whiteboards, the worksheet and quiz.

## Starter (6 minutes)

Hand students a menu and ask: "¿Qué quieres comer? ¿Qué vas a pedir?" Collect answers and write the polite forms: Quisiera..., Para mí..., Me gustaría...

## Main activity

1. Meals and foods: el desayuno, el almuerzo, la cena; el pollo, la carne, el pescado, el arroz, los frijoles, la ensalada, el jugo, el agua, el postre. Restaurant phrases: ¿Qué desea tomar? Quisiera... Para mí... La cuenta, por favor. ¿Está incluida la propina?
2. Direct object pronouns: lo, la, los, las replace a noun that receives the action. "¿Quieres el pollo? Sí, lo quiero." "¿Compras las frutas? Sí, las compro." Placement before the conjugated verb, or attached to an infinitive: "Voy a comprarlo" or "Lo voy a comprar."
3. Role-play: a waiter and a customer. The customer orders at least three things and answers questions using object pronouns.

## Checking for understanding

Whiteboards: replace the noun with a pronoun: "Pido la sopa." "Compramos los tomates."

## Worksheet and quiz

Ordering and pronouns.
`,
  reading: [
    "En un restaurante mexicano de Columbus",
    `
Eating out is a good place to practice real conversation. In a restaurant, the **mesero** or **camarero** (waiter) brings the **menú** and asks, "¿Qué desea tomar?" or "¿Qué van a pedir?" There are polite ways to order. Instead of the direct "Quiero un taco," it is nicer to say **"Quisiera un taco"** or **"Me gustaría un taco"** (I would like a taco), or **"Para mí, el pollo con arroz"** (For me, the chicken with rice). Later you ask for the bill: **"La cuenta, por favor."** In many Spanish-speaking countries, a tip (la propina) is often included, so you may ask, **"¿Está incluida la propina?"** The meals of the day are **el desayuno** (breakfast), **el almuerzo** (lunch) and **la cena** (dinner). Typical foods include **el pollo, la carne, el pescado, el arroz, los frijoles, la ensalada, la sopa, el pan** and, to drink, **el agua, el jugo, la limonada**. For dessert, **el postre**, there might be **el flan** or **los churros**.

When we talk about food, we often repeat the same noun. To avoid this, Spanish uses **direct object pronouns**, which replace the noun that receives the action of the verb. They are **lo** (masculine singular), **la** (feminine singular), **los** (masculine plural) and **las** (feminine plural). The pronoun agrees with the noun it replaces and goes **before the conjugated verb**.

— ¿Quieres el pollo?
— Sí, **lo** quiero.
— ¿Pides la ensalada?
— No, no **la** pido.
— ¿Compras los tomates?
— Sí, **los** compro en el mercado.
— ¿Preparas las enchiladas?
— Sí, **las** preparo con queso.

When the sentence has a conjugated verb followed by an infinitive, you can put the pronoun before the first verb or attach it to the end of the infinitive: **"Lo voy a comer"** or **"Voy a comerlo."** In the negative, put no before the pronoun: **"No lo quiero."**

Here is a short dialogue in a Mexican restaurant in Columbus.

— Buenas tardes. ¿Qué desean tomar?
— Quisiera un jugo de naranja, por favor. Y para comer, las enchiladas de pollo.
— ¿Y usted?
— Para mí, la sopa y una ensalada. ¿Tienen flan?
— Sí, lo tenemos. ¿Lo quiere de postre?
— Sí, lo quiero. Y la cuenta, por favor.
`,
  ],
  cards: [
    ["Quisiera + item", "I would like + item"],
    ["Para mí + dish", "For me + dish"],
    ["La cuenta, por favor.", "The check, please."],
    ["la propina", "the tip"],
    ["el almuerzo", "lunch"],
    ["lo / la", "it, him, her (direct object, singular)"],
    ["los / las", "them (direct object, plural)"],
    ["Voy a comerlo.", "I am going to eat it."],
  ],
  closed: [
    [
      "Which pronoun replaces \"las enchiladas\" in \"Pido las enchiladas\"?",
      ["lo", "la", "los", "las"],
      "D",
    ],
    [
      "Which is the most polite way to order a taco?",
      ["Quiero un taco", "Dame un taco", "Quisiera un taco, por favor", "Un taco ya"],
      "C",
    ],
    [
      "Rewrite with a pronoun: \"Voy a pedir el flan.\"",
      ["Voy a pedirla", "Voy a pedirlo", "Voy a pedirlos", "Lo voy a pedirlo"],
      "B",
    ],
    [
      "\"¿Está incluida la propina?\" asks about:",
      ["The menu", "The tip", "The drinks", "The reservation"],
      "B",
    ],
    [
      "Which sentence correctly says \"I want it\" about the soup?",
      ["Los quiero la sopa", "La sopa lo quiero", "La quiero", "Quiero la la"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "You are at a Mexican restaurant in Columbus. Write a dialogue of at least six lines between a waiter and a customer. The customer should order a drink, a main dish and a dessert using a polite form (quisiera / para mí / me gustaría) and ask for the bill.",
      scheme: [
        "The waiter asks what the customer wants to order",
        "The customer uses a polite ordering form (quisiera, para mí or me gustaría)",
        "The customer orders a drink, a main dish and a dessert using food vocabulary correctly",
        "The customer asks for the bill with la cuenta, por favor",
      ],
      model:
        "— Buenas tardes. ¿Qué desea tomar? — Quisiera un jugo de naranja, por favor. — ¿Y para comer? — Para mí, los tacos de pollo. — ¿Desea postre? — Me gustaría el flan. — Muy bien. — La cuenta, por favor.",
      answers: [
        [
          "full",
          "— Buenas tardes. [[0|¿Qué desean tomar?]] — [[1|Quisiera una limonada, por favor.]] — ¿Y para comer? — [[2|Para mí, las enchiladas de queso y arroz. De postre, me gustaría el flan.]] — Muy bien. Ahora traigo la comida. — Gracias. [[3|La cuenta, por favor.]]",
          "Muy bien. You used two polite forms and all the parts of the meal.",
        ],
        [
          "full",
          "— Hola, bienvenidos. [[0|¿Qué van a pedir?]] — [[1|Me gustaría un agua y para mí, la sopa de tortilla.]] — ¿Algo más? — [[2|Sí, de postre quisiera los churros.]] — Perfecto. — Gracias. [[3|¿Nos trae la cuenta, por favor?]]",
          "Excelente. The way you asked for the bill, nos trae la cuenta, is very natural.",
        ],
        [
          "partial",
          "— ¿Qué quiere? — [[1|Quisiera un jugo.]] — ¿Y de comer? — [[2|Para mí, el pollo con arroz.]] — Ok. — Yo quiero el cuenta.",
          "La cuenta is feminine and is a polite request: la cuenta, por favor. Add a dessert order.",
        ],
        [
          "partial",
          "— [[0|¿Qué desean?]] — Yo quiero tacos. — ¿Y para tomar? — [[2|Una limonada y de postre el flan.]] — Gracias. [[3|La cuenta, por favor.]]",
          "Use quisiera or me gustaría instead of quiero to be polite. Your ordering is clear and complete.",
          true,
        ],
        [
          "weak",
          "— What would you like? — I would like a juice and tacos. — Anything else? — Flan. The check, please.",
          "Please write the dialogue in Spanish, with quisiera, para mí, and la cuenta, por favor.",
        ],
        [
          "weak",
          "— Qué quiere? — Yo quiero comer taco y jugo. — Bueno. — Yo pagar.",
          "Add the question marks and be polite: quisiera un taco y un jugo. At the end say: la cuenta, por favor.",
        ],
      ],
    },
    {
      prompt:
        "Answer these questions in Spanish using a direct object pronoun in each answer: (1) ¿Comes las verduras? (2) ¿Quieres el postre? (3) ¿Vas a comprar el pan? (4) ¿Preparas la cena en casa? Then write one more sentence of your own with a pronoun.",
      scheme: [
        "Uses las correctly to replace las verduras",
        "Uses lo correctly to replace el postre or el pan",
        "Uses the pronoun correctly with the infinitive (voy a comprarlo / lo voy a comprar)",
        "Uses la correctly for la cena, and writes an extra correct sentence with a pronoun",
      ],
      model:
        "(1) Sí, las como. (2) No, no lo quiero. (3) Sí, voy a comprarlo. (4) Sí, la preparo con mi madre. También me gustan los tacos y los como los viernes.",
      answers: [
        [
          "full",
          "(1) Sí, [[0|las como todos los días]]. (2) No, [[1|no lo quiero porque estoy lleno]]. (3) Sí, [[2|voy a comprarlo mañana]]. (4) Sí, [[3|la preparo con mi hermano]]. Y las enchiladas, las pido siempre en este restaurante.",
          "Muy bien. Your pronouns agree with the nouns they replace, and the extra sentence is correct.",
        ],
        [
          "full",
          "(1) No, [[0|no las como mucho]]. (2) Sí, [[1|lo quiero, por favor]]. (3) Sí, [[2|lo voy a comprar en la tienda]]. (4) No, [[3|no la preparo, mi padre la prepara]]. El helado lo pido de chocolate.",
          "Excelente. You used both positions for the pronoun with an infinitive in other answers, which is a great skill.",
        ],
        [
          "partial",
          "(1) Sí, [[0|las como]]. (2) No, no lo quiero. (3) Sí, voy a comprarla. (4) Sí, [[3|la preparo]].",
          "Pan is masculine, so replace it with lo: voy a comprarlo. The other three are correct.",
        ],
        [
          "partial",
          "(1) Sí, los como. (2) Sí, [[1|lo quiero]]. (3) Sí, [[2|lo voy a comprar]]. (4) Sí, preparo la cena.",
          "Verduras is feminine plural, so use las como. In number 4 replace la cena with a pronoun: la preparo.",
          true,
        ],
        [
          "weak",
          "(1) Yes, I eat them. (2) No, I don't want it. (3) Yes, I am going to buy it. (4) Yes, I prepare it.",
          "Please answer in Spanish using las como, no lo quiero, voy a comprarlo, la preparo.",
        ],
        [
          "weak",
          "(1) Sí, como las verduras. (2) Sí, quiero el postre. (3) Sí, voy a comprar el pan. (4) Sí, preparo la cena.",
          "These sentences repeat the nouns. Replace each noun with lo, la, los or las.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "De compras: la ropa, los precios y las comparaciones",
  note: `
## Objectives

Students will be able to:

1. talk about clothes and shopping, including prices, sizes and colors;
2. make comparisons with más que, menos que and tan como.

## Materials

Clothing flyers or a Spanish-language store web page, price tags, picture cards of clothes, a shopping role-play script, the worksheet, quiz and problem set.

## Starter (6 minutes)

Show a flyer from a clothing store with prices in dollars. Ask in Spanish: "¿Cuánto cuesta la camisa? ¿De qué color es?" Review colors and numbers up to 1000.

## Main activity

1. Clothes: la camisa, la camiseta, los pantalones, la falda, el vestido, la chaqueta, el abrigo, los zapatos, las botas, los calcetines. Colors agree: una camisa roja, unos zapatos negros. Sizes: la talla (pequeña, mediana, grande), el número (shoes).
2. Shopping dialogue: ¿En qué puedo ayudarle? Busco una chaqueta. ¿Cuánto cuesta? Cuesta cuarenta dólares. ¿Tiene una talla más grande? Voy a llevarla. Discuss prices in dollars and pesos and rebajas (sales).
3. Comparisons: más + adjective + que, menos + adjective + que, tan + adjective + como. Irregular: mejor, peor, mayor, menor. "Las botas son más caras que los zapatos." "Esta chaqueta es tan bonita como la otra."
4. Role-play in a store.

## Checking for understanding

Whiteboards: compare two items with más que, menos que and tan como.

## Worksheet, quiz and problem set

Shopping vocabulary and comparisons.
`,
  reading: [
    "De compras en el centro comercial",
    `
Going shopping is a useful way to practice many things: clothes, colors, numbers and polite requests. Clothing words in Spanish include **la camisa** (shirt), **la camiseta** (T-shirt), **los pantalones** (pants), **la falda** (skirt), **el vestido** (dress), **la chaqueta** (jacket), **el abrigo** (coat), **los zapatos** (shoes), **las botas** (boots) and **los calcetines** (socks). Notice that los pantalones and los zapatos are plural, so we say "Los pantalones son azules." Colors are adjectives and agree with the noun: **una camisa roja, un abrigo rojo, unos zapatos negros, unas botas negras**. Colors that end in **-e** or in a consonant, like verde and azul, have just one form for masculine and feminine: una falda verde, un vestido azul.

To talk about sizes, use **la talla** for clothes (**pequeña, mediana, grande**) and **el número** for shoes. A short shopping dialogue in a store goes like this.

— Buenas tardes. ¿En qué puedo ayudarle?
— Busco una chaqueta negra.
— ¿Qué talla usa?
— Uso la talla mediana. ¿Cuánto cuesta esta?
— Cuesta cuarenta dólares. Hoy hay rebajas y es treinta y cinco.
— Voy a llevarla, gracias.

For prices, use the verb **costar**: **cuesta** for one item and **cuestan** for plural: "Los zapatos cuestan sesenta y cinco dólares." Remember that costar is a stem-changing verb (o → ue). The word **rebajas** means "sales."

To compare two things, use these patterns. For "more than": **más + adjective + que**. For "less than": **menos + adjective + que**. For "as ... as": **tan + adjective + como**. "Las botas son **más caras que** los zapatos." "La camiseta es **menos cara que** el abrigo." "Esta chaqueta es **tan bonita como** la otra." The adjective agrees with the first noun. A few adjectives have special comparative forms: **bueno → mejor** (better), **malo → peor** (worse), **joven → menor** (younger), **viejo → mayor** (older). "Mi hermana mayor es mejor en matemáticas que yo." Notice that mejor and peor have no más: we do not say "más mejor."
`,
  ],
  cards: [
    ["la camisa / la camiseta", "shirt / T-shirt"],
    ["los pantalones", "pants"],
    ["los zapatos", "shoes"],
    ["la talla", "the size (clothes)"],
    ["cuesta / cuestan", "it costs / they cost"],
    ["las rebajas", "sales"],
    ["más ... que", "more ... than"],
    ["tan ... como", "as ... as"],
  ],
  closed: [
    [
      "Which sentence is correct?",
      ["La falda es verdes.", "La falda es verde.", "Las faldas es verde.", "La falda son verde."],
      "B",
    ],
    [
      "Complete: \"Los zapatos ___ sesenta dólares.\"",
      ["cuesta", "cuestan", "cuestas", "costo"],
      "B",
    ],
    [
      "\"Esta chaqueta es tan bonita como la otra\" means:",
      ["This jacket is prettier than the other", "This jacket is less pretty than the other", "This jacket is as pretty as the other", "This jacket is the prettiest"],
      "C",
    ],
    [
      "How do you say \"better\" in Spanish?",
      ["más bueno", "mejor", "más mejor", "buenor"],
      "B",
    ],
    [
      "Which word means \"sales\" in a store?",
      ["tallas", "rebajas", "colores", "precios"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a dialogue of at least six lines between a salesperson and a customer who is looking for a jacket. Include the color, the size, the price (use cuesta), and the customer's decision to buy or not.",
      scheme: [
        "The salesperson greets the customer and asks how to help",
        "The customer says what they are looking for with the color and the agreement correct",
        "The size and the price are discussed using talla and cuesta with a number",
        "The customer decides, such as voy a llevarla or no, gracias",
      ],
      model:
        "— Buenas tardes. ¿En qué puedo ayudarle? — Busco una chaqueta azul. — ¿Qué talla usa? — Uso la talla mediana. ¿Cuánto cuesta? — Cuesta cincuenta dólares. — Voy a llevarla, gracias.",
      answers: [
        [
          "full",
          "— [[0|Buenas tardes. ¿En qué puedo ayudarle?]] — [[1|Busco una chaqueta negra.]] — ¿Qué talla usa? — Mediana. [[2|¿Cuánto cuesta? — Cuesta cuarenta y cinco dólares.]] — Es muy cara. ¿Tiene rebajas? — Sí, hoy cuesta treinta y cinco. — [[3|Entonces voy a llevarla, gracias.]]",
          "Muy bien. You agreed chaqueta with negra, and you used the pronoun la in voy a llevarla.",
        ],
        [
          "full",
          "— [[0|Hola, ¿puedo ayudarle?]] — [[1|Sí, busco unos pantalones verdes.]] — ¿Qué talla? — Talla pequeña. [[2|Estos cuestan sesenta dólares.]] — Son caros, pero me gustan mucho. [[3|Los voy a comprar.]] — Muy bien, ¿algo más?",
          "Excelente. Pantalones is plural, and you correctly used cuestan with los pantalones.",
        ],
        [
          "partial",
          "— [[0|Buenos días.]] — Busco una chaqueta rojo. — ¿Qué talla? — [[2|Grande. ¿Cuánto cuesta?]] — Cuesta cincuenta dólares. — Voy a llevarla.",
          "Chaqueta is feminine, so it should be roja. The rest of the dialogue is clear.",
        ],
        [
          "partial",
          "— ¿En qué puedo ayudarle? — [[1|Busco una chaqueta azul.]] — Cuesta cuarenta dólares. — [[3|No, gracias. Es muy cara.]]",
          "Add the size, such as uso la talla mediana. Your decision is clear and polite.",
          true,
        ],
        [
          "weak",
          "— Can I help you? — I am looking for a blue jacket. — It costs forty dollars. — I will buy it.",
          "Please write in Spanish: busco una chaqueta azul, cuesta cuarenta dólares, voy a llevarla.",
        ],
        [
          "weak",
          "— Ayudar? — Yo quiero jacket azul. — Cuesta 40. — Yo comprar.",
          "Use full sentences: busco una chaqueta azul. Cuesta cuarenta dólares. Voy a comprarla.",
        ],
      ],
    },
    {
      prompt:
        "Compare in Spanish three pairs: (1) two items of clothing and their prices (más ... que), (2) two items that are similar (tan ... como), and (3) yourself and a family member (mayor / menor / mejor). Write four sentences.",
      scheme: [
        "Uses más ... que (or menos ... que) correctly with agreement",
        "Uses tan ... como correctly",
        "Uses mayor, menor, mejor or peor correctly",
        "Writes complete sentences with accents and correct agreement of adjectives",
      ],
      model:
        "Las botas son más caras que los zapatos. La camiseta es tan barata como la falda. Mi hermano es menor que yo. Mi madre es mejor cocinera que mi padre.",
      answers: [
        [
          "full",
          "[[0|El abrigo es más caro que la chaqueta.]] [[1|Las camisetas son tan baratas como los calcetines.]] [[2|Mi hermano es menor que yo y mi hermana es mayor.]] [[3|Mi prima es mejor en matemáticas que yo.]]",
          "Muy bien. Every adjective agrees with its noun: caro with abrigo, baratas with camisetas.",
        ],
        [
          "full",
          "[[0|Las botas son menos cómodas que los tenis.]] [[1|Esta falda es tan bonita como ese vestido.]] [[2|Mi padre es mayor que mi madre.]] [[3|Yo soy mejor jugador de fútbol que mi hermano.]]",
          "Excelente. Using mejor without más is exactly right.",
        ],
        [
          "partial",
          "[[0|La camisa es más cara que la camiseta.]] [[1|El vestido es tan bonito como la falda.]] Mi hermano es más mayor que yo.",
          "Do not use más with mayor: mi hermano es mayor que yo. Note that vestido and falda do not match in the sentence you wrote, so check bonito and bonita.",
        ],
        [
          "partial",
          "[[0|Los zapatos son más caros que las botas.]] Yo soy más mejor que mi amigo. [[1|La chaqueta es tan cara como el abrigo.]]",
          "Mejor already means better, so say yo soy mejor que mi amigo. Your other two are correct.",
          true,
        ],
        [
          "weak",
          "The boots are more expensive than the shoes. The shirt is as cheap as the skirt. My brother is younger than me.",
          "Please write in Spanish. For example: las botas son más caras que los zapatos.",
        ],
        [
          "weak",
          "Botas más caro zapatos. Camisa tan barata falda. Hermano más mayor.",
          "Use que and como: las botas son más caras que los zapatos. La camisa es tan barata como la falda.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Un día típico, el menú, la receta y mi barrio",
  note: `
## Objectives

Students will be able to:

1. understand a short recording or text about a typical day;
2. read a menu and recipe and understand the quantities and steps;
3. write a description of their home and neighborhood.

## Materials

A short audio or script about a typical day in Mexico City, a menu and a recipe for guacamole, measuring spoons, a map of the school's neighborhood, the quiz, problem set and worksheet.

## Starter (6 minutes)

Play the first minute of a short audio about a typical day. Ask students to listen for times and activities and write three words they understand. Check for cognates.

## Main activity

1. Interpretive listening and reading: use the context, cognates and verbs in order to get the sequence of the day. Answer comprehension questions in Spanish and English.
2. Menus and recipes: read a menu for plato principal, bebidas, postres and precios. Read a recipe for guacamole: ingredientes (tres aguacates, un tomate, media cebolla, el jugo de un limón, sal), cantidades (una cucharada, una taza, 200 gramos), and steps with command forms (corta, mezcla, añade, sirve).
3. Writing: describe your home and neighborhood: "Mi casa está en una calle tranquila. Cerca hay un parque, una biblioteca y una tienda. Me gusta mi barrio porque ..."
4. Peer feedback on descriptions.

## Checking for understanding

Ask: "¿Cuántos aguacates necesito? ¿Qué hago primero?"

## Quiz, problem set and worksheet

A recipe reading and a neighborhood description.
`,
  reading: [
    "Una receta y mi barrio",
    `
Reading a recipe in Spanish is a good exercise in understanding instructions and quantities. A recipe is called **una receta** and begins with a list of **ingredientes**. Amounts are given in units such as **una taza** (a cup), **una cucharada** (a tablespoon), **una cucharadita** (a teaspoon), **un diente de ajo** (a clove of garlic) or in grams (**gramos**) and liters (**litros**), because most Spanish-speaking countries use the metric system. Here is a recipe for guacamole.

**Guacamole**

Ingredientes: tres aguacates maduros, un tomate, media cebolla, un diente de ajo, el jugo de un limón, una cucharadita de sal, cilantro fresco.

Preparación:
1. Corta los aguacates por la mitad y saca la semilla.
2. Pon el aguacate en un tazón y machácalo con un tenedor.
3. Corta el tomate, la cebolla y el cilantro en pedazos pequeños.
4. Añade el tomate, la cebolla, el ajo y el cilantro al aguacate.
5. Mezcla los ingredientes con el jugo de limón y la sal.
6. Sirve con tortillas de maíz.

The verbs in the steps are in the **command form** (the imperative) for tú: corta, pon, añade, mezcla, sirve. You do not need to know how to form commands yet, only to recognize them as instructions. A key word is **primero**, **luego** (then), **después** and **finalmente**.

A menu works similarly. You find **entradas** (starters), **platos principales** (main dishes), **bebidas** (drinks), **postres** (desserts) and prices. A line may say: "Tacos de pollo con arroz y frijoles — $12." You can use cognates and food words to guess: **pollo** is chicken, and **arroz** is rice.

When you listen to or read about a typical day, pay attention to time words and the order of events. A student from Mexico City might say: "Me levanto a las seis y media. Desayuno huevos con frijoles y salgo para la escuela a las siete y media. Tomo el metro. Mis clases terminan a las dos y regreso a casa para la comida con mi familia. Por la noche hago la tarea." The main idea is the sequence of the day, and the main meal, la comida, is in the afternoon.

Finally, write a description of your home and neighborhood: "Vivo en una casa en el norte de Columbus. Mi calle es tranquila. Cerca de mi casa hay un parque, una biblioteca y una tienda. Me gusta mi barrio porque mis vecinos son simpáticos."
`,
  ],
  cards: [
    ["la receta", "recipe"],
    ["los ingredientes", "ingredients"],
    ["una cucharada", "a tablespoon"],
    ["añade / mezcla / sirve", "add / mix / serve (commands)"],
    ["el plato principal", "main dish"],
    ["la comida", "main meal of the day (Mexico); food"],
    ["el barrio", "the neighborhood"],
    ["cerca de mi casa hay + place", "near my house there is / are + place"],
  ],
  closed: [
    [
      "In the guacamole recipe, how many avocados do you need?",
      ["One", "Two", "Three", "Four"],
      "C",
    ],
    [
      "What does \"Añade el tomate\" instruct you to do?",
      ["Cut the tomato", "Add the tomato", "Eat the tomato", "Remove the tomato"],
      "B",
    ],
    [
      "Where is the main meal of the day, la comida, usually eaten in Mexico?",
      ["In the morning", "In the afternoon", "Late at night", "At midnight"],
      "B",
    ],
    [
      "On a menu, \"bebidas\" are:",
      ["Desserts", "Drinks", "Starters", "Main dishes"],
      "B",
    ],
    [
      "Which is the best sentence to describe your neighborhood?",
      ["Mi barrio tiene un parque y una biblioteca.", "Mi barrio come un parque.", "Yo soy un barrio.", "El parque barrio mi."],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Read this paragraph and answer in English, then in Spanish: \"Me levanto a las siete. Desayuno cereal y salgo para la escuela a las ocho. Tengo seis clases. Almuerzo a las doce con mis amigos. Después de la escuela practico fútbol. Ceno con mi familia a las siete y hago la tarea.\" (a) What time does the student leave for school? (b) What happens at 12:00? (c) Write one question in Spanish you could ask this student.",
      scheme: [
        "States that the student leaves for school at 8:00",
        "States that at 12:00 the student has lunch with friends",
        "Mentions a further detail, such as soccer practice after school or dinner with family at 7:00",
        "Writes a correct question in Spanish about the routine",
      ],
      model:
        "(a) The student leaves for school at eight. (b) At twelve the student has lunch with friends. The student also practices soccer after school and has dinner at seven. (c) ¿A qué hora haces la tarea?",
      answers: [
        [
          "full",
          "(a) [[0|He or she leaves for school at 8:00.]] (b) [[1|At 12:00 the student has lunch with friends.]] [[2|After school the student plays soccer, and dinner with family is at 7:00.]] (c) [[3|¿A qué hora practicas fútbol?]]",
          "Muy bien. Your question uses a qué hora correctly and is on topic.",
        ],
        [
          "full",
          "(a) The student leaves at eight in the morning. (b) [[1|Lunch with friends.]] [[0|The student leaves for school at eight.]] The student has six classes and [[2|practices soccer after school]]. (c) [[3|¿Con quién almuerzas?]]",
          "Excelente. Your question uses con quién, which makes the conversation continue.",
        ],
        [
          "partial",
          "(a) [[0|Eight o'clock.]] (b) The student has breakfast. (c) ¿Qué haces?",
          "At 12:00 the student has lunch with friends, not breakfast. Your question should be more specific.",
        ],
        [
          "partial",
          "(a) The student leaves at seven. (b) [[1|At 12:00 they have lunch with friends.]] (c) [[3|¿A qué hora desayunas?]]",
          "The student gets up at seven and leaves at eight. Your lunch answer and your question are good.",
          true,
        ],
        [
          "weak",
          "I do not understand. It is about school. (c) Hola.",
          "Look for time words: a las ocho, a las doce, a las siete. Write a question such as ¿a qué hora cenas?",
        ],
        [
          "weak",
          "(a) At 12. (b) He eats dinner. (c) Where school?",
          "Salir para la escuela is at eight, and almuerzo is at noon. A complete question is ¿dónde está tu escuela?",
        ],
      ],
    },
    {
      prompt:
        "Write a description of your home and your neighborhood in Spanish, with at least five sentences. Say what kind of home you live in, name three places near it, and say what you like or dislike about your neighborhood and why.",
      scheme: [
        "Describes the home with vivir or tener and an adjective that agrees",
        "Names three places near the home using cerca de and hay",
        "Gives an opinion with me gusta or no me gusta",
        "Gives a reason with porque and writes mostly correct sentences with accents",
      ],
      model:
        "Vivo en una casa pequeña en el norte de Columbus. Cerca de mi casa hay un parque, una biblioteca y una tienda. Me gusta mi barrio porque es tranquilo y mis vecinos son simpáticos.",
      answers: [
        [
          "full",
          "[[0|Vivo en una casa grande con mi familia.]] [[1|Cerca de mi casa hay un parque, una biblioteca y un supermercado.]] [[2|Me gusta mi barrio.]] [[3|Es tranquilo porque hay pocos carros, y mis vecinos son muy simpáticos.]]",
          "Muy bien. Your adjectives agree, and your reason with porque is clear.",
        ],
        [
          "full",
          "[[0|Mi apartamento es pequeño, pero muy bonito.]] [[1|Cerca hay una panadería, una escuela y un parque donde juego al fútbol.]] [[2|Me gusta mi barrio, pero no me gusta el tráfico.]] [[3|Prefiero vivir aquí porque mis amigos viven cerca.]]",
          "Excelente. You gave both something you like and something you dislike.",
        ],
        [
          "partial",
          "[[0|Vivo en una casa pequeño.]] [[1|Cerca hay un parque y una tienda.]] Me gusta mi barrio porque tranquilo.",
          "Casa is feminine: una casa pequeña. After porque add es: porque es tranquilo. Name three places.",
        ],
        [
          "partial",
          "Mi casa [[0|es amarilla y grande]]. [[1|Cerca de mi casa hay una biblioteca.]] [[2|Me gusta mucho mi barrio.]]",
          "Add two more places and give a reason with porque.",
          true,
        ],
        [
          "weak",
          "I live in a small house. Near my house there is a park, a store and a library. I like my neighborhood because it is quiet.",
          "Please write in Spanish. Use vivo en una casa pequeña and cerca de mi casa hay un parque.",
        ],
        [
          "weak",
          "Yo vive casa. Parque tienda biblioteca. Mi barrio bueno.",
          "Say vivo en una casa. Cerca hay un parque, una tienda y una biblioteca. Me gusta mi barrio.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Un plato tradicional y las costumbres de comer",
  note: `
## Objectives

Students will be able to:

1. present a short talk about a traditional dish and where it comes from;
2. compare mealtimes and eating customs in Spain, Mexico and the United States.

## Materials

Photos of paella, tamales and empanadas, a map, a presentation planning sheet, a table of mealtimes, the problem set and worksheet.

## Starter (6 minutes)

Show photos of paella, tamales and empanadas. Ask: "¿Qué plato es? ¿De qué país es?" Let students guess and then give the answers: paella (España, Valencia), tamales (México), empanadas (muchos países, Argentina, Chile).

## Main activity

1. Presentation model: "El plato se llama tamales. Es de México. Los ingredientes son maíz, carne y chiles. Es un plato tradicional de la Navidad. Es delicioso." Students plan their own talk using notes, not a script: name, origin, ingredients, when it is eaten and an opinion.
2. Mealtimes: Spain: desayuno light, almuerzo at 2:00 to 3:30 pm (the main meal), cena at 9:00 to 10:00 pm. Mexico: desayuno, comida at 2:00 to 4:00 pm, cena light. US: lunch at noon, dinner at 6:00 pm. Discuss long family meals (sobremesa) and why schedules differ.
3. Practice speaking in groups of three and give feedback on clarity and pronunciation.

## Checking for understanding

Ask: "¿A qué hora cenan en España? ¿Y en tu casa?"

## Problem set and worksheet

A short written plan for a talk and a comparison table.
`,
  reading: [
    "Platos tradicionales y horarios de comida",
    `
Every region has its own traditional dishes, and talking about them is a good opportunity to practice presentational speaking. To present a dish, organize your talk in simple steps. First say what the dish is called and where it comes from: **"El plato se llama paella. Es de España, de la región de Valencia."** Second, say what the ingredients are: **"Lleva arroz, pollo, mariscos y verduras."** Third, say when it is eaten or what it means: **"Es un plato de los domingos con la familia."** Finally, give an opinion: **"Es muy rico."** Use notes with key words, not full sentences, and speak clearly.

Here are three examples. **La paella** is from Valencia, in Spain. It is cooked in a wide pan with rice, saffron, vegetables and chicken, rabbit or seafood, and it is eaten at lunch with the family on Sundays. **Los tamales** are from Mexico and much of Central America. They are made of corn dough (masa) filled with meat, chiles or cheese, wrapped in corn husks or banana leaves and steamed. Families make them together at Christmas, and they are also eaten on the Día de la Candelaria in February. **Las empanadas** are pastries filled with meat, cheese or vegetables, baked or fried. They are popular in Argentina, Chile, Colombia and many other countries, and each region has its own filling.

Mealtimes and customs also differ. In Spain the typical day starts with a light breakfast, a coffee and a pastry. The main meal, **el almuerzo** or **la comida**, is between 2:00 and 3:30 in the afternoon, and may have several courses. After a long **sobremesa**, the time when people stay at the table chatting, many shops reopen. Dinner, **la cena**, is light and late, from 9:00 to 10:00 at night. In Mexico, the main meal is **la comida**, usually between 2:00 and 4:00, and families often eat it together. Dinner is lighter, and many people have tamales or sweet bread with hot chocolate. In the United States, lunch is usually around noon, often quick and eaten at school or at work, and dinner is the main family meal, at about 6:00.

Why do the schedules differ? Climate, work hours and tradition all play a role. In Spain, the workday has traditionally had a long midday break. In the US, many families eat early because of school and work schedules. Understanding these differences helps us to be good guests in other countries.
`,
  ],
  cards: [
    ["El plato se llama + name", "The dish is called + name"],
    ["Es de + place", "It is from + place"],
    ["Lleva + ingredients", "It has / contains + ingredients"],
    ["la sobremesa", "time spent at the table after a meal, chatting"],
    ["la comida", "the main meal of the day (Mexico)"],
    ["el almuerzo", "lunch"],
    ["los tamales", "steamed corn dough filled with meat or cheese"],
    ["las empanadas", "filled pastries"],
  ],
  closed: [
    [
      "At about what time is dinner typically eaten in Spain?",
      ["5:00 pm", "6:00 pm", "9:00 to 10:00 pm", "Midnight"],
      "C",
    ],
    [
      "Which dish is from Valencia, Spain?",
      ["Tamales", "Paella", "Empanadas", "Guacamole"],
      "B",
    ],
    [
      "What is \"la sobremesa\"?",
      ["A type of dessert", "Time at the table talking after a meal", "A tablecloth", "A restaurant"],
      "B",
    ],
    [
      "How would you say \"It contains rice and chicken\"?",
      ["Es arroz y pollo", "Lleva arroz y pollo", "Hay arroz y pollo", "Tiene de arroz y pollo"],
      "B",
    ],
    [
      "In Mexico, the main meal of the day is usually eaten:",
      ["At breakfast time", "Between 2:00 and 4:00 in the afternoon", "At 7:00 pm", "At midnight"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Prepare a 30-second talk in Spanish about a traditional dish (it can be from the readings or from your family). Write the notes you would use as full sentences: the name, where it comes from, three ingredients, when it is eaten, and your opinion.",
      scheme: [
        "Names the dish and where it comes from with el plato se llama and es de",
        "Lists at least three ingredients with lleva or los ingredientes",
        "Says when the dish is eaten or what occasion it belongs to",
        "Gives an opinion with a reason",
      ],
      model:
        "El plato se llama tamales. Es de México. Lleva masa de maíz, carne de cerdo y chiles. Mi familia lo prepara en Navidad. Me gusta porque es delicioso y toda la familia lo prepara.",
      answers: [
        [
          "full",
          "[[0|El plato se llama paella. Es de España, de Valencia.]] [[1|Lleva arroz, pollo y verduras.]] [[2|Es un plato de los domingos y se come con la familia.]] [[3|Me gusta mucho porque es sabroso y el arroz está muy rico.]]",
          "Muy bien. Your talk has all four parts in a clear order.",
        ],
        [
          "full",
          "[[0|Mi plato favorito se llama pozole. Es de México.]] [[1|Los ingredientes son maíz, carne de cerdo y chile.]] [[2|Mi abuela lo prepara en Navidad y el Año Nuevo.]] [[3|Me gusta porque toda la familia está en la mesa.]]",
          "Excelente. Linking the dish to a family memory makes a presentation more interesting.",
        ],
        [
          "partial",
          "[[0|El plato se llama empanadas. Es de Argentina.]] Lleva carne y queso. Se come en la cena. Me gusta porque bueno.",
          "Add a third ingredient and write porque es bueno. You stated the origin and the occasion clearly.",
        ],
        [
          "partial",
          "[[1|Los tamales llevan masa, carne y chile.]] [[3|Me gustan porque son deliciosos.]] El plato es de México.",
          "Say el plato se llama tamales and when it is eaten. Your ingredients and opinion are well written.",
          true,
        ],
        [
          "weak",
          "The dish is called tamales. It is from Mexico. It has corn, meat and chiles. I like it.",
          "Please write your notes in Spanish: el plato se llama tamales. Es de México. Lleva maíz.",
        ],
        [
          "weak",
          "Plato tamales. México. Maíz carne. Yo comer navidad. Bueno.",
          "Use complete sentences: el plato se llama tamales, es de México, lleva maíz y carne, se come en Navidad.",
        ],
      ],
    },
    {
      prompt:
        "Compare mealtimes and eating customs in Spain, Mexico and the United States. Write a short paragraph in English with at least three specific facts (times or customs) and explain one reason that schedules differ.",
      scheme: [
        "Gives a fact about Spain, such as a late dinner or a main meal at 2:00 to 3:30 pm",
        "Gives a fact about Mexico, such as la comida as the main meal in the afternoon",
        "Gives a fact about the United States, such as lunch at noon and an earlier dinner",
        "Explains one reason for the differences, such as work schedules, climate or tradition",
      ],
      model:
        "In Spain the main meal is at 2:00 to 3:30 in the afternoon and dinner is very late, at 9:00 or 10:00. In Mexico the main meal, la comida, is in the afternoon and dinner is light. In the US, lunch is around noon and dinner is the main meal at about 6:00. Schedules differ because of work hours and traditions such as the long midday break in Spain.",
      answers: [
        [
          "full",
          "[[0|In Spain people eat the big meal between 2:00 and 3:30 and dinner is as late as 10:00 at night.]] [[1|In Mexico the main meal, la comida, is in the afternoon, and dinner is lighter.]] [[2|In the US we usually eat lunch around noon and dinner at 6:00, which is the main family meal.]] [[3|Schedules differ because of traditions like a long midday break in Spain and school and work hours in the US.]]",
          "Excelente. Each country has a specific time, and you gave a reasonable cause.",
        ],
        [
          "full",
          "[[0|Spain has a late dinner, at 9:00 to 10:00 pm, and a sobremesa after lunch.]] [[1|In Mexico families gather for la comida between 2:00 and 4:00.]] [[2|Americans tend to eat dinner early at about 6:00, and lunch is often a quick meal at school or work.]] [[3|Climate and work schedules explain a lot of the differences.]]",
          "Muy bien. The sobremesa is a good cultural detail.",
        ],
        [
          "partial",
          "[[0|In Spain people eat dinner very late, at 10:00 pm.]] [[2|In the US we eat dinner at 6:00.]] People in Mexico eat the same as us.",
          "Mexico differs: the main meal, la comida, is in the middle of the afternoon. Add a reason for the differences.",
        ],
        [
          "partial",
          "[[1|In Mexico the main meal is in the afternoon.]] [[3|The differences are due to work hours.]] Spain eats breakfast at noon.",
          "Spaniards eat a light breakfast in the morning. Their main meal is in the afternoon, and dinner is late.",
          true,
        ],
        [
          "weak",
          "People in Spain, Mexico and the US eat at the same times because everyone gets hungry at the same time.",
          "Mealtimes differ in the three places. Look for the times of the main meal and dinner in each country.",
        ],
        [
          "weak",
          "[[2|In the US dinner is at 6:00.]] In Spain they don't eat dinner because of the siesta, and in Mexico they only eat tacos.",
          "Spaniards eat dinner late, at 9:00 to 10:00. Mexicans eat a wide variety of foods, with the main meal in the afternoon.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Alimentos y mercados de una región, y la nutrición",
  note: `
## Objectives

Students will be able to:

1. describe the foods and markets of a Spanish-speaking region;
2. use Spanish to learn about nutrition or geography from a Spanish-language source.

## Materials

Photos of the Mercado de la Boquería (Barcelona), a market in Oaxaca and a market in Cusco, a short Spanish-language article on a balanced diet, a map of the Andes, the worksheet.

## Starter (6 minutes)

Show a photo of a market with fruit stalls in Oaxaca. Ask in English: "What do you notice? What would you buy?" Elicit foods: mangos, chiles, chocolate, quesillo.

## Main activity

1. Regions and foods: Oaxaca (mole, tlayudas, chocolate, mezcal, mercados with stalls of herbs and chiles); the Andes of Peru (papas of hundreds of varieties, quinoa, maíz morado, ají); Barcelona (jamón, queso manchego, mariscos, La Boquería). Describe a market: hay puestos de frutas y verduras; los vendedores gritan precios.
2. Nutrition vocabulary: la dieta equilibrada, las proteínas, los carbohidratos, las grasas, las vitaminas, el agua. "Debes comer más frutas y verduras." "Hay que beber agua."
3. Reading a short article in Spanish about eating well. Find five cognates, the main idea and two recommendations.
4. Plan a Spanish-language search: find a geography fact about a country using a Spanish web page.

## Checking for understanding

Ask: "¿Qué comida es típica de Perú? ¿Qué debes comer para tener energía?"

## Worksheet

A market description and an article reading.
`,
  reading: [
    "Mercados, regiones y una dieta equilibrada",
    `
Markets, or **mercados**, are central to everyday life in many Spanish-speaking countries. Instead of shopping only at supermarkets, many people buy food at open markets with dozens of **puestos** (stalls), where vendors sell fruits, vegetables, meat, cheese, spices and flowers. The vendors often call out their prices, and customers may greet them and chat. Each region has its own ingredients and flavors.

In the southern Mexican state of **Oaxaca**, the markets sell chiles of many kinds, herbs, tropical fruits, chocolate for making hot chocolate, and the soft string cheese called quesillo. The region is famous for its seven moles, thick sauces made of chiles, nuts, spices and sometimes chocolate, served over chicken. Another specialty is the **tlayuda**, a large crisp tortilla with beans, cheese and meat. In the **Andes** of Peru, farmers grow thousands of varieties of **papas** (potatoes), the plant first cultivated there thousands of years ago. They also grow **quinoa**, a grain rich in protein, purple corn, and spicy peppers called **ají**. A typical dish is **papa a la huancaína**, potatoes in a creamy cheese and ají sauce. In **Barcelona**, the market La Boquería on the famous street La Rambla sells cured ham (jamón), manchego cheese, olives and fresh seafood from the Mediterranean. In each place, local geography and climate shape the food: mountains, coast or tropical lowlands.

Talking about food also means talking about health. A **dieta equilibrada** (balanced diet) includes **proteínas** (meat, fish, eggs, beans), **carbohidratos** (bread, rice, pasta, potatoes), **grasas** (oils, nuts) and **vitaminas y minerales** (fruits and vegetables). The Spanish word **hay que** + infinitive means "one must," and **debes** + infinitive means "you should." "Hay que comer verduras todos los días." "Debes beber ocho vasos de agua." "No debes comer demasiados dulces." Cognates make it easy to read health information: **proteínas, vitaminas, minerales, energía, calorías**.

When you read a Spanish article, do not translate every word. Find the cognates, the title and the first sentence for the main idea, and use pictures. Then look for the recommendations. You can use the same strategy to learn geography in Spanish. A web page about Peru might tell you that the capital is Lima, that the country has three regions, la costa, la sierra and la selva, and that the Andes mountains cross it from north to south.
`,
  ],
  cards: [
    ["el mercado", "the market"],
    ["el puesto", "market stall"],
    ["la papa", "potato"],
    ["la dieta equilibrada", "balanced diet"],
    ["las proteínas", "proteins"],
    ["hay que + infinitive", "one must + verb"],
    ["debes + infinitive", "you should + verb"],
    ["la costa, la sierra, la selva", "the coast, the highlands, the jungle (Peru)"],
  ],
  closed: [
    [
      "Which food is typical of the Peruvian Andes?",
      ["Paella", "Papas of many varieties", "Tlayudas", "Jamón"],
      "B",
    ],
    [
      "\"Debes beber agua\" means:",
      ["You drank water", "You should drink water", "You like water", "You will buy water"],
      "B",
    ],
    [
      "Which region of Mexico is famous for its moles and tlayudas?",
      ["Valencia", "Oaxaca", "Cusco", "Buenos Aires"],
      "B",
    ],
    [
      "Which of these is a cognate that helps you read a health article?",
      ["puesto", "vitaminas", "mercado", "vendedor"],
      "B",
    ],
    [
      "What are the three regions of Peru mentioned in the reading?",
      ["La costa, la sierra, la selva", "El norte, el sur, el este", "La playa, la montaña, la ciudad", "La capital, el campo, el mar"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Describe a market in a Spanish-speaking region in five sentences in Spanish. Name the region, say what the market sells (at least three things) and say whether you would like to shop there and why.",
      scheme: [
        "Names the market and region or country",
        "Names at least three things sold using hay or venden",
        "Describes the market using an adjective that agrees or a sentence about the vendors",
        "Gives an opinion with me gustaría or me gusta and a reason",
      ],
      model:
        "El mercado de Oaxaca está en el sur de México. Hay puestos de chiles, frutas y chocolate. Los vendedores son simpáticos y hablan mucho. Me gustaría comprar chocolate porque es delicioso.",
      answers: [
        [
          "full",
          "[[0|El mercado de La Boquería está en Barcelona, en España.]] [[1|Hay puestos de jamón, queso, aceitunas y mariscos.]] [[2|Los vendedores son amables y el mercado es grande y colorido.]] [[3|Me gustaría ir porque me gustan el queso y el pescado fresco.]]",
          "Muy bien. Your adjectives agree: grande, colorido, amables.",
        ],
        [
          "full",
          "[[0|En Cusco, en Perú, hay un mercado muy famoso.]] [[1|Venden papas, maíz morado, quinoa y frutas.]] [[2|Las mujeres usan ropa tradicional y los precios son baratos.]] [[3|Me gusta este mercado porque es muy auténtico.]]",
          "Excelente. You wrote in the present with different verbs, and the details feel real.",
        ],
        [
          "partial",
          "[[0|El mercado de Oaxaca está en México.]] [[1|Hay chiles, frutas y chocolate.]] Los vendedores son simpático. Me gustaría ir porque bonito.",
          "Vendedores is plural, so write simpáticos. After porque add es: porque es bonito.",
        ],
        [
          "partial",
          "[[1|En el mercado hay frutas, verduras y queso.]] [[3|Me gusta comprar allí.]] El mercado es en España.",
          "Name the city or region, and say why you like it, using porque.",
          true,
        ],
        [
          "weak",
          "The market in Oaxaca sells chiles, fruit and chocolate. I would like to go.",
          "Please write in Spanish: en el mercado hay chiles, frutas y chocolate. Me gustaría ir.",
        ],
        [
          "weak",
          "Mercado Oaxaca. Chile fruta chocolate. Yo gusta mucho.",
          "Use full sentences: el mercado de Oaxaca vende chiles. Me gusta mucho.",
        ],
      ],
    },
    {
      prompt:
        "Read: \"Una dieta equilibrada incluye frutas, verduras, proteínas y carbohidratos. Hay que beber agua todos los días. No debes comer demasiados dulces porque tienen mucha azúcar.\" Answer in English: (a) What does a balanced diet include? (b) What advice is given about water and sweets? Then write two recommendations of your own in Spanish using debes or hay que.",
      scheme: [
        "States that a balanced diet includes fruits, vegetables, proteins and carbohydrates",
        "States that one must drink water every day",
        "States that you should not eat too many sweets because of the sugar",
        "Writes two correct recommendations in Spanish with debes or hay que plus an infinitive",
      ],
      model:
        "(a) A balanced diet includes fruits, vegetables, proteins and carbohydrates. (b) You must drink water every day, and you should not eat too many sweets because they have a lot of sugar. Debes comer fruta todos los días. Hay que dormir ocho horas.",
      answers: [
        [
          "full",
          "(a) [[0|A balanced diet includes fruit, vegetables, protein and carbohydrates.]] (b) [[1|You have to drink water every day.]] [[2|You should not eat too many sweets because they have a lot of sugar.]] [[3|Debes comer más verduras. Hay que hacer ejercicio.]]",
          "Muy bien. Your Spanish recommendations use both structures correctly.",
        ],
        [
          "full",
          "(a) [[0|Fruits, vegetables, proteins and carbohydrates.]] (b) [[1|Drink water every day.]] [[2|Don't eat too many sweets since they contain a lot of sugar.]] [[3|Debes beber menos refrescos. Hay que caminar cada día.]]",
          "Excelente. Using menos with refrescos gives practical advice.",
        ],
        [
          "partial",
          "(a) [[0|A balanced diet has fruit and vegetables and protein.]] (b) [[1|You must drink water.]] Do not eat sweets. Debes come frutas.",
          "After debes use the infinitive: debes comer frutas. Also mention that too many sweets are not good because of the sugar.",
        ],
        [
          "partial",
          "(a) It includes foods. (b) [[1|Drink water every day.]] [[2|Too many sweets have sugar.]] [[3|Hay que beber agua.]]",
          "Name the foods in a balanced diet: fruits, vegetables, proteins and carbohydrates. Add a second Spanish recommendation.",
          true,
        ],
        [
          "weak",
          "I do not know the words. I think it is about food and school.",
          "Look for cognates: dieta, frutas, proteínas, carbohidratos. They tell you the article is about healthy food.",
        ],
        [
          "weak",
          "(a) It includes sweets and soda. (b) You should eat many sweets. Yo debo comer pizza.",
          "The text says you should not eat too many sweets. Use debes plus an infinitive: debes comer fruta.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "La vida escolar y familiar, y una meta para usar el español",
  note: `
## Objectives

Students will be able to:

1. explain a difference in school or home life between a Spanish-speaking country and their own;
2. set a goal for using Spanish outside the classroom and track it for a week.

## Materials

A short video of a school day in Mexico City and in Bogotá, a Venn diagram, a goal-setting sheet and a weekly log, the worksheet and quiz.

## Starter (6 minutes)

Ask: "What do you think is different about a school day in Spanish-speaking countries compared with Ohio?" List ideas: uniforms, schedules, lunch at home, class changes.

## Main activity

1. School life: in many countries students wear uniforms, school starts early, students may stay in one classroom while teachers move, lunch may be a long break at home, and there are fewer school sports teams. Discuss varied systems and avoid generalizing: a private school and a public school may differ, and every country is different.
2. Home life: many families include grandparents living nearby, shared meals, and strong ties with extended family. Compare to students' experiences.
3. Complete a Venn diagram, then write two sentences in Spanish: "En mi escuela ... pero en México ..."
4. Goal setting: choose a SMART goal for using Spanish outside the classroom (listen to a podcast for 10 minutes three times a week, text a classmate in Spanish, label objects at home, read a news headline, watch a show with subtitles). Track daily in a log.

## Checking for understanding

Ask: "¿Cuál es tu meta para esta semana? ¿Cómo vas a registrarla?"

## Worksheet and quiz

A comparison and a goal plan.
`,
  reading: [
    "Escuelas, familias y una meta personal",
    `
Comparing school and family life in different countries helps us to see our own customs from a new angle. Differences are interesting but they are general: schools within a country vary, and no single description is true for everyone. With this caution, here are some things you might notice in many Spanish-speaking countries.

In many schools in Mexico, Colombia and Spain, students wear **uniformes** (uniforms). The school day often starts early, around seven or eight in the morning. In some schools the students stay in the same classroom and the teachers move from room to room, the opposite of the usual system in US high schools, where students change classrooms. In some countries there are two school shifts, one in the morning and one in the afternoon. In some places, the lunch break is long, and some students go home to eat with the family. Sports and clubs are often organized outside of the school, in community clubs, rather than through school teams as in Ohio, where Friday night football is a school tradition. Students may also have more oral exams.

Family life also has its own customs. In many families, **los abuelos** (grandparents), aunts, uncles and cousins live nearby, and may even live in the same house. Sunday lunch with the extended family is common. Young people often live with their parents until they finish university or marry, and a family may take care of older relatives at home. Of course, many families in Spanish-speaking countries are smaller and live far from relatives, and many Latino families in Columbus keep close ties across the country and across borders.

To write a comparison in Spanish, use contrast words: **pero** (but), **sin embargo** (however), **mientras que** (while), **también** (also). "En mi escuela los estudiantes cambian de salón, pero en muchas escuelas de México los maestros cambian de salón."

Finally, learning a language does not stop when class ends. A good way to improve is to set a **meta** (goal) that is specific, measurable and realistic, and to track it. For example: "Esta semana voy a escuchar un pódcast en español diez minutos, tres veces." Others might be to text a classmate in Spanish, label ten objects in your room, read one headline a day, or watch a series with Spanish subtitles. At the end of the week, check your log: ¿Cumplí mi meta? ¿Qué funcionó? ¿Qué puedo cambiar?
`,
  ],
  cards: [
    ["el uniforme", "uniform"],
    ["los abuelos", "grandparents"],
    ["mientras que", "while, whereas"],
    ["sin embargo", "however"],
    ["la meta", "goal"],
    ["el pódcast", "podcast"],
    ["Esta semana voy a + verb", "This week I am going to + verb"],
    ["¿Cumplí mi meta?", "Did I meet my goal?"],
  ],
  closed: [
    [
      "What is a typical difference mentioned for many schools in Mexico and Colombia?",
      ["Students never wear uniforms", "Students often wear uniforms", "Students never study", "There are no teachers"],
      "B",
    ],
    [
      "Which word means \"however\"?",
      ["también", "sin embargo", "porque", "después"],
      "B",
    ],
    [
      "Which goal is the most specific and measurable?",
      ["Voy a estudiar más", "Esta semana voy a escuchar un pódcast en español diez minutos, tres veces", "Quiero hablar bien", "Voy a ser inteligente"],
      "B",
    ],
    [
      "\"Mientras que\" is used to:",
      ["Show a contrast between two things", "Ask a question", "Say goodbye", "Give a command"],
      "A",
    ],
    [
      "Why is it important not to overgeneralize about schools and families in a country?",
      ["Because all schools are the same", "Because schools and families vary within a country", "Because customs never change", "Because only one country speaks Spanish"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare one aspect of school life in your school with that of a school in a Spanish-speaking country. Write four sentences in Spanish using at least one contrast word (pero, sin embargo, mientras que) and then one sentence in English explaining why you should not generalize.",
      scheme: [
        "Describes a feature of their own school in Spanish correctly",
        "Describes the corresponding feature in a Spanish-speaking country in Spanish",
        "Uses a contrast word (pero, sin embargo or mientras que) correctly",
        "Explains in English that practices vary among schools and countries",
      ],
      model:
        "En mi escuela los estudiantes no usan uniforme. En muchas escuelas de México los estudiantes usan uniforme. En mi escuela cambiamos de salón, pero en algunas escuelas los maestros cambian de salón. Not all schools are the same, because customs vary within each country.",
      answers: [
        [
          "full",
          "[[0|En mi escuela no usamos uniforme.]] [[1|En muchas escuelas de Colombia los estudiantes usan uniforme.]] [[2|Nosotros cambiamos de clase, mientras que en algunas escuelas los maestros cambian de salón.]] [[3|I should not generalize because schools differ within a country, and private and public schools can be different.]]",
          "Muy bien. You used mientras que accurately and your caution about generalizing is thoughtful.",
        ],
        [
          "full",
          "[[0|En mi escuela las clases empiezan a las siete y media.]] [[1|En México muchas escuelas empiezan a las ocho, pero algunas tienen dos turnos.]] [[2|Sin embargo, no todas las escuelas son iguales.]] [[3|Every school and every country is different, so one example cannot describe everyone.]]",
          "Excelente. Using sin embargo to introduce your caution is a nice touch.",
        ],
        [
          "partial",
          "[[0|En mi escuela tenemos fútbol americano.]] [[1|En México hay equipos en clubes.]] Mi escuela es grande mientras mi escuela es pequeña. [[3|Not every school is the same.]]",
          "Check your use of mientras que: you need two different things to contrast, such as two schools.",
        ],
        [
          "partial",
          "[[0|En mi escuela comemos en la cafetería.]] [[2|En México muchos estudiantes comen en casa, pero otros comen en la escuela.]] Todos los estudiantes en México usan uniforme.",
          "Avoid generalizing with todos. Say muchos estudiantes. Describe your own school and add a note on variation.",
          true,
        ],
        [
          "weak",
          "In my school we change classrooms. In Mexico teachers change classrooms. Schools are different.",
          "Please write the comparison in Spanish: en mi escuela cambiamos de salón, pero en México los maestros cambian.",
        ],
        [
          "weak",
          "Mi escuela uniforme no. Mexico uniforme si. Pero mi escuela mejor.",
          "Avoid saying one is better. Say en mi escuela no usamos uniforme, pero en muchas escuelas de México sí.",
        ],
      ],
    },
    {
      prompt:
        "Set a goal for using Spanish outside class this week. Write it in Spanish as a sentence that says what, how many times and for how long (Esta semana voy a...). Then write a plan of three days with what you will do, and one sentence on how you will know whether you met your goal.",
      scheme: [
        "States a goal with esta semana voy a plus an infinitive",
        "Includes a number of times or a length of time that is measurable",
        "Gives a plan for three days with specific activities",
        "Explains how success will be checked, such as a log or checklist",
      ],
      model:
        "Esta semana voy a escuchar un pódcast en español diez minutos, tres veces. El lunes escucho un pódcast sobre música. El miércoles leo un titular. El viernes envío un mensaje a mi amigo. Voy a usar un registro para marcar cada día.",
      answers: [
        [
          "full",
          "[[0|Esta semana voy a leer un artículo corto en español.]] [[1|Voy a leer quince minutos, cuatro veces.]] [[2|El lunes leo sobre el fútbol, el miércoles sobre música y el viernes sobre comida.]] [[3|Voy a marcar los días en una lista en mi cuaderno.]]",
          "Muy bien. Your goal is specific, measurable and realistic, and you chose topics you like.",
        ],
        [
          "full",
          "[[0|Esta semana voy a hablar en español con mi amigo Luis.]] [[1|Vamos a hablar cinco minutos cada día.]] [[2|El martes hablamos de la escuela, el jueves de la música y el sábado de los planes.]] [[3|Voy a escribir una marca en el calendario después de cada conversación.]]",
          "Excelente. Planning the topic for each day makes it easier to follow through.",
        ],
        [
          "partial",
          "[[0|Esta semana voy a estudiar español.]] El lunes voy a ver un video. El miércoles voy a escuchar música. El viernes leo un libro. Voy a ver si funciona.",
          "Make the goal measurable: say how many minutes or times. Say how you will check, for example with a log.",
        ],
        [
          "partial",
          "[[0|Voy a escuchar música en español tres veces.]] [[1|Veinte minutos cada vez.]] [[3|Voy a marcar en un registro.]]",
          "Start with esta semana, and give a plan for three days with specific activities.",
          true,
        ],
        [
          "weak",
          "This week I am going to listen to Spanish music and read a book. I will check it at the end.",
          "Please write in Spanish: esta semana voy a escuchar música en español. Give the number of times.",
        ],
        [
          "weak",
          "Yo voy hablar español mucho. Cada día. Yo bueno.",
          "Say esta semana voy a hablar en español diez minutos tres veces. Use specific numbers.",
        ],
      ],
    },
  ],
};

writeCourse("spanish-ii-grade-10.json", "Spanish II", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
