import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Chemistry, Grade 10, Quarter 1. Standards: Next Generation Science
 * Standards, HS-PS1 (matter and its interactions), in the school's own words.
 */

const w1: WeekInput = {
  topic: "Measurement, significant figures and sorting matter",
  note: `
## Objectives

Students will be able to:

1. measure, convert units and report results with the right significant figures;
2. analyze lab data, name sources of error and write a conclusion the data supports;
3. classify matter as an element, compound, or a homogeneous or heterogeneous mixture, and choose a way to separate a mixture.

## Materials

Balances, graduated cylinders, metal samples, coffee filters, a mixture of sand, salt and iron filings, the worksheet.

## Starter (7 minutes)

Display two receipts from a Kroger: 3 lb of apples for $4.47 and a 2.5 liter bottle of soda. Ask: "How many milliliters of soda is that? How should I write the price per pound?" Use the answers to introduce conversion factors and rounding.

## Main activity

1. Teach the rules for significant figures: nonzero digits count, zeros between digits count, leading zeros do not, and trailing zeros count only after a decimal point. Practice with whiteboards.
2. Measure the density of an aluminum cylinder by mass and by water displacement and compute percent error against 2.70 g/mL.
3. Sort a set of materials (salt water, sand, copper, carbon dioxide, soil) into elements, compounds and mixtures, and choose a separation method for the sand, salt and iron filings mixture.

## Checking for understanding

Show a calculation and ask students to hold up the number of significant figures the answer should have.

## Exit ticket

Convert 2.5 L to mL and state how many significant figures the answer has.
`,
  reading: [
    "Measuring carefully, and sorting what you measure",
    `
Chemistry is a measuring science. Every measurement has two parts: a number and a unit. A mass of 12.4 grams tells you much more than 12.4 alone. In the United States people use inches, pounds and Fahrenheit in daily life, but scientists use the metric system. To change units, multiply by a **conversion factor**, a fraction equal to one. Since 1 L equals 1000 mL, a 2.5 L bottle is 2.5 L times 1000 mL/L, which is 2500 mL.

The digits in a measurement show how well the instrument could read it. These are the **significant figures**. A balance that reads 12.40 g gives four significant figures. The rules are simple. All nonzero digits count. Zeros between nonzero digits count. Leading zeros, as in 0.0045, do not count, so 0.0045 has two significant figures. Trailing zeros count if the number has a decimal point, so 12.40 has four. When you multiply or divide, the answer has as many significant figures as the measurement with the fewest. When you add or subtract, the answer has as many decimal places as the measurement with the fewest. For example, 12.50 g plus 3.2 g is 15.7 g, not 15.70 g, because 3.2 is known only to the tenths place.

When you compare your result with an accepted value, you can calculate the **percent error**: the absolute difference divided by the accepted value, times 100. If you find the density of aluminum to be 2.65 g/mL and the accepted value is 2.70 g/mL, the percent error is 0.05 divided by 2.70, times 100, about 1.9 percent. Sources of error include reading the meniscus from the wrong angle, an uncalibrated balance, or water left on the sample. A good conclusion states the result, compares it with the accepted value, and names the most likely sources of error.

Chemists also sort matter. A **pure substance** has a fixed composition. An **element**, such as copper, cannot be broken into simpler substances by ordinary means. A **compound**, such as water, is two or more elements chemically combined in a fixed ratio. A **mixture** is two or more substances that are physically mixed. In a **homogeneous** mixture, such as salt water, the composition is uniform. In a **heterogeneous** mixture, such as soil, you can see the parts. Mixtures are separated by physical properties: a magnet pulls out iron filings, filtering removes sand, and evaporating the water leaves the salt.
`,
  ],
  cards: [
    ["Conversion factor", "A fraction equal to one that changes a quantity from one unit to another."],
    ["Significant figures", "The digits in a measurement that were actually read, plus one estimated digit."],
    ["Percent error", "The absolute difference from the accepted value divided by the accepted value, times 100."],
    ["Element", "A pure substance that cannot be broken down into simpler substances by ordinary chemical means."],
    ["Compound", "A pure substance made of two or more elements chemically combined in a fixed ratio."],
    ["Homogeneous mixture", "A mixture with the same composition throughout, such as salt water."],
    ["Heterogeneous mixture", "A mixture whose parts can be seen, such as soil."],
    ["Density", "Mass divided by volume."],
  ],
  closed: [
    [
      "How many significant figures are in 0.00450 g?",
      ["2", "3", "5", "6"],
      "B",
    ],
    [
      "A bottle holds 2.5 L of soda. How many milliliters is that?",
      ["0.25 mL", "25 mL", "250 mL", "2500 mL"],
      "D",
    ],
    [
      "A student adds 12.50 g and 3.2 g on two balances. How should the sum be reported?",
      ["15.70 g", "15.7 g", "16 g", "15.700 g"],
      "B",
    ],
    [
      "A block of aluminum has a mass of 27.0 g and a volume of 10.0 mL. What is its density?",
      ["0.370 g/mL", "2.70 g/mL", "270 g/mL", "17.0 g/mL"],
      "B",
    ],
    [
      "Which of these is a heterogeneous mixture?",
      ["Salt dissolved in water", "Pure copper wire", "Vegetable soup with chunks", "Carbon dioxide gas"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A student finds the density of a piece of aluminum to be 2.58 g/mL. The accepted value is 2.70 g/mL. Calculate the percent error and name two possible sources of error.",
      scheme: [
        "Finds the difference between the values as 0.12 g/mL",
        "Divides by the accepted value and multiplies by 100 to get about 4.4 percent",
        "Names one reasonable source of error, such as reading the meniscus wrongly",
        "Names a second reasonable source of error, such as an air bubble or water on the sample",
      ],
      model:
        "The difference is 2.70 minus 2.58, which is 0.12 g/mL. Percent error is 0.12 divided by 2.70, times 100, which is 4.4 percent. Possible sources of error are reading the water level in the cylinder from the wrong angle and an air bubble clinging to the metal that made the volume look too large.",
      answers: [
        [
          "full",
          "[[0|2.70 - 2.58 = 0.12 g/mL.]] [[1|0.12 / 2.70 × 100 = 4.4%.]] [[2|One error could be that I read the meniscus from above and not at eye level.]] [[3|Another could be a bubble stuck to the metal that made the volume bigger.]]",
          "Full marks. A bubble would make the volume too large and the density too low, which matches the result.",
        ],
        [
          "full",
          "[[0|The difference is 0.12.]] [[1|Percent error is 0.12 divided by the accepted value 2.70, times 100, about 4.4%.]] [[2|The balance might not have been zeroed.]] [[3|Water left on the metal would add mass or change the volume reading.]]",
          "All four marks. Note that you divide by the accepted value, which you did.",
        ],
        [
          "partial",
          "[[0|2.70 - 2.58 = 0.12.]] 0.12 / 2.58 × 100 = 4.7%. [[2|Maybe I read the cylinder wrong.]]",
          "You divided by your own value. Percent error uses the accepted value, 2.70, which gives 4.4 percent. Name a second source of error.",
        ],
        [
          "partial",
          "[[1|The percent error is about 4.4%.]] [[3|There might have been a bubble on the metal.]]",
          "The answer and one source are fine. Show your working and name a second, different source of error.",
          true,
        ],
        [
          "weak",
          "2.58 + 2.70 = 5.28 so the percent error is 5.28%.",
          "Percent error is based on the difference between the two values, not their sum. Subtract first, then divide by the accepted value.",
        ],
        [
          "weak",
          "[[0|The values are different by 0.12.]] The error is that the teacher gave us a bad piece of metal.",
          "You found the difference. Sources of error should be things you can check, such as how the volume was read or whether a bubble was on the sample.",
        ],
      ],
    },
    {
      prompt:
        "A mixture contains sand, table salt and iron filings. Describe a sequence of steps to separate all three, and say which property each step uses.",
      scheme: [
        "Uses a magnet to remove the iron filings, using magnetism",
        "Adds water to dissolve the salt, using solubility",
        "Filters to remove the sand, using particle size",
        "Evaporates the water from the filtrate to recover the salt",
      ],
      model:
        "First pass a magnet over the dry mixture to pull out the iron filings, because iron is magnetic. Then add water and stir so the salt dissolves, because salt is soluble and sand is not. Filter the mixture to leave the sand on the filter paper, because the sand particles are too large to pass through. Finally evaporate the water from the filtrate to recover the salt.",
      answers: [
        [
          "full",
          "[[0|Use a magnet to take out the iron because it is magnetic.]] [[1|Add water so the salt dissolves, since salt is soluble but sand is not.]] [[2|Filter it and the sand stays in the paper because the grains are big.]] [[3|Then boil off the water from what went through the filter and the salt is left.]]",
          "Full marks. The order matters, and you gave a property for each step.",
        ],
        [
          "full",
          "[[0|First a magnet, since only iron is attracted to it.]] [[1|Next dissolve the salt in water, because it is soluble.]] [[2|Pour through a filter paper to catch the sand, which has large particles.]] [[3|Heat the filtrate to evaporate the water and the salt crystals stay behind.]]",
          "All four marks, in the best order.",
        ],
        [
          "partial",
          "[[0|Use a magnet for the iron.]] [[2|Then filter out the sand.]] Then the salt is left.",
          "Salt will pass through the filter only if it is dissolved. Add water first, and evaporate it at the end to get the salt back.",
        ],
        [
          "partial",
          "[[1|Add water to dissolve the salt.]] [[3|Evaporate the water to get the salt.]] Use a filter for everything else.",
          "A filter will keep both the sand and the iron. Use the magnet to separate the iron first.",
          true,
        ],
        [
          "weak",
          "Put it all in a blender and the heavy parts will go to the bottom.",
          "A blender does not separate substances. Think about a property that is different for each one: magnetism, solubility and particle size.",
        ],
        [
          "weak",
          "[[0|Use a magnet.]] Then burn the rest and the salt and sand will separate.",
          "The magnet step is right. Burning would not separate sand and salt. Dissolve the salt in water and filter instead.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Changes in matter and the structure of the atom",
  note: `
## Objectives

Students will be able to:

1. distinguish physical and chemical changes and give evidence that a reaction occurred;
2. use the number of protons, neutrons and electrons to describe isotopes and ions.

## Materials

Baking soda, vinegar, ice, steel wool, a Bunsen burner demo, atom model cards, the quiz.

## Starter (6 minutes)

Show four photos: a melting ice cube, a rusting bike chain, a bubbling can of soda being opened, a cake baking. Ask: "Which of these makes something new?" Sort into physical and chemical on the board.

## Main activity

1. Station rotation: baking soda and vinegar (gas), steel wool in vinegar (temperature, rust), ice melting, and dissolving sugar. At each, students record the evidence for or against a chemical change.
2. Atom model: build atoms from cards of protons, neutrons and electrons. Atomic number is the number of protons, mass number is protons plus neutrons.
3. Practice with isotopes (carbon-12 and carbon-14) and ions (Mg2+ and S2-).

## Checking for understanding

Ask students to give the number of protons, neutrons and electrons for chlorine-37 on a whiteboard.

## Quiz and problem set

Five quiz questions, then a short problem set on atomic structure.
`,
  reading: [
    "What changed, and what is it made of?",
    `
Matter changes all the time, but not every change makes something new. In a **physical change**, the substance stays the same and only its form or appearance changes. Ice melting is still water. Crushing a can, dissolving sugar, and boiling water are physical changes. In a **chemical change**, atoms are rearranged to form new substances with different properties. Rust forms when iron reacts with oxygen. A cake rising in the oven involves new substances, including carbon dioxide gas.

How can you tell? The evidence for a chemical reaction includes a gas given off as bubbles that are not from boiling, a new color that was not there before, a precipitate (a solid that forms when two liquids are mixed), and a change in temperature or the release of light. None of these on its own is proof, because a physical change can also give off bubbles or change temperature. But several together are strong evidence.

All of this happens at the level of atoms. An atom has a small, dense nucleus containing **protons**, which have a positive charge, and **neutrons**, which have no charge. **Electrons**, with a negative charge, move around the nucleus. The **atomic number** is the number of protons and defines the element: every carbon atom has 6 protons. The **mass number** is the number of protons plus neutrons. In a neutral atom, the number of electrons equals the number of protons.

Atoms of the same element can have different numbers of neutrons. These are **isotopes**. Carbon-12 has 6 protons and 6 neutrons. Carbon-14 has 6 protons and 8 neutrons. They react in the same way chemically, but carbon-14 is radioactive and is used to date ancient objects. When an atom gains or loses electrons it becomes an **ion**. If it loses electrons, it has more protons than electrons and a positive charge. A magnesium atom with 12 protons that loses two electrons becomes Mg2+ with 10 electrons. A sulfur atom with 16 protons that gains two electrons becomes S2- with 18 electrons. The number of protons never changes in an ion, or the element would change.
`,
  ],
  cards: [
    ["Physical change", "A change in form or appearance in which the substance stays the same."],
    ["Chemical change", "A change in which atoms are rearranged to form new substances."],
    ["Precipitate", "A solid that forms when two solutions are mixed."],
    ["Atomic number", "The number of protons in the nucleus of an atom."],
    ["Mass number", "The number of protons plus the number of neutrons."],
    ["Isotope", "An atom of the same element with a different number of neutrons."],
    ["Ion", "An atom or group of atoms with a net electric charge."],
    ["Cation", "A positively charged ion, formed by losing electrons."],
  ],
  closed: [
    [
      "Which of these is a chemical change?",
      ["Ice melting", "Sugar dissolving in water", "Iron rusting", "Water boiling"],
      "C",
    ],
    [
      "How many neutrons are in an atom of carbon-14 (atomic number 6)?",
      ["6", "8", "14", "20"],
      "B",
    ],
    [
      "A magnesium atom (atomic number 12) loses two electrons. How many protons and electrons does the ion have?",
      ["12 protons and 10 electrons", "10 protons and 12 electrons", "14 protons and 12 electrons", "12 protons and 14 electrons"],
      "A",
    ],
    [
      "Which observation is the best evidence of a chemical reaction?",
      [
        "A solid breaks into smaller pieces",
        "A colorless solution turns blue and a solid forms",
        "A liquid changes shape when poured into a different cup",
        "A solid is crushed into powder",
      ],
      "B",
    ],
    [
      "Chlorine-37 and chlorine-35 are:",
      ["Different elements", "Isotopes of chlorine", "Ions of chlorine", "Compounds"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student adds vinegar to baking soda in a cup. Bubbles form, the cup feels cold and the solid disappears. Decide whether this is a physical or chemical change and use the evidence to support your decision.",
      scheme: [
        "States that it is a chemical change",
        "Gives the gas (bubbles) as evidence",
        "Gives the temperature change as evidence",
        "Explains that new substances have formed, so the bubbles are not just boiling or a change of state",
      ],
      model:
        "This is a chemical change. Bubbles of gas formed even though nothing was heated, and the cup got cold, which is a temperature change. These together show that the vinegar and baking soda reacted to form new substances, one of which is carbon dioxide gas.",
      answers: [
        [
          "full",
          "[[0|This is a chemical change.]] [[1|Gas bubbles formed even though I never heated it.]] [[2|The cup got colder, so there was a temperature change.]] [[3|Both of those together show that a new substance, like a gas, was made and it isn't just dissolving.]]",
          "Full marks. You noted that the bubbles were not caused by heating, which is what makes them evidence.",
        ],
        [
          "full",
          "[[0|Chemical change.]] [[1|The bubbles are carbon dioxide gas given off.]] [[2|The temperature dropped, which is a sign of reaction.]] [[3|The solid disappeared because it reacted into new products, not because it just dissolved.]]",
          "All four marks. Identifying the gas as carbon dioxide is correct.",
        ],
        [
          "partial",
          "[[0|It is a chemical change]] [[1|because there are bubbles]].",
          "Good start. A single sign is not always proof. Add the temperature change and say what new substance forms.",
        ],
        [
          "partial",
          "[[2|The temperature changed]] and the solid dissolved, so I think it is a physical change like dissolving sugar.",
          "Sugar dissolving gives no gas, but this reaction does. The bubbles and temperature change point to a chemical change.",
          true,
        ],
        [
          "weak",
          "It is a physical change because the baking soda just breaks apart into smaller pieces.",
          "Breaking into smaller pieces is physical, but here a gas formed and the temperature changed. Those are signs of new substances.",
        ],
        [
          "weak",
          "[[0|It is a chemical change]] because things are mixed together.",
          "Mixing alone does not make a chemical change. Salt mixed with water is physical. Give evidence such as gas or a temperature change.",
        ],
      ],
    },
    {
      prompt:
        "An atom has 17 protons, 18 neutrons and 18 electrons. Identify the element, give its mass number, state its charge and write what kind of particle it is.",
      scheme: [
        "Identifies the element as chlorine because it has 17 protons",
        "Gives the mass number as 35",
        "States the charge as 1 minus, since there is one more electron than proton",
        "Describes it as an ion (an anion), an isotope of chlorine, chlorine-35",
      ],
      model:
        "The atom has 17 protons, so it is chlorine. The mass number is 17 plus 18, which is 35. There is one more electron than proton, so the charge is 1 minus. It is a chloride ion, an anion, of the isotope chlorine-35.",
      answers: [
        [
          "full",
          "[[0|17 protons means it is chlorine.]] [[1|The mass number is 17 + 18 = 35.]] [[2|There are 18 electrons and 17 protons, so the charge is -1.]] [[3|It is an anion, chloride, of chlorine-35.]]",
          "Full marks. Each fact follows from the particle counts.",
        ],
        [
          "full",
          "[[0|The protons tell me the element, and 17 is chlorine.]] [[1|Mass number is protons plus neutrons, 35.]] [[2|It has one extra electron so it is 1-.]] [[3|So it is a chloride ion, an isotope called chlorine-35.]]",
          "All four marks. You explained how the protons identify the element.",
        ],
        [
          "partial",
          "[[0|It is chlorine because of the 17 protons.]] [[1|The mass number is 35.]] The charge is 1+ because it has extra electrons.",
          "Extra electrons make the charge negative, because electrons are negative. The charge is 1-.",
        ],
        [
          "partial",
          "[[2|The charge is -1.]] [[3|It is an ion.]] The mass number is 18 because of the neutrons.",
          "The mass number counts protons and neutrons together: 17 + 18 = 35. Name the element too.",
          true,
        ],
        [
          "weak",
          "It is argon because it has 18 electrons.",
          "The element is set by the protons, not electrons. With 17 protons the atom is chlorine.",
        ],
        [
          "weak",
          "[[1|The mass number is 35.]] It is a neutral atom because it has lots of particles.",
          "Neutral means the same number of protons and electrons. This atom has one more electron than protons, so it is an ion with a negative charge.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "The periodic table and its trends",
  note: `
## Objectives

Students will be able to:

1. use the periodic table to predict the arrangement of electrons and the properties of elements;
2. explain periodic trends in atomic radius, ionization energy and electronegativity.

## Materials

Blank periodic tables, colored pencils, data tables of atomic radius and ionization energy for periods 2 and 3, graph paper, the worksheet.

## Starter (6 minutes)

Ask: "If I give you an element you have never met, what could you predict from where it sits on the table?" Take answers and write them on the board.

## Main activity

1. Color a blank table for metals, nonmetals and metalloids and label groups (alkali metals, halogens, noble gases). Link the group number to the number of valence electrons.
2. Graph the first ionization energy of the elements in period 2 and the atomic radius of the elements in group 1 and look for patterns.
3. Explain the trends with nuclear charge, shielding and distance. Predict which of sodium and potassium is more reactive.

## Checking for understanding

Whiteboards: "Which has the larger radius, Na or Cl? Why?" Check for the reason, not just the choice.

## Problem set and worksheet

Students predict properties and rank elements by trend.
`,
  reading: [
    "A map of the elements",
    `
The periodic table is organized by atomic number, but its shape is built from patterns in the electrons. A horizontal row is a **period**, and a vertical column is a **group**. Elements in the same group have the same number of **valence electrons**, the electrons in the outermost energy level, and so behave in similar ways. Group 1, the alkali metals, has one valence electron and reacts strongly with water. Group 17, the halogens, has seven valence electrons. Group 18, the noble gases, has a full outer level and rarely reacts.

Three trends help you predict how atoms behave. **Atomic radius** is the size of an atom. Moving down a group, atoms get larger because each period adds an energy level farther from the nucleus. Moving across a period from left to right, atoms get smaller, because the number of protons increases while the electrons are added to the same level, and the stronger pull draws them in. So sodium is larger than chlorine, even though chlorine has more protons.

**Ionization energy** is the energy needed to remove an electron from an atom. It increases across a period, since the nuclear charge is greater and the electrons are held more tightly, and decreases down a group, since the outer electrons are farther away and shielded by the inner levels. This explains why potassium is more reactive than sodium: it loses its single outer electron more easily.

**Electronegativity** is the tendency of an atom to attract the electrons in a bond. It follows the same pattern as ionization energy, increasing across a period and decreasing down a group. Fluorine is the most electronegative element. Noble gases are usually left out since they hardly form bonds.

Metals are on the left and in the middle of the table. They are shiny, conduct electricity, and tend to lose electrons. Nonmetals are on the right. They are poor conductors, and tend to gain electrons. When you know where an element sits, you can estimate its size, its reactivity, and the kind of ion it will form: sodium forms Na+, chlorine forms Cl-.
`,
  ],
  cards: [
    ["Period", "A horizontal row of the periodic table."],
    ["Group", "A vertical column of elements with similar properties."],
    ["Valence electrons", "The electrons in the outermost energy level of an atom."],
    ["Atomic radius", "A measure of the size of an atom."],
    ["Ionization energy", "The energy needed to remove one electron from an atom."],
    ["Electronegativity", "The tendency of an atom to attract electrons in a bond."],
    ["Alkali metal", "A group 1 element with one valence electron, very reactive."],
    ["Halogen", "A group 17 element with seven valence electrons."],
  ],
  closed: [
    [
      "How many valence electrons does an atom of a group 17 element have?",
      ["1", "5", "7", "17"],
      "C",
    ],
    [
      "Which has the larger atomic radius, sodium or chlorine?",
      ["Sodium", "Chlorine", "They are the same size", "It cannot be predicted"],
      "A",
    ],
    [
      "Which element has the highest first ionization energy?",
      ["Lithium", "Carbon", "Neon", "Beryllium"],
      "C",
    ],
    [
      "Why is potassium more reactive than sodium?",
      [
        "It has more protons in its outer level",
        "Its outer electron is farther from the nucleus, so it is lost more easily",
        "It has a smaller radius",
        "It has more valence electrons",
      ],
      "B",
    ],
    [
      "Which element is the most electronegative?",
      ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Explain why the atomic radius decreases from sodium to chlorine across period 3, even though the atoms have more electrons.",
      scheme: [
        "States that the number of protons (nuclear charge) increases across the period",
        "States that the added electrons go into the same energy level",
        "States that the stronger pull on the electrons draws the outer level closer to the nucleus",
        "Concludes that the radius decreases from left to right",
      ],
      model:
        "Across period 3, each atom has one more proton than the one before, so the nuclear charge increases. The extra electrons are added to the same energy level, so there is no extra shielding. The stronger positive pull draws the electrons closer, so the atomic radius decreases from sodium to chlorine.",
      answers: [
        [
          "full",
          "[[0|Each element has one more proton, so the nucleus has a stronger positive charge.]] [[1|The new electrons go in the same energy level so they don't add much shielding.]] [[2|The nucleus pulls the outer electrons in more tightly.]] [[3|So the atoms get smaller going from sodium to chlorine.]]",
          "Full marks. You explained why more electrons do not make the atom larger here.",
        ],
        [
          "full",
          "[[0|The nuclear charge goes up by one each step.]] [[1|The electrons being added are in the same shell.]] [[2|That means the outer electrons are pulled closer.]] [[3|The radius therefore decreases across the period.]]",
          "All four marks, concise and accurate.",
        ],
        [
          "partial",
          "[[0|There are more protons as you go across.]] [[3|The atoms get smaller.]]",
          "Say what the protons do to the electrons, and that the electrons are being added to the same level.",
        ],
        [
          "partial",
          "[[1|The electrons are added to the same energy level.]] [[2|They get pulled closer.]] The atoms get bigger because there are more electrons.",
          "The conclusion is the wrong way round. The stronger pull makes the atoms smaller. Add the increasing protons.",
          true,
        ],
        [
          "weak",
          "It gets smaller because the atoms lose electrons across the period.",
          "Atoms do not lose electrons as you move across. They gain protons and electrons. Look at what the extra protons do.",
        ],
        [
          "weak",
          "[[3|The radius gets smaller.]] It is because the periods get shorter.",
          "You have the trend. The cause is the stronger nuclear charge pulling electrons in, not the length of the period.",
        ],
      ],
    },
    {
      prompt:
        "Rank lithium, sodium and potassium from the lowest to the highest first ionization energy, and explain the trend. Say which you expect to react most vigorously with water.",
      scheme: [
        "Ranks the order as potassium, sodium, lithium",
        "Explains that the outer electron is farther from the nucleus down the group",
        "Mentions shielding by the inner electron levels",
        "Predicts that potassium reacts most vigorously because it loses its electron most easily",
      ],
      model:
        "From lowest to highest first ionization energy: potassium, sodium, lithium. Going down the group the outer electron is in a higher energy level, farther from the nucleus and shielded by more inner electrons, so it is easier to remove. Potassium loses its electron most easily, so it should react most vigorously with water.",
      answers: [
        [
          "full",
          "[[0|Potassium, then sodium, then lithium.]] [[1|The outer electron is in a higher level and farther from the nucleus down the group.]] [[2|There are more inner levels shielding it from the nucleus.]] [[3|Potassium gives up its electron most easily, so it reacts the most with water.]]",
          "Full marks. The shielding point is the one most students leave out.",
        ],
        [
          "full",
          "[[0|K < Na < Li.]] [[1|Going down, the valence electron is farther away.]] [[2|It is also shielded by more electron shells.]] [[3|Potassium loses it most readily and therefore is the most reactive.]]",
          "All four marks, in a tidy answer.",
        ],
        [
          "partial",
          "[[0|Potassium, sodium, lithium.]] [[3|Potassium is the most reactive.]]",
          "The ranking and prediction are right. Explain the trend: where the outer electron is and what shields it.",
        ],
        [
          "partial",
          "[[1|The outer electron is farther away in potassium.]] The order is lithium, sodium, potassium and lithium reacts the most.",
          "Your reasoning points to potassium losing its electron most easily, so it has the lowest ionization energy and reacts most. Check your order.",
          true,
        ],
        [
          "weak",
          "Lithium is the lowest because it is the smallest and has the least protons so it loses electrons easiest.",
          "Having fewer protons does not make it easier. Lithium's outer electron is closest to the nucleus, so it is held the most tightly.",
        ],
        [
          "weak",
          "[[3|Potassium reacts the most.]] They all have the same ionization energy because they are in the same group.",
          "Same group means similar behavior, not equal values. The values decrease down the group, which is why potassium is the most reactive.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Ionic, covalent and metallic bonding, and naming compounds",
  note: `
## Objectives

Students will be able to:

1. explain why a reaction goes the way it does from the outermost electrons of the atoms;
2. distinguish ionic, covalent and metallic bonds and write formulas and names for common compounds.

## Materials

Samples of table salt, sugar and copper wire, conductivity testers, hot plates and aluminum foil boats, the practical sheet.

## Starter (6 minutes)

Pose: "Why does sodium explode in water and chlorine poison people, but sodium chloride is the salt we put on french fries?" Take theories and refer back to valence electrons.

## Main activity

1. Use dot diagrams to show the transfer of an electron from sodium to chlorine and the sharing of electrons between two hydrogens. Define ionic, covalent and metallic bonding.
2. Write formulas by balancing charges (Mg2+ and Cl- gives MgCl2, Al3+ and O2- gives Al2O3) and name them. Practice naming covalent compounds with prefixes.
3. Practical: test three solids for melting behavior, solubility in water and conductivity, and use the results to decide the type of bonding.

## Checking for understanding

Whiteboards: "Write the formula for calcium nitrate." Look for the parentheses in Ca(NO3)2.

## Worksheet and practical write-up

Formulas and names, then the lab report.
`,
  reading: [
    "How atoms hold together",
    `
Atoms bond because the arrangement of electrons in a compound is more stable than in separate atoms. Most atoms are most stable with eight valence electrons, a full outer level like a noble gas. This is the **octet rule**, and it has exceptions, but it helps predict a lot.

In **ionic bonding**, one atom transfers electrons to another. A sodium atom has one valence electron, and a chlorine atom has seven. Sodium gives up its electron to become Na+, and chlorine gains it to become Cl-. The opposite charges attract strongly. Ionic compounds form between metals and nonmetals, and they form crystals of alternating ions called a lattice. They have high melting points, are hard but brittle, and conduct electricity only when melted or dissolved, because then the ions can move.

In **covalent bonding**, atoms share electrons. Two hydrogen atoms each contribute an electron to a shared pair. Covalent compounds form between nonmetals. They are made of separate molecules, so they usually have lower melting points, and do not conduct electricity in any state, because there are no free charges.

In **metallic bonding**, the valence electrons of metal atoms are free to move through a "sea" of electrons surrounding positive metal ions. This explains why metals conduct electricity, can be hammered into shape without breaking, and are shiny.

To write the formula of an ionic compound, make the charges add up to zero. Magnesium forms Mg2+ and chlorine forms Cl-, so you need two chloride ions for each magnesium, giving MgCl2. Aluminum forms Al3+ and oxygen forms O2-, so the lowest common multiple of the charges is six: two Al3+ and three O2-, giving Al2O3. Name ionic compounds with the metal first and the nonmetal ending in "-ide": sodium chloride, magnesium chloride. When an ion has more than one atom, such as nitrate (NO3-), put it in parentheses if you need more than one: Ca(NO3)2 is calcium nitrate. For covalent compounds, prefixes show the number of atoms: CO2 is carbon dioxide and N2O is dinitrogen monoxide.
`,
  ],
  cards: [
    ["Octet rule", "Atoms tend to bond to have eight valence electrons."],
    ["Ionic bond", "An attraction between positive and negative ions formed by transferring electrons."],
    ["Covalent bond", "A bond in which two atoms share electrons."],
    ["Metallic bond", "The attraction between metal ions and a sea of free electrons."],
    ["Lattice", "A repeating three-dimensional pattern of ions in an ionic solid."],
    ["Formula unit", "The simplest ratio of ions in an ionic compound."],
    ["Polyatomic ion", "A charged group of atoms that behaves as one ion, such as nitrate."],
    ["Molecule", "A group of atoms joined by covalent bonds."],
  ],
  closed: [
    [
      "What is the formula for the compound formed from Mg2+ and Cl- ions?",
      ["MgCl", "Mg2Cl", "MgCl2", "Mg2Cl2"],
      "C",
    ],
    [
      "A solid has a high melting point, is brittle, and conducts electricity only when dissolved in water. It is most likely:",
      ["Metallic", "Ionic", "Covalent molecular", "A noble gas"],
      "B",
    ],
    [
      "What is the name of CO2?",
      ["Carbon oxide", "Carbon dioxide", "Monocarbon oxide", "Carbonate"],
      "B",
    ],
    [
      "Why can metals be hammered into shape without breaking?",
      [
        "Their ions are held in fixed positions by strong covalent bonds",
        "Layers of ions can slide while the sea of electrons holds them together",
        "They are held in a rigid lattice of alternating charges",
        "They are made of molecules",
      ],
      "B",
    ],
    [
      "What is the formula for calcium nitrate, if calcium forms Ca2+ and nitrate is NO3-?",
      ["CaNO3", "Ca(NO3)2", "Ca2NO3", "CaNO6"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe what happens to the valence electrons when sodium reacts with chlorine, and explain why the product, sodium chloride, conducts electricity when dissolved but not as a solid.",
      scheme: [
        "States that sodium transfers its valence electron to chlorine",
        "States that this forms Na+ and Cl- ions, an ionic bond",
        "States that in the solid, the ions are fixed in a lattice and cannot move",
        "States that when dissolved the ions are free to move and carry charge",
      ],
      model:
        "Sodium transfers its one valence electron to chlorine, forming Na+ and Cl- ions held together by an ionic bond. In solid sodium chloride the ions are fixed in a lattice and cannot move, so there is no current. When it dissolves the ions are free to move and carry charge, so the solution conducts.",
      answers: [
        [
          "full",
          "[[0|Sodium gives its one outer electron to chlorine.]] [[1|That makes Na+ and Cl-, which attract each other in an ionic bond.]] [[2|As a solid the ions are locked in place in a lattice so they can't carry current.]] [[3|In water the ions can move around so the solution conducts.]]",
          "Full marks. You explained conduction in terms of moving charged particles.",
        ],
        [
          "full",
          "[[0|Sodium transfers an electron to chlorine.]] [[1|The two ions are oppositely charged and form an ionic bond.]] [[2|In the crystal the ions can't move.]] [[3|When dissolved they are free, so charges can flow.]]",
          "All four marks, neat and accurate.",
        ],
        [
          "partial",
          "[[0|Sodium gives an electron to chlorine]] and they share it in a covalent bond. The solid does not conduct.",
          "In sodium chloride the electron is transferred, not shared. That makes an ionic bond. Add why it conducts when dissolved.",
        ],
        [
          "partial",
          "[[2|The ions are stuck in a lattice as a solid.]] [[3|In water the ions are free to move.]]",
          "Good explanation of conduction. Say what happens to the electron when sodium meets chlorine.",
          true,
        ],
        [
          "weak",
          "Electrons are what carry the electricity in salt water so the electrons are free in the water.",
          "In salt water it is the ions that carry the charge, not free electrons. Start with how Na+ and Cl- form.",
        ],
        [
          "weak",
          "[[0|Sodium gives chlorine its electron.]] The solid conducts because metals conduct.",
          "Sodium chloride is not a metal. Its ions are fixed in the solid, so it does not conduct until they are free to move.",
        ],
      ],
    },
    {
      prompt:
        "Write the formulas and names for the compounds formed between (a) aluminum and oxygen and (b) magnesium and the nitrate ion. Show how you balanced the charges.",
      scheme: [
        "Gives the formula Al2O3 for aluminum oxide",
        "Shows charges balancing as two 3+ and three 2- giving a total of 6",
        "Gives the formula Mg(NO3)2 with parentheses",
        "Names it magnesium nitrate and explains that two nitrate ions balance one Mg2+",
      ],
      model:
        "Aluminum forms Al3+ and oxygen forms O2-. Two Al3+ give +6 and three O2- give -6, so the formula is Al2O3, aluminum oxide. Magnesium forms Mg2+ and nitrate is NO3-, so two nitrate ions are needed for each magnesium, giving Mg(NO3)2, magnesium nitrate.",
      answers: [
        [
          "full",
          "[[0|(a) Al2O3, aluminum oxide.]] [[1|Two Al3+ is +6 and three O2- is -6, so it balances.]] [[2|(b) Mg(NO3)2.]] [[3|It is magnesium nitrate because one Mg2+ needs two NO3- ions to cancel out.]]",
          "Full marks. The parentheses around NO3 are required and you included them.",
        ],
        [
          "full",
          "[[0|Aluminum oxide is Al2O3]] [[1|because 2 × 3+ = 6+ and 3 × 2- = 6-.]] [[2|Magnesium nitrate is Mg(NO3)2]] [[3|since the 2+ needs two 1- nitrates, and I use brackets so the 2 applies to the whole nitrate ion.]]",
          "All four marks. Your explanation for the brackets is clear.",
        ],
        [
          "partial",
          "[[0|(a) Al2O3 aluminum oxide.]] [[1|The charges are 6 and 6.]] (b) MgNO3 magnesium nitrate.",
          "Part (a) is right. In part (b), one nitrate has a charge of 1-, so you need two to balance Mg2+. The formula is Mg(NO3)2.",
        ],
        [
          "partial",
          "[[2|(b) Mg(NO3)2 is magnesium nitrate.]] (a) AlO is aluminum oxide.",
          "Part (b) is right. For (a), the charges 3+ and 2- do not balance in AlO. Use two aluminum and three oxygen.",
          true,
        ],
        [
          "weak",
          "(a) AlO and (b) MgNO3. I just wrote the symbols next to each other.",
          "You need to balance the charges so the compound is neutral overall. Write the ions with their charges first.",
        ],
        [
          "weak",
          "[[0|(a) Al2O3.]] (b) Mg2NO3 because the magnesium is 2+.",
          "Part (a) is right. In part (b) the 2+ belongs to the charge, not the subscript. You need two nitrate ions, Mg(NO3)2.",
        ],
      ],
    },
  ],
  practical: {
    title: "What kind of bond? Testing three solids",
    instructions:
      "You are given three white or metallic solids labeled X, Y and Z (table salt, table sugar and a copper strip). Test each for how easily it melts, whether it dissolves in water, and whether it conducts electricity as a solid and when dissolved. Use the evidence to decide whether each is ionic, covalent or metallic.",
    steps: [
      ["Put on goggles. Place a small amount of each sample on a labeled foil boat."],
      ["Test the conductivity of each solid with the tester and record yes or no."],
      ["Heat each sample gently on the hot plate for one minute and record whether it melts or changes.", "Never leave the hot plate unattended, and do not touch the foil."],
      ["Stir a spatula of each sample in 20 mL of water and record whether it dissolves."],
      ["Test the conductivity of each solution and record yes or no."],
      ["Fill in a table of properties and decide on the type of bonding for each sample."],
    ],
    rubric: [
      ["Method and safety: complete tests on all samples, safe handling", 4],
      ["Results: accurate table of observations for each test", 4],
      ["Conclusion: bonding assigned using the evidence with reasons", 4],
    ],
    writeUps: [
      [
        "full",
        "X did not conduct as a solid, did not melt on the hot plate, dissolved in water and the solution conducted, so it is ionic. Y did not conduct in either state, melted and browned easily and dissolved, so it is covalent molecular. Z conducted as a solid, did not dissolve and did not melt, so it is metallic. Ionic compounds conduct when their ions are free to move, covalent molecules have no charged particles, and metals have a sea of mobile electrons.",
        [4, 4, 4],
        "An excellent report. Each decision is tied to evidence and a reason about particles.",
      ],
      [
        "full",
        "Method: I tested conductivity, melting and solubility for three samples while wearing goggles. Results: X was a non-conductor as a solid, high melting point, soluble, and the solution conducted. Y was a non-conductor in every state, melted at a low temperature and was soluble. Z conducted as a solid and was insoluble. Conclusion: X is ionic, Y is covalent and Z is metallic. For X, the ions are free only in solution.",
        [4, 3, 4],
        "Very good. Your table should give actual observations for each test, such as the melting temperature range.",
      ],
      [
        "partial",
        "X was a salt, so it is ionic. Y was sugar so it is covalent. Z was a metal so it is metallic. They had different properties when we tested them with the conductivity tester and the hot plate and the water.",
        [2, 1, 2],
        "You identified the substances rather than using the evidence. Record what each test showed and use it to decide on the bonding.",
      ],
      [
        "partial",
        "We tested the conductivity of every solid and every solution and put the results in a table. X conducted when dissolved, Y never conducted and Z conducted as a solid. I did not do the melting test because the hot plate was not working that day.",
        [2, 3, 2],
        "Your conductivity results are well recorded. Ask for another hot plate or borrow data from another group so that you can use the melting evidence too.",
      ],
      [
        "weak",
        "We put the samples on the hot plate and in water. Some of them dissolved and some didn't. I think they are all different types. Z looked like a metal and the other two looked like white powder. I did not write down what happened in each test.",
        [1, 1, 0],
        "Record which sample did what in each test, then match each pattern of results to a type of bonding.",
      ],
      [
        "weak",
        "All three solids had bonds because everything has bonds. The salt is covalent because it has a strong bond and it did not melt on the hot plate, so it must be strongly covalent. The metal is ionic. I did not use the conductivity tester.",
        [1, 0, 0],
        "Salt is ionic, and the metal has metallic bonding. A high melting point alone does not decide the type. Use conductivity and solubility as well.",
      ],
    ],
  },
};

const w5: WeekInput = {
  topic: "Molecular shape, polarity and forces between particles",
  note: `
## Objectives

Students will be able to:

1. plan an investigation of how forces between particles explain the properties of substances;
2. draw Lewis structures and predict the shape and polarity of simple molecules;
3. use the conservation of mass to count atoms in a balanced reaction.

## Materials

Molecular model kits, thermometers wrapped in paper towel, droppers, water, ethanol and acetone (teacher dispensed), balloons, the practical sheet.

## Starter (6 minutes)

Ask: "Why does the hand sanitizer feel cold on your skin, but water doesn't feel cold in the same way?" Take hypotheses.

## Main activity

1. Draw Lewis structures for H2O, CO2, NH3 and CH4 and use the model kits to build their shapes: bent, linear, trigonal pyramidal and tetrahedral.
2. Decide polarity from shape and electronegativity differences. Introduce dispersion forces, dipole-dipole forces and hydrogen bonds and rank them by strength.
3. Practical: measure the temperature drop as water, ethanol and acetone evaporate from a wrapped thermometer, and relate to the strength of the forces between molecules.

## Checking for understanding

Ask: "Why is CO2 nonpolar even though each C=O bond is polar?" Look for symmetry.

## Worksheet and practical write-up

Lewis structures, shape and polarity, then the practical report.
`,
  reading: [
    "Shapes, polarity and the forces between molecules",
    `
A **Lewis structure** shows how the valence electrons in a molecule are shared. To draw one, count all the valence electrons, join the atoms with single bonds, add lone pairs to give each atom an octet (hydrogen needs only two), and use double or triple bonds if needed. Water has 8 valence electrons: 6 from oxygen and 1 from each hydrogen. Oxygen sits in the center with two bonds and two lone pairs. Carbon dioxide has 16 valence electrons, with two double bonds around the carbon.

The shape of a molecule follows from the idea that electron pairs repel each other and spread out as far as possible. This is VSEPR theory. Methane, CH4, has four bonding pairs and is **tetrahedral**. Ammonia, NH3, has three bonding pairs and one lone pair, so it is **trigonal pyramidal**. Water has two bonding pairs and two lone pairs, so it is **bent**. Carbon dioxide has two double bonds and no lone pairs on carbon, so it is **linear**.

A bond is **polar** if the atoms differ in electronegativity, so the shared electrons are pulled toward one atom. Whether a molecule is polar depends on both the bonds and the shape. In CO2 each C=O bond is polar, but the molecule is linear and the two pulls cancel, so it is nonpolar. In water the bent shape means the pulls do not cancel, so it is polar. Methane's bonds are almost nonpolar and symmetric, so it is nonpolar.

The attraction between molecules is called an **intermolecular force**, and it is much weaker than a bond within the molecule. **Dispersion forces** act between all molecules and get stronger as molecules get larger. **Dipole-dipole forces** act between polar molecules. **Hydrogen bonds**, a strong type of dipole-dipole attraction, form when hydrogen is bonded to nitrogen, oxygen or fluorine. The stronger these forces are, the higher the boiling point and the slower the evaporation. Water has strong hydrogen bonds, so it has a high boiling point for such a small molecule. Acetone has weaker forces, so it evaporates quickly, and as the fastest-moving molecules leave, the liquid left behind cools.
`,
  ],
  cards: [
    ["Lewis structure", "A diagram showing the valence electrons and bonds in a molecule."],
    ["VSEPR theory", "Electron pairs repel, so they spread out to give a molecule its shape."],
    ["Polar molecule", "A molecule with an uneven distribution of charge."],
    ["Dispersion force", "A weak attraction between all molecules, stronger in larger ones."],
    ["Dipole-dipole force", "An attraction between the positive end of one polar molecule and the negative end of another."],
    ["Hydrogen bond", "A strong attraction between H bonded to N, O or F and a lone pair on another molecule."],
    ["Tetrahedral", "A shape with four bonded atoms at the corners of a tetrahedron, as in methane."],
    ["Intermolecular force", "An attraction between molecules."],
  ],
  closed: [
    [
      "What is the shape of a water molecule?",
      ["Linear", "Bent", "Tetrahedral", "Trigonal pyramidal"],
      "B",
    ],
    [
      "Why is CO2 nonpolar even though each C=O bond is polar?",
      [
        "The molecule is linear and the two bond polarities cancel",
        "Carbon is more electronegative than oxygen",
        "Oxygen is nonpolar",
        "It has lone pairs on carbon",
      ],
      "A",
    ],
    [
      "How many valence electrons does NH3 have in total?",
      ["5", "6", "8", "14"],
      "C",
    ],
    [
      "Which liquid should have the strongest intermolecular forces, if it has the highest boiling point?",
      ["Acetone, 56 degrees Celsius", "Ethanol, 78 degrees Celsius", "Water, 100 degrees Celsius", "They are all the same"],
      "C",
    ],
    [
      "In the balanced equation 2H2 + O2 gives 2H2O, how many hydrogen atoms are on each side?",
      ["2", "4", "6", "8"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare water (H2O) and carbon dioxide (CO2). For each, give the shape, say whether it is polar, and explain the difference using the shape.",
      scheme: [
        "Gives water's shape as bent",
        "States that water is polar because the bond pulls do not cancel",
        "Gives carbon dioxide's shape as linear",
        "States that CO2 is nonpolar because the two bond pulls point in opposite directions and cancel",
      ],
      model:
        "Water is bent and is polar because the bond polarities do not cancel. Carbon dioxide is linear and nonpolar because its two polar C=O bonds point in opposite directions and cancel. Both have polar bonds, so it is the shape that decides whether the molecule is polar.",
      answers: [
        [
          "full",
          "[[0|Water is bent.]] [[1|Because of the bend the polar bonds don't cancel, so water is polar.]] [[2|Carbon dioxide is linear.]] [[3|Its two C=O bonds pull in opposite directions equally and cancel, so it is nonpolar.]]",
          "Full marks. The shape, not the bond type, decided the answer.",
        ],
        [
          "full",
          "[[0|H2O has a bent shape because of the two lone pairs on oxygen.]] [[1|The pulls add up to one side, making it polar.]] [[2|CO2 is a straight line.]] [[3|The two polar bonds are opposite and cancel out, so overall it is nonpolar.]]",
          "All four marks. Including the lone pairs explains the bend.",
        ],
        [
          "partial",
          "[[0|Water is bent.]] [[1|It is polar.]] CO2 is bent too but it is nonpolar because carbon is not very electronegative.",
          "Carbon dioxide is linear. It is nonpolar because the bond polarities cancel, not because of carbon's electronegativity.",
        ],
        [
          "partial",
          "[[2|CO2 is linear]] and [[3|the polar bonds cancel]]. Water is linear too but polar.",
          "Your CO2 answer is right. Water is bent, and that bend is exactly why it is polar. Correct the shape.",
          true,
        ],
        [
          "weak",
          "Both have polar bonds so both are polar molecules.",
          "Polar bonds do not always make a polar molecule. Look at the shape, and whether the pulls cancel.",
        ],
        [
          "weak",
          "[[0|Water is bent.]] CO2 is bent as well, and both of them are nonpolar because they are gases.",
          "Water is a liquid at room temperature and is polar. Shape and polarity, not the state of matter, decide this.",
        ],
      ],
    },
    {
      prompt:
        "Acetone evaporates faster than water and makes your skin feel cooler. Explain both observations in terms of intermolecular forces and the energy of the molecules that escape.",
      scheme: [
        "States that acetone has weaker intermolecular forces than water",
        "States that weaker forces mean molecules escape into the gas phase more easily, so evaporation is faster",
        "States that the fastest, highest-energy molecules are the ones that escape",
        "States that the average energy of the remaining liquid falls, so the temperature drops and it feels cool",
      ],
      model:
        "Acetone has weaker intermolecular forces than water, which has strong hydrogen bonds, so its molecules escape into the gas more easily and it evaporates faster. The molecules that escape are the ones with the most energy, so the average energy of the liquid left on the skin falls and the temperature drops, which feels cool.",
      answers: [
        [
          "full",
          "[[0|Acetone doesn't have hydrogen bonds like water so its forces between molecules are weaker.]] [[1|Fewer attractions to overcome means the molecules escape faster, so evaporation is quicker.]] [[2|The molecules that leave are the most energetic ones.]] [[3|The liquid that's left has lower average energy, so it gets colder and feels cool.]]",
          "Full marks. The point about the most energetic molecules leaving is the heart of evaporative cooling.",
        ],
        [
          "full",
          "[[0|The intermolecular forces in acetone are weaker than the hydrogen bonds in water.]] [[1|So it evaporates faster as the molecules break free more easily.]] [[2|The fastest molecules are the ones that escape.]] [[3|That lowers the average kinetic energy of what is left and so the temperature, which my skin senses as cold.]]",
          "All four marks, and the connection to kinetic energy is accurate.",
        ],
        [
          "partial",
          "[[0|Acetone has weaker forces]] so [[1|it evaporates faster]]. It feels cold because it is a cold liquid.",
          "It is not colder to start with. The cooling comes from the energy lost as the fastest molecules escape.",
        ],
        [
          "partial",
          "[[2|The fastest molecules leave]] and [[3|that cools the liquid]]. Water is faster because it is smaller.",
          "Your cooling explanation is good. Water is slower because of hydrogen bonds, not because of its size.",
          true,
        ],
        [
          "weak",
          "The acetone takes heat from your hand to burn and that makes it feel cold.",
          "Acetone is not burning. Evaporation takes energy from the liquid as its fastest molecules escape. Use intermolecular forces to explain the speed.",
        ],
        [
          "weak",
          "[[1|Acetone evaporates faster.]] This is because acetone has stronger bonds than water.",
          "Stronger forces would make it evaporate more slowly. Acetone has weaker intermolecular forces than water.",
        ],
      ],
    },
  ],
  practical: {
    title: "Evaporative cooling of three liquids",
    instructions:
      "Wrap the bulb of a thermometer in a small square of paper towel, secured with a rubber band. Dip it in water, ethanol and acetone in turn, hold it in the air, and record the lowest temperature reached in two minutes. Rank the liquids by the temperature drop and explain the ranking in terms of intermolecular forces.",
    steps: [
      ["Record the room temperature and put on goggles. Keep acetone and ethanol away from flames."],
      ["Wrap a small square of paper towel around the thermometer bulb and secure it with a band."],
      ["Dip the bulb in the water for five seconds, remove it, and read the temperature every 15 seconds for two minutes.", "Work in a ventilated area and keep the bottle capped between uses."],
      ["Repeat with a fresh paper towel for ethanol and then acetone, waiting for the thermometer to return to room temperature."],
      ["Calculate the greatest temperature drop for each liquid."],
      ["Rank the liquids and explain the ranking in terms of intermolecular forces."],
    ],
    rubric: [
      ["Method: fair test with a fresh towel, same dip time and a room temperature baseline", 4],
      ["Results: complete table and correct temperature drops", 4],
      ["Conclusion: links the ranking to the strength of intermolecular forces", 4],
    ],
    writeUps: [
      [
        "full",
        "Room temperature was 22 degrees Celsius. Water dropped to 20, a drop of 2 degrees. Ethanol dropped to 15, a drop of 7 degrees, and acetone dropped to 10, a drop of 12 degrees. The ranking from biggest to smallest drop is acetone, ethanol, water. Acetone molecules have the weakest attractions to each other, so they evaporate fastest and take the most energy with them, while water has strong hydrogen bonds and evaporates slowly.",
        [4, 4, 4],
        "An excellent report with a clear table, correct drops, and a conclusion in terms of forces.",
      ],
      [
        "full",
        "We used a fresh paper towel each time, dipped for five seconds, and measured every 15 seconds. The drops were 2 for water, 6 for ethanol and 11 for acetone. Acetone cooled the most. This is because its intermolecular forces are the weakest, so the fastest molecules escape easily. Ethanol has hydrogen bonds but fewer than water, so it was in the middle. A source of error is that the room had a draft that may have changed evaporation.",
        [4, 3, 4],
        "Very good. Include the full set of temperature readings in your table rather than only the drops.",
      ],
      [
        "partial",
        "The acetone made the thermometer go down the most and the water went down the least. Ethanol was in the middle. I think this is because acetone evaporates fast. We wrapped the thermometer in paper towel and dipped it in the liquids in turn.",
        [2, 2, 2],
        "Give the actual temperatures and drops. Then explain why acetone evaporates faster, using the strength of the forces between its molecules.",
      ],
      [
        "partial",
        "Room temperature was 22. Water 20, ethanol 15, acetone 10. Acetone dropped the most. I do not know why it dropped more than the others. Maybe it was a colder liquid than the water when we started so that is why it dropped to a lower temperature.",
        [2, 3, 1],
        "Your numbers are good. Liquids were all at room temperature to start. The difference comes from how fast each evaporates, which depends on forces between molecules.",
      ],
      [
        "weak",
        "We put the thermometer in the liquids and the temperature changed. Acetone changed the most because it is the strongest chemical. It was a lot of fun to do the experiment and I learned about the liquids. I forgot to write down the starting temperature.",
        [1, 1, 0],
        "Record the temperatures and the drops. Acetone is not the strongest, it has the weakest attractions between its molecules, which is why it evaporates fast.",
      ],
      [
        "weak",
        "Water went down the most because water has the strongest bonds, so it takes the most energy to evaporate and that made the thermometer the coldest. Acetone hardly changed at all in our test because it is such a light liquid.",
        [1, 0, 0],
        "Check your data. The strongest forces make water evaporate slowly, so it gives the smallest drop. Compare the ranking with the boiling points.",
      ],
    ],
  },
};

const w6: WeekInput = {
  topic: "Balancing equations and the mole",
  note: `
## Objectives

Students will be able to:

1. balance chemical equations and classify reactions as synthesis, decomposition, replacement or combustion;
2. convert between moles, mass and number of particles using molar mass and Avogadro's number.

## Materials

Atom counting cards, a periodic table with molar masses, balances, samples of water, salt and sugar, a calculator, the worksheet.

## Starter (6 minutes)

Pose: "A recipe makes 12 cookies from 2 cups of flour. How much flour for 36? Chemists use the same kind of reasoning with counting units called moles." Take answers and link to ratios.

## Main activity

1. Balance equations with atom inventory tables: 4Fe + 3O2 gives 2Fe2O3, and CH4 + 2O2 gives CO2 + 2H2O. Classify each by type.
2. Introduce the mole as 6.02 x 10^23 particles and molar mass as the mass of one mole (in grams). Work through water (18.02 g/mol) and sodium chloride (58.44 g/mol).
3. Stations: weigh out one mole of table salt, half a mole of water and 0.25 mole of sugar. Convert between grams, moles and particles.

## Checking for understanding

Mini whiteboards: "How many moles are in 36.0 g of water?" Check the setup and the units.

## Worksheet and quiz

Balancing, classification and mole conversions.
`,
  reading: [
    "Counting by weighing",
    `
A chemical equation is a recipe. The formulas on the left are the **reactants**, and the formulas on the right are the **products**. Because atoms are not created or destroyed in a reaction, the number of atoms of each element must be the same on both sides. This is the **conservation of mass**. To balance an equation, you change the **coefficients**, the numbers in front of formulas, and never the subscripts inside them, because changing a subscript changes the substance.

Take rust. Iron plus oxygen gives iron(III) oxide: Fe + O2 gives Fe2O3. The right side has 2 iron and 3 oxygen atoms. To balance, the oxygen needs a common multiple of 2 and 3, which is 6. Put 3 in front of O2 (6 oxygen atoms) and 2 in front of Fe2O3 (6 oxygen atoms and 4 iron atoms), then put 4 in front of Fe. The balanced equation is 4Fe + 3O2 gives 2Fe2O3.

Reactions fall into common types. In a **synthesis** reaction, two or more substances combine to make one. In a **decomposition**, one substance breaks into two or more. In a **single replacement**, one element takes the place of another in a compound. In a **combustion**, a substance reacts with oxygen and releases energy, as when methane burns: CH4 + 2O2 gives CO2 + 2H2O.

Atoms are far too small to count one by one, so chemists count in moles. One **mole** is 6.02 times 10 to the power of 23 particles, which is **Avogadro's number**. The mass in grams of one mole of a substance is its **molar mass**, which you find by adding the atomic masses from the periodic table. Water, H2O, has a molar mass of 2(1.01) + 16.00, which is 18.02 g/mol. To find how many moles are in a sample, divide the mass by the molar mass. A sample of 36.0 g of water is 36.0 divided by 18.02, which is about 2.00 mol. To find the number of molecules, multiply the moles by Avogadro's number: 0.50 mol is 3.01 times 10 to the power of 23 molecules. The mole links the invisible world of atoms to the grams you can weigh on a balance.
`,
  ],
  cards: [
    ["Reactant", "A substance that is present at the start of a reaction."],
    ["Product", "A substance that is formed in a reaction."],
    ["Coefficient", "The number in front of a formula that shows how many units take part."],
    ["Synthesis reaction", "A reaction in which two or more substances combine to form one."],
    ["Decomposition reaction", "A reaction in which one substance breaks into two or more."],
    ["Combustion", "A reaction of a substance with oxygen that releases energy."],
    ["Mole", "6.02 x 10^23 particles of a substance."],
    ["Molar mass", "The mass in grams of one mole of a substance."],
  ],
  closed: [
    [
      "What are the coefficients that balance Fe + O2 gives Fe2O3?",
      ["1, 1, 1", "2, 3, 2", "4, 3, 2", "3, 2, 4"],
      "C",
    ],
    [
      "The reaction 2H2O gives 2H2 + O2 is a:",
      ["Synthesis", "Decomposition", "Combustion", "Single replacement"],
      "B",
    ],
    [
      "What is the molar mass of NaCl (Na = 22.99, Cl = 35.45)?",
      ["13.46 g/mol", "58.44 g/mol", "28.22 g/mol", "1.54 g/mol"],
      "B",
    ],
    [
      "How many moles are in 117 g of NaCl (molar mass 58.44 g/mol)?",
      ["0.50 mol", "2.00 mol", "6.80 mol", "117 mol"],
      "B",
    ],
    [
      "How many molecules are in 0.50 mol of water?",
      ["6.02 x 10^23", "3.01 x 10^23", "1.20 x 10^24", "9.0 x 10^23"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Balance the equation C3H8 + O2 gives CO2 + H2O, show your atom counts, and classify the reaction.",
      scheme: [
        "Balances carbon with 3 CO2",
        "Balances hydrogen with 4 H2O",
        "Balances oxygen with 5 O2 and gives the complete equation C3H8 + 5O2 gives 3CO2 + 4H2O",
        "Classifies the reaction as combustion",
      ],
      model:
        "Balance the carbon with 3 CO2 and the hydrogen with 4 H2O. That gives 6 + 4 = 10 oxygen atoms on the right, so 5 O2 are needed on the left. The balanced equation is C3H8 + 5O2 gives 3CO2 + 4H2O. This is a combustion reaction.",
      answers: [
        [
          "full",
          "[[0|3 carbons means 3 CO2.]] [[1|8 hydrogens means 4 H2O.]] [[2|Now the oxygen on the right is 6 + 4 = 10, so 5 O2 on the left. C3H8 + 5O2 → 3CO2 + 4H2O.]] [[3|It is a combustion reaction because a fuel burns in oxygen.]]",
          "Full marks. Leaving oxygen for last is a good strategy because it appears in two products.",
        ],
        [
          "full",
          "[[0|C: 3 on the left so put 3 in front of CO2.]] [[1|H: 8 on the left so put 4 in front of H2O.]] [[2|O: 3×2 + 4×1 = 10, so the O2 needs a 5. Balanced: C3H8 + 5O2 → 3CO2 + 4H2O.]] [[3|Combustion, since it's a hydrocarbon reacting with oxygen.]]",
          "All four marks, with a neat atom inventory.",
        ],
        [
          "partial",
          "[[0|3 CO2.]] [[1|4 H2O.]] C3H8 + 3O2 → 3CO2 + 4H2O. It's combustion.",
          "The oxygen is not balanced: the right side has 10 oxygen atoms but 3 O2 only gives 6. You need 5 O2.",
        ],
        [
          "partial",
          "[[2|C3H8 + 5O2 → 3CO2 + 4H2O.]] [[3|It's combustion.]]",
          "The answer is right, but you were asked to show your atom counts. Write out the carbons, hydrogens and oxygens on each side.",
          true,
        ],
        [
          "weak",
          "C3H8 + O2 → CO2 + H2O is already balanced because the same letters are on each side. It's a synthesis reaction.",
          "Count the atoms: there are 3 carbons on the left and 1 on the right. And a fuel burning in oxygen is combustion.",
        ],
        [
          "weak",
          "[[3|This is combustion.]] To balance it I changed the formula to CO3 so the carbons match.",
          "Never change the subscripts, because that changes the substance. Balance with coefficients only.",
        ],
      ],
    },
    {
      prompt:
        "A sample of water has a mass of 54.0 g. Calculate the number of moles and the number of molecules. The molar mass of water is 18.0 g/mol.",
      scheme: [
        "Writes moles = mass / molar mass",
        "Calculates 3.00 mol",
        "Multiplies the moles by 6.02 x 10^23",
        "Gives the number of molecules as 1.81 x 10^24",
      ],
      model:
        "Moles equals mass divided by molar mass, so 54.0 g divided by 18.0 g/mol is 3.00 mol. The number of molecules is 3.00 mol times 6.02 x 10^23 molecules per mole, which is 1.81 x 10^24 molecules.",
      answers: [
        [
          "full",
          "[[0|Moles is mass divided by molar mass.]] [[1|54.0 / 18.0 = 3.00 mol.]] [[2|Then 3.00 × 6.02 × 10^23]] [[3|= 1.81 × 10^24 molecules.]]",
          "Full marks. The units and significant figures are right.",
        ],
        [
          "full",
          "[[0|n = m / M]], so [[1|n = 54.0 g ÷ 18.0 g/mol = 3.00 mol]]. Then [[2|multiply by Avogadro's number, 6.02 × 10^23]] to get [[3|1.81 × 10^24 molecules]].",
          "All four marks, with a clear formula.",
        ],
        [
          "partial",
          "[[0|Mass divided by molar mass]] [[1|gives 3.00 mol.]] Then 3.00 + 6.02 × 10^23 molecules.",
          "The moles are right. To find the number of particles you multiply by Avogadro's number, not add.",
        ],
        [
          "partial",
          "[[2|3 mol × 6.02 × 10^23]] [[3|= 1.81 × 10^24.]]",
          "These steps are right. Show how you found the 3 mol from the mass, since the method is part of the answer.",
          true,
        ],
        [
          "weak",
          "54.0 × 18.0 = 972 mol and 972 × 6.02 × 10^23 = 5.85 × 10^26 molecules.",
          "To get moles you divide the mass by the molar mass. Multiplying them gives a number that does not make sense for 54 g of water.",
        ],
        [
          "weak",
          "[[0|Moles is mass over molar mass.]] 18.0 / 54.0 = 0.333 mol, which is 2.0 × 10^23 molecules.",
          "You wrote the right rule but flipped the numbers. The mass goes on top: 54.0 divided by 18.0.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Stoichiometry, limiting reactants and percent yield",
  note: `
## Objectives

Students will be able to:

1. calculate the mass of a product from the mass of a reactant, and find the limiting reactant;
2. calculate percent yield and explain why an actual yield is less than the theoretical yield.

## Materials

Mole-map posters, calculators, s'mores ingredients (graham crackers, marshmallows, chocolate) for a limiting-reactant demo, the quiz and problem set.

## Starter (7 minutes)

Use a s'mores analogy: a s'more is 2 crackers, 1 marshmallow and 1 piece of chocolate. With 10 crackers, 8 marshmallows and 4 chocolates, how many s'mores can we make? Which ingredient runs out first?

## Main activity

1. Present the mole map: grams of A to moles of A to moles of B (using the coefficients) to grams of B. Practice on 2H2 + O2 gives 2H2O.
2. Limiting reactant: for N2 + 3H2 gives 2NH3, compare the available moles with the ratio and decide which runs out.
3. Define theoretical, actual and percent yield, and discuss why real reactions do not give the theoretical amount.

## Checking for understanding

Whiteboards: "Which reactant limits if you have 1.00 mol N2 and 2.00 mol H2?" Check for the ratio.

## Quiz and problem set

Five questions and a problem set with a limiting-reactant problem.
`,
  reading: [
    "How much can we make?",
    `
The coefficients in a balanced equation tell you the **mole ratio** of reactants and products. In 2H2 + O2 gives 2H2O, two moles of hydrogen react with one mole of oxygen to make two moles of water. You cannot weigh moles directly, so you convert from grams to moles, use the mole ratio, and convert back to grams. This is **stoichiometry**.

Here is an example. How many grams of water form from 4.04 g of hydrogen? The molar mass of H2 is 2.02 g/mol, so 4.04 g is 2.00 mol. The ratio of H2 to H2O is 2 to 2, so 2.00 mol of hydrogen makes 2.00 mol of water. The molar mass of water is 18.02 g/mol, so the mass is 2.00 times 18.02, which is 36.0 g. The pattern is always grams to moles, moles to moles with the ratio, and moles to grams.

In real reactions one reactant often runs out first. This is the **limiting reactant**, and it decides how much product can form. The other is the **excess reactant**. To find the limiting reactant, divide each amount of moles by its coefficient and compare. For N2 + 3H2 gives 2NH3, suppose you start with 1.00 mol of N2 and 2.00 mol of H2. Nitrogen could support 1.00 divided by 1, which is 1.00 reaction, but hydrogen supports 2.00 divided by 3, which is 0.67. Hydrogen runs out first, so it is limiting. The ammonia is found from the limiting reactant: 2.00 mol H2 times 2 mol NH3 per 3 mol H2 is 1.33 mol of NH3.

The **theoretical yield** is the maximum mass of product calculated from the limiting reactant. The **actual yield** is what you really collect, and it is almost always less. Some product sticks to glassware, some reactant forms other products, the reaction may not go to completion, and some is lost in the purification. The **percent yield** is the actual yield divided by the theoretical yield, times 100. If the theoretical yield is 20.0 g and you collect 15.0 g, the percent yield is 75.0 percent. A percent yield greater than 100 percent signals an error, such as a wet product.
`,
  ],
  cards: [
    ["Stoichiometry", "Calculating amounts of reactants and products from a balanced equation."],
    ["Mole ratio", "The ratio of coefficients in a balanced equation."],
    ["Limiting reactant", "The reactant that is used up first and limits the amount of product."],
    ["Excess reactant", "The reactant that is left over when the reaction stops."],
    ["Theoretical yield", "The maximum amount of product that can form, calculated from the equation."],
    ["Actual yield", "The amount of product really collected in an experiment."],
    ["Percent yield", "Actual yield divided by theoretical yield, times 100."],
    ["Molar mass", "The mass in grams of one mole of a substance."],
  ],
  closed: [
    [
      "In 2H2 + O2 gives 2H2O, how many moles of water form from 3.0 mol of hydrogen with plenty of oxygen?",
      ["1.5 mol", "3.0 mol", "6.0 mol", "9.0 mol"],
      "B",
    ],
    [
      "In N2 + 3H2 gives 2NH3, you have 1.00 mol N2 and 2.00 mol H2. Which is the limiting reactant?",
      ["N2", "H2", "NH3", "Neither"],
      "B",
    ],
    [
      "A reaction should give 20.0 g of product, but only 15.0 g is collected. What is the percent yield?",
      ["33%", "75%", "133%", "5%"],
      "B",
    ],
    [
      "Which is the most likely reason for an actual yield being lower than the theoretical yield?",
      [
        "Atoms are destroyed in the reaction",
        "Some product is lost during transfer, or some reactant forms other products",
        "The mole ratio changes during the reaction",
        "The coefficients are wrong",
      ],
      "B",
    ],
    [
      "How many grams are in 2.00 mol of water (molar mass 18.0 g/mol)?",
      ["9.00 g", "18.0 g", "36.0 g", "72.0 g"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "For the reaction 2H2 + O2 gives 2H2O, calculate the mass of water that forms from 4.04 g of hydrogen with an excess of oxygen. The molar masses are 2.02 g/mol for H2 and 18.02 g/mol for H2O.",
      scheme: [
        "Converts 4.04 g of hydrogen to 2.00 mol",
        "Uses the 2 to 2 mole ratio to get 2.00 mol of water",
        "Multiplies by the molar mass of water, 18.02 g/mol",
        "Gives the mass as 36.0 g with a unit",
      ],
      model:
        "4.04 g of H2 divided by 2.02 g/mol is 2.00 mol. The mole ratio of H2 to H2O is 2 to 2, so 2.00 mol of H2 makes 2.00 mol of H2O. The mass of water is 2.00 mol times 18.02 g/mol, which is 36.0 g.",
      answers: [
        [
          "full",
          "[[0|4.04 g ÷ 2.02 g/mol = 2.00 mol of H2.]] [[1|The ratio H2 to H2O is 2:2 so there is 2.00 mol of H2O.]] [[2|2.00 mol × 18.02 g/mol]] [[3|= 36.0 g of water.]]",
          "Full marks. Each step is labeled and the units carry through.",
        ],
        [
          "full",
          "[[0|Moles of H2 = 4.04 / 2.02 = 2.00.]] [[1|2 mol H2 gives 2 mol H2O.]] [[2|Mass = 2.00 × 18.02]] [[3|= 36.0 g H2O.]]",
          "All four marks, concise and correct.",
        ],
        [
          "partial",
          "[[0|4.04/2.02 = 2.00 mol.]] [[1|The ratio is 2:2 so 2.00 mol water.]] The mass is 2.00 grams of water.",
          "You found the moles of water but then forgot to convert back to grams. Multiply by 18.02 g/mol to get 36.0 g.",
        ],
        [
          "partial",
          "[[2|2.00 mol × 18.02 g/mol]] [[3|= 36.0 g.]]",
          "Your last two steps are right. Show how you found 2.00 mol of water from the 4.04 g of hydrogen.",
          true,
        ],
        [
          "weak",
          "4.04 × 18.02 = 72.8 g because you multiply the masses together.",
          "You cannot multiply masses of different substances. Convert to moles first, use the ratio, and convert back to grams.",
        ],
        [
          "weak",
          "[[0|4.04 divided by 2.02 is 2.00 mol.]] The ratio is 2 H2 to 1 O2 so the answer is 1.00 mol of water, or 18.0 g.",
          "You used the hydrogen to oxygen ratio, but the question asks about water. The ratio of H2 to H2O is 2 to 2.",
        ],
      ],
    },
    {
      prompt:
        "A student expects 20.0 g of product but collects 14.6 g. Calculate the percent yield and give two reasons why the actual yield was less than the theoretical yield.",
      scheme: [
        "Writes percent yield as actual divided by theoretical, times 100",
        "Calculates 73.0 percent",
        "Gives one valid reason, such as product lost in transfer or on the filter paper",
        "Gives a second valid reason, such as an incomplete reaction or a competing side reaction",
      ],
      model:
        "Percent yield equals actual yield divided by theoretical yield, times 100. 14.6 divided by 20.0, times 100, is 73.0 percent. The yield was less because some product was lost when it was transferred and filtered, and because the reaction may not have gone to completion or some reactants formed other products.",
      answers: [
        [
          "full",
          "[[0|Percent yield = actual / theoretical × 100.]] [[1|14.6 / 20.0 × 100 = 73.0%.]] [[2|Some of the product might have stuck to the filter paper.]] [[3|The reaction might not have finished or some of the reactants made a different product.]]",
          "Full marks. Both reasons are real and specific.",
        ],
        [
          "full",
          "[[0|Take actual yield over theoretical yield and multiply by 100.]] [[1|(14.6/20.0) × 100 = 73.0 percent.]] [[2|Product can be lost when transferring between containers.]] [[3|A side reaction can use up some reactant.]]",
          "All four marks. Explaining the formula in words is also helpful.",
        ],
        [
          "partial",
          "[[0|Actual over theoretical times 100.]] 20.0/14.6 × 100 = 137%. [[2|Product was lost on the paper.]]",
          "You flipped the fraction. The actual yield goes on top, which gives 73.0 percent. A yield over 100 percent would be a warning sign.",
        ],
        [
          "partial",
          "[[1|The percent yield is 73.0%.]] [[3|The reaction may not have gone to completion.]]",
          "Show the formula and your working, and give a second reason such as product lost in handling.",
          true,
        ],
        [
          "weak",
          "20.0 - 14.6 = 5.4 so the percent yield is 5.4%. The mass disappeared, which breaks the law of conservation of mass.",
          "Percent yield compares the two masses as a ratio. Mass is not destroyed: some product was lost in handling or formed other products.",
        ],
        [
          "weak",
          "[[1|The answer is 73%.]] It was less because the scale was wrong and the teacher made a mistake.",
          "The percent is right. Give reasons about the chemistry or handling, such as product left on glassware or a side reaction.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Precipitation reactions and the movement of thermal energy",
  note: `
## Objectives

Students will be able to:

1. predict whether a double replacement reaction forms a precipitate using solubility rules;
2. investigate how thermal energy moves between two systems until they reach the same temperature.

## Materials

Solutions of sodium chloride, silver nitrate (teacher demo), potassium iodide, lead nitrate (teacher demo), sodium sulfate and barium chloride, test tubes, coffee cup calorimeters, thermometers, hot and cool water, the problem set.

## Starter (6 minutes)

Hold up two clear solutions and mix them in front of the class to make a bright yellow solid. Ask: "What did we just make, and how could we have predicted it?"

## Main activity

1. Solubility rules: nearly all nitrates and sodium and potassium salts are soluble; most chlorides are soluble except those of silver and lead; most sulfates are soluble except barium sulfate. Practice predicting products from pairs.
2. Write net ionic equations: Pb2+ + 2I- gives PbI2(s).
3. Mix 100 g of 80 degree water with 100 g of 20 degree water in a calorimeter and measure the final temperature. Discuss why it ends near 50 degrees and use q = mc delta T.

## Checking for understanding

Ask: "Will a precipitate form when potassium nitrate and sodium chloride solutions are mixed?" Wait for the reason (all possible products are soluble).

## Problem set and worksheet

Five precipitation predictions and two energy calculations.
`,
  reading: [
    "Solids from solutions, and energy on the move",
    `
When two ionic solutions are mixed, the ions can swap partners in a **double replacement** reaction. Silver nitrate plus sodium chloride gives silver chloride and sodium nitrate. Whether anything visible happens depends on whether one of the new compounds is insoluble. A solid that forms from a solution is a **precipitate**, and the solid is marked (s) while dissolved substances are marked (aq).

You can predict a precipitate with **solubility rules**. Nearly all compounds of sodium, potassium and ammonium are soluble. Nearly all nitrates are soluble. Most chlorides, bromides and iodides are soluble, except those of silver, lead and mercury(I). Most sulfates are soluble except barium sulfate and lead sulfate. Most carbonates and hydroxides are insoluble except those of group 1. In the silver nitrate and sodium chloride example, silver chloride is on the insoluble list, so AgCl(s) forms as a white solid. When potassium nitrate and sodium chloride are mixed, the possible new compounds are potassium chloride and sodium nitrate, which are both soluble, so no reaction is seen.

Some ions do not change, and are called **spectator ions**. In the lead nitrate and potassium iodide reaction, Pb(NO3)2(aq) + 2KI(aq) gives PbI2(s) + 2KNO3(aq), the potassium and nitrate ions stay dissolved. The **net ionic equation** shows only the ions that react: Pb2+(aq) + 2I-(aq) gives PbI2(s), the bright yellow solid.

Energy moves too. Thermal energy flows from a hotter object to a cooler one until they reach the same temperature, which is **thermal equilibrium**. The amount of heat is q = mcΔT, where m is the mass, c is the specific heat (4.18 J/g per degree Celsius for water) and ΔT is the change in temperature. If you mix 100 g of water at 80 degrees Celsius with 100 g of water at 20 degrees, the final temperature is the average, 50 degrees, because the masses are equal. The hot water loses 100 times 4.18 times 30 which is 12,540 J, and the cool water gains the same amount. Energy is conserved: it moves, but the total stays the same.
`,
  ],
  cards: [
    ["Double replacement", "A reaction in which the ions of two compounds swap partners."],
    ["Precipitate", "An insoluble solid that forms when solutions are mixed."],
    ["Solubility rules", "Guidelines that tell which ionic compounds dissolve in water."],
    ["Spectator ion", "An ion that is present but does not take part in the reaction."],
    ["Net ionic equation", "An equation showing only the ions that react."],
    ["Thermal equilibrium", "The state in which two objects in contact are at the same temperature."],
    ["Specific heat", "The energy needed to raise the temperature of 1 g of a substance by 1 degree Celsius."],
    ["q = mcΔT", "The equation for the heat gained or lost by a substance as its temperature changes."],
  ],
  closed: [
    [
      "Silver nitrate solution is mixed with sodium chloride solution. What precipitate forms?",
      ["Sodium nitrate", "Silver chloride", "Silver sodium", "No precipitate forms"],
      "B",
    ],
    [
      "Potassium nitrate and sodium chloride solutions are mixed. What is observed?",
      ["A white precipitate", "A yellow precipitate", "No reaction", "A gas"],
      "C",
    ],
    [
      "In Pb(NO3)2 + 2KI gives PbI2 + 2KNO3, which ions are spectators?",
      ["Pb2+ and I-", "K+ and NO3-", "Pb2+ and K+", "I- and NO3-"],
      "B",
    ],
    [
      "How much heat is needed to raise 50.0 g of water by 10.0 degrees Celsius (c = 4.18 J/g per degree)?",
      ["209 J", "2090 J", "418 J", "20,900 J"],
      "B",
    ],
    [
      "When hot water is poured into a cup of cool water, what happens to thermal energy?",
      [
        "Energy is destroyed",
        "Energy flows from the hot water to the cool water until they are at the same temperature",
        "Energy flows from the cool water to the hot water",
        "Energy stays in the hot water",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Barium chloride solution is mixed with sodium sulfate solution. Write the balanced equation with states, name the precipitate, and write the net ionic equation.",
      scheme: [
        "Writes BaCl2(aq) + Na2SO4(aq) gives BaSO4(s) + 2NaCl(aq)",
        "Names the precipitate as barium sulfate, using the rule that most sulfates are soluble but barium sulfate is not",
        "Identifies the sodium and chloride ions as spectators",
        "Writes the net ionic equation Ba2+(aq) + SO4 2-(aq) gives BaSO4(s)",
      ],
      model:
        "BaCl2(aq) + Na2SO4(aq) gives BaSO4(s) + 2NaCl(aq). The precipitate is barium sulfate, because barium sulfate is an exception to the rule that sulfates are soluble. Sodium and chloride ions are spectators. The net ionic equation is Ba2+(aq) + SO4 2-(aq) gives BaSO4(s).",
      answers: [
        [
          "full",
          "[[0|BaCl2(aq) + Na2SO4(aq) → BaSO4(s) + 2NaCl(aq).]] [[1|The precipitate is barium sulfate, because barium sulfate is one of the insoluble sulfates.]] [[2|Na+ and Cl- are spectator ions since NaCl stays dissolved.]] [[3|Net ionic: Ba2+(aq) + SO4 2-(aq) → BaSO4(s).]]",
          "Full marks. Each part of the answer is consistent with the others.",
        ],
        [
          "full",
          "[[0|Balanced equation: BaCl2(aq) + Na2SO4(aq) → BaSO4(s) + 2NaCl(aq).]] [[1|BaSO4 is the white precipitate, an exception to the sulfate solubility rule.]] [[2|Sodium and chloride ions are spectators.]] [[3|Net ionic equation: Ba2+ + SO4 2- → BaSO4(s).]]",
          "All four marks, with the correct states.",
        ],
        [
          "partial",
          "[[0|BaCl2(aq) + Na2SO4(aq) → BaSO4(s) + 2NaCl(aq).]] [[1|Barium sulfate is the precipitate.]] The spectator ions are Ba and sulfate.",
          "Spectators are the ions that stay dissolved and do not change: sodium and chloride. Barium and sulfate are the reacting ions. Write the net ionic equation too.",
        ],
        [
          "partial",
          "[[3|Ba2+ + SO4 2- → BaSO4(s)]] and [[2|sodium and chloride are spectators]].",
          "The net ionic equation and spectators are right. Write the full balanced equation with states and name the precipitate.",
          true,
        ],
        [
          "weak",
          "BaCl + NaSO4 → BaSO4 + NaCl. No precipitate forms, because sodium salts are always soluble.",
          "Sodium salts are soluble, which is why NaCl stays dissolved, but barium sulfate is not. Check the formulas and the charges.",
        ],
        [
          "weak",
          "[[1|Barium sulfate is the precipitate.]] The net ionic equation is the same as the full equation.",
          "The net ionic equation leaves out the spectator ions and shows only Ba2+ and SO4 2- forming the solid.",
        ],
      ],
    },
    {
      prompt:
        "A student mixes 150 g of water at 70.0 degrees Celsius with 50.0 g of water at 10.0 degrees Celsius in an insulated cup. Calculate the final temperature, and explain why the final temperature is closer to 70 degrees than to 10 degrees.",
      scheme: [
        "States that the heat lost by the hot water equals the heat gained by the cool water",
        "Sets up 150(70 - T) = 50(T - 10)",
        "Solves to get a final temperature of 55.0 degrees Celsius",
        "Explains that there is more hot water, so it holds more thermal energy and changes the final temperature more",
      ],
      model:
        "Heat lost by the hot water equals heat gained by the cool water, so 150(70 - T) = 50(T - 10). That gives 10,500 - 150T = 50T - 500, so 200T = 11,000 and T = 55.0 degrees Celsius. The final temperature is closer to 70 because there is three times as much hot water, so it holds more energy and shifts the temperature the most.",
      answers: [
        [
          "full",
          "[[0|Heat lost by the hot water = heat gained by the cool water.]] [[1|150(70 - T) = 50(T - 10).]] [[2|10500 - 150T = 50T - 500 so 200T = 11000 and T = 55.0°C.]] [[3|There's three times as much hot water so it has more energy and pulls the temperature toward itself.]]",
          "Full marks. The specific heat cancels because both samples are water, which you used well.",
        ],
        [
          "full",
          "[[0|Energy is conserved so what the hot water loses the cold water gains.]] [[1|m1ΔT1 = m2ΔT2 gives 150(70 − T) = 50(T − 10).]] [[2|Solving, T = 55 degrees Celsius.]] [[3|The hot water is 150 g against 50 g so it dominates and the final temperature is nearer 70.]]",
          "All four marks. You recognized that the specific heat cancels.",
        ],
        [
          "partial",
          "[[0|The hot water loses what the cool water gains.]] The average of 70 and 10 is 40 degrees Celsius.",
          "A plain average only works when the masses are equal. Here there are 150 g and 50 g, so weight each by its mass.",
        ],
        [
          "partial",
          "[[1|150(70 - T) = 50(T - 10)]] and [[2|T = 55°C]].",
          "Your setup and answer are right. Add the reasoning for the first step and explain why the answer is nearer to 70.",
          true,
        ],
        [
          "weak",
          "70.0 + 10.0 = 80.0 and then 80.0 divided by 2 is 40, so the final temperature is 40 degrees. The masses do not matter.",
          "The masses do matter. The larger mass of hot water pulls the final temperature toward 70.",
        ],
        [
          "weak",
          "[[0|The heat the hot water loses is gained by the cool water.]] The final temperature is 80 degrees because the heat adds together.",
          "The heat is transferred, not added to the temperature. The final temperature must be between 10 and 70 degrees.",
        ],
      ],
    },
  ],
};

writeCourse("chemistry-grade-10.json", "Chemistry", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
