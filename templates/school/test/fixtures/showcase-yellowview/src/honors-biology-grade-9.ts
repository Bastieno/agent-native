import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors Biology, Grade 9, Quarter 1. Standards: Next Generation Science
 * Standards, HS-LS1, in the school's own words. Deeper and faster than
 * Biology, with more quantitative reasoning.
 */

const w1: WeekInput = {
  topic: "Experimental design, uncertainty and scale in microscopy",
  note: `
## Objectives

Students will be able to:

1. plan a safe investigation with controls, replicates and recorded uncertainty;
2. use a microscope, calibrate a field of view and calculate actual size and magnification;
3. build a claim, evidence and reasoning argument and judge how strong the evidence is.

## Materials

Compound microscopes, stage micrometer slides (or a clear millimeter ruler), prepared onion and cheek-cell slides, lens paper, the practical sheet.

## Starter (8 minutes)

Show two data tables for a plant growth test: one with a single plant per group, one with ten. Ask: "Which result would you bet money on, and why?" Name replicates, sample size and outliers on the board.

## Main activity

1. Mini-lecture: independent, dependent and controlled variables, a negative control, and the difference between precision and accuracy. Students critique a poorly designed fertilizer test from a local garden center claim.
2. Practical: calibrate the field of view at 40x, 100x and 400x, then measure cells and compute actual size from a drawing using the formula actual = drawing / magnification.
3. Introduce the CER format and mark a sample argument with a three-point rubric.

## Checking for understanding

Ask pairs to name one source of uncertainty in measuring a cell with a ruler under the scope and how they would reduce it.

## Collect

The practical write-up.
`,
  reading: [
    "How sure can you be? Evidence, error and scale",
    `
A good biology investigation does more than change one thing and watch. It is built so that someone who disagrees with you has a hard time explaining the data another way. Start with a testable question and a hypothesis that says what you expect and why. Choose one independent variable, define exactly how you will measure the dependent variable, and list the variables you will hold constant. Add a **control group** that gets no treatment, so you have something to compare with. If a fertilizer is claimed to double growth, a group with plain water shows how much growth would have happened anyway.

Next, think about repeats. A single trial can be misled by a lucky seed or a miscounted leaf. Running several **replicates** lets you calculate a mean, and the spread of the replicates tells you about **precision**. **Accuracy** is different: it asks whether your mean is close to the true value. A scale that always reads 2 g too high is precise but not accurate. Every instrument also carries **uncertainty**. A ruler marked in millimeters is read to plus or minus 0.5 mm, so reporting a length as 12.37 mm claims more than the tool can support.

Microscopes extend this thinking to scale. Total magnification is the product of the eyepiece and objective: a 10x eyepiece with a 40x objective gives 400x. To measure an object, you cannot lay a ruler on it, so you **calibrate**. At 100x, a field of view might be 1.8 mm across. If a cell spans about a third of the field, it is about 0.6 mm, or 600 micrometers. To find the real size of something from a drawing, use actual size = drawing size / magnification. A 36 mm drawing made at 400x represents 0.09 mm, which is 90 micrometers. Keep the unit conversions straight: 1 mm = 1000 micrometers.

When you present results, use the **claim, evidence, reasoning** pattern. The claim is a single sentence that answers the question. The evidence is specific data, with numbers and units. The reasoning explains, with a biological principle, why the evidence supports the claim. The strongest arguments also mention limits: a small sample, a missing control, or a measurement that was hard to make. That honesty is not weakness. It is how science earns trust.
`,
  ],
  cards: [
    ["Control group", "A group that receives no treatment, used for comparison."],
    ["Replicate", "A repeat of the same trial, used to find a mean and judge precision."],
    ["Precision", "How close repeated measurements are to each other."],
    ["Accuracy", "How close a measurement is to the true value."],
    ["Uncertainty", "The range of doubt in a measurement, such as plus or minus 0.5 mm."],
    ["Calibrate", "Use a known scale to find the real size of a microscope field."],
    ["Actual size", "Drawing size divided by magnification."],
    ["Micrometer (µm)", "One thousandth of a millimeter."],
  ],
  closed: [
    [
      "A fertilizer company says its product doubles growth. Which design gives the strongest test?",
      [
        "Ten plants with fertilizer, no comparison group",
        "Ten plants with fertilizer and ten with plain water, same soil and light",
        "One plant with fertilizer and one without",
        "Ten plants with fertilizer in sun and ten without in shade",
      ],
      "B",
    ],
    [
      "A scale always reads 2 g too high, but gives the same reading each time. Its readings are:",
      ["Accurate but not precise", "Precise but not accurate", "Both accurate and precise", "Neither precise nor accurate"],
      "B",
    ],
    [
      "A drawing of a cell is 36 mm long at 400x. What is the actual length?",
      ["0.09 mm", "14.4 mm", "0.9 mm", "9 mm"],
      "A",
    ],
    [
      "The field of view at 100x is 1.8 mm. A cell spans one third of it. About how long is the cell in micrometers?",
      ["60 µm", "600 µm", "6 µm", "6000 µm"],
      "B",
    ],
    [
      "Which sentence is the reasoning part of an argument about the fertilizer?",
      [
        "The treated plants averaged 14.2 cm and the controls 9.8 cm.",
        "The fertilizer increased growth.",
        "Nitrogen in the fertilizer supports protein synthesis, which allows faster cell growth.",
        "We used ten plants in each group.",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A student measures the width of an onion cell in a drawing as 27 mm, made at 150x. Calculate the actual width in micrometers, showing the conversion, and say why reporting the answer to five decimal places would be misleading.",
      scheme: [
        "Uses actual size = drawing size / magnification",
        "Calculates 27 / 150 = 0.18 mm",
        "Converts correctly to 180 micrometers",
        "Explains the measurement is only as precise as the ruler, so extra decimals claim false precision",
      ],
      model:
        "Actual size equals drawing size divided by magnification, so 27 mm divided by 150 is 0.18 mm. Multiplying by 1000 gives 180 micrometers. The drawing was measured with a millimeter ruler, so the answer can only be as precise as that tool, and five decimal places would claim precision the measurement does not have.",
      answers: [
        [
          "full",
          "[[0|Actual size is the drawing size divided by the magnification.]] [[1|27 ÷ 150 = 0.18 mm.]] [[2|There are 1000 µm in a mm, so it is 180 µm.]] [[3|Giving five decimals would be misleading because I measured with a ruler marked in millimeters, so I can't know it that exactly.]]",
          "Full marks. Linking the number of digits to the instrument is exactly the point.",
        ],
        [
          "full",
          "[[0|Actual = drawing / magnification]], [[1|so 27 mm / 150 = 0.18 mm]], [[2|which is 180 micrometers]]. [[3|The ruler only reads to about half a millimeter, so extra decimal places would suggest a precision we didn't measure.]]",
          "All four marks, and a precise statement of why the digits matter.",
        ],
        [
          "partial",
          "[[0|You divide the drawing size by the magnification.]] [[1|27 / 150 = 0.18 mm]], so the cell is 0.18 micrometers.",
          "The division is right but 0.18 is in millimeters. Multiply by 1000 to get micrometers. Then address the decimal places.",
        ],
        [
          "partial",
          "[[2|The answer is 180 µm.]] [[3|More decimals would not be right because the ruler is not that exact.]]",
          "Good conclusions. Show the formula and the working that gives 0.18 mm, because the method earns marks too.",
          true,
        ],
        [
          "weak",
          "27 × 150 = 4050 so the cell is 4050 micrometers wide.",
          "Multiplying makes the cell look larger than the drawing. The drawing is magnified, so the real cell is smaller. Divide instead.",
        ],
        [
          "weak",
          "[[0|Drawing size divided by magnification.]] Then I added the numbers, 27 + 150 = 177, so 177 µm.",
          "You remembered the rule but then used addition. Divide 27 by 150 to get 0.18 mm, then convert to micrometers.",
        ],
      ],
    },
    {
      prompt:
        "A student's group tests a cleaning product on bean seedlings. They spray three seedlings with the product, record that two wilt, and conclude it kills plants. Evaluate the strength of the evidence and describe two changes that would improve the investigation.",
      scheme: [
        "States that the sample size is too small to be reliable",
        "States that there is no control group for comparison",
        "Suggests adding a control group sprayed with water",
        "Suggests more replicates and a measured dependent variable such as height or mass",
      ],
      model:
        "The evidence is weak. Three seedlings is too small a sample, and there is no control group, so we cannot tell whether spraying with any liquid would cause wilting. The group should spray a control group with water and use more seedlings, measuring a variable such as leaf mass or height rather than only noting that plants wilt.",
      answers: [
        [
          "full",
          "[[0|Three seedlings is too few to trust.]] [[1|There is no control group, so we don't know if water would cause the same wilting.]] [[2|They should add a group sprayed with only water.]] [[3|They should also use more plants and measure something like height instead of just saying wilt.]]",
          "Full marks. A precise evaluation with two concrete improvements.",
        ],
        [
          "full",
          "[[0|The sample is tiny, only three plants, and two out of three could be luck.]] [[1|Without a control it isn't a fair comparison.]] [[2|A control group sprayed with water would show what spraying alone does.]] [[3|They need more replicates and a measurement, like mass of leaves, to compare.]]",
          "All four marks. Noting that two of three could be chance is a sharp observation.",
        ],
        [
          "partial",
          "[[0|Three plants is not enough.]] [[3|They should measure how tall the plants get.]]",
          "Both are good. Add the missing control group and say what it would be sprayed with.",
        ],
        [
          "partial",
          "[[1|There is no control group.]] [[2|They should spray water on some.]] The product probably does kill plants.",
          "The control is the key point. Be careful: you cannot say the product kills plants, because the evidence is too weak to say that.",
          true,
        ],
        [
          "weak",
          "The evidence is good because the plants wilted and that proves it.",
          "Two of three wilting does not prove anything. Without a control or more plants, you cannot rule out chance or the effect of spraying.",
        ],
        [
          "weak",
          "[[2|They should use water for comparison.]] Also the bean plants might not like the soil.",
          "The water group is a good fix. Say it is a control and why it is needed, and add replicates and a measured variable.",
        ],
      ],
    },
  ],
  practical: {
    title: "Calibrating the microscope and measuring a cell",
    instructions:
      "Using a clear millimeter ruler under the scope at 40x, find the diameter of the field of view. Use that to estimate the field at 100x and 400x. Then measure the length of five onion epidermal cells at 100x, calculate the mean and its range, and report the result with the correct units and uncertainty.",
    steps: [
      ["Place the clear ruler on the stage and focus at 40x to read the field of view in millimeters."],
      ["Calculate the field at 100x and 400x by scaling from 40x, since field size falls in proportion to magnification."],
      ["Swap in the onion slide and focus at 100x using the fine focus knob.", "Always begin on the lowest power to avoid damaging the slide."],
      ["Estimate the length of five cells as a fraction of the field of view and convert to micrometers."],
      ["Calculate the mean length and the range of your five measurements."],
      ["Write a short claim, evidence and reasoning statement about the typical onion cell length, noting one source of uncertainty."],
    ],
    rubric: [
      ["Calibration: correct field of view at three magnifications", 4],
      ["Measurement: five cells, mean and range with units", 4],
      ["Evaluation: CER statement with a named source of uncertainty", 4],
    ],
    writeUps: [
      [
        "full",
        "The field at 40x was 4.5 mm, so it scaled to 1.8 mm at 100x and 0.45 mm at 400x. At 100x my five cells were 540, 600, 570, 630 and 585 micrometers long. The mean is 585 micrometers and the range is 90 micrometers. Claim: a typical onion cell is about 585 micrometers long. The cells were not in a perfect line with the diameter of the field, so each estimate has about plus or minus 30 micrometers of uncertainty.",
        [4, 4, 4],
        "An excellent report. Calibration, mean and range are all correct, and the uncertainty is named and sized.",
      ],
      [
        "full",
        "We calibrated with the ruler and got a 4.4 mm field at 40x, so 1.76 mm at 100x. Our five cells took up between 0.28 and 0.36 of the field, which gave lengths of 493, 528, 580, 616 and 634 micrometers. The mean is 570 micrometers and the range is 141. The claim is that onion cells average 570 micrometers. The evidence is the five measurements. Estimating a fraction by eye is the biggest uncertainty, so more cells would help.",
        [4, 4, 3],
        "Very good. The reasoning could say why more cells would improve the mean, but the uncertainty is well chosen.",
      ],
      [
        "partial",
        "The field at 40x was 4.5 mm and at 100x it was 1.8 mm. I measured five onion cells, and the lengths were around 600 micrometers. The mean was about 600. I think this is the size of an onion cell, though I did not write down the units for each one.",
        [3, 2, 1],
        "Calibration is right. Record each of the five lengths, give the range and name one source of uncertainty in the conclusion.",
      ],
      [
        "partial",
        "We looked at the onion cells and they were about 0.6 mm long. We took five measurements and the mean was 0.6. I did not do the field of view at 400x because the slide was hard to focus at the higher power.",
        [1, 3, 2],
        "Your measurements are sensible. You need the calibration at all three magnifications. Say how you got the field size at 100x, which is the basis of the measurements.",
      ],
      [
        "weak",
        "We used the microscope and looked at the onion. The cells were small and rectangle shaped. They were like little bricks in a wall. We drew them in our notebook and labeled them, and the cell walls were easy to see once the slide was in focus.",
        [0, 1, 0],
        "A good observation, but this task needs numbers. Calibrate the field, measure five cells in micrometers and calculate the mean.",
      ],
      [
        "weak",
        "The field of view is 100 because the lens is 100x. The cells were 10 big. I think onion cells are about 10 but I am not sure what the unit is, it might be millimeters or something, and I did not use the ruler on the stage.",
        [0, 1, 1],
        "The field of view is a length, not the magnification number. Use the ruler to measure it in millimeters and then give every length a unit.",
      ],
    ],
  },
};

const w2: WeekInput = {
  topic: "Organ systems in coordination, and the path from gene to protein",
  note: `
## Objectives

Students will be able to:

1. model how cells, tissues, organs and organ systems coordinate to meet the body's needs;
2. explain how the DNA sequence determines protein structure through transcription and translation.

## Materials

Codon wheel handout, whiteboards, short DNA sequences on cards, the worksheet.

## Starter (6 minutes)

Pose: "A marathon runner's body at mile 20 is under pressure. Name every system under demand and what each supplies or removes." Build a web on the board linking systems.

## Main activity

1. Mini-lecture and discussion on how systems depend on each other, with the idea that disease in one system affects others (for example, kidney disease and blood pressure).
2. Walk through transcription and translation with an example gene: DNA template to mRNA to tRNA anticodons to amino acid chain. Students transcribe and translate three sequences with the codon wheel.
3. Introduce point mutations: silent, missense and nonsense. Students predict the effect of each on the sequence.

## Checking for understanding

Whiteboards: given a DNA strand, write the mRNA and the first three amino acids. Look for confusing T with U.

## Worksheet

Transcription, translation and mutation questions.
`,
  reading: [
    "From gene to protein: the flow of information",
    `
No organ works alone. A marathon runner at mile twenty is a good example of how systems depend on each other. The muscular system demands energy. The respiratory system raises its breathing rate to bring in oxygen, the circulatory system speeds up the heart to deliver it, and the digestive and endocrine systems supply and regulate glucose. The nervous system monitors and adjusts it all. The excretory system removes waste, and the skin cools the body. A problem in one place spreads to others. If the kidneys fail to remove fluid, blood pressure rises, and the heart works harder.

Each of these systems is built from cells whose structure and function depend on proteins, and the information for making a protein is stored in a gene. The flow of information has two main steps. In **transcription**, which takes place in the nucleus, an enzyme called RNA polymerase reads one strand of DNA, the template strand, and builds a matching strand of messenger RNA (mRNA). RNA uses the base uracil (U) in place of thymine (T). So a DNA template reading TAC GGA becomes the mRNA AUG CCU.

In **translation**, the mRNA leaves the nucleus and reaches a ribosome. The ribosome reads the mRNA in groups of three bases called codons. Transfer RNA molecules (tRNA) carry specific amino acids and have an anticodon that pairs with the codon. AUG codes for methionine and also signals the start. The ribosome links one amino acid to the next, forming a polypeptide, until it meets a stop codon such as UAA. The finished chain folds, and its final three-dimensional shape determines its job.

Mutations are changes in the DNA sequence. A **silent** mutation changes a codon to another that codes for the same amino acid, so the protein is unaffected. A **missense** mutation changes one amino acid, which may or may not change the function. In sickle cell disease, one change from GAG to GTG in the DNA replaces glutamic acid with valine in hemoglobin, and that is enough to make hemoglobin stick together in low oxygen. A **nonsense** mutation changes a codon to a stop codon, cutting the protein short, which usually destroys its function.

Because a protein's shape depends on its amino acids, a single changed base can reach all the way up through the cell, tissue, organ and system to affect the whole organism.
`,
  ],
  cards: [
    ["Transcription", "Copying a gene's DNA template into messenger RNA in the nucleus."],
    ["Translation", "Reading mRNA at a ribosome to build a chain of amino acids."],
    ["mRNA", "Messenger RNA, the copy of a gene that carries the code to the ribosome."],
    ["tRNA", "Transfer RNA, which brings the amino acid that matches each codon."],
    ["Anticodon", "The three bases on tRNA that pair with a codon on mRNA."],
    ["Silent mutation", "A base change that does not change the amino acid."],
    ["Missense mutation", "A base change that swaps one amino acid for another."],
    ["Nonsense mutation", "A base change that creates a stop codon and shortens the protein."],
  ],
  closed: [
    [
      "A DNA template strand reads TAC GGA. What is the mRNA?",
      ["ATG CCT", "AUG CCU", "UAC GGA", "AUG CCA"],
      "B",
    ],
    [
      "Where does translation take place?",
      ["In the nucleus", "At a ribosome", "In the Golgi apparatus", "In the cell membrane"],
      "B",
    ],
    [
      "A mutation changes the codon GAA (glutamic acid) to GAG (also glutamic acid). This is a:",
      ["Silent mutation", "Missense mutation", "Nonsense mutation", "Frameshift"],
      "A",
    ],
    [
      "A mutation changes UAC (tyrosine) to UAA (stop). What is the likely effect?",
      ["One amino acid is swapped", "No effect", "The protein is cut short", "The protein is made faster"],
      "C",
    ],
    [
      "A person with failing kidneys has high blood pressure. Which explanation best shows system coordination?",
      [
        "The kidneys control blood volume, so retained fluid raises pressure in the circulatory system",
        "The kidneys pump blood to the heart",
        "The kidneys make red blood cells only",
        "The kidneys and heart are the same organ",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A DNA template strand has the sequence TAC CGA TTT. Write the mRNA and use the codon chart (AUG = Met, GCU = Ala, AAA = Lys) to give the amino acid sequence, and name the process for each step.",
      scheme: [
        "Writes the mRNA as AUG GCU AAA",
        "Names the first step as transcription",
        "Gives the amino acid sequence Met-Ala-Lys",
        "Names the second step as translation and says it takes place at the ribosome",
      ],
      model:
        "Transcription of TAC CGA TTT gives the mRNA AUG GCU AAA. Translation at the ribosome reads this as Met, Ala, Lys.",
      answers: [
        [
          "full",
          "[[0|The mRNA is AUG GCU AAA]] because A pairs with U and T pairs with A. [[1|Making it is transcription.]] [[2|The amino acids are Met, Ala, Lys.]] [[3|That step is translation, which happens at the ribosome.]]",
          "Full marks. You pointed out the base pairing rule, which is where most mistakes happen.",
        ],
        [
          "full",
          "[[1|Transcription]] copies the template into [[0|mRNA: AUG GCU AAA]]. [[3|Translation at the ribosome]] then reads each codon, giving [[2|methionine, alanine, lysine]].",
          "All four marks, with the two processes and their locations in the right order.",
        ],
        [
          "partial",
          "[[1|Transcription makes the mRNA]]. The mRNA is ATG GCT AAA. The amino acids are Met, Ala, Lys.",
          "Your mRNA still has T in it. RNA uses U instead of T, so it is AUG GCU AAA. The rest is good, but name translation too.",
        ],
        [
          "partial",
          "[[0|AUG GCU AAA]] and then [[3|translation at the ribosome]] reads it.",
          "The mRNA and the process are right. Name the first step (transcription) and write out the amino acid chain.",
          true,
        ],
        [
          "weak",
          "It is the same: TAC CGA TTT. The amino acids are TAC, CGA, TTT.",
          "The mRNA is a different molecule with complementary bases, and the amino acids are named from the codon chart. Start by pairing each base.",
        ],
        [
          "weak",
          "[[2|Met, Ala, Lys]] is the amino acid chain. It is made in the nucleus by DNA.",
          "The amino acids are right, but the chain is made at ribosomes by translation, not in the nucleus. First show the mRNA you got by transcription.",
        ],
      ],
    },
    {
      prompt:
        "Compare silent, missense and nonsense mutations. For each, say what happens to the amino acid sequence and predict how likely it is to affect the protein's function.",
      scheme: [
        "Says a silent mutation does not change the amino acid and is unlikely to affect function",
        "Says a missense mutation swaps one amino acid and may or may not affect function",
        "Says a nonsense mutation creates a stop codon and shortens the protein",
        "Says a nonsense mutation usually destroys function, and gives a link such as the folded shape depending on the amino acids",
      ],
      model:
        "A silent mutation changes the codon but not the amino acid, so the protein is usually unaffected. A missense mutation swaps one amino acid, which may change the shape and function or may have little effect. A nonsense mutation creates a stop codon, so the protein is cut short and its folded shape and function are usually lost.",
      answers: [
        [
          "full",
          "[[0|A silent mutation changes the codon to one that still codes for the same amino acid, so it usually has no effect.]] [[1|A missense mutation swaps one amino acid for another, and whether it matters depends on where it is.]] [[2|A nonsense mutation turns a codon into a stop codon so the chain is shorter.]] [[3|A shortened chain can't fold into the right shape so it usually doesn't work.]]",
          "Full marks. You tied each type to what happens to the chain and the function.",
        ],
        [
          "full",
          "[[0|Silent: same amino acid, so function is unchanged.]] [[1|Missense: a different amino acid, which can change the shape (like sickle cell) or be harmless.]] [[2|Nonsense: a stop codon appears early so translation ends too soon.]] [[3|The short protein is usually useless because its shape depends on the full sequence.]]",
          "All four marks. The sickle cell reference fits the missense idea.",
        ],
        [
          "partial",
          "[[0|Silent mutations do not change the amino acid.]] [[1|Missense mutations change one amino acid.]] Nonsense mutations change a lot of amino acids.",
          "A nonsense mutation does not change many amino acids, it adds a stop codon. Say what that does to the length of the protein.",
        ],
        [
          "partial",
          "[[2|Nonsense creates a stop codon]] and [[3|the protein usually doesn't work]]. Silent is the same as missense.",
          "Your nonsense answer is good. Silent and missense are different: only a missense mutation changes the amino acid.",
          true,
        ],
        [
          "weak",
          "They all make the protein stop working because any mutation is bad.",
          "Many mutations have no effect. Compare each type on whether the amino acid sequence changes.",
        ],
        [
          "weak",
          "[[0|A silent mutation doesn't change the protein.]] Missense is when the gene goes missing and nonsense is when it makes no sense.",
          "Silent is right. Missense means a different amino acid is used. Nonsense means a stop codon appears. Review the reading on mutations.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Photosynthesis in two stages, and where the mass of a plant comes from",
  note: `
## Objectives

Students will be able to:

1. use evidence to show how atoms from sugars are rebuilt into amino acids and other large molecules;
2. model the light-dependent reactions and the Calvin cycle and how they transform light energy into chemical energy.

## Materials

Leaf chromatography strips, a diagram of the chloroplast, colored paper atoms, the quiz.

## Starter (6 minutes)

Pose the van Helmont willow data: a 2 kg tree grows to 76 kg while the soil loses 0.06 kg. Ask students to propose where the mass came from and what evidence would test each idea.

## Main activity

1. Draw the chloroplast and mark the thylakoid and stroma. Light-dependent reactions occur in the thylakoid membranes: light excites chlorophyll, water is split to release oxygen, and ATP and NADPH are made.
2. The Calvin cycle in the stroma uses ATP and NADPH to fix carbon dioxide into sugar. Use colored paper atoms to track one carbon through three turns of the cycle.
3. Compare absorption spectra with chromatography and ask why plants look green.

## Checking for understanding

Ask: "Which atoms in glucose come from water? Which from carbon dioxide?" Check the answers on whiteboards.

## Quiz

Five questions from the reading and the lesson.
`,
  reading: [
    "Capturing light: two stages, one purpose",
    `
Photosynthesis is often written as one equation, but it is really two linked sets of reactions that take place in the chloroplast. The first set, the **light-dependent reactions**, happens in the thylakoid membranes, which are stacks of flattened sacs. Chlorophyll absorbs mostly red and blue light and reflects green, which is why leaves look green. The absorbed energy excites electrons, which are passed along a chain of proteins in the membrane. To replace the electrons, water molecules are split, releasing oxygen gas as a by-product and hydrogen ions. The energy passed along the chain is used to make two energy-carrying molecules, **ATP** and **NADPH**.

The second set, the **Calvin cycle**, takes place in the fluid around the thylakoids, called the stroma. It does not use light directly. Instead, it uses the ATP and NADPH from the first stage to build sugar. An enzyme called rubisco attaches carbon dioxide to a five-carbon molecule. After a series of steps, carbon is released as a three-carbon sugar, and two of those can join to make glucose. In this stage, the carbon in the sugar comes from carbon dioxide, the hydrogen comes from NADPH (and so from water), and the energy comes from ATP and NADPH, which came from light.

Track the atoms and you can answer the old question about where a tree comes from. In the 1600s, Jan van Helmont grew a willow in a measured amount of soil. After five years the tree had gained about 74 kg and the soil had lost about 60 g. He concluded, correctly in part, that the tree gained its mass from water. We now know that most of the dry mass came from carbon dioxide, which he did not measure.

The sugar made in the Calvin cycle is a building block. With extra energy and nitrogen from nitrate taken up by the roots, the plant makes amino acids, and from those, proteins. Sugar is also built into starch for storage, cellulose for cell walls, and lipids. A corn field in central Ohio takes carbon dioxide from the air, but it still needs nitrogen from the soil, which is why farmers fertilize.
`,
  ],
  cards: [
    ["Light-dependent reactions", "Reactions in the thylakoid membranes that capture light and make ATP and NADPH."],
    ["Calvin cycle", "Reactions in the stroma that use ATP and NADPH to build sugar from carbon dioxide."],
    ["Thylakoid", "A flattened membrane sac in the chloroplast where light is captured."],
    ["Stroma", "The fluid of the chloroplast where the Calvin cycle takes place."],
    ["NADPH", "An electron carrier made in the light reactions and used to build sugar."],
    ["Rubisco", "The enzyme that attaches carbon dioxide to a five-carbon molecule in the Calvin cycle."],
    ["Carbon fixation", "Joining carbon dioxide to an organic molecule."],
    ["By-product", "A substance made along with the main product, such as oxygen in photosynthesis."],
  ],
  closed: [
    [
      "Where does the oxygen released in photosynthesis come from?",
      ["Carbon dioxide", "Water", "Glucose", "Chlorophyll"],
      "B",
    ],
    [
      "Where do the light-dependent reactions occur?",
      ["Stroma", "Cytoplasm", "Thylakoid membranes", "Nucleus"],
      "C",
    ],
    [
      "What does the Calvin cycle use from the light reactions?",
      ["Oxygen and water", "ATP and NADPH", "Glucose and oxygen", "Chlorophyll and light"],
      "B",
    ],
    [
      "A plant is kept in complete darkness but given carbon dioxide. Why does sugar production quickly stop?",
      [
        "Carbon dioxide cannot enter in the dark",
        "No ATP or NADPH is made, so the Calvin cycle cannot continue",
        "Rubisco needs light to be made",
        "Water is used up",
      ],
      "B",
    ],
    [
      "Leaves look green because chlorophyll:",
      ["Absorbs green light", "Reflects green light and absorbs mostly red and blue", "Makes green pigments from glucose", "Absorbs all colors equally"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare what happens in the light-dependent reactions and in the Calvin cycle. State where each occurs, what goes in, and what comes out.",
      scheme: [
        "States the light reactions occur in the thylakoid membranes and the Calvin cycle in the stroma",
        "States that the light reactions take in light and water",
        "States that the light reactions produce ATP, NADPH and oxygen",
        "States that the Calvin cycle takes in carbon dioxide, ATP and NADPH and produces sugar",
      ],
      model:
        "The light reactions occur in the thylakoid membranes; the Calvin cycle occurs in the stroma. The light reactions take in light and water and make ATP, NADPH and oxygen. The Calvin cycle uses carbon dioxide, ATP and NADPH to make sugar.",
      answers: [
        [
          "full",
          "[[0|The light reactions are in the thylakoids and the Calvin cycle is in the stroma.]] [[1|The light reactions use light and water]] and [[2|make ATP, NADPH and oxygen]]. [[3|The Calvin cycle uses carbon dioxide with the ATP and NADPH to make sugar.]]",
          "Full marks. The way the output of the first stage becomes the input of the second is clear.",
        ],
        [
          "full",
          "[[0|Stage one happens in the thylakoid membranes, stage two in the stroma.]] [[1|Stage one takes in light energy and splits water.]] [[2|It produces oxygen, ATP and NADPH.]] [[3|In stage two, carbon dioxide is fixed using that ATP and NADPH and the result is a three-carbon sugar.]]",
          "All four marks, and you gave the three-carbon sugar detail.",
        ],
        [
          "partial",
          "[[0|Light reactions in the thylakoid, Calvin cycle in the stroma.]] [[3|The Calvin cycle makes sugar.]] The light reactions make glucose from carbon dioxide.",
          "The light reactions do not use carbon dioxide. They use light and water, and make ATP, NADPH and oxygen.",
        ],
        [
          "partial",
          "[[1|The light reactions need light and water]] and [[2|give out oxygen, ATP and NADPH]]. The Calvin cycle is in the thylakoid too.",
          "The light reactions are well explained. The Calvin cycle is in the stroma, and you should say what goes in and comes out.",
          true,
        ],
        [
          "weak",
          "Both stages happen anywhere in the cell and both need light to make glucose.",
          "The stages happen in different parts of the chloroplast, and only the first needs light directly. Draw a chloroplast and place each stage.",
        ],
        [
          "weak",
          "[[2|The light reactions make oxygen.]] The Calvin cycle uses oxygen to make sugar.",
          "Oxygen is released in the first stage. The Calvin cycle uses carbon dioxide, not oxygen, and it makes sugar.",
        ],
      ],
    },
    {
      prompt:
        "Van Helmont's willow gained about 74 kg while the soil lost about 0.06 kg. He concluded the tree's mass came from water. Use what you know about photosynthesis to evaluate his conclusion.",
      scheme: [
        "Uses the data to support that the soil was not the main source of mass",
        "States that water is part of the answer, as it supplies hydrogen and the electrons",
        "States that most of the dry mass is carbon, which came from carbon dioxide in the air",
        "Explains that carbon dioxide is fixed in the Calvin cycle into sugar and other molecules",
      ],
      model:
        "The data supports van Helmont's conclusion that the soil was not the main source, since it lost only 0.06 kg. But water is only part of the answer. Most of the dry mass of a tree is carbon, and that carbon came from carbon dioxide in the air, which the Calvin cycle fixes into sugar that is built into cellulose and other molecules.",
      answers: [
        [
          "full",
          "[[0|The soil lost only 0.06 kg so he was right that it wasn't the main source.]] [[1|Water does contribute, since its hydrogen ends up in sugar.]] [[2|But most of the dry mass of wood is carbon, which comes from carbon dioxide in the air.]] [[3|The Calvin cycle fixes that CO2 into sugar which gets built into cellulose.]]",
          "Full marks. You judged his conclusion as partly right and said what is missing.",
        ],
        [
          "full",
          "[[0|His data show the soil didn't supply the mass.]] [[1|Water supplies some hydrogen and oxygen.]] [[2|However, he didn't know that most of a plant's dry weight is carbon from CO2.]] [[3|Plants fix CO2 in the Calvin cycle to make sugar and build the wood from it.]]",
          "All four marks. A balanced evaluation.",
        ],
        [
          "partial",
          "[[0|The soil only lost 0.06 kg so the tree didn't get its mass from the soil.]] [[2|It got most of it from CO2.]]",
          "Good. Evaluate the water claim and say how the CO2 becomes tree mass in the Calvin cycle.",
        ],
        [
          "partial",
          "[[1|Water is part of it]] and he was right. [[3|The Calvin cycle makes sugar.]]",
          "He was only partly right. Say what the mass is mostly made of and where that carbon comes from.",
          true,
        ],
        [
          "weak",
          "He was completely right. The tree is made of water because plants drink a lot.",
          "Water is part of the answer, but a plant's dry mass is mostly carbon. Think about what wood is made of.",
        ],
        [
          "weak",
          "[[0|The soil lost almost nothing.]] So the tree must have gotten the mass from the sun.",
          "Light supplies energy, not mass. The mass comes from atoms, mostly carbon from carbon dioxide.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Cellular respiration in stages, and energy accounting",
  note: `
## Objectives

Students will be able to:

1. model cellular respiration as a sequence of stages that breaks bonds in glucose and builds ATP;
2. compare photosynthesis and respiration as a cycle of matter and a one-way flow of energy, with numbers.

## Materials

Atom model kits, a stage-by-stage poster, a data table of ATP yields, the problem set.

## Starter (6 minutes)

Ask: "A runner burns about 100 Calories per mile. How is a cookie turned into movement?" Collect steps and use the answers to organize the lesson.

## Main activity

1. Break glucose into its stages: glycolysis in the cytoplasm, the Krebs cycle in the mitochondrial matrix, and the electron transport chain on the inner membrane, where oxygen is the final electron acceptor and water is formed.
2. Compare ATP yields: about 2 from glycolysis alone (fermentation) and about 30 or more with oxygen. Use this to explain why oxygen matters.
3. Atom accounting: count C, H and O in the reactants and products of both processes and show that mass is conserved while energy is not recycled.

## Checking for understanding

Ask: "Why does your breathing stay fast for a minute after you stop running?" Look for oxygen debt and lactate.

## Problem set

Atom counting, ATP comparison, and a short energy-flow explanation.
`,
  reading: [
    "Respiration: taking apart glucose, step by step",
    `
When you eat a cookie, its energy is not released all at once like a flame. Cells take glucose apart in small steps, and at each step they capture some of the energy in the form of **ATP**. This is **cellular respiration**, and it has three main stages.

The first, **glycolysis**, takes place in the cytoplasm and does not need oxygen. One glucose molecule with six carbons is split into two molecules of pyruvate with three carbons each. This yields a net gain of 2 ATP. If oxygen is not available, cells can continue with **fermentation**, which converts pyruvate to lactate in animal cells or to ethanol and carbon dioxide in yeast. Fermentation lets glycolysis continue, but it produces only the same 2 ATP per glucose, which is why intense exercise without enough oxygen cannot be sustained.

With oxygen present, pyruvate enters the mitochondrion. In the **Krebs cycle**, which occurs in the matrix, the carbon atoms are released as carbon dioxide, which you breathe out, and electron carriers are loaded with energy. In the third stage, the **electron transport chain**, which is on the inner membrane of the mitochondrion, the carriers pass their electrons along a series of proteins. The energy released builds up a gradient of hydrogen ions, and an enzyme called ATP synthase uses that gradient to make ATP. At the end of the chain oxygen accepts the electrons and combines with hydrogen to form water. That is why we need to breathe oxygen. Altogether, aerobic respiration yields about 30 to 32 ATP per glucose, many times more than fermentation.

Atoms are conserved. The overall equation, C6H12O6 plus 6 O2 yielding 6 CO2 plus 6 H2O plus energy, has 6 C, 12 H and 18 O on each side. The carbon in your exhaled carbon dioxide was in glucose, and the glucose was built from carbon dioxide by a plant. Matter cycles. Energy does not: the energy captured as ATP is used for work and finally released as heat, which cannot be recycled by cells. About 60 percent of the energy in glucose is lost as heat even in the best case, which is why you feel warm when you exercise.
`,
  ],
  cards: [
    ["Glycolysis", "The first stage of respiration, splitting glucose into two pyruvate in the cytoplasm."],
    ["Krebs cycle", "The stage in the mitochondrial matrix that releases carbon dioxide and loads electron carriers."],
    ["Electron transport chain", "The final stage on the inner mitochondrial membrane, which makes most ATP."],
    ["ATP synthase", "The enzyme that makes ATP using a hydrogen ion gradient."],
    ["Pyruvate", "A three-carbon molecule made when glucose is split in glycolysis."],
    ["Fermentation", "Making ATP without oxygen, by glycolysis followed by making lactate or ethanol."],
    ["Aerobic", "Using oxygen."],
    ["Final electron acceptor", "Oxygen, which combines with hydrogen to form water at the end of the chain."],
  ],
  closed: [
    [
      "Which stage of respiration does not need oxygen?",
      ["Krebs cycle", "Electron transport chain", "Glycolysis", "ATP synthase"],
      "C",
    ],
    [
      "Approximately how much ATP is made per glucose in aerobic respiration?",
      ["2", "4", "30 to 32", "100"],
      "C",
    ],
    [
      "Where does the electron transport chain occur?",
      ["Cytoplasm", "Mitochondrial matrix", "Inner mitochondrial membrane", "Nucleus"],
      "C",
    ],
    [
      "How many oxygen atoms are on the reactant side of C6H12O6 + 6 O2?",
      ["6", "12", "18", "24"],
      "C",
    ],
    [
      "A sprinter's muscles run short of oxygen. What do the muscle cells do to keep making some ATP?",
      [
        "Switch to photosynthesis",
        "Carry on with glycolysis and make lactate by fermentation",
        "Stop making ATP",
        "Use the Calvin cycle",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain why a muscle cell with oxygen makes far more ATP from one glucose than a muscle cell without oxygen. Refer to the stages involved.",
      scheme: [
        "States that without oxygen only glycolysis (with fermentation) occurs",
        "States that glycolysis yields only about 2 ATP per glucose",
        "States that with oxygen the Krebs cycle and electron transport chain also occur",
        "States that oxygen is the final electron acceptor and the chain makes about 30 or more ATP",
      ],
      model:
        "Without oxygen, the cell can only carry out glycolysis followed by fermentation, which gives a net of 2 ATP per glucose. With oxygen, pyruvate goes on to the Krebs cycle and the electron transport chain. Oxygen is the final electron acceptor that keeps the chain running, and the chain makes about 30 or more ATP per glucose.",
      answers: [
        [
          "full",
          "[[0|Without oxygen the cell can only do glycolysis and then fermentation.]] [[1|That only gets 2 ATP per glucose.]] [[2|With oxygen, the pyruvate goes on into the Krebs cycle and the electron transport chain.]] [[3|Oxygen is the last electron acceptor, so the chain keeps going and it makes around 30 ATP.]]",
          "Full marks. Linking oxygen to the continuing of the chain is the key idea.",
        ],
        [
          "full",
          "[[0|Anaerobic cells stop after glycolysis and ferment pyruvate.]] [[1|Glycolysis nets only 2 ATP.]] [[2|Aerobic cells use the Krebs cycle and the electron transport chain as well.]] [[3|Oxygen accepts the electrons at the end of the chain, and the chain yields 30 to 32 ATP.]]",
          "All four marks, with accurate numbers.",
        ],
        [
          "partial",
          "[[1|Glycolysis gives 2 ATP.]] [[2|With oxygen the Krebs cycle and electron transport also happen]] so you get more.",
          "Good. Say what happens without oxygen (fermentation) and what oxygen does in the chain.",
        ],
        [
          "partial",
          "[[3|Oxygen is the final electron acceptor so the chain makes lots of ATP.]] [[0|Without oxygen, nothing happens at all.]]",
          "Without oxygen, glycolysis and fermentation continue and give a small amount of ATP. Your oxygen point is right.",
          true,
        ],
        [
          "weak",
          "With oxygen the cell makes more because oxygen is turned into ATP.",
          "Oxygen is not converted into ATP. It accepts electrons at the end of the chain, which allows ATP synthase to keep running.",
        ],
        [
          "weak",
          "[[1|Glycolysis gives 2 ATP.]] The rest of the energy is stored in the lactate forever.",
          "You have the 2 ATP. Energy is not stored forever in lactate; the aerobic stages get the extra ATP when oxygen is present.",
        ],
      ],
    },
    {
      prompt:
        "Show with an atom count that matter is conserved in respiration, and explain why energy, unlike carbon, does not cycle back to be reused by cells.",
      scheme: [
        "Counts 6 C, 12 H and 18 O on the reactant side",
        "Counts 6 C, 12 H and 18 O on the product side and concludes atoms are conserved",
        "States that energy is released as heat when ATP is used",
        "States that heat cannot be recaptured by cells, so energy flows in one direction and needs a constant source",
      ],
      model:
        "The reactants C6H12O6 and 6 O2 contain 6 C, 12 H and 18 O. The products 6 CO2 and 6 H2O contain 6 C, 12 H and 18 O, so atoms are conserved. Energy used from ATP ends up as heat, which cells cannot recapture, so energy flows one way through an ecosystem and a constant supply of light is needed.",
      answers: [
        [
          "full",
          "[[0|Reactants: glucose has 6 C, 12 H, 6 O and 6 O2 adds 12 O, so 6 C, 12 H, 18 O.]] [[1|Products: 6 CO2 has 6 C and 12 O, and 6 H2O has 12 H and 6 O, which is also 6 C, 12 H, 18 O, so matter is conserved.]] [[2|Energy ends up as heat when ATP is used.]] [[3|Cells can't turn that heat back into chemical energy so energy flows one way and needs sunlight all the time.]]",
          "Full marks. The count is complete on both sides.",
        ],
        [
          "full",
          "[[0|Left side: C6H12O6 plus 6 O2 gives 6 carbon, 12 hydrogen and 18 oxygen.]] [[1|Right side: 6 CO2 plus 6 H2O is also 6 C, 12 H, 18 O. Nothing is lost.]] [[2|The energy from ATP gets released as heat in the body.]] [[3|Heat can't be reused by organisms to make food so the ecosystem keeps needing new energy from the sun.]]",
          "All four marks, and a precise contrast between matter and energy.",
        ],
        [
          "partial",
          "[[0|The reactants have 6 C, 12 H and 18 O.]] [[1|The products have 6 C and 6 H2O so it is balanced.]] Energy cycles like carbon does.",
          "Your product count needs all the atoms, including 12 H and 18 O. And energy does not cycle: it ends up as heat.",
        ],
        [
          "partial",
          "[[2|Energy is lost as heat.]] [[3|It can't be reused so we need the sun.]]",
          "Your explanation of energy is good. Add the atom counts for both sides to show matter is conserved.",
          true,
        ],
        [
          "weak",
          "There are more atoms in the products because the glucose breaks into more pieces.",
          "Breaking a molecule into more pieces does not add atoms. Count the carbon, hydrogen and oxygen on each side again.",
        ],
        [
          "weak",
          "[[0|There are 6 C, 12 H and 18 O to start.]] Energy goes around in a circle like carbon because nature recycles everything.",
          "Your reactant count is right. But energy is lost as heat at each step, so it does not recycle.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "The cell cycle, its control and feedback in organisms",
  note: `
## Objectives

Students will be able to:

1. model mitosis as the mechanism for growth and the replacement of cells;
2. describe the phases of the cell cycle and explain how checkpoints and signals regulate it;
3. plan an investigation of a feedback mechanism that keeps an internal condition stable.

## Materials

Onion root tip slides, a data sheet of cell counts, graph paper, the worksheet.

## Starter (6 minutes)

Show a count of cells in each phase from 200 cells in an onion root tip: 164 in interphase, 20 in prophase, 6 in metaphase, 4 in anaphase and 6 in telophase. Ask: "What does this tell us about how long each phase lasts?"

## Main activity

1. Work out the proportion of time in each phase if the whole cycle takes 24 hours. Interphase is 164/200 x 24 h, about 19.7 hours.
2. Introduce the control system: cyclins and kinases, the G1/S, G2/M and spindle checkpoints, and what happens when p53 detects DNA damage. Link to cancer as a loss of control.
3. Plan an investigation of negative feedback: how does heart rate recover after exercise, and what would a good dataset include?

## Checking for understanding

Ask students to predict what happens to a cell with a faulty p53 gene.

## Worksheet

Calculations of phase length, a checkpoint explanation and an investigation plan.
`,
  reading: [
    "Dividing under control",
    `
The cell cycle has two main parts. **Interphase** is the long stage in which the cell grows (G1), copies its DNA (S) and prepares to divide (G2). **Mitosis** is the short stage in which the copied chromosomes are separated, followed by **cytokinesis**, in which the cytoplasm divides. Each chromosome is copied into two identical **sister chromatids**, held together at the centromere. In prophase the chromosomes condense and the spindle forms. In metaphase, the chromosomes line up at the equator. In anaphase, the sister chromatids are pulled apart. In telophase, two nuclei re-form. Mitosis makes two daughter cells with the same DNA as the parent, which is why it supports growth and replacement of cells, such as the lining of your gut, which is replaced every few days.

You can estimate how long each phase lasts by counting. If you examine 200 cells from an onion root tip and find 164 in interphase, the fraction in interphase is 164/200 = 0.82. If a full cycle takes 24 hours, interphase lasts about 0.82 x 24, which is 19.7 hours. Mitosis is short, so few cells are caught in it at any moment.

The cycle is controlled at **checkpoints**. At the G1 checkpoint, the cell checks its size, nutrients and DNA. At the G2 checkpoint it checks that DNA was copied correctly. At the spindle checkpoint in metaphase it checks that all chromosomes are attached before anaphase. The signals are proteins such as **cyclins**, which rise and fall in each cycle, and enzymes called kinases that cyclins activate. When DNA is damaged, a protein called **p53** halts the cycle for repair or triggers cell death. If the p53 gene is damaged, cells with mutations may keep dividing, which is a step toward **cancer**, a disease of uncontrolled division.

Organisms also keep conditions stable by **feedback**. In **negative feedback**, the response reduces the original change. After exercise, carbon dioxide in the blood rises, receptors detect it, and the brain raises the heart and breathing rate. As the carbon dioxide falls, the signals ease. In **positive feedback**, such as the contractions of childbirth, the response strengthens the change until an endpoint is reached. To investigate feedback, record a variable over time, for example heart rate every 15 seconds for five minutes after exercise, with several people to allow a mean.
`,
  ],
  cards: [
    ["Interphase", "The growth and DNA-copying part of the cell cycle (G1, S and G2)."],
    ["Sister chromatids", "The two identical copies of a chromosome after DNA replication."],
    ["Cytokinesis", "Division of the cytoplasm to form two daughter cells."],
    ["Checkpoint", "A point at which the cell cycle can be paused if conditions are not right."],
    ["Cyclin", "A protein that rises and falls to drive the cell cycle forward."],
    ["p53", "A protein that halts the cycle when DNA is damaged."],
    ["Cancer", "A disease in which cells divide without the normal controls."],
    ["Positive feedback", "A response that strengthens the change that triggered it."],
  ],
  closed: [
    [
      "In a count of 200 root tip cells, 20 are in prophase. If the whole cycle takes 24 hours, about how long does prophase last?",
      ["2.4 hours", "0.24 hours", "20 hours", "4.8 hours"],
      "A",
    ],
    [
      "At which stage are sister chromatids pulled apart?",
      ["Prophase", "Metaphase", "Anaphase", "Telophase"],
      "C",
    ],
    [
      "What does the p53 protein do when it detects DNA damage?",
      ["Speeds up division", "Halts the cycle for repair or triggers cell death", "Copies the DNA again", "Moves the chromosomes"],
      "B",
    ],
    [
      "Which is an example of positive feedback?",
      [
        "Sweating when too hot",
        "Insulin lowering blood glucose",
        "Contractions during childbirth strengthening each other",
        "Breathing rate falling after exercise",
      ],
      "C",
    ],
    [
      "Why can a mutation in the p53 gene lead to cancer?",
      [
        "Cells with damaged DNA may continue to divide without being halted",
        "The cell stops making ATP",
        "The cell cannot enter interphase",
        "The nucleus disappears",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "In a count of 250 onion root tip cells, 205 are in interphase, 25 in prophase, 8 in metaphase, 7 in anaphase and 5 in telophase. If the cell cycle takes 20 hours, calculate how long the cells spend in interphase and in prophase, and say which phase of mitosis is shortest.",
      scheme: [
        "Calculates the fraction in interphase as 205/250 = 0.82",
        "Calculates interphase length as 16.4 hours",
        "Calculates prophase length as 25/250 x 20 = 2 hours",
        "Identifies telophase as the shortest phase of mitosis, with 5 cells",
      ],
      model:
        "Interphase is 205 out of 250 cells, which is 0.82, so it lasts 0.82 x 20 = 16.4 hours. Prophase is 25/250 x 20 = 2 hours. Telophase has the fewest cells, 5, so it is the shortest phase of mitosis.",
      answers: [
        [
          "full",
          "[[0|205 out of 250 is 0.82 of the cells in interphase.]] [[1|0.82 times 20 hours is 16.4 hours.]] [[2|Prophase is 25/250 = 0.1, and 0.1 × 20 = 2 hours.]] [[3|Telophase has the fewest cells, only 5, so it is the shortest.]]",
          "Full marks. Counting is a good stand-in for timing because a random sample catches each phase in proportion to its length.",
        ],
        [
          "full",
          "[[0|Interphase fraction: 205/250 = 0.82.]] [[1|Time: 0.82 × 20 = 16.4 h.]] [[2|Prophase: 25/250 × 20 = 2 h.]] [[3|The smallest number is in telophase (5), so telophase is the shortest.]]",
          "All four marks, in a clear and organized layout.",
        ],
        [
          "partial",
          "[[0|205/250 = 0.82.]] [[1|0.82 × 20 = 16.4 hours.]] Prophase is 25 hours because there are 25 cells. The shortest is anaphase.",
          "Interphase is right. Prophase needs the fraction of cells (25/250) multiplied by 20 hours, not the number of cells. Telophase has the fewest cells.",
        ],
        [
          "partial",
          "[[2|25 / 250 × 20 = 2 hours for prophase.]] [[3|The shortest is telophase.]] Interphase is 20 hours because it's the biggest.",
          "Prophase and telophase are right. Interphase is a fraction of the cycle: 205/250 of 20 hours is 16.4 hours.",
          true,
        ],
        [
          "weak",
          "205 + 25 = 230 hours. The shortest phase is interphase because it is the first phase.",
          "You are adding cell counts and treating them as hours. Divide each count by 250 and multiply by 20 hours. Interphase is the longest phase.",
        ],
        [
          "weak",
          "[[3|Telophase is the smallest number so it is the shortest.]] To get the times you multiply 205 by 20 and 25 by 20.",
          "Telophase is right. To find time, use the fraction of cells in the phase, for example 205/250, times the 20 hours of the cycle.",
        ],
      ],
    },
    {
      prompt:
        "Design an investigation to show negative feedback in the control of heart rate after exercise. Include the variables, the measurements, the controls and the pattern you expect.",
      scheme: [
        "Identifies the independent variable as time since exercise stopped or exercise intensity",
        "Identifies the dependent variable as heart rate, measured in beats per minute at set intervals",
        "Names controlled variables such as the same exercise, the same participants or a rested baseline",
        "Predicts heart rate rising then falling back toward the resting level, and links this to negative feedback",
      ],
      model:
        "I would have several students do the same two minutes of step-ups. The independent variable is time since stopping, and the dependent variable is heart rate in beats per minute, recorded every 30 seconds for five minutes, after a resting baseline. I would control the exercise, the room and the people, and use the mean of the group. I expect the rate to peak and then fall back toward the resting rate, which is negative feedback.",
      answers: [
        [
          "full",
          "[[0|The independent variable is the time after exercise stops.]] [[1|The dependent variable is the heart rate in beats per minute, recorded every 30 seconds for five minutes.]] [[2|We would keep the exercise the same, the same people, and take a resting rate first.]] [[3|I expect the heart rate to be high then drop back to the resting rate, because negative feedback reverses the change.]]",
          "Full marks. A complete design with an expected pattern and the link to feedback.",
        ],
        [
          "full",
          "[[0|Independent: minutes after two minutes of step-ups.]] [[1|Dependent: heart rate in bpm measured every 30 seconds.]] [[2|Controlled: same step height, same students, same room, and a resting baseline reading.]] [[3|Prediction: the heart rate peaks and then falls toward resting. That shows negative feedback because the response reduces the change.]]",
          "All four marks. The baseline reading is a good detail.",
        ],
        [
          "partial",
          "[[1|We would measure heart rate every 30 seconds in beats per minute.]] [[3|It should go down after the exercise, which is negative feedback.]]",
          "Good. Name the independent variable and the controlled variables, since a fair test depends on them.",
        ],
        [
          "partial",
          "[[0|The independent variable is time after exercise.]] [[2|We keep the exercise the same.]] The heart rate will keep going up.",
          "After exercise, the heart rate falls as feedback restores the normal level. Also say how you will measure it.",
          true,
        ],
        [
          "weak",
          "We would exercise and see how tired people get. Tired is the dependent variable.",
          "Tiredness is hard to measure. Use a measurable variable such as heart rate in beats per minute at set times.",
        ],
        [
          "weak",
          "[[2|We keep the people the same.]] Then we do different exercise each time and see which is best.",
          "Keeping the people the same is good, but changing the exercise makes it two variables at once. Keep the exercise the same and change the time of measurement.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Tissues, organs and hormonal control of blood glucose",
  note: `
## Objectives

Students will be able to:

1. describe how specialized cells form tissues, and tissues form organs, with structure matched to function;
2. explain the hormonal feedback that holds blood glucose and body temperature in a narrow range and what happens when it fails.

## Materials

Glucose tolerance data, a graphing sheet, simulated glucose curves, pictures of tissue slides, the practical sheet.

## Starter (6 minutes)

Show two graphs of blood glucose over four hours after a meal: one from a person without diabetes and one with type 1 diabetes. Ask: "What is different, and what does it tell us about the control system?"

## Main activity

1. Review tissue types and make a table matching a specialized cell (cardiac muscle, alveolar cell, root hair) to its structure and function.
2. Trace the glucose loop: stimulus, receptor (beta cells), control center (pancreas), effector (liver, muscle), response. Include insulin and glucagon as antagonistic hormones.
3. Practical: analyze a simulated glucose tolerance test and compare curves for a healthy person, type 1 and type 2 diabetes.

## Checking for understanding

Ask: "Why do type 1 patients need injected insulin but type 2 patients often start with diet changes?"

## Practical write-up

Collect the analysis and conclusions.
`,
  reading: [
    "Antagonistic hormones and the glucose balance",
    `
Specialized cells build tissues, and the structure of each cell suits its work. Cardiac muscle cells are branched and joined by intercalated discs, which let a signal pass quickly so the heart contracts as a unit. Cells in the walls of the lungs' alveoli are extremely thin, which keeps the gas diffusion path short. Tissues combine into organs, and the pancreas is a good example: most of it makes digestive enzymes, but clusters of cells called the islets of Langerhans make hormones.

Hormones are chemical messengers carried in the blood. Blood glucose is kept near 90 mg per deciliter by two **antagonistic** hormones, which are hormones that act in opposite directions. When glucose rises after a meal, **beta cells** in the pancreas release **insulin**. Insulin binds to receptors on muscle, fat and liver cells and causes glucose transporters to move to the membrane, so glucose enters the cells. The liver also converts glucose to the storage molecule glycogen. Blood glucose falls. When glucose drops, as between meals, **alpha cells** release **glucagon**, which tells the liver to break down glycogen and release glucose. This is negative feedback with two effectors.

In **type 1 diabetes**, the immune system destroys beta cells, so little insulin is made. People need insulin by injection or pump. In **type 2 diabetes**, cells respond poorly to insulin, and eventually the pancreas may not keep up. A glucose tolerance test reveals the difference. After a drink containing 75 g of glucose, a healthy person's blood glucose peaks at about 140 mg/dL and returns to normal within two hours. A person with diabetes may have a fasting level above 126 mg/dL and a two-hour value above 200.

Body temperature is regulated by the hypothalamus, which acts as a thermostat. If you overheat, blood vessels in the skin widen and sweat glands release sweat, losing heat. If you get cold, vessels narrow and muscles shiver to generate heat. These loops share the same structure: a stimulus, a receptor, a control center, an effector and a response that returns the condition toward the set point.
`,
  ],
  cards: [
    ["Antagonistic hormones", "Hormones that have opposite effects, such as insulin and glucagon."],
    ["Beta cell", "A pancreas cell that makes insulin."],
    ["Alpha cell", "A pancreas cell that makes glucagon."],
    ["Glycogen", "The storage form of glucose in the liver and muscle."],
    ["Type 1 diabetes", "A condition in which the immune system destroys beta cells so little insulin is made."],
    ["Type 2 diabetes", "A condition in which cells respond poorly to insulin."],
    ["Hypothalamus", "The brain region that acts as the body's thermostat."],
    ["Set point", "The normal value that a feedback system works to maintain."],
  ],
  closed: [
    [
      "Which hormone causes the liver to convert glycogen into glucose?",
      ["Insulin", "Glucagon", "Thyroxine", "Pepsin"],
      "B",
    ],
    [
      "In type 1 diabetes, the main problem is that:",
      [
        "Cells do not respond to insulin",
        "The immune system destroys insulin-making beta cells",
        "The liver makes too much glycogen",
        "The kidney cannot filter glucose",
      ],
      "B",
    ],
    [
      "Insulin and glucagon are called antagonistic because they:",
      ["Are made by different organs", "Have opposite effects on blood glucose", "Are both made by the liver", "Are both enzymes"],
      "B",
    ],
    [
      "A person's fasting blood glucose is 135 mg/dL and their two-hour value is 215 mg/dL. These values most likely suggest:",
      ["Normal glucose control", "Low blood sugar", "Diabetes", "Too much glucagon"],
      "C",
    ],
    [
      "What is the hypothalamus's role in temperature control?",
      ["It is the effector that sweats", "It acts as the control center comparing temperature to the set point", "It makes insulin", "It stores heat"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how insulin and glucagon work together to keep blood glucose steady between meals and after a meal, and why this is called negative feedback.",
      scheme: [
        "States that after a meal glucose rises and beta cells release insulin",
        "States that insulin makes cells and the liver take up glucose or store it as glycogen, lowering blood glucose",
        "States that between meals glucose falls and alpha cells release glucagon so the liver releases glucose",
        "States that each response reverses the change that triggered it, which is negative feedback",
      ],
      model:
        "After a meal blood glucose rises, so beta cells release insulin. Insulin causes cells to take up glucose and the liver to store it as glycogen, so glucose falls. Between meals glucose falls and alpha cells release glucagon, which causes the liver to break glycogen down into glucose. In each case the response reverses the change that triggered it, which is negative feedback.",
      answers: [
        [
          "full",
          "[[0|When blood glucose goes up after eating, the beta cells in the pancreas release insulin.]] [[1|Insulin makes the muscle and liver cells take in glucose and the liver stores it as glycogen, so blood glucose goes down.]] [[2|When glucose gets low between meals, alpha cells release glucagon and the liver breaks down glycogen to release glucose.]] [[3|Each response undoes the change that started it, so it's negative feedback.]]",
          "Full marks. You used the correct cells and showed both directions of the loop.",
        ],
        [
          "full",
          "[[0|A meal raises blood glucose and beta cells respond with insulin.]] [[1|Insulin brings glucose into cells and promotes glycogen formation in the liver, which lowers the level.]] [[2|Fasting lowers glucose, which signals alpha cells to release glucagon so the liver turns glycogen to glucose.]] [[3|The response in each case opposes the change, which is why it's called negative feedback.]]",
          "All four marks. Careful and complete.",
        ],
        [
          "partial",
          "[[0|After a meal beta cells release insulin.]] [[1|It lowers blood glucose by moving it into cells.]] Glucagon does the same job as insulin.",
          "Glucagon does the opposite of insulin: it raises blood glucose. Add what triggers it and what the liver does.",
        ],
        [
          "partial",
          "[[2|Glucagon is released when glucose is low and makes the liver release glucose.]] [[3|It's negative feedback because it fixes the change.]]",
          "Good on glucagon and the feedback idea. Add the first half of the loop: what happens to insulin after a meal.",
          true,
        ],
        [
          "weak",
          "Insulin is made by the liver and glucagon is made by the kidney. They keep the glucose steady.",
          "Both are made in the pancreas, insulin by beta cells and glucagon by alpha cells. Review the reading on where each is made.",
        ],
        [
          "weak",
          "[[3|It is negative feedback.]] That means it is a bad kind of feedback that makes the body worse.",
          "Negative here does not mean bad. It means the response reduces the change, which keeps things stable.",
        ],
      ],
    },
    {
      prompt:
        "A glucose tolerance test shows that Person A's blood glucose peaks at 140 mg/dL and returns to 95 within two hours. Person B starts at 140 and peaks at 290 mg/dL, still at 250 after two hours. Compare them and suggest what each pattern shows about insulin.",
      scheme: [
        "Says Person A returns to normal levels, showing a working insulin response",
        "Says Person B's glucose rises much higher and stays high",
        "Suggests Person B has diabetes, as insulin is either missing or not effective",
        "Distinguishes the two possibilities, type 1 (not enough insulin) or type 2 (cells respond poorly)",
      ],
      model:
        "Person A's glucose rises and returns to normal within two hours, which shows a working insulin response. Person B starts high, rises to 290 and is still at 250 after two hours, so glucose is not being cleared. This suggests diabetes: in type 1 there is not enough insulin because beta cells are destroyed, and in type 2 the cells do not respond properly to the insulin.",
      answers: [
        [
          "full",
          "[[0|Person A's glucose goes back to 95 so their insulin is working properly.]] [[1|Person B's goes much higher and is still 250 after two hours.]] [[2|That suggests B has diabetes because the glucose isn't being cleared.]] [[3|It could be type 1 where not enough insulin is made, or type 2 where cells don't respond to it.]]",
          "Full marks. You compared the data and gave both possible causes.",
        ],
        [
          "full",
          "[[0|A's curve rises a bit and returns to normal, a healthy insulin response.]] [[1|B's curve peaks at 290 and stays above 250.]] [[2|B's glucose isn't being taken up, which points to diabetes.]] [[3|The test can't tell type 1 from type 2: either there's little insulin, or cells are insulin-resistant.]]",
          "All four marks. Recognizing that one test cannot separate the types shows careful thinking.",
        ],
        [
          "partial",
          "[[0|Person A's blood glucose goes back to normal.]] [[1|B's goes much higher.]] B has too much insulin.",
          "Too much insulin would lower glucose. B's high glucose suggests too little insulin or cells that do not respond.",
        ],
        [
          "partial",
          "[[2|B probably has diabetes.]] [[3|Maybe type 1 or type 2.]]",
          "Good. Support it with data from the curves: how high B's glucose rose and how long it stayed high.",
          true,
        ],
        [
          "weak",
          "Person B ate more sugar than A. That's why the glucose is higher and it doesn't mean anything is wrong.",
          "In a tolerance test both people drink the same amount of glucose. The difference is in how the body clears it.",
        ],
        [
          "weak",
          "[[0|A returned to normal.]] B is better because the number is bigger so there is more energy.",
          "A high glucose level is not a sign of better health. Staying high means the body is not controlling it.",
        ],
      ],
    },
  ],
  practical: {
    title: "Analyzing glucose tolerance curves",
    instructions:
      "Use the data sheet of blood glucose readings (mg/dL) taken at 0, 30, 60, 90, 120 and 180 minutes after a 75 g glucose drink for three people: a healthy volunteer, a person with type 1 and a person with type 2 diabetes. Graph all three on one set of axes, find the peak and the recovery time for each, and write a CER conclusion.",
    steps: [
      ["Read the data sheet and label each person's readings in a table with units."],
      ["Plot all three curves on one graph with time on the x-axis and glucose on the y-axis."],
      ["Mark the fasting level, the peak and the two-hour value for each curve."],
      ["Calculate the change from fasting to peak for each person and the percent of the peak still left at two hours.", "Use the same units for all three people."],
      ["Describe how each curve differs from the healthy one."],
      ["Write a claim, evidence and reasoning conclusion that links each curve to what insulin is doing."],
    ],
    rubric: [
      ["Data handling: table, graph with labeled axes and units", 4],
      ["Analysis: peak, fasting, recovery and calculations", 4],
      ["Conclusion: claim, evidence and reasoning linked to insulin", 4],
    ],
    writeUps: [
      [
        "full",
        "I graphed the three curves with time in minutes and glucose in mg/dL. The healthy person went from 90 to a peak of 140 at 30 minutes and was back to 95 by 120 minutes. Person with type 1 went from 150 to 320 and was still at 290 after two hours. The person with type 2 went from 130 to 260 and was at 210. The healthy person cleared 97 percent of the rise. The claim is that the healthy volunteer has a working insulin response. The evidence is that glucose returned to the fasting level, which happens when insulin moves glucose into cells.",
        [4, 4, 4],
        "An excellent analysis. The percent cleared is a strong comparison and the reasoning is tied to what insulin does.",
      ],
      [
        "full",
        "Table and graph: time in minutes, glucose in mg/dL, three labeled curves. Analysis: healthy 90 to 140 (change 50), type 1 150 to 320 (change 170), type 2 130 to 260 (change 130). At two hours healthy was 95, type 1 290, type 2 210. Claim: both diabetic curves show impaired insulin control. Evidence: neither returned near fasting levels. Reasoning: in type 1, too little insulin is made, and in type 2 cells respond poorly, so glucose stays in the blood.",
        [4, 4, 3],
        "Very good. Say which of the curves best fits type 1 and why, and your conclusion would be complete.",
      ],
      [
        "partial",
        "I made a graph with the three people. The healthy person went up and then came back down. The type 1 and type 2 people stayed high. The type 1 one was highest. I think that means they do not have enough insulin and that is why the glucose doesn't go down.",
        [2, 2, 2],
        "You described the shapes. Add numbers from the table: the peak, the fasting level and the two-hour value for each person.",
      ],
      [
        "partial",
        "The healthy person peaked at 140 and was back to 95. The type 1 person peaked at 320 and the type 2 person peaked at 260. I did not make a graph because I ran out of time but the table has all the numbers in it with the units.",
        [1, 3, 2],
        "The numbers are good. The graph is a required part, so make it. Then explain what the numbers say about insulin.",
      ],
      [
        "weak",
        "The graph has three lines. The healthy line is the lowest one and the diabetic lines are higher. The sugar is higher because they ate more sugar before the test and this makes the glucose high, so the test is not really fair to them.",
        [1, 1, 0],
        "Everyone drank the same glucose. The difference comes from how well their bodies clear it. Use the data to compare the peaks and the two-hour values.",
      ],
      [
        "weak",
        "Glucose goes up when you drink a sugary drink. All three people went up. Everyone is the same because they all went up so there is no real difference between them, and I did not find a peak or a two-hour value for any of the lines.",
        [0, 1, 0],
        "All three rose, but compare how high and how long. A healthy person's glucose recovers within two hours; the others do not.",
      ],
    ],
  },
};

const w7: WeekInput = {
  topic: "Macromolecules and enzyme kinetics",
  note: `
## Objectives

Students will be able to:

1. describe the four classes of biological macromolecules, their monomers, and how they are assembled and broken down;
2. explain how enzymes lower activation energy and how temperature, pH and substrate concentration change reaction rate.

## Materials

Molecular models, graphs of rate against temperature, pH and substrate concentration, food labels, the worksheet.

## Starter (6 minutes)

Show a food label from a protein bar. Ask: "Which of these ingredients are polymers, and what are they built from?" Link to the monomers on the board.

## Main activity

1. Dehydration synthesis and hydrolysis: use model kits to join two monosaccharides (removing water) and split a dipeptide (adding water).
2. Energy diagram for an enzyme-catalyzed reaction: show the activation energy with and without the enzyme.
3. Interpret three graphs: rate against temperature (a peak then a drop), rate against pH, and rate against substrate concentration (a plateau when all active sites are occupied).

## Checking for understanding

Ask: "Why does the rate level off at high substrate concentration?" Listen for saturation of the enzyme.

## Worksheet

Macromolecule matching, graph interpretation, and one short explanation.
`,
  reading: [
    "Polymers, enzymes and the speed of life",
    `
Most of the large molecules in your body are **polymers**, long chains built from repeating units called **monomers**. Carbohydrates are built from monosaccharides such as glucose. Proteins are built from twenty kinds of amino acids. Nucleic acids are built from nucleotides. Lipids are different: they are not true polymers, but fats are assembled from three fatty acids and one glycerol. Monomers are joined by **dehydration synthesis**, a reaction that removes a molecule of water for each bond. They are broken apart by **hydrolysis**, which adds water. Digestion is hydrolysis: the amylase in saliva hydrolyzes starch into the sugar maltose.

Each class has characteristic roles. Starch and glycogen store glucose, and cellulose gives plant cells strength. Lipids store energy compactly, with more than twice the energy per gram of carbohydrate, and form the phospholipid bilayer of membranes. Proteins serve as enzymes, transport proteins, hormones and structural fibers. DNA and RNA store and transfer information.

Chemical reactions need an input of energy to get started, called **activation energy**. **Enzymes** are proteins that act as catalysts. They lower the activation energy by holding the substrate in an orientation that makes the reaction easier, so the reaction speeds up by a factor of millions without changing the overall energy released. The enzyme is not consumed.

The rate at which an enzyme works depends on conditions. With rising temperature the rate climbs because collisions are more frequent and energetic, until the optimum, often near 37 degrees Celsius in humans. Beyond that, heat disrupts the weak bonds that hold the folded protein in its shape, the active site distorts and the enzyme **denatures**. Each enzyme has an optimum pH, because acidity changes the charges on amino acids in the active site. Pepsin in the stomach is best at about pH 2 and trypsin in the small intestine at about pH 8.

Rate also depends on substrate concentration. At low concentration, adding substrate increases the rate because more active sites are being used. At high concentration, every enzyme is working at its maximum speed, so the rate levels off. The enzymes are said to be **saturated**. Adding more enzyme, not more substrate, would then increase the rate.
`,
  ],
  cards: [
    ["Monomer", "A small unit that joins with others to build a polymer."],
    ["Polymer", "A large molecule made of repeating monomers."],
    ["Dehydration synthesis", "Joining monomers by removing a molecule of water."],
    ["Hydrolysis", "Breaking a bond by adding a molecule of water."],
    ["Activation energy", "The energy needed to start a reaction."],
    ["Catalyst", "A substance that speeds up a reaction without being used up."],
    ["Saturation", "The condition in which all enzyme active sites are occupied, so the rate cannot rise."],
    ["Optimum", "The condition at which an enzyme works fastest."],
  ],
  closed: [
    [
      "Which reaction joins two glucose molecules into maltose?",
      ["Hydrolysis", "Dehydration synthesis", "Fermentation", "Denaturation"],
      "B",
    ],
    [
      "How does an enzyme speed up a reaction?",
      [
        "It adds energy to the reaction",
        "It lowers the activation energy",
        "It is used up in making the product",
        "It raises the temperature",
      ],
      "B",
    ],
    [
      "A graph of enzyme rate against substrate concentration levels off at high concentrations. What does this show?",
      ["The enzyme has denatured", "The enzyme's active sites are saturated", "The substrate is used up", "The pH is wrong"],
      "B",
    ],
    [
      "Trypsin works best at pH 8. In the stomach at pH 2 it would:",
      ["Work faster", "Work at the same rate", "Be unlikely to work well", "Turn into pepsin"],
      "C",
    ],
    [
      "Which molecule stores more energy per gram?",
      ["Starch", "Glycogen", "A fat", "Glucose"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A graph shows an enzyme's reaction rate rising with substrate concentration and then leveling off. Explain the shape of the graph, and say what would raise the rate at the plateau.",
      scheme: [
        "States that at low concentrations, increasing substrate raises the rate because more active sites are used",
        "States that at high concentrations all active sites are occupied (saturated)",
        "States that the rate therefore reaches a maximum and levels off",
        "States that adding more enzyme, not more substrate, would raise the rate at the plateau",
      ],
      model:
        "At low substrate concentration, many active sites are empty, so more substrate increases the rate. At high concentration, all active sites are occupied, so the enzyme is saturated and the rate reaches a maximum and levels off. Adding more enzyme would raise the rate, since there would be more active sites.",
      answers: [
        [
          "full",
          "[[0|At the start adding substrate raises the rate because there are empty active sites to use.]] [[1|Later every active site is full.]] [[2|So the rate hits its maximum and goes flat.]] [[3|To go faster you'd need more enzyme because more substrate wouldn't help.]]",
          "Full marks. Naming what would raise the plateau shows real understanding.",
        ],
        [
          "full",
          "[[0|When substrate is low there are free active sites, so more substrate means more collisions that work.]] [[1|At high concentration the enzymes are saturated.]] [[2|The rate can't go any higher, so the line levels off.]] [[3|Adding more enzyme would add more active sites and raise the maximum rate.]]",
          "All four marks, with a clear use of the term saturated.",
        ],
        [
          "partial",
          "[[0|More substrate means more reactions at first.]] [[1|Then the enzymes are all busy.]] Then the substrate runs out so it levels.",
          "The substrate has not run out. The enzyme is saturated. Say what would raise the rate at the plateau.",
        ],
        [
          "partial",
          "[[2|The rate reaches a maximum.]] [[3|Adding more enzyme would increase it.]]",
          "Good. Explain why the rate climbs at first and why it stops climbing.",
          true,
        ],
        [
          "weak",
          "The enzyme gets tired and stops working so the graph goes flat.",
          "Enzymes do not get tired. At the plateau all active sites are in use, so more substrate cannot speed the reaction.",
        ],
        [
          "weak",
          "[[0|At first more substrate makes the rate go up.]] Then it's denatured so the line levels.",
          "Denaturing is caused by heat or pH and makes the rate fall, not level off. A plateau is saturation.",
        ],
      ],
    },
    {
      prompt:
        "Explain how a protein in food, such as chicken, is turned into amino acids in the body, and name the two types of reaction involved in building and breaking proteins.",
      scheme: [
        "Names hydrolysis as the reaction that breaks the bonds in proteins",
        "States that water is added to break each peptide bond",
        "States that enzymes (proteases such as pepsin and trypsin) speed up this reaction",
        "Names dehydration synthesis as the reaction that builds proteins from amino acids in the cells",
      ],
      model:
        "Proteins are broken down by hydrolysis, in which water is added to break each peptide bond. Digestive enzymes such as pepsin and trypsin speed this up, releasing amino acids. The body's cells then build their own proteins from these amino acids by dehydration synthesis, which removes water to form each bond.",
      answers: [
        [
          "full",
          "[[0|The protein is broken down by hydrolysis.]] [[1|Water is added to break each peptide bond.]] [[2|Enzymes like pepsin and trypsin make that go faster.]] [[3|Later cells join amino acids into new proteins by dehydration synthesis, which takes water out.]]",
          "Full marks. You described both reactions and put them in order.",
        ],
        [
          "full",
          "[[0|Hydrolysis breaks proteins into amino acids.]] [[1|It adds a water molecule at each peptide bond.]] [[2|Proteases speed it up in the stomach and small intestine.]] [[3|The cells then use dehydration synthesis to make the proteins they need.]]",
          "All four marks. Identifying the proteases is a nice detail.",
        ],
        [
          "partial",
          "[[0|It is broken down by hydrolysis]] and [[2|enzymes help]]. Then the amino acids are built back by hydrolysis too.",
          "Building proteins is dehydration synthesis, which removes water, so it is the opposite of hydrolysis. Add the role of water in breaking bonds.",
        ],
        [
          "partial",
          "[[3|Dehydration synthesis builds proteins.]] [[1|Water is added when they are broken down.]]",
          "Name hydrolysis as the breakdown reaction and say which enzymes speed it up.",
          true,
        ],
        [
          "weak",
          "The chicken is burned in the stomach by acid and turned to amino acids.",
          "Stomach acid helps, but the protein is broken down by enzymes using hydrolysis, not burned.",
        ],
        [
          "weak",
          "[[3|Cells make proteins from amino acids.]] The breakdown is by dehydration.",
          "The building step is dehydration synthesis. Breaking down is hydrolysis, which adds water.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Cell structure, endosymbiosis and membrane transport",
  note: `
## Objectives

Students will be able to:

1. compare prokaryotic and eukaryotic cells and relate organelle structure to function, including the evidence for endosymbiosis;
2. explain how the structure of the membrane controls movement by diffusion, facilitated diffusion, osmosis and active transport, and predict water movement using concentrations.

## Materials

Organelle cards, a membrane model, osmosis problem sheets, the quiz.

## Starter (6 minutes)

Pose: "Mitochondria have their own DNA and make copies of themselves by dividing. What does that suggest about where they came from?" Collect hypotheses and record them.

## Main activity

1. Compare a bacterium, an animal cell and a plant cell. Introduce the endosymbiotic theory with the evidence: mitochondria and chloroplasts have their own circular DNA, ribosomes similar to bacteria, a double membrane and divide on their own.
2. Draw the fluid mosaic model. Classify transport by whether it needs a protein and whether it needs energy.
3. Osmosis problems: predict which way water moves and what happens to a cell between a hypotonic, hypertonic or isotonic solution.

## Checking for understanding

Ask: "What happens to a red blood cell placed in pure water?" Wait for answers that include swelling and bursting.

## Quiz

Five questions at the end of the lesson.
`,
  reading: [
    "Organelles with a past, and a membrane that chooses",
    `
Prokaryotes, such as bacteria, have a single circular chromosome in a region called the nucleoid, small ribosomes, and no membrane-bound organelles. Eukaryotic cells are on average ten times larger, with a nucleus and organelles bounded by membranes that create separate compartments for different reactions. Compartments let a cell run chemically incompatible processes at once. The lysosome, for example, holds powerful digestive enzymes that would damage the rest of the cell.

Why do mitochondria and chloroplasts look so much like small bacteria? According to the **endosymbiotic theory**, they once were. Long ago, a larger cell engulfed an aerobic bacterium, and instead of digesting it, kept it. The two benefited each other, and over time the bacterium became the mitochondrion. A later engulfing of a photosynthetic bacterium produced chloroplasts. The evidence is strong: both organelles have their own circular DNA, ribosomes like those of bacteria, double membranes, and they divide independently of the cell by a process like binary fission.

The cell membrane is described by the **fluid mosaic model**. It is a bilayer of phospholipids, with hydrophilic heads facing the water and hydrophobic tails facing inward, studded with proteins and cholesterol. Small nonpolar molecules like oxygen pass through the lipid layer by **simple diffusion**. Ions and polar molecules such as glucose cannot cross the hydrophobic center and must pass through channel or carrier proteins, in **facilitated diffusion**, which still moves substances down their concentration gradient and needs no ATP. **Active transport** moves substances against the gradient and uses ATP, like the sodium-potassium pump that nerve cells use.

**Osmosis** is the diffusion of water across a selectively permeable membrane, toward the side with a higher concentration of solute, because that side has a lower concentration of free water. A solution with more solute than the cell is **hypertonic**: water leaves the cell and an animal cell shrinks. A solution with less solute is **hypotonic**: water enters and an animal cell may burst. In an **isotonic** solution, there is no net movement. Plant cells in a hypotonic solution take in water and become firm, or turgid, because the cell wall resists bursting, which is why a wilted plant recovers after watering.
`,
  ],
  cards: [
    ["Endosymbiotic theory", "The idea that mitochondria and chloroplasts came from engulfed bacteria."],
    ["Fluid mosaic model", "The model of the membrane as a phospholipid bilayer with embedded proteins."],
    ["Facilitated diffusion", "Movement down a gradient through a channel or carrier protein, with no ATP."],
    ["Hypertonic", "A solution with more solute than the cell, so water leaves the cell."],
    ["Hypotonic", "A solution with less solute than the cell, so water enters the cell."],
    ["Isotonic", "A solution with the same solute concentration as the cell; no net water movement."],
    ["Turgid", "Firm, as a plant cell is when it is full of water."],
    ["Nucleoid", "The region in a prokaryote where the circular chromosome is found."],
  ],
  closed: [
    [
      "Which feature is evidence that mitochondria came from bacteria?",
      ["They are found in all cells", "They have their own circular DNA", "They are bigger than the nucleus", "They contain chlorophyll"],
      "B",
    ],
    [
      "Glucose enters a red blood cell through a carrier protein, moving from high to low concentration. This is:",
      ["Simple diffusion", "Facilitated diffusion", "Active transport", "Osmosis"],
      "B",
    ],
    [
      "A red blood cell is placed in a hypotonic solution. What is most likely to happen?",
      ["It shrinks", "It stays the same", "It swells and may burst", "It makes more ATP"],
      "C",
    ],
    [
      "A sodium-potassium pump moves ions against their gradient. This requires:",
      ["No energy", "ATP", "A hypotonic solution", "Only a channel"],
      "B",
    ],
    [
      "Why can oxygen pass through the lipid bilayer easily while sodium ions cannot?",
      [
        "Oxygen is small and nonpolar, and ions are charged and repelled by the hydrophobic center",
        "Oxygen is larger than sodium",
        "Sodium has no charge",
        "Oxygen needs ATP to cross",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Give three pieces of evidence for the endosymbiotic theory and explain what each suggests about the origin of mitochondria.",
      scheme: [
        "States that mitochondria have their own circular DNA, like bacteria",
        "States that they have ribosomes similar to bacterial ribosomes",
        "States that they have a double membrane or divide independently like bacteria",
        "Concludes that this suggests mitochondria were once free-living bacteria engulfed by a larger cell",
      ],
      model:
        "Mitochondria have their own circular DNA, as bacteria do. They have ribosomes similar to those of bacteria, and a double membrane and they divide independently by a process like binary fission. These features suggest mitochondria were once free-living aerobic bacteria that were engulfed by a larger cell and kept.",
      answers: [
        [
          "full",
          "[[0|Mitochondria have their own circular DNA like bacteria do.]] [[1|They have small ribosomes that are like bacterial ribosomes.]] [[2|They have a double membrane and can divide on their own like bacteria.]] [[3|All of this suggests they started as free bacteria that were taken in by a bigger cell.]]",
          "Full marks. The evidence leads directly to the conclusion.",
        ],
        [
          "full",
          "[[0|Circular DNA separate from the nucleus, like a bacterial chromosome.]] [[1|Ribosomes are the bacterial size, not the larger eukaryotic size.]] [[2|They are surrounded by two membranes and divide independently by something like binary fission.]] [[3|So an ancestor of the eukaryotic cell likely engulfed an aerobic bacterium, which became the mitochondrion.]]",
          "All four marks, and you gave the mechanism of how it happened.",
        ],
        [
          "partial",
          "[[0|They have their own DNA.]] [[2|They have two membranes.]] This means they are bacteria.",
          "The conclusion is too strong. The evidence suggests they came from bacteria long ago. Add one more piece of evidence, the ribosomes.",
        ],
        [
          "partial",
          "[[3|They were probably bacteria that got engulfed.]] [[1|The ribosomes are small like bacteria.]]",
          "Good. Add the DNA evidence and the membrane or division evidence, since you were asked for three pieces.",
          true,
        ],
        [
          "weak",
          "Mitochondria are found in both bacteria and animals so they must have come from bacteria.",
          "Bacteria do not have mitochondria. The evidence is that mitochondria have bacteria-like features, such as their own DNA.",
        ],
        [
          "weak",
          "[[0|Mitochondria have DNA.]] That means they are the brain of the cell.",
          "Mitochondria having DNA is a clue, especially that it is circular like bacterial DNA. They make ATP, and the nucleus controls the cell.",
        ],
      ],
    },
    {
      prompt:
        "A student places a piece of celery in pure water and another in a strong salt solution. Predict what happens to each, using the terms hypotonic and hypertonic, and explain the movement of water.",
      scheme: [
        "States that pure water is hypotonic to the celery cells",
        "States that water moves into the cells by osmosis so the celery becomes turgid or firm",
        "States that the strong salt solution is hypertonic",
        "States that water leaves the cells by osmosis so the celery becomes limp",
      ],
      model:
        "Pure water is hypotonic to the celery cells, so water moves in by osmosis and the cells become turgid, and the celery stays firm. The strong salt solution is hypertonic, so water leaves the cells by osmosis and the celery becomes limp.",
      answers: [
        [
          "full",
          "[[0|Pure water is hypotonic compared to the cells.]] [[1|Water moves into the celery by osmosis and it gets turgid and crisp.]] [[2|The strong salt water is hypertonic.]] [[3|Water goes out of the cells by osmosis so the celery gets limp.]]",
          "Full marks. You used both terms with the correct direction of water movement.",
        ],
        [
          "full",
          "[[0|The pure water has less solute than the celery cells so it's hypotonic.]] [[1|Water enters the cells by osmosis and they become firm.]] [[2|The salt solution has more solute than the cells, which is hypertonic.]] [[3|Water leaves, so the cells shrink and the celery goes soft.]]",
          "All four marks. Your reasoning in terms of solute amounts is exactly right.",
        ],
        [
          "partial",
          "[[0|Pure water is hypotonic]] and [[1|the celery gets firm]]. In salt water the celery gets bigger too.",
          "Salt water is hypertonic, so water leaves the cells and the celery goes limp, not bigger.",
        ],
        [
          "partial",
          "[[2|The salt water is hypertonic]] and [[3|water leaves the celery so it goes limp]].",
          "Good on the salt water. Predict what happens in pure water and name the solution type.",
          true,
        ],
        [
          "weak",
          "Salt water will make the celery salty and the pure water won't do anything.",
          "Think about water moving across the membrane by osmosis, not about salt entering. Compare the solute concentrations inside and outside.",
        ],
        [
          "weak",
          "[[0|Pure water is hypotonic.]] The water pushes out of the celery because water goes where there is more room.",
          "Water in pure water enters the cells by osmosis. It moves toward the side with more solute, which is inside the cells.",
        ],
      ],
    },
  ],
};

writeCourse("honors-biology-grade-9.json", "Honors Biology", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
