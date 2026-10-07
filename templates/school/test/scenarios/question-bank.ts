import type { ScenarioQuestion } from "./nigeria-secondary.js";

/**
 * Questions for a whole school's worth of subjects.
 *
 * Hand-written per subject rather than generated from one template,
 * because the point of marking an open answer is that the mark scheme says
 * something real — a scheme of "1 mark for the correct answer" would let any
 * marking policy look right.
 *
 * Deterministic and free: no model is called, and a run is identical every
 * time, so a mark that changes between runs is a change in the app.
 *
 * Numbers are written the way this school's learners see them in their own
 * textbooks — 4,508, not the SI 4 508. A thousands separator written as a
 * space reads to a child as two numbers, and a simulated paper that nobody
 * would set is not testing much.
 */

export type SubjectWeeks = {
  subject: string;
  code: string;
  weeks: Array<{
    topic: string;
    objectives: string[];
    questions: ScenarioQuestion[];
  }>;
};

const mathematics: SubjectWeeks = {
  subject: "Mathematics",
  code: "MTH",
  weeks: [
    {
      topic: "Whole numbers and place value",
      objectives: [
        "Read and write whole numbers up to one million in figures and in words.",
        "State the place value of each digit in a whole number.",
      ],
      questions: [
        {
          prompt: "What is the place value of 7 in 4,783?",
          points: 1,
          options: ["Tens", "Hundreds", "Thousands", "Units"],
          answer: "B",
        },
        {
          prompt: "Which number is the largest?",
          points: 1,
          options: ["9,087", "9,807", "9,078", "9,780"],
          answer: "B",
        },
        {
          prompt:
            "A trader counted 12,406 bags of rice. Say how you would read this number aloud, and what the 4 is worth.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for twelve thousand four hundred and six. 1 mark for identifying 4 as the hundreds digit. 1 mark for stating its value as 400.",
        },
      ],
    },
    {
      topic: "Addition and subtraction",
      objectives: [
        "Add and subtract whole numbers with regrouping.",
        "Solve word problems involving addition and subtraction.",
      ],
      questions: [
        {
          prompt: "Work out 4,508 + 2,697.",
          points: 1,
          options: ["7,105", "7,205", "6,195", "7,195"],
          answer: "B",
        },
        {
          prompt: "Work out 8,004 − 3,276.",
          points: 1,
          options: ["4,728", "5,728", "4,828", "4,738"],
          answer: "A",
        },
        {
          prompt:
            "A school had 1,250 exercise books, gave out 867 and received 400 more. How many has it now? Show your working.",
          points: 4,
          answerSpace: "long",
          markScheme:
            "1 mark for 1250 minus 867. 1 mark for 383. 1 mark for adding 400. 1 mark for 783 with the unit named.",
        },
      ],
    },
    {
      topic: "Multiplication and division",
      objectives: [
        "Multiply a three-digit number by a two-digit number.",
        "Divide a four-digit number by a one-digit number, interpreting the remainder.",
      ],
      questions: [
        {
          prompt: "Work out 236 × 14.",
          points: 1,
          options: ["3,204", "3,304", "3,404", "2,304"],
          answer: "B",
        },
        {
          prompt: "Work out 1,505 ÷ 7.",
          points: 1,
          options: ["215", "205", "251", "225"],
          answer: "A",
        },
        {
          prompt:
            "A bus carries 48 passengers. How many buses are needed for 300 passengers, and why is the answer not a decimal?",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for 300 divided by 48 giving 6 remainder 12. 1 mark for 7 buses. 1 mark for explaining that part of a bus cannot be used, so it is rounded up.",
        },
      ],
    },
    {
      topic: "Fractions",
      objectives: [
        "Reduce a fraction to its lowest terms.",
        "Add and subtract fractions with different denominators.",
      ],
      questions: [
        {
          prompt: "Reduce 18/24 to its lowest terms.",
          points: 1,
          options: ["2/3", "3/4", "6/8", "9/12"],
          answer: "B",
        },
        {
          prompt: "Work out 1/2 + 1/3.",
          points: 1,
          options: ["2/5", "5/6", "1/6", "2/6"],
          answer: "B",
        },
        {
          prompt:
            "Chidi ate 2/5 of a loaf and Ada ate 1/4 of the same loaf. How much is left? Show each step.",
          points: 4,
          answerSpace: "long",
          markScheme:
            "1 mark for a common denominator of 20. 1 mark for 8/20 and 5/20. 1 mark for 13/20 eaten. 1 mark for 7/20 left.",
        },
      ],
    },
    {
      topic: "Decimals and approximation",
      objectives: [
        "Convert between fractions and decimals.",
        "Round a decimal to a given number of decimal places.",
      ],
      questions: [
        {
          prompt: "Write 3/4 as a decimal.",
          points: 1,
          options: ["0.34", "0.75", "0.43", "0.70"],
          answer: "B",
        },
        {
          prompt: "Round 12.4682 to two decimal places.",
          points: 1,
          options: ["12.46", "12.47", "12.5", "12.468"],
          answer: "B",
        },
        {
          prompt:
            "A length is measured as 7.846 m. Give it to one decimal place and say what is lost by rounding.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for 7.8 m. 1 mark for naming the digit dropped. 1 mark for explaining that the true value lies between 7.75 and 7.85.",
        },
      ],
    },
    {
      topic: "Mid-term test",
      objectives: [],
      questions: [
        {
          prompt: "Work out 3/5 of 250.",
          points: 1,
          options: ["150", "125", "100", "175"],
          answer: "A",
        },
        {
          prompt: "Round 0.0749 to two decimal places.",
          points: 1,
          options: ["0.07", "0.08", "0.075", "0.1"],
          answer: "A",
        },
        {
          prompt:
            "A tank holds 2,400 litres. 3/8 is used on Monday and 1/4 on Tuesday. How much is left? Show your working.",
          points: 5,
          answerSpace: "long",
          markScheme:
            "1 mark for 900 litres on Monday. 1 mark for 600 litres on Tuesday. 1 mark for 1500 used. 1 mark for 900 left. 1 mark for the unit given throughout.",
        },
      ],
    },
  ],
};

