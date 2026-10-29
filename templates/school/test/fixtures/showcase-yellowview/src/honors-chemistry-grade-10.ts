import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors Chemistry, Grade 10, Quarter 1. Standards: Next Generation Science
 * Standards, HS-PS1, in the school's own words. Deeper and more quantitative
 * than Chemistry: average atomic mass, successive ionization energies,
 * percent composition, molarity and calorimetry.
 */

const w1: WeekInput = {
  topic: "Dimensional analysis, uncertainty and classifying matter",
  note: `
## Objectives

Students will be able to:

1. measure, convert units by dimensional analysis and report results with the right significant figures;
2. analyze lab data, estimate uncertainty and report a conclusion that the data supports;
3. classify matter and select a separation technique from the properties of the components.

## Materials

Metric rulers, balances, graduated cylinders, density samples of three metals, calculators, the problem set.

## Starter (7 minutes)

Write on the board: "A car is traveling at 65 miles per hour. How fast is it in meters per second?" Do not give the conversion factors. Ask students to list what they need (1 mile is about 1609 meters, 1 hour is 3600 seconds) and set up the chain.

## Main activity

1. Dimensional analysis chains: write the setup so that units cancel. 65 mi/h x 1609 m/mi x 1 h/3600 s is about 29 m/s. Practice with area and volume conversions, where the factor must be squared or cubed.
2. Estimating uncertainty: read a graduated cylinder to plus or minus half the smallest division, and carry it into a density calculation using the percent uncertainties.
3. Classify mixtures and choose a separation: distillation for liquids with different boiling points, chromatography for dyes, and filtration for solids in liquids.

## Checking for understanding

Whiteboards: convert 0.250 L to cubic centimeters and state the significant figures.

## Problem set

Conversions with squares and cubes, uncertainty in density, and one separation design.
`,
  reading: [
    "Units that cancel, and numbers that admit what they do not know",
    `
A chemist treats units as part of the math. **Dimensional analysis** means writing a conversion as a chain of fractions, each equal to one, arranged so that the unwanted units cancel and the wanted unit remains. To convert 65 miles per hour to meters per second, you write 65 mi/h times 1609 m/mi times 1 h/3600 s. The miles cancel, the hours cancel, and you are left with meters per second: 65 times 1609 divided by 3600 is 29.05, which is reported as 29 m/s, two significant figures like the 65. If the chain does not cancel to the unit you want, you have the setup wrong, whatever the calculator says.

Conversions with area and volume need extra care. There are 100 cm in a meter, but there are 100 squared, or 10,000, square centimeters in a square meter, and 100 cubed, or 1,000,000, cubic centimeters in a cubic meter. A volume of 0.250 L is 0.250 times 1000, which is 250. mL. Since 1 mL is exactly 1 cm cubed, that is 250. cubic centimeters, with three significant figures.

No measurement is perfect, and a good scientist says how imperfect it is. A graduated cylinder marked every 1 mL is read to plus or minus 0.5 mL. If you read 24.0 mL, the true volume could be anywhere from 23.5 to 24.5 mL, an uncertainty of 0.5/24.0, or 2.1 percent. If the balance reads 64.8 g with an uncertainty of 0.1 g, that is 0.15 percent. When you divide to find density, the percent uncertainties add approximately, so the density has an uncertainty of about 2.2 percent. The volume measurement dominates. To improve the result you would choose a more precise instrument for the volume, not the mass. A result is **consistent** with an accepted value if the accepted value falls inside the range given by the uncertainty. This is a better test than a percent error alone, because it uses what you know about your own measurement.

Matter is classified by what it is made of, and mixtures are separated using differences in physical properties. **Distillation** separates liquids with different boiling points: ethanol boils at 78 degrees Celsius and water at 100, so heating a mixture drives off ethanol first. **Chromatography** separates dissolved substances by how strongly they cling to a surface compared with how well they dissolve in the moving solvent. **Filtration** separates an insoluble solid from a liquid.
`,
  ],
  cards: [
    ["Dimensional analysis", "Converting units using a chain of fractions equal to one so that units cancel."],
    ["Uncertainty", "The range within which the true value of a measurement probably lies."],
    ["Percent uncertainty", "The uncertainty divided by the measurement, times 100."],
    ["Consistent with", "Describes a result whose uncertainty range includes the accepted value."],
    ["Distillation", "Separating liquids by their different boiling points."],
    ["Chromatography", "Separating substances by how they move through a medium with a solvent."],
    ["Filtration", "Separating an insoluble solid from a liquid with a porous barrier."],
    ["Homogeneous mixture", "A mixture with a uniform composition, also called a solution."],
  ],
  closed: [
    [
      "A car travels at 65 mi/h. Using 1 mi = 1609 m, what is its speed in m/s?",
      ["2.9 m/s", "29 m/s", "290 m/s", "105 m/s"],
      "B",
    ],
    [
      "How many cubic centimeters are in 0.250 L?",
      ["0.250 cm^3", "2.50 cm^3", "250. cm^3", "25,000 cm^3"],
      "C",
    ],
    [
      "A cylinder is read as 24.0 mL with an uncertainty of 0.5 mL. What is the percent uncertainty in the volume?",
      ["0.5%", "2.1%", "4.8%", "12%"],
      "B",
    ],
    [
      "How many square centimeters are in 1 square meter?",
      ["100", "1000", "10,000", "1,000,000"],
      "C",
    ],
    [
      "Which method best separates ethanol from water?",
      ["Filtration", "Distillation", "Chromatography", "Using a magnet"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A metal block has a mass of 64.8 g (plus or minus 0.1 g) and displaces water from 20.0 mL to 44.0 mL (each reading plus or minus 0.5 mL). Calculate the density, estimate its percent uncertainty, and decide which measurement most limits the precision of the density.",
      scheme: [
        "Finds the volume as 24.0 mL and the density as 2.70 g/mL",
        "Finds the percent uncertainty in the mass, about 0.15 percent",
        "Finds the volume uncertainty as 1.0 mL, or about 4.2 percent, and combines to about 4.4 percent",
        "Concludes that the volume reading limits the precision",
      ],
      model:
        "The volume is 44.0 minus 20.0, or 24.0 mL, so the density is 64.8 divided by 24.0, which is 2.70 g/mL. The mass has a percent uncertainty of 0.1/64.8, about 0.15 percent. The volume is the difference of two readings, each plus or minus 0.5 mL, so its uncertainty is about 1.0 mL, or 4.2 percent. Together the uncertainty in density is about 4.4 percent. The volume reading limits the precision.",
      answers: [
        [
          "full",
          "[[0|Volume = 44.0 - 20.0 = 24.0 mL, so density = 64.8 / 24.0 = 2.70 g/mL.]] [[1|The mass uncertainty is 0.1/64.8, about 0.15%.]] [[2|The volume uncertainty is 0.5 + 0.5 = 1.0 mL, which is 4.2%, so the density is uncertain by about 4.4%.]] [[3|The volume is the weak link, so a better graduated cylinder would help the most.]]",
          "Full marks. Adding the two reading uncertainties for a difference is the step many people miss.",
        ],
        [
          "full",
          "[[0|The block's volume is 24.0 mL and the density is 2.70 g/mL.]] [[1|Percent uncertainty of mass: 0.1 ÷ 64.8 × 100 = 0.15%.]] [[2|For the volume I read two levels, each ± 0.5 mL, so ± 1.0 mL or about 4.2%. Together, about 4.4%.]] [[3|So the volume measurement limits how precise the density is.]]",
          "All four marks. You combined the uncertainties correctly and drew the conclusion.",
        ],
        [
          "partial",
          "[[0|Density is 64.8/24.0 = 2.70 g/mL.]] [[1|The mass is ±0.1 so 0.15%.]] The volume is ±0.5 mL so 2.1%, which makes the total 2.2%.",
          "The volume was found from two readings, so the uncertainty adds up to 1.0 mL, or 4.2 percent. Revisit your conclusion about which measurement limits the result.",
        ],
        [
          "partial",
          "[[0|The density is 2.70 g/mL.]] [[3|The volume is less precise than the mass.]]",
          "Your answers are right. Show the percent uncertainty for each, since the comparison needs numbers.",
          true,
        ],
        [
          "weak",
          "64.8 × 24.0 = 1555 g/mL. The mass is the biggest number so it limits the precision.",
          "Density is mass divided by volume, and the size of a number does not decide precision. Compare the percent uncertainty of each measurement.",
        ],
        [
          "weak",
          "[[0|The volume is 24.0 mL so the density is 2.70.]] The uncertainty is 0.1 because that is the smallest.",
          "Your density is right, but a unit is needed. Uncertainty is not the smallest number you see: compute the percent uncertainty of mass and of volume.",
        ],
      ],
    },
    {
      prompt:
        "Convert 2.50 square meters to square centimeters by dimensional analysis. Show the setup, explain why the conversion factor is squared, and give the answer with the right significant figures.",
      scheme: [
        "Sets up 2.50 m^2 times (100 cm/1 m)^2",
        "Explains the factor is squared because both length dimensions of the area must be converted",
        "Calculates 25,000 cm^2",
        "Writes the answer as 2.50 x 10^4 cm^2 to keep three significant figures",
      ],
      model:
        "2.50 m^2 times (100 cm / 1 m)^2 equals 2.50 times 10,000 cm^2. The factor is squared because area has two length dimensions, and each must be converted. The answer is 25,000 cm^2, written as 2.50 x 10^4 cm^2 to show three significant figures.",
      answers: [
        [
          "full",
          "[[0|2.50 m² × (100 cm / 1 m)²]] [[1|because an area has length twice, so I have to convert both lengths.]] [[2|That is 2.50 × 10,000 = 25,000 cm².]] [[3|With 3 sig figs it should be written 2.50 × 10^4 cm².]]",
          "Full marks. Scientific notation is the clean way to keep trailing zeros honest.",
        ],
        [
          "full",
          "[[0|Set up: 2.50 m² × (100 cm/m)².]] [[1|You square the factor since m² is m × m, two lengths.]] [[2|The result is 25,000 cm².]] [[3|Written as 2.50 × 10^4 cm² so the three significant figures are clear.]]",
          "All four marks, with a neat setup.",
        ],
        [
          "partial",
          "[[0|2.50 m² × 100 cm/1 m]] = 250 cm². [[3|I would write it as 2.50 × 10² to keep three sig figs.]]",
          "The factor must be squared, 100 squared is 10,000, and the answer is 2.50 x 10^4 cm^2. Your significant figure reasoning is good.",
        ],
        [
          "partial",
          "[[1|You square it because there are two dimensions.]] [[2|The answer is 25,000 cm².]]",
          "Both points are right. Show the setup with units so we can see they cancel, and write the answer with three significant figures.",
          true,
        ],
        [
          "weak",
          "1 m = 100 cm so 2.50 m² = 250 cm². You just move the decimal two places.",
          "That works for length, but area has two lengths. A square meter is 100 cm by 100 cm, which is 10,000 square centimeters.",
        ],
        [
          "weak",
          "[[2|The answer is 25,000 cm².]] I got that by multiplying 2.50 by 10,000 because it is a big number.",
          "The value is right. Say why 10,000 is the factor, using the squared conversion, and show the units cancelling.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Isotopes, average atomic mass and ions",
  note: `
## Objectives

Students will be able to:

1. distinguish physical and chemical change and justify the classification with evidence at the particle level;
2. use protons, neutrons and electrons to describe isotopes and ions, and calculate average atomic mass.

## Materials

Mass spectrum printouts of boron and chlorine, atom model cards, calculators, the worksheet.

## Starter (6 minutes)

Show the periodic table entry for boron (10.81) and ask: "Why isn't the mass of boron a whole number?" Take ideas and record them.

## Main activity

1. Evidence of chemical change: mini-demo with magnesium ribbon burning and sugar dissolving. Ask students to explain the difference at the particle level (bonds broken and formed).
2. Review protons, neutrons and electrons, then give a mass spectrum for boron with peaks at 10 and 11. Students read the percent abundance and compute a weighted average.
3. Practice with chlorine, and with ions such as Fe3+ and N3-.

## Checking for understanding

Ask: "If a sample is 75% Cl-35 and 25% Cl-37, estimate the average atomic mass without a calculator." Look for 35.5.

## Worksheet

Isotope notation, average atomic mass calculations and ion particle counts.
`,
  reading: [
    "Why atomic masses are not whole numbers",
    `
In a **physical change**, particles keep their identities and only their arrangement or energy changes. Water boiling, sugar dissolving and a metal bar bending are physical changes. In a **chemical change**, bonds between atoms are broken and new bonds form, so new substances appear. Magnesium burning in air produces a white powder, magnesium oxide, that has none of the properties of the shiny metal. Evidence for a chemical change includes a new color, gas bubbles from a source other than boiling, a precipitate, light, and an energy change. But a good chemist treats each of these as a clue, not a proof. Dissolving some salts in water makes the solution cold, and yet no new substance forms.

At the center of every atom is a nucleus made of protons and neutrons. The number of protons is the **atomic number** and identifies the element. Atoms of one element can have different numbers of neutrons, and these are **isotopes**. We write them as boron-10 and boron-11, or with the mass number as a superscript before the symbol. The two isotopes behave almost identically in chemical reactions, because chemical behavior depends on electrons. They differ in mass.

The mass of a single atom is measured in atomic mass units (amu). The number printed on the periodic table is the **average atomic mass**, a weighted average of the masses of the isotopes as they occur in nature. A mass spectrometer measures the mass and the abundance of each isotope. Boron has two stable isotopes: boron-10 with a mass of 10.013 amu and an abundance of 19.9 percent, and boron-11 with a mass of 11.009 amu and an abundance of 80.1 percent. The average is 0.199 times 10.013 plus 0.801 times 11.009, which is 1.993 plus 8.818, or 10.81 amu. Because most boron atoms are boron-11, the average is much closer to 11 than to 10.

When atoms gain or lose electrons they become **ions**. The number of protons never changes. An iron atom has 26 protons. An Fe3+ ion has lost three electrons, so it has 26 protons and 23 electrons. A nitride ion, N3-, has 7 protons and 10 electrons. The ions of metals are positive because they tend to lose electrons, and the ions of nonmetals are negative because they tend to gain them.
`,
  ],
  cards: [
    ["Isotope", "Atoms of the same element with different numbers of neutrons."],
    ["Average atomic mass", "The weighted average of the masses of an element's naturally occurring isotopes."],
    ["Atomic mass unit (amu)", "A unit of mass equal to one twelfth the mass of a carbon-12 atom."],
    ["Percent abundance", "The percent of the atoms of an element that are a given isotope."],
    ["Mass spectrometer", "An instrument that measures the masses and abundances of particles."],
    ["Mass number", "The number of protons plus the number of neutrons in a nucleus."],
    ["Anion", "A negatively charged ion."],
    ["Cation", "A positively charged ion."],
  ],
  closed: [
    [
      "Boron is 19.9% boron-10 (10.013 amu) and 80.1% boron-11 (11.009 amu). Its average atomic mass is closest to:",
      ["10.0 amu", "10.5 amu", "10.81 amu", "11.0 amu"],
      "C",
    ],
    [
      "How many protons and electrons are in an Fe3+ ion (atomic number 26)?",
      ["26 protons and 23 electrons", "23 protons and 26 electrons", "29 protons and 26 electrons", "26 protons and 29 electrons"],
      "A",
    ],
    [
      "How many neutrons does boron-11 have (atomic number 5)?",
      ["5", "6", "11", "16"],
      "B",
    ],
    [
      "A solution of an ionic compound feels cold as it dissolves. Which is the best interpretation?",
      [
        "It must be a chemical change, because the temperature changed",
        "The temperature change alone does not prove a chemical change",
        "It is a nuclear change",
        "No energy change is involved",
      ],
      "B",
    ],
    [
      "A sample of an element is 75% of an isotope of mass 35 amu and 25% of an isotope of mass 37 amu. The average atomic mass is:",
      ["35.0 amu", "35.5 amu", "36.0 amu", "36.5 amu"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Copper has two stable isotopes: copper-63 (62.93 amu, 69.17 percent) and copper-65 (64.93 amu, 30.83 percent). Calculate the average atomic mass and explain why the answer is nearer to 63 than to 65.",
      scheme: [
        "Multiplies each isotope's mass by its fractional abundance",
        "Calculates 62.93 x 0.6917 = 43.53 and 64.93 x 0.3083 = 20.02",
        "Adds to get an average of 63.55 amu",
        "Explains that the answer is closer to 63 because copper-63 is the more abundant isotope",
      ],
      model:
        "Average atomic mass is the sum of mass times fractional abundance. 62.93 times 0.6917 is 43.53, and 64.93 times 0.3083 is 20.02. The sum is 63.55 amu. The answer is nearer to 63 because copper-63 makes up nearly 70 percent of the atoms, so it has more weight in the average.",
      answers: [
        [
          "full",
          "[[0|I multiplied each mass by its abundance as a decimal.]] [[1|62.93 × 0.6917 = 43.53 and 64.93 × 0.3083 = 20.02.]] [[2|Added together that is 63.55 amu.]] [[3|It is closer to 63 because most of the atoms, about 69%, are copper-63.]]",
          "Full marks. Converting percent to a decimal first is a key step.",
        ],
        [
          "full",
          "[[0|Average = (mass × fraction) summed over the isotopes.]] [[1|(62.93)(0.6917) = 43.53; (64.93)(0.3083) = 20.02.]] [[2|Total = 63.55 amu.]] [[3|Copper-63 is the more abundant isotope so it counts for more in the average.]]",
          "All four marks, in a tidy layout.",
        ],
        [
          "partial",
          "[[0|Multiply the mass by the abundance for each.]] 62.93 × 69.17 = 4353 and 64.93 × 30.83 = 2002, which makes a total of 6355.",
          "You forgot to turn the percentages into decimals. Dividing by 100 gives 43.53 plus 20.02, which is 63.55 amu.",
        ],
        [
          "partial",
          "[[2|The average is 63.55 amu.]] [[3|It is nearer 63 as more of the atoms are copper-63.]]",
          "Your answer and explanation are right. Show the two multiplications that lead to 63.55.",
          true,
        ],
        [
          "weak",
          "(62.93 + 64.93) / 2 = 63.93 amu. You average the two masses.",
          "A simple average treats both isotopes as equally common, which they are not. Weight each mass by its abundance.",
        ],
        [
          "weak",
          "[[0|Mass times abundance.]] I got 62.93 × 30.83 and 64.93 × 69.17 which gives 64.7 amu, close to 65 because 65 is the biggest.",
          "You paired each mass with the wrong abundance. Copper-63 goes with 69.17 percent. Check your pairing.",
        ],
      ],
    },
    {
      prompt:
        "Magnesium ribbon burns in air to give a white powder. A student says this must be a physical change because the magnesium is still there. Evaluate the claim with evidence and with particle-level reasoning.",
      scheme: [
        "Says the claim is incorrect and the change is chemical",
        "Gives observational evidence such as a bright light and a new white powder with different properties",
        "Explains that bonds in the metal and in oxygen are broken and new bonds form in magnesium oxide",
        "Explains that magnesium atoms are still present but in a new substance, so the substance has changed",
      ],
      model:
        "The claim is wrong; this is a chemical change. A bright light was given off and a white powder formed that does not look or behave like the shiny metal. At the particle level the metallic bonds in magnesium and the bonds in oxygen molecules are broken and new ionic bonds form in magnesium oxide. The magnesium atoms are still there, but they are now in a different substance.",
      answers: [
        [
          "full",
          "[[0|The student is wrong, it's a chemical change.]] [[1|There was a bright light and a white powder formed that is not shiny like magnesium.]] [[2|Bonds in magnesium and oxygen break and new bonds form in magnesium oxide.]] [[3|The magnesium atoms are still around but are now part of a new compound, so the substance has changed.]]",
          "Full marks. You answered the student's point that the atoms remain and still showed a new substance.",
        ],
        [
          "full",
          "[[0|Chemical change.]] [[1|Evidence: light given off and a white solid with different properties.]] [[2|The Mg metallic bonds and the O=O bonds are broken, and ionic bonds form between Mg2+ and O2-.]] [[3|Mg atoms are conserved, but the substance is magnesium oxide and not magnesium.]]",
          "All four marks, with the correct ions named.",
        ],
        [
          "partial",
          "[[0|It is a chemical change]] [[1|because of the bright light and the white powder]].",
          "Good evidence. Now answer the student's argument: explain what happens to the bonds and why having the same atoms does not mean the same substance.",
        ],
        [
          "partial",
          "[[2|New bonds form between magnesium and oxygen.]] [[3|The atoms are the same though.]] So it's physical.",
          "The atoms are the same, but new bonds mean a new substance, so the change is chemical. Your conclusion contradicts your own particle reasoning.",
          true,
        ],
        [
          "weak",
          "It's a physical change because the magnesium is still there, just changed a bit by burning.",
          "The point is that a new substance, magnesium oxide, has formed. Think about the properties of the white powder compared with the metal.",
        ],
        [
          "weak",
          "[[1|There was a bright flash.]] A flash always means a chemical change, no matter what else happens.",
          "A flash is a clue, but not proof by itself. Combine it with the new white powder and the change in bonding.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Electron arrangement and periodic trends",
  note: `
## Objectives

Students will be able to:

1. use the periodic table and successive ionization energies to predict electron arrangement and properties;
2. explain trends in atomic radius, ionization energy and electronegativity in terms of nuclear charge, shielding and distance.

## Materials

Data table of successive ionization energies, periodic table templates, magnesium ribbon, zinc and copper strips, 1 M hydrochloric acid in dropper bottles (teacher dispensed), the practical sheet.

## Starter (6 minutes)

Display ionization energies for magnesium: 738, 1451 and 7733 kJ/mol. Ask: "What do these numbers tell you about how many outer electrons magnesium has?" Take answers and note the huge jump.

## Main activity

1. Write electron configurations for elements to sulfur (S is 1s2 2s2 2p6 3s2 3p4) and relate the highest energy level to the period and the outer electrons to the group.
2. Use the successive ionization energies of magnesium to show that two electrons are easy to remove and the third is hard, because it comes from a full inner level.
3. Explain exceptions: the dip in first ionization energy from nitrogen to oxygen, caused by repulsion between paired electrons in one p orbital.
4. Practical: compare the reactivity of magnesium, zinc and copper with dilute acid.

## Checking for understanding

Ask: "Why is the first ionization energy of oxygen lower than that of nitrogen?"

## Practical write-up

Collect with a ranking and an explanation.
`,
  reading: [
    "Evidence for electron shells",
    `
The periodic table is a map of electron arrangement. Electrons occupy energy levels, and the energy levels contain orbitals that hold at most two electrons each. The configuration of sulfur, which has 16 electrons, is 1s2 2s2 2p6 3s2 3p4. The highest energy level occupied, 3, matches sulfur's period, and the 6 electrons in that level match its group, 16 in the table or the group of 6 valence electrons.

How do we know that atoms have shells at all? One piece of evidence is **successive ionization energies**, the energies needed to remove the first, second, third electron and so on. For magnesium they are 738, 1451 and 7733 kJ/mol. The first two are modest, and the third is more than five times the second. That huge jump tells us that after two electrons are gone, the next one has to come from a lower level that is much closer to the nucleus and much more strongly held. Magnesium therefore has two valence electrons, which agrees with its position in group 2, and forms Mg2+.

Periodic trends follow from three ideas: how strongly the nucleus pulls, how far the electron is from the nucleus, and how much the inner electrons shield it. Across a period, the number of protons rises while the electrons are added to the same level, so the **effective nuclear charge** felt by the valence electrons increases. The atomic radius falls, and the ionization energy and electronegativity rise. Down a group, each period adds a level farther from the nucleus and more inner electrons that shield the valence electrons, so the radius increases and the ionization energy decreases.

There are exceptions that confirm the model. Oxygen's first ionization energy (1314 kJ/mol) is lower than nitrogen's (1402), even though oxygen has more protons. Nitrogen's three p electrons are in three separate orbitals. In oxygen, two of the four p electrons share an orbital, and the repulsion between them makes one easier to remove.

The same ideas predict chemical behavior. Metals with low ionization energies lose electrons easily and react readily. In dilute acid, magnesium reacts vigorously and zinc more slowly, releasing hydrogen gas. Copper does not react. The order of reactivity is related to how easily each metal loses electrons to form ions in solution.
`,
  ],
  cards: [
    ["Electron configuration", "The arrangement of electrons in the energy levels and orbitals of an atom."],
    ["Orbital", "A region of space that can hold up to two electrons."],
    ["Successive ionization energy", "The energy needed to remove each further electron from an atom."],
    ["Effective nuclear charge", "The net pull of the nucleus felt by a valence electron after shielding."],
    ["Shielding", "The reduction in the pull of the nucleus on outer electrons due to inner electrons."],
    ["Valence electron", "An electron in the outermost energy level."],
    ["Reactivity", "How readily a substance undergoes chemical reaction."],
    ["Core electrons", "Electrons in the inner energy levels."],
  ],
  closed: [
    [
      "What is the electron configuration of sulfur?",
      ["1s2 2s2 2p6 3s2 3p4", "1s2 2s2 2p6 3s2 3p6", "1s2 2s2 2p4", "1s2 2s2 2p6 3s4"],
      "A",
    ],
    [
      "Magnesium's ionization energies are 738, 1451 and 7733 kJ/mol. This suggests magnesium has:",
      ["1 valence electron", "2 valence electrons", "3 valence electrons", "8 valence electrons"],
      "B",
    ],
    [
      "Why is the first ionization energy of oxygen lower than that of nitrogen?",
      [
        "Oxygen has fewer protons",
        "Repulsion between paired p electrons makes one easier to remove",
        "Oxygen has a smaller radius",
        "Nitrogen has more energy levels",
      ],
      "B",
    ],
    [
      "Moving down group 1, the first ionization energy:",
      ["Increases", "Decreases", "Stays the same", "Increases and then decreases"],
      "B",
    ],
    [
      "Which of these is the best reason that atomic radius decreases across a period?",
      [
        "Electrons are removed",
        "The effective nuclear charge increases while the electrons are added to the same level",
        "New energy levels are added",
        "The neutrons pull electrons in",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "The first four ionization energies of an element (in kJ/mol) are 578, 1817, 2745 and 11,577. State how many valence electrons it has, identify its group, and explain how you know.",
      scheme: [
        "States the element has 3 valence electrons",
        "Identifies the large jump between the third and fourth ionization energies",
        "Explains the jump as the fourth electron coming from an inner level closer to the nucleus",
        "Identifies the element as being in group 13 (such as aluminum)",
      ],
      model:
        "The element has 3 valence electrons. The ionization energies rise gradually from 578 to 2745 but then jump to 11,577 for the fourth. This is because the fourth electron has to come from a full inner level that is closer to the nucleus and much more strongly held. An element with three valence electrons is in group 13, such as aluminum.",
      answers: [
        [
          "full",
          "[[0|It has 3 valence electrons.]] [[1|The big jump comes between the third (2745) and fourth (11,577) energies.]] [[2|The fourth electron is in an inner level, closer to the nucleus, so it is held much more strongly.]] [[3|So it is in group 13, probably aluminum.]]",
          "Full marks. The jump is the evidence, and you explained why it occurs.",
        ],
        [
          "full",
          "[[1|The energies climb slowly and then jump from 2745 to 11,577.]] [[0|That means three electrons are easy to remove, so three valence electrons.]] [[2|After the valence level is empty the next electron comes from the core, closer to the nucleus.]] [[3|Three valence electrons puts it in group 13.]]",
          "All four marks. Starting from the data is a strong approach.",
        ],
        [
          "partial",
          "[[1|There's a big jump after the third energy.]] [[0|So it has 3 valence electrons.]] It is in group 3.",
          "Group 3 is a different part of the table. Three valence electrons means group 13, which has the main-group elements with three outer electrons.",
        ],
        [
          "partial",
          "[[3|It's in group 13.]] [[0|It has 3 valence electrons.]]",
          "These are right, but you need to say how you know. Point to the jump in the data and explain it.",
          true,
        ],
        [
          "weak",
          "It has 4 valence electrons because there are four numbers in the list.",
          "The number of values given is not the number of valence electrons. Look for where the energy jumps.",
        ],
        [
          "weak",
          "[[1|The 11,577 is much bigger.]] That's because the atom is running out of energy.",
          "Atoms do not run out of energy. The value jumps because the fourth electron is in an inner level held closely by the nucleus.",
        ],
      ],
    },
    {
      prompt:
        "Explain why the first ionization energy generally increases from sodium to argon, and why the value for sulfur is slightly lower than for phosphorus.",
      scheme: [
        "States that the effective nuclear charge increases across the period",
        "States that electrons are added to the same energy level with similar shielding, so the valence electrons are pulled in more tightly",
        "States that phosphorus has half-filled p orbitals, each with one electron",
        "States that in sulfur two p electrons share an orbital and repel, so one is removed more easily",
      ],
      model:
        "Across the period the effective nuclear charge increases while the electrons are added to the same energy level with similar shielding, so valence electrons are held more tightly and the ionization energy rises. Phosphorus has three p electrons in three separate orbitals. Sulfur has two p electrons paired in one orbital, and their repulsion makes one easier to remove, so sulfur's value is slightly lower.",
      answers: [
        [
          "full",
          "[[0|Going across, the nucleus gets more protons so the effective nuclear charge goes up.]] [[1|The electrons go into the same shell with about the same shielding, so the outer electrons are held tighter.]] [[2|Phosphorus has three p electrons, each in its own orbital.]] [[3|In sulfur two of them are paired in one orbital and repel each other, so one comes off more easily.]]",
          "Full marks. You explained the general trend and the exception with the same model.",
        ],
        [
          "full",
          "[[0|Effective nuclear charge increases from Na to Ar.]] [[1|The valence electrons are in the same level, so shielding barely changes and the pull is stronger.]] [[2|P has a half-filled p subshell, one electron per orbital.]] [[3|S has a pair of electrons in one p orbital, and the repulsion lowers the energy needed to remove one.]]",
          "All four marks, and you correctly named the half-filled subshell.",
        ],
        [
          "partial",
          "[[0|More protons across the period so a greater pull.]] [[1|The electrons are in the same shell.]] Sulfur is lower because it is bigger than phosphorus.",
          "Sulfur is actually slightly smaller than phosphorus. The dip is due to the repulsion between paired p electrons.",
        ],
        [
          "partial",
          "[[2|Phosphorus has three unpaired p electrons.]] [[3|Sulfur has a pair that repel.]]",
          "Good explanation of the exception. Add the general reason that ionization energy increases across the period.",
          true,
        ],
        [
          "weak",
          "It increases because the atoms get bigger across the period and bigger atoms hold electrons tighter.",
          "The atoms get smaller across a period. The pull of the nucleus is stronger, which is why the electrons are held more tightly.",
        ],
        [
          "weak",
          "[[0|The nucleus gets more protons.]] Sulfur is lower because it is a different group so it doesn't follow the trend.",
          "The dip is not random. It is caused by paired electrons repelling in a p orbital. Review the nitrogen and oxygen example.",
        ],
      ],
    },
  ],
  practical: {
    title: "Ranking the reactivity of three metals",
    instructions:
      "Place a 1 cm strip of magnesium, zinc and copper in separate test tubes with 3 mL of 1 M hydrochloric acid. Observe the rate of bubbling over three minutes and count the bubbles in 30 seconds at the one-minute mark. Rank the metals and relate your ranking to how easily each metal loses electrons.",
    steps: [
      ["Put on goggles and gloves. Label three test tubes Mg, Zn and Cu."],
      ["Add 3 mL of 1 M hydrochloric acid to each tube using a graduated dropper.", "Acid can burn skin and damage clothing. Rinse spills with plenty of water."],
      ["Drop the metal strips in at the same time and start the timer."],
      ["At one minute, count the bubbles rising from each strip for 30 seconds, and record other observations such as heat."],
      ["Record observations for each metal after three minutes."],
      ["Rank the metals from most to least reactive and explain the order in terms of the ease of forming positive ions."],
    ],
    rubric: [
      ["Method and safety: same conditions for all three metals, safe handling", 4],
      ["Results: quantitative bubble counts and clear observations", 4],
      ["Conclusion: ranking supported by data and linked to electron loss", 4],
    ],
    writeUps: [
      [
        "full",
        "In the same 3 mL of 1 M HCl, magnesium produced about 85 bubbles in 30 seconds and the tube became warm, zinc produced 12 bubbles and copper produced none after three minutes. The ranking is Mg, Zn, Cu. Magnesium loses its two valence electrons most easily to form Mg2+, and the hydrogen ions in the acid take those electrons to form hydrogen gas. Copper does not lose electrons easily to the acid, so no reaction is visible.",
        [4, 4, 4],
        "An excellent report: controlled conditions, numbers for the observations, and a clear tie to electron loss.",
      ],
      [
        "full",
        "We kept the acid volume and the strip size the same. At one minute the counts per 30 seconds were Mg 90, Zn 10, Cu 0. After three minutes magnesium was nearly gone, zinc was bubbling slowly and copper was unchanged. So magnesium is most reactive, then zinc, then copper. The gas is hydrogen, formed when the metal gives electrons to H+. The more easily a metal gives up electrons, the faster it reacts.",
        [4, 4, 3],
        "Very good. In the conclusion, connect the trend to ionization energy or position in the table to get full marks.",
      ],
      [
        "partial",
        "Magnesium bubbled the most, zinc bubbled a little and copper did nothing. So the order is magnesium, zinc, copper. I think magnesium is more reactive because it is a lighter metal and so the acid gets to it faster than the others.",
        [3, 2, 1],
        "Your ranking is right. The explanation is about electrons, not mass: magnesium loses electrons to form ions more easily. Count bubbles to make the results quantitative.",
      ],
      [
        "partial",
        "We counted bubbles at one minute. Magnesium had 85, zinc had 12 and copper had 0. The ranking is Mg, Zn, Cu. I do not remember if we put the strips in at the same time but I think they were about the same, and I did not write anything about safety.",
        [1, 4, 2],
        "Your data is clear. A conclusion needs a reason, and the method should record the safety steps and how you made the test fair.",
      ],
      [
        "weak",
        "We put the metals in acid and some of them made bubbles. The one that was silver made the most bubbles. The one that was orange made none. I think the acid ate the silver metal because acids are strong.",
        [1, 1, 0],
        "Name the metals and count the bubbles. The bubbles are hydrogen gas formed as the metal gives electrons to the acid, not the metal being eaten.",
      ],
      [
        "weak",
        "Copper was the most reactive because it is the most popular metal and it is used in pipes and wires. It did not bubble because it was reacting so much that all of the gas was used up immediately in the tube.",
        [0, 1, 0],
        "Copper showed no reaction at all. Being useful does not make a metal reactive. Compare the bubble counts, and rank by how readily each metal loses electrons.",
      ],
    ],
  },
};

const w4: WeekInput = {
  topic: "Bonding models, electronegativity and lattice energy",
  note: `
## Objectives

Students will be able to:

1. explain why a reaction proceeds from the arrangement of valence electrons and the energy of the products;
2. classify bonds using electronegativity differences, predict properties, and write formulas and names for ionic and covalent compounds, including polyatomic ions and transition metals.

## Materials

Electronegativity table, ion cards, a data table of melting points and lattice energies, the worksheet.

## Starter (6 minutes)

Write on the board: NaCl melts at 801 degrees Celsius, MgO at 2852. Ask: "Both are ionic. Why is MgO so much higher?" Gather ideas about charge and size.

## Main activity

1. Bond classification by electronegativity difference: below about 0.4 is nonpolar covalent, 0.4 to 1.7 is polar covalent, above 1.7 is mostly ionic. Calculate for Na-Cl (2.23), O-H (1.24) and C-H (0.35).
2. Lattice energy: introduce Coulomb's law qualitatively. Bigger charges and smaller ions give a stronger attraction, so MgO is much more strongly bonded than NaCl.
3. Naming with transition metals and polyatomic ions: iron(III) sulfate is Fe2(SO4)3 and ammonium phosphate is (NH4)3PO4.

## Checking for understanding

Whiteboards: formula for copper(II) nitrate. Look for Cu(NO3)2.

## Worksheet

Classification, formulas, names and one lattice energy explanation.
`,
  reading: [
    "A spectrum of bonding",
    `
Bonds are not sharply divided into ionic and covalent. They lie on a spectrum that depends on how unequally the atoms share the electrons. The measure is the difference in **electronegativity**, which is the pull an atom has on the electrons in a bond. For sodium chloride, the electronegativity of chlorine is 3.16 and that of sodium is 0.93, a difference of 2.23. The electrons are so strongly pulled to chlorine that they are essentially transferred, and the bond is ionic. For the O-H bond in water, 3.44 minus 2.20 is 1.24: the electrons are shared, but unequally, and the bond is polar covalent. For C-H, 2.55 minus 2.20 is 0.35, so the electrons are shared almost equally and the bond is nonpolar. As a rough guide, a difference below 0.4 is nonpolar covalent, from 0.4 to 1.7 is polar covalent, and above 1.7 is mostly ionic.

The properties of ionic compounds come from the strength of the attraction between the ions in the crystal. The energy needed to separate one mole of an ionic solid into gaseous ions is the **lattice energy**. By Coulomb's law, the force between two charges grows with the size of the charges and shrinks with the distance between them. Sodium chloride has ions of charge 1+ and 1-, while magnesium oxide has 2+ and 2-, which are also smaller, so their centers are closer together. The attraction in MgO is therefore much stronger. This is why MgO melts at 2852 degrees Celsius while NaCl melts at 801, and why magnesium oxide is used to line furnaces.

Many transition metals form more than one ion, so the charge is shown in the name with a Roman numeral. Iron(II) is Fe2+ and iron(III) is Fe3+. To write the formula of iron(III) sulfate, combine Fe3+ with the sulfate ion SO4 2-. The least common multiple of 3 and 2 is 6, so you need two Fe3+ and three SO4 2-: Fe2(SO4)3. Parentheses are placed around a polyatomic ion when the subscript is more than one. Ammonium phosphate combines NH4+ and PO4 3-, so three ammonium ions are needed: (NH4)3PO4.

Why does a reaction go the way it does? Atoms react to reach a lower-energy arrangement of valence electrons. When sodium meets chlorine, transferring an electron produces ions that attract strongly, and the energy released as the lattice forms more than pays for the energy to ionize sodium. The product is more stable than the separate atoms, so the reaction proceeds.
`,
  ],
  cards: [
    ["Electronegativity difference", "The difference between two atoms' electronegativities, used to predict the bond type."],
    ["Polar covalent bond", "A covalent bond in which electrons are shared unequally."],
    ["Lattice energy", "The energy needed to separate one mole of an ionic solid into gaseous ions."],
    ["Coulomb's law", "The force between charges increases with charge and decreases with distance."],
    ["Roman numeral", "Shows the charge on a metal ion that can have more than one charge, as in iron(III)."],
    ["Polyatomic ion", "A charged group of atoms, such as sulfate or ammonium."],
    ["Nonpolar covalent bond", "A covalent bond in which electrons are shared nearly equally."],
    ["Stability", "A lower-energy arrangement that tends to be favored in a reaction."],
  ],
  closed: [
    [
      "The electronegativities of Cl and Na are 3.16 and 0.93. The bond is best described as:",
      ["Nonpolar covalent", "Polar covalent", "Mostly ionic", "Metallic"],
      "C",
    ],
    [
      "Which compound has the highest lattice energy?",
      ["NaCl", "KBr", "MgO", "LiF"],
      "C",
    ],
    [
      "What is the formula of iron(III) sulfate?",
      ["FeSO4", "Fe3SO4", "Fe2(SO4)3", "Fe3(SO4)2"],
      "C",
    ],
    [
      "What is the formula of ammonium phosphate (NH4+ and PO4 3-)?",
      ["NH4PO4", "(NH4)3PO4", "NH4(PO4)3", "(NH4)2PO4"],
      "B",
    ],
    [
      "The electronegativity values of C and H are 2.55 and 2.20. The C-H bond is:",
      ["Strongly ionic", "Polar covalent", "Nonpolar covalent", "Metallic"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Magnesium oxide melts at 2852 degrees Celsius but sodium chloride melts at 801 degrees Celsius. Explain the difference using ion charge and size.",
      scheme: [
        "States that both are held together by attractions between oppositely charged ions in a lattice",
        "States that Mg2+ and O2- have larger charges than Na+ and Cl-",
        "States that the ions in MgO are also smaller, so the distance between centers is shorter",
        "Concludes that the force and lattice energy are greater in MgO, so more energy is needed to melt it",
      ],
      model:
        "Both are ionic solids held together by electrostatic attraction between oppositely charged ions. MgO has 2+ and 2- ions, double the charges of the 1+ and 1- ions in NaCl, and its ions are smaller so they sit closer together. By Coulomb's law both effects make the attraction stronger, so MgO has a much greater lattice energy and needs much more energy to melt.",
      answers: [
        [
          "full",
          "[[0|Both are lattices of oppositely charged ions held by electrostatic attraction.]] [[1|Mg2+ and O2- have twice the charge of Na+ and Cl-.]] [[2|The ions in MgO are smaller, so they are closer together.]] [[3|By Coulomb's law bigger charges and shorter distance mean a stronger force, so MgO needs far more energy to melt.]]",
          "Full marks. You used both charge and size, which is what Coulomb's law asks for.",
        ],
        [
          "full",
          "[[0|In both the ions attract each other in a crystal.]] [[1|The 2+/2- charges in MgO give a much stronger pull than 1+/1-.]] [[2|Magnesium and oxide ions are also smaller, which reduces the distance between them.]] [[3|That makes the lattice energy higher so the melting point is higher.]]",
          "All four marks. Linking lattice energy to the melting point is the key.",
        ],
        [
          "partial",
          "[[1|MgO has bigger charges, 2+ and 2-.]] [[3|So it takes more energy to melt.]]",
          "Good. Also describe the lattice of ions and the effect of ion size on the distance between charges.",
        ],
        [
          "partial",
          "[[0|Both are ionic.]] [[2|The ions in MgO are smaller.]] Smaller ions mean the bond is covalent so it needs more energy.",
          "Smaller ions keep the bond ionic but make it stronger, because the charges are closer. Add the charge effect too.",
          true,
        ],
        [
          "weak",
          "Magnesium is a metal that is much stronger than sodium so it melts at a higher temperature.",
          "The strength of the metal itself is not the reason. The melting point depends on the attraction between the ions in the compound.",
        ],
        [
          "weak",
          "[[0|Both are ionic compounds.]] MgO is heavier, and heavy things need more heat to melt.",
          "Mass alone does not decide the melting point. Compare the ion charges and sizes, which control the strength of the attraction.",
        ],
      ],
    },
    {
      prompt:
        "Classify the bonds in Na-Cl, O-H and C-H using electronegativity differences (Na 0.93, Cl 3.16, O 3.44, H 2.20, C 2.55). Write the formula for iron(III) sulfate and show how the charges balance.",
      scheme: [
        "Classifies Na-Cl as mostly ionic with a difference of 2.23",
        "Classifies O-H as polar covalent (1.24) and C-H as nonpolar covalent (0.35)",
        "Writes the formula Fe2(SO4)3",
        "Shows that two 3+ ions give +6 and three 2- ions give -6",
      ],
      model:
        "Na-Cl has a difference of 2.23, so it is mostly ionic. O-H has 1.24, polar covalent, and C-H has 0.35, nonpolar covalent. Iron(III) sulfate combines Fe3+ and SO4 2-; two Fe3+ give +6 and three SO4 2- give -6, so the formula is Fe2(SO4)3.",
      answers: [
        [
          "full",
          "[[0|Na-Cl: 3.16 - 0.93 = 2.23, mostly ionic.]] [[1|O-H: 3.44 - 2.20 = 1.24, polar covalent; C-H: 2.55 - 2.20 = 0.35, nonpolar covalent.]] [[2|Iron(III) sulfate is Fe2(SO4)3.]] [[3|2 × (+3) = +6 and 3 × (-2) = -6, so it is neutral.]]",
          "Full marks. All three differences are right, with the formula and the balance of charges.",
        ],
        [
          "full",
          "[[0|The difference for NaCl is 2.23 so it's ionic.]] [[1|O–H at 1.24 is polar covalent and C–H at 0.35 is nonpolar covalent.]] [[2|Fe³⁺ with SO₄²⁻ gives Fe2(SO4)3.]] [[3|The charges: 6+ from two iron ions and 6- from three sulfates.]]",
          "All four marks, with a good use of the electronegativity ranges.",
        ],
        [
          "partial",
          "[[0|Na-Cl is ionic (2.23).]] [[1|O-H is polar covalent and C-H is nonpolar covalent.]] Iron(III) sulfate is FeSO4.",
          "FeSO4 would be iron(II) sulfate, with Fe2+ and SO4 2-. For iron(III) you need two Fe3+ and three sulfate ions.",
        ],
        [
          "partial",
          "[[2|Fe2(SO4)3]] [[3|because 6+ and 6- cancel.]] The bonds are all covalent because they are between atoms.",
          "Your formula is right. Use the electronegativity differences to classify the bonds: Na-Cl is ionic, not covalent.",
          true,
        ],
        [
          "weak",
          "Na-Cl is covalent and O-H is ionic because oxygen is in the ionic group. The formula is Fe3S2O.",
          "Compute the electronegativity differences to classify the bonds. The formula must use the sulfate ion, SO4 2-, with the charges balanced.",
        ],
        [
          "weak",
          "[[0|NaCl is ionic.]] The others have no difference because hydrogen is the same in each. Iron(III) sulfate is Fe(SO4).",
          "Hydrogen is paired with different atoms, so the differences are different. Find the difference for each pair. And FeSO4 does not balance 3+ with 2-.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Lewis structures, formal charge, shape and intermolecular forces",
  note: `
## Objectives

Students will be able to:

1. plan an investigation of how forces between particles explain properties of substances;
2. draw Lewis structures with formal charge, predict shape and polarity, and explain bond angles;
3. use conservation of mass to count atoms in balanced reactions.

## Materials

Molecular model kits, boiling point data for hydrides of groups 14 to 17, graph paper, the quiz.

## Starter (6 minutes)

Plot the boiling points of CH4, NH3, H2O and HF on the board with those of SiH4, PH3, H2S and HCl. Ask: "Why do NH3, H2O and HF stand out?"

## Main activity

1. Draw Lewis structures for H2O, NH3, CO2, SO2 and the ammonium ion, using formal charge to choose between possible structures.
2. Build models and use VSEPR to predict shape and bond angles: water 104.5 degrees, ammonia 107 degrees, methane 109.5 degrees. Explain the angles by the greater repulsion of lone pairs.
3. Rank the strength of the dispersion, dipole-dipole and hydrogen bond attractions and apply them to boiling points. Plan an investigation to compare the surface tension of water, ethanol and a soap solution.

## Checking for understanding

Ask: "Why is the H-O-H angle smaller than the tetrahedral angle?" Look for lone-pair repulsion.

## Quiz

Five questions on structure, shape and forces.
`,
  reading: [
    "Structure explains behavior",
    `
Drawing a good Lewis structure is a way of keeping track of valence electrons. Count the total valence electrons, connect the atoms with single bonds, complete the octets of the outer atoms, and put any remaining electrons on the central atom. If the central atom lacks an octet, form double or triple bonds. When more than one structure is possible, use **formal charge** to choose. The formal charge on an atom is its number of valence electrons, minus the nonbonding electrons, minus the number of bonds. The best structure has formal charges as close to zero as possible. For carbon dioxide, two double bonds give every atom a formal charge of zero, which beats a structure with one single and one triple bond.

The electron pairs around a central atom, both bonding pairs and lone pairs, repel each other and spread out as far as they can, which is the basis of VSEPR. Four pairs give a tetrahedral arrangement with angles of 109.5 degrees. In methane all four are bonding pairs and the angle is exactly this. In ammonia, one pair is a lone pair, and the H-N-H angle is 107 degrees. In water, two lone pairs push the H-O-H angle down to 104.5 degrees. A lone pair is held only by one nucleus, so it spreads out and repels more strongly than a bonding pair.

The polarity of a molecule combines bond polarity and shape. Water and ammonia are polar. Carbon dioxide and methane are nonpolar because their polar bonds are arranged symmetrically.

Between molecules, forces determine the physical properties. **Dispersion forces** result from momentary shifts in electron clouds. They act between all particles and grow with the number of electrons, which is why the boiling points of CH4, SiH4 and GeH4 rise. **Dipole-dipole forces** act between permanent dipoles. **Hydrogen bonds** are exceptionally strong dipole-dipole attractions that occur when a hydrogen bonded to N, O or F is attracted to a lone pair on another N, O or F atom. Water, with two hydrogens and two lone pairs, forms a network of hydrogen bonds. This is why water boils at 100 degrees Celsius while H2S, a larger molecule, boils at minus 60. Hydrogen bonds also explain why ice floats and why water has high surface tension.
`,
  ],
  cards: [
    ["Formal charge", "Valence electrons minus nonbonding electrons minus the number of bonds."],
    ["Lone pair", "A pair of valence electrons not shared in a bond."],
    ["Bond angle", "The angle between two bonds at a central atom."],
    ["Dispersion force", "A temporary attraction caused by shifts in electron clouds, present in all molecules."],
    ["Dipole-dipole force", "An attraction between the oppositely charged ends of polar molecules."],
    ["Hydrogen bond", "A strong attraction involving H bonded to N, O or F and a lone pair on another such atom."],
    ["Surface tension", "The tendency of a liquid's surface to resist stretching, due to attractions between molecules."],
    ["Symmetry", "An arrangement that lets bond polarities cancel, giving a nonpolar molecule."],
  ],
  closed: [
    [
      "What is the approximate H-O-H bond angle in water?",
      ["90 degrees", "104.5 degrees", "109.5 degrees", "180 degrees"],
      "B",
    ],
    [
      "Why is the H-N-H angle in ammonia (107 degrees) smaller than in methane (109.5 degrees)?",
      [
        "Ammonia has no lone pair",
        "The lone pair repels the bonding pairs more strongly",
        "Nitrogen has more protons",
        "Ammonia is nonpolar",
      ],
      "B",
    ],
    [
      "The formal charge of the central oxygen in a water molecule (6 valence electrons, 4 nonbonding electrons, 2 bonds) is:",
      ["-2", "-1", "0", "+1"],
      "C",
    ],
    [
      "Why does H2O boil at a much higher temperature than H2S?",
      [
        "H2O is heavier",
        "H2O forms hydrogen bonds",
        "H2O has weaker dispersion forces",
        "H2S is ionic",
      ],
      "B",
    ],
    [
      "Which molecule is nonpolar despite having polar bonds?",
      ["H2O", "NH3", "CO2", "HF"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Draw or describe the Lewis structure of NH3, state its shape and approximate bond angle, and explain why the bond angle is less than the tetrahedral angle.",
      scheme: [
        "Describes nitrogen bonded to three hydrogens with one lone pair (8 valence electrons in total)",
        "States the shape as trigonal pyramidal",
        "States the bond angle as about 107 degrees",
        "Explains that the lone pair repels bonding pairs more strongly, compressing the angle below 109.5 degrees",
      ],
      model:
        "Ammonia has 8 valence electrons: nitrogen bonded to three hydrogens with one lone pair on nitrogen. The four electron pairs are arranged tetrahedrally, but with one lone pair the shape of the atoms is trigonal pyramidal. The bond angle is about 107 degrees, less than 109.5, because the lone pair is held by one nucleus and repels the bonding pairs more strongly.",
      answers: [
        [
          "full",
          "[[0|Nitrogen is in the middle with three single bonds to hydrogen and one lone pair, 8 electrons total.]] [[1|The shape is trigonal pyramidal.]] [[2|The H-N-H angle is about 107°.]] [[3|The lone pair takes up more space than a bonding pair and pushes the bonds closer together.]]",
          "Full marks. You explained the angle in terms of the lone pair, not just stating it.",
        ],
        [
          "full",
          "[[0|N has 5 valence electrons and each H gives 1, so 8 electrons: three N-H bonds and one lone pair on N.]] [[1|Four electron pairs but only three atoms attached, so trigonal pyramidal.]] [[2|Angle is 107 degrees.]] [[3|Lone pair–bond pair repulsion is stronger than bond pair–bond pair, so the angle is squeezed below 109.5.]]",
          "All four marks, and you counted the electrons.",
        ],
        [
          "partial",
          "[[0|Nitrogen with three hydrogens and a lone pair.]] [[1|The shape is trigonal pyramidal.]] The angle is 120 degrees.",
          "The angle is not 120 degrees. With four electron pairs it is based on the tetrahedral angle, reduced to about 107 degrees by the lone pair.",
        ],
        [
          "partial",
          "[[2|107 degrees.]] [[3|The lone pair repels more.]]",
          "Both are right. Describe the structure, with the three bonds and a lone pair, and name the shape.",
          true,
        ],
        [
          "weak",
          "Ammonia is bent like water, with angle 90 degrees, because nitrogen is smaller than carbon.",
          "Ammonia has three hydrogens attached, so it is trigonal pyramidal. Count the electron pairs around the nitrogen.",
        ],
        [
          "weak",
          "[[1|It is trigonal pyramidal.]] The angle is less than 109.5 because the hydrogens are small and are pulled together.",
          "The shape is right. The angle is smaller because the lone pair repels the bonding pairs more strongly, not because the hydrogens are small.",
        ],
      ],
    },
    {
      prompt:
        "The boiling points of CH4, NH3, H2O and HF are -162, -33, 100 and 20 degrees Celsius. Explain why NH3, H2O and HF have much higher boiling points than CH4, and why water's is the highest.",
      scheme: [
        "Says CH4 is nonpolar with only weak dispersion forces",
        "Says NH3, H2O and HF can form hydrogen bonds, which are much stronger",
        "Says water can form more hydrogen bonds per molecule, with two H and two lone pairs",
        "Concludes that more extensive hydrogen bonding means more energy to separate molecules, giving water the highest boiling point",
      ],
      model:
        "Methane is nonpolar and has only weak dispersion forces, so it boils at a very low temperature. NH3, H2O and HF all have a hydrogen bonded to N, O or F and so form hydrogen bonds, which are much stronger. Water has two hydrogens and two lone pairs, so each molecule can make up to four hydrogen bonds, more than NH3 or HF, and it takes the most energy to separate the molecules.",
      answers: [
        [
          "full",
          "[[0|CH4 is nonpolar so it only has weak dispersion forces.]] [[1|NH3, H2O and HF have hydrogen bonds, which are a lot stronger.]] [[2|Water has two H and two lone pairs so each molecule can form up to four hydrogen bonds, more than the others.]] [[3|More hydrogen bonds means more energy to separate the molecules, so water's boiling point is the highest.]]",
          "Full marks. The count of hydrogen bonds per molecule is the key to ranking water above HF and NH3.",
        ],
        [
          "full",
          "[[0|Methane has only dispersion forces and those are weak for a small molecule.]] [[1|The other three have H bonded to N, O or F, so they form hydrogen bonds.]] [[2|Water can make about four H-bonds per molecule while HF and NH3 can make fewer.]] [[3|So it takes more energy to pull water molecules apart and it boils highest.]]",
          "All four marks, with a clear comparison.",
        ],
        [
          "partial",
          "[[1|NH3, H2O and HF have hydrogen bonds.]] [[3|Water has the most so it is the highest.]]",
          "Say why methane is low, and why water has the most hydrogen bonds per molecule: two hydrogens and two lone pairs.",
        ],
        [
          "partial",
          "[[0|Methane is nonpolar with weak dispersion forces.]] The others have stronger covalent bonds inside the molecule, so they boil at a higher temperature.",
          "Boiling does not break the covalent bonds inside the molecule. It overcomes the forces between molecules, mainly hydrogen bonds.",
          true,
        ],
        [
          "weak",
          "The water boils the highest because water is heavier than methane and the others, and heavy things need more heat.",
          "Methane, ammonia and water have similar masses. The difference is in the forces between the molecules, mainly hydrogen bonding.",
        ],
        [
          "weak",
          "[[0|CH4 has weak forces.]] Hydrogen bonds are bonds inside the molecule between the hydrogen and the oxygen.",
          "A hydrogen bond is between molecules, from the H of one molecule to a lone pair on another. The bond between H and O in a molecule is covalent.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Balancing, the mole, percent composition and empirical formulas",
  note: `
## Objectives

Students will be able to:

1. balance equations (including combustion of larger hydrocarbons) and classify reactions;
2. convert among moles, mass and particles, and use percent composition to find an empirical formula.

## Materials

Calculators, periodic tables, samples of calcium hydroxide and iron(III) oxide, a table of percent composition data, the problem set.

## Starter (6 minutes)

Pose: "A bag of Ohio State pennants has 12 blue and 6 scarlet. What is the simplest ratio? How does that relate to the formula of glucose, C6H12O6?" Link to the idea of a simplest ratio.

## Main activity

1. Balance harder equations: 2C4H10 + 13O2 gives 8CO2 + 10H2O, and 2Al + Fe2O3 gives Al2O3 + 2Fe. Use the fractional method then clear fractions.
2. Moles, mass and particles: for Ca(OH)2 (74.10 g/mol) show that 74.1 g is 1.00 mol, or 6.02 x 10^23 formula units, containing 1.20 x 10^24 hydrogen atoms.
3. Percent composition of Fe2O3 (69.94 percent iron) and finding an empirical formula from 40.0 percent C, 6.7 percent H and 53.3 percent O.

## Checking for understanding

Ask: "Why is the empirical formula CH2O for glucose and for formaldehyde, but their molecular formulas differ?"

## Problem set

Balancing, mole conversions and an empirical formula problem.
`,
  reading: [
    "Counting atoms and finding formulas",
    `
Balancing a larger equation is easier with a method. Take the combustion of butane, C4H10 + O2 gives CO2 + H2O. Start with the elements that appear in just one reactant and one product, carbon and hydrogen: four carbons need 4 CO2 and ten hydrogens need 5 H2O. Now count the oxygen on the right: 8 plus 5, which is 13 oxygen atoms, so the left needs 6.5 O2. A fraction is not allowed, so double everything: 2C4H10 + 13O2 gives 8CO2 + 10H2O. Always check the atom counts at the end: 8 C, 20 H and 26 O on each side. Reactions of this type, with a metal oxide and a more reactive metal, such as 2Al + Fe2O3 gives Al2O3 + 2Fe, are single replacement reactions, and this one releases so much heat that the iron comes out molten.

The **mole** connects counts to masses. For calcium hydroxide, Ca(OH)2, the molar mass is 40.08 plus 2 times (16.00 plus 1.008), which is 74.10 g/mol. A sample with a mass of 74.1 g is 1.00 mol and contains 6.02 times 10 to the power of 23 formula units. Each formula unit has two hydrogen atoms, so there are 1.20 times 10 to the power of 24 hydrogen atoms. Keep track of what you are counting: formula units, molecules, atoms or ions.

The **percent composition** of a compound is the mass of each element as a percentage of the molar mass. In Fe2O3, the molar mass is 2(55.85) plus 3(16.00), which is 159.7 g/mol. The iron makes up 111.7 divided by 159.7, which is 69.94 percent. This tells a mining company how much iron they can get from a tonne of ore.

Percent composition also allows you to work backward to a formula. Suppose an analysis gives 40.0 percent carbon, 6.7 percent hydrogen and 53.3 percent oxygen. Assume 100 g of sample so the percentages become grams, and convert to moles: 40.0 divided by 12.01 is 3.33 mol of C, 6.7 divided by 1.008 is 6.6 mol of H, and 53.3 divided by 16.00 is 3.33 mol of O. Divide by the smallest, 3.33, to get C 1, H 2, O 1. The **empirical formula** is CH2O, the simplest whole-number ratio. To get the **molecular formula**, you need the molar mass: if it is 180 g/mol, then 180 divided by 30.03 is 6, so the molecular formula is C6H12O6.
`,
  ],
  cards: [
    ["Percent composition", "The mass of each element in a compound as a percentage of the molar mass."],
    ["Empirical formula", "The simplest whole-number ratio of atoms in a compound."],
    ["Molecular formula", "The actual number of atoms of each element in a molecule."],
    ["Formula unit", "The simplest ratio of ions in an ionic compound."],
    ["Single replacement", "A reaction in which one element takes the place of another in a compound."],
    ["Avogadro's number", "6.02 x 10^23, the number of particles in a mole."],
    ["Molar mass", "The mass in grams of one mole of a substance."],
    ["Combustion", "A reaction of a substance with oxygen that releases energy."],
  ],
  closed: [
    [
      "What coefficient goes in front of O2 when C4H10 + O2 gives CO2 + H2O is balanced with the smallest whole numbers (C4H10 has coefficient 2)?",
      ["6.5", "8", "13", "26"],
      "C",
    ],
    [
      "What is the molar mass of Ca(OH)2 (Ca 40.08, O 16.00, H 1.008)?",
      ["57.09 g/mol", "74.10 g/mol", "114.2 g/mol", "58.09 g/mol"],
      "B",
    ],
    [
      "What is the percent by mass of iron in Fe2O3 (molar mass 159.7 g/mol, Fe 55.85)?",
      ["30.06%", "34.97%", "69.94%", "111.7%"],
      "C",
    ],
    [
      "A compound is 40.0% C, 6.7% H and 53.3% O by mass. Its empirical formula is:",
      ["CHO", "CH2O", "C2H4O", "C3H6O3"],
      "B",
    ],
    [
      "How many hydrogen atoms are in 1.00 mol of Ca(OH)2?",
      ["6.02 x 10^23", "1.20 x 10^24", "2.40 x 10^24", "3.01 x 10^23"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "An oxide of nitrogen contains 30.4 percent nitrogen and 69.6 percent oxygen by mass. Find its empirical formula. Its molar mass is 92.0 g/mol; find the molecular formula.",
      scheme: [
        "Converts 30.4 g of N to 2.17 mol and 69.6 g of O to 4.35 mol",
        "Divides by the smaller number to get a 1 to 2 ratio",
        "Writes the empirical formula NO2",
        "Divides the molar mass 92.0 by the empirical mass 46.0 to get 2 and gives the molecular formula N2O4",
      ],
      model:
        "In 100 g there are 30.4 g of N, which is 2.17 mol, and 69.6 g of O, which is 4.35 mol. Dividing by 2.17 gives N 1 and O 2, so the empirical formula is NO2, with a mass of 46.0. The molar mass 92.0 is twice that, so the molecular formula is N2O4.",
      answers: [
        [
          "full",
          "[[0|Assume 100 g: 30.4 g N / 14.01 = 2.17 mol and 69.6 g O / 16.00 = 4.35 mol.]] [[1|Dividing by 2.17 gives 1 N to 2.00 O.]] [[2|The empirical formula is NO2.]] [[3|NO2 has a mass of 46.0, and 92.0/46.0 = 2, so the molecular formula is N2O4.]]",
          "Full marks. The method is exactly the one for any empirical formula problem.",
        ],
        [
          "full",
          "[[0|Percentages become grams: N = 30.4 g (2.17 mol) and O = 69.6 g (4.35 mol).]] [[1|The mole ratio N:O is 1:2.]] [[2|Empirical formula NO2.]] [[3|The empirical mass is 46.01, so 92.0 is two times that. Molecular formula N2O4.]]",
          "All four marks, and the rounding of the 2.00 to a whole number is sensible.",
        ],
        [
          "partial",
          "[[0|30.4 g of N is 2.17 mol and 69.6 g of O is 4.35 mol.]] [[1|The ratio is 1:2.]] The formula is N2O.",
          "The ratio 1 N to 2 O gives NO2, not N2O. The subscripts follow the ratio of N to O in that order.",
        ],
        [
          "partial",
          "[[2|The empirical formula is NO2.]] [[3|The molecular formula is N2O4 because the molar mass is double.]]",
          "Both are right. Show how you got the mole values from the percentages, since that is where most of the marks are.",
          true,
        ],
        [
          "weak",
          "30.4 and 69.6 are in a ratio of about 1 to 2.3 so the formula is N O2.3 which I will round to NO2.",
          "You must convert the masses to moles before finding the ratio, because the atoms have different masses. Using the masses directly gave a wrong ratio.",
        ],
        [
          "weak",
          "[[3|Molecular formula is N2O4.]] I just knew that nitrogen oxide is N2O4 from the chemistry book.",
          "The answer is correct, but the question asks for the method. Show the empirical formula from the data first and then use the molar mass.",
        ],
      ],
    },
    {
      prompt:
        "Balance 2Al + Fe2O3 gives Al2O3 + Fe, and then calculate how many moles and how many atoms of aluminum are in 54.0 g of aluminum (molar mass 26.98 g/mol).",
      scheme: [
        "Balances the equation as 2Al + Fe2O3 gives Al2O3 + 2Fe",
        "Verifies the counts of 2 Al, 2 Fe and 3 O on each side",
        "Calculates 54.0 / 26.98 = 2.00 mol",
        "Multiplies by Avogadro's number to get 1.20 x 10^24 atoms",
      ],
      model:
        "The balanced equation is 2Al + Fe2O3 gives Al2O3 + 2Fe, with 2 Al, 2 Fe and 3 O on each side. The moles of aluminum are 54.0 divided by 26.98, which is 2.00 mol. The number of atoms is 2.00 times 6.02 x 10^23, which is 1.20 x 10^24 atoms.",
      answers: [
        [
          "full",
          "[[0|2Al + Fe2O3 → Al2O3 + 2Fe.]] [[1|Left: 2 Al, 2 Fe, 3 O. Right: 2 Al, 2 Fe, 3 O. Balanced.]] [[2|54.0 g ÷ 26.98 g/mol = 2.00 mol.]] [[3|2.00 mol × 6.02 × 10^23 = 1.20 × 10^24 atoms.]]",
          "Full marks. The atom inventory is the best way to prove an equation is balanced.",
        ],
        [
          "full",
          "[[0|The balanced equation has a 2 in front of the Fe, 2Al + Fe2O3 → Al2O3 + 2Fe.]] [[1|I counted each element on both sides to check it: 2, 2, 3.]] [[2|Moles of Al = 54.0/26.98 = 2.00.]] [[3|Atoms = 2.00 × 6.022 × 10^23 = 1.20 × 10^24.]]",
          "All four marks, with a clear check of the balance.",
        ],
        [
          "partial",
          "[[0|2Al + Fe2O3 → Al2O3 + 2Fe.]] [[2|54.0/26.98 = 2.00 mol.]] The atoms are 2.00 + 6.02 × 10^23 = 6.02 × 10^23.",
          "You find the number of atoms by multiplying the moles by Avogadro's number, not adding. The answer is 1.20 x 10^24.",
        ],
        [
          "partial",
          "[[3|2.00 mol × 6.02 × 10^23 = 1.20 × 10^24 atoms.]] [[1|It's balanced because the Fe's match.]]",
          "Check all three elements when you verify the balance: aluminum and oxygen as well as iron. And show how you found the 2.00 mol.",
          true,
        ],
        [
          "weak",
          "Al + Fe2O3 → Al2O3 + Fe is balanced already, and 54.0 g of Al is 54.0 mol.",
          "The equation has 2 Fe on the left and 1 on the right, and 1 Al on the left against 2 on the right. Moles are found by dividing the mass by the molar mass.",
        ],
        [
          "weak",
          "[[0|2Al + Fe2O3 → Al2O3 + 2Fe.]] 54.0 × 26.98 = 1457 mol of aluminum.",
          "Your equation is right. To get moles divide the mass by the molar mass. 1457 mol would be a huge mass.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Stoichiometry with limiting reactants and yield",
  note: `
## Objectives

Students will be able to:

1. calculate the mass of product from the mass of reactant and identify the limiting reactant and the excess left over;
2. calculate percent yield and analyze reasons for yields below 100 percent.

## Materials

Calculators, thermite reaction video (demo only, no student handling), worked-example handout, the worksheet.

## Starter (6 minutes)

Show a video of thermite (Al + Fe2O3). Ask: "If I start with 54.0 g of aluminum and 80.0 g of iron(III) oxide, how much iron can I make?" Collect guesses and note they need the mole ratio.

## Main activity

1. Present the three-step method (grams to moles, mole ratio, moles to grams) and apply to 2Al + Fe2O3 gives Al2O3 + 2Fe.
2. Limiting reactant: with 54.0 g Al (2.00 mol) and 80.0 g Fe2O3 (0.501 mol), find which runs out, the mass of iron produced (56.0 g) and the mass of excess aluminum left.
3. Compare predictions to a measured yield. If 49.0 g of iron is recovered, the percent yield is 87.5 percent.

## Checking for understanding

Whiteboards: with 10.0 g H2 and 64.0 g O2, find which limits.

## Worksheet

Two limiting-reactant problems and one percent yield question with reasons.
`,
  reading: [
    "What runs out first, and what we actually get",
    `
Stoichiometry problems follow a pattern: grams of the given substance to moles, moles of given to moles of wanted using the coefficients in the balanced equation, and then moles of the wanted substance to grams. Consider the thermite reaction, 2Al + Fe2O3 gives Al2O3 + 2Fe. The equation says that 2 mol of aluminum react with 1 mol of iron(III) oxide to give 2 mol of iron.

When both reactants are given, you must find which one limits the reaction. Suppose there are 54.0 g of Al and 80.0 g of Fe2O3. The aluminum is 54.0 divided by 26.98, which is 2.00 mol. The iron(III) oxide is 80.0 divided by 159.7, which is 0.501 mol. The equation needs 2 mol of Al for each 1 mol of Fe2O3, so 0.501 mol of Fe2O3 needs 1.00 mol of Al. We have 2.00 mol, so there is more than enough aluminum. The Fe2O3 is the **limiting reactant**, and the aluminum is in **excess**. The amount of iron is found from the limiting reactant: 0.501 mol of Fe2O3 gives 1.00 mol of iron (2 mol Fe per 1 mol Fe2O3), and 1.00 times 55.85 is 56.0 g. The aluminum left over is 2.00 minus 1.00, which is 1.00 mol, or 27.0 g.

Another example: for 2H2 + O2 gives 2H2O, start with 10.0 g of H2 (4.95 mol) and 64.0 g of O2 (2.00 mol). The 2.00 mol of oxygen needs 4.00 mol of hydrogen. Since there is 4.95 mol, oxygen limits. The yield of water is 2 times 2.00, which is 4.00 mol, or 72.1 g, and 0.95 mol of hydrogen (1.9 g) remains.

The 56.0 g of iron is the **theoretical yield**: the maximum the equation allows. If you collect 49.0 g, the **percent yield** is 49.0 divided by 56.0, times 100, which is 87.5 percent. Yields below 100 percent are normal. Some product is lost during separation, some reactant may form side products, and some reactions do not go to completion. Yields over 100 percent are a warning. They usually mean that the product is wet or impure, or that there was a weighing error.

A chemist uses these calculations to decide how much of each starting material to buy, how much waste to expect, and whether a process is efficient enough to be worth running.
`,
  ],
  cards: [
    ["Limiting reactant", "The reactant that is completely used up and so limits the product that can form."],
    ["Excess reactant", "The reactant that remains after the reaction is complete."],
    ["Theoretical yield", "The maximum mass of product predicted from the limiting reactant."],
    ["Percent yield", "Actual yield divided by theoretical yield, times 100."],
    ["Mole ratio", "The ratio of coefficients used to convert between substances in an equation."],
    ["Side reaction", "An unwanted reaction that uses reactants and lowers the yield of the desired product."],
    ["Purity", "The fraction of a sample that is the substance wanted."],
    ["Atom economy", "A measure of how much of the reactant mass ends up in the desired product."],
  ],
  closed: [
    [
      "In 2Al + Fe2O3 gives Al2O3 + 2Fe, you have 2.00 mol Al and 0.501 mol Fe2O3. Which is limiting?",
      ["Al", "Fe2O3", "Al2O3", "Fe"],
      "B",
    ],
    [
      "How many grams of iron form from 1.00 mol of Fe (molar mass 55.85)?",
      ["27.9 g", "55.9 g", "111.7 g", "1.00 g"],
      "B",
    ],
    [
      "A reaction should give 56.0 g of iron, and 49.0 g is collected. What is the percent yield?",
      ["87.5%", "114%", "12.5%", "7.0%"],
      "A",
    ],
    [
      "In 2H2 + O2 gives 2H2O, you have 4.95 mol H2 and 2.00 mol O2. How much water forms?",
      ["2.00 mol", "4.00 mol", "4.95 mol", "9.90 mol"],
      "B",
    ],
    [
      "A student reports a percent yield of 108%. The most likely explanation is:",
      [
        "The reaction made extra atoms",
        "The product was still wet or impure",
        "The limiting reactant was in excess",
        "The mole ratio was wrong",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "For 2H2 + O2 gives 2H2O, 10.0 g of hydrogen (2.02 g/mol) reacts with 64.0 g of oxygen (32.00 g/mol). Determine the limiting reactant, the mass of water formed (18.02 g/mol), and the mass of the excess reactant that remains.",
      scheme: [
        "Calculates 4.95 mol H2 and 2.00 mol O2",
        "Identifies oxygen as limiting because 2.00 mol O2 needs 4.00 mol H2 and there is 4.95 mol",
        "Calculates 4.00 mol of water, which is 72.1 g",
        "Calculates the hydrogen left over as 0.95 mol, about 1.9 g",
      ],
      model:
        "10.0 g of H2 is 4.95 mol and 64.0 g of O2 is 2.00 mol. The 2.00 mol of O2 needs 4.00 mol of H2, and there is 4.95 mol, so oxygen is limiting. It produces 4.00 mol of water, which is 72.1 g. The hydrogen left over is 4.95 minus 4.00, 0.95 mol, which is about 1.9 g.",
      answers: [
        [
          "full",
          "[[0|10.0/2.02 = 4.95 mol H2 and 64.0/32.00 = 2.00 mol O2.]] [[1|2.00 mol O2 needs 4.00 mol H2, and we have 4.95, so O2 is limiting.]] [[2|It gives 2 × 2.00 = 4.00 mol H2O = 4.00 × 18.02 = 72.1 g.]] [[3|The leftover H2 is 4.95 - 4.00 = 0.95 mol, which is about 1.9 g.]]",
          "Full marks. Completing the excess calculation shows you track every substance.",
        ],
        [
          "full",
          "[[0|Moles: H2 4.95, O2 2.00.]] [[1|The ratio is 2 H2 : 1 O2, so O2 would need 4.00 mol H2. There is more than that, so oxygen runs out first.]] [[2|Water = 4.00 mol = 72.1 g.]] [[3|Excess H2 = 0.95 mol × 2.02 = 1.9 g.]]",
          "All four marks, with well-organized work.",
        ],
        [
          "partial",
          "[[0|4.95 mol H2 and 2.00 mol O2.]] There is more hydrogen so oxygen is limiting. Water is 4.95 mol × 18.02 = 89.2 g.",
          "Your limiting reactant is right, but the yield comes from the limiting reactant, 2.00 mol of O2, giving 4.00 mol of water, 72.1 g.",
        ],
        [
          "partial",
          "[[1|Oxygen is limiting.]] [[2|It makes 72.1 g of water.]]",
          "These are correct. Show the moles of each reactant that lead to the decision and calculate the mass of the leftover hydrogen.",
          true,
        ],
        [
          "weak",
          "10.0 g is less than 64.0 g so hydrogen is the limiting reactant. The water is 74.0 g, the sum of the masses.",
          "Compare moles using the mole ratio, not masses. The mass of water is found from the limiting reactant's moles, not by adding masses.",
        ],
        [
          "weak",
          "[[0|Hydrogen is 4.95 mol and oxygen is 2.00 mol.]] Oxygen is smaller so hydrogen is limiting.",
          "The ratio in the equation is 2:1, so you cannot just pick the smaller number. 2.00 mol of O2 needs 4.00 mol of H2, and 4.95 is enough.",
        ],
      ],
    },
    {
      prompt:
        "In a synthesis a chemist predicts 56.0 g of iron but collects 49.0 g. Calculate the percent yield and suggest three reasons the actual yield could be lower than the theoretical yield.",
      scheme: [
        "Calculates the percent yield as 49.0/56.0 x 100 = 87.5 percent",
        "Gives a reason related to loss during separation or transfer",
        "Gives a reason related to side reactions or impure reactants",
        "Gives a reason related to an incomplete reaction",
      ],
      model:
        "Percent yield is 49.0 divided by 56.0, times 100, which is 87.5 percent. Possible reasons: some iron was lost during separation from the slag and transfer, some reactant went into side reactions or the reactants were impure, and the reaction may not have gone to completion.",
      answers: [
        [
          "full",
          "[[0|49.0 / 56.0 × 100 = 87.5%.]] [[1|Some iron could have been lost when it was separated from the slag and moved to the balance.]] [[2|Some of the reactants could have been impure or made side products.]] [[3|The reaction might not have fully finished, leaving some reactant behind.]]",
          "Full marks. Three distinct reasons, each realistic.",
        ],
        [
          "full",
          "[[0|Percent yield = actual/theoretical × 100 = 87.5%.]] [[1|Product is lost sticking to the crucible and in transfers.]] [[2|Side reactions or impurity in the aluminum would use up reactant.]] [[3|The reaction may not have gone to completion.]]",
          "All four marks, correct and concise.",
        ],
        [
          "partial",
          "[[0|49.0 / 56.0 × 100 = 87.5%.]] [[1|Some of the iron stuck to the container.]] The atoms disappeared.",
          "Atoms are conserved: the missing iron is somewhere. Give reasons about side reactions or an incomplete reaction too.",
        ],
        [
          "partial",
          "[[2|Impure reactants.]] [[3|The reaction didn't finish.]]",
          "These are good reasons. Calculate the percent yield and add a reason related to losses when separating and weighing the product.",
          true,
        ],
        [
          "weak",
          "56.0 - 49.0 = 7.0 so the percent yield is 7.0%. The reasons are that the chemist made mistakes.",
          "Percent yield is a ratio: divide the actual by the theoretical and multiply by 100. Name specific reasons rather than 'mistakes'.",
        ],
        [
          "weak",
          "[[0|The percent yield is 87.5%.]] The yield is lower because mass disappears in a chemical reaction.",
          "Mass is conserved. The shortfall comes from losses, side reactions and incomplete reactions, not from mass vanishing.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Precipitation stoichiometry and calorimetry",
  note: `
## Objectives

Students will be able to:

1. predict precipitates with solubility rules, write net ionic equations and calculate the mass of a precipitate from solution concentrations;
2. investigate how thermal energy moves between two systems and use calorimetry to find a specific heat.

## Materials

Coffee cup calorimeters with lids, thermometers, a hot water bath, unknown metal samples (50.0 g iron, copper or aluminum), balances, the practical sheet.

## Starter (6 minutes)

Pour 50.0 mL of 0.200 M lead nitrate solution into 50.0 mL of 0.300 M potassium iodide in front of the class. Ask: "How much yellow solid can form at most?"

## Main activity

1. Review solubility rules and net ionic equations for the lead iodide reaction. Work out the moles: 0.0100 mol Pb2+ and 0.0150 mol I-. The ratio is 1 Pb to 2 I, so iodide is limiting and 0.00750 mol of PbI2 (461.0 g/mol), or 3.46 g, forms.
2. Introduce q = mc delta T and calorimetry: heat lost by the metal equals heat gained by the water, if the cup is well insulated.
3. Practical: determine the specific heat of an unknown metal and identify it from a table.

## Checking for understanding

Ask: "Why do we use a lid, and what would heat loss to the room do to the calculated specific heat?"

## Practical write-up

Collect with data, calculation and identification.
`,
  reading: [
    "How much solid, and how much heat",
    `
Predicting a precipitate is only the first step. A chemist also wants to know how much solid will form. Take the reaction of lead nitrate with potassium iodide: Pb(NO3)2(aq) + 2KI(aq) gives PbI2(s) + 2KNO3(aq). The net ionic equation is Pb2+(aq) + 2I-(aq) gives PbI2(s), the bright yellow solid. The potassium and nitrate ions are spectators.

Concentration is expressed as **molarity**, moles of solute per liter of solution. A volume of 50.0 mL of 0.200 M Pb(NO3)2 contains 0.0500 L times 0.200 mol/L, which is 0.0100 mol of Pb2+. A volume of 50.0 mL of 0.300 M KI has 0.0150 mol of I-. The net equation needs 2 mol of I- for each Pb2+. The 0.0100 mol of lead would need 0.0200 mol of iodide, but only 0.0150 mol is present, so iodide is the limiting reactant. The moles of lead iodide formed are 0.0150 divided by 2, or 0.00750 mol. With a molar mass of 207.2 plus 2(126.9), which is 461.0 g/mol, the mass of the precipitate is 0.00750 times 461.0, or 3.46 g. A real experiment would give slightly less, so the percent yield would be below 100.

Heat flow is also quantitative. The heat gained or lost by a substance is q = mcΔT, where c is the **specific heat**, the energy needed to raise 1 g by 1 degree Celsius. For water, c is 4.18 J/g per degree. In a **calorimeter**, an insulated container, a hot sample is placed in water and the final temperature is measured. If no heat is lost to the surroundings, the heat lost by the metal equals the heat gained by the water.

For example, 50.0 g of an unknown metal at 100.0 degrees Celsius is dropped into 100.0 g of water at 22.0 degrees. The final temperature is 26.0. The water gained 100.0 times 4.18 times 4.0, which is 1672 J. The metal lost the same, with a temperature change of 74.0 degrees. So c equals 1672 divided by (50.0 times 74.0), which is 0.452 J/g per degree. This is close to the specific heat of iron, 0.449, so the metal is probably iron. If some heat leaked to the room, the water would gain less than the metal lost, and the calculated c would be too low.
`,
  ],
  cards: [
    ["Molarity", "Moles of solute per liter of solution."],
    ["Net ionic equation", "An equation showing only the ions and compounds that change in a reaction."],
    ["Spectator ion", "An ion that does not take part in the reaction."],
    ["Specific heat", "The energy needed to raise the temperature of 1 g of a substance by 1 degree Celsius."],
    ["Calorimeter", "An insulated device used to measure heat transfer in a process."],
    ["q = mcΔT", "The heat gained or lost equals mass times specific heat times temperature change."],
    ["Thermal equilibrium", "The state in which touching objects have reached the same temperature."],
    ["Heat loss error", "Energy leaking to the room, which makes the measured heat transfer too small."],
  ],
  closed: [
    [
      "How many moles of Pb2+ are in 50.0 mL of 0.200 M Pb(NO3)2?",
      ["0.00200 mol", "0.0100 mol", "0.200 mol", "10.0 mol"],
      "B",
    ],
    [
      "In Pb2+ + 2I- gives PbI2(s), 0.0100 mol Pb2+ is mixed with 0.0150 mol I-. How many moles of PbI2 form?",
      ["0.00750 mol", "0.0100 mol", "0.0150 mol", "0.0250 mol"],
      "A",
    ],
    [
      "A 50.0 g metal at 100.0 degrees Celsius heats 100.0 g of water from 22.0 to 26.0 degrees. How much heat did the water gain (c = 4.18 J/g per degree)?",
      ["418 J", "1672 J", "2090 J", "8360 J"],
      "B",
    ],
    [
      "If heat leaks from the calorimeter to the room, the calculated specific heat of the metal will be:",
      ["Too high", "Too low", "Exactly right", "Impossible to tell"],
      "B",
    ],
    [
      "Which ions are spectators in Pb(NO3)2 + 2KI gives PbI2 + 2KNO3?",
      ["Pb2+ and I-", "K+ and NO3-", "Pb2+ and NO3-", "K+ and I-"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "50.0 mL of 0.200 M Pb(NO3)2 is mixed with 50.0 mL of 0.300 M KI. Find the limiting reactant and the mass of PbI2 (461.0 g/mol) that precipitates. Write the net ionic equation.",
      scheme: [
        "Writes the net ionic equation Pb2+ + 2I- gives PbI2(s)",
        "Calculates 0.0100 mol Pb2+ and 0.0150 mol I-",
        "Identifies iodide as limiting because 0.0100 mol Pb2+ needs 0.0200 mol I-",
        "Calculates 0.00750 mol PbI2, which is 3.46 g",
      ],
      model:
        "The net ionic equation is Pb2+(aq) + 2I-(aq) gives PbI2(s). There are 0.0100 mol of Pb2+ and 0.0150 mol of I-. The lead would need 0.0200 mol of iodide, so iodide is limiting. The moles of PbI2 are 0.0150 divided by 2, which is 0.00750 mol, and the mass is 0.00750 times 461.0, which is 3.46 g.",
      answers: [
        [
          "full",
          "[[0|Pb2+(aq) + 2I-(aq) → PbI2(s).]] [[1|Moles Pb2+ = 0.0500 L × 0.200 = 0.0100, moles I- = 0.0500 × 0.300 = 0.0150.]] [[2|Pb2+ would need 0.0200 mol I- but there's only 0.0150, so iodide is limiting.]] [[3|PbI2 = 0.0150/2 = 0.00750 mol × 461.0 = 3.46 g.]]",
          "Full marks. All the steps and units are present and the logic is in order.",
        ],
        [
          "full",
          "[[0|Net ionic: Pb²⁺ + 2I⁻ → PbI₂(s).]] [[1|0.0100 mol Pb2+ and 0.0150 mol I-.]] [[2|The ratio needs 2 I- per Pb2+. 0.0150 mol I- only reacts with 0.00750 mol Pb2+, so I- limits.]] [[3|Mass of PbI2 = 0.00750 × 461.0 = 3.46 g.]]",
          "All four marks. Working from the iodide side is a good check.",
        ],
        [
          "partial",
          "[[0|Pb2+ + 2I- → PbI2(s).]] [[1|0.0100 mol Pb2+ and 0.0150 mol I-.]] Lead is the limiting reactant because it has fewer moles, so PbI2 is 0.0100 mol = 4.61 g.",
          "You must account for the 1 to 2 ratio. Iodide is the limiting reactant, which gives 0.00750 mol, or 3.46 g.",
        ],
        [
          "partial",
          "[[2|Iodide is limiting.]] [[3|The mass is 3.46 g.]]",
          "Both are right. Show the moles of each ion and the net ionic equation as well.",
          true,
        ],
        [
          "weak",
          "0.200 + 0.300 = 0.500 M so there is 0.500 mol and the mass is 0.500 × 461.0 = 230 g.",
          "Concentrations from different solutions cannot just be added. Find the moles of each ion from the concentration and volume, then use the mole ratio.",
        ],
        [
          "weak",
          "[[0|The net ionic equation is Pb2+ + 2I- → PbI2.]] The limiting reactant is the one in the larger volume.",
          "Volume does not decide it; moles and the mole ratio do. Both solutions have the same volume here, so look at the moles.",
        ],
      ],
    },
    {
      prompt:
        "A 50.0 g sample of unknown metal at 100.0 degrees Celsius is placed in 100.0 g of water at 22.0 degrees. The final temperature is 26.0 degrees. Calculate the specific heat of the metal and suggest an identity (iron 0.449, copper 0.385, aluminum 0.897 J/g per degree).",
      scheme: [
        "Calculates the heat gained by the water as 1672 J",
        "States that the heat lost by the metal equals the heat gained by the water",
        "Calculates the specific heat as 0.452 J/g per degree",
        "Identifies the metal as iron because it is the closest value",
      ],
      model:
        "The water gained q = 100.0 x 4.18 x 4.0 = 1672 J. The metal lost the same amount, and its temperature fell by 74.0 degrees, so c = 1672 divided by (50.0 x 74.0), which is 0.452 J/g per degree. This is closest to iron, 0.449.",
      answers: [
        [
          "full",
          "[[0|Water: q = 100.0 × 4.18 × (26.0 - 22.0) = 1672 J.]] [[1|The metal lost the same amount of heat.]] [[2|c = 1672 / (50.0 × 74.0) = 0.452 J/g°C.]] [[3|That matches iron (0.449), so the metal is iron.]]",
          "Full marks. Using the metal's own temperature change, 74.0 degrees, is the step many students miss.",
        ],
        [
          "full",
          "[[0|Heat gained by water = mcΔT = 100.0 × 4.18 × 4.0 = 1672 J.]] [[1|By conservation of energy the metal lost 1672 J.]] [[2|c(metal) = 1672 / (50.0 × 74.0) = 0.452 J/g°C.]] [[3|The closest in the table is iron.]]",
          "All four marks, with a clear link to energy conservation.",
        ],
        [
          "partial",
          "[[0|Water gained 1672 J.]] [[1|The metal lost the same.]] c = 1672/(50.0 × 4.0) = 8.4 J/g°C, so it isn't any of the metals.",
          "The metal's temperature change is from 100.0 to 26.0, which is 74.0 degrees, not 4.0. That gives 0.452 and an identity of iron.",
        ],
        [
          "partial",
          "[[2|c = 0.452 J/g°C.]] [[3|So it's iron.]]",
          "Both are right. Show the heat gained by the water and the argument that the metal lost the same amount.",
          true,
        ],
        [
          "weak",
          "The temperature went from 22 to 26 so the specific heat is 4.0. The metal is aluminum.",
          "Specific heat is not the temperature change. Use q = mcΔT with the water to find the heat, then apply it to the metal.",
        ],
        [
          "weak",
          "[[1|The heat lost by the metal equals the heat gained by the water.]] 1672 × 50.0 × 74.0 = 6.19 × 10^6 so the specific heat is huge.",
          "You multiplied where you needed to divide. c = q / (m x ΔT) for the metal.",
        ],
      ],
    },
  ],
  practical: {
    title: "Identifying a metal by its specific heat",
    instructions:
      "Heat a weighed sample of an unknown metal in boiling water for five minutes. Transfer it quickly to a lidded foam-cup calorimeter holding a known mass of water at room temperature, stir gently and record the highest temperature. Calculate the specific heat of the metal and identify it from the table, then evaluate the main sources of error.",
    steps: [
      ["Measure the mass of the metal sample and of the empty foam cup, then add about 100 mL of water and measure the mass again."],
      ["Heat the metal in a beaker of boiling water for five minutes and record the temperature of the water as the metal's starting temperature.", "Use tongs or a string handle for the metal and keep your face away from steam."],
      ["Record the starting temperature of the water in the calorimeter."],
      ["Transfer the metal to the calorimeter as quickly as you can, replace the lid and stir gently."],
      ["Record the highest temperature reached."],
      ["Calculate the specific heat using q = mcΔT, compare with the table, and discuss sources of error."],
    ],
    rubric: [
      ["Method: accurate masses, controlled transfer and temperature readings", 4],
      ["Calculation: correct heat gained, ΔT of the metal and specific heat", 4],
      ["Evaluation: identification and sources of error with their direction", 4],
    ],
    writeUps: [
      [
        "full",
        "The metal had a mass of 50.2 g and was at 99.5 degrees Celsius. The water was 99.8 g at 22.1 degrees and reached 26.0 degrees. The water gained 99.8 times 4.18 times 3.9, which is 1627 J. The metal fell by 73.5 degrees, so c is 1627 divided by (50.2 times 73.5), which is 0.441 J/g per degree. This is closest to iron at 0.449, a difference of 1.8 percent. Heat lost during the transfer would make the value too low, which fits.",
        [4, 4, 4],
        "An excellent report with correct calculations, a sensible identification and an error that explains the direction of the difference.",
      ],
      [
        "full",
        "We measured 49.8 g of metal at 100.0 degrees and 100.1 g of water at 21.8 degrees, final 25.9 degrees. Heat gained by water = 100.1 × 4.18 × 4.1 = 1715 J. Specific heat of metal = 1715 / (49.8 × 74.1) = 0.465 J/g°C. This is closest to iron (0.449) rather than copper (0.385) or aluminum (0.897). The error is 3.6%. Sources of error include heat lost to the cup and air and some hot water carried over with the metal.",
        [4, 4, 3],
        "Very good. For full marks on the evaluation, say whether each error makes your value too high or too low.",
      ],
      [
        "partial",
        "The metal was 50.0 g at 100 degrees and the water was 100 g at 22 degrees. The final temperature was 26 degrees. I used q = mcΔT for the water and got 1672 J. Then I used that to find c for the metal, which was about 0.45, so the metal is iron, I think.",
        [3, 2, 2],
        "The method is sound. Show the metal's temperature change and the full calculation, and say why heat loss would change the value.",
      ],
      [
        "partial",
        "We heated the metal and put it in the water. The temperature of the water went from 22 to 26. I calculated c = 4.18 × 100 × 4 = 1672 and so the specific heat of the metal is 1672 J/g°C. I am not sure why it is so big, maybe it is a very special metal.",
        [2, 1, 1],
        "1672 J is the heat gained by the water, not the specific heat of the metal. Divide it by the metal's mass and its temperature change to find c.",
      ],
      [
        "weak",
        "We heated a metal and put it in water, and the water got warmer. The metal must have been hot. I think it was copper because it looked brown. The experiment worked well and we cleaned up our station when we finished.",
        [1, 0, 0],
        "Use your measurements: masses, starting and final temperatures. Calculate the specific heat and identify the metal from the number, not from its color.",
      ],
      [
        "weak",
        "The specific heat of the metal is the same as water because the heat from the metal went into the water and they ended at the same temperature. So the specific heat is 4.18 and the metal is not in the table. We had no errors in the experiment at all.",
        [1, 0, 0],
        "Ending at the same temperature does not make the specific heats equal. The metal's smaller specific heat means it loses a lot of temperature for little energy.",
      ],
    ],
  },
};

writeCourse("honors-chemistry-grade-10.json", "Honors Chemistry", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
