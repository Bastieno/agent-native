import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Spanish I, Grade 9, Quarter 1. Standards: ACTFL World-Readiness Standards
 * (communication, cultures, comparisons), in the school's own words. The
 * teacher's notes and prompts are in English for beginners; learners answer
 * in Spanish with the slips of a first-year student.
 */

const w1: WeekInput = {
  topic: "Saludos, presentaciones, la fecha y el tiempo",
  note: `
## Objectives

Students will be able to:

1. greet people, introduce themselves and say goodbye in Spanish, using formal and informal forms;
2. ask and answer questions about names, age and where they are from;
3. exchange information about days, dates and the weather.

## Materials

Name cards, a classroom calendar in Spanish, weather picture cards, a short audio dialogue, the quiz.

## Starter (7 minutes)

Greet students at the door in Spanish, using "Buenos días" and "¿Cómo te llamas?" Have them answer "Me llamo ___." Write the exchange on the board and point out the question marks and exclamation marks at the beginning of sentences.

## Main activity

1. Greetings by time of day (buenos días, buenas tardes, buenas noches) and goodbyes (adiós, hasta luego, hasta mañana). Contrast informal tú (¿Cómo estás?) with formal usted (¿Cómo está usted?) and when to use each: a classmate versus the principal.
2. Pair work: introduce yourself and ask a partner "¿Cuántos años tienes?" and "¿De dónde eres?" Model: "Tengo quince años. Soy de Columbus."
3. Days of the week and dates: "Hoy es lunes, el diez de octubre." Weather phrases with hacer: hace frío, hace calor, hace viento; llueve, nieva.
4. Record the weather in Columbus each morning on a class chart.

## Checking for understanding

Cold-call: "¿Qué tiempo hace hoy?" Listen for hace + noun and for correct use of tú and usted.

## Quiz

Five questions on greetings, introductions and weather.
`,
  reading: [
    "Hola, me llamo Marta",
    `
In Spanish you can greet someone differently depending on the time of day. In the morning you say **buenos días**, in the afternoon **buenas tardes**, and in the evening **buenas noches**. A short, friendly greeting is **hola**. To say goodbye you can say **adiós**, **hasta luego** (see you later) or **hasta mañana** (see you tomorrow).

Spanish also has two ways to say "you." With friends, classmates and family, use the informal **tú**: "¿Cómo estás?" (How are you?). With adults you do not know well, teachers or older people, use the formal **usted**: "¿Cómo está usted?" Using the right form shows respect, and in many Spanish-speaking countries it is important. Notice that questions begin with an upside-down question mark: ¿Cómo te llamas? Exclamations begin with an upside-down exclamation mark: ¡Mucho gusto!

Read this short dialogue between two students at a Columbus high school.

— Hola, buenos días. ¿Cómo te llamas?
— Me llamo Marta. ¿Y tú?
— Me llamo Diego. Mucho gusto.
— Encantada. ¿Cuántos años tienes, Diego?
— Tengo quince años. ¿Y tú?
— Tengo catorce años. Soy de Cleveland. ¿De dónde eres tú?
— Soy de Columbus, pero mi familia es de México.

To say your age, Spanish uses the verb **tener** (to have): "Tengo quince años," literally "I have fifteen years." To say where you are from, use **ser de**: "Soy de Ohio."

You can also talk about the date and the weather. The days of the week are lunes, martes, miércoles, jueves, viernes, sábado and domingo, and they are not capitalized. A date is written with the day first: "Hoy es lunes, el diez de octubre." For the weather, Spanish uses the verb **hacer**: "Hace frío" (it is cold), "Hace calor" (it is hot), "Hace viento" (it is windy), "Hace sol" (it is sunny). For rain and snow there are special verbs: "Llueve" (it rains) and "Nieva" (it snows). In Ohio in November you might say, "Hoy hace frío y nieva un poco."
`,
  ],
  cards: [
    ["buenos días", "good morning"],
    ["buenas tardes", "good afternoon"],
    ["¿Cómo te llamas?", "What is your name? (informal)"],
    ["Me llamo + name", "My name is + name"],
    ["¿Cuántos años tienes?", "How old are you?"],
    ["¿De dónde eres?", "Where are you from?"],
    ["Hace frío.", "It is cold."],
    ["hasta mañana", "see you tomorrow"],
  ],
  closed: [
    [
      "Which greeting would you use at 4:00 in the afternoon?",
      ["Buenos días", "Buenas tardes", "Buenas noches", "Hasta luego"],
      "B",
    ],
    [
      "You meet the school principal. Which question is correct and polite?",
      ["¿Cómo estás?", "¿Cómo te llamas?", "¿Cómo está usted?", "¿Qué tal, amigo?"],
      "C",
    ],
    [
      "How do you say \"I am fifteen years old\"?",
      ["Soy quince años", "Tengo quince años", "Estoy quince años", "Hago quince años"],
      "B",
    ],
    [
      "Which sentence means \"It is windy\"?",
      ["Llueve", "Hace calor", "Hace viento", "Nieva"],
      "C",
    ],
    [
      "What is the date: \"Hoy es martes, el doce de noviembre.\"?",
      ["Today is Monday, December 11", "Today is Tuesday, November 12", "Today is Tuesday, December 11", "Today is Thursday, November 12"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a short dialogue in Spanish between you and a new classmate. Greet each other, say your names, say how old you are and where you are from. Use at least one question.",
      scheme: [
        "Uses a correct greeting (hola or buenos días / buenas tardes)",
        "Says their name with me llamo",
        "States their age with tengo ... años",
        "States where they are from with soy de plus a place",
      ],
      model:
        "— Hola, buenos días. ¿Cómo te llamas? — Me llamo Ana. ¿Y tú? — Me llamo Luis. Tengo quince años. ¿Cuántos años tienes? — Tengo catorce años. Soy de Columbus. ¿De dónde eres tú? — Soy de Dayton.",
      answers: [
        [
          "full",
          "— [[0|Hola, buenos días.]] ¿Cómo te llamas? — [[1|Me llamo Sarah.]] ¿Y tú? — Me llamo Jake. [[2|Tengo quince años.]] ¿De dónde eres? — [[3|Soy de Columbus.]]",
          "Muy bien. All four parts are there and your question marks are in the right place.",
        ],
        [
          "full",
          "— [[0|Buenas tardes.]] ¿Cómo te llamas? — [[1|Me llamo Jasmine.]] ¿Y tú? — Me llamo Omar. ¿Cuántos años tienes? — [[2|Tengo catorce años.]] Y tú, ¿de dónde eres? — [[3|Soy de Cleveland.]]",
          "Excelente. You asked three different questions and answered all of them with correct verbs.",
        ],
        [
          "partial",
          "— [[0|Hola.]] ¿Como te llamas? — [[1|Me llamo Tyler.]] ¿Y tu? — Me llamo Ben. Yo soy quince años.",
          "Good start. For age use tengo, not soy: tengo quince años. Add accents: cómo and tú.",
        ],
        [
          "partial",
          "— [[0|Buenos días.]] — [[2|Tengo quince años]] y yo [[3|soy de Ohio]]. ¿Y tu?",
          "You gave your age and home. Add your name with me llamo and ask a complete question.",
          true,
        ],
        [
          "weak",
          "— Hello. My name is Emma. I am fifteen. I am from Dayton.",
          "That is all English. Try again in Spanish: hola, me llamo Emma, tengo quince años, soy de Dayton.",
        ],
        [
          "weak",
          "— [[0|Hola.]] Yo llamo Mia y yo tienes quince años y de Columbus.",
          "Hola is correct. Use me llamo for your name, tengo for I have, and soy de for where you are from.",
        ],
      ],
    },
    {
      prompt:
        "Look at the weather in Columbus today. Write three sentences in Spanish: say what day and date it is, what the weather is like, and whether you like the weather. Use hace, llueve or nieva.",
      scheme: [
        "Gives the day and the date, such as hoy es lunes, el diez de octubre",
        "Describes the weather with hace, llueve or nieva",
        "Expresses an opinion about the weather, such as me gusta or no me gusta",
        "Writes complete sentences with mostly correct spelling and accents",
      ],
      model:
        "Hoy es jueves, el catorce de noviembre. Hace frío y hace viento en Columbus. No me gusta el frío, pero me gusta la nieve.",
      answers: [
        [
          "full",
          "[[0|Hoy es lunes, el cuatro de noviembre.]] [[1|Hace frío y llueve.]] [[2|No me gusta la lluvia.]] [[3|Prefiero el sol en el verano.]]",
          "Muy bien. Your sentences are complete, and the accents on the words are right.",
        ],
        [
          "full",
          "[[0|Hoy es viernes, el ocho de diciembre.]] [[1|Hace mucho frío y nieva.]] [[2|Me gusta la nieve porque es divertida.]] [[3|Mis amigos y yo jugamos afuera.]]",
          "Excelente. You went beyond the task by giving a reason with porque.",
        ],
        [
          "partial",
          "[[0|Hoy es martes, el cinco de marzo.]] [[1|Hace sol.]] Yo gusto el sol.",
          "Good first two sentences. To say you like something use me gusta: me gusta el sol.",
        ],
        [
          "partial",
          "[[1|Hace calor y hace sol.]] [[2|Me gusta el calor.]] Hoy es lunes, octubre.",
          "Your weather and opinion are correct. A date needs the number too: el diez de octubre.",
          true,
        ],
        [
          "weak",
          "Today is Monday. It is cold and snowy. I like the snow.",
          "Please write in Spanish. Use hoy es lunes, hace frío, nieva and me gusta la nieve.",
        ],
        [
          "weak",
          "Hoy lunes. Es frío. Yo gusto snow.",
          "Say hoy es lunes. For weather use hace frío, not es frío. Replace snow with la nieve.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Describir a personas, la clase y las cosas que tengo",
  note: `
## Objectives

Students will be able to:

1. describe people using ser and common adjectives that agree in gender and number;
2. talk about classes, school supplies and what they need, using tener and hay.

## Materials

Photos of famous people, picture cards of school supplies, a classroom with labeled objects, the worksheet, quiz and problem set.

## Starter (6 minutes)

Hold up photos of a famous athlete and a singer. Ask in Spanish: "¿Cómo es?" Elicit adjectives and write them on the board: alto, simpático, inteligente, joven. Ask why some end in -o and others in -e.

## Main activity

1. Present ser: soy, eres, es, somos, son. Describe people: Mi amiga es alta y simpática. Mi hermano es alto y simpático. Discuss agreement: adjectives ending in -o change to -a for feminine and add -s for plural (altos, altas), and those ending in -e (inteligente) only add -s.
2. Classes and supplies: la clase de matemáticas, de inglés, de ciencias, de arte; el lápiz, el cuaderno, la mochila, la calculadora. Articles: el, la, los, las, and un, una.
3. Tener and hay: tengo un cuaderno, tienes una mochila, tiene tres clases; hay veinte estudiantes en la clase.
4. Pair activity: "Necesito un lápiz. ¿Tienes un lápiz?"

## Checking for understanding

Whiteboard: write one sentence that describes your best friend with ser and two adjectives.

## Worksheet, quiz and problem set

Agreement, tener and hay.
`,
  reading: [
    "Mi amiga Lucía y mi clase",
    `
In Spanish, adjectives describe people and things, and they have to **agree** with the noun they describe. Most adjectives that end in **-o** have four forms: alto, alta, altos, altas. An adjective that ends in **-e** or in most consonants has the same form for masculine and feminine: inteligente, joven, fácil. Plural forms add -s or -es: inteligentes, jóvenes, fáciles. Adjectives usually go after the noun in Spanish: "una chica simpática," not "a simpatic girl."

To describe what someone is like we use the verb **ser**: yo **soy**, tú **eres**, él/ella **es**, nosotros **somos**, ellos/ellas **son**. Read this paragraph about a Columbus student.

"Mi amiga se llama Lucía. Ella es alta, delgada y muy simpática. Mi amigo Pablo es bajo y trabajador. Lucía y Pablo son estudiantes inteligentes. Yo soy un poco tímido, pero mis amigos son muy divertidos."

Now look at the classroom. The words for school things have a gender: **el** lápiz, **el** cuaderno, **el** libro, **la** mochila, **la** calculadora, **la** silla, **la** tarea. For more than one, use **los** or **las**: los libros, las mochilas. The words for school subjects often start with "clase de": la clase de matemáticas, la clase de inglés, la clase de ciencias, la clase de arte, la clase de historia, la clase de educación física.

Two verbs help us talk about what we have. **Tener** means "to have": yo **tengo**, tú **tienes**, él/ella **tiene**, nosotros **tenemos**, ellos **tienen**. "Tengo seis clases. Mi amigo tiene una calculadora." The word **hay** means both "there is" and "there are," and it never changes: "Hay veinticinco estudiantes en la clase." "Hay un cuaderno en la mesa." "No hay lápices."

To say what you need, use **necesitar**: "Necesito un bolígrafo y un cuaderno." To ask a classmate, say: "¿Tienes un lápiz?" Notice how often we use tener with school things, with a masculine or feminine article that matches the noun.
`,
  ],
  cards: [
    ["alto / alta", "tall (masculine / feminine)"],
    ["simpático / simpática", "nice, friendly"],
    ["inteligente", "intelligent (masculine and feminine)"],
    ["la mochila", "the backpack"],
    ["el cuaderno", "the notebook"],
    ["tengo / tienes / tiene", "I have / you have / he or she has"],
    ["hay", "there is, there are"],
    ["necesito", "I need"],
  ],
  closed: [
    [
      "Which sentence is correct?",
      ["Mi amiga es alto.", "Mi amiga es alta.", "Mi amiga son alta.", "Mi amiga está alto."],
      "B",
    ],
    [
      "What is the plural of \"la mochila azul\"?",
      ["los mochilas azules", "las mochilas azules", "las mochilas azul", "la mochilas azules"],
      "B",
    ],
    [
      "Which verb form completes: \"Nosotros ___ una clase de arte.\"?",
      ["tengo", "tiene", "tenemos", "tienes"],
      "C",
    ],
    [
      "\"Hay veinte estudiantes en la clase\" means:",
      ["I have twenty students in the class", "There are twenty students in the class", "The students are twenty", "Twenty students need the class"],
      "B",
    ],
    [
      "Which adjective has the same form for masculine and feminine?",
      ["simpático", "trabajador", "inteligente", "delgado"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Describe your best friend in Spanish in three sentences. Use ser with at least two adjectives, and make the adjectives agree. Say one thing your friend has in their backpack, using tener.",
      scheme: [
        "Uses the correct form of ser (es / son)",
        "Uses at least two adjectives",
        "Makes the adjectives agree in gender and number with the person described",
        "Uses a correct form of tener with a school object",
      ],
      model:
        "Mi mejor amiga se llama Emily. Ella es alta, simpática y muy inteligente. Tiene una calculadora y dos cuadernos en su mochila.",
      answers: [
        [
          "full",
          "Mi mejor amigo se llama Marcus. Él [[0|es]] [[1|alto y trabajador]]. [[2|Los dos adjetivos terminan en -o]] porque Marcus es masculino. Marcus [[3|tiene una calculadora en su mochila]].",
          "Muy bien. Your adjectives agree with Marcus, and tiene is the correct form for él.",
        ],
        [
          "full",
          "Mi amiga Gabriela [[0|es]] [[1|simpática, inteligente y divertida]]. [[2|Ella es baja y delgada también.]] Gabriela [[3|tiene tres cuadernos y un bolígrafo]] en la mochila.",
          "Excelente. Notice you used simpática with a for Gabriela, and inteligente with no change.",
        ],
        [
          "partial",
          "Mi amiga se llama Hannah. Ella [[0|es]] [[1|alto y simpático]]. Ella [[3|tiene un libro]] en la mochila.",
          "Hannah is a girl, so the adjectives need to be feminine: alta y simpática.",
        ],
        [
          "partial",
          "Mi amigo Carlos [[1|es inteligente y trabajador]]. Carlos tengo un lápiz y dos cuadernos.",
          "Your description is good. With Carlos use tiene, not tengo: Carlos tiene un lápiz.",
          true,
        ],
        [
          "weak",
          "My friend is tall and nice. She has a backpack with a book.",
          "Please write this in Spanish. Try: mi amiga es alta y simpática. Ella tiene un libro.",
        ],
        [
          "weak",
          "Mi amiga [[0|es]] simpático. Ella son muy alto. Yo tiene una mochila.",
          "You used es once, which is correct. Use es for one person (ella es), and feminine endings: simpática, alta.",
        ],
      ],
    },
    {
      prompt:
        "You are in Spanish class and you forgot some supplies. Write three sentences in Spanish telling what you need and asking a classmate if they have it. Then say how many students there are in your Spanish class, using hay.",
      scheme: [
        "Says what they need using necesito",
        "Names a school supply with a correct article",
        "Asks a classmate a question with tienes",
        "States how many students there are using hay",
      ],
      model:
        "Necesito un lápiz y un cuaderno. ¿Tienes un lápiz? En mi clase de español hay veintidós estudiantes.",
      answers: [
        [
          "full",
          "[[0|Necesito]] [[1|un cuaderno y una calculadora]]. [[2|¿Tienes un cuaderno, por favor?]] En mi clase de español [[3|hay veinticuatro estudiantes]].",
          "Muy bien. Your articles match: un cuaderno, una calculadora.",
        ],
        [
          "full",
          "Hola, [[0|necesito]] [[1|un bolígrafo y un lápiz]]. Ana, [[2|¿tienes un bolígrafo?]] [[3|Hay veintiséis estudiantes en la clase.]]",
          "Excelente. You used the person's name when asking, which is very natural.",
        ],
        [
          "partial",
          "[[0|Necesito]] [[1|una lápiz]]. [[2|¿Tienes un lápiz?]] En mi clase hay un estudiantes.",
          "Lápiz is masculine, so say un lápiz. For the class, use a number: hay veinte estudiantes.",
        ],
        [
          "partial",
          "Yo necesito [[1|una mochila]]. [[3|Hay veinte estudiantes en mi clase.]] Tengo un pregunta.",
          "Your need and your hay sentence are good. Remember to ask the classmate directly: ¿tienes una mochila?",
          true,
        ],
        [
          "weak",
          "I need a pencil. Do you have a pencil? There are twenty students.",
          "Try this in Spanish: necesito un lápiz, ¿tienes un lápiz? Hay veinte estudiantes.",
        ],
        [
          "weak",
          "Yo [[0|necesito]] pencil. Tú tengo lápiz? Hay veinte estudiante en class.",
          "Necesito is right. Use tienes for you, un lápiz, and write estudiantes and clase.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Me gusta, no me gusta, y la hora",
  note: `
## Objectives

Students will be able to:

1. say what they like and do not like with gustar, and ask a classmate the same;
2. tell time and say when classes begin and end.

## Materials

A paper clock for each pair, picture cards of activities, a class schedule template, the quiz, problem set and worksheet.

## Starter (6 minutes)

Hold up pictures: a pizza, a basketball, homework. Ask in Spanish: "¿Te gusta la pizza?" Students answer "Sí, me gusta" or "No, no me gusta." Draw a thumbs up and down.

## Main activity

1. Gustar: me gusta + singular noun or infinitive (me gusta la música; me gusta bailar), me gustan + plural noun (me gustan los deportes). Add a mí me gusta, a ti te gusta, a él le gusta. Practice negative: no me gusta.
2. Interview: students ask three classmates "¿Te gusta el básquetbol? ¿Te gustan las matemáticas?" and record answers.
3. Time: ¿Qué hora es? Es la una. Son las dos. Son las tres y media, y cuarto, menos cuarto. A las ocho de la mañana, de la tarde, de la noche. ¿A qué hora es la clase de arte?
4. Make a short schedule of four classes with times.

## Checking for understanding

Show the paper clock: 8:15, 9:30, 12:45. Students say the time in Spanish.

## Quiz, problem set and worksheet

Gustar practice and time.
`,
  reading: [
    "¿Qué te gusta? ¿Qué hora es?",
    `
To say you like something in Spanish, use the verb **gustar**, but it works differently from "to like" in English. Literally, "me gusta" means "it is pleasing to me." Because of this, the verb agrees with the thing you like, not with the person. If the thing is singular, or an activity, use **gusta**: "Me gusta la música. Me gusta bailar." If the thing is plural, use **gustan**: "Me gustan los deportes. Me gustan las matemáticas." The word before gusta changes with the person: **me** (I), **te** (you), **le** (he, she, you formal), **nos** (we), **les** (they). To make a sentence negative, put **no** before: "No me gusta la tarea." For emphasis, add **a mí**, **a ti**, **a él**: "A mí me gusta el fútbol, pero a ti no te gusta."

To ask a classmate, say: "¿Te gusta el básquetbol?" or "¿Te gustan los videojuegos?" The answer can be "Sí, me gusta" or "No, no me gusta."

Look at a sample interview.

— ¿Te gusta la clase de ciencias?
— Sí, me gusta mucho. Me gustan los experimentos. ¿Y a ti?
— A mí no me gusta la ciencia, pero me gusta el arte.

To tell time, use **es** for one o'clock and **son** for the other hours. "¿Qué hora es?" "Es la una." "Son las dos." For minutes, add **y** (past) or **menos** (to): "Son las tres y diez." "Son las cuatro y cuarto" (4:15). "Son las cinco y media" (5:30). "Son las seis menos cuarto" (5:45). To say when something happens, use **a la** or **a las**: "La clase de español es a las nueve y media." To say AM or PM, add **de la mañana**, **de la tarde** or **de la noche**: "Mi primera clase empieza a las ocho de la mañana y la última termina a las tres de la tarde."

In an American high school, many students start at around 7:30 or 8:00 and end in the early afternoon. Here is a short schedule: "Tengo la clase de inglés a las ocho, la clase de matemáticas a las nueve, el almuerzo a las doce y la clase de arte a la una."
`,
  ],
  cards: [
    ["me gusta", "I like it (singular)"],
    ["me gustan", "I like them (plural)"],
    ["no me gusta", "I do not like it"],
    ["¿Qué hora es?", "What time is it?"],
    ["Es la una.", "It is one o'clock."],
    ["Son las dos y media.", "It is two thirty."],
    ["a las ocho de la mañana", "at eight in the morning"],
    ["menos cuarto", "a quarter to"],
  ],
  closed: [
    [
      "Which Spanish sentence correctly says \"I like sports\"?",
      ["Me gusta los deportes.", "Me gustan los deportes.", "Me gustas los deportes.", "Yo gusto los deportes."],
      "B",
    ],
    [
      "What time is it: \"Son las cinco y media\"?",
      ["5:15", "5:30", "5:45", "4:30"],
      "B",
    ],
    [
      "How do you say \"I do not like homework\"?",
      ["No me gusta la tarea", "Me no gusta la tarea", "No gusto la tarea", "No me gustan la tarea"],
      "A",
    ],
    [
      "\"A las ocho de la mañana\" means:",
      ["At eight in the evening", "At eight in the morning", "At eight thirty", "Eight o'clock tomorrow"],
      "B",
    ],
    [
      "How would you ask a classmate if they like soccer?",
      ["¿Me gusta el fútbol?", "¿Te gusta el fútbol?", "¿Le gustan el fútbol?", "¿Tienes gusta el fútbol?"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write four sentences in Spanish about what you like and do not like. Include one activity with me gusta + infinitive, one plural noun with me gustan, and one negative sentence with no me gusta.",
      scheme: [
        "Uses me gusta with an infinitive or singular noun correctly",
        "Uses me gustan with a plural noun correctly",
        "Uses a negative sentence with no me gusta (or no me gustan)",
        "Writes complete sentences with correct articles or spelling",
      ],
      model:
        "Me gusta bailar. Me gustan los deportes. No me gusta la tarea de matemáticas. También me gusta la música.",
      answers: [
        [
          "full",
          "[[0|Me gusta jugar al básquetbol.]] [[1|Me gustan los videojuegos.]] [[2|No me gusta la tarea.]] [[3|También me gusta la pizza de pepperoni.]]",
          "Muy bien. Each verb form matches what you like, and your articles are correct.",
        ],
        [
          "full",
          "[[0|Me gusta bailar con mis amigos.]] [[1|Me gustan las clases de arte y de ciencias.]] [[2|No me gustan los lunes.]] [[3|A mi hermano le gusta el fútbol.]]",
          "Excelente. You used le gusta correctly for your brother, which we practiced.",
        ],
        [
          "partial",
          "[[0|Me gusta la música.]] [[1|Me gusta los deportes.]] [[2|No me gusta la tarea.]]",
          "Deportes is plural, so use me gustan los deportes. Your other two sentences are right.",
        ],
        [
          "partial",
          "[[0|Me gusta cantar.]] Yo gusto los gatos. [[2|No me gusta el invierno.]]",
          "Nice use of the infinitive. For plural things use me gustan los gatos, not yo gusto.",
          true,
        ],
        [
          "weak",
          "I like to dance. I like sports. I do not like homework. I like pizza.",
          "Please use Spanish: me gusta bailar, me gustan los deportes, no me gusta la tarea.",
        ],
        [
          "weak",
          "Yo gusto bailar. Yo gusto los deportes. No yo gusto la tarea. Pizza yo gusto.",
          "Gustar needs me: me gusta bailar. Put no before me: no me gusta la tarea.",
        ],
      ],
    },
    {
      prompt:
        "Write your class schedule in Spanish for three classes. For each class say the name and the time it begins, using a la / a las. Include de la mañana or de la tarde at least once.",
      scheme: [
        "Names three classes with la clase de plus a subject",
        "States a time with son / es or a la / a las correctly",
        "Uses de la mañana or de la tarde appropriately",
        "Gives times in a logical order with correct number words",
      ],
      model:
        "La clase de inglés es a las ocho de la mañana. La clase de ciencias es a las diez y media. La clase de arte es a la una de la tarde.",
      answers: [
        [
          "full",
          "[[0|La clase de inglés, la clase de matemáticas y la clase de español.]] La clase de inglés es [[1|a las ocho y cuarto]]. La de matemáticas es a las nueve y media [[2|de la mañana]]. [[3|La clase de español es a las once y diez.]]",
          "Muy bien. The times go in order, and the number words are spelled correctly.",
        ],
        [
          "full",
          "Mi primera [[0|clase de arte]] es [[1|a las ocho]] [[2|de la mañana]]. Mi clase de historia es a las diez menos cuarto. [[3|Mi clase de ciencias es a la una de la tarde.]]",
          "Excelente. Note that for one o'clock you correctly used a la una.",
        ],
        [
          "partial",
          "[[0|La clase de inglés]] es [[1|a las ocho]]. La clase de arte es a las dos de la tarde. La clase de ciencias es a la once.",
          "For eleven use a las once. Only one o'clock uses a la una.",
        ],
        [
          "partial",
          "Mi clase de matemáticas es a las nueve [[2|de la mañana]]. [[1|Mi clase de inglés es a las diez.]] Mi clase de arte es a las tres de la noche.",
          "Three PM is de la tarde, not de la noche. You also need three class names with la clase de.",
          true,
        ],
        [
          "weak",
          "English class is at eight. Math is at nine. Art is at one.",
          "Write in Spanish: la clase de inglés es a las ocho. La clase de arte es a la una.",
        ],
        [
          "weak",
          "Clase inglés ocho. Clase de arte uno. Matemáticas nueve y media en mañana.",
          "Use full sentences: la clase de inglés es a las ocho. Say de la mañana, not en mañana.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Verbos en -ar y la pronunciación",
  note: `
## Objectives

Students will be able to:

1. use regular -ar verbs in the present tense to say what people do;
2. recognize the sounds of the Spanish alphabet and read simple words aloud with correct pronunciation.

## Materials

Audio of the Spanish alphabet, a verb conjugation chart, picture cards of activities, a class poster of the vowels, the problem set and worksheet.

## Starter (6 minutes)

Chant the five vowels, with the sounds of a (ah), e (eh), i (ee), o (oh), u (oo). Ask students to read aloud the words casa, mesa, libro, dos, uno. Compare with English: Spanish vowels stay the same.

## Main activity

1. Present regular -ar verbs: hablar, estudiar, caminar, bailar, cantar, trabajar, escuchar, tomar. Remove -ar and add endings: -o, -as, -a, -amos, -an. Examples: yo hablo español, tú estudias mucho, ella baila bien, nosotros caminamos a la escuela, ellos trabajan en un restaurante.
2. Pronunciation: the alphabet (a, be, ce, de...), silent h, the sounds of ll, ñ and rr, j and g before e or i, qu and que. Stress and written accents.
3. Pair activity: each partner says three things they do on a school day and the other writes what they heard.

## Checking for understanding

Whiteboards: conjugate "estudiar" for yo, tú, ella, nosotros. Spell your name aloud in Spanish.

## Problem set and worksheet

Conjugation and a pronunciation exercise.
`,
  reading: [
    "Lo que hacemos todos los días",
    `
Most Spanish verbs end in **-ar**, **-er** or **-ir** in their basic form, called the infinitive. This week we will learn the regular **-ar** verbs. To use one in the present tense, drop the **-ar** and add an ending that shows who is doing the action. For **hablar** (to speak) the forms are:

- yo **hablo**
- tú **hablas**
- él / ella / usted **habla**
- nosotros **hablamos**
- ellos / ellas / ustedes **hablan**

Other common regular -ar verbs are **estudiar** (to study), **caminar** (to walk), **bailar** (to dance), **cantar** (to sing), **trabajar** (to work), **escuchar** (to listen to), **tomar** (to take, drink) and **necesitar** (to need). They all follow the same pattern. Because the ending already tells you the subject, Spanish speakers often leave out the pronoun: "Estudio mucho" is enough for "I study a lot." There is no separate form for "I am studying," so "estudio" can mean "I study" or "I am studying."

Here are some examples. "Yo hablo inglés y un poco de español." "Tú estudias con tus amigos." "Mi hermana canta en el coro de la escuela." "Nosotros caminamos a la escuela por la mañana." "Mis padres trabajan en un hospital." To make a sentence negative, put **no** before the verb: "No hablo francés."

Pronunciation is easier in Spanish than in English because each letter has a consistent sound. The five vowels are always pronounced the same way: **a** like "ah," **e** like "eh," **i** like "ee," **o** like "oh" and **u** like "oo." The letter **h** is silent: hola sounds like "ola." The double **ll** sounds like "y" in most places: llamo. The letter **ñ** sounds like "ny" in "canyon": español. The **rr** is rolled. The **j** and the **g** before e or i are like an English "h" but stronger: jugar, gente. The **qu** is just a "k": ¿qué? Words with a written accent are stressed on that syllable: música, teléfono, canción. The Spanish alphabet has the same letters as English, with the addition of **ñ**, and each letter has a name: a, be, ce, de, e, efe, ge, hache, i, jota, ka, ele, eme, ene, eñe, o, pe, cu, erre, ese, te, u, uve, doble ve, equis, ye, zeta.
`,
  ],
  cards: [
    ["hablar", "to speak, to talk"],
    ["yo hablo", "I speak"],
    ["tú estudias", "you study"],
    ["nosotros caminamos", "we walk"],
    ["ellos trabajan", "they work"],
    ["escuchar", "to listen to"],
    ["la h", "silent letter h"],
    ["la ñ", "the letter ñ, sounds like \"ny\""],
  ],
  closed: [
    [
      "How do you say \"we dance\"?",
      ["bailo", "bailas", "bailamos", "bailan"],
      "C",
    ],
    [
      "Which ending goes with \"tú\" in a regular -ar verb?",
      ["-o", "-as", "-a", "-an"],
      "B",
    ],
    [
      "How is the letter \"h\" pronounced in \"hola\"?",
      ["Like English h", "Like English k", "It is silent", "Like English j"],
      "C",
    ],
    [
      "Which sentence correctly says \"She speaks Spanish\"?",
      ["Ella hablo español.", "Ella habla español.", "Ella hablas español.", "Ella hablan español."],
      "B",
    ],
    [
      "How do you pronounce the vowel \"e\" in Spanish?",
      ["Like \"ee\"", "Like \"eh\"", "Like \"ay\" in day", "Like \"uh\""],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write four sentences in Spanish telling what you and your friends do on a school day. Use four different regular -ar verbs. Use yo, tú or ella, nosotros and ellos at least once each.",
      scheme: [
        "Uses a correct yo form (-o)",
        "Uses a correct tú or ella form (-as or -a)",
        "Uses a correct nosotros form (-amos)",
        "Uses a correct ellos form (-an) and four different verbs",
      ],
      model:
        "Yo estudio en la biblioteca. Mi amiga canta en el coro. Nosotros caminamos a la escuela. Mis amigos trabajan en un restaurante.",
      answers: [
        [
          "full",
          "[[0|Yo estudio con mis amigos.]] [[1|Mi amiga baila muy bien.]] [[2|Nosotros caminamos a la escuela.]] [[3|Mis padres trabajan en un hospital.]]",
          "Muy bien. Each verb ending matches its subject, and you used four different verbs.",
        ],
        [
          "full",
          "[[0|Por la mañana yo escucho música.]] [[1|Tú hablas mucho en la clase.]] [[2|Nosotros bailamos en la cafetería.]] [[3|Ellos cantan en el coro.]]",
          "Excelente. Good use of por la mañana to give context to the sentences.",
        ],
        [
          "partial",
          "[[0|Yo estudio mucho.]] [[1|Mi amiga cantas bien.]] [[2|Nosotros caminamos a clase.]] Ellos trabajamos en un restaurante.",
          "Match the ending to the subject: mi amiga canta, and ellos trabajan.",
        ],
        [
          "partial",
          "[[2|Nosotros hablamos español.]] [[3|Mis amigos escuchan música.]] Yo estudias y ella bailo.",
          "Check the yo and ella forms: yo estudio, ella baila. Your nosotros and ellos forms are correct.",
          true,
        ],
        [
          "weak",
          "I study, you dance, we walk, and they work at a restaurant.",
          "Please write in Spanish: yo estudio, tú bailas, nosotros caminamos, ellos trabajan.",
        ],
        [
          "weak",
          "Yo estudiar. Tú bailar. Nosotros caminar. Ellos trabajar.",
          "Do not use the infinitive. Take off -ar and add the ending: yo estudio, tú bailas, nosotros caminamos, ellos trabajan.",
        ],
      ],
    },
    {
      prompt:
        "Explain in English, and give Spanish examples, how Spanish vowels and the letters h, ll and ñ are pronounced. Then write your own name and the name of your school in Spanish and say how you would spell each aloud.",
      scheme: [
        "States that each Spanish vowel has one consistent sound (a-ah, e-eh, i-ee, o-oh, u-oo)",
        "States that h is silent, with an example such as hola",
        "States that ll sounds like y and ñ like ny, with an example such as llamo or español",
        "Spells a name aloud using the Spanish names of the letters",
      ],
      model:
        "Spanish vowels always sound the same: a (ah), e (eh), i (ee), o (oh), u (oo). The h is silent, as in hola. The ll sounds like y in llamo and the ñ like ny in español. My name is Ana: a, ene, a.",
      answers: [
        [
          "full",
          "[[0|Spanish vowels always have the same sound: a is ah, e is eh, i is ee, o is oh and u is oo.]] [[1|The h is silent, so hola sounds like ola.]] [[2|The ll sounds like y in llamo, and ñ sounds like ny in español.]] [[3|My name is Ben: be, e, ene.]]",
          "Excelente. Your examples support each rule, and you spelled your name with the Spanish letter names.",
        ],
        [
          "full",
          "[[0|In Spanish each vowel is pronounced one way, unlike English.]] [[1|The letter h is silent as in hasta.]] [[2|The double l sounds like a y as in calle, and ñ is ny as in mañana.]] [[3|My name is Jada: jota, a, de, a.]]",
          "Muy bien. Spelling with jota for the first letter is exactly right.",
        ],
        [
          "partial",
          "[[0|The vowels are always the same: a ah, e eh, i ee, o oh, u oo.]] [[1|The h is silent.]] My name is Sam: ese, a, eme.",
          "Add what you know about ll and ñ, with an example of each.",
        ],
        [
          "partial",
          "[[2|The ñ sounds like ny and ll sounds like y.]] [[3|My name is Tia: te, i, a.]] The h sounds like h in English.",
          "The h is silent in Spanish, as in hola. Add a rule about the vowels.",
          true,
        ],
        [
          "weak",
          "The vowels change depending on the word like in English, and h is loud.",
          "In Spanish the vowels are consistent and h is silent. Review the vowel sounds in the reading.",
        ],
        [
          "weak",
          "[[3|My name is Max: eme, a, equis.]] Spanish is pronounced the same as English.",
          "Spelling your name is correct. Spanish pronunciation is different: write the vowel sounds and the silent h.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Los números, la familia y las ideas principales",
  note: `
## Objectives

Students will be able to:

1. understand numbers from 0 to 100 and use them for ages, prices and phone numbers;
2. identify the main idea of a short text about a family or a school;
3. present information about themselves and their family in a short spoken or written description.

## Materials

Number cards, play money, a menu with prices from a taquería, short family reading texts, the worksheet.

## Starter (6 minutes)

Play "bingo" with numbers from 1 to 50. Call numbers in Spanish and students mark them. Review 1 to 20 first, then 21 to 30 (veintiuno, veintidós...), then the tens.

## Main activity

1. Numbers: 0 to 20, 21 to 29 (one word), 30 to 100 (treinta y uno). Use them for ages, phone numbers (read digit by digit or in pairs), and prices: "El burrito cuesta nueve dólares con cincuenta."
2. Family vocabulary: mi madre, mi padre, mi hermano, mi hermana, mis abuelos, mi tío, mi prima. Possessives mi / mis, tu / tus, su / sus.
3. Reading for the main idea: students read three short paragraphs and choose a title. Strategies: look for cognates, repeated words and the first sentence.
4. Presentation: prepare a 40-second description of your family: names, ages and one thing each person does.

## Checking for understanding

Whiteboards: write the number your teacher says, and a price.

## Worksheet

Numbers, family vocabulary and a main-idea reading.
`,
  reading: [
    "Mi familia y los números",
    `
Learning the numbers in Spanish is useful every day. From 0 to 15 you learn each word: **cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince**. From 16 to 29 the words are built: **dieciséis, diecisiete, dieciocho, diecinueve, veinte, veintiuno, veintidós, veintitrés**. For the tens, learn **treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa** and **cien** (100). From 31 on, put them together with **y**: treinta **y** uno (31), cuarenta **y** cinco (45), noventa **y** nueve (99). We use numbers for ages, as in "Mi abuelo tiene setenta y ocho años." For prices: "Un burrito cuesta nueve dólares." For phone numbers, people often say two digits at a time: 614-555-0132 is "seis uno cuatro, cinco cinco cinco, cero uno, tres dos."

Family words are also important. **Mi madre** (or mamá) and **mi padre** (papá) are your parents. **Mi hermano** and **mi hermana** are your brother and sister. **Mis abuelos** are your grandparents. **Mi tío** and **mi tía** are an uncle and an aunt, **mi primo** and **mi prima** are a male or female cousin. To show possession, use **mi / mis** (my), **tu / tus** (your) and **su / sus** (his, her, their). The word changes for plural nouns: mi hermano, mis hermanos.

Reading in a new language is easier if you look for the **main idea**, not every word. Look at the title, the first sentence, the words that repeat and words that look like English words (cognates). Read this short text.

"Me llamo Elena y tengo quince años. Mi familia es grande. Tengo dos hermanos y una hermana. Mi padre trabaja en un hospital y mi madre es profesora de matemáticas. Mis abuelos viven en Columbus y mi abuela cocina mucho. Los domingos toda mi familia come junta."

What is the main idea? The text is about Elena's large family and what each person does. A good title would be "La familia de Elena." You do not need to understand every word, such as "cocina" (cooks) or "junta" (together), to know the main idea.

To present your own family, first say who you are, then name each person, say their age and what they do. "Mi familia es pequeña. Tengo un hermano, Jack. Tiene doce años. Le gusta jugar al fútbol."
`,
  ],
  cards: [
    ["veintiuno", "twenty-one"],
    ["treinta y cinco", "thirty-five"],
    ["noventa y nueve", "ninety-nine"],
    ["cien", "one hundred"],
    ["mis abuelos", "my grandparents"],
    ["mi primo / mi prima", "my cousin (male / female)"],
    ["la idea principal", "the main idea"],
    ["cuesta", "it costs"],
  ],
  closed: [
    [
      "Which number is \"cuarenta y siete\"?",
      ["14", "47", "74", "407"],
      "B",
    ],
    [
      "How do you write 100 in Spanish?",
      ["cien", "diez", "mil", "ciento diez"],
      "A",
    ],
    [
      "\"Mis tíos\" means:",
      ["my cousins", "my uncles (and aunts)", "my brothers", "my grandparents"],
      "B",
    ],
    [
      "Which is the best title for a text that describes Elena's large family and what each person does?",
      ["Mi escuela", "La familia de Elena", "El tiempo en Columbus", "Los números"],
      "B",
    ],
    [
      "A burrito costs \"nueve dólares\". What is the price?",
      ["$0.09", "$9", "$19", "$90"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write five sentences in Spanish describing your family (real or invented). Say how many people are in your family, give the names and ages of two people, using numbers, and tell what one person does.",
      scheme: [
        "States how many people there are in the family or names family members correctly",
        "Gives the age of one person with tiene ... años, writing the number in Spanish",
        "Gives the age of a second person using a different number",
        "Tells what a family member does using a correct present-tense verb",
      ],
      model:
        "Mi familia es pequeña. Tengo un hermano, Jack, y una hermana, Ella. Jack tiene doce años y Ella tiene diecisiete años. Mi madre trabaja en una escuela.",
      answers: [
        [
          "full",
          "[[0|Mi familia es grande: tengo dos hermanos y una hermana.]] Mi padre se llama Mark y [[1|tiene cuarenta y cinco años]]. Mi madre se llama Julia y [[2|tiene cuarenta y tres años]]. [[3|Mi madre trabaja en un hospital.]]",
          "Muy bien. Your numbers are spelled correctly, including the y in cuarenta y cinco.",
        ],
        [
          "full",
          "[[0|En mi familia hay cinco personas.]] Mi hermano Sam [[1|tiene dieciséis años]] y mi abuela [[2|tiene setenta y ocho años]]. [[3|Mi hermano estudia mucho y toca la guitarra.]]",
          "Excelente. You used hay for the number of people, and dieciséis has the accent.",
        ],
        [
          "partial",
          "[[0|Mi familia es pequeña.]] Mi hermana [[1|tiene quince años]]. Mi padre tiene cuarenta y ocho. Mi madre [[3|cocina]] en un restaurante.",
          "Say año after the number: tiene cuarenta y ocho años. Check that you give the ages of two people with their numbers.",
        ],
        [
          "partial",
          "Mi tío se llama Pablo y [[1|tiene treinta y dos años]]. [[3|Pablo trabaja en una tienda.]] Mi familia es muy grande.",
          "Good sentences. Add how many people are in your family and a second age.",
          true,
        ],
        [
          "weak",
          "My family is big. My brother is twelve and my sister is seventeen. My mom is a nurse.",
          "Please write in Spanish, using: mi familia es grande, mi hermano tiene doce años.",
        ],
        [
          "weak",
          "Mi familia es grande. Mi hermano tengo 12. Mi madre trabajo en hospital.",
          "Use tiene for he has, and write the number in Spanish: doce años. Madre trabaja, not trabajo.",
        ],
      ],
    },
    {
      prompt:
        "Read this text and answer in English, then write the main idea as a title in Spanish.\n\n\"Me llamo Carlos y vivo en Columbus. Mi escuela es grande y tiene mil estudiantes. Mi clase favorita es la clase de música porque me gusta cantar. Mis amigos y yo estudiamos en la biblioteca después de las clases.\"\n\nWhat are two details you understand? What is the main idea?",
      scheme: [
        "Identifies that Carlos lives in Columbus and goes to a large school",
        "Identifies a second detail, such as the school has a thousand students or music is his favorite class",
        "States the main idea as Carlos describing his school and what he likes",
        "Writes a suitable Spanish title, such as La escuela de Carlos",
      ],
      model:
        "Carlos lives in Columbus and goes to a big school. His favorite class is music because he likes to sing. The main idea is Carlos describing his school and what he does there. Title: La escuela de Carlos.",
      answers: [
        [
          "full",
          "[[0|Carlos lives in Columbus and his school is big.]] [[1|His favorite class is music because he likes to sing.]] [[2|The main idea is a description of Carlos and his school.]] [[3|La escuela de Carlos]]",
          "Muy bien. Your title matches the main idea and is spelled correctly.",
        ],
        [
          "full",
          "[[0|He lives in Columbus and his school has a lot of students.]] [[1|He studies in the library with friends after class.]] [[2|It is about his school life and what he likes to do.]] [[3|Mi escuela y mi clase favorita]]",
          "Excelente. A longer title like this is fine because it includes both main ideas.",
        ],
        [
          "partial",
          "[[0|Carlos lives in Columbus.]] [[1|His favorite class is music.]] The main idea is that he has a thousand friends.",
          "Mil estudiantes means a thousand students, not friends. The main idea is his school and what he likes.",
        ],
        [
          "partial",
          "[[2|The main idea is about his school and what he likes.]] [[3|El escuela de Carlos]]",
          "Your main idea is good. Escuela is feminine: la escuela de Carlos. Add two details you understood.",
          true,
        ],
        [
          "weak",
          "I do not understand it. It is Spanish and it is hard.",
          "Try looking for cognates: escuela, música, biblioteca, favorita. They tell you the text is about school.",
        ],
        [
          "weak",
          "[[0|Carlos lives in Columbus.]] It is about a family dinner on Sunday and his grandmother.",
          "Look at the words again: escuela, clase and biblioteca are about school, not a family dinner.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Mi horario y los saludos en el mundo hispano",
  note: `
## Objectives

Students will be able to:

1. write a short paragraph about their schedule and favorite subjects;
2. compare greetings and personal space in Spanish-speaking countries with those in their community.

## Materials

A sample schedule written in Spanish, short video clips of greetings in Mexico, Spain and Colombia, a writing rubric, the worksheet and quiz.

## Starter (6 minutes)

Show two photos: a handshake at a business meeting in Columbus, and two friends greeting with a kiss on the cheek in Madrid. Ask in English: "What differences do you see?" Record ideas.

## Main activity

1. Model a paragraph: "Mi día en la escuela." Include time, classes, a verb in the present tense, and an opinion. Use connecting words: primero, después, también, pero, porque.
2. Students write their own paragraph of five to six sentences, using the class schedule from last week and at least three -ar verbs and gustar.
3. Greetings across cultures: in many Spanish-speaking countries friends and family greet with a kiss on the cheek (one in Latin America, two in Spain), men often shake hands or hug, and people stand closer when they talk than in the US. Discuss respect, usted, and that customs vary by country and by region.
4. Make a Venn diagram comparing greetings in Spanish-speaking countries and in the US.

## Checking for understanding

Ask: "When would you use usted instead of tú, and how does that show respect?"

## Worksheet and quiz

Questions about the paragraph and the cultural comparison.
`,
  reading: [
    "Mi horario y cómo nos saludamos",
    `
Writing a paragraph in Spanish means connecting short sentences with simple linking words. Useful words are **primero** (first), **después** (then, afterward), **también** (also), **pero** (but), **porque** (because) and **y** (and). A paragraph about your schedule might include the time, the class, a verb in the present tense and an opinion. Read this model.

"Mi día en la escuela es largo, pero me gusta. Primero, tengo la clase de inglés a las ocho de la mañana. Después, estudio matemáticas a las nueve y media. Mi clase favorita es la clase de arte porque me gusta dibujar. También me gusta la clase de español porque la profesora es muy simpática. Por la tarde, mis amigos y yo caminamos a casa y escuchamos música."

Notice that the paragraph uses **me gusta**, regular -ar verbs (estudio, dibujar, caminamos, escuchamos), and times (a las ocho de la mañana). It also begins with a topic sentence that gives the main idea, and each next sentence adds a detail.

Language is only one part of communicating. Greetings and the use of personal space differ from one culture to another. In the United States, a handshake is common in formal situations, and friends often greet with a wave or a short hug. In many Spanish-speaking countries, it is customary for family members and friends to greet each other with a kiss on the cheek: one kiss in most of Latin America, and two in Spain. Women often greet both women and men this way, and men often greet friends with a handshake, a hug or a pat on the back. People usually stand closer when they talk than most people in the US do, and stepping back can seem unfriendly. In a formal situation, with someone older or someone you do not know, people shake hands and use **usted**. It is polite to greet people when you enter a room, including shopkeepers, and to say goodbye when you leave.

These are general customs. They differ by country, by region, and by family, and many people who live in the United States mix both traditions. In Columbus, which has a large Latino community that includes families from Mexico, Puerto Rico and Central America, you can see both ways of greeting. The best way to be respectful is to observe what others do and to ask politely.
`,
  ],
  cards: [
    ["primero", "first"],
    ["después", "then, afterward"],
    ["también", "also"],
    ["porque", "because"],
    ["mi clase favorita", "my favorite class"],
    ["un beso en la mejilla", "a kiss on the cheek"],
    ["el espacio personal", "personal space"],
    ["usted", "you (formal)"],
  ],
  closed: [
    [
      "Which linking word means \"because\"?",
      ["pero", "después", "porque", "también"],
      "C",
    ],
    [
      "In Spain, friends typically greet with how many kisses on the cheek?",
      ["None", "One", "Two", "Three"],
      "C",
    ],
    [
      "Which sentence would be best as the topic sentence of a paragraph about your day?",
      ["Me gusta la pizza.", "Mi día en la escuela es largo, pero me gusta.", "Hace frío hoy.", "Tengo dos hermanos."],
      "B",
    ],
    [
      "When would you most likely use usted?",
      ["With your best friend", "With your little brother", "With an older person you do not know", "With your pet"],
      "C",
    ],
    [
      "What can stepping back during a conversation seem like in many Spanish-speaking communities?",
      ["Polite", "Unfriendly", "Funny", "Respectful"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a paragraph of at least five sentences in Spanish about your school day. Include times for two classes, your favorite class and why, and one thing you do after school. Use at least two linking words (primero, después, también, pero, porque).",
      scheme: [
        "Gives times for two classes correctly",
        "States a favorite class and a reason with porque",
        "Describes an activity after school with a correct present-tense verb",
        "Uses at least two linking words and mostly correct spelling and accents",
      ],
      model:
        "Mi día en la escuela es interesante. Primero, tengo la clase de ciencias a las ocho y media. Después, tengo la clase de español a las diez. Mi clase favorita es el arte porque me gusta dibujar. También, después de la escuela, camino a casa con mis amigos.",
      answers: [
        [
          "full",
          "Mi día es largo, pero me gusta. Primero, [[0|tengo la clase de inglés a las ocho y la clase de ciencias a las nueve y media]]. [[1|Mi clase favorita es la clase de música porque me gusta cantar.]] Después, [[2|estudio en la biblioteca con mis amigos]]. [[3|También bailamos en el club de baile los jueves.]]",
          "Muy bien. You used primero, después, también and pero. Your accents on música and día are correct.",
        ],
        [
          "full",
          "Mi día en la escuela es divertido. [[0|La clase de matemáticas es a las diez y la clase de arte es a la una de la tarde.]] [[1|Mi clase favorita es el arte porque la profesora es simpática.]] Pero la tarea de matemáticas es difícil. [[2|Después de la escuela, trabajo en un restaurante.]] [[3|También camino a casa con mi hermana.]]",
          "Excelente. A good variety of verbs, a reason with porque, and a contrast with pero.",
        ],
        [
          "partial",
          "Mi día es largo. [[0|Tengo la clase de inglés a las ocho y la clase de arte a las doce.]] Mi clase favorita es el arte porque yo gusto dibujar. [[2|Después, camino a casa.]]",
          "Good schedule sentences. After porque write me gusta dibujar, not yo gusto.",
        ],
        [
          "partial",
          "Primero, tengo inglés. [[1|Mi clase favorita es el español porque es fácil.]] [[3|También estudio con mis amigos.]] Mi clase de ciencias es a las nueve.",
          "You need a time for the first class too, such as a las ocho. Your reason with porque is excellent.",
          true,
        ],
        [
          "weak",
          "My school day is long. I have English at eight and art at one. My favorite class is art because I like to draw.",
          "Please write this in Spanish. Use: tengo la clase de inglés a las ocho, mi clase favorita es el arte.",
        ],
        [
          "weak",
          "Yo escuela. Clase ocho. Arte favorito porque yo dibujar. Yo casa.",
          "Write complete sentences: tengo la clase de inglés a las ocho. Use me gusta dibujar and camino a casa.",
        ],
      ],
    },
    {
      prompt:
        "Compare greetings in the United States and in many Spanish-speaking countries. Give two similarities or differences in how people greet and in personal space, and explain when it is important to use usted. Answer in English.",
      scheme: [
        "States a difference in greeting, such as a kiss on the cheek compared with a handshake or wave",
        "States a difference in personal space, with people standing closer in many Spanish-speaking countries",
        "States a similarity, such as handshakes in formal situations in both",
        "Explains that usted is used with elders and strangers to show respect",
      ],
      model:
        "In many Spanish-speaking countries friends and family greet with a kiss on the cheek, while in the US a wave, hug or handshake is more common. People often stand closer when talking. In both, a handshake is common in formal situations. Usted is used with older people and strangers to show respect.",
      answers: [
        [
          "full",
          "[[0|In many Spanish-speaking countries friends greet with a kiss on the cheek, but in the US we usually wave or hug.]] [[1|People also stand closer together when they talk.]] [[2|In both places, people shake hands in a formal setting.]] [[3|Usted is used with older people and strangers to show respect.]]",
          "Excelente. You gave differences and a similarity, and explained why usted matters.",
        ],
        [
          "full",
          "[[0|A cheek kiss is a normal greeting among friends in Latin America, one kiss, and in Spain, two kisses; a handshake or hug is more common here.]] [[1|Personal space is smaller, so stepping back can seem unfriendly.]] [[2|Handshakes are used in both cultures in formal situations.]] [[3|You use usted for teachers, older adults and people you don't know.]]",
          "Muy bien. Mentioning the number of kisses in different regions shows careful reading.",
        ],
        [
          "partial",
          "[[0|They kiss on the cheek in Spanish-speaking countries.]] [[3|Usted is for respect.]]",
          "Add a difference in personal space and a similarity between the two cultures.",
        ],
        [
          "partial",
          "[[1|People stand closer.]] [[2|Both shake hands.]] They kiss strangers on the cheek, and use usted with friends.",
          "Usted is used with strangers and elders, and kisses are for friends and family. Fix the last part.",
          true,
        ],
        [
          "weak",
          "Everyone in Spanish-speaking countries kisses everyone, and personal space is the same everywhere.",
          "Customs vary by country and by situation, and personal space is often smaller. Not everyone greets everyone with a kiss.",
        ],
        [
          "weak",
          "[[0|They greet with a kiss on the cheek.]] Americans never touch each other when they greet so it is very rude.",
          "Americans do shake hands and hug. Differences are not rude; they are different customs.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Tradiciones y geografía del mundo hispano",
  note: `
## Objectives

Students will be able to:

1. describe a product or tradition from a Spanish-speaking country, such as Day of the Dead or la quinceañera;
2. use Spanish to learn about geography by naming the countries and capitals of Spanish-speaking nations.

## Materials

Photos of an ofrenda, pan de muerto, cempasúchil flowers and a quinceañera, a political map of the Spanish-speaking world, the quiz, problem set and worksheet.

## Starter (6 minutes)

Show a photo of an ofrenda with marigolds, candles and photographs. Ask in English: "What do you think this is for?" Collect ideas about remembering family. Introduce the term "Día de Muertos."

## Main activity

1. Día de Muertos (November 1 and 2, Mexico): families remember loved ones who have died with an ofrenda (altar), photos, candles, marigolds (cempasúchil), pan de muerto and favorite foods. It is a celebration of life and memory, not a sad or scary event. Mention the UNESCO recognition and the film Coco.
2. La quinceañera: a celebration of a girl's fifteenth birthday in many Latin American communities: Mass, a dress, a court of friends, a waltz and a party. Discuss similarities with a sweet sixteen or a graduation.
3. Geography: label a map with countries and capitals: México (Ciudad de México), España (Madrid), Argentina (Buenos Aires), Colombia (Bogotá), Perú (Lima), Chile (Santiago), Cuba (La Habana), Venezuela (Caracas), Ecuador (Quito), Costa Rica (San José).
4. Practice questions: "¿Cuál es la capital de Perú?" "La capital de Perú es Lima."

## Checking for understanding

Map quiz: students point to a country when the teacher says its name.

## Quiz, problem set and worksheet

Culture and geography.
`,
  reading: [
    "Dos tradiciones y un mapa",
    `
The Spanish language is spoken by more than 500 million people in 20 countries, and each region has its own traditions. This week we learn about two important celebrations and about the map of the Spanish-speaking world.

**El Día de Muertos** (Day of the Dead) is a holiday celebrated in Mexico on November 1 and 2. It may sound scary, but it is a joyful occasion to remember family members and friends who have died. Families make an **ofrenda**, an altar in the home or at the cemetery, with photographs of the loved ones, candles, and their favorite foods and drinks. The bright orange **cempasúchil** flowers (marigolds) decorate the altar, and their strong scent is said to guide spirits home. There is **pan de muerto**, a sweet bread, and **calaveras de azúcar**, sugar skulls with names written on them. People believe that on these days the souls of the dead come back to visit. The tradition combines indigenous Mexican customs and Catholic traditions, and UNESCO recognizes it as part of the heritage of humanity. Today the holiday is also celebrated in the United States, including in Columbus, where cultural centers and families put up altars. It is not the same as Halloween, even though the dates are close.

**La quinceañera** is a celebration of a girl's fifteenth birthday in Mexico and many other Latin American countries, and among Latino families in the United States. It marks the passage from childhood to young adulthood. The celebration often begins with a Mass of thanksgiving. The honored girl, the **quinceañera**, wears a long formal dress, and she is accompanied by a group of friends and relatives, the **corte**. There are traditions such as the first dance, a waltz with her father, and a party with food, music and a cake. Families may spend months planning it. Some families today choose a trip or another gift instead.

Knowing where Spanish is spoken helps us understand the world. The country names and capitals include: **México** (capital: Ciudad de México), **España** (Madrid), **Argentina** (Buenos Aires), **Colombia** (Bogotá), **Perú** (Lima), **Chile** (Santiago), **Cuba** (La Habana), **Venezuela** (Caracas), **Ecuador** (Quito) and **Costa Rica** (San José). To ask a question, use "¿Cuál es la capital de Perú?" and answer "La capital de Perú es Lima." Spanish is also spoken in Puerto Rico, a territory of the United States, and in Equatorial Guinea, in Africa.
`,
  ],
  cards: [
    ["el Día de Muertos", "Day of the Dead"],
    ["la ofrenda", "the altar with offerings"],
    ["el cempasúchil", "marigold flowers"],
    ["el pan de muerto", "sweet bread for Day of the Dead"],
    ["la quinceañera", "a girl's 15th birthday celebration"],
    ["la capital de Perú", "the capital of Peru (Lima)"],
    ["Buenos Aires", "capital of Argentina"],
    ["Bogotá", "capital of Colombia"],
  ],
  closed: [
    [
      "What is the main purpose of Día de Muertos?",
      ["To scare people", "To remember and honor loved ones who have died", "To celebrate a harvest only", "To mark the end of the school year"],
      "B",
    ],
    [
      "Which flower is traditionally used to decorate ofrendas?",
      ["Rose", "Tulip", "Cempasúchil (marigold)", "Sunflower"],
      "C",
    ],
    [
      "What is the capital of Colombia?",
      ["Lima", "Bogotá", "Santiago", "Caracas"],
      "B",
    ],
    [
      "La quinceañera celebrates:",
      ["A fifteenth birthday", "A wedding", "A high school graduation", "A new year"],
      "A",
    ],
    [
      "How do you say \"The capital of Chile is Santiago\"?",
      ["La capital de Chile es Santiago", "El capital de Chile son Santiago", "Santiago es Chile capital", "La capital Chile tiene Santiago"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Choose Día de Muertos or la quinceañera. Write four sentences in Spanish about it: say when or at what age it takes place, one thing people do or have, and whether you would like to attend and why. You may use simple sentences.",
      scheme: [
        "Names the tradition and says when or at what age it takes place",
        "Names one thing people have, such as una ofrenda, flores, un vestido or una fiesta",
        "Names one thing people do, using a correct present-tense verb",
        "Gives an opinion with me gusta or me gustaría and a reason",
      ],
      model:
        "El Día de Muertos es el primero y el dos de noviembre. Las familias tienen una ofrenda con fotos y flores. Ellos recuerdan a sus familiares. Me gusta porque es una tradición bonita.",
      answers: [
        [
          "full",
          "[[0|El Día de Muertos es en noviembre, en México.]] [[1|Las familias tienen una ofrenda con velas y flores de cempasúchil.]] [[2|Ellos recuerdan a sus abuelos y preparan pan de muerto.]] [[3|Me gusta esta tradición porque es una celebración de la vida.]]",
          "Muy bien. Your verbs agree with their subjects, and your last sentence gives a clear reason.",
        ],
        [
          "full",
          "[[0|La quinceañera es la fiesta de los quince años de una chica.]] [[1|La chica tiene un vestido largo y una fiesta con música.]] [[2|Ella baila el vals con su padre.]] [[3|Me gustaría ir porque me gusta bailar y la comida.]]",
          "Excelente. You used me gustaría, which we just met, and your reasons are clear.",
        ],
        [
          "partial",
          "[[0|El Día de Muertos es en noviembre.]] [[1|Hay una ofrenda con flores.]] Las familias comer pan de muerto. Me gusta porque bonito.",
          "Conjugate the verb: las familias comen pan de muerto. Say porque es bonito.",
        ],
        [
          "partial",
          "[[0|La quinceañera es una fiesta para chicas de quince años.]] [[2|Las chicas bailan.]] Yo gustaría ir.",
          "You need a thing people have and a full opinion: me gustaría ir porque me gusta la música.",
          true,
        ],
        [
          "weak",
          "Day of the Dead is in November. People have an altar. I like it because it is beautiful.",
          "Please write in Spanish: el Día de Muertos es en noviembre, las familias tienen una ofrenda.",
        ],
        [
          "weak",
          "El Día de Muertos halloween. Ellos tiene miedo. Yo no gusta.",
          "Día de Muertos is not Halloween, and it is not scary. Try: es una celebración para recordar a la familia.",
        ],
      ],
    },
    {
      prompt:
        "Write the capitals of four Spanish-speaking countries in Spanish sentences, using \"La capital de ___ es ___.\" Then name one country that is in South America and one in Central America or the Caribbean from the countries in our reading.",
      scheme: [
        "Writes at least four sentences with la capital de ... es ... in the correct form",
        "Gives at least three of the four capitals correctly",
        "Names a country in South America correctly",
        "Names a country in Central America or the Caribbean correctly, such as Costa Rica or Cuba",
      ],
      model:
        "La capital de México es Ciudad de México. La capital de Perú es Lima. La capital de España es Madrid. La capital de Colombia es Bogotá. Perú está en Sudamérica y Cuba está en el Caribe.",
      answers: [
        [
          "full",
          "[[0|La capital de México es Ciudad de México. La capital de Chile es Santiago. La capital de Argentina es Buenos Aires. La capital de Cuba es La Habana.]] [[1|Las cuatro capitales son correctas.]] [[2|Chile está en Sudamérica.]] [[3|Cuba está en el Caribe.]]",
          "Excelente. All four sentences follow the pattern, and the location sentences are correct.",
        ],
        [
          "full",
          "[[0|La capital de España es Madrid. La capital de Perú es Lima. La capital de Ecuador es Quito. La capital de Costa Rica es San José.]] [[1|Todas las capitales son correctas.]] [[2|Perú y Ecuador están en Sudamérica.]] [[3|Costa Rica está en Centroamérica.]]",
          "Muy bien. Naming two countries on each continent shows what you know.",
        ],
        [
          "partial",
          "[[0|La capital de Perú es Lima.]] [[1|La capital de Colombia es Bogotá.]] La capital de España es Barcelona. La capital de Chile es Santiago.",
          "Madrid is the capital of Spain, not Barcelona. Add a country from South America and one from Central America or the Caribbean.",
        ],
        [
          "partial",
          "La capital de Argentina es Buenos Aires. [[2|Argentina está en Sudamérica.]] [[3|Costa Rica está en Centroamérica.]] La capital de Venezuela es Lima.",
          "The capital of Venezuela is Caracas. Lima is the capital of Peru. Write four sentences with the correct capitals.",
          true,
        ],
        [
          "weak",
          "The capital of Peru is Lima. The capital of Spain is Madrid. Peru is in South America.",
          "Please write in Spanish: la capital de Perú es Lima. La capital de España es Madrid.",
        ],
        [
          "weak",
          "La capital Perú Lima. México capital Madrid. España capital Bogotá.",
          "Use the full pattern: la capital de Perú es Lima. Check the capitals: Madrid is in España and Ciudad de México is in México.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Cognados, falsos amigos y el español en mi comunidad",
  note: `
## Objectives

Students will be able to:

1. notice similarities between Spanish and English words, including cognates and false friends;
2. find examples of Spanish in their community, such as signs, menus and media, and report what they say.

## Materials

A list of cognates and false friends, photos of Spanish signs and menus from Columbus (Hilltop, Westerville, Short North), a class scavenger hunt sheet, the quiz, problem set and worksheet.

## Starter (6 minutes)

Write on the board: importante, restaurante, familia, teléfono, animal. Ask in English: "Can you guess what these mean?" Introduce the word "cognate" and show that many Spanish words look like English because both come from Latin or Greek.

## Main activity

1. Cognates: common endings -ción = -tion (información), -dad = -ty (universidad), -ante = -ant, -oso = -ous (famoso). Cognates help in reading, but pronunciation differs.
2. False friends (falsos amigos): embarazada means pregnant, not embarrassed; la librería is a bookstore, not a library (la biblioteca); actual means current; asistir means to attend; el éxito means success; constipado means having a cold. Discuss how to check meaning in context.
3. Spanish around us: students examine photos and real examples (a bakery sign, a bus announcement, a menu, a pharmacy label) and report in English what each says and in Spanish one word they recognize.
4. Homework: find one example of Spanish in your community and write a short report.

## Checking for understanding

Ask: "If you read 'La librería está en la calle Main,' what is the building and what is it not?"

## Quiz, problem set and worksheet

Cognates, false friends and a community example.
`,
  reading: [
    "Palabras amigas y palabras traidoras",
    `
One of the best things about learning Spanish as an English speaker is that thousands of words look and mean almost the same in both languages. These words are called **cognates**, and they exist because English and Spanish borrowed many words from Latin and Greek. Examples are **importante**, **familia**, **restaurante**, **teléfono**, **animal**, **música** and **chocolate**. There are patterns that help you find more. English words ending in **-tion** often end in **-ción** in Spanish: *information* is *información*, *nation* is *nación*. English **-ty** becomes **-dad**: *university* is *universidad*, *city* is *ciudad*. English **-ous** becomes **-oso**: *famous* is *famoso*. English **-ly** adverbs often match **-mente**: *finally* is *finalmente*. Cognates help you understand new texts quickly. Remember that they are pronounced in a Spanish way, with the five pure vowels: *familia* is "fah-MEE-lyah," not like the English word.

Not all similar words are friends. A **false friend** (falso amigo) looks like an English word but has a different meaning. If you say "Estoy embarazada" you are not saying "I am embarrassed" but "I am pregnant." The word **embarazoso** is closer to "embarrassing" in meaning, and "I am embarrassed" is "Tengo vergüenza." A **librería** is a bookstore, not a library, which is a **biblioteca**. The word **actual** means "current" or "present-day," not "real," which is **real** or **verdadero**. **Asistir** means "to attend a class or event," not "to assist," which is **ayudar**. **Éxito** means "success," not "exit," which is **salida**. **Constipado** means "having a cold," not "constipated." When a word seems strange in context, use the other words in the sentence to decide. If "Voy a asistir a la clase" came from a person in a school, "attend" makes sense and "assist" does not.

Spanish is also all around you. In Ohio, nearly half a million people speak Spanish at home, and in Columbus you can see **carnicerías** (butcher shops), **panaderías** (bakeries), **taquerías**, signs such as **Se habla español** (Spanish spoken here) and **Abierto** (open), pharmacy labels, church bulletins, bus announcements and radio stations. A menu might say **tacos de pollo**, **arroz con frijoles** and **agua fresca**, and you can read much of it by recognizing cognates and food words. When you find an example, you can report what it says, where you saw it, and who you think it is for. Doing so shows how the language is part of the community and not just a school subject.
`,
  ],
  cards: [
    ["el cognado", "a word that looks and means the same in two languages"],
    ["el falso amigo", "a false friend, a word that looks similar but has a different meaning"],
    ["la biblioteca", "the library"],
    ["la librería", "the bookstore"],
    ["embarazada", "pregnant (not embarrassed)"],
    ["asistir", "to attend"],
    ["el éxito", "success"],
    ["Se habla español.", "Spanish spoken here."],
  ],
  closed: [
    [
      "Which pair are cognates?",
      ["importante / important", "librería / library", "embarazada / embarrassed", "éxito / exit"],
      "A",
    ],
    [
      "What does \"la librería\" mean?",
      ["The library", "The bookstore", "The classroom", "The liberty"],
      "B",
    ],
    [
      "English words ending in -tion usually end in what in Spanish?",
      ["-dad", "-ción", "-oso", "-mente"],
      "B",
    ],
    [
      "\"Voy a asistir a la clase de arte\" means:",
      ["I am going to help the art class", "I am going to attend the art class", "I am going to assist the art teacher", "I am going to resist art class"],
      "B",
    ],
    [
      "A sign in a store window says \"Se habla español.\" What does it tell customers?",
      ["The store is closed", "Spanish is spoken there", "The store sells Spanish books", "The store is in Spain"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write in Spanish the cognates for these English words and explain the pattern: information, university, famous. Then explain in English what a false friend is and give one example with its real meaning.",
      scheme: [
        "Writes información, universidad and famoso correctly",
        "Explains the patterns -tion/-ción, -ty/-dad and -ous/-oso",
        "Defines a false friend as a word that looks like an English word but has a different meaning",
        "Gives a correct example, such as embarazada (pregnant) or librería (bookstore)",
      ],
      model:
        "Información, universidad, famoso. The patterns are -tion becomes -ción, -ty becomes -dad and -ous becomes -oso. A false friend is a word that looks like an English word but means something different, such as librería, which means bookstore and not library.",
      answers: [
        [
          "full",
          "[[0|información, universidad, famoso]]. [[1|The patterns are -tion to -ción, -ty to -dad and -ous to -oso.]] [[2|A false friend is a Spanish word that looks like an English word but has a different meaning.]] [[3|For example, embarazada means pregnant, not embarrassed.]]",
          "Excelente. You wrote all three words correctly and explained the patterns.",
        ],
        [
          "full",
          "[[0|Información, universidad, famoso.]] [[1|English -tion becomes -ción in Spanish, -ty becomes -dad, and -ous becomes -oso.]] [[2|A false friend looks like an English word but it means something else.]] [[3|Librería is a bookstore. Library is biblioteca.]]",
          "Muy bien. Giving the correct word for the English meaning, biblioteca, is a good extra.",
        ],
        [
          "partial",
          "[[0|información, universidad, famoso]]. [[1|-tion becomes -ción.]] A false friend is a good friend in Spanish class. Embarazada is embarrassed.",
          "A false friend is a word that looks similar but has a different meaning, and embarazada means pregnant. Explain the other two patterns too.",
        ],
        [
          "partial",
          "[[0|informacion, universidad, famoso]]. [[2|A false friend is a word that looks like an English word but means something different.]]",
          "Información needs the accent. Explain the three patterns and give an example of a false friend.",
          true,
        ],
        [
          "weak",
          "Information, university, famous are the same in Spanish. A false friend is a person who lies.",
          "The Spanish words have different spellings: información, universidad, famoso. A false friend is a word, not a person.",
        ],
        [
          "weak",
          "[[1|-tion becomes -ción.]] Informasion, universty, famous. A false friend is a cognate.",
          "Spell the Spanish words: información, universidad, famoso. A false friend is the opposite of a cognate, since the meaning is different.",
        ],
      ],
    },
    {
      prompt:
        "Describe an example of Spanish that you see in your community, such as a sign, a menu, a store, a radio station or a label. Answer in English: what does it say, where is it, who is it for and which cognates or words did you recognize? Write one sentence in Spanish about it.",
      scheme: [
        "Describes what the example says or means",
        "States where it is found in the community",
        "States who it is for, such as Spanish-speaking customers or neighbors",
        "Names recognized words or cognates and writes one correct sentence in Spanish about it",
      ],
      model:
        "A bakery sign in the Hilltop neighborhood says Panadería y pastelería, which means bakery and pastry shop. It is for people who shop there, including Spanish speakers. I recognized pastelería because it looks like pastry. En la panadería hay pan dulce y café.",
      answers: [
        [
          "full",
          "[[0|A sign says Se habla español, which means Spanish spoken here.]] [[1|It is on the door of a pharmacy near my house.]] [[2|It is for customers who speak Spanish so they know they can get help.]] [[3|I recognized español. En la farmacia hay una persona que habla español.]]",
          "Muy bien. Your sentence in Spanish is correct, and you thought about who the sign is for.",
        ],
        [
          "full",
          "[[0|A taquería menu lists tacos de pollo, arroz con frijoles and agua fresca.]] [[1|It's in a restaurant in the Short North.]] [[2|It is for all customers, including Spanish speakers and people learning the language.]] [[3|I recognized pollo from chicken and arroz because we learned it. Me gustan los tacos.]]",
          "Excelente. Using a cognate and a food word shows how to read a menu.",
        ],
        [
          "partial",
          "[[0|A sign says Abierto, which means open.]] [[1|It is on a store near the school.]] I do not know who it is for. I did not know any other word. Es una tienda.",
          "Say who the sign is for, and which words you recognized. Your Spanish sentence is correct.",
        ],
        [
          "partial",
          "[[1|A bus in Columbus has an announcement in Spanish.]] [[2|It is for Spanish speakers who ride the bus.]] I heard the word parada. The bus is big.",
          "Say what the announcement meant. Parada means stop. Add a Spanish sentence, for example: la parada está cerca.",
          true,
        ],
        [
          "weak",
          "I saw Spanish. It was a sign. It was nice. I do not know what it said.",
          "Describe where you saw it and what it said. Look for cognates and use a dictionary for the other words.",
        ],
        [
          "weak",
          "A store called Carnicería is for people who are carnivores, and it is in the library because the library has books.",
          "Carnicería is a butcher shop, so the guess is close, but a library is a biblioteca. Say where you saw it, who it is for, and use a Spanish sentence.",
        ],
      ],
    },
  ],
};

writeCourse("spanish-i-grade-9.json", "Spanish I", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
