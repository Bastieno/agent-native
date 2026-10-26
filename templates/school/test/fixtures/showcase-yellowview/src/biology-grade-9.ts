import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Biology, Grade 9, Quarter 1. Standards: Next Generation Science Standards,
 * HS-LS1 (structures and processes), in the school's own words.
 */

const w1: WeekInput = {
  topic: "Investigations, microscopes and explaining from evidence",
  note: `
## Objectives

Students will be able to:

1. plan a safe investigation, name the variables and record data with units;
2. use a microscope, draw what they see to scale and calculate magnification;
3. write a scientific explanation with a claim, evidence and reasoning.

## Materials

Compound microscopes, prepared onion-skin slides, rulers, lab safety contract, the exit ticket.

## Starter (8 minutes)

Show a photo of two identical bean plants, one on a sunny windowsill and one in a closet. Ask: "What did the person change, what did they measure, and what did they keep the same?" Write independent, dependent and controlled on the board and sort student answers into them.

## Main activity

1. Model a claim, evidence and reasoning (CER) using the bean photo: the claim answers the question, the evidence is measured data, the reasoning says why the data supports the claim.
2. Walk through the parts of the microscope and the rule for carrying it with two hands. Students focus on the onion slide, starting on low power.
3. Students draw three cells with a title, a ruler line and the magnification, then calculate magnification as drawing size divided by actual size.

## Checking for understanding

Circulate with a checklist: low power first, one hand on the fine focus, drawing labeled with units. Ask any pair, "How do you know your claim is supported?"

## Exit ticket

A drawing is 45 mm long and the real cell is 0.15 mm. What is the magnification?
`,
  reading: [
    "Thinking like a biologist",
    `
Biology starts with a question you can test. "Do plants grow better in light?" is testable. "Are plants nicer than animals?" is not. Once you have a testable question, you design an investigation around three kinds of variables. The **independent variable** is the one thing you change on purpose, such as the hours of light. The **dependent variable** is what you measure in response, such as the height of the plant in centimeters. **Controlled variables** are everything else you keep the same, such as the soil, the amount of water and the type of seed. If you change two things at once, you cannot tell which one caused the result.

Good data has units and repeats. Measuring five plants in each group is better than measuring one, because one plant might be unusual. Scientists also know that every measurement has some uncertainty. A ruler marked in millimeters cannot honestly tell you a length to the hundredth of a millimeter.

Many living things are too small to see, so biologists use a compound microscope. You always start on the lowest power objective, because it has the widest view and is easiest to focus. You then switch to a higher power and use only the fine focus knob so the lens does not crash into the slide. Total magnification is the eyepiece power multiplied by the objective power. A 10x eyepiece with a 40x objective gives 400x.

When you draw what you see, use a sharp pencil, a clear title, and label lines that do not cross. Record the magnification. To find the magnification of a drawing, divide the length of the drawing by the real length of the object. If your drawing of a cell is 45 mm long and the cell is 0.15 mm long, the magnification is 45 divided by 0.15, which is 300.

The last skill is explaining. A strong scientific explanation has three parts. The **claim** answers the question. The **evidence** is the data you collected. The **reasoning** connects the two with a scientific idea. "Plants in the sunny window grew taller" is a statement of evidence, but it only becomes an explanation when you add the reasoning that plants use light to make food for growth.
`,
  ],
  cards: [
    ["Independent variable", "The one factor the investigator changes on purpose."],
    ["Dependent variable", "The factor that is measured to see the effect of the change."],
    ["Controlled variable", "A factor kept the same in every group so the test is fair."],
    ["Total magnification", "Eyepiece power multiplied by objective power."],
    ["Claim", "The part of an explanation that answers the question."],
    ["Evidence", "Measured data or observations that support the claim."],
    ["Reasoning", "The scientific idea that links the evidence to the claim."],
    ["Fine focus", "The knob used for small adjustments, and the only one used on high power."],
  ],
  closed: [
    [
      "A student tests whether the temperature of water changes how fast sugar dissolves. What is the dependent variable?",
      ["The temperature of the water", "The time the sugar takes to dissolve", "The amount of sugar used", "The size of the beaker"],
      "B",
    ],
    [
      "Which objective lens should you use first when you place a new slide on the stage?",
      ["The highest power", "The medium power", "The lowest power", "Any, as long as you use the coarse focus"],
      "C",
    ],
    [
      "A microscope has a 10x eyepiece and a 40x objective. What is the total magnification?",
      ["50x", "400x", "30x", "4x"],
      "B",
    ],
    [
      "Which sentence is the reasoning in a scientific explanation?",
      [
        "The plants in the closet were 3 cm tall after two weeks.",
        "Light affects plant growth.",
        "Plants use light energy to make sugars they need to grow, so less light means less growth.",
        "Our group measured five plants.",
      ],
      "C",
    ],
    [
      "A drawing of a cell is 60 mm long. The real cell is 0.2 mm long. What is the magnification?",
      ["12x", "300x", "0.0033x", "60x"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A class wants to find out if the amount of salt in water changes how many seconds a raw egg takes to float. Name the independent variable, the dependent variable, and two variables that should be controlled.",
      scheme: [
        "Names the amount of salt as the independent variable",
        "Names the time for the egg to float as the dependent variable",
        "Names one correct controlled variable, such as volume of water",
        "Names a second correct controlled variable, such as egg size or water temperature",
      ],
      model:
        "The independent variable is the amount of salt added. The dependent variable is the time in seconds the egg takes to float. Two controlled variables are the volume of water and the temperature of the water, and I would also use eggs of the same size.",
      answers: [
        [
          "full",
          "[[0|We change the amount of salt]], that's the independent. [[1|The dependent is how many seconds it takes for the egg to float.]] We would [[2|keep the same volume of water]] and [[3|the same temperature]] so it's fair.",
          "Full marks. You tied each variable to what is changed or measured, which is exactly the sorting skill.",
        ],
        [
          "full",
          "[[0|Independent variable: grams of salt.]] [[1|Dependent variable: time to float in seconds.]] Controlled: [[2|same cup and same amount of water]], and [[3|same size egg]].",
          "All four marks, and you put the units on the dependent variable.",
        ],
        [
          "partial",
          "[[0|The salt is what we change.]] The dependent variable is the egg. We should keep the water the same.",
          "The egg is the thing you test, but the dependent variable is what you measure about it, which is the time it takes to float. Name a second controlled variable too.",
        ],
        [
          "partial",
          "[[1|The time it takes to float is dependent]] and [[2|the water amount is controlled]]. Salt is controlled too I think.",
          "Your dependent variable is right. Salt is the one thing you change, so it is the independent variable, not controlled.",
          true,
        ],
        [
          "weak",
          "The egg is the independent and the salt is dependent. Controlled is the table.",
          "Try asking what the class changes on purpose. That is the salt. The table does not affect the egg, so it is not a variable worth controlling here.",
        ],
        [
          "weak",
          "[[0|The salt amount is the independent variable.]] The rest are all dependent because they depend on the egg.",
          "You found the independent variable. The dependent variable is one measured result, the floating time. Everything else you keep the same is controlled.",
        ],
      ],
    },
    {
      prompt:
        "A drawing of an onion cell is 48 mm long. The real cell is 0.16 mm long. Calculate the magnification and show your working.",
      scheme: [
        "Writes magnification = drawing size / actual size",
        "Substitutes both lengths in the same unit",
        "Calculates 300",
        "Writes the answer as a magnification, 300x",
      ],
      model:
        "Magnification = drawing size divided by actual size. 48 mm divided by 0.16 mm is 300. The magnification is 300x.",
      answers: [
        [
          "full",
          "[[0|Magnification is image size over real size.]] [[1|48 / 0.16]] [[2|= 300]]. [[3|So it is 300x.]]",
          "Full marks. Both lengths were already in millimeters, which is why you could divide directly.",
        ],
        [
          "full",
          "[[0|Drawing size divided by actual size]], so [[1|48 mm ÷ 0.16 mm]] [[2|equals 300]]. [[3|The drawing is magnified 300x.]]",
          "All four marks. Showing the units cancel is a nice touch.",
        ],
        [
          "partial",
          "[[0|Drawing divided by actual]]. [[1|48 / 0.16]] = 3.",
          "Your setup is right but the division is off by a factor of 100. Check by multiplying: 0.16 times 3 is only 0.48, not 48.",
        ],
        [
          "partial",
          "48 / 0.16 = 300 [[2|so it is 300]].",
          "The number is right, but you need to show the formula and write it as 300x with the x for times.",
          true,
        ],
        [
          "weak",
          "48 + 0.16 = 48.16 so the magnification is 48.16.",
          "Magnification compares the size of the drawing to the real size, so you divide. Adding the two lengths does not mean anything here.",
        ],
        [
          "weak",
          "[[0|You divide the real size by the drawing size]] which gives 0.0033.",
          "You have the right idea of dividing but you flipped the two lengths. A drawing that is bigger than the cell should give a number larger than 1.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "From cells to organ systems, and DNA to proteins",
  note: `
## Objectives

Students will be able to:

1. develop a model of how cells, tissues, organs and organ systems work together;
2. explain how the sequence of DNA determines the proteins a cell makes.

## Materials

Cards for the levels of organization, a paper DNA strip activity, scissors, glue, the practical sheet.

## Starter (7 minutes)

Ask: "When you run the mile in PE, which parts of you are working, and how do they know what the others are doing?" List answers on the board and sort them into cells, organs and systems.

## Main activity

1. Build a concept map from cell to tissue to organ to organ system to organism, using the heart and circulatory system as the example.
2. Introduce DNA as a code. Each group gets a strip of DNA bases and uses a codon chart to build the chain of amino acids, then folds a pipe-cleaner model to show how the chain becomes a protein shape.
3. Practical: students model the flow of a message in a body by passing a coded note through a chain, then change one letter and see how the final result changes.

## Checking for understanding

Ask for a one-minute explanation: "Why can a single changed base change a protein?" Listen for sequence, shape and function.

## Exit ticket

Draw a three-box flow from DNA to protein and label each arrow.
`,
  reading: [
    "Tiny parts, working together",
    `
Your body is made of trillions of cells, but they are not all alike. A muscle cell is long and packed with fibers that shorten. A nerve cell has long branches that carry signals. Cells of the same kind work together as a **tissue**. Muscle tissue contracts. Epithelial tissue covers surfaces. Different tissues combine into an **organ**, such as the stomach or the heart. Organs that work toward one job are an **organ system**. The digestive system, for example, includes the mouth, stomach, small intestine and liver, and its job is to break down food and absorb nutrients.

No system works alone. When you sprint to catch a COTA bus, your muscular system needs oxygen from the respiratory system, delivered by the circulatory system, and your nervous system coordinates all of it. A change in one part affects the others.

What tells each cell which proteins to make? The answer is **DNA**, the molecule found in the nucleus of your cells. DNA is a long chain of four bases, abbreviated A, T, C and G. A group of three bases is a **codon**, and each codon points to one amino acid. In a cell, the DNA sequence is copied into a messenger molecule called RNA, and ribosomes read the RNA codon by codon. They link amino acids in the order the code says, forming a chain.

The chain folds into a specific three-dimensional shape, and that shape is the protein. This matters because a protein works by its shape. An enzyme has a pocket that fits one particular molecule. A hemoglobin protein carries oxygen because of the way its folds create a space for it.

If one base in the DNA is changed, the codon may change, and so may the amino acid. Sometimes that has no effect. Sometimes it changes the shape of the protein so it works poorly or not at all. Sickle cell disease is caused by one changed base that gives a different amino acid in hemoglobin, which bends red blood cells out of shape. Small changes at the base level can have large effects at the level of the organism.
`,
  ],
  cards: [
    ["Tissue", "A group of similar cells that do the same job."],
    ["Organ", "A structure made of different tissues that work together for one function."],
    ["Organ system", "A group of organs that work together for a larger job."],
    ["DNA", "The molecule that stores the instructions for making proteins."],
    ["Codon", "A group of three bases that points to one amino acid."],
    ["Ribosome", "The cell structure that builds proteins by reading RNA."],
    ["Amino acid", "A building block that links in a chain to make a protein."],
    ["Protein shape", "The folded form of a protein, which decides what it can do."],
  ],
  closed: [
    [
      "Which list goes from smallest to largest level of organization?",
      ["Organ, tissue, cell, system", "Cell, tissue, organ, organ system", "Tissue, cell, system, organ", "Cell, organ, tissue, organ system"],
      "B",
    ],
    [
      "The stomach is made of muscle, nerve and epithelial tissue working together. This makes the stomach a(n):",
      ["Cell", "Tissue", "Organ", "Organ system"],
      "C",
    ],
    [
      "What does a codon do?",
      ["Copies the whole cell", "Points to a specific amino acid", "Stores energy", "Carries oxygen in the blood"],
      "B",
    ],
    [
      "Why can one changed DNA base alter how an organism works?",
      [
        "It can change an amino acid, which can change the protein's shape and function",
        "It always makes the cell divide",
        "It removes the nucleus",
        "It changes the number of cells in a tissue",
      ],
      "A",
    ],
    [
      "A runner's muscles need more oxygen during a race. Which pair of systems must work together to deliver it?",
      ["Digestive and skeletal", "Respiratory and circulatory", "Nervous and excretory", "Skeletal and integumentary"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the heart, the lungs and the blood vessels work together to supply a muscle with oxygen when a student runs the mile.",
      scheme: [
        "States that the lungs take in oxygen",
        "States that the blood carries oxygen from the lungs",
        "States that the heart pumps blood through the vessels to the muscles",
        "Links the oxygen delivered to the muscles' need during exercise",
      ],
      model:
        "The lungs take in oxygen and pass it into the blood. The heart pumps the oxygen-rich blood through blood vessels to the muscle cells. During the mile the muscles need more oxygen to release energy, so the heart beats faster and breathing speeds up.",
      answers: [
        [
          "full",
          "[[0|Your lungs bring in oxygen]] and [[1|it goes into the blood]]. [[2|The heart pumps that blood through the vessels to the muscles.]] [[3|When you run, your muscles need extra oxygen so you breathe and your heart beats faster.]]",
          "Full marks. You followed the oxygen along its whole path and explained why exercise speeds it up.",
        ],
        [
          "full",
          "[[0|Oxygen enters through the lungs]], [[1|then the blood picks it up and carries it]]. [[2|The heart is the pump that pushes blood through the arteries to the leg muscles.]] [[3|Running uses more energy so the muscles need more oxygen.]]",
          "All four marks. Naming the arteries shows you know the vessels are part of the delivery route.",
        ],
        [
          "partial",
          "[[0|The lungs take in oxygen]] and the heart makes it go around. The muscles use it.",
          "Good start. Say what the oxygen travels in (the blood) and why the heart and breathing rates increase during a run.",
        ],
        [
          "partial",
          "[[2|The heart pumps the blood to the muscles.]] [[3|The muscles need more when you run.]]",
          "Where does the blood pick up the oxygen? Add the lungs and say the blood carries it.",
          true,
        ],
        [
          "weak",
          "The heart breathes in the oxygen and the lungs pump it to the muscles.",
          "The jobs are swapped. The lungs take in oxygen and the heart pumps blood. Try drawing the path with arrows.",
        ],
        [
          "weak",
          "[[1|Blood carries stuff to the muscles]] because it is red.",
          "Blood does carry things to the muscles, which is a start. Say what it carries (oxygen), where it gets it, and what the heart does.",
        ],
      ],
    },
    {
      prompt:
        "A mutation changes one base in the DNA that codes for a protein. Explain, step by step, how this could change the protein's job.",
      scheme: [
        "States that the DNA sequence codes for the order of amino acids",
        "States that the changed base may change a codon and so an amino acid",
        "States that this can change the folded shape of the protein",
        "States that a different shape can change or stop the protein's function",
      ],
      model:
        "DNA codes for the order of amino acids in a protein. If one base changes, a codon may change and a different amino acid may be added. That can change how the chain folds, and since a protein works by its shape, the protein may work differently or not at all.",
      answers: [
        [
          "full",
          "[[0|The DNA order of bases tells the cell which amino acids to put in order.]] [[1|If one base is different, the codon can change and a different amino acid can get added.]] [[2|That might make the protein fold into a different shape]] and [[3|then it might not do its job.]]",
          "Full marks. You kept the steps in order, from base to amino acid to shape to function.",
        ],
        [
          "full",
          "[[0|A gene is a code for a chain of amino acids.]] [[1|Changing one base can change a codon so the chain has a different amino acid.]] [[2|The chain then folds up differently]], and since [[3|proteins work because of their shape, it may not work the same]].",
          "All four marks, with a clear link between shape and function.",
        ],
        [
          "partial",
          "[[0|DNA gives the order of amino acids]] so [[1|one base change can change an amino acid]]. Then the cell dies.",
          "The first two steps are good. A changed protein does not always kill the cell. Say how the new shape affects the job of the protein.",
        ],
        [
          "partial",
          "[[2|The mutation changes the shape of the protein]] and [[3|then it doesn't work right]].",
          "You jumped to the end. Explain how the base change reaches the shape: through a different codon and a different amino acid.",
          true,
        ],
        [
          "weak",
          "A mutation makes the cell grow bigger so the protein is bigger.",
          "Mutations do not usually change cell size. A changed base changes a codon, then an amino acid, then the shape. Revisit the reading.",
        ],
        [
          "weak",
          "[[0|DNA tells the order of amino acids]]. Mutations are always bad and the person gets sick.",
          "You have the code idea right. Many mutations have no effect, and some are helpful, so you cannot say always. Link the change to the shape of the protein.",
        ],
      ],
    },
  ],
  practical: {
    title: "Modeling how a message becomes a body part",
    instructions:
      "In a chain of four students, pass a coded message from a DNA card to a ribosome student to build a short protein out of colored beads. Then change one letter in the code and repeat. Record what changed and explain it using the ideas of codon, amino acid and protein shape.",
    steps: [
      ["Read the DNA card with the six-base sequence aloud to the ribosome student."],
      ["Use the codon chart to turn each group of three bases into one bead color."],
      ["String the beads in order to build the protein chain and record the colors in your table."],
      ["Change one base on the DNA card as your teacher directs, and repeat the process.", "Do not swap more than one base, or you will not know which change mattered."],
      ["Compare the two chains and record how many beads are different."],
      ["Write a short conclusion that links the change in the code to a change in the protein."],
    ],
    rubric: [
      ["Method: correct use of the codon chart and a clear record of both chains", 4],
      ["Results: the two chains compared accurately", 3],
      ["Conclusion: links the base change to protein shape and function", 4],
    ],
    writeUps: [
      [
        "full",
        "I used the codon chart to turn the six bases into two beads, red then blue. After I changed the third base, the second bead became green. Only one bead out of two was different. A changed base changes a codon, which changes an amino acid, and in a real cell that could change how the protein folds and works.",
        [4, 3, 4],
        "Strong write-up. Every step is in the order you did it, and the conclusion explains why one letter mattered.",
      ],
      [
        "full",
        "Method: we read the DNA card CAT GGA and matched each codon to a bead color with the chart. Results: the first chain was yellow and orange, and after changing the A in the second codon to C, the chain was yellow and purple, so one bead changed. Conclusion: one base change swapped an amino acid. This could make the protein fold into a different shape, so it might not do the same job.",
        [4, 3, 3],
        "Clear and complete. For full marks in the conclusion, say what might happen to the function in the body.",
      ],
      [
        "partial",
        "We used the codon chart to build the beads, one color for each group of three letters, and wrote the colors down in our table. After the teacher had us change one letter, the chain looked different from the first one. So I think the DNA change made a different protein, but I did not count how many beads changed.",
        [2, 1, 2],
        "Be specific. Say which colors you got in each chain and how many beads changed. Then explain why a different amino acid might change the shape.",
      ],
      [
        "partial",
        "First we read the DNA card out loud and made a chain with red, blue, red. Then we changed one letter and made the chain again, and it had red, green, red. The change made one bead different out of three, and the other two stayed the same as before.",
        [3, 2, 1],
        "Your records are clear. The conclusion is missing: what does a different bead mean for the real protein?",
      ],
      [
        "weak",
        "We passed the message down the line and made beads from the code. It was fun because we got to work in a group, and the second chain looked a little different from the first one when we put them next to each other on the desk.",
        [1, 0, 0],
        "Describe what you did in steps, record the bead colors in each chain, and tie the result to the idea of a codon.",
      ],
      [
        "weak",
        "The beads show that DNA is made of beads that go in a line. When we changed the code the whole chain changed completely and nothing matched the first chain anymore, so I think a small change in DNA changes everything about the protein.",
        [1, 0, 1],
        "Only one bead changed, not the whole chain. Compare the two chains again and count the differences carefully.",
      ],
    ],
  },
};

const w3: WeekInput = {
  topic: "Photosynthesis: light energy becomes sugar",
  note: `
## Objectives

Students will be able to:

1. use evidence to show how carbon, hydrogen and oxygen from sugars build amino acids and other large molecules;
2. model how photosynthesis changes light energy into stored chemical energy.

## Materials

Elodea or spinach leaf disks, baking soda solution, syringes, cups, a lamp, a timer, the practical sheet.

## Starter (7 minutes)

Hold up a tiny seed and a photo of a large oak. Ask: "Where did all of that tree come from? The soil lost almost no weight." Take predictions and record them for revisiting at the end.

## Main activity

1. Present the photosynthesis equation in words: carbon dioxide plus water, using light energy, makes glucose plus oxygen. Annotate it with where each item comes from and goes to.
2. Practical: leaf disk floating test. Disks sink at first when air is drawn out, and rise as photosynthesis produces oxygen in the light. Measure how many disks float each minute.
3. Connect the glucose to growth. Show how atoms from glucose are rebuilt into larger molecules, including amino acids that need nitrogen from the soil.

## Checking for understanding

Cold-call: "Where did the tree's mass come from?" Look for carbon dioxide from the air.

## Exit ticket

List the two reactants and two products of photosynthesis and name the energy source.
`,
  reading: [
    "Where does a tree come from?",
    `
A tree is made mostly of wood, and wood is made mostly of carbon. For a long time people assumed trees took their mass from the soil. In the 1600s a scientist grew a willow in a pot for five years. The tree gained about 74 kilograms, but the soil lost only a tiny amount. So where did the mass come from? Most of it came from the air, in the form of carbon dioxide.

**Photosynthesis** is the process in which plants, algae and some bacteria turn light energy into the chemical energy stored in sugar. It happens in the chloroplasts, which contain a green pigment called chlorophyll that absorbs light. In words: carbon dioxide plus water, in the presence of light energy, becomes glucose plus oxygen. The carbon and oxygen atoms in glucose come from carbon dioxide, the hydrogen atoms come from water, and the energy comes from the light. The oxygen given off came from the water molecules.

Glucose is not the end of the story. The plant uses the atoms in glucose as building blocks. Glucose can be joined into long chains of starch for storage or cellulose for cell walls. The carbon, hydrogen and oxygen can be rebuilt into fats and, with nitrogen taken up through the roots, into amino acids, which then join into proteins. This is why a farmer in central Ohio adds nitrogen fertilizer to a corn field. The corn can make sugar from air and water, but it needs nitrogen to make its proteins.

Several factors limit how fast photosynthesis happens: the brightness of the light, the amount of carbon dioxide, and the temperature. At low light, more light means more sugar. At some point another factor, such as carbon dioxide, becomes the limit, and adding more light does not help.

Photosynthesis matters for every living thing. It captures energy from the sun that nearly every food chain depends on, and it releases the oxygen that animals and plants need for respiration.
`,
  ],
  cards: [
    ["Photosynthesis", "The process that uses light energy to turn carbon dioxide and water into glucose and oxygen."],
    ["Chloroplast", "The cell structure where photosynthesis happens."],
    ["Chlorophyll", "The green pigment that absorbs light for photosynthesis."],
    ["Glucose", "A simple sugar that stores chemical energy."],
    ["Reactant", "A substance that is used up in a chemical reaction."],
    ["Product", "A substance that is made in a chemical reaction."],
    ["Limiting factor", "The condition in shortest supply, which sets the rate of a process."],
    ["Cellulose", "A long chain of glucose that builds plant cell walls."],
  ],
  closed: [
    [
      "Which are the reactants of photosynthesis?",
      ["Glucose and oxygen", "Carbon dioxide and water", "Oxygen and water", "Glucose and carbon dioxide"],
      "B",
    ],
    [
      "A seed grows into a large tree. Most of the tree's mass came from:",
      ["The soil", "Water only", "Carbon dioxide in the air", "Sunlight"],
      "C",
    ],
    [
      "Where does photosynthesis take place?",
      ["Mitochondria", "Nucleus", "Chloroplasts", "Cell wall"],
      "C",
    ],
    [
      "A greenhouse tomato plant is in bright light and warm, but the air has very little carbon dioxide. What is most likely the limiting factor?",
      ["Light", "Temperature", "Carbon dioxide", "Oxygen"],
      "C",
    ],
    [
      "Why does a corn field need nitrogen fertilizer even though corn can make sugar from air and water?",
      [
        "Nitrogen is needed to make amino acids for proteins",
        "Nitrogen is the energy source for photosynthesis",
        "Nitrogen makes chlorophyll green only",
        "Nitrogen replaces carbon dioxide",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A plant is placed in a sealed jar in bright light. Describe what happens to the amount of carbon dioxide and oxygen in the jar over several hours and explain why.",
      scheme: [
        "States that carbon dioxide in the jar decreases",
        "States that oxygen in the jar increases",
        "Links the changes to photosynthesis",
        "States that light energy is changed into chemical energy in glucose",
      ],
      model:
        "The carbon dioxide in the jar decreases and the oxygen increases. The plant is carrying out photosynthesis, which uses carbon dioxide and water and releases oxygen. The light energy is stored as chemical energy in glucose.",
      answers: [
        [
          "full",
          "[[0|The carbon dioxide would go down]] and [[1|the oxygen would go up]]. [[2|That is because the plant is doing photosynthesis.]] [[3|It takes the light and stores the energy in glucose.]]",
          "Full marks. You named both changes and gave the process that causes them.",
        ],
        [
          "full",
          "[[0|CO2 gets used up so there's less of it.]] [[1|The plant releases oxygen so there's more of that.]] [[2|Photosynthesis uses CO2 and water]] and [[3|turns light energy into the chemical energy in sugar.]]",
          "All four marks. Linking the gas changes to the equation is exactly what the question asked.",
        ],
        [
          "partial",
          "[[1|The oxygen goes up]] [[2|because of photosynthesis]]. The carbon dioxide goes up too.",
          "You have one gas right. Carbon dioxide is a reactant, so it is used up and decreases.",
        ],
        [
          "partial",
          "[[0|There is less carbon dioxide]] because the plant uses it. The plant gets energy from the soil.",
          "Good on carbon dioxide. Add oxygen going up, and fix the energy: it comes from light, not the soil.",
          true,
        ],
        [
          "weak",
          "The plant breathes in oxygen and breathes out carbon dioxide like us.",
          "That is respiration, which plants also do. In bright light photosynthesis is faster and the plant takes in carbon dioxide and gives out oxygen.",
        ],
        [
          "weak",
          "[[2|It is photosynthesis]] so nothing changes in the jar.",
          "You named the process. But photosynthesis changes the gases. Write down which gas is a reactant and which is a product.",
        ],
      ],
    },
    {
      prompt:
        "A willow tree grew from 2 kg to 76 kg while the soil in its pot lost only 0.06 kg. Use this evidence to explain where the tree's extra mass came from.",
      scheme: [
        "Uses the data to state the tree gained far more mass than the soil lost",
        "Concludes the soil was not the main source of mass",
        "States that carbon dioxide from the air supplied the carbon",
        "States that water and photosynthesis built the mass into glucose and other molecules",
      ],
      model:
        "The tree gained about 74 kg while the soil lost only 0.06 kg, so the soil cannot be the main source. Most of the mass came from carbon dioxide in the air and from water. In photosynthesis, the plant builds those atoms into glucose, and then into cellulose and other molecules.",
      answers: [
        [
          "full",
          "[[0|The tree gained 74 kg and the soil only lost 0.06 kg]], [[1|so the soil isn't where the mass came from]]. [[2|The carbon came from carbon dioxide in the air.]] [[3|With water, the plant uses photosynthesis to make glucose and build cellulose and other molecules.]]",
          "Full marks. You used the numbers as evidence first, then gave the reasoning.",
        ],
        [
          "full",
          "[[0|There is a big difference between the 74 kg of growth and 0.06 kg of soil lost.]] [[1|So the soil can't be what the tree is made of.]] [[2|The tree takes in CO2 from the air.]] [[3|Photosynthesis uses CO2 and water to make sugar which becomes wood.]]",
          "All four marks, and a good use of comparison in the data.",
        ],
        [
          "partial",
          "[[0|The tree gained a lot more than the soil lost.]] [[2|It came from the air.]]",
          "Say which gas in the air and what the plant does with it. Add the water and the process of photosynthesis.",
        ],
        [
          "partial",
          "[[1|The soil isn't the main source.]] [[3|The tree used water and light to make glucose.]]",
          "Good conclusions. Add data from the question and name carbon dioxide as the source of carbon.",
          true,
        ],
        [
          "weak",
          "The tree got its mass from the soil, because roots take in soil.",
          "The data says the soil lost almost nothing. Roots take in water and minerals, but those are a tiny part of the mass.",
        ],
        [
          "weak",
          "[[0|The tree grew 74 kg.]] The sun gave it all the mass because the sun is big.",
          "You quoted the data. Light provides energy, not mass. The mass came from carbon dioxide and water.",
        ],
      ],
    },
  ],
  practical: {
    title: "Leaf disk floating test",
    instructions:
      "Use a syringe to pull the air out of spinach leaf disks in a baking soda solution so they sink. Place cups under a lamp and count how many disks float each minute for ten minutes. Compare a cup in bright light with a cup in dim light.",
    steps: [
      ["Punch ten leaf disks with a hole punch, avoiding the veins."],
      ["Draw the air out of the disks with a syringe and the baking soda solution until they all sink.", "Do not squeeze the plunger hard; the disks should not be crushed."],
      ["Pour the disks and the solution into two clear cups, labeled bright and dim."],
      ["Place one cup 10 cm from the lamp and one cup 40 cm away, and start the timer."],
      ["Every minute, record the number of disks floating in each cup in your table."],
      ["Graph the number of floating disks against time and write a conclusion."],
    ],
    rubric: [
      ["Method: fair test with one variable changed and the others controlled", 4],
      ["Results: complete table and a graph with labeled axes and units", 4],
      ["Conclusion: uses the data and the idea of photosynthesis producing oxygen", 4],
    ],
    writeUps: [
      [
        "full",
        "We changed the distance from the lamp, 10 cm and 40 cm, and kept the number of disks, the solution and the leaf the same. In bright light all ten disks floated by minute 8 but in dim light only 3 floated after ten minutes. I made a line graph of floating disks against time. The disks float because photosynthesis makes oxygen that gets trapped in the leaf, and more light makes photosynthesis faster.",
        [4, 4, 4],
        "Excellent. A fair test, clear data, and a conclusion that explains why the disks float.",
      ],
      [
        "full",
        "Question: does light brightness change the rate of photosynthesis? Independent variable was distance from the lamp. We controlled the number of disks, the amount of baking soda solution and the temperature. The table shows 2 disks floating at minute 3 in bright light and 0 in dim light, and 10 vs 3 at minute 10. The graph shows the bright line rising faster. Bright light gives more energy for photosynthesis, which makes oxygen faster.",
        [4, 3, 4],
        "Very good. Your graph description is clear, though the full table should include every minute.",
      ],
      [
        "partial",
        "We put the cups by the lamp and counted the disks that were floating as the minutes went by. More disks floated in the bright cup than in the other one by the end of the time. This is because the bright one had more light on it.",
        [2, 2, 2],
        "Add the distances you used, the numbers from your table and the reason why disks float, which is the oxygen made by photosynthesis.",
      ],
      [
        "partial",
        "The disks in bright light floated faster, with all 10 up by minute 8. The dim cup only had 3 floating at the end of the ten minutes. I think they float because of the baking soda, since that is what we put in the water.",
        [2, 3, 1],
        "The data is good. The baking soda provides carbon dioxide, which allows photosynthesis. The floating is caused by the oxygen produced.",
      ],
      [
        "weak",
        "We did the experiment with the leaf disks and the lamp, and we put the disks in the cups with the solution. Some of them floated up to the top after a while and some stayed on the bottom of the cup.",
        [1, 1, 0],
        "Say how many floated in each cup and when. Then explain what makes the disks rise.",
      ],
      [
        "weak",
        "The disks floated because the lamp made them hot and the hot air lifted them up to the top of the water. The cup that was closer to the lamp got hotter so more of its disks floated, and the far cup stayed cooler.",
        [1, 0, 0],
        "The lamp gives light energy for photosynthesis. The oxygen made by the leaf makes the disks float, not hot air. Check the variables you controlled.",
      ],
    ],
  },
};

const w4: WeekInput = {
  topic: "Cellular respiration and the cycle of matter",
  note: `
## Objectives

Students will be able to:

1. model cellular respiration as a process that breaks bonds in food molecules and releases energy for the cell;
2. compare photosynthesis and respiration as a cycle of matter and a flow of energy.

## Materials

Molecular model kits, two colors of paper clips, mini whiteboards, a quiz sheet.

## Starter (6 minutes)

Ask: "Your phone battery goes down as you use it. Where does a cell get energy?" Collect answers. Show that a cell cannot use a candy bar directly: it must release the energy slowly.

## Main activity

1. Use model kits to build a glucose molecule and six oxygen molecules, then break and rearrange the bonds to form six carbon dioxide and six water molecules. Count the atoms before and after to show matter is conserved.
2. Introduce ATP as the short-term energy currency of the cell.
3. Draw a two-way cycle poster that shows photosynthesis and respiration side by side. Mark what moves in a cycle (carbon, oxygen) and what flows one way (energy).

## Checking for understanding

Mini whiteboards: "Write the reactants and products of respiration." Hold up and check.

## Quiz (last 12 minutes)

Students take the five-question quiz on respiration and the comparison table.
`,
  reading: [
    "Burning food without a flame",
    `
Every cell in your body needs energy all the time. It gets that energy from food, but it cannot use the sugar directly. Instead, cells carry out **cellular respiration**, a series of reactions that break down glucose and use the released energy to build a molecule called **ATP**. ATP is like a rechargeable battery that the cell can spend on moving, building molecules and sending signals.

In words, cellular respiration is glucose plus oxygen producing carbon dioxide plus water, with energy released. If that sounds like photosynthesis backward, that is because it is. Photosynthesis builds glucose from carbon dioxide and water using light energy. Respiration takes apart glucose, using oxygen, and returns carbon dioxide and water.

Most of the reactions of respiration take place in the **mitochondria**, which is why they are called the power plants of the cell. Muscle cells have many mitochondria because they use a lot of energy. A small part of the process, called glycolysis, takes place in the cytoplasm before the mitochondria. When oxygen is missing, cells can still get a small amount of energy by fermentation, but it is much less efficient. This is why your muscles burn when you sprint the final lap on the track.

Notice what happens to matter and to energy. The atoms are conserved. The carbon atoms in the glucose end up in carbon dioxide, which you breathe out. The hydrogen atoms end up in water. No atoms are made or destroyed. They are just rearranged, so matter cycles between living things and the air: plants take carbon dioxide in and build sugar, animals eat the sugar and release carbon dioxide again.

Energy is different. Light energy comes into the system from the sun, is stored in glucose, and is released as ATP and as heat. Some of the energy is always lost as heat, so energy flows through ecosystems in one direction and cannot be reused over and over. That is why ecosystems need a constant supply of sunlight, while the atoms of carbon and oxygen can be recycled.
`,
  ],
  cards: [
    ["Cellular respiration", "The process that breaks down glucose with oxygen to release energy as ATP."],
    ["ATP", "The molecule cells use to store and move energy for work."],
    ["Mitochondria", "The cell structures where most of respiration takes place."],
    ["Fermentation", "Getting a little energy from glucose without oxygen."],
    ["Glycolysis", "The first step of respiration, in which glucose is split in the cytoplasm."],
    ["Conservation of matter", "Atoms are rearranged in a reaction, not created or destroyed."],
    ["Cycle of matter", "The movement of atoms such as carbon between living things and the environment."],
    ["Flow of energy", "Energy moves in one direction through an ecosystem and is lost as heat."],
  ],
  closed: [
    [
      "What are the products of cellular respiration?",
      ["Glucose and oxygen", "Carbon dioxide, water and energy", "Oxygen and ATP only", "Carbon dioxide and glucose"],
      "B",
    ],
    [
      "Why do muscle cells contain many mitochondria?",
      ["They store DNA", "They need a lot of ATP for movement", "They make photosynthesis faster", "They make the cell larger"],
      "B",
    ],
    [
      "Which statement about matter and energy in an ecosystem is correct?",
      [
        "Both cycle and are reused forever",
        "Matter is lost as heat and energy is recycled",
        "Matter cycles, and energy flows one way and is lost as heat",
        "Neither matter nor energy changes",
      ],
      "C",
    ],
    [
      "A glucose molecule has 6 carbon atoms. In respiration, how many carbon dioxide molecules can be formed from it?",
      ["1", "3", "6", "12"],
      "C",
    ],
    [
      "How are photosynthesis and respiration related?",
      [
        "The products of one are the reactants of the other",
        "They both use light to make glucose",
        "They both happen only in animals",
        "They both release oxygen",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Compare photosynthesis and cellular respiration. Give the reactants and products of each and say which one stores energy and which one releases it.",
      scheme: [
        "Gives the reactants and products of photosynthesis correctly",
        "Gives the reactants and products of respiration correctly",
        "States that photosynthesis stores energy in glucose",
        "States that respiration releases energy from glucose",
      ],
      model:
        "Photosynthesis uses carbon dioxide, water and light to make glucose and oxygen, and it stores energy in glucose. Respiration uses glucose and oxygen to make carbon dioxide and water, and it releases the energy for the cell as ATP.",
      answers: [
        [
          "full",
          "[[0|Photosynthesis takes in carbon dioxide and water with light and makes glucose and oxygen.]] [[1|Respiration takes glucose and oxygen and makes carbon dioxide and water.]] [[2|Photosynthesis stores energy in the glucose]] and [[3|respiration releases it as ATP.]]",
          "Full marks. They are mirror images and you showed that clearly.",
        ],
        [
          "full",
          "[[0|Photosynthesis: CO2 + H2O + light gives glucose + O2.]] [[1|Respiration: glucose + O2 gives CO2 + H2O.]] [[2|The first one stores the light energy in sugar]] and [[3|the second releases the energy from the sugar for the cell to use.]]",
          "All four marks, including the use of formulas.",
        ],
        [
          "partial",
          "[[0|Photosynthesis uses CO2 and water to make glucose and oxygen.]] Respiration makes glucose too.",
          "Respiration breaks down glucose, it does not make it. Its products are carbon dioxide and water.",
        ],
        [
          "partial",
          "[[2|Photosynthesis stores energy.]] [[3|Respiration releases energy.]] They are opposite.",
          "Good summary of energy. Now give the actual reactants and products for each.",
          true,
        ],
        [
          "weak",
          "Photosynthesis is for plants and respiration is breathing for animals. Plants don't respire.",
          "Plants respire too, all the time. Both processes happen in plants. List the reactants and products of each.",
        ],
        [
          "weak",
          "[[1|Respiration uses glucose and oxygen.]] Photosynthesis makes ATP.",
          "Your respiration reactants are right. Photosynthesis makes glucose. ATP is made in respiration.",
        ],
      ],
    },
    {
      prompt:
        "Explain why carbon is described as cycling through an ecosystem but energy is described as flowing through it.",
      scheme: [
        "States that carbon atoms are conserved and move between organisms and the air",
        "Gives an example of the carbon cycle, such as CO2 taken in by plants and returned by respiration",
        "States that energy enters as light and is lost as heat at each step",
        "States that energy cannot be reused so a constant supply from the sun is needed",
      ],
      model:
        "Carbon atoms are never destroyed, so they pass between the air and living things: plants take in carbon dioxide and build glucose, and respiration returns carbon dioxide to the air. Energy enters as light and some becomes heat at every step, which cannot be reused, so the ecosystem needs sunlight all the time.",
      answers: [
        [
          "full",
          "[[0|Carbon atoms are not used up. They just get moved around.]] [[1|Plants take CO2 from the air and build sugar, and when animals respire they put CO2 back.]] [[2|Energy comes in as sunlight and at every step some leaves as heat.]] [[3|That heat can't be used again so the ecosystem always needs more sun.]]",
          "Full marks. The contrast between recycled atoms and one-way energy is stated clearly.",
        ],
        [
          "full",
          "[[0|The same carbon atoms are recycled because matter is conserved.]] [[1|For example the carbon in my breakfast was CO2 in the air once, and respiration returns it as CO2.]] [[2|Energy goes from the sun to plants to animals and gets lost as heat.]] [[3|You can't recycle heat, so energy needs to be supplied by the sun constantly.]]",
          "All four marks, with a personal example that makes the cycle real.",
        ],
        [
          "partial",
          "[[0|Carbon is always around, it just moves.]] [[2|Energy is lost as heat.]]",
          "Add an example of how carbon moves between living things and the air, and say why the lost energy matters.",
        ],
        [
          "partial",
          "[[1|Plants take in carbon dioxide and animals breathe it out again.]] Energy also cycles in the same way.",
          "Your carbon example is good. But energy does not cycle. It is lost as heat and has to be supplied again by the sun.",
          true,
        ],
        [
          "weak",
          "Both carbon and energy go around in circles because everything in nature is a cycle.",
          "Only matter cycles. Energy is lost as heat. Try tracing one carbon atom and then one packet of light energy.",
        ],
        [
          "weak",
          "[[2|Energy comes from the sun.]] Carbon flows through the ecosystem too and it ends.",
          "You have the source of energy right. Carbon does not end. It is conserved and cycles back to the air.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "The cell cycle, mitosis and feedback in the body",
  note: `
## Objectives

Students will be able to:

1. model the role of mitosis in growth and in the replacement of cells;
2. describe the stages of the cell cycle and how checkpoints control it;
3. plan an investigation of how a feedback mechanism keeps a condition stable.

## Materials

Pop beads, pipe cleaners, onion root tip slides, thermometers, the quiz.

## Starter (6 minutes)

Ask: "You scraped your knee last week. It is healed now. What happened to the cells?" Collect ideas about new cells replacing damaged ones.

## Main activity

1. Use pop beads to model one chromosome copying itself and then separating into two cells. Name prophase, metaphase, anaphase, and telophase as the beads move.
2. Show an onion root tip slide. Students count cells in each stage in a field of view and use the proportions to guess how long each stage lasts.
3. Introduce a feedback loop with the thermostat of a house, then body temperature. In pairs, plan an investigation: how does heart rate return to rest after jogging in place?

## Checking for understanding

Ask students to explain what a checkpoint is and what might happen if a cell ignores it.

## Quiz (last 10 minutes)

Five questions on the cell cycle and feedback.
`,
  reading: [
    "How cells divide, and how the body stays steady",
    `
Your body makes new cells every day. Skin cells wear off, blood cells wear out, and you grow taller. Cells come from other cells by a repeating pattern called the **cell cycle**. It has a long stage called **interphase**, in which the cell grows and copies its DNA, followed by **mitosis**, in which the copied chromosomes are shared out, and then the cytoplasm splits in two.

Mitosis has four stages. In **prophase**, the chromosomes condense and become visible. In **metaphase**, they line up in the middle of the cell. In **anaphase**, the two copies of each chromosome are pulled to opposite ends. In **telophase**, two new nuclei form. The result is two cells that have exactly the same DNA as the original. That is why mitosis is used for growth and for repairing tissue, like the skin on your knee.

Cells do not divide whenever they like. The cell cycle has **checkpoints**, which are like quality inspectors. One checks whether the DNA has been copied correctly. If there is damage, the cell either repairs it or, if it cannot, destroys itself. Cancer happens when this control fails and cells divide without stopping, forming a tumor.

The body also needs conditions inside it to stay steady, even when conditions outside change. This is called **homeostasis**. It works by **feedback**. Think about a thermostat. When the house cools below the set temperature, the furnace turns on. When the house warms, it turns off. In the same way, if you get too hot on the football field in August, receptors in your skin send a signal to your brain, and your body sweats and widens blood vessels in the skin to lose heat. Once your temperature falls, the signals stop. This is **negative feedback**, because the response reduces the change that triggered it.

To investigate a feedback mechanism, you measure a condition, such as heart rate, before, during and after a disturbance, such as exercise. You expect the value to rise, then return toward the starting level, and the time it takes to return is a measure of how well the mechanism works.
`,
  ],
  cards: [
    ["Interphase", "The long stage of the cell cycle when the cell grows and copies its DNA."],
    ["Mitosis", "Cell division that gives two cells with identical DNA."],
    ["Metaphase", "The stage in which chromosomes line up in the middle of the cell."],
    ["Anaphase", "The stage in which copies of each chromosome are pulled apart."],
    ["Checkpoint", "A control point that checks whether a cell should continue its cycle."],
    ["Homeostasis", "Keeping the conditions inside the body steady."],
    ["Negative feedback", "A response that reduces the change that started it."],
    ["Tumor", "A mass of cells that divide without the normal controls."],
  ],
  closed: [
    [
      "During which stage of mitosis do chromosomes line up in the middle of the cell?",
      ["Prophase", "Metaphase", "Anaphase", "Telophase"],
      "B",
    ],
    [
      "What does mitosis produce from one parent cell?",
      ["Four cells with half the DNA", "Two cells with identical DNA", "Two cells with different DNA", "One larger cell"],
      "B",
    ],
    [
      "What is the main role of a checkpoint in the cell cycle?",
      [
        "To speed up division",
        "To check that the cell is ready before it continues",
        "To make the cell larger",
        "To change the DNA code",
      ],
      "B",
    ],
    [
      "Your body temperature rises during a game, you sweat, and your temperature falls. This is an example of:",
      ["Positive feedback", "Negative feedback", "Mitosis", "Photosynthesis"],
      "B",
    ],
    [
      "In an investigation of heart rate and exercise, which variable would be measured as the dependent variable?",
      ["The type of shoes", "The heart rate in beats per minute", "The age of the student", "The room temperature"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student scrapes their knee in gym class. Explain how mitosis helps the skin heal, and why the new cells match the old ones.",
      scheme: [
        "States that mitosis makes new cells",
        "States that the new cells replace the damaged ones",
        "States that mitosis copies the DNA so the daughter cells are identical",
        "Mentions that cell division is controlled so it stops once healing is complete",
      ],
      model:
        "Mitosis makes new cells that replace the damaged skin cells. Before dividing, the cell copies its DNA, so the two new cells have identical DNA to the original and are the same type of skin cell. Checkpoints stop the cells dividing once the wound is closed.",
      answers: [
        [
          "full",
          "[[0|Mitosis makes new cells]] next to the cut and [[1|they replace the cells that got damaged]]. [[2|The DNA is copied first so each new cell has the same DNA as the old one.]] [[3|When the cut is filled the checkpoints tell the cells to stop dividing.]]",
          "Full marks. Including the stopping signal shows you understand control of the cycle.",
        ],
        [
          "full",
          "[[0|Skin cells near the cut divide by mitosis.]] [[1|The new cells fill the gap and replace the lost cells.]] [[2|Because the DNA is copied exactly, they are the same type of skin cell.]] [[3|Once the gap is filled, signals tell them to stop.]]",
          "All four marks, with a clear order of events.",
        ],
        [
          "partial",
          "[[0|Mitosis makes new cells]] to heal it. The cells are all different so they can do different jobs.",
          "Mitosis gives identical cells, not different ones. Your first point is good. Add how DNA is copied and how the process stops.",
        ],
        [
          "partial",
          "[[1|New cells replace the damaged ones]] and [[2|have the same DNA]].",
          "Good. Name mitosis as the process, and say what stops the division after the wound closes.",
          true,
        ],
        [
          "weak",
          "The cells just stretch to cover the cut because they grow bigger.",
          "Cells do grow, but healing needs more cells, which come from mitosis. Look at what happens in interphase and mitosis.",
        ],
        [
          "weak",
          "[[0|Mitosis makes new cells]] and they get half of the DNA each.",
          "Each new cell gets a full copy of the DNA, not half. The DNA is copied first in interphase.",
        ],
      ],
    },
    {
      prompt:
        "Describe how negative feedback keeps body temperature steady when a student plays football on a hot August afternoon.",
      scheme: [
        "States that a rise in body temperature is detected",
        "States that the body responds by sweating or widening skin blood vessels",
        "States that this loses heat and body temperature falls",
        "States that once the temperature is back to normal the response stops",
      ],
      model:
        "Receptors detect that body temperature is rising and send a signal to the brain. The body responds by sweating and widening the blood vessels in the skin to lose heat. The temperature falls, and when it is back to normal the response switches off, which is negative feedback.",
      answers: [
        [
          "full",
          "[[0|Receptors in the skin notice that the body is getting hotter.]] [[1|The brain tells the body to sweat and the blood vessels in the skin widen.]] [[2|That sends heat out so the temperature drops.]] [[3|When it gets back to normal the sweating slows down.]]",
          "Full marks. You described the whole loop from detection to switching off.",
        ],
        [
          "full",
          "[[0|My body senses that my temperature has gone up.]] [[1|I start sweating and my skin gets red from the blood vessels widening.]] [[2|Sweat evaporating takes heat away so my temperature goes down.]] [[3|After that the response stops, so I do not get too cold.]]",
          "All four marks. The personal detail about red skin is accurate.",
        ],
        [
          "partial",
          "[[1|The body sweats]] [[2|and that cools you down]]. It happens all the time.",
          "Say what triggers the sweating (a rise in temperature detected by receptors) and that it stops once the temperature is normal again.",
        ],
        [
          "partial",
          "[[0|The brain sees you are too hot]] and then you stop being hot.",
          "You have the detection. Fill in the middle: what does the body do to cool down, and how does the loop end?",
          true,
        ],
        [
          "weak",
          "When you get hot the body makes you shiver to cool down.",
          "Shivering warms you when you are cold. When hot, the body sweats and widens skin blood vessels.",
        ],
        [
          "weak",
          "[[2|Your temperature goes down]] because the football field is cooler.",
          "The change comes from the body's response, not from the field. Describe the detection and the responses.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Tissues, organs and keeping blood sugar and temperature in range",
  note: `
## Objectives

Students will be able to:

1. describe how a tissue is made of specialized cells and how tissues form organs;
2. explain how the body keeps blood sugar and body temperature within a narrow range.

## Materials

Pictures of four tissue types, a model of the pancreas feedback loop, glucose test strips (demonstration only), the worksheet.

## Starter (6 minutes)

Show a slice of a muscle, a nerve and a skin picture. Ask: "Why don't all cells look the same?" Take answers linking structure and job.

## Main activity

1. Sort cards of specialized cells (red blood cell, neuron, root hair cell) by structure and function. Then group them into tissues and organs.
2. Draw the blood sugar loop on the board. After a meal, blood glucose rises, the pancreas releases insulin, cells take in glucose, and blood glucose falls. When blood glucose drops, glucagon signals the liver to release stored glucose.
3. Compare with the temperature loop from last week. Students make a table of stimulus, receptor, control center, effector and response for each.

## Checking for understanding

Ask students to predict what happens if the pancreas makes no insulin.

## Problem set

Four short problems on tissue structure and feedback. Students work in pairs and explain each answer in a sentence.
`,
  reading: [
    "Specialized cells and a steady inner world",
    `
Cells in a multicellular body are specialized. That means their structure is suited to their job. A red blood cell is a flexible disk with no nucleus, which leaves more room for hemoglobin to carry oxygen. A nerve cell has a long extension that carries electrical signals over a distance. A cell in the lining of the small intestine has tiny folds on its surface that increase the area for absorbing nutrients. When you see a cell's structure, you can often guess its function.

A group of similar specialized cells forms a **tissue**. The four main tissue types in the human body are epithelial tissue, which covers surfaces, connective tissue, which supports and connects, muscle tissue, which contracts, and nervous tissue, which carries signals. Organs are made of several tissues. The stomach has muscle tissue to churn food, epithelial tissue to line it, connective tissue to hold it together and nervous tissue to control it.

The body must keep conditions within a narrow range for cells to work. Take blood sugar. After a meal with pasta and juice, glucose enters the blood and the level rises. The **pancreas** detects the rise and releases the hormone **insulin**. Insulin signals body cells and the liver to take up glucose from the blood, and the level falls back to normal. Between meals or during a long run, blood glucose falls. The pancreas then releases a different hormone, **glucagon**, which tells the liver to release stored glucose. Two hormones with opposite effects keep the level steady.

In diabetes, this system does not work properly. In type 1 diabetes the pancreas does not make enough insulin. In type 2 diabetes, body cells respond poorly to insulin. In both, blood glucose can rise too high, and people need to monitor and manage it.

Body temperature is also held at about 37 degrees Celsius, or 98.6 degrees Fahrenheit. The same loop pattern appears: a **stimulus** (change), a **receptor** that detects it, a **control center** (the brain or pancreas) that processes it, and an **effector** (muscle, gland) that carries out the response. When you learn to describe any feedback loop this way, you can analyze new examples you have never met.
`,
  ],
  cards: [
    ["Specialized cell", "A cell whose structure is suited to a particular job."],
    ["Tissue", "A group of similar cells working together."],
    ["Epithelial tissue", "Tissue that covers surfaces and lines organs."],
    ["Insulin", "A hormone from the pancreas that lowers blood glucose."],
    ["Glucagon", "A hormone from the pancreas that raises blood glucose."],
    ["Receptor", "A cell or structure that detects a change."],
    ["Effector", "A muscle or gland that carries out the response."],
    ["Diabetes", "A condition in which blood glucose is not controlled properly."],
  ],
  closed: [
    [
      "A red blood cell has no nucleus. How does this help it?",
      ["It can divide faster", "It leaves more room for hemoglobin to carry oxygen", "It makes the cell stronger", "It allows photosynthesis"],
      "B",
    ],
    [
      "What happens to blood glucose after a large meal?",
      [
        "It falls because the cells use it all up",
        "It rises, and the pancreas releases insulin",
        "It stays the same because the liver stops working",
        "It rises, and the pancreas releases glucagon",
      ],
      "B",
    ],
    [
      "Which hormone tells the liver to release stored glucose?",
      ["Insulin", "Glucagon", "Hemoglobin", "Adrenaline only"],
      "B",
    ],
    [
      "The stomach contains muscle, epithelial, connective and nervous tissue. This means the stomach is:",
      ["A tissue", "An organ", "A cell", "A system"],
      "B",
    ],
    [
      "In a thermostat analogy for body temperature, what is the effector?",
      ["The thermometer in the room", "The temperature setting", "The furnace or air conditioner", "The house"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the body returns blood glucose to normal after a student eats a large pasta lunch, naming the organ and hormone involved.",
      scheme: [
        "States that blood glucose rises after the meal",
        "Names the pancreas as the organ that detects and responds",
        "Names insulin as the hormone released",
        "States that glucose is taken up by cells and the liver so blood glucose falls",
      ],
      model:
        "After the meal, blood glucose rises. The pancreas detects this and releases insulin. Insulin makes body cells and the liver take up glucose from the blood, so the blood glucose level falls back to normal.",
      answers: [
        [
          "full",
          "[[0|The glucose in the blood goes up after the lunch.]] [[1|The pancreas senses it]] and [[2|releases insulin]]. [[3|Insulin makes the cells and liver take in the glucose so the level in the blood goes back down.]]",
          "Full marks. The sequence is complete and the organ and hormone are named correctly.",
        ],
        [
          "full",
          "[[0|Blood sugar rises when the food is digested.]] [[1|The pancreas is the organ that detects the rise]] and [[2|it puts out insulin]]. [[3|Insulin tells the liver and body cells to absorb glucose, which lowers blood sugar.]]",
          "All four marks. Good use of both terms for glucose.",
        ],
        [
          "partial",
          "[[0|Blood glucose goes up.]] [[2|Insulin is released]] and the glucose goes away.",
          "Name the organ that releases insulin and say where the glucose goes.",
        ],
        [
          "partial",
          "[[1|The pancreas reacts]] and releases glucagon, so the glucose is taken into the cells.",
          "The pancreas is right, but the hormone that lowers glucose is insulin. Glucagon raises it.",
          true,
        ],
        [
          "weak",
          "The stomach releases insulin to digest the pasta.",
          "Insulin comes from the pancreas and does not digest food. It controls the level of glucose in the blood.",
        ],
        [
          "weak",
          "[[0|Blood glucose is high after lunch.]] The body just sweats it out.",
          "You noticed the rise in glucose. The body does not sweat out glucose. A hormone from the pancreas moves it into cells.",
        ],
      ],
    },
    {
      prompt:
        "A cell lining the small intestine has many tiny folds on its surface. Explain how this structure suits its function, and say what level of organization a group of these cells forms.",
      scheme: [
        "Identifies the function as absorbing nutrients",
        "States that the folds increase the surface area",
        "Links the larger surface area to faster or more absorption",
        "Names the group of similar cells as a tissue",
      ],
      model:
        "The cell's function is to absorb nutrients from digested food. The folds increase its surface area, so more nutrients can pass in at once. A group of similar cells like this forms a tissue, which here is epithelial tissue.",
      answers: [
        [
          "full",
          "[[0|These cells are there to absorb nutrients.]] [[1|The folds make the surface area bigger]], so [[2|more nutrients can get in faster]]. [[3|A group of them together is a tissue.]]",
          "Full marks. You tied structure to function as the question asked.",
        ],
        [
          "full",
          "[[0|The job of the cell is absorbing digested food.]] [[1|Having folds gives it more surface area.]] [[2|More area means more absorption at the same time.]] [[3|Lots of the same cells make up epithelial tissue.]]",
          "All four marks, and you named the type of tissue.",
        ],
        [
          "partial",
          "[[0|They absorb food.]] [[1|The folds make a bigger surface.]]",
          "Good. Add why a bigger surface matters and say what a group of cells is called.",
        ],
        [
          "partial",
          "[[3|Together they form a tissue.]] The folds help them hold food.",
          "Folds do not hold food. They increase the area for absorption. Say what the cells do and why the folds help.",
          true,
        ],
        [
          "weak",
          "The folds make the cell stronger so the acid doesn't break it.",
          "The folds are about absorption, not strength. Look at what the small intestine does with digested food.",
        ],
        [
          "weak",
          "[[3|They make a tissue]] and it makes the stomach move.",
          "A group of similar cells is a tissue, which you have right. The folds are for absorbing nutrients, not movement.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Biological molecules and how enzymes work",
  note: `
## Objectives

Students will be able to:

1. describe the four classes of biological molecules and match each to its building blocks and role;
2. explain how enzymes speed up reactions and how temperature and pH change their activity.

## Materials

Food labels, iodine and Benedict's reagent (demonstration), a graph of enzyme activity against temperature, the worksheet.

## Starter (6 minutes)

Pass around a cereal box label. Ask: "What do carbohydrates, proteins, and fats do for you?" Make three columns on the board and fill in jobs.

## Main activity

1. Present the four classes (carbohydrates, lipids, proteins, nucleic acids) with their building blocks (sugars, fatty acids and glycerol, amino acids, nucleotides). Use food-label data to connect them to ordinary foods.
2. Demonstrate the lock and key model with a paper cut-out. An enzyme has an active site that fits one substrate.
3. Students analyze a graph of enzyme activity against temperature and one against pH and describe what each shows.

## Checking for understanding

Ask: "Why does an enzyme stop working in a very hot pot of water?" Listen for a changed shape.

## Differentiated worksheet

A shared set of questions with hints for students who need them and extension prompts for those who finish.
`,
  reading: [
    "The molecules of life and the helpers that speed them up",
    `
Living things are built from four classes of large molecules. **Carbohydrates** include sugars and starch. Their building blocks are simple sugars, and their main role is to supply energy. **Lipids**, such as fats and oils, are made of fatty acids and glycerol. They store a lot of energy and form the membranes of cells. **Proteins** are chains of amino acids. They do most of the work in a cell: they build structures, carry signals and speed up reactions. **Nucleic acids**, such as DNA, are chains of nucleotides that store the instructions for making proteins.

Look at a nutrition label from a cereal box sold at Kroger. The grams of carbohydrate, fat and protein tell you how much of each class is in a serving. All three come from the same few elements, mainly carbon, hydrogen and oxygen, with nitrogen added in proteins.

The proteins that speed up chemical reactions are called **enzymes**. Without enzymes, many reactions in the body would be too slow for life. Amylase in your saliva, for example, breaks down starch into sugars. An enzyme works because of its shape. It has a pocket called the **active site** that fits one particular molecule, the **substrate**, much like a key fits a lock. The substrate binds, the reaction takes place, and the products leave. The enzyme is not used up and can work again.

Enzymes work best in certain conditions. As temperature rises, molecules move faster and collide more often, so activity increases. But beyond the optimum temperature, the enzyme's shape begins to change. This is called **denaturing**. The active site no longer fits the substrate and activity drops quickly. A boiled egg shows this: the proteins in the egg white have been denatured and cannot go back. Similarly, each enzyme has an optimum pH. Pepsin in the stomach works best at a very acid pH around 2, while amylase in the mouth works best near neutral. If the pH moves far from the optimum, the shape changes and the enzyme stops working.
`,
  ],
  cards: [
    ["Carbohydrate", "A molecule made of sugars that supplies energy."],
    ["Lipid", "A fat or oil that stores energy and forms membranes."],
    ["Protein", "A chain of amino acids that builds structures and speeds up reactions."],
    ["Nucleic acid", "A chain of nucleotides, such as DNA, that stores genetic information."],
    ["Enzyme", "A protein that speeds up a chemical reaction without being used up."],
    ["Active site", "The pocket of an enzyme where the substrate binds."],
    ["Substrate", "The molecule an enzyme acts on."],
    ["Denature", "To change the shape of a protein so it no longer works."],
  ],
  closed: [
    [
      "What are the building blocks of proteins?",
      ["Fatty acids", "Amino acids", "Simple sugars", "Nucleotides"],
      "B",
    ],
    [
      "Which class of molecule stores genetic information?",
      ["Carbohydrates", "Lipids", "Nucleic acids", "Sugars"],
      "C",
    ],
    [
      "Why does an enzyme work on only one substrate?",
      [
        "Its active site has a specific shape that fits that substrate",
        "It is destroyed by other substrates",
        "It only works in the stomach",
        "It needs light",
      ],
      "A",
    ],
    [
      "An enzyme works best at 37 degrees Celsius. At 70 degrees its activity drops to almost zero. Which is the best explanation?",
      [
        "The substrate ran out",
        "The enzyme was denatured and its active site changed shape",
        "The enzyme was used up in the reaction",
        "The molecules slowed down",
      ],
      "B",
    ],
    [
      "Pepsin works best at pH 2 in the stomach. What would happen if it were placed in a neutral pH 7 solution?",
      [
        "It would work faster",
        "It would work the same",
        "Its activity would drop because pH 7 is away from its optimum",
        "It would turn into amylase",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Explain, using the lock and key model, why an enzyme that breaks down starch will not break down protein.",
      scheme: [
        "States that an enzyme has an active site with a specific shape",
        "States that the substrate must fit the active site",
        "States that protein has a different shape from starch so does not fit",
        "Concludes that the enzyme only acts on its own substrate",
      ],
      model:
        "An enzyme has an active site with a particular shape. Only a substrate that fits that shape can bind to it. Protein has a different shape from starch, so it does not fit the active site, and the enzyme acts only on starch.",
      answers: [
        [
          "full",
          "[[0|An enzyme has an active site that is a special shape.]] [[1|The substrate has to fit into it like a key in a lock.]] [[2|Protein is a different shape to starch so it can't fit.]] [[3|That means the enzyme only works on its own substrate.]]",
          "Full marks. You used the lock and key idea correctly and reached the right conclusion.",
        ],
        [
          "full",
          "[[0|The shape of the active site is specific.]] [[1|Only a molecule that matches that shape can bind.]] [[2|A protein molecule doesn't match the starch molecule's shape.]] [[3|So the starch enzyme can't break it down, it is specific to starch.]]",
          "All four marks, with clear and concise reasoning.",
        ],
        [
          "partial",
          "[[0|The active site has a shape]] and [[1|the starch fits in it]]. Protein is bigger so it doesn't work.",
          "Protein being larger is not the main reason. Say that the shape of protein does not match the active site.",
        ],
        [
          "partial",
          "[[3|The enzyme only works on one thing.]] [[2|Protein is a different shape.]]",
          "Both are right. Add the active site and explain that the substrate has to fit it.",
          true,
        ],
        [
          "weak",
          "The enzyme is hungry for starch so it doesn't eat the protein.",
          "Enzymes do not choose by hunger. It is about shape. Draw the active site and the two substrates.",
        ],
        [
          "weak",
          "[[3|Enzymes are specific.]] That's because they are made of carbohydrate.",
          "Enzymes are specific, which is right. But enzymes are proteins, and their specificity comes from the shape of the active site.",
        ],
      ],
    },
    {
      prompt:
        "A graph shows an enzyme's activity rising up to 40 degrees Celsius, then falling sharply to zero by 60 degrees. Describe the pattern and explain why activity falls at high temperature.",
      scheme: [
        "Describes that activity increases with temperature up to about 40 degrees",
        "Explains that molecules move faster and collide more often",
        "States that above the optimum the activity decreases sharply",
        "Explains that the enzyme is denatured as its shape changes",
      ],
      model:
        "Activity rises as temperature increases up to about 40 degrees, because the molecules move faster and collide more often. Above that temperature activity falls sharply, because the enzyme is denatured: its shape, including the active site, changes so the substrate no longer fits.",
      answers: [
        [
          "full",
          "[[0|The enzyme gets more active as it warms up until 40.]] [[1|That's because the molecules move faster and bump into each other more.]] [[2|After 40 it drops fast until it's zero at 60.]] [[3|The enzyme is denatured, the shape changes so the substrate can't fit.]]",
          "Full marks. You described the graph and explained both halves of it.",
        ],
        [
          "full",
          "[[0|From 0 to 40 degrees the rate goes up.]] [[1|There is more collision energy between the enzyme and substrate.]] [[2|Over 40 the line goes steeply down.]] [[3|The active site is distorted, so the enzyme denatures and stops working.]]",
          "All four marks, with the data and the reason.",
        ],
        [
          "partial",
          "[[0|Activity goes up until 40]] and then goes down because [[3|the enzyme is denatured]].",
          "Good points. Explain why activity goes up (more collisions) and describe the drop as sharp.",
        ],
        [
          "partial",
          "[[1|Molecules move faster when it is hotter]] so they react more. At high temperature the enzyme is killed.",
          "Enzymes are not alive, so they are denatured and not killed. Describe the shape change.",
          true,
        ],
        [
          "weak",
          "It goes down because the enzyme runs out of substrate when it's hot.",
          "The drop at high temperature is not about running out of substrate. It is about the enzyme's shape changing.",
        ],
        [
          "weak",
          "[[0|The graph goes up and then down.]] The enzyme melts at 60.",
          "You described the shape of the graph. Enzymes do not melt, they denature: the folding of the protein changes.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Cell structure and how substances cross the membrane",
  note: `
## Objectives

Students will be able to:

1. compare prokaryotic and eukaryotic cells and name the job of each organelle;
2. explain how the membrane controls what enters and leaves through diffusion, osmosis and active transport.

## Materials

Potato cubes or strips, salt and sugar solutions at three concentrations, balances, rulers, paper towels, the practical sheet.

## Starter (6 minutes)

Show a picture of a cell labeled as a city. Ask: "If the cell is a city, what is the nucleus? The membrane? The mitochondria?" Gather analogies and correct any that mislead.

## Main activity

1. Compare a bacterial cell with an animal cell and a plant cell using a Venn diagram. Add the cell wall and chloroplast to the plant cell.
2. Demonstrate diffusion with food coloring in warm and cold water.
3. Practical: place potato strips of equal mass in solutions of different concentrations, then measure the mass again after 30 minutes. Plot the percent change in mass against the concentration.

## Checking for understanding

Ask: "Which way does water move when a cell is in salty water?" Wait for an answer with the reason, from high to low water concentration.

## Differentiated worksheet

Questions on diffusion, osmosis and active transport at three levels of difficulty.
`,
  reading: [
    "Inside the cell, and what gets through the membrane",
    `
All living things are made of cells, but there are two main kinds. **Prokaryotic** cells, such as bacteria, are small and simple. Their DNA floats in the cytoplasm because they have no nucleus. **Eukaryotic** cells, found in animals, plants, fungi and protists, are larger and have a nucleus and other structures bounded by membranes.

Inside a eukaryotic cell, each **organelle** has a job. The nucleus holds the DNA. Mitochondria release energy from glucose. Ribosomes build proteins. The endoplasmic reticulum and Golgi apparatus move and package those proteins. Plant cells also have a cell wall, which supports them, and chloroplasts for photosynthesis, and a large vacuole that stores water.

Around every cell is a **cell membrane**. It is made of a double layer of lipids with proteins in it, and it is selectively permeable. That means it lets some substances through more easily than others. Oxygen and carbon dioxide pass freely. Large molecules and ions do not.

Substances move in three main ways. In **diffusion**, particles spread from where there are many of them to where there are fewer, with no energy needed from the cell. Oxygen moving from the blood into a muscle cell is an example. **Osmosis** is the diffusion of water across a membrane, from where water is more concentrated to where it is less. If a potato strip is placed in very salty water, water moves out of the potato cells and the strip loses mass. If it is placed in pure water, water moves in and the strip gains mass. Where there is no change, the solution inside and outside is balanced.

Sometimes a cell needs to move a substance from a low concentration to a high concentration, against the natural direction. This is **active transport**. It needs energy, in the form of ATP, and special carrier proteins. Root hair cells use active transport to take up minerals from soil even though the soil has a lower concentration than the cell. This is one reason that cells with a lot of active transport have many mitochondria.
`,
  ],
  cards: [
    ["Prokaryotic cell", "A cell with no nucleus, such as a bacterium."],
    ["Eukaryotic cell", "A cell with a nucleus and membrane-bound organelles."],
    ["Organelle", "A structure inside a cell that has a specific job."],
    ["Selectively permeable", "Lets some substances through more easily than others."],
    ["Diffusion", "The spreading of particles from high to low concentration."],
    ["Osmosis", "The diffusion of water across a membrane."],
    ["Active transport", "Moving a substance against its concentration gradient using energy."],
    ["Cell wall", "A rigid outer layer in plant cells that gives support."],
  ],
  closed: [
    [
      "Which structure is found in a plant cell but not in an animal cell?",
      ["Nucleus", "Mitochondrion", "Chloroplast", "Ribosome"],
      "C",
    ],
    [
      "A bacterium differs from an animal cell because it:",
      ["Has no nucleus", "Has no DNA", "Has no cell membrane", "Is always larger"],
      "A",
    ],
    [
      "A potato strip placed in very salty water loses mass. This is because:",
      [
        "Salt moves out of the potato",
        "Water moves out of the potato cells by osmosis",
        "The potato cells divide",
        "The potato makes sugar",
      ],
      "B",
    ],
    [
      "Which of these needs ATP?",
      ["Diffusion of oxygen", "Osmosis of water", "Active transport of minerals", "Spreading of food coloring"],
      "C",
    ],
    [
      "Which organelle is the site of most ATP production?",
      ["Ribosome", "Nucleus", "Mitochondrion", "Golgi apparatus"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A potato strip with a mass of 5.0 g is placed in a strong salt solution and has a mass of 4.2 g after 30 minutes. Calculate the percent change in mass and explain what happened to the potato cells.",
      scheme: [
        "Calculates the change in mass as a loss of 0.8 g",
        "Calculates the percent change as -16%",
        "States that water moved out of the cells by osmosis",
        "Explains that the solution outside had a lower water concentration than the potato cells",
      ],
      model:
        "The mass changed by 4.2 - 5.0 = -0.8 g. The percent change is -0.8 / 5.0 x 100 = -16%. Water left the potato cells by osmosis, because the strong salt solution had a lower water concentration than the inside of the cells.",
      answers: [
        [
          "full",
          "[[0|4.2 - 5.0 = -0.8 g.]] [[1|-0.8 divided by 5.0 times 100 is -16%.]] [[2|Water moved out of the potato cells by osmosis.]] [[3|The salt solution had less water than the cells did so the water went out to it.]]",
          "Full marks. Dividing by the starting mass is the step many people miss.",
        ],
        [
          "full",
          "[[0|The potato lost 0.8 g.]] [[1|That is a 16% decrease (0.8/5 × 100).]] [[2|It is osmosis, water left the cells.]] [[3|There was a lower concentration of water outside in the strong salt.]]",
          "All four marks, with a clear check of the sign of the change.",
        ],
        [
          "partial",
          "[[0|It lost 0.8 g.]] 0.8 / 4.2 × 100 = 19%. [[2|Water went out by osmosis.]]",
          "You divided by the final mass. Percent change always uses the starting mass, 5.0 g, which gives 16%.",
        ],
        [
          "partial",
          "[[1|The percent change is -16%]] because the potato got smaller. The salt went into the potato.",
          "The calculation is right. But it was water leaving the cells, not salt entering them.",
          true,
        ],
        [
          "weak",
          "5.0 + 4.2 = 9.2 g, so it is 9.2%. The potato absorbed salt.",
          "To find the change you subtract. The potato lost mass, so the answer is a decrease.",
        ],
        [
          "weak",
          "[[0|The mass dropped by 0.8 g.]] It's because the cells got smaller from drying.",
          "You got the change in mass. Explain why, using osmosis: water moves out of the cells into the salt solution.",
        ],
      ],
    },
    {
      prompt:
        "Compare diffusion and active transport. State the direction each moves substances relative to concentration and whether each needs energy, and give one example of each.",
      scheme: [
        "States that diffusion moves substances from high to low concentration",
        "States that diffusion does not need energy from the cell",
        "States that active transport moves substances from low to high concentration and needs ATP",
        "Gives a correct example of each, such as oxygen into a cell and minerals into root hair cells",
      ],
      model:
        "In diffusion, substances move from a region of high concentration to low concentration and the cell uses no energy, such as oxygen moving into a muscle cell. In active transport, substances move from low to high concentration using ATP and carrier proteins, such as root hair cells taking up minerals from the soil.",
      answers: [
        [
          "full",
          "[[0|Diffusion goes from high concentration to low concentration]] and [[1|doesn't use any energy]]. [[2|Active transport goes from low to high and needs ATP.]] [[3|An example of diffusion is oxygen going into cells and an example of active transport is root hairs taking minerals from the soil.]]",
          "Full marks. You included both direction and energy, with an example of each.",
        ],
        [
          "full",
          "[[0|Particles diffuse down the gradient, from lots to few.]] [[1|The cell does not spend energy.]] [[2|Active transport pushes them up the gradient and needs ATP and carrier proteins.]] [[3|Carbon dioxide leaving a cell is diffusion; plants taking up nitrate against the gradient is active transport.]]",
          "All four marks, and the gradient language is accurate.",
        ],
        [
          "partial",
          "[[0|Diffusion is high to low.]] [[2|Active transport goes low to high.]] Both need energy.",
          "Diffusion needs no energy from the cell. Add an example of each.",
        ],
        [
          "partial",
          "[[1|Diffusion doesn't need energy]] but active transport does. For example, smelling perfume across a room.",
          "Good on energy. Add the direction of each, and a biological example of each.",
          true,
        ],
        [
          "weak",
          "Diffusion is when cells divide and active transport is when they exercise.",
          "These terms are about how substances move across membranes. Review the reading on the three ways substances move.",
        ],
        [
          "weak",
          "[[1|Diffusion needs no energy.]] Active transport is the same as osmosis.",
          "Osmosis is diffusion of water, so it needs no energy. Active transport moves substances against the gradient and uses ATP.",
        ],
      ],
    },
  ],
  practical: {
    title: "Osmosis in potato strips",
    instructions:
      "Cut potato strips of equal size and mass. Place one strip in each of five sugar solutions (0%, 5%, 10%, 15% and 20%) for 30 minutes. Measure the mass again and calculate the percent change. Find the concentration at which there is no change.",
    steps: [
      ["Cut five potato strips of equal size and measure the mass of each on the balance."],
      ["Label five cups with each sugar concentration and add 50 mL of the solution to each."],
      ["Place one strip in each cup and note the time.", "Use the same volume of solution in every cup."],
      ["After 30 minutes, remove each strip, blot it on a paper towel and measure its mass."],
      ["Calculate the percent change in mass for each strip using the starting mass."],
      ["Graph percent change against concentration and read off the concentration where the line crosses zero."],
    ],
    rubric: [
      ["Method: fair test with equal strips, equal volumes and blotting", 4],
      ["Results: accurate percent change calculations and a graph with labeled axes", 4],
      ["Conclusion: uses osmosis to explain the pattern and finds the zero point", 4],
    ],
    writeUps: [
      [
        "full",
        "We cut five strips of 3.0 g each, used 50 mL of solution each, and blotted before weighing. The 0% strip gained 8% and the 20% strip lost 14%. The line on my graph crosses zero near 9%, so the potato cells have about the same concentration as a 9% solution. In pure water, water moves into the cells by osmosis and the strip gains mass. In strong sugar, water moves out and it loses mass.",
        [4, 4, 4],
        "An excellent report. The zero crossing is the key result and you explained it with osmosis.",
      ],
      [
        "full",
        "Independent variable: sugar concentration. Dependent: percent change in mass. We controlled the mass of the strips, the solution volume and the time. The results table shows +8%, +4%, -1%, -7%, -14% from 0% to 20%. The graph crosses zero at about 9%. Water moved into the potato in weak solutions and out in strong solutions, as it moves from a high to a lower water concentration.",
        [4, 3, 4],
        "Very good. Label the axes on the graph with units to earn full marks for results.",
      ],
      [
        "partial",
        "We put the potato strips in the solutions for 30 minutes and then took them out and weighed them. The potato in water got heavier and the one in 20% sugar got lighter. This is osmosis because the water moved.",
        [2, 2, 2],
        "Add the numbers, the controlled variables, and what the zero point tells you about the potato cells.",
      ],
      [
        "partial",
        "We measured the mass before and after for every strip. The 0% strip gained 0.3 g and the 20% strip lost 0.4 g. I think the potato absorbed the sugar so it got heavier in water and lighter in the strong solutions.",
        [3, 2, 1],
        "The data is good. Water, not sugar, moved into the potato in pure water. Explain this using osmosis.",
      ],
      [
        "weak",
        "We did the potato experiment with the five cups and the balance. The potatoes changed a lot while they sat in the solutions. The results were different in each cup, and some of the strips looked bendy at the end.",
        [1, 1, 0],
        "Describe the method in steps, give the actual masses and say what the changes mean.",
      ],
      [
        "weak",
        "The potato in sugar got bigger because sugar is food and potatoes eat it, so the more sugar there is the more it grows. That is why the strip in the strongest sugar should have gotten the biggest, and I do not know why it shrank.",
        [1, 0, 0],
        "Potatoes do not eat the solution. Water moves across the membrane by osmosis. Check which strips gained and lost mass.",
      ],
    ],
  },
};

writeCourse("biology-grade-9.json", "Biology", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