const english: SubjectWeeks = {
  subject: "English Language",
  code: "ENG",
  weeks: [
    {
      topic: "Parts of speech",
      objectives: [
        "Identify nouns, verbs, adjectives and adverbs in a sentence.",
        "Use each part of speech correctly in writing.",
      ],
      questions: [
        {
          prompt:
            "In 'The tired farmer walked slowly home', which word is an adverb?",
          points: 1,
          options: ["tired", "farmer", "walked", "slowly"],
          answer: "D",
        },
        {
          prompt: "Which of these is an abstract noun?",
          points: 1,
          options: ["market", "courage", "lorry", "teacher"],
          answer: "B",
        },
        {
          prompt:
            "Write one sentence about your school using an adjective and an adverb, then name each.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for a complete sentence. 1 mark for naming the adjective correctly. 1 mark for naming the adverb correctly.",
        },
      ],
    },
    {
      topic: "Sentence types",
      objectives: [
        "Distinguish statements, questions, commands and exclamations.",
        "Punctuate each type correctly.",
      ],
      questions: [
        {
          prompt: "'Shut the door.' is which type of sentence?",
          points: 1,
          options: ["Statement", "Question", "Command", "Exclamation"],
          answer: "C",
        },
        {
          prompt: "Which sentence is punctuated correctly?",
          points: 1,
          options: [
            "Where are you going.",
            "Where are you going?",
            "Where are you going!",
            "where are you going?",
          ],
          answer: "B",
        },
        {
          prompt:
            "Rewrite 'you have finished your homework' as a question and as a command.",
          points: 2,
          answerSpace: "short",
          markScheme:
            "1 mark for a correctly punctuated question. 1 mark for a command with the verb first.",
        },
      ],
    },
    {
      topic: "Comprehension",
      objectives: [
        "Answer literal and inferential questions on a short passage.",
        "Give evidence from the passage for an answer.",
      ],
      questions: [
        {
          prompt:
            "A passage says 'Ngozi left before the rain started, but still arrived wet.' What can you infer?",
          points: 1,
          options: [
            "She took an umbrella",
            "It rained while she travelled",
            "She did not leave",
            "The rain never came",
          ],
          answer: "B",
        },
        {
          prompt:
            "Explain how you worked out your answer, quoting the words that told you.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for quoting 'arrived wet'. 1 mark for the inference that rain fell during the journey. 1 mark for rejecting what the passage does not say.",
        },
      ],
    },
    {
      topic: "Tenses",
      objectives: [
        "Use the simple past, present and future correctly.",
        "Keep tense consistent across a paragraph.",
      ],
      questions: [
        {
          prompt: "Choose the correct form: 'Yesterday he ___ to the market.'",
          points: 1,
          options: ["go", "goes", "went", "going"],
          answer: "C",
        },
        {
          prompt: "Which sentence keeps one tense throughout?",
          points: 1,
          options: [
            "She woke up and goes to school.",
            "She wakes up and went to school.",
            "She woke up and went to school.",
            "She wake up and go to school.",
          ],
          answer: "C",
        },
        {
          prompt:
            "Write two sentences about last weekend, then rewrite them in the future tense.",
          points: 4,
          answerSpace: "long",
          markScheme:
            "2 marks for two correct past-tense sentences. 2 marks for both rewritten consistently in the future.",
        },
      ],
    },
    {
      topic: "Letter writing",
      objectives: [
        "Lay out an informal letter correctly.",
        "Match tone to audience.",
      ],
      questions: [
        {
          prompt: "Where does the writer's address go in an informal letter?",
          points: 1,
          options: ["Top left", "Top right", "Bottom left", "It is not needed"],
          answer: "B",
        },
        {
          prompt:
            "Write the opening and closing of a letter to a friend, and say why you chose that closing.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for an informal greeting. 1 mark for an informal closing. 1 mark for matching the tone to a friend rather than an official.",
        },
      ],
    },
    {
      topic: "Mid-term test",
      objectives: [],
      questions: [
        {
          prompt: "Which word is a verb in 'The rain beat the roof loudly'?",
          points: 1,
          options: ["rain", "beat", "roof", "loudly"],
          answer: "B",
        },
        {
          prompt: "Choose the correctly punctuated sentence.",
          points: 1,
          options: ["what a day", "What a day!", "What a day?", "what a day!"],
          answer: "B",
        },
        {
          prompt:
            "Write a short paragraph of three sentences about your journey to school, keeping one tense throughout.",
          points: 5,
          answerSpace: "long",
          markScheme:
            "3 marks for three complete sentences. 1 mark for consistent tense. 1 mark for correct punctuation throughout.",
        },
      ],
    },
  ],
};

