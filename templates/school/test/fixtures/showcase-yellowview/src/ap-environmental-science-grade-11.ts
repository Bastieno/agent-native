import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * AP Environmental Science, Grade 11, Quarter 1. Units 1 to 4 of the AP
 * Environmental Science framework plus science practices, written fresh in
 * the school's own words, with Ohio examples.
 */

const w1: WeekInput = {
  topic: "Energy flow, nutrient cycles and biomes",
  note: `
## Objectives

Students will be able to:

1. describe the flow of energy through food chains and food webs and the loss at each level;
2. explain the carbon, nitrogen, phosphorus and water cycles and how humans change them;
3. describe how terrestrial and aquatic biomes differ and what limits productivity in each.

## Materials

Food web cards for Lake Erie, cycle diagram templates, a biome climate graph handout, the worksheet.

## Starter (6 minutes)

Ask: "A bald eagle needs about 5,000 kcal a day. Starting from the algae in Lake Erie, how much energy must the lake's producers capture to support it?" Introduce the 10 percent rule as a rough guide.

## Main activity

1. Energy flow: producers, consumers and decomposers; the 10 percent rule: if producers capture 10,000 kcal, primary consumers store about 1000, secondary consumers 100 and tertiary 10. Where the rest goes (respiration, heat, waste).
2. Cycles: carbon (photosynthesis, respiration, combustion, ocean exchange), nitrogen (fixation, nitrification, assimilation, denitrification), phosphorus (rock weathering, no gas phase) and water. Human effects: fossil fuels, fertilizer runoff, deforestation.
3. Biomes: tundra, taiga, temperate deciduous forest (Ohio), grassland, desert, tropical rainforest, and freshwater and marine zones. Climate (temperature and precipitation) and limiting factors.

## Checking for understanding

Ask: "Why is phosphorus often the limiting nutrient in freshwater lakes?"

## Worksheet

An energy pyramid calculation, a cycle diagram with human impacts, and a biome comparison.
`,
  reading: [
    "Energy that flows, matter that cycles",
    `
Every ecosystem runs on energy that flows through it in one direction. Most of it begins as sunlight captured by producers in photosynthesis. When a consumer eats a producer, only a fraction of the energy is stored in its tissues. The rest is lost as heat in respiration, or passes out in waste. As a rule of thumb, about **10 percent** of the energy at one trophic level passes to the next. If algae in Lake Erie capture 10,000 kilocalories, then zooplankton store about 1000 kcal, small fish about 100, and a large fish such as walleye about 10. This is why food chains rarely have more than four or five levels and why top predators are few. It also explains why eating lower on the food chain feeds more people: a field of corn that feeds people directly supports far more than the same field used to feed cattle. **Decomposers**, such as bacteria and fungi, break down dead material and release nutrients for reuse.

Unlike energy, matter cycles. In the **carbon cycle**, plants take CO2 from the air in photosynthesis, animals and plants return it by respiration, and burning of fossil fuels and forests adds carbon to the atmosphere faster than natural sinks remove it. The **nitrogen cycle** is more complex: nitrogen gas, 78 percent of the air, cannot be used by most organisms, so bacteria in soil and legume roots perform **nitrogen fixation**, producing ammonia. Other bacteria convert it to nitrate in **nitrification**; plants assimilate the nitrate, and **denitrification** returns nitrogen gas to the air. Humans have roughly doubled the amount of fixed nitrogen entering ecosystems through fertilizer production. The **phosphorus cycle** has no gas phase: phosphorus comes from the weathering of rock, moves through soil and water, and settles in sediments. Because it is scarce in fresh water, adding phosphorus from fertilizer and sewage can cause algal blooms. In the western basin of Lake Erie, blooms of cyanobacteria have fouled drinking water supplies, as happened in Toledo in 2014. The **water cycle** is driven by the sun, with evaporation, transpiration, condensation, precipitation and runoff, and humans alter it with dams, irrigation and paving over land.

Biomes are large regions defined by climate and dominant vegetation. Ohio lies in the **temperate deciduous forest**, with moderate rainfall and four seasons. **Tundra** is cold and has permafrost. **Taiga** has long winters and conifers. **Grasslands** have too little rain for forests. **Deserts** have little water. **Tropical rainforests** are warm and wet and have the highest biodiversity, but their soils are nutrient-poor because nutrients are locked in the living vegetation. In each biome, productivity is limited by the scarcest resource: water in deserts, temperature in tundra, and nutrients in the open ocean.
`,
  ],
  cards: [
    ["10 percent rule", "About 10 percent of the energy at one trophic level passes to the next."],
    ["Trophic level", "A feeding level in a food chain, such as producer or primary consumer."],
    ["Decomposer", "An organism that breaks down dead material and recycles nutrients."],
    ["Nitrogen fixation", "Conversion of nitrogen gas into ammonia by bacteria."],
    ["Denitrification", "Conversion of nitrate back to nitrogen gas by bacteria."],
    ["Algal bloom", "A rapid growth of algae or cyanobacteria caused by excess nutrients."],
    ["Temperate deciduous forest", "The biome of Ohio, with four seasons and moderate rainfall."],
    ["Limiting nutrient", "The nutrient in shortest supply, which restricts growth."],
  ],
  closed: [
    [
      "If producers capture 10,000 kcal, about how much energy is available to secondary consumers (using the 10% rule)?",
      ["10 kcal", "100 kcal", "1000 kcal", "9000 kcal"],
      "B",
    ],
    [
      "Which process converts nitrogen gas into ammonia?",
      ["Nitrification", "Denitrification", "Nitrogen fixation", "Assimilation"],
      "C",
    ],
    [
      "Why can fertilizer runoff cause algal blooms in Lake Erie?",
      ["It adds phosphorus, the limiting nutrient", "It adds oxygen", "It lowers the temperature", "It kills decomposers"],
      "A",
    ],
    [
      "Which cycle has no significant gas phase?",
      ["Carbon", "Nitrogen", "Phosphorus", "Water"],
      "C",
    ],
    [
      "The nutrients in a tropical rainforest are mostly:",
      ["In the deep soil", "Locked in the living vegetation", "In the atmosphere", "In the rocks"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain why a food chain rarely has more than four or five trophic levels, and use the 10 percent rule to calculate how much of 20,000 kcal captured by algae is available to a fish that is a tertiary consumer.",
      scheme: [
        "States that only about 10 percent of energy passes to the next level",
        "States that the rest is lost as heat in respiration or in waste",
        "Calculates the energy at the tertiary level as 20 kcal",
        "States that so little energy remains that higher levels cannot support a population",
      ],
      model:
        "Only about 10 percent of the energy at one level passes to the next; the rest is lost as heat through respiration and in waste. Starting from 20,000 kcal, the primary consumers have 2000, the secondary consumers 200 and the tertiary consumers 20 kcal. So little energy remains by the fifth level that it cannot support a viable population.",
      answers: [
        [
          "full",
          "[[0|Only about 10% of the energy gets passed up to the next level.]] [[1|The rest is lost as heat in respiration or as waste.]] [[2|From 20,000 kcal: 2000, then 200, then 20 kcal at the tertiary level.]] [[3|After four or five levels there's too little energy left to support a population.]]",
          "Full marks. The calculation shows each step explicitly.",
        ],
        [
          "full",
          "[[0|Energy transfer is about 10% efficient between trophic levels.]] [[1|Cells use most energy for respiration and lose it as heat, and some is not eaten or is excreted.]] [[2|The tertiary consumer gets 20,000 × 0.1³ = 20 kcal.]] [[3|This tiny amount can't sustain another level.]]",
          "All four marks, with a good use of the exponent.",
        ],
        [
          "partial",
          "[[0|Ten percent of the energy is passed on.]] [[2|The tertiary consumer gets 20 kcal.]]",
          "Say where the other 90 percent goes, and explain why this limits the number of levels.",
        ],
        [
          "partial",
          "[[1|Energy is lost as heat.]] [[3|There's not enough left for more levels.]] The tertiary consumer gets 2000 kcal.",
          "Apply the 10 percent rule three times: 2000, then 200, then 20 kcal.",
          true,
        ],
        [
          "weak",
          "The food chain stops at four levels because predators eat each other, and the tertiary consumer gets 20,000 kcal.",
          "The limit is the loss of energy at each step. Use 10 percent for each transfer.",
        ],
        [
          "weak",
          "[[0|10% of the energy passes on.]] The rest is recycled back to the producers so that no energy is lost.",
          "Energy is not recycled. It is lost as heat. Matter, not energy, cycles through ecosystems.",
        ],
      ],
    },
    {
      prompt:
        "Describe how phosphorus from fertilizer and sewage can lead to algal blooms and a dead zone in Lake Erie. Include the role of decomposers and dissolved oxygen.",
      scheme: [
        "States that phosphorus is the limiting nutrient in fresh water, so additional phosphorus causes rapid algal growth",
        "States that the algae die and sink",
        "States that decomposers break down the dead algae, using up dissolved oxygen",
        "States that low oxygen (hypoxia) kills fish and other animals, creating a dead zone",
      ],
      model:
        "Phosphorus is the limiting nutrient in fresh water, so adding it from fertilizer and sewage causes rapid algal growth. When the algae die and sink, decomposers break them down and use up dissolved oxygen. The resulting low oxygen, hypoxia, kills fish and other animals, creating a dead zone.",
      answers: [
        [
          "full",
          "[[0|Phosphorus is the limiting nutrient in lakes, so extra phosphorus from runoff makes algae grow like crazy.]] [[1|The algae die and sink to the bottom.]] [[2|Decomposers break them down and use up the dissolved oxygen.]] [[3|With low oxygen, the fish and other animals suffocate, and that forms a dead zone.]]",
          "Full marks. Each step follows from the previous, ending with the dead zone.",
        ],
        [
          "full",
          "[[0|Fertilizer and sewage add phosphorus, which triggers algal blooms.]] [[1|When the blooms die they settle on the bottom.]] [[2|Aerobic decomposers consume the dissolved oxygen as they decompose the algae.]] [[3|Hypoxic water can't support fish, so there's a dead zone.]]",
          "All four marks, with accurate terms like hypoxia.",
        ],
        [
          "partial",
          "[[0|Phosphorus makes algae bloom.]] [[3|The fish die from low oxygen.]]",
          "Include what happens when the algae die, and the role of decomposers in using oxygen.",
        ],
        [
          "partial",
          "[[1|The algae die.]] [[2|Decomposers use up oxygen.]] The algae use up all the oxygen when they bloom at night, which kills the fish immediately.",
          "The main loss of oxygen comes from decomposition of the dead algae. Link phosphorus to the bloom.",
          true,
        ],
        [
          "weak",
          "The algae release poison that kills the fish. There is not any other cause of the dead zone.",
          "Some blooms release toxins, but dead zones come mostly from oxygen being used up in decomposition.",
        ],
        [
          "weak",
          "[[0|Phosphorus in fertilizer makes algae grow.]] Dead zones happen because of too much oxygen from the algae, which makes the fish sick.",
          "Dead zones are low in oxygen, not high. Decomposers use it up after the bloom.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Primary production and levels of biodiversity",
  note: `
## Objectives

Students will be able to:

1. explain the role of primary production and its measure in an ecosystem;
2. describe the three levels of biodiversity and why each matters.

## Materials

Winkler or dissolved oxygen test kits (or sensor data), clear and dark bottles, pond water with algae, a lamp, calculators, the practical sheet.

## Starter (6 minutes)

Ask: "A forest and a lake each receive the same sunlight. Which one has more plant growth per square meter per year, and how could we measure it?" Introduce primary production.

## Main activity

1. Define gross primary production (GPP), respiration (R) and net primary production (NPP = GPP - R). Compare NPP across biomes: tropical rainforest high, open ocean low per area but large in total.
2. Measure production with the light and dark bottle method: dissolved oxygen in the light bottle rises by photosynthesis minus respiration, and in the dark bottle falls by respiration. Calculate NPP, R and GPP.
3. Levels of biodiversity: genetic (variation within a species), species (richness and evenness) and ecosystem (variety of habitats). Why each matters for resilience.

## Checking for understanding

Ask: "What does a dark bottle measure that a light bottle cannot?"

## Practical write-up

Collect with a data table, calculations of NPP, R and GPP, and an interpretation.
`,
  reading: [
    "How much does an ecosystem grow, and how varied is it?",
    `
The base of all food webs is **primary production**, the creation of organic matter from carbon dioxide by photosynthesis. **Gross primary production (GPP)** is the total amount of energy or carbon fixed. Producers use part of it for their own respiration (R). What is left is **net primary production (NPP)**: NPP = GPP - R. NPP is the energy that is available to consumers, so it sets the upper limit of the food web. If a grassland fixes 5000 kcal per square meter per year and the plants use 2000 kcal in respiration, the NPP is 3000 kcal per square meter per year. Productivity differs among ecosystems. Tropical rainforests, estuaries and swamps have the highest NPP per area, because of warm temperatures, water and nutrients. Deserts and open ocean have low NPP per area, but the open ocean covers so much of the planet that it contributes a large share of the total.

One practical way of measuring production in water is the **light and dark bottle method**. Water samples with algae are put in two sealed bottles, one clear and one covered to block light, and incubated at the same depth. Dissolved oxygen (DO) is measured at the start and the end. In the dark bottle only respiration occurs, so DO falls. In the clear bottle both photosynthesis and respiration occur, so the DO rises by the net effect. Suppose the starting DO is 8.0 mg/L, the light bottle ends at 10.0 and the dark bottle at 6.0. Then NPP = light minus initial = 2.0 mg/L. Respiration = initial minus dark = 2.0 mg/L. GPP = light minus dark = 4.0 mg/L, which also equals NPP plus R.

Biodiversity occurs at three levels. **Genetic diversity** is the variation of genes within a species. A population with high genetic diversity is more likely to include individuals that survive a disease or a changing climate, whereas a population with low diversity, such as a clonal crop, can be wiped out by a single pathogen, as the Irish potato famine showed. **Species diversity** includes both richness, the number of species, and evenness, how equal their abundances are. **Ecosystem diversity** is the variety of habitats and communities in a region, such as forests, wetlands, prairies and lakes. Greater diversity usually makes ecosystems more productive and more resilient, since different species respond differently to stress. Ohio, with the Appalachian foothills, the glaciated plains, the Lake Erie shoreline and the remnant Great Black Swamp, has a notable range of ecosystems for its size.
`,
  ],
  cards: [
    ["Gross primary production (GPP)", "The total energy or carbon fixed by producers."],
    ["Net primary production (NPP)", "GPP minus the producers' respiration; the energy available to consumers."],
    ["Light and dark bottle method", "A way to measure aquatic production from changes in dissolved oxygen."],
    ["Genetic diversity", "The variation in genes within a species."],
    ["Species richness", "The number of different species in an area."],
    ["Species evenness", "How equal the abundances of the species are."],
    ["Ecosystem diversity", "The variety of habitats and communities in a region."],
    ["Resilience", "An ecosystem's ability to recover from disturbance."],
  ],
  closed: [
    [
      "A grassland has GPP of 5000 and plant respiration of 2000 kcal/m2/yr. What is the NPP?",
      ["2000", "3000", "5000", "7000"],
      "B",
    ],
    [
      "In the light and dark bottle method, the dark bottle measures:",
      ["Photosynthesis", "Respiration", "Net production", "Gross production"],
      "B",
    ],
    [
      "Initial DO 8.0, light bottle 10.0, dark bottle 6.0 mg/L. What is the GPP?",
      ["2.0 mg/L", "4.0 mg/L", "6.0 mg/L", "8.0 mg/L"],
      "B",
    ],
    [
      "Which situation shows low genetic diversity?",
      ["A forest of many tree species", "A field of genetically identical clone plants", "A wetland with many habitats", "A river with many fish species"],
      "B",
    ],
    [
      "Which has the highest NPP per square meter?",
      ["Desert", "Open ocean", "Tropical rainforest", "Tundra"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A student measures dissolved oxygen in pond water: initial 7.5 mg/L, light bottle after 24 hours 9.5 mg/L, and dark bottle 5.5 mg/L. Calculate NPP, respiration and GPP, and explain what each tells us about the pond.",
      scheme: [
        "Calculates NPP as 9.5 - 7.5 = 2.0 mg/L",
        "Calculates respiration as 7.5 - 5.5 = 2.0 mg/L",
        "Calculates GPP as 9.5 - 5.5 = 4.0 mg/L (equals NPP + R)",
        "Interprets: NPP is the oxygen or energy available to consumers, and half of the GPP is used by the producers' own respiration",
      ],
      model:
        "NPP = light minus initial = 2.0 mg/L. Respiration = initial minus dark = 2.0 mg/L. GPP = light minus dark = 4.0 mg/L, which equals NPP plus R. The NPP is the production available to consumers, and half of the GPP was used by the producers' own respiration.",
      answers: [
        [
          "full",
          "[[0|NPP = 9.5 − 7.5 = 2.0 mg/L.]] [[1|Respiration = 7.5 − 5.5 = 2.0 mg/L.]] [[2|GPP = 9.5 − 5.5 = 4.0 mg/L, which is NPP + R.]] [[3|NPP is what is left for consumers, and half of the GPP was used up by the algae's own respiration.]]",
          "Full marks. The check that GPP equals NPP plus R shows careful work.",
        ],
        [
          "full",
          "[[0|Net production is the light bottle minus the starting value, 2.0 mg/L.]] [[1|The dark bottle shows respiration alone, 2.0 mg/L used.]] [[2|Total photosynthesis, GPP, is the difference between light and dark, 4.0 mg/L.]] [[3|Only the NPP is available to the pond's consumers; the rest was used in respiration.]]",
          "All four marks, with a clear interpretation.",
        ],
        [
          "partial",
          "[[0|NPP is 2.0 mg/L.]] [[2|GPP is 4.0 mg/L.]] Respiration is 5.5 mg/L because that is the dark bottle value.",
          "Respiration is the oxygen consumed: initial minus dark, 7.5 - 5.5 = 2.0 mg/L.",
        ],
        [
          "partial",
          "[[3|Half the GPP goes to respiration]] and [[1|respiration is 2.0 mg/L]].",
          "Good. Calculate the NPP and the GPP and show the working.",
          true,
        ],
        [
          "weak",
          "9.5 + 7.5 + 5.5 = 22.5 mg/L is the total production of the pond.",
          "Compare each bottle with the start or with each other: NPP is light minus initial, and GPP is light minus dark.",
        ],
        [
          "weak",
          "[[0|NPP = 2.0 mg/L.]] GPP is smaller than NPP because some of it is used up, so GPP is 0.0.",
          "GPP is the total production, so it is larger than NPP: NPP plus respiration.",
        ],
      ],
    },
    {
      prompt:
        "Compare genetic, species and ecosystem diversity, and explain why a monoculture of genetically identical crop plants is at greater risk than a diverse crop population. Use a historical example.",
      scheme: [
        "Defines genetic diversity as variation of genes within a species",
        "Defines species diversity (richness and evenness) and ecosystem diversity (variety of habitats)",
        "Explains that a genetically uniform crop has no individuals with resistance, so a single disease can destroy it",
        "Gives a valid example, such as the Irish potato famine or the Southern corn leaf blight",
      ],
      model:
        "Genetic diversity is the variation of genes within a species. Species diversity is the number and evenness of species, and ecosystem diversity is the variety of habitats. A genetically uniform crop has no individuals with resistance to a pathogen, so a single disease can destroy the whole crop. In the Irish potato famine, the widely planted potatoes were genetically similar and were destroyed by a blight.",
      answers: [
        [
          "full",
          "[[0|Genetic diversity is the variety of genes within one species.]] [[1|Species diversity is the number and evenness of species, and ecosystem diversity is the variety of habitats.]] [[2|A monoculture of clones has no resistant individuals, so one disease can wipe it all out.]] [[3|The Irish potato famine is an example, where the genetically similar potato crop was destroyed by blight.]]",
          "Full marks. You covered all three levels and a clear example.",
        ],
        [
          "full",
          "[[0|Genetic diversity is differences among individuals of one species.]] [[1|Species diversity is the richness and evenness of species, and ecosystem diversity is the range of habitats in a region.]] [[2|With clones, if one is susceptible they all are, so a pathogen spreads freely.]] [[3|In 1970, a corn leaf blight hit the US corn crop because most hybrids shared the same susceptible cytoplasm.]]",
          "All four marks. The corn blight is an excellent American example.",
        ],
        [
          "partial",
          "[[0|Genetic diversity is variation of genes in a species.]] [[3|The potato famine happened with a monoculture.]]",
          "Define the other two levels of diversity and explain why the uniform crop is at risk.",
        ],
        [
          "partial",
          "[[1|Species diversity is the number of species.]] [[2|A monoculture is at risk because a disease affects all the plants.]] Ecosystem diversity is the number of animals.",
          "Ecosystem diversity is the variety of habitats and communities, not the number of animals.",
          true,
        ],
        [
          "weak",
          "Biodiversity just means lots of animals. A monoculture is safe because it is easy to take care of.",
          "Biodiversity has three levels. A uniform crop is vulnerable because no individuals have resistance.",
        ],
        [
          "weak",
          "[[0|Genetic diversity is variation of genes.]] The Irish potato famine was caused by too many different potato varieties.",
          "The famine happened because a few similar varieties were planted widely, so a blight could destroy them all.",
        ],
      ],
    },
  ],
  practical: {
    title: "Light and dark bottle measurement of production",
    instructions:
      "Fill three BOD bottles with pond water containing algae. Measure the initial dissolved oxygen in one. Seal one clear bottle and one foil-wrapped bottle and incubate under a lamp for 24 hours. Measure the oxygen in each at the end, and calculate NPP, respiration and GPP. Compare results with a bottle placed at a lower light intensity.",
    steps: [
      ["Collect pond or aquarium water gently, avoiding bubbles, and fill three bottles to overflowing."],
      ["Immediately measure the dissolved oxygen in the initial bottle with the test kit or sensor."],
      ["Wrap the second bottle fully in foil and leave the third one clear. Place both under the lamp at the same distance.", "Keep the lamp away from the water and wet surfaces."],
      ["After 24 hours measure the dissolved oxygen in each bottle."],
      ["Calculate NPP (light minus initial), respiration (initial minus dark) and GPP (light minus dark)."],
      ["Write a conclusion on what the results show about the productivity of the water sample."],
    ],
    rubric: [
      ["Method: controls for temperature and time, careful sampling", 4],
      ["Data and calculations: correct NPP, respiration and GPP with units", 4],
      ["Conclusion: interprets production and notes limitations", 4],
    ],
    writeUps: [
      [
        "full",
        "The initial dissolved oxygen was 7.8 mg/L. After 24 hours the light bottle was 9.6 mg/L and the dark bottle was 6.2 mg/L. NPP was 9.6 minus 7.8, or 1.8 mg/L. Respiration was 7.8 minus 6.2, or 1.6 mg/L. GPP was 9.6 minus 6.2, or 3.4 mg/L, which equals 1.8 plus 1.6. About 47 percent of the gross production was used by the algae's respiration. The water sample is productive, but its NPP depends on light and nutrients. A limitation is that the bottle contains only algae and bacteria, not larger plants.",
        [4, 4, 4],
        "An excellent report: careful method, accurate calculations, and an interpretation that includes a limitation.",
      ],
      [
        "full",
        "Method: three bottles from one sample, kept at the same temperature, the dark one wrapped in foil, incubated for 24 hours. Results: initial 8.0, light 9.8, dark 6.4 mg/L. NPP = 1.8, R = 1.6, GPP = 3.4 mg/L. The light bottle at lower intensity had an NPP of 0.7 mg/L, which shows that light limits the rate. A limitation of the method is that the oxygen test kit is accurate only to about 0.2 mg/L.",
        [4, 4, 3],
        "Very good. For a stronger conclusion, say what this means for the food web of the pond.",
      ],
      [
        "partial",
        "We measured the oxygen at the start and after 24 hours. Starting oxygen was 7.8. In the light bottle it went up to 9.6 and in the dark bottle it went down to 6.2. NPP is 1.8 mg/L. I did not calculate respiration or GPP, but I think that the pond water has a lot of algae and so is productive.",
        [3, 2, 1],
        "Calculate respiration and GPP as well, and use all three numbers in your conclusion.",
      ],
      [
        "partial",
        "NPP is 1.8, respiration is 1.6 and GPP is 3.4 mg/L. These are all calculated from the three oxygen readings. We put both bottles under the lamp, but one bottle was closer to the lamp than the other, which could affect the results. I do not know what this means for the pond because I did not write a conclusion.",
        [2, 4, 1],
        "Your calculations are correct. Keep the bottles at the same distance from the lamp, and add a conclusion about the productivity of the pond.",
      ],
      [
        "weak",
        "We put pond water in bottles and left them under a light. Some of the water turned green. The dark bottle was boring because we could not see inside. The oxygen went up in one and down in the other. I think the experiment worked well and the results show the pond is healthy.",
        [1, 0, 0],
        "Give the oxygen readings and calculate NPP, respiration and GPP. Say what the results show about production.",
      ],
      [
        "weak",
        "The dark bottle measured photosynthesis because it was kept in the dark so the plants made food all night. The light bottle measured respiration. The GPP is the light bottle plus the dark bottle, which was 9.6 plus 6.2, so it is 15.8 mg/L for the pond water that we collected.",
        [1, 1, 0],
        "It is the other way round: the dark bottle shows respiration alone. GPP is light minus dark, 3.4 mg/L.",
      ],
    ],
  },
};

const w3: WeekInput = {
  topic: "Ecosystem services, habitat loss and invasive species",
  note: `
## Objectives

Students will be able to:

1. explain how ecosystem services benefit people;
2. describe the causes of habitat loss and the effects of invasive species.

## Materials

Case study cards (Lake Erie wetlands, emerald ash borer, zebra mussels), maps of Ohio land cover, a service-value table, the worksheet.

## Starter (6 minutes)

Ask: "What does a wetland do for the city of Toledo that costs the city nothing? What would it cost to replace it?" Discuss water filtration and flood control.

## Main activity

1. Four categories of ecosystem services: provisioning (food, water, timber), regulating (flood control, water purification, climate), cultural (recreation, spiritual) and supporting (nutrient cycling, soil formation). Examples from Ohio: pollination of crops by bees, water filtration by wetlands, forests of Hocking Hills.
2. Habitat loss: conversion to agriculture and development (Ohio lost about 90 percent of its original wetlands), fragmentation and its effects on movement and edge effects.
3. Invasive species: characteristics (fast reproduction, no predators), pathways of introduction, and impacts: emerald ash borer (millions of ash trees lost), zebra mussels (filter plankton, clog pipes) and Asian carp (a threat to the Great Lakes).
4. Compare control strategies: prevention, biological, chemical and physical.

## Checking for understanding

Ask: "Why does an invasive species often spread faster in a new range than it did in its home range?"

## Worksheet

Classification of services, a habitat fragmentation calculation, and an invasive species case.
`,
  reading: [
    "What nature does for us, and what is taking it apart",
    `
Natural ecosystems perform work that people depend on, and economists call these **ecosystem services**. **Provisioning services** are products such as food, fresh water, timber and fiber. **Regulating services** moderate natural processes: wetlands absorb floodwater and filter pollutants from runoff, forests store carbon and cool the air, and insects pollinate crops. **Cultural services** include recreation, tourism and the spiritual value people find in nature, like hiking the Hocking Hills. **Supporting services**, such as nutrient cycling, soil formation and photosynthesis, underlie all the others. Because these services are often free, they are not counted in markets, and the cost of losing them is only noticed when they must be replaced by technology. New York City famously found that protecting the watershed in the Catskills cost far less than building a filtration plant. Wild and managed bees pollinate crops worth billions of dollars in the United States each year.

The greatest threat to biodiversity is **habitat loss**. In Ohio, farmland, cities and roads have replaced about 90 percent of the original wetlands, including most of the Great Black Swamp that once covered northwest Ohio, and less than 5 percent of the original prairie remains. Remaining habitat is often broken into small patches, called **fragmentation**. Fragments hold fewer species because they support smaller populations, which are more prone to extinction. Roads block movement. A fragment has more **edge**, where the conditions of light, wind and predators differ from the interior. Species that need interior forest, like some warblers, suffer. Corridors of habitat that connect fragments can reduce these effects.

An **invasive species** is a non-native species that spreads and causes harm. Invasive species often reproduce quickly, tolerate a wide range of conditions and lack natural predators and diseases in the new range. The **emerald ash borer**, a beetle from Asia first found near Detroit in 2002, has killed hundreds of millions of ash trees across North America, including most of Ohio's ash. **Zebra mussels**, carried into the Great Lakes in the ballast water of ships in the 1980s, filter enormous volumes of plankton out of the water, altering the food web, and clog the intake pipes of water plants. **Asian carp** are moving up the Mississippi system, and officials have built electric barriers to prevent them from reaching the Great Lakes. Control is difficult and expensive once a species is established. Prevention, such as inspecting boats and regulating ballast water, is much cheaper. Biological control, importing a natural enemy, can work but carries the risk that the control agent becomes a pest itself.
`,
  ],
  cards: [
    ["Ecosystem service", "A benefit that people obtain from natural ecosystems."],
    ["Provisioning service", "A product from ecosystems such as food, water or timber."],
    ["Regulating service", "A natural process that moderates conditions, such as flood control."],
    ["Habitat fragmentation", "Breaking up of a large habitat into smaller isolated patches."],
    ["Edge effect", "Changed conditions at the boundary of a habitat patch."],
    ["Invasive species", "A non-native species that spreads and causes harm."],
    ["Emerald ash borer", "An invasive beetle that has killed hundreds of millions of ash trees."],
    ["Ballast water", "Water carried by ships to stabilize them, a pathway for invasive species."],
  ],
  closed: [
    [
      "A wetland filtering pollutants from runoff is an example of a:",
      ["Provisioning service", "Regulating service", "Cultural service", "Supporting service"],
      "B",
    ],
    [
      "Which is a pathway by which zebra mussels reached the Great Lakes?",
      ["Wind", "Ship ballast water", "Bird migration", "Deliberate planting"],
      "B",
    ],
    [
      "Habitat fragmentation harms species mainly because it:",
      ["Increases the interior habitat", "Creates small, isolated populations", "Removes all predators", "Raises sea level"],
      "B",
    ],
    [
      "Which factor helps an invasive species spread rapidly?",
      ["Many natural predators", "Lack of natural predators and diseases in the new range", "A very small reproductive rate", "A need for specific food"],
      "B",
    ],
    [
      "Why is prevention usually the best strategy against invasive species?",
      ["It is cheaper than control after establishment", "It always eradicates them", "It requires no effort", "It has no side effects"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the loss of wetlands in northwest Ohio contributes to both flooding and the algal blooms in western Lake Erie, naming the ecosystem services lost.",
      scheme: [
        "Names flood control (water storage) as a regulating service of wetlands",
        "States that without wetlands, rain runs off faster, increasing flooding",
        "Names water filtration (nutrient removal) as a regulating service",
        "States that without wetlands, phosphorus and nitrogen in runoff reach the lake and fuel algal blooms",
      ],
      model:
        "Wetlands store floodwater, a regulating service. When wetlands are drained, rain runs off quickly, which increases flooding. Wetlands also filter water, absorbing nutrients such as phosphorus and nitrogen. Without them, the nutrients in farm runoff flow directly into Lake Erie and fuel algal blooms.",
      answers: [
        [
          "full",
          "[[0|Wetlands soak up and store floodwater, which is a regulating service.]] [[1|Without them rain runs off faster so there is more flooding.]] [[2|They also filter the water and take up nutrients.]] [[3|When they're gone, the phosphorus and nitrogen from farm fields go straight into the lake and cause algal blooms.]]",
          "Full marks. Both consequences come from the loss of the same regulating services.",
        ],
        [
          "full",
          "[[0|Flood control is a regulating service wetlands provide by holding water.]] [[1|Draining them lets runoff reach rivers quickly, raising flood peaks.]] [[2|Another regulating service is water purification, since plants and microbes remove nutrients.]] [[3|Without that filter, fertilizer nutrients reach Lake Erie and fuel blooms of cyanobacteria.]]",
          "All four marks, with accurate processes.",
        ],
        [
          "partial",
          "[[0|Wetlands store floodwater.]] [[2|They filter nutrients.]]",
          "Explain what happens when the wetlands are lost, in terms of flooding and algal blooms.",
        ],
        [
          "partial",
          "[[1|Without wetlands there is more flooding.]] [[3|Nutrients cause blooms.]] The wetlands provide provisioning services like clean water.",
          "Flood control and filtration are regulating services. Provisioning services are products, such as food.",
          true,
        ],
        [
          "weak",
          "The loss of wetlands means that there are fewer ducks, and this causes flooding because the ducks used to eat the extra water.",
          "Wetlands store water and filter nutrients. Ducks are not responsible for the flood control.",
        ],
        [
          "weak",
          "[[2|Wetlands filter water.]] Algal blooms happen because there are too few algae to feed the fish after the wetlands are lost.",
          "Blooms are caused by too many nutrients, not too few algae. Wetlands used to remove them.",
        ],
      ],
    },
    {
      prompt:
        "Compare two strategies for managing an invasive species such as the emerald ash borer: prevention and biological control. Give an advantage and a risk for each.",
      scheme: [
        "Describes prevention, such as quarantine or inspection and restricting firewood movement",
        "Gives an advantage of prevention, such as it is cheaper than controlling an established pest",
        "Describes biological control, such as releasing a parasitoid wasp from the beetle's native range",
        "Gives a risk of biological control, such as the control agent attacking non-target species or becoming a pest",
      ],
      model:
        "Prevention includes inspecting shipments and restricting the movement of firewood. Its advantage is that it is much cheaper than managing an established pest. Biological control involves releasing a natural enemy, such as a parasitoid wasp from the borer's native range. It can reduce the pest over a large area, but there is a risk that the control agent will attack non-target species or become a pest itself.",
      answers: [
        [
          "full",
          "[[0|Prevention means things like inspecting shipping crates and not moving firewood between areas.]] [[1|It's much cheaper than trying to control the pest after it has spread.]] [[2|Biological control uses a natural enemy, such as a parasitic wasp from the borer's home range.]] [[3|The risk is that the enemy might attack other species or become a pest itself.]]",
          "Full marks. Each strategy has a description, an advantage or a risk.",
        ],
        [
          "full",
          "[[0|Prevention: quarantines and bans on moving ash wood.]] [[1|The advantage is cost, since stopping an introduction costs less than fighting an established population.]] [[2|Biocontrol: releasing parasitoid wasps that attack the ash borer larvae.]] [[3|A risk is that non-target insects may be harmed, as happened with some earlier introductions.]]",
          "All four marks, in a compact form.",
        ],
        [
          "partial",
          "[[0|Prevention is inspecting wood.]] [[2|Biological control is introducing a natural enemy.]]",
          "Give an advantage of prevention and a risk of biological control.",
        ],
        [
          "partial",
          "[[1|Prevention is cheaper.]] [[3|Biological control might harm other species.]] Prevention eradicates the beetle where it is established.",
          "Prevention only stops new introductions. Eradicating an established pest needs control methods.",
          true,
        ],
        [
          "weak",
          "Both strategies are the same, since they both try to get rid of the beetle, and neither has a disadvantage.",
          "The two strategies work at different stages and have different risks and costs.",
        ],
        [
          "weak",
          "[[2|Biological control uses a natural enemy.]] The risk is that the natural enemy is too weak to eat the ash borer.",
          "The risk of biological control is that the introduced enemy attacks other species.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Succession and population growth calculations",
  note: `
## Objectives

Students will be able to:

1. explain ecological succession and how a disturbance changes a community;
2. calculate population growth rate and doubling time.

## Materials

Photographs of an abandoned Ohio field at 1, 10, 40 and 100 years, Mount St. Helens case study, calculators, the quiz.

## Starter (6 minutes)

Show a photo of a field that was a farm 40 years ago and is now shrubs and young trees. Ask: "What will it be in 100 years? What happened in between?"

## Main activity

1. Primary succession (bare rock, lava, glacier retreat: lichens, mosses, soil building, grasses, shrubs, trees) versus secondary succession (after fire, abandoned field: grasses, shrubs, pine, hardwoods). Pioneer species, climax community, and how disturbance resets succession. Intermediate disturbance and diversity.
2. Population growth rate: growth rate (%) = [(births + immigration) - (deaths + emigration)] / population x 100. Work an example: a town of 50,000 has 800 births, 500 deaths, 300 immigrants and 100 emigrants. Net change 500, growth rate 1.0 percent.
3. The rule of 70: doubling time = 70 / growth rate (%). At 1.0 percent, 70 years; at 2.0 percent, 35 years.

## Checking for understanding

Ask: "Which type of succession happens faster, and why?"

## Quiz

Five questions on succession and calculations.
`,
  reading: [
    "How communities rebuild, and how populations grow",
    `
Communities change over time through **ecological succession**. In **primary succession**, life begins on a surface with no soil, such as new volcanic rock, a retreating glacier or bare rock exposed by a landslide. **Pioneer species**, such as lichens and mosses, break down the rock and add organic matter. Over many decades, soil forms, and grasses, shrubs and then trees can establish. The process may take centuries. In **secondary succession**, a disturbance, such as a fire, a flood, a storm or farming, destroys the existing community but leaves the soil in place, with seeds and roots in it. Recovery is much faster. An abandoned Ohio cornfield first fills with weeds and grasses, then with shrubs and fast-growing trees like cherry and pine, and after about a century, with a forest of oak and hickory, a **climax community** that is stable until the next disturbance. Early successional species grow quickly and need full sun. Later species tolerate shade and live longer. After a major disturbance, such as the 1980 eruption of Mount St. Helens, scientists saw life return first from survivors under the snow and in the soil, then from windblown seeds. Moderate or intermediate disturbance often supports the highest diversity, since it creates patches at different stages.

Population change can be calculated. Population growth rate is the net change in population as a percent: growth rate = [(births + immigration) minus (deaths + emigration)] divided by the population, times 100. Take a town of 50,000 with 800 births, 500 deaths, 300 immigrants and 100 emigrants in a year. The net change is (800 + 300) minus (500 + 100) = 500. The growth rate is 500/50,000 times 100, which is 1.0 percent per year. Use the **rule of 70** to estimate the **doubling time**: doubling time in years equals 70 divided by the growth rate in percent. At 1.0 percent, the town would double in 70 years. At 2.0 percent, it would take 35 years; at 0.5 percent, 140 years. The rule works for anything that grows at a steady percentage, including money in a bank account. Because growth is exponential, even small percentages produce big increases over time, which matters for human population, resource use and the spread of an invasive species.

Notice that growth rate includes migration. A country with a birth rate lower than its death rate may still grow if immigration is high. The natural rate of increase counts only births and deaths. Using the correct components is the first step in any population calculation.
`,
  ],
  cards: [
    ["Primary succession", "Colonization of a surface with no soil, such as new rock."],
    ["Secondary succession", "Recovery of a community after a disturbance that leaves the soil intact."],
    ["Pioneer species", "Early colonizers of disturbed or new habitats, such as lichens."],
    ["Climax community", "A relatively stable community at the end of succession."],
    ["Population growth rate", "Net change in population as a percent of the population."],
    ["Rule of 70", "Doubling time in years is about 70 divided by the growth rate in percent."],
    ["Natural rate of increase", "Growth from births minus deaths only, without migration."],
    ["Intermediate disturbance", "Moderate disturbance that can maintain high diversity."],
  ],
  closed: [
    [
      "Which of these is an example of primary succession?",
      ["Regrowth after a forest fire", "An abandoned farm field", "Lichens colonizing newly formed lava rock", "Regrowth after a tornado"],
      "C",
    ],
    [
      "A population of 50,000 has 800 births, 500 deaths, 300 immigrants and 100 emigrants. The growth rate is:",
      ["0.5%", "1.0%", "1.6%", "2.2%"],
      "B",
    ],
    [
      "By the rule of 70, a population growing at 2% a year doubles in:",
      ["14 years", "35 years", "70 years", "140 years"],
      "B",
    ],
    [
      "Why is secondary succession faster than primary succession?",
      ["Soil and seeds are already present", "There are no pioneer species", "The climate is warmer", "Animals plant the trees"],
      "A",
    ],
    [
      "Which of these is a pioneer species?",
      ["Oak tree", "Lichen", "Hickory tree", "Deer"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A town has a population of 40,000. In one year there are 600 births, 400 deaths, 500 immigrants and 300 emigrants. Calculate the growth rate and the doubling time, and explain why the growth rate is different from the natural rate of increase.",
      scheme: [
        "Calculates the net change as (600 + 500) - (400 + 300) = 400",
        "Calculates the growth rate as 400/40,000 = 1.0 percent",
        "Calculates the doubling time as 70/1.0 = 70 years",
        "Explains that the natural rate of increase uses only births and deaths (0.5 percent), while growth rate also includes migration",
      ],
      model:
        "Net change = (600 + 500) minus (400 + 300) = 400. The growth rate is 400/40,000 times 100 = 1.0 percent. The doubling time is 70/1.0 = 70 years. The natural rate of increase counts only births minus deaths, which is 200/40,000 = 0.5 percent. The growth rate is higher because net immigration adds to it.",
      answers: [
        [
          "full",
          "[[0|Net change = (600 + 500) − (400 + 300) = 400.]] [[1|400/40,000 × 100 = 1.0% growth rate.]] [[2|Doubling time = 70/1.0 = 70 years.]] [[3|The natural rate of increase only uses births and deaths, which is 0.5%, so the growth rate is higher because of net immigration.]]",
          "Full marks. Separating natural increase from migration is an important distinction.",
        ],
        [
          "full",
          "[[0|Births plus immigrants is 1100; deaths plus emigrants is 700; the net is +400.]] [[1|Growth rate = 1.0% per year.]] [[2|By the rule of 70 it doubles in 70 years.]] [[3|Natural increase is just births minus deaths: 0.5%. The other 0.5% comes from migration.]]",
          "All four marks, with a clear breakdown.",
        ],
        [
          "partial",
          "[[0|The net change is 400.]] [[1|The growth rate is 1.0%.]] The doubling time is 100 years.",
          "Use the rule of 70: 70 divided by 1.0 is 70 years.",
        ],
        [
          "partial",
          "[[2|It doubles in 70 years.]] [[3|The natural rate uses just births and deaths.]]",
          "Good. Show the net change and the growth rate calculation as well.",
          true,
        ],
        [
          "weak",
          "600 − 400 = 200, so the growth rate is 200% and the doubling time is 70/200.",
          "Include both migration and natural change in the net, and divide by the population before converting to a percent.",
        ],
        [
          "weak",
          "[[1|1.0% growth rate.]] The natural rate of increase is the same thing as the growth rate because they both describe the population.",
          "They are different: the natural rate excludes migration. Here it is 0.5 percent.",
        ],
      ],
    },
    {
      prompt:
        "Compare primary and secondary succession, giving an example of each, and explain how a moderate disturbance such as a windstorm in a forest can increase biodiversity.",
      scheme: [
        "Describes primary succession as starting from bare rock without soil, with an example such as lava or a retreating glacier",
        "Describes secondary succession as occurring after a disturbance that leaves the soil, with an example such as an abandoned field",
        "States that secondary succession is faster because soil and seeds are present",
        "Explains that a moderate disturbance creates patches at different stages (gaps with sunlight), so more species can live in the landscape",
      ],
      model:
        "Primary succession begins on bare rock with no soil, such as new lava or ground exposed by a retreating glacier. Secondary succession follows a disturbance that leaves the soil, such as an abandoned field. It is faster because soil and seeds are present. A moderate disturbance such as a windstorm creates gaps with sunlight, producing patches at different stages of succession, so more species can live in the landscape.",
      answers: [
        [
          "full",
          "[[0|Primary succession starts on bare rock with no soil, like new lava.]] [[1|Secondary succession happens after a disturbance leaves the soil, like an abandoned field.]] [[2|Secondary is faster because the soil and seeds are already there.]] [[3|A windstorm makes sunny gaps, so you get patches at different stages and more species in the forest overall.]]",
          "Full marks. The intermediate disturbance idea is applied to a clear example.",
        ],
        [
          "full",
          "[[0|Primary: lichens colonize bare rock, eventually making soil.]] [[1|Secondary: a farm field left alone is recolonized by weeds, shrubs and trees.]] [[2|Secondary happens in decades, not centuries, since soil and seed banks survive.]] [[3|Moderate disturbance creates a mosaic of habitat patches in different stages, so diversity is higher than in a uniform mature forest.]]",
          "All four marks, with the mosaic concept.",
        ],
        [
          "partial",
          "[[0|Primary starts with no soil.]] [[1|Secondary happens in an abandoned field.]]",
          "Say why secondary succession is faster and explain how a moderate disturbance can raise diversity.",
        ],
        [
          "partial",
          "[[2|Soil is already there in secondary succession.]] [[3|A windstorm makes gaps and more species.]] Primary succession happens after a fire.",
          "After a fire, soil remains, so that is secondary succession. Primary succession needs bare rock with no soil.",
          true,
        ],
        [
          "weak",
          "Primary succession is the first time a forest grows and secondary is the second time. A windstorm destroys everything and reduces diversity.",
          "The difference is whether soil is present. A moderate disturbance creates a mosaic of patches, which increases diversity.",
        ],
        [
          "weak",
          "[[1|Secondary succession occurs in an abandoned field.]] A windstorm increases diversity because it brings in new species from the wind itself.",
          "The windstorm creates gaps and patches at different stages, which allows more species to coexist.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Population growth models, life history strategies and human demography",
  note: `
## Objectives

Students will be able to:

1. compare exponential and logistic growth and explain carrying capacity;
2. distinguish r-selected and K-selected species and read age structure diagrams;
3. explain how human population growth is affected by fertility, mortality and development.

## Materials

Graph paper, data of deer population in an Ohio park, age structure diagrams of Nigeria, the United States and Japan, the problem set.

## Starter (6 minutes)

Show a graph of the white-tailed deer population in Ohio over a century: near zero in 1900, a sharp rise and a leveling off. Ask: "What limited the population, and what shape of growth do you see?"

## Main activity

1. Exponential growth (J-curve) versus logistic growth (S-curve) with a carrying capacity K. Density-dependent factors (disease, competition, predation) and density-independent factors (weather, fire).
2. r-selected species (many small offspring, little parental care, rapid maturity, e.g., dandelions, mice) versus K-selected species (few large offspring, much parental care, e.g., elephants, humans). Type I, II and III survivorship curves.
3. Age structure diagrams: expanding (wide base), stable, and shrinking (narrow base). Demographic transition model and the total fertility rate (replacement is about 2.1). Effects of education of women, access to contraception, infant mortality and wealth.

## Checking for understanding

Ask: "What happens to a population that overshoots its carrying capacity?"

## Problem set

Growth curve interpretation, a classification of species, and an age structure analysis.
`,
  reading: [
    "Limits to growth, and the shape of a human population",
    `
When resources are plentiful, a population can grow **exponentially**: the number of new individuals each year is proportional to the number already there, so the growth accelerates, plotted as a J-shaped curve. This cannot last. Food, space, water or other resources run short, and growth slows. A realistic model is **logistic growth**: the population rises rapidly at first, then levels off at the **carrying capacity (K)**, the largest population the environment can support indefinitely. The curve is S-shaped. Factors that limit growth fall into two groups. **Density-dependent factors**, such as competition, predation, disease and waste accumulation, have a greater effect as the population becomes more crowded. **Density-independent factors**, such as a severe winter, a flood or a fire, affect a population regardless of its size. If a population overshoots K, for example because of a mild winter, it often crashes. White-tailed deer in Ohio were nearly eliminated by 1900 through hunting and habitat loss, then recovered with protection and are now at a population that often exceeds what the land can support in the absence of predators.

Species differ in their **life history strategies**. **R-selected species** live in unstable or unpredictable environments and put their energy into rapid reproduction: they mature early, produce many small offspring and give little parental care. Mice, dandelions and many insects are examples, and their survivorship curve shows high mortality early in life (Type III). **K-selected species** live in stable environments near carrying capacity and invest in few, large offspring with extensive parental care, such as elephants and humans (Type I survivorship, with most deaths at old age). Most species fall between the extremes.

Human populations can be studied by **age structure diagrams**. A pyramid with a wide base, as in Nigeria, shows many children and an expanding population with strong momentum, even if the fertility rate falls. A column with similar widths, as in the United States, shows a more stable population. A narrow base with a wide top, as in Japan, shows a shrinking and aging population. The **total fertility rate (TFR)**, the average number of children per woman, must be about 2.1 for a population to replace itself, a little over two because some children die before reproducing.

The **demographic transition model** describes how birth and death rates change with development. In stage 1, both are high and growth is slow. In stage 2, death rates fall with better food and medicine while birth rates stay high, so the population grows quickly. In stage 3, birth rates fall, and in stage 4, both are low and growth is slow. Factors that lower fertility include education of women, access to contraception, lower infant mortality and urbanization, and the rising costs of raising children.
`,
  ],
  cards: [
    ["Exponential growth", "Growth in which the rate is proportional to the population size, giving a J-shaped curve."],
    ["Logistic growth", "Growth that slows and levels off at the carrying capacity, giving an S-shaped curve."],
    ["Carrying capacity (K)", "The largest population an environment can support indefinitely."],
    ["Density-dependent factor", "A limit whose effect increases as the population becomes denser."],
    ["r-selected species", "A species with many offspring, little parental care and rapid maturity."],
    ["K-selected species", "A species with few offspring, much parental care and slow maturity."],
    ["Total fertility rate", "The average number of children born per woman."],
    ["Demographic transition", "The shift from high to low birth and death rates as a country develops."],
  ],
  closed: [
    [
      "An S-shaped growth curve that levels off represents:",
      ["Exponential growth", "Logistic growth", "Negative growth", "Linear growth"],
      "B",
    ],
    [
      "Which of these is a density-dependent limiting factor?",
      ["A wildfire", "A hurricane", "Disease spreading in crowded deer", "A volcanic eruption"],
      "C",
    ],
    [
      "Which species would be classified as K-selected?",
      ["Dandelion", "House mouse", "African elephant", "Mosquito"],
      "C",
    ],
    [
      "An age structure diagram with a very wide base indicates:",
      ["A shrinking population", "A rapidly expanding population", "A stable population", "An aging population"],
      "B",
    ],
    [
      "The replacement fertility rate is about:",
      ["1.0", "2.1", "3.5", "5.0"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare the age structure diagrams of Nigeria (wide base), the United States (nearly vertical sides) and Japan (narrow base). Predict the future growth of each and explain what is meant by population momentum.",
      scheme: [
        "States that Nigeria's wide base indicates an expanding population",
        "States that the United States's nearly vertical sides indicate a stable or slowly growing population",
        "States that Japan's narrow base indicates a shrinking and aging population",
        "Explains that momentum means a population with many young people keeps growing as they reach reproductive age, even if fertility falls",
      ],
      model:
        "Nigeria's wide base shows a large proportion of children, so the population will keep expanding. The United States has nearly vertical sides, which shows a stable or slowly growing population. Japan has a narrow base and a wide top, so it is shrinking and aging. Population momentum means that a population with many young people will keep growing as they reach reproductive age, even if fertility falls to replacement level.",
      answers: [
        [
          "full",
          "[[0|Nigeria has a wide base so it's an expanding population.]] [[1|The United States has nearly vertical sides, so it's more or less stable with slow growth.]] [[2|Japan has a narrow base and a wide top, so it's aging and shrinking.]] [[3|Population momentum is when a young population keeps growing as the many children reach reproductive age, even if fertility falls.]]",
          "Full marks. Each diagram is read correctly, and momentum is explained.",
        ],
        [
          "full",
          "[[0|Nigeria: broad base means rapid growth.]] [[1|US: a rectangle, so roughly stable, with immigration adding growth.]] [[2|Japan: inverted base, low births, and many elderly, so the population will decline.]] [[3|Momentum means that because there are so many young people, the population will grow for decades even if each woman has fewer children.]]",
          "All four marks, with an excellent point about immigration in the United States.",
        ],
        [
          "partial",
          "[[0|Nigeria is expanding.]] [[2|Japan is shrinking.]]",
          "Describe the United States's diagram and explain what is meant by population momentum.",
        ],
        [
          "partial",
          "[[1|The US is stable.]] [[3|Momentum means that the population grows because people live longer.]]",
          "Momentum comes from the large number of young people entering the reproductive years, not from lifespan.",
          true,
        ],
        [
          "weak",
          "Nigeria has the most old people, and Japan has the most children, so Japan will grow the fastest.",
          "A wide base means many children. Nigeria's population is young, and Japan's is old.",
        ],
        [
          "weak",
          "[[2|Japan has a narrow base.]] Population momentum is the speed at which a population moves from one country to another.",
          "Momentum is continued growth because of a large young population, not migration.",
        ],
      ],
    },
    {
      prompt:
        "A deer population in a park grows from 100 to 800 in 10 years, then levels off near 1000 for the next 10 years. Describe the growth model that fits, identify the carrying capacity, and explain two limiting factors, one density-dependent and one density-independent.",
      scheme: [
        "Identifies the pattern as logistic growth (S-curve), after an early exponential phase",
        "Identifies the carrying capacity as about 1000 deer",
        "Gives a density-dependent factor, such as competition for food or disease in crowded deer",
        "Gives a density-independent factor, such as a severe winter, and explains the difference",
      ],
      model:
        "The pattern fits logistic growth: an early rapid, nearly exponential phase, then a leveling off. The carrying capacity is about 1000 deer. A density-dependent factor is competition for food, which becomes more intense as the herd grows. A density-independent factor is a severe winter, which can kill deer regardless of how crowded they are.",
      answers: [
        [
          "full",
          "[[0|It's logistic growth, an S-curve, with fast growth first and then leveling off.]] [[1|The carrying capacity is about 1000 deer.]] [[2|Competition for food is density-dependent since it gets worse as there are more deer.]] [[3|A severe winter is density-independent, since it kills deer whatever the population density.]]",
          "Full marks. You distinguished the two types of limiting factor by their dependence on density.",
        ],
        [
          "full",
          "[[0|The curve is S-shaped, which is logistic growth.]] [[1|K is about 1000.]] [[2|Disease spreads faster in crowded herds, so it is density-dependent.]] [[3|A drought or harsh winter affects them regardless of their number, so it's density-independent.]]",
          "All four marks, with a clear contrast.",
        ],
        [
          "partial",
          "[[0|Logistic growth.]] [[1|K is 1000.]]",
          "Give an example of a density-dependent and a density-independent factor and explain the difference.",
        ],
        [
          "partial",
          "[[2|Competition for food is density-dependent.]] [[3|A fire is density-independent.]] The growth is exponential because it goes up quickly.",
          "Exponential growth does not level off. A leveling population is logistic.",
          true,
        ],
        [
          "weak",
          "The growth is exponential because deer reproduce quickly, and the carrying capacity is 100 because that is the starting number.",
          "The population leveled off near 1000, which is the carrying capacity. A leveling curve is logistic, not exponential.",
        ],
        [
          "weak",
          "[[1|The carrying capacity is about 1000.]] Disease is density-independent because it can strike any deer.",
          "Disease usually spreads faster in a crowded population, which makes it density-dependent.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Earth's structure, plate tectonics and soil",
  note: `
## Objectives

Students will be able to:

1. describe the layers of the Earth and plate tectonics;
2. explain how soils form and how soil properties affect agriculture.

## Materials

Models of Earth layers, a map of plates and boundaries, soil samples from a farm field and a forest, jars, water, a ruler, pH paper, the worksheet.

## Starter (6 minutes)

Ask: "Ohio doesn't have volcanoes or major earthquakes, but it does have a fault zone near Anna. Why is Ohio far from a plate boundary?" Discuss plate locations.

## Main activity

1. Layers of the Earth: crust (continental and oceanic), mantle (asthenosphere and lithosphere), outer core (liquid) and inner core (solid). Evidence from seismic waves.
2. Plate tectonics: divergent, convergent and transform boundaries; volcanoes, earthquakes, mountain building, ocean trenches. Hot spots.
3. Soil formation: parent material, climate, organisms, topography and time. Horizons O, A, B, C. Ohio's soils formed from glacial till and are fertile, as in the former Great Black Swamp.
4. Soil properties: texture (sand, silt, clay), the jar settling test, water holding capacity, drainage, pH and organic matter. Erosion and conservation (no-till, cover crops, terraces).

## Checking for understanding

Ask: "Which soil horizon is richest in organic matter, and why?"

## Worksheet

Boundary identification, a soil horizon diagram, and a texture analysis from the jar test.
`,
  reading: [
    "The ground beneath: planet and soil",
    `
The Earth has layers that we know from the way seismic waves from earthquakes travel through it. The **crust** is the thin, rocky outer layer: thin and dense under the oceans and thicker and lighter under the continents. Below it is the **mantle**, hot solid rock that flows very slowly. The uppermost mantle and the crust together form the rigid **lithosphere**, which floats on the softer **asthenosphere**. The **outer core** is liquid iron and nickel, and its motion generates Earth's magnetic field. The **inner core** is solid because of the great pressure.

The lithosphere is broken into **tectonic plates** that move a few centimeters a year, driven by convection in the mantle. At **divergent boundaries**, plates move apart, and new crust forms, as at the Mid-Atlantic Ridge. At **convergent boundaries**, plates collide: when oceanic crust meets continental crust, the denser oceanic plate sinks in a subduction zone, which produces deep trenches, volcanoes and earthquakes, as along the Pacific coast of North America. When two continents collide, mountains rise, like the Himalayas. At **transform boundaries**, plates slide past each other, as along the San Andreas Fault in California, which causes earthquakes. Ohio is in the middle of the North American plate, far from the boundaries, so major quakes are rare, though small ones occur.

**Soil** forms slowly from the weathering of parent rock together with organic matter, influenced by climate, organisms, topography and time. A mature soil has layers called **horizons**. The **O horizon** at the surface is organic litter. The **A horizon**, topsoil, is a mix of minerals and humus, rich in organisms, and the most important for crops. The **B horizon**, subsoil, accumulates minerals leached from above. The **C horizon** is weathered parent material, above the bedrock. Ohio's soils formed mostly from material left by glaciers, and the former Great Black Swamp in northwest Ohio, once drained, became some of the state's most fertile farmland.

Soil properties determine what it can grow. **Texture** is the proportion of sand (coarse), silt and clay (fine). Sandy soil drains quickly and holds few nutrients. Clay holds water and nutrients but drains poorly and can become waterlogged. **Loam**, a mix, is ideal. A simple jar test measures texture: shake soil in water and let it settle; sand settles in seconds, silt in minutes, and clay in hours. Soil **pH** affects nutrient availability, and most crops prefer a pH between 6 and 7. Organic matter improves structure and water holding capacity. Erosion by wind and water removes topsoil faster than it forms. Conservation methods such as no-till farming, cover crops, contour plowing and terraces reduce erosion.
`,
  ],
  cards: [
    ["Lithosphere", "The rigid outer layer of the Earth, including the crust and uppermost mantle."],
    ["Asthenosphere", "The softer, slowly flowing part of the mantle beneath the lithosphere."],
    ["Divergent boundary", "A plate boundary where plates move apart and new crust forms."],
    ["Convergent boundary", "A plate boundary where plates collide."],
    ["Transform boundary", "A plate boundary where plates slide past each other."],
    ["Subduction zone", "Where a denser oceanic plate sinks beneath another plate."],
    ["A horizon (topsoil)", "The soil layer rich in humus and minerals, important for crops."],
    ["Loam", "A soil with a balanced mix of sand, silt and clay."],
  ],
  closed: [
    [
      "At which type of plate boundary does new crust form?",
      ["Convergent", "Transform", "Divergent", "Subduction"],
      "C",
    ],
    [
      "The San Andreas Fault in California is an example of a:",
      ["Divergent boundary", "Convergent boundary", "Transform boundary", "Hot spot"],
      "C",
    ],
    [
      "Which soil horizon is topsoil rich in humus?",
      ["O", "A", "B", "C"],
      "B",
    ],
    [
      "In a jar test, which particles settle out last?",
      ["Sand", "Silt", "Clay", "Gravel"],
      "C",
    ],
    [
      "Which layer of the Earth is liquid and generates the magnetic field?",
      ["Crust", "Mantle", "Outer core", "Inner core"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Describe what happens at a convergent boundary where an oceanic plate meets a continental plate. Explain why volcanoes and earthquakes occur there, and give a North American example.",
      scheme: [
        "States that the denser oceanic plate sinks beneath the continental plate in a subduction zone",
        "States that this forms a deep ocean trench",
        "Explains that the sinking plate melts and magma rises to form volcanoes, and that plates sticking and slipping cause earthquakes",
        "Gives a valid example, such as the Cascade volcanoes of the Pacific Northwest",
      ],
      model:
        "The denser oceanic plate sinks beneath the continental plate in a subduction zone. This forms a deep ocean trench. As the sinking plate melts, magma rises to form volcanoes, and the plates sticking and slipping past each other cause earthquakes. An example is the Cascade Range in the Pacific Northwest, including Mount St. Helens.",
      answers: [
        [
          "full",
          "[[0|The denser oceanic plate is forced under the continental plate in subduction.]] [[1|A deep trench forms at the boundary.]] [[2|The sinking plate melts and the magma rises to make volcanoes, and the plates catching and slipping cause earthquakes.]] [[3|The Cascade volcanoes, like Mount St. Helens, are an example.]]",
          "Full marks. Each feature of the boundary is connected to its cause.",
        ],
        [
          "full",
          "[[0|At a subduction zone, the oceanic plate sinks under the lighter continental plate.]] [[1|This creates an ocean trench.]] [[2|Water and heat cause the slab to melt, magma rises making volcanic arcs, and stress builds until released as earthquakes.]] [[3|Mount Rainier and the Cascades are North American examples.]]",
          "All four marks, with detail on the melting.",
        ],
        [
          "partial",
          "[[0|The oceanic plate goes under the continental plate.]] [[3|The Cascades are an example.]]",
          "Include the trench, and explain how volcanoes and earthquakes happen.",
        ],
        [
          "partial",
          "[[2|Magma rises to make volcanoes and the plates slipping cause earthquakes.]] [[1|A mountain range is the result.]] The continental plate goes under the oceanic plate.",
          "The denser oceanic plate is subducted, not the continental plate. The result is a trench and a volcanic arc.",
          true,
        ],
        [
          "weak",
          "The two plates crash and they bounce off each other, causing a big wave called a tsunami every time.",
          "The oceanic plate sinks under the continental plate. A tsunami occurs only if there is a sudden movement of the sea floor.",
        ],
        [
          "weak",
          "[[1|A trench forms.]] The oceanic plate is lighter than the continental plate, so it rides over the top.",
          "Oceanic crust is denser, so it sinks beneath the continental crust.",
        ],
      ],
    },
    {
      prompt:
        "A soil sample shaken in a jar settles into 50 percent sand, 30 percent silt and 20 percent clay. Describe how the layers settle, classify the soil as suitable or unsuitable for corn, and give two ways to reduce soil erosion on the field.",
      scheme: [
        "States that sand settles first, then silt, then clay",
        "States that this texture (a loam, with balanced sand, silt and clay) is good for crops, with adequate drainage and water holding capacity",
        "Gives one conservation method, such as no-till farming or cover crops",
        "Gives a second conservation method, such as contour plowing or terraces, and explains how it reduces erosion",
      ],
      model:
        "Sand settles first, because the particles are largest, then silt, then clay, which can take hours. A mixture of 50 percent sand, 30 percent silt and 20 percent clay is close to a loam, which drains well, holds water and nutrients, and is good for corn. To reduce erosion, farmers can use no-till farming, which leaves residue to protect the soil, and contour plowing or terraces, which slow the downhill flow of water.",
      answers: [
        [
          "full",
          "[[0|The sand settles first, then the silt, and the clay is last.]] [[1|It's close to a loam, with a good mix, so it drains well and holds water and nutrients, which is good for corn.]] [[2|No-till farming leaves crop residue on the surface to protect the soil from rain and wind.]] [[3|Contour plowing or terraces slow down the water running down the slope so it carries away less soil.]]",
          "Full marks. The texture, suitability and two methods are all well explained.",
        ],
        [
          "full",
          "[[0|In order of settling: sand, silt, clay.]] [[1|With this mix, it's a good agricultural soil, similar to a loam.]] [[2|Cover crops keep roots in the soil year-round and hold it in place.]] [[3|Terraces break up the slope so that water runs more slowly, reducing erosion.]]",
          "All four marks, with different methods from those in the sample answer.",
        ],
        [
          "partial",
          "[[0|Sand, then silt, then clay.]] [[2|Use no-till farming.]]",
          "Say whether the soil is suitable for corn and explain, and give a second conservation method.",
        ],
        [
          "partial",
          "[[1|It is a loam, good for crops.]] [[3|Terraces reduce erosion.]] Clay settles first because it is heaviest.",
          "Sand settles first because its particles are largest. Clay particles are tiny and settle last.",
          true,
        ],
        [
          "weak",
          "The soil has too much sand and so is bad for corn. To stop erosion, plow the soil more.",
          "A mix of 50 percent sand, 30 percent silt and 20 percent clay is close to loam. More plowing increases erosion.",
        ],
        [
          "weak",
          "[[2|Cover crops protect the soil.]] The clay settles first and the sand settles last, because clay is heavier.",
          "Larger particles settle faster. Sand settles first and clay last.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "The atmosphere, global winds, weather and El Nino",
  note: `
## Objectives

Students will be able to:

1. describe atmospheric layers and the causes of global wind patterns;
2. explain how weather, climate and El Nino affect ecosystems.

## Materials

Lamp, thermometers or temperature probes, black, white and green paper, foil, a globe, weather maps, the practical sheet.

## Starter (6 minutes)

Ask: "Why does Ohio get lake-effect snow in November but not in July? What does Lake Erie do?" Collect ideas about heat capacity of water and moisture.

## Main activity

1. Atmospheric layers: troposphere (weather, 0 to 12 km), stratosphere (ozone layer, 12 to 50 km), mesosphere and thermosphere. Composition: 78 percent nitrogen, 21 percent oxygen. Ozone and UV.
2. Global wind patterns: uneven heating, Hadley cells, the Coriolis effect, trade winds, westerlies and polar easterlies. The jet stream. Why Ohio weather generally moves from west to east.
3. Weather and climate: difference between them. Albedo and heating of surfaces (practical).
4. El Nino and La Nina: trade winds weaken, warm water moves east across the Pacific, fisheries collapse off Peru, rainfall shifts and effects around the world.

## Checking for understanding

Ask: "Why do the trade winds blow from east to west near the equator?"

## Practical write-up

Collect with the data table, graph and interpretation of albedo and surface heating.
`,
  reading: [
    "Air in layers, wind in belts, and a warm Pacific",
    `
The atmosphere is a mixture of gases held to the Earth by gravity: 78 percent nitrogen, 21 percent oxygen, and small amounts of argon, carbon dioxide and water vapor. It is divided into layers by temperature. The **troposphere** is the lowest layer, reaching about 12 km, and it contains most of the air and all of the weather. Temperature falls with height. The **stratosphere** extends to 50 km. It contains the **ozone layer**, which absorbs most of the Sun's harmful ultraviolet radiation, so temperature rises with height. Above lie the mesosphere and the thermosphere.

Global wind patterns result from uneven heating and the rotation of the Earth. The equator receives more direct sunlight than the poles. Warm air at the equator rises, creating low pressure, and flows toward the poles, cooling and sinking at about 30 degrees latitude. This is the **Hadley cell**. At the surface, air flows back toward the equator. Because the Earth rotates, moving air is deflected by the **Coriolis effect**: to the right in the Northern Hemisphere and to the left in the Southern Hemisphere. The result is belts of prevailing winds: the **trade winds** blow from the east near the equator, the **westerlies** blow from the west at mid-latitudes, and the **polar easterlies** blow from the east near the poles. Ohio is in the westerlies, which is why storms generally move from west to east, and why weather from Chicago reaches Columbus the next day.

**Weather** is the state of the atmosphere at a given time and place; **climate** is the average over decades. Surfaces heat unevenly. The **albedo** of a surface is the fraction of sunlight it reflects: fresh snow reflects about 80 to 90 percent, a forest about 10 to 15 percent, and dark asphalt about 5 percent. Dark surfaces absorb more sunlight and warm up faster, which is why asphalt parking lots form urban heat islands.

**El Nino** is a recurring disruption in the Pacific. Normally, the trade winds push warm surface water west, and cold, nutrient-rich water wells up off South America, supporting a rich fishery. In an El Nino year, the trade winds weaken, and warm water spreads eastward. The upwelling is suppressed, fisheries collapse, and rainfall patterns shift: flooding in Peru and the southern United States, and drought in Indonesia and Australia. The opposite phase is **La Nina**, with stronger trade winds and cooler water. These cycles affect ecosystems through changes in rainfall and temperature, with effects on coral reefs, crop yields and wildfires.
`,
  ],
  cards: [
    ["Troposphere", "The lowest atmospheric layer, containing weather."],
    ["Stratosphere", "The layer above the troposphere containing the ozone layer."],
    ["Ozone layer", "A layer in the stratosphere that absorbs most ultraviolet radiation."],
    ["Hadley cell", "A circulation of air rising at the equator and sinking near 30 degrees latitude."],
    ["Coriolis effect", "The deflection of moving air or water caused by Earth's rotation."],
    ["Albedo", "The fraction of incoming sunlight that a surface reflects."],
    ["El Nino", "A periodic weakening of the trade winds that warms the eastern Pacific."],
    ["Westerlies", "Prevailing winds from the west at mid-latitudes, including Ohio."],
  ],
  closed: [
    [
      "In which layer does most weather occur?",
      ["Stratosphere", "Troposphere", "Mesosphere", "Thermosphere"],
      "B",
    ],
    [
      "The ozone layer is mainly useful because it:",
      ["Holds heat", "Absorbs harmful ultraviolet radiation", "Makes rain", "Contains oxygen for breathing"],
      "B",
    ],
    [
      "Ohio is in the belt of the:",
      ["Trade winds", "Westerlies", "Polar easterlies", "Doldrums"],
      "B",
    ],
    [
      "Which surface has the highest albedo?",
      ["Fresh snow", "Forest", "Asphalt", "Dark soil"],
      "A",
    ],
    [
      "During an El Nino, the trade winds:",
      ["Strengthen", "Weaken", "Reverse permanently", "Stop only in the Atlantic"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how uneven heating of the Earth and the Coriolis effect produce the trade winds and the westerlies. State why storms in Ohio usually move from west to east.",
      scheme: [
        "States that the equator receives more direct sunlight, so air rises there and moves poleward",
        "States that the Hadley circulation returns air toward the equator at the surface",
        "States that the Coriolis effect deflects the moving air to the right in the Northern Hemisphere, producing east-to-west trade winds near the equator and west-to-east westerlies at mid-latitudes",
        "States that Ohio is in the westerlies, so weather systems are carried from west to east",
      ],
      model:
        "The equator receives the most direct sunlight, so air rises there and moves toward the poles. It sinks near 30 degrees and returns toward the equator at the surface. The Coriolis effect deflects the moving air to the right in the Northern Hemisphere, which makes the surface winds near the equator blow from the east (trade winds) and the surface winds at mid-latitudes blow from the west (westerlies). Ohio is in the westerlies, so weather systems are carried from west to east.",
      answers: [
        [
          "full",
          "[[0|The equator is heated the most, so air rises there and flows toward the poles.]] [[1|It sinks near 30° and comes back toward the equator along the surface.]] [[2|The Coriolis effect bends the winds to the right in the Northern Hemisphere, making the trade winds from the east and the westerlies from the west.]] [[3|Ohio is in the westerlies, so storms move from west to east.]]",
          "Full marks. The chain from heating to the pattern of winds is complete.",
        ],
        [
          "full",
          "[[0|Uneven solar heating makes warm air rise at the equator and move poleward.]] [[1|The air cools and sinks at about 30 degrees latitude, forming the Hadley cell, and returns along the surface.]] [[2|Earth's rotation deflects it, creating easterly trade winds and the westerlies at mid-latitude.]] [[3|Systems in the westerlies, like those over Ohio, travel eastward.]]",
          "All four marks, in a clear sequence.",
        ],
        [
          "partial",
          "[[0|The equator is hotter, so air rises.]] [[3|Ohio is in the westerlies.]]",
          "Explain the return flow and the role of the Coriolis effect in creating the wind belts.",
        ],
        [
          "partial",
          "[[2|The Coriolis effect bends the wind.]] [[3|Storms in Ohio move west to east.]] The wind blows straight from the poles to the equator.",
          "Without the Coriolis effect it would, but the Earth's rotation deflects the wind, producing the belts.",
          true,
        ],
        [
          "weak",
          "The wind blows from the east in Ohio because the Earth spins from west to east, and storms come from the Atlantic.",
          "Ohio is in the westerlies, so winds come from the west, and storms generally arrive from the west.",
        ],
        [
          "weak",
          "[[0|The equator gets the most sunlight.]] The Coriolis effect is caused by the Moon pulling on the air.",
          "The Coriolis effect is caused by the rotation of the Earth.",
        ],
      ],
    },
    {
      prompt:
        "Describe the normal conditions in the Pacific Ocean and how they change during an El Nino. Explain two ecological or economic effects.",
      scheme: [
        "Describes normal conditions: trade winds push warm surface water west and cold nutrient-rich water upwells off South America",
        "Describes El Nino: the trade winds weaken, warm water spreads east and upwelling is suppressed",
        "Gives an ecological effect, such as collapse of the anchovy fishery and seabird populations off Peru",
        "Gives a second effect, such as drought in Indonesia and Australia or flooding in Peru and the southern United States",
      ],
      model:
        "In normal conditions the trade winds push warm surface water west, and cold, nutrient-rich water wells up off South America. In an El Nino the trade winds weaken, warm water spreads eastward and upwelling is suppressed. The anchovy fishery off Peru collapses, along with the seabirds that depend on it. Rainfall also shifts, causing flooding in Peru and the southern United States, and drought in Indonesia and Australia.",
      answers: [
        [
          "full",
          "[[0|Normally the trade winds push warm water west and cold nutrient-rich water wells up off South America.]] [[1|During El Niño the trade winds weaken, warm water spreads east and the upwelling stops.]] [[2|The anchovy fishery off Peru collapses and the seabirds that eat them starve.]] [[3|Rain patterns change, with floods in Peru and the southern US and droughts in Indonesia and Australia.]]",
          "Full marks. Two clear effects, one ecological and one climatic.",
        ],
        [
          "full",
          "[[0|Normal: easterly trade winds drive surface water west and upwelling brings nutrients to the coast of Peru.]] [[1|El Niño: weaker trades let warm water slosh eastward and suppress upwelling.]] [[2|Fish and sea birds that depend on the plankton decline.]] [[3|Wildfires and drought in Indonesia and Australia are linked to El Niño.]]",
          "All four marks, with a good link to the food web.",
        ],
        [
          "partial",
          "[[0|Normally the trade winds push warm water west.]] [[1|In El Nino the winds weaken.]]",
          "Give two effects on ecosystems or people, such as the fishery collapse and changes in rainfall.",
        ],
        [
          "partial",
          "[[2|The fishery collapses.]] [[3|There are droughts and floods.]] In El Nino the trade winds get stronger, which brings more warm water to Peru.",
          "In an El Nino the trade winds weaken. This lets the warm water spread east.",
          true,
        ],
        [
          "weak",
          "El Nino is a big storm in the Pacific that comes every year and destroys the fish with huge waves.",
          "El Nino is a recurring change in winds and ocean temperature, not a single storm.",
        ],
        [
          "weak",
          "[[3|There are floods and droughts.]] El Nino makes the whole world warmer and wetter in the same way.",
          "The effects vary by region: some places get floods and others droughts.",
        ],
      ],
    },
  ],
  practical: {
    title: "Albedo and surface heating",
    instructions:
      "Cover identical cans of water with black paper, white paper, aluminum foil and green paper. Place each can 30 cm below a lamp, record the water temperature every two minutes for 20 minutes, and compare the rates of heating. Measure the light reflected from each surface with a light sensor, if available, and relate albedo to the heating.",
    steps: [
      ["Wrap four identical cans with black paper, white paper, aluminum foil and green paper, and fill each with 200 mL of room-temperature water."],
      ["Place a thermometer in each can and record the starting temperature."],
      ["Place the lamp 30 cm above the cans, with all cans the same distance away. Turn it on and start the timer.", "The lamp becomes hot. Do not touch the bulb or shade."],
      ["Record the temperature of each can every two minutes for 20 minutes."],
      ["Graph temperature against time for each can and calculate the heating rate in degrees Celsius per minute."],
      ["Rank the surfaces by heating rate and relate your ranking to their albedo."],
    ],
    rubric: [
      ["Method: identical cans, same distance, starting temperatures recorded", 4],
      ["Data and graph: complete table, labeled graph, heating rates", 4],
      ["Conclusion: relates albedo to heating and to real-world examples", 4],
    ],
    writeUps: [
      [
        "full",
        "All cans started at 22 degrees Celsius. After 20 minutes the black can was 38, the green can 33, the white can 29 and the foil can 27 degrees Celsius. The heating rates were 0.80, 0.55, 0.35 and 0.25 degrees per minute. The black paper has the lowest albedo and absorbs the most sunlight, so it heats fastest. The foil has the highest albedo and reflects the most. This explains why asphalt parking lots warm cities as urban heat islands and why snow, with a high albedo, keeps cold areas cool. A limitation is that the lamp gives off heat, which is not the same as sunlight.",
        [4, 4, 4],
        "An excellent report: controlled setup, accurate rates, and a conclusion linked to heat islands and snow.",
      ],
      [
        "full",
        "Method: four identical cans, 200 mL of water each, 30 cm from the lamp, temperatures every two minutes. Results (20 min): black 37.5, green 32.5, white 29, foil 27 degrees Celsius, so heating rates of 0.78, 0.53, 0.35 and 0.25 degrees per minute. Conclusion: surfaces with low albedo, such as black, absorb more light and warm faster. High-albedo surfaces such as foil and white paper reflect it. This is relevant to green roofs and white roofs to reduce heating in cities.",
        [4, 4, 3],
        "Very good. A graph with labeled axes would complete the data presentation.",
      ],
      [
        "partial",
        "The black can got hottest and the foil can stayed coolest. The white and green cans were in the middle. I think the black absorbs the light and the foil reflects it. We used the same lamp for all four cans, but I forgot to write down the starting temperatures and the distance to the lamp, so I can't say whether the test was fair.",
        [2, 2, 2],
        "Record the starting temperatures and the distance. Calculate the heating rates to support the ranking.",
      ],
      [
        "partial",
        "The heating rates were 0.80, 0.55, 0.35 and 0.25 degrees per minute for black, green, white and foil. We did the experiment with the cans at the same distance and measured every two minutes. The conclusion is that black is the hottest because black is a hotter color, and white is a colder color. I did not link this to albedo.",
        [3, 4, 1],
        "Color is not hot or cold in itself. The explanation is albedo: how much light the surface reflects or absorbs.",
      ],
      [
        "weak",
        "We wrapped the cans in paper and put them under a lamp. They got warm. The black one was the warmest I think. The experiment was easy to do and we finished early. The lamp was bright and my partner said that it hurt his eyes.",
        [1, 0, 0],
        "Record temperatures every two minutes for all four cans, graph them and explain the differences in terms of albedo.",
      ],
      [
        "weak",
        "The foil can got hottest because it is metal and metal gets hot fast, and the black can stayed coolest because black paper is a good insulator. Albedo is how bright the lamp is. We saw that the surface did not matter much, so the heating is mostly because of the lamp.",
        [1, 0, 0],
        "Foil reflects most of the light, so it stays cooler. Albedo is the fraction of light a surface reflects. The surface matters a lot.",
      ],
    ],
  },
};

const w8: WeekInput = {
  topic: "Investigating a local question, and weighing costs and benefits",
  note: `
## Objectives

Students will be able to:

1. design an investigation of a local environmental question and analyze the data;
2. evaluate the costs and benefits of a solution to an environmental problem.

## Materials

Nitrate test strips or kits, stream data for sites upstream and downstream of a farm field (provided), calculators, a cost-benefit table template, the worksheet.

## Starter (6 minutes)

Pose: "Alum Creek runs through farmland and then through Columbus. Is the nitrate level higher downstream of a field than upstream? How would you find out?" Collect design ideas and note what each would control.

## Main activity

1. Investigation design: question, hypothesis, independent and dependent variables, controls, sampling plan (replicates, sites, times), safety, and how to analyze (means, range, a graph).
2. Data analysis: nitrate in mg/L at two sites over six weeks. Upstream: 1.2, 1.4, 1.1, 1.3, 1.5, 1.2. Downstream: 3.1, 3.5, 2.9, 3.8, 3.3, 3.0. Calculate the means (1.28 and 3.27) and percent increase.
3. Cost-benefit analysis: a solution, such as planting buffer strips along streams. Costs: land taken out of production, planting and maintenance. Benefits: reduced runoff of nutrients and sediment, habitat, flood control. Use a table and consider who pays and who benefits, and uncertainty.

## Checking for understanding

Ask: "What is a confounding variable in this stream study?"

## Worksheet

A sampling design, an analysis of the nitrate data and a cost-benefit table for buffer strips.
`,
  reading: [
    "Asking a local question and weighing a solution",
    `
Environmental science is practiced locally as well as globally. A question that is specific, measurable and answerable with the resources available is a good start: "Is the nitrate concentration higher in a stream downstream of a fertilized field than upstream?" The investigation needs a clear design. The **independent variable** is the site (upstream or downstream). The **dependent variable** is the nitrate concentration in milligrams per liter. Other factors, such as the time of day, the depth of sampling, the weather and the test method, should be kept the same, or recorded. Rain just before sampling can increase runoff and is a potential **confounding variable**. Take **replicate** samples at each site and repeat over several weeks so that you can see typical values and variability. Plan the safety measures, such as wearing gloves, not entering fast water and washing your hands.

Suppose the upstream concentrations over six weeks are 1.2, 1.4, 1.1, 1.3, 1.5 and 1.2 mg/L, and the downstream concentrations are 3.1, 3.5, 2.9, 3.8, 3.3 and 3.0 mg/L. The mean upstream is 7.7/6, which is 1.28 mg/L. The mean downstream is 19.6/6, which is 3.27 mg/L. The downstream mean is higher by 1.99 mg/L, an increase of about 155 percent. The ranges (1.1 to 1.5 and 2.9 to 3.8) do not overlap, which supports the claim that the difference is real. A claim should still be cautious: the data show a difference associated with the site, but they cannot by themselves prove that the field is the cause; other sources, such as a septic system or a storm drain between the sites, could contribute. For a drinking-water source, the federal limit for nitrate is 10 mg/L, so both are below the limit, but high nitrate downstream feeds algal growth in the receiving waters.

How should we respond? A **cost-benefit analysis** lists the costs and benefits of a solution, in money and in other terms, and considers who bears them. One option is a **buffer strip**, a band of grass and trees planted between a field and a stream. The costs include the value of the crops that would have been grown on the land, planting and maintenance, and any payments to the landowner. The benefits include a reduction in nitrate and phosphorus and soil carried into the stream, habitat for wildlife, shade that cools the water, and reduced downstream treatment costs for drinking water. Some benefits are hard to put a price on, such as healthier streams. Programs that pay farmers to establish buffers share the cost. A good evaluation also considers uncertainty, alternatives such as precision fertilizer application, and unintended consequences.
`,
  ],
  cards: [
    ["Independent variable", "The factor that the investigator changes or compares, such as the site."],
    ["Dependent variable", "The factor that is measured, such as nitrate concentration."],
    ["Confounding variable", "An uncontrolled factor that could affect the result, such as rain before sampling."],
    ["Replicate", "A repeated measurement under the same conditions."],
    ["Buffer strip", "A band of vegetation between a field and a stream that traps runoff."],
    ["Cost-benefit analysis", "Comparing the costs and benefits of an option to decide whether it is worthwhile."],
    ["Nitrate limit", "The federal drinking water limit for nitrate is 10 mg/L."],
    ["Precision agriculture", "Applying fertilizer only where and when it is needed."],
  ],
  closed: [
    [
      "The upstream nitrate values are 1.2, 1.4, 1.1, 1.3, 1.5 and 1.2 mg/L. What is the mean?",
      ["1.1 mg/L", "1.28 mg/L", "1.5 mg/L", "7.7 mg/L"],
      "B",
    ],
    [
      "Rain just before sampling the stream would be an example of a:",
      ["Control", "Confounding variable", "Dependent variable", "Replicate"],
      "B",
    ],
    [
      "Which is a benefit of a stream buffer strip?",
      ["It increases runoff of nutrients", "It traps sediment and nutrients and provides habitat", "It removes all the water", "It raises the cost of farming to zero"],
      "B",
    ],
    [
      "A mean of 3.27 mg/L downstream compared with 1.28 upstream is an increase of about:",
      ["25%", "100%", "155%", "255%"],
      "C",
    ],
    [
      "Why take replicate samples?",
      ["To increase the amount of work", "To see typical values and the variability", "To remove the need for a control", "To change the independent variable"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Design an investigation to determine whether a field affects nitrate levels in a stream. State the question, the independent and dependent variables, two things you would control and a plan for replication.",
      scheme: [
        "States a testable question about nitrate upstream and downstream of the field",
        "Identifies the independent variable (site) and the dependent variable (nitrate concentration in mg/L)",
        "Names two controlled factors, such as the time of day and sampling depth, and the same test method",
        "Describes replication, such as several samples at each site over several weeks",
      ],
      model:
        "Question: is the nitrate concentration in the stream higher downstream of the field than upstream? The independent variable is the site (upstream or downstream) and the dependent variable is the nitrate concentration in mg/L. I would control the time of day, the depth of sampling and the test method, and avoid sampling right after rain. I would take three samples at each site once a week for six weeks.",
      answers: [
        [
          "full",
          "[[0|Question: is the nitrate in the stream higher downstream of the field than upstream?]] [[1|The independent variable is the site, and the dependent variable is the nitrate concentration in mg/L.]] [[2|I'd control the time of day, the sampling depth and use the same test kit each time.]] [[3|I'd take three samples at each site every week for six weeks to get typical values.]]",
          "Full marks. The design is clear, testable and replicated.",
        ],
        [
          "full",
          "[[0|Does the nitrate concentration increase between the upstream and downstream sites of a fertilized field?]] [[1|IV: location. DV: nitrate (mg/L).]] [[2|Controls: sampling time, depth in the stream, the same test method, and avoiding sampling within 24 hours of rain.]] [[3|Three replicate samples per site, weekly for six weeks.]]",
          "All four marks, and avoiding sampling after rain handles an important confounder.",
        ],
        [
          "partial",
          "[[0|Is there more nitrate downstream?]] [[1|The independent variable is the site and the dependent variable is nitrate.]]",
          "Name two controlled factors and describe how you would replicate the measurements.",
        ],
        [
          "partial",
          "[[2|I'd control the time and the depth.]] [[3|I'd take lots of samples.]] The independent variable is the nitrate and the dependent variable is the site.",
          "The site is what you compare (independent), and the nitrate is what you measure (dependent).",
          true,
        ],
        [
          "weak",
          "I would go to the stream once and look at it. If the water looks green then there is nitrate.",
          "Use a measurement such as a nitrate test with a unit, at two sites, with replicates. Color is not a reliable indicator.",
        ],
        [
          "weak",
          "[[1|The dependent variable is nitrate.]] I will only sample downstream because that is where the field is and I don't need upstream.",
          "Without an upstream site there is nothing to compare with. The upstream site serves as the control.",
        ],
      ],
    },
    {
      prompt:
        "Evaluate a proposal to pay farmers to plant 10-meter buffer strips along streams. Give two costs, two benefits, say who pays and who benefits, and make a recommendation with a reason.",
      scheme: [
        "Gives two costs, such as lost cropland and the cost of planting and maintenance",
        "Gives two benefits, such as reduced nutrient and sediment runoff and wildlife habitat",
        "Identifies who pays (such as taxpayers or the program) and who benefits (such as downstream communities and the farmer through reduced erosion)",
        "Makes a recommendation supported by a reasoned comparison, including uncertainty or alternatives",
      ],
      model:
        "Costs include the loss of cropland in the strips and the cost of planting and maintaining the vegetation. Benefits include reduced nutrient and sediment runoff and habitat for wildlife. The program is paid for by taxpayers, and downstream communities benefit from cleaner water and lower treatment costs, while farmers benefit from reduced bank erosion and payments. I would recommend the program, because the benefits to water quality are large and shared by many people, but I would target the payments to the fields that contribute the most runoff, since the effect of the strips varies.",
      answers: [
        [
          "full",
          "[[0|Costs: farmers lose the cropland used for the strips, and there's the cost of planting and maintaining them.]] [[1|Benefits: less nitrate, phosphorus and soil runs off into the stream, and the strips are habitat for wildlife.]] [[2|Taxpayers pay through the program and the downstream towns benefit from cleaner water and lower treatment costs.]] [[3|I recommend it, but targeted at the fields that cause the most runoff, since the benefit varies.]]",
          "Full marks. The recommendation is supported by a reasoned comparison and acknowledges variation.",
        ],
        [
          "full",
          "[[0|Two costs are land taken out of production and long-term upkeep.]] [[1|Two benefits are cleaner water and reduced bank erosion, plus shade that cools the stream.]] [[2|The public pays through the subsidy, while downstream water users, anglers and the farmer all gain.]] [[3|I would support it where soils are erodible, because the benefits to water quality outweigh the costs, although some of the benefit is hard to price.]]",
          "All four marks, with an honest note on the uncertainty of valuing benefits.",
        ],
        [
          "partial",
          "[[0|It costs the farmer some land.]] [[1|It would reduce runoff.]]",
          "Add a second cost and benefit, say who pays and who benefits, and make a reasoned recommendation.",
        ],
        [
          "partial",
          "[[2|Taxpayers pay and everyone downstream benefits.]] [[3|I recommend it.]] The costs are zero because the land isn't used anyway.",
          "The land does have a cost: it could have grown crops. A recommendation needs reasoning about costs and benefits.",
          true,
        ],
        [
          "weak",
          "It is a bad idea because farmers need all the land to grow food, and streams are not important.",
          "Evaluate the costs and benefits together. Streams provide drinking water, habitat and recreation.",
        ],
        [
          "weak",
          "[[1|It reduces runoff.]] Buffer strips have no costs and benefit everybody equally, so there is nothing to think about.",
          "There are costs, such as lost cropland, and the benefits are not shared equally. Weighing them is the point of the analysis.",
        ],
      ],
    },
  ],
};

writeCourse(
  "ap-environmental-science-grade-11.json",
  "AP Environmental Science",
  "Grade 11",
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
