import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * AP Biology, Grade 12, Quarter 1. Units 1 to 4 of the AP Biology course
 * framework plus science practices, written fresh in the school's own words.
 * A separate book from the Grade 11 course: different examples, contexts and
 * data, with the same objectives.
 */

const w1: WeekInput = {
  topic: "Water as the solvent of life, macromolecules and protein folding",
  note: `
## Objectives

Students will be able to:

1. explain how the structure and properties of water support life;
2. describe the structure and function of carbohydrates, lipids, proteins and nucleic acids;
3. explain how a protein's levels of structure determine its function.

## Materials

Water striders in a tray (or a photo), small paper clips, a dropper bottle of oil and water, glucose and starch samples with iodine, protein structure beads kit, the problem set.

## Starter (7 minutes)

Float a paperclip on the surface of water. Ask: "What holds the clip up if the metal is denser than water?" Then add a drop of dish soap and watch it sink. Record the explanations on the board for later.

## Main activity

1. Water as a solvent: dissolving of ions and polar molecules, hydrophobic and hydrophilic substances, and why oil and water do not mix. Surface tension, cohesion and the water strider.
2. Macromolecules in context: lactose (a disaccharide) and lactose intolerance; the structure of starch versus cellulose and why humans digest only starch; phospholipids and the bilayer; the roles of proteins and nucleic acids.
3. Protein folding: primary to quaternary structure, chaperone proteins, and how a misfolded protein can cause disease (the prion idea in outline).

## Checking for understanding

Mini whiteboards: "Which type of bond joins the monomers of cellulose and starch, and why can we not digest cellulose?"

## Problem set

Free-response questions on water properties, macromolecule structure and the effect of amino acid changes.
`,
  reading: [
    "A solvent, a skin on the surface, and chains that fold",
    `
Water is called the universal solvent because its polarity lets it surround and separate charged and polar particles. When table salt dissolves, the partially negative oxygen ends of water molecules cluster around sodium ions and the partially positive hydrogen ends cluster around chloride ions. Glucose, which has many polar hydroxyl groups, also dissolves. Nonpolar substances, such as oils, do not dissolve because they cannot form hydrogen bonds with water. Water molecules prefer to hydrogen bond with each other, which pushes the oil molecules together. This is the **hydrophobic effect**, and it is why phospholipids spontaneously form bilayers in water, with the hydrophobic tails hidden inside.

Hydrogen bonding also gives water a high **surface tension**. Molecules at the surface are pulled inward and sideways by their neighbors, and the surface behaves like a thin elastic film. A water strider walks on it, and a small paper clip floats. Soap molecules disrupt the hydrogen bonds at the surface, lowering the surface tension, so the clip sinks.

Macromolecules owe their properties to their linkages. Starch and cellulose are both polymers of glucose, but the glucose units are joined in different orientations. In starch the glycosidic bonds are alpha linkages, which curl into a helix that human enzymes (amylase) can hydrolyze. In cellulose they are beta linkages, forming straight chains that pack into strong fibers. Humans lack an enzyme that breaks beta linkages, so cellulose passes through as fiber, while cows host microbes that can digest it. The disaccharide lactose is hydrolyzed by the enzyme lactase to glucose and galactose. Many adults produce less lactase, so lactose passes undigested to the gut and is fermented by bacteria, giving lactose intolerance.

A protein starts as a chain, and its sequence of amino acids determines how it folds. The **hydrophobic effect** drives the chain to bury nonpolar R groups in the interior and expose polar ones on the surface. The **secondary structure** consists of alpha helices and beta pleated sheets held by hydrogen bonds between backbone atoms. The **tertiary structure** is the final fold, stabilized by hydrogen bonds, ionic bonds, hydrophobic interactions and disulfide bridges between cysteines. Proteins with more than one chain have **quaternary structure**. Helper proteins called chaperones assist folding. Misfolding can be harmful: in prion diseases such as mad cow disease a normally folded protein is converted into a misfolded form that induces others to misfold. Because function depends on shape, anything that alters the folding, such as a change in the sequence, temperature or pH, can change function.
`,
  ],
  cards: [
    ["Hydrophobic effect", "The tendency of nonpolar molecules to cluster together in water, away from it."],
    ["Surface tension", "The elastic-film property of a liquid's surface caused by hydrogen bonding."],
    ["Alpha linkage", "A glycosidic bond orientation, as in starch, that humans can digest."],
    ["Beta linkage", "A glycosidic bond orientation, as in cellulose, that humans cannot digest."],
    ["Lactase", "The enzyme that hydrolyzes lactose to glucose and galactose."],
    ["Disulfide bridge", "A covalent bond between the sulfur atoms of two cysteines."],
    ["Chaperone", "A protein that helps other proteins fold correctly."],
    ["Misfolding", "Folding into an incorrect shape that may cause loss of function or disease."],
  ],
  closed: [
    [
      "Why does a drop of soap make a floating paper clip sink?",
      ["Soap makes water denser", "Soap reduces the surface tension by disrupting hydrogen bonds", "Soap dissolves the metal", "Soap heats the water"],
      "B",
    ],
    [
      "Why can humans digest starch but not cellulose?",
      ["Starch is a lipid", "Humans lack an enzyme that hydrolyzes beta linkages", "Cellulose is a protein", "Starch has no glucose"],
      "B",
    ],
    [
      "Phospholipids form a bilayer in water mainly because of:",
      ["Covalent bonds between the tails", "The hydrophobic effect", "Ionic bonds in the tails", "Peptide bonds"],
      "B",
    ],
    [
      "Which bond is a covalent link between two cysteine side chains?",
      ["Hydrogen bond", "Ionic bond", "Disulfide bridge", "Peptide bond"],
      "C",
    ],
    [
      "A person who produces little lactase has trouble digesting:",
      ["Starch", "Lactose", "Cellulose", "Fat"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Starch and cellulose are both polymers of glucose, but humans can digest only starch. Explain the difference in the structure of the two polymers and how it accounts for this difference in digestion and for their roles in plants.",
      scheme: [
        "States that starch has alpha glycosidic linkages and cellulose has beta linkages",
        "States that human digestive enzymes (amylase) hydrolyze alpha linkages but not beta linkages",
        "States that cellulose forms straight chains that hydrogen bond into strong fibers, suited to the cell wall",
        "States that starch is a coiled storage polysaccharide that can be hydrolyzed to release glucose",
      ],
      model:
        "In starch, glucose monomers are joined by alpha linkages, which coil into a helix, and amylase can hydrolyze them. In cellulose they are joined by beta linkages, forming straight chains that hydrogen bond to one another into strong fibers, which suits the plant cell wall. Humans lack an enzyme for beta linkages, so cellulose passes through as fiber, while starch can be broken down to release glucose, so it serves as an energy store.",
      answers: [
        [
          "full",
          "[[0|Starch has alpha linkages and cellulose has beta linkages between the glucose units.]] [[1|Human enzymes like amylase can break alpha linkages but not beta ones.]] [[2|Cellulose chains are straight and hydrogen bond to each other to make strong fibers, which is good for the cell wall.]] [[3|Starch is coiled and can be broken down to release glucose, so it is used for storing energy.]]",
          "Full marks. The structural difference explains both digestion and function.",
        ],
        [
          "full",
          "[[0|The difference is the orientation of the glycosidic bond: alpha in starch, beta in cellulose.]] [[1|We make amylase, which hydrolyzes alpha bonds, but we have no enzyme for beta bonds.]] [[2|Cellulose forms straight, parallel chains with many hydrogen bonds between them, giving rigid fibers for cell walls.]] [[3|Starch is a compact coil that stores glucose that can be released when needed.]]",
          "All four marks, with a clear link between structure and function.",
        ],
        [
          "partial",
          "[[0|Starch has alpha linkages and cellulose has beta.]] [[1|Our enzymes can't break the beta bonds.]]",
          "Explain how each structure suits its role in the plant, strength for cellulose and storage for starch.",
        ],
        [
          "partial",
          "[[2|Cellulose makes strong fibers.]] [[3|Starch stores energy.]] Humans can't digest cellulose because it is made of a different sugar.",
          "Both are made of glucose. The difference is the orientation of the bond between the glucose units.",
          true,
        ],
        [
          "weak",
          "Starch is a carbohydrate and cellulose is a protein, which is why we can digest one and not the other.",
          "Both are carbohydrates built from glucose. The difference is in the linkage between glucose monomers.",
        ],
        [
          "weak",
          "[[3|Starch is used for storing energy.]] Cellulose is the same except that it is not stored in the stomach.",
          "Cellulose differs in its bond orientation, which makes it straight and strong. Humans lack the enzyme to hydrolyze it.",
        ],
      ],
    },
    {
      prompt:
        "Describe how the hydrophobic effect and hydrogen bonding determine the folding of a globular protein, and predict the effect of replacing a nonpolar amino acid in the interior with a charged one.",
      scheme: [
        "States that nonpolar R groups cluster in the interior, away from water, while polar and charged R groups are on the surface (hydrophobic effect)",
        "States that hydrogen bonds between backbone atoms form alpha helices and beta sheets (secondary structure)",
        "States that interactions among R groups, including disulfide bridges, stabilize the tertiary structure",
        "Predicts that a charged group buried in the interior would disrupt the packing and could cause misfolding and loss of function",
      ],
      model:
        "In a globular protein, the hydrophobic effect drives nonpolar R groups into the interior and leaves polar and charged groups on the surface. Hydrogen bonds between backbone atoms form alpha helices and beta sheets, and interactions among R groups, including disulfide bridges, stabilize the tertiary structure. A charged amino acid in the nonpolar interior would disrupt the packing and could cause misfolding and loss of function.",
      answers: [
        [
          "full",
          "[[0|Nonpolar R groups bury themselves in the middle of the protein away from water and the polar and charged ones are on the outside.]] [[1|Hydrogen bonds in the backbone make the alpha helices and beta sheets.]] [[2|The R groups interact, including with disulfide bridges, to hold the tertiary shape.]] [[3|A charged amino acid inside would not fit the nonpolar interior, so the protein could misfold and lose its function.]]",
          "Full marks. The prediction follows from the folding rules you described.",
        ],
        [
          "full",
          "[[0|The hydrophobic effect pushes hydrophobic side chains into the core.]] [[1|Secondary structure comes from hydrogen bonding between the peptide backbone groups.]] [[2|Tertiary structure is stabilized by ionic bonds, hydrogen bonds and disulfide bonds between side chains.]] [[3|Putting a charged residue in the hydrophobic core would destabilize the fold and might ruin the active site.]]",
          "All four marks, with accurate detail about the bonds.",
        ],
        [
          "partial",
          "[[0|Nonpolar groups go inside.]] [[1|Hydrogen bonds form helices.]]",
          "Include the tertiary stabilizing interactions, and make the prediction about the charged amino acid.",
        ],
        [
          "partial",
          "[[2|Disulfide bridges stabilize the shape.]] [[3|The charged amino acid would make it misfold.]] The nonpolar groups go on the outside, because they like water.",
          "Nonpolar groups avoid water and are buried inside. Polar and charged groups face outward.",
          true,
        ],
        [
          "weak",
          "The protein folds randomly, and the amino acid change would not matter because proteins can fold in any way and still work.",
          "Folding is determined by the sequence. A change in the sequence can change the shape and so the function.",
        ],
        [
          "weak",
          "[[1|Hydrogen bonds hold the helices together.]] A charged amino acid would make the protein stronger because it adds charge.",
          "A buried charged group is unstable in a nonpolar environment and would likely disrupt folding.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "RNA types, DNA structure and cell compartments across the domains",
  note: `
## Objectives

Students will be able to:

1. describe the structure of DNA and RNA and how they differ;
2. compare prokaryotic and eukaryotic cells and describe the functions of the organelles.

## Materials

DNA and RNA base-pair kit, a table of RNA types, images of an E. coli cell, a plant cell and an animal cell, the worksheet.

## Starter (6 minutes)

Pose: "A strand of DNA has the sequence 5' ATGCCGTA 3'. Write the complementary strand, including the direction." Check the answer 3' TACGGCAT 5'.

## Main activity

1. Compare DNA and RNA in a table, and three functional RNAs: mRNA, tRNA and rRNA. Mention that some RNAs act as enzymes (ribozymes) and the RNA world idea.
2. Antiparallel strands and base pairing. Use a table of melting temperatures to show how G-C content raises stability.
3. Compare E. coli, a plant cell and an animal cell. Identify the structures unique to each (cell wall, chloroplast, large central vacuole, lysosomes and centrioles in animal cells).
4. Cytoskeleton: microtubules, microfilaments and intermediate filaments and their roles in transport and shape.

## Checking for understanding

Ask: "Which organelle would be abundant in a cell that secretes large amounts of protein, and which in a cell that makes steroid hormones?"

## Worksheet

Complementary strands, a comparison table, and matching cells to organelle content.
`,
  reading: [
    "Two nucleic acids, and the cells that read them",
    `
DNA carries genetic information in the sequence of its four bases. The two strands of a DNA double helix are complementary and **antiparallel**. If one strand reads 5' ATGCCGTA 3', the other reads 3' TACGGCAT 5'. When writing a complementary sequence, pair A with T and G with C, and remember that the new strand runs in the opposite direction. The strands are held together by hydrogen bonds: two between A and T and three between G and C. A region rich in G-C pairs is more stable and melts at a higher temperature than one rich in A-T. Replication and transcription both use the 3' end of a growing strand, so new strands are always built in the 5' to 3' direction.

RNA differs from DNA in its sugar (ribose rather than deoxyribose), its base (uracil in place of thymine), and its usual single-stranded form. This lets RNA fold into complex shapes by pairing with itself. There are three major types in the flow of information from gene to protein. **Messenger RNA (mRNA)** carries the code from DNA to the ribosome. **Transfer RNA (tRNA)** carries amino acids and has an anticodon that matches an mRNA codon. **Ribosomal RNA (rRNA)** is the main component of the ribosome and catalyzes the formation of peptide bonds. Because some RNA molecules, called ribozymes, can act as catalysts, as well as store information, many biologists propose that an "RNA world" preceded modern cells.

Prokaryotic and eukaryotic cells share a plasma membrane, ribosomes, cytoplasm and DNA. A bacterium such as *E. coli* has a single circular chromosome in a nucleoid, 70S ribosomes, a cell wall of peptidoglycan, and often flagella, but no membrane-bound organelles. Eukaryotes have a nucleus and 80S ribosomes. Plant cells have a cellulose cell wall, chloroplasts, and a large central vacuole that stores water and maintains turgor. Animal cells have lysosomes and centrioles, and they lack walls and chloroplasts.

The abundance of an organelle reflects the work the cell does. A cell that secretes protein, such as a pancreatic acinar cell, is packed with rough ER and Golgi. A cell that makes steroid hormones, such as an adrenal cortex cell, has abundant smooth ER. Muscle and liver cells have many mitochondria. Within all of them, the **cytoskeleton** gives shape and moves organelles: microtubules form tracks along which motor proteins carry vesicles, and form the spindle in division; microfilaments (actin) support the cell cortex and muscle contraction; and intermediate filaments give mechanical strength.
`,
  ],
  cards: [
    ["Antiparallel", "The two DNA strands run in opposite 5' to 3' directions."],
    ["mRNA", "RNA that carries the code from DNA to the ribosome."],
    ["tRNA", "RNA that brings amino acids to the ribosome and matches codons with anticodons."],
    ["rRNA", "RNA that is the main part of the ribosome and catalyzes peptide bond formation."],
    ["Ribozyme", "An RNA molecule that acts as a catalyst."],
    ["Peptidoglycan", "The material of bacterial cell walls."],
    ["Central vacuole", "A large plant organelle storing water that maintains turgor."],
    ["Microtubule", "A cytoskeletal tube that provides tracks for motor proteins and forms the spindle."],
  ],
  closed: [
    [
      "The complementary strand to 5' ATGCCGTA 3' is:",
      ["5' TACGGCAT 3'", "3' TACGGCAT 5'", "3' UACGGCAU 5'", "5' ATGCCGTA 3'"],
      "B",
    ],
    [
      "Which RNA is a main component of the ribosome and catalyzes peptide bond formation?",
      ["mRNA", "tRNA", "rRNA", "DNA"],
      "C",
    ],
    [
      "Which cell would contain the most smooth ER?",
      ["A cell secreting digestive enzymes", "A cell making steroid hormones", "A red blood cell", "A bacterium"],
      "B",
    ],
    [
      "Which structure is found in bacteria?",
      ["Nucleus", "Mitochondria", "Cell wall of peptidoglycan", "Golgi apparatus"],
      "C",
    ],
    [
      "A DNA region with high G-C content compared with one rich in A-T has:",
      ["A lower melting temperature", "A higher melting temperature", "No difference", "A single hydrogen bond"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare the structure and function of mRNA, tRNA and rRNA, and explain one way RNA differs structurally from DNA.",
      scheme: [
        "States that mRNA carries the genetic code from DNA to the ribosome",
        "States that tRNA brings amino acids and its anticodon pairs with the mRNA codon",
        "States that rRNA is the major component of the ribosome and catalyzes peptide bond formation",
        "Gives a correct structural difference between RNA and DNA, such as ribose, uracil or single strand",
      ],
      model:
        "mRNA carries the genetic code from the nucleus to the ribosome. tRNA brings amino acids to the ribosome, and its anticodon pairs with the mRNA codon. rRNA is the main component of the ribosome and catalyzes the formation of peptide bonds. RNA differs from DNA in having ribose instead of deoxyribose, uracil instead of thymine, and usually being single-stranded.",
      answers: [
        [
          "full",
          "[[0|mRNA carries the code from the DNA to the ribosome.]] [[1|tRNA brings amino acids and pairs its anticodon with the codon on the mRNA.]] [[2|rRNA makes up much of the ribosome and catalyzes the peptide bonds.]] [[3|RNA has ribose and uracil, while DNA has deoxyribose and thymine.]]",
          "Full marks. The three roles are distinct and the structural difference is accurate.",
        ],
        [
          "full",
          "[[0|Messenger RNA is a copy of the gene that goes to the ribosome.]] [[1|Transfer RNA is the adapter; one end holds an amino acid and the anticodon end matches a codon.]] [[2|Ribosomal RNA is the structural and catalytic core of the ribosome.]] [[3|RNA is usually single-stranded, unlike DNA's double helix.]]",
          "All four marks, with a good description of tRNA as an adapter.",
        ],
        [
          "partial",
          "[[0|mRNA carries the code.]] [[3|RNA has uracil.]]",
          "Describe the roles of tRNA and rRNA as well.",
        ],
        [
          "partial",
          "[[1|tRNA brings amino acids.]] [[2|rRNA is in the ribosome.]] mRNA brings amino acids to the ribosome.",
          "mRNA carries the code, not the amino acids. The amino acids are carried by tRNA.",
          true,
        ],
        [
          "weak",
          "All three types of RNA do the same thing and carry the DNA to the ribosome. RNA has thymine like DNA.",
          "The three RNAs have different roles, and RNA has uracil instead of thymine.",
        ],
        [
          "weak",
          "[[0|mRNA carries the code to the ribosome.]] tRNA stores the DNA in the nucleus, and rRNA is the fat in the cell.",
          "tRNA carries amino acids to the ribosome. rRNA is part of the ribosome.",
        ],
      ],
    },
    {
      prompt:
        "Compare a pancreatic acinar cell that secretes digestive enzymes with an adrenal cortex cell that makes steroid hormones. Predict which organelles are most abundant in each and explain why.",
      scheme: [
        "Predicts abundant rough ER and Golgi in the enzyme-secreting cell",
        "Explains that rough ER ribosomes make the proteins and the Golgi modifies and packages them for secretion",
        "Predicts abundant smooth ER in the steroid-secreting cell",
        "Explains that the smooth ER makes lipids, including steroids",
      ],
      model:
        "The pancreatic acinar cell secretes protein enzymes, so it has abundant rough ER, whose ribosomes make the proteins, and Golgi apparatus, which modifies and packages them for secretion. The adrenal cortex cell makes steroid hormones, which are lipids, so it has abundant smooth ER, the site of lipid synthesis.",
      answers: [
        [
          "full",
          "[[0|The acinar cell should have lots of rough ER and Golgi.]] [[1|The ribosomes on the rough ER make the enzyme proteins and the Golgi modifies them and packages them for secretion.]] [[2|The adrenal cortex cell should have lots of smooth ER.]] [[3|The smooth ER is where lipids, including steroid hormones, are made.]]",
          "Full marks. In each cell, the organelle matches the product.",
        ],
        [
          "full",
          "[[0|Pancreatic cells: abundant rough ER and Golgi apparatus.]] [[1|Proteins are made on the rough ER, then processed and packaged in the Golgi into vesicles.]] [[2|Adrenal cortex cells: abundant smooth ER.]] [[3|Steroids are lipids, and the smooth ER synthesizes lipids.]]",
          "All four marks, in a clear parallel form.",
        ],
        [
          "partial",
          "[[0|The pancreas cell has rough ER and Golgi.]] [[2|The adrenal cell has smooth ER.]]",
          "Explain why each organelle suits the product being made.",
        ],
        [
          "partial",
          "[[1|Rough ER ribosomes make the protein.]] [[3|Smooth ER makes lipids.]] The adrenal cell has a lot of rough ER because it makes hormones.",
          "Steroid hormones are lipids, so the adrenal cell has abundant smooth ER, not rough ER.",
          true,
        ],
        [
          "weak",
          "Both have a lot of mitochondria and nothing else is different because all cells have the same organelles in the same amounts.",
          "Cells differ in their organelle content according to their function.",
        ],
        [
          "weak",
          "[[2|The adrenal cell has smooth ER.]] The acinar cell has many chloroplasts to make the enzymes.",
          "Chloroplasts are found in plant cells. Enzymes are made on the rough ER.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Surface area and exchange, membrane fluidity and dialysis model",
  note: `
## Objectives

Students will be able to:

1. explain how surface area to volume ratio limits cell size and shapes exchange surfaces;
2. describe the fluid mosaic model and the movement of substances across a membrane.

## Materials

Dialysis tubing, glucose and starch solution, iodine, glucose test strips, beakers, a balance, the practical sheet.

## Starter (6 minutes)

Ask: "Why do the lungs have 300 million alveoli rather than one big air sac? Estimate the surface area of one big sphere of the same volume versus many small spheres." Use SA:V of spheres, 3/r, to compare.

## Main activity

1. SA:V in organisms: alveoli, intestinal villi, root hairs, flat leaves and the folded inner mitochondrial membrane. A sphere of radius 1 cm has SA:V = 3; 1000 spheres of radius 0.1 cm with the same total volume have SA:V = 30.
2. Membrane fluidity: effect of temperature, unsaturated fatty acids and cholesterol. Why cold-adapted organisms have more unsaturated lipids in their membranes.
3. Transport routes: simple diffusion, facilitated diffusion, active transport and vesicles, with examples.
4. Practical: a dialysis tubing model of a selectively permeable membrane with glucose and starch.

## Checking for understanding

Ask: "Why do fish in cold water have more unsaturated fatty acids in their membranes?"

## Practical write-up

Collect with a table of tests before and after, and an interpretation.
`,
  reading: [
    "Exchange surfaces and the membrane that regulates them",
    `
Any organism that exchanges materials with its surroundings faces the same geometric rule: as an object grows, its volume rises with the cube of its linear dimension but its surface area rises only with the square. For a sphere of radius r the surface area to volume ratio is 3/r. A sphere of radius 1 cm has a ratio of 3 per cm. If the same volume is divided into 1000 spheres, each of radius 0.1 cm, the ratio is 30 per cm, ten times greater. Evolution has produced many answers to the problem. The lungs contain roughly 300 million alveoli, each a tiny sac, which together have a surface area of about 70 square meters. The small intestine is lined with villi and microvilli that increase the absorptive area many times. Root hairs extend from the root epidermis to increase contact with the soil. Leaves are flat so that most cells are near a surface. In each case the structure is thin and moist, with a rich blood supply or transport system.

The membrane through which materials pass is described by the fluid mosaic model. Phospholipids form a bilayer whose fluidity depends on temperature and composition. Lipids with saturated fatty acids pack tightly, while unsaturated fatty acids have kinks that keep the lipids apart. At low temperatures membranes tend to become stiff and less permeable, so cold-adapted organisms have more unsaturated fatty acids to maintain fluidity. Cholesterol acts as a buffer: it restrains movement at high temperatures and prevents tight packing at low temperatures.

The transport routes depend on the substance. Small nonpolar molecules (O2, CO2) and some small polar ones (water, slowly) cross by **simple diffusion**. Ions and polar molecules, such as glucose, cross by **facilitated diffusion** through channel and carrier proteins, down their gradient. **Active transport** uses ATP to move substances against gradients, as in the sodium-potassium pump or the proton pumps of plant roots. **Vesicles** carry larger materials through endocytosis and exocytosis.

A **dialysis tubing** model can illustrate the selective permeability of a membrane. Tubing has tiny pores that let small molecules such as glucose pass but not large ones such as starch. If a bag with starch and glucose solution is placed in a beaker of water with iodine, iodine (small) enters the bag and turns the starch blue-black, while the glucose leaves the bag and can be detected in the beaker with a test strip. The starch does not escape, so the water outside never turns blue. The model shows that size matters, and that movement continues until the concentrations are equal.
`,
  ],
  cards: [
    ["SA:V of a sphere", "3 divided by the radius."],
    ["Alveoli", "Tiny air sacs in the lungs with a very large combined surface area."],
    ["Membrane fluidity", "How freely lipids and proteins can move in the membrane; affected by temperature and lipid saturation."],
    ["Unsaturated fatty acid", "A fatty acid with double bonds that put kinks in the tail and increase fluidity."],
    ["Cholesterol", "A lipid in animal membranes that buffers fluidity."],
    ["Dialysis tubing", "A selectively permeable synthetic membrane used to model cell membranes."],
    ["Iodine test", "Turns blue-black in the presence of starch."],
    ["Active transport", "Moving a substance against its gradient using ATP."],
  ],
  closed: [
    [
      "A sphere of radius 0.1 cm has an SA:V of:",
      ["0.3 per cm", "3 per cm", "30 per cm", "300 per cm"],
      "C",
    ],
    [
      "Why do cold-adapted fish have more unsaturated fatty acids in their membranes?",
      ["To make them stiffer", "To keep membranes fluid at low temperature", "To store more energy", "To make them thicker"],
      "B",
    ],
    [
      "In the dialysis tubing model, which substance would not leave a bag of starch and glucose?",
      ["Glucose", "Water", "Starch", "Iodine"],
      "C",
    ],
    [
      "Which structure increases the absorptive surface of the small intestine?",
      ["Alveoli", "Villi and microvilli", "Root hairs", "Stomata"],
      "B",
    ],
    [
      "A proton pump in the root cell plasma membrane that uses ATP carries out:",
      ["Simple diffusion", "Facilitated diffusion", "Active transport", "Osmosis"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A sphere with a radius of 1.0 cm is compared with 1000 spheres each with a radius of 0.1 cm that have the same total volume. Calculate the SA:V of each, and use the result to explain the structure of the lung's alveoli.",
      scheme: [
        "Calculates the SA:V of the large sphere as 3 per cm",
        "Calculates the SA:V of each small sphere as 30 per cm",
        "States that dividing the volume into many small units increases the total surface area ten-fold",
        "Links to alveoli: many tiny sacs provide a large area for rapid gas exchange",
      ],
      model:
        "For a sphere, SA:V = 3/r. The large sphere has a ratio of 3 per cm. Each small sphere has 3/0.1 = 30 per cm. So dividing the same volume into 1000 small spheres gives a ten-fold greater surface area. The lungs similarly contain hundreds of millions of tiny alveoli, which provides a large surface area for rapid gas exchange.",
      answers: [
        [
          "full",
          "[[0|SA:V = 3/r so the 1 cm sphere has a ratio of 3 per cm.]] [[1|The small spheres have 3/0.1 = 30 per cm.]] [[2|For the same volume, splitting it into 1000 spheres gives ten times the surface area.]] [[3|The lung does this with hundreds of millions of alveoli, giving a huge surface for gas exchange.]]",
          "Full marks. The link between the geometry and the lung is clear.",
        ],
        [
          "full",
          "[[0|Big sphere: 3/1.0 = 3 cm⁻¹.]] [[1|Small spheres: 3/0.1 = 30 cm⁻¹.]] [[2|The same volume in small pieces has ten times the surface area.]] [[3|That is why the lung is made of alveoli and not a single big air sac: more area for oxygen to diffuse across.]]",
          "All four marks, with a clear conclusion.",
        ],
        [
          "partial",
          "[[0|The big sphere is 3 per cm.]] [[1|The small ones are 30 per cm.]]",
          "Say what this means for total surface area and apply it to the alveoli.",
        ],
        [
          "partial",
          "[[2|Small spheres have more surface area for the same volume.]] [[3|The alveoli do this in the lung.]] The big sphere has a ratio of 0.3.",
          "The large sphere has an SA:V of 3, from 3/r. Check the calculation.",
          true,
        ],
        [
          "weak",
          "The big sphere has more surface area, so the lung should have one big sac for gas exchange.",
          "A single large sac would have far less surface area for the same volume. Many small alveoli solve this.",
        ],
        [
          "weak",
          "[[1|The small ones have 3/0.1 = 30.]] The big sphere is 3 × 1.0 = 3.14 because of pi.",
          "The SA:V of a sphere is 3/r, which for r = 1.0 is 3 per cm. Pi cancels out.",
        ],
      ],
    },
    {
      prompt:
        "Explain how the fatty acid composition and cholesterol content of a membrane affect fluidity, and why an organism that moves from warm water to cold water might change the lipids of its membranes.",
      scheme: [
        "States that saturated fatty acid tails pack tightly and make the membrane less fluid",
        "States that unsaturated tails have kinks that keep lipids apart and increase fluidity",
        "States that cholesterol buffers fluidity, restraining movement when warm and preventing tight packing when cold",
        "Explains that in the cold, the organism increases unsaturated fatty acids to keep the membrane fluid and functional",
      ],
      model:
        "Saturated fatty acid tails are straight and pack tightly, making the membrane less fluid. Unsaturated tails have kinks that keep the lipids apart and increase fluidity. Cholesterol buffers the membrane: it restrains movement when it is warm and prevents tight packing when it is cold. In cold water, an organism may increase the proportion of unsaturated fatty acids to keep its membranes fluid, so that transport proteins still function.",
      answers: [
        [
          "full",
          "[[0|Saturated tails are straight so they pack tightly and the membrane is stiffer.]] [[1|Unsaturated tails have kinks which keep the lipids apart and so the membrane is more fluid.]] [[2|Cholesterol buffers this, slowing movement when it's warm and stopping tight packing when it's cold.]] [[3|In cold water the organism makes more unsaturated fatty acids so the membrane stays fluid and the proteins keep working.]]",
          "Full marks. The adaptation is linked to the function of membrane proteins.",
        ],
        [
          "full",
          "[[0|Saturated fatty acids pack closely and decrease fluidity.]] [[1|Unsaturated fatty acids have double bonds and kinks, which increase fluidity.]] [[2|Cholesterol moderates the effect of temperature on fluidity.]] [[3|A fish in cold water raises the proportion of unsaturated lipids to prevent the membrane becoming stiff.]]",
          "All four marks, with a good example.",
        ],
        [
          "partial",
          "[[0|Saturated tails pack together.]] [[1|Unsaturated tails make it more fluid.]]",
          "Include the effect of cholesterol and describe the change the organism makes in the cold.",
        ],
        [
          "partial",
          "[[2|Cholesterol buffers fluidity.]] [[3|In cold water, more unsaturated fats keep it fluid.]] Saturated fats have kinks.",
          "Unsaturated fatty acids have the kinks, from double bonds. Saturated tails are straight.",
          true,
        ],
        [
          "weak",
          "In the cold the membrane freezes solid like ice and then the cell dies, and that is all the organism can do.",
          "Organisms can adjust the lipid composition of their membranes to keep them fluid in the cold.",
        ],
        [
          "weak",
          "[[1|Unsaturated fatty acids keep membranes fluid.]] Cold organisms make more saturated fats because they are stronger.",
          "Cold organisms need more unsaturated fats to keep the membrane fluid. Saturated fats would make it stiffer.",
        ],
      ],
    },
  ],
  practical: {
    title: "A dialysis tubing model of the membrane",
    instructions:
      "Fill a 15 cm dialysis bag with a mixture of 15 mL of 15 percent glucose and 1 percent starch solution. Place it in a beaker of water containing a few drops of iodine. After 30 minutes, test the bag contents and the beaker water for starch (iodine color) and glucose (test strip). Interpret the results in terms of molecule size and permeability.",
      steps: [
        ["Soak the dialysis tubing, tie one end, and fill with the glucose-starch mixture. Tie the other end, leaving some space."],
        ["Test a sample of the mixture and a sample of the beaker water for glucose and for starch before starting; record the results."],
        ["Place the bag in the beaker of water with iodine. Record the color of the bag contents and the water.", "Wear goggles and gloves, since iodine stains skin and clothes."],
        ["After 30 minutes, observe the colors again and weigh the bag to note any change in mass."],
        ["Test the beaker water for glucose with a test strip."],
        ["Write a conclusion explaining the results in terms of the size of the molecules and the properties of the membrane."],
      ],
    rubric: [
      ["Method: initial and final tests recorded, controls on the beaker water", 4],
      ["Results: complete table of colors, tests and mass change", 4],
      ["Conclusion: explanation based on molecule size and selective permeability", 4],
    ],
    writeUps: [
      [
        "full",
        "Before the experiment, the bag tested positive for glucose and starch, and the beaker water was negative for both. After 30 minutes, the contents of the bag turned blue-black, the beaker water stayed amber-yellow and the water tested positive for glucose. The bag also gained 0.6 g. Iodine, a small molecule, diffused into the bag and reacted with the starch. Glucose diffused out. Starch stayed in the bag because its molecules are too large for the pores. Water moved in by osmosis, which explains the gain in mass. The membrane is selectively permeable based on size.",
        [4, 4, 4],
        "An excellent report: initial controls, complete results, and a conclusion that accounts for iodine, glucose, starch and water.",
      ],
      [
        "full",
        "Method: tubing soaked, filled with glucose and starch, and placed in an iodine solution. We tested the water before and after. Results: the bag changed from cloudy white to blue-black, the water outside stayed yellow-brown, the glucose test of the beaker water went from negative to positive, and the bag's mass increased from 21.3 g to 22.0 g. Conclusion: small molecules like glucose and iodine cross the membrane, but starch is too large. The mass gain shows water entered by osmosis because the bag had a higher solute concentration.",
        [4, 3, 4],
        "Very good. A table would present the before and after results in a clearer way.",
      ],
      [
        "partial",
        "The bag turned dark blue after we put it in the iodine water. The water outside stayed the same color. We tested the water for glucose and it turned green on the strip. I think the glucose came out of the bag. I did not test the beaker water before the experiment started or weigh the bag.",
        [2, 2, 2],
        "Record the initial tests, including the beaker water, and the mass of the bag. Explain each result in terms of molecule size.",
      ],
      [
        "partial",
        "Before: bag positive for starch and glucose, water negative. After: bag blue-black, water yellow, glucose positive in the water. The bag gained mass. I think this shows that the membrane lets everything through, because the iodine went in and the glucose came out, so all molecules go through the pores.",
        [3, 4, 1],
        "The starch did not leave the bag, which shows that the membrane is selective. Large molecules are retained.",
      ],
      [
        "weak",
        "We put a bag in a beaker and it changed color. It was fun to see the colors. The bag felt full and bigger at the end of the experiment. I think the experiment worked because we got a color change and we cleaned the area after we finished.",
        [1, 0, 0],
        "Record the color of the bag and water, the glucose tests and the mass change, and explain the changes using molecule size.",
      ],
      [
        "weak",
        "The starch left the bag and turned the beaker water blue, which shows that starch can pass through the membrane. Iodine did not move because it is bigger than starch. The experiment shows that large molecules are better at crossing membranes than small ones.",
        [1, 0, 0],
        "It was the other way around: the iodine moved into the bag and the starch stayed. Small molecules cross dialysis tubing more easily than large molecules.",
      ],
    ],
  },
};

const w4: WeekInput = {
  topic: "Water potential in tissues, and why eukaryotic cells have compartments",
  note: `
## Objectives

Students will be able to:

1. predict the movement of water using water potential, including finding the water potential of a tissue from experimental data;
2. explain how compartmentalization increases the efficiency of a cell.

## Materials

Potato core data (percent mass change at several sucrose molarities), graph paper, calculators, organelle model cards, the worksheet.

## Starter (6 minutes)

Give a graph of percent change in mass of potato cores against sucrose molarity: +12% in 0.0 M, +4% in 0.2 M, -6% in 0.4 M, -14% in 0.6 M. Ask: "At what molarity is there no change, and what does that tell us about the potato?"

## Main activity

1. Finding the potato's solute potential: interpolate to the zero-change concentration. The line crosses zero near 0.3 M. Calculate Ψs = -iCRT at 25 degrees Celsius: -(1)(0.3)(0.0831)(298) = -7.4 bar. At that point, Ψp is zero in the tissue, so Ψ of the potato is about -7.4 bar.
2. Water potential problems with a closed system and a plant cell in air or in solution. Include a cell in a solution with a positive pressure applied (a syringe).
3. Compartmentalization: the chloroplast thylakoid space, the nucleus (separating transcription and translation in time and space), peroxisomes for reactions that produce hydrogen peroxide, and the endomembrane system.

## Checking for understanding

Ask: "What are the benefits of separating transcription from translation?"

## Worksheet

Interpolating from the graph, a water potential calculation, and a compartment explanation.
`,
  reading: [
    "Measuring a tissue's water potential",
    `
How can you find the water potential of a living tissue? A standard experiment uses potato cores. Cut equal cores and weigh them, place each in a sucrose solution of a different molarity, and after several hours blot and weigh them again. If a core gains mass, water moved in, so the solution outside had the higher water potential. If it loses mass, water moved out. At some intermediate molarity, there is no net change, which means that the water potential of the solution equals that of the tissue. Plot percent change in mass against molarity and find where the line crosses zero. Suppose the data give a mass change of +12 percent in pure water, +4 percent in 0.2 M, -6 percent in 0.4 M, and -14 percent in 0.6 M. The line crosses zero between 0.2 and 0.4 M. Linear interpolation between +4 and -6 puts the crossing at 0.2 + 0.2 x (4/10), which is 0.28 M, close to 0.3 M.

Then use the water potential equation. The solution in an open beaker has Ψp = 0, so its water potential equals its solute potential: Ψ = Ψs = -iCRT. For 0.3 M sucrose at 25 degrees Celsius, Ψs = -(1)(0.3)(0.0831)(298) = -7.4 bar. At the zero-change point there is no net movement, so the potato tissue has the same water potential, approximately -7.4 bar. In the tissue's cells, this is made up of the solute potential, which is more negative, and a small positive pressure potential.

Two other cases are worth knowing. If you apply positive pressure to a solution, such as with a syringe, its pressure potential increases, which raises its water potential and pushes water out. This is the principle of reverse osmosis in water purification. And in a sealed vessel, pressure builds up as water moves in until Ψ is equal on both sides. Plant cells in their walls behave in the same way: water enters until the wall's pressure balances the solute potential.

Compartmentalization benefits cells in many ways. The **nuclear envelope** in eukaryotes separates transcription from translation: the mRNA can be processed (capped, spliced and tailed) before it goes to the ribosomes, which allows regulation and the creation of different proteins from one gene. **Peroxisomes** carry out reactions that generate hydrogen peroxide, a harmful product, and contain catalase to break it down safely. In the **chloroplast**, the thylakoid space is small, so protons accumulate quickly. A cell can also keep different pH values in different compartments to suit each set of enzymes.
`,
  ],
  cards: [
    ["Zero-change point", "The sucrose concentration at which a tissue neither gains nor loses mass; its water potential equals the solution's."],
    ["Interpolation", "Estimating a value between two data points."],
    ["Reverse osmosis", "Using applied pressure to force water through a membrane against its water potential gradient."],
    ["Nuclear envelope", "The double membrane that separates transcription from translation."],
    ["Peroxisome", "An organelle that makes and breaks down hydrogen peroxide using catalase."],
    ["Catalase", "An enzyme that breaks down hydrogen peroxide."],
    ["mRNA processing", "Capping, splicing and tailing of mRNA in the nucleus before export."],
    ["Thylakoid space", "A small compartment in the chloroplast where protons accumulate."],
  ],
  closed: [
    [
      "A potato core gains mass in a solution. What does this show about the solution's water potential?",
      ["It is lower than the potato's", "It is higher than the potato's", "It is equal to the potato's", "It is zero"],
      "B",
    ],
    [
      "Potato cores show +4% change at 0.2 M and -6% at 0.4 M. The approximate zero-change molarity is:",
      ["0.20 M", "0.28 M", "0.35 M", "0.50 M"],
      "B",
    ],
    [
      "What is the solute potential of 0.3 M sucrose at 25 degrees Celsius (R = 0.0831 L bar/mol K)?",
      ["-0.74 bar", "-7.4 bar", "-74 bar", "+7.4 bar"],
      "B",
    ],
    [
      "A benefit of separating transcription from translation in eukaryotes is:",
      ["The mRNA can be processed before translation", "Proteins are made faster", "DNA is made smaller", "Ribosomes are not needed"],
      "A",
    ],
    [
      "Which organelle contains catalase to break down hydrogen peroxide?",
      ["Lysosome", "Peroxisome", "Golgi apparatus", "Ribosome"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Potato cores lose 6 percent of their mass in 0.4 M sucrose and gain 4 percent in 0.2 M sucrose. Estimate the molarity at which there is no change, calculate the solute potential of that solution at 25 degrees Celsius, and state what this tells you about the potato tissue.",
      scheme: [
        "Interpolates the zero-change point at about 0.28 M (between 0.2 and 0.4)",
        "Calculates the solute potential as about -6.9 bar (using 0.28 M)",
        "States that the water potential of the solution equals the potato's at this point",
        "Concludes the potato tissue has a water potential of about -7 bar",
      ],
      model:
        "Interpolating between +4 percent at 0.2 M and -6 percent at 0.4 M gives a zero-change point at 0.2 + 0.2 times 4/10, which is 0.28 M. The solute potential is -(1)(0.28)(0.0831)(298) = -6.9 bar. At this point there is no net movement, so the water potential of the solution equals that of the potato tissue, which is about -7 bar.",
      answers: [
        [
          "full",
          "[[0|The zero point is 0.2 + 0.2 × (4/10) = 0.28 M.]] [[1|Ψs = −(1)(0.28)(0.0831)(298) = −6.9 bar.]] [[2|At the zero point, the solution and the potato have the same water potential.]] [[3|So the potato tissue has a water potential of about −7 bar.]]",
          "Full marks. Each step follows from the previous one, with correct units.",
        ],
        [
          "full",
          "[[0|From the graph, no change occurs at about 0.28 M.]] [[1|Solute potential = −iCRT = −6.9 bar.]] [[2|No net movement of water means the water potentials are equal.]] [[3|The potato's water potential is therefore about −6.9 bar.]]",
          "All four marks, with a clear rationale for the equality of potentials.",
        ],
        [
          "partial",
          "[[0|The zero-change molarity is about 0.28 M.]] [[1|Ψs = −6.9 bar.]]",
          "Explain what the zero-change point tells you about the potato's water potential.",
        ],
        [
          "partial",
          "[[2|The water potentials are equal at the zero point.]] [[3|The potato is about −7 bar.]] The zero-change point is 0.3 M, found by averaging 0.2 and 0.4.",
          "Averaging the molarities ignores the shape of the data. Interpolating between +4 and -6 gives 0.28 M.",
          true,
        ],
        [
          "weak",
          "-6 + 4 = -2 so the water potential of the potato is -2%.",
          "Water potential is in bar, not percent. The zero-change molarity is what tells us the potato's water potential.",
        ],
        [
          "weak",
          "[[1|Ψs is −6.9 bar.]] The potato gained mass, so its water potential is positive.",
          "Water potentials of tissues in this experiment are negative. At the zero-change point the potato's water potential matches that of the solution.",
        ],
      ],
    },
    {
      prompt:
        "Explain two ways in which compartmentalization improves the efficiency or safety of cellular processes in eukaryotes. Use the nuclear envelope and the peroxisome as examples.",
      scheme: [
        "States that the nuclear envelope separates transcription from translation",
        "Explains that this allows mRNA processing (capping, splicing, tailing) before translation, which allows regulation",
        "States that peroxisomes carry out reactions that produce hydrogen peroxide",
        "Explains that catalase in the peroxisome breaks down hydrogen peroxide safely, protecting the rest of the cell",
      ],
      model:
        "The nuclear envelope separates transcription in the nucleus from translation in the cytoplasm. This allows mRNA to be processed by capping, splicing and adding a tail before it is translated, which allows regulation. Peroxisomes carry out reactions that produce hydrogen peroxide, a harmful compound. They contain catalase, which breaks it down safely, protecting the rest of the cell.",
      answers: [
        [
          "full",
          "[[0|The nuclear envelope keeps transcription in the nucleus away from translation in the cytoplasm.]] [[1|That gives the cell time to process the mRNA by capping, splicing and adding a tail before it is translated.]] [[2|Peroxisomes carry out reactions that make hydrogen peroxide.]] [[3|Catalase in the peroxisome breaks the peroxide down, so the rest of the cell isn't damaged.]]",
          "Full marks. The two examples show regulation and protection.",
        ],
        [
          "full",
          "[[0|The nucleus separates transcription from translation.]] [[1|mRNA can be spliced and modified first, which makes regulation and alternative splicing possible.]] [[2|Peroxisomes isolate reactions that generate H₂O₂.]] [[3|Catalase there converts it to water and oxygen, protecting the cell.]]",
          "All four marks, with a precise description of the products of catalase.",
        ],
        [
          "partial",
          "[[0|The nuclear envelope separates transcription and translation.]] [[2|Peroxisomes handle hydrogen peroxide.]]",
          "Explain the benefit in each case: the processing of mRNA, and the safe breakdown of peroxide by catalase.",
        ],
        [
          "partial",
          "[[1|mRNA is processed first.]] [[3|Catalase protects the cell.]] Peroxisomes digest worn-out organelles.",
          "That is the job of lysosomes. Peroxisomes handle hydrogen peroxide.",
          true,
        ],
        [
          "weak",
          "Compartments give the cell more room so it can store more DNA and proteins, and this is the only reason.",
          "Compartments improve efficiency by separating reactions and conditions.",
        ],
        [
          "weak",
          "[[2|Peroxisomes make hydrogen peroxide.]] Prokaryotes also have nuclei that separate transcription from translation.",
          "Prokaryotes have no nucleus, so transcription and translation occur together in the cytoplasm.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Enzyme kinetics, the rate of photosynthesis and the respiratory chain",
  note: `
## Objectives

Students will be able to:

1. explain how enzymes lower activation energy and how inhibitors and conditions change their rate, from rate data;
2. describe the light-dependent and light-independent reactions of photosynthesis and the factors that limit the rate;
3. describe the stages of cellular respiration, where ATP is made, and the effect of electron transport inhibitors.

## Materials

Lactase and milk-like substrate data, data tables of photosynthesis rate against light, a diagram of the respiratory chain, calculators, the quiz.

## Starter (6 minutes)

Give: "Cyanide stops cells from using oxygen within minutes. Why would blocking one protein in the mitochondrion be so deadly?" Take ideas, then trace the chain.

## Main activity

1. Enzyme data: graph of rate against substrate concentration with and without an inhibitor. Compare the maximum rates: the same maximum means competitive, a lower maximum means noncompetitive.
2. Limiting factors in photosynthesis: light, CO2 and temperature. Interpret a graph that plateaus.
3. Respiration and inhibitors: cyanide and carbon monoxide block the last carrier of the electron transport chain, so the chain stops and ATP production collapses. Rotenone blocks the first complex. An uncoupler lets protons leak and the energy is lost as heat.

## Checking for understanding

Ask: "What happens to the proton gradient and ATP synthesis when cyanide is added?"

## Quiz

Five questions on enzymes, photosynthesis and the respiratory chain.
`,
  reading: [
    "Reading the rate graphs",
    `
Enzyme studies produce graphs of reaction rate against substrate concentration. Without an inhibitor, the curve rises and then levels off at a maximum rate, Vmax, when all the active sites are occupied. A **competitive inhibitor** competes for the active site. At low substrate concentration it reduces the rate, but at high substrate concentration the substrate outcompetes it and the curve reaches the same Vmax. A **noncompetitive inhibitor** binds elsewhere and reduces the number of working enzyme molecules, so the maximum rate is lower, however much substrate is added. In an experiment with the enzyme lactase, if the inhibited curve reaches the same plateau as the control at high lactose, the inhibitor is competitive; if the plateau is lower, it is noncompetitive. Temperature and pH change the rate in the way discussed before, with an optimum for each enzyme.

The same kind of thinking applies to photosynthesis. The rate can be measured by oxygen release, CO2 uptake or the floating of leaf disks. As light intensity increases from zero, the rate increases in proportion. At higher intensity the curve levels off, since another factor, such as the concentration of CO2 or the amount of rubisco, becomes limiting. Raising the CO2 concentration in a greenhouse lifts the plateau, while raising temperature increases the rate until enzymes begin to denature. At low light intensity, light is the **limiting factor**. The structure of the process explains the pattern: the light reactions require photons to make ATP and NADPH, and the Calvin cycle needs enzymes and CO2.

In cellular respiration, the electron transport chain (ETC) is the last and most productive stage. NADH and FADH2 donate electrons to complexes in the inner mitochondrial membrane, which pump protons into the intermembrane space. At the end of the chain oxygen accepts the electrons and forms water. The proton gradient drives ATP synthase. Inhibitors reveal the logic of the pathway. **Cyanide** and **carbon monoxide** bind the last complex, cytochrome c oxidase, so electrons cannot be passed to oxygen. The chain backs up, the proton gradient collapses, and ATP synthesis stops, which is why cyanide is fatal within minutes. **Rotenone** blocks the first complex, with the same eventual effect. An **uncoupler** such as dinitrophenol makes the membrane leaky to protons, so the chain continues and oxygen is consumed, but the gradient dissipates and no ATP is made; the energy is released as heat. In the brown fat of newborns a natural uncoupling protein does this to warm the body.
`,
  ],
  cards: [
    ["Vmax", "The maximum rate of an enzyme-catalyzed reaction, when all active sites are occupied."],
    ["Limiting factor", "The factor in shortest supply, which sets the rate of a process."],
    ["Cytochrome c oxidase", "The last complex of the ETC, which passes electrons to oxygen."],
    ["Cyanide", "A poison that blocks cytochrome c oxidase and stops the ETC."],
    ["Rotenone", "An inhibitor of the first complex of the ETC."],
    ["Uncoupler", "A substance that lets protons leak across the membrane, producing heat instead of ATP."],
    ["Proton gradient", "A difference in H+ concentration across the inner mitochondrial membrane that drives ATP synthase."],
    ["Brown fat", "Tissue in which a natural uncoupling protein generates heat."],
  ],
  closed: [
    [
      "In an enzyme experiment, the inhibited reaction reaches the same Vmax as the control at high substrate concentration. The inhibitor is:",
      ["Competitive", "Noncompetitive", "An activator", "A coenzyme"],
      "A",
    ],
    [
      "A photosynthesis rate graph levels off at high light intensity. This suggests that:",
      ["Light is still limiting", "Another factor, such as CO2 or enzyme amount, is now limiting", "The temperature is too low only", "Photosynthesis has stopped"],
      "B",
    ],
    [
      "Why does cyanide stop ATP production?",
      ["It destroys glucose", "It blocks the final step of the ETC, so the proton gradient collapses", "It stops glycolysis", "It removes oxygen from the blood"],
      "B",
    ],
    [
      "An uncoupler in mitochondria would cause:",
      ["More ATP and less heat", "More heat and less ATP", "No oxygen use", "No electron transport"],
      "B",
    ],
    [
      "A noncompetitive inhibitor affects the enzyme's rate by:",
      ["Raising Vmax", "Lowering Vmax", "Leaving Vmax unchanged", "Changing the substrate"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe how cyanide poisoning stops ATP production. Trace the effect from the last complex of the electron transport chain to the cell's energy supply, and contrast with the action of an uncoupler.",
      scheme: [
        "States that cyanide binds the final complex (cytochrome c oxidase), so electrons cannot be transferred to oxygen",
        "States that the electron transport chain stops, so protons are no longer pumped and the gradient collapses",
        "States that without the gradient ATP synthase cannot make ATP, so the cell's ATP supply fails",
        "Contrasts with an uncoupler, which lets protons leak so that the chain continues to run but the energy is lost as heat rather than ATP",
      ],
      model:
        "Cyanide binds the final complex of the chain, cytochrome c oxidase, so electrons cannot be passed to oxygen. The chain stops, so protons are no longer pumped and the gradient collapses. Without the gradient ATP synthase cannot make ATP, and the cell's energy supply fails. An uncoupler, in contrast, lets protons leak across the membrane, so the chain keeps running and oxygen keeps being used, but the energy is lost as heat rather than ATP.",
      answers: [
        [
          "full",
          "[[0|Cyanide binds the last complex of the chain, cytochrome c oxidase, so electrons can't go to oxygen.]] [[1|The chain backs up and stops pumping protons, so the gradient disappears.]] [[2|ATP synthase can't make ATP without the gradient, and the cell runs out of energy.]] [[3|An uncoupler is different, since it lets protons leak so the chain keeps running and oxygen is used, but energy is lost as heat instead of ATP.]]",
          "Full marks. The contrast between blocking the chain and uncoupling it is exactly right.",
        ],
        [
          "full",
          "[[0|Cyanide inhibits cytochrome c oxidase, the complex that passes electrons to O₂.]] [[1|Electron flow and proton pumping stop, so the proton motive force collapses.]] [[2|With no gradient there is no ATP made by ATP synthase.]] [[3|With an uncoupler the chain still works and oxygen is consumed, but the protons leak across, and so heat is made instead of ATP.]]",
          "All four marks, with precise terms.",
        ],
        [
          "partial",
          "[[0|Cyanide blocks the end of the chain.]] [[2|No ATP is made.]]",
          "Explain how the proton gradient is affected, and contrast with an uncoupler.",
        ],
        [
          "partial",
          "[[1|The gradient collapses.]] [[3|An uncoupler stops the chain too.]] Cyanide stops glycolysis, so there is no ATP.",
          "Cyanide acts on the final complex of the electron transport chain, not on glycolysis. An uncoupler lets the chain run but wastes the energy.",
          true,
        ],
        [
          "weak",
          "Cyanide takes away all the oxygen from the blood, so the cells cannot breathe and they stop working.",
          "Oxygen is still in the blood. Cyanide stops the cell using it by blocking the last complex of the chain.",
        ],
        [
          "weak",
          "[[3|An uncoupler produces heat.]] Cyanide also produces heat because it speeds up the chain.",
          "Cyanide blocks the chain and the gradient collapses. It does not speed it up.",
        ],
      ],
    },
    {
      prompt:
        "A graph shows the rate of photosynthesis in a water plant against light intensity at 20 degrees Celsius, leveling off at high intensity. Explain the shape of the curve, and predict the effect of raising the CO2 concentration and the temperature to 30 degrees on the plateau.",
      scheme: [
        "Explains that at low intensity the rate rises with light because light is the limiting factor",
        "Explains that at the plateau another factor, such as CO2 or enzymes, is limiting",
        "Predicts that raising the CO2 concentration raises the plateau",
        "Predicts that a moderate temperature rise raises the plateau because the enzymatic reactions are faster, until denaturation",
      ],
      model:
        "At low light the rate rises with intensity because light is the limiting factor for the light reactions. At the plateau another factor, such as the CO2 concentration or the amount of enzyme, is limiting. Raising the CO2 concentration would raise the plateau. Raising the temperature to 30 degrees would also raise it, because the enzyme-catalyzed reactions of the Calvin cycle are faster, until the enzymes begin to denature at higher temperatures.",
      answers: [
        [
          "full",
          "[[0|At low light the rate goes up with light because light is the limiting factor.]] [[1|At the plateau something else limits it, like CO₂ or the amount of rubisco.]] [[2|More CO₂ would raise the plateau.]] [[3|30 degrees would raise it too since the Calvin cycle enzymes work faster, as long as it isn't hot enough to denature them.]]",
          "Full marks. Both predictions are reasoned from the limiting-factor idea.",
        ],
        [
          "full",
          "[[0|Rate is proportional to light at first because the light reactions are the bottleneck.]] [[1|When the curve flattens, the Calvin cycle (CO₂ supply or enzymes) is the limit.]] [[2|Raising CO₂ gives a higher plateau.]] [[3|A warmer temperature speeds up the enzymes so the plateau rises up to the optimum.]]",
          "All four marks, with the stages of photosynthesis linked to each limit.",
        ],
        [
          "partial",
          "[[0|Light is limiting at the start.]] [[2|More CO2 raises the plateau.]]",
          "Explain what limits the plateau, and predict the effect of the temperature.",
        ],
        [
          "partial",
          "[[1|Something else is limiting at the plateau.]] [[3|Raising the temperature raises it.]] Raising the light would raise the plateau because light is still limiting.",
          "At the plateau, light is no longer limiting. Adding more light will not raise it; other factors must change.",
          true,
        ],
        [
          "weak",
          "The curve levels off because the plant gets tired of photosynthesis and needs to rest in the dark.",
          "The plateau shows that another factor has become limiting, not that the plant is tired.",
        ],
        [
          "weak",
          "[[2|More CO2 raises the plateau.]] Temperature does not matter to photosynthesis since it is only about light.",
          "The Calvin cycle is enzyme-catalyzed, so temperature affects the rate.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Fermentation in industry, and signaling by receptors and quorum sensing",
  note: `
## Objectives

Students will be able to:

1. compare aerobic respiration and fermentation, including their uses in industry;
2. describe the stages of cell signaling and give examples of pathways in animals and bacteria.

## Materials

Yeast, sugar and flasks with balloons, a table of data on gas production, signal pathway cards, calculators, the problem set.

## Starter (6 minutes)

Show the labels of yogurt, beer and bread. Ask: "What do these have in common biologically, and how do they differ in the end products?" Collect the ideas of lactic and alcohol fermentation.

## Main activity

1. Fermentation in industry: yeast ethanol (brewing, biofuel), bacterial lactic fermentation (yogurt, cheese). Compare ATP yield with aerobic respiration and explain why yeast ferment even in the presence of oxygen when sugar is abundant.
2. The insulin receptor: a receptor tyrosine kinase that dimerizes and phosphorylates itself, triggering a cascade that moves glucose transporters to the membrane.
3. Quorum sensing in bacteria: autoinducer molecules accumulate in a dense population and, at a threshold, trigger a change in gene expression (bioluminescence in Vibrio fischeri).
4. Problem solving with signal blockers: predict the effect of mutations in receptor, kinase or phosphatase.

## Checking for understanding

Ask: "How does quorum sensing differ from hormone signaling in animals?"

## Problem set

Fermentation yield, an insulin pathway question and a quorum sensing question.
`,
  reading: [
    "Fermentation at scale, and signals between cells",
    `
Humans have used fermentation for thousands of years. Yeast ferment sugar to ethanol and carbon dioxide: in bread dough the CO2 makes the loaf rise and the ethanol evaporates in baking; in brewing the ethanol is the product, and in the production of fuel ethanol from corn grown in Ohio and Indiana, the yeast convert glucose from starch into ethanol. Lactic acid bacteria ferment lactose in milk to lactic acid, which lowers the pH and makes the milk proteins clump into yogurt or cheese. In each case the organism is just making ATP by glycolysis and regenerating NAD+. The net gain is only 2 ATP per glucose, compared with 30 to 32 in aerobic respiration, so fermenting organisms use a lot of sugar and release a lot of product. Yeast actually ferment even when oxygen is available, if sugar is abundant, because the rapid but inefficient route lets them out-compete other microbes by poisoning them with ethanol.

Cells communicate in many ways. Animal cells respond to **insulin** through a **receptor tyrosine kinase**. When insulin binds to the outer domain of the receptor, two receptor molecules come together, and each adds phosphate to tyrosine residues on the other (autophosphorylation). The activated receptor then phosphorylates relay proteins, which trigger a cascade that ends with vesicles carrying glucose transporters to the cell membrane. More glucose enters the cell, and the blood glucose falls. In type 2 diabetes, cells respond poorly to insulin, and mutations in the receptor or the relay proteins can cause this. A mutation that leaves the kinase permanently active would make cells behave as if insulin were always present.

Bacteria also communicate. In **quorum sensing**, each cell secretes a small signaling molecule called an **autoinducer**. At low population density the molecule diffuses away. As the population grows, the concentration builds up, and when it reaches a threshold, it binds a receptor in or on the cells and changes gene expression in all of them at once. The marine bacterium *Vibrio fischeri* lives in the light organ of the Hawaiian bobtail squid. At low density in seawater the bacteria are dark, but in the dense population in the squid, the autoinducer accumulates and the bacteria switch on the genes for bioluminescence. The squid uses the light to hide its shadow from predators. Quorum sensing also coordinates the formation of biofilms and the release of toxins in pathogens, so drugs that block it are being studied as antibacterial agents.

All signaling pathways share the three stages of **reception**, **transduction** and **response**, and the ability to turn the signal off, by enzymes that degrade the signal or remove phosphates.
`,
  ],
  cards: [
    ["Alcohol fermentation", "Conversion of pyruvate to ethanol and CO2 by yeast, regenerating NAD+."],
    ["Lactic acid fermentation", "Conversion of pyruvate to lactate by some bacteria and muscle cells."],
    ["Receptor tyrosine kinase", "A receptor that, when it binds a ligand, phosphorylates itself and relay proteins."],
    ["Autophosphorylation", "A receptor adding phosphate groups to its own partner subunit."],
    ["Quorum sensing", "Bacteria sensing their population density by autoinducer molecules."],
    ["Autoinducer", "A signaling molecule secreted by bacteria to measure their density."],
    ["Bioluminescence", "Light produced by living things."],
    ["Biofilm", "A community of bacteria attached to a surface in a matrix."],
  ],
  closed: [
    [
      "Why does bread dough rise?",
      ["Yeast produce CO2 by fermentation", "Yeast produce oxygen", "Lactic acid expands", "The flour absorbs air"],
      "A",
    ],
    [
      "Which best describes a receptor tyrosine kinase?",
      ["A channel that opens with a ligand", "A receptor that phosphorylates itself and other proteins after binding a ligand", "An enzyme that makes cAMP", "A transcription factor"],
      "B",
    ],
    [
      "Quorum sensing allows bacteria to:",
      ["Reproduce faster", "Detect their population density and change gene expression", "Make antibodies", "Move toward food"],
      "B",
    ],
    [
      "A mutation leaves the kinase of the insulin receptor permanently active. The likely effect on a muscle cell is:",
      ["No glucose uptake", "Glucose transporters are always in the membrane, as if insulin were present", "Faster fermentation only", "The cell cannot divide"],
      "B",
    ],
    [
      "How many net ATP does fermentation of one glucose make?",
      ["2", "4", "30", "36"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the sequence of events in quorum sensing in Vibrio fischeri in the squid's light organ, and explain why the bacteria are dark in open seawater but luminous in the squid.",
      scheme: [
        "States that each cell secretes an autoinducer",
        "States that in open seawater, the low density means the autoinducer diffuses away and stays at a low concentration",
        "States that in the light organ the high density lets the autoinducer reach a threshold concentration",
        "States that the autoinducer binds a receptor and turns on the genes for bioluminescence in all cells at once",
      ],
      model:
        "Each Vibrio cell secretes a small autoinducer molecule. In open seawater the cell density is low, so the autoinducer diffuses away and stays at a low concentration. In the squid's light organ the cells are dense, and the autoinducer reaches a threshold concentration. It binds a receptor and turns on the genes for bioluminescence in all the cells at once.",
      answers: [
        [
          "full",
          "[[0|Each bacterium secretes an autoinducer molecule.]] [[1|In seawater there are few cells so the autoinducer is diluted and stays low.]] [[2|In the light organ the bacteria are crowded, so it builds up to a threshold.]] [[3|At that point it binds a receptor and switches on the bioluminescence genes in all of the cells together.]]",
          "Full marks. The role of cell density is clear, and the coordinated response is explained.",
        ],
        [
          "full",
          "[[0|The cells continually release signal molecules called autoinducers.]] [[1|At low density, they diffuse away.]] [[2|In the light organ, the high density lets the concentration rise to a critical level.]] [[3|The autoinducer activates a receptor that turns on the lux genes, so the whole population glows.]]",
          "All four marks, and the lux gene detail is accurate.",
        ],
        [
          "partial",
          "[[0|They make autoinducers.]] [[3|The bioluminescence genes turn on.]]",
          "Explain why the bacteria are dark in seawater and luminous in the squid, using population density.",
        ],
        [
          "partial",
          "[[2|In the light organ the density is high and the signal builds up.]] [[1|In seawater the cells are far apart.]] The bacteria make light because the squid tells them to by a hormone.",
          "The signal is made by the bacteria themselves. The squid provides the high-density environment.",
          true,
        ],
        [
          "weak",
          "The bacteria are dark in seawater because there is no light there, and the squid shines a flashlight on them to make them glow.",
          "The bacteria produce their own light. They do so when the autoinducer concentration is high enough.",
        ],
        [
          "weak",
          "[[3|The bioluminescence genes are switched on.]] Each bacterium decides to glow by itself, no matter how many cells are around.",
          "The response depends on cell density. Quorum sensing coordinates the whole population.",
        ],
      ],
    },
    {
      prompt:
        "Describe how insulin binding to its receptor leads to glucose uptake in a muscle cell. Predict the effect of a mutation that inactivates the receptor's kinase domain, and explain the connection to type 2 diabetes.",
      scheme: [
        "States that insulin binds the receptor, which dimerizes and autophosphorylates",
        "States that the activated receptor phosphorylates relay proteins, starting a cascade",
        "States that the cascade causes vesicles with glucose transporters to fuse with the membrane, increasing glucose uptake",
        "Predicts that a mutated kinase domain prevents the signal, so glucose uptake is reduced and blood glucose stays high, as in insulin resistance in type 2 diabetes",
      ],
      model:
        "Insulin binds the receptor tyrosine kinase, which dimerizes and autophosphorylates. The activated receptor phosphorylates relay proteins, starting a cascade that ends in vesicles carrying glucose transporters fusing with the membrane. This increases glucose uptake. A mutation that inactivates the kinase domain would prevent the signal, so glucose uptake would be reduced and blood glucose would stay high, as in the insulin resistance of type 2 diabetes.",
      answers: [
        [
          "full",
          "[[0|Insulin binds the receptor, which pairs up and phosphorylates itself.]] [[1|The activated receptor phosphorylates relay proteins to start a cascade.]] [[2|Vesicles with glucose transporters move to the membrane and fuse, so more glucose enters.]] [[3|If the kinase can't work, the signal isn't passed on, glucose uptake stays low and blood glucose is high, like insulin resistance in type 2 diabetes.]]",
          "Full marks. The effect of the mutation is predicted from the pathway.",
        ],
        [
          "full",
          "[[0|Ligand binding causes dimerization and autophosphorylation of the tyrosine kinase.]] [[1|Phosphorylated tyrosines recruit relay proteins, which are phosphorylated in a cascade.]] [[2|The end result is GLUT4 vesicles inserting into the membrane to take up glucose.]] [[3|A dead kinase breaks the pathway, so cells don't respond to insulin, which resembles type 2 diabetes.]]",
          "All four marks, with the transporter named.",
        ],
        [
          "partial",
          "[[0|Insulin binds the receptor and it phosphorylates itself.]] [[2|Glucose transporters go to the membrane.]]",
          "Describe the relay between the receptor and the transporters, and predict the effect of the mutation.",
        ],
        [
          "partial",
          "[[3|The mutation would lead to insulin resistance.]] [[1|A cascade is started.]] The mutation makes the cell take up more glucose.",
          "A mutation inactivating the kinase would reduce the response, so less glucose is taken up.",
          true,
        ],
        [
          "weak",
          "Insulin goes into the cell and binds the DNA so that the cell makes more glucose from sugar.",
          "Insulin binds to a surface receptor and does not enter the cell. The result is uptake of glucose by transporters.",
        ],
        [
          "weak",
          "[[2|More glucose transporters are put in the membrane.]] If the receptor kinase is broken, the cell takes up more glucose because the signal is always on.",
          "If the kinase is broken, the signal is not transmitted, so the cell takes up less glucose.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Feedback in physiology and the cell cycle in cancer therapy",
  note: `
## Objectives

Students will be able to:

1. explain how feedback regulates a biological process, in organisms and in cells;
2. describe the cell cycle and how checkpoints control it, and relate it to cancer treatment.

## Materials

Cell cycle phase duration data, a model of the Cdk-cyclin cycle, chemotherapy examples, calculators, the worksheet.

## Starter (6 minutes)

Pose: "Taxol is a drug that locks microtubules in place, and it is used against breast cancer. At which stage of the cell cycle would it have an effect, and why would it harm cells that divide quickly more than others?" Take guesses.

## Main activity

1. Feedback examples: thermoregulation (negative), blood glucose by insulin and glucagon (negative), childbirth (positive), and lac operon-like end-product inhibition in a pathway. Identify the receptor, control center and effector for each.
2. The cell cycle with numbers: G1 11 h, S 8 h, G2 4 h, M 1 h in a cell line with a 24 hour cycle. Calculate the fraction of time in each phase and the percent of a random population expected in each.
3. Cdk-cyclin control, checkpoints and how drugs act: taxol and vinblastine (spindle), antimetabolites (S phase), and Cdk inhibitors. Why side effects occur in fast-dividing normal tissues (hair follicles, gut lining, bone marrow).

## Checking for understanding

Ask: "Which stage will have the most cells in a random sample: G1, S, G2 or M?"

## Worksheet

Feedback identification, a cell cycle calculation and a drug mechanism explanation.
`,
  reading: [
    "Control loops, timing and targeting division",
    `
Feedback occurs at every scale. In **thermoregulation**, receptors in the skin and hypothalamus detect a rise in body temperature, the hypothalamus acts as the control center, and the effectors, sweat glands and skin blood vessels, cool the body. The response reduces the stimulus, so it is negative feedback. Blood glucose is another negative loop with two opposing hormones. **Positive feedback** is rarer: in childbirth, the stretching of the cervix triggers oxytocin release, which increases contractions, which increase stretching, until the baby is born. In a cell, **end-product inhibition** is a negative feedback loop in which the final molecule of a pathway inhibits the first enzyme.

The cell cycle can be analyzed with numbers. Suppose a cell line has a 24-hour cycle in which G1 lasts 11 hours, S lasts 8 hours, G2 lasts 4 hours and M lasts 1 hour. The fraction of time in each phase is 46 percent for G1, 33 percent for S, 17 percent for G2 and 4 percent for M. In a random sample of cells, these will also be the approximate percentages found in each phase. A flow cytometer, which measures the DNA content of thousands of cells, can show these proportions. Cells in G1 have one set of DNA (2C); those in G2 and M have double (4C); those in S have an intermediate amount.

The cycle is driven by **cyclin-dependent kinases (Cdks)**. Each Cdk is inactive without its cyclin partner, and the concentration of each cyclin rises and falls through the cycle. The G1/S cyclin-Cdk complex lets the cell enter S phase, and the M cyclin-Cdk complex triggers mitosis. Checkpoints can delay the cycle, for example when DNA damage activates p53. Cancer cells have lost this control through mutations in genes that stimulate division (oncogenes) or restrain it (tumor suppressors).

Many cancer drugs target the cell cycle. **Taxol** (paclitaxel) stabilizes microtubules so the mitotic spindle cannot function, and cells are arrested in M phase and die. **Vinblastine** does the opposite, preventing microtubules from assembling, with the same result. **Antimetabolites** such as methotrexate and 5-fluorouracil block the synthesis of nucleotides, and so act on cells in S phase. These drugs are more effective against rapidly dividing cells, which is why they work against tumors, but they also harm normal fast-dividing tissues: hair follicles, the gut lining and the bone marrow. That explains the side effects of chemotherapy: hair loss, nausea and a weakened immune system. Newer drugs inhibit specific Cdks or the mutated proteins found only in the tumor, aiming to reduce the damage to normal cells.
`,
  ],
  cards: [
    ["Thermoregulation", "Negative feedback control of body temperature by the hypothalamus."],
    ["Flow cytometry", "A method that measures the DNA content of many cells to find the cycle phase."],
    ["Cdk", "A cyclin-dependent kinase that drives the cell cycle forward."],
    ["Taxol", "A drug that stabilizes microtubules, arresting cells in mitosis."],
    ["Vinblastine", "A drug that prevents microtubule assembly, arresting cells in mitosis."],
    ["Antimetabolite", "A drug that blocks nucleotide synthesis and acts on cells in S phase."],
    ["Oncogene", "A mutated gene that stimulates division continuously."],
    ["Tumor suppressor", "A gene whose product restrains the cell cycle, such as p53."],
  ],
  closed: [
    [
      "A cell line has a 24-hour cycle with S phase lasting 8 hours. What percent of a random population should be in S phase?",
      ["8%", "17%", "33%", "46%"],
      "C",
    ],
    [
      "Taxol arrests cells in mitosis by:",
      ["Blocking nucleotide synthesis", "Stabilizing microtubules so the spindle cannot work", "Damaging the nuclear envelope", "Inhibiting p53"],
      "B",
    ],
    [
      "Why does chemotherapy cause hair loss?",
      ["Hair cells are always in G0", "Hair follicle cells divide rapidly and are harmed", "Hair is made of tumor", "The drugs dissolve keratin"],
      "B",
    ],
    [
      "Methotrexate, which blocks nucleotide synthesis, would mostly affect cells in:",
      ["M phase", "S phase", "G0", "Cytokinesis"],
      "B",
    ],
    [
      "Oxytocin strengthening contractions in labor is an example of:",
      ["Negative feedback", "Positive feedback", "End-product inhibition", "Competitive inhibition"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "In a cell line with a 24-hour cycle, G1 lasts 11 hours, S 8 hours, G2 4 hours and M 1 hour. Calculate the expected percent of cells in each phase in a random sample, and predict how the percentages change after treatment with taxol for 12 hours.",
      scheme: [
        "Calculates G1 as about 46 percent and S as about 33 percent",
        "Calculates G2 as about 17 percent and M as about 4 percent",
        "Predicts that taxol arrests cells in M phase, so the percent in M increases",
        "Predicts that the percents of the other phases decrease as cells accumulate in M and do not enter G1",
      ],
      model:
        "The percent of cells in each phase equals its duration divided by 24 hours: G1 is 11/24 = 46 percent, S is 8/24 = 33 percent, G2 is 4/24 = 17 percent and M is 1/24 = 4 percent. Taxol stabilizes microtubules and arrests cells in mitosis, so the percent in M would rise sharply, while the percentages in the other phases would fall as cells accumulate in M and do not return to G1.",
      answers: [
        [
          "full",
          "[[0|G1 is 11/24 = 46% and S is 8/24 = 33%.]] [[1|G2 is 4/24 = 17% and M is 1/24 = 4%.]] [[2|Taxol arrests cells in M, so the percent in M goes up.]] [[3|The other phases go down since the cells pile up in M and don't get back to G1.]]",
          "Full marks. You tied the percent of cells to the duration of each phase.",
        ],
        [
          "full",
          "[[0|The fractions of time are 46% in G1 and 33% in S.]] [[1|And 17% in G2 and 4% in M.]] [[2|Taxol locks the spindle, so cells are stuck in mitosis and the M fraction rises sharply.]] [[3|Fewer cells are in G1, S and G2 because the cells can't complete division to restart the cycle.]]",
          "All four marks, with the reasoning about the stuck cells.",
        ],
        [
          "partial",
          "[[0|G1 is 46% and S is 33%.]] [[1|G2 is 17% and M is 4%.]] Taxol makes the cells go through the cycle faster, so the percent in M goes down.",
          "Taxol stabilizes microtubules so the spindle cannot work, which arrests cells in M and increases the percent there.",
        ],
        [
          "partial",
          "[[2|The percent in M would go up.]] [[3|The other phases go down.]]",
          "Your prediction is right. Calculate the percentages of cells in each phase before the treatment.",
          true,
        ],
        [
          "weak",
          "11 + 8 + 4 + 1 = 24 so 24% of cells are in each phase and taxol makes them divide into more cells.",
          "Divide the length of each phase by 24 hours to get the percent. Taxol arrests cells in mitosis; it does not make them divide.",
        ],
        [
          "weak",
          "[[1|G2 is 17% and M is 4%.]] G1 is 11% and S is 8%, because the hours are the same as the percents.",
          "The percent is the hours divided by 24: G1 is 46 percent and S is 33 percent.",
        ],
      ],
    },
    {
      prompt:
        "Explain why chemotherapy drugs that target rapidly dividing cells harm tumors but also cause side effects such as hair loss and a weakened immune system. Suggest how newer targeted therapies could reduce these side effects.",
      scheme: [
        "States that tumor cells divide rapidly and are vulnerable to drugs that disrupt division",
        "States that normal tissues with fast cell turnover, such as hair follicles, gut lining and bone marrow, are also affected",
        "Links bone marrow damage to a weakened immune system (fewer white blood cells)",
        "Suggests that targeted therapies attack proteins found only in tumor cells (a mutated kinase, for example) and spare normal cells",
      ],
      model:
        "Tumor cells divide rapidly, so they are vulnerable to drugs that disrupt division. But normal tissues that also divide quickly, such as hair follicles, the gut lining and the bone marrow, are harmed as well. Damage to the bone marrow reduces the production of white blood cells, which weakens the immune system. Targeted therapies attack proteins found only in tumor cells, such as a mutated kinase, and so spare normal cells.",
      answers: [
        [
          "full",
          "[[0|Tumor cells divide fast, so drugs that block division hit them hard.]] [[1|Hair follicles, the gut lining and the bone marrow also divide quickly, so they are harmed too.]] [[2|Damage to the bone marrow means fewer white blood cells, so the immune system is weaker.]] [[3|Targeted therapies attack a protein only the tumor has, such as a mutated kinase, so normal cells are spared.]]",
          "Full marks. Each side effect is tied to a tissue and a mechanism.",
        ],
        [
          "full",
          "[[0|Chemotherapy kills the cells that are dividing, which includes cancer cells.]] [[1|Normal tissues with rapid turnover are affected, like hair roots and the intestinal lining.]] [[2|Bone marrow suppression lowers white blood cell counts and causes infections.]] [[3|Drugs aimed at oncogene products found only in tumor cells should be much more selective.]]",
          "All four marks, and the infection link is accurate.",
        ],
        [
          "partial",
          "[[0|Tumor cells divide fast so the drugs harm them.]] [[1|Hair follicles divide quickly too.]]",
          "Link the bone marrow to the weakened immune system, and suggest how targeted therapies help.",
        ],
        [
          "partial",
          "[[2|Bone marrow damage weakens the immune system.]] [[3|Targeted therapies spare normal cells.]] Chemotherapy kills only cancer cells.",
          "Chemotherapy kills any rapidly dividing cell, including normal ones, which causes the side effects.",
          true,
        ],
        [
          "weak",
          "Chemotherapy makes people lose hair because the drugs are poisonous to hair, and the immune system is weak because they are sick.",
          "The drugs affect any rapidly dividing cell, including hair follicle cells and bone marrow cells.",
        ],
        [
          "weak",
          "[[3|Targeted therapies attack proteins in tumor cells.]] They work by making the person's whole body divide more slowly.",
          "Targeted therapies attack specific proteins in tumor cells. They do not slow division in the whole body.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Dihybrid data, chi-square with more categories, and defending a claim",
  note: `
## Objectives

Students will be able to:

1. analyze data from an experiment with a control and justify a claim from the results;
2. perform a statistical test, such as chi-square, with more than two categories, and say what the result means.

## Materials

Ears of genetic corn with purple/yellow and smooth/shrunken kernels (or photographs), tally sheets, calculators, a chi-square table, the practical sheet.

## Starter (6 minutes)

Display an ear of corn with purple and yellow kernels. Ask: "If two traits are inherited independently, what ratio of phenotypes do you expect in the offspring of two heterozygotes?" Elicit 9:3:3:1.

## Main activity

1. Review the dihybrid cross: a PpSs x PpSs cross gives 9 purple smooth : 3 purple shrunken : 3 yellow smooth : 1 yellow shrunken.
2. Chi-square with four categories: degrees of freedom 3, critical value 7.81 at p = 0.05. Work Mendel's pea data: observed 315, 108, 101 and 32 of 556. Expected 312.75, 104.25, 104.25 and 34.75. Chi-square = 0.47.
3. What a high chi-square means: linked genes would give too many parental types.
4. Practical: count kernels on an ear of corn, calculate chi-square and defend a claim that the traits assort independently.

## Checking for understanding

Ask: "How many degrees of freedom does a four-phenotype chi-square have, and why?"

## Practical write-up

Collect with counts, expected values, the chi-square calculation and a CER conclusion.
`,
  reading: [
    "When the numbers are close enough",
    `
Statistics let us decide whether data fit a model. In genetics, the model is often Mendel's law of independent assortment. If two genes are on different chromosomes, a cross between two individuals heterozygous for both, PpSs by PpSs, should give four phenotypes in the ratio 9:3:3:1. Of 556 offspring, the expected counts are 556 times 9/16, 3/16, 3/16 and 1/16, which are 312.75, 104.25, 104.25 and 34.75.

The **chi-square test** compares the observed counts to the expected counts. The null hypothesis is that the data fit the 9:3:3:1 ratio, so any difference is due to chance. Take Mendel's pea data: 315 round yellow, 108 round green, 101 wrinkled yellow and 32 wrinkled green. Chi-square is the sum of (O - E) squared divided by E: (315 - 312.75) squared/312.75 = 0.016; (108 - 104.25) squared/104.25 = 0.135; (101 - 104.25) squared/104.25 = 0.101; (32 - 34.75) squared/34.75 = 0.218. The total is 0.47. With four categories, the degrees of freedom are 4 - 1 = 3, and the critical value at p = 0.05 is 7.81. Since 0.47 is below 7.81, we **fail to reject the null hypothesis**: the data are consistent with independent assortment.

Failing to reject does not prove the model; it says that the data are not inconsistent with it. A large chi-square value above 7.81 means that the probability of getting such a difference by chance is less than 5 percent, and the null hypothesis is rejected. For example, if two genes were linked on the same chromosome, we would see too many parental combinations (round yellow and wrinkled green) and too few recombinants, and chi-square would be large. The test is sensitive to sample size: small counts give less reliable results, and a rule of thumb is to have an expected count of at least 5 in every category.

When you write a conclusion from experimental data, make the logic transparent. State the claim, such as "the purple and smooth traits assort independently." Give the evidence with numbers: observed counts, expected counts, chi-square value, degrees of freedom and critical value. Give the reasoning: explain what the statistic means for the null hypothesis and why this supports the claim. Finally, acknowledge limitations: miscounted kernels, a small sample, or a single ear. A good argument also states what new data would strengthen the conclusion, such as counting more ears.
`,
  ],
  cards: [
    ["Independent assortment", "Alleles of different genes are inherited independently when the genes are on different chromosomes."],
    ["Dihybrid cross", "A cross between individuals heterozygous for two genes."],
    ["9:3:3:1", "The expected phenotype ratio in the offspring of a dihybrid cross with independent assortment."],
    ["Degrees of freedom", "The number of categories minus one."],
    ["Critical value (df = 3)", "7.81 at p = 0.05."],
    ["Linked genes", "Genes close together on one chromosome that tend to be inherited together."],
    ["Parental types", "Offspring with the same combination of traits as the parents."],
    ["Recombinants", "Offspring with new combinations of traits."],
  ],
  closed: [
    [
      "In a dihybrid cross with independent assortment, what fraction of offspring is expected to show both dominant traits?",
      ["1/16", "3/16", "9/16", "12/16"],
      "C",
    ],
    [
      "How many degrees of freedom are there for four phenotype categories?",
      ["1", "2", "3", "4"],
      "C",
    ],
    [
      "A chi-square value of 0.47 with 3 degrees of freedom (critical value 7.81) means:",
      ["Reject the null hypothesis", "Fail to reject the null hypothesis", "The genes are linked", "The sample is too small"],
      "B",
    ],
    [
      "If two genes are linked, the offspring would show too many:",
      ["Recombinants", "Parental types", "Mutants", "Heterozygotes"],
      "B",
    ],
    [
      "Of 556 offspring, how many are expected with both recessive traits (1/16)?",
      ["17.4", "34.75", "104.25", "312.75"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "An ear of corn from a PpSs x PpSs cross has 216 purple smooth, 79 purple shrunken, 65 yellow smooth and 28 yellow shrunken kernels. Calculate the expected counts for a 9:3:3:1 ratio, and the chi-square value, and state a conclusion using the critical value 7.81 (df = 3).",
      scheme: [
        "Calculates the total as 388 and the expected counts as 218.25, 72.75, 72.75 and 24.25",
        "Calculates the contributions to chi-square, summing to about 1.8",
        "Compares chi-square with the critical value 7.81 (df = 3)",
        "Concludes that the null hypothesis is not rejected, so the data are consistent with independent assortment",
      ],
      model:
        "The total is 388, so the expected counts are 388 times 9/16 = 218.25, 388 times 3/16 = 72.75 (twice) and 388 times 1/16 = 24.25. Chi-square = (216 - 218.25) squared/218.25 + (79 - 72.75) squared/72.75 + (65 - 72.75) squared/72.75 + (28 - 24.25) squared/24.25 = 0.023 + 0.537 + 0.826 + 0.580 = 1.97. This is less than 7.81, so we fail to reject the null hypothesis. The data are consistent with independent assortment.",
      answers: [
        [
          "full",
          "[[0|Total = 388, so expected are 218.25, 72.75, 72.75 and 24.25.]] [[1|χ² = 0.023 + 0.537 + 0.826 + 0.580 = 1.97.]] [[2|With df = 3 the critical value is 7.81, and 1.97 is less than that.]] [[3|So I fail to reject the null hypothesis; the data are consistent with independent assortment of the two genes.]]",
          "Full marks. The calculation is complete, with a correct decision and statement.",
        ],
        [
          "full",
          "[[0|Expected counts from 388 kernels: 9/16 is 218.25, 3/16 is 72.75 each, and 1/16 is 24.25.]] [[1|Each (O−E)²/E term is added: the chi-square is about 1.97.]] [[2|The degrees of freedom are 3 and 1.97 < 7.81.]] [[3|The null hypothesis stands, meaning that the data fit the 9:3:3:1 ratio and the genes assort independently.]]",
          "All four marks, with a correct reading of the table.",
        ],
        [
          "partial",
          "[[0|Expected are 218.25, 72.75, 72.75 and 24.25.]] [[1|Chi-square is about 1.97.]] Since 1.97 is less than 7.81 we reject the null hypothesis.",
          "When chi-square is below the critical value, you fail to reject the null hypothesis. The data fit independent assortment.",
        ],
        [
          "partial",
          "[[2|The critical value is 7.81 with 3 df.]] [[3|The data fit independent assortment.]]",
          "Good conclusion. Show the expected counts and the chi-square calculation.",
          true,
        ],
        [
          "weak",
          "388 divided by 4 is 97 for each phenotype, so the observed counts are far from 97. This shows that the corn does not follow Mendel.",
          "The expected counts follow the 9:3:3:1 ratio, not equal fractions: 9/16, 3/16, 3/16 and 1/16 of 388.",
        ],
        [
          "weak",
          "[[2|The critical value is 7.81.]] Chi-square is 216 + 79 + 65 + 28 = 388, which is greater than 7.81, so we reject.",
          "Chi-square is the sum of the squared differences divided by the expected counts, not the sum of the observed counts.",
        ],
      ],
    },
    {
      prompt:
        "Suppose the chi-square value for a different ear was 15.2 with 3 degrees of freedom. State the decision, explain what it suggests about the two genes and describe what pattern in the counts would give such a result.",
      scheme: [
        "States that 15.2 exceeds the critical value 7.81, so the null hypothesis is rejected",
        "States that the data differ significantly from a 9:3:3:1 ratio, so independent assortment is unlikely to hold",
        "Suggests that the genes may be linked (on the same chromosome)",
        "Describes the expected pattern: an excess of parental types and a deficiency of recombinants relative to 9:3:3:1",
      ],
      model:
        "Since 15.2 exceeds the critical value of 7.81, we reject the null hypothesis. The data differ significantly from a 9:3:3:1 ratio, so independent assortment is unlikely to hold. This suggests the genes may be linked on the same chromosome. The pattern would be an excess of parental types (purple smooth and yellow shrunken for the parental combination) and a deficiency of recombinants relative to the expected ratio.",
      answers: [
        [
          "full",
          "[[0|15.2 is greater than 7.81, so the null hypothesis is rejected.]] [[1|The ear doesn't fit 9:3:3:1, so independent assortment is unlikely.]] [[2|The genes might be linked on the same chromosome.]] [[3|We would see too many parental types and too few recombinants compared with 9:3:3:1.]]",
          "Full marks. The decision, the meaning and the pattern are all stated.",
        ],
        [
          "full",
          "[[0|Chi-square exceeds the critical value, so reject the null hypothesis.]] [[1|The results differ significantly from what independent assortment predicts.]] [[2|Linkage is a good explanation.]] [[3|Parental combinations would be overrepresented, and the recombinant classes underrepresented.]]",
          "All four marks, with accurate terms.",
        ],
        [
          "partial",
          "[[0|We reject the null hypothesis.]] [[2|The genes may be linked.]]",
          "Explain what the result means for independent assortment, and describe the pattern of counts you would expect.",
        ],
        [
          "partial",
          "[[1|It does not fit the 9:3:3:1 ratio.]] [[3|There would be too many recombinants.]] The null hypothesis is not rejected.",
          "Linked genes give too many parental types and too few recombinants. With chi-square above the critical value, the null hypothesis is rejected.",
          true,
        ],
        [
          "weak",
          "15.2 is a big number so the experiment was done wrong and the results are useless.",
          "A large chi-square is informative: it means the data differ significantly from the expected ratio, which may reflect linkage.",
        ],
        [
          "weak",
          "[[0|We reject the null hypothesis.]] This proves that Mendel was wrong and genes are never independent.",
          "Many genes assort independently. This result suggests that these two genes may be linked.",
        ],
      ],
    },
  ],
  practical: {
    title: "Testing independent assortment in an ear of corn",
    instructions:
      "Using an ear of dihybrid corn (purple/yellow and smooth/shrunken kernels), count the kernels of each of the four phenotypes in a marked section of at least 200 kernels. Compare the counts with a 9:3:3:1 ratio, calculate chi-square, and state a conclusion about independent assortment.",
    steps: [
      ["Mark the starting kernel with a dot of marker, and count along each row to avoid recounting."],
      ["Tally purple smooth, purple shrunken, yellow smooth and yellow shrunken kernels on a sheet.", "Do not eat the kernels or use sharp tools to remove them."],
      ["Count at least 200 kernels, preferably 300 or more, and have a partner check a section."],
      ["Calculate the expected counts from the total using 9/16, 3/16, 3/16 and 1/16."],
      ["Calculate chi-square, state the degrees of freedom and compare with 7.81."],
      ["Write a CER conclusion, naming at least one limitation."],
    ],
    rubric: [
      ["Data collection: systematic counts, checked by a partner", 4],
      ["Analysis: correct expected values, chi-square and decision", 4],
      ["Conclusion: CER with limitations and a suggestion for more data", 4],
    ],
    writeUps: [
      [
        "full",
        "We counted 308 kernels along 10 rows and had a partner check one row. Observed: 171 purple smooth, 58 purple shrunken, 54 yellow smooth and 25 yellow shrunken. Expected from 9:3:3:1: 173.25, 57.75, 57.75 and 19.25. Chi-square = 0.03 + 0.00 + 0.24 + 1.72 = 1.99 with 3 degrees of freedom, below the critical value of 7.81. We fail to reject the null hypothesis. Claim: the two traits are inherited independently. Limitations: the kernels are from a single ear, and some were hard to classify. Counting more ears would strengthen the conclusion.",
        [4, 4, 4],
        "An excellent report: systematic counting, correct statistics, and a CER conclusion that acknowledges the limitations.",
      ],
      [
        "full",
        "Method: marked a start kernel and counted row by row, with a partner checking. Data: 310 kernels, observed 176, 56, 52 and 26. Expected 174.4, 58.1, 58.1 and 19.4. χ² = 0.015 + 0.076 + 0.640 + 2.245 = 2.98 (df = 3, critical value 7.81). Since 2.98 < 7.81, the data are consistent with independent assortment. Our evidence is a single ear, so if the shrunken yellow count was off by a few kernels it could change the result. More ears would improve the reliability.",
        [4, 4, 3],
        "Very good. State the claim and reasoning in the conclusion separately for full credit.",
      ],
      [
        "partial",
        "I counted 300 kernels. There were 170 purple smooth, 60 purple shrunken, 50 yellow smooth and 20 yellow shrunken. The expected numbers from the 9:3:3:1 ratio would be 168.75, 56.25, 56.25 and 18.75. The numbers are close, so I think the genes assort independently. I did not calculate chi-square or compare it with the critical value.",
        [3, 2, 2],
        "Calculate chi-square, state the degrees of freedom and compare it with the critical value. Close numbers need a test to support the claim.",
      ],
      [
        "partial",
        "We counted the kernels and got 171, 58, 54 and 25. The chi-square value was 1.99 with 3 degrees of freedom and the critical value is 7.81. We fail to reject the null hypothesis. I think this means that the traits are independent, and that this proves the 9:3:3:1 ratio is the right one for all corn. We counted only a few rows.",
        [2, 4, 1],
        "The result is consistent with the ratio but does not prove it for all corn. Name the limits, such as the small sample from one ear.",
      ],
      [
        "weak",
        "We looked at an ear of corn with purple and yellow kernels. It looked nice and colorful. Some were purple and some were yellow. The experiment was fun, and I learned about Mendel and his peas, and how corn was important to people long ago.",
        [1, 0, 0],
        "Count the four kinds of kernel, calculate expected values and chi-square, and state a conclusion about independent assortment.",
      ],
      [
        "weak",
        "There were 171, 58, 54 and 25 kernels. The chi-square is 171 + 58 + 54 + 25 = 308, which is much bigger than 7.81. So we reject the null hypothesis and the corn does not follow Mendel's rules, and so Mendel was wrong about how traits are passed on.",
        [1, 0, 0],
        "That sum is the total number of kernels, not chi-square. Chi-square sums (O − E) squared divided by E for each category.",
      ],
    ],
  },
};

writeCourse("ap-biology-grade-12.json", "AP Biology", "Grade 12", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