const basicScience: SubjectWeeks = {
  subject: "Basic Science",
  code: "BSC",
  weeks: [
    {
      topic: "Measurement and units",
      objectives: [
        "Measure mass, length and volume with the appropriate instrument.",
        "State the SI unit for each quantity measured.",
      ],
      questions: [
        {
          prompt: "Which is the SI unit of mass?",
          points: 1,
          options: ["gram", "kilogram", "tonne", "pound"],
          answer: "B",
        },
        {
          prompt: "Which instrument measures 25 cm³ of liquid most accurately?",
          points: 1,
          options: [
            "Beaker",
            "Conical flask",
            "Measuring cylinder",
            "Test tube",
          ],
          answer: "C",
        },
        {
          prompt:
            "A student reads a measuring cylinder from above. Say what error this causes and how to avoid it.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for naming parallax error. 1 mark for saying the reading is too high or too low. 1 mark for reading at eye level from the bottom of the meniscus.",
        },
      ],
    },
    {
      topic: "States of matter",
      objectives: [
        "Describe the arrangement of particles in solids, liquids and gases.",
        "Explain change of state using the kinetic theory.",
      ],
      questions: [
        {
          prompt: "Which state has a fixed volume but no fixed shape?",
          points: 1,
          options: ["Solid", "Liquid", "Gas", "None"],
          answer: "B",
        },
        {
          prompt: "Why is a gas easily compressed?",
          points: 1,
          options: [
            "Its particles are heavy",
            "There is much space between its particles",
            "Its particles are fixed",
            "It has no particles",
          ],
          answer: "B",
        },
        {
          prompt:
            "Explain, in terms of particles, what happens when ice melts.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for energy being absorbed. 1 mark for particles vibrating more and breaking from fixed positions. 1 mark for the particles moving past one another while staying close.",
        },
      ],
    },
    {
      topic: "Living and non-living things",
      objectives: [
        "List the characteristics of living things.",
        "Classify familiar objects as living or non-living with a reason.",
      ],
      questions: [
        {
          prompt: "Which is NOT a characteristic of living things?",
          points: 1,
          options: ["Respiration", "Growth", "Magnetism", "Reproduction"],
          answer: "C",
        },
        {
          prompt:
            "A car moves and uses fuel. Explain why it is still not a living thing.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for naming movement and energy use as shared features. 1 mark for naming a characteristic it lacks, such as reproduction or growth. 1 mark for concluding that all characteristics must be present.",
        },
      ],
    },
    {
      topic: "Energy",
      objectives: [
        "Name the main forms of energy.",
        "Describe energy changes in everyday devices.",
      ],
      questions: [
        {
          prompt: "A torch changes chemical energy mainly into",
          points: 1,
          options: [
            "sound and heat",
            "light and heat",
            "kinetic and sound",
            "nuclear and light",
          ],
          answer: "B",
        },
        {
          prompt: "Which is a renewable source of energy?",
          points: 1,
          options: ["Coal", "Petrol", "Sunlight", "Diesel"],
          answer: "C",
        },
        {
          prompt:
            "Describe the energy changes when a boy climbs a staircase and then slides down.",
          points: 4,
          answerSpace: "long",
          markScheme:
            "1 mark for chemical energy in the body. 1 mark for kinetic energy while climbing. 1 mark for potential energy at the top. 1 mark for potential changing to kinetic on the way down.",
        },
      ],
    },
    {
      topic: "The human body",
      objectives: [
        "Name the main organs of the digestive system in order.",
        "State the function of each organ named.",
      ],
      questions: [
        {
          prompt: "Where does digestion of food begin?",
          points: 1,
          options: ["Stomach", "Mouth", "Small intestine", "Liver"],
          answer: "B",
        },
        {
          prompt: "Most absorption of digested food happens in the",
          points: 1,
          options: [
            "large intestine",
            "small intestine",
            "oesophagus",
            "stomach",
          ],
          answer: "B",
        },
        {
          prompt:
            "Trace a piece of bread through the digestive system, naming three organs and what each does.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark per organ correctly named with its function, in order, to a maximum of 3.",
        },
      ],
    },
    {
      topic: "Mid-term test",
      objectives: [],
      questions: [
        {
          prompt: "The SI unit of length is the",
          points: 1,
          options: ["centimetre", "metre", "kilometre", "millimetre"],
          answer: "B",
        },
        {
          prompt: "Which state of matter has particles in a regular pattern?",
          points: 1,
          options: ["Solid", "Liquid", "Gas", "All of them"],
          answer: "A",
        },
        {
          prompt:
            "A student says a candle flame is alive because it grows and needs air. Say whether they are right, and why.",
          points: 5,
          answerSpace: "long",
          markScheme:
            "1 mark for saying it is not alive. 1 mark for accepting the two features named. 2 marks for naming features it lacks, such as reproduction and response to stimuli. 1 mark for the rule that all characteristics must be present.",
        },
      ],
    },
  ],
};

