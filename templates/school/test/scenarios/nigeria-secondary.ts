/**
 * A Nigerian secondary school, as a simulation reads it.
 *
 * This file is the test plan. Everything that makes a school particular —
 * what it calls its year groups, how long a term runs, what counts as a
 * pass, how its subjects are assessed — lives here rather than in the
 * runner, so a second school is a second file and not a second simulation.
 *
 * The question bank is small and written by hand on purpose: it costs
 * nothing to run, it is identical on every run, and it carries real mark
 * schemes, so marking has something to be right or wrong about.
 */

export type ScenarioQuestion = {
  prompt: string;
  points: number;
  options?: string[];
  /** The right option's letter, or the expected value. */
  answer?: string;
  markScheme?: string;
  answerSpace?: "short" | "long";
};

export type ScenarioWeek = {
  week: number;
  topic: string;
  objectives: string[];
  /** The questions set that week. */
  questions: ScenarioQuestion[];
};

export type Scenario = {
  key: string;
  schoolName: string;
  schoolType: string;
  country: string;
  locale: string;
  paperSize: "a4" | "letter";
  timezone: string;
  gradePrefix: string;
  termStructure: "terms" | "semesters" | "quarters";
  passMark: number;
  gradingScale: {
    type: "letter";
    levels: { grade: string; min: number; max: number; label?: string }[];
  };
  yearGroups: string[];
  termName: string;
  termStart: string;
  termEnd: string;
  academicYear: { name: string; start: string; end: string };
  subject: { name: string; code: string; yearGroup: string };
  teacher: { name: string; email: string };
  className: string;
  studentCount: number;
  weeks: ScenarioWeek[];
};

export const scenario: Scenario = {
  key: "nigeria-secondary",
  schoolName: "Simulation Secondary School",
  schoolType: "secondary",
  country: "Nigeria",
  locale: "en-NG",
  paperSize: "a4",
  timezone: "Africa/Lagos",
  gradePrefix: "Class",
  termStructure: "terms",
  passMark: 40,
  gradingScale: {
    type: "letter",
    levels: [
      { grade: "A1", min: 75, max: 100, label: "Excellent" },
      { grade: "B2", min: 70, max: 74, label: "Very Good" },
      { grade: "B3", min: 65, max: 69, label: "Good" },
      { grade: "C4", min: 60, max: 64, label: "Credit" },
      { grade: "C5", min: 55, max: 59, label: "Credit" },
      { grade: "C6", min: 50, max: 54, label: "Credit" },
      { grade: "D7", min: 45, max: 49, label: "Pass" },
      { grade: "E8", min: 40, max: 44, label: "Pass" },
      { grade: "F9", min: 0, max: 39, label: "Fail" },
    ],
  },
  yearGroups: ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"],
  academicYear: {
    name: "2026/2027",
    start: "2026-09-14",
    end: "2027-07-23",
  },
  termName: "First Term",
  termStart: "2026-09-14",
  termEnd: "2026-12-11",
  subject: { name: "Mathematics", code: "MTH", yearGroup: "JSS1" },
  teacher: { name: "Bola Adeyinka", email: "bola.adeyinka@sim.test" },
  className: "JSS1 Mathematics",
  studentCount: 20,

  weeks: [
    {
      week: 1,
      topic: "Whole numbers and place value",
      objectives: [
        "Read and write whole numbers up to one million in figures and in words.",
        "State the place value of each digit in a whole number.",
      ],
      questions: [
        {
          prompt: "What is the place value of 7 in 4 783?",
          points: 1,
          options: ["Tens", "Hundreds", "Thousands", "Units"],
          answer: "B",
        },
        {
          prompt: "Write 65 040 in words.",
          points: 2,
          answerSpace: "short",
          markScheme:
            "1 mark for sixty-five thousand. 1 mark for and forty, with no extra hundreds named.",
        },
        {
          prompt: "Which number is the largest?",
          points: 1,
          options: ["9 087", "9 807", "9 078", "9 780"],
          answer: "B",
        },
        {
          prompt:
            "A trader counted 12 406 bags of rice. Explain how you would read this number aloud, and say what the 4 is worth.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for twelve thousand four hundred and six. 1 mark for identifying 4 as the hundreds digit. 1 mark for stating its value as 400.",
        },
      ],
    },
    {
      week: 2,
      topic: "Addition and subtraction of whole numbers",
      objectives: [
        "Add and subtract whole numbers with regrouping.",
        "Solve word problems involving addition and subtraction.",
      ],
      questions: [
        {
          prompt: "Work out 4 508 + 2 697.",
          points: 1,
          options: ["7 105", "7 205", "6 195", "7 195"],
          answer: "B",
        },
        {
          prompt: "Work out 8 004 − 3 276.",
          points: 1,
          options: ["4 728", "5 728", "4 828", "4 738"],
          answer: "A",
        },
        {
          prompt:
            "A school had 1 250 exercise books. It gave out 867 and received 400 more. How many has it now? Show your working.",
          points: 4,
          answerSpace: "long",
          markScheme:
            "1 mark for 1250 minus 867. 1 mark for 383. 1 mark for adding 400. 1 mark for 783 with the unit named.",
        },
      ],
    },
    {
      week: 3,
      topic: "Multiplication and division",
      objectives: [
        "Multiply a three-digit number by a two-digit number.",
        "Divide a four-digit number by a one-digit number, interpreting the remainder.",
      ],
      questions: [
        {
          prompt: "Work out 236 × 14.",
          points: 1,
          options: ["3 204", "3 304", "3 404", "2 304"],
          answer: "B",
        },
        {
          prompt: "Work out 1 505 ÷ 7.",
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
            "1 mark for 300 divided by 48 giving 6 remainder 12. 1 mark for 7 buses. 1 mark for explaining that a part of a bus cannot be used, so the answer is rounded up.",
        },
      ],
    },
    {
      week: 4,
      topic: "Fractions",
      objectives: [
        "Write equivalent fractions and reduce a fraction to its lowest terms.",
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
      week: 5,
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
            "A length is measured as 7.846 m. Give it to one decimal place and explain what is lost by rounding.",
          points: 3,
          answerSpace: "long",
          markScheme:
            "1 mark for 7.8 m. 1 mark for naming the digit dropped. 1 mark for explaining that precision is lost and the true value lies between 7.75 and 7.85.",
        },
      ],
    },
    {
      week: 6,
      topic: "Mid-term test",
      objectives: [],
      questions: [
        {
          prompt: "What is the place value of 5 in 25 018?",
          points: 1,
          options: ["Units", "Thousands", "Hundreds", "Tens"],
          answer: "B",
        },
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
            "A tank holds 2 400 litres. 3/8 is used on Monday and 1/4 on Tuesday. How much is left? Show your working.",
          points: 5,
          answerSpace: "long",
          markScheme:
            "1 mark for 900 litres on Monday. 1 mark for 600 litres on Tuesday. 1 mark for 1500 used. 1 mark for 900 left. 1 mark for the unit given throughout.",
        },
      ],
    },
  ],
};

export default scenario;
