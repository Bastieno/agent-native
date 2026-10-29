import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Anatomy and Physiology, Grade 12, Quarter 1. Standards: Next Generation
 * Science Standards HS-LS1 and the course's own anatomy framework, in the
 * school's own words.
 */

const w1: WeekInput = {
  topic: "Orientation to the body: terms, cavities, levels and feedback",
  note: `
## Objectives

Students will be able to:

1. use anatomical terms for position, planes and body cavities to describe where structures lie;
2. list the levels of organization from chemicals to the whole organism;
3. explain how negative feedback keeps body temperature, blood glucose and fluid balance stable.

## Materials

Anatomical position posters, body outline worksheets, sticky notes, a torso model, the quiz.

## Starter (7 minutes)

Have a volunteer stand in the anatomical position (standing, feet flat, palms forward). Ask: "If I say the elbow is proximal to the wrist, what do I mean? What if I say the sternum is anterior to the spine?" Build the vocabulary from their answers.

## Main activity

1. Directional terms: superior and inferior, anterior and posterior, medial and lateral, proximal and distal, superficial and deep. Students label sticky notes and place them on a partner.
2. Planes and cavities: sagittal, frontal and transverse planes; the dorsal cavity (cranial and spinal) and the ventral cavity (thoracic and abdominopelvic). Use the torso model to find the diaphragm that separates the thoracic and abdominal cavities.
3. Levels of organization: chemical, cellular, tissue, organ, organ system, organism. Then homeostasis with a thermostat analogy and the sweating loop for body temperature.

## Checking for understanding

Whiteboards: "The heart is ___ to the lungs, and ___ to the diaphragm." Look for medial and superior.

## Quiz and problem set

Five quiz questions and a short problem set on terms and feedback.
`,
  reading: [
    "A common language for the body",
    `
Anatomists describe every structure as if the body is in the **anatomical position**: standing upright, feet flat and together, arms at the sides, palms facing forward. Doing so avoids confusion when, for example, a patient is lying down or has an arm raised. "Left" and "right" always refer to the patient's left and right, not the observer's.

Directional terms come in pairs. **Superior** means toward the head and **inferior** toward the feet. **Anterior**, or ventral, means toward the front, and **posterior**, or dorsal, toward the back. **Medial** means toward the midline of the body and **lateral** away from it. **Proximal** and **distal** describe position along a limb: the elbow is proximal to the wrist, because it is closer to where the limb attaches to the trunk. **Superficial** is closer to the surface, and **deep** is farther inside.

Imaginary **planes** cut the body to help in description. A sagittal plane divides it into left and right parts, a frontal (coronal) plane divides it into front and back, and a transverse plane divides it into upper and lower parts. A CT scan shows transverse slices.

The body contains two major **cavities**. The dorsal cavity is at the back and has two parts: the cranial cavity, which holds the brain, and the spinal cavity, which holds the spinal cord. The ventral cavity is at the front and includes the thoracic cavity, which holds the heart and lungs, and the abdominopelvic cavity, which holds the digestive organs, the bladder and the reproductive organs. The muscle called the diaphragm separates the thoracic and abdominopelvic cavities.

The body is organized in levels. Atoms form molecules at the **chemical level**. Molecules form organelles, which make up cells at the **cellular level**. Similar cells form **tissues**, tissues form **organs**, and organs working together form **organ systems**. All eleven systems together make the **organism**.

For the organism to survive, conditions inside must stay stable, which is **homeostasis**. Most of it works by **negative feedback**, where the response reverses the change. If body temperature rises above 37 degrees Celsius, receptors in the skin and brain signal the hypothalamus. It triggers sweating and widening of skin blood vessels, which cool the body. Once the temperature falls, the signals stop. Blood glucose works the same way: after a meal, insulin lowers it, and glucagon raises it when it falls. Fluid balance is maintained by the kidneys, which produce more or less urine under the control of the hormone ADH.
`,
  ],
  cards: [
    ["Anatomical position", "Standing upright, feet together, arms at the sides, palms forward."],
    ["Proximal", "Closer to the point of attachment of a limb to the trunk."],
    ["Distal", "Farther from the point of attachment of a limb."],
    ["Sagittal plane", "A plane that divides the body into left and right parts."],
    ["Transverse plane", "A plane that divides the body into upper and lower parts."],
    ["Thoracic cavity", "The chest cavity that contains the heart and lungs."],
    ["Homeostasis", "Keeping the body's internal conditions stable."],
    ["Negative feedback", "A response that reverses the change that triggered it."],
  ],
  closed: [
    [
      "The elbow is ___ to the wrist.",
      ["Distal", "Proximal", "Inferior", "Lateral"],
      "B",
    ],
    [
      "Which plane divides the body into front and back parts?",
      ["Sagittal", "Frontal", "Transverse", "Oblique"],
      "B",
    ],
    [
      "Which organ is found in the thoracic cavity?",
      ["Stomach", "Urinary bladder", "Heart", "Spinal cord"],
      "C",
    ],
    [
      "What is the correct order from simplest to most complex?",
      ["Cell, tissue, organ, organ system", "Tissue, cell, organ system, organ", "Organ, tissue, cell, organ system", "Cell, organ, tissue, organ system"],
      "A",
    ],
    [
      "After a meal, blood glucose rises and insulin is released, which lowers it. This is an example of:",
      ["Positive feedback", "Negative feedback", "A reflex arc", "Diffusion"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the position of the heart relative to the lungs and the diaphragm, using at least two directional terms and naming the cavity that contains it.",
      scheme: [
        "Names the thoracic cavity as the cavity containing the heart",
        "Describes the heart as medial to the lungs",
        "Describes the heart as superior to the diaphragm",
        "Uses a further correct directional term, such as anterior to the spine or deep to the sternum",
      ],
      model:
        "The heart lies in the thoracic cavity. It is medial to the lungs, between them near the midline, and superior to the diaphragm. It is also anterior to the spine and deep to the sternum.",
      answers: [
        [
          "full",
          "[[0|The heart is in the thoracic cavity.]] [[1|It is medial to the lungs, sitting between them.]] [[2|It is superior to the diaphragm.]] [[3|It is also anterior to the spine and deep to the breastbone.]]",
          "Full marks. Four terms used correctly, each tied to a landmark.",
        ],
        [
          "full",
          "[[0|Cavity: thoracic.]] [[1|Medial to each lung, near the midline.]] [[2|Above, or superior to, the diaphragm.]] [[3|Posterior to the sternum and anterior to the vertebral column.]]",
          "All four marks, and the pair of anterior and posterior statements is a strong check.",
        ],
        [
          "partial",
          "[[0|The heart is in the thoracic cavity.]] [[2|It is superior to the diaphragm.]]",
          "Good. Add its position relative to the lungs, using medial or lateral, and one more directional term.",
        ],
        [
          "partial",
          "[[1|The heart is medial to the lungs]] and it is in the abdominal cavity, below the diaphragm.",
          "The heart is above the diaphragm in the thoracic cavity. Correct the cavity and the direction.",
          true,
        ],
        [
          "weak",
          "The heart is lateral to the lungs because it is on the left side of the body.",
          "Lateral means away from the midline. The heart sits between the lungs, so it is medial to them.",
        ],
        [
          "weak",
          "[[0|It is in the thoracic cavity.]] It is distal to the lungs, near the feet.",
          "Distal and proximal describe limbs. The heart is near the midline, so medial is the right term.",
        ],
      ],
    },
    {
      prompt:
        "Explain how negative feedback returns body temperature to normal after a person exercises in the heat. Name the receptors, the control center and two effector responses.",
      scheme: [
        "Names temperature receptors in the skin and brain as the detectors of the rise",
        "Names the hypothalamus as the control center",
        "Gives sweating and widening of skin blood vessels as the effector responses",
        "States that the response reverses the change, and that it stops once temperature returns to normal",
      ],
      model:
        "Temperature receptors in the skin and brain detect the rise in body temperature. They signal the hypothalamus, which is the control center. It triggers sweating and widening of blood vessels in the skin, which lose heat. The temperature falls, which reverses the original change, and the responses stop once it is back to normal.",
      answers: [
        [
          "full",
          "[[0|Receptors in the skin and brain sense that the temperature is rising.]] [[1|They send the information to the hypothalamus, the control center.]] [[2|The hypothalamus makes the sweat glands release sweat and the blood vessels in the skin widen.]] [[3|That cools the body and reverses the rise, and when it reaches normal the responses switch off.]]",
          "Full marks. Each part of the loop is named in order.",
        ],
        [
          "full",
          "[[0|Thermoreceptors detect the warmer blood and skin.]] [[1|The hypothalamus compares this to the set point.]] [[2|Effectors: sweat glands produce sweat and skin arterioles dilate.]] [[3|Heat loss lowers the temperature, which turns the response off, so it is negative feedback.]]",
          "All four marks, and the set point is a good addition.",
        ],
        [
          "partial",
          "[[1|The hypothalamus is the control center.]] [[2|The body sweats]] to cool down.",
          "Name the receptors that detect the change, and say what happens once the temperature returns to normal.",
        ],
        [
          "partial",
          "[[0|Receptors in the skin detect heat.]] [[3|The response stops when the body is cooled.]] The heart then pumps harder to cool you down.",
          "The effectors are the sweat glands and skin blood vessels. Name the control center, the hypothalamus.",
          true,
        ],
        [
          "weak",
          "The body gets hot so it shivers to warm up and then it is the right temperature.",
          "Shivering raises temperature when you are cold. When too hot, the body sweats and widens skin vessels.",
        ],
        [
          "weak",
          "[[2|The body sweats.]] That is positive feedback because sweating is a positive thing.",
          "Negative feedback is not bad. It means the response reverses the change. Sweating cools you down.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Tissues to organ systems, and the energy demands of exercise",
  note: `
## Objectives

Students will be able to:

1. describe how tissues combine to form organs and how organ systems interact;
2. link cellular respiration in muscle cells to the energy demands of exercise.

## Materials

Organ cards, a chart of the eleven organ systems, a stopwatch, a pulse chart, the worksheet.

## Starter (6 minutes)

Pose: "You run up the stairs to class. Which organ systems did you use, and in what order?" List on the board and draw arrows to show interactions.

## Main activity

1. Build a concept map of the eleven systems with arrows for interactions. Pick the stomach as an organ and list its four tissue types.
2. Discuss muscle energy: ATP stores for a few seconds, then the creatine phosphate system, then aerobic respiration for long events and glycolysis with lactate in intense bursts.
3. Measure resting pulse and pulse after one minute of step-ups; students calculate the percent increase and explain it in terms of oxygen demand.

## Checking for understanding

Ask: "Why does your breathing stay fast after you stop exercising?" Listen for the oxygen debt idea.

## Problem set and worksheet

Interaction problems, a pulse calculation and a short written explanation.
`,
  reading: [
    "Systems working together",
    `
Organs are made of several types of tissue. The stomach is a good example. Its inner lining is epithelial tissue that secretes mucus and acid. Its wall contains smooth muscle tissue that churns the food. Connective tissue holds the layers together and supplies blood vessels, and nervous tissue controls the muscle and secretion. Each tissue contributes to the stomach's job, so the stomach's function cannot be understood by looking at one tissue alone.

In the same way, organs are grouped into eleven **organ systems**: integumentary, skeletal, muscular, nervous, endocrine, cardiovascular, lymphatic and immune, respiratory, digestive, urinary and reproductive. No system works in isolation. The digestive system absorbs glucose, the cardiovascular system delivers it, the respiratory system provides oxygen, and the nervous and endocrine systems coordinate the response. A failure in one place is felt in others: the kidneys, part of the urinary system, control blood volume and so affect blood pressure in the cardiovascular system.

Exercise shows how these systems interact. A muscle cell uses **ATP** to power the sliding of its filaments. A muscle contains only enough ATP for a few seconds of work. The next source is **creatine phosphate**, which can quickly regenerate ATP and lasts about 10 seconds. After that, the cell relies on glucose. If oxygen is plentiful, as in a jog, the cell uses **aerobic respiration**, which produces about 30 ATP per glucose and releases carbon dioxide and water. In a sprint, oxygen cannot reach the muscle fast enough, so the cell uses **glycolysis** alone, which makes only 2 ATP per glucose and produces lactate. Lactate builds up in the muscle and contributes to the burning feeling, but the body later converts it back to glucose in the liver.

During exercise, the heart rate and breathing rate rise to supply more oxygen. A resting pulse of 70 beats per minute might go up to 130 after a minute of step-ups. This is an increase of (130 - 70)/70 times 100, which is 86 percent. After exercise stops, breathing stays fast for a while because the body is repaying the **oxygen debt**: replacing the oxygen stores, clearing lactate and restoring ATP and creatine phosphate. A person who trains regularly has a lower resting heart rate, because the heart has become stronger and pumps more blood with each beat.
`,
  ],
  cards: [
    ["Organ", "A structure made of two or more tissue types working together."],
    ["Organ system", "A group of organs that cooperate for a common function."],
    ["ATP", "The molecule that supplies energy for muscle contraction."],
    ["Creatine phosphate", "A store that quickly regenerates ATP in the first seconds of exercise."],
    ["Aerobic respiration", "Making ATP from glucose using oxygen; about 30 ATP per glucose."],
    ["Glycolysis", "The first stage of glucose breakdown, giving 2 ATP and lactate without oxygen."],
    ["Lactate", "A product of glycolysis when oxygen is limited."],
    ["Oxygen debt", "The extra oxygen needed after exercise to restore the body's resting state."],
  ],
  closed: [
    [
      "Which tissue lines the inside of the stomach and secretes mucus?",
      ["Muscle tissue", "Epithelial tissue", "Nervous tissue", "Bone"],
      "B",
    ],
    [
      "Which energy source in a muscle is used first in a sprint?",
      ["Aerobic respiration", "Stored ATP and creatine phosphate", "Fat stores", "Protein"],
      "B",
    ],
    [
      "A resting pulse of 70 rises to 130 after exercise. What is the percent increase?",
      ["46%", "60%", "86%", "186%"],
      "C",
    ],
    [
      "About how much ATP does one glucose give by glycolysis alone?",
      ["2", "10", "30", "100"],
      "A",
    ],
    [
      "Why does breathing stay fast after a sprint ends?",
      ["The lungs are damaged", "The body repays the oxygen debt", "The heart stops pumping", "Muscles stop using oxygen"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student's resting pulse is 72 beats per minute and rises to 132 after one minute of step-ups. Calculate the percent increase and explain why the heart rate rises during exercise.",
      scheme: [
        "Calculates the increase as 60 beats per minute",
        "Calculates the percent increase as about 83 percent",
        "Explains that muscles need more oxygen and glucose",
        "Explains that a faster heart rate delivers more blood, and so more oxygen, to the muscles and removes carbon dioxide faster",
      ],
      model:
        "The increase is 132 minus 72, which is 60 beats per minute. The percent increase is 60 divided by 72, times 100, which is about 83 percent. During exercise the muscles use more ATP, so they need more oxygen and glucose. A faster heart rate delivers more blood, and so more oxygen, to the muscles and carries carbon dioxide away faster.",
      answers: [
        [
          "full",
          "[[0|The increase is 132 − 72 = 60 beats per minute.]] [[1|60/72 × 100 = about 83%.]] [[2|The muscles are using more ATP so they need more oxygen and glucose.]] [[3|A faster pulse moves more blood to the muscles, delivering oxygen and taking away carbon dioxide.]]",
          "Full marks. You divided by the resting pulse, which is the correct baseline.",
        ],
        [
          "full",
          "[[0|132 − 72 = 60 bpm more.]] [[1|(60 ÷ 72) × 100 ≈ 83% increase.]] [[2|Working muscles demand more oxygen to make ATP by aerobic respiration.]] [[3|The heart pumps faster to carry oxygenated blood to the muscles and clear the carbon dioxide.]]",
          "All four marks, with the process explained.",
        ],
        [
          "partial",
          "[[0|The pulse went up by 60.]] 60/132 × 100 = 45%. [[2|The muscles need more oxygen.]]",
          "Percent change uses the starting value, the resting pulse of 72, not the final one. That gives 83 percent.",
        ],
        [
          "partial",
          "[[1|It is an 83% increase.]] [[3|A faster heart delivers more blood.]]",
          "Good. Show the subtraction, and say why the muscles need that extra blood.",
          true,
        ],
        [
          "weak",
          "132 + 72 = 204, so the pulse went up 204%. The heart goes faster because it is excited.",
          "To find the change, subtract the two pulses. The heart rate rises to meet the muscles' demand for oxygen.",
        ],
        [
          "weak",
          "[[0|The increase is 60.]] The heart rises because the body is hot and the heart tries to get rid of the heat.",
          "Heat loss involves the skin. The heart rate rises mainly to deliver oxygen and glucose to the working muscles.",
        ],
      ],
    },
    {
      prompt:
        "Compare how a muscle cell makes ATP during a 100 meter sprint and during a 5 kilometer jog. Mention the energy source, the role of oxygen and the amount of ATP made.",
      scheme: [
        "States that a sprint uses stored ATP and creatine phosphate first",
        "States that sprint glycolysis makes only 2 ATP per glucose and produces lactate",
        "States that the jog uses aerobic respiration with oxygen",
        "States that aerobic respiration gives about 30 ATP per glucose, so it can last longer",
      ],
      model:
        "In a sprint the muscle first uses stored ATP and creatine phosphate, then glycolysis, which makes only 2 ATP per glucose and produces lactate because oxygen is limited. In a jog, oxygen reaches the muscle fast enough for aerobic respiration, which makes about 30 ATP per glucose and can supply energy for much longer.",
      answers: [
        [
          "full",
          "[[0|In a sprint, the muscle uses stored ATP and creatine phosphate first.]] [[1|Then glycolysis gives only 2 ATP per glucose and makes lactate, since oxygen can't keep up.]] [[2|In a jog there's enough oxygen so the cells use aerobic respiration.]] [[3|That makes about 30 ATP per glucose, so it can last a long time.]]",
          "Full marks. The contrast between oxygen-limited and oxygen-rich conditions is clear.",
        ],
        [
          "full",
          "[[0|The first seconds of the sprint come from ATP already in the muscle and creatine phosphate.]] [[1|After that, anaerobic glycolysis makes just 2 ATP per glucose with lactate as a by-product.]] [[2|Jogging is aerobic: glucose is broken down using oxygen.]] [[3|About 30 ATP per glucose means a steady supply for a long time.]]",
          "All four marks, with accurate detail.",
        ],
        [
          "partial",
          "[[0|A sprint uses ATP and creatine phosphate.]] [[2|A jog uses aerobic respiration with oxygen.]]",
          "Add the glycolysis stage of the sprint and compare the amount of ATP made in each case.",
        ],
        [
          "partial",
          "[[1|The sprint makes 2 ATP per glucose and lactate.]] [[3|The jog makes 30 ATP.]] The sprint doesn't use oxygen at all because the muscle is too busy.",
          "Muscles still use oxygen in a sprint, but they cannot get enough, so glycolysis makes up the rest. Name the energy source for the jog.",
          true,
        ],
        [
          "weak",
          "A sprint uses fat and a jog uses protein, because the body saves sugar for later.",
          "Both mainly use glucose. The difference is whether oxygen is available for aerobic respiration.",
        ],
        [
          "weak",
          "[[3|A jog makes 30 ATP per glucose.]] Both use the same method, but a jog takes more time.",
          "The methods are different: sprint glycolysis without enough oxygen, and aerobic respiration for the jog.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Biological molecules, the cell and the four tissue types",
  note: `
## Objectives

Students will be able to:

1. describe the biological molecules of the body and the structure and function of the cell and its organelles;
2. identify the four tissue types and match each to its structure and function.

## Materials

Compound microscopes, prepared slides of epithelial, connective, muscle and nervous tissue, colored pencils, cheek-cell sample kit, iodine stain, the practical sheet.

## Starter (6 minutes)

Hold up a food label. Ask: "Which of these ingredients become part of your own cells, and which are fuel?" Sort carbohydrates, lipids, proteins and nucleic acids on the board.

## Main activity

1. Review the four classes of molecules with examples from the body: glucose and glycogen, phospholipids and cholesterol, hemoglobin and enzymes, DNA and RNA.
2. Tour the cell: membrane, nucleus, ribosomes, rough ER, Golgi, mitochondria, lysosomes. Students draw and annotate a cell.
3. Practical: view four prepared tissue slides at 100x and 400x, sketch each, and write a one-line structure-function statement. Stain and view a cheek cell.

## Checking for understanding

Ask: "Why do muscle cells contain a lot of mitochondria?" Look for the ATP idea.

## Worksheet and practical write-up

A tissue comparison table and the observation sketches with captions.
`,
  reading: [
    "The cell and its four kinds of tissue",
    `
Four classes of large molecules make up the body. **Carbohydrates**, such as glucose and glycogen, provide quick energy. **Lipids**, such as fats, phospholipids and cholesterol, store energy and form membranes. **Proteins**, chains of amino acids, include enzymes, antibodies, hemoglobin and structural fibers such as collagen. **Nucleic acids**, DNA and RNA, carry the instructions for building proteins.

The cell is the basic unit of life. The **plasma membrane** is a phospholipid bilayer with embedded proteins that controls what enters and leaves. The **nucleus** holds the DNA. **Ribosomes** build proteins; those on the rough endoplasmic reticulum make proteins for export, and the Golgi apparatus modifies and packages them. **Mitochondria** make most of the cell's ATP, so cells with high energy demands, such as muscle and liver cells, have many. **Lysosomes** contain enzymes that digest worn-out parts and ingested material.

Cells with similar structure and function form **tissues**, and there are four primary types.

**Epithelial tissue** covers body surfaces and lines cavities and organs. Its cells are tightly packed with little space between them, and it is classified by the shape of the cells (squamous, cuboidal, columnar) and by the number of layers. Epithelium protects, absorbs, secretes and filters. Skin is covered by many layers of squamous epithelium, while the small intestine is lined by a single layer of columnar cells that absorb nutrients.

**Connective tissue** supports and connects. Its cells are scattered in an extracellular matrix. Bone has a hard mineral matrix, cartilage has a firm flexible matrix, blood has a liquid matrix, and adipose tissue stores fat. Tendons are dense connective tissue made of strong collagen fibers.

**Muscle tissue** contracts. Skeletal muscle is striated and voluntary. Cardiac muscle is striated, involuntary and branched, and found only in the heart. Smooth muscle is nonstriated and involuntary, and found in the walls of organs such as the stomach and blood vessels.

**Nervous tissue** carries electrical signals. Neurons have a cell body and long extensions, while supporting cells called neuroglia protect and nourish them.

When you look at a slide, ask what the arrangement of the cells suggests about the job. Tightly packed cells in a sheet suggest covering, scattered cells in a matrix suggest support, long parallel fibers suggest contraction and branching cells with long extensions suggest signaling.
`,
  ],
  cards: [
    ["Plasma membrane", "A phospholipid bilayer that controls what enters and leaves the cell."],
    ["Mitochondria", "Organelles that make most of the cell's ATP."],
    ["Ribosome", "A structure that builds proteins."],
    ["Epithelial tissue", "Tissue that covers surfaces and lines cavities."],
    ["Connective tissue", "Tissue that supports and connects, with cells in a matrix."],
    ["Muscle tissue", "Tissue specialized to contract."],
    ["Nervous tissue", "Tissue that carries electrical signals."],
    ["Extracellular matrix", "The material between connective tissue cells."],
  ],
  closed: [
    [
      "Which organelle makes most of a cell's ATP?",
      ["Nucleus", "Ribosome", "Mitochondrion", "Lysosome"],
      "C",
    ],
    [
      "Which tissue has cells scattered in a large extracellular matrix?",
      ["Epithelial", "Connective", "Muscle", "Nervous"],
      "B",
    ],
    [
      "Cardiac muscle is:",
      ["Striated and voluntary", "Striated, branched and involuntary", "Nonstriated and voluntary", "Nonstriated and found in the stomach"],
      "B",
    ],
    [
      "The lining of the small intestine is a single layer of columnar cells that absorb nutrients. This is:",
      ["Connective tissue", "Epithelial tissue", "Nervous tissue", "Smooth muscle"],
      "B",
    ],
    [
      "Which molecule class includes enzymes and hemoglobin?",
      ["Carbohydrates", "Lipids", "Proteins", "Nucleic acids"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Compare skeletal, cardiac and smooth muscle in terms of appearance, control and location.",
      scheme: [
        "States that skeletal muscle is striated and voluntary and attached to bones",
        "States that cardiac muscle is striated, branched and involuntary and found in the heart",
        "States that smooth muscle is nonstriated and involuntary and found in organ walls and blood vessels",
        "Relates one structure to its function, such as cardiac muscle's branching helping it contract as a unit",
      ],
      model:
        "Skeletal muscle is striated and voluntary, and attached to bones. Cardiac muscle is striated, branched and involuntary, and found only in the heart. Smooth muscle is nonstriated and involuntary, and found in the walls of the stomach, intestines and blood vessels. The branching of cardiac cells lets a signal spread so the heart contracts as a unit.",
      answers: [
        [
          "full",
          "[[0|Skeletal muscle has stripes and I can control it, and it is attached to the bones.]] [[1|Cardiac muscle is striped but branched, involuntary, and only in the heart.]] [[2|Smooth muscle has no stripes, is involuntary, and is in the walls of the stomach and blood vessels.]] [[3|The branching of cardiac cells lets the signal spread quickly so the whole heart beats together.]]",
          "Full marks. You linked a structure to a function at the end.",
        ],
        [
          "full",
          "[[0|Skeletal: striated, voluntary, moves the bones.]] [[1|Cardiac: striated, branched, involuntary, found in the heart wall.]] [[2|Smooth: nonstriated, involuntary, lines the digestive tract and vessels.]] [[3|Cardiac cells are joined at discs so electrical signals pass quickly and the heart contracts together.]]",
          "All four marks, with a good table-style answer.",
        ],
        [
          "partial",
          "[[0|Skeletal muscle is striated and voluntary.]] [[2|Smooth muscle is not striated and is involuntary.]] Cardiac muscle is smooth and voluntary.",
          "Cardiac muscle is striated and involuntary, and found only in the heart.",
        ],
        [
          "partial",
          "[[1|Cardiac muscle is in the heart and involuntary.]] [[3|Its branching helps the heart beat together.]]",
          "Add the appearance of each muscle type and the location of the skeletal and smooth muscle.",
          true,
        ],
        [
          "weak",
          "All three are the same, they just move different parts of the body.",
          "They differ in structure and control. Compare the stripes, the branching and whether you can control them.",
        ],
        [
          "weak",
          "[[0|Skeletal muscle is attached to bones.]] The heart is made of skeletal muscle because it works all the time.",
          "The heart is made of cardiac muscle, a different type that is striated but involuntary.",
        ],
      ],
    },
    {
      prompt:
        "Match each of the four tissue types to one body location and explain how its structure suits its function.",
      scheme: [
        "Epithelial tissue with a location and a structure-function link, such as tightly packed cells forming a barrier",
        "Connective tissue with a location and a link, such as bone's hard matrix for support",
        "Muscle tissue with a location and a link, such as long fibers that shorten",
        "Nervous tissue with a location and a link, such as long extensions of neurons to carry signals",
      ],
      model:
        "Epithelial tissue forms the epidermis of the skin; its tightly packed cells make a barrier. Connective tissue forms bone, whose hard mineral matrix supports the body. Muscle tissue forms the biceps, whose long fibers shorten to produce movement. Nervous tissue forms the brain and nerves; neurons have long extensions that carry signals over a distance.",
      answers: [
        [
          "full",
          "[[0|Epithelial tissue covers the skin, and its cells are packed tightly together, so it makes a barrier.]] [[1|Connective tissue makes up bone, and the hard matrix gives support.]] [[2|Muscle tissue is in the biceps, and its long fibers can shorten.]] [[3|Nervous tissue is in the brain and nerves, and neurons have long branches that carry signals.]]",
          "Full marks. Each tissue has a location and a reason.",
        ],
        [
          "full",
          "[[0|Epithelium lines the small intestine in a single layer, which makes it easy for nutrients to be absorbed.]] [[1|Cartilage is connective tissue in the nose, flexible because of its matrix.]] [[2|Cardiac muscle in the heart has branched cells which pass signals fast.]] [[3|The spinal cord is nervous tissue, made of neurons with long axons.]]",
          "All four marks, using a different example for each.",
        ],
        [
          "partial",
          "[[0|Epithelial tissue is on the skin and is a barrier.]] [[2|Muscle tissue is in the arm and contracts.]]",
          "Add the two other tissue types, each with a location and a structure-function link.",
        ],
        [
          "partial",
          "[[1|Bone is connective tissue with a hard matrix.]] [[3|The brain is nervous tissue.]] Nerve cells are round so they can bounce signals.",
          "Neurons have long extensions, which carry the signals. Add epithelial and muscle examples too.",
          true,
        ],
        [
          "weak",
          "Skin is muscle tissue, bone is nervous tissue, the brain is epithelial and the heart is connective.",
          "Check each location against the tissue's job: skin is covered by epithelium, bone is connective, the brain is nervous.",
        ],
        [
          "weak",
          "[[2|Muscle is in the arm.]] The tissues are all made of cells so they are the same.",
          "The tissues differ in the arrangement and shape of their cells. Link each shape to its job.",
        ],
      ],
    },
  ],
  practical: {
    title: "Four tissue types under the microscope",
    instructions:
      "View prepared slides of epithelial, connective, muscle and nervous tissue at 100x and 400x. For each, draw a labeled sketch of what you see, record the magnification, and write a one-sentence statement linking the cell arrangement to the tissue's function. Then stain and view cheek cells.",
    steps: [
      ["Collect a microscope and the four labeled slides. Start with the lowest power objective."],
      ["Focus on the epithelial slide, sketch the arrangement of the cells, and label cell shape and layers."],
      ["Repeat for the connective, muscle and nervous slides, using the fine focus on higher power.", "Carry the microscope with two hands and never use the coarse focus on high power."],
      ["Prepare a cheek-cell slide with iodine stain and note the nucleus and the membrane."],
      ["Write a structure-function statement for each tissue."],
      ["Complete a comparison table of the four tissue types."],
    ],
    rubric: [
      ["Observation: accurate labeled sketches with magnification", 4],
      ["Interpretation: structure-function statements for each tissue", 4],
      ["Technique and table: correct use of the microscope and a complete comparison", 4],
    ],
    writeUps: [
      [
        "full",
        "At 400x the epithelial slide showed a single layer of tall columnar cells packed tightly with nuclei at the base, which suits absorption and secretion. The connective slide, bone, had cells in small spaces within a hard layered matrix, which suits support. The muscle slide showed long striped fibers, which shorten to contract. The nerve slide had star-shaped cell bodies with long thin branches, which carry signals. My cheek cell showed a pale nucleus stained brown by the iodine and a thin membrane.",
        [4, 4, 4],
        "An excellent report: accurate observations with magnification and a function for every structure.",
      ],
      [
        "full",
        "Epithelial tissue (100x): cells packed in a sheet with almost no space between them, forming a barrier. Connective tissue (cartilage, 400x): round cells in lacunae inside a firm clear matrix, which gives flexible support. Muscle tissue (skeletal, 400x): long parallel striated fibers with several nuclei each, which can shorten. Nervous tissue (100x): large cell bodies with long processes, which carry signals. I stored the microscope with the lowest objective in place. The comparison table is attached.",
        [4, 3, 4],
        "Very good. The sketches should be on the page with titles and the magnification; this is how a record is checked.",
      ],
      [
        "partial",
        "I looked at the four slides and drew them. The epithelial cells were close together and flat. The connective slide had cells far apart. The muscle one had stripes and the nerve one had long lines. I wrote the tissue names on each drawing but I do not remember the magnification I used for them so I left it out.",
        [2, 2, 2],
        "Record the magnification for every sketch and link each structure to a function. Describe what the arrangement tells you.",
      ],
      [
        "partial",
        "The epithelial tissue has tightly packed cells so it is a barrier. The connective tissue has a matrix so it supports the body. The muscle tissue is striped so it contracts, and the nervous tissue has long extensions so it sends signals. I did not do the cheek cell because my group ran out of iodine and the table was not finished.",
        [1, 4, 2],
        "Your statements are excellent. Add the sketches with labels and magnification and complete the table and the cheek-cell slide.",
      ],
      [
        "weak",
        "I looked at the slides. They were purple and pink. Some had dots and some had lines. The microscope was hard to focus but I got it in the end. The cheek cell looked like a little round bubble with a dot in the middle of it and it was very small.",
        [1, 0, 0],
        "Name each tissue and describe the arrangement of its cells. Say what that arrangement tells you about its function.",
      ],
      [
        "weak",
        "All the tissues look the same under the microscope because they are all made of cells. The only difference is the color. I think the muscle is the pink one and the nerve is purple because nerves are blue in the body, so that means they have more dye in them.",
        [1, 0, 0],
        "The tissues differ in the shape and arrangement of cells. Color comes from the stain and does not tell you the tissue's function.",
      ],
    ],
  },
};

const w4: WeekInput = {
  topic: "The skin: layers, roles, healing and burns",
  note: `
## Objectives

Students will be able to:

1. describe the layers of the skin and its roles in protection, temperature control and sensation;
2. explain how the skin heals after a cut or a burn and how burns are classified.

## Materials

Skin model or layered diagram, a magnifier, ink pad, white paper, a thermometer, ice water and room-temperature water, the practical sheet.

## Starter (6 minutes)

Ask: "What is the largest organ in your body, and what does it do for you every day?" Gather answers: protects, keeps water in, senses touch, controls temperature, makes vitamin D.

## Main activity

1. Label the epidermis (with the stratum corneum, melanocytes and keratinocytes), the dermis (with collagen, blood vessels, glands, hair follicles and receptors) and the hypodermis.
2. Explain the roles: barrier, temperature control through sweating and blood vessel changes, touch and pain receptors, and vitamin D synthesis.
3. Healing and burns: the steps of wound healing, and the classification of first-, second- and third-degree burns.
4. Practical: take fingerprints, compare touch sensitivity at two-point discrimination on fingertip and forearm, and test the skin's temperature response.

## Checking for understanding

Ask: "Why does a second-degree burn blister but a first-degree burn doesn't?"

## Practical write-up and worksheet

A data table from two-point discrimination and the interpretation of the results.
`,
  reading: [
    "The skin as an organ",
    `
The skin, the **integumentary system**, is the largest organ of the body. In an adult it covers about 1.7 square meters and weighs around 4 kg. It has three layers.

The **epidermis** is the outer layer, a stratified squamous epithelium without blood vessels. Its surface layer, the stratum corneum, is made of dead cells filled with keratin, a tough waterproof protein. New cells form in the deepest layer, move upward over about a month and flake off. Melanocytes in the epidermis make the pigment melanin, which absorbs ultraviolet light and protects DNA. The **dermis** below is much thicker connective tissue. It contains collagen and elastic fibers that give strength and stretch, blood vessels, nerve endings, sweat glands, oil glands and hair follicles. The **hypodermis**, or subcutaneous layer, is made of adipose and loose connective tissue that insulates and cushions.

The skin has several roles. It forms a **barrier** against microbes, water loss and chemicals. It helps with **temperature control**. When you are hot, dermal blood vessels widen to carry heat to the surface, and sweat glands release sweat which cools by evaporation. When you are cold, the vessels narrow to conserve heat. The skin holds **sensory receptors** for touch, pressure, pain and temperature. It also makes **vitamin D** when exposed to sunlight.

When skin is cut, the body heals it in steps. First, bleeding stops as a clot forms. Within hours, inflammation brings white blood cells to destroy bacteria. Fibroblasts then form new collagen to fill the wound and new blood vessels grow, producing granulation tissue. Finally, epidermal cells move over the surface, and the scar tissue is remodeled over months. A deep wound can leave a scar made of dense collagen that does not have hair follicles or glands.

Burns are classified by depth. A **first-degree burn** damages only the epidermis, causing redness and pain but no blister, like a mild sunburn. A **second-degree burn** damages the epidermis and part of the dermis, causing blisters and severe pain. A **third-degree burn** destroys the full thickness of the skin, and may be white or charred and painless, because the nerve endings are destroyed. Third-degree burns need skin grafts. The danger of a large burn is loss of fluid and infection, so the extent of the burn matters as well as the depth.
`,
  ],
  cards: [
    ["Epidermis", "The outer layer of skin, a stratified squamous epithelium without blood vessels."],
    ["Dermis", "The thick connective tissue layer with blood vessels, nerves and glands."],
    ["Hypodermis", "The fatty layer below the dermis that insulates and cushions."],
    ["Keratin", "A tough protein that waterproofs the surface of the skin."],
    ["Melanin", "A pigment that protects skin from ultraviolet light."],
    ["First-degree burn", "A burn that damages only the epidermis."],
    ["Second-degree burn", "A burn that damages the epidermis and part of the dermis, with blisters."],
    ["Third-degree burn", "A burn that destroys the full thickness of the skin."],
  ],
  closed: [
    [
      "Which layer of skin contains blood vessels, sweat glands and nerve endings?",
      ["Epidermis", "Dermis", "Stratum corneum", "Melanin layer"],
      "B",
    ],
    [
      "A burn that causes blisters and damages part of the dermis is:",
      ["First-degree", "Second-degree", "Third-degree", "A rash"],
      "B",
    ],
    [
      "When you are hot, which response helps lose heat?",
      ["Narrowing of dermal blood vessels", "Widening of dermal blood vessels", "Goosebumps", "Shivering"],
      "B",
    ],
    [
      "Which protein makes the surface of the epidermis waterproof?",
      ["Collagen", "Keratin", "Melanin", "Hemoglobin"],
      "B",
    ],
    [
      "Why can a third-degree burn be painless?",
      [
        "The burn is too shallow",
        "Nerve endings in the skin have been destroyed",
        "The blood vessels are widened",
        "The epidermis has regrown",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student burns the back of their hand on a hot pan. The area is red, swollen and has a blister, and it is very painful. Classify the burn, name the layers damaged, and explain why it blisters.",
      scheme: [
        "Classifies the burn as second-degree",
        "States that the epidermis and part of the dermis are damaged",
        "Explains that fluid leaks from damaged blood vessels in the dermis",
        "Explains that the fluid collects under the epidermis, forming a blister that protects the tissue underneath",
      ],
      model:
        "This is a second-degree burn. The epidermis and part of the dermis are damaged. Fluid leaks from the damaged blood vessels in the dermis and collects under the epidermis, raising it as a blister, which protects the tissue underneath while it heals.",
      answers: [
        [
          "full",
          "[[0|It is a second-degree burn.]] [[1|It damaged the epidermis and part of the dermis.]] [[2|The damaged blood vessels in the dermis leak fluid.]] [[3|The fluid gets trapped under the epidermis, which lifts up as a blister and protects the healing skin.]]",
          "Full marks. Pain tells you that nerve endings in the dermis are still working.",
        ],
        [
          "full",
          "[[0|Second-degree burn, because of the blister.]] [[1|The burn goes through the epidermis into the dermis.]] [[2|Tissue fluid leaks out of the injured capillaries.]] [[3|It collects under the top layer, forming a protective blister.]]",
          "All four marks, with a reason for the classification.",
        ],
        [
          "partial",
          "[[0|It is a second-degree burn]] [[1|because it damages the dermis]].",
          "Good. Explain what causes the blister and what it does.",
        ],
        [
          "partial",
          "[[2|Fluid leaks from the blood vessels]] and [[3|makes the blister]]. It's a first-degree burn.",
          "A blister means the dermis is damaged, which makes it second-degree. A first-degree burn affects only the epidermis.",
          true,
        ],
        [
          "weak",
          "It is a third-degree burn because it hurts so much, and the blister is where the bone shows.",
          "A third-degree burn is often painless and destroys the whole thickness of the skin. A blister means the dermis was only partly damaged.",
        ],
        [
          "weak",
          "[[2|Fluid leaks out.]] The blister is full of pus because of bacteria that got in right away.",
          "The fluid in a new blister is clear tissue fluid from leaking blood vessels. Pus appears only with infection.",
        ],
      ],
    },
    {
      prompt:
        "Describe how the skin helps the body lose heat during exercise and how it conserves heat in the cold. Name the structures involved in each case.",
      scheme: [
        "States that when hot, dermal blood vessels widen so more blood carries heat to the surface",
        "States that sweat glands release sweat, which cools by evaporation",
        "States that when cold, dermal blood vessels narrow, reducing blood flow near the surface",
        "States that the hypodermis, or erector pili muscles and hair, insulate and help retain heat",
      ],
      model:
        "When hot, the blood vessels in the dermis widen so that more blood flows near the surface and loses heat. Sweat glands release sweat, which cools the body as it evaporates. When cold, the dermal vessels narrow to reduce heat loss, and the fat of the hypodermis insulates the body.",
      answers: [
        [
          "full",
          "[[0|When hot, the blood vessels in the dermis widen so more warm blood is near the surface.]] [[1|The sweat glands release sweat, which takes heat away as it evaporates.]] [[2|When cold, the vessels narrow so less blood goes to the surface.]] [[3|The fat layer under the dermis insulates the body and keeps the heat in.]]",
          "Full marks. Each of the two environments is covered with named structures.",
        ],
        [
          "full",
          "[[0|Heat: vasodilation of dermal arterioles lets heat radiate from the skin.]] [[1|Eccrine sweat glands secrete sweat that cools by evaporation.]] [[2|Cold: vasoconstriction reduces the blood flow to the skin.]] [[3|The hypodermis, a layer of fat, acts as insulation.]]",
          "All four marks, using precise terms.",
        ],
        [
          "partial",
          "[[0|The blood vessels get bigger when hot.]] [[1|Sweat glands make sweat.]]",
          "Good for the heat response. Describe what happens in the cold and name a structure that insulates.",
        ],
        [
          "partial",
          "[[2|In the cold the blood vessels narrow.]] [[1|The sweat glands make you shiver.]]",
          "Shivering is done by skeletal muscles, not the sweat glands. The sweat glands release sweat when hot.",
          true,
        ],
        [
          "weak",
          "When hot the skin makes more melanin to block the heat, and when cold it makes keratin to keep warm.",
          "Melanin protects against ultraviolet light and keratin waterproofs. Temperature control uses blood vessels and sweat glands.",
        ],
        [
          "weak",
          "[[3|The fat insulates you.]] The blood vessels never change because they are always the same size.",
          "The blood vessels do change in diameter in response to temperature. They widen to lose heat and narrow to conserve it.",
        ],
      ],
    },
  ],
  practical: {
    title: "Touch sensitivity and the skin's receptors",
    instructions:
      "Use two-point discrimination to map the density of touch receptors. With a blindfolded partner, touch two points a set distance apart on the fingertip, palm, forearm and back of the neck. Find the smallest distance at which the partner reports two points, and compare the regions. Then take a fingerprint and classify the pattern.",
    steps: [
      ["Prepare a ruler with two blunt toothpicks spaced at 2, 5, 10, 20 and 40 mm."],
      ["Have your partner close their eyes. Touch the fingertip with one or two points in random order."],
      ["Record whether the partner reports one or two points at each spacing.", "Touch gently; the skin should not be pressed hard or broken."],
      ["Repeat on the palm, forearm and back of the neck."],
      ["Record the smallest distance for which the partner says two points for each region."],
      ["Take a fingerprint and classify it as a loop, whorl or arch."],
    ],
    rubric: [
      ["Method: random order, same pressure, same spacing for each region", 4],
      ["Results: table of smallest distance for each region", 4],
      ["Interpretation: links receptor density to function and body region", 4],
    ],
    writeUps: [
      [
        "full",
        "The smallest distance at which my partner felt two points was 2 mm on the fingertip, 8 mm on the palm, 35 mm on the forearm and 40 mm on the back of the neck. I randomized one and two point touches to avoid guessing. The fingertip is the most sensitive because it has the highest density of touch receptors in the dermis, which allows us to feel fine detail when reading and handling objects. The forearm and the neck have fewer receptors, which suits their protective, less precise role. My fingerprint was a loop pattern.",
        [4, 4, 4],
        "An excellent report: controlled method, a complete table, and an interpretation based on receptor density and function.",
      ],
      [
        "full",
        "We used spacings of 2, 5, 10, 20 and 40 mm and mixed in one-point touches. Results: fingertip 2 mm, palm 10 mm, forearm 40 mm, neck 40 mm. The smaller the distance, the denser the receptors. The fingertip is used for fine touch, so it has more receptors in the dermis. Possible error: our pressure may not have been the same each time, and my partner may have guessed. The fingerprint was a whorl, which was one of the three types we were taught.",
        [4, 3, 4],
        "Very good. The method should say how you kept the pressure constant, because that is a control for fairness.",
      ],
      [
        "partial",
        "The fingertip was the most sensitive and the forearm was the least sensitive. My partner could feel two points about 2 mm apart on the fingertip. The other places needed more distance. I think this is because the fingertips have more nerves. I did not take a fingerprint, and I did not write down the distances for the palm and neck.",
        [2, 2, 2],
        "Complete the table for all four regions. Name the receptors in the dermis and explain why different regions have different densities.",
      ],
      [
        "partial",
        "Results: fingertip 2 mm, palm 8 mm, forearm 35 mm, neck 40 mm. We tested the regions in order from fingertip to neck without any one-point touches. My conclusion is that the fingertip is the most sensitive because it is at the end of the arm, and the neck is least sensitive because it is far from the hand.",
        [2, 4, 1],
        "The data is good. Sensitivity depends on how many receptors are in the skin, not how far the region is from the hand. Use random one- and two-point touches next time.",
      ],
      [
        "weak",
        "We touched my partner with toothpicks and they said how many points they felt. It tickled a bit. The fingertip was good and the arm was not good. Everyone in our class had different results, so the experiment doesn't prove anything about the skin.",
        [1, 0, 0],
        "Record the smallest spacing for each region. Differences between people are natural, but the pattern among regions is the result to explain.",
      ],
      [
        "weak",
        "The skin on the fingertip has more melanin than the skin on the forearm, and that is why it can feel two points so close together. Melanin is the part of the skin that detects touch. We did not write down the actual distances but the fingertip was best.",
        [1, 0, 0],
        "Melanin gives color and protects against ultraviolet light. Touch is detected by sensory receptors in the dermis. Record the distances.",
      ],
    ],
  },
};

const w5: WeekInput = {
  topic: "The skeleton, joints and the three kinds of muscle",
  note: `
## Objectives

Students will be able to:

1. name the major bones, classify them by shape, and explain how bones grow, repair and support the body;
2. compare fibrous, cartilaginous and synovial joints;
3. compare skeletal, cardiac and smooth muscle by structure, control and location.

## Materials

An articulated skeleton, bone models, long bone cross section, joint model, the worksheet and quiz.

## Starter (6 minutes)

Ask: "How many bones do you have? Why do babies have more than adults?" Take guesses and tell them 206 for adults and about 300 for newborns, which fuse as they grow.

## Main activity

1. Label the axial skeleton (skull, vertebral column, rib cage) and appendicular skeleton (limbs, pectoral and pelvic girdles). Sort bones by shape: long (femur), short (carpals), flat (sternum), irregular (vertebrae).
2. Bone growth and repair: ossification of cartilage, growth plates, osteoblasts and osteoclasts, and the four stages of fracture repair.
3. Joints: fibrous (skull sutures), cartilaginous (intervertebral discs) and synovial (knee, shoulder). Students move their joints and describe the range of motion.
4. Revisit the three muscle types from the previous week with a focus on how skeletal muscle attaches to the skeleton.

## Checking for understanding

Ask: "Why does a synovial joint have the greatest range of motion?"

## Worksheet and quiz

Bone classification, joint comparison and a short quiz.
`,
  reading: [
    "Bones, joints and the muscles that move them",
    `
An adult skeleton has 206 bones, divided into the **axial skeleton**, which consists of the skull, the vertebral column and the rib cage, and the **appendicular skeleton**, which includes the bones of the limbs and the girdles that connect them to the axial skeleton. Bones are classified by shape. **Long bones**, such as the femur, are longer than wide. **Short bones**, such as the carpals of the wrist, are cube-like. **Flat bones**, such as the sternum and skull bones, protect organs and provide broad surfaces for muscles. **Irregular bones**, such as vertebrae, have complex shapes.

Bone is living tissue with a hard matrix of calcium phosphate and flexible collagen. The calcium gives it strength under compression and the collagen resists stretching. **Osteoblasts** build new bone, **osteocytes** maintain it and **osteoclasts** break it down. Bone is constantly remodeled, which lets it respond to stress: weight-bearing exercise makes it denser, while lack of use weakens it. In children, long bones grow at the **epiphyseal plates**, areas of cartilage that are gradually replaced by bone. When growth ends in the late teens, the plates close.

When a bone breaks, repair takes place in four stages. A hematoma forms from the bleeding. A soft callus of fibrocartilage bridges the break within a few weeks. A hard callus of new bone replaces it, and finally remodeling restores the shape. Setting the bones in a cast keeps the ends close together.

Bones meet at **joints**. In **fibrous joints**, such as the sutures of the skull, fibrous tissue holds the bones together and no movement is possible. In **cartilaginous joints**, such as the intervertebral discs, cartilage connects the bones and allows slight movement. In **synovial joints**, such as the knee, shoulder and hip, the bones are separated by a fluid-filled cavity and the ends are covered by smooth articular cartilage. Ligaments hold the bones together. These joints allow the most movement. Ball-and-socket joints, in the shoulder and hip, move in all directions; hinge joints, in the knee and elbow, move in one plane.

Muscle tissue moves the skeleton and the organs. **Skeletal muscle** is striated, voluntary and attached to bones by tendons. **Cardiac muscle** is striated and branched, involuntary and found in the heart. **Smooth muscle** has no stripes, is involuntary and lines the walls of the digestive tract, blood vessels and airways.
`,
  ],
  cards: [
    ["Axial skeleton", "The skull, vertebral column and rib cage."],
    ["Appendicular skeleton", "The limbs and the girdles that attach them."],
    ["Osteoblast", "A cell that builds new bone."],
    ["Osteoclast", "A cell that breaks down bone."],
    ["Epiphyseal plate", "A cartilage growth zone in a child's long bone."],
    ["Synovial joint", "A freely movable joint with a fluid-filled cavity."],
    ["Ligament", "A band of connective tissue that joins bone to bone."],
    ["Tendon", "A band of connective tissue that joins muscle to bone."],
  ],
  closed: [
    [
      "The femur is classified as a:",
      ["Short bone", "Flat bone", "Long bone", "Irregular bone"],
      "C",
    ],
    [
      "Which cell type breaks down bone?",
      ["Osteoblast", "Osteocyte", "Osteoclast", "Fibroblast"],
      "C",
    ],
    [
      "The sutures of the skull are:",
      ["Fibrous joints", "Cartilaginous joints", "Synovial joints", "Ball-and-socket joints"],
      "A",
    ],
    [
      "Which joint allows movement in all directions?",
      ["Hinge joint of the elbow", "Ball-and-socket joint of the shoulder", "Skull suture", "Intervertebral disc"],
      "B",
    ],
    [
      "A tendon connects:",
      ["Bone to bone", "Muscle to bone", "Muscle to muscle", "Cartilage to cartilage"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the four stages by which a broken bone heals, and explain why a cast is used.",
      scheme: [
        "States that a hematoma (blood clot) forms at the break",
        "States that a soft callus of fibrocartilage forms to bridge the gap",
        "States that a hard callus of new bone replaces it, and then the bone is remodeled",
        "Explains that a cast holds the ends in place so the bone heals in the correct position",
      ],
      model:
        "First a hematoma forms at the break. Next a soft callus of fibrocartilage bridges the gap. Then a hard callus of new bone replaces the cartilage, and finally the bone is remodeled back into its normal shape. A cast holds the broken ends together so that the bone heals in the right position.",
      answers: [
        [
          "full",
          "[[0|First a blood clot, a hematoma, forms at the break.]] [[1|Then a soft callus of fibrocartilage grows across the gap.]] [[2|It's replaced by a hard callus of new bone, and then the bone is remodeled to its normal shape.]] [[3|A cast holds the ends still and close together so the bone heals straight.]]",
          "Full marks. All four stages are in the right order and the cast is explained.",
        ],
        [
          "full",
          "[[0|Stage 1: a hematoma forms from the bleeding.]] [[1|Stage 2: fibrocartilage makes a soft callus.]] [[3|The cast keeps the broken ends aligned.]] [[2|Stage 3 and 4: the soft callus turns to a hard bony callus, and remodeling restores the shape.]]",
          "All four marks, and the cast's purpose is clear.",
        ],
        [
          "partial",
          "[[0|A blood clot forms.]] [[2|New bone replaces it and the bone is remodeled.]]",
          "Include the soft callus stage, and say why a cast is used.",
        ],
        [
          "partial",
          "[[1|A soft callus of cartilage forms.]] [[3|The cast keeps the bone in the right place.]] The bone heals right away in one day.",
          "Bone healing takes weeks to months. Add the hematoma and the hard callus stages.",
          true,
        ],
        [
          "weak",
          "The bone glues itself back together with calcium from milk. The cast is for keeping the bone warm.",
          "Bones heal through cells building callus and new bone. The cast keeps the ends aligned and still.",
        ],
        [
          "weak",
          "[[3|The cast holds the bone in place.]] The doctor puts the bone back together using screws and then there is nothing for the body to do.",
          "Even with screws, the body's cells do the healing, through the stages of hematoma, callus and remodeling.",
        ],
      ],
    },
    {
      prompt:
        "Compare a hinge joint such as the knee with a ball-and-socket joint such as the shoulder. Describe the range of movement of each and name the parts common to synovial joints.",
      scheme: [
        "States that a hinge joint moves in one plane, bending and straightening",
        "States that a ball-and-socket joint moves in all directions and can rotate",
        "Names two features of synovial joints, such as articular cartilage and synovial fluid",
        "Names ligaments or the joint capsule as the structure that stabilizes the joint",
      ],
      model:
        "A hinge joint such as the knee moves in one plane, bending and straightening. A ball-and-socket joint such as the shoulder moves in all directions and can rotate. Both are synovial joints, with articular cartilage covering the bone ends and synovial fluid in the cavity to reduce friction. Ligaments and the joint capsule stabilize them.",
      answers: [
        [
          "full",
          "[[0|The knee is a hinge that only bends and straightens.]] [[1|The shoulder is ball-and-socket so it moves all directions and rotates.]] [[2|Both have smooth articular cartilage and synovial fluid in a cavity.]] [[3|Ligaments around them hold the bones together.]]",
          "Full marks. Comparing movement and shared structures is exactly what the question asked.",
        ],
        [
          "full",
          "[[0|A hinge joint moves back and forth in one plane.]] [[1|A ball-and-socket joint gives a wide range including rotation.]] [[2|Synovial joints have cartilage on the bone ends and fluid that reduces friction.]] [[3|The joint capsule and ligaments stabilize them.]]",
          "All four marks, with a good use of the plane concept.",
        ],
        [
          "partial",
          "[[0|The knee bends and straightens.]] [[1|The shoulder moves all around.]]",
          "Name two features that all synovial joints share, and a structure that stabilizes them.",
        ],
        [
          "partial",
          "[[2|Both have synovial fluid and cartilage.]] [[1|The shoulder has the most movement.]] The knee moves in all directions too.",
          "The knee is a hinge joint and moves in one plane only. The shoulder has the greater range.",
          true,
        ],
        [
          "weak",
          "The knee and shoulder are the same because they are both joints and both have bones.",
          "The two joints differ in range of motion: one plane for the knee, all directions for the shoulder.",
        ],
        [
          "weak",
          "[[3|Ligaments hold the joints together.]] The knee is the ball-and-socket joint because it is in the leg.",
          "The shoulder and hip are the ball-and-socket joints. The knee is a hinge joint.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "How muscle contracts, and how muscles work as a team",
  note: `
## Objectives

Students will be able to:

1. explain how skeletal muscle contracts, using the sliding filament model;
2. name the major muscles of the body and describe the actions of prime movers, antagonists and synergists.

## Materials

Muscle charts, resistance bands, a model of a sarcomere (two combs and rubber bands), a handout of muscle actions, the quiz.

## Starter (6 minutes)

Ask students to flex their biceps and feel the triceps. Ask: "Which muscle is working, which is relaxing, and what happens when you straighten the arm?"

## Main activity

1. Layers of a muscle: muscle, fascicle, fiber, myofibril, sarcomere. Draw a sarcomere with thin actin and thick myosin filaments.
2. Sliding filament model: calcium is released, myosin heads bind actin, power stroke pulls the thin filaments inward, ATP releases and resets. The sarcomere shortens but the filaments do not.
3. Muscle actions: prime mover (agonist), antagonist, synergist, fixator. Demonstrate with the biceps and triceps and the quadriceps and hamstrings.
4. Name the major muscles on a chart: deltoid, pectoralis major, rectus abdominis, biceps brachii, quadriceps, gastrocnemius, trapezius, latissimus dorsi, gluteus maximus.

## Checking for understanding

Ask: "What happens in a muscle when ATP runs out after death?" Look for rigor mortis.

## Quiz and problem set

Five quiz questions and a short problem set.
`,
  reading: [
    "The sliding filament model and muscle teamwork",
    `
A skeletal muscle is built in layers. The whole muscle is wrapped in connective tissue and contains bundles called fascicles. Each fascicle is a group of muscle fibers, which are long cells with many nuclei. Each fiber contains hundreds of rod-like **myofibrils**, and each myofibril is a chain of repeating units called **sarcomeres**. The sarcomere is the functional unit of contraction. It contains two kinds of protein filament: thin filaments made mostly of **actin** and thick filaments of **myosin**. They overlap in a pattern that gives skeletal muscle its stripes.

The **sliding filament model** explains how the sarcomere shortens. A nerve impulse reaches the muscle fiber and triggers the release of calcium ions inside the cell. Calcium exposes binding sites on the actin. Myosin heads, already charged with energy from the breakdown of ATP, bind to the actin to form cross-bridges. The myosin head then pivots, the **power stroke**, and pulls the thin filament toward the center of the sarcomere. A new molecule of ATP binds to the head, releasing it from the actin, and the cycle repeats. The filaments themselves do not shorten. They slide past one another, so the sarcomere gets shorter, and all the sarcomeres in a fiber shorten together to produce a contraction. When the signal stops, calcium is pumped back and the muscle relaxes. After death, no ATP is available to release the myosin heads, so the muscles stay locked, which is **rigor mortis**.

Muscles rarely work alone. When you bend the elbow, the biceps brachii is the **prime mover**, or agonist, because it produces the movement. The triceps brachii is the **antagonist**, which opposes it and relaxes. When you straighten the arm, their roles are reversed. Other muscles, such as the brachialis, help the prime mover and are called **synergists**. **Fixators** hold a bone steady so the prime mover can act effectively.

You should know the main muscles by name. The deltoid raises the arm. The pectoralis major pulls the arm forward across the chest. The latissimus dorsi pulls the arm down and back. The trapezius moves the scapula and shoulders. The rectus abdominis flexes the trunk. The quadriceps on the front of the thigh extend the knee, and the hamstrings on the back flex it. The gluteus maximus extends the hip, and the gastrocnemius in the calf points the foot. Names often hint at location, shape, size or action, which makes them easier to remember.
`,
  ],
  cards: [
    ["Sarcomere", "The functional unit of contraction in a muscle, containing actin and myosin filaments."],
    ["Actin", "The protein of the thin filaments."],
    ["Myosin", "The protein of the thick filaments, with heads that bind actin."],
    ["Sliding filament model", "Contraction occurs when thin filaments slide past thick filaments, shortening the sarcomere."],
    ["Prime mover (agonist)", "The muscle mainly responsible for a movement."],
    ["Antagonist", "A muscle that opposes the action of the prime mover."],
    ["Synergist", "A muscle that helps the prime mover."],
    ["Rigor mortis", "Stiffening of muscles after death, when no ATP is available to release myosin."],
  ],
  closed: [
    [
      "In the sliding filament model, the sarcomere shortens because:",
      ["The filaments themselves get shorter", "The thin filaments slide toward the center over the thick filaments", "The myosin is destroyed", "The muscle fibers divide"],
      "B",
    ],
    [
      "What ion triggers the exposure of binding sites on actin?",
      ["Sodium", "Potassium", "Calcium", "Chloride"],
      "C",
    ],
    [
      "When you bend your elbow, the triceps is the:",
      ["Prime mover", "Antagonist", "Synergist", "Fixator"],
      "B",
    ],
    [
      "Why do muscles stay stiff after death?",
      ["Calcium is pumped out", "No ATP is available to release the myosin heads", "The actin disappears", "Blood clots in the muscle"],
      "B",
    ],
    [
      "Which muscles extend the knee?",
      ["Hamstrings", "Gastrocnemius", "Quadriceps", "Deltoid"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the sequence of events by which a nerve impulse leads to the shortening of a sarcomere, using the terms calcium, cross-bridge, power stroke and ATP.",
      scheme: [
        "States that a nerve impulse causes calcium release inside the muscle fiber",
        "States that calcium exposes binding sites on actin so myosin heads form cross-bridges",
        "States that the myosin heads pivot in a power stroke, pulling the thin filaments toward the center",
        "States that ATP binds to the myosin head to release it from actin, resetting the cycle",
      ],
      model:
        "A nerve impulse triggers the release of calcium in the muscle fiber. Calcium exposes binding sites on actin, so myosin heads attach to form cross-bridges. The heads pivot in a power stroke and pull the thin filaments toward the center of the sarcomere. ATP then binds the myosin head, releasing it from the actin so that the cycle can repeat, and the sarcomere shortens.",
      answers: [
        [
          "full",
          "[[0|A nerve impulse makes calcium ions flood into the muscle fiber.]] [[1|The calcium uncovers binding sites on actin, so myosin heads attach and form cross-bridges.]] [[2|The heads pivot, which is the power stroke, and pull the thin filaments toward the middle.]] [[3|ATP binds to the head and lets it go from the actin so it can reach out again.]]",
          "Full marks. Each of the four terms is used in its right place in the sequence.",
        ],
        [
          "full",
          "[[0|The signal from the motor neuron releases calcium in the cell.]] [[1|Calcium frees the actin sites and the myosin heads latch on, forming cross-bridges.]] [[2|The power stroke slides the actin over the myosin, shortening the sarcomere.]] [[3|A new ATP detaches the head and resets it for the next cycle.]]",
          "All four marks, and the effect on the sarcomere is clear.",
        ],
        [
          "partial",
          "[[0|Calcium is released.]] [[2|The power stroke pulls the thin filaments.]] ATP gives the muscle the power for the stroke, so the heads let go when ATP runs out.",
          "ATP is needed to release the head from actin. When ATP runs out, the heads stay attached, as in rigor mortis.",
        ],
        [
          "partial",
          "[[1|Myosin heads form cross-bridges with actin.]] [[3|ATP detaches them.]]",
          "Good. Start with the nerve impulse and calcium release, and include the power stroke.",
          true,
        ],
        [
          "weak",
          "The muscle gets shorter because the filaments shrink when you want to move.",
          "The filaments do not shorten; they slide past each other, which shortens the sarcomere.",
        ],
        [
          "weak",
          "[[3|ATP is used to release the myosin.]] The nerve impulse goes into the bone and the bone pulls the muscle.",
          "The nerve impulse goes to the muscle fiber and triggers calcium release. Bones are moved by the muscles, not the other way round.",
        ],
      ],
    },
    {
      prompt:
        "Explain the roles of the biceps brachii, triceps brachii and brachialis when you bend your elbow to lift a book, and say how the roles change when you straighten the arm.",
      scheme: [
        "Names the biceps brachii as the prime mover in bending the elbow",
        "Names the triceps brachii as the antagonist that relaxes during the bend",
        "Names the brachialis as a synergist that helps the prime mover",
        "States that when you straighten the arm, the triceps becomes the prime mover and the biceps the antagonist",
      ],
      model:
        "When you bend your elbow, the biceps brachii is the prime mover, which contracts to produce the movement. The triceps brachii is the antagonist, which relaxes and opposes the movement. The brachialis is a synergist, which helps the biceps. When you straighten the arm, the roles reverse: the triceps becomes the prime mover and the biceps the antagonist.",
      answers: [
        [
          "full",
          "[[0|The biceps brachii is the prime mover for bending the elbow.]] [[1|The triceps brachii is the antagonist and relaxes while this happens.]] [[2|The brachialis is a synergist helping the biceps.]] [[3|When I straighten the arm the triceps becomes the prime mover and the biceps is the antagonist.]]",
          "Full marks. You showed that the roles reverse with the direction of movement.",
        ],
        [
          "full",
          "[[0|Flexion is driven by the biceps (agonist).]] [[1|The triceps is the antagonist, and it has to relax or it would resist.]] [[2|The brachialis assists as a synergist.]] [[3|In extension the roles swap: triceps agonist, biceps antagonist.]]",
          "All four marks, and the explanation of why the antagonist has to relax is a good detail.",
        ],
        [
          "partial",
          "[[0|The biceps is the prime mover.]] [[1|The triceps is the antagonist.]] The roles stay the same when I straighten the arm.",
          "The roles swap when you straighten the arm: the triceps becomes the prime mover. Add the synergist.",
        ],
        [
          "partial",
          "[[2|The brachialis is a synergist.]] [[3|They swap roles when the arm straightens.]]",
          "Good. Name the prime mover and the antagonist for bending the elbow.",
          true,
        ],
        [
          "weak",
          "The biceps and triceps both contract together to bend the elbow, and the brachialis relaxes.",
          "The triceps would resist the bend if it contracted. The antagonist relaxes while the prime mover contracts.",
        ],
        [
          "weak",
          "[[0|The biceps is the prime mover.]] The triceps is the synergist because it is next to the biceps.",
          "A synergist helps the prime mover. The triceps opposes the bend, so it is the antagonist.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Neurons, action potentials, synapses and reflexes",
  note: `
## Objectives

Students will be able to:

1. describe the structure of a neuron and how an action potential travels along it;
2. explain how a signal crosses a synapse and how a reflex arc works.

## Materials

Neuron diagram, a model made with pipe cleaners and beads, a meter stick for the ruler drop reaction test, the problem set.

## Starter (6 minutes)

Do the ruler-drop test: one student drops a meter stick and another catches it. Record how far it fell. Ask: "How long did the signal take to travel from the eyes to the hand?" Use the distance to estimate the reaction time.

## Main activity

1. Draw a neuron: dendrites, cell body, axon, myelin sheath, nodes of Ranvier, axon terminals. Describe the resting potential of about -70 mV.
2. Action potential: depolarization when sodium channels open, repolarization when potassium leaves, and the refractory period. Explain the all-or-none rule and saltatory conduction in myelinated axons.
3. The synapse: neurotransmitter release, binding to receptors and removal. Example: acetylcholine at the neuromuscular junction.
4. The reflex arc: receptor, sensory neuron, integration center, motor neuron, effector. Use the knee-jerk reflex.

## Checking for understanding

Ask: "Why does myelin make impulses faster?"

## Problem set and worksheet

Reaction time calculations, a reflex arc diagram and a synapse explanation.
`,
  reading: [
    "How nerves carry signals",
    `
The basic unit of the nervous system is the **neuron**. A typical neuron has branching **dendrites**, which receive signals; a **cell body**, which contains the nucleus; and a long **axon** that carries the signal away to the **axon terminals**. Many axons are wrapped in a fatty **myelin sheath**, made by supporting cells, with small gaps between the segments called **nodes of Ranvier**.

A neuron at rest is polarized: the inside is negative relative to the outside, at about -70 millivolts. This **resting potential** is maintained by the sodium-potassium pump, which moves 3 sodium ions out for every 2 potassium ions in, using ATP. When the neuron is stimulated enough to reach a threshold, voltage-gated sodium channels open, sodium rushes in and the inside becomes positive for a moment, to about +30 mV. This is **depolarization**. Then the sodium channels close and potassium channels open, so potassium flows out and the inside becomes negative again. This is **repolarization**. This brief change in voltage is the **action potential**. It follows an **all-or-none** rule: either the threshold is reached and a full-size action potential occurs, or nothing happens. A stronger stimulus does not make a bigger action potential, but it makes more of them per second.

The action potential moves down the axon because depolarization at one spot triggers depolarization in the next. In myelinated axons the impulse jumps from one node to the next, which is called **saltatory conduction**, and increases the speed from about 1 meter per second to over 100 meters per second. In multiple sclerosis, the myelin is damaged and signals slow or fail.

At the end of the axon, the neuron meets the next cell at a **synapse**, a small gap. When the action potential arrives, calcium enters the terminal and causes vesicles to release a **neurotransmitter** into the gap. The neurotransmitter diffuses across and binds to receptors on the next cell, opening channels. The signal is then ended by removing the neurotransmitter, either by enzymes that break it down or by reuptake. At the junction between a motor neuron and a muscle, the neurotransmitter is acetylcholine.

A **reflex** is a fast, automatic response. The pathway, the **reflex arc**, has five parts: a receptor detects a stimulus, a sensory neuron carries the signal to the spinal cord, an integration center there processes it, a motor neuron carries the response out, and an effector, such as a muscle, acts. In the knee-jerk reflex, tapping the tendon stretches the thigh muscle and the leg kicks. The brain is not needed for the response, which makes it faster, but it is informed afterward.
`,
  ],
  cards: [
    ["Neuron", "A nerve cell that carries electrical signals."],
    ["Myelin sheath", "A fatty covering on some axons that speeds up conduction."],
    ["Resting potential", "The electrical difference across the membrane of an unstimulated neuron, about -70 mV."],
    ["Action potential", "A brief reversal of the membrane voltage that travels along an axon."],
    ["All-or-none rule", "A neuron either fires a full action potential or none at all."],
    ["Synapse", "The gap where a neuron passes a signal to another cell."],
    ["Neurotransmitter", "A chemical released at a synapse to carry the signal across."],
    ["Reflex arc", "The pathway of a reflex: receptor, sensory neuron, integration center, motor neuron, effector."],
  ],
  closed: [
    [
      "What causes depolarization at the start of an action potential?",
      ["Potassium leaving the cell", "Sodium entering the cell", "Calcium leaving the cell", "Chloride leaving the cell"],
      "B",
    ],
    [
      "Why are myelinated axons faster?",
      ["The impulse jumps between nodes of Ranvier", "They are shorter", "They have more dendrites", "They have no ion channels"],
      "A",
    ],
    [
      "What happens at a synapse when an action potential arrives?",
      ["The axon stops working", "Neurotransmitter is released into the gap", "The myelin dissolves", "The neuron divides"],
      "B",
    ],
    [
      "In a reflex arc, the neuron that carries the signal from the spinal cord to the muscle is the:",
      ["Sensory neuron", "Motor neuron", "Interneuron only", "Receptor"],
      "B",
    ],
    [
      "A meter stick falls 20 cm before a student catches it. The reaction time is about (d = 1/2 g t squared):",
      ["0.10 s", "0.20 s", "0.30 s", "0.45 s"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the sequence of events in an action potential, from the resting state to the return to rest, and explain the role of sodium and potassium.",
      scheme: [
        "States that at rest the inside of the neuron is negative, about -70 mV",
        "States that a stimulus reaching threshold opens sodium channels and sodium enters, causing depolarization",
        "States that sodium channels close and potassium channels open, so potassium leaves, causing repolarization",
        "States that the sodium-potassium pump restores the ion distribution, and the process follows the all-or-none rule",
      ],
      model:
        "At rest, the inside of the neuron is negative, about -70 mV. When a stimulus reaches threshold, sodium channels open and sodium enters, depolarizing the neuron. Then the sodium channels close and potassium channels open, so potassium leaves and the neuron repolarizes. The sodium-potassium pump restores the ion distribution. An action potential is all-or-none: it occurs fully or not at all.",
      answers: [
        [
          "full",
          "[[0|At rest the inside is about −70 mV, negative compared with outside.]] [[1|When a stimulus reaches threshold, sodium channels open, sodium rushes in, and the inside becomes positive.]] [[2|Then the sodium channels close, potassium channels open and potassium leaves, bringing the voltage back down.]] [[3|The sodium-potassium pump restores the ions, and the action potential is all-or-none.]]",
          "Full marks. The role of each ion is given in sequence.",
        ],
        [
          "full",
          "[[0|Resting potential is about −70 mV.]] [[1|Depolarization: Na+ channels open and Na+ enters.]] [[2|Repolarization: K+ channels open and K+ exits.]] [[3|The pump moves 3 Na+ out and 2 K+ in to restore the resting state, and either a full spike happens or none.]]",
          "All four marks, with accurate numbers.",
        ],
        [
          "partial",
          "[[0|At rest the inside is negative.]] [[1|Sodium enters.]] [[2|Then potassium enters to make it negative again.]]",
          "Potassium leaves the cell during repolarization. Add the sodium-potassium pump and the all-or-none rule.",
        ],
        [
          "partial",
          "[[2|Potassium leaves to repolarize the cell.]] [[3|It is all-or-none.]]",
          "Good. Add the resting state and the step where sodium enters.",
          true,
        ],
        [
          "weak",
          "A stronger stimulus makes a bigger action potential, and the cell uses calcium to move the signal along the axon.",
          "Action potentials are all-or-none, and they depend on sodium and potassium movement. A stronger stimulus makes more of them.",
        ],
        [
          "weak",
          "[[0|The neuron is at −70 mV at rest.]] The neuron fills with water and then bursts to send the signal.",
          "Signals are sent by ion movements across the membrane, not by bursting. Describe the sodium and potassium channels.",
        ],
      ],
    },
    {
      prompt:
        "Trace the pathway of the knee-jerk reflex through the five parts of a reflex arc, and explain why a reflex is faster than a voluntary response.",
      scheme: [
        "Identifies the receptor as the stretch receptor in the thigh muscle or tendon detecting the tap",
        "Identifies the sensory neuron carrying the signal to the spinal cord",
        "Identifies the integration center in the spinal cord and the motor neuron carrying the signal back to the quadriceps (effector)",
        "Explains that the reflex bypasses the brain, so the pathway is shorter and quicker",
      ],
      model:
        "A stretch receptor in the thigh muscle detects the tap on the tendon. A sensory neuron carries the signal to the spinal cord, where the integration center connects directly to a motor neuron. The motor neuron carries the signal to the quadriceps, the effector, which contracts and kicks the leg. A reflex is faster because it bypasses the brain, so the pathway is shorter.",
      answers: [
        [
          "full",
          "[[0|The tap stretches the tendon and a stretch receptor in the muscle detects it.]] [[1|A sensory neuron carries the signal to the spinal cord.]] [[2|In the spinal cord a motor neuron is activated and sends the signal to the quadriceps, which is the effector.]] [[3|It doesn't go through the brain first, so it's shorter and quicker.]]",
          "Full marks. All five parts are covered, ending with the reason it is fast.",
        ],
        [
          "full",
          "[[0|Receptor: stretch receptors in the quadriceps.]] [[1|Sensory neuron: carries the impulse to the spinal cord.]] [[2|Integration center in the spinal cord, then the motor neuron takes the signal to the effector, the quadriceps.]] [[3|The brain is bypassed, so the delay is short.]]",
          "All four marks, in the standard terms.",
        ],
        [
          "partial",
          "[[0|The receptor detects the tap.]] [[2|The motor neuron makes the muscle kick.]]",
          "Include the sensory neuron, the integration center and the reason that a reflex is quick.",
        ],
        [
          "partial",
          "[[1|A sensory neuron goes to the spinal cord]] and then up to the brain, which decides to kick. [[3|It's fast because neurons are fast.]]",
          "In a reflex the spinal cord, not the brain, connects the sensory and motor neurons. That is why it is faster than a voluntary action.",
          true,
        ],
        [
          "weak",
          "The doctor's hammer makes the muscle jump directly with no nerves because it is a reflex.",
          "Reflexes use nerves too. The pathway is receptor, sensory neuron, spinal cord, motor neuron and effector.",
        ],
        [
          "weak",
          "[[3|A reflex is fast.]] It starts in the brain and goes down the spinal cord to the leg, taking the shortest path.",
          "A reflex is fast because it does not go through the brain. The spinal cord handles the response.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "The brain, the nervous system divisions, and a dissection",
  note: `
## Objectives

Students will be able to:

1. describe the main regions of the brain and the roles of the central and peripheral nervous systems;
2. dissect or model an organ system and report what the structures show about their function.

## Materials

Preserved sheep brains or an anatomical brain model, dissection trays, scalpels or probes, gloves, goggles, paper towels, the practical sheet.

## Starter (6 minutes)

Ask: "If a person has a stroke that damages the left side of the cerebrum, what might they lose the ability to do?" Discuss language, movement on the right side of the body and so on.

## Main activity

1. Brain regions: cerebrum with four lobes (frontal, parietal, temporal, occipital), cerebellum, brainstem (midbrain, pons, medulla), thalamus and hypothalamus. Match each to a function.
2. Divisions of the nervous system: central (brain and spinal cord) and peripheral (cranial and spinal nerves), and the somatic and autonomic divisions with sympathetic and parasympathetic branches.
3. Practical: dissect a sheep brain, or study a brain model if no specimen is available. Identify the meninges, cerebrum, cerebellum, brainstem and corpus callosum, and sketch a midsagittal section.

## Checking for understanding

Ask: "Which part of the autonomic nervous system speeds up the heart?"

## Worksheet and practical write-up

A labeled sketch and a structure-function table.
`,
  reading: [
    "The command center and its connections",
    `
The nervous system has two main parts. The **central nervous system (CNS)** is the brain and the spinal cord. The **peripheral nervous system (PNS)** consists of all the nerves outside the CNS: 12 pairs of cranial nerves and 31 pairs of spinal nerves. The PNS is divided by function. The **somatic** division carries voluntary signals to the skeletal muscles and sensory information from the skin and joints. The **autonomic** division controls involuntary functions of the heart, glands and smooth muscle. It has two branches. The **sympathetic** branch prepares the body for "fight or flight": it speeds up the heart, widens the airways and the pupils, and slows digestion. The **parasympathetic** branch controls "rest and digest": it slows the heart and stimulates digestion.

The brain is protected by the skull and three membranes called the **meninges**, with cerebrospinal fluid cushioning it. The largest part is the **cerebrum**, with two hemispheres joined by a bundle of fibers, the **corpus callosum**. Its folded outer layer, the cortex, increases the surface area. The cerebrum has four lobes. The **frontal lobe** is for reasoning, planning and voluntary movement. The **parietal lobe** processes touch and spatial awareness. The **temporal lobe** handles hearing and memory. The **occipital lobe** processes vision. Each hemisphere mostly controls the opposite side of the body, so a stroke on the left side can cause weakness on the right side. Language areas are usually in the left hemisphere.

Beneath the cerebrum, the **thalamus** relays sensory signals to the cortex and the **hypothalamus** controls hunger, thirst, temperature, and the pituitary gland. The **cerebellum**, at the back and below, coordinates movement and balance. The **brainstem**, with the midbrain, pons and medulla oblongata, connects the brain to the spinal cord. The medulla controls vital automatic functions such as heart rate, breathing and blood pressure, so damage to it is often fatal.

In a dissection, structures show their function through their form. The folded cortex shows how a large surface is packed into a small skull. The cerebellum is deeply folded with many fine ridges, matching its role in precise coordination. The large, thick corpus callosum shows how much information passes between the hemispheres. When you dissect, work carefully, identify each structure before cutting, and record what you see with labeled sketches.
`,
  ],
  cards: [
    ["Central nervous system", "The brain and the spinal cord."],
    ["Peripheral nervous system", "The nerves outside the brain and spinal cord."],
    ["Sympathetic division", "The branch of the autonomic system for fight or flight."],
    ["Parasympathetic division", "The branch of the autonomic system for rest and digest."],
    ["Cerebellum", "The part of the brain that coordinates movement and balance."],
    ["Medulla oblongata", "The brainstem region that controls heart rate and breathing."],
    ["Corpus callosum", "The bundle of fibers connecting the two cerebral hemispheres."],
    ["Meninges", "The three protective membranes around the brain and spinal cord."],
  ],
  closed: [
    [
      "Which lobe of the cerebrum processes vision?",
      ["Frontal", "Parietal", "Temporal", "Occipital"],
      "D",
    ],
    [
      "Which part of the brain coordinates balance and fine movement?",
      ["Cerebellum", "Medulla", "Thalamus", "Hypothalamus"],
      "A",
    ],
    [
      "The sympathetic division of the autonomic nervous system:",
      ["Slows the heart", "Prepares the body for fight or flight", "Stimulates digestion", "Controls voluntary muscles"],
      "B",
    ],
    [
      "A stroke damages the left side of the cerebrum. Weakness is most likely on the:",
      ["Left side of the body", "Right side of the body", "Both sides equally", "Neither side"],
      "B",
    ],
    [
      "Which structure joins the two cerebral hemispheres?",
      ["Meninges", "Corpus callosum", "Medulla", "Pons"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A cyclist hits their head in a crash and has trouble with balance and with smooth, coordinated movements, but they can think and speak normally. Which part of the brain is most likely affected, and why? Name the other part of the brain responsible for breathing.",
      scheme: [
        "Identifies the cerebellum as the part affected",
        "Explains that the cerebellum coordinates movement and balance",
        "Explains that normal thinking and speech suggest the cerebrum (frontal lobe, language areas) is working",
        "Identifies the medulla oblongata (brainstem) as the part responsible for breathing",
      ],
      model:
        "The cerebellum is most likely affected, because it coordinates movement and balance. Normal thinking and speech suggest the cerebrum is working, including the frontal lobe and language areas. Breathing is controlled by the medulla oblongata in the brainstem.",
      answers: [
        [
          "full",
          "[[0|It is probably the cerebellum.]] [[1|The cerebellum coordinates movement and balance.]] [[2|Since they can think and speak normally, the cerebrum is OK.]] [[3|Breathing is controlled by the medulla in the brainstem.]]",
          "Full marks. You reasoned from the symptoms to the structure and ruled out the cerebrum.",
        ],
        [
          "full",
          "[[0|Cerebellum damage.]] [[1|It fine-tunes movement and keeps balance, which is what's affected.]] [[2|The frontal and temporal lobes seem intact because thinking and speech are fine.]] [[3|The medulla oblongata controls breathing and heart rate.]]",
          "All four marks, and the detail of the lobes shows good recall.",
        ],
        [
          "partial",
          "[[0|The cerebellum.]] [[1|It controls balance.]]",
          "Good. Use the normal thinking and speech as evidence about the cerebrum, and name the part that controls breathing.",
        ],
        [
          "partial",
          "[[3|The medulla controls breathing.]] [[2|The cerebrum is fine.]] The balance problem is from the thalamus.",
          "The thalamus relays sensory signals. Balance and coordination come from the cerebellum.",
          true,
        ],
        [
          "weak",
          "The occipital lobe is damaged because it is at the back of the head where they hit it.",
          "The occipital lobe processes vision. Balance problems point to the cerebellum, which sits low at the back of the brain.",
        ],
        [
          "weak",
          "[[3|The medulla controls breathing.]] The cerebrum controls balance because it is the biggest part.",
          "Size does not decide function. The cerebellum coordinates balance, and the cerebrum handles thinking and voluntary movement.",
        ],
      ],
    },
    {
      prompt:
        "Compare the sympathetic and parasympathetic divisions of the autonomic nervous system. Give two effects of each on the body and say when each is dominant.",
      scheme: [
        "Says the sympathetic division is dominant during stress or exercise (fight or flight)",
        "Gives two sympathetic effects, such as a faster heart rate and wider airways or pupils",
        "Says the parasympathetic division is dominant at rest (rest and digest)",
        "Gives two parasympathetic effects, such as a slower heart rate and stimulated digestion",
      ],
      model:
        "The sympathetic division dominates during stress or exercise, and speeds up the heart and widens the airways and pupils while slowing digestion. The parasympathetic division dominates at rest, slowing the heart and stimulating digestion. The two work in opposite ways to keep the body balanced.",
      answers: [
        [
          "full",
          "[[0|The sympathetic division takes over in stress or exercise, the fight-or-flight response.]] [[1|It makes the heart beat faster and widens the airways.]] [[2|The parasympathetic division is dominant at rest, rest and digest.]] [[3|It slows the heart and speeds up digestion.]]",
          "Full marks. The contrast between effects and situations is clear.",
        ],
        [
          "full",
          "[[0|Sympathetic is dominant in an emergency.]] [[1|The pupils dilate and the heart rate rises, while digestion slows.]] [[2|Parasympathetic dominates in relaxed conditions.]] [[3|The heart rate slows and the digestive glands become active.]]",
          "All four marks, with two effects for each division.",
        ],
        [
          "partial",
          "[[0|The sympathetic division is for fight or flight.]] [[1|It speeds up the heart.]] The parasympathetic does the same thing as the sympathetic.",
          "The parasympathetic division has opposite effects: it slows the heart and stimulates digestion.",
        ],
        [
          "partial",
          "[[2|The parasympathetic division is for rest.]] [[3|It slows the heart and helps digestion.]]",
          "Good. Describe the sympathetic division and when it is dominant, with two effects.",
          true,
        ],
        [
          "weak",
          "Sympathetic means you feel sorry for someone and parasympathetic is the one that works the muscles you can control.",
          "Both are parts of the autonomic system, which controls involuntary functions. Voluntary muscles are controlled by the somatic division.",
        ],
        [
          "weak",
          "[[2|The parasympathetic is for resting.]] The sympathetic makes you fall asleep and slows the heartbeat.",
          "The sympathetic prepares you for action and speeds the heart. The parasympathetic slows it.",
        ],
      ],
    },
  ],
  practical: {
    title: "Sheep brain dissection",
    instructions:
      "Examine a preserved sheep brain, identifying the meninges, cerebrum, cerebellum and brainstem from the outside. Then make a midsagittal cut, find the corpus callosum, thalamus and hypothalamus, and sketch the section. Write a structure-function table. If specimens are unavailable, use the brain model and complete the same steps.",
    steps: [
      ["Put on gloves and goggles and place the brain on a dissection tray."],
      ["Identify the dura mater, if present, and the cerebrum, cerebellum and brainstem from the outside."],
      ["Find the longitudinal fissure between the two hemispheres and note the folds, the gyri and sulci."],
      ["Make a single midsagittal cut from the front to the back along the fissure.", "Cut away from your body and keep fingers behind the scalpel."],
      ["Find the corpus callosum, thalamus, hypothalamus and the cerebellum's tree-like pattern in the section."],
      ["Draw the section with labels and write a structure-function note for each structure."],
    ],
    rubric: [
      ["Technique and safety: correct handling and a clean midsagittal cut", 4],
      ["Observation: labeled sketch with the main structures", 4],
      ["Interpretation: structure-function links for the structures", 4],
    ],
    writeUps: [
      [
        "full",
        "The outer surface was covered by a tough dura mater, and under it the cerebrum was folded into gyri and sulci, which increase the surface area of the cortex. The cerebellum at the back had finer, deeper folds. After the midsagittal cut I found the white corpus callosum joining the hemispheres, the thalamus just below it and the hypothalamus further down. The brainstem was thick and led to the spinal cord. The folds suit the large amount of processing in a small skull, and the corpus callosum lets the hemispheres share information.",
        [4, 4, 4],
        "An excellent report: careful technique, the right structures, and each linked to a function.",
      ],
      [
        "full",
        "Technique: gloves and goggles on, brain on the tray, one cut along the longitudinal fissure, tools put away after use. Observations: the sheep cerebrum has deep folds, the cerebellum has a tree-like pattern in section (the arbor vitae), and the brainstem includes the medulla. The corpus callosum is a white arch connecting the hemispheres. Interpretation: the cerebellum's many folds give it lots of surface area for coordinating movement, and the medulla sits where it can control breathing.",
        [4, 3, 4],
        "Very good. Add the labeled midsagittal sketch to the observation to complete it.",
      ],
      [
        "partial",
        "We looked at the sheep brain and cut it in half. I could see the big folds on the cerebrum and the cerebellum at the back. In the middle was the white part, the corpus callosum. I did not label the other structures because I could not tell which was the thalamus and the hypothalamus, and I did not write a function for each.",
        [3, 2, 1],
        "Use the diagram to find the thalamus and hypothalamus, label them in the sketch, and write what each does.",
      ],
      [
        "partial",
        "The brain had a cerebrum, a cerebellum and a brainstem. The cerebrum does thinking, the cerebellum does balance and the brainstem controls breathing and heartbeat. The folds make more surface. I did not do the dissection because I did not want to touch the specimen, so these notes are from the textbook and the model.",
        [0, 1, 4],
        "Your functions are right, but this task needs your own observations. You can use the model for the same steps and sketch what you see.",
      ],
      [
        "weak",
        "We cut the brain with a knife and it was soft and gray. It smelled bad. The inside looked white and gray. There were many folds. It was interesting to see what a brain looks like on the inside. I washed my hands afterward and put everything back where it was.",
        [1, 1, 0],
        "Name the structures you saw and what they do. Draw and label a sketch of the midsagittal section.",
      ],
      [
        "weak",
        "The cerebellum is at the front of the brain and the cerebrum is the small part at the back. The corpus callosum is the part that sends signals to the stomach. I labeled all of them in my sketch, but the brain did not look like the diagram so I'm not sure that mine was normal.",
        [1, 1, 0],
        "Check a reference: the cerebrum is the large front and top part and the cerebellum sits at the back and below. The corpus callosum joins the hemispheres.",
      ],
    ],
  },
};

writeCourse(
  "anatomy-and-physiology-grade-12.json",
  "Anatomy and Physiology",
  "Grade 12",
  {
    1: w1,
    2: w2,
    3: w3,
    4: w4,
    5: w5,
    6: w6,
    7: w7,
    8: w8,
  },
);