const socialStudies: SubjectWeeks = {
  subject: "Social Studies",
  code: "SOS",
  weeks: [
    {
      topic: "The family",
      objectives: [
        "Describe types of family and their roles.",
        "Explain how families support their members.",
      ],
      questions: [
        {
          prompt: "A family of parents and their children only is called",
          points: 1,
          options: ["extended", "nuclear", "polygamous", "communal"],
          answer: "B",
        },
        {
          prompt:
            "Give two ways an extended family supports a child, and one difficulty it can bring.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark per support named, to a maximum of 2. 1 mark for a reasonable difficulty such as cost or crowding.",
        },
      ],
    },
    {
      topic: "Culture and values",
      objectives: [
        "Define culture and give examples from their own community.",
        "Explain why values differ between communities.",
      ],
      questions: [
        {
          prompt: "Which is an example of material culture?",
          points: 1,
          options: ["Greeting", "Language", "Pottery", "Belief"],
          answer: "C",
        },
        {
          prompt:
            "Name one value taught in your community and explain why it matters there.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for naming a value. 1 mark for an explanation tied to community life. 1 mark for an example.",
        },
      ],
    },
    {
      topic: "Living together",
      objectives: [
        "Describe how people of different groups live together peacefully.",
        "Identify causes of conflict and ways to resolve them.",
      ],
      questions: [
        {
          prompt: "Which best promotes peaceful living?",
          points: 1,
          options: ["Tolerance", "Rumour", "Favouritism", "Insults"],
          answer: "A",
        },
        {
          prompt:
            "Two neighbours disagree over a boundary. Describe two peaceful ways to settle it.",
          points: 4,
          answerSpace: "long",
          markScheme:
            "2 marks per method described with a reason it works, to a maximum of 4.",
        },
      ],
    },
    {
      topic: "Citizenship",
      objectives: [
        "State the rights and duties of a citizen.",
        "Explain why duties matter as much as rights.",
      ],
      questions: [
        {
          prompt: "Which is a duty rather than a right?",
          points: 1,
          options: ["Free speech", "Paying tax", "Education", "Fair hearing"],
          answer: "B",
        },
        {
          prompt:
            "Explain why a right to education cannot work if nobody performs duties.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for linking rights to resources. 1 mark for naming a duty that provides them, such as tax. 1 mark for the conclusion that rights depend on duties being done.",
        },
      ],
    },
    {
      topic: "Social problems",
      objectives: [
        "Identify common social problems in the community.",
        "Suggest realistic ways to reduce them.",
      ],
      questions: [
        {
          prompt: "Which is a social problem rather than a natural disaster?",
          points: 1,
          options: ["Flood", "Earthquake", "Drug abuse", "Drought"],
          answer: "C",
        },
        {
          prompt:
            "Choose one social problem and suggest two things a school could do about it.",
          points: 4,
          answerSpace: "long",
          markScheme:
            "1 mark for naming the problem. 1 mark for its effect. 2 marks for two realistic school-level actions.",
        },
      ],
    },
    {
      topic: "Mid-term test",
      objectives: [],
      questions: [
        {
          prompt: "A nuclear family consists of",
          points: 1,
          options: [
            "parents, children and relatives",
            "parents and their children",
            "a whole village",
            "children only",
          ],
          answer: "B",
        },
        {
          prompt: "Which is NOT a right of a citizen?",
          points: 1,
          options: [
            "Fair hearing",
            "Free movement",
            "Avoiding tax",
            "Education",
          ],
          answer: "C",
        },
        {
          prompt:
            "Describe how tolerance helps a community of many languages live together, with an example.",
          points: 5,
          answerSpace: "long",
          markScheme:
            "1 mark for defining tolerance. 2 marks for explaining its effect on daily life. 2 marks for a worked example from a mixed community.",
        },
      ],
    },
  ],
};

