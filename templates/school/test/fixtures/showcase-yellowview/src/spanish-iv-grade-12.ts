import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Spanish IV, Grade 12, Quarter 1. Standards: ACTFL World-Readiness
 * Standards, in the school's own words. Instruction and readings are mainly
 * in Spanish; learners answer in Spanish with the slips of a fourth-year
 * student (subjunctive triggers, agreement, relative pronouns, register).
 * The two short stories in weeks 2 and 4 are original.
 */

const w1: WeekInput = {
  topic: "Opiniones, deseos y dudas: el subjuntivo presente",
  note: `
## Objectives

Students will be able to:

1. discuss current events and personal opinions in Spanish using a range of tenses;
2. express wishes, doubts and emotions with the present subjunctive;
3. make recommendations and persuade others using the subjunctive after verbs of influence.

## Materials

Headlines from Spanish-language news sites (on a school issue, the environment, technology), a subjunctive trigger chart (WEIRDO), whiteboards, the worksheet.

## Starter (7 minutes)

Show a headline: "Un estudio dice que los adolescentes duermen poco." Ask in Spanish: "¿Qué opinan? ¿Creen que es verdad?" Let students give opinions without a structure. Note which sentences use creo que and which use no creo que.

## Main activity

1. Present subjunctive formation: take the yo form of the present, remove -o, and add the "opposite vowel" endings (hable, comas, escriba). Irregular: ser (sea), ir (vaya), estar (esté), dar (dé), saber (sepa), haber (haya); stem-changers and spelling changes (busque, llegue).
2. Triggers in categories: wishes and influence (quiero que, prefiero que, recomiendo que, es importante que), emotion (me alegro de que, siento que, es una lástima que), doubt and denial (dudo que, no creo que, es posible que). Contrast with certainty (creo que, estoy seguro de que), which takes the indicative. Ojalá (que) = I hope.
3. Practice: three recommendations for the school ("Recomiendo que la escuela empiece más tarde"), two emotions and two doubts.
4. Persuasive mini-speech: 60 seconds on an issue using at least four subjunctive expressions.

## Checking for understanding

Whiteboards: complete with the correct verb form: "No creo que ella (venir) hoy." "Creo que ella (venir) hoy."

## Worksheet

Subjunctive or indicative, and a recommendation paragraph.
`,
  reading: [
    "Dudas, deseos y recomendaciones",
    `
En español, el **modo** del verbo muestra la actitud del hablante: el **indicativo** presenta hechos y certezas, y el **subjuntivo** expresa deseos, emociones, dudas y cosas que no son seguras. Para formar el presente del subjuntivo, empezamos con la forma de **yo** del presente: hablo → habl-; como → com-; escribo → escrib-. Después cambiamos la vocal: los verbos en **-ar** usan **-e**, y los verbos en **-er/-ir** usan **-a**. Así tenemos: que yo **hable**, que tú **comas**, que ella **escriba**, que nosotros **hablemos**, que ellos **coman**. Los verbos con cambios de ortografía mantienen el sonido: busco → **busque**, llego → **llegue**. Hay seis verbos irregulares muy comunes: **ser** (sea), **ir** (vaya), **estar** (esté), **dar** (dé), **saber** (sepa) y **haber** (haya).

¿Cuándo usamos el subjuntivo? Normalmente hay dos partes en la oración, unidas por **que**, y el sujeto de la primera parte es diferente del sujeto de la segunda. Los verbos o las expresiones de la primera parte son el "disparador" (trigger). Se pueden recordar en categorías. Primero, **deseos e influencia**: "Quiero que mis amigos vengan", "Mis padres prefieren que yo estudie medicina", "Recomiendo que la escuela empiece más tarde", "Es importante que durmamos ocho horas". Segundo, **emociones**: "Me alegro de que tengas un trabajo", "Siento que no puedas venir", "Es una lástima que cierren la biblioteca". Tercero, **dudas y negaciones**: "Dudo que el examen sea fácil", "No creo que haya clases mañana", "Es posible que llueva".

Fíjate en el contraste. Cuando hay certeza, usamos el indicativo: "Creo que el examen es difícil", "Estoy seguro de que ella viene". Cuando hay duda o negación, usamos el subjuntivo: "No creo que el examen sea difícil", "No estoy seguro de que ella venga". Para decir "I hope," usamos **ojalá (que)** con el subjuntivo: "Ojalá que mañana haga sol".

Estos usos son muy útiles para hablar de la actualidad y dar opiniones. Si lees un titular como "Un estudio dice que los adolescentes duermen poco", puedes responder: "Me preocupa que los jóvenes no duerman lo suficiente. Recomiendo que las escuelas empiecen más tarde y que los estudiantes no usen el teléfono por la noche. Dudo que el cambio sea fácil, pero es importante que lo intentemos". Para persuadir, no basta con dar una orden: es mejor explicar por qué algo es importante y proponer una solución.
`,
  ],
  cards: [
    ["quiero que + subjuntivo", "I want (someone) to + verb"],
    ["recomiendo que + subjuntivo", "I recommend that + clause"],
    ["me alegro de que", "I am glad that"],
    ["dudo que", "I doubt that"],
    ["no creo que", "I do not believe that"],
    ["creo que + indicativo", "I believe that (certainty)"],
    ["ojalá (que)", "I hope that"],
    ["sea, vaya, esté, dé, sepa, haya", "irregular present subjunctive: be, go, be, give, know, there be"],
  ],
  closed: [
    [
      "Which sentence correctly expresses doubt?",
      ["Dudo que sea fácil.", "Dudo que es fácil.", "Dudo que fue fácil.", "Dudo que será fácil."],
      "A",
    ],
    [
      "What is the subjunctive form for \"que ellos comer\"?",
      ["coman", "comen", "comieron", "comerán"],
      "A",
    ],
    [
      "Which verb is irregular in the present subjunctive?",
      ["hablar", "comer", "ir", "escribir"],
      "C",
    ],
    [
      "Choose the correct form: \"Creo que ella ___ en casa.\"",
      ["esté", "está", "estuviera", "estaría"],
      "B",
    ],
    [
      "\"Ojalá que haga sol mañana\" means:",
      ["I know it will be sunny", "I hope it will be sunny tomorrow", "It was sunny yesterday", "It is sunny now"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a short paragraph of at least six sentences in Spanish, giving your opinion about whether Ohio high schools should start later in the morning. Include at least two recommendations with the subjunctive, one expression of emotion and one doubt.",
      scheme: [
        "Uses a recommendation or influence trigger with the subjunctive correctly (recomiendo que, es importante que)",
        "Uses a second recommendation or wish with a correct subjunctive form",
        "Uses an emotion trigger with the subjunctive correctly",
        "Uses a doubt or denial with the subjunctive, and contrasts it with the indicative where appropriate",
      ],
      model:
        "Creo que las escuelas deben empezar más tarde. Recomiendo que las clases empiecen a las ocho y media. Es importante que los estudiantes duerman ocho horas. Me preocupa que muchos jóvenes estén cansados. Dudo que el cambio sea fácil, pero ojalá que lo intenten.",
      answers: [
        [
          "full",
          "Creo que los estudiantes necesitan más sueño. [[0|Recomiendo que las escuelas empiecen a las ocho y media.]] [[1|Es importante que los adolescentes duerman ocho horas.]] [[2|Me preocupa que muchos estudiantes lleguen cansados a clase.]] [[3|Dudo que todos los padres estén de acuerdo, pero espero que escuchen a los médicos.]] Ojalá que el distrito lo piense.",
          "Muy bien. Your triggers and verb forms are correct, and you contrasted creo que with dudo que.",
        ],
        [
          "full",
          "Estoy seguro de que dormir más ayuda a aprender. [[0|Sugiero que las clases comiencen más tarde.]] [[1|Quiero que mis amigos tengan más energía.]] [[2|Me alegro de que algunas escuelas ya lo hagan.]] [[3|No creo que sea difícil cambiar el horario de los autobuses, pero es posible que cueste dinero.]]",
          "Excelente. Comiencen and tengan are correctly formed, and you used is posible que with a cost consideration.",
        ],
        [
          "partial",
          "Creo que es buena idea. [[0|Recomiendo que las escuelas empiezan más tarde.]] [[1|Quiero que yo duermo más.]] [[2|Me alegro que hay deportes.]] Dudo que es fácil.",
          "After recomiendo que use empiecen. Remember the subjunctive after quiero que (and a different subject), me alegro de que and dudo que: duerma, haya, sea.",
        ],
        [
          "partial",
          "Creo que la escuela empieza muy temprano. [[0|Recomiendo que empiece a las nueve.]] [[3|Dudo que sea posible.]] Me gusta que dormir mucho. Los estudiantes cansado.",
          "Add an emotion with a subject: me preocupa que los estudiantes estén cansados. Make cansados agree with estudiantes.",
          true,
        ],
        [
          "weak",
          "I think high schools should start later. I recommend that classes begin at 8:30. I doubt that the change will be easy.",
          "Please write your opinion in Spanish, using recomiendo que, dudo que and the subjunctive.",
        ],
        [
          "weak",
          "Yo creer escuela tarde. Yo recomendar clase nueve. Yo dudar fácil.",
          "Conjugate and use que: creo que la escuela debe empezar más tarde. Recomiendo que las clases empiecen a las nueve.",
        ],
      ],
    },
    {
      prompt:
        "Choose the correct mood (indicative or subjunctive) in each of these and explain in English why: (1) Creo que el examen ___ (ser) difícil. (2) No creo que el examen ___ (ser) difícil. (3) Me alegro de que tú ___ (venir). (4) Es verdad que ella ___ (tener) tres hermanos. Then write one original sentence in Spanish with ojalá.",
      scheme: [
        "Chooses es for (1) because creo que expresses certainty (indicative)",
        "Chooses sea for (2) because no creo que expresses doubt (subjunctive)",
        "Chooses vengas for (3) because emotion takes the subjunctive, and tiene for (4) because es verdad que expresses certainty",
        "Writes a correct sentence with ojalá and the subjunctive",
      ],
      model:
        "(1) es: creo que expresses certainty, so indicative. (2) sea: no creo que expresses doubt, so subjunctive. (3) vengas: an emotion triggers the subjunctive. (4) tiene: es verdad que is a statement of fact, so indicative. Ojalá que mañana no llueva.",
      answers: [
        [
          "full",
          "(1) [[0|es, because creo que shows certainty and takes the indicative.]] (2) [[1|sea, because no creo que expresses doubt, so the subjunctive.]] (3) [[2|vengas, because me alegro de que is an emotion, and (4) tiene, because es verdad que is a fact.]] [[3|Ojalá que mi equipo gane el partido.]]",
          "Muy bien. Your reasoning in English matches each trigger to the mood it requires.",
        ],
        [
          "full",
          "(1) [[0|es: certainty after creo que (indicative).]] (2) [[1|sea: the negation no creo que needs the subjunctive.]] (3) [[2|vengas: emotion, and tiene for (4) because it is a fact.]] [[3|Ojalá que no haga frío el sábado.]]",
          "Excelente. A short, precise explanation for each blank.",
        ],
        [
          "partial",
          "(1) [[0|es, because creo que is certainty.]] (2) es, the same. (3) viene. (4) [[2|tiene, because it is a fact.]] Ojalá que llueve.",
          "In (2) the negation triggers the subjunctive: sea. In (3) use vengas. After ojalá que use the subjunctive: llueva.",
        ],
        [
          "partial",
          "(1) es. (2) [[1|sea, because it is doubt.]] (3) vengas. (4) tengo. [[3|Ojalá que tenga suerte.]]",
          "In (4) the subject is ella, so use tiene. Add the reason for each answer, in English.",
          true,
        ],
        [
          "weak",
          "(1) ser (2) ser (3) venir (4) tener. Ojalá hoy.",
          "Conjugate each verb: es, sea, vengas, tiene. Say why each mood is used, and write a full ojalá sentence.",
        ],
        [
          "weak",
          "All of these use the subjunctive because the subjunctive is more formal. Ojalá que yo sabes.",
          "Only doubt, emotion and influence take the subjunctive. After ojalá que, use sepa.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Un tema del cuento, el futuro y el condicional",
  note: `
## Objectives

Students will be able to:

1. hold a discussion about a theme from the story, giving reasons and examples;
2. talk about the future using the future tense and the conditional.

## Materials

A short original story (in the reading), discussion prompt cards, a chart of future and conditional endings, whiteboards, the quiz.

## Starter (6 minutes)

Write a question: "Si pudieras cambiar una cosa de tu comunidad, ¿qué cambiarías?" Students answer orally. Note the future and conditional forms they try, and use them to introduce the lesson.

## Main activity

1. Read "El examen de Lucía" aloud. Identify characters, setting and the theme (pressure versus honesty). Discuss: "¿Qué hizo Lucía? ¿Por qué? ¿Qué harías tú?"
2. Future tense: add endings (-é, -ás, -á, -emos, -án) to the infinitive: hablaré, comerás, escribirá. Irregular stems: tendr-, podr-, har-, dir-, saldr-, vendr-, pondr-, sabr-, querr-. Use for plans and predictions: "Dentro de diez años, viviré en otra ciudad."
3. Conditional: same stems with -ía endings: hablaría, comerías. Use for polite requests, advice and hypotheticals: "Yo diría la verdad." "¿Podría ayudarme?"
4. Discussion in groups: give an opinion, a reason, and an example. Use phrases: Creo que..., porque..., por ejemplo...

## Checking for understanding

Whiteboards: "Mañana (tener, yo) un examen." "Yo (decir) la verdad."

## Quiz

Future, conditional and a story question.
`,
  reading: [
    "El examen de Lucía",
    `
Lucía estudiaba el último año en una escuela de Columbus. Era una estudiante responsable, hija de padres mexicanos que trabajaban en dos empleos para pagar sus estudios. Esa noche de noviembre, a las once, Lucía todavía estaba despierta en su cuarto, mirando el libro de química. Al día siguiente tenía un examen importante, y necesitaba una nota alta para obtener una beca universitaria.

Su amigo Daniel le mandó un mensaje: "Tengo las respuestas del examen. Mi primo las recibió de un estudiante del año pasado. ¿Las quieres?" Lucía miró el teléfono durante mucho tiempo. Pensó en sus padres, que habían sacrificado tanto. Pensó en la beca. También pensó en la señora Ramírez, su profesora, que siempre decía: "La honestidad vale más que una nota".

A las once y media, Lucía escribió: "Gracias, Daniel, pero no". Cerró el libro, apagó la luz y trató de dormir. Por la mañana hizo el examen sin ayuda. Le pareció difícil. Cuando salió del salón, no sabía si había pasado.

Una semana después, la señora Ramírez le dio la nota: ochenta y cuatro. No era la nota perfecta que quería, pero Lucía sonrió. Luego la profesora le dijo en voz baja: "Daniel y otros tres estudiantes sacaron cien. Yo sé que tenían las respuestas. Hablaré con el director mañana". Lucía no dijo nada, pero sintió que había hecho lo correcto.

Este cuento nos invita a hablar de la presión, la honestidad y las consecuencias. Para discutir un tema, expresa tu **opinión**, da una **razón** y un **ejemplo**: "Creo que la honestidad es más importante que una nota porque la confianza es difícil de recuperar. Por ejemplo, Lucía perdió la oportunidad de una nota alta, pero ganó respeto."

Para hablar del futuro, usamos el **futuro simple**: añadimos -é, -ás, -á, -emos, -án al infinitivo: **hablaré, comerás, escribirá**. Algunos verbos tienen raíces irregulares: **tendré, podré, haré, diré, saldré, vendré, pondré, sabré, querré**. El **condicional** usa la misma raíz y las terminaciones -ía, -ías, -ía, -íamos, -ían: **hablaría, comerías, diría, tendría**. Se usa para dar consejos, ser cortés y hablar de situaciones hipotéticas: "Yo diría la verdad", "¿Podría ayudarme?", "Si pudiera, estudiaría medicina".
`,
  ],
  cards: [
    ["la honestidad", "honesty"],
    ["la beca", "scholarship"],
    ["hablaré, comerás, escribirá", "future: I will speak, you will eat, he or she will write"],
    ["tendré, podré, haré, diré", "irregular future: I will have, be able, do, say"],
    ["hablaría, diría, tendría", "conditional: I would speak, say, have"],
    ["Creo que + opinión, porque + razón", "I believe that + opinion, because + reason"],
    ["por ejemplo", "for example"],
    ["Yo diría la verdad.", "I would tell the truth."],
  ],
  closed: [
    [
      "What did Lucía do when Daniel offered her the answers?",
      ["She accepted them", "She declined them", "She reported him at once", "She asked her parents"],
      "B",
    ],
    [
      "Which sentence uses the future tense correctly?",
      ["Mañana tengo un examen.", "Mañana tendré un examen.", "Mañana tenía un examen.", "Mañana tuve un examen."],
      "B",
    ],
    [
      "How do you say \"I would say the truth\"?",
      ["Diré la verdad", "Diría la verdad", "Digo la verdad", "Dije la verdad"],
      "B",
    ],
    [
      "A theme of the story is:",
      ["Friendship in sports", "Honesty and pressure", "A trip to Mexico", "A science experiment"],
      "B",
    ],
    [
      "Which is the irregular future stem of \"hacer\"?",
      ["hacer-", "har-", "hag-", "hac-"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "In Spanish, in six sentences, discuss the theme of honesty in \"El examen de Lucía.\" Give an opinion, two reasons, and an example from the story. Say what you would do in Lucía's place, using the conditional.",
      scheme: [
        "States a clear opinion about honesty with creo que or pienso que",
        "Gives a reason with porque",
        "Gives an example from the story with por ejemplo",
        "Uses the conditional correctly to say what they would do",
      ],
      model:
        "Creo que la honestidad es más importante que una nota alta. Es importante porque la confianza es difícil de recuperar. Por ejemplo, Lucía dijo que no a Daniel, aunque quería una beca. En su lugar, yo haría lo mismo y estudiaría más.",
      answers: [
        [
          "full",
          "[[0|Creo que Lucía tomó la decisión correcta.]] [[1|Es importante ser honesto porque la confianza es difícil de recuperar y una nota falsa no muestra lo que sabes.]] [[2|Por ejemplo, Lucía no aceptó las respuestas y al final ganó el respeto de su profesora.]] [[3|En su lugar, yo habría dicho que no también, y hablaría con la profesora.]] Pienso que la presión es fuerte, pero la honestidad vale más.",
          "Muy bien. Your opinion, reasons and an example from the story are organized well.",
        ],
        [
          "full",
          "[[0|Pienso que la honestidad es esencial en la escuela.]] [[1|Es verdad porque las notas falsas dañan a los otros estudiantes.]] [[2|Por ejemplo, Daniel y otros tres sacaron cien sin estudiar.]] [[3|Yo diría que no, y le pediría ayuda a mi profesora.]] Creo que el cuento nos enseña que hay consecuencias.",
          "Excelente. You used diría and pediría accurately and referred to details from the text.",
        ],
        [
          "partial",
          "[[0|Creo que Lucía es una buena estudiante.]] [[1|Es honesta porque no aceptó las respuestas.]] Yo diré que no. Los padres de Lucía es importante.",
          "Use the conditional for what you would do: yo diría que no. Lucía's parents are plural: los padres de Lucía son importantes. Add an example introduced with por ejemplo.",
        ],
        [
          "partial",
          "[[2|Por ejemplo, Lucía escribió: 'Gracias, Daniel, pero no'.]] [[3|Yo haría lo mismo.]] La honestidad es bueno.",
          "State your opinion with creo que and a reason with porque. Honestidad is feminine: la honestidad es buena.",
          true,
        ],
        [
          "weak",
          "I think honesty is important. Lucía said no to Daniel. I would say no too.",
          "Please write in Spanish: creo que la honestidad es importante, por ejemplo Lucía dijo que no, yo diría que no.",
        ],
        [
          "weak",
          "Lucía honestidad bueno. Daniel malo. Yo no copiar.",
          "Use full sentences: Lucía fue honesta. Daniel hizo algo malo. Yo no copiaría.",
        ],
      ],
    },
    {
      prompt:
        "Write six sentences in Spanish about your life in ten years. Use the future tense at least four times, with two irregular verbs (tener, poder, hacer, decir, salir, venir, poner, saber, querer), and one conditional sentence about what you would do if you had a million dollars.",
      scheme: [
        "Uses at least four correct future-tense verbs",
        "Uses at least two irregular futures correctly (tendré, podré, haré, diré, saldré...)",
        "Uses the conditional correctly in a hypothetical (si tuviera... haría / compraría)",
        "Writes coherent sentences with mostly correct accents",
      ],
      model:
        "Dentro de diez años viviré en otra ciudad. Estudiaré medicina y trabajaré en un hospital. Tendré una casa pequeña y podré viajar. Haré voluntariado. Si tuviera un millón de dólares, compraría una casa para mis padres.",
      answers: [
        [
          "full",
          "[[0|Dentro de diez años, viviré en Chicago y trabajaré como ingeniera.]] [[1|Tendré mi propio apartamento y podré viajar a México cada verano.]] Haré voluntariado en una clínica. [[2|Si tuviera un millón de dólares, construiría una escuela en el pueblo de mis abuelos.]] [[3|Mis padres vendrán a visitarme y estarán orgullosos.]]",
          "Muy bien. Your irregular futures (tendré, podré, haré, vendrán) are correct.",
        ],
        [
          "full",
          "[[0|En diez años, terminaré la universidad y trabajaré en un banco.]] [[1|Saldré con mis amigos los fines de semana y tendré tiempo para jugar al fútbol.]] [[2|Si ganara la lotería, ayudaría a mi familia y daría dinero a una organización.]] [[3|Podré comprar un carro y diré gracias a mis padres.]]",
          "Excelente. Using ganara la lotería in the hypothetical works well.",
        ],
        [
          "partial",
          "[[0|Viviré en Nueva York.]] [[1|Tendré un buen trabajo.]] Yo poderé viajar mucho. Si tengo un millón, compraré una casa.",
          "The future of poder is podré. For a hypothetical use the conditional and the past subjunctive: si tuviera un millón, compraría una casa.",
        ],
        [
          "partial",
          "[[0|Estudiaré en la universidad y trabajaré en un hospital.]] [[3|Mi familia vendrá a mi graduación.]] Si tuviera un millón, yo compro un carro.",
          "Use the conditional in the result clause: compraría un carro. Your future forms are correct.",
          true,
        ],
        [
          "weak",
          "In ten years I will live in Chicago. I will have a job and I will travel. If I had a million dollars I would buy a house.",
          "Please write in Spanish: dentro de diez años viviré en Chicago, tendré un trabajo, si tuviera un millón compraría una casa.",
        ],
        [
          "weak",
          "Yo vivir Chicago. Yo tener trabajo. Yo viajar. Millón casa comprar.",
          "Use the future: viviré, tendré, viajaré. For the million dollars: compraría una casa.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Cláusulas relativas, conectores y la lectura de noticias",
  note: `
## Objectives

Students will be able to:

1. use relative clauses and connectors to give longer and more detailed answers;
2. understand the main points and supporting details of an authentic news article.

## Materials

A short Spanish-language news article about a community program (provided), a list of connectors, highlighters, whiteboards, the worksheet, quiz and problem set.

## Starter (6 minutes)

Give two short sentences: "Tengo un amigo. Mi amigo vive en Madrid." Ask students to combine them into one: "Tengo un amigo que vive en Madrid." Elicit que. Write more pairs.

## Main activity

1. Relative pronouns: que (people, things), quien/quienes (people, after prepositions), donde (places), lo que (what, the thing that). Examples: "La profesora que me enseña español es de Colombia." "El pueblo donde nació mi abuela está en las montañas." "Lo que más me gusta es la música."
2. Connectors: además (besides), sin embargo (however), por lo tanto (therefore), en cambio (on the other hand), aunque (although), a pesar de que (in spite of the fact that), por eso (that's why), mientras que (while). Use the subjunctive after aunque when doubt or hypothetical.
3. Read an authentic article: find the headline, the 5 W's (quién, qué, cuándo, dónde, por qué), a supporting detail and a quotation. Highlight connectors.
4. Expand a short answer into a detailed one with at least two relative clauses and two connectors.

## Checking for understanding

Ask: "¿Cómo se dice 'The book that I read'?" and "Complete: 'Quiero estudiar, ___ tengo sueño.'" (aunque).

## Worksheet, quiz and problem set

Combining sentences and reading questions.
`,
  reading: [
    "Respuestas más largas y noticias más claras",
    `
Cuando hablamos y escribimos a un nivel más avanzado, necesitamos combinar ideas para dar respuestas más completas. Una herramienta es la **cláusula relativa**, una parte de la oración que describe un sustantivo y empieza con un pronombre relativo. El más común es **que**: "La profesora **que** me enseña español es de Colombia." "El libro **que** leí fue fascinante." Para personas, después de una preposición, usamos **quien/quienes**: "La mujer con **quien** hablé trabaja en el hospital." Para lugares usamos **donde**: "El pueblo **donde** nació mi abuela está en las montañas." Y cuando nos referimos a una idea general, usamos **lo que**: "**Lo que** más me gusta es la música." Con estos pronombres evitamos oraciones cortas y repetitivas.

Otra herramienta son los **conectores**, palabras que muestran la relación entre las ideas. Para añadir información: **además** (besides) y **también**. Para contraste: **sin embargo** (however), **en cambio** (on the other hand) y **mientras que** (while). Para resultado: **por lo tanto** (therefore) y **por eso** (that's why). Para concesión: **aunque** (although) y **a pesar de que** (in spite of the fact that). Después de aunque usamos el indicativo si hablamos de un hecho ("Aunque llueve, voy a salir") y el subjuntivo si es una posibilidad o una duda ("Aunque llueva, voy a salir").

Ahora, lee un texto parecido a un artículo de noticias.

"**Columbus abre un nuevo centro para familias latinas.** Un nuevo centro comunitario, que abrió ayer en el barrio de Hilltop, ofrece clases de inglés, ayuda con trámites y actividades para jóvenes. Según la directora, Marta Quintero, el centro, que recibió una donación de la ciudad, atenderá a unas 300 familias cada mes. 'Lo que más necesitamos es un lugar donde las familias se sientan bienvenidas', dijo. Sin embargo, algunos vecinos expresaron su preocupación por el tráfico. La directora respondió que el centro, por lo tanto, tendrá estacionamiento y buscará soluciones con el barrio."

Para entender una noticia, busca las **cinco preguntas** básicas: **¿Quién?** (Marta Quintero, el centro), **¿Qué?** (abre un centro), **¿Cuándo?** (ayer), **¿Dónde?** (Hilltop, Columbus), **¿Por qué?** (para ayudar a las familias). El **titular** da la idea principal, el primer párrafo resume, y las **citas** muestran las voces de las personas. Los conectores como "según", "sin embargo" y "por lo tanto" indican de dónde viene la información y cómo se relacionan las ideas.
`,
  ],
  cards: [
    ["que / quien / donde", "that, who / who (after a preposition) / where"],
    ["lo que", "what, the thing that"],
    ["además", "besides, in addition"],
    ["sin embargo", "however"],
    ["por lo tanto", "therefore"],
    ["aunque + subjuntivo", "even if / although (doubt)"],
    ["a pesar de que", "in spite of the fact that"],
    ["el titular", "the headline"],
  ],
  closed: [
    [
      "Which sentence correctly combines: \"Tengo un amigo. Mi amigo vive en Madrid.\"?",
      ["Tengo un amigo quien vive en Madrid.", "Tengo un amigo que vive en Madrid.", "Tengo un amigo donde vive en Madrid.", "Tengo un amigo lo que vive en Madrid."],
      "B",
    ],
    [
      "Which connector shows contrast?",
      ["además", "por lo tanto", "sin embargo", "por eso"],
      "C",
    ],
    [
      "Complete: \"El pueblo ___ nació mi abuela está en las montañas.\"",
      ["que", "quien", "donde", "lo que"],
      "C",
    ],
    [
      "In the news article, who is Marta Quintero?",
      ["A neighbor who complained", "The director of the center", "A city official", "A teacher"],
      "B",
    ],
    [
      "\"Aunque llueva, voy a salir\" suggests the rain is:",
      ["A certain fact", "A possibility", "Already over", "Impossible"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Combine each pair of sentences into one with a relative clause (que, donde, quien or lo que), and then write two sentences of your own with connectors: (1) Tengo una profesora. Mi profesora enseña química. (2) Conozco un restaurante. El restaurante sirve comida colombiana. (3) Hablé con una mujer. La mujer trabaja en el centro. Use sin embargo and por lo tanto in your own sentences.",
      scheme: [
        "Combines pair 1 correctly with que",
        "Combines pair 2 correctly with que or donde",
        "Combines pair 3 correctly with que or quien and uses correct agreement",
        "Writes two original sentences using sin embargo and por lo tanto correctly",
      ],
      model:
        "(1) Tengo una profesora que enseña química. (2) Conozco un restaurante que sirve comida colombiana. (3) Hablé con una mujer que trabaja en el centro. Quería ir al concierto; sin embargo, tenía que estudiar. Estudié mucho; por lo tanto, saqué una buena nota.",
      answers: [
        [
          "full",
          "(1) [[0|Tengo una profesora que enseña química.]] (2) [[1|Conozco un restaurante donde sirven comida colombiana.]] (3) [[2|Hablé con una mujer que trabaja en el centro.]] [[3|Quería ir al concierto; sin embargo, tenía un examen. Estudié mucho; por lo tanto, saqué una buena nota.]]",
          "Muy bien. Donde sirven is a correct and natural alternative for the second pair.",
        ],
        [
          "full",
          "(1) [[0|Tengo una profesora que enseña química.]] (2) [[1|Conozco un restaurante que sirve comida colombiana.]] (3) [[2|Hablé con la mujer con quien trabaja mi madre en el centro.]] [[3|Es un barrio tranquilo; sin embargo, hay mucho tráfico. Llegué tarde; por lo tanto, perdí el autobús.]]",
          "Excelente. Using con quien shows a more complex structure.",
        ],
        [
          "partial",
          "(1) [[0|Tengo una profesora que enseña química.]] (2) Conozco un restaurante quien sirve comida colombiana. (3) [[2|Hablé con una mujer que trabaja en el centro.]] Quiero ir, sin embargo no puedo. Estudié, por lo tanto saqué buena nota.",
          "Use que or donde for a restaurant, not quien (quien refers to people). Use a semicolon or a comma before the connector.",
        ],
        [
          "partial",
          "(1) Tengo una profesora que enseña química. (2) [[1|Conozco un restaurante que sirve comida colombiana.]] (3) Hablé con una mujer quien trabajan en el centro. [[3|Es difícil; sin embargo, me gusta.]]",
          "Quien takes a singular verb here: que trabaja. Add por lo tanto in a sentence of your own.",
          true,
        ],
        [
          "weak",
          "(1) I have a teacher who teaches chemistry. (2) I know a restaurant that serves Colombian food. (3) I spoke with a woman who works at the center.",
          "Please write in Spanish: tengo una profesora que enseña química.",
        ],
        [
          "weak",
          "(1) Profesora química. (2) Restaurante comida colombiana. (3) Mujer centro. Sin embargo por lo tanto.",
          "Use que to join them: tengo una profesora que enseña química. Write complete original sentences with the connectors.",
        ],
      ],
    },
    {
      prompt:
        "Answer in Spanish, based on the article about the new center in Hilltop: (1) ¿Qué ofrece el centro? (2) ¿Por qué algunos vecinos están preocupados? (3) ¿Qué solución propone la directora? Use at least one connector and one relative clause in your answers.",
      scheme: [
        "States what the center offers (clases de inglés, ayuda con trámites, actividades para jóvenes)",
        "States the neighbors' concern about traffic",
        "States the director's solution, such as parking and working with the neighborhood",
        "Uses at least one connector and one relative clause correctly",
      ],
      model:
        "(1) El centro ofrece clases de inglés, ayuda con trámites y actividades para jóvenes. (2) Algunos vecinos están preocupados por el tráfico. (3) La directora dice que el centro, que tendrá estacionamiento, buscará soluciones con el barrio.",
      answers: [
        [
          "full",
          "(1) [[0|El centro ofrece clases de inglés, ayuda con trámites y actividades para jóvenes.]] (2) [[1|Algunos vecinos están preocupados por el tráfico.]] (3) [[2|La directora promete que el centro tendrá estacionamiento y buscará soluciones con el barrio.]] [[3|Los vecinos tienen una preocupación; sin embargo, la directora, que habló con ellos, propone soluciones.]]",
          "Muy bien. You answered all three and used a relative clause and a connector in the last sentence.",
        ],
        [
          "full",
          "(1) [[0|Hay clases de inglés, ayuda con trámites y actividades para los jóvenes.]] (2) [[1|A los vecinos les preocupa el tráfico que habrá cerca del centro.]] (3) [[2|La directora dice que habrá estacionamiento y que hablarán con el barrio.]] [[3|Por lo tanto, el centro, que quiere ser un buen vecino, busca una solución.]]",
          "Excelente. A los vecinos les preocupa is a strong, natural structure.",
        ],
        [
          "partial",
          "(1) [[0|El centro ofrece clases de inglés.]] (2) Los vecinos preocupado porque el centro. (3) [[2|La directora dice que habrá estacionamiento.]]",
          "Los vecinos están preocupados por el tráfico. Your answers to 1 and 3 are accurate but short; add a connector.",
        ],
        [
          "partial",
          "(1) El centro ofrece muchas cosas. (2) [[1|Los vecinos están preocupados por el tráfico.]] (3) [[2|La directora busca soluciones con el barrio.]] [[3|El centro, que abrió ayer, es importante.]]",
          "Name specific services in answer 1: clases de inglés, ayuda con trámites, actividades para jóvenes.",
          true,
        ],
        [
          "weak",
          "(1) The center offers English classes. (2) The neighbors are worried about traffic. (3) The director says there will be parking.",
          "Please write your answers in Spanish: el centro ofrece clases de inglés. Los vecinos están preocupados por el tráfico.",
        ],
        [
          "weak",
          "(1) Centro. (2) Vecinos tráfico. (3) Directora estacionamiento.",
          "Write complete sentences: el centro ofrece clases. Los vecinos están preocupados por el tráfico.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Leer un cuento y resumir un podcast",
  note: `
## Objectives

Students will be able to:

1. read a short story in Spanish and identify the characters, setting and conflict;
2. listen to a podcast or a news broadcast and summarize it.

## Materials

The original story "La última parada" (in the reading), a character and conflict organizer, a short authentic podcast clip (3 to 4 minutes) from a news site, note-taking sheets, the quiz, problem set and worksheet.

## Starter (6 minutes)

Ask: "¿Qué hace que un cuento sea interesante?" Collect ideas: personajes, conflicto, final sorpresa. Introduce the vocabulary: el personaje, el escenario, el conflicto, el clímax, el desenlace.

## Main activity

1. Read "La última parada" in two passes: first for gist, then for details. Fill in an organizer: personajes (who), escenario (where and when), conflicto (what problem), clímax (turning point), desenlace (resolution), tema.
2. Listening: play a 3-minute podcast clip twice. First listening: main idea and keywords. Second: three details and numbers. Take notes in Spanish keywords, not full sentences.
3. Summarizing: write or say a 5-sentence summary using past tenses and connectors: "El podcast habla de... Según el presentador... Además... Al final..."
4. Practice with a partner: summarize in 40 seconds.

## Checking for understanding

Ask: "¿Cuál es el conflicto del cuento? ¿Quién es el protagonista?"

## Quiz, problem set and worksheet

Story analysis and a podcast summary.
`,
  reading: [
    "La última parada",
    `
Eran las seis de la tarde en una fría noche de enero, y Mateo esperaba el autobús número 10 en una parada de Columbus. Tenía diecisiete años y llevaba una mochila pesada. Había salido tarde del ensayo de la banda de la escuela y todavía tenía que llegar al restaurante de su tío, donde trabajaba tres noches a la semana. Si llegaba tarde otra vez, su tío, que siempre había sido muy amable con él, tendría que hablar con él en serio.

El autobús llegó con diez minutos de retraso. Mateo subió, mostró su pase y se sentó al lado de una señora mayor. La señora llevaba un abrigo gris y sostenía una bolsa con las dos manos. Se veía nerviosa. "Perdón, joven", le dijo en voz baja, con un acento que Mateo reconoció como colombiano, el mismo de su abuela. "¿Sabe usted dónde queda la calle Cuarta y Cleveland? Mi hijo me espera, pero perdí el papel con la dirección".

Mateo miró el reloj. Esa parada estaba lejos de la suya, en dirección contraria. Pensó en el restaurante, en su tío, en el pago de la noche. Pero la señora lo miraba con ojos preocupados, y Mateo recordó a su abuela, que había llegado a Ohio sin hablar inglés. Respiró hondo y dijo: "Yo la acompaño, señora".

Se bajaron en la última parada. Hacía mucho frío, y la calle estaba casi vacía. Caminaron cinco minutos hasta que, de repente, un hombre alto salió de un edificio y corrió hacia ellos. "¡Mamá!", gritó. La señora lo abrazó, llorando de alegría. El hijo le dio las gracias a Mateo cien veces y quiso darle dinero, pero Mateo lo rechazó. Llamó a su tío y le explicó lo que había pasado. Su tío, en lugar de enojarse, le dijo: "Hiciste lo correcto, sobrino. Mañana hablamos". Mateo regresó en el próximo autobús, cansado pero tranquilo.

**Personajes**: Mateo (el protagonista), la señora colombiana, su hijo y el tío de Mateo. **Escenario**: una parada de autobús y las calles de Columbus en una noche de invierno. **Conflicto**: Mateo debe decidir entre llegar a tiempo a su trabajo y ayudar a una desconocida. **Clímax**: Mateo decide acompañarla. **Desenlace**: la señora encuentra a su hijo y el tío entiende. **Tema**: la solidaridad y la empatía.
`,
  ],
  cards: [
    ["el personaje", "character"],
    ["el escenario", "setting"],
    ["el conflicto", "conflict"],
    ["el clímax", "climax, turning point"],
    ["el desenlace", "resolution, ending"],
    ["el tema", "theme"],
    ["resumir", "to summarize"],
    ["según el presentador", "according to the host"],
  ],
  closed: [
    [
      "Who is the protagonist of \"La última parada\"?",
      ["Mateo", "El tío", "El hijo", "La señora"],
      "A",
    ],
    [
      "What is Mateo's conflict?",
      ["He lost his backpack", "He must choose between getting to work on time and helping a stranger", "He fights with his uncle", "He misses the band rehearsal"],
      "B",
    ],
    [
      "What is the setting of the story?",
      ["A beach in summer", "A bus stop and streets in Columbus on a winter night", "A school classroom", "A restaurant kitchen"],
      "B",
    ],
    [
      "Which tense best narrates the main events in the story?",
      ["Present", "Preterite and imperfect", "Future", "Conditional"],
      "B",
    ],
    [
      "A good podcast summary should include:",
      ["Every word you heard", "The main idea and key details in your own words", "Only your opinion", "The names of the sponsors"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "In Spanish, identify the characters, the setting and the conflict of \"La última parada,\" then explain in two sentences the moment of change (the clímax) and what it shows about Mateo.",
      scheme: [
        "Identifies the characters (Mateo, la señora, el hijo, el tío)",
        "Identifies the setting (parada de autobús, Columbus, noche de invierno)",
        "Identifies the conflict (llegar a tiempo al trabajo o ayudar a una desconocida)",
        "Explains the climax (Mateo decide acompañarla) and what it shows about his character, such as empathy",
      ],
      model:
        "Los personajes son Mateo, una señora colombiana, su hijo y el tío de Mateo. El escenario es una parada de autobús en Columbus, una noche de invierno. El conflicto es que Mateo debe elegir entre llegar al trabajo o ayudar a la señora. En el clímax, Mateo dice 'Yo la acompaño', lo cual muestra que es empático y generoso.",
      answers: [
        [
          "full",
          "[[0|Los personajes son Mateo, la señora colombiana, su hijo y el tío.]] [[1|El escenario es una parada de autobús y las calles de Columbus en una noche fría de enero.]] [[2|El conflicto es que Mateo no sabe si ayudar a la señora o llegar a tiempo al restaurante.]] [[3|En el clímax Mateo dice: 'Yo la acompaño', y eso muestra que es una persona empática que piensa en su abuela.]]",
          "Muy bien. You linked the climax to what it reveals about the character.",
        ],
        [
          "full",
          "[[0|Mateo es el protagonista; los otros personajes son una señora, su hijo y el tío de Mateo.]] [[1|La acción ocurre en Columbus, en una parada de autobús, durante el invierno.]] [[2|El problema principal es la presión del tiempo: si llega tarde, tiene problemas con su tío.]] [[3|El punto decisivo es cuando se baja con la señora; esto demuestra su generosidad y su empatía.]]",
          "Excelente. Explaining the problem as pressure of time is an astute reading.",
        ],
        [
          "partial",
          "[[0|Los personajes son Mateo, la señora y el tío.]] [[1|El escenario es Columbus.]] El conflicto es que Mateo está cansado. [[3|El clímax es cuando acompaña a la señora.]]",
          "The conflict is not only tiredness: Mateo must choose between work and helping. Complete the setting with the bus stop and winter night.",
        ],
        [
          "partial",
          "[[2|El conflicto es llegar tarde o ayudar a la señora.]] [[3|Mateo la acompaña porque es amable.]] Los personajes es Mateo y su abuela.",
          "The characters in the story are Mateo, the lady, her son and his uncle. His grandmother is only a memory. Name them all.",
          true,
        ],
        [
          "weak",
          "The characters are Mateo and an old lady. It takes place on a bus. The conflict is that it is cold.",
          "Please write in Spanish. The conflict is a choice for Mateo, not the weather.",
        ],
        [
          "weak",
          "Mateo es un chico. La señora es vieja. El cuento es en autobús. Mateo ayuda.",
          "Name all the characters, add the setting and explain the conflict in complete sentences.",
        ],
      ],
    },
    {
      prompt:
        "Write a five-sentence summary in Spanish of a podcast or news story you listened to (or of a story you invent about a community event). Use past tenses and at least three of these phrases: el tema es, según, además, sin embargo, al final.",
      scheme: [
        "States the main topic with el podcast / la noticia habla de",
        "Uses según to attribute information to a source",
        "Includes a supporting detail with a number or name",
        "Uses at least three connectors and correct past tenses",
      ],
      model:
        "La noticia habla de un nuevo parque en el barrio. Según la alcaldesa, el parque abrirá en mayo. Además, tendrá una cancha de fútbol y un jardín comunitario. Sin embargo, algunos vecinos preferían un estacionamiento. Al final, el consejo votó a favor del parque.",
      answers: [
        [
          "full",
          "[[0|El podcast habla de un programa de reciclaje en Cleveland.]] [[1|Según la presentadora, el programa empezó hace un año.]] [[2|Además, 5,000 familias participan y reciclan el 30% más.]] [[3|Sin embargo, algunas personas dijeron que es difícil separar la basura. Al final, la ciudad decidió dar clases a los vecinos.]]",
          "Muy bien. Your summary has a topic, an attribution, a number and connectors.",
        ],
        [
          "full",
          "[[0|La noticia trata de un equipo de robótica de una escuela de Dayton.]] [[1|Según el entrenador, ganaron el campeonato estatal.]] [[2|Además, 12 estudiantes construyeron el robot en tres meses.]] [[3|Sin embargo, tuvieron problemas con la batería. Al final, ganaron por dos puntos.]]",
          "Excelente. The past tenses are correct, and the number supports the summary.",
        ],
        [
          "partial",
          "[[0|La noticia habla de un parque.]] [[1|Según el alcalde, el parque abre en mayo.]] Hay una cancha. Los vecinos como el parque. Al final.",
          "Add a number or a name as a detail and finish the last sentence: al final, el consejo votó a favor.",
        ],
        [
          "partial",
          "[[2|Un equipo de 12 estudiantes construyó un robot.]] [[3|Sin embargo, tuvieron problemas.]] Es sobre robótica. Según ellos ganan.",
          "Say what the report is about with la noticia habla de. Use the past tense: según ellos, ganaron.",
          true,
        ],
        [
          "weak",
          "The podcast was about a new park. According to the mayor it opens in May. At the end the council voted yes.",
          "Please write the summary in Spanish: el podcast habla de un parque. Según la alcaldesa, abre en mayo.",
        ],
        [
          "weak",
          "Podcast parque. Alcaldesa mayo. Neighbors yes. Final.",
          "Use complete sentences: el podcast habla de un parque nuevo. Según la alcaldesa, abre en mayo.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Un correo formal, mis planes y un ensayo persuasivo",
  note: `
## Objectives

Students will be able to:

1. write a formal email to a company or school in Spanish;
2. present their plans for college and work after high school in Spanish;
3. write a persuasive essay about an issue that matters in their community.

## Materials

A model formal email to a university in Spain asking about a summer program, a bank of formal phrases, the essay rubric, graphic organizer for persuasive writing, the problem set and worksheet.

## Starter (6 minutes)

Show two versions of a message: a text to a friend and an email to a university. Ask: "¿Qué diferencias ven? ¿Por qué es importante el registro?" Elicit the words usted, estimado, atentamente.

## Main activity

1. Formal email structure: asunto, saludo (Estimado señor / Estimada señora / A quien corresponda), propósito (Me dirijo a usted para solicitar información sobre...), detalles, cierre (Le agradezco de antemano su atención / Quedo a su disposición), despedida (Atentamente / Cordialmente) and signature. Use usted, subjunctive for politeness (le pido que me envíe), and the conditional (me gustaría).
2. Plans presentation: use the future and conditional with phrases: Después de graduarme, voy a... Quisiera estudiar... Me gustaría trabajar como... Para lograrlo, tendré que... Practice a 60-second talk.
3. Persuasive essay structure: tesis, tres argumentos con ejemplos, contraargumento y refutación, conclusión. Use connectors and the subjunctive: Es necesario que..., Dudo que..., Aunque algunos piensen que..., sin embargo... Choose a local issue: transporte público, agua limpia, horarios escolares, parques.

## Checking for understanding

Ask: "¿Cómo empiezas un correo formal? ¿Cómo lo cierras?"

## Problem set and worksheet

A formal email and an essay outline.
`,
  reading: [
    "Escribir con un propósito",
    `
El **registro** formal es necesario cuando escribimos a una empresa, una universidad o una persona que no conocemos bien. Un correo formal tiene una estructura clara. Empieza con el **asunto** (por ejemplo, "Solicitud de información sobre el programa de verano"). Sigue el **saludo**: "Estimado señor López:", "Estimada señora Pérez:" o, si no conoces el nombre, "A quien corresponda:". Luego presentas tu **propósito**: "Me dirijo a usted para solicitar información sobre el programa de verano de su universidad". Explicas los **detalles**: "Soy estudiante de último año de la escuela secundaria en Columbus, Ohio, y me interesa estudiar español y ciencias". Haces tu petición: "Le pido que me envíe información sobre las fechas y los costos". Y cierras con cortesía: "Le agradezco de antemano su atención" o "Quedo a su disposición para cualquier pregunta". La **despedida** puede ser "Atentamente" o "Cordialmente", y después escribes tu nombre. Usa **usted**, evita las abreviaturas del teléfono y usa el condicional para ser más cortés: "Me gustaría saber si hay becas".

Cuando presentas tus **planes**, puedes combinar el futuro y el condicional: "Después de graduarme, **voy a** estudiar ingeniería en una universidad de Ohio. **Me gustaría** trabajar en energías renovables. Para lograrlo, **tendré que** estudiar matemáticas y buscar prácticas en el verano. Si pudiera, **haría** un semestre en el extranjero". Una buena presentación tiene un orden claro, ejemplos concretos y una conclusión.

En un **ensayo persuasivo**, tu objetivo es convencer al lector. La estructura clásica es: una **introducción** con una **tesis** clara; tres **argumentos**, cada uno con un ejemplo o un dato; un **contraargumento** con su **refutación**; y una **conclusión** con una llamada a la acción. Aquí hay un ejemplo de tesis: "Es necesario que Columbus mejore el transporte público para que todos los estudiantes puedan llegar a la escuela y al trabajo". Puedes apoyarla: "Primero, muchos estudiantes viven lejos de las escuelas. Segundo, el autobús es más barato que un carro. Tercero, menos carros significan menos contaminación". Y refutar: "Aunque algunos piensen que el transporte público es muy caro, la ciudad ahorraría dinero en calles y estacionamientos". Usa conectores (además, sin embargo, por lo tanto) y expresiones del subjuntivo (es importante que, dudo que, no creo que) para dar fuerza a tus ideas. Termina con una frase que invite a actuar: "Por lo tanto, les pido a los líderes de la ciudad que inviertan en un sistema de transporte más eficiente".
`,
  ],
  cards: [
    ["Estimado señor / Estimada señora", "Dear Sir / Dear Madam"],
    ["Me dirijo a usted para + verbo", "I am writing to you to + verb"],
    ["Le agradezco de antemano.", "Thank you in advance."],
    ["Quedo a su disposición.", "I remain at your disposal."],
    ["Atentamente / Cordialmente", "Sincerely"],
    ["la tesis", "thesis statement"],
    ["el contraargumento", "counterargument"],
    ["la refutación", "rebuttal"],
  ],
  closed: [
    [
      "Which is the most appropriate greeting for a formal email to an unknown person?",
      ["Hola amigo", "A quien corresponda", "Querido tú", "Oye"],
      "B",
    ],
    [
      "Which closing is appropriate for a formal email?",
      ["Chao", "Atentamente", "Nos vemos", "Saludos locos"],
      "B",
    ],
    [
      "Which phrase introduces the purpose of a formal email?",
      ["Me dirijo a usted para solicitar información", "Quiero decirte algo", "Oye, necesito algo", "Hola, ¿qué tal?"],
      "A",
    ],
    [
      "In a persuasive essay, a rebuttal:",
      ["Repeats the thesis", "Answers an opposing argument", "Introduces the topic", "Lists the sources"],
      "B",
    ],
    [
      "Which phrase expresses a plan politely?",
      ["Voy a estudiar ingeniería", "Me gustaría estudiar ingeniería", "Estudio ingeniería", "Estudié ingeniería"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a formal email in Spanish of at least eight sentences to the admissions office of a university in Spain asking about a summer program for high school students. Include the subject, the greeting, your purpose, two details about yourself, two questions, a closing and a signature.",
      scheme: [
        "Includes an appropriate subject line and greeting (Estimado señor / A quien corresponda)",
        "States the purpose clearly (me dirijo a usted para...)",
        "Gives details about themselves and asks two questions in the formal register (usted)",
        "Includes a courteous closing and despedida (le agradezco de antemano, atentamente)",
      ],
      model:
        "Asunto: Información sobre el programa de verano. Estimados señores: Me dirijo a ustedes para solicitar información sobre su programa de verano. Soy estudiante de último año en Columbus, Ohio, y estudio español desde hace cuatro años. ¿Cuáles son las fechas del programa? ¿Hay becas para estudiantes internacionales? Les agradezco de antemano su atención. Atentamente, Ana García.",
      answers: [
        [
          "full",
          "[[0|Asunto: Solicitud de información sobre el programa de verano. Estimados señores:]] [[1|Me dirijo a ustedes para solicitar información sobre su programa de verano para estudiantes de secundaria.]] Soy estudiante de último año en Columbus, Ohio, y estudio español desde hace cuatro años. [[2|Me interesan los cursos de literatura y de historia. ¿Cuáles son las fechas y el costo del programa? ¿Hay becas para estudiantes extranjeros?]] [[3|Les agradezco de antemano su atención. Atentamente, Ana Rivera.]]",
          "Muy bien. The register is formal throughout, and your questions are specific.",
        ],
        [
          "full",
          "[[0|Asunto: Preguntas sobre el curso de verano. A quien corresponda:]] [[1|Le escribo para pedir información sobre el curso de verano de su universidad.]] Voy a graduarme en junio y quisiera estudiar en España. [[2|Me gustaría saber si el curso incluye alojamiento. ¿Podría enviarme el calendario del curso?]] [[3|Quedo a su disposición para cualquier información adicional. Cordialmente, Jamal Brown.]]",
          "Excelente. Me gustaría saber and ¿podría enviarme? are polite and natural.",
        ],
        [
          "partial",
          "[[0|Asunto: información. Estimado señor:]] [[1|Quiero información sobre el programa.]] Soy estudiante en Ohio. ¿Cuándo es el programa? Hay becas? [[3|Atentamente, Sofía.]]",
          "Use a more formal purpose phrase: me dirijo a usted para... Add the question marks and more details about yourself.",
        ],
        [
          "partial",
          "Hola, estimada señora. [[1|Me dirijo a usted para pedir información.]] [[2|¿Cuáles son las fechas? ¿Cuánto cuesta?]] Gracias, chao, Luis.",
          "The closing 'chao' is too informal. End with le agradezco de antemano su atención and atentamente. Add an asunto line.",
          true,
        ],
        [
          "weak",
          "Dear Sir, I am writing to ask about the summer program. Please send me information. Thank you.",
          "Please write the email in Spanish: estimado señor, me dirijo a usted para solicitar información.",
        ],
        [
          "weak",
          "Hola. Yo quiero programa verano. Cuánto? Gracias. Chao.",
          "Write a formal email with an asunto line, a polite greeting and full sentences: me dirijo a usted para solicitar información.",
        ],
      ],
    },
    {
      prompt:
        "Write a persuasive paragraph of at least seven sentences in Spanish arguing for a change in your community (public transportation, school schedules, clean water or parks). Include a thesis, two arguments with examples, a counterargument with a rebuttal and a call to action. Use the subjunctive at least twice.",
      scheme: [
        "States a clear thesis with a subjunctive trigger (es necesario que..., es importante que...)",
        "Gives two arguments, each supported by an example or a fact",
        "Includes a counterargument and a rebuttal with aunque or sin embargo",
        "Ends with a call to action using the subjunctive or a command",
      ],
      model:
        "Es necesario que Columbus tenga más parques. Primero, los parques ayudan a la salud de los jóvenes. Segundo, reducen el calor en el verano. Aunque algunos piensen que cuestan mucho, ahorran dinero en salud. Por lo tanto, les pido a los líderes que construyan más parques.",
      answers: [
        [
          "full",
          "[[0|Es necesario que Columbus mejore el transporte público.]] [[1|Primero, muchos estudiantes viven lejos y el autobús es más barato que un carro. Segundo, menos carros significan menos contaminación en el aire.]] [[2|Aunque algunos crean que es caro, la ciudad ahorraría dinero en calles y estacionamientos.]] [[3|Por lo tanto, les pido a los líderes que inviertan en más rutas y que escuchen a los jóvenes.]]",
          "Muy bien. Your argument is complete, with two supports, a rebuttal and a request.",
        ],
        [
          "full",
          "[[0|Es importante que las escuelas empiecen más tarde.]] [[1|En primer lugar, los adolescentes necesitan dormir ocho horas. Además, los estudios muestran que las notas mejoran con más sueño.]] [[2|Aunque algunos padres digan que los horarios de trabajo son un problema, el beneficio para la salud es mayor.]] [[3|Les recomiendo que el consejo escolar vote a favor y que pruebe el cambio por un año.]]",
          "Excelente. A strong use of the subjunctive in the thesis, concession and call to action.",
        ],
        [
          "partial",
          "[[0|Es necesario que hay más parques.]] [[1|Primero, los parques son buenos para la salud. Segundo, son bonitos.]] Sin embargo, algunos dicen que son caros. [[3|Por favor, construyan más parques.]]",
          "After es necesario que use haya. Your second argument needs an example, and a counterargument needs a rebuttal.",
        ],
        [
          "partial",
          "Creo que el agua debe ser limpia. [[1|Primero, el agua sucia causa enfermedades. Segundo, los niños necesitan agua limpia.]] [[2|Aunque cuesta dinero, es importante.]] Quiero que la ciudad ayuda.",
          "State a thesis with es necesario que... and use the subjunctive in the last sentence: quiero que la ciudad ayude.",
          true,
        ],
        [
          "weak",
          "I think we need more parks. Parks are good for health. Some people say they are expensive. We should build more parks.",
          "Please write in Spanish: es necesario que construyamos más parques. Primero, los parques son buenos para la salud.",
        ],
        [
          "weak",
          "Parque bueno. Yo gusta. Ciudad construir. Gracias.",
          "Write a thesis and arguments: es necesario que la ciudad construya más parques porque son buenos para la salud.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "La inmigración desde distintas perspectivas, y el arte que nos habla",
  note: `
## Objectives

Students will be able to:

1. analyze how a social issue, such as immigration, is viewed in different Spanish-speaking communities;
2. analyze a work of art or a film from the Spanish-speaking world for its message.

## Materials

A short set of perspectives (as quotes from fictional or composite speakers in the reading), a chart for perspective analysis, stills from the film "Roma" (2018) and murals by Diego Rivera, the worksheet.

## Starter (6 minutes)

Write on the board: "inmigración." Ask in Spanish: "¿Qué palabras asocian con esta palabra?" List them without judgment. Notice that different words show different perspectives.

## Main activity

1. Perspectives: families who migrated to Ohio, families who stayed behind (and receive remittances), people in a receiving community, employers, a young person in school. Use the reading and take notes: ¿Quién habla? ¿Qué experiencia tiene? ¿Qué le preocupa? ¿Qué espera? Avoid stereotypes: no community is of one mind.
2. Language of perspective: Según..., Para ellos..., Desde el punto de vista de..., Algunos piensan que..., mientras que otros..., Es comprensible que...
3. Analyzing a work: the film "Roma" (Alfonso Cuarón, Mexico, 2018) follows Cleo, a domestic worker in Mexico City in 1970 and 1971, and shows class, gender and solidarity. Ask what the film says and how (black-and-white images, long takes). Diego Rivera's murals show the history and work of Mexican people.
4. Write an analysis: obra, creador, tema, técnica, mensaje.

## Checking for understanding

Ask: "¿Qué perspectivas escuchamos en el texto? ¿Cuál falta?"

## Worksheet

A perspective chart and an analysis of a work.
`,
  reading: [
    "Muchas voces, una misma palabra",
    `
La **inmigración** es un tema que se discute en muchas comunidades, y no hay una sola voz. Para entenderlo, es útil escuchar a personas con experiencias distintas. En este texto, las voces son ejemplos compuestos para practicar el análisis, no personas reales.

**Rosa**, de 45 años, llegó a Columbus desde Guatemala hace diez años. Trabaja en una panadería y envía dinero a su madre. "Vine para darles una vida mejor a mis hijos", dice. "Extraño mi país, pero aquí mis hijos van a la universidad". **Don Alberto**, de 70 años, vive en un pueblo de México. Sus tres hijos viven en Estados Unidos. "Las remesas nos ayudan a pagar la casa y la medicina. Pero la familia está dividida: mis nietos casi no me conocen". **Janet**, de 17 años, nació en Ohio de padres salvadoreños. "En casa hablamos español y en la escuela, inglés. A veces siento que pertenezco a los dos mundos y a ninguno". **El señor Miller**, dueño de una empresa de construcción en Ohio, dice: "Mis trabajadores latinos son esenciales. Necesitamos reformas que den claridad legal". **La señora Carter**, vecina de un barrio donde viven muchas familias nuevas, dice: "Me preocupa la presión sobre las escuelas, pero mis vecinos son amables y mis hijos tienen amigos de todas partes".

Observa que estas personas no están de acuerdo en cada tema, y que cada una habla desde su experiencia. Para analizar un tema así, preguntamos: ¿Quién habla? ¿Qué experiencia tiene? ¿Qué le preocupa? ¿Qué espera? Usamos frases como **según**, **para ellos**, **desde el punto de vista de**, **algunos piensan que... mientras que otros...** y **es comprensible que** (con subjuntivo). Es importante no generalizar: ninguna comunidad piensa de una sola manera.

El arte y el cine nos ayudan a entender las perspectivas. La película **Roma** (2018), del director mexicano Alfonso Cuarón, está filmada en blanco y negro y cuenta la historia de Cleo, una joven trabajadora doméstica en la Ciudad de México en 1970 y 1971. A través de los ojos de Cleo, vemos las diferencias de clase y de género, el cariño en una familia, la tristeza y la solidaridad entre las mujeres. El director usa planos largos y pocos diálogos, y deja que las imágenes cuenten la historia. Los **murales** del pintor mexicano **Diego Rivera** muestran la historia de México, el trabajo de los campesinos y los obreros, y transmiten un mensaje sobre la dignidad. Al analizar una obra, identifica: la **obra** y el **creador**, el **tema**, la **técnica** y el **mensaje**, y explica tu interpretación con ejemplos concretos.
`,
  ],
  cards: [
    ["la inmigración", "immigration"],
    ["las remesas", "remittances, money sent home"],
    ["el punto de vista", "point of view"],
    ["Algunos piensan que + opinión, mientras que otros + opinión", "Some think that + view, while others + view"],
    ["Es comprensible que + subjuntivo", "It is understandable that + clause"],
    ["la trabajadora doméstica", "domestic worker"],
    ["el mural", "mural"],
    ["la técnica", "technique"],
  ],
  closed: [
    [
      "Which phrase best introduces contrasting perspectives?",
      ["Algunos piensan que..., mientras que otros...", "Todos piensan igual", "No hay opiniones", "Nadie habla"],
      "A",
    ],
    [
      "Who directed the film \"Roma\"?",
      ["Pedro Almodóvar", "Alfonso Cuarón", "Guillermo del Toro", "Diego Rivera"],
      "B",
    ],
    [
      "What are \"remesas\"?",
      ["Money sent home by migrant workers", "A type of visa", "A kind of mural", "A school subject"],
      "A",
    ],
    [
      "Why is it important not to generalize about a community's views on a social issue?",
      ["Because every community thinks exactly alike", "Because people within a community have different experiences and opinions", "Because opinions don't matter", "Because the topic is too simple"],
      "B",
    ],
    [
      "In analyzing a work of art, which question is about technique?",
      ["¿Quién es el creador?", "¿Cómo está filmada la película?", "¿Cuál es su precio?", "¿Dónde se vende?"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Choose two of the voices in the reading (Rosa, don Alberto, Janet, el señor Miller, la señora Carter). In Spanish, write six sentences comparing their perspectives on immigration: say what each experiences, what concerns each, and one thing they have in common. Use según, mientras que, and es comprensible que.",
      scheme: [
        "Accurately describes the experience or concern of the first person",
        "Accurately describes the experience or concern of the second person",
        "Uses a contrast structure (mientras que, sin embargo) correctly",
        "Identifies something in common and uses es comprensible que with the subjunctive",
      ],
      model:
        "Según Rosa, vino a Ohio para darles una vida mejor a sus hijos. Don Alberto, en cambio, vive en México y recibe remesas, mientras que su familia está dividida. Los dos quieren lo mejor para su familia. Es comprensible que Rosa extrañe su país y que don Alberto extrañe a sus nietos.",
      answers: [
        [
          "full",
          "[[0|Según Rosa, ella vino a Ohio para darles una vida mejor a sus hijos y trabaja en una panadería.]] [[1|Don Alberto, en cambio, vive en México, recibe remesas y extraña a sus nietos.]] [[2|Rosa quiere estabilidad, mientras que don Alberto se preocupa por la familia dividida.]] [[3|Los dos desean el bienestar de su familia, y es comprensible que ambos sientan nostalgia.]]",
          "Muy bien. You captured the concerns accurately and used the contrast and the subjunctive naturally.",
        ],
        [
          "full",
          "[[0|Janet nació en Ohio y siente que pertenece a dos mundos.]] [[1|La señora Carter, desde otra perspectiva, se preocupa por las escuelas, pero valora a sus vecinos.]] [[2|Janet habla de identidad, mientras que la señora Carter habla de la comunidad.]] [[3|Es comprensible que las dos piensen en el futuro de los jóvenes, porque ambas tienen hijos o son jóvenes.]]",
          "Excelente. You compared very different perspectives respectfully and accurately.",
        ],
        [
          "partial",
          "[[0|Rosa vino de Guatemala para trabajar.]] [[1|El señor Miller tiene una empresa.]] Rosa y el señor Miller piensa lo mismo. Es comprensible que ellos son diferentes.",
          "They do not necessarily think the same. Use mientras que for a contrast, and es comprensible que + subjunctive: sean diferentes.",
        ],
        [
          "partial",
          "[[1|Don Alberto recibe dinero de sus hijos.]] [[2|Mientras que Janet vive en Ohio.]] Los dos hablan español. Todos los inmigrantes piensan igual.",
          "Avoid generalizing: not all immigrants think alike. Describe the concerns of each person more clearly.",
          true,
        ],
        [
          "weak",
          "Rosa came to Ohio. Don Alberto lives in Mexico. They want a better life.",
          "Please write in Spanish and compare: según Rosa, mientras que don Alberto",
        ],
        [
          "weak",
          "Rosa Ohio. Alberto México. Janet escuela. Todos igual.",
          "Write full sentences about each person's experience and concern. Not everyone thinks the same way.",
        ],
      ],
    },
    {
      prompt:
        "Analyze the film \"Roma\" or a mural by Diego Rivera in at least six sentences in Spanish. Identify the work and its creator, its theme, one technique, and its message. Explain your interpretation with one example.",
      scheme: [
        "Identifies the work and its creator correctly",
        "Identifies the theme (clase, género, dignidad, historia)",
        "Names one technique with an example (blanco y negro, planos largos, color, escala del mural)",
        "States a message and supports it with an example in complete sentences",
      ],
      model:
        "Roma es una película de Alfonso Cuarón, de 2018. El tema principal es la clase social y la solidaridad entre mujeres. La película está filmada en blanco y negro, con planos largos. El mensaje es que las personas invisibles merecen respeto. Por ejemplo, la familia cuida a Cleo cuando ella sufre.",
      answers: [
        [
          "full",
          "[[0|Roma es una película del director mexicano Alfonso Cuarón, de 2018.]] [[1|El tema es la clase social y la relación entre Cleo, la trabajadora doméstica, y la familia.]] [[2|La película usa blanco y negro y planos largos con pocos diálogos, para que miremos las imágenes con atención.]] [[3|Su mensaje es que las personas que no se ven, como Cleo, merecen dignidad; por ejemplo, la escena de la playa muestra la solidaridad de la familia.]]",
          "Muy bien. You supported the message with a technique and an example.",
        ],
        [
          "full",
          "[[0|El mural de Diego Rivera, 'Sueño de una tarde dominical en la Alameda Central', muestra la historia de México.]] [[1|El tema es la historia y la identidad del pueblo mexicano.]] [[2|La técnica es el tamaño enorme y los colores fuertes, que muestran a muchos personajes juntos.]] [[3|El mensaje es que las personas comunes también son parte de la historia, por ejemplo, los obreros y los campesinos.]]",
          "Excelente. You identified a specific mural and explained how the technique conveys the message.",
        ],
        [
          "partial",
          "[[0|Roma es una película de Alfonso Cuarón.]] [[1|El tema es una familia.]] Es en blanco y negro. Me gusta mucho porque es bonito.",
          "Be specific about the theme and the message: clase social, dignidad. Explain what the black-and-white technique achieves.",
        ],
        [
          "partial",
          "[[2|Los murales de Diego Rivera usan colores fuertes y son muy grandes.]] [[3|El mensaje es la dignidad del trabajo.]] El creador es Pablo Picasso.",
          "The murals were painted by Diego Rivera, not Picasso. Name the work and the creator at the start.",
          true,
        ],
        [
          "weak",
          "Roma is a movie about a family. It is in black and white. It is sad. I liked it.",
          "Please write in Spanish: Roma es una película de Alfonso Cuarón. Está filmada en blanco y negro.",
        ],
        [
          "weak",
          "Película Roma bueno. Mural bonito. Colores. Mexico historia.",
          "Use full sentences: Roma es una película de Cuarón, el tema es la clase social, el mensaje es la dignidad.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Información de otra materia y una práctica cultural comparada",
  note: `
## Objectives

Students will be able to:

1. use Spanish to gather information on a topic from another subject area;
2. compare how a cultural practice or perspective differs between their community and one in a Spanish-speaking country.

## Materials

A Spanish-language article on climate change in the Galápagos Islands, a short data table in Spanish on recycling, a comparison planner, the worksheet and quiz.

## Starter (6 minutes)

Ask: "¿Qué están estudiando en ciencias? ¿Qué palabras en español conocen para ese tema?" List vocabulary related to the environment, biology, math or history.

## Main activity

1. Gathering information: read an article in Spanish about the Galápagos Islands and the effects of climate change (temperature of the ocean, tortugas gigantes, iguanas marinas, turismo). Identify the question, the main data and the evidence. Take notes in Spanish keywords.
2. Subject vocabulary: el cambio climático, la temperatura, el ecosistema, la especie en peligro de extinción, las energías renovables, el promedio, el porcentaje.
3. Comparing a cultural practice: for example, the family meal (la sobremesa in Spain versus a quick dinner in Ohio), la quinceañera and the sweet sixteen, the school lunch, Día de Muertos and Halloween. Use a planner: práctica, descripción, quién, cuándo, por qué, y semejanzas y diferencias.
4. Write a comparison: 8 to 10 sentences using mientras que, a diferencia de, tanto... como, tampoco.

## Checking for understanding

Ask: "¿Cuál es una semejanza y una diferencia entre la sobremesa y la cena en tu casa?"

## Worksheet and quiz

Summarize a text on a science topic and compare two cultural practices.
`,
  reading: [
    "Las Galápagos y las costumbres que comparamos",
    `
Usar el español para aprender otras materias es una excelente manera de practicar el idioma y de ampliar tus conocimientos. Lee este texto sobre un tema de ciencias.

"Las islas Galápagos, en el Océano Pacífico, pertenecen a Ecuador y son famosas por su biodiversidad única. Allí viven tortugas gigantes, iguanas marinas y pinzones que ayudaron a Charles Darwin a desarrollar la teoría de la evolución. Sin embargo, el cambio climático amenaza este ecosistema. En los últimos cincuenta años, la temperatura promedio del mar ha subido casi un grado. El fenómeno de El Niño, que calienta el agua, reduce la cantidad de algas que comen las iguanas marinas, y muchas mueren de hambre. Además, cada año visitan las islas unos 275,000 turistas, lo cual aumenta la contaminación. Los científicos recomiendan que se limiten los visitantes y que se usen más energías renovables. 'Si no actuamos ahora, perderemos especies que no existen en ningún otro lugar', dice una bióloga del Parque Nacional Galápagos."

Para tomar notas, identifica la **pregunta** del texto (¿Cómo afecta el cambio climático a las Galápagos?), los **datos** (un grado, 275,000 turistas), la **evidencia** (las iguanas mueren cuando hay menos algas) y las **recomendaciones** (limitar los visitantes, energías renovables). El vocabulario de ciencias está lleno de cognados: **ecosistema, temperatura, especie, evolución, contaminación**. Otras palabras útiles: **el promedio** (average), **el porcentaje** (percentage), **en peligro de extinción** (endangered), **las energías renovables** (renewable energy).

Ahora, comparemos una práctica cultural. En España, muchas familias practican la **sobremesa**: después de la comida del mediodía, se quedan en la mesa conversando, a veces durante una hora o más. En muchas casas de Ohio, en cambio, la cena es rápida porque los miembros de la familia tienen actividades por la noche, y después cada uno se va a hacer la tarea o a ver una pantalla. Para comparar, puedes usar estas expresiones: **mientras que** (while), **a diferencia de** (unlike), **tanto... como** (both... and), **tampoco** (neither), **en ambos casos** (in both cases), **de la misma manera** (in the same way). Por ejemplo: "A diferencia de las familias de Ohio, que cenan rápido, muchas familias españolas pasan mucho tiempo en la sobremesa. Sin embargo, en ambos casos, la comida es una oportunidad para estar juntos".

Una buena comparación no dice que una costumbre es mejor que otra; explica por qué existe cada una. La sobremesa puede estar relacionada con los horarios de trabajo y el clima en España; las cenas rápidas en Ohio pueden reflejar las actividades escolares y los horarios de trabajo. Ambos grupos valoran a la familia, aunque la expresen de manera diferente.
`,
  ],
  cards: [
    ["el cambio climático", "climate change"],
    ["en peligro de extinción", "endangered"],
    ["las energías renovables", "renewable energy"],
    ["el promedio", "average"],
    ["a diferencia de", "unlike"],
    ["tanto... como", "both... and"],
    ["en ambos casos", "in both cases"],
    ["la sobremesa", "relaxed conversation at the table after a meal"],
  ],
  closed: [
    [
      "According to the text, what is a threat to the Galápagos ecosystem?",
      ["Volcanoes only", "Climate change and increased tourism", "Too much rain only", "Lack of tourists"],
      "B",
    ],
    [
      "Which expression introduces a contrast between two groups?",
      ["a diferencia de", "en ambos casos", "de la misma manera", "tanto como"],
      "A",
    ],
    [
      "What does \"las energías renovables\" mean?",
      ["Old energy", "Renewable energy", "Fossil fuels", "Nuclear weapons"],
      "B",
    ],
    [
      "How many tourists visit the Galápagos each year, according to the text?",
      ["About 2,750", "About 27,500", "About 275,000", "About 2,750,000"],
      "C",
    ],
    [
      "A fair cultural comparison should:",
      ["Say one custom is better", "Explain why each practice exists and how they are similar and different", "Only list differences", "Avoid examples"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Summarize in Spanish, in five sentences, the text about the Galápagos Islands: the question or problem, two data points, one piece of evidence about the effects, and one recommendation.",
      scheme: [
        "States the problem or question (el cambio climático amenaza el ecosistema)",
        "Gives two data points (casi un grado, 275,000 turistas)",
        "Gives evidence of the effect (las iguanas marinas mueren cuando hay menos algas)",
        "Gives a recommendation (limitar los visitantes, usar energías renovables)",
      ],
      model:
        "El texto habla de cómo el cambio climático amenaza a las islas Galápagos. La temperatura del mar ha subido casi un grado y llegan unos 275,000 turistas al año. El Niño reduce las algas, y muchas iguanas marinas mueren. Los científicos recomiendan limitar los visitantes y usar energías renovables.",
      answers: [
        [
          "full",
          "[[0|El texto explica que el cambio climático amenaza el ecosistema de las islas Galápagos.]] [[1|La temperatura del mar ha subido casi un grado y visitan las islas unos 275,000 turistas cada año.]] [[2|Cuando hay menos algas por El Niño, las iguanas marinas mueren de hambre.]] [[3|Los científicos recomiendan limitar los visitantes y usar energías renovables.]] Es importante que actuemos pronto.",
          "Muy bien. Your summary is accurate, with data and a recommendation, and a concluding sentence of your own.",
        ],
        [
          "full",
          "[[0|La pregunta del texto es cómo afecta el cambio climático a las Galápagos.]] [[1|Según los datos, el mar está casi un grado más caliente y hay 275,000 turistas por año.]] [[2|La evidencia es que las iguanas no tienen suficiente comida.]] [[3|La bióloga pide que se limite el turismo y que se usen energías limpias.]]",
          "Excelente. You used the subjunctive in a reported request and organized your summary clearly.",
        ],
        [
          "partial",
          "[[0|El texto habla de las islas Galápagos.]] [[1|Hay mucho turismo.]] Las iguanas son bonitas. [[3|Los científicos recomiendan que usan energías renovables.]]",
          "State the problem (climate change) and give a number from the text. After recomiendan que use the subjunctive: usen.",
        ],
        [
          "partial",
          "[[2|Las iguanas mueren porque hay menos algas.]] [[1|La temperatura subió casi un grado.]] El problema es la basura en las islas.",
          "The main problem is climate change, and tourism adds pollution. Give a recommendation at the end.",
          true,
        ],
        [
          "weak",
          "The text is about the Galápagos Islands. There are turtles and iguanas. Climate change is a problem.",
          "Please write the summary in Spanish: el texto habla de las islas Galápagos y del cambio climático.",
        ],
        [
          "weak",
          "Islas tortugas. Mucho turistas. Cambio. Iguanas muere.",
          "Use full sentences with data: la temperatura subió casi un grado. Visitan unos 275,000 turistas.",
        ],
      ],
    },
    {
      prompt:
        "Compare in Spanish, in at least eight sentences, a cultural practice in a Spanish-speaking country with a similar practice in your community (for example, la sobremesa and dinner in Ohio, la quinceañera and a sweet sixteen, or school lunch). Include two similarities and two differences, using a diferencia de, mientras que and tanto... como, and a possible reason for each practice.",
      scheme: [
        "Describes the practice in the Spanish-speaking country accurately",
        "Describes the corresponding practice in their community accurately",
        "Gives two similarities and two differences using comparison expressions correctly",
        "Offers a reason for each practice without judging one as better",
      ],
      model:
        "La sobremesa es una costumbre española: después de comer, la familia se queda en la mesa conversando. En mi familia, cenamos rápido porque tenemos actividades. A diferencia de las familias españolas, nosotros no nos quedamos mucho tiempo. Tanto en España como en Ohio, la comida es un momento para la familia. La diferencia puede deberse a los horarios de trabajo.",
      answers: [
        [
          "full",
          "[[0|La quinceañera es una celebración de los quince años de una chica en México y en muchos países de América Latina.]] [[1|En Estados Unidos, tenemos el sweet sixteen para los dieciséis años.]] [[2|Tanto la quinceañera como el sweet sixteen son fiestas con familia y amigos, pero a diferencia del sweet sixteen, la quinceañera tiene misa y un baile de vals; mientras que el sweet sixteen suele ser una fiesta con música moderna.]] [[3|La quinceañera tiene raíces en la tradición católica, mientras que el sweet sixteen es una celebración más reciente, y las dos marcan una etapa de la vida.]]",
          "Muy bien. Your comparison is balanced and explains reasons without judging.",
        ],
        [
          "full",
          "[[0|En España, la sobremesa es una costumbre en la que la familia se queda hablando en la mesa después de la comida.]] [[1|En mi casa, cenamos temprano, y después cada persona hace la tarea o practica un deporte.]] [[2|A diferencia de las familias españolas, nosotros no tenemos una sobremesa larga, mientras que tanto ellos como nosotros valoramos comer juntos.]] [[3|Quizás la diferencia se debe a los horarios de trabajo y a las actividades escolares, y no a que una costumbre sea mejor.]]",
          "Excelente. The reason is respectful and shows understanding of context.",
        ],
        [
          "partial",
          "[[0|La sobremesa es una costumbre en España.]] [[1|En mi casa cenamos rápido.]] A diferencia, los españoles es más lentos. Las dos costumbres son iguales porque hay comida.",
          "Make the comparison sentence complete: a diferencia de nosotros, los españoles son más lentos. Explain a reason for each practice.",
        ],
        [
          "partial",
          "[[2|Tanto en España como en Ohio las familias comen juntas.]] [[3|La diferencia puede ser por los horarios de trabajo.]] En mi casa es mejor porque es rápido.",
          "Avoid saying one practice is better. Describe each practice before you compare them.",
          true,
        ],
        [
          "weak",
          "In Spain they have a sobremesa. In my house we eat fast. We both eat dinner. It is different.",
          "Please write in Spanish: en España hay una sobremesa. En mi casa cenamos rápido.",
        ],
        [
          "weak",
          "Sobremesa España. Casa Ohio. Diferente igual. Comida buena.",
          "Use full sentences: la sobremesa es una costumbre española. A diferencia de nosotros, ellos se quedan en la mesa.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Español en la comunidad y un portafolio para el futuro",
  note: `
## Objectives

Students will be able to:

1. use Spanish in a community setting, such as volunteering or interpreting, and reflect on it;
2. create a portfolio of their Spanish for a college or career audience.

## Materials

Information about community organizations that welcome volunteers who speak Spanish (a clinic, a library, a school, a food pantry), a reflection template, a sample portfolio, the rubric for the Ohio Seal of Biliteracy, the worksheet, quiz and problem set.

## Starter (6 minutes)

Ask: "¿Dónde han usado el español fuera de la clase? ¿Con quién?" Collect examples: en casa, en una tienda, con un vecino. Discuss how often students have the chance to use it.

## Main activity

1. Community use: roles for volunteers (greeter, tutor, helper at a food pantry) and the difference between interpreting (oral) and translating (written). Ethical guidelines: speak in first person, be accurate, do not add or omit, keep information confidential, and know your limits (e.g., do not interpret for a doctor's visit unless trained).
2. Reflection structure: Hice..., Aprendí..., Me sorprendió..., Fue difícil..., Voy a seguir... Use past tenses and subjunctive.
3. Portfolio for a college or career audience: a short bio in Spanish, a résumé with the language skills, a writing sample (your persuasive essay), an audio or video clip of a presentation, a reflection, and a letter. Use headings in Spanish and English.
4. Self-assess using proficiency levels (Intermediate-Mid to Intermediate-High) and identify next steps, including the Ohio Seal of Biliteracy.

## Checking for understanding

Ask: "¿Cuál es la diferencia entre interpretar y traducir?"

## Worksheet, quiz and problem set

A reflection on community use and a portfolio plan.
`,
  reading: [
    "Usar el español fuera del aula",
    `
Un idioma se aprende en clase, pero se vuelve útil cuando lo usamos con personas reales. En Columbus y en el resto de Ohio hay muchas oportunidades: puedes ser voluntario en una clínica, una biblioteca, una escuela primaria, un banco de alimentos o una iglesia, donde las familias que hablan español necesitan ayuda. Los voluntarios pueden saludar a las personas, explicar cómo llenar un formulario, ayudar a los niños con la tarea o acompañar a una familia nueva.

Es importante distinguir entre **interpretar** y **traducir**. El **intérprete** trabaja oralmente: escucha en un idioma y lo dice en el otro en el momento. El **traductor** trabaja con textos escritos. Los dos necesitan precisión. Algunas normas éticas son: hablar en **primera persona** ("Tengo dolor de cabeza", no "Dice que tiene dolor de cabeza"), no añadir ni omitir información, mantener la **confidencialidad** de lo que se dice, ser imparcial y reconocer los propios límites. Un estudiante no debe interpretar en situaciones médicas o legales graves sin una formación especial, porque un error puede tener consecuencias serias; en esos casos se necesita un intérprete profesional.

Después de una experiencia así, escribe una **reflexión**. Una estructura útil es: "**Hice** lo siguiente... **Aprendí** que... **Me sorprendió** que... **Fue difícil** cuando... **Voy a seguir** + gerundio / **Quisiera** + infinitivo". Por ejemplo: "Trabajé tres horas en un banco de alimentos, donde ayudé a las familias a escoger sus productos. Aprendí vocabulario nuevo, como 'frijoles', 'enlatado' y 'cupón'. Me sorprendió que muchas personas me dieran las gracias por hablar español. Fue difícil entender a una señora que hablaba rápido, pero le pedí que lo repitiera. Quisiera seguir como voluntario durante el verano".

Un **portafolio** es una colección de trabajos que muestra lo que sabes hacer. Para una universidad o un empleador, puede incluir: una breve **biografía** en español; un **currículum** que mencione tus habilidades en el idioma; una **muestra de escritura** (como tu ensayo persuasivo); una **grabación** de una presentación; una **reflexión** sobre tu aprendizaje; y, si es posible, una **carta de recomendación**. Organízalo con títulos claros y revisa la ortografía. Al final, autoevalúa tu nivel: la escala del ACTFL va de Principiante a Superior. Un estudiante de cuarto año puede alcanzar el nivel **Intermedio Alto**, en el cual se puede narrar y describir con párrafos y se puede enfrentar a situaciones inesperadas. En Ohio, los estudiantes que demuestran un alto nivel de competencia pueden obtener el **Sello de Bilingüismo** (Seal of Biliteracy) en su diploma, un reconocimiento valioso para la universidad y el trabajo.
`,
  ],
  cards: [
    ["el voluntario / la voluntaria", "volunteer"],
    ["interpretar", "to interpret (oral)"],
    ["traducir", "to translate (written)"],
    ["la confidencialidad", "confidentiality"],
    ["la reflexión", "reflection"],
    ["el portafolio", "portfolio"],
    ["el currículum", "résumé, curriculum vitae"],
    ["el Sello de Bilingüismo", "Seal of Biliteracy"],
  ],
  closed: [
    [
      "What is the difference between an interpreter and a translator?",
      ["An interpreter works orally; a translator works with written texts", "They are the same", "An interpreter writes books", "A translator speaks only"],
      "A",
    ],
    [
      "Which ethical practice is correct for an interpreter?",
      ["Add your own opinions", "Speak in the first person and be accurate", "Share what you heard with friends", "Skip difficult parts"],
      "B",
    ],
    [
      "Which of these could be included in a language portfolio?",
      ["A writing sample and a recording", "Only your grades", "A list of your friends", "Nothing written"],
      "A",
    ],
    [
      "What does the Seal of Biliteracy recognize?",
      ["Perfect grades in all subjects", "Proficiency in two or more languages", "Attendance", "Athletic achievement"],
      "B",
    ],
    [
      "Which phrase is most appropriate for the beginning of a reflection?",
      ["Hice lo siguiente...", "Mañana voy a comer", "No sé nada", "Me duele la cabeza"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Write a reflection of at least seven sentences in Spanish about a real or planned use of Spanish in the community (such as volunteering at a food pantry or helping a neighbor). Use the structure Hice..., Aprendí..., Me sorprendió..., Fue difícil..., Quisiera... and include at least one verb in the subjunctive or conditional.",
      scheme: [
        "Describes what they did or will do (hice / voy a hacer) in the past tense or future correctly",
        "Says what they learned with aprendí que and gives a specific example",
        "Expresses a surprise or difficulty with a subjunctive form (me sorprendió que + subjuntivo)",
        "Ends with a goal using quisiera or voy a seguir and correct verb forms",
      ],
      model:
        "Trabajé tres horas en un banco de alimentos, donde ayudé a las familias a escoger sus productos. Aprendí vocabulario nuevo, como enlatado y cupón. Me sorprendió que muchas personas me dieran las gracias. Fue difícil entender a una señora que hablaba rápido, pero le pedí que lo repitiera. Quisiera seguir como voluntario en el verano.",
      answers: [
        [
          "full",
          "[[0|Hice cuatro horas de voluntariado en la biblioteca, donde ayudé a niños con la tarea en español.]] [[1|Aprendí que explicar es más difícil que entender, porque tuve que buscar palabras sencillas para los niños.]] [[2|Me sorprendió que los niños me dijeran que mi acento era bueno.]] Fue difícil cuando un niño me preguntó una palabra que no conocía. Se la busqué en el diccionario. [[3|Quisiera seguir ayudando durante el verano, y ojalá que más estudiantes participen.]]",
          "Muy bien. Your reflection is specific, honest and uses the subjunctive twice (dijeran, participen).",
        ],
        [
          "full",
          "[[0|El sábado pasado fui a una clínica con mi tía y ayudé a una señora a llenar un formulario.]] [[1|Aprendí que el vocabulario de la salud es especial, como alergia y receta.]] [[2|Me sorprendió que la señora estuviera tan agradecida.]] Fue difícil porque ella hablaba rápido. Le pedí que hablara más despacio. [[3|En el futuro, me gustaría estudiar para ser intérprete médica.]]",
          "Excelente. Notice that you knew the limits of your role and asked her to speak slowly.",
        ],
        [
          "partial",
          "[[0|Yo ayudé en un banco de alimentos.]] [[1|Aprendí palabras nuevas.]] Me sorprendió que ellos son amables. Fue difícil. [[3|Quisiera seguir.]]",
          "After me sorprendió que use the subjunctive: sean amables. Give an example of what was difficult and what you learned.",
        ],
        [
          "partial",
          "Voy a ser voluntario en la biblioteca. [[1|Aprendí que es importante hablar claro.]] [[2|Me sorprendió que muchas familias hablen español.]] [[3|Quisiera ayudar más.]]",
          "Use the past for what you did: fui voluntario. Tell what happened specifically, not only what you plan.",
          true,
        ],
        [
          "weak",
          "I volunteered at a food pantry. I learned new words. It was difficult. I want to keep going.",
          "Please write the reflection in Spanish: hice voluntariado, aprendí palabras nuevas, fue difícil, quisiera seguir.",
        ],
        [
          "weak",
          "Yo voluntario. Aprender español. Difícil. Seguir.",
          "Write complete sentences in the past tense: hice voluntariado en un banco de alimentos. Aprendí palabras nuevas.",
        ],
      ],
    },
    {
      prompt:
        "Plan a portfolio of your Spanish for a college or career audience. In Spanish, list five items you would include, explain in one sentence why each is useful, and write a three-sentence bio for the first page of the portfolio. Then say which proficiency level you hope to demonstrate.",
      scheme: [
        "Lists five appropriate portfolio items with correct Spanish nouns",
        "Explains the purpose of at least three items clearly",
        "Writes a three-sentence bio in Spanish with correct grammar and register",
        "States a target proficiency level (intermedio medio / alto) and a next step",
      ],
      model:
        "Incluiría: una biografía, un currículum, un ensayo persuasivo, una grabación de una presentación y una reflexión del voluntariado. El ensayo muestra mi escritura; la grabación muestra mi pronunciación. Me llamo Ana y soy estudiante de último año en Columbus. Estudio español desde hace cuatro años y quiero estudiar medicina. Espero demostrar el nivel intermedio alto y obtener el Sello de Bilingüismo.",
      answers: [
        [
          "full",
          "[[0|Incluiría una biografía, un currículum, un ensayo persuasivo, una grabación y una reflexión.]] [[1|El ensayo muestra cómo escribo, la grabación muestra mi pronunciación y la reflexión muestra lo que aprendí en la comunidad.]] [[2|Me llamo Jasmine y estudio español desde hace cuatro años. Quiero ser enfermera para ayudar a familias que hablan español. Me gusta la música latina y el voluntariado.]] [[3|Espero demostrar el nivel intermedio alto y obtener el Sello de Bilingüismo.]]",
          "Muy bien. Your items and reasons are purposeful, and your bio sounds professional.",
        ],
        [
          "full",
          "[[0|El portafolio tendría un currículum, una muestra de escritura, un video, una carta de recomendación y una reflexión.]] [[1|El video es importante porque muestra que puedo hablar con confianza, y la carta muestra que otros confían en mí.]] [[2|Soy Marcus Lee, estudiante de la escuela secundaria de Westerville. Hablo inglés, español y un poco de francés. Mi meta es trabajar en el comercio internacional.]] [[3|Quisiera alcanzar el nivel intermedio medio como mínimo, y practicar más con hablantes nativos.]]",
          "Excelente. Your bio is written in the first person with concrete information about you.",
        ],
        [
          "partial",
          "[[0|Incluiría un currículum, un ensayo, una grabación, una foto y una reflexión.]] [[1|El ensayo muestra mi escritura.]] Soy estudiante. Me gusta español. [[3|Quiero nivel alto.]]",
          "Explain at least three items and write a longer bio. Specify the level: intermedio alto.",
        ],
        [
          "partial",
          "Mi portafolio tiene mis notas. [[1|La grabación es útil porque muestra cómo hablo.]] [[2|Me llamo Ben y estudio español. Quiero ser maestro.]] Nivel.",
          "Notas alone are not a good portfolio item. Add a writing sample and a reflection, and name your target level.",
          true,
        ],
        [
          "weak",
          "I would include my résumé, an essay, a recording, a letter and a reflection. I am a student.",
          "Please write the list and the bio in Spanish: incluiría un currículum, un ensayo, una grabación.",
        ],
        [
          "weak",
          "Portafolio papel. Yo estudiante. Español bueno. Nivel alto.",
          "Use full sentences: incluiría un currículum y un ensayo. Me llamo ... y estudio español desde hace cuatro años.",
        ],
      ],
    },
  ],
};

writeCourse("spanish-iv-grade-12.json", "Spanish IV", "Grade 12", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