const agriculturalScience: SubjectWeeks = {
  subject: "Agricultural Science",
  code: "AGR",
  weeks: [
    {
      topic: "Meaning and importance of agriculture",
      objectives: [
        "Define agriculture and list its branches.",
        "State the importance of agriculture to the country.",
      ],
      questions: [
        {
          prompt: "Which is a branch of agriculture?",
          points: 1,
          options: ["Horticulture", "Cartography", "Astronomy", "Geology"],
          answer: "A",
        },
        {
          prompt:
            "Give two ways agriculture supports the economy beyond producing food.",
          points: 2,
          answerSpace: "short",
          markScheme:
            "1 mark each for employment, raw materials, export earnings or similar, to a maximum of 2.",
        },
      ],
    },
    {
      topic: "Farm tools",
      objectives: [
        "Identify common farm tools and their uses.",
        "Describe how tools are maintained.",
      ],
      questions: [
        {
          prompt: "A cutlass is used mainly for",
          points: 1,
          options: ["clearing", "watering", "measuring", "storing"],
          answer: "A",
        },
        {
          prompt:
            "Explain two things that happen to a hoe left outside in the rain, and how to prevent them.",
          points: 4,
          answerSpace: "long",
          markScheme:
            "1 mark for rusting of the metal. 1 mark for rotting or loosening of the handle. 2 marks for prevention such as cleaning, oiling and storing under shelter.",
        },
      ],
    },
    {
      topic: "Soil",
      objectives: [
        "Name the three main soil types and their properties.",
        "Explain which soil suits which crop and why.",
      ],
      questions: [
        {
          prompt: "Which soil drains fastest?",
          points: 1,
          options: ["Clay", "Loam", "Sandy", "Silt"],
          answer: "C",
        },
        {
          prompt: "Which soil is generally best for most crops?",
          points: 1,
          options: ["Clay", "Loam", "Sandy", "Gravel"],
          answer: "B",
        },
        {
          prompt:
            "A farmer's maize grows poorly on heavy clay. Explain why, and what they could do.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for poor drainage or waterlogging. 1 mark for roots lacking air. 1 mark for a remedy such as adding organic matter or making ridges.",
        },
      ],
    },
    {
      topic: "Crop production",
      objectives: [
        "Describe the stages of crop production in order.",
        "Explain why each stage matters.",
      ],
      questions: [
        {
          prompt: "Which comes first?",
          points: 1,
          options: ["Planting", "Clearing", "Harvesting", "Weeding"],
          answer: "B",
        },
        {
          prompt:
            "Explain what happens to a crop that is never weeded, naming two effects.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for competition for nutrients, water or light. 1 mark for reduced yield. 1 mark for pests or disease harboured by weeds.",
        },
      ],
    },
    {
      topic: "Farm animals",
      objectives: [
        "Classify farm animals by their use.",
        "State the basic needs of farm animals.",
      ],
      questions: [
        {
          prompt: "Which animal is kept mainly for eggs?",
          points: 1,
          options: ["Goat", "Layer fowl", "Ram", "Rabbit"],
          answer: "B",
        },
        {
          prompt:
            "List three things a poultry farmer must provide, and say what happens if one is missing.",
          points: 4,
          answerSpace: "long",
          markScheme:
            "1 mark each for feed, clean water and shelter or ventilation. 1 mark for a stated consequence such as reduced laying or disease.",
        },
      ],
    },
    {
      topic: "Mid-term test",
      objectives: [],
      questions: [
        {
          prompt: "Horticulture is concerned with",
          points: 1,
          options: [
            "fish farming",
            "fruits and vegetables",
            "forest trees",
            "cattle rearing",
          ],
          answer: "B",
        },
        {
          prompt: "Loam soil is best for crops because it",
          points: 1,
          options: [
            "holds no water",
            "balances drainage and nutrients",
            "is pure sand",
            "is always wet",
          ],
          answer: "B",
        },
        {
          prompt:
            "A farmer plants maize on cleared land but does not weed or apply manure. Predict the yield and explain, naming two causes.",
          points: 5,
          answerSpace: "long",
          markScheme:
            "1 mark for predicting a low yield. 2 marks for weed competition explained. 2 marks for nutrient depletion explained.",
        },
      ],
    },
  ],
};

export const SUBJECT_BANK: SubjectWeeks[] = [
  mathematics,
  english,
  basicScience,
  socialStudies,
  agriculturalScience,
];
